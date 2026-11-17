import { act, cleanup, renderHook, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiTimeoutMs } from '../data/apiData'
import { repositoryFixtures } from '../data/repositoryFixtures.test-support'
import { decodeRepositories } from '../services/apiService'
import type { GitHubRepo } from '../types/api'
import { useFetchApi } from './useFetchApi'

afterEach(() => { cleanup(); vi.useRealTimers() })

describe('Ciclo de vida de la consulta', () => {
  it('cancela al desmontar y elimina el temporizador', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn<typeof fetch>().mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('Cancelada', 'AbortError')))
    }))
    vi.stubGlobal('fetch', fetchMock)
    const { unmount } = renderHook(() => useFetchApi<GitHubRepo[]>('/repos', decodeRepositories))
    await act(async () => { unmount() })
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true)
    expect(vi.getTimerCount()).toBe(0)
  })

  it('ignora una respuesta anterior aunque llegue después de la nueva', async () => {
    let resolveFirst!: (response: Response) => void
    let resolveSecond!: (response: Response) => void
    const first: Promise<Response> = new Promise(resolve => { resolveFirst = resolve })
    const second: Promise<Response> = new Promise(resolve => { resolveSecond = resolve })
    const fetchMock = vi.fn<typeof fetch>().mockReturnValueOnce(first).mockReturnValueOnce(second)
    vi.stubGlobal('fetch', fetchMock)
    const { result, rerender } = renderHook(({ url }: { url: string }) => useFetchApi<GitHubRepo[]>(url, decodeRepositories), { initialProps: { url: '/primera' } })
    rerender({ url: '/segunda' })
    expect(fetchMock.mock.calls[0][1]?.signal?.aborted).toBe(true)
    await act(async () => { resolveSecond(Response.json([repositoryFixtures[1]])) })
    await waitFor(() => expect(result.current.data?.[0].name).toBe('portafolio-web'))
    await act(async () => { resolveFirst(Response.json([repositoryFixtures[0]])) })
    expect(result.current.data?.[0].name).toBe('portafolio-web')
    expect(result.current.error).toBeNull()
  })

  it('muestra fallo de conexión con loading desactivado', async () => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockRejectedValue(new TypeError('Failed to fetch')))
    const { result } = renderHook(() => useFetchApi<GitHubRepo[]>('/repos', decodeRepositories))
    await waitFor(() => expect(result.current.error).toContain('Revisa tu conexión'))
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeNull()
  })

  it('cancela una consulta lenta y ofrece reintento sin repetirla automáticamente', async () => {
    vi.useFakeTimers()
    const fetchMock = vi.fn<typeof fetch>().mockImplementation((_input, init) => new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(new DOMException('Cancelada', 'AbortError')))
    }))
    vi.stubGlobal('fetch', fetchMock)
    const { result } = renderHook(() => useFetchApi<GitHubRepo[]>('/repos', decodeRepositories))
    await act(async () => { await vi.advanceTimersByTimeAsync(apiTimeoutMs) })
    expect(result.current.error).toContain('tardó demasiado')
    expect(result.current.loading).toBe(false)
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })
})
