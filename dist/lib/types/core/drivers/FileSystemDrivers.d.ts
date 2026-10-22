import { FileNode, IFileSystemDriver } from '../contracts/types';
/**
 * Liskov Substitution Principle (LSP):
 * VfsLocalStorageDriver persists the virtual file system in localStorage with automatic fallback to memory
 * when large stress-test node sets exceed browser storage limits, and rehydrates binary Blobs & Thumbnails
 * from IndexedDB (ThumbnailCacheService) across page reloads.
 */
export declare class VfsLocalStorageDriver implements IFileSystemDriver {
    readonly driverId = "vfs_localstorage";
    readonly driverName = "FileManGL In-Browser VFS (Zero-Backend)";
    readonly supportsRealtimeStream = true;
    private memoryCache;
    initialize(): Promise<FileNode[]>;
    getAllNodes(): Promise<FileNode[]>;
    saveAllNodes(nodes: FileNode[]): Promise<void>;
    resetToFactoryDefaults(): Promise<FileNode[]>;
}
/**
 * Pure In-Memory VFS Driver for ultra-fast ephemeral sessions & unit testing.
 */
export declare class VfsMemoryDriver implements IFileSystemDriver {
    readonly driverId = "vfs_memory";
    readonly driverName = "FileManGL Ephemeral RAM Disk VFS";
    readonly supportsRealtimeStream = true;
    private nodes;
    initialize(): Promise<FileNode[]>;
    getAllNodes(): Promise<FileNode[]>;
    saveAllNodes(nodes: FileNode[]): Promise<void>;
    resetToFactoryDefaults(): Promise<FileNode[]>;
}
/**
 * Universal REST HTTP Connector Driver (compatible with Laravel, Node.js/Express, Fastify, Go, .NET).
 * Automatically falls back to the VFS mirror when the remote endpoint is unreachable in demo environments,
 * while logging every outbound Connector Protocol payload so developers can inspect requests in real time!
 */
export declare class RestConnectorDriver implements IFileSystemDriver {
    readonly driverId = "rest_connector";
    readonly driverName = "Universal HTTP REST Connector (Laravel / Node.js)";
    readonly supportsRealtimeStream = false;
    private fallbackVfs;
    private endpoint;
    private authToken?;
    private onProtocolLog?;
    constructor(endpoint: string, authToken?: string, onProtocolLog?: (method: string, payload: unknown) => void);
    initialize(): Promise<FileNode[]>;
    getAllNodes(): Promise<FileNode[]>;
    saveAllNodes(nodes: FileNode[]): Promise<void>;
    resetToFactoryDefaults(): Promise<FileNode[]>;
}
//# sourceMappingURL=FileSystemDrivers.d.ts.map