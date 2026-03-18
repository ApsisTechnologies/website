<template>
  <HeroSection />
  <FeaturesSection />
  <ValidationSection />
  <PortfolioSection />
  <ContactSection />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { computed } from 'vue'
import { useI18n, useHead } from '#imports'
import { useRuntimeConfig } from 'nuxt/app'
import HeroSection from 'components/landing/HeroSection.vue'
import ValidationSection from 'components/landing/ValidationSection.vue'
import PortfolioSection from 'components/landing/PortfolioSection.vue'
import FeaturesSection from 'components/landing/FeaturesSection.vue'
import ContactSection from 'components/landing/ContactSection.vue'

definePageMeta({ layout: 'landing' })

const config = useRuntimeConfig()

const { t, locale } = useI18n()

const title = computed(() => `${t('company.name')} | ${t('company.tagline')}`)

useHead({
  title,
  htmlAttrs: { lang: locale.value },
  meta: [
    { name: 'description', content: t('company.tagline') },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: config.public.APP_BASE_URL as string },
    { property: 'og:site_name', content: t('company.name') },
    { property: 'og:description', content: t('landing.hero.about') }
  ]
})
</script>
