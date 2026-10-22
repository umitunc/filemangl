import React from 'react';
import { FileNode, IFileManagerConfig, NodeSecurityMetadata, UserIdentity } from '../../core/contracts/types';
interface SecurityPermissionsModalProps {
    node: FileNode;
    allNodes: FileNode[];
    currentUser: UserIdentity;
    config: IFileManagerConfig;
    onClose: () => void;
    onSaveSecurity: (nodeId: string, updatedSecurity: NodeSecurityMetadata, applyRecursively: boolean) => void;
}
export declare const SecurityPermissionsModal: React.FC<SecurityPermissionsModalProps>;
export {};
//# sourceMappingURL=SecurityPermissionsModal.d.ts.map