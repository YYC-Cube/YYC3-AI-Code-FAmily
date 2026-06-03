/**
 * @file src/bridge/system.ts
 * @description 宿主机桥接 — 系统 API，浏览器兼容实现
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags bridge,system,os
 */

/** 系统信息 */
export interface SystemInfo {
  os: string;
  arch: string;
  version: string;
  hostname: string;
  username: string;
}

/** 进程信息 */
export interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
}

/**
 * 统一的系统接口
 */
export const SystemBridge = {
  /** 获取系统信息 */
  async getSystemInfo(): Promise<SystemInfo> {
    const ua = navigator.userAgent;
    let os = 'unknown';
    let arch = 'unknown';

    if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Mac')) os = 'macOS';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('Android')) os = 'Android';
    else if (ua.includes('iOS')) os = 'iOS';

    const archMatch = ua.match(/(x86_64|arm64|arm|x64)/i);
    if (archMatch) arch = archMatch[0];

    return {
      os,
      arch,
      version: ua,
      hostname: window.location.hostname || 'localhost',
      username: 'browser-user',
    };
  },

  /** 获取进程信息 */
  async getProcessInfo(): Promise<ProcessInfo> {
    const mem = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
    return {
      pid: Math.floor(Math.random() * 10000),
      name: 'browser-tab',
      cpu: 0,
      memory: mem?.usedJSHeapSize || 0,
    };
  },

  /** 执行系统命令（浏览器环境不支持） */
  async execCommand(_command: string, _args: string[] = []): Promise<string> {
    throw new Error('execCommand is not supported in browser environment');
  },

  /** 打开外部 URL */
  async openUrl(url: string): Promise<void> {
    window.open(url, '_blank', 'noopener,noreferrer');
  },

  /** 读取剪贴板内容 */
  async readClipboard(): Promise<string> {
    try {
      return await navigator.clipboard.readText();
    } catch {
      return '';
    }
  },

  /** 写入剪贴板 */
  async writeClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 静默失败
    }
  },
} as const;