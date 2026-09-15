<template>
  <v-card class="dash-card">
    <div class="head">
      <div class="head-title">
        <span class="head-icon">
          <v-icon size="22">mdi-phone</v-icon>
        </span>
        <h3>PHONE DIRECTORY</h3>
      </div>

      <div class="actions">
        <v-btn class="action-btn icon-btn" variant="outlined" icon="mdi-magnify" />
        <v-btn class="action-btn" variant="outlined" prepend-icon="mdi-filter">
          Filters
        </v-btn>
        <v-btn
          class="action-btn"
          variant="outlined"
          :prepend-icon="isList ? 'mdi-view-grid-outline' : 'mdi-format-list-bulleted'"
          @click="isList = !isList"
        >
          {{ isList ? 'Grid' : 'List' }}
        </v-btn>
      </div>
    </div>

    <v-row v-if="!isList" dense class="directory-grid">
      <v-col cols="12" sm="6" lg="4" v-for="p in people" :key="`grid-${p.name}`">
        <v-card class="person-card" elevation="0">
          <div class="person-top">
            <div class="avatar">{{ p.initial }}</div>
            <div class="contact">
              <div class="contact-line">
                <v-icon size="16">mdi-phone</v-icon>
                <span>Ext. {{ p.ext }}</span>
              </div>
              <div class="contact-line email-line" :title="p.email">
                <v-icon size="16">mdi-email-outline</v-icon>
                <span class="email-text">{{ p.email }}</span>
              </div>
            </div>
          </div>
          <div class="person-name">{{ p.name }}</div>
          <div class="person-meta">{{ p.position }}</div>
          <div class="person-meta">{{ p.dept }}</div>
        </v-card>
      </v-col>
    </v-row>

    <div v-else class="directory-list-scroll">
      <div class="directory-list">
      <div
        v-for="p in people"
        :key="`list-${p.name}`"
        class="person-row"
      >
        <div class="avatar list-avatar">{{ p.initial }}</div>

        <div class="list-name">
          <strong>{{ p.name }}</strong>
        </div>

        <div class="list-position" :title="p.position">
          {{ p.position }}
        </div>

        <div class="list-dept" :title="p.dept">
          {{ p.dept }}
        </div>

        <div class="list-contact">
          <div class="contact-line">
            <v-icon size="16">mdi-phone</v-icon>
            <span>Ext. {{ p.ext }}</span>
          </div>
          <div class="contact-line email-line" :title="p.email">
            <v-icon size="16">mdi-email-outline</v-icon>
            <span class="email-text">{{ p.email }}</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const isList = ref(false)

const people = [
  ['AH', 'Amirul Hakim', 'Product Manager', 'Commercial', '1702', 'amirul.hakim@kotra.com'],
  ['SN', 'Siti Nur Aina', 'Regulatory Executive', 'Regulatory Affairs', '2345', 'siti.aina@kotra.com'],
  ['MK', 'Muhammad Khairul', 'Medical Representative', 'Sales', '2901', 'khairul.m@kotra.com'],
  ['YW', 'Yvonne Wong', 'HR Executive', 'Human Resource', '4567', 'yvonne.wong@kotra.com'],
  ['FA', 'Faris Azman', 'Finance Analyst', 'Finance', '5678', 'faris.azman@kotra.com'],
  ['NL', 'Nurul Liyana', 'QC Chemist', 'Quality Control', '6789', 'nurul.liyana@kotra.com'],
  ['AR', 'Aisyah Rahman', 'Admin Executive', 'Administration', '7890', 'aisyah.rahman@kotra.com'],
  ['DL', 'Daniel Lee', 'IT Specialist', 'Information Technology', '8901', 'daniel.lee@kotra.com'],
  ['NI', 'Nur Izzati', 'Marketing Executive', 'Marketing', '9012', 'nur.izzati@kotra.com'],
].map(x => ({
  initial: x[0],
  name: x[1],
  position: x[2],
  dept: x[3],
  ext: x[4],
  email: x[5],
}))
</script>

