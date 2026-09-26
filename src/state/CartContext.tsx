import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Gearbox, KitId } from '../data/catalog'

export type CartItem = {
  id: string
  brandId: string
  brandName: string
  modelName: string
  year: number
  kitId: KitId
  kitLabel: string
  heel: boolean
  gearbox: Gearbox
  matName: string
  matHex: string
  edgeName: string
  edgeHex: string
  price: number
}

type CartContextValue = {
  items: CartItem[]
  total: number
  open: boolean
  setOpen: (open: boolean) => void
  addItem: (item: Omit<CartItem, 'id'>) => void
  removeItem: (id: string) => void
  clear: () => void
}

const STORAGE_KEY = 'inauto-cart'
const CartContext = createContext<CartContextValue | null>(null)

function readStored(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStored)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    document.body.classList.toggle('cart-open', open)
    return () => document.body.classList.remove('cart-open')
  }, [open])

  const value = useMemo<CartContextValue>(() => {
    return {
      items,
      total: items.reduce((sum, item) => sum + item.price, 0),
      open,
      setOpen,
      addItem: (item) => {
        setItems((current) => [
          ...current,
          { ...item, id: crypto.randomUUID() },
        ])
        setOpen(true)
      },
      removeItem: (id) => {
        setItems((current) => current.filter((item) => item.id !== id))
      },
      clear: () => setItems([]),
    }
  }, [items, open])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
