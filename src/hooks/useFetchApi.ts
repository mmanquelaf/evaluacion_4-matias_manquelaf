import { useEffect, useState } from 'react'
import { apiTimeoutMs } from '../data/apiData'
import { fetchApi } from '../services/apiService'
import type { ApiDecoder, FetchResult, FetchState } from '../types/api'

export function useFetchApi<T>(url: string, decode: ApiDecoder<T>): FetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null })
  const [attempt, setAttempt] = useState<number>(0)

  useEffect(() => {
    const controller: AbortController = new AbortController()
    let active: boolean = true
    let timedOut: boolean = false
    const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, apiTimeoutMs)

    async function load(): Promise<void> {
      setState({ data: null, loading: true, error: null })
      try {
        const data: T = await fetchApi(url, controller.signal, decode)
        if (active && !controller.signal.aborted) setState({ data, loading: false, error: null })
      } catch (error: unknown) {
        if (!active || (controller.signal.aborted && !timedOut)) return
        const message: string = timedOut ? 'La consulta tardó demasiado. Puedes volver a intentarlo.'
          : error instanceof TypeError ? 'No pudimos conectar con GitHub. Revisa tu conexión e inténtalo de nuevo.'
          : error instanceof SyntaxError ? 'GitHub devolvió una respuesta que no pudimos interpretar. Inténtalo más tarde.'
          : error instanceof Error ? error.message : 'No fue posible consultar los repositorios.'
        setState({ data: null, loading: false, error: message })
      } finally {
        clearTimeout(timeout)
      }
    }

    void load()
    return () => {
      active = false
      clearTimeout(timeout)
      controller.abort()
    }
  }, [url, decode, attempt])

  function retry(): void {
    setState({ data: null, loading: true, error: null })
    setAttempt(previous => previous + 1)
  }

  return { ...state, retry }
}
