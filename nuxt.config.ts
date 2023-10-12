import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  spaLoadingTemplate: false,
  runtimeConfig: {
    public: {
      THEME: process.env.THEME,
      APP_BASE_URL: process.env.APP_BASE_URL,
      BLOG_BASE_URL: process.env.BLOG_BASE_URL,
      API_BASE_URL: process.env.API_BASE_URL,
      LINKEDIN_URL: process.env.LINKEDIN_URL,
      GITHUB_URL: process.env.GITHUB_URL,
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
    '@pinia/nuxt'
  ],
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
    strategy: 'no_prefix',
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
        file: 'en.yml',
      }
    ]
  }
})
