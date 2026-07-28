import { defineStore } from 'pinia'
import type { Product, CartState } from '~/types/product'

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    totalItems(): number {
      return this.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    totalPrice(): number {
      return this.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      )
    },

    hasItems(): boolean {
      return this.items.length > 0
    },
  },

  actions: {
    toggleCart() {
      this.isOpen = !this.isOpen
    },

    addToCart(product: Product, quantity: number = 1) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }

      this.isOpen = true
    },

    removeFromCart(productId: number) {
      this.items = this.items.filter((item) => item.product.id !== productId)
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find((item) => item.product.id === productId)
      if (item) {
        if (quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          item.quantity = quantity
        }
      }
    },

    clearCart() {
      this.items = []
    },
  },
})
