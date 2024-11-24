<style scoped>
.marquee-text {
  font-weight: 700;
  font-size: 3rem;
  letter-spacing: 0.06em;
  line-height: 1.2em;
  text-transform: uppercase;
}

.marquee {
  position: relative;
  display: block;
  overflow: hidden;

  animation-name: marquee-anim;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

@media (--res-narrow) {
  .marquee-text {
    font-size: 2.5rem;
  }

  .marquee-container {
    flex-direction: column;
    align-items: flex-start;
  }
}

@keyframes marquee-anim {
  0% {
    transform: translateY(-3rem);
    /* transform: translateY(-3rem) scale(.4); */
    opacity: 0;
  }
  10% {
    transform: translateY(0);
    /* transform: translateY(0) scale(.8); */
    /* font-weight: 700; */
    opacity: .8;
  }
  90% {
    transform: translateY(0);
    /* transform: translateY(0) scale(1); */
    /* letter-spacing: 0.5rem; */
    /* font-weight: 300; */
    opacity: .8;
  }
  100% {
    transform: translateY(3rem);
    /* letter-spacing: 2rem; */
    opacity: 0;
  }
}
</style>

<template>
  <div class="marquee-container flex-row flex-center flex-gap-small">
    <span class="marquee-text text-outline non-breaking-text">{ </span>
    <span class="marquee-text non-breaking-text">{{ t('landing.hero.marquee.prefix') }}</span>
    <span ref="marquee" class="marquee marquee-text text-center text-gradient">{{ marqueeWords[marqueeActiveIndex] }}</span>
    <span class="marquee-text text-outline non-breaking-text">}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'
import { rotateForward } from 'lib/util'
import { useI18n } from '#imports'

const { t } = useI18n()

let marqueeActiveIndex = ref(0)

const marqueeWords = computed(() => [
  t('landing.hero.marquee.words[0]'),
  t('landing.hero.marquee.words[1]'),
  t('landing.hero.marquee.words[2]'),
  t('landing.hero.marquee.words[3]'),
  t('landing.hero.marquee.words[4]'),
])

const marqueeText = computed(() => marqueeWords.value[marqueeActiveIndex.value])

const marquee = ref<HTMLElement>()

onMounted(() => {
  useEventListener(marquee.value, 'animationiteration', () => {
    marqueeActiveIndex.value = rotateForward(marqueeActiveIndex.value, marqueeWords.value.length)
  })
})
</script>
