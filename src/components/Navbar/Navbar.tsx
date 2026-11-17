import { Link, NavLink } from 'react-router-dom'
import { navigation } from '../../data/portfolioData'
import './Navbar.css'

export function Navbar() {
  return (
    <header className="navbar">
      <Link className="navbar__brand" to="/" aria-label="Portafolio, volver al inicio">
        Portafolio
      </Link>
      <nav className="navbar__links" aria-label="Navegación principal">
        {navigation.map(item => (
          <NavLink
            key={item.path}
            className="navbar__link"
            end={item.path === '/'}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
