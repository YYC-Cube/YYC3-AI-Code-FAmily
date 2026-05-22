# Changelog

All notable changes to YYC³ AI Code will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- AI 代码生成功能增强
- 多实例管理优化
- 性能监控面板
- 插件市场集成

## [1.1.0] - 2026-05-22

### Added
- 🚀 CI/CD 自动部署流水线 (GitHub Actions → GitHub Pages)
- 🌐 自定义域名支持 `ai-family.yyc3.top`
- 📄 SPA 路由回退 (404.html 自动生成)
- 📋 开发者文档五件套补全 (README / CHANGELOG / CONTRIBUTING / CODE_OF_CONDUCT / LICENSE)

### Fixed
- 🔧 ESLint 全面修复 (317 warnings → 0)
- 🎨 全局 Logo 路径修正 (yyc3-icons → public root)
- 🌐 index.html Favicon / Apple Touch Icon / PWA Manifest 完善
- 📐 ESLint ignorePatterns 排除 `project/` 和 `src/imports/` 非源码目录
- 🔐 Git remote 从 HTTPS 切换到 SSH 以支持 workflow 文件推送

### Changed
- 📖 README.md 新增 CI/CD 徽章、在线访问地址、路由架构说明、部署文档
- 📖 README.md 修正状态管理描述 (Zustand → Context + useReducer)
- 📖 README.md 修正安装命令截断问题
- 🎨 theme-color 从 #000000 更新为 #667eea (品牌色)

## [1.0.0] - 2026-03-19

### Added
- 🎨 初始版本发布
- 🚀 核心功能实现
  - 多面板布局系统
  - AI 辅助代码生成
  - 实时预览功能
  - 组件拖拽系统
- 🤖 AI 服务集成
  - OpenAI 支持
  - Anthropic 支持
  - 智谱 AI 支持
  - 百度文心支持
  - 阿里通义支持
  - Ollama 本地模型支持
- 👥 实时协作功能
  - 基于 Yjs 的 CRDT 协同编辑
  - WebSocket 实时同步
  - 多用户光标显示
- 📐 设计器功能
  - Figma 设计导入
  - 组件属性编辑
  - 布局管理
  - 样式系统
- 💾 数据管理
  - 本地数据库支持 (SQLite)
  - 数据库浏览器
  - CRUD 操作
- 🔌 插件系统
  - 插件注册机制
  - 插件管理界面
  - 插件热加载
- 🎨 UI 组件库
  - 基于 Radix UI 的基础组件
  - Material UI 高级组件
  - 自定义主题系统
- 🌐 国际化支持
  - 中文 (zh-CN)
  - 英文 (en-US)
- 📱 响应式设计
  - 桌面端适配
  - 移动端适配
- 🔒 安全功能
  - OpenID Connect 认证
  - JWT 令牌管理
  - RBAC 权限控制
- 📊 性能优化
  - 虚拟化列表
  - 增量渲染
  - 代码分割
  - 懒加载
- 🧪 测试框架
  - 单元测试
  - 集成测试
  - E2E 测试
- 📖 完整文档
  - README
  - 开发指南
  - API 文档
  - 组件文档

### Changed
- 优化项目结构
- 改进代码组织
- 统一代码风格

### Fixed
- 修复初始版本已知问题

---

## Version History

### Version 1.0.0 (2026-03-19)
- 🎉 首次正式发布
- ✨ 核心功能完整实现
- 📚 完整文档覆盖

---

## Release Notes

### 1.0.0 - Initial Release

这是 YYC³ AI Code 的首次正式发布，标志着项目进入稳定阶段。

#### 主要特性

1. **AI 辅助开发**
   - 支持 6 种 AI 提供商
   - 智能代码生成
   - 属性建议和错误诊断

2. **多面板布局**
   - 自由拖拽和调整大小
   - 面板合并和拆分
   - 布局预设保存

3. **实时协作**
   - 基于 CRDT 的多人编辑
   - 实时同步和冲突解决
   - 用户光标显示

4. **设计即代码**
   - Figma 设计导入
   - 自动代码生成
   - 多框架支持

5. **插件系统**
   - 可扩展的插件架构
   - 插件市场准备
   - 热加载支持

#### 技术亮点

- **Front-End-Only Full-Stack (FEFS)** 架构
- **React 18 + TypeScript 5** 现代技术栈
- **Vite 6** 高性能构建
- **Tailwind CSS 4** 原子化样式
- **Yjs** CRDT 实时协同

#### 文档完善

- 详细的 README
- 完整的开发指南
- 代码规范说明
- API 文档
- 组件使用示例

#### 已知限制

- 部分高级功能仍在开发中
- 性能优化空间
- 插件生态待完善

#### 后续计划

- AI 功能增强
- 性能优化
- 插件市场上线
- 更多框架支持

---

## Upgrade Guide

### From 0.x to 1.0.0

1. **更新依赖**
   ```bash
   pnpm install
   ```

2. **更新环境变量**
   - 复制 `.env.example` 到 `.env`
   - 更新 AI API Key 配置

3. **更新代码**
   - 检查 TypeScript 类型错误
   - 更新自定义组件

4. **测试**
   - 运行单元测试
   - 运行集成测试
   - 手动测试核心功能

---

## Breaking Changes

### 1.0.0

无破坏性变更，这是首次正式发布。

---

## Deprecations

无弃用功能。

---

## Security

### 1.0.0

- 实现 OpenID Connect 认证
- 添加 JWT 令牌管理
- 实现 RBAC 权限控制
- 输入验证和 XSS 防护
- CSRF 防护

---

## Contributors

- YanYuCloudCube Team

---

## Links

- [GitHub Repository](https://github.com/YYC-Cube/YYC3-AI-Code)
- [Documentation](https://docs.yyc3.com)
- [Issue Tracker](https://github.com/YYC-Cube/YYC3-AI-Code/issues)
- [Changelog](https://github.com/YYC-Cube/YYC3-AI-Code/blob/main/CHANGELOG.md)

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

> **「言启象限 | 语枢未来」**
> **Words Initiate Quadrants, Language Serves as Core for Future**

Made with ❤️ by YanYuCloudCube Team

</div>
