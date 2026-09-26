export type KitId = 'pair' | 'cabin' | 'full'
export type Gearbox = 'manual' | 'auto'

export type Swatch = {
  id: string
  name: string
  hex: string
}

export const KITS: Array<{
  id: KitId
  title: string
  detail: string
  price: number
  compareAt: number
  badge: string
}> = [
  {
    id: 'pair',
    title: 'Coupé',
    detail: 'Conducteur et passager',
    price: 115,
    compareAt: 132,
    badge: '−12 %',
  },
  {
    id: 'cabin',
    title: 'Intérieur',
    detail: 'Avant et arrière',
    price: 175,
    compareAt: 210,
    badge: '−17 %',
  },
  {
    id: 'full',
    title: 'Intérieur + coffre',
    detail: 'Avant, arrière et coffre',
    price: 265,
    compareAt: 315,
    badge: '−16 %',
  },
]

export const HEEL_PRICE = 15

export const MAT_COLORS: Swatch[] = [
  { id: 'yellow', name: 'Jaune', hex: '#E6B800' },
  { id: 'beige', name: 'Beige', hex: '#E4C98A' },
  { id: 'ivory', name: 'Ivoire', hex: '#F3E5C0' },
  { id: 'brown', name: 'Marron', hex: '#6A4632' },
  { id: 'orange', name: 'Orange', hex: '#E4572E' },
  { id: 'red', name: 'Rouge', hex: '#D7263D' },
  { id: 'burgundy', name: 'Bordeaux', hex: '#7A2E3A' },
  { id: 'blue', name: 'Bleu', hex: '#1A4F8B' },
  { id: 'royal', name: 'Bleu roi', hex: '#2F62C4' },
  { id: 'graphite', name: 'Graphite', hex: '#5C6168' },
  { id: 'black', name: 'Noir', hex: '#1C1C1C' },
  { id: 'lime', name: 'Vert lime', hex: '#8FDE2F' },
  { id: 'olive', name: 'Vert olive', hex: '#3F4F2A' },
]

export const EDGE_COLORS: Swatch[] = [
  { id: 'black', name: 'Noir', hex: '#1A1A1A' },
  { id: 'navy', name: 'Bleu nuit', hex: '#243044' },
  { id: 'blue', name: 'Bleu', hex: '#3B7BEA' },
  { id: 'royal', name: 'Bleu roi', hex: '#2A4FD0' },
  { id: 'purple', name: 'Violet', hex: '#7B3FA0' },
  { id: 'burgundy', name: 'Bordeaux', hex: '#6B3040' },
  { id: 'pink', name: 'Rose', hex: '#E23E86' },
  { id: 'orange', name: 'Orange', hex: '#F08C28' },
  { id: 'red', name: 'Rouge', hex: '#E23A3A' },
  { id: 'yellow', name: 'Jaune', hex: '#F0C400' },
  { id: 'light-gray', name: 'Gris clair', hex: '#E4E4E4' },
  { id: 'beige', name: 'Beige', hex: '#D5C4A8' },
  { id: 'camel', name: 'Camel', hex: '#C6A46A' },
  { id: 'brown', name: 'Marron', hex: '#6B4E32' },
  { id: 'taupe', name: 'Taupe', hex: '#8C8478' },
  { id: 'charcoal', name: 'Anthracite', hex: '#4A4A4A' },
  { id: 'teal', name: 'Turquoise', hex: '#1EAE96' },
]

export const COUNTRIES = [
  'France',
  'Allemagne',
  'Autriche',
  'Belgique',
  'Bulgarie',
  'Croatie',
  'Danemark',
  'Espagne',
  'Estonie',
  'Finlande',
  'Grèce',
  'Hongrie',
  'Irlande',
  'Italie',
  'Lettonie',
  'Lituanie',
  'Luxembourg',
  'Norvège',
  'Pays-Bas',
  'Pologne',
  'Portugal',
  'République tchèque',
  'Roumanie',
  'Royaume-Uni',
  'Slovaquie',
  'Slovénie',
  'Suède',
  'Suisse',
]

export function euro(value: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function kitById(id: KitId) {
  const kit = KITS.find((item) => item.id === id)
  if (!kit) throw new Error(`Unknown kit ${id}`)
  return kit
}

export function linePrice(kitId: KitId, heel: boolean) {
  return kitById(kitId).price + (heel ? HEEL_PRICE : 0)
}

export function swatch(list: Swatch[], id: string) {
  const item = list.find((entry) => entry.id === id)
  if (!item) throw new Error(`Unknown color ${id}`)
  return item
}
