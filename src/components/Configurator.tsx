import { useMemo, useState } from 'react'
import { BRANDS, CURRENT_YEAR, findBrand, yearsOf, type CarModel } from '../data/cars'
import {
  EDGE_COLORS,
  KITS,
  MAT_COLORS,
  euro,
  kitById,
  linePrice,
  swatch,
  type Gearbox,
  type KitId,
} from '../data/catalog'
import { useCart } from '../state/CartContext'
import { ComboBox } from './ComboBox'
import { MatPreview } from './MatPreview'

function modelKey(model: CarModel) {
  return `${model.name}__${model.from}`
}

const SCHEME: Record<KitId, string> = {
  pair: '/mats/k1.avif',
  cabin: '/mats/k2.avif',
  full: '/mats/k3.avif',
}

function modelLabel(model: CarModel, siblings: CarModel[]) {
  const duplicated = siblings.filter((item) => item.name === model.name).length > 1
  if (!duplicated) return model.name
  return `${model.name} (${model.from}–${model.to ?? CURRENT_YEAR})`
}

function deliveryLabel() {
  const start = new Date()
  const end = new Date()
  end.setDate(start.getDate() + 3)
  const format = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return `${format.format(start)} – ${format.format(end)}`
}

export function Configurator() {
  const { addItem } = useCart()
  const [brandId, setBrandId] = useState('')
  const [modelKeyValue, setModelKeyValue] = useState('')
  const [year, setYear] = useState('')
  const [kitId, setKitId] = useState<KitId>('cabin')
  const [gearbox, setGearbox] = useState<Gearbox>('manual')
  const [matId, setMatId] = useState('black')
  const [edgeId, setEdgeId] = useState('red')

  const brand = findBrand(brandId)
  const model = brand?.models.find((item) => modelKey(item) === modelKeyValue)
  const years = model ? yearsOf(model) : []
  const mat = swatch(MAT_COLORS, matId)
  const edge = swatch(EDGE_COLORS, edgeId)
  const price = linePrice(kitId, false)
  const ready = Boolean(brand && model && year)

  const brandOptions = useMemo(
    () =>
      [...BRANDS]
        .sort((a, b) => a.name.localeCompare(b.name, 'fr'))
        .map((item) => ({
          value: item.id,
          label: item.name,
          logo: `/logos/${item.id}.png`,
        })),
    [],
  )

  const modelOptions =
    brand?.models.map((item) => ({
      value: modelKey(item),
      label: modelLabel(item, brand.models),
    })) ?? []

  function chooseBrand(next: string) {
    setBrandId(next)
    setModelKeyValue('')
    setYear('')
  }

  function chooseModel(next: string) {
    setModelKeyValue(next)
    setYear('')
  }

  function continueOrder() {
    if (!brand || !model || !year) return
    const kit = kitById(kitId)
    addItem({
      brandId: brand.id,
      brandName: brand.name,
      modelName: model.name,
      year: Number(year),
      kitId,
      kitLabel: `${kit.title} — ${kit.detail}`,
      heel: false,
      gearbox,
      matName: mat.name,
      matHex: mat.hex,
      edgeName: edge.name,
      edgeHex: edge.hex,
      price,
    })
  }

  return (
    <section className="configurator" id="configurateur">
      <div className="section-head">
        <p className="eyebrow">Bon moment pour votre achat</p>
        <h2>Nos tarifs</h2>
        <p>Offre de la semaine. TVA et livraison incluses.</p>
      </div>
      <div className="config-grid">
        <div className="config-stage">
          <aside className={`brand-card ${brand ? 'is-set' : ''}`}>
            <div className="brand-plate">
              {brand ? (
                <img src={`/logos/${brand.id}.png`} alt={`Logo ${brand.name}`} />
              ) : (
                <span>Logo</span>
              )}
            </div>
            {brand && model ? (
              <>
                <p className="brand-kicker">
                  {brand.name} {model.name}
                  {year ? ` ${year}` : ''}
                </p>
                <p className="brand-note">
                  {`Vos tapis sont fabriqués spécialement pour votre ${brand.name} ${model.name}${year ? ` ${year}` : ''}, en tenant compte de toutes les particularités de ce modèle : pédalier, tunnel, fixations d’origine et relief du plancher.`}
                </p>
              </>
            ) : (
              <p>
                Sélectionnez la marque : son logo apparaît ici, avec la confirmation
                d’une découpe faite pour ce modèle.
              </p>
            )}
          </aside>
          <MatPreview mat={mat.hex} edge={edge.hex} heel={false} />
          <p className="preview-note">
            Photographie à caractère général. À la commande, vous recevez des tapis
            correspondant à la configuration de votre voiture. La teinte peut légèrement
            varier selon l’écran.
          </p>
        </div>

        <form
          className="config-form"
          onSubmit={(event) => {
            event.preventDefault()
            continueOrder()
          }}
        >
          <fieldset>
            <legend>1. Véhicule</legend>
            <div className="vehicle-fields">
              <ComboBox
                label="Marque"
                placeholder="Toutes les marques"
                value={brandId}
                options={brandOptions}
                onChange={chooseBrand}
              />
              <ComboBox
                label="Modèle"
                placeholder={brand ? 'Tous les modèles' : 'Choisissez d’abord la marque'}
                value={modelKeyValue}
                options={modelOptions}
                onChange={chooseModel}
                disabled={!brand}
              />
              <label className="year-field">
                <span className="field-label">Année</span>
                <select
                  value={year}
                  disabled={!model}
                  onChange={(event) => setYear(event.target.value)}
                >
                  <option value="">Année</option>
                  {years.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Complément</legend>
            <div className="kit-grid">
              {KITS.map((kit) => (
                <button
                  key={kit.id}
                  type="button"
                  className={kitId === kit.id ? 'is-selected' : ''}
                  onClick={() => setKitId(kit.id)}
                >
                  <img src={SCHEME[kit.id]} alt="" />
                  <span className="kit-badge">{kit.badge}</span>
                  <strong>{kit.title}</strong>
                  <small>{kit.detail}</small>
                  <span className="kit-price">
                    <s>{euro(kit.compareAt)}</s>
                    {euro(kit.price)}
                  </span>
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
              <legend>3. Boîte de vitesses</legend>
              <div className="segmented">
                <button
                  type="button"
                  className={gearbox === 'manual' ? 'is-selected' : ''}
                  onClick={() => setGearbox('manual')}
                >
                  Manuelle
                </button>
                <button
                  type="button"
                  className={gearbox === 'auto' ? 'is-selected' : ''}
                  onClick={() => setGearbox('auto')}
                >
                  Automatique
                </button>
              </div>
              <p className="field-help">La découpe du pédalier suit la boîte choisie.</p>
            </fieldset>

          <fieldset>
            <legend>
              4. Couleur du tapis <em>{mat.name}</em>
            </legend>
            <div className="swatches">
              {MAT_COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={matId === color.id ? 'is-selected' : ''}
                  style={{ background: color.hex }}
                  aria-label={color.name}
                  aria-pressed={matId === color.id}
                  onClick={() => setMatId(color.id)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              5. Couleur du bord <em>{edge.name}</em>
            </legend>
            <div className="swatches">
              {EDGE_COLORS.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={edgeId === color.id ? 'is-selected' : ''}
                  style={{ background: color.hex }}
                  aria-label={color.name}
                  aria-pressed={edgeId === color.id}
                  onClick={() => setEdgeId(color.id)}
                />
              ))}
            </div>
          </fieldset>

          <div className="config-buy">
            <div>
              <span>Total de l’ensemble</span>
              <strong>{euro(price)}</strong>
              <small>TVA et livraison incluses</small>
            </div>
            <button type="submit" className="btn" disabled={!ready}>
              Continuer
            </button>
          </div>
          {!ready && (
            <p className="field-help">
              Choisissez la marque, le modèle et l’année pour ajouter l’ensemble au panier.
            </p>
          )}
          <div className="delivery-row">
            <div>
              <span>Date de livraison estimée</span>
              <strong>{deliveryLabel()}</strong>
              <small>± 3 jours</small>
            </div>
            <img src="/mats/colissimo.svg" alt="Colissimo" />
          </div>
        </form>
      </div>
    </section>
  )
}
