import { ThemeManager } from 'lib/theme'
import { inject } from 'vue'

export const useThemeManager = () => inject('themeManager') as ThemeManager
