import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AuditLogEntry,
  ClipboardState,
  ConflictItem,
  ConflictResolutionStrategy,
  ExplorerViewMode,
  FileCategory,
  FileNode,
  IFileManagerConfig,
  IFileSystemDriver,
  NodeSecurityMetadata,
  SortDirection,
  SortField,
  UserIdentity,
} from '../../core/contracts/types';
import { DEMO_USERS } from '../../core/config/defaultConfig';
import {
  RestConnectorDriver,
  VfsLocalStorageDriver,
  VfsMemoryDriver,
} from '../../core/drivers/FileSystemDrivers';
import {
  createDefaultAcl,
  generateStressTestNodes,
} from '../../core/drivers/seedFileSystem';
import { PermissionEngine } from '../../core/services/PermissionEngine';
import { QuotaEngine } from '../../core/services/QuotaEngine';
import { WebGLSpatialViewport } from '../../core/webgl/WebGLSpatialViewport';
import { WebGLDiskMapViewport } from '../../core/webgl/WebGLDiskMapViewport';
import { WebGLImageShaderModal } from '../../core/webgl/WebGLImageShaderModal';
import { SecurityPermissionsModal } from '../modals/SecurityPermissionsModal';
import {
  BatchRenameModal,
  CodeEditorModal,
  ConflictResolutionModal,
  ShareLinkModal,
} from '../modals/ExplorerModals';
import { WindowsExplorerViews, renderCategoryIcon } from './WindowsExplorerViews';
import { useI18n } from '../../core/i18n/I18nProvider';
import { LanguageDropdown } from '../brand/LanguageDropdown';
import {
  FolderPlus,
  FilePlus,
  Scissors,
  Copy,
  ClipboardPaste,
  Trash2,
  Edit3,
  FileArchive,
  Shield,
  Share2,
  Lock,
  Unlock,
  Star,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Columns,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Terminal,
} from 'lucide-react';

type NavSectionType = 'volume' | 'starred' | 'shared' | 'locked' | 'trash';

interface ExplorerTab {
  id: string;
  folderId: string | null;
  navSection: NavSectionType;
  searchQuery: string;
  history: Array<{ folderId: string | null; navSection: NavSectionType }>;
  historyIndex: number;
}

