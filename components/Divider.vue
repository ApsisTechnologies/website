<style scoped>
.divider {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  color: var(--muted-text-color);
  pointer-events: none;
}

.divider-text {
  text-align: center;
  font-size: 0.8rem;
  text-transform: uppercase;
  white-space: nowrap;
}

.divider > hr {
  display: inline;
  border: none;
  width: 100%;
  height: 0.2rem;
  margin: 2rem .6rem;
  border-top: var(--decoration-line-thickness) solid var(--border-color);
}
</style>

<template>
  <div class="divider">
    <template v-if="props.text">
      <hr v-if="!props.left" />
      <span class="divider-text">{{ props.text }}</span>
      <hr v-if="!props.right" />
    </template>
    <template v-else>
      <hr />
    </template>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string,
  right?: boolean,
  left?: boolean
}>(), {
  text: '',
  right: false,
  left: false,
})

// export default {
//   name: 'Divider',
//   props: {
//     text: {
//       type: String,
//       default: '',
//       required: false
//     },
//     left: {
//       type: Boolean,
//       default: false,
//       required: false
//     },
//     right: {
//       type: Boolean,
//       default: false,
//       required: false
//     }
//   }
// }
</script>
