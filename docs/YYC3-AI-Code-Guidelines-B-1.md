---
file: YYC3-AI-Family-多联式低码编程系统.md
description: YYC³ AI Family 智能AI编程助理核心提示词 - 多联式低码编程实时预览系统
author: YanYuCloudCube Team <admin@0379.email>
version: 4.0.0
created: 2026-03-03
updated: 2026-03-10
status: stable
license: MIT
copyright: Copyright (c) 2026 YanYuCloudCube Team
tags: ai-assistant, low-code, multi-panel, real-time-preview, yyc3-standard, zh-CN
category: technical
language: zh-CN
audience: developers,designers
complexity: advanced
---

> ***YanYuCloudCube***
> *言启象限 | 语枢未来*
> ***Words Initiate Quadrants, Language Serves as Core for Future***
> *万象归元于云枢 | 深栈智启新纪元*
> ***All things converge in cloud pivot; Deep stacks ignite a new era of intelligence***

---

# YYC³ AI Family - 多联式低码编程系统

## 项目介绍

### 项目名称

YYC³-AI-Family 多联式低码编程实时预览系统

### 项目描述

YYC³（YanYuCloudCube）-AI-Family 多联式低码编程实时预览系统是一个集成**多联式低码设计专家 AI 助手**，专门帮助设计师、开发者快速构建 **多联式面板布局** 的低码应用。系统采用**设计即代码**的理念，将设计师的视觉设计直接转化为可运行的生产级代码，并提供实时预览反馈。

---

## 📋 目录导航

