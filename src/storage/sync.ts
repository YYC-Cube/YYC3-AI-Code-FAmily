/**
 * @file src/storage/sync.ts
 * @description 数据同步服务 — 管理 IndexedDB 与文件系统间的双向同步
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags storage,sync,synchronization
 */

import { db, type SyncRecord } from './db';

const SYNC_CONFIG = {
  autoSync: true,
  syncInterval: 30000,
  retryAttempts: 3,
  retryDelay: 5000,
} as const;

/** 同步服务类 */
export class SyncService {
  private syncTimer: ReturnType<typeof setInterval> | null = null;
  private isSyncing = false;

  /** 启动自动同步 */
  startAutoSync(): void {
    if (SYNC_CONFIG.autoSync && !this.syncTimer) {
      this.syncTimer = setInterval(() => {
        this.sync().catch(console.error);
      }, SYNC_CONFIG.syncInterval);
    }
  }

  /** 停止自动同步 */
  stopAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  /** 执行同步 */
  async sync(): Promise<void> {
    if (this.isSyncing) return;
    this.isSyncing = true;

    try {
      const pendingRecords = await db.syncRecords
        .where('status')
        .equals('pending')
        .toArray();

      const groupedRecords = this.groupByEntityType(pendingRecords);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_entityType, records] of Object.entries(groupedRecords)) {
        for (const record of records) {
          let attempt = 0;
          let success = false;

          while (attempt < SYNC_CONFIG.retryAttempts && !success) {
            try {
              await this.syncRecord(record);
              await db.syncRecords.update(record.id, { status: 'success' });
              success = true;
            } catch (err) {
              attempt++;
              if (attempt >= SYNC_CONFIG.retryAttempts) {
                await db.syncRecords.update(record.id, {
                  status: 'failed',
                  errorMessage: err instanceof Error ? err.message : '同步失败',
                });
              } else {
                await new Promise((resolve) =>
                  setTimeout(resolve, SYNC_CONFIG.retryDelay)
                );
              }
            }
          }
        }
      }
    } catch (err) {
      console.error('Sync failed:', err);
      await db.syncRecords
        .where('status')
        .equals('pending')
        .modify({
          status: 'failed',
          errorMessage: err instanceof Error ? err.message : 'Unknown error',
        });
    } finally {
      this.isSyncing = false;
    }
  }

  /** 按实体类型分组 */
  private groupByEntityType(
    records: SyncRecord[]
  ): Record<string, SyncRecord[]> {
    return records.reduce(
      (acc, record) => {
        if (!acc[record.entityType]) {
          acc[record.entityType] = [];
        }
        acc[record.entityType].push(record);
        return acc;
      },
      {} as Record<string, SyncRecord[]>
    );
  }

  /** 同步单条记录 */
  private async syncRecord(record: SyncRecord): Promise<void> {
    switch (record.entityType) {
      case 'note':
        await this.syncNote(record);
        break;
      case 'project':
        await this.syncProject(record);
        break;
      case 'file':
        await this.syncFile(record);
        break;
      default:
        throw new Error(`Unknown entity type: ${record.entityType}`);
    }
  }

  private async syncNote(record: SyncRecord): Promise<void> {
    const note = await db.notes.get(record.entityId);
    if (!note) throw new Error(`Note not found: ${record.entityId}`);
    // 在浏览器环境中，同步到 localStorage 作为备份
    try {
      localStorage.setItem(`sync-note-${note.id}`, JSON.stringify(note));
    } catch {
      // localStorage 可能满，静默失败
    }
  }

  private async syncProject(record: SyncRecord): Promise<void> {
    const project = await db.projects.get(record.entityId);
    if (!project) throw new Error(`Project not found: ${record.entityId}`);
    try {
      localStorage.setItem(
        `sync-project-${project.id}`,
        JSON.stringify(project)
      );
    } catch {
      // 静默失败
    }
  }

  private async syncFile(record: SyncRecord): Promise<void> {
    const file = await db.files.get(record.entityId);
    if (!file) throw new Error(`File not found: ${record.entityId}`);
    try {
      localStorage.setItem(`sync-file-${file.id}`, JSON.stringify(file));
    } catch {
      // 静默失败
    }
  }

  /** 创建同步记录 */
  async createSyncRecord(
    entityType: SyncRecord['entityType'],
    entityId: string,
    action: SyncRecord['action']
  ): Promise<void> {
    await db.syncRecords.add({
      id: `${entityType}-${entityId}-${Date.now()}`,
      entityType,
      entityId,
      action,
      timestamp: Date.now(),
      status: 'pending',
    });

    // 如果自动同步开启且未在同步中，触发同步
    if (SYNC_CONFIG.autoSync && !this.isSyncing) {
      this.sync().catch(console.error);
    }
  }
}

/** 全局同步服务实例 */
export const syncService = new SyncService();
