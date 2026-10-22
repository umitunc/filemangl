import React, { useEffect, useState, useCallback } from 'react';
import { DEFAULT_FILE_MANAGER_CONFIG } from './core/config/defaultConfig';
import { ExplorerViewMode, IFileManagerConfig, SupportedLocale } from './core/contracts/types';
import { FileManGL } from './components/explorer/FileManGL';
import { ConfigPlaygroundPanel } from './components/configurator/ConfigPlaygroundPanel';
import {
  DocumentationPortal,
  DocSectionId,
} from './components/docs/DocumentationPortal';
import {
  I18nProvider,
  DICTIONARIES,
} from './core/i18n/I18nProvider';
import { FileManGLLogo } from './components/brand/FileManGLLogo';
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
  Terminal,
  Copy,
  Check,
  Code2,
  ExternalLink,
} from 'lucide-react';

type AppRoute = 'home' | 'demo' | 'documentation' | 'configurator';
type InstallTabId = 'npm' | 'npx_init' | 'npx_create' | 'pnpm' | 'yarn' | 'bun';

const INSTALL_COMMANDS: Record<
  InstallTabId,
  { label: string; command: string; hint: string }
> = {
  npm: {
    label: 'npm',
    command: 'npm install filemangl',
    hint: 'Mevcut React 18/19 projenize kurun',
  },
  npx_init: {
    label: 'npx init',
    command: 'npx filemangl init',
    hint: 'Hazır <FileManGLWorkspace /> bileşenini projenize ekler',
  },
  npx_create: {
    label: 'npx create',
    command: 'npx filemangl create my-cloud-drive',
    hint: 'Sıfırdan Vite + React + TS + FileManGL projesi kurar',
  },
  pnpm: {
    label: 'pnpm',
    command: 'pnpm add filemangl',
    hint: 'PNPM çalışma alanı kurulumu',
  },
  yarn: {
    label: 'yarn',
    command: 'yarn add filemangl',
    hint: 'Yarn paket yöneticisi kurulumu',
  },
  bun: {
    label: 'bun',
    command: 'bun add filemangl',
    hint: 'Ultra hızlı Bun runtime kurulumu',
  },
};

