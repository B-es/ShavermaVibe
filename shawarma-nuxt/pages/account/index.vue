<template>
  <div class="orders-page">
    <h2>Мои заказы</h2>

    <div v-if="orders.length === 0" class="empty-orders">
      <p>📦 Ещё нет заказов</p>
      <NuxtLink to="/menu" class="btn btn--red btn--sm">Перейти в меню</NuxtLink>
    </div>

    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <span class="order-id">№{{ order.id }}</span>
          <span class="order-date">{{ formatOrderDate(order.date) }}</span>
          <span :class="['badge', 'b--' + order.status]">{{ statusLabel(order.status) }}</span>
        </div>

        <div class="order-items">
          <div v-for="(item, idx) in order.items" :key="idx" class="order-item">
            <div class="order-item__info">
              <span class="order-item__name">{{ item.name }}</span>
              <span class="order-item__meta">{{ item.size }} • x{{ item.qty }}</span>
            </div>
            <span class="order-item__price">{{ fmt(item.subtotal) }}</span>
          </div>
        </div>

        <div class="order-footer">
          <div class="order-total">
            <span>Итого:</span>
            <b>{{ fmt(order.total) }}</b>
          </div>
          <button @click="reorder(order)" class="btn btn--ghost btn--sm">↻ Повторить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { fmt } from '~/composables/useUtils'
import { computed } from 'vue'
import { useOrderStore } from '~/stores/orders'
import { useAuthStore } from '~/stores/auth'
import { useProductStore } from '~/stores/products'
import { useCartStore } from '~/stores/cart'

const orderStore = useOrderStore()
const authStore = useAuthStore()
const productStore = useProductStore()
const cartStore = useCartStore()

const orders = computed(() => {
  if (!authStore.user?.phone) return []
  return orderStore.getClientOrders(authStore.user.phone)
})

const formatOrderDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const statusLabel = (status) => {
  const labels = { new: 'Новый', confirmed: 'Подтверждён', cooking: 'Готовим', ready: 'Готово', courier: 'В пути', completed: 'Выполнен', cancelled: 'Отменён' }
  return labels[status] || status
}

const reorder = (order) => {
  order.items.forEach(item => {
    const product = productStore.items.find(p => p.id === item.id)
    if (product) cartStore.addToCart(product, item.qty, item.size || "Стандарт", "")
  })
}
</script>

<style scoped>
.orders-page h2 {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.empty-orders { text-align: center; padding: 48px 20px; border: 2px dashed rgba(214,40,40,0.3); border-radius: 20px 20px 20px 6px; }
.empty-orders p { color: rgba(34,34,34,0.5); margin-bottom: 16px; }
.orders-list { display: flex; flex-direction: column; gap: 14px; }
.order-card {
  background: #fff;
  border-radius: 16px 16px 16px 4px;
  border: 2px solid rgba(34,34,34,0.07);
  padding: 20px;
  transition: 0.2s;
}
.order-card:hover { border-color: rgba(214,40,40,0.2); }
.order-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(34,34,34,0.06);
  flex-wrap: wrap;
}
.order-id { font-weight: 800; font-size: 14px; }
.order-date { font-size: 13px; color: rgba(34,34,34,0.45); margin-right: auto; }
.badge { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 3px 10px 3px 10px; }
.b--new { background: #e3f2fd; color: #1976d2; }
.b--confirmed { background: #fff3e0; color: #f57c00; }
.b--cooking { background: #fee2e2; color: var(--red-d); }
.b--ready { background: #dcfce7; color: #15803d; }
.b--courier { background: #f3e5f5; color: #7b1fa2; }
.b--completed { background: #dcfce7; color: #15803d; }
.b--cancelled { background: #fee2e2; color: var(--red-d); }
.order-items { margin-bottom: 14px; }
.order-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px dashed rgba(34,34,34,0.06); }
.order-item:last-child { border-bottom: none; }
.order-item__info { display: flex; flex-direction: column; gap: 2px; }
.order-item__name { font-weight: 700; font-size: 14px; }
.order-item__meta { font-size: 12px; color: rgba(34,34,34,0.45); }
.order-item__price { font-weight: 800; font-size: 15px; color: var(--red); white-space: nowrap; }
.order-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid rgba(34,34,34,0.06); }
.order-total { display: flex; gap: 8px; align-items: baseline; font-size: 14px; }
.order-total b { font-size: 18px; }
</style>
