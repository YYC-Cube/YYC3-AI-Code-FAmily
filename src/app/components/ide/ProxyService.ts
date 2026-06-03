/**
 * @file: ProxyService.ts
 * @description: 后端代理层架构设计，解决 CORS 跨域限制和 API Key 安全暴露问题
 * @author: YanYuCloudCube Team <admin@0379.email>
 * @version: v1.0.0
 * @created: 2026-03-08
 * @updated: 2026-03-14
 * @status: dev
 * @license: MIT
 * @copyright: Copyright (c) 2026 YanYuCloudCube Team
 * @tags: proxy,cors,security,api,architecture
 */

import { SK_PROXY_CONFIG } from "./constants/storage-keys";

// ── 代理配置类型 ──
export interface ProxyConfig {
  enabled: boolean;
  baseUrl: string;
  authToken?: string;
  timeout: number;
  retries: number;
  rateLimitPerMin: number;
  allowedProviders: string[];
  corsOrigins: string[];
}

// ── 代理请求体 ──
export interface ProxyRequest {
  provider: string;
  endpoint: string;
  method: "POST" | "GET";
  body?: Record<string, unknown>;
  stream?: boolean;
}

// ── 代理响应体 ──
export interface ProxyResponse {
  status: number;
  data?: unknown;
  error?: string;
  latencyMs: number;
  proxied: boolean;
}

// ── 默认代理配置 ──
const PROXY_STORAGE_KEY = SK_PROXY_CONFIG;

export const DEFAULT_PROXY_CONFIG: ProxyConfig = {
  enabled: false,
  baseUrl: "http://localhost:3001/api/proxy",
  timeout: 30000,
  retries: 2,
  rateLimitPerMin: 60,
  allowedProviders: ["openai", "zhipu", "dashscope", "deepseek", "custom"],
  corsOrigins: ["http://localhost:5173", "http://localhost:3000"],
};

// ── 读/写代理配置 ──
export function loadProxyConfig(): ProxyConfig {
  try {
    const stored = localStorage.getItem(PROXY_STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_PROXY_CONFIG, ...JSON.parse(stored) };
    }
  } catch { /* empty */ }
  return { ...DEFAULT_PROXY_CONFIG };
}

export function saveProxyConfig(config: Partial<ProxyConfig>): ProxyConfig {
  const merged = { ...loadProxyConfig(), ...config };
  try {
    localStorage.setItem(PROXY_STORAGE_KEY, JSON.stringify(merged));
  } catch { /* empty */ }
  return merged;
}

// ── 代理请求转发 ──

export async function proxyFetch(config: ProxyConfig, request: ProxyRequest): Promise<Response> {
  const url = `${config.baseUrl.replace(/\/+$/, "")}/${request.provider}${request.endpoint}`;

  const headers: Record<string, string> = { "Content-Type": "application/json" };

  if (config.authToken) {
    headers["X-Proxy-Auth"] = config.authToken;
  }

  if (request.stream) {
    headers["Accept"] = "text/event-stream";
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  try {
    const response = await fetch(url, {
      method: request.method,
      headers,
      body: request.body ? JSON.stringify(request.body) : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// ── 代理健康检查 ──

export async function checkProxyHealth(baseUrl: string): Promise<{
  healthy: boolean;
  latencyMs: number;
  version?: string;
  error?: string;
}> {
  const start = Date.now();
  try {
    const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    const latencyMs = Date.now() - start;
    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      return { healthy: true, latencyMs, version: data.version };
    }
    return { healthy: false, latencyMs, error: `HTTP ${response.status}` };
  } catch (err: unknown) {
    return { healthy: false, latencyMs: Date.now() - start, error: err instanceof Error ? err.message : String(err) };
  }
}

// ── 代理服务器参考实现 (Cloudflare Worker 模板) ──
// 以下为代理服务器端的参考代码, 不在前端运行
export const PROXY_SERVER_TEMPLATE = `
// ======= Cloudflare Worker 代理服务器 =======
// 部署: wrangler deploy
// 环境变量:
//   OPENAI_API_KEY, ZHIPU_API_KEY, DASHSCOPE_API_KEY, DEEPSEEK_API_KEY
//   PROXY_AUTH_TOKEN (前端认证 token)

const PROVIDER_ENDPOINTS = {
  openai:    "https://api.openai.com",
  zhipu:     "https://open.bigmodel.cn/api/paas",
  dashscope: "https://dashscope.aliyuncs.com/compatible-mode",
  deepseek:  "https://api.deepseek.com",
};

export default {
  async fetch(request, env) {
    // CORS 预检
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Proxy-Auth",
        },
      });
    }

    // 认证检查
    const authToken = request.headers.get("X-Proxy-Auth");
    if (authToken !== env.PROXY_AUTH_TOKEN) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 健康检查
    const url = new URL(request.url);
    if (url.pathname.endsWith("/health")) {
      return new Response(JSON.stringify({ status: "ok", version: "1.0.0" }), {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 解析 provider
    const pathParts = url.pathname.split("/api/proxy/").pop()?.split("/") || [];
    const provider = pathParts[0];
    const apiPath = "/" + pathParts.slice(1).join("/");

    const baseUrl = PROVIDER_ENDPOINTS[provider];
    if (!baseUrl) {
      return new Response(JSON.stringify({ error: "Unknown provider" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 获取对应 API Key
    const keyMap = {
      openai:    env.OPENAI_API_KEY,
      zhipu:     env.ZHIPU_API_KEY,
      dashscope: env.DASHSCOPE_API_KEY,
      deepseek:  env.DEEPSEEK_API_KEY,
    };
    const apiKey = keyMap[provider];

    // 转发请求
    const targetUrl = baseUrl + apiPath;
    const headers = new Headers(request.headers);
    headers.set("Authorization", "Bearer " + apiKey);
    headers.delete("X-Proxy-Auth");

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.body,
    });

    // 添加 CORS 头并返回
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    return newResponse;
  },
};
`;
