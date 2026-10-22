import React, { useMemo, useState } from 'react';
import {
  HighlightedCodeBlockProps,
  SolidPrincipleTag,
} from '../contracts/docTypes';
import { SyntaxHighlighterEngine } from '../syntax/SyntaxHighlighterEngine';

const SOLID_BADGE_META: Record<
  SolidPrincipleTag,
  { label: string; colorClass: string }
> = {
  SRP: {
    label: 'S • Single Responsibility',
    colorClass: 'bg-blue-500/15 text-blue-300 border-blue-500/35',
  },
  OCP: {
    label: 'O • Open/Closed Principle',
    colorClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35',
  },
  LSP: {
    label: 'L • Liskov Substitution',
    colorClass: 'bg-amber-500/15 text-amber-300 border-amber-500/35',
  },
  ISP: {
    label: 'I • Interface Segregation',
    colorClass: 'bg-purple-500/15 text-purple-300 border-purple-500/35',
  },
  DIP: {
    label: 'D • Dependency Inversion',
    colorClass: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/35',
  },
};

export const HighlightedCodeBlock: React.FC<HighlightedCodeBlockProps> = ({
  id,
  title,
  language,
  code,
  solidPrinciple,
  description,
  showLineNumbers = true,
}) => {
  const [copied, setCopied] = useState(false);

  const tokenizedLines = useMemo(
    () => SyntaxHighlighterEngine.tokenizeCode(code.trimEnd(), language),
    [code, language]
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const solidMeta = solidPrinciple ? SOLID_BADGE_META[solidPrinciple] : null;

  return (
    <div
      id={id}
      data-codeblock-id={id}
      className="code-surface-dark rounded-xl overflow-hidden border border-slate-800/90 bg-[#060911] my-4 shadow-xl scroll-mt-20"
    >
      {/* Top IDE Tab Header */}
      <div className="px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0c1220] border-b border-slate-800/90 flex items-center justify-between gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
          {/* macOS/Windows Editor Traffic Dots */}
          <div className="hidden xs:flex sm:flex items-center gap-1.5 mr-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <span
            className="material-symbols-outlined text-blue-400 shrink-0"
            style={{ fontSize: '16px' }}
          >
            code_blocks
          </span>
          <span
            className="text-[11px] sm:text-xs font-mono font-semibold text-slate-100 truncate"
            title={title}
          >
            {title}
          </span>

          <span className="px-1.5 sm:px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-slate-800 text-cyan-300 border border-slate-700 shrink-0">
            {language}
          </span>

          <span className="hidden sm:inline text-[10px] font-mono text-slate-400 shrink-0">
            {tokenizedLines.length} satır
          </span>

          {solidMeta && (
            <span
              className={`hidden md:inline-flex px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border shrink-0 ${solidMeta.colorClass}`}
            >
              {solidMeta.label}
            </span>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="px-2 sm:px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-[11px] sm:text-xs text-slate-200 flex items-center gap-1 sm:gap-1.5 transition shrink-0"
        >
          <span
            className={`material-symbols-outlined ${
              copied ? 'text-emerald-400' : 'text-slate-300'
            }`}
            style={{ fontSize: '15px' }}
          >
            {copied ? 'check_circle' : 'content_copy'}
          </span>
          <span className="hidden xs:inline sm:inline">
            {copied ? 'Kopyalandı' : 'Kodu Kopyala'}
          </span>
        </button>
      </div>

      {/* Optional Architectural Note Banner */}
      {description && (
        <div className="px-3 sm:px-4 py-2 bg-[#090e1a] border-b border-slate-800/70 text-[11px] text-slate-300 flex items-start sm:items-center gap-2">
          <span
            className="material-symbols-outlined text-amber-400 shrink-0 mt-0.5 sm:mt-0"
            style={{ fontSize: '15px' }}
          >
            lightbulb
          </span>
          <span>{description}</span>
        </div>
      )}

      {/* Colorized Code Lines with Line Numbers */}
      <div className="p-2.5 sm:p-3.5 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed select-text">
        <table className="w-full border-collapse">
          <tbody>
            {tokenizedLines.map((tokens, lineIdx) => (
              <tr
                key={lineIdx}
                className="hover:bg-slate-900/60 transition-colors"
              >
                {showLineNumbers && (
                  <td className="select-none pr-4 text-right text-[11px] text-slate-600 w-9 align-top">
                    {lineIdx + 1}
                  </td>
                )}
                <td className="whitespace-pre text-slate-200">
                  {tokens.map((tok, tokIdx) => (
                    <span
                      key={tokIdx}
                      data-token-type={tok.type}
                      className={SyntaxHighlighterEngine.getTokenClassName(
                        tok.type
                      )}
                    >
                      {tok.value}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
