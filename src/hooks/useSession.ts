import { ChatMessage, ChatSession } from '@/types/chat'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const SESSION_STORE_KEY = 'yyc3-chat-sessions'

export function useChatSession() {
  const [sessionList, setSessionList] = useState<ChatSession[]>([])
  const [currentSid, setCurrentSid] = useState('')
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const raw = localStorage.getItem(SESSION_STORE_KEY)
    const arr: ChatSession[] = raw ? JSON.parse(raw) : []
    setSessionList(arr)
    if (arr.length > 0) {
      setCurrentSid(arr[0].sid)
    } else {
      const sid = uuidv4()
      const newItem: ChatSession = {
        sid,
        title: `会话 ${new Date().toLocaleString().slice(5, 16)}`,
        createAt: Date.now(),
        updateAt: Date.now(),
        list: []
      }
      setSessionList([newItem])
      setCurrentSid(sid)
    }
  }, [])

  const saveLocal = (list: ChatSession[]) => {
    localStorage.setItem(SESSION_STORE_KEY, JSON.stringify(list))
    setSessionList(list)
  }

  const createNewSession = () => {
    const sid = uuidv4()
    const newItem: ChatSession = {
      sid,
      title: `会话 ${new Date().toLocaleString().slice(5, 16)}`,
      createAt: Date.now(),
      updateAt: Date.now(),
      list: []
    }
    const next = [...sessionList, newItem]
    saveLocal(next)
    setCurrentSid(sid)
  }

  const delSession = (sid: string) => {
    const next = sessionList.filter(s => s.sid !== sid)
    saveLocal(next)
    if (currentSid === sid) {
      if (next.length > 0) setCurrentSid(next[0].sid)
      else createNewSession()
    }
  }

  const updateCurrentMsg = (newMsgList: ChatMessage[]) => {
    const next = sessionList.map(s => {
      if (s.sid === currentSid) {
        return {
          ...s,
          list: newMsgList,
          updateAt: Date.now(),
          title: newMsgList.filter(m => m.role === 'user')[0]?.content.slice(0, 24) || s.title
        }
      }
      return s
    })
    saveLocal(next)
  }

  const getCurrentMsg = () => {
    const cur = sessionList.find(s => s.sid === currentSid)
    return cur?.list || []
  }

  return {
    sessionList, currentSid,
    createNewSession, delSession, setCurrentSid,
    updateCurrentMsg, getCurrentMsg
  }
}
