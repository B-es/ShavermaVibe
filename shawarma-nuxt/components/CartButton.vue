<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <button
    @click="cartStore.toggleCart()"
    class="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
  >
    <ShoppingCart class="w-6 h-6" />
    <span
      v-if="cartStore.totalItems > 0"
      class="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
    >
      {{ cartStore.totalItems }}
    </span>
  </button>
</template>
