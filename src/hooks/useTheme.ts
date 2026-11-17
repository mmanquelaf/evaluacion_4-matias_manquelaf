import { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import type { ThemeValue } from '../types/interactions'

export function useTheme(): ThemeValue {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme debe utilizarse dentro de ThemeProvider.')
  return context
}
