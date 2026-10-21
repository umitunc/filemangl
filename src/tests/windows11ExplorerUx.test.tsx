import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FileManGL } from '../components/explorer/FileManGL';
import { I18nProvider } from '../core/i18n/I18nProvider';
import { DEFAULT_FILE_MANAGER_CONFIG } from '../core/config/defaultConfig';
import { IFileManagerConfig } from '../core/contracts/types';

function renderExplorer(initialPatch?: Partial<IFileManagerConfig>) {
  const Wrapper: React.FC = () => {
    const [cfg, setCfg] = React.useState<IFileManagerConfig>({
      ...DEFAULT_FILE_MANAGER_CONFIG,
      driverType: 'vfs_memory',
      defaultViewMode: 'large_icons',
      ...initialPatch,
    });
    return (
      <I18nProvider
        locale={cfg.locale}
        onLocaleChange={(locale) => setCfg((p) => ({ ...p, locale }))}
      >
        <FileManGL
          config={cfg}
          onConfigChange={(patch) => setCfg((prev) => ({ ...prev, ...patch }))}
        />
      </I18nProvider>
    );
  };
  return render(<Wrapper />);
}

describe('Windows 11 File Explorer UX & UI Automation Suite', () => {
  it('supports Multi-Tab operations (switching tabs, opening new tabs via + and context menu, per-tab Back/Forward history, closing tabs)', async () => {
    renderExplorer();

    // Wait for initial VFS seed nodes to load
    expect(await screen.findAllByText('01_Engineering_Core')).not.toHaveLength(0);

    // Initially there are 2 tabs: 'Ana Disk (Root)' and '01_Engineering_Core'
    const closeButtonsInitial = screen.getAllByTitle('Sekmeyi Kapat (Orta Tık)');
    expect(closeButtonsInitial.length).toBe(2);

    // Click '+' button to open a 3rd tab
    const addTabBtn = screen.getByTitle('Yeni Sekme Aç (+)');
    fireEvent.click(addTabBtn);
    expect(screen.getAllByTitle('Sekmeyi Kapat (Orta Tık)').length).toBe(3);

    // Right-click on '02_WebGL_Shaders' folder in the viewport and choose 'Yeni Sekmede Aç'
    const webglFolderItems = screen.getAllByText('02_WebGL_Shaders');
    fireEvent.contextMenu(webglFolderItems[0]);

    const openInNewTabBtn = await screen.findByText('Yeni Sekmede Aç');
    fireEvent.click(openInNewTabBtn);

    // Now there are 4 tabs and the active tab is inside '02_WebGL_Shaders'
    expect(screen.getAllByTitle('Sekmeyi Kapat (Orta Tık)').length).toBe(4);
    expect((await screen.findAllByText(/CushionTreemapShader/i)).length).toBeGreaterThan(0);

    // Navigate up using the breadcrumb 'Üst Klasöre Çık (Alt+Yukarı)' button
    const upBtn = screen.getByTitle('Üst Klasöre Çık (Alt+Yukarı)');
    fireEvent.click(upBtn);

    // Now Back button should be enabled in this tab's history
    const backBtn = screen.getByTitle('Geri (Alt+Sol)');
    expect(backBtn).not.toBeDisabled();
    fireEvent.click(backBtn);
    expect((await screen.findAllByText(/CushionTreemapShader/i)).length).toBeGreaterThan(0);

    // Close the current tab via '×' button
    const closeButtonsAfter = screen.getAllByTitle('Sekmeyi Kapat (Orta Tık)');
    fireEvent.click(closeButtonsAfter[closeButtonsAfter.length - 1]);
    expect(screen.getAllByTitle('Sekmeyi Kapat (Orta Tık)').length).toBe(3);
  });

  it('renders Single-Row Toolbar with Google Material Symbols and executes New Folder, New File, Sort/Group, and View switches', async () => {
    const { container } = renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Verify Google Fonts Material Symbols Outlined icons are rendered in the DOM
    const materialIcons = container.querySelectorAll('.material-symbols-outlined');
    expect(materialIcons.length).toBeGreaterThan(15);

    // Open '+ Yeni' dropdown menu and create a New Folder
    const newMenuBtn = screen.getByText('Yeni');
    fireEvent.click(newMenuBtn);

    const createFolderOption = await screen.findByText('Yeni Klasör');
    fireEvent.click(createFolderOption);

    // New folder 'Yeni_Klasor' should be created and visible in rename input
    const renameInput = await screen.findByDisplayValue('Yeni_Klasor');
    expect(renameInput).toBeInTheDocument();

    // Commit rename on the newly created folder
    fireEvent.change(renameInput, { target: { value: '99_Automation_Test_Folder' } });
    fireEvent.keyDown(renameInput, { key: 'Enter', code: 'Enter' });

    expect(await screen.findAllByText('99_Automation_Test_Folder')).not.toHaveLength(0);

    // Open 'Sırala' dropdown menu and test grouping modes (Bugün / Dün, Dosya Türü, Gruplama Yok)
    const sortMenuBtn = screen.getByText('Sırala');
    fireEvent.click(sortMenuBtn);

    const groupByCategoryBtn = await screen.findByText('Dosya Türüne Göre Grupla');
    fireEvent.click(groupByCategoryBtn);

    // Verify category group header ('Klasör') appears
    expect((await screen.findAllByText('Klasör')).length).toBeGreaterThan(0);

    // Open 'Görünüm' dropdown menu and switch to Details Table view ('Detaylar (Details Table)')
    const viewMenuBtn = screen.getByText('Görünüm');
    fireEvent.click(viewMenuBtn);

    const detailsViewOption = await screen.findByText('Detaylar (Details Table)');
    fireEvent.click(detailsViewOption);

    // In Details table view, column headers like 'Ad (Name)' and 'Sahip (Owner)' are rendered in a <thead>
    expect(await screen.findByText('Sahip (Owner)')).toBeInTheDocument();
  });

  it('supports Resizable Left & Right Sidebars via mouse drag handles and toggles the Windows 11 Ayrıntılar (Details) pane', async () => {
    renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Find Left Sidebar resize handle and drag it +60px to the right (240px -> 300px)
    const leftHandle = screen.getByTitle('Sol Bölmeyi Yeniden Boyutlandır (Sürükle)');
    const leftSidebar = leftHandle.previousElementSibling as HTMLElement;
    expect(leftSidebar.style.width).toBe('240px');

    fireEvent.mouseDown(leftHandle, { clientX: 240 });
    fireEvent.mouseMove(window, { clientX: 300 });
    fireEvent.mouseUp(window);
    expect(leftSidebar.style.width).toBe('300px');

    // Find Right 'Ayrıntılar' Sidebar resize handle and drag it -40px to the left (300px -> 340px)
    const rightHandle = screen.getByTitle('Ayrıntılar Bölmesini Yeniden Boyutlandır (Sürükle)');
    const rightSidebar = rightHandle.nextElementSibling as HTMLElement;
    expect(rightSidebar.style.width).toBe('300px');

    fireEvent.mouseDown(rightHandle, { clientX: 900 });
    fireEvent.mouseMove(window, { clientX: 860 });
    fireEvent.mouseUp(window);
    expect(rightSidebar.style.width).toBe('340px');

    // Toggle 'Ayrıntılar' pane off and back on using the toolbar button
    const toggleDetailsBtn = screen.getByTitle('Ayrıntılar Bölmesini Aç/Kapat');
    fireEvent.click(toggleDetailsBtn);
    expect(screen.queryByTitle('Ayrıntılar Bölmesini Yeniden Boyutlandır (Sürükle)')).not.toBeInTheDocument();

    fireEvent.click(toggleDetailsBtn);
    expect(screen.getByTitle('Ayrıntılar Bölmesini Yeniden Boyutlandır (Sürükle)')).toBeInTheDocument();
  });

  it('executes Clipboard Copy/Paste, ZIP Archive Compression, Delete to Recycle Bin & Restore, and Stress Test generation', async () => {
    renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Click on 'Architecture_Guide.md' in root volume to select it
    const docItems = await screen.findAllByText(/Architecture_Guide/i);
    fireEvent.click(docItems[0]);

    // Test Cut (Ctrl+X) visual ghosting (opacity-25 + content_cut badge)
    const cutBtn = screen.getByTitle('Kes (Ctrl+X)');
    fireEvent.click(cutBtn);
    const cutCard = docItems[0].closest('[data-node-id]') as HTMLElement;
    expect(cutCard.className).toContain('opacity-25');

    // Click Copy button in toolbar
    const copyBtn = screen.getByTitle('Kopyala (Ctrl+C)');
    expect(copyBtn).not.toBeDisabled();
    fireEvent.click(copyBtn);

    // Click Paste button in toolbar — pasting into same folder creates '_kopya'
    const pasteBtn = screen.getByTitle('Yapıştır (Ctrl+V)');
    expect(pasteBtn).not.toBeDisabled();
    fireEvent.click(pasteBtn);

    const copiedItems = await screen.findAllByText(/Architecture_Guide_kopya/i);
    expect(copiedItems.length).toBeGreaterThan(0);

    // Compress selected item into a .zip archive
    fireEvent.click(copiedItems[0]);
    const zipBtn = screen.getByTitle('ZIP Sıkıştır');
    fireEvent.click(zipBtn);

    const bundleItems = await screen.findAllByText(/Architecture_Guide_kopya_bundle/i);
    expect(bundleItems.length).toBeGreaterThan(0);

    // Delete the zip archive to Recycle Bin
    const deleteBtn = screen.getByTitle('Sil (Del)');
    fireEvent.click(deleteBtn);

    // Open Recycle Bin ('Geri Dönüşüm Kutusu') from Left Sidebar and restore the deleted item
    const recycleBinBtn = screen.getByText('Geri Dönüşüm Kutusu');
    fireEvent.click(recycleBinBtn);

    const trashedZips = await screen.findAllByText(/Architecture_Guide_kopya_bundle/i);
    expect(trashedZips.length).toBeGreaterThan(0);
    fireEvent.click(trashedZips[0]);

    const restoreBtn = screen.getByTitle('Geri Yükle');
    fireEvent.click(restoreBtn);

    // Navigate back to Root Volume via Breadcrumb 'Bu bilgisayar'
    const thisPcBreadcrumb = screen.getAllByText('Bu bilgisayar')[0];
    fireEvent.click(thisPcBreadcrumb);
    expect((await screen.findAllByText(/Architecture_Guide_kopya_bundle/i)).length).toBeGreaterThan(0);

    // Test '+2.5K' Stress Test Fake File generator from the toolbar
    const stress25kBtn = screen.getByTitle('+2.5K Dosya');
    fireEvent.click(stress25kBtn);

    // Toast notification should confirm +2.500 Fake Dosya Üretildi
    expect(await screen.findByText('+2.500 Fake Dosya Üretildi')).toBeInTheDocument();
  });

  it('supports Rubber-Band (Marquee) drag selection box in WindowsExplorerViews', async () => {
    const { container } = renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Locate the scrollable explorer viewport container
    const viewport = container.querySelector('[data-node-id]')?.closest('.overflow-auto') as HTMLElement;
    expect(viewport).toBeTruthy();

    // Start rubber-band drag on the empty background of the viewport
    fireEvent.mouseDown(viewport, { button: 0, clientX: 100, clientY: 100 });
    fireEvent.mouseMove(window, { clientX: 450, clientY: 380 });

    // While dragging, the marquee selection rectangle is rendered in the DOM
    const marqueeBox = viewport.querySelector('.pointer-events-none.z-40');
    expect(marqueeBox).toBeTruthy();

    fireEvent.mouseUp(window);
  });

  it('supports Drag & Drop of files into folders without the marquee selection box overriding it', async () => {
    const { container } = renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    const viewport = container.querySelector('[data-node-id]')?.closest('.overflow-auto') as HTMLElement;
    expect(viewport).toBeTruthy();

    // Locate 'Architecture_Guide.md' card and '01_Engineering_Core' folder card
    const docText = (await screen.findAllByText(/Architecture_Guide/i))[0];
    const docCard = docText.closest('[data-node-id]') as HTMLElement;
    expect(docCard).toBeTruthy();
    expect(docCard.getAttribute('draggable')).toBe('true');

    // Pressing mouseDown + mouseMove on a file card MUST NOT trigger the rubber-band marquee box
    fireEvent.mouseDown(docCard, { button: 0, clientX: 120, clientY: 120 });
    fireEvent.mouseMove(window, { clientX: 300, clientY: 300 });
    expect(viewport.querySelector('.pointer-events-none.z-40')).toBeNull();
    fireEvent.mouseUp(window);

    // Perform Drag & Drop of 'Architecture_Guide.md' onto '01_Engineering_Core' folder
    const folderCards = Array.from(viewport.querySelectorAll('[data-node-id]'));
    const targetFolderCard = folderCards.find((el) =>
      el.textContent?.includes('01_Engineering_Core')
    ) as HTMLElement;
    expect(targetFolderCard).toBeTruthy();

    const store: Record<string, string> = {};
    const mockDataTransfer = {
      effectAllowed: 'move',
      dropEffect: 'move',
      setData: (type: string, val: string) => {
        store[type] = val;
      },
      getData: (type: string) => store[type] || '',
    };

    fireEvent.dragStart(docCard, { dataTransfer: mockDataTransfer });
    fireEvent.dragOver(targetFolderCard, { dataTransfer: mockDataTransfer });
    fireEvent.drop(targetFolderCard, { dataTransfer: mockDataTransfer });

    // Toast notification & status bar should confirm Drag & Drop move
    expect((await screen.findAllByText('Sürükle & Bırak Taşıma')).length).toBeGreaterThan(0);

    // Also verify partial Drag & Drop when selection includes both a movable item and a locked item ('03_Security_Vault')
    const movableText = (await screen.findAllByText(/FileManGLConfig/i))[0];
    const movableCard = movableText.closest('[data-node-id]') as HTMLElement;
    const lockedCard = Array.from(viewport.querySelectorAll('[data-node-id]')).find((el) =>
      el.textContent?.includes('03_Security_Vault')
    ) as HTMLElement;
    expect(movableCard).toBeTruthy();
    expect(lockedCard).toBeTruthy();

    const mixedPayload = JSON.stringify([
      movableCard.getAttribute('data-node-id'),
      lockedCard.getAttribute('data-node-id'),
    ]);
    const mixedTransfer = {
      effectAllowed: 'move',
      dropEffect: 'move',
      setData: () => {},
      getData: () => mixedPayload,
    };

    fireEvent.drop(targetFolderCard, { dataTransfer: mixedTransfer });
    expect((await screen.findAllByText('Taşınabilir Öğeler Aktarıldı')).length).toBeGreaterThan(0);
  });

  it('opens the Security ACL & POSIX Permissions Modal and inspects permissions', async () => {
    renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Select 'Architecture_Guide.md'
    const docItems = await screen.findAllByText(/Architecture_Guide/i);
    fireEvent.click(docItems[0]);

    // Click 'Özellikler (ACL / Chmod)' button in the right Ayrıntılar pane
    const propsBtn = screen.getByText(/Özellikler/i);
    fireEvent.click(propsBtn);

    // Security modal should appear
    const modalDialog = await screen.findByText(/Gelişmiş İzin & Kota Yönetimi/i);
    expect(modalDialog).toBeInTheDocument();
  });
});
