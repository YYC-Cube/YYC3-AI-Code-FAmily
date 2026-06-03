/**
 * @file src/types/collaboration.ts
 * @description 协作相关类型定义 — 协作用户、协作状态
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,collaboration,realtime
 */

/** 协作用户 */
export interface Collaborator {
  /** 用户 ID */
  userId: string;
  /** 用户名 */
  username: string;
  /** 头像 */
  avatar?: string;
  /** 光标位置 */
  cursor?: { line: number; column: number };
  /** 选区 */
  selection?: { start: number; end: number };
  /** 颜色 */
  color: string;
  /** 是否在线 */
  online: boolean;
}

/** 协作状态 */
export interface CollaborationState {
  /** 文档 ID */
  documentId: string;
  /** 协作者列表 */
  collaborators: Collaborator[];
  /** 是否已连接 */
  connected: boolean;
  /** 同步状态 */
  syncStatus: 'synced' | 'syncing' | 'conflict';
}