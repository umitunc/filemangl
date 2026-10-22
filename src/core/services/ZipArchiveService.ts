import { FileNode } from '../contracts/types';
import { ThumbnailCacheService } from './ThumbnailCacheService';

export interface ZipEntryItem {
  relativePath: string;
  isDirectory: boolean;
  data: Uint8Array;
  modifiedDate: Date;
  sourceNode: FileNode;
}

export interface ZipBuildResult {
  blob: Blob;
  uint8: Uint8Array;
  fileName: string;
  entryCount: number;
  fileCount: number;
  folderCount: number;
  totalBytes: number;
}

// Precomputed IEEE 802.3 CRC-32 lookup table
const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function computeCrc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC32_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function dateToDosTimeDate(date: Date): { dosTime: number; dosDate: number } {
  const year = Math.max(1980, date.getFullYear());
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  const dosTime = ((hours & 0x1f) << 11) | ((minutes & 0x3f) << 5) | (seconds & 0x1f);
  const dosDate = (((year - 1980) & 0x7f) << 9) | ((month & 0x0f) << 5) | (day & 0x1f);
  return { dosTime, dosDate };
}

function dataUrlToUint8Array(dataUrl: string): Uint8Array | null {
  try {
    const commaIdx = dataUrl.indexOf(',');
    if (commaIdx === -1) return null;
    const header = dataUrl.slice(0, commaIdx);
    const body = dataUrl.slice(commaIdx + 1);
    if (header.includes(';base64')) {
      if (typeof atob === 'function') {
        const binStr = atob(body);
        const out = new Uint8Array(binStr.length);
        for (let i = 0; i < binStr.length; i++) {
          out[i] = binStr.charCodeAt(i);
        }
        return out;
      }
    }
    return new TextEncoder().encode(decodeURIComponent(body));
  } catch {
    return null;
  }
}

