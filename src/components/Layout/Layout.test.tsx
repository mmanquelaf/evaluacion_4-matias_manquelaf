import { cleanup, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Layout } from './Layout'

vi.mock('../Navbar/Navbar', () => ({ Navbar: () => <nav aria-label="Navegación de prueba" /> }))
afterEach(cleanup)

describe('Título de una ruta válida', () => {
  it.each(['/sobre-mi', '/sobre-mi/', '/SOBRE-MI'])('mantiene el título correcto al visitar %s', (path: string) => {
    vi.spyOn(window, 'scrollTo').mockImplementation(vi.fn())
    render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="sobre-mi" element={<h1>Sobre mí</h1>} />
            <Route path="*" element={<h1>Página inexistente</h1>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Sobre mí' })).toBeTruthy()
    expect(document.title).toBe('Sobre mí · Matías')
    expect(document.activeElement?.tagName).toBe('MAIN')
  })
})
