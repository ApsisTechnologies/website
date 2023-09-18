import { ThemeManager } from 'lib/theme'
import { EventBus, EventType } from 'lib/event'
import { getUserLocale } from 'lib/util'
import { defineNuxtPlugin } from 'nuxt/app'
import { usePreferences } from 'store/preferences'
import { useRouter } from 'vue-router'
import NotFound from '@/pages/404.vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    const preferences = usePreferences()

    const themeManager = nuxtApp.vueApp.config.globalProperties.themeManager as ThemeManager
    themeManager.setDark()

    preferences.setTheme(themeManager.name)

    const userLocale = getUserLocale()
    const i18n = nuxtApp.$i18n
    if (userLocale in i18n.availableLocales) {
      i18n.setLocale(getUserLocale)
    }

    preferences.setLocale(nuxtApp.$i18n.locale.value)
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
