import { FileNode } from '../contracts/types';
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
/**
 * Enterprise PKZIP (.zip) Archive Builder & Direct Download Service (SOLID - Single Responsibility)
 * Supports packaging single folders, nested subdirectories, or multi-selections (e.g. Marquee Selection Rectangle)
 * into a standard RFC-compliant .zip binary file.
 */
export declare class ZipArchiveService {
    /**
     * Recursively collects all selected nodes and their nested children in the VFS tree.
     */
    static collectEntriesFromSelection(selectedNodes: FileNode[], allNodes: FileNode[], onProgress?: (percent: number, stage: string) => void): Promise<ZipEntryItem[]>;
    /**
     * Builds a binary PKZIP archive from the selected FileNodes.
     */
    static buildZipArchive(selectedNodes: FileNode[], allNodes: FileNode[], customArchiveName?: string, onProgress?: (percent: number, stage: string) => void): Promise<ZipBuildResult>;
    /**
     * Triggers a direct browser download for a generated ZIP Blob.
     */
    static triggerBrowserDownload(blob: Blob, fileName: string): void;
}
//# sourceMappingURL=ZipArchiveService.d.ts.map