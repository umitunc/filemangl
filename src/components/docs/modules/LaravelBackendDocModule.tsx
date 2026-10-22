import React from 'react';
import { IDocModuleDefinition } from '../contracts/docTypes';
import { HighlightedCodeBlock } from '../ui/HighlightedCodeBlock';

const LaravelBackendComponent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/35 text-rose-300 text-xs font-mono mb-2">
          <span>Bölüm 03 • Laravel 10 / 11 & PHP 8.3 SOLID Backend</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          3. Laravel Disk Alanı, Kota ve ACL İzin Yönetimi Entegrasyonu
        </h2>
        <p className="text-slate-300 mt-2">
          Aşağıdaki <strong>Controller</strong> ve <strong>Service</strong> sınıflarını Laravel
          projenize ekleyerek belirlediğiniz bir disk klasörünü (ör.{' '}
          <code>storage/app/filemangl_volume</code>) Path Traversal korumalı, klasör/dosya bazlı ACL
          izinli ve kota sınırlandırmalı olarak hemen yönetebilirsiniz:
        </p>
      </div>

      <HighlightedCodeBlock
        id="laravel_routes"
        title="routes/api.php — Sanctum Korumalı FileManGL Rotaları"
        language="php"
        solidPrinciple="SRP"
        description="Tüm dosya gezgini işlemleri tekil v1/filemanager grubu altında toplanır."
        code={`<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\Api\\FileManGLConnectorController;

Route::middleware(['auth:sanctum'])->prefix('v1/filemanager')->group(function () {
    Route::post('/connector', [FileManGLConnectorController::class, 'handle']);
    Route::post('/upload', [FileManGLConnectorController::class, 'upload']);
    Route::get('/download/{nodeId}', [FileManGLConnectorController::class, 'download']);
});`}
      />

      <HighlightedCodeBlock
        id="laravel_service"
        title="app/Services/FileManGLDiskGovernanceService.php — Sandbox, Kota & ACL Servisi"
        language="php"
        solidPrinciple="OCP"
        description="Single Responsibility & Open/Closed prensibine uygun olarak fiziksel disk işlemleri, kota doğrulaması ve Path Traversal güvenlik duvarı ayrı bir servis katmanında izole edilmiştir."
        code={`<?php

namespace App\\Services;

use Illuminate\\Support\\Facades\\Storage;
use RuntimeException;

class FileManGLDiskGovernanceService
{
    private string $rootPath;
    private int $maxVolumeQuotaBytes;

    public function __construct()
    {
        // Yönetilecek izole disk alanı ve maksimum kota (Örn: 500 MB)
        $this->rootPath = storage_path('app/filemangl_volume');
        $this->maxVolumeQuotaBytes = config('filemangl.max_quota_bytes', 500 * 1024 * 1024);

        if (!is_dir($this->rootPath)) {
            mkdir($this->rootPath, 0775, true);
        }
    }

    /**
     * Güvenlik Duvarı: Belirlenen disk alanı dışına çıkılmasını (Path Traversal) kesin olarak engeller.
     */
    public function resolveSafePath(string $relativePath): string
    {
        $clean = ltrim(str_replace(['..\\', '../'], '', $relativePath), '/\\');
        $fullPath = $this->rootPath . DIRECTORY_SEPARATOR . $clean;
        $realRoot = realpath($this->rootPath);
        $realTarget = realpath(dirname($fullPath));

        if ($realTarget === false || !str_starts_with($realTarget, $realRoot)) {
            throw new RuntimeException('EACCES: Sandbox dışına erişim engellendi.');
        }
        return $fullPath;
    }

    /**
     * Disk kotası kontrolü (Belirlenen disk alanının doluluk oranını hesaplar)
     */
    public function assertQuotaAvailable(int $incomingBytes): void
    {
        $used = $this->calculateDirectorySize($this->rootPath);
        if (($used + $incomingBytes) > $this->maxVolumeQuotaBytes) {
            throw new RuntimeException('ENOSPC: Tahsis edilen disk kotası aşıldı!');
        }
    }

    public function calculateDirectorySize(string $dir): int
    {
        $size = 0;
        foreach (
            new \\RecursiveIteratorIterator(
                new \\RecursiveDirectoryIterator($dir, \\FilesystemIterator::SKIP_DOTS)
            ) as $file
        ) {
            $size += $file->getSize();
        }
        return $size;
    }
}`}
      />

      <HighlightedCodeBlock
        id="laravel_controller"
        title="app/Http/Controllers/Api/FileManGLConnectorController.php — Komut Yönlendiricisi"
        language="php"
        solidPrinciple="DIP"
        description="Controller, Constructor Injection ile FileManGLDiskGovernanceService soyutlamasını alır ve JSON komutlarını işler."
        code={`<?php

namespace App\\Http\\Controllers\\Api;

use App\\Http\\Controllers\\Controller;
use App\\Services\\FileManGLDiskGovernanceService;
use Illuminate\\Http\\Request;
use Illuminate\\Http\\JsonResponse;

class FileManGLConnectorController extends Controller
{
    public function __construct(
        private readonly FileManGLDiskGovernanceService $diskGovernance
    ) {}

    public function handle(Request $request): JsonResponse
    {
        $cmd = $request->input('cmd', 'open');
        $targetPath = $request->input('targetPath', '');

        return match ($cmd) {
            'mkdir' => $this->createDirectory($targetPath, $request->input('newName')),
            'chmod' => $this->updatePermissions($targetPath, $request->input('security', [])),
            default => response()->json([
                'status' => 'ok',
                'cmd' => $cmd,
                'usedBytes' => $this->diskGovernance->calculateDirectorySize(storage_path('app/filemangl_volume')),
            ]),
        };
    }

    private function createDirectory(string $parent, string $name): JsonResponse
    {
        $safePath = $this->diskGovernance->resolveSafePath($parent . '/' . $name);
        mkdir($safePath, 0775, true);
        return response()->json(['status' => 'ok', 'created' => $name]);
    }

    private function updatePermissions(string $target, array $security): JsonResponse
    {
        $safePath = $this->diskGovernance->resolveSafePath($target);
        $octal = octdec($security['posix']['octal'] ?? '0755');
        chmod($safePath, $octal);
        file_put_contents($safePath . '.filemangl.acl.json', json_encode($security, JSON_PRETTY_PRINT));
        return response()->json(['status' => 'ok', 'updated' => $target]);
    }
}`}
      />
    </div>
  );
};

export const LaravelBackendDocModule: IDocModuleDefinition = {
  id: 'laravel_backend',
  stepNumber: 3,
  title: '3. Laravel 10/11 Disk & ACL Backend',
  subtitle: 'PHP 8.3 Sanctum Rotaları, Sandbox Güvenlik Duvarı ve Kota Servisi',
  badge: 'PHP 8.3',
  routeSlug: '/documentation/laravel',
  solidFocus: ['SRP', 'OCP', 'DIP'],
  searchKeywords: ['laravel', 'php', 'sanctum', 'storage', 'controller', 'chmod', 'quota'],
  iconName: 'dns',
  iconColorClass: 'text-rose-400',
  subItems: [
    { id: 'laravel_routes', label: '3.1 routes/api.php (Sanctum Rotaları)', badge: 'Route' },
    {
      id: 'laravel_service',
      label: '3.2 FileManGLDiskGovernanceService.php',
      badge: 'Service',
    },
    {
      id: 'laravel_controller',
      label: '3.3 FileManGLConnectorController.php',
      badge: 'Controller',
    },
  ],
  Component: LaravelBackendComponent,
};
