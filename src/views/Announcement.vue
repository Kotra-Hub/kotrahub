<!-- src/views/Announcement.vue -->
<template>
  <div class="announcement-page">
    <!-- HEADER SECTION -->
    <div class="page-header d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
      <div class="d-flex align-center ga-3">
        <v-avatar size="48" rounded="lg" color="primary" variant="tonal">
          <v-icon size="24" color="primary">mdi-bullhorn</v-icon>
        </v-avatar>
        <div>
          <h1 class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            Announcements
          </h1>
          <p class="text-body-2 text-medium-emphasis mt-0 mb-0">
            Stay updated with the latest announcements and notices
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
          <v-col cols="12" md="5" lg="4">
            <v-text-field
              v-model="searchQuery"
              density="compact"
              variant="outlined"
              placeholder="Search announcements..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
              rounded="lg"
              class="announcement-search"
            />
          </v-col>
          <v-col cols="12" md="7" lg="8">
            <div class="d-flex flex-wrap align-center ga-2">
              <v-select
                v-model="selectedFilter"
                :items="filterOptions"
                density="compact"
                variant="outlined"
                placeholder="All Announcements"
                hide-details
                rounded="lg"
                class="announcement-filter-select"
                style="min-width: 160px;"
              />
              <v-select
                v-model="selectedSort"
                :items="sortOptions"
                density="compact"
                variant="outlined"
                placeholder="Sort by"
                hide-details
                rounded="lg"
                class="announcement-filter-select"
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

    <!-- ANNOUNCEMENT GRID / LIST -->
    <v-card class="rounded-xl" elevation="0" border>
      <v-card-text class="pa-0">
        <!-- Loading State -->
        <div v-if="loading" class="d-flex justify-center align-center pa-8" style="min-height: 200px;">
          <v-progress-circular indeterminate color="primary" size="40" />
        </div>

        <!-- Announcement Items -->
        <template v-else>
          <v-list density="compact" class="bg-transparent">
            <template v-for="(announcement, index) in paginatedAnnouncements" :key="announcement.id">
              <v-list-item
                class="announcement-list-item"
                :class="{ 'announcement-list-last': index === paginatedAnnouncements.length - 1 }"
                @click="openAnnouncement(announcement)"
              >
                <!-- ICON / AVATAR -->
                <template #prepend>
                  <v-avatar size="48" color="primary" variant="tonal" class="announcement-avatar">
                    <v-icon size="22" color="primary">mdi-bullhorn</v-icon>
                  </v-avatar>
                </template>

                <!-- MAIN CONTENT -->
                <div class="announcement-content flex-grow-1" style="min-width: 0;">
                  <div class="d-flex align-center flex-wrap ga-2">
                    <span class="text-body-1 font-weight-bold announcement-title text-truncate">
                      {{ announcement.title }}
                    </span>
                    <v-chip
                      v-if="announcement.isFeatured"
                      size="x-small"
                      class="font-weight-bold text-uppercase"
                      style="background: rgb(var(--v-theme-primary)); color: white; height: 20px; font-size: 9px; padding: 0 10px; flex-shrink: 0;"
                    >
                      <v-icon size="11" color="yellow" class="mr-1">mdi-star</v-icon>
                      Featured
                    </v-chip>
                    <v-chip
                      v-if="announcement.isNew"
                      size="x-small"
                      color="error"
                      variant="tonal"
                      class="font-weight-bold text-uppercase"
                      style="height: 20px; font-size: 9px; flex-shrink: 0;"
                    >
                      New
                    </v-chip>
                  </div>

                  <!-- Excerpt -->
                  <v-list-item-subtitle class="announcement-excerpt text-truncate">
                    <span class="text-caption text-medium-emphasis">
                      {{ announcement.excerpt || announcement.details?.[0]?.value || 'No description available' }}
                    </span>
                  </v-list-item-subtitle>

                  <!-- Meta Information -->
                  <div class="d-flex flex-wrap align-center ga-3 mt-1">
                    <span class="d-flex align-center ga-1 text-caption" style="color: rgb(var(--v-theme-textMuted));">
                      <v-icon size="13" color="primary">mdi-calendar-outline</v-icon>
                      {{ announcement.date }}
                    </span>
                    <span class="d-flex align-center ga-1 text-caption" style="color: rgb(var(--v-theme-textMuted));">
                      <v-icon size="13" color="primary">mdi-clock-outline</v-icon>
                      {{ announcement.time || '09:30 AM' }}
                    </span>
                    <span v-if="announcement.category" class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                      • {{ announcement.category }}
                    </span>
                  </div>
                </div>

                <!-- RIGHT SECTION -->
                <template #append>
                  <div class="d-flex align-center ga-3 announcement-right-section">
                    <!-- Details Preview (Desktop) -->
                    <div v-if="announcement.details && announcement.details.length > 0" class="d-none d-md-flex flex-column align-end text-right announcement-details-preview" style="min-width: 150px; flex-shrink: 0;">
                      <div v-for="(detail, idx) in announcement.details.slice(0, 2)" :key="idx" class="text-caption">
                        <span class="font-weight-medium" style="color: rgb(var(--v-theme-on-surface));">
                          {{ detail.label }}:
                        </span>
                        <span style="color: rgb(var(--v-theme-textMuted));">
                          {{ detail.value }}
                        </span>
                      </div>
                    </div>

                    <!-- Chevron -->
                    <v-btn
                      icon
                      size="x-small"
                      variant="text"
                      color="primary"
                      class="announcement-detail-btn"
                      style="flex-shrink: 0;"
                    >
                      <v-icon size="18">mdi-chevron-right</v-icon>
                    </v-btn>
                  </div>
                </template>
              </v-list-item>
            </template>

            <!-- EMPTY STATE -->
            <div v-if="filteredAnnouncements.length === 0" class="empty-state pa-6 text-center">
              <v-icon size="48" color="primary" class="mb-3">mdi-bullhorn-off-outline</v-icon>
              <div class="text-h6 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
                No announcements found
              </div>
              <div class="text-body-2 text-medium-emphasis">
                Try adjusting your search or filters
              </div>
            </div>
          </v-list>
        </template>
      </v-card-text>

      <!-- PAGINATION -->
      <v-divider v-if="filteredAnnouncements.length > 0" />
      <v-card-actions v-if="filteredAnnouncements.length > 0" class="pa-3">
        <v-spacer />
        <div class="d-flex align-center ga-2">
          <span class="text-caption text-medium-emphasis">
            Showing {{ paginationStart + 1 }} – {{ Math.min(paginationStart + pageSize, filteredAnnouncements.length) }}
            of {{ filteredAnnouncements.length }}
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
            :disabled="paginationStart + pageSize >= filteredAnnouncements.length"
            @click="paginationStart += pageSize"
          >
            <v-icon size="18">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>

    <!-- ANNOUNCEMENT DETAIL DIALOG -->
    <DialogPopup
      v-model="detailDialog"
      :title="selectedAnnouncement?.title || 'Announcement Details'"
      :subtitle="selectedAnnouncement ? formatDialogSubtitle(selectedAnnouncement) : ''"
      icon="mdi-bullhorn"
      icon-color="rgb(var(--v-theme-primary))"
      width="680"
      :show-bm="!!selectedAnnouncement?.bm"
      :warning="selectedAnnouncement?.warning || ''"
      :bm-content="bmContentHtml"
      :actions="dialogActions"
      @close="detailDialog = false"
    >
      <div v-html="noticeBodyHtml"></div>
    </DialogPopup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DialogPopup from '@/components/DialogPopup.vue'

