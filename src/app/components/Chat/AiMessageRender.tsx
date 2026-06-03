import { ChatMessage } from '@/types/chat'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import { codeBlockPlugin } from './CodeBlockWrap'

interface Props {
  message: ChatMessage;
  onInsertEditor?: (code: string) => void;
  onRegenerate: (msgId: string) => void;
  onQuote: (content: string) => void;
}

export default function AiMessageRender({ message, onInsertEditor, onRegenerate, onQuote }: Props) {
  const { id, content, folded } = message;
  const [isFolded, setIsFolded] = useState(folded);
  const needFold = content.length > 800 || content.includes('```');

  return (
    <div className="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full max-w-[85%]">
      <div className="absolute top-2 right-2 flex gap-2 text-xs opacity-50 hover:opacity-100 transition-opacity">
        {needFold && (
          <button onClick={() => setIsFolded(!isFolded)} className="px-2 py-1 bg-gray-500 text-white rounded">
            {isFolded ? '展开' : '折叠'}
          </button>
        )}
        <button onClick={() => onQuote(content)} className="px-2 py-1 bg-blue-500 text-white rounded">引用</button>
        <button onClick={() => onRegenerate(id)} className="px-2 py-1 bg-green-500 text-white rounded">重新生成</button>
      </div>

      <div className={`prose dark:prose-invert max-w-none break-words ${isFolded ? 'max-h-[200px] overflow-hidden' : ''}`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeKatex, [codeBlockPlugin, { onInsertEditor }]]}
        >
          {content}
        </ReactMarkdown>
      </div>

      {isFolded && needFold && (
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100 dark:from-gray-800 to-transparent flex justify-center items-center">
          <button onClick={() => setIsFolded(false)} className="text-blue-500 font-medium">点击展开完整内容</button>
        </div>
      )}
    </div>
  );
}
