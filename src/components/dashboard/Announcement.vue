<template>
  <v-card class="dash-card announcement-card" elevation="0">
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
      <div v-if="current.featured" class="featured-badge">
        <v-icon size="13">mdi-star</v-icon>
        <span>FEATURED</span>
      </div>

      <h2 class="announcement-title">{{ current.title }}</h2>

      <div class="meta-row">
        <span class="meta-item"><v-icon size="18">mdi-calendar-outline</v-icon>{{ current.date }}</span>
        <span class="meta-item"><v-icon size="18">mdi-clock-outline</v-icon>{{ current.time }}</span>
        <span v-if="current.isNew" class="new-badge">New</span>
      </div>

      <div class="details-box">
        <div class="details-heading">
          <v-icon size="18">mdi-calendar-blank-outline</v-icon>
          <span>Announcement Details</span>
        </div>

        <div v-if="current.type === 'holiday'" class="holiday-detail">
          <div class="detail-label"><v-icon size="18">mdi-calendar-outline</v-icon>Holiday Date</div>
          <div class="detail-main">24 August 2026 (Monday)</div>
        </div>

        <div v-else-if="current.type === 'replacement'" class="split-details">
          <div class="detail-col">
            <div class="detail-label"><v-icon size="18">mdi-calendar-outline</v-icon>Start Date</div>
            <div class="detail-main">31 August 2026 (Monday)</div>
          </div>
          <div class="detail-col with-divider">
            <div class="detail-label"><v-icon size="18">mdi-calendar-outline</v-icon>End Date</div>
            <div class="detail-main">1 September 2026 (Tuesday)</div>
          </div>
        </div>

        <div v-else class="split-details">
          <div class="detail-col">
            <div class="detail-label"><v-icon size="18">mdi-calendar-outline</v-icon>Start Date & Time</div>
            <div class="detail-main">15 May 2026 (Friday)</div>
            <div class="detail-time">09:00 AM</div>
          </div>
          <div class="detail-col with-divider">
            <div class="detail-label"><v-icon size="18">mdi-calendar-outline</v-icon>End Date & Time</div>
            <div class="detail-main">22 May 2026 (Friday)</div>
            <div class="detail-time">05:00 PM</div>
          </div>
        </div>
      </div>

      <button class="read-more-btn" type="button">Read More</button>
    </div>

    <div class="carousel-nav">
      <button class="nav-btn" type="button" @click="prev"><v-icon size="18">mdi-chevron-left</v-icon></button>
      <button v-for="(_, i) in announcements" :key="i" class="dot" :class="{ active: index === i }" type="button" @click="index = i" :aria-label="`Announcement ${i+1}`"></button>
      <button class="nav-btn" type="button" @click="next"><v-icon size="18">mdi-chevron-right</v-icon></button>
    </div>
  </v-card>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goAnnouncements = () => router.push('/main/announcements')

const announcements = [
  {
    featured: true,
    title: "Public Holiday – Melaka Governor's Birthday",
    date: 'Monday, 17 August 2026',
    time: '09:30 AM',
    isNew: true,
    type: 'holiday',
  },
  {
    featured: true,
    title: 'Replacement Holiday – HQ only',
    date: '24 August 2026',
    time: '09:30 AM',
    isNew: false,
    type: 'replacement',
  },
  {
    featured: true,
    title: 'Staff Purchase – Special Offer',
    date: '12 May 2026',
    time: '09:00 AM',
    isNew: false,
    type: 'offer',
  },
]

const index = ref(0)
const current = computed(() => announcements[index.value])
const prev = () => { index.value = (index.value - 1 + announcements.length) % announcements.length }
const next = () => { index.value = (index.value + 1) % announcements.length }

let timer = null
const paused = ref(false)

