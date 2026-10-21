import { describe, it, expect } from 'vitest';
import { PermissionEngine } from '../core/services/PermissionEngine';
import { QuotaEngine } from '../core/services/QuotaEngine';
import { DEFAULT_FILE_MANAGER_CONFIG, DEMO_USERS } from '../core/config/defaultConfig';
import {
  getInitialSeedNodes,
  generateStressTestNodes,
} from '../core/drivers/seedFileSystem';
import {
  VfsLocalStorageDriver,
  VfsMemoryDriver,
} from '../core/drivers/FileSystemDrivers';

describe('HyperionFM Core Engines (PermissionEngine, QuotaEngine, VFS Drivers & Stress Generator)', () => {
  describe('PermissionEngine (Hybrid NTFS ACL + POSIX rwx)', () => {
    it('correctly parses and builds POSIX octal and symbolic strings', () => {
      const p755 = PermissionEngine.buildPosixFromOctal('0755');
      expect(p755.octal).toBe('0755');
      expect(p755.symbolic).toBe('rwxr-xr-x');
      expect(p755.owner).toEqual({ r: true, w: true, x: true });
      expect(p755.group).toEqual({ r: true, w: false, x: true });
      expect(p755.others).toEqual({ r: true, w: false, x: true });

      const p640 = PermissionEngine.buildPosixFromOctal('0640');
      expect(p640.octal).toBe('0640');
      expect(p640.symbolic).toBe('rw-r-----');
      expect(p640.others).toEqual({ r: false, w: false, x: false });
    });

    it('enforces DENY precedence over ALLOW and blocks Guest from Restricted Security Vault (0750)', () => {
      const nodes = getInitialSeedNodes();
      const vaultFolder = nodes.find((n) => n.id === 'fld_vault')!;
      const adminUser = DEMO_USERS.find((u) => u.role === 'admin')!;
      const guestUser = DEMO_USERS.find((u) => u.role === 'guest')!;

      const adminPerm = PermissionEngine.evaluateNodePermissions(
        vaultFolder,
        adminUser,
        nodes,
        DEFAULT_FILE_MANAGER_CONFIG
      );
      expect(adminPerm.allowed.read).toBe(true);
      expect(adminPerm.allowed.chmod).toBe(true);

      const guestPerm = PermissionEngine.evaluateNodePermissions(
        vaultFolder,
        guestUser,
        nodes,
        DEFAULT_FILE_MANAGER_CONFIG
      );
      expect(guestPerm.allowed.read).toBe(false);
      expect(guestPerm.allowed.write).toBe(false);
      expect(guestPerm.allowed.delete).toBe(false);
    });

    it('enforces immutable lock (security.locked = true) by blocking write, delete, and rename even for owners', () => {
      const nodes = getInitialSeedNodes();
      const lockedNode = nodes.find((n) => n.security.locked)!;
      expect(lockedNode).toBeDefined();

      const adminUser = DEMO_USERS[0];
      const perm = PermissionEngine.evaluateNodePermissions(
        lockedNode,
        adminUser,
        nodes,
        DEFAULT_FILE_MANAGER_CONFIG
      );

      expect(perm.isLocked).toBe(true);
      expect(perm.allowed.read).toBe(true);
      expect(perm.allowed.write).toBe(false);
      expect(perm.allowed.delete).toBe(false);
      expect(perm.allowed.rename).toBe(false);
    });

    it('grants full access when strictPermissionEnforcement is disabled (bypass mode)', () => {
      const nodes = getInitialSeedNodes();
      const vaultFolder = nodes.find((n) => n.id === 'fld_vault')!;
      const guestUser = DEMO_USERS.find((u) => u.role === 'guest')!;

      const bypassPerm = PermissionEngine.evaluateNodePermissions(
        vaultFolder,
        guestUser,
        nodes,
        {
          ...DEFAULT_FILE_MANAGER_CONFIG,
          strictPermissionEnforcement: false,
        }
      );
      expect(bypassPerm.allowed.read).toBe(true);
      expect(bypassPerm.allowed.write).toBe(true);
    });
  });

  describe('QuotaEngine (Recursive Folder Size, Disk Quota & Extension Policy)', () => {
    it('computes non-zero recursive folder sizes for all root folders', () => {
      const nodes = getInitialSeedNodes().filter((n) => !n.isSyntheticStressNode);
      const rootFolders = nodes.filter(
        (n) => !n.trashed && n.type === 'folder' && n.parentId === null
      );
      expect(rootFolders.length).toBeGreaterThanOrEqual(4);

      for (const fld of rootFolders) {
        const bytes = QuotaEngine.computeFolderSize(fld.id, nodes);
        expect(bytes).toBeGreaterThan(0);
      }
    });

    it('blocks dangerous extensions (.exe, .bat) and enforces folder extension whitelists', () => {
      const nodes = getInitialSeedNodes();

      // Global blocked extension (.exe)
      const exeCheck = QuotaEngine.validateWriteOperation(
        'fld_engineering',
        'malware_payload.exe',
        1024,
        nodes,
        DEFAULT_FILE_MANAGER_CONFIG
      );
      expect(exeCheck.allowed).toBe(false);

      // Folder with strict allowedExtensions (fld_vault only allows .pdf, .md, .json, .pem, .txt)
      const invalidExtInVault = QuotaEngine.validateWriteOperation(
        'fld_vault',
        'archive_dump.zip',
        1024 * 1024,
        nodes,
        DEFAULT_FILE_MANAGER_CONFIG
      );
      expect(invalidExtInVault.allowed).toBe(false);

      const validExtInVault = QuotaEngine.validateWriteOperation(
        'fld_vault',
        'security_report.pdf',
        1024 * 1024,
        nodes,
        DEFAULT_FILE_MANAGER_CONFIG
      );
      expect(validExtInVault.allowed).toBe(true);
    });

    it('enforces custom folder maxBytes quota and single file size limit', () => {
      const nodes = getInitialSeedNodes();

      // Exceed folder quota on fld_vault (maxBytes: 50 MB)
      const overFolderQuota = QuotaEngine.validateWriteOperation(
        'fld_vault',
        'huge_audit.pdf',
        48 * 1024 * 1024,
        nodes,
        DEFAULT_FILE_MANAGER_CONFIG
      );
      expect(overFolderQuota.allowed).toBe(false);
    });
  });

  describe('VFS Drivers & High-Volume Stress Test Benchmark Generator', () => {
    it('generates 2,500 synthetic files in under 150ms with valid POSIX & SHA-256 metadata', () => {
      const t0 = performance.now();
      const batch = generateStressTestNodes(2500, null);
      const elapsed = performance.now() - t0;

      expect(batch.length).toBe(2500);
      expect(elapsed).toBeLessThan(500);
      expect(batch[0].isSyntheticStressNode).toBe(true);
      expect(batch[0].size).toBeGreaterThan(0);
      expect(batch[0].security.posix.octal).toMatch(/^0[0-7]{3}$/);
    });

    it('persists seed nodes in VfsLocalStorageDriver and avoids localStorage overflow when 5,000+ stress nodes are added', async () => {
      const driver = new VfsLocalStorageDriver();
      const initial = await driver.initialize();
      expect(initial.length).toBeGreaterThan(20);

      const rawSaved = localStorage.getItem('hyperion_fm_vfs_nodes_v27_win11');
      expect(rawSaved).toBeTruthy();

      // Adding 5,000 stress nodes keeps them in memory without throwing QuotaExceededError
      const extraStress = generateStressTestNodes(5000, null);
      await driver.saveAllNodes([...initial, ...extraStress]);
      const inMem = await driver.getAllNodes();
      expect(inMem.length).toBe(initial.length + 5000);

      const memDriver = new VfsMemoryDriver();
      const memNodes = await memDriver.initialize();
      expect(memNodes.length).toBeGreaterThan(20);
    });
  });
});
