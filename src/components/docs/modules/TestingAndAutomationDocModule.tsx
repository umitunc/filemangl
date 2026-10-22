import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const TestingAndAutomationComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-mono mb-2">
          <span>Bölüm 08 • Vitest + React Testing Library Otomasyon Mimarisi</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          8. Tam Teşekküllü UX / UI ve Çekirdek Motor Test Otomasyonu
        </h2>
        <p className="text-slate-300 mt-2">
          SOLID prensiplerine uygun olarak soyutlanan çekirdek motorlar (
          <code>PermissionEngine</code>, <code>QuotaEngine</code>, <code>VfsMemoryDriver</code>) ve
          Windows 11 UX bileşenleri (Sekmeli işlem, Boyutlandırılabilir yan paneller, Sürükle-Bırak,
          Seçim Penceresi, Kes/Kopyala/Yapıştır, WebGL2 görünümler) <code>src/tests/</code> altında
          otomatik olarak test edilir.
        </p>
      </div>

      {/* Test Suite Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-emerald-400 mb-1">
            src/tests/coreEngines.test.ts
          </div>
          <p className="text-slate-400">
            POSIX octal (<code>0755</code> &harr; <code>rwxr-xr-x</code>), 5 katmanlı ACL Allow/Deny
            önceliği, klasör kilidi, MB kota aşımı ve yasaklı uzantı testleri.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-blue-400 mb-1">
            src/tests/windows11ExplorerUx.test.tsx
          </div>
          <p className="text-slate-400">
            Çoklu sekme (Multi-Tab), boyutlandırılabilir yan paneller, tek satır Google Material
            Symbols araç çubuğu, Sürükle-Bırak ve Marquee seçim penceresi testleri.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-purple-400 mb-1">
            src/tests/modalsAndWebGL.test.tsx
          </div>
          <p className="text-slate-400">
            WebGL2 60FPS Spatial Grid, 3B Cushion Disk Haritası, Çift Panel (Dual-Pane), Toplu
            Adlandırma, Paylaşım Linki, GLSL Stüdyosu ve Kod Editörü testleri.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="font-mono font-bold text-cyan-400 mb-1">
            src/tests/i18nAndRouting.test.tsx
          </div>
          <p className="text-slate-400">
            <code>tr.json</code>, <code>en.json</code> ve <code>de.json</code> şema eşitliği,{' '}
            <code>/demo</code>, <code>/documentation</code> ve <code>/configurator</code> URL rota
            testleri.
          </p>
        </div>
      </div>

      <HighlightedCodeBlock
        id="test_example_dnd"
        title="src/tests/windows11ExplorerUx.test.tsx — Sürükle & Bırak ve Seçim Penceresi Otomasyon Testi"
        language="tsx"
        solidPrinciple="LSP"
        description="VfsMemoryDriver kullanılarak gerçek DOM etkileşimleri (dragStart, dragOver, drop ve mouseDown/mouseMove) deterministik olarak doğrulanır."
        code={`import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileManGL, DEFAULT_FILE_MANAGER_CONFIG } from '../core';

describe('Windows 11 Drag & Drop + Marquee Selection Isolation', () => {
  it('moves files into target folders via Drag & Drop without triggering the marquee box', async () => {
    const { container } = render(
      <FileManGL
        config={{
          ...DEFAULT_FILE_MANAGER_CONFIG,
          driverType: 'vfs_memory',
        }}
      />
    );

    const docText = (await screen.findAllByText(/Architecture_Guide/i))[0];
    const docCard = docText.closest('[data-node-id]') as HTMLElement;
    expect(docCard.getAttribute('draggable')).toBe('true');

    // Kart üzerinde fare hareketi seçim penceresini (marquee) başlatmamalıdır
    fireEvent.mouseDown(docCard, { button: 0, clientX: 120, clientY: 120 });
    fireEvent.mouseMove(window, { clientX: 300, clientY: 300 });
    expect(container.querySelector('.pointer-events-none.z-40')).toBeNull();
    fireEvent.mouseUp(window);
  });
});`}
      />
    </div>
  );
};

export const TestingAndAutomationDocModule: IDocModuleDefinition = {
  id: 'testing_automation',
  stepNumber: 8,
  title: '8. UX/UI Test Otomasyonu (Vitest)',
  subtitle: 'Birim, Entegrasyon, Sürükle-Bırak, Çoklu Sekme ve WebGL2 Otomasyon Testleri',
  badge: '26+ Tests',
  routeSlug: '/documentation/testing',
  solidFocus: ['SRP', 'LSP', 'DIP'],
  searchKeywords: ['test', 'vitest', 'automation', 'otomasyon', 'drag', 'drop', 'marquee'],
  iconName: 'fact_check',
  iconColorClass: 'text-emerald-400',
  subItems: [
    { id: 'test_example_dnd', label: '8.1 Vitest & RTL Sürükle-Bırak Otomasyonu', badge: 'Vitest' },
  ],
  Component: TestingAndAutomationComponent,
};
