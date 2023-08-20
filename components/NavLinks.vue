<style scoped>
.nav-links-container {
  gap: .5rem;
  display: flex;
  flex-direction: row;
}

.nav-link {
  font-size: .8rem;
  font-weight: 600;
  line-height: 1rem;
  letter-spacing: .06rem;
  text-transform: uppercase;
  text-decoration: none;

  padding: .2rem .4rem;
  border-radius: var(--border-radius);
}

.active-nav-link {
  color: var(--muted-text-color);
  pointer-events: none;
}
</style>

<template>
  <div class="nav-links-container flex-center">
    <span
      :key="item.route"
      v-for="item of navLinks"
      class="link nav-link pos-relative"
      :class="{ 'active-nav-link': router.currentRoute.value.path === item.route }"
      @click="router.push(item.route)"
    >
      {{ item.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from '#imports'

const { t } = useI18n()

const navLinks = [
  { route: '/#features', text: t('nav.features') },
  { route: '/#about', text: t('nav.about') },
  // { route: '/', text: t('nav.blog') },
  // { route: '/portfolio',  text: t('nav.portfolio') }
]

const router = useRouter()
</script>
