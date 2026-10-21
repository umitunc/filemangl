import React, { useEffect, useRef, useState } from 'react';
import {
  ClipboardState,
  FileCategory,
  FileNode,
  IFileManagerConfig,
  UserIdentity,
} from '../contracts/types';
import { QuotaEngine } from '../services/QuotaEngine';
import { useI18n } from '../i18n/I18nProvider';
import { renderCategoryIcon } from '../../components/explorer/WindowsExplorerViews';
import {
  Cpu,
  Sparkles,
  LayoutGrid,
  Layers,
  List,
  Star,
  Share2,
} from 'lucide-react';

interface WebGLSpatialViewportProps {
  nodes: FileNode[];
  allNodes: FileNode[];
  selectedIds: Set<string>;
  clipboard?: ClipboardState;
  currentUser: UserIdentity;
  config: IFileManagerConfig;
  onSelectNode: (id: string, multi: boolean, range: boolean) => void;
  onSelectMany: (ids: string[]) => void;
  onOpenNode: (node: FileNode) => void;
  onContextMenuNode: (e: React.MouseEvent, node?: FileNode) => void;
  onDropNodesIntoFolder?: (targetFolderId: string, draggedIds: string[]) => void;
  onInjectStressNodes: (count: number) => void;
  onClearStressNodes: () => void;
}

const VERTEX_SHADER_SRC = `
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
`;

const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  varying vec4 v_color;
  void main() {
    gl_FragColor = v_color;
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSource: string,
  fsSource: string
): WebGLProgram | null {
  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    return null;
  }
  return program;
}

type WinWebGLSubMode = 'large_icons' | 'tiles' | 'grouped';

interface CardRect {
  node: FileNode;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface GroupHeaderRect {
  category: FileCategory;
  label: string;
  count: number;
  y: number;
}

interface MarqueeSession {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  startClientX: number;
  startClientY: number;
  isDragging: boolean;
  additive: boolean;
  initialSelected: Set<string>;
  clickedNodeId: string | null;
  shiftKey: boolean;
}

export const WebGLSpatialViewport: React.FC<WebGLSpatialViewportProps> = ({
  nodes,
  allNodes,
  selectedIds,
  clipboard,
  config,
  onSelectNode,
  onSelectMany,
  onOpenNode,
  onContextMenuNode,
  onDropNodesIntoFolder,
  onInjectStressNodes,
  onClearStressNodes,
}) => {
  const { dict } = useI18n();
  const isLight = config.theme === 'light';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [subMode, setSubMode] = useState<WinWebGLSubMode>('large_icons');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null);
  const [fps, setFps] = useState<number>(60);
  const [scrollTop, setScrollTop] = useState<number>(0);

