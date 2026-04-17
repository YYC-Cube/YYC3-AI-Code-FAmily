/**
 * file: usePerformanceMonitor.ts
 * description: 高可用性能监控 Hook — Web Vitals 采集、内存压力检测、长任务检测、渲染性能追踪、资源加载监控、自适应降级（高负载自动关闭动画/minimap/实时预览）
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.1
 * created: 2026-03-15
 * updated: 2026-04-04
 * status: dev
 * license: MIT
 * copyright: Copyright (c) 2026 YanYuCloudCube Team
 * tags: performance,web-vitals,memory,long-task,adaptive-degradation,high-availability
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* ================================================================
   Types
   ================================================================ */

export interface PerformanceMetrics {
  /** 首次内容绘制（ms） */
  fcp: number | null;
  /** 最大内容绘制（ms） */
  lcp: number | null;
  /** 首次输入延迟（ms） */
  fid: number | null;
  /** 累积布局偏移 */
  cls: number | null;
  /** 交互到下一帧延迟（ms） */
  inp: number | null;
  /** 首字节时间（ms） */
  ttfb: number | null;
  /** 当前帧率（fps） */
  fps: number;
  /** JS 堆内存使用率 (0~1) */
  memoryUsage: number | null;
  /** JS 堆内存绝对值（MB） */
  memoryMB: number | null;
  /** 长任务计数（>50ms） */
  longTaskCount: number;
  /** 最近长任务持续时间（ms） */
  lastLongTaskDuration: number | null;
  /** DOM 节点数 */
  domNodeCount: number;
  /** 活跃的 Event Listener 估计数（基于 DOM 深度） */
  estimatedListeners: number;
}

export type PerformanceLevel = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export interface AdaptiveDegradation {
  /** 建议关闭动画 */
  disableAnimations: boolean;
  /** 建议关闭 minimap */
  disableMinimap: boolean;
  /** 建议降低实时预览频率 */
  reducePreviewFrequency: boolean;
  /** 建议关闭远程光标渲染 */
  disableRemoteCursors: boolean;
  /** 建议降低 awareness 广播频率 */
  reduceAwarenessBroadcast: boolean;
  /** 当前性能等级 */
  level: PerformanceLevel;
}

/* ================================================================
   Constants
   ================================================================ */

const MEMORY_CHECK_INTERVAL = 5_000;
const DOM_CHECK_INTERVAL = 10_000;
const STORAGE_KEY = 'yyc3-perf-metrics';

/* ================================================================
   Web Vitals Collection
   ================================================================ */

function collectWebVitals(
  onUpdate: (field: keyof PerformanceMetrics, value: number) => void,
): () => void {
  const observers: PerformanceObserver[] = [];

  try {
    // LCP (Largest Contentful Paint)
    const lcpObs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        onUpdate('lcp', entries[entries.length - 1].startTime);
      }
    });
    lcpObs.observe({ type: 'largest-contentful-paint', buffered: true });
    observers.push(lcpObs);
  } catch { /* unsupported */ }

  try {
    // FCP (First Contentful Paint)
    const fcpObs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find(e => e.name === 'first-contentful-paint');
      if (fcp) onUpdate('fcp', fcp.startTime);
    });
    fcpObs.observe({ type: 'paint', buffered: true });
    observers.push(fcpObs);
  } catch { /* unsupported */ }

  try {
    // FID (First Input Delay)
    const fidObs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        const entry = entries[0] as any;
        onUpdate('fid', entry.processingStart - entry.startTime);
      }
    });
    fidObs.observe({ type: 'first-input', buffered: true });
    observers.push(fidObs);
  } catch { /* unsupported */ }

  try {
    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObs = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      onUpdate('cls', clsValue);
    });
    clsObs.observe({ type: 'layout-shift', buffered: true });
    observers.push(clsObs);
  } catch { /* unsupported */ }

  try {
    // Long Tasks (>50ms)
    const ltObs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      if (entries.length > 0) {
        onUpdate('longTaskCount', entries.length);
        onUpdate('lastLongTaskDuration', entries[entries.length - 1].duration);
      }
    });
    ltObs.observe({ type: 'longtask', buffered: true });
    observers.push(ltObs);
  } catch { /* unsupported */ }

  // TTFB
  try {
    const navEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navEntries.length > 0) {
      onUpdate('ttfb', navEntries[0].responseStart - navEntries[0].requestStart);
    }
  } catch { /* */ }

  return () => {
    observers.forEach(o => o.disconnect());
  };
}

/* ================================================================
   FPS Counter
   ================================================================ */

