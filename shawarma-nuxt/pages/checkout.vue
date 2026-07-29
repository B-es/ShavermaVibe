<template>
  <div class="checkout-page">
    <section class="checkout-hero">
      <div class="wrap">
        <span class="kicker">Оформление заказа</span>
        <h1>Заполните данные для доставки</h1>
      </div>
    </section>

    <section class="checkout-content">
      <div class="wrap">
        <div class="checkout-grid">
          <div class="checkout-form-wrapper">
            <form class="checkout-form" @submit.prevent="submitOrder">
              <div class="form-group">
                <label for="name">Ваше имя</label>
                <input id="name" v-model="order.name" type="text" placeholder="Иван Иванов" required />
              </div>

              <div class="form-group">
                <label for="phone">Телефон</label>
                <input id="phone" v-model="order.phone" type="tel" placeholder="+7 (999) 123-45-67" required />
              </div>

              <div class="form-group">
                <label>Тип получения</label>
                <div class="delivery-type">
                  <label class="radio-block" :class="{ active: order.deliveryType === 'delivery' }">
                    <input v-model="order.deliveryType" type="radio" value="delivery" />
                    <span class="radio-block__icon">🚗</span>
                    <span class="radio-block__label">Курьер</span>
                  </label>
                  <label class="radio-block" :class="{ active: order.deliveryType === 'pickup' }">
                    <input v-model="order.deliveryType" type="radio" value="pickup" />
                    <span class="radio-block__icon">🏪</span>
                    <span class="radio-block__label">Самовывоз</span>
                  </label>
                </div>
              </div>

              <div v-if="order.deliveryType === 'delivery'" class="form-group">
                <label>Адрес доставки</label>
                <div v-if="savedAddresses.length" class="saved-addresses">
                  <label v-for="addr in savedAddresses" :key="addr.id" class="address-option" :class="{ active: order.addressId === addr.id }">
                    <input v-model="order.addressId" type="radio" :value="addr.id" />
                    <span class="address-option__main">{{ addr.address }}</span>
                    <span class="address-option__sub">{{ [addr.ent ? `п.${addr.ent}` : '', addr.floor ? `эт.${addr.floor}` : '', addr.apt ? `кв.${addr.apt}` : ''].filter(Boolean).join(' · ') }}</span>
                    <span v-if="addr.def" class="address-option__badge">Основной</span>
                  </label>
                </div>
                <div class="add-address-fields">
                  <div class="form-row">
                    <div class="fg--wide">
                      <label>Улица, дом</label>
                      <input v-model="newAddr.street" type="text" placeholder="ул. Пушкина, д. 10" />
                    </div>
                    <div>
                      <label>Подъезд</label>
                      <input v-model="newAddr.ent" type="text" placeholder="1" />
                    </div>
                    <div>
                      <label>Этаж</label>
                      <input v-model="newAddr.floor" type="text" placeholder="2" />
                    </div>
                    <div>
                      <label>Квартира</label>
                      <input v-model="newAddr.apt" type="text" placeholder="5" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="comment">Комментарий к заказу</label>
                <textarea id="comment" v-model="order.comment" rows="3" placeholder="Пожелания (например: без лука, позвонить за 10 минут)"></textarea>
              </div>

              <button type="submit" class="btn btn--red" style="width:100%;justify-content:center;padding:14px 28px;font-size:15px">
                Подтвердить заказ
              </button>
            </form>
          </div>

          <div class="order-summary">
            <h3>Ваш заказ</h3>

            <div v-if="!cartStore.hasItems" class="empty-order">
              <p>Корзина пуста</p>
              <NuxtLink to="/menu" class="btn btn--red btn--sm">Перейти в меню</NuxtLink>
            </div>

            <div v-else>
              <div v-for="(item, idx) in cartStore.items" :key="idx" class="order-item">
                <div class="order-item__visual">{{ item.emoji }}</div>
                <div class="order-item__info">
                  <div class="order-item__name">{{ item.name }}</div>
                  <div class="order-item__meta">{{ item.sizeLabel }} • x{{ item.qty }}</div>
                </div>
                <div class="order-item__price">{{ fmt(item.subtotal) }}</div>
              </div>

              <div class="order-totals">
                <div class="total-row"><span>Подытог:</span><span>{{ fmt(cartStore.subtotal) }}</span></div>
                <div v-if="cartStore.discount > 0" class="total-row discount"><span>Скидка:</span><span>-{{ fmt(cartStore.discount) }}</span></div>
                <div class="total-row"><span>Доставка:</span><span>{{ order.deliveryType === 'pickup' ? 'Бесплатно' : cartStore.delivery === 0 ? 'Бесплатно' : fmt(cartStore.delivery) }}</span></div>
                <div class="total-row grand-total"><span>Итого:</span><span>{{ fmt(finalTotal) }}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { fmt } from '~/composables/useUtils'
