<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 6rem;
  padding-left: var(--content-margin);
  padding-right: var(--content-margin);
}

.container {
  /* max-width: var(--max-content-width); */
  gap: 1rem;
  /* border: 1px dashed yellow; */
}

.item {
  gap: 2rem;
  opacity: 0;
  /* border: 1px dashed salmon; */
}

.icon-wrapper {
  aspect-ratio: 1 / 1;
  max-width: 20rem;
  /* border: 1px solid green; */
}

.icon-backdrop {
  background: var(--main-gradient);
  width: 100%;
  height: 55%;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 10rem 10px var(--main-gradient-start-color);
  border-radius: 1rem;
}

.icon {
  border-radius: 1rem;
  /* border: 1px dashed red; */
}

.text-wrapper {
  justify-content: flex-end;
  width: 100%;
  max-width: 20rem;
  /* border: 1px solid magenta; */
}

.feature-text {
  font-size: .8rem;
  font-weight: 500;
  letter-spacing: 0.04rem;
  line-height: 1.4rem;
  text-align: start;
  /* border: 1px dashed red; */
}

.item-reverse {
  flex-direction: row-reverse;
}

@media (--res-narrow) {
  .item {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<template>
  <div id="features" class="section pos-relative flex-col scroll-snap-align-start">
    <span class="landing-title">{{ t('landing.features.title') }}</span>

    <div class="container flex-col">
      <div
        v-for="item, i of items"
        :key="item.title"
        class="item flex-row"
        :class="i % 2 ? 'item-reverse' : ''"
        v-intersection-observer="onIntersect"
      >
        <div class="icon-wrapper pos-relative flex-col flex-end">
          <div class="icon-backdrop pos-absolute" />
          <img class="icon pos-relative no-pointer-events" :src="item.img" :alt="item.title" />
        </div>
        <div
          class="text-wrapper flex-col"
          :style="i % 2 ? 'align-items: flex-end' : ''"
        >
          <span
            class="landing-subtitle text-gradient-secondary"
            :style="i % 2 ? 'text-align: end' : ''"
          >
            {{ item.title }}
          </span>
          <span
            class="feature-text"
            :style="i % 2 ? 'text-align: end' : ''"
          >
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { vIntersectionObserver } from '@vueuse/components'
import { addClassIfVisible } from 'lib/util'
import brain from 'assets/images/brain.png'
import ux from 'assets/images/ux.png'
import engineering from 'assets/images/engineering.png'
import rack from 'assets/images/rack.png'
import pixelStream from 'assets/images/pixelStream.png'

const { t } = useI18n()

const items = [
  {
    img: brain,
    title: t('landing.features.items[0].title'),
    text: t('landing.features.items[0].text')
  },
  {
    img: ux,
    title: t('landing.features.items[1].title'),
    text: t('landing.features.items[1].text')
  },
  {
    img: pixelStream,
    title: t('landing.features.items[2].title'),
    text: t('landing.features.items[2].text')
  },
  {
    img: engineering,
    title: t('landing.features.items[3].title'),
    text: t('landing.features.items[3].text')
  },
  {
    img: rack,
    title: t('landing.features.items[4].title'),
    text: t('landing.features.items[4].text')
  },
]

const onIntersect = (e: IntersectionObserverEntry[]) => {
  addClassIfVisible(e[0], 'fade-in')
}
</script>
