import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

export default defineNuxtPlugin(() => {
  const vueQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  })

  return {
    provide: {
      vueQueryClient,
    },
    hooks: {
      onAppRendered() {
        // VueQueryPlugin is auto-registered via module
      },
    },
  }
})
