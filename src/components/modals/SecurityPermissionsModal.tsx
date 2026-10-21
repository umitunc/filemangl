import React, { useState } from 'react';
import {
  AclRule,
  FileNode,
  FolderQuotaPolicy,
  IFileManagerConfig,
  NodeSecurityMetadata,
  PermissionAction,
  PosixPermissions,
  UserIdentity,
} from '../../core/contracts/types';
import {
  ALL_PERMISSION_ACTIONS,
  PermissionEngine,
} from '../../core/services/PermissionEngine';
import { DEMO_USERS } from '../../core/config/defaultConfig';
import { QuotaEngine } from '../../core/services/QuotaEngine';
import {
  Shield,
  Lock,
  Unlock,
  Terminal,
  HardDrive,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  X,
  Users,
  Layers,
} from 'lucide-react';

interface SecurityPermissionsModalProps {
  node: FileNode;
  allNodes: FileNode[];
  currentUser: UserIdentity;
  config: IFileManagerConfig;
  onClose: () => void;
  onSaveSecurity: (
    nodeId: string,
    updatedSecurity: NodeSecurityMetadata,
    applyRecursively: boolean
  ) => void;
}

const ACTION_LABELS: Record<PermissionAction, string> = {
  read: 'Okuma (Read)',
  write: 'Yazma (Write)',
  delete: 'Silme (Delete)',
  rename: 'Ad Değiştir (Rename)',
  upload: 'Yükleme (Upload)',
  download: 'İndirme (Download)',
  share: 'Paylaşım (Share)',
  chmod: 'İzin Yönetimi (Chmod)',
  lock: 'Kilitleme (Lock)',
};

