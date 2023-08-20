import { getAnalytics, logEvent } from 'firebase/analytics'
import { useNuxtApp } from 'nuxt/app'

const trackEvent = (eventName: string, params?: object) => {
  const { $config } = useNuxtApp()
  if ($config.public.ANALYTICS_ENABLED === 'true') {
    logEvent(getAnalytics(), eventName, params)
  }
}

export function trackPageView(path: string) {
  const { $config } = useNuxtApp()
  trackEvent('page_view', { page_location: $config.public.APP_BASE_URL + path })
}

export function trackContactRequest() {
  trackEvent('contact-request')
}

export function trackError(message: string) {
  trackEvent('app-error', { value: message })
}

export function trackSocial(value: string) {
  trackEvent('social', { value })
}
