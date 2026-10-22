var qr = Object.defineProperty;
var Zr = (a, l, s) => l in a ? qr(a, l, { enumerable: !0, configurable: !0, writable: !0, value: s }) : a[l] = s;
var Fe = (a, l, s) => Zr(a, typeof l != "symbol" ? l + "" : l, s);
import { jsxs as t, jsx as e, Fragment as Je } from "react/jsx-runtime";
import Ma, { forwardRef as br, createElement as za, useMemo as We, useContext as Qr, createContext as Jr, useRef as je, useState as P, useEffect as Ke, useCallback as Be, useId as el } from "react";
const ht = [
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
], ea = {
  volumeName: "FILEMANGL_NVME_VOL01 (D:)",
  mountPath: "/mnt/nvme0n1/workspace",
  locale: "tr",
  theme: "dark",
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
}, tl = {
  enterprise_win11: {
    label: "Windows 11 Enterprise (Tam Özellikli)",
    description: "Ribbon bar, sağ detay paneli, WebGL stüdyosu ve geri dönüşüm kutusu aktif.",
    patch: {
      ...ea,
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
      ...ea,
      defaultViewMode: "details",
      enableDualPane: !0,
      enableDetailsInspector: !1
    }
  },
  webgl_performance: {
    label: "WebGL 60FPS Spatial Motoru",
    description: "GPU hızlandırmalı WebGL Canvas sahnesi, shader tabanlı görsel işleme ve 3B disk haritası odaklı.",
    patch: {
      ...ea,
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
      ...ea,
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
], ar = /* @__PURE__ */ new WeakMap();
class ce {
  static getNodeMap(l) {
    let s = ar.get(l);
    if (!s) {
      s = /* @__PURE__ */ new Map();
      for (let c = 0; c < l.length; c++)
        s.set(l[c].id, l[c]);
      ar.set(l, s);
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
    const s = l.replace(/[^0-7]/g, "").padStart(3, "0").slice(-3), c = parseInt(s[0], 10) || 0, i = parseInt(s[1], 10) || 0, m = parseInt(s[2], 10) || 0, n = this.digitToTriad(c), u = this.digitToTriad(i), x = this.digitToTriad(m);
    return {
      owner: n,
      group: u,
      others: x,
      octal: `0${c}${i}${m}`,
      symbolic: `${this.triadToSymbolic(n)}${this.triadToSymbolic(u)}${this.triadToSymbolic(x)}`
    };
  }
  static syncPosix(l) {
    const s = this.triadToDigit(l.owner), c = this.triadToDigit(l.group), i = this.triadToDigit(l.others);
    return {
      owner: { ...l.owner },
      group: { ...l.group },
      others: { ...l.others },
      octal: `0${s}${c}${i}`,
      symbolic: `${this.triadToSymbolic(l.owner)}${this.triadToSymbolic(l.group)}${this.triadToSymbolic(l.others)}`
    };
  }
  /**
   * Resolves the effective ACL rules chain by walking up parent directories
   * whenever `inheritFromParent` is true.
   */
  static collectInheritedAclChain(l, s) {
    const c = [...l.security.acl];
    let i = l, m = 0;
    for (; i && i.security.inheritFromParent && i.parentId && m < 16; ) {
      m++;
      const n = s.get(i.parentId);
      if (!n) break;
      n.security.acl.length > 0 && c.push(...n.security.acl), i = n;
    }
    return c;
  }
  /**
   * Computes the complete effective permissions matrix for a given user on a target FileNode.
   */
  static evaluateNodePermissions(l, s, c, i) {
    const m = this.getNodeMap(c), n = l.security.ownerId === s.id, u = l.security.groupName === s.group;
    if (!i.strictPermissionEnforcement) {
      const d = {}, b = {};
      for (const R of St)
        d[R] = !0, b[R] = "İzin denetimi yapılandırmada devre dışı bırakıldı (Bypass Mode).";
      return {
        allowed: d,
        reasons: b,
        effectiveOctal: l.security.posix.octal,
        effectiveSymbolic: `${l.type === "folder" ? "d" : "-"}${l.security.posix.symbolic}`,
        isOwner: n,
        isLocked: l.security.locked
      };
    }
    const x = n ? l.security.posix.owner : u ? l.security.posix.group : l.security.posix.others, T = { ...{
      read: x.r,
      download: x.r,
      write: x.w,
      upload: x.w && x.x,
      rename: x.w,
      delete: x.w,
      share: x.r && (n || s.role === "admin" || s.role === "editor"),
      chmod: n || s.role === "admin",
      lock: x.w || n || s.role === "admin"
    } }, M = {}, z = n ? "Owner (Sahip)" : u ? `Group (${s.group})` : "Others (Genel)";
    for (const d of St)
      M[d] = T[d] ? `POSIX ${l.security.posix.octal} (${z}) üzerinden izin verildi.` : `POSIX ${l.security.posix.octal} (${z}) kısıtlaması nedeniyle reddedildi.`;
    const g = this.collectInheritedAclChain(l, m).filter(
      (d) => d.subjectType === "user" && d.subjectId === s.id || d.subjectType === "role" && d.subjectId === s.role
    ), B = g.filter((d) => d.effect === "allow"), I = g.filter((d) => d.effect === "deny");
    for (const d of B)
      for (const b of St)
        d.permissions[b] && (T[b] = !0, M[b] = `ACL Allow kuralı (${d.subjectLabel}) ile yetki tanımlandı.`);
    for (const d of I)
      for (const b of St)
        d.permissions[b] && (T[b] = !1, M[b] = `ACL Explicit Deny kuralı (${d.subjectLabel}) tarafından engellendi.`);
    if (s.role === "admin")
      for (const d of St)
        I.some(
          (R) => R.subjectId === "admin" && R.permissions[d]
        ) || (T[d] = !0, M[d] = "Root Admin (Süper Kullanıcı) yetkisiyle tam erişim.");
    let A = l.security.locked ? l : void 0;
    if (!A) {
      let d = l, b = 0;
      for (; d && d.parentId && b < 16; ) {
        b++;
        const R = m.get(d.parentId);
        if (R != null && R.security.locked) {
          A = R;
          break;
        }
        d = R;
      }
    }
    if (i.respectFolderLocks && A) {
      const d = ["write", "delete", "rename", "upload"];
      for (const b of d)
        T[b] = !1, M[b] = `"${A.name}" öğesi kilitli (${A.security.lockedBy || "Sistem"}) olduğu için değiştirilemez.`;
    }
    return {
      allowed: T,
      reasons: M,
      effectiveOctal: l.security.posix.octal,
      effectiveSymbolic: `${l.type === "folder" ? "d" : "-"}${l.security.posix.symbolic}`,
      isOwner: n,
      isLocked: !!A
    };
  }
}
function rt(a) {
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
  for (const c of l)
    s[c] = a.includes(c);
  return s;
}
function it(a) {
  return a === "vault" ? [
    {
      id: "acl_v1",
      subjectType: "role",
      subjectId: "admin",
      subjectLabel: "Role: Root Admin",
      effect: "allow",
      permissions: rt([
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
      permissions: rt(["read", "download"])
    },
    {
      id: "acl_v3",
      subjectType: "role",
      subjectId: "guest",
      subjectLabel: "Role: External Guest",
      effect: "deny",
      permissions: rt([
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
      permissions: rt(["write", "delete", "rename", "upload"])
    }
  ] : a === "engineering" ? [
    {
      id: "acl_e1",
      subjectType: "role",
      subjectId: "developer",
      subjectLabel: "Role: Lead Developer",
      effect: "allow",
      permissions: rt([
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
      permissions: rt(["read", "download"])
    },
    {
      id: "acl_e3",
      subjectType: "role",
      subjectId: "guest",
      subjectLabel: "Role: External Guest",
      effect: "deny",
      permissions: rt(["write", "delete", "rename", "upload", "chmod", "lock"])
    }
  ] : a === "creative" ? [
    {
      id: "acl_c1",
      subjectType: "role",
      subjectId: "editor",
      subjectLabel: "Role: Media Editor",
      effect: "allow",
      permissions: rt([
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
      permissions: rt(["read", "write", "upload", "download"])
    }
  ] : [
    {
      id: "acl_o1",
      subjectType: "role",
      subjectId: "editor",
      subjectLabel: "Role: Media Editor",
      effect: "allow",
      permissions: rt(["read", "write", "upload", "download", "share"])
    },
    {
      id: "acl_o2",
      subjectType: "role",
      subjectId: "viewer",
      subjectLabel: "Role: Security Auditor",
      effect: "allow",
      permissions: rt(["read", "download"])
    }
  ];
}
const rr = [
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
], lr = [
  "nebula",
  "cybergrid",
  "topography",
  "prism",
  "aurora"
], nr = [
  ["#3b82f6", "#6366f1", "#ec4899"],
  ["#10b981", "#06b6d4", "#3b82f6"],
  ["#f59e0b", "#ef4444", "#8b5cf6"],
  ["#0ea5e9", "#8b5cf6", "#14b8a6"],
  ["#ec4899", "#f43f5e", "#f59e0b"]
];
function ot(a, l, s = "demo_fake") {
  const c = ce.buildPosixFromOctal("0644"), i = new Array(a), m = "2026-10-21T12:00:00Z";
  for (let n = 0; n < a; n++) {
    const u = rr[n % rr.length], x = u.names[n % u.names.length], w = 12 * 1024 + n * 4999 % (95 * 1024), T = `${s}_${l || "root"}_${n}_${Math.random().toString(36).slice(2, 6)}`;
    i[n] = {
      id: T,
      parentId: l,
      name: `${x}_${String(n + 1).padStart(4, "0")}${u.ext}`,
      type: u.cat === "archive" ? "archive" : "file",
      category: u.cat,
      extension: u.ext,
      mimeType: u.mime,
      size: w,
      createdAt: m,
      updatedAt: m,
      starred: n % 25 === 0,
      tags: ["Benchmark", `Batch-${n % 10 + 1}`],
      trashed: !1,
      isSyntheticStressNode: !0,
      imageMeta: u.cat === "image" ? {
        width: 1920,
        height: 1080,
        palette: nr[n % nr.length],
        pattern: lr[n % lr.length]
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
        posix: c,
        acl: []
      }
    };
  }
  return i;
}
function ra() {
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
        posix: ce.buildPosixFromOctal("0775"),
        acl: it("engineering"),
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
        posix: ce.buildPosixFromOctal("0775"),
        acl: it("creative"),
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
        posix: ce.buildPosixFromOctal("0750"),
        acl: it("vault"),
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
        posix: ce.buildPosixFromOctal("0755"),
        acl: it("open")
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
        posix: ce.buildPosixFromOctal("0775"),
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
        posix: ce.buildPosixFromOctal("0644"),
        acl: it("open")
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
        posix: ce.buildPosixFromOctal("0664"),
        acl: it("creative")
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
        posix: ce.buildPosixFromOctal("0644"),
        acl: it("open")
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
        posix: ce.buildPosixFromOctal("0644"),
        acl: it("open")
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
        posix: ce.buildPosixFromOctal("0664"),
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
        posix: ce.buildPosixFromOctal("0640"),
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
        posix: ce.buildPosixFromOctal("0644"),
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
        posix: ce.buildPosixFromOctal("0664"),
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
        posix: ce.buildPosixFromOctal("0664"),
        acl: []
      }
    }
  ], s = ot(16, null, "seed_root"), c = ot(28, "fld_engineering", "seed_eng"), i = ot(18, "fld_connectors", "seed_conn"), m = ot(18, "fld_webgl", "seed_wgl");
  return [
    ...l,
    ...s,
    ...c,
    ...i,
    ...m
  ];
}
const al = "filemangl_media_cache_v1", rl = 1, Nt = "thumbnails", st = "blobs", ll = 250;
function ka(a, l, s) {
  const c = (i) => Math.max(0, Math.min(255, Math.round(i)));
  return "#" + [c(a), c(l), c(s)].map((i) => i.toString(16).padStart(2, "0")).join("");
}
function nl(a) {
  const l = a.indexOf(",");
  if (l === -1) return a.length;
  const s = a.length - l - 1;
  return Math.round(s * 3 / 4);
}
class sl {
  constructor() {
    Fe(this, "l1Cache", /* @__PURE__ */ new Map());
    Fe(this, "blobUrlMap", /* @__PURE__ */ new Map());
    Fe(this, "blobInstanceMap", /* @__PURE__ */ new Map());
    Fe(this, "hitCount", 0);
    Fe(this, "missCount", 0);
    Fe(this, "dbPromise", null);
  }
  openDatabase() {
    return this.dbPromise ? this.dbPromise : (this.dbPromise = new Promise((l) => {
      if (typeof window > "u" || !("indexedDB" in window)) {
        l(null);
        return;
      }
      try {
        const s = window.indexedDB.open(al, rl);
        s.onupgradeneeded = () => {
          const c = s.result;
          c.objectStoreNames.contains(Nt) || c.createObjectStore(Nt, { keyPath: "cacheKey" }), c.objectStoreNames.contains(st) || c.createObjectStore(st);
        }, s.onsuccess = () => l(s.result), s.onerror = () => l(null);
      } catch {
        l(null);
      }
    }), this.dbPromise);
  }
  setL1(l, s) {
    if (this.l1Cache.has(l))
      this.l1Cache.delete(l);
    else if (this.l1Cache.size >= ll) {
      const c = this.l1Cache.keys().next().value;
      c && this.l1Cache.delete(c);
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
    const c = await this.openDatabase();
    return c ? new Promise((i) => {
      try {
        const u = c.transaction(Nt, "readonly").objectStore(Nt).get(l);
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
    const c = await this.openDatabase();
    if (c)
      try {
        c.transaction(st, "readwrite").objectStore(st).put(s, l);
      } catch {
      }
  }
  async getBinaryBlob(l) {
    if (this.blobInstanceMap.has(l))
      return this.blobInstanceMap.get(l);
    const s = await this.openDatabase();
    return s ? new Promise((c) => {
      try {
        const m = s.transaction(st, "readonly").objectStore(st).get(l);
        m.onsuccess = () => {
          const n = m.result;
          if (n) {
            this.blobInstanceMap.set(l, n), c(n);
            return;
          }
          c(null);
        }, m.onerror = () => c(null);
      } catch {
        c(null);
      }
    }) : null;
  }
  async getPersistedBlobUrl(l) {
    if (this.blobUrlMap.has(l))
      return this.blobUrlMap.get(l);
    const s = await this.openDatabase();
    return s ? new Promise((c) => {
      try {
        const m = s.transaction(st, "readonly").objectStore(st).get(l);
        m.onsuccess = () => {
          const n = m.result;
          if (n && typeof URL < "u" && typeof URL.createObjectURL == "function")
            try {
              const u = URL.createObjectURL(n);
              this.blobUrlMap.set(l, u), c(u);
              return;
            } catch {
              c(null);
              return;
            }
          c(null);
        }, m.onerror = () => c(null);
      } catch {
        c(null);
      }
    }) : null;
  }
  /**
   * Generates a real bicubic-downscaled WebP/JPEG thumbnail & extracts 3 dominant RGB hex colors
   * from an uploaded image File/Blob, caching both in L1 RAM and L2 IndexedDB.
   */
  async generateAndCacheImageThumbnail(l, s, c, i = 320) {
    const m = performance.now(), n = await this.getThumbnail(s);
    if (n)
      return await this.persistBinaryBlob(s, l), {
        ...n,
        generationMs: Number((performance.now() - m).toFixed(2)),
        fromCache: !0
      };
    await this.persistBinaryBlob(s, l);
    let u = c;
    if (!u)
      try {
        typeof URL < "u" && typeof URL.createObjectURL == "function" && (u = URL.createObjectURL(l));
      } catch {
        u = void 0;
      }
    return u && this.blobUrlMap.set(s, u), new Promise((x) => {
      const w = () => {
        const g = {
          cacheKey: s,
          thumbnailDataUrl: u || "",
          width: 1920,
          height: 1080,
          palette: ["#00c8ff", "#2ff58e", "#3b82f6"],
          thumbByteSize: Math.min(l.size, 18432),
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          generationMs: Number((performance.now() - m).toFixed(2)),
          fromCache: !1
        };
        return this.putThumbnail(g), g;
      };
      if (typeof Image > "u" || typeof document > "u" || !u) {
        x(w());
        return;
      }
      let T = !1;
      const M = new Image(), z = (g) => {
        T || (T = !0, clearTimeout(v), x(g));
      }, v = setTimeout(() => {
        z(w());
      }, 650);
      M.onload = () => {
        try {
          const g = M.naturalWidth || 1920, B = M.naturalHeight || 1080, I = Math.min(1, i / Math.max(g, B)), A = Math.max(1, Math.round(g * I)), d = Math.max(1, Math.round(B * I)), b = document.createElement("canvas");
          b.width = A, b.height = d;
          const R = b.getContext("2d");
          let Q = u, X = ["#00c8ff", "#2ff58e", "#3b82f6"];
          if (R) {
            R.imageSmoothingEnabled = !0, R.imageSmoothingQuality = "high", R.drawImage(M, 0, 0, A, d);
            try {
              const se = R.getImageData(
                Math.floor(A * 0.25),
                Math.floor(d * 0.25),
                1,
                1
              ).data, xe = R.getImageData(
                Math.floor(A * 0.5),
                Math.floor(d * 0.5),
                1,
                1
              ).data, ye = R.getImageData(
                Math.floor(A * 0.75),
                Math.floor(d * 0.75),
                1,
                1
              ).data;
              X = [
                ka(se[0], se[1], se[2]),
                ka(xe[0], xe[1], xe[2]),
                ka(ye[0], ye[1], ye[2])
              ];
            } catch {
            }
            const te = b.toDataURL("image/webp", 0.84);
            if (te && te.startsWith("data:image/"))
              Q = te;
            else {
              const se = b.toDataURL("image/jpeg", 0.84);
              se && se.startsWith("data:image/") && (Q = se);
            }
          }
          const $ = {
            cacheKey: s,
            thumbnailDataUrl: Q,
            width: g,
            height: B,
            palette: X,
            thumbByteSize: nl(Q) || Math.min(l.size, 24576),
            generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
            generationMs: Number((performance.now() - m).toFixed(2)),
            fromCache: !1
          };
          this.putThumbnail($), z($);
        } catch {
          z(w());
        }
      }, M.onerror = () => {
        z(w());
      }, M.src = u;
    });
  }
  /**
   * Rehydrates persisted FileNodes on application startup so uploaded images, videos, and files
   * retain their live Blob URLs and cached thumbnails across page refreshes (F5).
   */
  async rehydrateNodes(l) {
    return await Promise.all(
      l.map(async (c) => {
        if (!c.isUserUploaded && !c.thumbnailUrl && !c.blobUrl)
          return c;
        const i = c.checksumSha256 || c.id, m = await this.getThumbnail(i), n = await this.getPersistedBlobUrl(i);
        return !m && !n ? c : {
          ...c,
          blobUrl: n || c.blobUrl,
          thumbnailUrl: (m == null ? void 0 : m.thumbnailDataUrl) || n || c.thumbnailUrl,
          imageMeta: c.imageMeta || (m ? {
            width: m.width,
            height: m.height,
            palette: m.palette,
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
    const s = this.hitCount + this.missCount, c = s > 0 ? Math.round(this.hitCount / s * 100) : 100;
    return {
      l1Entries: this.l1Cache.size,
      hitCount: this.hitCount,
      missCount: this.missCount,
      totalThumbBytes: l,
      hitRatioPercent: c
    };
  }
  async clearAll() {
    this.l1Cache.clear(), this.hitCount = 0, this.missCount = 0;
    const l = await this.openDatabase();
    if (l)
      try {
        const s = l.transaction([Nt, st], "readwrite");
        s.objectStore(Nt).clear(), s.objectStore(st).clear();
      } catch {
      }
  }
}
const pt = new sl(), Na = "filemangl_vfs_nodes_v28_win11";
class xr {
  constructor() {
    Fe(this, "driverId", "vfs_localstorage");
    Fe(this, "driverName", "FileManGL In-Browser VFS (Zero-Backend)");
    Fe(this, "supportsRealtimeStream", !0);
    Fe(this, "memoryCache", null);
  }
  async initialize() {
    try {
      const s = localStorage.getItem(Na);
      if (s) {
        const c = JSON.parse(s);
        if (Array.isArray(c) && c.length > 0) {
          const i = await pt.rehydrateNodes(c);
          return this.memoryCache = i, i;
        }
      }
    } catch {
    }
    const l = ra();
    return this.memoryCache = l, await this.saveAllNodes(l), l;
  }
  async getAllNodes() {
    return this.memoryCache ? this.memoryCache : this.initialize();
  }
  async saveAllNodes(l) {
    this.memoryCache = l;
    try {
      l.length <= 800 && localStorage.setItem(Na, JSON.stringify(l));
    } catch {
    }
  }
  async resetToFactoryDefaults() {
    const l = ra();
    this.memoryCache = l;
    try {
      localStorage.setItem(Na, JSON.stringify(l));
    } catch {
    }
    return l;
  }
}
class il {
  constructor() {
    Fe(this, "driverId", "vfs_memory");
    Fe(this, "driverName", "FileManGL Ephemeral RAM Disk VFS");
    Fe(this, "supportsRealtimeStream", !0);
    Fe(this, "nodes", ra());
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
    return this.nodes = ra(), this.nodes;
  }
}
class ol {
  constructor(l, s, c) {
    Fe(this, "driverId", "rest_connector");
    Fe(this, "driverName", "Universal HTTP REST Connector (Laravel / Node.js)");
    Fe(this, "supportsRealtimeStream", !1);
    Fe(this, "fallbackVfs", new xr());
    Fe(this, "endpoint");
    Fe(this, "authToken");
    Fe(this, "onProtocolLog");
    this.endpoint = l, this.authToken = s, this.onProtocolLog = c;
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
const sr = /* @__PURE__ */ new WeakMap(), ir = /* @__PURE__ */ new WeakMap();
class ae {
  static buildFolderSizeIndex(l) {
    let s = sr.get(l);
    if (s) return s;
    s = /* @__PURE__ */ new Map();
    const c = /* @__PURE__ */ new Map();
    for (let m = 0; m < l.length; m++) {
      const n = l[m];
      if (n.trashed) continue;
      let u = c.get(n.parentId);
      u || (u = [], c.set(n.parentId, u)), u.push(n);
    }
    const i = (m) => {
      if (s.has(m)) return s.get(m);
      const n = c.get(m) || [];
      let u = 0;
      for (let x = 0; x < n.length; x++) {
        const w = n[x];
        w.type === "folder" ? u += i(w.id) : u += w.size;
      }
      return s.set(m, u), u;
    };
    i(null);
    for (let m = 0; m < l.length; m++)
      l[m].type === "folder" && !s.has(l[m].id) && i(l[m].id);
    return sr.set(l, s), s;
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
    const s = ir.get(l);
    if (s !== void 0) return s;
    let c = 0;
    for (let i = 0; i < l.length; i++)
      l[i].type !== "folder" && (c += l[i].size);
    return ir.set(l, c), c;
  }
  static findEffectiveFolderQuota(l, s) {
    if (!l) return null;
    const c = ce.getNodeMap(s);
    let i = c.get(l), m = 0;
    for (; i && m < 16; ) {
      if (m++, i.security.quota && i.security.quota.maxBytes !== null)
        return {
          folderNode: i,
          usedBytes: this.computeFolderSize(i.id, s)
        };
      i = i.parentId ? c.get(i.parentId) : void 0;
    }
    return null;
  }
  static validateWriteOperation(l, s, c, i, m) {
    var T;
    const n = this.computeTotalVolumeUsed(i), u = m.totalDiskQuotaBytes, x = s.toLowerCase().match(/(\.[a-z0-9]+)$/), w = x ? x[1] : "";
    if (w && m.globalBlockedExtensions.map((M) => M.toLowerCase()).includes(w))
      return {
        allowed: !1,
        reason: `Güvenlik Politikası: "${w}" uzantılı dosyalar global disk kuralları gereği engellenmiştir.`,
        volumeUsedBytes: n,
        volumeLimitBytes: u
      };
    if (c > m.defaultMaxUploadFileSizeBytes)
      return {
        allowed: !1,
        reason: `Dosya boyutu (${this.formatBytes(c)}), izin verilen maksimum tekil dosya sınırını (${this.formatBytes(
          m.defaultMaxUploadFileSizeBytes
        )}) aşıyor.`,
        volumeUsedBytes: n,
        volumeLimitBytes: u
      };
    if (n + c > u)
      return {
        allowed: !1,
        reason: `Disk Kotası Dolu! Toplam disk alanı (${this.formatBytes(u)}) bu işlem için yetersiz.`,
        volumeUsedBytes: n,
        volumeLimitBytes: u
      };
    if (l) {
      const z = ce.getNodeMap(i).get(l), v = z == null ? void 0 : z.security.quota;
      if (v) {
        if (w && v.blockedExtensions.map((B) => B.toLowerCase()).includes(w))
          return {
            allowed: !1,
            reason: `"${z.name}" klasör politikası "${w}" uzantılı dosyalara izin vermiyor.`,
            volumeUsedBytes: n,
            volumeLimitBytes: u
          };
        if (v.allowedExtensions.length > 0 && (!w || !v.allowedExtensions.map((B) => B.toLowerCase()).includes(w)))
          return {
            allowed: !1,
            reason: `"${z.name}" klasörüne yalnızca şu uzantılar yüklenebilir: ${v.allowedExtensions.join(
              ", "
            )}`,
            volumeUsedBytes: n,
            volumeLimitBytes: u
          };
        if (v.maxFileSizeBytes && c > v.maxFileSizeBytes)
          return {
            allowed: !1,
            reason: `"${z.name}" klasörü için maksimum dosya boyutu sınırı (${this.formatBytes(
              v.maxFileSizeBytes
            )}) aşıldı.`,
            volumeUsedBytes: n,
            volumeLimitBytes: u
          };
      }
      const g = this.findEffectiveFolderQuota(l, i);
      if (g && ((T = g.folderNode.security.quota) != null && T.maxBytes)) {
        const B = g.folderNode.security.quota.maxBytes;
        if (g.usedBytes + c > B)
          return {
            allowed: !1,
            reason: `"${g.folderNode.name}" klasör kotası (${this.formatBytes(
              B
            )}) aşıldı! Mevcut kullanım: ${this.formatBytes(g.usedBytes)}.`,
            volumeUsedBytes: n,
            volumeLimitBytes: u,
            folderUsedBytes: g.usedBytes,
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
    const c = {
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
    for (let m = 0; m < l.length; m++) {
      const n = l[m];
      n.type !== "folder" && (i[n.category] || (i[n.category] = { bytes: 0, count: 0 }), i[n.category].bytes += n.size, i[n.category].count += 1);
    }
    return Object.keys(c).filter((m) => {
      var n;
      return m !== "folder" && ((n = i[m]) == null ? void 0 : n.bytes) > 0;
    }).map((m) => ({
      category: m,
      label: c[m].label,
      color: c[m].color,
      bytes: i[m].bytes,
      count: i[m].count,
      percentage: Math.min(100, i[m].bytes / Math.max(1, s) * 100)
    })).sort((m, n) => n.bytes - m.bytes);
  }
  static formatBytes(l, s = 1) {
    if (l === 0) return "0 B";
    const c = 1024, i = s < 0 ? 0 : s, m = ["B", "KB", "MB", "GB", "TB"], n = Math.floor(Math.log(Math.max(1, l)) / Math.log(c));
    return `${parseFloat((l / Math.pow(c, n)).toFixed(i))} ${m[n]}`;
  }
}
const cl = (() => {
  const a = new Uint32Array(256);
  for (let l = 0; l < 256; l++) {
    let s = l;
    for (let c = 0; c < 8; c++)
      s = s & 1 ? 3988292384 ^ s >>> 1 : s >>> 1;
    a[l] = s >>> 0;
  }
  return a;
})();
function dl(a) {
  let l = 4294967295;
  for (let s = 0; s < a.length; s++)
    l = cl[(l ^ a[s]) & 255] ^ l >>> 8;
  return (l ^ 4294967295) >>> 0;
}
function ml(a) {
  const l = Math.max(1980, a.getFullYear()), s = a.getMonth() + 1, c = a.getDate(), i = a.getHours(), m = a.getMinutes(), n = Math.floor(a.getSeconds() / 2), u = (i & 31) << 11 | (m & 63) << 5 | n & 31, x = (l - 1980 & 127) << 9 | (s & 15) << 5 | c & 31;
  return { dosTime: u, dosDate: x };
}
function or(a) {
  try {
    const l = a.indexOf(",");
    if (l === -1) return null;
    const s = a.slice(0, l), c = a.slice(l + 1);
    if (s.includes(";base64") && typeof atob == "function") {
      const i = atob(c), m = new Uint8Array(i.length);
      for (let n = 0; n < i.length; n++)
        m[n] = i.charCodeAt(n);
      return m;
    }
    return new TextEncoder().encode(decodeURIComponent(c));
  } catch {
    return null;
  }
}
async function ul(a) {
  const l = new TextEncoder();
  if (a.checksumSha256) {
    const s = await pt.getBinaryBlob(a.checksumSha256);
    if (s && typeof s.arrayBuffer == "function")
      try {
        const c = await s.arrayBuffer();
        return new Uint8Array(c);
      } catch {
      }
  }
  if (a.blobUrl && a.blobUrl.startsWith("data:")) {
    const s = or(a.blobUrl);
    if (s) return s;
  }
  if (a.blobUrl && a.blobUrl.startsWith("blob:http") && typeof fetch == "function")
    try {
      const s = await fetch(a.blobUrl);
      if (s.ok) {
        const c = await s.arrayBuffer();
        if (c.byteLength > 0) return new Uint8Array(c);
      }
    } catch {
    }
  if (typeof a.content == "string" && a.content.length > 0)
    return l.encode(a.content);
  if (a.thumbnailUrl && a.thumbnailUrl.startsWith("data:")) {
    const s = or(a.thumbnailUrl);
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
class cr {
  /**
   * Recursively collects all selected nodes and their nested children in the VFS tree.
   */
  static async collectEntriesFromSelection(l, s, c) {
    const i = [], m = /* @__PURE__ */ new Set(), n = async (u, x) => {
      if (m.has(u.id) || u.trashed) return;
      m.add(u.id);
      const w = u.name.replace(/[\\:*?"<>|]/g, "_");
      if (u.type === "folder") {
        const T = x ? `${x}/${w}/` : `${w}/`;
        i.push({
          relativePath: T,
          isDirectory: !0,
          data: new Uint8Array(0),
          modifiedDate: new Date(u.updatedAt || Date.now()),
          sourceNode: u
        });
        const M = s.filter((z) => !z.trashed && z.parentId === u.id).sort((z, v) => z.name.localeCompare(v.name, "tr"));
        for (const z of M)
          await n(z, x ? `${x}/${w}` : w);
      } else {
        const T = x ? `${x}/${w}` : w, M = await ul(u);
        i.push({
          relativePath: T,
          isDirectory: !1,
          data: M,
          modifiedDate: new Date(u.updatedAt || Date.now()),
          sourceNode: u
        });
      }
    };
    for (let u = 0; u < l.length; u++) {
      const x = l[u];
      if (c) {
        const w = Math.round((u + 1) / Math.max(1, l.length) * 50);
        c(w, `"${x.name}" içeriği taranıyor...`);
      }
      await n(x, "");
    }
    return i;
  }
  /**
   * Builds a binary PKZIP archive from the selected FileNodes.
   */
  static async buildZipArchive(l, s, c, i) {
    const m = await this.collectEntriesFromSelection(
      l,
      s,
      i
    ), n = new TextEncoder(), u = [], x = [];
    let w = 0, T = 0, M = 0;
    for (let X = 0; X < m.length; X++) {
      const $ = m[X];
      if ($.isDirectory ? M++ : T++, i) {
        const ue = 50 + Math.round((X + 1) / Math.max(1, m.length) * 45);
        i(ue, `ZIP paketleniyor: ${$.relativePath}`);
      }
      const te = n.encode($.relativePath), se = $.data, xe = $.isDirectory ? 0 : dl(se), { dosTime: ye, dosDate: $e } = ml($.modifiedDate), ge = new Uint8Array(30 + te.length), Ne = new DataView(ge.buffer);
      Ne.setUint32(0, 67324752, !0), Ne.setUint16(4, 20, !0), Ne.setUint16(6, 2048, !0), Ne.setUint16(8, 0, !0), Ne.setUint16(10, ye, !0), Ne.setUint16(12, $e, !0), Ne.setUint32(14, xe, !0), Ne.setUint32(18, se.length, !0), Ne.setUint32(22, se.length, !0), Ne.setUint16(26, te.length, !0), Ne.setUint16(28, 0, !0), ge.set(te, 30), u.push(ge), se.length > 0 && u.push(se);
      const C = new Uint8Array(46 + te.length), _ = new DataView(C.buffer);
      _.setUint32(0, 33639248, !0), _.setUint16(4, 20, !0), _.setUint16(6, 20, !0), _.setUint16(8, 2048, !0), _.setUint16(10, 0, !0), _.setUint16(12, ye, !0), _.setUint16(14, $e, !0), _.setUint32(16, xe, !0), _.setUint32(20, se.length, !0), _.setUint32(24, se.length, !0), _.setUint16(28, te.length, !0), _.setUint16(30, 0, !0), _.setUint16(32, 0, !0), _.setUint16(34, 0, !0), _.setUint16(36, 0, !0), _.setUint32(38, $.isDirectory ? 16 : 0, !0), _.setUint32(42, w, !0), C.set(te, 46), x.push(C), w += ge.length + se.length;
    }
    const z = x.reduce((X, $) => X + $.length, 0), v = n.encode("FileManGL v1.0.4 Enterprise ZIP Archive"), g = new Uint8Array(22 + v.length), B = new DataView(g.buffer);
    B.setUint32(0, 101010256, !0), B.setUint16(4, 0, !0), B.setUint16(6, 0, !0), B.setUint16(8, m.length, !0), B.setUint16(10, m.length, !0), B.setUint32(12, z, !0), B.setUint32(16, w, !0), B.setUint16(20, v.length, !0), g.set(v, 22);
    const I = w + z + g.length, A = new Uint8Array(I);
    let d = 0;
    for (const X of u)
      A.set(X, d), d += X.length;
    for (const X of x)
      A.set(X, d), d += X.length;
    A.set(g, d), i && i(100, "ZIP arşivi hazırlandı");
    const b = l.length === 1 ? `${l[0].name.replace(/\.[^/.]+$/, "")}.zip` : `FileManGL_Secim_${l.length}_Oge.zip`, R = c ? c.endsWith(".zip") ? c : `${c}.zip` : b;
    return {
      blob: new Blob([A.buffer], {
        type: "application/zip"
      }),
      uint8: A,
      fileName: R,
      entryCount: m.length,
      fileCount: T,
      folderCount: M,
      totalBytes: I
    };
  }
  /**
   * Triggers a direct browser download for a generated ZIP Blob.
   */
  static triggerBrowserDownload(l, s) {
    if (typeof document > "u") return;
    let c = "";
    try {
      typeof URL < "u" && typeof URL.createObjectURL == "function" ? c = URL.createObjectURL(l) : c = `blob:local/${encodeURIComponent(s)}`;
    } catch {
      c = `blob:local/${encodeURIComponent(s)}`;
    }
    const i = document.createElement("a");
    i.href = c, i.download = s, i.style.display = "none", document.body.appendChild(i), typeof navigator < "u" && typeof navigator.userAgent == "string" && navigator.userAgent.toLowerCase().includes("jsdom") || i.click(), document.body.removeChild(i);
  }
}
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pl = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), yr = (...a) => a.filter((l, s, c) => !!l && l.trim() !== "" && c.indexOf(l) === s).join(" ").trim();
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var hl = {
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
const fl = br(
  ({
    color: a = "currentColor",
    size: l = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: c,
    className: i = "",
    children: m,
    iconNode: n,
    ...u
  }, x) => za(
    "svg",
    {
      ref: x,
      ...hl,
      width: l,
      height: l,
      stroke: a,
      strokeWidth: c ? Number(s) * 24 / Number(l) : s,
      className: yr("lucide", i),
      ...u
    },
    [
      ...n.map(([w, T]) => za(w, T)),
      ...Array.isArray(m) ? m : [m]
    ]
  )
);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const re = (a, l) => {
  const s = br(
    ({ className: c, ...i }, m) => za(fl, {
      ref: m,
      iconNode: l,
      className: yr(`lucide-${pl(a)}`, c),
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
const Sa = re("ArrowUpDown", [
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
const Fa = re("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ia = re("ChevronDown", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gr = re("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vr = re("CircleAlert", [
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
const Gt = re("CircleCheck", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ea = re("CircleX", [
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
const bl = re("ClipboardPaste", [
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
const wr = re("CodeXml", [
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
const xl = re("Columns2", [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M12 3v18", key: "108xh3" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ba = re("Copy", [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ra = re("Cpu", [
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
const kr = re("Download", [
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
const Nr = re("Eye", [
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
const yl = re("FileArchive", [
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
const gl = re("FilePenLine", [
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
const vl = re("FilePlus", [
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
const wl = re("FileText", [
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
const kl = re("Film", [
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
const dr = re("FolderOpen", [
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
const Nl = re("FolderPlus", [
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
const Sl = re("FolderTree", [
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
const Sr = re("Globe", [
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
const $a = re("HardDrive", [
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
const Cl = re("Image", [
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
const Oa = re("Layers", [
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
const Dl = re("LayoutGrid", [
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
const Ll = re("List", [
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
const Ml = re("LoaderCircle", [
  ["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cr = re("LockOpen", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 9.9-1", key: "1mm8w8" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ft = re("Lock", [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = re("PanelsTopLeft", [
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
const Al = re("PenLine", [
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
const _l = re("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tl = re("Plus", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pl = re("RotateCcw", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dr = re("Save", [
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
const Fl = re("Scissors", [
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
const na = re("Share2", [
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
const Lr = re("ShieldAlert", [
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
const Il = re("ShieldCheck", [
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
const Aa = re("Shield", [
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
const Mr = re("SlidersVertical", [
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
const jt = re("Sparkles", [
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
const Ua = re("Star", [
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
const zr = re("Terminal", [
  ["polyline", { points: "4 17 10 11 4 5", key: "akl6gq" }],
  ["line", { x1: "12", x2: "20", y1: "19", y2: "19", key: "q2wloq" }]
]);
/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ar = re("Trash2", [
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
const El = re("TriangleAlert", [
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
const Bl = re("Users", [
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
const mr = re("Volume2", [
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
const It = re("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Rl = ({
  queue: a,
  isMinimized: l,
  onToggleMinimize: s,
  onCloseTray: c,
  onClearCompleted: i,
  onCancelItem: m,
  onCancelAll: n,
  onLocateNode: u
}) => {
  if (a.length === 0) return null;
  const x = a.filter(
    (d) => d.status === "uploading" || d.status === "queued"
  ), w = a.filter((d) => d.status === "completed"), T = a.filter(
    (d) => d.status === "error" || d.status === "cancelled"
  ), M = x.length > 0, z = a.reduce((d, b) => d + Math.max(1, b.totalBytes), 0), v = a.reduce((d, b) => d + b.bytesTransferred, 0), g = a.length > 0 ? Math.min(
    100,
    Math.round(
      a.reduce((d, b) => d + b.percent, 0) / Math.max(1, a.length)
    )
  ) : 0, B = /* @__PURE__ */ new Map();
  for (const d of a)
    if (d.rootUploadedFolderName) {
      const b = B.get(d.rootUploadedFolderName) || {
        folderName: d.rootUploadedFolderName,
        folderId: d.rootUploadedFolderId,
        total: 0,
        completed: 0,
        percent: 0
      };
      b.total += 1, d.status === "completed" && (b.completed += 1), d.rootUploadedFolderId && (b.folderId = d.rootUploadedFolderId), b.percent += d.percent, B.set(d.rootUploadedFolderName, b);
    }
  const I = Array.from(B.values()).map((d) => ({
    ...d,
    percent: Math.round(d.percent / Math.max(1, d.total))
  })), A = (d) => {
    switch (d) {
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
      onClick: (d) => d.stopPropagation(),
      className: "fixed bottom-4 right-3 sm:right-6 left-3 sm:left-auto z-50 sm:w-[390px] rounded-2xl bg-[#0d1424]/95 border border-slate-700/90 shadow-2xl backdrop-blur-xl overflow-hidden select-none",
      children: [
        /* @__PURE__ */ t("div", { className: "px-3.5 py-2.5 bg-[#111a2e] border-b border-slate-800 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 min-w-0", children: [
            M ? /* @__PURE__ */ e(Ml, { className: "w-4 h-4 text-cyan-400 animate-spin shrink-0" }) : T.length > 0 && w.length === 0 ? /* @__PURE__ */ e(vr, { className: "w-4 h-4 text-rose-400 shrink-0" }) : /* @__PURE__ */ e(Gt, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
            /* @__PURE__ */ t("div", { className: "min-w-0", children: [
              /* @__PURE__ */ e("div", { className: "text-xs font-bold text-white truncate", children: M ? `${x.length} öğe yükleniyor (%${g})` : `${w.length} yükleme tamamlandı` }),
              /* @__PURE__ */ t("div", { className: "text-[10px] font-mono text-slate-400 truncate", children: [
                ae.formatBytes(v),
                " /",
                " ",
                ae.formatBytes(z),
                " • Kuyruk: ",
                a.length,
                " dosya"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-1 shrink-0", children: [
            M && /* @__PURE__ */ e(
              "button",
              {
                onClick: n,
                className: "px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-[10px] font-semibold text-rose-300 transition",
                title: "Tüm Yüklemeleri İptal Et",
                children: "İptal"
              }
            ),
            !M && w.length > 0 && /* @__PURE__ */ e(
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
                onClick: c,
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
            className: `h-full transition-all duration-150 ${M ? "bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" : "bg-emerald-500"}`,
            style: { width: `${g}%` }
          }
        ) }),
        !l && /* @__PURE__ */ t("div", { className: "max-h-72 overflow-y-auto divide-y divide-slate-800/70", children: [
          I.map((d) => /* @__PURE__ */ t(
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
                      d.folderName,
                      " (Klasör Yüklemesi)"
                    ] }),
                    /* @__PURE__ */ t("div", { className: "text-[10px] font-mono text-amber-300/80", children: [
                      d.completed,
                      "/",
                      d.total,
                      " dosya aktarıldı • %",
                      d.percent
                    ] })
                  ] })
                ] }),
                d.folderId && /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => u(d.folderId),
                    className: "px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-[10px] font-semibold flex items-center gap-1 shrink-0 transition",
                    title: "Yüklenen Klasörü Aç",
                    children: [
                      /* @__PURE__ */ e(dr, { className: "w-3 h-3" }),
                      /* @__PURE__ */ e("span", { children: "Klasörü Aç" })
                    ]
                  }
                )
              ]
            },
            d.folderName
          )),
          a.map((d) => {
            const b = A(d.category);
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
                              title: d.relativePath,
                              children: d.fileName
                            }
                          ),
                          d.relativePath !== d.fileName && /* @__PURE__ */ e(
                            "span",
                            {
                              className: "text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 truncate max-w-[110px]",
                              title: d.relativePath,
                              children: d.relativePath
                            }
                          )
                        ] }),
                        /* @__PURE__ */ t("div", { className: "text-[10px] font-mono text-slate-400 flex items-center gap-1.5 truncate", children: [
                          /* @__PURE__ */ e("span", { children: d.stage }),
                          /* @__PURE__ */ e("span", { children: "•" }),
                          /* @__PURE__ */ t("span", { children: [
                            ae.formatBytes(d.bytesTransferred),
                            " /",
                            " ",
                            ae.formatBytes(d.totalBytes)
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                      /* @__PURE__ */ t(
                        "span",
                        {
                          "data-testid": `upload-percent-${d.fileName}`,
                          className: `text-[11px] font-mono font-bold ${d.status === "completed" ? "text-emerald-400" : d.status === "error" || d.status === "cancelled" ? "text-rose-400" : "text-cyan-400"}`,
                          children: [
                            "%",
                            d.percent
                          ]
                        }
                      ),
                      (d.status === "uploading" || d.status === "queued") && /* @__PURE__ */ e(
                        "button",
                        {
                          onClick: () => m(d.id),
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
                      d.status === "completed" && /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ e(Gt, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
                        /* @__PURE__ */ e(
                          "button",
                          {
                            onClick: () => u(d.targetFolderId, d.createdNodeId),
                            className: "w-6 h-6 rounded hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition",
                            title: `Hedef Konumda Göster (${d.targetFolderLabel})`,
                            children: /* @__PURE__ */ e(dr, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ] }),
                      (d.status === "error" || d.status === "cancelled") && /* @__PURE__ */ e(Ea, { className: "w-4 h-4 text-rose-400 shrink-0" })
                    ] })
                  ] }),
                  /* @__PURE__ */ e("div", { className: "w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800/80", children: /* @__PURE__ */ e(
                    "div",
                    {
                      className: `h-full transition-all duration-150 ${d.status === "completed" ? "bg-emerald-500" : d.status === "error" || d.status === "cancelled" ? "bg-rose-500" : "bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400"}`,
                      style: { width: `${d.percent}%` }
                    }
                  ) })
                ]
              },
              d.id
            );
          })
        ] })
      ]
    }
  );
}, $l = { code: "tr", label: "Türkçe", flag: "🇹🇷" }, Ol = { subtitle: "Kurumsal React Dosya Yöneticisi • Hibrit ACL/POSIX • VFS & Backend Connector", landing: "Ana Sayfa", liveDemo: "Canlı Demo", documentation: "Dokümantasyon", configurator: "Konfigüratör", startDemo: "Demo'yu Başlat", darkMode: "Dark Mode", lightMode: "Light Mode" }, Ul = { badge: "WINDOWS 11 DENEYİMİ • WEBGL GPU VIEWPORT • NTFS ACL + POSIX İZİN MOTORU", titlePrefix: "Belirlediğiniz Disk Alanını Yöneten,", titleHighlight: "WebGL Hızlandırmalı & SOLID", titleSuffix: "React Dosya Yöneticisi.", description: "elFinder mimarisinin ötesine geçen FileManGL; Windows Explorer görünümleri, mouse seçim penceresi (marquee multi-select), kes/kopyala/yapıştır çakışma yönetimi, klasör ve dosya bazlı 9 katmanlı ACL + POSIX (0755) izin matrisi, klasör bazlı disk kotası, WebGL 60FPS Spatial sahnesi ve hem Zero-Backend VFS hem de Laravel / Node.js sunucu sürücüleriyle tam modüler olarak geliştirildi.", openDemoBtn: "Canlı Demo'yu Aç (/demo)", webglSceneBtn: "WebGL 60FPS Sahnesi", diskMapBtn: "3B Disk Haritası", docsBtn: "Dokümantasyon (/documentation)", card1Title: "25.000+ Dosya & WebGL2", card1Desc: "Virtualized DOM ve 60 FPS WebGL sahnesi ile on binlerce fake dosyayı sıfır gecikmeyle test edin.", card2Title: "NTFS ACL + POSIX + Kota", card2Desc: "Kullanıcı/Rol bazlı Allow & Explicit Deny, üst klasör mirası, kilit ve klasör bazlı MB kotası.", card3Title: "VFS + Laravel & Node.js", card3Desc: "Backend olmadan VFS ile çalışır; REST Connector ile Laravel ve Node.js disklerini yönetir.", card4Title: "%100 SOLID Konfigüratör", card4Desc: "Tüm araç çubukları, paneller, izin kuralları ve sürücüler tek bir config objesiyle set edilir.", livePreviewHint: "Canlı Önizleme: Tam ekran çalışma alanı için /demo sayfasına, teknik entegrasyon için /documentation sayfasına gidebilirsiniz.", comparisonTitle: "Mimari Karşılaştırma: elFinder vs. Standart React File Manager vs. FileManGL", comparisonSubtitle: "Neden FileManGL kurumsal disk yönetimi ve yüksek performanslı sahneler için daha kapsamlı bir mimari sunar?", inspectDocsBtn: "Mimari Dokümantasyonu İncele (/documentation)" }, Gl = { stressTest: "Stres Testi:", files25k: "+2.5K Dosya", files10k: "+10K Dosya", files250k: "+25K Dosya", clearFake: "Temizle", itemsUnit: "öğe", roleLabel: "Rol:", resetBtn: "Sıfırla", fullscreenEnter: "Tam Ekran Masaüstü Modu", fullscreenExit: "Tam Ekrandan Çık", newFolder: "Yeni Klasör", newFile: "Yeni Dosya", upload: "Yükle", cut: "Kes", copy: "Kopyala", paste: "Yapıştır", rename: "Adlandır", batchRename: "Toplu Adlandır", zipCompress: "ZIP Sıkıştır", permissionsAcl: "İzinler & Kota (ACL)", restore: "Geri Yükle", webglScene: "WebGL Sahne", webglDiskMap: "WebGL Disk Haritası", viewsGroup: "Windows Explorer Görünümleri", viewExtraLarge: "Çok Büyük Simgeler", viewLarge: "Büyük Simgeler (Large Icons)", viewMedium: "Orta Simgeler (Medium Icons)", viewSmall: "Küçük Simgeler (Small Icons)", viewList: "Liste (Compact List)", viewDetails: "Detaylar (Details Table)", viewTiles: "Döşemeler (Tiles)", viewContent: "İçerik (Content)", filterAll: "Tümü", filterFolder: "Klasör", filterImage: "Görsel", filterCode: "Kod", filterDoc: "Doküman", searchPlaceholder: "İsim, etiket, sahip veya 0755 ara...", quickAccess: "Hızlı Erişim (Quick Access)", rootVolume: "Ana Disk (Root)", starred: "Yıldızlılar", shared: "Paylaşılanlar", lockedVault: "Kilitli Öğeler (Vault)", recycleBin: "Geri Dönüşüm Kutusu", directoryTree: "Dizin Ağacı (Directory Tree)", diskQuota: "Disk Kotası", used: "dolu", total: "Top:", colName: "Ad (Name)", colModified: "Değiştirme Tarihi", colType: "Tür", colSize: "Boyut", colOwner: "Sahip (Owner)", colPosix: "İzin (POSIX)", fileFolder: "Dosya Klasörü", fileSuffix: "Dosyası", selectedBadge: "öğe seçildi", secondaryPane: "İkinci Panel (Hedef Dizin):", transferHere: "Seçilileri Buraya Aktar →", aclChmodBtn: "ACL / Chmod", lockBtn: "Kilitle", unlockBtn: "Kilidi Aç", effectivePerms: "Etkin İzinler", customFolderQuota: "Özel Klasör Kotası Aktif", auditTrail: "Canlı Güvenlik Denetim İzi", noAuditLogs: "Henüz işlem kaydı yok.", emptyInspector: "Detayları, SHA-256 özetini ve etkin ACL izin matrisini incelemek için bir dosya veya klasör seçin.", statusListed: "öğe listeleniyor", statusSelected: "öğe seçili", statusEngine: "Yetki Motoru:", statusActiveRole: "Aktif Rol:", statusFreeSpace: "Boş Alan:", ctxOpen: "Aç / Önizle", ctxShader: "WebGL Shader Stüdyosunda Aç", ctxExtract: "Arşivi Klasöre Çıkart (Extract)", ctxStarAdd: "Yıldızlılara Ekle", ctxStarRemove: "Yıldızı Kaldır", ctxShare: "Paylaşım Bağlantısı", ctxDelete: "Sil", ctxFolderPerm: "Bu Klasörün İzin & Kota Ayarları" }, jl = { grid: "Grid", cluster: "Küme", galaxy: "Galaksi", addNodes: "+1,500 Düğüm", clear: "Temizle", treemapTitle: "WebGL 3D Cushion Disk Treemap", shaderActive: "GLSL Shader Aktif", totalUsage: "Toplam Kullanım:", full: "Dolu", nodes: "Düğüm", currentDirHierarchy: "Bu Dizin Hiyerarşisi", largestFiles: "En Büyük Dosyalar", diskShare: "Disk Payı:" }, Kl = { title: "Esnek Modüler Yapılandırma Motoru (Canlı Konfigüratör)", subtitle: "SOLID Dependency Inversion prensibiyle tüm özellikleri çalışma zamanında açıp kapatın veya hazır mimari profilleri yükleyin.", exportJsxBtn: "React JSX Konfigürasyonunu Al", quotaLabel: "Yönetilen Disk Alanı Kotası (MB)", driverLabel: "Aktif Dosya Sistemi Sürücüsü (IFileSystemDriver)", mountLabel: "Disk Mount Yolu (Mount Point)", blockedExtLabel: "Global Yasaklı Uzantılar", languageLabel: "Arayüz Dili (i18n Locale)" }, la = {
  meta: $l,
  nav: Ol,
  hero: Ul,
  explorer: Gl,
  webgl: jl,
  configurator: Kl
}, Hl = { code: "en", label: "English", flag: "🇬🇧" }, Wl = { subtitle: "Enterprise React File Manager • Hybrid ACL/POSIX • VFS & Backend Connector", landing: "Landing", liveDemo: "Live Demo", documentation: "Documentation", configurator: "Configurator", startDemo: "Launch Demo", darkMode: "Dark Mode", lightMode: "Light Mode" }, Vl = { badge: "WINDOWS 11 EXPERIENCE • WEBGL GPU VIEWPORT • NTFS ACL + POSIX PERMISSION ENGINE", titlePrefix: "Manage Your Dedicated Disk Space with a", titleHighlight: "WebGL-Accelerated & SOLID", titleSuffix: "React File Manager.", description: "Surpassing traditional elFinder architectures, FileManGL combines Windows 11 Explorer views, marquee multi-selection, cut/copy/paste conflict resolution, a 9-layer folder & file ACL + POSIX (0755) permission engine, folder disk quotas, a 60FPS WebGL Spatial viewport, and plug-and-play Zero-Backend VFS + Laravel / Node.js drivers.", openDemoBtn: "Open Live Demo (/demo)", webglSceneBtn: "WebGL 60FPS Scene", diskMapBtn: "3D Disk Treemap", docsBtn: "Documentation (/documentation)", card1Title: "25,000+ Files & WebGL2", card1Desc: "Benchmark tens of thousands of synthetic files with zero lag using Virtualized DOM and 60 FPS WebGL.", card2Title: "NTFS ACL + POSIX + Quota", card2Desc: "Role/User Allow & Explicit Deny rules, parent inheritance, immutable locks, and per-folder MB quotas.", card3Title: "VFS + Laravel & Node.js", card3Desc: "Runs standalone in-browser via VFS or manages physical Laravel and Node.js server disks via REST Connector.", card4Title: "100% SOLID Configurator", card4Desc: "Configure every toolbar, panel, permission rule, locale, and storage driver through a single config contract.", livePreviewHint: "Live Preview: Visit /demo for the full-screen workspace or /documentation for backend integration guides.", comparisonTitle: "Architectural Comparison: elFinder vs. Standard React File Manager vs. FileManGL", comparisonSubtitle: "Why FileManGL delivers a superior architecture for enterprise disk governance and high-speed rendering:", inspectDocsBtn: "Explore Technical Docs (/documentation)" }, Yl = { stressTest: "Stress Test:", files25k: "+2.5K Files", files10k: "+10K Files", files250k: "+25K Files", clearFake: "Clear", itemsUnit: "items", roleLabel: "Role:", resetBtn: "Reset", fullscreenEnter: "Fullscreen Desktop Mode", fullscreenExit: "Exit Fullscreen", newFolder: "New Folder", newFile: "New File", upload: "Upload", cut: "Cut", copy: "Copy", paste: "Paste", rename: "Rename", batchRename: "Batch Rename", zipCompress: "Compress ZIP", permissionsAcl: "Permissions & Quota (ACL)", restore: "Restore", webglScene: "WebGL Scene", webglDiskMap: "WebGL Disk Map", viewsGroup: "Windows Explorer Views", viewExtraLarge: "Extra Large Icons", viewLarge: "Large Icons", viewMedium: "Medium Icons", viewSmall: "Small Icons", viewList: "Compact List", viewDetails: "Details Table", viewTiles: "Tiles", viewContent: "Content", filterAll: "All", filterFolder: "Folders", filterImage: "Images", filterCode: "Code", filterDoc: "Documents", searchPlaceholder: "Search name, tag, owner or 0755...", quickAccess: "Quick Access", rootVolume: "Root Volume", starred: "Starred", shared: "Shared Links", lockedVault: "Locked Items (Vault)", recycleBin: "Recycle Bin", directoryTree: "Directory Tree", diskQuota: "Disk Quota", used: "used", total: "Max:", colName: "Name", colModified: "Date Modified", colType: "Type", colSize: "Size", colOwner: "Owner", colPosix: "Permission (POSIX)", fileFolder: "File Folder", fileSuffix: "File", selectedBadge: "items selected", secondaryPane: "Secondary Pane (Target Directory):", transferHere: "Transfer Selected Here →", aclChmodBtn: "ACL / Chmod", lockBtn: "Lock", unlockBtn: "Unlock", effectivePerms: "Effective Permissions", customFolderQuota: "Custom Folder Quota Active", auditTrail: "Live Security Audit Trail", noAuditLogs: "No audit entries recorded yet.", emptyInspector: "Select a file or folder to inspect metadata, SHA-256 hash, and effective ACL permissions.", statusListed: "items listed", statusSelected: "items selected", statusEngine: "Permission Engine:", statusActiveRole: "Active Role:", statusFreeSpace: "Free Space:", ctxOpen: "Open / Preview", ctxShader: "Open in WebGL Shader Studio", ctxExtract: "Extract Archive to Folder", ctxStarAdd: "Add to Starred", ctxStarRemove: "Remove Star", ctxShare: "Share Link", ctxDelete: "Delete", ctxFolderPerm: "Folder Permission & Quota Settings" }, Xl = { grid: "Grid", cluster: "Cluster", galaxy: "Galaxy", addNodes: "+1,500 Nodes", clear: "Clear", treemapTitle: "WebGL 3D Cushion Disk Treemap", shaderActive: "GLSL Shader Active", totalUsage: "Total Usage:", full: "Full", nodes: "Nodes", currentDirHierarchy: "Current Directory Hierarchy", largestFiles: "Largest Files", diskShare: "Disk Share:" }, ql = { title: "Flexible Modular Configuration Engine (Live Configurator)", subtitle: "Toggle any capability at runtime via SOLID Dependency Inversion or load pre-built architectural presets.", exportJsxBtn: "Export React JSX Config", quotaLabel: "Managed Disk Quota Allocation (MB)", driverLabel: "Active FileSystem Driver (IFileSystemDriver)", mountLabel: "Disk Mount Point", blockedExtLabel: "Global Blocked Extensions", languageLabel: "Interface Language (i18n Locale)" }, _a = {
  meta: Hl,
  nav: Wl,
  hero: Vl,
  explorer: Yl,
  webgl: Xl,
  configurator: ql
}, Zl = { code: "de", label: "Deutsch", flag: "🇩🇪" }, Ql = { subtitle: "Enterprise React Dateimanager • Hybrid ACL/POSIX • VFS & Backend-Connector", landing: "Startseite", liveDemo: "Live-Demo", documentation: "Dokumentation", configurator: "Konfigurator", startDemo: "Demo Starten", darkMode: "Dark Mode", lightMode: "Light Mode" }, Jl = { badge: "WINDOWS 11 ERLEBNIS • WEBGL GPU VIEWPORT • NTFS ACL + POSIX BERECHTIGUNGSMOTOR", titlePrefix: "Verwalten Sie Ihren Festplattenbereich mit einem", titleHighlight: "WebGL-beschleunigten & SOLID", titleSuffix: "React Dateimanager.", description: "FileManGL übertrifft klassische elFinder-Systeme mit Windows 11 Explorer-Ansichten, Auswahlrechteck (Marquee Multi-Select), Konfliktlösung beim Kopieren/Einfügen, einer 9-stufigen ACL + POSIX (0755) Berechtigungsmatrix, Ordner-Speicherplatzkontingenten, einer 60FPS WebGL-Szene sowie VFS- und Laravel / Node.js-Treibern.", openDemoBtn: "Live-Demo Öffnen (/demo)", webglSceneBtn: "WebGL 60FPS Szene", diskMapBtn: "3D Speicher-Treemap", docsBtn: "Dokumentation (/documentation)", card1Title: "25.000+ Dateien & WebGL2", card1Desc: "Testen Sie zehntausende Dateien ohne Verzögerung dank Virtualized DOM und 60 FPS WebGL.", card2Title: "NTFS ACL + POSIX + Kontingent", card2Desc: "Rollen-/Benutzerbasierte Allow & Explicit Deny Regeln, Vererbung, Sperren und Ordner-Quoten.", card3Title: "VFS + Laravel & Node.js", card3Desc: "Läuft ohne Backend im Browser (VFS) oder verwaltet Laravel- und Node.js-Serverlaufwerke.", card4Title: "100% SOLID Konfigurator", card4Desc: "Steuern Sie alle Symbolleisten, Ansichten, Berechtigungen und Treiber über ein einziges Config-Objekt.", livePreviewHint: "Live-Vorschau: Öffnen Sie /demo für den Vollbild-Arbeitsbereich oder /documentation für die Backend-Integration.", comparisonTitle: "Architekturvergleich: elFinder vs. Standard React File Manager vs. FileManGL", comparisonSubtitle: "Warum FileManGL eine umfassendere Architektur für Enterprise-Speicherverwaltung bietet:", inspectDocsBtn: "Dokumentation Ansehen (/documentation)" }, en = { stressTest: "Stresstest:", files25k: "+2.5K Dateien", files10k: "+10K Dateien", files250k: "+25K Dateien", clearFake: "Leeren", itemsUnit: "Elemente", roleLabel: "Rolle:", resetBtn: "Zurücksetzen", fullscreenEnter: "Vollbild-Desktopmodus", fullscreenExit: "Vollbild Beenden", newFolder: "Neuer Ordner", newFile: "Neue Datei", upload: "Hochladen", cut: "Ausschneiden", copy: "Kopieren", paste: "Einfügen", rename: "Umbenennen", batchRename: "Stapel-Umbenennung", zipCompress: "ZIP Komprimieren", permissionsAcl: "Rechte & Kontingent (ACL)", restore: "Wiederherstellen", webglScene: "WebGL Szene", webglDiskMap: "WebGL Speicherkarte", viewsGroup: "Windows Explorer Ansichten", viewExtraLarge: "Extra große Symbole", viewLarge: "Große Symbole", viewMedium: "Mittelgroße Symbole", viewSmall: "Kleine Symbole", viewList: "Kompakte Liste", viewDetails: "Details (Tabelle)", viewTiles: "Kacheln (Tiles)", viewContent: "Inhalt (Content)", filterAll: "Alle", filterFolder: "Ordner", filterImage: "Bilder", filterCode: "Code", filterDoc: "Dokumente", searchPlaceholder: "Name, Tag, Besitzer oder 0755 suchen...", quickAccess: "Schnellzugriff", rootVolume: "Hauptlaufwerk (Root)", starred: "Favoriten", shared: "Geteilte Links", lockedVault: "Gesperrte Elemente", recycleBin: "Papierkorb", directoryTree: "Verzeichnisbaum", diskQuota: "Speicherkontingent", used: "belegt", total: "Max:", colName: "Name", colModified: "Änderungsdatum", colType: "Typ", colSize: "Größe", colOwner: "Besitzer", colPosix: "Rechte (POSIX)", fileFolder: "Dateiordner", fileSuffix: "Datei", selectedBadge: "Elemente ausgewählt", secondaryPane: "Zweites Fenster (Zielordner):", transferHere: "Auswahl hierher übertragen →", aclChmodBtn: "ACL / Chmod", lockBtn: "Sperren", unlockBtn: "Entsperren", effectivePerms: "Effektive Rechte", customFolderQuota: "Ordner-Kontingent Aktiv", auditTrail: "Live-Sicherheitsprotokoll", noAuditLogs: "Noch keine Protokolleinträge vorhanden.", emptyInspector: "Wählen Sie eine Datei oder einen Ordner aus, um Details, SHA-256 und ACL-Berechtigungen zu prüfen.", statusListed: "Elemente gelistet", statusSelected: "Elemente ausgewählt", statusEngine: "Berechtigungsmotor:", statusActiveRole: "Aktive Rolle:", statusFreeSpace: "Freier Speicher:", ctxOpen: "Öffnen / Vorschau", ctxShader: "Im WebGL Shader Studio öffnen", ctxExtract: "Archiv in Ordner entpacken", ctxStarAdd: "Zu Favoriten hinzufügen", ctxStarRemove: "Favorit entfernen", ctxShare: "Link teilen", ctxDelete: "Löschen", ctxFolderPerm: "Ordnerrechte & Kontingent-Einstellungen" }, tn = { grid: "Raster", cluster: "Cluster", galaxy: "Galaxie", addNodes: "+1.500 Knoten", clear: "Leeren", treemapTitle: "WebGL 3D Cushion Speicher-Treemap", shaderActive: "GLSL Shader Aktiv", totalUsage: "Gesamtnutzung:", full: "Belegt", nodes: "Knoten", currentDirHierarchy: "Aktuelle Ordnerhierarchie", largestFiles: "Größte Dateien", diskShare: "Speicheranteil:" }, an = { title: "Flexibler Modularer Konfigurationsmotor (Live-Konfigurator)", subtitle: "Schalten Sie Funktionen zur Laufzeit über SOLID Dependency Inversion um oder laden Sie Architektur-Profile.", exportJsxBtn: "React JSX-Konfiguration Exportieren", quotaLabel: "Verwaltetes Speicherkontingent (MB)", driverLabel: "Aktiver Dateisystem-Treiber (IFileSystemDriver)", mountLabel: "Laufwerk-Mountpfad", blockedExtLabel: "Global Blockierte Dateiendungen", languageLabel: "Oberflächensprache (i18n Locale)" }, Ta = {
  meta: Zl,
  nav: Ql,
  hero: Jl,
  explorer: en,
  webgl: tn,
  configurator: an
}, rn = { code: "ru", label: "Русский", flag: "🇷🇺" }, ln = { subtitle: "Корпоративный файловый менеджер React • Гибридный ACL/POSIX • VFS и серверный коннектор", landing: "Главная", liveDemo: "Демо", documentation: "Документация", configurator: "Конфигуратор", startDemo: "Открыть Демо", darkMode: "Тёмная тема", lightMode: "Светлая тема" }, nn = { badge: "ИНТЕРФЕЙС WINDOWS 11 • WEBGL GPU УСКОРЕНИЕ • ДВИЖОК ПРАВ NTFS ACL + POSIX", titlePrefix: "Управляйте выделенным дисковым пространством с", titleHighlight: "WebGL-ускоренным и SOLID", titleSuffix: "файловым менеджером React.", description: "Превосходя классические архитектуры elFinder, FileManGL объединяет представления Проводника Windows 11, множественное выделение рамкой (Marquee), разрешение конфликтов при копировании/перемещении, 9-уровневый движок прав папок и файлов ACL + POSIX (0755), дисковые квоты папок, 60 FPS WebGL-сцену и драйверы VFS + Laravel / Node.js.", openDemoBtn: "Открыть демо (/demo)", webglSceneBtn: "Сцена WebGL 60FPS", diskMapBtn: "3D Карта диска", docsBtn: "Документация (/documentation)", card1Title: "25 000+ файлов и WebGL2", card1Desc: "Тестируйте десятки тысяч файлов без задержек благодаря виртуализированному DOM и WebGL 60 FPS.", card2Title: "NTFS ACL + POSIX + Квоты", card2Desc: "Правила Allow и Explicit Deny для ролей/пользователей, наследование прав, блокировка и МБ-квоты папок.", card3Title: "VFS + Laravel и Node.js", card3Desc: "Работает автономно в браузере (VFS) или управляет физическими дисками серверов Laravel и Node.js.", card4Title: "100% SOLID Конфигуратор", card4Desc: "Настраивайте панели инструментов, права доступа, языки и драйверы хранения через единый контракт конфигурации.", livePreviewHint: "Интерактивное превью: перейдите на /demo для полноэкранного режима или /documentation для интеграции с сервером.", comparisonTitle: "Архитектурное сравнение: elFinder vs. Стандартный React FM vs. FileManGL", comparisonSubtitle: "Почему FileManGL обеспечивает превосходную архитектуру для управления корпоративными дисками и высокоскоростного рендеринга:", inspectDocsBtn: "Изучить документацию (/documentation)" }, sn = { stressTest: "Стресс-тест:", files25k: "+2.5K Файлов", files10k: "+10K Файлов", files250k: "+25K Файлов", clearFake: "Очистить", itemsUnit: "элементов", roleLabel: "Роль:", resetBtn: "Сброс", fullscreenEnter: "Полноэкранный режим", fullscreenExit: "Выйти из полного экрана", newFolder: "Новая папка", newFile: "Новый файл", upload: "Загрузить", cut: "Вырезать", copy: "Копировать", paste: "Вставить", rename: "Переименовать", batchRename: "Массовое переименование", zipCompress: "Сжать в ZIP", permissionsAcl: "Права и квоты (ACL)", restore: "Восстановить", webglScene: "WebGL Сцена", webglDiskMap: "WebGL Карта диска", viewsGroup: "Виды Проводника Windows", viewExtraLarge: "Огромные значки", viewLarge: "Крупные значки", viewMedium: "Обычные значки", viewSmall: "Мелкие значки", viewList: "Список", viewDetails: "Таблица (Подробно)", viewTiles: "Плитка", viewContent: "Содержимое", filterAll: "Все", filterFolder: "Папки", filterImage: "Изображения", filterCode: "Код", filterDoc: "Документы", searchPlaceholder: "Поиск по имени, тегу, владельцу или 0755...", quickAccess: "Быстрый доступ", rootVolume: "Основной диск (Root)", starred: "Избранное", shared: "Общие ссылки", lockedVault: "Заблокированные (Сейф)", recycleBin: "Корзина", directoryTree: "Дерево каталогов", diskQuota: "Квота диска", used: "исп.", total: "Макс:", colName: "Имя", colModified: "Дата изменения", colType: "Тип", colSize: "Размер", colOwner: "Владелец", colPosix: "Права (POSIX)", fileFolder: "Папка с файлами", fileSuffix: "Файл", selectedBadge: "выбрано", secondaryPane: "Вторая панель (Целевой каталог):", transferHere: "Перенести выбранное сюда →", aclChmodBtn: "ACL / Chmod", lockBtn: "Блок.", unlockBtn: "Разблок.", effectivePerms: "Действующие права", customFolderQuota: "Активна квота папки", auditTrail: "Журнал аудита безопасности", noAuditLogs: "Записей аудита пока нет.", emptyInspector: "Выберите файл или папку для просмотра метаданных, SHA-256 и действующих прав ACL.", statusListed: "элементов в списке", statusSelected: "выбрано", statusEngine: "Движок прав:", statusActiveRole: "Активная роль:", statusFreeSpace: "Свободно:", ctxOpen: "Открыть / Просмотр", ctxShader: "Открыть в WebGL Shader Studio", ctxExtract: "Извлечь архив в папку", ctxStarAdd: "Добавить в избранное", ctxStarRemove: "Убрать из избранного", ctxShare: "Поделиться ссылкой", ctxDelete: "Удалить", ctxFolderPerm: "Настройки прав и квот папки" }, on = { grid: "Сетка", cluster: "Кластер", galaxy: "Галактика", addNodes: "+1 500 Узлов", clear: "Очистить", treemapTitle: "WebGL 3D Карта диска (Cushion Treemap)", shaderActive: "GLSL Шейдер активен", totalUsage: "Использовано:", full: "Занято", nodes: "Узлов", currentDirHierarchy: "Иерархия текущего каталога", largestFiles: "Самые большие файлы", diskShare: "Доля диска:" }, cn = { title: "Гибкий модульный конфигуратор (Live Configurator)", subtitle: "Переключайте любые функции в реальном времени через SOLID Dependency Inversion или загружайте готовые пресеты.", exportJsxBtn: "Экспорт JSX конфигурации", quotaLabel: "Выделенная квота диска (МБ)", driverLabel: "Активный драйвер ФС (IFileSystemDriver)", mountLabel: "Точка монтирования диска", blockedExtLabel: "Заблокированные расширения", languageLabel: "Язык интерфейса (i18n Locale)" }, Pa = {
  meta: rn,
  nav: ln,
  hero: nn,
  explorer: sn,
  webgl: on,
  configurator: cn
}, Ca = {
  tr: la,
  en: _a,
  de: Ta,
  ru: Pa
}, aa = [
  { code: "tr", label: la.meta.label, flag: la.meta.flag },
  { code: "en", label: _a.meta.label, flag: _a.meta.flag },
  { code: "de", label: Ta.meta.label, flag: Ta.meta.flag },
  { code: "ru", label: Pa.meta.label, flag: Pa.meta.flag }
], _r = Jr({
  locale: "tr",
  setLocale: () => {
  },
  dict: la,
  t: (a, l) => l || a
}), ls = ({ locale: a, onLocaleChange: l, children: s }) => {
  const c = We(() => Ca[a] || Ca.tr, [a]), i = We(() => (n, u) => {
    const x = n.split(".");
    let w = c;
    for (const T of x)
      if (w && typeof w == "object" && T in w)
        w = w[T];
      else {
        let M = Ca.tr;
        for (const z of x)
          M = M == null ? void 0 : M[z];
        return typeof M == "string" ? M : u || n;
      }
    return typeof w == "string" ? w : u || n;
  }, [c]), m = We(
    () => ({
      locale: a,
      setLocale: l,
      dict: c,
      t: i
    }),
    [a, l, c, i]
  );
  return /* @__PURE__ */ e(_r.Provider, { value: m, children: s });
}, sa = () => Qr(_r);
async function ta(a) {
  const l = a.items;
  if (l && l.length > 0) {
    const s = [];
    for (let c = 0; c < l.length; c++) {
      const i = l[c];
      if (typeof i.webkitGetAsEntry == "function") {
        const m = i.webkitGetAsEntry();
        m && s.push(m);
      }
    }
    if (s.some((c) => c.isDirectory)) {
      const c = [], i = async (m, n) => {
        if (m.isFile)
          await new Promise((u) => {
            m.file(
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
                c.push(x), u();
              },
              () => u()
            );
          });
        else if (m.isDirectory) {
          const u = m.createReader(), w = await (async () => {
            const M = [];
            let z = [];
            do
              z = await new Promise((v) => {
                u.readEntries(
                  (g) => v(g || []),
                  () => v([])
                );
              }), M.push(...z);
            while (z.length > 0);
            return M;
          })(), T = n ? `${n}/${m.name}` : m.name;
          for (const M of w)
            await i(M, T);
        }
      };
      for (const m of s)
        await i(m, "");
      if (c.length > 0) return c;
    }
  }
  return Array.from(a.files || []);
}
function Pt(a, l = "w-12 h-12") {
  var m, n, u, x, w, T;
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
      a.security.locked && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-rose-600 text-white shadow", children: /* @__PURE__ */ e(ft, { className: "w-2.5 h-2.5" }) })
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
      a.security.locked && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-rose-600 text-white shadow", children: /* @__PURE__ */ e(ft, { className: "w-2.5 h-2.5" }) })
    ] });
  if (a.category === "image" || a.category === "video") {
    if (a.thumbnailUrl || a.blobUrl) {
      const g = a.durationSec && a.durationSec > 0 ? `${Math.floor(a.durationSec / 60)}:${Math.floor(a.durationSec % 60).toString().padStart(2, "0")}` : null;
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
              !s && g && /* @__PURE__ */ e(
                "span",
                {
                  style: { color: "#ffffff" },
                  className: "absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono font-bold leading-tight pointer-events-none",
                  children: g
                }
              )
            ] })
          ]
        }
      );
    }
    const M = ((n = (m = a.imageMeta) == null ? void 0 : m.palette) == null ? void 0 : n[0]) || "#2563eb", z = ((x = (u = a.imageMeta) == null ? void 0 : u.palette) == null ? void 0 : x[1]) || "#7c3aed", v = ((T = (w = a.imageMeta) == null ? void 0 : w.palette) == null ? void 0 : T[2]) || "#db2777";
    return /* @__PURE__ */ e("div", { className: `relative flex items-center justify-center ${l} shrink-0`, children: /* @__PURE__ */ t("svg", { viewBox: "0 0 48 48", className: "w-full h-full drop-shadow-sm", children: [
      /* @__PURE__ */ e(
        "rect",
        {
          x: "4",
          y: "8",
          width: "40",
          height: "32",
          rx: "4",
          fill: M,
          stroke: "#ffffff",
          strokeOpacity: "0.25",
          strokeWidth: "1.5"
        }
      ),
      /* @__PURE__ */ e("path", { d: "M4 30 L16 20 L26 29 L34 22 L44 31 L44 36 C44 38.2 42.2 40 40 40 L8 40 C5.8 40 4 38.2 4 36 Z", fill: z }),
      /* @__PURE__ */ e("circle", { cx: "33", cy: "16", r: "3.5", fill: v }),
      a.category === "video" && /* @__PURE__ */ e("polygon", { points: "20,18 20,30 31,24", fill: "#ffffff", fillOpacity: "0.9" })
    ] }) });
  }
  const c = (a.extension || ".file").replace(".", "").toUpperCase().slice(0, 4);
  let i = "#2563eb";
  return c === "PDF" ? i = "#dc2626" : c === "CSV" || c === "JSON" || c === "XLSX" ? i = "#15803d" : c === "PHP" || c === "GLSL" ? i = "#7c3aed" : (c === "EXE" || c === "MSI") && (i = "#0284c7"), /* @__PURE__ */ t("div", { className: `relative flex items-center justify-center ${l} shrink-0`, children: [
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
            children: c
          }
        )
      ] })
    ] }),
    a.security.locked && /* @__PURE__ */ e("span", { className: "absolute -bottom-0.5 -right-0.5 p-0.5 rounded-full bg-rose-600 text-white shadow", children: /* @__PURE__ */ e(ft, { className: "w-2.5 h-2.5" }) })
  ] });
}
const dn = ({
  nodes: a,
  allNodes: l,
  viewMode: s,
  groupBy: c = "date",
  selectedIds: i,
  clipboard: m,
  renamingId: n,
  sortField: u,
  sortDirection: x,
  currentUser: w,
  config: T,
  onSelectNode: M,
  onSelectMany: z,
  onOpenNode: v,
  onContextMenuNode: g,
  onCommitRename: B,
  onCancelRename: I,
  onSortChange: A,
  onDropNodesIntoFolder: d,
  onExternalFilesDropped: b
}) => {
  const { dict: R } = sa(), Q = T.theme === "light", X = je(null), [$, te] = P(null), [se, xe] = P(""), [ye, $e] = P(0), [ge, Ne] = P(/* @__PURE__ */ new Set()), [C, _] = P({
    width: 1e3,
    height: 620
  }), ue = je(null), [V, y] = P(null);
  Ke(() => {
    if (n) {
      const S = a.find((ne) => ne.id === n);
      S && xe(S.name);
    }
  }, [n, a]), Ke(() => {
    const S = X.current;
    if (!S) return;
    const ne = new ResizeObserver((k) => {
      for (const N of k)
        _({
          width: Math.max(320, Math.floor(N.contentRect.width)),
          height: Math.max(240, Math.floor(N.contentRect.height))
        });
    });
    return ne.observe(S), () => ne.disconnect();
  }, []);
  const fe = (S) => T.showFileExtensions || S.type === "folder" || !S.extension ? S.name : S.name.endsWith(S.extension) ? S.name.slice(0, -S.extension.length) : S.name;
  Ke(() => {
    const S = (k) => {
      const N = ue.current, O = X.current;
      if (!N || !O) return;
      const Z = Math.hypot(
        k.clientX - N.startClientX,
        k.clientY - N.startClientY
      );
      if (!N.isDragging && Z > 4 && (N.isDragging = !0), !N.isDragging) return;
      const E = O.getBoundingClientRect();
      k.clientY > E.bottom - 28 ? O.scrollTop += 18 : k.clientY < E.top + 28 && (O.scrollTop -= 18), N.currentX = Math.max(0, k.clientX - E.left + O.scrollLeft), N.currentY = Math.max(0, k.clientY - E.top + O.scrollTop);
      const pe = Math.min(N.startX, N.currentX), ke = Math.max(N.startX, N.currentX), _e = Math.min(N.startY, N.currentY), Xe = Math.max(N.startY, N.currentY), we = E.left + pe - O.scrollLeft, Re = E.left + ke - O.scrollLeft, Ve = E.top + _e - O.scrollTop, bt = E.top + Xe - O.scrollTop, ct = new Set(N.additive ? N.initialSelected : []);
      O.querySelectorAll("[data-node-id]").forEach((Dt) => {
        const yt = Dt.getAttribute("data-node-id");
        if (!yt) return;
        const Lt = Dt.getBoundingClientRect();
        Lt.left <= Re && Lt.right >= we && Lt.top <= bt && Lt.bottom >= Ve && ct.add(yt);
      });
      const xt = Array.from(ct);
      z(xt), y({
        left: pe,
        top: _e,
        width: Math.max(2, ke - pe),
        height: Math.max(2, Xe - _e),
        count: xt.length
      });
    }, ne = () => {
      const k = ue.current;
      k && (k.isDragging || (k.clickedNodeId ? M(k.clickedNodeId, k.additive, k.shiftKey) : k.additive || z([])), ue.current = null, y(null));
    };
    return window.addEventListener("mousemove", S), window.addEventListener("mouseup", ne), () => {
      window.removeEventListener("mousemove", S), window.removeEventListener("mouseup", ne);
    };
  }, [z, M]);
  const L = (S) => {
    if (S.button !== 0) return;
    const ne = S.target;
    if (ne.tagName.toLowerCase() === "input" || ne.closest("thead") || ne.closest("button"))
      return;
    const k = X.current;
    if (!k) return;
    const N = ne.closest("[data-node-id]"), O = N ? N.getAttribute("data-node-id") : null;
    if (O)
      return;
    if (!T.enableRubberBandSelection) {
      z([]);
      return;
    }
    const Z = k.getBoundingClientRect(), E = S.clientX - Z.left + k.scrollLeft, pe = S.clientY - Z.top + k.scrollTop;
    ue.current = {
      startX: E,
      startY: pe,
      currentX: E,
      currentY: pe,
      startClientX: S.clientX,
      startClientY: S.clientY,
      isDragging: !1,
      additive: S.ctrlKey || S.metaKey,
      initialSelected: new Set(i),
      clickedNodeId: O,
      shiftKey: S.shiftKey
    };
  }, j = (S, ne = "text-xs") => n === S.id ? /* @__PURE__ */ e(
    "input",
    {
      type: "text",
      autoFocus: !0,
      value: se,
      onClick: (k) => k.stopPropagation(),
      onChange: (k) => xe(k.target.value),
      onKeyDown: (k) => {
        k.key === "Enter" && B(S.id, se), k.key === "Escape" && I();
      },
      onBlur: () => B(S.id, se),
      className: `w-full border border-blue-500 rounded px-1.5 py-0.5 text-xs focus:outline-none ${Q ? "bg-white text-slate-900" : "bg-[#1f1f1f] text-white"}`
    }
  ) : /* @__PURE__ */ e(
    "span",
    {
      title: S.name,
      className: `${ne} w-full block font-normal leading-[1.35] pb-0.5 line-clamp-2 break-words [overflow-wrap:anywhere] ${Q ? "text-slate-800" : "text-[#f3f3f3]"}`,
      children: fe(S)
    }
  ), G = () => V ? /* @__PURE__ */ e(
    "div",
    {
      style: {
        left: V.left,
        top: V.top,
        width: V.width,
        height: V.height
      },
      className: "absolute border border-[#0078d4] bg-[#0078d4]/25 pointer-events-none z-40",
      children: V.count > 0 && /* @__PURE__ */ t(
        "span",
        {
          style: { color: "#ffffff" },
          className: "absolute -top-6 left-0 px-2 py-0.5 rounded bg-[#0078d4] text-[10px] font-mono font-bold shadow whitespace-nowrap",
          children: [
            V.count,
            " ",
            R.explorer.selectedBadge
          ]
        }
      )
    }
  ) : null;
  if (s === "details") {
    const ne = Math.max(0, Math.floor(ye / 34) - 10), k = Math.min(
      a.length,
      Math.ceil((ye + C.height) / 34) + 10
    ), N = a.slice(ne, k), O = ne * 34, Z = Math.max(0, (a.length - k) * 34);
    return /* @__PURE__ */ t(
      "div",
      {
        ref: X,
        onScroll: (E) => $e(E.currentTarget.scrollTop),
        onMouseDown: L,
        onDragOver: (E) => {
          var pe, ke;
          (ke = (pe = E.dataTransfer) == null ? void 0 : pe.types) != null && ke.includes("Files") && (E.preventDefault(), E.dataTransfer.dropEffect = "copy");
        },
        onDrop: async (E) => {
          var pe;
          if ((pe = E.dataTransfer) != null && pe.files && E.dataTransfer.files.length > 0 && b) {
            E.preventDefault();
            const ke = await ta(E.dataTransfer);
            b(ke);
          }
        },
        onContextMenu: (E) => {
          E.target.closest("[data-node-id]") || (E.preventDefault(), g(E, void 0));
        },
        className: "relative w-full h-full overflow-auto select-none",
        children: [
          /* @__PURE__ */ t("table", { className: "w-full min-w-[600px] text-left border-collapse text-xs", children: [
            /* @__PURE__ */ e(
              "thead",
              {
                className: `sticky top-0 z-10 border-b font-normal ${Q ? "bg-slate-100/95 border-slate-200 text-slate-600" : "bg-[#191919] border-white/10 text-neutral-400"}`,
                children: /* @__PURE__ */ t("tr", { children: [
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => A("name"),
                      className: "py-2 px-4 cursor-pointer hover:text-white",
                      children: /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ e("span", { children: R.explorer.colName }),
                        u === "name" && /* @__PURE__ */ e(Sa, { className: "w-3 h-3 text-blue-400" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => A("updatedAt"),
                      className: "py-2 px-3 cursor-pointer hover:text-white",
                      children: /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ e("span", { children: R.explorer.colModified }),
                        u === "updatedAt" && /* @__PURE__ */ e(Sa, { className: "w-3 h-3 text-blue-400" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => A("type"),
                      className: "py-2 px-3 cursor-pointer hover:text-white",
                      children: R.explorer.colType
                    }
                  ),
                  /* @__PURE__ */ e(
                    "th",
                    {
                      onClick: () => A("size"),
                      className: "py-2 px-3 cursor-pointer hover:text-white text-right",
                      children: /* @__PURE__ */ t("div", { className: "flex items-center justify-end gap-1.5", children: [
                        /* @__PURE__ */ e("span", { children: R.explorer.colSize }),
                        u === "size" && /* @__PURE__ */ e(Sa, { className: "w-3 h-3 text-blue-400" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ e("th", { className: "py-2 px-3", children: R.explorer.colOwner }),
                  T.showPosixBadgesOnItems && /* @__PURE__ */ e("th", { className: "py-2 px-3", children: R.explorer.colPosix })
                ] })
              }
            ),
            /* @__PURE__ */ t("tbody", { className: "border-0", children: [
              O > 0 && /* @__PURE__ */ e("tr", { style: { height: `${O}px` }, children: /* @__PURE__ */ e("td", { colSpan: 6 }) }),
              N.map((E) => {
                const pe = i.has(E.id), ke = m.mode === "cut" && m.nodeIds.includes(E.id), _e = ce.evaluateNodePermissions(
                  E,
                  w,
                  l,
                  T
                ), Xe = E.type === "folder" ? ae.computeFolderSize(E.id, l) : E.size;
                return /* @__PURE__ */ t(
                  "tr",
                  {
                    "data-node-id": E.id,
                    style: { height: "34px" },
                    draggable: T.enableDragAndDrop && n !== E.id,
                    onDragStart: (we) => {
                      const Re = pe ? Array.from(i) : [E.id];
                      pe || M(E.id, !1, !1), we.dataTransfer.effectAllowed = "move";
                      const Ve = JSON.stringify(Re);
                      we.dataTransfer.setData("application/filemangl-nodes", Ve), we.dataTransfer.setData("text/plain", Ve);
                    },
                    onDragOver: (we) => {
                      E.type === "folder" && T.enableDragAndDrop && (we.preventDefault(), we.dataTransfer.dropEffect = "move", te(E.id));
                    },
                    onDragLeave: () => te(null),
                    onDrop: (we) => {
                      var Re;
                      if (te(null), E.type === "folder" && T.enableDragAndDrop) {
                        if (we.preventDefault(), we.stopPropagation(), (Re = we.dataTransfer) != null && Re.files && we.dataTransfer.files.length > 0 && b) {
                          b(we.dataTransfer.files, E.id);
                          return;
                        }
                        const Ve = we.dataTransfer.getData("application/filemangl-nodes") || we.dataTransfer.getData("text/plain");
                        if (Ve)
                          try {
                            d(E.id, JSON.parse(Ve));
                          } catch {
                          }
                      }
                    },
                    onClick: (we) => {
                      var Re, Ve;
                      if (we.stopPropagation(), pe && i.size === 1 && typeof window < "u" && ((Ve = (Re = window.matchMedia) == null ? void 0 : Re.call(window, "(pointer: coarse)")) != null && Ve.matches)) {
                        v(E);
                        return;
                      }
                      M(E.id, we.ctrlKey || we.metaKey, we.shiftKey);
                    },
                    onDoubleClick: (we) => {
                      we.stopPropagation(), v(E);
                    },
                    onContextMenu: (we) => {
                      we.preventDefault(), we.stopPropagation(), g(we, E);
                    },
                    className: `transition cursor-default ${pe ? Q ? "bg-blue-500/15 text-slate-900" : "bg-white/[0.12] text-white" : $ === E.id ? "bg-emerald-500/25 ring-1 ring-inset ring-emerald-400" : Q ? "hover:bg-slate-100" : "hover:bg-white/[0.05]"} ${ke ? "opacity-25 saturate-[0.3] italic" : ""}`,
                    children: [
                      /* @__PURE__ */ e("td", { className: "py-1 px-4", children: /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ e("div", { "data-drag-handle": "true", className: "shrink-0", children: Pt(E, "w-5 h-5") }),
                        /* @__PURE__ */ e("div", { className: "min-w-0 flex-1", children: j(E) }),
                        E.starred && /* @__PURE__ */ e(Ua, { className: "w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" }),
                        E.shareLink && /* @__PURE__ */ e(na, { className: "w-3.5 h-3.5 text-emerald-500 shrink-0" }),
                        !_e.allowed.read && /* @__PURE__ */ e("span", { title: "EACCES", className: "inline-flex", children: /* @__PURE__ */ e(Lr, { className: "w-3.5 h-3.5 text-rose-500 shrink-0" }) })
                      ] }) }),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 text-[11px] whitespace-nowrap ${Q ? "text-slate-500" : "text-neutral-400"}`,
                          children: new Date(E.updatedAt).toLocaleString(T.locale, {
                            dateStyle: "short",
                            timeStyle: "short"
                          })
                        }
                      ),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 whitespace-nowrap ${Q ? "text-slate-500" : "text-neutral-400"}`,
                          children: E.type === "folder" ? R.explorer.fileFolder : `${E.extension.toUpperCase().replace(".", "")} ${R.explorer.fileSuffix}`
                        }
                      ),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 text-right whitespace-nowrap ${Q ? "text-slate-700" : "text-neutral-300"}`,
                          children: ae.formatBytes(Xe)
                        }
                      ),
                      /* @__PURE__ */ e(
                        "td",
                        {
                          className: `py-1 px-3 truncate max-w-[140px] ${Q ? "text-slate-500" : "text-neutral-400"}`,
                          children: E.security.ownerName.split(" ")[0]
                        }
                      ),
                      T.showPosixBadgesOnItems && /* @__PURE__ */ e("td", { className: "py-1 px-3 whitespace-nowrap", children: /* @__PURE__ */ e(
                        "span",
                        {
                          className: `px-1.5 py-0.5 rounded font-mono text-[11px] border ${Q ? "bg-slate-100 border-slate-300 text-slate-700" : "bg-neutral-900 border-neutral-700 text-blue-300"}`,
                          children: _e.effectiveOctal
                        }
                      ) })
                    ]
                  },
                  E.id
                );
              }),
              Z > 0 && /* @__PURE__ */ e("tr", { style: { height: `${Z}px` }, children: /* @__PURE__ */ e("td", { colSpan: 6 }) })
            ] })
          ] }),
          G()
        ]
      }
    );
  }
  const ee = {
    extra_large_icons: {
      minColWidth: 152,
      rowHeight: 164,
      iconSize: "w-20 h-20",
      isHorizontal: !1
    },
    large_icons: {
      minColWidth: 122,
      rowHeight: 136,
      iconSize: "w-14 h-14",
      isHorizontal: !1
    },
    medium_icons: {
      minColWidth: 108,
      rowHeight: 118,
      iconSize: "w-10 h-10",
      isHorizontal: !1
    },
    small_icons: {
      minColWidth: 190,
      rowHeight: 40,
      iconSize: "w-5 h-5",
      isHorizontal: !0
    },
    list: {
      minColWidth: 220,
      rowHeight: 36,
      iconSize: "w-4 h-4",
      isHorizontal: !0
    },
    tiles: {
      minColWidth: 250,
      rowHeight: 68,
      iconSize: "w-11 h-11",
      isHorizontal: !0
    },
    content: {
      minColWidth: 9999,
      rowHeight: 64,
      iconSize: "w-10 h-10",
      isHorizontal: !0
    }
  }, le = ee[s] || ee.large_icons, W = (S) => {
    const ne = i.has(S.id), k = m.mode === "cut" && m.nodeIds.includes(S.id), N = S.type === "folder" ? ae.computeFolderSize(S.id, l) : S.size;
    return /* @__PURE__ */ t(
      "div",
      {
        "data-node-id": S.id,
        style: { minHeight: `${le.rowHeight - (le.isHorizontal ? 4 : 8)}px` },
        draggable: T.enableDragAndDrop && n !== S.id,
        onDragStart: (O) => {
          const Z = ne ? Array.from(i) : [S.id];
          ne || M(S.id, !1, !1), O.dataTransfer.effectAllowed = "move";
          const E = JSON.stringify(Z);
          O.dataTransfer.setData("application/filemangl-nodes", E), O.dataTransfer.setData("text/plain", E);
        },
        onDragOver: (O) => {
          S.type === "folder" && T.enableDragAndDrop && (O.preventDefault(), O.dataTransfer.dropEffect = "move", te(S.id));
        },
        onDragLeave: () => te(null),
        onDrop: async (O) => {
          var Z;
          if (te(null), S.type === "folder" && T.enableDragAndDrop) {
            if (O.preventDefault(), O.stopPropagation(), (Z = O.dataTransfer) != null && Z.files && O.dataTransfer.files.length > 0 && b) {
              const pe = await ta(O.dataTransfer);
              b(pe, S.id);
              return;
            }
            const E = O.dataTransfer.getData("application/filemangl-nodes") || O.dataTransfer.getData("text/plain");
            if (E)
              try {
                d(S.id, JSON.parse(E));
              } catch {
              }
          }
        },
        onClick: (O) => {
          var Z, E;
          if (O.stopPropagation(), ne && i.size === 1 && typeof window < "u" && ((E = (Z = window.matchMedia) == null ? void 0 : Z.call(window, "(pointer: coarse)")) != null && E.matches)) {
            v(S);
            return;
          }
          M(S.id, O.ctrlKey || O.metaKey, O.shiftKey);
        },
        onDoubleClick: (O) => {
          O.stopPropagation(), v(S);
        },
        onContextMenu: (O) => {
          O.preventDefault(), O.stopPropagation(), g(O, S);
        },
        className: `group relative rounded-[6px] border-0 transition-all duration-75 overflow-hidden ${le.isHorizontal ? "px-2.5 py-1.5 flex items-center gap-3" : "px-2 py-2 flex flex-col items-center text-center justify-start"} ${$ === S.id ? "bg-emerald-500/25 ring-2 ring-inset ring-emerald-400" : ne && !k ? Q ? "bg-[#cce8ff]/75" : "bg-white/[0.12]" : Q ? "bg-transparent hover:bg-slate-200/60" : "bg-transparent hover:bg-white/[0.06]"} ${k ? "opacity-25 saturate-[0.3] scale-[0.97] outline-1 outline-dashed outline-amber-400/50" : ""}`,
        children: [
          k && /* @__PURE__ */ e(
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
              className: le.isHorizontal ? "shrink-0" : "mb-1.5 shrink-0",
              children: Pt(S, le.iconSize)
            }
          ),
          /* @__PURE__ */ t("div", { className: le.isHorizontal ? "min-w-0 flex-1" : "w-full shrink-0", children: [
            j(S, "text-xs"),
            (s === "tiles" || s === "content") && /* @__PURE__ */ t(
              "div",
              {
                className: `text-[11px] mt-0.5 truncate ${Q ? "text-slate-500" : "text-neutral-400"}`,
                children: [
                  S.type === "folder" ? R.explorer.fileFolder : `${S.extension.toUpperCase().replace(".", "")} ${R.explorer.fileSuffix}`,
                  " ",
                  "• ",
                  ae.formatBytes(N)
                ]
              }
            )
          ] })
        ]
      },
      S.id
    );
  };
  if (c !== "none" && a.length <= 400) {
    const S = [];
    if (c === "date") {
      const k = [], N = [], O = [], Z = [], E = Date.now();
      a.forEach((ke, _e) => {
        const Xe = new Date(ke.updatedAt).getTime(), we = !!ke.isUserUploaded || !!ke.blobUrl || !Number.isNaN(Xe) && E - Xe < 20 * 3600 * 1e3, Re = _e % 10;
        ke.type === "folder" || we || Re < 3 ? k.push(ke) : Re < 5 ? N.push(ke) : Re < 8 ? O.push(ke) : Z.push(ke);
      }), k.sort((ke, _e) => ke.type === "folder" && _e.type !== "folder" ? -1 : ke.type !== "folder" && _e.type === "folder" ? 1 : ke.isUserUploaded && !_e.isUserUploaded ? -1 : !ke.isUserUploaded && _e.isUserUploaded ? 1 : 0);
      const pe = T.locale === "en" ? ["Today", "Yesterday", "Last week", "Earlier this month"] : T.locale === "de" ? ["Heute", "Gestern", "Letzte Woche", "Früher in diesem Monat"] : T.locale === "ru" ? ["Сегодня", "Вчера", "На прошлой неделе", "Ранее в этом месяце"] : ["Bugün", "Dün", "Geçen hafta", "Bu ayın başlarında"];
      k.length && S.push({ id: "g_today", title: pe[0], items: k }), N.length && S.push({ id: "g_yesterday", title: pe[1], items: N }), O.length && S.push({ id: "g_week", title: pe[2], items: O }), Z.length && S.push({ id: "g_older", title: pe[3], items: Z });
    } else {
      const k = a.filter((O) => O.type === "folder"), N = a.filter((O) => O.type !== "folder");
      k.length && S.push({ id: "g_folders", title: R.explorer.filterFolder, items: k }), N.length && S.push({ id: "g_files", title: R.explorer.filterDoc, items: N });
    }
    const ne = s === "content" ? 1 : Math.max(1, Math.floor((C.width - 36) / le.minColWidth));
    return /* @__PURE__ */ t(
      "div",
      {
        ref: X,
        onScroll: (k) => $e(k.currentTarget.scrollTop),
        onMouseDown: L,
        onDragOver: (k) => {
          var N, O;
          (O = (N = k.dataTransfer) == null ? void 0 : N.types) != null && O.includes("Files") && (k.preventDefault(), k.dataTransfer.dropEffect = "copy");
        },
        onDrop: async (k) => {
          var N;
          if ((N = k.dataTransfer) != null && N.files && k.dataTransfer.files.length > 0 && b) {
            k.preventDefault();
            const O = await ta(k.dataTransfer);
            b(O);
          }
        },
        onContextMenu: (k) => {
          k.target.closest("[data-node-id]") || (k.preventDefault(), g(k, void 0));
        },
        className: "relative w-full h-full overflow-auto select-none px-4 py-3 space-y-5",
        children: [
          S.map((k) => {
            const N = ge.has(k.id);
            return /* @__PURE__ */ t("div", { className: "space-y-2", children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => Ne((O) => {
                    const Z = new Set(O);
                    return Z.has(k.id) ? Z.delete(k.id) : Z.add(k.id), Z;
                  }),
                  className: `flex items-center gap-1.5 text-xs font-medium transition ${Q ? "text-slate-700 hover:text-slate-950" : "text-neutral-300 hover:text-white"}`,
                  children: [
                    N ? /* @__PURE__ */ e(gr, { className: "w-3.5 h-3.5 opacity-75" }) : /* @__PURE__ */ e(Ia, { className: "w-3.5 h-3.5 opacity-75" }),
                    /* @__PURE__ */ e("span", { children: k.title })
                  ]
                }
              ),
              !N && /* @__PURE__ */ e(
                "div",
                {
                  style: {
                    display: "grid",
                    gridTemplateColumns: `repeat(${ne}, minmax(0, 1fr))`,
                    gap: le.isHorizontal ? "4px" : "8px"
                  },
                  children: k.items.map((O) => W(O))
                }
              )
            ] }, k.id);
          }),
          G()
        ]
      }
    );
  }
  const de = s === "content" ? 1 : Math.max(1, Math.floor((C.width - 36) / le.minColWidth)), ve = Math.ceil(a.length / de), Ce = Math.max(0, Math.floor(ye / le.rowHeight) - 3), Ie = Math.min(
    ve,
    Math.ceil((ye + C.height) / le.rowHeight) + 4
  ), Y = Ce * de, ie = Math.min(a.length, Ie * de), Ee = a.slice(Y, ie), Oe = Math.max(C.height - 20, ve * le.rowHeight + 24), Le = Ce * le.rowHeight;
  return /* @__PURE__ */ t(
    "div",
    {
      ref: X,
      onScroll: (S) => $e(S.currentTarget.scrollTop),
      onMouseDown: L,
      onDragOver: (S) => {
        var ne, k;
        (k = (ne = S.dataTransfer) == null ? void 0 : ne.types) != null && k.includes("Files") && (S.preventDefault(), S.dataTransfer.dropEffect = "copy");
      },
      onDrop: async (S) => {
        var ne;
        if ((ne = S.dataTransfer) != null && ne.files && S.dataTransfer.files.length > 0 && b) {
          S.preventDefault();
          const k = await ta(S.dataTransfer);
          b(k);
        }
      },
      onContextMenu: (S) => {
        S.target.closest("[data-node-id]") || (S.preventDefault(), g(S, void 0));
      },
      className: "relative w-full h-full overflow-auto select-none p-4",
      children: [
        /* @__PURE__ */ e("div", { style: { height: `${Oe}px`, position: "relative" }, children: /* @__PURE__ */ e(
          "div",
          {
            style: {
              transform: `translate3d(0, ${Le}px, 0)`,
              display: "grid",
              gridTemplateColumns: `repeat(${de}, minmax(0, 1fr))`,
              gap: le.isHorizontal ? "4px" : "8px"
            },
            children: Ee.map((S) => W(S))
          }
        ) }),
        G()
      ]
    }
  );
}, mn = `
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
`, un = `
  precision mediump float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;
function ur(a, l, s) {
  const c = a.createShader(l);
  return c ? (a.shaderSource(c, s), a.compileShader(c), a.getShaderParameter(c, a.COMPILE_STATUS) ? c : (a.deleteShader(c), null)) : null;
}
function pn(a, l, s) {
  const c = ur(a, a.VERTEX_SHADER, l), i = ur(a, a.FRAGMENT_SHADER, s);
  if (!c || !i) return null;
  const m = a.createProgram();
  return !m || (a.attachShader(m, c), a.attachShader(m, i), a.linkProgram(m), !a.getProgramParameter(m, a.LINK_STATUS)) ? null : m;
}
const hn = ({
  nodes: a,
  allNodes: l,
  selectedIds: s,
  clipboard: c,
  config: i,
  onSelectNode: m,
  onSelectMany: n,
  onOpenNode: u,
  onContextMenuNode: x,
  onDropNodesIntoFolder: w,
  onInjectStressNodes: T,
  onClearStressNodes: M
}) => {
  const { dict: z } = sa(), v = i.theme === "light", g = je(null), B = je(null), [I, A] = P("large_icons"), [d, b] = P(null), [R, Q] = P(null), [X, $] = P(60), [te, se] = P(0), xe = je(null), [ye, $e] = P(null), [ge, Ne] = P({
    width: 1e3,
    height: 600
  });
  Ke(() => {
    const L = B.current;
    if (!L) return;
    const j = new ResizeObserver((G) => {
      for (const ee of G)
        Ne({
          width: Math.max(320, Math.floor(ee.contentRect.width)),
          height: Math.max(300, Math.floor(ee.contentRect.height))
        });
    });
    return j.observe(L), () => j.disconnect();
  }, []);
  const { cardRects: C, groupHeaders: _, totalContentHeight: ue } = Ma.useMemo(() => {
    const G = I === "tiles", ee = G ? 256 : 144, le = G ? 68 : 124, W = 12, de = G ? 10 : 12, ve = Math.max(280, ge.width - 36), Ce = Math.max(1, Math.floor((ve + W) / (ee + W))), Ie = G ? Math.min(320, Math.floor((ve - (Ce - 1) * W) / Ce)) : ee, Y = [], ie = [];
    if (I === "grouped") {
      const Le = [
        { cat: "folder", label: z.explorer.filterFolder },
        { cat: "image", label: z.explorer.filterImage },
        { cat: "code", label: z.explorer.filterCode },
        { cat: "document", label: z.explorer.filterDoc },
        { cat: "archive", label: "ZIP / Archive" },
        { cat: "data", label: "JSON / Data" },
        { cat: "video", label: "Video" },
        { cat: "audio", label: "Audio" },
        { cat: "binary", label: "Binary" }
      ];
      let S = 16;
      for (const ne of Le) {
        const k = a.filter((O) => O.category === ne.cat);
        if (k.length === 0) continue;
        ie.push({
          category: ne.cat,
          label: ne.label,
          count: k.length,
          y: S
        }), S += 32, k.forEach((O, Z) => {
          const E = Z % Ce, pe = Math.floor(Z / Ce);
          Y.push({
            node: O,
            x: 18 + E * (Ie + W),
            y: S + pe * (le + de),
            w: Ie,
            h: le
          });
        });
        const N = Math.ceil(k.length / Ce);
        S += N * (le + de) + 14;
      }
      return {
        cardRects: Y,
        groupHeaders: ie,
        totalContentHeight: Math.max(ge.height, S + 24)
      };
    }
    a.forEach((Le, S) => {
      const ne = S % Ce, k = Math.floor(S / Ce);
      Y.push({
        node: Le,
        x: 18 + ne * (Ie + W),
        y: 16 + k * (le + de),
        w: Ie,
        h: le
      });
    });
    const Oe = 32 + Math.ceil(a.length / Ce) * (le + de);
    return {
      cardRects: Y,
      groupHeaders: ie,
      totalContentHeight: Math.max(ge.height, Oe)
    };
  }, [a, I, ge, z]);
  Ke(() => {
    const L = (G) => {
      const ee = xe.current, le = B.current;
      if (!ee || !le) return;
      const W = Math.hypot(
        G.clientX - ee.startClientX,
        G.clientY - ee.startClientY
      );
      if (!ee.isDragging && W > 4 && (ee.isDragging = !0), !ee.isDragging) return;
      const de = le.getBoundingClientRect();
      G.clientY > de.bottom - 28 ? le.scrollTop += 18 : G.clientY < de.top + 28 && (le.scrollTop -= 18), ee.currentX = Math.max(0, G.clientX - de.left + le.scrollLeft), ee.currentY = Math.max(0, G.clientY - de.top + le.scrollTop);
      const ve = Math.min(ee.startX, ee.currentX), Ce = Math.max(ee.startX, ee.currentX), Ie = Math.min(ee.startY, ee.currentY), Y = Math.max(ee.startY, ee.currentY), ie = new Set(ee.additive ? ee.initialSelected : []);
      for (const Oe of C)
        Oe.x + Oe.w >= ve && Oe.x <= Ce && Oe.y + Oe.h >= Ie && Oe.y <= Y && ie.add(Oe.node.id);
      const Ee = Array.from(ie);
      n(Ee), $e({
        left: ve,
        top: Ie,
        width: Math.max(2, Ce - ve),
        height: Math.max(2, Y - Ie),
        count: Ee.length
      });
    }, j = () => {
      const G = xe.current;
      G && (G.isDragging || (G.clickedNodeId ? m(G.clickedNodeId, G.additive, G.shiftKey) : G.additive || n([])), xe.current = null, $e(null));
    };
    return window.addEventListener("mousemove", L), window.addEventListener("mouseup", j), () => {
      window.removeEventListener("mousemove", L), window.removeEventListener("mouseup", j);
    };
  }, [C, n, m]), Ke(() => {
    const L = g.current;
    if (!L) return;
    const j = L.getContext("webgl2", { antialias: !0 }) || L.getContext("webgl", { antialias: !0 });
    if (!j) return;
    const G = pn(j, mn, un);
    if (!G) return;
    const ee = j.getAttribLocation(G, "a_position"), le = j.getAttribLocation(G, "a_color"), W = j.getUniformLocation(G, "u_resolution"), de = j.createBuffer(), ve = j.createBuffer();
    let Ce = 0, Ie = 0, Y = performance.now();
    const ie = (Ee) => {
      Ie++, Ee - Y >= 500 && ($(Math.min(120, Math.round(Ie * 1e3 / (Ee - Y)))), Ie = 0, Y = Ee);
      const Oe = window.devicePixelRatio || 1, Le = Math.floor(ge.width * Oe), S = Math.floor(ge.height * Oe);
      (L.width !== Le || L.height !== S) && (L.width = Le, L.height = S), j.viewport(0, 0, L.width, L.height), v ? j.clearColor(0.973, 0.98, 0.988, 1) : j.clearColor(0.043, 0.063, 0.106, 1), j.clear(j.COLOR_BUFFER_BIT), j.enable(j.BLEND), j.blendFunc(j.SRC_ALPHA, j.ONE_MINUS_SRC_ALPHA), j.useProgram(G), j.uniform2f(W, ge.width, ge.height);
      const ne = C.filter(
        (Z) => Z.y + Z.h >= te - 40 && Z.y <= te + ge.height + 40
      ), k = [], N = [], O = (Z, E, pe, ke, _e, Xe, we, Re) => {
        const Ve = Z, bt = E, ct = Z + pe, lt = E + ke;
        k.push(Ve, bt, ct, bt, Ve, lt, Ve, lt, ct, bt, ct, lt);
        for (let xt = 0; xt < 6; xt++)
          N.push(_e, Xe, we, Re);
      };
      for (const Z of ne) {
        const E = Z.y - te, pe = (c == null ? void 0 : c.mode) === "cut" && c.nodeIds.includes(Z.node.id), ke = s.has(Z.node.id) && !pe, _e = d === Z.node.id;
        !ke && !_e || (v ? ke ? O(Z.x, E, Z.w, Z.h, 0.8, 0.91, 1, 0.85) : _e && O(Z.x, E, Z.w, Z.h, 0.88, 0.91, 0.94, 0.7) : ke ? O(Z.x, E, Z.w, Z.h, 1, 1, 1, 0.12) : _e && O(Z.x, E, Z.w, Z.h, 1, 1, 1, 0.06));
      }
      k.length > 0 && (j.bindBuffer(j.ARRAY_BUFFER, de), j.bufferData(j.ARRAY_BUFFER, new Float32Array(k), j.DYNAMIC_DRAW), j.enableVertexAttribArray(ee), j.vertexAttribPointer(ee, 2, j.FLOAT, !1, 0, 0), j.bindBuffer(j.ARRAY_BUFFER, ve), j.bufferData(j.ARRAY_BUFFER, new Float32Array(N), j.DYNAMIC_DRAW), j.enableVertexAttribArray(le), j.vertexAttribPointer(le, 4, j.FLOAT, !1, 0, 0), j.drawArrays(j.TRIANGLES, 0, k.length / 2)), Ce = requestAnimationFrame(ie);
    };
    return Ce = requestAnimationFrame(ie), () => cancelAnimationFrame(Ce);
  }, [C, s, c, d, ge, v, te, I]);
  const V = Ma.useMemo(
    () => C.filter(
      (L) => L.y + L.h >= te - 160 && L.y <= te + ge.height + 160
    ),
    [C, te, ge.height]
  ), y = l.filter((L) => L.isSyntheticStressNode).length, fe = I === "tiles";
  return /* @__PURE__ */ t("div", { className: "flex flex-col w-full h-full overflow-hidden select-none relative", children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: `flex-none px-3.5 py-1.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs z-20 ${v ? "bg-slate-100 border-slate-200 text-slate-700" : "bg-[#0e1525] border-slate-800/90 text-slate-200"}`,
        children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(Ra, { className: "w-3.5 h-3.5 text-emerald-500" }),
              /* @__PURE__ */ t("span", { className: "font-mono font-bold text-emerald-500", children: [
                "WebGL2 • ",
                X,
                " FPS"
              ] }),
              /* @__PURE__ */ t("span", { className: "opacity-65 font-mono text-[11px]", children: [
                "(",
                a.length.toLocaleString(i.locale),
                " ",
                z.explorer.itemsUnit,
                ")"
              ] })
            ] }),
            /* @__PURE__ */ e("div", { className: "h-3.5 w-px bg-slate-700/50" }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => A("large_icons"),
                  className: `px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${I === "large_icons" ? "bg-blue-600 text-white font-medium" : "opacity-75 hover:opacity-100"}`,
                  children: [
                    /* @__PURE__ */ e(Dl, { className: "w-3.5 h-3.5" }),
                    " ",
                    z.explorer.viewLarge.split(" (")[0]
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => A("tiles"),
                  className: `px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${I === "tiles" ? "bg-blue-600 text-white font-medium" : "opacity-75 hover:opacity-100"}`,
                  children: [
                    /* @__PURE__ */ e(Ll, { className: "w-3.5 h-3.5" }),
                    " ",
                    z.explorer.viewTiles.split(" (")[0]
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => A("grouped"),
                  className: `px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${I === "grouped" ? "bg-blue-600 text-white font-medium" : "opacity-75 hover:opacity-100"}`,
                  children: [
                    /* @__PURE__ */ e(Oa, { className: "w-3.5 h-3.5" }),
                    " ",
                    z.webgl.cluster
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(
              "button",
              {
                onClick: () => T(1500),
                className: "px-2.5 py-0.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1",
                children: [
                  /* @__PURE__ */ e(jt, { className: "w-3 h-3" }),
                  " ",
                  z.webgl.addNodes
                ]
              }
            ),
            y > 0 && /* @__PURE__ */ t(
              "button",
              {
                onClick: M,
                className: "px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 font-medium",
                children: [
                  z.webgl.clear,
                  " (",
                  y,
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
          ref: g,
          className: "absolute inset-0 w-full h-full block pointer-events-none z-0"
        }
      ),
      /* @__PURE__ */ e(
        "div",
        {
          ref: B,
          onScroll: (L) => se(L.currentTarget.scrollTop),
          onMouseDown: (L) => {
            if (L.button !== 0) return;
            const j = L.target;
            if (j.closest("button")) return;
            const G = B.current;
            if (!G) return;
            const ee = j.closest("[data-node-id]");
            if (ee ? ee.getAttribute("data-node-id") : null)
              return;
            const W = G.getBoundingClientRect(), de = L.clientX - W.left + G.scrollLeft, ve = L.clientY - W.top + G.scrollTop;
            xe.current = {
              startX: de,
              startY: ve,
              currentX: de,
              currentY: ve,
              startClientX: L.clientX,
              startClientY: L.clientY,
              isDragging: !1,
              additive: L.ctrlKey || L.metaKey,
              initialSelected: new Set(s),
              clickedNodeId: null,
              shiftKey: L.shiftKey
            };
          },
          onContextMenu: (L) => {
            L.target.closest("[data-node-id]") || (L.preventDefault(), x(L, void 0));
          },
          className: "relative z-10 w-full h-full overflow-y-auto overflow-x-hidden",
          children: /* @__PURE__ */ t("div", { style: { height: `${ue}px`, position: "relative" }, children: [
            _.map((L) => /* @__PURE__ */ t(
              "div",
              {
                style: {
                  transform: `translate3d(18px, ${L.y}px, 0)`,
                  right: "18px"
                },
                className: "absolute top-0 left-0 flex items-center gap-2 pb-1",
                children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: `text-xs font-bold ${v ? "text-slate-700" : "text-slate-200"}`,
                      children: L.label
                    }
                  ),
                  /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-blue-400", children: [
                    "(",
                    L.count,
                    ")"
                  ] })
                ]
              },
              L.category
            )),
            V.map((L) => {
              const j = s.has(L.node.id), G = (c == null ? void 0 : c.mode) === "cut" && c.nodeIds.includes(L.node.id), ee = L.node.type === "folder" ? ae.computeFolderSize(L.node.id, l) : L.node.size, le = R === L.node.id;
              return /* @__PURE__ */ t(
                "div",
                {
                  "data-node-id": L.node.id,
                  draggable: i.enableDragAndDrop,
                  onMouseEnter: () => b(L.node.id),
                  onMouseLeave: () => b((W) => W === L.node.id ? null : W),
                  onClick: (W) => {
                    W.stopPropagation(), m(L.node.id, W.ctrlKey || W.metaKey, W.shiftKey);
                  },
                  onDoubleClick: (W) => {
                    W.stopPropagation(), u(L.node);
                  },
                  onContextMenu: (W) => {
                    W.preventDefault(), W.stopPropagation(), x(W, L.node);
                  },
                  onDragStart: (W) => {
                    if (!i.enableDragAndDrop) return;
                    const de = j ? Array.from(s) : [L.node.id];
                    j || m(L.node.id, !1, !1), W.dataTransfer.effectAllowed = "move", W.dataTransfer.setData(
                      "application/filemangl-nodes",
                      JSON.stringify(de)
                    ), W.dataTransfer.setData("text/plain", JSON.stringify(de));
                  },
                  onDragOver: (W) => {
                    !i.enableDragAndDrop || L.node.type !== "folder" || (W.preventDefault(), W.dataTransfer.dropEffect = "move", Q(L.node.id));
                  },
                  onDragLeave: () => {
                    R === L.node.id && Q(null);
                  },
                  onDrop: (W) => {
                    if (!(!i.enableDragAndDrop || L.node.type !== "folder")) {
                      W.preventDefault(), W.stopPropagation(), Q(null);
                      try {
                        const de = W.dataTransfer.getData("application/filemangl-nodes") || W.dataTransfer.getData("text/plain");
                        if (!de) return;
                        const ve = JSON.parse(de);
                        Array.isArray(ve) && ve.length > 0 && w && w(L.node.id, ve);
                      } catch {
                      }
                    }
                  },
                  style: {
                    transform: `translate3d(${Math.round(L.x)}px, ${Math.round(L.y)}px, 0)`,
                    width: `${Math.round(L.w)}px`,
                    height: `${Math.round(L.h)}px`
                  },
                  className: `absolute top-0 left-0 rounded-xl overflow-hidden cursor-default transition-opacity ${fe ? "px-3 py-2 flex items-center gap-3 text-left" : "px-2.5 py-2.5 flex flex-col items-center justify-center text-center"} ${le ? "ring-2 ring-emerald-400 bg-emerald-500/20" : ""} ${G ? "opacity-25 saturate-[0.3] outline-1 outline-dashed outline-amber-400/50" : ""}`,
                  children: [
                    G && /* @__PURE__ */ e("div", { className: "absolute top-1 left-1.5 pointer-events-none", children: /* @__PURE__ */ e(
                      "span",
                      {
                        className: "material-symbols-outlined text-amber-400",
                        style: { fontSize: "13px" },
                        children: "content_cut"
                      }
                    ) }),
                    (L.node.starred || L.node.shareLink) && /* @__PURE__ */ t("div", { className: "absolute top-1.5 right-1.5 flex items-center gap-0.5 pointer-events-none", children: [
                      L.node.starred && /* @__PURE__ */ e(Ua, { className: "w-3 h-3 text-amber-400 fill-amber-400" }),
                      L.node.shareLink && /* @__PURE__ */ e(na, { className: "w-3 h-3 text-emerald-400" })
                    ] }),
                    /* @__PURE__ */ e("div", { className: fe ? "shrink-0" : "mb-1.5 shrink-0", children: Pt(
                      L.node,
                      fe ? "w-10 h-10" : "w-11 h-11"
                    ) }),
                    /* @__PURE__ */ t("div", { className: fe ? "min-w-0 flex-1" : "w-full overflow-hidden", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          title: L.node.name,
                          className: `w-full block text-xs font-medium leading-snug line-clamp-2 break-words [overflow-wrap:anywhere] ${j ? v ? "text-blue-700 font-semibold" : "text-white font-semibold" : v ? "text-slate-800" : "text-slate-100"}`,
                          children: L.node.name
                        }
                      ),
                      /* @__PURE__ */ e(
                        "div",
                        {
                          className: `text-[10px] mt-0.5 truncate ${v ? "text-slate-500" : "text-slate-400"}`,
                          children: fe ? `${L.node.type === "folder" ? z.explorer.fileFolder : `${L.node.extension.toUpperCase().replace(".", "")} ${z.explorer.fileSuffix}`} • ${ae.formatBytes(ee)}` : ae.formatBytes(ee)
                        }
                      )
                    ] })
                  ]
                },
                L.node.id
              );
            }),
            ye && /* @__PURE__ */ e(
              "div",
              {
                style: {
                  left: ye.left,
                  top: ye.top,
                  width: ye.width,
                  height: ye.height
                },
                className: "absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none rounded-md z-30 shadow-lg",
                children: ye.count > 0 && /* @__PURE__ */ t(
                  "span",
                  {
                    style: { color: "#ffffff" },
                    className: "absolute -top-6 left-0 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-mono font-bold shadow whitespace-nowrap",
                    children: [
                      ye.count,
                      " ",
                      z.explorer.selectedBadge
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
}, fn = {
  folder: [0.92, 0.58, 0.12],
  image: [0.88, 0.29, 0.58],
  code: [0.23, 0.51, 0.96],
  document: [0.06, 0.72, 0.51],
  archive: [0.95, 0.45, 0.12],
  video: [0.55, 0.36, 0.96],
  data: [0.04, 0.68, 0.82],
  audio: [0.88, 0.66, 0.05],
  binary: [0.42, 0.48, 0.58]
}, bn = {
  folder: [0.96, 0.66, 0.18],
  image: [0.93, 0.36, 0.64],
  code: [0.26, 0.56, 0.98],
  document: [0.1, 0.76, 0.56],
  archive: [0.97, 0.52, 0.18],
  video: [0.6, 0.42, 0.97],
  data: [0.08, 0.72, 0.86],
  audio: [0.93, 0.72, 0.12],
  binary: [0.5, 0.56, 0.66]
}, xn = `
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
`, yn = `
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
`, gn = ({
  allNodes: a,
  currentFolderId: l,
  selectedIds: s,
  config: c,
  onSelectNode: i,
  onOpenNode: m
}) => {
  const n = c.theme === "light", u = je(null), x = je(null), [w, T] = P(null), [M, z] = P("smart_hierarchy"), [v, g] = P({ width: 960, height: 520 });
  Ke(() => {
    const d = x.current;
    if (!d) return;
    const b = new ResizeObserver((R) => {
      for (const Q of R)
        g({
          width: Math.max(320, Math.floor(Q.contentRect.width)),
          height: Math.max(260, Math.floor(Q.contentRect.height))
        });
    });
    return b.observe(d), () => b.disconnect();
  }, []);
  const B = We(() => {
    let d = [];
    if (M === "smart_hierarchy" ? d = a.filter(
      ($) => !$.trashed && $.parentId === l
    ).map(($) => ({
      node: $,
      bytes: $.type === "folder" ? Math.max(512 * 1024, ae.computeFolderSize($.id, a)) : $.size
    })).filter(($) => $.bytes > 0).sort(($, te) => te.bytes - $.bytes).slice(0, 180) : d = a.filter(($) => !$.trashed && $.type !== "folder" && $.size > 0).map(($) => ({ node: $, bytes: $.size })).sort(($, te) => te.bytes - $.bytes).slice(0, 260), d.length === 0) return [];
    const b = [], R = n ? 4 : 3, Q = (X, $, te, se, xe, ye) => {
      if (X.length === 0 || se <= 6 || xe <= 6) return;
      if (X.length === 1) {
        b.push({
          node: X[0].node,
          bytes: X[0].bytes,
          x: $ + R,
          y: te + R,
          w: Math.max(4, se - R * 2),
          h: Math.max(4, xe - R * 2)
        });
        return;
      }
      const $e = X.reduce((y, fe) => y + fe.bytes, 0);
      let ge = 0, Ne = 0;
      for (let y = 0; y < X.length; y++)
        if (ge += X[y].bytes, ge >= $e / 2) {
          Ne = Math.max(1, y + 1);
          break;
        }
      Ne >= X.length && (Ne = X.length - 1);
      const C = X.slice(0, Ne), _ = X.slice(Ne), ue = C.reduce((y, fe) => y + fe.bytes, 0), V = $e > 0 ? ue / $e : 0.5;
      if (ye) {
        const y = se * V;
        Q(C, $, te, y, xe, !ye), Q(_, $ + y, te, se - y, xe, !ye);
      } else {
        const y = xe * V;
        Q(C, $, te, se, y, !ye), Q(_, $, te + y, se, xe - y, !ye);
      }
    };
    return Q(d, 12, 12, v.width - 24, v.height - 24, v.width >= v.height), b;
  }, [a, l, M, v.width, v.height, n]);
  Ke(() => {
    const d = u.current;
    if (!d) return;
    const b = d.getContext("webgl", { antialias: !0, alpha: !1 });
    if (!b) return;
    const R = (y, fe) => {
      const L = b.createShader(y);
      return L ? (b.shaderSource(L, fe), b.compileShader(L), L) : null;
    }, Q = R(b.VERTEX_SHADER, xn), X = R(b.FRAGMENT_SHADER, yn);
    if (!Q || !X) return;
    const $ = b.createProgram();
    if (!$) return;
    b.attachShader($, Q), b.attachShader($, X), b.linkProgram($), b.useProgram($);
    const te = b.getAttribLocation($, "a_position"), se = b.getAttribLocation($, "a_uv"), xe = b.getAttribLocation($, "a_color"), ye = b.getAttribLocation($, "a_highlight"), $e = b.getUniformLocation($, "u_resolution"), ge = b.getUniformLocation($, "u_time"), Ne = b.getUniformLocation($, "u_isLight"), C = b.createBuffer();
    b.bindBuffer(b.ARRAY_BUFFER, C);
    const _ = 32;
    b.enableVertexAttribArray(te), b.vertexAttribPointer(te, 2, b.FLOAT, !1, _, 0), b.enableVertexAttribArray(se), b.vertexAttribPointer(se, 2, b.FLOAT, !1, _, 8), b.enableVertexAttribArray(xe), b.vertexAttribPointer(xe, 3, b.FLOAT, !1, _, 16), b.enableVertexAttribArray(ye), b.vertexAttribPointer(ye, 1, b.FLOAT, !1, _, 28), b.enable(b.BLEND), b.blendFunc(b.SRC_ALPHA, b.ONE_MINUS_SRC_ALPHA);
    let ue = 0;
    const V = (y) => {
      const fe = window.devicePixelRatio || 1, L = Math.floor(v.width * fe), j = Math.floor(v.height * fe);
      if ((d.width !== L || d.height !== j) && (d.width = L, d.height = j), b.viewport(0, 0, d.width, d.height), n ? b.clearColor(0.945, 0.961, 0.976, 1) : b.clearColor(0.04, 0.06, 0.095, 1), b.clear(b.COLOR_BUFFER_BIT), b.uniform2f($e, v.width, v.height), b.uniform1f(ge, y * 1e-3), b.uniform1f(Ne, n ? 1 : 0), B.length > 0) {
        const G = n ? bn : fn, ee = new Float32Array(B.length * 6 * 8);
        let le = 0;
        for (const W of B) {
          const de = G[W.node.category] || [0.4, 0.5, 0.6];
          let ve = 0;
          s.has(W.node.id) ? ve = 2 : (w == null ? void 0 : w.node.id) === W.node.id && (ve = 1);
          const Ce = W.x, Ie = W.y, Y = W.x + W.w, ie = W.y + W.h, Ee = (Oe, Le, S, ne) => {
            ee[le++] = Oe, ee[le++] = Le, ee[le++] = S, ee[le++] = ne, ee[le++] = de[0], ee[le++] = de[1], ee[le++] = de[2], ee[le++] = ve;
          };
          Ee(Ce, Ie, 0, 0), Ee(Y, Ie, 1, 0), Ee(Ce, ie, 0, 1), Ee(Ce, ie, 0, 1), Ee(Y, Ie, 1, 0), Ee(Y, ie, 1, 1);
        }
        b.bufferData(b.ARRAY_BUFFER, ee, b.DYNAMIC_DRAW), b.drawArrays(b.TRIANGLES, 0, B.length * 6);
      }
      ue = requestAnimationFrame(V);
    };
    return ue = requestAnimationFrame(V), () => {
      cancelAnimationFrame(ue), b.deleteBuffer(C), b.deleteProgram($);
    };
  }, [B, w, s, v, n]);
  const I = ae.computeTotalVolumeUsed(a), A = ae.getCategoryBreakdown(a, c.totalDiskQuotaBytes);
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
                    children: /* @__PURE__ */ e($a, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ t("h3", { className: "text-xs font-bold", children: [
                      "WebGL 3D Cushion Disk Treemap (",
                      c.volumeName,
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
                      ae.formatBytes(I),
                      " /",
                      " ",
                      ae.formatBytes(c.totalDiskQuotaBytes)
                    ] }),
                    " ",
                    "(",
                    (I / Math.max(1, c.totalDiskQuotaBytes) * 100).toFixed(1),
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
                          onClick: () => z("smart_hierarchy"),
                          className: `px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${M === "smart_hierarchy" ? "bg-blue-600 text-white shadow-sm" : n ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`,
                          title: "Aktif dizindeki klasör ve dosyaları hiyerarşik boyuta göre göster",
                          children: [
                            /* @__PURE__ */ e(Sl, { className: "w-3 h-3" }),
                            " Bu Dizin Hiyerarşisi"
                          ]
                        }
                      ),
                      /* @__PURE__ */ t(
                        "button",
                        {
                          onClick: () => z("all_files"),
                          className: `px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${M === "all_files" ? "bg-blue-600 text-white shadow-sm" : n ? "text-slate-600 hover:text-slate-900" : "text-slate-400 hover:text-white"}`,
                          title: "Diskteki en büyük bireysel dosyaları göster",
                          children: [
                            /* @__PURE__ */ e(Oa, { className: "w-3 h-3" }),
                            " En Büyük Dosyalar"
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ e("div", { className: "hidden xl:flex flex-wrap items-center gap-2.5 text-[11px]", children: A.slice(0, 5).map((d) => /* @__PURE__ */ t("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-sm inline-block shadow-sm",
                      style: { backgroundColor: d.color }
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "font-medium", children: d.label.split(" ")[0] }),
                  /* @__PURE__ */ t("span", { className: "font-mono opacity-60", children: [
                    "(",
                    ae.formatBytes(d.bytes),
                    ")"
                  ] })
                ] }, d.category)) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ t(
          "div",
          {
            ref: x,
            onMouseMove: (d) => {
              var $;
              const b = ($ = x.current) == null ? void 0 : $.getBoundingClientRect();
              if (!b) return;
              const R = d.clientX - b.left, Q = d.clientY - b.top, X = B.find(
                (te) => R >= te.x && R <= te.x + te.w && Q >= te.y && Q <= te.y + te.h
              );
              T(X || null);
            },
            onMouseLeave: () => T(null),
            onClick: () => {
              w && i(w.node.id, !1, !1);
            },
            onDoubleClick: () => {
              w && m(w.node);
            },
            className: "relative flex-1 overflow-hidden cursor-pointer",
            children: [
              /* @__PURE__ */ e("canvas", { ref: u, className: "absolute inset-0 w-full h-full block" }),
              /* @__PURE__ */ e("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: B.slice(0, 100).map((d) => d.w < 72 || d.h < 40 ? null : /* @__PURE__ */ t(
                "div",
                {
                  style: {
                    left: Math.round(d.x),
                    top: Math.round(d.y),
                    width: Math.round(d.w),
                    height: Math.round(d.h)
                  },
                  className: "absolute p-2.5 flex flex-col justify-between overflow-hidden",
                  children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-1", children: [
                      /* @__PURE__ */ e(
                        "span",
                        {
                          style: { color: "#ffffff" },
                          className: "text-[11px] font-semibold truncate px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-[2px] shadow-sm",
                          children: d.node.type === "folder" ? `📁 ${d.node.name}` : d.node.name
                        }
                      ),
                      d.node.security.locked && /* @__PURE__ */ e("span", { className: "p-1 rounded-full bg-black/35", children: /* @__PURE__ */ e(ft, { className: "w-3 h-3 text-white shrink-0" }) })
                    ] }),
                    d.h >= 58 && /* @__PURE__ */ e("div", { className: "flex items-center justify-start", children: /* @__PURE__ */ e(
                      "span",
                      {
                        style: { color: "#ffffff" },
                        className: "text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-black/30",
                        children: ae.formatBytes(d.bytes)
                      }
                    ) })
                  ]
                },
                d.node.id
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
                          children: ae.formatBytes(w.bytes)
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
                          (w.bytes / Math.max(1, c.totalDiskQuotaBytes) * 100).toFixed(2),
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
}, vn = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`, wn = `
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
function Da(a) {
  const l = a.replace("#", ""), s = parseInt(l, 16) || 3900150;
  return [(s >> 16 & 255) / 255, (s >> 8 & 255) / 255, (s & 255) / 255];
}
const kn = ({
  node: a,
  canWrite: l,
  writeDenialReason: s,
  onClose: c,
  onSaveAsNewFile: i
}) => {
  var ye, $e, ge, Ne, C, _, ue;
  const m = !!(a.blobUrl || a.thumbnailUrl), n = je(null), [u, x] = P(0), [w, T] = P(m ? 1 : 1.05), [M, z] = P(m ? 1 : 1.15), [v, g] = P(m ? 0 : 0.15), [B, I] = P(m ? 0 : 0.35), [A, d] = P(!1), [b, R] = P(!1), [Q, X] = P(!1), $ = ((ye = a.imageMeta) == null ? void 0 : ye.pattern) === "cybergrid" ? 1 : (($e = a.imageMeta) == null ? void 0 : $e.pattern) === "aurora" ? 2 : ((ge = a.imageMeta) == null ? void 0 : ge.pattern) === "prism" ? 3 : 0;
  Ke(() => {
    var Le;
    const V = n.current;
    if (!V) return;
    const y = V.getContext("webgl", { preserveDrawingBuffer: !0 });
    if (!y) return;
    const fe = (S, ne) => {
      const k = y.createShader(S);
      return k ? (y.shaderSource(k, ne), y.compileShader(k), k) : null;
    }, L = fe(y.VERTEX_SHADER, vn), j = fe(y.FRAGMENT_SHADER, wn);
    if (!L || !j) return;
    const G = y.createProgram();
    if (!G) return;
    y.attachShader(G, L), y.attachShader(G, j), y.linkProgram(G), y.useProgram(G);
    const ee = y.createBuffer();
    y.bindBuffer(y.ARRAY_BUFFER, ee), y.bufferData(
      y.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      y.STATIC_DRAW
    );
    const le = y.getAttribLocation(G, "a_position");
    y.enableVertexAttribArray(le), y.vertexAttribPointer(le, 2, y.FLOAT, !1, 0, 0);
    const W = y.createTexture();
    let de = 0;
    const ve = a.blobUrl || a.thumbnailUrl;
    if (ve && W && typeof Image < "u") {
      const S = new Image();
      S.crossOrigin = "anonymous", S.onload = () => {
        y.bindTexture(y.TEXTURE_2D, W), y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL, 1), y.texParameteri(y.TEXTURE_2D, y.TEXTURE_WRAP_S, y.CLAMP_TO_EDGE), y.texParameteri(y.TEXTURE_2D, y.TEXTURE_WRAP_T, y.CLAMP_TO_EDGE), y.texParameteri(y.TEXTURE_2D, y.TEXTURE_MIN_FILTER, y.LINEAR), y.texParameteri(y.TEXTURE_2D, y.TEXTURE_MAG_FILTER, y.LINEAR), y.texImage2D(y.TEXTURE_2D, 0, y.RGBA, y.RGBA, y.UNSIGNED_BYTE, S), de = 1, X(!0);
      }, S.src = ve;
    }
    const Ce = ((Le = a.imageMeta) == null ? void 0 : Le.palette) || ["#0ea5e9", "#6366f1", "#ec4899"], Ie = Da(Ce[0]), Y = Da(Ce[1]), ie = Da(Ce[2]);
    let Ee = 0;
    const Oe = (S) => {
      y.viewport(0, 0, V.width, V.height), y.useProgram(G), de === 1 && W && (y.activeTexture(y.TEXTURE0), y.bindTexture(y.TEXTURE_2D, W), y.uniform1i(y.getUniformLocation(G, "u_tex"), 0)), y.uniform1i(y.getUniformLocation(G, "u_hasTexture"), de), y.uniform1f(y.getUniformLocation(G, "u_time"), S * 1e-3), y.uniform1f(
        y.getUniformLocation(G, "u_exposure"),
        b ? 0 : u
      ), y.uniform1f(
        y.getUniformLocation(G, "u_contrast"),
        b ? 1 : w
      ), y.uniform1f(
        y.getUniformLocation(G, "u_saturation"),
        b ? 1 : M
      ), y.uniform1f(
        y.getUniformLocation(G, "u_aberration"),
        b ? 0 : v
      ), y.uniform1f(
        y.getUniformLocation(G, "u_vignette"),
        b ? 0 : B
      ), y.uniform1i(y.getUniformLocation(G, "u_pattern"), $), y.uniform1i(
        y.getUniformLocation(G, "u_edgeDetect"),
        b ? 0 : A ? 1 : 0
      ), y.uniform3f(y.getUniformLocation(G, "u_c1"), Ie[0], Ie[1], Ie[2]), y.uniform3f(y.getUniformLocation(G, "u_c2"), Y[0], Y[1], Y[2]), y.uniform3f(y.getUniformLocation(G, "u_c3"), ie[0], ie[1], ie[2]), y.drawArrays(y.TRIANGLES, 0, 6), Ee = requestAnimationFrame(Oe);
    };
    return Ee = requestAnimationFrame(Oe), () => {
      cancelAnimationFrame(Ee), W && y.deleteTexture(W), y.deleteBuffer(ee), y.deleteProgram(G);
    };
  }, [
    u,
    w,
    M,
    v,
    B,
    A,
    b,
    $,
    a
  ]);
  const te = () => {
    x(0), T(m ? 1 : 1.05), z(m ? 1 : 1.15), g(m ? 0 : 0.15), I(m ? 0 : 0.35), d(!1);
  }, se = () => {
    const V = n.current;
    if (!V) return { byteSize: Math.round(a.size * 0.85) };
    try {
      const y = V.toDataURL("image/png");
      if (y && y.startsWith("data:image/")) {
        const fe = y.indexOf(","), L = Math.round(fe !== -1 ? (y.length - fe - 1) * 3 / 4 : a.size * 0.85);
        return { dataUrl: y, byteSize: Math.max(1024, L) };
      }
    } catch {
    }
    return {
      dataUrl: a.thumbnailUrl || a.blobUrl,
      byteSize: Math.round(a.size * 0.85)
    };
  }, xe = () => {
    const { dataUrl: V } = se(), y = V || a.blobUrl || a.thumbnailUrl;
    if (!y) return;
    const fe = document.createElement("a"), L = a.name.replace(/\.[^/.]+$/, "");
    fe.href = y, fe.download = `${L}_shader_render.png`, fe.click();
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0e1420] border border-slate-700/80 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400", children: /* @__PURE__ */ e(jt, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white", children: a.name }),
            /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/20 text-blue-300 border border-blue-500/30", children: "WebGL GLSL Fragment Pipeline" }),
            m && /* @__PURE__ */ t("span", { className: "px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1", children: [
              /* @__PURE__ */ e(Cl, { className: "w-3 h-3" }),
              Q ? "GPU 2D TEXTURE BOUND" : "YEREL GÖRSEL DOKUSU"
            ] })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-400 font-mono", children: [
            ((Ne = a.imageMeta) == null ? void 0 : Ne.width) || 3840,
            "×",
            ((C = a.imageMeta) == null ? void 0 : C.height) || 2160,
            "px •",
            " ",
            ae.formatBytes(a.size),
            " • Checksum:",
            " ",
            a.checksumSha256.slice(0, 16),
            "..."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        m && /* @__PURE__ */ e(
          "button",
          {
            onMouseDown: () => R(!0),
            onMouseUp: () => R(!1),
            onMouseLeave: () => R(!1),
            className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-medium transition",
            title: "Orijinal fotoğrafı görmek için basılı tutun",
            children: b ? "Orijinal Gösteriliyor" : "Orijinal ile Karşılaştır (Basılı Tut)"
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: c,
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
            width: (_ = a.imageMeta) != null && _.width ? Math.min(1280, a.imageMeta.width) : 860,
            height: (ue = a.imageMeta) != null && ue.height ? Math.min(720, a.imageMeta.height) : 480,
            className: "w-full h-full max-h-[460px] object-contain rounded-xl border border-slate-800 shadow-2xl"
          }
        ),
        /* @__PURE__ */ t("div", { className: "absolute top-6 left-6 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-emerald-400", children: [
          /* @__PURE__ */ e(Ra, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ e("span", { children: m ? "GPU Real-Time 2D Texture Sampler (sampler2D u_tex)" : "GPU Real-Time Fragment Shader (highp float)" })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "p-5 bg-slate-900/60 border-l border-slate-800 flex flex-col justify-between overflow-y-auto space-y-5", children: [
        /* @__PURE__ */ t("div", { className: "space-y-4", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ t("h4", { className: "text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ e(Mr, { className: "w-3.5 h-3.5 text-blue-400" }),
              " GLSL Shader Parametreleri"
            ] }),
            /* @__PURE__ */ t(
              "button",
              {
                onClick: te,
                className: "text-xs text-slate-400 hover:text-white flex items-center gap-1",
                children: [
                  /* @__PURE__ */ e(Pl, { className: "w-3 h-3" }),
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
                onChange: (V) => x(parseFloat(V.target.value)),
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
                onChange: (V) => T(parseFloat(V.target.value)),
                className: "w-full accent-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-slate-300", children: "Doygunluk (u_saturation)" }),
              /* @__PURE__ */ t("span", { className: "font-mono text-blue-400", children: [
                M.toFixed(2),
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
                value: M,
                onChange: (V) => z(parseFloat(V.target.value)),
                className: "w-full accent-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ e("span", { className: "text-slate-300", children: "Kromatik Sapma (u_aberration)" }),
              /* @__PURE__ */ e("span", { className: "font-mono text-pink-400", children: v.toFixed(2) })
            ] }),
            /* @__PURE__ */ e(
              "input",
              {
                type: "range",
                min: "0.0",
                max: "2.0",
                step: "0.05",
                value: v,
                onChange: (V) => g(parseFloat(V.target.value)),
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
                onChange: (V) => I(parseFloat(V.target.value)),
                className: "w-full accent-blue-500"
              }
            )
          ] }),
          /* @__PURE__ */ e("div", { className: "pt-2", children: /* @__PURE__ */ t("label", { className: "flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer bg-slate-800/70 p-2.5 rounded-lg border border-slate-700", children: [
            /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                checked: A,
                onChange: (V) => d(V.target.checked),
                className: "rounded accent-blue-500"
              }
            ),
            /* @__PURE__ */ e(Nr, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ e("span", { children: "GLSL Sobel Kenar Algılama (Edge-Detect Pass)" })
          ] }) })
        ] }),
        /* @__PURE__ */ t("div", { className: "pt-4 border-t border-slate-800 space-y-2", children: [
          !l && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-300 flex items-start gap-2", children: [
            /* @__PURE__ */ e(Lr, { className: "w-4 h-4 text-rose-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ e("span", { children: s || "Bu dizine yazma yetkiniz bulunmuyor." })
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              disabled: !l,
              onClick: () => {
                const V = a.name.replace(/\.[^/.]+$/, ""), { dataUrl: y, byteSize: fe } = se();
                i(
                  `${V}_shader_render.png`,
                  `GLSL Render (exp=${u}, con=${w}, sat=${M})`,
                  fe,
                  y
                ), c();
              },
              className: `w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition ${l ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25" : "bg-slate-800 text-slate-500 cursor-not-allowed"}`,
              children: [
                /* @__PURE__ */ e(Dr, { className: "w-4 h-4" }),
                "Shader Çıktısını Diske Yeni Dosya Olarak Kaydet"
              ]
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: xe,
              className: "w-full py-2 px-4 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center justify-center gap-2 transition",
              children: [
                /* @__PURE__ */ e(kr, { className: "w-3.5 h-3.5 text-cyan-400" }),
                "İşlenmiş Görseli Bilgisayara İndir (.PNG)"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}, Nn = {
  read: "Okuma (Read)",
  write: "Yazma (Write)",
  delete: "Silme (Delete)",
  rename: "Ad Değiştir (Rename)",
  upload: "Yükleme (Upload)",
  download: "İndirme (Download)",
  share: "Paylaşım (Share)",
  chmod: "İzin Yönetimi (Chmod)",
  lock: "Kilitleme (Lock)"
}, Sn = ({
  node: a,
  allNodes: l,
  currentUser: s,
  config: c,
  onClose: i,
  onSaveSecurity: m
}) => {
  const [n, u] = P("acl"), [x, w] = P(
    () => JSON.parse(JSON.stringify(a.security))
  ), [T, M] = P(!1), [z, v] = P("role:editor"), [g, B] = P("allow"), [I, A] = P(s.id), b = ce.evaluateNodePermissions(
    a,
    s,
    l,
    c
  ).allowed.chmod, R = (C, _, ue) => {
    const V = ce.syncPosix({
      owner: C === "owner" ? { ...x.posix.owner, [_]: ue } : x.posix.owner,
      group: C === "group" ? { ...x.posix.group, [_]: ue } : x.posix.group,
      others: C === "others" ? { ...x.posix.others, [_]: ue } : x.posix.others
    });
    w((y) => ({ ...y, posix: V }));
  }, Q = (C) => {
    const _ = ce.buildPosixFromOctal(C);
    w((ue) => ({ ...ue, posix: _ }));
  }, X = () => {
    var y;
    const [C, _] = z.split(":"), ue = C === "role" ? `Role: ${_.toUpperCase()}` : `User: ${((y = ht.find((fe) => fe.id === _)) == null ? void 0 : y.name) || _}`, V = {
      id: `acl_${Date.now()}`,
      subjectType: C,
      subjectId: _,
      subjectLabel: ue,
      effect: g,
      permissions: {
        read: !0,
        write: g === "allow",
        delete: !1,
        rename: g === "allow",
        upload: g === "allow",
        download: !0,
        share: !1,
        chmod: !1,
        lock: !1
      }
    };
    w((fe) => ({
      ...fe,
      acl: [...fe.acl, V]
    }));
  }, $ = (C, _) => {
    w((ue) => ({
      ...ue,
      acl: ue.acl.map(
        (V) => V.id === C ? { ...V, permissions: { ...V.permissions, [_]: !V.permissions[_] } } : V
      )
    }));
  }, te = (C) => {
    w((_) => ({
      ..._,
      acl: _.acl.filter((ue) => ue.id !== C)
    }));
  }, se = x.quota || {
    maxBytes: null,
    maxFileSizeBytes: null,
    allowedExtensions: [],
    blockedExtensions: []
  }, xe = (C) => {
    w((_) => ({
      ..._,
      quota: {
        ...se,
        ...C
      }
    }));
  }, ye = { ...a, security: x }, $e = ht.find((C) => C.id === I) || s, ge = ce.evaluateNodePermissions(
    ye,
    $e,
    l,
    c
  ), Ne = a.type === "folder" ? ae.computeFolderSize(a.id, l) : a.size;
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-slate-700/90 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ t("div", { className: "px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ e("div", { className: "p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400", children: /* @__PURE__ */ e(Aa, { className: "w-5 h-5" }) }),
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
            /* @__PURE__ */ e(Bl, { className: "w-4 h-4" }),
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
            /* @__PURE__ */ e(zr, { className: "w-4 h-4" }),
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
            /* @__PURE__ */ e($a, { className: "w-4 h-4" }),
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
            /* @__PURE__ */ e(Oa, { className: "w-4 h-4" }),
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
              onChange: (C) => w((_) => ({ ..._, inheritFromParent: C.target.checked })),
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
              onChange: (C) => w((_) => ({
                ..._,
                locked: C.target.checked,
                lockedBy: C.target.checked ? s.name : void 0
              })),
              className: "mt-1 rounded accent-rose-500"
            }
          ),
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ t("div", { className: "text-xs font-semibold text-white flex items-center gap-1.5", children: [
              x.locked ? /* @__PURE__ */ e(ft, { className: "w-3.5 h-3.5 text-rose-400" }) : /* @__PURE__ */ e(Cr, { className: "w-3.5 h-3.5 text-emerald-400" }),
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
              value: z,
              onChange: (C) => v(C.target.value),
              className: "bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200",
              children: [
                /* @__PURE__ */ t("optgroup", { label: "Roller (RBAC)", children: [
                  /* @__PURE__ */ e("option", { value: "role:admin", children: "Role: Admin" }),
                  /* @__PURE__ */ e("option", { value: "role:developer", children: "Role: Developer" }),
                  /* @__PURE__ */ e("option", { value: "role:editor", children: "Role: Media Editor" }),
                  /* @__PURE__ */ e("option", { value: "role:viewer", children: "Role: Security Auditor (Viewer)" }),
                  /* @__PURE__ */ e("option", { value: "role:guest", children: "Role: External Guest" })
                ] }),
                /* @__PURE__ */ e("optgroup", { label: "Tekil Kullanıcılar", children: ht.map((C) => /* @__PURE__ */ t("option", { value: `user:${C.id}`, children: [
                  "User: ",
                  C.name
                ] }, C.id)) })
              ]
            }
          ),
          /* @__PURE__ */ t(
            "select",
            {
              value: g,
              onChange: (C) => B(C.target.value),
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
                /* @__PURE__ */ e(Tl, { className: "w-3.5 h-3.5" }),
                " Kural Ekle"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "border border-slate-800 rounded-xl overflow-x-auto", children: /* @__PURE__ */ t("table", { className: "w-full text-left border-collapse text-xs", children: [
          /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "bg-slate-900/90 border-b border-slate-800 text-slate-400", children: [
            /* @__PURE__ */ e("th", { className: "py-2.5 px-3", children: "Özelliği / Hedef" }),
            /* @__PURE__ */ e("th", { className: "py-2.5 px-2", children: "Tür" }),
            St.map((C) => /* @__PURE__ */ e("th", { className: "py-2.5 px-2 text-center font-mono text-[11px]", children: C }, C)),
            /* @__PURE__ */ e("th", { className: "py-2.5 px-2 text-right", children: "Sil" })
          ] }) }),
          /* @__PURE__ */ e("tbody", { className: "divide-y divide-slate-800/70", children: x.acl.length === 0 ? /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ t("td", { colSpan: 12, className: "py-6 text-center text-slate-500", children: [
            "Bu düğümde özel ACL kuralı yok. Üst klasör mirası ve POSIX (",
            x.posix.octal,
            ") kuralları geçerlidir."
          ] }) }) : x.acl.map((C) => /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
            /* @__PURE__ */ e("td", { className: "py-2.5 px-3 font-medium text-slate-200", children: C.subjectLabel }),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-2", children: /* @__PURE__ */ e(
              "span",
              {
                className: `px-2 py-0.5 rounded text-[10px] font-mono uppercase ${C.effect === "allow" ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/15 text-rose-300 border border-rose-500/30"}`,
                children: C.effect
              }
            ) }),
            St.map((_) => /* @__PURE__ */ e("td", { className: "py-2.5 px-2 text-center", children: /* @__PURE__ */ e(
              "input",
              {
                type: "checkbox",
                disabled: !b,
                checked: !!C.permissions[_],
                onChange: () => $(C.id, _),
                className: C.effect === "allow" ? "accent-emerald-500" : "accent-rose-500"
              }
            ) }, _)),
            /* @__PURE__ */ e("td", { className: "py-2.5 px-2 text-right", children: /* @__PURE__ */ e(
              "button",
              {
                disabled: !b,
                onClick: () => te(C.id),
                className: "p-1 text-slate-500 hover:text-rose-400",
                children: /* @__PURE__ */ e(Ar, { className: "w-3.5 h-3.5" })
              }
            ) })
          ] }, C.id)) })
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
                onChange: (C) => {
                  const _ = ht.find((ue) => ue.id === C.target.value);
                  _ && w((ue) => ({
                    ...ue,
                    ownerId: _.id,
                    ownerName: _.name,
                    groupName: _.group
                  }));
                },
                className: "w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white",
                children: ht.map((C) => /* @__PURE__ */ t("option", { value: C.id, children: [
                  C.name,
                  " (",
                  C.group,
                  ")"
                ] }, C.id))
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
                onChange: (C) => Q(C.target.value),
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
        /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: ["owner", "group", "others"].map((C) => /* @__PURE__ */ t(
          "div",
          {
            className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5",
            children: [
              /* @__PURE__ */ e("div", { className: "text-xs font-semibold uppercase tracking-wider text-slate-300", children: C === "owner" ? "Owner (Sahip)" : C === "group" ? `Group (${x.groupName})` : "Others (Diğer Herkes)" }),
              ["r", "w", "x"].map((_) => /* @__PURE__ */ t("label", { className: "flex items-center gap-2 text-xs text-slate-300", children: [
                /* @__PURE__ */ e(
                  "input",
                  {
                    type: "checkbox",
                    disabled: !b,
                    checked: x.posix[C][_],
                    onChange: (ue) => R(C, _, ue.target.checked),
                    className: "accent-blue-500"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "font-mono uppercase text-blue-400", children: _ }),
                /* @__PURE__ */ e("span", { children: _ === "r" ? "Read (Okuma - 4)" : _ === "w" ? "Write (Yazma - 2)" : "Execute / Traverse (1)" })
              ] }, _))
            ]
          },
          C
        )) })
      ] }),
      n === "quota" && a.type === "folder" && /* @__PURE__ */ t("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between", children: [
          /* @__PURE__ */ t("div", { children: [
            /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-white", children: "Bu Klasörün Mevcut Disk Kullanımı" }),
            /* @__PURE__ */ e("div", { className: "text-xs text-slate-400 mt-0.5", children: "Alt dizinlerdeki tüm dosyaların toplam boyutu hesaplanır." })
          ] }),
          /* @__PURE__ */ t("div", { className: "text-right font-mono", children: [
            /* @__PURE__ */ e("span", { className: "text-sm font-bold text-blue-400", children: ae.formatBytes(Ne) }),
            se.maxBytes && /* @__PURE__ */ t("span", { className: "text-xs text-slate-400", children: [
              " ",
              "/ ",
              ae.formatBytes(se.maxBytes)
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
                onChange: (C) => {
                  const _ = parseInt(C.target.value, 10);
                  xe({ maxBytes: isNaN(_) || _ <= 0 ? null : _ * 1024 * 1024 });
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
                onChange: (C) => {
                  const _ = parseInt(C.target.value, 10);
                  xe({
                    maxFileSizeBytes: isNaN(_) || _ <= 0 ? null : _ * 1024 * 1024
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
                onChange: (C) => xe({
                  allowedExtensions: C.target.value.split(",").map((_) => _.trim()).filter(Boolean)
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
                onChange: (C) => xe({
                  blockedExtensions: C.target.value.split(",").map((_) => _.trim()).filter(Boolean)
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
              value: I,
              onChange: (C) => A(C.target.value),
              className: "bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-medium",
              children: ht.map((C) => /* @__PURE__ */ t("option", { value: C.id, children: [
                C.name,
                " — Role: ",
                C.role.toUpperCase()
              ] }, C.id))
            }
          )
        ] }),
        /* @__PURE__ */ e("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2.5", children: St.map((C) => {
          const _ = ge.allowed[C];
          return /* @__PURE__ */ t(
            "div",
            {
              className: `p-3 rounded-xl border flex items-start gap-2.5 ${_ ? "bg-emerald-500/10 border-emerald-500/25" : "bg-rose-500/10 border-rose-500/25"}`,
              children: [
                _ ? /* @__PURE__ */ e(Gt, { className: "w-4 h-4 text-emerald-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ e(Ea, { className: "w-4 h-4 text-rose-400 shrink-0 mt-0.5" }),
                /* @__PURE__ */ t("div", { children: [
                  /* @__PURE__ */ e("div", { className: "text-xs font-semibold text-white", children: Nn[C] }),
                  /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-300 mt-0.5", children: ge.reasons[C] })
                ] })
              ]
            },
            C
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
            checked: T,
            onChange: (C) => M(C.target.checked),
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
              m(a.id, x, T), i();
            },
            className: "px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-semibold text-white shadow-lg shadow-blue-600/25",
            children: "İzin ve Kota Politikalarını Uygula"
          }
        )
      ] })
    ] })
  ] }) });
}, La = /* @__PURE__ */ new Set([
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
]), pr = /* @__PURE__ */ new Set([
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
]), Cn = /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/|^\s*\*.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\$[a-zA-Z_]\w*)|(\b0[oOxX][0-9a-fA-F]+\b|\b\d+(?:\.\d+)?\b)|(\b[a-zA-Z_]\w*\b)(?=\s*\()|(\b[a-zA-Z_]\w*\b)(?=\s*:)|(\b[a-zA-Z_]\w*\b)|([{}()[\].,:;?]+)|([=+\-*/<>!&|]+)|(\s+)/gm;
class hr {
  constructor() {
    Fe(this, "languageIds", [
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
    let c = 0;
    const i = new RegExp(Cn.source, "gm");
    let m;
    for (; (m = i.exec(l)) !== null; ) {
      m.index > c && s.push({
        type: "plain",
        value: l.slice(c, m.index)
      });
      const [
        n,
        u,
        x,
        w,
        T,
        M,
        z,
        v,
        g,
        B
      ] = m;
      let I = "plain";
      u !== void 0 ? I = "comment" : x !== void 0 ? I = "string" : w !== void 0 ? I = "variable" : T !== void 0 ? I = "number" : M !== void 0 ? La.has(M) ? I = "keyword" : pr.has(M) || /^[A-Z]/.test(M) ? I = "type" : I = "function" : z !== void 0 ? La.has(z) ? I = "keyword" : I = "property" : v !== void 0 ? La.has(v) ? I = "keyword" : pr.has(v) || /^[A-Z]/.test(v) ? I = "type" : I = "plain" : g !== void 0 ? I = "punctuation" : B !== void 0 && (I = "operator"), s.push({ type: I, value: n }), c = i.lastIndex;
    }
    return c < l.length && s.push({
      type: "plain",
      value: l.slice(c)
    }), s;
  }
}
const Ut = class Ut {
  static registerStrategy(l) {
    for (const s of l.languageIds)
      this.strategies.set(s, l);
  }
  static tokenizeCode(l, s) {
    const c = this.strategies.get(s) || this.fallbackStrategy;
    return l.split(`
`).map((i) => c.tokenizeLine(i));
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
Fe(Ut, "strategies", /* @__PURE__ */ new Map()), Fe(Ut, "fallbackStrategy", new hr()), (() => {
  const l = new hr();
  for (const s of l.languageIds)
    Ut.strategies.set(s, l);
})();
let Ft = Ut;
function Dn(a) {
  const l = (a.extension || "").toLowerCase();
  return l === ".php" ? "php" : l === ".json" ? "json" : l === ".glsl" || l === ".frag" || l === ".vert" ? "glsl" : l === ".sh" || l === ".bash" ? "bash" : l === ".tsx" || l === ".jsx" ? "tsx" : "typescript";
}
function Ln(a) {
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
const Mn = ({
  node: a,
  canWrite: l,
  denialReason: s,
  onClose: c,
  onSaveContent: i
}) => {
  const m = We(() => Dn(a), [a]), [n, u] = P(
    () => Ln(a)
  ), [x, w] = P(!1), T = je(null), M = je(null), z = We(
    () => Ft.tokenizeCode(n, m),
    [n, m]
  ), v = (g) => {
    const B = g.currentTarget.scrollTop, I = g.currentTarget.scrollLeft;
    T.current && (T.current.scrollTop = B), M.current && (M.current.scrollTop = B, M.current.scrollLeft = I);
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#090d16] border border-slate-700/90 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col h-[82vh]", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-[#0c1220] border-b border-slate-800 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-emerald-500/15 border border-cyan-500/30 text-[#2FF58E] shrink-0", children: /* @__PURE__ */ e(wr, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { className: "min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white truncate", children: a.name }),
            /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30", children: m }),
            /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300", children: a.security.posix.octal }),
            !l && /* @__PURE__ */ t("span", { className: "px-2 py-0.5 text-[10px] font-mono rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1", children: [
              /* @__PURE__ */ e(ft, { className: "w-3 h-3" }),
              " SALT OKUNUR (Read-Only)"
            ] })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: [
            z.length,
            " satır • ",
            n.length,
            " karakter •",
            " ",
            ae.formatBytes(a.size)
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
              /* @__PURE__ */ e(Fa, { className: "w-3.5 h-3.5 text-emerald-400" }),
              /* @__PURE__ */ e("span", { children: "Kopyalandı" })
            ] }) : /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ e(Ba, { className: "w-3.5 h-3.5 text-slate-300" }),
              /* @__PURE__ */ e("span", { children: "Kopyala" })
            ] })
          }
        ),
        /* @__PURE__ */ e(
          "button",
          {
            onClick: c,
            className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800",
            children: /* @__PURE__ */ e(It, { className: "w-5 h-5" })
          }
        )
      ] })
    ] }),
    !l && s && /* @__PURE__ */ t("div", { className: "px-5 py-2 bg-rose-950/60 border-b border-rose-800/50 text-xs text-rose-200 flex items-center gap-2", children: [
      /* @__PURE__ */ e(ft, { className: "w-3.5 h-3.5 text-rose-400 shrink-0" }),
      /* @__PURE__ */ e("span", { children: s })
    ] }),
    /* @__PURE__ */ t("div", { className: "code-surface-dark flex-1 flex overflow-hidden font-mono text-xs bg-[#060911] relative", children: [
      /* @__PURE__ */ e(
        "div",
        {
          ref: T,
          className: "py-4 px-3.5 bg-[#080c15] text-slate-600 text-right select-none border-r border-slate-800/80 overflow-hidden shrink-0",
          children: z.map((g, B) => /* @__PURE__ */ e("div", { className: "leading-6", children: B + 1 }, B))
        }
      ),
      /* @__PURE__ */ t("div", { className: "relative flex-1 h-full overflow-hidden", children: [
        /* @__PURE__ */ e(
          "pre",
          {
            ref: M,
            "aria-hidden": "true",
            className: "absolute inset-0 m-0 p-4 font-mono text-xs leading-6 whitespace-pre overflow-hidden pointer-events-none select-none",
            children: z.map((g, B) => /* @__PURE__ */ e("div", { className: "leading-6 min-h-[24px]", children: g.map((I, A) => /* @__PURE__ */ e(
              "span",
              {
                "data-token-type": I.type,
                className: Ft.getTokenClassName(
                  I.type
                ),
                children: I.value
              },
              A
            )) }, B))
          }
        ),
        /* @__PURE__ */ e(
          "textarea",
          {
            value: n,
            readOnly: !l,
            onChange: (g) => u(g.target.value),
            onScroll: v,
            spellCheck: !1,
            className: "absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-[#2FF58E] selection:bg-cyan-500/30 font-mono text-xs leading-6 focus:outline-none resize-none whitespace-pre overflow-auto"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "px-5 py-3 bg-[#0c1220] border-t border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("span", { className: "text-[11px] font-mono text-slate-400", children: [
        "UTF-8 • Syntax: ",
        m.toUpperCase(),
        " • SHA-256:",
        " ",
        a.checksumSha256.slice(0, 24),
        "..."
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ e(
          "button",
          {
            onClick: c,
            className: "px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800",
            children: "Kapat"
          }
        ),
        /* @__PURE__ */ t(
          "button",
          {
            disabled: !l,
            onClick: () => {
              i(a.id, n), c();
            },
            className: "px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-semibold text-white flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ e(Dr, { className: "w-3.5 h-3.5" }),
              " Kaydet (Ctrl+S)"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}, zn = ({
  nodes: a,
  onClose: l,
  onApplyBatchRename: s
}) => {
  const [c, i] = P(""), [m, n] = P(""), [u, x] = P(""), [w, T] = P(""), [M, z] = P(!0), v = a.map((g, B) => {
    const I = g.type === "folder" ? "" : g.extension;
    let A = I ? g.name.slice(0, -I.length) : g.name;
    u && (A = A.split(u).join(w));
    const d = M ? `_${String(B + 1).padStart(2, "0")}` : "", b = `${c}${A}${m}${d}${I}`;
    return { id: g.id, oldName: g.name, newName: b };
  });
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e(gl, { className: "w-5 h-5 text-blue-400" }),
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
              value: c,
              onChange: (g) => i(g.target.value),
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
              value: m,
              onChange: (g) => n(g.target.value),
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
              onChange: (g) => x(g.target.value),
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
              onChange: (g) => T(g.target.value),
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
            checked: M,
            onChange: (g) => z(g.target.checked),
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
        /* @__PURE__ */ e("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: v.map((g) => /* @__PURE__ */ t("tr", { children: [
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-slate-400 truncate max-w-[220px]", children: g.oldName }),
          /* @__PURE__ */ e("td", { className: "py-2 px-3 text-emerald-400 font-semibold truncate max-w-[220px]", children: g.newName })
        ] }, g.id)) })
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
            s(v.map((g) => ({ id: g.id, newName: g.newName }))), l();
          },
          className: "px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white",
          children: "Tümünü Yeniden Adlandır"
        }
      )
    ] })
  ] }) });
}, An = ({
  node: a,
  onClose: l,
  onSaveShareConfig: s
}) => {
  var g, B, I, A;
  const [c, i] = P(!1), [m, n] = P(
    ((g = a.shareLink) == null ? void 0 : g.passwordProtected) || !1
  ), [u, x] = P(((B = a.shareLink) == null ? void 0 : B.password) || ""), [w, T] = P(
    (I = a.shareLink) != null && I.maxDownloads ? String(a.shareLink.maxDownloads) : "100"
  ), M = ((A = a.shareLink) == null ? void 0 : A.token) || `sh_${a.id.slice(-6)}_${Date.now().toString(36)}`, z = `https://cdn.filemangl.dev/s/${M}`, v = () => {
    var d;
    s(a.id, {
      token: M,
      url: z,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      expiresAt: "2026-12-31T23:59:59Z",
      passwordProtected: m,
      password: m ? u : void 0,
      allowDownload: !0,
      maxDownloads: parseInt(w, 10) || null,
      downloadsCount: ((d = a.shareLink) == null ? void 0 : d.downloadsCount) || 0
    }), l();
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ e(na, { className: "w-5 h-5 text-emerald-400" }),
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
              value: z,
              className: "flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-emerald-400"
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: () => {
                navigator.clipboard.writeText(z), i(!0), setTimeout(() => i(!1), 1800);
              },
              className: "px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-1",
              children: [
                c ? /* @__PURE__ */ e(Fa, { className: "w-4 h-4 text-emerald-400" }) : /* @__PURE__ */ e(Ba, { className: "w-4 h-4" }),
                c ? "Kopyalandı" : "Kopyala"
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
            checked: m,
            onChange: (d) => n(d.target.checked),
            className: "accent-blue-500"
          }
        ),
        /* @__PURE__ */ e("span", { children: "Parola Koruması Zorunlu Olsun (AES-256 Token)" })
      ] }),
      m && /* @__PURE__ */ e(
        "input",
        {
          type: "password",
          placeholder: "Paylaşım parolası girin...",
          value: u,
          onChange: (d) => x(d.target.value),
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
            onChange: (d) => T(d.target.value),
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
            onClick: v,
            className: "px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white",
            children: "Bağlantıyı Etkinleştir"
          }
        )
      ] })
    ] })
  ] }) });
}, _n = ({
  conflicts: a,
  onClose: l,
  onResolve: s
}) => {
  var c;
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#0f1623] border border-amber-500/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center gap-3", children: [
      /* @__PURE__ */ e(El, { className: "w-5 h-5 text-amber-400" }),
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
          (c = a[0]) == null ? void 0 : c.sourceNode.name,
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
}, Tn = ({ node: a, onClose: l }) => {
  var M, z;
  const s = je(null), c = je(null), [i, m] = P(1), [n, u] = P({
    w: ((M = a.imageMeta) == null ? void 0 : M.width) || 1920,
    h: ((z = a.imageMeta) == null ? void 0 : z.height) || 1080
  }), [x, w] = P(a.durationSec || 0);
  Ke(() => {
    if (a.blobUrl || a.category !== "video") return;
    const v = c.current;
    if (!v) return;
    const g = v.getContext("2d");
    if (!g) return;
    let B = 0, I = 0;
    const A = () => {
      I += 0.025;
      const d = v.width, b = v.height, R = g.createLinearGradient(0, 0, d, b);
      R.addColorStop(0, "#040b18"), R.addColorStop(0.5, "#092247"), R.addColorStop(1, "#051526"), g.fillStyle = R, g.fillRect(0, 0, d, b);
      for (let Q = 0; Q < 5; Q++) {
        g.beginPath(), g.strokeStyle = Q % 2 === 0 ? "rgba(47, 245, 142, 0.35)" : "rgba(0, 200, 255, 0.35)", g.lineWidth = 2.5;
        for (let X = 0; X <= d; X += 12) {
          const $ = b * 0.5 + Math.sin(X * 0.012 + I * (1.2 + Q * 0.3) + Q) * (40 + Q * 16) + Math.cos(X * 6e-3 - I) * 20;
          X === 0 ? g.moveTo(X, $) : g.lineTo(X, $);
        }
        g.stroke();
      }
      g.fillStyle = "rgba(255,255,255,0.85)", g.font = "bold 15px Inter, sans-serif", g.fillText(`FileManGL 60FPS Stream Preview — ${a.name}`, 24, 38), g.font = "12px JetBrains Mono, monospace", g.fillStyle = "#2FF58E", g.fillText(
        `TIME: ${I.toFixed(2)}s • CODEC: H.264 / WebGL2 • SIZE: ${ae.formatBytes(a.size)}`,
        24,
        62
      ), B = requestAnimationFrame(A);
    };
    return B = requestAnimationFrame(A), () => cancelAnimationFrame(B);
  }, [a]);
  const T = (v) => {
    m(v), s.current && (s.current.playbackRate = v);
  };
  return /* @__PURE__ */ e("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4", children: /* @__PURE__ */ t("div", { className: "bg-[#080d18] border border-slate-700/90 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col", children: [
    /* @__PURE__ */ t("div", { className: "px-5 py-3.5 bg-[#0c1220] border-b border-slate-800 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ t("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ e("div", { className: "p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-[#00C8FF]", children: a.category === "video" ? /* @__PURE__ */ e(kl, { className: "w-5 h-5" }) : a.category === "audio" ? /* @__PURE__ */ e(mr, { className: "w-5 h-5" }) : /* @__PURE__ */ e(wl, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { className: "min-w-0", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white truncate", children: a.name }),
            a.blobUrl && /* @__PURE__ */ e("span", { className: "px-2 py-0.5 text-[10px] font-mono font-bold rounded-full bg-emerald-500/20 text-[#2FF58E] border border-emerald-500/40", children: "GERÇEK DOSYA AKIŞI (BLOB STREAM)" })
          ] }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: [
            a.mimeType,
            " • ",
            ae.formatBytes(a.size),
            a.category === "video" && ` • ${n.w}×${n.h}px`,
            x > 0 && ` • ${x.toFixed(1)} sn`
          ] })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex items-center gap-2 shrink-0", children: [
        a.category === "video" && a.blobUrl && /* @__PURE__ */ e("div", { className: "hidden sm:flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg p-0.5 text-[11px] font-mono", children: [0.5, 1, 1.25, 1.5, 2].map((v) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => T(v),
            className: `px-2 py-0.5 rounded transition ${i === v ? "bg-blue-600 text-white font-bold" : "text-slate-400 hover:text-white"}`,
            children: [
              v,
              "x"
            ]
          },
          v
        )) }),
        a.blobUrl && /* @__PURE__ */ t(
          "a",
          {
            href: a.blobUrl,
            download: a.name,
            style: { color: "#ffffff" },
            className: "px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white flex items-center gap-1.5 transition",
            children: [
              /* @__PURE__ */ e(kr, { className: "w-3.5 h-3.5" }),
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
        onLoadedMetadata: (v) => {
          const g = v.currentTarget;
          g.videoWidth && g.videoHeight && u({ w: g.videoWidth, h: g.videoHeight }), g.duration && Number.isFinite(g.duration) && w(g.duration);
        },
        className: "w-full max-h-[70vh] object-contain bg-black"
      }
    ) : a.category === "video" ? /* @__PURE__ */ e(
      "canvas",
      {
        ref: c,
        width: 860,
        height: 460,
        className: "w-full max-h-[65vh] object-contain"
      }
    ) : a.category === "audio" && a.blobUrl ? /* @__PURE__ */ t("div", { className: "p-10 w-full flex flex-col items-center gap-5", children: [
      /* @__PURE__ */ e("div", { className: "w-20 h-20 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-[#00C8FF]", children: /* @__PURE__ */ e(mr, { className: "w-10 h-10" }) }),
      /* @__PURE__ */ e("audio", { src: a.blobUrl, controls: !0, autoPlay: !0, className: "w-full max-w-md" })
    ] }) : a.blobUrl ? /* @__PURE__ */ e(
      "iframe",
      {
        src: a.blobUrl,
        title: a.name,
        className: "w-full h-[68vh] bg-white border-0"
      }
    ) : /* @__PURE__ */ t("div", { className: "p-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ e(_l, { className: "w-8 h-8 text-cyan-400" }),
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
}, Pn = ({
  locale: a,
  onSelectLocale: l,
  compact: s = !1
}) => {
  const [c, i] = P(!1), m = je(null), n = aa.find((u) => u.code === a) || aa[0];
  return Ke(() => {
    if (!c) return;
    const u = (x) => {
      m.current && !m.current.contains(x.target) && i(!1);
    };
    return window.addEventListener("mousedown", u), () => window.removeEventListener("mousedown", u);
  }, [c]), /* @__PURE__ */ t("div", { ref: m, className: "relative inline-block text-left", children: [
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => i((u) => !u),
        className: `flex items-center justify-center gap-1.5 transition ${s ? "px-2 py-1 rounded-lg text-[11px] hover:bg-slate-800/60 text-slate-200" : "h-[38px] px-2.5 rounded-[8px] bg-white/[0.05] hover:bg-slate-800/70 border border-white/[0.08] text-[12px] font-bold text-slate-100"}`,
        title: `Dil Seçimi: ${n.label} (${n.code.toUpperCase()})`,
        children: [
          s && /* @__PURE__ */ e(Sr, { className: "w-3.5 h-3.5 text-[#00C8FF] shrink-0" }),
          /* @__PURE__ */ e("span", { className: "font-bold uppercase tracking-wide", children: n.code }),
          /* @__PURE__ */ e(
            Ia,
            {
              className: `w-3.5 h-3.5 text-slate-400 transition-transform ${c ? "rotate-180 text-white" : ""}`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ e(
      "div",
      {
        className: `${c ? "block" : "hidden"} absolute right-0 mt-1.5 w-44 rounded-xl bg-[#0e1525] border border-slate-800 shadow-2xl py-1.5 z-50`,
        children: aa.map((u) => {
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
                  x && /* @__PURE__ */ e(Fa, { className: "w-3.5 h-3.5 text-[#2FF58E]" })
                ] })
              ]
            },
            u.code
          );
        })
      }
    )
  ] });
}, Fn = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
let fr = !1;
function In() {
  if (fr || typeof document > "u" || (fr = !0, document.querySelector('link[href*="Material+Symbols+Outlined"]'))) return;
  const l = document.createElement("link");
  l.rel = "stylesheet", l.href = Fn, document.head.appendChild(l);
}
const ns = ({
  config: a,
  onConfigChange: l,
  isFullscreen: s,
  onToggleFullscreen: c
}) => {
  var qa;
  Ke(() => {
    In();
  }, []);
  const { dict: i } = sa(), m = We(() => a.driverType === "vfs_memory" ? new il() : a.driverType === "rest_connector" ? new ol(a.connectorEndpoint, a.connectorAuthToken) : new xr(), [a.driverType, a.connectorEndpoint, a.connectorAuthToken]), [n, u] = P([]), [x, w] = P([]), [T, M] = P([]), [z, v] = P([
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
  ]), [g, B] = P("tab_root"), I = We(
    () => z.find((r) => r.id === g) || z[0],
    [z, g]
  ), A = I.folderId, d = I.navSection, b = I.searchQuery, R = Be(
    (r, o = "volume") => {
      v(
        (p) => p.map((h) => {
          if (h.id !== I.id) return h;
          if (h.folderId === r && h.navSection === o)
            return { ...h, searchQuery: "" };
          const D = [
            ...h.history.slice(0, h.historyIndex + 1),
            { folderId: r, navSection: o }
          ];
          return {
            ...h,
            folderId: r,
            navSection: o,
            searchQuery: "",
            history: D,
            historyIndex: D.length - 1
          };
        })
      ), ie(/* @__PURE__ */ new Set());
    },
    [I.id]
  ), Q = Be(
    (r) => {
      v(
        (o) => o.map((p) => p.id === I.id ? { ...p, searchQuery: r } : p)
      );
    },
    [I.id]
  ), X = Be(
    (r) => {
      R(r, "volume");
    },
    [R]
  ), $ = Be(
    (r) => {
      R(r === "volume" ? A : null, r);
    },
    [R, A]
  ), te = Be(() => {
    v(
      (r) => r.map((o) => {
        if (o.id !== I.id || o.historyIndex <= 0) return o;
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
  }, [I.id]), se = Be(() => {
    v(
      (r) => r.map((o) => {
        if (o.id !== I.id || o.historyIndex >= o.history.length - 1)
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
  }, [I.id]), xe = Be(
    (r = null, o = "volume") => {
      const p = `tab_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, h = {
        id: p,
        folderId: r,
        navSection: o,
        searchQuery: "",
        history: [{ folderId: r, navSection: o }],
        historyIndex: 0
      };
      v((f) => [...f, h]), B(p), ie(/* @__PURE__ */ new Set());
    },
    []
  ), ye = Be(
    (r, o) => {
      o == null || o.stopPropagation(), v((p) => {
        if (p.length <= 1) return p;
        const h = p.findIndex((D) => D.id === r), f = p.filter((D) => D.id !== r);
        if (r === I.id) {
          const D = f[Math.max(0, h - 1)] || f[0];
          B(D.id);
        }
        return f;
      });
    },
    [I.id]
  ), $e = Be(
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
  ), [ge, Ne] = P(240), [C, _] = P(300), [ue, V] = P(!1), [y, fe] = P(!1), L = je(null), j = je(0), G = je(0), ee = (r, o) => {
    o.preventDefault(), L.current = r, j.current = o.clientX, G.current = r === "left" ? ge : C, document.body.style.cursor = "col-resize", document.body.style.userSelect = "none";
  };
  Ke(() => {
    const r = (p) => {
      if (!L.current) return;
      const h = p.clientX - j.current;
      if (L.current === "left") {
        const f = Math.max(170, Math.min(440, G.current + h));
        Ne(f);
      } else {
        const f = Math.max(230, Math.min(500, G.current - h));
        _(f);
      }
    }, o = () => {
      L.current && (L.current = null, document.body.style.cursor = "", document.body.style.userSelect = "");
    };
    return window.addEventListener("mousemove", r), window.addEventListener("mouseup", o), () => {
      window.removeEventListener("mousemove", r), window.removeEventListener("mouseup", o);
    };
  }, []);
  const [le, W] = P("fld_releases"), [de, ve] = P(a.defaultViewMode), [Ce, Ie] = P("date"), [Y, ie] = P(/* @__PURE__ */ new Set()), [Ee, Oe] = P(null), [Le, S] = P({
    mode: null,
    nodeIds: [],
    sourceParentId: null,
    timestamp: 0
  }), [ne, k] = P(null), [N, O] = P(ht[0]), [Z, E] = P("all"), [pe, ke] = P("name"), [_e, Xe] = P("asc"), [we, Re] = P(null), [Ve, bt] = P(
    /* @__PURE__ */ new Set(["fld_engineering", "fld_webgl", "fld_vault", "fld_releases"])
  ), [ct, lt] = P(null), [xt, Dt] = P(null), [yt, Lt] = P(null), [ia, Kt] = P(null), [oa, Ht] = P(null), [Pr, Ga] = P(!1), [ca, da] = P(null), [Wt, Et] = P([]), [Fr, ma] = P(!1), [Ir, ua] = P(!1), Vt = je(/* @__PURE__ */ new Set()), [Ae, Te] = P(null), [gt, ja] = P(null), [Ka, Er] = P([]), Yt = je(null), Xt = je(null);
  Ke(() => {
    ve(a.defaultViewMode);
  }, [a.defaultViewMode]), Ke(() => {
    m.initialize().then((r) => {
      u(r);
    });
  }, [m]);
  const K = Be(
    (r, o, p, h = "/") => {
      ja({ type: r, title: o, message: p }), a.enableAuditLog && Er((f) => [
        {
          id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString("tr-TR"),
          actorName: N.name,
          actorRole: N.role,
          action: o,
          targetPath: h,
          status: r === "error" ? "denied" : r === "info" || r === "warning" ? "warning" : "allowed",
          details: p
        },
        ...f.slice(0, 49)
      ]);
    },
    [a.enableAuditLog, N]
  );
  Ke(() => {
    if (!gt) return;
    const r = setTimeout(() => ja(null), 4200);
    return () => clearTimeout(r);
  }, [gt]);
  const De = Be(
    (r, o = !0) => {
      o && a.enableUndoRedo && (w((p) => [...p.slice(-19), n]), M([])), u(r), m.saveAllNodes(r);
    },
    [n, a.enableUndoRedo, m]
  ), pa = Be(() => {
    if (x.length === 0) return;
    const r = x[x.length - 1];
    w((o) => o.slice(0, -1)), M((o) => [n, ...o]), u(r), m.saveAllNodes(r), K("info", "Geri Al (Undo)", "Önceki dosya sistemi durumuna dönüldü.");
  }, [x, n, m, K]), ha = Be(() => {
    if (T.length === 0) return;
    const r = T[0];
    M((o) => o.slice(1)), w((o) => [...o, n]), u(r), m.saveAllNodes(r), K("info", "Yinele (Redo)", "İşlem yeniden uygulandı.");
  }, [T, n, m, K]), qe = We(
    () => A && n.find((r) => r.id === A) || null,
    [n, A]
  ), Ze = We(() => {
    if (!qe) {
      const r = N.role !== "guest" && N.role !== "viewer";
      return {
        allowed: {
          read: !0,
          write: r || !a.strictPermissionEnforcement,
          delete: r || !a.strictPermissionEnforcement,
          rename: r || !a.strictPermissionEnforcement,
          upload: r || !a.strictPermissionEnforcement,
          download: !0,
          share: r || !a.strictPermissionEnforcement,
          chmod: N.role === "admin" || !a.strictPermissionEnforcement,
          lock: r || !a.strictPermissionEnforcement
        },
        reasons: {
          read: "Kök dizin okuma izni aktif.",
          write: r ? "Kök dizin yazma izni aktif." : `Rolünüz (${N.role.toUpperCase()}) kök dizine yazma yetkisine sahip değil.`,
          delete: "",
          rename: "",
          upload: r ? "Yükleme izni aktif." : `Rolünüz (${N.role.toUpperCase()}) dosya yükleyemez.`,
          download: "",
          share: "",
          chmod: "",
          lock: ""
        }
      };
    }
    return ce.evaluateNodePermissions(
      qe,
      N,
      n,
      a
    );
  }, [qe, N, n, a]), Ha = We(() => {
    const r = [], o = new Map(n.map((f) => [f.id, f]));
    let p = A ? o.get(A) : void 0, h = 0;
    for (; p && h < 32; )
      h++, r.unshift(p), p = p.parentId ? o.get(p.parentId) : void 0;
    return r;
  }, [n, A]), { visibleNodes: et, queryElapsedMs: Br } = We(() => {
    const r = performance.now();
    let o = n.filter((f) => {
      if (d === "trash") return f.trashed;
      if (f.trashed) return !1;
      if (d === "starred") return f.starred;
      if (d === "shared") return !!f.shareLink;
      if (d === "locked") return f.security.locked;
      if (b.trim() !== "") {
        const D = b.toLowerCase();
        return f.name.toLowerCase().includes(D) || f.tags.some((q) => q.toLowerCase().includes(D)) || f.security.ownerName.toLowerCase().includes(D) || f.security.posix.octal.includes(D);
      }
      return f.parentId === A;
    });
    Z !== "all" && (o = o.filter((f) => f.category === Z));
    const p = [...o].sort((f, D) => {
      if (f.type === "folder" && D.type !== "folder") return -1;
      if (f.type !== "folder" && D.type === "folder") return 1;
      if (f.type !== "folder" && D.type !== "folder") {
        if (f.isUserUploaded && !D.isUserUploaded) return -1;
        if (!f.isUserUploaded && D.isUserUploaded) return 1;
      }
      let q = 0;
      if (pe === "name")
        q = f.name < D.name ? -1 : f.name > D.name ? 1 : 0;
      else if (pe === "size") {
        const U = f.type === "folder" ? ae.computeFolderSize(f.id, n) : f.size, J = D.type === "folder" ? ae.computeFolderSize(D.id, n) : D.size;
        q = U - J;
      } else pe === "updatedAt" ? q = f.updatedAt < D.updatedAt ? -1 : f.updatedAt > D.updatedAt ? 1 : 0 : pe === "type" && (q = f.extension < D.extension ? -1 : f.extension > D.extension ? 1 : 0);
      return _e === "asc" ? q : -q;
    }), h = (performance.now() - r).toFixed(2);
    return { visibleNodes: p, queryElapsedMs: h };
  }, [
    n,
    d,
    b,
    A,
    Z,
    pe,
    _e
  ]), fa = Be(
    (r, o, p) => {
      if (Te(null), k(null), p && Ee) {
        const h = et.findIndex((D) => D.id === Ee), f = et.findIndex((D) => D.id === r);
        if (h !== -1 && f !== -1) {
          const D = Math.min(h, f), q = Math.max(h, f), U = et.slice(D, q + 1).map((J) => J.id);
          ie(new Set(U));
          return;
        }
      }
      ie(o ? (h) => {
        const f = new Set(h);
        return f.has(r) ? f.delete(r) : f.add(r), f;
      } : /* @__PURE__ */ new Set([r])), Oe(r);
    },
    [Ee, et]
  ), Wa = Be((r) => {
    ie(new Set(r));
  }, []), he = We(
    () => n.filter((r) => Y.has(r.id)),
    [n, Y]
  ), At = Be(
    (r) => {
      const o = ce.evaluateNodePermissions(
        r,
        N,
        n,
        a
      );
      if (!o.allowed.read) {
        K(
          "error",
          "Erişim Engellendi (EACCES)",
          `"${r.name}" öğesini açma izniniz yok: ${o.reasons.read}`,
          r.name
        );
        return;
      }
      if (r.type === "folder") {
        R(r.id, "volume");
        return;
      }
      if (r.category === "video" || r.category === "audio" || r.extension === ".pdf" && r.blobUrl) {
        Kt(r);
        return;
      }
      if (r.category === "image" && a.enableWebGLImageShaderStudio) {
        Dt(r);
        return;
      }
      a.enableBuiltInCodeEditor && Lt(r);
    },
    [n, a, N, R, K]
  ), Va = () => {
    if (!Ze.allowed.write) {
      K(
        "error",
        "Klasör Oluşturma Engellendi",
        Ze.reasons.write || "Bu dizine yazma yetkiniz bulunmuyor."
      );
      return;
    }
    const r = "Yeni_Klasor";
    let o = 1, p = r;
    const h = n.filter(
      (q) => !q.trashed && q.parentId === A
    );
    for (; h.some((q) => q.name.toLowerCase() === p.toLowerCase()); )
      o++, p = `${r}_${o}`;
    const f = (/* @__PURE__ */ new Date()).toISOString(), D = {
      id: `fld_${Date.now()}`,
      parentId: A,
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
        ownerId: N.id,
        ownerName: N.name,
        groupName: N.group,
        inheritFromParent: !0,
        locked: !1,
        posix: ce.buildPosixFromOctal("0755"),
        acl: it("open")
      }
    };
    De([...n, D]), ie(/* @__PURE__ */ new Set([D.id])), Re(D.id), K("success", "Yeni Klasör Oluşturuldu", `"${p}" dizine eklendi.`, p);
  }, vt = Be(
    async (r) => {
      const o = r && r.length > 0 ? r : he.length > 0 ? he : qe ? [qe] : [];
      if (o.length === 0) return;
      const p = [], h = [];
      for (const f of o) {
        const D = ce.evaluateNodePermissions(
          f,
          N,
          n,
          a
        );
        if (!D.allowed.download || !D.allowed.read) {
          h.push(f.name);
          continue;
        }
        p.push(f);
      }
      if (p.length === 0) {
        K(
          "error",
          "ZIP İndirme Engellendi (EACCES)",
          `"${h[0] || "Seçim"}" öğesini indirme yetkiniz bulunmuyor.`
        );
        return;
      }
      try {
        const f = await cr.buildZipArchive(
          p,
          n
        );
        cr.triggerBrowserDownload(f.blob, f.fileName), K(
          h.length > 0 ? "warning" : "success",
          "ZIP Paketi İndiriliyor",
          `"${f.fileName}" (${f.fileCount} dosya, ${f.folderCount} klasör • ${ae.formatBytes(
            f.totalBytes
          )}) bilgisayarınıza indiriliyor.`,
          f.fileName
        );
      } catch {
        K("error", "ZIP Paketleme Hatası", "ZIP arşivi oluşturulurken bir hata oluştu.");
      }
    },
    [n, a, qe, N, K, he]
  ), ba = Be(
    (r) => {
      if (r.type === "folder") {
        vt([r]);
        return;
      }
      const o = ce.evaluateNodePermissions(
        r,
        N,
        n,
        a
      );
      if (!o.allowed.download) {
        K(
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
      p.download = r.name, p.click(), K(
        "info",
        "Dosya İndiriliyor",
        `"${r.name}" (${ae.formatBytes(r.size)}) yerel diskinize aktarılıyor.`,
        r.name
      );
    },
    [n, a, N, vt, K]
  ), qt = (r, o, p, h, f) => {
    if (!Ze.allowed.write) {
      K(
        "error",
        "Dosya Oluşturma Engellendi",
        Ze.reasons.write || "Bu dizine yazma izniniz bulunmuyor."
      );
      return;
    }
    const D = r || `Yeni_Dokuman_${Date.now().toString().slice(-4)}.md`, q = o || `# ${D}

Oluşturan: **${N.name}** (${N.role})
Tarih: ${(/* @__PURE__ */ new Date()).toLocaleString(
      "tr-TR"
    )}
`, U = p || Math.max(256 * 1024, q.length * 1024), J = ae.validateWriteOperation(
      A,
      D,
      U,
      n,
      a
    );
    if (!J.allowed) {
      K("error", "Kota / Güvenlik Politikası Engeli", J.reason || "İşlem reddedildi.");
      return;
    }
    const Me = D.match(/(\.[a-zA-Z0-9]+)$/), be = Me ? Me[1].toLowerCase() : ".txt", tt = (/* @__PURE__ */ new Date()).toISOString(), at = Date.now().toString(16).padStart(64, "0");
    f && pt.putThumbnail({
      cacheKey: at,
      thumbnailDataUrl: f,
      width: 1280,
      height: 720,
      palette: ["#3b82f6", "#ec4899", "#10b981"],
      thumbByteSize: U,
      generatedAt: tt,
      generationMs: 1.2,
      fromCache: !1
    });
    const _t = {
      id: `fil_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      parentId: A,
      name: D,
      type: "file",
      category: h || (be === ".png" ? "image" : be === ".ts" ? "code" : "document"),
      extension: be,
      mimeType: be === ".png" ? "image/png" : "text/markdown",
      size: U,
      createdAt: tt,
      updatedAt: tt,
      starred: !1,
      tags: ["Created"],
      trashed: !1,
      content: q,
      blobUrl: f,
      thumbnailUrl: f,
      isUserUploaded: !!f,
      thumbnailMeta: f ? {
        thumbByteSize: U,
        generationMs: 1.2,
        fromCache: !1,
        format: "image/png"
      } : void 0,
      imageMeta: h === "image" || be === ".png" ? {
        width: 1920,
        height: 1080,
        palette: ["#3b82f6", "#ec4899", "#10b981"],
        pattern: "nebula"
      } : void 0,
      checksumSha256: at,
      security: {
        ownerId: N.id,
        ownerName: N.name,
        groupName: N.group,
        inheritFromParent: !0,
        locked: !1,
        posix: ce.buildPosixFromOctal("0644"),
        acl: []
      }
    };
    De([_t, ...n]), ie(/* @__PURE__ */ new Set([_t.id])), r || Re(_t.id), K(
      "success",
      "Dosya Diske Yazıldı",
      `"${D}" (${ae.formatBytes(U)}) oluşturuldu.`,
      D
    );
  }, xa = async (r, o = A) => {
    var Za, Qa;
    const p = Array.from(r || []);
    if (p.length === 0) return;
    const h = o && n.find((oe) => oe.id === o) || null, f = h ? ce.evaluateNodePermissions(
      h,
      N,
      n,
      a
    ) : Ze;
    if (!f.allowed.upload) {
      K(
        "error",
        "Yükleme İzni Reddedildi (EACCES)",
        f.reasons.upload || "Bu klasöre dosya yükleme yetkiniz yok."
      );
      return;
    }
    const D = !!((Qa = (Za = globalThis.process) == null ? void 0 : Za.env) != null && Qa.VITEST), q = (oe) => D ? Promise.resolve() : new Promise((me) => setTimeout(me, oe)), U = (oe) => {
      const me = oe.name.match(/(\.[a-zA-Z0-9]+)$/), Se = me ? me[1].toLowerCase() : "";
      let H = "document";
      return [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".bmp", ".ico"].includes(Se) ? H = "image" : [
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
      ].includes(Se) ? H = "code" : [".zip", ".rar", ".tar", ".gz", ".7z"].includes(Se) ? H = "archive" : [".mp4", ".webm", ".mov", ".mkv", ".avi", ".m4v"].includes(Se) ? H = "video" : [".mp3", ".wav", ".ogg", ".flac", ".m4a"].includes(Se) ? H = "audio" : [".json", ".sql", ".csv", ".xml", ".yaml", ".yml"].includes(Se) ? H = "data" : oe.type.startsWith("video/") ? H = "video" : oe.type.startsWith("image/") ? H = "image" : oe.type.startsWith("audio/") && (H = "audio"), { ext: Se, cat: H };
    }, J = async (oe) => {
      var me;
      try {
        if (typeof window < "u" && ((me = window.crypto) != null && me.subtle)) {
          const H = await oe.slice(0, Math.min(oe.size, 16777216)).arrayBuffer(), Pe = await window.crypto.subtle.digest("SHA-256", H);
          return Array.from(new Uint8Array(Pe)).map((Qe) => Qe.toString(16).padStart(2, "0")).join("");
        }
      } catch {
      }
      return `${oe.size.toString(16)}${Date.now().toString(16)}`.padStart(64, "a");
    }, Me = (oe) => new Promise((me) => {
      if (typeof document > "u") {
        me({ width: 1920, height: 1080, durationSec: 0 });
        return;
      }
      let Se = !1;
      const H = document.createElement("video");
      H.preload = "metadata", H.muted = !0, H.playsInline = !0;
      const Pe = (ze) => {
        Se || (Se = !0, clearTimeout(Qe), H.removeAttribute("src"), me(ze));
      }, Qe = setTimeout(() => {
        Pe({
          width: H.videoWidth || 1920,
          height: H.videoHeight || 1080,
          durationSec: Number.isFinite(H.duration) ? H.duration : 0
        });
      }, 450);
      H.onloadedmetadata = () => {
        const ze = Number.isFinite(H.duration) ? H.duration : 0, Ue = ze > 0.5 ? Math.min(1.2, ze * 0.2) : 0.05;
        try {
          H.currentTime = Ue;
        } catch {
          Pe({
            width: H.videoWidth || 1920,
            height: H.videoHeight || 1080,
            durationSec: ze
          });
        }
      }, H.onseeked = () => {
        let ze;
        try {
          const Ue = H.videoWidth || 1280, Ge = H.videoHeight || 720, He = document.createElement("canvas"), mt = 360, nt = Math.max(200, Math.round(Ge / Ue * mt));
          He.width = mt, He.height = nt;
          const $t = He.getContext("2d");
          $t && ($t.drawImage(H, 0, 0, mt, nt), ze = He.toDataURL("image/jpeg", 0.85));
        } catch {
          ze = void 0;
        }
        Pe({
          width: H.videoWidth || 1920,
          height: H.videoHeight || 1080,
          durationSec: Number.isFinite(H.duration) ? H.duration : 0,
          thumbnailUrl: ze
        });
      }, H.onerror = () => {
        Pe({ width: 1920, height: 1080, durationSec: 0 });
      }, H.src = oe;
    });
    let be = [...n];
    const tt = /* @__PURE__ */ new Set(), at = [], _t = (oe, me) => {
      let Se = me, H = h ? h.name : i.explorer.rootVolume, Pe;
      for (let Qe = 0; Qe < oe.length; Qe++) {
        const ze = oe[Qe].trim();
        if (!ze) continue;
        let Ue = be.find(
          (Ge) => !Ge.trashed && Ge.type === "folder" && Ge.parentId === Se && Ge.name.toLowerCase() === ze.toLowerCase()
        );
        if (!Ue) {
          const Ge = (/* @__PURE__ */ new Date()).toISOString();
          Ue = {
            id: `fld_up_${Date.now()}_${Qe}_${Math.random().toString(36).slice(2, 6)}`,
            parentId: Se,
            name: ze,
            type: "folder",
            category: "folder",
            extension: "",
            mimeType: "inode/directory",
            size: 0,
            createdAt: Ge,
            updatedAt: Ge,
            starred: !1,
            tags: ["UploadedFolder"],
            colorTag: "amber",
            trashed: !1,
            isUserUploaded: !0,
            checksumSha256: Date.now().toString(16).padStart(64, "d"),
            security: {
              ownerId: N.id,
              ownerName: N.name,
              groupName: N.group,
              inheritFromParent: !0,
              locked: !1,
              posix: ce.buildPosixFromOctal("0755"),
              acl: it("open")
            }
          }, be = [Ue, ...be];
        }
        Qe === 0 && (Pe = Ue.id, tt.add(Ue.id)), at.push(Ue.id), Se = Ue.id, H = Ue.name;
      }
      return {
        leafParentId: Se,
        leafFolderLabel: H,
        rootFolderId: Pe
      };
    }, ga = p.map((oe, me) => {
      const Se = (oe.relativePath || oe.webkitRelativePath || oe.name).replace(/\\/g, "/"), H = Se.split("/").filter(Boolean), Pe = H.length > 1 ? H.slice(0, -1) : [], Qe = Pe.length > 0 ? Pe[0] : void 0, ze = Pe.length > 0 ? _t(Pe, o) : {
        leafParentId: o,
        leafFolderLabel: h ? h.name : i.explorer.rootVolume,
        rootFolderId: void 0
      }, { ext: Ue, cat: Ge } = U(oe), He = `uq_${Date.now()}_${me}_${Math.random().toString(36).slice(2, 6)}`, mt = {
        id: He,
        fileName: oe.name,
        relativePath: Se,
        rootUploadedFolderName: Qe,
        rootUploadedFolderId: ze.rootFolderId,
        targetFolderId: ze.leafParentId,
        targetFolderLabel: ze.leafFolderLabel,
        category: Ge,
        totalBytes: oe.size,
        bytesTransferred: 0,
        percent: 0,
        status: "queued",
        stage: "%0 • Kuyrukta bekliyor..."
      };
      return {
        file: oe,
        ext: Ue,
        cat: Ge,
        queueId: He,
        queueItem: mt,
        leafParentId: ze.leafParentId
      };
    });
    at.length > 0 && bt((oe) => {
      const me = new Set(oe);
      return at.forEach((Se) => me.add(Se)), me;
    }), ma(!0), ua(!1), Et((oe) => [...ga.map((me) => me.queueItem), ...oe]);
    const wt = (oe, me) => {
      Et(
        (Se) => Se.map((H) => H.id === oe ? { ...H, ...me } : H)
      );
    }, dt = [];
    for (let oe = 0; oe < ga.length; oe++) {
      const { file: me, ext: Se, cat: H, queueId: Pe, leafParentId: Qe } = ga[oe], ze = me.size;
      if (Vt.current.has(Pe)) {
        wt(Pe, {
          status: "cancelled",
          stage: "İptal edildi"
        });
        continue;
      }
      const Ue = ae.validateWriteOperation(
        Qe,
        me.name,
        ze,
        be,
        a
      );
      if (!Ue.allowed) {
        wt(Pe, {
          status: "error",
          stage: Ue.reason || "Kota veya uzantı engeli",
          errorMessage: Ue.reason
        }), K("error", "Yükleme Engellendi", Ue.reason || me.name, me.name);
        continue;
      }
      if (wt(Pe, {
        status: "uploading",
        percent: 20,
        bytesTransferred: Math.round(ze * 0.2),
        stage: "Binary Stream Okunuyor..."
      }), await q(20), Vt.current.has(Pe)) {
        wt(Pe, { status: "cancelled", stage: "İptal edildi" });
        continue;
      }
      const Ge = await J(me);
      wt(Pe, {
        status: "uploading",
        percent: 45,
        bytesTransferred: Math.round(ze * 0.45),
        stage: "SHA-256 Özeti Doğrulandı..."
      }), await q(20);
      let He;
      try {
        typeof URL < "u" && typeof URL.createObjectURL == "function" ? He = URL.createObjectURL(me) : He = `blob:local/${encodeURIComponent(me.name)}`;
      } catch {
        He = `blob:local/${encodeURIComponent(me.name)}`;
      }
      let mt;
      if ((H === "code" || H === "document" || H === "data") && Se !== ".pdf")
        try {
          ze <= 2 * 1024 * 1024 && (mt = await me.text());
        } catch {
          mt = void 0;
        }
      wt(Pe, {
        status: "uploading",
        percent: 75,
        bytesTransferred: Math.round(ze * 0.75),
        stage: H === "video" ? "Video Kodek & Poster Karesi Çıkarılıyor..." : H === "image" ? "WebP Thumbnail & Palet Önbellekleniyor..." : "IndexedDB Bloklarına Yazılıyor..."
      }), await q(20);
      let nt, $t, kt, va = ["#06b6d4", "#6366f1", "#f43f5e"], Jt;
      if (H === "video" && He) {
        const ut = performance.now();
        await pt.persistBinaryBlob(Ge, me);
        const Ot = await pt.getThumbnail(Ge), Tt = await Me(He);
        nt = (Ot == null ? void 0 : Ot.thumbnailDataUrl) || Tt.thumbnailUrl, $t = Tt.durationSec, kt = { width: Tt.width, height: Tt.height };
        const er = Number((performance.now() - ut).toFixed(2)), tr = nt ? Math.round(nt.length * 3 / 4) : 16384;
        nt && !Ot && await pt.putThumbnail({
          cacheKey: Ge,
          thumbnailDataUrl: nt,
          width: Tt.width,
          height: Tt.height,
          palette: va,
          thumbByteSize: tr,
          generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
          generationMs: er,
          fromCache: !1
        }), Jt = {
          thumbByteSize: tr,
          generationMs: er,
          fromCache: !!Ot,
          format: "image/jpeg"
        };
      } else if (H === "image" && He) {
        const ut = await pt.generateAndCacheImageThumbnail(
          me,
          Ge,
          He,
          320
        );
        nt = ut.thumbnailDataUrl || He, kt = { width: ut.width, height: ut.height }, va = ut.palette, Jt = {
          thumbByteSize: ut.thumbByteSize,
          generationMs: ut.generationMs,
          fromCache: ut.fromCache,
          format: "image/webp"
        };
      } else
        await pt.persistBinaryBlob(Ge, me);
      wt(Pe, {
        status: "uploading",
        percent: 95,
        bytesTransferred: Math.round(ze * 0.95),
        stage: "VFS Dizin Ağacına Kaydediliyor..."
      }), await q(15);
      const Ja = (/* @__PURE__ */ new Date()).toISOString(), wa = {
        id: `up_${Date.now()}_${oe}_${Math.random().toString(36).slice(2, 7)}`,
        parentId: Qe,
        name: me.name,
        type: H === "archive" ? "archive" : "file",
        category: H,
        extension: Se,
        mimeType: me.type || (H === "video" ? "video/mp4" : H === "audio" ? "audio/mpeg" : H === "image" ? "image/png" : "application/octet-stream"),
        size: ze,
        createdAt: Ja,
        updatedAt: Ja,
        starred: !1,
        tags: ["Uploaded", ...Jt ? ["ThumbCached"] : []],
        colorTag: "emerald",
        trashed: !1,
        content: mt,
        blobUrl: He,
        thumbnailUrl: nt,
        thumbnailMeta: Jt,
        durationSec: $t,
        isUserUploaded: !0,
        imageMeta: H === "image" || H === "video" ? {
          width: (kt == null ? void 0 : kt.width) || 1920,
          height: (kt == null ? void 0 : kt.height) || 1080,
          palette: va,
          pattern: "aurora"
        } : void 0,
        checksumSha256: Ge,
        security: {
          ownerId: N.id,
          ownerName: N.name,
          groupName: N.group,
          inheritFromParent: !0,
          locked: !1,
          posix: ce.buildPosixFromOctal("0644"),
          acl: []
        }
      };
      dt.push(wa), be = [wa, ...be], wt(Pe, {
        status: "completed",
        percent: 100,
        bytesTransferred: ze,
        stage: "Tamamlandı (%100)",
        createdNodeId: wa.id
      });
    }
    if (dt.length > 0 || tt.size > 0) {
      De(be), tt.size > 0 ? ie(new Set(Array.from(tt))) : ie(new Set(dt.map((me) => me.id)));
      const oe = dt[0];
      K(
        "success",
        "Gerçek Dosya Yükleme Tamamlandı",
        tt.size > 0 ? `Klasör yapısı ve ${dt.length} dosya (${ae.formatBytes(
          dt.reduce((me, Se) => me + Se.size, 0)
        )}) başarıyla diske aktarıldı.` : dt.length === 1 && oe ? `"${oe.name}" (${ae.formatBytes(oe.size)} • SHA-256: ${oe.checksumSha256.slice(0, 10)}…) başarıyla aktarıldı.` : `${dt.length} dosya (${ae.formatBytes(
          dt.reduce((me, Se) => me + Se.size, 0)
        )}) başarıyla diske aktarıldı.`,
        (oe == null ? void 0 : oe.name) || "Klasör"
      );
    }
  }, Rr = async (r) => {
    const o = r.target.files;
    !o || o.length === 0 || (await xa(o, A), r.target.value = "");
  }, $r = async (r) => {
    const o = r.target.files;
    !o || o.length === 0 || (await xa(o, A), r.target.value = "");
  }, Or = Be((r) => {
    Vt.current.add(r), Et(
      (o) => o.map(
        (p) => p.id === r ? { ...p, status: "cancelled", stage: "İptal edildi" } : p
      )
    );
  }, []), Ur = Be(() => {
    Et(
      (r) => r.map((o) => o.status === "uploading" || o.status === "queued" ? (Vt.current.add(o.id), { ...o, status: "cancelled", stage: "İptal edildi" }) : o)
    );
  }, []), Gr = (r, o) => {
    Re(null);
    const p = o.trim();
    if (!p) return;
    const h = n.find((q) => q.id === r);
    if (!h || h.name === p) return;
    const f = ce.evaluateNodePermissions(
      h,
      N,
      n,
      a
    );
    if (!f.allowed.rename) {
      K(
        "error",
        "Yeniden Adlandırma Reddedildi",
        f.reasons.rename,
        h.name
      );
      return;
    }
    if (h.type !== "folder") {
      const q = ae.validateWriteOperation(
        h.parentId,
        p,
        0,
        n,
        a
      );
      if (!q.allowed) {
        K("error", "Uzantı Politikası Engeli", q.reason || p);
        return;
      }
    }
    const D = n.map(
      (q) => q.id === r ? { ...q, name: p, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : q
    );
    De(D), K("success", "Yeniden Adlandırıldı", `"${h.name}" -> "${p}"`, p);
  }, Mt = Be(
    (r) => {
      if (Y.size === 0) return;
      const o = n.filter((f) => Y.has(f.id)), p = [], h = [];
      for (const f of o) {
        const D = ce.evaluateNodePermissions(
          f,
          N,
          n,
          a
        );
        if (r === "copy" && !D.allowed.read) {
          h.push({ name: f.name, reason: D.reasons.read });
          continue;
        }
        if (r === "cut" && (!D.allowed.write || !D.allowed.delete)) {
          h.push({
            name: f.name,
            reason: D.reasons.delete || D.reasons.write
          });
          continue;
        }
        p.push(f.id);
      }
      if (p.length === 0) {
        const f = h[0];
        K(
          "error",
          r === "copy" ? "Kopyalama Engellendi" : "Kesme (Taşıma) Engellendi",
          f ? `"${f.name}": ${f.reason}` : "İzin yetersiz."
        );
        return;
      }
      S({
        mode: r,
        nodeIds: p,
        sourceParentId: A,
        timestamp: Date.now()
      }), h.length > 0 ? K(
        "warning",
        r === "copy" ? "Kısmi Kopyalama (Ctrl+C)" : "Kısmi Kesme (Ctrl+X)",
        `${p.length} öğe panoya alındı. ${h.length} kilitli/izinsiz öğe atlandı (${h.map((f) => f.name).join(", ")}).`
      ) : K(
        "info",
        r === "copy" ? "Panoya Kopyalandı (Ctrl+C)" : "Panoya Kesildi (Ctrl+X)",
        `${p.length} öğe panoya alındı. Diğer sekmelerde veya klasörlerde Ctrl+V ile yapıştırabilirsiniz.`
      );
    },
    [n, a, A, N, K, Y]
  ), Bt = Be(
    (r, o) => {
      if (!Le.mode || Le.nodeIds.length === 0) return;
      if (r) {
        const U = n.find((J) => J.id === r);
        if (U) {
          const J = ce.evaluateNodePermissions(
            U,
            N,
            n,
            a
          );
          if (!J.allowed.write) {
            K(
              "error",
              "Yapıştırma Reddedildi",
              `"${U.name}" klasörüne yazma izniniz yok: ${J.reasons.write}`
            );
            return;
          }
        }
      } else if (!Ze.allowed.write) {
        K("error", "Yapıştırma Reddedildi", Ze.reasons.write);
        return;
      }
      const p = n.filter((U) => Le.nodeIds.includes(U.id)), h = n.filter(
        (U) => !U.trashed && U.parentId === r
      ), f = [];
      for (const U of p) {
        const J = h.find(
          (Me) => Me.name.toLowerCase() === U.name.toLowerCase() && Me.id !== U.id
        );
        J && f.push({
          sourceNode: U,
          existingNode: J,
          targetParentId: r
        });
      }
      if (f.length > 0 && !o) {
        da(f);
        return;
      }
      let D = [...n];
      const q = (/* @__PURE__ */ new Date()).toISOString();
      for (const U of p) {
        if (U.id === r) continue;
        const J = D.find(
          (Me) => !Me.trashed && Me.parentId === r && Me.name.toLowerCase() === U.name.toLowerCase() && Me.id !== U.id
        );
        if (!(J && o === "skip")) {
          if (Le.mode === "copy") {
            const Me = ae.validateWriteOperation(
              r,
              U.name,
              U.size,
              D,
              a
            );
            if (!Me.allowed) {
              K("error", "Kota Sınırı Aşıldı", Me.reason || U.name);
              return;
            }
            J && o === "replace" && (D = D.filter((at) => at.id !== J.id));
            let be = U.name;
            if (J && o === "keep_both" || U.parentId === r) {
              const at = U.type === "folder" ? "" : U.extension;
              be = `${at ? U.name.slice(0, -at.length) : U.name}_kopya${at}`;
            }
            const tt = {
              ...JSON.parse(JSON.stringify(U)),
              id: `${U.type === "folder" ? "fld" : "fil"}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
              parentId: r,
              name: be,
              createdAt: q,
              updatedAt: q
            };
            D.push(tt);
          } else if (Le.mode === "cut") {
            J && o === "replace" && (D = D.filter((be) => be.id !== J.id));
            let Me = U.name;
            if (J && o === "keep_both") {
              const be = U.type === "folder" ? "" : U.extension;
              Me = `${be ? U.name.slice(0, -be.length) : U.name}_tasinan${be}`;
            }
            D = D.map(
              (be) => be.id === U.id ? { ...be, parentId: r, name: Me, updatedAt: q } : be
            );
          }
        }
      }
      Le.mode === "cut" && S({ mode: null, nodeIds: [], sourceParentId: null, timestamp: 0 }), da(null), De(D), K(
        "success",
        "Yapıştırma Tamamlandı (Ctrl+V)",
        `${p.length} öğe hedef dizine aktarıldı.`
      );
    },
    [n, Le, De, a, Ze, N, K]
  ), zt = (r, o) => {
    const p = r ? n.find((U) => U.id === r) : null;
    if (r && !p) return;
    if (p) {
      const U = ce.evaluateNodePermissions(
        p,
        N,
        n,
        a
      );
      if (!U.allowed.write) {
        K(
          "error",
          "Taşıma Engellendi",
          `"${p.name}" klasörüne yazma izniniz yok: ${U.reasons.write}`
        );
        return;
      }
    }
    const h = [], f = [];
    for (const U of o) {
      if (U === r) continue;
      const J = n.find((be) => be.id === U);
      if (!J || J.parentId === r) continue;
      const Me = ce.evaluateNodePermissions(
        J,
        N,
        n,
        a
      );
      if (!Me.allowed.delete || !Me.allowed.write) {
        f.push({
          id: J.id,
          name: J.name,
          reason: Me.reasons.delete || Me.reasons.write
        });
        continue;
      }
      h.push(U);
    }
    if (h.length === 0) {
      f.length > 0 && K(
        "error",
        "Taşıma Reddedildi",
        `"${f[0].name}" taşınamaz: ${f[0].reason}`
      );
      return;
    }
    const D = n.map(
      (U) => h.includes(U.id) ? { ...U, parentId: r, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : U
    );
    De(D), ie(new Set(f.map((U) => U.id)));
    const q = p ? p.name : `${a.volumeName} (D:)`;
    f.length > 0 ? K(
      "warning",
      "Taşınabilir Öğeler Aktarıldı",
      `${h.length} öğe "${q}" konumuna taşındı. Kilitli/izinsiz ${f.length} öğe (${f.map((U) => U.name).join(", ")}) yerinde bırakıldı.`
    ) : K(
      "success",
      "Sürükle & Bırak Taşıma",
      `${h.length} öğe "${q}" konumuna taşındı.`
    );
  }, Zt = Be(
    (r = !1) => {
      if (Y.size === 0) return;
      const o = n.filter((f) => Y.has(f.id)), p = /* @__PURE__ */ new Set(), h = [];
      for (const f of o) {
        const D = ce.evaluateNodePermissions(
          f,
          N,
          n,
          a
        );
        if (!D.allowed.delete) {
          h.push({
            id: f.id,
            name: f.name,
            reason: D.reasons.delete
          });
          continue;
        }
        p.add(f.id);
      }
      if (p.size === 0) {
        const f = h[0];
        K(
          "error",
          "Silme İşlemi Reddedildi (EACCES)",
          f ? `"${f.name}": ${f.reason}` : "Silme yetkiniz yok.",
          f == null ? void 0 : f.name
        );
        return;
      }
      if (!a.enableRecycleBin || r || d === "trash") {
        const f = n.filter((D) => !p.has(D.id));
        De(f), ie(new Set(h.map((D) => D.id))), K(
          h.length > 0 ? "warning" : "info",
          "Kalıcı Olarak Silindi",
          h.length > 0 ? `${p.size} öğe silindi, kilitli/izinsiz ${h.length} öğe atlandı.` : `${p.size} öğe diskten kalıcı olarak kaldırıldı.`
        );
      } else {
        const f = (/* @__PURE__ */ new Date()).toISOString(), D = n.map(
          (q) => p.has(q.id) ? { ...q, trashed: !0, trashedAt: f } : q
        );
        De(D), ie(new Set(h.map((q) => q.id))), K(
          h.length > 0 ? "warning" : "info",
          "Geri Dönüşüm Kutusuna Taşındı",
          h.length > 0 ? `${p.size} öğe çöp kutusuna gönderildi, kilitli/izinsiz ${h.length} öğe atlandı.` : `${p.size} öğe çöp kutusuna gönderildi.`
        );
      }
    },
    [n, De, a, N, d, K, Y]
  ), jr = () => {
    if (Y.size === 0) return;
    const r = n.map(
      (o) => Y.has(o.id) ? { ...o, trashed: !1, trashedAt: void 0 } : o
    );
    De(r), ie(/* @__PURE__ */ new Set()), K("success", "Geri Yüklendi", "Seçili öğeler orijinal konumlarına geri yüklendi.");
  }, Kr = () => {
    if (he.length === 0) return;
    if (!Ze.allowed.write) {
      K("error", "Arşivleme Engellendi", Ze.reasons.write);
      return;
    }
    const r = he.reduce((q, U) => q + (U.size || 2 * 1024 * 1024), 0), o = Math.max(512 * 1024, Math.round(r * 0.62)), p = he.length === 1 ? `${he[0].name.replace(/\.[^/.]+$/, "")}_bundle.zip` : `archive_${Date.now().toString().slice(-4)}.zip`, h = ae.validateWriteOperation(
      A,
      p,
      o,
      n,
      a
    );
    if (!h.allowed) {
      K("error", "Kota Sınırı Aşıldı", h.reason || p);
      return;
    }
    const f = (/* @__PURE__ */ new Date()).toISOString(), D = {
      id: `zip_${Date.now()}`,
      parentId: A,
      name: p,
      type: "archive",
      category: "archive",
      extension: ".zip",
      mimeType: "application/zip",
      size: o,
      createdAt: f,
      updatedAt: f,
      starred: !1,
      tags: ["Compressed", `${he.length}-items`],
      colorTag: "amber",
      trashed: !1,
      archivedChildrenSnapshot: JSON.parse(JSON.stringify(he)),
      checksumSha256: Date.now().toString(16).padStart(64, "c"),
      security: {
        ownerId: N.id,
        ownerName: N.name,
        groupName: N.group,
        inheritFromParent: !0,
        locked: !1,
        posix: ce.buildPosixFromOctal("0644"),
        acl: []
      }
    };
    De([...n, D]), ie(/* @__PURE__ */ new Set([D.id])), K(
      "success",
      "ZIP Arşivi Oluşturuldu",
      `"${p}" (${ae.formatBytes(o)}) sıkıştırıldı.`
    );
  }, Hr = (r) => {
    if (!Ze.allowed.write) {
      K("error", "Çıkartma Engellendi", Ze.reasons.write);
      return;
    }
    const o = r.name.replace(/\.(zip|tar|gz)$/i, "") + "_extracted", p = (/* @__PURE__ */ new Date()).toISOString(), h = `fld_ext_${Date.now()}`, f = {
      id: h,
      parentId: A,
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
        ownerId: N.id,
        ownerName: N.name,
        groupName: N.group,
        inheritFromParent: !0,
        locked: !1,
        posix: ce.buildPosixFromOctal("0755"),
        acl: []
      }
    }, q = (r.archivedChildrenSnapshot || [
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
          ownerId: N.id,
          ownerName: N.name,
          groupName: N.group,
          inheritFromParent: !0,
          locked: !1,
          posix: ce.buildPosixFromOctal("0644"),
          acl: []
        }
      }
    ]).map((U, J) => ({
      ...U,
      id: `ext_${Date.now()}_${J}`,
      parentId: h,
      updatedAt: p
    }));
    De([...n, f, ...q]), K(
      "success",
      "Arşiv Klasöre Çıkartıldı",
      `"${o}" dizinine ${q.length} öğe çıkartıldı.`
    );
  }, Wr = (r, o, p) => {
    const h = /* @__PURE__ */ new Set([r]);
    if (p) {
      let D = !0;
      for (; D; ) {
        D = !1;
        for (const q of n)
          q.parentId && h.has(q.parentId) && !h.has(q.id) && (h.add(q.id), D = !0);
      }
    }
    const f = n.map((D) => D.id === r ? { ...D, security: o, updatedAt: (/* @__PURE__ */ new Date()).toISOString() } : p && h.has(D.id) ? {
      ...D,
      security: {
        ...D.security,
        ownerId: o.ownerId,
        ownerName: o.ownerName,
        groupName: o.groupName,
        locked: o.locked,
        posix: o.posix,
        acl: o.acl
      }
    } : D);
    De(f), K(
      "success",
      "İzin & Kota Politikası Güncellendi",
      `POSIX ${o.posix.octal} ve ACL kuralları kaydedildi.`
    );
  }, Vr = (r) => {
    const o = n.map((p) => p.id === r.id ? { ...p, starred: !p.starred } : p);
    De(o, !1);
  }, Yr = (r) => {
    const o = ce.evaluateNodePermissions(
      r,
      N,
      n,
      a
    );
    if (!o.allowed.lock && N.role !== "admin") {
      K("error", "Kilit Yetkisi Yok", o.reasons.lock);
      return;
    }
    const p = !r.security.locked, h = n.map(
      (f) => f.id === r.id ? {
        ...f,
        security: {
          ...f.security,
          locked: p,
          lockedBy: p ? N.name : void 0
        }
      } : f
    );
    De(h), K(
      "info",
      p ? "Öğe Kilitlendi (Immutable)" : "Öğe Kilidi Açıldı",
      `"${r.name}" ${p ? "yazmaya karşı korundu." : "tekrar düzenlenebilir."}`
    );
  }, Xr = (r, o) => {
    const p = n.map((h) => h.id === r ? { ...h, colorTag: o } : h);
    De(p, !1);
  };
  Ke(() => {
    if (!a.enableKeyboardShortcuts) return;
    const r = (o) => {
      var h;
      const p = (h = document.activeElement) == null ? void 0 : h.tagName.toLowerCase();
      p === "input" || p === "textarea" || p === "select" || ((o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "c" ? (o.preventDefault(), Mt("copy")) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "x" ? (o.preventDefault(), Mt("cut")) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "v" ? (o.preventDefault(), Bt(A)) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "a" ? (o.preventDefault(), ie(new Set(et.map((f) => f.id)))) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "z" ? (o.preventDefault(), pa()) : (o.ctrlKey || o.metaKey) && o.key.toLowerCase() === "y" ? (o.preventDefault(), ha()) : o.key === "Delete" ? (o.preventDefault(), Zt(o.shiftKey)) : o.key === "F2" && Y.size === 1 && (o.preventDefault(), Re(Array.from(Y)[0])));
    };
    return window.addEventListener("keydown", r), () => window.removeEventListener("keydown", r);
  }, [
    a.enableKeyboardShortcuts,
    A,
    Bt,
    Mt,
    Zt,
    ha,
    pa,
    Y,
    et
  ]);
  const Ya = (r, o = 0) => {
    const p = n.filter((h) => !h.trashed && h.type === "folder" && h.parentId === r).sort((h, f) => h.name.localeCompare(f.name, "tr"));
    return p.length === 0 ? null : /* @__PURE__ */ e("div", { className: "space-y-0.5", children: p.map((h) => {
      var U;
      const f = n.some(
        (J) => !J.trashed && J.type === "folder" && J.parentId === h.id
      ), D = Ve.has(h.id), q = d === "volume" && A === h.id;
      return /* @__PURE__ */ t("div", { children: [
        /* @__PURE__ */ t(
          "div",
          {
            style: { paddingLeft: `${o * 14 + 8}px` },
            onClick: () => {
              R(h.id, "volume"), V(!1);
            },
            onAuxClick: (J) => {
              J.button === 1 && (J.preventDefault(), xe(h.id, "volume"));
            },
            onContextMenu: (J) => {
              J.preventDefault(), J.stopPropagation(), Te({ x: J.clientX, y: J.clientY, node: h });
            },
            onDragOver: (J) => {
              a.enableDragAndDrop && (J.preventDefault(), J.dataTransfer.dropEffect = "move");
            },
            onDrop: (J) => {
              if (a.enableDragAndDrop) {
                J.preventDefault(), J.stopPropagation();
                try {
                  const Me = J.dataTransfer.getData("application/filemangl-nodes") || J.dataTransfer.getData("text/plain");
                  if (!Me) return;
                  const be = JSON.parse(Me);
                  Array.isArray(be) && be.length > 0 && zt(h.id, be);
                } catch {
                }
              }
            },
            className: `group flex items-center justify-between pr-2 py-1.5 rounded-md cursor-pointer text-xs transition ${q ? "bg-blue-600/20 text-blue-300 font-semibold" : "text-slate-300 hover:bg-slate-800/70"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5 min-w-0", children: [
                f ? /* @__PURE__ */ e(
                  "button",
                  {
                    onClick: (J) => {
                      J.stopPropagation(), bt((Me) => {
                        const be = new Set(Me);
                        return be.has(h.id) ? be.delete(h.id) : be.add(h.id), be;
                      });
                    },
                    className: "p-0.5 text-slate-400 hover:text-white",
                    children: D ? /* @__PURE__ */ e(Ia, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ e(gr, { className: "w-3.5 h-3.5" })
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
                h.security.locked && /* @__PURE__ */ e(ft, { className: "w-3 h-3 text-rose-400 shrink-0" }),
                ((U = h.security.quota) == null ? void 0 : U.maxBytes) && /* @__PURE__ */ t("span", { className: "text-[9px] font-mono px-1 rounded bg-slate-900 text-amber-300 border border-amber-500/30", children: [
                  Math.round(h.security.quota.maxBytes / (1024 * 1024)),
                  "M"
                ] })
              ] })
            ]
          }
        ),
        f && D && Ya(h.id, o + 1)
      ] }, h.id);
    }) });
  }, ya = ae.computeTotalVolumeUsed(n), Qt = Math.min(
    100,
    ya / Math.max(1, a.totalDiskQuotaBytes) * 100
  ), F = he.length === 1 ? he[0] : qe, Rt = We(() => F ? ce.evaluateNodePermissions(
    F,
    N,
    n,
    a
  ) : null, [F, N, n, a]), Xa = Be(
    (r) => {
      const o = new Map(n.map((D) => [D.id, D])), p = [];
      let h = r.parentId ? o.get(r.parentId) : void 0, f = 0;
      for (; h && f < 20; )
        f++, p.unshift(h.name), h = h.parentId ? o.get(h.parentId) : void 0;
      return p.length > 0 ? `D:\\${p.join("\\")}` : "D:\\";
    },
    [n]
  );
  return /* @__PURE__ */ t(
    "div",
    {
      onClick: () => {
        Te(null), k(null);
      },
      className: `flex flex-col bg-[#0b101b] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden ${a.theme === "light" ? "theme-light" : ""} ${s ? "fixed inset-0 z-50 rounded-none" : "rounded-2xl h-[680px] sm:h-[780px]"}`,
      children: [
        /* @__PURE__ */ e(
          "input",
          {
            ref: Yt,
            type: "file",
            multiple: !0,
            onChange: Rr,
            className: "hidden",
            "data-testid": "file-upload-input"
          }
        ),
        /* @__PURE__ */ e(
          "input",
          {
            ref: Xt,
            type: "file",
            multiple: !0,
            webkitdirectory: "",
            directory: "",
            onChange: $r,
            className: "hidden",
            "data-testid": "folder-upload-input"
          }
        ),
        /* @__PURE__ */ t("div", { className: "px-1.5 sm:px-2 pt-1.5 bg-[#080c14] border-b border-slate-800/90 flex items-end justify-between gap-1.5 sm:gap-2 select-none", children: [
          /* @__PURE__ */ t("div", { className: "flex items-end gap-1 overflow-x-auto no-scrollbar min-w-0 flex-1", children: [
            z.map((r) => {
              const o = r.id === I.id, p = $e(r), h = r.navSection === "trash" ? "delete" : r.navSection === "starred" ? "star" : r.navSection === "shared" ? "share" : r.navSection === "locked" ? "lock" : r.folderId ? "folder" : "hard_drive", f = r.navSection === "trash" ? "text-rose-400" : r.navSection === "starred" ? "text-amber-400" : r.navSection === "shared" ? "text-emerald-400" : r.navSection === "locked" ? "text-rose-400" : r.folderId ? "text-amber-400" : "text-blue-400";
              return /* @__PURE__ */ t(
                "div",
                {
                  onClick: () => {
                    B(r.id), ie(/* @__PURE__ */ new Set());
                  },
                  onAuxClick: (D) => {
                    D.button === 1 && ye(r.id, D);
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
                    z.length > 1 && /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: (D) => ye(r.id, D),
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
                onClick: () => xe(A, d),
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
                  value: N.id,
                  onChange: (r) => {
                    const o = ht.find((p) => p.id === r.target.value);
                    o && (O(o), K(
                      "info",
                      "Oturum Kimliği Değiştirildi",
                      `Aktif kullanıcı: ${o.name} [Rol: ${o.role.toUpperCase()}]`
                    ));
                  },
                  className: "bg-transparent text-[11px] font-semibold text-white focus:outline-none cursor-pointer max-w-[92px] sm:max-w-none truncate",
                  children: ht.map((r) => /* @__PURE__ */ t("option", { value: r.id, className: "bg-slate-900 text-white", children: [
                    r.name.split(" (")[0],
                    " [",
                    r.role.toUpperCase(),
                    "]"
                  ] }, r.id))
                }
              )
            ] }),
            /* @__PURE__ */ e(
              Pn,
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
            c && /* @__PURE__ */ e(
              "button",
              {
                onClick: c,
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
                onClick: () => V((r) => !r),
                className: `md:hidden w-7 h-7 rounded-md flex items-center justify-center transition mr-0.5 ${ue ? "bg-blue-600/30 text-blue-300 border border-blue-500/50" : "hover:bg-slate-800 text-slate-200"}`,
                title: "Klasör Ağacını Aç/Kapat",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "left_panel_open" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                disabled: I.historyIndex <= 0,
                onClick: te,
                className: "w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                title: "Geri (Alt+Sol)",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "17px" }, children: "arrow_back" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                disabled: I.historyIndex >= I.history.length - 1,
                onClick: se,
                className: "w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                title: "İleri (Alt+Sağ)",
                children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "17px" }, children: "arrow_forward" })
              }
            ),
            /* @__PURE__ */ e(
              "button",
              {
                disabled: !A && d === "volume",
                onClick: () => {
                  if (d !== "volume") {
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
                  Q(""), E("all"), K("info", "Görünüm Yenilendi", "Dizin ağacı ve önbellek tazelendi.");
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
                  onClick: () => R(null, "volume"),
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
                  onClick: () => R(null, "volume"),
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
                        Array.isArray(p) && p.length > 0 && zt(null, p);
                      } catch {
                      }
                    }
                  },
                  className: `px-1.5 py-0.5 rounded hover:bg-slate-800 shrink-0 transition ${d === "volume" && !A ? "text-white font-semibold" : "text-slate-300"}`,
                  children: [
                    a.volumeName,
                    " (D:)"
                  ]
                }
              ),
              d !== "volume" ? /* @__PURE__ */ t(Je, { children: [
                /* @__PURE__ */ e(
                  "span",
                  {
                    className: "material-symbols-outlined text-slate-500 shrink-0",
                    style: { fontSize: "15px" },
                    children: "chevron_right"
                  }
                ),
                /* @__PURE__ */ e("span", { className: "px-1.5 py-0.5 text-amber-400 font-semibold shrink-0", children: d === "trash" ? i.explorer.recycleBin : d === "starred" ? i.explorer.starred : d === "shared" ? i.explorer.shared : i.explorer.lockedVault })
              ] }) : Ha.map((r, o) => /* @__PURE__ */ t(Ma.Fragment, { children: [
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
                    onClick: () => R(r.id, "volume"),
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
                          Array.isArray(f) && f.length > 0 && zt(r.id, f);
                        } catch {
                        }
                      }
                    },
                    className: `px-1.5 py-0.5 rounded hover:bg-slate-800 truncate max-w-[140px] sm:max-w-[180px] transition ${o === Ha.length - 1 ? "text-white font-semibold" : "text-slate-300"}`,
                    children: r.name
                  }
                )
              ] }, r.id))
            ] }),
            /* @__PURE__ */ t("div", { className: "hidden lg:flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-800 text-[11px] font-mono text-emerald-400", children: [
              /* @__PURE__ */ t("span", { children: [
                et.length.toLocaleString(a.locale),
                " öğe"
              ] }),
              /* @__PURE__ */ e("span", { className: "text-slate-600", children: "•" }),
              /* @__PURE__ */ t("span", { children: [
                Br,
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
                onChange: (r) => Q(r.target.value),
                className: "w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-md pl-3 pr-8 py-1 text-xs text-white focus:outline-none transition"
              }
            ),
            b ? /* @__PURE__ */ e(
              "button",
              {
                onClick: () => Q(""),
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
                      onClick: () => k((r) => r === "new" ? null : "new"),
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
                  ne === "new" && /* @__PURE__ */ t("div", { className: "absolute left-0 top-full mt-1 z-50 w-56 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200", children: [
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Va(), k(null);
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
                          qt(), k(null);
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
                          qt(
                            `Module_${Date.now().toString().slice(-4)}.ts`,
                            `export const version = '2.4.0';
`,
                            64 * 1024,
                            "code"
                          ), k(null);
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
                          (r = Yt.current) == null || r.click(), k(null);
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
                          (r = Xt.current) == null || r.click(), k(null);
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
                      return (r = Yt.current) == null ? void 0 : r.click();
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
                      return (r = Xt.current) == null ? void 0 : r.click();
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
                    disabled: Y.size === 0,
                    onClick: () => Mt("cut"),
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: `${i.explorer.cut} (Ctrl+X)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "content_cut" })
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Y.size === 0,
                    onClick: () => Mt("copy"),
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: `${i.explorer.copy} (Ctrl+C)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "content_copy" })
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    disabled: !Le.mode,
                    onClick: () => Bt(A),
                    className: `relative px-2 h-8 rounded-md flex items-center justify-center gap-1 transition ${Le.mode ? "bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30" : "opacity-30 text-slate-300"}`,
                    title: `${i.explorer.paste} (Ctrl+V)`,
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "content_paste" }),
                      Le.nodeIds.length > 0 && /* @__PURE__ */ e("span", { className: "text-[10px] font-mono font-bold", children: Le.nodeIds.length })
                    ]
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Y.size === 0,
                    onClick: () => {
                      Y.size === 1 ? Re(Array.from(Y)[0]) : a.enableBatchRename && Ga(!0);
                    },
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: `${i.explorer.rename} (F2)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "drive_file_rename_outline" })
                  }
                ),
                a.enableShareLinks && /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: he.length !== 1,
                    onClick: () => he[0] && Ht(he[0]),
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition",
                    title: i.explorer.ctxShare,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "share" })
                  }
                ),
                d === "trash" && /* @__PURE__ */ t(
                  "button",
                  {
                    disabled: Y.size === 0,
                    onClick: jr,
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
                    disabled: Y.size === 0,
                    onClick: () => Zt(!1),
                    className: "w-8 h-8 rounded-md hover:bg-rose-500/20 disabled:opacity-30 text-slate-200 hover:text-rose-300 flex items-center justify-center transition",
                    title: `${i.explorer.ctxDelete} (Del)`,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "delete" })
                  }
                ),
                a.enableArchiveCompression && /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: Y.size === 0,
                    onClick: Kr,
                    className: "w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-amber-400 flex items-center justify-center transition",
                    title: i.explorer.zipCompress,
                    children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "folder_zip" })
                  }
                ),
                /* @__PURE__ */ t(
                  "button",
                  {
                    disabled: Y.size === 0 && !qe,
                    onClick: () => void vt(),
                    className: "px-2 h-8 rounded-md hover:bg-emerald-500/20 disabled:opacity-30 text-emerald-300 flex items-center justify-center gap-1 transition",
                    title: "Seçili Klasörü veya Seçim Dörtgenini ZIP Olarak İndir (.zip)",
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "18px" }, children: "archive" }),
                      /* @__PURE__ */ e("span", { className: "hidden xl:inline text-[11px] font-semibold", children: "ZIP İndir" }),
                      Y.size > 0 && /* @__PURE__ */ e("span", { className: "text-[10px] font-mono font-bold px-1 rounded bg-emerald-500/20 text-emerald-300", children: Y.size })
                    ]
                  }
                ),
                /* @__PURE__ */ e(
                  "button",
                  {
                    disabled: !F,
                    onClick: () => F && lt(F),
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
                      onClick: () => k((r) => r === "sort" ? null : "sort"),
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
                  ne === "sort" && /* @__PURE__ */ t("div", { className: "absolute left-0 sm:left-0 top-full mt-1 z-50 w-56 max-w-[calc(100vw-24px)] rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200 whitespace-normal", children: [
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
                          ke(r), k(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: o }),
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
                    /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
                    /* @__PURE__ */ e("div", { className: "px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400", children: "Yön" }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          Xe("asc"), k(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: "Artan (A-Z / Küçükten Büyüğe)" }),
                          _e === "asc" && /* @__PURE__ */ e(
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
                          Xe("desc"), k(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: "Azalan (Z-A / Büyükten Küçüğe)" }),
                          _e === "desc" && /* @__PURE__ */ e(
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
                          Ie(r), k(null);
                        },
                        className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                        children: [
                          /* @__PURE__ */ e("span", { children: o }),
                          Ce === r && /* @__PURE__ */ e(
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
                      onClick: () => k((r) => r === "view" ? null : "view"),
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
                  ne === "view" && /* @__PURE__ */ t("div", { className: "absolute left-0 top-full mt-1 z-50 w-60 max-w-[calc(100vw-24px)] rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200 whitespace-normal", children: [
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
                          ve(r), k(null);
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
                          de === r && /* @__PURE__ */ e(
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
                            ve("webgl_spatial"), k(null);
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
                            de === "webgl_spatial" && /* @__PURE__ */ e(
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
                            ve("webgl_diskmap"), k(null);
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
                            de === "webgl_diskmap" && /* @__PURE__ */ e(
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
                          l == null || l({ enableDualPane: !a.enableDualPane }), k(null);
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
                      onClick: () => k((r) => r === "more" ? null : "more"),
                      className: "w-8 h-8 rounded-md hover:bg-slate-800 text-slate-300 flex items-center justify-center transition",
                      title: "Diğer İşlemler & Performans Stres Testi (⋯)",
                      children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "20px" }, children: "more_horiz" })
                    }
                  ),
                  ne === "more" && /* @__PURE__ */ t("div", { className: "absolute right-0 sm:left-0 top-full mt-1 z-50 w-64 max-w-[calc(100vw-24px)] rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200 whitespace-normal", children: [
                    /* @__PURE__ */ t("div", { className: "px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "bolt" }),
                      /* @__PURE__ */ e("span", { children: "Performans Stres Testi (Fake Dosya)" })
                    ] }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => {
                          const r = performance.now(), o = ot(2500, A);
                          De([...n, ...o], !1);
                          const p = (performance.now() - r).toFixed(1);
                          k(null), K(
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
                          const r = performance.now(), o = ot(1e4, A);
                          De([...n, ...o], !1);
                          const p = (performance.now() - r).toFixed(1);
                          k(null), K(
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
                          const r = performance.now(), o = ot(25e3, A);
                          De([...n, ...o], !1);
                          const p = (performance.now() - r).toFixed(1);
                          k(null), K(
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
                          De(r, !1), ie(/* @__PURE__ */ new Set()), k(null), K(
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
                          pa(), k(null);
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
                        disabled: T.length === 0,
                        onClick: () => {
                          ha(), k(null);
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
                          const r = await m.resetToFactoryDefaults();
                          u(r), R(null, "volume"), ie(/* @__PURE__ */ new Set()), k(null), K(
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
                Wt.length > 0 && /* @__PURE__ */ t(
                  "button",
                  {
                    onClick: () => {
                      ma((r) => !r), ua(!1);
                    },
                    className: "px-2 py-1 rounded-md bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold flex items-center gap-1.5 transition",
                    title: "Yükleme Kuyruğunu Göster/Gizle (Google Drive Transfer Paneli)",
                    children: [
                      /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "cloud_upload" }),
                      /* @__PURE__ */ t("span", { children: [
                        "Kuyruk (",
                        Wt.length,
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
                        const r = performance.now(), o = ot(2500, A);
                        De([...n, ...o], !1);
                        const p = (performance.now() - r).toFixed(1);
                        K(
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
                        const r = performance.now(), o = ot(1e4, A);
                        De([...n, ...o], !1);
                        const p = (performance.now() - r).toFixed(1);
                        K(
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
                        De(r, !1), ie(/* @__PURE__ */ new Set());
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
                        const r = !y;
                        fe(r), r && !a.enableDetailsInspector && (l == null || l({ enableDetailsInspector: !0 }));
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
            ue && /* @__PURE__ */ e(
              "div",
              {
                onClick: () => V(!1),
                className: "absolute inset-0 bg-black/60 backdrop-blur-[1px] z-30 md:hidden"
              }
            ),
            /* @__PURE__ */ t(
              "div",
              {
                style: { width: `${ge}px` },
                className: `bg-[#0d131f] border-r border-slate-800/90 flex-col justify-between shrink-0 select-none ${ue ? "absolute inset-y-0 left-0 z-40 flex max-w-[85vw] shadow-2xl md:static" : "hidden md:flex"}`,
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
                          onClick: () => V(!1),
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
                            R(null, "volume"), V(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${d === "volume" && A === null ? "bg-blue-600/20 text-blue-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
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
                            $("starred"), V(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${d === "starred" ? "bg-amber-500/20 text-amber-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
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
                            $("shared"), V(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${d === "shared" ? "bg-emerald-500/20 text-emerald-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
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
                            $("locked"), V(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${d === "locked" ? "bg-rose-500/20 text-rose-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
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
                            $("trash"), V(!1);
                          },
                          className: `w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${d === "trash" ? "bg-rose-500/20 text-rose-300 font-semibold" : "text-slate-300 hover:bg-slate-800/60"}`,
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
                            R(null, "volume"), V(!1);
                          },
                          onAuxClick: (r) => {
                            r.button === 1 && (r.preventDefault(), xe(null, "volume"));
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
                                Array.isArray(p) && p.length > 0 && zt(null, p);
                              } catch {
                              }
                            }
                          },
                          className: `w-full px-2.5 py-1.5 mb-0.5 rounded-md flex items-center justify-between gap-1.5 text-xs font-semibold transition cursor-pointer ${d === "volume" && A === null ? "bg-blue-600/20 text-blue-300" : "text-slate-200 hover:bg-slate-800/70"}`,
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
                      Ya(null, 0)
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
                        Qt.toFixed(1),
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ e("div", { className: "w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800", children: /* @__PURE__ */ e(
                      "div",
                      {
                        style: { width: `${Qt}%` },
                        className: `h-full transition-all duration-300 ${Qt > 85 ? "bg-rose-500" : Qt > 65 ? "bg-amber-500" : "bg-gradient-to-r from-blue-500 to-cyan-400"}`
                      }
                    ) }),
                    /* @__PURE__ */ t("div", { className: "flex justify-between text-[10px] font-mono text-slate-400", children: [
                      /* @__PURE__ */ e("span", { children: ae.formatBytes(ya) }),
                      /* @__PURE__ */ e("span", { children: ae.formatBytes(a.totalDiskQuotaBytes) })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ e(
              "div",
              {
                onMouseDown: (r) => ee("left", r),
                className: "w-1 hover:w-1.5 bg-transparent hover:bg-blue-500/60 cursor-col-resize transition-all shrink-0 hidden md:block z-20",
                title: "Sol Bölmeyi Yeniden Boyutlandır (Sürükle)"
              }
            )
          ] }),
          /* @__PURE__ */ t("div", { className: "flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0b101b] relative min-w-0", children: [
            /* @__PURE__ */ t("div", { className: "flex-1 h-full overflow-hidden relative flex flex-col min-w-0 min-h-0", children: [
              de === "webgl_spatial" && a.enableWebGLAcceleration ? /* @__PURE__ */ e(
                hn,
                {
                  nodes: et,
                  allNodes: n,
                  selectedIds: Y,
                  clipboard: Le,
                  currentUser: N,
                  config: a,
                  onSelectNode: fa,
                  onSelectMany: Wa,
                  onOpenNode: At,
                  onContextMenuNode: (r, o) => Te({ x: r.clientX, y: r.clientY, node: o }),
                  onDropNodesIntoFolder: zt,
                  onInjectStressNodes: (r) => {
                    const o = ot(r, A);
                    De([...n, ...o]), K(
                      "success",
                      "WebGL Stres Testi Başlatıldı",
                      `${r} sentetik düğüm GPU sahnesine eklendi.`
                    );
                  },
                  onClearStressNodes: () => {
                    const r = n.filter((o) => !o.isSyntheticStressNode);
                    De(r), K("info", "Stres Düğümleri Temizlendi", "Sentetik düğümler kaldırıldı.");
                  }
                }
              ) : de === "webgl_diskmap" && a.enableWebGLDiskMap ? /* @__PURE__ */ e(
                gn,
                {
                  allNodes: n,
                  currentFolderId: A,
                  selectedIds: Y,
                  currentUser: N,
                  config: a,
                  onSelectNode: fa,
                  onOpenNode: At
                }
              ) : /* @__PURE__ */ e(
                dn,
                {
                  nodes: et,
                  allNodes: n,
                  viewMode: de,
                  selectedIds: Y,
                  clipboard: Le,
                  renamingId: we,
                  sortField: pe,
                  sortDirection: _e,
                  groupBy: Ce,
                  currentUser: N,
                  config: a,
                  onSelectNode: fa,
                  onSelectMany: Wa,
                  onOpenNode: At,
                  onContextMenuNode: (r, o) => Te({ x: r.clientX, y: r.clientY, node: o }),
                  onCommitRename: Gr,
                  onCancelRename: () => Re(null),
                  onSortChange: (r) => {
                    pe === r ? Xe((o) => o === "asc" ? "desc" : "asc") : (ke(r), Xe("asc"));
                  },
                  onDropNodesIntoFolder: zt,
                  onExternalFilesDropped: (r, o) => xa(r, o ?? A)
                }
              ),
              (he.length > 1 || he.length === 1 && he[0].type === "folder") && /* @__PURE__ */ t(
                "div",
                {
                  "data-testid": "selection-zip-bar",
                  onClick: (r) => r.stopPropagation(),
                  className: "absolute bottom-3 left-1/2 -translate-x-1/2 z-30 max-w-[calc(100%-24px)] px-3.5 py-2 rounded-full bg-slate-950/95 border border-emerald-500/50 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs select-none",
                  children: [
                    /* @__PURE__ */ e("span", { className: "font-semibold text-white truncate", children: he.length === 1 ? `📁 ${he[0].name}` : `${he.length} öğe seçildi` }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => void vt(he),
                        className: "px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1.5 shrink-0 transition shadow",
                        children: [
                          /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "15px" }, children: "folder_zip" }),
                          /* @__PURE__ */ e("span", { children: he.length === 1 ? "Klasörü ZIP İndir (.zip)" : "Seçimi ZIP İndir (.zip)" })
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
                  /* @__PURE__ */ e(xl, { className: "w-3.5 h-3.5 text-cyan-400 shrink-0" }),
                  /* @__PURE__ */ e("span", { className: "font-semibold text-white truncate", children: i.explorer.secondaryPane }),
                  /* @__PURE__ */ t(
                    "select",
                    {
                      value: le || "",
                      onChange: (r) => W(r.target.value || null),
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
                    disabled: Y.size === 0,
                    onClick: () => {
                      Y.size !== 0 && zt(
                        le || "",
                        Array.from(Y)
                      );
                    },
                    className: "px-2.5 py-1 rounded bg-cyan-600/25 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/35 disabled:opacity-35 text-[11px] font-medium shrink-0",
                    children: i.explorer.transferHere
                  }
                )
              ] }),
              /* @__PURE__ */ e("div", { className: "flex-1 overflow-auto p-3 space-y-1.5", children: n.filter((r) => !r.trashed && r.parentId === le).map((r) => /* @__PURE__ */ t(
                "div",
                {
                  onDoubleClick: () => {
                    r.type === "folder" ? W(r.id) : At(r);
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
            y && /* @__PURE__ */ e(
              "div",
              {
                onClick: () => fe(!1),
                className: "absolute inset-0 bg-black/60 backdrop-blur-[1px] z-30 lg:hidden"
              }
            ),
            /* @__PURE__ */ e(
              "div",
              {
                onMouseDown: (r) => ee("right", r),
                className: "w-1 hover:w-1.5 bg-transparent hover:bg-blue-500/60 cursor-col-resize transition-all shrink-0 hidden lg:block z-20",
                title: "Ayrıntılar Bölmesini Yeniden Boyutlandır (Sürükle)"
              }
            ),
            /* @__PURE__ */ t(
              "div",
              {
                style: { width: `${C}px` },
                className: `bg-[#0d131f] border-l border-slate-800/90 flex-col justify-between shrink-0 overflow-y-auto select-none ${y ? "absolute inset-y-0 right-0 z-40 flex max-w-[90vw] shadow-2xl lg:static" : "hidden lg:flex"}`,
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
                        /* @__PURE__ */ e("div", { className: "text-[11px] text-slate-400 mt-0.5", children: Y.size > 1 ? `${Y.size} öğe seçildi` : F ? F.type === "folder" ? i.explorer.fileFolder : `${F.extension ? F.extension.slice(1).toUpperCase() : "SYSTEM"} ${i.explorer.fileSuffix}` : "Dizin Özeti" })
                      ] })
                    ] }),
                    /* @__PURE__ */ e(
                      "button",
                      {
                        onClick: () => {
                          fe(!1), (typeof window > "u" || window.innerWidth >= 1024) && (l == null || l({ enableDetailsInspector: !1 }));
                        },
                        className: "w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white",
                        title: "Kapat",
                        children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "close" })
                      }
                    )
                  ] }),
                  he.length > 1 && /* @__PURE__ */ t("div", { className: "mx-4 mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2", children: [
                    /* @__PURE__ */ t("div", { className: "flex items-center justify-between text-xs", children: [
                      /* @__PURE__ */ t("span", { className: "font-bold text-emerald-200", children: [
                        "Çoklu Seçim (",
                        he.length,
                        " öğe)"
                      ] }),
                      /* @__PURE__ */ t("span", { className: "font-mono text-[10px] text-emerald-300", children: [
                        he.filter((r) => r.type === "folder").length,
                        " klasör •",
                        " ",
                        he.filter((r) => r.type !== "folder").length,
                        " dosya"
                      ] })
                    ] }),
                    /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => void vt(he),
                        className: "w-full px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow",
                        children: [
                          /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "folder_zip" }),
                          /* @__PURE__ */ e("span", { children: "Seçilenleri ZIP İndir (.zip)" })
                        ]
                      }
                    )
                  ] }),
                  F && Rt ? /* @__PURE__ */ t("div", { className: "p-4 space-y-4 flex-1", children: [
                    F.category === "video" && F.blobUrl ? /* @__PURE__ */ t("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ e("div", { className: "w-full rounded-xl overflow-hidden bg-black border border-slate-800/90 shadow-inner relative", children: /* @__PURE__ */ e(
                        "video",
                        {
                          src: F.blobUrl,
                          poster: F.thumbnailUrl,
                          controls: !0,
                          playsInline: !0,
                          preload: "metadata",
                          className: "w-full h-44 object-contain bg-black"
                        },
                        F.id
                      ) }),
                      /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => Kt(F),
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
                            href: F.blobUrl,
                            download: F.name,
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
                    ] }) : F.category === "image" && (F.blobUrl || F.thumbnailUrl) ? /* @__PURE__ */ t("div", { className: "space-y-2", children: [
                      /* @__PURE__ */ t(
                        "div",
                        {
                          onClick: () => At(F),
                          className: "w-full h-44 rounded-xl bg-slate-950/90 border border-slate-800/90 flex items-center justify-center overflow-hidden shadow-inner cursor-pointer group relative",
                          title: "WebGL Shader Stüdyosunda açmak için tıklayın",
                          children: [
                            /* @__PURE__ */ e(
                              "img",
                              {
                                src: F.thumbnailUrl || F.blobUrl,
                                alt: F.name,
                                className: "w-full h-full object-contain group-hover:scale-[1.03] transition-transform"
                              }
                            ),
                            F.thumbnailMeta && /* @__PURE__ */ e(
                              "span",
                              {
                                style: { color: "#2FF58E" },
                                className: "absolute top-2 right-2 px-1.5 py-0.5 rounded bg-black/80 border border-emerald-500/40 text-[9px] font-mono font-bold text-[#2FF58E]",
                                children: F.thumbnailMeta.fromCache ? "L1/IDB CACHE HIT" : "THUMB CACHED"
                              }
                            )
                          ]
                        }
                      ),
                      /* @__PURE__ */ t("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => Dt(F),
                            className: "flex-1 px-2.5 py-1.5 rounded-lg bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition",
                            children: [
                              /* @__PURE__ */ e(jt, { className: "w-3.5 h-3.5 text-pink-400" }),
                              /* @__PURE__ */ e("span", { children: "WebGL Stüdyoda Düzenle" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ e(
                          "button",
                          {
                            onClick: () => ba(F),
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
                    ] }) : F.category === "audio" && F.blobUrl ? /* @__PURE__ */ t("div", { className: "w-full rounded-xl bg-slate-950/80 border border-slate-800/90 p-3 space-y-2.5 shadow-inner", children: [
                      /* @__PURE__ */ e("div", { className: "flex items-center justify-center py-2", children: Pt(F, "w-14 h-14") }),
                      /* @__PURE__ */ e(
                        "audio",
                        {
                          src: F.blobUrl,
                          controls: !0,
                          className: "w-full h-8"
                        },
                        F.id
                      )
                    ] }) : /* @__PURE__ */ e(
                      "div",
                      {
                        onClick: () => F.category === "video" || F.category === "audio" ? Kt(F) : void 0,
                        className: `w-full h-36 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-center p-4 shadow-inner ${F.category === "video" || F.category === "audio" ? "cursor-pointer hover:border-purple-500/50" : ""}`,
                        children: Pt(F, "w-20 h-20")
                      }
                    ),
                    /* @__PURE__ */ t("div", { children: [
                      /* @__PURE__ */ e("h4", { className: "text-sm font-bold text-white break-words leading-snug", children: F.name }),
                      /* @__PURE__ */ t("p", { className: "text-[11px] text-slate-400 mt-0.5", children: [
                        F.type === "folder" ? i.explorer.fileFolder : F.mimeType,
                        " ",
                        "• ",
                        Xa(F)
                      ] }),
                      /* @__PURE__ */ t("div", { className: "flex items-center gap-2 mt-3", children: [
                        /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => Ht(F),
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
                        F.type === "folder" ? /* @__PURE__ */ t(
                          "button",
                          {
                            onClick: () => void vt([F]),
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
                            onClick: () => ba(F),
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
                            onClick: () => Yr(F),
                            className: "px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition",
                            children: F.security.locked ? /* @__PURE__ */ t(Je, { children: [
                              /* @__PURE__ */ e(Cr, { className: "w-3.5 h-3.5 text-emerald-400" }),
                              /* @__PURE__ */ e("span", { children: i.explorer.unlockBtn })
                            ] }) : /* @__PURE__ */ t(Je, { children: [
                              /* @__PURE__ */ e(ft, { className: "w-3.5 h-3.5 text-rose-400" }),
                              /* @__PURE__ */ e("span", { children: i.explorer.lockBtn })
                            ] })
                          }
                        )
                      ] }),
                      /* @__PURE__ */ e("div", { className: "flex items-center gap-1.5 mt-3", children: ["blue", "emerald", "amber", "rose", "purple", "cyan"].map(
                        (r) => /* @__PURE__ */ e(
                          "button",
                          {
                            onClick: () => Xr(
                              F.id,
                              F.colorTag === r ? null : r
                            ),
                            className: `w-4 h-4 rounded-full border transition ${F.colorTag === r ? "scale-125 border-white" : "border-transparent opacity-60 hover:opacity-100"} ${r === "blue" ? "bg-blue-500" : r === "emerald" ? "bg-emerald-500" : r === "amber" ? "bg-amber-500" : r === "rose" ? "bg-rose-500" : r === "purple" ? "bg-purple-500" : "bg-cyan-500"}`,
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
                          /* @__PURE__ */ e("div", { className: "text-slate-100 font-medium", children: F.type === "folder" ? i.explorer.fileFolder : `${F.extension ? F.extension.slice(1).toUpperCase() : "SYSTEM"} ${i.explorer.fileSuffix}` })
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Boyut" }),
                          /* @__PURE__ */ e("div", { className: "text-slate-100 font-mono font-medium", children: F.type === "folder" ? ae.formatBytes(
                            ae.computeFolderSize(
                              F.id,
                              n
                            )
                          ) : `${ae.formatBytes(
                            F.size
                          )} (${F.size.toLocaleString("tr-TR")} bayt)` })
                        ] }),
                        F.imageMeta && /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Çözünürlük & Renk Paleti" }),
                          /* @__PURE__ */ t("div", { className: "text-slate-100 font-mono flex items-center gap-2 flex-wrap", children: [
                            /* @__PURE__ */ t("span", { children: [
                              F.imageMeta.width,
                              " ×",
                              " ",
                              F.imageMeta.height,
                              " px"
                            ] }),
                            F.durationSec && F.durationSec > 0 ? /* @__PURE__ */ t("span", { className: "text-purple-400", children: [
                              "• ",
                              Math.floor(F.durationSec / 60),
                              ":",
                              Math.floor(F.durationSec % 60).toString().padStart(2, "0"),
                              " ",
                              "sn"
                            ] }) : null,
                            /* @__PURE__ */ e("span", { className: "inline-flex items-center gap-1 ml-1", children: F.imageMeta.palette.map((r, o) => /* @__PURE__ */ e(
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
                        F.thumbnailMeta && /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Thumbnail Önbellek (L1 + IndexedDB)" }),
                          /* @__PURE__ */ t("div", { className: "text-cyan-300 font-mono text-[10px]", children: [
                            ae.formatBytes(
                              F.thumbnailMeta.thumbByteSize
                            ),
                            " ",
                            "(",
                            F.thumbnailMeta.format,
                            ") •",
                            " ",
                            F.thumbnailMeta.generationMs,
                            " ms •",
                            " ",
                            /* @__PURE__ */ e("span", { className: "text-emerald-400 font-semibold", children: F.thumbnailMeta.fromCache ? "CACHE HIT" : "ÖNBELLEĞE YAZILDI" })
                          ] })
                        ] }),
                        F.type !== "folder" && F.checksumSha256 && /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "SHA-256 Özeti" }),
                          /* @__PURE__ */ e(
                            "div",
                            {
                              className: "text-emerald-400/90 font-mono text-[10px] truncate",
                              title: F.checksumSha256,
                              children: F.checksumSha256
                            }
                          )
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Dosya konumu" }),
                          /* @__PURE__ */ e("div", { className: "text-slate-100 font-mono break-all", children: Xa(F) })
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Değiştirme tarihi" }),
                          /* @__PURE__ */ e("div", { className: "text-slate-100", children: new Date(F.updatedAt).toLocaleString(
                            a.locale === "en" ? "en-US" : a.locale === "de" ? "de-DE" : "tr-TR"
                          ) })
                        ] }),
                        /* @__PURE__ */ t("div", { children: [
                          /* @__PURE__ */ e("div", { className: "text-slate-400", children: "Sahip & POSIX" }),
                          /* @__PURE__ */ t("div", { className: "text-slate-100 font-mono", children: [
                            F.security.ownerName,
                            " •",
                            " ",
                            /* @__PURE__ */ t("span", { className: "text-blue-400", children: [
                              Rt.effectiveOctal,
                              " (",
                              Rt.effectiveSymbolic,
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
                        N.role.toUpperCase(),
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
                        const o = Rt.allowed[r];
                        return /* @__PURE__ */ t(
                          "div",
                          {
                            title: Rt.reasons[r],
                            className: `px-1.5 py-1 rounded border flex items-center justify-between ${o ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-rose-500/10 border-rose-500/30 text-rose-300"}`,
                            children: [
                              /* @__PURE__ */ e("span", { children: r }),
                              o ? /* @__PURE__ */ e(Gt, { className: "w-3 h-3 shrink-0" }) : /* @__PURE__ */ e(Ea, { className: "w-3 h-3 shrink-0" })
                            ]
                          },
                          r
                        );
                      }) })
                    ] }),
                    ((qa = F.security.quota) == null ? void 0 : qa.maxBytes) && /* @__PURE__ */ t("div", { className: "p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1", children: [
                      /* @__PURE__ */ e("div", { className: "text-[11px] font-semibold text-amber-300", children: i.explorer.customFolderQuota }),
                      /* @__PURE__ */ t("div", { className: "text-xs font-mono text-white", children: [
                        "Limit:",
                        " ",
                        ae.formatBytes(F.security.quota.maxBytes)
                      ] })
                    ] }),
                    /* @__PURE__ */ e("div", { className: "pt-2", children: /* @__PURE__ */ t(
                      "button",
                      {
                        onClick: () => lt(F),
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
                    a.enableAuditLog && Ka.length > 0 && /* @__PURE__ */ t("div", { className: "space-y-1.5 pt-2 border-t border-slate-800", children: [
                      /* @__PURE__ */ t("div", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5", children: [
                        /* @__PURE__ */ e(zr, { className: "w-3 h-3 text-blue-400" }),
                        " ",
                        i.explorer.auditTrail
                      ] }),
                      /* @__PURE__ */ e("div", { className: "space-y-1 max-h-36 overflow-y-auto pr-1", children: Ka.slice(0, 5).map((r) => /* @__PURE__ */ t(
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
              /* @__PURE__ */ e("strong", { className: "text-slate-200", children: et.length }),
              " ",
              i.explorer.statusListed
            ] }),
            Y.size > 0 && /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ e("span", { children: "|" }),
              /* @__PURE__ */ t("span", { className: "text-blue-400 font-medium truncate", children: [
                Y.size,
                " ",
                i.explorer.statusSelected,
                " (",
                ae.formatBytes(
                  he.reduce((r, o) => r + o.size, 0)
                ),
                ")"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ t("div", { className: "flex items-center gap-2 sm:gap-3 shrink-0", children: [
            (() => {
              const r = pt.getStats();
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
                    /* @__PURE__ */ e("span", { children: ae.formatBytes(r.totalThumbBytes) })
                  ]
                }
              ) : null;
            })(),
            /* @__PURE__ */ t("span", { className: "hidden sm:inline font-mono text-slate-400", children: [
              i.explorer.statusFreeSpace,
              " ",
              ae.formatBytes(
                Math.max(0, a.totalDiskQuotaBytes - ya)
              )
            ] }),
            /* @__PURE__ */ t("div", { className: "flex items-center gap-0.5 bg-slate-900 p-0.5 rounded border border-slate-800", children: [
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => ve("details"),
                  className: `p-1 rounded transition ${de === "details" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
                  title: i.explorer.viewDetails,
                  children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "table_rows" })
                }
              ),
              /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => ve("large_icons"),
                  className: `p-1 rounded transition ${de === "large_icons" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
                  title: i.explorer.viewLarge,
                  children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "grid_view" })
                }
              ),
              a.enableWebGLAcceleration && /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => ve("webgl_spatial"),
                  className: `p-1 rounded transition ${de === "webgl_spatial" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
                  title: i.explorer.webglScene,
                  children: /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "14px" }, children: "memory" })
                }
              )
            ] })
          ] })
        ] }),
        a.enableContextMenu && Ae && /* @__PURE__ */ e(
          "div",
          {
            style: {
              left: Math.max(8, Math.min(Ae.x, window.innerWidth - 250)),
              top: Math.max(8, Math.min(Ae.y, window.innerHeight - 360))
            },
            onClick: (r) => r.stopPropagation(),
            className: "fixed z-50 w-60 max-w-[calc(100vw-16px)] bg-[#111827]/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl py-1.5 text-xs text-slate-200",
            children: Ae.node ? /* @__PURE__ */ t(Je, { children: [
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    At(Ae.node), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-blue-600/30 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2 font-medium", children: [
                      /* @__PURE__ */ e(Nr, { className: "w-3.5 h-3.5 text-blue-400" }),
                      " ",
                      i.explorer.ctxOpen
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono text-slate-400", children: "Enter" })
                  ]
                }
              ),
              Ae.node.type !== "folder" && /* @__PURE__ */ e(
                "button",
                {
                  onClick: () => {
                    ba(Ae.node), Te(null);
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
                    const r = he.length > 1 && Y.has(Ae.node.id) ? he : [Ae.node];
                    vt(r), Te(null);
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
                    /* @__PURE__ */ e("span", { children: he.length > 1 && Y.has(Ae.node.id) ? `Seçimi ZIP Olarak İndir (${he.length})` : Ae.node.type === "folder" ? "Klasörü ZIP Olarak İndir (.zip)" : "ZIP Olarak İndir (.zip)" })
                  ] })
                }
              ),
              Ae.node.type === "folder" && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    xe(Ae.node.id, "volume"), Te(null);
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
              Ae.node.category === "image" && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Dt(Ae.node), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-pink-600/25 flex items-center gap-2 text-pink-300",
                  children: [
                    /* @__PURE__ */ e(jt, { className: "w-3.5 h-3.5" }),
                    " ",
                    i.explorer.ctxShader
                  ]
                }
              ),
              Ae.node.type === "archive" && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Hr(Ae.node), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-emerald-600/25 flex items-center gap-2 text-emerald-300",
                  children: [
                    /* @__PURE__ */ e(yl, { className: "w-3.5 h-3.5" }),
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
                    ie(/* @__PURE__ */ new Set([Ae.node.id])), Mt("cut"), Te(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Fl, { className: "w-3.5 h-3.5 text-amber-400" }),
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
                    ie(/* @__PURE__ */ new Set([Ae.node.id])), Mt("copy"), Te(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Ba, { className: "w-3.5 h-3.5 text-blue-400" }),
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
                    Re(Ae.node.id), Te(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Al, { className: "w-3.5 h-3.5 text-purple-400" }),
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
                    Vr(Ae.node), Te(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(Ua, { className: "w-3.5 h-3.5 text-amber-400" }),
                    /* @__PURE__ */ e("span", { children: Ae.node.starred ? i.explorer.ctxStarRemove : i.explorer.ctxStarAdd })
                  ]
                }
              ),
              /* @__PURE__ */ e("div", { className: "my-1 border-t border-slate-800" }),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    lt(Ae.node), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-indigo-600/25 flex items-center justify-between text-indigo-300 font-medium",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Aa, { className: "w-3.5 h-3.5" }),
                      " ",
                      i.explorer.permissionsAcl
                    ] }),
                    /* @__PURE__ */ e("span", { className: "text-[10px] font-mono", children: Ae.node.security.posix.octal })
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Ht(Ae.node), Te(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(na, { className: "w-3.5 h-3.5 text-emerald-400" }),
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
                    ie(/* @__PURE__ */ new Set([Ae.node.id])), Zt(!1), Te(null);
                  },
                  className: "w-full px-3.5 py-1.5 hover:bg-rose-500/20 text-rose-300 flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ e(Ar, { className: "w-3.5 h-3.5" }),
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
                    Va(), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(Nl, { className: "w-3.5 h-3.5 text-blue-400" }),
                    " ",
                    i.explorer.newFolder
                  ]
                }
              ),
              /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    qt(), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(vl, { className: "w-3.5 h-3.5 text-emerald-400" }),
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
                    (r = Yt.current) == null || r.click(), Te(null);
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
                    (r = Xt.current) == null || r.click(), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2 text-amber-300",
                  children: [
                    /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "drive_folder_upload" }),
                    /* @__PURE__ */ e("span", { children: "Bilgisayardan Klasör Yükle..." })
                  ]
                }
              ),
              et.length > 0 && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    vt(
                      he.length > 0 ? he : et
                    ), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-emerald-600/20 flex items-center gap-2 text-emerald-300",
                  children: [
                    /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "folder_zip" }),
                    /* @__PURE__ */ e("span", { children: he.length > 0 ? `Seçimi ZIP İndir (${he.length} öğe)` : "Bu Klasörü ZIP Olarak İndir (.zip)" })
                  ]
                }
              ),
              Le.mode && /* @__PURE__ */ t(
                "button",
                {
                  onClick: () => {
                    Bt(A), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-emerald-600/20 text-emerald-300 flex items-center gap-2",
                  children: [
                    /* @__PURE__ */ e(bl, { className: "w-3.5 h-3.5" }),
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
                    lt(qe), Te(null);
                  },
                  className: "w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2 text-indigo-300",
                  children: [
                    /* @__PURE__ */ e(Aa, { className: "w-3.5 h-3.5" }),
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
              gt.type === "error" ? /* @__PURE__ */ e(vr, { className: "w-5 h-5 text-rose-400 shrink-0 mt-0.5" }) : /* @__PURE__ */ e(Gt, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }),
              /* @__PURE__ */ t("div", { className: "text-xs", children: [
                /* @__PURE__ */ e("div", { className: "font-bold", children: gt.title }),
                /* @__PURE__ */ e("div", { className: "text-slate-300 mt-0.5 leading-relaxed", children: gt.message })
              ] })
            ]
          }
        ),
        ct && /* @__PURE__ */ e(
          Sn,
          {
            node: ct,
            allNodes: n,
            currentUser: N,
            config: a,
            onClose: () => lt(null),
            onSaveSecurity: Wr
          }
        ),
        xt && /* @__PURE__ */ e(
          kn,
          {
            node: xt,
            canWrite: Ze.allowed.write,
            writeDenialReason: Ze.reasons.write,
            onClose: () => Dt(null),
            onSaveAsNewFile: (r, o, p, h) => qt(r, o, p, "image", h)
          }
        ),
        yt && /* @__PURE__ */ e(
          Mn,
          {
            node: yt,
            canWrite: ce.evaluateNodePermissions(
              yt,
              N,
              n,
              a
            ).allowed.write,
            denialReason: ce.evaluateNodePermissions(
              yt,
              N,
              n,
              a
            ).reasons.write,
            onClose: () => Lt(null),
            onSaveContent: (r, o) => {
              const p = n.map(
                (h) => h.id === r ? {
                  ...h,
                  content: o,
                  updatedAt: (/* @__PURE__ */ new Date()).toISOString()
                } : h
              );
              De(p), K("success", "Dosya İçeriği Kaydedildi", `"${yt.name}" güncellendi.`);
            }
          }
        ),
        oa && /* @__PURE__ */ e(
          An,
          {
            node: oa,
            onClose: () => Ht(null),
            onSaveShareConfig: (r, o) => {
              const p = n.map(
                (h) => h.id === r ? { ...h, shareLink: o } : h
              );
              De(p), K(
                "success",
                o ? "Paylaşım Bağlantısı Aktif" : "Paylaşım Kaldırıldı",
                `"${oa.name}" paylaşım ayarları güncellendi.`
              );
            }
          }
        ),
        Pr && he.length > 0 && /* @__PURE__ */ e(
          zn,
          {
            nodes: he,
            onClose: () => Ga(!1),
            onApplyBatchRename: (r) => {
              const o = new Map(r.map((h) => [h.id, h.newName])), p = n.map(
                (h) => o.has(h.id) ? { ...h, name: o.get(h.id) } : h
              );
              De(p), K(
                "success",
                "Toplu Adlandırma Tamamlandı",
                `${r.length} öğe yeniden adlandırıldı.`
              );
            }
          }
        ),
        ca && /* @__PURE__ */ e(
          _n,
          {
            conflicts: ca,
            onClose: () => da(null),
            onResolve: (r) => {
              var o;
              return Bt(((o = ca[0]) == null ? void 0 : o.targetParentId) ?? A, r);
            }
          }
        ),
        ia && /* @__PURE__ */ e(
          Tn,
          {
            node: ia,
            onClose: () => Kt(null)
          }
        ),
        Fr && Wt.length > 0 && /* @__PURE__ */ e(
          Rl,
          {
            queue: Wt,
            isMinimized: Ir,
            onToggleMinimize: () => ua((r) => !r),
            onCloseTray: () => ma(!1),
            onClearCompleted: () => Et(
              (r) => r.filter((o) => o.status === "uploading" || o.status === "queued")
            ),
            onCancelItem: Or,
            onCancelAll: Ur,
            onLocateNode: (r, o) => {
              R(r, "volume"), o && ie(/* @__PURE__ */ new Set([o]));
            }
          }
        )
      ]
    }
  );
}, ss = ({
  size: a = 40,
  className: l = ""
}) => {
  const s = el().replace(/:/g, "");
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
}, En = {
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
}, Ye = ({
  id: a,
  title: l,
  language: s,
  code: c,
  solidPrinciple: i,
  description: m,
  showLineNumbers: n = !0
}) => {
  const [u, x] = P(!1), w = We(
    () => Ft.tokenizeCode(c.trimEnd(), s),
    [c, s]
  ), T = () => {
    navigator.clipboard.writeText(c), x(!0), setTimeout(() => x(!1), 2e3);
  }, M = i ? En[i] : null;
  return /* @__PURE__ */ t(
    "div",
    {
      "data-codeblock-id": a,
      className: "code-surface-dark rounded-xl overflow-hidden border border-slate-800/90 bg-[#060911] my-4 shadow-xl",
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
            M && /* @__PURE__ */ e(
              "span",
              {
                className: `hidden md:inline-flex px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border shrink-0 ${M.colorClass}`,
                children: M.label
              }
            )
          ] }),
          /* @__PURE__ */ t(
            "button",
            {
              onClick: T,
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
        m && /* @__PURE__ */ t("div", { className: "px-3 sm:px-4 py-2 bg-[#090e1a] border-b border-slate-800/70 text-[11px] text-slate-300 flex items-start sm:items-center gap-2", children: [
          /* @__PURE__ */ e(
            "span",
            {
              className: "material-symbols-outlined text-amber-400 shrink-0 mt-0.5 sm:mt-0",
              style: { fontSize: "15px" },
              children: "lightbulb"
            }
          ),
          /* @__PURE__ */ e("span", { children: m })
        ] }),
        /* @__PURE__ */ e("div", { className: "p-2.5 sm:p-3.5 overflow-x-auto font-mono text-[11px] sm:text-xs leading-relaxed select-text", children: /* @__PURE__ */ e("table", { className: "w-full border-collapse", children: /* @__PURE__ */ e("tbody", { children: w.map((z, v) => /* @__PURE__ */ t(
          "tr",
          {
            className: "hover:bg-slate-900/60 transition-colors",
            children: [
              n && /* @__PURE__ */ e("td", { className: "select-none pr-4 text-right text-[11px] text-slate-600 w-9 align-top", children: v + 1 }),
              /* @__PURE__ */ e("td", { className: "whitespace-pre text-slate-200", children: z.map((g, B) => /* @__PURE__ */ e(
                "span",
                {
                  "data-token-type": g.type,
                  className: Ft.getTokenClassName(
                    g.type
                  ),
                  children: g.value
                },
                B
              )) })
            ]
          },
          v
        )) }) }) })
      ]
    }
  );
}, is = ({
  config: a,
  onUpdateConfig: l
}) => {
  const { dict: s } = sa(), [c, i] = P(!1), m = `import { FileManGL } from '@filemangl/react';
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
        /* @__PURE__ */ e("div", { className: "p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400", children: /* @__PURE__ */ e(Mr, { className: "w-5 h-5" }) }),
        /* @__PURE__ */ t("div", { children: [
          /* @__PURE__ */ e("h3", { className: "text-sm font-bold text-white", children: s.configurator.title }),
          /* @__PURE__ */ e("p", { className: "text-xs text-slate-400", children: s.configurator.subtitle })
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-2", children: [
        Object.entries(tl).map(([u, x]) => /* @__PURE__ */ t(
          "button",
          {
            onClick: () => l(x.patch),
            className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 text-xs font-medium text-slate-200 transition flex items-center gap-1.5",
            title: x.description,
            children: [
              /* @__PURE__ */ e(jt, { className: "w-3.5 h-3.5 text-blue-400" }),
              x.label
            ]
          },
          u
        )),
        /* @__PURE__ */ t(
          "button",
          {
            onClick: () => i(!c),
            className: "px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white flex items-center gap-1.5 shadow-lg shadow-emerald-600/20",
            children: [
              /* @__PURE__ */ e(wr, { className: "w-4 h-4" }),
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
          /* @__PURE__ */ e(Sr, { className: "w-3.5 h-3.5 text-blue-400" }),
          " ",
          s.configurator.languageLabel
        ] }),
        /* @__PURE__ */ e(
          "select",
          {
            value: a.locale,
            onChange: (u) => l({ locale: u.target.value }),
            className: "w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono",
            children: aa.map((u) => /* @__PURE__ */ t("option", { value: u.code, children: [
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
          /* @__PURE__ */ e($a, { className: "w-3.5 h-3.5 text-blue-400" }),
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
    /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5", children: n.map((u) => {
      const x = !!a[u.key];
      return /* @__PURE__ */ t(
        "label",
        {
          className: `px-3 py-2 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${x ? "bg-slate-900/90 border-slate-700 text-slate-100" : "bg-slate-950/50 border-slate-800/60 text-slate-500"}`,
          children: [
            /* @__PURE__ */ t("span", { className: "flex items-center gap-2", children: [
              u.group === "webgl" ? /* @__PURE__ */ e(Ra, { className: "w-3.5 h-3.5 text-purple-400 shrink-0" }) : u.group === "security" ? /* @__PURE__ */ e(Il, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }) : /* @__PURE__ */ e(zl, { className: "w-3.5 h-3.5 text-blue-400 shrink-0" }),
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
    c && /* @__PURE__ */ e(
      Ye,
      {
        id: "config_jsx_export",
        title: "App.tsx — Canlı SOLID Konfigürasyon JSX Çıktısı",
        language: "tsx",
        solidPrinciple: "DIP",
        description: "Aşağıdaki kod seçtiğiniz tüm özellik bayraklarını, kota limitlerini ve sürücü ayarlarını içerir.",
        code: m
      }
    )
  ] });
}, Bn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
  /* @__PURE__ */ t("div", { children: [
    /* @__PURE__ */ e("div", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-mono mb-2", children: /* @__PURE__ */ e("span", { children: "Bölüm 01 • SRP & DIP Uyumlu Kurulum" }) }),
    /* @__PURE__ */ e("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "1. Hızlı Başlangıç & Sanal Dosya Sistemi (VFS) Kurulumu" }),
    /* @__PURE__ */ t("p", { className: "text-slate-300 mt-2", children: [
      /* @__PURE__ */ e("strong", { children: "FileManGL v1.0.4" }),
      ", Dependency Inversion Principle (DIP) sayesinde üst seviye Windows 11 Dosya Gezgini arayüzünü alt seviye depolama motorlarından tamamen ayırır. Hiçbir backend sunucusu olmadan tarayıcıda (",
      /* @__PURE__ */ e("code", { children: "VfsLocalStorageDriver" }),
      " veya",
      " ",
      /* @__PURE__ */ e("code", { children: "VfsMemoryDriver" }),
      ") çalışabildiği gibi, tek bir konfigürasyon anahtarıyla",
      " ",
      /* @__PURE__ */ e("strong", { children: "Laravel 11, Node.js, .NET veya Go" }),
      " tabanlı gerçek disk sunucularına (",
      /* @__PURE__ */ e("code", { children: "RestConnectorDriver" }),
      ") bağlanır."
    ] })
  ] }),
  /* @__PURE__ */ t("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3 text-xs", children: [
    /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5", children: [
      /* @__PURE__ */ t("div", { className: "font-mono font-bold text-blue-400 flex items-center gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "hard_drive" }),
        /* @__PURE__ */ e("span", { children: "VfsLocalStorageDriver" })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-slate-400", children: [
        "Tarayıcı ",
        /* @__PURE__ */ e("code", { children: "localStorage" }),
        " üzerinde kalıcı sanal disk, klasör kotaları, ACL/POSIX izinleri ve geri dönüşüm kutusu sağlar."
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5", children: [
      /* @__PURE__ */ t("div", { className: "font-mono font-bold text-emerald-400 flex items-center gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "memory" }),
        /* @__PURE__ */ e("span", { children: "VfsMemoryDriver (RAM Disk)" })
      ] }),
      /* @__PURE__ */ e("p", { className: "text-slate-400", children: "İzole birim testleri (Vitest) ve geçici 25.000+ düğümlü WebGL2 stres testleri için sıfır gecikmeli bellek içi sürücü." })
    ] }),
    /* @__PURE__ */ t("div", { className: "p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1.5", children: [
      /* @__PURE__ */ t("div", { className: "font-mono font-bold text-amber-400 flex items-center gap-1.5", children: [
        /* @__PURE__ */ e("span", { className: "material-symbols-outlined", style: { fontSize: "16px" }, children: "dns" }),
        /* @__PURE__ */ e("span", { children: "RestConnectorDriver" })
      ] }),
      /* @__PURE__ */ t("p", { className: "text-slate-400", children: [
        "Laravel veya Node.js sunucusundaki fiziksel bir disk bölümünü (ör.",
        " ",
        /* @__PURE__ */ e("code", { children: "/var/storage/tenant_42" }),
        ") gerçek zamanlı yönetir."
      ] })
    ] })
  ] }),
  /* @__PURE__ */ e(
    Ye,
    {
      id: "qs_install",
      title: "Terminal — NPM / NPX / NPMX Paket Kurulumu & CLI",
      language: "bash",
      solidPrinciple: "SRP",
      description: "Paketi npm, pnpm, yarn veya bun ile kurun ya da npx filemangl CLI ile hazır bileşen üretin.",
      code: `# 1. Mevcut React projenize FileManGL paketini kurun
npm install filemangl
# veya: pnpm add filemangl | yarn add filemangl | bun add filemangl

# 2. Hazır <FileManGLWorkspace /> bileşenini otomatik oluşturun (NPX / NPMX CLI)
npx filemangl init

# 3. Sıfırdan Vite + React + TypeScript + FileManGL başlangıç projesi kurun
npx filemangl create my-cloud-drive`
    }
  ),
  /* @__PURE__ */ e(
    Ye,
    {
      id: "qs_1",
      title: "src/WorkspaceExplorer.tsx — Windows 11 Multi-Tab Gezgini Entegrasyonu",
      language: "tsx",
      solidPrinciple: "DIP",
      description: "Üst bileşen yalnızca IFileManagerConfig kontratına bağımlıdır; sürücü tipi çalışma anında değiştirilebilir.",
      code: `import React, { useState } from 'react';
import {
  FileManGL,
  DEFAULT_FILE_MANAGER_CONFIG,
  IFileManagerConfig,
  I18nProvider,
} from 'filemangl';
import 'filemangl/style.css';

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
}`
    }
  ),
  /* @__PURE__ */ e("div", { className: "border border-slate-800 rounded-xl overflow-x-auto bg-[#080d18]", children: /* @__PURE__ */ t("table", { className: "w-full text-left border-collapse text-xs", children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ t("tr", { className: "bg-slate-900/90 border-b border-slate-800 text-slate-300", children: [
      /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Prop / Config Anahtarı" }),
      /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Tip" }),
      /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Varsayılan" }),
      /* @__PURE__ */ e("th", { className: "py-2.5 px-3.5", children: "Açıklama" })
    ] }) }),
    /* @__PURE__ */ e("tbody", { className: "divide-y divide-slate-800/60 font-mono", children: [
      [
        "driverType",
        "'vfs_localstorage' | 'vfs_memory' | 'rest_connector'",
        "'vfs_localstorage'",
        "Depolama sürücüsü stratejisi (Liskov Substitution uyumlu)"
      ],
      [
        "totalDiskQuotaBytes",
        "number",
        "524288000 (500 MB)",
        "Yönetilen diskin maksimum byte kotası (aşım durumunda ENOSPC döner)"
      ],
      [
        "strictPermissionEnforcement",
        "boolean",
        "true",
        "5 katmanlı NTFS ACL + POSIX (0755) + Kilit denetimini zorunlu kılar"
      ],
      [
        "enableRubberBandSelection",
        "boolean",
        "true",
        "Boş alanda fareyle sürükleyerek çoklu seçim penceresi (Marquee)"
      ],
      [
        "enableDragAndDrop",
        "boolean",
        "true",
        "Dosya/klasör kartlarını alt klasörlere, sol ağaca ve breadcrumb üzerine sürükle-bırak"
      ],
      [
        "locale",
        "'tr' | 'en' | 'de'",
        "'tr'",
        "JSON sözlüklerinden (tr.json, en.json, de.json) aktif arayüz dili"
      ]
    ].map(([a, l, s, c], i) => /* @__PURE__ */ t("tr", { className: "hover:bg-slate-900/40", children: [
      /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-cyan-300 font-semibold", children: a }),
      /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-amber-300", children: l }),
      /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-emerald-300", children: s }),
      /* @__PURE__ */ e("td", { className: "py-2.5 px-3.5 text-slate-300 font-sans", children: c })
    ] }, i)) })
  ] }) })
] }), Rn = {
  id: "quickstart",
  stepNumber: 1,
  title: "1. Hızlı Başlangıç & VFS Kurulumu",
  subtitle: "Sanal Dosya Sistemi, Props Tablosu ve Windows 11 Sekmeli Gezgin Kurulumu",
  badge: "React 18",
  routeSlug: "/documentation/quickstart",
  solidFocus: ["SRP", "DIP"],
  searchKeywords: ["quickstart", "vfs", "kurulum", "localstorage", "props", "config"],
  iconName: "rocket_launch",
  iconColorClass: "text-blue-400",
  Component: Bn
}, $n = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
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
    Ye,
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
    Ye,
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
] }), On = {
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
  Component: $n
}, Un = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
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
    Ye,
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
    Ye,
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
    Ye,
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
] }), Tr = {
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
  Component: Un
}, Gn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
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
    Ye,
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
    Ye,
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
] }), jn = {
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
  Component: Gn
}, Kn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
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
    Ye,
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
] }), Hn = {
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
  Component: Kn
}, Wn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
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
    Ye,
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
    Ye,
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
] }), Vn = {
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
  Component: Wn
}, Yn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
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
    Ye,
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
    Ye,
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
] }), Xn = {
  id: "i18n_localization",
  stepNumber: 7,
  title: "7. Çoklu Dil (i18n JSON: TR / EN / DE)",
  subtitle: "tr.json, en.json, de.json Sözlükleri, useI18n Hook ve URL Dil Parametresi",
  badge: "i18n JSON",
  routeSlug: "/documentation/i18n",
  solidFocus: ["OCP", "DIP"],
  searchKeywords: ["i18n", "json", "tr", "en", "de", "localization", "ceviri", "dil"],
  iconName: "translate",
  iconColorClass: "text-cyan-400",
  Component: Yn
}, qn = () => /* @__PURE__ */ t("div", { className: "space-y-6", children: [
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
    Ye,
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
] }), Zn = {
  id: "testing_automation",
  stepNumber: 8,
  title: "8. UX/UI Test Otomasyonu (Vitest)",
  subtitle: "Birim, Entegrasyon, Sürükle-Bırak, Çoklu Sekme ve WebGL2 Otomasyon Testleri",
  badge: "22+ Tests",
  routeSlug: "/documentation/testing",
  solidFocus: ["SRP", "LSP", "DIP"],
  searchKeywords: ["test", "vitest", "automation", "otomasyon", "drag", "drop", "marquee"],
  iconName: "fact_check",
  iconColorClass: "text-emerald-400",
  Component: qn
}, Ct = [
  Rn,
  On,
  Tr,
  jn,
  Hn,
  Vn,
  Xn,
  Zn
];
function Qn(a) {
  return Ct.find((l) => l.id === a) || Tr;
}
function Jn(a) {
  const l = a.trim().toLowerCase();
  return l ? Ct.filter(
    (s) => s.title.toLowerCase().includes(l) || s.subtitle.toLowerCase().includes(l) || s.badge.toLowerCase().includes(l) || s.solidFocus.some((c) => c.toLowerCase().includes(l)) || s.searchKeywords.some((c) => c.toLowerCase().includes(l))
  ) : Ct;
}
const es = [
  "ALL",
  "SRP",
  "OCP",
  "LSP",
  "ISP",
  "DIP"
], os = ({
  initialSection: a = "laravel_backend"
}) => {
  const [l, s] = P(a), [c, i] = P(""), [m, n] = P("ALL");
  Ke(() => {
    a && s(a);
  }, [a]);
  const u = We(() => {
    const v = Jn(c);
    return m === "ALL" ? v : v.filter((g) => g.solidFocus.includes(m));
  }, [c, m]), x = We(
    () => Qn(l),
    [l]
  ), w = x.Component, T = Ct.findIndex((v) => v.id === l), M = T > 0 ? Ct[T - 1] : null, z = T >= 0 && T < Ct.length - 1 ? Ct[T + 1] : null;
  return /* @__PURE__ */ t("div", { className: "bg-[#0c121e] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[600px] lg:min-h-[720px]", children: [
    /* @__PURE__ */ t("div", { className: "lg:col-span-4 xl:col-span-3 bg-[#080d16] border-b lg:border-b-0 lg:border-r border-slate-800 p-3.5 sm:p-4 flex flex-col gap-3 min-w-0", children: [
      /* @__PURE__ */ t("div", { className: "px-1 pb-2.5 border-b border-slate-800/80", children: [
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
            /* @__PURE__ */ e("span", { children: "Modüler Dokümantasyon" })
          ] }),
          /* @__PURE__ */ t("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 shrink-0", children: [
            Ct.length,
            " Modül"
          ] })
        ] }),
        /* @__PURE__ */ e("p", { className: "text-[11px] text-slate-400 mt-1", children: "SOLID Prensipleriyle Ayrıştırılmış Sürücü, Backend ve Test Rehberi" }),
        /* @__PURE__ */ t("div", { className: "relative mt-2.5", children: [
          /* @__PURE__ */ e(
            "input",
            {
              type: "text",
              value: c,
              onChange: (v) => i(v.target.value),
              placeholder: "Modül veya anahtar kelime ara...",
              className: "w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg pl-3 pr-8 py-1.5 text-xs text-white focus:outline-none"
            }
          ),
          c ? /* @__PURE__ */ e(
            "button",
            {
              onClick: () => i(""),
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
        ] }),
        /* @__PURE__ */ e("div", { className: "flex flex-wrap items-center gap-1 mt-2", children: es.map((v) => /* @__PURE__ */ e(
          "button",
          {
            onClick: () => n(v),
            className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold transition ${m === v ? "bg-blue-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
            children: v === "ALL" ? "Tümü (SOLID)" : v
          },
          v
        )) })
      ] }),
      /* @__PURE__ */ e("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col content-start items-start gap-1.5 max-h-56 lg:max-h-none overflow-y-auto pr-0.5", children: u.map((v) => {
        const g = l === v.id;
        return /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s(v.id),
            className: `w-full p-2 sm:p-2.5 rounded-xl text-left transition flex flex-col gap-1 border shrink-0 ${g ? "bg-blue-600/20 border-blue-500/60 text-white shadow-sm" : "bg-slate-900/40 border-slate-800/70 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"}`,
            children: [
              /* @__PURE__ */ t("div", { className: "flex items-center justify-between gap-2 w-full", children: [
                /* @__PURE__ */ t("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ e(
                    "span",
                    {
                      className: `material-symbols-outlined shrink-0 ${v.iconColorClass}`,
                      style: { fontSize: "17px" },
                      children: v.iconName
                    }
                  ),
                  /* @__PURE__ */ e("span", { className: "text-xs font-semibold truncate", children: v.title })
                ] }),
                /* @__PURE__ */ e("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 shrink-0", children: v.badge })
              ] }),
              /* @__PURE__ */ t("div", { className: "hidden sm:flex items-center justify-between pl-6", children: [
                /* @__PURE__ */ e("span", { className: "text-[10px] text-slate-500 truncate", children: v.routeSlug }),
                /* @__PURE__ */ e("div", { className: "flex items-center gap-1", children: v.solidFocus.map((B) => /* @__PURE__ */ e(
                  "span",
                  {
                    className: "px-1 py-0.2 text-[9px] font-mono rounded bg-slate-950/90 text-blue-300 border border-slate-800",
                    children: B
                  },
                  B
                )) })
              ] })
            ]
          },
          v.id
        );
      }) })
    ] }),
    /* @__PURE__ */ t("div", { className: "lg:col-span-8 xl:col-span-9 p-4 sm:p-6 lg:p-7 min-w-0 overflow-x-hidden overflow-y-auto flex flex-col gap-6 text-sm text-slate-300 leading-relaxed", children: [
      /* @__PURE__ */ t("div", { className: "min-w-0", children: [
        /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center justify-between gap-2 pb-3.5 sm:pb-4 mb-4 sm:mb-5 border-b border-slate-800/80 text-xs", children: [
          /* @__PURE__ */ t("div", { className: "flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-slate-400 min-w-0", children: [
            /* @__PURE__ */ e("span", { className: "px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-blue-400 truncate max-w-full", children: x.routeSlug }),
            /* @__PURE__ */ e("span", { className: "hidden sm:inline", children: "•" }),
            /* @__PURE__ */ e("span", { className: "text-[11px] sm:text-xs", children: x.subtitle })
          ] }),
          /* @__PURE__ */ e("div", { className: "flex flex-wrap items-center gap-1.5", children: x.solidFocus.map((v) => /* @__PURE__ */ t(
            "span",
            {
              className: "px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/35 text-indigo-300 text-[10px] font-mono font-bold",
              children: [
                "SOLID: ",
                v
              ]
            },
            v
          )) })
        ] }),
        /* @__PURE__ */ e(w, {})
      ] }),
      /* @__PURE__ */ t("div", { className: "pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3", children: [
        M ? /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s(M.id),
            className: "px-3.5 py-2.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center gap-2 transition",
            children: [
              /* @__PURE__ */ e("span", { className: "material-symbols-outlined shrink-0", style: { fontSize: "16px" }, children: "arrow_back" }),
              /* @__PURE__ */ t("div", { className: "text-left min-w-0", children: [
                /* @__PURE__ */ e("div", { className: "text-[10px] text-slate-400", children: "Önceki Modül" }),
                /* @__PURE__ */ e("div", { className: "font-semibold text-white truncate", children: M.title })
              ] })
            ]
          }
        ) : /* @__PURE__ */ e("div", { className: "hidden sm:block" }),
        z && /* @__PURE__ */ t(
          "button",
          {
            onClick: () => s(z.id),
            className: "px-3.5 py-2.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center justify-between sm:justify-end gap-2 transition sm:ml-auto",
            children: [
              /* @__PURE__ */ t("div", { className: "text-left sm:text-right min-w-0", children: [
                /* @__PURE__ */ e("div", { className: "text-[10px] text-slate-400", children: "Sonraki Modül" }),
                /* @__PURE__ */ e("div", { className: "font-semibold text-white truncate", children: z.title })
              ] }),
              /* @__PURE__ */ e("span", { className: "material-symbols-outlined shrink-0", style: { fontSize: "16px" }, children: "arrow_forward" })
            ]
          }
        )
      ] })
    ] })
  ] });
};
export {
  St as ALL_PERMISSION_ACTIONS,
  zn as BatchRenameModal,
  tl as CONFIG_PRESETS,
  Mn as CodeEditorModal,
  is as ConfigPlaygroundPanel,
  _n as ConflictResolutionModal,
  ea as DEFAULT_FILE_MANAGER_CONFIG,
  ht as DEMO_USERS,
  Ca as DICTIONARIES,
  os as DocumentationPortal,
  ns as FileManGL,
  ss as FileManGLLogo,
  ls as I18nProvider,
  aa as LOCALE_LIST,
  Pn as LanguageDropdown,
  Tn as MediaPlayerModal,
  ce as PermissionEngine,
  ae as QuotaEngine,
  ol as RestConnectorDriver,
  Sn as SecurityPermissionsModal,
  An as ShareLinkModal,
  pt as ThumbnailCacheService,
  Rl as UploadQueueTray,
  xr as VfsLocalStorageDriver,
  il as VfsMemoryDriver,
  gn as WebGLDiskMapViewport,
  kn as WebGLImageShaderModal,
  hn as WebGLSpatialViewport,
  dn as WindowsExplorerViews,
  cr as ZipArchiveService,
  it as createDefaultAcl,
  In as ensureMaterialSymbolsLoaded,
  ot as generateStressTestNodes,
  ra as getInitialSeedNodes,
  Pt as renderCategoryIcon,
  sa as useI18n
};
//# sourceMappingURL=filemangl.js.map

;(function(){try{if(typeof document!=='undefined'&&!document.getElementById('filemangl-core-styles')){var s=document.createElement('style');s.id='filemangl-core-styles';s.textContent="*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: \"\"}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:Inter,Segoe UI,system-ui,-apple-system,sans-serif;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:JetBrains Mono,Cascadia Code,Consolas,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}body{background-color:#070b12;color:#f1f5f9;font-family:Inter,Segoe UI,system-ui,-apple-system,sans-serif;transition:background-color .2s ease,color .2s ease}::-webkit-scrollbar{width:7px;height:7px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#64748b59;border-radius:9999px}::-webkit-scrollbar-thumb:hover{background:#64748b8c}.\\!container{width:100%!important}.container{width:100%}@media(min-width:640px){.\\!container{max-width:640px!important}.container{max-width:640px}}@media(min-width:768px){.\\!container{max-width:768px!important}.container{max-width:768px}}@media(min-width:1024px){.\\!container{max-width:1024px!important}.container{max-width:1024px}}@media(min-width:1280px){.\\!container{max-width:1280px!important}.container{max-width:1280px}}@media(min-width:1536px){.\\!container{max-width:1536px!important}.container{max-width:1536px}}.pointer-events-none{pointer-events:none}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.sticky{position:sticky}.inset-0{top:0;right:0;bottom:0;left:0}.inset-x-0{left:0;right:0}.inset-y-0{top:0;bottom:0}.-bottom-0\\.5{bottom:-.125rem}.-right-0\\.5{right:-.125rem}.-top-6{top:-1.5rem}.bottom-0\\.5{bottom:.125rem}.bottom-3{bottom:.75rem}.bottom-4{bottom:1rem}.left-0{left:0}.left-1{left:.25rem}.left-1\\.5{left:.375rem}.left-1\\/2{left:50%}.left-3{left:.75rem}.left-6{left:1.5rem}.right-0{right:0}.right-0\\.5{right:.125rem}.right-1\\.5{right:.375rem}.right-2{right:.5rem}.right-2\\.5{right:.625rem}.right-3{right:.75rem}.right-4{right:1rem}.top-0{top:0}.top-1{top:.25rem}.top-1\\.5{top:.375rem}.top-1\\/2{top:50%}.top-2{top:.5rem}.top-6{top:1.5rem}.top-full{top:100%}.z-0{z-index:0}.z-10{z-index:10}.z-20{z-index:20}.z-30{z-index:30}.z-40{z-index:40}.z-50{z-index:50}.order-1{order:1}.order-2{order:2}.order-3{order:3}.col-span-2{grid-column:span 2 / span 2}.m-0{margin:0}.m-2{margin:.5rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-4{margin-left:1rem;margin-right:1rem}.mx-auto{margin-left:auto;margin-right:auto}.my-1{margin-top:.25rem;margin-bottom:.25rem}.my-4{margin-top:1rem;margin-bottom:1rem}.my-auto{margin-top:auto;margin-bottom:auto}.mb-0\\.5{margin-bottom:.125rem}.mb-1{margin-bottom:.25rem}.mb-1\\.5{margin-bottom:.375rem}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.ml-0\\.5{margin-left:.125rem}.ml-1{margin-left:.25rem}.mr-0\\.5{margin-right:.125rem}.mr-1{margin-right:.25rem}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-1\\.5{margin-top:.375rem}.mt-2{margin-top:.5rem}.mt-2\\.5{margin-top:.625rem}.mt-3{margin-top:.75rem}.mt-5{margin-top:1.25rem}.mt-7{margin-top:1.75rem}.mt-auto{margin-top:auto}.line-clamp-1{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1}.line-clamp-2{overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-1\\.5{height:.375rem}.h-1\\/2{height:50%}.h-10{height:2.5rem}.h-11{height:2.75rem}.h-12{height:3rem}.h-14{height:3.5rem}.h-2\\.5{height:.625rem}.h-20{height:5rem}.h-3{height:.75rem}.h-3\\.5{height:.875rem}.h-36{height:9rem}.h-4{height:1rem}.h-44{height:11rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-\\[34px\\]{height:34px}.h-\\[38px\\]{height:38px}.h-\\[420px\\]{height:420px}.h-\\[680px\\]{height:680px}.h-\\[68vh\\]{height:68vh}.h-\\[82vh\\]{height:82vh}.h-full{height:100%}.max-h-36{max-height:9rem}.max-h-52{max-height:13rem}.max-h-56{max-height:14rem}.max-h-72{max-height:18rem}.max-h-\\[460px\\]{max-height:460px}.max-h-\\[65vh\\]{max-height:65vh}.max-h-\\[70vh\\]{max-height:70vh}.max-h-\\[72vh\\]{max-height:72vh}.max-h-\\[90vh\\]{max-height:90vh}.min-h-0{min-height:0px}.min-h-\\[24px\\]{min-height:24px}.min-h-\\[360px\\]{min-height:360px}.min-h-\\[380px\\]{min-height:380px}.min-h-\\[44px\\]{min-height:44px}.min-h-\\[600px\\]{min-height:600px}.min-h-screen{min-height:100vh}.w-1{width:.25rem}.w-10{width:2.5rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-14{width:3.5rem}.w-16{width:4rem}.w-2\\.5{width:.625rem}.w-20{width:5rem}.w-3{width:.75rem}.w-3\\.5{width:.875rem}.w-4{width:1rem}.w-44{width:11rem}.w-5{width:1.25rem}.w-56{width:14rem}.w-6{width:1.5rem}.w-60{width:15rem}.w-64{width:16rem}.w-7{width:1.75rem}.w-8{width:2rem}.w-80{width:20rem}.w-9{width:2.25rem}.w-\\[34px\\]{width:34px}.w-full{width:100%}.w-px{width:1px}.min-w-0{min-width:0px}.min-w-\\[105px\\]{min-width:105px}.min-w-\\[140px\\]{min-width:140px}.min-w-\\[600px\\]{min-width:600px}.max-w-2xl{max-width:42rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-\\[110px\\]{max-width:110px}.max-w-\\[1160px\\]{max-width:1160px}.max-w-\\[1280px\\]{max-width:1280px}.max-w-\\[140px\\]{max-width:140px}.max-w-\\[1440px\\]{max-width:1440px}.max-w-\\[1600px\\]{max-width:1600px}.max-w-\\[160px\\]{max-width:160px}.max-w-\\[220px\\]{max-width:220px}.max-w-\\[85vw\\]{max-width:85vw}.max-w-\\[90vw\\]{max-width:90vw}.max-w-\\[92px\\]{max-width:92px}.max-w-\\[calc\\(100\\%-24px\\)\\]{max-width:calc(100% - 24px)}.max-w-\\[calc\\(100vw-16px\\)\\]{max-width:calc(100vw - 16px)}.max-w-\\[calc\\(100vw-24px\\)\\]{max-width:calc(100vw - 24px)}.max-w-full{max-width:100%}.max-w-lg{max-width:32rem}.max-w-md{max-width:28rem}.flex-1{flex:1 1 0%}.flex-none{flex:none}.shrink-0{flex-shrink:0}.border-collapse{border-collapse:collapse}.origin-center{transform-origin:center}.-translate-x-1\\/2{--tw-translate-x: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-180{--tw-rotate: 180deg;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-125{--tw-scale-x: 1.25;--tw-scale-y: 1.25;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-75{--tw-scale-x: .75;--tw-scale-y: .75;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-\\[0\\.97\\]{--tw-scale-x: .97;--tw-scale-y: .97;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes spin{to{transform:rotate(360deg)}}.animate-spin{animation:spin 1s linear infinite}.cursor-col-resize{cursor:col-resize}.cursor-default{cursor:default}.cursor-not-allowed{cursor:not-allowed}.cursor-pointer{cursor:pointer}.select-none{-webkit-user-select:none;-moz-user-select:none;user-select:none}.select-text{-webkit-user-select:text;-moz-user-select:text;user-select:text}.resize-none{resize:none}.resize{resize:both}.list-disc{list-style-type:disc}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.flex-row{flex-direction:row}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.content-start{align-content:flex-start}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.items-stretch{align-items:stretch}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-0\\.5{gap:.125rem}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-2\\.5{gap:.625rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.gap-6{gap:1.5rem}.gap-x-1\\.5{-moz-column-gap:.375rem;column-gap:.375rem}.gap-x-3{-moz-column-gap:.75rem;column-gap:.75rem}.gap-x-4{-moz-column-gap:1rem;column-gap:1rem}.gap-y-1{row-gap:.25rem}.gap-y-1\\.5{row-gap:.375rem}.gap-y-2{row-gap:.5rem}.space-y-0\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.125rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.125rem * var(--tw-space-y-reverse))}.space-y-1>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}.space-y-1\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.375rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.375rem * var(--tw-space-y-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-2\\.5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.625rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.625rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-5>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.25rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-slate-800\\/60>:not([hidden])~:not([hidden]){border-color:#1e293b99}.divide-slate-800\\/70>:not([hidden])~:not([hidden]){border-color:#1e293bb3}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.overflow-x-hidden{overflow-x:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.whitespace-normal{white-space:normal}.whitespace-nowrap{white-space:nowrap}.whitespace-pre{white-space:pre}.break-words{overflow-wrap:break-word}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-2xl{border-radius:1rem}.rounded-\\[10px\\]{border-radius:10px}.rounded-\\[5px\\]{border-radius:5px}.rounded-\\[6px\\]{border-radius:6px}.rounded-\\[8px\\]{border-radius:8px}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.rounded-none{border-radius:0}.rounded-sm{border-radius:.125rem}.rounded-xl{border-radius:.75rem}.rounded-t-lg{border-top-left-radius:.5rem;border-top-right-radius:.5rem}.border{border-width:1px}.border-0{border-width:0px}.border-2{border-width:2px}.border-x{border-left-width:1px;border-right-width:1px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-l{border-left-width:1px}.border-r{border-right-width:1px}.border-t{border-top-width:1px}.border-\\[\\#0078d4\\]{--tw-border-opacity: 1;border-color:rgb(0 120 212 / var(--tw-border-opacity, 1))}.border-amber-500\\/30{border-color:#f59e0b4d}.border-amber-500\\/35{border-color:#f59e0b59}.border-amber-500\\/40{border-color:#f59e0b66}.border-blue-200{--tw-border-opacity: 1;border-color:rgb(191 219 254 / var(--tw-border-opacity, 1))}.border-blue-500{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.border-blue-500\\/30{border-color:#3b82f64d}.border-blue-500\\/35{border-color:#3b82f659}.border-blue-500\\/50{border-color:#3b82f680}.border-blue-500\\/60{border-color:#3b82f699}.border-cyan-500\\/30{border-color:#06b6d44d}.border-cyan-500\\/35{border-color:#06b6d459}.border-cyan-500\\/40{border-color:#06b6d466}.border-emerald-300{--tw-border-opacity: 1;border-color:rgb(110 231 183 / var(--tw-border-opacity, 1))}.border-emerald-500{--tw-border-opacity: 1;border-color:rgb(16 185 129 / var(--tw-border-opacity, 1))}.border-emerald-500\\/25{border-color:#10b98140}.border-emerald-500\\/30{border-color:#10b9814d}.border-emerald-500\\/35{border-color:#10b98159}.border-emerald-500\\/40{border-color:#10b98166}.border-emerald-500\\/50{border-color:#10b98180}.border-emerald-500\\/60{border-color:#10b98199}.border-indigo-500\\/35{border-color:#6366f159}.border-neutral-700{--tw-border-opacity: 1;border-color:rgb(64 64 64 / var(--tw-border-opacity, 1))}.border-pink-500\\/30{border-color:#ec48994d}.border-pink-500\\/40{border-color:#ec489966}.border-purple-500\\/30{border-color:#a855f74d}.border-purple-500\\/35{border-color:#a855f759}.border-purple-500\\/40{border-color:#a855f766}.border-rose-500\\/25{border-color:#f43f5e40}.border-rose-500\\/30{border-color:#f43f5e4d}.border-rose-500\\/35{border-color:#f43f5e59}.border-rose-500\\/60{border-color:#f43f5e99}.border-rose-800\\/50{border-color:#9f123980}.border-slate-200{--tw-border-opacity: 1;border-color:rgb(226 232 240 / var(--tw-border-opacity, 1))}.border-slate-300{--tw-border-opacity: 1;border-color:rgb(203 213 225 / var(--tw-border-opacity, 1))}.border-slate-700{--tw-border-opacity: 1;border-color:rgb(51 65 85 / var(--tw-border-opacity, 1))}.border-slate-700\\/80{border-color:#334155cc}.border-slate-700\\/90{border-color:#334155e6}.border-slate-800{--tw-border-opacity: 1;border-color:rgb(30 41 59 / var(--tw-border-opacity, 1))}.border-slate-800\\/60{border-color:#1e293b99}.border-slate-800\\/70{border-color:#1e293bb3}.border-slate-800\\/80{border-color:#1e293bcc}.border-slate-800\\/90{border-color:#1e293be6}.border-transparent{border-color:transparent}.border-white{--tw-border-opacity: 1;border-color:rgb(255 255 255 / var(--tw-border-opacity, 1))}.border-white\\/10{border-color:#ffffff1a}.border-white\\/20{border-color:#fff3}.border-white\\/25{border-color:#ffffff40}.border-white\\/50{border-color:#ffffff80}.border-white\\/\\[0\\.08\\]{border-color:#ffffff14}.bg-\\[\\#0078d4\\]{--tw-bg-opacity: 1;background-color:rgb(0 120 212 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0078d4\\]\\/25{background-color:#0078d440}.bg-\\[\\#05080e\\]{--tw-bg-opacity: 1;background-color:rgb(5 8 14 / var(--tw-bg-opacity, 1))}.bg-\\[\\#060911\\]{--tw-bg-opacity: 1;background-color:rgb(6 9 17 / var(--tw-bg-opacity, 1))}.bg-\\[\\#070b12\\]{--tw-bg-opacity: 1;background-color:rgb(7 11 18 / var(--tw-bg-opacity, 1))}.bg-\\[\\#070b12\\]\\/85{background-color:#070b12d9}.bg-\\[\\#080c14\\]{--tw-bg-opacity: 1;background-color:rgb(8 12 20 / var(--tw-bg-opacity, 1))}.bg-\\[\\#080c15\\]{--tw-bg-opacity: 1;background-color:rgb(8 12 21 / var(--tw-bg-opacity, 1))}.bg-\\[\\#080d16\\]{--tw-bg-opacity: 1;background-color:rgb(8 13 22 / var(--tw-bg-opacity, 1))}.bg-\\[\\#080d18\\]{--tw-bg-opacity: 1;background-color:rgb(8 13 24 / var(--tw-bg-opacity, 1))}.bg-\\[\\#090d14\\]{--tw-bg-opacity: 1;background-color:rgb(9 13 20 / var(--tw-bg-opacity, 1))}.bg-\\[\\#090d16\\]{--tw-bg-opacity: 1;background-color:rgb(9 13 22 / var(--tw-bg-opacity, 1))}.bg-\\[\\#090e1a\\]{--tw-bg-opacity: 1;background-color:rgb(9 14 26 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0D111A\\]{--tw-bg-opacity: 1;background-color:rgb(13 17 26 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0b101b\\]{--tw-bg-opacity: 1;background-color:rgb(11 16 27 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0c121e\\]{--tw-bg-opacity: 1;background-color:rgb(12 18 30 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0c1220\\]{--tw-bg-opacity: 1;background-color:rgb(12 18 32 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0d131f\\]{--tw-bg-opacity: 1;background-color:rgb(13 19 31 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0d1320\\]{--tw-bg-opacity: 1;background-color:rgb(13 19 32 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0d1424\\]\\/95{background-color:#0d1424f2}.bg-\\[\\#0e1420\\]{--tw-bg-opacity: 1;background-color:rgb(14 20 32 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0e1525\\]{--tw-bg-opacity: 1;background-color:rgb(14 21 37 / var(--tw-bg-opacity, 1))}.bg-\\[\\#0f1623\\]{--tw-bg-opacity: 1;background-color:rgb(15 22 35 / var(--tw-bg-opacity, 1))}.bg-\\[\\#101726\\]{--tw-bg-opacity: 1;background-color:rgb(16 23 38 / var(--tw-bg-opacity, 1))}.bg-\\[\\#111827\\]{--tw-bg-opacity: 1;background-color:rgb(17 24 39 / var(--tw-bg-opacity, 1))}.bg-\\[\\#111827\\]\\/95{background-color:#111827f2}.bg-\\[\\#111a2e\\]{--tw-bg-opacity: 1;background-color:rgb(17 26 46 / var(--tw-bg-opacity, 1))}.bg-\\[\\#191919\\]{--tw-bg-opacity: 1;background-color:rgb(25 25 25 / var(--tw-bg-opacity, 1))}.bg-\\[\\#1f1f1f\\]{--tw-bg-opacity: 1;background-color:rgb(31 31 31 / var(--tw-bg-opacity, 1))}.bg-\\[\\#cce8ff\\]\\/75{background-color:#cce8ffbf}.bg-amber-400\\/80{background-color:#fbbf24cc}.bg-amber-500{--tw-bg-opacity: 1;background-color:rgb(245 158 11 / var(--tw-bg-opacity, 1))}.bg-amber-500\\/10{background-color:#f59e0b1a}.bg-amber-500\\/15{background-color:#f59e0b26}.bg-amber-500\\/20{background-color:#f59e0b33}.bg-black{--tw-bg-opacity: 1;background-color:rgb(0 0 0 / var(--tw-bg-opacity, 1))}.bg-black\\/25{background-color:#00000040}.bg-black\\/30{background-color:#0000004d}.bg-black\\/35{background-color:#00000059}.bg-black\\/60{background-color:#0009}.bg-black\\/70{background-color:#000000b3}.bg-black\\/75{background-color:#000000bf}.bg-black\\/80{background-color:#000c}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-blue-500{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}.bg-blue-500\\/10{background-color:#3b82f61a}.bg-blue-500\\/15{background-color:#3b82f626}.bg-blue-500\\/20{background-color:#3b82f633}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-blue-600\\/20{background-color:#2563eb33}.bg-blue-600\\/30{background-color:#2563eb4d}.bg-cyan-500{--tw-bg-opacity: 1;background-color:rgb(6 182 212 / var(--tw-bg-opacity, 1))}.bg-cyan-500\\/10{background-color:#06b6d41a}.bg-cyan-500\\/15{background-color:#06b6d426}.bg-cyan-600\\/25{background-color:#0891b240}.bg-emerald-50{--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1))}.bg-emerald-500{--tw-bg-opacity: 1;background-color:rgb(16 185 129 / var(--tw-bg-opacity, 1))}.bg-emerald-500\\/10{background-color:#10b9811a}.bg-emerald-500\\/15{background-color:#10b98126}.bg-emerald-500\\/20{background-color:#10b98133}.bg-emerald-500\\/25{background-color:#10b98140}.bg-emerald-500\\/80{background-color:#10b981cc}.bg-emerald-600{--tw-bg-opacity: 1;background-color:rgb(5 150 105 / var(--tw-bg-opacity, 1))}.bg-emerald-600\\/20{background-color:#05966933}.bg-emerald-950\\/95{background-color:#022c22f2}.bg-indigo-500\\/15{background-color:#6366f126}.bg-neutral-900{--tw-bg-opacity: 1;background-color:rgb(23 23 23 / var(--tw-bg-opacity, 1))}.bg-pink-500\\/15{background-color:#ec489926}.bg-pink-600\\/20{background-color:#db277733}.bg-purple-500{--tw-bg-opacity: 1;background-color:rgb(168 85 247 / var(--tw-bg-opacity, 1))}.bg-purple-500\\/10{background-color:#a855f71a}.bg-purple-500\\/15{background-color:#a855f726}.bg-purple-600\\/20{background-color:#9333ea33}.bg-rose-500{--tw-bg-opacity: 1;background-color:rgb(244 63 94 / var(--tw-bg-opacity, 1))}.bg-rose-500\\/10{background-color:#f43f5e1a}.bg-rose-500\\/15{background-color:#f43f5e26}.bg-rose-500\\/20{background-color:#f43f5e33}.bg-rose-500\\/80{background-color:#f43f5ecc}.bg-rose-600{--tw-bg-opacity: 1;background-color:rgb(225 29 72 / var(--tw-bg-opacity, 1))}.bg-rose-950\\/60{background-color:#4c051999}.bg-rose-950\\/95{background-color:#4c0519f2}.bg-slate-100{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.bg-slate-100\\/95{background-color:#f1f5f9f2}.bg-slate-700\\/50{background-color:#33415580}.bg-slate-800{--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))}.bg-slate-800\\/70{background-color:#1e293bb3}.bg-slate-800\\/90{background-color:#1e293be6}.bg-slate-900{--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity, 1))}.bg-slate-900\\/40{background-color:#0f172a66}.bg-slate-900\\/55{background-color:#0f172a8c}.bg-slate-900\\/60{background-color:#0f172a99}.bg-slate-900\\/70{background-color:#0f172ab3}.bg-slate-900\\/80{background-color:#0f172acc}.bg-slate-900\\/90{background-color:#0f172ae6}.bg-slate-900\\/95{background-color:#0f172af2}.bg-slate-950{--tw-bg-opacity: 1;background-color:rgb(2 6 23 / var(--tw-bg-opacity, 1))}.bg-slate-950\\/50{background-color:#02061780}.bg-slate-950\\/80{background-color:#020617cc}.bg-slate-950\\/85{background-color:#020617d9}.bg-slate-950\\/90{background-color:#020617e6}.bg-slate-950\\/95{background-color:#020617f2}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-white\\/95{background-color:#fffffff2}.bg-white\\/\\[0\\.05\\]{background-color:#ffffff0d}.bg-white\\/\\[0\\.12\\]{background-color:#ffffff1f}.bg-\\[radial-gradient\\(circle_at_50\\%_18\\%\\,rgba\\(16\\,220\\,158\\,0\\.16\\)\\,rgba\\(0\\,184\\,255\\,0\\.10\\)_36\\%\\,transparent_70\\%\\)\\]{background-image:radial-gradient(circle at 50% 18%,rgba(16,220,158,.16),rgba(0,184,255,.1) 36%,transparent 70%)}.bg-gradient-to-b{background-image:linear-gradient(to bottom,var(--tw-gradient-stops))}.bg-gradient-to-r{background-image:linear-gradient(to right,var(--tw-gradient-stops))}.from-\\[\\#18E092\\]{--tw-gradient-from: #18E092 var(--tw-gradient-from-position);--tw-gradient-to: rgb(24 224 146 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-\\[\\#2FF58E\\]{--tw-gradient-from: #2FF58E var(--tw-gradient-from-position);--tw-gradient-to: rgb(47 245 142 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-blue-500{--tw-gradient-from: #3b82f6 var(--tw-gradient-from-position);--tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.from-emerald-400\\/25{--tw-gradient-from: rgb(52 211 153 / .25) var(--tw-gradient-from-position);--tw-gradient-to: rgb(52 211 153 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to)}.via-\\[\\#00B4F5\\]{--tw-gradient-to: rgb(0 180 245 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #00B4F5 var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-\\[\\#00C8FF\\]{--tw-gradient-to: rgb(0 200 255 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #00C8FF var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-cyan-400{--tw-gradient-to: rgb(34 211 238 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), #22d3ee var(--tw-gradient-via-position), var(--tw-gradient-to)}.via-cyan-500\\/20{--tw-gradient-to: rgb(6 182 212 / 0) var(--tw-gradient-to-position);--tw-gradient-stops: var(--tw-gradient-from), rgb(6 182 212 / .2) var(--tw-gradient-via-position), var(--tw-gradient-to)}.to-\\[\\#0062D6\\]{--tw-gradient-to: #0062D6 var(--tw-gradient-to-position)}.to-\\[\\#0066E6\\]{--tw-gradient-to: #0066E6 var(--tw-gradient-to-position)}.to-\\[\\#0077FF\\]{--tw-gradient-to: #0077FF var(--tw-gradient-to-position)}.to-cyan-400{--tw-gradient-to: #22d3ee var(--tw-gradient-to-position)}.to-emerald-400{--tw-gradient-to: #34d399 var(--tw-gradient-to-position)}.to-slate-800\\/40{--tw-gradient-to: rgb(30 41 59 / .4) var(--tw-gradient-to-position)}.bg-clip-text{-webkit-background-clip:text;background-clip:text}.fill-amber-400{fill:#fbbf24}.fill-white{fill:#fff}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.p-0\\.5{padding:.125rem}.p-1{padding:.25rem}.p-1\\.5{padding:.375rem}.p-10{padding:2.5rem}.p-2{padding:.5rem}.p-2\\.5{padding:.625rem}.p-3{padding:.75rem}.p-3\\.5{padding:.875rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.p-8{padding:2rem}.p-\\[1px\\]{padding:1px}.px-1{padding-left:.25rem;padding-right:.25rem}.px-1\\.5{padding-left:.375rem;padding-right:.375rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-3\\.5{padding-left:.875rem;padding-right:.875rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-3\\.5{padding-top:.875rem;padding-bottom:.875rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-5{padding-top:1.25rem;padding-bottom:1.25rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.pb-0\\.5{padding-bottom:.125rem}.pb-1{padding-bottom:.25rem}.pb-1\\.5{padding-bottom:.375rem}.pb-2\\.5{padding-bottom:.625rem}.pb-3\\.5{padding-bottom:.875rem}.pb-4{padding-bottom:1rem}.pb-8{padding-bottom:2rem}.pl-2{padding-left:.5rem}.pl-3{padding-left:.75rem}.pl-5{padding-left:1.25rem}.pl-6{padding-left:1.5rem}.pr-0\\.5{padding-right:.125rem}.pr-1{padding-right:.25rem}.pr-1\\.5{padding-right:.375rem}.pr-2{padding-right:.5rem}.pr-4{padding-right:1rem}.pr-8{padding-right:2rem}.pt-1\\.5{padding-top:.375rem}.pt-2{padding-top:.5rem}.pt-3{padding-top:.75rem}.pt-3\\.5{padding-top:.875rem}.pt-4{padding-top:1rem}.pt-5{padding-top:1.25rem}.pt-7{padding-top:1.75rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.align-top{vertical-align:top}.font-mono{font-family:JetBrains Mono,Cascadia Code,Consolas,monospace}.font-sans{font-family:Inter,Segoe UI,system-ui,-apple-system,sans-serif}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[10px\\]{font-size:10px}.text-\\[11px\\]{font-size:11px}.text-\\[12px\\]{font-size:12px}.text-\\[13px\\]{font-size:13px}.text-\\[14px\\]{font-size:14px}.text-\\[15px\\]{font-size:15px}.text-\\[19px\\]{font-size:19px}.text-\\[7px\\]{font-size:7px}.text-\\[8px\\]{font-size:8px}.text-\\[9px\\]{font-size:9px}.text-base{font-size:1rem;line-height:1.5rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-black{font-weight:900}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.italic{font-style:italic}.leading-6{line-height:1.5rem}.leading-\\[1\\.15\\]{line-height:1.15}.leading-\\[1\\.35\\]{line-height:1.35}.leading-none{line-height:1}.leading-relaxed{line-height:1.625}.leading-snug{line-height:1.375}.leading-tight{line-height:1.25}.tracking-\\[-0\\.035em\\]{letter-spacing:-.035em}.tracking-tight{letter-spacing:-.025em}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.text-\\[\\#00C8FF\\]{--tw-text-opacity: 1;color:rgb(0 200 255 / var(--tw-text-opacity, 1))}.text-\\[\\#18E092\\]{--tw-text-opacity: 1;color:rgb(24 224 146 / var(--tw-text-opacity, 1))}.text-\\[\\#2FF58E\\]{--tw-text-opacity: 1;color:rgb(47 245 142 / var(--tw-text-opacity, 1))}.text-\\[\\#f3f3f3\\]{--tw-text-opacity: 1;color:rgb(243 243 243 / var(--tw-text-opacity, 1))}.text-amber-200{--tw-text-opacity: 1;color:rgb(253 230 138 / var(--tw-text-opacity, 1))}.text-amber-300{--tw-text-opacity: 1;color:rgb(252 211 77 / var(--tw-text-opacity, 1))}.text-amber-300\\/80{color:#fcd34dcc}.text-amber-400{--tw-text-opacity: 1;color:rgb(251 191 36 / var(--tw-text-opacity, 1))}.text-blue-300{--tw-text-opacity: 1;color:rgb(147 197 253 / var(--tw-text-opacity, 1))}.text-blue-400{--tw-text-opacity: 1;color:rgb(96 165 250 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-blue-700{--tw-text-opacity: 1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.text-cyan-300{--tw-text-opacity: 1;color:rgb(103 232 249 / var(--tw-text-opacity, 1))}.text-cyan-400{--tw-text-opacity: 1;color:rgb(34 211 238 / var(--tw-text-opacity, 1))}.text-emerald-100{--tw-text-opacity: 1;color:rgb(209 250 229 / var(--tw-text-opacity, 1))}.text-emerald-200{--tw-text-opacity: 1;color:rgb(167 243 208 / var(--tw-text-opacity, 1))}.text-emerald-300{--tw-text-opacity: 1;color:rgb(110 231 183 / var(--tw-text-opacity, 1))}.text-emerald-400{--tw-text-opacity: 1;color:rgb(52 211 153 / var(--tw-text-opacity, 1))}.text-emerald-400\\/90{color:#34d399e6}.text-emerald-500{--tw-text-opacity: 1;color:rgb(16 185 129 / var(--tw-text-opacity, 1))}.text-emerald-700{--tw-text-opacity: 1;color:rgb(4 120 87 / var(--tw-text-opacity, 1))}.text-indigo-300{--tw-text-opacity: 1;color:rgb(165 180 252 / var(--tw-text-opacity, 1))}.text-indigo-400{--tw-text-opacity: 1;color:rgb(129 140 248 / var(--tw-text-opacity, 1))}.text-indigo-500{--tw-text-opacity: 1;color:rgb(99 102 241 / var(--tw-text-opacity, 1))}.text-neutral-300{--tw-text-opacity: 1;color:rgb(212 212 212 / var(--tw-text-opacity, 1))}.text-neutral-400{--tw-text-opacity: 1;color:rgb(163 163 163 / var(--tw-text-opacity, 1))}.text-orange-300{--tw-text-opacity: 1;color:rgb(253 186 116 / var(--tw-text-opacity, 1))}.text-pink-200{--tw-text-opacity: 1;color:rgb(251 207 232 / var(--tw-text-opacity, 1))}.text-pink-300{--tw-text-opacity: 1;color:rgb(249 168 212 / var(--tw-text-opacity, 1))}.text-pink-400{--tw-text-opacity: 1;color:rgb(244 114 182 / var(--tw-text-opacity, 1))}.text-purple-200{--tw-text-opacity: 1;color:rgb(233 213 255 / var(--tw-text-opacity, 1))}.text-purple-300{--tw-text-opacity: 1;color:rgb(216 180 254 / var(--tw-text-opacity, 1))}.text-purple-400{--tw-text-opacity: 1;color:rgb(192 132 252 / var(--tw-text-opacity, 1))}.text-rose-100{--tw-text-opacity: 1;color:rgb(255 228 230 / var(--tw-text-opacity, 1))}.text-rose-200{--tw-text-opacity: 1;color:rgb(254 205 211 / var(--tw-text-opacity, 1))}.text-rose-300{--tw-text-opacity: 1;color:rgb(253 164 175 / var(--tw-text-opacity, 1))}.text-rose-400{--tw-text-opacity: 1;color:rgb(251 113 133 / var(--tw-text-opacity, 1))}.text-rose-500{--tw-text-opacity: 1;color:rgb(244 63 94 / var(--tw-text-opacity, 1))}.text-sky-300{--tw-text-opacity: 1;color:rgb(125 211 252 / var(--tw-text-opacity, 1))}.text-sky-400{--tw-text-opacity: 1;color:rgb(56 189 248 / var(--tw-text-opacity, 1))}.text-slate-100{--tw-text-opacity: 1;color:rgb(241 245 249 / var(--tw-text-opacity, 1))}.text-slate-200{--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}.text-slate-300{--tw-text-opacity: 1;color:rgb(203 213 225 / var(--tw-text-opacity, 1))}.text-slate-300\\/90{color:#cbd5e1e6}.text-slate-400{--tw-text-opacity: 1;color:rgb(148 163 184 / var(--tw-text-opacity, 1))}.text-slate-500{--tw-text-opacity: 1;color:rgb(100 116 139 / var(--tw-text-opacity, 1))}.text-slate-600{--tw-text-opacity: 1;color:rgb(71 85 105 / var(--tw-text-opacity, 1))}.text-slate-700{--tw-text-opacity: 1;color:rgb(51 65 85 / var(--tw-text-opacity, 1))}.text-slate-800{--tw-text-opacity: 1;color:rgb(30 41 59 / var(--tw-text-opacity, 1))}.text-slate-900{--tw-text-opacity: 1;color:rgb(15 23 42 / var(--tw-text-opacity, 1))}.text-transparent{color:transparent}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-300{--tw-text-opacity: 1;color:rgb(253 224 71 / var(--tw-text-opacity, 1))}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.caret-\\[\\#2FF58E\\]{caret-color:#2ff58e}.accent-blue-500{accent-color:#3b82f6}.accent-emerald-500{accent-color:#10b981}.accent-pink-500{accent-color:#ec4899}.accent-rose-500{accent-color:#f43f5e}.opacity-20{opacity:.2}.opacity-25{opacity:.25}.opacity-30{opacity:.3}.opacity-60{opacity:.6}.opacity-65{opacity:.65}.opacity-70{opacity:.7}.opacity-75{opacity:.75}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-2xl{--tw-shadow: 0 25px 50px -12px rgb(0 0 0 / .25);--tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-\\[0_4px_18px_rgba\\(2\\,132\\,199\\,0\\.45\\)\\]{--tw-shadow: 0 4px 18px rgba(2,132,199,.45);--tw-shadow-colored: 0 4px 18px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-inner{--tw-shadow: inset 0 2px 4px 0 rgb(0 0 0 / .05);--tw-shadow-colored: inset 0 2px 4px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-blue-600\\/25{--tw-shadow-color: rgb(37 99 235 / .25);--tw-shadow: var(--tw-shadow-colored)}.shadow-cyan-500\\/25{--tw-shadow-color: rgb(6 182 212 / .25);--tw-shadow: var(--tw-shadow-colored)}.shadow-emerald-600\\/20{--tw-shadow-color: rgb(5 150 105 / .2);--tw-shadow: var(--tw-shadow-colored)}.outline-dashed{outline-style:dashed}.outline-1{outline-width:1px}.outline-amber-400\\/50{outline-color:#fbbf2480}.ring-1{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-2{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.ring-inset{--tw-ring-inset: inset}.ring-emerald-400{--tw-ring-opacity: 1;--tw-ring-color: rgb(52 211 153 / var(--tw-ring-opacity, 1))}.drop-shadow{--tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / .1)) drop-shadow(0 1px 1px rgb(0 0 0 / .06));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.drop-shadow-sm{--tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / .05));filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.saturate-\\[0\\.3\\]{--tw-saturate: saturate(.3);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.backdrop-blur{--tw-backdrop-blur: blur(8px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-\\[1px\\]{--tw-backdrop-blur: blur(1px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-\\[2px\\]{--tw-backdrop-blur: blur(2px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-md{--tw-backdrop-blur: blur(12px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-sm{--tw-backdrop-blur: blur(4px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.backdrop-blur-xl{--tw-backdrop-blur: blur(24px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-opacity{transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.duration-150{transition-duration:.15s}.duration-300{transition-duration:.3s}.duration-75{transition-duration:75ms}.\\[overflow-wrap\\:anywhere\\]{overflow-wrap:anywhere}.material-symbols-outlined{font-family:Material Symbols Outlined;font-weight:400;font-style:normal;font-size:18px;line-height:1;letter-spacing:normal;text-transform:none;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;-webkit-user-select:none;-moz-user-select:none;user-select:none}.ms-filled{font-variation-settings:\"FILL\" 1,\"wght\" 400,\"GRAD\" 0,\"opsz\" 24}.theme-light{background-color:#f8fafc!important;color:#0f172a!important}.theme-light .bg-\\[\\#070b12\\],.theme-light .bg-\\[\\#05080e\\]{background-color:#f8fafc!important}.theme-light .bg-\\[\\#070b12\\]\\/85,.theme-light .bg-\\[\\#070b12\\]\\/80{background-color:#fffffff0!important}.theme-light .bg-\\[\\#0D111A\\],.theme-light .bg-white\\/\\[0\\.05\\],.theme-light .bg-white\\/\\[0\\.12\\]{background-color:#f1f5f9!important}.theme-light .border-white\\/\\[0\\.08\\],.theme-light .border-white\\/10,.theme-light .border-white\\/20,.theme-light .border-white\\/25{border-color:#cbd5e1!important}.theme-light .bg-\\[\\#0b101b\\],.theme-light .bg-\\[\\#090d16\\],.theme-light .bg-\\[\\#0c121e\\],.theme-light .bg-\\[\\#080d18\\],.theme-light .bg-\\[\\#0e1420\\],.theme-light .bg-\\[\\#0e1525\\],.theme-light .bg-\\[\\#101726\\]{background-color:#fff!important}.theme-light .bg-\\[\\#080c14\\]{background-color:#e2e8f0!important}.theme-light .bg-\\[\\#080c15\\],.theme-light .bg-\\[\\#080d16\\],.theme-light .bg-\\[\\#090e1a\\],.theme-light .bg-\\[\\#0d131f\\],.theme-light .bg-\\[\\#0d1320\\],.theme-light .bg-\\[\\#0f1623\\],.theme-light .bg-\\[\\#0c111d\\],.theme-light .bg-\\[\\#0c1220\\],.theme-light .bg-\\[\\#191919\\],.theme-light .bg-\\[\\#1f1f1f\\]{background-color:#f8fafc!important}.theme-light .bg-\\[\\#111827\\],.theme-light .bg-\\[\\#111827\\]\\/95{background-color:#fffffffa!important}.theme-light .bg-slate-950,.theme-light .bg-slate-950\\/95,.theme-light .bg-slate-950\\/90,.theme-light .bg-slate-950\\/85,.theme-light .bg-slate-950\\/80,.theme-light .bg-slate-950\\/50,.theme-light .bg-slate-900,.theme-light .bg-slate-900\\/95,.theme-light .bg-slate-900\\/90,.theme-light .bg-slate-900\\/80,.theme-light .bg-slate-900\\/70,.theme-light .bg-slate-900\\/60,.theme-light .bg-slate-900\\/55,.theme-light .bg-slate-900\\/50{background-color:#fff!important}.theme-light .bg-slate-900\\/40,.theme-light .bg-slate-800,.theme-light .bg-slate-800\\/90,.theme-light .bg-slate-800\\/80,.theme-light .bg-slate-800\\/70,.theme-light .bg-slate-800\\/60,.theme-light .bg-slate-700,.theme-light .bg-slate-700\\/80,.theme-light .bg-slate-700\\/50,.theme-light .bg-neutral-900{background-color:#f1f5f9!important}.theme-light .hover\\:bg-slate-900\\/90:hover,.theme-light .hover\\:bg-slate-900\\/80:hover,.theme-light .hover\\:bg-slate-900\\/60:hover,.theme-light .hover\\:bg-slate-900\\/40:hover,.theme-light .hover\\:bg-slate-800:hover,.theme-light .hover\\:bg-slate-800\\/80:hover,.theme-light .hover\\:bg-slate-800\\/70:hover,.theme-light .hover\\:bg-slate-800\\/60:hover,.theme-light .hover\\:bg-slate-700:hover,.theme-light .hover\\:bg-slate-700\\/80:hover,.theme-light .hover\\:bg-white\\/\\[0\\.05\\]:hover,.theme-light .hover\\:bg-white\\/\\[0\\.06\\]:hover{background-color:#e2e8f0!important}.theme-light .border-slate-800,.theme-light .border-slate-800\\/90,.theme-light .border-slate-800\\/80,.theme-light .border-slate-800\\/70,.theme-light .border-slate-800\\/60,.theme-light .border-slate-700,.theme-light .border-slate-700\\/90,.theme-light .border-slate-700\\/80,.theme-light .border-slate-700\\/70,.theme-light .border-neutral-700{border-color:#cbd5e1!important}.theme-light .divide-slate-800\\/70>:not([hidden])~:not([hidden]),.theme-light .divide-slate-800\\/60>:not([hidden])~:not([hidden]),.theme-light .divide-slate-800\\/50>:not([hidden])~:not([hidden]){border-color:#e2e8f0!important}.theme-light .text-white,.theme-light .text-\\[\\#f3f3f3\\],.theme-light .text-slate-100,.theme-light .text-slate-200,.theme-light .text-neutral-300,.theme-light .hover\\:text-white:hover,.theme-light .hover\\:text-slate-200:hover{color:#0f172a!important}.theme-light .text-slate-300,.theme-light .text-slate-300\\/90{color:#334155!important}.theme-light .text-slate-400,.theme-light .text-slate-500,.theme-light .text-neutral-400{color:#475569!important}.theme-light .text-blue-200,.theme-light .text-blue-300,.theme-light .text-blue-400,.theme-light .text-sky-400{color:#1d4ed8!important}.theme-light .text-indigo-200,.theme-light .text-indigo-300,.theme-light .text-indigo-400{color:#4338ca!important}.theme-light .text-\\[\\#2FF58E\\],.theme-light .text-\\[\\#18E092\\],.theme-light .text-emerald-100,.theme-light .text-emerald-200,.theme-light .text-emerald-300,.theme-light .text-emerald-400,.theme-light .text-emerald-400\\/90{color:#047857!important}.theme-light .text-amber-200,.theme-light .text-amber-300,.theme-light .text-amber-400{color:#b45309!important}.theme-light .text-rose-100,.theme-light .text-rose-200,.theme-light .text-rose-300,.theme-light .text-rose-400,.theme-light .hover\\:text-rose-300:hover,.theme-light .hover\\:text-rose-400:hover{color:#be123c!important}.theme-light .text-pink-200,.theme-light .text-pink-300,.theme-light .text-pink-400{color:#be185d!important}.theme-light .text-purple-200,.theme-light .text-purple-300,.theme-light .text-purple-400{color:#6d28d9!important}.theme-light .text-\\[\\#00C8FF\\],.theme-light .text-\\[\\#38BDF8\\],.theme-light .text-cyan-200,.theme-light .text-cyan-300,.theme-light .text-cyan-400,.theme-light .hover\\:text-\\[\\#38BDF8\\]:hover,.theme-light .hover\\:text-cyan-400:hover,.theme-light .group:hover .group-hover\\:text-cyan-300{color:#0369a1!important}.theme-light .bg-blue-600\\/30,.theme-light .bg-blue-600\\/25,.theme-light .bg-blue-600\\/20,.theme-light .bg-blue-500\\/60,.theme-light .bg-blue-500\\/30,.theme-light .bg-blue-500\\/20,.theme-light .bg-blue-500\\/15,.theme-light .bg-blue-500\\/10,.theme-light .hover\\:bg-blue-600\\/30:hover,.theme-light .hover\\:bg-blue-600\\/25:hover,.theme-light .hover\\:bg-blue-600\\/20:hover{background-color:#eff6ff!important;border-color:#93c5fd!important}.theme-light .bg-indigo-600\\/25,.theme-light .bg-indigo-600\\/20,.theme-light .bg-indigo-500\\/15,.theme-light .hover\\:bg-indigo-600\\/25:hover{background-color:#eef2ff!important;border-color:#a5b4fc!important}.theme-light .bg-emerald-950\\/95,.theme-light .bg-emerald-600\\/30,.theme-light .bg-emerald-600\\/25,.theme-light .bg-emerald-600\\/20,.theme-light .bg-emerald-500\\/25,.theme-light .bg-emerald-500\\/20,.theme-light .bg-emerald-500\\/15,.theme-light .bg-emerald-500\\/10,.theme-light .hover\\:bg-emerald-600\\/30:hover,.theme-light .hover\\:bg-emerald-600\\/25:hover,.theme-light .hover\\:bg-emerald-600\\/20:hover,.theme-light .hover\\:bg-emerald-500\\/25:hover{background-color:#ecfdf5!important;border-color:#6ee7b7!important}.theme-light .bg-cyan-600\\/35,.theme-light .bg-cyan-600\\/25,.theme-light .bg-cyan-600\\/20,.theme-light .bg-cyan-500\\/30,.theme-light .bg-cyan-500\\/20,.theme-light .bg-cyan-500\\/15,.theme-light .bg-cyan-500\\/10,.theme-light .hover\\:bg-cyan-600\\/35:hover,.theme-light .hover\\:bg-cyan-600\\/20:hover{background-color:#ecfeff!important;border-color:#67e8f9!important}.theme-light .bg-rose-950\\/95,.theme-light .bg-rose-950\\/60,.theme-light .bg-rose-500\\/30,.theme-light .bg-rose-500\\/25,.theme-light .bg-rose-500\\/20,.theme-light .bg-rose-500\\/15,.theme-light .bg-rose-500\\/10,.theme-light .hover\\:bg-rose-500\\/30:hover,.theme-light .hover\\:bg-rose-500\\/25:hover,.theme-light .hover\\:bg-rose-500\\/20:hover{background-color:#fff1f2!important;border-color:#fda4af!important}.theme-light .bg-pink-600\\/30,.theme-light .bg-pink-600\\/25,.theme-light .bg-pink-600\\/20,.theme-light .bg-pink-500\\/15,.theme-light .hover\\:bg-pink-600\\/30:hover,.theme-light .hover\\:bg-pink-600\\/25:hover{background-color:#fdf2f8!important;border-color:#f9a8d4!important}.theme-light .bg-amber-500\\/20,.theme-light .bg-amber-500\\/15,.theme-light .bg-amber-500\\/10{background-color:#fffbeb!important;border-color:#fcd34d!important}.theme-light .bg-purple-600\\/30,.theme-light .bg-purple-600\\/20,.theme-light .bg-purple-500\\/15,.theme-light .bg-purple-500\\/10,.theme-light .hover\\:bg-purple-600\\/30:hover{background-color:#f5f3ff!important;border-color:#c4b5fd!important}p code,li code{padding:.1rem .35rem;border-radius:.375rem;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:.92em;background-color:#0f172aa6;border:1px solid rgba(51,65,85,.65);color:#67e8f9}.theme-light p code,.theme-light li code{background-color:#f1f5f9!important;border-color:#cbd5e1!important;color:#0369a1!important}.theme-light .bg-blue-600,.theme-light .bg-blue-600 *,.theme-light .bg-blue-500,.theme-light .bg-blue-500 *,.theme-light .bg-\\[\\#0078d4\\],.theme-light .bg-\\[\\#0078d4\\] *,.theme-light .bg-emerald-600,.theme-light .bg-emerald-600 *,.theme-light .bg-rose-600,.theme-light .bg-rose-600 *,.theme-light .from-blue-600,.theme-light .from-blue-600 *,.theme-light .from-emerald-600,.theme-light .from-emerald-600 *,.theme-light .from-\\[\\#18E092\\],.theme-light .from-\\[\\#18E092\\] *{color:#fff!important}.theme-light option{background-color:#fff!important;color:#0f172a!important}.theme-light .bg-\\[\\#070a12\\],.theme-light .bg-\\[\\#070a10\\],.theme-light .bg-\\[\\#060911\\],.theme-light .code-surface-dark{background-color:#060911!important;border-color:#1e293b!important;color:#e2e8f0!important}.theme-light .code-surface-dark .bg-\\[\\#0c1220\\]{background-color:#0c1220!important;border-color:#1e293b!important}.theme-light .code-surface-dark .bg-\\[\\#090e1a\\]{background-color:#090e1a!important;border-color:#1e293b!important}.theme-light .code-surface-dark .bg-\\[\\#080c15\\]{background-color:#080c15!important;border-color:#1e293b!important}.theme-light .code-surface-dark .bg-slate-800,.theme-light .code-surface-dark .bg-slate-800\\/90{background-color:#1e293b!important;border-color:#334155!important}.theme-light .code-surface-dark .hover\\:bg-slate-700:hover{background-color:#334155!important}.theme-light .code-surface-dark .hover\\:bg-slate-900\\/60:hover{background-color:#0f172abf!important}.theme-light .code-surface-dark .border-slate-800\\/90,.theme-light .code-surface-dark .border-slate-800\\/80,.theme-light .code-surface-dark .border-slate-800\\/70,.theme-light .code-surface-dark .border-slate-700{border-color:#1e293b!important}.theme-light .code-surface-dark .bg-blue-500\\/15{background-color:#3b82f62e!important;border-color:#3b82f666!important}.theme-light .code-surface-dark .bg-emerald-500\\/15{background-color:#10b9812e!important;border-color:#10b98166!important}.theme-light .code-surface-dark .bg-amber-500\\/15{background-color:#f59e0b2e!important;border-color:#f59e0b66!important}.theme-light .code-surface-dark .bg-purple-500\\/15{background-color:#a855f72e!important;border-color:#a855f766!important}.theme-light .code-surface-dark .bg-cyan-500\\/15{background-color:#06b6d42e!important;border-color:#06b6d466!important}.theme-light .code-surface-dark .text-white,.theme-light .code-surface-dark .text-slate-100,.theme-light .code-surface-dark .hover\\:text-white:hover{color:#f8fafc!important}.theme-light .code-surface-dark .text-slate-200{color:#e2e8f0!important}.theme-light .code-surface-dark .text-slate-300{color:#cbd5e1!important}.theme-light .code-surface-dark .text-slate-400{color:#94a3b8!important}.theme-light .code-surface-dark .text-slate-500,.theme-light .code-surface-dark .text-slate-600{color:#64748b!important}.theme-light .code-surface-dark .text-purple-300,.theme-light .code-surface-dark .text-purple-400{color:#d8b4fe!important}.theme-light .code-surface-dark .text-cyan-300,.theme-light .code-surface-dark .text-cyan-400{color:#67e8f9!important}.theme-light .code-surface-dark .text-emerald-300,.theme-light .code-surface-dark .text-emerald-400{color:#6ee7b7!important}.theme-light .code-surface-dark .text-amber-300,.theme-light .code-surface-dark .text-amber-400{color:#fcd34d!important}.theme-light .code-surface-dark .text-blue-300,.theme-light .code-surface-dark .text-blue-400{color:#93c5fd!important}.theme-light .code-surface-dark .text-rose-300,.theme-light .code-surface-dark .text-rose-400{color:#fda4af!important}.theme-light .bg-\\[\\#070a12\\] pre,.theme-light .bg-\\[\\#070a10\\] pre,.theme-light .bg-\\[\\#060911\\] pre{color:#e2e8f0!important}.theme-light textarea.text-transparent{color:transparent!important}.selection\\:bg-blue-500\\/30 *::-moz-selection{background-color:#3b82f64d}.selection\\:bg-blue-500\\/30 *::selection{background-color:#3b82f64d}.selection\\:bg-cyan-500\\/30 *::-moz-selection{background-color:#06b6d44d}.selection\\:bg-cyan-500\\/30 *::selection{background-color:#06b6d44d}.selection\\:text-blue-200 *::-moz-selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.selection\\:text-blue-200 *::selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.selection\\:bg-blue-500\\/30::-moz-selection{background-color:#3b82f64d}.selection\\:bg-blue-500\\/30::selection{background-color:#3b82f64d}.selection\\:bg-cyan-500\\/30::-moz-selection{background-color:#06b6d44d}.selection\\:bg-cyan-500\\/30::selection{background-color:#06b6d44d}.selection\\:text-blue-200::-moz-selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.selection\\:text-blue-200::selection{--tw-text-opacity: 1;color:rgb(191 219 254 / var(--tw-text-opacity, 1))}.hover\\:w-1\\.5:hover{width:.375rem}.hover\\:-translate-y-\\[1px\\]:hover{--tw-translate-y: -1px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:border-\\[\\#38BDF8\\]:hover{--tw-border-opacity: 1;border-color:rgb(56 189 248 / var(--tw-border-opacity, 1))}.hover\\:border-blue-500\\/50:hover{border-color:#3b82f680}.hover\\:border-cyan-400\\/50:hover{border-color:#22d3ee80}.hover\\:border-cyan-500\\/40:hover{border-color:#06b6d466}.hover\\:border-emerald-400\\/50:hover{border-color:#34d39980}.hover\\:border-emerald-500\\/50:hover{border-color:#10b98180}.hover\\:border-purple-500\\/50:hover{border-color:#a855f780}.hover\\:bg-amber-500\\/30:hover{background-color:#f59e0b4d}.hover\\:bg-blue-500:hover{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-500\\/20:hover{background-color:#3b82f633}.hover\\:bg-blue-500\\/60:hover{background-color:#3b82f699}.hover\\:bg-blue-600\\/20:hover{background-color:#2563eb33}.hover\\:bg-blue-600\\/25:hover{background-color:#2563eb40}.hover\\:bg-blue-600\\/30:hover{background-color:#2563eb4d}.hover\\:bg-cyan-500\\/25:hover{background-color:#06b6d440}.hover\\:bg-cyan-600\\/20:hover{background-color:#0891b233}.hover\\:bg-cyan-600\\/35:hover{background-color:#0891b259}.hover\\:bg-emerald-500:hover{--tw-bg-opacity: 1;background-color:rgb(16 185 129 / var(--tw-bg-opacity, 1))}.hover\\:bg-emerald-500\\/20:hover{background-color:#10b98133}.hover\\:bg-emerald-500\\/25:hover{background-color:#10b98140}.hover\\:bg-emerald-600\\/20:hover{background-color:#05966933}.hover\\:bg-emerald-600\\/25:hover{background-color:#05966940}.hover\\:bg-emerald-600\\/30:hover{background-color:#0596694d}.hover\\:bg-indigo-600\\/25:hover{background-color:#4f46e540}.hover\\:bg-pink-600\\/25:hover{background-color:#db277740}.hover\\:bg-pink-600\\/30:hover{background-color:#db27774d}.hover\\:bg-purple-600\\/30:hover{background-color:#9333ea4d}.hover\\:bg-rose-500\\/20:hover{background-color:#f43f5e33}.hover\\:bg-rose-500\\/25:hover{background-color:#f43f5e40}.hover\\:bg-rose-500\\/30:hover{background-color:#f43f5e4d}.hover\\:bg-slate-100:hover{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-200\\/60:hover{background-color:#e2e8f099}.hover\\:bg-slate-700:hover{--tw-bg-opacity: 1;background-color:rgb(51 65 85 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-700\\/80:hover{background-color:#334155cc}.hover\\:bg-slate-800:hover{--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity, 1))}.hover\\:bg-slate-800\\/60:hover{background-color:#1e293b99}.hover\\:bg-slate-800\\/70:hover{background-color:#1e293bb3}.hover\\:bg-slate-800\\/80:hover{background-color:#1e293bcc}.hover\\:bg-slate-900\\/40:hover{background-color:#0f172a66}.hover\\:bg-slate-900\\/60:hover{background-color:#0f172a99}.hover\\:bg-slate-900\\/80:hover{background-color:#0f172acc}.hover\\:bg-slate-900\\/90:hover{background-color:#0f172ae6}.hover\\:bg-white\\/\\[0\\.05\\]:hover{background-color:#ffffff0d}.hover\\:bg-white\\/\\[0\\.06\\]:hover{background-color:#ffffff0f}.hover\\:text-\\[\\#38BDF8\\]:hover{--tw-text-opacity: 1;color:rgb(56 189 248 / var(--tw-text-opacity, 1))}.hover\\:text-cyan-400:hover{--tw-text-opacity: 1;color:rgb(34 211 238 / var(--tw-text-opacity, 1))}.hover\\:text-rose-300:hover{--tw-text-opacity: 1;color:rgb(253 164 175 / var(--tw-text-opacity, 1))}.hover\\:text-rose-400:hover{--tw-text-opacity: 1;color:rgb(251 113 133 / var(--tw-text-opacity, 1))}.hover\\:text-slate-200:hover{--tw-text-opacity: 1;color:rgb(226 232 240 / var(--tw-text-opacity, 1))}.hover\\:text-slate-900:hover{--tw-text-opacity: 1;color:rgb(15 23 42 / var(--tw-text-opacity, 1))}.hover\\:text-slate-950:hover{--tw-text-opacity: 1;color:rgb(2 6 23 / var(--tw-text-opacity, 1))}.hover\\:text-white:hover{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.hover\\:opacity-100:hover{opacity:1}.hover\\:brightness-110:hover{--tw-brightness: brightness(1.1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.disabled\\:opacity-30:disabled{opacity:.3}.disabled\\:opacity-35:disabled{opacity:.35}.disabled\\:opacity-40:disabled{opacity:.4}.group:hover .group-hover\\:scale-\\[1\\.03\\]{--tw-scale-x: 1.03;--tw-scale-y: 1.03;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.group:hover .group-hover\\:text-cyan-300{--tw-text-opacity: 1;color:rgb(103 232 249 / var(--tw-text-opacity, 1))}@media(min-width:640px){.sm\\:bottom-6{bottom:1.5rem}.sm\\:left-0{left:0}.sm\\:left-auto{left:auto}.sm\\:right-6{right:1.5rem}.sm\\:col-span-1{grid-column:span 1 / span 1}.sm\\:mb-5{margin-bottom:1.25rem}.sm\\:mb-7{margin-bottom:1.75rem}.sm\\:ml-auto{margin-left:auto}.sm\\:mt-0{margin-top:0}.sm\\:mt-10{margin-top:2.5rem}.sm\\:mt-4{margin-top:1rem}.sm\\:mt-7{margin-top:1.75rem}.sm\\:block{display:block}.sm\\:inline-block{display:inline-block}.sm\\:inline{display:inline}.sm\\:flex{display:flex}.sm\\:inline-flex{display:inline-flex}.sm\\:h-\\[38px\\]{height:38px}.sm\\:h-\\[780px\\]{height:780px}.sm\\:w-52{width:13rem}.sm\\:w-\\[38px\\]{width:38px}.sm\\:w-\\[390px\\]{width:390px}.sm\\:w-auto{width:auto}.sm\\:min-w-\\[140px\\]{min-width:140px}.sm\\:max-w-\\[180px\\]{max-width:180px}.sm\\:max-w-\\[220px\\]{max-width:220px}.sm\\:max-w-md{max-width:28rem}.sm\\:max-w-none{max-width:none}.sm\\:scale-90{--tw-scale-x: .9;--tw-scale-y: .9;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.sm\\:flex-row{flex-direction:row}.sm\\:flex-col{flex-direction:column}.sm\\:flex-wrap{flex-wrap:wrap}.sm\\:flex-nowrap{flex-wrap:nowrap}.sm\\:items-center{align-items:center}.sm\\:justify-end{justify-content:flex-end}.sm\\:justify-center{justify-content:center}.sm\\:gap-1{gap:.25rem}.sm\\:gap-1\\.5{gap:.375rem}.sm\\:gap-2{gap:.5rem}.sm\\:gap-3{gap:.75rem}.sm\\:gap-4{gap:1rem}.sm\\:gap-\\[10px\\]{gap:10px}.sm\\:gap-\\[28px\\]{gap:28px}.sm\\:p-2\\.5{padding:.625rem}.sm\\:p-3\\.5{padding:.875rem}.sm\\:p-4{padding:1rem}.sm\\:p-6{padding:1.5rem}.sm\\:px-2{padding-left:.5rem;padding-right:.5rem}.sm\\:px-2\\.5{padding-left:.625rem;padding-right:.625rem}.sm\\:px-3{padding-left:.75rem;padding-right:.75rem}.sm\\:px-3\\.5{padding-left:.875rem;padding-right:.875rem}.sm\\:px-4{padding-left:1rem;padding-right:1rem}.sm\\:px-5{padding-left:1.25rem;padding-right:1.25rem}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.sm\\:py-2{padding-top:.5rem;padding-bottom:.5rem}.sm\\:py-2\\.5{padding-top:.625rem;padding-bottom:.625rem}.sm\\:py-5{padding-top:1.25rem;padding-bottom:1.25rem}.sm\\:py-8{padding-top:2rem;padding-bottom:2rem}.sm\\:pb-12{padding-bottom:3rem}.sm\\:pb-4{padding-bottom:1rem}.sm\\:pl-3{padding-left:.75rem}.sm\\:pr-2{padding-right:.5rem}.sm\\:pt-12{padding-top:3rem}.sm\\:text-left{text-align:left}.sm\\:text-center{text-align:center}.sm\\:text-right{text-align:right}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-5xl{font-size:3rem;line-height:1}.sm\\:text-\\[22px\\]{font-size:22px}.sm\\:text-base{font-size:1rem;line-height:1.5rem}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}.sm\\:text-xs{font-size:.75rem;line-height:1rem}.sm\\:leading-\\[1\\.1\\]{line-height:1.1}}@media(min-width:768px){.md\\:static{position:static}.md\\:block{display:block}.md\\:inline{display:inline}.md\\:flex{display:flex}.md\\:inline-flex{display:inline-flex}.md\\:hidden{display:none}.md\\:h-full{height:100%}.md\\:w-1\\/2{width:50%}.md\\:w-64{width:16rem}.md\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.md\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.md\\:grid-cols-5{grid-template-columns:repeat(5,minmax(0,1fr))}.md\\:flex-row{flex-direction:row}.md\\:border-l{border-left-width:1px}.md\\:border-t-0{border-top-width:0px}}@media(min-width:1024px){.lg\\:static{position:static}.lg\\:order-2{order:2}.lg\\:order-3{order:3}.lg\\:col-span-2{grid-column:span 2 / span 2}.lg\\:col-span-4{grid-column:span 4 / span 4}.lg\\:col-span-8{grid-column:span 8 / span 8}.lg\\:block{display:block}.lg\\:inline{display:inline}.lg\\:flex{display:flex}.lg\\:hidden{display:none}.lg\\:h-11{height:2.75rem}.lg\\:h-\\[68px\\]{height:68px}.lg\\:max-h-none{max-height:none}.lg\\:min-h-\\[720px\\]{min-height:720px}.lg\\:w-auto{width:auto}.lg\\:scale-100{--tw-scale-x: 1;--tw-scale-y: 1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.lg\\:grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr))}.lg\\:grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.lg\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.lg\\:flex-col{flex-direction:column}.lg\\:flex-nowrap{flex-wrap:nowrap}.lg\\:gap-2{gap:.5rem}.lg\\:gap-4{gap:1rem}.lg\\:border-b-0{border-bottom-width:0px}.lg\\:border-r{border-right-width:1px}.lg\\:border-t-0{border-top-width:0px}.lg\\:p-7{padding:1.75rem}.lg\\:px-\\[20px\\]{padding-left:20px;padding-right:20px}.lg\\:py-0{padding-top:0;padding-bottom:0}.lg\\:py-\\[10px\\]{padding-top:10px;padding-bottom:10px}.lg\\:pt-0{padding-top:0}.lg\\:text-6xl{font-size:3.75rem;line-height:1}.lg\\:text-\\[13\\.5px\\]{font-size:13.5px}.lg\\:text-\\[14px\\]{font-size:14px}}@media(min-width:1280px){.xl\\:col-span-3{grid-column:span 3 / span 3}.xl\\:col-span-9{grid-column:span 9 / span 9}.xl\\:inline{display:inline}.xl\\:flex{display:flex}}\n";document.head.appendChild(s);}}catch(e){}})();
