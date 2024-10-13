<style scoped>
.nav-links-container {
  gap: 1rem;
  display: flex;
  flex-direction: row;
}

.nav-link {
  font-size: .7rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: .06rem;
  text-transform: uppercase;
  text-decoration: none;

  padding: .2rem 0;
  border-radius: var(--border-radius);
}

.active-nav-link {
  display: none;
}
</style>

<template>
  <div class="nav-links-container flex-center">
    <span
      :key="item.route"
      v-for="item of navLinks"
      class="link nav-link pos-relative non-breaking-text"
      :class="{ 'active-nav-link': router.currentRoute.value.path === item.route }"
      @click="router.push(item.route)"
    >
      {{ item.text }}
    </span>
    <span
      class="link nav-link pos-relative non-breaking-text"
      @click="onNavigateToBlog"
    >
      {{ t('nav.blog') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { navigate } from 'lib/util'
import { useI18n } from '#imports'
import { useNuxtApp } from 'nuxt/app'

const { t } = useI18n()

const navLinks = [
  { route: '/#services', text: t('nav.services') },
  { route: '/#projects', text: t('nav.projects') },
  { route: '/jobs', text: t('nav.jobs') },
]

const router = useRouter()

const onNavigateToBlog = () => {
  navigate(useNuxtApp().$config.public.BLOG_BASE_URL)
}
</script>
