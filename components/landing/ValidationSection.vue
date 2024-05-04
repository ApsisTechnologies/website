<style scoped>
.section {
  padding-top: 4rem;
  padding-bottom: 4rem;
  padding-left: var(--content-margin);
  padding-right: var(--content-margin);
  background: var(--secondary-gradient);
  overflow-x: hidden;
}

.section-title {
  position: relative;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 2rem;
  line-height: 1em;
}

.stats {
  margin: auto;
  display: flex;
  flex-direction: column;
}

.stat {
  justify-content: flex-start;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  line-height: 1em;
  margin-bottom: 5rem;
  text-transform: capitalize;
  opacity: 0;
}

.stat:after {
  content: '';
  position: absolute;
  width: 10rem;
  height: var(--decoration-line-thickness);
  transform: translate(1rem, 1.4rem);
  bottom: 0;
}

.number {
  position: relative;
  display: inl;
  font-size: 4rem;
  font-weight: 500;
  padding-right: 1.2rem;
  height: 100%;
}

.stat1 {
  color: #00FFA9;
  transform: translateX(4rem);
}

.stat1:after {
  background-color: #00FFA9;
}

.stat2 {
  color: #FF8000;
  transform: translateX(2rem);
}

.stat2:after {
  background-color: #FF8000;
}

.stat3 {
  color: #FFFA00;
  /* transform: translateX(0rem); */
}

.stat3:after {
  background-color: #FFFA00;
}

.client-logo {
  position: relative;
  width: 10rem;
  margin: 2rem;
  opacity: 0;
}

.logo-carousell {
  justify-content: center;
  align-items: center;
  align-content: flex-end;
  gap: 1rem;
}
</style>

<template>
  <div class="section pos-relative flex-col">
    <span class="section-title" style="padding-bottom: 2rem;">{{ t('landing.validation.header') }}</span>
    <div class="stats">
      <div class="stat stat1 flex-row" v-intersection-observer="onIntersect">
        <div class="number">{{ t('landing.validation.stats[0].count') }}</div>
        <div> {{ t('landing.validation.stats[0].text') }}</div>
      </div>
      <div class="stat stat2 flex-row" v-intersection-observer="onIntersect">
        <div class="number">{{ t('landing.validation.stats[1].count') }}</div>
        <div> {{ t('landing.validation.stats[1].text') }}</div>
      </div>
      <div class="stat stat3 flex-row" v-intersection-observer="onIntersect">
        <div class="number">{{ t('landing.validation.stats[2].count') }}</div>
        <div> {{ t('landing.validation.stats[2].text') }}</div>
      </div>
    </div>
    <span class="section-title">{{ t('landing.validation.title') }}</span>
    <div class="logo-carousell flex-row flex-wrap">
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/ithra.png"
        alt=""
        v-intersection-observer="onLogoIntersect"
      />
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/jagermeister.png"
        alt=""
        v-intersection-observer="onLogoIntersect"
      />
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/minipcr.png"
        alt=""
        v-intersection-observer="onLogoIntersect"
      />
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/ristband.png"
        alt=""
        v-intersection-observer="onLogoIntersect"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { vIntersectionObserver } from '@vueuse/components'
import { addClassIfVisible } from 'lib/util'

const { t } = useI18n()

const onIntersect = (e: IntersectionObserverEntry[]) => addClassIfVisible(e[0], 'slide-in-left')
const onLogoIntersect = (e: IntersectionObserverEntry[]) => addClassIfVisible(e[0], 'fade-in')
</script>
