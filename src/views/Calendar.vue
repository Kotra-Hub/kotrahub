<!-- src/views/Calendar.vue -->
<template>
  <div class="calendar-page">
    <!-- HEADER SECTION -->
    <div class="page-header d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
      <div class="d-flex align-center ga-3">
        <v-avatar size="48" rounded="lg" color="primary" variant="tonal">
          <v-icon size="24" color="primary">mdi-calendar</v-icon>
        </v-avatar>
        <div>
          <h1 class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            Calendar
          </h1>
          <p class="text-body-2 text-medium-emphasis mt-0 mb-0">
            View company events, leave schedules and important upcoming dates.
          </p>
        </div>
      </div>
      <v-btn
        variant="outlined"
        rounded="lg"
        color="primary"
        prepend-icon="mdi-arrow-left"
        @click="$emit('navigate', 'dashboard')"
      >
        Back
      </v-btn>
    </div>

    <!-- FILTERS SECTION -->
    <v-card class="rounded-xl mb-4" elevation="0" border>
      <v-card-text class="pa-4">
        <v-row dense align="center">
          <v-col cols="12" md="4" lg="3">
            <v-select
              v-model="calendarCategoryFilter"
              :items="categoryOptions"
              density="compact"
              variant="outlined"
              label="Category"
              hide-details
              rounded="lg"
              class="calendar-filter-select"
            />
          </v-col>
          <v-col cols="12" md="6" lg="7">
            <v-text-field
              v-model="calendarSearch"
              density="compact"
              variant="outlined"
              placeholder="Search anything..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
              rounded="lg"
              class="calendar-search"
            />
          </v-col>
          <v-col cols="12" md="2" lg="2" class="text-right">
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- MAIN CALENDAR + UPCOMING EVENTS -->
    <v-row no-gutters style="align-items: stretch;">
      <!-- Calendar Grid -->
      <v-col cols="12" lg="8" class="pr-0 pr-lg-3">
        <v-card class="rounded-xl" elevation="0" border>
          <!-- Calendar Toolbar -->
          <v-card-text class="pa-0">
            <div class="calendar-toolbar">
              <div class="toolbar-left">
                <v-btn
                  variant="outlined"
                  size="small"
                  rounded="lg"
                  class="nav-btn"
                  @click="navigateCalendar(-1)"
                >
                  <v-icon size="18">mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="small"
                  rounded="lg"
                  class="nav-btn"
                  @click="navigateCalendar(1)"
                >
                  <v-icon size="18">mdi-chevron-right</v-icon>
                </v-btn>
                <v-btn
                  variant="outlined"
                  size="small"
                  rounded="lg"
                  class="today-btn"
                  @click="goToTodayCalendar"
                >
                  Today
                </v-btn>
              </div>

              <span class="calendar-title text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
                {{ calendarDisplayLabel }}
              </span>

              <div class="toolbar-right">
                <v-btn
                  v-for="view in viewOptions"
                  :key="view.value"
                  size="small"
                  rounded="lg"
                  class="view-btn"
                  :variant="calendarViewMode === view.value ? 'flat' : 'outlined'"
                  :color="calendarViewMode === view.value ? 'primary' : undefined"
                  @click="setCalendarView(view.value)"
                  :style="calendarViewMode === view.value ? 'color: white;' : ''"
                >
                  {{ view.label }}
                </v-btn>
              </div>
            </div>

            <v-divider />

            <!-- LOADING STATE -->
            <div v-if="!holidaysLoaded" class="d-flex flex-column align-center justify-center pa-8" style="min-height: 400px;">
              <v-progress-circular indeterminate color="primary" size="40" />
              <span class="text-body-2 text-medium-emphasis mt-3">Loading holidays...</span>
            </div>

            <!-- MONTH VIEW -->
            <div v-else-if="calendarViewMode === 'month'" class="pa-3">
              <div class="calendar-week-header">
                <div class="grid grid-cols-7">
                  <div v-for="day in ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']" :key="day" class="text-center text-caption font-weight-bold py-2" style="color: rgb(var(--v-theme-textMuted));">
                    {{ day }}
                  </div>
                </div>
              </div>

              <div class="calendar-grid-container">
                <div v-for="(row, rowIndex) in calendarRows" :key="rowIndex" class="grid grid-cols-7">
                  <div
                    v-for="cell in row"
                    :key="cell.dateStr"
                    class="calendar-cell"
                    :class="{
                      'calendar-cell-other-month': cell.otherMonth,
                      'calendar-cell-today': cell.isToday,
                      'calendar-cell-clickable': !cell.otherMonth && getFilteredEvents(cell.events, calendarCategoryFilter, calendarSearch).length > 0
                    }"
                    @click="!cell.otherMonth && getFilteredEvents(cell.events, calendarCategoryFilter, calendarSearch).length > 0 && openEventDialog(cell.dateStr, cell.events)"
                  >
                    <div class="calendar-cell-inner">
                      <div class="d-flex align-center justify-space-between">
                        <span class="text-subtitle-2 font-weight-semibold" :class="cell.isToday ? 'text-primary font-weight-bold' : ''">
                          {{ cell.label }}
                        </span>
                        <v-chip v-if="cell.isToday" size="x-small" color="primary" class="text-white font-weight-bold text-caption px-2 today-chip">
                          Today
                        </v-chip>
                      </div>

                      <div v-if="!cell.otherMonth && getFilteredEvents(cell.events, calendarCategoryFilter, calendarSearch).length" class="mt-2 d-flex flex-wrap gap-1">
                        <div
                          v-for="(event, eventIndex) in getFilteredEvents(cell.events, calendarCategoryFilter, calendarSearch).slice(0, 3)"
                          :key="eventIndex"
                          class="position-relative event-dot-wrapper"
                          @click.stop
                        >
                          <span
                            class="d-block rounded-sm cursor-help transition-transform event-dot"
                            :class="getCalendarDotColor(event.type)"
                          ></span>

                          <!-- Hover tooltip -->
                          <div class="event-tooltip">
                            <div class="tooltip-content">
                              <div class="d-flex align-center gap-2">
                                <span class="rounded-sm" :class="getCalendarDotColor(event.type)" style="width: 8px; height: 8px; flex-shrink: 0;"></span>
                                <span class="font-weight-bold text-body-2">{{ event.title }}</span>
                              </div>
                              <div class="text-caption text-medium-emphasis mt-1">{{ event.time || 'All Day' }}</div>
                              <div class="text-caption text-medium-emphasis">{{ event.category || 'Event' }}</div>
                            </div>
                          </div>
                        </div>
                        <span v-if="getFilteredEvents(cell.events, calendarCategoryFilter, calendarSearch).length > 3" class="text-caption text-medium-emphasis">+{{ getFilteredEvents(cell.events, calendarCategoryFilter, calendarSearch).length - 3 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- WEEK VIEW -->
            <div v-else-if="calendarViewMode === 'week'" class="pa-3">
              <div class="grid grid-cols-7 week-grid">
                <div v-for="day in weekDays" :key="day.dateStr" class="week-day-col">
                  <div class="text-center pa-3 border-bottom" :class="day.isToday ? 'bg-primary-lighten-5' : ''" style="border-color: rgba(var(--v-theme-on-surface), 0.06);">
                    <div class="text-caption font-weight-bold text-uppercase" style="color: rgb(var(--v-theme-textMuted));">{{ day.weekday }}</div>
                    <v-btn
                      size="small"
                      icon
                      class="mt-1 font-weight-bold"
                      :class="day.isToday ? 'bg-primary text-white' : ''"
                      variant="text"
                      @click="setCalendarView('day'); calendarFocusDate = new Date(day.dateStr)"
                    >
                      {{ day.day }}
                    </v-btn>
                  </div>
                  <div class="pa-2 day-events-list">
                    <v-card
                      v-for="(event, idx) in getFilteredEvents(day.events, calendarCategoryFilter, calendarSearch)"
                      :key="idx"
                      class="rounded-lg mb-1 pa-2 week-event-card"
                      variant="outlined"
                      flat
                      density="compact"
                      style="border-color: rgba(var(--v-theme-on-surface), 0.06);"
                    >
                      <div class="d-flex align-start gap-2">
                        <span class="mt-1 rounded-sm" :class="getCalendarDotColor(event.type)" style="width: 8px; height: 8px; flex-shrink: 0;"></span>
                        <div class="min-w-0">
                          <div class="text-subtitle-2 font-weight-medium text-truncate" style="color: rgb(var(--v-theme-on-surface));">{{ event.title }}</div>
                          <div class="text-caption" style="color: rgb(var(--v-theme-textMuted));">{{ event.time || 'All Day' }}</div>
                        </div>
                      </div>
                    </v-card>
                    <div v-if="getFilteredEvents(day.events, calendarCategoryFilter, calendarSearch).length === 0" class="text-center text-caption py-3" style="color: rgb(var(--v-theme-textMuted)); opacity: 0.4;">No events</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- DAY VIEW -->
            <div v-else-if="calendarViewMode === 'day'" class="pa-3">
              <v-card rounded="xl" border style="background: rgb(var(--v-theme-surface));">
                <v-card-text class="pa-4">
                  <div class="d-flex align-center justify-space-between">
                    <div>
                      <div class="text-caption font-weight-bold text-uppercase" style="color: rgb(var(--v-theme-textMuted));">
                        {{ dayData.weekday }}
                      </div>
                      <div class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
                        {{ dayData.day }} {{ dayData.month }} {{ dayData.year }}
                      </div>
                    </div>
                    <v-chip v-if="dayData.isToday" color="primary" class="text-white font-weight-bold">
                      Today
                    </v-chip>
                  </div>

                  <v-divider class="my-3" />

                  <div class="day-events-list" style="min-height: 320px;">
                    <v-card
                      v-for="(event, idx) in getFilteredEvents(dayData.events, calendarCategoryFilter, calendarSearch)"
                      :key="idx"
                      rounded="lg"
                      class="mb-2 day-event-card"
                      @click="openEventDialog(dayData.dateStr, [event])"
                      style="background: rgb(var(--v-theme-surface)); cursor: pointer;"
                    >
                      <v-card-text class="pa-3">
                        <div class="d-flex align-start ga-3">
                          <v-avatar size="40" rounded="lg" :class="getEventIconClass(event.type)">
                            <v-icon size="18" :color="getEventIconColor(event.type)">
                              {{ getEventIcon(event.type) }}
                            </v-icon>
                          </v-avatar>
                          <div class="min-w-0 flex-grow-1">
                            <div class="text-body-1 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
                              {{ event.title }}
                            </div>
                            <div class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                              {{ event.time || 'All Day' }}
                              <span v-if="event.category">• {{ event.category }}</span>
                            </div>
                            <div class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                              <v-icon size="12">mdi-map-marker</v-icon>
                              {{ event.location || 'Kotra Pharma' }}
                            </div>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>

                    <div v-if="getFilteredEvents(dayData.events, calendarCategoryFilter, calendarSearch).length === 0" class="d-flex flex-column align-center justify-center py-8" style="color: rgb(var(--v-theme-textMuted));">
                      <v-icon size="48" class="mb-2 opacity-50">mdi-calendar-blank-outline</v-icon>
                      <span class="text-body-1">No events for this day</span>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- RIGHT COLUMN -->
      <v-col cols="12" lg="4" class="pt-3 pt-lg-0">
        <v-row no-gutters class="flex-column ga-3" style="height: 100%;">
          <!-- Upcoming Events -->
          <v-col>
            <v-card class="rounded-xl h-100" elevation="0" border>
              <v-card-text class="pa-0">
                <div class="d-flex align-center justify-space-between pa-4 pb-2">
                  <div class="d-flex align-center ga-2">
                    <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                      <v-icon size="18" color="primary">mdi-calendar-check</v-icon>
                    </v-avatar>
                    <span class="text-subtitle-1 font-weight-bold text-uppercase">Upcoming Events</span>
                  </div>
                  <v-btn variant="text" size="small" color="primary" class="font-weight-bold" @click="$emit('navigate', 'calendar')">
                    View All <v-icon size="14" class="ml-1">mdi-arrow-right</v-icon>
                  </v-btn>
                </div>

                <v-divider />

                <div class="pa-3">
                  <template v-for="(event, idx) in upcomingEvents" :key="event.dateStr + '-' + event.title + '-' + idx">
                    <div class="d-flex align-start ga-3 py-3" :class="idx < upcomingEvents.length - 1 ? 'border-bottom' : ''" style="border-color: rgba(var(--v-theme-on-surface), 0.06);">
                      <div class="text-center" style="min-width: 50px;">
                        <div class="text-h6 font-weight-bold" style="color: rgb(var(--v-theme-primary));">
                          {{ String(event.day).padStart(2, '0') }}
                        </div>
                        <div class="text-caption font-weight-bold text-uppercase" style="color: rgb(var(--v-theme-textMuted)); font-size: 9px;">
                          {{ event.monthLabel }}
                        </div>
                      </div>
                      <div class="d-flex align-start ga-2 min-w-0">
                        <span class="rounded-lg d-inline-block mt-1" :class="getCalendarDotColor(event.type)" style="width: 8px; height: 8px; flex-shrink: 0;"></span>
                        <div class="min-w-0">
                          <div class="text-body-2 font-weight-semibold text-truncate" style="color: rgb(var(--v-theme-on-surface));">
                            {{ event.title }}
                          </div>
                          <div class="text-caption text-truncate" style="color: rgb(var(--v-theme-textMuted));">
                            {{ event.category }} • {{ event.time || 'All Day' }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>

                  <div v-if="upcomingEvents.length === 0" class="text-center py-4 text-body-2" style="color: rgb(var(--v-theme-textMuted));">
                    No upcoming events
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Legend -->
          <v-col>
            <v-card class="rounded-xl" elevation="0" border>
              <v-card-text class="pa-4">
                <div class="d-flex align-center justify-space-between mb-3">
                  <span class="text-subtitle-2 font-weight-bold text-uppercase" style="color: rgb(var(--v-theme-on-surface));">Legend</span>
                  <v-icon size="18" style="color: rgb(var(--v-theme-textMuted));">mdi-information-outline</v-icon>
                </div>
                <v-row dense>
                  <v-col v-for="legend in legendItems" :key="legend.label" cols="6">
                    <div class="d-flex align-center ga-2 text-caption" style="color: rgb(var(--v-theme-textMuted));">
                      <span class="rounded-lg d-inline-block" :class="legend.color" style="width: 10px; height: 10px;"></span>
                      {{ legend.label }}
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- EVENT DETAIL DIALOG -->
    <v-dialog v-model="eventDialog" max-width="600" persistent>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center gap-2 pa-4">
          <v-icon color="primary" size="24" class="mr-2">mdi-calendar-star</v-icon>
          <span class="text-h6 font-weight-bold">{{ selectedEvent?.title || 'Event Details' }}</span>
          <v-spacer />
          <v-btn icon variant="text" @click="eventDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <div v-if="selectedEvent">
            <div class="d-flex align-center ga-3 mb-4">
              <v-avatar size="48" rounded="lg" :class="getEventIconClass(selectedEvent.type)">
                <v-icon size="22" :color="getEventIconColor(selectedEvent.type)">
                  {{ getEventIcon(selectedEvent.type) }}
                </v-icon>
              </v-avatar>
              <div>
                <div class="text-h6 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
                  {{ selectedEvent.title }}
                </div>
                <div class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                  {{ selectedEvent.category || 'Event' }}
                </div>
              </div>
            </div>

            <v-divider class="mb-4" />

            <div class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
              <div class="d-flex align-center ga-3 mb-2">
                <v-icon size="18" color="primary">mdi-calendar-outline</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  {{ formatEventDate(selectedEvent.dateStr || '') }}
                </span>
              </div>
              <div class="d-flex align-center ga-3 mb-2">
                <v-icon size="18" color="warning">mdi-clock-outline</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  {{ selectedEvent.time || 'All Day' }}
                </span>
              </div>
              <div class="d-flex align-center ga-3 mb-2">
                <v-icon size="18" color="error">mdi-map-marker</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  {{ selectedEvent.location || 'Kotra Pharma' }}
                </span>
              </div>
              <div class="d-flex align-center ga-3">
                <v-icon size="18" color="success">mdi-account-tie</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  Organiser: {{ selectedEvent.organiser || 'HR Department' }}
                </span>
              </div>
            </div>

            <v-divider class="my-4" />

            <div class="text-body-2" style="color: rgb(var(--v-theme-textMuted)); line-height: 1.7;">
              {{ selectedEvent.description || 'No additional details available for this event.' }}
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useCalendar,
  type CalendarEvent,
  MONTH_NAMES_LONG,
} from '@/composables/useCalendar'

// Emits
defineEmits<{
  (e: 'navigate', page: string): void
}>()

const {
  viewOptions,
  categoryOptions,
  legendItems,
  getFilteredEvents,
  buildCalendarRows,
  buildWeekDays,
  buildDayData,
  getUpcomingEvents,
  getCalendarDotColor,
  getEventIcon,
  getEventIconColor,
  getEventIconClass,
  formatEventDate
} = useCalendar()

// State
const calendarViewMode = ref<'month' | 'week' | 'day'>('month')
const calendarFocusDate = ref(new Date())
const calendarCategoryFilter = ref('all')
const calendarSearch = ref('')
const holidaysLoaded = ref(true)
const eventDialog = ref(false)
const selectedEvent = ref<CalendarEvent & { dateStr?: string } | null>(null)

// Computed
const calYear = computed(() => calendarFocusDate.value.getFullYear())
const calMonth = computed(() => calendarFocusDate.value.getMonth())
const calendarDisplayLabel = computed(() => `${MONTH_NAMES_LONG[calMonth.value]} ${calYear.value}`)

const calendarRows = computed(() => buildCalendarRows(calYear.value, calMonth.value))
const weekDays = computed(() => buildWeekDays(calendarFocusDate.value))
const dayData = computed(() => buildDayData(calendarFocusDate.value))
const upcomingEvents = computed(() => getUpcomingEvents(10))

// Navigation
const navigateCalendar = (direction: number) => {
  const newDate = new Date(calendarFocusDate.value)

  if (calendarViewMode.value === 'month') {
    newDate.setMonth(newDate.getMonth() + direction)
  } else if (calendarViewMode.value === 'week') {
    newDate.setDate(newDate.getDate() + (direction * 7))
  } else {
    newDate.setDate(newDate.getDate() + direction)
  }

  calendarFocusDate.value = newDate
}

const goToTodayCalendar = () => {
  calendarFocusDate.value = new Date()
}

const setCalendarView = (view: 'month' | 'week' | 'day') => {
  calendarViewMode.value = view
}

const resetFilters = () => {
  calendarCategoryFilter.value = 'all'
  calendarSearch.value = ''
}

// Event Dialog
const openEventDialog = (dateStr: string, events: CalendarEvent[]) => {
  if (events && events.length > 0) {
    selectedEvent.value = {
      ...events[0],
      dateStr
    }
    eventDialog.value = true
  }
}
</script>

<style scoped>
.calendar-page {
  width: 100%;
  padding: 16px 0;
}

.page-header {
  width: 100%;
}

.calendar-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  gap: 8px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-left .nav-btn {
  min-width: 36px;
  min-height: 36px;
  width: 36px;
  height: 36px;
  padding: 0;
}

.toolbar-left .today-btn {
  min-width: 72px;
  min-height: 36px;
  height: 36px;
}

.calendar-title {
  text-align: center;
  flex: 0 1 auto;
  font-size: 1.25rem;
  font-weight: 700;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-right .view-btn {
  min-width: 56px;
  min-height: 36px;
  height: 36px;
  text-transform: capitalize;
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .calendar-toolbar {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 8px 12px;
    gap: 6px;
  }

  .toolbar-left {
    order: 1;
    flex: 0 0 auto;
  }

  .calendar-title {
    order: 2;
    flex: 1 1 100%;
    text-align: center;
    font-size: 1.1rem;
    padding: 4px 0;
  }

  .toolbar-right {
    order: 3;
    flex: 0 0 auto;
    margin-left: auto;
  }

  .toolbar-right .view-btn {
    min-width: 44px;
    font-size: 0.75rem;
    padding: 0 8px;
  }

  .toolbar-left .nav-btn {
    min-width: 32px;
    min-height: 32px;
    width: 32px;
    height: 32px;
  }

  .toolbar-left .nav-btn .v-icon {
    font-size: 16px;
  }

  .toolbar-left .today-btn {
    min-width: 60px;
    min-height: 32px;
    height: 32px;
    font-size: 0.75rem;
    padding: 0 12px;
  }

  .calendar-cell {
    min-height: 56px !important;
    padding: 4px !important;
  }

  .calendar-cell .text-subtitle-2 {
    font-size: 11px !important;
  }

  .calendar-cell .today-chip {
    font-size: 7px !important;
    height: 14px !important;
    padding: 0 4px !important;
  }

  .event-dot {
    width: 8px !important;
    height: 8px !important;
  }

  .calendar-cell-inner {
    padding: 4px 6px !important;
  }

  /* Week View Mobile */
  .week-day-col {
    min-height: 140px !important;
  }

  .week-day-col .pa-3 {
    padding: 6px 4px !important;
  }

  .week-day-col .text-caption {
    font-size: 8px !important;
  }

  .week-day-col .v-btn {
    width: 28px !important;
    height: 28px !important;
    font-size: 12px !important;
  }

  .week-event-card {
    padding: 4px 6px !important;
  }

  .week-event-card .text-subtitle-2 {
    font-size: 10px !important;
  }

  .week-event-card .text-caption {
    font-size: 8px !important;
  }

  .week-event-card .gap-2 {
    gap: 4px !important;
  }

  /* Day View Mobile */
  .day-event-card .pa-3 {
    padding: 8px 12px !important;
  }

  .day-event-card .text-body-1 {
    font-size: 13px !important;
  }

  .day-event-card .text-caption {
    font-size: 11px !important;
  }

  .day-event-card .v-avatar {
    width: 32px !important;
    height: 32px !important;
  }

  .day-event-card .v-avatar .v-icon {
    font-size: 14px !important;
  }

  /* Right Column Mobile */
  .pa-4 {
    padding: 12px 16px !important;
  }

  .pa-3 {
    padding: 8px 12px !important;
  }

  .text-h5 {
    font-size: 1.1rem !important;
  }

  .text-h6 {
    font-size: 0.95rem !important;
  }
}

@media (max-width: 480px) {
  .calendar-toolbar {
    padding: 6px 8px;
    gap: 4px;
  }

  .calendar-title {
    font-size: 0.95rem;
  }

  .toolbar-right .view-btn {
    min-width: 36px;
    font-size: 0.65rem;
    padding: 0 6px;
    min-height: 28px;
    height: 28px;
  }

  .toolbar-left .nav-btn {
    min-width: 28px;
    min-height: 28px;
    width: 28px;
    height: 28px;
  }

  .toolbar-left .nav-btn .v-icon {
    font-size: 14px;
  }

  .toolbar-left .today-btn {
    min-width: 48px;
    min-height: 28px;
    height: 28px;
    font-size: 0.65rem;
    padding: 0 8px;
  }

  .calendar-cell {
    min-height: 44px !important;
  }

  .calendar-cell .text-subtitle-2 {
    font-size: 9px !important;
  }

  .event-dot {
    width: 6px !important;
    height: 6px !important;
  }

  .week-day-col {
    min-height: 100px !important;
  }

  .week-day-col .pa-3 {
    padding: 4px 2px !important;
  }

  .week-day-col .v-btn {
    width: 24px !important;
    height: 24px !important;
    font-size: 10px !important;
  }
}

.grid {
  display: grid;
}

.grid-cols-7 {
  grid-template-columns: repeat(7, 1fr);
}

.calendar-week-header {
  border-bottom: 2px solid rgba(var(--v-theme-on-surface), 0.06);
  margin-bottom: 4px;
}

.calendar-grid-container {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

.calendar-cell {
  transition: background 0.15s ease;
  min-height: 88px;
  background: rgb(var(--v-theme-surface));
  cursor: default;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  position: relative;
}

.calendar-cell-other-month {
  opacity: 0.4;
  cursor: default;
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.calendar-cell-today {
  background: rgba(var(--v-theme-primary), 0.06) !important;
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: -2px;
  position: relative;
  z-index: 1;
}

.calendar-cell-clickable {
  cursor: pointer;
}

.calendar-cell-clickable:hover {
  background: rgba(var(--v-theme-primary), 0.04);
}

.calendar-cell-inner {
  padding: 8px 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.week-grid {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  border-radius: 12px;
  overflow: hidden;
}

.week-day-col {
  min-height: 360px;
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  background: rgb(var(--v-theme-surface));
}

.week-day-col:last-child {
  border-right: none;
}

.border-bottom {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

.event-dot-wrapper {
  position: relative;
}

.event-dot {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
}

.event-tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 180px;
  max-width: 280px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.event-dot-wrapper:hover .event-tooltip {
  opacity: 1;
  visibility: visible;
}

.tooltip-content {
  color: rgb(var(--v-theme-on-surface));
}

.day-events-list {
  max-height: 320px;
  overflow-y: auto;
}

/* Color utilities */
.bg-pink-500 { background-color: #ec4899; }
.bg-red-500 { background-color: #ef4444; }
.bg-purple-500 { background-color: #8b5cf6; }
.bg-blue-500 { background-color: #3b82f6; }
.bg-amber-500 { background-color: #f59e0b; }

.bg-pink-50 { background-color: rgba(236, 72, 153, 0.1); }
.bg-red-50 { background-color: rgba(239, 68, 68, 0.1); }
.bg-purple-50 { background-color: rgba(139, 92, 246, 0.1); }
.bg-blue-50 { background-color: rgba(59, 130, 246, 0.1); }
.bg-amber-50 { background-color: rgba(245, 158, 11, 0.1); }

:deep(.dark) .calendar-cell {
  border-color: rgba(255, 255, 255, 0.08) !important;
}

:deep(.dark) .calendar-cell-today {
  background: rgba(15, 157, 154, 0.12) !important;
}

:deep(.dark) .calendar-cell-clickable:hover {
  background: rgba(15, 157, 154, 0.08);
}

:deep(.dark) .calendar-grid-container {
  border-color: rgba(255, 255, 255, 0.08);
}

:deep(.dark) .week-grid {
  border-color: rgba(255, 255, 255, 0.08);
}

:deep(.dark) .week-day-col {
  border-color: rgba(255, 255, 255, 0.08);
}

:deep(.dark) .event-tooltip {
  background: #1e293b;
  border-color: rgba(255, 255, 255, 0.1);
}

.calendar-filter-select :deep(.v-field) {
  border-radius: 12px !important;
  min-height: 40px !important;
}

.calendar-search :deep(.v-field) {
  border-radius: 12px !important;
}

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
