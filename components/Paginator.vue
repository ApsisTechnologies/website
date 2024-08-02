<style scoped>
.container {
  position: relative;
  gap: 2rem;
  margin: 0 auto;
}

.dot {
  position: relative;
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  background-color: var(--muted-text-color);
  transition: all 150ms ease-out;
  border: none;
  background: var(--text-color);
}

.dot::after {
  content: '';
  background-color: var(--background-color);
  position: absolute;
  width: 75%;
  height: 75%;
  top: 12.5%;
  left: 12.5%;
  border-radius: 50%;
}

.arrow {
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 100ms linear;
}

.active:after {
  background: none;
  pointer-events: none;
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

    <button
      class="dot"
      :class="{ active: (i - 1) === props.index }"
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
