<style scoped>
.form-panel {
  background-color: var(--background-color);
  /* background-color: var(--callout-color); */

  border-radius: var(--border-radius);
  padding: 2rem;
  position: relative;
  max-width: 30rem;
}

@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

.form-panel::after,
.form-panel::before
{
  --gradient-angle: 0deg;
  --gradient-angle: 1px;

  content: '';
  position: absolute;

  width: calc(100% + var(--decoration-line-thickness) * 2);
  height: calc(100% + var(--decoration-line-thickness) * 2);
  top: calc(-1.0 * var(--decoration-line-thickness));
  left: calc(-1.0 * var(--decoration-line-thickness));
  z-index: -1;

  border-radius: var(--border-radius);
}

.form-panel::after {
  background: var(--button-gradient);
}

.form-panel-glow::before {
  filter: blur(2rem);

  background-image: conic-gradient(
    from var(--gradient-angle),
    var(--button-gradient-stop-color) 0%,
    var(--button-gradient-start-color) 66%,
    var(--button-gradient-stop-color) 100%
  );

  opacity: 0.3;

  animation: 3s spin linear infinite;
  animation-fill-mode: forwards;
}

@keyframes spin {
  0% {
    --gradient-angle: 0deg;
    opacity: .7;
  }
  50% {
    opacity: .5;
  }
  100% {
    --gradient-angle: 360deg;
    opacity: .7;
  }
}

.form-text {
  font-weight: 500;
  margin-top: .5rem;
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
  <div
    :class="{ 'form-panel-glow': props.glow }"
    class="pos-relative form-panel flex-col"
  >
    <span class="landing-subtitle text-gradient">{{ t('landing.contact.formTitle') }}</span>
    <span class="form-text">{{ t('landing.contact.formSubtitle') }}</span>
    <TextInput
      ref="nameField"
      :name="t('landing.contact.namePlaceholder')"
      :validator="validateName"
      :enabled="formEnabled"
    />
    <TextInput
      ref="companyField"
      :name="t('landing.contact.companyPlaceholder')"
      :validator="validateCompanyName"
      :enabled="formEnabled"
    />
    <TextInput
      ref="emailField"
      :name="t('landing.contact.emailPlaceholder')"
      :validator="validateEmail"
      :enabled="formEnabled"
    />
    <TextInput
      ref="messageField"
      :name="t('landing.contact.messagePlaceholder')"
      :enabled="formEnabled"
      :max-length="150"
      multiline
    />
    <br/>

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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from '#imports'
import { isValidEmailAddress, extractEmailDomain } from 'lib/util'
import Button from 'components/Button.vue'
import TextInput from 'components/TextInput.vue'
import LocationIcon from 'assets/icons/location.svg'
import { sendContactRequest } from 'lib/contact'

const props = withDefaults(defineProps<{
  glow?: boolean
}>(), {
  glow: false,
})

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
