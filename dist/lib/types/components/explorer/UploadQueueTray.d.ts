import React from 'react';
import { FileCategory } from '../../core/contracts/types';
export type UploadQueueStatus = 'queued' | 'uploading' | 'completed' | 'cancelled' | 'error';
export interface UploadQueueItem {
    id: string;
    fileName: string;
    relativePath: string;
    rootUploadedFolderName?: string;
    rootUploadedFolderId?: string;
    targetFolderId: string | null;
    targetFolderLabel: string;
    category: FileCategory;
    totalBytes: number;
    bytesTransferred: number;
    percent: number;
    status: UploadQueueStatus;
    stage: string;
    createdNodeId?: string;
    errorMessage?: string;
}
export interface UploadQueueTrayProps {
    queue: UploadQueueItem[];
    isMinimized: boolean;
    onToggleMinimize: () => void;
    onCloseTray: () => void;
    onClearCompleted: () => void;
    onCancelItem: (id: string) => void;
    onCancelAll: () => void;
    onLocateNode: (folderId: string | null, nodeId?: string) => void;
}
export declare const UploadQueueTray: React.FC<UploadQueueTrayProps>;
//# sourceMappingURL=UploadQueueTray.d.ts.map