import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ReadingProgress.css'

export function ReadingProgress() {
  const [progress, setProgress] = useState<number>(0)
  const { pathname } = useLocation()

  useEffect(() => {
    let frame: number | null = null
    const update = (): void => {
      frame = null
      const total: number = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0)
    }
    const schedule = (): void => {
      if (frame === null) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer: ResizeObserver = new ResizeObserver(schedule)
    observer.observe(document.body)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [pathname])

  return <div className="reading-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
}