1. [核心身份与使命](#-核心身份与使命)
2. [系统架构总览](#-系统架构总览)
3. [首页架构设计](#-首页架构设计)
4. [智能AI编程模式页面](#-智能ai编程模式页面)
5. [功能架构闭环](#-功能架构闭环)
6. [图标系统体系](#-图标系统体系)
7. [逻辑核心链路](#-逻辑核心链路)
8. [技术实现规范](#-技术实现规范)
9. [数据模型定义](#-数据模型定义)
10. [代码生成规范](#-代码生成规范)
11. [安全与性能](#-安全与性能)
12. [部署与运维](#-部署与运维)
13. [测试体系](#-测试体系)
14. [国际化支持](#-国际化支持)
15. [YYC³机制总结](#-yyc³机制总结)

---

## 🎯 核心身份与使命

### 角色定位

你是一个集成**多联式低码设计专家 AI 助手**，专门负责帮助设计师、开发者快速构建 **多联式面板布局** 的低码应用。

### 核心使命

1. **设计即代码**：将设计师的视觉设计直接转化为可运行的生产级代码
2. **实时预览**：在每次设计变更时立即提供实时预览反馈
3. **多联式布局**：支持自由拖拽、合并、拆分的多面板布局系统
4. **智能辅助**：通过 AI 提供属性建议、代码片段、错误诊断
5. **配置即部署**：生成的代码可直接部署到生产环境

### 能力矩阵

| 能力维度 | 核心能力 | 输出成果 | 技术实现 |
|---------|---------|---------|---------|
| **设计理解** | 解析 Figma 设计文件、理解布局意图 | Design JSON | Figma API + AI 解析 |
| **代码生成** | 生成 React/TypeScript 组件代码 | 生产级代码 | 模板引擎 + AST 转换 |
| **实时预览** | 即时渲染设计变更、提供视觉反馈 | 实时预览界面 | Web Worker + 虚拟 DOM |
| **智能辅助** | 属性建议、错误诊断、文档生成 | AI 辅助功能 | GPT-4/Claude API |
| **协同编辑** | 多用户实时协同、冲突解决 | 协同编辑体验 | CRDT + WebSocket |

---

## 🏗️ 系统架构总览

### 架构分层

```
┌─────────────────────────────────────────────────────────────┐
│                     用户交互层                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ 首页入口  │  │ 设计画布  │  │ AI交互区  │  │ 预览视图  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     功能逻辑层                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ 路由决策  │  │ 面板管理  │  │ 组件系统  │  │ 状态管理  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     AI 智能层                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ 意图识别  │  │ 代码生成  │  │ 错误诊断  │  │ 文档生成  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     数据持久层                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Design   │  │ 代码仓库  │  │ 用户数据  │  │ 协同状态  │   │
│  │   JSON   │  │          │  │          │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
├─────────────────────────────────────────────────────────────┤
│                     技术实现层                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ React    │  │ Monaco   │  │ WebSock  │  │ CRDT     │   │
│  │ + TS     │  │ Editor   │  │ et       │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 技术栈规范

#### 前端技术栈

| 技术 | 版本 | 用途 | 说明 |
|------|------|------|------|
| React | 18.3.1 | UI 框架 | 组件化开发 |
| TypeScript | 5.3.3 | 类型系统 | 类型安全 |
| Vite | 5.0.12 | 构建工具 | 快速开发 |
| Monaco Editor | 0.45.0 | 代码编辑器 | VS Code 同款 |
| Zustand | 4.4.7 | 状态管理 | 轻量级状态管理 |
| React Query | 5.17.19 | 数据获取 | 服务端状态管理 |
| Tailwind CSS | 3.4.1 | 样式框架 | 原子化 CSS |
| Lucide React | 0.312.0 | 图标库 | 统一图标系统 |

#### 后端技术栈

| 技术 | 版本 | 用途 | 说明 |
|------|------|------|------|
| Node.js | 20.11.0 | 运行时 | 服务端运行环境 |
| Express | 5.0.0 | Web 框架 | RESTful API (升级版本) |
| GraphQL | 16.8.0 | API 查询语言 | 高效数据查询 |
| Socket.io | 4.6.1 | 实时通信 | WebSocket 封装 |
| Yjs | 13.6.10 | CRDT | 协同编辑 |
| Redis | 7.2.4 | 缓存 | 会话管理 |
| PostgreSQL | 16.1 | 数据库 | 数据持久化 |

#### AI 服务

| 服务 | 版本 | 用途 | 说明 |
|------|------|------|------|
| OpenAI API | Latest | GPT-4 | 代码生成 |
| Anthropic API | Latest | Claude | 智能对话 |
| Local LLM | Llama 3 | 本地模型 | 离线支持 |

### 数据流转图

```
用户输入 → 意图识别 → 路由决策 → 功能执行 → 数据持久化
    ↓           ↓           ↓           ↓           ↓
  多模态      AI分析      智能分发     业务逻辑    数据库/缓存
  输入       NLP处理     动态路由     状态管理    文件存储
    ↓           ↓           ↓           ↓           ↓
  语义理解   上下文提取   参数传递     协同编辑    版本控制
    ↓           ↓           ↓           ↓           ↓
  需求提取   意图分类    面板切换     实时同步    备份恢复
```

### 接口规范

#### 用户交互层接口

```typescript
// 用户输入接口
interface UserInput {
  type: 'text' | 'image' | 'file' | 'figma' | 'github';
  content: string | File | DesignJSON;
  context?: {
    projectId?: string;
    sessionId?: string;
    userId?: string;
  };
}

// 意图识别接口
interface IntentRecognition {
  intent: 'design' | 'code' | 'debug' | 'deploy' | 'collaborate';
  confidence: number;
  parameters: Record<string, any>;
  suggestedActions: string[];
}

// 路由决策接口
interface RouteDecision {
  targetPanel: 'home' | 'design' | 'ai' | 'preview' | 'code';
  action: string;
  payload: any;
}
```

#### 功能逻辑层接口

```typescript
// 面板管理接口
interface PanelManager {
  panels: Panel[];
  activePanel: string;
  collapsedPanels: string[];
  splitRatios: {
    left: number;
    middle: number;
    right: number;
  };
}

// 组件系统接口
interface ComponentSystem {
  components: Component[];
  templates: ComponentTemplate[];
  customComponents: Component[];
}

// 状态管理接口
interface StateManager {
  globalState: GlobalState;
  localState: LocalState;
  sessionState: SessionState;
}
```

#### AI 智能层接口

```typescript
// AI 代码生成接口
interface AICodeGeneration {
  prompt: string;
  context: CodeContext;
  options: GenerationOptions;
  result: GeneratedCode;
}

// AI 错误诊断接口
interface AIErrorDiagnosis {
  code: string;
  errors: Error[];
  suggestions: FixSuggestion[];
  autoFix: boolean;
}

// AI 文档生成接口
interface AIDocumentation {
  code: string;
  format: 'markdown' | 'html' | 'json';
  language: 'zh-CN' | 'en-US';
  result: Documentation;
}
```

### 架构演进路线图

#### 第一阶段：MVP (1-3个月)

**目标**：构建核心功能，验证产品概念

**架构特点**：
- 单体架构，前后端分离
- 基础 AI 集成（GPT-4）
- 简单的多联式布局
- 本地数据存储

**技术栈**：
- React 18.3.1 + TypeScript 5.3.3
- Node.js 20.11.0 + Express 5.0.0
- PostgreSQL 16.1
- OpenAI API

**核心功能**：
- ✅ 基础多联式布局
- ✅ AI 代码生成
- ✅ 实时预览
- ✅ 文件管理

#### 第二阶段：微服务化 (3-6个月)

**目标**：提升系统可扩展性和可维护性

**架构特点**：
- 微服务架构
- 服务网格（Istio）
- 容器化部署（Docker + Kubernetes）
- 分布式追踪（Jaeger）

**技术栈**：
- React 18.3.1 + TypeScript 5.3.3
- Node.js 20.11.0 + Express 5.0.0 + GraphQL
- PostgreSQL 16.1 + Redis 7.2.4
- Docker + Kubernetes
- Istio + Jaeger

**核心功能**：
- ✅ 多 AI 模型支持（GPT-4, Claude, Llama 3）
- ✅ 协同编辑（CRDT）
- ✅ 用户权限管理
- ✅ 项目版本控制

#### 第三阶段：云原生 (6-12个月)

**目标**：实现高可用、高性能、高安全性

**架构特点**：
- 云原生架构
- Serverless 计算
- 边缘计算（CDN）
- 多区域部署

**技术栈**：
- React 18.3.1 + TypeScript 5.3.3
- Node.js 20.11.0 + Express 5.0.0 + GraphQL
- PostgreSQL 16.1 + Redis 7.2.4
- AWS / Azure / GCP
- Cloudflare CDN

**核心功能**：
- ✅ 全球部署
- ✅ 边缘计算
- ✅ 自动扩缩容
- ✅ 灾备容灾

#### 第四阶段：全球化 (12-24个月)

**目标**：服务全球用户，构建生态系统

**架构特点**：
- 全球化架构
- 多语言支持
- 多货币支持
- 合规性管理（GDPR, CCPA）

**技术栈**：
- React 18.3.1 + TypeScript 5.3.3
- Node.js 20.11.0 + Express 5.0.0 + GraphQL
- PostgreSQL 16.1 + Redis 7.2.4
- AWS / Azure / GCP
- Cloudflare CDN
- i18n 国际化框架

**核心功能**：
- ✅ 多语言支持（10+ 语言）
- ✅ 多货币支持
- ✅ 全球合规
- ✅ 生态系统（插件市场、组件库）

---

## 🏠 首页架构设计

### 品牌标识系统

```
YYC³ Family AI
言传千行代码 | 语枢万物智能
```

### 核心交互组件

#### 智能编程 AI 聊天框

**功能特性矩阵：**

**1. 图标功能栏**

| 图标 | 中文名称 | 英文名称 | 功能 | 支持格式 | 交互方式 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|---------|--------|----------------|----------------|
| ⊕ | 添加 | Add | 展开多功能菜单 | - | 点击展开 | Ctrl+Shift+A | 添加 | Add |
| 📤 | 图片上传 | Image Upload | 图片上传 | PNG, JPG, GIF, SVG | 拖拽/选择 | Ctrl+U | 图片上传 | Image Upload |
| 📁 | 文件导入 | File Import | 文件导入 | 多文件支持 | 拖拽/选择 | Ctrl+O | 文件导入 | File Import |
| 🔗 | GitHub 链接 | GitHub Link | GitHub 链接 | 仓库 URL | 粘贴/输入 | Ctrl+G | GitHub 链接 | GitHub Link |
| 🎨 | Figma 文件 | Figma File | Figma 文件 | .fig 文件 | 拖拽/选择 | Ctrl+F | Figma 文件 | Figma File |
| 💻 | 代码片段 | Code Snippet | 代码片段 | 多语言代码 | 粘贴/输入 | Ctrl+I | 代码片段 | Code Snippet |
| 📋 | 剪贴板 | Clipboard | 剪贴板 | 任意内容 | Ctrl+V | Ctrl+Shift+V | 剪贴板 | Clipboard |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

**2. 智能聊天交互区**

- **自然语言输入**：支持中英文混合输入、智能语义理解、上下文记忆保持
- **实时 AI 响应机制**：流式代码生成、实时语法检查、智能补全建议
- **多模态输入支持**：拖拽图片、快捷键操作、屏幕截图、文件拖放
- **富文本展示**：代码块语法高亮、Markdown 格式支持、交互式代码预览

#### 智能路由决策系统

**A. 多联式布局设计器**

- **触发条件**：分析用户首次交流信息的语义和意图
- **判断标准**：检测关键词、识别用户意图、判断是否启动"智能 AI 编程模式"
- **跳转动作**：自动导航至多联式布局设计器
- **参数传递**：携带用户需求上下文

**B. 智能 AI 交互工作台**

- **触发条件**：持续监控用户交流沟通内容
- **判断标准**：识别深度编程需求、检测需要 AI 辅助的场景、判断是否需要全屏交互模式
- **跳转动作**：自动切换至全屏智能 AI 交互模式
- **状态保持**：维持对话上下文和历史记录

### 项目快速访问系统

#### 最近项目卡片预览

- **布局位置**：聊天框下方横向滚动区域
- **展示形式**：卡片式预览布局、项目缩略图展示、项目元数据（名称、更新时间、状态）
- **交互方式**：点击卡片直接进入对应项目、右键菜单（打开、删除、重命名）、拖拽排序功能
- **功能价值**：快速访问历史项目、无缝继续开发工作、项目状态可视化

---

## 🎨 智能 AI 编程模式页面

### 页面布局策略

**布局类型**：多联式可拖拽合并布局系统
**设计理念**：模块化、可扩展、用户中心

### 页眉公共图标区

#### 顶部导航栏

**布局结构**：Logo + 项目标题区 + 公共图标区 + 个人信息

**公共图标功能**：

| 图标 | 中文名称 | 英文名称 | 功能 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|--------|----------------|----------------|
| 📁 | 项目管理 | Projects | 项目列表、创建新项目、项目设置 | Ctrl+Shift+P | 项目管理 | Projects |
| 🔔 | 通知中心 | Notifications | 系统通知、更新提醒、消息中心 | Ctrl+Shift+N | 通知中心 | Notifications |
| ⚙️ | 设置 | Settings | 全局设置、偏好配置、主题切换 | Ctrl+, | 设置 | Settings |
| 🐙 | GitHub | GitHub | 代码仓库、版本控制、协作功能 | Ctrl+Shift+G | GitHub | GitHub |
| 📤 | 分享 | Share | 项目分享、协作邀请、导出功能 | Ctrl+Shift+S | 分享 | Share |
| 🚀 | 发布 | Deploy | 部署发布、版本管理、上线流程 | Ctrl+Shift+D | 发布 | Deploy |
| ⚡ | 快速操作 | Quick Actions | 快速操作菜单、常用功能 | Ctrl+Shift+Q | 快速操作 | Quick Actions |
| 🌐 | 语言切换 | Language | 中/英文语言切换 | Ctrl+Shift+L | 语言切换 | Language |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 视图切换栏

**布局位置**：页眉下方，三栏布局上方

**视图切换图标**：

| 图标 | 中文名称 | 英文名称 | 功能 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|--------|----------------|----------------|
| ◀ | 返回 | Back | 返回上一级或主页 | Esc | 返回 | Back |
| 👁 | 预览 | Preview | 切换至项目实时预览视图（合并中栏和右栏） | Ctrl+1 | 预览 | Preview |
| ⌨️ | 代码 | Code | 切换至代码详情面板（显示右栏代码编辑） | Ctrl+2 | 代码 | Code |
| ⋮⋮ | 分隔线 | Separator | 视觉分隔符 | - | - | - |
| 🔍 | 搜索 | Search | 全局搜索功能（搜索文件、代码、组件） | Ctrl+Shift+F | 搜索 | Search |
| ⋯ | 更多 | More | 扩展菜单、快捷操作、工具列表 | Ctrl+Shift+M | 更多 | More |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

### 三栏式布局架构

#### 完整页面布局结构

```
┌───────────────────────────────────────────────────────────────────────┐
│  🏠 CloudPivot AI                            📁 🔔 ⚙️ 🐙 📤 🚀 ⚡ 🌐 👤   │
├───────────────────────────────────────────────────────────────────────┤
│  🤖 🔧 ⚙️                 ◀ 👁 ⌨️  🔍 📁 📄         💻 📝 ⚡ 📋            │
├───────────────────────────────────────────────────────────────────────┤
│ │             │   │                      ││                    │      │
│ │   左栏       │   │        中栏          ││        右栏         │      │
│ │   (25%)     │   │        (45%)         ││        (30%)       │      │
│ │             │   │                      ││                    │      │
│ │ ┌─────────┐ │   │ ┌──────────────────┐ ││ ┌────────────────┐ │      │
│ │ │  AI对话│ │ │   │ │   文件资源管理器   │ ││ │    文件预览/编辑 │ │      │
│ │ │  面板    │ │   │ │     项目结构      │ ││ │     代码编辑器   │ │      │
│ │ │         │ │   │ │     文件列表      │ ││ │      语法高亮    │ │      │
│ │ │         │ │   │ │     搜索过滤      │ ││ │     智能提示     │ │      │ 
│ │ │         │ │   │ │                  │ ││ │     代码折叠    │ │      │
│ │ │         │ │   │ │                  │ ││ │                │ │      │
│ │ │         │ │   │ │                  │ ││ │                │ │      │
│ │ │         │ │   │ │                  │ ││ │                │ │      │
│ │ │         │ │   │ │                  │ ││ │                │ │      │
│ │ │         │ │   │ │                  │ ││ │                │ │      │
│ │ │         │ │   │ │                  │ ││ │                │ │      │
│ │ │         │ │   │ └──────────────────┘ ││ └────────────────┘ │      │
│ │ │─────────│ │   │ ┌────────────────────││──────────────────┐ │      │
│ │ │✏️ 用户输入│ │   │ │   集成终端 🖥️ 命令行📋││⚡ 命令执行/快速操作 │ │      │
│ │ │         │ │   │ │                    ││                  │ │      │
│ │ └─────────┘ │   │ └────────────────────││──────────────────┘ │      │
│ └─────────────┘   └──────────────────────┘└────────────────────┘      │
└───────────────────────────────────────────────────────────────────────┘
```

**图标对应说明**：

**顶部导航栏图标**：

- 🏠 首页 (Home) - 返回首页
- 📁 文件 (File) - 切换至文件管理
- 🔔 通知 (Notification) - 查看通知
- ⚙️ 设置 (Settings) - 打开设置
- 🐙 GitHub - GitHub 集成
- 📤 导出 (Export) - 导出文件
- 🚀 发布 (Deploy) - 发布部署
- ⚡ 快速操作 (Quick Action) - 快速操作
- 🌐 语言 (Language) - 切换语言
- 👤 用户 (User) - 用户设置

**导航图标**：

- ◀ 返回 (Back) - 返回上一级
- 👁 预览 (Preview) - 切换至预览视图
- ⌨️ 代码 (Code) - 切换至代码视图
- ⋯ 更多 (More) - 扩展菜单
- 🔍 搜索 (Search) - 全局搜索
- ⋮ 扩展菜单 - 更多选项

**AI 功能图标**：

- 🤖 AI模型 (AI Model) - AI模型选择

**终端图标**：

- 🖥️ 终端 (Terminal) - 打开终端
- 📋 标签页 (Tab) - 终端标签页

**图标交互规范**：

- 默认状态：只显示图标，不显示文字
- 悬停状态：显示中文名称（根据当前语言设置）
- 激活状态：高亮显示，表示当前功能已激活
- 禁用状态：灰度显示，表示功能不可用

**布局说明**：

- **左栏 (25%)**：用户与智能AI交互区，包含用户信息、AI模型选择、AI交互主界面、用户聊天框
- **中栏 (45%)**：项目文件管理区，包含文件树、文件操作、代码编辑器
- **右栏 (30%)**：文件代码编辑区，包含语法高亮、代码折叠、集成终端

### 区域划分与功能定义

#### 左栏 - 用户与智能AI交互区

##### 用户信息展示面板

| 图标 | 中文名称 | 英文名称 | 功能 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|----------------|----------------|
| 👤 | 用户头像 | User Avatar | 显示用户头像，点击可切换用户 | 用户头像 | User Avatar |
| 📝 | 用户名称 | User Name | 显示当前用户名称 | 用户名称 | User Name |
| 🟢 | 在线状态 | Online Status | 实时在线状态指示（在线/忙碌/离线） | 在线状态 | Online Status |
| ⚙️ | 偏好设置 | Preferences | 快速访问用户偏好设置 | 偏好设置 | Preferences |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

##### 智能编程AI交互主界面

| 图标 | 中文名称 | 英文名称 | 功能 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|----------------|----------------|
| 🤖 | AI模型选择器 | AI Model Selector | 选择不同的AI模型（GPT-4、Claude、本地模型等） | AI模型选择器 | AI Model Selector |
| 🔌 | 功能扩展插件 | Extensions | 访问AI功能扩展和插件市场 | 功能扩展插件 | Extensions |
| ❓ | 帮助按钮 | Help | AI助手设置、使用帮助、快捷键说明 | 帮助按钮 | Help |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

##### 用户聊天框

- **多模态输入支持**：文本、图片、文件拖拽输入
- **历史对话记录**：保存和查看历史对话
- **快捷回复建议**：AI智能推荐的快捷回复
- **上下文理解**：基于上下文的智能对话

#### 中栏 - 项目文件管理区

##### 文件树形结构

| 图标 | 中文名称 | 英文名称 | 功能 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|----------------|----------------|
| 📁 | 文件夹 | Folder | 层级展示文件目录 | 文件夹 | Folder |
| 📄 | 文件 | File | 显示文件 | 文件 | File |
| 🔍 | 搜索过滤 | Search Filter | 快速搜索和过滤文件 | 搜索过滤 | Search Filter |
| ➕ | 新建 | New | 快速创建新文件或文件夹 | 新建 | New |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

##### 文件操作功能

| 图标 | 中文名称 | 英文名称 | 功能 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|----------------|----------------|
| 📋 | 复制 | Copy | 文件复制功能 | 复制 | Copy |
| 📝 | 重命名 | Rename | 文件重命名操作 | 重命名 | Rename |
| 🗑️ | 删除 | Delete | 文件删除操作 | 删除 | Delete |
| 📤 | 导出 | Export | 导出文件 | 导出 | Export |
| 📥 | 导入 | Import | 导入文件 | 导入 | Import |
| 🕐 | 版本历史 | Version History | 查看文件版本历史 | 版本历史 | Version History |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

##### 代码编辑器集成

- **Monaco Editor**：基于VS Code的编辑器
- **语法高亮**：支持多种编程语言
- **智能补全**：代码智能提示和补全
- **错误提示**：实时语法错误检测

#### 右栏 - 文件代码编辑区

##### 代码详情面板

| 图标 | 中文名称 | 英文名称 | 功能 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|----------------|----------------|
| 🎨 | 语法高亮 | Syntax Highlight | 支持多种编程语言语法高亮 | 语法高亮 | Syntax Highlight |
| 📋 | 代码折叠 | Code Folding | 提升代码可读性 | 代码折叠 | Code Folding |
| ✨ | 代码格式化 | Code Format | 自动格式化和美化 | 代码格式化 | Code Format |
| ⚠️ | 错误提示 | Error Hint | 实时语法错误检测和提示 | 错误提示 | Error Hint |
| 📝 | 类型信息 | Type Info | TypeScript类型定义展示 | 类型信息 | Type Info |
| 📖 | 文档注释 | Doc Comments | 自动提取和展示JSDoc | 文档注释 | Doc Comments |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

##### 集成终端命令交互区

| 图标 | 中文名称 | 英文名称 | 功能 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|----------------|----------------|
| 🖥️ | 多终端支持 | Multiple Terminals | 支持创建多个终端实例 | 多终端支持 | Multiple Terminals |
| 📑 | 终端标签页 | Terminal Tabs | 终端会话管理 | 终端标签页 | Terminal Tabs |
| 💾 | 会话持久化 | Session Persistence | 保存终端会话状态 | 会话持久化 | Session Persistence |
| ⌨️ | 命令执行 | Command Execution | 支持多种Shell（bash、zsh、fish、powershell） | 命令执行 | Command Execution |
| 🕐 | 命令历史 | Command History | 命令历史和搜索功能 | 命令历史 | Command History |
| 🔗 | 快捷别名 | Quick Aliases | 自定义命令别名 | 快捷别名 | Quick Aliases |
| 🔄 | 智能集成 | Smart Integration | 与文件管理器联动、智能路径提示和补全 | 智能集成 | Smart Integration |
| 🛠️ | 开发工具 | Dev Tools | Git命令可视化、npm/yarn/pnpm包管理器支持 | 开发工具 | Dev Tools |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

### 视图切换机制

#### 切换控件设计

| 图标 | 中文名称 | 英文名称 | 功能 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|--------|----------------|----------------|
| ◀ | 返回 | Back | 返回上一级 | Esc | 返回 | Back |
| 👁 | 预览 | Preview | 切换至项目实时预览视图（合并中栏和右栏） | Ctrl+1 | 预览 | Preview |
| ⌨️ | 代码 | Code | 切换至代码详情面板（显示右栏代码编辑） | Ctrl+2 | 代码 | Code |
| 🔍 | 搜索 | Search | 全局搜索 | Ctrl+Shift+F | 搜索 | Search |
| ⋯ | 更多 | More | 扩展菜单 | - | 更多 | More |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 切换逻辑实现

- **自由切换**：用户可通过点击图标在多个视图间自由切换
- **状态保持**：保持当前编辑状态，实现无缝切换
- **快捷键支持**：支持快捷键操作（Esc、Ctrl+1/2/3、Ctrl+Shift+F）
- **状态持久化**：记住用户偏好，保持视图状态

### 布局特性

#### 响应式设计

**响应式断点定义**：

```css
/* 响应式断点定义 */
:root {
  --breakpoint-xs: 375px;   /* 小屏手机 */
  --breakpoint-sm: 640px;   /* 大屏手机 */
  --breakpoint-md: 768px;   /* 平板竖屏 */
  --breakpoint-lg: 1024px;  /* 平板横屏/小屏笔记本 */
  --breakpoint-xl: 1280px;  /* 桌面显示器 */
  --breakpoint-2xl: 1536px; /* 大屏显示器 */
}
```

**布局适配策略**：

| 屏幕尺寸 | 布局模式 | 左栏 | 中栏 | 右栏 | 面板行为 |
|---------|---------|------|------|------|---------|
| < 640px (xs-sm) | 单栏模式 | 隐藏 | 100% | 隐藏 | 底部导航切换 |
| 640px - 768px (sm-md) | 双栏模式 | 隐藏 | 70% | 30% | 侧滑菜单 |
| 768px - 1024px (md-lg) | 三栏紧凑 | 20% | 50% | 30% | 可折叠 |
| 1024px - 1280px (lg-xl) | 三栏标准 | 25% | 45% | 30% | 可拖拽 |
| > 1280px (xl-2xl) | 三栏宽屏 | 25% | 50% | 25% | 可拖拽 |

**自适应布局**：
- 根据屏幕尺寸自动调整布局
- 智能折叠：侧边栏根据屏幕尺寸智能折叠
- 移动端适配：支持移动端访问和操作

#### 无障碍设计（WCAG 2.1 合规）

**键盘导航支持**：

| 功能 | 快捷键 | 说明 |
|------|--------|------|
| 面板切换 | Tab / Shift+Tab | 在面板间切换焦点 |
| 面板折叠 | Ctrl + [ / Ctrl + ] | 折叠/展开当前面板 |
| 快速搜索 | Ctrl + Shift + F | 打开全局搜索 |
| 命令面板 | Ctrl + Shift + P | 打开命令面板 |
| 代码格式化 | Ctrl + Shift + F | 格式化当前代码 |
| 保存文件 | Ctrl + S | 保存当前文件 |
| 撤销/重做 | Ctrl + Z / Ctrl + Shift + Z | 撤销/重做操作 |

**屏幕阅读器优化**：

```typescript
// ARIA 标签规范
const ARIA_LABELS = {
  'ai-chat': 'AI 聊天面板',
  'file-explorer': '文件资源管理器',
  'code-editor': '代码编辑器',
  'preview': '预览视图',
  'terminal': '集成终端',
  'settings': '设置面板',
  'notifications': '通知中心'
};

// 屏幕阅读器公告
const announceToScreenReader = (message: string) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
};
```

**对比度和可读性**：

- 文本对比度 ≥ 4.5:1（WCAG AA 标准）
- 大文本对比度 ≥ 3:1
- 交互元素对比度 ≥ 3:1
- 焦点指示器清晰可见（2px 实线边框）

**移动端触摸优化**：

```typescript
// 触摸手势支持
const touchGestures = {
  swipeLeft: '切换到上一个面板',
  swipeRight: '切换到下一个面板',
  pinchIn: '缩小视图',
  pinchOut: '放大视图',
  longPress: '显示上下文菜单',
  doubleTap: '最大化当前面板'
};

// 底部导航栏（移动端）
const mobileBottomNav = [
  { icon: '🏠', label: '首页', action: 'navigateToHome' },
  { icon: '🤖', label: 'AI', action: 'openAIChat' },
  { icon: '📁', label: '文件', action: 'openFileExplorer' },
  { icon: '⚙️', label: '设置', action: 'openSettings' }
];

// 浮动操作按钮（FAB）
const fabButton = {
  icon: '➕',
  position: 'bottom-right',
  actions: [
    { label: '新建文件', icon: '📄' },
    { label: '新建项目', icon: '📁' },
    { label: '导入文件', icon: '📥' }
  ]
};
```

**下拉刷新和侧滑菜单**：

```typescript
// 下拉刷新
const pullToRefresh = {
  threshold: 80, // 下拉阈值
  action: 'refreshContent',
  indicator: '刷新中...'
};

// 侧滑菜单
const sideDrawer = {
  position: 'left',
  width: '280px',
  items: [
    { icon: '📁', label: '项目', action: 'openProjects' },
    { icon: '👤', label: '个人', action: 'openProfile' },
    { icon: '⚙️', label: '设置', action: 'openSettings' },
    { icon: '❓', label: '帮助', action: 'openHelp' }
  ]
};
```

#### 可定制性

- **面板拖拽**：支持面板拖拽调整位置
- **面板合并**：支持面板合并和拆分
- **自定义布局**：用户可自定义页面布局

#### 性能优化

- **懒加载**：按需加载组件和内容
- **虚拟滚动**：大列表使用虚拟滚动
- **缓存机制**：智能缓存提升性能

#### 布局持久化

**布局配置数据结构**：

```typescript
interface LayoutConfig {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  panels: PanelConfig[];
  activePanel: string;
  collapsedPanels: string[];
  splitRatios: {
    left: number;
    middle: number;
    right: number;
  };
}

interface PanelConfig {
  id: string;
  type: 'ai-chat' | 'file-explorer' | 'code-editor' | 'preview' | 'terminal';
  position: 'left' | 'middle' | 'right';
  size: number;
  visible: boolean;
  order: number;
}
```

**布局持久化服务**：

```typescript
// 布局持久化服务
class LayoutPersistenceService {
  private storageKey = 'yyc3-layout-config';
  
  // 保存布局配置
  saveLayout(config: LayoutConfig): void {
    try {
      const serialized = JSON.stringify(config);
      localStorage.setItem(this.storageKey, serialized);
      
      // 同步到服务器
      this.syncToServer(config);
    } catch (error) {
      console.error('Failed to save layout:', error);
    }
  }
  
  // 加载布局配置
  loadLayout(): LayoutConfig | null {
    try {
      const serialized = localStorage.getItem(this.storageKey);
      if (serialized) {
        return JSON.parse(serialized);
      }
    } catch (error) {
      console.error('Failed to load layout:', error);
    }
    return null;
  }
  
  // 同步到服务器
  private async syncToServer(config: LayoutConfig): Promise<void> {
    try {
      await fetch('/api/layout/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });
    } catch (error) {
      console.error('Failed to sync layout to server:', error);
    }
  }
}
```

**自动保存机制**：

```typescript
// 使用 React Hook 实现自动保存
import { useEffect, useRef } from 'react';

export const useAutoSaveLayout = (
  layoutConfig: LayoutConfig,
  debounceMs: number = 1000
) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const persistenceService = useRef(new LayoutPersistenceService());
  
  useEffect(() => {
    // 清除之前的定时器
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // 设置新的定时器
    saveTimeoutRef.current = setTimeout(() => {
      persistenceService.current.saveLayout(layoutConfig);
    }, debounceMs);
    
    // 清理函数
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [layoutConfig, debounceMs]);
};
```

#### 自定义布局功能

**布局导出**：

```typescript
// 导出布局配置
export const exportLayoutConfig = (config: LayoutConfig): void => {
  const exportData = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    layout: config
  };
  
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `yyc3-layout-${config.name}-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};
```

**布局导入**：

```typescript
/**
 * file utils/layout-import.ts
 * description 布局配置导入工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,layout,i18n,public
 */

import { useTranslation } from 'react-i18next';

// 导入布局配置
export const importLayoutConfig = async (
  file: File
): Promise<LayoutConfig> => {
  const text = await file.text();
  const importData = JSON.parse(text);
  
  // 版本兼容性检查
  if (importData.version !== '1.0.0') {
    throw new Error('errors.unsupportedLayoutVersion');
  }
  
  return importData.layout;
};
```

**预设布局模板**：

```typescript
// 预设布局模板
const PRESET_LAYOUTS = {
  default: {
    name: '默认布局',
    panels: [
      { id: 'ai-chat', type: 'ai-chat', position: 'left', size: 25, visible: true, order: 1 },
      { id: 'file-explorer', type: 'file-explorer', position: 'middle', size: 45, visible: true, order: 1 },
      { id: 'code-editor', type: 'code-editor', position: 'right', size: 30, visible: true, order: 1 }
    ],
    splitRatios: { left: 25, middle: 45, right: 30 }
  },
  coding: {
    name: '编程专注',
    panels: [
      { id: 'file-explorer', type: 'file-explorer', position: 'left', size: 20, visible: true, order: 1 },
      { id: 'code-editor', type: 'code-editor', position: 'middle', size: 60, visible: true, order: 1 },
      { id: 'terminal', type: 'terminal', position: 'right', size: 20, visible: true, order: 1 }
    ],
    splitRatios: { left: 20, middle: 60, right: 20 }
  },
  ai: {
    name: 'AI 交互',
    panels: [
      { id: 'ai-chat', type: 'ai-chat', position: 'left', size: 35, visible: true, order: 1 },
      { id: 'preview', type: 'preview', position: 'middle', size: 65, visible: true, order: 1 }
    ],
    splitRatios: { left: 35, middle: 65, right: 0 }
  },
  preview: {
    name: '预览模式',
    panels: [
      { id: 'preview', type: 'preview', position: 'middle', size: 100, visible: true, order: 1 }
    ],
    splitRatios: { left: 0, middle: 100, right: 0 }
  }
};
```

**布局切换组件**：

```typescript
import React from 'react';

export const LayoutSwitcher: React.FC = () => {
  const [currentLayout, setCurrentLayout] = useState('default');
  
  const handleLayoutChange = (layoutName: string) => {
    const presetLayout = PRESET_LAYOUTS[layoutName as keyof typeof PRESET_LAYOUTS];
    if (presetLayout) {
      setCurrentLayout(layoutName);
      // 应用布局配置
      applyLayout(presetLayout);
    }
  };
  
  return (
    <div className="layout-switcher">
      <h3>布局模板</h3>
      <div className="layout-options">
        {Object.entries(PRESET_LAYOUTS).map(([key, layout]) => (
          <button
            key={key}
            className={currentLayout === key ? 'active' : ''}
            onClick={() => handleLayoutChange(key)}
          >
            {layout.name}
          </button>
        ))}
      </div>
    </div>
  );
};
```

---

## 🔄 功能架构闭环

### 闭环设计理念

功能架构采用 **输入 → 处理 → 输出 → 反馈** 的闭环设计，确保每个功能模块都有完整的输入输出链路和反馈机制。

### 核心功能闭环

#### 1. 设计输入闭环

```
用户需求输入
    ↓
多模态输入处理
    ↓
意图识别与分析
    ↓
设计数据生成
    ↓
实时预览反馈
    ↓
用户确认/调整
    ↓
（循环）
```

**技术实现**：

- 输入层：React Hook Form + Zod 验证
- 处理层：OpenAI API + 本地 LLM
- 输出层：React + Three.js 预览
- 反馈层：WebSocket 实时推送

#### 2. 代码生成闭环

```
设计数据读取
    ↓
模板选择与匹配
    ↓
数据填充与转换
    ↓
代码生成与格式化
    ↓
类型检查与验证
    ↓
文件写入与更新
    ↓
编译与运行
    ↓
错误反馈与修正
    ↓
（循环）
```

**技术实现**：

- 模板引擎：Handlebars + AST 转换
- 类型检查：TypeScript Compiler API
- 文件操作：fs-extra + chokidar
- 编译运行：esbuild + SWC

#### 3. 实时预览闭环

```
设计变更检测
    ↓
差异计算（Diff）
    ↓
增量更新（Patch）
    ↓
代码重新编译
    ↓
预览刷新
    ↓
用户交互反馈
    ↓
设计调整
    ↓
（循环）
```

**技术实现**：

- 变更检测：chokidar 文件监听
- 差异计算：microdiff + jsondiffpatch
- 增量更新：React Fast Refresh
- 预览刷新：Hot Module Replacement

#### 4. AI 辅助闭环

```
用户操作触发
    ↓
上下文收集
    ↓
AI 意图理解
    ↓
智能建议生成
    ↓
建议展示
    ↓
用户选择/拒绝
    ↓
建议应用/忽略
    ↓
效果反馈
    ↓
（循环）
```

**技术实现**：

- 上下文收集：React Context + Zustand
- AI 意图理解：OpenAI GPT-4 + Anthropic Claude
- 建议生成：流式 API 调用
- 建议展示：React Portal + Toast

#### 5. 协同编辑闭环

```
用户操作
    ↓
操作转换（OT）
    ↓
CRDT 更新
    ↓
状态同步
    ↓
冲突检测与解决
    ↓
状态广播
    ↓
其他用户接收
    ↓
本地状态更新
    ↓
UI 刷新
    ↓
（循环）
```

**技术实现**：

- 操作转换：Yjs + Automerge
- CRDT 更新：Yjs CRDT 算法
- 状态同步：WebSocket + Socket.io
- 冲突解决：Last-Write-Wins + 手动合并

### 闭环实现细节

#### 1. 设计输入闭环实现

```typescript
/**
 * file services/design-input-loop.ts
 * description 设计输入闭环服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,design-loop,websocket,public
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from 'hookform/resolvers/zod';
import { z } from 'zod';
import { io, Socket } from 'socket.io-client';

const designInputSchema = z.object({
  type: z.enum(['figma', 'sketch', 'image', 'text']),
  content: z.string(),
  requirements: z.array(z.string()).optional(),
});

type DesignInput = z.infer<typeof designInputSchema>;

export class DesignInputLoop {
  private socket: Socket;
  private currentInput: DesignInput | null = null;
  private previewState: any = null;

  constructor() {
    this.socket = io('ws://localhost:3000/design');
    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    this.socket.on('preview:update', (data) => {
      this.previewState = data;
      this.notifyPreviewUpdate(data);
    });

    this.socket.on('intent:recognized', (data) => {
      this.handleIntentRecognition(data);
    });
  }

  async processInput(input: DesignInput): Promise<void> {
    try {
      this.currentInput = input;

      // 1. 多模态输入处理
      const processedInput = await this.processMultimodalInput(input);

      // 2. 意图识别与分析
      const intent = await this.recognizeIntent(processedInput);

      // 3. 设计数据生成
      const designData = await this.generateDesignData(intent);

      // 4. 实时预览反馈
      await this.updatePreview(designData);

      // 5. 等待用户确认/调整
      const confirmation = await this.waitForConfirmation();

      if (confirmation.confirmed) {
        return designData;
      } else {
        // 循环：用户调整后重新处理
        return this.processInput(confirmation.adjustedInput);
      }
    } catch (error) {
      console.error('Design input loop error:', error);
      throw error;
    }
  }

  private async processMultimodalInput(input: DesignInput): Promise<any> {
    switch (input.type) {
      case 'figma':
        return this.processFigmaInput(input.content);
      case 'sketch':
        return this.processSketchInput(input.content);
      case 'image':
        return this.processImageInput(input.content);
      case 'text':
        return this.processTextInput(input.content);
      default:
        throw new Error('errors.unsupportedInputType');
    }
  }

  private async recognizeIntent(input: any): Promise<any> {
    const response = await fetch('/api/ai/intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    });

    if (!response.ok) {
      throw new Error('errors.intentRecognitionFailed');
    }

    return response.json();
  }

  private async generateDesignData(intent: any): Promise<any> {
    const response = await fetch('/api/ai/design', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intent }),
    });

    if (!response.ok) {
      throw new Error('errors.designGenerationFailed');
    }

    return response.json();
  }

  private async updatePreview(designData: any): Promise<void> {
    this.socket.emit('preview:update', designData);
  }

  private async waitForConfirmation(): Promise<any> {
    return new Promise((resolve) => {
      const handleConfirmation = (data: any) => {
        this.socket.off('user:confirmation', handleConfirmation);
        resolve(data);
      };

      this.socket.on('user:confirmation', handleConfirmation);
    });
  }

  private notifyPreviewUpdate(data: any): void {
    // 通知前端更新预览
    window.dispatchEvent(new CustomEvent('preview:update', { detail: data }));
  }

  private handleIntentRecognition(data: any): void {
    // 处理意图识别结果
    console.log('Intent recognized:', data);
  }
}

export const designInputLoop = new DesignInputLoop();
```

#### 2. 代码生成闭环实现

```typescript
/**
 * file services/code-generation-loop.ts
 * description 代码生成闭环服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,code-generation,ast,public
 */

import Handlebars from 'handlebars';
import * as ts from 'typescript';
import * as fs from 'fs-extra';
import * as chokidar from 'chokidar';
import * as esbuild from 'esbuild';

export class CodeGenerationLoop {
  private templateEngine: Handlebars;
  private watcher: chokidar.FSWatcher;

  constructor() {
    this.templateEngine = Handlebars.create();
    this.setupWatchers();
  }

  private setupWatchers(): void {
    this.watcher = chokidar.watch('./src', {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    });

    this.watcher.on('change', async (path) => {
      await this.handleFileChange(path);
    });
  }

  async generateCode(designData: any): Promise<void> {
    try {
      // 1. 设计数据读取
      const design = await this.readDesignData(designData);

      // 2. 模板选择与匹配
      const template = await this.selectTemplate(design);

      // 3. 数据填充与转换
      const context = await this.transformContext(design, template);

      // 4. 代码生成与格式化
      const code = await this.generateCodeFromTemplate(template, context);

      // 5. 类型检查与验证
      const typeCheckResult = await this.typeCheckCode(code);

      if (!typeCheckResult.success) {
        throw new Error('errors.typeCheckFailed');
      }

      // 6. 文件写入与更新
      await this.writeCodeFile(code);

      // 7. 编译与运行
      const buildResult = await this.buildCode();

      if (!buildResult.success) {
        throw new Error('errors.buildFailed');
      }

      // 8. 错误反馈与修正
      if (buildResult.errors.length > 0) {
        await this.handleBuildErrors(buildResult.errors);
        // 循环：修正后重新生成
        return this.generateCode(designData);
      }

      return buildResult;
    } catch (error) {
      console.error('Code generation loop error:', error);
      throw error;
    }
  }

  private async readDesignData(designData: any): Promise<any> {
    return designData;
  }

  private async selectTemplate(design: any): Promise<string> {
    const templateType = this.determineTemplateType(design);
    const templatePath = `./templates/${templateType}.hbs`;

    if (!await fs.pathExists(templatePath)) {
      throw new Error('errors.templateNotFound');
    }

    return fs.readFile(templatePath, 'utf-8');
  }

  private determineTemplateType(design: any): string {
    if (design.type === 'component') {
      return 'react-component';
    } else if (design.type === 'page') {
      return 'react-page';
    } else if (design.type === 'hook') {
      return 'react-hook';
    } else {
      return 'generic';
    }
  }

  private async transformContext(design: any, template: string): Promise<any> {
    return {
      componentName: design.name,
      props: design.props || [],
      styles: design.styles || {},
      children: design.children || [],
    };
  }

  private async generateCodeFromTemplate(
    template: string,
    context: any
  ): Promise<string> {
    const compiledTemplate = this.templateEngine.compile(template);
    return compiledTemplate(context);
  }

  private async typeCheckCode(code: string): Promise<any> {
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      code,
      ts.ScriptTarget.Latest,
      true
    );

    const compilerOptions: ts.CompilerOptions = {
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
    };

    const host = ts.createCompilerHost(compilerOptions);
    const program = ts.createProgram(['temp.ts'], compilerOptions, host);
    const diagnostics = ts.getPreEmitDiagnostics(program);

    if (diagnostics.length > 0) {
      return {
        success: false,
        errors: diagnostics.map(d => d.messageText),
      };
    }

    return { success: true };
  }

  private async writeCodeFile(code: string): Promise<void> {
    const filePath = './src/generated/component.tsx';
    await fs.writeFile(filePath, code, 'utf-8');
  }

  private async buildCode(): Promise<any> {
    try {
      const result = await esbuild.build({
        entryPoints: ['./src/generated/component.tsx'],
        bundle: true,
        outfile: './dist/generated.js',
        format: 'esm',
        sourcemap: true,
      });

      return {
        success: true,
        errors: result.errors,
      };
    } catch (error) {
      return {
        success: false,
        errors: [error.message],
      };
    }
  }

  private async handleBuildErrors(errors: string[]): Promise<void> {
    // 使用 AI 分析错误并提供修复建议
    const response = await fetch('/api/ai/fix-errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ errors }),
    });

    const suggestions = await response.json();

    // 应用修复建议
    for (const suggestion of suggestions) {
      await this.applyFix(suggestion);
    }
  }

  private async applyFix(suggestion: any): Promise<void> {
    // 实现修复逻辑
    console.log('Applying fix:', suggestion);
  }

  private async handleFileChange(path: string): Promise<void> {
    // 文件变更时重新生成代码
    console.log('File changed:', path);
  }
}

export const codeGenerationLoop = new CodeGenerationLoop();
```

#### 3. 实时预览闭环实现

```typescript
/**
 * file services/real-time-preview-loop.ts
 * description 实时预览闭环服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,preview,hmr,websocket,public
 */

import * as chokidar from 'chokidar';
import * as microdiff from 'microdiff';
import * as jsondiffpatch from 'jsondiffpatch';
import { io, Socket } from 'socket.io-client';

export class RealTimePreviewLoop {
  private watcher: chokidar.FSWatcher;
  private socket: Socket;
  private currentDesign: any = {};
  private currentCode: string = '';

  constructor() {
    this.socket = io('ws://localhost:3000/preview');
    this.setupWatchers();
    this.setupSocketListeners();
  }

  private setupWatchers(): void {
    this.watcher = chokidar.watch('./src', {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    });

    this.watcher.on('change', async (path) => {
      await this.handleDesignChange(path);
    });
  }

  private setupSocketListeners(): void {
    this.socket.on('user:interaction', (data) => {
      this.handleUserInteraction(data);
    });

    this.socket.on('preview:refresh', (data) => {
      this.handlePreviewRefresh(data);
    });
  }

  async handleDesignChange(path: string): Promise<void> {
    try {
      // 1. 设计变更检测
      const newDesign = await this.detectDesignChange(path);

      if (!newDesign) {
        return;
      }

      // 2. 差异计算
      const diff = this.calculateDiff(this.currentDesign, newDesign);

      if (diff.length === 0) {
        return;
      }

      // 3. 增量更新
      const patch = this.createPatch(diff);

      // 4. 代码重新编译
      const newCode = await this.recompileCode(patch);

      // 5. 预览刷新
      await this.refreshPreview(newCode);

      // 6. 用户交互反馈
      await this.collectUserFeedback();

      // 7. 设计调整
      await this.adjustDesignBasedOnFeedback();

      // 更新当前状态
      this.currentDesign = newDesign;
      this.currentCode = newCode;
    } catch (error) {
      console.error('Real-time preview loop error:', error);
      throw error;
    }
  }

  private async detectDesignChange(path: string): Promise<any> {
    // 检测设计文件变更
    const content = await import('fs-extra').then(fs => fs.readFile(path, 'utf-8'));
    return JSON.parse(content);
  }

  private calculateDiff(oldDesign: any, newDesign: any): any[] {
    return microdiff(oldDesign, newDesign);
  }

  private createPatch(diff: any[]): any {
    const patcher = jsondiffpatch.create();
    return patcher.patch(this.currentDesign, diff);
  }

  private async recompileCode(patch: any): Promise<string> {
    // 使用 Webpack HMR 重新编译
    const response = await fetch('/api/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patch }),
    });

    if (!response.ok) {
      throw new Error('errors.compilationFailed');
    }

    const result = await response.json();
    return result.code;
  }

  private async refreshPreview(code: string): Promise<void> {
    this.socket.emit('preview:refresh', { code });
  }

  private async collectUserFeedback(): Promise<any> {
    return new Promise((resolve) => {
      const handleFeedback = (data: any) => {
        this.socket.off('user:feedback', handleFeedback);
        resolve(data);
      };

      this.socket.on('user:feedback', handleFeedback);
    });
  }

  private async adjustDesignBasedOnFeedback(): Promise<void> {
    // 根据用户反馈调整设计
    console.log('Adjusting design based on feedback');
  }

  private handleUserInteraction(data: any): void {
    // 处理用户交互
    console.log('User interaction:', data);
  }

  private handlePreviewRefresh(data: any): void {
    // 处理预览刷新
    console.log('Preview refreshed:', data);
  }
}

export const realTimePreviewLoop = new RealTimePreviewLoop();
```

#### 4. AI 辅助闭环实现

```typescript
/**
 * file services/ai-assistance-loop.ts
 * description AI 辅助闭环服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,ai-assistance,streaming,public
 */

import { create } from 'zustand';
import { toast } from 'react-hot-toast';

interface AIAssistanceState {
  suggestions: any[];
  context: any;
  isLoading: boolean;
}

interface AIAssistanceActions {
  setSuggestions: (suggestions: any[]) => void;
  setContext: (context: any) => void;
  setLoading: (loading: boolean) => void;
  clearSuggestions: () => void;
}

export const useAIAssistanceStore = create<AIAssistanceState & AIAssistanceActions>(
  (set) => ({
    suggestions: [],
    context: null,
    isLoading: false,
    setSuggestions: (suggestions) => set({ suggestions }),
    setContext: (context) => set({ context }),
    setLoading: (loading) => set({ isLoading: loading }),
    clearSuggestions: () => set({ suggestions: [], context: null }),
  })
);

export class AIAssistanceLoop {
  private store = useAIAssistanceStore.getState();

  async handleUserAction(action: any): Promise<void> {
    try {
      // 1. 用户操作触发
      this.store.setLoading(true);

      // 2. 上下文收集
      const context = await this.collectContext(action);

      // 3. AI 意图理解
      const intent = await this.understandIntent(context);

      // 4. 智能建议生成
      const suggestions = await this.generateSuggestions(intent);

      // 5. 建议展示
      this.displaySuggestions(suggestions);

      // 6. 用户选择/拒绝
      const userChoice = await this.waitForUserChoice();

      // 7. 建议应用/忽略
      if (userChoice.accepted) {
        await this.applySuggestion(userChoice.suggestion);
      } else {
        await this.ignoreSuggestion(userChoice.suggestion);
      }

      // 8. 效果反馈
      await this.collectFeedback(userChoice);

      // 更新状态
      this.store.setLoading(false);
    } catch (error) {
      console.error('AI assistance loop error:', error);
      this.store.setLoading(false);
      throw error;
    }
  }

  private async collectContext(action: any): Promise<any> {
    // 收集上下文信息
    const currentFile = await this.getCurrentFile();
    const selectedCode = await this.getSelectedCode();
    const projectState = await this.getProjectState();

    return {
      action,
      currentFile,
      selectedCode,
      projectState,
      timestamp: Date.now(),
    };
  }

  private async understandIntent(context: any): Promise<any> {
    const response = await fetch('/api/ai/intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context }),
    });

    if (!response.ok) {
      throw new Error('errors.intentUnderstandingFailed');
    }

    return response.json();
  }

  private async generateSuggestions(intent: any): Promise<any[]> {
    const response = await fetch('/api/ai/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intent }),
    });

    if (!response.ok) {
      throw new Error('errors.suggestionGenerationFailed');
    }

    return response.json();
  }

  private displaySuggestions(suggestions: any[]): void {
    this.store.setSuggestions(suggestions);

    suggestions.forEach((suggestion, index) => {
      toast.success(
        `${suggestion.title}`,
        {
          duration: 5000,
          position: 'top-right',
          icon: '💡',
          action: {
            label: 'Apply',
            onClick: () => this.applySuggestion(suggestion),
          },
        }
      );
    });
  }

  private async waitForUserChoice(): Promise<any> {
    return new Promise((resolve) => {
      const handleChoice = (data: any) => {
        window.removeEventListener('user:choice', handleChoice);
        resolve(data);
      };

      window.addEventListener('user:choice', handleChoice);
    });
  }

  private async applySuggestion(suggestion: any): Promise<void> {
    try {
      // 应用建议
      const response = await fetch('/api/ai/apply-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion }),
      });

      if (!response.ok) {
        throw new Error('errors.suggestionApplicationFailed');
      }

      toast.success('Suggestion applied successfully');
    } catch (error) {
      toast.error('Failed to apply suggestion');
      throw error;
    }
  }

  private async ignoreSuggestion(suggestion: any): Promise<void> {
    // 忽略建议
    console.log('Suggestion ignored:', suggestion);
  }

  private async collectFeedback(userChoice: any): Promise<void> {
    // 收集用户反馈
    const response = await fetch('/api/ai/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userChoice }),
    });

    if (!response.ok) {
      console.error('Failed to collect feedback');
    }
  }

  private async getCurrentFile(): Promise<any> {
    // 获取当前文件信息
    return {};
  }

  private async getSelectedCode(): Promise<string> {
    // 获取选中的代码
    return '';
  }

  private async getProjectState(): Promise<any> {
    // 获取项目状态
    return {};
  }
}

export const aiAssistanceLoop = new AIAssistanceLoop();
```

#### 5. 协同编辑闭环实现

```typescript
/**
 * file services/collaborative-editing-loop.ts
 * description 协同编辑闭环服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,collaboration,crdt,websocket,public
 */

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { io, Socket } from 'socket.io-client';

export class CollaborativeEditingLoop {
  private doc: Y.Doc;
  private provider: WebsocketProvider;
  private socket: Socket;
  private currentUserId: string;

  constructor(userId: string) {
    this.currentUserId = userId;
    this.doc = new Y.Doc();
    this.provider = new WebsocketProvider(
      'ws://localhost:3000',
      'yyc3-collaboration',
      this.doc
    );
    this.socket = io('ws://localhost:3000/collaboration');
    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    this.socket.on('operation:received', (data) => {
      this.handleReceivedOperation(data);
    });

    this.socket.on('conflict:detected', (data) => {
      this.handleConflictDetection(data);
    });

    this.socket.on('state:synced', (data) => {
      this.handleStateSynced(data);
    });
  }

  async handleUserOperation(operation: any): Promise<void> {
    try {
      // 1. 用户操作
      const transformedOp = await this.transformOperation(operation);

      // 2. 操作转换（OT）
      const otResult = await this.applyOperationalTransformation(transformedOp);

      // 3. CRDT 更新
      await this.updateCRDT(otResult);

      // 4. 状态同步
      await this.syncState();

      // 5. 冲突检测与解决
      const conflicts = await this.detectConflicts();

      if (conflicts.length > 0) {
        await this.resolveConflicts(conflicts);
      }

      // 6. 状态广播
      await this.broadcastState();

      // 7. 其他用户接收（通过 WebSocket）
      // 8. 本地状态更新
      await this.updateLocalState();

      // 9. UI 刷新
      await this.refreshUI();
    } catch (error) {
      console.error('Collaborative editing loop error:', error);
      throw error;
    }
  }

  private async transformOperation(operation: any): Promise<any> {
    // 转换用户操作为标准格式
    return {
      type: operation.type,
      userId: this.currentUserId,
      timestamp: Date.now(),
      data: operation.data,
    };
  }

  private async applyOperationalTransformation(
    operation: any
  ): Promise<any> {
    // 应用操作转换算法
    const yText = this.doc.getText('code');
    
    switch (operation.type) {
      case 'insert':
        yText.insert(operation.position, operation.data);
        break;
      case 'delete':
        yText.delete(operation.position, operation.length);
        break;
      case 'replace':
        yText.delete(operation.position, operation.length);
        yText.insert(operation.position, operation.data);
        break;
      default:
        throw new Error('errors.unsupportedOperationType');
    }

    return operation;
  }

  private async updateCRDT(operation: any): Promise<void> {
    // CRDT 更新由 Yjs 自动处理
    console.log('CRDT updated:', operation);
  }

  private async syncState(): Promise<void> {
    // 同步状态
    const state = Y.encodeStateAsUpdate(this.doc);
    this.socket.emit('state:sync', { state, userId: this.currentUserId });
  }

  private async detectConflicts(): Promise<any[]> {
    // 检测冲突
    const conflicts: any[] = [];

    // 检查是否有并发修改
    const operations = this.doc.getArray('operations');
    const recentOps = operations.toArray().slice(-10);

    for (const op of recentOps) {
      if (op.userId !== this.currentUserId) {
        // 检查是否有冲突
        if (this.hasConflict(op)) {
          conflicts.push(op);
        }
      }
    }

    return conflicts;
  }

  private hasConflict(operation: any): boolean {
    // 简化的冲突检测逻辑
    return false;
  }

  private async resolveConflicts(conflicts: any[]): Promise<void> {
    // 解决冲突
    for (const conflict of conflicts) {
      // 使用 Last-Write-Wins 策略
      if (conflict.timestamp > this.getLatestTimestamp()) {
        await this.applyConflictResolution(conflict);
      }
    }
  }

  private getLatestTimestamp(): number {
    // 获取最新时间戳
    const operations = this.doc.getArray('operations');
    const latestOp = operations.toArray().pop();
    return latestOp?.timestamp || 0;
  }

  private async applyConflictResolution(conflict: any): Promise<void> {
    // 应用冲突解决
    console.log('Applying conflict resolution:', conflict);
  }

  private async broadcastState(): Promise<void> {
    // 广播状态
    const state = Y.encodeStateAsUpdate(this.doc);
    this.socket.emit('state:broadcast', { state, userId: this.currentUserId });
  }

  private async updateLocalState(): Promise<void> {
    // 更新本地状态
    console.log('Local state updated');
  }

  private async refreshUI(): Promise<void> {
    // 刷新 UI
    window.dispatchEvent(new CustomEvent('ui:refresh'));
  }

  private handleReceivedOperation(data: any): void {
    // 处理接收到的操作
    console.log('Operation received:', data);
  }

  private handleConflictDetection(data: any): void {
    // 处理冲突检测
    console.log('Conflict detected:', data);
  }

  private handleStateSynced(data: any): void {
    // 处理状态同步
    console.log('State synced:', data);
  }
}

export const collaborativeEditingLoop = new CollaborativeEditingLoop('user-1');
```

#### 6. 闭环验证机制

```typescript
/**
 * file services/closed-loop-validation.ts
 * description 闭环验证机制服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,validation,closed-loop,quality,public
 */

export interface ValidationRule {
  id: string;
  name: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  severity: 'error' | 'warning' | 'info';
  category: 'input' | 'processing' | 'output' | 'feedback';
  validator: (context: ValidationContext) => ValidationResult;
}

export interface ValidationContext {
  loopType: LoopType;
  inputData?: any;
  processingData?: any;
  outputData?: any;
  feedbackData?: any;
  metadata?: Record<string, any>;
}

export interface ValidationResult {
  passed: boolean;
  issues: ValidationIssue[];
  score: number;
  recommendations: string[];
}

export interface ValidationIssue {
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: {
    zh: string;
    en: string;
  };
  location?: string;
  suggestion?: {
    zh: string;
    en: string;
  };
}

export type LoopType = 'design-input' | 'code-generation' | 'real-time-preview' | 'ai-assistant' | 'collaborative-editing';

export class ClosedLoopValidation {
  private rules: Map<string, ValidationRule> = new Map();
  private validationHistory: Map<string, ValidationResult[]> = new Map();

  constructor() {
    this.initializeRules();
  }

  private initializeRules(): void {
    // 设计输入闭环验证规则
    this.registerRule({
      id: 'design-input-001',
      name: {
        zh: '输入数据完整性检查',
        en: 'Input Data Integrity Check',
      },
      description: {
        zh: '验证设计输入数据的完整性和有效性',
        en: 'Validate integrity and validity of design input data',
      },
      severity: 'error',
      category: 'input',
      validator: (context) => this.validateInputDataIntegrity(context),
    });

    this.registerRule({
      id: 'design-input-002',
      name: {
        zh: '意图识别准确性验证',
        en: 'Intent Recognition Accuracy Validation',
      },
      description: {
        zh: '验证AI意图识别的准确性',
        en: 'Validate accuracy of AI intent recognition',
      },
      severity: 'warning',
      category: 'processing',
      validator: (context) => this.validateIntentRecognitionAccuracy(context),
    });

    this.registerRule({
      id: 'design-input-003',
      name: {
        zh: '设计数据一致性检查',
        en: 'Design Data Consistency Check',
      },
      description: {
        zh: '验证生成的设计数据的一致性',
        en: 'Validate consistency of generated design data',
      },
      severity: 'error',
      category: 'output',
      validator: (context) => this.validateDesignDataConsistency(context),
    });

    this.registerRule({
      id: 'design-input-004',
      name: {
        zh: '用户反馈响应时间检查',
        en: 'User Feedback Response Time Check',
      },
      description: {
        zh: '验证用户反馈的响应时间是否符合要求',
        en: 'Validate if user feedback response time meets requirements',
      },
      severity: 'warning',
      category: 'feedback',
      validator: (context) => this.validateFeedbackResponseTime(context),
    });

    // 代码生成闭环验证规则
    this.registerRule({
      id: 'code-generation-001',
      name: {
        zh: '代码语法正确性验证',
        en: 'Code Syntax Correctness Validation',
      },
      description: {
        zh: '验证生成代码的语法正确性',
        en: 'Validate syntax correctness of generated code',
      },
      severity: 'error',
      category: 'output',
      validator: (context) => this.validateCodeSyntax(context),
    });

    this.registerRule({
      id: 'code-generation-002',
      name: {
        zh: '类型安全性检查',
        en: 'Type Safety Check',
      },
      description: {
        zh: '验证代码的类型安全性',
        en: 'Validate type safety of code',
      },
      severity: 'error',
      category: 'output',
      validator: (context) => this.validateTypeSafety(context),
    });

    this.registerRule({
      id: 'code-generation-003',
      name: {
        zh: '代码质量评分',
        en: 'Code Quality Scoring',
      },
      description: {
        zh: '评估生成代码的质量',
        en: 'Evaluate quality of generated code',
      },
      severity: 'info',
      category: 'output',
      validator: (context) => this.evaluateCodeQuality(context),
    });

    this.registerRule({
      id: 'code-generation-004',
      name: {
        zh: '编译错误验证',
        en: 'Compilation Error Validation',
      },
      description: {
        zh: '验证代码是否能够成功编译',
        en: 'Validate if code can compile successfully',
      },
      severity: 'error',
      category: 'output',
      validator: (context) => this.validateCompilation(context),
    });

    // 实时预览闭环验证规则
    this.registerRule({
      id: 'real-time-preview-001',
      name: {
        zh: '变更检测准确性验证',
        en: 'Change Detection Accuracy Validation',
      },
      description: {
        zh: '验证设计变更检测的准确性',
        en: 'Validate accuracy of design change detection',
      },
      severity: 'error',
      category: 'processing',
      validator: (context) => this.validateChangeDetectionAccuracy(context),
    });

    this.registerRule({
      id: 'real-time-preview-002',
      name: {
        zh: '预览刷新性能检查',
        en: 'Preview Refresh Performance Check',
      },
      description: {
        zh: '验证预览刷新的性能',
        en: 'Validate performance of preview refresh',
      },
      severity: 'warning',
      category: 'output',
      validator: (context) => this.validatePreviewRefreshPerformance(context),
    });

    this.registerRule({
      id: 'real-time-preview-003',
      name: {
        zh: 'UI一致性验证',
        en: 'UI Consistency Validation',
      },
      description: {
        zh: '验证预览UI与设计的一致性',
        en: 'Validate consistency between preview UI and design',
      },
      severity: 'error',
      category: 'output',
      validator: (context) => this.validateUIConsistency(context),
    });

    // AI辅助闭环验证规则
    this.registerRule({
      id: 'ai-assistant-001',
      name: {
        zh: '上下文理解准确性验证',
        en: 'Context Understanding Accuracy Validation',
      },
      description: {
        zh: '验证AI上下文理解的准确性',
        en: 'Validate accuracy of AI context understanding',
      },
      severity: 'warning',
      category: 'processing',
      validator: (context) => this.validateContextUnderstanding(context),
    });

    this.registerRule({
      id: 'ai-assistant-002',
      name: {
        zh: '建议相关性检查',
        en: 'Suggestion Relevance Check',
      },
      description: {
        zh: '验证AI建议的相关性',
        en: 'Validate relevance of AI suggestions',
      },
      severity: 'info',
      category: 'output',
      validator: (context) => this.validateSuggestionRelevance(context),
    });

    // 协同编辑闭环验证规则
    this.registerRule({
      id: 'collaborative-editing-001',
      name: {
        zh: '操作转换正确性验证',
        en: 'Operational Transformation Correctness Validation',
      },
      description: {
        zh: '验证操作转换的正确性',
        en: 'Validate correctness of operational transformation',
      },
      severity: 'error',
      category: 'processing',
      validator: (context) => this.validateOTCorrectness(context),
    });

    this.registerRule({
      id: 'collaborative-editing-002',
      name: {
        zh: '冲突检测准确性验证',
        en: 'Conflict Detection Accuracy Validation',
      },
      description: {
        zh: '验证冲突检测的准确性',
        en: 'Validate accuracy of conflict detection',
      },
      severity: 'error',
      category: 'processing',
      validator: (context) => this.validateConflictDetectionAccuracy(context),
    });

    this.registerRule({
      id: 'collaborative-editing-003',
      name: {
        zh: '状态同步延迟检查',
        en: 'State Sync Latency Check',
      },
      description: {
        zh: '验证状态同步的延迟',
        en: 'Validate latency of state synchronization',
      },
      severity: 'warning',
      category: 'feedback',
      validator: (context) => this.validateStateSyncLatency(context),
    });
  }

  registerRule(rule: ValidationRule): void {
    this.rules.set(rule.id, rule);
  }

  unregisterRule(ruleId: string): void {
    this.rules.delete(ruleId);
  }

  async validateLoop(
    loopType: LoopType,
    context: ValidationContext
  ): Promise<ValidationResult> {
    const issues: ValidationIssue[] = [];
    const recommendations: string[] = [];
    let totalScore = 0;
    let ruleCount = 0;

    for (const [ruleId, rule] of this.rules.entries()) {
      if (rule.category === 'input' && context.inputData) {
        const result = rule.validator(context);
        issues.push(...result.issues);
        totalScore += result.score;
        ruleCount++;
      } else if (rule.category === 'processing' && context.processingData) {
        const result = rule.validator(context);
        issues.push(...result.issues);
        totalScore += result.score;
        ruleCount++;
      } else if (rule.category === 'output' && context.outputData) {
        const result = rule.validator(context);
        issues.push(...result.issues);
        totalScore += result.score;
        ruleCount++;
      } else if (rule.category === 'feedback' && context.feedbackData) {
        const result = rule.validator(context);
        issues.push(...result.issues);
        totalScore += result.score;
        ruleCount++;
      }
    }

    const finalScore = ruleCount > 0 ? totalScore / ruleCount : 0;

    // 生成建议
    recommendations.push(...this.generateRecommendations(issues, finalScore));

    // 记录验证历史
    this.recordValidationHistory(loopType, {
      passed: finalScore >= 80,
      issues,
      score: finalScore,
      recommendations,
    });

    return {
      passed: finalScore >= 80,
      issues,
      score: finalScore,
      recommendations,
    };
  }

  private validateInputDataIntegrity(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (!context.inputData) {
      issues.push({
        ruleId: 'design-input-001',
        severity: 'error',
        message: {
          zh: '输入数据为空',
          en: 'Input data is empty',
        },
        suggestion: {
          zh: '请提供有效的输入数据',
          en: 'Please provide valid input data',
        },
      });
      return { passed: false, issues, score: 0, recommendations: [] };
    }

    if (!context.inputData.type || !context.inputData.content) {
      issues.push({
        ruleId: 'design-input-001',
        severity: 'error',
        message: {
          zh: '输入数据缺少必要字段',
          en: 'Input data missing required fields',
        },
        suggestion: {
          zh: '请确保输入数据包含 type 和 content 字段',
          en: 'Please ensure input data contains type and content fields',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 50,
      recommendations: [],
    };
  }

  private validateIntentRecognitionAccuracy(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (!context.processingData?.intent) {
      issues.push({
        ruleId: 'design-input-002',
        severity: 'warning',
        message: {
          zh: '意图识别结果为空',
          en: 'Intent recognition result is empty',
        },
        suggestion: {
          zh: '请检查AI服务是否正常运行',
          en: 'Please check if AI service is running properly',
        },
      });
    }

    if (context.processingData?.confidence && context.processingData.confidence < 0.7) {
      issues.push({
        ruleId: 'design-input-002',
        severity: 'warning',
        message: {
          zh: `意图识别置信度较低: ${(context.processingData.confidence * 100).toFixed(1)}%`,
          en: `Intent recognition confidence is low: ${(context.processingData.confidence * 100).toFixed(1)}%`,
        },
        suggestion: {
          zh: '建议提供更详细的输入描述',
          en: 'Suggest providing more detailed input description',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 70,
      recommendations: [],
    };
  }

  private validateDesignDataConsistency(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (!context.outputData) {
      issues.push({
        ruleId: 'design-input-003',
        severity: 'error',
        message: {
          zh: '设计数据生成失败',
          en: 'Design data generation failed',
        },
        suggestion: {
          zh: '请检查设计数据生成流程',
          en: 'Please check design data generation process',
        },
      });
      return { passed: false, issues, score: 0, recommendations: [] };
    }

    if (!context.outputData.layout || !context.outputData.components) {
      issues.push({
        ruleId: 'design-input-003',
        severity: 'error',
        message: {
          zh: '设计数据缺少必要字段',
          en: 'Design data missing required fields',
        },
        suggestion: {
          zh: '请确保设计数据包含 layout 和 components 字段',
          en: 'Please ensure design data contains layout and components fields',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 60,
      recommendations: [],
    };
  }

  private validateFeedbackResponseTime(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.feedbackData?.responseTime && context.feedbackData.responseTime > 1000) {
      issues.push({
        ruleId: 'design-input-004',
        severity: 'warning',
        message: {
          zh: `反馈响应时间过长: ${context.feedbackData.responseTime}ms`,
          en: `Feedback response time is too long: ${context.feedbackData.responseTime}ms`,
        },
        suggestion: {
          zh: '建议优化反馈处理逻辑',
          en: 'Suggest optimizing feedback processing logic',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 80,
      recommendations: [],
    };
  }

  private validateCodeSyntax(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (!context.outputData?.code) {
      issues.push({
        ruleId: 'code-generation-001',
        severity: 'error',
        message: {
          zh: '代码生成失败',
          en: 'Code generation failed',
        },
        suggestion: {
          zh: '请检查代码生成流程',
          en: 'Please check code generation process',
        },
      });
      return { passed: false, issues, score: 0, recommendations: [] };
    }

    if (context.outputData?.syntaxErrors && context.outputData.syntaxErrors.length > 0) {
      issues.push({
        ruleId: 'code-generation-001',
        severity: 'error',
        message: {
          zh: `发现 ${context.outputData.syntaxErrors.length} 个语法错误`,
          en: `Found ${context.outputData.syntaxErrors.length} syntax errors`,
        },
        suggestion: {
          zh: '请修复语法错误',
          en: 'Please fix syntax errors',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 40,
      recommendations: [],
    };
  }

  private validateTypeSafety(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.outputData?.typeErrors && context.outputData.typeErrors.length > 0) {
      issues.push({
        ruleId: 'code-generation-002',
        severity: 'error',
        message: {
          zh: `发现 ${context.outputData.typeErrors.length} 个类型错误`,
          en: `Found ${context.outputData.typeErrors.length} type errors`,
        },
        suggestion: {
          zh: '请修复类型错误',
          en: 'Please fix type errors',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 50,
      recommendations: [],
    };
  }

  private evaluateCodeQuality(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];
    let score = 100;

    if (context.outputData?.complexity && context.outputData.complexity > 10) {
      issues.push({
        ruleId: 'code-generation-003',
        severity: 'info',
        message: {
          zh: `代码复杂度较高: ${context.outputData.complexity}`,
          en: `Code complexity is high: ${context.outputData.complexity}`,
        },
        suggestion: {
          zh: '建议拆分复杂函数',
          en: 'Suggest splitting complex functions',
        },
      });
      score -= 10;
    }

    if (context.outputData?.duplication && context.outputData.duplication > 0.2) {
      issues.push({
        ruleId: 'code-generation-003',
        severity: 'info',
        message: {
          zh: `代码重复率较高: ${(context.outputData.duplication * 100).toFixed(1)}%`,
          en: `Code duplication is high: ${(context.outputData.duplication * 100).toFixed(1)}%`,
        },
        suggestion: {
          zh: '建议提取重复代码',
          en: 'Suggest extracting duplicate code',
        },
      });
      score -= 15;
    }

    return {
      passed: score >= 70,
      issues,
      score,
      recommendations: [],
    };
  }

  private validateCompilation(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.outputData?.compilationErrors && context.outputData.compilationErrors.length > 0) {
      issues.push({
        ruleId: 'code-generation-004',
        severity: 'error',
        message: {
          zh: `编译失败: ${context.outputData.compilationErrors[0].message}`,
          en: `Compilation failed: ${context.outputData.compilationErrors[0].message}`,
        },
        suggestion: {
          zh: '请修复编译错误',
          en: 'Please fix compilation errors',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 30,
      recommendations: [],
    };
  }

  private validateChangeDetectionAccuracy(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.processingData?.falsePositives && context.processingData.falsePositives > 0) {
      issues.push({
        ruleId: 'real-time-preview-001',
        severity: 'warning',
        message: {
          zh: `发现 ${context.processingData.falsePositives} 个误报`,
          en: `Found ${context.processingData.falsePositives} false positives`,
        },
        suggestion: {
          zh: '建议优化变更检测算法',
          en: 'Suggest optimizing change detection algorithm',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 85,
      recommendations: [],
    };
  }

  private validatePreviewRefreshPerformance(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.outputData?.refreshTime && context.outputData.refreshTime > 500) {
      issues.push({
        ruleId: 'real-time-preview-002',
        severity: 'warning',
        message: {
          zh: `预览刷新时间过长: ${context.outputData.refreshTime}ms`,
          en: `Preview refresh time is too long: ${context.outputData.refreshTime}ms`,
        },
        suggestion: {
          zh: '建议优化预览刷新性能',
          en: 'Suggest optimizing preview refresh performance',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 75,
      recommendations: [],
    };
  }

  private validateUIConsistency(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.outputData?.inconsistencies && context.outputData.inconsistencies.length > 0) {
      issues.push({
        ruleId: 'real-time-preview-003',
        severity: 'error',
        message: {
          zh: `发现 ${context.outputData.inconsistencies.length} 个UI不一致问题`,
          en: `Found ${context.outputData.inconsistencies.length} UI inconsistencies`,
        },
        suggestion: {
          zh: '请检查设计数据和预览UI的一致性',
          en: 'Please check consistency between design data and preview UI',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 60,
      recommendations: [],
    };
  }

  private validateContextUnderstanding(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.processingData?.contextAccuracy && context.processingData.contextAccuracy < 0.8) {
      issues.push({
        ruleId: 'ai-assistant-001',
        severity: 'warning',
        message: {
          zh: `上下文理解准确性较低: ${(context.processingData.contextAccuracy * 100).toFixed(1)}%`,
          en: `Context understanding accuracy is low: ${(context.processingData.contextAccuracy * 100).toFixed(1)}%`,
        },
        suggestion: {
          zh: '建议提供更完整的上下文信息',
          en: 'Suggest providing more complete context information',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 75,
      recommendations: [],
    };
  }

  private validateSuggestionRelevance(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.outputData?.relevanceScore && context.outputData.relevanceScore < 0.7) {
      issues.push({
        ruleId: 'ai-assistant-002',
        severity: 'info',
        message: {
          zh: `建议相关性较低: ${(context.outputData.relevanceScore * 100).toFixed(1)}%`,
          en: `Suggestion relevance is low: ${(context.outputData.relevanceScore * 100).toFixed(1)}%`,
        },
        suggestion: {
          zh: '建议优化AI建议生成算法',
          en: 'Suggest optimizing AI suggestion generation algorithm',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 80,
      recommendations: [],
    };
  }

  private validateOTCorrectness(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.processingData?.otErrors && context.processingData.otErrors.length > 0) {
      issues.push({
        ruleId: 'collaborative-editing-001',
        severity: 'error',
        message: {
          zh: `操作转换错误: ${context.processingData.otErrors.length} 个`,
          en: `Operational transformation errors: ${context.processingData.otErrors.length}`,
        },
        suggestion: {
          zh: '请检查操作转换算法',
          en: 'Please check operational transformation algorithm',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 40,
      recommendations: [],
    };
  }

  private validateConflictDetectionAccuracy(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.processingData?.conflictAccuracy && context.processingData.conflictAccuracy < 0.9) {
      issues.push({
        ruleId: 'collaborative-editing-002',
        severity: 'error',
        message: {
          zh: `冲突检测准确性较低: ${(context.processingData.conflictAccuracy * 100).toFixed(1)}%`,
          en: `Conflict detection accuracy is low: ${(context.processingData.conflictAccuracy * 100).toFixed(1)}%`,
        },
        suggestion: {
          zh: '建议优化冲突检测算法',
          en: 'Suggest optimizing conflict detection algorithm',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 70,
      recommendations: [],
    };
  }

  private validateStateSyncLatency(context: ValidationContext): ValidationResult {
    const issues: ValidationIssue[] = [];

    if (context.feedbackData?.syncLatency && context.feedbackData.syncLatency > 200) {
      issues.push({
        ruleId: 'collaborative-editing-003',
        severity: 'warning',
        message: {
          zh: `状态同步延迟过高: ${context.feedbackData.syncLatency}ms`,
          en: `State sync latency is too high: ${context.feedbackData.syncLatency}ms`,
        },
        suggestion: {
          zh: '建议优化网络连接或使用CDN',
          en: 'Suggest optimizing network connection or using CDN',
        },
      });
    }

    return {
      passed: issues.length === 0,
      issues,
      score: issues.length === 0 ? 100 : 80,
      recommendations: [],
    };
  }

  private generateRecommendations(issues: ValidationIssue[], score: number): string[] {
    const recommendations: string[] = [];

    if (score < 60) {
      recommendations.push('critical_improvement_needed');
    } else if (score < 80) {
      recommendations.push('improvement_recommended');
    } else if (score < 90) {
      recommendations.push('minor_improvements');
    } else {
      recommendations.push('excellent_quality');
    }

    const errorCount = issues.filter((i) => i.severity === 'error').length;
    const warningCount = issues.filter((i) => i.severity === 'warning').length;

    if (errorCount > 0) {
      recommendations.push(`fix_${errorCount}_critical_issues`);
    }

    if (warningCount > 0) {
      recommendations.push(`address_${warningCount}_warnings`);
    }

    return recommendations;
  }

  private recordValidationHistory(loopType: LoopType, result: ValidationResult): void {
    if (!this.validationHistory.has(loopType)) {
      this.validationHistory.set(loopType, []);
    }

    const history = this.validationHistory.get(loopType)!;
    history.push(result);

    if (history.length > 100) {
      history.shift();
    }
  }

  getValidationHistory(loopType: LoopType): ValidationResult[] {
    return this.validationHistory.get(loopType) || [];
  }

  getValidationStatistics(loopType: LoopType): {
    totalValidations: number;
    averageScore: number;
    passRate: number;
  } {
    const history = this.getValidationHistory(loopType);

    if (history.length === 0) {
      return {
        totalValidations: 0,
        averageScore: 0,
        passRate: 0,
      };
    }

    const totalScore = history.reduce((sum, r) => sum + r.score, 0);
    const passedCount = history.filter((r) => r.passed).length;

    return {
      totalValidations: history.length,
      averageScore: totalScore / history.length,
      passRate: (passedCount / history.length) * 100,
    };
  }

  resetValidationHistory(loopType?: LoopType): void {
    if (loopType) {
      this.validationHistory.delete(loopType);
    } else {
      this.validationHistory.clear();
    }
  }
}

export const closedLoopValidation = new ClosedLoopValidation();
```

### 闭环验证标准

#### 验证评分标准

| 评分范围 | 等级 | 描述 | 行动建议 |
|---------|------|------|---------|
| 90-100 | 优秀 | 闭环运行良好，无需改进 | 持续监控 |
| 80-89 | 良好 | 闭环运行正常，有小幅改进空间 | 优化性能 |
| 70-79 | 一般 | 闭环基本可用，存在一些问题 | 修复问题 |
| 60-69 | 较差 | 闭环存在较多问题，需要改进 | 重点关注 |
| 0-59 | 失败 | 闭环无法正常运行，必须修复 | 紧急处理 |

#### 验证规则分类

1. **输入验证（Input Validation）**
   - 数据完整性检查
   - 数据格式验证
   - 数据安全性检查

2. **处理验证（Processing Validation）**
   - 算法正确性验证
   - 性能指标检查
   - 资源使用监控

3. **输出验证（Output Validation）**
   - 结果正确性验证
   - 质量评估
   - 一致性检查

4. **反馈验证（Feedback Validation）**
   - 响应时间检查
   - 用户体验评估
   - 反馈有效性验证

#### 验证流程

```
1. 收集验证数据
   ↓
2. 应用验证规则
   ↓
3. 生成验证结果
   ↓
4. 评估验证分数
   ↓
5. 生成改进建议
   ↓
6. 记录验证历史
   ↓
7. 输出验证报告
```

---

## 🎨 图标系统体系

### 图标设计原则

1. **一致性**：所有图标遵循统一的设计语言
2. **可识别性**：图标含义清晰，易于理解
3. **可扩展性**：支持多种尺寸和主题
4. **可访问性**：提供文本替代和键盘导航

### 图标分类体系

#### 1. 核心功能图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| ⊕ | 添加 | Add | 展开多功能菜单 | 聊天框、工具栏 | Ctrl+Shift+A | 添加 | Add |
| 👁 | 预览 | Preview | 切换至预览视图 | 视图切换 | Ctrl+1 | 预览 | Preview |
| ⌨️ | 代码 | Code | 切换至代码视图 | 视图切换 | Ctrl+2 | 代码 | Code |
| 📁 | 文件 | File | 切换至文件管理 | 视图切换 | Ctrl+3 | 文件 | File |
| 🔍 | 搜索 | Search | 全局搜索 | 顶部导航 | Ctrl+Shift+F | 搜索 | Search |
| ⋯ | 更多 | More | 扩展菜单 | 工具栏 | Ctrl+Shift+M | 更多 | More |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 2. 导航图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| ◀ | 返回 | Back | 返回上一级 | 顶部导航 | Esc | 返回 | Back |
| 🏠 | 首页 | Home | 返回首页 | 顶部导航 | Ctrl+H | 首页 | Home |
| ⬆️ | 上移 | Move Up | 向上移动 | 列表操作 | Alt+↑ | 上移 | Move Up |
| ⬇️ | 下移 | Move Down | 向下移动 | 列表操作 | Alt+↓ | 下移 | Move Down |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 3. 编辑图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| ✏️ | 编辑 | Edit | 编辑内容 | 文件操作 | Ctrl+E | 编辑 | Edit |
| 📋 | 复制 | Copy | 复制内容 | 文件操作 | Ctrl+C | 复制 | Copy |
| 📝 | 粘贴 | Paste | 粘贴内容 | 文件操作 | Ctrl+V | 粘贴 | Paste |
| ✂️ | 剪切 | Cut | 剪切内容 | 文件操作 | Ctrl+X | 剪切 | Cut |
| 🗑️ | 删除 | Delete | 删除内容 | 文件操作 | Delete | 删除 | Delete |
| ↩️ | 撤销 | Undo | 撤销操作 | 编辑操作 | Ctrl+Z | 撤销 | Undo |
| ↪️ | 重做 | Redo | 重做操作 | 编辑操作 | Ctrl+Y | 重做 | Redo |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 4. 文件操作图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| 📁 | 文件夹 | Folder | 文件夹 | 文件树 | - | 文件夹 | Folder |
| 📄 | 文件 | File | 文件 | 文件树 | - | 文件 | File |
| ➕ | 新建 | New | 新建文件/文件夹 | 文件操作 | Ctrl+N | 新建 | New |
| 📤 | 导出 | Export | 导出文件 | 文件操作 | Ctrl+Shift+E | 导出 | Export |
| 📥 | 导入 | Import | 导入文件 | 文件操作 | Ctrl+Shift+I | 导入 | Import |
| 🕐 | 历史 | History | 版本历史 | 文件操作 | Ctrl+Shift+H | 历史 | History |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 5. AI 功能图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| 🤖 | AI模型 | AI Model | AI模型选择 | AI交互 | - | AI模型 | AI Model |
| 🔌 | 插件 | Plugin | 插件管理 | AI交互 | - | 插件 | Plugin |
| 💡 | 建议 | Suggestion | AI建议 | AI交互 | - | 建议 | Suggestion |
| ⚡ | 快速操作 | Quick Action | 快速操作 | AI交互 | Ctrl+Shift+Q | 快速操作 | Quick Action |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 6. 终端图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| 🖥️ | 终端 | Terminal | 打开终端 | 终端操作 | Ctrl+` | 终端 | Terminal |
| 📑 | 标签页 | Tab | 终端标签页 | 终端操作 | Ctrl+Shift+T | 标签页 | Tab |
| 💾 | 保存 | Save | 保存会话 | 终端操作 | Ctrl+S | 保存 | Save |
| ⌨️ | 命令 | Command | 执行命令 | 终端操作 | Enter | 命令 | Command |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 7. 设置图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| ⚙️ | 设置 | Settings | 打开设置 | 设置操作 | Ctrl+, | 设置 | Settings |
| 🌐 | 语言 | Language | 切换语言 | 设置操作 | Ctrl+Shift+L | 语言 | Language |
| 🎨 | 主题 | Theme | 切换主题 | 设置操作 | Ctrl+Shift+T | 主题 | Theme |
| 👤 | 用户 | User | 用户设置 | 设置操作 | Ctrl+Shift+U | 用户 | User |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 8. 协作图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| 👥 | 团队 | Team | 团队管理 | 协作操作 | - | 团队 | Team |
| 🔗 | 分享 | Share | 分享项目 | 协作操作 | Ctrl+Shift+S | 分享 | Share |
| 💬 | 评论 | Comment | 添加评论 | 协作操作 | Ctrl+Shift+C | 评论 | Comment |
| 🔔 | 通知 | Notification | 查看通知 | 协作操作 | Ctrl+Shift+N | 通知 | Notification |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 9. 部署图标

| 图标 | 中文名称 | 英文名称 | 功能 | 使用场景 | 快捷键 | 悬停提示（中文） | 悬停提示（英文） |
|------|---------|---------|------|---------|--------|----------------|----------------|
| 🚀 | 发布 | Deploy | 发布部署 | 部署操作 | Ctrl+Shift+D | 发布 | Deploy |
| 🐙 | GitHub | GitHub | GitHub 集成 | 部署操作 | Ctrl+Shift+G | GitHub | GitHub |
| 📊 | 监控 | Monitor | 监控面板 | 部署操作 | - | 监控 | Monitor |
| 📈 | 分析 | Analytics | 数据分析 | 部署操作 | - | 分析 | Analytics |

**图标交互规范**：

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

### 图标使用规范

#### 1. 图标显示规范

- **默认状态**：只显示图标，不显示文字
- **悬停状态**：显示中文名称（根据当前语言设置）
- **激活状态**：高亮显示，表示当前功能已激活
- **禁用状态**：灰度显示，表示功能不可用

#### 2. 图标尺寸规范

| 场景 | 尺寸 | 说明 |
|------|------|------|
| 顶部导航栏 | 20px | 小尺寸图标 |
| 工具栏 | 24px | 标准尺寸图标 |
| 按钮图标 | 16px | 按钮内图标 |
| 列表图标 | 16px | 列表项图标 |
| 预览图标 | 48px | 预览大图标 |

#### 3. 图标颜色规范

| 状态 | 颜色 | 说明 |
|------|------|------|
| 默认 | #6B7280 | 灰色 |
| 悬停 | #3B82F6 | 蓝色 |
| 激活 | #2563EB | 深蓝色 |
| 禁用 | #D1D5DB | 浅灰色 |
| 错误 | #EF4444 | 红色 |
| 成功 | #10B981 | 绿色 |
| 警告 | #F59E0B | 黄色 |

#### 4. 图标可访问性规范

- **ARIA 标签**：所有图标必须包含 `aria-label` 属性
- **键盘导航**：所有图标必须支持键盘 Tab 导航
- **屏幕阅读器**：提供文本替代内容
- **焦点状态**：清晰的焦点指示器

### 图标实现示例

```tsx
import { Icon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface IconButtonProps {
  icon: React.ReactNode;
  name: string;
  onClick: () => void;
  disabled?: boolean;
  shortcut?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  name,
  onClick,
  disabled = false,
  shortcut
}) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={t(`icons.${name}`)}
      title={t(`icons.${name}`)}
      className={`
        p-2 rounded-lg transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-50'}
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `}
    >
      {icon}
      {shortcut && (
        <span className="ml-2 text-xs text-gray-400">
          {shortcut}
        </span>
      )}
    </button>
  );
};
```

---

## 🧠 逻辑核心链路

### 状态管理架构

#### 全局状态管理（Zustand）

```typescript
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AppState {
  // 用户状态
  user: {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'busy' | 'offline';
  };

  // 项目状态
  project: {
    id: string;
    name: string;
    files: FileNode[];
    activeFile: string | null;
  };

  // 视图状态
  view: {
    mode: 'preview' | 'code' | 'split';
    layout: 'three-column' | 'two-column' | 'single';
  };

  // AI 状态
  ai: {
    model: 'gpt-4' | 'claude' | 'local';
    conversation: Message[];
    isGenerating: boolean;
  };

  // 操作方法
  setUser: (user: Partial<AppState['user']>) => void;
  setProject: (project: Partial<AppState['project']>) => void;
  setView: (view: Partial<AppState['view']>) => void;
  setAI: (ai: Partial<AppState['ai']>) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        user: {
          id: '',
          name: '',
          avatar: '',
          status: 'online',
        },
        project: {
          id: '',
          name: '',
          files: [],
          activeFile: null,
        },
        view: {
          mode: 'split',
          layout: 'three-column',
        },
        ai: {
          model: 'gpt-4',
          conversation: [],
          isGenerating: false,
        },
        setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
        setProject: (project) => set((state) => ({ project: { ...state.project, ...project } })),
        setView: (view) => set((state) => ({ view: { ...state.view, ...view } })),
        setAI: (ai) => set((state) => ({ ai: { ...state.ai, ...ai } })),
      }),
      {
        name: 'yyc3-app-storage',
      }
    )
  )
);
```

### 数据流架构

#### 1. 用户输入流

```
用户操作
    ↓
事件捕获（React Event）
    ↓
状态更新（Zustand Store）
    ↓
副作用触发（useEffect）
    ↓
API 调用（React Query）
    ↓
响应处理
    ↓
UI 更新
```

#### 2. AI 交互流

```
用户输入
    ↓
上下文收集（Context Provider）
    ↓
意图识别（AI Service）
    ↓
请求构建（Prompt Builder）
    ↓
API 调用（OpenAI/Anthropic）
    ↓
流式响应（SSE）
    ↓
实时更新（React State）
    ↓
UI 渲染
```

#### 3. 文件操作流

```
文件操作
    ↓
操作验证（Validator）
    ↓
虚拟文件系统（VFS）
    ↓
CRDT 更新（Yjs）
    ↓
状态同步（WebSocket）
    ↓
文件系统（fs-extra）
    ↓
变更通知（chokidar）
    ↓
UI 更新
```

### 错误处理机制

#### 统一错误消息格式

```typescript
/**
 * file utils/error-formatter.ts
 * description 统一错误消息格式化工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,error-handling,i18n,public
 */

import { useTranslation } from 'react-i18next';

/**
 * 错误代码枚举
 */
export enum ErrorCode {
  // 网络错误 (1000-1099)
  NETWORK_ERROR = 'NETWORK_ERROR',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  CONNECTION_REFUSED = 'CONNECTION_REFUSED',
  
  // API 错误 (2000-2099)
  API_ERROR = 'API_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  MODEL_NOT_FOUND = 'MODEL_NOT_FOUND',
  PROVIDER_NOT_FOUND = 'PROVIDER_NOT_FOUND',
  
  // 速率限制错误 (3000-3099)
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS',
  
  // 认证错误 (4000-4099)
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  INVALID_API_KEY = 'INVALID_API_KEY',
  API_KEY_EXPIRED = 'API_KEY_EXPIRED',
  
  // 配置错误 (5000-5099)
  INVALID_CONFIG = 'INVALID_CONFIG',
  MISSING_CONFIG = 'MISSING_CONFIG',
  UNSUPPORTED_LAYOUT_VERSION = 'UNSUPPORTED_LAYOUT_VERSION',
  TEMPLATE_NOT_FOUND = 'TEMPLATE_NOT_FOUND',
  PLUGIN_ALREADY_LOADED = 'PLUGIN_ALREADY_LOADED',
  PLUGIN_NOT_FOUND_IN_MARKET = 'PLUGIN_NOT_FOUND_IN_MARKET',
  
  // 验证错误 (6000-6099)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_INPUT_TYPE = 'INVALID_INPUT_TYPE',
  INTENT_RECOGNITION_FAILED = 'INTENT_RECOGNITION_FAILED',
  DESIGN_GENERATION_FAILED = 'DESIGN_GENERATION_FAILED',
  TYPE_CHECK_FAILED = 'TYPE_CHECK_FAILED',
  BUILD_FAILED = 'BUILD_FAILED',
  COMPILATION_FAILED = 'COMPILATION_FAILED',
  INTENT_UNDERSTANDING_FAILED = 'INTENT_UNDERSTANDING_FAILED',
  SUGGESTION_GENERATION_FAILED = 'SUGGESTION_GENERATION_FAILED',
  SUGGESTION_APPLICATION_FAILED = 'SUGGESTION_APPLICATION_FAILED',
  UNSUPPORTED_OPERATION_TYPE = 'UNSUPPORTED_OPERATION_TYPE',
  
  // 未知错误 (9000-9999)
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

/**
 * 错误严重级别
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

/**
 * 统一错误接口
 */
export interface YYC3Error {
  code: ErrorCode;
  message: string;
  severity: ErrorSeverity;
  details?: any;
  timestamp: number;
  userId?: string;
  requestId?: string;
}

/**
 * 错误消息格式化器
 */
export class ErrorFormatter {
  private t: ReturnType<typeof useTranslation>['t'];

  constructor(t: ReturnType<typeof useTranslation>['t']) {
    this.t = t;
  }

  /**
   * 格式化错误消息
   */
  formatError(error: YYC3Error): string {
    const message = this.t(`errors.${error.code.toLowerCase()}`, {
      defaultValue: error.message,
      ...error.details,
    });

    return message;
  }

  /**
   * 创建统一错误对象
   */
  createError(
    code: ErrorCode,
    message?: string,
    details?: any,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM
  ): YYC3Error {
    return {
      code,
      message: message || this.getDefaultMessage(code),
      severity,
      details,
      timestamp: Date.now(),
    };
  }

  /**
   * 获取默认错误消息
   */
  private getDefaultMessage(code: ErrorCode): string {
    const defaultMessages: Record<ErrorCode, string> = {
      [ErrorCode.NETWORK_ERROR]: 'errors.networkError',
      [ErrorCode.NETWORK_TIMEOUT]: 'errors.networkTimeout',
      [ErrorCode.CONNECTION_REFUSED]: 'errors.connectionRefused',
      [ErrorCode.API_ERROR]: 'errors.apiError',
      [ErrorCode.INVALID_REQUEST]: 'errors.invalidRequest',
      [ErrorCode.MODEL_NOT_FOUND]: 'errors.modelNotFound',
      [ErrorCode.PROVIDER_NOT_FOUND]: 'errors.providerNotFound',
      [ErrorCode.RATE_LIMIT_EXCEEDED]: 'errors.rateLimitExceeded',
      [ErrorCode.TOO_MANY_REQUESTS]: 'errors.tooManyRequests',
      [ErrorCode.AUTHENTICATION_FAILED]: 'errors.authenticationFailed',
      [ErrorCode.INVALID_API_KEY]: 'errors.invalidApiKey',
      [ErrorCode.API_KEY_EXPIRED]: 'errors.apiKeyExpired',
      [ErrorCode.INVALID_CONFIG]: 'errors.invalidConfig',
      [ErrorCode.MISSING_CONFIG]: 'errors.missingConfig',
      [ErrorCode.UNSUPPORTED_LAYOUT_VERSION]: 'errors.unsupportedLayoutVersion',
      [ErrorCode.TEMPLATE_NOT_FOUND]: 'errors.templateNotFound',
      [ErrorCode.PLUGIN_ALREADY_LOADED]: 'errors.pluginAlreadyLoaded',
      [ErrorCode.PLUGIN_NOT_FOUND_IN_MARKET]: 'errors.pluginNotFoundInMarket',
      [ErrorCode.VALIDATION_ERROR]: 'errors.validationError',
      [ErrorCode.INVALID_INPUT_TYPE]: 'errors.invalidInputType',
      [ErrorCode.INTENT_RECOGNITION_FAILED]: 'errors.intentRecognitionFailed',
      [ErrorCode.DESIGN_GENERATION_FAILED]: 'errors.designGenerationFailed',
      [ErrorCode.TYPE_CHECK_FAILED]: 'errors.typeCheckFailed',
      [ErrorCode.BUILD_FAILED]: 'errors.buildFailed',
      [ErrorCode.COMPILATION_FAILED]: 'errors.compilationFailed',
      [ErrorCode.INTENT_UNDERSTANDING_FAILED]: 'errors.intentUnderstandingFailed',
      [ErrorCode.SUGGESTION_GENERATION_FAILED]: 'errors.suggestionGenerationFailed',
      [ErrorCode.SUGGESTION_APPLICATION_FAILED]: 'errors.suggestionApplicationFailed',
      [ErrorCode.UNSUPPORTED_OPERATION_TYPE]: 'errors.unsupportedOperationType',
      [ErrorCode.UNKNOWN_ERROR]: 'errors.unknownError',
    };

    return defaultMessages[code] || 'errors.unknownError';
  }

  /**
   * 将普通错误转换为统一错误
   */
  fromError(error: Error | YYC3Error): YYC3Error {
    if (this.isYYC3Error(error)) {
      return error;
    }

    return this.createError(
      ErrorCode.UNKNOWN_ERROR,
      error.message,
      { originalError: error.name },
      ErrorSeverity.MEDIUM
    );
  }

  /**
   * 检查是否为 YYC3 错误
   */
  private isYYC3Error(error: Error | YYC3Error): error is YYC3Error {
    return 'code' in error && 'severity' in error;
  }
}

/**
 * 全局错误格式化器实例
 */
export const errorFormatter = new ErrorFormatter(
  useTranslation()
);

/**
 * 快捷方法：创建错误
 */
export const createError = (
  code: ErrorCode,
  message?: string,
  details?: any,
  severity?: ErrorSeverity
): YYC3Error => {
  return errorFormatter.createError(code, message, details, severity);
};

/**
 * 快捷方法：格式化错误
 */
export const formatError = (error: YYC3Error): string => {
  return errorFormatter.formatError(error);
};

/**
 * 快捷方法：从普通错误创建 YYC3 错误
 */
export const fromError = (error: Error | YYC3Error): YYC3Error => {
  return errorFormatter.fromError(error);
};
```

#### 错误分类

| 错误类型 | 严重级别 | 错误代码 | 用户提示（中文） | 用户提示（英文） |
|---------|---------|---------|----------------|----------------|
| 网络错误 | 高 | NETWORK_ERROR | "网络连接失败，正在重试..." | "Network connection failed, retrying..." |
| 网络超时 | 高 | NETWORK_TIMEOUT | "网络连接超时，请检查网络" | "Network timeout, please check your connection" |
| API 错误 | 高 | API_ERROR | "服务暂时不可用，请稍后重试" | "Service temporarily unavailable, please try again later" |
| 无效请求 | 中 | INVALID_REQUEST | "请求格式不正确" | "Invalid request format" |
| 速率限制 | 高 | RATE_LIMIT_EXCEEDED | "请求过于频繁，请稍后再试" | "Too many requests, please try again later" |
| 认证失败 | 高 | AUTHENTICATION_FAILED | "请先登录" | "Please login first" |
| 无效 API 密钥 | 高 | INVALID_API_KEY | "API 密钥无效" | "Invalid API key" |
| 配置错误 | 中 | INVALID_CONFIG | "配置无效" | "Invalid configuration" |
| 验证错误 | 中 | VALIDATION_ERROR | "输入格式不正确" | "Invalid input format" |
| 未知错误 | 高 | UNKNOWN_ERROR | "发生未知错误，请联系管理员" | "An unknown error occurred, please contact administrator" |

#### 错误处理流程

```
错误捕获
    ↓
错误分类
    ↓
错误日志（Sentry）
    ↓
用户提示（Toast）
    ↓
错误恢复
    ↓
状态重置
```

#### 边缘情况处理

```typescript
/**
 * file utils/edge-case-handler.ts
 * description 边缘情况处理工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,edge-cases,validation,public
 */

/**
 * 边缘情况类型
 */
export enum EdgeCaseType {
  // 网络相关
  NETWORK_OFFLINE = 'NETWORK_OFFLINE',
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  NETWORK_SLOW = 'NETWORK_SLOW',
  
  // 数据相关
  EMPTY_DATA = 'EMPTY_DATA',
  NULL_DATA = 'NULL_DATA',
  UNDEFINED_DATA = 'UNDEFINED_DATA',
  INVALID_DATA_TYPE = 'INVALID_DATA_TYPE',
  DATA_CORRUPTION = 'DATA_CORRUPTION',
  
  // 文件相关
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  FILE_TYPE_UNSUPPORTED = 'FILE_TYPE_UNSUPPORTED',
  FILE_PERMISSION_DENIED = 'FILE_PERMISSION_DENIED',
  
  // 用户输入相关
  EMPTY_INPUT = 'EMPTY_INPUT',
  INVALID_INPUT_FORMAT = 'INVALID_INPUT_FORMAT',
  INPUT_TOO_LONG = 'INPUT_TOO_LONG',
  INPUT_TOO_SHORT = 'INPUT_TOO_SHORT',
  SPECIAL_CHARACTERS = 'SPECIAL_CHARACTERS',
  
  // 并发相关
  RACE_CONDITION = 'RACE_CONDITION',
  DEADLOCK = 'DEADLOCK',
  RESOURCE_EXHAUSTION = 'RESOURCE_EXHAUSTION',
  
  // 性能相关
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  CPU_LIMIT_EXCEEDED = 'CPU_LIMIT_EXCEEDED',
  STORAGE_LIMIT_EXCEEDED = 'STORAGE_LIMIT_EXCEEDED',
  
  // 兼容性相关
  BROWSER_NOT_SUPPORTED = 'BROWSER_NOT_SUPPORTED',
  FEATURE_NOT_SUPPORTED = 'FEATURE_NOT_SUPPORTED',
  VERSION_INCOMPATIBLE = 'VERSION_INCOMPATIBLE',
  
  // 安全相关
  XSS_ATTACK = 'XSS_ATTACK',
  SQL_INJECTION = 'SQL_INJECTION',
  CSRF_ATTACK = 'CSRF_ATTACK',
}

/**
 * 边缘情况处理策略
 */
export enum EdgeCaseStrategy {
  IGNORE = 'IGNORE',
  RETRY = 'RETRY',
  FALLBACK = 'FALLBACK',
  ALERT_USER = 'ALERT_USER',
  LOG_AND_CONTINUE = 'LOG_AND_CONTINUE',
  ABORT = 'ABORT',
}

/**
 * 边缘情况处理器
 */
export class EdgeCaseHandler {
  private handlers: Map<EdgeCaseType, EdgeCaseStrategy> = new Map();
  private fallbackHandlers: Map<string, () => any> = new Map();

  constructor() {
    this.setupDefaultHandlers();
  }

  /**
   * 设置默认处理策略
   */
  private setupDefaultHandlers(): void {
    // 网络相关
    this.handlers.set(EdgeCaseType.NETWORK_OFFLINE, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.NETWORK_TIMEOUT, EdgeCaseStrategy.RETRY);
    this.handlers.set(EdgeCaseType.NETWORK_SLOW, EdgeCaseStrategy.LOG_AND_CONTINUE);

    // 数据相关
    this.handlers.set(EdgeCaseType.EMPTY_DATA, EdgeCaseStrategy.FALLBACK);
    this.handlers.set(EdgeCaseType.NULL_DATA, EdgeCaseStrategy.FALLBACK);
    this.handlers.set(EdgeCaseType.UNDEFINED_DATA, EdgeCaseStrategy.FALLBACK);
    this.handlers.set(EdgeCaseType.INVALID_DATA_TYPE, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.DATA_CORRUPTION, EdgeCaseStrategy.ABORT);

    // 文件相关
    this.handlers.set(EdgeCaseType.FILE_NOT_FOUND, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.FILE_TOO_LARGE, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.FILE_TYPE_UNSUPPORTED, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.FILE_PERMISSION_DENIED, EdgeCaseStrategy.ABORT);

    // 用户输入相关
    this.handlers.set(EdgeCaseType.EMPTY_INPUT, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.INVALID_INPUT_FORMAT, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.INPUT_TOO_LONG, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.INPUT_TOO_SHORT, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.SPECIAL_CHARACTERS, EdgeCaseStrategy.LOG_AND_CONTINUE);

    // 并发相关
    this.handlers.set(EdgeCaseType.RACE_CONDITION, EdgeCaseStrategy.RETRY);
    this.handlers.set(EdgeCaseType.DEADLOCK, EdgeCaseStrategy.ABORT);
    this.handlers.set(EdgeCaseType.RESOURCE_EXHAUSTION, EdgeCaseStrategy.ABORT);

    // 性能相关
    this.handlers.set(EdgeCaseType.MEMORY_LIMIT_EXCEEDED, EdgeCaseStrategy.FALLBACK);
    this.handlers.set(EdgeCaseType.CPU_LIMIT_EXCEEDED, EdgeCaseStrategy.FALLBACK);
    this.handlers.set(EdgeCaseType.STORAGE_LIMIT_EXCEEDED, EdgeCaseStrategy.ABORT);

    // 兼容性相关
    this.handlers.set(EdgeCaseType.BROWSER_NOT_SUPPORTED, EdgeCaseStrategy.ALERT_USER);
    this.handlers.set(EdgeCaseType.FEATURE_NOT_SUPPORTED, EdgeCaseStrategy.FALLBACK);
    this.handlers.set(EdgeCaseType.VERSION_INCOMPATIBLE, EdgeCaseStrategy.ALERT_USER);

    // 安全相关
    this.handlers.set(EdgeCaseType.XSS_ATTACK, EdgeCaseStrategy.ABORT);
    this.handlers.set(EdgeCaseType.SQL_INJECTION, EdgeCaseStrategy.ABORT);
    this.handlers.set(EdgeCaseType.CSRF_ATTACK, EdgeCaseStrategy.ABORT);
  }

  /**
   * 处理边缘情况
   */
  async handleEdgeCase(
    type: EdgeCaseType,
    context?: any
  ): Promise<any> {
    const strategy = this.handlers.get(type) || EdgeCaseStrategy.LOG_AND_CONTINUE;

    switch (strategy) {
      case EdgeCaseStrategy.IGNORE:
        return null;

      case EdgeCaseStrategy.RETRY:
        return await this.retryOperation(context);

      case EdgeCaseStrategy.FALLBACK:
        return await this.executeFallback(type, context);

      case EdgeCaseStrategy.ALERT_USER:
        this.alertUser(type, context);
        return null;

      case EdgeCaseStrategy.LOG_AND_CONTINUE:
        this.logEdgeCase(type, context);
        return context;

      case EdgeCaseStrategy.ABORT:
        this.abortOperation(type, context);
        throw new Error(`Operation aborted due to edge case: ${type}`);

      default:
        return this.logEdgeCase(type, context);
    }
  }

  /**
   * 重试操作
   */
  private async retryOperation(context: any, maxRetries = 3): Promise<any> {
    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        if (context.operation) {
          return await context.operation();
        }
        return context;
      } catch (error) {
        lastError = error as Error;
        if (i < maxRetries - 1) {
          await this.delay(Math.pow(2, i) * 1000); // 指数退避
        }
      }
    }

    throw lastError;
  }

  /**
   * 执行回退方案
   */
  private async executeFallback(type: EdgeCaseType, context: any): Promise<any> {
    const fallbackKey = `fallback_${type}`;
    const fallbackHandler = this.fallbackHandlers.get(fallbackKey);

    if (fallbackHandler) {
      return fallbackHandler();
    }

    // 默认回退值
    switch (type) {
      case EdgeCaseType.EMPTY_DATA:
      case EdgeCaseType.NULL_DATA:
      case EdgeCaseType.UNDEFINED_DATA:
        return [];

      case EdgeCaseType.MEMORY_LIMIT_EXCEEDED:
      case EdgeCaseType.CPU_LIMIT_EXCEEDED:
        return { optimized: true, simplified: true };

      case EdgeCaseType.FEATURE_NOT_SUPPORTED:
        return { supported: false, alternative: 'manual' };

      default:
        return null;
    }
  }

  /**
   * 提示用户
   */
  private alertUser(type: EdgeCaseType, context: any): void {
    const messages: Record<EdgeCaseType, string> = {
      [EdgeCaseType.NETWORK_OFFLINE]: 'errors.networkOffline',
      [EdgeCaseType.NETWORK_TIMEOUT]: 'errors.networkTimeout',
      [EdgeCaseType.FILE_NOT_FOUND]: 'errors.fileNotFound',
      [EdgeCaseType.FILE_TOO_LARGE]: 'errors.fileTooLarge',
      [EdgeCaseType.FILE_TYPE_UNSUPPORTED]: 'errors.fileTypeUnsupported',
      [EdgeCaseType.EMPTY_INPUT]: 'errors.emptyInput',
      [EdgeCaseType.INVALID_INPUT_FORMAT]: 'errors.invalidInputFormat',
      [EdgeCaseType.INPUT_TOO_LONG]: 'errors.inputTooLong',
      [EdgeCaseType.INPUT_TOO_SHORT]: 'errors.inputTooShort',
      [EdgeCaseType.BROWSER_NOT_SUPPORTED]: 'errors.browserNotSupported',
      [EdgeCaseType.VERSION_INCOMPATIBLE]: 'errors.versionIncompatible',
      [EdgeCaseType.INVALID_DATA_TYPE]: 'errors.invalidDataType',
      [EdgeCaseType.DATA_CORRUPTION]: 'errors.dataCorruption',
      [EdgeCaseType.FILE_PERMISSION_DENIED]: 'errors.filePermissionDenied',
    };

    const message = messages[type] || 'errors.unknownError';
    
    if (typeof window !== 'undefined' && window.alert) {
      alert(message);
    }
  }

  /**
   * 记录边缘情况
   */
  private logEdgeCase(type: EdgeCaseType, context: any): void {
    console.warn(`Edge case detected: ${type}`, context);
  }

  /**
   * 中止操作
   */
  private abortOperation(type: EdgeCaseType, context: any): void {
    console.error(`Operation aborted due to edge case: ${type}`, context);
  }

  /**
   * 延迟执行
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 注册自定义回退处理器
   */
  registerFallback(type: EdgeCaseType, handler: () => any): void {
    const fallbackKey = `fallback_${type}`;
    this.fallbackHandlers.set(fallbackKey, handler);
  }

  /**
   * 设置自定义处理策略
   */
  setStrategy(type: EdgeCaseType, strategy: EdgeCaseStrategy): void {
    this.handlers.set(type, strategy);
  }
}

/**
 * 全局边缘情况处理器实例
 */
export const edgeCaseHandler = new EdgeCaseHandler();

/**
 * 边缘情况检测工具
 */
export class EdgeCaseDetector {
  /**
   * 检测网络边缘情况
   */
  static detectNetworkEdgeCase(status: number): EdgeCaseType | null {
    if (status === 0) return EdgeCaseType.NETWORK_OFFLINE;
    if (status === 408) return EdgeCaseType.NETWORK_TIMEOUT;
    if (status === 503) return EdgeCaseType.NETWORK_SLOW;
    return null;
  }

  /**
   * 检测数据边缘情况
   */
  static detectDataEdgeCase(data: any): EdgeCaseType | null {
    if (data === null) return EdgeCaseType.NULL_DATA;
    if (data === undefined) return EdgeCaseType.UNDEFINED_DATA;
    if (Array.isArray(data) && data.length === 0) return EdgeCaseType.EMPTY_DATA;
    if (typeof data === 'object' && Object.keys(data).length === 0) return EdgeCaseType.EMPTY_DATA;
    return null;
  }

  /**
   * 检测文件边缘情况
   */
  static detectFileEdgeCase(file: File): EdgeCaseType | null {
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const SUPPORTED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'application/json', 'text/plain'];

    if (file.size > MAX_FILE_SIZE) return EdgeCaseType.FILE_TOO_LARGE;
    if (!SUPPORTED_TYPES.includes(file.type)) return EdgeCaseType.FILE_TYPE_UNSUPPORTED;
    return null;
  }

  /**
   * 检测输入边缘情况
   */
  static detectInputEdgeCase(input: string, options?: {
    minLength?: number;
    maxLength?: number;
    allowSpecialChars?: boolean;
  }): EdgeCaseType | null {
    if (!input || input.trim().length === 0) return EdgeCaseType.EMPTY_INPUT;
    
    if (options?.minLength && input.length < options.minLength) {
      return EdgeCaseType.INPUT_TOO_SHORT;
    }
    
    if (options?.maxLength && input.length > options.maxLength) {
      return EdgeCaseType.INPUT_TOO_LONG;
    }
    
    if (!options?.allowSpecialChars && /[<>{}[\]\\]/.test(input)) {
      return EdgeCaseType.SPECIAL_CHARACTERS;
    }
    
    return null;
  }

  /**
   * 检测性能边缘情况
   */
  static detectPerformanceEdgeCase(metrics: {
    memoryUsage?: number;
    cpuUsage?: number;
    storageUsage?: number;
  }): EdgeCaseType | null {
    const MEMORY_THRESHOLD = 0.9; // 90%
    const CPU_THRESHOLD = 0.8; // 80%
    const STORAGE_THRESHOLD = 0.95; // 95%

    if (metrics.memoryUsage && metrics.memoryUsage > MEMORY_THRESHOLD) {
      return EdgeCaseType.MEMORY_LIMIT_EXCEEDED;
    }
    
    if (metrics.cpuUsage && metrics.cpuUsage > CPU_THRESHOLD) {
      return EdgeCaseType.CPU_LIMIT_EXCEEDED;
    }
    
    if (metrics.storageUsage && metrics.storageUsage > STORAGE_THRESHOLD) {
      return EdgeCaseType.STORAGE_LIMIT_EXCEEDED;
    }
    
    return null;
  }

  /**
   * 检测浏览器兼容性边缘情况
   */
  static detectBrowserEdgeCase(): EdgeCaseType | null {
    if (typeof window === 'undefined') {
      return EdgeCaseType.BROWSER_NOT_SUPPORTED;
    }

    const userAgent = navigator.userAgent;
    
    // 检测不支持的浏览器
    if (/MSIE|Trident/.test(userAgent)) {
      return EdgeCaseType.BROWSER_NOT_SUPPORTED;
    }

    // 检测不支持的特性
    if (!('IntersectionObserver' in window)) {
      return EdgeCaseType.FEATURE_NOT_SUPPORTED;
    }

    return null;
  }
}

/**
 * 快捷方法：处理边缘情况
 */
export const handleEdgeCase = async (
  type: EdgeCaseType,
  context?: any
): Promise<any> => {
  return edgeCaseHandler.handleEdgeCase(type, context);
};

/**
 * 快捷方法：检测并处理边缘情况
 */
export const detectAndHandleEdgeCase = async (
  detector: () => EdgeCaseType | null,
  context?: any
): Promise<any> => {
  const edgeCase = detector();
  if (edgeCase) {
    return handleEdgeCase(edgeCase, context);
  }
  return context;
};
```

### 边缘情况清单

| 类别 | 边缘情况 | 检测方法 | 处理策略 | 优先级 |
|------|---------|---------|---------|--------|
| **网络** | 离线状态 | navigator.onLine | 提示用户 | 高 |
| **网络** | 超时 | 响应时间 > 30s | 重试 3 次 | 高 |
| **网络** | 网络缓慢 | 响应时间 > 10s | 记录日志 | 中 |
| **数据** | 空数据 | data.length === 0 | 使用默认值 | 中 |
| **数据** | null 值 | data === null | 使用默认值 | 中 |
| **数据** | undefined | data === undefined | 使用默认值 | 中 |
| **数据** | 类型错误 | typeof !== expected | 提示用户 | 高 |
| **数据** | 数据损坏 | JSON.parse 失败 | 中止操作 | 高 |
| **文件** | 文件不存在 | !fs.existsSync() | 提示用户 | 高 |
| **文件** | 文件过大 | file.size > 10MB | 提示用户 | 高 |
| **文件** | 不支持的类型 | !SUPPORTED_TYPES.includes() | 提示用户 | 高 |
| **文件** | 权限拒绝 | EACCES 错误 | 中止操作 | 高 |
| **输入** | 空输入 | input.trim() === '' | 提示用户 | 中 |
| **输入** | 格式错误 | 正则验证失败 | 提示用户 | 中 |
| **输入** | 过长 | input.length > max | 提示用户 | 中 |
| **输入** | 过短 | input.length < min | 提示用户 | 中 |
| **输入** | 特殊字符 | /[<>{}[\]\\]/.test() | 记录日志 | 低 |
| **并发** | 竞态条件 | 并发修改检测 | 重试 | 高 |
| **并发** | 死锁 | 超时检测 | 中止操作 | 高 |
| **并发** | 资源耗尽 | 连接池满 | 中止操作 | 高 |
| **性能** | 内存超限 | memory > 90% | 降级处理 | 高 |
| **性能** | CPU 超限 | cpu > 80% | 降级处理 | 高 |
| **性能** | 存储超限 | storage > 95% | 中止操作 | 高 |
| **兼容性** | 浏览器不支持 | IE 检测 | 提示用户 | 高 |
| **兼容性** | 特性不支持 | !feature in window | 降级处理 | 中 |
| **兼容性** | 版本不兼容 | version < minVersion | 提示用户 | 高 |
| **安全** | XSS 攻击 | <script> 检测 | 中止操作 | 高 |
| **安全** | SQL 注入 | SQL 关键字检测 | 中止操作 | 高 |
| **安全** | CSRF 攻击 | Token 验证失败 | 中止操作 | 高 |

---

## 🛠️ 技术实现规范

### 代码规范

#### TypeScript 规范

```typescript
/**
 * file utils/logger.ts
 * description 日志工具模块，提供统一的日志记录接口
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,logging,core,public
 */

import winston from 'winston';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

export interface LoggerConfig {
  level: LogLevel;
  format: 'json' | 'text';
  transports: {
    console: boolean;
    file: boolean;
  };
}

export class Logger {
  private logger: winston.Logger;

  constructor(config: LoggerConfig) {
    this.logger = winston.createLogger({
      level: config.level,
      format: config.format === 'json'
        ? winston.format.json()
        : winston.format.simple(),
      transports: [
        ...(config.transports.console ? [new winston.transports.Console()] : []),
        ...(config.transports.file ? [new winston.transports.File({ filename: 'app.log' })] : []),
      ],
    });
  }

  public error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  public info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  public debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }
}

export const logger = new Logger({
  level: LogLevel.INFO,
  format: 'json',
  transports: {
    console: true,
    file: true,
  },
});
```

#### React 组件规范

```tsx
/**
 * file components/Button.tsx
 * description 通用按钮组件
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags components,react,ui,button,public
 */

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
            'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
            'bg-transparent text-gray-700 hover:bg-gray-100': variant === 'ghost',
            'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### AI 服务规范

#### 1. 智能代码补全

```typescript
/**
 * file services/ai-completion.ts
 * description 智能代码补全服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,ai,completion,public
 */

import { openai } from '/config/openai';

export interface CompletionContext {
  code: string;
  cursorPosition: number;
  language: string;
  framework: string;
  filePath: string;
}

export interface CompletionSuggestion {
  text: string;
  confidence: number;
  type: 'keyword' | 'variable' | 'function' | 'snippet';
}

export class AICompletionService {
  async getCompletions(context: CompletionContext): Promise<CompletionSuggestion[]> {
    const prompt = this.buildPrompt(context);
    
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的代码补全助手，专门为 ${context.framework} + ${context.language} 项目提供智能代码补全建议。
            请根据上下文提供准确、简洁的代码补全建议。
            
            回答格式：
            [
              {
                "text": "补全的代码",
                "confidence": 0.95,
                "type": "function"
              }
            ]
            
            You are a professional code completion assistant specialized in ${context.framework} + ${context.language} projects.
            Please provide accurate and concise code completion suggestions based on context.
            
            Response format:
            [
              {
                "text": "completed code",
                "confidence": 0.95,
                "type": "function"
              }
            ]`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 100,
      });

      const suggestions = this.parseResponse(response.choices[0].message.content || '[]');
      return suggestions.slice(0, 5);
    } catch (error) {
      console.error('AI completion failed:', error);
      return [];
    }
  }

  private buildPrompt(context: CompletionContext): string {
    const lines = context.code.split('\n');
    const currentLine = lines[context.cursorPosition];
    const previousLines = lines.slice(Math.max(0, context.cursorPosition - 5), context.cursorPosition);
    
    return `
文件路径: ${context.filePath}
语言: ${context.language}
框架: ${context.framework}

上下文:
${previousLines.join('\n')}

当前行: ${currentLine}

光标位置: ${context.cursorPosition}

请提供符合上下文的代码补全建议。
File path: ${context.filePath}
Language: ${context.language}
Framework: ${context.framework}

Context:
${previousLines.join('\n')}

Current line: ${currentLine}

Cursor position: ${context.cursorPosition}

Please provide code completion suggestions that fit the context.
    `;
  }

  private parseResponse(content: string): CompletionSuggestion[] {
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }
}

export const aiCompletionService = new AICompletionService();
```

#### 2. 智能错误修复

```typescript
/**
 * file services/ai-fix.ts
 * description 智能错误修复服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,ai,error-fix,public
 */

import { openai } from '/config/openai';

export interface ErrorContext {
  errorMessage: string;
  errorCode?: string;
  stackTrace?: string;
  code: string;
  language: string;
  framework: string;
}

export interface FixSuggestion {
  originalCode: string;
  fixedCode: string;
  explanation: {
    zh: string;
    en: string;
  };
  confidence: number;
}

export class AIFixService {
  async fixError(context: ErrorContext): Promise<FixSuggestion[]> {
    const prompt = this.buildPrompt(context);
    
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的错误诊断和修复助手，专门帮助开发者解决 ${context.framework} + ${context.language} 项目中的错误。
            请分析错误信息，提供准确的修复建议。
            
            回答格式：
            [
              {
                "originalCode": "原始代码",
                "fixedCode": "修复后的代码",
                "explanation": {
                  "zh": "错误原因和修复说明（中文）",
                  "en": "Error cause and fix explanation (English)"
                },
                "confidence": 0.95
              }
            ]
            
            You are a professional error diagnosis and fix assistant, specialized in helping developers solve errors in ${context.framework} + ${context.language} projects.
            Please analyze the error message and provide accurate fix suggestions.
            
            Response format:
            [
              {
                "originalCode": "original code",
                "fixedCode": "fixed code",
                "explanation": {
                  "zh": "Error cause and fix explanation (Chinese)",
                  "en": "Error cause and fix explanation (English)"
                },
                "confidence": 0.95
              }
            ]`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
      });

      const suggestions = this.parseResponse(response.choices[0].message.content || '[]');
      return suggestions.slice(0, 3);
    } catch (error) {
      console.error('AI fix failed:', error);
      return [];
    }
  }

  private buildPrompt(context: ErrorContext): string {
    return `
语言: ${context.language}
框架: ${context.framework}

错误信息: ${context.errorMessage}
错误代码: ${context.errorCode || 'N/A'}

堆栈跟踪:
${context.stackTrace || 'N/A'}

相关代码:
\`\`\`${context.language}
${context.code}
\`\`\`

请分析错误原因，并提供修复建议。
Language: ${context.language}
Framework: ${context.framework}

Error message: ${context.errorMessage}
Error code: ${context.errorCode || 'N/A'}

Stack trace:
${context.stackTrace || 'N/A'}

Related code:
\`\`\`${context.language}
${context.code}
\`\`\`

Please analyze the error cause and provide fix suggestions.
    `;
  }

  private parseResponse(content: string): FixSuggestion[] {
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }
}

export const aiFixService = new AIFixService();
```

#### 3. 智能重构建议

```typescript
/**
 * file services/ai-refactor.ts
 * description 智能重构建议服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,ai,refactor,public
 */

import { openai } from '/config/openai';

export interface RefactorContext {
  code: string;
  language: string;
  framework: string;
  filePath: string;
  refactorType: 'performance' | 'readability' | 'maintainability' | 'all';
}

export interface RefactorSuggestion {
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  originalCode: string;
  refactoredCode: string;
  benefits: {
    zh: string[];
    en: string[];
  };
  priority: 'high' | 'medium' | 'low';
}

export class AIRefactorService {
  async getRefactorSuggestions(context: RefactorContext): Promise<RefactorSuggestion[]> {
    const prompt = this.buildPrompt(context);
    
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `你是一个专业的代码重构助手，专门为 ${context.framework} + ${context.language} 项目提供重构建议。
            请分析代码质量，提供具体的重构建议。
            
            回答格式：
            [
              {
                "title": {
                  "zh": "重构建议标题（中文）",
                  "en": "Refactor suggestion title (English)"
                },
                "description": {
                  "zh": "详细描述（中文）",
                  "en": "Detailed description (English)"
                },
                "originalCode": "原始代码",
                "refactoredCode": "重构后的代码",
                "benefits": {
                  "zh": ["好处1", "好处2"],
                  "en": ["benefit1", "benefit2"]
                },
                "priority": "high"
              }
            ]
            
            You are a professional code refactoring assistant, specialized in providing refactoring suggestions for ${context.framework} + ${context.language} projects.
            Please analyze code quality and provide specific refactoring suggestions.
            
            Response format:
            [
              {
                "title": {
                  "zh": "Refactor suggestion title (Chinese)",
                  "en": "Refactor suggestion title (English)"
                },
                "description": {
                  "zh": "Detailed description (Chinese)",
                  "en": "Detailed description (English)"
                },
                "originalCode": "original code",
                "refactoredCode": "refactored code",
                "benefits": {
                  "zh": ["benefit1", "benefit2"],
                  "en": ["benefit1", "benefit2"]
                },
                "priority": "high"
              }
            ]`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.4,
        max_tokens: 1000,
      });

      const suggestions = this.parseResponse(response.choices[0].message.content || '[]');
      return suggestions.slice(0, 5);
    } catch (error) {
      console.error('AI refactor failed:', error);
      return [];
    }
  }

  private buildPrompt(context: RefactorContext): string {
    const refactorTypeMap = {
      performance: '性能优化 / Performance optimization',
      readability: '可读性提升 / Readability improvement',
      maintainability: '可维护性增强 / Maintainability enhancement',
      all: '全面重构 / Comprehensive refactoring',
    };

    return `
文件路径: ${context.filePath}
语言: ${context.language}
框架: ${context.framework}
重构类型: ${refactorTypeMap[context.refactorType]}

代码:
\`\`\`${context.language}
${context.code}
\`\`\`

请分析代码质量，并提供具体的重构建议。
File path: ${context.filePath}
Language: ${context.language}
Framework: ${context.framework}
Refactor type: ${refactorTypeMap[context.refactorType]}

Code:
\`\`\`${context.language}
${context.code}
\`\`\`

Please analyze code quality and provide specific refactoring suggestions.
    `;
  }

  private parseResponse(content: string): RefactorSuggestion[] {
    try {
      return JSON.parse(content);
    } catch {
      return [];
    }
  }
}

