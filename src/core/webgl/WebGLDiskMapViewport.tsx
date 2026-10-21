import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FileCategory, FileNode, IFileManagerConfig, UserIdentity } from '../contracts/types';
import { QuotaEngine } from '../services/QuotaEngine';
import { HardDrive, Lock, Layers, FolderTree } from 'lucide-react';

interface WebGLDiskMapViewportProps {
  allNodes: FileNode[];
  currentFolderId: string | null;
  selectedIds: Set<string>;
  currentUser: UserIdentity;
  config: IFileManagerConfig;
  onSelectNode: (id: string, multi: boolean, range: boolean) => void;
  onOpenNode: (node: FileNode) => void;
}

interface TreemapBlock {
  node: FileNode;
  bytes: number;
  itemCount?: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

const CATEGORY_RGB_DARK: Record<FileCategory, [number, number, number]> = {
  folder: [0.92, 0.58, 0.12],
  image: [0.88, 0.29, 0.58],
  code: [0.23, 0.51, 0.96],
  document: [0.06, 0.72, 0.51],
  archive: [0.95, 0.45, 0.12],
  video: [0.55, 0.36, 0.96],
  data: [0.04, 0.68, 0.82],
  audio: [0.88, 0.66, 0.05],
  binary: [0.42, 0.48, 0.58],
};

const CATEGORY_RGB_LIGHT: Record<FileCategory, [number, number, number]> = {
  folder: [0.96, 0.66, 0.18],
  image: [0.93, 0.36, 0.64],
  code: [0.26, 0.56, 0.98],
  document: [0.10, 0.76, 0.56],
  archive: [0.97, 0.52, 0.18],
  video: [0.60, 0.42, 0.97],
  data: [0.08, 0.72, 0.86],
  audio: [0.93, 0.72, 0.12],
  binary: [0.50, 0.56, 0.66],
};

const TREEMAP_VS = `
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
`;

const TREEMAP_FS = `
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
`;

export const WebGLDiskMapViewport: React.FC<WebGLDiskMapViewportProps> = ({
  allNodes,
  currentFolderId,
  selectedIds,
  config,
  onSelectNode,
  onOpenNode,
}) => {
  const isLight = config.theme === 'light';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredBlock, setHoveredBlock] = useState<TreemapBlock | null>(null);
  const [groupMode, setGroupMode] = useState<'smart_hierarchy' | 'all_files'>('smart_hierarchy');
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 960, height: 520 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setSize({
          width: Math.max(320, Math.floor(e.contentRect.width)),
          height: Math.max(260, Math.floor(e.contentRect.height)),
        });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Build proportional Treemap items (either current folder children with recursive sizes, or top individual files)
  const blocks = useMemo<TreemapBlock[]>(() => {
    let entries: Array<{ node: FileNode; bytes: number }> = [];

    if (groupMode === 'smart_hierarchy') {
      // Show direct children of currentFolderId (folders with their recursive size + files in current folder)
      const directChildren = allNodes.filter(
        (n) => !n.trashed && n.parentId === currentFolderId
      );
      entries = directChildren
        .map((n) => ({
          node: n,
          bytes:
            n.type === 'folder'
              ? Math.max(512 * 1024, QuotaEngine.computeFolderSize(n.id, allNodes))
              : n.size,
        }))
        .filter((e) => e.bytes > 0)
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 180);
    } else {
      const activeFiles = allNodes.filter((n) => !n.trashed && n.type !== 'folder' && n.size > 0);
      entries = activeFiles
        .map((n) => ({ node: n, bytes: n.size }))
        .sort((a, b) => b.bytes - a.bytes)
        .slice(0, 260);
    }

    if (entries.length === 0) return [];

    const result: TreemapBlock[] = [];
    const pad = isLight ? 4 : 3;

    const partition = (
      items: Array<{ node: FileNode; bytes: number }>,
      x: number,
      y: number,
      w: number,
      h: number,
      horizontal: boolean
    ) => {
      if (items.length === 0 || w <= 6 || h <= 6) return;
      if (items.length === 1) {
        result.push({
          node: items[0].node,
          bytes: items[0].bytes,
          x: x + pad,
          y: y + pad,
          w: Math.max(4, w - pad * 2),
          h: Math.max(4, h - pad * 2),
        });
        return;
      }

      const total = items.reduce((s, n) => s + n.bytes, 0);
      let acc = 0;
      let splitIdx = 0;
      for (let i = 0; i < items.length; i++) {
        acc += items[i].bytes;
        if (acc >= total / 2) {
          splitIdx = Math.max(1, i + 1);
          break;
        }
      }
      if (splitIdx >= items.length) splitIdx = items.length - 1;

      const leftItems = items.slice(0, splitIdx);
      const rightItems = items.slice(splitIdx);
      const leftSum = leftItems.reduce((s, n) => s + n.bytes, 0);
      const ratio = total > 0 ? leftSum / total : 0.5;

      if (horizontal) {
        const w1 = w * ratio;
        partition(leftItems, x, y, w1, h, !horizontal);
        partition(rightItems, x + w1, y, w - w1, h, !horizontal);
      } else {
        const h1 = h * ratio;
        partition(leftItems, x, y, w, h1, !horizontal);
        partition(rightItems, x, y + h1, w, h - h1, !horizontal);
      }
    };

    partition(entries, 12, 12, size.width - 24, size.height - 24, size.width >= size.height);
    return result;
  }, [allNodes, currentFolderId, groupMode, size.width, size.height, isLight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { antialias: true, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, TREEMAP_VS);
    const fs = compile(gl.FRAGMENT_SHADER, TREEMAP_FS);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    const uvLoc = gl.getAttribLocation(prog, 'a_uv');
    const colLoc = gl.getAttribLocation(prog, 'a_color');
    const hiLoc = gl.getAttribLocation(prog, 'a_highlight');
    const resLoc = gl.getUniformLocation(prog, 'u_resolution');
    const timeLoc = gl.getUniformLocation(prog, 'u_time');
    const isLightLoc = gl.getUniformLocation(prog, 'u_isLight');

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);

