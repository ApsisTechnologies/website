import { EventBus, EventType } from 'lib/event'
import { getUserLanguage } from 'lib/util'
import { defineNuxtPlugin } from 'nuxt/app'
import { usePreferences } from 'store/preferences'
import { useRouter } from 'vue-router'
import NotFound from '@/pages/404.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const preferences = usePreferences()

    const i18n = nuxtApp.$i18n
    const language = getUserLanguage()
    const targetLocale = i18n.availableLocales.includes(language) ? language : 'en'

    if (targetLocale !== i18n.locale.value) {
      i18n.setLocale(targetLocale)
    }

    preferences.setLocale(targetLocale)
  })

  nuxtApp.vueApp.config.errorHandler = (error: any, context) => {
    console.error('Error:', error, ', context:', context)
    const bus = nuxtApp.vueApp.config.globalProperties.eventBus as EventBus
    bus.emit(EventType.APPLICATION_ERROR, error)
  }

  const router = useRouter()
  router.addRoute({
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: NotFound
  })
})
