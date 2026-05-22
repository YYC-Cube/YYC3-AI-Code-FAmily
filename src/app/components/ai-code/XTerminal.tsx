/**
 * file: XTerminal.tsx
 * description: YYC³ XTerm Terminal — 基于 xterm.js 的真实终端组件，支持多标签、WebSocket PTY、搜索、自适应尺寸
 * author: YanYuCloudCube Team <admin@0379.email>
 * version v1.0.0
 * created 2026-04-05
 * license MIT
 */

import React, { useRef, useEffect, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { WebLinksAddon } from '@xterm/addon-web-links';
import { SearchAddon } from '@xterm/addon-search';
import '@xterm/xterm/css/xterm.css';
import {
  Terminal as TermIcon, X, Plus, Search, Maximize2, Minimize2,
  Copy, Trash2
} from 'lucide-react';

export interface XTerminalTab {
  id: string;
  name: string;
  shell: string;
  term: Terminal | null;
  fitAddon: FitAddon;
  socket: WebSocket | null;
}

export interface XTerminalHandle {
  focus: () => void;
  write: (data: string) => void;
  clear: () => void;
  getCurrentTabId: () => string;
}

const SHELL_OPTIONS = ['bash', 'zsh', 'fish', 'powershell'] as const;

interface XTerminalProps {
  theme?: 'dark' | 'light';
  fontSize?: number;
  fontFamily?: string;
  cursorBlink?: boolean;
  defaultShell?: typeof SHELL_OPTIONS[number];
  onReady?: (terminal: Terminal) => void;
  onData?: (data: string) => void;
  onResize?: (cols: number, rows: number) => void;
  className?: string;
  style?: React.CSSProperties;
  wsUrl?: string;
}

function createXTerminal(
  container: HTMLElement,
  opts: Partial<XTerminalProps> & { shell: string }
): { term: Terminal; fit: FitAddon } {
  const isDark = opts.theme !== 'light';
  const term = new Terminal({
    cursorBlink: opts.cursorBlink ?? true,
    fontSize: opts.fontSize ?? 13,
    fontFamily: opts.fontFamily ?? "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Menlo', 'Monaco', monospace",
    theme: isDark ? {
      background: '#0c0d13',
      foreground: '#e5e7eb',
      cursor: '#667eea',
      cursorAccent: '#0c0d13',
      selectionBackground: '#667eea40',
      selectionForeground: '#ffffff',
      black: '#1a1b26',
      red: '#f7768e',
      green: '#9ece6a',
      yellow: '#e0af68',
      blue: '#7aa2f7',
      magenta: '#bb9af7',
      cyan: '#7dcfff',
      white: '#a9b1d6',
      brightBlack: '#414868',
      brightRed: '#f7768e',
      brightGreen: '#9ece6a',
      brightYellow: '#e0af68',
      brightBlue: '#7aa2f7',
      brightMagenta: '#bb9af7',
      brightCyan: '#7dcfff',
      brightWhite: '#c0caf5',
    } : {
      background: '#ffffff',
      foreground: '#1a1b26',
      cursor: '#667eea',
      cursorAccent: '#ffffff',
      selectionBackground: '#667eea30',
    },
    scrollback: 10000,
    tabStopWidth: 4,
    convertEol: true,
    allowProposedApi: true,
  });

  const fit = new FitAddon();
  const webLinks = new WebLinksAddon();
  const search = new SearchAddon();

  term.loadAddon(fit);
  term.loadAddon(webLinks);
  term.loadAddon(search);

  term.open(container);
  fit.fit();

  term.writeln('\x1b[1;36m  YYC\u00B3 AI Code Terminal\x1b[0m');
  term.writeln(`\x1b[90m  Shell: ${opts.shell} \u2502 Type \x1b[33mhelp\x1b[90m for available commands\x1b[0m`);
  term.writeln('');

  return { term, fit };
}

export const XTerminal = forwardRef<XTerminalHandle, XTerminalProps>(({
  theme = 'dark',
  fontSize = 13,
  fontFamily,
  cursorBlink = true,
  defaultShell = 'bash',
  onReady,
  onData,
  className = '',
  style,
  wsUrl,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tabs, setTabs] = useState<XTerminalTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [showShellPicker, setShowShellPicker] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchAddonRef = useRef<SearchAddon | null>(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useImperativeHandle(ref, () => ({
    focus: () => activeTab?.term?.focus(),
    write: (data: string) => activeTab?.term?.write(data),
    clear: () => activeTab?.term?.clear(),
    getCurrentTabId: () => activeTabId,
  }), [activeTab, activeTabId]);

  useEffect(() => {
    if (!containerRef.current || tabs.length > 0) return;

    const container = containerRef.current;
    const tabId = `xtab-${Date.now()}`;
    const { term, fit } = createXTerminal(container, { theme, fontSize, fontFamily, cursorBlink, shell: defaultShell });

    const newTab: XTerminalTab = {
      id: tabId,
      name: `${defaultShell} #1`,
      shell: defaultShell,
      term,
      fitAddon: fit,
      socket: null,
    };

    setTabs([newTab]);
    setActiveTabId(tabId);

    if (wsUrl) {
      try {
        const socket = new WebSocket(wsUrl);
        socket.onopen = () => {
          term.write('\r\n\x1b[32m\u2713 Connected to backend PTY\x1b[0m\r\n');
        };
        socket.onmessage = (evt) => term.write(evt.data);
        socket.onclose = () => {
          term.write('\r\n\x1b[31m\u2717 Disconnected from backend\x1b[0m\r\n');
        };
        socket.onerror = () => {
          term.write('\r\n\x1b[31m\u2717 Connection error\x1b[0m\r\n');
        };
        term.onData((data: string) => {
          if (socket.readyState === WebSocket.OPEN) socket.send(data);
        });
        newTab.socket = socket;
        setTabs(prev => prev.map(t => t.id === tabId ? { ...t, socket } : t));
      } catch {
        term.write('\r\n\x1b[33m! WebSocket unavailable — running in local mode\x1b[0m\r\n');
      }
    }

    term.onData((data: string) => {
      if (onData) onData(data);
    });

    if (onReady) onReady(term);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        try { fit.fit(); } catch {}
      });
      resizeObserver.observe(container);
    }

    return () => {
      resizeObserver?.disconnect();
      term.dispose();
      newTab.socket?.close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      tabs.forEach(tab => {
        if (tab.term && tab.fitAddon) {
          try { tab.fitAddon.fit(); } catch {}
        }
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs]);

  const addTab = useCallback((shell: string) => {
    if (!containerRef.current) return;
    const idx = tabs.length + 1;
    const tabId = `xtab-${Date.now()}-${idx}`;

    const wrapper = document.createElement('div');
    wrapper.style.display = activeTabId ? 'none' : '';
    wrapper.style.height = '100%';
    containerRef.current.appendChild(wrapper);

    const { term, fit } = createXTerminal(wrapper, { theme, fontSize, fontFamily, cursorBlink, shell });

    term.onData((data: string) => { if (onData) onData(data); });

    const newTab: XTerminalTab = { id: tabId, name: `${shell} #${idx}`, shell, term, fitAddon: fit, socket: null };

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(tabId);
    setShowShellPicker(false);

    if (onReady) onReady(term);
  }, [tabs.length, activeTabId, theme, fontSize, fontFamily, cursorBlink, onData, onReady]);

  const switchTab = useCallback((tabId: string) => {
    if (!containerRef.current) return;
    const containers = containerRef.current.children;
    Array.from(containers).forEach(c => { (c as HTMLElement).style.display = 'none'; });
    const idx = tabs.findIndex(t => t.id === tabId);
    if (idx >= 0 && containers[idx]) {
      (containers[idx] as HTMLElement).style.display = '';
      tabs[idx].term?.focus();
      setTimeout(() => { try { tabs[idx].fitAddon.fit(); } catch {} }, 10);
    }
    setActiveTabId(tabId);
  }, [tabs]);

  const closeTab = useCallback((tabId: string) => {
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex(t => t.id === tabId);
    if (idx < 0) return;

    tabs[idx].term?.dispose();
    tabs[idx].socket?.close();

    if (containerRef.current && containerRef.current.children[idx]) {
      containerRef.current.removeChild(containerRef.current.children[idx]);
    }

    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      const nextTab = newTabs[0];
      if (nextTab) switchTab(nextTab.id);
    }
  }, [tabs, activeTabId, switchTab]);

  const handleSearch = useCallback(() => {
    if (!activeTab?.term) return;
    if (!searchAddonRef.current) {
      const searchAddon = new SearchAddon();
      activeTab.term.loadAddon(searchAddon);
      searchAddonRef.current = searchAddon;
    }
    if (searchQuery) {
      searchAddonRef.current.findNext(searchQuery, { regex: false, caseSensitive: false });
    } else {
      searchAddonRef.current?.clearDecorations();
    }
  }, [activeTab, searchQuery]);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, handleSearch]);

  return (
    <div className={`flex flex-col h-full bg-[#0c0d13] overflow-hidden ${className}`} style={style}>
      {/* Tab bar */}
      <div className="flex items-center justify-between px-1.5 py-0.5 border-b border-white/[0.04] shrink-0 min-h-[32px]">
        <div className="flex items-center gap-0.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => switchTab(t.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] cursor-pointer transition-colors shrink-0 ${
                t.id === activeTabId ? 'bg-white/[0.08] text-white/70' : 'text-white/30 hover:bg-white/[0.04] hover:text-white/50'
              }`}
            >
              <TermIcon size={10} />
              <span>{t.name}</span>
              {tabs.length > 1 && (
                <X size={9} className="text-white/20 hover:text-white/60 ml-0.5"
                  onClick={(e) => { e.stopPropagation(); closeTab(t.id); }} />
              )}
            </button>
          ))}

          {/* Add tab / Shell picker */}
          <button
            onClick={() => setShowShellPicker(!showShellPicker)}
            className="p-1 rounded-md text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-colors"
            title="新建标签页"
          >
            <Plus size={12} />
          </button>

          {showShellPicker && (
            <div className="absolute mt-8 ml-[-60px] bg-[#16171e] border border-white/[0.08] rounded-lg shadow-xl z-50 py-1 min-w-[140px]">
              {SHELL_OPTIONS.map(sh => (
                <button
                  key={sh}
                  onClick={() => addTab(sh)}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-[11px] text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <TermIcon size={10} />
                  <span>{sh}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-1 rounded-md text-[11px] transition-colors ${showSearch ? 'text-indigo-400' : 'text-white/25 hover:text-white/50'} hover:bg-white/[0.06]`}
            title="搜索终端输出"
          >
            <Search size={12} />
          </button>
          <button
            onClick={() => { navigator.clipboard?.writeText(activeTab?.term?.getSelection()?.toString() || ''); }}
            className="p-1 rounded-md text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-colors"
            title="复制选中内容"
          >
            <Copy size={12} />
          </button>
          <button
            onClick={() => { activeTab?.term?.clear(); }}
            className="p-1 rounded-md text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-colors"
            title="清空终端"
          >
            <Trash2 size={12} />
          </button>
          <button
            onClick={() => setIsMaximized(v => !v)}
            className="p-1 rounded-md text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-colors"
            title={isMaximized ? "还原" : "最大化"}
          >
            {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/[0.04] bg-[#0c0d13]">
          <Search size={12} className="text-white/30 shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索终端输出..."
            className="flex-1 bg-transparent text-[11px] text-white/70 placeholder:text-white/25 outline-none"
          />
          <button
            onClick={() => { setSearchQuery(''); setShowSearch(false); searchAddonRef.current?.clearDecorations(); }}
            className="px-2 py-0.5 rounded text-[10px] text-white/40 hover:text-white/60 hover:bg-white/[0.06]"
          >
            关闭
          </button>
        </div>
      )}

      {/* Terminal canvas area */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        style={{ minHeight: 120 }}
      />
    </div>
  );
});

XTerminal.displayName = 'XTerminal';
export default XTerminal;
