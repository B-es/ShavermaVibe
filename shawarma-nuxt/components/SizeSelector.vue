<template>
  <div class="size-selector">
    <h3>Размер</h3>
    <div class="size-options">
      <button
        v-for="size in sizes"
        :key="size.id"
        @click="emit('select-size', size)"
        :class="{
          active: selectedSize?.id === size.id,
        }"
      >
        {{ size.label }}
        <span class="size-price">
          {{ formatPrice(size.priceModifier) }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Size {
  id: string
  label: string
  priceModifier: number
  kcal?: number
}

const props = defineProps<{
  sizes: Size[]
  selectedSize: Size | null
}>()

const emit = defineEmits<{
  (e: 'select-size', size: Size): void
}>()

const formatPrice = (price: number) => {
  if (price === 0) return 'Без доп.'
  return `+${price.toFixed(0)}₽`
}
</script>

<style scoped>
.size-selector {
  margin-bottom: 24px;
}

.size-selector h3 {
  font-size: 1.1rem;
  color: #2d3436;
  margin-bottom: 12px;
  font-weight: 600;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.size-options button {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  color: #2d3436;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.size-options button:hover {
  border-color: #ff6b35;
  background: #fff5f0;
}

.size-options button.active {
  background: #ff6b35;
  color: white;
  border-color: #ff6b35;
}

.size-price {
  font-size: 0.85rem;
  opacity: 0.9;
}
</style>
