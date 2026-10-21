import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const NodejsBackendComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-mono mb-2">
          <span>Bölüm 04 • Node.js 20+ / Express / Fastify SOLID Connector</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          4. Node.js TypeScript Backend Connector Kurulumu
        </h2>
        <p className="text-slate-300 mt-2">
          Node.js tabanlı sunucularda belirlediğiniz bir disk klasörünü (ör.{' '}
          <code>D:/ManagedStorage</code> veya <code>/mnt/nvme0n1/workspace</code>) Path Traversal
          korumalı, POSIX <code>chmod</code> destekli ve ACL sidecar (<code>.filemangl.acl.json</code>
          ) kayıtlı olarak yönetmek için modüler Express middleware yapısı:
        </p>
      </div>

      <HighlightedCodeBlock
        id="node_server"
        title="server/fileManGLConnector.ts — Express Disk & ACL Connector Middleware"
        language="typescript"
        solidPrinciple="SRP"
        description="Sandbox yol çözümlemesi, POSIX mod bitleri (0o755) ve JSON sidecar izin kayıtlarını tek bir modüler router içinde yönetir."
        code={`import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

export interface FileManGLMountOptions {
  mountDir: string;          // Örn: 'D:/ManagedDiskVolume'
  maxQuotaBytes: number;     // Örn: 500 * 1024 * 1024 (500 MB)
  blockedExtensions: string[];
}

export function createFileManGLConnector(options: FileManGLMountOptions) {
  const router = express.Router();
  const rootResolved = path.resolve(options.mountDir);

  function resolveSandboxPath(relPath = ''): string {
    const target = path.resolve(rootResolved, '.' + path.sep + relPath);
    if (!target.startsWith(rootResolved)) {
      throw new Error('EACCES: Path traversal attempt blocked by Sandbox Guard.');
    }
    return target;
  }

  router.post('/connector', async (req: Request, res: Response) => {
    try {
      const { cmd, targetPath, newName, security } = req.body;

      switch (cmd) {
        case 'mkdir': {
          const dirPath = resolveSandboxPath(path.join(targetPath || '', newName));
          await fs.mkdir(dirPath, { recursive: true, mode: 0o755 });
          return res.json({ status: 'ok', created: dirPath });
        }
        case 'rename': {
          const oldP = resolveSandboxPath(targetPath);
          const newP = resolveSandboxPath(path.join(path.dirname(targetPath), newName));
          await fs.rename(oldP, newP);
          return res.json({ status: 'ok' });
        }
        case 'chmod': {
          const itemPath = resolveSandboxPath(targetPath);
          const modeOctal = parseInt(security?.posix?.octal || '0755', 8);
          await fs.chmod(itemPath, modeOctal);
          // ACL & Quota metadata sidecar (.filemangl.acl.json) kaydı
          await fs.writeFile(
            itemPath + '.filemangl.acl.json',
            JSON.stringify(security, null, 2)
          );
          return res.json({ status: 'ok', octal: security?.posix?.octal });
        }
        default:
          return res.json({ status: 'ok', mountDir: rootResolved });
      }
    } catch (err: any) {
      return res.status(403).json({ status: 'error', message: err.message });
    }
  });

  return router;
}`}
      />

      <HighlightedCodeBlock
        id="node_mount_app"
        title="server/index.ts — Express Sunucusuna Bağlama (Mount)"
        language="typescript"
        solidPrinciple="OCP"
        description="Farklı departman veya kiracılar (multi-tenant) için birden fazla izole disk bağlama noktası oluşturulabilir."
        code={`import express from 'express';
import { createFileManGLConnector } from './fileManGLConnector';

const app = express();
app.use(express.json({ limit: '50mb' }));

app.use(
  '/api/v1/filemanager',
  createFileManGLConnector({
    mountDir: 'D:/FileManGLManagedVolume',
    maxQuotaBytes: 500 * 1024 * 1024,
    blockedExtensions: ['.exe', '.bat', '.cmd', '.msi', '.vbs'],
  })
);

app.listen(8080, () => {
  console.log('FileManGL Connector listening on http://localhost:8080');
});`}
      />
    </div>
  );
};

export const NodejsBackendDocModule: IDocModuleDefinition = {
  id: 'nodejs_backend',
  stepNumber: 4,
  title: '4. Node.js / Express Disk Connector',
  subtitle: 'TypeScript Sandbox Guard, POSIX Chmod ve Multi-Tenant Disk Bağlama',
  badge: 'Node 20+',
  routeSlug: '/documentation/nodejs',
  solidFocus: ['SRP', 'OCP'],
  searchKeywords: ['nodejs', 'express', 'fastify', 'typescript', 'sandbox', 'fs', 'chmod'],
  iconName: 'terminal',
  iconColorClass: 'text-emerald-400',
  Component: NodejsBackendComponent,
};
