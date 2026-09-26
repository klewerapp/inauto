import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { euro } from '../data/catalog'
import { useCart } from '../state/CartContext'
import { PaymentMarks } from './PaymentMarks'

export function CartDrawer() {
  const { items, total, open, setOpen, removeItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  return (
    <div className={`drawer ${open ? 'is-open' : ''}`} hidden={!open}>
      <button type="button" className="drawer-backdrop" aria-label="Fermer le panier" onClick={() => setOpen(false)} />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Panier">
        <header>
          <h2>Votre sélection</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fermer">
            ×
          </button>
        </header>
        {items.length === 0 ? (
          <p className="drawer-empty">
            Le panier est vide. Composez un ensemble dans le configurateur.
          </p>
        ) : (
          <ul className="drawer-list">
            {items.map((item) => (
              <li key={item.id}>
                <div className="swatch-pair" aria-hidden="true">
                  <i style={{ background: item.matHex }} />
                  <i style={{ background: item.edgeHex }} />
                </div>
                <div>
                  <strong>
                    {item.brandName} {item.modelName} {item.year}
                  </strong>
                  <p>
                    {item.kitLabel}
                    {' · '}
                    {item.gearbox === 'manual' ? 'Manuelle' : 'Automatique'}
                    {item.heel ? ' · Avec talonnette' : ''}
                  </p>
                  <p>
                    Tapis {item.matName.toLowerCase()}, bord {item.edgeName.toLowerCase()}
                  </p>
                  <button type="button" onClick={() => removeItem(item.id)}>
                    Retirer
                  </button>
                </div>
                <b>{euro(item.price)}</b>
              </li>
            ))}
          </ul>
        )}
        <footer>
          <div className="drawer-total">
            <span>Total, TVA et livraison incluses</span>
            <strong>{euro(total)}</strong>
          </div>
          <button
            type="button"
            className="btn"
            disabled={items.length === 0}
            onClick={() => {
              setOpen(false)
              navigate('/commande')
            }}
          >
            Passer au paiement
          </button>
          <PaymentMarks compact />
        </footer>
      </aside>
    </div>
  )
}
