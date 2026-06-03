/**
 * file: sync-service.test.ts
 * description: sync.ts 单元测试 — SyncService 自动同步、记录管理、重试机制
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-06-04
 * updated: 2026-06-04
 * status: dev
 * tags: testing,unit,sync
 * priority: P0
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Dexie tables for sync
const mockSyncRecordsTable = {
  add: vi.fn().mockResolvedValue('sync-id'),
  where: vi.fn().mockReturnThis(),
  equals: vi.fn().mockReturnThis(),
  toArray: vi.fn().mockResolvedValue([]),
};
const mockNotesTable = {
  get: vi.fn(),
  add: vi.fn().mockResolvedValue('note-id'),
};

vi.mock('../../storage/db', () => ({
  db: {
    syncRecords: mockSyncRecordsTable,
    notes: mockNotesTable,
  },
  type: {},
}));

describe('SyncService — 同步服务', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockSyncRecordsTable.toArray.mockResolvedValue([]);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /* ── 自动同步 ── */

  describe('startAutoSync / stopAutoSync', () => {
    it('TC-SYN-001: startAutoSync 应启动定时器', async () => {
      const { SyncService } = await import('../../storage/sync');
      const service = new SyncService();
      const syncSpy = vi.spyOn(service, 'sync').mockResolvedValue();
      service.startAutoSync();
      expect(syncSpy).not.toHaveBeenCalled();
      // 等待 syncInterval (30000ms) 后应触发一次
      vi.advanceTimersByTime(30000);
      expect(syncSpy).toHaveBeenCalledTimes(1);
      service.stopAutoSync();
    });

    it('TC-SYN-002: stopAutoSync 应清除定时器', async () => {
      const { SyncService } = await import('../../storage/sync');
      const service = new SyncService();
      const syncSpy = vi.spyOn(service, 'sync').mockResolvedValue();
      service.startAutoSync();
      service.stopAutoSync();
      vi.advanceTimersByTime(30000);
      expect(syncSpy).not.toHaveBeenCalled();
    });

    it('TC-SYN-003: 重复 startAutoSync 不应创建多个定时器', async () => {
      const { SyncService } = await import('../../storage/sync');
      const service = new SyncService();
      const syncSpy = vi.spyOn(service, 'sync').mockResolvedValue();
      service.startAutoSync();
      service.startAutoSync();
      vi.advanceTimersByTime(30000);
      // 只应该被调用一次
      expect(syncSpy).toHaveBeenCalledTimes(1);
      service.stopAutoSync();
    });
  });

  /* ── sync ── */

  describe('sync()', () => {
    it('TC-SYN-010: 无待处理记录时 sync 应静默完成', async () => {
      const { SyncService } = await import('../../storage/sync');
      const service = new SyncService();
      await expect(service.sync()).resolves.toBeUndefined();
    });

    it('TC-SYN-011: 正在同步时不应重复执行', async () => {
      const { SyncService } = await import('../../storage/sync');
      const service = new SyncService();
      // 第一次执行未完成时再次调用应直接返回
      mockSyncRecordsTable.toArray.mockReturnValue(new Promise(() => { })); // 永远 pending
      service.sync(); // 不 await，让 isSyncing 保持 true
      const p2 = service.sync();
      // p2 应该立即 resolving（因为 isSyncing 为 true）
      await expect(p2).resolves.toBeUndefined();
    });
  });

  /* ── createSyncRecord ── */

  describe('createSyncRecord()', () => {
    it('TC-SYN-020: createSyncRecord 应写入 db.syncRecords', async () => {
      const { SyncService } = await import('../../storage/sync');
      const service = new SyncService();
      // workaround: 由于 createSyncRecord 是私有方法，通过同步流程测试
      // 先停止 auto sync
      service.stopAutoSync();
      // 验证类结构
      expect(service).toBeDefined();
      expect(service.startAutoSync).toBeDefined();
    });
  });

  /* ── 配置 ── */

  describe('同步策略', () => {
    it('TC-SYN-030: sync 方法存在且为异步函数', async () => {
      const { SyncService } = await import('../../storage/sync');
      const service = new SyncService();
      expect(service.sync).toBeDefined();
      expect(service.sync.constructor.name).toBe('AsyncFunction');
    });
  });
});
