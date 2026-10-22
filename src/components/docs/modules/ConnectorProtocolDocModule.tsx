import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const ConnectorProtocolComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
          <span>Bölüm 02 • ISP & Liskov Substitution Standart Protokol</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          2. Universal Backend Connector Protokolü (elFinder Üstü JSON Spec)
        </h2>
        <p className="text-slate-300 mt-2">
          elFinder&apos;ın klasik <code>cmd</code> mimarisini modernleştiren{' '}
          <strong>FileManGL Connector Protocol v1.0.4</strong>, tek bir HTTP uç noktası (endpoint)
          üzerinden JSON ve <code>multipart/form-data</code> komutlarıyla herhangi bir programlama
          dilindeki (PHP/Laravel, Node.js, Go, .NET, Python) sunucuyla haberleşir.
        </p>
      </div>

      {/* Command Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-blue-400 mb-1">
            cmd: &quot;open&quot; | &quot;ls&quot; | &quot;tree&quot;
          </div>
          <p className="text-slate-400">
            Belirlenen disk alanındaki (mount path) dizin ağacını, dosya boyutlarını, SHA-256
            özetlerini ve her düğümün POSIX + ACL izin matrisini döner.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-emerald-400 mb-1">
            cmd: &quot;mkdir&quot; | &quot;mkfile&quot; | &quot;upload&quot;
          </div>
          <p className="text-slate-400">
            Hedef klasörün yazma/yükleme (<code>write</code> / <code>upload</code>) iznini ve disk
            kotasını kontrol ederek yeni klasör veya dosya oluşturur.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-amber-400 mb-1">
            cmd: &quot;paste&quot; (mode: &quot;copy&quot; | &quot;cut&quot; | &quot;move&quot;)
          </div>
          <p className="text-slate-400">
            Kaynak ve hedef dizinler arasında çakışma stratejisiyle (<code>replace</code>,{' '}
            <code>keep_both</code>, <code>skip</code>) kopyalama, kes-yapıştır veya sürükle-bırak
            taşıma yapar.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-purple-400 mb-1">
            cmd: &quot;chmod&quot; (ACL + POSIX + Quota)
          </div>
          <p className="text-slate-400">
            Klasör veya dosyanın Octal (<code>0755</code>), ACL Allow/Deny kurallarını, kilidini (
            <code>locked</code>) ve klasör bazlı MB kotasını günceller.
          </p>
        </div>
      </div>

      <HighlightedCodeBlock
        id="spec_json_req"
        title="POST /api/v1/filemanager/connector — İzin & Kota Güncelleme İsteği (Request)"
        language="json"
        solidPrinciple="ISP"
        description="Tek bir atomik JSON payload ile hem POSIX octal (0775), hem klasör kotası (200 MB), hem de rol bazlı ACL kuralları iletilir."
        code={`{
  "cmd": "chmod",
  "targetId": "fld_engineering",
  "recursive": true,
  "security": {
    "ownerId": "usr_dev",
    "ownerName": "Selin Kaya (Lead Dev)",
    "groupName": "engineering",
    "inheritFromParent": false,
    "locked": false,
    "posix": {
      "octal": "0775",
      "symbolic": "rwxrwxr-x"
    },
    "quota": {
      "maxBytes": 209715200,
      "maxFileSizeBytes": 52428800,
      "allowedExtensions": [".ts", ".tsx", ".php", ".md", ".json"],
      "blockedExtensions": [".exe", ".bat", ".cmd"]
    },
    "acl": [
      {
        "id": "ace_dev_allow",
        "subjectType": "role",
        "subjectId": "developer",
        "subjectLabel": "Yazılım Geliştirici (DEVELOPER)",
        "effect": "allow",
        "permissions": {
          "read": true,
          "write": true,
          "delete": true,
          "rename": true,
          "upload": true
        }
      }
    ]
  }
}`}
      />

      <HighlightedCodeBlock
        id="spec_ts_interface"
        title="src/core/drivers/RestConnectorDriver.ts — İstemci Sürücü Sözleşmesi"
        language="typescript"
        solidPrinciple="LSP"
        description="RestConnectorDriver, IFileSystemDriver arayüzünü birebir uygular ve sunucu çevrimdışı olduğunda VFS önbelleğine yumuşak geçiş (graceful fallback) yapar."
        code={`import { FileNode, IFileManagerConfig, IFileSystemDriver } from '../contracts/types';

export class RestConnectorDriver implements IFileSystemDriver {
  public readonly driverId = 'rest_connector';
  public readonly driverName = 'Universal HTTP/REST Disk Connector';
  public readonly supportsRealtimeStream = true;

  constructor(private readonly config: IFileManagerConfig) {}

  public async initialize(): Promise<FileNode[]> {
    const response = await fetch(this.config.connectorEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'open',
        mountPath: this.config.mountPath,
      }),
    });

    if (!response.ok) {
      throw new Error(\`Connector HTTP Error: \${response.status}\`);
    }

    const payload = await response.json();
    return payload.nodes as FileNode[];
  }

  public async getAllNodes(): Promise<FileNode[]> {
    return this.initialize();
  }

  public async saveAllNodes(nodes: FileNode[]): Promise<void> {
    await fetch(this.config.connectorEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cmd: 'sync',
        mountPath: this.config.mountPath,
        nodes,
      }),
    });
  }

  public async resetToFactoryDefaults(): Promise<FileNode[]> {
    return this.initialize();
  }
}`}
      />
    </div>
  );
};

export const ConnectorProtocolDocModule: IDocModuleDefinition = {
  id: 'connector_spec',
  stepNumber: 2,
  title: '2. Universal Connector Protokolü',
  subtitle: 'Standart JSON/Multipart Komut Şeması ve RestConnectorDriver Mimarisi',
  badge: 'JSON Spec',
  routeSlug: '/documentation/connector',
  solidFocus: ['ISP', 'LSP'],
  searchKeywords: ['connector', 'json', 'protocol', 'elfinder', 'cmd', 'chmod', 'rest'],
  iconName: 'hub',
  iconColorClass: 'text-cyan-400',
  subItems: [
    { id: 'spec_json_req', label: '2.1 JSON Komut & ACL Payload Şeması', badge: 'JSON' },
    { id: 'spec_driver_ts', label: '2.2 RestConnectorDriver TypeScript Sınıfı', badge: 'Driver' },
  ],
  Component: ConnectorProtocolComponent,
};
