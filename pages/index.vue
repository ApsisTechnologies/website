<template>
  <h3>{{ t('welcome') }}</h3>
  <label>
    {{ t('language') + t('flag')}}
    <select name="locales" @change="onLocaleSelected">
      <option v-for="l in availableLocales" :value="l.code" :key="l.code">{{l.name}}</option>
    </select>
  </label>
  <br />

  <GitHubLogo />
  <TwitterLogo />
  <LinkedInLogo />

  <br />
  <span>{{ `Current theme: ${preferences.theme}` }}</span>
  <br />
  <span>{{ `Current language: ${preferences.locale}` }}</span>
  <br />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { computed } from 'vue'
import { useI18n, useHead } from '#imports'
import { useRuntimeConfig } from 'nuxt/app'
import { usePreferences } from 'store/preferences'
import GitHubLogo from 'assets/icons/social/github.svg'
import TwitterLogo from 'assets/icons/social/twitter.svg'
import LinkedInLogo from 'assets/icons/social/linkedin.svg'

definePageMeta({ layout: 'landing' })

const preferences = usePreferences()
const config = useRuntimeConfig()

const { t, locale, locales } = useI18n()

const title = computed(() => `${t('company.name')} | ${t('home')}`)

const onLocaleSelected = (e: Event) => {
  locale.value = e.target?.value
  preferences.setLocale(locale.value)
}

const availableLocales = computed(() => locales.value)

useHead({
  title,
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: 'RockinDev\'s home page yo!' },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: config.public.appBaseUrl },
    { property: 'og:site_name', content: t('company.name') },
    { property: 'og:description', content: t('company.tagline') },
    // { property: 'og:image', content: `${config.appUrl}/img/banner.png` },
    // { property: 'og:image:type', content: 'image/png' },
    // { property: 'og:image:width', content: '1200' },
    // { property: 'og:image:height', content: '630' }
  ]
})
</script>