import { useCartStore } from '~/stores/cart'
import { useOrderStore } from '~/stores/orders'
import { useSessionStore } from '~/stores/session'
import { useAuthStore } from '~/stores/auth'
import { ref, computed, onMounted } from 'vue'

const cartStore = useCartStore()
const orderStore = useOrderStore()
const sessionStore = useSessionStore()
const authStore = useAuthStore()

onMounted(() => { sessionStore.load() })

const savedAddresses = computed(() => sessionStore.addresses)

const newAddr = ref({ street: '', ent: '', floor: '', apt: '' })

const order = ref({
  name: authStore.user?.name || '',
  phone: authStore.user?.phone || '',
  deliveryType: 'delivery',
  addressId: null,
  address: '',
  comment: '',
})

const finalTotal = computed(() => {
  return cartStore.subtotal - cartStore.discount + cartStore.delivery
})

const submitOrder = () => {
  if (authStore.isAdmin) { alert('Администратор не может оформлять заказы'); return }

  let addr = order.value.address
  if (order.value.deliveryType === 'delivery') {
    if (order.value.addressId) {
      const saved = sessionStore.addresses.find(a => a.id === order.value.addressId)
      if (saved) addr = saved.address
    } else {
      const parts = [newAddr.value.street.trim()]
      if (newAddr.value.apt) parts.push(`кв.${newAddr.value.apt}`)
      if (newAddr.value.ent) parts.push(`п.${newAddr.value.ent}`)
      if (newAddr.value.floor) parts.push(`эт.${newAddr.value.floor}`)
      addr = parts.join(', ')
    }
  }

  const orderData = {
    id: 'ORD-' + Date.now(),
    name: order.value.name,
    phone: order.value.phone,
    delivery: order.value.deliveryType,
    total: finalTotal.value,
    items: cartStore.items.map(item => ({
      name: item.name, qty: item.qty, size: item.sizeLabel,
      price: item.subtotal,
    })),
    comment: order.value.comment,
    address: order.value.deliveryType === 'delivery' ? addr : 'Самовывоз',
    date: new Date().toISOString(),
    status: 'new',
  }

  console.log('Order submitted:', orderData)

  orderStore.addOrder(orderData)
  sessionStorage.setItem('lastOrder', JSON.stringify(orderData))
  cartStore.closeCart()
  cartStore.clearCart()
  navigateTo('/order-confirmed')
}

definePageMeta({ layout: 'default' })
</script>

<style scoped>
.checkout-page { min-height: 100vh; }
.checkout-hero {
  background: linear-gradient(135deg, var(--red) 0%, var(--orange) 60%, var(--yellow) 100%);
  color: #fff;
  padding: 28px 0;
  text-align: center;
}
.checkout-hero .kicker {
  display: inline-flex; align-items: center; gap: 9px;
  background: rgba(255,255,255,0.2); color: #fff;
  font-weight: 700; font-size: 11px;
  letter-spacing: 0.1em; text-transform: uppercase;
  padding: 6px 12px; border-radius: 99px; margin-bottom: 8px;
}
.checkout-hero h1 {
  font-size: clamp(22px, 3.6vw, 36px);
  font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase;
}
.checkout-content { padding: 60px 0 100px; }
.checkout-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  align-items: start;
}
@media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr; } }

