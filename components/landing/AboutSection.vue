<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 3rem;
  position: relative;
  background-color: var(--background-color);
}

.icon-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.icon {
  max-width: 20rem;
  padding: 1rem;
}

.icon-img {
  width: 15em;
  opacity: 0;
}

.text {
  font-family: var(--heading-font);
  text-transform: uppercase;
  text-align: center;
  font-weight: 700;
  letter-spacing: .04rem;
  font-size: 1rem;
  line-height: 1.4rem;
  padding: 0 1rem;
  animation-delay: 500ms;
  opacity: 0;
}
</style>

<template>
  <div id="about" class="full-page flex-col section">
    <span class="landing-title text-outline">{{ t('landing.about.title' ) }}</span>

    <div class="icon-container flex-gap">
      <div
        v-for="element of icons"
        :key="element.textKey.value"
        class="icon flex-col flex-center"
      >
        <img
          class="icon-img  no-pointer-events"
          :src="element.img"
          v-intersection-observer="(e) => onIntersect(e, iconAnimationName)"
        />
        <span
          class="text"
          v-html="element.textKey.value"
          v-intersection-observer="(e) => onIntersect(e, textAnimationName)">
        </span>
      </div>
    </div>

    <Button
      small
      :text="t('landing.about.cta')"
      @click="onContact"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { computed } from 'vue'
import { useEventBus } from 'composables/event'
import { EventType } from 'lib/event'
import { vIntersectionObserver } from '@vueuse/components'
import { addClassIfVisible } from 'lib/util'
import Button from 'components/Button.vue'
import arrows from '@/assets/images/arrows.jpg'
import heart from '@/assets/images/heart.jpg'
import point from '@/assets/images/point.jpg'

const emphasisTag = 'strong'
const iconAnimationName = 'slide-in-left-or-bottom'
const textAnimationName = 'fade-in'

const format = (text: string) => text
  .replaceAll('*(', `<${emphasisTag}>`)
  .replaceAll(')*', `</${emphasisTag}>`)

const icons = [
  {
    textKey: computed(() => format(t('landing.about.heart.text'))),
    img: heart,
  },
  {
    textKey: computed(() => format(t('landing.about.arrows.text'))),
    img: arrows,
  },
  {
    textKey: computed(() => format(t('landing.about.point.text'))),
    img: point,
  }
]

const { t } = useI18n()
const bus = useEventBus()

const onContact = () => { bus.emit(EventType.CONTACT) }

const onIntersect = (e: IntersectionObserverEntry[], animClassName: string) => {
  addClassIfVisible(e[0], animClassName)
}
</script>
