import { createContext } from 'react'
import type { ThemeValue } from '../types/interactions'

export const ThemeContext = createContext<ThemeValue | null>(null)
