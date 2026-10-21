import {
  ISyntaxGrammarStrategy,
  SupportedCodeLang,
  SyntaxToken,
  SyntaxTokenType,
} from '../contracts/docTypes';

const TS_PHP_KEYWORDS = new Set([
  'import',
  'export',
  'from',
  'const',
  'let',
  'var',
  'function',
  'return',
  'async',
  'await',
  'interface',
  'type',
  'class',
  'implements',
  'extends',
  'public',
  'private',
  'protected',
  'readonly',
  'static',
  'namespace',
  'use',
  'try',
  'catch',
  'finally',
  'throw',
  'new',
  'switch',
  'case',
  'default',
  'if',
  'else',
  'for',
  'foreach',
  'while',
  'as',
  'in',
  'of',
  'true',
  'false',
  'null',
  'undefined',
  'void',
  'typeof',
  'keyof',
  'uniform',
  'varying',
  'attribute',
  'precision',
  'mediump',
  'highp',
]);

const KNOWN_TYPES = new Set([
  'Promise',
  'FileNode',
  'FileCategory',
  'IFileManagerConfig',
  'IFileSystemDriver',
  'IPermissionStrategy',
  'IQuotaPolicy',
  'PermissionEvaluationResult',
  'UserIdentity',
  'ClipboardState',
  'SupportedLocale',
  'HyperionFileManager',
  'PermissionEngine',
  'QuotaEngine',
  'HyperionConnectorController',
  'HyperionDiskGovernanceService',
  'HyperionMountOptions',
  'CustomS3Driver',
  'Request',
  'Response',
  'Route',
  'Storage',
  'RuntimeException',
  'RecursiveIteratorIterator',
  'RecursiveDirectoryIterator',
  'FilesystemIterator',
  'React',
  'Set',
  'Map',
  'Array',
  'Record',
  'Partial',
  'HTMLElement',
  'string',
  'number',
  'boolean',
  'int',
  'float',
  'vec2',
  'vec3',
  'vec4',
]);

const MASTER_TOKEN_REGEX =
  /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/|^\s*\*.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\$[a-zA-Z_]\w*)|(\b0[oOxX][0-9a-fA-F]+\b|\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*\b)(?=\s*\()|(\b[a-zA-Z_]\w*\b)(?=\s*:)|(\b[a-zA-Z_]\w*\b)|([{}()[\].,:;?]+)|([=+\-*/<>!&|]+)|(\s+)/gm;

/**
 * Universal Code Grammar Strategy (SRP + OCP):
 * Tokenizes TypeScript, TSX, PHP, JSON, Bash, and GLSL lines into strongly-typed SyntaxTokens.
 */
class UniversalCodeGrammarStrategy implements ISyntaxGrammarStrategy {
  public readonly languageIds: SupportedCodeLang[] = [
    'tsx',
    'typescript',
    'php',
    'json',
    'bash',
    'glsl',
  ];

  public tokenizeLine(line: string): SyntaxToken[] {
    if (!line) {
      return [{ type: 'plain', value: '' }];
    }

    const tokens: SyntaxToken[] = [];
    let lastIndex = 0;
    const regex = new RegExp(MASTER_TOKEN_REGEX.source, 'gm');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({
          type: 'plain',
          value: line.slice(lastIndex, match.index),
        });
      }

      const [
        fullMatch,
        commentGroup,
        stringGroup,
        phpVarGroup,
        numberGroup,
        fnCallGroup,
        propNameGroup,
        wordGroup,
        punctGroup,
        operatorGroup,
      ] = match;

      let tokenType: SyntaxTokenType = 'plain';

      if (commentGroup !== undefined) {
        tokenType = 'comment';
      } else if (stringGroup !== undefined) {
        tokenType = 'string';
      } else if (phpVarGroup !== undefined) {
        tokenType = 'variable';
      } else if (numberGroup !== undefined) {
        tokenType = 'number';
      } else if (fnCallGroup !== undefined) {
        if (TS_PHP_KEYWORDS.has(fnCallGroup)) {
          tokenType = 'keyword';
        } else if (KNOWN_TYPES.has(fnCallGroup) || /^[A-Z]/.test(fnCallGroup)) {
          tokenType = 'type';
        } else {
          tokenType = 'function';
        }
      } else if (propNameGroup !== undefined) {
        if (TS_PHP_KEYWORDS.has(propNameGroup)) {
          tokenType = 'keyword';
        } else {
          tokenType = 'property';
        }
      } else if (wordGroup !== undefined) {
        if (TS_PHP_KEYWORDS.has(wordGroup)) {
          tokenType = 'keyword';
        } else if (KNOWN_TYPES.has(wordGroup) || /^[A-Z]/.test(wordGroup)) {
          tokenType = 'type';
        } else {
          tokenType = 'plain';
        }
      } else if (punctGroup !== undefined) {
        tokenType = 'punctuation';
      } else if (operatorGroup !== undefined) {
        tokenType = 'operator';
      }

      tokens.push({ type: tokenType, value: fullMatch });
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < line.length) {
      tokens.push({
        type: 'plain',
        value: line.slice(lastIndex),
      });
    }

    return tokens;
  }
}

/**
 * SyntaxHighlighterEngine (SOLID Open/Closed & Dependency Inversion):
 * Allows registering custom language strategies at runtime without modifying existing consumers.
 */
export class SyntaxHighlighterEngine {
  private static strategies = new Map<SupportedCodeLang, ISyntaxGrammarStrategy>();
  private static fallbackStrategy: ISyntaxGrammarStrategy =
    new UniversalCodeGrammarStrategy();

  static {
    const universal = new UniversalCodeGrammarStrategy();
    for (const lang of universal.languageIds) {
      SyntaxHighlighterEngine.strategies.set(lang, universal);
    }
  }

  public static registerStrategy(strategy: ISyntaxGrammarStrategy): void {
    for (const lang of strategy.languageIds) {
      this.strategies.set(lang, strategy);
    }
  }

  public static tokenizeCode(
    code: string,
    language: SupportedCodeLang
  ): SyntaxToken[][] {
    const strategy = this.strategies.get(language) || this.fallbackStrategy;
    return code.split('\n').map((line) => strategy.tokenizeLine(line));
  }

  public static getTokenClassName(type: SyntaxTokenType): string {
    switch (type) {
      case 'keyword':
        return 'text-purple-400 font-semibold';
      case 'type':
        return 'text-amber-300 font-medium';
      case 'string':
        return 'text-emerald-300';
      case 'comment':
        return 'text-slate-500 italic';
      case 'number':
        return 'text-orange-300';
      case 'function':
        return 'text-sky-300';
      case 'property':
        return 'text-cyan-300';
      case 'variable':
        return 'text-rose-300';
      case 'operator':
        return 'text-pink-400';
      case 'punctuation':
        return 'text-slate-400';
      case 'decorator':
        return 'text-yellow-300';
      default:
        return 'text-slate-200';
    }
  }
}
