<style scoped>
.nav {
  position: fixed;
  top: 0;
  padding: 1rem var(--content-margin);
  width: 100%;
  transition: transform 300ms ease-out, background 300ms ease-out;
  gap: .6rem;
}

.nav-background {
  background: var(--callout-color);
}

.nav-hidden {
  transform: translateY(-100%) scaleX(0)
}

.brand-container {
  gap: .7rem;
}

.navigation-container {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;
}

.nav-links-middle {
  display: flex;
}

.nav-links-bottom {
  display: none;
}

@media (--res-narrow) {
  .nav-links-middle {
    display: none;
  }

  .nav-links-bottom {
    display: flex;
    justify-content: center;
  }
}
</style>

<template>
  <nav
    class="nav flex-col"
    :class="{
      'nav-hidden': hidden && !noHide,
      'nav-background': hidden && noHide
    }"
  >
    <div class="navigation-container flex-row">
      <div class="brand-container flex-row flex-center" @click="router.push('/')">
        <Logo animation-class="grow-and-spin" />
        <Wordmark />
      </div>

      <div class="nav-links-middle">
        <NavLinks />
      </div>

      <Button
        small
        :text="t('nav.contact')"
        @click="onContact"
        expand
      />
    </div>

    <div class="nav-links-bottom">
      <NavLinks />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useI18n } from '#imports'
import Logo from 'components/Logo.vue'
import Wordmark from 'components/Wordmark.vue'
import NavLinks from 'components/NavLinks.vue'
import Button from 'components/Button.vue'

const { t } = useI18n()

const props = defineProps({
  threshold: {
    type: Number,
    required: false,
    default: 30
  },
  noHide: {
    type: Boolean,
    required: false,
    default: false
  }
})

const router = useRouter()
const { y } = useWindowScroll()

const hidden = computed(() => y.value > props.threshold)

const onContact = () => {
  router.push({ path: '/', hash: '#contact' })
}
</script>
