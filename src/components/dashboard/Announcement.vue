<template>
  <v-card class="dash-card">
    <div class="card-header">
      <div class="title-wrap">
        <span class="header-icon"><v-icon size="22">mdi-bullhorn</v-icon></span>
        <h3>ANNOUNCEMENT</h3>
      </div>
      <div class="header-actions">
        <v-btn class="view-btn" variant="outlined" @click="goAnnouncements">VIEW ALL</v-btn>
        <button class="collapse-btn" type="button"><v-icon size="20">mdi-chevron-up</v-icon></button>
      </div>
    </div>

    <div class="announcement-shell" @mouseenter="paused = true" @mouseleave="paused = false">
      <div v-if="current.featuredTag" class="featured-badge">
        <v-icon size="13">mdi-star</v-icon>
        <span>{{ current.featuredTag }}</span>
      </div>

      <h2 class="announcement-title">{{ current.title }}</h2>

      <div class="meta-row">
        <span class="meta-item"><v-icon size="18">mdi-calendar-outline</v-icon>{{ current.date }}</span>
        <span class="meta-item"><v-icon size="18">mdi-clock-outline</v-icon>{{ current.time }}</span>
        <span v-if="isLatestSlide" class="new-badge">New</span>
      </div>

      <div class="details-box">
        <div class="details-heading">
          <v-icon size="18">mdi-calendar-blank-outline</v-icon>
          <span>Announcement Details</span>
        </div>

        <div v-if="current.details?.length" class="split-details dynamic-details">
          <div v-for="(detail, i) in current.details" :key="i" class="detail-col" :class="{ 'with-divider': i === 1, 'venue-detail': i === 2 }">
            <div class="detail-label">
              <v-icon size="18">mdi-calendar-outline</v-icon>{{ detail.label }}
            </div>
            <div class="detail-main">{{ detail.value }}</div>
            <div v-if="detail.subValue" class="detail-time">{{ detail.subValue }}</div>
          </div>
        </div>

        <div v-else class="split-details">
          <div class="detail-col">
            <div class="detail-label"><v-icon size="18">mdi-calendar-outline</v-icon>Details</div>
            <div class="detail-main">No details available</div>
          </div>
        </div>
      </div>

      <button class="read-more-btn" type="button" @click="openDetails">Read More</button>
    </div>

    <div class="carousel-nav">
      <button class="nav-btn" type="button" @click="prev"><v-icon size="18">mdi-chevron-left</v-icon></button>
      <button v-for="(_, i) in announcements" :key="i" class="dot" :class="{ active: index === i }" type="button"
        @click="index = i" :aria-label="`Announcement ${i + 1}`"></button>
      <button class="nav-btn" type="button" @click="next"><v-icon size="18">mdi-chevron-right</v-icon></button>
    </div>

    <v-dialog v-model="detailsDialog" max-width="820">
      <v-card rounded="xl" class="announcement-dialog">
        <v-card-text class="pa-0">
          <div class="dialog-header pa-6">
            <div class="d-flex align-center">
              <div class="ml-4 flex-grow-1">
                <div class="text-caption font-weight-bold text-medium-emphasis">ANNOUNCEMENT DETAILS</div>
                <div class="text-h5 font-weight-bold">{{ current.title }}</div>
                <div class="text-body-2 text-medium-emphasis mt-2">
                  <v-icon size="16" color="teal">mdi-calendar</v-icon>
                  Published Date: {{ current.date }}
                </div>
              </div>
              <v-btn icon variant="tonal" @click="detailsDialog=false"><v-icon>mdi-close</v-icon></v-btn>
            </div>
          </div>
          <v-divider />
          <div class="pa-6">
            <h4 class="mb-3">Description</h4>
            <p class="text-body-1">{{ current.excerpt || `Further information regarding ${current.title}.` }}</p>

            <v-card v-if="current.details?.length" variant="outlined" rounded="xl" class="pa-5 my-5 border-teal">
              <div class="text-subtitle-1 font-weight-bold text-teal mb-4">
                <v-icon>mdi-calendar</v-icon> Announcement Details
              </div>

              <div v-for="(detail, i) in current.details" :key="i" class="mb-4">
                <div class="text-caption text-teal font-weight-bold">{{ detail.label }}</div>
                <div class="font-weight-bold">{{ detail.value }}</div>
                <div v-if="detail.subValue" class="text-body-2">{{ detail.subValue }}</div>
              </div>
            </v-card>

            <div v-if="current.warning" class="text-subtitle-1 font-weight-bold text-teal mb-2">
              <v-icon size="18">mdi-information</v-icon> Additional Information
            </div>
            <p v-if="current.warning">{{ current.warning }}</p>
          </div>
          <v-divider/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAnnouncements } from '@/composables/useAnnouncements'

