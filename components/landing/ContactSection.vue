<style scoped>
.section {
  padding-top: 3rem;
  padding-bottom: 5rem;
  padding-left: var(--content-margin);
  padding-right: var(--content-margin);
}

.panel-container {
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem;
  margin-top: 2rem;
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
</style>

<template>
  <div id="contact" class="section pos-relative flex-col">
    <span class="landing-title">{ {{ t('landing.contact.title') }} }</span>

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

       <ContactForm glow />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '#imports'
import { isValidEmailAddress, extractEmailDomain } from 'lib/util'
import TextInput from '@/components/TextInput.vue'
import ContactForm from '@/components/ContactForm.vue'
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

const nameField = ref<InstanceType<typeof TextInput>>()
const companyField = ref<InstanceType<typeof TextInput>>()
const emailField = ref<InstanceType<typeof TextInput>>()
const messageField = ref<InstanceType<typeof TextInput>>()

let sending = ref(false)
let sent = ref(false)

const formEnabled = computed(() => !sending.value && !sent.value)

const validateName = (name: string) => {
  return name.length ? '' : t('landing.contact.invalidName')
}

const validateCompanyName = (name: string) => {
  return name.length ? '' : t('landing.contact.invalidCompany')
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
  const company =  companyField.value.getText()
  const message = messageField.value.getText()

  if (!name.length) {
    nameField.value.focus()
    return
  }

  if (!company.length) {
    companyField.value.focus()
    return
  }

  if (validateEmail(email) != '') {
    emailField.value.focus()
    return
  }

  sending.value = true
  await sendContactRequest(name, email, company, message)
  sent.value = true
  sending.value = false
}
</script>
