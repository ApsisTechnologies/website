<style scoped>
.footer {
  width: 100%;
  padding: 1rem var(--content-margin);
  background-color: var(--callout-color);

  top: 100vh;

  display: flex;
  position: sticky;
  align-items: center;

  transition: transform 200ms ease-out, opacity 200ms linear;
}

.footer-text {
  font-size: .8rem;
  font-weight: 400;
  letter-spacing: 0.04rem;
  line-height: 1.8em;
  color: var(--muted-text-color);
}

.brand-container {
  gap: .7rem;
}

.address-card {
  max-width: 10rem;
}

.locations-container {
  justify-content: center;
  align-items: flex-start;
}

.location-link {
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.04rem;
  cursor: pointer;
  white-space: nowrap;
}

.subtitle-decoration {
  color: red;
  width: 1rem;
  height: .8rem;
  margin: 0 .3rem;
}
</style>

<template>
  <footer class="footer pos-sticky flex-col flex-center flex-gap">
    <div class="brand-container flex-row flex-center">
      <Logo no-interaction />
      <Wordmark no-interaction />
    </div>

    <SocialButtonGroup
      :linkedin="config.public.LINKEDIN_URL"
      :github="config.public.GITHUB_URL"
      :twitter="config.public.TWITTER_URL"
    />

    <Separator margin="0" />
    <div class="footer-text">
      <span>{{ t('footer.pre') }} </span>
      <HeartIcon class="subtitle-decoration" />
      <span>@ RockinDev®️ {{ thisYear }}. </span>
      <span>{{ t('footer.notice') }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '#imports'
import { useRuntimeConfig } from 'nuxt/app'
import Separator from 'components/Separator.vue'
import HeartIcon from 'assets/icons/heart.svg'

const config = useRuntimeConfig()
const { t } = useI18n()

const thisYear = computed(() => `${new Date().getFullYear()}`)
</script>
