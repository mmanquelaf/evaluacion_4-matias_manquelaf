import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => matchMedia(query).matches)
  useEffect(() => {
    const media: MediaQueryList = matchMedia(query)
    const update = (event: MediaQueryListEvent): void => setMatches(event.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}
