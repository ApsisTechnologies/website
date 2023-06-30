<template>
  <h3>{{ t('welcome') }}</h3>
  <label>
    {{ t('language') + t('flag')}}
    <!-- <select> -->
    <select name="locales" @change="onLocaleSelected">
      <option v-for="l in availableLocales" :value="l.code" :key="l.code">{{l.name}}</option>
    </select>
  </label>
  <br />

  <GitHubLogo />
  <TwitterLogo />
  <LinkedInLogo />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { computed } from 'vue'
import GitHubLogo from 'assets/icons/social/github.svg'
import TwitterLogo from 'assets/icons/social/twitter.svg'
import LinkedInLogo from 'assets/icons/social/linkedin.svg'
import { useI18n, useHead } from '#imports'

definePageMeta({ layout: 'landing' })

const { t, locale, locales } = useI18n()

const title = computed(() => `${t('company')} | ${t('home')}`)

const onLocaleSelected = (e: Event) => { locale.value = e.target?.value }

const availableLocales = computed(() => locales.value)

useHead({
  title,
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: 'RockinDev\'s home page yo!' },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    // { property: 'og:url', content: config.appUrl },
    { property: 'og:site_name', content: t('company') },
    // { property: 'og:description', content: copy.company.tagline },
    // { property: 'og:image', content: `${config.appUrl}/img/banner.png` },
    // { property: 'og:image:type', content: 'image/png' },
    // { property: 'og:image:width', content: '1200' },
    // { property: 'og:image:height', content: '630' }
  ]
})
</script>
