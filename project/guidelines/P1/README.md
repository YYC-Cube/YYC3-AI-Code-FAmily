# P1-核心功能

> Source: YYC-Cube/YanYuCloud @ YYC3-Design-Prompt/P1-核心功能/
> 完整内容: https://github.com/YYC-Cube/YanYuCloud/tree/main/YYC3-Design-Prompt/P1-核心功能

## 文件清单

| 文件 | 大小 | 说明 |
|------|------|------|
| YYC3-P1-前端-多面板布局.md | 36.1KB | 多面板布局系统：LayoutProvider + Workspace + PanelContainer + TabBar + 拖拽/缩放/合并/分割 |
| YYC3-P1-前端-代码编辑器.md | 22.8KB | Monaco Editor 集成、语法高亮、自动补全、多标签编辑 |
| YYC3-P1-前端-实时预览.md | 18.1KB | iframe sandbox 实时预览、Diff-Patch-Reload、debounce 300ms |
| YYC3-P1-前端-本地存储同步.md | 29.1KB | IndexedDB + 宿主机文件系统双写同步、冲突检测与解决 |
| YYC3-P1-布局-拖拽交互.md | 20.7KB | react-dnd 拖拽、边缘捕捉(Snap)、面板合并指示 |
| YYC3-P1-状态-全局状态管理.md | 20.8KB | Zustand + Immer 状态管理、持久化(localStorage/IndexedDB) |
| YYC3-P1-状态-服务端状态.md | 16.0KB | React Query 服务端状态、缓存策略、乐观更新 |
| YYC3-P1-AI-多提供商集成.md | 17.7KB | AIProviderManager: OpenAI/Anthropic/智谱AI 统一接口、自动故障切换、流式输出 |
| YYC3-P1-AI-智能代码生成.md | 16.1KB | AI 辅助代码生成、属性智能补全、错误诊断 |

## 核心功能要点

### 多面板布局系统
- 10 种面板类型: code-editor, file-browser, preview, terminal, debug, output, search, ai-chat, database, version-control
- 面板操作: 创建/删除/移动/缩放/锁定/最小化/最大化/分割/合并
- Tab 系统: 多标签、拖拽排序、固定/修改/错误状态指示
- 布局持久化: localStorage 自动保存/恢复

### AI 多提供商架构
```
AIProviderManager
├── OpenAIProvider (priority: 10)
├── AnthropicProvider (priority: 9)
├── ZhipuProvider
├── BaiduProvider
├── AliyunProvider
└── OllamaProvider
```
- 统一 `AIProviderInterface`: request() + streamRequest() + getModels()
- 自动故障切换、优先级排序、流式 SSE 支持
