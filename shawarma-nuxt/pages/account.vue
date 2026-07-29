<template>
    <div class="account-page">
        <section class="account-hero">
            <div class="wrap">
                <span class="kicker">Личный кабинет</span>
            </div>
        </section>

        <section class="account-content">
            <div class="wrap">
                <div v-if="!authStore.isAuthenticated" class="auth-wrapper">
                    <AuthCard />
                </div>

                <div v-else class="account-layout">
                    <aside class="account-sidebar">
                        <div class="user-profile">
                            <div class="user-avatar">{{ authStore.initials }}</div>
                            <div class="user-info">
                                <h3>{{ authStore.displayName }}</h3>
                                <p>{{ authStore.user?.phone }}</p>
                            </div>
                        </div>

                        <nav class="account-nav">
                            <NuxtLink to="/account" class="nav-item" :class="{ active: route.path === '/account' }">
                                <SvgIcon name="clipboard" :size="18" /> Мои заказы
                            </NuxtLink>
                            <NuxtLink to="/account/profile" class="nav-item" :class="{ active: route.path === '/account/profile' }">
                                <SvgIcon name="edit" :size="18" /> Профиль
                            </NuxtLink>
                            <NuxtLink to="/account/addresses" class="nav-item" :class="{ active: route.path === '/account/addresses' }">
                                <SvgIcon name="map-pin" :size="18" /> Адреса
                            </NuxtLink>
                            <button @click="logout" class="nav-item logout">
                                <SvgIcon name="log-out" :size="18" /> Выход
                            </button>
                        </nav>
                    </aside>

                        <main class="account-main">
                        <NuxtPage />
                    </main>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import { useRoute } from "vue-router";
import AuthCard from "@/components/AuthCard.vue";

const authStore = useAuthStore();
const route = useRoute();

const logout = () => {
    authStore.logout();
    navigateTo("/");
};

definePageMeta({ layout: "default" });
</script>

<style scoped>
.account-page {
    min-height: 100vh;
}
.account-hero {
    background: linear-gradient(135deg, var(--red) 0%, var(--orange) 60%, var(--yellow) 100%);
    color: #fff;
    padding: 28px 0;
    text-align: center;
}
.account-hero .kicker {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 99px;
    margin-bottom: 8px;
}
.account-hero h1 {
    font-size: clamp(22px, 3.6vw, 36px);
    font-weight: 900;
    letter-spacing: -0.03em;
    text-transform: uppercase;
}
.auth-wrapper { max-width: 400px; margin: 40px auto; }
.account-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 30px;
    margin-top: 40px;
}
@media (max-width: 768px) {
    .account-layout { grid-template-columns: 1fr; }
}
.account-sidebar {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    border: 2px solid rgba(34,34,34,0.07);
    padding: 24px;
    height: fit-content;
}
.user-profile {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 2px solid rgba(34,34,34,0.06);
}
.user-avatar {
    width: 52px;
    height: 52px;
    border-radius: 14px 14px 14px 3px;
    background: linear-gradient(135deg, var(--orange), var(--yellow));
    color: var(--ink);
    display: grid;
    place-items: center;
    font-weight: 900;
    font-size: 18px;
}
.user-info h3 { font-size: 16px; font-weight: 800; margin: 0 0 2px; }
.user-info p { font-size: 13px; color: rgba(34,34,34,0.5); margin: 0; }
.account-nav { display: flex; flex-direction: column; gap: 4px; }
.nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 11px 14px;
    border-radius: 12px 12px 12px 3px;
    text-decoration: none;
    color: var(--ink);
    font-weight: 600;
    font-size: 14px;
    transition: 0.2s;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
    background: none;
}
.nav-item:hover { background: rgba(214,40,40,0.08); color: var(--red); }
.nav-item.active { background: var(--ink); color: var(--yellow); }
.nav-item.logout { margin-top: 12px; color: var(--red); }
.nav-item.logout:hover { background: rgba(214,40,40,0.1); }
.account-main {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    border: 2px solid rgba(34,34,34,0.07);
    padding: 32px;
    min-height: 400px;
}
</style>