export interface FileManGLProps {
  config: IFileManagerConfig;
  onConfigChange?: (patch: Partial<IFileManagerConfig>) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const FileManGL: React.FC<FileManGLProps> = ({
  config,
  onConfigChange,
  isFullscreen,
  onToggleFullscreen,
}) => {
  const { dict } = useI18n();

  // Active Driver (Dependency Inversion Principle)
  const driver = useMemo<IFileSystemDriver>(() => {
    if (config.driverType === 'vfs_memory') return new VfsMemoryDriver();
    if (config.driverType === 'rest_connector') {
      return new RestConnectorDriver(config.connectorEndpoint, config.connectorAuthToken);
    }
    return new VfsLocalStorageDriver();
  }, [config.driverType, config.connectorEndpoint, config.connectorAuthToken]);

  const [allNodes, setAllNodes] = useState<FileNode[]>([]);
  const [historyPast, setHistoryPast] = useState<FileNode[][]>([]);
  const [historyFuture, setHistoryFuture] = useState<FileNode[][]>([]);

  // ==========================================================================
  // WINDOWS 11 MULTI-TAB SYSTEM (Her sekmenin kendi dizini ve geçmişi vardır)
  // ==========================================================================
  const [tabs, setTabs] = useState<ExplorerTab[]>([
    {
      id: 'tab_root',
      folderId: null,
      navSection: 'volume',
      searchQuery: '',
      history: [{ folderId: null, navSection: 'volume' }],
      historyIndex: 0,
    },
    {
      id: 'tab_eng',
      folderId: 'fld_engineering',
      navSection: 'volume',
      searchQuery: '',
      history: [
        { folderId: null, navSection: 'volume' },
        { folderId: 'fld_engineering', navSection: 'volume' },
      ],
      historyIndex: 1,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState<string>('tab_root');

  const activeTab = useMemo(
    () => tabs.find((t) => t.id === activeTabId) || tabs[0],
    [tabs, activeTabId]
  );

  const currentFolderId = activeTab.folderId;
  const navSection = activeTab.navSection;
  const searchQuery = activeTab.searchQuery;

  // Navigate inside the active tab and push to per-tab back/forward history
  const navigateActiveTab = useCallback(
    (nextFolderId: string | null, nextSection: NavSectionType = 'volume') => {
      setTabs((prev) =>
        prev.map((tab) => {
          if (tab.id !== activeTab.id) return tab;
          if (tab.folderId === nextFolderId && tab.navSection === nextSection) {
            return { ...tab, searchQuery: '' };
          }
          const sliced = tab.history.slice(0, tab.historyIndex + 1);
          const nextHistory = [
            ...sliced,
            { folderId: nextFolderId, navSection: nextSection },
          ];
          return {
            ...tab,
            folderId: nextFolderId,
            navSection: nextSection,
            searchQuery: '',
            history: nextHistory,
            historyIndex: nextHistory.length - 1,
          };
        })
      );
      setSelectedIds(new Set());
    },
    [activeTab.id]
  );

  const setSearchQuery = useCallback(
    (q: string) => {
      setTabs((prev) =>
        prev.map((tab) => (tab.id === activeTab.id ? { ...tab, searchQuery: q } : tab))
      );
    },
    [activeTab.id]
  );

  const setCurrentFolderId = useCallback(
    (folderId: string | null) => {
      navigateActiveTab(folderId, 'volume');
    },
    [navigateActiveTab]
  );

  const setNavSection = useCallback(
    (section: NavSectionType) => {
      navigateActiveTab(section === 'volume' ? currentFolderId : null, section);
    },
    [navigateActiveTab, currentFolderId]
  );

  const handleTabBack = useCallback(() => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id || tab.historyIndex <= 0) return tab;
        const nextIdx = tab.historyIndex - 1;
        const entry = tab.history[nextIdx];
        return {
          ...tab,
          folderId: entry.folderId,
          navSection: entry.navSection,
          searchQuery: '',
          historyIndex: nextIdx,
        };
      })
    );
    setSelectedIds(new Set());
  }, [activeTab.id]);

  const handleTabForward = useCallback(() => {
    setTabs((prev) =>
      prev.map((tab) => {
        if (tab.id !== activeTab.id || tab.historyIndex >= tab.history.length - 1) {
          return tab;
        }
        const nextIdx = tab.historyIndex + 1;
        const entry = tab.history[nextIdx];
        return {
          ...tab,
          folderId: entry.folderId,
          navSection: entry.navSection,
          searchQuery: '',
          historyIndex: nextIdx,
        };
      })
    );
    setSelectedIds(new Set());
  }, [activeTab.id]);

  const handleOpenNewTab = useCallback(
    (folderId: string | null = null, section: NavSectionType = 'volume') => {
      const newId = `tab_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const newTab: ExplorerTab = {
        id: newId,
        folderId,
        navSection: section,
        searchQuery: '',
        history: [{ folderId, navSection: section }],
        historyIndex: 0,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(newId);
      setSelectedIds(new Set());
    },
    []
  );

  const handleCloseTab = useCallback(
    (tabId: string, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setTabs((prev) => {
        if (prev.length <= 1) return prev;
        const idx = prev.findIndex((t) => t.id === tabId);
        const filtered = prev.filter((t) => t.id !== tabId);
        if (tabId === activeTab.id) {
          const fallback = filtered[Math.max(0, idx - 1)] || filtered[0];
          setActiveTabId(fallback.id);
        }
        return filtered;
      });
    },
    [activeTab.id]
  );

  const getTabTitle = useCallback(
    (tab: ExplorerTab) => {
      if (tab.navSection === 'trash') return dict.explorer.recycleBin;
      if (tab.navSection === 'starred') return dict.explorer.starred;
      if (tab.navSection === 'shared') return dict.explorer.shared;
      if (tab.navSection === 'locked') return dict.explorer.lockedVault;
      if (!tab.folderId) return dict.explorer.rootVolume;
      const node = allNodes.find((n) => n.id === tab.folderId);
      return node ? node.name : dict.explorer.rootVolume;
    },
    [allNodes, dict]
  );

  // ==========================================================================
  // RESIZABLE LEFT & RIGHT SIDEBARS
  // ==========================================================================
  const [leftSidebarWidth, setLeftSidebarWidth] = useState<number>(240);
  const [rightSidebarWidth, setRightSidebarWidth] = useState<number>(300);
  const resizingSideRef = useRef<'left' | 'right' | null>(null);
  const resizeStartXRef = useRef<number>(0);
  const resizeStartWidthRef = useRef<number>(0);

  const startResizingSidebar = (side: 'left' | 'right', e: React.MouseEvent) => {
    e.preventDefault();
    resizingSideRef.current = side;
    resizeStartXRef.current = e.clientX;
    resizeStartWidthRef.current = side === 'left' ? leftSidebarWidth : rightSidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!resizingSideRef.current) return;
      const dx = e.clientX - resizeStartXRef.current;
      if (resizingSideRef.current === 'left') {
        const next = Math.max(170, Math.min(440, resizeStartWidthRef.current + dx));
        setLeftSidebarWidth(next);
      } else {
        const next = Math.max(230, Math.min(500, resizeStartWidthRef.current - dx));
        setRightSidebarWidth(next);
      }
    };
    const onMouseUp = () => {
      if (resizingSideRef.current) {
        resizingSideRef.current = null;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // ==========================================================================
  // EXPLORER VIEW, SELECTION, SORT & GROUP STATES
  // ==========================================================================
  const [secondaryFolderId, setSecondaryFolderId] = useState<string | null>('fld_releases');
  const [viewMode, setViewMode] = useState<ExplorerViewMode>(config.defaultViewMode);
  const [groupBy, setGroupBy] = useState<'none' | 'date' | 'category'>('date');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
  const [clipboard, setClipboard] = useState<ClipboardState>({
    mode: null,
    nodeIds: [],
    sourceParentId: null,
    timestamp: 0,
  });

  // Active Toolbar Popover Menu ('new' | 'sort' | 'view' | 'more' | null)
  const [openToolbarMenu, setOpenToolbarMenu] = useState<
    'new' | 'sort' | 'view' | 'more' | null
  >(null);

  // Active User Role Identity for real-time Permission Engine simulation
  const [currentUser, setCurrentUser] = useState<UserIdentity>(DEMO_USERS[0]);

  // Filter, Sort, Rename, Expanded Tree
  const [categoryFilter, setCategoryFilter] = useState<FileCategory | 'all'>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(['fld_engineering', 'fld_webgl', 'fld_vault', 'fld_releases'])
  );

  // Modals & Popovers
  const [securityModalNode, setSecurityModalNode] = useState<FileNode | null>(null);
  const [shaderModalNode, setShaderModalNode] = useState<FileNode | null>(null);
  const [codeModalNode, setCodeModalNode] = useState<FileNode | null>(null);
  const [shareModalNode, setShareModalNode] = useState<FileNode | null>(null);
  const [showBatchRename, setShowBatchRename] = useState<boolean>(false);
  const [pendingConflicts, setPendingConflicts] = useState<ConflictItem[] | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    node?: FileNode;
  } | null>(null);

  // Toast & Security Audit Log
  const [toast, setToast] = useState<{
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
  } | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setViewMode(config.defaultViewMode);
  }, [config.defaultViewMode]);

  useEffect(() => {
    driver.initialize().then((initial) => {
      setAllNodes(initial);
    });
  }, [driver]);

  const notify = useCallback(
    (
      type: 'success' | 'error' | 'info',
      title: string,
      message: string,
      targetPath = '/'
    ) => {
      setToast({ type, title, message });
      if (config.enableAuditLog) {
        setAuditLogs((prev) => [
          {
            id: `aud_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
            timestamp: new Date().toLocaleTimeString('tr-TR'),
            actorName: currentUser.name,
            actorRole: currentUser.role,
            action: title,
            targetPath,
            status: type === 'error' ? 'denied' : type === 'info' ? 'warning' : 'allowed',
            details: message,
          },
          ...prev.slice(0, 49),
        ]);
      }
    },
    [config.enableAuditLog, currentUser]
  );

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4200);
    return () => clearTimeout(t);
  }, [toast]);

  const commitNodesUpdate = useCallback(
    (nextNodes: FileNode[], recordUndo = true) => {
      if (recordUndo && config.enableUndoRedo) {
        setHistoryPast((prev) => [...prev.slice(-19), allNodes]);
        setHistoryFuture([]);
      }
      setAllNodes(nextNodes);
      driver.saveAllNodes(nextNodes);
    },
    [allNodes, config.enableUndoRedo, driver]
  );

  const handleUndo = useCallback(() => {
    if (historyPast.length === 0) return;
    const previous = historyPast[historyPast.length - 1];
    setHistoryPast((prev) => prev.slice(0, -1));
    setHistoryFuture((prev) => [allNodes, ...prev]);
    setAllNodes(previous);
    driver.saveAllNodes(previous);
    notify('info', 'Geri Al (Undo)', 'Önceki dosya sistemi durumuna dönüldü.');
  }, [historyPast, allNodes, driver, notify]);

  const handleRedo = useCallback(() => {
    if (historyFuture.length === 0) return;
    const next = historyFuture[0];
    setHistoryFuture((prev) => prev.slice(1));
    setHistoryPast((prev) => [...prev, allNodes]);
    setAllNodes(next);
    driver.saveAllNodes(next);
    notify('info', 'Yinele (Redo)', 'İşlem yeniden uygulandı.');
  }, [historyFuture, allNodes, driver, notify]);

  // Current folder object & effective permissions on current folder
  const currentFolderNode = useMemo(
    () => (currentFolderId ? allNodes.find((n) => n.id === currentFolderId) || null : null),
    [allNodes, currentFolderId]
  );

  const currentFolderPerm = useMemo(() => {
    if (!currentFolderNode) {
      const canRootWrite = currentUser.role !== 'guest' && currentUser.role !== 'viewer';
      return {
        allowed: {
          read: true,
          write: canRootWrite || !config.strictPermissionEnforcement,
          delete: canRootWrite || !config.strictPermissionEnforcement,
          rename: canRootWrite || !config.strictPermissionEnforcement,
          upload: canRootWrite || !config.strictPermissionEnforcement,
          download: true,
          share: canRootWrite || !config.strictPermissionEnforcement,
          chmod: currentUser.role === 'admin' || !config.strictPermissionEnforcement,
          lock: canRootWrite || !config.strictPermissionEnforcement,
        },
        reasons: {
          read: 'Kök dizin okuma izni aktif.',
          write: canRootWrite
            ? 'Kök dizin yazma izni aktif.'
            : `Rolünüz (${currentUser.role.toUpperCase()}) kök dizine yazma yetkisine sahip değil.`,
          delete: '',
          rename: '',
          upload: canRootWrite
            ? 'Yükleme izni aktif.'
            : `Rolünüz (${currentUser.role.toUpperCase()}) dosya yükleyemez.`,
          download: '',
          share: '',
          chmod: '',
          lock: '',
        },
      };
    }
    return PermissionEngine.evaluateNodePermissions(
      currentFolderNode,
      currentUser,
      allNodes,
      config
    );
  }, [currentFolderNode, currentUser, allNodes, config]);

  // Breadcrumb path trail
  const breadcrumbs = useMemo(() => {
    const trail: FileNode[] = [];
    const map = new Map<string, FileNode>(allNodes.map((n) => [n.id, n]));
    let cur = currentFolderId ? map.get(currentFolderId) : undefined;
    let guard = 0;
    while (cur && guard < 32) {
      guard++;
      trail.unshift(cur);
      cur = cur.parentId ? map.get(cur.parentId) : undefined;
    }
    return trail;
  }, [allNodes, currentFolderId]);

  // Filtered and Sorted visible nodes + Real-time millisecond benchmark timer
  const { visibleNodes, queryElapsedMs } = useMemo(() => {
    const t0 = performance.now();
    let list = allNodes.filter((n) => {
      if (navSection === 'trash') return n.trashed;
      if (n.trashed) return false;

      if (navSection === 'starred') return n.starred;
      if (navSection === 'shared') return Boolean(n.shareLink);
      if (navSection === 'locked') return n.security.locked;

      // If searching, search across entire volume
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          n.name.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q)) ||
          n.security.ownerName.toLowerCase().includes(q) ||
          n.security.posix.octal.includes(q)
        );
      }

      return n.parentId === currentFolderId;
    });

    if (categoryFilter !== 'all') {
      list = list.filter((n) => n.category === categoryFilter);
    }

    const sorted = [...list].sort((a, b) => {
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;

      let cmp = 0;
      if (sortField === 'name') {
        cmp = a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      } else if (sortField === 'size') {
        const sa = a.type === 'folder' ? QuotaEngine.computeFolderSize(a.id, allNodes) : a.size;
        const sb = b.type === 'folder' ? QuotaEngine.computeFolderSize(b.id, allNodes) : b.size;
        cmp = sa - sb;
      } else if (sortField === 'updatedAt') {
        cmp = a.updatedAt < b.updatedAt ? -1 : a.updatedAt > b.updatedAt ? 1 : 0;
      } else if (sortField === 'type') {
        cmp = a.extension < b.extension ? -1 : a.extension > b.extension ? 1 : 0;
      }
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    const elapsed = (performance.now() - t0).toFixed(2);
    return { visibleNodes: sorted, queryElapsedMs: elapsed };
  }, [
    allNodes,
    navSection,
    searchQuery,
    currentFolderId,
    categoryFilter,
    sortField,
    sortDirection,
  ]);

  // Selection Handlers
  const handleSelectNode = useCallback(
    (id: string, multi: boolean, range: boolean) => {
      setContextMenu(null);
      setOpenToolbarMenu(null);
      if (range && lastSelectedId) {
        const idx1 = visibleNodes.findIndex((n) => n.id === lastSelectedId);
        const idx2 = visibleNodes.findIndex((n) => n.id === id);
        if (idx1 !== -1 && idx2 !== -1) {
          const start = Math.min(idx1, idx2);
          const end = Math.max(idx1, idx2);
          const rangeIds = visibleNodes.slice(start, end + 1).map((n) => n.id);
          setSelectedIds(new Set(rangeIds));
          return;
        }
      }

      if (multi) {
        setSelectedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return next;
        });
      } else {
        setSelectedIds(new Set([id]));
      }
      setLastSelectedId(id);
    },
    [lastSelectedId, visibleNodes]
  );

  const handleSelectMany = useCallback((ids: string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const selectedNodes = useMemo(
    () => allNodes.filter((n) => selectedIds.has(n.id)),
    [allNodes, selectedIds]
  );

  // Open Node (Folder navigation or Modal viewer)
  const handleOpenNode = useCallback(
    (node: FileNode) => {
      const perm = PermissionEngine.evaluateNodePermissions(
        node,
        currentUser,
        allNodes,
        config
      );
      if (!perm.allowed.read) {
        notify(
          'error',
          'Erişim Engellendi (EACCES)',
          `"${node.name}" öğesini açma izniniz yok: ${perm.reasons.read}`,
          node.name
        );
        return;
      }

      if (node.type === 'folder') {
        navigateActiveTab(node.id, 'volume');
        return;
      }

      if (node.category === 'image' && config.enableWebGLImageShaderStudio) {
        setShaderModalNode(node);
        return;
      }

      if (config.enableBuiltInCodeEditor) {
        setCodeModalNode(node);
      }
    },
    [allNodes, config, currentUser, navigateActiveTab, notify]
  );

  // ==========================================================================
  // FILE SYSTEM OPERATIONS (Create, Rename, Copy, Cut, Paste, Delete, Archive)
  // ==========================================================================
  const handleCreateFolder = () => {
    if (!currentFolderPerm.allowed.write) {
      notify(
        'error',
        'Klasör Oluşturma Engellendi',
        currentFolderPerm.reasons.write || 'Bu dizine yazma yetkiniz bulunmuyor.'
      );
      return;
    }

    const baseName = 'Yeni_Klasor';
    let counter = 1;
    let candidate = baseName;
    const siblings = allNodes.filter(
      (n) => !n.trashed && n.parentId === currentFolderId
    );
    while (siblings.some((s) => s.name.toLowerCase() === candidate.toLowerCase())) {
      counter++;
      candidate = `${baseName}_${counter}`;
    }

    const now = new Date().toISOString();
    const newFolder: FileNode = {
      id: `fld_${Date.now()}`,
      parentId: currentFolderId,
      name: candidate,
      type: 'folder',
      category: 'folder',
      extension: '',
      mimeType: 'inode/directory',
      size: 0,
      createdAt: now,
      updatedAt: now,
      starred: false,
      tags: ['Custom'],
      colorTag: 'blue',
      trashed: false,
      checksumSha256: Date.now().toString(16).padStart(64, '0'),
      security: {
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        groupName: currentUser.group,
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0755'),
        acl: createDefaultAcl('open'),
      },
    };

    commitNodesUpdate([...allNodes, newFolder]);
    setSelectedIds(new Set([newFolder.id]));
    setRenamingId(newFolder.id);
    notify('success', 'Yeni Klasör Oluşturuldu', `"${candidate}" dizine eklendi.`, candidate);
  };

  const handleCreateFile = (
    customName?: string,
    customContent?: string,
    customBytes?: number,
    customCategory?: FileCategory
  ) => {
    if (!currentFolderPerm.allowed.write) {
      notify(
        'error',
        'Dosya Oluşturma Engellendi',
        currentFolderPerm.reasons.write || 'Bu dizine yazma izniniz bulunmuyor.'
      );
      return;
    }

    const name = customName || `Yeni_Dokuman_${Date.now().toString().slice(-4)}.md`;
    const content =
      customContent ||
      `# ${name}\n\nOluşturan: **${currentUser.name}** (${currentUser.role})\nTarih: ${new Date().toLocaleString(
        'tr-TR'
      )}\n`;
    const sizeBytes = customBytes || Math.max(256 * 1024, content.length * 1024);

    const quotaCheck = QuotaEngine.validateWriteOperation(
      currentFolderId,
      name,
      sizeBytes,
      allNodes,
      config
    );
    if (!quotaCheck.allowed) {
      notify('error', 'Kota / Güvenlik Politikası Engeli', quotaCheck.reason || 'İşlem reddedildi.');
      return;
    }

    const extMatch = name.match(/(\.[a-zA-Z0-9]+)$/);
    const ext = extMatch ? extMatch[1].toLowerCase() : '.txt';
    const now = new Date().toISOString();

    const newFile: FileNode = {
      id: `fil_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      parentId: currentFolderId,
      name,
      type: 'file',
      category: customCategory || (ext === '.png' ? 'image' : ext === '.ts' ? 'code' : 'document'),
      extension: ext,
      mimeType: ext === '.png' ? 'image/png' : 'text/markdown',
      size: sizeBytes,
      createdAt: now,
      updatedAt: now,
      starred: false,
      tags: ['Created'],
      trashed: false,
      content,
      imageMeta:
        customCategory === 'image' || ext === '.png'
          ? {
              width: 3840,
              height: 2160,
              palette: ['#3b82f6', '#ec4899', '#10b981'],
              pattern: 'nebula',
            }
          : undefined,
      checksumSha256: Date.now().toString(16).padStart(64, '0'),
      security: {
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        groupName: currentUser.group,
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0644'),
        acl: [],
      },
    };

    commitNodesUpdate([...allNodes, newFile]);
    setSelectedIds(new Set([newFile.id]));
    if (!customName) setRenamingId(newFile.id);
    notify(
      'success',
      'Dosya Diske Yazıldı',
      `"${name}" (${QuotaEngine.formatBytes(sizeBytes)}) oluşturuldu.`,
      name
    );
  };

  // Real Browser File Upload into Managed Disk Volume
  const handleExternalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!currentFolderPerm.allowed.upload) {
      notify(
        'error',
        'Yükleme İzni Reddedildi (EACCES)',
        currentFolderPerm.reasons.upload || 'Bu klasöre dosya yükleme yetkiniz yok.'
      );
      e.target.value = '';
      return;
    }

    const added: FileNode[] = [];
    let runningNodes = [...allNodes];

    for (const file of Array.from(files)) {
      const simulatedBytes = Math.max(file.size, 512 * 1024);
      const check = QuotaEngine.validateWriteOperation(
        currentFolderId,
        file.name,
        simulatedBytes,
        runningNodes,
        config
      );
      if (!check.allowed) {
        notify('error', 'Yükleme Engellendi', check.reason || file.name, file.name);
        continue;
      }

      const extMatch = file.name.match(/(\.[a-zA-Z0-9]+)$/);
      const ext = extMatch ? extMatch[1].toLowerCase() : '';
      let cat: FileCategory = 'document';
      if (['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(ext)) cat = 'image';
      else if (['.ts', '.tsx', '.js', '.php', '.py', '.glsl', '.css', '.html'].includes(ext))
        cat = 'code';
      else if (['.zip', '.rar', '.tar', '.gz'].includes(ext)) cat = 'archive';
      else if (['.mp4', '.webm', '.mov'].includes(ext)) cat = 'video';
      else if (['.json', '.sql', '.csv'].includes(ext)) cat = 'data';

      let textContent: string | undefined;
      if (cat === 'code' || cat === 'document' || cat === 'data') {
        try {
          textContent = await file.text();
        } catch {
          textContent = undefined;
        }
      }

      const now = new Date().toISOString();
      const node: FileNode = {
        id: `up_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        parentId: currentFolderId,
        name: file.name,
        type: cat === 'archive' ? 'archive' : 'file',
        category: cat,
        extension: ext,
        mimeType: file.type || 'application/octet-stream',
        size: simulatedBytes,
        createdAt: now,
        updatedAt: now,
        starred: false,
        tags: ['Uploaded'],
        colorTag: 'emerald',
        trashed: false,
        content: textContent,
        imageMeta:
          cat === 'image'
            ? {
                width: 2560,
                height: 1440,
                palette: ['#06b6d4', '#6366f1', '#f43f5e'],
                pattern: 'aurora',
              }
            : undefined,
        checksumSha256: Date.now().toString(16).padStart(64, 'a'),
        security: {
          ownerId: currentUser.id,
          ownerName: currentUser.name,
          groupName: currentUser.group,
          inheritFromParent: true,
          locked: false,
          posix: PermissionEngine.buildPosixFromOctal('0644'),
          acl: [],
        },
      };

      added.push(node);
      runningNodes = [...runningNodes, node];
    }

    if (added.length > 0) {
      commitNodesUpdate(runningNodes);
      setSelectedIds(new Set(added.map((a) => a.id)));
      notify(
        'success',
        'Dosya Yükleme Tamamlandı',
        `${added.length} dosya başarıyla diske aktarıldı.`
      );
    }
    e.target.value = '';
  };

  // Rename Single Node
  const handleCommitRename = (id: string, newNameInput: string) => {
    setRenamingId(null);
    const trimmed = newNameInput.trim();
    if (!trimmed) return;

    const target = allNodes.find((n) => n.id === id);
    if (!target || target.name === trimmed) return;

    const perm = PermissionEngine.evaluateNodePermissions(
      target,
      currentUser,
      allNodes,
      config
    );
    if (!perm.allowed.rename) {
      notify(
        'error',
        'Yeniden Adlandırma Reddedildi',
        perm.reasons.rename,
        target.name
      );
      return;
    }

    if (target.type !== 'folder') {
      const check = QuotaEngine.validateWriteOperation(
        target.parentId,
        trimmed,
        0,
        allNodes,
        config
      );
      if (!check.allowed) {
        notify('error', 'Uzantı Politikası Engeli', check.reason || trimmed);
        return;
      }
    }

    const updated = allNodes.map((n) =>
      n.id === id ? { ...n, name: trimmed, updatedAt: new Date().toISOString() } : n
    );
    commitNodesUpdate(updated);
    notify('success', 'Yeniden Adlandırıldı', `"${target.name}" -> "${trimmed}"`, trimmed);
  };

  // Copy & Cut to Clipboard
  const handleCopyOrCut = useCallback(
    (mode: 'copy' | 'cut') => {
      if (selectedIds.size === 0) return;
      const targets = allNodes.filter((n) => selectedIds.has(n.id));

      for (const t of targets) {
        const perm = PermissionEngine.evaluateNodePermissions(
          t,
          currentUser,
          allNodes,
          config
        );
        if (mode === 'copy' && !perm.allowed.read) {
          notify('error', 'Kopyalama Engellendi', `"${t.name}": ${perm.reasons.read}`);
          return;
        }
        if (mode === 'cut' && (!perm.allowed.write || !perm.allowed.delete)) {
          notify(
            'error',
            'Kesme (Taşıma) Engellendi',
            `"${t.name}": ${perm.reasons.delete || perm.reasons.write}`
          );
          return;
        }
      }

      setClipboard({
        mode,
        nodeIds: Array.from(selectedIds),
        sourceParentId: currentFolderId,
        timestamp: Date.now(),
      });

      notify(
        'info',
        mode === 'copy' ? 'Panoya Kopyalandı (Ctrl+C)' : 'Panoya Kesildi (Ctrl+X)',
        `${selectedIds.size} öğe panoya alındı. Diğer sekmelerde veya klasörlerde Ctrl+V ile yapıştırabilirsiniz.`
      );
    },
    [allNodes, config, currentFolderId, currentUser, notify, selectedIds]
  );

  // Execute Paste with optional Conflict Strategy
  const executePaste = useCallback(
    (targetParentId: string | null, strategy?: ConflictResolutionStrategy) => {
      if (!clipboard.mode || clipboard.nodeIds.length === 0) return;

      if (targetParentId) {
        const destFolder = allNodes.find((n) => n.id === targetParentId);
        if (destFolder) {
          const destPerm = PermissionEngine.evaluateNodePermissions(
            destFolder,
            currentUser,
            allNodes,
            config
          );
          if (!destPerm.allowed.write) {
            notify(
              'error',
              'Yapıştırma Reddedildi',
              `"${destFolder.name}" klasörüne yazma izniniz yok: ${destPerm.reasons.write}`
            );
            return;
          }
        }
      } else if (!currentFolderPerm.allowed.write) {
        notify('error', 'Yapıştırma Reddedildi', currentFolderPerm.reasons.write);
        return;
      }

      const sourceNodes = allNodes.filter((n) => clipboard.nodeIds.includes(n.id));
      const existingInTarget = allNodes.filter(
        (n) => !n.trashed && n.parentId === targetParentId
      );

      const conflicts: ConflictItem[] = [];
      for (const src of sourceNodes) {
        const dup = existingInTarget.find(
          (ex) => ex.name.toLowerCase() === src.name.toLowerCase() && ex.id !== src.id
        );
        if (dup) {
          conflicts.push({
            sourceNode: src,
            existingNode: dup,
            targetParentId,
          });
        }
      }

      if (conflicts.length > 0 && !strategy) {
        setPendingConflicts(conflicts);
        return;
      }

      let nextNodes = [...allNodes];
      const now = new Date().toISOString();

      for (const src of sourceNodes) {
        if (src.id === targetParentId) continue;

        const existingDup = nextNodes.find(
          (ex) =>
            !ex.trashed &&
            ex.parentId === targetParentId &&
            ex.name.toLowerCase() === src.name.toLowerCase() &&
            ex.id !== src.id
        );

        if (existingDup && strategy === 'skip') {
          continue;
        }

        if (clipboard.mode === 'copy') {
          const check = QuotaEngine.validateWriteOperation(
            targetParentId,
            src.name,
            src.size,
            nextNodes,
            config
          );
          if (!check.allowed) {
            notify('error', 'Kota Sınırı Aşıldı', check.reason || src.name);
            return;
          }

          if (existingDup && strategy === 'replace') {
            nextNodes = nextNodes.filter((n) => n.id !== existingDup.id);
          }

          let finalName = src.name;
          if (
            (existingDup && strategy === 'keep_both') ||
            src.parentId === targetParentId
          ) {
            const ext = src.type === 'folder' ? '' : src.extension;
            const base = ext ? src.name.slice(0, -ext.length) : src.name;
            finalName = `${base}_kopya${ext}`;
          }

          const cloned: FileNode = {
            ...JSON.parse(JSON.stringify(src)),
            id: `${src.type === 'folder' ? 'fld' : 'fil'}_${Date.now()}_${Math.random()
              .toString(36)
              .slice(2, 6)}`,
            parentId: targetParentId,
            name: finalName,
            createdAt: now,
            updatedAt: now,
          };
          nextNodes.push(cloned);
        } else if (clipboard.mode === 'cut') {
          if (existingDup && strategy === 'replace') {
            nextNodes = nextNodes.filter((n) => n.id !== existingDup.id);
          }
          let finalName = src.name;
          if (existingDup && strategy === 'keep_both') {
            const ext = src.type === 'folder' ? '' : src.extension;
            const base = ext ? src.name.slice(0, -ext.length) : src.name;
            finalName = `${base}_tasinan${ext}`;
          }

          nextNodes = nextNodes.map((n) =>
            n.id === src.id
              ? { ...n, parentId: targetParentId, name: finalName, updatedAt: now }
              : n
          );
        }
      }

      if (clipboard.mode === 'cut') {
        setClipboard({ mode: null, nodeIds: [], sourceParentId: null, timestamp: 0 });
      }
      setPendingConflicts(null);
      commitNodesUpdate(nextNodes);
      notify(
        'success',
        'Yapıştırma Tamamlandı (Ctrl+V)',
        `${sourceNodes.length} öğe hedef dizine aktarıldı.`
      );
    },
    [allNodes, clipboard, commitNodesUpdate, config, currentFolderPerm, currentUser, notify]
  );

  // Move via Drag & Drop into a Folder (or Root Volume when targetFolderId is null)
  const handleDropNodesIntoFolder = (targetFolderId: string | null, draggedIds: string[]) => {
    const targetFolder = targetFolderId
      ? allNodes.find((n) => n.id === targetFolderId)
      : null;
    if (targetFolderId && !targetFolder) return;

    if (targetFolder) {
      const destPerm = PermissionEngine.evaluateNodePermissions(
        targetFolder,
        currentUser,
        allNodes,
        config
      );
      if (!destPerm.allowed.write) {
        notify(
          'error',
          'Taşıma Engellendi',
          `"${targetFolder.name}" klasörüne yazma izniniz yok: ${destPerm.reasons.write}`
        );
        return;
      }
    }

    const movableIds: string[] = [];
    for (const id of draggedIds) {
      if (id === targetFolderId) continue;
      const node = allNodes.find((n) => n.id === id);
      if (!node || node.parentId === targetFolderId) continue;
      const perm = PermissionEngine.evaluateNodePermissions(
        node,
        currentUser,
        allNodes,
        config
      );
      if (!perm.allowed.delete || !perm.allowed.write) {
        notify('error', 'Taşıma Reddedildi', `"${node.name}" taşınamaz: ${perm.reasons.delete}`);
        return;
      }
      movableIds.push(id);
    }

    if (movableIds.length === 0) return;

    const updated = allNodes.map((n) =>
      movableIds.includes(n.id)
        ? { ...n, parentId: targetFolderId, updatedAt: new Date().toISOString() }
        : n
    );
    commitNodesUpdate(updated);
    const destLabel = targetFolder ? targetFolder.name : `${config.volumeName} (D:)`;
    notify(
      'success',
      'Sürükle & Bırak Taşıma',
      `${movableIds.length} öğe "${destLabel}" konumuna taşındı.`
    );
  };

  // Trash / Permanent Delete / Restore
  const handleDeleteSelected = useCallback(
    (forcePermanent = false) => {
      if (selectedIds.size === 0) return;
      const targets = allNodes.filter((n) => selectedIds.has(n.id));

      for (const t of targets) {
        const perm = PermissionEngine.evaluateNodePermissions(
          t,
          currentUser,
          allNodes,
          config
        );
        if (!perm.allowed.delete) {
          notify(
            'error',
            'Silme İşlemi Reddedildi (EACCES)',
            `"${t.name}": ${perm.reasons.delete}`,
            t.name
          );
          return;
        }
      }

      if (!config.enableRecycleBin || forcePermanent || navSection === 'trash') {
        const next = allNodes.filter((n) => !selectedIds.has(n.id));
        commitNodesUpdate(next);
        setSelectedIds(new Set());
        notify(
          'info',
          'Kalıcı Olarak Silindi',
          `${targets.length} öğe diskten kalıcı olarak kaldırıldı.`
        );
      } else {
        const now = new Date().toISOString();
        const next = allNodes.map((n) =>
          selectedIds.has(n.id) ? { ...n, trashed: true, trashedAt: now } : n
        );
        commitNodesUpdate(next);
        setSelectedIds(new Set());
        notify(
          'info',
          'Geri Dönüşüm Kutusuna Taşındı',
          `${targets.length} öğe çöp kutusuna gönderildi.`
        );
      }
    },
    [allNodes, commitNodesUpdate, config, currentUser, navSection, notify, selectedIds]
  );

  const handleRestoreSelected = () => {
    if (selectedIds.size === 0) return;
    const next = allNodes.map((n) =>
      selectedIds.has(n.id) ? { ...n, trashed: false, trashedAt: undefined } : n
    );
    commitNodesUpdate(next);
    setSelectedIds(new Set());
    notify('success', 'Geri Yüklendi', 'Seçili öğeler orijinal konumlarına geri yüklendi.');
  };

  // Compress selected items to .zip archive
  const handleCreateArchive = () => {
    if (selectedNodes.length === 0) return;
    if (!currentFolderPerm.allowed.write) {
      notify('error', 'Arşivleme Engellendi', currentFolderPerm.reasons.write);
      return;
    }

    const totalRaw = selectedNodes.reduce((acc, n) => acc + (n.size || 2 * 1024 * 1024), 0);
    const compressedSize = Math.max(512 * 1024, Math.round(totalRaw * 0.62));
    const archiveName =
      selectedNodes.length === 1
        ? `${selectedNodes[0].name.replace(/\.[^/.]+$/, '')}_bundle.zip`
        : `archive_${Date.now().toString().slice(-4)}.zip`;

    const check = QuotaEngine.validateWriteOperation(
      currentFolderId,
      archiveName,
      compressedSize,
      allNodes,
      config
    );
    if (!check.allowed) {
      notify('error', 'Kota Sınırı Aşıldı', check.reason || archiveName);
      return;
    }

    const now = new Date().toISOString();
    const archiveNode: FileNode = {
      id: `zip_${Date.now()}`,
      parentId: currentFolderId,
      name: archiveName,
      type: 'archive',
      category: 'archive',
      extension: '.zip',
      mimeType: 'application/zip',
      size: compressedSize,
      createdAt: now,
      updatedAt: now,
      starred: false,
      tags: ['Compressed', `${selectedNodes.length}-items`],
      colorTag: 'amber',
      trashed: false,
      archivedChildrenSnapshot: JSON.parse(JSON.stringify(selectedNodes)),
      checksumSha256: Date.now().toString(16).padStart(64, 'c'),
      security: {
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        groupName: currentUser.group,
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0644'),
        acl: [],
      },
    };

    commitNodesUpdate([...allNodes, archiveNode]);
    setSelectedIds(new Set([archiveNode.id]));
    notify(
      'success',
      'ZIP Arşivi Oluşturuldu',
      `"${archiveName}" (${QuotaEngine.formatBytes(compressedSize)}) sıkıştırıldı.`
    );
  };

  // Extract .zip archive
  const handleExtractArchive = (archiveNode: FileNode) => {
    if (!currentFolderPerm.allowed.write) {
      notify('error', 'Çıkartma Engellendi', currentFolderPerm.reasons.write);
      return;
    }

    const folderName = archiveNode.name.replace(/\.(zip|tar|gz)$/i, '') + '_extracted';
    const now = new Date().toISOString();
    const newFolderId = `fld_ext_${Date.now()}`;

    const extractedFolder: FileNode = {
      id: newFolderId,
      parentId: currentFolderId,
      name: folderName,
      type: 'folder',
      category: 'folder',
      extension: '',
      mimeType: 'inode/directory',
      size: 0,
      createdAt: now,
      updatedAt: now,
      starred: false,
      tags: ['Extracted'],
      colorTag: 'emerald',
      trashed: false,
      checksumSha256: Date.now().toString(16).padStart(64, 'e'),
      security: {
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        groupName: currentUser.group,
        inheritFromParent: true,
        locked: false,
        posix: PermissionEngine.buildPosixFromOctal('0755'),
        acl: [],
      },
    };

    const snapshot = archiveNode.archivedChildrenSnapshot || [
      {
        id: `fil_manifest_${Date.now()}`,
        parentId: newFolderId,
        name: 'PACKAGE_MANIFEST.json',
        type: 'file',
        category: 'data',
        extension: '.json',
        mimeType: 'application/json',
        size: 1.2 * 1024 * 1024,
        createdAt: now,
        updatedAt: now,
        starred: false,
        tags: ['Extracted'],
        trashed: false,
        content: JSON.stringify(
          { extractedFrom: archiveNode.name, timestamp: now, verified: true },
          null,
          2
        ),
        checksumSha256: Date.now().toString(16).padStart(64, 'f'),
        security: {
          ownerId: currentUser.id,
          ownerName: currentUser.name,
          groupName: currentUser.group,
          inheritFromParent: true,
          locked: false,
          posix: PermissionEngine.buildPosixFromOctal('0644'),
          acl: [],
        },
      },
    ];

    const restoredChildren = snapshot.map((item, idx) => ({
      ...item,
      id: `ext_${Date.now()}_${idx}`,
      parentId: newFolderId,
      updatedAt: now,
    }));

    commitNodesUpdate([...allNodes, extractedFolder, ...restoredChildren]);
    notify(
      'success',
      'Arşiv Klasöre Çıkartıldı',
      `"${folderName}" dizinine ${restoredChildren.length} öğe çıkartıldı.`
    );
  };

  // Save Security & Quota Policy Changes
  const handleSaveSecurity = (
    nodeId: string,
    updatedSecurity: NodeSecurityMetadata,
    applyRecursively: boolean
  ) => {
    const descendantIds = new Set<string>([nodeId]);
    if (applyRecursively) {
      let added = true;
      while (added) {
        added = false;
        for (const n of allNodes) {
          if (n.parentId && descendantIds.has(n.parentId) && !descendantIds.has(n.id)) {
            descendantIds.add(n.id);
            added = true;
          }
        }
      }
    }

    const next = allNodes.map((n) => {
      if (n.id === nodeId) {
        return { ...n, security: updatedSecurity, updatedAt: new Date().toISOString() };
      }
      if (applyRecursively && descendantIds.has(n.id)) {
        return {
          ...n,
          security: {
            ...n.security,
            ownerId: updatedSecurity.ownerId,
            ownerName: updatedSecurity.ownerName,
            groupName: updatedSecurity.groupName,
            locked: updatedSecurity.locked,
            posix: updatedSecurity.posix,
            acl: updatedSecurity.acl,
          },
        };
      }
      return n;
    });

    commitNodesUpdate(next);
    notify(
      'success',
      'İzin & Kota Politikası Güncellendi',
      `POSIX ${updatedSecurity.posix.octal} ve ACL kuralları kaydedildi.`
    );
  };

  const handleToggleStar = (node: FileNode) => {
    const next = allNodes.map((n) => (n.id === node.id ? { ...n, starred: !n.starred } : n));
    commitNodesUpdate(next, false);
  };

  const handleToggleLock = (node: FileNode) => {
    const perm = PermissionEngine.evaluateNodePermissions(
      node,
      currentUser,
      allNodes,
      config
    );
    if (!perm.allowed.lock && currentUser.role !== 'admin') {
      notify('error', 'Kilit Yetkisi Yok', perm.reasons.lock);
      return;
    }
    const nextLocked = !node.security.locked;
    const next = allNodes.map((n) =>
      n.id === node.id
        ? {
            ...n,
            security: {
              ...n.security,
              locked: nextLocked,
              lockedBy: nextLocked ? currentUser.name : undefined,
            },
          }
        : n
    );
    commitNodesUpdate(next);
    notify(
      'info',
      nextLocked ? 'Öğe Kilitlendi (Immutable)' : 'Öğe Kilidi Açıldı',
      `"${node.name}" ${nextLocked ? 'yazmaya karşı korundu.' : 'tekrar düzenlenebilir.'}`
    );
  };

  const handleSetColorTag = (
    nodeId: string,
    color: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'cyan' | null
  ) => {
    const next = allNodes.map((n) => (n.id === nodeId ? { ...n, colorTag: color } : n));
    commitNodesUpdate(next, false);
  };

  // Keyboard Shortcuts (Ctrl+C, Ctrl+X, Ctrl+V, Del, F2, Ctrl+A, Ctrl+Z, Ctrl+Y, Ctrl+T)
  useEffect(() => {
    if (!config.enableKeyboardShortcuts) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleCopyOrCut('copy');
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        handleCopyOrCut('cut');
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        executePaste(currentFolderId);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setSelectedIds(new Set(visibleNodes.map((n) => n.id)));
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        handleUndo();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      } else if (e.key === 'Delete') {
        e.preventDefault();
        handleDeleteSelected(e.shiftKey);
      } else if (e.key === 'F2' && selectedIds.size === 1) {
        e.preventDefault();
        setRenamingId(Array.from(selectedIds)[0]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    config.enableKeyboardShortcuts,
    currentFolderId,
    executePaste,
    handleCopyOrCut,
    handleDeleteSelected,
    handleRedo,
    handleUndo,
    selectedIds,
    visibleNodes,
  ]);

  // Folder Tree Recursive Renderer (Sol gezinti bölmesi)
  const renderFolderTreeBranch = (parentId: string | null, depth = 0) => {
    const folders = allNodes
      .filter((n) => !n.trashed && n.type === 'folder' && n.parentId === parentId)
      .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

    if (folders.length === 0) return null;

    return (
      <div className="space-y-0.5">
        {folders.map((fld) => {
          const hasSubfolders = allNodes.some(
            (c) => !c.trashed && c.type === 'folder' && c.parentId === fld.id
          );
          const isExpanded = expandedFolders.has(fld.id);
          const isCurrent = navSection === 'volume' && currentFolderId === fld.id;

          return (
            <div key={fld.id}>
              <div
                style={{ paddingLeft: `${depth * 14 + 8}px` }}
                onClick={() => navigateActiveTab(fld.id, 'volume')}
                onAuxClick={(e) => {
                  if (e.button === 1) {
                    e.preventDefault();
                    handleOpenNewTab(fld.id, 'volume');
                  }
                }}
                onContextMenu={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setContextMenu({ x: e.clientX, y: e.clientY, node: fld });
                }}
                onDragOver={(e) => {
                  if (!config.enableDragAndDrop) return;
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  if (!config.enableDragAndDrop) return;
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    const raw =
                      e.dataTransfer.getData('application/hyperion-nodes') ||
                      e.dataTransfer.getData('text/plain');
                    if (!raw) return;
                    const ids: string[] = JSON.parse(raw);
                    if (Array.isArray(ids) && ids.length > 0) {
                      handleDropNodesIntoFolder(fld.id, ids);
                    }
                  } catch {
                    // ignore
                  }
                }}
                className={`group flex items-center justify-between pr-2 py-1.5 rounded-md cursor-pointer text-xs transition ${
                  isCurrent
                    ? 'bg-blue-600/20 text-blue-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800/70'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  {hasSubfolders ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedFolders((prev) => {
                          const next = new Set(prev);
                          if (next.has(fld.id)) next.delete(fld.id);
                          else next.add(fld.id);
                          return next;
                        });
                      }}
                      className="p-0.5 text-slate-400 hover:text-white"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ) : (
                    <span className="w-4" />
                  )}
                  <span
                    className="material-symbols-outlined ms-filled text-amber-400 shrink-0"
                    style={{ fontSize: '17px' }}
                  >
                    folder
                  </span>
                  <span className="truncate">{fld.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  {fld.security.locked && <Lock className="w-3 h-3 text-rose-400 shrink-0" />}
                  {fld.security.quota?.maxBytes && (
                    <span className="text-[9px] font-mono px-1 rounded bg-slate-900 text-amber-300 border border-amber-500/30">
                      {Math.round(fld.security.quota.maxBytes / (1024 * 1024))}M
                    </span>
                  )}
                </div>
              </div>
              {hasSubfolders && isExpanded && renderFolderTreeBranch(fld.id, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  // Volume Quota Metrics
  const totalUsedBytes = QuotaEngine.computeTotalVolumeUsed(allNodes);
  const volumeUsagePercent = Math.min(
    100,
    (totalUsedBytes / Math.max(1, config.totalDiskQuotaBytes)) * 100
  );
  const primarySelectedNode = selectedNodes.length === 1 ? selectedNodes[0] : currentFolderNode;
  const inspectorNodePerm = useMemo(() => {
    if (!primarySelectedNode) return null;
    return PermissionEngine.evaluateNodePermissions(
      primarySelectedNode,
      currentUser,
      allNodes,
      config
    );
  }, [primarySelectedNode, currentUser, allNodes, config]);

  // Helper to resolve full Windows-style path for the Details pane
  const getWindowsLocationPath = useCallback(
    (node: FileNode) => {
      const map = new Map<string, FileNode>(allNodes.map((n) => [n.id, n]));
      const parts: string[] = [];
      let p = node.parentId ? map.get(node.parentId) : undefined;
      let guard = 0;
      while (p && guard < 20) {
        guard++;
        parts.unshift(p.name);
        p = p.parentId ? map.get(p.parentId) : undefined;
      }
      return parts.length > 0 ? `D:\\${parts.join('\\')}` : 'D:\\';
    },
    [allNodes]
  );

  return (
    <div
      onClick={() => {
        setContextMenu(null);
        setOpenToolbarMenu(null);
      }}
      className={`flex flex-col bg-[#0b101b] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden ${
        config.theme === 'light' ? 'theme-light' : ''
      } ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'rounded-2xl h-[780px]'}`}
    >
      {/* Hidden Native File Input for Real File Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleExternalFileUpload}
        className="hidden"
      />

      {/* ====================================================================
          ROW 1: WINDOWS 11 MULTI-TAB BAR (Sekmeli Dosya Gezgini Üst Çubuğu)
      ==================================================================== */}
      <div className="px-2 pt-1.5 bg-[#080c14] border-b border-slate-800/90 flex items-end justify-between gap-2 select-none">
        {/* Left: Browser-style Folder Tabs + '+' New Tab Button */}
        <div className="flex items-end gap-1 overflow-x-auto no-scrollbar min-w-0 flex-1">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;
            const title = getTabTitle(tab);
            const tabIcon =
              tab.navSection === 'trash'
                ? 'delete'
                : tab.navSection === 'starred'
                ? 'star'
                : tab.navSection === 'shared'
                ? 'share'
                : tab.navSection === 'locked'
                ? 'lock'
                : tab.folderId
                ? 'folder'
                : 'hard_drive';

            const iconColor =
              tab.navSection === 'trash'
                ? 'text-rose-400'
                : tab.navSection === 'starred'
                ? 'text-amber-400'
                : tab.navSection === 'shared'
                ? 'text-emerald-400'
                : tab.navSection === 'locked'
                ? 'text-rose-400'
                : tab.folderId
                ? 'text-amber-400'
                : 'text-blue-400';

            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setSelectedIds(new Set());
                }}
                onAuxClick={(e) => {
                  if (e.button === 1) handleCloseTab(tab.id, e);
                }}
                className={`group relative flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-t-lg text-xs cursor-pointer transition min-w-[140px] max-w-[220px] border-t border-x ${
                  isActive
                    ? 'bg-[#101726] text-white font-semibold border-slate-700/90 shadow-sm'
                    : 'bg-slate-900/40 text-slate-400 hover:bg-slate-900/80 hover:text-slate-200 border-transparent'
                }`}
              >
                <span
                  className={`material-symbols-outlined ms-filled shrink-0 ${iconColor}`}
                  style={{ fontSize: '16px' }}
                >
                  {tabIcon}
                </span>
                <span className="truncate flex-1">{title}</span>
                {tabs.length > 1 && (
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    className="w-5 h-5 rounded hover:bg-slate-700/80 flex items-center justify-center text-slate-400 hover:text-white shrink-0"
                    title="Sekmeyi Kapat (Orta Tık)"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                      close
                    </span>
                  </button>
                )}
              </div>
            );
          })}

          {/* '+' New Tab Button */}
          <button
            onClick={() => handleOpenNewTab(currentFolderId, navSection)}
            className="mb-1 w-7 h-7 rounded-md hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center shrink-0 transition"
            title="Yeni Sekme Aç (+)"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              add
            </span>
          </button>
        </div>

        {/* Right: Role Switcher, Language (TR/EN/DE), Theme & Fullscreen */}
        <div className="flex items-center gap-1.5 pb-1.5 shrink-0">
          {/* Active Role Identity Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-md px-2 py-0.5">
            <span
              className="material-symbols-outlined text-emerald-400"
              style={{ fontSize: '15px' }}
            >
              verified_user
            </span>
            <select
              value={currentUser.id}
              onChange={(e) => {
                const found = DEMO_USERS.find((u) => u.id === e.target.value);
                if (found) {
                  setCurrentUser(found);
                  notify(
                    'info',
                    'Oturum Kimliği Değiştirildi',
                    `Aktif kullanıcı: ${found.name} [Rol: ${found.role.toUpperCase()}]`
                  );
                }
              }}
              className="bg-transparent text-[11px] font-semibold text-white focus:outline-none cursor-pointer"
            >
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id} className="bg-slate-900 text-white">
                  {u.name.split(' (')[0]} [{u.role.toUpperCase()}]
                </option>
              ))}
            </select>
          </div>

          {/* Language Dropdown (TR / EN / DE / RU) */}
          <LanguageDropdown
            compact
            locale={config.locale}
            onSelectLocale={(locale) => onConfigChange?.({ locale })}
          />

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() =>
              onConfigChange?.({
                theme: config.theme === 'light' ? 'dark' : 'light',
              })
            }
            className="w-7 h-7 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition"
            title="Dark / Light Tema"
          >
            <span
              className={`material-symbols-outlined ${
                config.theme === 'light' ? 'text-indigo-500' : 'text-amber-400'
              }`}
              style={{ fontSize: '16px' }}
            >
              {config.theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className="w-7 h-7 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 flex items-center justify-center transition"
              title={isFullscreen ? dict.explorer.fullscreenExit : 'Tam Ekran'}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                {isFullscreen ? 'close_fullscreen' : 'open_in_full'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ====================================================================
          ROW 2: WINDOWS 11 NAVIGATION ARROWS + BREADCRUMB BAR + SEARCH BOX
      ==================================================================== */}
      {config.enableBreadcrumbs && (
        <div className="px-2.5 py-1.5 bg-[#101726] border-b border-slate-800/90 flex items-center gap-2 select-none">
          {/* Back / Forward / Up / Refresh Buttons with Google Material Symbols */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              disabled={activeTab.historyIndex <= 0}
              onClick={handleTabBack}
              className="w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition"
              title="Geri (Alt+Sol)"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                arrow_back
              </span>
            </button>
            <button
              disabled={activeTab.historyIndex >= activeTab.history.length - 1}
              onClick={handleTabForward}
              className="w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition"
              title="İleri (Alt+Sağ)"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                arrow_forward
              </span>
            </button>
            <button
              disabled={!currentFolderId && navSection === 'volume'}
              onClick={() => {
                if (navSection !== 'volume') {
                  setNavSection('volume');
                  return;
                }
                if (currentFolderNode) {
                  setCurrentFolderId(currentFolderNode.parentId);
                }
              }}
              className="w-7 h-7 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition"
              title="Üst Klasöre Çık (Alt+Yukarı)"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                arrow_upward
              </span>
            </button>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('all');
                notify('info', 'Görünüm Yenilendi', 'Dizin ağacı ve önbellek tazelendi.');
              }}
              className="w-7 h-7 rounded-md hover:bg-slate-800 text-slate-200 flex items-center justify-center transition"
              title="Yenile (F5)"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                refresh
              </span>
            </button>
          </div>

          {/* Center Windows 11 Breadcrumb Box */}
          <div className="flex-1 min-w-0 flex items-center justify-between gap-2 bg-slate-950/90 border border-slate-800 rounded-md px-2.5 py-1 text-xs overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 min-w-0">
              <button
                onClick={() => navigateActiveTab(null, 'volume')}
                className="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-slate-800 text-slate-200 font-medium shrink-0 transition"
              >
                <span
                  className="material-symbols-outlined text-blue-400"
                  style={{ fontSize: '16px' }}
                >
                  computer
                </span>
                <span>Bu bilgisayar</span>
              </button>

              <span
                className="material-symbols-outlined text-slate-500 shrink-0"
                style={{ fontSize: '15px' }}
              >
                chevron_right
              </span>

              <button
                onClick={() => navigateActiveTab(null, 'volume')}
                onDragOver={(e) => {
                  if (!config.enableDragAndDrop) return;
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  if (!config.enableDragAndDrop) return;
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    const raw =
                      e.dataTransfer.getData('application/hyperion-nodes') ||
                      e.dataTransfer.getData('text/plain');
                    if (!raw) return;
                    const ids: string[] = JSON.parse(raw);
                    if (Array.isArray(ids) && ids.length > 0) {
                      handleDropNodesIntoFolder(null, ids);
                    }
                  } catch {
                    // ignore
                  }
                }}
                className={`px-1.5 py-0.5 rounded hover:bg-slate-800 shrink-0 transition ${
                  navSection === 'volume' && !currentFolderId
                    ? 'text-white font-semibold'
                    : 'text-slate-300'
                }`}
              >
                {config.volumeName} (D:)
              </button>

              {navSection !== 'volume' ? (
                <>
                  <span
                    className="material-symbols-outlined text-slate-500 shrink-0"
                    style={{ fontSize: '15px' }}
                  >
                    chevron_right
                  </span>
                  <span className="px-1.5 py-0.5 text-amber-400 font-semibold shrink-0">
                    {navSection === 'trash'
                      ? dict.explorer.recycleBin
                      : navSection === 'starred'
                      ? dict.explorer.starred
                      : navSection === 'shared'
                      ? dict.explorer.shared
                      : dict.explorer.lockedVault}
                  </span>
                </>
              ) : (
                breadcrumbs.map((crumb, idx) => (
                  <React.Fragment key={crumb.id}>
                    <span
                      className="material-symbols-outlined text-slate-500 shrink-0"
                      style={{ fontSize: '15px' }}
                    >
                      chevron_right
                    </span>
                    <button
                      onClick={() => navigateActiveTab(crumb.id, 'volume')}
                      onDragOver={(e) => {
                        if (!config.enableDragAndDrop) return;
                        e.preventDefault();
                        e.dataTransfer.dropEffect = 'move';
                      }}
                      onDrop={(e) => {
                        if (!config.enableDragAndDrop) return;
                        e.preventDefault();
                        e.stopPropagation();
                        try {
                          const raw =
                            e.dataTransfer.getData('application/hyperion-nodes') ||
                            e.dataTransfer.getData('text/plain');
                          if (!raw) return;
                          const ids: string[] = JSON.parse(raw);
                          if (Array.isArray(ids) && ids.length > 0) {
                            handleDropNodesIntoFolder(crumb.id, ids);
                          }
                        } catch {
                          // ignore
                        }
                      }}
                      className={`px-1.5 py-0.5 rounded hover:bg-slate-800 truncate max-w-[180px] transition ${
                        idx === breadcrumbs.length - 1
                          ? 'text-white font-semibold'
                          : 'text-slate-300'
                      }`}
                    >
                      {crumb.name}
                    </button>
                  </React.Fragment>
                ))
              )}
            </div>

            {/* Right inside address bar: Live Benchmark Badge */}
            <div className="hidden lg:flex items-center gap-1.5 shrink-0 pl-2 border-l border-slate-800 text-[11px] font-mono text-emerald-400">
              <span>{visibleNodes.length.toLocaleString(config.locale)} öğe</span>
              <span className="text-slate-600">•</span>
              <span>{queryElapsedMs}ms</span>
            </div>
          </div>

          {/* Right Windows 11 Search Box */}
          <div className="relative w-48 sm:w-64 shrink-0">
            <input
              type="text"
              placeholder={
                currentFolderNode
                  ? `${currentFolderNode.name} klasöründe ara`
                  : dict.explorer.searchPlaceholder
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 focus:border-blue-500 rounded-md pl-3 pr-8 py-1 text-xs text-white focus:outline-none transition"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white flex items-center"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                  close
                </span>
              </button>
            ) : (
              <span
                className="material-symbols-outlined text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ fontSize: '16px' }}
              >
                search
              </span>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          ROW 3: WINDOWS 11 SINGLE-ROW COMMAND TOOLBAR (Tek Satır & Google Icons)
      ==================================================================== */}
      {config.enableRibbonToolbar && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative px-3 h-11 bg-[#0d1320] border-b border-slate-800/90 flex items-center justify-between gap-2 select-none whitespace-nowrap"
        >
          {/* Left & Center Windows 11 Command Group */}
          <div className="flex items-center gap-1 min-w-0">
            {/* '+ Yeni v' Split/Dropdown Button */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenToolbarMenu((prev) => (prev === 'new' ? null : 'new'))
                }
                className="px-2.5 py-1.5 rounded-md hover:bg-slate-800 text-slate-100 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <span
                  className="material-symbols-outlined text-blue-400"
                  style={{ fontSize: '19px' }}
                >
                  add_circle
                </span>
                <span>Yeni</span>
                <span
                  className="material-symbols-outlined text-slate-400"
                  style={{ fontSize: '15px' }}
                >
                  expand_more
                </span>
              </button>

              {openToolbarMenu === 'new' && (
                <div className="absolute left-0 top-full mt-1 z-50 w-56 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200">
                  <button
                    onClick={() => {
                      handleCreateFolder();
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5"
                  >
                    <span
                      className="material-symbols-outlined ms-filled text-amber-400"
                      style={{ fontSize: '18px' }}
                    >
                      create_new_folder
                    </span>
                    <span>{dict.explorer.newFolder}</span>
                  </button>
                  <button
                    onClick={() => {
                      handleCreateFile();
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5"
                  >
                    <span
                      className="material-symbols-outlined text-blue-400"
                      style={{ fontSize: '18px' }}
                    >
                      description
                    </span>
                    <span>{dict.explorer.newFile} (.md)</span>
                  </button>
                  <button
                    onClick={() => {
                      handleCreateFile(
                        `Module_${Date.now().toString().slice(-4)}.ts`,
                        `export const version = '2.4.0';\n`,
                        64 * 1024,
                        'code'
                      );
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5"
                  >
                    <span
                      className="material-symbols-outlined text-emerald-400"
                      style={{ fontSize: '18px' }}
                    >
                      code
                    </span>
                    <span>TypeScript Modülü (.ts)</span>
                  </button>
                  <div className="my-1 border-t border-slate-800" />
                  <button
                    onClick={() => {
                      fileInputRef.current?.click();
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2.5 text-cyan-300"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '18px' }}
                    >
                      upload_file
                    </span>
                    <span>Bilgisayardan Dosya Yükle...</span>
                  </button>
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-slate-800 mx-1" />

            {/* Windows 11 Icon-Only Clipboard & Item Actions */}
            <button
              disabled={selectedIds.size === 0}
              onClick={() => handleCopyOrCut('cut')}
              className="w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition"
              title={`${dict.explorer.cut} (Ctrl+X)`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                content_cut
              </span>
            </button>

            <button
              disabled={selectedIds.size === 0}
              onClick={() => handleCopyOrCut('copy')}
              className="w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition"
              title={`${dict.explorer.copy} (Ctrl+C)`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                content_copy
              </span>
            </button>

            <button
              disabled={!clipboard.mode}
              onClick={() => executePaste(currentFolderId)}
              className={`relative px-2 h-8 rounded-md flex items-center justify-center gap-1 transition ${
                clipboard.mode
                  ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30'
                  : 'opacity-30 text-slate-300'
              }`}
              title={`${dict.explorer.paste} (Ctrl+V)`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                content_paste
              </span>
              {clipboard.nodeIds.length > 0 && (
                <span className="text-[10px] font-mono font-bold">
                  {clipboard.nodeIds.length}
                </span>
              )}
            </button>

            <button
              disabled={selectedIds.size === 0}
              onClick={() => {
                if (selectedIds.size === 1) {
                  setRenamingId(Array.from(selectedIds)[0]);
                } else if (config.enableBatchRename) {
                  setShowBatchRename(true);
                }
              }}
              className="w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition"
              title={`${dict.explorer.rename} (F2)`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                drive_file_rename_outline
              </span>
            </button>

            {config.enableShareLinks && (
              <button
                disabled={selectedNodes.length !== 1}
                onClick={() => selectedNodes[0] && setShareModalNode(selectedNodes[0])}
                className="w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-200 flex items-center justify-center transition"
                title={dict.explorer.ctxShare}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  share
                </span>
              </button>
            )}

            {navSection === 'trash' && (
              <button
                disabled={selectedIds.size === 0}
                onClick={handleRestoreSelected}
                className="px-2.5 h-8 rounded-md bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1"
                title={dict.explorer.restore}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>
                  restore_from_trash
                </span>
                <span className="hidden lg:inline">{dict.explorer.restore}</span>
              </button>
            )}

            <button
              disabled={selectedIds.size === 0}
              onClick={() => handleDeleteSelected(false)}
              className="w-8 h-8 rounded-md hover:bg-rose-500/20 disabled:opacity-30 text-slate-200 hover:text-rose-300 flex items-center justify-center transition"
              title={`${dict.explorer.ctxDelete} (Del)`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                delete
              </span>
            </button>

            {config.enableArchiveCompression && (
              <button
                disabled={selectedIds.size === 0}
                onClick={handleCreateArchive}
                className="w-8 h-8 rounded-md hover:bg-slate-800 disabled:opacity-30 text-amber-400 flex items-center justify-center transition"
                title={dict.explorer.zipCompress}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                  folder_zip
                </span>
              </button>
            )}

            <button
              disabled={!primarySelectedNode}
              onClick={() => primarySelectedNode && setSecurityModalNode(primarySelectedNode)}
              className="w-8 h-8 rounded-md hover:bg-indigo-600/25 disabled:opacity-30 text-indigo-400 flex items-center justify-center transition"
              title={dict.explorer.permissionsAcl}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                shield_lock
              </span>
            </button>

            <div className="h-5 w-px bg-slate-800 mx-1" />

            {/* 'Sırala v' (Sort & Group Dropdown Menu) */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenToolbarMenu((prev) => (prev === 'sort' ? null : 'sort'))
                }
                className="px-2.5 py-1.5 rounded-md hover:bg-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <span
                  className="material-symbols-outlined text-slate-300"
                  style={{ fontSize: '18px' }}
                >
                  swap_vert
                </span>
                <span>Sırala</span>
                <span
                  className="material-symbols-outlined text-slate-400"
                  style={{ fontSize: '15px' }}
                >
                  expand_more
                </span>
              </button>

              {openToolbarMenu === 'sort' && (
                <div className="absolute left-0 top-full mt-1 z-50 w-56 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Sıralama Ölçütü
                  </div>
                  {(
                    [
                      ['name', dict.explorer.colName],
                      ['updatedAt', dict.explorer.colModified],
                      ['type', dict.explorer.colType],
                      ['size', dict.explorer.colSize],
                    ] as const
                  ).map(([field, label]) => (
                    <button
                      key={field}
                      onClick={() => {
                        setSortField(field);
                        setOpenToolbarMenu(null);
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span>{label}</span>
                      {sortField === field && (
                        <span
                          className="material-symbols-outlined text-blue-400"
                          style={{ fontSize: '16px' }}
                        >
                          check
                        </span>
                      )}
                    </button>
                  ))}

                  <div className="my-1 border-t border-slate-800" />
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Yön
                  </div>
                  <button
                    onClick={() => {
                      setSortDirection('asc');
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
                  >
                    <span>Artan (A-Z / Küçükten Büyüğe)</span>
                    {sortDirection === 'asc' && (
                      <span
                        className="material-symbols-outlined text-blue-400"
                        style={{ fontSize: '16px' }}
                      >
                        check
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setSortDirection('desc');
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
                  >
                    <span>Azalan (Z-A / Büyükten Küçüğe)</span>
                    {sortDirection === 'desc' && (
                      <span
                        className="material-symbols-outlined text-blue-400"
                        style={{ fontSize: '16px' }}
                      >
                        check
                      </span>
                    )}
                  </button>

                  <div className="my-1 border-t border-slate-800" />
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Gruplandırma (Windows 11)
                  </div>
                  {(
                    [
                      ['date', 'Tarihe Göre Grupla (Bugün / Dün)'],
                      ['category', 'Dosya Türüne Göre Grupla'],
                      ['none', 'Gruplama Yok'],
                    ] as const
                  ).map(([gMode, gLabel]) => (
                    <button
                      key={gMode}
                      onClick={() => {
                        setGroupBy(gMode);
                        setOpenToolbarMenu(null);
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span>{gLabel}</span>
                      {groupBy === gMode && (
                        <span
                          className="material-symbols-outlined text-blue-400"
                          style={{ fontSize: '16px' }}
                        >
                          check
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 'Görünüm v' (Windows 11 View Selector Dropdown) */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenToolbarMenu((prev) => (prev === 'view' ? null : 'view'))
                }
                className="px-2.5 py-1.5 rounded-md hover:bg-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <span
                  className="material-symbols-outlined text-slate-300"
                  style={{ fontSize: '18px' }}
                >
                  desktop_windows
                </span>
                <span>Görünüm</span>
                <span
                  className="material-symbols-outlined text-slate-400"
                  style={{ fontSize: '15px' }}
                >
                  expand_more
                </span>
              </button>

              {openToolbarMenu === 'view' && (
                <div className="absolute left-0 top-full mt-1 z-50 w-60 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200">
                  {(
                    [
                      ['extra_large_icons', 'grid_view', dict.explorer.viewExtraLarge],
                      ['large_icons', 'Apps', dict.explorer.viewLarge],
                      ['medium_icons', 'window', dict.explorer.viewMedium],
                      ['small_icons', 'view_compact', dict.explorer.viewSmall],
                      ['list', 'format_list_bulleted', dict.explorer.viewList],
                      ['details', 'table_rows', dict.explorer.viewDetails],
                      ['tiles', 'view_module', dict.explorer.viewTiles],
                      ['content', 'view_agenda', dict.explorer.viewContent],
                    ] as const
                  ).map(([mode, iconName, label]) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setViewMode(mode);
                        setOpenToolbarMenu(null);
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className="material-symbols-outlined text-slate-400"
                          style={{ fontSize: '17px' }}
                        >
                          {iconName}
                        </span>
                        <span>{label}</span>
                      </span>
                      {viewMode === mode && (
                        <span
                          className="material-symbols-outlined text-blue-400"
                          style={{ fontSize: '16px' }}
                        >
                          check
                        </span>
                      )}
                    </button>
                  ))}

                  {config.enableWebGLAcceleration && (
                    <>
                      <div className="my-1 border-t border-slate-800" />
                      <button
                        onClick={() => {
                          setViewMode('webgl_spatial');
                          setOpenToolbarMenu(null);
                        }}
                        className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-blue-300"
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '17px' }}
                          >
                            memory
                          </span>
                          <span>{dict.explorer.webglScene}</span>
                        </span>
                        {viewMode === 'webgl_spatial' && (
                          <span
                            className="material-symbols-outlined text-blue-400"
                            style={{ fontSize: '16px' }}
                          >
                            check
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setViewMode('webgl_diskmap');
                          setOpenToolbarMenu(null);
                        }}
                        className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-emerald-300"
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '17px' }}
                          >
                            donut_large
                          </span>
                          <span>{dict.explorer.webglDiskMap}</span>
                        </span>
                        {viewMode === 'webgl_diskmap' && (
                          <span
                            className="material-symbols-outlined text-emerald-400"
                            style={{ fontSize: '16px' }}
                          >
                            check
                          </span>
                        )}
                      </button>
                    </>
                  )}

                  <div className="my-1 border-t border-slate-800" />
                  <button
                    onClick={() => {
                      onConfigChange?.({ enableDualPane: !config.enableDualPane });
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        className="material-symbols-outlined text-cyan-400"
                        style={{ fontSize: '17px' }}
                      >
                        vertical_split
                      </span>
                      <span>Çift Panel (Dual-Pane)</span>
                    </span>
                    {config.enableDualPane && (
                      <span
                        className="material-symbols-outlined text-blue-400"
                        style={{ fontSize: '16px' }}
                      >
                        check
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* '⋯' More Options Menu (Stress Test Fake File Generator, Undo/Redo, Reset) */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenToolbarMenu((prev) => (prev === 'more' ? null : 'more'))
                }
                className="w-8 h-8 rounded-md hover:bg-slate-800 text-slate-300 flex items-center justify-center transition"
                title="Diğer İşlemler & Performans Stres Testi (⋯)"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  more_horiz
                </span>
              </button>

              {openToolbarMenu === 'more' && (
                <div className="absolute left-0 top-full mt-1 z-50 w-64 rounded-xl bg-[#111827] border border-slate-700 shadow-2xl py-1.5 text-xs text-slate-200">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                      bolt
                    </span>
                    <span>Performans Stres Testi (Fake Dosya)</span>
                  </div>
                  <button
                    onClick={() => {
                      const t0 = performance.now();
                      const batch = generateStressTestNodes(2500, currentFolderId);
                      commitNodesUpdate([...allNodes, ...batch], false);
                      const dt = (performance.now() - t0).toFixed(1);
                      setOpenToolbarMenu(null);
                      notify(
                        'success',
                        '+2.500 Fake Dosya Üretildi',
                        `Bu klasöre ${dt} ms içinde 2.500 yeni dosya eklendi.`
                      );
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-blue-300"
                  >
                    <span>+2.500 Fake Dosya Üret</span>
                    <span className="font-mono text-[10px]">+2.5K</span>
                  </button>
                  <button
                    onClick={() => {
                      const t0 = performance.now();
                      const batch = generateStressTestNodes(10000, currentFolderId);
                      commitNodesUpdate([...allNodes, ...batch], false);
                      const dt = (performance.now() - t0).toFixed(1);
                      setOpenToolbarMenu(null);
                      notify(
                        'success',
                        '+10.000 Fake Dosya Üretildi',
                        `Bu klasöre ${dt} ms içinde 10.000 yeni dosya eklendi.`
                      );
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-indigo-300"
                  >
                    <span>+10.000 Fake Dosya Üret</span>
                    <span className="font-mono text-[10px]">+10K</span>
                  </button>
                  <button
                    onClick={() => {
                      const t0 = performance.now();
                      const batch = generateStressTestNodes(25000, currentFolderId);
                      commitNodesUpdate([...allNodes, ...batch], false);
                      const dt = (performance.now() - t0).toFixed(1);
                      setOpenToolbarMenu(null);
                      notify(
                        'success',
                        '+25.000 Fake Dosya Üretildi',
                        `Bu klasöre ${dt} ms içinde 25.000 yeni dosya eklendi.`
                      );
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between text-purple-300"
                  >
                    <span>+25.000 Fake Dosya Üret</span>
                    <span className="font-mono text-[10px]">+25K</span>
                  </button>
                  {allNodes.some((n) => n.isSyntheticStressNode) && (
                    <button
                      onClick={() => {
                        const cleaned = allNodes.filter((n) => !n.isSyntheticStressNode);
                        commitNodesUpdate(cleaned, false);
                        setSelectedIds(new Set());
                        setOpenToolbarMenu(null);
                        notify(
                          'info',
                          'Fake Dosyalar Temizlendi',
                          'Tüm sentetik test dosyaları kaldırıldı.'
                        );
                      }}
                      className="w-full px-3.5 py-1.5 hover:bg-rose-500/20 text-rose-400 flex items-center justify-between"
                    >
                      <span>{dict.explorer.clearFake}</span>
                      <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>
                        delete_sweep
                      </span>
                    </button>
                  )}

                  <div className="my-1 border-t border-slate-800" />
                  <button
                    disabled={historyPast.length === 0}
                    onClick={() => {
                      handleUndo();
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 disabled:opacity-35 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                        undo
                      </span>
                      <span>Geri Al (Undo)</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Ctrl+Z</span>
                  </button>
                  <button
                    disabled={historyFuture.length === 0}
                    onClick={() => {
                      handleRedo();
                      setOpenToolbarMenu(null);
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 disabled:opacity-35 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                        redo
                      </span>
                      <span>Yinele (Redo)</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Ctrl+Y</span>
                  </button>
                  <button
                    onClick={async () => {
                      const reset = await driver.resetToFactoryDefaults();
                      setAllNodes(reset);
                      navigateActiveTab(null, 'volume');
                      setSelectedIds(new Set());
                      setOpenToolbarMenu(null);
                      notify(
                        'info',
                        'Fabrika Ayarlarına Dönüldü',
                        'Sanal disk varsayılan yapısına sıfırlandı.'
                      );
                    }}
                    className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2 text-amber-300"
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                      restart_alt
                    </span>
                    <span>{dict.explorer.resetBtn}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Side of Command Bar: Quick Stress Test Pill + 'Ayrıntılar' Toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Compact Stress Test Quick Generator */}
            <div className="hidden xl:flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-md px-1.5 py-0.5 text-[11px]">
              <button
                onClick={() => {
                  const t0 = performance.now();
                  const batch = generateStressTestNodes(2500, currentFolderId);
                  commitNodesUpdate([...allNodes, ...batch], false);
                  const dt = (performance.now() - t0).toFixed(1);
                  notify(
                    'success',
                    '+2.500 Fake Dosya Üretildi',
                    `Bu klasöre ${dt} ms içinde 2.500 yeni dosya eklendi.`
                  );
                }}
                className="px-1.5 py-0.5 rounded hover:bg-blue-600/25 text-blue-300 font-mono font-semibold transition"
                title={dict.explorer.files25k}
              >
                +2.5K
              </button>
              <button
                onClick={() => {
                  const t0 = performance.now();
                  const batch = generateStressTestNodes(10000, currentFolderId);
                  commitNodesUpdate([...allNodes, ...batch], false);
                  const dt = (performance.now() - t0).toFixed(1);
                  notify(
                    'success',
                    '+10.000 Fake Dosya Üretildi',
                    `Bu klasöre ${dt} ms içinde 10.000 yeni dosya eklendi.`
                  );
                }}
                className="px-1.5 py-0.5 rounded hover:bg-indigo-600/25 text-indigo-300 font-mono font-semibold transition"
                title={dict.explorer.files10k}
              >
                +10K
              </button>
              {allNodes.some((n) => n.isSyntheticStressNode) && (
                <button
                  onClick={() => {
                    const cleaned = allNodes.filter((n) => !n.isSyntheticStressNode);
                    commitNodesUpdate(cleaned, false);
                    setSelectedIds(new Set());
                  }}
                  className="px-1.5 py-0.5 rounded bg-rose-500/15 hover:bg-rose-500/30 text-rose-400 font-medium transition"
                >
                  {dict.explorer.clearFake}
                </button>
              )}
            </div>

            {/* Windows 11 'Ayrıntılar' (Details Pane) Toggle Button */}
            <button
              onClick={() =>
                onConfigChange?.({
                  enableDetailsInspector: !config.enableDetailsInspector,
                })
              }
              className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 border transition ${
                config.enableDetailsInspector
                  ? 'bg-slate-800 border-slate-700 text-white shadow-sm'
                  : 'border-transparent text-slate-300 hover:bg-slate-800/70'
              }`}
              title="Ayrıntılar Bölmesini Aç/Kapat"
            >
              <span
                className="material-symbols-outlined text-blue-400"
                style={{ fontSize: '18px' }}
              >
                dock_to_left
              </span>
              <span>Ayrıntılar</span>
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          ROW 4: MAIN WORKSPACE (Resizable Left Sidebar + Center + Resizable Right Details)
      ==================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR: RESIZABLE NAVIGATION PANE */}
        {config.enableFolderTree && (
          <>
            <div
              style={{ width: `${leftSidebarWidth}px` }}
              className="bg-[#0d131f] border-r border-slate-800/90 flex flex-col justify-between shrink-0 select-none hidden md:flex"
            >
              <div className="p-2 space-y-3 overflow-y-auto flex-1">
                {/* Pin / Quick Access Section */}
                <div className="space-y-0.5 text-xs">
                  <button
                    onClick={() => navigateActiveTab(null, 'volume')}
                    className={`w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                      navSection === 'volume' && currentFolderId === null
                        ? 'bg-blue-600/20 text-blue-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="material-symbols-outlined text-blue-400 shrink-0"
                        style={{ fontSize: '18px' }}
                      >
                        home
                      </span>
                      <span className="truncate">Giriş ({dict.explorer.rootVolume})</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {allNodes.filter((n) => !n.trashed).length}
                    </span>
                  </button>

                  <button
                    onClick={() => setNavSection('starred')}
                    className={`w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                      navSection === 'starred'
                        ? 'bg-amber-500/20 text-amber-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="material-symbols-outlined ms-filled text-amber-400 shrink-0"
                        style={{ fontSize: '18px' }}
                      >
                        star
                      </span>
                      <span className="truncate">{dict.explorer.starred}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {allNodes.filter((n) => !n.trashed && n.starred).length}
                    </span>
                  </button>

                  <button
                    onClick={() => setNavSection('shared')}
                    className={`w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                      navSection === 'shared'
                        ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="material-symbols-outlined text-emerald-400 shrink-0"
                        style={{ fontSize: '18px' }}
                      >
                        folder_shared
                      </span>
                      <span className="truncate">{dict.explorer.shared}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {allNodes.filter((n) => !n.trashed && n.shareLink).length}
                    </span>
                  </button>

                  <button
                    onClick={() => setNavSection('locked')}
                    className={`w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                      navSection === 'locked'
                        ? 'bg-rose-500/20 text-rose-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <span
                        className="material-symbols-outlined text-rose-400 shrink-0"
                        style={{ fontSize: '18px' }}
                      >
                        lock
                      </span>
                      <span className="truncate">{dict.explorer.lockedVault}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {allNodes.filter((n) => !n.trashed && n.security.locked).length}
                    </span>
                  </button>

                  {config.enableRecycleBin && (
                    <button
                      onClick={() => setNavSection('trash')}
                      className={`w-full px-2.5 py-1.5 rounded-md flex items-center justify-between transition ${
                        navSection === 'trash'
                          ? 'bg-rose-500/20 text-rose-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span
                          className="material-symbols-outlined text-slate-400 shrink-0"
                          style={{ fontSize: '18px' }}
                        >
                          delete
                        </span>
                        <span className="truncate">{dict.explorer.recycleBin}</span>
                      </span>
                      <span className="text-[10px] font-mono text-rose-400">
                        {allNodes.filter((n) => n.trashed).length}
                      </span>
                    </button>
                  )}
                </div>

                <div className="border-t border-slate-800/80 my-1" />

                {/* 'Bu bilgisayar' Hierarchical Directory Tree */}
                <div>
                  <div className="px-2 pb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-slate-300">
                    <span
                      className="material-symbols-outlined text-blue-400"
                      style={{ fontSize: '16px' }}
                    >
                      computer
                    </span>
                    <span>Bu bilgisayar</span>
                  </div>
                  {renderFolderTreeBranch(null, 0)}
                </div>
              </div>

              {/* Bottom Disk Quota Gauge Card */}
              <div className="p-2.5 m-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5 truncate">
                    <span
                      className="material-symbols-outlined text-blue-400"
                      style={{ fontSize: '16px' }}
                    >
                      hard_drive
                    </span>
                    <span className="truncate">Yerel Disk (D:)</span>
                  </span>
                  <span className="font-mono text-[11px] text-blue-400">
                    {volumeUsagePercent.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                  <div
                    style={{ width: `${volumeUsagePercent}%` }}
                    className={`h-full transition-all duration-300 ${
                      volumeUsagePercent > 85
                        ? 'bg-rose-500'
                        : volumeUsagePercent > 65
                        ? 'bg-amber-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                    }`}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>{QuotaEngine.formatBytes(totalUsedBytes)}</span>
                  <span>{QuotaEngine.formatBytes(config.totalDiskQuotaBytes)}</span>
                </div>
              </div>
            </div>

            {/* LEFT SIDEBAR DRAG RESIZE HANDLE */}
            <div
              onMouseDown={(e) => startResizingSidebar('left', e)}
              className="w-1 hover:w-1.5 bg-transparent hover:bg-blue-500/60 cursor-col-resize transition-all shrink-0 hidden md:block z-20"
              title="Sol Bölmeyi Yeniden Boyutlandır (Sürükle)"
            />
          </>
        )}

        {/* CENTER VIEWPORT (Supports Single or Dual-Pane Commander Mode) */}
        <div className="flex-1 flex overflow-hidden bg-[#0b101b] relative min-w-0">
          {/* Primary Viewport */}
          <div className="flex-1 h-full overflow-hidden relative flex flex-col min-w-0">
            {viewMode === 'webgl_spatial' && config.enableWebGLAcceleration ? (
              <WebGLSpatialViewport
                nodes={visibleNodes}
                allNodes={allNodes}
                selectedIds={selectedIds}
                clipboard={clipboard}
                currentUser={currentUser}
                config={config}
                onSelectNode={handleSelectNode}
                onSelectMany={handleSelectMany}
                onOpenNode={handleOpenNode}
                onContextMenuNode={(e, node) =>
                  setContextMenu({ x: e.clientX, y: e.clientY, node })
                }
                onDropNodesIntoFolder={handleDropNodesIntoFolder}
                onInjectStressNodes={(count) => {
                  const stress = generateStressTestNodes(count, currentFolderId);
                  commitNodesUpdate([...allNodes, ...stress]);
                  notify(
                    'success',
                    'WebGL Stres Testi Başlatıldı',
                    `${count} sentetik düğüm GPU sahnesine eklendi.`
                  );
                }}
                onClearStressNodes={() => {
                  const cleaned = allNodes.filter((n) => !n.isSyntheticStressNode);
                  commitNodesUpdate(cleaned);
                  notify('info', 'Stres Düğümleri Temizlendi', 'Sentetik düğümler kaldırıldı.');
                }}
              />
            ) : viewMode === 'webgl_diskmap' && config.enableWebGLDiskMap ? (
              <WebGLDiskMapViewport
                allNodes={allNodes}
                currentFolderId={currentFolderId}
                selectedIds={selectedIds}
                currentUser={currentUser}
                config={config}
                onSelectNode={handleSelectNode}
                onOpenNode={handleOpenNode}
              />
            ) : (
              <WindowsExplorerViews
                nodes={visibleNodes}
                allNodes={allNodes}
                viewMode={viewMode}
                selectedIds={selectedIds}
                clipboard={clipboard}
                renamingId={renamingId}
                sortField={sortField}
                sortDirection={sortDirection}
                groupBy={groupBy}
                currentUser={currentUser}
                config={config}
                onSelectNode={handleSelectNode}
                onSelectMany={handleSelectMany}
                onOpenNode={handleOpenNode}
                onContextMenuNode={(e, node) =>
                  setContextMenu({ x: e.clientX, y: e.clientY, node })
                }
                onCommitRename={handleCommitRename}
                onCancelRename={() => setRenamingId(null)}
                onSortChange={(field) => {
                  if (sortField === field) {
                    setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
                  } else {
                    setSortField(field);
                    setSortDirection('asc');
                  }
                }}
                onDropNodesIntoFolder={handleDropNodesIntoFolder}
              />
            )}
          </div>

          {/* Optional Secondary Dual-Pane Viewport */}
          {config.enableDualPane && (
            <div className="w-1/2 h-full border-l border-slate-800 bg-[#0d1320] flex flex-col">
              <div className="px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Columns className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold text-white">
                    {dict.explorer.secondaryPane}
                  </span>
                  <select
                    value={secondaryFolderId || ''}
                    onChange={(e) => setSecondaryFolderId(e.target.value || null)}
                    className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-cyan-300"
                  >
                    <option value="">/ ({dict.explorer.rootVolume})</option>
                    {allNodes
                      .filter((n) => !n.trashed && n.type === 'folder')
                      .map((f) => (
                        <option key={f.id} value={f.id}>
                          /{f.name}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  disabled={selectedIds.size === 0}
                  onClick={() => {
                    if (selectedIds.size === 0) return;
                    handleDropNodesIntoFolder(
                      secondaryFolderId || '',
                      Array.from(selectedIds)
                    );
                  }}
                  className="px-2.5 py-1 rounded bg-cyan-600/25 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-600/35 disabled:opacity-35 text-[11px] font-medium"
                >
                  {dict.explorer.transferHere}
                </button>
              </div>

              <div className="flex-1 overflow-auto p-3 space-y-1.5">
                {allNodes
                  .filter((n) => !n.trashed && n.parentId === secondaryFolderId)
                  .map((item) => (
                    <div
                      key={item.id}
                      onDoubleClick={() => {
                        if (item.type === 'folder') setSecondaryFolderId(item.id);
                        else handleOpenNode(item);
                      }}
                      className="px-3 py-2 rounded-lg bg-slate-900/70 hover:bg-slate-800 border border-slate-800/80 flex items-center justify-between text-xs cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        {renderCategoryIcon(item, 'w-5 h-5')}
                        <span className="text-slate-200 truncate">{item.name}</span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400">
                        {item.security.posix.octal}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR: RESIZABLE WINDOWS 11 'AYRINTILAR' (DETAILS) PANE */}
        {config.enableDetailsInspector && (
          <>
            {/* RIGHT SIDEBAR DRAG RESIZE HANDLE */}
            <div
              onMouseDown={(e) => startResizingSidebar('right', e)}
              className="w-1 hover:w-1.5 bg-transparent hover:bg-blue-500/60 cursor-col-resize transition-all shrink-0 hidden lg:block z-20"
              title="Ayrıntılar Bölmesini Yeniden Boyutlandır (Sürükle)"
            />

            <div
              style={{ width: `${rightSidebarWidth}px` }}
              className="bg-[#0d131f] border-l border-slate-800/90 flex flex-col justify-between shrink-0 overflow-y-auto hidden lg:flex select-none"
            >
              {/* Top 'Ayrıntılar' Header Bar matching Windows 11 screenshot */}
              <div className="px-4 pt-3.5 pb-2.5 border-b border-slate-800/80 flex items-start justify-between">
                <div className="flex items-start gap-2.5">
                  <span
                    className="material-symbols-outlined text-blue-400 mt-0.5"
                    style={{ fontSize: '20px' }}
                  >
                    info
                  </span>
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">
                      Ayrıntılar
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {selectedIds.size > 1
                        ? `${selectedIds.size} öğe seçildi`
                        : primarySelectedNode
                        ? primarySelectedNode.type === 'folder'
                          ? dict.explorer.fileFolder
                          : `${
                              primarySelectedNode.extension
                                ? primarySelectedNode.extension.slice(1).toUpperCase()
                                : 'SYSTEM'
                            } ${dict.explorer.fileSuffix}`
                        : 'Dizin Özeti'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onConfigChange?.({ enableDetailsInspector: false })}
                  className="w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
                  title="Kapat"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
                    close
                  </span>
                </button>
              </div>

              {primarySelectedNode && inspectorNodePerm ? (
                <div className="p-4 space-y-4 flex-1">
                  {/* Large Windows 11 Preview Thumbnail Box */}
                  <div className="w-full h-36 rounded-xl bg-slate-950/80 border border-slate-800/90 flex items-center justify-center p-4 shadow-inner">
                    {renderCategoryIcon(primarySelectedNode, 'w-20 h-20')}
                  </div>

                  {/* Filename & Windows 11 Action Button ('Paylaş') */}
                  <div>
                    <h4 className="text-sm font-bold text-white break-words leading-snug">
                      {primarySelectedNode.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {primarySelectedNode.type === 'folder'
                        ? dict.explorer.fileFolder
                        : primarySelectedNode.mimeType}{' '}
                      • { getWindowsLocationPath(primarySelectedNode) }
                    </p>

                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => setShareModalNode(primarySelectedNode)}
                        className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '15px' }}
                        >
                          share
                        </span>
                        <span>Paylaş</span>
                      </button>

                      <button
                        onClick={() => handleToggleLock(primarySelectedNode)}
                        className="px-2.5 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition"
                      >
                        {primarySelectedNode.security.locked ? (
                          <>
                            <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{dict.explorer.unlockBtn}</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3.5 h-3.5 text-rose-400" />
                            <span>{dict.explorer.lockBtn}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Color Tag Picker */}
                    <div className="flex items-center gap-1.5 mt-3">
                      {(['blue', 'emerald', 'amber', 'rose', 'purple', 'cyan'] as const).map(
                        (c) => (
                          <button
                            key={c}
                            onClick={() =>
                              handleSetColorTag(
                                primarySelectedNode.id,
                                primarySelectedNode.colorTag === c ? null : c
                              )
                            }
                            className={`w-4 h-4 rounded-full border transition ${
                              primarySelectedNode.colorTag === c
                                ? 'scale-125 border-white'
                                : 'border-transparent opacity-60 hover:opacity-100'
                            } ${
                              c === 'blue'
                                ? 'bg-blue-500'
                                : c === 'emerald'
                                ? 'bg-emerald-500'
                                : c === 'amber'
                                ? 'bg-amber-500'
                                : c === 'rose'
                                ? 'bg-rose-500'
                                : c === 'purple'
                                ? 'bg-purple-500'
                                : 'bg-cyan-500'
                            }`}
                            title={c}
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Windows 11 'Ayrıntılar' Metadata Rows */}
                  <div className="pt-3 border-t border-slate-800/90 space-y-2.5 text-xs">
                    <div className="font-semibold text-white">Ayrıntılar</div>

                    <div className="space-y-2 text-[11px]">
                      <div>
                        <div className="text-slate-400">Tür</div>
                        <div className="text-slate-100 font-medium">
                          {primarySelectedNode.type === 'folder'
                            ? dict.explorer.fileFolder
                            : `${
                                primarySelectedNode.extension
                                  ? primarySelectedNode.extension.slice(1).toUpperCase()
                                  : 'SYSTEM'
                              } ${dict.explorer.fileSuffix}`}
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-400">Boyut</div>
                        <div className="text-slate-100 font-mono font-medium">
                          {primarySelectedNode.type === 'folder'
                            ? QuotaEngine.formatBytes(
                                QuotaEngine.computeFolderSize(
                                  primarySelectedNode.id,
                                  allNodes
                                )
                              )
                            : QuotaEngine.formatBytes(primarySelectedNode.size)}
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-400">Dosya konumu</div>
                        <div className="text-slate-100 font-mono break-all">
                          {getWindowsLocationPath(primarySelectedNode)}
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-400">Değiştirme tarihi</div>
                        <div className="text-slate-100">
                          {new Date(primarySelectedNode.updatedAt).toLocaleString(
                            config.locale === 'en'
                              ? 'en-US'
                              : config.locale === 'de'
                              ? 'de-DE'
                              : 'tr-TR'
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-400">Sahip & POSIX</div>
                        <div className="text-slate-100 font-mono">
                          {primarySelectedNode.security.ownerName} •{' '}
                          <span className="text-blue-400">
                            {inspectorNodePerm.effectiveOctal} (
                            {inspectorNodePerm.effectiveSymbolic})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Effective Permissions Matrix for Current User */}
                  <div className="pt-3 border-t border-slate-800/90 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-white">
                        {dict.explorer.effectivePerms} ({currentUser.role.toUpperCase()})
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
                      {(
                        [
                          'read',
                          'write',
                          'delete',
                          'rename',
                          'upload',
                          'download',
                          'share',
                          'chmod',
                          'lock',
                        ] as const
                      ).map((act) => {
                        const ok = inspectorNodePerm.allowed[act];
                        return (
                          <div
                            key={act}
                            title={inspectorNodePerm.reasons[act]}
                            className={`px-1.5 py-1 rounded border flex items-center justify-between ${
                              ok
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                            }`}
                          >
                            <span>{act}</span>
                            {ok ? (
                              <CheckCircle2 className="w-3 h-3 shrink-0" />
                            ) : (
                              <XCircle className="w-3 h-3 shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Folder Specific Quota Info if present */}
                  {primarySelectedNode.security.quota?.maxBytes && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1">
                      <div className="text-[11px] font-semibold text-amber-300">
                        {dict.explorer.customFolderQuota}
                      </div>
                      <div className="text-xs font-mono text-white">
                        Limit:{' '}
                        {QuotaEngine.formatBytes(primarySelectedNode.security.quota.maxBytes)}
                      </div>
                    </div>
                  )}

                  {/* Windows 11 Bottom 'Özellikler' (Properties / ACL) Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => setSecurityModalNode(primarySelectedNode)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 text-xs font-medium flex items-center justify-center gap-2 transition"
                    >
                      <span
                        className="material-symbols-outlined text-blue-400"
                        style={{ fontSize: '16px' }}
                      >
                        tune
                      </span>
                      <span>Özellikler ({dict.explorer.aclChmodBtn})</span>
                    </button>
                  </div>

                  {/* Security Audit Stream */}
                  {config.enableAuditLog && auditLogs.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-800">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-blue-400" />{' '}
                        {dict.explorer.auditTrail}
                      </div>
                      <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                        {auditLogs.slice(0, 5).map((log) => (
                          <div
                            key={log.id}
                            className="p-1.5 rounded bg-slate-900/90 border border-slate-800/80 text-[10px]"
                          >
                            <div className="flex items-center justify-between font-mono">
                              <span
                                className={
                                  log.status === 'denied'
                                    ? 'text-rose-400 font-semibold'
                                    : 'text-emerald-400 font-semibold'
                                }
                              >
                                {log.action}
                              </span>
                              <span className="text-slate-500">{log.timestamp}</span>
                            </div>
                            <p className="text-slate-400 mt-0.5 line-clamp-1">{log.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-500 my-auto">
                  {dict.explorer.emptyInspector}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ====================================================================
          ROW 5: WINDOWS 11 STATUS BAR (Alt Bilgi Çubuğu & Görünüm Kısayolları)
      ==================================================================== */}
      {config.enableStatusBar && (
        <div className="px-3.5 py-1 bg-[#080c14] border-t border-slate-800/90 flex items-center justify-between text-[11px] text-slate-400 select-none">
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-slate-200">{visibleNodes.length}</strong>{' '}
              {dict.explorer.statusListed}
            </span>
            {selectedIds.size > 0 && (
              <>
                <span>|</span>
                <span className="text-blue-400 font-medium">
                  {selectedIds.size} {dict.explorer.statusSelected} (
                  {QuotaEngine.formatBytes(
                    selectedNodes.reduce((acc, n) => acc + n.size, 0)
                  )}
                  )
                </span>
              </>
            )}
          </div>

          {/* Right side of Windows 11 Status Bar: Free Space + Quick View Mode Icons */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-slate-400">
              {dict.explorer.statusFreeSpace}{' '}
              {QuotaEngine.formatBytes(
                Math.max(0, config.totalDiskQuotaBytes - totalUsedBytes)
              )}
            </span>
            <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded border border-slate-800">
              <button
                onClick={() => setViewMode('details')}
                className={`p-1 rounded transition ${
                  viewMode === 'details'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={dict.explorer.viewDetails}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                  table_rows
                </span>
              </button>
              <button
                onClick={() => setViewMode('large_icons')}
                className={`p-1 rounded transition ${
                  viewMode === 'large_icons'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={dict.explorer.viewLarge}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                  grid_view
                </span>
              </button>
              {config.enableWebGLAcceleration && (
                <button
                  onClick={() => setViewMode('webgl_spatial')}
                  className={`p-1 rounded transition ${
                    viewMode === 'webgl_spatial'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title={dict.explorer.webglScene}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>
                    memory
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          6. RIGHT-CLICK CONTEXT MENU (Yeni Sekmede Aç + Standart İşlemler)
      ==================================================================== */}
      {config.enableContextMenu && contextMenu && (
        <div
          style={{
            left: Math.min(contextMenu.x, window.innerWidth - 250),
            top: Math.min(contextMenu.y, window.innerHeight - 360),
          }}
          onClick={(e) => e.stopPropagation()}
          className="fixed z-50 w-60 bg-[#111827]/95 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl py-1.5 text-xs text-slate-200"
        >
          {contextMenu.node ? (
            <>
              <button
                onClick={() => {
                  handleOpenNode(contextMenu.node!);
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-2 hover:bg-blue-600/30 flex items-center justify-between"
              >
                <span className="flex items-center gap-2 font-medium">
                  <Eye className="w-3.5 h-3.5 text-blue-400" /> {dict.explorer.ctxOpen}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Enter</span>
              </button>

              {contextMenu.node.type === 'folder' && (
                <button
                  onClick={() => {
                    handleOpenNewTab(contextMenu.node!.id, 'volume');
                    setContextMenu(null);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-blue-600/20 flex items-center justify-between text-blue-300"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '16px' }}
                    >
                      tab
                    </span>
                    <span>Yeni Sekmede Aç</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Orta Tık</span>
                </button>
              )}

              {contextMenu.node.category === 'image' && (
                <button
                  onClick={() => {
                    setShaderModalNode(contextMenu.node!);
                    setContextMenu(null);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-pink-600/25 flex items-center gap-2 text-pink-300"
                >
                  <Sparkles className="w-3.5 h-3.5" /> {dict.explorer.ctxShader}
                </button>
              )}

              {contextMenu.node.type === 'archive' && (
                <button
                  onClick={() => {
                    handleExtractArchive(contextMenu.node!);
                    setContextMenu(null);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-emerald-600/25 flex items-center gap-2 text-emerald-300"
                >
                  <FileArchive className="w-3.5 h-3.5" /> {dict.explorer.ctxExtract}
                </button>
              )}

              <div className="my-1 border-t border-slate-800" />

              <button
                onClick={() => {
                  setSelectedIds(new Set([contextMenu.node!.id]));
                  handleCopyOrCut('cut');
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Scissors className="w-3.5 h-3.5 text-amber-400" /> {dict.explorer.cut}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Ctrl+X</span>
              </button>

              <button
                onClick={() => {
                  setSelectedIds(new Set([contextMenu.node!.id]));
                  handleCopyOrCut('copy');
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Copy className="w-3.5 h-3.5 text-blue-400" /> {dict.explorer.copy}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Ctrl+C</span>
              </button>

              <button
                onClick={() => {
                  setRenamingId(contextMenu.node!.id);
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Edit3 className="w-3.5 h-3.5 text-purple-400" /> {dict.explorer.rename}
                </span>
                <span className="text-[10px] font-mono text-slate-400">F2</span>
              </button>

              <button
                onClick={() => {
                  handleToggleStar(contextMenu.node!);
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2"
              >
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {contextMenu.node.starred
                    ? dict.explorer.ctxStarRemove
                    : dict.explorer.ctxStarAdd}
                </span>
              </button>

              <div className="my-1 border-t border-slate-800" />

              <button
                onClick={() => {
                  setSecurityModalNode(contextMenu.node!);
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-2 hover:bg-indigo-600/25 flex items-center justify-between text-indigo-300 font-medium"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" /> {dict.explorer.permissionsAcl}
                </span>
                <span className="text-[10px] font-mono">
                  {contextMenu.node.security.posix.octal}
                </span>
              </button>

              <button
                onClick={() => {
                  setShareModalNode(contextMenu.node!);
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-1.5 hover:bg-slate-800 flex items-center gap-2"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-400" /> {dict.explorer.ctxShare}
              </button>

              <div className="my-1 border-t border-slate-800" />

              <button
                onClick={() => {
                  setSelectedIds(new Set([contextMenu.node!.id]));
                  handleDeleteSelected(false);
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-1.5 hover:bg-rose-500/20 text-rose-300 flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Trash2 className="w-3.5 h-3.5" /> {dict.explorer.ctxDelete}
                </span>
                <span className="text-[10px] font-mono">Del</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  handleCreateFolder();
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2"
              >
                <FolderPlus className="w-3.5 h-3.5 text-blue-400" /> {dict.explorer.newFolder}
              </button>
              <button
                onClick={() => {
                  handleCreateFile();
                  setContextMenu(null);
                }}
                className="w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2"
              >
                <FilePlus className="w-3.5 h-3.5 text-emerald-400" /> {dict.explorer.newFile}
              </button>
              {clipboard.mode && (
                <button
                  onClick={() => {
                    executePaste(currentFolderId);
                    setContextMenu(null);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-emerald-600/20 text-emerald-300 flex items-center gap-2"
                >
                  <ClipboardPaste className="w-3.5 h-3.5" /> {dict.explorer.paste} (Ctrl+V)
                </button>
              )}
              {currentFolderNode && (
                <button
                  onClick={() => {
                    setSecurityModalNode(currentFolderNode);
                    setContextMenu(null);
                  }}
                  className="w-full px-3.5 py-2 hover:bg-slate-800 flex items-center gap-2 text-indigo-300"
                >
                  <Shield className="w-3.5 h-3.5" /> {dict.explorer.ctxFolderPerm}
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* ====================================================================
          7. FLOASTING TOAST NOTIFICATION
      ==================================================================== */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 max-w-md rounded-xl p-4 border shadow-2xl backdrop-blur-md flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-500/60 text-rose-100'
              : toast.type === 'info'
              ? 'bg-slate-900/95 border-blue-500/50 text-slate-100'
              : 'bg-emerald-950/95 border-emerald-500/60 text-emerald-100'
          }`}
        >
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="text-xs">
            <div className="font-bold">{toast.title}</div>
            <div className="text-slate-300 mt-0.5 leading-relaxed">{toast.message}</div>
          </div>
        </div>
      )}

      {/* ====================================================================
          8. MODALS (Security ACL/POSIX, WebGL Shader Studio, Code Editor, Share, Batch Rename, Conflicts)
      ==================================================================== */}
      {securityModalNode && (
        <SecurityPermissionsModal
          node={securityModalNode}
          allNodes={allNodes}
          currentUser={currentUser}
          config={config}
          onClose={() => setSecurityModalNode(null)}
          onSaveSecurity={handleSaveSecurity}
        />
      )}

      {shaderModalNode && (
        <WebGLImageShaderModal
          node={shaderModalNode}
          canWrite={currentFolderPerm.allowed.write}
          writeDenialReason={currentFolderPerm.reasons.write}
          onClose={() => setShaderModalNode(null)}
          onSaveAsNewFile={(newName, desc, bytes) =>
            handleCreateFile(newName, desc, bytes, 'image')
          }
        />
      )}

      {codeModalNode && (
        <CodeEditorModal
          node={codeModalNode}
          canWrite={
            PermissionEngine.evaluateNodePermissions(
              codeModalNode,
              currentUser,
              allNodes,
              config
            ).allowed.write
          }
          denialReason={
            PermissionEngine.evaluateNodePermissions(
              codeModalNode,
              currentUser,
              allNodes,
              config
            ).reasons.write
          }
          onClose={() => setCodeModalNode(null)}
          onSaveContent={(nodeId, newContent) => {
            const next = allNodes.map((n) =>
              n.id === nodeId
                ? {
                    ...n,
                    content: newContent,
                    updatedAt: new Date().toISOString(),
                  }
                : n
            );
            commitNodesUpdate(next);
            notify('success', 'Dosya İçeriği Kaydedildi', `"${codeModalNode.name}" güncellendi.`);
          }}
        />
      )}

      {shareModalNode && (
        <ShareLinkModal
          node={shareModalNode}
          onClose={() => setShareModalNode(null)}
          onSaveShareConfig={(nodeId, shareLink) => {
            const next = allNodes.map((n) =>
              n.id === nodeId ? { ...n, shareLink } : n
            );
            commitNodesUpdate(next);
            notify(
              'success',
              shareLink ? 'Paylaşım Bağlantısı Aktif' : 'Paylaşım Kaldırıldı',
              `"${shareModalNode.name}" paylaşım ayarları güncellendi.`
            );
          }}
        />
      )}

      {showBatchRename && selectedNodes.length > 0 && (
        <BatchRenameModal
          nodes={selectedNodes}
          onClose={() => setShowBatchRename(false)}
          onApplyBatchRename={(renames) => {
            const map = new Map(renames.map((r) => [r.id, r.newName]));
            const next = allNodes.map((n) =>
              map.has(n.id) ? { ...n, name: map.get(n.id)! } : n
            );
            commitNodesUpdate(next);
            notify(
              'success',
              'Toplu Adlandırma Tamamlandı',
              `${renames.length} öğe yeniden adlandırıldı.`
            );
          }}
        />
      )}

      {pendingConflicts && (
        <ConflictResolutionModal
          conflicts={pendingConflicts}
          onClose={() => setPendingConflicts(null)}
          onResolve={(strategy) =>
            executePaste(pendingConflicts[0]?.targetParentId ?? currentFolderId, strategy)
          }
        />
      )}
    </div>
  );
};

export const HyperionFileManager = FileManGL;

