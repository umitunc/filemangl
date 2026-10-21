import { DocSectionId, IDocModuleDefinition } from '../contracts/docTypes';
import { QuickStartVfsDocModule } from '../modules/QuickStartVfsDocModule';
import { ConnectorProtocolDocModule } from '../modules/ConnectorProtocolDocModule';
import { LaravelBackendDocModule } from '../modules/LaravelBackendDocModule';
import { NodejsBackendDocModule } from '../modules/NodejsBackendDocModule';
import { PermissionQuotaDocModule } from '../modules/PermissionQuotaDocModule';
import { SolidArchitectureDocModule } from '../modules/SolidArchitectureDocModule';
import { I18nLocalizationDocModule } from '../modules/I18nLocalizationDocModule';
import { TestingAndAutomationDocModule } from '../modules/TestingAndAutomationDocModule';

/**
 * Open/Closed Principle (OCP) Registry:
 * Adding a new documentation chapter requires only registering a new IDocModuleDefinition here.
 */
export const DOC_MODULE_REGISTRY: ReadonlyArray<IDocModuleDefinition> = [
  QuickStartVfsDocModule,
  ConnectorProtocolDocModule,
  LaravelBackendDocModule,
  NodejsBackendDocModule,
  PermissionQuotaDocModule,
  SolidArchitectureDocModule,
  I18nLocalizationDocModule,
  TestingAndAutomationDocModule,
];

export function getDocModuleById(id: DocSectionId): IDocModuleDefinition {
  return (
    DOC_MODULE_REGISTRY.find((m) => m.id === id) || LaravelBackendDocModule
  );
}

export function filterDocModules(
  query: string
): ReadonlyArray<IDocModuleDefinition> {
  const q = query.trim().toLowerCase();
  if (!q) return DOC_MODULE_REGISTRY;
  return DOC_MODULE_REGISTRY.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.subtitle.toLowerCase().includes(q) ||
      m.badge.toLowerCase().includes(q) ||
      m.solidFocus.some((s) => s.toLowerCase().includes(q)) ||
      m.searchKeywords.some((k) => k.toLowerCase().includes(q))
  );
}
