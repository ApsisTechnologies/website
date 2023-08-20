import axios from 'axios'
import { useNuxtApp } from 'nuxt/app'

export const sendContactRequest = async (name: string, email: string) => {
  const { $config } = useNuxtApp()
  const url = `${$config.public.API_BASE_URL}/contact?name=${name}&email=${email}`
  await axios.post(url)
}
