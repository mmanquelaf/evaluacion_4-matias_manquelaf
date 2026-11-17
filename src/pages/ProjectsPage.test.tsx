import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { githubApiUrl } from '../data/apiData'
import { repositoryFixtures } from '../data/repositoryFixtures.test-support'
import type { GitHubRepo } from '../types/api'
import { ProjectsPage } from './ProjectsPage'

const selectedRepositories: GitHubRepo[] = [
  { ...repositoryFixtures[0], name: 'EID-SpaceShooter', html_url: 'https://github.com/mmanquelaf/EID-SpaceShooter', description: null },
  { ...repositoryFixtures[1], name: 'portafolio', html_url: 'https://github.com/mmanquelaf/portafolio' },
  repositoryFixtures[2],
]

afterEach(cleanup)

describe('Dos proyectos seleccionados', () => {
  it('muestra solo EV2 y SpaceShooter, sin buscador ni tarjetas repetidas', async () => {
    let resolveResponse!: (response: Response) => void
    const pending: Promise<Response> = new Promise(resolve => { resolveResponse = resolve })
    const fetchMock = vi.fn<typeof fetch>().mockReturnValue(pending)
    vi.stubGlobal('fetch', fetchMock)
    render(<ProjectsPage />)
    expect(screen.getByText('Cargando datos de GitHub…')).toBeTruthy()
    expect(screen.getAllByRole('article')).toHaveLength(2)
    await act(async () => { resolveResponse(Response.json(selectedRepositories)) })
    await screen.findByText('Repositorio: EID-SpaceShooter')
    expect(screen.getByText('Repositorio: portafolio')).toBeTruthy()
    expect(screen.getByText('3 estrellas')).toBeTruthy()
    expect(screen.getByText('Lenguaje principal: Python')).toBeTruthy()
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('heading', { name: 'Portafolio · EV2' })).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'SpaceShooter' })).toBeTruthy()
    expect(screen.queryByText('apuntes')).toBeNull()
    expect(screen.queryByRole('searchbox')).toBeNull()
    expect(screen.queryByRole('combobox')).toBeNull()
    expect(fetchMock.mock.calls[0][0]).toBe(githubApiUrl)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('mantiene los dos proyectos durante el error y recupera los datos al reintentar', async () => {
    const fetchMock = vi.fn<typeof fetch>()
      .mockResolvedValueOnce(new Response(null, { status: 403, headers: { 'x-ratelimit-remaining': '0' } }))
      .mockImplementation(async () => Response.json(selectedRepositories))
    vi.stubGlobal('fetch', fetchMock)
    render(<ProjectsPage />)
    expect((await screen.findByRole('alert')).textContent).toContain('límite temporal')
    expect(screen.getAllByRole('article')).toHaveLength(2)
    fireEvent.click(screen.getByRole('button', { name: 'Volver a intentar' }))
    expect(document.activeElement).toBe(screen.getByRole('region', { name: 'Proyectos seleccionados' }))
    await screen.findByText('Repositorio: EID-SpaceShooter')
    expect(screen.queryByRole('alert')).toBeNull()
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('avisa si la consulta no incluye esos repositorios y conserva sus enlaces', async () => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockImplementation(async () => Response.json([])))
    render(<ProjectsPage />)
    await waitFor(() => expect(screen.getByText(/Algunos datos de GitHub no están disponibles/)).toBeTruthy())
    expect(screen.getAllByRole('article')).toHaveLength(2)
    expect(screen.getByRole('link', { name: /Ver repositorio de SpaceShooter/ }).getAttribute('href')).toBe('https://github.com/mmanquelaf/EID-SpaceShooter')
    expect(screen.queryByText(/estrellas/)).toBeNull()
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
