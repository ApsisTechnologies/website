<style scoped>
.wordmark {
  font-size: 1.2rem;
  letter-spacing: 0.06rem;
  text-transform: uppercase;
  line-height: 1rem;
}

.wordmark-section-1 {
  font-weight: 700;
}

.wordmark-section-2 {
  font-weight: 250;
}
</style>

<template>
  <div
    class="wordmark"
    :class="{ 'no-pointer-events': props.noInteraction, 'link': !props.noInteraction }"
  >
    <span class="wordmark-section-1">rockin</span>
    <span class="wordmark-section-2">dev</span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  noInteraction?: boolean
}>(), {
  noInteraction: false
})
</script>
