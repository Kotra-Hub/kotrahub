<!-- src/components/MainPage.vue -->
<template>
  <v-app>
    <!-- Header -->
    <Header
      :key="`header-${showImportantNotice}`"
      v-if="user"
      :user="user"
      :is-dark="isDark"
      :show-important-notice="showImportantNotice"
      @logout="handleLogout"
      @toggle-sidebar="toggleSidebar"
      @toggle-theme="toggleTheme"
      @open-settings="openSettings"
      @navigate="navigate"
      @update:show-important-notice="(val) => showImportantNotice = val"
    />

    <!-- Settings Dialog -->
    <Settings
      v-model="settingsDialog"
      :is-dark="isDark"
      :show-important-notice="showImportantNotice"
      @toggle-theme="toggleTheme"
      @update:show-important-notice="(val) => showImportantNotice = val"
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
              <component :is="Component" @navigate="navigate" />
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

    <!-- Navigation Loading Overlay -->
    <LoadingOverlay
      v-model="navigationLoading"
      :title="navigationTitle"
      :message="navigationMessage"
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
import Settings from '@/components/Settings.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { useAuth } from '@/composables/useAuth'
import { AppTheme } from '@/interfaces/common.interface'

const theme = useTheme()
const router = useRouter()
const route = useRoute()
const { user, logout } = useAuth()
const sidebarOpen = ref(true)
const savedTheme = localStorage.getItem('theme') || AppTheme.LIGHT
const isDark = ref(savedTheme === AppTheme.DARK)
const settingsDialog = ref(false)
const showImportantNotice = ref(true)

// Navigation loading state
const navigationLoading = ref(false)
const navigationTitle = ref('Loading...')
const navigationMessage = ref('')

const currentRouteName = computed(() => route.name as string)
const pageDisplayNames: Record<string, string> = {
  // Route names
  'Dashboard': 'Dashboard',
  'Profile Details': 'Profile',
  'Service': 'Service',
  'Recent Activities': 'Recent Activities',

  // Service IDs (for dynamic routes)
  'Plant': 'Plant Management',
  'Sales': 'Sales Management',
  'Employee': 'Employee Management',
  'PO': 'Purchase Orders',
  'Requisition': 'Requisition',
  'Inventory': 'Inventory Management',
}

const routeMap: Record<string, { name: string; params?: Record<string, any> }> = {
  dashboard: { name: 'Dashboard' },
  profile: { name: 'Profile Details' },
  'recent-activities': { name: 'Recent Activities'},
  plant: { name: 'Service', params: { serviceId: 'plant' } },
  sales: { name: 'Service', params: { serviceId: 'sales' } },
  employee: { name: 'Service', params: { serviceId: 'employee' } },
  po: { name: 'Service', params: { serviceId: 'po' } },
  requisition: { name: 'Service', params: { serviceId: 'requisition' } },
  inventory: { name: 'Service', params: { serviceId: 'inventory' } },
}

const getPageDisplayName = (routeName: string | undefined, routeParams?: Record<string, any>): string => {
  if (!routeName) return 'Page'

  if (routeName === 'Service' && routeParams?.serviceId) {
    const serviceId = routeParams.serviceId as string
    return pageDisplayNames[serviceId] || serviceId.charAt(0).toUpperCase() + serviceId.slice(1) + ' Management'
  }

  return pageDisplayNames[routeName] || routeName
}

const showLoading = (pageName: string) => {
  // Title always stays "Loading..."
  navigationTitle.value = 'Loading...'
  // Message changes to "Opening XXX..."
  navigationMessage.value = `Opening ${pageName}...`
  navigationLoading.value = true
}

const navigate = (page: string) => {
  if (page === 'settings') {
    openSettings()
    return
  }

  // Get the display name for the page
  const pageKey = page === 'profile' ? 'profile' : page
  const displayName = getPageDisplayName(pageKey)

  showLoading(displayName)

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

    setTimeout(() => {
      navigationLoading.value = false
    }, 600)

    if (window.innerWidth < 600) sidebarOpen.value = false
  }, 400)
}

watch(
  () => [route.name, route.params],
  ([newRouteName, newParams]) => {
    if (newRouteName && typeof newRouteName === 'string') {
      const displayName = getPageDisplayName(newRouteName, newParams as Record<string, any>)

      if (navigationLoading.value === false) {
        showLoading(displayName)

        // Hide after navigation completes
        setTimeout(() => {
          navigationLoading.value = false
        }, 500)
      }
    }
  },
  { immediate: false }
)

router.beforeEach((to, from, next) => {
  if (from.name === to.name) {
    next()
    return
  }

  const displayName = getPageDisplayName(to.name as string, to.params as Record<string, any>)
  showLoading(displayName)

  next()
})

router.afterEach(() => {
  setTimeout(() => {
    navigationLoading.value = false
  }, 500)
})

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

const openSettings = () => {
  settingsDialog.value = true
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
