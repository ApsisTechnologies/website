import { ThemeManager, ColorScheme } from 'lib/theme'
import { inject, onMounted, onBeforeUnmount } from 'vue'

export const useThemeManager = () => inject('themeManager') as ThemeManager

export const useScheme = (scheme: ColorScheme) => {
  const themeManager = useThemeManager()
  const savedScheme = themeManager.colorScheme

  onMounted(() => {
    themeManager.colorScheme = scheme
  })

  onBeforeUnmount(() => {
    themeManager.colorScheme = savedScheme
  })
}

export const useLightScheme = () => {
  useScheme(ColorScheme.dark)
}

export const useDarkScheme = () => {
  useScheme(ColorScheme.dark)
}

export const useAutoScheme = () => {
  useScheme(ColorScheme.auto)
}
