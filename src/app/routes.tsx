/**
 * file: routes.tsx
 * description: YYC3 应用路由配置 — 首页 / Designer / AI Code 三大入口，含路由级 Error Boundary
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.2.0
 * created: 2026-03-08
 * updated: 2026-06-04
 * status: dev
 * license: MIT
 * copyright: Copyright (c) 2026 YanYuCloudCube Team
 * tags: router,routes,navigation,app,error-boundary
 */

import { lazy, Suspense } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createBrowserRouter } from 'react-router';
import { ErrorBoundary } from './components/ErrorBoundary';
import { DesignerProvider } from './store';

// 路由级代码分割 — 每个路由独立 chunk，减少首屏加载体积
const AIHomePage = lazy(() => import('./components/home/AIHomePage').then(m => ({ default: m.AIHomePage })));
const AICodeSystem = lazy(() => import('./components/ai-code/AICodeSystem').then(m => ({ default: m.AICodeSystem })));
const ChatPage = lazy(() => import('@/pages/ChatPage').then(m => ({ default: m.default })));
const DesignerLayout = lazy(() => import('./components/designer/DesignerLayout').then(m => ({ default: m.DesignerLayout })));
const SettingsPage = lazy(() => import('./components/settings/SettingsPage').then(m => ({ default: m.SettingsPage })));

function RouteSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen bg-gray-950 text-gray-400 text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>加载中...</span>
        </div>
      </div>
    }>
      {children}
    </Suspense>
  );
}

function DesignerPage() {
  return (
    <ErrorBoundary level="route" name="Designer" autoRecoveryMs={3000} maxAutoRecovery={3}>
      <RouteSuspense>
        <DesignerProvider>
          <DndProvider backend={HTML5Backend}>
            <DesignerLayout />
          </DndProvider>
        </DesignerProvider>
      </RouteSuspense>
    </ErrorBoundary>
  );
}

function AICodePage() {
  return (
    <ErrorBoundary level="route" name="AI-Code-Workbench" autoRecoveryMs={3000} maxAutoRecovery={3}>
      <RouteSuspense>
        <AICodeSystem />
      </RouteSuspense>
    </ErrorBoundary>
  );
}

function HomePage() {
  return (
    <ErrorBoundary level="route" name="Home" autoRecoveryMs={2000} maxAutoRecovery={5}>
      <RouteSuspense>
        <AIHomePage />
      </RouteSuspense>
    </ErrorBoundary>
  );
}

function SettingsPageWrapper() {
  return (
    <ErrorBoundary level="route" name="Settings" autoRecoveryMs={2000} maxAutoRecovery={3}>
      <RouteSuspense>
        <SettingsPage />
      </RouteSuspense>
    </ErrorBoundary>
  );
}

function ChatPageWrapper() {
  return (
    <ErrorBoundary level="route" name="Chat" autoRecoveryMs={2000} maxAutoRecovery={3}>
      <RouteSuspense>
        <ChatPage />
      </RouteSuspense>
    </ErrorBoundary>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/designer',
    Component: DesignerPage,
  },
  {
    path: '/ai-code',
    Component: AICodePage,
  },
  {
    path: '/settings',
    Component: SettingsPageWrapper,
  },
  {
    path: '/chat',
    Component: ChatPageWrapper,
  },
]);
