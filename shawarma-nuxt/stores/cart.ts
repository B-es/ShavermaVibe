import { defineStore } from "pinia";
import type { Product } from "~/types/product";
import { showToast } from "~/composables/useToast";

export interface CartItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  bg: string;
  cat: string;
  qty: number;
  sizeLabel: string;
  size?: {
    id: string;
    label: string;
    priceModifier: number;
  };
  subtotal: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

function sizeModFrom(item: CartItem): number {
  return item.size?.priceModifier ?? 0;
}

function calcSubtotal(price: number, sizeMod: number, qty: number): number {
  return price * (1 + sizeMod) * qty;
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    totalItems(): number {
      return this.items.reduce((sum, item) => sum + item.qty, 0);
    },

    totalPrice(): number {
      return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    },

    hasItems(): boolean {
      return this.items.length > 0;
    },

    subtotal(): number {
      return this.items.reduce((sum, item) => sum + item.subtotal, 0);
    },

    discount(): number {
      return this.subtotal > 1500 ? this.subtotal * 0.1 : 0;
    },

    delivery(): number {
      return this.subtotal >= 1000 ? 0 : 150;
    },

    total(): number {
      return this.subtotal - this.discount + this.delivery;
    },
  },

  actions: {
    toggleCart() {
      this.isOpen = !this.isOpen;
    },

    closeCart() {
      this.isOpen = false;
    },

    addToCart(
      product: Product,
      qty: number = 1,
      sizeLabel: string = "Стандарт",
      priceModifier: number = 0,
    ) {
      const existingItem = this.items.find(
        (item) =>
          item.id === product.id &&
          item.sizeLabel === sizeLabel,
      );

      if (existingItem) {
        existingItem.qty++;
        existingItem.subtotal = calcSubtotal(product.price, priceModifier, existingItem.qty);
      } else {
        this.items.push({
          ...product,
          qty,
          sizeLabel,
          size: priceModifier
            ? { id: sizeLabel, label: sizeLabel, priceModifier }
            : undefined,
          subtotal: calcSubtotal(product.price, priceModifier, qty),
        });
      }

      showToast(`${product.name} добавлена в корзину!`);
    },

    removeFromCart(index: number) {
      this.items.splice(index, 1);
    },

    increaseQty(index: number) {
      if (this.items[index]) {
        this.items[index].qty++;
        this.items[index].subtotal = calcSubtotal(
          this.items[index].price,
          sizeModFrom(this.items[index]),
          this.items[index].qty,
        );
      }
    },

    decreaseQty(index: number) {
      if (this.items[index]) {
        if (this.items[index].qty > 1) {
          this.items[index].qty--;
          this.items[index].subtotal = calcSubtotal(
            this.items[index].price,
            sizeModFrom(this.items[index]),
            this.items[index].qty,
          );
        } else {
          this.removeFromCart(index);
        }
      }
    },

    updateItemQty(index: number, qty: number) {
      if (this.items[index]) {
        this.items[index].qty = qty;
        if (qty <= 0) {
          this.removeFromCart(index);
          return;
        }
        this.items[index].subtotal = calcSubtotal(
          this.items[index].price,
          sizeModFrom(this.items[index]),
          qty,
        );
      }
    },

    clearCart() {
      this.items = [];
    },
  },
});
