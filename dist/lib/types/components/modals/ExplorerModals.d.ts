import React from 'react';
import { ConflictItem, ConflictResolutionStrategy, FileNode, ShareLinkConfig } from '../../core/contracts/types';
interface CodeEditorModalProps {
    node: FileNode;
    canWrite: boolean;
    denialReason?: string;
    onClose: () => void;
    onSaveContent: (nodeId: string, newContent: string) => void;
}
export declare const CodeEditorModal: React.FC<CodeEditorModalProps>;
interface BatchRenameModalProps {
    nodes: FileNode[];
    onClose: () => void;
    onApplyBatchRename: (renames: Array<{
        id: string;
        newName: string;
    }>) => void;
}
export declare const BatchRenameModal: React.FC<BatchRenameModalProps>;
interface ShareLinkModalProps {
    node: FileNode;
    onClose: () => void;
    onSaveShareConfig: (nodeId: string, config: ShareLinkConfig | undefined) => void;
}
export declare const ShareLinkModal: React.FC<ShareLinkModalProps>;
interface ConflictResolutionModalProps {
    conflicts: ConflictItem[];
    onClose: () => void;
    onResolve: (strategy: ConflictResolutionStrategy) => void;
}
export declare const ConflictResolutionModal: React.FC<ConflictResolutionModalProps>;
interface MediaPlayerModalProps {
    node: FileNode;
    onClose: () => void;
}
export declare const MediaPlayerModal: React.FC<MediaPlayerModalProps>;
export {};
//# sourceMappingURL=ExplorerModals.d.ts.map