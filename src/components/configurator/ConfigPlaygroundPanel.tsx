import React, { useState } from 'react';
import {
  BorderRadiusPreset,
  IFileManagerConfig,
  SupportedLocale,
} from '../../core/contracts/types';
import { CONFIG_PRESETS } from '../../core/config/defaultConfig';
import { useI18n, LOCALE_LIST } from '../../core/i18n/I18nProvider';
import { HighlightedCodeBlock } from '../docs/ui/HighlightedCodeBlock';
import {
  Sliders,
  Code2,
  HardDrive,
  ShieldCheck,
  Cpu,
  Layout,
  Sparkles,
  Globe,
  Palette,
  Square,
  Type,
} from 'lucide-react';

interface ConfigPlaygroundPanelProps {
  config: IFileManagerConfig;
  onUpdateConfig: (patch: Partial<IFileManagerConfig>) => void;
}

const ACCENT_PRESETS = [
  { id: 'blue', label: 'Apple / Win11 Blue', hex: '#2997ff' },
  { id: 'emerald', label: 'Emerald Mint', hex: '#10b981' },
  { id: 'violet', label: 'Royal Violet', hex: '#8b5cf6' },
  { id: 'amber', label: 'Solar Amber', hex: '#f59e0b' },
  { id: 'rose', label: 'Crimson Rose', hex: '#f43f5e' },
  { id: 'cyan', label: 'Cyber Cyan', hex: '#06b6d4' },
] as const;

