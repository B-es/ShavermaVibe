<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="wrap hero__in">
        <div class="hero__text">
          <div class="kicker">🔥 ГОРЯЧЕЕ ПРЕДЛОЖЕНИЕ</div>
          <h1>
            НАСТОЯЩАЯ
            <span class="r2">ШАУРМА</span>
            <span class="r3">В ТВОЁМ ГОРОДЕ</span>
          </h1>
          <p class="hero__sub">
            <b>Сочное мясо</b>, свежие овощи и фирменные соусы — всё в одном вкусе. 
            Готовим при тебе за 3 минуты!
          </p>
          <div class="hero__cta">
            <NuxtLink to="/menu" class="btn btn--red">
              Заказать сейчас
              <span>→</span>
            </NuxtLink>
            <a href="#about" class="btn btn--ghost">Узнать больше</a>
          </div>
          <div class="hero__stats">
            <div class="stat">
              <b><i>25+</i></b>
              <span>видов шаурмы</span>
            </div>
            <div class="stat">
              <b><i>4.9</i></b>
              <span>рейтинг в картах</span>
            </div>
            <div class="stat">
              <b><i>3 мин</i></b>
              <span>среднее время готовки</span>
            </div>
          </div>
        </div>
        <div class="stage">
          <div class="stage__ring"></div>
          <div class="stage__hero-emoji">🌯</div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="about" class="features">
      <div class="wrap">
        <h2 class="section-title">Почему выбирают нас</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔥</div>
            <h3>Готовим при тебе</h3>
            <p>Открытая кухня — видишь, как готовится твоя шаурма</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🥬</div>
            <h3>Только свежее</h3>
            <p>Овощи нарезаем каждое утро, мясо маринуем сами</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👨‍🍳</div>
            <h3>Авторские соусы</h3>
            <p>12 видов фирменных соусов, которых нет больше нигде</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🚗</div>
            <h3>Быстрая доставка</h3>
            <p>Бесплатно от 1000₽, привезём за 30 минут</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Products Section -->
    <section class="popular">
      <div class="wrap">
        <div class="section-header">
          <h2 class="section-title">Хиты продаж</h2>
          <NuxtLink to="/menu" class="view-all">Смотреть всё меню →</NuxtLink>
        </div>
        <div class="products-grid">
          <ProductCard
            v-for="product in popularProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="promo-banner">
      <div class="wrap">
        <div class="promo-content">
          <div class="promo-text">
            <span class="promo-label">🎁 АКЦИЯ</span>
            <h2>Скидка 15% на первый заказ</h2>
            <p>Используй промокод <b>START15</b> при оформлении заказа</p>
          </div>
          <NuxtLink to="/menu" class="btn btn--yellow">Попробовать</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews">
      <div class="wrap">
        <h2 class="section-title">Что говорят клиенты</h2>
        <div class="reviews-grid">
          <div v-for="review in reviews" :key="review.id" class="review-card" :style="{ borderColor: review.color }">
            <div class="review-header">
              <div class="review-avatar">{{ review.author[0] }}</div>
              <div class="review-meta">
                <span class="review-author">{{ review.author }}</span>
                <span class="review-rating">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</span>
              </div>
            </div>
            <p class="review-text">{{ review.text }}</p>
            <span class="review-date">{{ review.meta }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="wrap">
        <div class="cta-content">
          <h2>Готов заказать?</h2>
          <p>Выбирай свою идеальную шаурму прямо сейчас</p>
          <NuxtLink to="/menu" class="btn btn--red btn--lg">Перейти в меню</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { PRODUCTS } from '~/composables/useCart'

const popularProducts = computed(() => {
  return PRODUCTS.filter(p => p.pop || p.badge === 'hit').slice(0, 4)
})

const reviews = ref([
  {
    id: 1,
    author: 'Алексей М.',
    rating: 5,
    text: 'Лучшая шаурма в городе! Особенно нравится острая с халапеньо. Готовят быстро, всегда свежее.',
    color: '#FFD9D9',
    meta: '2 дня назад'
  },
  {
    id: 2,
    author: 'Мария К.',
    rating: 5,
    text: 'Заказываю доставку уже третий раз — всё отлично! Упаковано аккуратно, горячее, курьер вежливый.',
    color: '#FFF3C4',
    meta: 'Неделю назад'
  },
  {
    id: 3,
    author: 'Дмитрий В.',
    rating: 4,
    text: 'Вкусно, сытно, недорого. Классическая шаурма — топ! Иногда бывают очереди, но оно того стоит.',
    color: '#E8E0D5',
    meta: '2 недели назад'
  }
])

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* Hero Section */
.hero {
  padding: 80px 0 100px;
  overflow: hidden;
}

.hero__in {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 60px;
  align-items: center;
}

@media (max-width: 900px) {
  .hero__in {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.kicker {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  background: #fff;
  border: 2px solid rgba(214, 40, 40, 0.22);
  color: #d62828;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 8px 15px;
  border-radius: 99px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: clamp(42px, 6vw, 72px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.hero h1 .r2 {
  display: block;
  color: #d62828;
}

.hero h1 .r3 {
  display: block;
  color: transparent;
  -webkit-text-stroke: 2px #222;
  font-size: 0.9em;
}

.hero__sub {
  font-size: 18px;
  color: rgba(34, 34, 34, 0.72);
  max-width: 480px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.hero__sub b {
  color: #222;
}

.hero__cta {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .hero__cta {
    justify-content: center;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  border-radius: 16px 16px 16px 4px;
  padding: 16px 32px;
  font-weight: 800;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.22s;
}

.btn--red {
  background: #d62828;
  color: #fff;
  box-shadow: 0 20px 50px -18px rgba(214, 40, 40, 0.4);
}

.btn--red:hover {
  background: #b91c1c;
  transform: translateY(-3px);
}

.btn--ghost {
  background: transparent;
  color: #222;
  border: 2px solid rgba(34, 34, 34, 0.22);
}

.btn--ghost:hover {
  border-color: #f77f00;
  color: #f77f00;
  transform: translateY(-3px);
}

.btn--yellow {
  background: #fcbf49;
  color: #222;
  box-shadow: 0 18px 40px -14px rgba(252, 191, 73, 0.55);
}

.btn--yellow:hover {
  transform: translateY(-3px);
}

.hero__stats {
  display: flex;
  gap: 48px;
  margin-top: 56px;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .hero__stats {
    justify-content: center;
  }
}

.stat b {
  display: block;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.stat b i {
  font-style: normal;
  color: #f77f00;
}

.stat span {
  font-size: 13px;
  color: rgba(34, 34, 34, 0.55);
  font-weight: 500;
}

/* Stage Animation */
.stage {
  position: relative;
  height: 450px;
  display: grid;
  place-items: center;
}

.stage__ring {
  position: absolute;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 2px dashed rgba(214, 40, 40, 0.32);
  animation: spin 44s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.stage__hero-emoji {
  font-size: 180px;
  filter: drop-shadow(0 25px 50px rgba(214, 40, 40, 0.25));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

/* Features Section */
.features {
  padding: 80px 0;
  background: linear-gradient(180deg, transparent, rgba(252, 191, 73, 0.08), transparent);
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 900;
  text-align: center;
  margin-bottom: 48px;
  letter-spacing: -0.02em;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.feature-card {
  background: #fff;
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 10px 40px -20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #222;
}

.feature-card p {
  font-size: 14px;
  color: rgba(34, 34, 34, 0.65);
  line-height: 1.6;
}

/* Popular Products */
.popular {
  padding: 80px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.view-all {
  color: #d62828;
  font-weight: 600;
  text-decoration: none;
  transition: 0.2s;
}

.view-all:hover {
  color: #b91c1c;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

/* Promo Banner */
.promo-banner {
  padding: 60px 0;
}

.promo-content {
  background: linear-gradient(135deg, #fcbf49 0%, #f77f00 100%);
  border-radius: 24px;
  padding: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
}

@media (max-width: 768px) {
  .promo-content {
    flex-direction: column;
    text-align: center;
    padding: 32px;
  }
}

.promo-label {
  display: inline-block;
  background: #fff;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 16px;
}

.promo-text h2 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
}

.promo-text p {
  font-size: 16px;
  opacity: 0.9;
}

.promo-text b {
  background: #fff;
  padding: 2px 10px;
  border-radius: 6px;
}

/* Reviews Section */
.reviews {
  padding: 80px 0;
  background: rgba(252, 191, 73, 0.05);
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.review-card {
  background: #fff;
  border: 2px solid;
  border-radius: 20px;
  padding: 28px;
  transition: transform 0.2s;
}

.review-card:hover {
  transform: translateY(-3px);
}

.review-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.review-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f77f00;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 18px;
}

.review-meta {
  display: flex;
  flex-direction: column;
}

.review-author {
  font-weight: 600;
  color: #222;
}

.review-rating {
  color: #fcbf49;
  font-size: 14px;
}

.review-text {
  color: rgba(34, 34, 34, 0.72);
  line-height: 1.6;
  margin-bottom: 16px;
}

.review-date {
  font-size: 12px;
  color: rgba(34, 34, 34, 0.45);
}

/* CTA Section */
.cta-section {
  padding: 100px 0;
}

.cta-content {
  background: #222;
  border-radius: 24px;
  padding: 64px 48px;
  text-align: center;
  color: #fff;
}

.cta-content h2 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
}

.cta-content p {
  font-size: 18px;
  opacity: 0.8;
  margin-bottom: 32px;
}

.btn--lg {
  padding: 18px 42px;
  font-size: 17px;
}
</style>
