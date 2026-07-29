<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const phone = ref("");
const code = ref("");

const step = computed(() => authStore.step);

async function submitPhone() {
  const cleaned = phone.value.replace(/\D/g, "");
  if (cleaned.length < 10) return;
  await authStore.sendCode("+" + cleaned);
}

async function submitCode() {
  const ok = await authStore.verifyCode(code.value);
  if (ok) {
    navigateTo("/account");
  }
}

function reset() {
  authStore.step = "phone";
  authStore.codeSent = false;
  authStore.error = null;
  code.value = "";
}

function maskPhone(p: string) {
  if (p.length < 5) return p;
  return p.slice(0, 2) + " XXX XX-" + p.slice(-2);
}
</script>

<template>
  <div class="auth-card">
    <div class="auth-card__header">
      <h2 class="auth-card__title">Вход по номеру телефона</h2>
      <p class="auth-card__subtitle">
        {{ step === "code" ? "Введите код из SMS" : "Без регистрации — просто введите номер" }}
      </p>
    </div>

    <form v-if="step !== 'done'" @submit.prevent="step === 'code' ? submitCode() : submitPhone()" class="auth-card__form">
      <div v-if="step === 'phone'" class="auth-card__field">
        <label class="auth-card__label">Номер телефона</label>
        <input
          v-model="phone"
          type="tel"
          class="auth-card__input"
          placeholder="+7 (999) 123-45-67"
          required
          @input="authStore.error = null"
        />
      </div>

      <div v-if="step === 'code'" class="auth-card__field">
        <label class="auth-card__label">Код из SMS</label>
        <p class="auth-card__hint">Мы отправили код на {{ maskPhone(authStore.phone) }}</p>
        <input
          v-model="code"
          type="text"
          class="auth-card__input"
          placeholder="XXXX"
          maxlength="6"
          required
          @input="authStore.error = null"
        />
        <button type="button" class="auth-card__resend" @click="reset()">Изменить номер</button>
      </div>

      <p v-if="authStore.error" class="auth-card__error">{{ authStore.error }}</p>

      <button type="submit" class="auth-card__btn" :disabled="authStore.isLoading">
        {{ authStore.isLoading ? "Отправка…" : step === "code" ? "Подтвердить" : "Получить код" }}
      </button>
    </form>

    <div v-else class="auth-card__success">
      <span class="auth-card__success-icon">✅</span>
      <p>Вы успешно вошли как <b>{{ authStore.displayName }}</b></p>
      <NuxtLink to="/account" class="auth-card__btn">Личный кабинет</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.auth-card {
  background: white;
  border-radius: 16px;
  border: 2px solid var(--yellow);
  padding: 32px;
  max-width: 420px;
  margin: 0 auto;
}
.auth-card__header {
  text-align: center;
  margin-bottom: 24px;
}
.auth-card__title {
  font-size: 1.5rem;
  margin: 0 0 8px;
  color: var(--ink);
}
.auth-card__subtitle {
  font-size: 0.95rem;
  color: rgba(34,34,34,0.6);
  margin: 0;
}
.auth-card__form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.auth-card__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.auth-card__label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--ink);
}
.auth-card__hint {
  font-size: 0.85rem;
  color: rgba(34,34,34,0.5);
  margin: 0;
}
.auth-card__input {
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.2s;
  font-family: inherit;
}
.auth-card__input:focus {
  outline: none;
  border-color: var(--orange);
}
.auth-card__resend {
  background: none;
  border: none;
  color: var(--orange);
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0;
  width: fit-content;
  font-weight: 600;
}
.auth-card__resend:hover {
  text-decoration: underline;
}
.auth-card__error {
  color: var(--red);
  font-size: 0.9rem;
  margin: 0;
  text-align: center;
}
.auth-card__btn {
  background: var(--red);
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 4px;
  text-align: center;
  text-decoration: none;
  display: block;
}
.auth-card__btn:hover {
  background: var(--red-d);
}
.auth-card__btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.auth-card__success {
  text-align: center;
  padding: 16px 0;
}
.auth-card__success-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 12px;
}
.auth-card__success p {
  font-size: 1rem;
  margin-bottom: 20px;
}
</style>
