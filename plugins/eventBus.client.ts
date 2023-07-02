import { EventBus } from '@/lib/event'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const eventBus = new EventBus()
  nuxtApp.vueApp.provide('eventBus', eventBus)
  nuxtApp.vueApp.config.globalProperties.eventBus = eventBus
})
