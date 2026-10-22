import { ISyntaxGrammarStrategy, SupportedCodeLang, SyntaxToken, SyntaxTokenType } from '../contracts/docTypes';
/**
 * SyntaxHighlighterEngine (SOLID Open/Closed & Dependency Inversion):
 * Allows registering custom language strategies at runtime without modifying existing consumers.
 */
export declare class SyntaxHighlighterEngine {
    private static strategies;
    private static fallbackStrategy;
    static registerStrategy(strategy: ISyntaxGrammarStrategy): void;
    static tokenizeCode(code: string, language: SupportedCodeLang): SyntaxToken[][];
    static getTokenClassName(type: SyntaxTokenType): string;
}
//# sourceMappingURL=SyntaxHighlighterEngine.d.ts.map