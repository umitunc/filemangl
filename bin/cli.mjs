#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, '..');

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

function readPkgVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(pkgRoot, 'package.json'), 'utf8'));
    return pkg.version || '1.0.4';
  } catch {
    return '1.0.4';
  }
}

function printBanner() {
  const version = readPkgVersion();
  console.log(`
${CYAN}${BOLD}  ╔══════════════════════════════════════════════════════════════════════╗
  ║   ⚡ FileManGL v${version} — Enterprise WebGL2 React File Manager & VFS   ║
  ╚══════════════════════════════════════════════════════════════════════╝${RESET}
`);
}

function printHelp() {
  printBanner();
  console.log(`${BOLD}Usage:${RESET}
  npx filemangl <command> [options]
  npmx filemangl <command> [options]

${BOLD}Commands:${RESET}
  ${GREEN}init${RESET} [target-file]      Generate a ready-to-use <FileManGLWorkspace /> component in your React project
                          (Default: src/components/FileManGLWorkspace.tsx)
  ${GREEN}create${RESET} <project-name>   Scaffold a new Vite + React + TypeScript + FileManGL starter app
  ${GREEN}demo${RESET}                    Launch the interactive FileManGL Explorer & Docs server
  ${GREEN}doctor${RESET}                  Verify Node.js, package build artifacts, and environment readiness
  ${GREEN}help${RESET}                    Show this help message

${BOLD}Package Manager Installation:${RESET}
  ${DIM}# npm / npmx / pnpm / yarn / bun:${RESET}
  npm install filemangl
  pnpm add filemangl
  yarn add filemangl
  bun add filemangl

${BOLD}CLI Examples:${RESET}
  ${DIM}# 1. Generate a ready-to-use FileManGLWorkspace.tsx component:${RESET}
  npx filemangl init

  ${DIM}# 2. Scaffold a brand-new starter project:${RESET}
  npx filemangl create my-cloud-drive
`);
}

const STARTER_COMPONENT_TEMPLATE = `import React, { useState } from 'react';
import {
  FileManGL,
  I18nProvider,
  DEFAULT_FILE_MANAGER_CONFIG,
  type IFileManagerConfig,
} from 'filemangl';
import 'filemangl/style.css';

export function FileManGLWorkspace() {
  const [config, setConfig] = useState<IFileManagerConfig>({
    ...DEFAULT_FILE_MANAGER_CONFIG,
    volumeName: 'FILEMANGL_CLOUD_VOL (D:)',
    mountPath: '/mnt/nvme0n1/workspace',
    locale: 'tr', // 'tr' | 'en' | 'de' | 'ru'
    theme: 'dark', // 'dark' | 'light'
    driverType: 'vfs_localstorage', // 'vfs_localstorage' | 'vfs_memory' | 'rest_connector'
    connectorEndpoint: 'https://api.yourdomain.com/v1/filemanager/connector',
    totalDiskQuotaBytes: 2048 * 1024 * 1024, // 2 GB Quota
    strictPermissionEnforcement: true,
    respectFolderLocks: true,
    enableDragAndDrop: true,
    enableRubberBandSelection: true,
    enableWebGLAcceleration: true,
  });

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <I18nProvider
        locale={config.locale}
        onLocaleChange={(locale) => setConfig((prev) => ({ ...prev, locale }))}
      >
        <FileManGL
          config={config}
          onConfigChange={(patch) => setConfig((prev) => ({ ...prev, ...patch }))}
        />
      </I18nProvider>
    </div>
  );
}

export default FileManGLWorkspace;
`;

function handleInit(rawArgs) {
  printBanner();
  let dirOpt = null;
  let nameOpt = null;
  let positionalPath = null;

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === '--dir' || arg === '-d') {
      dirOpt = rawArgs[++i];
    } else if (arg === '--name' || arg === '-n') {
      nameOpt = rawArgs[++i];
    } else if (!arg.startsWith('-') && !positionalPath) {
      positionalPath = arg;
    }
  }

  const componentName = (nameOpt || 'FileManGLWorkspace').replace(/\.(tsx|ts|jsx|js)$/i, '');
  const defaultRelPath = path.join(dirOpt || 'src/components', `${componentName}.tsx`);
  const outPath = path.resolve(process.cwd(), positionalPath || defaultRelPath);
  const outDir = path.dirname(outPath);

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const customizedTemplate = STARTER_COMPONENT_TEMPLATE.replace(/FileManGLWorkspace/g, componentName);

  fs.writeFileSync(outPath, customizedTemplate, 'utf8');
  console.log(`${GREEN}✔ Created FileManGL starter component at:${RESET} ${BOLD}${outPath}${RESET}`);
  console.log(`
${BOLD}Next steps:${RESET}
  1. Ensure ${CYAN}filemangl${RESET} is installed in your project:
     ${YELLOW}npm install filemangl${RESET}
  2. Import and render ${CYAN}<${componentName} />${RESET} in your ${BOLD}App.tsx${RESET}:
     ${DIM}import { ${componentName} } from './components/${componentName}';${RESET}
`);
}

