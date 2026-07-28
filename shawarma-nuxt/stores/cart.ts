import { defineStore } from 'pinia'
import type { Product, CartItem, CartState } from '~/types/product'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    promo: undefined,
  }),

  getters: {
    totalItems(): number {
      return this.items.reduce((sum, item) => sum + item.qty, 0)
    },

    totalPrice(): number {
      return this.items.reduce((sum, item) => sum + item.price * item.qty, 0)
    },

    hasItems(): boolean {
      return this.items.length > 0
    },

    subtotal(): number {
      return this.totalPrice
    },

    discount(): number {
      return this.subtotal > 1500 ? this.subtotal * 0.1 : 0
    },

    delivery(): number {
      return this.subtotal >= 1000 ? 0 : 150
    },

    total(): number {
      return this.subtotal - this.discount + this.delivery
    },
  },

  actions: {
    toggleCart() {
      this.isOpen = !this.isOpen
    },

    closeCart() {
      this.isOpen = false
    },

    addToCart(product: Product, qty: number = 1, sizeLabel: string = 'Стандарт', extrasLabel: string = '') {
      const existingItem = this.items.find(
        (item) => item.id === product.id && item.sizeLabel === sizeLabel && item.extrasLabel === extrasLabel
      )

      if (existingItem) {
        existingItem.qty += qty
      } else {
        this.items.push({ ...product, qty, sizeLabel, extrasLabel })
      }

      this.isOpen = true
    },

    removeFromCart(index: number) {
      this.items.splice(index, 1)
    },

    increaseQty(index: number) {
      if (this.items[index]) {
        this.items[index].qty++
      }
    },

    decreaseQty(index: number) {
      if (this.items[index]) {
        if (this.items[index].qty > 1) {
          this.items[index].qty--
        } else {
          this.removeFromCart(index)
        }
      }
    },

    clearCart() {
      this.items = []
    },

    setPromo(code?: string) {
      this.promo = code
    },
  },
})
