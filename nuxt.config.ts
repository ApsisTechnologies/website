import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
  alias: {
    'lib': resolve(__dirname, 'lib'),
    'config': resolve(__dirname, 'config'),
    'composables': resolve(__dirname, 'composables'),
    'components': resolve(__dirname, 'components'),
    'store': resolve(__dirname, 'store'),
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
