import React, { useEffect, useState, useCallback } from 'react';
import { DEFAULT_FILE_MANAGER_CONFIG } from './core/config/defaultConfig';
import { ExplorerViewMode, IFileManagerConfig, SupportedLocale } from './core/contracts/types';
import { FileManGL } from './components/explorer/HyperionFileManager';
import { ConfigPlaygroundPanel } from './components/configurator/ConfigPlaygroundPanel';
import {
  DocumentationPortal,
  DocSectionId,
} from './components/docs/DocumentationPortal';
import {
  I18nProvider,
  DICTIONARIES,
} from './core/i18n/I18nProvider';
import { HyperionLogo } from './components/brand/HyperionLogo';
import { LanguageDropdown } from './components/brand/LanguageDropdown';
import {
  Cpu,
  Shield,
  BookOpen,
  Sliders,
  Server,
  PieChart,
  Zap,
  Sun,
  Moon,
  Play,
  Home,
} from 'lucide-react';

type AppRoute = 'home' | 'demo' | 'documentation' | 'configurator';

function parseLocation(): {
  route: AppRoute;
  docSection?: DocSectionId;
  viewOverride?: ExplorerViewMode;
  dualOverride?: boolean;
  langOverride?: SupportedLocale;
} {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(window.location.search);

  let route: AppRoute = 'home';
  let docSection: DocSectionId | undefined;

  if (path === '/demo' || path.startsWith('/demo/')) {
    route = 'demo';
  } else if (
    path === '/documentation' ||
    path === '/docs' ||
    path.startsWith('/documentation/') ||
    path.startsWith('/docs/')
  ) {
    route = 'documentation';
    if (path.includes('laravel')) docSection = 'laravel_backend';
    else if (path.includes('node')) docSection = 'nodejs_backend';
    else if (path.includes('connector')) docSection = 'connector_spec';
    else if (path.includes('permission') || path.includes('acl'))
      docSection = 'permission_engine';
    else if (path.includes('solid') || path.includes('webgl'))
      docSection = 'solid_architecture';
    else if (path.includes('i18n') || path.includes('locale'))
      docSection = 'i18n_localization';
    else if (path.includes('test')) docSection = 'testing_automation';
    else if (path.includes('quick')) docSection = 'quickstart';
  } else if (path === '/configurator' || path === '/config') {
    route = 'configurator';
  }

  const tabParam = params.get('tab') as DocSectionId | null;
  if (tabParam) docSection = tabParam;

  const viewParam = params.get('view') as ExplorerViewMode | null;
  const dualParam = params.get('dual');
  const langParam = params.get('lang') as SupportedLocale | null;
  const validLang: SupportedLocale | undefined =
    langParam === 'tr' || langParam === 'en' || langParam === 'de' || langParam === 'ru'
      ? langParam
      : undefined;

  return {
    route,
    docSection,
    viewOverride: viewParam || undefined,
    dualOverride: dualParam === '1' ? true : dualParam === '0' ? false : undefined,
    langOverride: validLang,
  };
}