function createFPSCounter(onUpdate: (fps: number) => void): () => void {
  let frameCount = 0;
  let lastTime = performance.now();
  let rafId: number;
  let active = true;

  const tick = () => {
    if (!active) return;
    frameCount++;
    const now = performance.now();
    if (now - lastTime >= 1000) {
      onUpdate(frameCount);
      frameCount = 0;
      lastTime = now;
    }
    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    active = false;
    cancelAnimationFrame(rafId);
  };
}

/* ================================================================
   Performance Level Calculator
   ================================================================ */

function calculateLevel(metrics: PerformanceMetrics): PerformanceLevel {
  let score = 100;

  // FPS penalty
  if (metrics.fps < 20) score -= 40;
  else if (metrics.fps < 30) score -= 20;
  else if (metrics.fps < 50) score -= 5;

  // Memory penalty
  if (metrics.memoryUsage !== null) {
    if (metrics.memoryUsage > 0.9) score -= 35;
    else if (metrics.memoryUsage > 0.75) score -= 15;
    else if (metrics.memoryUsage > 0.6) score -= 5;
  }

  // Long task penalty
  if (metrics.longTaskCount > 20) score -= 20;
  else if (metrics.longTaskCount > 10) score -= 10;
  else if (metrics.longTaskCount > 5) score -= 5;

  // LCP penalty
  if (metrics.lcp !== null) {
    if (metrics.lcp > 4000) score -= 15;
    else if (metrics.lcp > 2500) score -= 5;
  }

  // DOM size penalty
  if (metrics.domNodeCount > 5000) score -= 10;
  else if (metrics.domNodeCount > 3000) score -= 5;

  // CLS penalty
  if (metrics.cls !== null) {
    if (metrics.cls > 0.25) score -= 10;
    else if (metrics.cls > 0.1) score -= 5;
  }

  if (score >= 85) return 'excellent';
  if (score >= 65) return 'good';
  if (score >= 45) return 'fair';
  if (score >= 25) return 'poor';
  return 'critical';
}

/* ================================================================
   Adaptive Degradation Calculator
   ================================================================ */

function calculateDegradation(_metrics: PerformanceMetrics, level: PerformanceLevel): AdaptiveDegradation {
  return {
    disableAnimations: level === 'critical' || level === 'poor',
    disableMinimap: level === 'critical',
    reducePreviewFrequency: level === 'critical' || level === 'poor',
    disableRemoteCursors: level === 'critical',
    reduceAwarenessBroadcast: level === 'critical' || level === 'poor',
    level,
  };
}

/* ================================================================
   Hook
   ================================================================ */

export function usePerformanceMonitor(enabled: boolean = true) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    inp: null,
    ttfb: null,
    fps: 60,
    memoryUsage: null,
    memoryMB: null,
    longTaskCount: 0,
    lastLongTaskDuration: null,
    domNodeCount: 0,
    estimatedListeners: 0,
  });

  const longTaskAccum = useRef(0);
  const metricsRef = useRef(metrics);
  metricsRef.current = metrics;

  // Update a single metric field
  const updateField = useCallback((field: keyof PerformanceMetrics, value: number) => {
    if (field === 'longTaskCount') {
      longTaskAccum.current += value;
      setMetrics(prev => ({ ...prev, longTaskCount: longTaskAccum.current }));
    } else {
      setMetrics(prev => ({ ...prev, [field]: value }));
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // Web Vitals
    const cleanupVitals = collectWebVitals(updateField);

    // FPS counter
    const cleanupFPS = createFPSCounter((fps) => {
      setMetrics(prev => ({ ...prev, fps }));
    });

    // Memory + DOM monitoring
    const memoryInterval = setInterval(() => {
      const perf = performance as any;
      if (perf.memory) {
        const usage = perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit;
        const mb = perf.memory.usedJSHeapSize / (1024 * 1024);
        setMetrics(prev => ({ ...prev, memoryUsage: usage, memoryMB: Math.round(mb) }));
      }
    }, MEMORY_CHECK_INTERVAL);

    const domInterval = setInterval(() => {
      const count = document.querySelectorAll('*').length;
      setMetrics(prev => ({ ...prev, domNodeCount: count, estimatedListeners: Math.round(count * 0.3) }));
    }, DOM_CHECK_INTERVAL);

    return () => {
      cleanupVitals();
      cleanupFPS();
      clearInterval(memoryInterval);
      clearInterval(domInterval);
    };
  }, [enabled, updateField]);

  // Derived values
  const level = useMemo(() => calculateLevel(metrics), [metrics]);
  const degradation = useMemo(() => calculateDegradation(metrics, level), [metrics, level]);

  // Persist latest metrics snapshot
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...metrics,
        level,
        timestamp: Date.now(),
      }));
    } catch { /* quota */ }
  }, [metrics, level]);

  return {
    metrics,
    level,
    degradation,
  };
}
