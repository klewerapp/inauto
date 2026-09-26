import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../state/CartContext'

const LINKS = [
  { href: '/#savoir', label: 'Technologie' },
  { href: '/#personnalisation', label: 'Couleurs' },
  { href: '/#realisations', label: 'Réalisations' },
  { href: '/#configurateur', label: 'Tarifs' },
  { href: '/#processus', label: 'Processus' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
]

export function Header() {
  const { items, setOpen } = useCart()
  const [menu, setMenu] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="header-top-inner">
          <span>5 Rue du Mont Blanc, Corbas</span>
          <a href="tel:+33688481601">+33 6 88 48 16 01</a>
        </div>
      </div>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="IN AUTO, accueil">
          <img src="/site/001-logo_png_beloe.png" alt="" />
        </Link>
        <nav className={menu ? 'is-open' : ''} aria-label="Principal">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenu(false)}
              aria-current={location.hash === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-tools">
          <a className="btn header-order" href="/#configurateur" onClick={() => setMenu(false)}>
            Commander
          </a>
          <button type="button" className="cart-btn" onClick={() => setOpen(true)} aria-label={`Panier, ${items.length}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h15l-1.5 9h-12L5 3H2"
              />
              <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
            </svg>
            <strong>{items.length}</strong>
          </button>
          <button
            type="button"
            className="menu-btn"
            aria-label="Ouvrir le menu"
            aria-expanded={menu}
            onClick={() => setMenu((current) => !current)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
