import { defineNuxtPlugin } from 'nuxt/app'
import { EventBus } from 'lib/event'

export default defineNuxtPlugin((nuxtApp) => {
  const eventBus = new EventBus()
  nuxtApp.vueApp.provide('eventBus', eventBus)
  nuxtApp.vueApp.config.globalProperties.eventBus = eventBus
})
