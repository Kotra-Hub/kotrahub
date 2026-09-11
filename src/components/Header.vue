<!-- src/components/Header.vue -->
<template>
  <!-- IMPORTANT NOTICE SECTION -->
  <div v-if="importantNoticeList.length > 0 && showImportantNotice" class="important-notice-wrapper">
    <div class="important-notice-banner">
      <v-container fluid class="pa-0">
        <v-row no-gutters align="center" class="pa-3 pa-sm-4" style="min-height: 86px;">
          <!-- Bell Icon -->
          <v-col cols="auto" class="pr-2">
            <v-avatar size="46" color="white" class="bell-avatar">
              <v-icon size="22" class="bell-icon">
                mdi-bell
              </v-icon>
            </v-avatar>
          </v-col>

          <!-- Notice Content -->
          <v-col class="flex-grow-1 overflow-hidden">
            <div class="d-flex align-center ga-2">
              <v-icon size="12" color="#d97706">mdi-alert</v-icon>
              <h4 class="text-truncate font-weight-bold mb-0"
                style="font-size: 16px; line-height: 1.3; color: #071832;">
                {{ importantNoticeList[0].title }}
              </h4>
            </div>

            <div class="d-flex align-center ga-2 mt-0" style="font-size: 13px;">
              <v-icon size="10" color="#d97706">mdi-calendar</v-icon>
              <span class="text-truncate" style="color: #20314d;">
                {{ importantNoticeList[0].fullDate || importantNoticeList[0].date }}
              </span>
              <span style="color: #20314d;">•</span>
              <v-btn variant="text" color="#d97706" size="x-small" class="font-weight-bold px-0"
                style="font-size: 13px; min-width: auto;"
                @click="activeNoticeId = importantNoticeList[0].id; noticeModalOpen = true">
                Tap to Read more
              </v-btn>
            </div>
          </v-col>

          <!-- Right Actions -->
          <v-col cols="auto" class="d-flex align-center ga-2">
            <v-chip color="#d97706" size="x-small" class="font-weight-bold text-uppercase"
              style="font-size: 11px; height: 24px; padding:0 12px;">
              NEW
            </v-chip>
            <v-btn icon size="small" @click="showImportantNotice = false" class="close-btn-3d">
              <v-icon size="14">mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>

  <!-- HEADER SECTION -->
  <div class="header-bar" :style="{
    height: '64px',
    backgroundColor: themeColors.surface,
    borderBottom: '1px solid var(--border-color)'
  }">

    <!-- Header Content Wrapper -->
    <div class="d-flex align-center justify-space-between w-100 px-3 px-md-6" style="height: 100%;">

      <!-- LEFT SECTION -->
      <div class="d-flex align-center gap-1 flex-shrink-0">
        <v-btn icon variant="text" class="menu-btn" @click="$emit('toggle-sidebar')">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <a href="#" @click.prevent="$emit('navigate', 'dashboard')" class="text-decoration-none"
          style="margin-left: 15px;">
          <div class="d-flex align-center" style="gap: 8px; padding: 4px 6px; border-radius: 12px;">
            <div class="logo-wrapper">
              <img src="@/assets/images/kotra.png" alt="Kotra" class="logo-image" />
            </div>
            <span class="wordmark">
              <span class="wordmark-kotra" :style="{ color: themeColors.kotraText }">KOTRA</span>
              <span class="wordmark-hub" :style="{ color: themeColors.hubText }">HUB</span>
            </span>
          </div>
        </a>
      </div>

      <!-- CENTER SECTION - Search Bar -->
      <div class="search-container hidden-md-and-down" ref="searchContainerRef">
        <v-text-field
          ref="searchInputRef"
          v-model="searchQuery"
          placeholder="Search apps, services, actions..."
          density="compact"
          variant="outlined"
          rounded="lg"
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="search-field"
          :color="themeColors.primary"
          @focus="searchOpen = true"
          @keydown.esc="closeSearch"
        >
          <template #append-inner>
            <kbd class="text-caption font-weight-medium" :style="kbdStyle">Ctrl+K</kbd>
          </template>
        </v-text-field>

        <v-card
          v-if="searchOpen"
          rounded="sm"
          elevation="0"
          class="mt-1 dropdown-card search-dropdown"
          style="border: 2px solid #e2e8f0; border-radius: 12px !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;"
        >
          <div v-if="searchResults.length === 0" class="text-center py-6 text-grey">
            <v-icon size="32" class="mb-2 opacity-50">mdi-magnify</v-icon>
            <p class="text-body-2">No services found for "{{ searchQuery }}"</p>
          </div>

          <template v-else>
            <v-list>
              <template v-for="(items, category) in groupedSearchResults" :key="category">
                <v-list-subheader class="text-caption font-weight-bold text-grey"
                  style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                  {{ category }}
                </v-list-subheader>
                <v-list-item v-for="item in items" :key="item.id" @click="selectSearchResult(item)"
                  class="cursor-pointer result-item">
                  <template #prepend>
                    <v-avatar size="32" rounded="8" :color="themeColors.primaryBg">
                      <v-icon size="16" :color="themeColors.primary">{{ item.icon }}</v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-body-2 font-weight-semibold">{{ item.label }}</v-list-item-title>
                  <v-list-item-subtitle class="text-caption text-grey">{{ item.meta }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-list>

            <div class="pa-2 border-t" :style="searchFooterStyle">
              <v-btn variant="text" :color="themeColors.primary" block size="small"
                @click="openFullSearch" class="font-weight-semibold" style="font-size: 12px;">
                <v-icon size="14" class="mr-1">mdi-magnify</v-icon>
                View All Results
                <v-icon size="14" class="ml-1">mdi-arrow-right</v-icon>
              </v-btn>
            </div>
          </template>
        </v-card>
      </div>

      <!-- RIGHT SECTION -->
      <div class="d-flex align-center flex-shrink-0 action-cluster" style="gap: 18px;">

        <!-- Mobile Search -->
        <v-btn icon variant="text" class="action-btn d-md-none" @click="mobileSearchOpen = true">
          <v-icon size="20">mdi-magnify</v-icon>
        </v-btn>

        <!-- Notifications -->
        <v-menu v-model="notificationOpen" location="bottom end" offset="12" min-width="336" max-width="360">
          <template #activator="{ props: menuProps }">
            <v-btn v-bind="menuProps" icon variant="text"
              :class="['action-btn', 'notification-btn', { 'action-btn--active': notificationOpen }]">
              <v-icon size="20">{{ unreadNotifications > 0 ? 'mdi-bell' : 'mdi-bell-outline' }}</v-icon>
              <v-badge v-if="unreadNotifications > 0" :color="themeColors.error"
                :content="unreadNotifications > 99 ? '99+' : unreadNotifications" floating size="small"
                class="notification-badge" />
            </v-btn>
          </template>

          <v-card rounded="xl" elevation="12" class="dropdown-card notification-card">
            <div class="d-flex align-center justify-space-between px-4 py-3">
              <div>
                <span class="text-subtitle-1 font-weight-bold"
                  :style="{ color: themeColors.darkText }">Notifications</span>
                <div class="text-caption text-grey">
                  <template v-if="unreadNotifications > 0">{{ unreadNotifications }} unread</template>
                  <template v-else>You're all caught up</template>
                </div>
              </div>
              <v-btn v-if="unreadNotifications > 0" size="small" variant="tonal" :color="themeColors.primary" @click=""
                class="text-caption font-weight-semibold" style="text-transform: none;">
                Mark all as read
              </v-btn>
            </div>
            <v-divider />
            <div class="notification-list" style="max-height: 360px; overflow-y: auto;">
              <v-list v-if="notifications.length > 0" class="py-1">
                <v-list-item v-for="(notif, index) in notifications" :key="index" @click="notif.read = true"
                  class="cursor-pointer notif-item" :class="{ 'notif-item--unread': !notif.read }">
                  <template #prepend>
                    <v-avatar size="36" rounded="lg"
                      :color="notif.read ? themeColors.bgGrey : themeColors.primaryLight">
                      <v-icon size="18" :color="notif.read ? themeColors.textLight : themeColors.primary">
                        {{ notificationIcon(notif) }}
                      </v-icon>
                    </v-avatar>
                  </template>
                  <v-list-item-title class="text-body-2 font-weight-semibold"
                    :style="{ color: themeColors.textSecondary }">
                    {{ notif.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="text-caption text-grey mt-1">{{ notif.time }}</v-list-item-subtitle>
                  <template #append>
                    <span v-if="!notif.read" class="unread-dot" />
                  </template>
                </v-list-item>
              </v-list>
              <div v-else class="text-center py-8 text-grey">
                <v-icon size="32" class="mb-2 opacity-50">mdi-bell-off-outline</v-icon>
                <p class="text-body-2">No notifications</p>
              </div>
            </div>
          </v-card>
        </v-menu>

        <!-- Profile Section -->
        <div v-if="user">
          <v-menu v-model="profileOpen" location="bottom end" offset="10" min-width="240">
            <template #activator="{ props: menuProps }">
              <v-btn v-bind="menuProps" variant="text" :class="['profile-btn', { 'profile-btn--active': profileOpen }]">
                <div class="d-flex align-center" style="gap: 8px;">
                  <div class="avatar-ring" :style="{ background: themeColors.primaryGradient }">
                    <v-avatar :color="themeColors.primary" class="text-white font-weight-bold" style="font-size: 11px;">
                      {{ userInitials }}
                    </v-avatar>
                    <span class="status-dot" :style="{ background: themeColors.success }" />
                  </div>
                  <div class="hidden-sm-and-down"
                    style="line-height: 1.1; display: flex; flex-direction: column; justify-content: center; text-align: left;">
                    <span class="font-weight-semibold"
                      :style="{ color: themeColors.darkText, fontSize: '12px', lineHeight: '1.2', whiteSpace: 'nowrap' }">
                      {{ user.name }}
                    </span>
                    <span
                      :style="{ color: themeColors.textLight, fontSize: '9px', lineHeight: '1.2', whiteSpace: 'nowrap' }">
                      {{ user.role }}
                    </span>
                  </div>
                  <v-icon size="14" :color="themeColors.textLight" class="hidden-sm-and-down chevron"
                    :class="{ 'chevron--open': profileOpen }">mdi-chevron-down</v-icon>
                </div>
              </v-btn>
            </template>

            <v-card rounded="xl" elevation="12" class="py-1 dropdown-card profile-card">
              <div class="profile-card-header" :style="profileHeaderStyle">
                <v-avatar :color="themeColors.primary" class="text-white font-weight-bold" style="font-size: 15px;">
                  {{ userInitials }}
                </v-avatar>
                <div>
                  <p class="text-body-2 font-weight-bold mb-0" :style="{ color: themeColors.darkText }">{{ user.name }}
                  </p>
                  <p class="text-caption mb-0" :style="{ color: themeColors.textLight }">{{ user.email }}</p>
                </div>
              </div>

              <v-list class="py-1">
                <v-list-item @click="$emit('navigate', 'profile')" class="cursor-pointer menu-item">
                  <template #prepend>
                    <v-icon :color="themeColors.primary" size="18">mdi-account</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">Profile</v-list-item-title>
                </v-list-item>

                <v-list-item @click="toggleTheme" class="cursor-pointer menu-item">
                  <template #prepend>
                    <v-icon :color="themeColors.primary" size="18">mdi-theme-light-dark</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">
                    {{ isDark ? 'Light Mode' : 'Dark Mode' }}
                  </v-list-item-title>
                </v-list-item>

                <v-list-item  @click="$emit('navigate', 'settings')" class="cursor-pointer menu-item">
                  <template #prepend>
                    <v-icon :color="themeColors.primary" size="18">mdi-cog</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2">Settings</v-list-item-title>
                </v-list-item>

                <v-divider class="my-1" />

                <v-list-item @click="handleLogout" class="cursor-pointer menu-item menu-item--danger">
                  <template #prepend>
                    <v-icon :color="themeColors.error" size="18">mdi-logout</v-icon>
                  </template>
                  <v-list-item-title class="text-body-2 font-weight-semibold">Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
    </div>
  </div>

  <!-- DIALOG POPUP SECTON -->
  <DialogPopup
    v-model="noticeModalOpen"
    :title="currentNotice?.title || 'Important Notice'"
    :subtitle="currentNotice?.fullDate || currentNotice?.date || ''"
    icon="mdi-bell"
    icon-color="#d97706"
    width="680"
    :show-bm="!!currentNotice?.bm"
    :warning="currentNotice?.warning || ''"
    :bm-content="bmContentHtml"
    :actions="dialogActions"
  >
    <div v-html="noticeBodyHtml"></div>
  </DialogPopup>

  <!-- Mobile Search Drawer -->
  <v-navigation-drawer
    v-model="mobileSearchOpen"
    location="top"
    temporary
    height="auto"
    class="mobile-search-drawer"
  >
    <div class="mobile-search-content">
      <v-text-field
        v-model="searchQuery"
        placeholder="Search apps, services, actions..."
        variant="outlined"
        rounded="lg"
        prepend-inner-icon="mdi-magnify"
        hide-details
        autofocus
        @input="searchOpen = true"
        @keydown.esc="closeMobileSearch"
        :color="themeColors.primary"
        class="flex-shrink-0"
      >
        <template #append-inner>
          <v-btn icon size="small" @click="closeMobileSearch" class="mobile-close-btn">
            <v-icon size="18">mdi-close</v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <!-- Scrollable results container -->
      <div class="mt-2 mobile-results">
        <div v-if="searchResults.length > 0">
          <div v-if="!searchQuery" class="pa-2">
            <div class="text-caption font-weight-bold text-grey quick-access-label">
              Quick Access
            </div>
          </div>

          <v-list>
            <template v-for="(items, category) in groupedSearchResults" :key="category">
              <v-list-subheader class="text-caption font-weight-bold text-grey category-label">
                {{ category }}
              </v-list-subheader>
              <v-list-item v-for="item in items" :key="item.id" @click="selectSearchResult(item)" class="mobile-result-item">
                <template #prepend>
                  <v-avatar size="32" rounded="8" :color="themeColors.primaryBg">
                    <v-icon size="16" :color="themeColors.primary">{{ item.icon }}</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title :style="{ color: themeColors.darkText }">{{ item.label }}</v-list-item-title>
                <v-list-item-subtitle :style="{ color: themeColors.textLight }">{{ item.meta }}</v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-list>

          <!-- View All Results Button -->
          <div class="pa-2 border-top" :style="searchFooterStyle">
            <v-btn
              variant="text"
              :color="themeColors.primary"
              block
              size="small"
              @click="openFullSearch"
              class="font-weight-semibold view-all-btn"
              style="font-size: 12px;"
            >
              <v-icon size="14" class="mr-1">mdi-magnify</v-icon>
              View All Results
            </v-btn>
          </div>
        </div>

        <div v-else-if="searchQuery && searchResults.length === 0" class="text-center py-6 text-grey no-results">
          <v-icon size="32" class="mb-2 opacity-50">mdi-magnify</v-icon>
          <p class="text-body-2">No services found for "{{ searchQuery }}"</p>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from 'vuetify'
import DialogPopup from '@/components/DialogPopup.vue'
import { getTopResults, type SearchItem } from '@/composables/useSearchData'

// PROPS & EMITS
const props = defineProps<{
  user: { name: string; email: string; role: string }
  isDark: boolean
  showImportantNotice?: boolean
}>()

const emit = defineEmits<{
  (e: 'logout'): void
  (e: 'toggle-sidebar'): void
  (e: 'toggle-theme'): void
  (e: 'open-settings'): void
  (e: 'open-ai'): void
  (e: 'navigate', page: string): void
  (e: 'navigate', page: string, query?: string): void
  (e: 'update:show-important-notice', value: boolean): void
}>()

// THEME
const theme = useTheme()
const themeColors = computed(() => theme.current.value.colors)
const toggleTheme = () => { emit('toggle-theme') }

// MENU ACTIVATORS
const mobileSearchOpen = ref(false)

// USER DATA
const userInitials = computed(() => {
  if (!props.user) return ''
  return props.user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
})

// NOTIFICATIONS
const notifications = ref([
  { title: 'System Maintenance / Security Alert', time: 'Today, 12:00 PM', read: false, type: 'alert' },
  { title: 'Annual leave application submitted', time: 'Today, 11:45 AM', read: false, type: 'leave' },
  { title: 'Leave application approved', time: 'Today, 10:20 AM', read: true, type: 'success' },
  { title: 'New employee record created', time: 'Yesterday, 3:00 PM', read: true, type: 'hr' }
])

const unreadNotifications = computed(() => notifications.value.filter(n => !n.read).length)

const notificationIcon = (notif: { type?: string }) => {
  switch (notif.type) {
    case 'alert': return 'mdi-alert-circle-outline'
    case 'leave': return 'mdi-calendar-clock-outline'
    case 'success': return 'mdi-check-circle-outline'
    case 'hr': return 'mdi-account-plus-outline'
    default: return 'mdi-bell-outline'
  }
}

const notificationOpen = ref(false)
const profileOpen = ref(false)

// SEARCH
const searchQuery = ref('')
const searchOpen = ref(false)

const closeMobileSearch = () => {
  mobileSearchOpen.value = false
  searchQuery.value = ''
  searchOpen.value = false
}

const searchResults = computed<SearchItem[]>(() => {
  return getTopResults(searchQuery.value, 5)
})

const groupedSearchResults = computed(() => {
  const groups: Record<string, any[]> = {}
  searchResults.value.forEach(item => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  })
  return groups
})

const searchInputRef = ref<any>(null)

const closeSearch = () => {
  searchOpen.value = false
  searchInputRef.value?.blur()
}

const selectSearchResult = (item: SearchItem) => {
  searchQuery.value = ''
  searchOpen.value = false
  mobileSearchOpen.value = false

  if (item.id === 'settings') {
    emit('open-settings')
    return
  }
  if (item.id === 'ai-assistant') {
    emit('open-ai')
    return
  }

  emit('navigate', item.id)
}

const openFullSearch = () => {
  const query = searchQuery.value
  searchQuery.value = ''
  searchOpen.value = false
  mobileSearchOpen.value = false
  emit('navigate', 'search', query)
}
// IMPORTANT NOTICE
const importantNoticeList = ref([
  {
    id: "important-1",
    title: "Ad Hoc Preventive System Downtime",
    date: "15-16 Aug 2026",
    fullDate: "Saturday, 15 August 2026",
    type: "important",
    body: [
      "Please be informed that an ad hoc preventive system downtime will be carried out on <strong>Saturday, 15 August 2026, starting at 10:00PM</strong>. This activity is a precautionary measure following the server issue experienced earlier this week.",
      "The following systems will be temporarily unavailable:",
      '<ul class="list-disc pl-6 mt-2 space-y-1"><li><strong>E-Service</strong></li><li><strong>Kotra File Server</strong></li><li><strong>SAP</strong></li><li><strong>SIS</strong></li></ul>',
      "Services are expected to be restored by <strong>Sunday 10:00PM, 16 August 2026</strong>. An update will be provided once all systems are confirmed operational. We apologize for the short notice and any inconvenience caused.",
      "Thank you for your understanding.",
    ],
    warning: "Employees are advised not to perform critical transactions during the maintenance window. If you experience access issues after the maintenance period, please contact the relevant support team.",
    signoff: "<em>Best regards,</em><br><strong>Idzni</strong><br>Associate Infrastructure Engineer (IT)<br>KOTRA PHARMA (M) Sdn Bhd",
    bm: {
      title: "Notis Gangguan Sistem Pencegahan Ad Hoc",
      body: [
        "Dimaklumkan bahawa kerja gangguan sistem pencegahan ad hoc akan dijalankan pada <strong>Sabtu, 15 Ogos 2026, bermula jam 10:00 malam</strong>.",
        "Sepanjang tempoh ini, beberapa perkhidmatan portal mungkin tidak dapat diakses buat sementara waktu. Sila simpan kerja anda sebelum aktiviti penyelenggaraan bermula.",
        "Sekiranya terdapat masalah akses selepas penyelenggaraan selesai, sila hubungi pasukan sokongan yang berkaitan."
      ]
    },
  }
])

const activeNoticeId = ref('')
const noticeModalOpen = ref(false)

const showImportantNotice = computed({
  get: () => props.showImportantNotice ?? true,
  set: (val) => emit('update:show-important-notice', val)
})

// DIALOG
const currentNotice = computed(() => {
  return importantNoticeList.value.find(n => n.id === activeNoticeId.value) || importantNoticeList.value[0]
})

const noticeBodyHtml = computed(() => {
  const notice = currentNotice.value
  if (!notice) return ''

  let html = notice.body.map((item) => {
    if (item.includes('<ul')) {
      return item
    }
    return `<p>${item}</p>`
  }).join('')

  if (notice.signoff) {
    html += `<div class="mt-4 pt-4 border-t" style="border-color: ${themeColors.value.border}; font-style: italic; color: ${themeColors.value.textMuted};">${notice.signoff}</div>`
  }

  return html
})

const bmContentHtml = computed(() => {
  const notice = currentNotice.value
  if (!notice?.bm) return ''

  const bmBody = notice.bm.body.map(item => `<p>${item}</p>`).join('')
  return `<p class="mb-2 font-bold" style="color: ${themeColors.value.darkText};">${notice.bm.title}</p>${bmBody}`
})

// Dialog Actions
const dialogActions = computed(() => [])


// LOGOUT
const handleLogout = () => {
  profileOpen.value = false
  emit('logout')
}

// COMPUTED STYLES
const kbdStyle = computed(() => ({
  color: themeColors.value.textMuted,
  background: themeColors.value.bgGrey,
  padding: '2px 8px',
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 500,
  fontFamily: 'monospace'
}))

const searchFooterStyle = computed(() => ({
  background: themeColors.value.bgLight,
  borderRadius: '0 0 12px 12px'
}))

const profileHeaderStyle = computed(() => ({
  borderBottom: `1px solid ${themeColors.value.borderLight}`,
  background: `linear-gradient(180deg, ${themeColors.value.primaryBg} 0%, ${themeColors.value.surface} 100%)`
}))

const searchContainerRef = ref<HTMLElement | null>(null)

const handleGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    searchOpen.value = true
    searchInputRef.value?.focus()
  }
}

