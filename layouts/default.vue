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
import Nav from 'components/Nav.vue'
import Footer from '@/components/Footer.vue'
import ContactForm from '@/components/ContactForm.vue'
import { useI18n } from 'vue-i18n'

const { locale } =  useI18n()

useHead({
  htmlAttrs: {
    lang: locale.value
  },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16px.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32px.png' }
  ]
})
</script>
