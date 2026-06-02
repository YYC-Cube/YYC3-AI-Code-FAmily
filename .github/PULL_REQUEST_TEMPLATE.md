<!--
🙏 感谢你的 Pull Request！请按以下模板填写，帮助我们快速 review。
-->

## 📝 变更描述

<!-- 简要描述这个 PR 做了什么 -->

## 🎯 关联 Issue

<!-- 关联的 Issue 编号，例如：Fixes #123 / Closes #456 / Refs #789 -->

Fixes #

## 📋 变更类型

请勾选适用的类型：

- [ ] 🐛 **Bug 修复** (不兼容变更的修复)
- [ ] ✨ **新功能** (不兼容变更的新功能)
- [ ] 💥 **破坏性变更** (修复或功能会导致现有功能不兼容)
- [ ] 📚 **文档更新**
- [ ] 🎨 **样式 / UI 改进**
- [ ] ♻️ **代码重构** (无功能变更)
- [ ] ⚡ **性能优化**
- [ ] 🧪 **测试补充**
- [ ] 🔧 **构建 / 依赖 / CI 配置**
- [ ] 🌐 **国际化**

## 🛣️ 影响路由

- [ ] `/` (Home)
- [ ] `/designer` (Designer System)
- [ ] `/ai-code` (AI Code System)
- [ ] `/settings` (Settings)
- [ ] 全系统
- [ ] 不影响路由 (例如：构建、文档)

## ✅ 检查清单

请确认已完成以下所有项：

### 📋 通用

- [ ] 📖 我已阅读 [CONTRIBUTING.md](../CONTRIBUTING.md)
- [ ] 📝 我的 commit message 遵循 [Conventional Commits](https://www.conventionalcommits.org/)
- [ ] 🎯 我的代码遵循项目的代码规范（ESLint + Prettier）
- [ ] 📚 我已更新相关文档（如适用）

### 🧪 测试

- [ ] ✅ 我已为新增功能添加测试用例
- [ ] ✅ 所有现有测试都通过 (`pnpm test`)
- [ ] ✅ 新增测试覆盖了主要场景

### 🔍 代码质量

- [ ] ✅ `pnpm lint` 通过（0 warnings）
- [ ] ✅ `pnpm typecheck` 通过
- [ ] ✅ `pnpm build` 成功
- [ ] ✅ 我已 self-review 自己的代码
- [ ] ✅ 我已移除所有调试代码（console.log 等）

### 🌐 兼容性（如适用）

- [ ] ✅ 我的变更向后兼容
- [ ] ✅ 我已处理边界情况
- [ ] ✅ 我已考虑性能影响

## 📸 截图 / 录屏

<!-- 如适用，请添加截图或录屏展示 UI 变更 -->

## 🧪 测试结果

```bash
# 请粘贴以下命令的输出：
pnpm test 2>&1 | tail -5
pnpm lint
pnpm typecheck
```

## ➕ 补充信息

<!-- 任何其他需要 reviewer 知道的信息 -->

---

### 🎁 Reviewer 提示

- 📌 请关注 [关键变更](变更链接)
- ⚠️ 请特别注意 [潜在风险](风险链接)
- 💡 建议 review 顺序：`文件 A` → `文件 B` → `文件 C`

---

<div align="center">

**⭐ 如果这个 PR 对你有帮助，请给一个赞！**

</div>