const handleClickOutside = (e: MouseEvent) => {
  if (
    searchOpen.value &&
    searchContainerRef.value &&
    !searchContainerRef.value.contains(e.target as Node)
  ) {
    searchOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.important-notice-wrapper {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
  width: 100%;
  z-index: auto;
  background: #fef7e8;
  border-bottom: 1px solid #fde3b8;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.important-notice-banner {
  width: 100%;
  background: #fef7e8;
}

.header-bar {
  width: 100%;
  height: 64px;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
}

.close-btn-3d {
  width: 24px !important;
  height: 24px !important;
  min-width: 24px !important;
  background: #fde3b8 !important;
  color: #92400e !important;
  border: none !important;
  border-radius: 6px !important;
  box-shadow:
    0 2px 0 #d97706,
    0 3px 6px rgba(0, 0, 0, 0.08) !important;
  transition: all 0.08s ease !important;
}

.close-btn-3d:hover {
  transform: translateY(1px);
  box-shadow:
    0 1px 0 #d97706,
    0 2px 4px rgba(0, 0, 0, 0.08) !important;
  background: #fddba8 !important;
}

.close-btn-3d:active {
  transform: translateY(2px);
  box-shadow:
    0 0px 0 #d97706,
    0 1px 2px rgba(0, 0, 0, 0.06) !important;
}

.close-btn-3d :deep(.v-btn__content) {
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-btn {
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  border-radius: 12px !important;
  color: rgb(var(--light-text)) !important;
  transition: background 0.15s ease, color 0.15s ease;
}

.menu-btn:hover {
  background: rgb(var(--gray100)) !important;
  color: var(--primary) !important;
}

@media (min-width: 768px) {
  .menu-btn {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
  }
}

.logo-wrapper {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .logo-wrapper {
    width: 36px;
    height: 36px;
  }
}

.logo-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wordmark {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-family: "Inter", system-ui, sans-serif;
  font-weight: 800;
  letter-spacing: -0.8px;
  line-height: 0.92;
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 24px;
}

@media (max-width: 639px) {
  .wordmark {
    font-size: 21px;
  }
}

.search-container {
  flex: 1;
  max-width: 576px;
  margin: 0 24px;
  position: relative;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 50;
}

.search-field {
  width: 100%;
}

.search-field :deep(.v-field__input) {
  font-size: 14px;
  padding: 8px 16px;
}

.search-field :deep(.v-field__outline) {
  border-color: rgb(var(--border-color));
}

.search-field :deep(.v-field--focused .v-field__outline) {
  border-color: rgb(var(--primary));
}

/* ACTION BUTTONS */
.action-btn {
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  background: transparent !important;
  color: var(--text-muted) !important;
  transition: color 0.15s ease, transform 0.1s ease;
}

.action-btn:hover {
  background: transparent !important;
  color: var(--primary) !important;
}

.action-btn:active {
  transform: scale(0.92);
}

.action-btn--active {
  background: transparent !important;
  color: var(--primary) !important;
}

@media (min-width: 768px) {
  .action-btn {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
  }
}

.notification-badge :deep(.v-badge__badge) {
  font-size: 9px !important;
  min-width: 17px !important;
  height: 17px !important;
  font-weight: 700 !important;
  box-shadow: 0 0 0 2px rgb(var(--surface));
}

.dropdown-card {
  border: 1px solid rgb(var(--border-light));
  overflow: hidden;
}

.notification-card {
  width: 100%;
}

.notif-item {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  transition: background 0.12s ease;
}

.notif-item:hover {
  background: rgb(var(--bg-light)) !important;
}

.notif-item--unread {
  background: rgb(var(--primary-bg));
}

.unread-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgb(var(--primary));
  display: inline-block;
  margin-top: 6px;
}

/* PROFILE BUTTON */
.profile-btn {
  border-radius: 100px !important;
  padding: 3px 10px 3px 3px !important;
  min-height: 36px !important;
  height: 36px !important;
  background: transparent !important;
  transition: opacity 0.15s ease;
}

.profile-btn:hover,
.profile-btn--active {
  background: transparent !important;
  opacity: 0.85;
}

.profile-btn :deep(.v-btn__content) {
  gap: 0 !important;
}

.avatar-ring {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-ring .v-avatar {
  width: 28px !important;
  height: 28px !important;
  min-width: 28px !important;
  border: 2px solid rgb(var(--surface));
}

.status-dot {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid rgb(var(--surface));
}

.chevron {
  transition: transform 0.15s ease;
}

.chevron--open {
  transform: rotate(180deg);
}

.important-notice-wrapper {
  background: #fff8ed;
}

.important-notice-banner {
  min-height: 86px;
  background: #fff8ed;
  border-bottom: 1px solid #f59e0b;
}

.close-btn-3d {
  background: #ffffff !important;
  border: 1px solid #f59e0b !important;
  border-radius: 8px !important;
}

.bell-avatar {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.12),
    0 4px 8px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}

.bell-icon {
  color: #fff;
  -webkit-text-stroke: 1.5px #d97706;
}

/* PROFILE CARD */
.profile-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px 12px;
}

.menu-item {
  margin: 0 6px;
  border-radius: 10px;
  min-height: 38px !important;
  transition: background 0.12s ease;
}

.menu-item:hover {
  background: var(--primary-hover);
}

.menu-item--danger:hover {
  background: rgb(var(--lighterror));
}

.result-item {
  transition: background 0.12s ease;
}

.result-item:hover {
  background: var(--bg-light);
}

.border-bottom {
  border-bottom: 1px solid rgb(var(--border-light));
}

.mobile-search-drawer {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: auto !important;
  max-height: 90vh !important;
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 0 0 16px 16px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
  overflow: hidden !important;
  z-index: 9999 !important;
}

.mobile-search-drawer .v-navigation-drawer__content {
  overflow: visible !important;
  padding: 20px !important;
  background: rgb(var(--v-theme-surface)) !important;
}

.mobile-search-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgb(var(--v-theme-surface)) !important;
}

