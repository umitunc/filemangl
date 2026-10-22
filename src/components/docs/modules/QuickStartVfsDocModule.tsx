import React, { useState } from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

type ConfigCategoryFilter =
  | 'all'
  | 'storage'
  | 'theme'
  | 'ui'
  | 'webgl'
  | 'security';

interface ConfigPropertyDocRow {
  prop: string;
  category: Exclude<ConfigCategoryFilter, 'all'>;
  type: string;
  defaultVal: string;
  description: string;
}

const ALL_CONFIG_PROPERTIES: ConfigPropertyDocRow[] = [
  // 1. Depolama, Sürücü & Kota Ayarları
  {
    prop: 'volumeName',
    category: 'storage',
    type: 'string',
    defaultVal: "'KURUMSAL_BULUT_VFS'",
    description:
      'Sol klasör ağacında, sekme başlığında ve durum çubuğunda görünen kök disk / sürücü adı.',
  },
  {
    prop: 'mountPath',
    category: 'storage',
    type: 'string',
    defaultVal: "'/var/www/storage/workspace'",
    description:
      'REST sunucu sürücüsünün (Laravel / Node.js) bağlandığı fiziksel veya sanal kök dizin yolu.',
  },
  {
    prop: 'driverType',
    category: 'storage',
    type: "'vfs_localstorage' | 'vfs_memory' | 'rest_connector'",
    defaultVal: "'vfs_localstorage'",
    description:
      'Depolama motoru: Tarayıcı kalıcı VFS (vfs_localstorage), RAM disk (vfs_memory) veya gerçek sunucu API (rest_connector).',
  },
  {
    prop: 'connectorEndpoint',
    category: 'storage',
    type: 'string',
    defaultVal: "'https://api.sirketiniz.com/api/v1/filemanager/connector'",
    description:
      "driverType: 'rest_connector' seçildiğinde tüm dosya işlemlerinin (list, upload, zip, chmod_acl vb.) gönderileceği HTTP uç noktası.",
  },
  {
    prop: 'totalDiskQuotaBytes',
    category: 'storage',
    type: 'number',
    defaultVal: '524288000 (500 MB)',
    description:
      'Diskin maksimum toplam kapasitesi (Byte). Yükleme veya kopyalama sırasında aşılırsa ENOSPC hatası döner.',
  },
  {
    prop: 'globalBlockedExtensions',
    category: 'storage',
    type: 'string[]',
    defaultVal: "['exe', 'bat', 'cmd', 'sh', 'php', 'phtml', 'dll']",
    description:
      'Tüm klasörlerde yüklenmesi ve oluşturulması güvenlik nedeniyle engellenen dosya uzantıları listesi.',
  },

  // 2. Tema, Border Radius, Font Ölçeği & Görünüm Modları
  {
    prop: 'theme',
    category: 'theme',
    type: "'dark' | 'light'",
    defaultVal: "'dark'",
    description:
      'Aktif renk teması. Karanlık (Dark Slate) veya Windows 11 Aydınlık (Clean Light) modunu belirler.',
  },
  {
    prop: 'defaultViewMode',
    category: 'theme',
    type: "'extra_large_icons' | 'large_icons' | 'medium_icons' | 'small_icons' | 'list' | 'details' | 'tiles' | 'content' | 'webgl_spatial' | 'webgl_diskmap'",
    defaultVal: "'large_icons'",
    description:
      'Gezginin açılış görünüm modu (8 standart Windows 11 görünümü + 2 donanım hızlandırmalı WebGL2 3D/Treemap görünümü).',
  },
  {
    prop: 'borderRadius',
    category: 'theme',
    type: "'sharp' | 'squircle' | 'pill' | number",
    defaultVal: "'squircle'",
    description:
      "Köşe yuvarlaklığı: 'sharp' (2-8px keskin), 'squircle' (6-20px dengeli), 'pill' (10-30px tam yuvarlak) veya özel piksel sayısı (ör. 14). SheetGL ve UXI ile birebir aynı yarıçap skalasını paylaşır.",
  },
  {
    prop: 'fontScale',
    category: 'theme',
    type: 'number',
    defaultVal: '100',
    description:
      'Genel yazı ölçeği yüzdesi (%85 ile %125 arası). SheetGL 13.5px standart taban fontu ile senkronize ölçeklenir (--fm-font-scale / --uxu-font-scale).',
  },
  {
    prop: 'accentColor',
    category: 'theme',
    type: 'string | undefined',
    defaultVal: 'undefined (var(--uxu-primary))',
    description:
      "Özel vurgu rengi (ör. '#2997ff', '#10b981', '#8b5cf6'). Belirtilmezse üst tasarım sisteminin (--uxu-primary) rengini otomatik miras alır.",
  },
  {
    prop: 'inheritHostTheme',
    category: 'theme',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Üst uygulamada (UXI / SheetGL) tanımlı --uxu-primary, --uxu-radius-*, --uxu-bg-elevated ve --uxu-font-scale CSS değişkenlerini otomatik miras alır.',
  },
  {
    prop: 'locale',
    category: 'theme',
    type: "'tr' | 'en' | 'de' | 'ru'",
    defaultVal: "'tr'",
    description:
      'Aktif arayüz dili. Modüler JSON sözlüklerinden (tr.json, en.json, de.json, ru.json) anlık çeviri sağlar.',
  },

  // 3. Arayüz Panelleri & Gezgin UX Özellikleri
  {
    prop: 'enableRibbonToolbar',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Windows 11 tarzı üst komut şeridini (Yeni, Yükle, Klasör Yükle, Kes, Kopyala, Yapıştır, ZIP İndir, Görünüm, Sırala) gösterir/gizler.',
  },
  {
    prop: 'enableDualPane',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'false',
    description:
      'Total Commander tarzı yan yana Çift Panel (Dual-Pane) görünümünü ve paneller arası tek tıkla dosya aktarımını etkinleştirir.',
  },
  {
    prop: 'enableFolderTree',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Sol kenar çubuğundaki Hızlı Erişim, Sık Kullanılanlar, Kök Sürücü (Root) ve hiyerarşik klasör ağacını gösterir/gizler.',
  },
  {
    prop: 'enableDetailsInspector',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Sağ kenardaki Güvenlik, SHA-256 Özet, Küçük Resim (Thumbnail), Kota ve Denetim İzi (Inspector) panelini gösterir/gizler.',
  },
  {
    prop: 'enableBreadcrumbs',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'İleri/Geri/Yukarı okları, tıklanabilir Breadcrumb dizin yolu, tam yol düzenleyici (D:\\...) ve arama çubuğunu gösterir/gizler.',
  },
  {
    prop: 'enableStatusBar',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Alt durum çubuğunda toplam öğe sayısı, seçili öğelerin toplam boyutu, disk kota çubuğu ve hızlı görünüm değiştiriciyi gösterir.',
  },
  {
    prop: 'enableContextMenu',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Dosya/klasör üzerinde ve boş alanda sağ tık bağlam menüsünü (Önizle, Kod Düzenle, ZIP Arşivle, ACL İzinleri, Paylaş vb.) açar.',
  },
  {
    prop: 'enableDragAndDrop',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Öğeleri alt klasörlere, sol klasör ağacına veya breadcrumb adımlarına sürükleyip bırakarak taşımayı ve masaüstünden dosya bırakmayı sağlar.',
  },
  {
    prop: 'enableRubberBandSelection',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Gezgin boş alanında fareyle basılı tutup sürükleyerek dikdörtgen seçim alanı (Marquee / Rubber-Band) ile çoklu seçim yapmayı sağlar.',
  },
  {
    prop: 'showHiddenFiles',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Nokta ile başlayan (.env, .gitignore) veya isHidden: true olarak işaretlenmiş gizli sistem dosyalarını listeler.',
  },
  {
    prop: 'showFileExtensions',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Dosya adlarının sonunda (.ts, .png, .pdf, .zip) uzantılarının görünürlüğünü kontrol eder.',
  },
  {
    prop: 'showPosixBadgesOnItems',
    category: 'ui',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Kartların ve liste satırlarının üzerinde POSIX sekizlik izin rozetlerini (0755, 0644, 0700) ve kilit ikonlarını gösterir.',
  },

  // 4. WebGL2 GPU, Görüntü Stüdyosu, ZIP Arşiv & Üretkenlik
  {
    prop: 'enableWebGLAcceleration',
    category: 'webgl',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'WebGL2 60 FPS 3D Uzamsal Sahne (webgl_spatial) motorunu ve binlerce düğümlü donanım hızlandırmalı çizimi etkinleştirir.',
  },
  {
    prop: 'enableWebGLImageShaderStudio',
    category: 'webgl',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Görsel dosyalar için gerçek zamanlı GLSL Fragment Shader (Pozlama, Kontrast, Doygunluk, Keskinlik, Siberpunk, Termal) stüdyosunu açar.',
  },
  {
    prop: 'enableWebGLDiskMap',
    category: 'webgl',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Klasör ve dosya boyutlarını 3D yastık gölgeli (Cushion Treemap) ısı haritası olarak görselleştiren WebGL Disk Map modunu etkinleştirir.',
  },
  {
    prop: 'enableArchiveCompression',
    category: 'webgl',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Seçili birden fazla dosyayı veya tüm bir klasörü alt dizinleriyle birlikte gerçek .zip arşivi olarak paketleme ve indirme motorunu açar.',
  },
  {
    prop: 'enableBatchRename',
    category: 'webgl',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Çoklu seçilen öğeler için Önek/Sonek, Bul/Değiştir, Numaralandırma ({n}) ve Büyük/Küçük Harf dönüşümlü Toplu Yeniden Adlandırma penceresini açar.',
  },

  // 5. Güvenlik, NTFS ACL, POSIX (0755) & Denetim İzi
  {
    prop: 'strictPermissionEnforcement',
    category: 'security',
    type: 'boolean',
    defaultVal: 'true',
    description:
      '5 katmanlı Zero-Trust izin motorunu (Kilit -> Uzantı -> Kota -> NTFS ACL Deny/Allow -> POSIX rwx) tüm işlemlerde zorunlu kılar.',
  },
  {
    prop: 'respectFolderLocks',
    category: 'security',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'isLocked: true ile kilitlenmiş dosya ve klasörlerin silinmesini, taşınmasını veya yeniden adlandırılmasını engeller (ELOCKED).',
  },
  {
    prop: 'enableAuditLog',
    category: 'security',
    type: 'boolean',
    defaultVal: 'true',
    description:
      'Gerçekleştirilen veya engellenen her dosya işlemini zaman damgası, kullanıcı kimliği ve izin sonucuyla canlı Denetim İzi (Audit Trail) listesine kaydeder.',
  },
  {
    prop: 'activeUserId',
    category: 'security',
    type: 'string',
    defaultVal: "'usr_admin'",
    description:
      "İzin değerlendirmesinde kullanılacak aktif oturum kullanıcısının kimliği ('usr_admin' | 'usr_editor' | 'usr_auditor' | 'usr_guest').",
  },
];

