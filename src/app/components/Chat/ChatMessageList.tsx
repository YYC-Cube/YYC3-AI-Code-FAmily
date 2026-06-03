import { ChatMessage } from '@/types/chat';
import { useEffect, useRef } from 'react';
import AiMessageRender from './AiMessageRender';

interface Props {
  messages: ChatMessage[];
  activeMsgId?: string;
  streamingText: string;
  streamingId: string;
  onInsertEditor?: (code: string) => void;
  onRegenerate: (msgId: string) => void;
  onQuote: (content: string) => void;
}

export default function ChatMessageList({ messages, activeMsgId, streamingText, streamingId, onInsertEditor, onRegenerate, onQuote }: Props) {
  const msgRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    if (activeMsgId && msgRefs.current[activeMsgId]) {
      msgRefs.current[activeMsgId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [activeMsgId, messages])

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto p-2 mb-4">
      {messages.map((msg) => (
        <div key={msg.id} ref={(el) => { msgRefs.current[msg.id] = el }}
          className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
          {msg.role === 'user' ? (
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[80%]">{msg.content}</div>
          ) : (
            <AiMessageRender
              message={streamingId === msg.id ? { ...msg, content: streamingText } : msg}
              onInsertEditor={onInsertEditor}
              onRegenerate={onRegenerate}
              onQuote={onQuote}
            />
          )}
        </div>
      ))}
    </div>
  );
}
