/**
 * file: llm-service.test.ts
 * description: LLMService.ts 纯函数单元测试 — 供应商配置转换、API Key 管理、Endpoint/Headers 构建
 * @tags testing,unit,llm,service
 * @priority P0
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { resetLocalStorage } from '../../tests/setup';

describe('LLMService — LLM API 调用层', () => {
  beforeEach(() => {
    resetLocalStorage();
    vi.restoreAllMocks();
  });

  /* ── convertToProviderConfig ── */

  describe('convertToProviderConfig()', () => {
    it('TC-LLM-001: 从 ProviderDef 转换为 ProviderConfig 包含所有字段', async () => {
      const { convertToProviderConfig } = await import('../../app/components/ide/LLMService');
      const { BUILTIN_PROVIDERS } = await import('../../app/components/ide/constants/providers');
      const def = BUILTIN_PROVIDERS[0];
      const config = convertToProviderConfig(def);
      expect(config.id).toBe(def.id);
      expect(config.name).toBe(def.name);
      expect(config.baseUrl).toBe(def.baseURL);
      expect(config.models).toBeInstanceOf(Array);
    });

    it('TC-LLM-002: provider id 为 ollama 时 isLocal 为 true', async () => {
      const { convertToProviderConfig } = await import('../../app/components/ide/LLMService');
      const { BUILTIN_PROVIDERS } = await import('../../app/components/ide/constants/providers');
      const ollamaDef = BUILTIN_PROVIDERS.find(p => p.id === 'ollama')!;
      const config = convertToProviderConfig(ollamaDef);
      expect(config.isLocal).toBe(true);
      expect(config.detected).toBe(true);
    });

    it('TC-LLM-003: provider id 为 zai-plan 时 isLocal 为 false', async () => {
      const { convertToProviderConfig } = await import('../../app/components/ide/LLMService');
      const { BUILTIN_PROVIDERS } = await import('../../app/components/ide/constants/providers');
      const zhipuDef = BUILTIN_PROVIDERS.find(p => p.id === 'zai-plan')!;
      const config = convertToProviderConfig(zhipuDef);
      expect(config.isLocal).toBe(false);
      expect(config.detected).toBe(false);
    });

    it('TC-LLM-004: 模型字段被正确映射', async () => {
      const { convertToProviderConfig } = await import('../../app/components/ide/LLMService');
      const { BUILTIN_PROVIDERS } = await import('../../app/components/ide/constants/providers');
      const def = BUILTIN_PROVIDERS[0];
      const config = convertToProviderConfig(def);
      expect(config.models.length).toBeGreaterThanOrEqual(1);
      const model = config.models[0];
      expect(model).toHaveProperty('id');
      expect(model).toHaveProperty('name');
      expect(model).toHaveProperty('type');
      expect(model).toHaveProperty('maxTokens');
    });

    it('TC-LLM-005: contextWindow 被转换为数字', async () => {
      const { convertToProviderConfig } = await import('../../app/components/ide/LLMService');
      const { BUILTIN_PROVIDERS } = await import('../../app/components/ide/constants/providers');
      const def = BUILTIN_PROVIDERS.find(p => p.models[0]?.contextWindow) || BUILTIN_PROVIDERS[0];
      const config = convertToProviderConfig(def);
      expect(config.models[0].contextWindow).toBeTypeOf('number');
    });
  });

  /* ── getProviderConfig / getProviderConfigs ── */

  describe('getProviderConfig / getProviderConfigs', () => {
    it('TC-LLM-010: getProviderConfigs 返回数组', async () => {
      const { getProviderConfigs } = await import('../../app/components/ide/LLMService');
      const configs = getProviderConfigs();
      expect(Array.isArray(configs)).toBe(true);
      expect(configs.length).toBeGreaterThanOrEqual(2);
    });

    it('TC-LLM-011: getProviderConfig("ollama") 返回 ollama 配置', async () => {
      const { getProviderConfig } = await import('../../app/components/ide/LLMService');
      const config = getProviderConfig('ollama');
      expect(config).toBeDefined();
      expect(config!.id).toBe('ollama');
    });

    it('TC-LLM-012: getProviderConfig("unknown") 返回 undefined', async () => {
      const { getProviderConfig } = await import('../../app/components/ide/LLMService');
      const config = getProviderConfig('unknown' as never);
      expect(config).toBeUndefined();
    });
  });

  /* ── API Key 管理 ── */

  describe('API Key 管理', () => {
    const KEY_PREFIX = 'yyc3_llm_key_';

    it('TC-LLM-020: setApiKey 写入 localStorage', async () => {
      const { setApiKey, getApiKey } = await import('../../app/components/ide/LLMService');
      setApiKey('zai-plan', 'sk-test-123');
      expect(getApiKey('zai-plan')).toBe('sk-test-123');
    });

    it('TC-LLM-021: 空 key 调用 setApiKey 应移除条目', async () => {
      const { setApiKey, getApiKey } = await import('../../app/components/ide/LLMService');
      setApiKey('zai-plan', 'sk-test');
      setApiKey('zai-plan', '');
      expect(getApiKey('zai-plan')).toBe('');
      expect(localStorage.getItem(`${KEY_PREFIX}zai-plan`)).toBeNull();
    });

    it('TC-LLM-022: hasApiKey 正确判断 key 是否存在', async () => {
      const { setApiKey, hasApiKey } = await import('../../app/components/ide/LLMService');
      expect(hasApiKey('zai-plan')).toBe(false);
      setApiKey('zai-plan', 'sk-valid');
      expect(hasApiKey('zai-plan')).toBe(true);
    });

    it('TC-LLM-023: initialApiKeysFromEnv 从 import.meta.env 读取', async () => {
      const { initializeApiKeysFromEnv, getApiKey } = await import('../../app/components/ide/LLMService');
      // vi.stubEnv 正确模拟 import.meta.env（Vite 环境变量）
      vi.stubEnv('VITE_ZHIPU_API_KEY', 'sk-from-env');
      initializeApiKeysFromEnv();
      expect(getApiKey('zai-plan')).toBe('sk-from-env');
      vi.unstubAllEnvs();
    });
  });

  /* ── getChatEndpoint ── */

  describe('getChatEndpoint()', () => {
    it('TC-LLM-030: ollama 返回 /api/chat', async () => {
      const { getChatEndpoint, getProviderConfig } = await import('../../app/components/ide/LLMService');
      const config = getProviderConfig('ollama')!;
      const endpoint = getChatEndpoint(config);
      expect(endpoint).toContain('/api/chat');
    });

    it('TC-LLM-031: zai-plan 返回 /api/zhipu/chat/completions', async () => {
      const { getChatEndpoint, getProviderConfig } = await import('../../app/components/ide/LLMService');
      const config = getProviderConfig('zai-plan')!;
      const endpoint = getChatEndpoint(config);
      expect(endpoint).toBe('/api/zhipu/chat/completions');
    });
  });

  /* ── buildHeaders ── */

  describe('buildHeaders()', () => {
    it('TC-LLM-040: 始终包含 Content-Type: application/json', async () => {
      const { buildHeaders, getProviderConfig } = await import('../../app/components/ide/LLMService');
      const config = getProviderConfig('ollama')!;
      const headers = buildHeaders(config);
      expect(headers['Content-Type']).toBe('application/json');
    });

    it('TC-LLM-041: bearer 认证类型且 key 存在时包含 Authorization', async () => {
      const { buildHeaders, getProviderConfig, setApiKey } = await import('../../app/components/ide/LLMService');
      setApiKey('zai-plan', 'sk-bearer');
      const config = getProviderConfig('zai-plan')!;
      const headers = buildHeaders(config);
      expect(headers['Authorization']).toBe('Bearer sk-bearer');
    });

    it('TC-LLM-042: ollama 无需 Authorization header', async () => {
      const { buildHeaders, getProviderConfig } = await import('../../app/components/ide/LLMService');
      const config = getProviderConfig('ollama')!;
      const headers = buildHeaders(config);
      expect(headers['Authorization']).toBeUndefined();
    });
  });
});
