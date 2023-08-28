<style scoped>
.marquee {
  font-family: var(--heading-font);
  position: relative;
  display: block;
  text-align: center;
  font-size: 5rem;
  font-weight: 800;
  line-height: 2em;
  text-transform: uppercase;
  overflow: hidden;

  animation-name: marquee-anim;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
}

@media (--res-narrow) {
  .marquee {
    font-size: 3rem;
  }
}

@keyframes marquee-anim {
  0% {
    transform: translateY(-3rem) scale(.4);
    opacity: 0;
  }
  10% {
    transform: translateY(0) scale(.8);
    /* font-weight: 500; */
    opacity: .8;
  }
  90% {
    transform: translateY(0) scale(1);
    letter-spacing: 0.5rem;
    /* font-weight: 100; */
    opacity: .8;
  }
  100% {
    transform: translateY(3rem);
    letter-spacing: 2rem;
    opacity: 0;
  }
}
</style>

<template>
  <span ref="marquee" class="marquee text-center">{{ marqueeText }}</span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowEvent } from 'composables/event'
import { rotateForward } from 'lib/util'

const props = withDefaults(defineProps<{
  words?: string[]
}>(), {
  words: () => []
})

let marqueeActiveIndex = ref(0)
const marquee = ref<HTMLElement>()

const marqueeText = computed(() => props.words ? props.words[marqueeActiveIndex.value] : '')

const doMarqueeTransition = () => {
  marqueeActiveIndex.value = rotateForward(marqueeActiveIndex.value, props.words.length)
}

useWindowEvent('animationiteration', doMarqueeTransition)
</script>
