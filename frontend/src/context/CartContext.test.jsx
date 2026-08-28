import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from './CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

const vendor = (id, price = 1000) => ({
  vendorId: id,
  businessName: `Vendor ${id}`,
  categoryName: 'Photography',
  districtLocation: 'Colombo',
  startingPrice: price,
})

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  it('adds a vendor and normalizes its fields', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(vendor(1, 2500)))
    expect(result.current.count).toBe(1)
    expect(result.current.items[0]).toMatchObject({
      vendorId: 1,
      businessName: 'Vendor 1',
      startingPrice: 2500,
    })
  })

  it('dedupes vendors by id', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(vendor(1))
      result.current.addItem(vendor(1))
    })
    expect(result.current.count).toBe(1)
  })

  it('computes the total from starting prices', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(vendor(1, 1000))
      result.current.addItem(vendor(2, 2500))
    })
    expect(result.current.total).toBe(3500)
  })

  it('removes items and clears the whole cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => {
      result.current.addItem(vendor(1))
      result.current.addItem(vendor(2))
    })
    act(() => result.current.removeItem(1))
    expect(result.current.count).toBe(1)
    expect(result.current.isInCart(2)).toBe(true)
    act(() => result.current.clear())
    expect(result.current.count).toBe(0)
  })
})
