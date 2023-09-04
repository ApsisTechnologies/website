<style scoped>
.section {
  padding-top: 6rem;
}
</style>

<template>
  <main class="section content-section pos-relative">
    <slot />
  </main>
  <Nav />
</template>

<script setup lang="ts">
import { useHead } from '#imports'
import Nav from 'components/Nav.vue'
// import BreakpointDebugger from 'components/BreakpointDebugger.vue'

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo-16px.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo-32px.png' }
  ]
})
</script>
