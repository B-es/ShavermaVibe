<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "~/types/product";
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";
import { useRouter } from 'vue-router';
import { useSalesBadge } from "~/composables/useSalesBadge";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  click: [];
}>();

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const { badgeFor } = useSalesBadge();

const effectiveBadge = computed(() => badgeFor(props.product));

const openProduct = () => {
  emit('click');
  router.push(`/menu/${props.product.id}`);
};

const addToCart = () => {
  if (authStore.isAdmin) return;
  if (props.product.available !== false) {
    if (props.product.sizes?.length && props.product.sizes.length > 1) {
      router.push(`/menu/${props.product.id}`);
    } else {
      cartStore.addToCart(props.product as any, 1, "Стандарт");
    }
  }
};
</script>

<template>
  <div
    @click="openProduct"
    class="card group cursor-pointer block border-2 border-red-500 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
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
        v-if="effectiveBadge"
        class="absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold uppercase"
        :class="{
          'bg-red-500 text-white': effectiveBadge === 'hit',
          'bg-green-500 text-white': effectiveBadge === 'new',
          'bg-orange-500 text-white': effectiveBadge === 'spicy',
          'bg-emerald-500 text-white': effectiveBadge === 'veg',
        }"
      >
        {{ effectiveBadge }}
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-lg font-bold text-ink mb-2">{{ product.name }}</h3>
      <p class="text-gray-600 text-sm mb-4 line-clamp-2">
        {{ product.desc }}
      </p>

      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-red">
          {{ product.price }} ₽
        </span>

        <button
          @click.prevent="addToCart"
          :disabled="product.available === false"
          class="btn-primary px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          В корзину
        </button>
      </div>
    </div>
  </div>
</template>