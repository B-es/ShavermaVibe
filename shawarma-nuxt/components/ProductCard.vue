<script setup lang="ts">
import type { Product } from '~/types/product'
import { useCartStore } from '~/stores/cart'

const props = defineProps<{
  product: Product
}>()

const cartStore = useCartStore()

const addToCart = () => {
  if (props.product.available !== false) {
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
      <div
        class="w-full h-full flex items-center justify-center text-6xl"
        :style="{ background: product.bg }"
      >
        {{ product.emoji }}
      </div>
      <div
        v-if="product.available === false"
        class="absolute inset-0 bg-black/50 flex items-center justify-center"
      >
        <span class="text-white font-semibold">Нет в наличии</span>
      </div>
      <div
        v-if="product.badge"
        class="absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold uppercase"
        :class="{
          'bg-red-500 text-white': product.badge === 'hit',
          'bg-green-500 text-white': product.badge === 'new',
          'bg-orange-500 text-white': product.badge === 'spicy',
          'bg-emerald-500 text-white': product.badge === 'veg',
        }"
      >
        {{ product.badge }}
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-bold text-ink mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ product.desc }}</p>
      
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-red">{{ product.price }} ₽</span>
        
        <button
          @click.prevent="addToCart"
          :disabled="product.available === false"
          class="btn-primary px-4 py-2 text-sm"
        >
          В корзину
        </button>
      </div>
    </div>
  </NuxtLink>
</template>
