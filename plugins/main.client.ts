import { ThemeManager } from '@/lib/theme'
import { getUserLocale } from '@/lib/utils'
import { defineNuxtPlugin } from 'nuxt/app'
import { usePreferences } from '@/store/preferences'

export default defineNuxtPlugin((nuxtApp) => {
  // App initialization hook: Run after all plugins are initialized and application is mounted
  nuxtApp.hook('app:mounted', () => {
    const preferences = usePreferences()

    const themeManager = nuxtApp.vueApp.config.globalProperties.themeManager as ThemeManager
    preferences.setTheme(themeManager.name)

    const userLocale = getUserLocale()
    const i18n = nuxtApp.$i18n
    if (userLocale in i18n.availableLocales) {
      i18n.setLocale(getUserLocale)
    }

    preferences.setLocale(nuxtApp.$i18n.locale.value)
  })
})
