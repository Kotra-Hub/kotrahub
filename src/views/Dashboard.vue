<script setup>
import Announcement from "@/components/dashboard/Announcement.vue"
import QuickAccess from "@/components/dashboard/QuickAccess.vue"
import PendingAction from "@/components/dashboard/PendingAction.vue"
import RecentActivity from "@/components/dashboard/RecentActivity.vue"
import CalendarAgenda from "@/components/dashboard/CalendarAgenda.vue"
import PhoneDirectory from "@/components/dashboard/PhoneDirectory.vue"


// Announcement carousel autoplay
let announcementTimer;
let announcementPaused = false;

function startAnnouncementAutoPlay() {
  clearInterval(announcementTimer);
  announcementTimer = setInterval(() => {
    if (!announcementPaused) {
      const nextButton = document.querySelector('.announcement-next, .carousel-next, .next-btn');
      if (nextButton) nextButton.click();
    }
  }, 5000);
}

function pauseAnnouncementAutoPlay() {
  announcementPaused = true;
}

function resumeAnnouncementAutoPlay() {
  announcementPaused = false;
}

document.addEventListener('DOMContentLoaded', () => {
  const announcement = document.querySelector('.announcement-carousel');
  if (announcement) {
    announcement.addEventListener('mouseenter', pauseAnnouncementAutoPlay);
    announcement.addEventListener('mouseleave', resumeAnnouncementAutoPlay);
    startAnnouncementAutoPlay();
  }
});
</script>

<template>
  <div class="dashboard-page">
    <v-container fluid class="dashboard-container">
      <v-row dense class="dashboard-grid dashboard-row">
        <v-col cols="12" md="6" class="dashboard-col"><Announcement /></v-col>
        <v-col cols="12" md="6" class="dashboard-col"><QuickAccess /></v-col>
      </v-row>

      <v-row dense class="dashboard-grid dashboard-row">
        <v-col cols="12" md="6" class="dashboard-col"><PendingAction /></v-col>
        <v-col cols="12" md="6" class="dashboard-col"><RecentActivity /></v-col>
      </v-row>

      <v-row dense class="dashboard-grid dashboard-row">
        <v-col cols="12" md="6" class="dashboard-col"><CalendarAgenda /></v-col>
        <v-col cols="12" md="6" class="dashboard-col"><PhoneDirectory /></v-col>
      </v-row>
    </v-container>
    
  </div>
</template>

<style scoped>
.dashboard-page{
 min-height:100vh;
 background:rgb(var(--v-theme-background));
}
.dashboard-container{
 padding:16px 12px;
 max-width:100%;
 overflow-x:hidden;
}
.dashboard-grid{
 row-gap:16px;
 align-items:flex-start;
}


.dashboard-grid {
  align-items: flex-start;
  min-height: 0;
  overflow: hidden;
}

.dashboard-col {
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex: 0 0 50%;
  max-width: 50%;
}

.dashboard-col :deep(.dash-card) {
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
}

.dashboard-grid {
  width: 100%;
}

.dashboard-row {
  align-items: stretch;
}

.dashboard-row .dashboard-col {
  display: flex;
  align-items: stretch;
}

.dashboard-row .dashboard-col :deep(.dash-card) {
  height: 100%;
  min-height: 100%;
}

@media (max-width: 960px) {
  .dashboard-col {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>


/* Phone Directory email single line ellipsis */
.phone-email-ellipsis {
  display: block;
  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
