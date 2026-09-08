// src/main.ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './styles/main.css'

// Pinia
import { createPinia } from 'pinia'

// Create app
const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(createPinia())
app.mount('#app')
