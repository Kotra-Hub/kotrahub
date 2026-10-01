<template>
  <v-dialog
    v-model="dialog"
    max-width="760"
    persistent
    scrollable
    transition="dialog-bottom-transition"
    @click:outside="close"
  >
    <v-card
      rounded="xl"
      class="settings-card"
      elevation="0"
    >
      <!-- =========================================================
           HEADER
           ========================================================= -->
      <div class="settings-header">
        <div class="d-flex align-center ga-3">
          <div class="settings-header-icon">
            <v-icon size="22">
              mdi-cog-outline
            </v-icon>
          </div>

          <div>
            <div class="text-h6 font-weight-bold">
              Settings
            </div>

            <div class="text-caption text-medium-emphasis">
              Manage your preferences
            </div>
          </div>
        </div>

        <v-btn
          icon
          variant="text"
          size="38"
          @click="close"
        >
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </div>

      <v-divider />

      <!-- =========================================================
           TOP NAVIGATION
           ========================================================= -->
      <div class="settings-navigation">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          class="settings-nav-item"
          :class="{ 'settings-nav-item--active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          <v-icon size="19">
            {{ tab.icon }}
          </v-icon>

          <span>
            {{ tab.label }}
          </span>
        </button>
      </div>

      <v-divider />

      <!-- =========================================================
           CONTENT
           ========================================================= -->
      <v-card-text class="settings-content">

        <!-- =======================================================
             GENERAL
             ======================================================= -->
        <div v-if="activeTab === 'general'">

          <div class="section-intro">
            <div>
              <div class="section-title">
                General
              </div>

              <div class="section-description">
                Configure your basic application preferences.
              </div>
            </div>
          </div>

          <div class="settings-list">

            <!-- Language -->
            <div class="setting-item">
              <div class="setting-item-left">

                <div class="setting-icon">
                  <v-icon size="20">
                    mdi-translate
                  </v-icon>
                </div>

                <div>
                  <div class="setting-title">
                    Language
                  </div>

                  <div class="setting-description">
                    Select your preferred language.
                  </div>
                </div>
              </div>

              <v-select
                v-model="language"
                :items="languages"
                density="compact"
                variant="outlined"
                hide-details
                class="language-select"
                @update:model-value="autoSave"
              />
            </div>

            <!-- Important Notice -->
            <div class="setting-item">
              <div class="setting-item-left">

                <div class="setting-icon">
                  <v-icon size="20">
                    mdi-bell-alert-outline
                  </v-icon>
                </div>

                <div>
                  <div class="setting-title">
                    Important Notice
                  </div>

                  <div class="setting-description">
                    Show important announcements and notices.
                  </div>
                </div>
              </div>

              <v-switch
                v-model="showImportantNotice"
                color="primary"
                hide-details
                inset
                density="compact"
                @update:model-value="autoSave"
              />
            </div>

          </div>

          <!-- Information -->
          <v-card
            variant="tonal"
            color="primary"
            rounded="lg"
            class="info-card mt-5"
          >
            <div class="d-flex align-start ga-3">
              <v-icon size="20">
                mdi-information-outline
              </v-icon>

              <div>
                <div class="text-body-2 font-weight-semibold">
                  Preferences are saved automatically
                </div>

                <div class="text-caption mt-1">
                  Your changes will take effect immediately.
                </div>
              </div>
            </div>
          </v-card>
        </div>

        <!-- =======================================================
             APPEARANCE
             ======================================================= -->
        <div v-else-if="activeTab === 'appearance'">

          <div class="section-intro">
            <div>
              <div class="section-title">
                Appearance
              </div>

              <div class="section-description">
                Customize the way Kotra Hub looks on your device.
              </div>
            </div>
          </div>

          <!-- Appearance Mode -->
          <div class="appearance-section">

            <div class="setting-group-title">
              Theme Mode
            </div>

            <div class="setting-group-description">
              Choose how the application theme should appear.
            </div>

            <div class="appearance-options">

              <button
                v-for="option in appearanceOptions"
                :key="option.value"
                type="button"
                class="appearance-option"
                :class="{
                  'appearance-option--active':
                    appearanceMode === option.value
                }"
                @click="selectAppearance(option.value)"
              >
                <!-- Preview -->
                <div
                  class="appearance-preview"
                  :class="`appearance-preview--${option.value}`"
                >
                  <div class="preview-window">
                    <div class="preview-sidebar" />

                    <div class="preview-content">
                      <div class="preview-line preview-line--long" />
                      <div class="preview-line" />
                      <div class="preview-box-row">
                        <div />
                        <div />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Label -->
                <div class="appearance-option-footer">

                  <div class="d-flex align-center ga-2">

                    <v-icon size="18">
                      {{ option.icon }}
                    </v-icon>

                    <span class="appearance-label">
                      {{ option.label }}
                    </span>

                  </div>

                  <v-icon
                    v-if="appearanceMode === option.value"
                    size="19"
                    color="primary"
                  >
                    mdi-check-circle
                  </v-icon>

                </div>
              </button>

            </div>
          </div>

          <!-- Current Theme -->
          <v-card
            variant="outlined"
            rounded="lg"
            class="current-theme-card mt-5"
          >
            <div class="d-flex align-center justify-space-between">

              <div class="d-flex align-center ga-3">

                <div class="theme-status-icon">
                  <v-icon size="20">
                    {{
                      appearanceMode === 'dark'
                        ? 'mdi-weather-night'
                        : 'mdi-white-balance-sunny'
                    }}
                  </v-icon>
                </div>

                <div>
                  <div class="text-body-2 font-weight-semibold">
                    Current Theme
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{
                      appearanceMode === 'dark'
                        ? 'Dark mode is enabled'
                        : 'Light mode is enabled'
                    }}
                  </div>
                </div>

              </div>

              <v-chip
                color="primary"
                variant="tonal"
                size="small"
                class="text-capitalize"
              >
                {{ appearanceMode }}
              </v-chip>

            </div>
          </v-card>

        </div>

      </v-card-text>

      <!-- =========================================================
           FOOTER
           ========================================================= -->
      <v-divider />

      <div class="settings-footer">

        <div class="footer-status">
          <v-icon
            size="17"
            color="success"
          >
            mdi-check-circle-outline
          </v-icon>

          <span>
            Settings saved automatically
          </span>
        </div>

        <v-btn
          variant="tonal"
          color="primary"
          class="text-none"
          @click="close"
        >
          Done
        </v-btn>

      </div>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

