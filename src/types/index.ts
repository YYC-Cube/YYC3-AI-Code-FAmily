/**
 * @file src/types/index.ts
 * @description 类型定义统一导出入口
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,exports
 */

export type { Environment, AppConfig, EnvConfig } from './config';
export type { UserRole, UserStatus, User, AuthUser } from './user';
export type { ProjectStatus, ProjectVisibility, ProjectSettings, Project } from './project';
export type { EditorType, EditorState, EditorConfig } from './editor';
export type { PanelType, Panel, LayoutConfig } from './layout';
export type { AIProvider, AIModel, AIMessageRole, AIMessage, AIRequestConfig, AIResponse } from './ai';
export type { Note, FileRecord, SyncRecord } from './storage';
export type { Collaborator, CollaborationState } from './collaboration';
export type { ChatMessage, ChatSession, ThemeMode } from './chat';
export type {
  OptionalKeys,
  RequiredKeys,
  DeepPartial,
  DeepReadonly,
  UnionToIntersection,
  TupleToUnion,
  PromiseType,
} from './utils';