<!-- src/components/MainPage.vue -->
<template>
  <v-app>
    <!-- Header -->
    <Header v-if="user" :user="user" :is-dark="isDark" @logout="handleLogout" @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleTheme" @open-drawer="openDrawer" @open-settings="openSettings" @navigate="navigate" />

    <!-- Sidebar + Main Content -->
    <div class="page-body">

      <!-- Sidebar -->
      <aside v-if="sidebarOpen" class="sidebar-wrapper">
        <Sidebar :is-open="sidebarOpen" :current-page="currentRouteName" @navigate="navigate" />
      </aside>

      <!-- Main Content -->
      <main class="content-wrapper">
        <v-container fluid class="pa-4">
          <router-view />
        </v-container>
      </main>

    </div>

    <!-- Footer -->
    <v-footer elevation="0" class="footer-wrapper">
      <Footer />
    </v-footer>

    <!-- AI Assistant -->
    <AiAssistant
      @navigate="navigate"
      @toggle-theme="toggleTheme"
      @logout="handleLogout"
    />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import AiAssistant from '@/components/AiAssistant.vue'
import { useAuth } from '@/composables/useAuth'
import { AppTheme } from '@/interfaces/common.interface'

const theme = useTheme()
const router = useRouter()
const route = useRoute()
const { user, logout } = useAuth()

const isDark = ref(false)
const sidebarOpen = ref(true)

const currentRouteName = computed(() => route.name as string)

watch(user, (newUser) => {
  if (!newUser && route.name !== 'login') {
    router.push({ name: 'login' })
  }
})

onMounted(() => {
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
  theme.change(newTheme)
  localStorage.setItem('theme', newTheme)
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const openDrawer = () => console.log('Open search drawer')
const openSettings = () => console.log('Open settings')

const navigate = (page: string) => {
  router.push({ name: page })
  if (window.innerWidth < 600) sidebarOpen.value = false
}
</script>

<style scoped>
.page-body {
  display: flex;
  width: 100%;
  align-items: stretch;
}

.sidebar-wrapper {
  flex: 0 0 76px;
  width: 76px;
  align-self: stretch;
  display: flex;
}

.content-wrapper {
  flex: 1;
  min-width: 0;
}

.footer-wrapper {
  width: 100%;
  min-height: 32px !important;
  height: 32px !important;
  padding: 0 !important;
  flex-shrink: 0;
}
</style>
