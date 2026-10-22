import React from 'react';
import { IFileManagerConfig } from '../../core/contracts/types';
interface ConfigPlaygroundPanelProps {
    config: IFileManagerConfig;
    onUpdateConfig: (patch: Partial<IFileManagerConfig>) => void;
}
export declare const ConfigPlaygroundPanel: React.FC<ConfigPlaygroundPanelProps>;
export {};
//# sourceMappingURL=ConfigPlaygroundPanel.d.ts.map