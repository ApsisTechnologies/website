import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  // console.debug('Global nav guard, navigating to:', to.fullPath)

  const app = useNuxtApp()
  const locale = app.$i18n.locale.value
  const defaultLocale = app.$i18n.defaultLocale
  // console.debug('locale:', locale, ', defaultLocale:', defaultLocale)

  if (locale !== defaultLocale && !(to.fullPath as string).startsWith(`/${locale}`)) {
    const localizedRoute = `/${locale}${to.fullPath}`
    // console.debug('Overriding nav guard to:', localizedRoute)
    return navigateTo(localizedRoute)
  }
})
