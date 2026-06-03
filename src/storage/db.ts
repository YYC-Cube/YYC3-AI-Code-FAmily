/**
 * @file src/storage/db.ts
 * @description Dexie.js + IndexedDB 数据库定义与数据模型
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags storage,database,dexie,indexeddb
 */

import Dexie, { type Table } from 'dexie';

/** 笔记数据模型 */
export interface Note {
  id: string;
  title: string;
  content: string;
  encryptedContent?: string;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
  isEncrypted: boolean;
  syncStatus: 'synced' | 'pending' | 'conflict';
  version: number;
}

/** 项目数据模型 */
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  settings: Record<string, unknown>;
}

/** 文件记录数据模型 */
export interface FileRecord {
  id: string;
  name: string;
  path: string;
  content: string;
  size: number;
  type: string;
  createdAt: number;
  updatedAt: number;
}

/** 同步记录数据模型 */
export interface SyncRecord {
  id: string;
  entityType: 'note' | 'project' | 'file';
  entityId: string;
  action: 'create' | 'update' | 'delete';
  timestamp: number;
  status: 'pending' | 'success' | 'failed';
  errorMessage?: string;
}

/** AI 对话记录 */
export interface AIConversation {
  id: string;
  title: string;
  messages: {
    role: 'system' | 'user' | 'assistant' | 'tool';
    content: string;
    timestamp: number;
  }[];
  modelId: string;
  provider: string;
  createdAt: number;
  updatedAt: number;
  tags?: string[];
}

/** 应用数据库类 */
export class AppDB extends Dexie {
  notes!: Table<Note, string>;
  projects!: Table<Project, string>;
  files!: Table<FileRecord, string>;
  syncRecords!: Table<SyncRecord, string>;
  conversations!: Table<AIConversation, string>;

  constructor() {
    super('yyc3-ai-family-db');

    this.version(1).stores({
      notes: 'id, createdAt, updatedAt, syncStatus',
      projects: 'id, createdAt, updatedAt',
      files: 'id, name, type, createdAt, updatedAt',
      syncRecords: 'id, entityType, entityId, timestamp, status',
    });

    this.version(2).stores({
      notes: 'id, createdAt, updatedAt, tags, syncStatus, isEncrypted',
      projects: 'id, createdAt, updatedAt',
      files: 'id, name, type, createdAt, updatedAt',
      syncRecords: 'id, entityType, entityId, timestamp, status',
    }).upgrade(async (tx) => {
      const notes = await tx.table('notes').toArray();
      await Promise.all(
        notes.map((note) =>
          tx.table('notes').update(note.id, { isEncrypted: false })
        )
      );
    });

    this.version(3).stores({
      notes: 'id, createdAt, updatedAt, tags, syncStatus, isEncrypted, version',
      projects: 'id, createdAt, updatedAt',
      files: 'id, name, type, createdAt, updatedAt',
      syncRecords: 'id, entityType, entityId, timestamp, status',
    }).upgrade(async (tx) => {
      const notes = await tx.table('notes').toArray();
      await Promise.all(
        notes.map((note) =>
          tx.table('notes').update(note.id, { version: 1 })
        )
      );
    });

    // 版本 4：添加对话记录表
    this.version(4).stores({
      notes: 'id, createdAt, updatedAt, tags, syncStatus, isEncrypted, version',
      projects: 'id, createdAt, updatedAt',
      files: 'id, name, type, createdAt, updatedAt',
      syncRecords: 'id, entityType, entityId, timestamp, status',
      conversations: 'id, createdAt, updatedAt, provider, modelId',
    });
  }
}

/** 全局数据库实例 */
export const db = new AppDB();