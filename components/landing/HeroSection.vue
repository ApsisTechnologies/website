<style scoped>
.section {
  padding-top: 5rem;
  padding-bottom: 2rem;
  background-color: black;
}

.heading-large {
  word-break: break-all;
  font-weight: 700;
  font-size: 10rem;
  letter-spacing: 0.04em;
  line-height: .8em;
  text-transform: uppercase;
  padding-bottom: 1rem;
  width: fit-content;
}

.about {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6em;
  max-width: 80%;
}

.text-pane {
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 70%;
}

.text-video-wrapper {
  padding-left: 3px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.video {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  mix-blend-mode: multiply;
  /* outline: 1px solid cyan; */
}

.text-overlay {
  opacity: .6;
}

@media (--res-narrow) {
  .section {
    padding-top: 15rem;
  }

  .text-pane {
    max-width: 100%;
  }

  .about {
    max-width: 100%;
  }
}

.model-pane {
  top: 0;
  right: 0;
  /* border: 1px solid cyan; */
}

@media (--res-desktop-large) {
  .model-pane {
    width: 50%;
    height: 100%;
  }
}

@media (--res-desktop) {
  .model-pane {
    width: 60%;
    height: 100%;
  }

  .heading-large {
    font-size: 8rem;
  }
}

@media (--res-mobile) {
  .model-pane {
    width: 100%;
    height: 50%;
  }

  .heading-large {
    font-size: 6rem;
  }
}

.asteroid1 {
  width: 25rem;
  height: auto;
  bottom: -15rem;
  left: 10%;
  filter: blur(7px);

  animation-name: spin-backwards;
  animation-duration: 160s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: center center;
  /* border: 1px solid yellowgreen; */
}

.asteroid2 {
  width: 7rem;
  height: auto;
  bottom: 4rem;
  left: 8%;
  filter: blur(1px);

  animation-name: spin;
  animation-duration: 40s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: 60% 50%;
  /* border: 1px solid yellowgreen; */
}

.asteroid3 {
  width: 4rem;
  height: auto;
  bottom: 2rem;
  left: 40%;
  filter: blur(4px);

  animation-name: spin-backwards;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-fill-mode: backwards;
  animation-timing-function: linear;
  transform-origin: 60% 45%;
  /* border: 1px solid yellowgreen; */
}

@keyframes spin {
  100% { rotate: 1turn; }
}

@keyframes spin-backwards {
  100% { rotate: -1turn; }
}

.overlay {
  z-index: 1;
  pointer-events: none;
}
</style>

<template>
  <div class="full-page flex-col pos-relative section scroll-snap-align-start">
    <img class="asteroid1 no-pointer-events pos-absolute" :src="asteroid1" />
    <img class="asteroid2 no-pointer-events pos-absolute" :src="asteroid2" />
    <img class="asteroid3 no-pointer-events pos-absolute" :src="asteroid3" />

    <div class="text-pane pos-relative flex-col">
      <span class="landing-header text-gradient overlay">{{ t('landing.hero.header') }}</span>
      <div class="text-video-wrapper pos-relative">
        <span class="text-mask heading-large pos-absolute">{{ t('landing.hero.title') }}</span>
        <video class="video pos-absolute" loop autoplay muted playsinline>
          <source type="video/mp4" :src="noiseVideo" />
        </video>
        <span class="text-overlay text-gradient-secondary heading-large pos-relative overlay">{{ t('landing.hero.title') }}</span>
      </div>
      <span class="landing-subtitle overlay">{{ t('company.tagline') }}</span>
      <p class="pos-relative about overlay">{{ t('landing.hero.about') }}</p>
    </div>

    <div class="model-pane pos-absolute" v-intersection-observer="onMuseVisible">
      <Scene3D
        asset-url="/muse.glb"
        :enabled="museIsVisible"
        post-process
        animate
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { ref } from 'vue'
import { vIntersectionObserver } from '@vueuse/components'
import Scene3D from 'components/Scene3D.vue'
import noiseVideo from 'assets/video/noise.mp4'
import asteroid1 from 'assets/images/asteroid-1.png'
import asteroid2 from 'assets/images/asteroid-2.png'
import asteroid3 from 'assets/images/asteroid-3.png'

const { t } = useI18n()
const museIsVisible = ref(true)

const onMuseVisible = (e: IntersectionObserverEntry[]) => { museIsVisible.value = e[0].isIntersecting }
</script>
