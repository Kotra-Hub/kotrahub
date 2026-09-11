<!-- src/views/ServicePage.vue -->
<template>
  <div class="service-page animate-pop-in">
    <!-- Page Header -->
    <div class="header-section mb-6">
      <div class="header-content">
        <div class="header-icon-wrapper">
          <v-icon :icon="currentService.icon" size="28" :color="iconColor" />
        </div>
        <div class="header-text">
          <h2 class="text-h4 font-weight-bold text-primary">
            {{ currentService.title }}
          </h2>
          <p class="text-body-1 text-medium-emphasis mt-1">
            {{ currentService.description }}
          </p>
          <p class="text-caption text-medium-emphasis mt-0.5">
            Services Available: {{ totalServiceCount }}
          </p>
        </div>
      </div>
    </div>

    <!-- Service Sections -->
    <div class="service-sections">
      <v-card
        v-for="section in currentService.sections"
        :key="section.title"
        class="section-card mb-5"
        variant="outlined"
        rounded="lg"
      >
        <v-card-title class="section-title px-5 py-3">
          {{ section.title }}
        </v-card-title>

        <v-divider />

        <div class="service-list">
          <div
            v-for="service in section.items"
            :key="service.name"
            class="service-item"
            @click="handleServiceAction(service)"
          >
            <div class="col-icon">
              <div class="service-icon-wrapper">
                <v-icon :icon="service.icon || 'mdi-cog'" size="20" :color="iconColor" />
              </div>
            </div>

            <div class="col-name">
              <span class="service-name">{{ service.name }}</span>
            </div>

            <div class="col-description">
              <span class="service-description">{{ service.description }}</span>
            </div>

            <div class="col-action">
              <div class="service-action">
                <span class="action-text">View</span>
                <v-icon icon="mdi-arrow-right" size="18" :color="iconColor" />
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import {
  useServices,
  type ServiceItem,
} from '@/composables/useServices'

const theme = useTheme()
const isDark = computed(() => theme.current.value.dark)
const iconColor = computed(() => isDark.value ? '#ffffff' : 'primary')

const props = defineProps<{
  serviceId: string
}>()

const emit = defineEmits<{
  (e: 'navigate', page: string): void
  (e: 'openAI'): void
}>()

const {
  getServiceById,
  countServices,
  resolveServiceTarget
} = useServices()

const currentService = computed(() => getServiceById(props.serviceId))

const totalServiceCount = computed(() => countServices(currentService.value))

// Handle service action (click on View button)
const handleServiceAction = (service: ServiceItem) => {
  const target = resolveServiceTarget(service)
  if (target.type === 'ai') {
    emit('openAI')
  } else {
    emit('navigate', target.page)
  }
}
</script>

<style scoped>
.service-page {
  animation: popIn 0.18s ease-out;
}