function handleCreate(projectName) {
  printBanner();
  if (!projectName) {
    console.error(`${YELLOW}⚠ Please specify a project directory name:${RESET}\n  npx filemangl create my-filemangl-app`);
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.error(`${YELLOW}⚠ Target directory "${projectName}" already exists and is not empty.${RESET}`);
    process.exit(1);
  }

  fs.mkdirSync(path.join(targetDir, 'src', 'components'), { recursive: true });

  const appPkg = {
    name: projectName.toLowerCase().replace(/[^a-z0-9-_]/g, '-'),
    private: true,
    version: '0.1.0',
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc && vite build',
      preview: 'vite preview',
    },
    dependencies: {
      filemangl: `^${readPkgVersion()}`,
      react: '^18.3.1',
      'react-dom': '^18.3.1',
    },
    devDependencies: {
      '@types/react': '^18.3.12',
      '@types/react-dom': '^18.3.1',
      '@vitejs/plugin-react': '^4.3.4',
      typescript: '^5.6.2',
      vite: '^6.0.5',
    },
  };

  fs.writeFileSync(path.join(targetDir, 'package.json'), JSON.stringify(appPkg, null, 2), 'utf8');
  fs.writeFileSync(
    path.join(targetDir, 'index.html'),
    `<!doctype html>
<html lang="tr" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName} — FileManGL</title>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
  </head>
  <body style="margin:0;padding:0;background:#070b12;color:#f1f5f9;">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(targetDir, 'vite.config.ts'),
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
`,
    'utf8'
  );

  fs.writeFileSync(
    path.join(targetDir, 'tsconfig.json'),
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2020',
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          skipLibCheck: true,
          noEmit: true,
        },
        include: ['src'],
      },
      null,
      2
    ),
    'utf8'
  );

  fs.writeFileSync(
    path.join(targetDir, 'src', 'components', 'FileManGLWorkspace.tsx'),
    STARTER_COMPONENT_TEMPLATE,
    'utf8'
  );
  fs.writeFileSync(
    path.join(targetDir, 'src', 'App.tsx'),
    `import React from 'react';
import { FileManGLWorkspace } from './components/FileManGLWorkspace';

export default function App() {
  return <FileManGLWorkspace />;
}
`,
    'utf8'
  );
  fs.writeFileSync(
    path.join(targetDir, 'src', 'main.tsx'),
    `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,
    'utf8'
  );

  console.log(`${GREEN}✔ Scaffolded new FileManGL project in:${RESET} ${BOLD}${targetDir}${RESET}\n`);
  console.log(`${BOLD}Run the following commands to start:${RESET}
  ${CYAN}cd ${projectName}${RESET}
  ${CYAN}npm install${RESET}
  ${CYAN}npm run dev${RESET}
`);
}

function handleDoctor() {
  printBanner();
  const esmBundle = path.join(pkgRoot, 'dist', 'lib', 'filemangl.js');
  const cjsBundle = path.join(pkgRoot, 'dist', 'lib', 'filemangl.cjs');
  const cssBundle = path.join(pkgRoot, 'dist', 'lib', 'style.css');
  const dtsBundle = path.join(pkgRoot, 'dist', 'lib', 'types', 'index.d.ts');
  const demoIndex = path.join(pkgRoot, 'dist', 'index.html');

  console.log(`${BOLD}Environment & Package Diagnostics:${RESET}`);
  console.log(`  • Node.js Runtime : ${GREEN}${process.version}${RESET}`);
  console.log(`  • Platform / Arch : ${process.platform} (${process.arch})`);
  console.log(`  • ESM Library     : ${fs.existsSync(esmBundle) ? `${GREEN}✔ Ready (dist/lib/filemangl.js)${RESET}` : `${YELLOW}⚠ Missing (run npm run build:lib)${RESET}`}`);
  console.log(`  • CJS Library     : ${fs.existsSync(cjsBundle) ? `${GREEN}✔ Ready (dist/lib/filemangl.cjs)${RESET}` : `${YELLOW}⚠ Missing (run npm run build:lib)${RESET}`}`);
  console.log(`  • CSS Stylesheet  : ${fs.existsSync(cssBundle) ? `${GREEN}✔ Ready (dist/lib/style.css)${RESET}` : `${YELLOW}⚠ Missing (run npm run build:lib)${RESET}`}`);
  console.log(`  • TypeScript .d.ts: ${fs.existsSync(dtsBundle) ? `${GREEN}✔ Ready (dist/lib/types/index.d.ts)${RESET}` : `${YELLOW}⚠ Missing (run npm run build:lib)${RESET}`}`);
  console.log(`  • Demo SPA Bundle : ${fs.existsSync(demoIndex) ? `${GREEN}✔ Ready (dist/index.html)${RESET}` : `${YELLOW}⚠ Missing (run npm run build:demo)${RESET}`}`);
  console.log('');
}

function handleDemo() {
  printBanner();
  console.log(`${CYAN}Starting FileManGL Interactive Studio & Docs server...${RESET}\n`);
  spawnSync('npx', ['vite'], { cwd: pkgRoot, stdio: 'inherit', shell: true });
}

const args = process.argv.slice(2);
const invokedBin = path.basename(process.argv[1] || '');
const cmd = (args[0] || 'help').toLowerCase();

if (invokedBin.includes('create-filemangl') && args[0] && !['init', 'create', 'doctor', 'demo', 'help', '-v', '--version'].includes(cmd)) {
  handleCreate(args[0]);
} else if (cmd === 'init' || cmd === 'setup') {
  handleInit(args.slice(1));
} else if (cmd === 'create') {
  handleCreate(args[1]);
} else if (cmd === 'doctor' || cmd === 'info' || cmd === 'check') {
  handleDoctor();
} else if (cmd === 'demo' || cmd === 'studio' || cmd === 'start') {
  handleDemo();
} else if (cmd === '-v' || cmd === '--version' || cmd === 'version') {
  console.log(readPkgVersion());
} else {
  printHelp();
}
