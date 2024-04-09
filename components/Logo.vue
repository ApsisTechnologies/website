<style scoped>
.logo-container {
  pointer-events: all;
}

.logo {
  transform-origin: 50% 56%;
}

@media (--hover) {
  .logo-container:hover {
    cursor: pointer;
  }
}
</style>

<template>
  <div
    ref="logoContainer"
    class="logo-container pos-relative flex-row flex-center"
    :style="`${props.noInteraction ? 'pointer-events: none;' : ''} ${props.width ? `width: ${props.width}` : ''}`"
  >
    <svg
      ref="logo"
      class="logo"
      width="100%"
      height="100%"
      viewBox="0 0 942 1000"
      stroke="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="main_gradient" x1="772.895" y1="774.244" x2="10.0532" y2="328.421" gradientUnits="userSpaceOnUse">
          <stop stop-color="var(--main-gradient-stop-color)"/>
          <stop offset="1" stop-color="var(--main-gradient-start-color)"/>
        </linearGradient>
      </defs>
      <path
        fill="url(#main_gradient)"
        d="M941.385 185.474C939.507 254.31 928.653 337.841 909.994 422.499C875.93 577.663 815.818 736.501 737.463 814.856C644.874 907.403 539.511 930.196 435.442 903.98C418.076 899.639 412.274 877.806 424.922 865.116L701.48 588.559C707.073 582.965 714.629 579.876 722.519 579.876C743.141 579.834 763.721 571.944 779.417 556.207C810.934 524.731 810.934 473.636 779.417 442.161C747.941 410.643 696.888 410.685 665.371 442.161C647.421 460.111 639.698 484.281 642.203 507.658C642.411 509.578 641.785 511.456 640.449 512.751L260.574 892.626C254.73 898.47 251.891 906.652 252.309 914.959C252.392 916.378 252.434 917.839 252.434 919.259C252.434 974.904 196.121 1017.48 137.219 992.854C119.728 985.507 105.66 971.523 98.2715 954.074C73.9345 896.717 113.717 841.489 167.359 838.65C167.359 838.65 167.776 838.65 168.402 838.608C169.989 838.441 174.08 837.815 176.042 835.06L699.059 311.876C700.394 310.54 702.273 309.914 704.151 310.123C727.57 312.627 751.74 304.863 769.649 286.954C801.166 255.437 801.166 204.384 769.649 172.867C738.131 141.35 687.12 141.391 655.603 172.908C637.652 190.817 629.93 215.029 632.393 238.364C632.601 240.284 631.975 242.163 630.639 243.457L168.569 705.568C166.482 707.656 164.812 710.035 163.685 712.749C163.643 712.749 163.643 712.832 163.602 712.915C162.642 715.295 162.224 717.799 162.099 720.346C158.968 773.695 104.116 813.102 46.9675 789.141C29.4766 781.836 15.4505 767.851 8.0617 750.402C-16.9433 691.5 25.7196 634.853 81.4903 634.853C83.4523 634.853 85.3308 634.937 87.2093 635.062C96.0591 635.688 104.742 632.724 111.004 626.462L344.147 393.32C345.483 391.984 347.361 391.357 349.24 391.566C382.468 395.114 417.241 378.041 433.438 340.429C441.161 322.563 441.495 302.191 434.19 284.199C410.145 224.839 340.139 214.945 300.691 254.394C282.741 272.302 275.018 296.514 277.522 319.849C277.731 321.769 277.105 323.606 275.769 324.942L77.775 522.936C65.7109 535 45.089 530.367 39.4535 514.212C28.0155 480.816 22.1296 449.132 22.1296 418.45C22.1296 344.687 55.9844 276.852 127.743 205.135C296.057 36.7795 833.643 -49.5063 912.79 29.683C934.414 51.3067 943.347 109.373 941.26 185.39L941.385 185.474Z"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useEventListener } from '@vueuse/core'

const props = withDefaults(defineProps<{
  width?: string
  color?: string
  noInteraction?: boolean
  animationClass?: string
}>(), {
  width: '1.4rem',
  color: 'currentColor',
  noInteraction: false,
  animationClass: ''
})

const logoContainer = ref<HTMLElement>()
const logo = ref<HTMLElement>()

let animating = false

onMounted(() => {
  useEventListener(logoContainer.value, 'mouseenter', () => {
    if (!animating && props.animationClass) {
      logo.value.classList.add(props.animationClass)
      animating = true
    }
  })

  useEventListener(logo.value, 'animationend', () => {
    if (props.animationClass) {
      logo.value.classList.remove(props.animationClass)
    }
    animating = false
  })
})
</script>
