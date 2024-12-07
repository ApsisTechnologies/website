<template>
  <ContentDoc v-slot="{ doc }" :head="false">
    <h1 class="text-gradient">{{ doc.title }}</h1>
    <ContentRenderer :value="doc" />
  </ContentDoc>
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'default' })
</script>
