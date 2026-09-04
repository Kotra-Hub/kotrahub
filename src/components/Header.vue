<!-- src/components/Header.vue -->
<template>
  <!-- IMPORTANT NOTICE SECTION -->
  <div v-if="importantNoticeList.length > 0 && showImportantNotice" class="important-notice-wrapper">
    <div class="important-notice-banner">
      <v-container fluid class="pa-0">
        <v-row no-gutters align="center" class="pa-1 pa-sm-2" style="min-height: 56px;">
          <!-- Bell Icon -->
          <v-col cols="auto" class="pr-2">
            <v-avatar size="32" color="white" class="bell-avatar">
              <v-icon size="18" class="bell-icon">
                mdi-bell
              </v-icon>
            </v-avatar>
          </v-col>

          <!-- Notice Content -->
          <v-col class="flex-grow-1 overflow-hidden">
            <div class="d-flex align-center ga-2">
              <v-icon size="12" color="#d97706">mdi-alert</v-icon>
              <h4 class="text-truncate font-weight-bold mb-0"
                style="font-size: 14px; line-height: 1.2; color: #071832;">
                {{ importantNoticeList[0].title }}
              </h4>
            </div>

            <div class="d-flex align-center ga-2 mt-0" style="font-size: 11px;">
              <v-icon size="10" color="#d97706">mdi-calendar</v-icon>
              <span class="text-truncate" style="color: #20314d;">
                {{ importantNoticeList[0].fullDate || importantNoticeList[0].date }}
              </span>
              <span style="color: #20314d;">•</span>
              <v-btn variant="text" color="#d97706" size="x-small" class="font-weight-bold px-0"
                style="font-size: 11px; min-width: auto;"
                @click="activeNoticeId = importantNoticeList[0].id; noticeModalOpen = true">
                Read more
              </v-btn>
            </div>
          </v-col>

          <!-- Right Actions -->
          <v-col cols="auto" class="d-flex align-center ga-2">
            <v-chip color="#d97706" size="x-small" class="font-weight-bold text-uppercase"
              style="font-size: 8px; height: 18px;">
              NEW
            </v-chip>
            <v-btn icon size="x-small" @click="showImportantNotice = false" class="close-btn-3d">
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
            <span class="wordmark hidden-sm-and-down">
              <span class="wordmark-kotra" :style="{ color: themeColors.kotraText }">KOTRA</span>
              <span class="wordmark-hub" :style="{ color: themeColors.hubText }">HUB</span>
            </span>
          </div>
        </a>
      </div>

      <!-- CENTER SECTION - Search Bar -->
      <div ref="searchActivator" class="search-container hidden-md-and-down">
        <v-text-field v-model="searchQuery" placeholder="Search apps, services, actions..." density="compact"
          variant="outlined" rounded="lg" prepend-inner-icon="mdi-magnify" hide-details class="search-field"
          @focus="searchOpen = true" @input="searchOpen = true" @blur="handleBlur" @keydown.ctrl.k.prevent="focusSearch"
          :color="themeColors.primary">
          <template #append-inner>
            <kbd class="text-caption font-weight-medium" :style="kbdStyle">Ctrl+K</kbd>
          </template>
        </v-text-field>

        <!-- Search Dropdown -->
        <v-menu v-model="searchOpen" :activator="searchActivator" location="bottom" offset="4" min-width="400"
          max-width="480">
          <v-card rounded="xl" elevation="12" class="mt-1 dropdown-card">
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
                <v-btn variant="text" :color="themeColors.primary" block size="small" @click="openFullSearch"
                  class="font-weight-semibold" style="font-size: 12px;">
                  <v-icon size="14" class="mr-1">mdi-magnify</v-icon>
                  View all results in Services →
                </v-btn>
              </div>
            </template>
          </v-card>
        </v-menu>
      </div>

      <!-- RIGHT SECTION -->
      <div class="d-flex align-center flex-shrink-0 action-cluster" style="gap: 18px;">

        <!-- Mobile Search -->
        <v-btn icon variant="text" class="action-btn d-md-none" @click="$emit('open-drawer')">
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
                Mark all read
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

                <v-list-item @click="$emit('open-settings')" class="cursor-pointer menu-item">
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'

// PROPS & EMITS
const props = defineProps<{
  user: { name: string; email: string; role: string }
  isDark: boolean
}>()

const emit = defineEmits<{
  (e: 'logout'): void
  (e: 'toggle-sidebar'): void
  (e: 'toggle-theme'): void
  (e: 'open-drawer'): void
  (e: 'open-settings'): void
  (e: 'navigate', page: string): void
}>()

