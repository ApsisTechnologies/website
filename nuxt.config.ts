import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'nuxt-svgo'
  ],
  imports: {
    autoImport: false,
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
})
