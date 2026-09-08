<!-- src/components/Settings.vue -->
<template>
  <v-dialog
    v-model="dialog"
    max-width="640"
    persistent
    transition="dialog-bottom-transition"
    @click:outside="close"
  >
    <v-card rounded="xl" class="settings-card">
      <!-- Header -->
      <v-card-title class="d-flex align-center justify-space-between px-5 py-4">
        <span class="text-h6 font-weight-bold">
          <v-icon color="primary" class="mr-2">mdi-cog</v-icon>
          Settings
        </span>
        <v-btn icon variant="text" size="small" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-divider />

      <!-- Tabs (mobile) -->
      <div class="d-flex d-md-none" style="overflow-x: auto; background: rgb(var(--v-theme-surface));">
        <v-btn
          v-for="tab in tabs"
          :key="tab.id"
          variant="text"
          size="small"
          class="text-caption font-weight-semibold px-3 py-2"
          :class="activeTab === tab.id ? 'text-primary' : 'text-medium-emphasis'"
          :style="{
            borderBottom: activeTab === tab.id ? '3px solid rgb(var(--v-theme-primary))' : '3px solid transparent'
          }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </v-btn>
      </div>

      <v-row no-gutters class="flex-grow-1" style="min-height: 380px;">
        <!-- Sidebar (desktop) -->
        <v-col cols="3" class="d-none d-md-block" style="background: rgb(var(--v-theme-surface)); border-right: 1px solid rgb(var(--v-theme-outline-variant));">
          <v-list density="compact" class="py-2" style="background: transparent;">
            <v-list-item
              v-for="tab in tabs"
              :key="tab.id"
              :active="activeTab === tab.id"
              :class="{ 'active-tab': activeTab === tab.id }"
              @click="activeTab = tab.id"
              style="border-radius: 0; border-right: 3px solid transparent;"
            >
              <v-list-item-title class="text-body-2 font-weight-medium">
                {{ tab.label }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>

        <!-- Content -->
        <v-col cols="12" md="9" class="pa-4 pa-md-5" style="max-height: 60vh; overflow-y: auto; background: rgb(var(--v-theme-surface));">
          <!-- General Settings -->
          <div v-show="activeTab === 'general'">
            <h3 class="text-h6 font-weight-bold text-high-emphasis mb-1">General Settings</h3>
            <p class="text-caption text-medium-emphasis mb-4">Manage your default preferences.</p>

            <!-- Language -->
            <div class="d-flex align-center justify-space-between py-3" style="border-bottom: 1px solid rgb(var(--v-theme-outline-variant));">
              <div>
                <div class="text-body-2 font-weight-semibold text-high-emphasis">Language</div>
                <div class="text-caption text-medium-emphasis">Preferred language</div>
              </div>
              <v-select
                v-model="language"
                :items="languages"
                density="compact"
                variant="outlined"
                hide-details
                class="settings-select"
                style="max-width: 140px;"
                @update:model-value="autoSave"
              />
            </div>

            <!-- Important Notice Toggle (button removed, switch only) -->
            <div class="d-flex align-center justify-space-between py-3" style="border-bottom: 1px solid rgb(var(--v-theme-outline-variant));">
              <div>
                <div class="text-body-2 font-weight-semibold text-high-emphasis">Important Notice</div>
                <div class="text-caption text-medium-emphasis">Show or hide the Important Notice banner</div>
              </div>
              <v-switch
                v-model="showImportantNotice"
                color="primary"
                hide-details
                density="compact"
                inset
                @update:model-value="autoSave"
              />
            </div>
          </div>

          <!-- Appearance Settings -->
          <div v-show="activeTab === 'appearance'">
            <h3 class="text-h6 font-weight-bold text-high-emphasis mb-1">Appearance</h3>
            <p class="text-caption text-medium-emphasis mb-4">Customize how Kotra Hub looks.</p>

            <!-- Dark Mode -->
            <div class="d-flex align-center justify-space-between py-3" style="border-bottom: 1px solid rgb(var(--v-theme-outline-variant));">
              <div>
                <div class="text-body-2 font-weight-semibold text-high-emphasis">Dark Mode</div>
                <div class="text-caption text-medium-emphasis">Switch between light and dark</div>
              </div>
              <div class="d-flex align-center ga-2">
                <v-switch
                  v-model="isDark"
                  color="primary"
                  hide-details
                  density="compact"
                  inset
                  @update:model-value="toggleTheme"
                />
              </div>
            </div>

            <!-- Theme Color -->
            <!--<div class="py-4">
              <div class="mb-3">
                <div class="text-body-2 font-weight-semibold text-high-emphasis">Theme Color</div>
                <div class="text-caption text-medium-emphasis">Choose your preferred accent color</div>
              </div>

              <div class="d-flex flex-wrap align-center ga-2">
                <v-btn
                  v-for="theme in themeOptions"
                  :key="theme.name"
                  size="40"
                  rounded="xl"
                  class="theme-color-btn"
                  :class="{ 'theme-color-btn--active': themeColor === theme.color }"
                  :style="{
                    backgroundColor: theme.color,
                    border: themeColor === theme.color ? '3px solid rgb(var(--v-theme-on-surface))' : '2px solid transparent',
                  }"
                  @click="setThemeColor(theme.color)"
                >
                  <v-icon v-if="themeColor === theme.color" color="white" size="16">mdi-check</v-icon>
                </v-btn>

                <v-btn
                  size="40"
                  rounded="xl"
                  variant="outlined"
                  class="theme-color-btn custom-color-btn"
                  @click="customColorPicker = !customColorPicker"
                >
                  <v-icon size="18" color="medium-emphasis">mdi-plus</v-icon>
                </v-btn>

                <input
                  v-if="customColorPicker"
                  ref="customColorInput"
                  type="color"
                  :value="themeColor"
                  class="custom-color-input"
                  @input="setThemeColor(($event.target as HTMLInputElement).value)"
                />
              </div>

              <div class="mt-3 text-caption text-medium-emphasis">
                Current: <span class="font-weight-semibold text-body-2" :style="{ color: themeColor }">{{ themeColor }}</span>
              </div>
            </div>-->
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// Props
const props = defineProps<{
  modelValue: boolean
  isDark?: boolean
  showImportantNotice?: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'toggle-theme'): void
  (e: 'update:show-important-notice', value: boolean): void
  (e: 'settings-saved', settings: any): void
}>()

