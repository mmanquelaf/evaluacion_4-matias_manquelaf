import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { navigation } from '../../data/portfolioData'
import { Navbar } from '../Navbar/Navbar'
import './Layout.css'

export function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const normalizedPath: string = pathname.replace(/\/+$/, '').toLowerCase() || '/'
    const pageTitle: string = navigation.find(item => item.path === normalizedPath)?.pageTitle ?? 'Página no encontrada'
    document.title = `${pageTitle} · Matías`
    window.scrollTo({ top: 0, behavior: 'instant' })
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <>
      <button className="skip-link" type="button" onClick={() => mainRef.current?.focus()}>
        Saltar al contenido
      </button>
      <Navbar key={pathname} />
      <main className="site-main" ref={mainRef} tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="footer">
        <p className="footer__copy">Matías · Portafolio de aprendizaje</p>
        <Link className="footer__link" to="/">Volver al inicio ↑</Link>
      </footer>
    </>
  )
}
