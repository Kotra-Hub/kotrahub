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
      @change-theme-mode="changeThemeMode"
      @open-settings="openSettings"
      @navigate="navigate"
      @update:show-important-notice="updateShowImportantNotice"
    />

    <!-- Settings Dialog -->
    <Settings
      v-model="settingsDialog"
      :is-dark="isDark"
      :show-important-notice="showImportantNotice"
      @toggle-theme="toggleTheme"
      @change-theme-mode="changeThemeMode"
      @update:show-important-notice="updateShowImportantNotice"
    />

    <!-- Sidebar + Main Content -->
    <div class="page-body">

      <!-- Sidebar -->
      <Sidebar
        v-if="sidebarOpen"
        :is-open="sidebarOpen"
        :current-page="currentRouteName"
        @navigate="navigate"
      />

      <!-- Main Content -->
      <main class="content-wrapper">
        <v-container fluid class="pa-4">
          <!-- Router -->
          <router-view v-slot="{ Component }">
            <transition name="page-fade" mode="out-in" @after-enter="resetScroll">
              <component
                :is="Component"
                @navigate="navigate"
                @open-settings="openSettings"
                @open-ai="openAiAssistant"
              />
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
      ref="aiAssistantRef"
      @navigate="navigate"
      @set-dark-mode="setDarkMode"
      @set-light-mode="setLightMode"
      @toggle-theme="toggleTheme"
      @change-theme-mode="changeThemeMode"
      @logout="handleLogout"
    />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from 'vuetify'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import Footer from '@/components/Footer.vue'
import AiAssistant from '@/components/AiAssistant.vue'
import Settings from '@/components/Settings.vue'
import { useAuth } from '@/composables/useAuth'
import { AppTheme } from '@/interfaces/common.interface'
import { useImportantNotices } from '@/composables/useImportantNotices'

const theme = useTheme()
const router = useRouter()
const route = useRoute()

const resetScroll = () => {
  const selectors = [
    '.content-wrapper',
    '.v-main',
    '.v-main__wrap',
    '.v-container',
    '.page-body'
  ]

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const element = el as HTMLElement
      element.scrollTop = 0
      element.scrollLeft = 0
    })
  })

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  })
}

watch(() => route.fullPath, async () => {
  await nextTick()

  const runResetScroll = () => {
    const selectors = [
      '.content-wrapper',
      '.v-main',
      '.v-main__wrap',
      '.v-container',
      '.page-body'
    ]

    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el) => {
        const element = el as HTMLElement
        element.scrollTop = 0
        element.scrollLeft = 0
      })
    })

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    })
  }

  // run twice because transition/router-view may render after route change
  resetScroll()
  setTimeout(resetScroll, 50)
})
const { user, logout } = useAuth()
const sidebarOpen = ref(false)
const savedTheme = localStorage.getItem('kotra-appearance-mode') || 'system'
const isDark = ref(savedTheme === AppTheme.DARK)
const settingsDialog = ref(false)
const showImportantNotice = ref(true)
const { currentNotice, hasNotices, showBanner, dismissBanner } = useImportantNotices()

// Navigation loading state
const navigationLoading = ref(false)
const navigationTitle = ref('Loading...')
const navigationMessage = ref('')
let loadingTimer: ReturnType<typeof setTimeout> | null = null

const currentRouteName = computed(() => route.name as string)

// Close sidebar automatically after login redirect to dashboard
watch(
  () => route.name,
  (name) => {
    if (name === 'Dashboard') {
      sidebarOpen.value = false
    }
  }
)
const pageDisplayNames: Record<string, string> = {
  // Route names
  'Dashboard': 'Dashboard',
  'Profile Details': 'Profile',
  'Service': 'Service',
  'Recent Activities': 'Recent Activities',
  'Pending Action': 'Pending Action',
  'Quick Access': 'Quick Access',
  'Calendar Agenda': 'Calendar Agenda',
  'Phone Directory': 'Phone Directory',
  'Announcement': 'Announcement',
  'Search Page': 'Search Page',

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
  'recent-activities': { name: 'Recent Activities' },
  pending: { name: 'Pending Action' },
  quickaccess: { name: 'Quick Access' },
  calendar: { name: 'Calendar Agenda' },
  phonedirectory: { name: 'Phone Directory' },
  announcements: { name: 'Announcement' },
  search: { name: 'Search Page' },
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
  // Always show overlay immediately during navigation
  if (loadingTimer) clearTimeout(loadingTimer)
  navigationLoading.value = true
}

// MainPage.vue
const resetPageScroll = async () => {
  await nextTick()

  const containers = [
    '.content-wrapper',
    '.page-body',
    '.v-main',
    '.v-application__wrap'
  ]

  containers.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      ;(el as HTMLElement).scrollTop = 0
    })
  })

  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
}

watch(
  () => route.fullPath,
  async () => {
    await resetPageScroll()
  }
)

const navigate = async (page: string, query?: string) => {
  const routeConfig = routeMap[page]
  const payload = {
    name: routeConfig?.name ?? page,
    params: routeConfig?.params,
    query: query ? { q: query } : undefined
  }

  await router.push(payload)

  if (window.innerWidth < 600) sidebarOpen.value = false
}

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

// Theme functions// Theme functions
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
  // Profile menu toggle should update Appearance selection, not only runtime theme
  if (isDark.value) {
    localStorage.setItem('kotra-appearance-mode', 'light')
    setLightMode()
  } else {
    localStorage.setItem('kotra-appearance-mode', 'dark')
    setDarkMode()
  }
}


const changeThemeMode = (mode: string) => {
  localStorage.setItem('kotra-appearance-mode', mode)

  if (mode === 'dark') {
    setDarkMode()
  } else if (mode === 'light') {
    setLightMode()
  }
}

const updateShowImportantNotice = (val: boolean) => {
  showImportantNotice.value = val
}

const openSettings = () => {
  settingsDialog.value = true
}

const aiAssistantRef = ref<InstanceType<typeof AiAssistant> | null>(null)

const openAiAssistant = () => {
  aiAssistantRef.value?.openAssistant()
}

watch(user, (newUser) => {
  if (!newUser && route.name !== 'Login') {
    router.push({ name: 'Login' })
  }
})

onMounted(() => {
  if (savedTheme === 'dark') {
    theme.change(AppTheme.DARK)
  } else if (savedTheme === 'light') {
    theme.change(AppTheme.LIGHT)
  } else {
  }

  const handleResize = () => {
    if (route.name === 'Dashboard') sidebarOpen.value = false
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
  overflow-x: hidden;
  display: flex;
  width: 100%;
  align-items: stretch;
  flex: 1 1 auto;
  min-height: 0;
}

.sidebar-wrapper {
  flex: 0 0 95px;
  width: 95px;
  align-self: stretch;
  display: flex;
}

.content-wrapper {
  overflow-x: hidden;
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.content-wrapper .v-container {
  flex: 1;
  padding-left: 24px !important;
  padding-right: 24px !important;
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


/* Phone Directory email single line ellipsis */
.phone-email-ellipsis {
  display: block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
