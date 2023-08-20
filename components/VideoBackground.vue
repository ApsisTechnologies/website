<style scoped>
.overlay {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.background-video {
  object-fit: cover;
}

.video-darken-overlay {
  background-color: #000;
}

.video-overlay-texture {
  background-image: url('assets/images/dot-matrix.png');
  opacity: 0.5;
}

.loading {
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 5rem;
  line-height: 1em;
  letter-spacing: .1rem;
  text-transform: uppercase;
  color: var(--muted-text-color);
  animation-name: loading-glow;
  animation-iteration-count: infinite;
  animation-duration: 600ms;
  animation-fill-mode: both;
  animation-direction: alternate;
}

@keyframes loading-glow {
  from { opacity: 0.3; }
  to { opacity: 1.0; }
}
</style>

<template>
  <video
    v-if="isMobile && props.srcMobile"
    class="overlay background-video pos-absolute"
    loop
    muted
    playsinline
    preload="auto"
    :autoplay="autoplay"
    :poster="props.posterMobile"
    @play="loading = false"
  >
    <source type="video/mp4" :src="props.srcMobile" />
    Your browser doesn't support video. =(
  </video>

  <video
    v-else
    class="overlay background-video pos-absolute"
    loop
    muted
    playsinline
    preload="auto"
    :autoplay="autoplay"
    :poster="props.poster ? props.poster : ''"
    @play="loading = false"
  >
    <source type="video/mp4" :src="props.src" />
    Your browser doesn't support video. =(
  </video>

  <div class="overlay pos-absolute video-overlay-texture" />
  <div class="overlay pos-absolute video-darken-overlay" :style="`opacity: ${overlayOpacity}`" />

  <span class="loading pos-absolute" v-if="loading">{{ props.loadingText }}</span>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { clamp } from 'lib/util'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: false,
    default: null
  },
  srcMobile: {
    type: String,
    required: false,
    default: null
  },
  posterMobile: {
    type: String,
    required: false,
    default: null
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: false
  },
  loadingText: {
    type: String,
    required: false,
    default: ''
  },
  darken: {
    type: Number,
    required: false,
    default: 0.6
  }
})

const loading = ref(true)
const isMobile = ref(true)
const overlayOpacity = computed(() => clamp(props.darken, 0.0, 1.0))

onMounted(() => {
  const mobileMediaQuery = window.matchMedia('(orientation: portrait)')
  isMobile.value = mobileMediaQuery.matches
  mobileMediaQuery.addEventListener('change', () => {
    isMobile.value = mobileMediaQuery.matches
  })
})

</script>
