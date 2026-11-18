import { useEffect, useState } from 'react'
import type { MediaQueryChangeEvent, Theme, ThemePreference, ThemeProviderProps } from '../types/interactions'
import { ThemeContext } from './theme'

function readPreference(): ThemePreference {
  try {
    const saved: string | null = localStorage.getItem('portfolio-theme')
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch { return null }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [preference, setPreference] = useState<ThemePreference>(readPreference)
  const [systemTheme, setSystemTheme] = useState<Theme>(() => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const theme: Theme = preference ?? systemTheme

  useEffect(() => {
    const query: MediaQueryList = matchMedia('(prefers-color-scheme: dark)')
    const update = (event: MediaQueryChangeEvent): void => setSystemTheme(event.matches ? 'dark' : 'light')
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])

  function toggleTheme(): void {
    const next: Theme = theme === 'light' ? 'dark' : 'light'
    setPreference(next)
    try { localStorage.setItem('portfolio-theme', next) } catch { /* La elección funciona durante esta visita. */ }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
