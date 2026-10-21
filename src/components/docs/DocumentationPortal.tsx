import React, { useEffect, useMemo, useState } from 'react';
import {
  DocSectionId,
  SolidPrincipleTag,
} from './contracts/docTypes';
import {
  DOC_MODULE_REGISTRY,
  filterDocModules,
  getDocModuleById,
} from './registry/docModuleRegistry';

export type { DocSectionId } from './contracts/docTypes';

interface DocumentationPortalProps {
  initialSection?: DocSectionId;
}

const SOLID_FILTERS: Array<SolidPrincipleTag | 'ALL'> = [
  'ALL',
  'SRP',
  'OCP',
  'LSP',
  'ISP',
  'DIP',
];

export const DocumentationPortal: React.FC<DocumentationPortalProps> = ({
  initialSection = 'laravel_backend',
}) => {
  const [activeDoc, setActiveDoc] = useState<DocSectionId>(initialSection);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [solidFilter, setSolidFilter] = useState<SolidPrincipleTag | 'ALL'>('ALL');

  useEffect(() => {
    if (initialSection) {
      setActiveDoc(initialSection);
    }
  }, [initialSection]);

  const filteredModules = useMemo(() => {
    const byQuery = filterDocModules(searchQuery);
    if (solidFilter === 'ALL') return byQuery;
    return byQuery.filter((m) => m.solidFocus.includes(solidFilter));
  }, [searchQuery, solidFilter]);

  const activeModule = useMemo(
    () => getDocModuleById(activeDoc),
    [activeDoc]
  );

  const ActiveComponent = activeModule.Component;

  const currentIdx = DOC_MODULE_REGISTRY.findIndex((m) => m.id === activeDoc);
  const prevModule = currentIdx > 0 ? DOC_MODULE_REGISTRY[currentIdx - 1] : null;
  const nextModule =
    currentIdx >= 0 && currentIdx < DOC_MODULE_REGISTRY.length - 1
      ? DOC_MODULE_REGISTRY[currentIdx + 1]
      : null;

  return (
    <div className="bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[720px]">
      {/* Left Modular Documentation Sidebar */}
      <div className="lg:col-span-4 xl:col-span-3 bg-[#080d16] border-b lg:border-b-0 lg:border-r border-slate-800 p-3.5 sm:p-4 flex flex-col gap-3 min-w-0">
        <div className="px-1 pb-2.5 border-b border-slate-800/80">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span
                className="material-symbols-outlined text-blue-400"
                style={{ fontSize: '18px' }}
              >
                menu_book
              </span>
              <span>Modüler Dokümantasyon</span>
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 shrink-0">
              {DOC_MODULE_REGISTRY.length} Modül
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            SOLID Prensipleriyle Ayrıştırılmış Sürücü, Backend ve Test Rehberi
          </p>

          {/* Module Search Input */}
          <div className="relative mt-2.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Modül veya anahtar kelime ara..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-3 pr-8 py-1.5 text-xs text-white focus:outline-none"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                  close
                </span>
              </button>
            ) : (
              <span
                className="material-symbols-outlined text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ fontSize: '16px' }}
              >
                search
              </span>
            )}
          </div>

          {/* SOLID Principle Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 mt-2">
            {SOLID_FILTERS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSolidFilter(tag)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${
                  solidFilter === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tag === 'ALL' ? 'Tümü (SOLID)' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Registered Doc Modules List (Compact scrollable grid on mobile/tablet, full list on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 max-h-48 lg:max-h-none overflow-y-auto flex-1 pr-0.5">
          {filteredModules.map((item) => {
            const isSelected = activeDoc === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveDoc(item.id)}
                className={`w-full p-2 sm:p-2.5 rounded-xl text-left transition flex flex-col gap-1 border ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500/60 text-white shadow-sm'
                    : 'bg-slate-900/40 border-slate-800/70 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`material-symbols-outlined shrink-0 ${item.iconColorClass}`}
                      style={{ fontSize: '17px' }}
                    >
                      {item.iconName}
                    </span>
                    <span className="text-xs font-semibold truncate">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 shrink-0">
                    {item.badge}
                  </span>
                </div>

                <div className="hidden sm:flex items-center justify-between pl-6">
                  <span className="text-[10px] text-slate-500 truncate">
                    {item.routeSlug}
                  </span>
                  <div className="flex items-center gap-1">
                    {item.solidFocus.map((s) => (
                      <span
                        key={s}
                        className="px-1 py-0.2 text-[9px] font-mono rounded bg-slate-950/90 text-blue-300 border border-slate-800"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Modular Content Area */}
      <div className="lg:col-span-8 xl:col-span-9 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden overflow-y-auto flex flex-col justify-between gap-6 text-sm text-slate-300 leading-relaxed">
        <div className="min-w-0">
          {/* Active Module Top Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 sm:pb-4 mb-4 sm:mb-5 border-b border-slate-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-slate-400 min-w-0">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400 truncate max-w-full">
                {activeModule.routeSlug}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-[11px] sm:text-xs">{activeModule.subtitle}</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {activeModule.solidFocus.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 text-[10px] font-mono font-bold"
                >
                  SOLID: {s}
                </span>
              ))}
            </div>
          </div>

          {/* Active Module Self-Contained Component */}
          <ActiveComponent />
        </div>

        {/* Footer Chapter Navigation (Previous / Next Module) */}
        <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {prevModule ? (
            <button
              onClick={() => setActiveDoc(prevModule.id)}
              className="px-3.5 py-2.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-2 transition"
            >
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>
                arrow_back
              </span>
              <div className="text-left min-w-0">
                <div className="text-[10px] text-slate-400">Önceki Modül</div>
                <div className="font-semibold text-white truncate">{prevModule.title}</div>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextModule && (
            <button
              onClick={() => setActiveDoc(nextModule.id)}
              className="px-3.5 py-2.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center justify-between sm:justify-end gap-2 transition sm:ml-auto"
            >
              <div className="text-left sm:text-right min-w-0">
                <div className="text-[10px] text-slate-400">Sonraki Modül</div>
                <div className="font-semibold text-white truncate">{nextModule.title}</div>
              </div>
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>
                arrow_forward
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
