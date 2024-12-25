import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

const locales = [
  {
    code: 'en',
    name: 'English',
    file: 'en.yml',
    isCatchallLocale: true
  },
  {
    code: 'es',
    name: 'Español',
    file: 'es.yml',
  }
]

// All Nuxt Content-based routes that need to be prerendered
const contentRoutes = [
  '/services/web',
  '/services/cloud',
  '/services/erp',
  // '/services/ai-ml',
  // '/services/immersive',
]

// outputs all the Nuxt content routes including all locales
function localizedContentRoutes(routes: string[]): string[] {
  const prefixes = locales.map(locale =>  locale.isCatchallLocale ? '' : '/' + locale.code)
  const prefixedRoutes = []
  for (const prefix of prefixes) {
    for (const route of routes) {
      prefixedRoutes.push(prefix + route)
    }
  }
  return prefixedRoutes
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  spaLoadingTemplate: false,

  runtimeConfig: {
    public: {
      THEME: process.env.THEME,
      APP_BASE_URL: process.env.APP_BASE_URL,
      BLOG_BASE_URL: process.env.BLOG_BASE_URL,
      JOB_BOARD_URL: process.env.JOB_BOARD_URL,
      API_BASE_URL: process.env.API_BASE_URL,
      LINKEDIN_URL: process.env.LINKEDIN_URL,
      GITHUB_URL: process.env.GIT_HUB_URL,
      TWITTER_URL: process.env.TWITTER_URL,
      ANALYTICS_ENABLED: process.env.ANALYTICS_ENABLED,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    }
  },

  modules: [
    'nuxt-svgo',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/content',
  ],

  nitro: {
    prerender: {
      routes: localizedContentRoutes(contentRoutes)
    }
  },

  content: {
    markdown: {
      anchorLinks: false
    }
  },

  imports: {
    autoImport: false
  },

  alias: {
    assets: resolve(__dirname, 'assets'),
    lib: resolve(__dirname, 'lib'),
    config: resolve(__dirname, 'config'),
    composables: resolve(__dirname, 'composables'),
    components: resolve(__dirname, 'components'),
    store: resolve(__dirname, 'store'),
  },

  css: [
    'assets/css/typeface.css',
    'assets/css/styles.css',
    'assets/css/theme.css',
    'assets/css/global.css',
    'assets/css/landing.css',
    'assets/css/animations.css'
  ],

  postcss: {
    plugins: {
      '@csstools/postcss-global-data': {
        files: [
          'assets/css/media.css'
        ]
      },
      'postcss-custom-media': {}
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
    locales,
    detectBrowserLanguage: false
  },

  compatibilityDate: '2024-07-31'
})
