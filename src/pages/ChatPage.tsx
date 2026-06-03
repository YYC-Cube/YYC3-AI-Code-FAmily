import ChatInputBox from '@/app/components/Chat/ChatInputBox'
import ChatMessageList from '@/app/components/Chat/ChatMessageList'
import { useChatSession } from '@/hooks/useSession'
import { useStreamText } from '@/hooks/useStreamText'
import { useTheme } from '@/hooks/useTheme'
import { ChatMessage } from '@/types/chat'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

// 模拟AI流式响应（替换为你的真实接口）
const fetchAIResponse = async (_prompt: string) => {
  await new Promise(r => setTimeout(r, 1000))
  return `## YYC³ 智能编程助手回复
支持**富文本**、代码块、公式、流程图

\`\`\`typescript
// 智能代码生成
export const demo = () => {
  console.log('YYC³-Family-AI')
  return '离线可用·本地优先'
}
\`\`\`

数学公式：$E=mc^2$
> 引用文本
任务清单：
- [x] 富文本渲染
- [x] 流式打字机
- [x] 会话管理
`
}

export default function ChatPage() {
  // 核心钩子
  const { mode, isDark: _, setMode } = useTheme()
  const { renderText, startStream } = useStreamText()
  const { sessionList, currentSid, createNewSession, delSession, setCurrentSid, updateCurrentMsg, getCurrentMsg } = useChatSession()

  // 状态管理
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [quoteContent, setQuoteContent] = useState('')
  const [activeMsgId, setActiveMsgId] = useState('')
  const [streamingMsgId, setStreamingMsgId] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [searchResult, setSearchResult] = useState<{ sid: string; msg: ChatMessage }[]>([])

  // 会话同步
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setMessages(getCurrentMsg()), [currentSid])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { updateCurrentMsg(messages) }, [messages])

  // 1. 发送消息
  const handleSend = async (text: string) => {
    const userMsg: ChatMessage = { id: uuidv4(), role: 'user', content: text, folded: false, timestamp: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setQuoteContent('')

    const tempAiId = uuidv4()
    setStreamingMsgId(tempAiId)
    setMessages(prev => [...prev, { id: tempAiId, role: 'ai', content: '', folded: false, timestamp: Date.now() }])
    setActiveMsgId(tempAiId)

    const fullRes = await fetchAIResponse(text)
    await startStream(fullRes)

    setMessages(prev => prev.map(m => m.id === tempAiId ? { ...m, content: fullRes, folded: fullRes.length > 800 } : m))
    setStreamingMsgId('')
    setActiveMsgId(tempAiId)
  }

  // 2. 重新生成
  const handleRegenerate = async (msgId: string) => {
    const idx = messages.findIndex(m => m.id === msgId)
    if (idx < 1) return
    const userMsg = messages[idx - 1]

    setStreamingMsgId(msgId)
    setActiveMsgId(msgId)
    const fullRes = await fetchAIResponse(userMsg.content)
    await startStream(fullRes)

    setMessages(prev => prev.map(m => m.id === msgId ? { ...m, content: fullRes } : m))
    setStreamingMsgId('')
  }

  // 3. 引用追问
  const handleQuote = (content: string) => setQuoteContent(content)

  // 4. 全局搜索
  const doSearch = () => {
    if (!searchKey.trim()) return setSearchResult([])
    const res: typeof searchResult = []
    sessionList.forEach(ss => ss.list.forEach(m => m.content.toLowerCase().includes(searchKey.toLowerCase()) && res.push({ sid: ss.sid, msg: m })))
    setSearchResult(res)
  }

  // 5. 跳转搜索结果
  const jumpToMsg = (sid: string, mid: string) => {
    setCurrentSid(sid)
    setActiveMsgId(mid)
    setSearchKey('')
    setSearchResult([])
  }

  // 6. 导出对话
  const downloadFile = (fname: string, text: string, mime: string) => {
    const blob = new Blob([text], { type: mime })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = fname
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const exportMd = () => {
    let md = `# YYC³-Family-AI 对话导出\n${new Date().toLocaleString()}\n\n`
    messages.forEach(m => md += `### ${m.role === 'user' ? '用户' : 'AI'}\n${m.content}\n\n`)
    downloadFile(`${Date.now()}_chat.md`, md, 'text/markdown')
  }
  const exportJson = () => downloadFile(`${Date.now()}_chat.json`, JSON.stringify(messages, null, 2), 'application/json')

  // 代码回填
  // eslint-disable-next-line no-console
  window.__insertCode = (code: string) => console.log('回填到编辑器：', code)

  return (
    <div className={`flex h-screen text-gray-900 dark:text-white ${_ ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* 左侧会话栏 */}
      <div className="w-56 border-r dark:border-gray-700 p-3 flex flex-col">
        <button onClick={createNewSession} className="w-full py-2 bg-blue-500 text-white rounded mb-3">+ 新建会话</button>
        <div className="flex-1 overflow-auto space-y-1">
          {sessionList.map(ss => (
            <div key={ss.sid} className={`flex justify-between items-center p-2 rounded text-sm ${currentSid === ss.sid ? 'bg-blue-100 dark:bg-blue-900' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              <span className="truncate flex-1 cursor-pointer" onClick={() => setCurrentSid(ss.sid)}>{ss.title}</span>
              <button onClick={() => delSession(ss.sid)} className="text-red-500 ml-1">×</button>
            </div>
          ))}
        </div>
      </div>

      {/* 右侧主区域 */}
      <div className="flex-1 flex flex-col p-4">
        {/* 顶部工具栏 */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-xl font-bold">YYC³-Family-AI 智能编程助手</h1>
          <div className="flex gap-1">
            <button onClick={() => setMode('system')} className={`px-2 rounded text-sm ${mode === 'system' ? 'bg-sky-500 text-white' : 'border'}`}>系统</button>
            <button onClick={() => setMode('light')} className={`px-2 rounded text-sm ${mode === 'light' ? 'bg-amber-400' : 'border'}`}>浅色</button>
            <button onClick={() => setMode('dark')} className={`px-2 rounded text-sm ${mode === 'dark' ? 'bg-gray-700 text-white' : 'border'}`}>暗黑</button>
          </div>
        </div>

        {/* 搜索栏 */}
        <div className="flex gap-2 mb-3">
          <input value={searchKey} onChange={e => setSearchKey(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="全局搜索对话..." className="flex-1 border px-2 py-1 rounded dark:bg-gray-800 dark:border-gray-700" />
          <button onClick={doSearch} className="px-3 py-1 bg-blue-500 text-white rounded">搜索</button>
          <button onClick={exportMd} className="px-3 py-1 border rounded">导出MD</button>
          <button onClick={exportJson} className="px-3 py-1 border rounded">导出JSON</button>
        </div>

        {/* 搜索结果 */}
        {searchResult.length > 0 && (
          <div className="border rounded p-2 mb-3 max-h-32 overflow-auto dark:border-gray-700">
            {searchResult.map(({ sid, msg }) => (
              <div key={msg.id} onClick={() => jumpToMsg(sid, msg.id)} className="py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 text-sm">
                {msg.content.slice(0, 50)}...
              </div>
            ))}
          </div>
        )}

        {/* 消息列表 */}
        <ChatMessageList
          messages={messages}
          activeMsgId={activeMsgId}
          streamingText={renderText}
          streamingId={streamingMsgId}
          onRegenerate={handleRegenerate}
          onQuote={handleQuote}
        />

        {/* 输入框 */}
        <ChatInputBox onSend={handleSend} quoteContent={quoteContent} />
      </div>
    </div>
  )
}
