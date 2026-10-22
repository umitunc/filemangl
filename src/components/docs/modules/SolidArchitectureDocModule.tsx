import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const SolidArchitectureComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 text-xs font-mono mb-2">
          <span>Bölüm 06 • S.O.L.I.D. Mimari & WebGL2 GPU Hızlandırma</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          6. SOLID Prensipleri & Modüler Mimari Rehberi
        </h2>
        <p className="text-slate-300 mt-2">
          <strong>FileManGL v1.0.4</strong> kod tabanı, kurumsal ölçekte genişletilebilirlik ve birim
          test edilebilirlik için beş <strong>SOLID</strong> prensibinin tamamını katı sözleşmelerle (
          <code>src/core/contracts/types.ts</code>) uygular:
        </p>
      </div>

      {/* 5 SOLID Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 text-xs">
        {[
          {
            code: 'S',
            name: 'Single Responsibility',
            color: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
            desc: 'PermissionEngine, QuotaEngine, SyntaxHighlighterEngine ve VFS sürücüleri yalnızca tek bir sorumluluğa sahiptir.',
          },
          {
            code: 'O',
            name: 'Open / Closed',
            color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
            desc: 'Mevcut kodu değiştirmeden yeni depolama sürücüleri (S3, WebDAV), yeni diller (.json) ve yeni doküman modülleri eklenir.',
          },
          {
            code: 'L',
            name: 'Liskov Substitution',
            color: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
            desc: 'VfsMemoryDriver, VfsLocalStorageDriver ve RestConnectorDriver birbirinin yerine sorunsuzca geçebilir.',
          },
          {
            code: 'I',
            name: 'Interface Segregation',
            color: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
            desc: 'IFileSystemDriver, ISyntaxGrammarStrategy ve IDocModuleDefinition gibi odaklı, şişirilmemiş arayüzler kullanılır.',
          },
          {
            code: 'D',
            name: 'Dependency Inversion',
            color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
            desc: 'UI bileşenleri somut sürücülere değil, soyut IFileSystemDriver ve I18nContext kontratlarına bağımlıdır.',
          },
        ].map((p) => (
          <div
            key={p.code}
            className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col gap-1.5"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-lg border font-mono font-extrabold flex items-center justify-center ${p.color}`}
              >
                {p.code}
              </span>
              <span className="font-bold text-white truncate">{p.name}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <HighlightedCodeBlock
        id="solid_driver"
        title="src/core/drivers/CustomS3Driver.ts — Open/Closed & Liskov Substitution Örneği"
        language="typescript"
        solidPrinciple="OCP"
        description="Kendi özel depolama sürücünüzü (AWS S3, Cloudflare R2, IndexedDB veya WebDAV) sadece IFileSystemDriver arayüzünü uygulayarak sisteme enjekte edebilirsiniz."
        code={`import { IFileSystemDriver, FileNode } from '../contracts/types';

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
}`}
      />

      <HighlightedCodeBlock
        id="solid_webgl_glsl"
        title="src/core/webgl/WebGLDiskMapViewport.tsx — GLSL Cushion Treemap Fragment Shader"
        language="glsl"
        solidPrinciple="SRP"
        description="WebGL2 GPU hattı, 25.000+ dosya düğümünü ve 3B yastık (Cushion Treemap) disk yoğunluk haritasını 60 FPS hızında doğrudan ekran kartında işler."
        code={`precision mediump float;
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
}`}
      />
    </div>
  );
};

export const SolidArchitectureDocModule: IDocModuleDefinition = {
  id: 'solid_architecture',
  stepNumber: 6,
  title: '6. SOLID Mimari & WebGL Pipeline',
  subtitle: 'SRP, OCP, LSP, ISP, DIP Kod Örnekleri, S3 Sürücüsü ve GLSL Shader Motoru',
  badge: 'SOLID + GPU',
  routeSlug: '/documentation/solid',
  solidFocus: ['SRP', 'OCP', 'LSP', 'ISP', 'DIP'],
  searchKeywords: ['solid', 'srp', 'ocp', 'lsp', 'isp', 'dip', 'webgl', 'glsl', 's3', 'driver'],
  iconName: 'architecture',
  iconColorClass: 'text-purple-400',
  subItems: [
    { id: 'solid_driver', label: '6.1 Özel Sürücü (CustomS3Driver) Yazımı', badge: 'IFileSystemDriver' },
    { id: 'solid_webgl_glsl', label: '6.2 WebGL2 Cushion Treemap GLSL Shader', badge: 'WebGL2' },
  ],
  Component: SolidArchitectureComponent,
};
