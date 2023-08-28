export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export function pickRandomElement(array: []) {
  if (!Array.isArray(array)) {
    return null
  }
  return array[Math.trunc(Math.random() * array.length)]
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function getCssVariable(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

export function setCssVariable(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}

export function isValidEmailAddress(email: string) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

export function extractEmailDomain(email: string): string | null {
  const regex = /@([a-zA-Z0-9.-]+)/
  const match = email.match(regex)
  return match && match.length > 1 ? match[1] : null
}

export function isValidPassword(password: string) {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-+=~`[\]{}|\\:;"'<>,.?/_]{8,}$/
  return regex.test(password)
}

export function getUserLocale() {
  return window.navigator.language
}

export function navigate(url: string, external = false) {
  window.open(url.toString(), external ? '_blank' : undefined)
}

export const rotateForward = (v: number, max: number) => v === max - 1 ? 0 : v + 1
