import { FileCategory, FileNode, IFileManagerConfig, QuotaCheckResult } from '../contracts/types';
export interface CategoryBreakdownItem {
    category: FileCategory;
    label: string;
    color: string;
    bytes: number;
    count: number;
    percentage: number;
}
export declare class QuotaEngine {
    private static buildFolderSizeIndex;
    /**
     * O(1) memoized recursive byte size of a folder.
     */
    static computeFolderSize(folderId: string | null, allNodes: FileNode[]): number;
    /**
     * O(1) memoized total volume usage across all files on the disk.
     */
    static computeTotalVolumeUsed(allNodes: FileNode[]): number;
    static findEffectiveFolderQuota(targetFolderId: string | null, allNodes: FileNode[]): {
        folderNode: FileNode;
        usedBytes: number;
    } | null;
    static validateWriteOperation(targetFolderId: string | null, fileName: string, incomingBytes: number, allNodes: FileNode[], config: IFileManagerConfig): QuotaCheckResult;
    static getCategoryBreakdown(allNodes: FileNode[], totalQuotaBytes: number): CategoryBreakdownItem[];
    static formatBytes(bytes: number, decimals?: number): string;
}
//# sourceMappingURL=QuotaEngine.d.ts.map