// State
const searchQuery = ref('')
const selectedFilter = ref('All')
const selectedSort = ref('Newest First')
const paginationStart = ref(0)
const pageSize = 10
const loading = ref(false)
const detailDialog = ref(false)
const selectedAnnouncement = ref<any>(null)

// Dialog Actions
const dialogActions = computed(() => [])

// Filter Options
const filterOptions = [
  'All',
  'Featured',
  'New',
  'Holiday',
  'Event',
  'Policy Update',
  'Staff Purchase',
  'General'
]

const sortOptions = [
  'Newest First',
  'Oldest First',
  'Title A-Z',
  'Title Z-A'
]

// Announcement Data
interface AnnouncementDetail {
  label: string
  value: string
  subValue?: string
}

interface Announcement {
  id: number
  title: string
  date: string
  time?: string
  isNew: boolean
  isFeatured?: boolean
  excerpt?: string
  category?: string
  warning?: string
  details?: AnnouncementDetail[]
  bm?: {
    title?: string
    body: string[]
  }
}

const announcements = ref<Announcement[]>([
  {
    id: 1,
    title: 'Public Holiday – Melaka Governor\'s Birthday',
    date: '24 Aug 2026',
    time: '09:30 AM',
    isNew: true,
    isFeatured: true,
    category: 'Holiday',
    excerpt: 'Please be informed that this year\'s Melaka Governor\'s Birthday falls on Monday, 24 August 2026. All offices will be closed in observance of the public holiday.',
    warning: 'Please plan your work accordingly and ensure all urgent matters are attended to before the holiday.',
    details: [
      { label: 'Holiday Date', value: 'Monday, 24 August 2026' },
      { label: 'Offices Affected', value: 'All Offices (HQ & Regional)' }
    ],
    bm: {
      title: 'Cuti Umum – Hari Keputeraan Yang di-Pertua Negeri Melaka',
      body: [
        'Dimaklumkan bahawa Hari Keputeraan Yang di-Pertua Negeri Melaka pada tahun ini jatuh pada hari Isnin, 24 Ogos 2026. Semua pejabat akan ditutup sempena cuti umum tersebut.',
        'Sila merancang kerja anda dengan sewajarnya dan pastikan semua urusan penting diselesaikan sebelum cuti.'
      ]
    }
  },
  {
    id: 2,
    title: 'Replacement Holiday – HQ only',
    date: '24 Aug 2026',
    time: '09:30 AM',
    isNew: true,
    isFeatured: false,
    category: 'Holiday',
    excerpt: 'Further to memo dated 16 March 2026 regarding the additional public holiday, HQ will observe a replacement holiday on 31 August 2026.',
    warning: 'This replacement holiday is applicable to HQ employees only. Regional offices will operate as usual.',
    details: [
      { label: 'Start Date', value: '31 August 2026 (Monday)' },
      { label: 'End Date', value: '1 September 2026 (Tuesday)' },
      { label: 'Affected Office', value: 'HQ Only' }
    ],
    bm: {
      title: 'Cuti Gantian – HQ sahaja',
      body: [
        'Sehubungan dengan memo bertarikh 16 Mac 2026 mengenai cuti umum tambahan, HQ akan mengambil cuti gantian pada 31 Ogos 2026.',
        'Cuti gantian ini hanya terpakai untuk pekerja HQ sahaja. Pejabat serantau akan beroperasi seperti biasa.'
      ]
    }
  },
  {
    id: 3,
    title: 'Staff Purchase – Special Offer',
    date: '12 May 2026',
    time: '09:00 AM',
    isNew: false,
    isFeatured: true,
    category: 'Staff Purchase',
    excerpt: 'Exclusive staff purchase event with special discounts on selected products. Don\'t miss out on this limited-time offer!',
    warning: 'The special offer is valid while stocks last. Terms and conditions apply.',
    details: [
      { label: 'Start Date & Time', value: '15 May 2026 (Friday)', subValue: '09:00 AM' },
      { label: 'End Date & Time', value: '22 May 2026 (Friday)', subValue: '05:00 PM' },
      { label: 'Location', value: 'Staff Store, Ground Floor' }
    ]
  },
  {
    id: 4,
    title: 'New Policy Update – Remote Work Guidelines',
    date: '10 May 2026',
    time: '02:00 PM',
    isNew: false,
    isFeatured: false,
    category: 'Policy Update',
    excerpt: 'Updated remote work guidelines effective 1 June 2026. Please review the new policy document for details.',
    details: [
      { label: 'Effective Date', value: '1 June 2026' },
      { label: 'Document Link', value: 'Click here to view policy' }
    ]
  },
  {
    id: 5,
    title: 'Annual Dinner & Awards Night 2026',
    date: '5 May 2026',
    time: '10:00 AM',
    isNew: false,
    isFeatured: false,
    category: 'Event',
    excerpt: 'Join us for the Annual Dinner & Awards Night 2026. Book your seats now!',
    warning: 'Limited seats available. Please register before the deadline.',
    details: [
      { label: 'Date', value: '15 December 2026 (Saturday)' },
      { label: 'Time', value: '7:00 PM – 11:00 PM' },
      { label: 'Venue', value: 'Grand Ballroom, Hotel Melaka' }
    ]
  },
  {
    id: 6,
    title: 'System Maintenance – 29 August 2026',
    date: '25 Aug 2026',
    time: '08:00 AM',
    isNew: true,
    isFeatured: false,
    category: 'General',
    excerpt: 'Scheduled system maintenance on 29 August 2026 from 10:00 PM to 2:00 AM. The system will be unavailable during this period.',
    warning: 'Employees are advised not to perform critical transactions during the maintenance window. If you experience access issues after the maintenance period, please contact the relevant support team.',
    details: [
      { label: 'Date', value: '29 August 2026 (Saturday)' },
      { label: 'Time', value: '10:00 PM – 2:00 AM' },
      { label: 'Expected Downtime', value: '4 hours' }
    ],
    bm: {
      title: 'Penyelenggaraan Sistem – 29 Ogos 2026',
      body: [
        'Penyelenggaraan sistem berjadual pada 29 Ogos 2026 dari jam 10:00 malam hingga 2:00 pagi. Sistem akan tidak tersedia sepanjang tempoh ini.',
        'Pekerja dinasihatkan supaya tidak menjalankan transaksi kritikal semasa tempoh penyelenggaraan.'
      ]
    }
  },
  {
    id: 7,
    title: 'HR Requisition Form Update',
    date: '20 Jul 2026',
    time: '11:30 AM',
    isNew: false,
    isFeatured: false,
    category: 'Policy Update',
    excerpt: 'The HR Requisition form has been updated with new fields. Please use the latest version for all submissions.',
    details: [
      { label: 'Form Version', value: 'v3.2 (July 2026)' },
      { label: 'Effective Date', value: '1 August 2026' }
    ]
  },
  {
    id: 8,
    title: 'Training Program – Leadership Development',
    date: '15 Jul 2026',
    time: '09:00 AM',
    isNew: false,
    isFeatured: false,
    category: 'Event',
    excerpt: 'Leadership Development Training Program for Managers. Limited seats available.',
    warning: 'Registration is on a first-come, first-served basis. Only 20 seats available.',
    details: [
      { label: 'Date', value: '10-12 September 2026' },
      { label: 'Venue', value: 'Training Center, Level 5' },
      { label: 'Registration Deadline', value: '31 August 2026' }
    ]
  },
  {
    id: 9,
    title: 'Office Closure – National Day',
    date: '10 Jul 2026',
    time: '10:00 AM',
    isNew: false,
    isFeatured: false,
    category: 'Holiday',
    excerpt: 'All offices will be closed on 31 August 2026 in celebration of National Day.',
    details: [
      { label: 'Date', value: '31 August 2026 (Monday)' },
      { label: 'Offices Affected', value: 'All Offices' }
    ]
  },
  {
    id: 10,
    title: 'New Staff Onboarding – Welcome!',
    date: '1 Jul 2026',
    time: '08:30 AM',
    isNew: false,
    isFeatured: false,
    category: 'General',
    excerpt: 'Welcome to all new staff joining us in July 2026. Please complete your onboarding tasks.',
    details: [
      { label: 'Onboarding Date', value: '1 July 2026' },
      { label: 'Orientation', value: '9:00 AM – 12:00 PM, HR Training Room' }
    ]
  }
])

