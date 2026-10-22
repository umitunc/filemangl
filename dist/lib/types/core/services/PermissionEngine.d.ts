import { AclRule, EffectivePermissionMatrix, FileNode, IFileManagerConfig, PermissionAction, PosixPermissions, PosixTriad, UserIdentity } from '../contracts/types';
export declare const ALL_PERMISSION_ACTIONS: PermissionAction[];
/**
 * Single Responsibility Principle (SRP):
 * PermissionEngine handles all hybrid NTFS-style ACL + POSIX rwx permission evaluations,
 * ancestor inheritance resolution, lock state enforcement, and octal/symbolic conversions.
 */
export declare class PermissionEngine {
    static getNodeMap(allNodes: FileNode[]): Map<string, FileNode>;
    static triadToDigit(triad: PosixTriad): number;
    static digitToTriad(digit: number): PosixTriad;
    static triadToSymbolic(triad: PosixTriad): string;
    static buildPosixFromOctal(octalInput: string): PosixPermissions;
    static syncPosix(posix: Pick<PosixPermissions, 'owner' | 'group' | 'others'>): PosixPermissions;
    /**
     * Resolves the effective ACL rules chain by walking up parent directories
     * whenever `inheritFromParent` is true.
     */
    static collectInheritedAclChain(node: FileNode, nodeMap: Map<string, FileNode>): AclRule[];
    /**
     * Computes the complete effective permissions matrix for a given user on a target FileNode.
     */
    static evaluateNodePermissions(node: FileNode, user: UserIdentity, allNodes: FileNode[], config: IFileManagerConfig): EffectivePermissionMatrix;
}
//# sourceMappingURL=PermissionEngine.d.ts.map