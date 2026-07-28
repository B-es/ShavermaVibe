<template>
  <div>
    <header class="nav" :class="{ scrolled: navScrolled }">
      <div class="wrap nav__in">
        <a class="logo" @click="navigateTo('/')">
          <span class="logo__flame">🔥</span>
          <span>ШАУРМА<em>.</em></span>
        </a>
        <nav class="nav__links">
          <a :class="{ active: route === 'home' }" @click="navigateTo('/')">Главная</a>
          <a :class="{ active: route === 'menu' }" @click="navigateTo('/menu')">Меню</a>
          <a :class="{ active: route === 'about' }" @click="navigateTo('/about')">О нас</a>
          <a :class="{ active: route === 'contacts' }" @click="navigateTo('/contacts')">Контакты</a>
        </nav>
        <div class="nav__right">
          <a href="tel:+79991234567" class="nav__phone">+7 (999) 123-45-67</a>
          <button class="cart-btn" @click="showCart = true">
            🛒 Корзина
            <span class="cart-count" :class="{ pop: popAnim }">{{ cartCount }}</span>
          </button>
        </div>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="wrap hero__in">
          <div>
            <span class="kicker">Горячо · Свежо · Быстро</span>
            <h1>
              Настоящая<br/>
              <span class="r2">ШАУРМА</span>
              <span class="r3">В ТВОЁМ ГОРОДЕ</span>
            </h1>
            <p class="hero__sub">
              Готовим с <b>2018 года</b>. Только свежие продукты, авторские соусы и мясо на гриле.
            </p>
            <div class="hero__cta">
              <button class="btn btn--red" @click="navigateTo('/menu')">Заказать сейчас →</button>
              <button class="btn btn--ghost" @click="navigateTo('/about')">Узнать больше</button>
            </div>
            <div class="hero__stats">
              <div class="stat"><b><i>25+</i></b><span>видов шаурмы</span></div>
              <div class="stat"><b><i>50K+</i></b><span>довольных клиентов</span></div>
              <div class="stat"><b><i>4.9</i></b><span>рейтинг в картах</span></div>
            </div>
          </div>
          <div class="stage">
            <div class="stage__ring"></div>
            <div class="grill">
              <div class="grill__glow"></div>
              <div class="grill__knob"></div>
              <div class="grill__rod"></div>
              <div class="meat">
                <i></i><i></i><i></i><i></i><i></i>
              </div>
              <div class="grill__base"></div>
            </div>
          </div>
        </div>
      </section>

      <section class="menu-section">
        <div class="wrap">
          <h2 class="section-title">Популярное</h2>
          <p class="section-subtitle">Выбор наших гостей — хиты продаж этой недели</p>
          <div class="products-grid">
            <div v-for="product in popularProducts" :key="product.id" class="product-card" @click="openProduct(product)">
              <span v-if="product.badge" class="product-card__badge" :class="'product-card__badge--' + product.badge">{{ BADGE_LABELS[product.badge] }}</span>
              <div class="product-card__visual" :style="{ background: product.bg }">{{ product.emoji }}</div>
              <div class="product-card__name">{{ product.name }}</div>
              <div class="product-card__desc">{{ product.desc }}</div>
              <div class="product-card__meta">
                <span class="product-card__price">{{ fmt(product.price) }}</span>
                <button class="product-card__btn">В корзину</button>
              </div>
            </div>
          </div>
          <div style="text-align:center;margin-top:32px;">
            <button class="btn btn--yellow" @click="navigateTo('/menu')">Всё меню</button>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="wrap">
        <div class="footer__grid">
          <div class="footer__col">
            <h4>ШАУРМА</h4>
            <p>Лучшая шаурма в городе с 2018 года</p>
          </div>
          <div class="footer__col">
            <h4>Контакты</h4>
            <a href="tel:+79991234567">+7 (999) 123-45-67</a>
            <a href="mailto:info@shawarma.ru">info@shawarma.ru</a>
          </div>
          <div class="footer__col">
            <h4>Адреса</h4>
            <p>ул. Пушкина, д. 10</p>
            <p>пр. Ленина, д. 25</p>
          </div>
        </div>
        <div class="footer__bottom">© 2024 ШАУРМА. Все права защищены.</div>
      </div>
    </footer>

    <ClientOnly>
      <Teleport to="body">
        <div v-if="showCart" class="modal-overlay" @click.self="showCart = false">
          <div class="cart-panel">
            <div class="cart-panel__header">
              <span class="cart-panel__title">Корзина</span>
              <button class="cart-panel__close" @click="showCart = false">✕</button>
            </div>
            <div class="cart-panel__body">
              <div v-if="cart.length === 0" class="empty-cart">
                <div class="empty-cart__emoji">🛒</div>
                <p>Корзина пуста</p>
              </div>
              <div v-else>
                <div v-for="(item, idx) in cart" :key="idx" class="cart-item">
                  <div class="cart-item__visual" :style="{ background: item.bg }">{{ item.emoji }}</div>
                  <div class="cart-item__info">
                    <div class="cart-item__name">{{ item.name }}</div>
                    <div class="cart-item__meta">{{ item.sizeLabel }} • {{ item.extrasLabel }}</div>
                    <div class="cart-item__controls">
                      <div class="cart-item__qty">
                        <button @click="decreaseQty(idx)">−</button>
                        <span>{{ item.qty }}</span>
                        <button @click="increaseQty(idx)">+</button>
                      </div>
                      <span class="cart-item__price">{{ fmt(item.price * item.qty) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="cart.length > 0" class="cart-panel__footer">
              <div class="cart-summary">
                <div class="cart-summary__row"><span>Подытог:</span><span>{{ fmt(subtotal) }}</span></div>
                <div v-if="discount > 0" class="cart-summary__row"><span>Скидка:</span><span>-{{ fmt(discount) }}</span></div>
                <div class="cart-summary__row"><span>Доставка:</span><span>{{ delivery === 0 ? 'Бесплатно' : fmt(delivery) }}</span></div>
                <div class="cart-summary__row total"><span>Итого:</span><span>{{ fmt(total) }}</span></div>
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
import { PRODUCTS, BADGE_LABELS, fmt } from '~/composables/useCart'

const route = ref('home')
const navScrolled = ref(false)
const showCart = ref(false)
const popAnim = ref(false)

const { cart, subtotal, discount, delivery, total, count: cartCount } = useCart()

const popularProducts = computed(() => PRODUCTS.filter(p => p.pop).slice(0, 3))

const openProduct = (product) => {
  navigateTo('/menu')
}

const increaseQty = (idx) => {
  cart.value[idx].qty++
  triggerPop()
}

const decreaseQty = (idx) => {
  if (cart.value[idx].qty > 1) {
    cart.value[idx].qty--
  } else {
    cart.value.splice(idx, 1)
  }
}

const triggerPop = () => {
  popAnim.value = true
  setTimeout(() => popAnim.value = false, 400)
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    navScrolled.value = window.scrollY > 50
  })
})
</script>