export const SecurityPermissionsModal: React.FC<SecurityPermissionsModalProps> = ({
  node,
  allNodes,
  currentUser,
  config,
  onClose,
  onSaveSecurity,
}) => {
  const [activeTab, setActiveTab] = useState<'acl' | 'posix' | 'quota' | 'simulator'>('acl');

  const [security, setSecurity] = useState<NodeSecurityMetadata>(() =>
    JSON.parse(JSON.stringify(node.security))
  );
  const [applyRecursively, setApplyRecursively] = useState<boolean>(false);
  const [newRuleSubject, setNewRuleSubject] = useState<string>('role:editor');
  const [newRuleEffect, setNewRuleEffect] = useState<'allow' | 'deny'>('allow');
  const [simulatorUserId, setSimulatorUserId] = useState<string>(currentUser.id);

  const currentPerm = PermissionEngine.evaluateNodePermissions(
    node,
    currentUser,
    allNodes,
    config
  );
  const canEditSecurity = currentPerm.allowed.chmod;

  const handlePosixCheckbox = (
    target: 'owner' | 'group' | 'others',
    bit: 'r' | 'w' | 'x',
    checked: boolean
  ) => {
    const nextPosix: PosixPermissions = PermissionEngine.syncPosix({
      owner:
        target === 'owner' ? { ...security.posix.owner, [bit]: checked } : security.posix.owner,
      group:
        target === 'group' ? { ...security.posix.group, [bit]: checked } : security.posix.group,
      others:
        target === 'others'
          ? { ...security.posix.others, [bit]: checked }
          : security.posix.others,
    });
    setSecurity((prev) => ({ ...prev, posix: nextPosix }));
  };

  const handleOctalInput = (val: string) => {
    const nextPosix = PermissionEngine.buildPosixFromOctal(val);
    setSecurity((prev) => ({ ...prev, posix: nextPosix }));
  };

  const handleAddAclRule = () => {
    const [type, id] = newRuleSubject.split(':') as ['role' | 'user', string];
    const label =
      type === 'role'
        ? `Role: ${id.toUpperCase()}`
        : `User: ${DEMO_USERS.find((u) => u.id === id)?.name || id}`;

    const newRule: AclRule = {
      id: `acl_${Date.now()}`,
      subjectType: type,
      subjectId: id,
      subjectLabel: label,
      effect: newRuleEffect,
      permissions: {
        read: true,
        write: newRuleEffect === 'allow',
        delete: false,
        rename: newRuleEffect === 'allow',
        upload: newRuleEffect === 'allow',
        download: true,
        share: false,
        chmod: false,
        lock: false,
      },
    };
    setSecurity((prev) => ({
      ...prev,
      acl: [...prev.acl, newRule],
    }));
  };

  const handleToggleRulePerm = (ruleId: string, act: PermissionAction) => {
    setSecurity((prev) => ({
      ...prev,
      acl: prev.acl.map((r) =>
        r.id === ruleId
          ? { ...r, permissions: { ...r.permissions, [act]: !r.permissions[act] } }
          : r
      ),
    }));
  };

  const handleDeleteRule = (ruleId: string) => {
    setSecurity((prev) => ({
      ...prev,
      acl: prev.acl.filter((r) => r.id !== ruleId),
    }));
  };

  const quota: FolderQuotaPolicy = security.quota || {
    maxBytes: null,
    maxFileSizeBytes: null,
    allowedExtensions: [],
    blockedExtensions: [],
  };

  const updateQuota = (patch: Partial<FolderQuotaPolicy>) => {
    setSecurity((prev) => ({
      ...prev,
      quota: {
        ...quota,
        ...patch,
      },
    }));
  };

  // Simulator preview with draft security settings applied
  const simulatedNode: FileNode = { ...node, security };
  const simUser = DEMO_USERS.find((u) => u.id === simulatorUserId) || currentUser;
  const simulatedMatrix = PermissionEngine.evaluateNodePermissions(
    simulatedNode,
    simUser,
    allNodes,
    config
  );

  const folderCurrentBytes =
    node.type === 'folder' ? QuotaEngine.computeFolderSize(node.id, allNodes) : node.size;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f1623] border border-slate-700/90 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  Gelişmiş İzin & Kota Yönetimi — {node.name}
                </h2>
                <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800 text-blue-300 border border-slate-700">
                  {security.posix.octal} ({node.type === 'folder' ? 'd' : '-'}
                  {security.posix.symbolic})
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hibrit NTFS ACL + POSIX İzin Motoru • Sahip: {security.ownerName} ({security.groupName})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('acl')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${
              activeTab === 'acl'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" /> 1. ACL Rol & Kullanıcı Matrisi ({security.acl.length})
          </button>
          <button
            onClick={() => setActiveTab('posix')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${
              activeTab === 'posix'
                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" /> 2. POSIX (rwx / Octal) & Sahiplik
          </button>
          {node.type === 'folder' && (
            <button
              onClick={() => setActiveTab('quota')}
              className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${
                activeTab === 'quota'
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <HardDrive className="w-4 h-4" /> 3. Klasör Kotası & Uzantı Filtresi
            </button>
          )}
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 flex items-center gap-2 transition ${
              activeTab === 'simulator'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" /> Etkin İzin Simülatörü (Canlı Test)
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Top Bar: Lock & Inheritance Switches */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={security.inheritFromParent}
                disabled={!canEditSecurity}
                onChange={(e) =>
                  setSecurity((prev) => ({ ...prev, inheritFromParent: e.target.checked }))
                }
                className="mt-1 rounded accent-blue-500"
              />
              <div>
                <div className="text-xs font-semibold text-white">
                  Üst Klasörden İzinleri Miras Al (ACL Inheritance)
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Aktif olduğunda üst klasörlerdeki Allow/Deny kuralları bu öğeye otomatik aktarılır.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={security.locked}
                disabled={!canEditSecurity}
                onChange={(e) =>
                  setSecurity((prev) => ({
                    ...prev,
                    locked: e.target.checked,
                    lockedBy: e.target.checked ? currentUser.name : undefined,
                  }))
                }
                className="mt-1 rounded accent-rose-500"
              />
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  {security.locked ? (
                    <Lock className="w-3.5 h-3.5 text-rose-400" />
                  ) : (
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  Değiştirilemez Kilit (Immutable Write-Lock)
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Aktif olduğunda dosya/klasör silinemez, yeniden adlandırılamaz ve üzerine yazılamaz.
                </p>
              </div>
            </label>
          </div>

          {/* TAB 1: ACL RULES */}
          {activeTab === 'acl' && (
            <div className="space-y-4">
              {/* Add new ACL rule bar */}
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center gap-3">
                <span className="text-xs font-medium text-slate-300">Yeni ACL Kuralı:</span>
                <select
                  value={newRuleSubject}
                  onChange={(e) => setNewRuleSubject(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                >
                  <optgroup label="Roller (RBAC)">
                    <option value="role:admin">Role: Admin</option>
                    <option value="role:developer">Role: Developer</option>
                    <option value="role:editor">Role: Media Editor</option>
                    <option value="role:viewer">Role: Security Auditor (Viewer)</option>
                    <option value="role:guest">Role: External Guest</option>
                  </optgroup>
                  <optgroup label="Tekil Kullanıcılar">
                    {DEMO_USERS.map((u) => (
                      <option key={u.id} value={`user:${u.id}`}>
                        User: {u.name}
                      </option>
                    ))}
                  </optgroup>
                </select>

                <select
                  value={newRuleEffect}
                  onChange={(e) => setNewRuleEffect(e.target.value as 'allow' | 'deny')}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
                >
                  <option value="allow">ALLOW (Yetki Ver)</option>
                  <option value="deny">EXPLICIT DENY (Kesin Engelle)</option>
                </select>

                <button
                  disabled={!canEditSecurity}
                  onClick={handleAddAclRule}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-medium flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Kural Ekle
                </button>
              </div>

              {/* Rules Matrix Table */}
              <div className="border border-slate-800 rounded-xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400">
                      <th className="py-2.5 px-3">Özelliği / Hedef</th>
                      <th className="py-2.5 px-2">Tür</th>
                      {ALL_PERMISSION_ACTIONS.map((act) => (
                        <th key={act} className="py-2.5 px-2 text-center font-mono text-[11px]">
                          {act}
                        </th>
                      ))}
                      <th className="py-2.5 px-2 text-right">Sil</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {security.acl.length === 0 ? (
                      <tr>
                        <td colSpan={12} className="py-6 text-center text-slate-500">
                          Bu düğümde özel ACL kuralı yok. Üst klasör mirası ve POSIX ({security.posix.octal})
                          kuralları geçerlidir.
                        </td>
                      </tr>
                    ) : (
                      security.acl.map((rule) => (
                        <tr key={rule.id} className="hover:bg-slate-900/40">
                          <td className="py-2.5 px-3 font-medium text-slate-200">
                            {rule.subjectLabel}
                          </td>
                          <td className="py-2.5 px-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                                rule.effect === 'allow'
                                  ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              }`}
                            >
                              {rule.effect}
                            </span>
                          </td>
                          {ALL_PERMISSION_ACTIONS.map((act) => (
                            <td key={act} className="py-2.5 px-2 text-center">
                              <input
                                type="checkbox"
                                disabled={!canEditSecurity}
                                checked={Boolean(rule.permissions[act])}
                                onChange={() => handleToggleRulePerm(rule.id, act)}
                                className={
                                  rule.effect === 'allow' ? 'accent-emerald-500' : 'accent-rose-500'
                                }
                              />
                            </td>
                          ))}
                          <td className="py-2.5 px-2 text-right">
                            <button
                              disabled={!canEditSecurity}
                              onClick={() => handleDeleteRule(rule.id)}
                              className="p-1 text-slate-500 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: POSIX & OWNERSHIP */}
          {activeTab === 'posix' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Dosya/Klasör Sahibi (Owner)
                  </label>
                  <select
                    disabled={!canEditSecurity}
                    value={security.ownerId}
                    onChange={(e) => {
                      const u = DEMO_USERS.find((usr) => usr.id === e.target.value);
                      if (u) {
                        setSecurity((prev) => ({
                          ...prev,
                          ownerId: u.id,
                          ownerName: u.name,
                          groupName: u.group,
                        }));
                      }
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  >
                    {DEMO_USERS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.group})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Octal Kodu (Chmod)</label>
                  <input
                    type="text"
                    maxLength={4}
                    disabled={!canEditSecurity}
                    value={security.posix.octal}
                    onChange={(e) => handleOctalInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">Sembolik Gösterim</label>
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-blue-300">
                    {node.type === 'folder' ? 'd' : '-'}
                    {security.posix.symbolic}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['owner', 'group', 'others'] as const).map((tier) => (
                  <div
                    key={tier}
                    className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2.5"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {tier === 'owner'
                        ? 'Owner (Sahip)'
                        : tier === 'group'
                        ? `Group (${security.groupName})`
                        : 'Others (Diğer Herkes)'}
                    </div>
                    {(['r', 'w', 'x'] as const).map((bit) => (
                      <label key={bit} className="flex items-center gap-2 text-xs text-slate-300">
                        <input
                          type="checkbox"
                          disabled={!canEditSecurity}
                          checked={security.posix[tier][bit]}
                          onChange={(e) => handlePosixCheckbox(tier, bit, e.target.checked)}
                          className="accent-blue-500"
                        />
                        <span className="font-mono uppercase text-blue-400">{bit}</span>
                        <span>
                          {bit === 'r'
                            ? 'Read (Okuma - 4)'
                            : bit === 'w'
                            ? 'Write (Yazma - 2)'
                            : 'Execute / Traverse (1)'}
                        </span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FOLDER QUOTA & EXTENSIONS */}
          {activeTab === 'quota' && node.type === 'folder' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">
                    Bu Klasörün Mevcut Disk Kullanımı
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Alt dizinlerdeki tüm dosyaların toplam boyutu hesaplanır.
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-blue-400">
                    {QuotaEngine.formatBytes(folderCurrentBytes)}
                  </span>
                  {quota.maxBytes && (
                    <span className="text-xs text-slate-400">
                      {' '}
                      / {QuotaEngine.formatBytes(quota.maxBytes)}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Maksimum Klasör Kotası (MB, boş = Limitsiz/Ana Disk)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    placeholder="Örn: 100"
                    value={quota.maxBytes ? Math.round(quota.maxBytes / (1024 * 1024)) : ''}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      updateQuota({ maxBytes: isNaN(val) || val <= 0 ? null : val * 1024 * 1024 });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Maksimum Tekil Dosya Boyutu (MB)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={2000}
                    placeholder="Örn: 25"
                    value={
                      quota.maxFileSizeBytes
                        ? Math.round(quota.maxFileSizeBytes / (1024 * 1024))
                        : ''
                    }
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      updateQuota({
                        maxFileSizeBytes: isNaN(val) || val <= 0 ? null : val * 1024 * 1024,
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Sadece İzin Verilen Uzantılar (Virgülle, boş = Tümü)
                  </label>
                  <input
                    type="text"
                    placeholder=".pdf, .md, .png"
                    value={quota.allowedExtensions.join(', ')}
                    onChange={(e) =>
                      updateQuota({
                        allowedExtensions: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-300"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">
                    Yasaklı Uzantılar (Blocked Extensions)
                  </label>
                  <input
                    type="text"
                    placeholder=".exe, .bat, .sh"
                    value={quota.blockedExtensions.join(', ')}
                    onChange={(e) =>
                      updateQuota({
                        blockedExtensions: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-rose-300"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EFFECTIVE PERMISSIONS SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-xs text-slate-300">
                  Simüle Edilecek Kullanıcı / Rol Seçin:
                </div>
                <select
                  value={simulatorUserId}
                  onChange={(e) => setSimulatorUserId(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-medium"
                >
                  {DEMO_USERS.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — Role: {u.role.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {ALL_PERMISSION_ACTIONS.map((act) => {
                  const isOk = simulatedMatrix.allowed[act];
                  return (
                    <div
                      key={act}
                      className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                        isOk
                          ? 'bg-emerald-500/10 border-emerald-500/25'
                          : 'bg-rose-500/10 border-rose-500/25'
                      }`}
                    >
                      {isOk ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {ACTION_LABELS[act]}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          {simulatedMatrix.reasons[act]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          {node.type === 'folder' ? (
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={applyRecursively}
                onChange={(e) => setApplyRecursively(e.target.checked)}
                className="accent-blue-500"
              />
              <span>Alt klasör ve dosyalara da递归 (Recursive) olarak uygula</span>
            </label>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-slate-800"
            >
              İptal
            </button>
            <button
              disabled={!canEditSecurity}
              onClick={() => {
                onSaveSecurity(node.id, security, applyRecursively);
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-semibold text-white shadow-lg shadow-blue-600/25"
            >
              İzin ve Kota Politikalarını Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
