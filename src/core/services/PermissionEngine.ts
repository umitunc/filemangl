import {
  AclRule,
  EffectivePermissionMatrix,
  FileNode,
  IFileManagerConfig,
  PermissionAction,
  PosixPermissions,
  PosixTriad,
  UserIdentity,
} from '../contracts/types';

export const ALL_PERMISSION_ACTIONS: PermissionAction[] = [
  'read',
  'write',
  'delete',
  'rename',
  'upload',
  'download',
  'share',
  'chmod',
  'lock',
];

/**
 * WeakMap cache so that looking up parent nodes across 50,000+ FileNodes
 * is O(1) without rebuilding a Map on every single item evaluation.
 */
const nodeMapCache = new WeakMap<FileNode[], Map<string, FileNode>>();

/**
 * Single Responsibility Principle (SRP):
 * PermissionEngine handles all hybrid NTFS-style ACL + POSIX rwx permission evaluations,
 * ancestor inheritance resolution, lock state enforcement, and octal/symbolic conversions.
 */
export class PermissionEngine {
  public static getNodeMap(allNodes: FileNode[]): Map<string, FileNode> {
    let cached = nodeMapCache.get(allNodes);
    if (!cached) {
      cached = new Map<string, FileNode>();
      for (let i = 0; i < allNodes.length; i++) {
        cached.set(allNodes[i].id, allNodes[i]);
      }
      nodeMapCache.set(allNodes, cached);
    }
    return cached;
  }

  public static triadToDigit(triad: PosixTriad): number {
    return (triad.r ? 4 : 0) + (triad.w ? 2 : 0) + (triad.x ? 1 : 0);
  }

  public static digitToTriad(digit: number): PosixTriad {
    return {
      r: (digit & 4) !== 0,
      w: (digit & 2) !== 0,
      x: (digit & 1) !== 0,
    };
  }

  public static triadToSymbolic(triad: PosixTriad): string {
    return `${triad.r ? 'r' : '-'}${triad.w ? 'w' : '-'}${triad.x ? 'x' : '-'}`;
  }

  public static buildPosixFromOctal(octalInput: string): PosixPermissions {
    const clean = octalInput.replace(/[^0-7]/g, '').padStart(3, '0').slice(-3);
    const o = parseInt(clean[0], 10) || 0;
    const g = parseInt(clean[1], 10) || 0;
    const p = parseInt(clean[2], 10) || 0;

    const owner = this.digitToTriad(o);
    const group = this.digitToTriad(g);
    const others = this.digitToTriad(p);

    return {
      owner,
      group,
      others,
      octal: `0${o}${g}${p}`,
      symbolic: `${this.triadToSymbolic(owner)}${this.triadToSymbolic(group)}${this.triadToSymbolic(others)}`,
    };
  }

  public static syncPosix(posix: Pick<PosixPermissions, 'owner' | 'group' | 'others'>): PosixPermissions {
    const o = this.triadToDigit(posix.owner);
    const g = this.triadToDigit(posix.group);
    const p = this.triadToDigit(posix.others);
    return {
      owner: { ...posix.owner },
      group: { ...posix.group },
      others: { ...posix.others },
      octal: `0${o}${g}${p}`,
      symbolic: `${this.triadToSymbolic(posix.owner)}${this.triadToSymbolic(posix.group)}${this.triadToSymbolic(posix.others)}`,
    };
  }

  /**
   * Resolves the effective ACL rules chain by walking up parent directories
   * whenever `inheritFromParent` is true.
   */
  public static collectInheritedAclChain(node: FileNode, nodeMap: Map<string, FileNode>): AclRule[] {
    const chain: AclRule[] = [...node.security.acl];
    let current: FileNode | undefined = node;

    let safetyCounter = 0;
    while (current && current.security.inheritFromParent && current.parentId && safetyCounter < 16) {
      safetyCounter++;
      const parent = nodeMap.get(current.parentId);
      if (!parent) break;
      if (parent.security.acl.length > 0) {
        chain.push(...parent.security.acl);
      }
      current = parent;
    }

    return chain;
  }

