/**
 * @file src/types/ai.ts
 * @description AI 服务相关类型定义 — 提供商、模型、消息、请求/响应
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags types,ai,llm,model
 */

/** AI 提供商 */
export type AIProvider = 'openai' | 'anthropic' | 'zhipu' | 'baidu' | 'aliyun' | 'ollama';

/** AI 模型 */
export interface AIModel {
  /** 模型 ID */
  id: string;
  /** 模型名称 */
  name: string;
  /** 提供商 */
  provider: AIProvider;
  /** 最大上下文长度 */
  maxContextLength: number;
  /** 是否支持流式输出 */
  supportsStreaming: boolean;
  /** 价格（每 1K tokens） */
  pricePer1KTokens?: number;
}

/** AI 消息角色 */
export type AIMessageRole = 'system' | 'user' | 'assistant' | 'tool';

/** AI 消息 */
export interface AIMessage {
  /** 消息 ID */
  id: string;
  /** 角色 */
  role: AIMessageRole;
  /** 内容 */
  content: string;
  /** 工具调用 */
  toolCalls?: unknown[];
  /** 时间戳 */
  timestamp: number;
}

/** AI 请求配置 */
export interface AIRequestConfig {
  /** 提供商 */
  provider: AIProvider;
  /** 模型 */
  model: string;
  /** 消息列表 */
  messages: AIMessage[];
  /** 温度（0-2） */
  temperature?: number;
  /** 最大 tokens */
  maxTokens?: number;
  /** 是否流式输出 */
  stream?: boolean;
  /** 停止序列 */
  stopSequences?: string[];
}

/** AI 响应 */
export interface AIResponse {
  /** 响应 ID */
  id: string;
  /** 提供商 */
  provider: AIProvider;
  /** 模型 */
  model: string;
  /** 内容 */
  content: string;
  /** 使用的 tokens */
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  /** 完成原因 */
  finishReason?: string;
  /** 时间戳 */
  timestamp: number;
}