import React from 'react';
export type DocSectionId = 'quickstart' | 'connector_spec' | 'laravel_backend' | 'nodejs_backend' | 'permission_engine' | 'solid_architecture' | 'i18n_localization' | 'testing_automation';
export type SupportedCodeLang = 'tsx' | 'typescript' | 'php' | 'json' | 'bash' | 'glsl';
export type SyntaxTokenType = 'plain' | 'keyword' | 'type' | 'string' | 'comment' | 'number' | 'function' | 'property' | 'variable' | 'operator' | 'punctuation' | 'decorator';
export interface SyntaxToken {
    type: SyntaxTokenType;
    value: string;
}
/**
 * Open/Closed Principle (OCP) & Strategy Pattern:
 * Every language syntax grammar implements ISyntaxGrammarStrategy.
 */
export interface ISyntaxGrammarStrategy {
    readonly languageIds: SupportedCodeLang[];
    tokenizeLine(line: string): SyntaxToken[];
}
export type SolidPrincipleTag = 'SRP' | 'OCP' | 'LSP' | 'ISP' | 'DIP';
export interface HighlightedCodeBlockProps {
    id: string;
    title: string;
    language: SupportedCodeLang;
    code: string;
    solidPrinciple?: SolidPrincipleTag;
    description?: string;
    showLineNumbers?: boolean;
}
/**
 * Interface Segregation & Dependency Inversion:
 * Each documentation chapter is an independent, self-contained module implementing IDocModuleDefinition.
 */
export interface IDocModuleDefinition {
    readonly id: DocSectionId;
    readonly stepNumber: number;
    readonly title: string;
    readonly subtitle: string;
    readonly badge: string;
    readonly routeSlug: string;
    readonly solidFocus: SolidPrincipleTag[];
    readonly searchKeywords: string[];
    readonly iconName: string;
    readonly iconColorClass: string;
    readonly Component: React.FC;
}
//# sourceMappingURL=docTypes.d.ts.map