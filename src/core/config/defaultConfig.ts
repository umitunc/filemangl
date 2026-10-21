import { IFileManagerConfig, UserIdentity } from '../contracts/types';

export const DEMO_USERS: UserIdentity[] = [
  {
    id: 'usr_admin',
    name: 'Umit Uz (Root Admin)',
    title: 'Principal Systems Architect',
    role: 'admin',
    group: 'wheel',
    badgeColor: '#3b82f6',
  },
  {
    id: 'usr_dev',
    name: 'Selin Kaya (Lead Dev)',
    title: 'Senior Full-Stack Engineer',
    role: 'developer',
    group: 'engineering',
    badgeColor: '#10b981',
  },
  {
    id: 'usr_editor',
    name: 'Mert Demir (Media Editor)',
    title: 'Creative Asset Manager',
    role: 'editor',
    group: 'creative',
    badgeColor: '#f59e0b',
  },
  {
    id: 'usr_viewer',
    name: 'Elif Yilmaz (Auditor)',
    title: 'Security & Compliance Auditor',
    role: 'viewer',
    group: 'audit',
    badgeColor: '#a855f7',
  },
  {
    id: 'usr_guest',
    name: 'Anonim Misafir (Guest)',
    title: 'External Public Partner',
    role: 'guest',
    group: 'public',
    badgeColor: '#64748b',
  },
];

export const DEFAULT_FILE_MANAGER_CONFIG: IFileManagerConfig = {
  volumeName: 'HYPERION_NVME_VOL01 (D:)',
  mountPath: '/mnt/nvme0n1/workspace',
  locale: 'tr',
  theme: 'dark',
  driverType: 'vfs_localstorage',
  connectorEndpoint: 'https://api.yourdomain.com/v1/filemanager/connector',
  connectorAuthToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

  // Disk & Quota Governance (2 GB default virtual disk allocation for massive file benchmarks)
  totalDiskQuotaBytes: 2048 * 1024 * 1024,
  defaultMaxUploadFileSizeBytes: 250 * 1024 * 1024,
  globalBlockedExtensions: ['.bat', '.cmd', '.scr', '.vbs'],
  strictPermissionEnforcement: true,
  respectFolderLocks: true,

  // UI & Windows Explorer Capabilities
  defaultViewMode: 'large_icons',
  enableRibbonToolbar: true,
  enableDualPane: false,
  enableDetailsInspector: true,
  enableFolderTree: true,
  enableBreadcrumbs: true,
  enableStatusBar: true,
  enableContextMenu: true,
  enableKeyboardShortcuts: true,
  enableDragAndDrop: true,
  enableRubberBandSelection: true,
  showHiddenAndSystemFiles: true,
  showFileExtensions: true,
  showPosixBadgesOnItems: false,

  // Advanced Modules
  enableWebGLAcceleration: true,
  enableWebGLImageShaderStudio: true,
  enableWebGLDiskMap: true,
  enableBuiltInCodeEditor: true,
  enableArchiveCompression: true,
  enableBatchRename: true,
  enableShareLinks: true,
  enableRecycleBin: true,
  enableAuditLog: true,
  enableUndoRedo: true,
};

export const CONFIG_PRESETS: Record<
  string,
  { label: string; description: string; patch: Partial<IFileManagerConfig> }
> = {
  enterprise_win11: {
    label: 'Windows 11 Enterprise (Tam Özellikli)',
    description: 'Ribbon bar, sağ detay paneli, WebGL stüdyosu ve geri dönüşüm kutusu aktif.',
    patch: {
      ...DEFAULT_FILE_MANAGER_CONFIG,
      enableDualPane: false,
      enableRibbonToolbar: true,
      enableDetailsInspector: true,
      showPosixBadgesOnItems: false,
    },
  },
  commander_dual: {
    label: 'Total Commander / elFinder Çift Panel',
    description: 'Yan yana iki bağımsız dizin paneli ile hızlı kopyalama/taşıma ve detaylı tablo görünümü.',
    patch: {
      ...DEFAULT_FILE_MANAGER_CONFIG,
      defaultViewMode: 'details',
      enableDualPane: true,
      enableDetailsInspector: false,
    },
  },
  webgl_performance: {
    label: 'WebGL 60FPS Spatial Motoru',
    description: 'GPU hızlandırmalı WebGL Canvas sahnesi, shader tabanlı görsel işleme ve 3B disk haritası odaklı.',
    patch: {
      ...DEFAULT_FILE_MANAGER_CONFIG,
      defaultViewMode: 'webgl_spatial',
      enableWebGLAcceleration: true,
      enableWebGLDiskMap: true,
      enableWebGLImageShaderStudio: true,
    },
  },
  zero_trust_vault: {
    label: 'Zero-Trust Güvenlik Kasası (Strict Quota & ACL)',
    description: 'Sıkı kota limitleri (150 MB), genişletilmiş uzantı engeli ve katı izin/kilit denetimi.',
    patch: {
      ...DEFAULT_FILE_MANAGER_CONFIG,
      totalDiskQuotaBytes: 150 * 1024 * 1024,
      defaultMaxUploadFileSizeBytes: 25 * 1024 * 1024,
      globalBlockedExtensions: ['.exe', '.bat', '.sh', '.cmd', '.dll', '.so', '.msi'],
      strictPermissionEnforcement: true,
      respectFolderLocks: true,
      showPosixBadgesOnItems: true,
    },
  },
};
