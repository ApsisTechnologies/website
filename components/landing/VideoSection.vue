<style scoped>
.section {
  position: relative;
  justify-content: flex-start;
  align-items: center;
  padding-top: 3rem;
}
</style>

<template>
  <div class="section full-page pos-relative flex-col scroll-snap-align-start">
    <VideoBackground
      :src="desktopVideoSrc"
      :src-mobile="mobileVideoSrc"
      :poster="desktopVideoPoster"
      :poster-mobile="mobileVideoPoster"
      :darken="0.4"
      :loading-text="t('landing.video.loading')"
      autoplay
    />
    <Marquee :words="words" />
    <p class="landing-text">{{ t('landing.video.text[0]') }}</p>
    <p class="landing-text">{{ t('landing.video.text[1]') }}</p>
    <p class="landing-text">{{ t('landing.video.text[2]') }}</p>

  </div>
</template>

<script setup lang="ts">
import desktopVideoSrc from 'assets/video/metagora-desktop.mp4'
import mobileVideoSrc from 'assets/video/metagora-mobile.mp4'
import desktopVideoPoster from 'assets/images/metagora-video-poster-desktop.jpg'
import mobileVideoPoster from 'assets/images/metagora-video-poster-mobile.jpg'
import VideoBackground from 'components/VideoBackground.vue'
import Marquee from 'components/Marquee.vue'
import { useI18n } from '#imports'

const { t } = useI18n()

const words = [
  t('landing.video.marquee[0]'),
  t('landing.video.marquee[1]'),
  t('landing.video.marquee[2]'),
  t('landing.video.marquee[3]'),
]
</script>
