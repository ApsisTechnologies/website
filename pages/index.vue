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
import { useHead } from 'unhead'
import GitHubLogo from 'assets/icons/social/github.svg'
import TwitterLogo from 'assets/icons/social/twitter.svg'
import LinkedInLogo from 'assets/icons/social/linkedin.svg'

definePageMeta({ layout: 'landing' })

const title = 'Home | RockinDev'
const locale = 'en_US'

useHead({
  title,
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: 'RockinDev\'s home page yo!' },

    { property: 'og:locale', content: locale },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title }
    // { property: 'og:url', content: config.appUrl },
    // { property: 'og:site_name', content: copy.company.name },
    // { property: 'og:description', content: copy.company.tagline },
    // { property: 'og:image', content: `${config.appUrl}/img/banner.png` },
    // { property: 'og:image:type', content: 'image/png' },
    // { property: 'og:image:width', content: '1200' },
    // { property: 'og:image:height', content: '630' }
  ]
})
</script>
