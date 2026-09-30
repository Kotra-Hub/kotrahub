<template>
  <v-card class="pending-card">
    <div class="card-header">
      <div class="title-wrap">
        <span class="header-icon"><v-icon size="22">mdi-format-list-checks</v-icon></span>
        <h3>PENDING ACTION</h3>
      </div>
      <div class="header-actions">
        <v-btn class="view-btn" variant="outlined" @click="$router.push('/main/pending-actions')">VIEW ALL</v-btn>
      </div>
    </div>

    <div class="summary">
      <span><b>5</b> awaiting action</span>
      <span class="urgent">⚠ 2 urgent</span>
    </div>

    <div class="progress">
      <span class="urgent-bar"></span>
      <span class="normal-bar"></span>
      <span class="low-bar"></span>
    </div>

    <div class="legend">
      <span class="red">● Urgent&nbsp; <b>2</b></span>
      <span class="orange">● Normal&nbsp; <b>2</b></span>
      <span class="grey">● Low&nbsp; <b>1</b></span>
    </div>

    <div v-for="item in items" :key="item.title" class="row">
      <div class="item-icon"><v-icon>{{ item.icon }}</v-icon></div>
      <div class="info">
        <strong>{{ item.title }}</strong>
        <small>{{ item.ref }}</small>
        <v-chip size="x-small" :class="item.level">{{ item.level }}</v-chip>
      </div>
      <div class="status">
        <span>● {{ item.status }}</span>
        <small>{{ item.time }}</small>
      </div>
      <div class="arrow">›</div>
    </div>
  </v-card>
</template>

<script setup>
const items = [
  { icon: 'mdi-calendar-outline', title: 'Leave Application', ref: 'LA-2026-000123', level: 'URGENT', status: 'Pending Approval', time: '24 Jul 2026, 10:30 AM' },
  { icon: 'mdi-wrench-outline', title: 'Work Order', ref: 'WO-2026-000456', level: 'URGENT', status: 'Pending IT Approval', time: '24 Jul 2026, 09:15 AM' },
  { icon: 'mdi-account-group-outline', title: 'Training Attendance', ref: 'TR-2026-000789', level: 'NORMAL', status: 'Pending Verification', time: '23 Jul 2026, 04:45 PM' },
  { icon: 'mdi-file-document-outline', title: 'Purchase Requisition', ref: 'PR-2026-000321', level: 'NORMAL', status: 'Pending Approval', time: '23 Jul 2026, 03:45 PM' },
  { icon: 'mdi-account-plus-outline', title: 'HR Requisition', ref: 'HR-2026-000654', level: 'LOW', status: 'Pending Review', time: '22 Jul 2026, 02:30 PM' }
]
</script>

<style scoped>
.pending-card {
  height: 560px;
  padding: 18px 18px 8px;
  border-radius: 24px
}

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

.title {
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 12px
}

.icon,
.item-icon {
  background: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-primary));
  border-radius: 14px;
  display: grid;
  place-items: center
}

.icon {
  width: 44px;
  height: 44px;
  border-radius: 50%
}

.summary {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: rgb(var(--v-theme-on-surface-variant))
}

.summary b {
  color: rgb(var(--v-theme-on-background));
  font-size: 18px
}

.urgent {
  color: #ef4444;
  font-weight: 600
}

.progress {
  height: 8px;
  display: flex;
  overflow: hidden;
  border-radius: 10px
}

.progress span {
  display: block;
  height: 100%
}

.urgent-bar {
  width: 40%;
  background: #ef3f55
}

.normal-bar {
  width: 40%;
  background: #f59e0b
}

.low-bar {
  width: 20%;
  background: rgba(var(--v-theme-on-surface), .65)
}

.legend {
  display: flex;
  gap: 24px;
  margin: 10px 0;
  color: rgb(var(--v-theme-on-background))
}

.red {
  color: #ef3f55
}

.orange {
  color: #f59e0b
}

.grey {
  color: #94a3b8
}

.row {
  height: 68px;
  border-top: 1px solid rgba(var(--v-theme-on-surface), .12);
  display: flex;
  align-items: center;
  gap: 14px
}

.item-icon {
  width: 52px;
  height: 52px
}

.info {
  flex: 1;
  position: relative
}

.info strong {
  display: block;
  font-size: 17px;
  color: rgb(var(--v-theme-on-surface))
}

.info small {
  color: rgb(var(--v-theme-on-background));
  display: inline-block;
  margin-right: 10px
}

.v-chip {
  font-size: 10px
}

.URGENT {
  color: #ef3f55
}

.NORMAL {
  color: #f59e0b
}

.LOW {
  color: #94a3b8
}

.status {
  text-align: right;
  color: #ef3f55
}

.status small {
  display: block;
  color: rgb(var(--v-theme-on-background))
}

.arrow {
  font-size: 32px
}

@media (max-width:1200px) {
  .pending-card {
    height: auto;
    min-height: 100%;
    padding: 16px;
  }
}

@media (max-width:768px) {

  .summary,
  .legend {
    flex-wrap: wrap;
  }
}

/* DARK MODE OVERRIDE */

:deep(.v-theme--dark) .row {
  border-color: rgba(255, 255, 255, .12) !important;
}

:deep(.v-theme--dark) .info strong {
  color: rgb(var(--v-theme-on-surface)) !important;
}

:deep(.v-theme--dark) .info small,
:deep(.v-theme--dark) .status small {
  color: rgba(var(--v-theme-on-surface), .45) !important;
}



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
