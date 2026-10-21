import React, { useMemo, useRef, useState } from 'react';
import {
  ConflictItem,
  ConflictResolutionStrategy,
  FileNode,
  ShareLinkConfig,
} from '../../core/contracts/types';
import { QuotaEngine } from '../../core/services/QuotaEngine';
import { SupportedCodeLang } from '../docs/contracts/docTypes';
import { SyntaxHighlighterEngine } from '../docs/syntax/SyntaxHighlighterEngine';
import {
  X,
  Save,
  Code2,
  Share2,
  Copy,
  Check,
  AlertTriangle,
  FileSignature,
  Lock,
} from 'lucide-react';

function resolveCodeLanguage(node: FileNode): SupportedCodeLang {
  const ext = (node.extension || '').toLowerCase();
  if (ext === '.php') return 'php';
  if (ext === '.json') return 'json';
  if (ext === '.glsl' || ext === '.frag' || ext === '.vert') return 'glsl';
  if (ext === '.sh' || ext === '.bash') return 'bash';
  if (ext === '.tsx' || ext === '.jsx') return 'tsx';
  return 'typescript';
}

function buildDefaultRichCodeContent(node: FileNode): string {
  const raw = node.content || '';
  if (raw && !raw.startsWith('// High-Speed Demo Node #')) {
    return raw;
  }

  const ext = (node.extension || '').toLowerCase();
  if (ext === '.php') {
    return `<?php

namespace App\\Http\\Controllers\\FileManGL;

use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;
use App\\Services\\FileManGLDiskGovernanceService;

/**
 * ${node.name} — SOLID Disk & ACL Governance Controller
 * POSIX Mode: ${node.security.posix.octal} (${node.security.posix.symbolic})
 */
class ${node.name.replace(/\.[^/.]+$/, '')}
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
            'nodeId' => '${node.id}',
            'command' => $cmd,
            'resolvedPath' => $safePath,
            'octal' => '${node.security.posix.octal}',
        ]);
    }
}
`;
  }

  if (ext === '.json') {
    return JSON.stringify(
      {
        nodeId: node.id,
        fileName: node.name,
        engine: 'FileManGL v1.0.4 SOLID + WebGL2',
        security: {
          owner: node.security.ownerName,
          group: node.security.groupName,
          posixOctal: node.security.posix.octal,
          posixSymbolic: node.security.posix.symbolic,
          locked: node.security.locked,
        },
        checksumSha256: node.checksumSha256,
      },
      null,
      2
    );
  }

  return `// ${node.name} — FileManGL v1.0.4 SOLID Module
// Owner: ${node.security.ownerName} • POSIX: ${node.security.posix.octal} (${node.security.posix.symbolic})

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
  const octal = PermissionEngine.buildPosixFromOctal('${node.security.posix.octal}');
  return {
    id: '${node.id}',
    name: node.name || '${node.name}',
    sizeBytes: ${node.size},
    verified: octal.owner.r && config.strictPermissionEnforcement,
  };
}
`;
}

// ============================================================================
// 1. BUILT-IN SYNTAX-HIGHLIGHTED CODE & DOCUMENT EDITOR MODAL
// ============================================================================
interface CodeEditorModalProps {
  node: FileNode;
  canWrite: boolean;
  denialReason?: string;
  onClose: () => void;
  onSaveContent: (nodeId: string, newContent: string) => void;
}

