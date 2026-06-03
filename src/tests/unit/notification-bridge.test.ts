/**
 * file: notification-bridge.test.ts
 * description: notification.ts 单元测试 — 通知桥接、权限管理、快捷方法
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-06-04
 * updated: 2026-06-04
 * status: dev
 * tags: testing,unit,notification,bridge
 * priority: P0
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Notification 构造函数 mock
 * 同时模拟静态方法 requestPermission 和构造函数行为
 */
function createNotificationMock(permission: 'granted' | 'denied' | 'default') {
  const MockNotification = vi.fn() as unknown as typeof Notification;
  MockNotification.requestPermission = vi.fn().mockResolvedValue(permission);
  Object.defineProperty(MockNotification, 'permission', {
    value: permission,
    writable: true,
    configurable: true,
  });
  return MockNotification;
}

describe('NotificationBridge — 通知桥接', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  /* ── send ── */

  describe('send()', () => {
    it('TC-NTF-001: Notification API 不可用时使用 console.log 回退', async () => {
      // 移除 Notification，使其不在 window 上
      const origNotify = globalThis.Notification;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (globalThis as any).Notification;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (window as any).Notification;

      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      // 清除模块缓存以重新评估 'Notification' in window
      const { NotificationBridge } = await import('../../bridge/notification');
      await NotificationBridge.send({ title: '测试', body: '消息内容' });
      expect(logSpy).toHaveBeenCalledWith('[Notification] 测试: 消息内容');

      // restore
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).Notification = origNotify;
    });

    it('TC-NTF-002: 权限被授予时创建 Notification 实例', async () => {
      const MockNotif = createNotificationMock('granted');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).Notification = MockNotif;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Notification = MockNotif;

      const { NotificationBridge } = await import('../../bridge/notification');
      await NotificationBridge.send({ title: 'Hi', body: 'Body' });

      expect(MockNotif.requestPermission).toHaveBeenCalled();
      // 权限被授予后应创建 Notification 实例
      expect(MockNotif).toHaveBeenCalledWith('Hi', { body: 'Body', icon: undefined });
    });

    it('TC-NTF-003: 权限被拒绝时不应创建 Notification', async () => {
      const MockNotif = createNotificationMock('denied');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).Notification = MockNotif;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).Notification = MockNotif;
      const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

      const { NotificationBridge } = await import('../../bridge/notification');
      await NotificationBridge.send({ title: '跳过', body: 'Body' });

      expect(MockNotif.requestPermission).toHaveBeenCalled();
      // 权限被拒绝，不应创建 Notification 实例
      expect(MockNotif).not.toHaveBeenCalled();
      // 不应有 console 日志（代码只在 catch 中 log）
      expect(logSpy).not.toHaveBeenCalled();
    });
  });

  /* ── 快捷方法 ── */

  describe('快捷方法', () => {
    it('TC-NTF-010: success() 调用 send 并传入标题 "成功"', async () => {
      const { NotificationBridge } = await import('../../bridge/notification');
      const spy = vi.spyOn(NotificationBridge, 'send').mockImplementation(async () => {});
      await NotificationBridge.success('操作完成');
      expect(spy).toHaveBeenCalledWith({ title: '成功', body: '操作完成' });
    });

    it('TC-NTF-011: error() 调用 send 并传入标题 "错误"', async () => {
      const { NotificationBridge } = await import('../../bridge/notification');
      const spy = vi.spyOn(NotificationBridge, 'send').mockImplementation(async () => {});
      await NotificationBridge.error('系统异常');
      expect(spy).toHaveBeenCalledWith({ title: '错误', body: '系统异常' });
    });

    it('TC-NTF-012: warning() 调用 send 并传入标题 "警告"', async () => {
      const { NotificationBridge } = await import('../../bridge/notification');
      const spy = vi.spyOn(NotificationBridge, 'send').mockImplementation(async () => {});
      await NotificationBridge.warning('资源不足');
      expect(spy).toHaveBeenCalledWith({ title: '警告', body: '资源不足' });
    });

    it('TC-NTF-013: info() 调用 send 并传入标题 "信息"', async () => {
      const { NotificationBridge } = await import('../../bridge/notification');
      const spy = vi.spyOn(NotificationBridge, 'send').mockImplementation(async () => {});
      await NotificationBridge.info('服务已启动');
      expect(spy).toHaveBeenCalledWith({ title: '信息', body: '服务已启动' });
    });
  });
});