<script setup lang="ts">
defineProps<{
  price: number
}>()
</script>

<template>
  <span class="chip-price" v-if="price > 0">+{{ Math.round(price) }}₽</span>
</template>

<style scoped>
.chip-price {
  font-size: 0.75rem;
  opacity: 0.9;
}
</style>
