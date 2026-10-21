import {
  AclRule,
  FileCategory,
  FileNode,
  PermissionAction,
} from '../contracts/types';
import { PermissionEngine } from '../services/PermissionEngine';

function makePermMap(enabled: PermissionAction[]): Record<PermissionAction, boolean> {
  const all: PermissionAction[] = [
    'read',
    'write',
    'delete',
    'rename',
    'upload',
    'download',
    'share',
    'chmod',
    'lock',
  ];
  const map = {} as Record<PermissionAction, boolean>;
  for (const a of all) {
    map[a] = enabled.includes(a);
  }
  return map;
}

export function createDefaultAcl(preset: 'open' | 'engineering' | 'vault' | 'creative'): AclRule[] {
  if (preset === 'vault') {
    return [
      {
        id: 'acl_v1',
        subjectType: 'role',
        subjectId: 'admin',
        subjectLabel: 'Role: Root Admin',
        effect: 'allow',
        permissions: makePermMap([
          'read',
          'write',
          'delete',
          'rename',
          'upload',
          'download',
          'share',
          'chmod',
          'lock',
        ]),
      },
      {
        id: 'acl_v2',
        subjectType: 'role',
        subjectId: 'viewer',
        subjectLabel: 'Role: Security Auditor',
        effect: 'allow',
        permissions: makePermMap(['read', 'download']),
      },
      {
        id: 'acl_v3',
        subjectType: 'role',
        subjectId: 'guest',
        subjectLabel: 'Role: External Guest',
        effect: 'deny',
        permissions: makePermMap([
          'read',
          'write',
          'delete',
          'rename',
          'upload',
          'download',
          'share',
          'chmod',
          'lock',
        ]),
      },
      {
        id: 'acl_v4',
        subjectType: 'role',
        subjectId: 'editor',
        subjectLabel: 'Role: Media Editor',
        effect: 'deny',
        permissions: makePermMap(['write', 'delete', 'rename', 'upload']),
      },
    ];
  }

  if (preset === 'engineering') {
    return [
      {
        id: 'acl_e1',
        subjectType: 'role',
        subjectId: 'developer',
        subjectLabel: 'Role: Lead Developer',
        effect: 'allow',
        permissions: makePermMap([
          'read',
          'write',
          'delete',
          'rename',
          'upload',
          'download',
          'share',
          'lock',
        ]),
      },
      {
        id: 'acl_e2',
        subjectType: 'role',
        subjectId: 'editor',
        subjectLabel: 'Role: Media Editor',
        effect: 'allow',
        permissions: makePermMap(['read', 'download']),
      },
      {
        id: 'acl_e3',
        subjectType: 'role',
        subjectId: 'guest',
        subjectLabel: 'Role: External Guest',
        effect: 'deny',
        permissions: makePermMap(['write', 'delete', 'rename', 'upload', 'chmod', 'lock']),
      },
    ];
  }

  if (preset === 'creative') {
    return [
      {
        id: 'acl_c1',
        subjectType: 'role',
        subjectId: 'editor',
        subjectLabel: 'Role: Media Editor',
        effect: 'allow',
        permissions: makePermMap([
          'read',
          'write',
          'delete',
          'rename',
          'upload',
          'download',
          'share',
        ]),
      },
      {
        id: 'acl_c2',
        subjectType: 'role',
        subjectId: 'developer',
        subjectLabel: 'Role: Lead Developer',
        effect: 'allow',
        permissions: makePermMap(['read', 'write', 'upload', 'download']),
      },
    ];
  }

  return [
    {
      id: 'acl_o1',
      subjectType: 'role',
      subjectId: 'editor',
      subjectLabel: 'Role: Media Editor',
      effect: 'allow',
      permissions: makePermMap(['read', 'write', 'upload', 'download', 'share']),
    },
    {
      id: 'acl_o2',
      subjectType: 'role',
      subjectId: 'viewer',
      subjectLabel: 'Role: Security Auditor',
      effect: 'allow',
      permissions: makePermMap(['read', 'download']),
    },
  ];
}