// Computed
const filteredAnnouncements = computed(() => {
  let result = [...announcements.value]

  // Search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    result = result.filter(a =>
      a.title.toLowerCase().includes(query) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(query)) ||
      (a.category && a.category.toLowerCase().includes(query)) ||
      (a.details && a.details.some(d =>
        d.label.toLowerCase().includes(query) ||
        d.value.toLowerCase().includes(query)
      ))
    )
  }

  // Filter
  if (selectedFilter.value !== 'All') {
    switch (selectedFilter.value) {
      case 'Featured':
        result = result.filter(a => a.isFeatured)
        break
      case 'New':
        result = result.filter(a => a.isNew)
        break
      default:
        result = result.filter(a => a.category === selectedFilter.value)
        break
    }
  }

  // Sort
  switch (selectedSort.value) {
    case 'Newest First':
      result.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return bDate.getTime() - aDate.getTime()
      })
      break
    case 'Oldest First':
      result.sort((a, b) => {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        return aDate.getTime() - bDate.getTime()
      })
      break
    case 'Title A-Z':
      result.sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'Title Z-A':
      result.sort((a, b) => b.title.localeCompare(a.title))
      break
  }

  return result
})

const paginatedAnnouncements = computed(() => {
  const start = paginationStart.value
  const end = Math.min(start + pageSize, filteredAnnouncements.value.length)
  return filteredAnnouncements.value.slice(start, end)
})

