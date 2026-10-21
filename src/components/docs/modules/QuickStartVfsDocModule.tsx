import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const QuickStartVfsComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono mb-2">
          <span>Bölüm 01 • SRP & DIP Uyumlu Kurulum</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          1. Hızlı Başlangıç & Sanal Dosya Sistemi (VFS) Kurulumu
        </h2>
        <p className="text-slate-300 mt-2">
          <strong>FileManGL v1.0.4</strong>, Dependency Inversion Principle (DIP) sayesinde üst seviye
          Windows 11 Dosya Gezgini arayüzünü alt seviye depolama motorlarından tamamen ayırır. Hiçbir
          backend sunucusu olmadan tarayıcıda (<code>VfsLocalStorageDriver</code> veya{' '}
          <code>VfsMemoryDriver</code>) çalışabildiği gibi, tek bir konfigürasyon anahtarıyla{' '}
          <strong>Laravel 11, Node.js, .NET veya Go</strong> tabanlı gerçek disk sunucularına (
          <code>RestConnectorDriver</code>) bağlanır.
        </p>
      </div>

      {/* Architectural Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <div className="font-mono font-bold text-blue-400 flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              hard_drive
            </span>
            <span>VfsLocalStorageDriver</span>
          </div>
          <p className="text-slate-400">
            Tarayıcı <code>localStorage</code> üzerinde kalıcı sanal disk, klasör kotaları, ACL/POSIX
            izinleri ve geri dönüşüm kutusu sağlar.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <div className="font-mono font-bold text-emerald-400 flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              memory
            </span>
            <span>VfsMemoryDriver (RAM Disk)</span>
          </div>
          <p className="text-slate-400">
            İzole birim testleri (Vitest) ve geçici 25.000+ düğümlü WebGL2 stres testleri için sıfır
            gecikmeli bellek içi sürücü.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <div className="font-mono font-bold text-amber-400 flex items-center gap-1.5">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              dns
            </span>
            <span>RestConnectorDriver</span>
          </div>
          <p className="text-slate-400">
            Laravel veya Node.js sunucusundaki fiziksel bir disk bölümünü (ör.{' '}
            <code>/var/storage/tenant_42</code>) gerçek zamanlı yönetir.
          </p>
        </div>
      </div>

      <HighlightedCodeBlock
        id="qs_install"
        title="Terminal — Paket Kurulumu & Test Çalıştırma"
        language="bash"
        solidPrinciple="SRP"
        description="Geliştirme sunucusunu veya 22 senaryoluk tam otomasyon test paketini başlatın."
        code={`# Bağımlılıkları yükleyin
npm install

# Canlı geliştirme sunucusunu başlatın (/demo, /documentation, /configurator)
npm run dev

# Tam teşekküllü Vitest + React Testing Library otomasyon testlerini çalıştırın
npm test`}
      />

      <HighlightedCodeBlock
        id="qs_1"
        title="src/WorkspaceExplorer.tsx — Windows 11 Multi-Tab Gezgini Entegrasyonu"
        language="tsx"
        solidPrinciple="DIP"
        description="Üst bileşen yalnızca IFileManagerConfig kontratına bağımlıdır; sürücü tipi çalışma anında değiştirilebilir."
        code={`import React, { useState } from 'react';
import {
  FileManGL,
  DEFAULT_FILE_MANAGER_CONFIG,
  IFileManagerConfig,
  I18nProvider,
} from './core';

export function MyWorkspaceExplorer() {
  const [config, setConfig] = useState<IFileManagerConfig>({
    ...DEFAULT_FILE_MANAGER_CONFIG,
    volumeName: 'KURUMSAL_DISK',
    mountPath: '/var/storage/tenant_42',
    locale: 'tr', // 'tr' | 'en' | 'de' | 'ru' (.json tabanlı modüler çeviri)
    // 1. Sunucusuz VFS modu: 'vfs_localstorage' | 'vfs_memory'
    // 2. Laravel / Node.js gerçek disk modu: 'rest_connector'
    driverType: 'vfs_localstorage',
    connectorEndpoint: 'https://api.sirketiniz.com/api/v1/filemanager/connector',
    totalDiskQuotaBytes: 500 * 1024 * 1024, // 500 MB tahsis edilmiş disk kotası
    strictPermissionEnforcement: true,
    respectFolderLocks: true,
    enableDragAndDrop: true,
    enableRubberBandSelection: true,
    enableWebGLAcceleration: true,
  });

  return (
    <I18nProvider
      locale={config.locale}
      onLocaleChange={(locale) => setConfig((prev) => ({ ...prev, locale }))}
    >
      <FileManGL
        config={config}
        onConfigChange={(patch) => setConfig((prev) => ({ ...prev, ...patch }))}
      />
    </I18nProvider>
  );
}`}
      />

      {/* Configuration Contract Reference Table */}
      <div className="border border-slate-800 rounded-xl overflow-x-auto bg-[#080d18]">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300">
              <th className="py-2.5 px-3.5">Prop / Config Anahtarı</th>
              <th className="py-2.5 px-3.5">Tip</th>
              <th className="py-2.5 px-3.5">Varsayılan</th>
              <th className="py-2.5 px-3.5">Açıklama</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {[
              [
                'driverType',
                "'vfs_localstorage' | 'vfs_memory' | 'rest_connector'",
                "'vfs_localstorage'",
                'Depolama sürücüsü stratejisi (Liskov Substitution uyumlu)',
              ],
              [
                'totalDiskQuotaBytes',
                'number',
                '524288000 (500 MB)',
                'Yönetilen diskin maksimum byte kotası (aşım durumunda ENOSPC döner)',
              ],
              [
                'strictPermissionEnforcement',
                'boolean',
                'true',
                '5 katmanlı NTFS ACL + POSIX (0755) + Kilit denetimini zorunlu kılar',
              ],
              [
                'enableRubberBandSelection',
                'boolean',
                'true',
                'Boş alanda fareyle sürükleyerek çoklu seçim penceresi (Marquee)',
              ],
              [
                'enableDragAndDrop',
                'boolean',
                'true',
                'Dosya/klasör kartlarını alt klasörlere, sol ağaca ve breadcrumb üzerine sürükle-bırak',
              ],
              [
                'locale',
                "'tr' | 'en' | 'de'",
                "'tr'",
                'JSON sözlüklerinden (tr.json, en.json, de.json) aktif arayüz dili',
              ],
            ].map(([prop, type, def, desc], idx) => (
              <tr key={idx} className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3.5 text-cyan-300 font-semibold">{prop}</td>
                <td className="py-2.5 px-3.5 text-amber-300">{type}</td>
                <td className="py-2.5 px-3.5 text-emerald-300">{def}</td>
                <td className="py-2.5 px-3.5 text-slate-300 font-sans">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const QuickStartVfsDocModule: IDocModuleDefinition = {
  id: 'quickstart',
  stepNumber: 1,
  title: '1. Hızlı Başlangıç & VFS Kurulumu',
  subtitle: 'Sanal Dosya Sistemi, Props Tablosu ve Windows 11 Sekmeli Gezgin Kurulumu',
  badge: 'React 18',
  routeSlug: '/documentation/quickstart',
  solidFocus: ['SRP', 'DIP'],
  searchKeywords: ['quickstart', 'vfs', 'kurulum', 'localstorage', 'props', 'config'],
  iconName: 'rocket_launch',
  iconColorClass: 'text-blue-400',
  Component: QuickStartVfsComponent,
};
