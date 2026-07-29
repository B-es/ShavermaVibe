import { defineStore } from "pinia";
import { PRODUCTS } from "~/composables/useCart";
import type { Product, Category } from "~/types/product";

interface NewProduct {
  name: string;
  cat: string;
  price: number;
  desc: string;
  image: string;
  published: boolean;
  sizes: { id: string; label: string; priceModifier: number }[];
  allerg?: string[];
}

const defaultCategories: Category[] = [
  { id: "shawarma", label: "Шаурма" },
  { id: "doner", label: "Донер" },
  { id: "drinks", label: "Напитки" },
  { id: "sides", label: "Дополнения" },
];

export const useProductStore = defineStore("products", {
  state: () => ({
    items: JSON.parse(JSON.stringify(PRODUCTS)) as Product[],
    categories: JSON.parse(JSON.stringify(defaultCategories)) as Category[],
  }),

  getters: {
    byId: (state) => (id: number) => state.items.find((p) => p.id === id),
    byCat: (state) => (cat: string) =>
      cat === "all" ? state.items : state.items.filter((p) => p.cat === cat),
    catLabels: (state) => {
      const map: Record<string, string> = {};
      state.categories.forEach((c) => { map[c.id] = c.label; });
      return map;
    },
  },

  actions: {
    addProduct(data: NewProduct) {
      const maxId = Math.max(...this.items.map((p) => p.id), 0);
      this.items.push({
        id: maxId + 1,
        name: data.name.trim(),
        desc: data.desc || "Новый товар",
        price: data.price,
        emoji: "🌯",
        bg: "#FFFFFF",
        image: data.image || "",
        published: data.published,
        cat: data.cat,
        sizes: data.sizes.length ? data.sizes : undefined,
        allerg: data.allerg?.length ? data.allerg : undefined,
        available: true,
      });
    },

    updateProduct(id: number, data: Partial<Product>) {
      const idx = this.items.findIndex((p) => p.id === id);
      if (idx !== -1) {
        this.items[idx] = { ...this.items[idx], ...data };
      }
    },

    deleteProduct(id: number) {
      this.items = this.items.filter((p) => p.id !== id);
    },

    addCategory(label: string) {
      const id = label.toLowerCase().replace(/[^a-zа-яё0-9]/g, "_");
      if (this.categories.find((c) => c.id === id)) return;
      this.categories.push({ id, label });
    },

    updateCategory(id: string, label: string) {
      const cat = this.categories.find((c) => c.id === id);
      if (cat) cat.label = label;
    },

    deleteCategory(id: string) {
      const used = this.items.some((p) => p.cat === id);
      if (used) return;
      this.categories = this.categories.filter((c) => c.id !== id);
    },
  },
});
