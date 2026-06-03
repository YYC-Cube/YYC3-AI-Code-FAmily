/**
 * @file src/types/project.ts
 * @description 项目相关类型定义
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,project
 */

/** 项目状态 */
export type ProjectStatus = 'draft' | 'active' | 'archived' | 'deleted';

/** 项目可见性 */
export type ProjectVisibility = 'private' | 'public' | 'shared';

/** 项目设置 */
export interface ProjectSettings {
  /** 是否启用自动保存 */
  autoSave: boolean;
  /** 自动保存间隔（毫秒） */
  autoSaveInterval: number;
  /** 默认编辑器类型 */
  defaultEditor: 'richtext' | 'code' | 'markdown';
  /** 是否启用实时协作 */
  enableCollaboration: boolean;
  /** 是否启用版本控制 */
  enableVersionControl: boolean;
  /** 主题设置 */
  theme: 'light' | 'dark' | 'auto';
}

/** 项目接口 */
export interface Project {
  /** 项目 ID */
  id: string;
  /** 项目名称 */
  name: string;
  /** 项目描述 */
  description?: string;
  /** 项目所有者 ID */
  ownerId: string;
  /** 状态 */
  status: ProjectStatus;
  /** 可见性 */
  visibility: ProjectVisibility;
  /** 项目设置 */
  settings: ProjectSettings;
  /** 创建时间 */
  createdAt: number;
  /** 更新时间 */
  updatedAt: number;
}