const startAutoSlide = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    if (!paused.value) next()
  }, 5000)
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.dash-card{background:rgb(var(--v-theme-surface));border:1px solid rgba(var(--v-theme-on-surface), 0.12);border-radius:24px;padding:18px;height:100%;}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px}
.title-wrap{display:flex;align-items:center;gap:10px}.title-wrap h3{margin:0;font-size:18px;font-weight:800;color:rgb(var(--v-theme-on-surface))}
.header-icon{width:44px;height:44px;border-radius:50%;background:rgb(var(--v-theme-surface-variant));color:rgb(var(--v-theme-primary));display:grid;place-items:center}
.header-actions{display:flex;align-items:center;gap:10px}.view-btn{border-color:rgb(var(--v-theme-primary))!important;color:rgb(var(--v-theme-primary))!important;border-radius:10px!important;font-weight:700;letter-spacing:.04em}
.collapse-btn,.nav-btn{border:1px solid rgb(var(--v-theme-primary));background:rgb(var(--v-theme-surface));color:rgb(var(--v-theme-primary));border-radius:50%;display:grid;place-items:center}
.collapse-btn{width:44px;height:44px}.nav-btn{width:40px;height:40px}
.announcement-shell{transition:opacity .4s ease, transform .4s ease;background:rgb(var(--v-theme-surface-variant));border:1px solid rgb(var(--v-theme-primary));border-radius:22px;padding:22px}
.featured-badge{display:inline-flex;align-items:center;gap:6px;background:rgb(var(--v-theme-primary));color:rgb(var(--v-theme-surface));border-radius:999px;padding:7px 14px;font-size:12px;font-weight:800}
.announcement-title{font-size:23px;line-height:1.25;margin:16px 0 12px;color:rgb(var(--v-theme-on-surface));font-weight:800}
.meta-row{display:flex;align-items:center;gap:16px;flex-wrap:wrap;color:rgba(var(--v-theme-on-surface),0.7);margin-bottom:18px}.meta-item{display:flex;align-items:center;gap:6px}.new-badge{background:rgb(var(--v-theme-primary));color:rgb(var(--v-theme-surface));padding:5px 12px;border-radius:999px;font-size:12px;font-weight:700}
.details-box{background:rgb(var(--v-theme-surface));border:1px solid rgb(var(--v-theme-primary));border-radius:18px;padding:18px}.details-heading{display:flex;align-items:center;gap:8px;color:rgb(var(--v-theme-primary));font-weight:800;font-size:16px;margin-bottom:14px}
.split-details{display:grid;grid-template-columns:1fr 1fr;gap:0}.detail-col{padding-right:18px}.with-divider{border-left:1px solid rgb(var(--v-theme-surface-variant));padding-left:18px;padding-right:0}
.detail-label{display:flex;align-items:center;gap:7px;color:rgb(var(--v-theme-primary));font-weight:800;font-size:15px;margin-bottom:6px}.detail-main{font-weight:800;color:rgb(var(--v-theme-on-surface));font-size:17px}.detail-time{font-size:16px;color:rgb(var(--v-theme-on-surface));margin-top:3px}.holiday-detail{padding-top:4px}
.read-more-btn{margin-top:14px;background:rgb(var(--v-theme-primary));color:rgb(var(--v-theme-surface));border:0;border-radius:10px;padding:12px 24px;font-size:16px;font-weight:800;box-shadow:none}
.carousel-nav{display:flex;justify-content:center;align-items:center;gap:10px;margin-top:14px}.dot{width:12px;height:12px;border-radius:50%;border:0;background:rgb(var(--v-theme-surface-variant));padding:0}.dot.active{background:rgb(var(--v-theme-primary));transform:scale(1.08)}
@media (max-width:700px){.split-details{grid-template-columns:1fr}.with-divider{border-left:0;border-top:1px solid rgb(var(--v-theme-surface-variant));padding-left:0;padding-top:14px;margin-top:14px}.announcement-title{font-size:19px}.announcement-shell{transition:opacity .4s ease, transform .4s ease;padding:16px}.card-header{align-items:flex-start}.header-actions{gap:6px}.view-btn{min-width:auto}}

</style>
