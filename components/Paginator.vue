<style scoped>
.container {
  position: relative;
  gap: 1.4rem;
  margin: 0 auto;
}

.dot {
  position: relative;
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  background-color: var(--muted-text-color);
  transition: all 100ms ease-out;
}

.arrow {
  font-size: 1.2rem;
  font-weight: 400;
  transition: all 100ms linear;
}

.active {
  background-color: var(--text-color);
  /* pointer-events: none; */
}

@media (--hover) {
  .dot:hover, .arrow:hover {
    cursor: pointer;
    transform: scale(1.5);
  }
}
</style>

<template>
  <div class="container flex-row flex-center">
    <span class="arrow" @click="emit('previous')">«</span>

    <div
      :class="`dot ${(i - 1) === props.index ? 'active' : ''}`"
      :key="i"
      v-for="i of props.count"
      @click="emit('selected', i - 1)"
    />

    <span class="arrow" @click="emit('next')">»</span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['selected', 'next', 'previous'])

const props = defineProps({
  count: {
    type: Number,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>
