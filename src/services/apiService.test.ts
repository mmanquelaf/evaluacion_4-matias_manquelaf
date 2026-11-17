import { describe, expect, it, vi } from 'vitest'
import { repositoryFixtures } from '../data/repositoryFixtures.test-support'
import { decodeRepositories, fetchApi } from './apiService'

describe('Contrato de GitHub', () => {
  it('acepta repositorios completos y campos opcionales nulos', () => {
    expect(decodeRepositories(repositoryFixtures)).toEqual(repositoryFixtures)
    expect(decodeRepositories([])).toEqual([])
  })

  it.each([
    { message: 'Not Found' },
    [{ ...repositoryFixtures[0], stargazers_count: '3' }],
    [{ ...repositoryFixtures[0], updated_at: 'fecha inválida' }],
    [{ ...repositoryFixtures[0], html_url: 'javascript:alert(1)' }],
    [{ ...repositoryFixtures[0], html_url: 'https://otro-sitio.example/repo' }],
  ])('rechaza respuestas incompatibles o enlaces inválidos: %j', (value: unknown) => {
    expect(() => decodeRepositories(value)).toThrow('no pudimos interpretar')
  })

  it.each([404, 429, 500])('rechaza HTTP %s en vez de tratar el error como datos', async (status: number) => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status })))
    await expect(fetchApi('/repos', new AbortController().signal, decodeRepositories)).rejects.toThrow()
  })

  it('no acepta una respuesta exitosa cuyo JSON sea inválido', async () => {
    vi.stubGlobal('fetch', vi.fn<typeof fetch>().mockResolvedValue(new Response('{invalid', { status: 200 })))
    await expect(fetchApi('/repos', new AbortController().signal, decodeRepositories)).rejects.toBeInstanceOf(SyntaxError)
  })
})
