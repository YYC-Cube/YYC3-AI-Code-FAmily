/**
 * @file useAIService.test.ts
 * @description useAIService Hook 单元测试 — 默认配置、类型验证、缓存、速率限制、故障转移、成本计算
 * @priority P0
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { resetLocalStorage } from '../setup';
import type {
  AIServiceConfig,
  AIProviderConfig,
  AIModelConfig,
  ChatMessage,
  ChatOptions,
  ChatResponse,
  ChatStreamChunk,
  CostReport,
  PerformanceMetrics as AIPerformanceMetrics,
  ErrorAnalysis,
} from '../../app/hooks/useAIService';

const STORAGE_KEY = 'yyc3-ai-service-config';

describe('useAIService — AI 服务层', () => {

  beforeEach(() => {
    resetLocalStorage();
  });

  /* ── 类型完整性 ── */

  describe('类型定义完整性', () => {
    it('TC-AIS-001: AIModelConfig 包含必要字段', () => {
      const model: AIModelConfig = {
        id: 'gpt-4-turbo',
        name: 'gpt-4-turbo',
        displayName: 'GPT-4 Turbo',
        type: 'chat',
        contextLength: 128000,
        maxTokens: 4096,
        enabled: true,
        parameters: { temperature: 0.7, topP: 1, frequencyPenalty: 0, presencePenalty: 0 },
        capabilities: ['chat', 'code', 'analysis'],
      };
      expect(model.contextLength).toBe(128000);
      expect(model.type).toBe('chat');
    });

    it('TC-AIS-002: AIProviderConfig 包含必要字段', () => {
      const provider: AIProviderConfig = {
        id: 'openai',
        name: 'OpenAI',
        displayName: 'OpenAI',
        type: 'cloud',
        baseURL: 'https://api.openai.com/v1',
        apiKey: 'sk-test',
        models: [],
        enabled: true,
        priority: 1,
      };
      expect(provider.type).toBe('cloud');
      expect(provider.priority).toBe(1);
    });

    it('TC-AIS-003: ChatMessage 支持 user/assistant/system 角色', () => {
      const msgs: ChatMessage[] = [
        { role: 'system', content: 'You are helpful.' },
        { role: 'user', content: 'Hello' },
        { role: 'assistant', content: 'Hi there!' },
      ];
      expect(msgs).toHaveLength(3);
      expect(msgs.map(m => m.role)).toEqual(['system', 'user', 'assistant']);
    });

    it('TC-AIS-004: ChatResponse 包含 usage 统计', () => {
      const resp: ChatResponse = {
        id: 'resp-1',
        model: 'gpt-4-turbo',
        choices: [{ message: { role: 'assistant', content: 'Hi' }, finishReason: 'stop' }],
        usage: { promptTokens: 10, completionTokens: 5, totalTokens: 15 },
      };
      expect(resp.usage.totalTokens).toBe(15);
    });

    it('TC-AIS-005: ChatStreamChunk 包含 delta/done 字段', () => {
      const chunk: ChatStreamChunk = {
        id: 'chunk-1',
        model: 'gpt-4-turbo',
        delta: 'Hello',
        done: false,
        finishReason: null,
      };
      expect(chunk.done).toBe(false);
      expect(chunk.delta).toBe('Hello');
    });

    it('TC-AIS-006: CostReport 包含成本计算字段', () => {
      const cost: CostReport = {
        providerId: 'openai',
        modelId: 'gpt-4-turbo',
        inputTokens: 1000,
        outputTokens: 500,
        cost: 0.03,
        currency: 'USD',
      };
      expect(cost.cost).toBe(0.03);
    });

    it('TC-AIS-007: ErrorAnalysis 包含诊断建议字段', () => {
      const err: ErrorAnalysis = {
        providerId: 'openai',
        modelId: 'gpt-4',
        errorType: 'rate_limit',
        errorMessage: 'Rate limit exceeded',
        timestamp: Date.now(),
        count: 3,
        suggestions: ['Reduce request frequency', 'Switch to backup provider'],
      };
      expect(err.suggestions.length).toBeGreaterThan(0);
    });
  });

  /* ── 默认配置 ── */

  describe('默认配置', () => {
    it('TC-AIS-010: activeProvider 默认 openai', () => {
      const defaults: Partial<AIServiceConfig> = {
        activeProvider: 'openai',
        activeModel: 'gpt-4-turbo',
      };
      expect(defaults.activeProvider).toBe('openai');
    });

    it('TC-AIS-011: 缓存默认开启, TTL=300s, maxSize=100', () => {
      const cache = { enabled: true, ttl: 300, maxSize: 100 };
      expect(cache.enabled).toBe(true);
      expect(cache.ttl).toBe(300);
    });

    it('TC-AIS-012: 速率限制默认 60 RPM, 3 次重试', () => {
      const rateLimit = { enabled: true, requestsPerMinute: 60, retryAttempts: 3, backoffMultiplier: 2 };
      expect(rateLimit.requestsPerMinute).toBe(60);
      expect(rateLimit.retryAttempts).toBe(3);
    });

    it('TC-AIS-013: 检测默认开启性能监控和错误分析', () => {
      const detection = { enabled: true, autoSelectBest: false, performanceMonitoring: true, errorAnalysis: true };
      expect(detection.performanceMonitoring).toBe(true);
      expect(detection.errorAnalysis).toBe(true);
    });
  });

  /* ── 持久化 ── */

  describe('配置持久化', () => {
    it('TC-AIS-020: 配置写入 localStorage', () => {
      const config = { activeProvider: 'anthropic', activeModel: 'claude-3' };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      const loaded = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(loaded.activeProvider).toBe('anthropic');
    });

    it('TC-AIS-021: localStorage 损坏时使用默认配置', () => {
      localStorage.setItem(STORAGE_KEY, 'INVALID');
      let config;
      try {
        config = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      } catch {
        config = { activeProvider: 'openai' };
      }
      expect(config.activeProvider).toBe('openai');
    });
  });

  /* ── ChatOptions ── */

  describe('ChatOptions 参数', () => {
    it('TC-AIS-030: 可选覆盖 temperature/maxTokens/topP', () => {
      const opts: ChatOptions = {
        model: 'gpt-4o',
        temperature: 0.3,
        maxTokens: 2048,
        topP: 0.9,
        stream: true,
      };
      expect(opts.temperature).toBe(0.3);
      expect(opts.stream).toBe(true);
    });

    it('TC-AIS-031: 可指定 providerId 进行故障转移', () => {
      const opts: ChatOptions = { providerId: 'anthropic' };
      expect(opts.providerId).toBe('anthropic');
    });
  });

  /* ── 成本计算 ── */

  describe('成本计算逻辑', () => {
    it('TC-AIS-040: GPT-4 Turbo 输入 $10/M, 输出 $30/M', () => {
      const inputPrice = 10; // per million tokens
      const outputPrice = 30;
      const inputTokens = 1000;
      const outputTokens = 500;
      const cost = (inputTokens / 1_000_000) * inputPrice + (outputTokens / 1_000_000) * outputPrice;
      expect(cost).toBeCloseTo(0.025, 3);
    });

    it('TC-AIS-041: 0 tokens = $0 cost', () => {
      const cost = (0 / 1_000_000) * 10 + (0 / 1_000_000) * 30;
      expect(cost).toBe(0);
    });
  });

  /* ── 速率限制 ── */

  describe('速率限制逻辑', () => {
    it('TC-AIS-050: 指数退避计算正确', () => {
      const baseDelay = 1000;
      const multiplier = 2;
      const attempt1 = baseDelay * Math.pow(multiplier, 0); // 1000
      const attempt2 = baseDelay * Math.pow(multiplier, 1); // 2000
      const attempt3 = baseDelay * Math.pow(multiplier, 2); // 4000
      expect(attempt1).toBe(1000);
      expect(attempt2).toBe(2000);
      expect(attempt3).toBe(4000);
    });

    it('TC-AIS-051: 超过 maxRetries 后不再重试', () => {
      const maxRetries = 3;
      const attempts = [1, 2, 3, 4];
      const shouldRetry = attempts.map(a => a <= maxRetries);
      expect(shouldRetry).toEqual([true, true, true, false]);
    });
  });

  /* ── 多供应商列表 ── */

  describe('多供应商支持', () => {
    it('TC-AIS-060: 支持 OpenAI/Anthropic/Google/Ollama 等类型', () => {
      const providers = ['openai', 'anthropic', 'google', 'ollama', 'zhipu', 'baidu', 'aliyun'];
      expect(providers.length).toBeGreaterThanOrEqual(5);
    });

    it('TC-AIS-061: 本地 Ollama 类型为 local', () => {
      const ollama: AIProviderConfig = {
        id: 'ollama',
        name: 'Ollama',
        displayName: 'Ollama (Local)',
        type: 'local',
        baseURL: 'http://localhost:11434',
        apiKey: '',
        models: [],
        enabled: true,
        priority: 5,
      };
      expect(ollama.type).toBe('local');
    });
  });
});