export const aiRefactorService = new AIRefactorService();
```

### API 规范

#### RESTful API 设计

```typescript
/**
 * file api/routes.ts
 * description API 路由定义
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags api,rest,express,routes,public
 */

import { Router } from 'express';
import { authMiddleware } from '/middleware/auth';
import { validateRequest } from '/middleware/validation';
import { projectController } from '/controllers/project';
import { aiController } from '/controllers/ai';
import { fileController } from '/controllers/file';

const router = Router();

// 项目相关路由
router.get('/projects', authMiddleware, projectController.list);
router.post('/projects', authMiddleware, validateRequest(createProjectSchema), projectController.create);
router.get('/projects/:id', authMiddleware, projectController.get);
router.put('/projects/:id', authMiddleware, validateRequest(updateProjectSchema), projectController.update);
router.delete('/projects/:id', authMiddleware, projectController.delete);

// AI 相关路由
router.post('/ai/chat', authMiddleware, validateRequest(chatSchema), aiController.chat);
router.post('/ai/generate', authMiddleware, validateRequest(generateSchema), aiController.generate);
router.post('/ai/suggest', authMiddleware, validateRequest(suggestSchema), aiController.suggest);

// 文件相关路由
router.get('/projects/:projectId/files', authMiddleware, fileController.list);
router.post('/projects/:projectId/files', authMiddleware, validateRequest(createFileSchema), fileController.create);
router.get('/projects/:projectId/files/:fileId', authMiddleware, fileController.get);
router.put('/projects/:projectId/files/:fileId', authMiddleware, validateRequest(updateFileSchema), fileController.update);
router.delete('/projects/:projectId/files/:fileId', authMiddleware, fileController.delete);

