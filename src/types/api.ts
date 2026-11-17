export interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  updated_at: string
}

export type ApiDecoder<T> = (value: unknown) => T
export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}
export interface FetchResult<T> extends FetchState<T> { retry: () => void }
export interface StatusMessageProps {
  kind: 'loading' | 'error' | 'empty'
  message: string
  onRetry?: () => void
}