.mobile-results {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  max-height: calc(80vh - 80px);
  background: rgb(var(--v-theme-surface)) !important;
}

.mobile-search-drawer .v-field {
  background: rgb(var(--bg-light)) !important;
  border-radius: 12px !important;
}

.mobile-search-drawer .v-field__input {
  color: rgb(var(--dark-text)) !important;
}

.mobile-search-drawer .v-field__input::placeholder {
  color: rgb(var(--text-muted)) !important;
}

.mobile-close-btn {
  color: rgb(var(--text-muted)) !important;
}

.mobile-close-btn:hover {
  color: rgb(var(--dark-text)) !important;
}

/* Mobile search results */
.mobile-result-item {
  border-radius: 8px !important;
  transition: background 0.12s ease !important;
}

.mobile-result-item:hover {
  background: rgb(var(--bg-hover)) !important;
}

.mobile-result-item .v-list-item-title {
  color: rgb(var(--dark-text)) !important;
}

.mobile-result-item .v-list-item-subtitle {
  color: rgb(var(--text-muted)) !important;
}

.quick-access-label {
  color: rgb(var(--text-muted)) !important;
}

.category-label {
  color: rgb(var(--text-muted)) !important;
}

.no-results {
  color: rgb(var(--text-muted)) !important;
}

