<script setup lang="ts">
defineProps<{
  message: string;
  type?: 'success' | 'error' | 'info';
}>();

defineEmits<{
  (e 'close'): void;
}>();
</script>

<template>
  <div
    class="toast"
    :class="type"
    @click="$emit('close')"
  >
    <div class="toast__icon">
      {{ getIcon(type) }}
    </div>
    <div class="toast__text">{{ message }}</div>
  </div>
</template>

<script>
import { defineOptions } from 'vue';

defineOptions({
  name: 'Toast',
});

const getIcon = (type) => {
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  };
  return icons[type] || 'ℹ️';
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 2px solid #ff6b35;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: toastSlideIn 0.3s ease;
}

.toast.success {
  border-color: #28a745;
}

.toast.error {
  border-color: #dc3545;
}

.toast.info {
  border-color: #17a2b8;
}

.toast__icon {
  font-size: 1.5rem;
}

.toast__text {
  font-size: 1rem;
  color: #2d3436;
}

@keyframes toastSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s;
}

.toast-enter-from,
.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
