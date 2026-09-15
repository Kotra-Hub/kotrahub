import { useTheme } from 'vuetify'

export function useThemeTokens() {
  const theme = useTheme()

  const surface = (alpha = 1) => `rgb(var(--v-theme-surface) / ${alpha})`
  const surfaceVariant = (alpha = 1) => `rgb(var(--v-theme-surface-variant) / ${alpha})`
  const text = (alpha = 1) => `rgb(var(--v-theme-on-surface) / ${alpha})`
  const primary = () => `rgb(var(--v-theme-primary))`

  return { theme, surface, surfaceVariant, text, primary }
}
