<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard-wrapper">
    <!-- Row 1: Announcement | Quick Access -->
    <v-row class="dashboard-top-row" no-gutters>
      <!-- ANNOUNCEMENT SECTION -->
      <v-col cols="12" lg="6" class="pr-0 pr-lg-3">
        <v-card class="dashboard-card rounded-xl h-100 d-flex flex-column" elevation="0" border>
          <!-- Announcement Header -->
          <div class="d-flex align-center justify-space-between pa-4 pb-1 flex-shrink-0">
            <div class="d-flex align-center gap-2">
              <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                <v-icon size="20" color="primary">mdi-bullhorn</v-icon>
              </v-avatar>
              <span class="text-h6 font-weight-bold text-uppercase tracking-tight">
                Announcement
              </span>
            </div>
            <div class="d-flex align-center gap-1">
              <v-btn v-if="announcementExpanded" variant="outlined" size="small"
                class="d-none d-sm-flex dashboard-view-all-btn" rounded="lg" @click="viewAllAnnouncements">
                View All
              </v-btn>
            </div>
          </div>

          <!-- Announcement Content -->
          <div v-show="announcementExpanded" class="announcement-content px-4 pb-2 flex-grow-1">
            <!-- Announcement Slide Card -->
            <v-card class="announcement-slide-card rounded-xl announcement-slide-bg" elevation="0" border
              @click="openSliderNotice(currentSlide.id)">
              <v-card-text class="announcement-slide-content pa-4">
                <!-- Featured Badge -->
                <div class="d-flex align-center mb-2">
                  <v-chip size="small" class="text-uppercase font-weight-bold" density="compact"
                    style="background: rgb(var(--v-theme-primary)); color: white; height: 24px; font-size: 11px; padding: 0 14px;">
                    <v-icon left size="13" color="yellow">mdi-star</v-icon>
                    &nbsp; Featured
                  </v-chip>
                </div>

                <!-- Announcement Title -->
                <h3 class="announcement-title text-h5 font-weight-bold mt-0 mb-1">
                  {{ currentSlide.title }}
                </h3>

                <!-- Announcement Date & Time -->
                <div class="d-flex flex-wrap align-center ga-3 mt-1 text-body-1 announcement-meta">
                  <span class="d-flex align-center ga-1">
                    <v-icon size="16" color="primary">mdi-calendar-outline</v-icon>
                    {{ currentSlide.date }}
                  </span>
                  <span class="d-flex align-center ga-1">
                    <v-icon size="16" color="primary">mdi-clock-outline</v-icon>
                    {{ currentSlide.time || '09:30 AM' }}
                    <span v-if="currentSlide.isNew" class="px-2 py-0.5 rounded ml-1" style="
                background: rgb(var(--v-theme-primary));
                color: white;
                font-size: 10px;
                font-weight: 700;
              ">
                      New
                    </span>
                  </span>
                </div>

                <!-- Announcement Details -->
                <v-card class="announcement-detail-box mt-2 rounded-xl" elevation="0" border :style="{
                  background: 'rgb(var(--v-theme-surface))',
                  borderColor: 'rgb(var(--v-theme-primaryLight))'
                }">
                  <v-card-text class="pa-3">
                    <div class="d-flex align-center ga-1 text-subtitle-2 font-weight-bold mb-1"
                      style="color: rgb(var(--v-theme-primary));">
                      <v-icon size="16" color="primary">mdi-calendar-outline</v-icon>
                      Announcement Details
                    </div>

                    <div class="announcement-details">
                      <template v-if="currentSlide.details && currentSlide.details.length > 0">
                        <!-- Single detail -->
                        <div v-if="currentSlide.details.length === 1" class="announcement-detail-item mt-1">
                          <div class="text-caption font-weight-bold"
                            style="color: rgb(var(--v-theme-primary)); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">
                            {{ currentSlide.details[0].label }}
                          </div>
                          <div class="text-h6 font-weight-bold announcement-detail-value">
                            {{ currentSlide.details[0].value }}
                          </div>
                          <div v-if="currentSlide.details[0].subValue" class="text-body-2 announcement-detail-subvalue">
                            {{ currentSlide.details[0].subValue }}
                          </div>
                        </div>

                        <div v-else class="row announcement-detail-grid mt-1" style="margin: 0 -8px;">
                          <div v-for="(detail, index) in currentSlide.details" :key="index"
                            class="col-6 announcement-detail-item" style="padding: 0 8px;">
                            <div class="text-caption font-weight-bold"
                              style="color: rgb(var(--v-theme-primary)); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px;">
                              {{ detail.label }}
                            </div>
                            <div class="text-h6 font-weight-bold announcement-detail-value" style="font-size: 17px;">
                              {{ detail.value }}
                            </div>
                            <div v-if="detail.subValue" class="text-body-2 announcement-detail-subvalue"
                              style="font-size: 13px;">
                              {{ detail.subValue }}
                            </div>
                            <!-- Separator between details -->
                            <div v-if="index < currentSlide.details.length - 1"
                              class="announcement-detail-separator d-none d-md-block"></div>
                          </div>
                        </div>
                      </template>

                      <!-- Fallback excerpt -->
                      <div v-else class="text-body-1 announcement-excerpt mt-1">
                        {{ currentSlide.excerpt }}
                      </div>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Read More Button -->
                <v-btn color="primary" variant="flat" size="medium" class="mt-3 font-weight-bold text-capitalize"
                  rounded="lg" style="
              background: rgb(var(--v-theme-primary));
              color: white;
              box-shadow: 0 4px 16px color-mix(in srgb, rgb(var(--v-theme-primary)) 35%, transparent);
              min-width: 150px;
              height: 40px;
              font-size: 14px;
              align-self: flex-start;
              letter-spacing: 0.3px;
            " @click.stop="openSliderNotice(currentSlide.id)">
                  Read More
                </v-btn>
              </v-card-text>
            </v-card>

            <!-- Navigation Controls -->
            <div class="announcement-navigation d-flex align-center justify-center ga-3 mt-2">
              <v-btn variant="outlined" size="small" icon class="rounded-circle announcement-nav-btn"
                @click="prevSlide">
                <v-icon size="18">mdi-chevron-left</v-icon>
              </v-btn>
              <div class="d-flex ga-2">
                <button v-for="(_, idx) in sliderItems" :key="idx" class="rounded-circle pa-0 border-0 announcement-dot"
                  :class="{ 'announcement-dot-active': currentSlideIndex === idx }" @click="currentSlideIndex = idx" />
              </div>
              <v-btn variant="outlined" size="small" icon class="rounded-circle announcement-nav-btn"
                @click="nextSlide">
                <v-icon size="18">mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- QUICK ACCESS SECTION -->
      <v-col cols="12" lg="6" class="pt-3 pt-lg-0">
        <v-card class="dashboard-card rounded-xl h-100 d-flex flex-column" elevation="0" border>
          <!-- Quick Access Header -->
          <div class="d-flex align-center justify-space-between pa-4 pb-1 flex-shrink-0">
            <div class="d-flex align-center ga-2">
              <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                <v-icon size="20" color="primary">mdi-lightning-bolt</v-icon>
              </v-avatar>
              <span class="text-h6 font-weight-bold text-uppercase tracking-tight">
                Quick Access
              </span>
            </div>
            <v-btn variant="outlined" size="small" class="dashboard-view-all-btn" rounded="lg"
              @click="emit('navigate', 'quickaccess')">
              View All
            </v-btn>
          </div>

          <!-- Quick Access Grid -->
          <div class="quick-access-grid-wrapper px-3 pb-2 flex-grow-1">
            <v-row no-gutters class="quick-access-grid h-100">
              <v-col v-for="qa in quickAccessItems.slice(0, 9)" :key="qa.id" cols="4" class="pa-1">
                <v-btn variant="tonal" color="primary" block class="quick-access-chip rounded-lg"
                  @click="quickAccessAction(qa)">
                  <v-icon size="20" color="primary" class="quick-access-icon">
                    {{ qa.icon }}
                  </v-icon>
                  <span class="quick-access-label">
                    {{ qa.label }}
                  </span>
                </v-btn>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Row 2: Pending Action | Recent Activities (50:50) -->
    <v-row class="mt-4" no-gutters>

      <!-- PENDING ACTION SECTION -->
      <v-col cols="12" lg="6" class="pr-0 pr-lg-3">
        <v-card class="rounded-xl h-100 d-flex flex-column dashboard-section-card" elevation="0" border>

          <!-- Header -->
          <div class="d-flex align-center justify-space-between pa-3 pb-2">

            <!-- Title -->
            <div class="d-flex align-center ga-2">
              <v-avatar size="32" rounded="lg" color="primary" variant="tonal">
                <v-icon size="17">mdi-format-list-checks</v-icon>
              </v-avatar>

              <span class="text-subtitle-1 font-weight-bold text-uppercase">
                Pending Action
              </span>
            </div>

            <!-- View All -->
            <v-btn variant="outlined" size="small" class="dashboard-view-all-btn" rounded="lg"
              @click="emit('navigate', 'pending')">
              View All
            </v-btn>

          </div>

          <!-- Progress Summary -->
          <div class="px-3 pb-3">

            <!-- Summary -->
            <div class="d-flex align-center justify-space-between mb-2">

              <span class="text-caption text-medium-emphasis">
                5 awaiting action
              </span>

              <span class="text-caption font-weight-bold text-error d-flex align-center ga-1">
                <v-icon size="14">mdi-alert-circle</v-icon>
                2 urgent
              </span>

            </div>

            <!-- Progress Bar -->
            <div class="pending-progress rounded-pill overflow-hidden d-flex" style="height: 5px;">
              <div style="
              width: 40%;
              background: rgb(var(--v-theme-error));
            "></div>

              <div style="
              width: 40%;
              background: rgb(var(--v-theme-warning));
            "></div>

              <div style="
              width: 20%;
              background: rgb(var(--v-theme-primary-lighten-3));
            "></div>
            </div>

            <!-- Legend -->
            <div class="d-flex align-center ga-4 mt-2 text-caption text-medium-emphasis">

              <!-- Urgent -->
              <span class="d-flex align-center ga-1">
                <span class="pending-dot pending-dot-error"></span>
                Urgent <strong>2</strong>
              </span>

              <!-- Normal -->
              <span class="d-flex align-center ga-1">
                <span class="pending-dot pending-dot-warning"></span>
                Normal <strong>2</strong>
              </span>

              <!-- Low -->
              <span class="d-flex align-center ga-1">
                <span class="pending-dot pending-dot-low"></span>
                Low <strong>1</strong>
              </span>

            </div>

          </div>

          <!-- Pending Items -->
          <div class="px-3 pb-3 flex-grow-1 overflow-y-auto pending-action-list" style="min-height: 0;">

            <v-list density="compact" class="bg-transparent">

              <v-list-item v-for="action in pendingActions" :key="action.id" class="pending-action-list-item"
                @click="emit('navigate', 'pending')">

                <!-- Icon -->
                <template #prepend>
                  <v-avatar size="44" color="primary" variant="tonal">
                    <v-icon size="17">
                      {{ action.icon }}
                    </v-icon>
                  </v-avatar>
                </template>

                <!-- Main Information -->
                <v-list-item-title class="text-body-2 font-weight-bold">
                  {{ action.name }}
                </v-list-item-title>

                <v-list-item-subtitle class="d-flex align-center ga-2 flex-wrap">

                  <span class="text-caption text-medium-emphasis">
                    {{ action.ref }}
                  </span>

                  <v-chip :color="action.urgency === 'urgent'
                    ? 'error'
                    : action.urgency === 'normal'
                      ? 'warning'
                      : 'grey'
                    " size="x-small" variant="tonal" class="font-weight-bold text-uppercase"
                    style="height: 18px; font-size: 8px;">
                    {{ action.urgency }}
                  </v-chip>

                </v-list-item-subtitle>

                <!-- Status + Date -->
                <template #append>
                  <div class="d-none d-md-flex flex-column align-end text-right" style="min-width: 150px;">

                    <!-- Status -->
                    <div class="text-caption text-error d-flex align-center ga-1">

                      <span class="pending-status-dot"></span>

                      {{ action.status }}

                    </div>

                    <!-- Date -->
                    <div class="text-caption text-medium-emphasis">
                      {{ action.date }}
                    </div>

                  </div>
                </template>

              </v-list-item>

            </v-list>

          </div>

        </v-card>
      </v-col>


      <!-- RECENT ACTIVITIES SECTION -->
      <v-col cols="12" lg="6" class="pl-0 pl-lg-3 pt-3 pt-lg-0">
        <v-card class="rounded-xl h-100 d-flex flex-column dashboard-section-card" elevation="0" border>

          <!-- Header -->
          <div class="d-flex align-center justify-space-between pa-3 pb-2">

            <!-- Title -->
            <div class="d-flex align-center ga-2">
              <v-avatar size="32" rounded="lg" color="primary" variant="tonal">
                <v-icon size="17">mdi-clock-outline</v-icon>
              </v-avatar>

              <span class="text-subtitle-1 font-weight-bold text-uppercase">
                Recent Activities
              </span>
            </div>

            <!-- View All -->
            <v-btn variant="outlined" size="small" class="dashboard-view-all-btn" rounded="lg"
              @click="emit('navigate', 'recent-activities')">
              View All
            </v-btn>

          </div>

          <!-- Activity Items -->
          <div class="px-3 pb-3 flex-grow-1 overflow-y-auto recent-activity-list" style="min-height: 0;">

            <v-list density="compact" class="bg-transparent">

              <v-list-item v-for="activity in recentActivities" :key="activity.action" class="recent-activity-item">

                <!-- Icon -->
                <template #prepend>
                  <v-avatar size="44" color="primary" variant="tonal">
                    <v-icon size="17">
                      {{ activity.icon }}
                    </v-icon>
                  </v-avatar>
                </template>

                <!-- Activity -->
                <v-list-item-title class="text-body-2 font-weight-bold">
                  {{ activity.action }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption text-medium-emphasis mt-1">
                  {{ activity.date }}
                  |
                  {{ activity.time }}
                  •
                  {{ activity.relativeTime }}
                </v-list-item-subtitle>

              </v-list-item>

            </v-list>

          </div>

        </v-card>
      </v-col>

    </v-row>

    <!-- Row 3: Calendar Agenda | Phone Directory (50:50) -->
    <v-row class="mt-4" no-gutters>
      <!-- CALENDAR AGENDA SECTION -->
      <v-col cols="12" lg="6" class="pr-0 pr-lg-3">
        <v-card class="calendar-agenda-mobile rounded-xl h-100" elevation="0" border>
          <!-- Calendar Header -->
          <div class="d-flex align-center justify-space-between pa-4 pb-2">
            <div class="d-flex align-center gap-2">
              <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                <v-icon size="20" color="primary">mdi-calendar-outline</v-icon>
              </v-avatar>
              <span class="text-h6 font-weight-bold text-uppercase tracking-tight">Calendar Agenda</span>
            </div>
            <v-btn variant="outlined" size="small" class="dashboard-view-all-btn" @click="emit('navigate', 'calendar')"
              rounded="lg">
              View All
            </v-btn>
          </div>

          <!-- Agenda Items -->
          <div class="px-3 pb-3">
            <v-list density="compact" lines="two" class="bg-transparent">
              <v-list-item v-for="event in calendarAgendaEvents" :key="event.dateStr + '-' + event.title"
                class="calendar-agenda-item rounded-xl mb-2 border pa-0" @click="emit('navigate', 'calendar')">
                <template v-slot:prepend>
                  <div class="d-flex flex-column align-center justify-center px-2" style="min-width: 52px;">
                    <span class="text-h6 font-weight-bold text-primary" style="font-size: 18px; line-height: 1.2;">{{
                      String(event.day).padStart(2, '0') }}</span>
                    <span class="text-caption text-medium-emphasis" style="font-size: 8px;">{{ event.monthLabel
                    }}</span>
                  </div>
                </template>

                <v-list-item-title class="text-body-2 font-weight-bold d-flex align-center ga-1">
                  <span class="rounded-circle d-inline-block" :class="getCalendarDotColor(event.type)"
                    style="width: 8px; height: 8px; flex-shrink: 0;"></span>
                  {{ event.title }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  <div class="d-flex flex-column ga-0">
                    <span class="text-caption d-flex align-center ga-1">
                      <v-icon size="12" color="primary">{{ getCalendarAgendaIcon(event.type) }}</v-icon>
                      {{ event.category }}
                    </span>
                    <span class="text-caption d-flex align-center ga-1">
                      <v-icon size="12" color="primary">mdi-clock-outline</v-icon>
                      {{ event.time || 'All Day' }}
                    </span>
                  </div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <!-- Empty State -->
            <div v-if="calendarAgendaEvents.length === 0" class="text-center py-6 text-medium-emphasis">
              <v-icon size="32" color="primary" class="mb-2">mdi-calendar-blank-outline</v-icon>
              <div class="text-caption">No upcoming calendar events</div>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- PHONE DIRECTORY SECTION -->
      <v-col cols="12" lg="6" class="pt-3 pt-lg-0">
        <v-card class="rounded-xl h-100 d-flex flex-column" elevation="0" border
          style="min-height: 560px; height: 560px;">

          <!-- Header -->
          <div class="d-flex align-center justify-space-between pa-3 pb-2">

            <!-- Title -->
            <div class="d-flex align-center ga-2">
              <v-avatar size="32" rounded="lg" color="primary" variant="tonal">
                <v-icon size="17">mdi-phone</v-icon>
              </v-avatar>

              <span class="text-subtitle-1 font-weight-bold text-uppercase">
                Phone Directory
              </span>
            </div>

            <!-- Actions -->
            <div class="d-flex align-center ga-2">

              <!-- Search -->
              <v-btn icon size="small" variant="text" color="primary" class="phone-directory-action-btn" @click="
                searchExpanded = !searchExpanded;
              if (!searchExpanded) contactSearch = '';
              ">
                <v-icon size="18">mdi-magnify</v-icon>
              </v-btn>

              <!-- Expanded Search -->
              <v-text-field v-if="searchExpanded" v-model="contactSearch" density="compact" variant="outlined"
                placeholder="Search..." hide-details single-line class="phone-directory-search" />

              <!-- Filters -->
              <v-btn variant="text" size="small" color="primary" class="phone-directory-action-btn" rounded="lg"
                @click="directoryFiltersOpen = !directoryFiltersOpen">
                <v-icon size="17" class="mr-1">mdi-filter-variant</v-icon>
                Filters
              </v-btn>

              <!-- View -->
              <v-btn variant="text" size="small" color="primary" class="phone-directory-action-btn" rounded="lg"
                @click="directoryView = directoryView === 'grid' ? 'list' : 'grid'">
                <v-icon size="17" class="mr-1">
                  {{ directoryView === 'grid'
                    ? 'mdi-format-list-bulleted'
                    : 'mdi-view-grid'
                  }}
                </v-icon>

                {{ directoryView === 'grid' ? 'List' : 'Grid' }}
              </v-btn>

            </div>
          </div>

          <!-- Filters -->
          <v-expand-transition>
            <div v-if="directoryFiltersOpen" class="px-3 pb-2">

              <v-card rounded="lg" class="pa-3 phone-directory-filters" elevation="0">
                <v-row dense>

                  <v-col cols="12" sm="6">
                    <v-select v-model="selectedDepartment" :items="uniqueDepartments" label="Department"
                      density="compact" variant="outlined" hide-details />
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-select v-model="selectedTeam" :items="uniqueTeams" label="Team" density="compact"
                      variant="outlined" hide-details />
                  </v-col>

                </v-row>

                <div class="d-flex justify-end mt-2">
                  <v-btn size="small" variant="text" @click="
                    selectedDepartment = 'All';
                  selectedTeam = 'All';
                  ">
                    <v-icon size="14" class="mr-1">mdi-restore</v-icon>
                    Reset
                  </v-btn>
                </div>
              </v-card>

            </div>
          </v-expand-transition>

          <!-- Contacts -->
          <div class="px-3 pb-3 flex-grow-1 overflow-y-auto" style="min-height: 0;">

            <!-- GRID -->
            <v-row v-if="directoryView === 'grid'" dense>
              <v-col v-for="contact in filteredContacts.slice(0, 6)" :key="contact.name" cols="12" sm="6">
                <v-card class="rounded-lg h-100 phone-directory-item" elevation="0">
                  <v-card-text class="pa-3">
                    <!-- Avatar + Contact -->
                    <div class="d-flex align-center ga-3">

                      <v-avatar size="44" color="primary" variant="tonal" class="flex-shrink-0">
                        <span class="font-weight-bold text-primary">
                          {{ initials(contact.name) }}
                        </span>
                      </v-avatar>

                      <div class="d-flex align-center ga-1 text-caption"
                        style="color: rgb(var(--v-theme-on-surface)) !important;">
                        <v-icon size="13" color="primary">mdi-phone</v-icon>
                        <span>Ext. {{ contact.ext || '-' }}</span>
                      </div>

                      <div class="d-flex align-center ga-1 text-caption text-truncate"
                        style="color: rgb(var(--v-theme-on-surface)) !important;">
                        <v-icon size="13" color="primary">mdi-email-outline</v-icon>
                        <span class="text-truncate">
                          {{ contact.email || '-' }}
                        </span>
                      </div>

                    </div>

                    <!-- Name -->
                    <div class="text-body-2 font-weight-bold text-truncate mt-3">
                      {{ contact.name }}
                    </div>

                    <!-- Position -->
                    <div class="text-caption text-medium-emphasis text-truncate">
                      {{ contact.jobTitle || '-' }}
                    </div>

                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- LIST -->
            <v-list v-else density="compact" class="bg-transparent">
              <v-list-item v-for="(contact, index) in filteredContacts.slice(0, 6)" :key="contact.name"
                class="phone-directory-list-item"
                :class="{ 'phone-directory-list-last': index === filteredContacts.slice(0, 6).length - 1 }">

                <!-- Avatar -->
                <template #prepend>
                  <v-avatar size="44" color="primary" variant="tonal">
                    <span class="font-weight-bold">
                      {{ initials(contact.name) }}
                    </span>
                  </v-avatar>
                </template>

                <!-- Contact Info -->
                <v-list-item-title class="font-weight-bold">
                  {{ contact.name }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  {{ contact.jobTitle || '-' }}
                  ·
                  {{ contact.department || '-' }}
                </v-list-item-subtitle>

                <!-- Contact Details -->
                <template #append>
                  <div class="d-none d-md-flex flex-column align-end text-caption text-right"
                    style="min-width: 200px; color: rgb(var(--v-theme-on-surface)) !important;">
                    <span>
                      <v-icon size="12" color="primary">mdi-phone</v-icon>
                      Ext. {{ contact.ext || '-' }}
                    </span>
                    <span class="text-truncate" style="max-width: 200px;">
                      <v-icon size="12" color="primary">mdi-email-outline</v-icon>
                      {{ contact.email || '-' }}
                    </span>
                  </div>
                </template>

              </v-list-item>
            </v-list>

            <!-- Empty -->
            <div v-if="filteredContacts.length === 0"
              class="d-flex flex-column align-center justify-center h-100 text-medium-emphasis">
              <v-icon size="42" color="primary">
                mdi-account-off-outline
              </v-icon>

              <div class="text-body-2 font-weight-bold mt-2">
                No contacts found
              </div>

              <div class="text-caption">
                Try adjusting your search or filter
              </div>
            </div>

          </div>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

// Emits
const emit = defineEmits<{
  (e: 'navigate', page: string): void
}>()

// State
const announcementExpanded = ref(true)
const currentSlideIndex = ref(0)
const sliderTimer = ref<ReturnType<typeof setInterval> | null>(null)
const contactSearch = ref('')
const directoryView = ref<'grid' | 'list'>('list')
const searchExpanded = ref(false)
const directoryFiltersOpen = ref(false)
const selectedDepartment = ref('All')
const selectedTeam = ref('All')

const uniqueDepartments = computed(() => [
  'All',
  ...new Set(contacts.map(c => c.department))
])

const uniqueTeams = computed(() => {
  const filtered = selectedDepartment.value === 'All'
    ? contacts
    : contacts.filter(c => c.department === selectedDepartment.value)

  return [
    'All',
    ...new Set(filtered.map(c => c.team))
  ]
})

watch(selectedDepartment, () => {
  selectedTeam.value = 'All'
})

// Quick Access Items
const quickAccessItems = ref([
  { id: 1, label: 'Staff Purchase', icon: 'mdi-cart', page: 'eservices' },
  { id: 2, label: 'Training Record', icon: 'mdi-school', page: 'eservices' },
  { id: 3, label: 'PO Management', icon: 'mdi-file-document-outline', page: 'eservices' },
  { id: 4, label: 'Material Management', icon: 'mdi-package-variant', page: 'eservices' },
  { id: 5, label: 'Sales Automation', icon: 'mdi-chart-bar', page: 'eservices' },
  { id: 6, label: 'AP Management', icon: 'mdi-account-group', page: 'eservices' },
  { id: 7, label: 'Work Order', icon: 'mdi-wrench', page: 'eservices' },
  { id: 8, label: 'TSR', icon: 'mdi-clipboard-list', page: 'eservices' },
  { id: 9, label: 'Easy Loader', icon: 'mdi-upload', page: 'eservices' }
])

// Announcement Slider - Dynamic with details
interface AnnouncementDetail {
  label: string
  value: string
  subValue?: string
}

const announcementList = [
  {
    id: 1,
    title: 'Public Holiday – Melaka Governor\'s Birthday',
    date: '24 Aug 2026',
    time: '09:30 AM',
    isNew: true,
    excerpt: 'Please be informed that this year\'s Melaka Governor\'s Birthday falls on Monday...',
    details: [
      { label: 'Holiday Date', value: 'Monday, 24 August 2026' }
    ] as AnnouncementDetail[]
  },
  {
    id: 2,
    title: 'Replacement Holiday – HQ only',
    date: '24 August 2026',
    time: '09:30 AM',
    isNew: true,
    excerpt: 'Further to memo dated 16 March 2026 regarding the additional public holiday...',
    details: [
      { label: 'Start Date', value: '31 August 2026 (Monday)' },
      { label: 'End Date', value: '1 September 2026 (Tuesday)' }
    ] as AnnouncementDetail[]
  },
  {
    id: 3,
    title: 'Staff Purchase – Special Offer',
    date: '12 May 2026',
    time: '09:00 AM',
    isNew: false,
    excerpt: 'Exclusive staff purchase event with special discounts on selected products...',
    details: [
      { label: 'Start Date & Time', value: '15 May 2026 (Friday)', subValue: '09:00 AM' },
      { label: 'End Date & Time', value: '22 May 2026 (Friday)', subValue: '05:00 PM' }
    ] as AnnouncementDetail[]
  }
]

const sliderItems = computed(() =>
  announcementList.map(n => ({
    type: 'announcement',
    title: n.title,
    excerpt: n.excerpt,
    date: n.date,
    time: n.time,
    isNew: n.isNew,
    id: n.id,
    details: n.details
  }))
)

const currentSlide = computed(() =>
  sliderItems.value[currentSlideIndex.value] || sliderItems.value[0] || {
    title: 'No items',
    excerpt: '',
    date: '',
    time: '',
    isNew: false,
    id: null,
    details: null
  }
)

// Pending Actions
const pendingActions = [
  { id: 1, name: 'Leave Application', ref: 'LA-2026-000123', date: '24 Jul 2026, 10:30 AM', status: 'Pending Approval', urgency: 'urgent', icon: 'mdi-calendar-outline' },
  { id: 2, name: 'Work Order', ref: 'WO-2026-000456', date: '24 Jul 2026, 09:15 AM', status: 'Pending IT Approval', urgency: 'urgent', icon: 'mdi-wrench' },
  { id: 3, name: 'Training Attendance', ref: 'TR-2026-000789', date: '23 Jul 2026, 04:45 PM', status: 'Pending Verification', urgency: 'normal', icon: 'mdi-account-group' },
  { id: 4, name: 'Purchase Requisition', ref: 'PR-2026-000321', date: '23 Jul 2026, 03:45 PM', status: 'Pending Approval', urgency: 'normal', icon: 'mdi-file-document-outline' },
  { id: 5, name: 'HR Requisition', ref: 'HR-2026-000654', date: '22 Jul 2026, 02:30 PM', status: 'Pending Review', urgency: 'low', icon: 'mdi-account-plus' }
]

// Recent Activities
const recentActivities = [
  {
    action: 'Logged in to the system',
    date: '27 Aug 2026',
    time: '02:15 PM',
    relativeTime: '2 Minutes Ago',
    type: 'login',
    icon: 'mdi-login'
  },
  {
    action: 'Updated Quick Access shortcuts',
    date: '27 Aug 2026',
    time: '02:02 PM',
    relativeTime: '15 Minutes Ago',
    type: 'quickaccess',
    icon: 'mdi-lightning-bolt'
  },
  {
    action: 'Completed pending action',
    date: '27 Aug 2026',
    time: '01:15 PM',
    relativeTime: '1 Hour Ago',
    type: 'pending',
    icon: 'mdi-check-circle'
  },
  {
    action: 'Checked Calendar events',
    date: '27 Aug 2026',
    time: '12:15 PM',
    relativeTime: '2 Hours Ago',
    type: 'calendar',
    icon: 'mdi-calendar-check'
  },
  {
    action: 'Viewed Announcements',
    date: '27 Aug 2026',
    time: '11:15 AM',
    relativeTime: '3 Hours Ago',
    type: 'announcement',
    icon: 'mdi-bullhorn'
  },
  {
    action: 'Viewed Recent Activities',
    date: '27 Aug 2026',
    time: '11:10 AM',
    relativeTime: '3 Hours Ago',
    type: 'announcement',
    icon: 'mdi-clock'
  }
]

// Calendar Agenda Events
const customEvents: Record<string, any[]> = {
  '2026-08-01': [{ title: 'Admin Duty Group A', type: 'schedule', time: 'All Day', category: 'Schedule' }],
  '2026-08-07': [
    { title: 'Annual Leave', type: 'leave', time: 'All Day', category: 'My Leave' },
    { title: 'Annual Dinner', type: 'company', time: '6:00 PM – 10:00 PM', category: 'Company Event' }
  ],
  '2026-08-12': [{ title: 'IT Training', type: 'department', time: '9:00 AM – 12:00 PM', category: 'Department Event' }]
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth()

const calendarAgendaEvents = computed(() => {
  const results: any[] = []
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  for (let day = 1; day <= daysInMonth && results.length < 5; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const dayEvents = customEvents[dateStr] || []

    dayEvents.forEach((event: any) => {
      if (results.length >= 5) return
      results.push({
        ...event,
        dateStr,
        day,
        monthLabel: monthNames[currentMonth].toUpperCase(),
        year: currentYear
      })
    })
  }
  return results
})

// Contacts
const contacts = [
  { name: 'Amirul Hakim', jobTitle: 'Product Manager', ext: '1702', email: 'amirul.hakim@kotra.com', department: 'PD', team: 'Product' },
  { name: 'Siti Nur Aina', jobTitle: 'Regulatory Executive', ext: '2345', email: 'siti.aina@kotra.com', department: 'RPD', team: 'Regulatory' },
  { name: 'Muhammad Khairul', jobTitle: 'Medical Representative', ext: '2901', email: 'khairul.m@kotra.com', department: 'SMO', team: 'Medical' },
  { name: 'Yvonne Wong', jobTitle: 'HR Executive', ext: '4567', email: 'yvonne.wong@kotra.com', department: 'AHR', team: 'HR' },
  { name: 'Faris Azman', jobTitle: 'Finance Analyst', ext: '5678', email: 'faris.azman@kotra.com', department: 'AACT', team: 'Finance' },
  { name: 'Nurul Liyana', jobTitle: 'QC Chemist', ext: '6789', email: 'nurul.liyana@kotra.com', department: 'QC', team: 'QC' }
]

const filteredContacts = computed(() => {
  const term = contactSearch.value.trim().toLowerCase()

  return contacts.filter(c => {
    const matchesSearch =
      !term ||
      c.name.toLowerCase().includes(term) ||
      c.jobTitle.toLowerCase().includes(term) ||
      c.department.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term)

    const matchesDepartment =
      selectedDepartment.value === 'All' ||
      c.department === selectedDepartment.value

    const matchesTeam =
      selectedTeam.value === 'All' ||
      c.team === selectedTeam.value

    return matchesSearch && matchesDepartment && matchesTeam
  })
})

// Calendar Helpers
const getCalendarDotColor = (type: string) => {
  const colors: Record<string, string> = {
    leave: 'bg-pink-500',
    company: 'bg-red-500',
    department: 'bg-purple-500',
    holiday: 'bg-blue-500',
    schedule: 'bg-amber-500',
    meeting: 'bg-purple-500',
    event: 'bg-red-500'
  }
  return colors[type] || 'bg-blue-500'
}

const getCalendarAgendaIcon = (type: string) => {
  const icons: Record<string, string> = {
    leave: 'mdi-account-clock',
    company: 'mdi-account-group',
    department: 'mdi-office-building',
    holiday: 'mdi-flag',
    schedule: 'mdi-calendar-check',
    meeting: 'mdi-handshake',
    event: 'mdi-calendar-star'
  }
  return icons[type] || 'mdi-calendar-star'
}

const viewAllAnnouncements = () => {
  emit('navigate', 'announcements')
}

const openSliderNotice = (noticeId: number) => {
  console.log('Opening announcement ID:', noticeId)
  emit('navigate', 'announcements')
}

const quickAccessAction = (qa: any) => {
  if (qa.page) {
    emit('navigate', qa.page)
  }
}

const initials = (name: string) => {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

// Slider navigation
const nextSlide = () => {
  if (sliderItems.value.length === 0) return
  currentSlideIndex.value = (currentSlideIndex.value + 1) % sliderItems.value.length
}

const prevSlide = () => {
  if (sliderItems.value.length === 0) return
  currentSlideIndex.value = (currentSlideIndex.value - 1 + sliderItems.value.length) % sliderItems.value.length
}

// Timer
const startSliderTimer = () => {
  if (sliderTimer.value) clearInterval(sliderTimer.value)
  sliderTimer.value = setInterval(nextSlide, 10000)
}

onMounted(() => {
  startSliderTimer()
})

onBeforeUnmount(() => {
  if (sliderTimer.value) {
    clearInterval(sliderTimer.value)
    sliderTimer.value = null
  }
})
</script>

<style scoped>
.dashboard-wrapper {
  width: 100%;
}

.h-100 {
  height: 100%;
}

.flex-grow-1 {
  flex: 1 1 auto;
}

.gap-1 {
  gap: 4px;
}

.gap-2 {
  gap: 8px;
}

.gap-3 {
  gap: 12px;
}

.ga-0 {
  gap: 0px;
}

.ga-1 {
  gap: 4px;
}

.ga-2 {
  gap: 8px;
}

.ga-3 {
  gap: 12px;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

/* Announcement */
.announcement-content {
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.announcement-slide-card {
  width: 100%;
  min-height: 320px;
  height: 320px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  z-index: 1;
  background-color: var(--v-theme-primaryBg) !important;
  border-color: rgb(var(--v-theme-primaryLight)) !important;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.announcement-slide-bg {
  background-color: var(--v-theme-primaryBg) !important;
  border-color: rgb(var(--v-theme-primaryLight)) !important;
}

.announcement-slide-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.announcement-slide-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.dark) .announcement-slide-bg {
  background-color: rgba(15, 157, 154, 0.12) !important;
  border-color: rgba(15, 157, 154, 0.2) !important;
}

.announcement-navigation {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.announcement-title {
  color: rgb(var(--v-theme-on-surface)) !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  line-height: 1.3;
  min-height: 44px;
  font-size: 20px !important;
}

.announcement-meta {
  color: rgb(var(--v-theme-textMuted)) !important;
  flex-shrink: 0;
  font-size: 14px !important;
  gap: 10px !important;
}

.announcement-meta .v-icon {
  font-size: 16px !important;
}

.announcement-detail-box {
  flex: 0 0 auto;
  min-height: 0;
  overflow: hidden;
  transition: all 0.2s ease;
  background: rgb(var(--v-theme-surface)) !important;
  border-radius: 8px !important;
  border: 1px solid rgba(15, 157, 154, 0.15) !important;
}

.announcement-details {
  overflow: hidden;
}

.announcement-detail-item {
  overflow: hidden;
  position: relative;
}

.announcement-detail-value {
  font-size: 17px !important;
  color: rgb(var(--v-theme-on-surface)) !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.announcement-detail-subvalue {
  color: rgb(var(--v-theme-textGrey)) !important;
  font-size: 13px !important;
}

.announcement-detail-separator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 70%;
  background: rgb(var(--v-theme-borderLight));
  border-radius: 2px;
}

.announcement-detail-grid {
  display: flex;
  flex-wrap: wrap;
}

.announcement-detail-grid .col-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.announcement-excerpt {
  color: rgb(var(--v-theme-textGrey)) !important;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
  font-size: 15px !important;
  line-height: 1.5;
}

.announcement-dot {
  width: 12px;
  height: 12px;
  background-color: rgb(var(--v-theme-textMuted));
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid rgba(255, 255, 255, 0.1);
}

.announcement-dot-active {
  background-color: rgb(var(--v-theme-primary)) !important;
  transform: scale(1.2);
}

.announcement-nav-btn {
  border-color: rgb(var(--v-theme-lightprimary)) !important;
  background: rgb(var(--v-theme-surface)) !important;
  color: rgb(var(--v-theme-primary)) !important;
  width: 32px !important;
  height: 32px !important;
}

.announcement-nav-btn .v-icon {
  font-size: 18px !important;
}

/* Quick Access */
.quick-access-grid-wrapper {
  flex: 1 1 auto;
  min-height: 0;
}

.quick-access-grid {
  margin: -3px;
}

.quick-access-grid>.v-col {
  display: flex;
}

.quick-access-chip {
  width: 100% !important;
  height: 100% !important;
  min-height: 56px !important;
  padding: 6px 3px !important;
  background-color: var(--v-theme-primaryBg) !important;
  border: 1px solid rgba(15, 23, 42, 0.15) !important;
  border-radius: 8px !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease !important;
}

.quick-access-chip :deep(.v-btn__content) {
  width: 100% !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 2px !important;
}

/* Icon - Smaller */
.quick-access-icon {
  display: block !important;
  flex: 0 0 auto !important;
  margin: 0 !important;
  font-size: 18px !important;
}

.quick-access-label {
  display: block !important;
  width: 100% !important;
  flex: 0 0 auto !important;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: normal;
  font-size: 11px;
  line-height: 1.1;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface)) !important;
}

.quick-access-chip:hover {
  transform: translateY(-1px);
  background-color: rgb(var(--v-theme-primaryHover)) !important;
  border-color: rgba(15, 23, 42, 0.30) !important;
  box-shadow: 0 3px 8px rgba(15, 23, 42, 0.08);
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .announcement-slide-card {
    min-height: 380px;
  }

  .announcement-detail-grid .col-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .announcement-detail-separator {
    display: none !important;
  }

  .announcement-title {
    font-size: 17px !important;
    min-height: 40px;
  }

  .announcement-slide-content {
    padding: 16px !important;
  }

  .quick-access-chip {
    min-height: 48px !important;
    padding: 4px 2px !important;
  }

  .quick-access-icon {
    font-size: 16px !important;
  }

  .quick-access-label {
    font-size: 9px !important;
  }
}

@media (max-width: 600px) {
  .announcement-slide-card {
    min-height: 400px;
  }
}

/* Pending Action Items */
.pending-action-item {
  transition: background 0.15s ease;
  cursor: pointer;
}

.pending-action-item:hover {
  background: rgba(15, 157, 154, 0.05);
}

/* Calendar Agenda Items */
.calendar-agenda-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.calendar-agenda-item:hover {
  background: rgba(15, 157, 154, 0.05);
  border-color: rgba(15, 157, 154, 0.3);
}

/* Phone Directory */
.phone-directory-list-item {
  border-bottom: 1px solid var(--v-theme-borderLight) !important;
  border-radius: 0 !important;
}

.phone-directory-list-last {
  border-bottom: none !important;
}

.phone-directory-item {
  border: 1px solid var(--v-theme-borderLight) !important;
  background: var(--v-theme-surface) !important;
}

.phone-directory-action-btn {
  height: 36px !important;
  min-height: 36px !important;
  padding: 0 10px !important;
  color: rgb(var(--v-theme-primary)) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  border-radius: 10px !important;
}

.phone-directory-action-btn:hover {
  background: var(--v-theme-primaryBg) !important;
}

.phone-directory-action-btn.v-btn--icon {
  width: 36px !important;
  min-width: 36px !important;
  padding: 0 !important;
}

.phone-directory-action-btn .v-icon {
  color: rgb(var(--v-theme-primary)) !important;
}

.phone-directory-search {
  width: 200px !important;
  max-width: 200px !important;
}

.phone-directory-search :deep(.v-field) {
  height: 36px !important;
  min-height: 36px !important;
  border-radius: 10px !important;
}

.phone-directory-search :deep(.v-field__input) {
  min-height: 36px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  font-size: 13px !important;
}

.phone-directory-search :deep(.v-field__prepend-inner),
.phone-directory-search :deep(.v-field__append-inner) {
  height: 36px !important;
}

/* Pending Action + Recent Activities */

.dashboard-section-card {
  min-height: 520px;
}

.pending-action-list-item,
.recent-activity-item {
  min-height: 80px !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important;

  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);

  border-radius: 0 !important;

  cursor: pointer;
}

.pending-action-list-item:last-child,
.recent-activity-item:last-child {
  border-bottom: none;
}

.pending-action-list-item:hover,
.recent-activity-item:hover {
  background: rgba(var(--v-theme-on-surface), 0.03);
}

.pending-progress {
  width: 100%;
}

.pending-dot {
  width: 7px;
  height: 7px;
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
  background: rgb(var(--v-theme-primary));
}

.pending-status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  background: rgb(var(--v-theme-error));
}

/* View All Buttons */
.dashboard-view-all-btn {
  min-height: 36px !important;
  padding: 0 16px !important;
  border: 1.5px solid rgb(var(--v-theme-lightprimary)) !important;
  background: rgb(var(--v-theme-primaryBg));
  color: rgb(var(--v-theme-viewAllText)) !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  border-radius: 10px !important;
  transition: border-color 0.2s ease, background 0.2s ease !important;
}

.dashboard-view-all-btn:hover {
  background: rgb(var(--v-theme-primaryHover)) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
}

/* Scrollbar Styling */
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

/* Mobile Responsive */
@media (max-width: 767px) {
  .dashboard-top-row {
    flex-direction: column;
  }

  .announcement-slide-card {
    margin-left: 0;
    margin-right: 0;
  }

  .phone-directory-search {
    max-width: 100px !important;
  }

  .quick-access-chip {
    min-height: 62px !important;
    padding: 5px 3px !important;
  }

  .quick-access-icon {
    font-size: 18px !important;
  }

  .quick-access-label {
    font-size: 9px !important;
    line-height: 1.1;
  }

  .text-h4 {
    font-size: 20px !important;
  }

  .text-h6 {
    font-size: 16px !important;
  }
}

@media (max-width: 600px) {
  .announcement-slide-card {
    margin-left: 0;
    margin-right: 0;
  }
}

/* Dark Mode Overrides */
:deep(.dark) .border-bottom {
  border-bottom-color: rgba(255, 255, 255, 0.12);
}

:deep(.dark) .pending-action-item:hover {
  background: rgba(15, 157, 154, 0.12);
}

:deep(.dark) .calendar-agenda-item:hover {
  background: rgba(15, 157, 154, 0.12);
}
</style>
