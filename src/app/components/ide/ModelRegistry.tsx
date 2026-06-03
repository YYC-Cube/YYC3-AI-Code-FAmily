/**
 * @file: ModelRegistry.tsx
 * @description: AI 模型注册中心 Context Provider，基于真实 Provider 动态注册模型，
 *              管理模型选择、连通性检测、心跳监控、延迟历史
 * @author: YanYuCloudCube Team <admin@0379.email>
 * @version: v1.5.0
 * @created: 2026-03-06
 * @updated: 2026-03-14
 * @status: dev
 * @license: MIT
 * @copyright: Copyright (c) 2026 YanYuCloudCube Team
 * @tags: ai,models,registry,context,provider,connectivity
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  detectOllama,
  getApiKey,
  getProviderConfigs,
  hasApiKey,
  setApiKey as storeApiKey,
  testModelConnectivity,
  type ProviderConfig,
  type ProviderId,
  type ProviderModel,
} from "./LLMService";

// ===== Types =====
export type ModelType = "llm" | "embedding" | "vision" | "audio" | "code" | "qa";
export type ModelStatus = "active" | "offline" | "loading" | "error";

export interface ConnectivityResult {
  status: "idle" | "testing" | "success" | "fail";
  latencyMs: number | null;
  error: string | null;
  timestamp: number;
}

export interface LatencyRecord {
  timestamp: number;
  latencyMs: number | null;
  status: "success" | "fail";
  modelId: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerId: ProviderId;
  type: ModelType;
  status: ModelStatus;
  endpoint: string;
  modelId: string;
  apiKey?: string;
  description?: string;
  maxTokens?: number;
  temperature?: number;
  isDetected?: boolean;
  isActive?: boolean;
}

// ===== Context =====
interface ModelRegistryContextType {
  models: AIModel[];
  activeModelId: string;
  activeModel: AIModel | undefined;
  setActiveModelId: (id: string) => void;
  addModel: (model: AIModel) => void;
  removeModel: (id: string) => void;
  updateModel: (id: string, updates: Partial<AIModel>) => void;
  getModelsByType: (type: ModelType) => AIModel[];
  getActiveModels: () => AIModel[];
  providers: ProviderConfig[];
  getProvider: (id: ProviderId) => ProviderConfig | undefined;
  getActiveProvider: () => ProviderConfig | undefined;
  setProviderApiKey: (providerId: ProviderId, key: string) => void;
  getProviderApiKey: (providerId: ProviderId) => string;
  hasProviderKey: (providerId: ProviderId) => boolean;
  connectivityResults: Record<string, ConnectivityResult>;
  setConnectivityResult: (modelId: string, result: ConnectivityResult) => void;
  heartbeatEnabled: boolean;
  toggleHeartbeat: (enabled: boolean) => void;
  heartbeatIntervalMs: number;
  setHeartbeatIntervalMs: (ms: number) => void;
  latencyHistory: LatencyRecord[];
  ollamaStatus: "checking" | "available" | "unavailable";
  ollamaDetectedModels: ProviderModel[];
  importedOllamaIds: Set<string>;
  importOllamaModel: (model: ProviderModel) => void;
  recheckOllama: () => void;
  addCustomModel: (name: string, provider: string, endpoint: string, apiKey?: string) => void;
  removeCustomModel: (id: string) => void;
  updateCustomModel: (id: string, updates: Partial<AIModel>) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  showModelSettingsV2: boolean;
  setShowModelSettingsV2: (show: boolean) => void;
}

const ModelRegistryContext = createContext<ModelRegistryContextType | null>(null);

export function useModelRegistry() {
  const ctx = useContext(ModelRegistryContext);
  if (!ctx) {
    throw new Error("useModelRegistry must be used within ModelRegistryProvider");
  }
  return ctx;
}

export function useModelRegistryOptional() {
  return useContext(ModelRegistryContext);
}

function buildModelsFromProviders(providers: ProviderConfig[]): AIModel[] {
  const models: AIModel[] = [];

  for (const provider of providers) {
    for (const model of provider.models) {
      const hasKey = provider.authType === "none" || hasApiKey(provider.id);
      const isDetected = provider.id === "ollama" ? provider.detected : true;

      models.push({
        id: `${provider.id}::${model.id}`,
        name: model.name,
        provider: provider.name,
        providerId: provider.id,
        type: model.type as ModelType,
        status: hasKey && isDetected ? "active" : "offline",
        endpoint: provider.baseUrl,
        modelId: model.id,
        description: model.description,
        maxTokens: model.maxTokens,
        temperature: model.type === "code" ? 0.2 : 0.7,
      });
    }
  }

  return models;
}

// ===== Provider =====
export function ModelRegistryProvider({ children }: { children: React.ReactNode }) {
  const [providers, setProviders] = useState<ProviderConfig[]>(() =>
    getProviderConfigs().map((p) => ({ ...p })),
  );
  const [ollamaStatus, setOllamaStatus] = useState<"checking" | "available" | "unavailable">("checking");
  const [ollamaDetectedModels, setOllamaDetectedModels] = useState<ProviderModel[]>([]);
  const [importedOllamaIds, setImportedOllamaIds] = useState<Set<string>>(new Set());
  const [customModels, setCustomModels] = useState<AIModel[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [showModelSettingsV2, setShowModelSettingsV2] = useState(false);
  const ollamaChecked = useRef(false);

  const [connectivityResults, setConnectivityResults] = useState<Record<string, ConnectivityResult>>({});
  const setConnectivityResult = useCallback((modelId: string, result: ConnectivityResult) => {
    setConnectivityResults((prev) => ({ ...prev, [modelId]: result }));
  }, []);

  const MAX_LATENCY_HISTORY = 50;
  const [latencyHistory, setLatencyHistory] = useState<LatencyRecord[]>([]);

  const HEARTBEAT_STORAGE_KEY = "yyc3_heartbeat_enabled";
  const HEARTBEAT_INTERVAL_KEY = "yyc3_heartbeat_interval";
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heartbeatMountedRef = useRef(true);

  useEffect(() => {
    heartbeatMountedRef.current = true;
    return () => { heartbeatMountedRef.current = false; };
  }, []);

  const [heartbeatEnabled, setHeartbeatEnabled] = useState<boolean>(() => {
    try { return localStorage.getItem(HEARTBEAT_STORAGE_KEY) !== "false"; } catch { return true; }
  });

  const [heartbeatIntervalMs, setHeartbeatIntervalMsState] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(HEARTBEAT_INTERVAL_KEY);
      if (stored) {
        const val = parseInt(stored, 10);
        if (val >= 10000 && val <= 600000) return val;
      }
    } catch { /* empty */ }
    return 60000;
  });

  const toggleHeartbeat = useCallback((enabled: boolean) => {
    setHeartbeatEnabled(enabled);
    try { localStorage.setItem(HEARTBEAT_STORAGE_KEY, String(enabled)); } catch { /* empty */ }
  }, []);

  const setHeartbeatIntervalMs = useCallback((ms: number) => {
    const clamped = Math.max(10000, Math.min(600000, ms));
    setHeartbeatIntervalMsState(clamped);
    try { localStorage.setItem(HEARTBEAT_INTERVAL_KEY, String(clamped)); } catch { /* empty */ }
  }, []);

  const performHeartbeat = useCallback(async () => {
    if (!heartbeatMountedRef.current) return;
    const model = allModelsRef.current.find((m) => m.id === activeModelIdRef.current);
    if (!model) return;

    const provider = providersRef.current.find((p) => p.id === model.providerId);
    if (!provider) return;
    if (provider.authType === "bearer" && !hasApiKey(provider.id)) return;

    const modelKey = model.id;
    setConnectivityResults((prev) => ({
      ...prev,
      [modelKey]: { status: "testing", latencyMs: null, error: null, timestamp: Date.now() },
    }));

    try {
      const result = await testModelConnectivity(provider, model.modelId, { timeoutMs: 10000 });
      if (!heartbeatMountedRef.current) return;
      setConnectivityResults((prev) => ({
        ...prev,
        [modelKey]: {
          status: result.success ? "success" : "fail",
          latencyMs: result.latencyMs,
          error: result.error || null,
          timestamp: Date.now(),
        },
      }));
      setLatencyHistory((prev) => {
        const newRecord: LatencyRecord = {
          timestamp: Date.now(), latencyMs: result.latencyMs,
          status: result.success ? "success" : "fail", modelId: model.id,
        };
        return [...prev.slice(-MAX_LATENCY_HISTORY + 1), newRecord];
      });
      try {
        const PK = "yyc3_model_perf_data";
        const existing = JSON.parse(localStorage.getItem(PK) || "[]");
        existing.push({
          modelId: model.id, modelName: model.name, providerId: model.providerId,
          latencyMs: result.latencyMs, success: result.success, timestamp: Date.now(), source: "heartbeat",
        });
        localStorage.setItem(PK, JSON.stringify(existing.slice(-200)));
      } catch { /* empty */ }
    } catch (err: unknown) {
      if (!heartbeatMountedRef.current) return;
      setConnectivityResults((prev) => ({
        ...prev,
        [modelKey]: { status: "fail", latencyMs: null, error: err instanceof Error ? err.message : "Heartbeat error", timestamp: Date.now() },
      }));
      setLatencyHistory((prev) => {
        const newRecord: LatencyRecord = {
          timestamp: Date.now(), latencyMs: null, status: "fail", modelId: model.id,
        };
        return [...prev.slice(-MAX_LATENCY_HISTORY + 1), newRecord];
      });
    }
  }, []);

  const allModelsRef = useRef<AIModel[]>([]);
  const activeModelIdRef = useRef("");
  const providersRef = useRef<ProviderConfig[]>([]);

  useEffect(() => { providersRef.current = providers; }, [providers]);

  useEffect(() => {
    if (ollamaChecked.current) return;
    ollamaChecked.current = true;

    setOllamaStatus("checking");
    detectOllama().then(({ available, models }) => {
      setOllamaStatus(available ? "available" : "unavailable");
      setProviders((prev) =>
        prev.map((p) =>
          p.id === "ollama" ? { ...p, detected: available, models: available ? models : [] } : p,
        ),
      );
      setOllamaDetectedModels(models);
    }).catch(() => {
      setOllamaStatus("unavailable");
      setOllamaDetectedModels([]);
    });
  }, []);

  const recheckOllama = useCallback(() => {
    setOllamaStatus("checking");
    detectOllama().then(({ available, models }) => {
      setOllamaStatus(available ? "available" : "unavailable");
      setProviders((prev) =>
        prev.map((p) =>
          p.id === "ollama" ? { ...p, detected: available, models: available ? models : [] } : p,
        ),
      );
      setOllamaDetectedModels(models);
    }).catch(() => {
      setOllamaStatus("unavailable");
      setOllamaDetectedModels([]);
    });
  }, []);

  const models = useMemo(() => buildModelsFromProviders(providers), [providers]);
  const allModels = useMemo(() => [...models, ...customModels], [models, customModels]);

  const defaultModelId = useMemo(() => {
    const active = allModels.find((m) => m.status === "active");
    return active?.id || allModels[0]?.id || "";
  }, [allModels]);

  const [activeModelId, setActiveModelId] = useState<string>("");

  useEffect(() => {
    if (!activeModelId || !allModels.find((m) => m.id === activeModelId)) {
      if (defaultModelId) setActiveModelId(defaultModelId);
    }
  }, [defaultModelId, activeModelId, allModels]);

  const activeModel = useMemo(() => allModels.find((m) => m.id === activeModelId), [allModels, activeModelId]);

  useEffect(() => { allModelsRef.current = allModels; }, [allModels]);
  useEffect(() => { activeModelIdRef.current = activeModelId; }, [activeModelId]);

  useEffect(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
    if (heartbeatEnabled && activeModelId) {
      heartbeatRef.current = setInterval(performHeartbeat, heartbeatIntervalMs);
    }
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
    };
  }, [heartbeatEnabled, activeModelId, performHeartbeat, heartbeatIntervalMs]);

  const addModel = useCallback((model: AIModel) => {
    setProviders((prev) => {
      const providerIdx = prev.findIndex((p) => p.id === model.providerId);
      if (providerIdx < 0) return prev;
      const updated = [...prev];
      const provider = { ...updated[providerIdx] };
      if (provider.models.some((m) => m.id === model.modelId)) return prev;
      provider.models = [
        ...provider.models,
        { id: model.modelId, name: model.name, type: model.type as ProviderModel['type'], maxTokens: model.maxTokens || 4096, description: model.description },
      ];
      updated[providerIdx] = provider;
      return updated;
    });
  }, []);

  const removeModel = useCallback((id: string) => {
    if (id.startsWith("custom::")) {
      setCustomModels((prev) => prev.filter((m) => m.id !== id));
    } else {
      const parts = id.split("::");
      const providerId = parts[0];
      const modelId = parts.slice(1).join("::");
      setProviders((prev) =>
        prev.map((p) => (p.id === providerId ? { ...p, models: p.models.filter((m) => m.id !== modelId) } : p)),
      );
    }
    if (activeModelId === id) setActiveModelId(defaultModelId);
  }, [activeModelId, defaultModelId]);

  const updateModel = useCallback((id: string, updates: Partial<AIModel>) => {
    if (id.startsWith("custom::")) {
      setCustomModels((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
    } else {
      const parts = id.split("::");
      const providerId = parts[0];
      const modelId = parts.slice(1).join("::");
      if (updates.name || updates.description) {
        setProviders((prev) =>
          prev.map((p) =>
            p.id === providerId
              ? { ...p, models: p.models.map((m) => (m.id === modelId ? { ...m, ...(updates.name && { name: updates.name }), ...(updates.description && { description: updates.description }) } : m)) }
              : p,
          ),
        );
      }
    }
  }, []);

  const getModelsByType = useCallback((type: ModelType) => allModels.filter((m) => m.type === type), [allModels]);
  const getActiveModels = useCallback(() => allModels.filter((m) => m.status === "active"), [allModels]);

  const getProvider = useCallback((id: ProviderId) => providers.find((p) => p.id === id), [providers]);

  const getActiveProvider = useCallback(() => {
    if (!activeModel) return undefined;
    const prov = providers.find((p) => p.id === activeModel.providerId);

    if (!prov && (activeModel.providerId as string) === "custom" && activeModel.endpoint) {
      const ep = activeModel.endpoint;
      const isOllamaEndpoint = /\/api\/(chat|generate)\/?$/i.test(ep) || /localhost:11434/i.test(ep);
      const base = ep.replace(/\/api\/(chat|generate)\/?$/i, "").replace(/\/chat\/completions\/?$/i, "").replace(/\/v1\/?$/, "");
      return { id: (isOllamaEndpoint ? "ollama" : "custom") as ProviderId, name: activeModel.provider || "Custom", nameEn: "Custom", baseUrl: base, authType: (activeModel.apiKey ? "bearer" : isOllamaEndpoint ? "none" : "bearer") as "none" | "bearer", isLocal: isOllamaEndpoint, detected: true, description: "", docsUrl: "", models: [] };
    }

    if (prov && (activeModel.providerId as string) === "custom" && activeModel.endpoint) {
      const ep = activeModel.endpoint;
      const isOllamaEndpoint = /\/api\/(chat|generate)\/?$/i.test(ep) || /localhost:11434/i.test(ep);
      const base = ep.replace(/\/api\/(chat|generate)\/?$/i, "").replace(/\/chat\/completions\/?$/i, "").replace(/\/v1\/?$/, "");
      return { ...prov, id: (isOllamaEndpoint ? "ollama" : "custom") as ProviderId, baseUrl: base, authType: (activeModel.apiKey ? "bearer" : isOllamaEndpoint ? "none" : prov.authType) as "none" | "bearer" };
    }

    return prov;
  }, [activeModel, providers]);

  const setProviderApiKey = useCallback((providerId: ProviderId, key: string) => {
    storeApiKey(providerId, key);
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p } : p)));
  }, []);

  const getProviderApiKey = useCallback((providerId: ProviderId) => getApiKey(providerId), []);
  const hasProviderKey = useCallback((providerId: ProviderId) => hasApiKey(providerId), []);

  const importOllamaModel = useCallback((model: ProviderModel) => {
    setImportedOllamaIds((prev) => new Set([...prev, model.id]));
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id !== "ollama") return p;
        if (p.models.some((m) => m.id === model.id)) return p;
        return { ...p, models: [...p.models, model] };
      }),
    );
  }, []);

  const addCustomModel = useCallback((name: string, provider: string, endpoint: string, apiKey?: string) => {
    const newModel: AIModel = {
      id: `custom::${name}-${Date.now()}`,
      name, provider, providerId: "custom" as ProviderId, type: "llm", status: "active",
      endpoint, modelId: name, apiKey: apiKey || "", description: `自定义 · ${endpoint}`,
      maxTokens: 4096, temperature: 0.7,
    };
    setCustomModels((prev) => [...prev, newModel]);
    if (apiKey) storeApiKey("custom" as ProviderId, apiKey);
  }, []);

  const removeCustomModel = useCallback((id: string) => {
    setCustomModels((prev) => prev.filter((m) => m.id !== id));
    if (activeModelId === id) setActiveModelId(defaultModelId);
  }, [activeModelId, defaultModelId]);

  const updateCustomModel = useCallback((id: string, updates: Partial<AIModel>) => {
    setCustomModels((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  }, []);

  const ctx = useMemo(() => ({
    models: allModels, activeModelId, activeModel, setActiveModelId,
    addModel, removeModel, updateModel, getModelsByType, getActiveModels,
    providers, getProvider, getActiveProvider,
    setProviderApiKey, getProviderApiKey, hasProviderKey,
    ollamaStatus, ollamaDetectedModels, importedOllamaIds, importOllamaModel, recheckOllama,
    addCustomModel, removeCustomModel, updateCustomModel,
    showSettings, setShowSettings, showModelSettingsV2, setShowModelSettingsV2,
    connectivityResults, setConnectivityResult,
    toggleHeartbeat, heartbeatEnabled, heartbeatIntervalMs, setHeartbeatIntervalMs,
    latencyHistory,
  }), [
    allModels, activeModelId, activeModel, addModel, removeModel, updateModel,
    getModelsByType, getActiveModels, providers, getProvider, getActiveProvider,
    setProviderApiKey, getProviderApiKey, hasProviderKey,
    ollamaStatus, ollamaDetectedModels, importedOllamaIds, importOllamaModel, recheckOllama,
    addCustomModel, removeCustomModel, updateCustomModel,
    showSettings, showModelSettingsV2, connectivityResults, setConnectivityResult,
    toggleHeartbeat, heartbeatEnabled, heartbeatIntervalMs, setHeartbeatIntervalMs, latencyHistory,
  ]);

  return (
    <ModelRegistryContext.Provider value={ctx}>
      {children}
    </ModelRegistryContext.Provider>
  );
}
