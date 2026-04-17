# P0-核心架构

> Source: YYC-Cube/YanYuCloud @ YYC3-Design-Prompt/P0-核心架构/
> 完整内容: https://github.com/YYC-Cube/YanYuCloud/tree/main/YYC3-Design-Prompt/P0-核心架构

## 文件清单

| 文件 | 大小 | 说明 |
|------|------|------|
| YYC3-P0-架构-项目初始化.md | 19.8KB | Monorepo 初始化、package.json、tsconfig、Vite/Tauri 配置 |
| YYC3-P0-架构-目录结构.md | 24.4KB | 完整目录结构规范、命名规范、文件组织原则 |
| YYC3-P0-架构-类型定义.md | 15.7KB | TypeScript 核心类型：AppConfig、User、Project、Editor、Layout、AI、Collaboration、Storage |
| YYC3-P0-架构-构建配置.md | 8.8KB | Vite 配置、TypeScript 配置、ESLint/Prettier 配置 |
| YYC3-P0-架构-宿主机桥接.md | 28.6KB | Tauri HostBridge（文件系统/对话框/通知/系统 API）+ Rust 后端实现 |
| YYC3-P0-架构-本地存储.md | 38.2KB | Dexie.js + IndexedDB ORM、Web Crypto API 加密、同步服务、LRU 缓存 |

## 核心架构要点

### 技术栈
- React 18.3.1 + TypeScript 5.3.3 + Vite 5.0.12
- Tauri (原生桥接) + Rust 后端
- Zustand + Immer (状态管理)
- Dexie.js + IndexedDB (本地存储)
- Web Crypto API (数据加密)

### FEFS 模式 (Front-End-Only Full-Stack)
UI 运行在 Web 栈，所有业务逻辑/持久化/外部集成在前端运行时通过原生宿主桥接(Tauri)实现。

### 核心类型
- `AppConfig` / `EnvConfig` — 应用配置
- `User` / `AuthUser` — 用户与认证
- `Project` / `ProjectSettings` — 项目管理
- `EditorState` / `EditorConfig` — 编辑器状态
- `Panel` / `LayoutConfig` — 布局面板
- `AIProvider` / `AIModel` / `AIMessage` / `AIRequestConfig` / `AIResponse` — AI 集成
- `Collaborator` / `CollaborationState` — 实时协作
- `Note` / `FileRecord` / `SyncRecord` — 存储同步
