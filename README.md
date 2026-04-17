# YYC³ AI Code

<div align="center">

> **「YanYuCloudCube」**
> **言启象限 | 语枢未来**
> **Words Initiate Quadrants, Language Serves as Core for Future**
> **万象归元于云枢 | 深栈智启新纪元**
> **All things converge in cloud pivot; Deep stacks ignite a new era of intelligence**

---

**言传千行代码 | 语枢万物智能**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF)](https://vitejs.dev/)

</div>

## 📋 项目简介

YYC³ AI Code 是一款基于 **Front-End-Only Full-Stack (FEFS)** 模式的桌面级 AI 辅助低代码开发平台。它将设计师的视觉设计直接转化为生产级代码，提供实时预览、多面板布局、智能代码生成和协同编辑等核心功能。

### 核心特性

- **🎨 设计即代码**: 将 Figma 设计直接转换为 React/Vue/Angular 生产代码
- **👁️ 实时预览**: 每次设计变更都能立即看到效果
- **📐 多面板布局**: 支持自由拖拽、合并、分割的多面板系统
- **🤖 智能助手**: AI 提供属性建议、代码片段、错误诊断
- **⚙️ 配置即部署**: 生成的代码可直接部署到生产环境
- **👥 实时协同**: 基于 CRDT 的多人协作编辑
- **🔌 插件系统**: 可扩展的插件架构

## 🚀 快速开始

### 环境要求

- **Node.js**: >= 20.x
- **pnpm**: >= 8.x (推荐) 或 npm >= 9.x
- **Git**: >= 2.x

### 安装步骤

1. **克隆仓库**

```bash
git clone https://github.com/YYC-Cube/YYC3-AI-Code.git
cd YYC3-AI-Code
```

2. **安装依赖**

```bash
# 使用 pnpm (推荐)
c

# 或使用 npm
npm install
```

3. **配置环境变量**

```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑 .env 文件，填入必要的配置
# 至少需要配置 AI API Key
```

4. **启动开发服务器**

```bash
# 使用 pnpm
pnpm dev

# 或使用 npm
npm run dev
```

5. **访问应用**

打开浏览器访问 [http://localhost:5173](http://localhost:5173)

## 📖 使用指南

### 基础功能

#### 1. 创建新项目

1. 点击顶部工具栏的「新建项目」按钮
2. 选择项目模板（空白、表单、表格等）
3. 输入项目名称和描述
4. 点击「创建」

#### 2. 添加组件

1. 从左侧组件面板拖拽组件到画布
2. 在右侧属性面板调整组件属性
3. 实时预览组件效果

#### 3. 布局管理

1. **添加面板**: 右键画布空白处 → 「新增面板」
2. **合并面板**: 拖拽一个面板到另一个面板边缘
3. **拆分面板**: 选中面板 → 「拆分为水平/垂直」
4. **调整大小**: 拖拽面板边缘调整尺寸

#### 4. AI 辅助

1. 选中组件或面板
2. 点击顶部工具栏的「AI 助手」按钮
3. 输入需求描述
4. AI 会自动生成代码或建议

### 高级功能

#### 实时协作

1. 点击顶部工具栏的「协作」按钮
2. 生成邀请链接分享给团队成员
3. 团队成员可以同时编辑项目
4. 所有更改实时同步

#### 代码生成

1. 完成设计后点击「生成代码」
2. 选择目标框架（React/Vue/Angular）
3. 下载生成的代码包
4. 直接部署或继续开发

#### 数据库集成

1. 在右侧属性面板选择「数据源」
2. 连接本地数据库（SQLite/MySQL/PostgreSQL）
3. 绑定组件到数据表
4. 自动生成 CRUD API

## 🏗️ 项目结构

```
YYC3-AI-Code/
├── docs/                      # 项目文档
│   ├── 变量词库/              # 变量定义
│   ├── YYC3-AI-Code.md       # 项目详细说明
│   ├── YYC3.md               # YYC³ 总体说明
│   └── Guidelines.md         # 开发指南
├── public/                    # 静态资源
│   ├── yyc3-app-icons/       # 应用图标
│   └── *.png,*.svg           # 图片资源
├── src/
│   ├── app/                   # 应用核心
│   │   ├── components/        # 组件库
│   │   │   ├── ai-code/      # AI 代码功能
│   │   │   ├── designer/     # 设计器功能
│   │   │   ├── ui/           # UI 基础组件
│   │   │   └── settings/     # 设置页面
│   │   ├── hooks/            # 自定义 Hooks
│   │   ├── services/         # 服务层
│   │   ├── testing/          # 测试文件
│   │   ├── types/            # 类型定义
│   │   ├── utils/            # 工具函数
│   │   ├── App.tsx           # 应用入口
│   │   ├── routes.tsx        # 路由配置
│   │   └── store.tsx         # 状态管理
│   ├── main.tsx              # 主入口
│   └── index.css             # 全局样式
├── .env.example              # 环境变量示例
├── .gitignore               # Git 忽略规则
├── index.html               # HTML 入口
├── package.json             # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 项目说明
```

## 🛠️ 技术栈

### 前端技术

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| TypeScript | 5.x | 类型系统 |
| Vite | 6.3.5 | 构建工具 |
| Tailwind CSS | 4.1.12 | 样式框架 |
| Zustand | - | 状态管理 |
| React Router | 7.13.0 | 路由管理 |
| Yjs | 13.6.29 | 实时协同 |
| Monaco Editor | - | 代码编辑器 |
| Framer Motion | 12.36.0 | 动画库 |

### UI 组件库

- **Radix UI**: 无样式的基础组件
- **Material UI**: 部分高级组件
- **Lucide React**: 图标库
- **Sonner**: Toast 通知

### AI 服务

支持多种 AI 提供商：

- **OpenAI**: GPT-4 Turbo, GPT-3.5 Turbo
- **Anthropic**: Claude 3 Opus, Claude 3 Sonnet
- **智谱 AI**: GLM-4, GLM-4 Flash
- **百度文心**: ERNIE-4.0-8K, ERNIE-3.5-8K
- **阿里通义**: Qwen Turbo, Qwen Plus, Qwen Max
- **Ollama**: 本地模型 (Llama 2, Mistral)

## 🔧 开发指南

### 代码规范

所有代码文件必须包含 YYC³ 标准的文件头注释：

```typescript
/**
 * @file 文件名
 * @description 文件描述
 * @author YanYuCloudCube Team <admin@0379.email>
 * @version v1.0.0
 * @created 2026-03-19
 * @updated 2026-03-19
 * @status stable
 * @license MIT
 * @copyright Copyright (c) 2026 YanYuCloudCube Team
 * @tags tags
 */
```

详细规范请参考 [docs/YYC3-Code-header.md](docs/YYC3-Code-header.md)

### 可用脚本

```bash
# 开发
pnpm dev              # 启动开发服务器
pnpm build            # 构建生产版本
pnpm preview          # 预览生产构建

# 测试
pnpm test             # 运行测试
pnpm test:ui          # 运行测试 UI
pnpm coverage         # 生成覆盖率报告

# 代码质量
pnpm lint             # 运行 ESLint
pnpm lint:fix         # 自动修复 ESLint 问题
pnpm typecheck        # TypeScript 类型检查
pnpm format           # 格式化代码
```

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构
perf: 性能优化
test: 测试相关
chore: 构建/工具相关
```

## 📚 文档

- [项目详细说明](docs/YYC3-AI-Code.md)
- [开发指南](docs/Guidelines.md)
- [代码标头规范](docs/YYC3-Code-header.md)
- [YYC³ 总体说明](docs/YYC3.md)
- [Figma 设计指南](docs/YYC3-Design-Prompt-Index.md)

## 🤝 贡献指南

我们欢迎任何形式的贡献！

### 如何贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 贡献规范

- 遵循代码规范
- 添加必要的测试
- 更新相关文档
- 确保所有测试通过

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 👥 团队

**YanYuCloudCube Team**

- **联系邮箱**: admin@0379.email
- **项目地址**: https://github.com/YYC-Cube/YYC3-AI-Code

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师。

## 📞 联系我们

- **邮箱**: admin@0379.email
- **GitHub Issues**: https://github.com/YYC-Cube/YYC3-AI-Code/issues
- **Discord**: [加入我们的 Discord 社区](https://discord.gg/yyc3)

---

<div align="center">

> **「言启象限 | 语枢未来」**
> **Words Initiate Quadrants, Language Serves as Core for Future**

Made with ❤️ by YanYuCloudCube Team

</div>
