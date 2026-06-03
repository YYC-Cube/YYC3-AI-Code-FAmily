/**
 * @file: SettingsBridge.ts
 * @description: 设置模块与 IDE 核心模块的协同桥接层 —
 *              实现 Settings Store ↔ ModelRegistry / FileStore / LLMService / MCP 的双向数据同步
 * @author: YanYuCloudCube Team <admin@0379.email>
 * @version: v1.0.0
 * @created: 2026-03-17
 * @updated: 2026-03-17
 * @status: dev
 * @license: MIT
 * @copyright: Copyright (c) 2026 YanYuCloudCube Team
 * @tags: settings,bridge,sync,keybindings,mcp,rules,integration
 */

import { getProviderConfigs, setApiKey, type ProviderId } from "./LLMService";
import { SK_MCP_SERVERS, SK_PROVIDER_API_KEYS, SK_THEME, saveJSON } from "./constants/storage-keys";

// ================================================================
// 1. 模型配置同步
// ================================================================

export function syncModelConfigToLLMService(): void {
  // Simplified: sync from localStorage to LLMService layer
  try {
    const stored = localStorage.getItem(SK_PROVIDER_API_KEYS);
    if (stored) {
      const apiKeyMap = JSON.parse(stored);
      for (const [providerId, key] of Object.entries(apiKeyMap)) {
        setApiKey(providerId as ProviderId, key as string);
      }
    }
  } catch { /* empty */ }
}

export function syncLLMServiceToSettings(): void {
  // Sync from LLMService localStorage to provider-api-keys format
  const apiKeyMap: Record<string, string> = {};
  for (const providerCfg of getProviderConfigs()) {
    if (providerCfg.authType === "none") continue;
    let storedKey = "";
    try { storedKey = localStorage.getItem(`yyc3_llm_key_${providerCfg.id}`) || ""; } catch { /* ignore */ }
    if (storedKey) apiKeyMap[providerCfg.id] = storedKey;
  }
  saveJSON(SK_PROVIDER_API_KEYS, apiKeyMap);
}

// ================================================================
// 2. MCP 运行时动态注入
// ================================================================

// ── Types ──

export interface MCPRuntimeEndpoint {
  id: string;
  name: string;
  endpoint: string;
  enabled: boolean;
  projectLevel: boolean;
  type: "market" | "manual";
}

interface TauriWindow {
  __TAURI__: {
    invoke: (cmd: string, args?: Record<string, unknown>) => Promise<{ connected: boolean; latencyMs?: number; capabilities?: string[]; error?: string }>;
  };
}
export function getActiveMCPEndpoints(): MCPRuntimeEndpoint[] {
  try {
    const stored = localStorage.getItem(SK_MCP_SERVERS);
    if (stored) {
      const configs = JSON.parse(stored) as Array<{ id: string; name: string; endpoint?: string; enabled: boolean; projectLevel?: boolean; type?: string }>;
      return configs.filter(mcp => mcp.enabled).map(mcp => ({
        id: mcp.id,
        name: mcp.name,
        endpoint: mcp.endpoint || "",
        enabled: mcp.enabled,
        projectLevel: mcp.projectLevel || false,
        type: (mcp.type || "manual") as "market" | "manual",
      }));
    }
  } catch { /* empty */ }
  return [];
}

export function syncMCPToStorage(): void {
  // Placeholder: MCP config is managed externally
}

export function buildMCPToolsDescription(): string {
  const endpoints = getActiveMCPEndpoints();
  if (endpoints.length === 0) return "";

  const toolList = endpoints
    .map((ep) => `- **${ep.name}** (${ep.type === "market" ? "市场" : "手动"}) → \`${ep.endpoint}\``)
    .join("\n");

  return `\n## 可用 MCP 工具\n\n以下 MCP 工具服务已启用，你可以在需要时调用：\n\n${toolList}\n\n当用户请求涉及这些工具能力时，可以建议使用对应的 MCP 工具。`;
}

// ================================================================
// 3. 规则内容注入到 AI 系统提示词
// ================================================================

export function buildRulesPromptInjection(_scope?: "personal" | "project"): string {
  // Placeholder: rules would be loaded from Settings store
  return "";
}

