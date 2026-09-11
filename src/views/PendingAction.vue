<!-- src/views/PendingAction.vue -->
<template>
  <div class="pending-action-wrapper">
    <!-- Page Header -->
    <div class="d-flex align-center ga-3 mb-4">
      <v-avatar size="48" rounded="lg" color="primary" variant="tonal">
        <v-icon size="24" color="primary">mdi-format-list-checks</v-icon>
      </v-avatar>
      <div>
        <h1 class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
          Pending Action
        </h1>
        <p class="text-body-2 text-medium-emphasis mt-0 mb-0">
          Requests that need your response
        </p>
      </div>
    </div>

    <!-- Main Card -->
    <v-card class="rounded-xl" elevation="0" border>
      <!-- Summary Section - STICKY -->
      <div class="summary-section pa-4 border-bottom" style="border-color: rgba(var(--v-theme-on-surface), 0.06); position: sticky; top: 0; background: rgb(var(--v-theme-surface)); z-index: 1; border-radius: 12px 12px 0 0;">
        <!-- Summary Row -->
        <div class="d-flex align-center justify-space-between mb-2">
          <span class="text-caption text-medium-emphasis font-weight-medium">
            {{ pendingActions.length }} awaiting action
          </span>
          <span class="text-caption font-weight-bold d-flex align-center ga-1" style="color: rgb(var(--v-theme-error));">
            <v-icon size="14" color="error">mdi-alert-circle</v-icon>
            {{ urgentCount }} urgent
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="pending-progress rounded-pill overflow-hidden d-flex mb-2" style="height: 6px;">
          <div :style="{
            width: urgencyPercentage('urgent') + '%',
            background: 'rgb(var(--v-theme-error))'
          }"></div>
          <div :style="{
            width: urgencyPercentage('normal') + '%',
            background: 'rgb(var(--v-theme-warning))'
          }"></div>
          <div :style="{
            width: urgencyPercentage('low') + '%',
            background: 'rgb(var(--v-theme-primary-lighten-3))'
          }"></div>
        </div>

        <!-- Legend -->
        <div class="d-flex flex-wrap align-center ga-4 text-caption text-medium-emphasis">
          <span class="d-flex align-center ga-1">
            <span class="pending-dot pending-dot-error"></span>
            Urgent <strong class="text-on-surface">{{ urgentCount }}</strong>
          </span>
          <span class="d-flex align-center ga-1">
            <span class="pending-dot pending-dot-warning"></span>
            Normal <strong class="text-on-surface">{{ normalCount }}</strong>
          </span>
          <span class="d-flex align-center ga-1">
            <span class="pending-dot pending-dot-low"></span>
            Low <strong class="text-on-surface">{{ lowCount }}</strong>
          </span>
        </div>
      </div>

      <!-- Pending Items List -->
      <div class="pending-items-container">
        <v-list density="compact" class="bg-transparent">
          <v-list-item
            v-for="action in pendingActions"
            :key="action.id"
            class="pending-action-list-item"
            :class="{ 'pending-list-last': action === pendingActions[pendingActions.length - 1] }"
            @click="handleActionClick(action)"
          >
            <!-- Icon -->
            <template #prepend>
              <v-avatar size="44" color="primary" variant="tonal" class="pending-avatar">
                <v-icon size="20" color="primary">
                  {{ action.icon }}
                </v-icon>
              </v-avatar>
            </template>

            <!-- Main Information -->
            <div class="pending-content">
              <div class="d-flex align-center ga-2">
                <span class="text-body-1 font-weight-bold pending-title text-truncate">
                  {{ action.name }}
                </span>
                <v-chip
                  :color="urgencyColor(action.urgency)"
                  size="x-small"
                  variant="tonal"
                  class="font-weight-bold text-uppercase pending-urgency-chip"
                  style="height: 20px; font-size: 9px; letter-spacing: 0.3px; flex-shrink: 0;"
                >
                  {{ action.urgency }}
                </v-chip>
              </div>
              <v-list-item-subtitle class="pending-subtitle text-truncate">
                <span class="text-caption text-medium-emphasis">
                  {{ action.ref }}
                </span>
              </v-list-item-subtitle>
            </div>

            <!-- Status + Date + Chevron -->
            <template #append>
              <div class="d-flex align-center ga-3 pending-right-section">
                <!-- Status & Date (hidden on mobile) -->
                <div class="d-none d-md-flex flex-column align-end text-right pending-datetime">
                  <span class="text-caption font-weight-medium" style="color: rgb(var(--v-theme-error)); white-space: nowrap;">
                    <span class="pending-status-dot"></span>
                    {{ action.status }}
                  </span>
                  <span class="text-caption" style="color: rgb(var(--v-theme-textMuted)); white-space: nowrap;">
                    {{ action.date }}
                  </span>
                </div>

                <!-- Chevron -->
                <v-btn
                  icon
                  size="x-small"
                  variant="text"
                  color="primary"
                  class="pending-detail-btn"
                  style="flex-shrink: 0;"
                >
                  <v-icon size="16">mdi-chevron-right</v-icon>
                </v-btn>
              </div>
            </template>
          </v-list-item>
        </v-list>

        <!-- Empty State -->
        <div v-if="pendingActions.length === 0" class="empty-state pa-6 text-center">
          <v-icon size="48" color="primary" class="mb-3" opacity="0.5">mdi-check-circle-outline</v-icon>
          <div class="text-h6 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            No pending action
          </div>
          <div class="text-body-2 text-medium-emphasis">
            All caught up! No pending requests.
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {
  usePendingActions,
  type PendingAction,
} from '@/composables/usePendingActions'

