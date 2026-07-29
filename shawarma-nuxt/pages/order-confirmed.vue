<template>
  <div class="order-confirmed-page">
    <section class="order-confirmed-hero">
      <div class="wrap">
        <h1>Заказ принят</h1>
        <p>Менеджер свяжется с вами в течение 15 минут</p>
      </div>
    </section>

    <section class="order-confirmed-content">
      <div class="wrap">
        <div class="order-confirmed-grid">
          <div class="order-confirmed-info">
              <div class="order-confirmed-card">
                <div class="order-confirmed-icon"><SvgIcon name="clipboard" :size="22" /></div>
                <h3>Детали заказа</h3>
              <div class="order-id">
                <span class="label">ID заказа:</span>
                <span class="value">{{ order.id }}</span>
              </div>
              <div class="order-date">
                <span class="label">Дата:</span>
                <span class="value">{{ formattedDate }}</span>
              </div>
            </div>

            <div class="order-confirmed-card">
              <div class="order-confirmed-icon"><SvgIcon name="eye" :size="22" /></div>
              <h3>Клиент</h3>
              <div class="order-client">
                <div class="client-item">
                  <span class="label">Имя:</span>
                  <span class="value">{{ order.name }}</span>
                </div>
                <div class="client-item">
                  <span class="label">Телефон:</span>
                  <span class="value">{{ order.phone }}</span>
                </div>
              </div>
            </div>

            <div class="order-confirmed-card">
              <div class="order-confirmed-icon"><SvgIcon name="map-pin" :size="22" /></div>
              <h3>Способ получения</h3>
              <div class="delivery-method">
                <span class="label">方式:</span>
                <span class="value">
                  {{ order.delivery === 'delivery' ? 'Доставка' : 'Самовывоз' }}
                </span>
              </div>
              <div v-if="order.delivery === 'delivery'" class="delivery-address">
                <span class="label">Адрес:</span>
                <span class="value">{{ order.address }}</span>
              </div>
            </div>

            <div class="order-confirmed-card">
              <div class="order-confirmed-icon"><SvgIcon name="cash" :size="22" /></div>
              <h3>Стоимость</h3>
              <div class="order-total">
                <span class="label">Итого:</span>
                <span class="value">{{ fmt(order.total) }}</span>
              </div>
            </div>
          </div>

          <div class="order-confirmed-items">
            <h3>Позиции заказа</h3>
            <div v-if="order.items?.length" class="items-list">
              <div
                v-for="(item, idx) in order.items"
                :key="idx"
                class="order-item"
              >
                <div class="order-item__content">
                  <div class="order-item__name">{{ item.name }}</div>
                  <div class="order-item__details">
                    {{ item.size }} • x{{ item.qty }}
                  </div>
                </div>
                <div class="order-item__price">{{ fmt(item.price) }}</div>
              </div>
            </div>
            <div v-else class="no-items">
              <p>Нет данных о заказе</p>
            </div>

            <div class="order-actions">
              <NuxtLink to="/menu" class="btn btn--secondary">
                Продолжить покупку
              </NuxtLink>
              <a href="tel:+79991234567" class="btn btn--primary">
                Позвонить нам
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { fmt } from '~/composables/useUtils'
import { ref, computed } from 'vue'

let savedOrder = null
try {
  const raw = sessionStorage.getItem('lastOrder')
  if (raw) savedOrder = JSON.parse(raw)
} catch {}

const order = ref(savedOrder || {
  id: 'ORD-' + Date.now(),
  name: 'Иван Иванов',
  phone: '+7 (999) 123-45-67',
  delivery: 'delivery',
  total: 1500,
  items: [
    { name: 'Шаурма Классическая', qty: 1, size: 'Обычная', extras: 'Без доп.', price: 290 },
    { name: 'Кола', qty: 2, size: '0.5л', extras: 'Без доп.', price: 120 },
  ],
  address: 'ул. Пушкина, д. 10',
  date: new Date().toISOString(),
  status: 'new'
})

const formattedDate = computed(() => {
  if (!order.value.date) return ''
  const date = new Date(order.value.date)
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

definePageMeta({
  layout: 'default',
})
</script>

<style scoped>
.order-confirmed-page {
  min-height: 100vh;
}

.order-confirmed-hero {
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: #fff;
  padding: 28px 0;
  text-align: center;
}

.order-confirmed-hero h1 {
  font-size: clamp(22px, 3.6vw, 36px);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin: 0;
}

.order-confirmed-hero p {
  font-size: 13px;
  opacity: 0.85;
  margin-top: 8px;
}

.order-confirmed-content {
  padding: 60px 0;
}

.order-confirmed-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

@media (max-width: 900px) {
  .order-confirmed-grid {
    grid-template-columns: 1fr;
  }
}

.order-confirmed-card {
  background: white;
  border-radius: 14px 14px 14px 4px;
  padding: 20px;
  margin-bottom: 16px;
  border: 2px solid rgba(34,34,34,0.07);
}

.order-confirmed-card h3 {
  font-size: 14px;
  font-weight: 800;
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: rgba(34,34,34,0.6);
}

.order-confirmed-icon {
  font-size: 22px;
}

.order-id,
.order-date,
.client-item,
.delivery-method,
.delivery-address,
.order-total {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid rgba(34,34,34,0.06);
}

.order-id:last-child,
.order-date:last-child,
.client-item:last-child,
.delivery-method:last-child,
.delivery-address:last-child,
.order-total:last-child {
  border-bottom: none;
}

.label {
  color: rgba(34,34,34,0.5);
  font-size: 13px;
  font-weight: 600;
}

.value {
  font-weight: 800;
  font-size: 14px;
}

.order-confirmed-items {
  background: white;
  border-radius: 14px 14px 14px 4px;
  padding: 24px;
  border: 2px solid rgba(34,34,34,0.07);
}

.order-confirmed-items h3 {
  font-size: 18px;
  font-weight: 800;
  margin: 0 0 20px;
}

.items-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(34,34,34,0.06);
}

.order-item__content {
  flex: 1;
}

.order-item__name {
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 2px;
}

.order-item__details {
  font-size: 12px;
  color: rgba(34,34,34,0.45);
}

.order-item__price {
  font-weight: 800;
  font-size: 15px;
  color: var(--red);
  min-width: 80px;
  text-align: right;
}

.no-items {
  text-align: center;
  padding: 40px;
  color: rgba(34,34,34,0.4);
}

.order-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
  text-decoration: none;
  text-align: center;
}

.btn--primary {
  background: var(--red);
  color: white;
}

.btn--primary:hover {
  background: var(--red-d);
}

.btn--secondary {
  background: rgba(34,34,34,0.06);
  color: var(--ink);
}

.btn--secondary:hover {
  background: rgba(34,34,34,0.12);
}
</style>
