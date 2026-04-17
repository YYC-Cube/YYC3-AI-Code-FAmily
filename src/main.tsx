/**
 * file: main.tsx
 * description: YYC³ 应用入口文件 — 初始化 React 应用并挂载到 DOM
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.1
 * created: 2026-03-19
 * updated: 2026-04-04
 * status: stable
 * license: MIT
 * copyright: Copyright (c) 2026 YanYuCloudCube Team
 * tags: app,entry,react,init
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

// 全局样式
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
