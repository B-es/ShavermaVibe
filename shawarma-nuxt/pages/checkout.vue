<template>
  <div class="checkout-page">
    <section class="checkout-hero">
      <div class="wrap">
        <h1>Оформление заказа</h1>
        <p>Заполните данные для доставки</p>
      </div>
    </section>

    <section class="checkout-content">
      <div class="wrap">
        <div class="checkout-grid">
          <div class="checkout-form-wrapper">
            <h3>Данные клиента</h3>
            <form class="checkout-form" @submit.prevent="submitOrder">
              <div class="form-group">
                <label for="name">Ваше имя</label>
                <input
                  id="name"
                  v-model="order.name"
                  type="text"
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="phone">Телефон</label>
                <input
                  id="phone"
                  v-model="order.phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>

              <div class="form-group">
                <label>Тип получения</label>
                <div class="delivery-type">
                  <label class="radio-card">
                    <input
                      v-model="order.deliveryType"
                      type="radio"
                      value="delivery"
                    />
                    <span>🚗 Доставка</span>
                  </label>
                  <label class="radio-card">
                    <input
                      v-model="order.deliveryType"
                      type="radio"
                      value="pickup"
                    />
                    <span>🏪 Самовывоз</span>
                  </label>
                </div>
              </div>

              <div v-if="order.deliveryType === 'delivery'" class="form-group">
                <label for="address">Адрес доставки</label>
                <input
                  id="address"
                  v-model="order.address"
                  type="text"
                  placeholder="Улица, дом, квартира"
                />
              </div>

              <div class="form-group">
                <label for="comment">Комментарий к заказу</label>
                <textarea
                  id="comment"
                  v-model="order.comment"
                  rows="3"
                  placeholder="Пожелания к заказу"
                ></textarea>
              </div>
              
              <button type="submit" class="btn-submit">
                Оформить заказ
              </button>
            </form>
          </div>
          
          <div class="order-summary">
            <h3>Ваш заказ</h3>
            
            <div v-if="!cartStore.hasItems" class="empty-order">
              <p>Корзина пуста</p>
              <NuxtLink to="/menu" class="back-to-menu">Перейти в меню</NuxtLink>
            </div>
            
            <div v-else>
              <div v-for="(item, idx) in cartStore.items" :key="idx" class="order-item">
                <div class="order-item__visual" :style="{ background: item.bg }">{{ item.emoji }}</div>
                <div class="order-item__info">
                  <div class="order-item__name">{{ item.name }}</div>
                  <div class="order-item__meta">{{ item.sizeLabel }} • x{{ item.qty }}</div>
                </div>
                <div class="order-item__price">{{ fmt(item.price * item.qty) }}</div>
              </div>
              
              <div class="order-totals">
                <div class="total-row">
                  <span>Подытог:</span>
                  <span>{{ fmt(cartStore.subtotal) }}</span>
                </div>
                <div v-if="cartStore.discount > 0" class="total-row discount">
                  <span>Скидка:</span>
                  <span>-{{ fmt(cartStore.discount) }}</span>
                </div>
                <div class="total-row">
                  <span>Доставка:</span>
                  <span>{{ cartStore.delivery === 0 ? 'Бесплатно' : fmt(cartStore.delivery) }}</span>
                </div>
                <div class="total-row grand-total">
                  <span>Итого:</span>
                  <span>{{ fmt(cartStore.total) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { fmt } from '~/composables/useCart'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const order = ref({
  name: '',
  phone: '',
  deliveryType: 'delivery',
  address: '',
  comment: ''
})

const submitOrder = () => {
  // Здесь будет логика создания заказа
  alert('Заказ оформлен! Менеджер свяжется с вами.')
  cartStore.clearCart()
  navigateTo('/')
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  padding-top: 80px;
}

.checkout-hero {
  background: linear-gradient(135deg, #ff6b35 0%, #feca57 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.checkout-hero h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.checkout-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.checkout-content {
  padding: 60px 0;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
}

@media (max-width: 1024px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}

.checkout-form-wrapper {
  background: white;
  border: 2px solid #ff6b35;
  border-radius: 16px;
  padding: 32px;
}

.checkout-form-wrapper h3 {
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #2d3436;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6b35;
}

.delivery-type {
  display: flex;
  gap: 12px;
}

.radio-card {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-card:hover {
  border-color: #ff6b35;
  background: #fff5f0;
}

.radio-card input[type="radio"] {
  accent-color: #ff6b35;
}

.btn-submit {
  width: 100%;
  padding: 14px 24px;
  background: #ff6b35;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #e85a2a;
}

.order-summary {
  background: white;
  border: 2px solid #ff6b35;
  border-radius: 16px;
  padding: 32px;
  height: fit-content;
}

.order-summary h3 {
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 24px;
}

.empty-order {
  text-align: center;
  padding: 40px 0;
}

.empty-order p {
  color: #636e72;
  margin-bottom: 16px;
}

.back-to-menu {
  color: #ff6b35;
  text-decoration: underline;
  font-weight: 600;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.order-item__visual {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.order-item__info {
  flex: 1;
}

.order-item__name {
  font-weight: 600;
  color: #2d3436;
}

.order-item__meta {
  font-size: 0.9rem;
  color: #636e72;
}

.order-item__price {
  font-weight: 600;
  color: #ff6b35;
}

.order-totals {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: #636e72;
}

.total-row.discount {
  color: #27ae60;
}

.total-row.grand-total {
  font-size: 1.3rem;
  font-weight: bold;
  color: #2d3436;
  border-top: 2px solid #f0f0f0;
  margin-top: 12px;
  padding-top: 16px;
}

.total-row.grand-total span:last-child {
  color: #ff6b35;
}
</style>
