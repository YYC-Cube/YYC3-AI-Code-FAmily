/**
 * file: clipboard.ts
 * description: 剪贴板工具函数 — 支持现代 Clipboard API 和降级方案
 * author: YanYuCloudCube Team <admin@0379.email>
 * version: v1.0.0
 * created: 2026-03-08
 * updated: 2026-04-04
 * status: stable
 * tags: utils,clipboard,copy
 */

/**
 * Copy text to clipboard with fallback for sandboxed iframes
 * where the Clipboard API is blocked by permissions policy.
 */
export function copyToClipboard(text: string): void {
  // Try modern Clipboard API first
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    return;
  }
  fallbackCopy(text);
}

function fallbackCopy(text: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.top = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  try {
    document.execCommand('copy');
  } catch {
    // silently fail
  }
  document.body.removeChild(textarea);
}
