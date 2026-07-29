<template>
    <div>
        <!-- Header / Navigation -->
        <header class="nav" :class="{ scrolled: navScrolled }">
            <div class="wrap nav__in">
                <NuxtLink to="/" class="logo">
                    <span class="logo__flame">🔥</span>
                    <span>ШАУРМА<em>.</em></span>
                </NuxtLink>
                <nav class="nav__links">
                    <NuxtLink to="/" :class="{ active: route.path === '/' }">Главная</NuxtLink>
                    <NuxtLink to="/menu" :class="{ active: route.path.startsWith('/menu') }">Меню</NuxtLink>
                    <NuxtLink to="/about" :class="{ active: route.path === '/about' }">О нас</NuxtLink>
                    <NuxtLink to="/contacts" :class="{ active: route.path === '/contacts' }">Контакты</NuxtLink>
                    <NuxtLink v-if="authStore.user" :to="authStore.isAdmin ? '/admin' : '/account'" :class="{ active: route.path.startsWith('/account') || route.path === '/admin' }">Кабинет</NuxtLink>
                </nav>
                <div class="nav__right">
                    <span class="open-dot">Открыто до 23:00</span>
                    <a href="tel:+79991234567" class="nav__phone">+7 999 123-45-67</a>
                    <NuxtLink v-if="authStore.user" :to="authStore.isAdmin ? '/admin' : '/account'" class="user-chip">
                        <b>{{ authStore.initials }}</b>
                    </NuxtLink>
                    <NuxtLink v-else to="/auth" class="user-chip btn--login">Войти</NuxtLink>
                    <CartButton />
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main>
            <slot />
        </main>

        <!-- Footer -->
        <footer class="footer">
            <div class="wrap">
                <div class="footer__grid">
                    <div class="footer__col footer__brand">
                        <div class="foot__logo">🔥 ШАУР<em style="font-style:normal;color:var(--red)">МА</em></div>
                        <p>Лучшая шаурма в городе с 2015 года. Готовим на огне, подаём с любовью.</p>
                    </div>
                    <div class="footer__col">
                        <h4>Контакты</h4>
                        <a href="tel:+79991234567">+7 (999) 123-45-67</a>
                        <a href="mailto:info@shawarma.ru">info@shawarma.ru</a>
                        <p>ул. Примерная, д. 1</p>
                    </div>
                    <div class="footer__col">
                        <h4>Соцсети</h4>
                        <div class="footer__socials">
                            <a href="#" class="social-link" aria-label="VK">ВКонтакте</a>
                            <a href="#" class="social-link" aria-label="Telegram">Telegram</a>
                            <a href="#" class="social-link" aria-label="WhatsApp">WhatsApp</a>
                        </div>
                    </div>
                </div>
                <div class="footer__bottom">
                    <span>© 2025 ШАУРМА. Все права защищены.</span>
                    <span>Сделано с 🔥 и любовью к шаурме</span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import CartButton from "@/components/CartButton.vue";

const route = useRoute();
const navScrolled = ref(false);
const authStore = useAuthStore();

onMounted(() => {
    authStore.loadFromLocalStorage();

    window.addEventListener("scroll", () => {
        navScrolled.value = window.scrollY > 50;
    });
});
</script>