const QUICK_USAGE_SNIPPET = `import { FileManGL, DEFAULT_FILE_MANAGER_CONFIG } from 'filemangl';
import 'filemangl/style.css';

export default function App() {
  return (
    <FileManGL
      config={{
        ...DEFAULT_FILE_MANAGER_CONFIG,
        locale: 'tr',
        borderRadius: 'squircle', // 'sharp' | 'squircle' | 'pill'
        driverType: 'vfs_localstorage',
      }}
    />
  );
}`;

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
  const [installTab, setInstallTab] = useState<InstallTabId>('npm');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showUsageCode, setShowUsageCode] = useState<boolean>(false);

  const copyText = useCallback((key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  }, []);

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
            SHEETGL-SIZED STICKY GLASSMORPHISM HEADER (1280px • 68px Desktop / 2-Row Mobile)
        ==================================================================== */}
        <header className="sticky top-0 z-40 w-full bg-[#070b12]/85 backdrop-blur-xl border-b border-slate-800/60 select-none">
          <div
            className={`${
              route === 'home' ? 'max-w-[1280px] mx-auto' : 'w-full'
            } px-3 sm:px-6 py-2.5 lg:py-0 lg:h-[68px] flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-2 gap-x-3 lg:gap-4`}
          >
            {/* LEFT: Brand Logo (size=30) + FileManGL (22px, weight 900, -0.035em) */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="order-1 flex items-center gap-2 sm:gap-[10px] group shrink-0"
            >
              <FileManGLLogo size={30} />
              <span className="text-[19px] sm:text-[22px] font-black tracking-[-0.035em] text-white leading-none">
                FileMan
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FF58E] via-[#00C8FF] to-[#0077FF]">
                  GL
                </span>
              </span>
              <span className="text-[11px] font-mono font-semibold text-emerald-400/90 hidden sm:inline-block">
                v1.0.5
              </span>
            </a>

            {/* CENTER: Nav Links (gap=28px on desktop, full-width scrollable bar on mobile/tablet) */}
            <nav className="order-3 lg:order-2 w-full lg:w-auto pt-2 lg:pt-0 border-t border-slate-800/60 lg:border-t-0 flex items-center justify-between sm:justify-center gap-3 sm:gap-[28px] text-[13px] lg:text-[14px] font-medium overflow-x-auto no-scrollbar">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${
                  route === 'home'
                    ? 'text-[#00C8FF] font-semibold'
                    : 'text-slate-300 hover:text-[#38BDF8]'
                }`}
              >
                <span>{dict.nav.landing}</span>
              </a>

              <a
                href="/demo"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/demo');
                }}
                className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${
                  route === 'demo'
                    ? 'text-[#00C8FF] font-semibold'
                    : 'text-slate-300 hover:text-[#38BDF8]'
                }`}
              >
                <span>{dict.nav.liveDemo}</span>
              </a>

              <a
                href="/documentation"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/documentation');
                }}
                className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${
                  route === 'documentation'
                    ? 'text-[#00C8FF] font-semibold'
                    : 'text-slate-300 hover:text-[#38BDF8]'
                }`}
              >
                <span>{dict.nav.documentation}</span>
              </a>

              <a
                href="/configurator"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/configurator');
                }}
                className={`whitespace-nowrap px-1.5 py-0.5 rounded transition-colors ${
                  route === 'configurator'
                    ? 'text-[#00C8FF] font-semibold'
                    : 'text-slate-300 hover:text-[#38BDF8]'
                }`}
              >
                <span>{dict.nav.configurator}</span>
              </a>

              <a
                href="https://github.com/umitunc/filemangl"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 text-[14px] font-semibold text-slate-300 hover:text-[#38BDF8] whitespace-nowrap transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>
            </nav>

            {/* RIGHT: GitHub Icon (38x38), Language Dropdown, Theme Toggle (38x38), Pill CTA Button */}
            <div className="order-2 lg:order-3 flex items-center gap-1.5 sm:gap-[10px] shrink-0">
              <a
                href="https://github.com/umitunc/filemangl"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Repository (umitunc/filemangl)"
                className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[10px] bg-white/[0.05] hover:border-[#38BDF8] border border-white/[0.08] text-slate-200 flex items-center justify-center transition"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

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
                className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[10px] bg-[#0D111A] hover:border-[#38BDF8] border border-white/[0.08] text-slate-200 flex items-center justify-center transition"
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
                  className="hidden sm:inline-flex px-3.5 py-2 lg:px-[20px] lg:py-[10px] rounded-full bg-gradient-to-r from-[#18E092] via-[#00B4F5] to-[#0062D6] hover:brightness-110 hover:-translate-y-[1px] font-sans text-xs lg:text-[13.5px] font-bold text-white items-center gap-1.5 lg:gap-2 whitespace-nowrap shadow-[0_4px_18px_rgba(2,132,199,0.45)] transition-all"
                >
                  <span>{dict.nav.startDemo}</span>
                  <span className="text-[15px] leading-none">→</span>
                </a>
              )}
            </div>
          </div>
        </header>

        {/* ====================================================================
            ROUTE 1: /demo (DEDICATED FULL-VIEWPORT LIVE FILE MANAGER WORKSPACE)
        ==================================================================== */}
        {route === 'demo' && (
          <main className="flex-1 w-full px-3 sm:px-5 py-3 flex flex-col gap-2.5">
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
            ROUTE 2: /documentation (FULL-WIDTH EDGE-TO-EDGE DEVELOPER DOCS PORTAL)
        ==================================================================== */}
        {route === 'documentation' && (
          <main className="flex-1 w-full flex flex-col">
            <div className="w-full px-4 sm:px-6 py-3 bg-[#080d16] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-base sm:text-lg font-extrabold text-white">
                  {dict.nav.documentation}
                </h1>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-[11px] font-mono">
                  <span>/documentation</span>
                  <span>•</span>
                  <span>Props, IFileManagerConfig (34 Ayar), Tema/Radius, VFS, Laravel &amp; Node.js</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="/documentation/quickstart"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/documentation/quickstart');
                  }}
                  className="px-3 py-1 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono font-semibold hover:bg-blue-500/25"
                >
                  Props &amp; Config
                </a>
                <a
                  href="/documentation/laravel"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/documentation/laravel');
                  }}
                  className="px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-mono font-semibold hover:bg-rose-500/25"
                >
                  /documentation/laravel
                </a>
                <a
                  href="/documentation/nodejs"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/documentation/nodejs');
                  }}
                  className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold hover:bg-emerald-500/25"
                >
                  /documentation/nodejs
                </a>
                <a
                  href="/configurator"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/configurator');
                  }}
                  className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold hover:bg-purple-500/25"
                >
                  Canlı Konfigüratör
                </a>
                <a
                  href="/demo"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/demo');
                  }}
                  className="px-3.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" /> {dict.nav.liveDemo} (/demo)
                </a>
              </div>
            </div>

            <DocumentationPortal initialSection={docSection} />
          </main>
        )}

        {/* ====================================================================
            ROUTE 3: /configurator (FULL-WIDTH CONFIG BUILDER + LIVE PREVIEW)
        ==================================================================== */}
        {route === 'configurator' && (
          <main className="flex-1 w-full px-4 sm:px-6 py-4 sm:py-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-1">
                  <span>/configurator</span>
                  <span>•</span>
                  <span>SOLID Config & i18n JSX Builder</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                  {dict.configurator.title}
                </h1>
                <p className="text-xs text-slate-400 mt-0.5">{dict.configurator.subtitle}</p>
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
            <section className="relative overflow-hidden pt-7 pb-8 sm:pt-12 sm:pb-12 border-b border-slate-800/60">
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

              <div className="max-w-[1160px] mx-auto px-3.5 sm:px-6 relative z-10 flex flex-col items-center text-center">
                {/* Centerpiece 3D Fluent Emerald-Cyan-Sapphire Logo (Responsive scaling on mobile) */}
                <div className="mb-4 sm:mb-7 scale-75 sm:scale-90 lg:scale-100 origin-center">
                  <FileManGLLogo size={172} withGlow />
                </div>

                {/* Centered Bold Headline with Middle-Icon Emerald-Cyan-Sapphire Gradient */}
                <h1 className="font-sans text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] sm:leading-[1.1] max-w-4xl px-1">
                  {dict.hero.titlePrefix}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2FF58E] via-[#00C8FF] to-[#0066E6]">
                    {dict.hero.titleHighlight}
                  </span>{' '}
                  {dict.hero.titleSuffix}
                </h1>

                {/* Concise, Uncluttered Subtitle */}
                <p className="mt-3 sm:mt-4 font-sans text-xs sm:text-base text-slate-300/90 leading-relaxed max-w-2xl px-2">
                  Windows 11 sekmeli gezgin deneyimi, WebGL2 GPU sahnesi, 5 katmanlı NTFS ACL +
                  POSIX (0755) izin motoru ve sıfır kurulumlu VFS / Laravel / Node.js sürücüleri.
                </p>

                {/* Centered Primary Action Buttons */}
                <div className="mt-5 sm:mt-7 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
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
                    className="col-span-2 sm:col-span-1 px-5 sm:px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#18E092] via-[#00B4F5] to-[#0062D6] hover:brightness-110 font-sans text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition"
                  >
                    <Play className="w-4 h-4 fill-white text-white shrink-0" />{' '}
                    <span>{dict.hero.openDemoBtn}</span>
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
                    className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 hover:border-cyan-400/50 text-xs sm:text-sm font-semibold text-cyan-300 flex items-center justify-center gap-1.5 sm:gap-2 transition"
                  >
                    <Cpu className="w-4 h-4 text-[#18E092] shrink-0" />{' '}
                    <span className="truncate">{dict.hero.webglSceneBtn}</span>
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
                    className="px-3.5 sm:px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 hover:border-emerald-400/50 text-xs sm:text-sm font-semibold text-emerald-300 flex items-center justify-center gap-1.5 sm:gap-2 transition"
                  >
                    <PieChart className="w-4 h-4 text-emerald-400 shrink-0" />{' '}
                    <span className="truncate">{dict.hero.diskMapBtn}</span>
                  </a>

                  <a
                    href="/documentation"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/documentation');
                    }}
                    className="col-span-2 sm:col-span-1 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/90 text-xs sm:text-sm font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
                  >
                    <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />{' '}
                    <span>{dict.hero.docsBtn}</span>
                  </a>
                </div>

                {/* ============================================================
                    INTERACTIVE NPM / NPX / PNPM / BUN CLI & REACT USAGE BAR
                ============================================================ */}
                <div className="mt-6 sm:mt-8 w-full max-w-3xl text-left">
                  <div className="rounded-2xl bg-[#090e1a]/95 border border-slate-800/90 shadow-2xl overflow-hidden">
                    {/* Package Manager & CLI Selector Header */}
                    <div className="px-3 sm:px-4 py-2 bg-[#060a12] border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                        <Terminal className="w-3.5 h-3.5 text-[#2FF58E] mr-1 shrink-0" />
                        {(Object.keys(INSTALL_COMMANDS) as InstallTabId[]).map((tabKey) => {
                          const item = INSTALL_COMMANDS[tabKey];
                          const active = installTab === tabKey;
                          return (
                            <button
                              key={tabKey}
                              type="button"
                              onClick={() => setInstallTab(tabKey)}
                              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition whitespace-nowrap ${
                                active
                                  ? 'bg-blue-600/20 text-cyan-300 border border-cyan-500/40'
                                  : 'text-slate-400 hover:text-slate-200 border border-transparent'
                              }`}
                            >
                              {item.label}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowUsageCode((s) => !s)}
                          className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold border flex items-center gap-1 transition ${
                            showUsageCode
                              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{showUsageCode ? 'React Kodunu Gizle' : 'React Kullanımı (JSX)'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Active Command Line Row */}
                    <div className="px-3.5 sm:px-4 py-3 flex items-center justify-between gap-3 bg-[#0b111e]">
                      <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm min-w-0 overflow-x-auto no-scrollbar">
                        <span className="text-emerald-400 select-none font-bold">$</span>
                        <code className="text-slate-100 font-semibold whitespace-nowrap">
                          {INSTALL_COMMANDS[installTab].command}
                        </code>
                        <span className="hidden md:inline text-[11px] text-slate-400 font-sans truncate">
                          — {INSTALL_COMMANDS[installTab].hint}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          copyText(`hero-${installTab}`, INSTALL_COMMANDS[installTab].command)
                        }
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 shrink-0 transition"
                      >
                        {copiedKey === `hero-${installTab}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Kopyalandı</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Kopyala</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Expandable Quick React Usage Snippet */}
                    {showUsageCode && (
                      <div className="border-t border-slate-800/90 bg-[#070b14] p-3.5 sm:p-4 relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono text-slate-400">
                            src/App.tsx — Hızlı React 18/19 Entegrasyonu
                          </span>
                          <button
                            type="button"
                            onClick={() => copyText('hero-jsx', QUICK_USAGE_SNIPPET)}
                            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-200 flex items-center gap-1"
                          >
                            {copiedKey === 'hero-jsx' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-300">Kopyalandı</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-cyan-400" />
                                <span>JSX Kopyala</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="font-mono text-xs text-cyan-200 overflow-x-auto leading-relaxed">
                          <code>{QUICK_USAGE_SNIPPET}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Minimal 4-Pillar Centered Feature Strip (SheetGL Style) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-7 sm:mt-10 w-full">
                  {[
                    {
                      icon: <Cpu className="w-4 h-4 text-[#2FF58E] shrink-0" />,
                      title: dict.hero.card1Title,
                      tag: '60 FPS GPU',
                      href: '/demo?view=webgl_spatial',
                      patch: { defaultViewMode: 'webgl_spatial' as ExplorerViewMode },
                    },
                    {
                      icon: <Shield className="w-4 h-4 text-[#00C8FF] shrink-0" />,
                      title: dict.hero.card2Title,
                      tag: 'ACL + 0755',
                      href: '/demo',
                      patch: undefined,
                    },
                    {
                      icon: <Server className="w-4 h-4 text-sky-400 shrink-0" />,
                      title: dict.hero.card3Title,
                      tag: 'REST + VFS',
                      href: '/documentation/laravel',
                      patch: undefined,
                    },
                    {
                      icon: <Sliders className="w-4 h-4 text-emerald-400 shrink-0" />,
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
                      className="px-4 py-3 rounded-2xl bg-slate-900/55 hover:bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/40 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-left sm:text-center gap-2 sm:gap-1.5 transition group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {item.icon}
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/90 text-slate-400 border border-slate-800 shrink-0">
                        {item.tag}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* Centered Interactive Live Workspace Preview */}
            <main className="max-w-[1440px] w-full mx-auto px-2 sm:px-6 py-5 sm:py-8">
              <section className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 text-center px-2">
                  <Zap className="w-3.5 h-3.5 text-[#2FF58E] shrink-0" />
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

        {/* ====================================================================
            ENTERPRISE FOOTER WITH NPM / CLI USAGES & TRUNÇGİL SIGNATURE
        ==================================================================== */}
        <footer className="mt-auto border-t border-slate-800/80 bg-[#05080e] py-7 px-4 sm:px-6 text-xs text-slate-400">
          <div className={`${route === 'home' ? 'max-w-[1440px] mx-auto' : 'w-full'} space-y-5`}>
            {/* Row 1: Brand Identity + Copyable NPM/CLI Pills + Route Navigation */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-center sm:text-left">
                <FileManGLLogo size={24} />
                <span className="text-slate-100 font-bold text-sm">FileManGL v1.0.5</span>
                <span className="hidden sm:inline text-slate-500">
                  — SOLID • WebGL2 • NTFS ACL/POSIX • i18n (TR/EN/DE/RU)
                </span>
              </div>

              {/* Quick Copyable NPM & NPX Usage Badges in Footer */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'ft-npm', cmd: 'npm i filemangl' },
                  { id: 'ft-npx', cmd: 'npx filemangl init' },
                  { id: 'ft-create', cmd: 'npx filemangl create my-drive' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => copyText(item.id, item.cmd)}
                    title="Panoya kopyalamak için tıklayın"
                    className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 font-mono text-[11px] text-slate-200 flex items-center gap-1.5 transition"
                  >
                    <span className="text-emerald-400 font-bold">$</span>
                    <span>{item.cmd}</span>
                    {copiedKey === item.id ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-400" />
                    )}
                  </button>
                ))}
              </div>

              {/* Route & Package Links */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-mono">
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
                <a
                  href="https://www.npmjs.com/package/filemangl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition"
                >
                  <span>NPM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://github.com/umitunc/filemangl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
                >
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Row 2: Trunçgil Signature & License Bar */}
            <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
              <div>
                MIT License • © {new Date().getFullYear()} <strong>FileManGL</strong> — Açık Kaynak
                WebGL2 & Sanal Dosya Sistemi (VFS) Motoru
              </div>

              <div className="flex items-center gap-2">
                <span>Crafted with</span>
                <span className="text-rose-500 animate-pulse">❤️</span>
                <span>by</span>
                <a
                  href="https://www.truncgil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border border-orange-500/35 text-orange-300 hover:text-white hover:border-orange-400 font-bold tracking-wide transition inline-flex items-center gap-1"
                >
                  <span>🍊 Trunçgil Teknoloji</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </I18nProvider>
  );
}

export default App;
