// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'

import { LightTheme, DarkTheme } from '@/theme/global.theme'
import { AppTheme } from '@/interfaces/common.interface'

export default createVuetify({
  components: {
    ...components,
    VDateInput,
  },
  directives,
  theme: {
    defaultTheme: AppTheme.LIGHT,
    themes: {
      [AppTheme.LIGHT]: LightTheme,
      [AppTheme.DARK]: DarkTheme
    }
  },
  defaults: {
    VBtn: {},
    VCard: {
      rounded: 'md'
    },
    VTextField: {
      rounded: 'lg'
    },
    VTooltip: {
      location: 'top'
    }
  }
})
