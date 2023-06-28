<template>
  <h3>A creative technology studio</h3>
  <h1>Re-imagine technology</h1>
  <p>Metaverse and web3 development services</p>
  <GitHubLogo />
  <TwitterLogo />
  <LinkedInLogo />
</template>

<script setup lang="ts">
import { definePageMeta } from '#imports'
import GitHubLogo from 'assets/icons/social/github.svg'
import TwitterLogo from 'assets/icons/social/twitter.svg'
import LinkedInLogo from 'assets/icons/social/linkedin.svg'

definePageMeta({
  layout: 'landing'
})
</script>