export const ConfigPlaygroundPanel: React.FC<ConfigPlaygroundPanelProps> = ({
  config,
  onUpdateConfig,
}) => {
  const { dict } = useI18n();
  const [showCodeModal, setShowCodeModal] = useState(false);

  const generatedJsx = `import { FileManGL } from 'filemangl';
import 'filemangl/style.css';
// i18n JSON dictionaries: src/core/i18n/locales/tr.json | en.json | de.json | ru.json

const fileManagerConfig = ${JSON.stringify(config, null, 2)};

export default function App() {
  return (
    <FileManGL
      config={fileManagerConfig}
      onConfigChange={(patch) => console.log('Config updated:', patch)}
    />
  );
}`;

  const toggleKeys: Array<{
    key: keyof IFileManagerConfig;
    label: string;
    group: 'ui' | 'webgl' | 'security';
  }> = [
    { key: 'enableRibbonToolbar', label: 'Windows 11 Ribbon Toolbar', group: 'ui' },
    { key: 'enableDualPane', label: 'Dual-Pane (Total Commander Mode)', group: 'ui' },
    { key: 'enableFolderTree', label: 'Directory Tree Sidebar', group: 'ui' },
    { key: 'enableDetailsInspector', label: 'Security & Metadata Inspector', group: 'ui' },
    { key: 'enableBreadcrumbs', label: 'Address Bar & Breadcrumbs', group: 'ui' },
    { key: 'enableStatusBar', label: 'Status Bar', group: 'ui' },
    { key: 'enableContextMenu', label: 'Right-Click Context Menu', group: 'ui' },
    { key: 'enableRubberBandSelection', label: 'Rubber-Band Marquee Multi-Select', group: 'ui' },
    { key: 'showFileExtensions', label: 'Show File Extensions (.ts, .png)', group: 'ui' },
    { key: 'showPosixBadgesOnItems', label: 'Show POSIX (0755) Badges', group: 'security' },
    {
      key: 'strictPermissionEnforcement',
      label: 'Strict Permission Engine (ACL + POSIX)',
      group: 'security',
    },
    {
      key: 'respectFolderLocks',
      label: 'Immutable Folder/File Lock Protection',
      group: 'security',
    },
    { key: 'enableAuditLog', label: 'Live Security Audit Trail', group: 'security' },
    { key: 'enableWebGLAcceleration', label: 'WebGL 60FPS Spatial Grid Engine', group: 'webgl' },
    { key: 'enableWebGLImageShaderStudio', label: 'WebGL GLSL Image Shader Studio', group: 'webgl' },
    { key: 'enableWebGLDiskMap', label: 'WebGL 3D Cushion Disk Map', group: 'webgl' },
    { key: 'enableArchiveCompression', label: 'ZIP Archive & Extract Engine', group: 'webgl' },
    { key: 'enableBatchRename', label: 'Batch Rename Engine', group: 'webgl' },
  ];

  return (
    <div className="bg-[#0d1320] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header & Presets */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{dict.configurator.title}</h3>
            <p className="text-xs text-slate-400">{dict.configurator.subtitle}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(CONFIG_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => onUpdateConfig(preset.patch)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 text-xs font-medium text-slate-200 transition flex items-center gap-1.5"
              title={preset.description}
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              {preset.label}
            </button>
          ))}

          <button
            onClick={() => setShowCodeModal(!showCodeModal)}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
          >
            <Code2 className="w-4 h-4" /> {dict.configurator.exportJsxBtn}
          </button>
        </div>
      </div>

      {/* Disk Quota, Driver, Mount & i18n Locale Settings */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" /> {dict.configurator.languageLabel}
          </label>
          <select
            value={config.locale}
            onChange={(e) =>
              onUpdateConfig({ locale: e.target.value as SupportedLocale })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
          >
            {LOCALE_LIST.map((loc) => (
              <option key={loc.code} value={loc.code}>
                {loc.flag} {loc.label} ({loc.code}.json)
              </option>
            ))}
          </select>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5 text-blue-400" /> {dict.configurator.quotaLabel}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={150}
              max={2048}
              step={50}
              value={Math.round(config.totalDiskQuotaBytes / (1024 * 1024))}
              onChange={(e) =>
                onUpdateConfig({
                  totalDiskQuotaBytes: parseInt(e.target.value, 10) * 1024 * 1024,
                })
              }
              className="flex-1 accent-blue-500"
            />
            <span className="font-mono text-xs font-bold text-blue-400 w-16 text-right">
              {Math.round(config.totalDiskQuotaBytes / (1024 * 1024))} MB
            </span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            {dict.configurator.driverLabel}
          </label>
          <select
            value={config.driverType}
            onChange={(e) =>
              onUpdateConfig({
                driverType: e.target.value as IFileManagerConfig['driverType'],
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
          >
            <option value="vfs_localstorage">VfsLocalStorageDriver (VFS)</option>
            <option value="vfs_memory">VfsMemoryDriver (RAM Disk)</option>
            <option value="rest_connector">RestConnectorDriver (Laravel / Node.js)</option>
          </select>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            {dict.configurator.mountLabel}
          </label>
          <input
            type="text"
            value={config.mountPath}
            onChange={(e) => onUpdateConfig({ mountPath: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-400"
          />
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            {dict.configurator.blockedExtLabel}
          </label>
          <input
            type="text"
            value={config.globalBlockedExtensions.join(', ')}
            onChange={(e) =>
              onUpdateConfig({
                globalBlockedExtensions: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-rose-300"
          />
        </div>
      </div>

      {/* SheetGL × FileManGL Unified Theme Inheritance: Border Radius, Font Scale & Accent Color */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Configurable Border Radius (Sharp / Squircle / Pill) */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Square className="w-3.5 h-3.5 text-blue-400" />
              Köşe Geometrisi (borderRadius)
            </span>
            <span className="font-mono text-[10px] text-blue-400">
              {String(config.borderRadius ?? 'squircle')}
            </span>
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { id: 'sharp', label: 'Sharp (4px)' },
                { id: 'squircle', label: 'Squircle (12px)' },
                { id: 'pill', label: 'Pill (18px)' },
              ] as Array<{ id: BorderRadiusPreset; label: string }>
            ).map((preset) => {
              const active = (config.borderRadius ?? 'squircle') === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onUpdateConfig({ borderRadius: preset.id })}
                  className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${
                    active
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Dynamic Font Scale (85% - 125% Unified with SheetGL) */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-blue-400" />
              Yazı Ölçeği (fontScale — SheetGL Standart)
            </span>
            <span className="font-mono text-xs font-bold text-blue-400">
              %{config.fontScale ?? 100}
            </span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={85}
              max={125}
              step={5}
              value={config.fontScale ?? 100}
              onChange={(e) =>
                onUpdateConfig({ fontScale: parseInt(e.target.value, 10) })
              }
              className="flex-1 accent-blue-500"
            />
            <button
              type="button"
              onClick={() => onUpdateConfig({ fontScale: 100 })}
              className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-300 hover:text-white"
            >
              %100
            </button>
          </div>
        </div>

        {/* 3. Theme Accent Color & Host Inheritance */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
          <label className="block text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-blue-400" />
              Tema Vurgu Rengi & Kalıtsallık
            </span>
            <span className="font-mono text-[10px] text-slate-400">
              {config.accentColor || 'Host (--uxu-primary)'}
            </span>
          </label>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {ACCENT_PRESETS.map((sw) => {
                const isSelected =
                  (config.accentColor || '').toLowerCase() === sw.hex.toLowerCase();
                return (
                  <button
                    key={sw.id}
                    type="button"
                    title={sw.label}
                    onClick={() => onUpdateConfig({ accentColor: sw.hex })}
                    style={{ backgroundColor: sw.hex }}
                    className={`w-6 h-6 rounded-full border transition transform ${
                      isSelected
                        ? 'scale-110 border-white ring-2 ring-white/40'
                        : 'border-white/20 opacity-80 hover:opacity-100'
                    }`}
                  />
                );
              })}
              <input
                type="color"
                value={config.accentColor || '#2997ff'}
                onChange={(e) => onUpdateConfig({ accentColor: e.target.value })}
                title="Özel Vurgu Rengi Seç"
                className="w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
              />
            </div>
            {config.accentColor && (
              <button
                type="button"
                onClick={() => onUpdateConfig({ accentColor: undefined })}
                className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-300 hover:text-white"
              >
                Host Miras
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Feature Flags Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {toggleKeys.map((item) => {
          const checked = Boolean(config[item.key]);
          return (
            <label
              key={item.key}
              className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                checked
                  ? 'bg-slate-900/90 border-slate-700 text-slate-100'
                  : 'bg-slate-950/50 border-slate-800/60 text-slate-500'
              }`}
            >
              <span className="flex items-center gap-2">
                {item.group === 'webgl' ? (
                  <Cpu className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                ) : item.group === 'security' ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <Layout className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                )}
                <span>{item.label}</span>
              </span>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onUpdateConfig({ [item.key]: e.target.checked })}
                className="accent-blue-500 rounded"
              />
            </label>
          );
        })}
      </div>

      {/* Live Exported JSX Config Drawer with Syntax Highlighting */}
      {showCodeModal && (
        <HighlightedCodeBlock
          id="config_jsx_export"
          title="App.tsx — Canlı SOLID Konfigürasyon JSX Çıktısı"
          language="tsx"
          solidPrinciple="DIP"
          description="Aşağıdaki kod seçtiğiniz tüm özellik bayraklarını, kota limitlerini ve sürücü ayarlarını içerir."
          code={generatedJsx}
        />
      )}
    </div>
  );
};
