<!-- src/views/RecentActivities.vue -->
<template>
  <div class="recent-activities-page">
    <!-- HEADER SECTION -->
    <div class="page-header d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
      <div class="d-flex align-center ga-3">
        <v-avatar size="48" rounded="lg" color="primary" variant="tonal">
          <v-icon size="24" color="primary">mdi-clock-outline</v-icon>
        </v-avatar>
        <div>
          <h1 class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            Recent Activities
          </h1>
          <p class="text-body-2 text-medium-emphasis mt-0 mb-0">
            Your recent system activities and actions
          </p>
        </div>
      </div>
      <v-btn
        variant="outlined"
        rounded="lg"
        color="primary"
        prepend-icon="mdi-arrow-left"
        @click="$router.back()"
      >
        Back
      </v-btn>
    </div>

    <!-- SEARCH AND FILTER SECTION -->
    <v-card class="rounded-xl mb-4" elevation="0" border>
      <v-card-text class="pa-4">
        <v-row dense align="center">
          <v-col cols="12" md="6" lg="5">
            <v-text-field
              v-model="searchQuery"
              density="compact"
              variant="outlined"
              placeholder="Search activities..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
              rounded="lg"
              class="activity-search"
            />
          </v-col>
          <v-col cols="12" md="6" lg="7">
            <div class="d-flex flex-wrap align-center ga-2">
              <v-select
                v-model="selectedType"
                :items="activityTypes"
                density="compact"
                variant="outlined"
                placeholder="All Types"
                hide-details
                rounded="lg"
                class="activity-filter-select"
                style="min-width: 140px;"
              />
              <v-select
                v-model="selectedTimeRange"
                :items="timeRanges"
                density="compact"
                variant="outlined"
                placeholder="All Time"
                hide-details
                rounded="lg"
                class="activity-filter-select"
                style="min-width: 140px;"
              />
              <v-btn
                variant="text"
                color="primary"
                rounded="lg"
                size="small"
                @click="resetFilters"
              >
                <v-icon left size="16">mdi-restore</v-icon>
                Reset
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- ACTIVITY LOG LIST -->
    <v-card class="rounded-xl" elevation="0" border>
      <v-card-text class="pa-0">
        <v-list density="compact" class="bg-transparent">
          <template v-for="(activity, index) in paginatedActivities" :key="activity.id">
            <v-list-item
              class="activity-list-item"
              :class="{ 'activity-list-last': index === paginatedActivities.length - 1 }"
            >
              <!-- ICON -->
              <template #prepend>
                <v-avatar size="44" color="primary" variant="tonal" class="activity-avatar">
                  <v-icon size="20" color="primary">
                    {{ activity.icon }}
                  </v-icon>
                </v-avatar>
              </template>

              <!-- MAIN CONTENT -->
              <div class="activity-content">
                <div class="d-flex align-center ga-2">
                  <span class="text-body-1 font-weight-bold activity-title text-truncate">
                    {{ activity.action }}
                  </span>
                  <!-- Chip next to activity name -->
                  <v-chip
                    :color="getActivityTypeColor(activity.type)"
                    size="x-small"
                    variant="tonal"
                    class="font-weight-bold text-uppercase activity-type-chip"
                    style="height: 20px; font-size: 9px; letter-spacing: 0.3px; flex-shrink: 0;"
                  >
                    {{ activity.type }}
                  </v-chip>
                </div>
                <v-list-item-subtitle class="activity-subtitle text-truncate">
                  <span class="text-caption text-medium-emphasis">
                    {{ activity.details || activity.action }}
                  </span>
                </v-list-item-subtitle>
              </div>

              <!-- RIGHT SECTION -->
              <template #append>
                <div class="d-flex align-center ga-3 activity-right-section">
                  <!-- Date & Time -->
                  <div class="d-flex flex-column align-end text-right activity-datetime" style="flex-shrink: 0; min-width: 130px;">
                    <span class="text-caption font-weight-medium" style="color: rgb(var(--v-theme-on-surface)); white-space: nowrap;">
                      {{ activity.date }}
                    </span>
                    <span class="text-caption" style="color: rgb(var(--v-theme-textMuted)); white-space: nowrap;">
                      {{ activity.time }}
                      <span class="font-weight-medium" :style="{ color: getRelativeTimeColor(activity.relativeTime) }">
                        • {{ activity.relativeTime }}
                      </span>
                    </span>
                  </div>

                  <!-- Chevron -->
                  <v-btn
                    icon
                    size="x-small"
                    variant="text"
                    color="primary"
                    class="activity-detail-btn"
                    style="flex-shrink: 0;"
                  >
                    <v-icon size="16">mdi-chevron-right</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-list-item>
          </template>

          <!-- EMPTY STATE -->
          <div v-if="filteredActivities.length === 0" class="empty-state pa-6 text-center">
            <v-icon size="48" color="primary" class="mb-3">mdi-clock-remove-outline</v-icon>
            <div class="text-h6 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
              No activities found
            </div>
            <div class="text-body-2 text-medium-emphasis">
              Try adjusting your search or filters
            </div>
          </div>
        </v-list>
      </v-card-text>

      <!-- PAGINATION -->
      <v-divider v-if="filteredActivities.length > 0" />
      <v-card-actions v-if="filteredActivities.length > 0" class="pa-3">
        <v-spacer />
        <div class="d-flex align-center ga-2">
          <span class="text-caption text-medium-emphasis">
            Showing {{ paginationStart + 1 }} – {{ Math.min(paginationStart + pageSize, filteredActivities.length) }}
            of {{ filteredActivities.length }}
          </span>
          <v-btn
            variant="text"
            icon
            size="small"
            color="primary"
            :disabled="paginationStart === 0"
            @click="paginationStart = Math.max(0, paginationStart - pageSize)"
          >
            <v-icon size="18">mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            variant="text"
            icon
            size="small"
            color="primary"
            :disabled="paginationStart + pageSize >= filteredActivities.length"
            @click="paginationStart += pageSize"
          >
            <v-icon size="18">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const searchQuery = ref('')
