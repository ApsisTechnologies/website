<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 5rem;
  padding-left: var(--content-margin);
  padding-right: var(--content-margin);
  /* background-color: var(--background-color); */
}

.panel-container {
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
}

@media (--res-narrow) {
  .panel-container {
    flex-direction: column-reverse;
    align-items: center;
    gap: 4rem;
  }
}

.location-panel {
  gap: 3rem;
}

.form-panel {
  background: linear-gradient(hsl(0deg 100% 50%) 0%, hsl(271deg 100% 50%) 100%);

  border-radius: var(--border-radius);
  padding: 2rem;
  position: relative;
  max-width: 30rem;

  overflow-x: hidden;
}

.form-panel::before {
  content: '';
  position: absolute;
  width: calc(100% - var(--decoration-line-thickness) * 2);
  height: calc(100% - var(--decoration-line-thickness) * 2);
  top: var(--decoration-line-thickness);
  left: var(--decoration-line-thickness);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
}

.form-text {
  font-weight: 500;
  margin-top: .5rem;
}

.subtitle-decoration {
  color: red;
  width: 1.8rem;
  height: 1.4rem;
  transform: translate(.3rem, -.3rem);
}

.location-icon {
  height: 2rem;
  width: 1.4rem;
  transform: translateY(.4rem);

}
.location-title {
  text-transform: uppercase;
  font-weight: 800;
  font-size: 1rem;
}

.location-text {
  text-transform: uppercase;
  font-size: .8rem;
  line-height: 1.4rem;
}

.confirmation-text {
  font-size: .8rem;
  line-height: 1rem;
  margin-top: 1rem;
}
</style>

<template>
  <div id="contact" class="section pos-relative flex-col">
    <span class="landing-title">{ {{ t('landing.contact.title') }} }</span>
    <div style="display: inline; margin-bottom: 2rem">
      <span class="landing-subtitle text-gradient">{{ t('landing.contact.subtitle') }}</span>
      <HeartIcon class="subtitle-decoration" />
    </div>
    <div class="panel-container flex-row">

      <div class="location-panel flex-col">
        <div class="location flex-row flex-gap selectable">
          <LocationIcon class="location-icon" />
          <div class="flex-col">
            <span class="location-title">{{ t('landing.contact.locations.us.title') }}</span>
            <span class="location-text">{{ t('landing.contact.locations.us.address[0]') }}</span>
            <span class="location-text">{{ t('landing.contact.locations.us.address[1]') }}</span>
            <span class="location-text">{{ t('landing.contact.locations.us.address[2]') }}</span>
          </div>
        </div>
        <div class="location flex-row flex-gap selectable">
          <LocationIcon class="location-icon" />
          <div class="flex-col">
            <span class="location-title">{{ t('landing.contact.locations.ar.title') }}</span>
            <span class="location-text">{{ t('landing.contact.locations.ar.address[0]') }}</span>
            <span class="location-text">{{ t('landing.contact.locations.ar.address[1]') }}</span>
            <span class="location-text">{{ t('landing.contact.locations.ar.address[2]') }}</span>
          </div>
        </div>
      </div>
      <div class="form-panel flex-col">
        <span class="form-text" style="z-index: 1">{{ t('landing.contact.formText') }}</span>
        <TextInput
          ref="nameField"
          :name="t('landing.contact.namePlaceholder')"
          :validator="validateName"
          :enabled="formEnabled"
        />
        <TextInput
          ref="emailField"
          :name="t('landing.contact.emailPlaceholder')"
          :validator="validateEmail"
          :enabled="formEnabled"
        />
        <Button
          :text="t('landing.contact.buttonText')"
          @click="onSend"
          :enabled="formEnabled"
          :loading="sending"
          expand
        />
        <span
          v-if="sent"
          class="pos-relative confirmation-text"
        >
          {{ t('landing.contact.requestSentText') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '#imports'
import { isValidEmailAddress, extractEmailDomain } from 'lib/util'
import Button from 'components/Button.vue'
import TextInput from 'components/TextInput.vue'
import HeartIcon from 'assets/icons/heart.svg'
import LocationIcon from 'assets/icons/location.svg'
import { sendContactRequest } from 'lib/contact'

const personalEmailDomains = [
  'gmail.com',
  'yahoo.com',
  'rocketmail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'gmx.com',
  'aol.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'protonmail.com',
  'zoho.com',
  'yandex.com',
]

const { t } = useI18n()

const emailField = ref<InstanceType<typeof TextInput>>()
const nameField = ref<InstanceType<typeof TextInput>>()
let sending = ref(false)
let sent = ref(false)

const formEnabled = computed(() => !sending.value && !sent.value)

const validateName = (name: string) => {
  return name.length ? '' : t('landing.contact.invalidName')
}

const validateEmail = (emailAddress: string) => {
  const emailDomain = extractEmailDomain(emailAddress)
  if (!isValidEmailAddress(emailAddress) || !emailDomain) {
    return t('landing.contact.invalidEmail')
  }

  if (personalEmailDomains.includes(emailDomain)) {
    return t('landing.contact.nonWorkEmailAddress')
  }

  // ok
  return ''
}

const onSend = async () => {
  const name =  nameField.value.getText()
  const email = emailField.value.getText()

  if (!name.length) {
    nameField.value.focus()
    return
  }

  if (validateEmail(email) != '') {
    emailField.value.focus()
    return
  }

  sending.value = true
  await sendContactRequest(name, email)
  sent.value = true
  sending.value = false
}
</script>
