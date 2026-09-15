<template>
    <v-card class="dash-card">
        <div class="card-header">
            <div class="title-wrap">
                <span class="header-icon"><v-icon size="22">mdi-clock-outline</v-icon></span>
                <h3>RECENT ACTIVITY</h3>
            </div>
            <div class="header-actions">
                <v-btn class="view-btn" variant="outlined" @click="router.push('/main/recent-activities')">VIEW
                    ALL</v-btn>
            </div>
        </div>
        <div v-for="a in activities" :key="a.title" class="activity">
            <div class="activity-icon"><v-icon>{{ a.icon }}</v-icon></div>
            <div><strong>{{ a.title }}</strong><small>{{ a.time }}</small></div>
        </div>
    </v-card>
</template>
<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

const activities = [
    { icon: 'mdi-login', title: 'Logged in to the system', time: '27 Aug 2026 | 02:15 PM • 2 Minutes Ago' },
    { icon: 'mdi-lightning-bolt-outline', title: 'Updated Quick Access shortcuts', time: '27 Aug 2026 | 02:02 PM • 15 Minutes Ago' },
    { icon: 'mdi-check-circle-outline', title: 'Completed pending action', time: '27 Aug 2026 | 01:15 PM • 1 Hour Ago' },
    { icon: 'mdi-calendar-check-outline', title: 'Checked Calendar events', time: '27 Aug 2026 | 12:15 PM • 2 Hours Ago' },
    { icon: 'mdi-bullhorn-outline', title: 'Viewed Announcements', time: '27 Aug 2026 | 11:15 AM • 3 Hours Ago' },
    { icon: 'mdi-history', title: 'Viewed Recent Activities', time: '27 Aug 2026 | 11:10 AM • 3 Hours Ago' }]
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

.icon,
.activity-icon {
    background: rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-primary));
    display: grid;
    place-items: center
}

.icon {
    width: 44px;
    height: 44px;
    border-radius: 50%
}

.activity {
    display: flex;
    gap: 18px;
    align-items: center;
    padding: 18px 18px 8px 0;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), .12)
}

.activity-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(var(--v-theme-on-surface), .12)
}

.activity strong {
    display: block;
    font-size: 17px
}

.activity small {
    color: rgb(var(--v-theme-on-background))
}

@media (max-width:1200px) {
    .recent-card {
        height: auto;
        min-height: 100%;
        padding: 16px;
    }
}

@media (max-width:768px) {
    .activity {
        gap: 10px;
        padding: 12px 0;
    }

    .activity strong {
        font-size: 14px;
    }
}

/* DARK MODE OVERRIDE */

:deep(.v-theme--dark) .activity {
    border-color: rgba(255, 255, 255, .12) !important;
}

:deep(.v-theme--dark) .activity strong {
    color: rgb(var(--v-theme-on-surface)) !important;
}

:deep(.v-theme--dark) .activity small {
    color: rgba(var(--v-theme-on-surface), .45) !important;
}

:deep(.v-theme--dark) .activity-icon,
:deep(.v-theme--dark) .icon {
    background: rgb(var(--v-theme-surface-variant)) !important;
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
