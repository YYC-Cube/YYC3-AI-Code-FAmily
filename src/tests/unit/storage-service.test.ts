/**
 * file: storage-service.test.ts
 * description: storage-service.ts 单元测试 — StorageService CRUD、加密笔记、文件记录管理
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-06-04
 * updated: 2026-06-04
 * status: dev
 * tags: testing,unit,storage,service,crud
 * priority: P0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Dexie tables
const mockNotesTable = {
  add: vi.fn().mockResolvedValue('note-id-1'),
  get: vi.fn(),
  update: vi.fn().mockResolvedValue(1),
  delete: vi.fn().mockResolvedValue(undefined),
  orderBy: vi.fn().mockReturnThis(),
  reverse: vi.fn().mockReturnThis(),
  toArray: vi.fn().mockResolvedValue([]),
};
const mockFilesTable = {
  add: vi.fn().mockResolvedValue('file-id-1'),
  get: vi.fn(),
  update: vi.fn().mockResolvedValue(1),
  delete: vi.fn().mockResolvedValue(undefined),
  where: vi.fn().mockReturnThis(),
  equals: vi.fn().mockReturnThis(),
  toArray: vi.fn().mockResolvedValue([]),
};

vi.mock('../../storage/db', () => ({
  db: {
    notes: mockNotesTable,
    files: mockFilesTable,
    syncRecords: {
      add: vi.fn().mockResolvedValue('sync-id'),
      where: vi.fn().mockReturnThis(),
      equals: vi.fn().mockReturnThis(),
      toArray: vi.fn().mockResolvedValue([]),
    },
  },
}));

vi.mock('../../storage/sync', () => ({
  syncService: {
    createSyncRecord: vi.fn().mockResolvedValue(undefined),
  },
}));

// Mock crypto.randomUUID
const mockUUID = '550e8400-e29b-41d4-a716-446655440000';
vi.stubGlobal('crypto', {
  ...globalThis.crypto,
  randomUUID: vi.fn(() => mockUUID),
  getRandomValues: (arr: Uint8Array) => {
    for (let i = 0; i < arr.length; i++) arr[i] = i % 256;
    return arr;
  },
  subtle: {
    importKey: vi.fn().mockResolvedValue({} as CryptoKey),
    deriveKey: vi.fn().mockResolvedValue({} as CryptoKey),
    encrypt: vi.fn().mockResolvedValue(new ArrayBuffer(32)),
  } as unknown as SubtleCrypto,
});

describe('StorageService — 存储服务', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNotesTable.toArray.mockResolvedValue([]);
    mockFilesTable.toArray.mockResolvedValue([]);
  });

  /* ── createNote ── */

  describe('createNote()', () => {
    it('TC-STO-001: 创建非加密笔记应返回完整 Note 对象', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      const note = await service.createNote({ title: '测试笔记', content: 'Hello', tags: [], isEncrypted: false, syncStatus: 'pending' });
      expect(note.id).toBe(mockUUID);
      expect(note.title).toBe('测试笔记');
      expect(note.content).toBe('Hello');
      expect(note.isEncrypted).toBe(false);
      expect(note.syncStatus).toBe('pending');
      expect(note.version).toBe(1);
      expect(note.createdAt).toBeGreaterThan(0);
      expect(note.updatedAt).toBeGreaterThan(0);
    });

    it('TC-STO-002: 创建笔记应写入 db.notes', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.createNote({ title: 'T', content: 'C', tags: [], isEncrypted: false, syncStatus: 'pending' });
      expect(mockNotesTable.add).toHaveBeenCalledTimes(1);
      const addedNote = mockNotesTable.add.mock.calls[0][0];
      expect(addedNote.title).toBe('T');
    });

    it('TC-STO-003: 创建笔记后应创建同步记录', async () => {
      const { syncService } = await import('../../storage/sync');
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.createNote({ title: 'T', content: 'C', tags: [], isEncrypted: false, syncStatus: 'pending' });
      expect(syncService.createSyncRecord).toHaveBeenCalledWith('note', mockUUID, 'create');
    });

    it('TC-STO-004: 带密码创建笔记应标记为已加密', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      const note = await service.createNote({ title: 'Secret', content: '机密', tags: [], isEncrypted: false, syncStatus: 'pending' }, 'mypass');
      expect(note.isEncrypted).toBe(true);
      expect(note.content).toBe('');
      expect(note.encryptedContent).toBeTruthy();
    });
  });

  /* ── getNote ── */

  describe('getNote()', () => {
    it('TC-STO-010: 获取已存在的笔记应返回 Note', async () => {
      const mockNote = { id: 'n1', title: 'T', content: 'C', isEncrypted: false, version: 1 };
      mockNotesTable.get.mockResolvedValue(mockNote);
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      const result = await service.getNote('n1');
      expect(result).toBeDefined();
      expect(result!.content).toBe('C');
    });

    it('TC-STO-011: 获取不存在的笔记应返回 undefined', async () => {
      mockNotesTable.get.mockResolvedValue(undefined);
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      const result = await service.getNote('nope');
      expect(result).toBeUndefined();
    });
  });

  /* ── updateNote ── */

  describe('updateNote()', () => {
    it('TC-STO-020: 更新笔记应增加版本号', async () => {
      mockNotesTable.get.mockResolvedValue({ id: 'n1', version: 1, title: 'Old' });
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.updateNote('n1', { title: 'New' });
      expect(mockNotesTable.update).toHaveBeenCalledWith('n1', expect.objectContaining({ version: 2 }));
    });

    it('TC-STO-021: 更新不存在的笔记应抛出错误', async () => {
      mockNotesTable.get.mockResolvedValue(undefined);
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await expect(service.updateNote('nope', { title: 'X' })).rejects.toThrow('Note not found');
    });
  });

  /* ── deleteNote ── */

  describe('deleteNote()', () => {
    it('TC-STO-030: deleteNote 应调用 db.notes.delete', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.deleteNote('n1');
      expect(mockNotesTable.delete).toHaveBeenCalledWith('n1');
    });

    it('TC-STO-031: deleteNote 后应创建 sync 删除记录', async () => {
      const { syncService } = await import('../../storage/sync');
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.deleteNote('n1');
      expect(syncService.createSyncRecord).toHaveBeenCalledWith('note', 'n1', 'delete');
    });
  });

  /* ── listNotes ── */

  describe('listNotes()', () => {
    it('TC-STO-040: listNotes 应返回按 updatedAt 降序排列的笔记', async () => {
      const notes = [
        { id: '1', title: 'A', updatedAt: 100 },
        { id: '2', title: 'B', updatedAt: 200 },
      ];
      mockNotesTable.toArray.mockResolvedValue(notes);
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      const result = await service.listNotes();
      expect(result.length).toBe(2);
      expect(mockNotesTable.orderBy).toHaveBeenCalledWith('updatedAt');
    });
  });

  /* ── 文件记录 ── */

  describe('文件记录管理', () => {
    it('TC-STO-050: createFileRecord 应返回包含 id 的 FileRecord', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      const file = await service.createFileRecord({
        name: 'test.ts', path: '/test.ts', content: 'code', size: 4, type: 'typescript',
      });
      expect(file.id).toBe(mockUUID);
      expect(file.name).toBe('test.ts');
      expect(file.createdAt).toBeGreaterThan(0);
    });

    it('TC-STO-051: updateFileRecord 应调用 db.files.update', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.updateFileRecord('f1', { name: 'updated.ts' });
      expect(mockFilesTable.update).toHaveBeenCalledWith('f1', expect.objectContaining({ name: 'updated.ts' }));
    });

    it('TC-STO-052: deleteFileRecord 应调用 db.files.delete', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.deleteFileRecord('f1');
      expect(mockFilesTable.delete).toHaveBeenCalledWith('f1');
    });

    it('TC-STO-053: listFilesByType 应按类型过滤', async () => {
      const { StorageService } = await import('../../storage/storage-service');
      const service = new StorageService();
      await service.listFilesByType('image');
      expect(mockFilesTable.where).toHaveBeenCalledWith('type');
      expect(mockFilesTable.equals).toHaveBeenCalledWith('image');
    });
  });
});
