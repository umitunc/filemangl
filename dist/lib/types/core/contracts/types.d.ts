export type UserRole = 'admin' | 'developer' | 'editor' | 'viewer' | 'guest';
export interface UserIdentity {
    id: string;
    name: string;
    title: string;
    role: UserRole;
    group: string;
    badgeColor: string;
}
export type PermissionAction = 'read' | 'write' | 'delete' | 'rename' | 'upload' | 'download' | 'share' | 'chmod' | 'lock';
export interface AclRule {
    id: string;
    subjectType: 'role' | 'user';
    subjectId: string;
    subjectLabel: string;
    effect: 'allow' | 'deny';
    permissions: Record<PermissionAction, boolean>;
}
export interface PosixTriad {
    r: boolean;
    w: boolean;
    x: boolean;
}
export interface PosixPermissions {
    owner: PosixTriad;
    group: PosixTriad;
    others: PosixTriad;
    octal: string;
    symbolic: string;
}
export interface FolderQuotaPolicy {
    maxBytes: number | null;
    maxFileSizeBytes: number | null;
    allowedExtensions: string[];
    blockedExtensions: string[];
}
export interface ShareLinkConfig {
    token: string;
    url: string;
    createdAt: string;
    expiresAt: string | null;
    passwordProtected: boolean;
    password?: string;
    allowDownload: boolean;
    maxDownloads: number | null;
    downloadsCount: number;
}
export interface NodeSecurityMetadata {
    ownerId: string;
    ownerName: string;
    groupName: string;
    inheritFromParent: boolean;
    locked: boolean;
    lockedBy?: string;
    lockedReason?: string;
    posix: PosixPermissions;
    acl: AclRule[];
    quota?: FolderQuotaPolicy;
}
export type FileCategory = 'folder' | 'image' | 'code' | 'document' | 'archive' | 'video' | 'audio' | 'data' | 'binary';
export interface FileNode {
    id: string;
    parentId: string | null;
    name: string;
    type: 'folder' | 'file' | 'archive';
    category: FileCategory;
    extension: string;
    mimeType: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    starred: boolean;
    tags: string[];
    colorTag?: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'cyan' | null;
    trashed: boolean;
    trashedAt?: string;
    content?: string;
    blobUrl?: string;
    thumbnailUrl?: string;
    thumbnailMeta?: {
        thumbByteSize: number;
        generationMs: number;
        fromCache: boolean;
        format: string;
    };
    durationSec?: number;
    isUserUploaded?: boolean;
    imageMeta?: {
        width: number;
        height: number;
        palette: [string, string, string];
        pattern: 'nebula' | 'cybergrid' | 'topography' | 'prism' | 'aurora';
    };
    archivedChildrenSnapshot?: FileNode[];
    checksumSha256: string;
    security: NodeSecurityMetadata;
    shareLink?: ShareLinkConfig;
    isSyntheticStressNode?: boolean;
}
export type ExplorerViewMode = 'extra_large_icons' | 'large_icons' | 'medium_icons' | 'small_icons' | 'list' | 'details' | 'tiles' | 'content' | 'webgl_spatial' | 'webgl_diskmap';
export type SortField = 'name' | 'size' | 'updatedAt' | 'createdAt' | 'type' | 'owner';
export type SortDirection = 'asc' | 'desc';
export interface EffectivePermissionMatrix {
    allowed: Record<PermissionAction, boolean>;
    reasons: Record<PermissionAction, string>;
    effectiveOctal: string;
    effectiveSymbolic: string;
    isOwner: boolean;
    isLocked: boolean;
}
export interface QuotaCheckResult {
    allowed: boolean;
    reason?: string;
    volumeUsedBytes: number;
    volumeLimitBytes: number;
    folderUsedBytes?: number;
    folderLimitBytes?: number | null;
}
export interface ConflictItem {
    sourceNode: FileNode;
    existingNode: FileNode;
    targetParentId: string | null;
}
export type ConflictResolutionStrategy = 'replace' | 'keep_both' | 'skip';
export interface ClipboardState {
    mode: 'copy' | 'cut' | null;
    nodeIds: string[];
    sourceParentId: string | null;
    timestamp: number;
}
export interface AuditLogEntry {
    id: string;
    timestamp: string;
    actorName: string;
    actorRole: UserRole;
    action: string;
    targetPath: string;
    status: 'allowed' | 'denied' | 'warning';
    details: string;
}
/**
 * Dependency Inversion Principle (DIP) & Liskov Substitution Principle (LSP):
 * Any backend (In-Memory VFS, IndexedDB, Laravel REST Connector, Node.js Express Connector, S3)
 * implements IFileSystemDriver and can be hot-swapped without modifying UI or domain logic.
 */
export interface IFileSystemDriver {
    readonly driverId: string;
    readonly driverName: string;
    readonly supportsRealtimeStream: boolean;
    initialize(): Promise<FileNode[]>;
    getAllNodes(): Promise<FileNode[]>;
    saveAllNodes(nodes: FileNode[]): Promise<void>;
    resetToFactoryDefaults(): Promise<FileNode[]>;
}
/**
 * Fully declarative Configuration Contract for <FileManGL config={...} />
 */
export type SupportedLocale = 'tr' | 'en' | 'de' | 'ru';
export interface IFileManagerConfig {
    volumeName: string;
    mountPath: string;
    locale: SupportedLocale;
    theme: 'dark' | 'light';
    driverType: 'vfs_memory' | 'vfs_localstorage' | 'rest_connector';
    connectorEndpoint: string;
    connectorAuthToken?: string;
    totalDiskQuotaBytes: number;
    defaultMaxUploadFileSizeBytes: number;
    globalBlockedExtensions: string[];
    strictPermissionEnforcement: boolean;
    respectFolderLocks: boolean;
    defaultViewMode: ExplorerViewMode;
    enableRibbonToolbar: boolean;
    enableDualPane: boolean;
    enableDetailsInspector: boolean;
    enableFolderTree: boolean;
    enableBreadcrumbs: boolean;
    enableStatusBar: boolean;
    enableContextMenu: boolean;
    enableKeyboardShortcuts: boolean;
    enableDragAndDrop: boolean;
    enableRubberBandSelection: boolean;
    showHiddenAndSystemFiles: boolean;
    showFileExtensions: boolean;
    showPosixBadgesOnItems: boolean;
    enableWebGLAcceleration: boolean;
    enableWebGLImageShaderStudio: boolean;
    enableWebGLDiskMap: boolean;
    enableBuiltInCodeEditor: boolean;
    enableArchiveCompression: boolean;
    enableBatchRename: boolean;
    enableShareLinks: boolean;
    enableRecycleBin: boolean;
    enableAuditLog: boolean;
    enableUndoRedo: boolean;
}
//# sourceMappingURL=types.d.ts.map