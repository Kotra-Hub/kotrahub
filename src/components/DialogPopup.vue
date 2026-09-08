<!-- src/components/DialogPopup.vue -->
<template>
  <v-dialog
    v-model="dialogVisible"
    :width="width"
    :persistent="persistent"
    :fullscreen="fullscreen"
    :scrollable="scrollable"
    @update:model-value="handleDialogClose"
    :transition="transition"
    content-class="dialog-popup-content"
  >
    <v-card
      :color="themeColors.surface"
      :elevation="elevation"
      :rounded="rounded"
      class="dialog-popup-card"
    >
      <!-- Header -->
      <v-card-title
        class="dialog-header pa-0"
        :style="{
          borderBottom: `1px solid ${themeColors.border}`,
          backgroundColor: themeColors.bgLight
        }"
      >
        <div class="d-flex align-center justify-space-between w-100 px-5 py-4">
          <div class="d-flex align-center gap-3 min-w-0">

            <div class="min-w-0">
              <span class="dialog-title text-h6 font-weight-bold" :style="{ color: themeColors.darkText }">
                {{ title }}
              </span>
              <div v-if="subtitle" class="dialog-subtitle text-caption mt-0.5" :style="{ color: themeColors.textMuted }">
                {{ subtitle }}
              </div>
            </div>
          </div>

          <v-btn
            icon
            variant="text"
            size="small"
            @click="closeDialog"
            class="dialog-close-btn"
          >
            <v-icon size="20">mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>

      <!-- Content -->
      <v-card-text
        class="dialog-content pa-5"
        :style="{
          color: themeColors.textSecondary,
          maxHeight: contentMaxHeight,
          overflowY: 'auto',
          fontSize: '13px',
          lineHeight: '1.6'
        }"
      >
        <!-- Main content slot -->
        <slot name="content">
          <slot></slot>
        </slot>

        <!-- Warning/Alert Section -->
        <div v-if="warning" class="dialog-warning mt-4">
          <v-alert
            :color="warningColor || 'warning'"
            :icon="warningIcon || 'mdi-alert'"
            variant="tonal"
            density="comfortable"
            rounded="lg"
            class="warning-alert"
          >
            <span v-html="warning" :style="{ color: themeColors.textSecondary, fontSize: '13px' }"></span>
          </v-alert>
        </div>

        <!-- BM Translation -->
        <div v-if="bmContent && showBm" class="dialog-bm mt-4">
          <v-btn
            variant="text"
            size="small"
            @click="bmOpen = !bmOpen"
            :color="themeColors.primary"
            class="dialog-bm-toggle font-weight-bold text-caption pa-0"
          >
            <v-icon left size="16" class="mr-1">mdi-translate</v-icon>
            {{ bmOpen ? 'Hide Translation' : 'Baca dalam Bahasa Malaysia' }}
          </v-btn>

          <v-expand-transition>
            <div v-show="bmOpen" class="mt-3">
              <div
                class="dialog-bm-content pa-4"
                :style="{
                  backgroundColor: themeColors.bmBg,
                  border: `1px solid ${themeColors.border}`,
                  borderRadius: '12px',
                  color: themeColors.textSecondary,
                  fontSize: '13px',
                  lineHeight: '1.6'
                }"
              >
                <div
                  v-html="bmContent"
                  :style="{
                    color: themeColors.textSecondary
                  }"
                ></div>
              </div>
            </div>
          </v-expand-transition>
        </div>
      </v-card-text>

      <!-- Footer Actions -->
      <v-card-actions
        v-if="hasActions"
        class="dialog-footer pa-4"
        :style="{
          borderTop: `1px solid ${themeColors.border}`,
          backgroundColor: themeColors.bgLight
        }"
      >
        <v-spacer></v-spacer>

        <template v-if="!$slots.actions">
          <v-btn
            v-for="action in actions"
            :key="action.label"
            :color="action.color || themeColors.primary"
            :variant="action.variant || 'flat'"
            :loading="action.loading"
            :disabled="action.disabled"
            @click="handleAction(action)"
            class="dialog-action-btn font-weight-bold"
            :class="action.variant === 'text' ? 'dialog-action-btn-text' : 'dialog-action-btn-primary'"
          >
            <v-icon v-if="action.icon" left size="18" class="mr-1">{{ action.icon }}</v-icon>
            {{ action.label }}
          </v-btn>
        </template>

        <slot name="actions"></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots } from 'vue'
import { useTheme } from 'vuetify'

// Props
const props = defineProps<{
  modelValue: boolean
  title: string
  subtitle?: string
  icon?: string
  iconColor?: string
  width?: string | number
  persistent?: boolean
  fullscreen?: boolean
  scrollable?: boolean
  transition?: string
  elevation?: number
  rounded?: string | boolean
  contentMaxHeight?: string
  warning?: string
  warningColor?: string
  warningIcon?: string
  bmContent?: string
  showBm?: boolean
  actions?: Array<{
    label: string
    value?: any
    color?: string
    variant?: 'flat' | 'text' | 'tonal' | 'outlined'
    icon?: string
    loading?: boolean
    disabled?: boolean
    close?: boolean
  }>
  closeOnAction?: boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'action', value: any): void
  (e: 'close'): void
}>()

// Theme
const theme = useTheme()
const themeColors = computed(() => theme.current.value.colors)

// Slots
const slots = useSlots()