const QuickStartVfsComponent: React.FC = () => {
  const [catFilter, setCatFilter] = useState<ConfigCategoryFilter>('all');
  const [propSearch, setPropSearch] = useState('');

  const filteredProps = ALL_CONFIG_PROPERTIES.filter((item) => {
    const matchCat = catFilter === 'all' || item.category === catFilter;
    const q = propSearch.trim().toLowerCase();
    const matchQuery =
      !q ||
      item.prop.toLowerCase().includes(q) ||
      item.type.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div className="space-y-8">
      {/* ====================================================================
          HEADER & OVERVIEW
      ==================================================================== */}
      <div id="doc-sec-install" className="scroll-mt-20">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono mb-2">
          <span>Bölüm 01 • Kurulum, Bileşen Props & IFileManagerConfig Tam Referansı</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          1. Kurulum, &lt;FileManGL /&gt; Props &amp; IFileManagerConfig Özellikleri Rehberi
        </h2>
        <p className="text-slate-300 mt-2 leading-relaxed">
          <strong>FileManGL v1.0.5</strong>, tek bir <code>&lt;FileManGL /&gt;</code> bileşeni ve{' '}
          <code>IFileManagerConfig</code> yapılandırma nesnesi üzerinden tüm görünüm modlarını,
          köşe yuvarlaklığını (<code>borderRadius</code>), yazı ölçeğini (<code>fontScale</code>),
          üst tema renk kalıtsallığını (<code>accentColor</code> / <code>inheritHostTheme</code>),
          dosya/klasör yükleme kuyruğunu, ZIP arşivlemeyi ve 5 katmanlı izin motorunu yönetmenizi
          sağlar.
        </p>
      </div>

      {/* ====================================================================
          1.1 NPM / NPX / CLI KURULUMU
      ==================================================================== */}
      <HighlightedCodeBlock
        id="qs_install"
        title="1.1 Terminal — NPM / NPX / PNPM / YARN / BUN Paket Kurulumu & CLI"
        language="bash"
        solidPrinciple="SRP"
        description="Paketi tercih ettiğiniz paket yöneticisiyle kurun veya npx filemangl CLI ile hazır bileşen/proje oluşturun."
        code={`# 1. Mevcut React 18 / 19 projenize FileManGL paketini kurun
npm install filemangl
pnpm add filemangl
yarn add filemangl
bun add filemangl

# 2. Hazır <FileManGLWorkspace /> bileşenini projenize otomatik ekleyin (NPX / NPMX CLI)
npx filemangl init --dir src/components --lang tr

# 3. Sıfırdan Vite + React + TypeScript + FileManGL başlangıç projesi oluşturun
npx filemangl create my-cloud-drive

# 4. Ortam uyumluluğunu (Node, React, WebGL2) denetleyin veya canlı demoyu açın
npx filemangl doctor
npx filemangl demo`}
      />

      {/* ====================================================================
          1.2 <FileManGL /> COMPONENT PROPS (FileManGLProps)
      ==================================================================== */}
      <div id="doc-sec-component-props" className="space-y-3 scroll-mt-20">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-cyan-400" style={{ fontSize: '20px' }}>
            widgets
          </span>
          <span>1.2 &lt;FileManGL /&gt; Ana Bileşen Props (FileManGLProps)</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300">
          <code>&lt;FileManGL /&gt;</code> bileşenine doğrudan geçilebilen üst seviye React
          prop&apos;ları:
        </p>

        <div className="border border-slate-800 rounded-xl overflow-x-auto bg-[#080d18]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300">
                <th className="py-2.5 px-3.5">Prop Adı</th>
                <th className="py-2.5 px-3.5">TypeScript Tipi</th>
                <th className="py-2.5 px-3.5">Zorunlu</th>
                <th className="py-2.5 px-3.5">Açıklama &amp; Kullanım Amacı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3.5 text-cyan-300 font-semibold">config</td>
                <td className="py-2.5 px-3.5 text-amber-300">IFileManagerConfig</td>
                <td className="py-2.5 px-3.5 text-emerald-400">Evet</td>
                <td className="py-2.5 px-3.5 text-slate-300 font-sans">
                  Görünüm, tema, border-radius, font ölçeği, sürücü, kota ve yetki bayraklarını
                  tutan ana konfigürasyon nesnesi (<code>DEFAULT_FILE_MANAGER_CONFIG</code> ile
                  genişletilebilir).
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3.5 text-cyan-300 font-semibold">onConfigChange</td>
                <td className="py-2.5 px-3.5 text-amber-300">
                  (patch: Partial&lt;IFileManagerConfig&gt;) =&gt; void
                </td>
                <td className="py-2.5 px-3.5 text-slate-400">Opsiyonel</td>
                <td className="py-2.5 px-3.5 text-slate-300 font-sans">
                  Kullanıcı gezgin içinden tema, dil, çift panel (dual-pane) veya görünüm modunu
                  değiştirdiğinde tetiklenir; üst state&apos;i senkronize tutar.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3.5 text-cyan-300 font-semibold">customDriver</td>
                <td className="py-2.5 px-3.5 text-amber-300">IFileSystemDriver</td>
                <td className="py-2.5 px-3.5 text-slate-400">Opsiyonel</td>
                <td className="py-2.5 px-3.5 text-slate-300 font-sans">
                  Kendi yazdığınız özel depolama sürücüsünü (ör. AWS S3, Supabase, IndexedDB, GraphQL)
                  doğrudan enjekte etmenizi sağlar.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3.5 text-cyan-300 font-semibold">isFullscreen</td>
                <td className="py-2.5 px-3.5 text-amber-300">boolean</td>
                <td className="py-2.5 px-3.5 text-slate-400">Opsiyonel</td>
                <td className="py-2.5 px-3.5 text-slate-300 font-sans">
                  Gezginin tam ekran (fixed inset-0 z-50) modunda çalışıp çalışmadığını belirler.
                </td>
              </tr>
              <tr className="hover:bg-slate-900/40">
                <td className="py-2.5 px-3.5 text-cyan-300 font-semibold">onToggleFullscreen</td>
                <td className="py-2.5 px-3.5 text-amber-300">() =&gt; void</td>
                <td className="py-2.5 px-3.5 text-slate-400">Opsiyonel</td>
                <td className="py-2.5 px-3.5 text-slate-300 font-sans">
                  Sağ üst tam ekran butonuna tıklandığında çağrılan geri çağırma fonksiyonu.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================================
          1.3 IFileManagerConfig TÜM 34 ÖZELLİK REFERANS TABLOSU (FİLTRELENEBİLİR)
      ==================================================================== */}
      <div id="doc-sec-config-all" className="space-y-3 scroll-mt-20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span
                className="material-symbols-outlined text-emerald-400"
                style={{ fontSize: '20px' }}
              >
                tune
              </span>
              <span>
                1.3 IFileManagerConfig — Tüm Özellikler ve Ayarlar Referansı (
                {ALL_CONFIG_PROPERTIES.length} Özellik)
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Aşağıdaki kategori butonlarıyla veya arama kutusuyla istediğiniz özelliği anında
              filtreleyebilirsiniz.
            </p>
          </div>

          <input
            type="text"
            value={propSearch}
            onChange={(e) => setPropSearch(e.target.value)}
            placeholder="Özellik ara (ör. borderRadius, fontScale, quota)..."
            className="w-full sm:w-72 bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
          />
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'all', label: `Tümü (${ALL_CONFIG_PROPERTIES.length})` },
              { id: 'theme', label: '🎨 Tema, Radius & Font (7)' },
              { id: 'storage', label: '💾 Depolama & Kota (6)' },
              { id: 'ui', label: '🖥️ Paneller & Gezgin UX (12)' },
              { id: 'webgl', label: '🚀 WebGL2, ZIP & Üretkenlik (5)' },
              { id: 'security', label: '🛡️ ACL, POSIX & Güvenlik (4)' },
            ] as Array<{ id: ConfigCategoryFilter; label: string }>
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCatFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                catFilter === tab.id
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Full Properties Table */}
        <div className="border border-slate-800 rounded-xl overflow-x-auto bg-[#080d18]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/95 border-b border-slate-800 text-slate-300">
                <th className="py-2.5 px-3.5">Özellik (config.*)</th>
                <th className="py-2.5 px-3.5">Kategori</th>
                <th className="py-2.5 px-3.5">Kabul Edilen Değerler / Tip</th>
                <th className="py-2.5 px-3.5">Varsayılan</th>
                <th className="py-2.5 px-3.5">Detaylı Açıklama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredProps.map((item) => (
                <tr key={item.prop} className="hover:bg-slate-900/50">
                  <td className="py-2.5 px-3.5 text-cyan-300 font-bold whitespace-nowrap">
                    {item.prop}
                  </td>
                  <td className="py-2.5 px-3.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300 uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3.5 text-amber-300 max-w-xs break-words">
                    {item.type}
                  </td>
                  <td className="py-2.5 px-3.5 text-emerald-300 whitespace-nowrap">
                    {item.defaultVal}
                  </td>
                  <td className="py-2.5 px-3.5 text-slate-200 font-sans leading-relaxed">
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ====================================================================
          1.4 TEMA KALITSALLIĞI (SHEETGL & UXI), BORDER RADIUS VE FONT ÖLÇEĞİ
      ==================================================================== */}
      <div id="doc-sec-theme-inheritance" className="space-y-3 scroll-mt-20">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-purple-400" style={{ fontSize: '20px' }}>
            palette
          </span>
          <span>
            1.4 Tema Kalıtsallığı (SheetGL × FileManGL), Border Radius ve Font Ölçeği Ayarlama
          </span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong>FileManGL</strong> ve <strong>SheetGL</strong> aynı tasarım sisteminde (ör.{' '}
          <strong>UXI</strong>) kullanıldığında <code>inheritHostTheme: true</code> sayesinde üst
          temanın <code>--uxu-primary</code> rengini, <code>--uxu-radius-*</code> köşe
          yuvarlaklığını ve <code>--uxu-font-scale</code> yazı ölçeğini otomatik olarak miras alır.
          Ayrıca doğrudan <code>config</code> üzerinden veya CSS değişkenleriyle de
          özelleştirilebilir:
        </p>

        <HighlightedCodeBlock
          id="qs_theme_radius"
          title="1.4 Tema, Border Radius ('sharp' | 'squircle' | 'pill' | px) ve Font Ölçeği Konfigürasyonu"
          language="tsx"
          solidPrinciple="OCP"
          description="SheetGL ile birebir aynı font boyutu (13.5px), köşe yarıçapı ve vurgu rengini paylaşan kurulum örneği."
          code={`import React, { useState } from 'react';
import {
  FileManGL,
  DEFAULT_FILE_MANAGER_CONFIG,
  IFileManagerConfig,
  I18nProvider,
} from 'filemangl';
import 'filemangl/style.css';

export function CustomThemedExplorer() {
  const [config, setConfig] = useState<IFileManagerConfig>({
    ...DEFAULT_FILE_MANAGER_CONFIG,
    // 1. Tema & Renk Kalıtsallığı
    theme: 'dark',                 // 'dark' | 'light'
    inheritHostTheme: true,        // Üst temadan (--uxu-primary, --uxu-radius-*) otomatik miras alır
    accentColor: '#10b981',        // Veya özel vurgu rengi: '#2997ff' | '#10b981' | '#8b5cf6' | '#f59e0b'

    // 2. Köşe Geometrisi (Border Radius)
    // Ön ayarlar: 'sharp' (4px) | 'squircle' (12px) | 'pill' (18px) veya piksel sayısı (ör. 14)
    borderRadius: 'squircle',

    // 3. SheetGL Standart Yazı Ölçeği (%85 - %125)
    fontScale: 100,                // 100 = 13.5px birincil metin, 12.5px üstbilgi (SheetGL standardı)

    // 4. Başlangıç Görünüm Modu & Paneller
    defaultViewMode: 'large_icons', // 'details' | 'large_icons' | 'webgl_spatial' | 'webgl_diskmap' ...
    enableRibbonToolbar: true,
    enableDualPane: false,
    enableFolderTree: true,
    enableDetailsInspector: true,
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
      </div>

      {/* ====================================================================
          1.5 DOSYA & KLASÖR YÜKLEME KUYRUĞU, THUMBNAIL CACHE VE ZIP İNDİRME
      ==================================================================== */}
      <div id="doc-sec-upload-zip" className="space-y-3 scroll-mt-20">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-400" style={{ fontSize: '20px' }}>
            cloud_upload
          </span>
          <span>
            1.5 Yükleme Kuyruğu (%0–100), Klasör Yükleme, Thumbnail Cache &amp; ZIP İndirme
          </span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
            <div className="font-bold text-cyan-300">
              1. Google Drive Tarzı Yükleme Kuyruğu &amp; Klasör Yükleme
            </div>
            <p className="text-slate-400 leading-relaxed">
              Çoklu dosya ve tüm alt dizinleriyle <strong>Klasör Yükle</strong> (
              <code>webkitdirectory</code>) desteği sunar. Sağ altta açılan kuyruk tepsisinde her
              dosya için <code>0% → 100%</code> gerçek zamanlı ilerleme, hız ve SHA-256 doğrulaması
              gösterilir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
            <div className="font-bold text-emerald-300">
              2. İki Katmanlı Thumbnail Cache (L1 LRU + IndexedDB)
            </div>
            <p className="text-slate-400 leading-relaxed">
              Yüklenen görseller <code>ThumbnailCacheService</code> tarafından 256px WebP/PNG küçük
              resme dönüştürülür; L1 bellek içi LRU ve L2 tarayıcı <code>IndexedDB</code> önbelleğine
              kaydedilerek klasör geçişlerinde anında yüklenir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5">
            <div className="font-bold text-amber-300">
              3. Seçim Dörtgeni (Marquee) &amp; Klasör ZIP İndirme
            </div>
            <p className="text-slate-400 leading-relaxed">
              <code>enableRubberBandSelection: true</code> ve{' '}
              <code>enableArchiveCompression: true</code> ile fareyle seçtiğiniz birden fazla öğeyi
              veya bir klasörü tüm alt klasör hiyerarşisiyle birlikte tek tıkla <code>.zip</code>{' '}
              olarak indirebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================================
          1.6 HAZIR PROFİLLER (CONFIG_PRESETS) KULLANIMI
      ==================================================================== */}
      <div id="doc-sec-presets" className="space-y-3 scroll-mt-20">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-400" style={{ fontSize: '20px' }}>
            bolt
          </span>
          <span>1.6 Hazır Konfigürasyon Profilleri (CONFIG_PRESETS)</span>
        </h3>
        <HighlightedCodeBlock
          id="qs_presets"
          title="Hazır Profillerle Tek Satırda Mod Değiştirme"
          language="tsx"
          solidPrinciple="DIP"
          description="CONFIG_PRESETS içindeki 4 kurumsal profili doğrudan config state'inize uygulayabilirsiniz."
          code={`import { DEFAULT_FILE_MANAGER_CONFIG, CONFIG_PRESETS } from 'filemangl';

// 1. Windows 11 Standart Gezgin
const win11Config = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.win11_default.patch };

// 2. Total Commander Çift Panel (Dual-Pane) Modu
const dualPaneConfig = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.total_commander.patch };

