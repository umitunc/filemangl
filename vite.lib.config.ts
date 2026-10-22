import { resolve } from 'node:path';
import fs from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Automatically injects the compiled FileManGL stylesheet into document.head at runtime
 * when imported in a browser environment, while also keeping dist/lib/style.css for explicit imports.
 */
function autoInjectCssPlugin(): Plugin {
  return {
    name: 'filemangl-auto-inject-css',
    apply: 'build',
    writeBundle(options, bundle) {
      const outDir = options.dir || 'dist/lib';
      const cssChunk = Object.values(bundle).find(
        (chunk) => chunk.type === 'asset' && chunk.fileName.endsWith('.css')
      );
      if (!cssChunk || cssChunk.type !== 'asset') return;

      const cssContent =
        typeof cssChunk.source === 'string'
          ? cssChunk.source
          : Buffer.from(cssChunk.source).toString('utf8');

      // Ensure dist/lib/style.css always exists
      const styleCssPath = resolve(outDir, 'style.css');
      if (!fs.existsSync(styleCssPath)) {
        fs.writeFileSync(styleCssPath, cssContent, 'utf8');
      }

      // Copy i18n JSON locale dictionaries into dist/lib/types/core/i18n/locales so TypeScript .d.ts resolves them
      const srcLocalesDir = resolve(import.meta.dirname, 'src/core/i18n/locales');
      const destLocalesDir = resolve(outDir, 'types/core/i18n/locales');
      if (fs.existsSync(srcLocalesDir)) {
        fs.mkdirSync(destLocalesDir, { recursive: true });
        for (const f of fs.readdirSync(srcLocalesDir)) {
          if (f.endsWith('.json')) {
            fs.copyFileSync(resolve(srcLocalesDir, f), resolve(destLocalesDir, f));
          }
        }
      }

      const injectorSnippet = `\n;(function(){try{if(typeof document!=='undefined'&&!document.getElementById('filemangl-core-styles')){var s=document.createElement('style');s.id='filemangl-core-styles';s.textContent=${JSON.stringify(
        cssContent
      )};document.head.appendChild(s);}}catch(e){}})();\n`;

      for (const fileName of ['filemangl.js', 'filemangl.cjs']) {
        const fullPath = resolve(outDir, fileName);
        if (fs.existsSync(fullPath)) {
          const code = fs.readFileSync(fullPath, 'utf8');
          if (!code.includes('filemangl-core-styles')) {
            fs.writeFileSync(fullPath, code + injectorSnippet, 'utf8');
          }
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), autoInjectCssPlugin()],
  publicDir: false,
  build: {
    outDir: 'dist/lib',
    emptyOutDir: false,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'FileManGL',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'filemangl.js' : 'filemangl.cjs'),
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
      },
    },
  },
});