/* ================================================================
   PROPS
   ================================================================ */

const props = defineProps<{
  modelValue: boolean
  isDark?: boolean
  showImportantNotice?: boolean
}>()

/* ================================================================
   EMITS
   ================================================================ */

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'toggle-theme'): void
  (e: 'change-theme-mode', mode: string): void
  (e: 'update:show-important-notice', value: boolean): void
  (e: 'settings-saved', settings: {
    language: string
    showImportantNotice: boolean
  }): void
}>()

/* ================================================================
   DIALOG
   ================================================================ */

const dialog = computed({
  get: () => props.modelValue,

  set: (value: boolean) => {
    emit('update:modelValue', value)
  },
})

/* ================================================================
   TABS
   ================================================================ */

const tabs = [
  {
    id: 'general',
    label: 'General',
    icon: 'mdi-tune-variant',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    icon: 'mdi-palette-outline',
  },
]

const activeTab = ref('general')

/* ================================================================
   GENERAL SETTINGS
   ================================================================ */

const language = ref('English')

const languages = [
  'English',
  'Bahasa Malaysia',
  'Chinese',
]

/* ================================================================
   APPEARANCE
   ================================================================ */

const appearanceMode = ref('light')

const appearanceOptions = [
  {
    value: 'light',
    label: 'Light',
    icon: 'mdi-white-balance-sunny',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: 'mdi-weather-night',
  },
]

/* ================================================================
   IMPORTANT NOTICE
   ================================================================ */

const showImportantNotice = computed({
  get: () => props.showImportantNotice ?? true,

  set: (value: boolean) => {
    emit('update:show-important-notice', value)
  },
})

/* ================================================================
   APPEARANCE SELECTION
   ================================================================ */

function selectAppearance(mode: string) {
  appearanceMode.value = mode

  localStorage.setItem(
    'kotra-appearance-mode',
    mode,
  )

  emit(
    'change-theme-mode',
    mode,
  )
}

/* ================================================================
   AUTO SAVE
   ================================================================ */

function autoSave() {
  emit('settings-saved', {
    language: language.value,
    showImportantNotice:
      showImportantNotice.value,
  })
}

