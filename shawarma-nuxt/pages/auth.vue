--- shawarma-nuxt/pages/auth.vue (原始) +++ shawarma-nuxt/pages/auth.vue
(修改后)
<template>
    <div class="auth-page">
        <div class="auth-wrap">
            <div class="auth-card">
                <h2>
                    Вход в
                    <em style="font-style: normal; color: var(--red)"
                        >аккаунт</em
                    >
                </h2>
                <p class="sub">История заказов, адреса и повтор в один клик</p>

                <div class="field" style="margin-bottom: 12px">
                    <label>Имя</label>
                    <input
                        v-model="authForm.name"
                        placeholder="Как к тебе обращаться"
                    />
                </div>

                <div class="field" style="margin-bottom: 12px">
                    <label>Телефон или email</label>
                    <input
                        v-model="authForm.contact"
                        placeholder="+7… или you@mail.ru"
                    />
                </div>

                <div class="field">
                    <label>Пароль</label>
                    <input
                        v-model="authForm.pass"
                        type="password"
                        placeholder="••••••••"
                    />
                </div>

                <button
                    class="btn btn--red"
                    style="width: 100%; margin-top: 18px"
                    @click="handleLogin('customer')"
                >
                    Войти
                </button>

                <div class="demo-row">
                    <button @click="handleLogin('customer')">
                        👤 Гость (демо)
                    </button>
                    <button @click="handleLogin('admin')">
                        🛠 Админ (демо)
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuth } from "~/composables/useAuth";

const auth = useAuth();
const router = useRouter();

const { authForm, login } = auth;

const handleLogin = (role) => {
    login(role);
    if (role === "admin") {
        router.push("/admin");
    } else {
        router.push("/account");
    }
};

definePageMeta({
    layout: "default",
});
</script>

<style scoped>
.auth-page {
    min-height: calc(100vh - 72px);
    display: grid;
    place-items: center;
    padding: 60px 24px;
}

.auth-wrap {
    width: 100%;
    max-width: 440px;
}

.auth-card {
    background: #fff;
    border-radius: 24px 24px 24px 8px;
    border: 2px solid rgba(34, 34, 34, 0.08);
    padding: 40px 32px;
    box-shadow: 0 20px 60px -20px rgba(34, 34, 34, 0.15);
}

.auth-card h2 {
    font-size: 26px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 12px;
    letter-spacing: -0.02em;
}

.auth-card .sub {
    color: rgba(34, 34, 34, 0.6);
    margin-bottom: 28px;
    font-size: 14px;
}

.field {
    display: flex;
    flex-direction: column;
}

.field label {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
    color: rgba(34, 34, 34, 0.7);
}

.field input {
    padding: 12px 16px;
    border: 2px solid rgba(34, 34, 34, 0.12);
    border-radius: 12px;
    font-size: 15px;
    font-family: inherit;
    transition: 0.2s;
    background: #fff;
}

.field input:focus {
    outline: none;
    border-color: var(--red);
}

.demo-row {
    display: flex;
    gap: 12px;
    margin-top: 20px;
}

.demo-row button {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid rgba(34, 34, 34, 0.15);
    border-radius: 12px;
    background: #fff;
    font-weight: 600;
    font-size: 13px;
    cursor: pointer;
    transition: 0.2s;
}

.demo-row button:hover {
    border-color: var(--orange);
    background: rgba(247, 127, 0, 0.05);
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: none;
    border-radius: 16px 16px 16px 4px;
    padding: 15px 28px;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
    text-decoration: none;
    transition: 0.22s;
}

.btn--red {
    background: var(--red);
    color: #fff;
    box-shadow: var(--sh-warm);
}

.btn--red:hover {
    background: var(--red-d);
    transform: translateY(-2px);
}
</style>