// THEME
const theme = useTheme()
const themeColors = computed(() => theme.current.value.colors)
const toggleTheme = () => { emit('toggle-theme') }

// MENU ACTIVATORS
const searchActivator = ref<HTMLElement>()

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

const searchItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'mdi-view-dashboard', meta: 'Home page', category: 'Navigation' },
  { id: 'tasks', label: 'My Tasks', icon: 'mdi-check-all', meta: 'Tasks and to-dos', category: 'Navigation' },
  { id: 'calendar', label: 'Calendar', icon: 'mdi-calendar', meta: 'View schedule', category: 'Navigation' },
  { id: 'hr', label: 'HR Portal', icon: 'mdi-account-group', meta: 'Human Resources', category: 'Modules' },
  { id: 'it', label: 'IT Portal', icon: 'mdi-laptop', meta: 'Information Technology', category: 'Modules' },
]

const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return []
  return searchItems.filter(item =>
    item.label.toLowerCase().includes(query) ||
    item.meta.toLowerCase().includes(query)
  )
})

const groupedSearchResults = computed(() => {
  const groups: Record<string, any[]> = {}
  searchResults.value.forEach(item => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  })
  return groups
})

const handleBlur = () => { setTimeout(() => { searchOpen.value = false }, 200) }

const focusSearch = () => {
  const input = document.querySelector('.search-field input') as HTMLInputElement
  if (input) { input.focus(); input.select() }
}

const selectSearchResult = (item: any) => {
  searchQuery.value = ''
  searchOpen.value = false
  emit('navigate', item.id)
}

const openFullSearch = () => {
  searchQuery.value = ''
  searchOpen.value = false
  emit('navigate', 'all-services')
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
    signoff: "<em>Best regards,</em><br><br><strong>Idzni</strong><br>Associate Infrastructure Engineer (IT)<br>KOTRA PHARMA (M) Sdn Bhd",
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

const showImportantNotice = ref(true)
const activeNoticeId = ref('')
const noticeModalOpen = ref(false)

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
</script>

<style scoped>
/* IMPORTANT NOTICE */
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

/* HEADER */
.header-bar {
  width: 100%;
  height: 64px;
  margin: 0;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid var(--border-color);
  box-sizing: border-box;
}

/* 3D CLOSE BUTTON */
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

/* MENU BUTTON */
.menu-btn {
  width: 36px !important;
  height: 36px !important;
  min-width: 36px !important;
  border-radius: 12px !important;
  color: var(--light-text) !important;
  transition: background 0.15s ease, color 0.15s ease;
}

.menu-btn:hover {
  background: var(--gray100) !important;
  color: var(--primary) !important;
}

@media (min-width: 768px) {
  .menu-btn {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
  }
}

/* LOGO */
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

/* SEARCH */
.search-container {
  flex: 1;
  max-width: 576px;
  margin: 0 24px;
  position: relative;
}

.search-field {
  width: 100%;
}

.search-field :deep(.v-field__input) {
  font-size: 14px;
  padding: 8px 16px;
}

.search-field :deep(.v-field__outline) {
  border-color: var(--border-color);
}

.search-field :deep(.v-field--focused .v-field__outline) {
  border-color: var(--primary);
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

/* NOTIFICATION BADGE */
.notification-badge :deep(.v-badge__badge) {
  font-size: 9px !important;
  min-width: 17px !important;
  height: 17px !important;
  font-weight: 700 !important;
  box-shadow: 0 0 0 2px var(--surface);
}

/* DROPDOWN CARDS */
.dropdown-card {
  border: 1px solid var(--border-light);
  overflow: hidden;
}

.notification-card {
  width: 100%;
}

/* NOTIFICATION ITEMS */
.notif-item {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
  transition: background 0.12s ease;
}

.notif-item:hover {
  background: var(--bg-light) !important;
}

.notif-item--unread {
  background: var(--primary-bg);
}

.unread-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary);
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
  border: 2px solid var(--surface);
}

.status-dot {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid var(--surface);
}

.chevron {
  transition: transform 0.15s ease;
}

.chevron--open {
  transform: rotate(180deg);
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
  background: var(--lighterror);
}

/* SEARCH RESULTS */
.result-item {
  transition: background 0.12s ease;
}

.result-item:hover {
  background: var(--bg-light);
}

.border-bottom {
  border-bottom: 1px solid var(--border-light);
}

/* RESPONSIVE BREAKPOINTS */
@media (max-width: 600px) {
  .hidden-sm-and-down {
    display: none !important;
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
