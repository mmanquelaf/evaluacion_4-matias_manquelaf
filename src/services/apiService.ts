import type { ApiDecoder, GitHubRepo } from '../types/api'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isRepositoryUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false
  try {
    const url: URL = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'github.com' && !url.port
      && !url.username && !url.password && /^\/[^/]+\/[^/]+\/?$/.test(url.pathname)
  } catch { return false }
}

function isGitHubRepo(value: unknown): value is GitHubRepo {
  if (!isRecord(value)) return false
  return typeof value.id === 'number' && Number.isInteger(value.id) && value.id > 0
    && typeof value.name === 'string' && value.name.trim().length > 0
    && (value.description === null || typeof value.description === 'string')
    && isRepositoryUrl(value.html_url)
    && (value.language === null || typeof value.language === 'string')
    && typeof value.stargazers_count === 'number' && Number.isInteger(value.stargazers_count) && value.stargazers_count >= 0
    && typeof value.updated_at === 'string' && Number.isFinite(Date.parse(value.updated_at))
}

export function decodeRepositories(value: unknown): GitHubRepo[] {
  if (!Array.isArray(value) || !value.every(isGitHubRepo)) {
    throw new Error('GitHub devolvió datos que no pudimos interpretar. Inténtalo más tarde.')
  }
  return value
}

export async function fetchApi<T>(url: string, signal: AbortSignal, decode: ApiDecoder<T>): Promise<T> {
  const response: Response = await fetch(url, {
    signal,
    headers: { Accept: 'application/vnd.github+json' },
  })
  if (!response.ok) {
    if (response.status === 429 || (response.status === 403 && response.headers.get('x-ratelimit-remaining') === '0')) {
      throw new Error('Se alcanzó el límite temporal de consultas de GitHub. Espera un momento antes de reintentar.')
    }
    if (response.status === 403) throw new Error('GitHub no permitió consultar los repositorios. Inténtalo más tarde.')
    if (response.status === 404) throw new Error('No se encontró el perfil de GitHub. Inténtalo más tarde.')
    throw new Error('GitHub no pudo responder a la consulta. Inténtalo más tarde.')
  }
  const result: unknown = await response.json()
  return decode(result)
}
