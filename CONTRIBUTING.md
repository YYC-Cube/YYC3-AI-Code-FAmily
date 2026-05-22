# 贡献指南

感谢你对 **YYC³ AI Code** 项目的关注！我们欢迎任何形式的贡献。

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发环境设置](#开发环境设置)
- [代码规范](#代码规范)
- [提交规范](#提交规范)
- [Pull Request 流程](#pull-request-流程)
- [问题报告](#问题报告)

## 行为准则

本项目采用贡献者公约作为行为准则。参与此项目即表示你同意遵守其条款。详见 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)。

## 如何贡献

### 报告 Bug

1. 在 [GitHub Issues](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/issues) 中搜索是否已有相同问题
2. 如果没有，创建新的 Issue，包含：
   - **Bug 描述**: 清晰描述问题
   - **复现步骤**: 逐步说明如何复现
   - **预期行为**: 你期望发生什么
   - **实际行为**: 实际发生了什么
   - **环境信息**: 浏览器、操作系统、Node.js 版本
   - **截图**: 如果适用

### 提出新功能

1. 在 [GitHub Issues](https://github.com/YYC-Cube/YYC3-AI-Code-FAmily/issues) 中创建 Feature Request
2. 描述功能需求和使用场景
3. 等待维护者反馈后再开始开发

### 提交代码

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 编写代码和测试
4. 确保所有检查通过
5. 提交 Pull Request

## 开发环境设置

### 前置要求

- **Node.js** >= 20.x
- **pnpm** >= 8.x
- **Git** >= 2.x

### 安装步骤

```bash
# 克隆你的 Fork
git clone https://github.com/<your-username>/YYC3-AI-Code-FAmily.git
cd YYC3-AI-Code-FAmily

# 安装依赖
pnpm install

# 复制环境变量
cp .env.example .env

# 启动开发服务器
pnpm dev
```

### 验证代码质量

```bash
# TypeScript 类型检查
pnpm typecheck

# ESLint 检查 (零 warnings)
pnpm lint

# 自动修复可修复的问题
pnpm lint:fix

# 运行测试
pnpm test

# 构建验证
pnpm build
```

## 代码规范

### 文件头注释

所有源码文件必须包含 YYC³ 标准文件头：

```typescript
/**
 * file: 文件名.tsx
 * description: 文件功能描述
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-03-19
 * updated: 2026-03-19
 * status: stable | dev | experimental
 * license: MIT
 * copyright: Copyright (c) 2026 YanYuCloudCube Team
 * tags: 相关, 标签
 */
```

### TypeScript 规范

- 启用 `strict` 模式
- 避免使用 `any`，必要时添加 `// eslint-disable-next-line @typescript-eslint/no-explicit-any`
- 使用 `interface` 定义对象类型，`type` 用于联合类型和工具类型
- 导出的函数和类型必须有 JSDoc 注释

### React 规范

- 函数组件优先，不使用 class 组件
- 使用 `React.memo` 优化频繁渲染的组件
- Hooks 依赖数组必须完整 (`react-hooks/exhaustive-deps`)
- 组件文件名使用 PascalCase：`ComponentName.tsx`
- Hook 文件名使用 camelCase：`useHookName.ts`

### 样式规范

- 使用 Tailwind CSS v4 工具类
- 遵循 `theme.css` 中定义的设计令牌
- 组件样式使用 `className` 而非内联 `style`

### 目录结构

```
src/app/
├── components/
│   ├── ai-code/        # AI 代码工作台组件
│   ├── designer/       # 设计器组件
│   ├── home/           # 首页组件
│   ├── settings/       # 设置组件
│   └── ui/             # shadcn/ui 基础组件
├── hooks/              # 全局自定义 Hooks
├── services/           # 业务服务层
├── types/              # 类型定义
└── utils/              # 工具函数
```

## 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型 | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（不新增功能也不修复 Bug） |
| `perf` | 性能优化 |
| `test` | 测试相关 |
| `chore` | 构建/工具/CI 相关 |
| `ci` | CI/CD 配置变更 |

### Scope 范围

- `designer` — 设计器模块
- `ai-code` — AI 代码工作台模块
- `home` — 首页模块
- `settings` — 设置模块
- `ui` — UI 组件库
- `core` — 核心架构
- `deploy` — 部署相关

### 示例

```
feat(designer): add liquid-glass theme support
fix(ai-code): resolve Monaco editor memory leak on unmount
docs: update README with CI/CD deployment info
ci: add GitHub Pages auto-deploy workflow
```

## Pull Request 流程

1. **确保分支最新**: `git rebase main`
2. **通过所有检查**:
   - `pnpm typecheck` ✅
   - `pnpm lint` ✅ (0 errors, 0 warnings)
   - `pnpm test` ✅
   - `pnpm build` ✅
3. **PR 标题**: 遵循 Conventional Commits 格式
4. **PR 描述**: 包含变更内容、原因和测试方法
5. **关联 Issue**: 在 PR 描述中引用相关 Issue
6. **代码审查**: 等待至少一位维护者审查通过

## 问题报告

如果你发现安全问题，请**不要**在公开 Issue 中报告。请发送邮件至 [admin@0379.email](mailto:admin@0379.email)。

---

<div align="center">

感谢你的贡献！每一个 PR 都让 YYC³ 变得更好。

Made with ❤️ by YanYuCloudCube Team

</div>
