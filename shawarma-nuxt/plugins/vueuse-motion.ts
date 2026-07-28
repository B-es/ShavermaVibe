import { useMotion } from '@vueuse/motion'

export default defineNuxtPlugin((nuxtApp) => {
  // VueUse Motion plugin initialization
  nuxtApp.provide('motion', useMotion)
})