/* ================================================================
   CLOSE
   ================================================================ */

function close() {
  dialog.value = false
}

/* ================================================================
   THEME TOGGLE
   ================================================================ */

function toggleTheme() {
  emit('toggle-theme')
  autoSave()
}

/* ================================================================
   LOAD SETTINGS
   ================================================================ */

onMounted(() => {
  const savedLanguage =
    localStorage.getItem('kotra-language')

  if (savedLanguage) {
    language.value = savedLanguage
  }

  const savedAppearance =
    localStorage.getItem(
      'kotra-appearance-mode',
    )

  if (
    savedAppearance === 'light' ||
    savedAppearance === 'dark'
  ) {
    appearanceMode.value = savedAppearance
  }
})
</script>

<style scoped>
/* ================================================================
   MAIN CARD
   ================================================================ */

.settings-card {
  overflow: hidden;
  background: rgb(var(--v-theme-surface));
  border: 1px solid
    rgba(var(--v-theme-on-surface), 0.08);
}

/* ================================================================
   HEADER
   ================================================================ */

.settings-header {
  min-height: 78px;
  padding: 18px 22px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings-header-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 11px;

  color: rgb(var(--v-theme-primary));
  background:
    rgba(var(--v-theme-primary), 0.10);
}

/* ================================================================
   NAVIGATION
   ================================================================ */

.settings-navigation {
  display: flex;
  align-items: center;

  padding: 0 18px;

  background:
    rgba(var(--v-theme-on-surface), 0.015);

  overflow-x: auto;
  scrollbar-width: none;
}

.settings-navigation::-webkit-scrollbar {
  display: none;
}

