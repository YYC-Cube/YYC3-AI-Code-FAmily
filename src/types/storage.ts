/**
 * @file src/types/storage.ts
 * @description 存储层数据模型类型定义 — 笔记、文件、同步记录
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,storage,database
 */

/** 笔记接口 */
export interface Note {
  /** 笔记 ID */
  id: string;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 加密内容 */
  encryptedContent?: string;
  /** 标签 */
  tags?: string[];
  /** 是否加密 */
  isEncrypted: boolean;
  /** 同步状态 */
  syncStatus: 'synced' | 'pending' | 'conflict';
  /** 版本号 */
  version: number;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}

/** 文件记录 */
export interface FileRecord {
  /** 文件 ID */
  id: string;
  /** 文件名 */
  name: string;
  /** 文件路径 */
  path: string;
  /** 文件内容 */
  content: string;
  /** 文件大小 */
  size: number;
  /** 文件类型 */
  type: string;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}

/** 同步记录 */
export interface SyncRecord {
  /** 记录 ID */
  id: string;
  /** 实体类型 */
  entityType: 'note' | 'project' | 'file';
  /** 实体 ID */
  entityId: string;
  /** 操作类型 */
  action: 'create' | 'update' | 'delete';
  /** 时间戳 */
  timestamp: number;
  /** 状态 */
  status: 'pending' | 'success' | 'failed';
  /** 错误信息 */
  errorMessage?: string;
}