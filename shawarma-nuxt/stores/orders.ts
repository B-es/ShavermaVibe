import { defineStore } from "pinia";

export interface OrderItem {
  name: string;
  qty: number;
  size: string;
  price: number;
  subtotal?: number;
}

export interface ClientOrder {
  id: string;
  name: string;
  phone: string;
  total: number;
  delivery: string;
  status: string;
  date: string;
  items: OrderItem[];
  address?: string;
  comment?: string;
  cancelReason?: string;
}

export const useOrderStore = defineStore("orders", {
  state: () => ({
    orders: [
      { id: "ORD-1698765432", name: "Иван Иванов", phone: "+7 (999) 123-45-67", total: 890, status: "completed", date: "2024-01-15T14:30:00Z", delivery: "pickup", items: [{ name: "Шаурма Классическая", qty: 2, size: "Обычная", price: 290, subtotal: 580 }, { name: "Сок Яблочный", qty: 1, size: "0.5л", price: 225, subtotal: 225 }], address: "Самовывоз" },
      { id: "ORD-1698765433", name: "Мария Петрова", phone: "+7 (999) 987-65-43", total: 620, status: "cooking", date: "2024-01-14T19:15:00Z", delivery: "delivery", items: [{ name: "Куриные Крылышки", qty: 1, size: "10шт", price: 250, subtotal: 250 }, { name: "Шаурма Вегетарианская", qty: 1, size: "Большая", price: 476, subtotal: 476 }], address: "ул. Пушкина, д. 10, кв.5" },
      { id: "ORD-1698765434", name: "Алексей Сидоров", phone: "+7 (999) 111-22-33", total: 1250, status: "new", date: "2024-01-15T10:00:00Z", delivery: "delivery", items: [{ name: "Шаурма Классическая", qty: 3, size: "Большая", price: 493, subtotal: 1479 }], address: "ул. Ленина, д. 20" },
    ] as ClientOrder[],
  }),

  getters: {
    salesStats: (state) => {
      const stats: Record<string, number> = {};
      state.orders.forEach((o) => {
        o.items?.forEach((item) => {
          const key = item.name;
          stats[key] = (stats[key] || 0) + item.qty;
        });
      });
      return stats;
    },

    topProducts: (state) => {
      const stats: Record<string, number> = {};
      state.orders.forEach((o) => {
        o.items?.forEach((item) => {
          stats[item.name] = (stats[item.name] || 0) + item.qty;
        });
      });
      return Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, qty]) => ({ name, qty }));
    },
  },

  actions: {
    addOrder(order: ClientOrder) {
      this.orders.push(order);
    },

    updateStatus(id: string, status: string) {
      const o = this.orders.find((o) => o.id === id);
      if (o) o.status = status;
    },

    cancelOrder(id: string, reason?: string) {
      const o = this.orders.find((o) => o.id === id);
      if (o) {
        o.status = "cancelled";
        o.cancelReason = reason || "Не указана";
      }
    },

    getClientOrders(phone: string) {
      return this.orders.filter((o) => o.phone === phone);
    },
  },
});
