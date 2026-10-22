import React from 'react';
import { FileCategory } from '../../core/contracts/types';
import { QuotaEngine } from '../../core/services/QuotaEngine';
import { CheckCircle2, XCircle, AlertCircle, Loader2, FolderOpen } from 'lucide-react';

export type UploadQueueStatus =
  | 'queued'
  | 'uploading'
  | 'completed'
  | 'cancelled'
  | 'error';

export interface UploadQueueItem {
  id: string;
  fileName: string;
  relativePath: string;
  rootUploadedFolderName?: string;
  rootUploadedFolderId?: string;
  targetFolderId: string | null;
  targetFolderLabel: string;
  category: FileCategory;
  totalBytes: number;
  bytesTransferred: number;
  percent: number;
  status: UploadQueueStatus;
  stage: string;
  createdNodeId?: string;
  errorMessage?: string;
}

export interface UploadQueueTrayProps {
  queue: UploadQueueItem[];
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onCloseTray: () => void;
  onClearCompleted: () => void;
  onCancelItem: (id: string) => void;
  onCancelAll: () => void;
  onLocateNode: (folderId: string | null, nodeId?: string) => void;
}

export const UploadQueueTray: React.FC<UploadQueueTrayProps> = ({
  queue,
  isMinimized,
  onToggleMinimize,
  onCloseTray,
  onClearCompleted,
  onCancelItem,
  onCancelAll,
  onLocateNode,
}) => {
  if (queue.length === 0) return null;

  const activeItems = queue.filter(
    (q) => q.status === 'uploading' || q.status === 'queued'
  );
  const completedItems = queue.filter((q) => q.status === 'completed');
  const errorItems = queue.filter(
    (q) => q.status === 'error' || q.status === 'cancelled'
  );
  const isUploading = activeItems.length > 0;

  const totalBytes = queue.reduce((acc, q) => acc + Math.max(1, q.totalBytes), 0);
  const transferredBytes = queue.reduce((acc, q) => acc + q.bytesTransferred, 0);
  const overallPercent =
    queue.length > 0
      ? Math.min(
          100,
          Math.round(
            queue.reduce((acc, q) => acc + q.percent, 0) / Math.max(1, queue.length)
          )
        )
      : 0;

  // Group folder uploads if any items belong to a rootUploadedFolderName
  const uploadedFoldersMap = new Map<
    string,
    {
      folderName: string;
      folderId?: string;
      total: number;
      completed: number;
      percent: number;
    }
  >();

  for (const item of queue) {
    if (item.rootUploadedFolderName) {
      const existing = uploadedFoldersMap.get(item.rootUploadedFolderName) || {
        folderName: item.rootUploadedFolderName,
        folderId: item.rootUploadedFolderId,
        total: 0,
        completed: 0,
        percent: 0,
      };
      existing.total += 1;
      if (item.status === 'completed') existing.completed += 1;
      if (item.rootUploadedFolderId) existing.folderId = item.rootUploadedFolderId;
      existing.percent += item.percent;
      uploadedFoldersMap.set(item.rootUploadedFolderName, existing);
    }
  }

  const uploadedFolders = Array.from(uploadedFoldersMap.values()).map((f) => ({
    ...f,
    percent: Math.round(f.percent / Math.max(1, f.total)),
  }));

  const getCategorySymbol = (cat: FileCategory) => {
    switch (cat) {
      case 'video':
        return { icon: 'movie', color: 'text-purple-400' };
      case 'image':
        return { icon: 'image', color: 'text-pink-400' };
      case 'audio':
        return { icon: 'audio_file', color: 'text-amber-400' };
      case 'code':
        return { icon: 'code', color: 'text-emerald-400' };
      case 'archive':
        return { icon: 'folder_zip', color: 'text-amber-400' };
      case 'data':
        return { icon: 'database', color: 'text-cyan-400' };
      case 'folder':
        return { icon: 'folder', color: 'text-amber-400' };
      default:
        return { icon: 'description', color: 'text-blue-400' };
    }
  };

  return (
    <div
      data-testid="upload-queue-tray"
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-4 right-3 sm:right-6 left-3 sm:left-auto z-50 sm:w-[390px] rounded-2xl bg-[#0d1424]/95 border border-slate-700/90 shadow-2xl backdrop-blur-xl overflow-hidden select-none"
    >
      {/* Google Drive Style Top Header */}
      <div className="px-3.5 py-2.5 bg-[#111a2e] border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {isUploading ? (
            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
          ) : errorItems.length > 0 && completedItems.length === 0 ? (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">
              {isUploading
                ? `${activeItems.length} öğe yükleniyor (%${overallPercent})`
                : `${completedItems.length} yükleme tamamlandı`}
            </div>
            <div className="text-[10px] font-mono text-slate-400 truncate">
              {QuotaEngine.formatBytes(transferredBytes)} /{' '}
              {QuotaEngine.formatBytes(totalBytes)} • Kuyruk: {queue.length} dosya
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {isUploading && (
            <button
              onClick={onCancelAll}
              className="px-2 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-[10px] font-semibold text-rose-300 transition"
              title="Tüm Yüklemeleri İptal Et"
            >
              İptal
            </button>
          )}
          {!isUploading && completedItems.length > 0 && (
            <button
              onClick={onClearCompleted}
              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-medium text-slate-300 transition"
              title="Tamamlananları Temizle"
            >
              Temizle
            </button>
          )}
          <button
            onClick={onToggleMinimize}
            className="w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition"
            title={isMinimized ? 'Kuyruğu Genişlet' : 'Kuyruğu Küçült'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
              {isMinimized ? 'expand_less' : 'expand_more'}
            </span>
          </button>
          <button
            onClick={onCloseTray}
            className="w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
            title="Yükleme Kuyruğunu Kapat"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>
              close
            </span>
          </button>
        </div>
      </div>

      {/* Master 0-100% Overall Progress Bar */}
      <div className="w-full h-1.5 bg-slate-900 overflow-hidden">
        <div
          className={`h-full transition-all duration-150 ${
            isUploading
              ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400'
              : 'bg-emerald-500'
          }`}
          style={{ width: `${overallPercent}%` }}
        />
      </div>

      {/* Expandable Body */}
      {!isMinimized && (
        <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/70">
          {/* Folder Upload Group Summary Row (Google Drive Folder Upload style) */}
          {uploadedFolders.map((fld) => (
            <div
              key={fld.folderName}
              className="px-3.5 py-2.5 bg-amber-500/10 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="material-symbols-outlined ms-filled text-amber-400 shrink-0"
                  style={{ fontSize: '20px' }}
                >
                  folder
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-amber-200 truncate">
                    {fld.folderName} (Klasör Yüklemesi)
                  </div>
                  <div className="text-[10px] font-mono text-amber-300/80">
                    {fld.completed}/{fld.total} dosya aktarıldı • %{fld.percent}
                  </div>
                </div>
              </div>

              {fld.folderId && (
                <button
                  onClick={() => onLocateNode(fld.folderId!)}
                  className="px-2 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-[10px] font-semibold flex items-center gap-1 shrink-0 transition"
                  title="Yüklenen Klasörü Aç"
                >
                  <FolderOpen className="w-3 h-3" />
                  <span>Klasörü Aç</span>
                </button>
              )}
            </div>
          ))}

          {/* Individual File Upload Queue Rows with 0-100% Progress */}
          {queue.map((item) => {
            const sym = getCategorySymbol(item.category);
            return (
              <div
                key={item.id}
                className="px-3.5 py-2.5 hover:bg-slate-900/60 transition space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span
                      className={`material-symbols-outlined shrink-0 ${sym.color}`}
                      style={{ fontSize: '18px' }}
                    >
                      {sym.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-xs font-semibold text-slate-100 truncate"
                          title={item.relativePath}
                        >
                          {item.fileName}
                        </span>
                        {item.relativePath !== item.fileName && (
                          <span
                            className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 truncate max-w-[110px]"
                            title={item.relativePath}
                          >
                            {item.relativePath}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 truncate">
                        <span>{item.stage}</span>
                        <span>•</span>
                        <span>
                          {QuotaEngine.formatBytes(item.bytesTransferred)} /{' '}
                          {QuotaEngine.formatBytes(item.totalBytes)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Status / Percent / Action */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      data-testid={`upload-percent-${item.fileName}`}
                      className={`text-[11px] font-mono font-bold ${
                        item.status === 'completed'
                          ? 'text-emerald-400'
                          : item.status === 'error' || item.status === 'cancelled'
                          ? 'text-rose-400'
                          : 'text-cyan-400'
                      }`}
                    >
                      %{item.percent}
                    </span>

                    {(item.status === 'uploading' || item.status === 'queued') && (
                      <button
                        onClick={() => onCancelItem(item.id)}
                        className="w-5 h-5 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 flex items-center justify-center transition"
                        title="Bu Yüklemeyi İptal Et"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: '14px' }}
                        >
                          close
                        </span>
                      </button>
                    )}

                    {item.status === 'completed' && (
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <button
                          onClick={() =>
                            onLocateNode(item.targetFolderId, item.createdNodeId)
                          }
                          className="w-6 h-6 rounded hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition"
                          title={`Hedef Konumda Göster (${item.targetFolderLabel})`}
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {(item.status === 'error' || item.status === 'cancelled') && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </div>
                </div>

                {/* Per-File 0-100% Progress Bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800/80">
                  <div
                    className={`h-full transition-all duration-150 ${
                      item.status === 'completed'
                        ? 'bg-emerald-500'
                        : item.status === 'error' || item.status === 'cancelled'
                        ? 'bg-rose-500'
                        : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400'
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
