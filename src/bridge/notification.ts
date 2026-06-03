/**
 * @file src/bridge/notification.ts
 * @description 宿主机桥接 — 通知 API，纯浏览器兼容实现
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags bridge,notification
 */

/** 通知选项 */
export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  sound?: string;
  timeout?: number;
}

/**
 * 统一的系统通知接口（浏览器兼容实现）
 */
export const NotificationBridge = {
  /** 发送系统通知 */
  async send(options: NotificationOptions): Promise<void> {
    if (!('Notification' in window)) {
      // eslint-disable-next-line no-console
      console.log(`[Notification] ${options.title}: ${options.body}`);
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification(options.title, {
          body: options.body,
          icon: options.icon,
        });
      }
    } catch {
      // 浏览器可能不支持 Notification
      // eslint-disable-next-line no-console
      console.log(`[Notification] ${options.title}: ${options.body}`);
    }
  },

  /** 发送成功通知 */
  async success(message: string): Promise<void> {
    await this.send({ title: '成功', body: message });
  },

  /** 发送错误通知 */
  async error(message: string): Promise<void> {
    await this.send({ title: '错误', body: message });
  },

  /** 发送警告通知 */
  async warning(message: string): Promise<void> {
    await this.send({ title: '警告', body: message });
  },

  /** 发送信息通知 */
  async info(message: string): Promise<void> {
    await this.send({ title: '信息', body: message });
  },
} as const;