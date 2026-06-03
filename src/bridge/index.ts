/**
 * @file src/bridge/index.ts
 * @description 宿主机桥接统一导出入口
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags bridge,exports
 */

export { HostBridge } from './host';
export type { FileMetadata, FileWatcherEvent, FileWatcherCallback, FileWatcherHandle } from './host';
export { DialogBridge } from './dialog';
export type { DialogOptions, DialogResult } from './dialog';
export { NotificationBridge } from './notification';
export type { NotificationOptions } from './notification';
export { SystemBridge } from './system';
export type { SystemInfo, ProcessInfo } from './system';