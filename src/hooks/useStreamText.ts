import { useState, useRef } from 'react'

export function useStreamText() {
  const [renderText, setRenderText] = useState('')
  const finishRef = useRef(false)

  const startStream = async (fullStr: string, speed = 12) => {
    finishRef.current = false
    setRenderText('')
    let cur = ''
    for (let i = 0; i < fullStr.length; i++) {
      if (finishRef.current) break
      cur += fullStr[i]
      setRenderText(cur)
      await new Promise(r => setTimeout(r, speed))
    }
  }

  const fastFinish = (fullStr: string) => {
    finishRef.current = true
    setRenderText(fullStr)
  }

  return { renderText, startStream, fastFinish }
}
