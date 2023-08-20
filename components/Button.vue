<style scoped>
.button {
  background-color: var(--border-color);
  position: relative;
  height: 2.6em;
  border-radius: 1.3em;
  border: 1px solid var(--main-gradient);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  margin: 0;
  overflow: hidden;
  transition: all 150ms ease-out;

  font-weight: 600;
  font-size: 1.1rem;
  line-height: normal;
  letter-spacing: 0.06em;

  box-shadow: var(--card-shadow);
}

.button-icon {
  position: absolute;
  left: 1rem;
  height: 1.5rem;
  width: 1.5rem;
}

.button-text {
  position: relative;
  padding: 0 1rem;
  text-transform: uppercase;
  pointer-events: none;
  transition: all 100ms ease-out;
}

@media (--hover) {
  .button:hover {
    cursor: pointer;
  }

  .button:hover > .button-background {
    background-color: var(--highlighted-callout-color);
  }
}

.text-with-icon {
  padding-left: 1.5rem;
}

.button-border {
  position: absolute;
  background: var(--button-gradient );
  width: 100%;
  height: 100%;
}

.button-background {
  border-radius: 1.3em;
  background-color: var(--background-color);
  display: block;
  position: absolute;
  top: var(--decoration-line-thickness);
  left: var(--decoration-line-thickness);
  width: calc(100% - var(--decoration-line-thickness) * 2);
  height: calc(100% - var(--decoration-line-thickness) * 2);
  transition: background-color 150ms linear;
}

.button-glow {
  animation-name: glow;
  animation-duration: 500ms;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes glow {
  from { opacity: 0.1 }
  to   { opacity: 1 }
}
</style>

<template>
  <div
    class="button"
    :style="style_"
    @click="onClick"
  >
    <div class="button-border" />
    <div :class="`button-background ${loading ? 'button-glow': ''}`" :style="backgroundStyle_" />
    <div v-if="icon" class="button-icon" v-html="svg_" />
    <span :class="`button-text non-breaking-text ${icon ? 'text-with-icon' : ''}`">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { clamp } from 'lib/util'
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: {
    type: String,
    default: null,
    required: false
  },
  text: {
    type: String,
    default: null,
    required: false
  },
  to: {
    type: String,
    default: null,
    required: false
  },
  color: {
    type: String,
    default: 'var(--background-color)',
    required: false
  },
  textColor: {
    type: String,
    default: 'var(--text-color)',
    required: false
  },
  enabled: {
    type: Boolean,
    default: true,
    required: false
  },
  progress: {
    type: Number,
    default: 1.0,
    required: false
  },
  loading: {
    type: Boolean,
    default: false,
    required: false
  },
  small: {
    type: Boolean,
    default: false,
    required: false
  },
  expand: {
    type: Boolean,
    default: false,
    required: false
  }
})

const router = useRouter()

const style_ = computed(() =>
  `${props.expand ? '' : 'margin: auto;'}` +
  `${props.enabled ? '' : 'pointer-events: none;'}` +
  `${props.small ? 'height: 2rem; padding: 0 1rem; font-size: .9rem' : ''};` +
  `color: ${props.enabled ? props.textColor : 'var(--highlighted-callout-color)'}`
)

const backgroundStyle_ = computed(() =>
  `transform: scaleX(${clamp(props.progress, 0, 1)});` //+
  // `background-color: ${props.enabled ? props.color : 'var(--border-color)'};`
)

const svg_ = computed(() => {
  // if (props.icon) {
  // return await import(`@/assets/icons/${props.icon}.svg`)
  // } else {
  // return null
  // }
  return null
})

const doRipple = (event: Event) => {
  const parent = event.currentTarget as HTMLElement
  if (parent) {
    const ripple = window.document.createElement('div')
    ripple.style.width = ripple.style.height = '100%'
    ripple.style.top = ripple.style.left = '0'
    ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    ripple.classList.add('ripple')
    parent.appendChild(ripple)
  }
}

const onClick = (event: Event) => {
  if (props.enabled) {
    doRipple(event)
    if (props.to) {
      router.push(props.to)
    }
  }
}

defineExpose({
  doRipple,
  onClick
})
</script>