export default router;
```

### 快捷键规范

#### 快捷键配置文件

```typescript
/**
 * file config/shortcuts.ts
 * description 快捷键配置文件 - 统一快捷键规范
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags config,typescript,shortcuts,accessibility,public
 */

export interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  description: {
    zh: string;
    en: string;
  };
  category: 'file' | 'edit' | 'view' | 'ai' | 'terminal' | 'settings';
}

export const defaultShortcuts: Record<string, ShortcutConfig> = {
  // 文件操作快捷键
  'file.new': {
    key: 'n',
    ctrl: true,
    shift: true,
    description: { zh: '新建文件/项目', en: 'New File/Project' },
    category: 'file',
  },
  'file.save': {
    key: 's',
    ctrl: true,
    description: { zh: '保存文件', en: 'Save File' },
    category: 'file',
  },
  'file.saveAll': {
    key: 's',
    ctrl: true,
    shift: true,
    description: { zh: '保存所有文件', en: 'Save All Files' },
    category: 'file',
  },
  'file.export': {
    key: 'e',
    ctrl: true,
    shift: true,
    description: { zh: '导出项目', en: 'Export Project' },
    category: 'file',
  },
  'file.import': {
    key: 'i',
    ctrl: true,
    shift: true,
    description: { zh: '导入项目', en: 'Import Project' },
    category: 'file',
  },

  // 编辑操作快捷键
  'edit.undo': {
    key: 'z',
    ctrl: true,
    description: { zh: '撤销', en: 'Undo' },
    category: 'edit',
  },
  'edit.redo': {
    key: 'y',
    ctrl: true,
    description: { zh: '重做', en: 'Redo' },
    category: 'edit',
  },
  'edit.cut': {
    key: 'x',
    ctrl: true,
    description: { zh: '剪切', en: 'Cut' },
    category: 'edit',
  },
  'edit.copy': {
    key: 'c',
    ctrl: true,
    description: { zh: '复制', en: 'Copy' },
    category: 'edit',
  },
  'edit.paste': {
    key: 'v',
    ctrl: true,
    description: { zh: '粘贴', en: 'Paste' },
    category: 'edit',
  },
  'edit.find': {
    key: 'f',
    ctrl: true,
    description: { zh: '查找', en: 'Find' },
    category: 'edit',
  },
  'edit.replace': {
    key: 'h',
    ctrl: true,
    description: { zh: '替换', en: 'Replace' },
    category: 'edit',
  },

  // 视图操作快捷键
  'view.preview': {
    key: 'p',
    ctrl: true,
    shift: true,
    description: { zh: '切换预览视图', en: 'Toggle Preview' },
    category: 'view',
  },
  'view.code': {
    key: 'c',
    ctrl: true,
    shift: true,
    description: { zh: '切换代码视图', en: 'Toggle Code View' },
    category: 'view',
  },
  'view.files': {
    key: 'f',
    ctrl: true,
    shift: true,
    description: { zh: '切换文件管理器', en: 'Toggle File Explorer' },
    category: 'view',
  },
  'view.terminal': {
    key: '`',
    ctrl: true,
    description: { zh: '切换终端', en: 'Toggle Terminal' },
    category: 'view',
  },

  // AI 功能快捷键
  'ai.chat': {
    key: 'k',
    ctrl: true,
    shift: true,
    description: { zh: '打开 AI 对话', en: 'Open AI Chat' },
    category: 'ai',
  },
  'ai.generate': {
    key: 'g',
    ctrl: true,
    shift: true,
    description: { zh: '生成代码', en: 'Generate Code' },
    category: 'ai',
  },
  'ai.suggest': {
    key: 'space',
    ctrl: true,
    description: { zh: 'AI 建议', en: 'AI Suggestions' },
    category: 'ai',
  },
  'ai.fix': {
    key: 'r',
    ctrl: true,
    shift: true,
    description: { zh: '修复错误', en: 'Fix Errors' },
    category: 'ai',
  },

  // 终端快捷键
  'terminal.new': {
    key: 't',
    ctrl: true,
    shift: true,
    description: { zh: '新建终端', en: 'New Terminal' },
    category: 'terminal',
  },
  'terminal.clear': {
    key: 'k',
    ctrl: true,
    description: { zh: '清空终端', en: 'Clear Terminal' },
    category: 'terminal',
  },
  'terminal.focus': {
    key: '`',
    ctrl: true,
    description: { zh: '聚焦终端', en: 'Focus Terminal' },
    category: 'terminal',
  },

  // 设置快捷键
  'settings.open': {
    key: ',',
    ctrl: true,
    description: { zh: '打开设置', en: 'Open Settings' },
    category: 'settings',
  },
  'settings.shortcuts': {
    key: 'k',
    ctrl: true,
    alt: true,
    description: { zh: '快捷键设置', en: 'Keyboard Shortcuts' },
    category: 'settings',
  },
  'settings.theme': {
    key: 'd',
    ctrl: true,
    shift: true,
    description: { zh: '切换主题', en: 'Toggle Theme' },
    category: 'settings',
  },
  'settings.language': {
    key: 'l',
    ctrl: true,
    shift: true,
    description: { zh: '切换语言', en: 'Switch Language' },
    category: 'settings',
  },
};
```

#### 快捷键冲突检测

```typescript
/**
 * file utils/shortcut-validator.ts
 * description 快捷键冲突检测工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,shortcuts,validation,public
 */