// State
const dialogVisible = ref(props.modelValue)
const bmOpen = ref(false)

//Computed
const hasActions = computed(() => {
  return (props.actions && props.actions.length > 0) || !!slots.actions
})

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  dialogVisible.value = newVal
  if (!newVal) {
    bmOpen.value = false
  }
})

// Watch internal changes
watch(dialogVisible, (newVal) => {
  emit('update:modelValue', newVal)
  if (!newVal) {
    emit('close')
  }
})

// Methods
const handleDialogClose = (value: boolean) => {
  if (!value) {
    emit('close')
  }
}

const closeDialog = () => {
  dialogVisible.value = false
  emit('update:modelValue', false)
  emit('close')
}

const handleAction = (action: any) => {
  emit('action', action.value !== undefined ? action.value : action.label)

  if (action.close !== false) {
    closeDialog()
  }
}

// Expose methods
defineExpose({
  open: () => { dialogVisible.value = true },
  close: closeDialog,
  setBmOpen: (val: boolean) => { bmOpen.value = val }
})
</script>

<style scoped>
.dialog-popup-content {
  max-width: 100% !important;
}

.dialog-popup-card {
  overflow: hidden;
  border-radius: 20px !important;
}

/* Header */
.dialog-header {
  min-height: 72px;
}

.dialog-icon-avatar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.dialog-title {
  font-size: 18px !important;
  font-weight: 700 !important;
  line-height: 1.2 !important;
}

.dialog-subtitle {
  font-size: 13px !important;
  color: rgb(var(--v-theme-textMuted)) !important;
}

.dialog-close-btn {
  color: rgb(var(--v-theme-textMuted)) !important;
  background: rgb(var(--v-theme-closeBtn)) !important;
  width: '36px';
  height: '36px';
  min-width: '36px';
  border-radius: '50%';
  transition: background 0.15s ease !important;
}

.dialog-close-btn:hover {
  background: rgb(var(--v-theme-closeBtnHover)) !important;
}

/* Content */
.dialog-content {
  font-size: 14px;
  line-height: 1.7;
  padding: 20px 24px !important;
}

.dialog-content :deep(p) {
  margin-bottom: 16px;
}

.dialog-content :deep(p:last-child) {
  margin-bottom: 0;
}

.dialog-content :deep(ul) {
  padding-left: 20px;
  margin: 8px 0 16px 0;
}

.dialog-content :deep(ul li) {
  margin-bottom: 4px;
}

.dialog-content :deep(strong) {
  font-weight: 700;
}

/* Scrollbar */
.dialog-content::-webkit-scrollbar {
  width: 6px;
}

.dialog-content::-webkit-scrollbar-track {
  background: transparent;
}

.dialog-content::-webkit-scrollbar-thumb {
  background: rgb(var(--v-theme-border));
  border-radius: 10px;
}

.dialog-content::-webkit-scrollbar-thumb:hover {
  background: rgb(var(--v-theme-textMuted));
}

/* Warning */
.dialog-warning {
  margin-top: 16px;
}

.warning-alert :deep(.v-alert__content) {
  font-size: 14px;
  line-height: 1.6;
}

.warning-alert :deep(ul) {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 20px;
}

.warning-alert :deep(ul li) {
  margin-bottom: 4px;
}

/* BM Translation */
.dialog-bm-toggle {
  font-size: 13px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
}

.dialog-bm-toggle:hover {
  text-decoration: underline !important;
}

.dialog-bm-content {
  border-radius: 12px !important;
  font-size: 14px;
  line-height: 1.7;
}

/* Footer */
.dialog-footer {
  padding: 14px 24px !important;
  gap: 8px;
}

.dialog-action-btn {
  text-transform: none !important;
  font-weight: 700 !important;
  letter-spacing: 0.3px !important;
  border-radius: 12px !important;
  min-height: 40px !important;
  padding: 0 20px !important;
}

.dialog-action-btn-text {
  color: rgb(var(--v-theme-textMuted)) !important;
}

.dialog-action-btn-text:hover {
  background: rgb(var(--v-theme-bgHover)) !important;
}

.dialog-action-btn-primary {
  box-shadow: 0 2px 8px color-mix(in srgb, rgb(var(--v-theme-primary)) 25%, transparent) !important;
}

.dialog-action-btn-primary:hover {
  box-shadow: 0 4px 16px color-mix(in srgb,rgb(var(--v-theme-primary)) 35%, transparent) !important;
  transform: translateY(-1px);
}

/* Responsive */
@media (max-width: 600px) {
  .dialog-popup-card {
    margin: 12px;
    border-radius: 16px !important;
  }

  .dialog-content {
    padding: 16px 18px !important;
  }

  .dialog-footer {
    padding: 12px 16px !important;
    flex-wrap: wrap;
  }

  .dialog-footer .v-btn {
    flex: 1;
    min-width: 80px;
  }

  .dialog-title {
    font-size: 16px !important;
  }

  .dialog-icon-avatar {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
  }

  .dialog-icon-avatar .v-icon {
    font-size: 18px !important;
  }
}

/* Dark mode adjustments */
.dark .dialog-popup-card {
  border-color: rgb(var(--v-theme-border)) !important;
}

.dark .dialog-content {
  color: rgb(var(--v-theme-textSecondary)) !important;
}

.dark .dialog-title {
  color: rgb(var(--v-theme-darkText)) !important;
}
</style>
