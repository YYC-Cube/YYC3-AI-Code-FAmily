import { useEffect, useState } from 'react'
import { ThemeMode } from '@/types/chat'

const THEME_KEY = 'yyc3-theme-mode'

export function useTheme() {
  const [mode, setModeRaw] = useState<ThemeMode>(() => {
    const cache = localStorage.getItem(THEME_KEY)
    return (cache as ThemeMode) || 'system'
  })
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const calcDark = () => {
      if (mode === 'system') return media.matches
      return mode === 'dark'
    }
    setIsDark(calcDark())

    const handler = () => setIsDark(calcDark())
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [mode])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  const setMode = (v: ThemeMode) => {
    setModeRaw(v)
    localStorage.setItem(THEME_KEY, v)
  }

  return { mode, isDark, setMode }
}