// Emits
const emit = defineEmits<{
  (e: 'navigate', page: string): void
}>()

const {
  pendingActions,
  urgentCount,
  normalCount,
  lowCount,
  urgencyPercentage,
  urgencyColor
} = usePendingActions()

// Action Handlers
const handleActionClick = (action: PendingAction) => {
  console.log('Clicked pending action:', action)
  emit('navigate', '') // Change to Pending Action Details in Future
}
</script>

<style scoped>
.pending-action-wrapper {
  width: 100%;
  max-width: 100%;
  padding: 16px 0;
}

.text-on-surface {
  color: rgb(var(--v-theme-on-surface)) !important;
}

/* Summary Section - Sticky */
.summary-section {
  position: sticky;
  top: 0;
  background: rgb(var(--v-theme-surface));
  z-index: 1;
  border-radius: 12px 12px 0 0;
}

.border-bottom {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

/* Progress Bar */
.pending-progress {
  width: 100%;
  background: rgba(var(--v-theme-on-surface), 0.06);
}

/* Legend Dots */
.pending-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.pending-dot-error {
  background: rgb(var(--v-theme-error));
}

.pending-dot-warning {
  background: rgb(var(--v-theme-warning));
}

.pending-dot-low {
  background: rgb(var(--v-theme-primary-lighten-3));
}

/* Status Dot */
.pending-status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgb(var(--v-theme-error));
  margin-right: 4px;
}

/* Pending Items Container */
.pending-items-container {
  max-height: 520px;
  overflow-y: auto;
}

/* Pending List Items */
.pending-action-list-item {
  min-height: 76px !important;
  padding: 12px 16px !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  border-radius: 0 !important;
  cursor: pointer;
  transition: background 0.15s ease;
}

.pending-action-list-item:hover {
  background: rgba(var(--v-theme-primary), 0.04);
}

.pending-list-last {
  border-bottom: none !important;
}

.pending-avatar {
  background: var(--v-theme-primaryBg) !important;
  border: 1.5px solid rgba(var(--v-theme-primary), 0.10) !important;
  flex-shrink: 0 !important;
  margin-right: 14px !important;
}

.pending-content {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}

.pending-title {
  color: rgb(var(--v-theme-on-surface)) !important;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pending-subtitle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.pending-urgency-chip {
  text-transform: uppercase;
  flex-shrink: 0;
}

/* Right section - Status/Date */
.pending-right-section {
  flex-shrink: 0;
  min-width: 160px;
}

.pending-datetime {
  min-width: 130px;
}

.pending-detail-btn {
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.pending-action-list-item:hover .pending-detail-btn {
  opacity: 1;
}

/* Empty State */
.empty-state {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Scrollbar Styling */
.pending-items-container::-webkit-scrollbar {
  width: 4px;
}

.pending-items-container::-webkit-scrollbar-track {
  background: transparent;
}

.pending-items-container::-webkit-scrollbar-thumb {
  background: rgba(15, 157, 154, 0.3);
  border-radius: 4px;
}

.pending-items-container::-webkit-scrollbar-thumb:hover {
  background: rgba(15, 157, 154, 0.5);
}

/* Dark Mode Overrides */
:deep(.dark) .pending-action-list-item {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

:deep(.dark) .pending-action-list-item:hover {
  background: rgba(15, 157, 154, 0.12);
}

:deep(.dark) .pending-avatar {
  background: rgba(15, 157, 154, 0.15) !important;
  border-color: rgba(15, 157, 154, 0.2) !important;
}

:deep(.dark) .summary-section {
  background: rgb(var(--v-theme-surface));
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .pending-action-list-item {
    min-height: 68px !important;
    padding: 10px 12px !important;
  }

  .pending-avatar {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    margin-right: 10px !important;
  }

  .pending-avatar .v-icon {
    font-size: 16px !important;
  }

  .pending-title {
    font-size: 14px !important;
  }

  .pending-urgency-chip {
    font-size: 7px !important;
    height: 16px !important;
    padding: 0 6px !important;
  }

  .pending-right-section {
    min-width: auto;
    gap: 6px !important;
  }

  .pending-datetime {
    min-width: 70px !important;
  }

  .pending-datetime span {
    font-size: 9px !important;
  }

  .pending-detail-btn {
    opacity: 1 !important;
  }
}

@media (max-width: 600px) {
  .pending-datetime {
    min-width: 60px !important;
  }
}
</style>
