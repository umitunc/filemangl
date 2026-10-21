import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const PermissionQuotaComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-mono mb-2">
          <span>Bölüm 05 • Zero-Trust 5 Katmanlı İzin & Kota Motoru</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          5. Hibrit İzin (NTFS ACL + POSIX) ve Klasör Kotası Motoru
        </h2>
        <p className="text-slate-300 mt-2">
          Klasik dosya yöneticilerinde yalnızca basit <code>read/write</code> bayrağı bulunurken,{' '}
          <strong>FileManGL PermissionEngine</strong> ve <strong>QuotaEngine</strong> Single
          Responsibility Principle (SRP) çerçevesinde ayrıştırılmış iki saf servis olarak 5 katmanlı
          işletim sistemi denetimi uygular:
        </p>
      </div>

      <div className="space-y-2.5">
        {[
          {
            step: 'Katman 1: Değiştirilemez Kilit (Immutable Lock)',
            desc: 'Klasör veya üst klasörlerinden biri kilitliyse (locked: true), Admin dahi olsa kilit açılana kadar yazma/silme/adlandırma işlemleri engellenir.',
          },
          {
            step: 'Katman 2: Açık Engelleme (Explicit ACL Deny)',
            desc: 'Kullanıcı veya rol için tanımlanmış bir "DENY" kuralı varsa, diğer tüm izinleri ezer (NTFS Güvenlik Standardı).',
          },
          {
            step: 'Katman 3: Açık İzin (Explicit ACL Allow) & Miras (Inheritance)',
            desc: 'inheritFromParent: true olduğu sürece üst klasörlerden gelen rol/kullanıcı bazlı 9 granüler yetki (read, write, delete, rename, upload, download, share, chmod, lock) miras alınır.',
          },
          {
            step: 'Katman 4: POSIX (Owner / Group / Others — rwx / 0755)',
            desc: 'Özel bir ACL kuralı eşleşmediğinde düğümün sahibi (Owner), grubu (Group) ve genel (Others) bitlerine göre izin hesaplanır.',
          },
          {
            step: 'Katman 5: Disk ve Klasör Kotası + Uzantı Politikası',
            desc: 'Yazma/Yükleme/Kopyalama anında hem toplam disk kotası hem de hedef klasörün özel MB kotası ve izin verilen/yasaklanan uzantıları denetlenir.',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3"
          >
            <span
              className="material-symbols-outlined text-emerald-400 shrink-0 mt-0.5"
              style={{ fontSize: '18px' }}
            >
              verified_user
            </span>
            <div>
              <div className="text-xs font-bold text-white">{item.step}</div>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <HighlightedCodeBlock
        id="perm_engine_code"
        title="src/core/services/PermissionEngine.ts & QuotaEngine.ts — İzin ve Kota Doğrulama"
        language="typescript"
        solidPrinciple="SRP"
        description="İzin hesaplaması (PermissionEngine) ve disk/klasör kota doğrulaması (QuotaEngine) tamamen bağımsız ve deterministik iki sınıf olarak çalışır."
        code={`import { PermissionEngine } from './core/services/PermissionEngine';
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
}`}
      />
    </div>
  );
};

export const PermissionQuotaDocModule: IDocModuleDefinition = {
  id: 'permission_engine',
  stepNumber: 5,
  title: '5. Hibrit ACL + POSIX + Kota Motoru',
  subtitle: '5 Katmanlı NTFS ACL, POSIX 0755, Klasör Kilidi ve MB Kota Denetimi',
  badge: 'Zero-Trust',
  routeSlug: '/documentation/permissions',
  solidFocus: ['SRP', 'OCP'],
  searchKeywords: ['acl', 'posix', '0755', 'permission', 'quota', 'lock', 'eacces', 'enospc'],
  iconName: 'shield_lock',
  iconColorClass: 'text-amber-400',
  Component: PermissionQuotaComponent,
};
