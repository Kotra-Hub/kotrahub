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
          <!-- Vue Router handles all pages automatically -->
          <router-view />
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

// Mapping of page names to route names and params
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

  if (routeConfig) {
    router.push({
      name: routeConfig.name,
      params: routeConfig.params
    })
  } else {
    router.push({ name: page })
  }

  if (window.innerWidth < 600) sidebarOpen.value = false
}

watch(user, (newUser) => {
  if (!newUser && route.name !== 'Login') {
    router.push({ name: 'Login' })
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
  router.push({ name: 'Login' })
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
</script>

<style scoped>
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
