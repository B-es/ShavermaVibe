<template>
  <div>
    <!-- Header / Navigation -->
    <header class="nav" :class="{ scrolled: navScrolled }">
      <div class="wrap nav__in">
        <NuxtLink to="/" class="logo">
          <span class="logo__flame">🔥</span>
          <span>ШАУРМА<em>.</em></span>
        </NuxtLink>
        <nav class="nav__links">
          <NuxtLink to="/" :class="{ active: route === '/' }">Главная</NuxtLink>
          <NuxtLink to="/menu" :class="{ active: route === '/menu' }">Меню</NuxtLink>
          <NuxtLink to="/about" :class="{ active: route === '/about' }">О нас</NuxtLink>
          <NuxtLink to="/contacts" :class="{ active: route === '/contacts' }">Контакты</NuxtLink>
        </nav>
        <div class="nav__right">
          <a href="tel:+79991234567" class="nav__phone">+7 (999) 123-45-67</a>
          <CartButton />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <div class="wrap">
        <div class="footer__grid">
          <div class="footer__col">
            <h4>🔥 ШАУРМА</h4>
            <p>Лучшая шаурма в городе с 2018 года</p>
          </div>
          <div class="footer__col">
            <h4>Меню</h4>
            <NuxtLink to="/menu">Шаурма</NuxtLink>
            <NuxtLink to="/menu">Донер</NuxtLink>
            <NuxtLink to="/menu">Комбо</NuxtLink>
            <NuxtLink to="/menu">Напитки</NuxtLink>
          </div>
          <div class="footer__col">
            <h4>Контакты</h4>
            <a href="tel:+79991234567">+7 (999) 123-45-67</a>
            <a href="mailto:info@shawarma.ru">info@shawarma.ru</a>
            <p>ул. Пушкина, д. 10</p>
          </div>
          <div class="footer__col">
            <h4>Соцсети</h4>
            <a href="#">Telegram</a>
            <a href="#">VKontakte</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div class="footer__bottom">
          © 2024 ШАУРМА. Все права защищены.
        </div>
      </div>
    </footer>

    <!-- Cart Modal -->
    <ClientOnly>
      <Teleport to="body">
        <div v-if="cartStore.isOpen" class="modal-overlay" @click.self="cartStore.closeCart()">
          <div class="cart-panel">
            <div class="cart-panel__header">
              <span class="cart-panel__title">Корзина</span>
              <button class="cart-panel__close" @click="cartStore.closeCart()">✕</button>
            </div>
            <div class="cart-panel__body">
              <div v-if="!cartStore.hasItems" class="empty-cart">
                <div class="empty-cart__emoji">🛒</div>
                <p>Корзина пуста</p>
              </div>
              <div v-else>
                <div v-for="(item, idx) in cartStore.items" :key="idx" class="cart-item">
                  <div class="cart-item__visual" :style="{ background: item.bg }">{{ item.emoji }}</div>
                  <div class="cart-item__info">
                    <div class="cart-item__name">{{ item.name }}</div>
                    <div class="cart-item__meta">{{ item.sizeLabel }} • {{ item.extrasLabel }}</div>
                    <div class="cart-item__controls">
                      <div class="cart-item__qty">
                        <button @click="cartStore.decreaseQty(idx)">−</button>
                        <span>{{ item.qty }}</span>
                        <button @click="cartStore.increaseQty(idx)">+</button>
                      </div>
                      <span class="cart-item__price">{{ fmt(item.price * item.qty) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="cartStore.hasItems" class="cart-panel__footer">
              <div class="cart-summary">
                <div class="cart-summary__row"><span>Подытог:</span><span>{{ fmt(cartStore.subtotal) }}</span></div>
                <div v-if="cartStore.discount > 0" class="cart-summary__row"><span>Скидка:</span><span>-{{ fmt(cartStore.discount) }}</span></div>
                <div class="cart-summary__row"><span>Доставка:</span><span>{{ cartStore.delivery === 0 ? 'Бесплатно' : fmt(cartStore.delivery) }}</span></div>
                <div class="cart-summary__row total"><span>Итого:</span><span>{{ fmt(cartStore.total) }}</span></div>
              </div>
              <button class="checkout-btn" @click="navigateTo('/checkout')">Оформить заказ</button>
            </div>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<script setup>
import { fmt } from '~/composables/useCart'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const navScrolled = ref(false)
const cartStore = useCartStore()

onMounted(() => {
  window.addEventListener('scroll', () => {
    navScrolled.value = window.scrollY > 50
  })
})
</script>
