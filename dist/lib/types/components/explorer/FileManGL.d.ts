import React from 'react';
import { IFileManagerConfig } from '../../core/contracts/types';
export declare function ensureMaterialSymbolsLoaded(): void;
export interface FileManGLProps {
    config: IFileManagerConfig;
    onConfigChange?: (patch: Partial<IFileManagerConfig>) => void;
    isFullscreen?: boolean;
    onToggleFullscreen?: () => void;
}
export declare const FileManGL: React.FC<FileManGLProps>;
//# sourceMappingURL=FileManGL.d.ts.map