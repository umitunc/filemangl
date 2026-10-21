import {
  FileCategory,
  FileNode,
  IFileManagerConfig,
  QuotaCheckResult,
} from '../contracts/types';
import { PermissionEngine } from './PermissionEngine';

export interface CategoryBreakdownItem {
  category: FileCategory;
  label: string;
  color: string;
  bytes: number;
  count: number;
  percentage: number;
}

/**
 * WeakMap memoization for O(1) folder size and volume usage lookups across 50,000+ nodes!
 */
const folderSizeCache = new WeakMap<FileNode[], Map<string | null, number>>();
const totalVolumeCache = new WeakMap<FileNode[], number>();

export class QuotaEngine {
  private static buildFolderSizeIndex(allNodes: FileNode[]): Map<string | null, number> {
    let index = folderSizeCache.get(allNodes);
    if (index) return index;

    index = new Map<string | null, number>();
    const childrenMap = new Map<string | null, FileNode[]>();

    for (let i = 0; i < allNodes.length; i++) {
      const node = allNodes[i];
      if (node.trashed) continue;
      let list = childrenMap.get(node.parentId);
      if (!list) {
        list = [];
        childrenMap.set(node.parentId, list);
      }
      list.push(node);
    }

    const walk = (parentId: string | null): number => {
      if (index!.has(parentId)) return index!.get(parentId)!;
      const children = childrenMap.get(parentId) || [];
      let total = 0;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.type === 'folder') {
          total += walk(child.id);
        } else {
          total += child.size;
        }
      }
      index!.set(parentId, total);
      return total;
    };

    walk(null);
    // Also ensure any orphan/subfolder is indexed
    for (let i = 0; i < allNodes.length; i++) {
      if (allNodes[i].type === 'folder' && !index.has(allNodes[i].id)) {
        walk(allNodes[i].id);
      }
    }

    folderSizeCache.set(allNodes, index);
    return index;
  }

  /**
   * O(1) memoized recursive byte size of a folder.
   */
  public static computeFolderSize(folderId: string | null, allNodes: FileNode[]): number {
    const index = this.buildFolderSizeIndex(allNodes);
    return index.get(folderId) || 0;
  }

  /**
   * O(1) memoized total volume usage across all files on the disk.
   */
  public static computeTotalVolumeUsed(allNodes: FileNode[]): number {
    const cached = totalVolumeCache.get(allNodes);
    if (cached !== undefined) return cached;

    let sum = 0;
    for (let i = 0; i < allNodes.length; i++) {
      if (allNodes[i].type !== 'folder') {
        sum += allNodes[i].size;
      }
    }
    totalVolumeCache.set(allNodes, sum);
    return sum;
  }

  public static findEffectiveFolderQuota(
    targetFolderId: string | null,
    allNodes: FileNode[]
  ): { folderNode: FileNode; usedBytes: number } | null {
    if (!targetFolderId) return null;
    const nodeMap = PermissionEngine.getNodeMap(allNodes);
    let cur = nodeMap.get(targetFolderId);
    let depth = 0;
    while (cur && depth < 16) {
      depth++;
      if (cur.security.quota && cur.security.quota.maxBytes !== null) {
        return {
          folderNode: cur,
          usedBytes: this.computeFolderSize(cur.id, allNodes),
        };
      }
      cur = cur.parentId ? nodeMap.get(cur.parentId) : undefined;
    }
    return null;
  }

  public static validateWriteOperation(
    targetFolderId: string | null,
    fileName: string,
    incomingBytes: number,
    allNodes: FileNode[],
    config: IFileManagerConfig
  ): QuotaCheckResult {
    const volumeUsedBytes = this.computeTotalVolumeUsed(allNodes);
    const volumeLimitBytes = config.totalDiskQuotaBytes;

    const extMatch = fileName.toLowerCase().match(/(\.[a-z0-9]+)$/);
    const ext = extMatch ? extMatch[1] : '';

    if (ext && config.globalBlockedExtensions.map((e) => e.toLowerCase()).includes(ext)) {
      return {
        allowed: false,
        reason: `Güvenlik Politikası: "${ext}" uzantılı dosyalar global disk kuralları gereği engellenmiştir.`,
        volumeUsedBytes,
        volumeLimitBytes,
      };
    }

    if (incomingBytes > config.defaultMaxUploadFileSizeBytes) {
      return {
        allowed: false,
        reason: `Dosya boyutu (${this.formatBytes(incomingBytes)}), izin verilen maksimum tekil dosya sınırını (${this.formatBytes(
          config.defaultMaxUploadFileSizeBytes
        )}) aşıyor.`,
        volumeUsedBytes,
        volumeLimitBytes,
      };
    }

    if (volumeUsedBytes + incomingBytes > volumeLimitBytes) {
      return {
        allowed: false,
        reason: `Disk Kotası Dolu! Toplam disk alanı (${this.formatBytes(volumeLimitBytes)}) bu işlem için yetersiz.`,
        volumeUsedBytes,
        volumeLimitBytes,
      };
    }

    if (targetFolderId) {
      const nodeMap = PermissionEngine.getNodeMap(allNodes);
      const targetFolder = nodeMap.get(targetFolderId);
      const policy = targetFolder?.security.quota;

      if (policy) {
        if (ext && policy.blockedExtensions.map((e) => e.toLowerCase()).includes(ext)) {
          return {
            allowed: false,
            reason: `"${targetFolder.name}" klasör politikası "${ext}" uzantılı dosyalara izin vermiyor.`,
            volumeUsedBytes,
            volumeLimitBytes,
          };
        }
        if (
          policy.allowedExtensions.length > 0 &&
          (!ext || !policy.allowedExtensions.map((e) => e.toLowerCase()).includes(ext))
        ) {
          return {
            allowed: false,
            reason: `"${targetFolder.name}" klasörüne yalnızca şu uzantılar yüklenebilir: ${policy.allowedExtensions.join(
              ', '
            )}`,
            volumeUsedBytes,
            volumeLimitBytes,
          };
        }
        if (policy.maxFileSizeBytes && incomingBytes > policy.maxFileSizeBytes) {
          return {
            allowed: false,
            reason: `"${targetFolder.name}" klasörü için maksimum dosya boyutu sınırı (${this.formatBytes(
              policy.maxFileSizeBytes
            )}) aşıldı.`,
            volumeUsedBytes,
            volumeLimitBytes,
          };
        }
      }

      const effectiveFolderQuota = this.findEffectiveFolderQuota(targetFolderId, allNodes);
      if (effectiveFolderQuota && effectiveFolderQuota.folderNode.security.quota?.maxBytes) {
        const folderLimit = effectiveFolderQuota.folderNode.security.quota.maxBytes;
        if (effectiveFolderQuota.usedBytes + incomingBytes > folderLimit) {
          return {
            allowed: false,
            reason: `"${effectiveFolderQuota.folderNode.name}" klasör kotası (${this.formatBytes(
              folderLimit
            )}) aşıldı! Mevcut kullanım: ${this.formatBytes(effectiveFolderQuota.usedBytes)}.`,
            volumeUsedBytes,
            volumeLimitBytes,
            folderUsedBytes: effectiveFolderQuota.usedBytes,
            folderLimitBytes: folderLimit,
          };
        }
      }
    }

    return {
      allowed: true,
      volumeUsedBytes,
      volumeLimitBytes,
    };
  }

  public static getCategoryBreakdown(
    allNodes: FileNode[],
    totalQuotaBytes: number
  ): CategoryBreakdownItem[] {
    const meta: Record<FileCategory, { label: string; color: string }> = {
      image: { label: 'Görsel & Dokular (WebGL)', color: '#ec4899' },
      video: { label: 'Video & Medya Akışı', color: '#8b5cf6' },
      code: { label: 'Kaynak Kod & Shader', color: '#3b82f6' },
      archive: { label: 'Arşiv & Paketler (.zip/.tar)', color: '#f59e0b' },
      document: { label: 'Doküman & Raporlar', color: '#10b981' },
      data: { label: 'Veritabanı & JSON/SQL', color: '#06b6d4' },
      audio: { label: 'Ses Dosyaları', color: '#eab308' },
      binary: { label: 'Binary & Sistem', color: '#64748b' },
      folder: { label: 'Klasör', color: '#94a3b8' },
    };

    const totals: Record<string, { bytes: number; count: number }> = {};
    for (let i = 0; i < allNodes.length; i++) {
      const node = allNodes[i];
      if (node.type === 'folder') continue;
      if (!totals[node.category]) {
        totals[node.category] = { bytes: 0, count: 0 };
      }
      totals[node.category].bytes += node.size;
      totals[node.category].count += 1;
    }

    return (Object.keys(meta) as FileCategory[])
      .filter((cat) => cat !== 'folder' && totals[cat]?.bytes > 0)
      .map((cat) => ({
        category: cat,
        label: meta[cat].label,
        color: meta[cat].color,
        bytes: totals[cat].bytes,
        count: totals[cat].count,
        percentage: Math.min(100, (totals[cat].bytes / Math.max(1, totalQuotaBytes)) * 100),
      }))
      .sort((a, b) => b.bytes - a.bytes);
  }

  public static formatBytes(bytes: number, decimals = 1): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(Math.max(1, bytes)) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}
