<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="wrap">
        <h1>О нас</h1>
        <p>История лучшей шаурмы в городе</p>
      </div>
    </section>

    <section class="about-content">
      <div class="wrap">
        <div class="about-grid">
          <div class="about-text">
            <h2>Наша история</h2>
            <p>
              Мы начали готовить шаурму в 2018 году с простой идеей: сделать лучшую шаурму в городе, 
              используя только свежие продукты и авторские рецепты.
            </p>
            <p>
              За эти годы мы выросли из небольшой точки в сеть популярных ресторанов, но наши 
              принципы остались неизменными: качество, скорость и вкус.
            </p>
            
            <h3>Наши преимущества</h3>
            <ul class="features-list">
              <li>🔥 Свежее мясо на гриле</li>
              <li>🥬 Только свежие овощи</li>
              <li>👨‍🍳 Авторские соусы</li>
              <li>⚡ Быстрая подача</li>
              <li>🚗 Бесплатная доставка от 1000₽</li>
            </ul>
          </div>
          
          <div class="about-stats">
            <div class="stat-card">
              <span class="stat-number">25+</span>
              <span class="stat-label">видов шаурмы</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">50K+</span>
              <span class="stat-label">довольных клиентов</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">4.9</span>
              <span class="stat-label">рейтинг в картах</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">6</span>
              <span class="stat-label">лет опыта</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding-top: 80px;
}

.about-hero {
  background: linear-gradient(135deg, #ff6b35 0%, #feca57 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.about-hero h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.about-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.about-content {
  padding: 60px 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

.about-text h2 {
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 20px;
}

.about-text p {
  color: #636e72;
  line-height: 1.8;
  margin-bottom: 16px;
}

.about-text h3 {
  font-size: 1.5rem;
  color: #2d3436;
  margin-top: 30px;
  margin-bottom: 16px;
}

.features-list {
  list-style: none;
  padding: 0;
}

.features-list li {
  padding: 8px 0;
  color: #2d3436;
  font-size: 1.1rem;
}

.about-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.stat-card {
  background: white;
  border: 2px solid #ff6b35;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ff6b35;
}

.stat-label {
  display: block;
  color: #636e72;
  margin-top: 8px;
}
</style>
