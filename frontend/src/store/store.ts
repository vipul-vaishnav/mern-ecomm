import { create } from 'zustand'
import toast from 'react-hot-toast'

import { Product } from '../types/Product'

import { LOCAL_STORAGE_KEY, LocalStorage } from '../utils/LocalStorage'

export interface CartItem {
  product: Product
  qty: number
}

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

type Result = Optional<CartItem, 'qty'>

export interface CartState {
  items: Array<CartItem>
  clearCart: () => void
  incrementQty: (id: number) => void
  decrementQty: (id: number) => void
  deleteItemFromCart: (id: number) => void
  addNewItem: (args: Result) => void
}

export const useCartStore = create<CartState>()((set) => {
  return {
    items: LocalStorage.get(LOCAL_STORAGE_KEY) || [],
    clearCart: () =>
      set(() => {
        LocalStorage.remove(LOCAL_STORAGE_KEY)
        return {
          items: []
        }
      }),
    decrementQty: (id) =>
      set((s) => {
        const isIdValid = s.items.find((item) => item.product.id === id)
        if (!isIdValid) return s
        if (isIdValid.qty === 1) {
          toast.error('Minimum Qty. is 1, To remove item from cart click remove button (X)')
          return s
        }
        return {
          items: s.items.map((item) =>
            item.product.id !== id ? item : { ...item, qty: item.qty - 1 }
          )
        }
      }),
    incrementQty: (id) =>
      set((s) => {
        const isIdValid = s.items.find((item) => item.product.id === id)
        if (!isIdValid) return s
        if (isIdValid.qty === 6) {
          toast.error('You already have 6 items in your cart')
          return s
        }
        return {
          items: s.items.map((item) =>
            item.product.id !== id ? item : { ...item, qty: item.qty + 1 }
          )
        }
      }),
    deleteItemFromCart: (id) =>
      set((s) => {
        const isIdValid = s.items.find((item) => item.product.id === id)
        if (!isIdValid) return s
        return {
          items: s.items.filter((item) => item.product.id !== id)
        }
      }),
    addNewItem: (args) =>
      set((s) => {
        const isProductAlreadyThere = s.items.find((item) => item.product.id === args.product.id)

        if (isProductAlreadyThere) {
          if (isProductAlreadyThere.qty === 6) {
            toast.error('You already have 6 items in cart')
            return s
          } else if (isProductAlreadyThere.qty + (args.qty || 1) > 6) {
            toast.error('Decrease quantity of item, exceeding max quantity')
            return s
          } else {
            toast.success('Item added to cart')
            return {
              items: [
                ...s.items.map((item) =>
                  item.product.id === args.product.id
                    ? { ...item, qty: item.qty + (args.qty || 1) }
                    : item
                )
              ]
            }
          }
        } else {
          toast.success('Item added to cart')
          return {
            items: [
              ...s.items,
              {
                product: args.product,
                qty: args.qty || 1
              }
            ]
          }
        }
      })
  }
})
