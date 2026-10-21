# HyperionFM v2.4 — Backend Entegrasyon, VFS & Mimari Dokümantasyonu

Bu proje; **SOLID prensiplerine**, **WebGL2 GPU hızlandırmalı görünümlere**, **Windows 11 Explorer arayüzüne** ve **Klasör/Dosya bazlı Hibrit İzin (NTFS ACL + POSIX + Disk Kotası)** sistemine sahip kapsamlı bir React dosya yöneticisidir.

---

## 1. Mimari Yapı (SOLID Prensipleri)

- **`src/core/contracts/types.ts`**: Tüm domain modelleri (`FileNode`, `NodeSecurityMetadata`, `AclRule`, `PosixPermissions`, `FolderQuotaPolicy`) ve soyut kontratlar (`IFileSystemDriver`, `IFileManagerConfig`).
- **`src/core/services/PermissionEngine.ts`**: Tek Sorumluluk Prensibi (SRP) gereği yalnızca izin matrisi (`read`, `write`, `delete`, `rename`, `upload`, `download`, `share`, `chmod`, `lock`), üst klasör mirası (`inheritFromParent`), kilit (`locked`) ve POSIX Octal (`0755`) hesaplamalarını yapar.
- **`src/core/services/QuotaEngine.ts`**: Belirlenen disk alanının (volume quota) ve klasör bazlı kotaların (`maxBytes`, `maxFileSizeBytes`, `allowedExtensions`, `blockedExtensions`) denetimini yapar.
- **`src/core/drivers/FileSystemDrivers.ts`**: Liskov Substitution (LSP) ve Dependency Inversion (DIP) prensiplerine uygun 3 hazır sürücü:
  1. `VfsLocalStorageDriver`: Backend gerektirmeden tarayıcıda kalıcı çalışan Sanal Dosya Sistemi.
  2. `VfsMemoryDriver`: Bellek içi (RAM Disk) yüksek hızlı test sürücüsü.
  3. `RestConnectorDriver`: Laravel, Node.js, Go, .NET veya Python backend'lerle konuşan evrensel HTTP JSON Connector sürücüsü.
- **`src/core/webgl/`**:
  1. `WebGLSpatialViewport.tsx`: Binlerce dosyayı 60-120 FPS hızında çizen GLSL shader tabanlı WebGL sahnesi (Grid, Kategori Kümesi ve Galaksi Spiral dizilimleri + Stres Testi üreticisi).
  2. `WebGLDiskMapViewport.tsx`: WinDirStat/WizTree tarzı 3B Cushion Treemap disk alanı görselleştiricisi.
  3. `WebGLImageShaderModal.tsx`: Gerçek zamanlı GLSL Fragment Shader görsel işleme stüdyosu.

---

## 2. Universal Backend Connector Protokolü

`driverType: 'rest_connector'` seçildiğinde HyperionFM, `connectorEndpoint` adresine standart JSON yükleri gönderir:

| `cmd` Değeri | Açıklama |
| :--- | :--- |
| `open` / `ls` | Belirlenen disk alanındaki (mount point) dosya ve klasörleri, izin/kota üst verileriyle listeler. |
| `mkdir` | Hedef dizinde yazma izni ve kota kontrolü yaparak yeni klasör oluşturur. |
| `mkfile` / `upload` | Tekil dosya boyutu, uzantı politikası ve disk kotasını doğrulayarak dosya yazar. |
| `paste` | `copy` veya `cut` modunda, çakışma stratejisiyle (`replace`, `keep_both`, `skip`) aktarım yapar. |
| `rename` / `batch_rename` | İzin ve uzantı kontrolüyle yeniden adlandırır. |
| `chmod` | Klasör veya dosyanın ACL kurallarını, POSIX (`0755`) bitlerini, kilidini ve klasör kotasını günceller. |
| `archive` / `extract` | Seçili öğeleri `.zip` arşivine sıkıştırır veya arşivi dizine çıkartır. |

---

## 3. Çalıştırma ve Derleme

```bash
npm install
npm run dev
```