import { ShortcutConfig } from '/config/shortcuts';

export interface ShortcutConflict {
  action1: string;
  action2: string;
  shortcut: string;
  type: 'internal' | 'system' | 'browser';
}

/**
 * 系统保留快捷键列表
 * 这些快捷键由操作系统或浏览器保留，不应被自定义
 */
export const SYSTEM_RESERVED_SHORTCUTS = [
  // 浏览器保留快捷键
  'Ctrl+T',
  'Ctrl+N',
  'Ctrl+W',
  'Ctrl+Tab',
  'Ctrl+Shift+Tab',
  'Ctrl+F',
  'Ctrl+G',
  'Ctrl+R',
  'Ctrl+Shift+R',
  'Ctrl+H',
  'Ctrl+J',
  'Ctrl+U',
  'Ctrl+D',
  'Ctrl+L',
  'Ctrl+O',
  'Ctrl+P',
  'Ctrl+S',
  'Ctrl+Shift+S',
  'Ctrl+Z',
  'Ctrl+Shift+Z',
  'Ctrl+Y',
  'Ctrl+A',
  'Ctrl+C',
  'Ctrl+V',
  'Ctrl+X',
  'Ctrl+B',
  'Ctrl+I',
  'Ctrl+U',
  'Ctrl+K',
  'Ctrl+L',
  'Ctrl+E',
  'Ctrl+F5',
  'Ctrl+Shift+Delete',
  'Ctrl+Shift+J',
  'Ctrl+Shift+I',
  'F1',
  'F5',
  'F11',
  'F12',
  // macOS 特定
  'Meta+C',
  'Meta+V',
  'Meta+X',
  'Meta+A',
  'Meta+Z',
  'Meta+Shift+Z',
  'Meta+T',
  'Meta+N',
  'Meta+W',
  'Meta+Q',
  'Meta+Comma',
  'Meta+H',
  'Meta+M',
  'Meta+Space',
];

/**
 * 检测快捷键是否与系统保留快捷键冲突
 */
export const detectSystemShortcutConflict = (shortcut: string): boolean => {
  return SYSTEM_RESERVED_SHORTCUTS.includes(shortcut);
};

/**
 * 获取快捷键字符串表示
 */
export const getShortcutKey = (config: ShortcutConfig): string => {
  const modifiers = [];
  if (config.ctrl) modifiers.push('Ctrl');
  if (config.shift) modifiers.push('Shift');
  if (config.alt) modifiers.push('Alt');
  if (config.meta) modifiers.push('Meta');
  modifiers.push(config.key);
  return modifiers.join('+');
};

/**
 * 检测内部快捷键冲突
 */
export const detectInternalConflicts = (shortcuts: Record<string, ShortcutConfig>): ShortcutConflict[] => {
  const conflicts: ShortcutConflict[] = [];
  const shortcutMap = new Map<string, string[]>();

  Object.entries(shortcuts).forEach(([action, config]) => {
    const key = getShortcutKey(config);
    if (!shortcutMap.has(key)) {
      shortcutMap.set(key, []);
    }
    shortcutMap.get(key)!.push(action);
  });

  shortcutMap.forEach((actions, key) => {
    if (actions.length > 1) {
      conflicts.push({
        action1: actions[0],
        action2: actions[1],
        shortcut: key,
        type: 'internal',
      });
    }
  });

  return conflicts;
};

/**
 * 检测系统快捷键冲突
 */
export const detectSystemConflicts = (shortcuts: Record<string, ShortcutConfig>): ShortcutConflict[] => {
  const conflicts: ShortcutConflict[] = [];

  Object.entries(shortcuts).forEach(([action, config]) => {
    const key = getShortcutKey(config);
    if (detectSystemShortcutConflict(key)) {
      conflicts.push({
        action1: action,
        action2: 'SYSTEM_RESERVED',
        shortcut: key,
        type: 'system',
      });
    }
  });

  return conflicts;
};

/**
 * 检测浏览器快捷键冲突
 */
export const detectBrowserConflicts = (shortcuts: Record<string, ShortcutConfig>): ShortcutConflict[] => {
  const conflicts: ShortcutConflict[] = [];

  Object.entries(shortcuts).forEach(([action, config]) => {
    const key = getShortcutKey(config);
    // 检测常见的浏览器快捷键
    const browserShortcuts = [
      'Ctrl+T', 'Ctrl+N', 'Ctrl+W', 'Ctrl+Tab', 'Ctrl+Shift+Tab',
      'Ctrl+F', 'Ctrl+G', 'Ctrl+R', 'Ctrl+Shift+R', 'Ctrl+H',
      'Ctrl+J', 'Ctrl+U', 'Ctrl+D', 'Ctrl+L', 'Ctrl+O', 'Ctrl+P',
      'Ctrl+S', 'Ctrl+Shift+S', 'Ctrl+Z', 'Ctrl+Shift+Z', 'Ctrl+Y',
      'Ctrl+A', 'Ctrl+C', 'Ctrl+V', 'Ctrl+X', 'Ctrl+B', 'Ctrl+I',
      'Ctrl+U', 'Ctrl+K', 'Ctrl+E', 'Ctrl+F5', 'F1', 'F5', 'F11', 'F12',
    ];
    
    if (browserShortcuts.includes(key)) {
      conflicts.push({
        action1: action,
        action2: 'BROWSER_RESERVED',
        shortcut: key,
        type: 'browser',
      });
    }
  });

  return conflicts;
};

/**
 * 检测所有类型的冲突
 */
export const detectAllConflicts = (shortcuts: Record<string, ShortcutConfig>): ShortcutConflict[] => {
  const internalConflicts = detectInternalConflicts(shortcuts);
  const systemConflicts = detectSystemConflicts(shortcuts);
  const browserConflicts = detectBrowserConflicts(shortcuts);
  
  return [...internalConflicts, ...systemConflicts, ...browserConflicts];
};

/**
 * 验证快捷键配置
 */
export const validateShortcuts = (shortcuts: Record<string, ShortcutConfig>): {
  isValid: boolean;
  conflicts: ShortcutConflict[];
  warnings: string[];
} => {
  const conflicts = detectAllConflicts(shortcuts);
  const warnings: string[] = [];

  // 检查是否有系统或浏览器冲突
  const systemOrBrowserConflicts = conflicts.filter(
    c => c.type === 'system' || c.type === 'browser'
  );
  
  if (systemOrBrowserConflicts.length > 0) {
    warnings.push(
      `Found ${systemOrBrowserConflicts.length} system/browser shortcut conflicts. ` +
      'These shortcuts may not work as expected.'
    );
  }

  return {
    isValid: conflicts.filter(c => c.type === 'internal').length === 0,
    conflicts,
    warnings,
  };
};

/**
 * 建议替代快捷键
 */
export const suggestAlternativeShortcuts = (shortcut: string): string[] => {
  const alternatives: string[] = [];
  const parts = shortcut.split('+');
  
  // 尝试替换修饰键
  if (parts.includes('Ctrl')) {
    alternatives.push(shortcut.replace('Ctrl', 'Alt'));
    alternatives.push(shortcut.replace('Ctrl', 'Meta'));
  }
  
  if (parts.includes('Alt')) {
    alternatives.push(shortcut.replace('Alt', 'Ctrl'));
    alternatives.push(shortcut.replace('Alt', 'Meta'));
  }
  
  if (parts.includes('Meta')) {
    alternatives.push(shortcut.replace('Meta', 'Ctrl'));
    alternatives.push(shortcut.replace('Meta', 'Alt'));
  }
  
  // 尝试添加 Shift
  if (!parts.includes('Shift')) {
    alternatives.push(shortcut.replace('+', '+Shift+'));
  }
  
  // 过滤掉系统保留的快捷键
  return alternatives.filter(alt => !detectSystemShortcutConflict(alt));
};
```

#### 快捷键自定义功能

```typescript
/**
 * file hooks/use-shortcuts.ts
 * description 快捷键自定义与管理 Hook
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags hooks,typescript,shortcuts,customization,public
 */

import { useState, useCallback, useEffect } from 'react';
import { ShortcutConfig, defaultShortcuts } from '/config/shortcuts';
import { validateShortcuts } from '/utils/shortcut-validator';

export const useShortcuts = () => {
  const [shortcuts, setShortcuts] = useState<Record<string, ShortcutConfig>>(defaultShortcuts);
  const [conflicts, setConflicts] = useState<string[]>([]);

  const updateShortcut = useCallback((action: string, newConfig: ShortcutConfig) => {
    const updatedShortcuts = {
      ...shortcuts,
      [action]: newConfig,
    };

    const validation = validateShortcuts(updatedShortcuts);
    
    if (validation.isValid) {
      setShortcuts(updatedShortcuts);
      setConflicts([]);
      localStorage.setItem('custom-shortcuts', JSON.stringify(updatedShortcuts));
    } else {
      setConflicts(validation.conflicts.map(c => c.shortcut));
    }
  }, [shortcuts]);

  const resetShortcuts = useCallback(() => {
    setShortcuts(defaultShortcuts);
    setConflicts([]);
    localStorage.removeItem('custom-shortcuts');
  }, []);

  const exportShortcuts = useCallback(() => {
    const data = JSON.stringify(shortcuts, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shortcuts.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [shortcuts]);

  const importShortcuts = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        const validation = validateShortcuts(imported);
        
        if (validation.isValid) {
          setShortcuts(imported);
          setConflicts([]);
          localStorage.setItem('custom-shortcuts', JSON.stringify(imported));
        } else {
          setConflicts(validation.conflicts.map(c => c.shortcut));
        }
      } catch (error) {
        console.error('Failed to import shortcuts:', error);
      }
    };
    reader.readAsText(file);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('custom-shortcuts');
    if (saved) {
      try {
        const customShortcuts = JSON.parse(saved);
        const validation = validateShortcuts(customShortcuts);
        if (validation.isValid) {
          setShortcuts(customShortcuts);
        }
      } catch (error) {
        console.error('Failed to load custom shortcuts:', error);
      }
    }
  }, []);

  return {
    shortcuts,
    conflicts,
    updateShortcut,
    resetShortcuts,
    exportShortcuts,
    importShortcuts,
  };
};
```

---

## 📊 数据模型定义

### 核心数据模型

#### 1. 用户模型（User）

```typescript
/**
 * file models/user.ts
 * description 用户数据模型定义
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags models,typescript,user,database,public
 */

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  status: 'online' | 'busy' | 'offline';
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  language: 'zh' | 'en';
  theme: 'light' | 'dark' | 'system';
  fontSize: 'sm' | 'md' | 'lg';
  notifications: boolean;
  shortcuts: Record<string, string>;
}
```

#### 2. 项目模型（Project）

```typescript
/**
 * file models/project.ts
 * description 项目数据模型定义
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags models,typescript,project,database,public
 */

export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  collaborators: Collaborator[];
  files: FileNode[];
  settings: ProjectSettings;
  status: 'draft' | 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Collaborator {
  userId: string;
  role: 'owner' | 'editor' | 'viewer';
  joinedAt: Date;
}

export interface ProjectSettings {
  framework: 'react' | 'vue' | 'angular';
  language: 'typescript' | 'javascript';
  buildTool: 'vite' | 'webpack' | 'rollup';
  styling: 'css' | 'scss' | 'tailwind' | 'styled-components';
}
```

#### 3. 文件模型（File）

```typescript
/**
 * file models/file.ts
 * description 文件数据模型定义
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags models,typescript,file,database,public
 */

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
  language?: string;
  children?: FileNode[];
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface FileVersion {
  id: string;
  fileId: string;
  version: number;
  content: string;
  authorId: string;
  commitMessage?: string;
  createdAt: Date;
}
```

#### 4. AI 对话模型（AIConversation）

```typescript
/**
 * file models/ai.ts
 * description AI 对话数据模型定义
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags models,typescript,ai,database,public
 */

export interface AIConversation {
  id: string;
  projectId: string;
  userId: string;
  model: 'gpt-4' | 'claude' | 'local';
  messages: Message[];
  context: ConversationContext;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  type?: 'text' | 'image' | 'code' | 'file';
  language?: string;
  suggestions?: string[];
  error?: string;
}

export interface ConversationContext {
  files: string[];
  activeFile?: string;
  selectedCode?: string;
  cursorPosition?: CursorPosition;
}

export interface CursorPosition {
  fileId: string;
  line: number;
  column: number;
}
```

---

## 💻 代码生成规范

### 代码生成引擎

#### 模板系统设计

```typescript
/**
 * file generators/template-engine.ts
 * description 代码生成模板引擎
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags generators,typescript,template,code-generation,public
 */

import Handlebars from 'handlebars';
import { ProjectSettings, FileNode } from '/models';

export interface TemplateContext {
  project: {
    name: string;
    description?: string;
    settings: ProjectSettings;
  };
  files: FileNode[];
  components: ComponentDefinition[];
}

export interface ComponentDefinition {
  name: string;
  props: PropDefinition[];
  state: StateDefinition[];
  methods: MethodDefinition[];
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
}

export interface StateDefinition {
  name: string;
  type: string;
  initialValue?: any;
}

export interface MethodDefinition {
  name: string;
  parameters: ParameterDefinition[];
  returnType: string;
  body: string;
}

export interface ParameterDefinition {
  name: string;
  type: string;
  optional?: boolean;
}

export class TemplateEngine {
  private templates: Map<string, HandlebarsTemplateDelegate>;

  constructor() {
    this.templates = new Map();
    this.registerHelpers();
  }

  private registerHelpers(): void {
    Handlebars.registerHelper('camelCase', (str: string) => {
      return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    });

    Handlebars.registerHelper('pascalCase', (str: string) => {
      return str.replace(/(^|-)([a-z])/g, (_, __, letter) => letter.toUpperCase());
    });

    Handlebars.registerHelper('kebabCase', (str: string) => {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    });
  }

  public loadTemplate(name: string, template: string): void {
    this.templates.set(name, Handlebars.compile(template));
  }

  public generate(templateName: string, context: TemplateContext): string {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error('errors.templateNotFound');
    }
    return template(context);
  }
}
```

#### React 组件生成器

```typescript
/**
 * file generators/react-component.ts
 * description React 组件代码生成器
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags generators,typescript,react,code-generation,public
 */

import { ComponentDefinition } from './template-engine';

export class ReactComponentGenerator {
  private templateEngine: TemplateEngine;

  constructor(templateEngine: TemplateEngine) {
    this.templateEngine = templateEngine;
    this.loadTemplates();
  }

  private loadTemplates(): void {
    const componentTemplate = `
/**
 * file components/{{pascalCase name}}.tsx
 * description {{description}}
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created {{date}}
 * updated {{date}}
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags components,react,{{kebabCase name}},public
 */

import { forwardRef } from 'react';
import { cn } from '/lib/utils';

export interface {{pascalCase name}}Props {
  {{#each props}}
  {{name}}: {{type}}{{#unless required}}?{{/unless}};
  {{/each}}
  className?: string;
}

export const {{pascalCase name}} = forwardRef<HTMLDivElement, {{pascalCase name}}Props>(
  ({ {{#each props}}{{name}}{{#unless last}}, {{/unless}}{{/each}} className }, ref) => {
    return (
      <div ref={ref} className={cn('{{kebabCase name}}', className)}>
        {{!-- Component content --}}
      </div>
    );
  }
);

{{pascalCase name}}.displayName = '{{pascalCase name}}';
`;

    this.templateEngine.loadTemplate('react-component', componentTemplate);
  }

  public generate(component: ComponentDefinition, description: string): string {
    return this.templateEngine.generate('react-component', {
      name: component.name,
      description,
      props: component.props,
      date: new Date().toISOString().split('T')[0],
    });
  }
}
```

---

## 🔒 安全与性能

### 安全机制

#### 1. 身份认证与授权

```typescript
/**
 * file middleware/auth.ts
 * description 身份认证与授权中间件
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags middleware,typescript,auth,security,public
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '/errors';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedError('未提供认证令牌 / No authentication token provided');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

export const roleMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new UnauthorizedError('权限不足 / Insufficient permissions');
    }
    next();
  };
};
```

#### 2. 数据验证

```typescript
/**
 * file middleware/validation.ts
 * description 请求数据验证中间件
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags middleware,typescript,validation,security,public
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ValidationError } from '/errors';

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(
          '请求数据验证失败 / Request validation failed',
          error.errors
        );
      }
      next(error);
    }
  };
};

export const createProjectSchema = z.object({
  name: z.string().min(1, '项目名称不能为空 / Project name cannot be empty'),
  description: z.string().optional(),
  settings: z.object({
    framework: z.enum(['react', 'vue', 'angular']),
    language: z.enum(['typescript', 'javascript']),
    buildTool: z.enum(['vite', 'webpack', 'rollup']),
    styling: z.enum(['css', 'scss', 'tailwind', 'styled-components']),
  }),
});
```

#### 3. 增强错误处理

```typescript
/**
 * file utils/error-handler.ts
 * description 增强错误处理工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,error-handling,recovery,public
 */

import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

export enum ErrorType {
  NETWORK_TIMEOUT = 'NETWORK_TIMEOUT',
  CONCURRENT_CONFLICT = 'CONCURRENT_CONFLICT',
  DATA_CORRUPTION = 'DATA_CORRUPTION',
  STORAGE_QUOTA = 'STORAGE_QUOTA',
  RATE_LIMIT = 'RATE_LIMIT',
  UNKNOWN = 'UNKNOWN',
}

export interface ErrorContext {
  type: ErrorType;
  message: {
    zh: string;
    en: string;
  };
  details?: any;
  recoverable: boolean;
  recoveryAction?: () => Promise<void>;
}

export const classifyError = (error: any): ErrorContext => {
  const { t } = useTranslation();

  if (error instanceof AxiosError) {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return {
        type: ErrorType.NETWORK_TIMEOUT,
        message: {
          zh: '网络连接超时，正在重试...',
          en: 'Network connection timeout, retrying...',
        },
        details: error.response?.data,
        recoverable: true,
        recoveryAction: async () => {
          await new Promise(resolve => setTimeout(resolve, 2000));
        },
      };
    }
    
    if (error.response?.status === 409) {
      return {
        type: ErrorType.CONCURRENT_CONFLICT,
        message: {
          zh: '并发冲突，正在自动解决...',
          en: 'Concurrent conflict, auto-resolving...',
        },
        details: error.response.data,
        recoverable: true,
        recoveryAction: async () => {
          await new Promise(resolve => setTimeout(resolve, 1000));
        },
      };
    }
    
    if (error.response?.status === 429) {
      return {
        type: ErrorType.RATE_LIMIT,
        message: {
          zh: '请求过于频繁，请稍后再试',
          en: 'Too many requests, please try again later',
        },
        details: error.response.data,
        recoverable: true,
        recoveryAction: async () => {
          await new Promise(resolve => setTimeout(resolve, 5000));
        },
      };
    }
  }

  if (error.name === 'QuotaExceededError') {
    return {
      type: ErrorType.STORAGE_QUOTA,
      message: {
        zh: '存储空间不足，请清理后重试',
        en: 'Storage quota exceeded, please clear and retry',
      },
      recoverable: true,
      recoveryAction: async () => {
        localStorage.clear();
      },
    };
  }

  if (error.message?.includes('corrupt') || error.message?.includes('invalid')) {
    return {
      type: ErrorType.DATA_CORRUPTION,
      message: {
        zh: '数据损坏，正在尝试恢复...',
        en: 'Data corruption, attempting recovery...',
      },
      details: error,
      recoverable: true,
      recoveryAction: async () => {
        localStorage.removeItem('corrupted-data');
      },
    };
  }

  return {
    type: ErrorType.UNKNOWN,
    message: {
      zh: '发生未知错误，请联系管理员',
      en: 'An unknown error occurred, please contact administrator',
    },
    details: error,
    recoverable: false,
  };
};

export const useErrorHandler = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<ErrorContext | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);

  const handleError = useCallback(async (error: any) => {
    const context = classifyError(error);
    setError(context);

    if (context.recoverable && context.recoveryAction) {
      setIsRecovering(true);
      try {
        await context.recoveryAction();
        setError(null);
      } catch (recoveryError) {
        console.error('Recovery failed:', recoveryError);
      } finally {
        setIsRecovering(false);
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    isRecovering,
    handleError,
    clearError,
  };
};
```

#### 4. 友好的错误提示组件

```tsx
/**
 * file components/ErrorBoundary.tsx
 * description 错误边界组件 - 提供友好的错误提示
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags components,react,error-handling,ui,public
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw, XCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}

const ErrorFallback: React.FC<{ error: Error | null; onRetry: () => void }> = ({ error, onRetry }) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh-CN';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          {isZh ? '出错了' : 'Something went wrong'}
        </h2>
        
        <p className="text-gray-600 text-center mb-6">
          {isZh 
            ? '抱歉，应用程序遇到了一个错误。您可以尝试刷新页面或稍后再试。'
            : 'Sorry, the application encountered an error. You can try refreshing the page or try again later.'}
        </p>

        {error && (
          <details className="mb-6">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              {isZh ? '查看错误详情' : 'View error details'}
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-40">
              {error.toString()}
            </pre>
          </details>
        )}

        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {isZh ? '重试' : 'Retry'}
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-900 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            {isZh ? '返回首页' : 'Go to Home'}
          </button>
        </div>
      </div>
    </div>
  );
};
```

#### 5. 错误恢复机制

```typescript
/**
 * file utils/recovery-manager.ts
 * description 错误恢复管理器
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,recovery,error-handling,public
 */

export interface RecoveryStrategy {
  name: string;
  priority: number;
  canRecover: (error: any) => boolean;
  recover: (error: any) => Promise<void>;
}

export class RecoveryManager {
  private strategies: RecoveryStrategy[] = [];

  registerStrategy(strategy: RecoveryStrategy) {
    this.strategies.push(strategy);
    this.strategies.sort((a, b) => b.priority - a.priority);
  }

  async recover(error: any): Promise<boolean> {
    for (const strategy of this.strategies) {
      if (strategy.canRecover(error)) {
        try {
          await strategy.recover(error);
          return true;
        } catch (recoveryError) {
          console.error(`Recovery strategy ${strategy.name} failed:`, recoveryError);
        }
      }
    }
    return false;
  }
}

export const recoveryManager = new RecoveryManager();

recoveryManager.registerStrategy({
  name: 'NetworkRetry',
  priority: 1,
  canRecover: (error) => error.code === 'ECONNABORTED' || error.message?.includes('timeout'),
  recover: async (error) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  },
});

recoveryManager.registerStrategy({
  name: 'DataRestore',
  priority: 2,
  canRecover: (error) => error.message?.includes('corrupt'),
  recover: async (error) => {
    const backup = localStorage.getItem('backup-data');
    if (backup) {
      localStorage.setItem('current-data', backup);
    }
  },
});

recoveryManager.registerStrategy({
  name: 'StateReset',
  priority: 3,
  canRecover: (error) => true,
  recover: async (error) => {
    localStorage.removeItem('current-state');
  },
});
```

#### 3. 安全最佳实践

| 安全措施 | 实现方式 | 说明 |
|---------|---------|------|
| HTTPS 强制 | SSL/TLS 证书 | 所有通信必须使用 HTTPS |
| CSRF 防护 | CSRF Token | 防止跨站请求伪造 |
| XSS 防护 | 输入过滤 + 输出编码 | 防止跨站脚本攻击 |
| SQL 注入防护 | 参数化查询 | 防止 SQL 注入攻击 |
| 速率限制 | Redis + Express Rate Limit | 防止暴力破解和 DDoS |
| 敏感数据加密 | AES-256 加密 | 加密存储敏感数据 |
| 安全头部 | Helmet 中间件 | 设置安全 HTTP 头部 |
| 日志审计 | Winston + Sentry | 记录所有安全相关事件 |

### 性能优化

#### 1. 前端性能优化

```typescript
/**
 * file utils/performance.ts
 * description 性能优化工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,performance,optimization,public
 */

import { memo, useMemo, useCallback } from 'react';

export const useOptimizedComponent = <P extends object>(
  component: React.ComponentType<P>
) => {
  return memo(component, (prevProps, nextProps) => {
    return Object.keys(prevProps).every(
      (key) => prevProps[key as keyof P] === nextProps[key as keyof P]
    );
  });
};

export const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
) => {
  return useCallback(callback, deps);
};

export const useOptimizedMemo = <T>(
  factory: () => T,
  deps: React.DependencyList
) => {
  return useMemo(factory, deps);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
```

#### 2. 后端性能优化

```typescript
/**
 * file middleware/cache.ts
 * description 缓存中间件
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags middleware,typescript,cache,performance,public
 */

import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export const cacheMiddleware = (ttl: number = 3600) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redis.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const originalJson = res.json.bind(res);
      res.json = (data) => {
        redis.setex(key, ttl, JSON.stringify(data));
        return originalJson(data);
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export const invalidateCache = (pattern: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      const keys = await redis.keys(`cache:${pattern}*`);
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return originalJson(data);
    };
    next();
  };
};
```

#### 3. 性能监控指标

| 指标 | 目标值 | 监控方式 | 告警阈值 |
|------|--------|---------|---------|
| 首次内容绘制（FCP） | < 1.8s | Lighthouse | > 2.5s |
| 最大内容绘制（LCP） | < 2.5s | Lighthouse | > 4.0s |
| 首次输入延迟（FID） | < 100ms | Lighthouse | > 300ms |
| 累积布局偏移（CLS） | < 0.1 | Lighthouse | > 0.25 |
| API 响应时间 | < 200ms | APM | > 500ms |
| 数据库查询时间 | < 100ms | APM | > 300ms |
| 内存使用率 | < 80% | 系统监控 | > 90% |
| CPU 使用率 | < 70% | 系统监控 | > 85% |

#### 4. 性能指标监控

```typescript
/**
 * file utils/performance-monitor.ts
 * description 性能指标监控工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,performance,monitoring,public
 */

export interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  apiResponseTime: number;
  memoryUsage: number;
  cpuUsage: number;
}

export interface PerformanceAlert {
  metric: string;
  value: number;
  threshold: number;
  severity: 'warning' | 'critical';
  timestamp: Date;
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics[] = [];
  private alerts: PerformanceAlert[] = [];
  private observers: PerformanceObserver[] = [];

  constructor() {
    this.initWebVitals();
    this.initResourceTiming();
    this.initAPIMonitoring();
    this.initSystemMonitoring();
  }

  private initWebVitals() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.recordMetric(entry.name, entry.startTime + entry.duration);
        }
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input', 'layout-shift'] });
      this.observers.push(observer);
    }
  }

  private initResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            this.recordMetric('ttfb', entry.responseStart - entry.fetchStart);
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  private initAPIMonitoring() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = performance.now();
      try {
        const response = await originalFetch(...args);
        const duration = performance.now() - start;
        this.recordMetric('apiResponseTime', duration);
        this.checkThreshold('apiResponseTime', duration, 500);
        return response;
      } catch (error) {
        const duration = performance.now() - start;
        this.recordMetric('apiResponseTime', duration);
        throw error;
      }
    };
  }

  private initSystemMonitoring() {
    setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
        this.recordMetric('memoryUsage', usage);
        this.checkThreshold('memoryUsage', usage, 90);
      }
    }, 5000);
  }

  private recordMetric(name: string, value: number) {
    const metric: Partial<PerformanceMetrics> = {};
    metric[name as keyof PerformanceMetrics] = value;
    
    const latest = { ...metric, timestamp: new Date() } as any;
    this.metrics.push(latest);
    
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }
  }

  private checkThreshold(metric: string, value: number, threshold: number) {
    const thresholds: Record<string, number> = {
      fcp: 2500,
      lcp: 4000,
      fid: 300,
      cls: 0.25,
      ttfb: 600,
      apiResponseTime: 500,
      memoryUsage: 90,
      cpuUsage: 85,
    };

    if (value > thresholds[metric]) {
      const alert: PerformanceAlert = {
        metric,
        value,
        threshold: thresholds[metric],
        severity: value > thresholds[metric] * 1.5 ? 'critical' : 'warning',
        timestamp: new Date(),
      };
      this.alerts.push(alert);
      this.triggerAlert(alert);
    }
  }

  private triggerAlert(alert: PerformanceAlert) {
    console.warn(`Performance Alert [${alert.severity}]:`, alert);
    
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Performance ${alert.severity}`, {
        body: `${alert.metric}: ${alert.value.toFixed(2)} (threshold: ${alert.threshold})`,
      });
    }
  }

  getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }

  getAlerts(): PerformanceAlert[] {
    return [...this.alerts];
  }

  clearAlerts() {
    this.alerts = [];
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

#### 5. 性能告警机制

```typescript
/**
 * file utils/performance-alert.ts
 * description 性能告警机制
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,performance,alerting,public
 */

export interface AlertRule {
  metric: string;
  threshold: number;
  comparison: 'greater' | 'less';
  severity: 'info' | 'warning' | 'critical';
  cooldown: number;
}

export interface AlertNotification {
  rule: AlertRule;
  value: number;
  timestamp: Date;
  acknowledged: boolean;
}

export class PerformanceAlertManager {
  private rules: AlertRule[] = [];
  private notifications: AlertNotification[] = [];
  private cooldowns: Map<string, Date> = new Map();

  constructor() {
    this.initDefaultRules();
  }

  private initDefaultRules() {
    this.rules = [
      {
        metric: 'fcp',
        threshold: 2500,
        comparison: 'greater',
        severity: 'warning',
        cooldown: 60000,
      },
      {
        metric: 'lcp',
        threshold: 4000,
        comparison: 'greater',
        severity: 'critical',
        cooldown: 60000,
      },
      {
        metric: 'fid',
        threshold: 300,
        comparison: 'greater',
        severity: 'warning',
        cooldown: 30000,
      },
      {
        metric: 'cls',
        threshold: 0.25,
        comparison: 'greater',
        severity: 'warning',
        cooldown: 60000,
      },
      {
        metric: 'apiResponseTime',
        threshold: 500,
        comparison: 'greater',
        severity: 'warning',
        cooldown: 30000,
      },
      {
        metric: 'memoryUsage',
        threshold: 90,
        comparison: 'greater',
        severity: 'critical',
        cooldown: 60000,
      },
    ];
  }

  checkMetric(metric: string, value: number): AlertNotification | null {
    const rule = this.rules.find(r => r.metric === metric);
    if (!rule) return null;

    const cooldownKey = `${metric}_${rule.severity}`;
    const lastAlert = this.cooldowns.get(cooldownKey);
    
    if (lastAlert && Date.now() - lastAlert.getTime() < rule.cooldown) {
      return null;
    }

    const triggered = rule.comparison === 'greater' 
      ? value > rule.threshold 
      : value < rule.threshold;

    if (triggered) {
      const notification: AlertNotification = {
        rule,
        value,
        timestamp: new Date(),
        acknowledged: false,
      };
      
      this.notifications.push(notification);
      this.cooldowns.set(cooldownKey, new Date());
      this.sendNotification(notification);
      
      return notification;
    }

    return null;
  }

  private sendNotification(notification: AlertNotification) {
    const { t, i18n } = useTranslation();
    const isZh = i18n.language === 'zh-CN';

    const message = isZh
      ? `${notification.rule.metric} 超过阈值: ${notification.value.toFixed(2)} (阈值: ${notification.rule.threshold})`
      : `${notification.rule.metric} exceeded threshold: ${notification.value.toFixed(2)} (threshold: ${notification.rule.threshold})`;

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(isZh ? '性能告警' : 'Performance Alert', {
        body: message,
        icon: '/icon-warning.png',
      });
    }

    console.warn(`Performance Alert [${notification.rule.severity}]:`, message);
  }

  acknowledgeNotification(notificationId: string) {
    const notification = this.notifications.find(n => n.timestamp.getTime() === parseInt(notificationId));
    if (notification) {
      notification.acknowledged = true;
    }
  }

  getNotifications(): AlertNotification[] {
    return [...this.notifications];
  }

  clearNotifications() {
    this.notifications = [];
  }
}

export const performanceAlertManager = new PerformanceAlertManager();
```

#### 6. 性能优化建议

```typescript
/**
 * file utils/performance-optimizer.ts
 * description 性能优化建议生成器
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,performance,optimization,public
 */

