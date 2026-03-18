import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

const locales = [
  {
    code: 'en',
    name: 'English',
    file: 'en.yml',
    isCatchallLocale: true
  }
]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  spaLoadingTemplate: false,

  runtimeConfig: {
    public: {
      APP_BASE_URL: process.env.APP_BASE_URL,
      CONTACT_EMAIL_ADDRESS: process.env.CONTACT_EMAIL_ADDRESS
    }
  },

  modules: [
    'nuxt-svgo',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
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
    locales
  },

  vite: {
    build: {
      modulePreload: {
        polyfill: false
      }
    }
  },

  compatibilityDate: '2024-07-31'
})
