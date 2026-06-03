/**
 * @file src/types/config.ts
 * @description 应用配置类型定义 — 环境、运行时配置
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,config,environment
 */

/** 应用环境类型 */
export type Environment = 'development' | 'staging' | 'production';

/** 应用配置接口 */
export interface AppConfig {
  /** 应用名称 */
  appName: string;
  /** 应用版本 */
  appVersion: string;
  /** 运行环境 */
  environment: Environment;
  /** API 基础 URL */
  apiBaseUrl: string;
  /** WebSocket URL */
  wsUrl: string;
  /** 是否启用调试模式 */
  debugMode: boolean;
  /** 默认语言 */
  defaultLanguage: string;
  /** 支持的语言列表 */
  supportedLanguages: string[];
}

/** 环境变量配置 */
export interface EnvConfig {
  /** API 基础 URL */
  VITE_API_BASE_URL: string;
  /** WebSocket URL */
  VITE_WS_URL: string;
  /** 应用环境 */
  VITE_ENVIRONMENT: Environment;
  /** 是否启用调试 */
  VITE_DEBUG: string;
}