// 3. WebGL2 3D Uzamsal İş İstasyonu
const webglConfig = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.webgl_workstation.patch };

// 4. Zero-Trust Kilitli Kasa (Misafir / Salt-Okunur Denetim Modu)
const vaultConfig = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.zero_trust_vault.patch };`}
        />
      </div>
    </div>
  );
};

export const QuickStartVfsDocModule: IDocModuleDefinition = {
  id: 'quickstart',
  stepNumber: 1,
  title: '1. Kurulum, Props & Config Referansı',
  subtitle: '<FileManGL /> Props, IFileManagerConfig (34 Özellik), Tema/Radius ve Yükleme Ayarları',
  badge: 'Props & API',
  routeSlug: '/documentation/quickstart',
  solidFocus: ['SRP', 'DIP'],
  searchKeywords: [
    'quickstart',
    'props',
    'config',
    'ifilemanagerconfig',
    'borderradius',
    'fontscale',
    'accentcolor',
    'theme',
    'vfs',
    'kurulum',
    'npm',
    'npx',
  ],
  iconName: 'tune',
  iconColorClass: 'text-blue-400',
  subItems: [
    { id: 'doc-sec-install', label: '1.1 NPM / NPX / CLI Kurulumu', badge: 'CLI' },
    { id: 'doc-sec-component-props', label: '1.2 <FileManGL /> Bileşen Props', badge: '5 Prop' },
    {
      id: 'doc-sec-config-all',
      label: '1.3 IFileManagerConfig Tüm Özellikler',
      badge: '34 Ayar',
    },
    {
      id: 'doc-sec-theme-inheritance',
      label: '1.4 Tema Kalıtsallığı, Radius & Font',
      badge: 'SheetGL/UXI',
    },
    {
      id: 'doc-sec-upload-zip',
      label: '1.5 Yükleme Kuyruğu, Cache & ZIP',
      badge: '0-100%',
    },
    { id: 'doc-sec-presets', label: '1.6 Hazır Profiller (CONFIG_PRESETS)', badge: '4 Preset' },
  ],
  Component: QuickStartVfsComponent,
};
