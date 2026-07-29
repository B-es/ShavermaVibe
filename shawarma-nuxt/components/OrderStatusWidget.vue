<template>
  <div v-if="activeOrders.length" class="order-widget">
    <div class="widget-head" @click="open = !open">
      <span class="widget-dot"></span>
      <span class="widget-title">Мои заказы</span>
      <span class="widget-count">{{ activeOrders.length }}</span>
    </div>
    <div v-if="open" class="widget-body">
      <div v-for="order in activeOrders" :key="order.id" class="widget-order">
        <div class="widget-order-head">
          <span class="widget-order-id">#{{ order.id }}</span>
          <span :class="['widget-badge', 'wb--' + order.status]">{{ statusLabel(order.status) }}</span>
        </div>
        <div class="widget-order-items">
          <div v-for="(item, idx) in order.items" :key="idx" class="widget-item">
            <span>{{ item.name }}</span>
            <span>x{{ item.qty }}</span>
          </div>
        </div>
        <div class="widget-order-footer">
          <span>{{ fmt(order.total) }}</span>
          <span class="widget-date">{{ formatDate(order.date) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useOrderStore } from "~/stores/orders";
import { useAuthStore } from "~/stores/auth";
import { fmt } from "~/composables/useUtils";

const orderStore = useOrderStore();
const authStore = useAuthStore();
const open = ref(false);

const activeOrders = computed(() => {
  if (!authStore.user?.phone) return [];
  const statuses = ["new", "confirmed", "cooking", "ready", "courier"];
  return orderStore.orders.filter(
    (o) => o.phone === authStore.user.phone && statuses.includes(o.status),
  ).slice(0, 3);
});

const statusLabel = (status) => {
  const labels = { new: "Новый", confirmed: "Подтверждён", cooking: "Готовим", ready: "Готово", courier: "В пути", completed: "Выполнен", cancelled: "Отменён" };
  return labels[status] || status;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
};
</script>

<style scoped>
.order-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 900;
  max-width: 340px;
  width: 100%;
  font-family: inherit;
}

.widget-head {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--ink);
  color: var(--yellow);
  padding: 12px 16px;
  border-radius: 14px 14px 14px 4px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  transition: 0.2s;
}

.widget-head:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,0,0,0.2);
}

.widget-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.widget-title {
  flex: 1;
  font-weight: 700;
  font-size: 13px;
}

.widget-count {
  background: var(--red);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 99px;
}

.widget-body {
  margin-top: 8px;
  background: #fff;
  border-radius: 14px 14px 14px 4px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.widget-order {
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(34,34,34,0.06);
}

.widget-order:last-child {
  padding-bottom: 0;
  border-bottom: none;
}

.widget-order-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.widget-order-id {
  font-weight: 800;
  font-size: 12px;
}

.widget-badge {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: 3px 8px 3px 8px;
}

.wb--new { background: #e3f2fd; color: #1976d2; }
.wb--confirmed { background: #fff3e0; color: #f57c00; }
.wb--cooking { background: #fee2e2; color: var(--red-d); }
.wb--ready { background: #dcfce7; color: #15803d; }
.wb--courier { background: #f3e5f5; color: #7b1fa2; }

.widget-order-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.widget-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(34,34,34,0.6);
}

.widget-order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.widget-order-footer :first-child {
  font-weight: 800;
  color: var(--red);
}

.widget-date {
  color: rgba(34,34,34,0.4);
  font-size: 11px;
}

@media (max-width: 400px) {
  .order-widget {
    right: 10px;
    bottom: 10px;
    max-width: 300px;
  }
}
</style>
