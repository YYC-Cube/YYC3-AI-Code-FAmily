<div align="center">

<img src="public/Family-001.png" alt="YYC³ AI Code Family — 双系统 AI 编程平台" width="100%" />

# YYC³ AI Code · Family

### 「言启象限 · 语枢未来」双系统 AI 编程工作台

**Words Initiate Quadrants · Language Serves as Core for Future**

[![Deploy Status](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/actions/workflows/deploy.yml)
[![Live Site](https://img.shields.io/badge/Live-ai--family.yyc3.top-667eea?style=flat&logo=googlechrome&logoColor=white)](https://ai-family.yyc3.top)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat)](./LICENSE)
[![GitHub Release](https://img.shields.io/github/v/release/YYC-Cube/YYC3-AI-Code-FAmily?include_prereleases&style=flat&logo=github)](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/releases)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9-F69220?style=flat&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vitest](https://img.shields.io/badge/Vitest-Pass-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)

[![Tests](https://img.shields.io/badge/Tests-466%2F466%20passed-success?style=flat)](#-测试)
[![ESLint](https://img.shields.io/badge/ESLint-0%20warnings-success?style=flat&logo=eslint&logoColor=white)](#-代码质量)
[![Coverage](https://img.shields.io/badge/Coverage-Statements%2085%25-yellow?style=flat)](#-测试)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat&logo=github)](./CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/YYC-Cube/YYC3-AI-Code-FAmily?style=flat&logo=github)](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/stargazers)
[![Discord](https://img.shields.io/badge/Discord-Join-5865F2?style=flat&logo=discord&logoColor=white)](https://discord.gg/yyc3)

**🌐 在线体验**: **<https://ai-family.yyc3.top>**
**📦 源码仓库**: **<https://github.com/YYC-Cube/YYC3-AI-Code-FAmily>**
**📖 完整文档**: **[docs/](./docs)** · **[Wiki](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/wiki)**

</div>

---

## 📑 目录

- [✨ 项目亮点](#-项目亮点)
- [🧬 双系统架构](#-双系统架构)
- [🎯 核心特性](#-核心特性)
- [🚀 快速开始](#-快速开始)
- [🛠️ 技术栈](#️-技术栈)
- [📂 项目结构](#-项目结构)
- [📖 使用指南](#-使用指南)
- [🔧 开发指南](#-开发指南)
- [🧪 测试](#-测试)
- [🌐 部署](#-部署)
- [📚 文档导航](#-文档导航)
- [🤝 贡献指南](#-贡献指南)
- [🔒 安全策略](#-安全策略)
- [🌍 路线图](#-路线图)
- [❓ FAQ](#-faq)
- [📞 联系我们](#-联系我们)
- [🙏 致谢](#-致谢)
- [📄 许可证](#-许可证)

---

## ✨ 项目亮点

> **YYC³ AI Code · Family** 是一款基于 **Front-End-Only Full-Stack (FEFS)** 模式的桌面级 AI 辅助双系统编程平台，融合"**所见即所得**"与"**所写即所得**"两种生产力范式。

| 维度 | 描述 |
|------|------|
| 🎯 **定位** | AI Code × Visual Designer 双系统融合智能生产力工作台 |
| 🧬 **架构** | 路由级双系统隔离 + 跨路由桥通信 + 共享底层基础设施 |
| 🚀 **模式** | Front-End-Only Full-Stack (FEFS) — 浏览器即后端 |
| 🎨 **理念** | 设计即代码 · 代码即设计 · 双向流通 |
| 🌐 **部署** | GitHub Pages + 自定义域名 + CI/CD 全自动 |

### 🏆 核心能力速览

- 🎨 **设计即代码** — Figma 设计直接转换为 React/Vue/Angular 生产代码
- 👁️ **实时预览** — 每次变更即时反映在多面板画布
- 📐 **多面板布局** — 拖拽 / 合并 / 分割 / 浮动窗口管理
- 🤖 **多模型 AI** — OpenAI / Anthropic / 智谱 / 文心 / 通义 / Ollama
- ⚙️ **配置即部署** — 设计/代码 → 生产环境一键直通
- 👥 **CRDT 协同** — 基于 Yjs 的多人实时协作
- 🔌 **插件系统** — 可扩展的插件注册中心
- 🛡️ **三级容错** — App / Route / Component 级 ErrorBoundary 自动恢复
- 🌗 **三套主题** — Classic · Liquid Glass · Aurora

---

## 🧬 双系统架构

YYC³ 采用「**和而不同**」的双系统设计哲学，通过智能意图路由实现无缝切换：

```text
                          ┌──────────────────────────┐
                          │   /  (AIHomePage)         │
                          │   智能意图路由中枢          │
                          │   32 类 INTENT_RULES      │
                          └──────────┬───────────────┘
                                     │ analyzeIntent()
                ┌────────────────────┴────────────────────┐
                ▼                                          ▼
   ┌─────────────────────────┐              ┌─────────────────────────┐
   │   /designer              │              │   /ai-code               │
   │   🎨 Designer System     │  ← bridge →  │   💻 AI Code System      │
   │   "所见即所得"            │              │   "所写即所得"           │
   │   34 components          │              │   17 components          │
   │   DesignerProvider       │              │   Monaco + Terminal      │
   │   3 套 UI 主题布局        │              │   Window Manager         │
   └────────────┬─────────────┘              └────────────┬─────────────┘
                │                                          │
                └──────────────┬───────────────────────────┘
                               ▼
                  ┌──────────────────────────┐
                  │   /settings               │
                  │   ⚙️ 共享设置系统          │
                  │   + 跨路由 Settings Bridge │
                  └──────────────────────────┘
```

| 系统 | 路由 | 目标用户 | 核心交互 | 抽象层级 |
|------|------|---------|---------|---------|
| 🎨 **Designer** | `/designer` | 设计师 / 产品经理 | 拖拽 + 表单 + 预览 | 高（组件树 + Props） |
| 💻 **AI Code** | `/ai-code` | 工程师 / 全栈 | 代码 + AI 对话 + 终端 | 低（源码字符） |
| ⚙️ **Settings** | `/settings` | 全角色 | AI 模型 / 主题 / 协同 | 共享配置 |

> 📖 完整架构解析请见 [docs/YYC3-P1-核心架构/](./docs/YYC3-P1-核心架构/)

---

## 🎯 核心特性

### 🎨 Designer System

- **Component Palette** — 60+ 内置组件（基础/表单/数据/媒体/高级）
- **Multi-Panel Canvas** — 拖拽 / 合并 / 分割 / 嵌套面板
- **Inspector** — 组件属性可视化编辑面板
- **Code Generator** — 设计 → React/Vue/Angular 生产代码
- **Figma Guide** — Figma 设计稿导入向导
- **Deploy Panel** — 多目标部署面板（Vercel/Netlify/手动）
- **Quality Panel** — 设计质量评分（无障碍 / 性能 / SEO）
- **Plugin Manager** — 插件注册中心
- **Liquid Glass / Aurora Layout** — 双套高级视觉主题

### 💻 AI Code System

- **Monaco Editor** — VSCode 同款代码编辑器
- **Live Preview** — 实时渲染 + HMR
- **Integrated Terminal** — xterm.js 终端
- **File Tree** — 多标签 / 多层级文件管理
- **AI Chat Panel** — 流式 AI 对话
- **Quick Actions Toolbar** — 快捷指令面板
- **Window Manager** — 浮动窗口 + 最小化托盘 + 布局预设
- **Task Board + Gantt** — 任务管理 + 甘特图
- **Multi-Instance Manager** — 多实例协同

### ⚙️ 共享基础设施

- **Global AI Provider** — 统一 AI 模型管理（多提供商切换）
- **CRDT Collaboration** — 基于 Yjs 的实时多人协同
- **Cross-Route Bridge** — 路由间双向数据通道（localStorage + CustomEvent）
- **Settings Sync** — 跨路由设置自动同步
- **Three-Level ErrorBoundary** — App / Route / Component 三级错误兜底 + 自动恢复
- **Performance Monitor** — FPS / Memory / LongTask 实时监控

---

## 🚀 快速开始

### 📋 环境要求

| 依赖 | 最低版本 | 推荐版本 |
|------|---------|---------|
| **Node.js** | 20.x | 20.x LTS |
| **pnpm** | 8.x | 9.x |
| **Git** | 2.x | 2.40+ |
| **浏览器** | Chrome 90+ / Edge 90+ / Safari 14+ | 最新版 |

### ⚡ 一键启动

```bash
# 1. 克隆仓库
git clone https://github.com/YYC-Cube/YYC3-AI-Code-FAmily.git
cd YYC3-AI-Code-FAmily

# 2. 安装依赖 (使用 pnpm)
pnpm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env，至少配置一个 AI 提供商 API Key

# 4. 启动开发服务器
pnpm dev

# 5. 打开浏览器
open http://localhost:5173
```

### 🐳 Docker 启动（可选）

```bash
# 拉取官方镜像
docker pull yyc3/ai-family:latest

# 运行容器
docker run -d -p 5173:5173 --name yyc3-ai-family yyc3/ai-family:latest
```

### 📦 在线体验

无需本地安装，直接访问在线版本：

- 🌐 **<https://ai-family.yyc3.top>**
- 🔄 自动同步 main 分支最新代码
- 📡 由 GitHub Actions + GitHub Pages 提供部署

---

## 🛠️ 技术栈

### 核心框架

| 技术 | 版本 | 用途 | 徽章 |
|------|------|------|------|
| **React** | 18.3.1 | UI 框架 | ![React](https://img.shields.io/badge/React-18.3-61DAFB) |
| **TypeScript** | 5.x | 类型系统 | ![TS](https://img.shields.io/badge/TypeScript-5-3178C6) |
| **Vite** | 6.3.5 | 构建工具 | ![Vite](https://img.shields.io/badge/Vite-6.3-646CFF) |
| **Tailwind CSS** | 4.1.12 | 原子化样式 | ![TW](https://img.shields.io/badge/Tailwind-4-06B6D4) |
| **React Router** | 7.13.0 | 路由 | ![Router](https://img.shields.io/badge/React_Router-7-CA4245) |
| **pnpm** | 9.x | 包管理 | ![pnpm](https://img.shields.io/badge/pnpm-9-F69220) |

### 状态 & 数据

| 技术 | 用途 |
|------|------|
| **Context + useReducer** | Designer 私有状态管理（`store.tsx` 1079 行） |
| **Yjs** | CRDT 实时协同底层 |
| **y-indexeddb** | 本地持久化 |
| **y-websocket** | 跨设备同步 |
| **y-monaco** | Monaco 协同绑定 |

### UI 组件生态

| 库 | 角色 |
|----|------|
| **Radix UI** | 无样式可访问性基础组件（40+ primitives） |
| **shadcn/ui** | UI 组件组合模式 |
| **Material UI (MUI)** | 高级复杂组件 |
| **Lucide React** | 图标库（800+ icons） |
| **Framer Motion** | 动画引擎 |
| **Sonner** | Toast 通知 |
| **cmdk** | 命令面板 |
| **recharts** | 图表 |

### 编辑器 & 终端

| 库 | 用途 |
|----|------|
| **@monaco-editor/react** | VSCode 同款代码编辑器 |
| **@xterm/xterm** | 浏览器终端 |
| **@xterm/addon-fit** | 终端自适应 |
| **@xterm/addon-search** | 终端搜索 |

### AI 模型集成

支持 6+ AI 提供商，统一接口：

| 提供商 | 模型示例 | 类型 |
|--------|---------|------|
| **OpenAI** | GPT-4 Turbo, GPT-3.5 | 国际 |
| **Anthropic** | Claude 3 Opus, Claude 3 Sonnet | 国际 |
| **智谱 AI** | GLM-4, GLM-4 Flash | 国内 |
| **百度文心** | ERNIE-4.0-8K, ERNIE-3.5-8K | 国内 |
| **阿里通义** | Qwen Turbo, Qwen Plus, Qwen Max | 国内 |
| **Ollama** | Llama 2, Mistral, Qwen (本地) | 本地 |

### 开发工具

| 工具 | 用途 |
|------|------|
| **Vitest** | 单元测试框架 |
| **Playwright** | E2E 测试 |
| **ESLint** | 代码静态检查（0 warnings 标准） |
| **Prettier** | 代码格式化 |
| **TypeScript** | 类型检查（tsc --noEmit） |
| **GitHub Actions** | CI/CD |

---

## 📂 项目结构

```text
YYC3-AI-Code-Family/
├── .github/
│   ├── workflows/
│   │   └── deploy.yml                  # 🚀 GitHub Pages CI/CD
│   ├── ISSUE_TEMPLATE/                 # 📝 Issue 模板
│   ├── PULL_REQUEST_TEMPLATE.md        # 📦 PR 模板
│   └── FUNDING.yml                     # 💰 赞助配置
├── docs/                               # 📚 完整项目文档
│   ├── YYC3-P0-变量词库/               # 品牌标识 / 技术栈版本 / 配置参数
│   ├── YYC3-P1-核心架构/               # 宿主机桥接 / 本地存储 / 构建配置
│   ├── YYC3-P2-核心功能/               # AI / 编辑器 / 多面板 / 状态管理
│   ├── YYC3-P3-高级功能/               # 协作 / 插件 / 多实例 / 数据库
│   ├── YYC3-P4-优化完善/               # 性能 / 国际化 / 安全 / 测试
│   ├── YYC3-P5-审核交付/               # 审核报告 / 标准化 / 验证
│   └── YYC3-P9-规划设计/               # 提示词系统 / 设计指南
├── public/                             # 🎨 静态资源
│   ├── yyc3-icons/                     # 全平台图标 (Android/iOS/macOS/watchOS/Web)
│   ├── yyc3-app-icons/                 # PWA / Favicon 图标集
│   ├── Family-001.png                  # 品牌主图
│   └── yyc3-logo-*.png                 # 多色 Logo
├── src/
│   ├── app/                            # 🏛️ 应用核心层
│   │   ├── components/
│   │   │   ├── ai-code/                # 💻 AI Code System (17 个组件)
│   │   │   ├── designer/               # 🎨 Designer System (34 个组件)
│   │   │   │   └── hooks/              # Designer 专用 Hooks
│   │   │   ├── home/                   # 🏠 智能意图路由首页
│   │   │   ├── settings/               # ⚙️ 设置系统
│   │   │   ├── ui/                     # 🧱 shadcn/ui 基础组件 (40+)
│   │   │   ├── figma/                  # 🎨 Figma 集成
│   │   │   └── ErrorBoundary.tsx       # 🛡️ 三级错误兜底
│   │   ├── hooks/                      # 🪝 全局共享 Hooks (10+)
│   │   ├── services/                   # 🔧 业务服务层 (multi-instance/task/actions)
│   │   ├── testing/                    # 🧪 测试辅助
│   │   ├── types/                      # 📐 TypeScript 类型定义
│   │   ├── utils/                      # 🛠️ 工具函数
│   │   ├── App.tsx                     # 🚀 应用入口 (Provider 组合)
│   │   ├── routes.tsx                  # 🛣️ 路由配置 (4 大路由)
│   │   ├── store.tsx                   # 🗄️ Designer 全局状态
│   │   ├── aiModelContext.tsx          # 🤖 AI 模型全局 Context
│   │   ├── crossRouteBridge.ts         # 🌉 跨路由双向通信桥
│   │   ├── apiClient.ts                # 🌐 API 客户端
│   │   └── config.ts                   # ⚙️ 应用配置
│   ├── styles/                         # 🎨 样式系统
│   │   ├── aurora.css                  # 极光主题
│   │   ├── liquid-glass.css            # 毛玻璃主题
│   │   ├── theme.css                   # 主题变量
│   │   ├── tailwind.css                # Tailwind 入口
│   │   └── fonts.css                   # 字体
│   ├── tests/                          # 🧪 测试套件 (466+ 用例)
│   │   ├── unit/                       # 单元测试
│   │   ├── integration/                # 集成测试
│   │   ├── performance/                # 性能测试
│   │   ├── security/                   # 安全测试
│   │   └── e2e/                        # E2E 测试 (Playwright)
│   ├── imports/                        # 📥 外部参考文档
│   ├── main.tsx                        # 🎬 React 入口
│   └── vite-env.d.ts                   # Vite 类型声明
├── .env.example                        # 🔐 环境变量示例
├── .eslintrc.cjs                       # 📏 ESLint 配置 (0 warnings)
├── .gitignore                          # 🚫 Git 忽略
├── index.html                          # 🌐 HTML 入口 (PWA + 全平台 favicon)
├── package.json                        # 📦 项目配置
├── pnpm-lock.yaml                      # 🔒 pnpm 锁文件
├── tsconfig.json                       # 📐 TypeScript 配置
├── vite.config.ts                      # ⚡ Vite 配置
├── vitest.config.ts                    # 🧪 Vitest 配置
├── playwright.config.ts                # 🎭 Playwright 配置
├── README.md                           # 📖 项目主页 (本文件)
├── CHANGELOG.md                        # 📋 变更日志
├── CONTRIBUTING.md                     # 🤝 贡献指南
├── CODE_OF_CONDUCT.md                  # 📜 行为准则
├── SECURITY.md                         # 🔒 安全策略
└── LICENSE                             # 📄 MIT 许可证
```

---

## 📖 使用指南

### 🎨 Designer System 使用流程

```text
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌────────────┐
│ 1. 选择组件  │ →  │ 2. 拖拽到画布 │ →  │ 3. 调整属性   │ →  │ 4. 生成代码 │
└─────────────┘    └──────────────┘    └──────────────┘    └────────────┘
   Component          Drag & Drop         Inspector          Code Gen
   Palette            to Canvas           Edit                Export
```

1. **访问 Designer** — 在首页点击「🎨 设计模式」或访问 `/designer`
2. **拖拽组件** — 从左侧 Component Palette 拖拽组件到画布
3. **配置属性** — 右侧 Inspector 面板编辑组件 props
4. **布局调整** — 拖拽 / 合并 / 分割 / 嵌套面板
5. **AI 辅助** — 点击 AI Assistant 获取智能建议
6. **生成代码** — 点击「Generate Code」导出 React/Vue/Angular 代码
7. **跳转 AI Code** — 通过 Cross-Route Bridge 一键带入代码编辑器

### 💻 AI Code System 使用流程

1. **访问 AI Code** — 在首页点击「💻 编程模式」或访问 `/ai-code`
2. **打开文件** — File Tree 创建 / 打开 / 编辑文件
3. **AI 对话** — AI Chat Panel 输入需求，AI 流式生成代码
4. **快捷指令** — Quick Actions Toolbar 执行常用操作
5. **实时预览** — Live Preview 即时查看运行效果
6. **终端操作** — Integrated Terminal 执行命令
7. **多窗口管理** — WindowManager 拖拽 / 浮动 / 最小化面板

### 🤖 智能意图路由

首页 AIHomePage 内置 32 类意图识别规则，输入自然语言即可自动路由：

| 输入示例 | 自动跳转 |
|---------|---------|
| "帮我写一个 React 登录表单" | 💻 `/ai-code` |
| "调试这段 TypeScript 代码" | 💻 `/ai-code` |
| "设计一个仪表盘 UI" | 🎨 `/designer` |
| "做一个数据表格原型" | 🎨 `/designer` |

---

## 🔧 开发指南

### 📜 可用脚本

```bash
# === 开发 ===
pnpm dev                 # 启动开发服务器 (port 5173, --host)
pnpm build               # TypeScript 检查 + Vite 生产构建
pnpm preview             # 预览生产构建

# === 测试 ===
pnpm test                # 运行 Vitest 单元测试 (466 用例)
pnpm test:ui             # 启动 Vitest 可视化界面
pnpm test:coverage       # 生成覆盖率报告
npx playwright test      # 运行 E2E 测试

# === 代码质量 ===
pnpm lint                # ESLint 检查 (--max-warnings 0)
pnpm lint:fix            # ESLint 自动修复
pnpm typecheck           # TypeScript 类型检查 (tsc --noEmit)
pnpm format              # Prettier 格式化

# === 维护 ===
pnpm clean               # 清理 dist / .vite 缓存
pnpm docs                # 生成 TypeDoc API 文档
```

### 📐 代码规范

#### 文件头注释（强制标准）

所有源码文件必须包含 YYC³ 标准文件头：

```typescript
/**
 * file: 文件名.tsx
 * description: 文件功能简述
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-03-19
 * updated: 2026-03-19
 * status: stable | dev | deprecated
 * license: MIT
 * copyright: Copyright (c) 2026 YanYuCloudCube Team
 * tags: tag1,tag2,tag3
 */
```

#### TypeScript 规范

- ✅ 严格模式（`strict: true`）
- ✅ 禁止 `any`（必要时使用 `// eslint-disable-next-line` 显式标注）
- ✅ 优先使用 `interface` 描述对象，`type` 描述联合 / 交叉
- ✅ 公共 API 必须导出类型
- ✅ 文件名 kebab-case，组件 PascalCase

#### React 规范

- ✅ 函数式组件 + Hooks（无 Class）
- ✅ Props 必须显式类型
- ✅ `useMemo` / `useCallback` 优化昂贵计算
- ✅ `React.memo` 优化高频渲染组件
- ✅ 自定义 Hook 以 `use` 开头

详细规范请见：

- [docs/YYC3-Code-header.md](./docs/YYC3-Code-header.md)
- [docs/YYC3-团队规范-开发标准.md](./docs/YYC3-团队规范-开发标准.md)

### 🎯 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```text
<type>(<scope>): <subject>

<body>

<footer>
```

| Type | 用途 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构 |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建 / 工具 / 依赖 |
| `ci` | CI/CD 配置 |
| `revert` | 回滚 |

示例：

```bash
feat(ai-code): 新增 AI 流式代码生成
fix(designer): 修复面板拖拽错位 #123
docs(readme): 完善徽章系统
```

---

## 🧪 测试

### 📊 测试统计

| 类型 | 框架 | 用例数 | 状态 |
|------|------|--------|------|
| **单元测试** | Vitest | 466 | ✅ 全部通过 |
| **集成测试** | Vitest | 5 套 | ✅ 全部通过 |
| **性能测试** | Vitest | 8 套 | ✅ 全部通过 |
| **安全测试** | Vitest | 多套 | ✅ 全部通过 |
| **E2E 测试** | Playwright | 3 套 | ✅ 通过 |

### 🏃 运行测试

```bash
# 全量测试
pnpm test

# 监听模式
pnpm test -- --watch

# 覆盖率报告
pnpm test:coverage

# E2E 测试（需先启动开发服务器）
pnpm dev &
npx playwright test
```

### 🎯 覆盖率目标

| 维度 | 当前 | 目标 |
|------|------|------|
| Statements | ~85% | 90% |
| Branches | ~75% | 85% |
| Functions | ~80% | 90% |
| Lines | ~85% | 90% |

---

## 🌐 部署

### ⚡ 自动部署 (CI/CD)

项目配置了 GitHub Actions 自动部署流水线：

```text
┌────────────┐    ┌────────────┐    ┌──────────┐    ┌──────────┐    ┌─────────┐
│ git push   │ →  │ TypeCheck  │ →  │   Lint   │ →  │  Build   │ →  │  Deploy │
│  to main   │    │ tsc --noEmit│   │ 0 warn   │    │ vite build│   │ GH Pages│
└────────────┘    └────────────┘    └──────────┘    └──────────┘    └─────────┘
                                                                       │
                                                                       ▼
                                                          🌐 ai-family.yyc3.top
```

| 配置项 | 值 |
|--------|-----|
| **触发条件** | 推送到 `main` 分支 |
| **CI 流水线** | TypeCheck → Lint → Build → 404.html → Upload Artifact |
| **CD 流水线** | Deploy to GitHub Pages |
| **自定义域名** | `ai-family.yyc3.top` (CNAME) |
| **HTTPS** | ✅ GitHub 自动签发 |
| **CDN** | ✅ GitHub Pages Edge |

### 📦 手动部署

```bash
# 1. 构建生产版本
pnpm build

# 2. 预览构建产物
pnpm preview

# 3. 部署到任何静态托管
# - Vercel: vercel --prod
# - Netlify: netlify deploy --prod --dir=dist
# - Cloudflare Pages: wrangler pages publish dist
# - 自建服务器: rsync -avz dist/ user@server:/var/www/
```

### 🛣️ 路由架构

| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | `AIHomePage` | 🏠 智能意图路由首页 |
| `/designer` | `DesignerLayout` | 🎨 可视化设计器 |
| `/ai-code` | `AICodeSystem` | 💻 AI 编程工作台 |
| `/settings` | `SettingsPage` | ⚙️ 全局配置 |

> ⚠️ GitHub Pages SPA 路由需 `404.html` 回退（CI/CD 自动生成）

### 🎨 主题系统

| 主题 | 文件 | 视觉风格 |
|------|------|---------|
| **Classic** | 默认 | 经典深色专业风 |
| **Liquid Glass** | `liquid-glass.css` | 毛玻璃质感（macOS Big Sur 灵感） |
| **Aurora** | `aurora.css` | 极光渐变（动感流光） |

---

## 📚 文档导航

### 📖 根目录文档

| 文档 | 描述 |
|------|------|
| [README.md](./README.md) | 📖 项目主页（本文件） |
| [CHANGELOG.md](./CHANGELOG.md) | 📋 版本变更日志 |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | 🤝 贡献指南 |
| [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) | 📜 行为准则 |
| [SECURITY.md](./SECURITY.md) | 🔒 安全策略 |
| [LICENSE](./LICENSE) | 📄 MIT 许可证 |

### 🗂️ 完整文档（docs/）

| 目录 | 内容 |
|------|------|
| [P0-变量词库](./docs/YYC3-P0-变量词库/) | 品牌标识 / 技术栈版本 / 配置参数 |
| [P1-核心架构](./docs/YYC3-P1-核心架构/) | 宿主机桥接 / 本地存储 / 构建配置 / 类型定义 |
| [P2-核心功能](./docs/YYC3-P2-核心功能/) | AI / 编辑器 / 多面板 / 状态管理 / 实时预览 |
| [P3-高级功能](./docs/YYC3-P3-高级功能/) | 协作 / 插件 / 多实例 / 数据库 / 预览 |
| [P4-优化完善](./docs/YYC3-P4-优化完善/) | 性能 / 国际化 / 安全 / 测试 / CI/CD |
| [P5-审核交付](./docs/YYC3-P5-审核交付/) | 审核报告 / 标准化 / 验证报告 |
| [P9-规划设计](./docs/YYC3-P9-规划设计/) | 提示词系统 / 设计指南 |

### 🎨 设计资源

- [Aurora UI/UX](./docs/Aurora__UI-UX.md)
- [Liquid Glass UI/UX](./docs/liquid-glass_UI-UX.md)
- [Theme Design System](./docs/YYC3-theme-design-system.md)
- [Design Prompt Index](./docs/YYC3-Design-Prompt-Index.md)

---

## 🤝 贡献指南

我们**热烈欢迎**任何形式的贡献！🎉

### 🚀 快速贡献

```bash
# 1. Fork & Clone
gh repo fork YYC-Cube/YYC3-AI-Code-FAmily --clone

# 2. 创建特性分支
git checkout -b feature/your-amazing-feature

# 3. 编写代码 & 测试
pnpm test
pnpm lint
pnpm typecheck

# 4. 提交（遵循 Conventional Commits）
git commit -m "feat(ai-code): add amazing feature"

# 5. 推送 & 创建 PR
git push origin feature/your-amazing-feature
gh pr create
```

### 📋 贡献类型

| 类型 | 描述 | 难度 |
|------|------|------|
| 🐛 **Bug 修复** | 修复现有问题 | ⭐ |
| 📚 **文档完善** | 改进文档 / 翻译 | ⭐ |
| 🎨 **样式优化** | UI / UX 改进 | ⭐⭐ |
| ⚡ **性能优化** | 提升运行速度 | ⭐⭐⭐ |
| 🚀 **新功能** | 实现新特性 | ⭐⭐⭐ |
| 🏗️ **架构重构** | 代码结构调整 | ⭐⭐⭐⭐ |

### 📌 贡献规范

- ✅ 遵循代码规范（ESLint + Prettier + TypeScript）
- ✅ 添加必要的测试用例（保持 90%+ 覆盖率）
- ✅ 更新相关文档
- ✅ 确保所有 CI 检查通过
- ✅ 使用 Conventional Commits
- ✅ PR 描述清晰，关联 Issue

> 📖 完整指南详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

### 🌟 贡献者

感谢所有为项目做出贡献的开发者：

[![Contributors](https://contrib.rocks/image?repo=YYC-Cube/YYC3-AI-Code-FAmily)](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/graphs/contributors)

---

## 🔒 安全策略

### 🛡️ 安全特性

- ✅ 跨路由 Bridge TTL（5 分钟过期）
- ✅ Payload 类型校验（防 JSON 注入）
- ✅ localStorage 配额 try-catch 保护
- ✅ 三级 ErrorBoundary 自动恢复
- ✅ CSP 友好（无内联脚本）
- ✅ API Key 仅存本地（不上传 / 不日志）

### 🚨 报告漏洞

如发现安全漏洞，请**勿**在公开 Issue 中讨论：

- 📧 **邮箱**: <admin@0379.email>
- 🔒 **加密**: PGP Key 可通过邮箱索取
- ⏱️ **响应时间**: 24 小时内确认

> 📖 完整策略详见 [SECURITY.md](./SECURITY.md)

---

## 🌍 路线图

### ✅ v1.x（已发布）

- [x] 双系统架构（Designer + AI Code）
- [x] 多 AI 提供商集成（6+）
- [x] CRDT 实时协同（Yjs）
- [x] 多面板布局系统
- [x] 三套主题（Classic / Liquid Glass / Aurora）
- [x] CI/CD + GitHub Pages + 自定义域名
- [x] 466 单元测试 + E2E 测试
- [x] 完整开发者文档五件套

### 🚧 v2.x（规划中）

- [ ] 插件市场（Plugin Marketplace）
- [ ] AI Agent 工作流编排
- [ ] 多人视频协同
- [ ] 移动端响应式适配
- [ ] 国际化（i18n）
- [ ] 离线 PWA 完整支持
- [ ] AI 模型微调（Fine-tuning）集成
- [ ] 云端项目同步

### 🔮 v3.x（远期）

- [ ] VSCode 插件
- [ ] Figma 插件
- [ ] 桌面端应用（Electron / Tauri）
- [ ] 私有化部署支持
- [ ] 企业版（RBAC / SSO / 审计）

---

## ❓ FAQ

<details>
<summary><b>Q: 这个项目和 YYC3-AI-Code 是什么关系？</b></summary>

A: 两者是同源分叉关系。YYC3-AI-Code 是技术主线（更新更频繁），YYC3-AI-Code-Family 是部署专用分支（含 CI/CD + 完整文档）。详见仓库内的双系统对比报告。
</details>

<details>
<summary><b>Q: 为什么选择 Front-End-Only Full-Stack (FEFS) 模式？</b></summary>

A: FEFS 模式让浏览器即后端，零服务器成本、零部署门槛、隐私数据本地存储，非常适合个人开发者和小团队。配合 GitHub Pages 免费托管，实现真正的"零成本上线"。
</details>

<details>
<summary><b>Q: 支持哪些 AI 模型？需要 API Key 吗？</b></summary>

A: 支持 OpenAI / Anthropic / 智谱 / 文心 / 通义 / Ollama（本地）。除 Ollama 外都需要对应平台的 API Key，可在 `/settings` 页面配置。Ollama 支持完全本地化部署，无需 API Key。
</details>

<details>
<summary><b>Q: 数据存储在哪里？会上传到服务器吗？</b></summary>

A: 所有用户数据（项目、代码、设置）存储在浏览器本地（IndexedDB + localStorage），**绝不上传**。CRDT 协同通过 y-websocket 在客户端 P2P 同步，不经过中心服务器。
</details>

<details>
<summary><b>Q: 如何参与贡献？</b></summary>

A: 见 [CONTRIBUTING.md](./CONTRIBUTING.md)。简单流程：Fork → Branch → Code → Test → PR。我们欢迎任何形式的贡献，包括 Bug 报告、文档改进、新功能实现。
</details>

<details>
<summary><b>Q: 商业使用是否免费？</b></summary>

A: 是的。项目采用 **MIT 许可证**，允许商业使用、修改、分发、私有化部署，仅需保留版权声明。
</details>

---

## 📞 联系我们

| 渠道 | 地址 | 用途 |
|------|------|------|
| 🌐 **官网** | <https://ai-family.yyc3.top> | 在线体验 |
| 📧 **邮箱** | <admin@0379.email> | 商务 / 安全 / 合作 |
| 🐛 **Issues** | [GitHub Issues](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/issues) | Bug 报告 / 功能建议 |
| 💬 **Discord** | [Join Discord](https://discord.gg/yyc3) | 实时交流 |
| 🐦 **Twitter** | [@YanYuCloudCube](https://twitter.com/YanYuCloudCube) | 最新动态 |
| 📝 **博客** | [blog.yyc3.top](https://blog.yyc3.top) | 技术分享 |

---

## 🙏 致谢

### 🌟 核心团队

**YanYuCloudCube Team** — 感谢每一位团队成员的辛勤付出。

### 🏗️ 技术依托

本项目站在巨人的肩膀上，感谢以下优秀开源项目：

- [React](https://react.dev/) · [Vite](https://vitejs.dev/) · [TypeScript](https://www.typescriptlang.org/)
- [Radix UI](https://www.radix-ui.com/) · [shadcn/ui](https://ui.shadcn.com/) · [Tailwind CSS](https://tailwindcss.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) · [xterm.js](https://xtermjs.org/)
- [Yjs](https://yjs.dev/) · [Framer Motion](https://www.framer.com/motion/) · [Lucide](https://lucide.dev/)

### 💎 灵感来源

- [VSCode](https://code.visualstudio.com/) · [Figma](https://www.figma.com/) · [Cursor](https://cursor.sh/)
- [v0.dev](https://v0.dev/) · [Bolt.new](https://bolt.new/) · [Replit](https://replit.com/)

### 🤝 社区贡献

感谢所有 [⭐ Stargazers](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/stargazers)、[🍴 Forkers](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/network/members) 和 [💬 Issue 报告者](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/issues)。

---

## 📄 许可证

本项目基于 [**MIT License**](./LICENSE) 开源。

```text
MIT License

Copyright (c) 2026 YanYuCloudCube Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, ...
```

> 商业使用 ✅ · 修改 ✅ · 分发 ✅ · 私有化部署 ✅

---

<div align="center">

### ⭐ 如果这个项目对你有帮助，请给一个 Star

[![Star History Chart](https://api.star-history.com/svg?repos=YYC-Cube/YYC3-AI-Code-FAmily&type=Date)](https://star-history.com/#YYC-Cube/YYC3-AI-Code-FAmily&Date)

---

**「言传千行代码 · 语枢万物智能」**

**Words Inspire Thousands of Lines of Code · Language Pivots the Intelligence of All Things**

**Made with ❤️ by [YanYuCloudCube Team](https://github.com/YYC-Cube)**

**© 2026 YYC³ · MIT License**

</div>
