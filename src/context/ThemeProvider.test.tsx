import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from '../hooks/useTheme'
import { ThemeProvider } from './ThemeProvider'

function ThemeControl() {
  const { theme, toggleTheme } = useTheme()
  return <button type="button" onClick={toggleTheme}>{theme}</button>
}

function createMediaQuery() {
  const target: EventTarget = new EventTarget()
  const media = {
    matches: false,
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn(target.addEventListener.bind(target)),
    removeEventListener: vi.fn(target.removeEventListener.bind(target)),
  }
  vi.stubGlobal('matchMedia', vi.fn(() => media))
  return {
    media,
    change(dark: boolean): void {
      media.matches = dark
      const event: Event = new Event('change')
      Object.defineProperty(event, 'matches', { value: dark })
      target.dispatchEvent(event)
    },
  }
}

beforeEach(() => { localStorage.clear() })
afterEach(() => {
  cleanup()
  delete document.documentElement.dataset.theme
})

describe('Preferencia global de tema', () => {
  it('sigue el sistema hasta que se elige un tema manualmente', () => {
    const query = createMediaQuery()
    render(<ThemeProvider><ThemeControl /></ThemeProvider>)
    expect(screen.getByRole('button', { name: 'light' })).toBeTruthy()
    act(() => query.change(true))
    expect(document.documentElement.dataset.theme).toBe('dark')
    fireEvent.click(screen.getByRole('button', { name: 'dark' }))
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
    act(() => { query.change(false); query.change(true) })
    expect(screen.getByRole('button', { name: 'light' })).toBeTruthy()
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('recupera la preferencia guardada aunque el sistema use otro tema', () => {
    createMediaQuery()
    localStorage.setItem('portfolio-theme', 'dark')
    const first = render(<ThemeProvider><ThemeControl /></ThemeProvider>)
    expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy()
    first.unmount()
    render(<ThemeProvider><ThemeControl /></ThemeProvider>)
    expect(screen.getByRole('button', { name: 'dark' })).toBeTruthy()
  })

  it('permite cambiar de tema sin almacenamiento y limpia su listener', () => {
    const query = createMediaQuery()
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Bloqueado') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Bloqueado') })
    const { unmount } = render(<ThemeProvider><ThemeControl /></ThemeProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'light' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    unmount()
    expect(query.media.removeEventListener).toHaveBeenCalledTimes(1)
  })
})
