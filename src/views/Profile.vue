<template>
  <v-container fluid class="profile-page pa-0">
    <!-- Profile Header -->
    <v-sheet color="surface" elevation="0" class="border-b py-8">
      <v-container class="d-flex align-center ga-5 flex-wrap">
        <v-avatar size="76" color="primary" class="text-h5 font-weight-medium">
          <span class="text-white">{{ userInitials }}</span>
        </v-avatar>

        <div>
          <h1 class="text-h5 font-weight-bold">{{ form.name || 'Unnamed User' }}</h1>
          <div class="d-flex align-center ga-2 mt-1 flex-wrap">
            <span class="text-body-2 text-medium-emphasis">{{ form.role || 'No role set' }}</span>
            <v-chip size="small" color="primary" variant="tonal" density="comfortable">
              {{ form.department || 'Active' }}
            </v-chip>
          </div>
        </div>

        <v-spacer />

        <v-btn v-if="!editMode" variant="tonal" color="primary" prepend-icon="mdi-pencil-outline"
          @click="enterEditMode">
          Edit profile
        </v-btn>
        <div v-else class="d-flex ga-2">
          <v-btn variant="text" @click="cancelEdit">Cancel</v-btn>
          <v-btn variant="flat" color="primary" :loading="saving" @click="saveProfile">
            Save changes
          </v-btn>
        </div>
      </v-container>
    </v-sheet>

    <!-- Tabs -->
    <v-tabs v-model="activeTab" color="primary" class="border-b" bg-color="surface">
      <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" class="text-none font-weight-medium">
        <v-icon :icon="tab.icon" size="18" class="mr-2" />
        {{ tab.label }}
      </v-tab>
    </v-tabs>

    <!-- Tab Content -->
    <v-window v-model="activeTab">
      <!-- Overview -->
      <v-window-item value="overview">
        <v-container fluid class="py-8 px-6">
          <v-row>
            <v-col cols="12" lg="8">
              <h2 class="text-subtitle-1 font-weight-bold mb-2">Personal information</h2>
              <v-card variant="flat" border rounded="lg">
                <v-list density="comfortable" lines="two" class="py-0">
                  <template v-for="(field, i) in personalFields" :key="field.key">
                    <v-list-item class="py-3">
                      <v-list-item-subtitle class="text-caption mb-1">{{ field.label }}</v-list-item-subtitle>

                      <v-text-field v-if="editMode" v-model="(form[field.key as keyof ProfileUser] as string)"
                        density="compact" variant="outlined" color="primary" hide-details />
                      <v-list-item-title v-else class="text-body-1 font-weight-medium">
                        {{ form[field.key as keyof ProfileUser] || '—' }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider v-if="i < personalFields.length - 1" />
                  </template>
                </v-list>
              </v-card>
            </v-col>

            <v-col cols="12" lg="4">
              <h2 class="text-subtitle-1 font-weight-bold mb-2">Quick info</h2>
              <v-card variant="flat" border rounded="lg">
                <v-list density="comfortable" class="py-0">
                  <template v-for="(info, i) in quickInfo" :key="info.label">
                    <v-list-item class="py-3">
                      <div class="d-flex justify-space-between align-center">
                        <span class="text-body-2 text-medium-emphasis">{{ info.label }}</span>
                        <span class="text-body-2 font-weight-medium">{{ info.value }}</span>
                      </div>
                    </v-list-item>
                    <v-divider v-if="i < quickInfo.length - 1" />
                  </template>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>

      <!-- Security -->
      <v-window-item value="security">
        <v-container fluid class="py-8 px-6">
          <h2 class="text-subtitle-1 font-weight-bold mb-2">Security settings</h2>
          <v-card variant="flat" border rounded="lg">
            <v-list density="comfortable" lines="two" class="py-0">
              <template v-for="(setting, i) in securitySettings" :key="setting.key">
                <v-list-item class="py-4">
                  <template #title>
                    <span class="text-body-1 font-weight-medium">{{ setting.label }}</span>
                  </template>
                  <template #subtitle>{{ setting.description }}</template>

                  <template #append>
                    <v-btn v-if="setting.type === 'button'" variant="tonal" color="primary" size="small"
                      class="text-none" @click="setting.action?.()">
                      {{ setting.buttonText }}
                    </v-btn>
                    <v-switch v-else v-model="security.twoFactor" hide-details color="primary" inset />
                  </template>
                </v-list-item>
                <v-divider v-if="i < securitySettings.length - 1" />
              </template>
            </v-list>
          </v-card>
        </v-container>
      </v-window-item>

      <!-- Activity -->
      <v-window-item value="activity">
        <v-container fluid class="py-8 px-6">
          <div class="d-flex align-center justify-space-between mb-4">
            <h2 class="text-subtitle-1 font-weight-bold">Recent activity</h2>
            <v-chip color="primary" variant="tonal" size="small">{{ activityLog.length }} events</v-chip>
          </div>

          <v-card v-if="activityLog.length" variant="flat" border rounded="lg" class="pa-4">
            <v-timeline side="end" density="compact" truncate-line="both" align="start">
              <v-timeline-item v-for="(log, index) in activityLog" :key="index" dot-color="primary"
                :icon="log.icon || 'mdi-check-circle'" size="small">
                <div class="d-flex align-center justify-space-between flex-wrap ga-2">
                  <div>
                    <div class="text-body-1 font-weight-medium">{{ log.action }}</div>
                    <div class="text-caption text-medium-emphasis mt-1">{{ log.time }}</div>
                  </div>
                  <v-chip v-if="log.status" size="small" :color="log.statusColor || 'success'" variant="tonal">
                    {{ log.status }}
                  </v-chip>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card>

          <v-empty-state v-else icon="mdi-history" title="No activity yet"
            text="Actions on this account will show up here." />
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'

interface ProfileUser {
  name: string
  email: string
  role: string
  phone: string
  department: string
}

const { user: authUser } = useAuth()

// Tabs
const tabs = [
  { value: 'overview', label: 'Overview', icon: 'mdi-view-dashboard-outline' },
  { value: 'security', label: 'Security', icon: 'mdi-shield-account-outline' },
  { value: 'activity', label: 'Activity', icon: 'mdi-history' },
]

// Form state
const activeTab = ref('overview')
const editMode = ref(false)
const saving = ref(false)

const form = reactive<ProfileUser>({
  name: authUser.value?.name || '',
  email: authUser.value?.email || '',
  role: authUser.value?.role || '',
  phone: '',
  department: '',
})

const snapshot = reactive<ProfileUser>({ ...form })

const personalFields = [
  { key: 'name', label: 'Full Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone Number' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' },
] as const

const quickInfo = [
  { label: 'Member Since', value: 'January 2023' },
  { label: 'Last Login', value: 'Today, 9:12 AM' },
  { label: 'Active Sessions', value: '2 devices' },
]

// Security settings — reactive so v-model on the switch works correctly
const security = reactive({ twoFactor: false })

const securitySettings = [
  {
    key: 'password',
    label: 'Password',
    description: 'Change your password regularly for better security',
    type: 'button' as const,
    buttonText: 'Change Password',
    action: () => console.log('Change password clicked'),
  },
  {
    key: 'twoFactor',
    label: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account',
    type: 'switch' as const,
  },
]

const userInitials = computed(() =>
  form.name.split(' ').filter(Boolean).map((w) => w[0]).join('').slice(0, 2).toUpperCase() || '—'
)

const activityLog = [
  {
    action: 'Logged in from new device',
    time: 'Today, 9:12 AM',
    icon: 'mdi-cellphone',
    status: 'New',
    statusColor: 'primary',
  },
  {
    action: 'Updated profile information',
    time: 'Yesterday, 4:30 PM',
    icon: 'mdi-account-edit',
    status: 'Updated',
    statusColor: 'success',
  },
  {
    action: 'Password changed successfully',
    time: 'Mar 12, 2026, 2:15 PM',
    icon: 'mdi-lock-check',
    status: 'Secure',
    statusColor: 'success',
  },
  {
    action: 'New team member added to project',
    time: 'Mar 10, 2026, 11:00 AM',
    icon: 'mdi-account-plus',
    status: 'Added',
    statusColor: 'info',
  },
]

// Methods
const enterEditMode = () => {
  Object.assign(snapshot, form)
  editMode.value = true
}

const cancelEdit = () => {
  Object.assign(form, snapshot)
  editMode.value = false
}

const saveProfile = async () => {
  saving.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 600))
    if (authUser.value) {
      Object.assign(authUser.value, {
        name: form.name,
        email: form.email,
        role: form.role,
      })
      localStorage.setItem('user', JSON.stringify(authUser.value))
    }
    editMode.value = false
  } finally {
    saving.value = false
  }
}

watch(
  authUser,
  (newUser) => {
    if (newUser) {
      form.name = newUser.name || ''
      form.email = newUser.email || ''
      form.role = newUser.role || ''
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.profile-page {
  width: 100%;
  min-height: 100%;
  background: rgb(var(--v-theme-background));
}
</style>
