<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  navigateTo('/')
}
</script>

<template>
  <button
    v-if="authStore.user"
    class="user-chip"
    @click="navigateTo('/account')"
  >
    <span class="user-chip__initials">
      {{ authStore.user.name[0] }}
    </span>
  </button>
  <button
    v-else
    class="user-chip login-link"
    @click="navigateTo('/auth')"
  >
    Войти
  </button>
</template>

<style scoped>
.user-chip {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b35, #feca57);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.2s;
  margin-left: 12px;
}

.user-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
}

.user-chip__initials {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-link {
  background: transparent;
  color: #2d3436;
  padding: 8px 16px;
  border: 2px solid #ff6b35;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
}

.login-link:hover {
  background: #fff5f0;
  color: #ff6b35;
}
</style>