const FAKE_TEMPLATES: Array<{
  cat: FileCategory;
  ext: string;
  mime: string;
  names: string[];
}> = [
  {
    cat: 'code',
    ext: '.ts',
    mime: 'application/typescript',
    names: [
      'AuthTokenGuard',
      'WebGLBatchRenderer',
      'PermissionsMiddleware',
      'StorageDriverAdapter',
      'QuotaPolicyValidator',
      'VirtualScrollEngine',
      'FileStreamHasher',
      'ClusterSyncWorker',
    ],
  },
  {
    cat: 'code',
    ext: '.php',
    mime: 'application/x-httpd-php',
    names: [
      'LaravelDiskController',
      'SanctumAclPolicy',
      'ChunkedUploadService',
      'TenantQuotaRepository',
      'DirectoryTreeResource',
    ],
  },
  {
    cat: 'image',
    ext: '.png',
    mime: 'image/png',
    names: [
      'UI_Mockup_Render_4K',
      'Shader_Displacement_Map',
      'Satellite_Terrain_Tile',
      'Product_Hero_Asset',
      'HDR_Environment_Skybox',
    ],
  },
  {
    cat: 'document',
    ext: '.pdf',
    mime: 'application/pdf',
    names: [
      'Kurumsal_Guvenlik_Raporu',
      'Musteri_Fatura_Arsivi',
      'SLA_Performans_Analizi',
      'Mimari_Tasarim_Dokumani',
      'ISO27001_Denetim_Kaydi',
    ],
  },
  {
    cat: 'data',
    ext: '.json',
    mime: 'application/json',
    names: [
      'telemetry_metrics_shard',
      'user_acl_manifest',
      'search_index_partition',
      'audit_trail_snapshot',
      'cdn_edge_routing',
    ],
  },
  {
    cat: 'archive',
    ext: '.zip',
    mime: 'application/zip',
    names: [
      'release_artifact_bundle',
      'backup_database_dump',
      'webgl_textures_pack',
      'client_sdk_dist',
    ],
  },
  {
    cat: 'video',
    ext: '.mp4',
    mime: 'video/mp4',
    names: [
      'Demo_Stream_60FPS_Recording',
      'Keynote_Sunum_Kaydi',
      'WebGL_Shader_Benchmark_Pass',
    ],
  },
];

const PATTERNS: Array<'nebula' | 'cybergrid' | 'topography' | 'prism' | 'aurora'> = [
  'nebula',
  'cybergrid',
  'topography',
  'prism',
  'aurora',
];

const PALETTES: Array<[string, string, string]> = [
  ['#3b82f6', '#6366f1', '#ec4899'],
  ['#10b981', '#06b6d4', '#3b82f6'],
  ['#f59e0b', '#ef4444', '#8b5cf6'],
  ['#0ea5e9', '#8b5cf6', '#14b8a6'],
  ['#ec4899', '#f43f5e', '#f59e0b'],
];

/**
 * Generates realistic fake FileNodes for high-speed performance benchmarking.
 */
export function generateStressTestNodes(
  count: number,
  parentId: string | null,
  idPrefix = 'demo_fake'
): FileNode[] {
  const basePosix = PermissionEngine.buildPosixFromOctal('0644');
  const result: FileNode[] = new Array(count);
  const nowIso = '2026-10-21T12:00:00Z';

  for (let i = 0; i < count; i++) {
    const group = FAKE_TEMPLATES[i % FAKE_TEMPLATES.length];
    const baseTitle = group.names[i % group.names.length];
    const sizeBytes = 12 * 1024 + ((i * 4999) % (95 * 1024)); // ~12KB - 107KB per fake file
    const id = `${idPrefix}_${parentId || 'root'}_${i}_${Math.random().toString(36).slice(2, 6)}`;

    result[i] = {
      id,
      parentId,
      name: `${baseTitle}_${String(i + 1).padStart(4, '0')}${group.ext}`,
      type: group.cat === 'archive' ? 'archive' : 'file',
      category: group.cat,
      extension: group.ext,
      mimeType: group.mime,
      size: sizeBytes,
      createdAt: nowIso,
      updatedAt: nowIso,
      starred: i % 25 === 0,
      tags: ['Benchmark', `Batch-${(i % 10) + 1}`],
      trashed: false,
      isSyntheticStressNode: true,
      imageMeta:
        group.cat === 'image'
          ? {
              width: 1920,
              height: 1080,
              palette: PALETTES[i % PALETTES.length],
              pattern: PATTERNS[i % PATTERNS.length],
            }
          : undefined,
      content:
        group.cat === 'code' || group.cat === 'data'
          ? `// High-Speed Demo Node #${i + 1}\nexport const NODE_INDEX = ${i + 1};\n`
          : undefined,
      checksumSha256: `${((i + 1) * 2654435761).toString(16).padStart(64, '0')}`,
      security: {
        ownerId: i % 2 === 0 ? 'usr_dev' : 'usr_admin',
        ownerName: i % 2 === 0 ? 'Selin Kaya (Lead Dev)' : 'Umit Uz (Root Admin)',
        groupName: 'engineering',
        inheritFromParent: true,
        locked: i % 40 === 0,
        lockedBy: i % 40 === 0 ? 'System Policy' : undefined,
        posix: basePosix,
        acl: [],
      },
    };
  }

  return result;
}