.mobile-search-drawer.v-navigation-drawer--temporary {
  transform: translateY(0) !important;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.mobile-search-drawer.v-navigation-drawer--temporary:not(.v-navigation-drawer--active) {
  transform: translateY(-100%) !important;
}

.mobile-search-drawer .v-field__append-inner {
  display: flex !important;
  align-items: center !important;
}

.mobile-search-drawer .v-overlay {
  display: none !important;
}

/* Mobile search list items */
.mobile-search-drawer .v-list {
  background: transparent !important;
}

.mobile-search-drawer .v-list-item {
  background: transparent !important;
}

.mobile-search-drawer .v-list-item:hover {
  background: rgb(var(--bg-hover)) !important;
}

.mobile-search-drawer .v-list-subheader {
  background: transparent !important;
}

.view-all-btn {
  border-radius: 8px !important;
  transition: background 0.12s ease !important;
}

.view-all-btn:hover {
  background: rgb(var(--primary-hover)) !important;
}

.border-top {
  border-top: 1px solid rgb(var(--border-light));
}

@media (max-width: 600px) {
  .hidden-sm-and-down {
    display: none !important;
  }

  .mobile-search-drawer {
    max-height: 95vh !important;
    border-radius: 0 !important;
  }

  .mobile-search-drawer .v-navigation-drawer__content {
    padding: 16px !important;
  }

  .mobile-results {
    max-height: calc(85vh - 70px) !important;
  }
}

@media (min-width: 601px) and (max-width: 960px) {
  .hidden-sm-and-down {
    display: none !important;
  }
}

@media (min-width: 961px) {
  .hidden-sm-and-down {
    display: inline-flex !important;
  }
}
</style>
