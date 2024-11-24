<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 3rem;
  padding-left: var(--content-margin);
  padding-right: var(--content-margin);
}

.card-container {
  justify-content: center;
  /* align-items: ; */
}

.card {
  opacity: 0;
  max-width: 12rem;
  /* border: 1px dashed cyan; */
}

.icon-wrapper {
  aspect-ratio: 1 / 1;
  /* max-width: 20rem; */
  /* border: 1px dashed cyan; */
  overflow: hidden;
}

.icon-backdrop {
  background: var(--main-gradient);
  width: 100%;
  height: 55%;
  bottom: 0;
  left: 0;
  border-radius: 1rem;
  transition: height 200ms ease-out;
  /* box-shadow: 0 0 10rem 10px var(--main-gradient-start-color); */
}

@media (--hover) {
  .icon-wrapper:hover .icon-backdrop {
    height: 70%;
  }

  .icon-wrapper:hover .icon {
    transform: scale(1.05);
  }
}

.icon {
  border-radius: 1rem;
  /* border: 1px dashed red; */
  transition: transform 200ms ease-out;
}

.feature-text {
  font-size: .7rem;
  font-weight: 450;
  letter-spacing: 0.04rem;
  line-height: 1.2rem;
  text-align: start;
  /* border: 1px dashed red; */
}

@media (--res-narrow) {
  .card-container {
    flex-direction: column;
    align-items: center;
  }

  .card {
    max-width: 20rem;
  }
}
</style>

<template>
  <div id="services" class="section pos-relative flex-col scroll-snap-align-start">
    <span class="landing-title">{ {{ t('landing.features.title') }} }</span>

    <div class="card-container flex-row flex-wrap flex-gap-large flex-stretch">
      <div
        v-for="item of items"
        :key="item.title"
        class="card flex-col flex-gap-small"
        v-intersection-observer="onIntersect"
      >
        <div class="icon-wrapper pos-relative flex-col flex-end">
          <div class="icon-backdrop pos-absolute" />
          <img class="icon pos-relative no-pointer-events" :src="item.img" :alt="item.title" />
        </div>
        <!-- <span class="landing-subtitle text-outline"> -->
        <span class="landing-subtitle text-gradient">
          {{ item.title }}
        </span>
        <span class="feature-text">
          {{ item.text }}
        </span>
        <div class="flex-expand" />

        <Button small :text="item.cta" :to="item.to" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { vIntersectionObserver } from '@vueuse/components'
import { addClassIfVisible } from 'lib/util'
import immersive from 'assets/images/immersive.avif'
import web from 'assets/images/web.avif'
import ml from 'assets/images/ml.avif'
import datacenter from 'assets/images/datacenter.avif'
import Button from '@/components/Button.vue'
import { useNuxtApp } from 'nuxt/app'
import { computed } from 'vue'

const { t } = useI18n()
const blogUrl = useNuxtApp().$config.public.BLOG_BASE_URL

const items = computed(() => [
  {
    img: web,
    title: t('landing.features.items[0].title'),
    text: t('landing.features.items[0].text'),
    cta: t('landing.features.items[0].cta'),
    to: '/services/web',
  },
  {
    img: datacenter,
    title: t('landing.features.items[1].title'),
    text: t('landing.features.items[1].text'),
    cta: t('landing.features.items[1].cta'),
    // to: blogUrl + '/?tag=cloud',
    to: '/services/cloud',
  },
  {
    img: ml,
    title: t('landing.features.items[2].title'),
    text: t('landing.features.items[2].text'),
    cta: t('landing.features.items[2].cta'),
    to: blogUrl + '/?tag=ai',
  },
  {
    img: immersive,
    title: t('landing.features.items[3].title'),
    text: t('landing.features.items[3].text'),
    cta: t('landing.features.items[3].cta'),
    to: blogUrl + '/?tag=gaming',
  }
])

const onIntersect = (e: IntersectionObserverEntry[]) => {
  addClassIfVisible(e[0], 'slide-in-left-or-bottom')
}
</script>
