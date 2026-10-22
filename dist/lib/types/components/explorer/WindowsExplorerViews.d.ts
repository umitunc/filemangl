import React from 'react';
import { ClipboardState, ExplorerViewMode, FileNode, IFileManagerConfig, SortDirection, SortField, UserIdentity } from '../../core/contracts/types';
export type ExplorerGroupBy = 'none' | 'date' | 'category';
interface WindowsExplorerViewsProps {
    nodes: FileNode[];
    allNodes: FileNode[];
    viewMode: ExplorerViewMode;
    groupBy?: ExplorerGroupBy;
    selectedIds: Set<string>;
    clipboard: ClipboardState;
    renamingId: string | null;
    sortField: SortField;
    sortDirection: SortDirection;
    currentUser: UserIdentity;
    config: IFileManagerConfig;
    onSelectNode: (id: string, multi: boolean, range: boolean) => void;
    onSelectMany: (ids: string[]) => void;
    onOpenNode: (node: FileNode) => void;
    onContextMenuNode: (e: React.MouseEvent, node?: FileNode) => void;
    onCommitRename: (id: string, newName: string) => void;
    onCancelRename: () => void;
    onSortChange: (field: SortField) => void;
    onDropNodesIntoFolder: (targetFolderId: string, draggedIds: string[]) => void;
    onExternalFilesDropped?: (files: FileList | File[], targetFolderId?: string | null) => void;
}
/**
 * Renders authentic Windows 11 File Explorer SVG icons & thumbnails
 * (matching Windows 11 23H2/24H2 yellow folders, folded-corner sheets with type badges, zipper folders, etc.)
 */
export declare function renderCategoryIcon(node: FileNode, sizeClass?: string): React.ReactNode;
export declare const WindowsExplorerViews: React.FC<WindowsExplorerViewsProps>;
export {};
//# sourceMappingURL=WindowsExplorerViews.d.ts.map