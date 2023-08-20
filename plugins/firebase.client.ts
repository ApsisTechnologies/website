import { defineNuxtPlugin } from 'nuxt/app'
import { initializeApp } from 'firebase/app'
import { initializeAnalytics } from 'firebase/analytics'
import { trackPageView } from 'lib/analytics'
import { RouteLocationNormalized, useRouter } from 'vue-router'

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp({
    apiKey: nuxtApp.$config.public.FIREBASE_API_KEY as string,
    authDomain: nuxtApp.$config.public.FIREBASE_AUTH_DOMAIN as string,
    projectId: nuxtApp.$config.public.FIREBASE_PROJECT_ID as string,
    appId: nuxtApp.$config.public.FIREBASE_APP_ID as string,
    measurementId: nuxtApp.$config.public.FIREBASE_MEASUREMENT_ID as string
  })

  const isAnalyticsEnabled = nuxtApp.$config.public.ANALYTICS_ENABLED === 'true'

  if (isAnalyticsEnabled) {
    const config = {
      // disable automatic events
      config: {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false
      }
    }
    // initialize analytics
    initializeAnalytics(app, config)
  } else {
    console.debug('Analytics disabled')
  }

  const router = useRouter()

  // track all navigation via Vue router's navguard
  router.afterEach((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (from.path !== to.path) {
      trackPageView(to.path)
    }
  })
})
