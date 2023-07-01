import { EventBus } from '@/lib/eventBus'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const eventBus = new EventBus()
  nuxtApp.vueApp.provide('eventBus', eventBus)
})