// Dialog content builders
const noticeBodyHtml = computed(() => {
  const notice = selectedAnnouncement.value
  if (!notice) return ''

  // Build body content
  let html = ''

  // Add badges
  let badges = []
  if (notice.isFeatured) badges.push('<span class="featured-badge">⭐ Featured</span>')
  if (notice.isNew) badges.push('<span class="new-badge">New</span>')
  if (notice.category) badges.push(`<span class="category-badge">${notice.category}</span>`)

  if (badges.length > 0) {
    html += `<div class="badges-container">${badges.join(' ')}</div>`
  }

  // Add details if available
  if (notice.details && notice.details.length > 0) {
    html += `<div class="details-grid">`
    notice.details.forEach((detail: any) => {
      html += `<div class="detail-item">
        <div class="detail-label">${detail.label}</div>
        <div class="detail-value">${detail.value}</div>
        ${detail.subValue ? `<div class="detail-subvalue">${detail.subValue}</div>` : ''}
      </div>`
    })
    html += `</div>`
    if (notice.excerpt) {
      html += `<hr class="divider" />`
    }
  }

  // Add excerpt if available
  if (notice.excerpt) {
    html += `<div class="excerpt-content">${notice.excerpt}</div>`
  }

  if (!notice.details?.length && !notice.excerpt) {
    html = '<p class="text-medium-emphasis">No additional details available for this announcement.</p>'
  }

  return html
})

