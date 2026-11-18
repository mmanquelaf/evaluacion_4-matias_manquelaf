import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navigation } from '../../data/portfolioData'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import type { MenuKeyboardEvent, MenuOpenState, NavigationLinkState } from '../../types/interactions'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { ReadingProgress } from '../ReadingProgress/ReadingProgress'
import './Navbar.css'

export function Navbar() {
  const [open, setOpen] = useState<MenuOpenState>(false)
  const mobile: boolean = useMediaQuery('(max-width: 700px)')
  const menuRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const media: MediaQueryList = matchMedia('(max-width: 700px)')
    const close = (): void => setOpen(false)
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: MenuKeyboardEvent): void => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  function closeMenu(): void {
    setOpen(false)
    if (mobile && open) menuRef.current?.focus()
  }
  function linkClassName({ isActive }: NavigationLinkState): string {
    return `navbar__link${isActive ? ' navbar__link--active' : ''}`
  }

  return (
    <header className="navbar">
      <Link className="navbar__brand" to="/" aria-label="Portafolio, volver al inicio" onClick={closeMenu}>
        Portafolio
      </Link>
      <div className="navbar__tools">
        <ThemeToggle />
        <button className="navbar__menu" ref={menuRef} type="button" hidden={!mobile} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(previous => !previous)}>
          Menú
        </button>
      </div>
      <nav className="navbar__links" id="main-nav" aria-label="Navegación principal" hidden={mobile && !open}>
        {navigation.map(item => (
          <NavLink key={item.path} className={linkClassName} end={item.path === '/'} to={item.path} onClick={closeMenu}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <ReadingProgress />
    </header>
  )
}
