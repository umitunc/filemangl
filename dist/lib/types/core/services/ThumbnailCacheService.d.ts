import { FileNode } from '../contracts/types';
export interface CachedThumbnailEntry {
    cacheKey: string;
    thumbnailDataUrl: string;
    width: number;
    height: number;
    palette: [string, string, string];
    thumbByteSize: number;
    generatedAt: string;
    generationMs: number;
    fromCache: boolean;
}
export interface ThumbnailCacheStats {
    l1Entries: number;
    hitCount: number;
    missCount: number;
    totalThumbBytes: number;
    hitRatioPercent: number;
}
/**
 * Enterprise 2-Tier Thumbnail & Binary Blob Cache Service (SOLID - Single Responsibility)
 * - L1: Fast In-Memory LRU Cache (O(1) lookup for virtualized 60-120 FPS grid scrolling)
 * - L2: Browser IndexedDB Persistent Store (survives page reloads for real local file manager UX)
 */
declare class ThumbnailCacheEngine {
    private l1Cache;
    private blobUrlMap;
    private blobInstanceMap;
    private hitCount;
    private missCount;
    private dbPromise;
    private openDatabase;
    private setL1;
    getFromL1(cacheKey: string): CachedThumbnailEntry | undefined;
    getThumbnail(cacheKey: string): Promise<CachedThumbnailEntry | null>;
    putThumbnail(entry: CachedThumbnailEntry): Promise<void>;
    persistBinaryBlob(cacheKey: string, blob: Blob): Promise<void>;
    getBinaryBlob(cacheKey: string): Promise<Blob | null>;
    getPersistedBlobUrl(cacheKey: string): Promise<string | null>;
    /**
     * Generates a real bicubic-downscaled WebP/JPEG thumbnail & extracts 3 dominant RGB hex colors
     * from an uploaded image File/Blob, caching both in L1 RAM and L2 IndexedDB.
     */
    generateAndCacheImageThumbnail(file: File | Blob, cacheKey: string, existingBlobUrl?: string, maxDimension?: number): Promise<CachedThumbnailEntry>;
    /**
     * Rehydrates persisted FileNodes on application startup so uploaded images, videos, and files
     * retain their live Blob URLs and cached thumbnails across page refreshes (F5).
     */
    rehydrateNodes(nodes: FileNode[]): Promise<FileNode[]>;
    getStats(): ThumbnailCacheStats;
    clearAll(): Promise<void>;
}
export declare const ThumbnailCacheService: ThumbnailCacheEngine;
export {};
//# sourceMappingURL=ThumbnailCacheService.d.ts.map