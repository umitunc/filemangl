import React from 'react';
import { ClipboardState, FileNode, IFileManagerConfig, UserIdentity } from '../contracts/types';
interface WebGLSpatialViewportProps {
    nodes: FileNode[];
    allNodes: FileNode[];
    selectedIds: Set<string>;
    clipboard?: ClipboardState;
    currentUser: UserIdentity;
    config: IFileManagerConfig;
    onSelectNode: (id: string, multi: boolean, range: boolean) => void;
    onSelectMany: (ids: string[]) => void;
    onOpenNode: (node: FileNode) => void;
    onContextMenuNode: (e: React.MouseEvent, node?: FileNode) => void;
    onDropNodesIntoFolder?: (targetFolderId: string, draggedIds: string[]) => void;
    onInjectStressNodes: (count: number) => void;
    onClearStressNodes: () => void;
}
export declare const WebGLSpatialViewport: React.FC<WebGLSpatialViewportProps>;
export {};
//# sourceMappingURL=WebGLSpatialViewport.d.ts.map