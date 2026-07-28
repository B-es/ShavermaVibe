<script setup lang="ts">
import type { Product } from '~/types/product'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

const addToCart = () => {
  if (props.product.isAvailable) {
    cartStore.addToCart(props.product, 1)
  }
}
</script>

<template>
  <NuxtLink
    :to="`/menu/${product.id}`"
    class="card group cursor-pointer block"
  >
    <div class="relative overflow-hidden aspect-square">
      <NuxtImg
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        format="webp"
        quality="80"
      />
      <div
        v-if="!product.isAvailable"
        class="absolute inset-0 bg-black/50 flex items-center justify-center"
      >
        <span class="text-white font-semibold">Нет в наличии</span>
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-bold text-secondary mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
      
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-primary">{{ product.price }} ₽</span>
        
        <button
          @click.prevent="addToCart"
          :disabled="!product.isAvailable"
          class="btn-primary px-4 py-2 text-sm"
        >
          В корзину
        </button>
      </div>
    </div>
  </NuxtLink>
</template>
