<style scoped>
.section {
  padding-top: 3rem;
  background: var(--background-gradient);
}

.slider {
  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  gap: 0;
  scrollbar-width: none; /* hide scrollbars on Firefox */
  opacity: 0;
}

.slider::-webkit-scrollbar {
  display: none;
}

.slide {
  flex-shrink: 0;

  position: relative;
  display: flex;
  justify-content: center;
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
}

.slide-img {
  width: 60%;
  max-width: 30rem;
}

@media (--res-mobile) or (--res-mobile-legacy)  {
  .slide-img, .slide-text {
    width: 100%;
  }

  .slide {
    flex-direction: column-reverse;
  }
}

.nav {
  bottom: 4rem;
  width: 100%;
  margin: auto;
}

.paginator {
  padding: 1rem 0;
}
</style>

<template>
  <div id="projects" class="section pos-relative full-page flex-col scroll-snap-align-start">
    <span class="landing-title">{{ t('landing.portfolio.title') }}</span>

    <div
      ref="slider"
      class="slider scroll-snap-x-hard flex-row"
      @scrollend="onScroll"
      v-intersection-observer="onSliderVisibilityChanged"
    >
      <div v-for="item in copy" class="slide scroll-snap-align-start">
        <img class="slide-img no-pointer-events" :src="item.image" />
        <div class="flex-col slide-text">
          <span class="slide-title landing-subtitle">{{ item.title }}</span>
          <p v-for="p in item.description">{{ p }}</p>
        </div>
      </div>
    </div>

    <div class="paginator pos-relative">
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
import { useI18n } from '#imports'
import { ref } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { vIntersectionObserver } from '@vueuse/components'
import { addClassIfVisible } from 'lib/util'
import Paginator from 'components/Paginator.vue'
import minipcrImg from 'assets/images/portfolio/minipcr.png'
import ristbandImg from 'assets/images/portfolio/ristband.png'
import groovlyImg from 'assets/images/portfolio/groovly.png'
import forestifyImg from 'assets/images/portfolio/forestify.png'

const { t } = useI18n()

const slider = ref<HTMLElement>()
const page = ref(0)

const copy = [
  {
    title: t('landing.portfolio.projects.minipcr.title'),
    image: minipcrImg,
    description: t('landing.portfolio.projects.minipcr.description').split('\\n')
  },
  {
    title: t('landing.portfolio.projects.ristband.title'),
    image: ristbandImg,
    description: t('landing.portfolio.projects.ristband.description').split('\\n')
  },
  {
    title: t('landing.portfolio.projects.forestify.title'),
    image: forestifyImg,
    description: t('landing.portfolio.projects.forestify.description').split('\\n')
  },
  {
    title: t('landing.portfolio.projects.groovly.title'),
    image: groovlyImg,
    description: t('landing.portfolio.projects.groovly.description').split('\\n')
  },
]

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

const onSliderVisibilityChanged = (e: IntersectionObserverEntry[]) => {
  const isVisible = e[0].isIntersecting
  if (isVisible) {
    resume()
  } else {
    pause()
  }
  addClassIfVisible(e[0], 'fade-in')
}
</script>