const selectedType = ref('All')
const selectedTimeRange = ref('All Time')
const paginationStart = ref(0)
const pageSize = 10

const activityTypes = [
  'All',
  'Login',
  'Logout',
  'Navigation',
  'Action',
  'Update',
  'View',
  'System'
]

const timeRanges = [
  'All Time',
  'Today',
  'This Week',
  'This Month',
  'Last 3 Months'
]

const activities = ref([
  {
    id: 1,
    action: 'Logged in to the system',
    date: '27 Aug 2026',
    time: '02:15 PM',
    relativeTime: '2 Minutes Ago',
    type: 'Login',
    icon: 'mdi-login',
    details: 'Successful login from IP 192.168.1.100'
  },
  {
    id: 2,
    action: 'Updated Quick Access shortcuts',
    date: '27 Aug 2026',
    time: '02:02 PM',
    relativeTime: '15 Minutes Ago',
    type: 'Update',
    icon: 'mdi-lightning-bolt',
    details: 'Reordered and added 2 new shortcuts'
  },
  {
    id: 3,
    action: 'Completed pending action',
    date: '27 Aug 2026',
    time: '01:15 PM',
    relativeTime: '1 Hour Ago',
    type: 'Action',
    icon: 'mdi-check-circle',
    details: 'Approved Leave Application LA-2026-000123'
  },
  {
    id: 4,
    action: 'Checked Calendar events',
    date: '27 Aug 2026',
    time: '12:15 PM',
    relativeTime: '2 Hours Ago',
    type: 'View',
    icon: 'mdi-calendar-check',
    details: 'Viewed upcoming 5 events for this week'
  },
  {
    id: 5,
    action: 'Viewed Announcements',
    date: '27 Aug 2026',
    time: '11:15 AM',
    relativeTime: '3 Hours Ago',
    type: 'View',
    icon: 'mdi-bullhorn',
    details: 'Viewed 3 new announcements'
  },
  {
    id: 6,
    action: 'Viewed Recent Activities',
    date: '27 Aug 2026',
    time: '11:10 AM',
    relativeTime: '3 Hours Ago',
    type: 'View',
    icon: 'mdi-clock',
    details: 'Visited Recent Activities page'
  },
  {
    id: 7,
    action: 'Submitted Purchase Requisition',
    date: '27 Aug 2026',
    time: '10:45 AM',
    relativeTime: '4 Hours Ago',
    type: 'Action',
    icon: 'mdi-file-document-outline',
    details: 'PR-2026-000987 for IT equipment'
  },
  {
    id: 8,
    action: 'Logged out of the system',
    date: '27 Aug 2026',
    time: '10:30 AM',
    relativeTime: '4 Hours Ago',
    type: 'Logout',
    icon: 'mdi-logout',
    details: 'Session duration: 2 hours 15 minutes'
  },
  {
    id: 9,
    action: 'Changed password',
    date: '26 Aug 2026',
    time: '05:20 PM',
    relativeTime: 'Yesterday',
    type: 'Update',
    icon: 'mdi-lock-reset',
    details: 'Password updated successfully'
  },
  {
    id: 10,
    action: 'Updated profile information',
    date: '26 Aug 2026',
    time: '04:45 PM',
    relativeTime: 'Yesterday',
    type: 'Update',
    icon: 'mdi-account-edit',
    details: 'Updated job title and department'
  },
  {
    id: 11,
    action: 'Viewed Dashboard',
    date: '26 Aug 2026',
    time: '09:00 AM',
    relativeTime: 'Yesterday',
    type: 'View',
    icon: 'mdi-view-dashboard',
    details: 'Dashboard overview'
  },
  {
    id: 12,
    action: 'System maintenance completed',
    date: '25 Aug 2026',
    time: '11:30 PM',
    relativeTime: '2 Days Ago',
    type: 'System',
    icon: 'mdi-server',
    details: 'Database backup and performance optimization'
  }
])

