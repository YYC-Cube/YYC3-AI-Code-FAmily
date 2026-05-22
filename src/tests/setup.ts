/**
 * file: setup.ts
 * description: Vitest 全局测试设置 — DOM 环境模拟、localStorage/WebSocket/performance API Mock、通用 fixture
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.1
 * created: 2026-03-08
 * updated: 2026-04-04
 * status: stable
 * tags: testing,vitest,setup,mock
 */

// ── jsdom / happy-dom 环境补丁 ──

// localStorage mock (node 环境下不存在)
if (typeof globalThis.localStorage === 'undefined') {
  const store: Record<string, string> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).localStorage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = String(value); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
}

// performance.memory mock (仅 Chrome 存在)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof performance !== 'undefined' && !(performance as any).memory) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (performance as any).memory = {
    usedJSHeapSize: 50 * 1024 * 1024,    // 50 MB
    totalJSHeapSize: 100 * 1024 * 1024,   // 100 MB
    jsHeapSizeLimit: 2048 * 1024 * 1024,  // 2 GB
  };
}

// PerformanceObserver stub
if (typeof globalThis.PerformanceObserver === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).PerformanceObserver = class {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(_cb: any) {}
    observe() {}
    disconnect() {}
  };
}

// ResizeObserver stub
if (typeof globalThis.ResizeObserver === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).ResizeObserver = class {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(_cb: any) {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// requestAnimationFrame / cancelAnimationFrame
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(performance.now()), 16);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).cancelAnimationFrame = (id: number) => clearTimeout(id);
}

// CustomEvent polyfill
if (typeof globalThis.CustomEvent === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).CustomEvent = class extends Event {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    detail: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(type: string, params?: { detail?: any }) {
      super(type);
      this.detail = params?.detail;
    }
  };
}

// fetch mock (default noop, tests should override)
if (typeof globalThis.fetch === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).fetch = async () => {
    throw new Error('fetch not mocked — use vi.mock or mockFetch()');
  };
}

// ── 清理函数 (每个 test 后重置) ──

export function resetLocalStorage() {
  localStorage.clear();
}

export function resetPerformanceMemory(opts: { usedMB?: number; limitMB?: number } = {}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (performance as any).memory = {
    usedJSHeapSize: (opts.usedMB ?? 50) * 1024 * 1024,
    totalJSHeapSize: (opts.usedMB ?? 50) * 2 * 1024 * 1024,
    jsHeapSizeLimit: (opts.limitMB ?? 2048) * 1024 * 1024,
  };
}

// ── 通用 fetch mock 工厂 ──

export interface MockFetchResponse {
  ok?: boolean;
  status?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json?: any;
  headers?: Record<string, string>;
}

export function createMockFetch(responses: Record<string, MockFetchResponse> = {}) {
  return async (url: string, _init?: RequestInit) => {
    // 查找最匹配的 pattern
    const match = Object.keys(responses).find(pattern => url.includes(pattern));
    const resp = match ? responses[match] : { ok: false, status: 404, json: { error: 'Not Found' } };

    return {
      ok: resp.ok ?? true,
      status: resp.status ?? 200,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      headers: new Map(Object.entries(resp.headers ?? {})) as any,
      json: async () => resp.json ?? {},
      text: async () => JSON.stringify(resp.json ?? {}),
      clone: function () { return this; },
    };
  };
}

// ── WebSocket Mock ──

export class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = MockWebSocket.CONNECTING;
  url: string;
  onopen: ((ev: Event) => void) | null = null;
  onclose: ((ev: CloseEvent) => void) | null = null;
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sentMessages: any[] = [];

  constructor(url: string) {
    this.url = url;
    // Auto-open after microtask
    queueMicrotask(() => {
      this.readyState = MockWebSocket.OPEN;
      this.onopen?.(new Event('open'));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(data: any) {
    this.sentMessages.push(data);
  }

  close(code?: number, reason?: string) {
    this.readyState = MockWebSocket.CLOSED;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.onclose?.({ code: code ?? 1000, reason: reason ?? '', wasClean: true } as any);
  }

  // 测试辅助：模拟收到消息
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  simulateMessage(data: any) {
    this.onmessage?.({ data } as MessageEvent);
  }

  // 测试辅助：模拟错误
  simulateError() {
    this.onerror?.(new Event('error'));
  }
}

// ── Monaco Editor Mock ──

export function createMockMonaco() {
  return {
    editor: {
      defineTheme: () => {},
      setTheme: () => {},
      create: () => createMockEditor(),
    },
    languages: {
      register: () => {},
      setMonarchTokensProvider: () => {},
      registerCompletionItemProvider: () => ({ dispose: () => {} }),
    },
    Range: class {
      constructor(public startLineNumber: number, public startColumn: number, public endLineNumber: number, public endColumn: number) {}
    },
    Uri: { parse: (s: string) => s },
  };
}

export function createMockEditor() {
  return {
    getValue: () => '// mock content',
    setValue: () => {},
    getModel: () => ({
      getLineCount: () => 10,
      getLineContent: (n: number) => `line ${n}`,
      getFullModelRange: () => ({ startLineNumber: 1, startColumn: 1, endLineNumber: 10, endColumn: 1 }),
      onDidChangeContent: () => ({ dispose: () => {} }),
    }),
    getPosition: () => ({ lineNumber: 1, column: 1 }),
    setPosition: () => {},
    getSelection: () => ({ startLineNumber: 1, startColumn: 1, endLineNumber: 1, endColumn: 1 }),
    revealLineInCenter: () => {},
    getScrollHeight: () => 1000,
    getLayoutInfo: () => ({ height: 500, width: 800 }),
    setScrollTop: () => {},
    deltaDecorations: () => [],
    createDecorationsCollection: () => ({
      set: () => {},
      clear: () => {},
    }),
    onDidChangeCursorPosition: () => ({ dispose: () => {} }),
    onDidChangeCursorSelection: () => ({ dispose: () => {} }),
    onDidScrollChange: () => ({ dispose: () => {} }),
    dispose: () => {},
    focus: () => {},
    layout: () => {},
    addAction: () => ({ dispose: () => {} }),
  };
}

export default {};
