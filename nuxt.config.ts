import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      theme: process.env.THEME,
      appBaseUrl: process.env.APP_BASE_URL,
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
  css: [
    'assets/css/typeface.css',
    'assets/css/styles.css',
    'assets/css/global.css',
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
      },
      {
        code: 'es',
        iso: 'es',
        name: 'Español',
        file: 'es.yml'
      }
    ]
  }
})
