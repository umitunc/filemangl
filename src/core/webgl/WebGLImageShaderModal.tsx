import React, { useEffect, useRef, useState } from 'react';
import { FileNode } from '../contracts/types';
import { QuotaEngine } from '../services/QuotaEngine';
import {
  X,
  Sliders,
  Sparkles,
  RotateCcw,
  Save,
  Cpu,
  Eye,
  ShieldAlert,
  Download,
  Image as ImageIcon,
} from 'lucide-react';

interface WebGLImageShaderModalProps {
  node: FileNode;
  canWrite: boolean;
  writeDenialReason?: string;
  onClose: () => void;
  onSaveAsNewFile: (
    newName: string,
    shaderDescription: string,
    sizeBytes: number,
    exportedDataUrl?: string
  ) => void;
}

const STUDIO_VS = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const STUDIO_FS = `
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

function hexToRgbNormalized(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16) || 0x3b82f6;
  return [((num >> 16) & 255) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

export const WebGLImageShaderModal: React.FC<WebGLImageShaderModalProps> = ({
  node,
  canWrite,
  writeDenialReason,
  onClose,
  onSaveAsNewFile,
}) => {
  const hasRealImage = Boolean(node.blobUrl || node.thumbnailUrl);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [exposure, setExposure] = useState(0.0);
  const [contrast, setContrast] = useState(hasRealImage ? 1.0 : 1.05);
  const [saturation, setSaturation] = useState(hasRealImage ? 1.0 : 1.15);
  const [aberration, setAberration] = useState(hasRealImage ? 0.0 : 0.15);
  const [vignette, setVignette] = useState(hasRealImage ? 0.0 : 0.35);
  const [edgeDetect, setEdgeDetect] = useState(false);
  const [compareOriginal, setCompareOriginal] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);

  const patternIndex =
    node.imageMeta?.pattern === 'cybergrid'
      ? 1
      : node.imageMeta?.pattern === 'aurora'
      ? 2
      : node.imageMeta?.pattern === 'prism'
      ? 3
      : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, STUDIO_VS);
    const fs = compile(gl.FRAGMENT_SHADER, STUDIO_FS);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Optional Real Image Texture Upload to GPU
    const tex = gl.createTexture();
    let hasBoundTex = 0;
    const imgSrc = node.blobUrl || node.thumbnailUrl;

    if (imgSrc && tex && typeof Image !== 'undefined') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        hasBoundTex = 1;
        setTextureLoaded(true);
      };
      img.src = imgSrc;
    }

    const palette = node.imageMeta?.palette || ['#0ea5e9', '#6366f1', '#ec4899'];
    const c1 = hexToRgbNormalized(palette[0]);
    const c2 = hexToRgbNormalized(palette[1]);
    const c3 = hexToRgbNormalized(palette[2]);

    let raf = 0;
    const render = (now: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(prog);

      if (hasBoundTex === 1 && tex) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.uniform1i(gl.getUniformLocation(prog, 'u_tex'), 0);
      }

      gl.uniform1i(gl.getUniformLocation(prog, 'u_hasTexture'), hasBoundTex);
      gl.uniform1f(gl.getUniformLocation(prog, 'u_time'), now * 0.001);
      gl.uniform1f(
        gl.getUniformLocation(prog, 'u_exposure'),
        compareOriginal ? 0.0 : exposure
      );
      gl.uniform1f(
        gl.getUniformLocation(prog, 'u_contrast'),
        compareOriginal ? 1.0 : contrast
      );
      gl.uniform1f(
        gl.getUniformLocation(prog, 'u_saturation'),
        compareOriginal ? 1.0 : saturation
      );
      gl.uniform1f(
        gl.getUniformLocation(prog, 'u_aberration'),
        compareOriginal ? 0.0 : aberration
      );
      gl.uniform1f(
        gl.getUniformLocation(prog, 'u_vignette'),
        compareOriginal ? 0.0 : vignette
      );
      gl.uniform1i(gl.getUniformLocation(prog, 'u_pattern'), patternIndex);
      gl.uniform1i(
        gl.getUniformLocation(prog, 'u_edgeDetect'),
        compareOriginal ? 0 : edgeDetect ? 1 : 0
      );
      gl.uniform3f(gl.getUniformLocation(prog, 'u_c1'), c1[0], c1[1], c1[2]);
      gl.uniform3f(gl.getUniformLocation(prog, 'u_c2'), c2[0], c2[1], c2[2]);
      gl.uniform3f(gl.getUniformLocation(prog, 'u_c3'), c3[0], c3[1], c3[2]);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      if (tex) gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, [
    exposure,
    contrast,
    saturation,
    aberration,
    vignette,
    edgeDetect,
    compareOriginal,
    patternIndex,
    node,
  ]);

  const handleReset = () => {
    setExposure(0.0);
    setContrast(hasRealImage ? 1.0 : 1.05);
    setSaturation(hasRealImage ? 1.0 : 1.15);
    setAberration(hasRealImage ? 0.0 : 0.15);
    setVignette(hasRealImage ? 0.0 : 0.35);
    setEdgeDetect(false);
  };

  const captureCanvasDataUrl = (): { dataUrl?: string; byteSize: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { byteSize: Math.round(node.size * 0.85) };
    try {
      const dataUrl = canvas.toDataURL('image/png');
      if (dataUrl && dataUrl.startsWith('data:image/')) {
        const commaIdx = dataUrl.indexOf(',');
        const bytes =
          commaIdx !== -1
            ? Math.round(((dataUrl.length - commaIdx - 1) * 3) / 4)
            : Math.round(node.size * 0.85);
        return { dataUrl, byteSize: Math.max(1024, bytes) };
      }
    } catch {
      // Fallback in headless test env
    }
    return {
      dataUrl: node.thumbnailUrl || node.blobUrl,
      byteSize: Math.round(node.size * 0.85),
    };
  };

  const handleDownloadProcessedPng = () => {
    const { dataUrl } = captureCanvasDataUrl();
    const targetUrl = dataUrl || node.blobUrl || node.thumbnailUrl;
    if (!targetUrl) return;
    const a = document.createElement('a');
    const base = node.name.replace(/\.[^/.]+$/, '');
    a.href = targetUrl;
    a.download = `${base}_shader_render.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0e1420] border border-slate-700/80 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-white">{node.name}</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  WebGL GLSL Fragment Pipeline
                </span>
                {hasRealImage && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3" />
                    {textureLoaded ? 'GPU 2D TEXTURE BOUND' : 'YEREL GÖRSEL DOKUSU'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {node.imageMeta?.width || 3840}×{node.imageMeta?.height || 2160}px •{' '}
                {QuotaEngine.formatBytes(node.size)} • Checksum:{' '}
                {node.checksumSha256.slice(0, 16)}...
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasRealImage && (
              <button
                onMouseDown={() => setCompareOriginal(true)}
                onMouseUp={() => setCompareOriginal(false)}
                onMouseLeave={() => setCompareOriginal(false)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-200 font-medium transition"
                title="Orijinal fotoğrafı görmek için basılı tutun"
              >
                {compareOriginal ? 'Orijinal Gösteriliyor' : 'Orijinal ile Karşılaştır (Basılı Tut)'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
          {/* Left 2 cols: Live GPU Canvas */}
          <div className="lg:col-span-2 bg-black relative flex items-center justify-center p-4 min-h-[360px]">
            <canvas
              ref={canvasRef}
              width={node.imageMeta?.width ? Math.min(1280, node.imageMeta.width) : 860}
              height={node.imageMeta?.height ? Math.min(720, node.imageMeta.height) : 480}
              className="w-full h-full max-h-[460px] object-contain rounded-xl border border-slate-800 shadow-2xl"
            />
            <div className="absolute top-6 left-6 bg-slate-950/85 backdrop-blur border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
              <span>
                {hasRealImage
                  ? 'GPU Real-Time 2D Texture Sampler (sampler2D u_tex)'
                  : 'GPU Real-Time Fragment Shader (highp float)'}
              </span>
            </div>
          </div>

          {/* Right col: Uniform Sliders */}
          <div className="p-5 bg-slate-900/60 border-l border-slate-800 flex flex-col justify-between overflow-y-auto space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" /> GLSL Shader Parametreleri
                </h4>
                <button
                  onClick={handleReset}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Sıfırla
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Pozlama (u_exposure)</span>
                  <span className="font-mono text-blue-400">{exposure.toFixed(2)} EV</span>
                </div>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.05"
                  value={exposure}
                  onChange={(e) => setExposure(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Kontrast (u_contrast)</span>
                  <span className="font-mono text-blue-400">{contrast.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.2"
                  step="0.05"
                  value={contrast}
                  onChange={(e) => setContrast(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Doygunluk (u_saturation)</span>
                  <span className="font-mono text-blue-400">{saturation.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="2.5"
                  step="0.05"
                  value={saturation}
                  onChange={(e) => setSaturation(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Kromatik Sapma (u_aberration)</span>
                  <span className="font-mono text-pink-400">{aberration.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="2.0"
                  step="0.05"
                  value={aberration}
                  onChange={(e) => setAberration(parseFloat(e.target.value))}
                  className="w-full accent-pink-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Vignette Lens (u_vignette)</span>
                  <span className="font-mono text-blue-400">{vignette.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.2"
                  step="0.05"
                  value={vignette}
                  onChange={(e) => setVignette(parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer bg-slate-800/70 p-2.5 rounded-lg border border-slate-700">
                  <input
                    type="checkbox"
                    checked={edgeDetect}
                    onChange={(e) => setEdgeDetect(e.target.checked)}
                    className="rounded accent-blue-500"
                  />
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>GLSL Sobel Kenar Algılama (Edge-Detect Pass)</span>
                </label>
              </div>
            </div>

            {/* Save & Download Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              {!canWrite && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-[11px] text-rose-300 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{writeDenialReason || 'Bu dizine yazma yetkiniz bulunmuyor.'}</span>
                </div>
              )}
              <button
                disabled={!canWrite}
                onClick={() => {
                  const base = node.name.replace(/\.[^/.]+$/, '');
                  const { dataUrl, byteSize } = captureCanvasDataUrl();
                  onSaveAsNewFile(
                    `${base}_shader_render.png`,
                    `GLSL Render (exp=${exposure}, con=${contrast}, sat=${saturation})`,
                    byteSize,
                    dataUrl
                  );
                  onClose();
                }}
                className={`w-full py-2.5 px-4 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition ${
                  canWrite
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                Shader Çıktısını Diske Yeni Dosya Olarak Kaydet
              </button>

              <button
                onClick={handleDownloadProcessedPng}
                className="w-full py-2 px-4 rounded-xl font-medium text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 flex items-center justify-center gap-2 transition"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                İşlenmiş Görseli Bilgisayara İndir (.PNG)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
