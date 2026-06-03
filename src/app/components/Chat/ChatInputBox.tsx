import { useState, useCallback, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

interface Props {
  onSend: (mdText: string) => void;
  quoteContent?: string;
}

export default function ChatInputBox({ onSend, quoteContent }: Props) {
  const [mode, setMode] = useState<'md' | 'rich'>('md')
  const [mdVal, setMdVal] = useState('')

  useEffect(() => {
    if (quoteContent) {
      setMdVal(`> ${quoteContent.replace(/\n/g, '\n> ')}\n\n`)
    }
  }, [quoteContent])

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    editorProps: { attributes: { class: 'min-h-[120px] p-2 border rounded dark:border-gray-600' } }
  })

  const getMarkdown = useCallback(() => {
    return mode === 'md' ? mdVal : editor?.getHTML() || ''
  }, [mode, mdVal, editor])

  const handleSend = () => {
    const text = getMarkdown().trim()
    if (!text) return
    onSend(text)
    setMdVal('')
    editor?.commands.clearContent()
  }

  const insertMd = (s: string) => setMdVal(prev => prev + s)

  return (
    <div className="border dark:border-gray-700 rounded-lg p-3 sticky bottom-0 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          <button onClick={() => setMode('md')} className={`px-2 rounded ${mode === 'md' ? 'bg-blue-500 text-white' : 'border'}`}>Markdown</button>
          <button onClick={() => setMode('rich')} className={`px-2 rounded ${mode === 'rich' ? 'bg-blue-500 text-white' : 'border'}`}>富文本</button>
        </div>
        {mode === 'md' && (
          <div className="flex gap-2">
            <button onClick={() => insertMd('**加粗**')} className="px-1 border rounded">B</button>
            <button onClick={() => insertMd('\n```ts\n\n```\n')} className="px-1 border rounded">代码块</button>
            <button onClick={() => insertMd('\n| 表头 | 表头 |\n| ---- | ---- |\n| 内容 | 内容 |\n')} className="px-1 border rounded">表格</button>
          </div>
        )}
      </div>

      {mode === 'md' ? (
        <textarea
          className="w-full min-h-[120px] p-2 border rounded dark:border-gray-600 bg-transparent"
          value={mdVal}
          onChange={e => setMdVal(e.target.value)}
          placeholder="支持富文本、代码、公式、流程图..."
        />
      ) : (
        <EditorContent editor={editor} />
      )}

      <div className="flex justify-end mt-2">
        <button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white rounded">发送 (Ctrl+Enter)</button>
      </div>
    </div>
  )
}
