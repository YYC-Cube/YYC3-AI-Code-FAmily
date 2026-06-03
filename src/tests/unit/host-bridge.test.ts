/**
 * file: host-bridge.test.ts
 * description: host.ts 单元测试 — 虚拟文件系统 CRUD、批量操作、边界条件
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-06-04
 * updated: 2026-06-04
 * status: dev
 * tags: testing,unit,host,bridge,filesystem
 * priority: P0
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// jsdom 不提供 URL.createObjectURL / revokeObjectURL
if (typeof URL.createObjectURL === 'undefined') {
  URL.createObjectURL = vi.fn(() => 'blob:mock');
}
if (typeof URL.revokeObjectURL === 'undefined') {
  URL.revokeObjectURL = vi.fn();
}

describe('HostBridge — 宿主机文件系统桥接', () => {
  beforeEach(async () => {
    // 每次测试前清理虚拟文件系统（通过 HostBridge 内部操作）
    const { HostBridge } = await import('../../bridge/host');
    const entries = await HostBridge.readDir('/');
    for (const entry of entries) {
      if (entry.isDir) await HostBridge.removeDir(entry.path);
      else await HostBridge.removeFile(entry.path);
    }
  });

  /* ── 写入 / 读取 ── */

  describe('writeFile / readFile', () => {
    it('TC-HST-001: writeFile 后 readFile 应返回相同内容', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/test/hello.txt', 'Hello World');
      const content = await HostBridge.readFile('/test/hello.txt');
      expect(content).toBe('Hello World');
    });

    it('TC-HST-002: 读取不存在的文件应抛出错误', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await expect(HostBridge.readFile('/not-exists.txt')).rejects.toThrow('File not found');
    });

    it('TC-HST-003: 写入中文内容应正确存储', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/test/chinese.txt', '你好世界');
      const content = await HostBridge.readFile('/test/chinese.txt');
      expect(content).toBe('你好世界');
    });

    it('TC-HST-004: 覆盖写入应更新内容', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/test/overwrite.txt', 'old');
      await HostBridge.writeFile('/test/overwrite.txt', 'new');
      const content = await HostBridge.readFile('/test/overwrite.txt');
      expect(content).toBe('new');
    });
  });

  /* ── 文件存在性 ── */

  describe('fileExists', () => {
    it('TC-HST-010: 已写入的文件应返回 true', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/test/exists.txt', 'data');
      const exists = await HostBridge.fileExists('/test/exists.txt');
      expect(exists).toBe(true);
    });

    it('TC-HST-011: 不存在的文件应返回 false', async () => {
      const { HostBridge } = await import('../../bridge/host');
      const exists = await HostBridge.fileExists('/test/nope.txt');
      expect(exists).toBe(false);
    });
  });

  /* ── 目录操作 ── */

  describe('createDir / readDir', () => {
    it('TC-HST-020: 创建目录后 readDir 应返回包含该目录', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.createDir('/mydir');
      const entries = await HostBridge.readDir('/');
      expect(entries.some(e => e.path === '/mydir')).toBe(true);
    });

    it('TC-HST-021: readDir 返回的条目应具有正确属性', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/test/file.txt', 'data');
      const entries = await HostBridge.readDir('/test');
      expect(entries.length).toBe(1);
      expect(entries[0].name).toBe('file.txt');
      expect(entries[0].isFile).toBe(true);
      expect(entries[0].isDir).toBe(false);
      expect(entries[0].size).toBe(4);
    });
  });

  /* ── 删除 ── */

  describe('removeFile / removeDir', () => {
    it('TC-HST-030: 删除文件后 readFile 应抛出错误', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/test/del.txt', 'bye');
      await HostBridge.removeFile('/test/del.txt');
      await expect(HostBridge.readFile('/test/del.txt')).rejects.toThrow('File not found');
    });

    it('TC-HST-031: 删除目录应移除其中所有文件', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/dir/a.txt', 'a');
      await HostBridge.writeFile('/dir/b.txt', 'b');
      await HostBridge.removeDir('/dir');
      const exists = await HostBridge.fileExists('/dir/a.txt');
      expect(exists).toBe(false);
    });
  });

  /* ── 重命名 ── */

  describe('renameFile', () => {
    it('TC-HST-040: 重命名后新路径可读，旧路径不可读', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/old.txt', 'content');
      await HostBridge.renameFile('/old.txt', '/new.txt');
      const content = await HostBridge.readFile('/new.txt');
      expect(content).toBe('content');
      await expect(HostBridge.readFile('/old.txt')).rejects.toThrow('File not found');
    });

    it('TC-HST-041: 重命名不存在的文件应抛出错误', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await expect(HostBridge.renameFile('/nope', '/new')).rejects.toThrow('File not found');
    });
  });

  /* ── 元数据 ── */

  describe('getFileMetadata', () => {
    it('TC-HST-050: 应返回正确的元数据', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/test/meta.txt', 'metadata');
      const meta = await HostBridge.getFileMetadata('/test/meta.txt');
      expect(meta.path).toBe('/test/meta.txt');
      expect(meta.name).toBe('meta.txt');
      expect(meta.isFile).toBe(true);
      expect(meta.size).toBe(8);
    });
  });

  /* ── 批量操作 ── */

  describe('批量操作', () => {
    it('TC-HST-060: readFiles 应返回 Map 包含所有已存在文件', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/a.txt', 'aaa');
      await HostBridge.writeFile('/b.txt', 'bbb');
      const result = await HostBridge.readFiles(['/a.txt', '/b.txt']);
      expect(result.get('/a.txt')).toBe('aaa');
      expect(result.get('/b.txt')).toBe('bbb');
      expect(result.size).toBe(2);
    });

    it('TC-HST-061: readFiles 中不存在的文件应跳过（不抛错）', async () => {
      const { HostBridge } = await import('../../bridge/host');
      await HostBridge.writeFile('/exists.txt', 'data');
      const result = await HostBridge.readFiles(['/exists.txt', '/nope.txt']);
      expect(result.get('/exists.txt')).toBe('data');
      expect(result.has('/nope.txt')).toBe(false);
    });

    it('TC-HST-062: writeFiles 应写入所有文件', async () => {
      const { HostBridge } = await import('../../bridge/host');
      const files = new Map([
        ['/batch/1.txt', 'one'],
        ['/batch/2.txt', 'two'],
      ]);
      await HostBridge.writeFiles(files);
      const c1 = await HostBridge.readFile('/batch/1.txt');
      const c2 = await HostBridge.readFile('/batch/2.txt');
      expect(c1).toBe('one');
      expect(c2).toBe('two');
    });
  });

  /* ── 文件监控 ── */

  describe('watchFile', () => {
    it('TC-HST-070: 返回包含 unwatch 方法的句柄', async () => {
      const { HostBridge } = await import('../../bridge/host');
      const handle = await HostBridge.watchFile('/test.txt', () => {});
      expect(handle).toHaveProperty('unwatch');
      expect(typeof handle.unwatch).toBe('function');
      await expect(handle.unwatch()).resolves.toBeUndefined();
    });
  });
});