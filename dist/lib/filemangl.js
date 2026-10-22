var al = Object.defineProperty;
var rl = (a, l, s) => l in a ? al(a, l, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[l] = s;
var Ee = (a, l, s) => rl(a, typeof l != "symbol" ? l + "" : l, s);
import { jsxs as t, jsx as e, Fragment as Je } from "react/jsx-runtime";
import Aa, { forwardRef as wr, createElement as Ta, useMemo as He, useContext as ll, createContext as nl, useRef as Ge, useState as A, useEffect as Ve, useCallback as Re, useId as sl } from "react";
const ft = [
  {
    id: "usr_admin",
    name: "Umit Uz (Root Admin)",
    title: "Principal Systems Architect",
    role: "admin",
    group: "wheel",
    badgeColor: "#3b82f6"
  },
  {
    id: "usr_dev",
    name: "Selin Kaya (Lead Dev)",
    title: "Senior Full-Stack Engineer",
    role: "developer",
    group: "engineering",
    badgeColor: "#10b981"
  },
  {
    id: "usr_editor",
    name: "Mert Demir (Media Editor)",
    title: "Creative Asset Manager",
    role: "editor",
    group: "creative",
    badgeColor: "#f59e0b"
  },
  {
    id: "usr_viewer",
    name: "Elif Yilmaz (Auditor)",
    title: "Security & Compliance Auditor",
    role: "viewer",
    group: "audit",
    badgeColor: "#a855f7"
  },
  {
    id: "usr_guest",
    name: "Anonim Misafir (Guest)",
    title: "External Public Partner",
    role: "guest",
    group: "public",
    badgeColor: "#64748b"
  }
], aa = {
  volumeName: "FILEMANGL_NVME_VOL01 (D:)",
  mountPath: "/mnt/nvme0n1/workspace",
  locale: "tr",
  theme: "dark",
  fontScale: 100,
  borderRadius: "squircle",
  inheritHostTheme: !0,
  driverType: "vfs_localstorage",
  connectorEndpoint: "https://api.yourdomain.com/v1/filemanager/connector",
  connectorAuthToken: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  // Disk & Quota Governance (2 GB default virtual disk allocation for massive file benchmarks)
  totalDiskQuotaBytes: 2048 * 1024 * 1024,
  defaultMaxUploadFileSizeBytes: 250 * 1024 * 1024,
  globalBlockedExtensions: [".bat", ".cmd", ".scr", ".vbs"],
  strictPermissionEnforcement: !0,
  respectFolderLocks: !0,
  // UI & Windows Explorer Capabilities
  defaultViewMode: "large_icons",
  enableRibbonToolbar: !0,
  enableDualPane: !1,
  enableDetailsInspector: !0,
  enableFolderTree: !0,
  enableBreadcrumbs: !0,
  enableStatusBar: !0,
  enableContextMenu: !0,
  enableKeyboardShortcuts: !0,
  enableDragAndDrop: !0,
  enableRubberBandSelection: !0,
  showHiddenAndSystemFiles: !0,
  showFileExtensions: !0,
  showPosixBadgesOnItems: !1,
  // Advanced Modules
  enableWebGLAcceleration: !0,
  enableWebGLImageShaderStudio: !0,
  enableWebGLDiskMap: !0,
  enableBuiltInCodeEditor: !0,
  enableArchiveCompression: !0,
  enableBatchRename: !0,
  enableShareLinks: !0,
  enableRecycleBin: !0,
  enableAuditLog: !0,
  enableUndoRedo: !0
}, il = {
  enterprise_win11: {
    label: "Windows 11 Enterprise (Tam Özellikli)",
    description: "Ribbon bar, sağ detay paneli, WebGL stüdyosu ve geri dönüşüm kutusu aktif.",
    patch: {
      ...aa,
      enableDualPane: !1,
      enableRibbonToolbar: !0,
      enableDetailsInspector: !0,
      showPosixBadgesOnItems: !1
    }
  },
  commander_dual: {
    label: "Total Commander / elFinder Çift Panel",
    description: "Yan yana iki bağımsız dizin paneli ile hızlı kopyalama/taşıma ve detaylı tablo görünümü.",
    patch: {
      ...aa,
      defaultViewMode: "details",
      enableDualPane: !0,
      enableDetailsInspector: !1
    }
  },
  webgl_performance: {
    label: "WebGL 60FPS Spatial Motoru",
    description: "GPU hızlandırmalı WebGL Canvas sahnesi, shader tabanlı görsel işleme ve 3B disk haritası odaklı.",
    patch: {
      ...aa,
      defaultViewMode: "webgl_spatial",
      enableWebGLAcceleration: !0,
      enableWebGLDiskMap: !0,
      enableWebGLImageShaderStudio: !0
    }
  },
  zero_trust_vault: {
    label: "Zero-Trust Güvenlik Kasası (Strict Quota & ACL)",
    description: "Sıkı kota limitleri (150 MB), genişletilmiş uzantı engeli ve katı izin/kilit denetimi.",
    patch: {
      ...aa,
      totalDiskQuotaBytes: 150 * 1024 * 1024,
      defaultMaxUploadFileSizeBytes: 25 * 1024 * 1024,
      globalBlockedExtensions: [".exe", ".bat", ".sh", ".cmd", ".dll", ".so", ".msi"],
      strictPermissionEnforcement: !0,
      respectFolderLocks: !0,
      showPosixBadgesOnItems: !0
    }
  }
}, St = [
  "read",
  "write",
  "delete",
  "rename",
  "upload",
  "download",
  "share",
  "chmod",
  "lock"
], nr = /* @__PURE__ */ new WeakMap();
class de {
  static getNodeMap(l) {
    let s = nr.get(l);
    if (!s) {
      s = /* @__PURE__ */ new Map();
      for (let d = 0; d < l.length; d++)
        s.set(l[d].id, l[d]);
      nr.set(l, s);
    }
    return s;
  }
  static triadToDigit(l) {
    return (l.r ? 4 : 0) + (l.w ? 2 : 0) + (l.x ? 1 : 0);
  }
  static digitToTriad(l) {
    return {
      r: (l & 4) !== 0,
      w: (l & 2) !== 0,
      x: (l & 1) !== 0
    };
  }
  static triadToSymbolic(l) {
    return `${l.r ? "r" : "-"}${l.w ? "w" : "-"}${l.x ? "x" : "-"}`;
  }
  static buildPosixFromOctal(l) {
    const s = l.replace(/[^0-7]/g, "").padStart(3, "0").slice(-3), d = parseInt(s[0], 10) || 0, i = parseInt(s[1], 10) || 0, c = parseInt(s[2], 10) || 0, n = this.digitToTriad(d), u = this.digitToTriad(i), x = this.digitToTriad(c);
    return {
      owner: n,
      group: u,
      others: x,
      octal: `0${d}${i}${c}`,
      symbolic: `${this.triadToSymbolic(n)}${this.triadToSymbolic(u)}${this.triadToSymbolic(x)}`
    };
  }
  static syncPosix(l) {
    const s = this.triadToDigit(l.owner), d = this.triadToDigit(l.group), i = this.triadToDigit(l.others);
    return {
      owner: { ...l.owner },
      group: { ...l.group },
      others: { ...l.others },
      octal: `0${s}${d}${i}`,
      symbolic: `${this.triadToSymbolic(l.owner)}${this.triadToSymbolic(l.group)}${this.triadToSymbolic(l.others)}`
    };
  }
  /**
   * Resolves the effective ACL rules chain by walking up parent directories
   * whenever `inheritFromParent` is true.
   */
  static collectInheritedAclChain(l, s) {
    const d = [...l.security.acl];
    let i = l, c = 0;
    for (; i && i.security.inheritFromParent && i.parentId && c < 16; ) {
      c++;
      const n = s.get(i.parentId);
      if (!n) break;
      n.security.acl.length > 0 && d.push(...n.security.acl), i = n;
    }
    return d;
  }
  /**
   * Computes the complete effective permissions matrix for a given user on a target FileNode.
   */
  static evaluateNodePermissions(l, s, d, i) {
    const c = this.getNodeMap(d), n = l.security.ownerId === s.id, u = l.security.groupName === s.group;
    if (!i.strictPermissionEnforcement) {
      const m = {}, b = {};
      for (const E of St)
        m[E] = !0, b[E] = "İzin denetimi yapılandırmada devre dışı bırakıldı (Bypass Mode).";
      return {
        allowed: m,
        reasons: b,
        effectiveOctal: l.security.posix.octal,
        effectiveSymbolic: `${l.type === "folder" ? "d" : "-"}${l.security.posix.symbolic}`,
        isOwner: n,
        isLocked: l.security.locked
      };
    }
    const x = n ? l.security.posix.owner : u ? l.security.posix.group : l.security.posix.others, P = { ...{
      read: x.r,
      download: x.r,
      write: x.w,
      upload: x.w && x.x,
      rename: x.w,
      delete: x.w,
      share: x.r && (n || s.role === "admin" || s.role === "editor"),
      chmod: n || s.role === "admin",
      lock: x.w || n || s.role === "admin"
    } }, L = {}, T = n ? "Owner (Sahip)" : u ? `Group (${s.group})` : "Others (Genel)";
    for (const m of St)
      L[m] = P[m] ? `POSIX ${l.security.posix.octal} (${T}) üzerinden izin verildi.` : `POSIX ${l.security.posix.octal} (${T}) kısıtlaması nedeniyle reddedildi.`;
    const v = this.collectInheritedAclChain(l, c).filter(
      (m) => m.subjectType === "user" && m.subjectId === s.id || m.subjectType === "role" && m.subjectId === s.role
    ), B = v.filter((m) => m.effect === "allow"), F = v.filter((m) => m.effect === "deny");
    for (const m of B)
      for (const b of St)
        m.permissions[b] && (P[b] = !0, L[b] = `ACL Allow kuralı (${m.subjectLabel}) ile yetki tanımlandı.`);
    for (const m of F)
      for (const b of St)
        m.permissions[b] && (P[b] = !1, L[b] = `ACL Explicit Deny kuralı (${m.subjectLabel}) tarafından engellendi.`);
    if (s.role === "admin")
      for (const m of St)
        F.some(
          (E) => E.subjectId === "admin" && E.permissions[m]
        ) || (P[m] = !0, L[m] = "Root Admin (Süper Kullanıcı) yetkisiyle tam erişim.");
    let z = l.security.locked ? l : void 0;
    if (!z) {
      let m = l, b = 0;
      for (; m && m.parentId && b < 16; ) {
        b++;
        const E = c.get(m.parentId);
        if (E != null && E.security.locked) {
          z = E;
          break;
        }
        m = E;
      }
    }
    if (i.respectFolderLocks && z) {
      const m = ["write", "delete", "rename", "upload"];
      for (const b of m)
        P[b] = !1, L[b] = `"${z.name}" öğesi kilitli (${z.security.lockedBy || "Sistem"}) olduğu için değiştirilemez.`;
    }
    return {
      allowed: P,
      reasons: L,
      effectiveOctal: l.security.posix.octal,
      effectiveSymbolic: `${l.type === "folder" ? "d" : "-"}${l.security.posix.symbolic}`,
      isOwner: n,
      isLocked: !!z
    };
  }
}
function nt(a) {
  const l = [
    "read",
    "write",
    "delete",
    "rename",
    "upload",
    "download",
    "share",
    "chmod",
    "lock"
  ], s = {};
  for (const d of l)
    s[d] = a.includes(d);
  return s;
}
function ot(a) {
  return a === "vault" ? [
    {
      id: "acl_v1",
      subjectType: "role",
      subjectId: "admin",
      subjectLabel: "Role: Root Admin",
      effect: "allow",
      permissions: nt([
        "read",
        "write",
        "delete",
        "rename",
        "upload",
        "download",
        "share",
        "chmod",
        "lock"
      ])
    },
    {
      id: "acl_v2",
      subjectType: "role",
      subjectId: "viewer",
      subjectLabel: "Role: Security Auditor",
      effect: "allow",
      permissions: nt(["read", "download"])
    },
    {
      id: "acl_v3",
      subjectType: "role",
      subjectId: "guest",
      subjectLabel: "Role: External Guest",
      effect: "deny",
      permissions: nt([
        "read",
        "write",
        "delete",
        "rename",
        "upload",
        "download",
        "share",
        "chmod",
        "lock"
      ])
    },
    {
      id: "acl_v4",
      subjectType: "role",
      subjectId: "editor",
      subjectLabel: "Role: Media Editor",
      effect: "deny",
      permissions: nt(["write", "delete", "rename", "upload"])
    }
  ] : a === "engineering" ? [
    {
      id: "acl_e1",
      subjectType: "role",
      subjectId: "developer",
      subjectLabel: "Role: Lead Developer",
      effect: "allow",
      permissions: nt([
        "read",
        "write",
        "delete",
        "rename",
        "upload",
        "download",
        "share",
        "lock"
      ])
    },
    {
      id: "acl_e2",
      subjectType: "role",
      subjectId: "editor",
      subjectLabel: "Role: Media Editor",
      effect: "allow",
      permissions: nt(["read", "download"])
    },
    {
      id: "acl_e3",
      subjectType: "role",
      subjectId: "guest",
      subjectLabel: "Role: External Guest",
      effect: "deny",
      permissions: nt(["write", "delete", "rename", "upload", "chmod", "lock"])
    }
  ] : a === "creative" ? [
    {
      id: "acl_c1",
      subjectType: "role",
      subjectId: "editor",
      subjectLabel: "Role: Media Editor",
      effect: "allow",
      permissions: nt([
        "read",
        "write",
        "delete",
        "rename",
        "upload",
        "download",
        "share"
      ])
    },
    {
      id: "acl_c2",
      subjectType: "role",
      subjectId: "developer",
      subjectLabel: "Role: Lead Developer",
      effect: "allow",
      permissions: nt(["read", "write", "upload", "download"])
    }
  ] : [
    {
      id: "acl_o1",
      subjectType: "role",
      subjectId: "editor",
      subjectLabel: "Role: Media Editor",
      effect: "allow",
      permissions: nt(["read", "write", "upload", "download", "share"])
    },
    {
      id: "acl_o2",
      subjectType: "role",
      subjectId: "viewer",
      subjectLabel: "Role: Security Auditor",
      effect: "allow",
      permissions: nt(["read", "download"])
    }
  ];
}
const sr = [
  {
    cat: "code",
    ext: ".ts",
    mime: "application/typescript",
    names: [
      "AuthTokenGuard",
      "FileManGLBatchRenderer",
      "PermissionsMiddleware",
      "StorageDriverAdapter",
      "QuotaPolicyValidator",
      "VirtualScrollEngine",
      "FileStreamHasher",
      "ClusterSyncWorker"
    ]
  },
  {
    cat: "code",
    ext: ".php",
    mime: "application/x-httpd-php",
    names: [
      "FileManGLDiskController",
      "SanctumAclPolicy",
      "ChunkedUploadService",
      "TenantQuotaRepository",
      "DirectoryTreeResource"
    ]
  },
  {
    cat: "image",
    ext: ".png",
    mime: "image/png",
    names: [
      "UI_Mockup_Render_4K",
      "Shader_Displacement_Map",
      "Satellite_Terrain_Tile",
      "Product_Hero_Asset",
      "HDR_Environment_Skybox"
    ]
  },
  {
    cat: "document",
    ext: ".pdf",
    mime: "application/pdf",
    names: [
      "Kurumsal_Guvenlik_Raporu",
      "Musteri_Fatura_Arsivi",
      "SLA_Performans_Analizi",
      "Mimari_Tasarim_Dokumani",
      "ISO27001_Denetim_Kaydi"
    ]
  },
  {
    cat: "data",
    ext: ".json",
    mime: "application/json",
    names: [
      "telemetry_metrics_shard",
      "user_acl_manifest",
      "search_index_partition",
      "audit_trail_snapshot",
      "cdn_edge_routing"
    ]
  },
  {
    cat: "archive",
    ext: ".zip",
    mime: "application/zip",
    names: [
      "release_artifact_bundle",
      "backup_database_dump",
      "filemangl_textures_pack",
      "filemangl_sdk_dist"
    ]
  },
  {
    cat: "video",
    ext: ".mp4",
    mime: "video/mp4",
    names: [
      "FileManGL_Stream_60FPS_Recording",
      "Keynote_Sunum_Kaydi",
      "FileManGL_Shader_Benchmark_Pass"
    ]
  }
], ir = [
  "nebula",
  "cybergrid",
  "topography",
  "prism",
  "aurora"
], or = [
  ["#3b82f6", "#6366f1", "#ec4899"],
  ["#10b981", "#06b6d4", "#3b82f6"],
  ["#f59e0b", "#ef4444", "#8b5cf6"],
  ["#0ea5e9", "#8b5cf6", "#14b8a6"],
  ["#ec4899", "#f43f5e", "#f59e0b"]
];
function ct(a, l, s = "demo_fake") {
  const d = de.buildPosixFromOctal("0644"), i = new Array(a), c = "2026-10-21T12:00:00Z";
  for (let n = 0; n < a; n++) {
    const u = sr[n % sr.length], x = u.names[n % u.names.length], w = 12 * 1024 + n * 4999 % (95 * 1024), P = `${s}_${l || "root"}_${n}_${Math.random().toString(36).slice(2, 6)}`;
    i[n] = {
      id: P,
      parentId: l,
      name: `${x}_${String(n + 1).padStart(4, "0")}${u.ext}`,
      type: u.cat === "archive" ? "archive" : "file",
      category: u.cat,
      extension: u.ext,
      mimeType: u.mime,
      size: w,
      createdAt: c,
      updatedAt: c,
      starred: n % 25 === 0,
      tags: ["Benchmark", `Batch-${n % 10 + 1}`],
      trashed: !1,
      isSyntheticStressNode: !0,
      imageMeta: u.cat === "image" ? {
        width: 1920,
        height: 1080,
        palette: or[n % or.length],
        pattern: ir[n % ir.length]
      } : void 0,
      content: u.cat === "code" || u.cat === "data" ? `// High-Speed Demo Node #${n + 1}
export const NODE_INDEX = ${n + 1};
` : void 0,
      checksumSha256: `${((n + 1) * 2654435761).toString(16).padStart(64, "0")}`,
      security: {
        ownerId: n % 2 === 0 ? "usr_dev" : "usr_admin",
        ownerName: n % 2 === 0 ? "Selin Kaya (Lead Dev)" : "Umit Uz (Root Admin)",
        groupName: "engineering",
        inheritFromParent: !0,
        locked: n % 40 === 0,
        lockedBy: n % 40 === 0 ? "System Policy" : void 0,
        posix: d,
        acl: []
      }
    };
  }
  return i;
}
function na() {
  const a = "2026-10-20T14:20:00Z", l = [
    // ==================== ROOT FOLDERS ====================
    {
      id: "fld_engineering",
      parentId: null,
      name: "01_Engineering_Core",
      type: "folder",
      category: "folder",
      extension: "",
      mimeType: "inode/directory",
      size: 0,
      createdAt: "2026-09-01T09:00:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["SOLID", "Core", "Production"],
      colorTag: "blue",
      trashed: !1,
      checksumSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      security: {
        ownerId: "usr_dev",
        ownerName: "Selin Kaya (Lead Dev)",
        groupName: "engineering",
        inheritFromParent: !1,
        locked: !1,
        posix: de.buildPosixFromOctal("0775"),
        acl: ot("engineering"),
        quota: {
          maxBytes: 209715200,
          maxFileSizeBytes: 83886080,
          allowedExtensions: [],
          blockedExtensions: [".exe", ".bat"]
        }
      }
    },
    {
      id: "fld_webgl",
      parentId: null,
      name: "02_WebGL_Shaders",
      type: "folder",
      category: "folder",
      extension: "",
      mimeType: "inode/directory",
      size: 0,
      createdAt: "2026-09-10T11:30:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["WebGL2", "GLSL", "4K-Textures"],
      colorTag: "purple",
      trashed: !1,
      checksumSha256: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      security: {
        ownerId: "usr_editor",
        ownerName: "Mert Demir (Media Editor)",
        groupName: "creative",
        inheritFromParent: !1,
        locked: !1,
        posix: de.buildPosixFromOctal("0775"),
        acl: ot("creative"),
        quota: {
          maxBytes: 262144e3,
          maxFileSizeBytes: 125829120,
          allowedExtensions: [],
          blockedExtensions: []
        }
      }
    },
    {
      id: "fld_vault",
      parentId: null,
      name: "03_Security_Vault",
      type: "folder",
      category: "folder",
      extension: "",
      mimeType: "inode/directory",
      size: 0,
      createdAt: "2026-09-15T08:15:00Z",
      updatedAt: a,
      starred: !1,
      tags: ["Encrypted", "Restricted", "ISO27001"],
      colorTag: "rose",
      trashed: !1,
      checksumSha256: "7902699be42c8a8e46fbbb4501726517e86b22c56a189f7625a6da49081b2451",
      security: {
        ownerId: "usr_admin",
        ownerName: "Umit Uz (Root Admin)",
        groupName: "wheel",
        inheritFromParent: !1,
        locked: !0,
        lockedBy: "Umit Uz (Root Admin)",
        lockedReason: "Compliance Freeze: Sadece okuma/denetim yapılabilir, yazma/silme kilitli.",
        posix: de.buildPosixFromOctal("0750"),
        acl: ot("vault"),
        quota: {
          maxBytes: 52428800,
          maxFileSizeBytes: 15728640,
          allowedExtensions: [".pdf", ".md", ".json", ".pem", ".txt"],
          blockedExtensions: [".exe", ".zip", ".sh"]
        }
      }
    },
    {
      id: "fld_releases",
      parentId: null,
      name: "04_Public_Releases",
      type: "folder",
      category: "folder",
      extension: "",
      mimeType: "inode/directory",
      size: 0,
      createdAt: "2026-10-01T10:00:00Z",
      updatedAt: a,
      starred: !1,
      tags: ["SDK", "Dist", "CDN"],
      colorTag: "emerald",
      trashed: !1,
      checksumSha256: "2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3",
      security: {
        ownerId: "usr_admin",
        ownerName: "Umit Uz (Root Admin)",
        groupName: "public",
        inheritFromParent: !1,
        locked: !1,
        posix: de.buildPosixFromOctal("0755"),
        acl: ot("open")
      }
    },
    {
      id: "fld_connectors",
      parentId: "fld_engineering",
      name: "Backend_Connectors",
      type: "folder",
      category: "folder",
      extension: "",
      mimeType: "inode/directory",
      size: 0,
      createdAt: "2026-10-05T12:00:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["Laravel", "NodeJS", "REST"],
      colorTag: "cyan",
      trashed: !1,
      checksumSha256: "19581e27de7ced00ff1ce50b2047e7a567c76b1cbaebabe5ef03f7c3017bb5b7",
      security: {
        ownerId: "usr_dev",
        ownerName: "Selin Kaya (Lead Dev)",
        groupName: "engineering",
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0775"),
        acl: []
      }
    },
    // ==================== FEATURED ROOT & FOLDER FILES ====================
    {
      id: "fil_readme",
      parentId: null,
      name: "Architecture_Guide.md",
      type: "file",
      category: "document",
      extension: ".md",
      mimeType: "text/markdown",
      size: 50331648e-1,
      createdAt: "2026-10-12T09:00:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["Documentation", "SOLID", "Guide"],
      colorTag: "blue",
      trashed: !1,
      checksumSha256: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      content: `# FileManGL v1.0.4 — Enterprise WebGL & SOLID File Manager

Binlerce dosya üzerinde 60-120 FPS Virtualized DOM ve WebGL2 GPU sahnesiyle çalışır.`,
      security: {
        ownerId: "usr_admin",
        ownerName: "Umit Uz (Root Admin)",
        groupName: "wheel",
        inheritFromParent: !1,
        locked: !1,
        posix: de.buildPosixFromOctal("0644"),
        acl: ot("open")
      }
    },
    {
      id: "fil_nebula_tex",
      parentId: null,
      name: "Nebula_8K_HDR.png",
      type: "file",
      category: "image",
      extension: ".png",
      mimeType: "image/png",
      size: 297795584e-1,
      createdAt: "2026-10-14T16:45:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["HDR", "WebGL-Ready", "8K"],
      colorTag: "purple",
      trashed: !1,
      imageMeta: {
        width: 3840,
        height: 2160,
        palette: ["#0ea5e9", "#6366f1", "#ec4899"],
        pattern: "nebula"
      },
      checksumSha256: "c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f2",
      security: {
        ownerId: "usr_editor",
        ownerName: "Mert Demir (Media Editor)",
        groupName: "creative",
        inheritFromParent: !1,
        locked: !1,
        posix: de.buildPosixFromOctal("0664"),
        acl: ot("creative")
      }
    },
    {
      id: "fil_root_config",
      parentId: null,
      name: "FileManGLConfig.json",
      type: "file",
      category: "data",
      extension: ".json",
      mimeType: "application/json",
      size: 14680064e-1,
      createdAt: "2026-10-15T10:15:00Z",
      updatedAt: a,
      starred: !1,
      tags: ["Config", "SOLID"],
      colorTag: "emerald",
      trashed: !1,
      content: `{
  "name": "FileManGL",
  "version": "1.0.4",
  "engine": "WebGL2",
  "strictAcl": true
}`,
      checksumSha256: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
      security: {
        ownerId: "usr_admin",
        ownerName: "Umit Uz (Root Admin)",
        groupName: "wheel",
        inheritFromParent: !1,
        locked: !1,
        posix: de.buildPosixFromOctal("0644"),
        acl: ot("open")
      }
    },
    {
      id: "fil_root_sdk_zip",
      parentId: null,
      name: "FileManGL_SDK_v1.0.4.zip",
      type: "archive",
      category: "archive",
      extension: ".zip",
      mimeType: "application/zip",
      size: 195035136e-1,
      createdAt: "2026-10-16T11:30:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["SDK", "Release"],
      colorTag: "amber",
      trashed: !1,
      checksumSha256: "5f6e7d8c9b0a1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c7b8a9f0e1d2c3b4a5f6e",
      security: {
        ownerId: "usr_admin",
        ownerName: "Umit Uz (Root Admin)",
        groupName: "public",
        inheritFromParent: !1,
        locked: !1,
        posix: de.buildPosixFromOctal("0644"),
        acl: ot("open")
      }
    },
    {
      id: "fil_wgl_shader",
      parentId: "fld_webgl",
      name: "CushionTreemapShader.glsl",
      type: "file",
      category: "code",
      extension: ".glsl",
      mimeType: "text/plain",
      size: 148897792e-1,
      createdAt: "2026-10-12T14:00:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["GLSL", "Shader"],
      colorTag: "purple",
      trashed: !1,
      content: `precision highp float;
// Cushion Treemap Fragment Shader`,
      checksumSha256: "8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c",
      security: {
        ownerId: "usr_editor",
        ownerName: "Mert Demir (Media Editor)",
        groupName: "creative",
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0664"),
        acl: []
      }
    },
    {
      id: "fil_vault_iso",
      parentId: "fld_vault",
      name: "ISO27001_Compliance.pdf",
      type: "file",
      category: "document",
      extension: ".pdf",
      mimeType: "application/pdf",
      size: 98566144e-1,
      createdAt: "2026-10-10T09:00:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["ISO27001", "Vault"],
      colorTag: "rose",
      trashed: !1,
      checksumSha256: "7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d",
      security: {
        ownerId: "usr_admin",
        ownerName: "Umit Uz (Root Admin)",
        groupName: "wheel",
        inheritFromParent: !0,
        locked: !0,
        lockedBy: "Umit Uz (Root Admin)",
        posix: de.buildPosixFromOctal("0640"),
        acl: []
      }
    },
    {
      id: "fil_rel_bundle",
      parentId: "fld_releases",
      name: "FileManGL_Build_v1.0.4.zip",
      type: "archive",
      category: "archive",
      extension: ".zip",
      mimeType: "application/zip",
      size: 34078720,
      createdAt: "2026-10-18T15:00:00Z",
      updatedAt: a,
      starred: !1,
      tags: ["Release", "Dist"],
      colorTag: "emerald",
      trashed: !1,
      checksumSha256: "3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
      security: {
        ownerId: "usr_admin",
        ownerName: "Umit Uz (Root Admin)",
        groupName: "public",
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0644"),
        acl: []
      }
    },
    {
      id: "fil_laravel_ctrl",
      parentId: "fld_connectors",
      name: "FileManGLConnector.php",
      type: "file",
      category: "code",
      extension: ".php",
      mimeType: "application/x-httpd-php",
      size: 65011712e-1,
      createdAt: "2026-10-11T10:00:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["Laravel-11", "Connector", "ACL"],
      colorTag: "rose",
      trashed: !1,
      content: `<?php
// Laravel 11 FileManGL Connector Controller
`,
      checksumSha256: "4e07408562bedb8b60ce05c1decfe3ad16b72230967de01f640b7e4729b49fce",
      security: {
        ownerId: "usr_dev",
        ownerName: "Selin Kaya (Lead Dev)",
        groupName: "engineering",
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0664"),
        acl: []
      }
    },
    {
      id: "fil_node_connector",
      parentId: "fld_connectors",
      name: "ExpressConnector.ts",
      type: "file",
      category: "code",
      extension: ".ts",
      mimeType: "application/typescript",
      size: 5767168,
      createdAt: "2026-10-11T13:15:00Z",
      updatedAt: a,
      starred: !0,
      tags: ["NodeJS", "Express", "Fastify"],
      colorTag: "blue",
      trashed: !1,
      content: `// Node.js Express Connector
`,
      checksumSha256: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
      security: {
        ownerId: "usr_dev",
        ownerName: "Selin Kaya (Lead Dev)",
        groupName: "engineering",
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0664"),
        acl: []
      }
    }
  ], s = ct(16, null, "seed_root"), d = ct(28, "fld_engineering", "seed_eng"), i = ct(18, "fld_connectors", "seed_conn"), c = ct(18, "fld_webgl", "seed_wgl");
  return [
    ...l,
    ...s,
    ...d,
    ...i,
    ...c
  ];
}
const ol = "filemangl_media_cache_v1", dl = 1, Nt = "thumbnails", it = "blobs", cl = 250;
function Na(a, l, s) {
  const d = (i) => Math.max(0, Math.min(255, Math.round(i)));
  return "#" + [d(a), d(l), d(s)].map((i) => i.toString(16).padStart(2, "0")).join("");
}
function ml(a) {
  const l = a.indexOf(",");
  if (l === -1) return a.length;
  const s = a.length - l - 1;
  return Math.round(s * 3 / 4);
}
class ul {
  constructor() {
    Ee(this, "l1Cache", /* @__PURE__ */ new Map());
    Ee(this, "blobUrlMap", /* @__PURE__ */ new Map());
    Ee(this, "blobInstanceMap", /* @__PURE__ */ new Map());
    Ee(this, "hitCount", 0);
    Ee(this, "missCount", 0);
    Ee(this, "dbPromise", null);
  }
  openDatabase() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((l) => {
      if (typeof window > "u" || !("indexedDB" in window)) {
        l(null);
        return;
      }
      try {
        const s = window.indexedDB.open(ol, dl);
        s.onupgradeneeded = () => {
          const d = s.result;
          d.objectStoreNames.contains(Nt) || d.createObjectStore(Nt, { keyPath: "cacheKey" }), d.objectStoreNames.contains(it) || d.createObjectStore(it);
        }, s.onsuccess = () => l(s.result), s.onerror = () => l(null);
      } catch {
        l(null);
      }
    }), this.dbPromise);
  }
  setL1(l, s) {
    if (this.l1Cache.has(l))
      this.l1Cache.delete(l);
    else if (this.l1Cache.size >= cl) {
      const d = this.l1Cache.keys().next().value;
      d && this.l1Cache.delete(d);
    }
    this.l1Cache.set(l, s);
  }
  getFromL1(l) {
    const s = this.l1Cache.get(l);
    if (s)
      return this.hitCount++, this.l1Cache.delete(l), this.l1Cache.set(l, s), { ...s, fromCache: !0 };
  }
  async getThumbnail(l) {
    const s = this.getFromL1(l);
    if (s) return s;
    const d = await this.openDatabase();
    return d ? new Promise((i) => {
      try {
        const u = d.transaction(Nt, "readonly").objectStore(Nt).get(l);
        u.onsuccess = () => {
          if (u.result) {
            this.hitCount++;
            const x = { ...u.result, fromCache: !0 };
            this.setL1(l, x), i(x);
          } else
            this.missCount++, i(null);
        }, u.onerror = () => {
          this.missCount++, i(null);
        };
      } catch {
        this.missCount++, i(null);
      }
    }) : (this.missCount++, null);
  }
  async putThumbnail(l) {
    this.setL1(l.cacheKey, l);
    const s = await this.openDatabase();
    if (s)
      try {
        s.transaction(Nt, "readwrite").objectStore(Nt).put(l);
      } catch {
      }
  }
  async persistBinaryBlob(l, s) {
    this.blobInstanceMap.set(l, s);
    const d = await this.openDatabase();
    if (d)
      try {
        d.transaction(it, "readwrite").objectStore(it).put(s, l);
      } catch {
      }
  }
  async getBinaryBlob(l) {
    if (this.blobInstanceMap.has(l))
      return this.blobInstanceMap.get(l);
    const s = await this.openDatabase();
    return s ? new Promise((d) => {
      try {
        const c = s.transaction(it, "readonly").objectStore(it).get(l);
        c.onsuccess = () => {
          const n = c.result;
          if (n) {
            this.blobInstanceMap.set(l, n), d(n);
            return;
          }
          d(null);
        }, c.onerror = () => d(null);
      } catch {
        d(null);
      }
    }) : null;
  }
  async getPersistedBlobUrl(l) {
    if (this.blobUrlMap.has(l))
      return this.blobUrlMap.get(l);
    const s = await this.openDatabase();
    return s ? new Promise((d) => {
      try {
        const c = s.transaction(it, "readonly").objectStore(it).get(l);
        c.onsuccess = () => {
          const n = c.result;
          if (n && typeof URL < "u" && typeof URL.createObjectURL == "function")
            try {
              const u = URL.createObjectURL(n);
              this.blobUrlMap.set(l, u), d(u);
              return;
            } catch {
              d(null);
              return;
            }
          d(null);
        }, c.onerror = () => d(null);
      } catch {
        d(null);
      }
    }) : null;
  }
  /**
   * Generates a real bicubic-downscaled WebP/JPEG thumbnail & extracts 3 dominant RGB hex colors
   * from an uploaded image File/Blob, caching both in L1 RAM and L2 IndexedDB.
   */
  async generateAndCacheImageThumbnail(l, s, d, i = 320) {
    const c = performance.now(), n = await this.getThumbnail(s);
    if (n)
      return await this.persistBinaryBlob(s, l), {
        ...n,
        generationMs: Number((performance.now() - c).toFixed(2)),
        fromCache: !0
      };
    await this.persistBinaryBlob(s, l);
    let u = d;
    if (!u)
      try {
        typeof URL < "u" && typeof URL.createObjectURL == "function" && (u = URL.createObjectURL(l));
      } catch {
        u = void 0;
      }
    return u && this.blobUrlMap.set(s, u), new Promise((x) => {
      const w = () => {
        const v = {
          cacheKey: s,
          thumbnailDataUrl: u || "",
          width: 1920,
          height: 1080,
          palette: ["#00c8ff", "#2ff58e", "#3b82f6"],
          thumbByteSize: Math.min(l.size, 18432),
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          generationMs: Number((performance.now() - c).toFixed(2)),
          fromCache: !1
        };
        return this.putThumbnail(v), v;
      };
      if (typeof Image > "u" || typeof document > "u" || !u) {
        x(w());
        return;
      }
      let P = !1;
      const L = new Image(), T = (v) => {
        P || (P = !0, clearTimeout(M), x(v));
      }, M = setTimeout(() => {
        T(w());
      }, 650);
      L.onload = () => {
        try {
          const v = L.naturalWidth || 1920, B = L.naturalHeight || 1080, F = Math.min(1, i / Math.max(v, B)), z = Math.max(1, Math.round(v * F)), m = Math.max(1, Math.round(B * F)), b = document.createElement("canvas");
          b.width = z, b.height = m;
          const E = b.getContext("2d");
          let Z = u, X = ["#00c8ff", "#2ff58e", "#3b82f6"];
          if (E) {
            E.imageSmoothingEnabled = !0, E.imageSmoothingQuality = "high", E.drawImage(L, 0, 0, z, m);
            try {
              const se = E.getImageData(
                Math.floor(z * 0.25),
                Math.floor(m * 0.25),
                1,
                1
              ).data, he = E.getImageData(
                Math.floor(z * 0.5),
                Math.floor(m * 0.5),
                1,
                1
              ).data, be = E.getImageData(
                Math.floor(z * 0.75),
                Math.floor(m * 0.75),
                1,
                1
              ).data;
              X = [
                Na(se[0], se[1], se[2]),
                Na(he[0], he[1], he[2]),
                Na(be[0], be[1], be[2])
              ];
            } catch {
            }
            const re = b.toDataURL("image/webp", 0.84);
            if (re && re.startsWith("data:image/"))
              Z = re;
            else {
              const se = b.toDataURL("image/jpeg", 0.84);
              se && se.startsWith("data:image/") && (Z = se);
            }
          }
          const $ = {
            cacheKey: s,
            thumbnailDataUrl: Z,
            width: v,
            height: B,
            palette: X,
            thumbByteSize: ml(Z) || Math.min(l.size, 24576),
            generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            generationMs: Number((performance.now() - c).toFixed(2)),
            fromCache: !1
          };
          this.putThumbnail($), T($);
        } catch {
          T(w());
        }
      }, L.onerror = () => {
        T(w());
      }, L.src = u;
    });
  }
  /**
   * Rehydrates persisted FileNodes on application startup so uploaded images, videos, and files
   * retain their live Blob URLs and cached thumbnails across page refreshes (F5).
   */
  async rehydrateNodes(l) {
    return await Promise.all(
      l.map(async (d) => {
        if (!d.isUserUploaded && !d.thumbnailUrl && !d.blobUrl)
          return d;
        const i = d.checksumSha256 || d.id, c = await this.getThumbnail(i), n = await this.getPersistedBlobUrl(i);
        return !c && !n ? d : {
          ...d,
          blobUrl: n || d.blobUrl,
          thumbnailUrl: (c == null ? void 0 : c.thumbnailDataUrl) || n || d.thumbnailUrl,
          imageMeta: d.imageMeta || (c ? {
            width: c.width,
            height: c.height,
            palette: c.palette,
            pattern: "aurora"
          } : void 0)
        };
      })
    );
  }
  getStats() {
    let l = 0;
    this.l1Cache.forEach((i) => {
      l += i.thumbByteSize;
    });
    const s = this.hitCount + this.missCount, d = s > 0 ? Math.round(this.hitCount / s * 100) : 100;
    return {
      l1Entries: this.l1Cache.size,
      hitCount: this.hitCount,
      missCount: this.missCount,
      totalThumbBytes: l,
      hitRatioPercent: d
    };
  }
  async clearAll() {
    this.l1Cache.clear(), this.hitCount = 0, this.missCount = 0;
    const l = await this.openDatabase();
    if (l)
      try {
        const s = l.transaction([Nt, it], "readwrite");
        s.objectStore(Nt).clear(), s.objectStore(it).clear();
      } catch {
      }
  }
}
const ht = new ul(), Sa = "filemangl_vfs_nodes_v28_win11";
class kr {
  constructor() {
    Ee(this, "driverId", "vfs_localstorage");
    Ee(this, "driverName", "FileManGL In-Browser VFS (Zero-Backend)");
    Ee(this, "supportsRealtimeStream", !0);
    Ee(this, "memoryCache", null);
  }
  async initialize() {
    try {
      const s = localStorage.getItem(Sa);
      if (s) {
        const d = JSON.parse(s);
        if (Array.isArray(d) && d.length > 0) {
          const i = await ht.rehydrateNodes(d);
          return this.memoryCache = i, i;
        }
      }
    } catch {
    }
    const l = na();
    return this.memoryCache = l, await this.saveAllNodes(l), l;
  }
  async getAllNodes() {
    return this.memoryCache ? this.memoryCache : this.initialize();
  }
  async saveAllNodes(l) {
    this.memoryCache = l;
    try {
      l.length <= 800 && localStorage.setItem(Sa, JSON.stringify(l));
    } catch {
    }
  }
  async resetToFactoryDefaults() {
    const l = na();
    this.memoryCache = l;
    try {
      localStorage.setItem(Sa, JSON.stringify(l));
    } catch {
    }
    return l;
  }
}
class pl {
  constructor() {
    Ee(this, "driverId", "vfs_memory");
    Ee(this, "driverName", "FileManGL Ephemeral RAM Disk VFS");
    Ee(this, "supportsRealtimeStream", !0);
    Ee(this, "nodes", na());
  }
  async initialize() {
    return this.nodes;
  }
  async getAllNodes() {
    return this.nodes;
  }
  async saveAllNodes(l) {
    this.nodes = l;
  }
  async resetToFactoryDefaults() {
    return this.nodes = na(), this.nodes;
  }
}
class hl {
  constructor(l, s, d) {
    Ee(this, "driverId", "rest_connector");
    Ee(this, "driverName", "Universal HTTP REST Connector (Laravel / Node.js)");
    Ee(this, "supportsRealtimeStream", !1);
    Ee(this, "fallbackVfs", new kr());
    Ee(this, "endpoint");
    Ee(this, "authToken");
    Ee(this, "onProtocolLog");
    this.endpoint = l, this.authToken = s, this.onProtocolLog = d;
  }
  async initialize() {
    var l;
    return (l = this.onProtocolLog) == null || l.call(this, "POST " + this.endpoint, {
      cmd: "open",
      init: 1,
      tree: 1,
      protocolVersion: "2.4"
    }), this.fallbackVfs.initialize();
  }
  async getAllNodes() {
    return this.fallbackVfs.getAllNodes();
  }
  async saveAllNodes(l) {
    var s;
    return (s = this.onProtocolLog) == null || s.call(this, "POST " + this.endpoint, {
      cmd: "sync_state",
      nodesCount: l.length,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }), this.fallbackVfs.saveAllNodes(l);
  }
  async resetToFactoryDefaults() {
    var l;
    return (l = this.onProtocolLog) == null || l.call(this, "POST " + this.endpoint, { cmd: "factory_reset" }), this.fallbackVfs.resetToFactoryDefaults();
  }
}
const dr = /* @__PURE__ */ new WeakMap(), cr = /* @__PURE__ */ new WeakMap();
class ne {
  static buildFolderSizeIndex(l) {
    let s = dr.get(l);
    if (s) return s;
    s = /* @__PURE__ */ new Map();
    const d = /* @__PURE__ */ new Map();
    for (let c = 0; c < l.length; c++) {
      const n = l[c];
      if (n.trashed) continue;
      let u = d.get(n.parentId);
      u || (u = [], d.set(n.parentId, u)), u.push(n);
    }
    const i = (c) => {
      if (s.has(c)) return s.get(c);
      const n = d.get(c) || [];
      let u = 0;
      for (let x = 0; x < n.length; x++) {
        const w = n[x];
        w.type === "folder" ? u += i(w.id) : u += w.size;
      }
      return s.set(c, u), u;
    };
    i(null);
    for (let c = 0; c < l.length; c++)
      l[c].type === "folder" && !s.has(l[c].id) && i(l[c].id);
    return dr.set(l, s), s;
  }
  /**
   * O(1) memoized recursive byte size of a folder.
   */
  static computeFolderSize(l, s) {
    return this.buildFolderSizeIndex(s).get(l) || 0;
  }
  /**
   * O(1) memoized total volume usage across all files on the disk.
   */
  static computeTotalVolumeUsed(l) {
    const s = cr.get(l);
    if (s !== void 0) return s;
    let d = 0;
    for (let i = 0; i < l.length; i++)
      l[i].type !== "folder" && (d += l[i].size);
    return cr.set(l, d), d;
  }
  static findEffectiveFolderQuota(l, s) {
    if (!l) return null;
    const d = de.getNodeMap(s);
    let i = d.get(l), c = 0;
    for (; i && c < 16; ) {
      if (c++, i.security.quota && i.security.quota.maxBytes !== null)
        return {
          folderNode: i,
          usedBytes: this.computeFolderSize(i.id, s)
        };
      i = i.parentId ? d.get(i.parentId) : void 0;
    }
    return null;
  }
  static validateWriteOperation(l, s, d, i, c) {
    var P;
    const n = this.computeTotalVolumeUsed(i), u = c.totalDiskQuotaBytes, x = s.toLowerCase().match(/(\.[a-z0-9]+)$/), w = x ? x[1] : "";
    if (w && c.globalBlockedExtensions.map((L) => L.toLowerCase()).includes(w))
      return {
        allowed: !1,
        reason: `Güvenlik Politikası: "${w}" uzantılı dosyalar global disk kuralları gereği engellenmiştir.`,
        volumeUsedBytes: n,
        volumeLimitBytes: u
      };
    if (d > c.defaultMaxUploadFileSizeBytes)
      return {
        allowed: !1,
        reason: `Dosya boyutu (${this.formatBytes(d)}), izin verilen maksimum tekil dosya sınırını (${this.formatBytes(
          c.defaultMaxUploadFileSizeBytes
        )}) aşıyor.`,
        volumeUsedBytes: n,
        volumeLimitBytes: u
      };
    if (n + d > u)
      return {
        allowed: !1,
        reason: `Disk Kotası Dolu! Toplam disk alanı (${this.formatBytes(u)}) bu işlem için yetersiz.`,
        volumeUsedBytes: n,
        volumeLimitBytes: u
      };
    if (l) {
      const T = de.getNodeMap(i).get(l), M = T == null ? void 0 : T.security.quota;
      if (M) {
        if (w && M.blockedExtensions.map((B) => B.toLowerCase()).includes(w))
          return {
            allowed: !1,
            reason: `"${T.name}" klasör politikası "${w}" uzantılı dosyalara izin vermiyor.`,
            volumeUsedBytes: n,
            volumeLimitBytes: u
          };
        if (M.allowedExtensions.length > 0 && (!w || !M.allowedExtensions.map((B) => B.toLowerCase()).includes(w)))
          return {
            allowed: !1,
            reason: `"${T.name}" klasörüne yalnızca şu uzantılar yüklenebilir: ${M.allowedExtensions.join(
              ", "
            )}`,
            volumeUsedBytes: n,
            volumeLimitBytes: u
          };
        if (M.maxFileSizeBytes && d > M.maxFileSizeBytes)
          return {
            allowed: !1,
            reason: `"${T.name}" klasörü için maksimum dosya boyutu sınırı (${this.formatBytes(
              M.maxFileSizeBytes
            )}) aşıldı.`,
            volumeUsedBytes: n,
            volumeLimitBytes: u
          };
      }
      const v = this.findEffectiveFolderQuota(l, i);
      if (v && ((P = v.folderNode.security.quota) != null && P.maxBytes)) {
        const B = v.folderNode.security.quota.maxBytes;
        if (v.usedBytes + d > B)
          return {
            allowed: !1,
            reason: `"${v.folderNode.name}" klasör kotası (${this.formatBytes(
              B
            )}) aşıldı! Mevcut kullanım: ${this.formatBytes(v.usedBytes)}.`,
            volumeUsedBytes: n,
            volumeLimitBytes: u,
            folderUsedBytes: v.usedBytes,
            folderLimitBytes: B
          };
      }
    }
    return {
      allowed: !0,
      volumeUsedBytes: n,
      volumeLimitBytes: u
    };
  }
  static getCategoryBreakdown(l, s) {
    const d = {
      image: { label: "Görsel & Dokular (WebGL)", color: "#ec4899" },
      video: { label: "Video & Medya Akışı", color: "#8b5cf6" },
      code: { label: "Kaynak Kod & Shader", color: "#3b82f6" },
      archive: { label: "Arşiv & Paketler (.zip/.tar)", color: "#f59e0b" },
      document: { label: "Doküman & Raporlar", color: "#10b981" },
      data: { label: "Veritabanı & JSON/SQL", color: "#06b6d4" },
      audio: { label: "Ses Dosyaları", color: "#eab308" },
      binary: { label: "Binary & Sistem", color: "#64748b" },
      folder: { label: "Klasör", color: "#94a3b8" }
    }, i = {};
    for (let c = 0; c < l.length; c++) {
      const n = l[c];
      n.type !== "folder" && (i[n.category] || (i[n.category] = { bytes: 0, count: 0 }), i[n.category].bytes += n.size, i[n.category].count += 1);
    }
    return Object.keys(d).filter((c) => {
      var n;
      return c !== "folder" && ((n = i[c]) == null ? void 0 : n.bytes) > 0;
    }).map((c) => ({
      category: c,
      label: d[c].label,
      color: d[c].color,
      bytes: i[c].bytes,
      count: i[c].count,
      percentage: Math.min(100, i[c].bytes / Math.max(1, s) * 100)
    })).sort((c, n) => n.bytes - c.bytes);
  }
  static formatBytes(l, s = 1) {
    if (l === 0) return "0 B";
    const d = 1024, i = s < 0 ? 0 : s, c = ["B", "KB", "MB", "GB", "TB"], n = Math.floor(Math.log(Math.max(1, l)) / Math.log(d));
    return `${parseFloat((l / Math.pow(d, n)).toFixed(i))} ${c[n]}`;
  }
}
const fl = (() => {
  const a = new Uint32Array(256);
  for (let l = 0; l < 256; l++) {
    let s = l;
    for (let d = 0; d < 8; d++)
      s = s & 1 ? 3988292384 ^ s >>> 1 : s >>> 1;
    a[l] = s >>> 0;
  }
  return a;
})();
function bl(a) {
  let l = 4294967295;
  for (let s = 0; s < a.length; s++)
    l = fl[(l ^ a[s]) & 255] ^ l >>> 8;
  return (l ^ 4294967295) >>> 0;
}
function xl(a) {
  const l = Math.max(1980, a.getFullYear()), s = a.getMonth() + 1, d = a.getDate(), i = a.getHours(), c = a.getMinutes(), n = Math.floor(a.getSeconds() / 2), u = (i & 31) << 11 | (c & 63) << 5 | n & 31, x = (l - 1980 & 127) << 9 | (s & 15) << 5 | d & 31;
  return { dosTime: u, dosDate: x };
}
function mr(a) {
  try {
    const l = a.indexOf(",");
    if (l === -1) return null;
    const s = a.slice(0, l), d = a.slice(l + 1);
    if (s.includes(";base64") && typeof atob == "function") {
      const i = atob(d), c = new Uint8Array(i.length);
      for (let n = 0; n < i.length; n++)
        c[n] = i.charCodeAt(n);
      return c;
    }
    return new TextEncoder().encode(decodeURIComponent(d));
  } catch {
    return null;
  }
}
async function yl(a) {
  const l = new TextEncoder();
  if (a.checksumSha256) {
    const s = await ht.getBinaryBlob(a.checksumSha256);
    if (s && typeof s.arrayBuffer == "function")
      try {
        const d = await s.arrayBuffer();
        return new Uint8Array(d);
      } catch {
      }
  }
  if (a.blobUrl && a.blobUrl.startsWith("data:")) {
    const s = mr(a.blobUrl);
    if (s) return s;
  }
  if (a.blobUrl && a.blobUrl.startsWith("blob:http") && typeof fetch == "function")
    try {
      const s = await fetch(a.blobUrl);
      if (s.ok) {
        const d = await s.arrayBuffer();
        if (d.byteLength > 0) return new Uint8Array(d);
      }
    } catch {
    }
  if (typeof a.content == "string" && a.content.length > 0)
    return l.encode(a.content);
  if (a.thumbnailUrl && a.thumbnailUrl.startsWith("data:")) {
    const s = mr(a.thumbnailUrl);
    if (s) return s;
  }
  return l.encode(
    JSON.stringify(
      {
        fileName: a.name,
        category: a.category,
        mimeType: a.mimeType,
        sizeBytes: a.size,
        checksumSha256: a.checksumSha256,
        owner: a.security.ownerName,
        posix: a.security.posix.octal,
        exportedBy: "FileManGL v1.0.4 Enterprise ZIP Engine",
        exportedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      null,
      2
    )
  );
}
class ur {
  /**
   * Recursively collects all selected nodes and their nested children in the VFS tree.
   */
  static async collectEntriesFromSelection(l, s, d) {
    const i = [], c = /* @__PURE__ */ new Set(), n = async (u, x) => {
      if (c.has(u.id) || u.trashed) return;
      c.add(u.id);
      const w = u.name.replace(/[\\:*?"<>|]/g, "_");
      if (u.type === "folder") {
        const P = x ? `${x}/${w}/` : `${w}/`;
        i.push({
          relativePath: P,
          isDirectory: !0,
          data: new Uint8Array(0),
          modifiedDate: new Date(u.updatedAt || Date.now()),
          sourceNode: u
        });
        const L = s.filter((T) => !T.trashed && T.parentId === u.id).sort((T, M) => T.name.localeCompare(M.name, "tr"));
        for (const T of L)
          await n(T, x ? `${x}/${w}` : w);
      } else {
        const P = x ? `${x}/${w}` : w, L = await yl(u);
        i.push({
          relativePath: P,
          isDirectory: !1,
          data: L,
          modifiedDate: new Date(u.updatedAt || Date.now()),
          sourceNode: u
        });
      }
    };
    for (let u = 0; u < l.length; u++) {
      const x = l[u];
      if (d) {
        const w = Math.round((u + 1) / Math.max(1, l.length) * 50);
        d(w, `"${x.name}" içeriği taranıyor...`);
      }
      await n(x, "");
    }
    return i;
  }
  /**
   * Builds a binary PKZIP archive from the selected FileNodes.
   */
  static async buildZipArchive(l, s, d, i) {
    const c = await this.collectEntriesFromSelection(
      l,
      s,
      i
    ), n = new TextEncoder(), u = [], x = [];
    let w = 0, P = 0, L = 0;
    for (let X = 0; X < c.length; X++) {
      const $ = c[X];
      if ($.isDirectory ? L++ : P++, i) {
        const me = 50 + Math.round((X + 1) / Math.max(1, c.length) * 45);
        i(me, `ZIP paketleniyor: ${$.relativePath}`);
      }
      const re = n.encode($.relativePath), se = $.data, he = $.isDirectory ? 0 : bl(se), { dosTime: be, dosDate: O } = xl($.modifiedDate), le = new Uint8Array(30 + re.length), ce = new DataView(le.buffer);
      ce.setUint32(0, 67324752, !0), ce.setUint16(4, 20, !0), ce.setUint16(6, 2048, !0), ce.setUint16(8, 0, !0), ce.setUint16(10, be, !0), ce.setUint16(12, O, !0), ce.setUint32(14, he, !0), ce.setUint32(18, se.length, !0), ce.setUint32(22, se.length, !0), ce.setUint16(26, re.length, !0), ce.setUint16(28, 0, !0), le.set(re, 30), u.push(le), se.length > 0 && u.push(se);
      const k = new Uint8Array(46 + re.length), D = new DataView(k.buffer);
      D.setUint32(0, 33639248, !0), D.setUint16(4, 20, !0), D.setUint16(6, 20, !0), D.setUint16(8, 2048, !0), D.setUint16(10, 0, !0), D.setUint16(12, be, !0), D.setUint16(14, O, !0), D.setUint32(16, he, !0), D.setUint32(20, se.length, !0), D.setUint32(24, se.length, !0), D.setUint16(28, re.length, !0), D.setUint16(30, 0, !0), D.setUint16(32, 0, !0), D.setUint16(34, 0, !0), D.setUint16(36, 0, !0), D.setUint32(38, $.isDirectory ? 16 : 0, !0), D.setUint32(42, w, !0), k.set(re, 46), x.push(k), w += le.length + se.length;
    }
    const T = x.reduce((X, $) => X + $.length, 0), M = n.encode("FileManGL v1.0.4 Enterprise ZIP Archive"), v = new Uint8Array(22 + M.length), B = new DataView(v.buffer);
    B.setUint32(0, 101010256, !0), B.setUint16(4, 0, !0), B.setUint16(6, 0, !0), B.setUint16(8, c.length, !0), B.setUint16(10, c.length, !0), B.setUint32(12, T, !0), B.setUint32(16, w, !0), B.setUint16(20, M.length, !0), v.set(M, 22);
    const F = w + T + v.length, z = new Uint8Array(F);
    let m = 0;
    for (const X of u)
      z.set(X, m), m += X.length;
    for (const X of x)
      z.set(X, m), m += X.length;
    z.set(v, m), i && i(100, "ZIP arşivi hazırlandı");
    const b = l.length === 1 ? `${l[0].name.replace(/\.[^/.]+$/, "")}.zip` : `FileManGL_Secim_${l.length}_Oge.zip`, E = d ? d.endsWith(".zip") ? d : `${d}.zip` : b;
    return {
      blob: new Blob([z.buffer], {
        type: "application/zip"
      }),
      uint8: z,
      fileName: E,
      entryCount: c.length,
      fileCount: P,
      folderCount: L,
      totalBytes: F
    };
  }
  /**
   * Triggers a direct browser download for a generated ZIP Blob.
   */
  static triggerBrowserDownload(l, s) {
    if (typeof document > "u") return;
    let d = "";
    try {
      typeof URL < "u" && typeof URL.createObjectURL == "function" ? d = URL.createObjectURL(l) : d = `blob:local/${encodeURIComponent(s)}`;
    } catch {
      d = `blob:local/${encodeURIComponent(s)}`;
    }
    const i = document.createElement("a");
    i.href = d, i.download = s, i.style.display = "none", document.body.appendChild(i), typeof navigator < "u" && typeof navigator.userAgent == "string" && navigator.userAgent.toLowerCase().includes("jsdom") || i.click(), document.body.removeChild(i);
  }
}
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gl = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Nr = (...a) => a.filter((l, s, d) => !!l && l.trim() !== "" && d.indexOf(l) === s).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var vl = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wl = wr(
  ({
    color: a = "currentColor",
    size: l = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: d,
    className: i = "",
    children: c,
    iconNode: n,
    ...u
  }, x) => Ta(
    "svg",
    {
      ref: x,
      ...vl,
      width: l,
      height: l,
      stroke: a,
      strokeWidth: d ? Number(s) * 24 / Number(l) : s,
      className: Nr("lucide", i),
      ...u
    },
    [
      ...n.map(([w, P]) => Ta(w, P)),
      ...Array.isArray(c) ? c : [c]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ae = (a, l) => {
  const s = wr(
    ({ className: d, ...i }, c) => Ta(wl, {
      ref: c,
      iconNode: l,
      className: Nr(`lucide-${gl(a)}`, d),
      ...i
    })
  );
  return s.displayName = `${a}`, s;
};
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ca = ae("ArrowUpDown", [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ra = ae("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ba = ae("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sr = ae("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cr = ae("CircleAlert", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ht = ae("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $a = ae("CircleX", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kl = ae("ClipboardPaste", [
  [
    "path",
    { d: "M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z", key: "1pp7kr" }
  ],
  [
    "path",
    {
      d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10",
      key: "2ik1ml"
    }
  ],
  ["path", { d: "m17 10 4 4-4 4", key: "vp2hj1" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dr = ae("CodeXml", [
  ["path", { d: "m18 16 4-4-4-4", key: "1inbqp" }],
  ["path", { d: "m6 8-4 4 4 4", key: "15zrgr" }],
  ["path", { d: "m14.5 4-5 16", key: "e7oirm" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nl = ae("Columns2", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 3v18", key: "108xh3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Oa = ae("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ga = ae("Cpu", [
  ["rect", { width: "16", height: "16", x: "4", y: "4", rx: "2", key: "14l7u7" }],
  ["rect", { width: "6", height: "6", x: "9", y: "9", rx: "1", key: "5aljv4" }],
  ["path", { d: "M15 2v2", key: "13l42r" }],
  ["path", { d: "M15 20v2", key: "15mkzm" }],
  ["path", { d: "M2 15h2", key: "1gxd5l" }],
  ["path", { d: "M2 9h2", key: "1bbxkp" }],
  ["path", { d: "M20 15h2", key: "19e6y8" }],
  ["path", { d: "M20 9h2", key: "19tzq7" }],
  ["path", { d: "M9 2v2", key: "165o2o" }],
  ["path", { d: "M9 20v2", key: "i2bqo8" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Lr = ae("Download", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mr = ae("Eye", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sl = ae("FileArchive", [
  ["path", { d: "M10 12v-1", key: "v7bkov" }],
  ["path", { d: "M10 18v-2", key: "1cjy8d" }],
  ["path", { d: "M10 7V6", key: "dljcrl" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M15.5 22H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v16a2 2 0 0 0 .274 1.01", key: "gkbcor" }
  ],
  ["circle", { cx: "10", cy: "20", r: "2", key: "1xzdoj" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cl = ae("FilePenLine", [
  [
    "path",
    {
      d: "m18 5-2.414-2.414A2 2 0 0 0 14.172 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2",
      key: "142zxg"
    }
  ],
  [
    "path",
    {
      d: "M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
      key: "2t3380"
    }
  ],
  ["path", { d: "M8 18h1", key: "13wk12" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dl = ae("FilePlus", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M9 15h6", key: "cctwl0" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ll = ae("FileText", [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ml = ae("Film", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M7 3v18", key: "bbkbws" }],
  ["path", { d: "M3 7.5h4", key: "zfgn84" }],
  ["path", { d: "M3 12h18", key: "1i2n21" }],
  ["path", { d: "M3 16.5h4", key: "1230mu" }],
  ["path", { d: "M17 3v18", key: "in4fa5" }],
  ["path", { d: "M17 7.5h4", key: "myr1c1" }],
  ["path", { d: "M17 16.5h4", key: "go4c1d" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pr = ae("FolderOpen", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = ae("FolderPlus", [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _l = ae("FolderTree", [
  [
    "path",
    {
      d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "hod4my"
    }
  ],
  [
    "path",
    {
      d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
      key: "w4yl2u"
    }
  ],
  ["path", { d: "M3 5a2 2 0 0 0 2 2h3", key: "f2jnh7" }],
  ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3", key: "k8epm1" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zr = ae("Globe", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ua = ae("HardDrive", [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Al = ae("Image", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ja = ae("Layers", [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tl = ae("LayoutGrid", [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pl = ae("List", [
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M3 18h.01", key: "1tta3j" }],
  ["path", { d: "M3 6h.01", key: "1rqtza" }],
  ["path", { d: "M8 12h13", key: "1za7za" }],
  ["path", { d: "M8 18h13", key: "1lx6n3" }],
  ["path", { d: "M8 6h13", key: "ik3vkj" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fl = ae("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _r = ae("LockOpen", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bt = ae("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Il = ae("Palette", [
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  [
    "path",
    {
      d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",
      key: "12rzf8"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const El = ae("PanelsTopLeft", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M9 21V9", key: "1oto5p" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rl = ae("PenLine", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bl = ae("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $l = ae("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ol = ae("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ar = ae("Save", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gl = ae("Scissors", [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ia = ae("Share2", [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tr = ae("ShieldAlert", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ul = ae("ShieldCheck", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pa = ae("Shield", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pr = ae("SlidersVertical", [
  ["line", { x1: "4", x2: "4", y1: "21", y2: "14", key: "1p332r" }],
  ["line", { x1: "4", x2: "4", y1: "10", y2: "3", key: "gb41h5" }],
  ["line", { x1: "12", x2: "12", y1: "21", y2: "12", key: "hf2csr" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "3", key: "1kfi7u" }],
  ["line", { x1: "20", x2: "20", y1: "21", y2: "16", key: "1lhrwl" }],
  ["line", { x1: "20", x2: "20", y1: "12", y2: "3", key: "16vvfq" }],
  ["line", { x1: "2", x2: "6", y1: "14", y2: "14", key: "1uebub" }],
  ["line", { x1: "10", x2: "14", y1: "8", y2: "8", key: "1yglbp" }],
  ["line", { x1: "18", x2: "22", y1: "16", y2: "16", key: "1jxqpz" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vt = ae("Sparkles", [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const jl = ae("Square", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ka = ae("Star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fr = ae("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ir = ae("Trash2", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kl = ae("TriangleAlert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hl = ae("Type", [
  ["polyline", { points: "4 7 4 4 20 4 20 7", key: "1nosan" }],
  ["line", { x1: "9", x2: "15", y1: "20", y2: "20", key: "swin9y" }],
  ["line", { x1: "12", x2: "12", y1: "4", y2: "20", key: "1tx1rr" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vl = ae("Users", [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = ae("Volume2", [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const It = ae("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Wl = ({
  queue: a,
  isMinimized: l,
  onToggleMinimize: s,
  onCloseTray: d,
  onClearCompleted: i,
  onCancelItem: c,
  onCancelAll: n,
  onLocateNode: u
}) => {
  if (a.length === 0) return null;
  const x = a.filter(
    (m) => m.status === "uploading" || m.status === "queued"
  ), w = a.filter((m) => m.status === "completed"), P = a.filter(
    (m) => m.status === "error" || m.status === "cancelled"
  ), L = x.length > 0, T = a.reduce((m, b) => m + Math.max(1, b.totalBytes), 0), M = a.reduce((m, b) => m + b.bytesTransferred, 0), v = a.length > 0 ? Math.min(
    100,
    Math.round(
      a.reduce((m, b) => m + b.percent, 0) / Math.max(1, a.length)
    )
  ) : 0, B = /* @__PURE__ */ new Map();
  for (const m of a)
    if (m.rootUploadedFolderName) {
      const b = B.get(m.rootUploadedFolderName) || {
        folderName: m.rootUploadedFolderName,
        folderId: m.rootUploadedFolderId,
        total: 0,
        completed: 0,
        percent: 0
      };
      b.total += 1, m.status === "completed" && (b.completed += 1), m.rootUploadedFolderId && (b.folderId = m.rootUploadedFolderId), b.percent += m.percent, B.set(m.rootUploadedFolderName, b);
    }
  const F = Array.from(B.values()).map((m) => ({
    ...m,
    percent: Math.round(m.percent / Math.max(1, m.total))
  })), z = (m) => {
    switch (m) {
      case "video":
        return { icon: "movie", color: "text-purple-400" };
      case "image":
        return { icon: "image", color: "text-pink-400" };
      case "audio":
        return { icon: "audio_file", color: "text-amber-400" };
      case "code":
        return { icon: "code", color: "text-emerald-400" };
      case "archive":
        return { icon: "folder_zip", color: "text-amber-400" };
      case "data":
        return { icon: "database", color: "text-cyan-400" };
      case "folder":
        return { icon: "folder", color: "text-amber-400" };
      default:
        return { icon: "description", color: "text-blue-400" };
    }
  };
  return /* @__PURE__ */ t(
    "div",
    {
      "data-testid": "upload-queue-tray",
      onClick: (m) => m.stopPropagation(),
      className: "fixed bottom-4 right-3 sm:right-6 left-3 sm:left-auto z-50 sm:w-[390px] rounded-2xl bg-[#0d1424]/95 border border-slate-700/90 shadow-2xl backdrop-blur-xl overflow-hidden select-none",
      children: [
        /* @__PURE__ */ t("div", { className: "px-3.5 py-2.5 bg-[#111a2e] border-b border-slate-800 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 min-w-0", children: [
            L ? /* @__PURE__ */ e(Fl, { className: "w-4 h-4 text-cyan-400 animate-spin shrink-0" }) : P.length > 0 && w.length === 0 ? /* @__PURE__ */ e(Cr, { className: "w-4 h-4 text-rose-400 shrink-0" }) : /* @__PURE__ */ e(Ht, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
            /* @__PURE__ */ t("div", { className: "min-w-0", children: [
              /* @__PURE__ */ e("div", { className: "text-xs font-bold text-white truncate", children: L ? `${x.length} öğe yükleniyor (%${v})` : `${w.length} yükleme tamamlandı` }),
              /* @__PURE__ */ t("div", { className: "text-[10px] font-mono text-slate-400 truncate", children: [
                ne.formatBytes(M),
                " /",
                " ",
                ne.formatBytes(T),
                " • Kuyruk: ",
                a.length,
                " dosya"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-1 shrink-0", children: [
            L && /* @__PURE__ */ e(
              "button",
              {
                onClick: n,
                className: "px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-[10px] font-semibold text-rose-300 transition",
                title: "Tüm Yüklemeleri İptal Et",
                children: "İptal"
              }
            ),
            !L && w.length > 0 && /* @__PURE__ */ e(
              "button",
              {
                onClick: i,
                className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-medium text-slate-300 transition",
                title: "Tamamlananları Temizle",
                children: "Temizle"
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: s,
                className: "w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition",
                title: l ? "Kuyruğu Genişlet" : "Kuyruğu Küçült",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: l ? "expand_less" : "expand_more" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: d,
                className: "w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition",
                title: "Yükleme Kuyruğunu Kapat",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "close" })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "w-full h-1.5 bg-slate-900 overflow-hidden", children: /* @__PURE__ */ e(
          "div",
          {
            className: `h-full transition-all duration-150 ${L ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" : "bg-emerald-500"}`,
            style: { width: `${v}%` }
          }
        ) }),
        !l && /* @__PURE__ */ t("div", { className: "max-h-72 overflow-y-auto divide-y divide-slate-800/70", children: [
          F.map((m) => /* @__PURE__ */ t(
            "div",
            {
              className: "px-3.5 py-2.5 bg-amber-500/10 flex items-center justify-between gap-2",
              children: [
                /* @__PURE__ */ t("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "material-symbols-outlined ms-filled text-amber-400 shrink-0",
                      style: { fontSize: "20px" },
                      children: "folder"
                    }
                  ),
                  /* @__PURE__ */ t("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ t("div", { className: "text-xs font-bold text-amber-200 truncate", children: [
                      m.folderName,
                      " (Klasör Yüklemesi)"
                    ] }),
                    /* @__PURE__ */ t("div", { className: "text-[10px] font-mono text-amber-300/80", children: [
                      m.completed,
                      "/",
                      m.total,
                      " dosya aktarıldı • %",
                      m.percent
                    ] })
                  ] })
                ] }),
                m.folderId && /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => u(m.folderId),
                    className: "px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-[10px] font-semibold flex items-center gap-1 shrink-0 transition",
                    title: "Yüklenen Klasörü Aç",
                    children: [
                      /* @__PURE__ */ e(pr, { className: "w-3 h-3" }),
                      /* @__PURE__ */ e("span", { children: "Klasörü Aç" })
                    ]
                  }
                )
              ]
            },
            m.folderName
          )),
          a.map((m) => {
            const b = z(m.category);
            return /* @__PURE__ */ t(
              "div",
              {
                className: "px-3.5 py-2.5 hover:bg-slate-900/60 transition space-y-1.5",
                children: [
                  /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: `material-symbols-outlined shrink-0 ${b.color}`,
                          style: { fontSize: "18px" },
                          children: b.icon
                        }
                      ),
                      /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: [
                        /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: "text-xs font-semibold text-slate-100 truncate",
                              title: m.relativePath,
                              children: m.fileName
                            }
                          ),
                          m.relativePath !== m.fileName && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 truncate max-w-[110px]",
                              title: m.relativePath,
                              children: m.relativePath
                            }
                          )
                        ] }),
                        /* @__PURE__ */ t("div", { className: "text-[10px] font-mono text-slate-400 flex items-center gap-1.5 truncate", children: [
                          /* @__PURE__ */ e("span", { children: m.stage }),
                          /* @__PURE__ */ e("span", { children: "•" }),
                          /* @__PURE__ */ t("span", { children: [
                            ne.formatBytes(m.bytesTransferred),
                            " /",
                            " ",
                            ne.formatBytes(m.totalBytes)
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                      /* @__PURE__ */ t(
                        "span",
                        {
                          "data-testid": `upload-percent-${m.fileName}`,
                          className: `text-[11px] font-mono font-bold ${m.status === "completed" ? "text-emerald-400" : m.status === "error" || m.status === "cancelled" ? "text-rose-400" : "text-cyan-400"}`,
                          children: [
                            "%",
                            m.percent
                          ]
                        }
                      ),
                      (m.status === "uploading" || m.status === "queued") && /* @__PURE__ */ e(
                        "button",
                        {
                          onClick: () => c(m.id),
                          className: "w-5 h-5 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 flex items-center justify-center transition",
                          title: "Bu Yüklemeyi İptal Et",
                          children: /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined",
                              style: { fontSize: "14px" },
                              children: "close"
                            }
                          )
                        }
                      ),
                      m.status === "completed" && /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ e(Ht, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
                        /* @__PURE__ */ e(
                          "button",
                          {
                            onClick: () => u(m.targetFolderId, m.createdNodeId),
                            className: "w-6 h-6 rounded hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition",
                            title: `Hedef Konumda Göster (${m.targetFolderLabel})`,
                            children: /* @__PURE__ */ e(pr, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] }),
                      (m.status === "error" || m.status === "cancelled") && /* @__PURE__ */ e($a, { className: "w-4 h-4 text-rose-400 shrink-0" })
                    ] })
                  ] }),
                  /* @__PURE__ */ e("div", { className: "w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800/80", children: /* @__PURE__ */ e(
                    "div",
                    {
                      className: `h-full transition-all duration-150 ${m.status === "completed" ? "bg-emerald-500" : m.status === "error" || m.status === "cancelled" ? "bg-rose-500" : "bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"}`,
                      style: { width: `${m.percent}%` }
                    }
                  ) })
                ]
              },
              m.id
            );
          })
        ] })
      ]
    }
  );
}, Yl = { code: "tr", label: "Türkçe", flag: "🇹🇷" }, Xl = { subtitle: "Kurumsal React Dosya Yöneticisi • Hibrit ACL/POSIX • VFS & Backend Connector", landing: "Ana Sayfa", liveDemo: "Canlı Demo", documentation: "Dokümantasyon", configurator: "Konfigüratör", startDemo: "Demo'yu Başlat", darkMode: "Dark Mode", lightMode: "Light Mode" }, ql = { badge: "WINDOWS 11 DENEYİMİ • WEBGL GPU VIEWPORT • NTFS ACL + POSIX İZİN MOTORU", titlePrefix: "Belirlediğiniz Disk Alanını Yöneten,", titleHighlight: "WebGL Hızlandırmalı & SOLID", titleSuffix: "React Dosya Yöneticisi.", description: "elFinder mimarisinin ötesine geçen FileManGL; Windows Explorer görünümleri, mouse seçim penceresi (marquee multi-select), kes/kopyala/yapıştır çakışma yönetimi, klasör ve dosya bazlı 9 katmanlı ACL + POSIX (0755) izin matrisi, klasör bazlı disk kotası, WebGL 60FPS Spatial sahnesi ve hem Zero-Backend VFS hem de Laravel / Node.js sunucu sürücüleriyle tam modüler olarak geliştirildi.", openDemoBtn: "Canlı Demo'yu Aç (/demo)", webglSceneBtn: "WebGL 60FPS Sahnesi", diskMapBtn: "3B Disk Haritası", docsBtn: "Dokümantasyon (/documentation)", card1Title: "25.000+ Dosya & WebGL2", card1Desc: "Virtualized DOM ve 60 FPS WebGL sahnesi ile on binlerce fake dosyayı sıfır gecikmeyle test edin.", card2Title: "NTFS ACL + POSIX + Kota", card2Desc: "Kullanıcı/Rol bazlı Allow & Explicit Deny, üst klasör mirası, kilit ve klasör bazlı MB kotası.", card3Title: "VFS + Laravel & Node.js", card3Desc: "Backend olmadan VFS ile çalışır; REST Connector ile Laravel ve Node.js disklerini yönetir.", card4Title: "%100 SOLID Konfigüratör", card4Desc: "Tüm araç çubukları, paneller, izin kuralları ve sürücüler tek bir config objesiyle set edilir.", livePreviewHint: "Canlı Önizleme: Tam ekran çalışma alanı için /demo sayfasına, teknik entegrasyon için /documentation sayfasına gidebilirsiniz.", comparisonTitle: "Mimari Karşılaştırma: elFinder vs. Standart React File Manager vs. FileManGL", comparisonSubtitle: "Neden FileManGL kurumsal disk yönetimi ve yüksek performanslı sahneler için daha kapsamlı bir mimari sunar?", inspectDocsBtn: "Mimari Dokümantasyonu İncele (/documentation)" }, Zl = { stressTest: "Stres Testi:", files25k: "+2.5K Dosya", files10k: "+10K Dosya", files250k: "+25K Dosya", clearFake: "Temizle", itemsUnit: "öğe", roleLabel: "Rol:", resetBtn: "Sıfırla", fullscreenEnter: "Tam Ekran Masaüstü Modu", fullscreenExit: "Tam Ekrandan Çık", newFolder: "Yeni Klasör", newFile: "Yeni Dosya", upload: "Yükle", cut: "Kes", copy: "Kopyala", paste: "Yapıştır", rename: "Adlandır", batchRename: "Toplu Adlandır", zipCompress: "ZIP Sıkıştır", permissionsAcl: "İzinler & Kota (ACL)", restore: "Geri Yükle", webglScene: "WebGL Sahne", webglDiskMap: "WebGL Disk Haritası", viewsGroup: "Windows Explorer Görünümleri", viewExtraLarge: "Çok Büyük Simgeler", viewLarge: "Büyük Simgeler (Large Icons)", viewMedium: "Orta Simgeler (Medium Icons)", viewSmall: "Küçük Simgeler (Small Icons)", viewList: "Liste (Compact List)", viewDetails: "Detaylar (Details Table)", viewTiles: "Döşemeler (Tiles)", viewContent: "İçerik (Content)", filterAll: "Tümü", filterFolder: "Klasör", filterImage: "Görsel", filterCode: "Kod", filterDoc: "Doküman", searchPlaceholder: "İsim, etiket, sahip veya 0755 ara...", quickAccess: "Hızlı Erişim (Quick Access)", rootVolume: "Ana Disk (Root)", starred: "Yıldızlılar", shared: "Paylaşılanlar", lockedVault: "Kilitli Öğeler (Vault)", recycleBin: "Geri Dönüşüm Kutusu", directoryTree: "Dizin Ağacı (Directory Tree)", diskQuota: "Disk Kotası", used: "dolu", total: "Top:", colName: "Ad (Name)", colModified: "Değiştirme Tarihi", colType: "Tür", colSize: "Boyut", colOwner: "Sahip (Owner)", colPosix: "İzin (POSIX)", fileFolder: "Dosya Klasörü", fileSuffix: "Dosyası", selectedBadge: "öğe seçildi", secondaryPane: "İkinci Panel (Hedef Dizin):", transferHere: "Seçilileri Buraya Aktar →", aclChmodBtn: "ACL / Chmod", lockBtn: "Kilitle", unlockBtn: "Kilidi Aç", effectivePerms: "Etkin İzinler", customFolderQuota: "Özel Klasör Kotası Aktif", auditTrail: "Canlı Güvenlik Denetim İzi", noAuditLogs: "Henüz işlem kaydı yok.", emptyInspector: "Detayları, SHA-256 özetini ve etkin ACL izin matrisini incelemek için bir dosya veya klasör seçin.", statusListed: "öğe listeleniyor", statusSelected: "öğe seçili", statusEngine: "Yetki Motoru:", statusActiveRole: "Aktif Rol:", statusFreeSpace: "Boş Alan:", ctxOpen: "Aç / Önizle", ctxShader: "WebGL Shader Stüdyosunda Aç", ctxExtract: "Arşivi Klasöre Çıkart (Extract)", ctxStarAdd: "Yıldızlılara Ekle", ctxStarRemove: "Yıldızı Kaldır", ctxShare: "Paylaşım Bağlantısı", ctxDelete: "Sil", ctxFolderPerm: "Bu Klasörün İzin & Kota Ayarları" }, Ql = { grid: "Grid", cluster: "Küme", galaxy: "Galaksi", addNodes: "+1,500 Düğüm", clear: "Temizle", treemapTitle: "WebGL 3D Cushion Disk Treemap", shaderActive: "GLSL Shader Aktif", totalUsage: "Toplam Kullanım:", full: "Dolu", nodes: "Düğüm", currentDirHierarchy: "Bu Dizin Hiyerarşisi", largestFiles: "En Büyük Dosyalar", diskShare: "Disk Payı:" }, Jl = { title: "Esnek Modüler Yapılandırma Motoru (Canlı Konfigüratör)", subtitle: "SOLID Dependency Inversion prensibiyle tüm özellikleri çalışma zamanında açıp kapatın veya hazır mimari profilleri yükleyin.", exportJsxBtn: "React JSX Konfigürasyonunu Al", quotaLabel: "Yönetilen Disk Alanı Kotası (MB)", driverLabel: "Aktif Dosya Sistemi Sürücüsü (IFileSystemDriver)", mountLabel: "Disk Mount Yolu (Mount Point)", blockedExtLabel: "Global Yasaklı Uzantılar", languageLabel: "Arayüz Dili (i18n Locale)" }, sa = {
  meta: Yl,
  nav: Xl,
  hero: ql,
  explorer: Zl,
  webgl: Ql,
  configurator: Jl
}, en = { code: "en", label: "English", flag: "🇬🇧" }, tn = { subtitle: "Enterprise React File Manager • Hybrid ACL/POSIX • VFS & Backend Connector", landing: "Landing", liveDemo: "Live Demo", documentation: "Documentation", configurator: "Configurator", startDemo: "Launch Demo", darkMode: "Dark Mode", lightMode: "Light Mode" }, an = { badge: "WINDOWS 11 EXPERIENCE • WEBGL GPU VIEWPORT • NTFS ACL + POSIX PERMISSION ENGINE", titlePrefix: "Manage Your Dedicated Disk Space with a", titleHighlight: "WebGL-Accelerated & SOLID", titleSuffix: "React File Manager.", description: "Surpassing traditional elFinder architectures, FileManGL combines Windows 11 Explorer views, marquee multi-selection, cut/copy/paste conflict resolution, a 9-layer folder & file ACL + POSIX (0755) permission engine, folder disk quotas, a 60FPS WebGL Spatial viewport, and plug-and-play Zero-Backend VFS + Laravel / Node.js drivers.", openDemoBtn: "Open Live Demo (/demo)", webglSceneBtn: "WebGL 60FPS Scene", diskMapBtn: "3D Disk Treemap", docsBtn: "Documentation (/documentation)", card1Title: "25,000+ Files & WebGL2", card1Desc: "Benchmark tens of thousands of synthetic files with zero lag using Virtualized DOM and 60 FPS WebGL.", card2Title: "NTFS ACL + POSIX + Quota", card2Desc: "Role/User Allow & Explicit Deny rules, parent inheritance, immutable locks, and per-folder MB quotas.", card3Title: "VFS + Laravel & Node.js", card3Desc: "Runs standalone in-browser via VFS or manages physical Laravel and Node.js server disks via REST Connector.", card4Title: "100% SOLID Configurator", card4Desc: "Configure every toolbar, panel, permission rule, locale, and storage driver through a single config contract.", livePreviewHint: "Live Preview: Visit /demo for the full-screen workspace or /documentation for backend integration guides.", comparisonTitle: "Architectural Comparison: elFinder vs. Standard React File Manager vs. FileManGL", comparisonSubtitle: "Why FileManGL delivers a superior architecture for enterprise disk governance and high-speed rendering:", inspectDocsBtn: "Explore Technical Docs (/documentation)" }, rn = { stressTest: "Stress Test:", files25k: "+2.5K Files", files10k: "+10K Files", files250k: "+25K Files", clearFake: "Clear", itemsUnit: "items", roleLabel: "Role:", resetBtn: "Reset", fullscreenEnter: "Fullscreen Desktop Mode", fullscreenExit: "Exit Fullscreen", newFolder: "New Folder", newFile: "New File", upload: "Upload", cut: "Cut", copy: "Copy", paste: "Paste", rename: "Rename", batchRename: "Batch Rename", zipCompress: "Compress ZIP", permissionsAcl: "Permissions & Quota (ACL)", restore: "Restore", webglScene: "WebGL Scene", webglDiskMap: "WebGL Disk Map", viewsGroup: "Windows Explorer Views", viewExtraLarge: "Extra Large Icons", viewLarge: "Large Icons", viewMedium: "Medium Icons", viewSmall: "Small Icons", viewList: "Compact List", viewDetails: "Details Table", viewTiles: "Tiles", viewContent: "Content", filterAll: "All", filterFolder: "Folders", filterImage: "Images", filterCode: "Code", filterDoc: "Documents", searchPlaceholder: "Search name, tag, owner or 0755...", quickAccess: "Quick Access", rootVolume: "Root Volume", starred: "Starred", shared: "Shared Links", lockedVault: "Locked Items (Vault)", recycleBin: "Recycle Bin", directoryTree: "Directory Tree", diskQuota: "Disk Quota", used: "used", total: "Max:", colName: "Name", colModified: "Date Modified", colType: "Type", colSize: "Size", colOwner: "Owner", colPosix: "Permission (POSIX)", fileFolder: "File Folder", fileSuffix: "File", selectedBadge: "items selected", secondaryPane: "Secondary Pane (Target Directory):", transferHere: "Transfer Selected Here →", aclChmodBtn: "ACL / Chmod", lockBtn: "Lock", unlockBtn: "Unlock", effectivePerms: "Effective Permissions", customFolderQuota: "Custom Folder Quota Active", auditTrail: "Live Security Audit Trail", noAuditLogs: "No audit entries recorded yet.", emptyInspector: "Select a file or folder to inspect metadata, SHA-256 hash, and effective ACL permissions.", statusListed: "items listed", statusSelected: "items selected", statusEngine: "Permission Engine:", statusActiveRole: "Active Role:", statusFreeSpace: "Free Space:", ctxOpen: "Open / Preview", ctxShader: "Open in WebGL Shader Studio", ctxExtract: "Extract Archive to Folder", ctxStarAdd: "Add to Starred", ctxStarRemove: "Remove Star", ctxShare: "Share Link", ctxDelete: "Delete", ctxFolderPerm: "Folder Permission & Quota Settings" }, ln = { grid: "Grid", cluster: "Cluster", galaxy: "Galaxy", addNodes: "+1,500 Nodes", clear: "Clear", treemapTitle: "WebGL 3D Cushion Disk Treemap", shaderActive: "GLSL Shader Active", totalUsage: "Total Usage:", full: "Full", nodes: "Nodes", currentDirHierarchy: "Current Directory Hierarchy", largestFiles: "Largest Files", diskShare: "Disk Share:" }, nn = { title: "Flexible Modular Configuration Engine (Live Configurator)", subtitle: "Toggle any capability at runtime via SOLID Dependency Inversion or load pre-built architectural presets.", exportJsxBtn: "Export React JSX Config", quotaLabel: "Managed Disk Quota Allocation (MB)", driverLabel: "Active FileSystem Driver (IFileSystemDriver)", mountLabel: "Disk Mount Point", blockedExtLabel: "Global Blocked Extensions", languageLabel: "Interface Language (i18n Locale)" }, Fa = {
  meta: en,
  nav: tn,
  hero: an,
  explorer: rn,
  webgl: ln,
  configurator: nn
}, sn = { code: "de", label: "Deutsch", flag: "🇩🇪" }, on = { subtitle: "Enterprise React Dateimanager • Hybrid ACL/POSIX • VFS & Backend-Connector", landing: "Startseite", liveDemo: "Live-Demo", documentation: "Dokumentation", configurator: "Konfigurator", startDemo: "Demo Starten", darkMode: "Dark Mode", lightMode: "Light Mode" }, dn = { badge: "WINDOWS 11 ERLEBNIS • WEBGL GPU VIEWPORT • NTFS ACL + POSIX BERECHTIGUNGSMOTOR", titlePrefix: "Verwalten Sie Ihren Festplattenbereich mit einem", titleHighlight: "WebGL-beschleunigten & SOLID", titleSuffix: "React Dateimanager.", description: "FileManGL übertrifft klassische elFinder-Systeme mit Windows 11 Explorer-Ansichten, Auswahlrechteck (Marquee Multi-Select), Konfliktlösung beim Kopieren/Einfügen, einer 9-stufigen ACL + POSIX (0755) Berechtigungsmatrix, Ordner-Speicherplatzkontingenten, einer 60FPS WebGL-Szene sowie VFS- und Laravel / Node.js-Treibern.", openDemoBtn: "Live-Demo Öffnen (/demo)", webglSceneBtn: "WebGL 60FPS Szene", diskMapBtn: "3D Speicher-Treemap", docsBtn: "Dokumentation (/documentation)", card1Title: "25.000+ Dateien & WebGL2", card1Desc: "Testen Sie zehntausende Dateien ohne Verzögerung dank Virtualized DOM und 60 FPS WebGL.", card2Title: "NTFS ACL + POSIX + Kontingent", card2Desc: "Rollen-/Benutzerbasierte Allow & Explicit Deny Regeln, Vererbung, Sperren und Ordner-Quoten.", card3Title: "VFS + Laravel & Node.js", card3Desc: "Läuft ohne Backend im Browser (VFS) oder verwaltet Laravel- und Node.js-Serverlaufwerke.", card4Title: "100% SOLID Konfigurator", card4Desc: "Steuern Sie alle Symbolleisten, Ansichten, Berechtigungen und Treiber über ein einziges Config-Objekt.", livePreviewHint: "Live-Vorschau: Öffnen Sie /demo für den Vollbild-Arbeitsbereich oder /documentation für die Backend-Integration.", comparisonTitle: "Architekturvergleich: elFinder vs. Standard React File Manager vs. FileManGL", comparisonSubtitle: "Warum FileManGL eine umfassendere Architektur für Enterprise-Speicherverwaltung bietet:", inspectDocsBtn: "Dokumentation Ansehen (/documentation)" }, cn = { stressTest: "Stresstest:", files25k: "+2.5K Dateien", files10k: "+10K Dateien", files250k: "+25K Dateien", clearFake: "Leeren", itemsUnit: "Elemente", roleLabel: "Rolle:", resetBtn: "Zurücksetzen", fullscreenEnter: "Vollbild-Desktopmodus", fullscreenExit: "Vollbild Beenden", newFolder: "Neuer Ordner", newFile: "Neue Datei", upload: "Hochladen", cut: "Ausschneiden", copy: "Kopieren", paste: "Einfügen", rename: "Umbenennen", batchRename: "Stapel-Umbenennung", zipCompress: "ZIP Komprimieren", permissionsAcl: "Rechte & Kontingent (ACL)", restore: "Wiederherstellen", webglScene: "WebGL Szene", webglDiskMap: "WebGL Speicherkarte", viewsGroup: "Windows Explorer Ansichten", viewExtraLarge: "Extra große Symbole", viewLarge: "Große Symbole", viewMedium: "Mittelgroße Symbole", viewSmall: "Kleine Symbole", viewList: "Kompakte Liste", viewDetails: "Details (Tabelle)", viewTiles: "Kacheln (Tiles)", viewContent: "Inhalt (Content)", filterAll: "Alle", filterFolder: "Ordner", filterImage: "Bilder", filterCode: "Code", filterDoc: "Dokumente", searchPlaceholder: "Name, Tag, Besitzer oder 0755 suchen...", quickAccess: "Schnellzugriff", rootVolume: "Hauptlaufwerk (Root)", starred: "Favoriten", shared: "Geteilte Links", lockedVault: "Gesperrte Elemente", recycleBin: "Papierkorb", directoryTree: "Verzeichnisbaum", diskQuota: "Speicherkontingent", used: "belegt", total: "Max:", colName: "Name", colModified: "Änderungsdatum", colType: "Typ", colSize: "Größe", colOwner: "Besitzer", colPosix: "Rechte (POSIX)", fileFolder: "Dateiordner", fileSuffix: "Datei", selectedBadge: "Elemente ausgewählt", secondaryPane: "Zweites Fenster (Zielordner):", transferHere: "Auswahl hierher übertragen →", aclChmodBtn: "ACL / Chmod", lockBtn: "Sperren", unlockBtn: "Entsperren", effectivePerms: "Effektive Rechte", customFolderQuota: "Ordner-Kontingent Aktiv", auditTrail: "Live-Sicherheitsprotokoll", noAuditLogs: "Noch keine Protokolleinträge vorhanden.", emptyInspector: "Wählen Sie eine Datei oder einen Ordner aus, um Details, SHA-256 und ACL-Berechtigungen zu prüfen.", statusListed: "Elemente gelistet", statusSelected: "Elemente ausgewählt", statusEngine: "Berechtigungsmotor:", statusActiveRole: "Aktive Rolle:", statusFreeSpace: "Freier Speicher:", ctxOpen: "Öffnen / Vorschau", ctxShader: "Im WebGL Shader Studio öffnen", ctxExtract: "Archiv in Ordner entpacken", ctxStarAdd: "Zu Favoriten hinzufügen", ctxStarRemove: "Favorit entfernen", ctxShare: "Link teilen", ctxDelete: "Löschen", ctxFolderPerm: "Ordnerrechte & Kontingent-Einstellungen" }, mn = { grid: "Raster", cluster: "Cluster", galaxy: "Galaxie", addNodes: "+1.500 Knoten", clear: "Leeren", treemapTitle: "WebGL 3D Cushion Speicher-Treemap", shaderActive: "GLSL Shader Aktiv", totalUsage: "Gesamtnutzung:", full: "Belegt", nodes: "Knoten", currentDirHierarchy: "Aktuelle Ordnerhierarchie", largestFiles: "Größte Dateien", diskShare: "Speicheranteil:" }, un = { title: "Flexibler Modularer Konfigurationsmotor (Live-Konfigurator)", subtitle: "Schalten Sie Funktionen zur Laufzeit über SOLID Dependency Inversion um oder laden Sie Architektur-Profile.", exportJsxBtn: "React JSX-Konfiguration Exportieren", quotaLabel: "Verwaltetes Speicherkontingent (MB)", driverLabel: "Aktiver Dateisystem-Treiber (IFileSystemDriver)", mountLabel: "Laufwerk-Mountpfad", blockedExtLabel: "Global Blockierte Dateiendungen", languageLabel: "Oberflächensprache (i18n Locale)" }, Ia = {
  meta: sn,
  nav: on,
  hero: dn,
  explorer: cn,
  webgl: mn,
  configurator: un
}, pn = { code: "ru", label: "Русский", flag: "🇷🇺" }, hn = { subtitle: "Корпоративный файловый менеджер React • Гибридный ACL/POSIX • VFS и серверный коннектор", landing: "Главная", liveDemo: "Демо", documentation: "Документация", configurator: "Конфигуратор", startDemo: "Открыть Демо", darkMode: "Тёмная тема", lightMode: "Светлая тема" }, fn = { badge: "ИНТЕРФЕЙС WINDOWS 11 • WEBGL GPU УСКОРЕНИЕ • ДВИЖОК ПРАВ NTFS ACL + POSIX", titlePrefix: "Управляйте выделенным дисковым пространством с", titleHighlight: "WebGL-ускоренным и SOLID", titleSuffix: "файловым менеджером React.", description: "Превосходя классические архитектуры elFinder, FileManGL объединяет представления Проводника Windows 11, множественное выделение рамкой (Marquee), разрешение конфликтов при копировании/перемещении, 9-уровневый движок прав папок и файлов ACL + POSIX (0755), дисковые квоты папок, 60 FPS WebGL-сцену и драйверы VFS + Laravel / Node.js.", openDemoBtn: "Открыть демо (/demo)", webglSceneBtn: "Сцена WebGL 60FPS", diskMapBtn: "3D Карта диска", docsBtn: "Документация (/documentation)", card1Title: "25 000+ файлов и WebGL2", card1Desc: "Тестируйте десятки тысяч файлов без задержек благодаря виртуализированному DOM и WebGL 60 FPS.", card2Title: "NTFS ACL + POSIX + Квоты", card2Desc: "Правила Allow и Explicit Deny для ролей/пользователей, наследование прав, блокировка и МБ-квоты папок.", card3Title: "VFS + Laravel и Node.js", card3Desc: "Работает автономно в браузере (VFS) или управляет физическими дисками серверов Laravel и Node.js.", card4Title: "100% SOLID Конфигуратор", card4Desc: "Настраивайте панели инструментов, права доступа, языки и драйверы хранения через единый контракт конфигурации.", livePreviewHint: "Интерактивное превью: перейдите на /demo для полноэкранного режима или /documentation для интеграции с сервером.", comparisonTitle: "Архитектурное сравнение: elFinder vs. Стандартный React FM vs. FileManGL", comparisonSubtitle: "Почему FileManGL обеспечивает превосходную архитектуру для управления корпоративными дисками и высокоскоростного рендеринга:", inspectDocsBtn: "Изучить документацию (/documentation)" }, bn = { stressTest: "Стресс-тест:", files25k: "+2.5K Файлов", files10k: "+10K Файлов", files250k: "+25K Файлов", clearFake: "Очистить", itemsUnit: "элементов", roleLabel: "Роль:", resetBtn: "Сброс", fullscreenEnter: "Полноэкранный режим", fullscreenExit: "Выйти из полного экрана", newFolder: "Новая папка", newFile: "Новый файл", upload: "Загрузить", cut: "Вырезать", copy: "Копировать", paste: "Вставить", rename: "Переименовать", batchRename: "Массовое переименование", zipCompress: "Сжать в ZIP", permissionsAcl: "Права и квоты (ACL)", restore: "Восстановить", webglScene: "WebGL Сцена", webglDiskMap: "WebGL Карта диска", viewsGroup: "Виды Проводника Windows", viewExtraLarge: "Огромные значки", viewLarge: "Крупные значки", viewMedium: "Обычные значки", viewSmall: "Мелкие значки", viewList: "Список", viewDetails: "Таблица (Подробно)", viewTiles: "Плитка", viewContent: "Содержимое", filterAll: "Все", filterFolder: "Папки", filterImage: "Изображения", filterCode: "Код", filterDoc: "Документы", searchPlaceholder: "Поиск по имени, тегу, владельцу или 0755...", quickAccess: "Быстрый доступ", rootVolume: "Основной диск (Root)", starred: "Избранное", shared: "Общие ссылки", lockedVault: "Заблокированные (Сейф)", recycleBin: "Корзина", directoryTree: "Дерево каталогов", diskQuota: "Квота диска", used: "исп.", total: "Макс:", colName: "Имя", colModified: "Дата изменения", colType: "Тип", colSize: "Размер", colOwner: "Владелец", colPosix: "Права (POSIX)", fileFolder: "Папка с файлами", fileSuffix: "Файл", selectedBadge: "выбрано", secondaryPane: "Вторая панель (Целевой каталог):", transferHere: "Перенести выбранное сюда →", aclChmodBtn: "ACL / Chmod", lockBtn: "Блок.", unlockBtn: "Разблок.", effectivePerms: "Действующие права", customFolderQuota: "Активна квота папки", auditTrail: "Журнал аудита безопасности", noAuditLogs: "Записей аудита пока нет.", emptyInspector: "Выберите файл или папку для просмотра метаданных, SHA-256 и действующих прав ACL.", statusListed: "элементов в списке", statusSelected: "выбрано", statusEngine: "Движок прав:", statusActiveRole: "Активная роль:", statusFreeSpace: "Свободно:", ctxOpen: "Открыть / Просмотр", ctxShader: "Открыть в WebGL Shader Studio", ctxExtract: "Извлечь архив в папку", ctxStarAdd: "Добавить в избранное", ctxStarRemove: "Убрать из избранного", ctxShare: "Поделиться ссылкой", ctxDelete: "Удалить", ctxFolderPerm: "Настройки прав и квот папки" }, xn = { grid: "Сетка", cluster: "Кластер", galaxy: "Галактика", addNodes: "+1 500 Узлов", clear: "Очистить", treemapTitle: "WebGL 3D Карта диска (Cushion Treemap)", shaderActive: "GLSL Шейдер активен", totalUsage: "Использовано:", full: "Занято", nodes: "Узлов", currentDirHierarchy: "Иерархия текущего каталога", largestFiles: "Самые большие файлы", diskShare: "Доля диска:" }, yn = { title: "Гибкий модульный конфигуратор (Live Configurator)", subtitle: "Переключайте любые функции в реальном времени через SOLID Dependency Inversion или загружайте готовые пресеты.", exportJsxBtn: "Экспорт JSX конфигурации", quotaLabel: "Выделенная квота диска (МБ)", driverLabel: "Активный драйвер ФС (IFileSystemDriver)", mountLabel: "Точка монтирования диска", blockedExtLabel: "Заблокированные расширения", languageLabel: "Язык интерфейса (i18n Locale)" }, Ea = {
  meta: pn,
  nav: hn,
  hero: fn,
  explorer: bn,
  webgl: xn,
  configurator: yn
}, Da = {
  tr: sa,
  en: Fa,
  de: Ia,
  ru: Ea
}, la = [
  { code: "tr", label: sa.meta.label, flag: sa.meta.flag },
  { code: "en", label: Fa.meta.label, flag: Fa.meta.flag },
  { code: "de", label: Ia.meta.label, flag: Ia.meta.flag },
  { code: "ru", label: Ea.meta.label, flag: Ea.meta.flag }
], Er = nl({
  locale: "tr",
  setLocale: () => {
  },
  dict: sa,
  t: (a, l) => l || a
}), ps = ({ locale: a, onLocaleChange: l, children: s }) => {
  const d = He(() => Da[a] || Da.tr, [a]), i = He(() => (n, u) => {
    const x = n.split(".");
    let w = d;
    for (const P of x)
      if (w && typeof w == "object" && P in w)
        w = w[P];
      else {
        let L = Da.tr;
        for (const T of x)
          L = L == null ? void 0 : L[T];
        return typeof L == "string" ? L : u || n;
      }
    return typeof w == "string" ? w : u || n;
  }, [d]), c = He(
    () => ({
      locale: a,
      setLocale: l,
      dict: d,
      t: i
    }),
    [a, l, d, i]
  );
  return /* @__PURE__ */ e(Er.Provider, { value: c, children: s });
}, oa = () => ll(Er);
async function ra(a) {
  const l = a.items;
  if (l && l.length > 0) {
    const s = [];
    for (let d = 0; d < l.length; d++) {
      const i = l[d];
      if (typeof i.webkitGetAsEntry == "function") {
        const c = i.webkitGetAsEntry();
        c && s.push(c);
      }
    }
    if (s.some((d) => d.isDirectory)) {
      const d = [], i = async (c, n) => {
        if (c.isFile)
          await new Promise((u) => {
            c.file(
              (x) => {
                const w = n ? `${n}/${x.name}` : x.name;
                try {
                  Object.defineProperty(x, "webkitRelativePath", {
                    value: w,
                    configurable: !0
                  });
                } catch {
                  x.relativePath = w;
                }
                d.push(x), u();
              },
              () => u()
            );
          });
        else if (c.isDirectory) {
          const u = c.createReader(), w = await (async () => {
            const L = [];
            let T = [];
            do
              T = await new Promise((M) => {
                u.readEntries(
                  (v) => M(v || []),
                  () => M([])
                );
              }), L.push(...T);
            while (T.length > 0);
            return L;
          })(), P = n ? `${n}/${c.name}` : c.name;
          for (const L of w)
            await i(L, P);
        }
      };
      for (const c of s)
        await i(c, "");
      if (d.length > 0) return d;
    }
  }
  return Array.from(a.files || []);
}
function Pt(a, l = "w-12 h-12") {
  var c, n, u, x, w, P;
  const s = l.includes("w-4") || l.includes("w-5") || l.includes("w-6");
  if (a.type === "folder")
    return /* @__PURE__ */ t("div", { className: `relative flex items-center justify-center ${l} shrink-0`, children: [
      /* @__PURE__ */ t("svg", { viewBox: "0 0 48 48", className: "w-full h-full drop-shadow-sm", children: [
        /* @__PURE__ */ t("defs", { children: [
          /* @__PURE__ */ t("linearGradient", { id: "win11FolderBack", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
            /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#f59e0b" }),
            /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#d97706" })
          ] }),
          /* @__PURE__ */ t("linearGradient", { id: "win11FolderFront", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
            /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#fbbf24" }),
            /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#f59e0b" })
          ] })
        ] }),
        /* @__PURE__ */ e(
          "path",
          {
            d: "M4 10C4 7.79086 5.79086 6 8 6H18.3431C19.404 6 20.4214 6.42143 21.1716 7.17157L24 10H40C42.2091 10 44 11.7909 44 14V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V10Z",
            fill: "url(#win11FolderBack)"
          }
        ),
        /* @__PURE__ */ e(
          "path",
          {
            d: "M4 16C4 14.3431 5.34315 13 7 13H41C42.6569 13 44 14.3431 44 16V38C44 40.2091 42.2091 42 40 42H8C5.79086 42 4 40.2091 4 38V16Z",
            fill: "url(#win11FolderFront)"
          }
        ),
        /* @__PURE__ */ e("path", { d: "M5 15H43", stroke: "#fde68a", strokeWidth: "1", strokeOpacity: "0.65" })
      ] }),
      a.security.locked && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-rose-600 text-white shadow", children: /* @__PURE__ */ e(bt, { className: "w-2.5 h-2.5" }) })
    ] });
  if (a.category === "archive" || a.type === "archive")
    return /* @__PURE__ */ t("div", { className: `relative flex items-center justify-center ${l} shrink-0`, children: [
      /* @__PURE__ */ t("svg", { viewBox: "0 0 48 48", className: "w-full h-full drop-shadow-sm", children: [
        /* @__PURE__ */ e(
          "path",
          {
            d: "M4 10C4 7.79 5.79 6 8 6H18.34L24 10H40C42.21 10 44 11.79 44 14V38C44 40.21 42.21 42 40 42H8C5.79 42 4 40.21 4 38V10Z",
            fill: "#d97706"
          }
        ),
        /* @__PURE__ */ e(
          "path",
          {
            d: "M4 16C4 14.34 5.34 13 7 13H41C42.66 13 44 14.34 44 16V38C44 40.21 42.21 42 40 42H8C5.79 42 4 40.21 4 38V16Z",
            fill: "#fbbf24"
          }
        ),
        /* @__PURE__ */ e("rect", { x: "21", y: "13", width: "6", height: "29", fill: "#78350f", fillOpacity: "0.35" }),
        /* @__PURE__ */ e(
          "line",
          {
            x1: "24",
            y1: "14",
            x2: "24",
            y2: "41",
            stroke: "#fef3c7",
            strokeWidth: "3",
            strokeDasharray: "2 2"
          }
        )
      ] }),
      a.security.locked && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-rose-600 text-white shadow", children: /* @__PURE__ */ e(bt, { className: "w-2.5 h-2.5" }) })
    ] });
  if (a.category === "image" || a.category === "video") {
    if (a.thumbnailUrl || a.blobUrl) {
      const v = a.durationSec && a.durationSec > 0 ? `${Math.floor(a.durationSec / 60)}:${Math.floor(a.durationSec % 60).toString().padStart(2, "0")}` : null;
      return /* @__PURE__ */ t(
        "div",
        {
          className: `relative flex items-center justify-center ${l} shrink-0 rounded-[5px] overflow-hidden border border-white/20 bg-slate-950 shadow-sm`,
          children: [
            a.thumbnailUrl || a.category === "image" ? /* @__PURE__ */ e(
              "img",
              {
                src: a.thumbnailUrl || a.blobUrl,
                alt: a.name,
                loading: "lazy",
                decoding: "async",
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ e(
              "video",
              {
                src: `${a.blobUrl}#t=0.1`,
                preload: "metadata",
                muted: !0,
                playsInline: !0,
                className: "w-full h-full object-cover pointer-events-none"
              }
            ),
            a.category === "image" && !s && a.thumbnailMeta && /* @__PURE__ */ e(
              "span",
              {
                style: { color: "#2FF58E" },
                className: "absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 border border-emerald-500/40 text-[7px] font-mono font-bold leading-tight pointer-events-none",
                children: a.thumbnailMeta.fromCache ? "CACHE" : "WEBP"
              }
            ),
            a.category === "video" && /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ e("span", { className: "absolute inset-0 flex items-center justify-center bg-black/25 pointer-events-none", children: /* @__PURE__ */ e("span", { className: "w-5 h-5 rounded-full bg-black/70 border border-white/50 flex items-center justify-center shadow", children: /* @__PURE__ */ e("svg", { viewBox: "0 0 16 16", className: "w-2.5 h-2.5 fill-white ml-0.5", children: /* @__PURE__ */ e("polygon", { points: "3,2 14,8 3,14" }) }) }) }),
              !s && v && /* @__PURE__ */ e(
                "span",
                {
                  style: { color: "#ffffff" },
                  className: "absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono font-bold leading-tight pointer-events-none",
                  children: v
                }
              )
            ] })
          ]
        }
      );
    }
    const L = ((n = (c = a.imageMeta) == null ? void 0 : c.palette) == null ? void 0 : n[0]) || "#2563eb", T = ((x = (u = a.imageMeta) == null ? void 0 : u.palette) == null ? void 0 : x[1]) || "#7c3aed", M = ((P = (w = a.imageMeta) == null ? void 0 : w.palette) == null ? void 0 : P[2]) || "#db2777";
    return /* @__PURE__ */ e("div", { className: `relative flex items-center justify-center ${l} shrink-0`, children: /* @__PURE__ */ t("svg", { viewBox: "0 0 48 48", className: "w-full h-full drop-shadow-sm", children: [
      /* @__PURE__ */ e(
        "rect",
        {
          x: "4",
          y: "8",
          width: "40",
          height: "32",
          rx: "4",
          fill: L,
          stroke: "#ffffff",
          strokeOpacity: "0.25",
          strokeWidth: "1.5"
        }
      ),
      /* @__PURE__ */ e("path", { d: "M4 30 L16 20 L26 29 L34 22 L44 31 L44 36 C44 38.2 42.2 40 40 40 L8 40 C5.8 40 4 38.2 4 36 Z", fill: T }),
      /* @__PURE__ */ e("circle", { cx: "33", cy: "16", r: "3.5", fill: M }),
      a.category === "video" && /* @__PURE__ */ e("polygon", { points: "20,18 20,30 31,24", fill: "#ffffff", fillOpacity: "0.9" })
    ] }) });
  }
  const d = (a.extension || ".file").replace(".", "").toUpperCase().slice(0, 4);
  let i = "#2563eb";
  return d === "PDF" ? i = "#dc2626" : d === "CSV" || d === "JSON" || d === "XLSX" ? i = "#15803d" : d === "PHP" || d === "GLSL" ? i = "#7c3aed" : (d === "EXE" || d === "MSI") && (i = "#0284c7"), /* @__PURE__ */ t("div", { className: `relative flex items-center justify-center ${l} shrink-0`, children: [
    /* @__PURE__ */ t("svg", { viewBox: "0 0 48 48", className: "w-full h-full drop-shadow-sm", children: [
      /* @__PURE__ */ e(
        "path",
        {
          d: "M10 4H30L38 12V40C38 42.2091 36.2091 44 34 44H10C7.79086 44 6 42.2091 6 40V8C6 5.79086 7.79086 4 10 4Z",
          fill: "#e2e8f0"
        }
      ),
      /* @__PURE__ */ e("path", { d: "M30 4L38 12H32C30.8954 12 30 11.1046 30 10V4Z", fill: "#94a3b8" }),
      /* @__PURE__ */ e("rect", { x: "12", y: "16", width: "18", height: "2.5", rx: "1", fill: "#94a3b8" }),
      /* @__PURE__ */ e("rect", { x: "12", y: "21", width: "20", height: "2.5", rx: "1", fill: "#94a3b8" }),
      /* @__PURE__ */ e("rect", { x: "12", y: "26", width: "14", height: "2.5", rx: "1", fill: "#94a3b8" }),
      !s && /* @__PURE__ */ t(Je, { children: [
        /* @__PURE__ */ e("rect", { x: "14", y: "31", width: "22", height: "9", rx: "2", fill: i }),
        /* @__PURE__ */ e(
          "text",
          {
            x: "25",
            y: "37.5",
            textAnchor: "middle",
            fill: "#ffffff",
            fontSize: "6.5",
            fontWeight: "bold",
            fontFamily: "Inter, Segoe UI, sans-serif",
            children: d
          }
        )
      ] })
    ] }),
    a.security.locked && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-rose-600 text-white shadow", children: /* @__PURE__ */ e(bt, { className: "w-2.5 h-2.5" }) })
  ] });
}
const gn = ({
  nodes: a,
  allNodes: l,
  viewMode: s,
  groupBy: d = "date",
  selectedIds: i,
  clipboard: c,
  renamingId: n,
  sortField: u,
  sortDirection: x,
  currentUser: w,
  config: P,
  onSelectNode: L,
  onSelectMany: T,
  onOpenNode: M,
  onContextMenuNode: v,
  onCommitRename: B,
  onCancelRename: F,
  onSortChange: z,
  onDropNodesIntoFolder: m,
  onExternalFilesDropped: b
}) => {
  const { dict: E } = oa(), Z = P.theme === "light", X = Ge(null), [$, re] = A(null), [se, he] = A(""), [be, O] = A(0), [le, ce] = A(/* @__PURE__ */ new Set()), [k, D] = A({
    width: 1e3,
    height: 620
  }), me = Ge(null), [q, g] = A(null);
  Ve(() => {
    if (n) {
      const N = a.find((G) => G.id === n);
      N && he(N.name);
    }
  }, [n, a]), Ve(() => {
    const N = X.current;
    if (!N) return;
    const G = new ResizeObserver((y) => {
      for (const ee of y)
        D({
          width: Math.max(320, Math.floor(ee.contentRect.width)),
          height: Math.max(240, Math.floor(ee.contentRect.height))
        });
    });
    return G.observe(N), () => G.disconnect();
  }, []);
  const ge = (N) => P.showFileExtensions || N.type === "folder" || !N.extension ? N.name : N.name.endsWith(N.extension) ? N.name.slice(0, -N.extension.length) : N.name;
  Ve(() => {
    const N = (y) => {
      const ee = me.current, _ = X.current;
      if (!ee || !_) return;
      const we = Math.hypot(
        y.clientX - ee.startClientX,
        y.clientY - ee.startClientY
      );
      if (!ee.isDragging && we > 4 && (ee.isDragging = !0), !ee.isDragging) return;
      const R = _.getBoundingClientRect();
      y.clientY > R.bottom - 28 ? _.scrollTop += 18 : y.clientY < R.top + 28 && (_.scrollTop -= 18), ee.currentX = Math.max(0, y.clientX - R.left + _.scrollLeft), ee.currentY = Math.max(0, y.clientY - R.top + _.scrollTop);
      const Se = Math.min(ee.startX, ee.currentX), Ne = Math.max(ee.startX, ee.currentX), Oe = Math.min(ee.startY, ee.currentY), lt = Math.max(ee.startY, ee.currentY), fe = R.left + Se - _.scrollLeft, Ue = R.left + Ne - _.scrollLeft, We = R.top + Oe - _.scrollTop, xt = R.top + lt - _.scrollTop, et = new Set(ee.additive ? ee.initialSelected : []);
      _.querySelectorAll("[data-node-id]").forEach((yt) => {
        const Et = yt.getAttribute("data-node-id");
        if (!Et) return;
        const Dt = yt.getBoundingClientRect();
        Dt.left <= Ue && Dt.right >= fe && Dt.top <= xt && Dt.bottom >= We && et.add(Et);
      });
      const Ct = Array.from(et);
      T(Ct), g({
        left: Se,
        top: Oe,
        width: Math.max(2, Ne - Se),
        height: Math.max(2, lt - Oe),
        count: Ct.length
      });
    }, G = () => {
      const y = me.current;
      y && (y.isDragging || (y.clickedNodeId ? L(y.clickedNodeId, y.additive, y.shiftKey) : y.additive || T([])), me.current = null, g(null));
    };
    return window.addEventListener("mousemove", N), window.addEventListener("mouseup", G), () => {
      window.removeEventListener("mousemove", N), window.removeEventListener("mouseup", G);
    };
  }, [T, L]);
  const C = (N) => {
    if (N.button !== 0) return;
    const G = N.target;
    if (G.tagName.toLowerCase() === "input" || G.closest("thead") || G.closest("button"))
      return;
    const y = X.current;
    if (!y) return;
    const ee = G.closest("[data-node-id]"), _ = ee ? ee.getAttribute("data-node-id") : null;
    if (_)
      return;
    if (!P.enableRubberBandSelection) {
      T([]);
      return;
    }
    const we = y.getBoundingClientRect(), R = N.clientX - we.left + y.scrollLeft, Se = N.clientY - we.top + y.scrollTop;
    me.current = {
      startX: R,
      startY: Se,
      currentX: R,
      currentY: Se,
      startClientX: N.clientX,
      startClientY: N.clientY,
      isDragging: !1,
      additive: N.ctrlKey || N.metaKey,
      initialSelected: new Set(i),
      clickedNodeId: _,
      shiftKey: N.shiftKey
    };
  }, H = (N, G = "text-xs") => n === N.id ? /* @__PURE__ */ e(
    "input",
    {
      type: "text",
      autoFocus: !0,
      value: se,
      onClick: (y) => y.stopPropagation(),
      onChange: (y) => he(y.target.value),
      onKeyDown: (y) => {
        y.key === "Enter" && B(N.id, se), y.key === "Escape" && F();
      },
      onBlur: () => B(N.id, se),
      className: `w-full border border-blue-500 rounded px-1.5 py-0.5 text-xs focus:outline-none ${Z ? "bg-white text-slate-900" : "bg-[#1f1f1f] text-white"}`
    }
  ) : /* @__PURE__ */ e(
    "span",
    {
      title: N.name,
      className: `${G} w-full block font-normal leading-[1.35] pb-0.5 line-clamp-2 break-words [overflow-wrap:anywhere] ${Z ? "text-slate-800" : "text-[#f3f3f3]"}`,
      children: ge(N)
    }
  ), K = () => q ? /* @__PURE__ */ e(
    "div",
    {
      style: {
        left: q.left,
        top: q.top,
        width: q.width,
        height: q.height
      },
      className: "absolute border border-[#0078d4] bg-[#0078d4]/25 pointer-events-none z-40",
      children: q.count > 0 && /* @__PURE__ */ t(
        "span",
        {
          style: { color: "#ffffff" },
          className: "absolute -top-6 left-0 px-2 py-0.5 rounded bg-[#0078d4] text-[10px] font-mono font-bold shadow whitespace-nowrap",
          children: [
            q.count,
            " ",
            E.explorer.selectedBadge
          ]
        }
      )
    }
  ) : null, V = (() => {
    if (typeof P.fontScale == "number" && P.fontScale > 0)
      return P.fontScale / 100;
    if (typeof document < "u") {
      const N = getComputedStyle(document.documentElement).getPropertyValue("--uxu-font-scale").trim(), G = parseFloat(N);
      if (!Number.isNaN(G) && G > 0) return G;
    }
    return 1;
  })();
  if (s === "details") {
    const N = Math.round(38 * V), G = Math.max(0, Math.floor(be / N) - 10), y = Math.min(
      a.length,
      Math.ceil((be + k.height) / N) + 10
    ), ee = a.slice(G, y), _ = G * N, we = Math.max(0, (a.length - y) * N);
    return /* @__PURE__ */ t(
      "div",
      {
        ref: X,
        onScroll: (R) => O(R.currentTarget.scrollTop),
        onMouseDown: C,
        onDragOver: (R) => {
          var Se, Ne;
          (Ne = (Se = R.dataTransfer) == null ? void 0 : Se.types) != null && Ne.includes("Files") && (R.preventDefault(), R.dataTransfer.dropEffect = "copy");
        },
        onDrop: async (R) => {
          var Se;
          if ((Se = R.dataTransfer) != null && Se.files && R.dataTransfer.files.length > 0 && b) {
            R.preventDefault();
            const Ne = await ra(R.dataTransfer);
            b(Ne);
          }
        },
        onContextMenu: (R) => {
          R.target.closest("[data-node-id]") || (R.preventDefault(), v(R, void 0));
        },
        className: "relative w-full h-full overflow-auto select-none",
        children: [
          /* @__PURE__ */ t("table", { className: "w-full min-w-[600px] text-left border-collapse text-xs", children: [
            /* @__PURE__ */ e(
              "thead",
              {
                className: `sticky top-0 z-10 border-b font-normal ${Z ? "bg-slate-100/95 border-slate-200 text-slate-600" : "bg-[#191919] border-white/10 text-neutral-400"}`,
                children: /* @__PURE__ */ t("tr", { children: [
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => z("name"),
                      className: "py-2 px-4 cursor-pointer hover:text-white",
                      children: /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ e("span", { children: E.explorer.colName }),
                        u === "name" && /* @__PURE__ */ e(Ca, { className: "w-3 h-3 text-blue-400" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => z("updatedAt"),
                      className: "py-2 px-3 cursor-pointer hover:text-white",
                      children: /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ e("span", { children: E.explorer.colModified }),
                        u === "updatedAt" && /* @__PURE__ */ e(Ca, { className: "w-3 h-3 text-blue-400" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => z("type"),
                      className: "py-2 px-3 cursor-pointer hover:text-white",
                      children: E.explorer.colType
                    }
                  ),
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => z("size"),
                      className: "py-2 px-3 cursor-pointer hover:text-white text-right",
                      children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-1.5", children: [
                        /* @__PURE__ */ e("span", { children: E.explorer.colSize }),
                        u === "size" && /* @__PURE__ */ e(Ca, { className: "w-3 h-3 text-blue-400" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ e("th", { className: "py-2 px-3", children: E.explorer.colOwner }),
                  P.showPosixBadgesOnItems && /* @__PURE__ */ e("th", { className: "py-2 px-3", children: E.explorer.colPosix })
                ] })
              }
            ),
            /* @__PURE__ */ t("tbody", { className: "border-0", children: [
              _ > 0 && /* @__PURE__ */ e("tr", { style: { height: `${_}px` }, children: /* @__PURE__ */ e("td", { colSpan: 6 }) }),
              ee.map((R) => {
                const Se = i.has(R.id), Ne = c.mode === "cut" && c.nodeIds.includes(R.id), Oe = de.evaluateNodePermissions(
                  R,
                  w,
                  l,
                  P
                ), lt = R.type === "folder" ? ne.computeFolderSize(R.id, l) : R.size;
                return /* @__PURE__ */ t(
                  "tr",
                  {
                    "data-node-id": R.id,
                    style: { height: `${N}px` },
                    draggable: P.enableDragAndDrop && n !== R.id,
                    onDragStart: (fe) => {
                      const Ue = Se ? Array.from(i) : [R.id];
                      Se || L(R.id, !1, !1), fe.dataTransfer.effectAllowed = "move";
                      const We = JSON.stringify(Ue);
                      fe.dataTransfer.setData("application/filemangl-nodes", We), fe.dataTransfer.setData("text/plain", We);
                    },
                    onDragOver: (fe) => {
                      R.type === "folder" && P.enableDragAndDrop && (fe.preventDefault(), fe.dataTransfer.dropEffect = "move", re(R.id));
                    },
                    onDragLeave: () => re(null),
                    onDrop: (fe) => {
                      var Ue;
                      if (re(null), R.type === "folder" && P.enableDragAndDrop) {
                        if (fe.preventDefault(), fe.stopPropagation(), (Ue = fe.dataTransfer) != null && Ue.files && fe.dataTransfer.files.length > 0 && b) {
                          b(fe.dataTransfer.files, R.id);
                          return;
                        }
                        const We = fe.dataTransfer.getData("application/filemangl-nodes") || fe.dataTransfer.getData("text/plain");
                        if (We)
                          try {
                            m(R.id, JSON.parse(We));
                          } catch {
                          }
                      }
                    },
                    onClick: (fe) => {
                      var Ue, We;
                      if (fe.stopPropagation(), Se && i.size === 1 && typeof window < "u" && ((We = (Ue = window.matchMedia) == null ? void 0 : Ue.call(window, "(pointer: coarse)")) != null && We.matches)) {
                        M(R);
                        return;
                      }
                      L(R.id, fe.ctrlKey || fe.metaKey, fe.shiftKey);
                    },
                    onDoubleClick: (fe) => {
                      fe.stopPropagation(), M(R);
                    },
                    onContextMenu: (fe) => {
                      fe.preventDefault(), fe.stopPropagation(), v(fe, R);
                    },
                    className: `transition cursor-default ${Se ? Z ? "bg-blue-500/15 text-slate-900" : "bg-white/[0.12] text-white" : $ === R.id ? "bg-emerald-500/25 ring-1 ring-inset ring-emerald-400" : Z ? "hover:bg-slate-100" : "hover:bg-white/[0.05]"} ${Ne ? "opacity-25 saturate-[0.3] italic" : ""}`,
                    children: [
                      /* @__PURE__ */ e("td", { className: "py-1 px-4", children: /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ e("div", { "data-drag-handle": "true", className: "shrink-0", children: Pt(R, "w-5 h-5") }),
                        /* @__PURE__ */ e("div", { className: "min-w-0 flex-1", children: H(R) }),
                        R.starred && /* @__PURE__ */ e(Ka, { className: "w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" }),
                        R.shareLink && /* @__PURE__ */ e(ia, { className: "w-3.5 h-3.5 text-emerald-500 shrink-0" }),
                        !Oe.allowed.read && /* @__PURE__ */ e("span", { title: "EACCES", className: "inline-flex", children: /* @__PURE__ */ e(Tr, { className: "w-3.5 h-3.5 text-rose-500 shrink-0" }) })
                      ] }) }),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 text-[11px] whitespace-nowrap ${Z ? "text-slate-500" : "text-neutral-400"}`,
                          children: new Date(R.updatedAt).toLocaleString(P.locale, {
                            dateStyle: "short",
                            timeStyle: "short"
                          })
                        }
                      ),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 whitespace-nowrap ${Z ? "text-slate-500" : "text-neutral-400"}`,
                          children: R.type === "folder" ? E.explorer.fileFolder : `${R.extension.toUpperCase().replace(".", "")} ${E.explorer.fileSuffix}`
                        }
                      ),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 text-right whitespace-nowrap ${Z ? "text-slate-700" : "text-neutral-300"}`,
                          children: ne.formatBytes(lt)
                        }
                      ),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 truncate max-w-[140px] ${Z ? "text-slate-500" : "text-neutral-400"}`,
                          children: R.security.ownerName.split(" ")[0]
                        }
                      ),
                      P.showPosixBadgesOnItems && /* @__PURE__ */ e("td", { className: "py-1 px-3 whitespace-nowrap", children: /* @__PURE__ */ e(
                        "span",
                        {
                          className: `px-1.5 py-0.5 rounded font-mono text-[11px] border ${Z ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-neutral-900 border-neutral-700 text-blue-300"}`,
                          children: Oe.effectiveOctal
                        }
                      ) })
                    ]
                  },
                  R.id
                );
              }),
              we > 0 && /* @__PURE__ */ e("tr", { style: { height: `${we}px` }, children: /* @__PURE__ */ e("td", { colSpan: 6 }) })
            ] })
          ] }),
          K()
        ]
      }
    );
  }
  const xe = {
    extra_large_icons: {
      minColWidth: Math.round(156 * V),
      rowHeight: Math.round(170 * V),
      iconSize: "w-20 h-20",
      isHorizontal: !1
    },
    large_icons: {
      minColWidth: Math.round(128 * V),
      rowHeight: Math.round(142 * V),
      iconSize: "w-14 h-14",
      isHorizontal: !1
    },
    medium_icons: {
      minColWidth: Math.round(114 * V),
      rowHeight: Math.round(124 * V),
      iconSize: "w-10 h-10",
      isHorizontal: !1
    },
    small_icons: {
      minColWidth: Math.round(200 * V),
      rowHeight: Math.round(42 * V),
      iconSize: "w-5 h-5",
      isHorizontal: !0
    },
    list: {
      minColWidth: Math.round(230 * V),
      rowHeight: Math.round(38 * V),
      iconSize: "w-4 h-4",
      isHorizontal: !0
    },
    tiles: {
      minColWidth: Math.round(260 * V),
      rowHeight: Math.round(72 * V),
      iconSize: "w-11 h-11",
      isHorizontal: !0
    },
    content: {
      minColWidth: 9999,
      rowHeight: Math.round(68 * V),
      iconSize: "w-10 h-10",
      isHorizontal: !0
    }
  }, U = xe[s] || xe.large_icons, pe = (N) => {
    const G = i.has(N.id), y = c.mode === "cut" && c.nodeIds.includes(N.id), ee = N.type === "folder" ? ne.computeFolderSize(N.id, l) : N.size;
    return /* @__PURE__ */ t(
      "div",
      {
        "data-node-id": N.id,
        style: { minHeight: `${U.rowHeight - (U.isHorizontal ? 4 : 8)}px` },
        draggable: P.enableDragAndDrop && n !== N.id,
        onDragStart: (_) => {
          const we = G ? Array.from(i) : [N.id];
          G || L(N.id, !1, !1), _.dataTransfer.effectAllowed = "move";
          const R = JSON.stringify(we);
          _.dataTransfer.setData("application/filemangl-nodes", R), _.dataTransfer.setData("text/plain", R);
        },
        onDragOver: (_) => {
          N.type === "folder" && P.enableDragAndDrop && (_.preventDefault(), _.dataTransfer.dropEffect = "move", re(N.id));
        },
        onDragLeave: () => re(null),
        onDrop: async (_) => {
          var we;
          if (re(null), N.type === "folder" && P.enableDragAndDrop) {
            if (_.preventDefault(), _.stopPropagation(), (we = _.dataTransfer) != null && we.files && _.dataTransfer.files.length > 0 && b) {
              const Se = await ra(_.dataTransfer);
              b(Se, N.id);
              return;
            }
            const R = _.dataTransfer.getData("application/filemangl-nodes") || _.dataTransfer.getData("text/plain");
            if (R)
              try {
                m(N.id, JSON.parse(R));
              } catch {
              }
          }
        },
        onClick: (_) => {
          var we, R;
          if (_.stopPropagation(), G && i.size === 1 && typeof window < "u" && ((R = (we = window.matchMedia) == null ? void 0 : we.call(window, "(pointer: coarse)")) != null && R.matches)) {
            M(N);
            return;
          }
          L(N.id, _.ctrlKey || _.metaKey, _.shiftKey);
        },
        onDoubleClick: (_) => {
          _.stopPropagation(), M(N);
        },
        onContextMenu: (_) => {
          _.preventDefault(), _.stopPropagation(), v(_, N);
        },
        className: `group relative rounded-[6px] border-0 transition-all duration-75 overflow-hidden ${U.isHorizontal ? "px-2.5 py-1.5 flex items-center gap-3" : "px-2 py-2 flex flex-col items-center text-center justify-start"} ${$ === N.id ? "bg-emerald-500/25 ring-2 ring-inset ring-emerald-400" : G && !y ? Z ? "bg-[#cce8ff]/75" : "bg-white/[0.12]" : Z ? "bg-transparent hover:bg-slate-200/60" : "bg-transparent hover:bg-white/[0.06]"} ${y ? "opacity-25 saturate-[0.3] scale-[0.97] outline-1 outline-dashed outline-amber-400/50" : ""}`,
        children: [
          y && /* @__PURE__ */ e(
            "span",
            {
              className: "material-symbols-outlined text-amber-400 absolute top-1 left-1 pointer-events-none",
              style: { fontSize: "13px" },
              children: "content_cut"
            }
          ),
          /* @__PURE__ */ e(
            "div",
            {
              "data-drag-handle": "true",
              className: U.isHorizontal ? "shrink-0" : "mb-1.5 shrink-0",
              children: Pt(N, U.iconSize)
            }
          ),
          /* @__PURE__ */ t("div", { className: U.isHorizontal ? "min-w-0 flex-1" : "w-full shrink-0", children: [
            H(N, "text-xs"),
            (s === "tiles" || s === "content") && /* @__PURE__ */ t(
              "div",
              {
                className: `text-[11px] mt-0.5 truncate ${Z ? "text-slate-500" : "text-neutral-400"}`,
                children: [
                  N.type === "folder" ? E.explorer.fileFolder : `${N.extension.toUpperCase().replace(".", "")} ${E.explorer.fileSuffix}`,
                  " ",
                  "• ",
                  ne.formatBytes(ee)
                ]
              }
            )
          ] })
        ]
      },
      N.id
    );
  };
  if (d !== "none" && a.length <= 400) {
    const N = [];
    if (d === "date") {
      const y = [], ee = [], _ = [], we = [], R = Date.now();
      a.forEach((Ne, Oe) => {
        const lt = new Date(Ne.updatedAt).getTime(), fe = !!Ne.isUserUploaded || !!Ne.blobUrl || !Number.isNaN(lt) && R - lt < 20 * 3600 * 1e3, Ue = Oe % 10;
        Ne.type === "folder" || fe || Ue < 3 ? y.push(Ne) : Ue < 5 ? ee.push(Ne) : Ue < 8 ? _.push(Ne) : we.push(Ne);
      }), y.sort((Ne, Oe) => Ne.type === "folder" && Oe.type !== "folder" ? -1 : Ne.type !== "folder" && Oe.type === "folder" ? 1 : Ne.isUserUploaded && !Oe.isUserUploaded ? -1 : !Ne.isUserUploaded && Oe.isUserUploaded ? 1 : 0);
      const Se = P.locale === "en" ? ["Today", "Yesterday", "Last week", "Earlier this month"] : P.locale === "de" ? ["Heute", "Gestern", "Letzte Woche", "Früher in diesem Monat"] : P.locale === "ru" ? ["Сегодня", "Вчера", "На прошлой неделе", "Ранее в этом месяце"] : ["Bugün", "Dün", "Geçen hafta", "Bu ayın başlarında"];
      y.length && N.push({ id: "g_today", title: Se[0], items: y }), ee.length && N.push({ id: "g_yesterday", title: Se[1], items: ee }), _.length && N.push({ id: "g_week", title: Se[2], items: _ }), we.length && N.push({ id: "g_older", title: Se[3], items: we });
    } else {
      const y = a.filter((_) => _.type === "folder"), ee = a.filter((_) => _.type !== "folder");
      y.length && N.push({ id: "g_folders", title: E.explorer.filterFolder, items: y }), ee.length && N.push({ id: "g_files", title: E.explorer.filterDoc, items: ee });
    }
    const G = s === "content" ? 1 : Math.max(1, Math.floor((k.width - 36) / U.minColWidth));
    return /* @__PURE__ */ t(
      "div",
      {
        ref: X,
        onScroll: (y) => O(y.currentTarget.scrollTop),
        onMouseDown: C,
        onDragOver: (y) => {
          var ee, _;
          (_ = (ee = y.dataTransfer) == null ? void 0 : ee.types) != null && _.includes("Files") && (y.preventDefault(), y.dataTransfer.dropEffect = "copy");
        },
        onDrop: async (y) => {
          var ee;
          if ((ee = y.dataTransfer) != null && ee.files && y.dataTransfer.files.length > 0 && b) {
            y.preventDefault();
            const _ = await ra(y.dataTransfer);
            b(_);
          }
        },
        onContextMenu: (y) => {
          y.target.closest("[data-node-id]") || (y.preventDefault(), v(y, void 0));
        },
        className: "relative w-full h-full overflow-auto select-none px-4 py-3 space-y-5",
        children: [
          N.map((y) => {
            const ee = le.has(y.id);
            return /* @__PURE__ */ t("div", { className: "space-y-2", children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => ce((_) => {
                    const we = new Set(_);
                    return we.has(y.id) ? we.delete(y.id) : we.add(y.id), we;
                  }),
                  className: `flex items-center gap-1.5 text-xs font-medium transition ${Z ? "text-slate-700 hover:text-slate-950" : "text-neutral-300 hover:text-white"}`,
                  children: [
                    ee ? /* @__PURE__ */ e(Sr, { className: "w-3.5 h-3.5 opacity-75" }) : /* @__PURE__ */ e(Ba, { className: "w-3.5 h-3.5 opacity-75" }),
                    /* @__PURE__ */ e("span", { children: y.title })
                  ]
                }
              ),
              !ee && /* @__PURE__ */ e(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: `repeat(${G}, minmax(0, 1fr))`,
                    gap: U.isHorizontal ? "4px" : "8px"
                  },
                  children: y.items.map((_) => pe(_))
                }
              )
            ] }, y.id);
          }),
          K()
        ]
      }
    );
  }
  const ke = s === "content" ? 1 : Math.max(1, Math.floor((k.width - 36) / U.minColWidth)), De = Math.ceil(a.length / ke), Pe = Math.max(0, Math.floor(be / U.rowHeight) - 3), Q = Math.min(
    De,
    Math.ceil((be + k.height) / U.rowHeight) + 4
  ), ie = Pe * ke, Be = Math.min(a.length, Q * ke), $e = a.slice(ie, Be), Me = Math.max(k.height - 20, De * U.rowHeight + 24), _e = Pe * U.rowHeight;
  return /* @__PURE__ */ t(
    "div",
    {
      ref: X,
      onScroll: (N) => O(N.currentTarget.scrollTop),
      onMouseDown: C,
      onDragOver: (N) => {
        var G, y;
        (y = (G = N.dataTransfer) == null ? void 0 : G.types) != null && y.includes("Files") && (N.preventDefault(), N.dataTransfer.dropEffect = "copy");
      },
      onDrop: async (N) => {
        var G;
        if ((G = N.dataTransfer) != null && G.files && N.dataTransfer.files.length > 0 && b) {
          N.preventDefault();
          const y = await ra(N.dataTransfer);
          b(y);
        }
      },
      onContextMenu: (N) => {
        N.target.closest("[data-node-id]") || (N.preventDefault(), v(N, void 0));
      },
      className: "relative w-full h-full overflow-auto select-none p-4",
      children: [
        /* @__PURE__ */ e("div", { style: { height: `${Me}px`, position: "relative" }, children: /* @__PURE__ */ e(
          "div",
          {
            style: {
              transform: `translate3d(0, ${_e}px, 0)`,
              display: "grid",
              gridTemplateColumns: `repeat(${ke}, minmax(0, 1fr))`,
              gap: U.isHorizontal ? "4px" : "8px"
            },
            children: $e.map((N) => pe(N))
          }
        ) }),
        K()
      ]
    }
  );
}, vn = `
  attribute vec2 a_position;
  attribute vec4 a_color;
  uniform vec2 u_resolution;
  varying vec4 v_color;

  void main() {
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
    gl_Position = vec4(clipSpace * vec2(1.0, -1.0), 0.0, 1.0);
    v_color = a_color;
  }
`, wn = `
  precision mediump float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;
function fr(a, l, s) {
  const d = a.createShader(l);
  return d ? (a.shaderSource(d, s), a.compileShader(d), a.getShaderParameter(d, a.COMPILE_STATUS) ? d : (a.deleteShader(d), null)) : null;
}
function kn(a, l, s) {
  const d = fr(a, a.VERTEX_SHADER, l), i = fr(a, a.FRAGMENT_SHADER, s);
  if (!d || !i) return null;
  const c = a.createProgram();
  return !c || (a.attachShader(c, d), a.attachShader(c, i), a.linkProgram(c), !a.getProgramParameter(c, a.LINK_STATUS)) ? null : c;
}
const Nn = ({
  nodes: a,
  allNodes: l,
  selectedIds: s,
  clipboard: d,
  config: i,
  onSelectNode: c,
  onSelectMany: n,
  onOpenNode: u,
  onContextMenuNode: x,
  onDropNodesIntoFolder: w,
  onInjectStressNodes: P,
  onClearStressNodes: L
}) => {
  const { dict: T } = oa(), M = i.theme === "light", v = Ge(null), B = Ge(null), [F, z] = A("large_icons"), [m, b] = A(null), [E, Z] = A(null), [X, $] = A(60), [re, se] = A(0), he = Ge(null), [be, O] = A(null), [le, ce] = A({
    width: 1e3,
    height: 600
  });
  Ve(() => {
    const C = B.current;
    if (!C) return;
    const H = new ResizeObserver((K) => {
      for (const V of K)
        ce({
          width: Math.max(320, Math.floor(V.contentRect.width)),
          height: Math.max(300, Math.floor(V.contentRect.height))
        });
    });
    return H.observe(C), () => H.disconnect();
  }, []);
  const { cardRects: k, groupHeaders: D, totalContentHeight: me } = Aa.useMemo(() => {
    const K = F === "tiles", V = K ? 256 : 144, xe = K ? 68 : 124, U = 12, pe = K ? 10 : 12, ke = Math.max(280, le.width - 36), De = Math.max(1, Math.floor((ke + U) / (V + U))), Pe = K ? Math.min(320, Math.floor((ke - (De - 1) * U) / De)) : V, Q = [], ie = [];
    if (F === "grouped") {
      const Me = [
        { cat: "folder", label: T.explorer.filterFolder },
        { cat: "image", label: T.explorer.filterImage },
        { cat: "code", label: T.explorer.filterCode },
        { cat: "document", label: T.explorer.filterDoc },
        { cat: "archive", label: "ZIP / Archive" },
        { cat: "data", label: "JSON / Data" },
        { cat: "video", label: "Video" },
        { cat: "audio", label: "Audio" },
        { cat: "binary", label: "Binary" }
      ];
      let _e = 16;
      for (const N of Me) {
        const G = a.filter((ee) => ee.category === N.cat);
        if (G.length === 0) continue;
        ie.push({
          category: N.cat,
          label: N.label,
          count: G.length,
          y: _e
        }), _e += 32, G.forEach((ee, _) => {
          const we = _ % De, R = Math.floor(_ / De);
          Q.push({
            node: ee,
            x: 18 + we * (Pe + U),
            y: _e + R * (xe + pe),
            w: Pe,
            h: xe
          });
        });
        const y = Math.ceil(G.length / De);
        _e += y * (xe + pe) + 14;
      }
      return {
        cardRects: Q,
        groupHeaders: ie,
        totalContentHeight: Math.max(le.height, _e + 24)
      };
    }
    a.forEach((Me, _e) => {
      const N = _e % De, G = Math.floor(_e / De);
      Q.push({
        node: Me,
        x: 18 + N * (Pe + U),
        y: 16 + G * (xe + pe),
        w: Pe,
        h: xe
      });
    });
    const $e = 32 + Math.ceil(a.length / De) * (xe + pe);
    return {
      cardRects: Q,
      groupHeaders: ie,
      totalContentHeight: Math.max(le.height, $e)
    };
  }, [a, F, le, T]);
  Ve(() => {
    const C = (K) => {
      const V = he.current, xe = B.current;
      if (!V || !xe) return;
      const U = Math.hypot(
        K.clientX - V.startClientX,
        K.clientY - V.startClientY
      );
      if (!V.isDragging && U > 4 && (V.isDragging = !0), !V.isDragging) return;
      const pe = xe.getBoundingClientRect();
      K.clientY > pe.bottom - 28 ? xe.scrollTop += 18 : K.clientY < pe.top + 28 && (xe.scrollTop -= 18), V.currentX = Math.max(0, K.clientX - pe.left + xe.scrollLeft), V.currentY = Math.max(0, K.clientY - pe.top + xe.scrollTop);
      const ke = Math.min(V.startX, V.currentX), De = Math.max(V.startX, V.currentX), Pe = Math.min(V.startY, V.currentY), Q = Math.max(V.startY, V.currentY), ie = new Set(V.additive ? V.initialSelected : []);
      for (const $e of k)
        $e.x + $e.w >= ke && $e.x <= De && $e.y + $e.h >= Pe && $e.y <= Q && ie.add($e.node.id);
      const Be = Array.from(ie);
      n(Be), O({
        left: ke,
        top: Pe,
        width: Math.max(2, De - ke),
        height: Math.max(2, Q - Pe),
        count: Be.length
      });
    }, H = () => {
      const K = he.current;
      K && (K.isDragging || (K.clickedNodeId ? c(K.clickedNodeId, K.additive, K.shiftKey) : K.additive || n([])), he.current = null, O(null));
    };
    return window.addEventListener("mousemove", C), window.addEventListener("mouseup", H), () => {
      window.removeEventListener("mousemove", C), window.removeEventListener("mouseup", H);
    };
  }, [k, n, c]), Ve(() => {
    const C = v.current;
    if (!C) return;
    const H = C.getContext("webgl2", { antialias: !0 }) || C.getContext("webgl", { antialias: !0 });
    if (!H) return;
    const K = kn(H, vn, wn);
    if (!K) return;
    const V = H.getAttribLocation(K, "a_position"), xe = H.getAttribLocation(K, "a_color"), U = H.getUniformLocation(K, "u_resolution"), pe = H.createBuffer(), ke = H.createBuffer();
    let De = 0, Pe = 0, Q = performance.now();
    const ie = (Be) => {
      Pe++, Be - Q >= 500 && ($(Math.min(120, Math.round(Pe * 1e3 / (Be - Q)))), Pe = 0, Q = Be);
      const $e = window.devicePixelRatio || 1, Me = Math.floor(le.width * $e), _e = Math.floor(le.height * $e);
      (C.width !== Me || C.height !== _e) && (C.width = Me, C.height = _e), H.viewport(0, 0, C.width, C.height), M ? H.clearColor(0.973, 0.98, 0.988, 1) : H.clearColor(0.043, 0.063, 0.106, 1), H.clear(H.COLOR_BUFFER_BIT), H.enable(H.BLEND), H.blendFunc(H.SRC_ALPHA, H.ONE_MINUS_SRC_ALPHA), H.useProgram(K), H.uniform2f(U, le.width, le.height);
      const N = k.filter(
        (_) => _.y + _.h >= re - 40 && _.y <= re + le.height + 40
      ), G = [], y = [], ee = (_, we, R, Se, Ne, Oe, lt, fe) => {
        const Ue = _, We = we, xt = _ + R, et = we + Se;
        G.push(Ue, We, xt, We, Ue, et, Ue, et, xt, We, xt, et);
        for (let zt = 0; zt < 6; zt++)
          y.push(Ne, Oe, lt, fe);
      };
      for (const _ of N) {
        const we = _.y - re, R = (d == null ? void 0 : d.mode) === "cut" && d.nodeIds.includes(_.node.id), Se = s.has(_.node.id) && !R, Ne = m === _.node.id;
        !Se && !Ne || (M ? Se ? ee(_.x, we, _.w, _.h, 0.8, 0.91, 1, 0.85) : Ne && ee(_.x, we, _.w, _.h, 0.88, 0.91, 0.94, 0.7) : Se ? ee(_.x, we, _.w, _.h, 1, 1, 1, 0.12) : Ne && ee(_.x, we, _.w, _.h, 1, 1, 1, 0.06));
      }
      G.length > 0 && (H.bindBuffer(H.ARRAY_BUFFER, pe), H.bufferData(H.ARRAY_BUFFER, new Float32Array(G), H.DYNAMIC_DRAW), H.enableVertexAttribArray(V), H.vertexAttribPointer(V, 2, H.FLOAT, !1, 0, 0), H.bindBuffer(H.ARRAY_BUFFER, ke), H.bufferData(H.ARRAY_BUFFER, new Float32Array(y), H.DYNAMIC_DRAW), H.enableVertexAttribArray(xe), H.vertexAttribPointer(xe, 4, H.FLOAT, !1, 0, 0), H.drawArrays(H.TRIANGLES, 0, G.length / 2)), De = requestAnimationFrame(ie);
    };
    return De = requestAnimationFrame(ie), () => cancelAnimationFrame(De);
  }, [k, s, d, m, le, M, re, F]);
  const q = Aa.useMemo(
    () => k.filter(
      (C) => C.y + C.h >= re - 160 && C.y <= re + le.height + 160
    ),
    [k, re, le.height]
  ), g = l.filter((C) => C.isSyntheticStressNode).length, ge = F === "tiles";
  return /* @__PURE__ */ t("div", { className: "flex flex-col w-full h-full overflow-hidden select-none relative", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: `flex-none px-3.5 py-1.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs z-20 ${M ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-[#0e1525] border-slate-800/90 text-slate-200"}`,
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(Ga, { className: "w-3.5 h-3.5 text-emerald-500" }),
              /* @__PURE__ */ t("span", { className: "font-mono font-bold text-emerald-500", children: [
                "WebGL2 • ",
                X,
                " FPS"
              ] }),
              /* @__PURE__ */ t("span", { className: "opacity-65 font-mono text-[11px]", children: [
                "(",
                a.length.toLocaleString(i.locale),
                " ",
                T.explorer.itemsUnit,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ e("div", { className: "h-3.5 w-px bg-slate-700/50" }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => z("large_icons"),
                  className: `px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${F === "large_icons" ? "bg-blue-600 text-white font-medium" : "opacity-75 hover:opacity-100"}`,
                  children: [
                    /* @__PURE__ */ e(Tl, { className: "w-3.5 h-3.5" }),
                    " ",
                    T.explorer.viewLarge.split(" (")[0]
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => z("tiles"),
                  className: `px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${F === "tiles" ? "bg-blue-600 text-white font-medium" : "opacity-75 hover:opacity-100"}`,
                  children: [
                    /* @__PURE__ */ e(Pl, { className: "w-3.5 h-3.5" }),
                    " ",
                    T.explorer.viewTiles.split(" (")[0]
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => z("grouped"),
                  className: `px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${F === "grouped" ? "bg-blue-600 text-white font-medium" : "opacity-75 hover:opacity-100"}`,
                  children: [
                    /* @__PURE__ */ e(ja, { className: "w-3.5 h-3.5" }),
                    " ",
                    T.webgl.cluster
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(
              "button",
              {
                onClick: () => P(1500),
                className: "px-2.5 py-0.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1",
                children: [
                  /* @__PURE__ */ e(Vt, { className: "w-3 h-3" }),
                  " ",
                  T.webgl.addNodes
                ]
              }
            ),
            g > 0 && /* @__PURE__ */ t(
              "button",
              {
                onClick: L,
                className: "px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 font-medium",
                children: [
                  T.webgl.clear,
                  " (",
                  g,
                  ")"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ t("div", { className: "relative flex-1 w-full overflow-hidden", children: [
      /* @__PURE__ */ e(
        "canvas",
        {
          ref: v,
          className: "absolute inset-0 w-full h-full block pointer-events-none z-0"
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          ref: B,
          onScroll: (C) => se(C.currentTarget.scrollTop),
          onMouseDown: (C) => {
            if (C.button !== 0) return;
            const H = C.target;
            if (H.closest("button")) return;
            const K = B.current;
            if (!K) return;
            const V = H.closest("[data-node-id]");
            if (V ? V.getAttribute("data-node-id") : null)
              return;
            const U = K.getBoundingClientRect(), pe = C.clientX - U.left + K.scrollLeft, ke = C.clientY - U.top + K.scrollTop;
            he.current = {
              startX: pe,
              startY: ke,
              currentX: pe,
              currentY: ke,
              startClientX: C.clientX,
              startClientY: C.clientY,
              isDragging: !1,
              additive: C.ctrlKey || C.metaKey,
              initialSelected: new Set(s),
              clickedNodeId: null,
              shiftKey: C.shiftKey
            };
          },
          onContextMenu: (C) => {
            C.target.closest("[data-node-id]") || (C.preventDefault(), x(C, void 0));
          },
          className: "relative z-10 w-full h-full overflow-y-auto overflow-x-hidden",
          children: /* @__PURE__ */ t("div", { style: { height: `${me}px`, position: "relative" }, children: [
            D.map((C) => /* @__PURE__ */ t(
              "div",
              {
                style: {
                  transform: `translate3d(18px, ${C.y}px, 0)`,
                  right: "18px"
                },
                className: "absolute top-0 left-0 flex items-center gap-2 pb-1",
                children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: `text-xs font-bold ${M ? "text-slate-700" : "text-slate-200"}`,
                      children: C.label
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-blue-400", children: [
                    "(",
                    C.count,
                    ")"
                  ] })
                ]
              },
              C.category
            )),
            q.map((C) => {
              const H = s.has(C.node.id), K = (d == null ? void 0 : d.mode) === "cut" && d.nodeIds.includes(C.node.id), V = C.node.type === "folder" ? ne.computeFolderSize(C.node.id, l) : C.node.size, xe = E === C.node.id;
              return /* @__PURE__ */ t(
                "div",
                {
                  "data-node-id": C.node.id,
                  draggable: i.enableDragAndDrop,
                  onMouseEnter: () => b(C.node.id),
                  onMouseLeave: () => b((U) => U === C.node.id ? null : U),
                  onClick: (U) => {
                    U.stopPropagation(), c(C.node.id, U.ctrlKey || U.metaKey, U.shiftKey);
                  },
                  onDoubleClick: (U) => {
                    U.stopPropagation(), u(C.node);
                  },
                  onContextMenu: (U) => {
                    U.preventDefault(), U.stopPropagation(), x(U, C.node);
                  },
                  onDragStart: (U) => {
                    if (!i.enableDragAndDrop) return;
                    const pe = H ? Array.from(s) : [C.node.id];
                    H || c(C.node.id, !1, !1), U.dataTransfer.effectAllowed = "move", U.dataTransfer.setData(
                      "application/filemangl-nodes",
                      JSON.stringify(pe)
                    ), U.dataTransfer.setData("text/plain", JSON.stringify(pe));
                  },
                  onDragOver: (U) => {
                    !i.enableDragAndDrop || C.node.type !== "folder" || (U.preventDefault(), U.dataTransfer.dropEffect = "move", Z(C.node.id));
                  },
                  onDragLeave: () => {
                    E === C.node.id && Z(null);
                  },
                  onDrop: (U) => {
                    if (!(!i.enableDragAndDrop || C.node.type !== "folder")) {
                      U.preventDefault(), U.stopPropagation(), Z(null);
                      try {
                        const pe = U.dataTransfer.getData("application/filemangl-nodes") || U.dataTransfer.getData("text/plain");
                        if (!pe) return;
                        const ke = JSON.parse(pe);
                        Array.isArray(ke) && ke.length > 0 && w && w(C.node.id, ke);
                      } catch {
                      }
                    }
                  },
                  style: {
                    transform: `translate3d(${Math.round(C.x)}px, ${Math.round(C.y)}px, 0)`,
                    width: `${Math.round(C.w)}px`,
                    height: `${Math.round(C.h)}px`
                  },
                  className: `absolute top-0 left-0 rounded-xl overflow-hidden cursor-default transition-opacity ${ge ? "px-3 py-2 flex items-center gap-3 text-left" : "px-2.5 py-2.5 flex flex-col items-center justify-center text-center"} ${xe ? "ring-2 ring-emerald-400 bg-emerald-500/20" : ""} ${K ? "opacity-25 saturate-[0.3] outline-1 outline-dashed outline-amber-400/50" : ""}`,
                  children: [
                    K && /* @__PURE__ */ e("div", { className: "absolute top-1 left-1.5 pointer-events-none", children: /* @__PURE__ */ e(
                      "span",
                      {
                        className: "material-symbols-outlined text-amber-400",
                        style: { fontSize: "13px" },
                        children: "content_cut"
                      }
                    ) }),
                    (C.node.starred || C.node.shareLink) && /* @__PURE__ */ t("div", { className: "absolute top-1.5 right-1.5 flex items-center gap-0.5 pointer-events-none", children: [
                      C.node.starred && /* @__PURE__ */ e(Ka, { className: "w-3 h-3 text-amber-400 fill-amber-400" }),
                      C.node.shareLink && /* @__PURE__ */ e(ia, { className: "w-3 h-3 text-emerald-400" })
                    ] }),
                    /* @__PURE__ */ e("div", { className: ge ? "shrink-0" : "mb-1.5 shrink-0", children: Pt(
                      C.node,
                      ge ? "w-10 h-10" : "w-11 h-11"
                    ) }),
                    /* @__PURE__ */ t("div", { className: ge ? "min-w-0 flex-1" : "w-full overflow-hidden", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          title: C.node.name,
                          className: `w-full block text-xs font-medium leading-snug line-clamp-2 break-words [overflow-wrap:anywhere] ${H ? M ? "text-blue-700 font-semibold" : "text-white font-semibold" : M ? "text-slate-800" : "text-slate-100"}`,
                          children: C.node.name
                        }
                      ),
                      /* @__PURE__ */ e(
                        "div",
                        {
                          className: `text-[10px] mt-0.5 truncate ${M ? "text-slate-500" : "text-slate-400"}`,
                          children: ge ? `${C.node.type === "folder" ? T.explorer.fileFolder : `${C.node.extension.toUpperCase().replace(".", "")} ${T.explorer.fileSuffix}`} • ${ne.formatBytes(V)}` : ne.formatBytes(V)
                        }
                      )
                    ] })
                  ]
                },
                C.node.id
              );
            }),
            be && /* @__PURE__ */ e(
              "div",
              {
                style: {
                  left: be.left,
                  top: be.top,
                  width: be.width,
                  height: be.height
                },
                className: "absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none rounded-md z-30 shadow-lg",
                children: be.count > 0 && /* @__PURE__ */ t(
                  "span",
                  {
                    style: { color: "#ffffff" },
                    className: "absolute -top-6 left-0 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-mono font-bold shadow whitespace-nowrap",
                    children: [
                      be.count,
                      " ",
                      T.explorer.selectedBadge
                    ]
                  }
                )
              }
            )
          ] })
        }
      )
    ] })
  ] });
}, Sn = {
  folder: [0.92, 0.58, 0.12],
  image: [0.88, 0.29, 0.58],
  code: [0.23, 0.51, 0.96],
  document: [0.06, 0.72, 0.51],
  archive: [0.95, 0.45, 0.12],
  video: [0.55, 0.36, 0.96],
  data: [0.04, 0.68, 0.82],
  audio: [0.88, 0.66, 0.05],
  binary: [0.42, 0.48, 0.58]
}, Cn = {
  folder: [0.96, 0.66, 0.18],
  image: [0.93, 0.36, 0.64],
  code: [0.26, 0.56, 0.98],
  document: [0.1, 0.76, 0.56],
  archive: [0.97, 0.52, 0.18],
  video: [0.6, 0.42, 0.97],
  data: [0.08, 0.72, 0.86],
  audio: [0.93, 0.72, 0.12],
  binary: [0.5, 0.56, 0.66]
}, Dn = `
  attribute vec2 a_position;
  attribute vec2 a_uv;
  attribute vec3 a_color;
  attribute float a_highlight;
  uniform vec2 u_resolution;
  varying vec2 v_uv;
  varying vec3 v_color;
  varying float v_highlight;

  void main() {
    vec2 clip = (a_position / u_resolution) * 2.0 - 1.0;
    gl_Position = vec4(clip * vec2(1.0, -1.0), 0.0, 1.0);
    v_uv = a_uv;
    v_color = a_color;
    v_highlight = a_highlight;
  }
`, Ln = `
  precision mediump float;
  varying vec2 v_uv;
  varying vec3 v_color;
  varying float v_highlight;
  uniform float u_time;
  uniform float u_isLight;

  void main() {
    // Rounded rectangle SDF mask for clean modern card blocks
    vec2 p = v_uv - 0.5;
    vec2 b = vec2(0.485, 0.485);
    vec2 d = abs(p) - b;
    float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - 0.012;
    float alpha = 1.0 - smoothstep(-0.008, 0.008, dist);
    if (alpha <= 0.01) discard;

    // Smooth 3D Cushion + Top-Left studio lighting
    vec2 centerDist = v_uv - 0.5;
    float cushion = 1.0 - dot(centerDist, centerDist) * (u_isLight > 0.5 ? 0.55 : 0.85);
    float lightGrad = 1.08 - (v_uv.x * 0.18 + v_uv.y * 0.24);

    vec3 baseCol = v_color * cushion * lightGrad;
    if (u_isLight > 0.5) {
      // Soften saturation slightly in light mode for modern clean look
      baseCol = mix(baseCol, vec3(1.0), 0.08);
    }

    // Subtle inner border
    float edgeX = min(v_uv.x, 1.0 - v_uv.x);
    float edgeY = min(v_uv.y, 1.0 - v_uv.y);
    float minEdge = min(edgeX, edgeY);

    if (v_highlight > 1.5) {
      float pulse = 0.5 + 0.5 * sin(u_time * 4.0);
      baseCol = mix(baseCol, vec3(1.0), 0.18 + 0.08 * pulse);
      if (minEdge < 0.02) baseCol = vec3(1.0);
    } else if (v_highlight > 0.5) {
      baseCol *= 1.12;
      if (minEdge < 0.016) baseCol = vec3(1.0);
    } else if (minEdge < 0.008) {
      baseCol *= (u_isLight > 0.5 ? 0.88 : 0.72);
    }

    gl_FragColor = vec4(baseCol, alpha);
  }
`, Mn = ({
  allNodes: a,
  currentFolderId: l,
  selectedIds: s,
  config: d,
  onSelectNode: i,
  onOpenNode: c
}) => {
  const n = d.theme === "light", u = Ge(null), x = Ge(null), [w, P] = A(null), [L, T] = A("smart_hierarchy"), [M, v] = A({ width: 960, height: 520 });
  Ve(() => {
    const m = x.current;
    if (!m) return;
    const b = new ResizeObserver((E) => {
      for (const Z of E)
        v({
          width: Math.max(320, Math.floor(Z.contentRect.width)),
          height: Math.max(260, Math.floor(Z.contentRect.height))
        });
    });
    return b.observe(m), () => b.disconnect();
  }, []);
  const B = He(() => {
    let m = [];
    if (L === "smart_hierarchy" ? m = a.filter(
      ($) => !$.trashed && $.parentId === l
    ).map(($) => ({
      node: $,
      bytes: $.type === "folder" ? Math.max(512 * 1024, ne.computeFolderSize($.id, a)) : $.size
    })).filter(($) => $.bytes > 0).sort(($, re) => re.bytes - $.bytes).slice(0, 180) : m = a.filter(($) => !$.trashed && $.type !== "folder" && $.size > 0).map(($) => ({ node: $, bytes: $.size })).sort(($, re) => re.bytes - $.bytes).slice(0, 260), m.length === 0) return [];
    const b = [], E = n ? 4 : 3, Z = (X, $, re, se, he, be) => {
      if (X.length === 0 || se <= 6 || he <= 6) return;
      if (X.length === 1) {
        b.push({
          node: X[0].node,
          bytes: X[0].bytes,
          x: $ + E,
          y: re + E,
          w: Math.max(4, se - E * 2),
          h: Math.max(4, he - E * 2)
        });
        return;
      }
      const O = X.reduce((g, ge) => g + ge.bytes, 0);
      let le = 0, ce = 0;
      for (let g = 0; g < X.length; g++)
        if (le += X[g].bytes, le >= O / 2) {
          ce = Math.max(1, g + 1);
          break;
        }
      ce >= X.length && (ce = X.length - 1);
      const k = X.slice(0, ce), D = X.slice(ce), me = k.reduce((g, ge) => g + ge.bytes, 0), q = O > 0 ? me / O : 0.5;
      if (be) {
        const g = se * q;
        Z(k, $, re, g, he, !be), Z(D, $ + g, re, se - g, he, !be);
      } else {
        const g = he * q;
        Z(k, $, re, se, g, !be), Z(D, $, re + g, se, he - g, !be);
      }
    };
    return Z(m, 12, 12, M.width - 24, M.height - 24, M.width >= M.height), b;
  }, [a, l, L, M.width, M.height, n]);
  Ve(() => {
    const m = u.current;
    if (!m) return;
    const b = m.getContext("webgl", { antialias: !0, alpha: !1 });
    if (!b) return;
    const E = (g, ge) => {
      const C = b.createShader(g);
      return C ? (b.shaderSource(C, ge), b.compileShader(C), C) : null;
    }, Z = E(b.VERTEX_SHADER, Dn), X = E(b.FRAGMENT_SHADER, Ln);
    if (!Z || !X) return;
    const $ = b.createProgram();
    if (!$) return;
    b.attachShader($, Z), b.attachShader($, X), b.linkProgram($), b.useProgram($);
    const re = b.getAttribLocation($, "a_position"), se = b.getAttribLocation($, "a_uv"), he = b.getAttribLocation($, "a_color"), be = b.getAttribLocation($, "a_highlight"), O = b.getUniformLocation($, "u_resolution"), le = b.getUniformLocation($, "u_time"), ce = b.getUniformLocation($, "u_isLight"), k = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, k);
    const D = 32;
    b.enableVertexAttribArray(re), b.vertexAttribPointer(re, 2, b.FLOAT, !1, D, 0), b.enableVertexAttribArray(se), b.vertexAttribPointer(se, 2, b.FLOAT, !1, D, 8), b.enableVertexAttribArray(he), b.vertexAttribPointer(he, 3, b.FLOAT, !1, D, 16), b.enableVertexAttribArray(be), b.vertexAttribPointer(be, 1, b.FLOAT, !1, D, 28), b.enable(b.BLEND), b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
    let me = 0;
    const q = (g) => {
      const ge = window.devicePixelRatio || 1, C = Math.floor(M.width * ge), H = Math.floor(M.height * ge);
      if ((m.width !== C || m.height !== H) && (m.width = C, m.height = H), b.viewport(0, 0, m.width, m.height), n ? b.clearColor(0.945, 0.961, 0.976, 1) : b.clearColor(0.04, 0.06, 0.095, 1), b.clear(b.COLOR_BUFFER_BIT), b.uniform2f(O, M.width, M.height), b.uniform1f(le, g * 1e-3), b.uniform1f(ce, n ? 1 : 0), B.length > 0) {
        const K = n ? Cn : Sn, V = new Float32Array(B.length * 6 * 8);
        let xe = 0;
        for (const U of B) {
          const pe = K[U.node.category] || [0.4, 0.5, 0.6];
          let ke = 0;
          s.has(U.node.id) ? ke = 2 : (w == null ? void 0 : w.node.id) === U.node.id && (ke = 1);
          const De = U.x, Pe = U.y, Q = U.x + U.w, ie = U.y + U.h, Be = ($e, Me, _e, N) => {
            V[xe++] = $e, V[xe++] = Me, V[xe++] = _e, V[xe++] = N, V[xe++] = pe[0], V[xe++] = pe[1], V[xe++] = pe[2], V[xe++] = ke;
          };
          Be(De, Pe, 0, 0), Be(Q, Pe, 1, 0), Be(De, ie, 0, 1), Be(De, ie, 0, 1), Be(Q, Pe, 1, 0), Be(Q, ie, 1, 1);
        }
        b.bufferData(b.ARRAY_BUFFER, V, b.DYNAMIC_DRAW), b.drawArrays(b.TRIANGLES, 0, B.length * 6);
      }
      me = requestAnimationFrame(q);
    };
    return me = requestAnimationFrame(q), () => {
      cancelAnimationFrame(me), b.deleteBuffer(k), b.deleteProgram($);
    };
  }, [B, w, s, M, n]);
  const F = ne.computeTotalVolumeUsed(a), z = ne.getCategoryBreakdown(a, d.totalDiskQuotaBytes);
  return /* @__PURE__ */ t(
    "div",
    {
      className: `flex flex-col h-full select-none ${n ? "bg-slate-100 text-slate-800" : "bg-[#090d16] text-slate-100"}`,
      children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: `px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${n ? "bg-white border-slate-200 text-slate-800" : "bg-slate-900/90 border-slate-800 text-slate-100"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ e(
                  "div",
                  {
                    className: `p-2 rounded-lg border ${n ? "bg-blue-50 border-blue-200 text-blue-600" : "bg-blue-500/15 border-blue-500/30 text-blue-400"}`,
                    children: /* @__PURE__ */ e(Ua, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ t("h3", { className: "text-xs font-bold", children: [
                      "WebGL 3D Cushion Disk Treemap (",
                      d.volumeName,
                      ")"
                    ] }),
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: `px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${n ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"}`,
                        children: "GLSL Shader Aktif"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ t("p", { className: `text-[11px] ${n ? "text-slate-500" : "text-slate-400"}`, children: [
                    "Toplam Kullanım:",
                    " ",
                    /* @__PURE__ */ t("strong", { className: n ? "text-slate-800" : "text-slate-200", children: [
                      ne.formatBytes(F),
                      " /",
                      " ",
                      ne.formatBytes(d.totalDiskQuotaBytes)
                    ] }),
                    " ",
                    "(",
                    (F / Math.max(1, d.totalDiskQuotaBytes) * 100).toFixed(1),
                    "% Dolu •",
                    " ",
                    a.length.toLocaleString("tr-TR"),
                    " Düğüm)"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-3", children: [
                /* @__PURE__ */ t(
                  "div",
                  {
                    className: `flex items-center p-0.5 rounded-lg border text-[11px] ${n ? "bg-slate-100 border-slate-200" : "bg-slate-950 border-slate-800"}`,
                    children: [
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => T("smart_hierarchy"),
                          className: `px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${L === "smart_hierarchy" ? "bg-blue-600 text-white shadow-sm" : n ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`,
                          title: "Aktif dizindeki klasör ve dosyaları hiyerarşik boyuta göre göster",
                          children: [
                            /* @__PURE__ */ e(_l, { className: "w-3 h-3" }),
                            " Bu Dizin Hiyerarşisi"
                          ]
                        }
                      ),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => T("all_files"),
                          className: `px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${L === "all_files" ? "bg-blue-600 text-white shadow-sm" : n ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`,
                          title: "Diskteki en büyük bireysel dosyaları göster",
                          children: [
                            /* @__PURE__ */ e(ja, { className: "w-3 h-3" }),
                            " En Büyük Dosyalar"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ e("div", { className: "hidden xl:flex flex-wrap items-center gap-2.5 text-[11px]", children: z.slice(0, 5).map((m) => /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-sm inline-block shadow-sm",
                      style: { backgroundColor: m.color }
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "font-medium", children: m.label.split(" ")[0] }),
                  /* @__PURE__ */ t("span", { className: "font-mono opacity-60", children: [
                    "(",
                    ne.formatBytes(m.bytes),
                    ")"
                  ] })
                ] }, m.category)) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            ref: x,
            onMouseMove: (m) => {
              var $;
              const b = ($ = x.current) == null ? void 0 : $.getBoundingClientRect();
              if (!b) return;
              const E = m.clientX - b.left, Z = m.clientY - b.top, X = B.find(
                (re) => E >= re.x && E <= re.x + re.w && Z >= re.y && Z <= re.y + re.h
              );
              P(X || null);
            },
            onMouseLeave: () => P(null),
            onClick: () => {
              w && i(w.node.id, !1, !1);
            },
            onDoubleClick: () => {
              w && c(w.node);
            },
            className: "relative flex-1 overflow-hidden cursor-pointer",
            children: [
              /* @__PURE__ */ e("canvas", { ref: u, className: "absolute inset-0 w-full h-full block" }),
              /* @__PURE__ */ e("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: B.slice(0, 100).map((m) => m.w < 72 || m.h < 40 ? null : /* @__PURE__ */ t(
                "div",
                {
                  style: {
                    left: Math.round(m.x),
                    top: Math.round(m.y),
                    width: Math.round(m.w),
                    height: Math.round(m.h)
                  },
                  className: "absolute p-2.5 flex flex-col justify-between overflow-hidden",
                  children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-1", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          style: { color: "#ffffff" },
                          className: "text-[11px] font-semibold truncate px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-[2px] shadow-sm",
                          children: m.node.type === "folder" ? `📁 ${m.node.name}` : m.node.name
                        }
                      ),
                      m.node.security.locked && /* @__PURE__ */ e("span", { className: "p-1 rounded-full bg-black/35", children: /* @__PURE__ */ e(bt, { className: "w-3 h-3 text-white shrink-0" }) })
                    ] }),
                    m.h >= 58 && /* @__PURE__ */ e("div", { className: "flex items-center justify-start", children: /* @__PURE__ */ e(
                      "span",
                      {
                        style: { color: "#ffffff" },
                        className: "text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-black/30",
                        children: ne.formatBytes(m.bytes)
                      }
                    ) })
                  ]
                },
                m.node.id
              )) }),
              w && /* @__PURE__ */ t(
                "div",
                {
                  className: `absolute bottom-4 right-4 z-30 backdrop-blur-md border rounded-xl p-3.5 shadow-2xl w-80 pointer-events-none ${n ? "bg-white/95 border-slate-200 text-slate-800" : "bg-slate-900/95 border-slate-700 text-slate-100"}`,
                  children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
                      /* @__PURE__ */ e("span", { className: "text-xs font-bold truncate", children: w.node.name }),
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: `text-[11px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 ${n ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-blue-500/20 text-blue-300"}`,
                          children: ne.formatBytes(w.bytes)
                        }
                      )
                    ] }),
                    /* @__PURE__ */ t("div", { className: "space-y-1 text-[11px] font-mono", children: [
                      /* @__PURE__ */ t("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ e("span", { className: "opacity-65", children: "Tür:" }),
                        /* @__PURE__ */ e("span", { className: "font-semibold", children: w.node.type === "folder" ? "Klasör (Çift Tıkla Aç)" : `${w.node.extension.toUpperCase()} Dosyası` })
                      ] }),
                      /* @__PURE__ */ t("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ e("span", { className: "opacity-65", children: "Sahip (Owner):" }),
                        /* @__PURE__ */ e("span", { children: w.node.security.ownerName })
                      ] }),
                      /* @__PURE__ */ t("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ e("span", { className: "opacity-65", children: "POSIX / İzin:" }),
                        /* @__PURE__ */ t("span", { className: n ? "text-emerald-700 font-semibold" : "text-emerald-400", children: [
                          w.node.security.posix.octal,
                          " (",
                          w.node.security.posix.symbolic,
                          ")"
                        ] })
                      ] }),
                      /* @__PURE__ */ t("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ e("span", { className: "opacity-65", children: "Disk Payı:" }),
                        /* @__PURE__ */ t("span", { children: [
                          (w.bytes / Math.max(1, d.totalDiskQuotaBytes) * 100).toFixed(2),
                          "%"
                        ] })
                      ] })
                    ] })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  );
}, zn = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`, _n = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform float u_exposure;
  uniform float u_contrast;
  uniform float u_saturation;
  uniform float u_aberration;
  uniform float u_vignette;
  uniform int u_pattern;
  uniform int u_edgeDetect;
  uniform int u_hasTexture;
  uniform sampler2D u_tex;
  uniform vec3 u_c1;
  uniform vec3 u_c2;
  uniform vec3 u_c3;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  vec3 proceduralScene(vec2 uv) {
    float t = u_time * 0.25;
    if (u_pattern == 1) {
      vec2 g = abs(fract(uv * 16.0 - vec2(0.0, t)) - 0.5) / 0.04;
      float line = 1.0 - min(min(g.x, g.y), 1.0);
      vec3 bg = mix(u_c3, u_c2 * 0.5, uv.y);
      return bg + line * u_c1 * 1.4;
    }
    if (u_pattern == 2) {
      float n1 = noise(uv * 4.5 + vec2(t, -t * 0.6));
      float n2 = noise(uv * 9.0 - vec2(t * 0.8, t));
      float ribbon = smoothstep(0.35, 0.75, sin(uv.x * 8.0 + n1 * 4.0) * 0.5 + 0.5);
      return mix(u_c1 * 0.3, mix(u_c2, u_c3, n2), ribbon);
    }
    if (u_pattern == 3) {
      float d = length(uv - 0.5);
      float angle = atan(uv.y - 0.5, uv.x - 0.5);
      float wave = sin(d * 24.0 - t * 4.0 + angle * 3.0) * 0.5 + 0.5;
      return mix(u_c1, mix(u_c2, u_c3, wave), d * 1.3);
    }
    float n = 0.0;
    vec2 p = uv * 3.5;
    float amp = 0.55;
    for (int i = 0; i < 4; i++) {
      n += noise(p + t * 0.3) * amp;
      p *= 2.05;
      amp *= 0.5;
    }
    vec3 col = mix(u_c1, u_c2, smoothstep(0.2, 0.8, n));
    col = mix(col, u_c3, smoothstep(0.55, 0.95, n * uv.y));
    return col;
  }

  vec3 sampleSource(vec2 uv) {
    if (u_hasTexture == 1) {
      return texture2D(u_tex, clamp(uv, 0.0, 1.0)).rgb;
    }
    return proceduralScene(uv);
  }

  void main() {
    vec2 shift = vec2(u_aberration * 0.015, 0.0);
    float r = sampleSource(v_uv + shift).r;
    float g = sampleSource(v_uv).g;
    float b = sampleSource(v_uv - shift).b;
    vec3 col = vec3(r, g, b);

    if (u_edgeDetect == 1) {
      vec3 dx = sampleSource(v_uv + vec2(0.0035, 0.0)) - sampleSource(v_uv - vec2(0.0035, 0.0));
      vec3 dy = sampleSource(v_uv + vec2(0.0, 0.0035)) - sampleSource(v_uv - vec2(0.0, 0.0035));
      col = sqrt(dx * dx + dy * dy) * 4.5;
    }

    // Exposure
    col *= pow(2.0, u_exposure);

    // Contrast
    col = (col - 0.5) * u_contrast + 0.5;

    // Saturation
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);

    // Vignette
    float dist = length(v_uv - 0.5);
    if (u_vignette > 0.01) {
      col *= smoothstep(0.9, 0.9 - u_vignette * 0.55, dist * u_vignette);
    }

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;
function La(a) {
  const l = a.replace("#", ""), s = parseInt(l, 16) || 3900150;
  return [(s >> 16 & 255) / 255, (s >> 8 & 255) / 255, (s & 255) / 255];
}
const An = ({
  node: a,
  canWrite: l,
  writeDenialReason: s,
  onClose: d,
  onSaveAsNewFile: i
}) => {
  var be, O, le, ce, k, D, me;
  const c = !!(a.blobUrl || a.thumbnailUrl), n = Ge(null), [u, x] = A(0), [w, P] = A(c ? 1 : 1.05), [L, T] = A(c ? 1 : 1.15), [M, v] = A(c ? 0 : 0.15), [B, F] = A(c ? 0 : 0.35), [z, m] = A(!1), [b, E] = A(!1), [Z, X] = A(!1), $ = ((be = a.imageMeta) == null ? void 0 : be.pattern) === "cybergrid" ? 1 : ((O = a.imageMeta) == null ? void 0 : O.pattern) === "aurora" ? 2 : ((le = a.imageMeta) == null ? void 0 : le.pattern) === "prism" ? 3 : 0;
  Ve(() => {
    var Me;
    const q = n.current;
    if (!q) return;
    const g = q.getContext("webgl", { preserveDrawingBuffer: !0 });
    if (!g) return;
    const ge = (_e, N) => {
      const G = g.createShader(_e);
      return G ? (g.shaderSource(G, N), g.compileShader(G), G) : null;
    }, C = ge(g.VERTEX_SHADER, zn), H = ge(g.FRAGMENT_SHADER, _n);
    if (!C || !H) return;
    const K = g.createProgram();
    if (!K) return;
    g.attachShader(K, C), g.attachShader(K, H), g.linkProgram(K), g.useProgram(K);
    const V = g.createBuffer();
    g.bindBuffer(g.ARRAY_BUFFER, V), g.bufferData(
      g.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      g.STATIC_DRAW
    );
    const xe = g.getAttribLocation(K, "a_position");
    g.enableVertexAttribArray(xe), g.vertexAttribPointer(xe, 2, g.FLOAT, !1, 0, 0);
    const U = g.createTexture();
    let pe = 0;
    const ke = a.blobUrl || a.thumbnailUrl;
    if (ke && U && typeof Image < "u") {
      const _e = new Image();
      _e.crossOrigin = "anonymous", _e.onload = () => {
        g.bindTexture(g.TEXTURE_2D, U), g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, 1), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR), g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR), g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, _e), pe = 1, X(!0);
      }, _e.src = ke;
    }
    const De = ((Me = a.imageMeta) == null ? void 0 : Me.palette) || ["#0ea5e9", "#6366f1", "#ec4899"], Pe = La(De[0]), Q = La(De[1]), ie = La(De[2]);
    let Be = 0;
    const $e = (_e) => {
      g.viewport(0, 0, q.width, q.height), g.useProgram(K), pe === 1 && U && (g.activeTexture(g.TEXTURE0), g.bindTexture(g.TEXTURE_2D, U), g.uniform1i(g.getUniformLocation(K, "u_tex"), 0)), g.uniform1i(g.getUniformLocation(K, "u_hasTexture"), pe), g.uniform1f(g.getUniformLocation(K, "u_time"), _e * 1e-3), g.uniform1f(
        g.getUniformLocation(K, "u_exposure"),
        b ? 0 : u
      ), g.uniform1f(
        g.getUniformLocation(K, "u_contrast"),
        b ? 1 : w
      ), g.uniform1f(
        g.getUniformLocation(K, "u_saturation"),
        b ? 1 : L
      ), g.uniform1f(
        g.getUniformLocation(K, "u_aberration"),
        b ? 0 : M
      ), g.uniform1f(
        g.getUniformLocation(K, "u_vignette"),
        b ? 0 : B
      ), g.uniform1i(g.getUniformLocation(K, "u_pattern"), $), g.uniform1i(
        g.getUniformLocation(K, "u_edgeDetect"),
        b ? 0 : z ? 1 : 0
      ), g.uniform3f(g.getUniformLocation(K, "u_c1"), Pe[0], Pe[1], Pe[2]), g.uniform3f(g.getUniformLocation(K, "u_c2"), Q[0], Q[1], Q[2]), g.uniform3f(g.getUniformLocation(K, "u_c3"), ie[0], ie[1], ie[2]), g.drawArrays(g.TRIANGLES, 0, 6), Be = requestAnimationFrame($e);
    };
    return Be = requestAnimationFrame($e), () => {
      cancelAnimationFrame(Be), U && g.deleteTexture(U), g.deleteBuffer(V), g.deleteProgram(K);
    };
  }, [
    u,
    w,
    L,
    M,
    B,
    z,
    b,
    $,
    a
  ]);
  const re = () => {
    x(0), P(c ? 1 : 1.05), T(c ? 1 : 1.15), v(c ? 0 : 0.15), F(c ? 0 : 0.35), m(!1);
  }, se = () => {
    const q = n.current;
    if (!q) return { byteSize: Math.round(a.size * 0.85) };
    try {
      const g = q.toDataURL("image/png");
      if (g && g.startsWith("data:image/")) {
        const ge = g.indexOf(","), C = Math.round(ge !== -1 ? (g.length - ge - 1) * 3 / 4 : a.size * 0.85);
        return { dataUrl: g, byteSize: Math.max(1024, C) };
      }
    } catch {
    }
    return {
      dataUrl: a.thumbnailUrl || a.blobUrl,
      byteSize: Math.round(a.size * 0.85)
    };
  }, he = () => {
    const { dataUrl: q } = se(), g = q || a.blobUrl || a.thumbnailUrl;
    if (!g) return;
    const ge = document.createElement("a"), C = a.name.replace(/\.[^/.]+$/, "");
    ge.href = g, ge.download = `${C}_shader_render.png`, ge.click();
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0e1420] border border-slate-700/80 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400", children: /* @__PURE__ */ e(Vt, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white", children: a.name }),
            /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/20 text-blue-300 border border-blue-500/30", children: "WebGL GLSL Fragment Pipeline" }),
            c && /* @__PURE__ */ t("span", { className: "px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1", children: [
              /* @__PURE__ */ e(Al, { className: "w-3 h-3" }),
              Z ? "GPU 2D TEXTURE BOUND" : "YEREL GÖRSEL DOKUSU"
            ] })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-400 font-mono", children: [
            ((ce = a.imageMeta) == null ? void 0 : ce.width) || 3840,
            "×",
            ((k = a.imageMeta) == null ? void 0 : k.height) || 2160,
            "px •",
            " ",
            ne.formatBytes(a.size),
            " • Checksum:",
            " ",
            a.checksumSha256.slice(0, 16),
            "..."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        c && /* @__PURE__ */ e(
          "button",
          {
            onMouseDown: () => E(!0),
            onMouseUp: () => E(!1),
            onMouseLeave: () => E(!1),
            className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-medium transition",
            title: "Orijinal fotoğrafı görmek için basılı tutun",
            children: b ? "Orijinal Gösteriliyor" : "Orijinal ile Karşılaştır (Basılı Tut)"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: d,
            className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800",
            children: /* @__PURE__ */ e(It, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden", children: [
      /* @__PURE__ */ t("div", { className: "lg:col-span-2 bg-black relative flex items-center justify-center p-4 min-h-[360px]", children: [
        /* @__PURE__ */ e(
          "canvas",
          {
            ref: n,
            width: (D = a.imageMeta) != null && D.width ? Math.min(1280, a.imageMeta.width) : 860,
            height: (me = a.imageMeta) != null && me.height ? Math.min(720, a.imageMeta.height) : 480,
            className: "w-full h-full max-h-[460px] object-contain rounded-xl border border-slate-800 shadow-2xl"
          }
        ),
        /* @__PURE__ */ t("div", { className: "absolute top-6 left-6 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-emerald-400", children: [
          /* @__PURE__ */ e(Ga, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ e("span", { children: c ? "GPU Real-Time 2D Texture Sampler (sampler2D u_tex)" : "GPU Real-Time Fragment Shader (highp float)" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "p-5 bg-slate-900/60 border-l border-slate-800 flex flex-col justify-between overflow-y-auto space-y-5", children: [
        /* @__PURE__ */ t("div", { className: "space-y-4", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("h4", { className: "text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(Pr, { className: "w-3.5 h-3.5 text-blue-400" }),
              " GLSL Shader Parametreleri"
            ] }),
            /* @__PURE__ */ t(
              "button",
              {
                onClick: re,
                className: "text-xs text-slate-400 hover:text-white flex items-center gap-1",
                children: [
                  /* @__PURE__ */ e(Ol, { className: "w-3 h-3" }),
                  " Sıfırla"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-slate-300", children: "Pozlama (u_exposure)" }),
              /* @__PURE__ */ t("span", { className: "font-mono text-blue-400", children: [
                u.toFixed(2),
                " EV"
              ] })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "-1.5",
                max: "1.5",
                step: "0.05",
                value: u,
                onChange: (q) => x(parseFloat(q.target.value)),
                className: "w-full accent-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-slate-300", children: "Kontrast (u_contrast)" }),
              /* @__PURE__ */ t("span", { className: "font-mono text-blue-400", children: [
                w.toFixed(2),
                "x"
              ] })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "0.4",
                max: "2.2",
                step: "0.05",
                value: w,
                onChange: (q) => P(parseFloat(q.target.value)),
                className: "w-full accent-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-slate-300", children: "Doygunluk (u_saturation)" }),
              /* @__PURE__ */ t("span", { className: "font-mono text-blue-400", children: [
                L.toFixed(2),
                "x"
              ] })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "0.0",
                max: "2.5",
                step: "0.05",
                value: L,
                onChange: (q) => T(parseFloat(q.target.value)),
                className: "w-full accent-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-slate-300", children: "Kromatik Sapma (u_aberration)" }),
              /* @__PURE__ */ e("span", { className: "font-mono text-pink-400", children: M.toFixed(2) })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "0.0",
                max: "2.0",
                step: "0.05",
                value: M,
                onChange: (q) => v(parseFloat(q.target.value)),
                className: "w-full accent-pink-500"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-slate-300", children: "Vignette Lens (u_vignette)" }),
              /* @__PURE__ */ e("span", { className: "font-mono text-blue-400", children: B.toFixed(2) })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "0.0",
                max: "1.2",
                step: "0.05",
                value: B,
                onChange: (q) => F(parseFloat(q.target.value)),
                className: "w-full accent-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "pt-2", children: /* @__PURE__ */ t("label", { className: "flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer bg-slate-800/70 p-2.5 rounded-lg border border-slate-700", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                checked: z,
                onChange: (q) => m(q.target.checked),
                className: "rounded accent-blue-500"
              }
            ),
            /* @__PURE__ */ e(Mr, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ e("span", { children: "GLSL Sobel Kenar Algılama (Edge-Detect Pass)" })
          ] }) })
        ] }),
        /* @__PURE__ */ t("div", { className: "pt-4 border-t border-slate-800 space-y-2", children: [
          !l && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-300 flex items-start gap-2", children: [
            /* @__PURE__ */ e(Tr, { className: "w-4 h-4 text-rose-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ e("span", { children: s || "Bu dizine yazma yetkiniz bulunmuyor." })
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              disabled: !l,
              onClick: () => {
                const q = a.name.replace(/\.[^/.]+$/, ""), { dataUrl: g, byteSize: ge } = se();
                i(
                  `${q}_shader_render.png`,
                  `GLSL Render (exp=${u}, con=${w}, sat=${L})`,
                  ge,
                  g
                ), d();
              },
              className: `w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition ${l ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`,
              children: [
                /* @__PURE__ */ e(Ar, { className: "w-4 h-4" }),
                "Shader Çıktısını Diske Yeni Dosya Olarak Kaydet"
              ]
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: he,
              className: "w-full py-2 px-4 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center justify-center gap-2 transition",
              children: [
                /* @__PURE__ */ e(Lr, { className: "w-3.5 h-3.5 text-cyan-400" }),
                "İşlenmiş Görseli Bilgisayara İndir (.PNG)"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}, Tn = {
  read: "Okuma (Read)",
  write: "Yazma (Write)",
  delete: "Silme (Delete)",
  rename: "Ad Değiştir (Rename)",
  upload: "Yükleme (Upload)",
  download: "İndirme (Download)",
  share: "Paylaşım (Share)",
  chmod: "İzin Yönetimi (Chmod)",
  lock: "Kilitleme (Lock)"
}, Pn = ({
  node: a,
  allNodes: l,
  currentUser: s,
  config: d,
  onClose: i,
  onSaveSecurity: c
}) => {
  const [n, u] = A("acl"), [x, w] = A(
    () => JSON.parse(JSON.stringify(a.security))
  ), [P, L] = A(!1), [T, M] = A("role:editor"), [v, B] = A("allow"), [F, z] = A(s.id), b = de.evaluateNodePermissions(
    a,
    s,
    l,
    d
  ).allowed.chmod, E = (k, D, me) => {
    const q = de.syncPosix({
      owner: k === "owner" ? { ...x.posix.owner, [D]: me } : x.posix.owner,
      group: k === "group" ? { ...x.posix.group, [D]: me } : x.posix.group,
      others: k === "others" ? { ...x.posix.others, [D]: me } : x.posix.others
    });
    w((g) => ({ ...g, posix: q }));
  }, Z = (k) => {
    const D = de.buildPosixFromOctal(k);
    w((me) => ({ ...me, posix: D }));
  }, X = () => {
    var g;
    const [k, D] = T.split(":"), me = k === "role" ? `Role: ${D.toUpperCase()}` : `User: ${((g = ft.find((ge) => ge.id === D)) == null ? void 0 : g.name) || D}`, q = {
      id: `acl_${Date.now()}`,
      subjectType: k,
      subjectId: D,
      subjectLabel: me,
      effect: v,
      permissions: {
        read: !0,
        write: v === "allow",
        delete: !1,
        rename: v === "allow",
        upload: v === "allow",
        download: !0,
        share: !1,
        chmod: !1,
        lock: !1
      }
    };
    w((ge) => ({
      ...ge,
      acl: [...ge.acl, q]
    }));
  }, $ = (k, D) => {
    w((me) => ({
      ...me,
      acl: me.acl.map(
        (q) => q.id === k ? { ...q, permissions: { ...q.permissions, [D]: !q.permissions[D] } } : q
      )
    }));
  }, re = (k) => {
    w((D) => ({
      ...D,
      acl: D.acl.filter((me) => me.id !== k)
    }));
  }, se = x.quota || {
    maxBytes: null,
    maxFileSizeBytes: null,
    allowedExtensions: [],
    blockedExtensions: []
  }, he = (k) => {
    w((D) => ({
      ...D,
      quota: {
        ...se,
        ...k
      }
    }));
  }, be = { ...a, security: x }, O = ft.find((k) => k.id === F) || s, le = de.evaluateNodePermissions(
    be,
    O,
    l,
    d
  ), ce = a.type === "folder" ? ne.computeFolderSize(a.id, l) : a.size;
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-slate-700/90 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ t("div", { className: "px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400", children: /* @__PURE__ */ e(Pa, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t("h2", { className: "text-base font-bold text-white", children: [
              "Gelişmiş İzin & Kota Yönetimi — ",
              a.name
            ] }),
            /* @__PURE__ */ t("span", { className: "px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800 text-blue-300 border border-slate-700", children: [
              x.posix.octal,
              " (",
              a.type === "folder" ? "d" : "-",
              x.posix.symbolic,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-400", children: [
            "Hibrit NTFS ACL + POSIX İzin Motoru • Sahip: ",
            x.ownerName,
            " (",
            x.groupName,
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: i,
          className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800",
          children: /* @__PURE__ */ e(It, { className: "w-5 h-5" })
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "px-6 pt-3 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto", children: [
      /* @__PURE__ */ t(
        "button",
        {
          onClick: () => u("acl"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${n === "acl" ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ e(Vl, { className: "w-4 h-4" }),
            " 1. ACL Rol & Kullanıcı Matrisi (",
            x.acl.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          onClick: () => u("posix"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${n === "posix" ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ e(Fr, { className: "w-4 h-4" }),
            " 2. POSIX (rwx / Octal) & Sahiplik"
          ]
        }
      ),
      a.type === "folder" && /* @__PURE__ */ t(
        "button",
        {
          onClick: () => u("quota"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${n === "quota" ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ e(Ua, { className: "w-4 h-4" }),
            " 3. Klasör Kotası & Uzantı Filtresi"
          ]
        }
      ),
      /* @__PURE__ */ t(
        "button",
        {
          onClick: () => u("simulator"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${n === "simulator" ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ e(ja, { className: "w-4 h-4" }),
            " Etkin İzin Simülatörü (Canlı Test)"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "p-6 overflow-y-auto flex-1 space-y-5", children: [
      /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ t("label", { className: "flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: x.inheritFromParent,
              disabled: !b,
              onChange: (k) => w((D) => ({ ...D, inheritFromParent: k.target.checked })),
              className: "mt-1 rounded accent-blue-500"
            }
          ),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-white", children: "Üst Klasörden İzinleri Miras Al (ACL Inheritance)" }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "Aktif olduğunda üst klasörlerdeki Allow/Deny kuralları bu öğeye otomatik aktarılır." })
          ] })
        ] }),
        /* @__PURE__ */ t("label", { className: "flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "checkbox",
              checked: x.locked,
              disabled: !b,
              onChange: (k) => w((D) => ({
                ...D,
                locked: k.target.checked,
                lockedBy: k.target.checked ? s.name : void 0
              })),
              className: "mt-1 rounded accent-rose-500"
            }
          ),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-xs font-semibold text-white flex items-center gap-1.5", children: [
              x.locked ? /* @__PURE__ */ e(bt, { className: "w-3.5 h-3.5 text-rose-400" }) : /* @__PURE__ */ e(_r, { className: "w-3.5 h-3.5 text-emerald-400" }),
              "Değiştirilemez Kilit (Immutable Write-Lock)"
            ] }),
            /* @__PURE__ */ e("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "Aktif olduğunda dosya/klasör silinemez, yeniden adlandırılamaz ve üzerine yazılamaz." })
          ] })
        ] })
      ] }),
      n === "acl" && /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ e("span", { className: "text-xs font-medium text-slate-300", children: "Yeni ACL Kuralı:" }),
          /* @__PURE__ */ t(
            "select",
            {
              value: T,
              onChange: (k) => M(k.target.value),
              className: "bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200",
              children: [
                /* @__PURE__ */ t("optgroup", { label: "Roller (RBAC)", children: [
                  /* @__PURE__ */ e("option", { value: "role:admin", children: "Role: Admin" }),
                  /* @__PURE__ */ e("option", { value: "role:developer", children: "Role: Developer" }),
                  /* @__PURE__ */ e("option", { value: "role:editor", children: "Role: Media Editor" }),
                  /* @__PURE__ */ e("option", { value: "role:viewer", children: "Role: Security Auditor (Viewer)" }),
                  /* @__PURE__ */ e("option", { value: "role:guest", children: "Role: External Guest" })
                ] }),
                /* @__PURE__ */ e("optgroup", { label: "Tekil Kullanıcılar", children: ft.map((k) => /* @__PURE__ */ t("option", { value: `user:${k.id}`, children: [
                  "User: ",
                  k.name
                ] }, k.id)) })
              ]
            }
          ),
          /* @__PURE__ */ t(
            "select",
            {
              value: v,
              onChange: (k) => B(k.target.value),
              className: "bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200",
              children: [
                /* @__PURE__ */ e("option", { value: "allow", children: "ALLOW (Yetki Ver)" }),
                /* @__PURE__ */ e("option", { value: "deny", children: "EXPLICIT DENY (Kesin Engelle)" })
              ]
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              disabled: !b,
              onClick: X,
              className: "px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1.5",
              children: [
                /* @__PURE__ */ e($l, { className: "w-3.5 h-3.5" }),
                " Kural Ekle"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "border border-slate-800 rounded-xl overflow-x-auto", children: /* @__PURE__ */ t("table", { className: "w-full text-left border-collapse text-xs", children: [
          /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "bg-slate-900/90 border-b border-slate-800 text-slate-400", children: [
            /* @__PURE__ */ e("th", { className: "py-2.5 px-3", children: "Özelliği / Hedef" }),
            /* @__PURE__ */ e("th", { className: "py-2.5 px-2", children: "Tür" }),
            St.map((k) => /* @__PURE__ */ e("th", { className: "py-2.5 px-2 text-center font-mono text-[11px]", children: k }, k)),
            /* @__PURE__ */ e("th", { className: "py-2.5 px-2 text-right", children: "Sil" })
          ] }) }),
          /* @__PURE__ */ e("tbody", { className: "divide-y divide-slate-800/70", children: x.acl.length === 0 ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ t("td", { colSpan: 12, className: "py-6 text-center text-slate-500", children: [
            "Bu düğümde özel ACL kuralı yok. Üst klasör mirası ve POSIX (",
            x.posix.octal,
            ") kuralları geçerlidir."
          ] }) }) : x.acl.map((k) => /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3 font-medium text-slate-200", children: k.subjectLabel }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-2", children: /* @__PURE__ */ e(
              "span",
              {
                className: `px-2 py-0.5 rounded text-[10px] font-mono uppercase ${k.effect === "allow" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/15 text-rose-300 border border-rose-500/30"}`,
                children: k.effect
              }
            ) }),
            St.map((D) => /* @__PURE__ */ e("td", { className: "py-2.5 px-2 text-center", children: /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                disabled: !b,
                checked: !!k.permissions[D],
                onChange: () => $(k.id, D),
                className: k.effect === "allow" ? "accent-emerald-500" : "accent-rose-500"
              }
            ) }, D)),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-2 text-right", children: /* @__PURE__ */ e(
              "button",
              {
                disabled: !b,
                onClick: () => re(k.id),
                className: "p-1 text-slate-500 hover:text-rose-400",
                children: /* @__PURE__ */ e(Ir, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] }, k.id)) })
        ] }) })
      ] }),
      n === "posix" && /* @__PURE__ */ t("div", { className: "space-y-5", children: [
        /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Dosya/Klasör Sahibi (Owner)" }),
            /* @__PURE__ */ e(
              "select",
              {
                disabled: !b,
                value: x.ownerId,
                onChange: (k) => {
                  const D = ft.find((me) => me.id === k.target.value);
                  D && w((me) => ({
                    ...me,
                    ownerId: D.id,
                    ownerName: D.name,
                    groupName: D.group
                  }));
                },
                className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white",
                children: ft.map((k) => /* @__PURE__ */ t("option", { value: k.id, children: [
                  k.name,
                  " (",
                  k.group,
                  ")"
                ] }, k.id))
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Octal Kodu (Chmod)" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                maxLength: 4,
                disabled: !b,
                value: x.posix.octal,
                onChange: (k) => Z(k.target.value),
                className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-400"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Sembolik Gösterim" }),
            /* @__PURE__ */ t("div", { className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-blue-300", children: [
              a.type === "folder" ? "d" : "-",
              x.posix.symbolic
            ] })
          ] })
        ] }),
        /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: ["owner", "group", "others"].map((k) => /* @__PURE__ */ t(
          "div",
          {
            className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5",
            children: [
              /* @__PURE__ */ e("div", { className: "text-xs font-semibold uppercase tracking-wider text-slate-300", children: k === "owner" ? "Owner (Sahip)" : k === "group" ? `Group (${x.groupName})` : "Others (Diğer Herkes)" }),
              ["r", "w", "x"].map((D) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-xs text-slate-300", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    disabled: !b,
                    checked: x.posix[k][D],
                    onChange: (me) => E(k, D, me.target.checked),
                    className: "accent-blue-500"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "font-mono uppercase text-blue-400", children: D }),
                /* @__PURE__ */ e("span", { children: D === "r" ? "Read (Okuma - 4)" : D === "w" ? "Write (Yazma - 2)" : "Execute / Traverse (1)" })
              ] }, D))
            ]
          },
          k
        )) })
      ] }),
      n === "quota" && a.type === "folder" && /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-white", children: "Bu Klasörün Mevcut Disk Kullanımı" }),
            /* @__PURE__ */ e("div", { className: "text-xs text-slate-400 mt-0.5", children: "Alt dizinlerdeki tüm dosyaların toplam boyutu hesaplanır." })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right font-mono", children: [
            /* @__PURE__ */ e("span", { className: "text-sm font-bold text-blue-400", children: ne.formatBytes(ce) }),
            se.maxBytes && /* @__PURE__ */ t("span", { className: "text-xs text-slate-400", children: [
              " ",
              "/ ",
              ne.formatBytes(se.maxBytes)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs text-slate-300 mb-1", children: "Maksimum Klasör Kotası (MB, boş = Limitsiz/Ana Disk)" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "number",
                min: 1,
                max: 5e3,
                placeholder: "Örn: 100",
                value: se.maxBytes ? Math.round(se.maxBytes / (1024 * 1024)) : "",
                onChange: (k) => {
                  const D = parseInt(k.target.value, 10);
                  he({ maxBytes: isNaN(D) || D <= 0 ? null : D * 1024 * 1024 });
                },
                className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs text-slate-300 mb-1", children: "Maksimum Tekil Dosya Boyutu (MB)" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "number",
                min: 1,
                max: 2e3,
                placeholder: "Örn: 25",
                value: se.maxFileSizeBytes ? Math.round(se.maxFileSizeBytes / (1024 * 1024)) : "",
                onChange: (k) => {
                  const D = parseInt(k.target.value, 10);
                  he({
                    maxFileSizeBytes: isNaN(D) || D <= 0 ? null : D * 1024 * 1024
                  });
                },
                className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs text-slate-300 mb-1", children: "Sadece İzin Verilen Uzantılar (Virgülle, boş = Tümü)" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: ".pdf, .md, .png",
                value: se.allowedExtensions.join(", "),
                onChange: (k) => he({
                  allowedExtensions: k.target.value.split(",").map((D) => D.trim()).filter(Boolean)
                }),
                className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("label", { className: "block text-xs text-slate-300 mb-1", children: "Yasaklı Uzantılar (Blocked Extensions)" }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: ".exe, .bat, .sh",
                value: se.blockedExtensions.join(", "),
                onChange: (k) => he({
                  blockedExtensions: k.target.value.split(",").map((D) => D.trim()).filter(Boolean)
                }),
                className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-rose-300"
              }
            )
          ] })
        ] })
      ] }),
      n === "simulator" && /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800", children: [
          /* @__PURE__ */ e("div", { className: "text-xs text-slate-300", children: "Simüle Edilecek Kullanıcı / Rol Seçin:" }),
          /* @__PURE__ */ e(
            "select",
            {
              value: F,
              onChange: (k) => z(k.target.value),
              className: "bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-medium",
              children: ft.map((k) => /* @__PURE__ */ t("option", { value: k.id, children: [
                k.name,
                " — Role: ",
                k.role.toUpperCase()
              ] }, k.id))
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2.5", children: St.map((k) => {
          const D = le.allowed[k];
          return /* @__PURE__ */ t(
            "div",
            {
              className: `p-3 rounded-xl border flex items-start gap-2.5 ${D ? "bg-emerald-500/10 border-emerald-500/25" : "bg-rose-500/10 border-rose-500/25"}`,
              children: [
                D ? /* @__PURE__ */ e(Ht, { className: "w-4 h-4 text-emerald-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ e($a, { className: "w-4 h-4 text-rose-400 shrink-0 mt-0.5" }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-white", children: Tn[k] }),
                  /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-300 mt-0.5", children: le.reasons[k] })
                ] })
              ]
            },
            k
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3", children: [
      a.type === "folder" ? /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: P,
            onChange: (k) => L(k.target.checked),
            className: "accent-blue-500"
          }
        ),
        /* @__PURE__ */ e("span", { children: "Alt klasör ve dosyalara da递归 (Recursive) olarak uygula" })
      ] }) : /* @__PURE__ */ e("div", {}),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: i,
            className: "px-4 py-2 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800",
            children: "İptal"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            disabled: !b,
            onClick: () => {
              c(a.id, x, P), i();
            },
            className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-semibold text-white shadow-lg shadow-blue-600/25",
            children: "İzin ve Kota Politikalarını Uygula"
          }
        )
      ] })
    ] })
  ] }) });
}, Ma = /* @__PURE__ */ new Set([
  "import",
  "export",
  "from",
  "const",
  "let",
  "var",
  "function",
  "return",
  "async",
  "await",
  "interface",
  "type",
  "class",
  "implements",
  "extends",
  "public",
  "private",
  "protected",
  "readonly",
  "static",
  "namespace",
  "use",
  "try",
  "catch",
  "finally",
  "throw",
  "new",
  "switch",
  "case",
  "default",
  "if",
  "else",
  "for",
  "foreach",
  "while",
  "as",
  "in",
  "of",
  "true",
  "false",
  "null",
  "undefined",
  "void",
  "typeof",
  "keyof",
  "uniform",
  "varying",
  "attribute",
  "precision",
  "mediump",
  "highp"
]), br = /* @__PURE__ */ new Set([
  "Promise",
  "FileNode",
  "FileCategory",
  "IFileManagerConfig",
  "IFileSystemDriver",
  "IPermissionStrategy",
  "IQuotaPolicy",
  "PermissionEvaluationResult",
  "UserIdentity",
  "ClipboardState",
  "SupportedLocale",
  "FileManGL",
  "PermissionEngine",
  "QuotaEngine",
  "FileManGLConnectorController",
  "FileManGLDiskGovernanceService",
  "FileManGLMountOptions",
  "CustomS3Driver",
  "Request",
  "Response",
  "Route",
  "Storage",
  "RuntimeException",
  "RecursiveIteratorIterator",
  "RecursiveDirectoryIterator",
  "FilesystemIterator",
  "React",
  "Set",
  "Map",
  "Array",
  "Record",
  "Partial",
  "HTMLElement",
  "string",
  "number",
  "boolean",
  "int",
  "float",
  "vec2",
  "vec3",
  "vec4"
]), Fn = /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/|^\s*\*.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\$[a-zA-Z_]\w*)|(\b0[oOxX][0-9a-fA-F]+\b|\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*\b)(?=\s*\()|(\b[a-zA-Z_]\w*\b)(?=\s*:)|(\b[a-zA-Z_]\w*\b)|([{}()[\].,:;?]+)|([=+\-*/<>!&|]+)|(\s+)/gm;
class xr {
  constructor() {
    Ee(this, "languageIds", [
      "tsx",
      "typescript",
      "php",
      "json",
      "bash",
      "glsl"
    ]);
  }
  tokenizeLine(l) {
    if (!l)
      return [{ type: "plain", value: "" }];
    const s = [];
    let d = 0;
    const i = new RegExp(Fn.source, "gm");
    let c;
    for (; (c = i.exec(l)) !== null; ) {
      c.index > d && s.push({
        type: "plain",
        value: l.slice(d, c.index)
      });
      const [
        n,
        u,
        x,
        w,
        P,
        L,
        T,
        M,
        v,
        B
      ] = c;
      let F = "plain";
      u !== void 0 ? F = "comment" : x !== void 0 ? F = "string" : w !== void 0 ? F = "variable" : P !== void 0 ? F = "number" : L !== void 0 ? Ma.has(L) ? F = "keyword" : br.has(L) || /^[A-Z]/.test(L) ? F = "type" : F = "function" : T !== void 0 ? Ma.has(T) ? F = "keyword" : F = "property" : M !== void 0 ? Ma.has(M) ? F = "keyword" : br.has(M) || /^[A-Z]/.test(M) ? F = "type" : F = "plain" : v !== void 0 ? F = "punctuation" : B !== void 0 && (F = "operator"), s.push({ type: F, value: n }), d = i.lastIndex;
    }
    return d < l.length && s.push({
      type: "plain",
      value: l.slice(d)
    }), s;
  }
}
const Kt = class Kt {
  static registerStrategy(l) {
    for (const s of l.languageIds)
      this.strategies.set(s, l);
  }
  static tokenizeCode(l, s) {
    const d = this.strategies.get(s) || this.fallbackStrategy;
    return l.split(`
`).map((i) => d.tokenizeLine(i));
  }
  static getTokenClassName(l) {
    switch (l) {
      case "keyword":
        return "text-purple-400 font-semibold";
      case "type":
        return "text-amber-300 font-medium";
      case "string":
        return "text-emerald-300";
      case "comment":
        return "text-slate-500 italic";
      case "number":
        return "text-orange-300";
      case "function":
        return "text-sky-300";
      case "property":
        return "text-cyan-300";
      case "variable":
        return "text-rose-300";
      case "operator":
        return "text-pink-400";
      case "punctuation":
        return "text-slate-400";
      case "decorator":
        return "text-yellow-300";
      default:
        return "text-slate-200";
    }
  }
};
Ee(Kt, "strategies", /* @__PURE__ */ new Map()), Ee(Kt, "fallbackStrategy", new xr()), (() => {
  const l = new xr();
  for (const s of l.languageIds)
    Kt.strategies.set(s, l);
})();
let Ft = Kt;
function In(a) {
  const l = (a.extension || "").toLowerCase();
  return l === ".php" ? "php" : l === ".json" ? "json" : l === ".glsl" || l === ".frag" || l === ".vert" ? "glsl" : l === ".sh" || l === ".bash" ? "bash" : l === ".tsx" || l === ".jsx" ? "tsx" : "typescript";
}
function En(a) {
  const l = a.content || "";
  if (l && !l.startsWith("// High-Speed Demo Node #"))
    return l;
  const s = (a.extension || "").toLowerCase();
  return s === ".php" ? `<?php

namespace App\\Http\\Controllers\\FileManGL;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;
use App\\Services\\FileManGLDiskGovernanceService;

/**
 * ${a.name} — SOLID Disk & ACL Governance Controller
 * POSIX Mode: ${a.security.posix.octal} (${a.security.posix.symbolic})
 */
class ${a.name.replace(/\.[^/.]+$/, "")}
{
    public function __construct(
        private readonly FileManGLDiskGovernanceService $diskGovernance
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $cmd = $request->input('cmd', 'open');
        $safePath = $this->diskGovernance->resolveSafePath($request->input('path', '/'));

        return response()->json([
            'status' => 'ok',
            'nodeId' => '${a.id}',
            'command' => $cmd,
            'resolvedPath' => $safePath,
            'octal' => '${a.security.posix.octal}',
        ]);
    }
}
` : s === ".json" ? JSON.stringify(
    {
      nodeId: a.id,
      fileName: a.name,
      engine: "FileManGL v1.0.4 SOLID + WebGL2",
      security: {
        owner: a.security.ownerName,
        group: a.security.groupName,
        posixOctal: a.security.posix.octal,
        posixSymbolic: a.security.posix.symbolic,
        locked: a.security.locked
      },
      checksumSha256: a.checksumSha256
    },
    null,
    2
  ) : `// ${a.name} — FileManGL v1.0.4 SOLID Module
// Owner: ${a.security.ownerName} • POSIX: ${a.security.posix.octal} (${a.security.posix.symbolic})

import { FileNode, IFileManagerConfig, PermissionEngine } from '@filemangl/core';

export interface ModuleMetadata {
  readonly id: string;
  readonly name: string;
  readonly sizeBytes: number;
  readonly verified: boolean;
}

export function inspectNodeSecurity(
  node: FileNode,
  config: IFileManagerConfig
): ModuleMetadata {
  const octal = PermissionEngine.buildPosixFromOctal('${a.security.posix.octal}');
  return {
    id: '${a.id}',
    name: node.name || '${a.name}',
    sizeBytes: ${a.size},
    verified: octal.owner.r && config.strictPermissionEnforcement,
  };
}
`;
}
const Rn = ({
  node: a,
  canWrite: l,
  denialReason: s,
  onClose: d,
  onSaveContent: i
}) => {
  const c = He(() => In(a), [a]), [n, u] = A(
    () => En(a)
  ), [x, w] = A(!1), P = Ge(null), L = Ge(null), T = He(
    () => Ft.tokenizeCode(n, c),
    [n, c]
  ), M = (v) => {
    const B = v.currentTarget.scrollTop, F = v.currentTarget.scrollLeft;
    P.current && (P.current.scrollTop = B), L.current && (L.current.scrollTop = B, L.current.scrollLeft = F);
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#090d16] border border-slate-700/90 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col h-[82vh]", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-[#0c1220] border-b border-slate-800 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-emerald-500/15 border border-cyan-500/30 text-[#2FF58E] shrink-0", children: /* @__PURE__ */ e(Dr, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { className: "min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white truncate", children: a.name }),
            /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30", children: c }),
            /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300", children: a.security.posix.octal }),
            !l && /* @__PURE__ */ t("span", { className: "px-2 py-0.5 text-[10px] font-mono rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1", children: [
              /* @__PURE__ */ e(bt, { className: "w-3 h-3" }),
              " SALT OKUNUR (Read-Only)"
            ] })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: [
            T.length,
            " satır • ",
            n.length,
            " karakter •",
            " ",
            ne.formatBytes(a.size)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: () => {
              navigator.clipboard.writeText(n), w(!0), setTimeout(() => w(!1), 1800);
            },
            className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition",
            children: x ? /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ e(Ra, { className: "w-3.5 h-3.5 text-emerald-400" }),
              /* @__PURE__ */ e("span", { children: "Kopyalandı" })
            ] }) : /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ e(Oa, { className: "w-3.5 h-3.5 text-slate-300" }),
              /* @__PURE__ */ e("span", { children: "Kopyala" })
            ] })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: d,
            className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800",
            children: /* @__PURE__ */ e(It, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    !l && s && /* @__PURE__ */ t("div", { className: "px-5 py-2 bg-rose-950/60 border-b border-rose-800/50 text-xs text-rose-200 flex items-center gap-2", children: [
      /* @__PURE__ */ e(bt, { className: "w-3.5 h-3.5 text-rose-400 shrink-0" }),
      /* @__PURE__ */ e("span", { children: s })
    ] }),
    /* @__PURE__ */ t("div", { className: "code-surface-dark flex-1 flex overflow-hidden font-mono text-xs bg-[#060911] relative", children: [
      /* @__PURE__ */ e(
        "div",
        {
          ref: P,
          className: "py-4 px-3.5 bg-[#080c15] text-slate-600 text-right select-none border-r border-slate-800/80 overflow-hidden shrink-0",
          children: T.map((v, B) => /* @__PURE__ */ e("div", { className: "leading-6", children: B + 1 }, B))
        }
      ),
      /* @__PURE__ */ t("div", { className: "relative flex-1 h-full overflow-hidden", children: [
        /* @__PURE__ */ e(
          "pre",
          {
            ref: L,
            "aria-hidden": "true",
            className: "absolute inset-0 m-0 p-4 font-mono text-xs leading-6 whitespace-pre overflow-hidden pointer-events-none select-none",
            children: T.map((v, B) => /* @__PURE__ */ e("div", { className: "leading-6 min-h-[24px]", children: v.map((F, z) => /* @__PURE__ */ e(
              "span",
              {
                "data-token-type": F.type,
                className: Ft.getTokenClassName(
                  F.type
                ),
                children: F.value
              },
              z
            )) }, B))
          }
        ),
        /* @__PURE__ */ e(
          "textarea",
          {
            value: n,
            readOnly: !l,
            onChange: (v) => u(v.target.value),
            onScroll: M,
            spellCheck: !1,
            className: "absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-[#2FF58E] selection:bg-cyan-500/30 font-mono text-xs leading-6 focus:outline-none resize-none whitespace-pre overflow-auto"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "px-5 py-3 bg-[#0c1220] border-t border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-slate-400", children: [
        "UTF-8 • Syntax: ",
        c.toUpperCase(),
        " • SHA-256:",
        " ",
        a.checksumSha256.slice(0, 24),
        "..."
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: d,
            className: "px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800",
            children: "Kapat"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            disabled: !l,
            onClick: () => {
              i(a.id, n), d();
            },
            className: "px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-semibold text-white flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ e(Ar, { className: "w-3.5 h-3.5" }),
              " Kaydet (Ctrl+S)"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}, Bn = ({
  nodes: a,
  onClose: l,
  onApplyBatchRename: s
}) => {
  const [d, i] = A(""), [c, n] = A(""), [u, x] = A(""), [w, P] = A(""), [L, T] = A(!0), M = a.map((v, B) => {
    const F = v.type === "folder" ? "" : v.extension;
    let z = F ? v.name.slice(0, -F.length) : v.name;
    u && (z = z.split(u).join(w));
    const m = L ? `_${String(B + 1).padStart(2, "0")}` : "", b = `${d}${z}${c}${m}${F}`;
    return { id: v.id, oldName: v.name, newName: b };
  });
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e(Cl, { className: "w-5 h-5 text-blue-400" }),
        /* @__PURE__ */ t("h3", { className: "text-sm font-bold text-white", children: [
          "Toplu Yeniden Adlandırma (Batch Rename — ",
          a.length,
          " Öğe)"
        ] })
      ] }),
      /* @__PURE__ */ e("button", { onClick: l, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ e(It, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Ön Ek (Prefix)" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              placeholder: "örn: prod_",
              value: d,
              onChange: (v) => i(v.target.value),
              className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Son Ek (Suffix)" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              placeholder: "örn: _v2",
              value: c,
              onChange: (v) => n(v.target.value),
              className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Metin Bul" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: u,
              onChange: (v) => x(v.target.value),
              className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            }
          )
        ] }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Şununla Değiştir" }),
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: w,
              onChange: (v) => P(v.target.value),
              className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-xs text-slate-300 cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: L,
            onChange: (v) => T(v.target.checked),
            className: "accent-blue-500"
          }
        ),
        /* @__PURE__ */ e("span", { children: "Otomatik Sıra Numarası Ekle (_01, _02, ...)" })
      ] }),
      /* @__PURE__ */ e("div", { className: "border border-slate-800 rounded-xl max-h-52 overflow-y-auto", children: /* @__PURE__ */ t("table", { className: "w-full text-xs text-left", children: [
        /* @__PURE__ */ e("thead", { className: "bg-slate-900 text-slate-400 border-b border-slate-800", children: /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("th", { className: "py-2 px-3", children: "Mevcut Ad" }),
          /* @__PURE__ */ e("th", { className: "py-2 px-3", children: "Yeni Ad (Önizleme)" })
        ] }) }),
        /* @__PURE__ */ e("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: M.map((v) => /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-slate-400 truncate max-w-[220px]", children: v.oldName }),
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-emerald-400 font-semibold truncate max-w-[220px]", children: v.newName })
        ] }, v.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex justify-end gap-2", children: [
      /* @__PURE__ */ e(
        "button",
        {
          onClick: l,
          className: "px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300",
          children: "İptal"
        }
      ),
      /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            s(M.map((v) => ({ id: v.id, newName: v.newName }))), l();
          },
          className: "px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white",
          children: "Tümünü Yeniden Adlandır"
        }
      )
    ] })
  ] }) });
}, $n = ({
  node: a,
  onClose: l,
  onSaveShareConfig: s
}) => {
  var v, B, F, z;
  const [d, i] = A(!1), [c, n] = A(
    ((v = a.shareLink) == null ? void 0 : v.passwordProtected) || !1
  ), [u, x] = A(((B = a.shareLink) == null ? void 0 : B.password) || ""), [w, P] = A(
    (F = a.shareLink) != null && F.maxDownloads ? String(a.shareLink.maxDownloads) : "100"
  ), L = ((z = a.shareLink) == null ? void 0 : z.token) || `sh_${a.id.slice(-6)}_${Date.now().toString(36)}`, T = `https://cdn.filemangl.dev/s/${L}`, M = () => {
    var m;
    s(a.id, {
      token: L,
      url: T,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      expiresAt: "2026-12-31T23:59:59Z",
      passwordProtected: c,
      password: c ? u : void 0,
      allowDownload: !0,
      maxDownloads: parseInt(w, 10) || null,
      downloadsCount: ((m = a.shareLink) == null ? void 0 : m.downloadsCount) || 0
    }), l();
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e(ia, { className: "w-5 h-5 text-emerald-400" }),
        /* @__PURE__ */ t("h3", { className: "text-sm font-bold text-white", children: [
          "Paylaşım Bağlantısı — ",
          a.name
        ] })
      ] }),
      /* @__PURE__ */ e("button", { onClick: l, className: "text-slate-400 hover:text-white", children: /* @__PURE__ */ e(It, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-5 space-y-4", children: [
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Genel Erişim URL'si" }),
        /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              readOnly: !0,
              value: T,
              className: "flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-emerald-400"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: () => {
                navigator.clipboard.writeText(T), i(!0), setTimeout(() => i(!1), 1800);
              },
              className: "px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-1",
              children: [
                d ? /* @__PURE__ */ e(Ra, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ e(Oa, { className: "w-4 h-4" }),
                d ? "Kopyalandı" : "Kopyala"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-xs text-slate-200 cursor-pointer", children: [
        /* @__PURE__ */ e(
          "input",
          {
            type: "checkbox",
            checked: c,
            onChange: (m) => n(m.target.checked),
            className: "accent-blue-500"
          }
        ),
        /* @__PURE__ */ e("span", { children: "Parola Koruması Zorunlu Olsun (AES-256 Token)" })
      ] }),
      c && /* @__PURE__ */ e(
        "input",
        {
          type: "password",
          placeholder: "Paylaşım parolası girin...",
          value: u,
          onChange: (m) => x(m.target.value),
          className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
        }
      ),
      /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ e("label", { className: "block text-xs text-slate-400 mb-1", children: "Maksimum İndirme Limiti" }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "number",
            value: w,
            onChange: (m) => P(m.target.value),
            className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex justify-between", children: [
      a.shareLink ? /* @__PURE__ */ e(
        "button",
        {
          onClick: () => {
            s(a.id, void 0), l();
          },
          className: "px-3 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 text-xs hover:bg-rose-500/25",
          children: "Paylaşımı Kaldır"
        }
      ) : /* @__PURE__ */ e("div", {}),
      /* @__PURE__ */ t("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: l,
            className: "px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300",
            children: "İptal"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: M,
            className: "px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white",
            children: "Bağlantıyı Etkinleştir"
          }
        )
      ] })
    ] })
  ] }) });
}, On = ({
  conflicts: a,
  onClose: l,
  onResolve: s
}) => {
  var d;
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-amber-500/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center gap-3", children: [
      /* @__PURE__ */ e(Kl, { className: "w-5 h-5 text-amber-400" }),
      /* @__PURE__ */ t("h3", { className: "text-sm font-bold text-white", children: [
        "Hedef Klasörde Dosya Çakışması (",
        a.length,
        " Öğe)"
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-5 space-y-3 text-xs text-slate-300", children: [
      /* @__PURE__ */ t("p", { children: [
        "Hedef dizinde aynı isme sahip",
        " ",
        /* @__PURE__ */ t("strong", { className: "text-white", children: [
          '"',
          (d = a[0]) == null ? void 0 : d.sourceNode.name,
          '"'
        ] }),
        " ",
        a.length > 1 ? `ve ${a.length - 1} diğer öğe ` : "",
        "zaten mevcut. Nasıl devam etmek istiyorsunuz?"
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s("replace"),
            className: "w-full p-3 rounded-xl bg-slate-900 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 text-left transition",
            children: [
              /* @__PURE__ */ e("div", { className: "font-semibold text-white", children: "Hedefteki Dosyaların Üzerine Yaz (Replace)" }),
              /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-400", children: "Mevcut dosyalar yeni kopyalanan sürümlerle değiştirilir." })
            ]
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s("keep_both"),
            className: "w-full p-3 rounded-xl bg-slate-900 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition",
            children: [
              /* @__PURE__ */ e("div", { className: "font-semibold text-white", children: 'Her İki Dosyayı da Tut (Keep Both — "_kopya" Ekle)' }),
              /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-400", children: "Hiçbir veri silinmez; yeni öğeler otomatik numaralandırılarak yapıştırılır." })
            ]
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s("skip"),
            className: "w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition",
            children: [
              /* @__PURE__ */ e("div", { className: "font-semibold text-white", children: "Çakışan Dosyaları Atla (Skip)" }),
              /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-400", children: "Yalnızca çakışmayan dosyalar aktarılır." })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "px-5 py-3 bg-slate-900 border-t border-slate-800 flex justify-end", children: /* @__PURE__ */ e(
      "button",
      {
        onClick: l,
        className: "px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300",
        children: "İşlemi İptal Et"
      }
    ) })
  ] }) });
}, Gn = ({ node: a, onClose: l }) => {
  var L, T;
  const s = Ge(null), d = Ge(null), [i, c] = A(1), [n, u] = A({
    w: ((L = a.imageMeta) == null ? void 0 : L.width) || 1920,
    h: ((T = a.imageMeta) == null ? void 0 : T.height) || 1080
  }), [x, w] = A(a.durationSec || 0);
  Ve(() => {
    if (a.blobUrl || a.category !== "video") return;
    const M = d.current;
    if (!M) return;
    const v = M.getContext("2d");
    if (!v) return;
    let B = 0, F = 0;
    const z = () => {
      F += 0.025;
      const m = M.width, b = M.height, E = v.createLinearGradient(0, 0, m, b);
      E.addColorStop(0, "#040b18"), E.addColorStop(0.5, "#092247"), E.addColorStop(1, "#051526"), v.fillStyle = E, v.fillRect(0, 0, m, b);
      for (let Z = 0; Z < 5; Z++) {
        v.beginPath(), v.strokeStyle = Z % 2 === 0 ? "rgba(47, 245, 142, 0.35)" : "rgba(0, 200, 255, 0.35)", v.lineWidth = 2.5;
        for (let X = 0; X <= m; X += 12) {
          const $ = b * 0.5 + Math.sin(X * 0.012 + F * (1.2 + Z * 0.3) + Z) * (40 + Z * 16) + Math.cos(X * 6e-3 - F) * 20;
          X === 0 ? v.moveTo(X, $) : v.lineTo(X, $);
        }
        v.stroke();
      }
      v.fillStyle = "rgba(255,255,255,0.85)", v.font = "bold 15px Inter, sans-serif", v.fillText(`FileManGL 60FPS Stream Preview — ${a.name}`, 24, 38), v.font = "12px JetBrains Mono, monospace", v.fillStyle = "#2FF58E", v.fillText(
        `TIME: ${F.toFixed(2)}s • CODEC: H.264 / WebGL2 • SIZE: ${ne.formatBytes(a.size)}`,
        24,
        62
      ), B = requestAnimationFrame(z);
    };
    return B = requestAnimationFrame(z), () => cancelAnimationFrame(B);
  }, [a]);
  const P = (M) => {
    c(M), s.current && (s.current.playbackRate = M);
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#080d18] border border-slate-700/90 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-[#0c1220] border-b border-slate-800 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-[#00C8FF]", children: a.category === "video" ? /* @__PURE__ */ e(Ml, { className: "w-5 h-5" }) : a.category === "audio" ? /* @__PURE__ */ e(hr, { className: "w-5 h-5" }) : /* @__PURE__ */ e(Ll, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { className: "min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white truncate", children: a.name }),
            a.blobUrl && /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-500/20 text-[#2FF58E] border border-emerald-500/40", children: "GERÇEK DOSYA AKIŞI (BLOB STREAM)" })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: [
            a.mimeType,
            " • ",
            ne.formatBytes(a.size),
            a.category === "video" && ` • ${n.w}×${n.h}px`,
            x > 0 && ` • ${x.toFixed(1)} sn`
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2 shrink-0", children: [
        a.category === "video" && a.blobUrl && /* @__PURE__ */ e("div", { className: "hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-[11px] font-mono", children: [0.5, 1, 1.25, 1.5, 2].map((M) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => P(M),
            className: `px-2 py-0.5 rounded transition ${i === M ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: [
              M,
              "x"
            ]
          },
          M
        )) }),
        a.blobUrl && /* @__PURE__ */ t(
          "a",
          {
            href: a.blobUrl,
            download: a.name,
            style: { color: "#ffffff" },
            className: "px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 transition",
            children: [
              /* @__PURE__ */ e(Lr, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ e("span", { children: "İndir" })
            ]
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: l,
            className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800",
            children: /* @__PURE__ */ e(It, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "bg-black flex items-center justify-center relative min-h-[380px] max-h-[72vh] overflow-hidden", children: a.category === "video" && a.blobUrl ? /* @__PURE__ */ e(
      "video",
      {
        ref: s,
        src: a.blobUrl,
        poster: a.thumbnailUrl,
        controls: !0,
        autoPlay: !0,
        playsInline: !0,
        onLoadedMetadata: (M) => {
          const v = M.currentTarget;
          v.videoWidth && v.videoHeight && u({ w: v.videoWidth, h: v.videoHeight }), v.duration && Number.isFinite(v.duration) && w(v.duration);
        },
        className: "w-full max-h-[70vh] object-contain bg-black"
      }
    ) : a.category === "video" ? /* @__PURE__ */ e(
      "canvas",
      {
        ref: d,
        width: 860,
        height: 460,
        className: "w-full max-h-[65vh] object-contain"
      }
    ) : a.category === "audio" && a.blobUrl ? /* @__PURE__ */ t("div", { className: "p-10 w-full flex flex-col items-center gap-5", children: [
      /* @__PURE__ */ e("div", { className: "w-20 h-20 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00C8FF]", children: /* @__PURE__ */ e(hr, { className: "w-10 h-10" }) }),
      /* @__PURE__ */ e("audio", { src: a.blobUrl, controls: !0, autoPlay: !0, className: "w-full max-w-md" })
    ] }) : a.blobUrl ? /* @__PURE__ */ e(
      "iframe",
      {
        src: a.blobUrl,
        title: a.name,
        className: "w-full h-[68vh] bg-white border-0"
      }
    ) : /* @__PURE__ */ t("div", { className: "p-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ e(Bl, { className: "w-8 h-8 text-cyan-400" }),
      /* @__PURE__ */ e("span", { children: "Önizleme hazır." })
    ] }) }),
    /* @__PURE__ */ t("div", { className: "px-5 py-3 bg-[#0c1220] border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400", children: [
      /* @__PURE__ */ t("span", { children: [
        "SHA-256: ",
        /* @__PURE__ */ t("strong", { className: "text-slate-200", children: [
          a.checksumSha256.slice(0, 32),
          "..."
        ] })
      ] }),
      /* @__PURE__ */ t("span", { children: [
        "Sahip: ",
        a.security.ownerName,
        " • POSIX: ",
        a.security.posix.octal
      ] })
    ] })
  ] }) });
}, Un = ({
  locale: a,
  onSelectLocale: l,
  compact: s = !1
}) => {
  const [d, i] = A(!1), c = Ge(null), n = la.find((u) => u.code === a) || la[0];
  return Ve(() => {
    if (!d) return;
    const u = (x) => {
      c.current && !c.current.contains(x.target) && i(!1);
    };
    return window.addEventListener("mousedown", u), () => window.removeEventListener("mousedown", u);
  }, [d]), /* @__PURE__ */ t("div", { ref: c, className: "relative inline-block text-left", children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => i((u) => !u),
        className: `flex items-center justify-center gap-1.5 transition ${s ? "px-2 py-1 rounded-lg text-[11px] hover:bg-slate-800/60 text-slate-200" : "h-[38px] px-2.5 rounded-[8px] bg-white/[0.05] hover:bg-slate-800/70 border border-white/[0.08] text-[12px] font-bold text-slate-100"}`,
        title: `Dil Seçimi: ${n.label} (${n.code.toUpperCase()})`,
        children: [
          s && /* @__PURE__ */ e(zr, { className: "w-3.5 h-3.5 text-[#00C8FF] shrink-0" }),
          /* @__PURE__ */ e("span", { className: "font-bold uppercase tracking-wide", children: n.code }),
          /* @__PURE__ */ e(
            Ba,
            {
              className: `w-3.5 h-3.5 text-slate-400 transition-transform ${d ? "rotate-180 text-white" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: `${d ? "block" : "hidden"} absolute right-0 mt-1.5 w-44 rounded-xl bg-[#0e1525] border border-slate-800 shadow-2xl py-1.5 z-50`,
        children: la.map((u) => {
          const x = u.code === a;
          return /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: () => {
                l(u.code), i(!1);
              },
              title: `${u.label} (${u.code}.json)`,
              className: `w-full px-3 py-1.5 text-xs flex items-center justify-between transition ${x ? "bg-emerald-500/15 text-[#2FF58E] font-semibold" : "text-slate-300 hover:bg-slate-800/80 hover:text-white"}`,
              children: [
                /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ e("span", { children: u.flag }),
                  /* @__PURE__ */ e("span", { children: u.label })
                ] }),
                /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ e("span", { className: "text-[10px] font-mono uppercase opacity-70", children: u.code }),
                  x && /* @__PURE__ */ e(Ra, { className: "w-3.5 h-3.5 text-[#2FF58E]" })
                ] })
              ]
            },
            u.code
          );
        })
      }
    )
  ] });
}, jn = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
let yr = !1;
function Kn() {
  if (yr || typeof document > "u" || (yr = !0, document.querySelector('link[href*="Material+Symbols+Outlined"]'))) return;
  const l = document.createElement("link");
  l.rel = "stylesheet", l.href = jn, document.head.appendChild(l);
}
const hs = ({
  config: a,
  onConfigChange: l,
  isFullscreen: s,
  onToggleFullscreen: d
}) => {
  var Ja;
  Ve(() => {
    Kn();
  }, []);
  const { dict: i } = oa(), c = He(() => a.driverType === "vfs_memory" ? new pl() : a.driverType === "rest_connector" ? new hl(a.connectorEndpoint, a.connectorAuthToken) : new kr(), [a.driverType, a.connectorEndpoint, a.connectorAuthToken]), [n, u] = A([]), [x, w] = A([]), [P, L] = A([]), [T, M] = A([
    {
      id: "tab_root",
      folderId: null,
      navSection: "volume",
      searchQuery: "",
      history: [{ folderId: null, navSection: "volume" }],
      historyIndex: 0
    },
    {
      id: "tab_eng",
      folderId: "fld_engineering",
      navSection: "volume",
      searchQuery: "",
      history: [
        { folderId: null, navSection: "volume" },
        { folderId: "fld_engineering", navSection: "volume" }
      ],
      historyIndex: 1
    }
  ]), [v, B] = A("tab_root"), F = He(
    () => T.find((r) => r.id === v) || T[0],
    [T, v]
  ), z = F.folderId, m = F.navSection, b = F.searchQuery, E = Re(
    (r, o = "volume") => {
      M(
        (p) => p.map((h) => {
          if (h.id !== F.id) return h;
          if (h.folderId === r && h.navSection === o)
            return { ...h, searchQuery: "" };
          const S = [
            ...h.history.slice(0, h.historyIndex + 1),
            { folderId: r, navSection: o }
          ];
          return {
            ...h,
            folderId: r,
            navSection: o,
            searchQuery: "",
            history: S,
            historyIndex: S.length - 1
          };
        })
      ), ie(/* @__PURE__ */ new Set());
    },
    [F.id]
  ), Z = Re(
    (r) => {
      M(
        (o) => o.map((p) => p.id === F.id ? { ...p, searchQuery: r } : p)
      );
    },
    [F.id]
  ), X = Re(
    (r) => {
      E(r, "volume");
    },
    [E]
  ), $ = Re(
    (r) => {
      E(r === "volume" ? z : null, r);
    },
    [E, z]
  ), re = Re(() => {
    M(
      (r) => r.map((o) => {
        if (o.id !== F.id || o.historyIndex <= 0) return o;
        const p = o.historyIndex - 1, h = o.history[p];
        return {
          ...o,
          folderId: h.folderId,
          navSection: h.navSection,
          searchQuery: "",
          historyIndex: p
        };
      })
    ), ie(/* @__PURE__ */ new Set());
  }, [F.id]), se = Re(() => {
    M(
      (r) => r.map((o) => {
        if (o.id !== F.id || o.historyIndex >= o.history.length - 1)
          return o;
        const p = o.historyIndex + 1, h = o.history[p];
        return {
          ...o,
          folderId: h.folderId,
          navSection: h.navSection,
          searchQuery: "",
          historyIndex: p
        };
      })
    ), ie(/* @__PURE__ */ new Set());
  }, [F.id]), he = Re(
    (r = null, o = "volume") => {
      const p = `tab_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, h = {
        id: p,
        folderId: r,
        navSection: o,
        searchQuery: "",
        history: [{ folderId: r, navSection: o }],
        historyIndex: 0
      };
      M((f) => [...f, h]), B(p), ie(/* @__PURE__ */ new Set());
    },
    []
  ), be = Re(
    (r, o) => {
      o == null || o.stopPropagation(), M((p) => {
        if (p.length <= 1) return p;
        const h = p.findIndex((S) => S.id === r), f = p.filter((S) => S.id !== r);
        if (r === F.id) {
          const S = f[Math.max(0, h - 1)] || f[0];
          B(S.id);
        }
        return f;
      });
    },
    [F.id]
  ), O = Re(
    (r) => {
      if (r.navSection === "trash") return i.explorer.recycleBin;
      if (r.navSection === "starred") return i.explorer.starred;
      if (r.navSection === "shared") return i.explorer.shared;
      if (r.navSection === "locked") return i.explorer.lockedVault;
      if (!r.folderId) return i.explorer.rootVolume;
      const o = n.find((p) => p.id === r.folderId);
      return o ? o.name : i.explorer.rootVolume;
    },
    [n, i]
  ), [le, ce] = A(240), [k, D] = A(300), [me, q] = A(!1), [g, ge] = A(!1), C = Ge(null), H = Ge(0), K = Ge(0), V = (r, o) => {
    o.preventDefault(), C.current = r, H.current = o.clientX, K.current = r === "left" ? le : k, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  };
  Ve(() => {
    const r = (p) => {
      if (!C.current) return;
      const h = p.clientX - H.current;
      if (C.current === "left") {
        const f = Math.max(170, Math.min(440, K.current + h));
        ce(f);
      } else {
        const f = Math.max(230, Math.min(500, K.current - h));
        D(f);
      }
    }, o = () => {
      C.current && (C.current = null, document.body.style.cursor = "", document.body.style.userSelect = "");
    };
    return window.addEventListener("mousemove", r), window.addEventListener("mouseup", o), () => {
      window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", o);
    };
  }, []);
  const [xe, U] = A("fld_releases"), [pe, ke] = A(a.defaultViewMode), [De, Pe] = A("date"), [Q, ie] = A(/* @__PURE__ */ new Set()), [Be, $e] = A(null), [Me, _e] = A({
    mode: null,
    nodeIds: [],
    sourceParentId: null,
    timestamp: 0
  }), [N, G] = A(null), [y, ee] = A(ft[0]), [_, we] = A("all"), [R, Se] = A("name"), [Ne, Oe] = A("asc"), [lt, fe] = A(null), [Ue, We] = A(
    /* @__PURE__ */ new Set(["fld_engineering", "fld_webgl", "fld_vault", "fld_releases"])
  ), [xt, et] = A(null), [zt, Ct] = A(null), [yt, Et] = A(null), [Dt, Rt] = A(null), [da, Wt] = A(null), [Br, Ha] = A(!1), [ca, ma] = A(null), [Yt, Bt] = A([]), [$r, ua] = A(!1), [Or, pa] = A(!1), Xt = Ge(/* @__PURE__ */ new Set()), [Te, Fe] = A(null), [gt, Va] = A(null), [Wa, Gr] = A([]), qt = Ge(null), Zt = Ge(null);
  Ve(() => {
    ke(a.defaultViewMode);
  }, [a.defaultViewMode]), Ve(() => {
    c.initialize().then((r) => {
      u(r);
    });
  }, [c]);
  const W = Re(
    (r, o, p, h = "/") => {
      Va({ type: r, title: o, message: p }), a.enableAuditLog && Gr((f) => [
        {
          id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("tr-TR"),
          actorName: y.name,
          actorRole: y.role,
          action: o,
          targetPath: h,
          status: r === "error" ? "denied" : r === "info" || r === "warning" ? "warning" : "allowed",
          details: p
        },
        ...f.slice(0, 49)
      ]);
    },
    [a.enableAuditLog, y]
  );
  Ve(() => {
    if (!gt) return;
    const r = setTimeout(() => Va(null), 4200);
    return () => clearTimeout(r);
  }, [gt]);
  const Le = Re(
    (r, o = !0) => {
      o && a.enableUndoRedo && (w((p) => [...p.slice(-19), n]), L([])), u(r), c.saveAllNodes(r);
    },
    [n, a.enableUndoRedo, c]
  ), ha = Re(() => {
    if (x.length === 0) return;
    const r = x[x.length - 1];
    w((o) => o.slice(0, -1)), L((o) => [n, ...o]), u(r), c.saveAllNodes(r), W("info", "Geri Al (Undo)", "Önceki dosya sistemi durumuna dönüldü.");
  }, [x, n, c, W]), fa = Re(() => {
    if (P.length === 0) return;
    const r = P[0];
    L((o) => o.slice(1)), w((o) => [...o, n]), u(r), c.saveAllNodes(r), W("info", "Yinele (Redo)", "İşlem yeniden uygulandı.");
  }, [P, n, c, W]), qe = He(
    () => z && n.find((r) => r.id === z) || null,
    [n, z]
  ), Ze = He(() => {
    if (!qe) {
      const r = y.role !== "guest" && y.role !== "viewer";
      return {
        allowed: {
          read: !0,
          write: r || !a.strictPermissionEnforcement,
          delete: r || !a.strictPermissionEnforcement,
          rename: r || !a.strictPermissionEnforcement,
          upload: r || !a.strictPermissionEnforcement,
          download: !0,
          share: r || !a.strictPermissionEnforcement,
          chmod: y.role === "admin" || !a.strictPermissionEnforcement,
          lock: r || !a.strictPermissionEnforcement
        },
        reasons: {
          read: "Kök dizin okuma izni aktif.",
          write: r ? "Kök dizin yazma izni aktif." : `Rolünüz (${y.role.toUpperCase()}) kök dizine yazma yetkisine sahip değil.`,
          delete: "",
          rename: "",
          upload: r ? "Yükleme izni aktif." : `Rolünüz (${y.role.toUpperCase()}) dosya yükleyemez.`,
          download: "",
          share: "",
          chmod: "",
          lock: ""
        }
      };
    }
    return de.evaluateNodePermissions(
      qe,
      y,
      n,
      a
    );
  }, [qe, y, n, a]), Ya = He(() => {
    const r = [], o = new Map(n.map((f) => [f.id, f]));
    let p = z ? o.get(z) : void 0, h = 0;
    for (; p && h < 32; )
      h++, r.unshift(p), p = p.parentId ? o.get(p.parentId) : void 0;
    return r;
  }, [n, z]), { visibleNodes: tt, queryElapsedMs: Ur } = He(() => {
    const r = performance.now();
    let o = n.filter((f) => {
      if (m === "trash") return f.trashed;
      if (f.trashed) return !1;
      if (m === "starred") return f.starred;
      if (m === "shared") return !!f.shareLink;
      if (m === "locked") return f.security.locked;
      if (b.trim() !== "") {
        const S = b.toLowerCase();
        return f.name.toLowerCase().includes(S) || f.tags.some((J) => J.toLowerCase().includes(S)) || f.security.ownerName.toLowerCase().includes(S) || f.security.posix.octal.includes(S);
      }
      return f.parentId === z;
    });
    _ !== "all" && (o = o.filter((f) => f.category === _));
    const p = [...o].sort((f, S) => {
      if (f.type === "folder" && S.type !== "folder") return -1;
      if (f.type !== "folder" && S.type === "folder") return 1;
      if (f.type !== "folder" && S.type !== "folder") {
        if (f.isUserUploaded && !S.isUserUploaded) return -1;
        if (!f.isUserUploaded && S.isUserUploaded) return 1;
      }
      let J = 0;
      if (R === "name")
        J = f.name < S.name ? -1 : f.name > S.name ? 1 : 0;
      else if (R === "size") {
        const j = f.type === "folder" ? ne.computeFolderSize(f.id, n) : f.size, te = S.type === "folder" ? ne.computeFolderSize(S.id, n) : S.size;
        J = j - te;
      } else R === "updatedAt" ? J = f.updatedAt < S.updatedAt ? -1 : f.updatedAt > S.updatedAt ? 1 : 0 : R === "type" && (J = f.extension < S.extension ? -1 : f.extension > S.extension ? 1 : 0);
      return Ne === "asc" ? J : -J;
    }), h = (performance.now() - r).toFixed(2);
    return { visibleNodes: p, queryElapsedMs: h };
  }, [
    n,
    m,
    b,
    z,
    _,
    R,
    Ne
  ]), ba = Re(
    (r, o, p) => {
      if (Fe(null), G(null), p && Be) {
        const h = tt.findIndex((S) => S.id === Be), f = tt.findIndex((S) => S.id === r);
        if (h !== -1 && f !== -1) {
          const S = Math.min(h, f), J = Math.max(h, f), j = tt.slice(S, J + 1).map((te) => te.id);
          ie(new Set(j));
          return;
        }
      }
      ie(o ? (h) => {
        const f = new Set(h);
        return f.has(r) ? f.delete(r) : f.add(r), f;
      } : /* @__PURE__ */ new Set([r])), $e(r);
    },
    [Be, tt]
  ), Xa = Re((r) => {
    ie(new Set(r));
  }, []), ye = He(
    () => n.filter((r) => Q.has(r.id)),
    [n, Q]
  ), _t = Re(
    (r) => {
      const o = de.evaluateNodePermissions(
        r,
        y,
        n,
        a
      );
      if (!o.allowed.read) {
        W(
          "error",
          "Erişim Engellendi (EACCES)",
          `"${r.name}" öğesini açma izniniz yok: ${o.reasons.read}`,
          r.name
        );
        return;
      }
      if (r.type === "folder") {
        E(r.id, "volume");
        return;
      }
      if (r.category === "video" || r.category === "audio" || r.extension === ".pdf" && r.blobUrl) {
        Rt(r);
        return;
      }
      if (r.category === "image" && a.enableWebGLImageShaderStudio) {
        Ct(r);
        return;
      }
      a.enableBuiltInCodeEditor && Et(r);
    },
    [n, a, y, E, W]
  ), qa = () => {
    if (!Ze.allowed.write) {
      W(
        "error",
        "Klasör Oluşturma Engellendi",
        Ze.reasons.write || "Bu dizine yazma yetkiniz bulunmuyor."
      );
      return;
    }
    const r = "Yeni_Klasor";
    let o = 1, p = r;
    const h = n.filter(
      (J) => !J.trashed && J.parentId === z
    );
    for (; h.some((J) => J.name.toLowerCase() === p.toLowerCase()); )
      o++, p = `${r}_${o}`;
    const f = (/* @__PURE__ */ new Date()).toISOString(), S = {
      id: `fld_${Date.now()}`,
      parentId: z,
      name: p,
      type: "folder",
      category: "folder",
      extension: "",
      mimeType: "inode/directory",
      size: 0,
      createdAt: f,
      updatedAt: f,
      starred: !1,
      tags: ["Custom"],
      colorTag: "blue",
      trashed: !1,
      checksumSha256: Date.now().toString(16).padStart(64, "0"),
      security: {
        ownerId: y.id,
        ownerName: y.name,
        groupName: y.group,
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0755"),
        acl: ot("open")
      }
    };
    Le([...n, S]), ie(/* @__PURE__ */ new Set([S.id])), fe(S.id), W("success", "Yeni Klasör Oluşturuldu", `"${p}" dizine eklendi.`, p);
  }, vt = Re(
    async (r) => {
      const o = r && r.length > 0 ? r : ye.length > 0 ? ye : qe ? [qe] : [];
      if (o.length === 0) return;
      const p = [], h = [];
      for (const f of o) {
        const S = de.evaluateNodePermissions(
          f,
          y,
          n,
          a
        );
        if (!S.allowed.download || !S.allowed.read) {
          h.push(f.name);
          continue;
        }
        p.push(f);
      }
      if (p.length === 0) {
        W(
          "error",
          "ZIP İndirme Engellendi (EACCES)",
          `"${h[0] || "Seçim"}" öğesini indirme yetkiniz bulunmuyor.`
        );
        return;
      }
      try {
        const f = await ur.buildZipArchive(
          p,
          n
        );
        ur.triggerBrowserDownload(f.blob, f.fileName), W(
          h.length > 0 ? "warning" : "success",
          "ZIP Paketi İndiriliyor",
          `"${f.fileName}" (${f.fileCount} dosya, ${f.folderCount} klasör • ${ne.formatBytes(
            f.totalBytes
          )}) bilgisayarınıza indiriliyor.`,
          f.fileName
        );
      } catch {
        W("error", "ZIP Paketleme Hatası", "ZIP arşivi oluşturulurken bir hata oluştu.");
      }
    },
    [n, a, qe, y, W, ye]
  ), xa = Re(
    (r) => {
      if (r.type === "folder") {
        vt([r]);
        return;
      }
      const o = de.evaluateNodePermissions(
        r,
        y,
        n,
        a
      );
      if (!o.allowed.download) {
        W(
          "error",
          "İndirme Engellendi (EACCES)",
          o.reasons.download || "Bu dosyayı indirme yetkiniz yok.",
          r.name
        );
        return;
      }
      if (typeof document > "u") return;
      const p = document.createElement("a");
      if (r.blobUrl)
        p.href = r.blobUrl;
      else if (r.thumbnailUrl && r.category === "image")
        p.href = r.thumbnailUrl;
      else {
        const h = r.content || JSON.stringify(
          {
            name: r.name,
            size: r.size,
            sha256: r.checksumSha256,
            exportedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          null,
          2
        ), f = new Blob([h], { type: r.mimeType || "text/plain" });
        p.href = URL.createObjectURL(f);
      }
      p.download = r.name, p.click(), W(
        "info",
        "Dosya İndiriliyor",
        `"${r.name}" (${ne.formatBytes(r.size)}) yerel diskinize aktarılıyor.`,
        r.name
      );
    },
    [n, a, y, vt, W]
  ), Qt = (r, o, p, h, f) => {
    if (!Ze.allowed.write) {
      W(
        "error",
        "Dosya Oluşturma Engellendi",
        Ze.reasons.write || "Bu dizine yazma izniniz bulunmuyor."
      );
      return;
    }
    const S = r || `Yeni_Dokuman_${Date.now().toString().slice(-4)}.md`, J = o || `# ${S}

Oluşturan: **${y.name}** (${y.role})
Tarih: ${(/* @__PURE__ */ new Date()).toLocaleString(
      "tr-TR"
    )}
`, j = p || Math.max(256 * 1024, J.length * 1024), te = ne.validateWriteOperation(
      z,
      S,
      j,
      n,
      a
    );
    if (!te.allowed) {
      W("error", "Kota / Güvenlik Politikası Engeli", te.reason || "İşlem reddedildi.");
      return;
    }
    const ze = S.match(/(\.[a-zA-Z0-9]+)$/), ve = ze ? ze[1].toLowerCase() : ".txt", at = (/* @__PURE__ */ new Date()).toISOString(), rt = Date.now().toString(16).padStart(64, "0");
    f && ht.putThumbnail({
      cacheKey: rt,
      thumbnailDataUrl: f,
      width: 1280,
      height: 720,
      palette: ["#3b82f6", "#ec4899", "#10b981"],
      thumbByteSize: j,
      generatedAt: at,
      generationMs: 1.2,
      fromCache: !1
    });
    const At = {
      id: `fil_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      parentId: z,
      name: S,
      type: "file",
      category: h || (ve === ".png" ? "image" : ve === ".ts" ? "code" : "document"),
      extension: ve,
      mimeType: ve === ".png" ? "image/png" : "text/markdown",
      size: j,
      createdAt: at,
      updatedAt: at,
      starred: !1,
      tags: ["Created"],
      trashed: !1,
      content: J,
      blobUrl: f,
      thumbnailUrl: f,
      isUserUploaded: !!f,
      thumbnailMeta: f ? {
        thumbByteSize: j,
        generationMs: 1.2,
        fromCache: !1,
        format: "image/png"
      } : void 0,
      imageMeta: h === "image" || ve === ".png" ? {
        width: 1920,
        height: 1080,
        palette: ["#3b82f6", "#ec4899", "#10b981"],
        pattern: "nebula"
      } : void 0,
      checksumSha256: rt,
      security: {
        ownerId: y.id,
        ownerName: y.name,
        groupName: y.group,
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0644"),
        acl: []
      }
    };
    Le([At, ...n]), ie(/* @__PURE__ */ new Set([At.id])), r || fe(At.id), W(
      "success",
      "Dosya Diske Yazıldı",
      `"${S}" (${ne.formatBytes(j)}) oluşturuldu.`,
      S
    );
  }, ya = async (r, o = z) => {
    var er, tr;
    const p = Array.from(r || []);
    if (p.length === 0) return;
    const h = o && n.find((oe) => oe.id === o) || null, f = h ? de.evaluateNodePermissions(
      h,
      y,
      n,
      a
    ) : Ze;
    if (!f.allowed.upload) {
      W(
        "error",
        "Yükleme İzni Reddedildi (EACCES)",
        f.reasons.upload || "Bu klasöre dosya yükleme yetkiniz yok."
      );
      return;
    }
    const S = !!((tr = (er = globalThis.process) == null ? void 0 : er.env) != null && tr.VITEST), J = (oe) => S ? Promise.resolve() : new Promise((ue) => setTimeout(ue, oe)), j = (oe) => {
      const ue = oe.name.match(/(\.[a-zA-Z0-9]+)$/), Ce = ue ? ue[1].toLowerCase() : "";
      let Y = "document";
      return [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".bmp", ".ico"].includes(Ce) ? Y = "image" : [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".php",
        ".py",
        ".glsl",
        ".css",
        ".html",
        ".c",
        ".cpp",
        ".rs",
        ".go"
      ].includes(Ce) ? Y = "code" : [".zip", ".rar", ".tar", ".gz", ".7z"].includes(Ce) ? Y = "archive" : [".mp4", ".webm", ".mov", ".mkv", ".avi", ".m4v"].includes(Ce) ? Y = "video" : [".mp3", ".wav", ".ogg", ".flac", ".m4a"].includes(Ce) ? Y = "audio" : [".json", ".sql", ".csv", ".xml", ".yaml", ".yml"].includes(Ce) ? Y = "data" : oe.type.startsWith("video/") ? Y = "video" : oe.type.startsWith("image/") ? Y = "image" : oe.type.startsWith("audio/") && (Y = "audio"), { ext: Ce, cat: Y };
    }, te = async (oe) => {
      var ue;
      try {
        if (typeof window < "u" && ((ue = window.crypto) != null && ue.subtle)) {
          const Y = await oe.slice(0, Math.min(oe.size, 16777216)).arrayBuffer(), Ie = await window.crypto.subtle.digest("SHA-256", Y);
          return Array.from(new Uint8Array(Ie)).map((Qe) => Qe.toString(16).padStart(2, "0")).join("");
        }
      } catch {
      }
      return `${oe.size.toString(16)}${Date.now().toString(16)}`.padStart(64, "a");
    }, ze = (oe) => new Promise((ue) => {
      if (typeof document > "u") {
        ue({ width: 1920, height: 1080, durationSec: 0 });
        return;
      }
      let Ce = !1;
      const Y = document.createElement("video");
      Y.preload = "metadata", Y.muted = !0, Y.playsInline = !0;
      const Ie = (Ae) => {
        Ce || (Ce = !0, clearTimeout(Qe), Y.removeAttribute("src"), ue(Ae));
      }, Qe = setTimeout(() => {
        Ie({
          width: Y.videoWidth || 1920,
          height: Y.videoHeight || 1080,
          durationSec: Number.isFinite(Y.duration) ? Y.duration : 0
        });
      }, 450);
      Y.onloadedmetadata = () => {
        const Ae = Number.isFinite(Y.duration) ? Y.duration : 0, je = Ae > 0.5 ? Math.min(1.2, Ae * 0.2) : 0.05;
        try {
          Y.currentTime = je;
        } catch {
          Ie({
            width: Y.videoWidth || 1920,
            height: Y.videoHeight || 1080,
            durationSec: Ae
          });
        }
      }, Y.onseeked = () => {
        let Ae;
        try {
          const je = Y.videoWidth || 1280, Ke = Y.videoHeight || 720, Ye = document.createElement("canvas"), ut = 360, st = Math.max(200, Math.round(Ke / je * ut));
          Ye.width = ut, Ye.height = st;
          const Gt = Ye.getContext("2d");
          Gt && (Gt.drawImage(Y, 0, 0, ut, st), Ae = Ye.toDataURL("image/jpeg", 0.85));
        } catch {
          Ae = void 0;
        }
        Ie({
          width: Y.videoWidth || 1920,
          height: Y.videoHeight || 1080,
          durationSec: Number.isFinite(Y.duration) ? Y.duration : 0,
          thumbnailUrl: Ae
        });
      }, Y.onerror = () => {
        Ie({ width: 1920, height: 1080, durationSec: 0 });
      }, Y.src = oe;
    });
    let ve = [...n];
    const at = /* @__PURE__ */ new Set(), rt = [], At = (oe, ue) => {
      let Ce = ue, Y = h ? h.name : i.explorer.rootVolume, Ie;
      for (let Qe = 0; Qe < oe.length; Qe++) {
        const Ae = oe[Qe].trim();
        if (!Ae) continue;
        let je = ve.find(
          (Ke) => !Ke.trashed && Ke.type === "folder" && Ke.parentId === Ce && Ke.name.toLowerCase() === Ae.toLowerCase()
        );
        if (!je) {
          const Ke = (/* @__PURE__ */ new Date()).toISOString();
          je = {
            id: `fld_up_${Date.now()}_${Qe}_${Math.random().toString(36).slice(2, 6)}`,
            parentId: Ce,
            name: Ae,
            type: "folder",
            category: "folder",
            extension: "",
            mimeType: "inode/directory",
            size: 0,
            createdAt: Ke,
            updatedAt: Ke,
            starred: !1,
            tags: ["UploadedFolder"],
            colorTag: "amber",
            trashed: !1,
            isUserUploaded: !0,
            checksumSha256: Date.now().toString(16).padStart(64, "d"),
            security: {
              ownerId: y.id,
              ownerName: y.name,
              groupName: y.group,
              inheritFromParent: !0,
              locked: !1,
              posix: de.buildPosixFromOctal("0755"),
              acl: ot("open")
            }
          }, ve = [je, ...ve];
        }
        Qe === 0 && (Ie = je.id, at.add(je.id)), rt.push(je.id), Ce = je.id, Y = je.name;
      }
      return {
        leafParentId: Ce,
        leafFolderLabel: Y,
        rootFolderId: Ie
      };
    }, va = p.map((oe, ue) => {
      const Ce = (oe.relativePath || oe.webkitRelativePath || oe.name).replace(/\\/g, "/"), Y = Ce.split("/").filter(Boolean), Ie = Y.length > 1 ? Y.slice(0, -1) : [], Qe = Ie.length > 0 ? Ie[0] : void 0, Ae = Ie.length > 0 ? At(Ie, o) : {
        leafParentId: o,
        leafFolderLabel: h ? h.name : i.explorer.rootVolume,
        rootFolderId: void 0
      }, { ext: je, cat: Ke } = j(oe), Ye = `uq_${Date.now()}_${ue}_${Math.random().toString(36).slice(2, 6)}`, ut = {
        id: Ye,
        fileName: oe.name,
        relativePath: Ce,
        rootUploadedFolderName: Qe,
        rootUploadedFolderId: Ae.rootFolderId,
        targetFolderId: Ae.leafParentId,
        targetFolderLabel: Ae.leafFolderLabel,
        category: Ke,
        totalBytes: oe.size,
        bytesTransferred: 0,
        percent: 0,
        status: "queued",
        stage: "%0 • Kuyrukta bekliyor..."
      };
      return {
        file: oe,
        ext: je,
        cat: Ke,
        queueId: Ye,
        queueItem: ut,
        leafParentId: Ae.leafParentId
      };
    });
    rt.length > 0 && We((oe) => {
      const ue = new Set(oe);
      return rt.forEach((Ce) => ue.add(Ce)), ue;
    }), ua(!0), pa(!1), Bt((oe) => [...va.map((ue) => ue.queueItem), ...oe]);
    const wt = (oe, ue) => {
      Bt(
        (Ce) => Ce.map((Y) => Y.id === oe ? { ...Y, ...ue } : Y)
      );
    }, mt = [];
    for (let oe = 0; oe < va.length; oe++) {
      const { file: ue, ext: Ce, cat: Y, queueId: Ie, leafParentId: Qe } = va[oe], Ae = ue.size;
      if (Xt.current.has(Ie)) {
        wt(Ie, {
          status: "cancelled",
          stage: "İptal edildi"
        });
        continue;
      }
      const je = ne.validateWriteOperation(
        Qe,
        ue.name,
        Ae,
        ve,
        a
      );
      if (!je.allowed) {
        wt(Ie, {
          status: "error",
          stage: je.reason || "Kota veya uzantı engeli",
          errorMessage: je.reason
        }), W("error", "Yükleme Engellendi", je.reason || ue.name, ue.name);
        continue;
      }
      if (wt(Ie, {
        status: "uploading",
        percent: 20,
        bytesTransferred: Math.round(Ae * 0.2),
        stage: "Binary Stream Okunuyor..."
      }), await J(20), Xt.current.has(Ie)) {
        wt(Ie, { status: "cancelled", stage: "İptal edildi" });
        continue;
      }
      const Ke = await te(ue);
      wt(Ie, {
        status: "uploading",
        percent: 45,
        bytesTransferred: Math.round(Ae * 0.45),
        stage: "SHA-256 Özeti Doğrulandı..."
      }), await J(20);
      let Ye;
      try {
        typeof URL < "u" && typeof URL.createObjectURL == "function" ? Ye = URL.createObjectURL(ue) : Ye = `blob:local/${encodeURIComponent(ue.name)}`;
      } catch {
        Ye = `blob:local/${encodeURIComponent(ue.name)}`;
      }
      let ut;
      if ((Y === "code" || Y === "document" || Y === "data") && Ce !== ".pdf")
        try {
          Ae <= 2 * 1024 * 1024 && (ut = await ue.text());
        } catch {
          ut = void 0;
        }
      wt(Ie, {
        status: "uploading",
        percent: 75,
        bytesTransferred: Math.round(Ae * 0.75),
        stage: Y === "video" ? "Video Kodek & Poster Karesi Çıkarılıyor..." : Y === "image" ? "WebP Thumbnail & Palet Önbellekleniyor..." : "IndexedDB Bloklarına Yazılıyor..."
      }), await J(20);
      let st, Gt, kt, wa = ["#06b6d4", "#6366f1", "#f43f5e"], ta;
      if (Y === "video" && Ye) {
        const pt = performance.now();
        await ht.persistBinaryBlob(Ke, ue);
        const Ut = await ht.getThumbnail(Ke), Tt = await ze(Ye);
        st = (Ut == null ? void 0 : Ut.thumbnailDataUrl) || Tt.thumbnailUrl, Gt = Tt.durationSec, kt = { width: Tt.width, height: Tt.height };
        const rr = Number((performance.now() - pt).toFixed(2)), lr = st ? Math.round(st.length * 3 / 4) : 16384;
        st && !Ut && await ht.putThumbnail({
          cacheKey: Ke,
          thumbnailDataUrl: st,
          width: Tt.width,
          height: Tt.height,
          palette: wa,
          thumbByteSize: lr,
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          generationMs: rr,
          fromCache: !1
        }), ta = {
          thumbByteSize: lr,
          generationMs: rr,
          fromCache: !!Ut,
          format: "image/jpeg"
        };
      } else if (Y === "image" && Ye) {
        const pt = await ht.generateAndCacheImageThumbnail(
          ue,
          Ke,
          Ye,
          320
        );
        st = pt.thumbnailDataUrl || Ye, kt = { width: pt.width, height: pt.height }, wa = pt.palette, ta = {
          thumbByteSize: pt.thumbByteSize,
          generationMs: pt.generationMs,
          fromCache: pt.fromCache,
          format: "image/webp"
        };
      } else
        await ht.persistBinaryBlob(Ke, ue);
      wt(Ie, {
        status: "uploading",
        percent: 95,
        bytesTransferred: Math.round(Ae * 0.95),
        stage: "VFS Dizin Ağacına Kaydediliyor..."
      }), await J(15);
      const ar = (/* @__PURE__ */ new Date()).toISOString(), ka = {
        id: `up_${Date.now()}_${oe}_${Math.random().toString(36).slice(2, 7)}`,
        parentId: Qe,
        name: ue.name,
        type: Y === "archive" ? "archive" : "file",
        category: Y,
        extension: Ce,
        mimeType: ue.type || (Y === "video" ? "video/mp4" : Y === "audio" ? "audio/mpeg" : Y === "image" ? "image/png" : "application/octet-stream"),
        size: Ae,
        createdAt: ar,
        updatedAt: ar,
        starred: !1,
        tags: ["Uploaded", ...ta ? ["ThumbCached"] : []],
        colorTag: "emerald",
        trashed: !1,
        content: ut,
        blobUrl: Ye,
        thumbnailUrl: st,
        thumbnailMeta: ta,
        durationSec: Gt,
        isUserUploaded: !0,
        imageMeta: Y === "image" || Y === "video" ? {
          width: (kt == null ? void 0 : kt.width) || 1920,
          height: (kt == null ? void 0 : kt.height) || 1080,
          palette: wa,
          pattern: "aurora"
        } : void 0,
        checksumSha256: Ke,
        security: {
          ownerId: y.id,
          ownerName: y.name,
          groupName: y.group,
          inheritFromParent: !0,
          locked: !1,
          posix: de.buildPosixFromOctal("0644"),
          acl: []
        }
      };
      mt.push(ka), ve = [ka, ...ve], wt(Ie, {
        status: "completed",
        percent: 100,
        bytesTransferred: Ae,
        stage: "Tamamlandı (%100)",
        createdNodeId: ka.id
      });
    }
    if (mt.length > 0 || at.size > 0) {
      Le(ve), at.size > 0 ? ie(new Set(Array.from(at))) : ie(new Set(mt.map((ue) => ue.id)));
      const oe = mt[0];
      W(
        "success",
        "Gerçek Dosya Yükleme Tamamlandı",
        at.size > 0 ? `Klasör yapısı ve ${mt.length} dosya (${ne.formatBytes(
          mt.reduce((ue, Ce) => ue + Ce.size, 0)
        )}) başarıyla diske aktarıldı.` : mt.length === 1 && oe ? `"${oe.name}" (${ne.formatBytes(oe.size)} • SHA-256: ${oe.checksumSha256.slice(0, 10)}…) başarıyla aktarıldı.` : `${mt.length} dosya (${ne.formatBytes(
          mt.reduce((ue, Ce) => ue + Ce.size, 0)
        )}) başarıyla diske aktarıldı.`,
        (oe == null ? void 0 : oe.name) || "Klasör"
      );
    }
  }, jr = async (r) => {
    const o = r.target.files;
    !o || o.length === 0 || (await ya(o, z), r.target.value = "");
  }, Kr = async (r) => {
    const o = r.target.files;
    !o || o.length === 0 || (await ya(o, z), r.target.value = "");
  }, Hr = Re((r) => {
    Xt.current.add(r), Bt(
      (o) => o.map(
        (p) => p.id === r ? { ...p, status: "cancelled", stage: "İptal edildi" } : p
      )
    );
  }, []), Vr = Re(() => {
    Bt(
      (r) => r.map((o) => o.status === "uploading" || o.status === "queued" ? (Xt.current.add(o.id), { ...o, status: "cancelled", stage: "İptal edildi" }) : o)
    );
  }, []), Wr = (r, o) => {
    fe(null);
    const p = o.trim();
    if (!p) return;
    const h = n.find((J) => J.id === r);
    if (!h || h.name === p) return;
    const f = de.evaluateNodePermissions(
      h,
      y,
      n,
      a
    );
    if (!f.allowed.rename) {
      W(
        "error",
        "Yeniden Adlandırma Reddedildi",
        f.reasons.rename,
        h.name
      );
      return;
    }
    if (h.type !== "folder") {
      const J = ne.validateWriteOperation(
        h.parentId,
        p,
        0,
        n,
        a
      );
      if (!J.allowed) {
        W("error", "Uzantı Politikası Engeli", J.reason || p);
        return;
      }
    }
    const S = n.map(
      (J) => J.id === r ? { ...J, name: p, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : J
    );
    Le(S), W("success", "Yeniden Adlandırıldı", `"${h.name}" -> "${p}"`, p);
  }, Lt = Re(
    (r) => {
      if (Q.size === 0) return;
      const o = n.filter((f) => Q.has(f.id)), p = [], h = [];
      for (const f of o) {
        const S = de.evaluateNodePermissions(
          f,
          y,
          n,
          a
        );
        if (r === "copy" && !S.allowed.read) {
          h.push({ name: f.name, reason: S.reasons.read });
          continue;
        }
        if (r === "cut" && (!S.allowed.write || !S.allowed.delete)) {
          h.push({
            name: f.name,
            reason: S.reasons.delete || S.reasons.write
          });
          continue;
        }
        p.push(f.id);
      }
      if (p.length === 0) {
        const f = h[0];
        W(
          "error",
          r === "copy" ? "Kopyalama Engellendi" : "Kesme (Taşıma) Engellendi",
          f ? `"${f.name}": ${f.reason}` : "İzin yetersiz."
        );
        return;
      }
      _e({
        mode: r,
        nodeIds: p,
        sourceParentId: z,
        timestamp: Date.now()
      }), h.length > 0 ? W(
        "warning",
        r === "copy" ? "Kısmi Kopyalama (Ctrl+C)" : "Kısmi Kesme (Ctrl+X)",
        `${p.length} öğe panoya alındı. ${h.length} kilitli/izinsiz öğe atlandı (${h.map((f) => f.name).join(", ")}).`
      ) : W(
        "info",
        r === "copy" ? "Panoya Kopyalandı (Ctrl+C)" : "Panoya Kesildi (Ctrl+X)",
        `${p.length} öğe panoya alındı. Diğer sekmelerde veya klasörlerde Ctrl+V ile yapıştırabilirsiniz.`
      );
    },
    [n, a, z, y, W, Q]
  ), $t = Re(
    (r, o) => {
      if (!Me.mode || Me.nodeIds.length === 0) return;
      if (r) {
        const j = n.find((te) => te.id === r);
        if (j) {
          const te = de.evaluateNodePermissions(
            j,
            y,
            n,
            a
          );
          if (!te.allowed.write) {
            W(
              "error",
              "Yapıştırma Reddedildi",
              `"${j.name}" klasörüne yazma izniniz yok: ${te.reasons.write}`
            );
            return;
          }
        }
      } else if (!Ze.allowed.write) {
        W("error", "Yapıştırma Reddedildi", Ze.reasons.write);
        return;
      }
      const p = n.filter((j) => Me.nodeIds.includes(j.id)), h = n.filter(
        (j) => !j.trashed && j.parentId === r
      ), f = [];
      for (const j of p) {
        const te = h.find(
          (ze) => ze.name.toLowerCase() === j.name.toLowerCase() && ze.id !== j.id
        );
        te && f.push({
          sourceNode: j,
          existingNode: te,
          targetParentId: r
        });
      }
      if (f.length > 0 && !o) {
        ma(f);
        return;
      }
      let S = [...n];
      const J = (/* @__PURE__ */ new Date()).toISOString();
      for (const j of p) {
        if (j.id === r) continue;
        const te = S.find(
          (ze) => !ze.trashed && ze.parentId === r && ze.name.toLowerCase() === j.name.toLowerCase() && ze.id !== j.id
        );
        if (!(te && o === "skip")) {
          if (Me.mode === "copy") {
            const ze = ne.validateWriteOperation(
              r,
              j.name,
              j.size,
              S,
              a
            );
            if (!ze.allowed) {
              W("error", "Kota Sınırı Aşıldı", ze.reason || j.name);
              return;
            }
            te && o === "replace" && (S = S.filter((rt) => rt.id !== te.id));
            let ve = j.name;
            if (te && o === "keep_both" || j.parentId === r) {
              const rt = j.type === "folder" ? "" : j.extension;
              ve = `${rt ? j.name.slice(0, -rt.length) : j.name}_kopya${rt}`;
            }
            const at = {
              ...JSON.parse(JSON.stringify(j)),
              id: `${j.type === "folder" ? "fld" : "fil"}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
              parentId: r,
              name: ve,
              createdAt: J,
              updatedAt: J
            };
            S.push(at);
          } else if (Me.mode === "cut") {
            te && o === "replace" && (S = S.filter((ve) => ve.id !== te.id));
            let ze = j.name;
            if (te && o === "keep_both") {
              const ve = j.type === "folder" ? "" : j.extension;
              ze = `${ve ? j.name.slice(0, -ve.length) : j.name}_tasinan${ve}`;
            }
            S = S.map(
              (ve) => ve.id === j.id ? { ...ve, parentId: r, name: ze, updatedAt: J } : ve
            );
          }
        }
      }
      Me.mode === "cut" && _e({ mode: null, nodeIds: [], sourceParentId: null, timestamp: 0 }), ma(null), Le(S), W(
        "success",
        "Yapıştırma Tamamlandı (Ctrl+V)",
        `${p.length} öğe hedef dizine aktarıldı.`
      );
    },
    [n, Me, Le, a, Ze, y, W]
  ), Mt = (r, o) => {
    const p = r ? n.find((j) => j.id === r) : null;
    if (r && !p) return;
    if (p) {
      const j = de.evaluateNodePermissions(
        p,
        y,
        n,
        a
      );
      if (!j.allowed.write) {
        W(
          "error",
          "Taşıma Engellendi",
          `"${p.name}" klasörüne yazma izniniz yok: ${j.reasons.write}`
        );
        return;
      }
    }
    const h = [], f = [];
    for (const j of o) {
      if (j === r) continue;
      const te = n.find((ve) => ve.id === j);
      if (!te || te.parentId === r) continue;
      const ze = de.evaluateNodePermissions(
        te,
        y,
        n,
        a
      );
      if (!ze.allowed.delete || !ze.allowed.write) {
        f.push({
          id: te.id,
          name: te.name,
          reason: ze.reasons.delete || ze.reasons.write
        });
        continue;
      }
      h.push(j);
    }
    if (h.length === 0) {
      f.length > 0 && W(
        "error",
        "Taşıma Reddedildi",
        `"${f[0].name}" taşınamaz: ${f[0].reason}`
      );
      return;
    }
    const S = n.map(
      (j) => h.includes(j.id) ? { ...j, parentId: r, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : j
    );
    Le(S), ie(new Set(f.map((j) => j.id)));
    const J = p ? p.name : `${a.volumeName} (D:)`;
    f.length > 0 ? W(
      "warning",
      "Taşınabilir Öğeler Aktarıldı",
      `${h.length} öğe "${J}" konumuna taşındı. Kilitli/izinsiz ${f.length} öğe (${f.map((j) => j.name).join(", ")}) yerinde bırakıldı.`
    ) : W(
      "success",
      "Sürükle & Bırak Taşıma",
      `${h.length} öğe "${J}" konumuna taşındı.`
    );
  }, Jt = Re(
    (r = !1) => {
      if (Q.size === 0) return;
      const o = n.filter((f) => Q.has(f.id)), p = /* @__PURE__ */ new Set(), h = [];
      for (const f of o) {
        const S = de.evaluateNodePermissions(
          f,
          y,
          n,
          a
        );
        if (!S.allowed.delete) {
          h.push({
            id: f.id,
            name: f.name,
            reason: S.reasons.delete
          });
          continue;
        }
        p.add(f.id);
      }
      if (p.size === 0) {
        const f = h[0];
        W(
          "error",
          "Silme İşlemi Reddedildi (EACCES)",
          f ? `"${f.name}": ${f.reason}` : "Silme yetkiniz yok.",
          f == null ? void 0 : f.name
        );
        return;
      }
      if (!a.enableRecycleBin || r || m === "trash") {
        const f = n.filter((S) => !p.has(S.id));
        Le(f), ie(new Set(h.map((S) => S.id))), W(
          h.length > 0 ? "warning" : "info",
          "Kalıcı Olarak Silindi",
          h.length > 0 ? `${p.size} öğe silindi, kilitli/izinsiz ${h.length} öğe atlandı.` : `${p.size} öğe diskten kalıcı olarak kaldırıldı.`
        );
      } else {
        const f = (/* @__PURE__ */ new Date()).toISOString(), S = n.map(
          (J) => p.has(J.id) ? { ...J, trashed: !0, trashedAt: f } : J
        );
        Le(S), ie(new Set(h.map((J) => J.id))), W(
          h.length > 0 ? "warning" : "info",
          "Geri Dönüşüm Kutusuna Taşındı",
          h.length > 0 ? `${p.size} öğe çöp kutusuna gönderildi, kilitli/izinsiz ${h.length} öğe atlandı.` : `${p.size} öğe çöp kutusuna gönderildi.`
        );
      }
    },
    [n, Le, a, y, m, W, Q]
  ), Yr = () => {
    if (Q.size === 0) return;
    const r = n.map(
      (o) => Q.has(o.id) ? { ...o, trashed: !1, trashedAt: void 0 } : o
    );
    Le(r), ie(/* @__PURE__ */ new Set()), W("success", "Geri Yüklendi", "Seçili öğeler orijinal konumlarına geri yüklendi.");
  }, Xr = () => {
    if (ye.length === 0) return;
    if (!Ze.allowed.write) {
      W("error", "Arşivleme Engellendi", Ze.reasons.write);
      return;
    }
    const r = ye.reduce((J, j) => J + (j.size || 2 * 1024 * 1024), 0), o = Math.max(512 * 1024, Math.round(r * 0.62)), p = ye.length === 1 ? `${ye[0].name.replace(/\.[^/.]+$/, "")}_bundle.zip` : `archive_${Date.now().toString().slice(-4)}.zip`, h = ne.validateWriteOperation(
      z,
      p,
      o,
      n,
      a
    );
    if (!h.allowed) {
      W("error", "Kota Sınırı Aşıldı", h.reason || p);
      return;
    }
    const f = (/* @__PURE__ */ new Date()).toISOString(), S = {
      id: `zip_${Date.now()}`,
      parentId: z,
      name: p,
      type: "archive",
      category: "archive",
      extension: ".zip",
      mimeType: "application/zip",
      size: o,
      createdAt: f,
      updatedAt: f,
      starred: !1,
      tags: ["Compressed", `${ye.length}-items`],
      colorTag: "amber",
      trashed: !1,
      archivedChildrenSnapshot: JSON.parse(JSON.stringify(ye)),
      checksumSha256: Date.now().toString(16).padStart(64, "c"),
      security: {
        ownerId: y.id,
        ownerName: y.name,
        groupName: y.group,
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0644"),
        acl: []
      }
    };
    Le([...n, S]), ie(/* @__PURE__ */ new Set([S.id])), W(
      "success",
      "ZIP Arşivi Oluşturuldu",
      `"${p}" (${ne.formatBytes(o)}) sıkıştırıldı.`
    );
  }, qr = (r) => {
    if (!Ze.allowed.write) {
      W("error", "Çıkartma Engellendi", Ze.reasons.write);
      return;
    }
    const o = r.name.replace(/\.(zip|tar|gz)$/i, "") + "_extracted", p = (/* @__PURE__ */ new Date()).toISOString(), h = `fld_ext_${Date.now()}`, f = {
      id: h,
      parentId: z,
      name: o,
      type: "folder",
      category: "folder",
      extension: "",
      mimeType: "inode/directory",
      size: 0,
      createdAt: p,
      updatedAt: p,
      starred: !1,
      tags: ["Extracted"],
      colorTag: "emerald",
      trashed: !1,
      checksumSha256: Date.now().toString(16).padStart(64, "e"),
      security: {
        ownerId: y.id,
        ownerName: y.name,
        groupName: y.group,
        inheritFromParent: !0,
        locked: !1,
        posix: de.buildPosixFromOctal("0755"),
        acl: []
      }
    }, J = (r.archivedChildrenSnapshot || [
      {
        id: `fil_manifest_${Date.now()}`,
        parentId: h,
        name: "PACKAGE_MANIFEST.json",
        type: "file",
        category: "data",
        extension: ".json",
        mimeType: "application/json",
        size: 1.2 * 1024 * 1024,
        createdAt: p,
        updatedAt: p,
        starred: !1,
        tags: ["Extracted"],
        trashed: !1,
        content: JSON.stringify(
          { extractedFrom: r.name, timestamp: p, verified: !0 },
          null,
          2
        ),
        checksumSha256: Date.now().toString(16).padStart(64, "f"),
        security: {
          ownerId: y.id,
          ownerName: y.name,
          groupName: y.group,
          inheritFromParent: !0,
          locked: !1,
          posix: de.buildPosixFromOctal("0644"),
          acl: []
        }
      }
    ]).map((j, te) => ({
      ...j,
      id: `ext_${Date.now()}_${te}`,
      parentId: h,
      updatedAt: p
    }));
    Le([...n, f, ...J]), W(
      "success",
      "Arşiv Klasöre Çıkartıldı",
      `"${o}" dizinine ${J.length} öğe çıkartıldı.`
    );
  }, Zr = (r, o, p) => {
    const h = /* @__PURE__ */ new Set([r]);
    if (p) {
      let S = !0;
      for (; S; ) {
        S = !1;
        for (const J of n)
          J.parentId && h.has(J.parentId) && !h.has(J.id) && (h.add(J.id), S = !0);
      }
    }
    const f = n.map((S) => S.id === r ? { ...S, security: o, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : p && h.has(S.id) ? {
      ...S,
      security: {
        ...S.security,
        ownerId: o.ownerId,
        ownerName: o.ownerName,
        groupName: o.groupName,
        locked: o.locked,
        posix: o.posix,
        acl: o.acl
      }
    } : S);
    Le(f), W(
      "success",
      "İzin & Kota Politikası Güncellendi",
      `POSIX ${o.posix.octal} ve ACL kuralları kaydedildi.`
    );
  }, Qr = (r) => {
    const o = n.map((p) => p.id === r.id ? { ...p, starred: !p.starred } : p);
    Le(o, !1);
  }, Jr = (r) => {
    const o = de.evaluateNodePermissions(
      r,
      y,
      n,
      a
    );
    if (!o.allowed.lock && y.role !== "admin") {
      W("error", "Kilit Yetkisi Yok", o.reasons.lock);
      return;
    }
    const p = !r.security.locked, h = n.map(
      (f) => f.id === r.id ? {
        ...f,
        security: {
          ...f.security,
          locked: p,
          lockedBy: p ? y.name : void 0
        }
      } : f
    );
    Le(h), W(
      "info",
      p ? "Öğe Kilitlendi (Immutable)" : "Öğe Kilidi Açıldı",
      `"${r.name}" ${p ? "yazmaya karşı korundu." : "tekrar düzenlenebilir."}`
    );
  }, el = (r, o) => {
    const p = n.map((h) => h.id === r ? { ...h, colorTag: o } : h);
    Le(p, !1);
  };
  Ve(() => {
    if (!a.enableKeyboardShortcuts) return;
    const r = (o) => {
      var h;
      const p = (h = document.activeElement) == null ? void 0 : h.tagName.toLowerCase();
      p === "input" || p === "textarea" || p === "select" || ((o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "c" ? (o.preventDefault(), Lt("copy")) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "x" ? (o.preventDefault(), Lt("cut")) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "v" ? (o.preventDefault(), $t(z)) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "a" ? (o.preventDefault(), ie(new Set(tt.map((f) => f.id)))) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "z" ? (o.preventDefault(), ha()) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "y" ? (o.preventDefault(), fa()) : o.key === "Delete" ? (o.preventDefault(), Jt(o.shiftKey)) : o.key === "F2" && Q.size === 1 && (o.preventDefault(), fe(Array.from(Q)[0])));
    };
    return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
  }, [
    a.enableKeyboardShortcuts,
    z,
    $t,
    Lt,
    Jt,
    fa,
    ha,
    Q,
    tt
  ]);
  const Za = (r, o = 0) => {
    const p = n.filter((h) => !h.trashed && h.type === "folder" && h.parentId === r).sort((h, f) => h.name.localeCompare(f.name, "tr"));
    return p.length === 0 ? null : /* @__PURE__ */ e("div", { className: "space-y-0.5", children: p.map((h) => {
      var j;
      const f = n.some(
        (te) => !te.trashed && te.type === "folder" && te.parentId === h.id
      ), S = Ue.has(h.id), J = m === "volume" && z === h.id;
      return /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t(
          "div",
          {
            style: { paddingLeft: `${o * 14 + 8}px` },
            onClick: () => {
              E(h.id, "volume"), q(!1);
            },
            onAuxClick: (te) => {
              te.button === 1 && (te.preventDefault(), he(h.id, "volume"));
            },
            onContextMenu: (te) => {
              te.preventDefault(), te.stopPropagation(), Fe({ x: te.clientX, y: te.clientY, node: h });
            },
            onDragOver: (te) => {
              a.enableDragAndDrop && (te.preventDefault(), te.dataTransfer.dropEffect = "move");
            },
            onDrop: (te) => {
              if (a.enableDragAndDrop) {
                te.preventDefault(), te.stopPropagation();
                try {
                  const ze = te.dataTransfer.getData("application/filemangl-nodes") || te.dataTransfer.getData("text/plain");
                  if (!ze) return;
                  const ve = JSON.parse(ze);
                  Array.isArray(ve) && ve.length > 0 && Mt(h.id, ve);
                } catch {
                }
              }
            },
            className: `group flex items-center justify-between pr-2 py-1.5 rounded-md cursor-pointer text-xs transition ${J ? "bg-blue-600/20 text-blue-300 font-semibold" : "text-slate-300 hover:bg-slate-800/70"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                f ? /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: (te) => {
                      te.stopPropagation(), We((ze) => {
                        const ve = new Set(ze);
                        return ve.has(h.id) ? ve.delete(h.id) : ve.add(h.id), ve;
                      });
                    },
                    className: "p-0.5 text-slate-400 hover:text-white",
                    children: S ? /* @__PURE__ */ e(Ba, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ e(Sr, { className: "w-3.5 h-3.5" })
                  }
                ) : /* @__PURE__ */ e("span", { className: "w-4" }),
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: "material-symbols-outlined ms-filled text-amber-400 shrink-0",
                    style: { fontSize: "17px" },
                    children: "folder"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "truncate", children: h.name })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
                h.security.locked && /* @__PURE__ */ e(bt, { className: "w-3 h-3 text-rose-400 shrink-0" }),
                ((j = h.security.quota) == null ? void 0 : j.maxBytes) && /* @__PURE__ */ t("span", { className: "text-[9px] font-mono px-1 rounded bg-slate-900 text-amber-300 border border-amber-500/30", children: [
                  Math.round(h.security.quota.maxBytes / (1024 * 1024)),
                  "M"
                ] })
              ] })
            ]
          }
        ),
        f && S && Za(h.id, o + 1)
      ] }, h.id);
    }) });
  }, ga = ne.computeTotalVolumeUsed(n), ea = Math.min(
    100,
    ga / Math.max(1, a.totalDiskQuotaBytes) * 100
  ), I = ye.length === 1 ? ye[0] : qe, Ot = He(() => I ? de.evaluateNodePermissions(
    I,
    y,
    n,
    a
  ) : null, [I, y, n, a]), Qa = Re(
    (r) => {
      const o = new Map(n.map((S) => [S.id, S])), p = [];
      let h = r.parentId ? o.get(r.parentId) : void 0, f = 0;
      for (; h && f < 20; )
        f++, p.unshift(h.name), h = h.parentId ? o.get(h.parentId) : void 0;
      return p.length > 0 ? `D:\\${p.join("\\")}` : "D:\\";
    },
    [n]
  ), tl = He(() => {
    const r = {};
    if (typeof a.fontScale == "number" && a.fontScale > 0 && (r["--fm-font-scale"] = String(a.fontScale / 100)), a.borderRadius !== void 0)
      if (a.borderRadius === "sharp")
        r["--fm-radius-xs"] = "2px", r["--fm-radius-sm"] = "3px", r["--fm-radius-md"] = "4px", r["--fm-radius-lg"] = "6px", r["--fm-radius-xl"] = "8px";
      else if (a.borderRadius === "pill")
        r["--fm-radius-xs"] = "10px", r["--fm-radius-sm"] = "14px", r["--fm-radius-md"] = "18px", r["--fm-radius-lg"] = "24px", r["--fm-radius-xl"] = "30px";
      else if (typeof a.borderRadius == "number") {
        const o = Math.max(0, a.borderRadius);
        r["--fm-radius-xs"] = `${Math.round(o * 0.45)}px`, r["--fm-radius-sm"] = `${Math.round(o * 0.7)}px`, r["--fm-radius-md"] = `${o}px`, r["--fm-radius-lg"] = `${Math.round(o * 1.35)}px`, r["--fm-radius-xl"] = `${Math.round(o * 1.7)}px`;
      } else
        r["--fm-radius-xs"] = "var(--uxu-radius-xs, 6px)", r["--fm-radius-sm"] = "var(--uxu-radius-sm, 8px)", r["--fm-radius-md"] = "var(--uxu-radius-md, 12px)", r["--fm-radius-lg"] = "var(--uxu-radius-lg, 16px)", r["--fm-radius-xl"] = "var(--uxu-radius-xl, 20px)";
    return a.accentColor && (r["--fm-primary"] = a.accentColor, r["--fm-primary-hover"] = `color-mix(in srgb, ${a.accentColor} 84%, white)`, r["--fm-primary-soft"] = `color-mix(in srgb, ${a.accentColor} 16%, transparent)`, r["--fm-primary-border"] = `color-mix(in srgb, ${a.accentColor} 42%, transparent)`), r;
  }, [a.fontScale, a.borderRadius, a.accentColor]);
  return /* @__PURE__ */ t(
    "div",
    {
      style: tl,
      "data-border-radius": String(a.borderRadius ?? "squircle"),
      "data-inherit-theme": a.inheritHostTheme !== !1 ? "true" : "false",
      onClick: () => {
        Fe(null), G(null);
      },
      className: `filemangl-root flex flex-col bg-[#0b101b] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden ${a.theme === "light" ? "theme-light" : ""} ${s ? "fixed inset-0 z-50 rounded-none" : "rounded-2xl h-[680px] sm:h-[780px]"}`,
      children: [
        /* @__PURE__ */ e(
          "input",
          {
            ref: qt,
            type: "file",
            multiple: !0,
            onChange: jr,
            className: "hidden",
            "data-testid": "file-upload-input"
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            ref: Zt,
            type: "file",
            multiple: !0,
            webkitdirectory: "",
            directory: "",
            onChange: Kr,
            className: "hidden",
            "data-testid": "folder-upload-input"
          }
        ),
        /* @__PURE__ */ t("div", { className: "px-1.5 sm:px-2 pt-1.5 bg-[#080c14] border-b border-slate-800/90 flex items-end justify-between gap-1.5 sm:gap-2 select-none", children: [
          /* @__PURE__ */ t("div", { className: "flex items-end gap-1 overflow-x-auto no-scrollbar min-w-0 flex-1", children: [
            T.map((r) => {
              const o = r.id === F.id, p = O(r), h = r.navSection === "trash" ? "delete" : r.navSection === "starred" ? "star" : r.navSection === "shared" ? "share" : r.navSection === "locked" ? "lock" : r.folderId ? "folder" : "hard_drive", f = r.navSection === "trash" ? "text-rose-400" : r.navSection === "starred" ? "text-amber-400" : r.navSection === "shared" ? "text-emerald-400" : r.navSection === "locked" ? "text-rose-400" : r.folderId ? "text-amber-400" : "text-blue-400";
              return /* @__PURE__ */ t(
                "div",
                {
                  onClick: () => {
                    B(r.id), ie(/* @__PURE__ */ new Set());
                  },
                  onAuxClick: (S) => {
                    S.button === 1 && be(r.id, S);
                  },
                  className: `group relative flex items-center gap-1.5 sm:gap-2 pl-2 sm:pl-3 pr-1.5 sm:pr-2 py-1 sm:py-1.5 rounded-t-lg text-[11px] sm:text-xs cursor-pointer transition min-w-[105px] sm:min-w-[140px] max-w-[160px] sm:max-w-[220px] border-t border-x ${o ? "bg-[#101726] text-white font-semibold border-slate-700/90 shadow-sm" : "bg-slate-900/40 text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border-transparent"}`,
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: `material-symbols-outlined ms-filled shrink-0 ${f}`,
                        style: { fontSize: "16px" },
                        children: h
                      }
                    ),
                    /* @__PURE__ */ e("span", { className: "truncate flex-1", children: p }),
                    T.length > 1 && /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: (S) => be(r.id, S),
                        className: "w-5 h-5 rounded hover:bg-slate-700/80 flex items-center justify-center text-slate-400 hover:text-white shrink-0",
                        title: "Sekmeyi Kapat (Orta Tık)",
                        children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "close" })
                      }
                    )
                  ]
                },
                r.id
              );
            }),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => he(z, m),
                className: "mb-1 w-7 h-7 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center shrink-0 transition",
                title: "Yeni Sekme Aç (+)",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "add" })
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-1 sm:gap-1.5 pb-1.5 shrink-0", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md px-1.5 sm:px-2 py-0.5", children: [
              /* @__PURE__ */ e(
                "span",
                {
                  className: "material-symbols-outlined text-emerald-400 shrink-0",
                  style: { fontSize: "15px" },
                  children: "verified_user"
                }
              ),
              /* @__PURE__ */ e(
                "select",
                {
                  value: y.id,
                  onChange: (r) => {
                    const o = ft.find((p) => p.id === r.target.value);
                    o && (ee(o), W(
                      "info",
                      "Oturum Kimliği Değiştirildi",
                      `Aktif kullanıcı: ${o.name} [Rol: ${o.role.toUpperCase()}]`
                    ));
                  },
                  className: "bg-transparent text-[11px] font-semibold text-white focus:outline-none cursor-pointer max-w-[92px] sm:max-w-none truncate",
                  children: ft.map((r) => /* @__PURE__ */ t("option", { value: r.id, className: "bg-slate-900 text-white", children: [
                    r.name.split(" (")[0],
                    " [",
                    r.role.toUpperCase(),
                    "]"
                  ] }, r.id))
                }
              )
            ] }),
            /* @__PURE__ */ e(
              Un,
              {
                compact: !0,
                locale: a.locale,
                onSelectLocale: (r) => l == null ? void 0 : l({ locale: r })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => l == null ? void 0 : l({
                  theme: a.theme === "light" ? "dark" : "light"
                }),
                className: "w-7 h-7 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition",
                title: "Dark / Light Tema",
                children: /* @__PURE__ */ e(
                  "span",
                  {
                    className: `material-symbols-outlined ${a.theme === "light" ? "text-indigo-500" : "text-amber-400"}`,
                    style: { fontSize: "16px" },
                    children: a.theme === "light" ? "dark_mode" : "light_mode"
                  }
                )
              }
            ),
            d && /* @__PURE__ */ e(
              "button",
              {
                onClick: d,
                className: "w-7 h-7 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition",
                title: s ? i.explorer.fullscreenExit : "Tam Ekran",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: s ? "close_fullscreen" : "open_in_full" })
              }
            )
          ] })
        ] }),
        a.enableBreadcrumbs && /* @__PURE__ */ t("div", { className: "px-2 sm:px-2.5 py-1.5 bg-[#101726] border-b border-slate-800/90 flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 select-none", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5 shrink-0", children: [
            a.enableFolderTree && /* @__PURE__ */ e(
              "button",
              {
                onClick: () => q((r) => !r),
                className: `md:hidden w-7 h-7 rounded-md flex items-center justify-center transition mr-0.5 ${me ? "bg-blue-600/30 text-blue-300 border border-blue-500/50" : "hover:bg-slate-800 text-slate-200"}`,
                title: "Klasör Ağacını Aç/Kapat",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "left_panel_open" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                disabled: F.historyIndex <= 0,
                onClick: re,
                className: "w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                title: "Geri (Alt+Sol)",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "17px" }, children: "arrow_back" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                disabled: F.historyIndex >= F.history.length - 1,
                onClick: se,
                className: "w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                title: "İleri (Alt+Sağ)",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "17px" }, children: "arrow_forward" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                disabled: !z && m === "volume",
                onClick: () => {
                  if (m !== "volume") {
                    $("volume");
                    return;
                  }
                  qe && X(qe.parentId);
                },
                className: "w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                title: "Üst Klasöre Çık (Alt+Yukarı)",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "17px" }, children: "arrow_upward" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                onClick: () => {
                  Z(""), we("all"), W("info", "Görünüm Yenilendi", "Dizin ağacı ve önbellek tazelendi.");
                },
                className: "w-7 h-7 rounded-md hover:bg-slate-800 text-slate-200 flex items-center justify-center transition",
                title: "Yenile (F5)",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "17px" }, children: "refresh" })
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "flex-1 min-w-[140px] flex items-center justify-between gap-2 bg-slate-950/90 border border-slate-800 rounded-md px-2 sm:px-2.5 py-1 text-xs overflow-x-auto no-scrollbar", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1 min-w-0", children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => E(null, "volume"),
                  className: "flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-slate-800 text-slate-200 font-medium shrink-0 transition",
                  title: i.explorer.rootVolume,
                  children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: "material-symbols-outlined text-blue-400",
                        style: { fontSize: "16px" },
                        children: "home"
                      }
                    ),
                    /* @__PURE__ */ e("span", { className: "hidden xs:inline sm:inline", children: i.explorer.rootVolume })
                  ]
                }
              ),
              /* @__PURE__ */ e(
                "span",
                {
                  className: "material-symbols-outlined text-slate-500 shrink-0",
                  style: { fontSize: "15px" },
                  children: "chevron_right"
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => E(null, "volume"),
                  onDragOver: (r) => {
                    a.enableDragAndDrop && (r.preventDefault(), r.dataTransfer.dropEffect = "move");
                  },
                  onDrop: (r) => {
                    if (a.enableDragAndDrop) {
                      r.preventDefault(), r.stopPropagation();
                      try {
                        const o = r.dataTransfer.getData("application/filemangl-nodes") || r.dataTransfer.getData("text/plain");
                        if (!o) return;
                        const p = JSON.parse(o);
                        Array.isArray(p) && p.length > 0 && Mt(null, p);
                      } catch {
                      }
                    }
                  },
                  className: `px-1.5 py-0.5 rounded hover:bg-slate-800 shrink-0 transition ${m === "volume" && !z ? "text-white font-semibold" : "text-slate-300"}`,
                  children: [
                    a.volumeName,
                    " (D:)"
                  ]
                }
              ),
              m !== "volume" ? /* @__PURE__ */ t(Je, { children: [
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: "material-symbols-outlined text-slate-500 shrink-0",
                    style: { fontSize: "15px" },
                    children: "chevron_right"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "px-1.5 py-0.5 text-amber-400 font-semibold shrink-0", children: m === "trash" ? i.explorer.recycleBin : m === "starred" ? i.explorer.starred : m === "shared" ? i.explorer.shared : i.explorer.lockedVault })
              ] }) : Ya.map((r, o) => /* @__PURE__ */ t(Aa.Fragment, { children: [
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: "material-symbols-outlined text-slate-500 shrink-0",
                    style: { fontSize: "15px" },
                    children: "chevron_right"
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: () => E(r.id, "volume"),
                    onDragOver: (p) => {
                      a.enableDragAndDrop && (p.preventDefault(), p.dataTransfer.dropEffect = "move");
                    },
                    onDrop: (p) => {
                      if (a.enableDragAndDrop) {
                        p.preventDefault(), p.stopPropagation();
                        try {
                          const h = p.dataTransfer.getData("application/filemangl-nodes") || p.dataTransfer.getData("text/plain");
                          if (!h) return;
                          const f = JSON.parse(h);
                          Array.isArray(f) && f.length > 0 && Mt(r.id, f);
                        } catch {
                        }
                      }
                    },
                    className: `px-1.5 py-0.5 rounded hover:bg-slate-800 truncate max-w-[140px] sm:max-w-[180px] transition ${o === Ya.length - 1 ? "text-white font-semibold" : "text-slate-300"}`,
                    children: r.name
                  }
                )
              ] }, r.id))
            ] }),
            /* @__PURE__ */ t("div", { className: "hidden lg:flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-800 text-[11px] font-mono text-emerald-400", children: [
              /* @__PURE__ */ t("span", { children: [
                tt.length.toLocaleString(a.locale),
                " öğe"
              ] }),
              /* @__PURE__ */ e("span", { className: "text-slate-600", children: "•" }),
              /* @__PURE__ */ t("span", { children: [
                Ur,
                "ms"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "relative w-full sm:w-52 md:w-64 shrink-0", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "text",
                placeholder: qe ? `${qe.name} klasöründe ara` : i.explorer.searchPlaceholder,
                value: b,
                onChange: (r) => Z(r.target.value),
                className: "w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-md pl-3 pr-8 py-1 text-xs text-white focus:outline-none transition"
              }
            ),
            b ? /* @__PURE__ */ e(
              "button",
              {
                onClick: () => Z(""),
                className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white flex items-center",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "close" })
              }
            ) : /* @__PURE__ */ e(
              "span",
              {
                className: "material-symbols-outlined text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
                style: { fontSize: "16px" },
                children: "search"
              }
            )
          ] })
        ] }),
        a.enableRibbonToolbar && /* @__PURE__ */ t(
          "div",
          {
            onClick: (r) => r.stopPropagation(),
            className: "relative px-2 sm:px-3 py-1 lg:py-0 min-h-[44px] lg:h-11 bg-[#0d1320] border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-y-1 gap-x-1.5 select-none whitespace-nowrap",
            children: [
              /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-0.5 sm:gap-1 min-w-0", children: [
                /* @__PURE__ */ t("div", { className: "relative", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => G((r) => r === "new" ? null : "new"),
                      className: "px-2.5 py-1.5 rounded-md hover:bg-slate-800 text-slate-100 text-xs font-medium flex items-center gap-1.5 transition",
                      children: [
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-blue-400",
                            style: { fontSize: "19px" },
                            children: "add_circle"
                          }
                        ),
                        /* @__PURE__ */ e("span", { children: "Yeni" }),
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-slate-400",
                            style: { fontSize: "15px" },
                            children: "expand_more"
                          }
                        )
                      ]
                    }
                  ),
                  N === "new" && /* @__PURE__ */ t("div", { className: "absolute left-0 top-full mt-1 z-50 w-56 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200", children: [
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          qa(), G(null);
                        },
                        className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5",
                        children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined ms-filled text-amber-400",
                              style: { fontSize: "18px" },
                              children: "create_new_folder"
                            }
                          ),
                          /* @__PURE__ */ e("span", { children: i.explorer.newFolder })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Qt(), G(null);
                        },
                        className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5",
                        children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "18px" },
                              children: "description"
                            }
                          ),
                          /* @__PURE__ */ t("span", { children: [
                            i.explorer.newFile,
                            " (.md)"
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Qt(
                            `Module_${Date.now().toString().slice(-4)}.ts`,
                            `export const version = '2.4.0';
`,
                            64 * 1024,
                            "code"
                          ), G(null);
                        },
                        className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5",
                        children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-emerald-400",
                              style: { fontSize: "18px" },
                              children: "code"
                            }
                          ),
                          /* @__PURE__ */ e("span", { children: "TypeScript Modülü (.ts)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          var r;
                          (r = qt.current) == null || r.click(), G(null);
                        },
                        className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5 text-cyan-300",
                        children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined",
                              style: { fontSize: "18px" },
                              children: "upload_file"
                            }
                          ),
                          /* @__PURE__ */ e("span", { children: "Bilgisayardan Dosya Yükle..." })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          var r;
                          (r = Zt.current) == null || r.click(), G(null);
                        },
                        className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5 text-amber-300",
                        children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined",
                              style: { fontSize: "18px" },
                              children: "drive_folder_upload"
                            }
                          ),
                          /* @__PURE__ */ e("span", { children: "Bilgisayardan Klasör Yükle..." })
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => {
                      var r;
                      return (r = qt.current) == null ? void 0 : r.click();
                    },
                    className: "px-2 py-1.5 rounded-md hover:bg-slate-800 text-cyan-300 text-xs font-medium flex items-center gap-1 transition",
                    title: "Bilgisayardan Dosya Yükle (0-100% Akış)",
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "upload_file" }),
                      /* @__PURE__ */ e("span", { className: "hidden md:inline", children: "Dosya Yükle" })
                    ]
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => {
                      var r;
                      return (r = Zt.current) == null ? void 0 : r.click();
                    },
                    className: "px-2 py-1.5 rounded-md hover:bg-slate-800 text-amber-300 text-xs font-medium flex items-center gap-1 transition",
                    title: "Bilgisayardan Klasör Yükle (Tüm Alt Dizinlerle)",
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "drive_folder_upload" }),
                      /* @__PURE__ */ e("span", { className: "hidden md:inline", children: "Klasör Yükle" })
                    ]
                  }
                ),
                /* @__PURE__ */ e("div", { className: "h-5 w-px bg-slate-800 mx-1" }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Q.size === 0,
                    onClick: () => Lt("cut"),
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: `${i.explorer.cut} (Ctrl+X)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "content_cut" })
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Q.size === 0,
                    onClick: () => Lt("copy"),
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: `${i.explorer.copy} (Ctrl+C)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "content_copy" })
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    disabled: !Me.mode,
                    onClick: () => $t(z),
                    className: `relative px-2 h-8 rounded-md flex items-center justify-center gap-1 transition ${Me.mode ? "bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30" : "opacity-30 text-slate-300"}`,
                    title: `${i.explorer.paste} (Ctrl+V)`,
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "content_paste" }),
                      Me.nodeIds.length > 0 && /* @__PURE__ */ e("span", { className: "text-[10px] font-mono font-bold", children: Me.nodeIds.length })
                    ]
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Q.size === 0,
                    onClick: () => {
                      Q.size === 1 ? fe(Array.from(Q)[0]) : a.enableBatchRename && Ha(!0);
                    },
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: `${i.explorer.rename} (F2)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "drive_file_rename_outline" })
                  }
                ),
                a.enableShareLinks && /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: ye.length !== 1,
                    onClick: () => ye[0] && Wt(ye[0]),
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: i.explorer.ctxShare,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "share" })
                  }
                ),
                m === "trash" && /* @__PURE__ */ t(
                  "button",
                  {
                    disabled: Q.size === 0,
                    onClick: Yr,
                    className: "px-2.5 h-8 rounded-md bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1",
                    title: i.explorer.restore,
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "17px" }, children: "restore_from_trash" }),
                      /* @__PURE__ */ e("span", { className: "hidden lg:inline", children: i.explorer.restore })
                    ]
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Q.size === 0,
                    onClick: () => Jt(!1),
                    className: "w-8 h-8 rounded-md hover:bg-rose-500/20 disabled:opacity-30 text-slate-200 hover:text-rose-300 flex items-center justify-center transition",
                    title: `${i.explorer.ctxDelete} (Del)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "delete" })
                  }
                ),
                a.enableArchiveCompression && /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Q.size === 0,
                    onClick: Xr,
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-amber-400 flex items-center justify-center transition",
                    title: i.explorer.zipCompress,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "folder_zip" })
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    disabled: Q.size === 0 && !qe,
                    onClick: () => void vt(),
                    className: "px-2 h-8 rounded-md hover:bg-emerald-500/20 disabled:opacity-30 text-emerald-300 flex items-center justify-center gap-1 transition",
                    title: "Seçili Klasörü veya Seçim Dörtgenini ZIP Olarak İndir (.zip)",
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "archive" }),
                      /* @__PURE__ */ e("span", { className: "hidden xl:inline text-[11px] font-semibold", children: "ZIP İndir" }),
                      Q.size > 0 && /* @__PURE__ */ e("span", { className: "text-[10px] font-mono font-bold px-1 rounded bg-emerald-500/20 text-emerald-300", children: Q.size })
                    ]
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: !I,
                    onClick: () => I && et(I),
                    className: "w-8 h-8 rounded-md hover:bg-indigo-600/25 disabled:opacity-30 text-indigo-400 flex items-center justify-center transition",
                    title: i.explorer.permissionsAcl,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "shield_lock" })
                  }
                ),
                /* @__PURE__ */ e("div", { className: "h-5 w-px bg-slate-800 mx-1" }),
                /* @__PURE__ */ t("div", { className: "relative", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => G((r) => r === "sort" ? null : "sort"),
                      className: "px-2.5 py-1.5 rounded-md hover:bg-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition",
                      children: [
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-slate-300",
                            style: { fontSize: "18px" },
                            children: "swap_vert"
                          }
                        ),
                        /* @__PURE__ */ e("span", { children: "Sırala" }),
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-slate-400",
                            style: { fontSize: "15px" },
                            children: "expand_more"
                          }
                        )
                      ]
                    }
                  ),
                  N === "sort" && /* @__PURE__ */ t("div", { className: "absolute left-0 sm:left-0 top-full mt-1 z-50 w-56 max-w-[calc(100vw-24px)] rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200 whitespace-normal", children: [
                    /* @__PURE__ */ e("div", { className: "px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400", children: "Sıralama Ölçütü" }),
                    [
                      ["name", i.explorer.colName],
                      ["updatedAt", i.explorer.colModified],
                      ["type", i.explorer.colType],
                      ["size", i.explorer.colSize]
                    ].map(([r, o]) => /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Se(r), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: o }),
                          R === r && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "16px" },
                              children: "check"
                            }
                          )
                        ]
                      },
                      r
                    )),
                    /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
                    /* @__PURE__ */ e("div", { className: "px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400", children: "Yön" }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Oe("asc"), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: "Artan (A-Z / Küçükten Büyüğe)" }),
                          Ne === "asc" && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "16px" },
                              children: "check"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Oe("desc"), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: "Azalan (Z-A / Büyükten Küçüğe)" }),
                          Ne === "desc" && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "16px" },
                              children: "check"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
                    /* @__PURE__ */ e("div", { className: "px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400", children: "Gruplandırma (Windows 11)" }),
                    [
                      ["date", "Tarihe Göre Grupla (Bugün / Dün)"],
                      ["category", "Dosya Türüne Göre Grupla"],
                      ["none", "Gruplama Yok"]
                    ].map(([r, o]) => /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Pe(r), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: o }),
                          De === r && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "16px" },
                              children: "check"
                            }
                          )
                        ]
                      },
                      r
                    ))
                  ] })
                ] }),
                /* @__PURE__ */ t("div", { className: "relative", children: [
                  /* @__PURE__ */ t(
                    "button",
                    {
                      onClick: () => G((r) => r === "view" ? null : "view"),
                      className: "px-2.5 py-1.5 rounded-md hover:bg-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition",
                      children: [
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-slate-300",
                            style: { fontSize: "18px" },
                            children: "desktop_windows"
                          }
                        ),
                        /* @__PURE__ */ e("span", { children: "Görünüm" }),
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-slate-400",
                            style: { fontSize: "15px" },
                            children: "expand_more"
                          }
                        )
                      ]
                    }
                  ),
                  N === "view" && /* @__PURE__ */ t("div", { className: "absolute left-0 top-full mt-1 z-50 w-60 max-w-[calc(100vw-24px)] rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200 whitespace-normal", children: [
                    [
                      ["extra_large_icons", "grid_view", i.explorer.viewExtraLarge],
                      ["large_icons", "Apps", i.explorer.viewLarge],
                      ["medium_icons", "window", i.explorer.viewMedium],
                      ["small_icons", "view_compact", i.explorer.viewSmall],
                      ["list", "format_list_bulleted", i.explorer.viewList],
                      ["details", "table_rows", i.explorer.viewDetails],
                      ["tiles", "view_module", i.explorer.viewTiles],
                      ["content", "view_agenda", i.explorer.viewContent]
                    ].map(([r, o, p]) => /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          ke(r), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ t("span", { className: "flex items-center gap-2.5", children: [
                            /* @__PURE__ */ e(
                              "span",
                              {
                                className: "material-symbols-outlined text-slate-400",
                                style: { fontSize: "17px" },
                                children: o
                              }
                            ),
                            /* @__PURE__ */ e("span", { children: p })
                          ] }),
                          pe === r && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "16px" },
                              children: "check"
                            }
                          )
                        ]
                      },
                      r
                    )),
                    a.enableWebGLAcceleration && /* @__PURE__ */ t(Je, { children: [
                      /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => {
                            ke("webgl_spatial"), G(null);
                          },
                          className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-blue-300",
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-2.5", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined",
                                  style: { fontSize: "17px" },
                                  children: "memory"
                                }
                              ),
                              /* @__PURE__ */ e("span", { children: i.explorer.webglScene })
                            ] }),
                            pe === "webgl_spatial" && /* @__PURE__ */ e(
                              "span",
                              {
                                className: "material-symbols-outlined text-blue-400",
                                style: { fontSize: "16px" },
                                children: "check"
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => {
                            ke("webgl_diskmap"), G(null);
                          },
                          className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-emerald-300",
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-2.5", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined",
                                  style: { fontSize: "17px" },
                                  children: "donut_large"
                                }
                              ),
                              /* @__PURE__ */ e("span", { children: i.explorer.webglDiskMap })
                            ] }),
                            pe === "webgl_diskmap" && /* @__PURE__ */ e(
                              "span",
                              {
                                className: "material-symbols-outlined text-emerald-400",
                                style: { fontSize: "16px" },
                                children: "check"
                              }
                            )
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          l == null || l({ enableDualPane: !a.enableDualPane }), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ t("span", { className: "flex items-center gap-2.5", children: [
                            /* @__PURE__ */ e(
                              "span",
                              {
                                className: "material-symbols-outlined text-cyan-400",
                                style: { fontSize: "17px" },
                                children: "vertical_split"
                              }
                            ),
                            /* @__PURE__ */ e("span", { children: "Çift Panel (Dual-Pane)" })
                          ] }),
                          a.enableDualPane && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "16px" },
                              children: "check"
                            }
                          )
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ t("div", { className: "relative", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => G((r) => r === "more" ? null : "more"),
                      className: "w-8 h-8 rounded-md hover:bg-slate-800 text-slate-300 flex items-center justify-center transition",
                      title: "Diğer İşlemler & Performans Stres Testi (⋯)",
                      children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "20px" }, children: "more_horiz" })
                    }
                  ),
                  N === "more" && /* @__PURE__ */ t("div", { className: "absolute right-0 sm:left-0 top-full mt-1 z-50 w-64 max-w-[calc(100vw-24px)] rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200 whitespace-normal", children: [
                    /* @__PURE__ */ t("div", { className: "px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "bolt" }),
                      /* @__PURE__ */ e("span", { children: "Performans Stres Testi (Fake Dosya)" })
                    ] }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          const r = performance.now(), o = ct(2500, z);
                          Le([...n, ...o], !1);
                          const p = (performance.now() - r).toFixed(1);
                          G(null), W(
                            "success",
                            "+2.500 Fake Dosya Üretildi",
                            `Bu klasöre ${p} ms içinde 2.500 yeni dosya eklendi.`
                          );
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-blue-300",
                        children: [
                          /* @__PURE__ */ e("span", { children: "+2.500 Fake Dosya Üret" }),
                          /* @__PURE__ */ e("span", { className: "font-mono text-[10px]", children: "+2.5K" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          const r = performance.now(), o = ct(1e4, z);
                          Le([...n, ...o], !1);
                          const p = (performance.now() - r).toFixed(1);
                          G(null), W(
                            "success",
                            "+10.000 Fake Dosya Üretildi",
                            `Bu klasöre ${p} ms içinde 10.000 yeni dosya eklendi.`
                          );
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-indigo-300",
                        children: [
                          /* @__PURE__ */ e("span", { children: "+10.000 Fake Dosya Üret" }),
                          /* @__PURE__ */ e("span", { className: "font-mono text-[10px]", children: "+10K" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          const r = performance.now(), o = ct(25e3, z);
                          Le([...n, ...o], !1);
                          const p = (performance.now() - r).toFixed(1);
                          G(null), W(
                            "success",
                            "+25.000 Fake Dosya Üretildi",
                            `Bu klasöre ${p} ms içinde 25.000 yeni dosya eklendi.`
                          );
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-purple-300",
                        children: [
                          /* @__PURE__ */ e("span", { children: "+25.000 Fake Dosya Üret" }),
                          /* @__PURE__ */ e("span", { className: "font-mono text-[10px]", children: "+25K" })
                        ]
                      }
                    ),
                    n.some((r) => r.isSyntheticStressNode) && /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          const r = n.filter((o) => !o.isSyntheticStressNode);
                          Le(r, !1), ie(/* @__PURE__ */ new Set()), G(null), W(
                            "info",
                            "Fake Dosyalar Temizlendi",
                            "Tüm sentetik test dosyaları kaldırıldı."
                          );
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-rose-500/20 text-rose-400 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: i.explorer.clearFake }),
                          /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "delete_sweep" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        disabled: x.length === 0,
                        onClick: () => {
                          ha(), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 disabled:opacity-35 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "undo" }),
                            /* @__PURE__ */ e("span", { children: "Geri Al (Undo)" })
                          ] }),
                          /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-slate-400", children: "Ctrl+Z" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        disabled: P.length === 0,
                        onClick: () => {
                          fa(), G(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 disabled:opacity-35 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                            /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "redo" }),
                            /* @__PURE__ */ e("span", { children: "Yinele (Redo)" })
                          ] }),
                          /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-slate-400", children: "Ctrl+Y" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: async () => {
                          const r = await c.resetToFactoryDefaults();
                          u(r), E(null, "volume"), ie(/* @__PURE__ */ new Set()), G(null), W(
                            "info",
                            "Fabrika Ayarlarına Dönüldü",
                            "Sanal disk varsayılan yapısına sıfırlandı."
                          );
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2 text-amber-300",
                        children: [
                          /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "restart_alt" }),
                          /* @__PURE__ */ e("span", { children: i.explorer.resetBtn })
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                Yt.length > 0 && /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => {
                      ua((r) => !r), pa(!1);
                    },
                    className: "px-2 py-1 rounded-md bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold flex items-center gap-1.5 transition",
                    title: "Yükleme Kuyruğunu Göster/Gizle (Google Drive Transfer Paneli)",
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "cloud_upload" }),
                      /* @__PURE__ */ t("span", { children: [
                        "Kuyruk (",
                        Yt.length,
                        ")"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ t("div", { className: "hidden xl:flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-md px-1.5 py-0.5 text-[11px]", children: [
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => {
                        const r = performance.now(), o = ct(2500, z);
                        Le([...n, ...o], !1);
                        const p = (performance.now() - r).toFixed(1);
                        W(
                          "success",
                          "+2.500 Fake Dosya Üretildi",
                          `Bu klasöre ${p} ms içinde 2.500 yeni dosya eklendi.`
                        );
                      },
                      className: "px-1.5 py-0.5 rounded hover:bg-blue-600/25 text-blue-300 font-mono font-semibold transition",
                      title: i.explorer.files25k,
                      children: "+2.5K"
                    }
                  ),
                  /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => {
                        const r = performance.now(), o = ct(1e4, z);
                        Le([...n, ...o], !1);
                        const p = (performance.now() - r).toFixed(1);
                        W(
                          "success",
                          "+10.000 Fake Dosya Üretildi",
                          `Bu klasöre ${p} ms içinde 10.000 yeni dosya eklendi.`
                        );
                      },
                      className: "px-1.5 py-0.5 rounded hover:bg-indigo-600/25 text-indigo-300 font-mono font-semibold transition",
                      title: i.explorer.files10k,
                      children: "+10K"
                    }
                  ),
                  n.some((r) => r.isSyntheticStressNode) && /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => {
                        const r = n.filter((o) => !o.isSyntheticStressNode);
                        Le(r, !1), ie(/* @__PURE__ */ new Set());
                      },
                      className: "px-1.5 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 font-medium transition",
                      children: i.explorer.clearFake
                    }
                  )
                ] }),
                /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => {
                      if (typeof window < "u" && window.innerWidth < 1024) {
                        const r = !g;
                        ge(r), r && !a.enableDetailsInspector && (l == null || l({ enableDetailsInspector: !0 }));
                      } else
                        l == null || l({
                          enableDetailsInspector: !a.enableDetailsInspector
                        });
                    },
                    className: `px-2 sm:px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 border transition ${a.enableDetailsInspector ? "bg-slate-800 border-slate-700 text-white shadow-sm" : "border-transparent text-slate-300 hover:bg-slate-800/70"}`,
                    title: "Ayrıntılar Bölmesini Aç/Kapat",
                    children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: "material-symbols-outlined text-blue-400",
                          style: { fontSize: "18px" },
                          children: "dock_to_left"
                        }
                      ),
                      /* @__PURE__ */ e("span", { children: "Ayrıntılar" })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ t("div", { className: "relative flex-1 flex overflow-hidden", children: [
          a.enableFolderTree && /* @__PURE__ */ t(Je, { children: [
            me && /* @__PURE__ */ e(
              "div",
              {
                onClick: () => q(!1),
                className: "absolute inset-0 bg-black/60 backdrop-blur-[1px] z-30 md:hidden"
              }
            ),
            /* @__PURE__ */ t(
              "div",
              {
                style: { width: `${le}px` },
                className: `bg-[#0d131f] border-r border-slate-800/90 flex-col justify-between shrink-0 select-none ${me ? "absolute inset-y-0 left-0 z-40 flex max-w-[85vw] shadow-2xl md:static" : "hidden md:flex"}`,
                children: [
                  /* @__PURE__ */ t("div", { className: "p-2 space-y-3 overflow-y-auto flex-1", children: [
                    /* @__PURE__ */ t("div", { className: "flex md:hidden items-center justify-between px-2 py-1 border-b border-slate-800/80 mb-1", children: [
                      /* @__PURE__ */ t("span", { className: "text-[11px] font-bold text-slate-200 flex items-center gap-1.5", children: [
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-blue-400",
                            style: { fontSize: "16px" },
                            children: "folder_open"
                          }
                        ),
                        /* @__PURE__ */ e("span", { children: "Gezinti Bölmesi" })
                      ] }),
                      /* @__PURE__ */ e(
                        "button",
                        {
                          onClick: () => q(!1),
                          className: "w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white",
                          children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "close" })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ t("div", { className: "space-y-0.5 text-xs", children: [
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => {
                            E(null, "volume"), q(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${m === "volume" && z === null ? "bg-blue-600/20 text-blue-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-2 truncate", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined text-blue-400 shrink-0",
                                  style: { fontSize: "18px" },
                                  children: "home"
                                }
                              ),
                              /* @__PURE__ */ e("span", { className: "truncate", children: i.explorer.rootVolume })
                            ] }),
                            /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: n.filter((r) => !r.trashed).length })
                          ]
                        }
                      ),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => {
                            $("starred"), q(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${m === "starred" ? "bg-amber-500/20 text-amber-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-2 truncate", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined ms-filled text-amber-400 shrink-0",
                                  style: { fontSize: "18px" },
                                  children: "star"
                                }
                              ),
                              /* @__PURE__ */ e("span", { className: "truncate", children: i.explorer.starred })
                            ] }),
                            /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: n.filter((r) => !r.trashed && r.starred).length })
                          ]
                        }
                      ),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => {
                            $("shared"), q(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${m === "shared" ? "bg-emerald-500/20 text-emerald-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-2 truncate", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined text-emerald-400 shrink-0",
                                  style: { fontSize: "18px" },
                                  children: "folder_shared"
                                }
                              ),
                              /* @__PURE__ */ e("span", { className: "truncate", children: i.explorer.shared })
                            ] }),
                            /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: n.filter((r) => !r.trashed && r.shareLink).length })
                          ]
                        }
                      ),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => {
                            $("locked"), q(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${m === "locked" ? "bg-rose-500/20 text-rose-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-2 truncate", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined text-rose-400 shrink-0",
                                  style: { fontSize: "18px" },
                                  children: "lock"
                                }
                              ),
                              /* @__PURE__ */ e("span", { className: "truncate", children: i.explorer.lockedVault })
                            ] }),
                            /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: n.filter((r) => !r.trashed && r.security.locked).length })
                          ]
                        }
                      ),
                      a.enableRecycleBin && /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => {
                            $("trash"), q(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${m === "trash" ? "bg-rose-500/20 text-rose-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-2 truncate", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined text-slate-400 shrink-0",
                                  style: { fontSize: "18px" },
                                  children: "delete"
                                }
                              ),
                              /* @__PURE__ */ e("span", { className: "truncate", children: i.explorer.recycleBin })
                            ] }),
                            /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-rose-400", children: n.filter((r) => r.trashed).length })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ e("div", { className: "border-t border-slate-800/80 my-1" }),
                    /* @__PURE__ */ t("div", { children: [
                      /* @__PURE__ */ t(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            E(null, "volume"), q(!1);
                          },
                          onAuxClick: (r) => {
                            r.button === 1 && (r.preventDefault(), he(null, "volume"));
                          },
                          onDragOver: (r) => {
                            a.enableDragAndDrop && (r.preventDefault(), r.dataTransfer.dropEffect = "move");
                          },
                          onDrop: (r) => {
                            if (a.enableDragAndDrop) {
                              r.preventDefault(), r.stopPropagation();
                              try {
                                const o = r.dataTransfer.getData("application/filemangl-nodes") || r.dataTransfer.getData("text/plain");
                                if (!o) return;
                                const p = JSON.parse(o);
                                Array.isArray(p) && p.length > 0 && Mt(null, p);
                              } catch {
                              }
                            }
                          },
                          className: `w-full px-2.5 py-1.5 mb-0.5 rounded-md flex items-center justify-between gap-1.5 text-xs font-semibold transition cursor-pointer ${m === "volume" && z === null ? "bg-blue-600/20 text-blue-300" : "text-slate-200 hover:bg-slate-800/70"}`,
                          title: i.explorer.rootVolume,
                          children: [
                            /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5 truncate", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined text-blue-400 shrink-0",
                                  style: { fontSize: "17px" },
                                  children: "hard_drive"
                                }
                              ),
                              /* @__PURE__ */ e("span", { className: "truncate", children: i.explorer.rootVolume })
                            ] }),
                            /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400 shrink-0", children: "/" })
                          ]
                        }
                      ),
                      Za(null, 0)
                    ] })
                  ] }),
                  /* @__PURE__ */ t("div", { className: "p-2.5 m-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5", children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-xs", children: [
                      /* @__PURE__ */ t("span", { className: "font-semibold text-slate-200 flex items-center gap-1.5 truncate", children: [
                        /* @__PURE__ */ e(
                          "span",
                          {
                            className: "material-symbols-outlined text-blue-400",
                            style: { fontSize: "16px" },
                            children: "hard_drive"
                          }
                        ),
                        /* @__PURE__ */ e("span", { className: "truncate", children: "Yerel Disk (D:)" })
                      ] }),
                      /* @__PURE__ */ t("span", { className: "font-mono text-[11px] text-blue-400", children: [
                        ea.toFixed(1),
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ e("div", { className: "w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800", children: /* @__PURE__ */ e(
                      "div",
                      {
                        style: { width: `${ea}%` },
                        className: `h-full transition-all duration-300 ${ea > 85 ? "bg-rose-500" : ea > 65 ? "bg-amber-500" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`
                      }
                    ) }),
                    /* @__PURE__ */ t("div", { className: "flex justify-between text-[10px] font-mono text-slate-400", children: [
                      /* @__PURE__ */ e("span", { children: ne.formatBytes(ga) }),
                      /* @__PURE__ */ e("span", { children: ne.formatBytes(a.totalDiskQuotaBytes) })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "div",
              {
                onMouseDown: (r) => V("left", r),
                className: "w-1 hover:w-1.5 bg-transparent hover:bg-blue-500/60 cursor-col-resize transition-all shrink-0 hidden md:block z-20",
                title: "Sol Bölmeyi Yeniden Boyutlandır (Sürükle)"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0b101b] relative min-w-0", children: [
            /* @__PURE__ */ t("div", { className: "flex-1 h-full overflow-hidden relative flex flex-col min-w-0 min-h-0", children: [
              pe === "webgl_spatial" && a.enableWebGLAcceleration ? /* @__PURE__ */ e(
                Nn,
                {
                  nodes: tt,
                  allNodes: n,
                  selectedIds: Q,
                  clipboard: Me,
                  currentUser: y,
                  config: a,
                  onSelectNode: ba,
                  onSelectMany: Xa,
                  onOpenNode: _t,
                  onContextMenuNode: (r, o) => Fe({ x: r.clientX, y: r.clientY, node: o }),
                  onDropNodesIntoFolder: Mt,
                  onInjectStressNodes: (r) => {
                    const o = ct(r, z);
                    Le([...n, ...o]), W(
                      "success",
                      "WebGL Stres Testi Başlatıldı",
                      `${r} sentetik düğüm GPU sahnesine eklendi.`
                    );
                  },
                  onClearStressNodes: () => {
                    const r = n.filter((o) => !o.isSyntheticStressNode);
                    Le(r), W("info", "Stres Düğümleri Temizlendi", "Sentetik düğümler kaldırıldı.");
                  }
                }
              ) : pe === "webgl_diskmap" && a.enableWebGLDiskMap ? /* @__PURE__ */ e(
                Mn,
                {
                  allNodes: n,
                  currentFolderId: z,
                  selectedIds: Q,
                  currentUser: y,
                  config: a,
                  onSelectNode: ba,
                  onOpenNode: _t
                }
              ) : /* @__PURE__ */ e(
                gn,
                {
                  nodes: tt,
                  allNodes: n,
                  viewMode: pe,
                  selectedIds: Q,
                  clipboard: Me,
                  renamingId: lt,
                  sortField: R,
                  sortDirection: Ne,
                  groupBy: De,
                  currentUser: y,
                  config: a,
                  onSelectNode: ba,
                  onSelectMany: Xa,
                  onOpenNode: _t,
                  onContextMenuNode: (r, o) => Fe({ x: r.clientX, y: r.clientY, node: o }),
                  onCommitRename: Wr,
                  onCancelRename: () => fe(null),
                  onSortChange: (r) => {
                    R === r ? Oe((o) => o === "asc" ? "desc" : "asc") : (Se(r), Oe("asc"));
                  },
                  onDropNodesIntoFolder: Mt,
                  onExternalFilesDropped: (r, o) => ya(r, o ?? z)
                }
              ),
              (ye.length > 1 || ye.length === 1 && ye[0].type === "folder") && /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": "selection-zip-bar",
                  onClick: (r) => r.stopPropagation(),
                  className: "absolute bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100%-24px)] px-3.5 py-2 rounded-full bg-slate-950/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs select-none",
                  children: [
                    /* @__PURE__ */ e("span", { className: "font-semibold text-white truncate", children: ye.length === 1 ? `📁 ${ye[0].name}` : `${ye.length} öğe seçildi` }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => void vt(ye),
                        className: "px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shrink-0 transition shadow",
                        children: [
                          /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "folder_zip" }),
                          /* @__PURE__ */ e("span", { children: ye.length === 1 ? "Klasörü ZIP İndir (.zip)" : "Seçimi ZIP İndir (.zip)" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: () => ie(/* @__PURE__ */ new Set()),
                        className: "w-6 h-6 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center shrink-0 transition",
                        title: "Seçimi Temizle",
                        children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "close" })
                      }
                    )
                  ]
                }
              )
            ] }),
            a.enableDualPane && /* @__PURE__ */ t("div", { className: "w-full md:w-1/2 h-1/2 md:h-full border-t md:border-t-0 md:border-l border-slate-800 bg-[#0d1320] flex flex-col min-h-0", children: [
              /* @__PURE__ */ t("div", { className: "px-2.5 sm:px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs", children: [
                /* @__PURE__ */ t("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ e(Nl, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }),
                  /* @__PURE__ */ e("span", { className: "font-semibold text-white truncate", children: i.explorer.secondaryPane }),
                  /* @__PURE__ */ t(
                    "select",
                    {
                      value: xe || "",
                      onChange: (r) => U(r.target.value || null),
                      className: "bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-cyan-300 max-w-[140px] sm:max-w-none truncate",
                      children: [
                        /* @__PURE__ */ t("option", { value: "", children: [
                          "/ (",
                          i.explorer.rootVolume,
                          ")"
                        ] }),
                        n.filter((r) => !r.trashed && r.type === "folder").map((r) => /* @__PURE__ */ t("option", { value: r.id, children: [
                          "/",
                          r.name
                        ] }, r.id))
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Q.size === 0,
                    onClick: () => {
                      Q.size !== 0 && Mt(
                        xe || "",
                        Array.from(Q)
                      );
                    },
                    className: "px-2.5 py-1 rounded bg-cyan-600/25 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/35 disabled:opacity-35 text-[11px] font-medium shrink-0",
                    children: i.explorer.transferHere
                  }
                )
              ] }),
              /* @__PURE__ */ e("div", { className: "flex-1 overflow-auto p-3 space-y-1.5", children: n.filter((r) => !r.trashed && r.parentId === xe).map((r) => /* @__PURE__ */ t(
                "div",
                {
                  onDoubleClick: () => {
                    r.type === "folder" ? U(r.id) : _t(r);
                  },
                  className: "px-3 py-2 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-between text-xs cursor-pointer",
                  children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5 truncate", children: [
                      Pt(r, "w-5 h-5"),
                      /* @__PURE__ */ e("span", { className: "text-slate-200 truncate", children: r.name })
                    ] }),
                    /* @__PURE__ */ e("span", { className: "font-mono text-[11px] text-slate-400", children: r.security.posix.octal })
                  ]
                },
                r.id
              )) })
            ] })
          ] }),
          a.enableDetailsInspector && /* @__PURE__ */ t(Je, { children: [
            g && /* @__PURE__ */ e(
              "div",
              {
                onClick: () => ge(!1),
                className: "absolute inset-0 bg-black/60 backdrop-blur-[1px] z-30 lg:hidden"
              }
            ),
            /* @__PURE__ */ e(
              "div",
              {
                onMouseDown: (r) => V("right", r),
                className: "w-1 hover:w-1.5 bg-transparent hover:bg-blue-500/60 cursor-col-resize transition-all shrink-0 hidden lg:block z-20",
                title: "Ayrıntılar Bölmesini Yeniden Boyutlandır (Sürükle)"
              }
            ),
            /* @__PURE__ */ t(
              "div",
              {
                style: { width: `${k}px` },
                className: `bg-[#0d131f] border-l border-slate-800/90 flex-col justify-between shrink-0 overflow-y-auto select-none ${g ? "absolute inset-y-0 right-0 z-40 flex max-w-[90vw] shadow-2xl lg:static" : "hidden lg:flex"}`,
                children: [
                  /* @__PURE__ */ t("div", { className: "px-4 pt-3.5 pb-2.5 border-b border-slate-800/80 flex items-start justify-between", children: [
                    /* @__PURE__ */ t("div", { className: "flex items-start gap-2.5", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: "material-symbols-outlined text-blue-400 mt-0.5",
                          style: { fontSize: "20px" },
                          children: "info"
                        }
                      ),
                      /* @__PURE__ */ t("div", { children: [
                        /* @__PURE__ */ e("div", { className: "text-sm font-bold text-white leading-tight", children: "Ayrıntılar" }),
                        /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-400 mt-0.5", children: Q.size > 1 ? `${Q.size} öğe seçildi` : I ? I.type === "folder" ? i.explorer.fileFolder : `${I.extension ? I.extension.slice(1).toUpperCase() : "SYSTEM"} ${i.explorer.fileSuffix}` : "Dizin Özeti" })
                      ] })
                    ] }),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: () => {
                          ge(!1), (typeof window > "u" || window.innerWidth >= 1024) && (l == null || l({ enableDetailsInspector: !1 }));
                        },
                        className: "w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white",
                        title: "Kapat",
                        children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "close" })
                      }
                    )
                  ] }),
                  ye.length > 1 && /* @__PURE__ */ t("div", { className: "mx-4 mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2", children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-xs", children: [
                      /* @__PURE__ */ t("span", { className: "font-bold text-emerald-200", children: [
                        "Çoklu Seçim (",
                        ye.length,
                        " öğe)"
                      ] }),
                      /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-emerald-300", children: [
                        ye.filter((r) => r.type === "folder").length,
                        " klasör •",
                        " ",
                        ye.filter((r) => r.type !== "folder").length,
                        " dosya"
                      ] })
                    ] }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => void vt(ye),
                        className: "w-full px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow",
                        children: [
                          /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "folder_zip" }),
                          /* @__PURE__ */ e("span", { children: "Seçilenleri ZIP İndir (.zip)" })
                        ]
                      }
                    )
                  ] }),
                  I && Ot ? /* @__PURE__ */ t("div", { className: "p-4 space-y-4 flex-1", children: [
                    I.category === "video" && I.blobUrl ? /* @__PURE__ */ t("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ e("div", { className: "w-full rounded-xl overflow-hidden bg-black border border-slate-800/90 shadow-inner relative", children: /* @__PURE__ */ e(
                        "video",
                        {
                          src: I.blobUrl,
                          poster: I.thumbnailUrl,
                          controls: !0,
                          playsInline: !0,
                          preload: "metadata",
                          className: "w-full h-44 object-contain bg-black"
                        },
                        I.id
                      ) }),
                      /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => Rt(I),
                            className: "flex-1 px-2.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition",
                            children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined",
                                  style: { fontSize: "15px" },
                                  children: "play_circle"
                                }
                              ),
                              /* @__PURE__ */ e("span", { children: "Medya Oynatıcıda Aç" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ e(
                          "a",
                          {
                            href: I.blobUrl,
                            download: I.name,
                            className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-medium flex items-center gap-1 transition",
                            title: "Dosyayı İndir",
                            children: /* @__PURE__ */ e(
                              "span",
                              {
                                className: "material-symbols-outlined",
                                style: { fontSize: "14px" },
                                children: "download"
                              }
                            )
                          }
                        )
                      ] })
                    ] }) : I.category === "image" && (I.blobUrl || I.thumbnailUrl) ? /* @__PURE__ */ t("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ t(
                        "div",
                        {
                          onClick: () => _t(I),
                          className: "w-full h-44 rounded-xl bg-slate-950/90 border border-slate-800/90 flex items-center justify-center overflow-hidden shadow-inner cursor-pointer group relative",
                          title: "WebGL Shader Stüdyosunda açmak için tıklayın",
                          children: [
                            /* @__PURE__ */ e(
                              "img",
                              {
                                src: I.thumbnailUrl || I.blobUrl,
                                alt: I.name,
                                className: "w-full h-full object-contain group-hover:scale-[1.03] transition-transform"
                              }
                            ),
                            I.thumbnailMeta && /* @__PURE__ */ e(
                              "span",
                              {
                                style: { color: "#2FF58E" },
                                className: "absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 border border-emerald-500/40 text-[9px] font-mono font-bold text-[#2FF58E]",
                                children: I.thumbnailMeta.fromCache ? "L1/IDB CACHE HIT" : "THUMB CACHED"
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => Ct(I),
                            className: "flex-1 px-2.5 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition",
                            children: [
                              /* @__PURE__ */ e(Vt, { className: "w-3.5 h-3.5 text-pink-400" }),
                              /* @__PURE__ */ e("span", { children: "WebGL Stüdyoda Düzenle" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ e(
                          "button",
                          {
                            onClick: () => xa(I),
                            className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-medium flex items-center gap-1 transition",
                            title: "Görseli İndir",
                            children: /* @__PURE__ */ e(
                              "span",
                              {
                                className: "material-symbols-outlined",
                                style: { fontSize: "14px" },
                                children: "download"
                              }
                            )
                          }
                        )
                      ] })
                    ] }) : I.category === "audio" && I.blobUrl ? /* @__PURE__ */ t("div", { className: "w-full rounded-xl bg-slate-950/80 border border-slate-800/90 p-3 space-y-2.5 shadow-inner", children: [
                      /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-2", children: Pt(I, "w-14 h-14") }),
                      /* @__PURE__ */ e(
                        "audio",
                        {
                          src: I.blobUrl,
                          controls: !0,
                          className: "w-full h-8"
                        },
                        I.id
                      )
                    ] }) : /* @__PURE__ */ e(
                      "div",
                      {
                        onClick: () => I.category === "video" || I.category === "audio" ? Rt(I) : void 0,
                        className: `w-full h-36 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-center p-4 shadow-inner ${I.category === "video" || I.category === "audio" ? "cursor-pointer hover:border-purple-500/50" : ""}`,
                        children: Pt(I, "w-20 h-20")
                      }
                    ),
                    /* @__PURE__ */ t("div", { children: [
                      /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-white break-words leading-snug", children: I.name }),
                      /* @__PURE__ */ t("p", { className: "text-[11px] text-slate-400 mt-0.5", children: [
                        I.type === "folder" ? i.explorer.fileFolder : I.mimeType,
                        " ",
                        "• ",
                        Qa(I)
                      ] }),
                      /* @__PURE__ */ t("div", { className: "flex items-center gap-2 mt-3", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => Wt(I),
                            className: "px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-medium flex items-center gap-1.5 transition",
                            children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined",
                                  style: { fontSize: "15px" },
                                  children: "share"
                                }
                              ),
                              /* @__PURE__ */ e("span", { children: "Paylaş" })
                            ]
                          }
                        ),
                        I.type === "folder" ? /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => void vt([I]),
                            className: "px-2.5 py-1.5 rounded-md bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-1 transition",
                            title: "Klasörü ve tüm alt dizinlerini ZIP olarak indir",
                            children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined",
                                  style: { fontSize: "15px" },
                                  children: "folder_zip"
                                }
                              ),
                              /* @__PURE__ */ e("span", { children: "ZIP İndir" })
                            ]
                          }
                        ) : /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => xa(I),
                            className: "px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 text-xs font-medium flex items-center gap-1 transition",
                            title: "Bilgisayara İndir",
                            children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined",
                                  style: { fontSize: "15px" },
                                  children: "download"
                                }
                              ),
                              /* @__PURE__ */ e("span", { children: "İndir" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ e(
                          "button",
                          {
                            onClick: () => Jr(I),
                            className: "px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition",
                            children: I.security.locked ? /* @__PURE__ */ t(Je, { children: [
                              /* @__PURE__ */ e(_r, { className: "w-3.5 h-3.5 text-emerald-400" }),
                              /* @__PURE__ */ e("span", { children: i.explorer.unlockBtn })
                            ] }) : /* @__PURE__ */ t(Je, { children: [
                              /* @__PURE__ */ e(bt, { className: "w-3.5 h-3.5 text-rose-400" }),
                              /* @__PURE__ */ e("span", { children: i.explorer.lockBtn })
                            ] })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 mt-3", children: ["blue", "emerald", "amber", "rose", "purple", "cyan"].map(
                        (r) => /* @__PURE__ */ e(
                          "button",
                          {
                            onClick: () => el(
                              I.id,
                              I.colorTag === r ? null : r
                            ),
                            className: `w-4 h-4 rounded-full border transition ${I.colorTag === r ? "scale-125 border-white" : "border-transparent opacity-60 hover:opacity-100"} ${r === "blue" ? "bg-blue-500" : r === "emerald" ? "bg-emerald-500" : r === "amber" ? "bg-amber-500" : r === "rose" ? "bg-rose-500" : r === "purple" ? "bg-purple-500" : "bg-cyan-500"}`,
                            title: r
                          },
                          r
                        )
                      ) })
                    ] }),
                    /* @__PURE__ */ t("div", { className: "pt-3 border-t border-slate-800/90 space-y-2.5 text-xs", children: [
                      /* @__PURE__ */ e("div", { className: "font-semibold text-white", children: "Ayrıntılar" }),
                      /* @__PURE__ */ t("div", { className: "space-y-2 text-[11px]", children: [
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Tür" }),
                          /* @__PURE__ */ e("div", { className: "text-slate-100 font-medium", children: I.type === "folder" ? i.explorer.fileFolder : `${I.extension ? I.extension.slice(1).toUpperCase() : "SYSTEM"} ${i.explorer.fileSuffix}` })
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Boyut" }),
                          /* @__PURE__ */ e("div", { className: "text-slate-100 font-mono font-medium", children: I.type === "folder" ? ne.formatBytes(
                            ne.computeFolderSize(
                              I.id,
                              n
                            )
                          ) : `${ne.formatBytes(
                            I.size
                          )} (${I.size.toLocaleString("tr-TR")} bayt)` })
                        ] }),
                        I.imageMeta && /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Çözünürlük & Renk Paleti" }),
                          /* @__PURE__ */ t("div", { className: "text-slate-100 font-mono flex items-center gap-2 flex-wrap", children: [
                            /* @__PURE__ */ t("span", { children: [
                              I.imageMeta.width,
                              " ×",
                              " ",
                              I.imageMeta.height,
                              " px"
                            ] }),
                            I.durationSec && I.durationSec > 0 ? /* @__PURE__ */ t("span", { className: "text-purple-400", children: [
                              "• ",
                              Math.floor(I.durationSec / 60),
                              ":",
                              Math.floor(I.durationSec % 60).toString().padStart(2, "0"),
                              " ",
                              "sn"
                            ] }) : null,
                            /* @__PURE__ */ e("span", { className: "inline-flex items-center gap-1 ml-1", children: I.imageMeta.palette.map((r, o) => /* @__PURE__ */ e(
                              "span",
                              {
                                style: { backgroundColor: r },
                                className: "w-3 h-3 rounded-sm border border-white/25 inline-block",
                                title: `Dominant RGB #${o + 1}: ${r}`
                              },
                              o
                            )) })
                          ] })
                        ] }),
                        I.thumbnailMeta && /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Thumbnail Önbellek (L1 + IndexedDB)" }),
                          /* @__PURE__ */ t("div", { className: "text-cyan-300 font-mono text-[10px]", children: [
                            ne.formatBytes(
                              I.thumbnailMeta.thumbByteSize
                            ),
                            " ",
                            "(",
                            I.thumbnailMeta.format,
                            ") •",
                            " ",
                            I.thumbnailMeta.generationMs,
                            " ms •",
                            " ",
                            /* @__PURE__ */ e("span", { className: "text-emerald-400 font-semibold", children: I.thumbnailMeta.fromCache ? "CACHE HIT" : "ÖNBELLEĞE YAZILDI" })
                          ] })
                        ] }),
                        I.type !== "folder" && I.checksumSha256 && /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "SHA-256 Özeti" }),
                          /* @__PURE__ */ e(
                            "div",
                            {
                              className: "text-emerald-400/90 font-mono text-[10px] truncate",
                              title: I.checksumSha256,
                              children: I.checksumSha256
                            }
                          )
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Dosya konumu" }),
                          /* @__PURE__ */ e("div", { className: "text-slate-100 font-mono break-all", children: Qa(I) })
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Değiştirme tarihi" }),
                          /* @__PURE__ */ e("div", { className: "text-slate-100", children: new Date(I.updatedAt).toLocaleString(
                            a.locale === "en" ? "en-US" : a.locale === "de" ? "de-DE" : "tr-TR"
                          ) })
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Sahip & POSIX" }),
                          /* @__PURE__ */ t("div", { className: "text-slate-100 font-mono", children: [
                            I.security.ownerName,
                            " •",
                            " ",
                            /* @__PURE__ */ t("span", { className: "text-blue-400", children: [
                              Ot.effectiveOctal,
                              " (",
                              Ot.effectiveSymbolic,
                              ")"
                            ] })
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ t("div", { className: "pt-3 border-t border-slate-800/90 space-y-2", children: [
                      /* @__PURE__ */ e("div", { className: "flex items-center justify-between text-[11px]", children: /* @__PURE__ */ t("span", { className: "font-semibold text-white", children: [
                        i.explorer.effectivePerms,
                        " (",
                        y.role.toUpperCase(),
                        ")"
                      ] }) }),
                      /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-1.5 text-[10px] font-mono", children: [
                        "read",
                        "write",
                        "delete",
                        "rename",
                        "upload",
                        "download",
                        "share",
                        "chmod",
                        "lock"
                      ].map((r) => {
                        const o = Ot.allowed[r];
                        return /* @__PURE__ */ t(
                          "div",
                          {
                            title: Ot.reasons[r],
                            className: `px-1.5 py-1 rounded border flex items-center justify-between ${o ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border-rose-500/30 text-rose-300"}`,
                            children: [
                              /* @__PURE__ */ e("span", { children: r }),
                              o ? /* @__PURE__ */ e(Ht, { className: "w-3 h-3 shrink-0" }) : /* @__PURE__ */ e($a, { className: "w-3 h-3 shrink-0" })
                            ]
                          },
                          r
                        );
                      }) })
                    ] }),
                    ((Ja = I.security.quota) == null ? void 0 : Ja.maxBytes) && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1", children: [
                      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-amber-300", children: i.explorer.customFolderQuota }),
                      /* @__PURE__ */ t("div", { className: "text-xs font-mono text-white", children: [
                        "Limit:",
                        " ",
                        ne.formatBytes(I.security.quota.maxBytes)
                      ] })
                    ] }),
                    /* @__PURE__ */ e("div", { className: "pt-2", children: /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => et(I),
                        className: "w-full px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-medium flex items-center justify-center gap-2 transition",
                        children: [
                          /* @__PURE__ */ e(
                            "span",
                            {
                              className: "material-symbols-outlined text-blue-400",
                              style: { fontSize: "16px" },
                              children: "tune"
                            }
                          ),
                          /* @__PURE__ */ t("span", { children: [
                            "Özellikler (",
                            i.explorer.aclChmodBtn,
                            ")"
                          ] })
                        ]
                      }
                    ) }),
                    a.enableAuditLog && Wa.length > 0 && /* @__PURE__ */ t("div", { className: "space-y-1.5 pt-2 border-t border-slate-800", children: [
                      /* @__PURE__ */ t("div", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5", children: [
                        /* @__PURE__ */ e(Fr, { className: "w-3 h-3 text-blue-400" }),
                        " ",
                        i.explorer.auditTrail
                      ] }),
                      /* @__PURE__ */ e("div", { className: "space-y-1 max-h-36 overflow-y-auto pr-1", children: Wa.slice(0, 5).map((r) => /* @__PURE__ */ t(
                        "div",
                        {
                          className: "p-1.5 rounded bg-slate-900/90 border border-slate-800/80 text-[10px]",
                          children: [
                            /* @__PURE__ */ t("div", { className: "flex items-center justify-between font-mono", children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: r.status === "denied" ? "text-rose-400 font-semibold" : "text-emerald-400 font-semibold",
                                  children: r.action
                                }
                              ),
                              /* @__PURE__ */ e("span", { className: "text-slate-500", children: r.timestamp })
                            ] }),
                            /* @__PURE__ */ e("p", { className: "text-slate-400 mt-0.5 line-clamp-1", children: r.details })
                          ]
                        },
                        r.id
                      )) })
                    ] })
                  ] }) : /* @__PURE__ */ e("div", { className: "p-6 text-center text-xs text-slate-500 my-auto", children: i.explorer.emptyInspector })
                ]
              }
            )
          ] })
        ] }),
        a.enableStatusBar && /* @__PURE__ */ t("div", { className: "px-2.5 sm:px-3.5 py-1 bg-[#080c14] border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 select-none", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 sm:gap-3 min-w-0", children: [
            /* @__PURE__ */ t("span", { className: "truncate", children: [
              /* @__PURE__ */ e("strong", { className: "text-slate-200", children: tt.length }),
              " ",
              i.explorer.statusListed
            ] }),
            Q.size > 0 && /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ e("span", { children: "|" }),
              /* @__PURE__ */ t("span", { className: "text-blue-400 font-medium truncate", children: [
                Q.size,
                " ",
                i.explorer.statusSelected,
                " (",
                ne.formatBytes(
                  ye.reduce((r, o) => r + o.size, 0)
                ),
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 sm:gap-3 shrink-0", children: [
            (() => {
              const r = ht.getStats();
              return r.l1Entries > 0 ? /* @__PURE__ */ t(
                "span",
                {
                  className: "hidden md:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 font-mono text-[10px] text-emerald-300",
                  title: "2 Katmanlı Thumbnail Önbelleği (L1 Bellek LRU + L2 IndexedDB)",
                  children: [
                    /* @__PURE__ */ t("span", { children: [
                      "Thumb Cache: ",
                      r.l1Entries,
                      " öğe"
                    ] }),
                    /* @__PURE__ */ e("span", { children: "•" }),
                    /* @__PURE__ */ e("span", { children: ne.formatBytes(r.totalThumbBytes) })
                  ]
                }
              ) : null;
            })(),
            /* @__PURE__ */ t("span", { className: "hidden sm:inline font-mono text-slate-400", children: [
              i.explorer.statusFreeSpace,
              " ",
              ne.formatBytes(
                Math.max(0, a.totalDiskQuotaBytes - ga)
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5 bg-slate-900 p-0.5 rounded border border-slate-800", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => ke("details"),
                  className: `p-1 rounded transition ${pe === "details" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
                  title: i.explorer.viewDetails,
                  children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "table_rows" })
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => ke("large_icons"),
                  className: `p-1 rounded transition ${pe === "large_icons" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
                  title: i.explorer.viewLarge,
                  children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "grid_view" })
                }
              ),
              a.enableWebGLAcceleration && /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => ke("webgl_spatial"),
                  className: `p-1 rounded transition ${pe === "webgl_spatial" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
                  title: i.explorer.webglScene,
                  children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "memory" })
                }
              )
            ] })
          ] })
        ] }),
        a.enableContextMenu && Te && /* @__PURE__ */ e(
          "div",
          {
            style: {
              left: Math.max(8, Math.min(Te.x, window.innerWidth - 250)),
              top: Math.max(8, Math.min(Te.y, window.innerHeight - 360))
            },
            onClick: (r) => r.stopPropagation(),
            className: "fixed z-50 w-60 max-w-[calc(100vw-16px)] bg-[#111827]/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl py-1.5 text-xs text-slate-200",
            children: Te.node ? /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    _t(Te.node), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-blue-600/30 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2 font-medium", children: [
                      /* @__PURE__ */ e(Mr, { className: "w-3.5 h-3.5 text-blue-400" }),
                      " ",
                      i.explorer.ctxOpen
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: "Enter" })
                  ]
                }
              ),
              Te.node.type !== "folder" && /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    xa(Te.node), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-cyan-600/20 flex items-center justify-between text-cyan-300",
                  children: /* @__PURE__ */ t("span", { className: "flex items-center gap-2 font-medium", children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: "material-symbols-outlined",
                        style: { fontSize: "16px" },
                        children: "download"
                      }
                    ),
                    /* @__PURE__ */ e("span", { children: "Bilgisayara İndir" })
                  ] })
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    const r = ye.length > 1 && Q.has(Te.node.id) ? ye : [Te.node];
                    vt(r), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-emerald-600/20 flex items-center justify-between text-emerald-300",
                  children: /* @__PURE__ */ t("span", { className: "flex items-center gap-2 font-medium", children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: "material-symbols-outlined",
                        style: { fontSize: "16px" },
                        children: "folder_zip"
                      }
                    ),
                    /* @__PURE__ */ e("span", { children: ye.length > 1 && Q.has(Te.node.id) ? `Seçimi ZIP Olarak İndir (${ye.length})` : Te.node.type === "folder" ? "Klasörü ZIP Olarak İndir (.zip)" : "ZIP Olarak İndir (.zip)" })
                  ] })
                }
              ),
              Te.node.type === "folder" && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    he(Te.node.id, "volume"), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-blue-600/20 flex items-center justify-between text-blue-300",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2 font-medium", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          className: "material-symbols-outlined",
                          style: { fontSize: "16px" },
                          children: "tab"
                        }
                      ),
                      /* @__PURE__ */ e("span", { children: "Yeni Sekmede Aç" })
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: "Orta Tık" })
                  ]
                }
              ),
              Te.node.category === "image" && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Ct(Te.node), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-pink-600/25 flex items-center gap-2 text-pink-300",
                  children: [
                    /* @__PURE__ */ e(Vt, { className: "w-3.5 h-3.5" }),
                    " ",
                    i.explorer.ctxShader
                  ]
                }
              ),
              Te.node.type === "archive" && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    qr(Te.node), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-emerald-600/25 flex items-center gap-2 text-emerald-300",
                  children: [
                    /* @__PURE__ */ e(Sl, { className: "w-3.5 h-3.5" }),
                    " ",
                    i.explorer.ctxExtract
                  ]
                }
              ),
              /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    ie(/* @__PURE__ */ new Set([Te.node.id])), Lt("cut"), Fe(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Gl, { className: "w-3.5 h-3.5 text-amber-400" }),
                      " ",
                      i.explorer.cut
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: "Ctrl+X" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    ie(/* @__PURE__ */ new Set([Te.node.id])), Lt("copy"), Fe(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Oa, { className: "w-3.5 h-3.5 text-blue-400" }),
                      " ",
                      i.explorer.copy
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: "Ctrl+C" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    fe(Te.node.id), Fe(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Rl, { className: "w-3.5 h-3.5 text-purple-400" }),
                      " ",
                      i.explorer.rename
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: "F2" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Qr(Te.node), Fe(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(Ka, { className: "w-3.5 h-3.5 text-amber-400" }),
                    /* @__PURE__ */ e("span", { children: Te.node.starred ? i.explorer.ctxStarRemove : i.explorer.ctxStarAdd })
                  ]
                }
              ),
              /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    et(Te.node), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-indigo-600/25 flex items-center justify-between text-indigo-300 font-medium",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Pa, { className: "w-3.5 h-3.5" }),
                      " ",
                      i.explorer.permissionsAcl
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono", children: Te.node.security.posix.octal })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Wt(Te.node), Fe(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(ia, { className: "w-3.5 h-3.5 text-emerald-400" }),
                    " ",
                    i.explorer.ctxShare
                  ]
                }
              ),
              /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    ie(/* @__PURE__ */ new Set([Te.node.id])), Jt(!1), Fe(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-rose-500/20 text-rose-300 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Ir, { className: "w-3.5 h-3.5" }),
                      " ",
                      i.explorer.ctxDelete
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono", children: "Del" })
                  ]
                }
              )
            ] }) : /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    qa(), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(zl, { className: "w-3.5 h-3.5 text-blue-400" }),
                    " ",
                    i.explorer.newFolder
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Qt(), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(Dl, { className: "w-3.5 h-3.5 text-emerald-400" }),
                    " ",
                    i.explorer.newFile
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    var r;
                    (r = qt.current) == null || r.click(), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2 text-cyan-300",
                  children: [
                    /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "upload_file" }),
                    /* @__PURE__ */ e("span", { children: "Bilgisayardan Dosya Yükle..." })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    var r;
                    (r = Zt.current) == null || r.click(), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2 text-amber-300",
                  children: [
                    /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "drive_folder_upload" }),
                    /* @__PURE__ */ e("span", { children: "Bilgisayardan Klasör Yükle..." })
                  ]
                }
              ),
              tt.length > 0 && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    vt(
                      ye.length > 0 ? ye : tt
                    ), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-emerald-600/20 flex items-center gap-2 text-emerald-300",
                  children: [
                    /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "folder_zip" }),
                    /* @__PURE__ */ e("span", { children: ye.length > 0 ? `Seçimi ZIP İndir (${ye.length} öğe)` : "Bu Klasörü ZIP Olarak İndir (.zip)" })
                  ]
                }
              ),
              Me.mode && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    $t(z), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-emerald-600/20 text-emerald-300 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(kl, { className: "w-3.5 h-3.5" }),
                    " ",
                    i.explorer.paste,
                    " (Ctrl+V)"
                  ]
                }
              ),
              qe && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    et(qe), Fe(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2 text-indigo-300",
                  children: [
                    /* @__PURE__ */ e(Pa, { className: "w-3.5 h-3.5" }),
                    " ",
                    i.explorer.ctxFolderPerm
                  ]
                }
              )
            ] })
          }
        ),
        gt && /* @__PURE__ */ t(
          "div",
          {
            className: `fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-50 sm:max-w-md rounded-xl p-3.5 sm:p-4 border shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 ${gt.type === "error" ? "bg-rose-950/95 border-rose-500/60 text-rose-100" : gt.type === "info" ? "bg-slate-900/95 border-blue-500/50 text-slate-100" : "bg-emerald-950/95 border-emerald-500/60 text-emerald-100"}`,
            children: [
              gt.type === "error" ? /* @__PURE__ */ e(Cr, { className: "w-5 h-5 text-rose-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ e(Ht, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }),
              /* @__PURE__ */ t("div", { className: "text-xs", children: [
                /* @__PURE__ */ e("div", { className: "font-bold", children: gt.title }),
                /* @__PURE__ */ e("div", { className: "text-slate-300 mt-0.5 leading-relaxed", children: gt.message })
              ] })
            ]
          }
        ),
        xt && /* @__PURE__ */ e(
          Pn,
          {
            node: xt,
            allNodes: n,
            currentUser: y,
            config: a,
            onClose: () => et(null),
            onSaveSecurity: Zr
          }
        ),
        zt && /* @__PURE__ */ e(
          An,
          {
            node: zt,
            canWrite: Ze.allowed.write,
            writeDenialReason: Ze.reasons.write,
            onClose: () => Ct(null),
            onSaveAsNewFile: (r, o, p, h) => Qt(r, o, p, "image", h)
          }
        ),
        yt && /* @__PURE__ */ e(
          Rn,
          {
            node: yt,
            canWrite: de.evaluateNodePermissions(
              yt,
              y,
              n,
              a
            ).allowed.write,
            denialReason: de.evaluateNodePermissions(
              yt,
              y,
              n,
              a
            ).reasons.write,
            onClose: () => Et(null),
            onSaveContent: (r, o) => {
              const p = n.map(
                (h) => h.id === r ? {
                  ...h,
                  content: o,
                  updatedAt: (/* @__PURE__ */ new Date()).toISOString()
                } : h
              );
              Le(p), W("success", "Dosya İçeriği Kaydedildi", `"${yt.name}" güncellendi.`);
            }
          }
        ),
        da && /* @__PURE__ */ e(
          $n,
          {
            node: da,
            onClose: () => Wt(null),
            onSaveShareConfig: (r, o) => {
              const p = n.map(
                (h) => h.id === r ? { ...h, shareLink: o } : h
              );
              Le(p), W(
                "success",
                o ? "Paylaşım Bağlantısı Aktif" : "Paylaşım Kaldırıldı",
                `"${da.name}" paylaşım ayarları güncellendi.`
              );
            }
          }
        ),
        Br && ye.length > 0 && /* @__PURE__ */ e(
          Bn,
          {
            nodes: ye,
            onClose: () => Ha(!1),
            onApplyBatchRename: (r) => {
              const o = new Map(r.map((h) => [h.id, h.newName])), p = n.map(
                (h) => o.has(h.id) ? { ...h, name: o.get(h.id) } : h
              );
              Le(p), W(
                "success",
                "Toplu Adlandırma Tamamlandı",
                `${r.length} öğe yeniden adlandırıldı.`
              );
            }
          }
        ),
        ca && /* @__PURE__ */ e(
          On,
          {
            conflicts: ca,
            onClose: () => ma(null),
            onResolve: (r) => {
              var o;
              return $t(((o = ca[0]) == null ? void 0 : o.targetParentId) ?? z, r);
            }
          }
        ),
        Dt && /* @__PURE__ */ e(
          Gn,
          {
            node: Dt,
            onClose: () => Rt(null)
          }
        ),
        $r && Yt.length > 0 && /* @__PURE__ */ e(
          Wl,
          {
            queue: Yt,
            isMinimized: Or,
            onToggleMinimize: () => pa((r) => !r),
            onCloseTray: () => ua(!1),
            onClearCompleted: () => Bt(
              (r) => r.filter((o) => o.status === "uploading" || o.status === "queued")
            ),
            onCancelItem: Hr,
            onCancelAll: Vr,
            onLocateNode: (r, o) => {
              E(r, "volume"), o && ie(/* @__PURE__ */ new Set([o]));
            }
          }
        )
      ]
    }
  );
}, fs = ({
  size: a = 40,
  className: l = ""
}) => {
  const s = sl().replace(/:/g, "");
  return /* @__PURE__ */ e(
    "div",
    {
      style: { width: a, height: a },
      className: `relative inline-flex items-center justify-center select-none shrink-0 ${l}`,
      children: /* @__PURE__ */ t(
        "svg",
        {
          width: a,
          height: a,
          viewBox: "0 0 120 120",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: "relative z-10",
          children: [
            /* @__PURE__ */ t("defs", { children: [
              /* @__PURE__ */ e("clipPath", { id: `hyp_clip_${s}`, children: /* @__PURE__ */ e("path", { d: "M28 12H58C65.5 12 71.2 16.5 74.2 22H90C101.046 22 110 30.9543 110 42V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V30C10 20.0589 18.0589 12 28 12Z" }) }),
              /* @__PURE__ */ t(
                "linearGradient",
                {
                  id: `hyp_back_${s}`,
                  x1: "14",
                  y1: "12",
                  x2: "76",
                  y2: "82",
                  gradientUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#0088FF" }),
                    /* @__PURE__ */ e("stop", { offset: "50%", stopColor: "#0052C8" }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#002266" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "linearGradient",
                {
                  id: `hyp_facet_${s}`,
                  x1: "16",
                  y1: "14",
                  x2: "58",
                  y2: "58",
                  gradientUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#38C8FF", stopOpacity: "0.42" }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#002266", stopOpacity: "0.05" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "linearGradient",
                {
                  id: `hyp_mid_${s}`,
                  x1: "88",
                  y1: "20",
                  x2: "18",
                  y2: "98",
                  gradientUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#14EEEC" }),
                    /* @__PURE__ */ e("stop", { offset: "38%", stopColor: "#00B8FF" }),
                    /* @__PURE__ */ e("stop", { offset: "76%", stopColor: "#006BE6" }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#00389E" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "linearGradient",
                {
                  id: `hyp_front_${s}`,
                  x1: "104",
                  y1: "32",
                  x2: "16",
                  y2: "108",
                  gradientUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#2FF58E" }),
                    /* @__PURE__ */ e("stop", { offset: "36%", stopColor: "#10DC9E" }),
                    /* @__PURE__ */ e("stop", { offset: "70%", stopColor: "#00B2E8" }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#006AE0" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "linearGradient",
                {
                  id: `hyp_fold_${s}`,
                  x1: "12",
                  y1: "62",
                  x2: "82",
                  y2: "108",
                  gradientUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#2FF58E", stopOpacity: "0.88" }),
                    /* @__PURE__ */ e("stop", { offset: "55%", stopColor: "#00C4F0", stopOpacity: "0.45" }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#004EC2", stopOpacity: "0.15" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "linearGradient",
                {
                  id: `hyp_rim_front_${s}`,
                  x1: "106",
                  y1: "36",
                  x2: "16",
                  y2: "88",
                  gradientUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#B0FFD4", stopOpacity: "0.95" }),
                    /* @__PURE__ */ e("stop", { offset: "50%", stopColor: "#5CEEFF", stopOpacity: "0.55" }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#0077FF", stopOpacity: "0.1" })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "linearGradient",
                {
                  id: `hyp_rim_mid_${s}`,
                  x1: "96",
                  y1: "22",
                  x2: "14",
                  y2: "72",
                  gradientUnits: "userSpaceOnUse",
                  children: [
                    /* @__PURE__ */ e("stop", { offset: "0%", stopColor: "#9EFFFF", stopOpacity: "0.9" }),
                    /* @__PURE__ */ e("stop", { offset: "55%", stopColor: "#38C8FF", stopOpacity: "0.5" }),
                    /* @__PURE__ */ e("stop", { offset: "100%", stopColor: "#0044AA", stopOpacity: "0.1" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ t("g", { clipPath: `url(#hyp_clip_${s})`, children: [
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M28 12H58C65.5 12 71.2 16.5 74.2 22H90C101.046 22 110 30.9543 110 42V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V30C10 20.0589 18.0589 12 28 12Z",
                  fill: `url(#hyp_back_${s})`
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M28 12H54L34 62H10V30C10 20.0589 18.0589 12 28 12Z",
                  fill: `url(#hyp_facet_${s})`
                }
              ),
              /* @__PURE__ */ e(
                "rect",
                {
                  x: "22",
                  y: "22",
                  width: "24",
                  height: "5",
                  rx: "2.5",
                  fill: "#67E8F9",
                  fillOpacity: "0.55"
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M10 66C18 69 27 66 35 55L55 29C60.5 22 68 19.5 77 19.5H110V45H10V66Z",
                  fill: "#001238",
                  fillOpacity: "0.38"
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M10 68.5C18.5 71.5 27.5 68 35.8 57.2L56.2 30.8C61.4 24.2 68.6 22 77.5 22H90C101.046 22 110 30.9543 110 42V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V68.5Z",
                  fill: `url(#hyp_mid_${s})`
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M11 69.2C18.8 71.8 27.6 68.2 35.8 57.5L56.2 31.2C61.4 24.6 68.6 22.75 77.5 22.75H90",
                  stroke: `url(#hyp_rim_mid_${s})`,
                  strokeWidth: "1.5",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M10 86C22 89 35 83 45 69L63 44C69 35.8 77.5 32 88 32H110V60H10V86Z",
                  fill: "#001845",
                  fillOpacity: "0.36"
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M10 88C22.5 90.8 35.4 84.8 45.6 70.6L63.8 45.4C69.6 37.4 77.8 34 88.2 34H110V86C110 98.1503 100.15 108 88 108H32C19.8497 108 10 98.1503 10 86V88Z",
                  fill: `url(#hyp_front_${s})`
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M11 88.5C22.8 91.2 35.5 85.2 45.6 71L63.8 45.8C69.6 37.8 77.8 34.75 88.2 34.75H109",
                  stroke: `url(#hyp_rim_front_${s})`,
                  strokeWidth: "1.5",
                  strokeLinecap: "round"
                }
              ),
              /* @__PURE__ */ e(
                "path",
                {
                  d: "M10 54H26C33.5 54 39.8 57.8 44.2 64.2L58.5 85.2C64.2 93.6 73.2 98 84.5 98H106.5C102.8 104 95.9 108 88 108H32C19.8497 108 10 98.1503 10 86V54Z",
                  fill: `url(#hyp_fold_${s})`
                }
              )
            ] })
          ]
        }
      )
    }
  );
}, Hn = {
  SRP: {
    label: "S • Single Responsibility",
    colorClass: "bg-blue-500/15 text-blue-300 border-blue-500/35"
  },
  OCP: {
    label: "O • Open/Closed Principle",
    colorClass: "bg-emerald-500/15 text-emerald-300 border-emerald-500/35"
  },
  LSP: {
    label: "L • Liskov Substitution",
    colorClass: "bg-amber-500/15 text-amber-300 border-amber-500/35"
  },
  ISP: {
    label: "I • Interface Segregation",
    colorClass: "bg-purple-500/15 text-purple-300 border-purple-500/35"
  },
  DIP: {
    label: "D • Dependency Inversion",
    colorClass: "bg-cyan-500/15 text-cyan-300 border-cyan-500/35"
  }
}, Xe = ({
  id: a,
  title: l,
  language: s,
  code: d,
  solidPrinciple: i,
  description: c,
  showLineNumbers: n = !0
}) => {
  const [u, x] = A(!1), w = He(
    () => Ft.tokenizeCode(d.trimEnd(), s),
    [d, s]
  ), P = () => {
    navigator.clipboard.writeText(d), x(!0), setTimeout(() => x(!1), 2e3);
  }, L = i ? Hn[i] : null;
  return /* @__PURE__ */ t(
    "div",
    {
      id: a,
      "data-codeblock-id": a,
      className: "code-surface-dark rounded-xl overflow-hidden border border-slate-800/90 bg-[#060911] my-4 shadow-xl scroll-mt-20",
      children: [
        /* @__PURE__ */ t("div", { className: "px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0c1220] border-b border-slate-800/90 flex items-center justify-between gap-2 sm:gap-3", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden", children: [
            /* @__PURE__ */ t("div", { className: "hidden xs:flex sm:flex items-center gap-1.5 mr-1 shrink-0", children: [
              /* @__PURE__ */ e("span", { className: "w-2.5 h-2.5 rounded-full bg-rose-500/80" }),
              /* @__PURE__ */ e("span", { className: "w-2.5 h-2.5 rounded-full bg-amber-400/80" }),
              /* @__PURE__ */ e("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500/80" })
            ] }),
            /* @__PURE__ */ e(
              "span",
              {
                className: "material-symbols-outlined text-blue-400 shrink-0",
                style: { fontSize: "16px" },
                children: "code_blocks"
              }
            ),
            /* @__PURE__ */ e(
              "span",
              {
                className: "text-[11px] sm:text-xs font-mono font-semibold text-slate-100 truncate",
                title: l,
                children: l
              }
            ),
            /* @__PURE__ */ e("span", { className: "px-1.5 sm:px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-slate-800 text-cyan-300 border border-slate-700 shrink-0", children: s }),
            /* @__PURE__ */ t("span", { className: "hidden sm:inline text-[10px] font-mono text-slate-400 shrink-0", children: [
              w.length,
              " satır"
            ] }),
            L && /* @__PURE__ */ e(
              "span",
              {
                className: `hidden md:inline-flex px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border shrink-0 ${L.colorClass}`,
                children: L.label
              }
            )
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: P,
              className: "px-2 sm:px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-[11px] sm:text-xs text-slate-200 flex items-center gap-1 sm:gap-1.5 transition shrink-0",
              children: [
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: `material-symbols-outlined ${u ? "text-emerald-400" : "text-slate-300"}`,
                    style: { fontSize: "15px" },
                    children: u ? "check_circle" : "content_copy"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "hidden xs:inline sm:inline", children: u ? "Kopyalandı" : "Kodu Kopyala" })
              ]
            }
          )
        ] }),
        c && /* @__PURE__ */ t("div", { className: "px-3 sm:px-4 py-2 bg-[#090e1a] border-b border-slate-800/70 text-[11px] text-slate-300 flex items-start sm:items-center gap-2", children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: "material-symbols-outlined text-amber-400 shrink-0 mt-0.5 sm:mt-0",
              style: { fontSize: "15px" },
              children: "lightbulb"
            }
          ),
          /* @__PURE__ */ e("span", { children: c })
        ] }),
        /* @__PURE__ */ e("div", { className: "p-2.5 sm:p-3.5 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed select-text", children: /* @__PURE__ */ e("table", { className: "w-full border-collapse", children: /* @__PURE__ */ e("tbody", { children: w.map((T, M) => /* @__PURE__ */ t(
          "tr",
          {
            className: "hover:bg-slate-900/60 transition-colors",
            children: [
              n && /* @__PURE__ */ e("td", { className: "select-none pr-4 text-right text-[11px] text-slate-600 w-9 align-top", children: M + 1 }),
              /* @__PURE__ */ e("td", { className: "whitespace-pre text-slate-200", children: T.map((v, B) => /* @__PURE__ */ e(
                "span",
                {
                  "data-token-type": v.type,
                  className: Ft.getTokenClassName(
                    v.type
                  ),
                  children: v.value
                },
                B
              )) })
            ]
          },
          M
        )) }) }) })
      ]
    }
  );
}, Vn = [
  { id: "blue", label: "Apple / Win11 Blue", hex: "#2997ff" },
  { id: "emerald", label: "Emerald Mint", hex: "#10b981" },
  { id: "violet", label: "Royal Violet", hex: "#8b5cf6" },
  { id: "amber", label: "Solar Amber", hex: "#f59e0b" },
  { id: "rose", label: "Crimson Rose", hex: "#f43f5e" },
  { id: "cyan", label: "Cyber Cyan", hex: "#06b6d4" }
], bs = ({
  config: a,
  onUpdateConfig: l
}) => {
  const { dict: s } = oa(), [d, i] = A(!1), c = `import { FileManGL } from 'filemangl';
import 'filemangl/style.css';
// i18n JSON dictionaries: src/core/i18n/locales/tr.json | en.json | de.json | ru.json

const fileManagerConfig = ${JSON.stringify(a, null, 2)};

export default function App() {
  return (
    <FileManGL
      config={fileManagerConfig}
      onConfigChange={(patch) => console.log('Config updated:', patch)}
    />
  );
}`, n = [
    { key: "enableRibbonToolbar", label: "Windows 11 Ribbon Toolbar", group: "ui" },
    { key: "enableDualPane", label: "Dual-Pane (Total Commander Mode)", group: "ui" },
    { key: "enableFolderTree", label: "Directory Tree Sidebar", group: "ui" },
    { key: "enableDetailsInspector", label: "Security & Metadata Inspector", group: "ui" },
    { key: "enableBreadcrumbs", label: "Address Bar & Breadcrumbs", group: "ui" },
    { key: "enableStatusBar", label: "Status Bar", group: "ui" },
    { key: "enableContextMenu", label: "Right-Click Context Menu", group: "ui" },
    { key: "enableRubberBandSelection", label: "Rubber-Band Marquee Multi-Select", group: "ui" },
    { key: "showFileExtensions", label: "Show File Extensions (.ts, .png)", group: "ui" },
    { key: "showPosixBadgesOnItems", label: "Show POSIX (0755) Badges", group: "security" },
    {
      key: "strictPermissionEnforcement",
      label: "Strict Permission Engine (ACL + POSIX)",
      group: "security"
    },
    {
      key: "respectFolderLocks",
      label: "Immutable Folder/File Lock Protection",
      group: "security"
    },
    { key: "enableAuditLog", label: "Live Security Audit Trail", group: "security" },
    { key: "enableWebGLAcceleration", label: "WebGL 60FPS Spatial Grid Engine", group: "webgl" },
    { key: "enableWebGLImageShaderStudio", label: "WebGL GLSL Image Shader Studio", group: "webgl" },
    { key: "enableWebGLDiskMap", label: "WebGL 3D Cushion Disk Map", group: "webgl" },
    { key: "enableArchiveCompression", label: "ZIP Archive & Extract Engine", group: "webgl" },
    { key: "enableBatchRename", label: "Batch Rename Engine", group: "webgl" }
  ];
  return /* @__PURE__ */ t("div", { className: "bg-[#0d1320] border border-slate-800/90 rounded-2xl p-5 shadow-xl space-y-5", children: [
    /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400", children: /* @__PURE__ */ e(Pr, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white", children: s.configurator.title }),
          /* @__PURE__ */ e("p", { className: "text-xs text-slate-400", children: s.configurator.subtitle })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
        Object.entries(il).map(([u, x]) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => l(x.patch),
            className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 text-xs font-medium text-slate-200 transition flex items-center gap-1.5",
            title: x.description,
            children: [
              /* @__PURE__ */ e(Vt, { className: "w-3.5 h-3.5 text-blue-400" }),
              x.label
            ]
          },
          u
        )),
        /* @__PURE__ */ t(
          "button",
          {
            onClick: () => i(!d),
            className: "px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg shadow-emerald-600/20",
            children: [
              /* @__PURE__ */ e(Dr, { className: "w-4 h-4" }),
              " ",
              s.configurator.exportJsxBtn
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-4", children: [
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ t("label", { className: "block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5", children: [
          /* @__PURE__ */ e(zr, { className: "w-3.5 h-3.5 text-blue-400" }),
          " ",
          s.configurator.languageLabel
        ] }),
        /* @__PURE__ */ e(
          "select",
          {
            value: a.locale,
            onChange: (u) => l({ locale: u.target.value }),
            className: "w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono",
            children: la.map((u) => /* @__PURE__ */ t("option", { value: u.code, children: [
              u.flag,
              " ",
              u.label,
              " (",
              u.code,
              ".json)"
            ] }, u.code))
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ t("label", { className: "block text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1.5", children: [
          /* @__PURE__ */ e(Ua, { className: "w-3.5 h-3.5 text-blue-400" }),
          " ",
          s.configurator.quotaLabel
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: 150,
              max: 2048,
              step: 50,
              value: Math.round(a.totalDiskQuotaBytes / (1024 * 1024)),
              onChange: (u) => l({
                totalDiskQuotaBytes: parseInt(u.target.value, 10) * 1024 * 1024
              }),
              className: "flex-1 accent-blue-500"
            }
          ),
          /* @__PURE__ */ t("span", { className: "font-mono text-xs font-bold text-blue-400 w-16 text-right", children: [
            Math.round(a.totalDiskQuotaBytes / (1024 * 1024)),
            " MB"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ e("label", { className: "block text-[11px] font-semibold text-slate-400 mb-1.5", children: s.configurator.driverLabel }),
        /* @__PURE__ */ t(
          "select",
          {
            value: a.driverType,
            onChange: (u) => l({
              driverType: u.target.value
            }),
            className: "w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono",
            children: [
              /* @__PURE__ */ e("option", { value: "vfs_localstorage", children: "VfsLocalStorageDriver (VFS)" }),
              /* @__PURE__ */ e("option", { value: "vfs_memory", children: "VfsMemoryDriver (RAM Disk)" }),
              /* @__PURE__ */ e("option", { value: "rest_connector", children: "RestConnectorDriver (Laravel / Node.js)" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ e("label", { className: "block text-[11px] font-semibold text-slate-400 mb-1.5", children: s.configurator.mountLabel }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: a.mountPath,
            onChange: (u) => l({ mountPath: u.target.value }),
            className: "w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-emerald-400"
          }
        )
      ] }),
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ e("label", { className: "block text-[11px] font-semibold text-slate-400 mb-1.5", children: s.configurator.blockedExtLabel }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: a.globalBlockedExtensions.join(", "),
            onChange: (u) => l({
              globalBlockedExtensions: u.target.value.split(",").map((x) => x.trim()).filter(Boolean)
            }),
            className: "w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-rose-300"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ t("label", { className: "block text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e(jl, { className: "w-3.5 h-3.5 text-blue-400" }),
            "Köşe Geometrisi (borderRadius)"
          ] }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-blue-400", children: String(a.borderRadius ?? "squircle") })
        ] }),
        /* @__PURE__ */ e("div", { className: "grid grid-cols-3 gap-1.5", children: [
          { id: "sharp", label: "Sharp (4px)" },
          { id: "squircle", label: "Squircle (12px)" },
          { id: "pill", label: "Pill (18px)" }
        ].map((u) => {
          const x = (a.borderRadius ?? "squircle") === u.id;
          return /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => l({ borderRadius: u.id }),
              className: `px-2.5 py-1.5 rounded-lg border text-xs font-medium transition ${x ? "bg-blue-600/20 border-blue-500 text-blue-300 font-semibold" : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"}`,
              children: u.label
            },
            u.id
          );
        }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ t("label", { className: "block text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e(Hl, { className: "w-3.5 h-3.5 text-blue-400" }),
            "Yazı Ölçeği (fontScale — SheetGL Standart)"
          ] }),
          /* @__PURE__ */ t("span", { className: "font-mono text-xs font-bold text-blue-400", children: [
            "%",
            a.fontScale ?? 100
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "range",
              min: 85,
              max: 125,
              step: 5,
              value: a.fontScale ?? 100,
              onChange: (u) => l({ fontScale: parseInt(u.target.value, 10) }),
              className: "flex-1 accent-blue-500"
            }
          ),
          /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => l({ fontScale: 100 }),
              className: "px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-300 hover:text-white",
              children: "%100"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800", children: [
        /* @__PURE__ */ t("label", { className: "block text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ t("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ e(Il, { className: "w-3.5 h-3.5 text-blue-400" }),
            "Tema Vurgu Rengi & Kalıtsallık"
          ] }),
          /* @__PURE__ */ e("span", { className: "font-mono text-[10px] text-slate-400", children: a.accentColor || "Host (--uxu-primary)" })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
            Vn.map((u) => {
              const x = (a.accentColor || "").toLowerCase() === u.hex.toLowerCase();
              return /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  title: u.label,
                  onClick: () => l({ accentColor: u.hex }),
                  style: { backgroundColor: u.hex },
                  className: `w-6 h-6 rounded-full border transition transform ${x ? "scale-110 border-white ring-2 ring-white/40" : "border-white/20 opacity-80 hover:opacity-100"}`
                },
                u.id
              );
            }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "color",
                value: a.accentColor || "#2997ff",
                onChange: (u) => l({ accentColor: u.target.value }),
                title: "Özel Vurgu Rengi Seç",
                className: "w-6 h-6 rounded cursor-pointer bg-transparent border-0 p-0"
              }
            )
          ] }),
          a.accentColor && /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: () => l({ accentColor: void 0 }),
              className: "px-2 py-1 rounded bg-slate-950 border border-slate-700 text-[10px] font-mono text-slate-300 hover:text-white",
              children: "Host Miras"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5", children: n.map((u) => {
      const x = !!a[u.key];
      return /* @__PURE__ */ t(
        "label",
        {
          className: `px-3 py-2 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${x ? "bg-slate-900/90 border-slate-700 text-slate-100" : "bg-slate-950/50 border-slate-800/60 text-slate-500"}`,
          children: [
            /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
              u.group === "webgl" ? /* @__PURE__ */ e(Ga, { className: "w-3.5 h-3.5 text-purple-400 shrink-0" }) : u.group === "security" ? /* @__PURE__ */ e(Ul, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }) : /* @__PURE__ */ e(El, { className: "w-3.5 h-3.5 text-blue-400 shrink-0" }),
              /* @__PURE__ */ e("span", { children: u.label })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                checked: x,
                onChange: (w) => l({ [u.key]: w.target.checked }),
                className: "accent-blue-500 rounded"
              }
            )
          ]
        },
        u.key
      );
    }) }),
    d && /* @__PURE__ */ e(
      Xe,
      {
        id: "config_jsx_export",
        title: "App.tsx — Canlı SOLID Konfigürasyon JSX Çıktısı",
        language: "tsx",
        solidPrinciple: "DIP",
        description: "Aşağıdaki kod seçtiğiniz tüm özellik bayraklarını, kota limitlerini ve sürücü ayarlarını içerir.",
        code: c
      }
    )
  ] });
}, za = [
  // 1. Depolama, Sürücü & Kota Ayarları
  {
    prop: "volumeName",
    category: "storage",
    type: "string",
    defaultVal: "'KURUMSAL_BULUT_VFS'",
    description: "Sol klasör ağacında, sekme başlığında ve durum çubuğunda görünen kök disk / sürücü adı."
  },
  {
    prop: "mountPath",
    category: "storage",
    type: "string",
    defaultVal: "'/var/www/storage/workspace'",
    description: "REST sunucu sürücüsünün (Laravel / Node.js) bağlandığı fiziksel veya sanal kök dizin yolu."
  },
  {
    prop: "driverType",
    category: "storage",
    type: "'vfs_localstorage' | 'vfs_memory' | 'rest_connector'",
    defaultVal: "'vfs_localstorage'",
    description: "Depolama motoru: Tarayıcı kalıcı VFS (vfs_localstorage), RAM disk (vfs_memory) veya gerçek sunucu API (rest_connector)."
  },
  {
    prop: "connectorEndpoint",
    category: "storage",
    type: "string",
    defaultVal: "'https://api.sirketiniz.com/api/v1/filemanager/connector'",
    description: "driverType: 'rest_connector' seçildiğinde tüm dosya işlemlerinin (list, upload, zip, chmod_acl vb.) gönderileceği HTTP uç noktası."
  },
  {
    prop: "totalDiskQuotaBytes",
    category: "storage",
    type: "number",
    defaultVal: "524288000 (500 MB)",
    description: "Diskin maksimum toplam kapasitesi (Byte). Yükleme veya kopyalama sırasında aşılırsa ENOSPC hatası döner."
  },
  {
    prop: "globalBlockedExtensions",
    category: "storage",
    type: "string[]",
    defaultVal: "['exe', 'bat', 'cmd', 'sh', 'php', 'phtml', 'dll']",
    description: "Tüm klasörlerde yüklenmesi ve oluşturulması güvenlik nedeniyle engellenen dosya uzantıları listesi."
  },
  // 2. Tema, Border Radius, Font Ölçeği & Görünüm Modları
  {
    prop: "theme",
    category: "theme",
    type: "'dark' | 'light'",
    defaultVal: "'dark'",
    description: "Aktif renk teması. Karanlık (Dark Slate) veya Windows 11 Aydınlık (Clean Light) modunu belirler."
  },
  {
    prop: "defaultViewMode",
    category: "theme",
    type: "'extra_large_icons' | 'large_icons' | 'medium_icons' | 'small_icons' | 'list' | 'details' | 'tiles' | 'content' | 'webgl_spatial' | 'webgl_diskmap'",
    defaultVal: "'large_icons'",
    description: "Gezginin açılış görünüm modu (8 standart Windows 11 görünümü + 2 donanım hızlandırmalı WebGL2 3D/Treemap görünümü)."
  },
  {
    prop: "borderRadius",
    category: "theme",
    type: "'sharp' | 'squircle' | 'pill' | number",
    defaultVal: "'squircle'",
    description: "Köşe yuvarlaklığı: 'sharp' (2-8px keskin), 'squircle' (6-20px dengeli), 'pill' (10-30px tam yuvarlak) veya özel piksel sayısı (ör. 14). SheetGL ve UXI ile birebir aynı yarıçap skalasını paylaşır."
  },
  {
    prop: "fontScale",
    category: "theme",
    type: "number",
    defaultVal: "100",
    description: "Genel yazı ölçeği yüzdesi (%85 ile %125 arası). SheetGL 13.5px standart taban fontu ile senkronize ölçeklenir (--fm-font-scale / --uxu-font-scale)."
  },
  {
    prop: "accentColor",
    category: "theme",
    type: "string | undefined",
    defaultVal: "undefined (var(--uxu-primary))",
    description: "Özel vurgu rengi (ör. '#2997ff', '#10b981', '#8b5cf6'). Belirtilmezse üst tasarım sisteminin (--uxu-primary) rengini otomatik miras alır."
  },
  {
    prop: "inheritHostTheme",
    category: "theme",
    type: "boolean",
    defaultVal: "true",
    description: "Üst uygulamada (UXI / SheetGL) tanımlı --uxu-primary, --uxu-radius-*, --uxu-bg-elevated ve --uxu-font-scale CSS değişkenlerini otomatik miras alır."
  },
  {
    prop: "locale",
    category: "theme",
    type: "'tr' | 'en' | 'de' | 'ru'",
    defaultVal: "'tr'",
    description: "Aktif arayüz dili. Modüler JSON sözlüklerinden (tr.json, en.json, de.json, ru.json) anlık çeviri sağlar."
  },
  // 3. Arayüz Panelleri & Gezgin UX Özellikleri
  {
    prop: "enableRibbonToolbar",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Windows 11 tarzı üst komut şeridini (Yeni, Yükle, Klasör Yükle, Kes, Kopyala, Yapıştır, ZIP İndir, Görünüm, Sırala) gösterir/gizler."
  },
  {
    prop: "enableDualPane",
    category: "ui",
    type: "boolean",
    defaultVal: "false",
    description: "Total Commander tarzı yan yana Çift Panel (Dual-Pane) görünümünü ve paneller arası tek tıkla dosya aktarımını etkinleştirir."
  },
  {
    prop: "enableFolderTree",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Sol kenar çubuğundaki Hızlı Erişim, Sık Kullanılanlar, Kök Sürücü (Root) ve hiyerarşik klasör ağacını gösterir/gizler."
  },
  {
    prop: "enableDetailsInspector",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Sağ kenardaki Güvenlik, SHA-256 Özet, Küçük Resim (Thumbnail), Kota ve Denetim İzi (Inspector) panelini gösterir/gizler."
  },
  {
    prop: "enableBreadcrumbs",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "İleri/Geri/Yukarı okları, tıklanabilir Breadcrumb dizin yolu, tam yol düzenleyici (D:\\...) ve arama çubuğunu gösterir/gizler."
  },
  {
    prop: "enableStatusBar",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Alt durum çubuğunda toplam öğe sayısı, seçili öğelerin toplam boyutu, disk kota çubuğu ve hızlı görünüm değiştiriciyi gösterir."
  },
  {
    prop: "enableContextMenu",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Dosya/klasör üzerinde ve boş alanda sağ tık bağlam menüsünü (Önizle, Kod Düzenle, ZIP Arşivle, ACL İzinleri, Paylaş vb.) açar."
  },
  {
    prop: "enableDragAndDrop",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Öğeleri alt klasörlere, sol klasör ağacına veya breadcrumb adımlarına sürükleyip bırakarak taşımayı ve masaüstünden dosya bırakmayı sağlar."
  },
  {
    prop: "enableRubberBandSelection",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Gezgin boş alanında fareyle basılı tutup sürükleyerek dikdörtgen seçim alanı (Marquee / Rubber-Band) ile çoklu seçim yapmayı sağlar."
  },
  {
    prop: "showHiddenFiles",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Nokta ile başlayan (.env, .gitignore) veya isHidden: true olarak işaretlenmiş gizli sistem dosyalarını listeler."
  },
  {
    prop: "showFileExtensions",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Dosya adlarının sonunda (.ts, .png, .pdf, .zip) uzantılarının görünürlüğünü kontrol eder."
  },
  {
    prop: "showPosixBadgesOnItems",
    category: "ui",
    type: "boolean",
    defaultVal: "true",
    description: "Kartların ve liste satırlarının üzerinde POSIX sekizlik izin rozetlerini (0755, 0644, 0700) ve kilit ikonlarını gösterir."
  },
  // 4. WebGL2 GPU, Görüntü Stüdyosu, ZIP Arşiv & Üretkenlik
  {
    prop: "enableWebGLAcceleration",
    category: "webgl",
    type: "boolean",
    defaultVal: "true",
    description: "WebGL2 60 FPS 3D Uzamsal Sahne (webgl_spatial) motorunu ve binlerce düğümlü donanım hızlandırmalı çizimi etkinleştirir."
  },
  {
    prop: "enableWebGLImageShaderStudio",
    category: "webgl",
    type: "boolean",
    defaultVal: "true",
    description: "Görsel dosyalar için gerçek zamanlı GLSL Fragment Shader (Pozlama, Kontrast, Doygunluk, Keskinlik, Siberpunk, Termal) stüdyosunu açar."
  },
  {
    prop: "enableWebGLDiskMap",
    category: "webgl",
    type: "boolean",
    defaultVal: "true",
    description: "Klasör ve dosya boyutlarını 3D yastık gölgeli (Cushion Treemap) ısı haritası olarak görselleştiren WebGL Disk Map modunu etkinleştirir."
  },
  {
    prop: "enableArchiveCompression",
    category: "webgl",
    type: "boolean",
    defaultVal: "true",
    description: "Seçili birden fazla dosyayı veya tüm bir klasörü alt dizinleriyle birlikte gerçek .zip arşivi olarak paketleme ve indirme motorunu açar."
  },
  {
    prop: "enableBatchRename",
    category: "webgl",
    type: "boolean",
    defaultVal: "true",
    description: "Çoklu seçilen öğeler için Önek/Sonek, Bul/Değiştir, Numaralandırma ({n}) ve Büyük/Küçük Harf dönüşümlü Toplu Yeniden Adlandırma penceresini açar."
  },
  // 5. Güvenlik, NTFS ACL, POSIX (0755) & Denetim İzi
  {
    prop: "strictPermissionEnforcement",
    category: "security",
    type: "boolean",
    defaultVal: "true",
    description: "5 katmanlı Zero-Trust izin motorunu (Kilit -> Uzantı -> Kota -> NTFS ACL Deny/Allow -> POSIX rwx) tüm işlemlerde zorunlu kılar."
  },
  {
    prop: "respectFolderLocks",
    category: "security",
    type: "boolean",
    defaultVal: "true",
    description: "isLocked: true ile kilitlenmiş dosya ve klasörlerin silinmesini, taşınmasını veya yeniden adlandırılmasını engeller (ELOCKED)."
  },
  {
    prop: "enableAuditLog",
    category: "security",
    type: "boolean",
    defaultVal: "true",
    description: "Gerçekleştirilen veya engellenen her dosya işlemini zaman damgası, kullanıcı kimliği ve izin sonucuyla canlı Denetim İzi (Audit Trail) listesine kaydeder."
  },
  {
    prop: "activeUserId",
    category: "security",
    type: "string",
    defaultVal: "'usr_admin'",
    description: "İzin değerlendirmesinde kullanılacak aktif oturum kullanıcısının kimliği ('usr_admin' | 'usr_editor' | 'usr_auditor' | 'usr_guest')."
  }
], Wn = () => {
  const [a, l] = A("all"), [s, d] = A(""), i = za.filter((c) => {
    const n = a === "all" || c.category === a, u = s.trim().toLowerCase(), x = !u || c.prop.toLowerCase().includes(u) || c.type.toLowerCase().includes(u) || c.description.toLowerCase().includes(u);
    return n && x;
  });
  return /* @__PURE__ */ t("div", { className: "space-y-8", children: [
    /* @__PURE__ */ t("div", { id: "doc-sec-install", className: "scroll-mt-20", children: [
      /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 01 • Kurulum, Bileşen Props & IFileManagerConfig Tam Referansı" }) }),
      /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "1. Kurulum, <FileManGL /> Props & IFileManagerConfig Özellikleri Rehberi" }),
      /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2 leading-relaxed", children: [
        /* @__PURE__ */ e("strong", { children: "FileManGL v1.0.5" }),
        ", tek bir ",
        /* @__PURE__ */ e("code", { children: "<FileManGL />" }),
        " bileşeni ve",
        " ",
        /* @__PURE__ */ e("code", { children: "IFileManagerConfig" }),
        " yapılandırma nesnesi üzerinden tüm görünüm modlarını, köşe yuvarlaklığını (",
        /* @__PURE__ */ e("code", { children: "borderRadius" }),
        "), yazı ölçeğini (",
        /* @__PURE__ */ e("code", { children: "fontScale" }),
        "), üst tema renk kalıtsallığını (",
        /* @__PURE__ */ e("code", { children: "accentColor" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "inheritHostTheme" }),
        "), dosya/klasör yükleme kuyruğunu, ZIP arşivlemeyi ve 5 katmanlı izin motorunu yönetmenizi sağlar."
      ] })
    ] }),
    /* @__PURE__ */ e(
      Xe,
      {
        id: "qs_install",
        title: "1.1 Terminal — NPM / NPX / PNPM / YARN / BUN Paket Kurulumu & CLI",
        language: "bash",
        solidPrinciple: "SRP",
        description: "Paketi tercih ettiğiniz paket yöneticisiyle kurun veya npx filemangl CLI ile hazır bileşen/proje oluşturun.",
        code: `# 1. Mevcut React 18 / 19 projenize FileManGL paketini kurun
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
npx filemangl demo`
      }
    ),
    /* @__PURE__ */ t("div", { id: "doc-sec-component-props", className: "space-y-3 scroll-mt-20", children: [
      /* @__PURE__ */ t("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ e("span", { className: "material-symbols-outlined text-cyan-400", style: { fontSize: "20px" }, children: "widgets" }),
        /* @__PURE__ */ e("span", { children: "1.2 <FileManGL /> Ana Bileşen Props (FileManGLProps)" })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-xs sm:text-sm text-slate-300", children: [
        /* @__PURE__ */ e("code", { children: "<FileManGL />" }),
        " bileşenine doğrudan geçilebilen üst seviye React prop'ları:"
      ] }),
      /* @__PURE__ */ e("div", { className: "border border-slate-800 rounded-xl overflow-x-auto bg-[#080d18]", children: /* @__PURE__ */ t("table", { className: "w-full text-left border-collapse text-xs", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "bg-slate-900/90 border-b border-slate-800 text-slate-300", children: [
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Prop Adı" }),
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "TypeScript Tipi" }),
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Zorunlu" }),
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Açıklama & Kullanım Amacı" })
        ] }) }),
        /* @__PURE__ */ t("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: [
          /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-cyan-300 font-semibold", children: "config" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-amber-300", children: "IFileManagerConfig" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-emerald-400", children: "Evet" }),
            /* @__PURE__ */ t("td", { className: "py-2.5 px-3.5 text-slate-300 font-sans", children: [
              "Görünüm, tema, border-radius, font ölçeği, sürücü, kota ve yetki bayraklarını tutan ana konfigürasyon nesnesi (",
              /* @__PURE__ */ e("code", { children: "DEFAULT_FILE_MANAGER_CONFIG" }),
              " ile genişletilebilir)."
            ] })
          ] }),
          /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-cyan-300 font-semibold", children: "onConfigChange" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-amber-300", children: "(patch: Partial<IFileManagerConfig>) => void" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-400", children: "Opsiyonel" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-300 font-sans", children: "Kullanıcı gezgin içinden tema, dil, çift panel (dual-pane) veya görünüm modunu değiştirdiğinde tetiklenir; üst state'i senkronize tutar." })
          ] }),
          /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-cyan-300 font-semibold", children: "customDriver" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-amber-300", children: "IFileSystemDriver" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-400", children: "Opsiyonel" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-300 font-sans", children: "Kendi yazdığınız özel depolama sürücüsünü (ör. AWS S3, Supabase, IndexedDB, GraphQL) doğrudan enjekte etmenizi sağlar." })
          ] }),
          /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-cyan-300 font-semibold", children: "isFullscreen" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-amber-300", children: "boolean" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-400", children: "Opsiyonel" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-300 font-sans", children: "Gezginin tam ekran (fixed inset-0 z-50) modunda çalışıp çalışmadığını belirler." })
          ] }),
          /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-cyan-300 font-semibold", children: "onToggleFullscreen" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-amber-300", children: "() => void" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-400", children: "Opsiyonel" }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-300 font-sans", children: "Sağ üst tam ekran butonuna tıklandığında çağrılan geri çağırma fonksiyonu." })
          ] })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ t("div", { id: "doc-sec-config-all", className: "space-y-3 scroll-mt-20", children: [
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ e(
              "span",
              {
                className: "material-symbols-outlined text-emerald-400",
                style: { fontSize: "20px" },
                children: "tune"
              }
            ),
            /* @__PURE__ */ t("span", { children: [
              "1.3 IFileManagerConfig — Tüm Özellikler ve Ayarlar Referansı (",
              za.length,
              " Özellik)"
            ] })
          ] }),
          /* @__PURE__ */ e("p", { className: "text-xs text-slate-400 mt-0.5", children: "Aşağıdaki kategori butonlarıyla veya arama kutusuyla istediğiniz özelliği anında filtreleyebilirsiniz." })
        ] }),
        /* @__PURE__ */ e(
          "input",
          {
            type: "text",
            value: s,
            onChange: (c) => d(c.target.value),
            placeholder: "Özellik ara (ör. borderRadius, fontScale, quota)...",
            className: "w-full sm:w-72 bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
          }
        )
      ] }),
      /* @__PURE__ */ e("div", { className: "flex flex-wrap items-center gap-1.5", children: [
        { id: "all", label: `Tümü (${za.length})` },
        { id: "theme", label: "🎨 Tema, Radius & Font (7)" },
        { id: "storage", label: "💾 Depolama & Kota (6)" },
        { id: "ui", label: "🖥️ Paneller & Gezgin UX (12)" },
        { id: "webgl", label: "🚀 WebGL2, ZIP & Üretkenlik (5)" },
        { id: "security", label: "🛡️ ACL, POSIX & Güvenlik (4)" }
      ].map((c) => /* @__PURE__ */ e(
        "button",
        {
          type: "button",
          onClick: () => l(c.id),
          className: `px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${a === c.id ? "bg-blue-600 text-white border-blue-500" : "bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800"}`,
          children: c.label
        },
        c.id
      )) }),
      /* @__PURE__ */ e("div", { className: "border border-slate-800 rounded-xl overflow-x-auto bg-[#080d18]", children: /* @__PURE__ */ t("table", { className: "w-full text-left border-collapse text-xs", children: [
        /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "bg-slate-900/95 border-b border-slate-800 text-slate-300", children: [
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Özellik (config.*)" }),
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Kategori" }),
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Kabul Edilen Değerler / Tip" }),
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Varsayılan" }),
          /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Detaylı Açıklama" })
        ] }) }),
        /* @__PURE__ */ e("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: i.map((c) => /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/50", children: [
          /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-cyan-300 font-bold whitespace-nowrap", children: c.prop }),
          /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 whitespace-nowrap", children: /* @__PURE__ */ e("span", { className: "px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] text-slate-300 uppercase", children: c.category }) }),
          /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-amber-300 max-w-xs break-words", children: c.type }),
          /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-emerald-300 whitespace-nowrap", children: c.defaultVal }),
          /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-200 font-sans leading-relaxed", children: c.description })
        ] }, c.prop)) })
      ] }) })
    ] }),
    /* @__PURE__ */ t("div", { id: "doc-sec-theme-inheritance", className: "space-y-3 scroll-mt-20", children: [
      /* @__PURE__ */ t("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ e("span", { className: "material-symbols-outlined text-purple-400", style: { fontSize: "20px" }, children: "palette" }),
        /* @__PURE__ */ e("span", { children: "1.4 Tema Kalıtsallığı (SheetGL × FileManGL), Border Radius ve Font Ölçeği Ayarlama" })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-xs sm:text-sm text-slate-300 leading-relaxed", children: [
        /* @__PURE__ */ e("strong", { children: "FileManGL" }),
        " ve ",
        /* @__PURE__ */ e("strong", { children: "SheetGL" }),
        " aynı tasarım sisteminde (ör.",
        " ",
        /* @__PURE__ */ e("strong", { children: "UXI" }),
        ") kullanıldığında ",
        /* @__PURE__ */ e("code", { children: "inheritHostTheme: true" }),
        " sayesinde üst temanın ",
        /* @__PURE__ */ e("code", { children: "--uxu-primary" }),
        " rengini, ",
        /* @__PURE__ */ e("code", { children: "--uxu-radius-*" }),
        " köşe yuvarlaklığını ve ",
        /* @__PURE__ */ e("code", { children: "--uxu-font-scale" }),
        " yazı ölçeğini otomatik olarak miras alır. Ayrıca doğrudan ",
        /* @__PURE__ */ e("code", { children: "config" }),
        " üzerinden veya CSS değişkenleriyle de özelleştirilebilir:"
      ] }),
      /* @__PURE__ */ e(
        Xe,
        {
          id: "qs_theme_radius",
          title: "1.4 Tema, Border Radius ('sharp' | 'squircle' | 'pill' | px) ve Font Ölçeği Konfigürasyonu",
          language: "tsx",
          solidPrinciple: "OCP",
          description: "SheetGL ile birebir aynı font boyutu (13.5px), köşe yarıçapı ve vurgu rengini paylaşan kurulum örneği.",
          code: `import React, { useState } from 'react';
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
}`
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { id: "doc-sec-upload-zip", className: "space-y-3 scroll-mt-20", children: [
      /* @__PURE__ */ t("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ e("span", { className: "material-symbols-outlined text-amber-400", style: { fontSize: "20px" }, children: "cloud_upload" }),
        /* @__PURE__ */ e("span", { children: "1.5 Yükleme Kuyruğu (%0–100), Klasör Yükleme, Thumbnail Cache & ZIP İndirme" })
      ] }),
      /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 text-xs", children: [
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5", children: [
          /* @__PURE__ */ e("div", { className: "font-bold text-cyan-300", children: "1. Google Drive Tarzı Yükleme Kuyruğu & Klasör Yükleme" }),
          /* @__PURE__ */ t("p", { className: "text-slate-400 leading-relaxed", children: [
            "Çoklu dosya ve tüm alt dizinleriyle ",
            /* @__PURE__ */ e("strong", { children: "Klasör Yükle" }),
            " (",
            /* @__PURE__ */ e("code", { children: "webkitdirectory" }),
            ") desteği sunar. Sağ altta açılan kuyruk tepsisinde her dosya için ",
            /* @__PURE__ */ e("code", { children: "0% → 100%" }),
            " gerçek zamanlı ilerleme, hız ve SHA-256 doğrulaması gösterilir."
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5", children: [
          /* @__PURE__ */ e("div", { className: "font-bold text-emerald-300", children: "2. İki Katmanlı Thumbnail Cache (L1 LRU + IndexedDB)" }),
          /* @__PURE__ */ t("p", { className: "text-slate-400 leading-relaxed", children: [
            "Yüklenen görseller ",
            /* @__PURE__ */ e("code", { children: "ThumbnailCacheService" }),
            " tarafından 256px WebP/PNG küçük resme dönüştürülür; L1 bellek içi LRU ve L2 tarayıcı ",
            /* @__PURE__ */ e("code", { children: "IndexedDB" }),
            " önbelleğine kaydedilerek klasör geçişlerinde anında yüklenir."
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5", children: [
          /* @__PURE__ */ e("div", { className: "font-bold text-amber-300", children: "3. Seçim Dörtgeni (Marquee) & Klasör ZIP İndirme" }),
          /* @__PURE__ */ t("p", { className: "text-slate-400 leading-relaxed", children: [
            /* @__PURE__ */ e("code", { children: "enableRubberBandSelection: true" }),
            " ve",
            " ",
            /* @__PURE__ */ e("code", { children: "enableArchiveCompression: true" }),
            " ile fareyle seçtiğiniz birden fazla öğeyi veya bir klasörü tüm alt klasör hiyerarşisiyle birlikte tek tıkla ",
            /* @__PURE__ */ e("code", { children: ".zip" }),
            " ",
            "olarak indirebilirsiniz."
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ t("div", { id: "doc-sec-presets", className: "space-y-3 scroll-mt-20", children: [
      /* @__PURE__ */ t("h3", { className: "text-base sm:text-lg font-bold text-white flex items-center gap-2", children: [
        /* @__PURE__ */ e("span", { className: "material-symbols-outlined text-blue-400", style: { fontSize: "20px" }, children: "bolt" }),
        /* @__PURE__ */ e("span", { children: "1.6 Hazır Konfigürasyon Profilleri (CONFIG_PRESETS)" })
      ] }),
      /* @__PURE__ */ e(
        Xe,
        {
          id: "qs_presets",
          title: "Hazır Profillerle Tek Satırda Mod Değiştirme",
          language: "tsx",
          solidPrinciple: "DIP",
          description: "CONFIG_PRESETS içindeki 4 kurumsal profili doğrudan config state'inize uygulayabilirsiniz.",
          code: `import { DEFAULT_FILE_MANAGER_CONFIG, CONFIG_PRESETS } from 'filemangl';

// 1. Windows 11 Standart Gezgin
const win11Config = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.win11_default.patch };

// 2. Total Commander Çift Panel (Dual-Pane) Modu
const dualPaneConfig = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.total_commander.patch };

// 3. WebGL2 3D Uzamsal İş İstasyonu
const webglConfig = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.webgl_workstation.patch };

// 4. Zero-Trust Kilitli Kasa (Misafir / Salt-Okunur Denetim Modu)
const vaultConfig = { ...DEFAULT_FILE_MANAGER_CONFIG, ...CONFIG_PRESETS.zero_trust_vault.patch };`
        }
      )
    ] })
  ] });
}, Yn = {
  id: "quickstart",
  stepNumber: 1,
  title: "1. Kurulum, Props & Config Referansı",
  subtitle: "<FileManGL /> Props, IFileManagerConfig (34 Özellik), Tema/Radius ve Yükleme Ayarları",
  badge: "Props & API",
  routeSlug: "/documentation/quickstart",
  solidFocus: ["SRP", "DIP"],
  searchKeywords: [
    "quickstart",
    "props",
    "config",
    "ifilemanagerconfig",
    "borderradius",
    "fontscale",
    "accentcolor",
    "theme",
    "vfs",
    "kurulum",
    "npm",
    "npx"
  ],
  iconName: "tune",
  iconColorClass: "text-blue-400",
  subItems: [
    { id: "doc-sec-install", label: "1.1 NPM / NPX / CLI Kurulumu", badge: "CLI" },
    { id: "doc-sec-component-props", label: "1.2 <FileManGL /> Bileşen Props", badge: "5 Prop" },
    {
      id: "doc-sec-config-all",
      label: "1.3 IFileManagerConfig Tüm Özellikler",
      badge: "34 Ayar"
    },
    {
      id: "doc-sec-theme-inheritance",
      label: "1.4 Tema Kalıtsallığı, Radius & Font",
      badge: "SheetGL/UXI"
    },
    {
      id: "doc-sec-upload-zip",
      label: "1.5 Yükleme Kuyruğu, Cache & ZIP",
      badge: "0-100%"
    },
    { id: "doc-sec-presets", label: "1.6 Hazır Profiller (CONFIG_PRESETS)", badge: "4 Preset" }
  ],
  Component: Wn
}, Xn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 02 • ISP & Liskov Substitution Standart Protokol" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "2. Universal Backend Connector Protokolü (elFinder Üstü JSON Spec)" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      "elFinder'ın klasik ",
      /* @__PURE__ */ e("code", { children: "cmd" }),
      " mimarisini modernleştiren",
      " ",
      /* @__PURE__ */ e("strong", { children: "FileManGL Connector Protocol v1.0.4" }),
      ", tek bir HTTP uç noktası (endpoint) üzerinden JSON ve ",
      /* @__PURE__ */ e("code", { children: "multipart/form-data" }),
      " komutlarıyla herhangi bir programlama dilindeki (PHP/Laravel, Node.js, Go, .NET, Python) sunucuyla haberleşir."
    ] })
  ] }),
  /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs", children: [
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-blue-400 mb-1", children: 'cmd: "open" | "ls" | "tree"' }),
      /* @__PURE__ */ e("p", { className: "text-slate-400", children: "Belirlenen disk alanındaki (mount path) dizin ağacını, dosya boyutlarını, SHA-256 özetlerini ve her düğümün POSIX + ACL izin matrisini döner." })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-emerald-400 mb-1", children: 'cmd: "mkdir" | "mkfile" | "upload"' }),
      /* @__PURE__ */ t("p", { className: "text-slate-400", children: [
        "Hedef klasörün yazma/yükleme (",
        /* @__PURE__ */ e("code", { children: "write" }),
        " / ",
        /* @__PURE__ */ e("code", { children: "upload" }),
        ") iznini ve disk kotasını kontrol ederek yeni klasör veya dosya oluşturur."
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-amber-400 mb-1", children: 'cmd: "paste" (mode: "copy" | "cut" | "move")' }),
      /* @__PURE__ */ t("p", { className: "text-slate-400", children: [
        "Kaynak ve hedef dizinler arasında çakışma stratejisiyle (",
        /* @__PURE__ */ e("code", { children: "replace" }),
        ",",
        " ",
        /* @__PURE__ */ e("code", { children: "keep_both" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "skip" }),
        ") kopyalama, kes-yapıştır veya sürükle-bırak taşıma yapar."
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-purple-400 mb-1", children: 'cmd: "chmod" (ACL + POSIX + Quota)' }),
      /* @__PURE__ */ t("p", { className: "text-slate-400", children: [
        "Klasör veya dosyanın Octal (",
        /* @__PURE__ */ e("code", { children: "0755" }),
        "), ACL Allow/Deny kurallarını, kilidini (",
        /* @__PURE__ */ e("code", { children: "locked" }),
        ") ve klasör bazlı MB kotasını günceller."
      ] })
    ] })
  ] }),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "spec_json_req",
      title: "POST /api/v1/filemanager/connector — İzin & Kota Güncelleme İsteği (Request)",
      language: "json",
      solidPrinciple: "ISP",
      description: "Tek bir atomik JSON payload ile hem POSIX octal (0775), hem klasör kotası (200 MB), hem de rol bazlı ACL kuralları iletilir.",
      code: `{
  "cmd": "chmod",
  "targetId": "fld_engineering",
  "recursive": true,
  "security": {
    "ownerId": "usr_dev",
    "ownerName": "Selin Kaya (Lead Dev)",
    "groupName": "engineering",
    "inheritFromParent": false,
    "locked": false,
    "posix": {
      "octal": "0775",
      "symbolic": "rwxrwxr-x"
    },
    "quota": {
      "maxBytes": 209715200,
      "maxFileSizeBytes": 52428800,
      "allowedExtensions": [".ts", ".tsx", ".php", ".md", ".json"],
      "blockedExtensions": [".exe", ".bat", ".cmd"]
    },
    "acl": [
      {
        "id": "ace_dev_allow",
        "subjectType": "role",
        "subjectId": "developer",
        "subjectLabel": "Yazılım Geliştirici (DEVELOPER)",
        "effect": "allow",
        "permissions": {
          "read": true,
          "write": true,
          "delete": true,
          "rename": true,
          "upload": true
        }
      }
    ]
  }
}`
    }
  ),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "spec_ts_interface",
      title: "src/core/drivers/RestConnectorDriver.ts — İstemci Sürücü Sözleşmesi",
      language: "typescript",
      solidPrinciple: "LSP",
      description: "RestConnectorDriver, IFileSystemDriver arayüzünü birebir uygular ve sunucu çevrimdışı olduğunda VFS önbelleğine yumuşak geçiş (graceful fallback) yapar.",
      code: `import { FileNode, IFileManagerConfig, IFileSystemDriver } from '../contracts/types';

export class RestConnectorDriver implements IFileSystemDriver {
  public readonly driverId = 'rest_connector';
  public readonly driverName = 'Universal HTTP/REST Disk Connector';
  public readonly supportsRealtimeStream = true;

  constructor(private readonly config: IFileManagerConfig) {}

  public async initialize(): Promise<FileNode[]> {
    const response = await fetch(this.config.connectorEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'open',
        mountPath: this.config.mountPath,
      }),
    });

    if (!response.ok) {
      throw new Error(\`Connector HTTP Error: \${response.status}\`);
    }

    const payload = await response.json();
    return payload.nodes as FileNode[];
  }

  public async getAllNodes(): Promise<FileNode[]> {
    return this.initialize();
  }

  public async saveAllNodes(nodes: FileNode[]): Promise<void> {
    await fetch(this.config.connectorEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'sync',
        mountPath: this.config.mountPath,
        nodes,
      }),
    });
  }

  public async resetToFactoryDefaults(): Promise<FileNode[]> {
    return this.initialize();
  }
}`
    }
  )
] }), qn = {
  id: "connector_spec",
  stepNumber: 2,
  title: "2. Universal Connector Protokolü",
  subtitle: "Standart JSON/Multipart Komut Şeması ve RestConnectorDriver Mimarisi",
  badge: "JSON Spec",
  routeSlug: "/documentation/connector",
  solidFocus: ["ISP", "LSP"],
  searchKeywords: ["connector", "json", "protocol", "elfinder", "cmd", "chmod", "rest"],
  iconName: "hub",
  iconColorClass: "text-cyan-400",
  subItems: [
    { id: "spec_json_req", label: "2.1 JSON Komut & ACL Payload Şeması", badge: "JSON" },
    { id: "spec_driver_ts", label: "2.2 RestConnectorDriver TypeScript Sınıfı", badge: "Driver" }
  ],
  Component: Xn
}, Zn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/35 text-rose-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 03 • Laravel 10 / 11 & PHP 8.3 SOLID Backend" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "3. Laravel Disk Alanı, Kota ve ACL İzin Yönetimi Entegrasyonu" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      "Aşağıdaki ",
      /* @__PURE__ */ e("strong", { children: "Controller" }),
      " ve ",
      /* @__PURE__ */ e("strong", { children: "Service" }),
      " sınıflarını Laravel projenize ekleyerek belirlediğiniz bir disk klasörünü (ör.",
      " ",
      /* @__PURE__ */ e("code", { children: "storage/app/filemangl_volume" }),
      ") Path Traversal korumalı, klasör/dosya bazlı ACL izinli ve kota sınırlandırmalı olarak hemen yönetebilirsiniz:"
    ] })
  ] }),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "laravel_routes",
      title: "routes/api.php — Sanctum Korumalı FileManGL Rotaları",
      language: "php",
      solidPrinciple: "SRP",
      description: "Tüm dosya gezgini işlemleri tekil v1/filemanager grubu altında toplanır.",
      code: `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\FileManGLConnectorController;

Route::middleware(['auth:sanctum'])->prefix('v1/filemanager')->group(function () {
    Route::post('/connector', [FileManGLConnectorController::class, 'handle']);
    Route::post('/upload', [FileManGLConnectorController::class, 'upload']);
    Route::get('/download/{nodeId}', [FileManGLConnectorController::class, 'download']);
});`
    }
  ),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "laravel_service",
      title: "app/Services/FileManGLDiskGovernanceService.php — Sandbox, Kota & ACL Servisi",
      language: "php",
      solidPrinciple: "OCP",
      description: "Single Responsibility & Open/Closed prensibine uygun olarak fiziksel disk işlemleri, kota doğrulaması ve Path Traversal güvenlik duvarı ayrı bir servis katmanında izole edilmiştir.",
      code: `<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Storage;
use RuntimeException;

class FileManGLDiskGovernanceService
{
    private string $rootPath;
    private int $maxVolumeQuotaBytes;

    public function __construct()
    {
        // Yönetilecek izole disk alanı ve maksimum kota (Örn: 500 MB)
        $this->rootPath = storage_path('app/filemangl_volume');
        $this->maxVolumeQuotaBytes = config('filemangl.max_quota_bytes', 500 * 1024 * 1024);

        if (!is_dir($this->rootPath)) {
            mkdir($this->rootPath, 0775, true);
        }
    }

    /**
     * Güvenlik Duvarı: Belirlenen disk alanı dışına çıkılmasını (Path Traversal) kesin olarak engeller.
     */
    public function resolveSafePath(string $relativePath): string
    {
        $clean = ltrim(str_replace(['..\\', '../'], '', $relativePath), '/\\');
        $fullPath = $this->rootPath . DIRECTORY_SEPARATOR . $clean;
        $realRoot = realpath($this->rootPath);
        $realTarget = realpath(dirname($fullPath));

        if ($realTarget === false || !str_starts_with($realTarget, $realRoot)) {
            throw new RuntimeException('EACCES: Sandbox dışına erişim engellendi.');
        }
        return $fullPath;
    }

    /**
     * Disk kotası kontrolü (Belirlenen disk alanının doluluk oranını hesaplar)
     */
    public function assertQuotaAvailable(int $incomingBytes): void
    {
        $used = $this->calculateDirectorySize($this->rootPath);
        if (($used + $incomingBytes) > $this->maxVolumeQuotaBytes) {
            throw new RuntimeException('ENOSPC: Tahsis edilen disk kotası aşıldı!');
        }
    }

    public function calculateDirectorySize(string $dir): int
    {
        $size = 0;
        foreach (
            new \\RecursiveIteratorIterator(
                new \\RecursiveDirectoryIterator($dir, \\FilesystemIterator::SKIP_DOTS)
            ) as $file
        ) {
            $size += $file->getSize();
        }
        return $size;
    }
}`
    }
  ),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "laravel_controller",
      title: "app/Http/Controllers/Api/FileManGLConnectorController.php — Komut Yönlendiricisi",
      language: "php",
      solidPrinciple: "DIP",
      description: "Controller, Constructor Injection ile FileManGLDiskGovernanceService soyutlamasını alır ve JSON komutlarını işler.",
      code: `<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Services\\FileManGLDiskGovernanceService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class FileManGLConnectorController extends Controller
{
    public function __construct(
        private readonly FileManGLDiskGovernanceService $diskGovernance
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $cmd = $request->input('cmd', 'open');
        $targetPath = $request->input('targetPath', '');

        return match ($cmd) {
            'mkdir' => $this->createDirectory($targetPath, $request->input('newName')),
            'chmod' => $this->updatePermissions($targetPath, $request->input('security', [])),
            default => response()->json([
                'status' => 'ok',
                'cmd' => $cmd,
                'usedBytes' => $this->diskGovernance->calculateDirectorySize(storage_path('app/filemangl_volume')),
            ]),
        };
    }

    private function createDirectory(string $parent, string $name): JsonResponse
    {
        $safePath = $this->diskGovernance->resolveSafePath($parent . '/' . $name);
        mkdir($safePath, 0775, true);
        return response()->json(['status' => 'ok', 'created' => $name]);
    }

    private function updatePermissions(string $target, array $security): JsonResponse
    {
        $safePath = $this->diskGovernance->resolveSafePath($target);
        $octal = octdec($security['posix']['octal'] ?? '0755');
        chmod($safePath, $octal);
        file_put_contents($safePath . '.filemangl.acl.json', json_encode($security, JSON_PRETTY_PRINT));
        return response()->json(['status' => 'ok', 'updated' => $target]);
    }
}`
    }
  )
] }), Rr = {
  id: "laravel_backend",
  stepNumber: 3,
  title: "3. Laravel 10/11 Disk & ACL Backend",
  subtitle: "PHP 8.3 Sanctum Rotaları, Sandbox Güvenlik Duvarı ve Kota Servisi",
  badge: "PHP 8.3",
  routeSlug: "/documentation/laravel",
  solidFocus: ["SRP", "OCP", "DIP"],
  searchKeywords: ["laravel", "php", "sanctum", "storage", "controller", "chmod", "quota"],
  iconName: "dns",
  iconColorClass: "text-rose-400",
  subItems: [
    { id: "laravel_routes", label: "3.1 routes/api.php (Sanctum Rotaları)", badge: "Route" },
    {
      id: "laravel_service",
      label: "3.2 FileManGLDiskGovernanceService.php",
      badge: "Service"
    },
    {
      id: "laravel_controller",
      label: "3.3 FileManGLConnectorController.php",
      badge: "Controller"
    }
  ],
  Component: Zn
}, Qn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 04 • Node.js 20+ / Express / Fastify SOLID Connector" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "4. Node.js TypeScript Backend Connector Kurulumu" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      "Node.js tabanlı sunucularda belirlediğiniz bir disk klasörünü (ör.",
      " ",
      /* @__PURE__ */ e("code", { children: "D:/ManagedStorage" }),
      " veya ",
      /* @__PURE__ */ e("code", { children: "/mnt/nvme0n1/workspace" }),
      ") Path Traversal korumalı, POSIX ",
      /* @__PURE__ */ e("code", { children: "chmod" }),
      " destekli ve ACL sidecar (",
      /* @__PURE__ */ e("code", { children: ".filemangl.acl.json" }),
      ") kayıtlı olarak yönetmek için modüler Express middleware yapısı:"
    ] })
  ] }),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "node_server",
      title: "server/fileManGLConnector.ts — Express Disk & ACL Connector Middleware",
      language: "typescript",
      solidPrinciple: "SRP",
      description: "Sandbox yol çözümlemesi, POSIX mod bitleri (0o755) ve JSON sidecar izin kayıtlarını tek bir modüler router içinde yönetir.",
      code: `import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

export interface FileManGLMountOptions {
  mountDir: string;          // Örn: 'D:/ManagedDiskVolume'
  maxQuotaBytes: number;     // Örn: 500 * 1024 * 1024 (500 MB)
  blockedExtensions: string[];
}

export function createFileManGLConnector(options: FileManGLMountOptions) {
  const router = express.Router();
  const rootResolved = path.resolve(options.mountDir);

  function resolveSandboxPath(relPath = ''): string {
    const target = path.resolve(rootResolved, '.' + path.sep + relPath);
    if (!target.startsWith(rootResolved)) {
      throw new Error('EACCES: Path traversal attempt blocked by Sandbox Guard.');
    }
    return target;
  }

  router.post('/connector', async (req: Request, res: Response) => {
    try {
      const { cmd, targetPath, newName, security } = req.body;

      switch (cmd) {
        case 'mkdir': {
          const dirPath = resolveSandboxPath(path.join(targetPath || '', newName));
          await fs.mkdir(dirPath, { recursive: true, mode: 0o755 });
          return res.json({ status: 'ok', created: dirPath });
        }
        case 'rename': {
          const oldP = resolveSandboxPath(targetPath);
          const newP = resolveSandboxPath(path.join(path.dirname(targetPath), newName));
          await fs.rename(oldP, newP);
          return res.json({ status: 'ok' });
        }
        case 'chmod': {
          const itemPath = resolveSandboxPath(targetPath);
          const modeOctal = parseInt(security?.posix?.octal || '0755', 8);
          await fs.chmod(itemPath, modeOctal);
          // ACL & Quota metadata sidecar (.filemangl.acl.json) kaydı
          await fs.writeFile(
            itemPath + '.filemangl.acl.json',
            JSON.stringify(security, null, 2)
          );
          return res.json({ status: 'ok', octal: security?.posix?.octal });
        }
        default:
          return res.json({ status: 'ok', mountDir: rootResolved });
      }
    } catch (err: any) {
      return res.status(403).json({ status: 'error', message: err.message });
    }
  });

  return router;
}`
    }
  ),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "node_mount_app",
      title: "server/index.ts — Express Sunucusuna Bağlama (Mount)",
      language: "typescript",
      solidPrinciple: "OCP",
      description: "Farklı departman veya kiracılar (multi-tenant) için birden fazla izole disk bağlama noktası oluşturulabilir.",
      code: `import express from 'express';
import { createFileManGLConnector } from './fileManGLConnector';

const app = express();
app.use(express.json({ limit: '50mb' }));

app.use(
  '/api/v1/filemanager',
  createFileManGLConnector({
    mountDir: 'D:/FileManGLManagedVolume',
    maxQuotaBytes: 500 * 1024 * 1024,
    blockedExtensions: ['.exe', '.bat', '.cmd', '.msi', '.vbs'],
  })
);

app.listen(8080, () => {
  console.log('FileManGL Connector listening on http://localhost:8080');
});`
    }
  )
] }), Jn = {
  id: "nodejs_backend",
  stepNumber: 4,
  title: "4. Node.js / Express Disk Connector",
  subtitle: "TypeScript Sandbox Guard, POSIX Chmod ve Multi-Tenant Disk Bağlama",
  badge: "Node 20+",
  routeSlug: "/documentation/nodejs",
  solidFocus: ["SRP", "OCP"],
  searchKeywords: ["nodejs", "express", "fastify", "typescript", "sandbox", "fs", "chmod"],
  iconName: "terminal",
  iconColorClass: "text-emerald-400",
  subItems: [
    { id: "node_server", label: "4.1 fileManGLConnector.ts Middleware", badge: "Router" },
    { id: "node_mount_app", label: "4.2 Express Sunucusuna Mount Etme", badge: "Express" }
  ],
  Component: Qn
}, es = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 05 • Zero-Trust 5 Katmanlı İzin & Kota Motoru" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "5. Hibrit İzin (NTFS ACL + POSIX) ve Klasör Kotası Motoru" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      "Klasik dosya yöneticilerinde yalnızca basit ",
      /* @__PURE__ */ e("code", { children: "read/write" }),
      " bayrağı bulunurken,",
      " ",
      /* @__PURE__ */ e("strong", { children: "FileManGL PermissionEngine" }),
      " ve ",
      /* @__PURE__ */ e("strong", { children: "QuotaEngine" }),
      " Single Responsibility Principle (SRP) çerçevesinde ayrıştırılmış iki saf servis olarak 5 katmanlı işletim sistemi denetimi uygular:"
    ] })
  ] }),
  /* @__PURE__ */ e("div", { className: "space-y-2.5", children: [
    {
      step: "Katman 1: Değiştirilemez Kilit (Immutable Lock)",
      desc: "Klasör veya üst klasörlerinden biri kilitliyse (locked: true), Admin dahi olsa kilit açılana kadar yazma/silme/adlandırma işlemleri engellenir."
    },
    {
      step: "Katman 2: Açık Engelleme (Explicit ACL Deny)",
      desc: 'Kullanıcı veya rol için tanımlanmış bir "DENY" kuralı varsa, diğer tüm izinleri ezer (NTFS Güvenlik Standardı).'
    },
    {
      step: "Katman 3: Açık İzin (Explicit ACL Allow) & Miras (Inheritance)",
      desc: "inheritFromParent: true olduğu sürece üst klasörlerden gelen rol/kullanıcı bazlı 9 granüler yetki (read, write, delete, rename, upload, download, share, chmod, lock) miras alınır."
    },
    {
      step: "Katman 4: POSIX (Owner / Group / Others — rwx / 0755)",
      desc: "Özel bir ACL kuralı eşleşmediğinde düğümün sahibi (Owner), grubu (Group) ve genel (Others) bitlerine göre izin hesaplanır."
    },
    {
      step: "Katman 5: Disk ve Klasör Kotası + Uzantı Politikası",
      desc: "Yazma/Yükleme/Kopyalama anında hem toplam disk kotası hem de hedef klasörün özel MB kotası ve izin verilen/yasaklanan uzantıları denetlenir."
    }
  ].map((a, l) => /* @__PURE__ */ t(
    "div",
    {
      className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3",
      children: [
        /* @__PURE__ */ e(
          "span",
          {
            className: "material-symbols-outlined text-emerald-400 shrink-0 mt-0.5",
            style: { fontSize: "18px" },
            children: "verified_user"
          }
        ),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("div", { className: "text-xs font-bold text-white", children: a.step }),
          /* @__PURE__ */ e("p", { className: "text-xs text-slate-400 mt-0.5", children: a.desc })
        ] })
      ]
    },
    l
  )) }),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "perm_engine_code",
      title: "src/core/services/PermissionEngine.ts & QuotaEngine.ts — İzin ve Kota Doğrulama",
      language: "typescript",
      solidPrinciple: "SRP",
      description: "İzin hesaplaması (PermissionEngine) ve disk/klasör kota doğrulaması (QuotaEngine) tamamen bağımsız ve deterministik iki sınıf olarak çalışır.",
      code: `import { PermissionEngine } from './core/services/PermissionEngine';
import { QuotaEngine } from './core/services/QuotaEngine';
import { FileNode, IFileManagerConfig, UserIdentity } from './core/contracts/types';

export function authorizeFileWrite(
  targetFolder: FileNode,
  incomingFileName: string,
  incomingBytes: number,
  currentUser: UserIdentity,
  allNodes: FileNode[],
  config: IFileManagerConfig
): { ok: boolean; reason?: string } {
  // 1. 5-Katmanlı ACL + POSIX + Kilit Denetimi
  const perm = PermissionEngine.evaluateNodePermissions(
    targetFolder,
    currentUser,
    allNodes,
    config
  );

  if (!perm.allowed.write || !perm.allowed.upload) {
    return {
      ok: false,
      reason: perm.reasons.write || 'EACCES: Hedef klasöre yazma izniniz yok.',
    };
  }

  // 2. Toplam Disk Kotası + Klasör Özel MB Kotası + Uzantı Politikası Denetimi
  const quotaCheck = QuotaEngine.validateWriteOperation(
    targetFolder.id,
    incomingFileName,
    incomingBytes,
    allNodes,
    config
  );

  if (!quotaCheck.allowed) {
    return {
      ok: false,
      reason: quotaCheck.reason,
    };
  }

  return { ok: true };
}`
    }
  )
] }), ts = {
  id: "permission_engine",
  stepNumber: 5,
  title: "5. Hibrit ACL + POSIX + Kota Motoru",
  subtitle: "5 Katmanlı NTFS ACL, POSIX 0755, Klasör Kilidi ve MB Kota Denetimi",
  badge: "Zero-Trust",
  routeSlug: "/documentation/permissions",
  solidFocus: ["SRP", "OCP"],
  searchKeywords: ["acl", "posix", "0755", "permission", "quota", "lock", "eacces", "enospc"],
  iconName: "shield_lock",
  iconColorClass: "text-amber-400",
  subItems: [
    { id: "perm_engine_code", label: "5.1 PermissionEngine & QuotaEngine API", badge: "5 Katman" }
  ],
  Component: es
}, as = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 06 • S.O.L.I.D. Mimari & WebGL2 GPU Hızlandırma" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "6. SOLID Prensipleri & Modüler Mimari Rehberi" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      /* @__PURE__ */ e("strong", { children: "FileManGL v1.0.4" }),
      " kod tabanı, kurumsal ölçekte genişletilebilirlik ve birim test edilebilirlik için beş ",
      /* @__PURE__ */ e("strong", { children: "SOLID" }),
      " prensibinin tamamını katı sözleşmelerle (",
      /* @__PURE__ */ e("code", { children: "src/core/contracts/types.ts" }),
      ") uygular:"
    ] })
  ] }),
  /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-5 gap-2.5 text-xs", children: [
    {
      code: "S",
      name: "Single Responsibility",
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      desc: "PermissionEngine, QuotaEngine, SyntaxHighlighterEngine ve VFS sürücüleri yalnızca tek bir sorumluluğa sahiptir."
    },
    {
      code: "O",
      name: "Open / Closed",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      desc: "Mevcut kodu değiştirmeden yeni depolama sürücüleri (S3, WebDAV), yeni diller (.json) ve yeni doküman modülleri eklenir."
    },
    {
      code: "L",
      name: "Liskov Substitution",
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
      desc: "VfsMemoryDriver, VfsLocalStorageDriver ve RestConnectorDriver birbirinin yerine sorunsuzca geçebilir."
    },
    {
      code: "I",
      name: "Interface Segregation",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
      desc: "IFileSystemDriver, ISyntaxGrammarStrategy ve IDocModuleDefinition gibi odaklı, şişirilmemiş arayüzler kullanılır."
    },
    {
      code: "D",
      name: "Dependency Inversion",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      desc: "UI bileşenleri somut sürücülere değil, soyut IFileSystemDriver ve I18nContext kontratlarına bağımlıdır."
    }
  ].map((a) => /* @__PURE__ */ t(
    "div",
    {
      className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-1.5",
      children: [
        /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: `w-6 h-6 rounded-lg border font-mono font-extrabold flex items-center justify-center ${a.color}`,
              children: a.code
            }
          ),
          /* @__PURE__ */ e("span", { className: "font-bold text-white truncate", children: a.name })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-slate-400 leading-relaxed", children: a.desc })
      ]
    },
    a.code
  )) }),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "solid_driver",
      title: "src/core/drivers/CustomS3Driver.ts — Open/Closed & Liskov Substitution Örneği",
      language: "typescript",
      solidPrinciple: "OCP",
      description: "Kendi özel depolama sürücünüzü (AWS S3, Cloudflare R2, IndexedDB veya WebDAV) sadece IFileSystemDriver arayüzünü uygulayarak sisteme enjekte edebilirsiniz.",
      code: `import { IFileSystemDriver, FileNode } from '../contracts/types';

export class CustomS3Driver implements IFileSystemDriver {
  public readonly driverId = 'aws_s3_driver';
  public readonly driverName = 'Amazon S3 Bucket Driver';
  public readonly supportsRealtimeStream = false;

  public async initialize(): Promise<FileNode[]> {
    // S3 ListObjectsV2 çağrısı ve FileNode dönüşümü
    return [];
  }

  public async getAllNodes(): Promise<FileNode[]> {
    return this.initialize();
  }

  public async saveAllNodes(nodes: FileNode[]): Promise<void> {
    // S3 PutObject / Metadata senkronizasyonu
  }

  public async resetToFactoryDefaults(): Promise<FileNode[]> {
    return [];
  }
}`
    }
  ),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "solid_webgl_glsl",
      title: "src/core/webgl/WebGLDiskMapViewport.tsx — GLSL Cushion Treemap Fragment Shader",
      language: "glsl",
      solidPrinciple: "SRP",
      description: "WebGL2 GPU hattı, 25.000+ dosya düğümünü ve 3B yastık (Cushion Treemap) disk yoğunluk haritasını 60 FPS hızında doğrudan ekran kartında işler.",
      code: `precision mediump float;
varying vec4 v_color;
varying vec2 v_uv;

void main() {
  // Windows 11 SequoiaView / WinDirStat tarzı 3B Parabolik Yastık (Cushion) Işıklandırması
  float nx = (v_uv.x - 0.5) * 2.0;
  float ny = (v_uv.y - 0.5) * 2.0;
  float ridge = max(0.0, 1.0 - (nx * nx * 0.55 + ny * ny * 0.55));
  float specular = pow(max(0.0, 1.0 - length(v_uv - vec2(0.28, 0.24))), 3.0) * 0.28;

  vec3 litColor = v_color.rgb * (0.68 + 0.38 * ridge) + vec3(specular);
  gl_FragColor = vec4(litColor, v_color.a);
}`
    }
  )
] }), rs = {
  id: "solid_architecture",
  stepNumber: 6,
  title: "6. SOLID Mimari & WebGL Pipeline",
  subtitle: "SRP, OCP, LSP, ISP, DIP Kod Örnekleri, S3 Sürücüsü ve GLSL Shader Motoru",
  badge: "SOLID + GPU",
  routeSlug: "/documentation/solid",
  solidFocus: ["SRP", "OCP", "LSP", "ISP", "DIP"],
  searchKeywords: ["solid", "srp", "ocp", "lsp", "isp", "dip", "webgl", "glsl", "s3", "driver"],
  iconName: "architecture",
  iconColorClass: "text-purple-400",
  subItems: [
    { id: "solid_driver", label: "6.1 Özel Sürücü (CustomS3Driver) Yazımı", badge: "IFileSystemDriver" },
    { id: "solid_webgl_glsl", label: "6.2 WebGL2 Cushion Treemap GLSL Shader", badge: "WebGL2" }
  ],
  Component: as
}, ls = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 07 • Modüler JSON Çoklu Dil (i18n: TR / EN / DE / RU)" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "7. Modüler JSON Çoklu Dil (i18n) Sistemi (tr.json, en.json, de.json, ru.json)" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      "FileManGL'deki tüm menüler, Windows 11 Dosya Gezgini görünümleri, bağlam menüleri, WebGL HUD panelleri ve durum çubuğu metinleri ",
      /* @__PURE__ */ e("code", { children: "src/core/i18n/locales/" }),
      " dizini altındaki saf ",
      /* @__PURE__ */ e("code", { children: ".json" }),
      " sözlük dosyalarından okunur:"
    ] })
  ] }),
  /* @__PURE__ */ t("ul", { className: "list-disc pl-5 space-y-1 text-xs text-slate-300 font-mono", children: [
    /* @__PURE__ */ e("li", { children: "src/core/i18n/locales/tr.json (Türkçe — 🇹🇷)" }),
    /* @__PURE__ */ e("li", { children: "src/core/i18n/locales/en.json (English — 🇬🇧)" }),
    /* @__PURE__ */ e("li", { children: "src/core/i18n/locales/de.json (Deutsch — 🇩🇪)" }),
    /* @__PURE__ */ e("li", { children: "src/core/i18n/locales/ru.json (Русский — 🇷🇺)" }),
    /* @__PURE__ */ e("li", { children: "src/core/i18n/I18nProvider.tsx (React Context, useI18n Hook & Fallback Engine)" })
  ] }),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "i18n_json_sample",
      title: "src/core/i18n/locales/tr.json — Modüler JSON Çeviri Sözlüğü Yapısı",
      language: "json",
      solidPrinciple: "OCP",
      description: "Open/Closed Principle: Yeni bir dil eklemek için mevcut bileşen kodlarına dokunmadan yeni bir .json dosyası (ör. fr.json) kaydetmek yeterlidir.",
      code: `{
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
}`
    }
  ),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "i18n_usage",
      title: "src/LocalizedExplorer.tsx — Yeni Dil Ekleme veya Konfigürasyonla Dil Set Etme",
      language: "tsx",
      solidPrinciple: "DIP",
      description: "Bileşenler metinleri doğrudan sabit (hardcoded) yazmak yerine useI18n() kancası üzerinden soyut sözlükten alır.",
      code: `import { FileManGL, DEFAULT_FILE_MANAGER_CONFIG } from './core';
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
}`
    }
  )
] }), ns = {
  id: "i18n_localization",
  stepNumber: 7,
  title: "7. Çoklu Dil (i18n JSON: TR / EN / DE / RU)",
  subtitle: "tr.json, en.json, de.json, ru.json Sözlükleri, useI18n Hook ve Dil Ayarları",
  badge: "i18n JSON",
  routeSlug: "/documentation/i18n",
  solidFocus: ["OCP", "DIP"],
  searchKeywords: ["i18n", "json", "tr", "en", "de", "ru", "localization", "ceviri", "dil"],
  iconName: "translate",
  iconColorClass: "text-cyan-400",
  subItems: [
    { id: "i18n_json_sample", label: "7.1 JSON Çeviri Sözlüğü Şeması", badge: "4 Dil" },
    { id: "i18n_usage", label: "7.2 useI18n() Hook & Özel Çeviri Kullanımı", badge: "Hook" }
  ],
  Component: ls
}, ss = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 08 • Vitest + React Testing Library Otomasyon Mimarisi" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "8. Tam Teşekküllü UX / UI ve Çekirdek Motor Test Otomasyonu" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      "SOLID prensiplerine uygun olarak soyutlanan çekirdek motorlar (",
      /* @__PURE__ */ e("code", { children: "PermissionEngine" }),
      ", ",
      /* @__PURE__ */ e("code", { children: "QuotaEngine" }),
      ", ",
      /* @__PURE__ */ e("code", { children: "VfsMemoryDriver" }),
      ") ve Windows 11 UX bileşenleri (Sekmeli işlem, Boyutlandırılabilir yan paneller, Sürükle-Bırak, Seçim Penceresi, Kes/Kopyala/Yapıştır, WebGL2 görünümler) ",
      /* @__PURE__ */ e("code", { children: "src/tests/" }),
      " altında otomatik olarak test edilir."
    ] })
  ] }),
  /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 text-xs", children: [
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-emerald-400 mb-1", children: "src/tests/coreEngines.test.ts" }),
      /* @__PURE__ */ t("p", { className: "text-slate-400", children: [
        "POSIX octal (",
        /* @__PURE__ */ e("code", { children: "0755" }),
        " ↔ ",
        /* @__PURE__ */ e("code", { children: "rwxr-xr-x" }),
        "), 5 katmanlı ACL Allow/Deny önceliği, klasör kilidi, MB kota aşımı ve yasaklı uzantı testleri."
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-blue-400 mb-1", children: "src/tests/windows11ExplorerUx.test.tsx" }),
      /* @__PURE__ */ e("p", { className: "text-slate-400", children: "Çoklu sekme (Multi-Tab), boyutlandırılabilir yan paneller, tek satır Google Material Symbols araç çubuğu, Sürükle-Bırak ve Marquee seçim penceresi testleri." })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-purple-400 mb-1", children: "src/tests/modalsAndWebGL.test.tsx" }),
      /* @__PURE__ */ e("p", { className: "text-slate-400", children: "WebGL2 60FPS Spatial Grid, 3B Cushion Disk Haritası, Çift Panel (Dual-Pane), Toplu Adlandırma, Paylaşım Linki, GLSL Stüdyosu ve Kod Editörü testleri." })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ e("div", { className: "font-mono font-bold text-cyan-400 mb-1", children: "src/tests/i18nAndRouting.test.tsx" }),
      /* @__PURE__ */ t("p", { className: "text-slate-400", children: [
        /* @__PURE__ */ e("code", { children: "tr.json" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "en.json" }),
        " ve ",
        /* @__PURE__ */ e("code", { children: "de.json" }),
        " şema eşitliği,",
        " ",
        /* @__PURE__ */ e("code", { children: "/demo" }),
        ", ",
        /* @__PURE__ */ e("code", { children: "/documentation" }),
        " ve ",
        /* @__PURE__ */ e("code", { children: "/configurator" }),
        " URL rota testleri."
      ] })
    ] })
  ] }),
  /* @__PURE__ */ e(
    Xe,
    {
      id: "test_example_dnd",
      title: "src/tests/windows11ExplorerUx.test.tsx — Sürükle & Bırak ve Seçim Penceresi Otomasyon Testi",
      language: "tsx",
      solidPrinciple: "LSP",
      description: "VfsMemoryDriver kullanılarak gerçek DOM etkileşimleri (dragStart, dragOver, drop ve mouseDown/mouseMove) deterministik olarak doğrulanır.",
      code: `import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileManGL, DEFAULT_FILE_MANAGER_CONFIG } from '../core';

describe('Windows 11 Drag & Drop + Marquee Selection Isolation', () => {
  it('moves files into target folders via Drag & Drop without triggering the marquee box', async () => {
    const { container } = render(
      <FileManGL
        config={{
          ...DEFAULT_FILE_MANAGER_CONFIG,
          driverType: 'vfs_memory',
        }}
      />
    );

    const docText = (await screen.findAllByText(/Architecture_Guide/i))[0];
    const docCard = docText.closest('[data-node-id]') as HTMLElement;
    expect(docCard.getAttribute('draggable')).toBe('true');

    // Kart üzerinde fare hareketi seçim penceresini (marquee) başlatmamalıdır
    fireEvent.mouseDown(docCard, { button: 0, clientX: 120, clientY: 120 });
    fireEvent.mouseMove(window, { clientX: 300, clientY: 300 });
    expect(container.querySelector('.pointer-events-none.z-40')).toBeNull();
    fireEvent.mouseUp(window);
  });
});`
    }
  )
] }), is = {
  id: "testing_automation",
  stepNumber: 8,
  title: "8. UX/UI Test Otomasyonu (Vitest)",
  subtitle: "Birim, Entegrasyon, Sürükle-Bırak, Çoklu Sekme ve WebGL2 Otomasyon Testleri",
  badge: "26+ Tests",
  routeSlug: "/documentation/testing",
  solidFocus: ["SRP", "LSP", "DIP"],
  searchKeywords: ["test", "vitest", "automation", "otomasyon", "drag", "drop", "marquee"],
  iconName: "fact_check",
  iconColorClass: "text-emerald-400",
  subItems: [
    { id: "test_example_dnd", label: "8.1 Vitest & RTL Sürükle-Bırak Otomasyonu", badge: "Vitest" }
  ],
  Component: ss
}, dt = [
  Yn,
  qn,
  Rr,
  Jn,
  ts,
  rs,
  ns,
  is
];
function os(a) {
  return dt.find((l) => l.id === a) || Rr;
}
function ds(a) {
  const l = a.trim().toLowerCase();
  return l ? dt.filter(
    (s) => s.title.toLowerCase().includes(l) || s.subtitle.toLowerCase().includes(l) || s.badge.toLowerCase().includes(l) || s.solidFocus.some((d) => d.toLowerCase().includes(l)) || s.searchKeywords.some((d) => d.toLowerCase().includes(l))
  ) : dt;
}
const gr = 240, vr = 560, jt = 340, _a = "filemangl_docs_sidebar_width", xs = ({
  initialSection: a = "quickstart"
}) => {
  const [l, s] = A(a), [d, i] = A(""), [c, n] = A(""), [u, x] = A(!1), [w, P] = A(() => {
    try {
      const O = Number(localStorage.getItem(_a));
      if (!Number.isNaN(O) && O >= gr && O <= vr)
        return O;
    } catch {
    }
    return jt;
  }), [L, T] = A(!1), M = Ge({
    startX: 0,
    startWidth: jt
  }), [v, B] = A(() => ({
    quickstart: !0,
    connector_spec: !0,
    laravel_backend: !1,
    nodejs_backend: !1,
    permission_engine: !0,
    solid_architecture: !1,
    i18n_localization: !1,
    testing_automation: !1
  }));
  Ve(() => {
    a && (s(a), B((O) => ({ ...O, [a]: !0 })));
  }, [a]);
  const F = Re(
    (O) => {
      O.preventDefault(), M.current = {
        startX: O.clientX,
        startWidth: w
      }, T(!0);
    },
    [w]
  );
  Ve(() => {
    if (!L) return;
    const O = (ce) => {
      const k = ce.clientX - M.current.startX, D = Math.min(
        vr,
        Math.max(gr, M.current.startWidth + k)
      );
      P(D);
      try {
        localStorage.setItem(_a, String(D));
      } catch {
      }
    }, le = () => {
      T(!1);
    };
    return window.addEventListener("mousemove", O), window.addEventListener("mouseup", le), () => {
      window.removeEventListener("mousemove", O), window.removeEventListener("mouseup", le);
    };
  }, [L]);
  const z = He(() => ds(c), [c]), m = He(
    () => os(l),
    [l]
  ), b = m.Component, E = dt.findIndex((O) => O.id === l), Z = E > 0 ? dt[E - 1] : null, X = E >= 0 && E < dt.length - 1 ? dt[E + 1] : null, $ = (O) => {
    s(O), i(""), B((le) => ({ ...le, [O]: !0 }));
  }, re = (O, le) => {
    le == null || le.stopPropagation(), B((ce) => ({ ...ce, [O]: !ce[O] }));
  }, se = (O, le) => {
    l !== O && s(O), i(le.id), B((ce) => ({ ...ce, [O]: !0 })), setTimeout(() => {
      const ce = document.getElementById(le.id);
      ce && ce.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, he = He(
    () => dt.every((O) => v[O.id]),
    [v]
  ), be = () => {
    const O = {};
    for (const le of dt)
      O[le.id] = !he;
    B(O);
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: `w-full flex-1 bg-[#0c121e] border-b border-slate-800 flex flex-col lg:flex-row min-h-[calc(100vh-125px)] ${L ? "select-none cursor-col-resize" : ""}`,
      children: [
        !u && /* @__PURE__ */ t(
          "aside",
          {
            style: {
              width: typeof window < "u" && window.innerWidth >= 1024 ? w : void 0
            },
            className: "w-full lg:shrink-0 bg-[#080d16] border-b lg:border-b-0 border-slate-800 p-4 flex flex-col gap-3 min-w-0",
            children: [
              /* @__PURE__ */ t("div", { className: "pb-3 border-b border-slate-800/80 space-y-2.5", children: [
                /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ t("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
                    /* @__PURE__ */ e(
                      "span",
                      {
                        className: "material-symbols-outlined text-blue-400",
                        style: { fontSize: "18px" },
                        children: "menu_book"
                      }
                    ),
                    /* @__PURE__ */ e("span", { children: "FileManGL Dokümantasyonu" })
                  ] }),
                  /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: be,
                        title: he ? "Tüm alt menüleri daralt" : "Tüm alt menüleri aç",
                        className: "px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-800 transition",
                        children: he ? "Daralt" : "Tümünü Aç"
                      }
                    ),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        type: "button",
                        onClick: () => x(!0),
                        title: "Kenar çubuğunu gizle",
                        className: "hidden lg:inline-flex p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition",
                        children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "left_panel_close" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ e("label", { className: "block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1", children: "Hızlı Bölüm Seçici (Dropdown)" }),
                  /* @__PURE__ */ e(
                    "select",
                    {
                      value: l,
                      onChange: (O) => $(O.target.value),
                      className: "w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-2.5 py-1.5 text-xs text-white font-semibold focus:outline-none cursor-pointer",
                      children: dt.map((O) => /* @__PURE__ */ t("option", { value: O.id, children: [
                        O.title,
                        " (",
                        O.badge,
                        ")"
                      ] }, O.id))
                    }
                  )
                ] }),
                /* @__PURE__ */ t("div", { className: "relative", children: [
                  /* @__PURE__ */ e(
                    "input",
                    {
                      type: "text",
                      value: c,
                      onChange: (O) => n(O.target.value),
                      placeholder: "Prop, config veya konu ara (borderRadius, ACL)...",
                      className: "w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-3 pr-8 py-1.5 text-xs text-white focus:outline-none"
                    }
                  ),
                  c ? /* @__PURE__ */ e(
                    "button",
                    {
                      onClick: () => n(""),
                      className: "absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white",
                      children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "close" })
                    }
                  ) : /* @__PURE__ */ e(
                    "span",
                    {
                      className: "material-symbols-outlined text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none",
                      style: { fontSize: "16px" },
                      children: "search"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ e("div", { className: "flex flex-col gap-1.5 overflow-y-auto pr-0.5", children: z.map((O) => {
                const le = l === O.id, ce = !!(v[O.id] || le || c.trim()), k = O.subItems ?? [];
                return /* @__PURE__ */ t("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ t(
                    "div",
                    {
                      className: `w-full rounded-xl transition flex items-center justify-between border ${le ? "bg-blue-600/20 border-blue-500/60 text-white shadow-sm" : "bg-slate-900/40 border-slate-800/70 text-slate-300 hover:bg-slate-800/70 hover:text-white"}`,
                      children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            type: "button",
                            onClick: () => $(O.id),
                            className: "flex-1 p-2.5 text-left flex items-start gap-2 min-w-0",
                            children: [
                              /* @__PURE__ */ e(
                                "span",
                                {
                                  className: `material-symbols-outlined shrink-0 mt-0.5 ${O.iconColorClass}`,
                                  style: { fontSize: "17px" },
                                  children: O.iconName
                                }
                              ),
                              /* @__PURE__ */ t("div", { className: "min-w-0 flex-1", children: [
                                /* @__PURE__ */ e("div", { className: "text-xs font-semibold leading-snug break-words", children: O.title }),
                                /* @__PURE__ */ e("div", { className: "text-[10px] text-slate-400 mt-0.5 font-mono", children: O.routeSlug })
                              ] })
                            ]
                          }
                        ),
                        /* @__PURE__ */ t("div", { className: "flex items-center gap-1 pr-2 shrink-0", children: [
                          /* @__PURE__ */ e("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800", children: O.badge }),
                          k.length > 0 && /* @__PURE__ */ e(
                            "button",
                            {
                              type: "button",
                              onClick: (D) => re(O.id, D),
                              title: "Alt başlıkları aç / kapat",
                              className: "p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition",
                              children: /* @__PURE__ */ e(
                                "span",
                                {
                                  className: "material-symbols-outlined",
                                  style: { fontSize: "16px" },
                                  children: ce ? "expand_more" : "chevron_right"
                                }
                              )
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  ce && k.length > 0 && /* @__PURE__ */ e("div", { className: "ml-4 pl-3 mt-1 mb-1.5 border-l-2 border-slate-800 flex flex-col gap-1", children: k.map((D) => {
                    const me = le && d === D.id;
                    return /* @__PURE__ */ t(
                      "button",
                      {
                        type: "button",
                        onClick: () => se(O.id, D),
                        className: `w-full px-2.5 py-1.5 rounded-lg text-left text-[11px] flex items-center justify-between gap-2 transition ${me ? "bg-blue-600/20 text-blue-300 font-semibold" : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/70"}`,
                        children: [
                          /* @__PURE__ */ e("span", { className: "leading-snug", children: D.label }),
                          D.badge && /* @__PURE__ */ e("span", { className: "text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-950 text-slate-400 border border-slate-800 shrink-0", children: D.badge })
                        ]
                      },
                      D.id
                    );
                  }) })
                ] }, O.id);
              }) }),
              /* @__PURE__ */ t("div", { className: "hidden lg:flex items-center justify-between pt-2 border-t border-slate-800/70 text-[10px] font-mono text-slate-500 mt-auto", children: [
                /* @__PURE__ */ t("span", { children: [
                  "Genişlik: ",
                  w,
                  "px (Sürükle-Boyutlandır)"
                ] }),
                /* @__PURE__ */ e(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      P(jt);
                      try {
                        localStorage.setItem(_a, String(jt));
                      } catch {
                      }
                    },
                    className: "text-slate-400 hover:text-cyan-400 underline",
                    children: "Sıfırla"
                  }
                )
              ] })
            ]
          }
        ),
        !u && /* @__PURE__ */ e(
          "div",
          {
            onMouseDown: F,
            onDoubleClick: () => P(jt),
            title: "Kenar çubuğu genişliğini ayarlamak için sürükleyin (Çift tık: Sıfırla)",
            className: `hidden lg:flex w-2 shrink-0 cursor-col-resize items-center justify-center border-r border-slate-800 transition-colors group ${L ? "bg-blue-500/40 border-blue-500" : "bg-[#080d16] hover:bg-blue-500/25"}`,
            children: /* @__PURE__ */ e(
              "div",
              {
                className: `w-0.5 h-10 rounded-full transition-colors ${L ? "bg-blue-400" : "bg-slate-700 group-hover:bg-blue-400"}`
              }
            )
          }
        ),
        /* @__PURE__ */ t("div", { className: "flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden overflow-y-auto flex flex-col gap-6 text-sm text-slate-300 leading-relaxed", children: [
          /* @__PURE__ */ t("div", { className: "min-w-0", children: [
            /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-800/80 text-xs", children: [
              /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2 font-mono text-slate-400 min-w-0", children: [
                u && /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    onClick: () => x(!1),
                    className: "px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 flex items-center gap-1.5 font-sans font-semibold transition",
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "left_panel_open" }),
                      /* @__PURE__ */ e("span", { children: "Menüyü Göster" })
                    ]
                  }
                ),
                /* @__PURE__ */ e("span", { className: "px-2.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400", children: m.routeSlug }),
                /* @__PURE__ */ e("span", { className: "hidden sm:inline", children: "•" }),
                /* @__PURE__ */ e("span", { className: "text-xs text-slate-300 font-sans", children: m.subtitle })
              ] }),
              m.subItems && m.subItems.length > 0 && /* @__PURE__ */ e("div", { className: "flex flex-wrap items-center gap-1.5", children: m.subItems.map((O) => /* @__PURE__ */ e(
                "button",
                {
                  type: "button",
                  onClick: () => se(m.id, O),
                  className: `px-2.5 py-1 rounded-lg text-[11px] font-mono border transition ${d === O.id ? "bg-blue-600/20 border-blue-500 text-blue-300 font-semibold" : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white"}`,
                  children: O.label
                },
                O.id
              )) })
            ] }),
            /* @__PURE__ */ e(b, {})
          ] }),
          /* @__PURE__ */ t("div", { className: "pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-auto", children: [
            Z ? /* @__PURE__ */ t(
              "button",
              {
                onClick: () => $(Z.id),
                className: "px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-2 transition",
                children: [
                  /* @__PURE__ */ e("span", { className: "material-symbols-outlined shrink-0", style: { fontSize: "16px" }, children: "arrow_back" }),
                  /* @__PURE__ */ t("div", { className: "text-left min-w-0", children: [
                    /* @__PURE__ */ e("div", { className: "text-[10px] text-slate-400", children: "Önceki Bölüm" }),
                    /* @__PURE__ */ e("div", { className: "font-semibold text-white", children: Z.title })
                  ] })
                ]
              }
            ) : /* @__PURE__ */ e("div", { className: "hidden sm:block" }),
            X && /* @__PURE__ */ t(
              "button",
              {
                onClick: () => $(X.id),
                className: "px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center justify-between sm:justify-end gap-2 transition sm:ml-auto",
                children: [
                  /* @__PURE__ */ t("div", { className: "text-left sm:text-right min-w-0", children: [
                    /* @__PURE__ */ e("div", { className: "text-[10px] text-slate-400", children: "Sonraki Bölüm" }),
                    /* @__PURE__ */ e("div", { className: "font-semibold text-white", children: X.title })
                  ] }),
                  /* @__PURE__ */ e("span", { className: "material-symbols-outlined shrink-0", style: { fontSize: "16px" }, children: "arrow_forward" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
};
export {
  St as ALL_PERMISSION_ACTIONS,
  Bn as BatchRenameModal,
  il as CONFIG_PRESETS,
  Rn as CodeEditorModal,
  bs as ConfigPlaygroundPanel,
  On as ConflictResolutionModal,
  aa as DEFAULT_FILE_MANAGER_CONFIG,
  ft as DEMO_USERS,
  Da as DICTIONARIES,
  xs as DocumentationPortal,
  hs as FileManGL,
  fs as FileManGLLogo,
  ps as I18nProvider,
  la as LOCALE_LIST,
  Un as LanguageDropdown,
  Gn as MediaPlayerModal,
  de as PermissionEngine,
  ne as QuotaEngine,
  hl as RestConnectorDriver,
  Pn as SecurityPermissionsModal,
  $n as ShareLinkModal,
  ht as ThumbnailCacheService,
  Wl as UploadQueueTray,
  kr as VfsLocalStorageDriver,
  pl as VfsMemoryDriver,
  Mn as WebGLDiskMapViewport,
  An as WebGLImageShaderModal,
  Nn as WebGLSpatialViewport,
  gn as WindowsExplorerViews,
  ur as ZipArchiveService,
  ot as createDefaultAcl,
  Kn as ensureMaterialSymbolsLoaded,
  ct as generateStressTestNodes,
  na as getInitialSeedNodes,
  Pt as renderCategoryIcon,
  oa as useI18n
};
//# sourceMappingURL=filemangl.js.map

;(function(){try{if(typeof document!=='undefined'&&!document.getElementById('filemangl-core-styles')){var s=document.createElement('style');s.id='filemangl-core-styles';s.textContent="*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: \"\"}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:JetBrains Mono,SF Mono,Cascadia Code,Consolas,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}html{font-size:calc(16px * var(--fm-font-scale, var(--uxu-font-scale, 1)))}body{background-color:#070b12;color:#f1f5f9;font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:calc(14px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.5;transition:background-color .2s ease,color .2s ease}::-webkit-scrollbar{width:7px;height:7px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#64748b59;border-radius:9999px}::-webkit-scrollbar-thumb:hover{background:#64748b8c}.\\!container{width:100%!important}.container{width:100%}@media(min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media(min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media(min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media(min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media(min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{top:0;right:0;bottom:0;left:0}.inset-x-0{left:0;right:0}.inset-y-0{top:0;bottom:0}.-bottom-0\\.5{bottom:-.125rem}.-right-0\\.5{right:-.125rem}.-top-6{top:-1.5rem}.bottom-0\\.5{bottom:.125rem}.bottom-3{bottom:.75rem}.bottom-4{bottom:1rem}.left-0{left:0}.left-1{left:.25rem}.left-1\\.5{left:.375rem}.left-1\\/2{left:50%}.left-3{left:.75rem}.left-6{left:1.5rem}.right-0{right:0}.right-0\\.5{right:.125rem}.right-1\\.5{right:.375rem}.right-2{right:.5rem}.right-2\\.5{right:.625rem}.right-3{right:.75rem}.right-4{right:1rem}.top-0{top:0}.top-1{top:.25rem}.top-1\\.5{top:.375rem}.top-1\\/2{top:50%}.top-2{top:.5rem}.top-6{top:1.5rem}.top-full{top:100%}.z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.order-1{order:1}.order-2{order:2}.order-3{order:3}.col-span-2{grid-column:span 2 / span 2}.m-0{margin:0}.m-2{margin:.5rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-4{margin-left:1rem;margin-right:1rem}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-4{margin-top:1rem;margin-bottom:1rem}.my-auto{margin-top:auto;margin-bottom:auto}.mb-0\\.5{margin-bottom:.125rem}.mb-1{margin-bottom:.25rem}.mb-1\\.5{margin-bottom:.375rem}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.mb-5{margin-bottom:1.25rem}.ml-0\\.5{margin-left:.125rem}.ml-1{margin-left:.25rem}.ml-4{margin-left:1rem}.mr-0\\.5{margin-right:.125rem}.mr-1{margin-right:.25rem}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-1\\.5{margin-top:.375rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-5{margin-top:1.25rem}.mt-6{margin-top:1.5rem}.mt-7{margin-top:1.75rem}.mt-auto{margin-top:auto}.line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-1\\.5{height:.375rem}.h-1\\/2{height:50%}.h-10{height:2.5rem}.h-11{height:2.75rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-2\\.5{height:.625rem}.h-20{height:5rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-36{height:9rem}.h-4{height:1rem}.h-44{height:11rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-\\[34px\\]{height:34px}.h-\\[38px\\]{height:38px}.h-\\[420px\\]{height:420px}.h-\\[680px\\]{height:680px}.h-\\[68vh\\]{height:68vh}.h-\\[82vh\\]{height:82vh}.h-full{height:100%}.max-h-36{max-height:9rem}.max-h-52{max-height:13rem}.max-h-72{max-height:18rem}.max-h-\\[460px\\]{max-height:460px}.max-h-\\[65vh\\]{max-height:65vh}.max-h-\\[70vh\\]{max-height:70vh}.max-h-\\[72vh\\]{max-height:72vh}.max-h-\\[90vh\\]{max-height:90vh}.min-h-0{min-height:0px}.min-h-\\[24px\\]{min-height:24px}.min-h-\\[360px\\]{min-height:360px}.min-h-\\[380px\\]{min-height:380px}.min-h-\\[44px\\]{min-height:44px}.min-h-\\[calc\\(100vh-125px\\)\\]{min-height:calc(100vh - 125px)}.min-h-screen{min-height:100vh}.w-0\\.5{width:.125rem}.w-1{width:.25rem}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-16{width:4rem}.w-2{width:.5rem}.w-2\\.5{width:.625rem}.w-20{width:5rem}.w-3{width:.75rem}.w-3\\.5{width:.875rem}.w-4{width:1rem}.w-44{width:11rem}.w-5{width:1.25rem}.w-56{width:14rem}.w-6{width:1.5rem}.w-60{width:15rem}.w-64{width:16rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-80{width:20rem}.w-9{width:2.25rem}.w-\\[34px\\]{width:34px}.w-full{width:100%}.w-px{width:1px}.min-w-0{min-width:0px}.min-w-\\[105px\\]{min-width:105px}.min-w-\\[140px\\]{min-width:140px}.min-w-\\[600px\\]{min-width:600px}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-\\[110px\\]{max-width:110px}.max-w-\\[1160px\\]{max-width:1160px}.max-w-\\[1280px\\]{max-width:1280px}.max-w-\\[140px\\]{max-width:140px}.max-w-\\[1440px\\]{max-width:1440px}.max-w-\\[160px\\]{max-width:160px}.max-w-\\[220px\\]{max-width:220px}.max-w-\\[85vw\\]{max-width:85vw}.max-w-\\[90vw\\]{max-width:90vw}.max-w-\\[92px\\]{max-width:92px}.max-w-\\[calc\\(100\\%-24px\\)\\]{max-width:calc(100% - 24px)}.max-w-\\[calc\\(100vw-16px\\)\\]{max-width:calc(100vw - 16px)}.max-w-\\[calc\\(100vw-24px\\)\\]{max-width:calc(100vw - 24px)}.max-w-lg{max-width:32rem}.max-w-md{max-width:28rem}.max-w-xs{max-width:20rem}.flex-1{flex:1 1 0%}.flex-none{flex:none}.shrink-0{flex-shrink:0}.border-collapse{border-collapse:collapse}.origin-center{transform-origin:center}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-110{--tw-scale-x: 1.1;--tw-scale-y: 1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-125{--tw-scale-x: 1.25;--tw-scale-y: 1.25;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-75{--tw-scale-x: .75;--tw-scale-y: .75;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-\\[0\\.97\\]{--tw-scale-x: .97;--tw-scale-y: .97;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-col-resize{cursor:col-resize}.cursor-default{cursor:default}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.select-text{-webkit-user-select:text;-moz-user-select:text;user-select:text}.resize-none{resize:none}.resize{resize:both}.scroll-mt-20{scroll-margin-top:5rem}.list-disc{list-style-type:disc}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0\\.5{gap:.125rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-2\\.5{gap:.625rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.gap-6{gap:1.5rem}.gap-x-1\\.5{-moz-column-gap:.375rem;column-gap:.375rem}.gap-x-3{-moz-column-gap:.75rem;column-gap:.75rem}.gap-x-4{-moz-column-gap:1rem;column-gap:1rem}.gap-y-1{row-gap:.25rem}.gap-y-1\\.5{row-gap:.375rem}.gap-y-2{row-gap:.5rem}.space-y-0\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.125rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.125rem * var(--tw-space-y-reverse))}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-2\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.625rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.625rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.space-y-8>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(2rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem * var(--tw-space-y-reverse))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-slate-800\\/60>:not([hidden])~:not([hidden]){border-color:#1e293b99}.divide-slate-800\\/70>:not([hidden])~:not([hidden]){border-color:#1e293bb3}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}.break-words{overflow-wrap:break-word}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-\\[10px\\]{border-radius:10px}.rounded-\\[5px\\]{border-radius:5px}.rounded-\\[6px\\]{border-radius:6px}.rounded-\\[8px\\]{border-radius:8px}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-none{border-radius:0}.rounded-sm{border-radius:.125rem}.rounded-xl{border-radius:.75rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.border{border-width:1px}.border-0{border-width:0px}.border-2{border-width:2px}.border-x{border-left-width:1px;border-right-width:1px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-l{border-left-width:1px}.border-l-2{border-left-width:2px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-\\[\\#0078d4\\]{--tw-border-opacity: 1;border-color:rgb(0 120 212 / var(--tw-border-opacity, 1))}.border-amber-500\\/30{border-color:#f59e0b4d}.border-amber-500\\/35{border-color:#f59e0b59}.border-amber-500\\/40{border-color:#f59e0b66}.border-blue-200{--tw-border-opacity: 1;border-color:rgb(191 219 254 / var(--tw-border-opacity, 1))}.border-blue-500{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.border-blue-500\\/30{border-color:#3b82f64d}.border-blue-500\\/35{border-color:#3b82f659}.border-blue-500\\/50{border-color:#3b82f680}.border-blue-500\\/60{border-color:#3b82f699}.border-cyan-500\\/30{border-color:#06b6d44d}.border-cyan-500\\/35{border-color:#06b6d459}.border-cyan-500\\/40{border-color:#06b6d466}.border-emerald-300{--tw-border-opacity: 1;border-color:rgb(110 231 183 / var(--tw-border-opacity, 1))}.border-emerald-500{--tw-border-opacity: 1;border-color:rgb(16 185 129 / var(--tw-border-opacity, 1))}.border-emerald-500\\/25{border-color:#10b98140}.border-emerald-500\\/30{border-color:#10b9814d}.border-emerald-500\\/35{border-color:#10b98159}.border-emerald-500\\/40{border-color:#10b98166}.border-emerald-500\\/50{border-color:#10b98180}.border-emerald-500\\/60{border-color:#10b98199}.border-neutral-700{--tw-border-opacity: 1;border-color:rgb(64 64 64 / var(--tw-border-opacity, 1))}.border-orange-500\\/35{border-color:#f9731659}.border-pink-500\\/30{border-color:#ec48994d}.border-pink-500\\/40{border-color:#ec489966}.border-purple-500\\/30{border-color:#a855f74d}.border-purple-500\\/35{border-color:#a855f759}.border-purple-500\\/40{border-color:#a855f766}.border-rose-500\\/25{border-color:#f43f5e40}.border-rose-500\\/30{border-color:#f43f5e4d}.border-rose-500\\/35{border-color:#f43f5e59}.border-rose-500\\/60{border-color:#f43f5e99}.border-rose-800\\/50{border-color:#9f123980}.border-slate-200{--tw-border-opacity: 1;border-color:rgb(226 232 240 / var(--tw-border-opacity, 1))}.border-slate-300{--tw-border-opacity: 1;border-color:rgb(203 213 225 / var(--tw-border-opacity, 1))}.border-slate-700{--tw-border-opacity: 1;border-color:rgb(51 65 85 / var(--tw-border-opacity, 1))}.border-slate-700\\/80{border-color:#334155cc}.border-slate-700\\/90{border-color:#334155e6}.border-slate-800{--tw-border-opacity: 1;border-color:rgb(30 41 59 / var(--tw-border-opacity, 1))}.border-slate-800\\/60{border-color:#1e293b99}.border-slate-800\\/70{border-color:#1e293bb3}.border-slate-800\\/80{border-color:#1e293bcc}.border-slate-800\\/90{border-color:#1e293be6}.border-transparent{border-color:transparent}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity, 1))}.border-white\\/10{border-color:#ffffff1a}.border-white\\/20{border-color:#fff3}.border-white\\/25{border-color:#ffffff40}.border-white\\/50{border-color:#ffffff80}.border-white\\/\\[0\\.08\\]{border-color:#ffffff14}.bg-\\[\\#0078d4\\]{--tw-bg-opacity: 1;background-color:rgb(0 120 212 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0078d4\\]\\/25{background-color:#0078d440}.bg-\\[\\#05080e\\]{--tw-bg-opacity: 1;background-color:rgb(5 8 14 / var(--tw-bg-opacity, 1))}.bg-\\[\\#060911\\]{--tw-bg-opacity: 1;background-color:rgb(6 9 17 / var(--tw-bg-opacity, 1))}.bg-\\[\\#060a12\\]{--tw-bg-opacity: 1;background-color:rgb(6 10 18 / var(--tw-bg-opacity, 1))}.bg-\\[\\#070b12\\]{--tw-bg-opacity: 1;background-color:rgb(7 11 18 / var(--tw-bg-opacity, 1))}.bg-\\[\\#070b12\\]\\/85{background-color:#070b12d9}.bg-\\[\\#070b14\\]{--tw-bg-opacity: 1;background-color:rgb(7 11 20 / var(--tw-bg-opacity, 1))}.bg-\\[\\#080c14\\]{--tw-bg-opacity: 1;background-color:rgb(8 12 20 / var(--tw-bg-opacity, 1))}.bg-\\[\\#080c15\\]{--tw-bg-opacity: 1;background-color:rgb(8 12 21 / var(--tw-bg-opacity, 1))}.bg-\\[\\#080d16\\]{--tw-bg-opacity: 1;background-color:rgb(8 13 22 / var(--tw-bg-opacity, 1))}.bg-\\[\\#080d18\\]{--tw-bg-opacity: 1;background-color:rgb(8 13 24 / var(--tw-bg-opacity, 1))}.bg-\\[\\#090d14\\]{--tw-bg-opacity: 1;background-color:rgb(9 13 20 / var(--tw-bg-opacity, 1))}.bg-\\[\\#090d16\\]{--tw-bg-opacity: 1;background-color:rgb(9 13 22 / var(--tw-bg-opacity, 1))}.bg-\\[\\#090e1a\\]{--tw-bg-opacity: 1;background-color:rgb(9 14 26 / var(--tw-bg-opacity, 1))}.bg-\\[\\#090e1a\\]\\/95{background-color:#090e1af2}.bg-\\[\\#0D111A\\]{--tw-bg-opacity: 1;background-color:rgb(13 17 26 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0b101b\\]{--tw-bg-opacity: 1;background-color:rgb(11 16 27 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0b111e\\]{--tw-bg-opacity: 1;background-color:rgb(11 17 30 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0c121e\\]{--tw-bg-opacity: 1;background-color:rgb(12 18 30 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0c1220\\]{--tw-bg-opacity: 1;background-color:rgb(12 18 32 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0d131f\\]{--tw-bg-opacity: 1;background-color:rgb(13 19 31 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0d1320\\]{--tw-bg-opacity: 1;background-color:rgb(13 19 32 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0d1424\\]\\/95{background-color:#0d1424f2}.bg-\\[\\#0e1420\\]{--tw-bg-opacity: 1;background-color:rgb(14 20 32 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0e1525\\]{--tw-bg-opacity: 1;background-color:rgb(14 21 37 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0f1623\\]{--tw-bg-opacity: 1;background-color:rgb(15 22 35 / var(--tw-bg-opacity, 1))}.bg-\\[\\#101726\\]{--tw-bg-opacity: 1;background-color:rgb(16 23 38 / var(--tw-bg-opacity, 1))}.bg-\\[\\#111827\\]{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-\\[\\#111827\\]\\/95{background-color:#111827f2}.bg-\\[\\#111a2e\\]{--tw-bg-opacity: 1;background-color:rgb(17 26 46 / var(--tw-bg-opacity, 1))}.bg-\\[\\#191919\\]{--tw-bg-opacity: 1;background-color:rgb(25 25 25 / var(--tw-bg-opacity, 1))}.bg-\\[\\#1f1f1f\\]{--tw-bg-opacity: 1;background-color:rgb(31 31 31 / var(--tw-bg-opacity, 1))}.bg-\\[\\#cce8ff\\]\\/75{background-color:#cce8ffbf}.bg-amber-400\\/80{background-color:#fbbf24cc}.bg-amber-500{--tw-bg-opacity: 1;background-color:rgb(245 158 11 / var(--tw-bg-opacity, 1))}.bg-amber-500\\/10{background-color:#f59e0b1a}.bg-amber-500\\/15{background-color:#f59e0b26}.bg-amber-500\\/20{background-color:#f59e0b33}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-black\\/25{background-color:#00000040}.bg-black\\/30{background-color:#0000004d}.bg-black\\/35{background-color:#00000059}.bg-black\\/60{background-color:#0009}.bg-black\\/70{background-color:#000000b3}.bg-black\\/75{background-color:#000000bf}.bg-black\\/80{background-color:#000c}.bg-blue-400{--tw-bg-opacity: 1;background-color:rgb(96 165 250 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-blue-500{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}.bg-blue-500\\/10{background-color:#3b82f61a}.bg-blue-500\\/15{background-color:#3b82f626}.bg-blue-500\\/20{background-color:#3b82f633}.bg-blue-500\\/40{background-color:#3b82f666}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-blue-600\\/20{background-color:#2563eb33}.bg-blue-600\\/30{background-color:#2563eb4d}.bg-cyan-500{--tw-bg-opacity: 1;background-color:rgb(6 182 212 / var(--tw-bg-opacity, 1))}.bg-cyan-500\\/10{background-color:#06b6d41a}.bg-cyan-500\\/15{background-color:#06b6d426}.bg-cyan-600\\/25{background-color:#0891b240}.bg-emerald-50{--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1))}.bg-emerald-500{--tw-bg-opacity: 1;background-color:rgb(16 185 129 / var(--tw-bg-opacity, 1))}.bg-emerald-500\\/10{background-color:#10b9811a}.bg-emerald-500\\/15{background-color:#10b98126}.bg-emerald-500\\/20{background-color:#10b98133}.bg-emerald-500\\/25{background-color:#10b98140}.bg-emerald-500\\/80{background-color:#10b981cc}.bg-emerald-600{--tw-bg-opacity: 1;background-color:rgb(5 150 105 / var(--tw-bg-opacity, 1))}.bg-emerald-600\\/20{background-color:#05966933}.bg-emerald-950\\/95{background-color:#022c22f2}.bg-neutral-900{--tw-bg-opacity: 1;background-color:rgb(23 23 23 / var(--tw-bg-opacity, 1))}.bg-pink-500\\/15{background-color:#ec489926}.bg-pink-600\\/20{background-color:#db277733}.bg-purple-500{--tw-bg-opacity: 1;background-color:rgb(168 85 247 / var(--tw-bg-opacity, 1))}.bg-purple-500\\/10{background-color:#a855f71a}.bg-purple-500\\/15{background-color:#a855f726}.bg-purple-600\\/20{background-color:#9333ea33}.bg-rose-500{--tw-bg-opacity: 1;background-color:rgb(244 63 94 / var(--tw-bg-opacity, 1))}.bg-rose-500\\/10{background-color:#f43f5e1a}.bg-rose-500\\/15{background-color:#f43f5e26}.bg-rose-500\\/20{background-color:#f43f5e33}.bg-rose-500\\/80{background-color:#f43f5ecc}.bg-rose-600{--tw-bg-opacity: 1;background-color:rgb(225 29 72 / var(--tw-bg-opacity, 1))}.bg-rose-950\\/60{background-color:#4c051999}.bg-rose-950\\/95{background-color:#4c0519f2}.bg-slate-100{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.bg-slate-100\\/95{background-color:#f1f5f9f2}.bg-slate-700{--tw-bg-opacity: 1;background-color:rgb(51 65 85 / var(--tw-bg-opacity, 1))}.bg-slate-700\\/50{background-color:#33415580}.bg-slate-800{--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))}.bg-slate-800\\/70{background-color:#1e293bb3}.bg-slate-800\\/90{background-color:#1e293be6}.bg-slate-900{--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity, 1))}.bg-slate-900\\/40{background-color:#0f172a66}.bg-slate-900\\/55{background-color:#0f172a8c}.bg-slate-900\\/60{background-color:#0f172a99}.bg-slate-900\\/70{background-color:#0f172ab3}.bg-slate-900\\/80{background-color:#0f172acc}.bg-slate-900\\/90{background-color:#0f172ae6}.bg-slate-900\\/95{background-color:#0f172af2}.bg-slate-950{--tw-bg-opacity: 1;background-color:rgb(2 6 23 / var(--tw-bg-opacity, 1))}.bg-slate-950\\/50{background-color:#02061780}.bg-slate-950\\/80{background-color:#020617cc}.bg-slate-950\\/85{background-color:#020617d9}.bg-slate-950\\/90{background-color:#020617e6}.bg-slate-950\\/95{background-color:#020617f2}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-white\\/95{background-color:#fffffff2}.bg-white\\/\\[0\\.05\\]{background-color:#ffffff0d}.bg-white\\/\\[0\\.12\\]{background-color:#ffffff1f}.bg-\\[radial-gradient\\(circle_at_50\\%_18\\%\\,rgba\\(16\\,220\\,158\\,0\\.16\\)\\,rgba\\(0\\,184\\,255\\,0\\.10\\)_36\\%\\,transparent_70\\%\\)\\]{background-image:radial-gradient(circle at 50% 18%,rgba(16,220,158,.16),rgba(0,184,255,.1) 36%,transparent 70%)}.bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.from-\\[\\#18E092\\]{--tw-gradient-from: #18E092 var(--tw-gradient-from-position);--tw-gradient-to: rgb(24 224 146 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-\\[\\#2FF58E\\]{--tw-gradient-from: #2FF58E var(--tw-gradient-from-position);--tw-gradient-to: rgb(47 245 142 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-amber-500\\/15{--tw-gradient-from: rgb(245 158 11 / .15) var(--tw-gradient-from-position);--tw-gradient-to: rgb(245 158 11 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-500{--tw-gradient-from: #3b82f6 var(--tw-gradient-from-position);--tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-emerald-400\\/25{--tw-gradient-from: rgb(52 211 153 / .25) var(--tw-gradient-from-position);--tw-gradient-to: rgb(52 211 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.via-\\[\\#00B4F5\\]{--tw-gradient-to: rgb(0 180 245 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #00B4F5 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-\\[\\#00C8FF\\]{--tw-gradient-to: rgb(0 200 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #00C8FF var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-cyan-400{--tw-gradient-to: rgb(34 211 238 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #22d3ee var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-cyan-500\\/20{--tw-gradient-to: rgb(6 182 212 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), rgb(6 182 212 / .2) var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-orange-500\\/15{--tw-gradient-to: rgb(249 115 22 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), rgb(249 115 22 / .15) var(--tw-gradient-via-position), var(--tw-gradient-to)}.to-\\[\\#0062D6\\]{--tw-gradient-to: #0062D6 var(--tw-gradient-to-position)}.to-\\[\\#0066E6\\]{--tw-gradient-to: #0066E6 var(--tw-gradient-to-position)}.to-\\[\\#0077FF\\]{--tw-gradient-to: #0077FF var(--tw-gradient-to-position)}.to-cyan-400{--tw-gradient-to: #22d3ee var(--tw-gradient-to-position)}.to-emerald-400{--tw-gradient-to: #34d399 var(--tw-gradient-to-position)}.to-rose-500\\/15{--tw-gradient-to: rgb(244 63 94 / .15) var(--tw-gradient-to-position)}.to-slate-800\\/40{--tw-gradient-to: rgb(30 41 59 / .4) var(--tw-gradient-to-position)}.bg-clip-text{-webkit-background-clip:text;background-clip:text}.fill-amber-400{fill:#fbbf24}.fill-white{fill:#fff}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.p-0{padding:0}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-10{padding:2.5rem}.p-2{padding:.5rem}.p-2\\.5{padding:.625rem}.p-3{padding:.75rem}.p-3\\.5{padding:.875rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.p-8{padding:2rem}.p-\\[1px\\]{padding:1px}.px-1{padding-left:.25rem;padding-right:.25rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-3\\.5{padding-left:.875rem;padding-right:.875rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-3\\.5{padding-top:.875rem;padding-bottom:.875rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.py-7{padding-top:1.75rem;padding-bottom:1.75rem}.pb-0\\.5{padding-bottom:.125rem}.pb-1{padding-bottom:.25rem}.pb-1\\.5{padding-bottom:.375rem}.pb-2\\.5{padding-bottom:.625rem}.pb-3{padding-bottom:.75rem}.pb-4{padding-bottom:1rem}.pb-8{padding-bottom:2rem}.pl-2{padding-left:.5rem}.pl-3{padding-left:.75rem}.pl-5{padding-left:1.25rem}.pr-0\\.5{padding-right:.125rem}.pr-1{padding-right:.25rem}.pr-1\\.5{padding-right:.375rem}.pr-2{padding-right:.5rem}.pr-4{padding-right:1rem}.pr-8{padding-right:2rem}.pt-1\\.5{padding-top:.375rem}.pt-2{padding-top:.5rem}.pt-3{padding-top:.75rem}.pt-3\\.5{padding-top:.875rem}.pt-4{padding-top:1rem}.pt-5{padding-top:1.25rem}.pt-7{padding-top:1.75rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.align-top{vertical-align:top}.font-mono{font-family:JetBrains Mono,SF Mono,Cascadia Code,Consolas,monospace}.font-sans{font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif}.text-2xl{font-size:calc(24px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.35}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.text-\\[14px\\]{font-size:14px}.text-\\[15px\\]{font-size:15px}.text-\\[19px\\]{font-size:19px}.text-\\[7px\\]{font-size:7px}.text-\\[8px\\]{font-size:8px}.text-\\[9px\\]{font-size:9px}.text-base{font-size:calc(16px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.55}.text-sm{font-size:calc(14.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.5}.text-xl{font-size:calc(20px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.4}.text-xs{font-size:calc(13.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.45}.font-black{font-weight:900}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-6{line-height:1.5rem}.leading-\\[1\\.15\\]{line-height:1.15}.leading-\\[1\\.35\\]{line-height:1.35}.leading-none{line-height:1}.leading-relaxed{line-height:1.625}.leading-snug{line-height:1.375}.leading-tight{line-height:1.25}.tracking-\\[-0\\.035em\\]{letter-spacing:-.035em}.tracking-tight{letter-spacing:-.025em}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.text-\\[\\#00C8FF\\]{--tw-text-opacity: 1;color:rgb(0 200 255 / var(--tw-text-opacity, 1))}.text-\\[\\#18E092\\]{--tw-text-opacity: 1;color:rgb(24 224 146 / var(--tw-text-opacity, 1))}.text-\\[\\#2FF58E\\]{--tw-text-opacity: 1;color:rgb(47 245 142 / var(--tw-text-opacity, 1))}.text-\\[\\#f3f3f3\\]{--tw-text-opacity: 1;color:rgb(243 243 243 / var(--tw-text-opacity, 1))}.text-amber-200{--tw-text-opacity: 1;color:rgb(253 230 138 / var(--tw-text-opacity, 1))}.text-amber-300{--tw-text-opacity: 1;color:rgb(252 211 77 / var(--tw-text-opacity, 1))}.text-amber-300\\/80{color:#fcd34dcc}.text-amber-400{--tw-text-opacity: 1;color:rgb(251 191 36 / var(--tw-text-opacity, 1))}.text-blue-300{--tw-text-opacity: 1;color:rgb(147 197 253 / var(--tw-text-opacity, 1))}.text-blue-400{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-blue-700{--tw-text-opacity: 1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.text-cyan-200{--tw-text-opacity: 1;color:rgb(165 243 252 / var(--tw-text-opacity, 1))}.text-cyan-300{--tw-text-opacity: 1;color:rgb(103 232 249 / var(--tw-text-opacity, 1))}.text-cyan-400{--tw-text-opacity: 1;color:rgb(34 211 238 / var(--tw-text-opacity, 1))}.text-emerald-100{--tw-text-opacity: 1;color:rgb(209 250 229 / var(--tw-text-opacity, 1))}.text-emerald-200{--tw-text-opacity: 1;color:rgb(167 243 208 / var(--tw-text-opacity, 1))}.text-emerald-300{--tw-text-opacity: 1;color:rgb(110 231 183 / var(--tw-text-opacity, 1))}.text-emerald-400{--tw-text-opacity: 1;color:rgb(52 211 153 / var(--tw-text-opacity, 1))}.text-emerald-400\\/90{color:#34d399e6}.text-emerald-500{--tw-text-opacity: 1;color:rgb(16 185 129 / var(--tw-text-opacity, 1))}.text-emerald-700{--tw-text-opacity: 1;color:rgb(4 120 87 / var(--tw-text-opacity, 1))}.text-indigo-300{--tw-text-opacity: 1;color:rgb(165 180 252 / var(--tw-text-opacity, 1))}.text-indigo-400{--tw-text-opacity: 1;color:rgb(129 140 248 / var(--tw-text-opacity, 1))}.text-indigo-500{--tw-text-opacity: 1;color:rgb(99 102 241 / var(--tw-text-opacity, 1))}.text-neutral-300{--tw-text-opacity: 1;color:rgb(212 212 212 / var(--tw-text-opacity, 1))}.text-neutral-400{--tw-text-opacity: 1;color:rgb(163 163 163 / var(--tw-text-opacity, 1))}.text-orange-300{--tw-text-opacity: 1;color:rgb(253 186 116 / var(--tw-text-opacity, 1))}.text-pink-200{--tw-text-opacity: 1;color:rgb(251 207 232 / var(--tw-text-opacity, 1))}.text-pink-300{--tw-text-opacity: 1;color:rgb(249 168 212 / var(--tw-text-opacity, 1))}.text-pink-400{--tw-text-opacity: 1;color:rgb(244 114 182 / var(--tw-text-opacity, 1))}.text-purple-200{--tw-text-opacity: 1;color:rgb(233 213 255 / var(--tw-text-opacity, 1))}.text-purple-300{--tw-text-opacity: 1;color:rgb(216 180 254 / var(--tw-text-opacity, 1))}.text-purple-400{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity, 1))}.text-rose-100{--tw-text-opacity: 1;color:rgb(255 228 230 / var(--tw-text-opacity, 1))}.text-rose-200{--tw-text-opacity: 1;color:rgb(254 205 211 / var(--tw-text-opacity, 1))}.text-rose-300{--tw-text-opacity: 1;color:rgb(253 164 175 / var(--tw-text-opacity, 1))}.text-rose-400{--tw-text-opacity: 1;color:rgb(251 113 133 / var(--tw-text-opacity, 1))}.text-rose-500{--tw-text-opacity: 1;color:rgb(244 63 94 / var(--tw-text-opacity, 1))}.text-sky-300{--tw-text-opacity: 1;color:rgb(125 211 252 / var(--tw-text-opacity, 1))}.text-sky-400{--tw-text-opacity: 1;color:rgb(56 189 248 / var(--tw-text-opacity, 1))}.text-slate-100{--tw-text-opacity: 1;color:rgb(241 245 249 / var(--tw-text-opacity, 1))}.text-slate-200{--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}.text-slate-300{--tw-text-opacity: 1;color:rgb(203 213 225 / var(--tw-text-opacity, 1))}.text-slate-300\\/90{color:#cbd5e1e6}.text-slate-400{--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity, 1))}.text-slate-500{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity, 1))}.text-slate-600{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity, 1))}.text-slate-700{--tw-text-opacity: 1;color:rgb(51 65 85 / var(--tw-text-opacity, 1))}.text-slate-800{--tw-text-opacity: 1;color:rgb(30 41 59 / var(--tw-text-opacity, 1))}.text-slate-900{--tw-text-opacity: 1;color:rgb(15 23 42 / var(--tw-text-opacity, 1))}.text-transparent{color:transparent}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-300{--tw-text-opacity: 1;color:rgb(253 224 71 / var(--tw-text-opacity, 1))}.underline{text-decoration-line:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.caret-\\[\\#2FF58E\\]{caret-color:#2ff58e}.accent-blue-500{accent-color:#3b82f6}.accent-emerald-500{accent-color:#10b981}.accent-pink-500{accent-color:#ec4899}.accent-rose-500{accent-color:#f43f5e}.opacity-20{opacity:.2}.opacity-25{opacity:.25}.opacity-30{opacity:.3}.opacity-60{opacity:.6}.opacity-65{opacity:.65}.opacity-70{opacity:.7}.opacity-75{opacity:.75}.opacity-80{opacity:.8}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-2xl{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-\\[0_4px_18px_rgba\\(2\\,132\\,199\\,0\\.45\\)\\]{--tw-shadow: 0 4px 18px rgba(2,132,199,.45);--tw-shadow-colored: 0 4px 18px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-inner{--tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / .05);--tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-blue-600\\/25{--tw-shadow-color: rgb(37 99 235 / .25);--tw-shadow: var(--tw-shadow-colored)}.shadow-cyan-500\\/25{--tw-shadow-color: rgb(6 182 212 / .25);--tw-shadow: var(--tw-shadow-colored)}.shadow-emerald-600\\/20{--tw-shadow-color: rgb(5 150 105 / .2);--tw-shadow: var(--tw-shadow-colored)}.outline-dashed{outline-style:dashed}.outline-1{outline-width:1px}.outline-amber-400\\/50{outline-color:#fbbf2480}.ring-1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-2{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-inset{--tw-ring-inset: inset}.ring-emerald-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(52 211 153 / var(--tw-ring-opacity, 1))}.ring-white\\/40{--tw-ring-color: rgb(255 255 255 / .4)}.drop-shadow{--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / .1)) drop-shadow(0 1px 1px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-sm{--tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / .05));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.saturate-\\[0\\.3\\]{--tw-saturate: saturate(.3);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur{--tw-backdrop-blur: blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-\\[1px\\]{--tw-backdrop-blur: blur(1px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-\\[2px\\]{--tw-backdrop-blur: blur(2px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-md{--tw-backdrop-blur: blur(12px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-sm{--tw-backdrop-blur: blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-xl{--tw-backdrop-blur: blur(24px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-150{transition-duration:.15s}.duration-300{transition-duration:.3s}.duration-75{transition-duration:75ms}.\\[overflow-wrap\\:anywhere\\]{overflow-wrap:anywhere}:root{--fm-font-scale: var(--uxu-font-scale, 1);--fm-primary: var(--uxu-primary, #2563eb);--fm-primary-hover: var(--uxu-primary-hover, #3b82f6);--fm-primary-soft: color-mix(in srgb, var(--fm-primary) 16%, transparent);--fm-primary-border: color-mix(in srgb, var(--fm-primary) 42%, transparent);--fm-radius-xs: calc(var(--uxu-radius-sm, 8px) * .65);--fm-radius-sm: var(--uxu-radius-sm, 8px);--fm-radius-md: var(--uxu-radius-md, 12px);--fm-radius-lg: var(--uxu-radius-lg, 16px);--fm-radius-xl: var(--uxu-radius-xl, 20px)}.material-symbols-outlined{font-family:Material Symbols Outlined;font-weight:400;font-style:normal;font-size:18px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;-webkit-user-select:none;-moz-user-select:none;user-select:none}.ms-filled{font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.filemangl-root{font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;font-size:calc(13.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.45}.text-\\[7px\\],.text-\\[8px\\],.text-\\[9px\\],.text-\\[10px\\]{font-size:calc(12px * var(--fm-font-scale, var(--uxu-font-scale, 1)))!important;line-height:1.4!important}.text-\\[11px\\]{font-size:calc(13px * var(--fm-font-scale, var(--uxu-font-scale, 1)))!important;line-height:1.45!important}.text-\\[12px\\],.text-xs{font-size:calc(13.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)))!important;line-height:1.45!important}.text-\\[13px\\],.text-\\[13\\.5px\\],.text-\\[14px\\],.text-sm{font-size:calc(14.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)))!important;line-height:1.5!important}.text-\\[15px\\],.text-base{font-size:calc(16px * var(--fm-font-scale, var(--uxu-font-scale, 1)))!important;line-height:1.55!important}.filemangl-root.rounded-2xl{border-radius:var(--fm-radius-xl, var(--uxu-radius-xl, 20px))!important}.filemangl-root.rounded-none{border-radius:0!important}.filemangl-root .rounded-2xl{border-radius:var(--fm-radius-xl, var(--uxu-radius-xl, 20px))!important}.filemangl-root .rounded-xl{border-radius:var(--fm-radius-lg, var(--uxu-radius-lg, 14px))!important}.filemangl-root .rounded-lg{border-radius:var(--fm-radius-md, var(--uxu-radius-md, 10px))!important}.filemangl-root .rounded-t-lg{border-top-left-radius:var(--fm-radius-md, var(--uxu-radius-md, 10px))!important;border-top-right-radius:var(--fm-radius-md, var(--uxu-radius-md, 10px))!important}.filemangl-root .rounded-md,.filemangl-root .rounded-\\[6px\\]{border-radius:var(--fm-radius-sm, var(--uxu-radius-sm, 7px))!important}.filemangl-root .rounded{border-radius:var(--fm-radius-xs, 5px)!important}.filemangl-root .bg-blue-600,.filemangl-root .bg-blue-500,.filemangl-root .bg-\\[\\#0078d4\\]{background-color:var(--fm-primary, var(--uxu-primary, #2563eb))!important}.filemangl-root .hover\\:bg-blue-500:hover,.filemangl-root .hover\\:bg-blue-600:hover{background-color:var(--fm-primary-hover, var(--uxu-primary-hover, #3b82f6))!important}.filemangl-root .bg-blue-600\\/20,.filemangl-root .bg-blue-500\\/20,.filemangl-root .bg-blue-500\\/15,.filemangl-root .bg-blue-500\\/10,.filemangl-root .bg-\\[\\#cce8ff\\]\\/75,.theme-light.filemangl-root .bg-blue-600\\/20,.theme-light.filemangl-root .bg-blue-500\\/20,.theme-light.filemangl-root .bg-blue-500\\/15,.theme-light.filemangl-root .bg-\\[\\#cce8ff\\]\\/75{background-color:var( --fm-primary-soft, color-mix(in srgb, var(--fm-primary, var(--uxu-primary, #2563eb)) 16%, transparent) )!important}.filemangl-root .text-blue-400,.filemangl-root .text-blue-300,.filemangl-root .text-blue-200,.filemangl-root .text-\\[\\#0078d4\\],.theme-light.filemangl-root .text-blue-400,.theme-light.filemangl-root .text-blue-300,.theme-light.filemangl-root .text-blue-200{color:var(--fm-primary, var(--uxu-primary, #2563eb))!important}.filemangl-root .border-blue-500,.filemangl-root .border-blue-500\\/50,.filemangl-root .border-blue-500\\/40,.filemangl-root .border-blue-500\\/30,.filemangl-root .border-\\[\\#0078d4\\],.theme-light.filemangl-root .border-blue-500\\/40,.theme-light.filemangl-root .border-blue-500\\/30{border-color:var( --fm-primary-border, color-mix(in srgb, var(--fm-primary, var(--uxu-primary, #2563eb)) 45%, transparent) )!important}.filemangl-root[data-inherit-theme=true]{background-color:var(--uxu-bg-elevated, #0b101b);border-color:var(--uxu-border-subtle, rgba(30, 41, 59, .9))}.theme-light.filemangl-root[data-inherit-theme=true]{background-color:var(--uxu-bg-elevated, #f8fafc)!important;border-color:var(--uxu-border-subtle, #cbd5e1)!important}.theme-light{background-color:#f8fafc!important;color:#0f172a!important}.theme-light .bg-\\[\\#070b12\\],.theme-light .bg-\\[\\#05080e\\]{background-color:#f8fafc!important}.theme-light .bg-\\[\\#070b12\\]\\/85,.theme-light .bg-\\[\\#070b12\\]\\/80{background-color:#fffffff0!important}.theme-light .bg-\\[\\#0D111A\\],.theme-light .bg-white\\/\\[0\\.05\\],.theme-light .bg-white\\/\\[0\\.12\\]{background-color:#f1f5f9!important}.theme-light .border-white\\/\\[0\\.08\\],.theme-light .border-white\\/10,.theme-light .border-white\\/20,.theme-light .border-white\\/25{border-color:#cbd5e1!important}.theme-light .bg-\\[\\#0b101b\\],.theme-light .bg-\\[\\#090d16\\],.theme-light .bg-\\[\\#0c121e\\],.theme-light .bg-\\[\\#080d18\\],.theme-light .bg-\\[\\#0e1420\\],.theme-light .bg-\\[\\#0e1525\\],.theme-light .bg-\\[\\#101726\\]{background-color:#fff!important}.theme-light .bg-\\[\\#080c14\\]{background-color:#e2e8f0!important}.theme-light .bg-\\[\\#080c15\\],.theme-light .bg-\\[\\#080d16\\],.theme-light .bg-\\[\\#090e1a\\],.theme-light .bg-\\[\\#0d131f\\],.theme-light .bg-\\[\\#0d1320\\],.theme-light .bg-\\[\\#0f1623\\],.theme-light .bg-\\[\\#0c111d\\],.theme-light .bg-\\[\\#0c1220\\],.theme-light .bg-\\[\\#191919\\],.theme-light .bg-\\[\\#1f1f1f\\]{background-color:#f8fafc!important}.theme-light .bg-\\[\\#111827\\],.theme-light .bg-\\[\\#111827\\]\\/95{background-color:#fffffffa!important}.theme-light .bg-slate-950,.theme-light .bg-slate-950\\/95,.theme-light .bg-slate-950\\/90,.theme-light .bg-slate-950\\/85,.theme-light .bg-slate-950\\/80,.theme-light .bg-slate-950\\/50,.theme-light .bg-slate-900,.theme-light .bg-slate-900\\/95,.theme-light .bg-slate-900\\/90,.theme-light .bg-slate-900\\/80,.theme-light .bg-slate-900\\/70,.theme-light .bg-slate-900\\/60,.theme-light .bg-slate-900\\/55,.theme-light .bg-slate-900\\/50{background-color:#fff!important}.theme-light .bg-slate-900\\/40,.theme-light .bg-slate-800,.theme-light .bg-slate-800\\/90,.theme-light .bg-slate-800\\/80,.theme-light .bg-slate-800\\/70,.theme-light .bg-slate-800\\/60,.theme-light .bg-slate-700,.theme-light .bg-slate-700\\/80,.theme-light .bg-slate-700\\/50,.theme-light .bg-neutral-900{background-color:#f1f5f9!important}.theme-light .hover\\:bg-slate-900\\/90:hover,.theme-light .hover\\:bg-slate-900\\/80:hover,.theme-light .hover\\:bg-slate-900\\/60:hover,.theme-light .hover\\:bg-slate-900\\/40:hover,.theme-light .hover\\:bg-slate-800:hover,.theme-light .hover\\:bg-slate-800\\/80:hover,.theme-light .hover\\:bg-slate-800\\/70:hover,.theme-light .hover\\:bg-slate-800\\/60:hover,.theme-light .hover\\:bg-slate-700:hover,.theme-light .hover\\:bg-slate-700\\/80:hover,.theme-light .hover\\:bg-white\\/\\[0\\.05\\]:hover,.theme-light .hover\\:bg-white\\/\\[0\\.06\\]:hover{background-color:#e2e8f0!important}.theme-light .border-slate-800,.theme-light .border-slate-800\\/90,.theme-light .border-slate-800\\/80,.theme-light .border-slate-800\\/70,.theme-light .border-slate-800\\/60,.theme-light .border-slate-700,.theme-light .border-slate-700\\/90,.theme-light .border-slate-700\\/80,.theme-light .border-slate-700\\/70,.theme-light .border-neutral-700{border-color:#cbd5e1!important}.theme-light .divide-slate-800\\/70>:not([hidden])~:not([hidden]),.theme-light .divide-slate-800\\/60>:not([hidden])~:not([hidden]),.theme-light .divide-slate-800\\/50>:not([hidden])~:not([hidden]){border-color:#e2e8f0!important}.theme-light .text-white,.theme-light .text-\\[\\#f3f3f3\\],.theme-light .text-slate-100,.theme-light .text-slate-200,.theme-light .text-neutral-300,.theme-light .hover\\:text-white:hover,.theme-light .hover\\:text-slate-200:hover{color:#0f172a!important}.theme-light .text-slate-300,.theme-light .text-slate-300\\/90{color:#334155!important}.theme-light .text-slate-400,.theme-light .text-slate-500,.theme-light .text-neutral-400{color:#475569!important}.theme-light .text-blue-200,.theme-light .text-blue-300,.theme-light .text-blue-400,.theme-light .text-sky-400{color:var(--fm-primary, var(--uxu-primary, #1d4ed8))!important}.theme-light .text-indigo-200,.theme-light .text-indigo-300,.theme-light .text-indigo-400{color:#4338ca!important}.theme-light .text-\\[\\#2FF58E\\],.theme-light .text-\\[\\#18E092\\],.theme-light .text-emerald-100,.theme-light .text-emerald-200,.theme-light .text-emerald-300,.theme-light .text-emerald-400,.theme-light .text-emerald-400\\/90{color:#047857!important}.theme-light .text-amber-200,.theme-light .text-amber-300,.theme-light .text-amber-400{color:#b45309!important}.theme-light .text-rose-100,.theme-light .text-rose-200,.theme-light .text-rose-300,.theme-light .text-rose-400,.theme-light .hover\\:text-rose-300:hover,.theme-light .hover\\:text-rose-400:hover{color:#be123c!important}.theme-light .text-pink-200,.theme-light .text-pink-300,.theme-light .text-pink-400{color:#be185d!important}.theme-light .text-purple-200,.theme-light .text-purple-300,.theme-light .text-purple-400{color:#6d28d9!important}.theme-light .text-\\[\\#00C8FF\\],.theme-light .text-\\[\\#38BDF8\\],.theme-light .text-cyan-200,.theme-light .text-cyan-300,.theme-light .text-cyan-400,.theme-light .hover\\:text-\\[\\#38BDF8\\]:hover,.theme-light .hover\\:text-cyan-400:hover,.theme-light .group:hover .group-hover\\:text-cyan-300{color:#0369a1!important}.theme-light .bg-blue-600\\/30,.theme-light .bg-blue-600\\/25,.theme-light .bg-blue-600\\/20,.theme-light .bg-blue-500\\/60,.theme-light .bg-blue-500\\/30,.theme-light .bg-blue-500\\/20,.theme-light .bg-blue-500\\/15,.theme-light .bg-blue-500\\/10,.theme-light .hover\\:bg-blue-600\\/30:hover,.theme-light .hover\\:bg-blue-600\\/25:hover,.theme-light .hover\\:bg-blue-600\\/20:hover{background-color:var( --fm-primary-soft, color-mix(in srgb, var(--fm-primary, var(--uxu-primary, #2563eb)) 14%, #ffffff) )!important;border-color:var( --fm-primary-border, color-mix(in srgb, var(--fm-primary, var(--uxu-primary, #2563eb)) 42%, #ffffff) )!important}.theme-light .bg-indigo-600\\/25,.theme-light .bg-indigo-600\\/20,.theme-light .bg-indigo-500\\/15,.theme-light .hover\\:bg-indigo-600\\/25:hover{background-color:#eef2ff!important;border-color:#a5b4fc!important}.theme-light .bg-emerald-950\\/95,.theme-light .bg-emerald-600\\/30,.theme-light .bg-emerald-600\\/25,.theme-light .bg-emerald-600\\/20,.theme-light .bg-emerald-500\\/25,.theme-light .bg-emerald-500\\/20,.theme-light .bg-emerald-500\\/15,.theme-light .bg-emerald-500\\/10,.theme-light .hover\\:bg-emerald-600\\/30:hover,.theme-light .hover\\:bg-emerald-600\\/25:hover,.theme-light .hover\\:bg-emerald-600\\/20:hover,.theme-light .hover\\:bg-emerald-500\\/25:hover{background-color:#ecfdf5!important;border-color:#6ee7b7!important}.theme-light .bg-cyan-600\\/35,.theme-light .bg-cyan-600\\/25,.theme-light .bg-cyan-600\\/20,.theme-light .bg-cyan-500\\/30,.theme-light .bg-cyan-500\\/20,.theme-light .bg-cyan-500\\/15,.theme-light .bg-cyan-500\\/10,.theme-light .hover\\:bg-cyan-600\\/35:hover,.theme-light .hover\\:bg-cyan-600\\/20:hover{background-color:#ecfeff!important;border-color:#67e8f9!important}.theme-light .bg-rose-950\\/95,.theme-light .bg-rose-950\\/60,.theme-light .bg-rose-500\\/30,.theme-light .bg-rose-500\\/25,.theme-light .bg-rose-500\\/20,.theme-light .bg-rose-500\\/15,.theme-light .bg-rose-500\\/10,.theme-light .hover\\:bg-rose-500\\/30:hover,.theme-light .hover\\:bg-rose-500\\/25:hover,.theme-light .hover\\:bg-rose-500\\/20:hover{background-color:#fff1f2!important;border-color:#fda4af!important}.theme-light .bg-pink-600\\/30,.theme-light .bg-pink-600\\/25,.theme-light .bg-pink-600\\/20,.theme-light .bg-pink-500\\/15,.theme-light .hover\\:bg-pink-600\\/30:hover,.theme-light .hover\\:bg-pink-600\\/25:hover{background-color:#fdf2f8!important;border-color:#f9a8d4!important}.theme-light .bg-amber-500\\/20,.theme-light .bg-amber-500\\/15,.theme-light .bg-amber-500\\/10{background-color:#fffbeb!important;border-color:#fcd34d!important}.theme-light .bg-purple-600\\/30,.theme-light .bg-purple-600\\/20,.theme-light .bg-purple-500\\/15,.theme-light .bg-purple-500\\/10,.theme-light .hover\\:bg-purple-600\\/30:hover{background-color:#f5f3ff!important;border-color:#c4b5fd!important}p code,li code{padding:.1rem .35rem;border-radius:.375rem;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.92em;background-color:#0f172aa6;border:1px solid rgba(51,65,85,.65);color:#67e8f9}.theme-light p code,.theme-light li code{background-color:#f1f5f9!important;border-color:#cbd5e1!important;color:#0369a1!important}.theme-light .bg-blue-600,.theme-light .bg-blue-600 *,.theme-light .bg-blue-500,.theme-light .bg-blue-500 *,.theme-light .bg-\\[\\#0078d4\\],.theme-light .bg-\\[\\#0078d4\\] *,.theme-light .bg-emerald-600,.theme-light .bg-emerald-600 *,.theme-light .bg-rose-600,.theme-light .bg-rose-600 *,.theme-light .from-blue-600,.theme-light .from-blue-600 *,.theme-light .from-emerald-600,.theme-light .from-emerald-600 *,.theme-light .from-\\[\\#18E092\\],.theme-light .from-\\[\\#18E092\\] *{color:#fff!important}.theme-light option{background-color:#fff!important;color:#0f172a!important}.theme-light .bg-\\[\\#070a12\\],.theme-light .bg-\\[\\#070a10\\],.theme-light .bg-\\[\\#060911\\],.theme-light .code-surface-dark{background-color:#060911!important;border-color:#1e293b!important;color:#e2e8f0!important}.theme-light .code-surface-dark .bg-\\[\\#0c1220\\]{background-color:#0c1220!important;border-color:#1e293b!important}.theme-light .code-surface-dark .bg-\\[\\#090e1a\\]{background-color:#090e1a!important;border-color:#1e293b!important}.theme-light .code-surface-dark .bg-\\[\\#080c15\\]{background-color:#080c15!important;border-color:#1e293b!important}.theme-light .code-surface-dark .bg-slate-800,.theme-light .code-surface-dark .bg-slate-800\\/90{background-color:#1e293b!important;border-color:#334155!important}.theme-light .code-surface-dark .hover\\:bg-slate-700:hover{background-color:#334155!important}.theme-light .code-surface-dark .hover\\:bg-slate-900\\/60:hover{background-color:#0f172abf!important}.theme-light .code-surface-dark .border-slate-800\\/90,.theme-light .code-surface-dark .border-slate-800\\/80,.theme-light .code-surface-dark .border-slate-800\\/70,.theme-light .code-surface-dark .border-slate-700{border-color:#1e293b!important}.theme-light .code-surface-dark .bg-blue-500\\/15{background-color:#3b82f62e!important;border-color:#3b82f666!important}.theme-light .code-surface-dark .bg-emerald-500\\/15{background-color:#10b9812e!important;border-color:#10b98166!important}.theme-light .code-surface-dark .bg-amber-500\\/15{background-color:#f59e0b2e!important;border-color:#f59e0b66!important}.theme-light .code-surface-dark .bg-purple-500\\/15{background-color:#a855f72e!important;border-color:#a855f766!important}.theme-light .code-surface-dark .bg-cyan-500\\/15{background-color:#06b6d42e!important;border-color:#06b6d466!important}.theme-light .code-surface-dark .text-white,.theme-light .code-surface-dark .text-slate-100,.theme-light .code-surface-dark .hover\\:text-white:hover{color:#f8fafc!important}.theme-light .code-surface-dark .text-slate-200{color:#e2e8f0!important}.theme-light .code-surface-dark .text-slate-300{color:#cbd5e1!important}.theme-light .code-surface-dark .text-slate-400{color:#94a3b8!important}.theme-light .code-surface-dark .text-slate-500,.theme-light .code-surface-dark .text-slate-600{color:#64748b!important}.theme-light .code-surface-dark .text-purple-300,.theme-light .code-surface-dark .text-purple-400{color:#d8b4fe!important}.theme-light .code-surface-dark .text-cyan-300,.theme-light .code-surface-dark .text-cyan-400{color:#67e8f9!important}.theme-light .code-surface-dark .text-emerald-300,.theme-light .code-surface-dark .text-emerald-400{color:#6ee7b7!important}.theme-light .code-surface-dark .text-amber-300,.theme-light .code-surface-dark .text-amber-400{color:#fcd34d!important}.theme-light .code-surface-dark .text-blue-300,.theme-light .code-surface-dark .text-blue-400{color:#93c5fd!important}.theme-light .code-surface-dark .text-rose-300,.theme-light .code-surface-dark .text-rose-400{color:#fda4af!important}.theme-light .bg-\\[\\#070a12\\] pre,.theme-light .bg-\\[\\#070a10\\] pre,.theme-light .bg-\\[\\#060911\\] pre{color:#e2e8f0!important}.theme-light textarea.text-transparent{color:transparent!important}.selection\\:bg-blue-500\\/30 *::-moz-selection{background-color:#3b82f64d}.selection\\:bg-blue-500\\/30 *::selection{background-color:#3b82f64d}.selection\\:bg-cyan-500\\/30 *::-moz-selection{background-color:#06b6d44d}.selection\\:bg-cyan-500\\/30 *::selection{background-color:#06b6d44d}.selection\\:text-blue-200 *::-moz-selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.selection\\:text-blue-200 *::selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.selection\\:bg-blue-500\\/30::-moz-selection{background-color:#3b82f64d}.selection\\:bg-blue-500\\/30::selection{background-color:#3b82f64d}.selection\\:bg-cyan-500\\/30::-moz-selection{background-color:#06b6d44d}.selection\\:bg-cyan-500\\/30::selection{background-color:#06b6d44d}.selection\\:text-blue-200::-moz-selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.selection\\:text-blue-200::selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.hover\\:w-1\\.5:hover{width:.375rem}.hover\\:-translate-y-\\[1px\\]:hover{--tw-translate-y: -1px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:border-\\[\\#38BDF8\\]:hover{--tw-border-opacity: 1;border-color:rgb(56 189 248 / var(--tw-border-opacity, 1))}.hover\\:border-blue-500\\/50:hover{border-color:#3b82f680}.hover\\:border-cyan-400\\/50:hover{border-color:#22d3ee80}.hover\\:border-cyan-500\\/40:hover{border-color:#06b6d466}.hover\\:border-emerald-400\\/50:hover{border-color:#34d39980}.hover\\:border-emerald-500\\/50:hover{border-color:#10b98180}.hover\\:border-orange-400:hover{--tw-border-opacity: 1;border-color:rgb(251 146 60 / var(--tw-border-opacity, 1))}.hover\\:border-purple-500\\/50:hover{border-color:#a855f780}.hover\\:bg-amber-500\\/30:hover{background-color:#f59e0b4d}.hover\\:bg-blue-500:hover{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-500\\/20:hover{background-color:#3b82f633}.hover\\:bg-blue-500\\/25:hover{background-color:#3b82f640}.hover\\:bg-blue-500\\/60:hover{background-color:#3b82f699}.hover\\:bg-blue-600\\/20:hover{background-color:#2563eb33}.hover\\:bg-blue-600\\/25:hover{background-color:#2563eb40}.hover\\:bg-blue-600\\/30:hover{background-color:#2563eb4d}.hover\\:bg-cyan-500\\/25:hover{background-color:#06b6d440}.hover\\:bg-cyan-600\\/20:hover{background-color:#0891b233}.hover\\:bg-cyan-600\\/35:hover{background-color:#0891b259}.hover\\:bg-emerald-500:hover{--tw-bg-opacity: 1;background-color:rgb(16 185 129 / var(--tw-bg-opacity, 1))}.hover\\:bg-emerald-500\\/20:hover{background-color:#10b98133}.hover\\:bg-emerald-500\\/25:hover{background-color:#10b98140}.hover\\:bg-emerald-600\\/20:hover{background-color:#05966933}.hover\\:bg-emerald-600\\/25:hover{background-color:#05966940}.hover\\:bg-emerald-600\\/30:hover{background-color:#0596694d}.hover\\:bg-indigo-600\\/25:hover{background-color:#4f46e540}.hover\\:bg-pink-600\\/25:hover{background-color:#db277740}.hover\\:bg-pink-600\\/30:hover{background-color:#db27774d}.hover\\:bg-purple-500\\/25:hover{background-color:#a855f740}.hover\\:bg-purple-600\\/30:hover{background-color:#9333ea4d}.hover\\:bg-rose-500\\/20:hover{background-color:#f43f5e33}.hover\\:bg-rose-500\\/25:hover{background-color:#f43f5e40}.hover\\:bg-rose-500\\/30:hover{background-color:#f43f5e4d}.hover\\:bg-slate-100:hover{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-200\\/60:hover{background-color:#e2e8f099}.hover\\:bg-slate-700:hover{--tw-bg-opacity: 1;background-color:rgb(51 65 85 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-700\\/80:hover{background-color:#334155cc}.hover\\:bg-slate-800:hover{--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-800\\/60:hover{background-color:#1e293b99}.hover\\:bg-slate-800\\/70:hover{background-color:#1e293bb3}.hover\\:bg-slate-800\\/80:hover{background-color:#1e293bcc}.hover\\:bg-slate-900\\/40:hover{background-color:#0f172a66}.hover\\:bg-slate-900\\/50:hover{background-color:#0f172a80}.hover\\:bg-slate-900\\/60:hover{background-color:#0f172a99}.hover\\:bg-slate-900\\/70:hover{background-color:#0f172ab3}.hover\\:bg-slate-900\\/80:hover{background-color:#0f172acc}.hover\\:bg-slate-900\\/90:hover{background-color:#0f172ae6}.hover\\:bg-white\\/\\[0\\.05\\]:hover{background-color:#ffffff0d}.hover\\:bg-white\\/\\[0\\.06\\]:hover{background-color:#ffffff0f}.hover\\:text-\\[\\#38BDF8\\]:hover{--tw-text-opacity: 1;color:rgb(56 189 248 / var(--tw-text-opacity, 1))}.hover\\:text-cyan-400:hover{--tw-text-opacity: 1;color:rgb(34 211 238 / var(--tw-text-opacity, 1))}.hover\\:text-emerald-300:hover{--tw-text-opacity: 1;color:rgb(110 231 183 / var(--tw-text-opacity, 1))}.hover\\:text-rose-300:hover{--tw-text-opacity: 1;color:rgb(253 164 175 / var(--tw-text-opacity, 1))}.hover\\:text-rose-400:hover{--tw-text-opacity: 1;color:rgb(251 113 133 / var(--tw-text-opacity, 1))}.hover\\:text-sky-300:hover{--tw-text-opacity: 1;color:rgb(125 211 252 / var(--tw-text-opacity, 1))}.hover\\:text-slate-100:hover{--tw-text-opacity: 1;color:rgb(241 245 249 / var(--tw-text-opacity, 1))}.hover\\:text-slate-200:hover{--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}.hover\\:text-slate-900:hover{--tw-text-opacity: 1;color:rgb(15 23 42 / var(--tw-text-opacity, 1))}.hover\\:text-slate-950:hover{--tw-text-opacity: 1;color:rgb(2 6 23 / var(--tw-text-opacity, 1))}.hover\\:text-white:hover{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.hover\\:opacity-100:hover{opacity:1}.hover\\:brightness-110:hover{--tw-brightness: brightness(1.1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.disabled\\:opacity-30:disabled{opacity:.3}.disabled\\:opacity-35:disabled{opacity:.35}.disabled\\:opacity-40:disabled{opacity:.4}.group:hover .group-hover\\:scale-\\[1\\.03\\]{--tw-scale-x: 1.03;--tw-scale-y: 1.03;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:bg-blue-400{--tw-bg-opacity: 1;background-color:rgb(96 165 250 / var(--tw-bg-opacity, 1))}.group:hover .group-hover\\:text-cyan-300{--tw-text-opacity: 1;color:rgb(103 232 249 / var(--tw-text-opacity, 1))}@media(min-width:640px){.sm\\:bottom-6{bottom:1.5rem}.sm\\:left-0{left:0}.sm\\:left-auto{left:auto}.sm\\:right-6{right:1.5rem}.sm\\:col-span-1{grid-column:span 1 / span 1}.sm\\:mb-7{margin-bottom:1.75rem}.sm\\:ml-auto{margin-left:auto}.sm\\:mt-0{margin-top:0}.sm\\:mt-10{margin-top:2.5rem}.sm\\:mt-4{margin-top:1rem}.sm\\:mt-7{margin-top:1.75rem}.sm\\:mt-8{margin-top:2rem}.sm\\:block{display:block}.sm\\:inline-block{display:inline-block}.sm\\:inline{display:inline}.sm\\:flex{display:flex}.sm\\:inline-flex{display:inline-flex}.sm\\:h-\\[38px\\]{height:38px}.sm\\:h-\\[780px\\]{height:780px}.sm\\:w-52{width:13rem}.sm\\:w-72{width:18rem}.sm\\:w-\\[38px\\]{width:38px}.sm\\:w-\\[390px\\]{width:390px}.sm\\:w-auto{width:auto}.sm\\:min-w-\\[140px\\]{min-width:140px}.sm\\:max-w-\\[180px\\]{max-width:180px}.sm\\:max-w-\\[220px\\]{max-width:220px}.sm\\:max-w-md{max-width:28rem}.sm\\:max-w-none{max-width:none}.sm\\:scale-90{--tw-scale-x: .9;--tw-scale-y: .9;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}.sm\\:flex-col{flex-direction:column}.sm\\:flex-wrap{flex-wrap:wrap}.sm\\:flex-nowrap{flex-wrap:nowrap}.sm\\:items-center{align-items:center}.sm\\:justify-end{justify-content:flex-end}.sm\\:justify-center{justify-content:center}.sm\\:gap-1{gap:.25rem}.sm\\:gap-1\\.5{gap:.375rem}.sm\\:gap-2{gap:.5rem}.sm\\:gap-3{gap:.75rem}.sm\\:gap-\\[10px\\]{gap:10px}.sm\\:gap-\\[28px\\]{gap:28px}.sm\\:p-3\\.5{padding:.875rem}.sm\\:p-4{padding:1rem}.sm\\:p-6{padding:1.5rem}.sm\\:px-2{padding-left:.5rem;padding-right:.5rem}.sm\\:px-2\\.5{padding-left:.625rem;padding-right:.625rem}.sm\\:px-3{padding-left:.75rem;padding-right:.75rem}.sm\\:px-3\\.5{padding-left:.875rem;padding-right:.875rem}.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:px-5{padding-left:1.25rem;padding-right:1.25rem}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.sm\\:py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.sm\\:py-5{padding-top:1.25rem;padding-bottom:1.25rem}.sm\\:py-8{padding-top:2rem;padding-bottom:2rem}.sm\\:pb-12{padding-bottom:3rem}.sm\\:pl-3{padding-left:.75rem}.sm\\:pr-2{padding-right:.5rem}.sm\\:pt-12{padding-top:3rem}.sm\\:text-left{text-align:left}.sm\\:text-center{text-align:center}.sm\\:text-right{text-align:right}.sm\\:text-2xl{font-size:calc(24px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.35}.sm\\:text-5xl{font-size:3rem;line-height:1}.sm\\:text-\\[22px\\]{font-size:22px}.sm\\:text-base{font-size:calc(16px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.55}.sm\\:text-lg{font-size:calc(18px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.5}.sm\\:text-sm{font-size:calc(14.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.5}.sm\\:text-xs{font-size:calc(13.5px * var(--fm-font-scale, var(--uxu-font-scale, 1)));line-height:1.45}.sm\\:leading-\\[1\\.1\\]{line-height:1.1}}@media(min-width:768px){.md\\:static{position:static}.md\\:block{display:block}.md\\:inline{display:inline}.md\\:flex{display:flex}.md\\:inline-flex{display:inline-flex}.md\\:hidden{display:none}.md\\:h-full{height:100%}.md\\:w-1\\/2{width:50%}.md\\:w-64{width:16rem}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:border-l{border-left-width:1px}.md\\:border-t-0{border-top-width:0px}}@media(min-width:1024px){.lg\\:static{position:static}.lg\\:order-2{order:2}.lg\\:order-3{order:3}.lg\\:col-span-2{grid-column:span 2 / span 2}.lg\\:block{display:block}.lg\\:inline{display:inline}.lg\\:flex{display:flex}.lg\\:inline-flex{display:inline-flex}.lg\\:hidden{display:none}.lg\\:h-11{height:2.75rem}.lg\\:h-\\[68px\\]{height:68px}.lg\\:w-auto{width:auto}.lg\\:shrink-0{flex-shrink:0}.lg\\:scale-100{--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:flex-row{flex-direction:row}.lg\\:flex-nowrap{flex-wrap:nowrap}.lg\\:justify-start{justify-content:flex-start}.lg\\:gap-2{gap:.5rem}.lg\\:gap-4{gap:1rem}.lg\\:border-b-0{border-bottom-width:0px}.lg\\:border-t-0{border-top-width:0px}.lg\\:p-8{padding:2rem}.lg\\:px-\\[20px\\]{padding-left:20px;padding-right:20px}.lg\\:py-0{padding-top:0;padding-bottom:0}.lg\\:py-\\[10px\\]{padding-top:10px;padding-bottom:10px}.lg\\:pt-0{padding-top:0}.lg\\:text-6xl{font-size:3.75rem;line-height:1}.lg\\:text-\\[13\\.5px\\]{font-size:13.5px}.lg\\:text-\\[14px\\]{font-size:14px}}@media(min-width:1280px){.xl\\:inline{display:inline}.xl\\:flex{display:flex}}\n";document.head.appendChild(s);}}catch(e){}})();