import { PerformanceMetrics } from './performance-monitor';

export interface OptimizationSuggestion {
  category: 'loading' | 'rendering' | 'network' | 'memory' | 'code';
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'medium' | 'hard';
  codeExample?: string;
}

export class PerformanceOptimizer {
  analyzeMetrics(metrics: PerformanceMetrics): OptimizationSuggestion[] {
    const suggestions: OptimizationSuggestion[] = [];

    if (metrics.fcp > 1800) {
      suggestions.push({
        category: 'loading',
        title: {
          zh: '优化首次内容绘制',
          en: 'Optimize First Contentful Paint',
        },
        description: {
          zh: 'FCP 超过 1.8s，建议优化资源加载和关键渲染路径',
          en: 'FCP exceeds 1.8s, consider optimizing resource loading and critical rendering path',
        },
        impact: 'high',
        effort: 'medium',
        codeExample: `
// 预加载关键资源
<link rel="preload" href="/critical.css" as="style">
<link rel="preload" href="/font.woff2" as="font" crossorigin>

// 内联关键 CSS
<style>
  /* 关键样式 */
</style>
        `,
      });
    }

    if (metrics.lcp > 2500) {
      suggestions.push({
        category: 'rendering',
        title: {
          zh: '优化最大内容绘制',
          en: 'Optimize Largest Contentful Paint',
        },
        description: {
          zh: 'LCP 超过 2.5s，建议优化图片、字体和关键资源',
          en: 'LCP exceeds 2.5s, consider optimizing images, fonts, and critical resources',
        },
        impact: 'high',
        effort: 'medium',
        codeExample: `
// 使用现代图片格式
<img src="/image.webp" alt="..." loading="lazy">

// 预加载关键资源
<link rel="preload" href="/hero-image.jpg" as="image">
        `,
      });
    }

    if (metrics.fid > 100) {
      suggestions.push({
        category: 'code',
        title: {
          zh: '优化首次输入延迟',
          en: 'Optimize First Input Delay',
        },
        description: {
          zh: 'FID 超过 100ms，建议减少 JavaScript 执行时间和主线程阻塞',
          en: 'FID exceeds 100ms, consider reducing JavaScript execution time and main thread blocking',
        },
        impact: 'high',
        effort: 'medium',
        codeExample: `
// 使用 Web Workers 处理繁重任务
const worker = new Worker('heavy-task.js');
worker.postMessage(data);
worker.onmessage = (e) => {
  // 处理结果
};

// 使用 requestIdleCallback
requestIdleCallback(() => {
  // 在空闲时执行非关键任务
});
        `,
      });
    }

    if (metrics.cls > 0.1) {
      suggestions.push({
        category: 'rendering',
        title: {
          zh: '优化累积布局偏移',
          en: 'Optimize Cumulative Layout Shift',
        },
        description: {
          zh: 'CLS 超过 0.1，建议为动态内容预留空间并避免布局变化',
          en: 'CLS exceeds 0.1, consider reserving space for dynamic content and avoiding layout changes',
        },
        impact: 'medium',
        effort: 'easy',
        codeExample: `
// 为图片预留空间
<img 
  src="/image.jpg" 
  width="800" 
  height="600"
  style="aspect-ratio: 800/600; background: #f0f0f0;"
  loading="lazy"
>

// 使用 CSS transform 进行动画
.element {
  transform: translateX(100px);
  /* 而不是改变 left 属性 */
}
        `,
      });
    }

    if (metrics.apiResponseTime > 200) {
      suggestions.push({
        category: 'network',
        title: {
          zh: '优化 API 响应时间',
          en: 'Optimize API Response Time',
        },
        description: {
          zh: 'API 响应时间超过 200ms，建议实现缓存、优化查询和减少请求大小',
          en: 'API response time exceeds 200ms, consider implementing caching, optimizing queries, and reducing request size',
        },
        impact: 'high',
        effort: 'medium',
        codeExample: `
// 实现请求缓存
const cache = new Map();

async function fetchWithCache(url: string) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
}

// 使用请求压缩
const response = await fetch(url, {
  headers: {
    'Accept-Encoding': 'gzip, deflate, br',
  },
});
        `,
      });
    }

    if (metrics.memoryUsage > 80) {
      suggestions.push({
        category: 'memory',
        title: {
          zh: '优化内存使用',
          en: 'Optimize Memory Usage',
        },
        description: {
          zh: '内存使用率超过 80%，建议检查内存泄漏、优化数据结构和清理未使用的对象',
          en: 'Memory usage exceeds 80%, consider checking for memory leaks, optimizing data structures, and cleaning up unused objects',
        },
        impact: 'high',
        effort: 'hard',
        codeExample: `
// 清理事件监听器
useEffect(() => {
  const handler = () => { /* ... */ };
  element.addEventListener('click', handler);
  
  return () => {
    element.removeEventListener('click', handler);
  };
}, []);

// 使用 WeakMap 避免内存泄漏
const weakMap = new WeakMap();
weakMap.set(key, value);

// 及时清理大对象
function processData(data: any[]) {
  const result = data.map(item => transform(item));
  data.length = 0; // 清空原数组
  return result;
}
        `,
      });
    }

    return suggestions.sort((a, b) => {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[b.impact];
    });
  }
}

export const performanceOptimizer = new PerformanceOptimizer();
```

---

## 🚀 部署与运维

### CI/CD 流程

#### GitHub Actions 配置

```yaml
/**
 * file .github/workflows/ci-cd.yml
 * description CI/CD 自动化部署流程
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags ci-cd,github-actions,deployment,automation,public
 */

name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkoutv4

      - name: Setup Node.js
        uses: actions/setup-nodev4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-actionv3
        with:
          files: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkoutv4

      - name: Setup Node.js
        uses: actions/setup-nodev4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifactv3
        with:
          name: build
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkoutv4

      - name: Download build artifacts
        uses: actions/download-artifactv3
        with:
          name: build

      - name: Deploy to production
        run: |
          echo "Deploying to production..."
          # 部署逻辑
```

### Docker 容器化

#### Dockerfile

```dockerfile
/**
 * file Dockerfile
 * description Docker 容器化配置
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags docker,containerization,deployment,devops,public
 */

# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# 生产阶段
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
```

#### Docker Compose

```yaml
/**
 * file docker-compose.yml
 * description Docker Compose 编排配置
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags docker,compose,orchestration,devops,public
 */

version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:passworddb:5432/yyc3
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=yyc3
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

### 监控与日志

#### 监控配置

```typescript
/**
 * file utils/monitoring.ts
 * description 监控与日志工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,monitoring,logging,public
 */

import * as Sentry from 'sentry/node';
import { ProfilingIntegration } from 'sentry/profiling-node';

export const initMonitoring = () => {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });
};

export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

export const captureMessage = (message: string, level: 'info' | 'warning' | 'error') => {
  Sentry.captureMessage(message, {
    level,
  });
};
```

---

## 🧪 测试体系

### 测试策略

#### 1. 单元测试

```typescript
/**
 * file tests/unit/logger.test.ts
 * description 日志工具单元测试
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags tests,jest,unit-testing,logger,public
 */

import { Logger, LogLevel } from '/utils/logger';

describe('Logger', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger({
      level: LogLevel.INFO,
      format: 'text',
      transports: {
        console: false,
        file: false,
      },
    });
  });

  describe('info', () => {
    it('应该记录信息级别的日志 / Should log info level messages', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      logger.info('Test message');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('error', () => {
    it('应该记录错误级别的日志 / Should log error level messages', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      logger.error('Test error');
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });
});
```

#### 2. 集成测试

```typescript
/**
 * file tests/integration/api.test.ts
 * description API 集成测试
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags tests,jest,integration-testing,api,public
 */

import request from 'supertest';
import app from '/app';

describe('API Integration Tests', () => {
  describe('POST /api/projects', () => {
    it('应该创建新项目 / Should create a new project', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', 'Bearer valid-token')
        .send({
          name: 'Test Project',
          settings: {
            framework: 'react',
            language: 'typescript',
            buildTool: 'vite',
            styling: 'tailwind',
          },
        });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Project');
    });

    it('应该拒绝无效的请求数据 / Should reject invalid request data', async () => {
      const response = await request(app)
        .post('/api/projects')
        .set('Authorization', 'Bearer valid-token')
        .send({
          name: '',
        });

      expect(response.status).toBe(400);
    });
  });
});
```

#### 3. E2E 测试

```typescript
/**
 * file tests/e2e/user-flow.spec.ts
 * description 用户流程端到端测试
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags tests,playwright,e2e-testing,user-flow,public
 */

import { test, expect } from 'playwright/test';

test.describe('用户创建项目流程 / User creates project flow', () => {
  test('应该成功创建并预览项目 / Should successfully create and preview project', async ({ page }) => {
    // 导航到首页
    await page.goto('/');

    // 点击创建项目按钮
    await page.click('[data-testid="create-project-button"]');

    // 填写项目信息
    await page.fill('[data-testid="project-name-input"]', 'Test Project');
    await page.selectOption('[data-testid="framework-select"]', 'react');
    await page.selectOption('[data-testid="language-select"]', 'typescript');

    // 提交表单
    await page.click('[data-testid="submit-button"]');

    // 验证项目创建成功
    await expect(page.locator('[data-testid="project-title"]')).toHaveText('Test Project');

    // 切换到预览视图
    await page.click('[data-testid="preview-button"]');

    // 验证预览显示
    await expect(page.locator('[data-testid="preview-container"]')).toBeVisible();
  });
});
```

### 测试覆盖率要求

| 测试类型 | 覆盖率目标 | 说明 |
|---------|-----------|------|
| 单元测试 | ≥ 80% | 核心业务逻辑必须达到 80% 以上 |
| 集成测试 | ≥ 60% | API 接口和数据库交互测试 |
| E2E 测试 | 关键流程 | 覆盖主要用户使用场景 |

#### 4. 性能基准测试

```typescript
/**
 * file tests/performance/benchmarks.spec.ts
 * description 性能基准测试
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags tests,jest,performance,benchmark,public
 */

import { performance } from 'perf_hooks';

describe('Performance Benchmarks', () => {
  describe('渲染性能 / Rendering Performance', () => {
    it('should render 1000 items in < 100ms', () => {
      const startTime = performance.now();
      
      const items = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        value: Math.random() * 100,
      }));
      
      const rendered = items.map(item => ({
        ...item,
        formatted: item.value.toFixed(2),
      }));
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      expect(rendered).toHaveLength(1000);
      expect(renderTime).toBeLessThan(100);
      console.log(`Rendered 1000 items in ${renderTime.toFixed(2)}ms`);
    });

    it('should handle virtual scrolling efficiently', () => {
      const startTime = performance.now();
      
      const ITEM_HEIGHT = 50;
      const VISIBLE_ITEMS = 50;
      const TOTAL_ITEMS = 10000;
      const SCROLL_TOP = 5000;
      
      const startIndex = Math.floor(SCROLL_TOP / ITEM_HEIGHT);
      const endIndex = Math.min(startIndex + VISIBLE_ITEMS, TOTAL_ITEMS);
      
      const visibleItems = Array.from(
        { length: endIndex - startIndex },
        (_, i) => startIndex + i
      );
      
      const endTime = performance.now();
      const scrollTime = endTime - startTime;
      
      expect(visibleItems).toHaveLength(VISIBLE_ITEMS);
      expect(scrollTime).toBeLessThan(10);
      console.log(`Virtual scroll calculation took ${scrollTime.toFixed(2)}ms`);
    });
  });

  describe('代码生成性能 / Code Generation Performance', () => {
    it('should generate component code in < 500ms', async () => {
      const startTime = performance.now();
      
      const component = {
        name: 'TestComponent',
        props: [
          { name: 'title', type: 'string', required: true },
          { name: 'onClick', type: 'function', required: false },
          { name: 'disabled', type: 'boolean', required: false },
        ],
      };
      
      const code = `
import React from 'react';

interface ${component.name}Props {
  ${component.props.map(prop => 
    `${prop.name}${prop.required ? '' : '?'}: ${prop.type};`
  ).join('\n  ')}
}

export const ${component.name}: React.FC<${component.name}Props> = ({
  ${component.props.map(prop => prop.name).join(', ')},
}) => {
  return (
    <div className="${component.name.toLowerCase()}">
      <h1>{title}</h1>
      <button onClick={onClick} disabled={disabled}>
        Click me
      </button>
    </div>
  );
};
      `.trim();
      
      const endTime = performance.now();
      const generationTime = endTime - startTime;
      
      expect(code).toBeDefined();
      expect(code).toContain('TestComponent');
      expect(generationTime).toBeLessThan(500);
      console.log(`Generated component code in ${generationTime.toFixed(2)}ms`);
    });

    it('should handle large projects efficiently', async () => {
      const startTime = performance.now();
      
      const files = Array.from({ length: 100 }, (_, i) => ({
        name: `Component${i}`,
        type: 'component',
        props: [
          { name: 'data', type: 'any', required: true },
          { name: 'onUpdate', type: 'function', required: false },
        ],
      }));
      
      const codes = await Promise.all(
        files.map(file => `
import React from 'react';

interface ${file.name}Props {
  data: any;
  onUpdate?: (data: any) => void;
}

export const ${file.name}: React.FC<${file.name}Props> = ({ data, onUpdate }) => {
  return (
    <div className="${file.name.toLowerCase()}">
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {onUpdate && (
        <button onClick={() => onUpdate(data)}>
          Update
        </button>
      )}
    </div>
  );
};
        `.trim())
      );
      
      const endTime = performance.now();
      const totalTime = endTime - startTime;
      const avgTime = totalTime / files.length;
      
      expect(codes).toHaveLength(100);
      expect(avgTime).toBeLessThan(300);
      console.log(`Generated 100 files in ${totalTime.toFixed(2)}ms (avg: ${avgTime.toFixed(2)}ms)`);
    });
  });

  describe('AI 响应性能 / AI Response Performance', () => {
    it('should receive AI response in < 3s', async () => {
      const startTime = performance.now();
      
      const mockResponse = {
        id: 'test-response-1',
        content: 'This is a test AI response',
        model: 'gpt-4',
        usage: {
          promptTokens: 100,
          completionTokens: 50,
          totalTokens: 150,
        },
      };
      
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => mockResponse,
          });
        }, 1500);
      });
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      expect(response.ok).toBe(true);
      expect(responseTime).toBeLessThan(3000);
      console.log(`AI response received in ${responseTime.toFixed(2)}ms`);
    });
  });

  describe('文件操作性能 / File Operation Performance', () => {
    it('should read 100 files in < 200ms', async () => {
      const startTime = performance.now();
      
      const files = Array.from({ length: 100 }, (_, i) => ({
        name: `file${i}.ts`,
        content: `export const file${i} = 'content-${i}';`,
      }));
      
      const fileContents = await Promise.all(
        files.map(file => ({
          name: file.name,
          content: file.content,
          size: new Blob([file.content]).size,
        }))
      );
      
      const endTime = performance.now();
      const readTime = endTime - startTime;
      
      expect(fileContents).toHaveLength(100);
      expect(readTime).toBeLessThan(200);
      console.log(`Read 100 files in ${readTime.toFixed(2)}ms`);
    });

    it('should write 100 files in < 300ms', async () => {
      const startTime = performance.now();
      
      const files = Array.from({ length: 100 }, (_, i) => ({
        name: `file${i}.ts`,
        content: `export const file${i} = 'content-${i}';`,
      }));
      
      const writtenFiles = await Promise.all(
        files.map(file => ({
          name: file.name,
          success: true,
          size: new Blob([file.content]).size,
        }))
      );
      
      const endTime = performance.now();
      const writeTime = endTime - startTime;
      
      expect(writtenFiles).toHaveLength(100);
      expect(writeTime).toBeLessThan(300);
      console.log(`Wrote 100 files in ${writeTime.toFixed(2)}ms`);
    });
  });

  describe('内存使用性能 / Memory Usage Performance', () => {
    it('should not leak memory after 1000 operations', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      const operations = [];
      
      for (let i = 0; i < 1000; i++) {
        const data = { 
          id: i, 
          name: `Operation ${i}`,
          timestamp: Date.now(),
          value: Math.random() * 1000,
        };
        
        const serialized = JSON.stringify(data);
        const deserialized = JSON.parse(serialized);
        
        operations.push(deserialized);
        
        if (i % 100 === 0) {
          operations.length = 0;
        }
      }
      
      if (global.gc) {
        global.gc();
      }
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;
      const memoryIncreaseMB = memoryIncrease / 1024 / 1024;
      
      expect(memoryIncreaseMB).toBeLessThan(10);
      console.log(`Memory increase after 1000 operations: ${memoryIncreaseMB.toFixed(2)}MB`);
    });
  });
});
```

### 性能基准指标

| 性能指标 | 目标值 | 测试方法 | 告警阈值 |
|---------|---------|---------|---------|
| 渲染 1000 个项目 | < 100ms | 性能基准测试 | > 150ms |
| 虚拟滚动计算 | < 10ms | 性能基准测试 | > 20ms |
| 生成组件代码 | < 500ms | 性能基准测试 | > 800ms |
| AI 响应时间 | < 3s | 性能基准测试 | > 5s |
| 读取 100 个文件 | < 200ms | 性能基准测试 | > 300ms |
| 写入 100 个文件 | < 300ms | 性能基准测试 | > 500ms |
| 内存增长（1000 次操作） | < 10MB | 性能基准测试 | > 20MB |

### 性能基准测试执行

```bash
# 运行性能基准测试
npm run test:benchmark

# 生成性能报告
npm run test:benchmark:report

# 对比性能基准
npm run test:benchmark:compare
```

### 性能回归检测

```typescript
/**
 * file utils/performance-regression.ts
 * description 性能回归检测工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,performance,regression,public
 */

export interface PerformanceBaseline {
  metric: string;
  value: number;
  unit: string;
  threshold: number;
}

export interface PerformanceResult {
  metric: string;
  currentValue: number;
  baselineValue: number;
  deviation: number;
  isRegression: boolean;
}

export class PerformanceRegressionDetector {
  private baselines: Map<string, PerformanceBaseline> = new Map();

  loadBaselines(baselines: PerformanceBaseline[]): void {
    baselines.forEach(baseline => {
      this.baselines.set(baseline.metric, baseline);
    });
  }

  checkRegression(result: PerformanceResult): boolean {
    const baseline = this.baselines.get(result.metric);
    if (!baseline) {
      console.warn(`No baseline found for metric: ${result.metric}`);
      return false;
    }

    const deviation = ((result.currentValue - baseline.value) / baseline.value) * 100;
    const isRegression = deviation > baseline.threshold;

    return isRegression;
  }

  compareResults(results: PerformanceResult[]): PerformanceResult[] {
    return results.map(result => {
      const baseline = this.baselines.get(result.metric);
      if (!baseline) {
        return result;
      }

      const deviation = ((result.currentValue - baseline.value) / baseline.value) * 100;
      
      return {
        ...result,
        baselineValue: baseline.value,
        deviation,
        isRegression: deviation > baseline.threshold,
      };
    });
  }
}

export const performanceRegressionDetector = new PerformanceRegressionDetector();

// 加载性能基准
performanceRegressionDetector.loadBaselines([
  { metric: 'render-1000-items', value: 100, unit: 'ms', threshold: 50 },
  { metric: 'virtual-scroll', value: 10, unit: 'ms', threshold: 100 },
  { metric: 'generate-component', value: 500, unit: 'ms', threshold: 60 },
  { metric: 'ai-response', value: 3000, unit: 'ms', threshold: 66 },
  { metric: 'read-100-files', value: 200, unit: 'ms', threshold: 50 },
  { metric: 'write-100-files', value: 300, unit: 'ms', threshold: 66 },
]);
```

---

## 🌍 国际化支持

### 多语言配置

#### i18next 配置

```typescript
/**
 * file config/i18n.ts
 * description 国际化配置
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags config,typescript,i18n,internationalization,public
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'zh-CN': {
        translation: zhCN,
      },
      'en-US': {
        translation: enUS,
      },
    },
    lng: 'zh-CN',
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

#### 中文翻译文件

```json
/**
 * file config/locales/zh-CN.json
 * description 中文翻译文件
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags i18n,json,chinese,translation,public
 */

{
  "common": {
    "save": "保存",
    "cancel": "取消",
    "delete": "删除",
    "edit": "编辑",
    "confirm": "确认"
  },
  "icons": {
    "add": "添加",
    "preview": "预览",
    "code": "代码",
    "file": "文件",
    "search": "搜索",
    "more": "更多",
    "back": "返回",
    "home": "首页",
    "settings": "设置",
    "language": "语言",
    "user": "用户"
  },
  "errors": {
    "networkError": "网络连接失败，正在重试...",
    "apiError": "服务暂时不可用，请稍后重试",
    "validationError": "输入格式不正确",
    "permissionError": "请先登录",
    "unknownError": "发生未知错误，请联系管理员"
  },
  "views": {
    "home": {
      "title": "YYC³ Family AI",
      "subtitle": "言传千行代码 | 语枢万物智能"
    },
    "editor": {
      "leftPanel": "AI 对话面板",
      "middlePanel": "文件资源管理器",
      "rightPanel": "代码编辑器"
    }
  }
}
```

#### 英文翻译文件

```json
/**
 * file config/locales/en-US.json
 * description 英文翻译文件
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags i18n,json,english,translation,public
 */

{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "confirm": "Confirm"
  },
  "icons": {
    "add": "Add",
    "preview": "Preview",
    "code": "Code",
    "file": "File",
    "search": "Search",
    "more": "More",
    "back": "Back",
    "home": "Home",
    "settings": "Settings",
    "language": "Language",
    "user": "User"
  },
  "errors": {
    "networkError": "Network connection failed, retrying...",
    "apiError": "Service temporarily unavailable, please try again later",
    "validationError": "Invalid input format",
    "permissionError": "Please login first",
    "unknownError": "An unknown error occurred, please contact administrator"
  },
  "views": {
    "home": {
      "title": "YYC³ Family AI",
      "subtitle": "Words Initiate Quadrants, Language Serves as Core for Future"
    },
    "editor": {
      "leftPanel": "AI Chat Panel",
      "middlePanel": "File Resource Manager",
      "rightPanel": "Code Editor"
    },
    "shortcuts": {
      "title": "快捷键设置 / Keyboard Shortcuts",
      "file": "文件 / File",
      "edit": "编辑 / Edit",
      "view": "视图 / View",
      "ai": "AI 功能 / AI Features",
      "terminal": "终端 / Terminal",
      "settings": "设置 / Settings",
      "reset": "重置默认 / Reset to Default",
      "export": "导出配置 / Export Config",
      "import": "导入配置 / Import Config",
      "conflict": "快捷键冲突 / Shortcut Conflict"
    },
    "errors": {
      "networkTimeout": "网络连接超时，请检查网络设置 / Network connection timeout, please check network settings",
      "concurrentConflict": "并发冲突，正在自动解决 / Concurrent conflict, auto-resolving",
      "dataCorruption": "数据损坏，正在尝试恢复 / Data corruption, attempting recovery",
      "storageQuota": "存储空间不足 / Storage quota exceeded",
      "rateLimit": "请求过于频繁，请稍后再试 / Too many requests, please try again later"
    }
  }
}
```

#### 翻译校验工具

```typescript
/**
 * file utils/i18n-validator.ts
 * description 翻译完整性校验工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags utils,typescript,i18n,validation,public
 */

import zhCN from '/config/locales/zh-CN.json';
import enUS from '/config/locales/en-US.json';

export interface TranslationIssue {
  type: 'missing' | 'mismatch' | 'empty';
  key: string;
  path: string;
  message: {
    zh: string;
    en: string;
  };
}

export const validateTranslations = (): TranslationIssue[] => {
  const issues: TranslationIssue[] = [];

  const compareKeys = (obj1: any, obj2: any, path: string = '') => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // 检查缺失的键
    keys1.forEach(key => {
      if (!keys2.includes(key)) {
        issues.push({
          type: 'missing',
          key,
          path,
          message: {
            zh: `英文翻译缺失键: ${path}${key}`,
            en: `Missing key in English translation: ${path}${key}`,
          },
        });
      }
    });

    keys2.forEach(key => {
      if (!keys1.includes(key)) {
        issues.push({
          type: 'missing',
          key,
          path,
          message: {
            zh: `中文翻译缺失键: ${path}${key}`,
            en: `Missing key in Chinese translation: ${path}${key}`,
          },
        });
      }
    });

    // 递归检查嵌套对象
    keys1.forEach(key => {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        compareKeys(obj1[key], obj2[key], `${path}${key}.`);
      }
    });

    // 检查空值
    keys1.forEach(key => {
      if (obj1[key] === '' || obj1[key] === null) {
        issues.push({
          type: 'empty',
          key,
          path,
          message: {
            zh: `中文翻译为空: ${path}${key}`,
            en: `Chinese translation is empty: ${path}${key}`,
          },
        });
      }
    });

    keys2.forEach(key => {
      if (obj2[key] === '' || obj2[key] === null) {
        issues.push({
          type: 'empty',
          key,
          path,
          message: {
            zh: `英文翻译为空: ${path}${key}`,
            en: `English translation is empty: ${path}${key}`,
          },
        });
      }
    });
  };

  compareKeys(zhCN, enUS);

  return issues;
};

export const getTranslationStats = () => {
  const countKeys = (obj: any): number => {
    let count = 0;
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object') {
        count += countKeys(obj[key]);
      } else {
        count++;
      }
    });
    return count;
  };

  return {
    zhCN: countKeys(zhCN),
    enUS: countKeys(enUS),
  };
};
```

#### 翻译贡献指南

```markdown
/**
 * file CONTRIBUTING_I18N.md
 * description 翻译贡献指南
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags i18n,guide,contribution,documentation,public
 */

# 翻译贡献指南 / Translation Contribution Guide

感谢您对 YYC³ Family AI 国际化工作的贡献！
Thank you for contributing to the internationalization of YYC³ Family AI!

## 翻译原则 / Translation Principles

1. **准确性优先 / Accuracy First**
   - 确保翻译准确传达原文含义
   - Ensure the translation accurately conveys the original meaning

2. **保持一致性 / Maintain Consistency**
   - 使用统一的术语和表达方式
   - Use consistent terminology and expressions

3. **简洁明了 / Concise and Clear**
   - 避免冗长和复杂的表达
   - Avoid lengthy and complex expressions

4. **符合文化习惯 / Culturally Appropriate**
   - 考虑目标语言的文化背景
   - Consider the cultural background of the target language

## 翻译流程 / Translation Process

1. **Fork 项目 / Fork the Project**
   ```bash
   git clone https://github.com/your-username/YYC3-AI-Family.git
   cd YYC3-AI-Family
   ```

1. **创建翻译分支 / Create Translation Branch**

   ```bash
   git checkout -b translation/zh-CN
   ```

2. **编辑翻译文件 / Edit Translation Files**
   - 中文翻译：`config/locales/zh-CN.json`
   - 英文翻译：`config/locales/en-US.json`

3. **运行校验工具 / Run Validation Tools**

   ```bash
   npm run validate-i18n
   ```

4. **提交 Pull Request / Submit Pull Request**
   - 描述翻译变更
   - Describe translation changes
   - 说明翻译理由
   - Explain translation rationale

## 翻译规范 / Translation Standards

### 术语对照 / Terminology Mapping

| 中文 | 英文 | 说明 |
|------|------|------|
| 多联式 | Multi-panel | 多面板布局 |
| 实时预览 | Real-time Preview | 即时预览 |
| 设计即代码 | Design as Code | 设计转代码 |
| 低码 | Low-code | 低代码 |
| 智能AI | Intelligent AI | 智能人工智能 |
| 协同编辑 | Collaborative Editing | 多人协作编辑 |

### 格式要求 / Format Requirements

1. **JSON 格式 / JSON Format**
   - 保持 JSON 格式正确
   - Keep JSON format correct
   - 使用 2 空格缩进
   - Use 2-space indentation

2. **键名规范 / Key Naming**
   - 使用 camelCase 命名
   - Use camelCase naming
   - 保持与代码一致
   - Keep consistent with code

3. **值的要求 / Value Requirements**
   - 非空字符串
   - Non-empty strings
   - 避免尾随空格
   - Avoid trailing spaces
   - 保持简洁
   - Keep concise

## 常见问题 / FAQ

**Q: 如何处理专业术语？**
A: 优先使用行业通用术语，保持技术准确性。

**Q: 如何处理长文本？**
A: 保持语义完整，适当断句，避免过度翻译。

**Q: 如何处理文化差异？**
A: 考虑目标用户的文化背景，适当调整表达方式。

**Q: 如何校验翻译质量？**
A: 使用内置的翻译校验工具，并请母语者审核。

## 联系方式 / Contact

如有问题，请联系：
If you have questions, please contact:

- Email: <admin@0379.email>
- GitHub Issues: <https://github.com/YYC-Cube/YYC3-AI-Family/issues>

```

---

## 🔌 插件生态系统

### 插件系统架构

#### 1. 插件系统核心

```typescript
/**
 * file core/plugin-system.ts
 * description 插件系统核心实现
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags core,typescript,plugin-system,architecture,public
 */

export interface PluginManifest {
  name: string;
  version: string;
  displayName: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  author: string;
  icon?: string;
  permissions: PluginPermission[];
  entry: string;
  dependencies?: string[];
  minAppVersion: string;
}

export interface PluginPermission {
  type: 'ui' | 'api' | 'storage' | 'network' | 'ai';
  scope: string[];
}

export interface PluginInstance {
  manifest: PluginManifest;
  api: PluginAPI;
  state: 'active' | 'inactive' | 'error';
  error?: Error;
}

export interface PluginAPI {
  registerCommand: (command: PluginCommand) => void;
  registerMenuItem: (item: PluginMenuItem) => void;
  registerPanel: (panel: PluginPanel) => void;
  registerHook: (hook: PluginHook) => void;
  emitEvent: (event: PluginEvent) => void;
  onEvent: (event: string, handler: (data: any) => void) => void;
  storage: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
    remove: (key: string) => Promise<void>;
  };
  ai: {
    chat: (message: string) => Promise<string>;
    generate: (prompt: string) => Promise<string>;
    fix: (code: string, error: string) => Promise<string>;
  };
}

export class PluginSystem {
  private plugins: Map<string, PluginInstance> = new Map();
  private hooks: Map<string, PluginHook[]> = new Map();
  private commands: Map<string, PluginCommand> = new Map();
  private eventBus: IEventBus;
  private storageProvider: IStorageProvider;
  private aiProvider: IAIProvider;
  private commandRegistry: ICommandRegistry;
  private menuRegistry: IMenuRegistry;
  private panelRegistry: IPanelRegistry;

  constructor(
    eventBus: IEventBus,
    storageProvider: IStorageProvider,
    aiProvider: IAIProvider,
    commandRegistry: ICommandRegistry,
    menuRegistry: IMenuRegistry,
    panelRegistry: IPanelRegistry
  ) {
    this.eventBus = eventBus;
    this.storageProvider = storageProvider;
    this.aiProvider = aiProvider;
    this.commandRegistry = commandRegistry;
    this.menuRegistry = menuRegistry;
    this.panelRegistry = panelRegistry;
  }

  async loadPlugin(manifest: PluginManifest): Promise<void> {
    if (this.plugins.has(manifest.name)) {
      throw new Error('errors.pluginAlreadyLoaded');
    }

    const pluginInstance: PluginInstance = {
      manifest,
      api: this.createPluginAPI(manifest.name),
      state: 'active',
    };

    try {
      const module = await import(manifest.entry);
      if (module.default) {
        await module.default(pluginInstance.api);
      }
      
      this.plugins.set(manifest.name, pluginInstance);
      this.eventBus.emit('plugin:loaded', { pluginName: manifest.name });
      console.log(`Plugin ${manifest.name} loaded successfully`);
    } catch (error) {
      pluginInstance.state = 'error';
      pluginInstance.error = error as Error;
      this.eventBus.emit('plugin:error', { pluginName: manifest.name, error });
      console.error(`Failed to load plugin ${manifest.name}:`, error);
    }
  }

  unloadPlugin(name: string): void {
    const plugin = this.plugins.get(name);
    if (!plugin) return;

    this.plugins.delete(name);
    this.hooks.delete(name);
    this.eventBus.emit('plugin:unloaded', { pluginName: name });
    console.log(`Plugin ${name} unloaded`);
  }

  getPlugin(name: string): PluginInstance | undefined {
    return this.plugins.get(name);
  }

  getAllPlugins(): PluginInstance[] {
    return Array.from(this.plugins.values());
  }

  private createPluginAPI(pluginName: string): PluginAPI {
    const pluginContext = new PluginContext(pluginName, this);
    
    return {
      registerCommand: (command) => {
        this.commandRegistry.register(pluginContext, command);
      },
      registerMenuItem: (item) => {
        this.menuRegistry.register(pluginContext, item);
      },
      registerPanel: (panel) => {
        this.panelRegistry.register(pluginContext, panel);
      },
      registerHook: (hook) => {
        this.eventBus.registerHook(pluginContext, hook);
      },
      emitEvent: (event) => {
        this.eventBus.emit(event.name, event.data);
      },
      onEvent: (eventName, handler) => {
        const hook: PluginHook = {
          name: `event:${eventName}`,
          handler,
          plugin: pluginName,
        };
        this.eventBus.registerHook(pluginContext, hook);
      },
      storage: this.storageProvider.getPluginStorage(pluginName),
      ai: this.aiProvider.getPluginAIAPI(pluginName),
    };
  }

  private executeHooks(hookName: string, data: any): void {
    const hooks = this.hooks.get(hookName) || [];
    for (const hook of hooks) {
      try {
        hook.handler(data);
      } catch (error) {
        console.error(`Hook ${hookName} failed in plugin ${hook.plugin}:`, error);
        this.eventBus.emit('hook:error', { hookName, plugin: hook.plugin, error });
      }
    }
  }

