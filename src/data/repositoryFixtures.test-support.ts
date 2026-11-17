import type { GitHubRepo } from '../types/api'

export const repositoryFixtures: GitHubRepo[] = [
  { id: 1, name: 'juego-espacial', description: 'Juego de práctica', language: 'Python', stargazers_count: 3, html_url: 'https://github.com/example/juego-espacial', updated_at: '2026-11-17T12:00:00Z' },
  { id: 2, name: 'portafolio-web', description: 'Sitio personal', language: 'TypeScript', stargazers_count: 0, html_url: 'https://github.com/example/portafolio-web', updated_at: '2026-11-16T12:00:00Z' },
  { id: 3, name: 'apuntes', description: null, language: null, stargazers_count: 0, html_url: 'https://github.com/example/apuntes', updated_at: '2026-11-15T12:00:00Z' },
]
