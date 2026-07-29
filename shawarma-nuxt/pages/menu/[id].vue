<template>
    <div v-if="product" class="product-detail-page">
        <section class="detail-hero">
            <div class="wrap">
                <h1>{{ product.name }}</h1>
                <p>{{ product.desc }}</p>
            </div>
        </section>

        <section class="detail-content">
            <div class="wrap">
                <div class="detail-grid">
                    <div class="detail-product-info">
                        <div class="detail-visual">
                            <div
                                class="detail-visual__img"
                                :style="{ background: product.bg }"
                            >
                                {{ product.emoji }}
                            </div>
                        </div>

                        <div class="detail-kcal" v-if="product.kcal">
                            <span>Калории:</span>
                            <b>{{ product.kcal }} ккал</b>
                        </div>

                        <div class="detail-size" v-if="product.sizes?.length">
                            <h3>Выберите размер</h3>
                            <div class="seg">
                                <button
                                    v-for="size in product.sizes"
                                    :key="size.id"
                                    @click="selectSize(size)"
                                    :class="{
                                        on: selectedSize?.id === size.id,
                                    }"
                                >
                                    <span class="seg-label">{{ size.label }}</span>
                                    <span class="seg-price">{{ formatPrice(size.priceModifier * product.price) }}</span>
                                </button>
                            </div>
                        </div>

                        <div
                            class="detail-allerg"
                            v-if="product.allerg?.length"
                        >
                            <h3>Аллергены</h3>
                            <div class="allerg">
                                <span
                                    v-for="(allerg, idx) in product.allerg"
                                    :key="idx"
                                    class="allerg-item"
                                >
                                    {{ formatAllerg(allerg) }}
                                </span>
                            </div>
                        </div>

                        <button
                            @click="addToCart"
                            class="btn btn--yellow add-btn"
                            :disabled="!selectedSize || authStore.isAdmin"
                        >
                            {{ authStore.isAdmin ? 'Админ не может покупать' : 'Добавить в корзину' }}
                            <span>→</span>
                        </button>
                    </div>

                    <div class="detail-summary">
                        <div class="detail-price-box">
                            <div class="detail-price">
                                <span class="base-price">
                                    {{ formatPrice(product.price) }}
                                </span>
                                <div
                                    class="detail-price-modifiers"
                                    v-if="selectedSize"
                                >
                                    <small>Размер: +{{ formatPrice(selectedSize.priceModifier * product.price) }}</small>
                                </div>
                            </div>

                            <div class="detail-total">
                                <b>Итого:</b>
                                <span>{{ formatPrice(finalPrice) }}</span>
                            </div>
                        </div>

                        <div class="detail-desc-section">
                            <h3>Описание</h3>
                            <p>{{ product.desc }}</p>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    </div>
    <div v-else class="product-detail-page not-found">
        <section class="detail-hero">
            <div class="wrap">
                <h1>Товар не найден</h1>
                <p>Вернуться в <NuxtLink to="/menu">меню</NuxtLink></p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";
import { useProductStore } from "~/stores/products";

definePageMeta({ layout: "default" });

const route = useRoute();
const cartStore = useCartStore();
const authStore = useAuthStore();
const productStore = useProductStore();

const productId = ref(null);
const selectedSize = ref(null);

watch(
    () => route.params.id,
    (id) => {
        productId.value = id ? parseInt(id, 10) : null;
        selectedSize.value = null;
    },
    { immediate: true },
);

const product = computed(() => {
    if (!productId.value) return null;
    return productStore.items.find((p) => p.id === productId.value);
});

const selectSize = (size) => {
    selectedSize.value = size;
};

const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0,
    }).format(price);
};

const formatAllerg = (allerg) => {
    const map = { gluten: "Глютен", dairy: "Молкопродукты", nuts: "Орехи", mushrooms: "Грибы", none: "Нет" };
    return map[allerg] || allerg;
};

const finalPrice = computed(() => {
    if (!product.value) return 0;
    return product.value.price * (1 + (selectedSize.value ? selectedSize.value.priceModifier : 0));
});

const addToCart = () => {
    if (!product.value || !selectedSize.value || authStore.isAdmin) return;
    cartStore.addToCart(product.value, 1, selectedSize.value.label, selectedSize.value.priceModifier);
};
</script>

<style scoped>
.product-detail-page {
    min-height: 100vh;
}

.detail-hero {
    background: linear-gradient(135deg, #ff6b35 0%, #feca57 100%);
    color: white;
    padding: 28px 0;
    text-align: center;
}

.detail-hero h1 {
    font-size: clamp(22px, 3.6vw, 36px);
    font-weight: 900;
    margin-bottom: 6px;
}

.detail-hero p {
    font-size: 1rem;
    opacity: 0.9;
}

.detail-content {
    padding: 32px 0;
}

.detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

@media (max-width: 900px) {
    .detail-grid {
        grid-template-columns: 1fr;
    }
}

.detail-visual {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: var(--yellow);
    margin-bottom: 16px;
}

.detail-visual__img {
    font-size: 48px;
}

.detail-kcal {
    background: #f9f9f9;
    padding: 10px 16px;
    border-radius: 10px;
    border: 2px solid #ff6b35;
    margin-bottom: 16px;
    text-align: center;
}

.detail-kcal b {
    color: #ff6b35;
    font-size: 1.1rem;
}

.detail-size h3,
.detail-allerg h3 {
    font-size: 1rem;
    color: #2d3436;
    margin-bottom: 10px;
    font-weight: 700;
}

.seg {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
}

.seg button {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 12px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
    font-family: inherit;
}

.seg-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: #2d3436;
    letter-spacing: -0.01em;
}

.seg button span:last-child {
    font-size: 0.72rem;
    font-weight: 600;
    color: #ff6b35;
}

.seg button.on {
    background: #ff6b35;
    color: white;
    border-color: #ff6b35;
}

.seg button.on .seg-label {
    color: white;
}

.seg button.on span:last-child {
    color: rgba(255,255,255,0.85);
}

.allerg {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
}

.allerg-item {
    padding: 3px 10px;
    background: #ffebee;
    color: #c62828;
    border-radius: 10px;
    font-size: 0.75rem;
}

.add-btn {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    margin-top: 16px;
}

.add-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.detail-summary {
    background: white;
    border: 2px solid #ff6b35;
    border-radius: 14px;
    padding: 20px;
    position: sticky;
    top: 20px;
    height: fit-content;
}

.detail-price-box {
    margin-bottom: 16px;
}

.detail-price {
    font-size: 1.4rem;
    font-weight: bold;
    color: #2d3436;
    margin-bottom: 10px;
}

.base-price {
    color: #666;
    font-size: 0.85rem;
    text-decoration: line-through;
    opacity: 0.7;
}

.detail-price-modifiers {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 6px;
}

.detail-total {
    font-size: 1.2rem;
    font-weight: bold;
    color: #ff6b35;
    border-top: 2px solid #eee;
    padding-top: 10px;
    margin-top: 10px;
}

.detail-desc-section h3 {
    font-size: 1rem;
    color: #2d3436;
    margin-bottom: 10px;
    font-weight: 700;
}

.detail-desc-section p {
    color: #666;
    line-height: 1.5;
    margin-bottom: 16px;
    font-size: 0.9rem;
}

</style>