  /**
   * Computes the complete effective permissions matrix for a given user on a target FileNode.
   */
  public static evaluateNodePermissions(
    node: FileNode,
    user: UserIdentity,
    allNodes: FileNode[],
    config: IFileManagerConfig
  ): EffectivePermissionMatrix {
    const nodeMap = this.getNodeMap(allNodes);
    const isOwner = node.security.ownerId === user.id;
    const isSameGroup = node.security.groupName === user.group;

    if (!config.strictPermissionEnforcement) {
      const allowed = {} as Record<PermissionAction, boolean>;
      const reasons = {} as Record<PermissionAction, string>;
      for (const act of ALL_PERMISSION_ACTIONS) {
        allowed[act] = true;
        reasons[act] = 'İzin denetimi yapılandırmada devre dışı bırakıldı (Bypass Mode).';
      }
      return {
        allowed,
        reasons,
        effectiveOctal: node.security.posix.octal,
        effectiveSymbolic: `${node.type === 'folder' ? 'd' : '-'}${node.security.posix.symbolic}`,
        isOwner,
        isLocked: node.security.locked,
      };
    }

    const applicableTriad: PosixTriad = isOwner
      ? node.security.posix.owner
      : isSameGroup
      ? node.security.posix.group
      : node.security.posix.others;

    const posixBaseline: Record<PermissionAction, boolean> = {
      read: applicableTriad.r,
      download: applicableTriad.r,
      write: applicableTriad.w,
      upload: applicableTriad.w && applicableTriad.x,
      rename: applicableTriad.w,
      delete: applicableTriad.w,
      share: applicableTriad.r && (isOwner || user.role === 'admin' || user.role === 'editor'),
      chmod: isOwner || user.role === 'admin',
      lock: applicableTriad.w || isOwner || user.role === 'admin',
    };

    const allowed = { ...posixBaseline };
    const reasons = {} as Record<PermissionAction, string>;

    const triadLabel = isOwner ? 'Owner (Sahip)' : isSameGroup ? `Group (${user.group})` : 'Others (Genel)';
    for (const act of ALL_PERMISSION_ACTIONS) {
      reasons[act] = allowed[act]
        ? `POSIX ${node.security.posix.octal} (${triadLabel}) üzerinden izin verildi.`
        : `POSIX ${node.security.posix.octal} (${triadLabel}) kısıtlaması nedeniyle reddedildi.`;
    }

    const aclChain = this.collectInheritedAclChain(node, nodeMap);
    const matchingRules = aclChain.filter(
      (rule) =>
        (rule.subjectType === 'user' && rule.subjectId === user.id) ||
        (rule.subjectType === 'role' && rule.subjectId === user.role)
    );

    const allowRules = matchingRules.filter((r) => r.effect === 'allow');
    const denyRules = matchingRules.filter((r) => r.effect === 'deny');

    for (const rule of allowRules) {
      for (const act of ALL_PERMISSION_ACTIONS) {
        if (rule.permissions[act]) {
          allowed[act] = true;
          reasons[act] = `ACL Allow kuralı (${rule.subjectLabel}) ile yetki tanımlandı.`;
        }
      }
    }

    for (const rule of denyRules) {
      for (const act of ALL_PERMISSION_ACTIONS) {
        if (rule.permissions[act]) {
          allowed[act] = false;
          reasons[act] = `ACL Explicit Deny kuralı (${rule.subjectLabel}) tarafından engellendi.`;
        }
      }
    }

    if (user.role === 'admin') {
      for (const act of ALL_PERMISSION_ACTIONS) {
        const hasAdminExplicitDeny = denyRules.some(
          (r) => r.subjectId === 'admin' && r.permissions[act]
        );
        if (!hasAdminExplicitDeny) {
          allowed[act] = true;
          reasons[act] = 'Root Admin (Süper Kullanıcı) yetkisiyle tam erişim.';
        }
      }
    }

    let lockedAncestor: FileNode | undefined = node.security.locked ? node : undefined;
    if (!lockedAncestor) {
      let cur: FileNode | undefined = node;
      let depth = 0;
      while (cur && cur.parentId && depth < 16) {
        depth++;
        const p = nodeMap.get(cur.parentId);
        if (p?.security.locked) {
          lockedAncestor = p;
          break;
        }
        cur = p;
      }
    }

    if (config.respectFolderLocks && lockedAncestor) {
      const mutatingActions: PermissionAction[] = ['write', 'delete', 'rename', 'upload'];
      for (const mut of mutatingActions) {
        allowed[mut] = false;
        reasons[mut] = `"${lockedAncestor.name}" öğesi kilitli (${
          lockedAncestor.security.lockedBy || 'Sistem'
        }) olduğu için değiştirilemez.`;
      }
    }

    return {
      allowed,
      reasons,
      effectiveOctal: node.security.posix.octal,
      effectiveSymbolic: `${node.type === 'folder' ? 'd' : '-'}${node.security.posix.symbolic}`,
      isOwner,
      isLocked: Boolean(lockedAncestor),
    };
  }
}