async function resolveNodeBinaryPayload(node: FileNode): Promise<Uint8Array> {
  const encoder = new TextEncoder();

  // 1. Check persisted binary blob in ThumbnailCacheService (L1/IndexedDB)
  if (node.checksumSha256) {
    const cachedBlob = await ThumbnailCacheService.getBinaryBlob(node.checksumSha256);
    if (cachedBlob && typeof cachedBlob.arrayBuffer === 'function') {
      try {
        const ab = await cachedBlob.arrayBuffer();
        return new Uint8Array(ab);
      } catch {
        // Fallback below
      }
    }
  }

  // 2. Check data URL in blobUrl or thumbnailUrl
  if (node.blobUrl && node.blobUrl.startsWith('data:')) {
    const decoded = dataUrlToUint8Array(node.blobUrl);
    if (decoded) return decoded;
  }

  // 3. Check fetchable blob: URL in browser runtime
  if (
    node.blobUrl &&
    node.blobUrl.startsWith('blob:http') &&
    typeof fetch === 'function'
  ) {
    try {
      const resp = await fetch(node.blobUrl);
      if (resp.ok) {
        const ab = await resp.arrayBuffer();
        if (ab.byteLength > 0) return new Uint8Array(ab);
      }
    } catch {
      // Ignore in test environment or revoked blob
    }
  }

  // 4. Check explicit text/code content
  if (typeof node.content === 'string' && node.content.length > 0) {
    return encoder.encode(node.content);
  }

  // 5. Check data URL thumbnail fallback for images
  if (node.thumbnailUrl && node.thumbnailUrl.startsWith('data:')) {
    const decoded = dataUrlToUint8Array(node.thumbnailUrl);
    if (decoded) return decoded;
  }

  // 6. Structured VFS file payload fallback
  return encoder.encode(
    JSON.stringify(
      {
        fileName: node.name,
        category: node.category,
        mimeType: node.mimeType,
        sizeBytes: node.size,
        checksumSha256: node.checksumSha256,
        owner: node.security.ownerName,
        posix: node.security.posix.octal,
        exportedBy: 'FileManGL v1.0.4 Enterprise ZIP Engine',
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    )
  );
}

/**
 * Enterprise PKZIP (.zip) Archive Builder & Direct Download Service (SOLID - Single Responsibility)
 * Supports packaging single folders, nested subdirectories, or multi-selections (e.g. Marquee Selection Rectangle)
 * into a standard RFC-compliant .zip binary file.
 */
export class ZipArchiveService {
  /**
   * Recursively collects all selected nodes and their nested children in the VFS tree.
   */
  public static async collectEntriesFromSelection(
    selectedNodes: FileNode[],
    allNodes: FileNode[],
    onProgress?: (percent: number, stage: string) => void
  ): Promise<ZipEntryItem[]> {
    const entries: ZipEntryItem[] = [];
    const visitedIds = new Set<string>();

    const walkNode = async (node: FileNode, parentPath: string) => {
      if (visitedIds.has(node.id) || node.trashed) return;
      visitedIds.add(node.id);

      const safeName = node.name.replace(/[\\:*?"<>|]/g, '_');

      if (node.type === 'folder') {
        const folderPath = parentPath ? `${parentPath}/${safeName}/` : `${safeName}/`;
        entries.push({
          relativePath: folderPath,
          isDirectory: true,
          data: new Uint8Array(0),
          modifiedDate: new Date(node.updatedAt || Date.now()),
          sourceNode: node,
        });

        const children = allNodes
          .filter((c) => !c.trashed && c.parentId === node.id)
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

        for (const child of children) {
          await walkNode(child, parentPath ? `${parentPath}/${safeName}` : safeName);
        }
      } else {
        const filePath = parentPath ? `${parentPath}/${safeName}` : safeName;
        const payload = await resolveNodeBinaryPayload(node);
        entries.push({
          relativePath: filePath,
          isDirectory: false,
          data: payload,
          modifiedDate: new Date(node.updatedAt || Date.now()),
          sourceNode: node,
        });
      }
    };

    for (let i = 0; i < selectedNodes.length; i++) {
      const rootNode = selectedNodes[i];
      if (onProgress) {
        const pct = Math.round(((i + 1) / Math.max(1, selectedNodes.length)) * 50);
        onProgress(pct, `"${rootNode.name}" içeriği taranıyor...`);
      }
      await walkNode(rootNode, '');
    }

    return entries;
  }

  /**
   * Builds a binary PKZIP archive from the selected FileNodes.
   */
  public static async buildZipArchive(
    selectedNodes: FileNode[],
    allNodes: FileNode[],
    customArchiveName?: string,
    onProgress?: (percent: number, stage: string) => void
  ): Promise<ZipBuildResult> {
    const entries = await this.collectEntriesFromSelection(
      selectedNodes,
      allNodes,
      onProgress
    );

    const encoder = new TextEncoder();
    const localParts: Uint8Array[] = [];
    const centralParts: Uint8Array[] = [];
    let currentLocalOffset = 0;
    let fileCount = 0;
    let folderCount = 0;

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      if (entry.isDirectory) folderCount++;
      else fileCount++;

      if (onProgress) {
        const pct = 50 + Math.round(((i + 1) / Math.max(1, entries.length)) * 45);
        onProgress(pct, `ZIP paketleniyor: ${entry.relativePath}`);
      }

      const nameBytes = encoder.encode(entry.relativePath);
      const payload = entry.data;
      const crc = entry.isDirectory ? 0 : computeCrc32(payload);
      const { dosTime, dosDate } = dateToDosTimeDate(entry.modifiedDate);

      // 1. Local File Header (30 bytes + nameBytes.length)
      const localHeader = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(localHeader.buffer);
      lv.setUint32(0, 0x04034b50, true); // Signature PK\x03\x04
      lv.setUint16(4, 20, true); // Version needed (2.0)
      lv.setUint16(6, 0x0800, true); // Bit 11: UTF-8 filename
      lv.setUint16(8, 0, true); // Compression method: 0 (STORE)
      lv.setUint16(10, dosTime, true);
      lv.setUint16(12, dosDate, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, payload.length, true); // Compressed size
      lv.setUint32(22, payload.length, true); // Uncompressed size
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true); // Extra field length
      localHeader.set(nameBytes, 30);

      localParts.push(localHeader);
      if (payload.length > 0) {
        localParts.push(payload);
      }

      // 2. Central Directory File Header (46 bytes + nameBytes.length)
      const centralHeader = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(centralHeader.buffer);
      cv.setUint32(0, 0x02014b50, true); // Signature PK\x01\x02
      cv.setUint16(4, 20, true); // Version made by
      cv.setUint16(6, 20, true); // Version needed
      cv.setUint16(8, 0x0800, true); // Bit 11: UTF-8
      cv.setUint16(10, 0, true); // Compression method: STORE
      cv.setUint16(12, dosTime, true);
      cv.setUint16(14, dosDate, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, payload.length, true);
      cv.setUint32(24, payload.length, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true); // Extra length
      cv.setUint16(32, 0, true); // Comment length
      cv.setUint16(34, 0, true); // Disk number start
      cv.setUint16(36, 0, true); // Internal attrs
      cv.setUint32(38, entry.isDirectory ? 0x10 : 0x00, true); // External attrs (0x10 = directory)
      cv.setUint32(42, currentLocalOffset, true); // Offset of local header
      centralHeader.set(nameBytes, 46);

      centralParts.push(centralHeader);
      currentLocalOffset += localHeader.length + payload.length;
    }

    const centralDirSize = centralParts.reduce((acc, p) => acc + p.length, 0);
    const commentBytes = encoder.encode('FileManGL v1.0.4 Enterprise ZIP Archive');

    // 3. End of Central Directory Record (22 bytes + commentBytes.length)
    const eocd = new Uint8Array(22 + commentBytes.length);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true); // Signature PK\x05\x06
    ev.setUint16(4, 0, true); // Disk number
    ev.setUint16(6, 0, true); // Central dir start disk
    ev.setUint16(8, entries.length, true); // Entries on this disk
    ev.setUint16(10, entries.length, true); // Total entries
    ev.setUint32(12, centralDirSize, true); // Size of central directory
    ev.setUint32(16, currentLocalOffset, true); // Offset of central directory
    ev.setUint16(20, commentBytes.length, true);
    eocd.set(commentBytes, 22);

    const totalBytes = currentLocalOffset + centralDirSize + eocd.length;
    const finalBuffer = new Uint8Array(totalBytes);
    let offset = 0;

    for (const part of localParts) {
      finalBuffer.set(part, offset);
      offset += part.length;
    }
    for (const part of centralParts) {
      finalBuffer.set(part, offset);
      offset += part.length;
    }
    finalBuffer.set(eocd, offset);

    if (onProgress) {
      onProgress(100, 'ZIP arşivi hazırlandı');
    }

    const defaultName =
      selectedNodes.length === 1
        ? `${selectedNodes[0].name.replace(/\.[^/.]+$/, '')}.zip`
        : `FileManGL_Secim_${selectedNodes.length}_Oge.zip`;

    const fileName = customArchiveName
      ? customArchiveName.endsWith('.zip')
        ? customArchiveName
        : `${customArchiveName}.zip`
      : defaultName;

    const blob = new Blob([finalBuffer.buffer as ArrayBuffer], {
      type: 'application/zip',
    });

    return {
      blob,
      uint8: finalBuffer,
      fileName,
      entryCount: entries.length,
      fileCount,
      folderCount,
      totalBytes,
    };
  }

  /**
   * Triggers a direct browser download for a generated ZIP Blob.
   */
  public static triggerBrowserDownload(blob: Blob, fileName: string): void {
    if (typeof document === 'undefined') return;
    let url = '';
    try {
      if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
        url = URL.createObjectURL(blob);
      } else {
        url = `blob:local/${encodeURIComponent(fileName)}`;
      }
    } catch {
      url = `blob:local/${encodeURIComponent(fileName)}`;
    }

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
    const isJsdom =
      typeof navigator !== 'undefined' &&
      typeof navigator.userAgent === 'string' &&
      navigator.userAgent.toLowerCase().includes('jsdom');
    if (!isJsdom) {
      a.click();
    }
    document.body.removeChild(a);
  }
}
