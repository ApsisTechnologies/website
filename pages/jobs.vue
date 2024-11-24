<style>
.note {
  font-size: .8rem;
  text-align: center;
}
</style>

<template>
  <h1 class="text-gradient-secondary">{{ t('jobs.title') }}</h1>
  <p>{{ t('jobs.content[0]') }}</p>
  <p>{{ t('jobs.content[1]') }}</p>
  <p>{{ t('jobs.content[2]') }}</p>

  <Button small :text="t('jobs.positions.open')" @click="navigate(config.public.JOB_BOARD_URL, true)" />

  <!-- <Divider /> -->

  <!-- <h2 id="values">{{ t('jobs.values.title') }}</h2>
  <p>{{ t('jobs.values.description') }}</p>

  <h3 class="text-gradient">{{ t('jobs.values.items[0].title') }}</h3>
  <p>{{ t('jobs.values.items[0].body') }}</p>

  <h3 class="text-gradient">{{ t('jobs.values.items[1].title') }}</h3>
  <p>{{ t('jobs.values.items[1].body') }}</p>

  <h3 class="text-gradient">{{ t('jobs.values.items[2].title') }}</h3>
  <p>{{ t('jobs.values.items[2].body') }}</p>

  <h3 class="text-gradient">{{ t('jobs.values.items[3].title') }}</h3>
  <p>{{ t('jobs.values.items[3].body') }}</p>

  <h3 class="text-gradient">{{ t('jobs.values.items[4].title') }}</h3>
  <p>{{ t('jobs.values.items[4].body') }}</p>

  <h3 class="text-gradient">{{ t('jobs.values.items[5].title') }}</h3>
  <p>{{ t('jobs.values.items[5].body') }}</p>

  <h3 class="text-gradient">{{ t('jobs.values.items[6].title') }}</h3>
  <p>{{ t('jobs.values.items[6].body') }}</p> -->
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, useHead } from '#imports'
import { useRuntimeConfig } from 'nuxt/app'
import { navigate } from 'lib/util'
import Divider from 'components/Divider.vue'

const config = useRuntimeConfig()

const { t, locale } = useI18n()

const title = computed(() => `${t('company.name')} | ${t('jobs.title')}`)

useHead({
  title,
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: title },

    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:locale', content: locale },
    { property: 'og:url', content: config.public.APP_BASE_URL as string },
    { property: 'og:site_name', content: t('company.name') },
    { property: 'og:description', content: t('jobs.content[1]') },
    { property: 'og:image', content: `${config.public.APP_BASE_URL}/opengraph-banner.jpg` },
    { property: 'og:image:type', content: 'image/jpeg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' }
  ]
})
</script>
