<!-- src\components\MainPage.vue -->
<template>
  <v-app>
    <Header v-if="user" :user="user" :is-dark="isDark" @logout="handleLogout" @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleTheme" @open-drawer="openDrawer" @open-settings="openSettings" @navigate="navigate" />

    <v-navigation-drawer v-model="sidebarOpen" app :permanent="false" location="left" :width="76" :elevation="0"
      :color="'transparent'" class="sidebar-drawer" style="border-right: none !important;">
      <Sidebar :is-open="sidebarOpen" :current-page="currentRouteName" @navigate="navigate" />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-4">
        <router-view />
      </v-container>
    </v-main>

    <v-footer app elevation="0">
      <Footer />
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import { useAuth } from '@/composables/useAuth'
import { AppTheme } from '@/interfaces/common.interface'

const theme = useTheme()
const router = useRouter()
const route = useRoute()
const { user, logout } = useAuth()

const isDark = ref(false)
const sidebarOpen = ref(true)

const currentRouteName = computed(() => route.name as string)

// Watch for user changes and redirect if logged out
watch(user, (newUser) => {
  if (!newUser && route.name !== 'login') {
    router.push({ name: 'login' })
  }
})

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  const validThemes: string[] = [AppTheme.LIGHT, AppTheme.DARK]
  const selectedTheme = validThemes.includes(savedTheme ?? '')
    ? (savedTheme as string)
    : AppTheme.LIGHT
  theme.global.name.value = selectedTheme
  isDark.value = selectedTheme === AppTheme.DARK

  const handleResize = () => {
    sidebarOpen.value = window.innerWidth >= 600
  }
  window.addEventListener('resize', handleResize)
  handleResize()
})

const handleLogout = () => {
  logout()
  router.push({ name: 'login' })
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  const newTheme = isDark.value ? AppTheme.DARK : AppTheme.LIGHT
  theme.global.name.value = newTheme
  localStorage.setItem('theme', newTheme)
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const openDrawer = () => console.log('Open search drawer')
const openSettings = () => console.log('Open settings')

const navigate = (page: string) => {
  // If the page is 'profile' or any other nested route, navigate to it
  // The router will handle the nested route structure
  router.push({ name: page })
  if (window.innerWidth < 600) sidebarOpen.value = false
}
</script>

<style scoped>
.sidebar-drawer :deep(.v-navigation-drawer__content) {
  padding: 0 !important;
  overflow: hidden !important;
}

.sidebar-drawer :deep(.v-navigation-drawer__content > *) {
  height: 100%;
}

.sidebar-drawer {
  height: 100% !important;
  max-height: 100vh !important;
}

.sidebar-drawer :deep(.v-navigation-drawer) {
  border-right: none !important;
  box-shadow: none !important;
}

.sidebar-drawer :deep(.v-navigation-drawer__scrim) {
  background: transparent !important;
}

.sidebar-drawer :deep(.v-navigation-drawer__border) {
  display: none !important;
}
</style>