const bmContentHtml = computed(() => {
  const notice = selectedAnnouncement.value
  if (!notice?.bm) return ''

  const bmBody = notice.bm.body.map((item: string) => `<p>${item}</p>`).join('')
  return `<p class="mb-2 font-bold" style="color: rgb(var(--v-theme-on-surface));">${notice.bm.title || 'Terjemahan Bahasa Malaysia'}</p>${bmBody}`
})

// Methods
const resetFilters = () => {
  searchQuery.value = ''
  selectedFilter.value = 'All'
  selectedSort.value = 'Newest First'
  paginationStart.value = 0
}

const openAnnouncement = (announcement: Announcement) => {
  selectedAnnouncement.value = announcement
  detailDialog.value = true
}

const formatDialogSubtitle = (announcement: Announcement) => {
  let parts = []
  if (announcement.date) parts.push(announcement.date)
  if (announcement.time) parts.push(announcement.time)
  if (announcement.category) parts.push(announcement.category)
  return parts.join(' • ')
}

watch([searchQuery, selectedFilter, selectedSort], () => {
  paginationStart.value = 0
})
</script>

<style scoped>
.announcement-page {
  width: 100%;
  padding: 16px 0;
}

.page-header {
  width: 100%;
}

/* Search & Filters */
.announcement-search :deep(.v-field) {
  border-radius: 12px !important;
}

.announcement-search :deep(.v-field__input) {
  font-size: 14px !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
}

