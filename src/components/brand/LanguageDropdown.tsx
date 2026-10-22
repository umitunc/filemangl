import React, { useEffect, useRef, useState } from 'react';
import { SupportedLocale } from '../../core/contracts/types';
import { LOCALE_LIST } from '../../core/i18n/I18nProvider';
import { Globe, ChevronDown, Check } from 'lucide-react';

export interface LanguageDropdownProps {
  locale: SupportedLocale;
  onSelectLocale: (locale: SupportedLocale) => void;
  compact?: boolean;
}

export const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  locale,
  onSelectLocale,
  compact = false,
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeMeta =
    LOCALE_LIST.find((l) => l.code === locale) || LOCALE_LIST[0];

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center justify-center gap-1.5 transition ${
          compact
            ? 'px-2 py-1 rounded-lg text-[11px] hover:bg-slate-800/60 text-slate-200'
            : 'h-[38px] px-2.5 rounded-[8px] bg-white/[0.05] hover:bg-slate-800/70 border border-white/[0.08] text-[12px] font-bold text-slate-100'
        }`}
        title={`Dil Seçimi: ${activeMeta.label} (${activeMeta.code.toUpperCase()})`}
      >
        {compact && <Globe className="w-3.5 h-3.5 text-[#00C8FF] shrink-0" />}
        <span className="font-bold uppercase tracking-wide">
          {activeMeta.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
            open ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`${
          open ? 'block' : 'hidden'
        } absolute right-0 mt-1.5 w-44 rounded-xl bg-[#0e1525] border border-slate-800 shadow-2xl py-1.5 z-50`}
      >
        {LOCALE_LIST.map((loc) => {
          const isSelected = loc.code === locale;
          return (
            <button
              key={loc.code}
              type="button"
              onClick={() => {
                onSelectLocale(loc.code);
                setOpen(false);
              }}
              title={`${loc.label} (${loc.code}.json)`}
              className={`w-full px-3 py-1.5 text-xs flex items-center justify-between transition ${
                isSelected
                  ? 'bg-emerald-500/15 text-[#2FF58E] font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{loc.flag}</span>
                <span>{loc.label}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono uppercase opacity-70">
                  {loc.code}
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#2FF58E]" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
