<style scoped>
.section {
  padding-top: 3rem;
}

@media (--res-narrow) {
  .section {
    padding-top: 6rem;
  }
}

.slider {
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  gap: 0;
  scrollbar-width: none; /* hide scrollbars on Firefox */
}

.slider::-webkit-scrollbar {
  display: none;
}

.slide {
  flex-shrink: 0;

  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  min-height: 300px;

  gap: 2rem;
}

.slide-text {
  justify-content: center;
  align-items: flex-start;
  width: 40%;
  overflow: hidden;
}

.slide-img {
  width: 60%;
  max-width: 30rem;
  padding: 0 2rem;
}

@media (--res-mobile) or (--res-mobile-legacy)  {
  .slide-img, .slide-text {
    width: 100%;
    padding: 0;
  }

  .slide {
    flex-direction: column;
    align-items: center;
  }
}

.nav {
  bottom: 4rem;
  width: 100%;
  margin: auto;
}

.paginator {
  padding: 1rem 0;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
}

.backdrop {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0%;
  transition: background 250ms linear;
  /* border: 1px dashed cyan; */
}
</style>

<template>
  <div id="projects" class="section pos-relative full-page flex-col flex-gap scroll-snap-align-start">
    <div class="pos-absolute backdrop">
      <Blob height="100%" width="100%" />
    </div>
    <span class="landing-title pos-relative">{ {{ t('landing.portfolio.title') }} }</span>

    <div
      ref="slider"
      class="slider scroll-snap-x-hard flex-row"
      @scrollend="onScroll"
    >
      <div v-for="item in copy" class="slide scroll-snap-align-start">
        <div class="flex-col slide-text flex-gap">
          <span class="slide-title landing-subtitle">{{ item.title }}</span>
          <p v-for="p in item.description">{{ p }}</p>
        </div>
        <img class="slide-img no-pointer-events" :src="item.image" />
      </div>
    </div>

    <div class="paginator pos-absolute">
      <Paginator
        :count="copy.length"
        :index="page"
        @selected="onPageSelected"
        @previous="onPreviousPage"
        @next="onNextPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n, useNuxtApp } from '#imports'
import { ref, computed } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { navigate } from 'lib/util'
import Paginator from 'components/Paginator.vue'
import Button from 'components/Button.vue'
import Blob from '@/components/landing/elements/Blob.vue'
import minipcrImg from 'assets/images/portfolio/minipcr.avif'
import ristbandImg from 'assets/images/portfolio/ristband.avif'
import groovlyImg from 'assets/images/portfolio/groovly.avif'
import forestifyImg from 'assets/images/portfolio/forestify.avif'

const { t } = useI18n()

const copy = computed(() => [
{
    title: t('landing.portfolio.projects.minipcr.title'),
    image: minipcrImg,
    description: t('landing.portfolio.projects.minipcr.description').split('\\n'),
    accent: t('landing.portfolio.projects.minipcr.accent'),
    cta: {
      text:  t('landing.portfolio.projects.minipcr.cta.text'),
      route: '/case-study-how-we-built-a-globally-scalable-e-learning-platform'
    }
  },
  {
    title: t('landing.portfolio.projects.ristband.title'),
    image: ristbandImg,
    description: t('landing.portfolio.projects.ristband.description').split('\\n'),
    accent: t('landing.portfolio.projects.ristband.accent')
  },
  {
    title: t('landing.portfolio.projects.forestify.title'),
    image: forestifyImg,
    description: t('landing.portfolio.projects.forestify.description').split('\\n'),
    accent: t('landing.portfolio.projects.forestify.accent')
  },
  {
    title: t('landing.portfolio.projects.groovly.title'),
    image: groovlyImg,
    description: t('landing.portfolio.projects.groovly.description').split('\\n'),
    accent: t('landing.portfolio.projects.groovly.accent')
  },
])

const slider = ref<HTMLElement>()
const page = ref(0)

const blogBaseUrl = useNuxtApp().$config.public.BLOG_BASE_URL

const onNavigate = (route: string) => {
  navigate(useNuxtApp().$config.public.BLOG_BASE_URL + route, true)
}

const accentColor = computed(() => copy[page.value].accent)

const SCROLL_INTERVAL = 10000

const { pause, resume } = useIntervalFn(() => {
  advanceSlide()
},
SCROLL_INTERVAL)

const onScroll = (e: Event) => {
  if (e.target) {
    const rect = slider.value.getBoundingClientRect()
    const pos = slider.value.scrollLeft

    const index = Math.round(pos / rect.width)
    page.value = index
  }
}

const onPageSelected = (page: number) => {
  scrollToPage(page)

  pause()
}

const onPreviousPage = () => {
  if (page.value > 0) {
    scrollToPage(page.value - 1)
    pause()
  }
}

const onNextPage = () => {
  if (page.value < copy.length - 1) {
    scrollToPage(page.value + 1)
    pause()
  }
}

const scrollToPage = (page: number) => {
  const rect = slider.value.getBoundingClientRect()
  const pos = rect.width * page
  slider.value.scrollLeft = pos
  slider.value.scroll({ left: pos })

}

const advanceSlide = () => {
  let i = page.value + 1
  if (i >= copy.length) {
    i = 0
  }

  scrollToPage(i)
}
</script>
