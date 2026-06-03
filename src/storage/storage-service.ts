/**
 * @file src/storage/storage-service.ts
 * @description 存储服务层 — 统一数据访问接口，封装 Dexie CRUD 操作
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags storage,service,crud
 */

import { db, type Note, type FileRecord } from './db';
import { encrypt, decrypt } from './encryption';
import { syncService } from './sync';

/** 存储服务类 */
export class StorageService {
  /** 创建笔记 */
  async createNote(
    note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'version'>,
    password?: string
  ): Promise<Note> {
    const now = Date.now();
    const id = crypto.randomUUID();

    let content = note.content;
    let isEncrypted = false;
    let encryptedContent: string | undefined;

    if (password) {
      const result = await encrypt(content, password);
      encryptedContent = result.encrypted;
      isEncrypted = true;
      content = ''; // 加密后清空明文字段
    }

    const newNote: Note = {
      id,
      title: note.title,
      content,
      encryptedContent,
      tags: note.tags,
      isEncrypted,
      syncStatus: 'pending',
      version: 1,
      createdAt: now,
      updatedAt: now,
    };

    await db.notes.add(newNote);
    await syncService.createSyncRecord('note', id, 'create');
    return newNote;
  }

  /** 获取笔记 */
  async getNote(id: string, password?: string): Promise<Note | undefined> {
    const note = await db.notes.get(id);
    if (!note) return undefined;

    if (note.isEncrypted && password && note.encryptedContent) {
      try {
        const [encryptedData, salt, iv] = note.encryptedContent.split(':');
        if (encryptedData && salt && iv) {
          note.content = await decrypt(encryptedData, password, salt, iv);
        }
      } catch {
        throw new Error('解密失败：密码错误或数据已损坏');
      }
    }

    return note;
  }

  /** 更新笔记 */
  async updateNote(
    id: string,
    changes: Partial<Omit<Note, 'id' | 'createdAt' | 'version'>>,
    password?: string
  ): Promise<void> {
    const note = await db.notes.get(id);
    if (!note) throw new Error(`Note not found: ${id}`);

    const updateData: Partial<Note> = {
      ...changes,
      updatedAt: Date.now(),
      version: note.version + 1,
    };

    if (password && changes.content) {
      const result = await encrypt(changes.content, password);
      updateData.encryptedContent = result.encrypted;
      updateData.isEncrypted = true;
      updateData.content = '';
    }

    await db.notes.update(id, updateData);
    await syncService.createSyncRecord('note', id, 'update');
  }

  /** 删除笔记 */
  async deleteNote(id: string): Promise<void> {
    await db.notes.delete(id);
    await syncService.createSyncRecord('note', id, 'delete');
  }

  /** 列出所有笔记 */
  async listNotes(): Promise<Note[]> {
    return db.notes.orderBy('updatedAt').reverse().toArray();
  }

  /** 创建文件记录 */
  async createFileRecord(
    file: Omit<FileRecord, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<FileRecord> {
    const now = Date.now();
    const newFile: FileRecord = {
      ...file,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    await db.files.add(newFile);
    await syncService.createSyncRecord('file', newFile.id, 'create');
    return newFile;
  }

  /** 更新文件记录 */
  async updateFileRecord(
    id: string,
    changes: Partial<Omit<FileRecord, 'id' | 'createdAt'>>
  ): Promise<void> {
    await db.files.update(id, { ...changes, updatedAt: Date.now() });
    await syncService.createSyncRecord('file', id, 'update');
  }

  /** 删除文件记录 */
  async deleteFileRecord(id: string): Promise<void> {
    await db.files.delete(id);
    await syncService.createSyncRecord('file', id, 'delete');
  }

  /** 按类型列出文件 */
  async listFilesByType(type: string): Promise<FileRecord[]> {
    return db.files.where('type').equals(type).toArray();
  }
}

/** 全局存储服务实例 */
export const storageService = new StorageService();