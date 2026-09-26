import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../state/CartContext'

const LINKS = [
  { href: '/#savoir', label: 'Savoir-faire' },
  { href: '/#configurateur', label: 'Configurateur' },
  { href: '/#realisations', label: 'Réalisations' },
  { href: '/#faq', label: 'FAQ' },
]

export function Header() {
  const { items, setOpen } = useCart()
  const [menu, setMenu] = useState(false)
  const location = useLocation()

  return (
    <header className="site-header">
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
          <a className="header-phone" href="tel:+33688481601">
            +33 6 88 48 16 01
          </a>
          <button type="button" className="cart-btn" onClick={() => setOpen(true)}>
            Panier
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
