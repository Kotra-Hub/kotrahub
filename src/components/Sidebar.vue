<!-- src/components/Sidebar.vue -->
<template>
  <aside
    class="sidebar-desktop hidden md:flex flex-col shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
    :class="[
      isOpen ? 'sidebar-open' : 'sidebar-closed',
      isDark ? 'bg-surface-dark' : 'bg-surface'
    ]" :style="{
      borderRight: `1px solid ${themeColors.border}`,
      position: 'relative',
      top: '0',
    }">
    <div class="flex-1 flex flex-col items-center gap-0.5 px-0.5 overflow-y-auto sidebar-scroll">
      <!-- HR DETAIL SIDEBAR -->
      <template v-if="currentPage === 'hr'">
        <v-btn v-for="item in hrSidebarItems" :key="item.page" @click="$emit('navigate', item.page)" class="sidebar-btn"
          :class="[
            currentPage === item.page ? 'active' : '',
            isDark ? 'dark' : ''
          ]" variant="text" block>
          <div class="sidebar-btn-content" :class="[currentPage === item.page ? 'active-content' : '']">
            <v-icon :icon="item.icon" :size="20"
              :color="currentPage === item.page ? themeColors.primary : (isDark ? themeColors.textMuted : themeColors.textGrey)"
              class="sidebar-icon" />
            <span class="text-center leading-tight sidebar-label" :style="{
              fontSize: '8px',
              fontWeight: currentPage === item.page ? '600' : '500',
              color: currentPage === item.page ? themeColors.primary : (isDark ? themeColors.textMuted : themeColors.textGrey),
              lineHeight: '1.1',
              marginTop: '1px'
            }" v-html="item.label"></span>
          </div>
        </v-btn>
      </template>

      <!-- DEFAULT SIDEBAR -->
      <template v-else>
        <v-btn v-for="item in defaultSidebarItems" :key="item.page" @click="$emit('navigate', item.page)"
          class="sidebar-btn" :class="[
            currentPage === item.page ? 'active' : '',
            isDark ? 'dark' : ''
          ]" variant="text" block>
          <div class="sidebar-btn-content" :class="[currentPage === item.page ? 'active-content' : '']">
            <v-icon :icon="item.icon" :size="22"
              :color="currentPage === item.page ? themeColors.primary : (isDark ? themeColors.textMuted : themeColors.textGrey)"
              class="sidebar-icon" />
            <span class="text-center uppercase tracking-wide sidebar-label" :style="{
              fontSize: '8px',
              fontWeight: currentPage === item.page ? '600' : '500',
              color: currentPage === item.page ? themeColors.primary : (isDark ? themeColors.textMuted : themeColors.textGrey),
              lineHeight: '1.1',
              marginTop: '1px'
            }">{{ item.label }}</span>
          </div>
        </v-btn>
      </template>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const props = defineProps<{
  isOpen: boolean
  currentPage: string
}>()

const emit = defineEmits<{
  (e: 'navigate', page: string): void
}>()

// Theme
const theme = useTheme()
const isDark = computed(() => theme.global.name.value === 'DARK')
const themeColors = computed(() => theme.current.value.colors)

const defaultSidebarItems = [
  { page: 'dashboard', label: 'Home', icon: 'mdi-home' },
  { page: 'plant', label: 'Plant', icon: 'mdi-factory' },
  { page: 'sales', label: 'Sales', icon: 'mdi-chart-line' },
  { page: 'employee', label: 'Staff', icon: 'mdi-account' },
  { page: 'po', label: 'PO', icon: 'mdi-cart' },
  { page: 'requisition', label: 'Requisition', icon: 'mdi-file-document' },
  { page: 'inventory', label: 'Inventory', icon: 'mdi-package' },
]

const hrSidebarItems = [
  { page: 'hr', label: 'Dashboard', icon: 'mdi-view-dashboard' },
  { page: 'hr', label: 'HR<br>Requisition', icon: 'mdi-account-plus' },
  { page: 'hr-handbook', label: 'Employee<br>Handbook', icon: 'mdi-book-open' },
  { page: 'leave', label: 'Leave App<br>/ Gate Pass', icon: 'mdi-calendar' },
]
</script>

<style scoped>
.sidebar-desktop {
  font-family: "Inter", system-ui, sans-serif;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  flex-shrink: 0;
}

.sidebar-desktop.sidebar-open {
  width: 76px !important;
  min-width: 76px !important;
}

.sidebar-desktop.sidebar-closed {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  border: none !important;
  overflow: hidden !important;
}

.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: v-bind('themeColors.border') transparent;
}

.sidebar-scroll::-webkit-scrollbar {
  width: 2px;
}

.sidebar-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-scroll::-webkit-scrollbar-thumb {
  background: v-bind('themeColors.border');
  border-radius: 10px;
}

.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background: v-bind('themeColors.textMuted');
}

.sidebar-btn {
  text-transform: none !important;
  font-family: "Inter", system-ui, sans-serif !important;
  transition: all 0.2s ease !important;
  background: transparent !important;
  position: relative;
  cursor: pointer;
  min-height: 56px !important;
  flex-shrink: 0;
  width: 100% !important;
  padding: 2px !important;
  margin: 0 !important;
  border-radius: 0 !important;
}

.sidebar-btn-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 4px 2px;
  border-radius: 8px;
  transition: all 0.2s ease;
  min-height: 52px;
}

.sidebar-btn:not(.active) .sidebar-btn-content:hover {
  background: v-bind('themeColors.primaryBg') !important;
}

.sidebar-btn:not(.active):hover .sidebar-icon,
.sidebar-btn:not(.active):hover .sidebar-label {
  color: v-bind('themeColors.primary') !important;
}

.sidebar-btn.active {
  background: v-bind('themeColors.primaryBg') !important;
  border-radius: 0 !important;
  padding: 2px !important;
  margin: 0 !important;
}

.sidebar-btn.active .sidebar-btn-content {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 0 !important;
}

.sidebar-btn.active .sidebar-icon,
.sidebar-btn.active .sidebar-label {
  color: v-bind('themeColors.primary') !important;
}

.sidebar-btn.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: v-bind('themeColors.primaryBg');
  border-radius: 0;
  z-index: 0;
}

.sidebar-btn.active .sidebar-btn-content {
  position: relative;
  z-index: 1;
}

.sidebar-btn.dark.active {
  background: rgba(15, 157, 154, 0.15) !important;
}

.sidebar-btn.dark:not(.active) .sidebar-btn-content:hover {
  background: rgba(15, 157, 154, 0.1) !important;
}

.sidebar-btn.active .sidebar-btn-content {
  border-radius: 0 !important;
}

.sidebar-label {
  display: block;
  word-break: break-word;
  max-width: 100%;
  text-align: center;
}

.sidebar-icon {
  display: block;
  flex-shrink: 0;
}

.bg-surface {
  background-color: v-bind('themeColors.surface');
}

.bg-surface-dark {
  background-color: v-bind('themeColors.surface');
}
</style>
