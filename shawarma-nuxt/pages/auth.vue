<template>
    <div class="auth-page">
        <section class="auth-hero">
            <div class="wrap">
                <span class="kicker">Личный кабинет</span>
            </div>
        </section>

        <section class="auth-content">
            <div class="wrap">
                <AuthCard />

                <div class="auth-test">
                    <p class="auth-test__label">Тестовый вход</p>
                    <div class="auth-test__buttons">
                        <button class="btn btn--red btn--sm" @click="handleTestLogin('user')">
                            Войти как пользователь
                        </button>
                        <button class="btn btn--yellow btn--sm" @click="handleTestLogin('admin')">
                            Войти как администратор
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import AuthCard from "@/components/AuthCard.vue";

const authStore = useAuthStore();

function handleTestLogin(role) {
    authStore.loginAsTest(role);
    navigateTo(role === 'admin' ? '/admin' : '/account');
}

definePageMeta({
    layout: "default",
});
</script>

<style scoped>
.auth-page {
    min-height: 100vh;
    padding-top: 0;
}

.auth-hero {
    background: linear-gradient(135deg, var(--red) 0%, var(--orange) 60%, var(--yellow) 100%);
    color: white;
    padding: 28px 0;
    text-align: center;
}

.auth-hero .kicker {
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

.auth-hero h1 {
    font-size: clamp(22px, 3.6vw, 36px);
    font-weight: 900;
    letter-spacing: -0.03em;
    text-transform: uppercase;
}

.auth-content {
    padding: 60px 0 100px;
}

.auth-test {
    text-align: center;
    margin-top: 40px;
    padding-top: 32px;
    border-top: 2px dashed rgba(34,34,34,0.1);
}

.auth-test__label {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(34,34,34,0.4);
    margin-bottom: 14px;
}

.auth-test__buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
}
</style>