.settings-nav-item {
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  min-width: 120px;
  min-height: 50px;

  padding: 0 16px;

  border: 0;
  background: transparent;

  color:
    rgb(var(--v-theme-on-surface-variant));

  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.settings-nav-item:hover {
  color: rgb(var(--v-theme-on-surface));

  background:
    rgba(var(--v-theme-on-surface), 0.04);
}

.settings-nav-item--active {
  color: rgb(var(--v-theme-primary));
}

.settings-nav-item--active::after {
  content: "";

  position: absolute;

  left: 18px;
  right: 18px;
  bottom: 0;

  height: 2px;

  border-radius: 2px;

  background:
    rgb(var(--v-theme-primary));
}

/* ================================================================
   CONTENT
   ================================================================ */

.settings-content {
  min-height: 400px;
  max-height: 62vh;

  padding: 26px 28px;

  overflow-y: auto;
}

/* ================================================================
   SECTION
   ================================================================ */

.section-intro {
  margin-bottom: 22px;
}

.section-title {
  color: rgb(var(--v-theme-on-surface));

  font-size: 18px;
  font-weight: 700;
}

.section-description {
  margin-top: 4px;

  color:
    rgb(var(--v-theme-on-surface-variant));

  font-size: 13px;
}

/* ================================================================
   SETTINGS LIST
   ================================================================ */

.settings-list {
  overflow: hidden;

  border: 1px solid
    rgba(var(--v-theme-on-surface), 0.08);

  border-radius: 12px;
}

.setting-item {
  min-height: 82px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  padding: 16px 18px;

  background:
    rgb(var(--v-theme-surface));

  transition:
    background 0.2s ease;
}

.setting-item + .setting-item {
  border-top: 1px solid
    rgba(var(--v-theme-on-surface), 0.08);
}

.setting-item:hover {
  background:
    rgba(var(--v-theme-on-surface), 0.025);
}

.setting-item-left {
  display: flex;
  align-items: center;

  gap: 14px;

  min-width: 0;
}

.setting-icon {
  width: 40px;
  height: 40px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  color:
    rgb(var(--v-theme-primary));

  background:
    rgba(var(--v-theme-primary), 0.10);
}

.setting-title {
  color:
    rgb(var(--v-theme-on-surface));

  font-size: 14px;
  font-weight: 600;
}

.setting-description {
  margin-top: 3px;

  color:
    rgb(var(--v-theme-on-surface-variant));

  font-size: 12px;
}

/* ================================================================
   LANGUAGE
   ================================================================ */

.language-select {
  width: 155px;
  flex-shrink: 0;
}

:deep(.language-select .v-field) {
  border-radius: 9px;
}

:deep(.language-select .v-field__input) {
  font-size: 13px;
}

/* ================================================================
   INFO CARD
   ================================================================ */

.info-card {
  padding: 16px 18px;
}

/* ================================================================
   APPEARANCE
   ================================================================ */

.appearance-section {
  margin-top: 4px;
}

.setting-group-title {
  color:
    rgb(var(--v-theme-on-surface));

  font-size: 14px;
  font-weight: 600;
}

.setting-group-description {
  margin-top: 4px;

  color:
    rgb(var(--v-theme-on-surface-variant));

  font-size: 12px;
}

.appearance-options {
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 14px;

  margin-top: 16px;
}

.appearance-option {
  padding: 0;

  overflow: hidden;

  text-align: left;

  border: 1px solid
    rgba(var(--v-theme-on-surface), 0.10);

  border-radius: 12px;

  background:
    rgb(var(--v-theme-surface));

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.appearance-option:hover {
  transform: translateY(-1px);

  border-color:
    rgba(var(--v-theme-primary), 0.55);

  box-shadow:
    0 5px 16px
    rgba(0, 0, 0, 0.07);
}

.appearance-option--active {
  border: 2px solid
    rgb(var(--v-theme-primary));
}

.appearance-preview {
  height: 150px;

  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.appearance-preview--light {
  background: #f5f7fa;
}

.appearance-preview--dark {
  background: #111827;
}

.preview-window {
  width: 100%;
  max-width: 270px;
  height: 112px;

  display: flex;

  overflow: hidden;

  border-radius: 7px;

  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.15);
}

.appearance-preview--light .preview-window {
  background: #ffffff;
}

.appearance-preview--dark .preview-window {
  background: #1f2937;
}

.preview-sidebar {
  width: 42px;
  flex-shrink: 0;
}

.appearance-preview--light .preview-sidebar {
  background: #eef2f5;
}

.appearance-preview--dark .preview-sidebar {
  background: #172033;
}

.preview-content {
  flex: 1;
  padding: 13px;
}

.preview-line {
  width: 55%;
  height: 6px;

  margin-bottom: 7px;

  border-radius: 5px;
}

.preview-line--long {
  width: 75%;
}

.appearance-preview--light .preview-line {
  background: #dce2e8;
}

.appearance-preview--dark .preview-line {
  background: #3a475c;
}

.preview-box-row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 7px;

  margin-top: 12px;
}

.preview-box-row div {
  height: 42px;

  border-radius: 5px;
}

.appearance-preview--light .preview-box-row div {
  background: #edf1f5;
}

.appearance-preview--dark .preview-box-row div {
  background: #2a374b;
}

.appearance-option-footer {
  min-height: 52px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 15px;

  border-top: 1px solid
    rgba(var(--v-theme-on-surface), 0.08);

  color:
    rgb(var(--v-theme-on-surface));
}

.appearance-label {
  font-size: 13px;
  font-weight: 600;
}

/* ================================================================
   CURRENT THEME
   ================================================================ */

.current-theme-card {
  padding: 16px 18px;
}

.theme-status-icon {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  color:
    rgb(var(--v-theme-primary));

  background:
    rgba(var(--v-theme-primary), 0.10);
}

/* ================================================================
   FOOTER
   ================================================================ */

.settings-footer {
  min-height: 66px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  padding: 12px 22px;
}

.footer-status {
  display: flex;
  align-items: center;

  gap: 7px;

  color:
    rgb(var(--v-theme-on-surface-variant));

  font-size: 12px;
}

/* ================================================================
   MOBILE
   ================================================================ */

@media (max-width: 600px) {
  .settings-header {
    padding: 16px;
  }

  .settings-navigation {
    padding: 0 8px;
  }

  .settings-nav-item {
    min-width: 105px;
    padding: 0 12px;
  }

  .settings-content {
    padding: 20px 16px;
  }

  .setting-item {
    align-items: flex-start;
    flex-direction: column;
    gap: 14px;
  }

  .setting-item-left {
    width: 100%;
  }

  .language-select {
    width: 100%;
  }

  .appearance-options {
    grid-template-columns: 1fr;
  }

  .appearance-preview {
    height: 135px;
  }

  .settings-footer {
    padding: 12px 16px;
  }

  .footer-status {
    display: none;
  }
}
</style>