<style scoped>
.dash-card {
  padding: 18px;
  border-radius: 24px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  background: rgb(var(--v-theme-surface));
  height: 100%;
  overflow: hidden;
}

.head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  min-width: 0;
}

.head-title {
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.head-title h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  white-space: nowrap;
}

.head-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-surface-variant));
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-btn {
  min-height: 44px;
  border-color: #75c8c3 !important;
  color: rgb(var(--v-theme-primary)) !important;
  border-radius: 13px !important;
  font-weight: 700;
  letter-spacing: 0;
  text-transform: none;
}

.icon-btn {
  width: 48px;
  min-width: 48px !important;
}

/* GRID VIEW */
.directory-grid {
  margin: 0 -6px;
}

.person-card {
  height: 150px;
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(var(--v-theme-on-surface), .12);
  box-shadow: none !important;
}

.person-top {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.avatar {
  width: 54px;
  height: 54px;
  flex: 0 0 54px;
  border-radius: 50%;
  background: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-primary));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
}

.contact {
  min-width: 0;
  flex: 1;
  color: rgb(var(--v-theme-primary));
  font-size: 12px;
}

.contact-line {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  line-height: 19px;
}

.email-line {
  min-width: 0;
}

.email-text {
  display: block;
  min-width: 0;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.person-name {
  margin-top: 10px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
  color: rgb(var(--v-theme-on-surface));
}

.person-meta {
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 13px;
  line-height: 17px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* LIST VIEW */
.directory-list-scroll {
  max-height: 430px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 4px;
}

.directory-list-scroll::-webkit-scrollbar {
  width: 6px;
}

.directory-list-scroll::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(var(--v-theme-on-surface), .65);
}

.directory-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.person-row {
  width: 100%;
  min-height: 82px;
  display: grid;
  grid-template-columns: 62px minmax(150px, 1.1fr) minmax(130px, .9fr) minmax(120px, .85fr) minmax(190px, 1fr);
  align-items: center;
  column-gap: 12px;
  padding: 10px 14px;
  border: 1px solid rgba(var(--v-theme-on-surface), .12);
  border-radius: 18px;
  background: rgb(var(--v-theme-surface));
  min-width: 0;
}

.list-avatar {
  width: 54px;
  height: 54px;
}

.list-name,
.list-position,
.list-dept,
.list-contact {
  min-width: 0;
}

.list-name strong {
  display:block;
  color:rgb(var(--v-theme-on-surface));
  font-size:15px;
  font-weight:800;
  white-space:nowrap;
  overflow:visible;
  text-overflow:clip;
}

.list-position,
.list-dept {
  display:block;
  color:rgb(var(--v-theme-on-background));
  font-size:13px;
  font-weight:700;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}

.list-contact {
  color:rgb(var(--v-theme-primary));
  font-size:12px;
  min-width:0;
}

.list-contact .contact-line {
  max-width:100%;
}

.list-contact .email-text {
  max-width:160px;
}

.list-contact {
  justify-self: stretch;
  overflow: hidden;
}

@media (max-width: 1100px) {
  .person-row {
    grid-template-columns:
      56px
      minmax(120px, 1fr)
      minmax(120px, 1fr)
      minmax(170px, 1.2fr);
  }

  .list-dept {
    display: none;
  }
}

@media (max-width: 760px) {
  .head {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
  }

  .person-row {
    grid-template-columns:
      56px
      minmax(130px, 1fr)
      minmax(170px, 1.2fr);
  }

  .list-position,
  .list-dept {
    display: none;
  }
}

/* DARK MODE OVERRIDE */
:deep(.v-theme--dark) .phone-card,

:deep(.v-theme--dark) .list-position,
:deep(.v-theme--dark) .list-dept {color:rgba(var(--v-theme-on-surface), .45) !important;}



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
