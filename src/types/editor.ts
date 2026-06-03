/**
 * @file src/types/editor.ts
 * @description 编辑器相关类型定义
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,editor
 */

/** 编辑器类型 */
export type EditorType = 'richtext' | 'code' | 'markdown';

/** 编辑器状态 */
export interface EditorState {
  /** 编辑器类型 */
  type: EditorType;
  /** 内容 */
  content: string;
  /** 是否已修改 */
  isDirty: boolean;
  /** 光标位置 */
  cursorPosition: { line: number; column: number };
  /** 选区 */
  selection?: { start: number; end: number };
  /** 是否只读 */
  readOnly: boolean;
}

/** 编辑器配置 */
export interface EditorConfig {
  /** 编辑器类型 */
  type: EditorType;
  /** 语言模式（代码编辑器） */
  language?: string;
  /** 主题 */
  theme?: string;
  /** 字体大小 */
  fontSize?: number;
  /** 是否显示行号 */
  showLineNumbers?: boolean;
  /** 是否启用自动补全 */
  enableAutocomplete?: boolean;
  /** 是否启用语法高亮 */
  enableSyntaxHighlight?: boolean;
  /** Tab 大小 */
  tabSize?: number;
}