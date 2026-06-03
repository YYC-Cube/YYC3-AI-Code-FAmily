/**
 * @file src/types/layout.ts
 * @description 布局面板相关类型定义
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,layout,panel
 */

import type { ReactNode } from 'react';

/** 面板类型 */
export type PanelType = 'editor' | 'preview' | 'terminal' | 'explorer' | 'search' | 'git';

/** 面板接口 */
export interface Panel {
  /** 面板 ID */
  id: string;
  /** 面板类型 */
  type: PanelType;
  /** 面板标题 */
  title: string;
  /** 面板内容 */
  content?: ReactNode;
  /** 面板位置 */
  position: { x: number; y: number };
  /** 面板大小 */
  size: { width: number; height: number };
  /** 最小尺寸 */
  minSize?: { width: number; height: number };
  /** 是否可调整大小 */
  resizable?: boolean;
  /** 是否可拖拽 */
  draggable?: boolean;
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否最小化 */
  minimized?: boolean;
  /** 是否最大化 */
  maximized?: boolean;
  /** Z-index */
  zIndex?: number;
}

/** 布局配置 */
export interface LayoutConfig {
  /** 面板列表 */
  panels: Panel[];
  /** 布局类型 */
  layout: 'grid' | 'flex' | 'absolute';
  /** 主题 */
  theme: 'light' | 'dark';
  /** 是否显示网格线 */
  showGridLines?: boolean;
  /** 是否吸附到网格 */
  snapToGrid?: boolean;
  /** 网格大小 */
  gridSize?: number;
}