const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()\-+=~`[\]{}|\\:;"'<>,.?/_]{8,}$/

export const wait = (milliseconds: number) => new Promise((resolve) => {
  window.setTimeout(resolve, milliseconds)
})

export const pickRandomElement = (array: any[]) => array[Math.trunc(Math.random() * array.length)]

export const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

export function getCssVariable(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name)
}

export function setCssVariable(name: string, value: string) {
  document.documentElement.style.setProperty(name, value)
}

export const isValidEmailAddress = (email: string) => emailRegex.test(email)

export function extractEmailDomain(email: string): string | null {
  const regex = /@([a-zA-Z0-9.-]+)/
  const match = email.match(regex)
  return match && match.length > 1 ? match[1] : null
}

export const isValidPassword = (password: string) => passwordRegex.test(password)

export const getUserLocale = () => window.navigator.language

export const getUserLanguage = () => getUserLocale().slice(0, 2)

export function navigate(url: string, external = false) {
  window.open(url, external ? '_blank' : '_self')
}

export const rotateForward = (v: number, max: number) => v === max - 1 ? 0 : v + 1

export const toggleClassIfVisible = (e: IntersectionObserverEntry, animClassName: string) => {
  const element = e.target
  const isVisible = e.isIntersecting
  if (element && isVisible) {
    element.classList.add(animClassName)
  } else {
    element.classList.remove(animClassName)
  }
}

export const addClassIfVisible = (e: IntersectionObserverEntry, animClassName: string) => {
  const element = e.target
  const isVisible = e.isIntersecting
  if (element && isVisible) {
    element.classList.add(animClassName)
  }
}