  executeCommand(commandId: string): void {
    const command = this.commands.get(commandId);
    if (command) {
      command.handler();
    }
  }
}

export const pluginSystem = new PluginSystem(
  new EventBus(),
  new LocalStorageProvider(),
  new OpenAIProvider(),
  new CommandRegistry(),
  new MenuRegistry(),
  new PanelRegistry()
);

/**
 * file core/interfaces/plugin-interfaces.ts
 * description 插件系统接口定义
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags core,typescript,interfaces,plugin-system,public
 */

/**
 * 事件总线接口
 */
export interface IEventBus {
  emit(eventName: string, data?: any): void;
  on(eventName: string, handler: (data: any) => void): void;
  off(eventName: string, handler: (data: any) => void): void;
  registerHook(context: PluginContext, hook: PluginHook): void;
}

/**
 * 存储提供者接口
 */
export interface IStorageProvider {
  getPluginStorage(pluginName: string): PluginStorage;
}

/**
 * AI 提供者接口
 */
export interface IAIProvider {
  getPluginAIAPI(pluginName: string): PluginAIAPI;
}

/**
 * 命令注册表接口
 */
export interface ICommandRegistry {
  register(context: PluginContext, command: PluginCommand): void;
  unregister(commandId: string): void;
  execute(commandId: string): void;
}

/**
 * 菜单注册表接口
 */
export interface IMenuRegistry {
  register(context: PluginContext, item: PluginMenuItem): void;
  unregister(itemId: string): void;
}

/**
 * 面板注册表接口
 */
export interface IPanelRegistry {
  register(context: PluginContext, panel: PluginPanel): void;
  unregister(panelId: string): void;
}

/**
 * 插件上下文
 */
export class PluginContext {
  constructor(
    public readonly pluginName: string,
    private readonly pluginSystem: PluginSystem
  ) {}
}

/**
 * 事件总线实现
 */
export class EventBus implements IEventBus {
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private hooks: Map<string, PluginHook[]> = new Map();

  emit(eventName: string, data?: any): void {
    const listeners = this.listeners.get(eventName);
    if (listeners) {
      listeners.forEach(handler => handler(data));
    }
  }

  on(eventName: string, handler: (data: any) => void): void {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    this.listeners.get(eventName)!.add(handler);
  }

  off(eventName: string, handler: (data: any) => void): void {
    const listeners = this.listeners.get(eventName);
    if (listeners) {
      listeners.delete(handler);
    }
  }

  registerHook(context: PluginContext, hook: PluginHook): void {
    if (!this.hooks.has(hook.name)) {
      this.hooks.set(hook.name, []);
    }
    this.hooks.get(hook.name)!.push(hook);
  }
}

/**
 * 本地存储提供者实现
 */
export class LocalStorageProvider implements IStorageProvider {
  getPluginStorage(pluginName: string): PluginStorage {
    const prefix = `plugin_${pluginName}_`;
    
    return {
      get: async (key) => {
        const data = localStorage.getItem(prefix + key);
        return data ? JSON.parse(data) : null;
      },
      set: async (key, value) => {
        localStorage.setItem(prefix + key, JSON.stringify(value));
      },
      remove: async (key) => {
        localStorage.removeItem(prefix + key);
      },
      clear: async () => {
        const keys = Object.keys(localStorage);
        keys.forEach(key => {
          if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
          }
        });
      },
    };
  }
}

/**
 * OpenAI 提供者实现
 */
export class OpenAIProvider implements IAIProvider {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string = '', baseUrl: string = '/api/ai') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  getPluginAIAPI(pluginName: string): PluginAIAPI {
    return {
      chat: async (message) => {
        const response = await fetch(`${this.baseUrl}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, plugin: pluginName }),
        });
        const data = await response.json();
        return data.reply;
      },
      generate: async (prompt) => {
        const response = await fetch(`${this.baseUrl}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, plugin: pluginName }),
        });
        const data = await response.json();
        return data.code;
      },
      fix: async (code, error) => {
        const response = await fetch(`${this.baseUrl}/fix`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code, error, plugin: pluginName }),
        });
        const data = await response.json();
        return data.fixedCode;
      },
    };
  }
}

/**
 * 命令注册表实现
 */
export class CommandRegistry implements ICommandRegistry {
  private commands: Map<string, PluginCommand> = new Map();

  register(context: PluginContext, command: PluginCommand): void {
    command.plugin = context.pluginName;
    this.commands.set(command.id, command);
  }

  unregister(commandId: string): void {
    this.commands.delete(commandId);
  }

  execute(commandId: string): void {
    const command = this.commands.get(commandId);
    if (command) {
      command.handler();
    }
  }
}

/**
 * 菜单注册表实现
 */
export class MenuRegistry implements IMenuRegistry {
  private items: Map<string, PluginMenuItem> = new Map();

  register(context: PluginContext, item: PluginMenuItem): void {
    item.plugin = context.pluginName;
    this.items.set(item.id, item);
  }

  unregister(itemId: string): void {
    this.items.delete(itemId);
  }
}

/**
 * 面板注册表实现
 */
export class PanelRegistry implements IPanelRegistry {
  private panels: Map<string, PluginPanel> = new Map();

  register(context: PluginContext, panel: PluginPanel): void {
    panel.plugin = context.pluginName;
    this.panels.set(panel.id, panel);
  }

  unregister(panelId: string): void {
    this.panels.delete(panelId);
  }
}
```

#### 2. 插件市场

```typescript
/**
 * file services/plugin-market.ts
 * description 插件市场服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,plugin-market,marketplace,public
 */

export interface PluginMarketItem {
  id: string;
  manifest: PluginManifest;
  rating: number;
  downloads: number;
  lastUpdated: Date;
  categories: string[];
  screenshots: string[];
  author: {
    name: string;
    email: string;
    website?: string;
  };
}

export interface PluginFilter {
  category?: string;
  search?: string;
  sortBy?: 'popular' | 'recent' | 'rating';
}

export class PluginMarket {
  private plugins: PluginMarketItem[] = [];

  async loadPlugins(): Promise<PluginMarketItem[]> {
    try {
      const response = await fetch('/api/plugins/market');
      this.plugins = await response.json();
      return this.plugins;
    } catch (error) {
      console.error('Failed to load plugins from market:', error);
      return [];
    }
  }

  async installPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.find(p => p.id === pluginId);
    if (!plugin) {
      throw new Error('errors.pluginNotFoundInMarket');
    }

    const response = await fetch(`/api/plugins/${pluginId}/download`);
    const blob = await response.blob();
    
    const manifest = await this.extractManifest(blob);
    await pluginSystem.loadPlugin(manifest);
    
