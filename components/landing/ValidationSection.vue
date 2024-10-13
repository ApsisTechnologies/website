<style scoped>
.section {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: var(--content-margin);
  padding-right: var(--content-margin);
  /* background: var(--secondary-gradient); */
  overflow-x: hidden;
}

.section-title {
  position: relative;
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
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
  width: 6rem;
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
    <span class="section-title text-center">{{ t('landing.validation.title') }}</span>
    <div class="logo-carousell flex-row flex-wrap">
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/ithra.avif"
        alt=""
        v-intersection-observer="onLogoIntersect"
      />
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/jagermeister.avif"
        alt=""
        v-intersection-observer="onLogoIntersect"
      />
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/minipcr.avif"
        alt=""
        v-intersection-observer="onLogoIntersect"
      />
      <img
        class="client-logo no-pointer-events"
        src="~/assets/images/client-logos/ristband.avif"
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
