<template>
  <h1>{{ t('error.notFound.title') }}</h1>
  <p>{{ t('error.notFound.subtitle') }}</p>
  <NuxtLink to="/">{{ t('error.notFound.goBack') }}</NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useHead } from '#imports'
import { useRuntimeConfig } from 'nuxt/app'
const config = useRuntimeConfig()

const { t, locale } = useI18n()

const title = computed(() => `${t('error.notFound.title')} | ${t('company.name')}`)

useHead({
  title,
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: t('company.tagline') },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: config.public.APP_BASE_URL as string },
    { property: 'og:site_name', content: t('company.name') },
    { property: 'og:description', content: t('company.tagline') }
  ]
})
</script>
