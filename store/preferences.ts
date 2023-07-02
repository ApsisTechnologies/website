import { defineStore } from 'pinia'

export const usePreferences = defineStore('preferences', {
  state: () => ({
    theme: '',
    locale: '',
  }),
  actions: {
    setTheme(name: string) {
      this.theme = name
    },
    setLocale(locale: string) {
      this.locale = locale
    },
  },
})
