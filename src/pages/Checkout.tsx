import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { COUNTRIES, euro } from '../data/catalog'
import { useCart } from '../state/CartContext'
import { MastercardMark, PaypalMark, VisaMark } from '../components/PaymentMarks'

type Method = 'visa' | 'mastercard' | 'paypal'

type DoneOrder = {
  number: string
  method: Method
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  postal: string
  city: string
  country: string
  total: number
}

const METHODS: Array<{ id: Method; label: string }> = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'paypal', label: 'PayPal' },
]

function Mark({ id }: { id: Method }) {
  if (id === 'visa') return <VisaMark />
  if (id === 'mastercard') return <MastercardMark />
  return <PaypalMark />
}

export function Checkout() {
  const { items, total, clear } = useCart()
  const [method, setMethod] = useState<Method>('visa')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [order, setOrder] = useState<DoneOrder | null>(null)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nextErrors: Record<string, string> = {}
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const firstName = String(data.get('firstName') ?? '').trim()
    const lastName = String(data.get('lastName') ?? '').trim()
    const address = String(data.get('address') ?? '').trim()
    const postal = String(data.get('postal') ?? '').trim()
    const city = String(data.get('city') ?? '').trim()
    const country = String(data.get('country') ?? '').trim()

    if (phone.replace(/\D/g, '').length < 8) nextErrors.phone = 'Indiquez un numéro joignable.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Indiquez un e-mail valide.'
    if (firstName.length < 2) nextErrors.firstName = 'Indiquez le prénom.'
    if (lastName.length < 2) nextErrors.lastName = 'Indiquez le nom.'
    if (address.length < 5) nextErrors.address = 'Indiquez la rue et le numéro.'
    if (postal.length < 3) nextErrors.postal = 'Indiquez le code postal.'
    if (city.length < 2) nextErrors.city = 'Indiquez la ville.'
    if (!country) nextErrors.country = 'Choisissez le pays.'
    if (!data.get('consent')) nextErrors.consent = 'L’accord est nécessaire pour livrer la commande.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setOrder({
      number: `IA-${Date.now().toString().slice(-8)}`,
      method,
      firstName,
      lastName,
      phone,
      email,
      address,
      postal,
      city,
      country,
      total,
    })
    clear()
  }

  if (items.length === 0 && !order) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h1>Panier vide</h1>
          <p>Ajoutez un ensemble depuis le configurateur pour passer au paiement.</p>
          <Link className="btn" to="/#configurateur">
            Ouvrir le configurateur
          </Link>
        </div>
      </main>
    )
  }

  if (order) {
    const methodLabel = METHODS.find((item) => item.id === order.method)?.label
    return (
      <main className="checkout-page">
        <div className="order-done">
          <p className="eyebrow">Commande enregistrée</p>
          <h1>Merci, {order.firstName}.</h1>
          <p>
            Référence <strong>{order.number}</strong>. Nous vous contactons au{' '}
            {order.phone} pour confirmer la découpe avant l’expédition vers{' '}
            {order.address}, {order.postal} {order.city}, {order.country}.
          </p>
          <p>
            Moyen choisi : {methodLabel}. Le débit Visa, Mastercard ou PayPal sera
            effectué dès le branchement du prestataire. Aucun montant n’est prélevé
            tant que ce paiement n’est pas actif. Total prévu : {euro(order.total)}.
            La TVA et la livraison sont incluses dans ce prix.
          </p>
          <Link className="btn" to="/">
            Retour à l’accueil
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <div className="checkout-grid">
        <section className="checkout-summary">
          <h1>Paiement</h1>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>
                    {item.brandName} {item.modelName} {item.year}
                  </strong>
                  <p>
                    {item.kitLabel}
                    <br />
                    {item.gearbox === 'manual' ? 'Manuelle' : 'Automatique'}
                    {item.heel ? ' · avec talonnette' : ''}
                    <br />
                    Tapis {item.matName.toLowerCase()}, bord {item.edgeName.toLowerCase()}
                  </p>
                </div>
                <b>{euro(item.price)}</b>
              </li>
            ))}
          </ul>
          <p className="checkout-total">
            <span>Total, TVA et livraison incluses</span>
            <strong>{euro(total)}</strong>
          </p>
          <p className="checkout-note">La TVA et la livraison sont incluses dans le prix.</p>
        </section>

        <form className="checkout-form" onSubmit={onSubmit} noValidate>
          <label>
            Téléphone ou WhatsApp
            <input name="phone" autoComplete="tel" inputMode="tel" />
            {errors.phone && <small>{errors.phone}</small>}
          </label>
          <label>
            E-mail
            <input name="email" type="email" autoComplete="email" />
            {errors.email && <small>{errors.email}</small>}
          </label>
          <div className="name-row">
            <label>
              Prénom
              <input name="firstName" autoComplete="given-name" />
              {errors.firstName && <small>{errors.firstName}</small>}
            </label>
            <label>
              Nom
              <input name="lastName" autoComplete="family-name" />
              {errors.lastName && <small>{errors.lastName}</small>}
            </label>
          </div>
          <label>
            Adresse de livraison
            <input name="address" autoComplete="street-address" placeholder="Rue et numéro" />
            {errors.address && <small>{errors.address}</small>}
          </label>
          <div className="name-row">
            <label>
              Code postal
              <input name="postal" autoComplete="postal-code" />
              {errors.postal && <small>{errors.postal}</small>}
            </label>
            <label>
              Ville
              <input name="city" autoComplete="address-level2" />
              {errors.city && <small>{errors.city}</small>}
            </label>
          </div>
          <label>
            Pays
            <select name="country" defaultValue="France">
              {COUNTRIES.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
            {errors.country && <small>{errors.country}</small>}
          </label>

          <fieldset className="method-set">
            <legend>Payer avec</legend>
            <div className="method-grid">
              {METHODS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={method === item.id ? 'is-selected' : ''}
                  onClick={() => setMethod(item.id)}
                  aria-pressed={method === item.id}
                >
                  <Mark id={item.id} />
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="consent">
            <input type="checkbox" name="consent" />
            <span>
              J’accepte l’utilisation de ces informations pour fabriquer et livrer la
              commande. <Link to="/confidentialite">Politique de confidentialité</Link>
            </span>
          </label>
          {errors.consent && <small className="form-error">{errors.consent}</small>}

          <button className="btn" type="submit">
            Payer {euro(total)}
          </button>
          <p className="field-help">
            Visa, Mastercard et PayPal sont prévus sur cette page. Le prestataire de
            paiement sera connecté ensuite : aujourd’hui, « Payer » enregistre la
            commande sans débiter la carte.
          </p>
        </form>
      </div>
    </main>
  )
}
