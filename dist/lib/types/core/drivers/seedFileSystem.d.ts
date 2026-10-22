import { AclRule, FileNode } from '../contracts/types';
export declare function createDefaultAcl(preset: 'open' | 'engineering' | 'vault' | 'creative'): AclRule[];
/**
 * Generates realistic fake FileNodes for high-speed performance benchmarking.
 */
export declare function generateStressTestNodes(count: number, parentId: string | null, idPrefix?: string): FileNode[];
export declare function getInitialSeedNodes(): FileNode[];
//# sourceMappingURL=seedFileSystem.d.ts.map