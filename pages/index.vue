<template>
  <HeroSection />
  <VideoSection />
  <AboutSection />
  <PortfolioSection />
  <FeaturesSection />
  <StackSection />
  <ContactSection />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import { computed } from 'vue'
import { useI18n, useHead } from '#imports'
import { useRuntimeConfig } from 'nuxt/app'
import { useDarkScheme } from 'composables/themeManager'
import HeroSection from 'components/landing/HeroSection.vue'
import VideoSection from 'components/landing/VideoSection.vue'
import AboutSection from 'components/landing/AboutSection.vue'
import FeaturesSection from 'components/landing/FeaturesSection.vue'
import PortfolioSection from 'components/landing/PortfolioSection.vue'
import StackSection from 'components/landing/StackSection.vue'
import ContactSection from 'components/landing/ContactSection.vue'

definePageMeta({ layout: 'landing' })

const config = useRuntimeConfig()

const { t, locale } = useI18n()

useDarkScheme()

const title = computed(() => `${t('company.tagline')} | ${t('company.name')}`)

useHead({
  title,
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: t('company.description') },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: config.public.APP_BASE_URL as string },
    { property: 'og:site_name', content: t('company.name') },
    { property: 'og:description', content: t('company.description') },
    { property: 'og:image', content: `${config.public.APP_BASE_URL}/banner.jpg` },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' }
  ]
})
</script>
