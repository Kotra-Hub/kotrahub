<!-- src/views/Dashboard.vue -->
<template>
  <div class="dashboard-wrapper">
    <!-- Row 1: Announcement | Quick Access -->
    <v-row class="dashboard-top-row" no-gutters>
      <!-- ANNOUNCEMENT SECTION -->
      <v-col cols="12" lg="6" class="pr-0 pr-lg-3">
        <v-card class="dashboard-card rounded-xl h-100" elevation="0" border>
          <!-- Announcement Header -->
          <div class="d-flex align-center justify-space-between pa-3 pb-2">
            <div class="d-flex align-center gap-2">
              <v-avatar size="32" rounded="lg" color="primary" variant="tonal">
                <v-icon size="18" color="primary">mdi-bullhorn</v-icon>
              </v-avatar>
              <span class="text-subtitle-1 font-weight-bold text-uppercase tracking-tight">Announcement</span>
            </div>
            <div class="d-flex align-center gap-1">
              <v-btn v-if="announcementExpanded" variant="outlined" size="small" color="primary"
                class="d-none d-sm-flex font-weight-bold text-caption announcement-view-all-btn"
                @click="viewAllAnnouncements" rounded="lg">
                View All
              </v-btn>
              <!-- TEMPORARILY COMMENTED: Hide/Show Announcement Feature
              <v-btn variant="tonal" size="small" icon color="primary" class="rounded-circle"
                @click="announcementExpanded = !announcementExpanded">
                <v-icon size="16">
                  {{ announcementExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
                </v-icon>
              </v-btn>
              -->
            </div>
          </div>

          <!-- Announcement Content -->
          <div v-show="announcementExpanded" class="px-3 pb-3">
            <!-- Announcement Slide Card -->
            <v-card class="announcement-slide-card rounded-xl" elevation="0" border :style="{
              background: 'var(--v-theme-primaryBg)',
              borderColor: 'var(--v-theme-primary-lighten-3)'
            }" @click="openSliderNotice(currentSlide.id)">
              <v-card-text class="pa-3">
                <!-- Featured Badge -->
                <v-chip size="x-small" color="primary" class="text-uppercase font-weight-bold"
                  style="background: var(--v-theme-primary); color: white;">
                  <v-icon left size="10" color="white">mdi-star</v-icon>
                  Featured
                </v-chip>

                <!-- Title -->
                <h3 class="text-subtitle-1 font-weight-bold mt-1 mb-0 text-wrap"
                  style="color: var(--v-theme-on-surface);">
                  {{ currentSlide.title }}
                </h3>

                <!-- Date & Time -->
                <div class="d-flex flex-wrap align-center ga-2 mt-1 text-caption"
                  style="color: var(--v-theme-textMuted);">
                  <span class="d-flex align-center ga-1">
                    <v-icon size="12" color="primary">mdi-calendar-outline</v-icon>
                    {{ currentSlide.date }}
                  </span>
                  <span class="d-flex align-center ga-1">
                    <v-icon size="12" color="primary">mdi-clock-outline</v-icon>
                    {{ currentSlide.time || '09:30 AM' }}
                    <span v-if="currentSlide.isNew" class="px-2 py-0.5 rounded"
                      style="background: var(--v-theme-primary); color: white; font-size: 9px; font-weight: 700;">New</span>
                  </span>
                </div>

                <!-- Detail Box -->
                <v-card class="announcement-detail-box mt-2 rounded-xl" elevation="0" border :style="{
                  background: 'var(--v-theme-surface)',
                  borderColor: 'var(--v-theme-primary-lighten-3)'
                }">
                  <v-card-text class="pa-2">
                    <div class="d-flex align-center ga-1 text-caption font-weight-bold"
                      style="color: var(--v-theme-primary);">
                      <v-icon size="12" color="primary">mdi-calendar-outline</v-icon>
                      Announcement Details
                    </div>

                    <!-- Dynamic Details -->
                    <div class="mt-1">
                      <template v-if="currentSlide.details">
                        <div v-for="(detail, key) in currentSlide.details" :key="key">
                          <div class="text-caption font-weight-bold" style="color: var(--v-theme-primary);">
                            {{ detail.label }}
                          </div>
                          <div class="text-body-2 font-weight-bold"
                            style="font-size: 14px; color: var(--v-theme-on-surface);">
                            {{ detail.value }}
                          </div>
                          <div v-if="detail.subValue" class="text-caption"
                            style="color: var(--v-theme-textGrey); font-size: 13px;">
                            {{ detail.subValue }}
                          </div>
                        </div>
                      </template>
                      <div v-else class="text-caption" style="color: var(--v-theme-textGrey);">
                        {{ currentSlide.excerpt }}
                      </div>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Read More Button -->
                <v-btn color="primary" variant="flat" size="x-small" class="mt-2 font-weight-bold text-capitalize"
                  rounded="lg"
                  style="background: var(--v-theme-primary); color: white; box-shadow: 0 4px 12px color-mix(in srgb, var(--v-theme-primary) 30%, transparent);"
                  @click.stop="openSliderNotice(currentSlide.id)">
                  Read More
                  <v-icon right size="12" color="white">mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-text>
            </v-card>

            <!-- Navigation Controls - Bottom Center -->
            <div class="d-flex align-center justify-center ga-2 mt-2">
              <!-- Prev Button -->
              <v-btn variant="outlined" size="x-small" icon class="rounded-circle"
                style="border-color: var(--v-theme-primary-lighten-3); background: var(--v-theme-surface); color: var(--v-theme-primary);"
                @click="prevSlide">
                <v-icon size="14">mdi-chevron-left</v-icon>
              </v-btn>

              <!-- Dots -->
              <div class="d-flex ga-1">
                <button v-for="(_, idx) in sliderItems" :key="idx" class="rounded-circle pa-0 border-0" :style="{
                  width: currentSlideIndex === idx ? '10px' : '6px',
                  height: currentSlideIndex === idx ? '10px' : '6px',
                  backgroundColor: currentSlideIndex === idx ? 'var(--v-theme-primary)' : 'var(--v-theme-primary-lighten-4)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }" @click="currentSlideIndex = idx"></button>
              </div>

              <!-- Next Button -->
              <v-btn variant="outlined" size="x-small" icon class="rounded-circle"
                style="border-color: var(--v-theme-primary-lighten-3); background: var(--v-theme-surface); color: var(--v-theme-primary);"
                @click="nextSlide">
                <v-icon size="14">mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- QUICK ACCESS SECTION -->
      <v-col cols="12" lg="6" class="pt-3 pt-lg-0">
        <v-card class="dashboard-card rounded-xl h-100" elevation="0" border>
          <!-- Quick Access Header -->
          <div class="d-flex align-center justify-space-between pa-4 pb-2">
            <div class="d-flex align-center gap-2">
              <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                <v-icon size="20" color="primary">mdi-lightning-bolt</v-icon>
              </v-avatar>
              <span class="text-h6 font-weight-bold text-uppercase tracking-tight">Quick Access</span>
            </div>
            <v-btn variant="outlined" size="small" color="primary" class="font-weight-bold text-body-2"
              @click="emit('navigate', 'quickaccess')" rounded="lg">
              View All
            </v-btn>
          </div>

          <!-- Quick Access Grid -->
          <div class="px-3 pb-3 flex-grow-1">
            <v-row no-gutters class="quick-access-grid">
              <v-col v-for="qa in quickAccessItems.slice(0, 9)" :key="qa.id" cols="4" class="pa-1">
                <v-btn variant="tonal" color="primary" block
                  class="quick-access-chip rounded-lg py-2 h-auto flex-column ga-0"
                  style="min-height: 88px; background: var(--v-theme-primaryBg); border: 1px solid var(--v-theme-primary-lighten-3);"
                  @click="quickAccessAction(qa)">
                  <!-- Icon on top -->
                  <v-icon size="24" color="primary" class="mb-1">{{ qa.icon }}</v-icon>
                  <!-- Text below -->
                  <span class="text-body-2 text-center font-weight-semibold"
                    style="line-height: 1.2; color: var(--v-theme-on-surface);">
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
      <v-col cols="12" lg="6" class="pr-0 pr-lg-3">
        <v-card class="rounded-xl h-100" elevation="0" border>
          <!-- Pending Action Header -->
          <div class="d-flex align-center justify-space-between pa-4 pb-2">
            <div class="d-flex align-center gap-2">
              <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                <v-icon size="20" color="primary">mdi-format-list-checks</v-icon>
              </v-avatar>
              <span class="text-h6 font-weight-bold text-uppercase tracking-tight">Pending Action</span>
            </div>
            <v-btn variant="outlined" size="small" color="primary" class="font-weight-bold text-body-2"
              @click="emit('navigate', 'pending')" rounded="lg">
              View All
            </v-btn>
          </div>

          <!-- Summary -->
          <div class="px-3 pt-0 pb-2">
            <div class="d-flex align-center justify-space-between mb-1">
              <span class="text-body-2 text-medium-emphasis">5 awaiting action</span>
              <span class="text-body-2 font-weight-bold text-error d-flex align-center ga-1">
                <v-icon size="14" color="error">mdi-alert-circle</v-icon>
                2 urgent
              </span>
            </div>

            <!-- Progress Bar -->
            <div class="d-flex w-100 rounded-pill overflow-hidden"
              style="height: 4px; background: var(--v-theme-primary-lighten-4);">
              <div style="width: 40%; background: var(--v-theme-error);"></div>
              <div style="width: 40%; background: var(--v-theme-warning);"></div>
              <div style="width: 20%; background: var(--v-theme-primary-lighten-3);"></div>
            </div>

            <!-- Legend -->
            <div class="d-flex ga-3 mt-1 text-body-2 text-medium-emphasis">
              <span class="d-flex align-center ga-1">
                <span class="rounded-circle" style="width: 8px; height: 8px; background: var(--v-theme-error);"></span>
                Urgent <strong class="text-body-2">2</strong>
              </span>
              <span class="d-flex align-center ga-1">
                <span class="rounded-circle"
                  style="width: 8px; height: 8px; background: var(--v-theme-warning);"></span>
                Normal <strong class="text-body-2">2</strong>
              </span>
              <span class="d-flex align-center ga-1">
                <span class="rounded-circle"
                  style="width: 8px; height: 8px; background: var(--v-theme-primary-lighten-2);"></span>
                Low <strong class="text-body-2">1</strong>
              </span>
            </div>
          </div>

          <!-- Pending Items -->
          <div class="px-2 pb-2" style="max-height: 420px; overflow-y: auto;">
            <v-list density="compact" lines="two" class="bg-transparent">
              <v-list-item v-for="action in pendingActions" :key="action.id" class="pending-action-item rounded-lg mb-1"
                @click="emit('navigate', 'pending')">
                <template v-slot:prepend>
                  <v-avatar size="40" rounded="lg" color="primary" variant="tonal">
                    <v-icon size="18" color="primary">{{ action.icon }}</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="text-body-2 font-weight-bold">
                  {{ action.name }}
                </v-list-item-title>

                <v-list-item-subtitle class="d-flex align-center ga-1 flex-wrap">
                  <span class="text-caption text-medium-emphasis">{{ action.ref }}</span>
                  <v-chip
                    :color="action.urgency === 'urgent' ? 'error' : action.urgency === 'normal' ? 'warning' : 'grey'"
                    size="x-small" variant="tonal" class="font-weight-bold text-uppercase"
                    style="height: 18px; font-size: 8px;">
                    {{ action.urgency }}
                  </v-chip>
                </v-list-item-subtitle>

                <template v-slot:append>
                  <div class="text-right" style="min-width: 110px;">
                    <div class="text-caption text-error d-flex align-center ga-1" style="font-size: 11px;">
                      <span class="rounded-circle"
                        style="width: 5px; height: 5px; background: var(--v-theme-error);"></span>
                      {{ action.status }}
                    </div>
                    <div class="text-caption text-medium-emphasis" style="font-size: 10px;">{{ action.date }}</div>
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6" class="pt-3 pt-lg-0">
        <v-card class="rounded-xl h-100" elevation="0" border>
          <!-- Recent Activities Header -->
          <div class="d-flex align-center justify-space-between pa-4 pb-2">
            <div class="d-flex align-center gap-2">
              <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                <v-icon size="20" color="primary">mdi-clock-outline</v-icon>
              </v-avatar>
              <span class="text-h6 font-weight-bold text-uppercase tracking-tight">Recent Activities</span>
            </div>
            <v-btn variant="outlined" size="small" color="primary" class="font-weight-bold text-body-2"
              @click="emit('navigate', 'recent-activities')" rounded="lg">
              View All
            </v-btn>
          </div>

          <!-- Activity Items -->
          <div class="px-2 pb-2" style="max-height: 420px; overflow-y: auto;">
            <v-list density="compact" lines="two" class="bg-transparent">
              <v-list-item v-for="activity in recentActivities" :key="activity.action" class="rounded-lg">
                <template v-slot:prepend>
                  <v-avatar size="36" rounded="circle" color="primary" variant="tonal">
                    <v-icon size="16" color="primary">{{ activity.icon }}</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="text-body-2 font-weight-bold">
                  {{ activity.action }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption text-medium-emphasis">
                  {{ activity.time }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Row 3: Calendar Agenda | Phone Directory (50:50) -->
    <v-row class="mt-4" no-gutters>
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
            <v-btn variant="outlined" size="small" color="primary" class="font-weight-bold text-body-2"
              @click="emit('navigate', 'calendar')" rounded="lg">
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

      <v-col cols="12" lg="6" class="pt-3 pt-lg-0">
        <v-card class="rounded-xl h-100" elevation="0" border>
          <!-- Phone Directory Header -->
          <div class="d-flex align-center justify-space-between pa-4 pb-2">
            <div class="d-flex align-center gap-2">
              <v-avatar size="36" rounded="lg" color="primary" variant="tonal">
                <v-icon size="20" color="primary">mdi-phone</v-icon>
              </v-avatar>
              <span class="text-h6 font-weight-bold text-uppercase tracking-tight">Phone Directory</span>
            </div>
            <div class="d-flex align-center ga-1">
              <!-- Search -->
              <v-text-field v-model="contactSearch" density="compact" variant="outlined" placeholder="Search..."
                hide-details class="phone-directory-search" style="max-width: 140px;">
                <template v-slot:prepend-inner>
                  <v-icon size="16" color="primary">mdi-magnify</v-icon>
                </template>
              </v-text-field>

              <!-- View Toggle -->
              <v-btn-group density="compact" variant="tonal" color="primary" divided>
                <v-btn size="small" :active="directoryView === 'list'" @click="directoryView = 'list'">
                  <v-icon size="16">mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn size="small" :active="directoryView === 'grid'" @click="directoryView = 'grid'">
                  <v-icon size="16">mdi-view-grid</v-icon>
                </v-btn>
              </v-btn-group>
            </div>
          </div>

          <!-- Contacts Display -->
          <div class="px-3 pb-3" style="max-height: 460px; overflow-y: auto;">
            <!-- Grid View -->
            <v-row v-if="directoryView === 'grid'" no-gutters class="ga-1">
              <v-col v-for="contact in filteredContacts.slice(0, 6)" :key="contact.name" cols="12" sm="6" class="pa-1">
                <v-card class="rounded-xl h-100" elevation="0" border>
                  <v-card-text class="pa-2">
                    <div class="d-flex align-start ga-2">
                      <v-avatar size="40" rounded="circle" color="primary" variant="tonal">
                        <span class="font-weight-bold text-primary" style="font-size: 14px;">{{ initials(contact.name)
                        }}</span>
                      </v-avatar>
                      <div class="flex-grow-1" style="min-width: 0;">
                        <div class="text-body-2 font-weight-bold text-truncate">{{ contact.name }}</div>
                        <div class="text-caption text-medium-emphasis text-truncate" style="font-size: 10px;">{{
                          contact.jobTitle || '-' }}</div>
                        <div class="text-caption text-medium-emphasis text-truncate" style="font-size: 10px;">{{
                          contact.department || '-' }}</div>
                      </div>
                    </div>
                    <div class="mt-1 text-caption text-primary" style="font-size: 10px;">
                      <div class="d-flex align-center ga-1">
                        <v-icon size="10">mdi-phone</v-icon>
                        <span>Ext. {{ contact.ext }}</span>
                      </div>
                      <div class="d-flex align-center ga-1 text-truncate">
                        <v-icon size="10">mdi-email-outline</v-icon>
                        <span class="text-truncate">{{ contact.email }}</span>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- List View -->
            <v-list v-else density="compact" lines="two" class="bg-transparent">
              <v-list-item v-for="contact in filteredContacts.slice(0, 6)" :key="contact.name"
                class="rounded-lg mb-1 border">
                <template v-slot:prepend>
                  <v-avatar size="40" rounded="circle" color="primary" variant="tonal">
                    <span class="font-weight-bold text-primary" style="font-size: 14px;">{{ initials(contact.name)
                    }}</span>
                  </v-avatar>
                </template>

                <v-list-item-title class="text-body-2 font-weight-bold">
                  {{ contact.name }}
                </v-list-item-title>

                <v-list-item-subtitle>
                  <div class="d-flex flex-wrap ga-1 text-caption" style="font-size: 10px;">
                    <span>{{ contact.jobTitle || '-' }}</span>
                    <span class="text-medium-emphasis">·</span>
                    <span>{{ contact.department || '-' }}</span>
                  </div>
                  <div class="d-flex ga-2 text-caption text-primary" style="font-size: 10px;">
                    <span class="d-flex align-center ga-1">
                      <v-icon size="10">mdi-phone</v-icon>
                      Ext. {{ contact.ext }}
                    </span>
                    <span class="d-flex align-center ga-1 text-truncate">
                      <v-icon size="10">mdi-email-outline</v-icon>
                      <span class="text-truncate">{{ contact.email }}</span>
                    </span>
                  </div>
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>

            <!-- Empty State -->
            <div v-if="filteredContacts.length === 0" class="text-center py-6 text-medium-emphasis">
              <v-icon size="32" color="primary" class="mb-2">mdi-account-off</v-icon>
              <div class="text-caption">No contacts found</div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Emits
const emit = defineEmits<{
  (e: 'navigate', page: string): void
}>()

// State
const announcementExpanded = ref(true) // Kept true for now, hide feature commented
const currentSlideIndex = ref(0)
const sliderTimer = ref<ReturnType<typeof setInterval> | null>(null)
const contactSearch = ref('')
const directoryView = ref<'grid' | 'list'>('list')

// Quick Access Items
const quickAccessItems = ref([
  { id: 1, label: 'Staff Purchase', icon: 'mdi-bag-shopping', page: 'eservices' },
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
  { action: 'Logged in to the system', time: '2 minutes ago', type: 'login', icon: 'mdi-login' },
  { action: 'Updated Quick Access shortcuts', time: '15 minutes ago', type: 'quickaccess', icon: 'mdi-lightning-bolt' },
  { action: 'Completed pending action', time: '1 hour ago', type: 'pending', icon: 'mdi-check-circle' },
  { action: 'Checked Calendar events', time: '2 hours ago', type: 'calendar', icon: 'mdi-calendar-check' },
  { action: 'Viewed Announcements', time: '3 hours ago', type: 'announcement', icon: 'mdi-bullhorn' }
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
  { name: 'Amirul Hakim', jobTitle: 'Product Manager', ext: '1702', email: 'amirul.hakim@kotra.com', department: 'Commercial', team: 'Product' },
  { name: 'Siti Nur Aina', jobTitle: 'Regulatory Executive', ext: '2345', email: 'siti.aina@kotra.com', department: 'Regulatory Affairs', team: 'Regulatory' },
  { name: 'Muhammad Khairul', jobTitle: 'Medical Representative', ext: '2901', email: 'khairul.m@kotra.com', department: 'Sales', team: 'Medical' },
  { name: 'Yvonne Wong', jobTitle: 'HR Executive', ext: '4567', email: 'yvonne.wong@kotra.com', department: 'Human Resource', team: 'HR' },
  { name: 'Faris Azman', jobTitle: 'Finance Analyst', ext: '5678', email: 'faris.azman@kotra.com', department: 'Finance', team: 'Finance' },
  { name: 'Nurul Liyana', jobTitle: 'QC Chemist', ext: '6789', email: 'nurul.liyana@kotra.com', department: 'Quality Control', team: 'QC' }
]

const filteredContacts = computed(() => {
  if (!contactSearch.value) return contacts
  const term = contactSearch.value.toLowerCase()
  return contacts.filter(c =>
    c.name.toLowerCase().includes(term) ||
    (c.jobTitle && c.jobTitle.toLowerCase().includes(term)) ||
    (c.department && c.department.toLowerCase().includes(term))
  )
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

/* View All buttons - consistent styling */
.announcement-view-all-btn,
.v-btn.v-btn--variant-outlined {
  min-height: 36px !important;
  padding: 0 16px !important;
  border: 1.5px solid var(--v-theme-primary-lighten-3) !important;
  background: var(--v-theme-surface) !important;
  color: var(--v-theme-primary) !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  border-radius: 10px !important;
  transition: all 0.2s ease !important;
}

.announcement-view-all-btn:hover,
.v-btn.v-btn--variant-outlined:hover {
  background: var(--v-theme-primaryBg) !important;
  border-color: var(--v-theme-primary) !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--v-theme-primary) 13%, transparent) !important;
}

/* Announcement Slide Card */
.announcement-slide-card {
  cursor: pointer;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.announcement-slide-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.announcement-detail-box {
  transition: all 0.2s ease;
}

/* Quick Access Chips */
.quick-access-chip {
  min-height: 88px;
  transition: all 0.2s ease;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}

.quick-access-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 157, 154, 0.15);
}

.quick-access-chip .v-icon {
  margin-bottom: 2px;
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

/* Phone Directory Search */
.phone-directory-search :deep(.v-field) {
  border-radius: 10px;
  min-height: 32px;
}

.phone-directory-search :deep(.v-field__input) {
  font-size: 11px;
  padding-top: 2px;
  padding-bottom: 2px;
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
    min-height: 72px;
  }

  .quick-access-chip .v-icon {
    font-size: 16px !important;
  }

  .quick-access-chip span {
    font-size: 9px !important;
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