export const CodeEditorModal: React.FC<CodeEditorModalProps> = ({
  node,
  canWrite,
  denialReason,
  onClose,
  onSaveContent,
}) => {
  const language = useMemo(() => resolveCodeLanguage(node), [node]);
  const [content, setContent] = useState<string>(() =>
    buildDefaultRichCodeContent(node)
  );
  const [copied, setCopied] = useState(false);

  const lineGutterRef = useRef<HTMLDivElement | null>(null);
  const highlightPreRef = useRef<HTMLPreElement | null>(null);

  const tokenizedLines = useMemo(
    () => SyntaxHighlighterEngine.tokenizeCode(content, language),
    [content, language]
  );

  const handleEditorScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const top = e.currentTarget.scrollTop;
    const left = e.currentTarget.scrollLeft;
    if (lineGutterRef.current) {
      lineGutterRef.current.scrollTop = top;
    }
    if (highlightPreRef.current) {
      highlightPreRef.current.scrollTop = top;
      highlightPreRef.current.scrollLeft = left;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#090d16] border border-slate-700/90 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col h-[82vh]">
        {/* Top IDE Header */}
        <div className="px-5 py-3.5 bg-[#0c1220] border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-emerald-500/15 border border-cyan-500/30 text-[#2FF58E] shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-bold text-white truncate">{node.name}</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  {language}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300">
                  {node.security.posix.octal}
                </span>
                {!canWrite && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> SALT OKUNUR (Read-Only)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {tokenizedLines.length} satır • {content.length} karakter •{' '}
                {QuotaEngine.formatBytes(node.size)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                navigator.clipboard.writeText(content);
                setCopied(true);
                setTimeout(() => setCopied(false), 1800);
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Kopyalandı</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!canWrite && denialReason && (
          <div className="px-5 py-2 bg-rose-950/60 border-b border-rose-800/50 text-xs text-rose-200 flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span>{denialReason}</span>
          </div>
        )}

        {/* Syntax-Highlighted Dual-Layer Code Viewport (Colorized Pre + Transparent Caret Textarea) */}
        <div className="code-surface-dark flex-1 flex overflow-hidden font-mono text-xs bg-[#060911] relative">
          {/* Synchronized Line Numbers Gutter */}
          <div
            ref={lineGutterRef}
            className="py-4 px-3.5 bg-[#080c15] text-slate-600 text-right select-none border-r border-slate-800/80 overflow-hidden shrink-0"
          >
            {tokenizedLines.map((_, idx) => (
              <div key={idx} className="leading-6">
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Main Code Canvas with Live Syntax Highlighting */}
          <div className="relative flex-1 h-full overflow-hidden">
            {/* Underlay: Colorized Syntax Tokens */}
            <pre
              ref={highlightPreRef}
              aria-hidden="true"
              className="absolute inset-0 m-0 p-4 font-mono text-xs leading-6 whitespace-pre overflow-hidden pointer-events-none select-none"
            >
              {tokenizedLines.map((tokens, lineIdx) => (
                <div key={lineIdx} className="leading-6 min-h-[24px]">
                  {tokens.map((tok, tokIdx) => (
                    <span
                      key={tokIdx}
                      data-token-type={tok.type}
                      className={SyntaxHighlighterEngine.getTokenClassName(
                        tok.type
                      )}
                    >
                      {tok.value}
                    </span>
                  ))}
                </div>
              ))}
            </pre>

            {/* Overlay: Interactive Editable Textarea with Emerald Caret */}
            <textarea
              value={content}
              readOnly={!canWrite}
              onChange={(e) => setContent(e.target.value)}
              onScroll={handleEditorScroll}
              spellCheck={false}
              className="absolute inset-0 w-full h-full p-4 bg-transparent text-transparent caret-[#2FF58E] selection:bg-cyan-500/30 font-mono text-xs leading-6 focus:outline-none resize-none whitespace-pre overflow-auto"
            />
          </div>
        </div>

        {/* Bottom Status & Save Bar */}
        <div className="px-5 py-3 bg-[#0c1220] border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            UTF-8 • Syntax: {language.toUpperCase()} • SHA-256:{' '}
            {node.checksumSha256.slice(0, 24)}...
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
            >
              Kapat
            </button>
            <button
              disabled={!canWrite}
              onClick={() => {
                onSaveContent(node.id, content);
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-semibold text-white flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" /> Kaydet (Ctrl+S)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 2. BATCH RENAME MODAL
// ============================================================================
interface BatchRenameModalProps {
  nodes: FileNode[];
  onClose: () => void;
  onApplyBatchRename: (renames: Array<{ id: string; newName: string }>) => void;
}

export const BatchRenameModal: React.FC<BatchRenameModalProps> = ({
  nodes,
  onClose,
  onApplyBatchRename,
}) => {
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [findText, setFindText] = useState<string>('');
  const [replaceText, setReplaceText] = useState<string>('');
  const [addCounter, setAddCounter] = useState<boolean>(true);

  const previews = nodes.map((n, index) => {
    const ext = n.type === 'folder' ? '' : n.extension;
    let base = ext ? n.name.slice(0, -ext.length) : n.name;
    if (findText) {
      base = base.split(findText).join(replaceText);
    }
    const counterPart = addCounter ? `_${String(index + 1).padStart(2, '0')}` : '';
    const newName = `${prefix}${base}${suffix}${counterPart}${ext}`;
    return { id: n.id, oldName: n.name, newName };
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f1623] border border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl">
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileSignature className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-white">
              Toplu Yeniden Adlandırma (Batch Rename — {nodes.length} Öğe)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Ön Ek (Prefix)</label>
              <input
                type="text"
                placeholder="örn: prod_"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Son Ek (Suffix)</label>
              <input
                type="text"
                placeholder="örn: _v2"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Metin Bul</label>
              <input
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Şununla Değiştir</label>
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={addCounter}
              onChange={(e) => setAddCounter(e.target.checked)}
              className="accent-blue-500"
            />
            <span>Otomatik Sıra Numarası Ekle (_01, _02, ...)</span>
          </label>

          <div className="border border-slate-800 rounded-xl max-h-52 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3">Mevcut Ad</th>
                  <th className="py-2 px-3">Yeni Ad (Önizleme)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {previews.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-3 text-slate-400 truncate max-w-[220px]">
                      {item.oldName}
                    </td>
                    <td className="py-2 px-3 text-emerald-400 font-semibold truncate max-w-[220px]">
                      {item.newName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300"
          >
            İptal
          </button>
          <button
            onClick={() => {
              onApplyBatchRename(previews.map((p) => ({ id: p.id, newName: p.newName })));
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white"
          >
            Tümünü Yeniden Adlandır
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 3. SHARE LINK GENERATOR MODAL
// ============================================================================
interface ShareLinkModalProps {
  node: FileNode;
  onClose: () => void;
  onSaveShareConfig: (nodeId: string, config: ShareLinkConfig | undefined) => void;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  node,
  onClose,
  onSaveShareConfig,
}) => {
  const [copied, setCopied] = useState(false);
  const [passwordProtected, setPasswordProtected] = useState(
    node.shareLink?.passwordProtected || false
  );
  const [password, setPassword] = useState(node.shareLink?.password || '');
  const [maxDownloads, setMaxDownloads] = useState<string>(
    node.shareLink?.maxDownloads ? String(node.shareLink.maxDownloads) : '100'
  );

  const token = node.shareLink?.token || `sh_${node.id.slice(-6)}_${Date.now().toString(36)}`;
  const url = `https://cdn.hyperion-fm.dev/s/${token}`;

  const handleSave = () => {
    onSaveShareConfig(node.id, {
      token,
      url,
      createdAt: new Date().toISOString(),
      expiresAt: '2026-12-31T23:59:59Z',
      passwordProtected,
      password: passwordProtected ? password : undefined,
      allowDownload: true,
      maxDownloads: parseInt(maxDownloads, 10) || null,
      downloadsCount: node.shareLink?.downloadsCount || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f1623] border border-slate-700 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Share2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Paylaşım Bağlantısı — {node.name}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Genel Erişim URL'si</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-emerald-400"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1800);
                }}
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white flex items-center gap-1"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Kopyalandı' : 'Kopyala'}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={passwordProtected}
              onChange={(e) => setPasswordProtected(e.target.checked)}
              className="accent-blue-500"
            />
            <span>Parola Koruması Zorunlu Olsun (AES-256 Token)</span>
          </label>

          {passwordProtected && (
            <input
              type="password"
              placeholder="Paylaşım parolası girin..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          )}

          <div>
            <label className="block text-xs text-slate-400 mb-1">Maksimum İndirme Limiti</label>
            <input
              type="number"
              value={maxDownloads}
              onChange={(e) => setMaxDownloads(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="px-5 py-3.5 bg-slate-900 border-t border-slate-800 flex justify-between">
          {node.shareLink ? (
            <button
              onClick={() => {
                onSaveShareConfig(node.id, undefined);
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 text-xs hover:bg-rose-500/25"
            >
              Paylaşımı Kaldır
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300"
            >
              İptal
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white"
            >
              Bağlantıyı Etkinleştir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// 4. PASTE CONFLICT RESOLUTION MODAL
// ============================================================================
interface ConflictResolutionModalProps {
  conflicts: ConflictItem[];
  onClose: () => void;
  onResolve: (strategy: ConflictResolutionStrategy) => void;
}

export const ConflictResolutionModal: React.FC<ConflictResolutionModalProps> = ({
  conflicts,
  onClose,
  onResolve,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0f1623] border border-amber-500/40 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl">
        <div className="px-5 py-4 bg-slate-900 border-b border-slate-800 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">
            Hedef Klasörde Dosya Çakışması ({conflicts.length} Öğe)
          </h3>
        </div>

        <div className="p-5 space-y-3 text-xs text-slate-300">
          <p>
            Hedef dizinde aynı isme sahip{' '}
            <strong className="text-white">
              "{conflicts[0]?.sourceNode.name}"
            </strong>{' '}
            {conflicts.length > 1 ? `ve ${conflicts.length - 1} diğer öğe ` : ''}zaten mevcut.
            Nasıl devam etmek istiyorsunuz?
          </p>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onResolve('replace')}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-blue-600/20 border border-slate-700 hover:border-blue-500/50 text-left transition"
            >
              <div className="font-semibold text-white">Hedefteki Dosyaların Üzerine Yaz (Replace)</div>
              <div className="text-[11px] text-slate-400">
                Mevcut dosyalar yeni kopyalanan sürümlerle değiştirilir.
              </div>
            </button>

            <button
              onClick={() => onResolve('keep_both')}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-emerald-600/20 border border-slate-700 hover:border-emerald-500/50 text-left transition"
            >
              <div className="font-semibold text-white">
                Her İki Dosyayı da Tut (Keep Both — "_kopya" Ekle)
              </div>
              <div className="text-[11px] text-slate-400">
                Hiçbir veri silinmez; yeni öğeler otomatik numaralandırılarak yapıştırılır.
              </div>
            </button>

            <button
              onClick={() => onResolve('skip')}
              className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition"
            >
              <div className="font-semibold text-white">Çakışan Dosyaları Atla (Skip)</div>
              <div className="text-[11px] text-slate-400">
                Yalnızca çakışmayan dosyalar aktarılır.
              </div>
            </button>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300"
          >
            İşlemi İptal Et
          </button>
        </div>
      </div>
    </div>
  );
};
