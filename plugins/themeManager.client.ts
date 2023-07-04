import { defineNuxtPlugin } from 'nuxt/app'
import { ThemeManager }  from 'lib/theme'
import themes from '@/config/themes.json'

export default defineNuxtPlugin((nuxtApp) => {
  const themeName = nuxtApp.$config.public.theme
  /* @ts-expect-error: A type error is expected on the following line */
  const themeManager = new ThemeManager(themes[themeName])

  // color scheme defaults to auto
  themeManager.setAuto()

  nuxtApp.vueApp.provide('themeManager', themeManager)
  nuxtApp.vueApp.config.globalProperties.themeManager = themeManager
})
