<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 10rem;
  padding-left: var(--content-margin);
  padding-right: var(--content-margin);
  background: var(--background-gradient);
}

.logos-container {
  display: flex;
  margin-top: 2rem;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 3rem;
  /* border: 1px solid greenyellow; */
}

@media (--res-narrow) {
  .logos-container {
    flex-direction: column;
  }
}

.logo {
  width: 16rem;
  height: auto;
  /* border: 1px solid cyan; */
}
</style>

<template>
  <div class="section pos-relative flex-col">
    <span class="landing-title">{{ t('landing.stack.title') }}</span>
    <div class="logos-container">
      <AWSLogo
        class="logo"
        style="width: 7rem; transform: translateY(1rem);"
        v-intersection-observer="onIntersect"
      />
      <UELogo class="logo" v-intersection-observer="onIntersect" />
      <EthereumLogo class="logo" v-intersection-observer="onIntersect" />
      <PolygonLogo class="logo" v-intersection-observer="onIntersect" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { vIntersectionObserver } from '@vueuse/components'
import { addClassIfVisible } from 'lib/util'
import UELogo from '@/assets/icons/logos/ue.svg'
import PolygonLogo from '@/assets/icons/logos/polygon.svg'
import EthereumLogo from '@/assets/icons/logos/ethereum.svg'
import AWSLogo from '@/assets/icons/logos/aws.svg'

const { t } = useI18n()

const onIntersect = (e: IntersectionObserverEntry[]) => {
  addClassIfVisible(e[0], 'slide-in-left-or-bottom')
}
</script>