.announcement-filter-select :deep(.v-field) {
  border-radius: 12px !important;
  min-height: 40px !important;
}

.announcement-filter-select :deep(.v-field__input) {
  font-size: 13px !important;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}

/* Announcement List Items */
.announcement-list-item {
  min-height: 88px !important;
  padding: 14px 16px !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  border-radius: 0 !important;
  cursor: pointer;
  transition: background 0.15s ease;
}

.announcement-list-item:hover {
  background: rgba(var(--v-theme-primary), 0.04);
}

.announcement-list-last {
  border-bottom: none !important;
}

.announcement-avatar {
  background: var(--v-theme-primaryBg) !important;
  border: 1.5px solid rgba(var(--v-theme-primary), 0.10) !important;
  flex-shrink: 0 !important;
  margin-right: 14px !important;
}

.announcement-content {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
}

.announcement-title {
  color: rgb(var(--v-theme-on-surface)) !important;
  line-height: 1.3;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.announcement-excerpt {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 2px;
}

/* Right section */
.announcement-right-section {
  flex-shrink: 0;
  min-width: 160px;
}

.announcement-details-preview {
  min-width: 150px;
  line-height: 1.4;
}

.announcement-detail-btn {
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.announcement-list-item:hover .announcement-detail-btn {
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

/* Dialog Content Styles */
.dialog-content :deep(.badges-container) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.dialog-content :deep(.featured-badge) {
  background: rgb(var(--v-theme-primary));
  color: white;
  padding: 2px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
}

.dialog-content :deep(.new-badge) {
  background: rgb(var(--v-theme-error));
  color: white;
  padding: 2px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  height: 24px;
  display: inline-flex;
  align-items: center;
}

.dialog-content :deep(.category-badge) {
  background: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  padding: 2px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  height: 24px;
  display: inline-flex;
  align-items: center;
}

.dialog-content :deep(.details-grid) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.dialog-content :deep(.detail-item) {
  background: rgba(var(--v-theme-primary), 0.04);
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid rgba(var(--v-theme-primary), 0.08);
}

.dialog-content :deep(.detail-label) {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 4px;
}

.dialog-content :deep(.detail-value) {
  font-size: 15px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.dialog-content :deep(.detail-subvalue) {
  font-size: 13px;
  color: rgb(var(--v-theme-textMuted));
  margin-top: 2px;
}

.dialog-content :deep(.divider) {
  border: none;
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  margin: 16px 0;
}

.dialog-content :deep(.excerpt-content) {
  font-size: 14px;
  line-height: 1.7;
  color: rgb(var(--v-theme-on-surface));
}

.dialog-content :deep(.text-medium-emphasis) {
  color: rgb(var(--v-theme-textMuted));
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

  .announcement-filter-select {
    min-width: 120px !important;
    flex: 1 1 auto;
  }

  .announcement-list-item {
    min-height: 76px !important;
    padding: 10px 12px !important;
  }

  .announcement-avatar {
    width: 40px !important;
    height: 40px !important;
    min-width: 40px !important;
    margin-right: 10px !important;
  }

  .announcement-avatar .v-icon {
    font-size: 18px !important;
  }

  .announcement-title {
    font-size: 14px !important;
  }

  .announcement-right-section {
    min-width: auto;
    gap: 6px !important;
  }

  .announcement-detail-btn {
    opacity: 1 !important;
  }

  .announcement-details-preview {
    display: none !important;
  }

  .dialog-content :deep(.details-grid) {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .announcement-list-item .v-list-item__append {
    margin-left: 6px !important;
  }
}

/* Dark Mode */
:deep(.dark) .announcement-list-item {
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

:deep(.dark) .announcement-list-item:hover {
  background: rgba(15, 157, 154, 0.12);
}

:deep(.dark) .announcement-avatar {
  background: rgba(15, 157, 154, 0.15) !important;
  border-color: rgba(15, 157, 154, 0.2) !important;
}

:deep(.dark) .dialog-content .detail-item {
  background: rgba(15, 157, 154, 0.08);
  border-color: rgba(15, 157, 154, 0.15);
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
