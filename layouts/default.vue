<style scoped>
.section {
  padding-top: 6rem;
  padding-bottom: 2rem;
  margin: 0 auto;
}
</style>

<template>
  <main class="section content-section pos-relative flex-col flex-gap">
    <slot />
    <ContactForm />
  </main>
  <Nav />
  <Footer />
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Nav from 'components/Nav.vue'
import Footer from '@/components/Footer.vue'
import ContactForm from '@/components/ContactForm.vue'
import { useI18n } from 'vue-i18n'
import { useRuntimeConfig } from 'nuxt/app'

const { t, locale } =  useI18n()
const config = useRuntimeConfig()
const route = useRoute()

const title = computed(() => `${t('company.tagline')} | ${t('company.name')}`)

console.debug(title.value)

useHead({
  title: title.value,
  htmlAttrs: { lang: locale.value },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16px.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32px.png' }
  ],
  meta: [
    { name: 'description', content: t('company.tagline') },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: `${config.public.APP_BASE_URL as string}${route.fullPath}` },
    { property: 'og:site_name', content: t('company.name') },
    { property: 'og:description', content: t('landing.hero.about') },
    { property: 'og:image', content: `${config.public.APP_BASE_URL}/opengraph-banner.jpg` },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' }
  ]
})
</script>
