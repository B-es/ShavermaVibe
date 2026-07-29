<template>
  <div class="profile-page">
    <h2>Профиль</h2>

    <div class="profile-card">
      <form @submit.prevent="saveProfile" class="profile-form">
        <div class="form-group">
          <label for="name">Имя</label>
          <input id="name" v-model="form.name" type="text" placeholder="Иван Иванов" />
        </div>

        <div class="form-group">
          <label for="phone">Телефон</label>
          <input id="phone" v-model="form.phone" type="tel" readonly />
          <span class="form-hint">Телефон привязан к аккаунту и не может быть изменён</span>
        </div>

        <button type="submit" class="btn btn--red btn--sm">Сохранить изменения</button>

        <div v-if="successMsg" class="msg msg--success">✅ {{ successMsg }}</div>
        <div v-if="errorMsg" class="msg msg--error">❌ {{ errorMsg }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()

const form = ref({
  name: authStore.user?.name || '',
  phone: authStore.user?.phone || '',
})

const successMsg = ref('')
const errorMsg = ref('')

const saveProfile = async () => {
  successMsg.value = ''
  errorMsg.value = ''
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    if (authStore.user) {
      authStore.user.name = form.value.name
    }
    localStorage.setItem('auth_user', JSON.stringify(authStore.user))
    successMsg.value = 'профиль успешно обновлён!'
    setTimeout(() => { successMsg.value = '' }, 3000)
  } catch {
    errorMsg.value = 'Ошибка при обновлении профиля'
  }
}
</script>

<style scoped>
.profile-page { max-width: 480px; }
.profile-page h2 {
  font-size: 24px;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 24px;
}
.profile-card {
  background: #fff;
  border-radius: 20px 20px 20px 6px;
  border: 2px solid rgba(34,34,34,0.07);
  padding: 28px;
}
.form-group { margin-bottom: 20px; }
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgba(34,34,34,0.5);
  margin-bottom: 6px;
}
.form-group input {
  width: 100%;
  padding: 12px 14px;
  border: 2px solid rgba(34,34,34,0.14);
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  background: #fff;
  transition: 0.2s;
  box-sizing: border-box;
}
.form-group input:focus { outline: none; border-color: var(--orange); box-shadow: 0 0 0 4px rgba(247,127,0,0.14); }
.form-hint { font-size: 12px; color: rgba(34,34,34,0.45); margin-top: 4px; display: block; }
.msg { padding: 12px; border-radius: 10px; text-align: center; font-weight: 700; font-size: 13px; margin-top: 12px; }
.msg--success { background: #dcfce7; color: #15803d; }
.msg--error { background: #fee2e2; color: var(--red-d); }
</style>
