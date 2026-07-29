import { ref } from 'vue';

const toastMessages = ref<{ message: string; type: 'success' | 'error' | 'info' }[]>([]);

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  toastMessages.value.push({ message, type });
  setTimeout(() => {
    toastMessages.value.shift();
  }, 3000);
};

export const useToast = () => ({
  toastMessages,
  showToast,
});
