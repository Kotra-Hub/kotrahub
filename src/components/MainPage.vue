<!-- src/components/MainPage.vue -->
<template>
  <v-app>
    <!-- Header -->
    <Header
      v-if="user"
      :user="user"
      :is-dark="isDark"
      @logout="handleLogout"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleTheme"
      @open-drawer="openDrawer"
      @open-settings="openSettings"
      @navigate="navigate"
    />

    <!-- Sidebar + Main Content -->
    <div class="page-body">

      <!-- Sidebar -->
      <aside v-if="sidebarOpen" class="sidebar-wrapper">
        <Sidebar
          :is-open="sidebarOpen"
          :current-page="currentRouteName"
          @navigate="navigate"
        />
      </aside>

      <!-- Main Content -->
      <main class="content-wrapper">
        <v-container fluid class="pa-4">
          <!-- Router -->
          <router-view v-slot="{ Component }">
            <transition name="page-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </v-container>
      </main>

    </div>

    <!-- Footer -->
    <div class="footer-wrapper">
      <Footer />
    </div>

    <!-- AI Assistant -->
    <AiAssistant
      @navigate="navigate"
      @set-dark-mode="setDarkMode"
      @set-light-mode="setLightMode"
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
const sidebarOpen = ref(true)
const savedTheme = localStorage.getItem('theme') || AppTheme.LIGHT
const isDark = ref(savedTheme === AppTheme.DARK)

const currentRouteName = computed(() => route.name as string)
const routeMap: Record<string, { name: string; params?: Record<string, any> }> = {
  dashboard: { name: 'Dashboard' },
  profile: { name: 'Profile Details' },
  plant: { name: 'Service', params: { serviceId: 'plant' } },
  sales: { name: 'Service', params: { serviceId: 'sales' } },
  employee: { name: 'Service', params: { serviceId: 'employee' } },
  po: { name: 'Service', params: { serviceId: 'po' } },
  requisition: { name: 'Service', params: { serviceId: 'requisition' } },
  inventory: { name: 'Service', params: { serviceId: 'inventory' } },
}

const navigate = (page: string) => {
  const routeConfig = routeMap[page]

  setTimeout(() => {
    if (routeConfig) {
      router.push({
        name: routeConfig.name,
        params: routeConfig.params
      })
    } else {
      router.push({ name: page })
    }

    if (window.innerWidth < 600) sidebarOpen.value = false
  }, 400)
}

// Theme functions
const setDarkMode = () => {
  isDark.value = true
  const newTheme = AppTheme.DARK
  theme.change(newTheme)
  localStorage.setItem('theme', newTheme)
  document.documentElement.style.colorScheme = 'dark'
}

const setLightMode = () => {
  isDark.value = false
  const newTheme = AppTheme.LIGHT
  theme.change(newTheme)
  localStorage.setItem('theme', newTheme)
  document.documentElement.style.colorScheme = 'light'
}

const toggleTheme = () => {
  if (isDark.value) {
    setLightMode()
  } else {
    setDarkMode()
  }
}

watch(user, (newUser) => {
  if (!newUser && route.name !== 'Login') {
    router.push({ name: 'Login' })
  }
})

onMounted(() => {
  theme.change(savedTheme as AppTheme)

  const handleResize = () => {
    sidebarOpen.value = window.innerWidth >= 600
  }
  window.addEventListener('resize', handleResize)
  handleResize()
})

const handleLogout = () => {
  logout()
  router.push({ name: 'Login' })
}

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const openDrawer = () => console.log('Open search drawer')
const openSettings = () => console.log('Open settings')
</script>

<style scoped>
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

:deep(.v-application) {
  min-height: 100vh !important;
  height: 100% !important;
}

.v-app {
  display: flex !important;
  flex-direction: column !important;
  min-height: 100vh !important;
}

.header-bar {
  flex-shrink: 0;
}

.page-body {
  display: flex;
  width: 100%;
  align-items: stretch;
  flex: 1 1 auto;
  min-height: 0;
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
  display: flex;
  flex-direction: column;
}

.content-wrapper .v-container {
  flex: 1;
}

.footer-wrapper {
  width: 100%;
  min-height: 32px !important;
  height: auto !important;
  padding: 4px 8px !important;
  flex-shrink: 0;
  margin-top: auto;
}

@media (min-width: 601px) {
  .footer-wrapper {
    height: 32px !important;
    padding: 0 !important;
  }
}
</style>
