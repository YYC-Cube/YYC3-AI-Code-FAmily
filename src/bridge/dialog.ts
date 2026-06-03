/**
 * @file src/bridge/dialog.ts
 * @description 宿主机桥接 — 对话框 API，纯浏览器兼容实现
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-06-04
 * @updated 2026-06-04
 * @status dev
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags bridge,dialog
 */

/** 对话框选项 */
export interface DialogOptions {
  title?: string;
  defaultPath?: string;
  filters?: Array<{ name: string; extensions: string[] }>;
  multiple?: boolean;
  directory?: boolean;
}

/** 对话框结果 */
export interface DialogResult {
  path: string | null;
  paths: string[] | null;
}

/**
 * 统一的对话框接口（浏览器兼容实现）
 */
export const DialogBridge = {
  /** 打开文件对话框 */
  async openFile(options: DialogOptions = {}): Promise<DialogResult> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = options.multiple ?? false;

      if (options.directory) {
        input.setAttribute('webkitdirectory', '');
        input.setAttribute('directory', '');
      }

      if (options.filters) {
        input.accept = options.filters
          .flatMap((f) => f.extensions.map((ext) => `.${ext}`))
          .join(',');
      }

      input.onchange = () => {
        const files = input.files;
        if (!files || files.length === 0) {
          resolve({ path: null, paths: null });
          return;
        }
        const paths = Array.from(files).map((f) => f.name);
        resolve({ path: paths[0], paths });
      };
      input.click();
    });
  },

  /** 保存文件对话框 */
  async saveFile(options: DialogOptions = {}): Promise<string | null> {
    return options.defaultPath || 'untitled.txt';
  },

  /** 选择目录对话框 */
  async selectDirectory(_options: DialogOptions = {}): Promise<string | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.setAttribute('webkitdirectory', '');
      input.setAttribute('directory', '');
      input.onchange = () => {
        const files = input.files;
        if (!files || files.length === 0) {
          resolve(null);
          return;
        }
        const dir = files[0].webkitRelativePath.split('/')[0];
        resolve(dir || null);
      };
      input.click();
    });
  },
} as const;