@keyframes popIn {
  0% {
    transform: scale(0.95) translateY(6px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

/* Header Section */
.header-section {
  margin-bottom: 24px;
}

.header-content {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.header-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background: rgb(var(--v-theme-primaryBg)) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-text h2 {
  color: rgb(var(--v-theme-darkText)) !important;
}

.section-card {
  background: rgb(var(--v-theme-surface)) !important;
  border-color: rgb(var(--v-theme-borderLight)) !important;
  overflow: hidden;
}

.section-title {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: rgb(var(--v-theme-darkText)) !important;
  padding: 12px 20px !important;
}

.service-list {
  background: transparent !important;
  padding: 0 !important;
}

.service-item {
  display: flex !important;
  align-items: center !important;
  min-height: 56px !important;
  padding: 10px 20px !important;
  border-bottom: 1px solid rgb(var(--v-theme-borderLight)) !important;
  transition: background 0.15s ease !important;
  cursor: pointer !important;
}

.service-item:last-child {
  border-bottom: none !important;
}

.service-item:hover {
  background: rgb(var(--v-theme-primaryBg)) !important;
}

.col-icon {
  width: 52px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.col-name {
  width: 30%;
  flex-shrink: 0;
  padding-right: 16px;
}

.col-description {
  flex: 1;
  min-width: 0;
  padding-right: 16px;
}

.col-action {
  width: 90px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.service-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgb(var(--v-theme-primaryBg)) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.service-name {
  font-size: 15px !important;
  font-weight: 600 !important;
  color: rgb(var(--v-theme-darkText)) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: block !important;
  max-width: 100% !important;
}

.service-description {
  font-size: 15px !important;
  color: rgb(var(--v-theme-textMuted)) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  display: block !important;
  max-width: 100% !important;
}

.service-action {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}

.service-action .action-text {
  display: none;
}

@media (min-width: 600px) {
  .service-action .action-text {
    display: inline;
  }
}

:deep(.v-theme--dark) .header-icon-wrapper {
  background: rgba(15, 157, 154, 0.15) !important;
}

:deep(.v-theme--dark) .service-item:hover {
  background: rgba(15, 157, 154, 0.1) !important;
}

:deep(.v-theme--dark) .service-icon-wrapper {
  background: rgba(15, 157, 154, 0.12) !important;
}

:deep(.v-theme--dark) .section-card {
  border-color: rgb(var(--v-theme-borderLight)) !important;
}

@media (min-width: 600px) and (max-width: 899px) {
  .service-item {
    flex-wrap: nowrap !important;
    gap: 8px !important;
    min-height: 44px !important;
    padding: 4px 12px !important;
  }

  .col-icon {
    width: 32px !important;
    flex-shrink: 0 !important;
  }

  .col-name {
    width: auto !important;
    flex: 0 0 auto !important;
    max-width: 35% !important;
    padding-right: 8px !important;
  }

  .col-description {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    padding-right: 8px !important;
  }

  .col-action {
    width: auto !important;
    flex-shrink: 0 !important;
  }

  .service-name {
    font-size: 13px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-description {
    font-size: 12px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-icon-wrapper {
    width: 24px;
    height: 24px;
  }

  .service-icon-wrapper .v-icon {
    font-size: 15px !important;
  }

  .service-action {
    font-size: 13px !important;
  }

  .service-action .v-icon {
    font-size: 14px !important;
  }
}

@media (max-width: 599px) {
  .service-item {
    flex-wrap: nowrap !important;
    gap: 6px !important;
    min-height: 40px !important;
    padding: 4px 8px !important;
  }

  .col-icon {
    width: 28px !important;
    flex-shrink: 0 !important;
  }

  .col-name {
    width: auto !important;
    flex: 0 0 auto !important;
    max-width: 30% !important;
    padding-right: 6px !important;
  }

  .col-description {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    padding-right: 6px !important;
  }

  .col-action {
    width: auto !important;
    flex-shrink: 0 !important;
  }

  .service-name {
    font-size: 12px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-description {
    font-size: 11px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }

  .service-icon-wrapper {
    width: 20px;
    height: 20px;
  }

  .service-icon-wrapper .v-icon {
    font-size: 12px !important;
  }

  .service-action {
    font-size: 11px !important;
  }

  .service-action .v-icon {
    font-size: 11px !important;
  }

  .service-action .action-text {
    display: none !important;
  }
}

@media (max-width: 899px) {
  .header-content {
    gap: 12px;
  }

  .header-icon-wrapper {
    width: 40px;
    height: 40px;
  }

  .header-icon-wrapper .v-icon {
    font-size: 22px !important;
  }

  .header-text h2 {
    font-size: 20px !important;
  }

  .header-text p {
    font-size: 13px !important;
  }

  .section-title {
    font-size: 15px !important;
    padding: 10px 16px !important;
  }
}

@media (max-width: 599px) {
  .header-content {
    gap: 10px;
  }

  .header-icon-wrapper {
    width: 36px;
    height: 36px;
  }

  .header-icon-wrapper .v-icon {
    font-size: 18px !important;
  }

  .header-text h2 {
    font-size: 17px !important;
  }

  .header-text p {
    font-size: 12px !important;
  }

  .section-title {
    font-size: 14px !important;
    padding: 8px 12px !important;
  }
}
</style>
