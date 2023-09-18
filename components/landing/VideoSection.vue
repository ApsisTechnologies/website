<style scoped>
.section {
  position: relative;
}
</style>

<template>
  <div class="section full-page pos-relative flex-col flex-center scroll-snap-align-start">
    <VideoBackground
      :src="desktopVideoSrc"
      :src-mobile="mobileVideoSrc"
      :poster="desktopVideoPoster"
      :poster-mobile="mobileVideoPoster"
      :darken="0.3"
      :loading-text="t('landing.video.loading')"
      autoplay
    />
    <Marquee :words="words" />
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
