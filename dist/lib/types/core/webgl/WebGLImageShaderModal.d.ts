import React from 'react';
import { FileNode } from '../contracts/types';
interface WebGLImageShaderModalProps {
    node: FileNode;
    canWrite: boolean;
    writeDenialReason?: string;
    onClose: () => void;
    onSaveAsNewFile: (newName: string, shaderDescription: string, sizeBytes: number, exportedDataUrl?: string) => void;
}
export declare const WebGLImageShaderModal: React.FC<WebGLImageShaderModalProps>;
export {};
//# sourceMappingURL=WebGLImageShaderModal.d.ts.map