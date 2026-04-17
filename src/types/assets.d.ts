/**
 * file: assets.d.ts
 * description: 静态资源类型声明 — 图片、字体、Figma 资源模块类型定义
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-03-08
 * updated: 2026-04-04
 * status: stable
 * tags: types,assets,declarations
 */

declare module 'figma:asset/*' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '@babel/standalone' {
  interface BabelTransformOptions {
    presets?: string[];
    plugins?: string[];
    filename?: string;
    sourceType?: 'module' | 'script' | 'unambiguous';
  }

  interface BabelTransformResult {
    code: string;
    map?: object;
    ast?: object;
  }

  export function transform(code: string, options?: BabelTransformOptions): BabelTransformResult;
  export function transformSync(code: string, options?: BabelTransformOptions): BabelTransformResult;
  export function transformFromAst(ast: object, code: string, options?: BabelTransformOptions): BabelTransformResult;
  export const availablePresets: Record<string, unknown>;
  export const availablePlugins: Record<string, unknown>;
  export function registerPreset(name: string, preset: unknown): void;
  export function registerPlugin(name: string, plugin: unknown): void;
}
