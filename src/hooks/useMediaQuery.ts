import { useEffect, useState } from 'react'
import type { MediaQueryChangeEvent, MediaQueryState } from '../types/interactions'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<MediaQueryState>(() => matchMedia(query).matches)
  useEffect(() => {
    const media: MediaQueryList = matchMedia(query)
    const update = (event: MediaQueryChangeEvent): void => setMatches(event.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}
