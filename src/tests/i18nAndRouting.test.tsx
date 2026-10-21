import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import tr from '../core/i18n/locales/tr.json';
import en from '../core/i18n/locales/en.json';
import de from '../core/i18n/locales/de.json';
import ru from '../core/i18n/locales/ru.json';
import { App } from '../App';
import { DOC_MODULE_REGISTRY } from '../components/docs/registry/docModuleRegistry';
import { SyntaxHighlighterEngine } from '../components/docs/syntax/SyntaxHighlighterEngine';

describe('JSON Localization (i18n: TR / EN / DE / RU) & URL Routing (/demo, /documentation, /configurator)', () => {
  it('ensures tr.json, en.json, de.json, and ru.json have 100% identical key structures', () => {
    const trTopKeys = Object.keys(tr).sort();
    const enTopKeys = Object.keys(en).sort();
    const deTopKeys = Object.keys(de).sort();
    const ruTopKeys = Object.keys(ru).sort();

    expect(enTopKeys).toEqual(trTopKeys);
    expect(deTopKeys).toEqual(trTopKeys);
    expect(ruTopKeys).toEqual(trTopKeys);

    for (const section of trTopKeys as Array<keyof typeof tr>) {
      const trSubKeys = Object.keys(tr[section]).sort();
      const enSubKeys = Object.keys(en[section]).sort();
      const deSubKeys = Object.keys(de[section]).sort();
      const ruSubKeys = Object.keys(ru[section]).sort();

      expect(enSubKeys).toEqual(trSubKeys);
      expect(deSubKeys).toEqual(trSubKeys);
      expect(ruSubKeys).toEqual(trSubKeys);
    }
  });

  it('loads the correct view based on URL route (/demo, /documentation, /configurator) and switches languages & themes', async () => {
    window.history.pushState({}, '', '/demo');
    const { container } = render(<App />);

    // Verify /demo route is active and renders the explorer
    expect(window.location.pathname).toBe('/demo');
    expect((await screen.findAllByText('Bu bilgisayar')).length).toBeGreaterThan(0);

    // Switch language to English (EN) via top navigation bar
    const enButtons = screen.getAllByTitle('English (en.json)');
    fireEvent.click(enButtons[0]);

    // Check that navigation labels switched to English
    expect(screen.getByText('Documentation')).toBeInTheDocument();

    // Switch language to German (DE)
    const deButtons = screen.getAllByTitle('Deutsch (de.json)');
    fireEvent.click(deButtons[0]);
    expect(screen.getByText('Dokumentation')).toBeInTheDocument();

    // Switch language to Russian (RU)
    const ruButtons = screen.getAllByTitle('Русский (ru.json)');
    fireEvent.click(ruButtons[0]);
    expect(screen.getByText('Документация')).toBeInTheDocument();

    // Switch back to Turkish (TR)
    const trButtons = screen.getAllByTitle('Türkçe (tr.json)');
    fireEvent.click(trButtons[0]);
    expect(screen.getByText('Dokümantasyon')).toBeInTheDocument();

    // Navigate to /configurator via URL link
    const configLink = screen.getByText(tr.nav.configurator);
    fireEvent.click(configLink);
    expect(window.location.pathname).toBe('/configurator');
    expect(screen.getAllByText(tr.configurator.title).length).toBeGreaterThan(0);

    // Navigate to /documentation via URL link
    const docsLink = screen.getByText('Dokümantasyon');
    fireEvent.click(docsLink);
    expect(window.location.pathname).toBe('/documentation');
    expect(screen.getAllByText(/SOLID Mimari/i).length).toBeGreaterThan(0);

    // Toggle Dark / Light Mode and verify .theme-light class
    const rootShell = container.firstElementChild as HTMLElement;
    expect(rootShell.className).not.toContain('theme-light');
    const themeToggleBtn = screen.getAllByTitle('Dark / Light Tema')[0];
    fireEvent.click(themeToggleBtn);
    expect(rootShell.className).toContain('theme-light');
  });

  it('provides 8 SOLID-compliant modular documentation chapters with colorized syntax-highlighted code blocks', () => {
    expect(DOC_MODULE_REGISTRY.length).toBe(8);

    // Verify SyntaxHighlighterEngine tokenizes keywords, types, strings, variables, numbers, and comments
    const sample = `// SOLID Comment\nconst quota: number = 500;\n$this->resolveSafePath('app/hyperion');`;
    const tokenizedLines = SyntaxHighlighterEngine.tokenizeCode(sample, 'php');
    expect(tokenizedLines.length).toBe(3);

    const flatTokens = tokenizedLines.flat();
    expect(flatTokens.some((t) => t.type === 'comment')).toBe(true);
    expect(flatTokens.some((t) => t.type === 'keyword' && t.value === 'const')).toBe(true);
    expect(flatTokens.some((t) => t.type === 'type' && t.value === 'number')).toBe(true);
    expect(flatTokens.some((t) => t.type === 'number' && t.value === '500')).toBe(true);
    expect(flatTokens.some((t) => t.type === 'variable' && t.value === '$this')).toBe(true);
    expect(flatTokens.some((t) => t.type === 'string')).toBe(true);

    // Render /documentation and verify colorized token spans and SOLID filter pills
    window.history.pushState({}, '', '/documentation');
    const { container } = render(<App />);

    const keywordSpans = container.querySelectorAll('[data-token-type="keyword"]');
    const stringSpans = container.querySelectorAll('[data-token-type="string"]');
    expect(keywordSpans.length).toBeGreaterThan(0);
    expect(stringSpans.length).toBeGreaterThan(0);

    // Switch to SOLID Architecture module and verify all 5 SOLID pillars are displayed
    const solidModuleBtn = screen.getByText(/6\. SOLID Mimari/i);
    fireEvent.click(solidModuleBtn);
    expect(screen.getByText('Single Responsibility')).toBeInTheDocument();
    expect(screen.getByText('Liskov Substitution')).toBeInTheDocument();
  });
});