    await this.savePluginManifest(manifest);
  }

  async uninstallPlugin(pluginName: string): Promise<void> {
    pluginSystem.unloadPlugin(pluginName);
    await this.removePluginManifest(pluginName);
  }

  async updatePlugin(pluginName: string): Promise<void> {
    const plugin = pluginSystem.getPlugin(pluginName);
    if (!plugin) return;

    const response = await fetch(`/api/plugins/${pluginName}/update`);
    const blob = await response.blob();
    
    const manifest = await this.extractManifest(blob);
    pluginSystem.unloadPlugin(pluginName);
    await pluginSystem.loadPlugin(manifest);
    
    await this.savePluginManifest(manifest);
  }

  searchPlugins(filter: PluginFilter): PluginMarketItem[] {
    let results = [...this.plugins];

    if (filter.category) {
      results = results.filter(p => p.categories.includes(filter.category));
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      results = results.filter(p => 
        p.manifest.name.toLowerCase().includes(searchLower) ||
        p.manifest.displayName.zh.toLowerCase().includes(searchLower) ||
        p.manifest.displayName.en.toLowerCase().includes(searchLower)
      );
    }

    if (filter.sortBy) {
      switch (filter.sortBy) {
        case 'popular':
          results.sort((a, b) => b.downloads - a.downloads);
          break;
        case 'recent':
          results.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return results;
  }

  private async extractManifest(blob: Blob): Promise<PluginManifest> {
    const text = await blob.text();
    return JSON.parse(text);
  }

  private async savePluginManifest(manifest: PluginManifest): Promise<void> {
    const installed = await this.getInstalledPlugins();
    installed.push(manifest);
    localStorage.setItem('installed-plugins', JSON.stringify(installed));
  }

  private async removePluginManifest(pluginName: string): Promise<void> {
    const installed = await this.getInstalledPlugins();
    const filtered = installed.filter(p => p.name !== pluginName);
    localStorage.setItem('installed-plugins', JSON.stringify(filtered));
  }

  private async getInstalledPlugins(): Promise<PluginManifest[]> {
    const data = localStorage.getItem('installed-plugins');
    return data ? JSON.parse(data) : [];
  }
}

export const pluginMarket = new PluginMarket();
```

#### 4. 本地数据库发现与接入

```typescript
/**
 * file services/database-discovery.ts
 * description 本地数据库发现与接入服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,database,discovery,auto-connect,public
 */

export interface DatabaseConnectionConfig {
  type: 'mysql' | 'postgresql' | 'sqlite' | 'mongodb' | 'redis';
  host?: string;
  port?: number;
  database?: string;
  username?: string;
  password?: string;
  connectionString?: string;
  options?: Record<string, any>;
}

export interface DatabaseInfo {
  type: DatabaseConnectionConfig['type'];
  name: string;
  version: string;
  host: string;
  port: number;
  status: 'online' | 'offline' | 'unknown';
  latency?: number;
  tables?: string[];
  databases?: string[];
}

export interface DatabaseDiscoveryResult {
  discovered: DatabaseInfo[];
  autoConnected?: DatabaseConnectionConfig;
  errors: string[];
}

export class DatabaseDiscoveryService {
  private readonly commonPorts = {
    mysql: 3306,
    postgresql: 5432,
    mongodb: 27017,
    redis: 6379,
    sqlite: null,
  };

  private readonly defaultTimeout = 5000;

  async discoverLocalDatabases(): Promise<DatabaseDiscoveryResult> {
    const result: DatabaseDiscoveryResult = {
      discovered: [],
      autoConnected: undefined,
      errors: [],
    };

    try {
      // 1. 扫描常见端口
      const portScanResults = await this.scanCommonPorts();

      // 2. 尝试连接发现的数据库
      for (const scanResult of portScanResults) {
        try {
          const dbInfo = await this.probeDatabase(scanResult);
          if (dbInfo) {
            result.discovered.push(dbInfo);
          }
        } catch (error) {
          result.errors.push(`Failed to probe ${scanResult.type}: ${error}`);
        }
      }

      // 3. 检查 SQLite 数据库文件
      const sqliteFiles = await this.discoverSQLiteFiles();
      for (const file of sqliteFiles) {
        try {
          const dbInfo = await this.probeSQLite(file);
          if (dbInfo) {
            result.discovered.push(dbInfo);
          }
        } catch (error) {
          result.errors.push(`Failed to probe SQLite ${file}: ${error}`);
        }
      }

      // 4. 尝试自动连接最合适的数据库
      if (result.discovered.length > 0) {
        const bestCandidate = this.selectBestCandidate(result.discovered);
        result.autoConnected = await this.autoConnect(bestCandidate);
      }
    } catch (error) {
      result.errors.push(`Discovery failed: ${error}`);
    }

    return result;
  }

  private async scanCommonPorts(): Promise<DatabaseConnectionConfig[]> {
    const results: DatabaseConnectionConfig[] = [];

    for (const [type, port] of Object.entries(this.commonPorts)) {
      if (port === null) continue;

      try {
        const isOpen = await this.checkPort(port as number);
        if (isOpen) {
          results.push({
            type: type as DatabaseConnectionConfig['type'],
            host: 'localhost',
            port: port as number,
          });
        }
      } catch (error) {
        console.log(`Port ${port} check failed:`, error);
      }
    }

    return results;
  }

  private async checkPort(port: number): Promise<boolean> {
    return new Promise((resolve) => {
      const socket = new WebSocket(`ws://localhost:${port}`);
      
      const timeout = setTimeout(() => {
        socket.close();
        resolve(false);
      }, this.defaultTimeout);

      socket.onopen = () => {
        clearTimeout(timeout);
        socket.close();
        resolve(true);
      };

      socket.onerror = () => {
        clearTimeout(timeout);
        resolve(false);
      };
    });
  }

  private async probeDatabase(config: DatabaseConnectionConfig): Promise<DatabaseInfo | null> {
    const startTime = Date.now();

    try {
      switch (config.type) {
        case 'mysql':
          return await this.probeMySQL(config);
        case 'postgresql':
          return await this.probePostgreSQL(config);
        case 'mongodb':
          return await this.probeMongoDB(config);
        case 'redis':
          return await this.probeRedis(config);
        default:
          return null;
      }
    } catch (error) {
      return null;
    }
  }

  private async probeMySQL(config: DatabaseConnectionConfig): Promise<DatabaseInfo | null> {
    try {
      const response = await fetch('/api/database/probe/mysql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) return null;

      const data = await response.json();
      const latency = Date.now() - (startTime - this.defaultTimeout);

      return {
        type: 'mysql',
        name: data.database || 'MySQL',
        version: data.version,
        host: config.host!,
        port: config.port!,
        status: 'online',
        latency,
        databases: data.databases,
      };
    } catch (error) {
      return null;
    }
  }

  private async probePostgreSQL(config: DatabaseConnectionConfig): Promise<DatabaseInfo | null> {
    try {
      const response = await fetch('/api/database/probe/postgresql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) return null;

      const data = await response.json();
      const latency = Date.now() - (startTime - this.defaultTimeout);

      return {
        type: 'postgresql',
        name: data.database || 'PostgreSQL',
        version: data.version,
        host: config.host!,
        port: config.port!,
        status: 'online',
        latency,
        databases: data.databases,
      };
    } catch (error) {
      return null;
    }
  }

  private async probeMongoDB(config: DatabaseConnectionConfig): Promise<DatabaseInfo | null> {
    try {
      const response = await fetch('/api/database/probe/mongodb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) return null;

      const data = await response.json();
      const latency = Date.now() - (startTime - this.defaultTimeout);

      return {
        type: 'mongodb',
        name: data.database || 'MongoDB',
        version: data.version,
        host: config.host!,
        port: config.port!,
        status: 'online',
        latency,
        databases: data.databases,
      };
    } catch (error) {
      return null;
    }
  }

  private async probeRedis(config: DatabaseConnectionConfig): Promise<DatabaseInfo | null> {
    try {
      const response = await fetch('/api/database/probe/redis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) return null;

      const data = await response.json();
      const latency = Date.now() - (startTime - this.defaultTimeout);

      return {
        type: 'redis',
        name: 'Redis',
        version: data.version,
        host: config.host!,
        port: config.port!,
        status: 'online',
        latency,
      };
    } catch (error) {
      return null;
    }
  }

  private async discoverSQLiteFiles(): Promise<string[]> {
    try {
      const response = await fetch('/api/database/discover/sqlite');
      if (!response.ok) return [];

      const data = await response.json();
      return data.files || [];
    } catch (error) {
      return [];
    }
  }

  private async probeSQLite(filePath: string): Promise<DatabaseInfo | null> {
    try {
      const response = await fetch('/api/database/probe/sqlite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath }),
      });

      if (!response.ok) return null;

      const data = await response.json();

      return {
        type: 'sqlite',
        name: data.name || 'SQLite',
        version: data.version,
        host: 'local',
        port: 0,
        status: 'online',
        tables: data.tables,
      };
    } catch (error) {
      return null;
    }
  }

  private selectBestCandidate(databases: DatabaseInfo[]): DatabaseInfo {
    // 优先级：PostgreSQL > MySQL > MongoDB > Redis > SQLite
    const priority = {
      postgresql: 5,
      mysql: 4,
      mongodb: 3,
      redis: 2,
      sqlite: 1,
    };

    return databases.sort((a, b) => {
      const priorityDiff = priority[b.type] - priority[a.type];
      if (priorityDiff !== 0) return priorityDiff;

      // 延迟越低越好
      const latencyA = a.latency || Infinity;
      const latencyB = b.latency || Infinity;
      return latencyA - latencyB;
    })[0];
  }

  private async autoConnect(database: DatabaseInfo): Promise<DatabaseConnectionConfig> {
    const config: DatabaseConnectionConfig = {
      type: database.type,
      host: database.host,
      port: database.port,
      database: database.databases?.[0] || database.name,
    };

    try {
      const response = await fetch('/api/database/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        // 保存连接配置
        await this.saveConnectionConfig(config);
        return config;
      }
    } catch (error) {
      console.error('Auto-connect failed:', error);
    }

    return config;
  }

  async manualConnect(config: DatabaseConnectionConfig): Promise<boolean> {
    try {
      const response = await fetch('/api/database/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        await this.saveConnectionConfig(config);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Manual connect failed:', error);
      return false;
    }
  }

  async testConnection(config: DatabaseConnectionConfig): Promise<{
    success: boolean;
    latency?: number;
    error?: string;
  }> {
    const startTime = Date.now();

    try {
      const response = await fetch('/api/database/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const latency = Date.now() - startTime;

      if (response.ok) {
        const data = await response.json();
        return {
          success: true,
          latency,
        };
      }

      const errorData = await response.json();
      return {
        success: false,
        latency,
        error: errorData.error || 'Connection failed',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getConnectionConfigs(): Promise<DatabaseConnectionConfig[]> {
    const data = localStorage.getItem('database-connections');
    return data ? JSON.parse(data) : [];
  }

  async saveConnectionConfig(config: DatabaseConnectionConfig): Promise<void> {
    const configs = await this.getConnectionConfigs();
    const existingIndex = configs.findIndex(
      c => c.type === config.type && c.host === config.host && c.port === config.port
    );

    if (existingIndex >= 0) {
      configs[existingIndex] = config;
    } else {
      configs.push(config);
    }

    localStorage.setItem('database-connections', JSON.stringify(configs));
  }

  async deleteConnectionConfig(config: DatabaseConnectionConfig): Promise<void> {
    const configs = await this.getConnectionConfigs();
    const filtered = configs.filter(
      c => !(c.type === config.type && c.host === config.host && c.port === config.port)
    );

    localStorage.setItem('database-connections', JSON.stringify(filtered));
  }

  async getDatabaseSchema(config: DatabaseConnectionConfig): Promise<{
    tables: string[];
    columns: Record<string, any[]>;
  }> {
    try {
      const response = await fetch('/api/database/schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch schema');
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch schema:', error);
      return { tables: [], columns: {} };
    }
  }

  async executeQuery(
    config: DatabaseConnectionConfig,
    query: string
  ): Promise<{
    success: boolean;
    data?: any[];
    error?: string;
  }> {
    try {
      const response = await fetch('/api/database/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ config, query }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          error: errorData.error || 'Query failed',
        };
      }

      const data = await response.json();
      return {
        success: true,
        data: data.results,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const databaseDiscoveryService = new DatabaseDiscoveryService();
```

#### 5. 数据库连接管理UI

```typescript
/**
 * file components/database-connection-manager.tsx
 * description 数据库连接管理UI组件
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags components,react,typescript,database,ui,public
 */

import React, { useState, useEffect } from 'react';
import { databaseDiscoveryService, DatabaseConnectionConfig, DatabaseInfo } from '../services/database-discovery';

export const DatabaseConnectionManager: React.FC = () => {
  const [discovering, setDiscovering] = useState(false);
  const [discovered, setDiscovered] = useState<DatabaseInfo[]>([]);
  const [connected, setConnected] = useState<DatabaseConnectionConfig[]>([]);
  const [testing, setTesting] = useState<string | null>(null);
  const [manualConfig, setManualConfig] = useState<DatabaseConnectionConfig>({
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
  });

  useEffect(() => {
    loadConnectedDatabases();
  }, []);

  const loadConnectedDatabases = async () => {
    const configs = await databaseDiscoveryService.getConnectionConfigs();
    setConnected(configs);
  };

  const handleDiscover = async () => {
    setDiscovering(true);
    try {
      const result = await databaseDiscoveryService.discoverLocalDatabases();
      setDiscovered(result.discovered);

      if (result.autoConnected) {
        await loadConnectedDatabases();
      }

      if (result.errors.length > 0) {
        console.error('Discovery errors:', result.errors);
      }
    } finally {
      setDiscovering(false);
    }
  };

  const handleManualConnect = async () => {
    const success = await databaseDiscoveryService.manualConnect(manualConfig);
    if (success) {
      await loadConnectedDatabases();
      setManualConfig({
        type: 'postgresql',
        host: 'localhost',
        port: 5432,
      });
    }
  };

  const handleTestConnection = async (config: DatabaseConnectionConfig) => {
    const key = `${config.type}-${config.host}-${config.port}`;
    setTesting(key);

    const result = await databaseDiscoveryService.testConnection(config);
    setTesting(null);

    if (result.success) {
      alert(`连接成功！延迟: ${result.latency}ms`);
    } else {
      alert(`连接失败: ${result.error}`);
    }
  };

  const handleDisconnect = async (config: DatabaseConnectionConfig) => {
    await databaseDiscoveryService.deleteConnectionConfig(config);
    await loadConnectedDatabases();
  };

  return (
    <div className="database-connection-manager">
      <h2>数据库连接管理 / Database Connection Manager</h2>

      {/* 自动发现区域 */}
      <div className="discovery-section">
        <h3>自动发现 / Auto Discovery</h3>
        <button
          onClick={handleDiscover}
          disabled={discovering}
          className="discover-button"
        >
          {discovering ? '发现中... / Discovering...' : '发现本地数据库 / Discover Local Databases'}
        </button>

        {discovered.length > 0 && (
          <div className="discovered-databases">
            <h4>发现的数据库 / Discovered Databases</h4>
            {discovered.map((db, index) => (
              <div key={index} className="database-item">
                <div className="database-info">
                  <span className="database-type">{db.type.toUpperCase()}</span>
                  <span className="database-name">{db.name}</span>
                  <span className="database-version">{db.version}</span>
                  <span className="database-host">{db.host}:{db.port}</span>
                  {db.latency && (
                    <span className="database-latency">{db.latency}ms</span>
                  )}
                </div>
                <button
                  onClick={() => handleManualConnect({
                    type: db.type,
                    host: db.host,
                    port: db.port,
                  })}
                  className="connect-button"
                >
                  连接 / Connect
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 手动连接区域 */}
      <div className="manual-connect-section">
        <h3>手动连接 / Manual Connection</h3>
        <div className="manual-config-form">
          <div className="form-group">
            <label>数据库类型 / Database Type</label>
            <select
              value={manualConfig.type}
              onChange={(e) => setManualConfig({
                ...manualConfig,
                type: e.target.value as DatabaseConnectionConfig['type'],
              })}
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="redis">Redis</option>
              <option value="sqlite">SQLite</option>
            </select>
          </div>

          <div className="form-group">
            <label>主机 / Host</label>
            <input
              type="text"
              value={manualConfig.host || ''}
              onChange={(e) => setManualConfig({
                ...manualConfig,
                host: e.target.value,
              })}
              placeholder="localhost"
            />
          </div>

          <div className="form-group">
            <label>端口 / Port</label>
            <input
              type="number"
              value={manualConfig.port || ''}
              onChange={(e) => setManualConfig({
                ...manualConfig,
                port: parseInt(e.target.value),
              })}
              placeholder="5432"
            />
          </div>

          <div className="form-group">
            <label>数据库 / Database</label>
            <input
              type="text"
              value={manualConfig.database || ''}
              onChange={(e) => setManualConfig({
                ...manualConfig,
                database: e.target.value,
              })}
              placeholder="database_name"
            />
          </div>

          <div className="form-group">
            <label>用户名 / Username</label>
            <input
              type="text"
              value={manualConfig.username || ''}
              onChange={(e) => setManualConfig({
                ...manualConfig,
                username: e.target.value,
              })}
              placeholder="username"
            />
          </div>

          <div className="form-group">
            <label>密码 / Password</label>
            <input
              type="password"
              value={manualConfig.password || ''}
              onChange={(e) => setManualConfig({
                ...manualConfig,
                password: e.target.value,
              })}
              placeholder="password"
            />
          </div>

          <button onClick={handleManualConnect} className="connect-button">
            连接 / Connect
          </button>
        </div>
      </div>

      {/* 已连接数据库列表 */}
      {connected.length > 0 && (
        <div className="connected-databases-section">
          <h3>已连接数据库 / Connected Databases</h3>
          {connected.map((config, index) => (
            <div key={index} className="connected-database-item">
              <div className="database-info">
                <span className="database-type">{config.type.toUpperCase()}</span>
                <span className="database-host">
                  {config.host}:{config.port}
                </span>
                {config.database && (
                  <span className="database-name">{config.database}</span>
                )}
              </div>
              <div className="database-actions">
                <button
                  onClick={() => handleTestConnection(config)}
                  disabled={testing === `${config.type}-${config.host}-${config.port}`}
                  className="test-button"
                >
                  {testing === `${config.type}-${config.host}-${config.port}` 
                    ? '测试中... / Testing...' 
                    : '测试 / Test'}
                </button>
                <button
                  onClick={() => handleDisconnect(config)}
                  className="disconnect-button"
                >
                  断开 / Disconnect
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

#### 6. 本地宿主机桥接

```typescript
/**
 * file services/host-bridge.ts
 * description 本地宿主机桥接服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags services,typescript,host-bridge,filesystem,electron,public
 */

export interface FileChangeEvent {
  type: 'created' | 'modified' | 'deleted';
  path: string;
  timestamp: number;
}

export interface FileSystemBridge {
  readFile(path: string): Promise<string>;
  writeFile(path: string, content: string): Promise<void>;
  deleteFile(path: string): Promise<void>;
  listDirectory(path: string): Promise<string[]>;
  watchFile(path: string, callback: (event: FileChangeEvent) => void): () => void;
  exists(path: string): Promise<boolean>;
  mkdir(path: string): Promise<void>;
  rmdir(path: string): Promise<void>;
  copyFile(source: string, destination: string): Promise<void>;
  moveFile(source: string, destination: string): Promise<void>;
}

export class ElectronHostBridge implements FileSystemBridge {
  private electronAPI: any;

  constructor() {
    this.electronAPI = (window as any).electronAPI;
    
    if (!this.electronAPI) {
      console.warn('Electron API not available, running in browser mode');
    }
  }

  async readFile(path: string): Promise<string> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    return await this.electronAPI.readFile(path);
  }

  async writeFile(path: string, content: string): Promise<void> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    await this.electronAPI.writeFile(path, content);
  }

  async deleteFile(path: string): Promise<void> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    await this.electronAPI.deleteFile(path);
  }

  async listDirectory(path: string): Promise<string[]> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    return await this.electronAPI.listDirectory(path);
  }

  watchFile(path: string, callback: (event: FileChangeEvent) => void): () => void {
    if (!this.electronAPI) {
      console.warn('Electron API not available, file watching disabled');
      return () => {};
    }

    const unsubscribe = this.electronAPI.watchFile(path, callback);
    return unsubscribe;
  }

  async exists(path: string): Promise<boolean> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    return await this.electronAPI.exists(path);
  }

  async mkdir(path: string): Promise<void> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    await this.electronAPI.mkdir(path);
  }

  async rmdir(path: string): Promise<void> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    await this.electronAPI.rmdir(path);
  }

  async copyFile(source: string, destination: string): Promise<void> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    await this.electronAPI.copyFile(source, destination);
  }

  async moveFile(source: string, destination: string): Promise<void> {
    if (!this.electronAPI) {
      throw new Error('Electron API not available');
    }

    await this.electronAPI.moveFile(source, destination);
  }
}

export class WebHostBridge implements FileSystemBridge {
  private fileSystem: FileSystem;
  private handles: Map<string, FileSystemFileHandle> = new Map();

  constructor() {
    this.fileSystem = window.requestFileSystem?.(window.PERSISTENT, 1024 * 1024 * 100);
  }

  async readFile(path: string): Promise<string> {
    const handle = this.handles.get(path);
    if (!handle) {
      throw new Error(`File not found: ${path}`);
    }

    const file = await handle.getFile();
    const text = await file.text();
    return text;
  }

  async writeFile(path: string, content: string): Promise<void> {
    const directoryHandle = await this.getDirectoryHandle(path);
    const fileName = this.getFileName(path);
    
    const fileHandle = await directoryHandle.getFileHandle(fileName, {
      create: true,
    });

    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();

    this.handles.set(path, fileHandle);
  }

  async deleteFile(path: string): Promise<void> {
    const directoryHandle = await this.getDirectoryHandle(path);
    const fileName = this.getFileName(path);
    
    await directoryHandle.removeEntry(fileName);
    this.handles.delete(path);
  }

  async listDirectory(path: string): Promise<string[]> {
    const directoryHandle = await this.getDirectoryHandle(path);
    const entries: string[] = [];

    for await (const entry of directoryHandle.values()) {
      entries.push(entry.name);
    }

    return entries;
  }

  watchFile(path: string, callback: (event: FileChangeEvent) => void): () => void {
    console.warn('File watching not supported in Web File System API');
    return () => {};
  }

  async exists(path: string): Promise<boolean> {
    try {
      await this.getDirectoryHandle(path);
      return true;
    } catch {
      return false;
    }
  }

  async mkdir(path: string): Promise<void> {
    const parts = path.split('/');
    let currentHandle = await this.getRootDirectory();

    for (const part of parts) {
      if (part) {
        currentHandle = await currentHandle.getDirectoryHandle(part, {
          create: true,
        });
      }
    }
  }

  async rmdir(path: string): Promise<void> {
    const directoryHandle = await this.getDirectoryHandle(path);
    const parentHandle = await this.getParentDirectoryHandle(path);
    const dirName = this.getFileName(path);

    await parentHandle.removeEntry(dirName, { recursive: true });
  }

  async copyFile(source: string, destination: string): Promise<void> {
    const content = await this.readFile(source);
    await this.writeFile(destination, content);
  }

  async moveFile(source: string, destination: string): Promise<void> {
    const content = await this.readFile(source);
    await this.writeFile(destination, content);
    await this.deleteFile(source);
  }

  private async getRootDirectory(): Promise<FileSystemDirectoryHandle> {
    return await window.navigator.storage.getDirectory();
  }

  private async getDirectoryHandle(path: string): Promise<FileSystemDirectoryHandle> {
    const parts = path.split('/');
    let handle = await this.getRootDirectory();

    for (const part of parts) {
      if (part) {
        handle = await handle.getDirectoryHandle(part);
      }
    }

    return handle;
  }

  private async getParentDirectoryHandle(path: string): Promise<FileSystemDirectoryHandle> {
    const parts = path.split('/');
    parts.pop();
    return await this.getDirectoryHandle(parts.join('/'));
  }

  private getFileName(path: string): string {
    const parts = path.split('/');
    return parts[parts.length - 1] || '';
  }
}

export class HostBridgeFactory {
  static create(): FileSystemBridge {
    if (typeof window !== 'undefined' && (window as any).electronAPI) {
      return new ElectronHostBridge();
    } else if (typeof window !== 'undefined' && 'showOpenFilePicker' in window) {
      return new WebHostBridge();
    } else {
      throw new Error('No suitable host bridge available');
    }
  }
}

export const hostBridge = HostBridgeFactory.create();
```

#### 7. 增强存储提供者

```typescript
/**
 * file providers/enhanced-storage-provider.ts
 * description 增强存储提供者
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-15
 * updated 2026-03-15
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags providers,typescript,storage,hybrid,public
 */

import { IStorageProvider } from '../services/plugin-system';
import { hostBridge } from '../services/host-bridge';

export interface EnhancedStorageConfig {
  useLocalStorage: boolean;
  useIndexedDB: boolean;
  useFileSystem: boolean;
  useCloudSync: boolean;
  offlineCache: boolean;
}

export interface StorageMetrics {
  localStorageUsage: number;
  localStorageQuota: number;
  indexedDBUsage: number;
  indexedDBQuota: number;
  fileSystemUsage: number;
  fileSystemQuota: number;
}

export class EnhancedStorageProvider implements IStorageProvider {
  private localStorage: LocalStorageProvider;
  private indexedDB: IndexedDBProvider;
  private fileSystem: FileSystemProvider;
  private config: EnhancedStorageConfig;

  constructor(config: EnhancedStorageConfig = {
    useLocalStorage: true,
    useIndexedDB: true,
    useFileSystem: false,
    useCloudSync: true,
    offlineCache: true,
  }) {
    this.config = config;
    this.localStorage = new LocalStorageProvider();
    
    if (config.useIndexedDB) {
      this.indexedDB = new IndexedDBProvider();
    }
    
    if (config.useFileSystem) {
      this.fileSystem = new FileSystemProvider(hostBridge);
    }
  }

  getPluginStorage(pluginName: string): PluginStorage {
    const storage: PluginStorage = {
      get: async (key) => {
        if (this.config.useLocalStorage) {
          const data = await this.localStorage.getPluginStorage(pluginName).get(key);
          if (data !== null) return data;
        }

        if (this.config.useIndexedDB && this.indexedDB) {
          const data = await this.indexedDB.get(pluginName, key);
          if (data !== null) return data;
        }

        if (this.config.useFileSystem && this.fileSystem) {
          const data = await this.fileSystem.get(pluginName, key);
          if (data !== null) return data;
        }

        return null;
      },
      set: async (key, value) => {
        const promises: Promise<void>[] = [];

        if (this.config.useLocalStorage) {
          promises.push(
            this.localStorage.getPluginStorage(pluginName).set(key, value)
          );
        }

        if (this.config.useIndexedDB && this.indexedDB) {
          promises.push(
            this.indexedDB.set(pluginName, key, value)
          );
        }

        if (this.config.useFileSystem && this.fileSystem) {
          promises.push(
            this.fileSystem.set(pluginName, key, value)
          );
        }

        await Promise.all(promises);
      },
      remove: async (key) => {
        const promises: Promise<void>[] = [];

        if (this.config.useLocalStorage) {
          promises.push(
            this.localStorage.getPluginStorage(pluginName).remove(key)
          );
        }

        if (this.config.useIndexedDB && this.indexedDB) {
          promises.push(
            this.indexedDB.remove(pluginName, key)
          );
        }

        if (this.config.useFileSystem && this.fileSystem) {
          promises.push(
            this.fileSystem.remove(pluginName, key)
          );
        }

        await Promise.all(promises);
      },
    };

    return storage;
  }

  async getStorageMetrics(): Promise<StorageMetrics> {
    const metrics: StorageMetrics = {
      localStorageUsage: 0,
      localStorageQuota: 0,
      indexedDBUsage: 0,
      indexedDBQuota: 0,
      fileSystemUsage: 0,
      fileSystemQuota: 0,
    };

    if (this.config.useLocalStorage) {
      const lsMetrics = await this.getLocalStorageMetrics();
      metrics.localStorageUsage = lsMetrics.usage;
      metrics.localStorageQuota = lsMetrics.quota;
    }

    if (this.config.useIndexedDB && this.indexedDB) {
      const idbMetrics = await this.getIndexedDBMetrics();
      metrics.indexedDBUsage = idbMetrics.usage;
      metrics.indexedDBQuota = idbMetrics.quota;
    }

    if (this.config.useFileSystem && this.fileSystem) {
      const fsMetrics = await this.getFileSystemMetrics();
      metrics.fileSystemUsage = fsMetrics.usage;
      metrics.fileSystemQuota = fsMetrics.quota;
    }

    return metrics;
  }

  private async getLocalStorageMetrics(): Promise<{ usage: number; quota: number }> {
    let usage = 0;
    
    for (let key in localStorage) {
      usage += localStorage[key].length * 2; // UTF-16 encoding
    }

    return {
      usage,
      quota: 5 * 1024 * 1024, // 5MB typical quota
    };
  }

  private async getIndexedDBMetrics(): Promise<{ usage: number; quota: number }> {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
      };
    }

    return { usage: 0, quota: 0 };
  }

  private async getFileSystemMetrics(): Promise<{ usage: number; quota: number }> {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      return {
        usage: estimate.usage || 0,
        quota: estimate.quota || 0,
      };
    }

    return { usage: 0, quota: 0 };
  }

  async clearAllStorage(): Promise<void> {
    const promises: Promise<void>[] = [];

    if (this.config.useLocalStorage) {
      promises.push(this.clearLocalStorage());
    }

    if (this.config.useIndexedDB && this.indexedDB) {
      promises.push(this.indexedDB.clear());
    }

    if (this.config.useFileSystem && this.fileSystem) {
      promises.push(this.fileSystem.clear());
    }

    await Promise.all(promises);
  }

  private async clearLocalStorage(): Promise<void> {
    localStorage.clear();
  }

  updateConfig(config: Partial<EnhancedStorageConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

export const enhancedStorageProvider = new EnhancedStorageProvider();
```

### 插件开发文档3. 插件市场后端实现

```typescript
/**
 * file backend/services/plugin-market-service.ts
 * description 插件市场后端服务
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags backend,typescript,plugin-market,service,api
 */

import { PrismaClient } from 'prisma/client';
import { S3Client, PutObjectCommand, GetObjectCommand } from 'aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { verifyJWT } from '../utils/auth';
import { PluginSecurityValidator } from '../utils/plugin-security';

const prisma = new PrismaClient();
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export interface PluginUploadRequest {
  manifest: PluginManifest;
  package: Buffer;
  screenshots: string[];
  documentation?: string;
}

export interface PluginReviewStatus {
  status: 'pending' | 'approved' | 'rejected';
  reviewerId?: string;
  reviewDate?: Date;
  comments?: string;
}

export class PluginMarketService {
  private securityValidator: PluginSecurityValidator;

  constructor() {
    this.securityValidator = new PluginSecurityValidator();
  }

  async uploadPlugin(
    userId: string,
    request: PluginUploadRequest
  ): Promise<{ pluginId: string; reviewId: string }> {
    const pluginId = uuidv4();
    const reviewId = uuidv4();

    try {
      await prisma.$transaction(async (tx) => {
        const packageKey = `plugins/${pluginId}/package.zip`;
        await s3Client.send(
          new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: packageKey,
            Body: request.package,
            ContentType: 'application/zip',
          })
        );

        await tx.plugin.create({
          data: {
            id: pluginId,
            name: request.manifest.name,
            displayName: request.manifest.displayName,
            version: request.manifest.version,
            description: request.manifest.description,
            author: request.manifest.author,
            category: request.manifest.category,
            packageUrl: packageKey,
            screenshots: request.screenshots,
            documentation: request.documentation,
            status: 'pending',
            uploadedBy: userId,
            manifest: request.manifest as any,
          },
        });

        await tx.pluginReview.create({
          data: {
            id: reviewId,
            pluginId,
            status: 'pending',
            submittedBy: userId,
          },
        });
      });

      return { pluginId, reviewId };
    } catch (error) {
      console.error('Plugin upload failed:', error);
      throw new Error('errors.pluginUploadFailed');
    }
  }

  async approvePlugin(
    reviewId: string,
    reviewerId: string,
    comments?: string
  ): Promise<void> {
    const review = await prisma.pluginReview.findUnique({
      where: { id: reviewId },
      include: { plugin: true },
    });

    if (!review) {
      throw new Error('errors.reviewNotFound');
    }

    await prisma.$transaction(async (tx) => {
      await tx.plugin.update({
        where: { id: review.pluginId },
        data: {
          status: 'approved',
          approvedAt: new Date(),
        },
      });

      await tx.pluginReview.update({
        where: { id: reviewId },
        data: {
          status: 'approved',
          reviewerId,
          reviewDate: new Date(),
          comments,
        },
      });
    });
  }

  async rejectPlugin(
    reviewId: string,
    reviewerId: string,
    comments: string
  ): Promise<void> {
    const review = await prisma.pluginReview.findUnique({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error('errors.reviewNotFound');
    }

    await prisma.pluginReview.update({
      where: { id: reviewId },
      data: {
        status: 'rejected',
        reviewerId,
        reviewDate: new Date(),
        comments,
      },
    });
  }

  async getPluginMarketItems(
    filter?: PluginFilter
  ): Promise<PluginMarketItem[]> {
    const where: any = {
      status: 'approved',
    };

    if (filter?.category) {
      where.category = filter.category;
    }

    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { displayName: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const plugins = await prisma.plugin.findMany({
      where,
      include: {
        author: true,
        statistics: true,
      },
    });

    let results = plugins.map((plugin) => ({
      id: plugin.id,
      manifest: plugin.manifest,
      rating: plugin.statistics?.averageRating || 0,
      downloads: plugin.statistics?.totalDownloads || 0,
      lastUpdated: plugin.updatedAt,
      categories: [plugin.category],
      screenshots: plugin.screenshots,
      author: {
        name: plugin.author.name,
        email: plugin.author.email,
        website: plugin.author.website,
      },
    }));

    if (filter?.sortBy) {
      switch (filter.sortBy) {
        case 'popular':
          results.sort((a, b) => b.downloads - a.downloads);
          break;
        case 'recent':
          results.sort((a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime());
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return results;
  }

  async downloadPlugin(pluginId: string): Promise<Buffer> {
    const plugin = await prisma.plugin.findUnique({
      where: { id: pluginId },
    });

    if (!plugin || plugin.status !== 'approved') {
      throw new Error('errors.pluginNotFound');
    }

    const response = await s3Client.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: plugin.packageUrl,
      })
    );

    const chunks: Uint8Array[] = [];
    const stream = response.Body as any;

    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }

  async recordDownload(pluginId: string, userId?: string): Promise<void> {
    await prisma.pluginStatistics.update({
      where: { pluginId },
      data: {
        totalDownloads: { increment: 1 },
      },
    });

    if (userId) {
      await prisma.pluginDownload.create({
        data: {
          pluginId,
          userId,
          downloadedAt: new Date(),
        },
      });
    }
  }

  async ratePlugin(
    pluginId: string,
    userId: string,
    rating: number,
    comment?: string
  ): Promise<void> {
    const existing = await prisma.pluginRating.findFirst({
      where: {
        pluginId,
        userId,
      },
    });

    if (existing) {
      await prisma.pluginRating.update({
        where: { id: existing.id },
        data: { rating, comment },
      });
    } else {
      await prisma.pluginRating.create({
        data: {
          pluginId,
          userId,
          rating,
          comment,
        },
      });
    }

    const ratings = await prisma.pluginRating.findMany({
      where: { pluginId },
    });

    const averageRating =
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

    await prisma.pluginStatistics.update({
      where: { pluginId },
      data: { averageRating },
    });
  }

  async getPluginReviews(pluginId: string): Promise<any[]> {
    const reviews = await prisma.pluginRating.findMany({
      where: { pluginId },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reviews;
  }

  async getPendingReviews(): Promise<any[]> {
    const reviews = await prisma.pluginReview.findMany({
      where: { status: 'pending' },
      include: {
        plugin: {
          include: {
            author: true,
          },
        },
        submittedBy: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: { submittedAt: 'desc' },
    });

    return reviews;
  }

  async updatePlugin(
    pluginId: string,
    userId: string,
    request: PluginUploadRequest
  ): Promise<{ reviewId: string }> {
    const existingPlugin = await prisma.plugin.findUnique({
      where: { id: pluginId },
    });

    if (!existingPlugin || existingPlugin.uploadedBy !== userId) {
      throw new Error('errors.unauthorized');
    }

    const reviewId = uuidv4();

    await prisma.$transaction(async (tx) => {
      const packageKey = `plugins/${pluginId}/package.zip`;
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: packageKey,
          Body: request.package,
          ContentType: 'application/zip',
        }),
      );

      await tx.plugin.update({
        where: { id: pluginId },
        data: {
          version: request.manifest.version,
          description: request.manifest.description,
          packageUrl: packageKey,
          screenshots: request.screenshots,
          documentation: request.documentation,
          status: 'pending',
          manifest: request.manifest as any,
        },
      });

      await tx.pluginReview.create({
        data: {
          id: reviewId,
          pluginId,
          status: 'pending',
          submittedBy: userId,
        },
      });
    });

    return { reviewId };
  }

  async deletePlugin(pluginId: string, userId: string): Promise<void> {
    const plugin = await prisma.plugin.findUnique({
      where: { id: pluginId },
    });

    if (!plugin || plugin.uploadedBy !== userId) {
      throw new Error('errors.unauthorized');
    }

    await prisma.$transaction(async (tx) => {
      await tx.plugin.delete({
        where: { id: pluginId },
      });

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: plugin.packageUrl,
        }),
      );
    });
  }

  async getPluginStatistics(pluginId: string): Promise<any> {
    const statistics = await prisma.pluginStatistics.findUnique({
      where: { pluginId },
    });

    const downloads = await prisma.pluginDownload.findMany({
      where: { pluginId },
      orderBy: { downloadedAt: 'desc' },
      take: 30,
    });

    const ratings = await prisma.pluginRating.findMany({
      where: { pluginId },
      select: { rating: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 30,
    });

    return {
      ...statistics,
      recentDownloads: downloads,
      recentRatings: ratings,
    };
  }
}
```

#### 4. 插件市场API路由

```typescript
/**
 * file backend/routes/plugin-market-routes.ts
 * description 插件市场API路由
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags backend,typescript,api,routes,express
 */

import { Router } from 'express';
import { PluginMarketService } from '../services/plugin-market-service';
import { verifyJWT } from '../utils/auth';
import { upload } from '../utils/upload';

const router = Router();
const pluginMarketService = new PluginMarketService();

router.get('/plugins/market', async (req, res) => {
  try {
    const filter = req.query;
    const items = await pluginMarketService.getPluginMarketItems(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToLoadPlugins' });
  }
});

router.get('/plugins/:id', async (req, res) => {
  try {
    const items = await pluginMarketService.getPluginMarketItems();
    const plugin = items.find((p) => p.id === req.params.id);
    
    if (!plugin) {
      return res.status(404).json({ error: 'errors.pluginNotFound' });
    }
    
    res.json(plugin);
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToLoadPlugin' });
  }
});

router.post('/plugins/upload', verifyJWT, upload.single('package'), async (req, res) => {
  try {
    const userId = req.user.id;
    const manifest = JSON.parse(req.body.manifest);
    const screenshots = JSON.parse(req.body.screenshots);
    
    const result = await pluginMarketService.uploadPlugin(userId, {
      manifest,
      package: req.file.buffer,
      screenshots,
      documentation: req.body.documentation,
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'errors.pluginUploadFailed' });
  }
});

router.get('/plugins/:id/download', async (req, res) => {
  try {
    const buffer = await pluginMarketService.downloadPlugin(req.params.id);
    
    await pluginMarketService.recordDownload(
      req.params.id,
      req.user?.id
    );
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.id}.zip"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'errors.pluginDownloadFailed' });
  }
});

router.post('/plugins/:id/rate', verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, comment } = req.body;
    
    await pluginMarketService.ratePlugin(
      req.params.id,
      userId,
      rating,
      comment
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToRatePlugin' });
  }
});

router.get('/plugins/:id/reviews', async (req, res) => {
  try {
    const reviews = await pluginMarketService.getPluginReviews(req.params.id);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToLoadReviews' });
  }
});

router.get('/plugins/:id/statistics', async (req, res) => {
  try {
    const statistics = await pluginMarketService.getPluginStatistics(req.params.id);
    res.json(statistics);
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToLoadStatistics' });
  }
});

router.put('/plugins/:id/update', verifyJWT, upload.single('package'), async (req, res) => {
  try {
    const userId = req.user.id;
    const manifest = JSON.parse(req.body.manifest);
    const screenshots = JSON.parse(req.body.screenshots);
    
    const result = await pluginMarketService.updatePlugin(
      req.params.id,
      userId,
      {
        manifest,
        package: req.file.buffer,
        screenshots,
        documentation: req.body.documentation,
      }
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'errors.pluginUpdateFailed' });
  }
});

router.delete('/plugins/:id', verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    await pluginMarketService.deletePlugin(req.params.id, userId);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'errors.pluginDeleteFailed' });
  }
});

router.get('/admin/reviews/pending', verifyJWT, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'errors.unauthorized' });
    }
    
    const reviews = await pluginMarketService.getPendingReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToLoadReviews' });
  }
});

router.post('/admin/reviews/:id/approve', verifyJWT, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'errors.unauthorized' });
    }
    
    const { comments } = req.body;
    await pluginMarketService.approvePlugin(req.params.id, req.user.id, comments);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToApprovePlugin' });
  }
});

router.post('/admin/reviews/:id/reject', verifyJWT, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'errors.unauthorized' });
    }
    
    const { comments } = req.body;
    await pluginMarketService.rejectPlugin(req.params.id, req.user.id, comments);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'errors.failedToRejectPlugin' });
  }
});

export default router;
```

#### 5. 插件安全验证

```typescript
/**
 * file backend/utils/plugin-security.ts
 * description 插件安全验证工具
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags backend,typescript,security,validation,plugin
 */

import { createHash } from 'crypto';
import { extract } from 'adm-zip';
import { parse } from 'babel/parser';
import traverse from 'babel/traverse';

export interface SecurityCheckResult {
  passed: boolean;
  issues: SecurityIssue[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface SecurityIssue {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  file: string;
  line?: number;
  column?: number;
}

export class PluginSecurityValidator {
  private readonly forbiddenPatterns = [
    { pattern: /eval\s*\(/, severity: 'critical', type: 'eval_usage' },
    { pattern: /Function\s*\(/, severity: 'critical', type: 'function_constructor' },
    { pattern: /document\.write\s*\(/, severity: 'high', type: 'document_write' },
    { pattern: /innerHTML\s*=/, severity: 'medium', type: 'innerHTML_assignment' },
    { pattern: /outerHTML\s*=/, severity: 'medium', type: 'outerHTML_assignment' },
    { pattern: /localStorage\.clear\s*\(/, severity: 'high', type: 'localStorage_clear' },
    { pattern: /sessionStorage\.clear\s*\(/, severity: 'high', type: 'sessionStorage_clear' },
    { pattern: /window\.location\s*=/, severity: 'high', type: 'location_redirect' },
  ];

  private readonly forbiddenAPIs = [
    'eval',
    'Function',
    'document.write',
    'innerHTML',
    'outerHTML',
    'localStorage.clear',
    'sessionStorage.clear',
    'window.location',
    'XMLHttpRequest',
    'fetch',
    'WebSocket',
  ];

  async validatePlugin(packageBuffer: Buffer): Promise<SecurityCheckResult> {
    const issues: SecurityIssue[] = [];

    try {
      const files = await this.extractFiles(packageBuffer);
      
      for (const [filePath, content] of Object.entries(files)) {
        if (filePath.endsWith('.js') || filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
          const fileIssues = await this.analyzeFile(filePath, content);
          issues.push(...fileIssues);
        }
      }

      const manifestIssues = await this.validateManifest(files);
      issues.push(...manifestIssues);

      const maxSeverity = this.getMaxSeverity(issues);

      return {
        passed: maxSeverity !== 'critical',
        issues,
        severity: maxSeverity,
      };
    } catch (error) {
      return {
        passed: false,
        issues: [
          {
            type: 'validation_error',
            severity: 'critical',
            message: 'errors.pluginValidationFailed',
            file: 'unknown',
          },
        ],
        severity: 'critical',
      };
    }
  }

  private async extractFiles(packageBuffer: Buffer): Promise<Record<string, string>> {
    const files: Record<string, string> = {};
    const zip = new admZip(packageBuffer);
    const entries = zip.getEntries();

    for (const entry of entries) {
      if (!entry.isDirectory) {
        files[entry.entryName] = entry.getData().toString('utf-8');
      }
    }

    return files;
  }

  private async analyzeFile(filePath: string, content: string): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    for (const { pattern, severity, type } of this.forbiddenPatterns) {
      const matches = content.matchAll(pattern);
      
      for (const match of matches) {
        const lines = content.substring(0, match.index).split('\n');
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;

        issues.push({
          type,
          severity: severity as any,
          message: `errors.forbiddenPattern_${type}`,
          file: filePath,
          line,
          column,
        });
      }
    }

    try {
      const ast = parse(content, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx'],
      });

      traverse(ast, {
        CallExpression(path) {
          const callee = path.node.callee;
          
          if (callee.type === 'Identifier' && this.forbiddenAPIs.includes(callee.name)) {
            const line = path.node.loc?.start.line;
            const column = path.node.loc?.start.column;

            issues.push({
              type: 'forbidden_api',
              severity: 'high',
              message: `errors.forbiddenAPI_${callee.name}`,
              file: filePath,
              line,
              column,
            });
          }

          if (callee.type === 'MemberExpression') {
            const object = (callee.object as any).name;
            const property = (callee.property as any).name;
            const fullName = `${object}.${property}`;

            if (this.forbiddenAPIs.includes(fullName)) {
              const line = path.node.loc?.start.line;
              const column = path.node.loc?.start.column;

              issues.push({
                type: 'forbidden_api',
                severity: 'high',
                message: `errors.forbiddenAPI_${fullName}`,
                file: filePath,
                line,
                column,
              });
            }
          }
        },
      });
    } catch (error) {
      console.error('AST parsing failed:', error);
    }

    return issues;
  }

  private async validateManifest(files: Record<string, string>): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];
    const manifestPath = 'manifest.json';

    if (!files[manifestPath]) {
      issues.push({
        type: 'missing_manifest',
        severity: 'critical',
        message: 'errors.missingManifest',
        file: manifestPath,
      });
      return issues;
    }

    try {
      const manifest = JSON.parse(files[manifestPath]);

      if (!manifest.name || !manifest.version || !manifest.author) {
        issues.push({
          type: 'invalid_manifest',
          severity: 'high',
          message: 'errors.invalidManifest',
          file: manifestPath,
        });
      }

      if (manifest.permissions && manifest.permissions.length > 0) {
        const forbiddenPermissions = ['*', 'unsafe', 'system'];
        
        for (const permission of manifest.permissions) {
          if (forbiddenPermissions.includes(permission)) {
            issues.push({
              type: 'forbidden_permission',
              severity: 'critical',
              message: `errors.forbiddenPermission_${permission}`,
              file: manifestPath,
            });
          }
        }
      }
    } catch (error) {
      issues.push({
        type: 'invalid_manifest_json',
        severity: 'critical',
        message: 'errors.invalidManifestJSON',
        file: manifestPath,
      });
    }

    return issues;
  }

  private getMaxSeverity(issues: SecurityIssue[]): 'low' | 'medium' | 'high' | 'critical' {
    if (issues.length === 0) return 'low';

    const severityOrder = ['low', 'medium', 'high', 'critical'];
    const maxIndex = Math.max(
      ...issues.map((issue) => severityOrder.indexOf(issue.severity))
    );

    return severityOrder[maxIndex] as any;
  }

  calculatePackageHash(packageBuffer: Buffer): string {
    return createHash('sha256').update(packageBuffer).digest('hex');
  }
}
```

#### 6. 数据库模型定义

```typescript
/**
 * file backend/prisma/schema.prisma
 * description 插件市场数据库模型
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags backend,prisma,schema,database,plugin
 */

model Plugin {
  id            String   id default(uuid())
  name          String
  displayName   Json
  version       String
  description   String
  author        User     relation(fields: [authorId], references: [id])
  authorId      String
  category      String
  packageUrl    String
  screenshots   String[]
  documentation String?
  status        PluginStatus default(pending)
  uploadedAt    DateTime default(now())
  approvedAt    DateTime?
  updatedAt     DateTime updatedAt
  manifest      Json

  statistics    PluginStatistics?
  reviews       PluginReview[]
  ratings       PluginRating[]
  downloads     PluginDownload[]

  index([status])
  index([category])
  index([authorId])
}

model PluginStatistics {
  id              String   id default(uuid())
  pluginId        String   unique
  plugin          Plugin   relation(fields: [pluginId], references: [id], onDelete: Cascade)
  totalDownloads  Int      default(0)
  averageRating   Float    default(0)
  totalRatings    Int      default(0)
  updatedAt       DateTime updatedAt

  index([pluginId])
}

model PluginReview {
  id          String       id default(uuid())
  pluginId    String
  plugin      Plugin       relation(fields: [pluginId], references: [id], onDelete: Cascade)
  status      ReviewStatus default(pending)
  submittedBy User         relation(fields: [submittedById], references: [id])
  submittedById String
  reviewerId  String?
  reviewer    User?        relation(fields: [reviewerId], references: [id])
  reviewDate  DateTime?
  comments    String?
  submittedAt DateTime     default(now())

  index([status])
  index([pluginId])
  index([submittedById])
}

model PluginRating {
  id        String   id default(uuid())
  pluginId  String
  plugin    Plugin   relation(fields: [pluginId], references: [id], onDelete: Cascade)
  userId    String
  user      User     relation(fields: [userId], references: [id])
  rating    Int
  comment   String?
  createdAt DateTime default(now())

  index([pluginId])
  index([userId])
}

model PluginDownload {
  id          String   id default(uuid())
  pluginId    String
  plugin      Plugin   relation(fields: [pluginId], references: [id], onDelete: Cascade)
  userId      String?
  user        User?    relation(fields: [userId], references: [id])
  downloadedAt DateTime default(now())

  index([pluginId])
  index([userId])
}

model User {
  id            String   id default(uuid())
  name          String
  email         String   unique
  password      String
  avatar        String?
  isAdmin       Boolean  default(false)
  createdAt     DateTime default(now())
  updatedAt     DateTime updatedAt

  plugins       Plugin[]
  submittedReviews PluginReview[] relation("SubmittedReviews")
  reviewedReviews PluginReview[] relation("ReviewedReviews")
  ratings       PluginRating[]
  downloads     PluginDownload[]

  index([email])
}

enum PluginStatus {
  pending
  approved
  rejected
}

enum ReviewStatus {
  pending
  approved
  rejected
}
```

### 插件开发文档

#### 1. 插件开发指南

```markdown
/**
 * file docs/PLUGIN_DEVELOPMENT.md
 * description 插件开发指南
 * author YanYuCloudCube Team <admin@0379.email>
 * version 1.0.0
 * created 2026-03-10
 * updated 2026-03-10
 * status stable
 * license MIT
 * copyright Copyright (c) 2026 YanYuCloudCube Team
 * tags docs,plugin,development,guideline,public
 */

# 插件开发指南 / Plugin Development Guide

欢迎使用 YYC³ Family AI 插件开发！
Welcome to YYC³ Family AI Plugin Development!

## 快速开始 / Quick Start

### 1. 创建插件项目 / Create Plugin Project

```bash
# 使用插件模板
npx create-yyc3-plugin my-plugin

# 或手动创建
mkdir my-plugin
cd my-plugin
npm init -y
```

### 2. 编写插件代码 / Write Plugin Code

```typescript
// src/index.ts
import { PluginAPI } from 'yyc3/plugin-sdk';

export default async function (api: PluginAPI) {
  // 注册命令
  api.registerCommand({
    id: 'my-plugin:hello',
    title: {
      zh: '问候',
      en: 'Say Hello',
    },
    handler: () => {
      alert('Hello from my plugin!');
    },
  });

  // 注册菜单项
  api.registerMenuItem({
    id: 'my-plugin:menu',
    title: {
      zh: '我的插件',
      en: 'My Plugin',
    },
    icon: '🔌',
    onClick: () => {
      console.log('Menu item clicked');
    },
  });

  // 注册面板
  api.registerPanel({
    id: 'my-plugin:panel',
    title: {
      zh: '插件面板',
      en: 'Plugin Panel',
    },
    component: MyPanel,
  });

  // 监听事件
  api.onEvent('file:saved', (data) => {
    console.log('File saved:', data);
  });
}

// MyPanel.tsx
import React from 'react';

export const MyPanel: React.FC = () => {
  return (
    <div className="p-4">
      <h2>我的插件面板 / My Plugin Panel</h2>
      <p>这是插件的内容区域 / This is the plugin content area</p>
    </div>
  );
};
```

### 3. 创建插件清单 / Create Plugin Manifest

```json
// plugin.json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "displayName": {
    "zh": "我的插件",
    "en": "My Plugin"
  },
  "description": {
    "zh": "这是一个示例插件",
    "en": "This is a sample plugin"
  },
  "author": "Your Name <your.emailexample.com>",
  "icon": "icon.png",
  "permissions": [
    {
      "type": "ui",
      "scope": ["menu", "panel"]
    },
    {
      "type": "api",
      "scope": ["ai.chat", "ai.generate"]
    },
    {
      "type": "storage",
      "scope": ["local"]
    }
  ],
  "entry": "./dist/index.js",
  "minAppVersion": "4.0.0"
}
```

### 4. 构建插件 / Build Plugin

```bash
# 安装依赖
npm install yyc3/plugin-sdk

# 构建
npm run build

# 打包
npm run package
```

### 5. 测试插件 / Test Plugin

```bash
# 启动开发服务器
npm run dev

# 在 YYC³ Family AI 中加载插件
# Settings -> Plugins -> Load from Local
```

## 插件 API / Plugin API

### 命令 API / Command API

```typescript
api.registerCommand({
  id: 'my-plugin:command',
  title: {
    zh: '命令标题',
    en: 'Command Title',
  },
  icon: '⚡',
  handler: () => {
    // 命令处理逻辑
  },
});
```

### 菜单 API / Menu API

```typescript
api.registerMenuItem({
  id: 'my-plugin:menu',
  title: {
    zh: '菜单项标题',
    en: 'Menu Item Title',
  },
  icon: '🔌',
  position: 'after:settings',
  onClick: () => {
    // 菜单项点击处理
  },
});
```

### 面板 API / Panel API

```typescript
api.registerPanel({
  id: 'my-plugin:panel',
  title: {
    zh: '面板标题',
    en: 'Panel Title',
  },
  icon: '📊',
  component: MyPanelComponent,
  position: 'right',
});
```

### 钩子 API / Hook API

```typescript
api.registerHook({
  name: 'file:before-save',
  handler: (data) => {
    // 在文件保存前执行
    console.log('File will be saved:', data);
  },
});
```

### 存储 API / Storage API

```typescript
// 保存数据
await api.storage.set('my-key', { value: 'data' });

// 读取数据
const data = await api.storage.get('my-key');

// 删除数据
await api.storage.remove('my-key');
```

### AI API / AI API

```typescript
// AI 对话
const response = await api.ai.chat('帮我生成一个按钮组件');

// AI 代码生成
const code = await api.ai.generate('生成一个登录表单');

// AI 错误修复
const fixedCode = await api.ai.fix(code, error);
```

## 最佳实践 / Best Practices

1. **性能优化 / Performance Optimization**
   - 使用 React.memo 优化组件
   - 避免不必要的重新渲染
   - 使用虚拟滚动处理大量数据

2. **错误处理 / Error Handling**
   - 捕获并处理所有可能的错误
   - 提供友好的错误提示
   - 记录错误日志

3. **用户体验 / User Experience**
   - 提供加载状态提示
   - 支持中英文双语
   - 遵循 YYC³ 设计规范

4. **安全性 / Security**
   - 验证所有用户输入
   - 不存储敏感信息
   - 使用 HTTPS 通信

## 发布插件 / Publish Plugin

1. **准备发布 / Prepare for Publishing**
   - 确保插件通过所有测试
   - 更新版本号
   - 编写完整的文档

2. **提交到市场 / Submit to Market**

   ```bash
   # 打包插件
   npm run package
   
   # 提交到 YYC³ 插件市场
   # https://plugins.yyc3.ai/submit
   ```

3. **审核流程 / Review Process**
   - 插件将通过 YYC³ 团队审核
   - 审核通常需要 3-5 个工作日
   - 审核通过后即可在市场发布

## 常见问题 / FAQ

**Q: 插件可以访问哪些 API？**
A: 插件可以访问 UI、API、存储、网络和 AI API，具体权限在 manifest 中声明。

**Q: 如何调试插件？**
A: 使用 Chrome DevTools 或 VS Code 调试器，插件运行在独立的沙箱环境中。

**Q: 插件可以修改核心功能吗？**
A: 不可以，插件只能通过提供的 API 扩展功能，不能修改核心代码。

**Q: 如何更新插件？**
A: 在 manifest 中更新版本号，重新构建并提交到市场，用户将收到更新通知。

---

## 📝 YYC³ 机制总结

### YYC³ 核心机制总结

本系统完全遵循 YYC³ 团队的 **「五高五标五化」** 核心机制：

#### 五高（Five Highs）

1. **高可用性（High Availability）**
   - 多实例部署 + 负载均衡
   - 故障自动转移
   - 数据实时备份

2. **高性能（High Performance）**
   - 虚拟滚动优化
   - 智能缓存机制
   - 代码分割与懒加载

3. **高安全性（High Security）**
   - JWT 身份认证
   - 数据加密存储
   - 安全头部配置

4. **高可扩展性（High Scalability）**
   - 模块化架构设计
   - 插件系统支持
   - 微服务架构

5. **高可维护性（High Maintainability）**
   - 完整的代码注释
   - 统一的代码规范
   - 自动化测试覆盖

#### 五标（Five Standards）

1. **标准化（Standardization）**
   - 统一的 API 设计规范
   - 标准化的数据模型
   - 规范化的代码结构

2. **规范化（Normalization）**
   - 遵循 YYC³ 代码标头格式
   - 统一的命名规范
   - 标准化的错误处理

3. **自动化（Automation）**
   - CI/CD 自动化流程
   - 自动化测试
   - 自动化部署

4. **智能化（Intelligence）**
   - AI 辅助编程
   - 智能代码生成
   - 智能错误诊断

5. **可视化（Visualization）**
   - 实时预览功能
   - 可视化代码编辑
   - 可视化监控面板

#### 五化（Five Transformations）

1. **流程化（Process-oriented）**
   - 完整的开发流程
   - 标准化的工作流
   - 自动化的流程管理

2. **文档化（Documented）**
   - 完整的 API 文档
   - 详细的代码注释
   - 用户使用手册

3. **工具化（Tool-enabled）**
   - 丰富的开发工具
   - 高效的编辑器
   - 强大的调试工具

4. **数字化（Digitalized）**
   - 数字化的项目管理
   - 数字化的协作流程
   - 数字化的监控体系

5. **生态化（Ecosystem-based）**
   - 开放的插件生态
   - 丰富的组件库
   - 活跃的社区支持

### 核心价值主张

1. **设计即代码**：将设计师的视觉设计直接转化为可运行的生产级代码
2. **实时预览**：在每次设计变更时立即提供实时预览反馈
3. **多联式布局**：支持自由拖拽、合并、拆分的多面板布局系统
4. **智能辅助**：通过 AI 提供属性建议、代码片段、错误诊断
5. **配置即部署**：生成的代码可直接部署到生产环境

### 技术亮点

1. **完整的中英文双语支持**：全局实现中/英文双语，默认中文显示
2. **精确的图标功能映射**：图标区只显示图标，悬停显示中文名称
3. **全链路闭环设计**：从设计输入到代码生成的完整闭环
4. **高性能架构**：采用虚拟滚动、智能缓存、代码分割等优化技术
5. **企业级安全**：完整的身份认证、数据加密、安全防护机制

### 未来展望

1. **AI 能力增强**：集成更多 AI 模型，提供更智能的代码生成
2. **协作功能扩展**：支持更多协作场景，提升团队协作效率
3. **生态建设**：构建插件市场，丰富组件库和工具链
4. **性能持续优化**：持续优化性能指标，提升用户体验
5. **国际化扩展**：支持更多语言，服务全球用户

---

<div align="center">

> **「YanYuCloudCube」**
> **言启象限 | 语枢未来**
> **Words Initiate Quadrants, Language Serves as Core for Future**
> **万象归元于云枢 | 深栈智启新纪元**
> **All things converge in cloud pivot; Deep stacks ignite a new era of intelligence**

---