  const marqueeRef = useRef<MarqueeSession | null>(null);
  const [rubberBox, setRubberBox] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    count: number;
  } | null>(null);

  const [viewportSize, setViewportSize] = useState<{ width: number; height: number }>({
    width: 1000,
    height: 600,
  });

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setViewportSize({
          width: Math.max(320, Math.floor(entry.contentRect.width)),
          height: Math.max(300, Math.floor(entry.contentRect.height)),
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute exact Windows 11 Explorer layout coordinates (Large Icons, Tiles, or Grouped by Type)
  const { cardRects, groupHeaders, totalContentHeight } = React.useMemo(() => {
    const padX = 18;
    const padY = 16;
    const isTiles = subMode === 'tiles';
    const cardW = isTiles ? 256 : 144;
    const cardH = isTiles ? 68 : 124;
    const gapX = isTiles ? 12 : 12;
    const gapY = isTiles ? 10 : 12;

    const usableW = Math.max(280, viewportSize.width - padX * 2);
    const cols = Math.max(1, Math.floor((usableW + gapX) / (cardW + gapX)));
    const actualCardW = isTiles
      ? Math.min(320, Math.floor((usableW - (cols - 1) * gapX) / cols))
      : cardW;

    const rects: CardRect[] = [];
    const headers: GroupHeaderRect[] = [];

    if (subMode === 'grouped') {
      const categoryOrder: Array<{ cat: FileCategory; label: string }> = [
        { cat: 'folder', label: dict.explorer.filterFolder },
        { cat: 'image', label: dict.explorer.filterImage },
        { cat: 'code', label: dict.explorer.filterCode },
        { cat: 'document', label: dict.explorer.filterDoc },
        { cat: 'archive', label: 'ZIP / Archive' },
        { cat: 'data', label: 'JSON / Data' },
        { cat: 'video', label: 'Video' },
        { cat: 'audio', label: 'Audio' },
        { cat: 'binary', label: 'Binary' },
      ];

      let currentY = padY;
      for (const grp of categoryOrder) {
        const items = nodes.filter((n) => n.category === grp.cat);
        if (items.length === 0) continue;

        headers.push({
          category: grp.cat,
          label: grp.label,
          count: items.length,
          y: currentY,
        });
        currentY += 32;

        items.forEach((node, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          rects.push({
            node,
            x: padX + col * (actualCardW + gapX),
            y: currentY + row * (cardH + gapY),
            w: actualCardW,
            h: cardH,
          });
        });

        const rows = Math.ceil(items.length / cols);
        currentY += rows * (cardH + gapY) + 14;
      }

      return {
        cardRects: rects,
        groupHeaders: headers,
        totalContentHeight: Math.max(viewportSize.height, currentY + 24),
      };
    }

    // Standard Windows 11 Large Icons or Tiles Grid
    nodes.forEach((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      rects.push({
        node,
        x: padX + col * (actualCardW + gapX),
        y: padY + row * (cardH + gapY),
        w: actualCardW,
        h: cardH,
      });
    });

    const totalRows = Math.ceil(nodes.length / cols);
    const contentH = padY * 2 + totalRows * (cardH + gapY);

    return {
      cardRects: rects,
      groupHeaders: headers,
      totalContentHeight: Math.max(viewportSize.height, contentH),
    };
  }, [nodes, subMode, viewportSize, dict]);

  // Windows Explorer Marquee Selection (Window-level mousemove/mouseup)
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      const session = marqueeRef.current;
      const container = scrollContainerRef.current;
      if (!session || !container) return;

      const dist = Math.hypot(
        e.clientX - session.startClientX,
        e.clientY - session.startClientY
      );

      if (!session.isDragging && dist > 4) {
        session.isDragging = true;
      }
      if (!session.isDragging) return;

      const rect = container.getBoundingClientRect();
      if (e.clientY > rect.bottom - 28) {
        container.scrollTop += 18;
      } else if (e.clientY < rect.top + 28) {
        container.scrollTop -= 18;
      }

      session.currentX = Math.max(0, e.clientX - rect.left + container.scrollLeft);
      session.currentY = Math.max(0, e.clientY - rect.top + container.scrollTop);

      const minX = Math.min(session.startX, session.currentX);
      const maxX = Math.max(session.startX, session.currentX);
      const minY = Math.min(session.startY, session.currentY);
      const maxY = Math.max(session.startY, session.currentY);

      const nextSelected = new Set<string>(session.additive ? session.initialSelected : []);
      for (const r of cardRects) {
        if (r.x + r.w >= minX && r.x <= maxX && r.y + r.h >= minY && r.y <= maxY) {
          nextSelected.add(r.node.id);
        }
      }

      const arr = Array.from(nextSelected);
      onSelectMany(arr);
      setRubberBox({
        left: minX,
        top: minY,
        width: Math.max(2, maxX - minX),
        height: Math.max(2, maxY - minY),
        count: arr.length,
      });
    };

    const handleWindowMouseUp = () => {
      const session = marqueeRef.current;
      if (!session) return;

      if (!session.isDragging) {
        if (session.clickedNodeId) {
          onSelectNode(session.clickedNodeId, session.additive, session.shiftKey);
        } else if (!session.additive) {
          onSelectMany([]);
        }
      }

      marqueeRef.current = null;
      setRubberBox(null);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [cardRects, onSelectMany, onSelectNode]);

  // WebGL2 Hardware-Accelerated Card & Selection Renderer synced with native scrollTop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      (canvas.getContext('webgl2', { antialias: true }) as WebGLRenderingContext | null) ||
      (canvas.getContext('webgl', { antialias: true }) as WebGLRenderingContext | null);
    if (!gl) return;

    const program = createProgram(gl, VERTEX_SHADER_SRC, FRAGMENT_SHADER_SRC);
    if (!program) return;

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const colLoc = gl.getAttribLocation(program, 'a_color');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    const posBuffer = gl.createBuffer();
    const colBuffer = gl.createBuffer();

    let animId = 0;
    let frames = 0;
    let lastFpsTime = performance.now();

    const render = (now: number) => {
      frames++;
      if (now - lastFpsTime >= 500) {
        setFps(Math.min(120, Math.round((frames * 1000) / (now - lastFpsTime))));
        frames = 0;
        lastFpsTime = now;
      }

      const dpr = window.devicePixelRatio || 1;
      const displayW = Math.floor(viewportSize.width * dpr);
      const displayH = Math.floor(viewportSize.height * dpr);
      if (canvas.width !== displayW || canvas.height !== displayH) {
        canvas.width = displayW;
        canvas.height = displayH;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (isLight) {
        gl.clearColor(0.973, 0.98, 0.988, 1.0); // #f8fafc
      } else {
        gl.clearColor(0.043, 0.063, 0.106, 1.0); // #0b101b
      }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

      gl.useProgram(program);
      gl.uniform2f(resLoc, viewportSize.width, viewportSize.height);

      const visibleRects = cardRects.filter(
        (r) => r.y + r.h >= scrollTop - 40 && r.y <= scrollTop + viewportSize.height + 40
      );

      const positions: number[] = [];
      const colors: number[] = [];

      const pushQuad = (
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
        g: number,
        b: number,
        a: number
      ) => {
        const x1 = x;
        const y1 = y;
        const x2 = x + w;
        const y2 = y + h;
        positions.push(x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2);
        for (let i = 0; i < 6; i++) {
          colors.push(r, g, b, a);
        }
      };

      for (const rect of visibleRects) {
        const screenY = rect.y - scrollTop;
        const isCut =
          clipboard?.mode === 'cut' && clipboard.nodeIds.includes(rect.node.id);
        const isSelected = selectedIds.has(rect.node.id) && !isCut;
        const isHovered = hoveredId === rect.node.id;

        // No grid lines or card borders — only draw soft borderless fill when selected or hovered
        if (!isSelected && !isHovered) {
          continue;
        }

        if (isLight) {
          if (isSelected) {
            pushQuad(rect.x, screenY, rect.w, rect.h, 0.8, 0.91, 1.0, 0.85);
          } else if (isHovered) {
            pushQuad(rect.x, screenY, rect.w, rect.h, 0.88, 0.91, 0.94, 0.7);
          }
        } else {
          if (isSelected) {
            pushQuad(rect.x, screenY, rect.w, rect.h, 1.0, 1.0, 1.0, 0.12);
          } else if (isHovered) {
            pushQuad(rect.x, screenY, rect.w, rect.h, 1.0, 1.0, 1.0, 0.06);
          }
        }
      }

      if (positions.length > 0) {
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, colBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(colLoc);
        gl.vertexAttribPointer(colLoc, 4, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [cardRects, selectedIds, clipboard, hoveredId, viewportSize, isLight, scrollTop, subMode]);

  // Virtualized slice of visible cards in current scroll window
  const visibleOverlayCards = React.useMemo(
    () =>
      cardRects.filter(
        (r) => r.y + r.h >= scrollTop - 160 && r.y <= scrollTop + viewportSize.height + 160
      ),
    [cardRects, scrollTop, viewportSize.height]
  );

  const syntheticCount = allNodes.filter((n) => n.isSyntheticStressNode).length;
  const isTiles = subMode === 'tiles';

  return (
    <div className="flex flex-col w-full h-full overflow-hidden select-none relative">
      {/* Slim Windows 11 WebGL Sub-Header Bar (No "Galaksi", Pure Windows Views!) */}
      <div
        className={`flex-none px-3.5 py-1.5 border-b flex flex-wrap items-center justify-between gap-2 text-xs z-20 ${
          isLight
            ? 'bg-slate-100 border-slate-200 text-slate-700'
            : 'bg-[#0e1525] border-slate-800/90 text-slate-200'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-500" />
            <span className="font-mono font-bold text-emerald-500">WebGL2 • {fps} FPS</span>
            <span className="opacity-65 font-mono text-[11px]">
              ({nodes.length.toLocaleString(config.locale)} {dict.explorer.itemsUnit})
            </span>
          </div>

          <div className="h-3.5 w-px bg-slate-700/50" />

          {/* Pure Windows 11 Explorer Sub-Layouts */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setSubMode('large_icons')}
              className={`px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${
                subMode === 'large_icons'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> {dict.explorer.viewLarge.split(' (')[0]}
            </button>
            <button
              onClick={() => setSubMode('tiles')}
              className={`px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${
                subMode === 'tiles'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              <List className="w-3.5 h-3.5" /> {dict.explorer.viewTiles.split(' (')[0]}
            </button>
            <button
              onClick={() => setSubMode('grouped')}
              className={`px-2.5 py-0.5 rounded flex items-center gap-1.5 transition ${
                subMode === 'grouped'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'opacity-75 hover:opacity-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> {dict.webgl.cluster}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onInjectStressNodes(1500)}
            className="px-2.5 py-0.5 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" /> {dict.webgl.addNodes}
          </button>
          {syntheticCount > 0 && (
            <button
              onClick={onClearStressNodes}
              className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 font-medium"
            >
              {dict.webgl.clear} ({syntheticCount})
            </button>
          )}
        </div>
      </div>

      {/* Viewport Wrapper: Fixed WebGL2 Canvas + Native Scrollable Windows Explorer Layer */}
      <div className="relative flex-1 w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block pointer-events-none z-0"
        />

        <div
          ref={scrollContainerRef}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
          onMouseDown={(e) => {
            if (e.button !== 0) return;
            const targetEl = e.target as HTMLElement;
            if (targetEl.closest('button')) return;

            const container = scrollContainerRef.current;
            if (!container) return;

            const nodeCard = targetEl.closest<HTMLElement>('[data-node-id]');
            const clickedNodeId = nodeCard ? nodeCard.getAttribute('data-node-id') : null;

            // Clicking or dragging on a file/folder card must NOT start the rubber-band marquee selection
            if (clickedNodeId) {
              return;
            }

            const rect = container.getBoundingClientRect();
            const startX = e.clientX - rect.left + container.scrollLeft;
            const startY = e.clientY - rect.top + container.scrollTop;

            marqueeRef.current = {
              startX,
              startY,
              currentX: startX,
              currentY: startY,
              startClientX: e.clientX,
              startClientY: e.clientY,
              isDragging: false,
              additive: e.ctrlKey || e.metaKey,
              initialSelected: new Set(selectedIds),
              clickedNodeId: null,
              shiftKey: e.shiftKey,
            };
          }}
          onContextMenu={(e) => {
            const targetEl = e.target as HTMLElement;
            if (!targetEl.closest('[data-node-id]')) {
              e.preventDefault();
              onContextMenuNode(e, undefined);
            }
          }}
          className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden"
        >
          <div style={{ height: `${totalContentHeight}px`, position: 'relative' }}>
            {/* Group Headers (when in Windows 11 "Group by Type" mode) */}
            {groupHeaders.map((hdr) => (
              <div
                key={hdr.category}
                style={{
                  transform: `translate3d(18px, ${hdr.y}px, 0)`,
                  right: '18px',
                }}
                className="absolute top-0 left-0 flex items-center gap-2 pb-1"
              >
                <span
                  className={`text-xs font-bold ${
                    isLight ? 'text-slate-700' : 'text-slate-200'
                  }`}
                >
                  {hdr.label}
                </span>
                <span className="text-[11px] font-mono text-blue-400">({hdr.count})</span>
              </div>
            ))}

            {/* Windows 11 Explorer File & Folder Cards */}
            {visibleOverlayCards.map((rect) => {
              const isSelected = selectedIds.has(rect.node.id);
              const isCut =
                clipboard?.mode === 'cut' && clipboard.nodeIds.includes(rect.node.id);
              const itemSize =
                rect.node.type === 'folder'
                  ? QuotaEngine.computeFolderSize(rect.node.id, allNodes)
                  : rect.node.size;

              const isDragTarget = dragOverFolderId === rect.node.id;

              return (
                <div
                  key={rect.node.id}
                  data-node-id={rect.node.id}
                  draggable={config.enableDragAndDrop}
                  onMouseEnter={() => setHoveredId(rect.node.id)}
                  onMouseLeave={() =>
                    setHoveredId((prev) => (prev === rect.node.id ? null : prev))
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNode(rect.node.id, e.ctrlKey || e.metaKey, e.shiftKey);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    onOpenNode(rect.node);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onContextMenuNode(e, rect.node);
                  }}
                  onDragStart={(e) => {
                    if (!config.enableDragAndDrop) return;
                    const payload = isSelected
                      ? Array.from(selectedIds)
                      : [rect.node.id];
                    if (!isSelected) {
                      onSelectNode(rect.node.id, false, false);
                    }
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData(
                      'application/hyperion-nodes',
                      JSON.stringify(payload)
                    );
                    e.dataTransfer.setData('text/plain', JSON.stringify(payload));
                  }}
                  onDragOver={(e) => {
                    if (!config.enableDragAndDrop || rect.node.type !== 'folder') return;
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                    setDragOverFolderId(rect.node.id);
                  }}
                  onDragLeave={() => {
                    if (dragOverFolderId === rect.node.id) {
                      setDragOverFolderId(null);
                    }
                  }}
                  onDrop={(e) => {
                    if (!config.enableDragAndDrop || rect.node.type !== 'folder') return;
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOverFolderId(null);
                    try {
                      const raw =
                        e.dataTransfer.getData('application/hyperion-nodes') ||
                        e.dataTransfer.getData('text/plain');
                      if (!raw) return;
                      const ids: string[] = JSON.parse(raw);
                      if (Array.isArray(ids) && ids.length > 0 && onDropNodesIntoFolder) {
                        onDropNodesIntoFolder(rect.node.id, ids);
                      }
                    } catch {
                      // ignore malformed drop
                    }
                  }}
                  style={{
                    transform: `translate3d(${Math.round(rect.x)}px, ${Math.round(rect.y)}px, 0)`,
                    width: `${Math.round(rect.w)}px`,
                    height: `${Math.round(rect.h)}px`,
                  }}
                  className={`absolute top-0 left-0 rounded-xl overflow-hidden cursor-default transition-opacity ${
                    isTiles
                      ? 'px-3 py-2 flex items-center gap-3 text-left'
                      : 'px-2.5 py-2.5 flex flex-col items-center justify-center text-center'
                  } ${
                    isDragTarget
                      ? 'ring-2 ring-emerald-400 bg-emerald-500/20'
                      : ''
                  } ${
                    isCut
                      ? 'opacity-25 saturate-[0.3] outline-1 outline-dashed outline-amber-400/50'
                      : ''
                  }`}
                >
                  {/* Cut Scissors Indicator */}
                  {isCut && (
                    <div className="absolute top-1 left-1.5 pointer-events-none">
                      <span
                        className="material-symbols-outlined text-amber-400"
                        style={{ fontSize: '13px' }}
                      >
                        content_cut
                      </span>
                    </div>
                  )}
                  {/* Top-Right Star / Share Indicator */}
                  {(rect.node.starred || rect.node.shareLink) && (
                    <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5 pointer-events-none">
                      {rect.node.starred && (
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      )}
                      {rect.node.shareLink && (
                        <Share2 className="w-3 h-3 text-emerald-400" />
                      )}
                    </div>
                  )}

                  {/* Windows 11 Category Icon */}
                  <div className={isTiles ? 'shrink-0' : 'mb-1.5 shrink-0'}>
                    {renderCategoryIcon(
                      rect.node,
                      isTiles ? 'w-10 h-10' : 'w-11 h-11'
                    )}
                  </div>

                  {/* Filename & Size */}
                  <div className={isTiles ? 'min-w-0 flex-1' : 'w-full overflow-hidden'}>
                    <span
                      title={rect.node.name}
                      className={`w-full block text-xs font-medium leading-snug line-clamp-2 break-words [overflow-wrap:anywhere] ${
                        isSelected
                          ? isLight
                            ? 'text-blue-700 font-semibold'
                            : 'text-white font-semibold'
                          : isLight
                          ? 'text-slate-800'
                          : 'text-slate-100'
                      }`}
                    >
                      {rect.node.name}
                    </span>

                    <div
                      className={`text-[10px] mt-0.5 truncate ${
                        isLight ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      {isTiles
                        ? `${
                            rect.node.type === 'folder'
                              ? dict.explorer.fileFolder
                              : `${rect.node.extension.toUpperCase().replace('.', '')} ${
                                  dict.explorer.fileSuffix
                                }`
                          } • ${QuotaEngine.formatBytes(itemSize)}`
                        : QuotaEngine.formatBytes(itemSize)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Windows 11 Marquee Selection Box */}
            {rubberBox && (
              <div
                style={{
                  left: rubberBox.left,
                  top: rubberBox.top,
                  width: rubberBox.width,
                  height: rubberBox.height,
                }}
                className="absolute border-2 border-blue-500 bg-blue-500/20 pointer-events-none rounded-md z-30 shadow-lg"
              >
                {rubberBox.count > 0 && (
                  <span
                    style={{ color: '#ffffff' }}
                    className="absolute -top-6 left-0 px-2 py-0.5 rounded bg-blue-600 text-[10px] font-mono font-bold shadow whitespace-nowrap"
                  >
                    {rubberBox.count} {dict.explorer.selectedBadge}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
