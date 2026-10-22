import React from 'react';
import { FileNode, IFileManagerConfig, UserIdentity } from '../contracts/types';
interface WebGLDiskMapViewportProps {
    allNodes: FileNode[];
    currentFolderId: string | null;
    selectedIds: Set<string>;
    currentUser: UserIdentity;
    config: IFileManagerConfig;
    onSelectNode: (id: string, multi: boolean, range: boolean) => void;
    onOpenNode: (node: FileNode) => void;
}
export declare const WebGLDiskMapViewport: React.FC<WebGLDiskMapViewportProps>;
export {};
//# sourceMappingURL=WebGLDiskMapViewport.d.ts.map