export function buildSkillsPromptInjection(): string {
  // Placeholder: skills would be loaded from Settings store
  return "";
}

export function getActiveAgentPrompt(): string | null {
  // Placeholder: agents would be loaded from Settings store
  return null;
}

export function getSettingsEnhancedInstructions(): string {
  const parts: string[] = [];
  const agentPrompt = getActiveAgentPrompt();
  if (agentPrompt) parts.push(`## 智能体角色\n\n${agentPrompt}`);
  const rules = buildRulesPromptInjection();
  if (rules) parts.push(rules);
  const skills = buildSkillsPromptInjection();
  if (skills) parts.push(skills);
  const mcpTools = buildMCPToolsDescription();
  if (mcpTools) parts.push(mcpTools);
  return parts.join("\n\n");
}

// ================================================================
// 4. 快捷键全局映射绑定
// ================================================================

export interface KeybindingDef {
  keys: string;
  action: string;
  label: string;
  category: string;
}

const DEFAULT_KEYBINDINGS: KeybindingDef[] = [
  { keys: "ctrl+s", action: "file.save", label: "保存文件", category: "编辑器" },
  { keys: "ctrl+shift+f", action: "search.global", label: "全局搜索", category: "视图切换" },
  { keys: "ctrl+`", action: "terminal.toggle", label: "切换终端", category: "终端" },
  { keys: "ctrl+b", action: "sidebar.toggle", label: "切换侧边栏", category: "面板操作" },
  { keys: "ctrl+p", action: "file.quickOpen", label: "快速打开文件", category: "导航" },
  { keys: "ctrl+shift+p", action: "command.palette", label: "命令面板", category: "命令" },
  { keys: "escape", action: "panel.close", label: "关闭面板/弹窗", category: "导航" },
  { keys: "ctrl+/", action: "editor.commentLine", label: "行注释", category: "编辑器" },
  { keys: "ctrl+z", action: "editor.undo", label: "撤销", category: "编辑器" },
  { keys: "ctrl+shift+z", action: "editor.redo", label: "重做", category: "编辑器" },
  { keys: "ctrl+f", action: "editor.find", label: "文件内搜索", category: "编辑器" },
];

const actionHandlers = new Map<string, () => void>();

export function registerKeybindingAction(action: string, handler: () => void): () => void {
  actionHandlers.set(action, handler);
  return () => { actionHandlers.delete(action); };
}

export function getEffectiveKeybindings(): KeybindingDef[] {
  return DEFAULT_KEYBINDINGS;
}

export function normalizeKeyEvent(e: KeyboardEvent): string {
  const parts: string[] = [];
  if (e.ctrlKey || e.metaKey) parts.push("ctrl");
  if (e.shiftKey) parts.push("shift");
  if (e.altKey) parts.push("alt");
  const key = e.key.toLowerCase();
  if (!["control", "shift", "alt", "meta"].includes(key)) {
    parts.push(key === " " ? "space" : key);
  }
  return parts.join("+");
}

export function installGlobalKeybindings(): () => void {
  const handler = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;
    if (isInput && !e.ctrlKey && !e.metaKey && e.key !== "Escape") return;

    const normalized = normalizeKeyEvent(e);
    const bindings = getEffectiveKeybindings();

    for (const binding of bindings) {
      if (binding.keys === normalized) {
        const handler = actionHandlers.get(binding.action);
        if (handler) {
          e.preventDefault();
          e.stopPropagation();
          handler();
          return;
        }
      }
    }
  };

  document.addEventListener("keydown", handler, { capture: true });
  return () => document.removeEventListener("keydown", handler, { capture: true });
}

// ================================================================
// 5. 通用设置同步
// ================================================================

export function syncGeneralSettingsToCSS(): void {
  // Placeholder: sync editor font settings to CSS variables
}

export function syncThemeToThemeStore(): void {
  try { localStorage.setItem(SK_THEME, "navy"); } catch { /* ignore */ }
}

// ================================================================
// 6. API Key 验证逻辑
// ================================================================

export interface APIKeyValidationResult {
  valid: boolean;
  error?: string;
  latencyMs?: number;
}

