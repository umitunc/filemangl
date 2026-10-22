import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DocSectionId,
  DocSubSectionItem,
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

const SIDEBAR_MIN_WIDTH = 240;
const SIDEBAR_MAX_WIDTH = 560;
const SIDEBAR_DEFAULT_WIDTH = 340;
const SIDEBAR_STORAGE_KEY = 'filemangl_docs_sidebar_width';

export const DocumentationPortal: React.FC<DocumentationPortalProps> = ({
  initialSection = 'quickstart',
}) => {
  const [activeDoc, setActiveDoc] = useState<DocSectionId>(initialSection);
  const [activeSubId, setActiveSubId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Resizable Sidebar Width (persisted in localStorage)
  const [sidebarWidth, setSidebarWidth] = useState<number>(() => {
    try {
      const saved = Number(localStorage.getItem(SIDEBAR_STORAGE_KEY));
      if (!Number.isNaN(saved) && saved >= SIDEBAR_MIN_WIDTH && saved <= SIDEBAR_MAX_WIDTH) {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return SIDEBAR_DEFAULT_WIDTH;
  });
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; startWidth: number }>({
    startX: 0,
    startWidth: SIDEBAR_DEFAULT_WIDTH,
  });

  // Expandable / Dropdown sections state in sidebar
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => ({
    quickstart: true,
    connector_spec: true,
    laravel_backend: false,
    nodejs_backend: false,
    permission_engine: true,
    solid_architecture: false,
    i18n_localization: false,
    testing_automation: false,
  }));

  useEffect(() => {
    if (initialSection) {
      setActiveDoc(initialSection);
      setExpandedModules((prev) => ({ ...prev, [initialSection]: true }));
    }
  }, [initialSection]);

  // Handle mouse drag for resizing the documentation sidebar width
  const handleStartResize = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      dragStartRef.current = {
        startX: e.clientX,
        startWidth: sidebarWidth,
      };
      setIsResizing(true);
    },
    [sidebarWidth]
  );

  useEffect(() => {
    if (!isResizing) return;

    const onMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - dragStartRef.current.startX;
      const nextWidth = Math.min(
        SIDEBAR_MAX_WIDTH,
        Math.max(SIDEBAR_MIN_WIDTH, dragStartRef.current.startWidth + delta)
      );
      setSidebarWidth(nextWidth);
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(nextWidth));
      } catch {
        // ignore
      }
    };

    const onMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isResizing]);

  const filteredModules = useMemo(() => {
    return filterDocModules(searchQuery);
  }, [searchQuery]);

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

  const handleSelectModule = (id: DocSectionId) => {
    setActiveDoc(id);
    setActiveSubId('');
    setExpandedModules((prev) => ({ ...prev, [id]: true }));
  };

  const handleToggleExpandModule = (id: DocSectionId, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectSubItem = (moduleId: DocSectionId, sub: DocSubSectionItem) => {
    if (activeDoc !== moduleId) {
      setActiveDoc(moduleId);
    }
    setActiveSubId(sub.id);
    setExpandedModules((prev) => ({ ...prev, [moduleId]: true }));
    setTimeout(() => {
      const el = document.getElementById(sub.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const allExpanded = useMemo(
    () => DOC_MODULE_REGISTRY.every((m) => expandedModules[m.id]),
    [expandedModules]
  );

  const toggleExpandAll = () => {
    const nextState: Record<string, boolean> = {};
    for (const m of DOC_MODULE_REGISTRY) {
      nextState[m.id] = !allExpanded;
    }
    setExpandedModules(nextState);
  };

  return (
    <div
      className={`w-full flex-1 bg-[#0c121e] border-b border-slate-800 flex flex-col lg:flex-row min-h-[calc(100vh-125px)] ${
        isResizing ? 'select-none cursor-col-resize' : ''
      }`}
    >
      {/* ====================================================================
          LEFT RESIZABLE & DROPDOWN / ACCORDION DOCUMENTATION SIDEBAR
      ==================================================================== */}
      {!sidebarCollapsed && (
        <aside
          style={{
            width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? sidebarWidth : undefined,
          }}
          className="w-full lg:shrink-0 bg-[#080d16] border-b lg:border-b-0 border-slate-800 p-4 flex flex-col gap-3 min-w-0"
        >
          {/* Sidebar Header + Expand All / Collapse Button */}
          <div className="pb-3 border-b border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-blue-400"
                  style={{ fontSize: '18px' }}
                >
                  menu_book
                </span>
                <span>FileManGL Dokümantasyonu</span>
              </h3>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleExpandAll}
                  title={allExpanded ? 'Tüm alt menüleri daralt' : 'Tüm alt menüleri aç'}
                  className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-800 transition"
                >
                  {allExpanded ? 'Daralt' : 'Tümünü Aç'}
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(true)}
                  title="Kenar çubuğunu gizle"
                  className="hidden lg:inline-flex p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                    left_panel_close
                  </span>
                </button>
              </div>
            </div>

            {/* Quick Chapter Jump Dropdown (<select>) */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                Hızlı Bölüm Seçici (Dropdown)
              </label>
              <select
                value={activeDoc}
                onChange={(e) => handleSelectModule(e.target.value as DocSectionId)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none cursor-pointer"
              >
                {DOC_MODULE_REGISTRY.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.title} ({m.badge})
                  </option>
                ))}
              </select>
            </div>

            {/* Module & Property Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Prop, config veya konu ara (borderRadius, ACL)..."
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
          </div>

          {/* Hierarchical Dropdown / Accordion Modules List */}
          <div className="flex flex-col gap-1.5 overflow-y-auto pr-0.5">
            {filteredModules.map((item) => {
              const isSelected = activeDoc === item.id;
              const isExpanded = Boolean(
                expandedModules[item.id] || isSelected || searchQuery.trim()
              );
              const subItems = item.subItems ?? [];

              return (
                <div key={item.id} className="flex flex-col">
                  <div
                    className={`w-full rounded-xl transition flex items-center justify-between border ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500/60 text-white shadow-sm'
                        : 'bg-slate-900/40 border-slate-800/70 text-slate-300 hover:bg-slate-800/70 hover:text-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectModule(item.id)}
                      className="flex-1 p-2.5 text-left flex items-start gap-2 min-w-0"
                    >
                      <span
                        className={`material-symbols-outlined shrink-0 mt-0.5 ${item.iconColorClass}`}
                        style={{ fontSize: '17px' }}
                      >
                        {item.iconName}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold leading-snug break-words">
                          {item.title}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                          {item.routeSlug}
                        </div>
                      </div>
                    </button>

                    <div className="flex items-center gap-1 pr-2 shrink-0">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                        {item.badge}
                      </span>
                      {subItems.length > 0 && (
                        <button
                          type="button"
                          onClick={(e) => handleToggleExpandModule(item.id, e)}
                          title="Alt başlıkları aç / kapat"
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                        >
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '16px' }}
                          >
                            {isExpanded ? 'expand_more' : 'chevron_right'}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Nested Dropdown Sub-Items */}
                  {isExpanded && subItems.length > 0 && (
                    <div className="ml-4 pl-3 mt-1 mb-1.5 border-l-2 border-slate-800 flex flex-col gap-1">
                      {subItems.map((sub) => {
                        const isSubActive = isSelected && activeSubId === sub.id;
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleSelectSubItem(item.id, sub)}
                            className={`w-full px-2.5 py-1.5 rounded-lg text-left text-[11px] flex items-center justify-between gap-2 transition ${
                              isSubActive
                                ? 'bg-blue-600/20 text-blue-300 font-semibold'
                                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/70'
                            }`}
                          >
                            <span className="leading-snug">{sub.label}</span>
                            {sub.badge && (
                              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0">
                                {sub.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Sidebar Width Info & Reset */}
          <div className="hidden lg:flex items-center justify-between pt-2 border-t border-slate-800/70 text-[10px] font-mono text-slate-500 mt-auto">
            <span>Genişlik: {sidebarWidth}px (Sürükle-Boyutlandır)</span>
            <button
              type="button"
              onClick={() => {
                setSidebarWidth(SIDEBAR_DEFAULT_WIDTH);
                try {
                  localStorage.setItem(SIDEBAR_STORAGE_KEY, String(SIDEBAR_DEFAULT_WIDTH));
                } catch {
                  // ignore
                }
              }}
              className="text-slate-400 hover:text-cyan-400 underline"
            >
              Sıfırla
            </button>
          </div>
        </aside>
      )}

      {/* ====================================================================
          VERTICAL DRAG-TO-RESIZE SPLITTER HANDLE (DESKTOP)
      ==================================================================== */}
      {!sidebarCollapsed && (
        <div
          onMouseDown={handleStartResize}
          onDoubleClick={() => setSidebarWidth(SIDEBAR_DEFAULT_WIDTH)}
          title="Kenar çubuğu genişliğini ayarlamak için sürükleyin (Çift tık: Sıfırla)"
          className={`hidden lg:flex w-2 shrink-0 cursor-col-resize items-center justify-center border-r border-slate-800 transition-colors group ${
            isResizing
              ? 'bg-blue-500/40 border-blue-500'
              : 'bg-[#080d16] hover:bg-blue-500/25'
          }`}
        >
          <div
            className={`w-0.5 h-10 rounded-full transition-colors ${
              isResizing ? 'bg-blue-400' : 'bg-slate-700 group-hover:bg-blue-400'
            }`}
          />
        </div>
      )}

      {/* ====================================================================
          RIGHT FULL-WIDTH DOCUMENTATION CONTENT AREA
      ==================================================================== */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden overflow-y-auto flex flex-col gap-6 text-sm text-slate-300 leading-relaxed">
        <div className="min-w-0">
          {/* Active Module Top Bar with Sidebar Re-open Button + Sub-Section Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-2 font-mono text-slate-400 min-w-0">
              {sidebarCollapsed && (
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5 font-sans font-semibold transition"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    left_panel_open
                  </span>
                  <span>Menüyü Göster</span>
                </button>
              )}
              <span className="px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400">
                {activeModule.routeSlug}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="text-xs text-slate-300 font-sans">{activeModule.subtitle}</span>
            </div>

            {activeModule.subItems && activeModule.subItems.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {activeModule.subItems.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => handleSelectSubItem(activeModule.id, sub)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition ${
                      activeSubId === sub.id
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Module Self-Contained Component */}
          <ActiveComponent />
        </div>

        {/* Footer Chapter Navigation (Previous / Next Module) */}
        <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto">
          {prevModule ? (
            <button
              onClick={() => handleSelectModule(prevModule.id)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-2 transition"
            >
              <span className="material-symbols-outlined shrink-0" style={{ fontSize: '16px' }}>
                arrow_back
              </span>
              <div className="text-left min-w-0">
                <div className="text-[10px] text-slate-400">Önceki Bölüm</div>
                <div className="font-semibold text-white">{prevModule.title}</div>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextModule && (
            <button
              onClick={() => handleSelectModule(nextModule.id)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center justify-between sm:justify-end gap-2 transition sm:ml-auto"
            >
              <div className="text-left sm:text-right min-w-0">
                <div className="text-[10px] text-slate-400">Sonraki Bölüm</div>
                <div className="font-semibold text-white">{nextModule.title}</div>
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
