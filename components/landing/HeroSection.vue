<style scoped>
.section {
  padding-top: 6rem;
  padding-bottom: 2rem;
  justify-content: space-between;
  align-items: center;
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
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.4em;
  letter-spacing: 0.06rem;
}

.text-pane {
  justify-content: flex-start;
  align-items: flex-start;
  width: 60%;
  /* width: 32rem; */
  /* border: 1px dashed cyan; */
}

.logo-pane {
  /* border: 1px dashed cyan; */
  height: 60%;
  width: 40%;
  right: 0;
}

.backdrop {
  width: 100%;
  height: 100%;
  /* border: 1px dashed yellow; */
  top: 0;
  left: 0;
}

@media (--res-narrow) {
  .section {
    flex-direction: column;
    justify-content: center;
    /* flex-direction: column-reverse; */
  }

  .text-pane {
    width: 100%;
    align-items: flex-start;
  }

  .logo-pane {
    /* position: relative; */
    width: 80%;
    top: 0;
    right: 10%;
  }

  .backdrop {
    transform: translateY(50%);
  }

  .hero-cta {
    align-self: center;
  }
}
</style>

<template>
  <div class="section full-page flex-row flex-gap scroll-snap-align-start">
    <div class="backdrop pos-absolute">
      <Blob gradient="secondary" />
    </div>

    <div class="logo-pane pos-absolute" v-intersection-observer="on3DModelVisible">
      <Model3D
        asset-url="/logo.glb"
        :enabled="is3DModelVisible"
        animate
      />
    </div>

    <div class="text-pane pos-relative flex-col flex-gap-small">
      <CodeMarquee />
      <p class="pos-relative about overlay">{{ t('landing.hero.about') }}</p>
      <Button class="hero-cta" :text="t('landing.hero.cta')" @click="router.push('/#contact')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { vIntersectionObserver } from '@vueuse/components'
import Model3D from '@/components/landing/elements/Model3D.vue'
import Blob from '@/components/landing/elements/Blob.vue'
import CodeMarquee from '@/components/landing/elements/CodeMarquee.vue'
import Button from '@/components/Button.vue'

const { t } = useI18n()
const router = useRouter()
const is3DModelVisible = ref(true)

const on3DModelVisible = (e: IntersectionObserverEntry[]) => { is3DModelVisible.value = e[0].isIntersecting }
</script>
