<template>
  <v-card class="dash-card">
    <div class="card-header">
      <div class="title-wrap">
        <span class="header-icon"><v-icon size="22">mdi-calendar</v-icon></span>
        <h3>CALENDAR AGENDA</h3>
      </div>
      <div class="header-actions">
        <v-btn class="view-btn" variant="outlined" @click="goCalendar">VIEW ALL</v-btn>
      </div>
    </div>
    <div v-for="e in events" :key="e.day" class="event">
      <div class="date"><b>{{ e.day }}</b><small>{{ e.month }}</small></div>
      <div class="title"><strong>{{ e.title }}</strong></div>
      <div class="meta">
        <div>⚑ {{ e.type }}</div>
        <div>◷ {{ e.time }}</div>
      </div>
    </div>
  </v-card>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter()
const goCalendar = () => router.push("/main/calendar-agenda")
const events = [
  { day: '16', month: 'SEP 2026', title: 'Hari Malaysia', type: 'Public Holiday', time: 'All Day' },
  { day: '29', month: 'SEP 2026', title: 'Hari Keputeraan Sultan Kelantan', type: 'Public Holiday', time: 'All Day' },
  { day: '30', month: 'SEP 2026', title: 'Hari Keputeraan Sultan Kelantan', type: 'Public Holiday', time: 'All Day' },
  { day: '10', month: 'OCT 2026', title: 'Hari Jadi Yang di-Pertua Negeri Sarawak', type: 'Public Holiday', time: 'All Day' },
  { day: '06', month: 'NOV 2026', title: 'Hari Keputeraan Sultan Perak', type: 'Public Holiday', time: 'All Day' }]
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

.event {
  display: flex;
  align-items: center;
  border: 1px solid rgba(var(--v-theme-on-surface), .12);
  border-radius: 18px;
  padding: 8px 14px;
  margin-bottom: 10px;
  gap: 14px;
  min-height: 68px
}

.date {
  width: 95px;
  height: 58px;
  background: rgb(var(--v-theme-surface-variant));
  border-radius: 18px;
  text-align: center;
  padding: 8px;
  color: rgb(var(--v-theme-primary));
  flex-shrink: 0
}

.date b {
  display: block;
  font-size: 20px;
  font-weight: 700
}

.date small {
  font-size: 12px
}

.title {
  flex: 1;
  font-size: 17px;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  align-items: center;
  gap: 12px
}

.title:before {
  content: '';
  width: 12px;
  height: 12px;
  background: #4285f4;
  border-radius: 5px;
  display: inline-block
}

.meta {
  color: rgb(var(--v-theme-on-background));
  line-height: 30px;
  min-width: 160px;
  font-size: 15px
}

/* DARK MODE OVERRIDE */
:deep(.v-theme--dark) .calendar-card {background:rgb(var(--v-theme-surface)) !important;color:rgb(var(--v-theme-surface)) !important;}
:deep(.v-theme--dark) .event {border-color:rgba(255,255,255,.15)!important;}
:deep(.v-theme--dark) .date {background:rgb(var(--v-theme-surface-variant)) !important;}
:deep(.v-theme--dark) .title {color:rgb(var(--v-theme-surface)) !important;}
:deep(.v-theme--dark) .meta {color:rgba(var(--v-theme-on-surface), .45) !important;}



/* Vuetify theme only - no hardcoded light colors */
:deep(.v-theme--dark) .dash-card,
:deep(.v-theme--dark) .announcement-shell,
:deep(.v-theme--dark) .announcement-card,
:deep(.v-theme--dark) .recent-card,
:deep(.v-theme--dark) .calendar-card,
:deep(.v-theme--dark) .phone-card,
:deep(.v-theme--dark) .quick {
  background: rgb(var(--v-theme-surface)) !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}

:deep(.v-theme--dark) .announcement-body,
:deep(.v-theme--dark) .announcement-details,
:deep(.v-theme--dark) .detail-box {
  background: rgb(var(--v-theme-surface-variant)) !important;
  color: rgb(var(--v-theme-on-surface)) !important;
}

:deep(.v-theme--dark) .quick-title,
:deep(.v-theme--dark) h1,
:deep(.v-theme--dark) h2,
:deep(.v-theme--dark) h3,
:deep(.v-theme--dark) p,
:deep(.v-theme--dark) span {
  color: rgb(var(--v-theme-on-surface));
}
</style>