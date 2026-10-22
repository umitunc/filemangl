import { DocSectionId, IDocModuleDefinition } from '../contracts/docTypes';
/**
 * Open/Closed Principle (OCP) Registry:
 * Adding a new documentation chapter requires only registering a new IDocModuleDefinition here.
 */
export declare const DOC_MODULE_REGISTRY: ReadonlyArray<IDocModuleDefinition>;
export declare function getDocModuleById(id: DocSectionId): IDocModuleDefinition;
export declare function filterDocModules(query: string): ReadonlyArray<IDocModuleDefinition>;
//# sourceMappingURL=docModuleRegistry.d.ts.map