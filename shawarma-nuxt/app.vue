<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>

        <!-- Cart Modal (глобально поверх layout) -->
        <ClientOnly>
            <Teleport to="body">
                <div v-if="cartStore.isOpen" class="modal-overlay" @click.self="cartStore.closeCart()">
                    <div class="cart-panel">
                        <div class="cart-panel__header">
                            <span class="cart-panel__title">Корзина</span>
                            <button class="cart-panel__close" @click="cartStore.closeCart()">✕</button>
                        </div>
                        <div class="cart-panel__body">
                            <div v-if="!cartStore.hasItems" class="empty-cart">
                                <div class="empty-cart__emoji"><SvgIcon name="cart" :size="48" color="rgba(34,34,34,0.15)" /></div>
                                <p>Корзина пуста</p>
                            </div>
                            <div v-else>
                                <div v-for="(item, idx) in cartStore.items" :key="idx" class="cart-item">
                                    <div class="cart-item__visual" :style="{ background: item.bg }">{{ item.emoji }}</div>
                                    <div class="cart-item__info">
                                        <div class="cart-item__name">{{ item.name }}</div>
                                        <div class="cart-item__meta">{{ item.sizeLabel }}</div>
                                        <div class="cart-item__controls">
                                            <div class="cart-item__qty">
                                                <button @click="cartStore.decreaseQty(idx)">−</button>
                                                <span>{{ item.qty }}</span>
                                                <button @click="cartStore.increaseQty(idx)">+</button>
                                            </div>
                                            <span class="cart-item__price">{{ fmt(item.subtotal) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="cartStore.hasItems" class="cart-panel__footer">
                            <div class="cart-summary">
                                <div class="cart-summary__row"><span>Подытог:</span><span>{{ fmt(cartStore.subtotal) }}</span></div>
                                <div v-if="cartStore.discount > 0" class="cart-summary__row"><span>Скидка:</span><span>-{{ fmt(cartStore.discount) }}</span></div>
                                <div class="cart-summary__row"><span>Доставка:</span><span>{{ cartStore.delivery === 0 ? "Бесплатно" : fmt(cartStore.delivery) }}</span></div>
                                <div class="cart-summary__row total"><span>Итого:</span><span>{{ fmt(cartStore.total) }}</span></div>
                            </div>
                            <button v-if="!authStore.isAdmin" class="checkout-btn" @click="cartStore.closeCart(); navigateTo('/checkout')">Оформить заказ</button>
                            <div v-else class="admin-cart-blocked">Администратор не может оформлять заказы</div>
                        </div>
                    </div>
                </div>
            </Teleport>
        </ClientOnly>

        <OrderStatusWidget />
    </div>
</template>

<script setup>
import { fmt } from "~/composables/useUtils";
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";

const cartStore = useCartStore();
const authStore = useAuthStore();
</script>