export function App() {
  const [config, setConfig] = useState<IFileManagerConfig>(DEFAULT_FILE_MANAGER_CONFIG);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [routeState, setRouteState] = useState(parseLocation);

  const dict = DICTIONARIES[config.locale] || DICTIONARIES.tr;

  const handleUpdateConfig = useCallback((patch: Partial<IFileManagerConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  const navigate = useCallback(
    (url: string, configPatch?: Partial<IFileManagerConfig>) => {
      if (configPatch) {
        setConfig((prev) => ({ ...prev, ...configPatch }));
      }
      window.history.pushState({}, '', url);
      const next = parseLocation();
      setRouteState(next);
      if (next.viewOverride || next.langOverride || next.dualOverride !== undefined) {
        setConfig((prev) => ({
          ...prev,
          defaultViewMode: next.viewOverride || prev.defaultViewMode,
          locale: next.langOverride || prev.locale,
          enableDualPane:
            next.dualOverride !== undefined ? next.dualOverride : prev.enableDualPane,
        }));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  useEffect(() => {
    const onPopState = () => {
      const next = parseLocation();
      setRouteState(next);
      if (next.viewOverride || next.langOverride || next.dualOverride !== undefined) {
        setConfig((prev) => ({
          ...prev,
          defaultViewMode: next.viewOverride || prev.defaultViewMode,
          locale: next.langOverride || prev.locale,
          enableDualPane:
            next.dualOverride !== undefined ? next.dualOverride : prev.enableDualPane,
        }));
      }
    };
    window.addEventListener('popstate', onPopState);
    if (
      routeState.viewOverride ||
      routeState.langOverride ||
      routeState.dualOverride !== undefined
    ) {
      setConfig((prev) => ({
        ...prev,
        defaultViewMode: routeState.viewOverride || prev.defaultViewMode,
        locale: routeState.langOverride || prev.locale,
        enableDualPane:
          routeState.dualOverride !== undefined
            ? routeState.dualOverride
            : prev.enableDualPane,
      }));
    }
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const { route, docSection } = routeState;

  return (
    <I18nProvider
      locale={config.locale}
      onLocaleChange={(locale) => handleUpdateConfig({ locale })}
    >
      <div
        className={`min-h-screen font-sans bg-[#070b12] text-slate-100 flex flex-col selection:bg-blue-500/30 ${
          config.theme === 'light' ? 'theme-light' : ''
        }`}
      >
        {/* ====================================================================
            MINIMAL BORDERLESS SINGLE-LINE STICKY HEADER (FileManGL)
        ==================================================================== */}
        <header className="sticky top-0 z-40 bg-[#070b12]/85 backdrop-blur-xl border-b border-slate-800/50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            {/* Brand: Logo + FileManGL + Minimal Version Tag */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="flex items-center gap-2.5 group shrink-0"
            >
              <HyperionLogo size={32} />
              <span className="font-extrabold text-base tracking-tight text-white">
                FileMan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FF58E] via-[#00C8FF] to-[#0077FF]">
                  GL
                </span>
              </span>
              <span className="text-[11px] font-mono font-semibold text-emerald-400/90 hidden sm:inline-block">
                v1.0.4
              </span>
            </a>

            {/* Center Borderless Single-Line Navigation */}
            <nav className="flex items-center gap-2 text-xs font-medium overflow-x-auto no-scrollbar">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                  route === 'home'
                    ? 'bg-cyan-500/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-[#2FF58E]" />
                <span>{dict.nav.landing}</span>
              </a>

              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/demo');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                  route === 'demo'
                    ? 'bg-cyan-500/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Play className="w-3.5 h-3.5 text-[#00C8FF]" />
                <span>{dict.nav.liveDemo}</span>
              </a>

              <a
                href="/documentation"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/documentation');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                  route === 'documentation'
                    ? 'bg-cyan-500/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>{dict.nav.documentation}</span>
              </a>

              <a
                href="/configurator"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/configurator');
                }}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                  route === 'configurator'
                    ? 'bg-cyan-500/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>{dict.nav.configurator}</span>
              </a>
            </nav>

            {/* Right Borderless Controls: Language Dropdown + Icon Theme Toggle + CTA */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageDropdown
                locale={config.locale}
                onSelectLocale={(locale) => handleUpdateConfig({ locale })}
              />

              <button
                onClick={() =>
                  handleUpdateConfig({
                    theme: config.theme === 'light' ? 'dark' : 'light',
                  })
                }
                className="w-8 h-8 rounded-lg hover:bg-slate-800/60 text-slate-300 flex items-center justify-center transition"
                title="Dark / Light Tema"
              >
                {config.theme === 'light' ? (
                  <Moon className="w-4 h-4 text-indigo-500" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>

              {route !== 'demo' && (
                <a
                  href="/demo"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/demo');
                  }}
                  style={{ color: '#ffffff' }}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#18E092] via-[#00B4F5] to-[#0062D6] hover:brightness-110 font-sans text-xs font-bold text-white flex items-center gap-1.5 whitespace-nowrap shadow-lg shadow-cyan-500/20 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{dict.nav.startDemo}</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* ====================================================================
            ROUTE 1: /demo (DEDICATED FULL-VIEWPORT LIVE FILE MANAGER WORKSPACE)
        ==================================================================== */}
        {route === 'demo' && (
          <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-5 py-3 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-white">/demo</strong> — {dict.hero.livePreviewHint}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <a
                  href="/configurator"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/configurator');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1"
                >
                  <Sliders className="w-3.5 h-3.5 text-blue-400" /> {dict.nav.configurator}{' '}
                  (/configurator)
                </a>
                <a
                  href="/documentation"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/documentation');
                  }}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> {dict.nav.documentation}{' '}
                  (/documentation)
                </a>
              </div>
            </div>

            <FileManGL
              config={config}
              onConfigChange={handleUpdateConfig}
              isFullscreen={isFullscreen}
              onToggleFullscreen={() => setIsFullscreen((f) => !f)}
            />
          </main>
        )}

        {/* ====================================================================
            ROUTE 2: /documentation (DEDICATED DEVELOPER DOCS & BACKEND PORTAL)
        ==================================================================== */}
        {route === 'documentation' && (
          <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] font-mono mb-2">
                  <span>/documentation</span>
                  <span>•</span>
                  <span>VFS, Laravel 11, Node.js, i18n, SOLID & ACL</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {dict.nav.documentation}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/documentation/laravel"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/documentation/laravel');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono font-semibold hover:bg-rose-500/25"
                >
                  /documentation/laravel
                </a>
                <a
                  href="/documentation/nodejs"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/documentation/nodejs');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-500/25"
                >
                  /documentation/nodejs
                </a>
                <a
                  href="/demo"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/demo');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> {dict.nav.liveDemo} (/demo)
                </a>
              </div>
            </div>

            <DocumentationPortal initialSection={docSection} />
          </main>
        )}

        {/* ====================================================================
            ROUTE 3: /configurator (DEDICATED SOLID CONFIG BUILDER + LIVE PREVIEW)
        ==================================================================== */}
        {route === 'configurator' && (
          <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-2">
                  <span>/configurator</span>
                  <span>•</span>
                  <span>SOLID Config & i18n JSX Builder</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white">
                  {dict.configurator.title}
                </h1>
                <p className="text-xs text-slate-400 mt-1">{dict.configurator.subtitle}</p>
              </div>
              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/demo');
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg shadow-blue-600/25"
              >
                <Play className="w-4 h-4" /> {dict.nav.liveDemo} (/demo)
              </a>
            </div>

            <ConfigPlaygroundPanel config={config} onUpdateConfig={handleUpdateConfig} />

            <div className="space-y-2">
              <FileManGL
                config={config}
                onConfigChange={handleUpdateConfig}
                isFullscreen={isFullscreen}
                onToggleFullscreen={() => setIsFullscreen((f) => !f)}
              />
            </div>
          </main>
        )}

        {/* ====================================================================
            ROUTE 4: / (CENTERED SHEETGL-STYLE LANDING PAGE WITH LOGO AT CENTER)
        ==================================================================== */}
        {route === 'home' && (
          <>
            <section className="relative overflow-hidden pt-12 pb-12 border-b border-slate-800/60">
              {/* SheetGL-style Centered Radial Glow & Subtle Architectural Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(16,220,158,0.16),rgba(0,184,255,0.10)_36%,transparent_70%)] pointer-events-none" />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-[420px] opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.12) 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                  maskImage:
                    'radial-gradient(ellipse 60% 70% at 50% 30%, black 20%, transparent 100%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 60% 70% at 50% 30%, black 20%, transparent 100%)',
                }}
              />

              <div className="max-w-[1160px] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
                {/* Centerpiece 3D Fluent Emerald-Cyan-Sapphire Logo (50% Larger: 114 -> 172, Borderless) */}
                <div className="mb-7">
                  <HyperionLogo size={172} withGlow />
                </div>

                {/* Centered Bold Headline with Middle-Icon Emerald-Cyan-Sapphire Gradient */}
                <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] max-w-4xl">
                  {dict.hero.titlePrefix}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FF58E] via-[#00C8FF] to-[#0066E6]">
                    {dict.hero.titleHighlight}
                  </span>{' '}
                  {dict.hero.titleSuffix}
                </h1>

                {/* Concise, Uncluttered Subtitle */}
                <p className="mt-4 font-sans text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl">
                  Windows 11 sekmeli gezgin deneyimi, WebGL2 GPU sahnesi, 5 katmanlı NTFS ACL +
                  POSIX (0755) izin motoru ve sıfır kurulumlu VFS / Laravel / Node.js sürücüleri.
                </p>

                {/* Centered Primary Action Buttons */}
                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="/demo"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/demo', {
                        defaultViewMode: 'large_icons',
                        enableDualPane: false,
                      });
                    }}
                    style={{ color: '#ffffff' }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#18E092] via-[#00B4F5] to-[#0062D6] hover:brightness-110 font-sans text-xs sm:text-sm font-bold text-white flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition"
                  >
                    <Play className="w-4 h-4 fill-white text-white" /> {dict.hero.openDemoBtn}
                  </a>

                  <a
                    href="/demo?view=webgl_spatial"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/demo?view=webgl_spatial', {
                        defaultViewMode: 'webgl_spatial',
                        enableDualPane: false,
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 hover:border-cyan-400/50 text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-2 transition"
                  >
                    <Cpu className="w-4 h-4 text-[#18E092]" /> {dict.hero.webglSceneBtn}
                  </a>

                  <a
                    href="/demo?view=webgl_diskmap"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/demo?view=webgl_diskmap', {
                        defaultViewMode: 'webgl_diskmap',
                        enableDualPane: false,
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 hover:border-emerald-400/50 text-xs sm:text-sm font-semibold text-emerald-300 flex items-center gap-2 transition"
                  >
                    <PieChart className="w-4 h-4 text-emerald-400" /> {dict.hero.diskMapBtn}
                  </a>

                  <a
                    href="/documentation"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/documentation');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2 transition"
                  >
                    <BookOpen className="w-4 h-4 text-sky-400" /> {dict.hero.docsBtn}
                  </a>
                </div>

                {/* Minimal 4-Pillar Centered Feature Strip (SheetGL Style) */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10 w-full">
                  {[
                    {
                      icon: <Cpu className="w-4 h-4 text-[#2FF58E]" />,
                      title: dict.hero.card1Title,
                      tag: '60 FPS GPU',
                      href: '/demo?view=webgl_spatial',
                      patch: { defaultViewMode: 'webgl_spatial' as ExplorerViewMode },
                    },
                    {
                      icon: <Shield className="w-4 h-4 text-[#00C8FF]" />,
                      title: dict.hero.card2Title,
                      tag: 'ACL + 0755',
                      href: '/demo',
                      patch: undefined,
                    },
                    {
                      icon: <Server className="w-4 h-4 text-sky-400" />,
                      title: dict.hero.card3Title,
                      tag: 'REST + VFS',
                      href: '/documentation/laravel',
                      patch: undefined,
                    },
                    {
                      icon: <Sliders className="w-4 h-4 text-emerald-400" />,
                      title: dict.hero.card4Title,
                      tag: 'TR • EN • DE • RU',
                      href: '/configurator',
                      patch: undefined,
                    },
                  ].map((item, idx) => (
                    <a
                      key={idx}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.href, item.patch);
                      }}
                      className="px-4 py-3 rounded-2xl bg-slate-900/55 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 flex flex-col items-center text-center gap-1.5 transition group"
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/90 text-slate-400 border border-slate-800">
                        {item.tag}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Centered Interactive Live Workspace Preview */}
            <main className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-8">
              <section className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center">
                  <Zap className="w-3.5 h-3.5 text-[#2FF58E]" />
                  <span>{dict.hero.livePreviewHint}</span>
                </div>

                <div className="rounded-2xl p-[1px] bg-gradient-to-b from-emerald-400/25 via-cyan-500/20 to-slate-800/40 shadow-2xl">
                  <FileManGL
                    config={config}
                    onConfigChange={handleUpdateConfig}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={() => setIsFullscreen((f) => !f)}
                  />
                </div>
              </section>
            </main>
          </>
        )}

        {/* Centered Minimal Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-[#05080e] py-5 px-6 text-xs text-slate-500">
          <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <HyperionLogo size={22} />
              <span className="text-slate-200 font-semibold">FileManGL v1.0.4</span>
              <span className="hidden md:inline">
                — SOLID • WebGL2 • NTFS ACL/POSIX • i18n (TR/EN/DE/RU)
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="hover:text-cyan-400 transition"
              >
                / ({dict.nav.landing})
              </a>
              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/demo');
                }}
                className="hover:text-cyan-400 transition"
              >
                /demo
              </a>
              <a
                href="/documentation"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/documentation');
                }}
                className="hover:text-cyan-400 transition"
              >
                /documentation
              </a>
              <a
                href="/configurator"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/configurator');
                }}
                className="hover:text-cyan-400 transition"
              >
                /configurator
              </a>
            </div>
          </div>
        </footer>
      </div>
    </I18nProvider>
  );
}

export default App;
