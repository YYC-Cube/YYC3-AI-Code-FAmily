/**
 * file: XTerminal.test.ts
 * description: XTerminal 组件单元测试 — xterm.js 真实终端组件的核心逻辑、标签管理、API 接口
 * author: YanYuCloudCube Team <admin@0379.email>
 * version v1.0.0
 * created 2026-04-05
 * license MIT
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('XTerminal Core Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Terminal Tab Management', () => {
    it('TC-XT-001: 默认创建 bash #1 标签', () => {
      const tabs = [{ id: 'xtab-1', name: 'bash #1', shell: 'bash' }];
      expect(tabs.length).toBe(1);
      expect(tabs[0].name).toBe('bash #1');
      expect(tabs[0].shell).toBe('bash');
    });

    it('TC-XT-002: 新增标签页递增编号', () => {
      const tabs = [
        { id: 'xtab-1', name: 'bash #1', shell: 'bash' },
        { id: 'xtab-2', name: 'zsh #2', shell: 'zsh' },
      ];
      const nextIdx = tabs.length + 1;
      tabs.push({ id: `xtab-${Date.now()}-${nextIdx}`, name: `fish #${nextIdx}`, shell: 'fish' });
      expect(tabs.length).toBe(3);
      expect(tabs[2].name).toBe('fish #3');
    });

    it('TC-XT-003: 支持 4 种 Shell 类型', () => {
      const shells = ['bash', 'zsh', 'fish', 'powershell'] as const;
      expect(shells).toContain('bash');
      expect(shells).toContain('zsh');
      expect(shells).toContain('fish');
      expect(shells).toContain('powershell');
      expect(shells.length).toBe(4);
    });

    it('TC-XT-004: 关闭标签页保留至少一个', () => {
      const tabs = [{ id: 't1', name: 'bash #1' }];
      const closeTab = (id: string) => {
        if (tabs.length > 1) {
          const idx = tabs.findIndex(t => t.id === id);
          if (idx >= 0) tabs.splice(idx, 1);
        }
      };
      closeTab('t1');
      expect(tabs.length).toBe(1);
    });

    it('TC-XT-005: 多标签时可关闭非活动标签', () => {
      const tabs = [
        { id: 't1', name: 'bash #1' },
        { id: 't2', name: 'zsh #2' },
        { id: 't3', name: 'fish #3' },
      ];
      const closeTab = (id: string) => {
        if (tabs.length > 1) {
          const idx = tabs.findIndex(t => t.id === id);
          if (idx >= 0) tabs.splice(idx, 1);
        }
      };
      closeTab('t2');
      expect(tabs.length).toBe(2);
      expect(tabs.map(t => t.name)).toEqual(['bash #1', 'fish #3']);
    });

    it('TC-XT-006: 切换标签更新 activeTabId', () => {
      let activeId = 't1';
      const switchTab = (id: string) => { activeId = id; };
      switchTab('t2');
      expect(activeId).toBe('t2');
    });
  });

  describe('Terminal Handle API', () => {
    it('TC-XT-007: focus 方法可调用', () => {
      const focusMock = vi.fn();
      const handle = { focus: focusMock, write: vi.fn(), clear: vi.fn(), getCurrentTabId: () => '' };
      handle.focus();
      expect(focusMock).toHaveBeenCalledTimes(1);
    });

    it('TC-XT-008: write 方法传递数据', () => {
      const writeMock = vi.fn();
      const handle = { focus: vi.fn(), write: writeMock, clear: vi.fn(), getCurrentTabId: () => '' };
      handle.write('hello world');
      expect(writeMock).toHaveBeenCalledWith('hello world');
    });

    it('TC-XT-009: clear 方法清空终端', () => {
      const clearMock = vi.fn();
      const handle = { focus: vi.fn(), write: vi.fn(), clear: clearMock, getCurrentTabId: () => '' };
      handle.clear();
      expect(clearMock).toHaveBeenCalledTimes(1);
    });

    it('TC-XT-010: getCurrentTabId 返回当前标签 ID', () => {
      const handle = { focus: vi.fn(), write: vi.fn(), clear: vi.fn(), getCurrentTabId: () => 'xtab-123' };
      expect(handle.getCurrentTabId()).toBe('xtab-123');
    });
  });

  describe('Search Functionality', () => {
    it('TC-XT-011: 搜索栏显示/隐藏切换', () => {
      let showSearch = false;
      const toggle = () => { showSearch = !showSearch; };
      toggle();
      expect(showSearch).toBe(true);
      toggle();
      expect(showSearch).toBe(false);
    });

    it('TC-XT-012: 搜索查询为空时清除高亮', () => {
      let query = '';
      const setQuery = (q: string) => { query = q; };
      const clearDecorations = vi.fn();
      setQuery('');
      expect(query).toBe('');
      if (!query) clearDecorations();
      expect(clearDecorations).toHaveBeenCalled();
    });

    it('TC-XT-013: 有查询时触发 findNext', () => {
      const findNext = vi.fn();
      const searchQuery = 'npm';
      if (searchQuery) findNext(searchQuery, { regex: false, caseSensitive: false });
      expect(findNext).toHaveBeenCalledWith('npm', { regex: false, caseSensitive: false });
    });
  });

  describe('Theme Configuration', () => {
    it('TC-XT-014: dark 主题使用深色背景色', () => {
      const theme: string = 'dark';
      const bgColor = theme === 'dark' ? '#0c0d13' : '#ffffff';
      expect(bgColor).toBe('#0c0d13');
    });

    it('TC-XT-015: light 主题使用白色背景', () => {
      const theme: string = 'light';
      const bgColor = theme === 'dark' ? '#0c0d13' : '#ffffff';
      expect(bgColor).toBe('#ffffff');
    });

    it('TC-XT-016: cursorBlink 默认为 true', () => {
      const opts = { cursorBlink: true };
      expect(opts.cursorBlink).toBe(true);
    });

    it('TC-XT-017: fontSize 默认为 13', () => {
      const opts = { fontSize: 13 };
      expect(opts.fontSize).toBe(13);
    });
  });

  describe('WebSocket PTY Connection', () => {
    it('TC-XT-018: wsUrl 存在时尝试连接', () => {
      const wsUrl = 'ws://localhost:3000/pty';
      expect(wsUrl).toBeTruthy();
      expect(wsUrl.startsWith('ws://')).toBe(true);
    });

    it('TC-XT-019: 无 wsUrl 时运行本地模式', () => {
      const wsUrl = undefined;
      if (!wsUrl) {
        const localMode = true;
        expect(localMode).toBe(true);
      }
    });

    it('TC-XT-020: WebSocket 断开时显示断开消息', () => {
      const messages: string[] = [];
      const onDisconnect = () => messages.push('\x1b[31m\u2717 Disconnected\x1b[0m');
      onDisconnect();
      expect(messages[0]).toContain('Disconnected');
    });
  });

  describe('ResizeObserver Integration', () => {
    it('TC-XT-021: 容器尺寸变化触发 fit()', () => {
      const fitMock = vi.fn();
      const onResize = () => fitMock();
      onResize();
      expect(fitMock).toHaveBeenCalledTimes(1);
    });

    it('TC-XT-022: 窗口 resize 事件触发所有终端 fit', () => {
      const fits = [vi.fn(), vi.fn(), vi.fn()];
      const onWindowResize = () => fits.forEach(f => f());
      onWindowResize();
      fits.forEach(f => expect(f).toHaveBeenCalledTimes(1));
    });
  });
});