const filteredActivities = computed(() => {
  let result = [...activities.value]

  // Search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    result = result.filter(a =>
      a.action.toLowerCase().includes(query) ||
      a.type.toLowerCase().includes(query) ||
      (a.details && a.details.toLowerCase().includes(query))
    )
  }

  // Type filter
  if (selectedType.value !== 'All') {
    result = result.filter(a => a.type === selectedType.value)
  }

  // Time range filter
  if (selectedTimeRange.value !== 'All Time') {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    result = result.filter(a => {
      const dateParts = a.date.split(' ')
      const day = parseInt(dateParts[0])
      const monthMap: Record<string, number> = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      }
      const month = monthMap[dateParts[1]]
      const year = parseInt(dateParts[2])
      const activityDate = new Date(year, month, day)

      switch (selectedTimeRange.value) {
        case 'Today':
          return activityDate >= today
        case 'This Week': {
          const weekStart = new Date(today)
          weekStart.setDate(today.getDate() - today.getDay())
          return activityDate >= weekStart
        }
        case 'This Month': {
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)
          return activityDate >= monthStart
        }
        case 'Last 3 Months': {
          const threeMonthsAgo = new Date(today)
          threeMonthsAgo.setMonth(today.getMonth() - 3)
          return activityDate >= threeMonthsAgo
        }
        default:
          return true
      }
    })
  }

  // Sort by date descending (newest first)
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  }

  result.sort((a, b) => {
    const aParts = a.date.split(' ')
    const bParts = b.date.split(' ')
    const aDate = new Date(
      parseInt(aParts[2]),
      monthMap[aParts[1]],
      parseInt(aParts[0])
    )
    const bDate = new Date(
      parseInt(bParts[2]),
      monthMap[bParts[1]],
      parseInt(bParts[0])
    )
    return bDate.getTime() - aDate.getTime()
  })

  return result
})