// Dialog state
const dialog = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

// Tabs
const tabs = [
  { id: 'general', label: 'General' },
  { id: 'appearance', label: 'Appearance'},
]

const activeTab = ref('general')

// General settings
const language = ref('English')
const languages = ['English', 'Bahasa Malaysia', 'Chinese']

// Appearance settings
const isDark = ref(props.isDark ?? false)
const themeColor = ref('#0f9d9a')
const customColorPicker = ref(false)

// Theme options
// const themeOptions = [
//   { name: 'Teal', color: '#0f9d9a' },
//   { name: 'Purple', color: '#9333ea' },
//   { name: 'Blue', color: '#2563eb' },
//   { name: 'Green', color: '#16a34a' },
//   { name: 'Orange', color: '#ea580c' },
//   { name: 'Rose', color: '#e11d48' },
// ]

// Show important notice
const showImportantNotice = computed({
  get: () => props.showImportantNotice ?? true,
  set: (val) => emit('update:show-important-notice', val)
})

// Auto-save settings
function autoSave() {
  const settings = {
    language: language.value,
    themeColor: themeColor.value,
    showImportantNotice: showImportantNotice.value,
  }
  emit('settings-saved', settings)
}

// Methods
function close() {
  dialog.value = false
}

function toggleTheme() {
  emit('toggle-theme')
  autoSave()
}

// function setThemeColor(color: string) {
//   if (!/^#[0-9a-fA-F]{6}$/.test(color || '')) return
//   themeColor.value = color
//   const root = document.documentElement
//   root.style.setProperty('--user-accent', color)
//   root.setAttribute('data-user-theme', 'custom')
//   localStorage.setItem('kotra-user-theme', color)
//   customColorPicker.value = false
//   autoSave()
// }

watch(() => props.isDark, (val) => {
  isDark.value = val ?? false
})

onMounted(() => {
  const savedTheme = localStorage.getItem('kotra-user-theme')
  if (savedTheme && /^#[0-9a-fA-F]{6}$/.test(savedTheme)) {
    themeColor.value = savedTheme
    document.documentElement.style.setProperty('--user-accent', savedTheme)
  }
})

watch(customColorPicker, (val) => {
  if (val) {
    setTimeout(() => {
      const input = document.querySelector('.custom-color-input') as HTMLInputElement
      if (input) input.click()
    }, 100)
  }
})
</script>

<style scoped>
.settings-card {
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.settings-select {
  min-width: 120px;
}

:deep(.settings-select .v-field) {
  border-radius: 10px;
}

:deep(.settings-select .v-field__input) {
  font-size: 13px;
}

.theme-color-btn {
  border-radius: 50% !important;
  min-width: 40px !important;
  width: 40px !important;
  height: 40px !important;
  padding: 0 !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.theme-color-btn:hover {
  transform: scale(1.08);
}

.theme-color-btn--active {
  box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.3), 0 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-color-btn {
  border-style: dashed !important;
}

.custom-color-input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
}

.active-tab {
  background: rgba(var(--v-theme-primary), 0.08) !important;
  border-right-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-primary)) !important;
}

.text-high-emphasis {
  color: rgb(var(--v-theme-on-surface));
}

.text-medium-emphasis {
  color: rgb(var(--v-theme-on-surface-variant));
}

.settings-card {
  background: rgb(var(--v-theme-surface));
}

:deep(.settings-select .v-field) {
  background: rgb(var(--v-theme-surface));
}

:deep(.settings-select .v-field--variant-outlined .v-field__outline) {
  color: rgb(var(--v-theme-outline-variant));
}

:deep(.settings-select .v-field--variant-outlined .v-field__outline--active) {
  color: rgb(var(--v-theme-primary));
}

.settings-card {
  animation: settingsPop 0.25s ease-out;
}

@keyframes settingsPop {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(12px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