export async function validateAPIKey(
  providerId: ProviderId,
  apiKey: string,
  options?: { timeoutMs?: number },
): Promise<APIKeyValidationResult> {
  const timeoutMs = options?.timeoutMs ?? 10000;
  const provider = getProviderConfigs().find((p) => p.id === providerId);
  if (!provider) return { valid: false, error: "未知的 Provider" };
  if (provider.authType === "none") return { valid: true };
  if (!apiKey) return { valid: false, error: "API Key 不能为空" };

  const baseUrl = provider.baseUrl;
  let endpoint = `${baseUrl}/chat/completions`;
  if (providerId === "ollama") {
    endpoint = `${baseUrl}/api/tags`;
  } else if (providerId === "zai-plan") {
    endpoint = `/api/zhipu/chat/completions`;
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (provider.authType === "bearer") {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    if (providerId === "ollama") {
      const res = await fetch(endpoint, { signal: controller.signal });
      clearTimeout(timer);
      return { valid: res.ok, latencyMs: Date.now() - start, error: res.ok ? undefined : `HTTP ${res.status}` };
    }

    const body = JSON.stringify({
      model: provider.models[0]?.id || "gpt-4o-mini",
      messages: [{ role: "user", content: "Hi" }],
      max_tokens: 1, stream: false,
    });

    const res = await fetch(endpoint, {
      method: "POST", headers, body, signal: controller.signal,
    });
    clearTimeout(timer);
    const latencyMs = Date.now() - start;

    if (res.ok) return { valid: true, latencyMs };
    if (res.status === 401 || res.status === 403) return { valid: false, error: "API Key 无效或已过期", latencyMs };
    if (res.status === 429) return { valid: false, error: "请求频率超限", latencyMs };
    if (res.status === 400) return { valid: false, error: "请求参数错误", latencyMs };

    let errorDetail = "";
    try { const errText = await res.text(); errorDetail = errText.substring(0, 200); } catch { /* ignore */ }
    return { valid: false, error: `HTTP ${res.status}${errorDetail ? `: ${errorDetail}` : ""}`, latencyMs };
  } catch (err: unknown) {
    clearTimeout(timer);
    if (err instanceof Error && err.name === "AbortError") return { valid: false, error: "连接超时" };
    return { valid: false, error: `网络错误: ${err instanceof Error ? err.message : String(err)}` };
  }
}

// ================================================================
// 7. MCP 连接测试
// ================================================================

export interface MCPConnectionTestResult {
  connected: boolean;
  latencyMs?: number;
  error?: string;
  capabilities?: string[];
}

export async function testMCPConnection(
  endpoint: string,
  options?: { timeoutMs?: number },
): Promise<MCPConnectionTestResult> {
  const timeoutMs = options?.timeoutMs ?? 5000;

  const isTauri = typeof window !== "undefined" && "__TAURI__" in window;

  if (isTauri) {
    try {
      const result = await (window as unknown as TauriWindow).__TAURI__.invoke("test_mcp_connection", { endpoint });
      return { connected: result.connected, latencyMs: result.latencyMs, capabilities: result.capabilities, error: result.error };
    } catch (err: unknown) {
      return { connected: false, error: err instanceof Error ? err.message : "Tauri invoke 失败" };
    }
  }

  if (!endpoint) return { connected: false, error: "端点地址为空" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const start = Date.now();

  try {
    const url = endpoint.replace(/^mcp:\/\//, "http://localhost:");
    const res = await fetch(url, { method: "HEAD", signal: controller.signal });
    clearTimeout(timer);
    return { connected: res.ok || res.status === 405, latencyMs: Date.now() - start, capabilities: ["tools", "resources"] };
  } catch {
    clearTimeout(timer);
    return { connected: false, latencyMs: Date.now() - start, error: "MCP 端点不可达（Web 环境仅支持 HTTP 探测）" };
  }
}

// ================================================================
// 8. 启动全局设置同步
// ================================================================

export function startSettingsSync(): () => void {
  syncModelConfigToLLMService();
  syncMCPToStorage();
  syncGeneralSettingsToCSS();
  syncThemeToThemeStore();

  return () => { /* cleanup */ };
}