const paginatedActivities = computed(() => {
  const start = paginationStart.value
  const end = Math.min(start + pageSize, filteredActivities.value.length)
  return filteredActivities.value.slice(start, end)
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = 'All'
  selectedTimeRange.value = 'All Time'
  paginationStart.value = 0
}

const getActivityTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    Login: 'primary',
    Logout: 'grey',
    Navigation: 'info',
    Action: 'success',
    Update: 'warning',
    View: 'primary-lighten-1',
    System: 'purple'
  }
  return colors[type] || 'grey'
}

const getRelativeTimeColor = (relativeTime: string): string => {
  if (relativeTime.includes('Minute') || relativeTime.includes('Hour')) {
    return 'rgb(var(--v-theme-primary))'
  }
  if (relativeTime.includes('Yesterday') || relativeTime.includes('Day')) {
    return 'rgb(var(--v-theme-warning))'
  }
  return 'rgb(var(--v-theme-textMuted))'
}

watch([searchQuery, selectedType, selectedTimeRange], () => {
  paginationStart.value = 0
})
</script>

<style scoped>
.recent-activities-page {
  width: 100%;
  padding: 16px 0;
}

.page-header {
  width: 100%;
}

/* Search & Filters */
.activity-search :deep(.v-field) {
  border-radius: 12px !important;
}

.activity-search :deep(.v-field__input) {
  font-size: 14px !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
}

.activity-filter-select :deep(.v-field) {
  border-radius: 12px !important;
  min-height: 40px !important;
}

.activity-filter-select :deep(.v-field__input) {
  font-size: 13px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

/* Activity List Items */
.activity-list-item {
  min-height: 76px !important;
  padding: 12px 16px !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  border-radius: 0 !important;
  cursor: pointer;
  transition: background 0.15s ease;
}

.activity-list-item:hover {
  background: rgba(var(--v-theme-primary), 0.04);
}

.activity-list-last {
  border-bottom: none !important;
}

.activity-avatar {
  background: var(--v-theme-primaryBg) !important;
  border: 1.5px solid rgba(var(--v-theme-primary), 0.10) !important;
  flex-shrink: 0 !important;
  margin-right: 14px !important;
}

.activity-content {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}

.activity-title {
  color: rgb(var(--v-theme-on-surface)) !important;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.activity-subtitle {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

.activity-type-chip {
  text-transform: uppercase;
  flex-shrink: 0;
}

/* Right section - Date/Time */
.activity-right-section {
  flex-shrink: 0;
  min-width: 160px;
}

.activity-datetime {
  min-width: 130px;
}

.activity-detail-btn {
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.activity-list-item:hover .activity-detail-btn {
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

/* Responsive */
@media (max-width: 767px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
  }

  .page-header .v-btn {
    align-self: flex-start;
  }

  .activity-filter-select {
    min-width: 120px !important;
    flex: 1 1 auto;
  }

  .activity-list-item {
    min-height: 68px !important;
    padding: 10px 12px !important;
  }

  .activity-avatar {
    width: 36px !important;
    height: 36px !important;
    min-width: 36px !important;
    margin-right: 10px !important;
  }

  .activity-avatar .v-icon {
    font-size: 16px !important;
  }

  .activity-title {
    font-size: 14px !important;
  }

  .activity-type-chip {
    font-size: 7px !important;
    height: 16px !important;
    padding: 0 6px !important;
  }

  .activity-right-section {
    min-width: auto;
    gap: 6px !important;
  }

  .activity-datetime {
    min-width: 70px !important;
  }

  .activity-datetime span {
    font-size: 9px !important;
  }

  .activity-detail-btn {
    opacity: 1 !important;
  }
}

@media (max-width: 600px) {
  .activity-datetime {
    min-width: 60px !important;
  }
}

/* Dark Mode */
:deep(.dark) .activity-list-item {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

:deep(.dark) .activity-list-item:hover {
  background: rgba(15, 157, 154, 0.12);
}

:deep(.dark) .activity-avatar {
  background: rgba(15, 157, 154, 0.15) !important;
  border-color: rgba(15, 157, 154, 0.2) !important;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(15, 157, 154, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(15, 157, 154, 0.5);
}
</style>