const router = useRouter()
const { announcements } = useAnnouncements()

const index = ref(0)
const paused = ref(false)
const detailsDialog = ref(false)

const isLatestSlide = computed(() => index.value === 0)

let timer: ReturnType<typeof setInterval> | undefined

const current = computed(() => {
  const a: any = announcements.value[index.value] || {}
  return {
    ...a,
    featured: a.isFeatured,
    type: a.category || a.type
  }
})

const next = () => {
  if (!announcements.value.length) return
  index.value = (index.value + 1) % announcements.value.length
}

const prev = () => {
  if (!announcements.value.length) return
  index.value = (index.value - 1 + announcements.value.length) % announcements.value.length
}

const openDetails = () => {
  detailsDialog.value = true
}

const goAnnouncements = () => router.push('/main/announcements')

onMounted(() => {
  timer = setInterval(() => {
    if (!paused.value) next()
  }, 5000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.dash-card {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 24px;
  padding: 18px;
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px
}

.title-wrap {
  display: flex;
  align-items: center;
  gap: 10px
}

.title-wrap h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface))
}

.header-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-primary));
  display: grid;
  place-items: center
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px
}

.view-btn {
  border-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-primary)) !important;
  border-radius: 10px !important;
  font-weight: 700;
  letter-spacing: .04em
}

.collapse-btn,
.nav-btn {
  border: 1px solid rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-primary));
  border-radius: 50%;
  display: grid;
  place-items: center
}

.collapse-btn {
  width: 44px;
  height: 44px
}

.nav-btn {
  width: 40px;
  height: 40px
}

.announcement-shell {
  transition: opacity .4s ease, transform .4s ease;
  background: rgb(var(--v-theme-surface-variant));
  border: 1px solid rgb(var(--v-theme-primary));
  border-radius: 22px;
  padding: 18px;
  min-height: 420px
}

.featured-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
  border-radius: 999px;
  padding: 7px 14px;
  font-size: 12px;
  font-weight: 800
}

.announcement-title {
  font-size: 23px;
  line-height: 1.25;
  margin: 12px 0 10px;
  color: rgb(var(--v-theme-on-surface));
  font-weight: 800
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  color: rgba(var(--v-theme-on-surface), 0.7);
  margin-bottom: 12px
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px
}

.new-badge {
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700
}

.details-box {
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-primary));
  border-radius: 18px;
  padding: 18px;
}

.details-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgb(var(--v-theme-primary));
  font-weight: 800;
  font-size: 16px;
  margin-bottom: 16px;
}

.split-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0;
}

.detail-col {
  padding: 0 18px 0 0;
  min-height: 70px;
}

.with-divider {
  border-left: 1px solid rgba(var(--v-theme-primary), .18);
  padding-left: 18px;
  padding-right: 0;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: rgb(var(--v-theme-primary));
  font-weight: 800;
  font-size: 14px;
  margin-bottom: 8px;
}

.detail-main {
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
  font-size: 16px;
  line-height: 1.3;
}

.detail-time {
  font-size: 14px;
  color: rgba(var(--v-theme-on-surface), .75);
  margin-top: 4px;
}

.detail-label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: rgb(var(--v-theme-primary));
  font-weight: 800;
  font-size: 15px;
  margin-bottom: 6px
}

.detail-main {
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
  font-size: 16px
}

.detail-time {
  font-size: 16px;
  color: rgb(var(--v-theme-on-surface));
  margin-top: 3px
}

.holiday-detail {
  padding-top: 4px
}

.read-more-btn {
  margin-top: 12px;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-surface));
  border: 0;
  border-radius: 10px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 800;
  box-shadow: none
}

.carousel-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 14px
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 0;
  background: rgb(var(--v-theme-surface-variant));
  padding: 0
}

.dot.active {
  background: rgb(var(--v-theme-primary));
  transform: scale(1.08)
}


.dynamic-details .venue-detail {
  grid-column: 1;
  margin-top: 10px;
  padding-left: 0;
}

.dynamic-details .venue-detail .detail-label {
  margin-bottom: 6px;
}

.dynamic-details .venue-detail .detail-main {
  max-width: 100%;
}

@media (max-width:700px) {
  .split-details {
    grid-template-columns: 1fr
  }

  .with-divider {
    border-left: 0;
    border-top: 1px solid rgb(var(--v-theme-surface-variant));
    padding-left: 0;
    padding-top: 14px;
    margin-top: 14px
  }

  .announcement-title {
    font-size: 19px
  }

  .announcement-shell {
    transition: opacity .4s ease, transform .4s ease;
    padding: 16px
  }

  .card-header {
    align-items: flex-start
  }

  .header-actions {
    gap: 6px
  }

  .view-btn {
    min-width: auto
  }
}
</style>
