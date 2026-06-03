import { visit } from 'unist-util-visit'

type Opt = { onInsertEditor?: (code: string) => void }

/* eslint-disable @typescript-eslint/no-explicit-any */
export const codeBlockPlugin = (_opt: Opt): ((tree: any) => void) => {
  return (tree: any) => {
    visit(tree, 'element', (node: Record<string, any>) => {
      if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
        const codeText = (node.children[0].children?.[0]?.value ?? '') as string
        node.properties = { ...node.properties, className: 'relative group' }
        node.children.unshift({
          type: 'element',
          tagName: 'div',
          properties: { className: 'absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity' },
          children: [
            {
              type: 'element',
              tagName: 'button',
              properties: {
                className: 'px-2 py-1 bg-gray-500 text-white text-xs rounded',
                onClick: `navigator.clipboard.writeText(${JSON.stringify(codeText)})`
              },
              children: [{ type: 'text', value: '复制' }]
            },
            {
              type: 'element',
              tagName: 'button',
              properties: {
                className: 'px-2 py-1 bg-blue-600 text-white text-xs rounded',
                onClick: `window.__insertCode(${JSON.stringify(codeText)})`
              },
              children: [{ type: 'text', value: '填入编辑器' }]
            }
          ]
        })
      }
    })
  }
}
