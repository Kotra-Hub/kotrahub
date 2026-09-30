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
      <v-row dense class="dashboard-grid">
        <v-col cols="12" md="6"><Announcement /></v-col>
        <v-col cols="12" md="6"><QuickAccess /></v-col>
        <v-col cols="12" md="6"><PendingAction /></v-col>
        <v-col cols="12" md="6"><RecentActivity /></v-col>
        <v-col cols="12" md="6"><CalendarAgenda /></v-col>
        <v-col cols="12" md="6"><PhoneDirectory /></v-col>
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
}

</style>
