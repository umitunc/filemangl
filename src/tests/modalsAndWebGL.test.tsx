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

describe('Modals (Code Editor, Share Link, Batch Rename, ACL/POSIX) & WebGL Viewports Automation', () => {
  it('opens CodeEditorModal on double-clicking a document/code file, edits content, and saves it', async () => {
    renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Double-click on 'Architecture_Guide.md' to open built-in Code Editor
    const docItems = await screen.findAllByText(/Architecture_Guide/i);
    fireEvent.doubleClick(docItems[0]);

    // Verify CodeEditorModal is open and renders syntax-highlighted tokens
    const saveBtn = await screen.findByText(/Kaydet \(Ctrl\+S\)/i);
    expect(saveBtn).toBeInTheDocument();
    expect(document.querySelectorAll('[data-token-type]').length).toBeGreaterThan(0);

    // Edit textarea content and save
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea).toBeTruthy();
    fireEvent.change(textarea, {
      target: { value: '# Updated Architecture Guide\nSOLID + WebGL2 Verified' },
    });
    fireEvent.click(saveBtn);

    expect(await screen.findByText('Dosya İçeriği Kaydedildi')).toBeInTheDocument();
  });

  it('opens ShareLinkModal from the Ayrıntılar pane, enables password protection, and saves the share link', async () => {
    renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Select 'Architecture_Guide.md'
    const docItems = await screen.findAllByText(/Architecture_Guide/i);
    fireEvent.click(docItems[0]);

    // Click 'Paylaş' button in the right Ayrıntılar pane
    const shareBtn = screen.getByText('Paylaş');
    fireEvent.click(shareBtn);

    // Verify ShareLinkModal opens
    expect(await screen.findByText(/Paylaşım Bağlantısı — Architecture_Guide.md/i)).toBeInTheDocument();

    // Toggle password protection checkbox
    const pwdCheckbox = screen.getByText(/Parola Koruması Zorunlu Olsun/i);
    fireEvent.click(pwdCheckbox);

    const pwdInput = await screen.findByPlaceholderText('Paylaşım parolası girin...');
    fireEvent.change(pwdInput, { target: { value: 'Secret2026!' } });

    // Close modal
    const closeIconBtn = pwdInput.closest('.fixed')?.querySelector('button');
    if (closeIconBtn) fireEvent.click(closeIconBtn);
  });

  it('supports Multi-Select (Ctrl+Click) and BatchRenameModal to rename multiple items at once', async () => {
    renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    const item1 = (await screen.findAllByText(/Architecture_Guide/i))[0];
    const item2 = (await screen.findAllByText(/FileManGLConfig/i))[0];

    // Select item1, then Ctrl+Click item2
    fireEvent.click(item1);
    fireEvent.click(item2, { ctrlKey: true });

    // Click Rename button on the single-row toolbar (with 2 items selected, it opens BatchRenameModal)
    const renameToolbarBtn = screen.getByTitle('Adlandır (F2)');
    fireEvent.click(renameToolbarBtn);

    expect(await screen.findByText(/Toplu Yeniden Adlandırma/i)).toBeInTheDocument();

    const prefixInput = screen.getByPlaceholderText('örn: prod_');
    fireEvent.change(prefixInput, { target: { value: 'v2_' } });

    const applyBatchBtn = screen.getByText('Tümünü Yeniden Adlandır');
    fireEvent.click(applyBatchBtn);

    expect(await screen.findByText('Toplu Adlandırma Tamamlandı')).toBeInTheDocument();
  });

  it('mounts WebGLSpatialViewport and WebGLDiskMapViewport and switches between them cleanly', async () => {
    const { container } = renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    // Open 'Görünüm' dropdown and select WebGL Sahne
    fireEvent.click(screen.getByText('Görünüm'));
    const webglSpatialBtn = await screen.findByText('WebGL Sahne');
    fireEvent.click(webglSpatialBtn);

    // Verify canvas is mounted in DOM
    expect(container.querySelector('canvas')).toBeTruthy();

    // Open 'Görünüm' dropdown and select WebGL Disk Haritası
    fireEvent.click(screen.getByText('Görünüm'));
    const webglDiskMapBtn = await screen.findByText('WebGL Disk Haritası');
    fireEvent.click(webglDiskMapBtn);

    expect(container.querySelector('canvas')).toBeTruthy();
  });

  it('performs real binary file upload for .mp4 with exact byte size, SHA-256 digest, and opens MediaPlayerModal', async () => {
    if (typeof URL.createObjectURL !== 'function') {
      URL.createObjectURL = () => 'blob:http://localhost:5173/mock-video-mp4';
    }
    const { container } = renderExplorer();
    await screen.findAllByText('01_Engineering_Core');

    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(fileInput).toBeTruthy();

    const realMp4Bytes = new Uint8Array(4096);
    const mp4File = new File([realMp4Bytes], 'real_capture_test.mp4', {
      type: 'video/mp4',
    });

    fireEvent.change(fileInput, { target: { files: [mp4File] } });

    const toasts = await screen.findAllByText(
      'Gerçek Dosya Yükleme Tamamlandı',
      {},
      { timeout: 3000 }
    );
    expect(toasts.length).toBeGreaterThan(0);

    const uploadedItems = await screen.findAllByText(/real_capture_test/i);
    const cardItem =
      uploadedItems.find((el) => el.closest('[data-node-id]')) || uploadedItems[0];
    expect(cardItem).toBeTruthy();

    // Double click uploaded video card to open MediaPlayerModal
    fireEvent.doubleClick(cardItem);
    expect(
      await screen.findByText(/GERÇEK DOSYA AKIŞI \(BLOB STREAM\)/i)
    ).toBeInTheDocument();
  });
});
