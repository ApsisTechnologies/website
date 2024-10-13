<style scoped>
.phrase {
  font-size: .8rem;
  opacity: 0;
  transform-origin: center center;

  animation-name: appear;
  animation-iteration-count: infinite;
  animation-timing-function: ease-out;

  /* filter: blur(.5px); */

}

@keyframes appear {
  0% {
    opacity: 0.4;
    transform: scale(1);
    /* transform: scale(0); */
  }
  90% {
    opacity: .8;
  }
  100% {
    opacity: 0;
    transform: scale(1.3) translateY(-.4rem);
    /* transform: scale(1) translateY(-1em); */
  }
}
</style>

<template>
  <div class="no-pointer-events">
    <span
      ref="phrasesElements"
      v-for="i in props.count"
      class="phrase pos-absolute non-breaking-text text-gradient-secondary"
    >
      {{ pickRandomElement(props.phrases) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { pickRandomElement } from '@/lib/util'
import { useEventListener } from '@vueuse/core'

const props = withDefaults(defineProps<{
  phrases?: string[]
  count: number
  duration?: number
}>(), {
  phrases: () => [],
  duration: 3
})

const phrasesElements = ref<HTMLSpanElement[]>()

const randomizePosition = (e: HTMLElement) => {
  e.style.top = `${Math.random() * 100}%`
  e.style.left = `${Math.random() * 100}%`
  console.debug('randomizePosition()', e.style.top, e.style.left)
}

onMounted(() => {
  let i = 0
  for (const element of phrasesElements.value) {
    console.debug(element.innerText)
    randomizePosition(element)
    element.style.animationDuration = `${props.duration}s`
    element.style.animationDelay = `${props.duration * props.count * Math.random()}s`

    useEventListener(element, 'animationiteration', () => {
      randomizePosition(element)
    })

    i++
  }
})
</script>
