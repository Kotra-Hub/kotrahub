<template>
    <v-card class="dash-card">
        <div class="card-header">
            <div class="title-wrap">
                <span class="header-icon"><v-icon size="22">mdi-flash</v-icon></span>
                <h3>QUICK ACCESS</h3>
            </div>
            <div class="header-actions">
                <v-btn class="view-btn" variant="outlined" @click="$router.push('/main/quick-access')">VIEW ALL</v-btn>
            </div>
        </div>
        <v-row class="mt-4">
            <v-col cols="4" v-for="item in items" :key="item.name"><v-card class="quick" elevation="0"><v-icon size="34"
                        color="teal">{{ item.icon }}</v-icon><span>{{ item.name }}</span></v-card></v-col>
        </v-row>
    </v-card>
</template>
<script setup>
const items = [
    { name: 'Staff Purchase', icon: 'mdi-account-tie' },
    { name: 'Training Record System (TRS)', icon: 'mdi-school' },
    { name: 'Purchase Order Management', icon: 'mdi-file-document' },
    { name: 'Material Management', icon: 'mdi-package-variant' },
    { name: 'Sales Automation Solutions (SAS)', icon: 'mdi-chart-box' },
    { name: 'AP Management', icon: 'mdi-account-group' },
    { name: 'Work Order', icon: 'mdi-tools' },
    { name: 'Technical Service Requisition (TSR)', icon: 'mdi-clipboard-text' },
    { name: 'Easy Loader', icon: 'mdi-upload' }]
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

.quick {
    height: 130px;
    border-radius: 18px;
    background: rgb(var(--v-theme-surface-variant));
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    text-align: center;
    font-size: 14px;
    font-weight: 700;
    color: rgb(var(--v-theme-on-surface));
    padding: 10px
}

@media (max-width:1200px) {
    .dash-card {
        height: auto;
        min-height: 100%;
    }

    .quick {
        height: 110px;
    }
}

@media (max-width:768px) {
    .quick {
        height: 100px;
        font-size: 12px;
    }
}

</style>