.checkout-form-wrapper {
  background: #fff;
  border-radius: 16px;
  border: 2px solid var(--yellow);
  padding: 32px;
}
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(34,34,34,0.55); margin-bottom: 6px; }
.form-group input[type="text"],
.form-group input[type="tel"],
.form-group textarea {
  width: 100%; padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem; font-family: inherit;
  background: #fff;
  transition: border-color 0.2s; box-sizing: border-box;
}
.form-group input:focus,
.form-group textarea:focus { outline: none; border-color: #e0e0e0; }
.form-group textarea { resize: vertical; }

.add-address-fields { margin-top: 12px; }
.add-address-fields .form-row { display: flex; gap: 12px; flex-wrap: wrap; }
.add-address-fields .form-row > div { flex: 1; min-width: 100px; }
.add-address-fields .form-row > .fg--wide { flex: 2; min-width: 200px; }
.add-address-fields .form-row label { display: block; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(34,34,34,0.5); margin-bottom: 6px; }
.add-address-fields .form-row input {
  width: 100%; padding: 10px 12px; border: 2px solid rgba(34,34,34,0.14);
  border-radius: 10px; font-size: 14px; font-family: inherit;
  background: var(--cream); transition: 0.2s; box-sizing: border-box;
}
.add-address-fields .form-row input:focus { outline: none; border-color: var(--orange); }

.delivery-type { display: flex; gap: 12px; }
.radio-block {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px;
  padding: 24px 20px; cursor: pointer;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: #fff; transition: border-color 0.2s;
}
.radio-block:hover { border-color: #ccc; }
.radio-block.active { border-color: var(--ink); }
.radio-block input { display: none; }
.radio-block__icon { font-size: 28px; }
.radio-block__label { font-weight: 800; font-size: 16px; }

.saved-addresses { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
.address-option {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; cursor: pointer;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  transition: border-color 0.2s; background: #fff;
}
.address-option:hover { border-color: #ccc; }
.address-option.active { border-color: var(--ink); }
.address-option input { display: none; }
.address-option__main { font-weight: 700; font-size: 14px; }
.address-option__sub { font-size: 12px; color: rgba(34,34,34,0.45); margin-left: auto; }
.address-option__badge { font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 2px 8px; border-radius: 99px; background: var(--yellow); color: var(--ink); }

.order-summary {
  background: #fff;
  border-radius: 16px;
  border: 2px solid #eee;
  padding: 28px;
  position: sticky; top: 20px;
}
.order-summary h3 { font-size: 18px; font-weight: 800; margin: 0 0 20px; }
.empty-order { text-align: center; padding: 40px 0; color: rgba(34,34,34,0.5); }
.empty-order p { margin-bottom: 16px; }
.order-item { display: flex; align-items: center; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(34,34,34,0.06); }
.order-item__visual { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 24px; background: rgba(34,34,34,0.03); flex-shrink: 0; }
.order-item__info { flex: 1; }
.order-item__name { font-weight: 700; font-size: 14px; margin-bottom: 2px; }
.order-item__meta { font-size: 12px; color: rgba(34,34,34,0.45); }
.order-item__price { font-weight: 800; font-size: 15px; color: var(--red); white-space: nowrap; }
.order-totals { margin-top: 20px; padding-top: 20px; border-top: 2px solid rgba(34,34,34,0.06); }
.total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; }
.total-row.discount { color: #27ae60; }
.total-row.grand-total { font-size: 18px; font-weight: 900; border-top: 2px solid rgba(34,34,34,0.06); margin-top: 10px; padding-top: 14px; }
.total-row.grand-total span:last-child { color: var(--red); }
</style>
