/**
 * file: skeleton.tsx
 * description: Skeleton 骨架屏组件 — 内容加载占位骨架屏组件
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-03-08
 * updated: 2026-04-04
 * status: stable
 * tags: ui,skeleton,component,loading
 */

import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