    const stride = 8 * 4;
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, stride, 0);
    gl.enableVertexAttribArray(uvLoc);
    gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, stride, 2 * 4);
    gl.enableVertexAttribArray(colLoc);
    gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, stride, 4 * 4);
    gl.enableVertexAttribArray(hiLoc);
    gl.vertexAttribPointer(hiLoc, 1, gl.FLOAT, false, stride, 7 * 4);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let raf = 0;
    const draw = (now: number) => {
      const dpr = window.devicePixelRatio || 1;
      const dw = Math.floor(size.width * dpr);
      const dh = Math.floor(size.height * dpr);
      if (canvas.width !== dw || canvas.height !== dh) {
        canvas.width = dw;
        canvas.height = dh;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (isLight) {
        gl.clearColor(0.945, 0.961, 0.976, 1.0); // Clean slate-100 light background
      } else {
        gl.clearColor(0.04, 0.06, 0.095, 1.0);
      }
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(resLoc, size.width, size.height);
      gl.uniform1f(timeLoc, now * 0.001);
      gl.uniform1f(isLightLoc, isLight ? 1.0 : 0.0);

      if (blocks.length > 0) {
        const paletteMap = isLight ? CATEGORY_RGB_LIGHT : CATEGORY_RGB_DARK;
        const data = new Float32Array(blocks.length * 6 * 8);
        let p = 0;
        for (const b of blocks) {
          const rgb = paletteMap[b.node.category] || [0.4, 0.5, 0.6];
          let hi = 0.0;
          if (selectedIds.has(b.node.id)) hi = 2.0;
          else if (hoveredBlock?.node.id === b.node.id) hi = 1.0;

          const x1 = b.x;
          const y1 = b.y;
          const x2 = b.x + b.w;
          const y2 = b.y + b.h;

          const v = (x: number, y: number, u: number, vv: number) => {
            data[p++] = x;
            data[p++] = y;
            data[p++] = u;
            data[p++] = vv;
            data[p++] = rgb[0];
            data[p++] = rgb[1];
            data[p++] = rgb[2];
            data[p++] = hi;
          };

          v(x1, y1, 0, 0);
          v(x2, y1, 1, 0);
          v(x1, y2, 0, 1);
          v(x1, y2, 0, 1);
          v(x2, y1, 1, 0);
          v(x2, y2, 1, 1);
        }

        gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
        gl.drawArrays(gl.TRIANGLES, 0, blocks.length * 6);
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [blocks, hoveredBlock, selectedIds, size, isLight]);

  const totalUsed = QuotaEngine.computeTotalVolumeUsed(allNodes);
  const categories = QuotaEngine.getCategoryBreakdown(allNodes, config.totalDiskQuotaBytes);

  return (
    <div
      className={`flex flex-col h-full select-none ${
        isLight ? 'bg-slate-100 text-slate-800' : 'bg-[#090d16] text-slate-100'
      }`}
    >
      {/* Top Disk Analytics Header */}
      <div
        className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-slate-900/90 border-slate-800 text-slate-100'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg border ${
              isLight
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'bg-blue-500/15 border-blue-500/30 text-blue-400'
            }`}
          >
            <HardDrive className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold">
                WebGL 3D Cushion Disk Treemap ({config.volumeName})
              </h3>
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${
                  isLight
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                    : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                }`}
              >
                GLSL Shader Aktif
              </span>
            </div>
            <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Toplam Kullanım:{' '}
              <strong className={isLight ? 'text-slate-800' : 'text-slate-200'}>
                {QuotaEngine.formatBytes(totalUsed)} /{' '}
                {QuotaEngine.formatBytes(config.totalDiskQuotaBytes)}
              </strong>{' '}
              ({((totalUsed / Math.max(1, config.totalDiskQuotaBytes)) * 100).toFixed(1)}% Dolu •{' '}
              {allNodes.length.toLocaleString('tr-TR')} Düğüm)
            </p>
          </div>
        </div>

        {/* Mode Toggle + Category Legend */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`flex items-center p-0.5 rounded-lg border text-[11px] ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
            }`}
          >
            <button
              onClick={() => setGroupMode('smart_hierarchy')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
                groupMode === 'smart_hierarchy'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Aktif dizindeki klasör ve dosyaları hiyerarşik boyuta göre göster"
            >
              <FolderTree className="w-3 h-3" /> Bu Dizin Hiyerarşisi
            </button>
            <button
              onClick={() => setGroupMode('all_files')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition ${
                groupMode === 'all_files'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Diskteki en büyük bireysel dosyaları göster"
            >
              <Layers className="w-3 h-3" /> En Büyük Dosyalar
            </button>
          </div>

          <div className="hidden xl:flex flex-wrap items-center gap-2.5 text-[11px]">
            {categories.slice(0, 5).map((cat) => (
              <div key={cat.category} className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block shadow-sm"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="font-medium">{cat.label.split(' ')[0]}</span>
                <span className="font-mono opacity-60">({QuotaEngine.formatBytes(cat.bytes)})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main WebGL Treemap Canvas */}
      <div
        ref={containerRef}
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect) return;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const found = blocks.find(
            (b) => x >= b.x && x <= b.x + b.w && y >= b.y && y <= b.y + b.h
          );
          setHoveredBlock(found || null);
        }}
        onMouseLeave={() => setHoveredBlock(null)}
        onClick={() => {
          if (hoveredBlock) {
            onSelectNode(hoveredBlock.node.id, false, false);
          }
        }}
        onDoubleClick={() => {
          if (hoveredBlock) {
            onOpenNode(hoveredBlock.node);
          }
        }}
        className="relative flex-1 overflow-hidden cursor-pointer"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Clean Block Labels Overlay (Force crisp white text with subtle dark pill backdrop so it's 100% legible in both Light & Dark themes) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {blocks.slice(0, 100).map((b) => {
            if (b.w < 72 || b.h < 40) return null;
            return (
              <div
                key={b.node.id}
                style={{
                  left: Math.round(b.x),
                  top: Math.round(b.y),
                  width: Math.round(b.w),
                  height: Math.round(b.h),
                }}
                className="absolute p-2.5 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    style={{ color: '#ffffff' }}
                    className="text-[11px] font-semibold truncate px-1.5 py-0.5 rounded bg-black/30 backdrop-blur-[2px] shadow-sm"
                  >
                    {b.node.type === 'folder' ? `📁 ${b.node.name}` : b.node.name}
                  </span>
                  {b.node.security.locked && (
                    <span className="p-1 rounded-full bg-black/35">
                      <Lock className="w-3 h-3 text-white shrink-0" />
                    </span>
                  )}
                </div>
                {b.h >= 58 && (
                  <div className="flex items-center justify-start">
                    <span
                      style={{ color: '#ffffff' }}
                      className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-black/30"
                    >
                      {QuotaEngine.formatBytes(b.bytes)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floating Hover Inspector Tooltip (Adapts cleanly to Light and Dark Mode) */}
        {hoveredBlock && (
          <div
            className={`absolute bottom-4 right-4 z-30 backdrop-blur-md border rounded-xl p-3.5 shadow-2xl w-80 pointer-events-none ${
              isLight
                ? 'bg-white/95 border-slate-200 text-slate-800'
                : 'bg-slate-900/95 border-slate-700 text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold truncate">{hoveredBlock.node.name}</span>
              <span
                className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded shrink-0 ${
                  isLight
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-blue-500/20 text-blue-300'
                }`}
              >
                {QuotaEngine.formatBytes(hoveredBlock.bytes)}
              </span>
            </div>
            <div className="space-y-1 text-[11px] font-mono">
              <div className="flex justify-between">
                <span className="opacity-65">Tür:</span>
                <span className="font-semibold">
                  {hoveredBlock.node.type === 'folder'
                    ? 'Klasör (Çift Tıkla Aç)'
                    : `${hoveredBlock.node.extension.toUpperCase()} Dosyası`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-65">Sahip (Owner):</span>
                <span>{hoveredBlock.node.security.ownerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-65">POSIX / İzin:</span>
                <span className={isLight ? 'text-emerald-700 font-semibold' : 'text-emerald-400'}>
                  {hoveredBlock.node.security.posix.octal} (
                  {hoveredBlock.node.security.posix.symbolic})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-65">Disk Payı:</span>
                <span>
                  {((hoveredBlock.bytes / Math.max(1, config.totalDiskQuotaBytes)) * 100).toFixed(2)}
                  %
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
