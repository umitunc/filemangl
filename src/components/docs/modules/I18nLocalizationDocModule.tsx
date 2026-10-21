import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const I18nLocalizationComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 text-xs font-mono mb-2">
          <span>Bölüm 07 • Modüler JSON Çoklu Dil (i18n: TR / EN / DE / RU)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          7. Modüler JSON Çoklu Dil (i18n) Sistemi (tr.json, en.json, de.json, ru.json)
        </h2>
        <p className="text-slate-300 mt-2">
          FileManGL&apos;deki tüm menüler, Windows 11 Dosya Gezgini görünümleri, bağlam menüleri,
          WebGL HUD panelleri ve durum çubuğu metinleri <code>src/core/i18n/locales/</code> dizini
          altındaki saf <code>.json</code> sözlük dosyalarından okunur:
        </p>
      </div>

      <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300 font-mono">
        <li>src/core/i18n/locales/tr.json (Türkçe — 🇹🇷)</li>
        <li>src/core/i18n/locales/en.json (English — 🇬🇧)</li>
        <li>src/core/i18n/locales/de.json (Deutsch — 🇩🇪)</li>
        <li>src/core/i18n/locales/ru.json (Русский — 🇷🇺)</li>
        <li>src/core/i18n/I18nProvider.tsx (React Context, useI18n Hook & Fallback Engine)</li>
      </ul>

      <HighlightedCodeBlock
        id="i18n_json_sample"
        title="src/core/i18n/locales/tr.json — Modüler JSON Çeviri Sözlüğü Yapısı"
        language="json"
        solidPrinciple="OCP"
        description="Open/Closed Principle: Yeni bir dil eklemek için mevcut bileşen kodlarına dokunmadan yeni bir .json dosyası (ör. fr.json) kaydetmek yeterlidir."
        code={`{
  "nav": {
    "landing": "Ana Sayfa",
    "liveDemo": "Canlı Gezgin",
    "documentation": "Dokümantasyon",
    "configurator": "SOLID Yapılandırıcı"
  },
  "explorer": {
    "newFolder": "Yeni Klasör",
    "newFile": "Yeni Dosya",
    "copy": "Kopyala",
    "cut": "Kes",
    "paste": "Yapıştır",
    "rename": "Adlandır",
    "permissionsAcl": "İzinler & ACL",
    "viewLarge": "Büyük Simgeler (Large Icons)",
    "viewDetails": "Detaylar (Details Table)"
  }
}`}
      />

      <HighlightedCodeBlock
        id="i18n_usage"
        title="src/LocalizedExplorer.tsx — Yeni Dil Ekleme veya Konfigürasyonla Dil Set Etme"
        language="tsx"
        solidPrinciple="DIP"
        description="Bileşenler metinleri doğrudan sabit (hardcoded) yazmak yerine useI18n() kancası üzerinden soyut sözlükten alır."
        code={`import { FileManGL, DEFAULT_FILE_MANAGER_CONFIG } from './core';
import { useI18n } from './core/i18n/I18nProvider';

// 1. Config üzerinden başlangıç dilini belirleme ('tr' | 'en' | 'de' | 'ru')
// Ayrıca URL üzerinden /demo?lang=de, /demo?lang=en veya /demo?lang=ru ile de tetiklenebilir.
export function LocalizedExplorer() {
  return (
    <FileManGL
      config={{
        ...DEFAULT_FILE_MANAGER_CONFIG,
        locale: 'de', // 'tr' | 'en' | 'de' | 'ru'
      }}
    />
  );
}

// 2. Özel bileşen içinde JSON çeviri anahtarlarına erişim:
export function CustomToolbarButton() {
  const { dict, t, locale, setLocale } = useI18n();
  return (
    <button onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}>
      {dict.explorer.newFolder} ({t('explorer.permissionsAcl')})
    </button>
  );
}`}
      />
    </div>
  );
};

export const I18nLocalizationDocModule: IDocModuleDefinition = {
  id: 'i18n_localization',
  stepNumber: 7,
  title: '7. Çoklu Dil (i18n JSON: TR / EN / DE)',
  subtitle: 'tr.json, en.json, de.json Sözlükleri, useI18n Hook ve URL Dil Parametresi',
  badge: 'i18n JSON',
  routeSlug: '/documentation/i18n',
  solidFocus: ['OCP', 'DIP'],
  searchKeywords: ['i18n', 'json', 'tr', 'en', 'de', 'localization', 'ceviri', 'dil'],
  iconName: 'translate',
  iconColorClass: 'text-cyan-400',
  Component: I18nLocalizationComponent,
};
