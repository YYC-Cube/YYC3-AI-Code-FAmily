/**
 * @file src/bridge/host.ts
 * @description 宿主机桥接 — 文件系统 API，纯浏览器兼容实现（虚拟文件系统 + File API）
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags bridge,host,filesystem
 */

/** 文件元数据 */
export interface FileMetadata {
  path: string;
  name: string;
  size: number;
  modified: number;
  isFile: boolean;
  isDir: boolean;
}

/** 文件监控事件 */
export interface FileWatcherEvent {
  path: string;
  type: 'created' | 'modified' | 'deleted';
  timestamp: number;
}

/** 文件监控回调 */
export type FileWatcherCallback = (event: FileWatcherEvent) => void;

/** 文件监控句柄 */
export interface FileWatcherHandle {
  unwatch: () => Promise<void>;
}

/**
 * 虚拟文件系统（内存存储，用于浏览器环境模拟文件系统操作）
 */
class VirtualFileSystem {
  private store = new Map<string, { content: string; metadata: FileMetadata }>();

  async readFile(path: string): Promise<string> {
    const entry = this.store.get(path);
    if (!entry) throw new Error(`File not found: ${path}`);
    return entry.content;
  }

  async writeFile(path: string, content: string): Promise<void> {
    const name = path.split('/').pop() || 'unknown';
    this.store.set(path, {
      content,
      metadata: {
        path,
        name,
        size: content.length,
        modified: Date.now(),
        isFile: true,
        isDir: false,
      },
    });
  }

  async readDir(path: string): Promise<FileMetadata[]> {
    const entries: FileMetadata[] = [];
    const prefix = path.endsWith('/') ? path : `${path}/`;

    for (const [, value] of this.store.entries()) {
      if (value.metadata.path.startsWith(prefix)) {
        entries.push(value.metadata);
      }
    }
    return entries;
  }

  async createDir(path: string): Promise<void> {
    const name = path.split('/').pop() || 'unknown';
    if (!this.store.has(path)) {
      this.store.set(path, {
        content: '',
        metadata: {
          path,
          name,
          size: 0,
          modified: Date.now(),
          isFile: false,
          isDir: true,
        },
      });
    }
  }

  async removeDir(path: string): Promise<void> {
    const prefix = path.endsWith('/') ? path : `${path}/`;
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix) || key === path) {
        this.store.delete(key);
      }
    }
  }

  async removeFile(path: string): Promise<void> {
    this.store.delete(path);
  }

  async renameFile(oldPath: string, newPath: string): Promise<void> {
    const entry = this.store.get(oldPath);
    if (!entry) throw new Error(`File not found: ${oldPath}`);
    this.store.delete(oldPath);
    entry.metadata.path = newPath;
    entry.metadata.name = newPath.split('/').pop() || 'unknown';
    this.store.set(newPath, entry);
  }

  async exists(path: string): Promise<boolean> {
    return this.store.has(path);
  }

  async getMetadata(path: string): Promise<FileMetadata> {
    const entry = this.store.get(path);
    if (!entry) throw new Error(`File not found: ${path}`);
    return { ...entry.metadata };
  }
}

const vfs = new VirtualFileSystem();

/**
 * 统一的文件系统接口（浏览器兼容实现）
 *
 * 当切换到 Tauri 桌面端时，可在此处添加 Tauri API 调用分支，
 * 上层业务代码无需修改。
 */
export const HostBridge = {
  /** 读取用户选定的文件（通过浏览器文件选择器） */
  async pickAndReadFile(): Promise<{ path: string; content: string }> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt,.md,.json,.ts,.tsx,.js,.jsx';
      input.onchange = async () => {
        const file = input.files?.[0];
        if (!file) {
          reject(new Error('用户取消了文件选择'));
          return;
        }
        const content = await file.text();
        resolve({ path: file.name, content });
      };
      input.click();
    });
  },

  /** 读取文件内容 */
  async readFile(path: string): Promise<string> {
    return vfs.readFile(path);
  },

  /** 写入文件（浏览器环境：写入虚拟文件系统并触发下载） */
  async writeFile(filename: string, data: string): Promise<string> {
    await vfs.writeFile(filename, data);

    // 触发浏览器下载
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    return filename;
  },

  /** 读取目录内容 */
  async readDir(path: string): Promise<FileMetadata[]> {
    return vfs.readDir(path);
  },

  /** 创建目录 */
  async createDir(path: string): Promise<void> {
    await vfs.createDir(path);
  },

  /** 删除目录 */
  async removeDir(path: string): Promise<void> {
    await vfs.removeDir(path);
  },

  /** 删除文件 */
  async removeFile(path: string): Promise<void> {
    await vfs.removeFile(path);
  },

  /** 重命名文件 */
  async renameFile(oldPath: string, newPath: string): Promise<void> {
    await vfs.renameFile(oldPath, newPath);
  },

  /** 检查文件是否存在 */
  async fileExists(path: string): Promise<boolean> {
    return vfs.exists(path);
  },

  /** 监控文件变化 */
  async watchFile(
    _path: string,
    _callback: FileWatcherCallback
  ): Promise<FileWatcherHandle> {
    return { unwatch: async () => {} };
  },

  /** 批量读取文件 */
  async readFiles(paths: string[]): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    for (const path of paths) {
      try {
        const content = await this.readFile(path);
        results.set(path, content);
      } catch (error) {
        console.error(`读取文件失败 ${path}:`, error);
      }
    }
    return results;
  },

  /** 批量写入文件 */
  async writeFiles(files: Map<string, string>): Promise<void> {
    for (const [path, data] of files.entries()) {
      try {
        await this.writeFile(path, data);
      } catch (error) {
        console.error(`写入文件失败 ${path}:`, error);
      }
    }
  },

  /** 获取文件元数据 */
  async getFileMetadata(path: string): Promise<FileMetadata> {
    return vfs.getMetadata(path);
  },
} as const;