export function getInitialSeedNodes(): FileNode[] {
  const now = '2026-10-20T14:20:00Z';

  const coreNodes: FileNode[] = [
    // ==================== ROOT FOLDERS ====================
    {
      id: 'fld_engineering',
      parentId: null,
      name: '01_Engineering_Core',
      type: 'folder',
      category: 'folder',
      extension: '',
      mimeType: 'inode/directory',
      size: 0,
      createdAt: '2026-09-01T09:00:00Z',
      updatedAt: now,
      starred: true,
      tags: ['SOLID', 'Core', 'Production'],
      colorTag: 'blue',
      trashed: false,
      checksumSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      security: {
        ownerId: 'usr_dev',
        ownerName: 'Selin Kaya (Lead Dev)',
        groupName: 'engineering',
        inheritFromParent: false,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0775'),
        acl: createDefaultAcl('engineering'),
        quota: {
          maxBytes: 200 * 1024 * 1024,
          maxFileSizeBytes: 80 * 1024 * 1024,
          allowedExtensions: [],
          blockedExtensions: ['.exe', '.bat'],
        },
      },
    },
    {
      id: 'fld_webgl',
      parentId: null,
      name: '02_WebGL_Shaders',
      type: 'folder',
      category: 'folder',
      extension: '',
      mimeType: 'inode/directory',
      size: 0,
      createdAt: '2026-09-10T11:30:00Z',
      updatedAt: now,
      starred: true,
      tags: ['WebGL2', 'GLSL', '4K-Textures'],
      colorTag: 'purple',
      trashed: false,
      checksumSha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      security: {
        ownerId: 'usr_editor',
        ownerName: 'Mert Demir (Media Editor)',
        groupName: 'creative',
        inheritFromParent: false,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0775'),
        acl: createDefaultAcl('creative'),
        quota: {
          maxBytes: 250 * 1024 * 1024,
          maxFileSizeBytes: 120 * 1024 * 1024,
          allowedExtensions: [],
          blockedExtensions: [],
        },
      },
    },
    {
      id: 'fld_vault',
      parentId: null,
      name: '03_Security_Vault',
      type: 'folder',
      category: 'folder',
      extension: '',
      mimeType: 'inode/directory',
      size: 0,
      createdAt: '2026-09-15T08:15:00Z',
      updatedAt: now,
      starred: false,
      tags: ['Encrypted', 'Restricted', 'ISO27001'],
      colorTag: 'rose',
      trashed: false,
      checksumSha256: '7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451',
      security: {
        ownerId: 'usr_admin',
        ownerName: 'Umit Uz (Root Admin)',
        groupName: 'wheel',
        inheritFromParent: false,
        locked: true,
        lockedBy: 'Umit Uz (Root Admin)',
        lockedReason: 'Compliance Freeze: Sadece okuma/denetim yapılabilir, yazma/silme kilitli.',
        posix: PermissionEngine.buildPosixFromOctal('0750'),
        acl: createDefaultAcl('vault'),
        quota: {
          maxBytes: 50 * 1024 * 1024,
          maxFileSizeBytes: 15 * 1024 * 1024,
          allowedExtensions: ['.pdf', '.md', '.json', '.pem', '.txt'],
          blockedExtensions: ['.exe', '.zip', '.sh'],
        },
      },
    },
    {
      id: 'fld_releases',
      parentId: null,
      name: '04_Public_Releases',
      type: 'folder',
      category: 'folder',
      extension: '',
      mimeType: 'inode/directory',
      size: 0,
      createdAt: '2026-10-01T10:00:00Z',
      updatedAt: now,
      starred: false,
      tags: ['SDK', 'Dist', 'CDN'],
      colorTag: 'emerald',
      trashed: false,
      checksumSha256: '2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3',
      security: {
        ownerId: 'usr_admin',
        ownerName: 'Umit Uz (Root Admin)',
        groupName: 'public',
        inheritFromParent: false,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0755'),
        acl: createDefaultAcl('open'),
      },
    },
    {
      id: 'fld_connectors',
      parentId: 'fld_engineering',
      name: 'Backend_Connectors',
      type: 'folder',
      category: 'folder',
      extension: '',
      mimeType: 'inode/directory',
      size: 0,
      createdAt: '2026-10-05T12:00:00Z',
      updatedAt: now,
      starred: true,
      tags: ['Laravel', 'NodeJS', 'REST'],
      colorTag: 'cyan',
      trashed: false,
      checksumSha256: '19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7',
      security: {
        ownerId: 'usr_dev',
        ownerName: 'Selin Kaya (Lead Dev)',
        groupName: 'engineering',
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0775'),
        acl: [],
      },
    },

    // ==================== FEATURED ROOT & FOLDER FILES ====================
    {
      id: 'fil_readme',
      parentId: null,
      name: 'Architecture_Guide.md',
      type: 'file',
      category: 'document',
      extension: '.md',
      mimeType: 'text/markdown',
      size: 4.8 * 1024 * 1024,
      createdAt: '2026-10-12T09:00:00Z',
      updatedAt: now,
      starred: true,
      tags: ['Documentation', 'SOLID', 'Guide'],
      colorTag: 'blue',
      trashed: false,
      checksumSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      content: `# HyperionFM v2.4 — Enterprise WebGL & SOLID File Manager\n\nBinlerce dosya üzerinde 60-120 FPS Virtualized DOM ve WebGL2 GPU sahnesiyle çalışır.`,
      security: {
        ownerId: 'usr_admin',
        ownerName: 'Umit Uz (Root Admin)',
        groupName: 'wheel',
        inheritFromParent: false,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0644'),
        acl: createDefaultAcl('open'),
      },
    },
    {
      id: 'fil_nebula_tex',
      parentId: null,
      name: 'Nebula_8K_HDR.png',
      type: 'file',
      category: 'image',
      extension: '.png',
      mimeType: 'image/png',
      size: 28.4 * 1024 * 1024,
      createdAt: '2026-10-14T16:45:00Z',
      updatedAt: now,
      starred: true,
      tags: ['HDR', 'WebGL-Ready', '8K'],
      colorTag: 'purple',
      trashed: false,
      imageMeta: {
        width: 3840,
        height: 2160,
        palette: ['#0ea5e9', '#6366f1', '#ec4899'],
        pattern: 'nebula',
      },
      checksumSha256: 'c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2',
      security: {
        ownerId: 'usr_editor',
        ownerName: 'Mert Demir (Media Editor)',
        groupName: 'creative',
        inheritFromParent: false,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0664'),
        acl: createDefaultAcl('creative'),
      },
    },
    {
      id: 'fil_root_config',
      parentId: null,
      name: 'HyperionConfig.json',
      type: 'file',
      category: 'data',
      extension: '.json',
      mimeType: 'application/json',
      size: 1.4 * 1024 * 1024,
      createdAt: '2026-10-15T10:15:00Z',
      updatedAt: now,
      starred: false,
      tags: ['Config', 'SOLID'],
      colorTag: 'emerald',
      trashed: false,
      content: `{\n  "version": "2.4.0",\n  "engine": "WebGL2",\n  "strictAcl": true\n}`,
      checksumSha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
      security: {
        ownerId: 'usr_admin',
        ownerName: 'Umit Uz (Root Admin)',
        groupName: 'wheel',
        inheritFromParent: false,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0644'),
        acl: createDefaultAcl('open'),
      },
    },
    {
      id: 'fil_root_sdk_zip',
      parentId: null,
      name: 'Hyperion_SDK_v2.4.zip',
      type: 'archive',
      category: 'archive',
      extension: '.zip',
      mimeType: 'application/zip',
      size: 18.6 * 1024 * 1024,
      createdAt: '2026-10-16T11:30:00Z',
      updatedAt: now,
      starred: true,
      tags: ['SDK', 'Release'],
      colorTag: 'amber',
      trashed: false,
      checksumSha256: '5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e',
      security: {
        ownerId: 'usr_admin',
        ownerName: 'Umit Uz (Root Admin)',
        groupName: 'public',
        inheritFromParent: false,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0644'),
        acl: createDefaultAcl('open'),
      },
    },
    {
      id: 'fil_wgl_shader',
      parentId: 'fld_webgl',
      name: 'CushionTreemapShader.glsl',
      type: 'file',
      category: 'code',
      extension: '.glsl',
      mimeType: 'text/plain',
      size: 14.2 * 1024 * 1024,
      createdAt: '2026-10-12T14:00:00Z',
      updatedAt: now,
      starred: true,
      tags: ['GLSL', 'Shader'],
      colorTag: 'purple',
      trashed: false,
      content: `precision highp float;\n// Cushion Treemap Fragment Shader`,
      checksumSha256: '8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c',
      security: {
        ownerId: 'usr_editor',
        ownerName: 'Mert Demir (Media Editor)',
        groupName: 'creative',
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0664'),
        acl: [],
      },
    },
    {
      id: 'fil_vault_iso',
      parentId: 'fld_vault',
      name: 'ISO27001_Compliance.pdf',
      type: 'file',
      category: 'document',
      extension: '.pdf',
      mimeType: 'application/pdf',
      size: 9.4 * 1024 * 1024,
      createdAt: '2026-10-10T09:00:00Z',
      updatedAt: now,
      starred: true,
      tags: ['ISO27001', 'Vault'],
      colorTag: 'rose',
      trashed: false,
      checksumSha256: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
      security: {
        ownerId: 'usr_admin',
        ownerName: 'Umit Uz (Root Admin)',
        groupName: 'wheel',
        inheritFromParent: true,
        locked: true,
        lockedBy: 'Umit Uz (Root Admin)',
        posix: PermissionEngine.buildPosixFromOctal('0640'),
        acl: [],
      },
    },
    {
      id: 'fil_rel_bundle',
      parentId: 'fld_releases',
      name: 'Production_Build_v2.4.zip',
      type: 'archive',
      category: 'archive',
      extension: '.zip',
      mimeType: 'application/zip',
      size: 32.5 * 1024 * 1024,
      createdAt: '2026-10-18T15:00:00Z',
      updatedAt: now,
      starred: false,
      tags: ['Release', 'Dist'],
      colorTag: 'emerald',
      trashed: false,
      checksumSha256: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
      security: {
        ownerId: 'usr_admin',
        ownerName: 'Umit Uz (Root Admin)',
        groupName: 'public',
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0644'),
        acl: [],
      },
    },
    {
      id: 'fil_laravel_ctrl',
      parentId: 'fld_connectors',
      name: 'HyperionConnector.php',
      type: 'file',
      category: 'code',
      extension: '.php',
      mimeType: 'application/x-httpd-php',
      size: 6.2 * 1024 * 1024,
      createdAt: '2026-10-11T10:00:00Z',
      updatedAt: now,
      starred: true,
      tags: ['Laravel-11', 'Connector', 'ACL'],
      colorTag: 'rose',
      trashed: false,
      content: `<?php\n// Laravel 11 Connector Controller\n`,
      checksumSha256: '4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce',
      security: {
        ownerId: 'usr_dev',
        ownerName: 'Selin Kaya (Lead Dev)',
        groupName: 'engineering',
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0664'),
        acl: [],
      },
    },
    {
      id: 'fil_node_connector',
      parentId: 'fld_connectors',
      name: 'ExpressConnector.ts',
      type: 'file',
      category: 'code',
      extension: '.ts',
      mimeType: 'application/typescript',
      size: 5.5 * 1024 * 1024,
      createdAt: '2026-10-11T13:15:00Z',
      updatedAt: now,
      starred: true,
      tags: ['NodeJS', 'Express', 'Fastify'],
      colorTag: 'blue',
      trashed: false,
      content: `// Node.js Express Connector\n`,
      checksumSha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
      security: {
        ownerId: 'usr_dev',
        ownerName: 'Selin Kaya (Lead Dev)',
        groupName: 'engineering',
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0664'),
        acl: [],
      },
    },
  ];

  // Pre-populate Demo Mode with a clean, realistic set of files out-of-the-box (+2.5K / +10K / +25K buttons add massive batches on demand)
  const rootFakeFiles = generateStressTestNodes(16, null, 'seed_root');
  const engineeringFakeFiles = generateStressTestNodes(28, 'fld_engineering', 'seed_eng');
  const connectorFakeFiles = generateStressTestNodes(18, 'fld_connectors', 'seed_conn');
  const webglFakeFiles = generateStressTestNodes(18, 'fld_webgl', 'seed_wgl');

  return [
    ...coreNodes,
    ...rootFakeFiles,
    ...engineeringFakeFiles,
    ...connectorFakeFiles,
    ...webglFakeFiles,
  ];
}
