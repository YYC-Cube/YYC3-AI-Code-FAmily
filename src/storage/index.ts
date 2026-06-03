/**
 * @file src/storage/index.ts
 * @description 存储层统一导出入口
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags storage,exports
 */

export { db } from './db';
export type { Note, Project, FileRecord, SyncRecord, AIConversation } from './db';
export { encrypt, decrypt, generateRandomPassword } from './encryption';
export { SyncService, syncService } from './sync';
export { StorageService, storageService } from './storage-service';