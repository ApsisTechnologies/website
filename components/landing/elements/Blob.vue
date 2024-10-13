<style scoped>
.blob {
  filter: blur(40px);

  animation-name: glow;
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

@keyframes glow {
  0% {
    opacity: .3;
  }
  50% {
    opacity: .5;
  }
  100% {
    opacity: .3;
  }
}
</style>

<template>
  <svg class="blob pos-relative" viewBox="0 0 980 980" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="secondary-gradient" x1="926.13" y1="774.026" x2="75.9887" y2="741.119" gradientUnits="userSpaceOnUse">
        <stop stop-color="#BA0888"/>
        <stop offset="1" stop-color="#8102F7"/>
      </linearGradient>

      <linearGradient id="main-gradient" x1="621.925" y1="628.698" x2="5.31962" y2="271.537" gradientUnits="userSpaceOnUse">
        <stop stop-color="#09C4EE"/>
        <stop offset="1" stop-color="#4851CB"/>
      </linearGradient>

    </defs>
    <!-- <path d="M631.012 159.008C390.207 63.6035 208.024 17.0167 122.012 365.508C36.0013 714 214.996 826.002 363.512 872.008C554.176 931.07 665.434 899.45 780.001 807.002C940.49 677.499 805.989 655.497 762 551C718.011 446.503 946.501 284.002 631.012 159.008Z" fill="red" /> -->
    <path :fill="`url(#${gradient}`">
      <animate
        attributeName="d"
        dur="30s"
        repeatCount="indefinite"
        values="M631.012 159.008C390.207 63.6035 208.024 17.0167 122.012 365.508C36.0013 714 214.996 826.002 363.512 872.008C554.176 931.07 665.434 899.45 780.001 807.002C940.49 677.499 805.989 655.497 762 551C718.011 446.503 946.501 284.002 631.012 159.008Z;M730.5 98.5C489.695 3.09506 140.502 -4.84908 95.0024 179.501C49.5031 363.851 104.485 701.994 253.001 748C443.665 807.062 569.933 759.448 684.5 667C844.989 537.497 877.284 611.5 913 534C948.716 456.5 1045.99 223.494 730.5 98.5Z;M614.5 221.5C512.5 181.087 221.499 -13.9913 221.5 119.5C221.501 252.991 279.984 536.995 428.501 583.001C619.164 642.062 612.433 815.948 727 723.5C887.489 593.997 727 618.001 761.999 551C796.998 484 929.987 346.497 614.5 221.5Z;M643.183 251.451C549.253 218.824 527.149 257.624 463.5 344.5C399.851 431.377 321.908 447.889 382.771 522.143C441.466 593.752 492.184 555 572.5 555C699.908 555 716.704 544.058 738.327 502.698C759.95 461.338 738.327 284.5 643.183 251.451Z;M631.012 159.008C390.207 63.6035 208.024 17.0167 122.012 365.508C36.0013 714 214.996 826.002 363.512 872.008C554.176 931.07 665.434 899.45 780.001 807.002C940.49 677.499 805.989 655.497 762 551C718.011 446.503 946.501 284.002 631.012 159.008Z"
      />
    </path>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  gradient?: 'main' | 'secondary'
}>(), {
  gradient: 'secondary'
})

const gradient = computed(() => {
  if (props.gradient === 'main') {
    return 'main-gradient'
  } else if (props.gradient === 'secondary') {
    return 'secondary-gradient'
  }
  return ''
})
</script>
