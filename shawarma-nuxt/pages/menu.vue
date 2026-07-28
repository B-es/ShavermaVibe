<template>
  <div class="menu-page">
    <section class="menu-hero">
      <div class="wrap">
        <h1>Наше меню</h1>
        <p>Выбирайте лучшую шаурму в городе</p>
      </div>
    </section>

    <section class="menu-content">
      <div class="wrap">
        <!-- Категории -->
        <div class="categories">
          <button
            v-for="cat in categories"
            :key="cat.id"
            :class="['category-btn', { active: activeCategory === cat.id }]"
            @click="activeCategory = cat.id"
          >
            {{ cat.label }}
          </button>
        </div>

        <!-- Список продуктов -->
        <div class="products-grid">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { PRODUCTS } from '~/composables/useCart'

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'shawarma', label: 'Шаурма' },
  { id: 'drinks', label: 'Напитки' },
  { id: 'sides', label: 'Дополнения' },
]

const activeCategory = ref('all')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return PRODUCTS
  }
  // Для демонстрации фильтруем по наличию badge или просто возвращаем все
  return PRODUCTS
})

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.menu-page {
  min-height: 100vh;
  padding-top: 80px;
}

.menu-hero {
  background: linear-gradient(135deg, #ff6b35 0%, #feca57 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.menu-hero h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.menu-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.menu-content {
  padding: 40px 0;
}

.categories {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  padding: 10px 24px;
  border: 2px solid #ff6b35;
  background: white;
  color: #ff6b35;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.category-btn:hover {
  background: #fff5f0;
}

.category-btn.active {
  background: #ff6b35;
  color: white;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}
</style>
