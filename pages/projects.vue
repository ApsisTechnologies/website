<template>
  <PortfolioSection />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n, useHead } from '#imports'
import { useRuntimeConfig } from 'nuxt/app'
import { useThemeManager } from 'composables/themeManager'
import PortfolioSection from 'components/landing/PortfolioSection.vue'

definePageMeta({ layout: 'landing' })

const config = useRuntimeConfig()

const { t, locale } = useI18n()

const tm = useThemeManager()

onMounted(() => {
  tm.setDark()
})

onBeforeUnmount(() => {
  tm.setAuto()
})

const title = computed(() => `${t('company.name')} | ${t('company.tagline')}`)

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
    { property: 'og:description', content: t('landing.hero.about') },
    { property: 'og:image', content: `${config.public.APP_BASE_URL}/opengraph-banner.png` },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' }
  ]
})
</script>
