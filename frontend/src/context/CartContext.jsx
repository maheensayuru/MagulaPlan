import { createContext, useContext, useEffect, useState } from 'react'

export const CartContext = createContext(null)
const STORAGE_KEY = 'magulaplan_cart'

function readStoredCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (vendor) => {
    const id = vendor.vendorId ?? vendor.id
    setItems((list) => {
      if (list.some((i) => i.vendorId === id)) return list
      return [
        ...list,
        {
          vendorId: id,
          businessName: vendor.businessName ?? vendor.name,
          categoryName: vendor.categoryName,
          districtLocation: vendor.districtLocation ?? vendor.district,
          startingPrice: vendor.startingPrice ?? vendor.priceFrom ?? 0,
          imageUrl: vendor.imageUrl ?? vendor.image ?? null,
        },
      ]
    })
    setOpen(true)
  }

  const removeItem = (vendorId) => setItems((list) => list.filter((i) => i.vendorId !== vendorId))
  const clear = () => setItems([])
  const isInCart = (vendorId) => items.some((i) => i.vendorId === vendorId)
  const total = items.reduce((sum, i) => sum + (Number(i.startingPrice) || 0), 0)

  return (
    <CartContext.Provider
      value={{ items, count: items.length, total, open, setOpen, addItem, removeItem, clear, isInCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    return {
      items: [],
      count: 0,
      total: 0,
      open: false,
      setOpen: () => {},
      addItem: () => {},
      removeItem: () => {},
      clear: () => {},
      isInCart: () => false,
    }
  }
  return context
}

export default CartContext
