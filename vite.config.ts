
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/kotrahub/',

  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
      'vuetify': 'vuetify'
    }
  },
  optimizeDeps: {
    include: ['vuetify']
  },
  server: {
    port: 5174,
    hmr: {
      overlay: false,
    },
  },
})
