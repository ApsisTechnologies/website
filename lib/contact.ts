import axios from 'axios'
import { useNuxtApp } from 'nuxt/app'

export const sendContactRequest = async (
  name: string,
  email: string,
  company: string,
  message: string
) => {
  const { $config } = useNuxtApp()
  const baseUrl = `${$config.public.API_BASE_URL}/contact`
  await axios.post(baseUrl, {}, {
    params: {
      name,
      email,
      company,
      message
    }
  })
}
