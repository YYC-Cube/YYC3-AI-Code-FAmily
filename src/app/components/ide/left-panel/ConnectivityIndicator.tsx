/**
 * @file: left-panel/ConnectivityIndicator.tsx
 * @description: 模型连通性指示器子组件 — 实时 Ping 测试、延迟显示、
 *              连接详情面板、当前文件路径指示
 * @author: YanYuCloudCube Team <admin@0379.email>
 * @version: v1.0.0
 * @created: 2026-03-18
 * @updated: 2026-03-18
 * @status: stable
 * @license: MIT
 * @copyright: Copyright (c) 2026 YanYuCloudCube Team
 * @tags: left-panel,connectivity,ping,status
 */

import {
  AlertCircle,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { testModelConnectivity, type ProviderConfig } from "../LLMService";

// ── Types ──

export interface ConnectivityModel {
  id: string;
  name: string;
  status: string;
  provider: string;
  modelId: string;
}

export interface ConnectivityResult {
  status: "idle" | "testing" | "success" | "fail";
  latencyMs: number | null;
  error: string | null;
  timestamp: number;
}

export interface ConnectivityIndicatorProps {
  activeModel: ConnectivityModel | null;
  activeModelId: string | null;
  globalConn: ConnectivityResult | undefined;
  getActiveProvider: () => ProviderConfig | undefined;
  setConnectivityResult: (modelId: string, result: ConnectivityResult) => void;
}

export default function ConnectivityIndicator({
  activeModel,
  activeModelId,
  globalConn,
  getActiveProvider,
  setConnectivityResult,
}: ConnectivityIndicatorProps) {
  const [connStatus, setConnStatus] = useState<
    "idle" | "testing" | "success" | "fail"
  >("idle");
  const [connLatency, setConnLatency] = useState<number | null>(null);
  const [connError, setConnError] = useState<string | null>(null);
  const [showConnDetail, _setShowConnDetail] = useState(false);
  const connMountedRef = useRef(true);

  useEffect(() => {
    connMountedRef.current = true;
    return () => {
      connMountedRef.current = false;
    };
  }, []);

  // Sync from global connectivity state on model change
  useEffect(() => {
    if (globalConn) {
      setConnStatus(globalConn.status);
      setConnLatency(globalConn.latencyMs);
      setConnError(globalConn.error);
    } else {
      setConnStatus("idle");
      setConnLatency(null);
      setConnError(null);
    }
    _setShowConnDetail(false);
  }, [activeModelId, globalConn]);
  void showConnDetail;

  // Handle connectivity test
  const handleConnTest = useCallback(async () => {
    if (connStatus === "testing" || !activeModel) return;
    const provider = getActiveProvider();
    if (!provider) {
      setConnStatus("fail");
      setConnError("找不到提供商配置");
      setConnectivityResult(activeModel.id, {
        status: "fail",
        latencyMs: null,
        error: "找不到提供商配置",
        timestamp: Date.now(),
      });
      return;
    }
    setConnStatus("testing");
    setConnError(null);
    setConnLatency(null);
    setConnectivityResult(activeModel.id, {
      status: "testing",
      latencyMs: null,
      error: null,
      timestamp: Date.now(),
    });
    try {
      const result = await testModelConnectivity(provider, activeModel.modelId);
      if (!connMountedRef.current) return;
      if (result.success) {
        setConnStatus("success");
        setConnLatency(result.latencyMs);
        setConnError(null);
        setConnectivityResult(activeModel.id, {
          status: "success",
          latencyMs: result.latencyMs,
          error: null,
          timestamp: Date.now(),
        });
      } else {
        setConnStatus("fail");
        setConnLatency(result.latencyMs);
        setConnError(result.error || "未知错误");
        setConnectivityResult(activeModel.id, {
          status: "fail",
          latencyMs: result.latencyMs,
          error: result.error || "未知错误",
          timestamp: Date.now(),
        });
      }
    } catch (err: unknown) {
      if (!connMountedRef.current) return;
      const errorMessage = err instanceof Error ? err.message : "测试异常";
      setConnStatus("fail");
      setConnError(errorMessage);
      setConnectivityResult(activeModel.id, {
        status: "fail",
        latencyMs: null,
        error: errorMessage,
        timestamp: Date.now(),
      });
    }
  }, [connStatus, activeModel, getActiveProvider, setConnectivityResult]);

  return (
    <div className="flex items-center gap-1">
      {activeModel ? (
        <button
          onClick={handleConnTest}
          disabled={connStatus === "testing"}
          className={`w-7 h-7 rounded flex items-center justify-center transition-all ${connStatus === "testing"
            ? "cursor-wait"
            : "hover:bg-white/[0.08]"
            }`}
          title={
            connStatus === "testing"
              ? "测试中..."
              : connStatus === "success"
                ? `已连通 (${connLatency ?? "?"}ms)`
                : connStatus === "fail"
                  ? `连接失败: ${connError ?? "未知错误"}`
                  : "测试连通性"
          }
        >
          {connStatus === "testing" ? (
            <RefreshCw className="w-4 h-4 text-sky-400 animate-spin" />
          ) : connStatus === "success" ? (
            <Wifi className="w-4 h-4 text-emerald-400" />
          ) : connStatus === "fail" ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : (
            <WifiOff className="w-4 h-4 text-slate-600" />
          )}
        </button>
      ) : (
        <WifiOff className="w-4 h-4 text-slate-600" />
      )}
    </div>
  );
}
