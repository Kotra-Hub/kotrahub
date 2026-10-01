<template>
  <v-container fluid class="profile-page pa-6">

    <!-- ============================================================
         PROFILE HEADER
         ============================================================ -->

    <v-card
      variant="flat"
      rounded="xl"
      class="profile-header mb-6"
    >
      <div class="profile-header-content">

        <div class="d-flex align-center ga-5 flex-wrap">

          <!-- Avatar -->
          <v-avatar
            size="82"
            color="primary"
            class="profile-avatar"
          >
            <span class="text-h5 font-weight-bold text-white">
              {{ userInitials }}
            </span>
          </v-avatar>


          <!-- User Information -->
          <div class="profile-user-info">

            <div class="d-flex align-center ga-3 flex-wrap">

              <h1 class="text-h5 font-weight-bold">
                {{ form.name || 'Unnamed User' }}
              </h1>

              <v-chip
                size="small"
                color="success"
                variant="tonal"
                prepend-icon="mdi-circle"
                class="status-chip"
              >
                Active
              </v-chip>

            </div>


            <div class="text-body-2 text-medium-emphasis mt-1">
              {{ form.role || 'No role set' }}
            </div>


            <div
              v-if="form.department"
              class="d-flex align-center ga-1 mt-2 text-caption text-medium-emphasis"
            >
              <v-icon size="15">
                mdi-office-building-outline
              </v-icon>

              <span>
                {{ form.department }}
              </span>
            </div>

          </div>

        </div>


        <!-- Header Actions -->
        <div class="profile-actions">

          <template v-if="!editMode">

            <v-btn
              variant="tonal"
              color="primary"
              prepend-icon="mdi-pencil-outline"
              class="text-none"
              @click="enterEditMode"
            >
              Edit Profile
            </v-btn>

          </template>


          <template v-else>

            <div class="d-flex ga-2">

              <v-btn
                variant="text"
                class="text-none"
                @click="cancelEdit"
              >
                Cancel
              </v-btn>

              <v-btn
                variant="flat"
                color="primary"
                prepend-icon="mdi-content-save-outline"
                class="text-none"
                :loading="saving"
                @click="saveProfile"
              >
                Save Changes
              </v-btn>

            </div>

          </template>

        </div>

      </div>
    </v-card>


    <!-- ============================================================
         SUMMARY CARDS
         ============================================================ -->

    <v-row class="mb-2">

      <!-- Account -->
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          variant="flat"
          rounded="lg"
          class="summary-card h-100"
        >
          <div class="summary-content">

            <div class="summary-icon primary-icon">
              <v-icon>
                mdi-shield-check-outline
              </v-icon>
            </div>

            <div>
              <div class="text-caption text-medium-emphasis">
                Account Status
              </div>

              <div class="text-subtitle-1 font-weight-bold mt-1">
                Active
              </div>

              <div class="text-caption text-success mt-1">
                Account is in good standing
              </div>
            </div>

          </div>
        </v-card>
      </v-col>


      <!-- Sessions -->
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          variant="flat"
          rounded="lg"
          class="summary-card h-100"
        >
          <div class="summary-content">

            <div class="summary-icon blue-icon">
              <v-icon>
                mdi-devices
              </v-icon>
            </div>

            <div>
              <div class="text-caption text-medium-emphasis">
                Active Sessions
              </div>

              <div class="text-subtitle-1 font-weight-bold mt-1">
                2 Devices
              </div>

              <div class="text-caption text-medium-emphasis mt-1">
                Currently signed in
              </div>
            </div>

          </div>
        </v-card>
      </v-col>


      <!-- Member Since -->
      <v-col
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          variant="flat"
          rounded="lg"
          class="summary-card h-100"
        >
          <div class="summary-content">

            <div class="summary-icon purple-icon">
              <v-icon>
                mdi-calendar-account-outline
              </v-icon>
            </div>

            <div>
              <div class="text-caption text-medium-emphasis">
                Member Since
              </div>

              <div class="text-subtitle-1 font-weight-bold mt-1">
                January 2023
              </div>

              <div class="text-caption text-medium-emphasis mt-1">
                Account created
              </div>
            </div>

          </div>
        </v-card>
      </v-col>

    </v-row>


    <!-- ============================================================
         TABS
         ============================================================ -->

    <v-card
      variant="flat"
      rounded="lg"
      class="profile-content"
    >

      <v-tabs
        v-model="activeTab"
        color="primary"
        class="profile-tabs"
      >

        <v-tab
          v-for="tab in tabs"
          :key="tab.value"
          :value="tab.value"
          class="text-none"
        >
          <v-icon
            :icon="tab.icon"
            size="18"
            class="mr-2"
          />

          {{ tab.label }}
        </v-tab>

      </v-tabs>


      <v-divider />


      <!-- ==========================================================
           TAB WINDOW
           ========================================================== -->

      <v-window v-model="activeTab">


        <!-- ========================================================
             OVERVIEW
             ======================================================== -->

        <v-window-item value="overview">

          <div class="pa-6">

            <v-row>

              <!-- Personal Information -->
              <v-col
                cols="12"
                lg="7"
              >

                <div class="section-heading mb-4">

                  <div>
                    <div class="text-subtitle-1 font-weight-bold">
                      Personal Information
                    </div>

                    <div class="text-caption text-medium-emphasis">
                      Your basic account information
                    </div>
                  </div>

                </div>


                <v-card
                  variant="outlined"
                  rounded="lg"
                  class="information-card"
                >

                  <div
                    v-for="(field, index) in personalFields"
                    :key="field.key"
                  >

                    <div class="information-row">

                      <div class="information-label">

                        <v-icon
                          :icon="field.icon"
                          size="19"
                          class="information-icon"
                        />

                        <span>
                          {{ field.label }}
                        </span>

                      </div>


                      <div class="information-value">

                        <v-text-field
                          v-if="editMode"
                          v-model="form[field.key]"
                          density="compact"
                          variant="outlined"
                          color="primary"
                          hide-details
                        />

                        <span
                          v-else
                          class="text-body-2 font-weight-medium"
                        >
                          {{ form[field.key] || '—' }}
                        </span>

                      </div>

                    </div>


                    <v-divider
                      v-if="index < personalFields.length - 1"
                    />

                  </div>

                </v-card>

              </v-col>


              <!-- Account Details -->
              <v-col
                cols="12"
                lg="5"
              >

                <div class="section-heading mb-4">

                  <div>
                    <div class="text-subtitle-1 font-weight-bold">
                      Account Details
                    </div>

                    <div class="text-caption text-medium-emphasis">
                      Current account information
                    </div>
                  </div>

                </div>


                <v-card
                  variant="outlined"
                  rounded="lg"
                  class="account-card"
                >

                  <div class="account-item">

                    <div class="account-item-icon">
                      <v-icon>
                        mdi-login
                      </v-icon>
                    </div>

                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Last Login
                      </div>

                      <div class="text-body-2 font-weight-medium mt-1">
                        Today, 9:12 AM
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <div class="account-item">

                    <div class="account-item-icon">
                      <v-icon>
                        mdi-clock-outline
                      </v-icon>
                    </div>

                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Last Activity
                      </div>

                      <div class="text-body-2 font-weight-medium mt-1">
                        Today, 10:24 AM
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <div class="account-item">

                    <div class="account-item-icon">
                      <v-icon>
                        mdi-account-check-outline
                      </v-icon>
                    </div>

                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Account Type
                      </div>

                      <div class="text-body-2 font-weight-medium mt-1">
                        Standard User
                      </div>

                    </div>

                  </div>


                  <v-divider />


                  <div class="account-item">

                    <div class="account-item-icon">
                      <v-icon>
                        mdi-monitor-account
                      </v-icon>
                    </div>

                    <div>

                      <div class="text-caption text-medium-emphasis">
                        Sessions
                      </div>

                      <div class="text-body-2 font-weight-medium mt-1">
                        2 active devices
                      </div>

                    </div>

                  </div>

                </v-card>

              </v-col>

            </v-row>

          </div>

        </v-window-item>


        <!-- ========================================================
             SECURITY
             ======================================================== -->

        <v-window-item value="security">

          <div class="pa-6">

            <div class="section-heading mb-5">

              <div>
                <div class="text-subtitle-1 font-weight-bold">
                  Security
                </div>

                <div class="text-caption text-medium-emphasis">
                  Manage your account security and authentication
                </div>
              </div>

            </div>


            <v-row>

              <v-col
                cols="12"
                lg="8"
              >

                <v-card
                  variant="outlined"
                  rounded="lg"
                >

                  <div
                    v-for="(setting, index) in securitySettings"
                    :key="setting.key"
                  >

                    <div class="security-row">

                      <div class="security-icon">

                        <v-icon>
                          {{ setting.icon }}
                        </v-icon>

                      </div>


                      <div class="security-content">

                        <div class="text-body-1 font-weight-medium">
                          {{ setting.label }}
                        </div>

                        <div class="text-caption text-medium-emphasis mt-1">
                          {{ setting.description }}
                        </div>

                      </div>


                      <div class="security-action">

                        <v-btn
                          v-if="setting.type === 'button'"
                          variant="tonal"
                          color="primary"
                          size="small"
                          class="text-none"
                          @click="setting.action?.()"
                        >
                          {{ setting.buttonText }}
                        </v-btn>


                        <v-switch
                          v-else
                          v-model="security.twoFactor"
                          hide-details
                          color="primary"
                          inset
                        />

                      </div>

                    </div>


                    <v-divider
                      v-if="index < securitySettings.length - 1"
                    />

                  </div>

                </v-card>

              </v-col>


              <v-col
                cols="12"
                lg="4"
              >

                <v-card
                  variant="tonal"
                  color="primary"
                  rounded="lg"
                  class="security-tip"
                >

                  <v-icon
                    size="30"
                    color="primary"
                  >
                    mdi-shield-lock-outline
                  </v-icon>

                  <div class="text-subtitle-2 font-weight-bold mt-4">
                    Security Tip
                  </div>

                  <div class="text-caption mt-2">
                    Use a strong password and enable two-factor
                    authentication to add an extra layer of protection.
                  </div>

                </v-card>

              </v-col>

            </v-row>

          </div>

        </v-window-item>


        <!-- ========================================================
             ACTIVITY
             ======================================================== -->

        <v-window-item value="activity">

          <div class="pa-6">

            <div class="d-flex align-center justify-space-between mb-5">

              <div>

                <div class="text-subtitle-1 font-weight-bold">
                  Recent Activity
                </div>

                <div class="text-caption text-medium-emphasis">
                  Recent actions performed on your account
                </div>

              </div>


              <v-chip
                color="primary"
                variant="tonal"
                size="small"
              >
                {{ activityLog.length }} Events
              </v-chip>

            </div>


            <v-card
              v-if="activityLog.length"
              variant="outlined"
              rounded="lg"
              class="pa-5"
            >

              <v-timeline
                side="end"
                density="compact"
                truncate-line="both"
                align="start"
              >

                <v-timeline-item
                  v-for="(log, index) in activityLog"
                  :key="index"
                  dot-color="primary"
                  :icon="log.icon || 'mdi-check-circle'"
                  size="small"
                >

                  <div class="activity-item">

                    <div>

                      <div class="text-body-2 font-weight-medium">
                        {{ log.action }}
                      </div>

                      <div class="text-caption text-medium-emphasis mt-1">
                        {{ log.time }}
                      </div>

                    </div>


                    <v-chip
                      v-if="log.status"
                      size="small"
                      :color="log.statusColor || 'success'"
                      variant="tonal"
                    >
                      {{ log.status }}
                    </v-chip>

                  </div>

                </v-timeline-item>

              </v-timeline>

            </v-card>


            <v-empty-state
              v-else
              icon="mdi-history"
              title="No activity yet"
              text="Actions on this account will show up here."
            />

          </div>

        </v-window-item>

      </v-window>

    </v-card>

  </v-container>
</template>


<script setup lang="ts">

import {
  ref,
  reactive,
  computed,
  watch
} from 'vue'

import { useAuth } from '@/composables/useAuth'


// ============================================================
// INTERFACE
// ============================================================

interface ProfileUser {
  name: string
  email: string
  role: string
  phone: string
  department: string
}


// ============================================================
// AUTH
// ============================================================

const { user: authUser } = useAuth()


// ============================================================
// TABS
// ============================================================

const tabs = [
  {
    value: 'overview',
    label: 'Overview',
    icon: 'mdi-view-dashboard-outline'
  },

  {
    value: 'security',
    label: 'Security',
    icon: 'mdi-shield-account-outline'
  },

  {
    value: 'activity',
    label: 'Activity',
    icon: 'mdi-history'
  }
]


const activeTab = ref('overview')


// ============================================================
// EDIT MODE
// ============================================================

const editMode = ref(false)

const saving = ref(false)


// ============================================================
// FORM
// ============================================================

const form = reactive<ProfileUser>({
  name: authUser.value?.name || '',
  email: authUser.value?.email || '',
  role: authUser.value?.role || '',
  phone: '',
  department: ''
})


const snapshot = reactive<ProfileUser>({
  ...form
})


// ============================================================
// PERSONAL FIELDS
// ============================================================

const personalFields = [
  {
    key: 'name',
    label: 'Full Name',
    icon: 'mdi-account-outline'
  },

  {
    key: 'email',
    label: 'Email Address',
    icon: 'mdi-email-outline'
  },

  {
    key: 'phone',
    label: 'Phone Number',
    icon: 'mdi-phone-outline'
  },

  {
    key: 'role',
    label: 'Role',
    icon: 'mdi-badge-account-outline'
  },

  {
    key: 'department',
    label: 'Department',
    icon: 'mdi-office-building-outline'
  }
] as const


// ============================================================
// SECURITY
// ============================================================

const security = reactive({
  twoFactor: false
})


const securitySettings = [
  {
    key: 'password',

    label: 'Password',

    description:
      'Change your password regularly for better security.',

    icon: 'mdi-lock-outline',

    type: 'button' as const,

    buttonText: 'Change Password',

    action: () => {
      console.log('Change password clicked')
    }
  },

  {
    key: 'twoFactor',

    label: 'Two-Factor Authentication',

    description:
      'Add an extra layer of security to your account.',

    icon: 'mdi-shield-key-outline',

    type: 'switch' as const
  }
]


// ============================================================
// USER INITIALS
// ============================================================

const userInitials = computed(() => {

  return (
    form.name
      .split(' ')
      .filter(Boolean)
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '—'
  )

})


// ============================================================
// ACTIVITY
// ============================================================

const activityLog = [
  {
    action: 'Logged in from new device',
    time: 'Today, 9:12 AM',
    icon: 'mdi-cellphone',
    status: 'New',
    statusColor: 'primary'
  },

  {
    action: 'Updated profile information',
    time: 'Yesterday, 4:30 PM',
    icon: 'mdi-account-edit',
    status: 'Updated',
    statusColor: 'success'
  },

  {
    action: 'Password changed successfully',
    time: 'Mar 12, 2026, 2:15 PM',
    icon: 'mdi-lock-check',
    status: 'Secure',
    statusColor: 'success'
  },

  {
    action: 'New team member added to project',
    time: 'Mar 10, 2026, 11:00 AM',
    icon: 'mdi-account-plus',
    status: 'Added',
    statusColor: 'info'
  }
]


// ============================================================
// ENTER EDIT MODE
// ============================================================

const enterEditMode = () => {

  Object.assign(
    snapshot,
    form
  )

  editMode.value = true
}


// ============================================================
// CANCEL EDIT
// ============================================================

const cancelEdit = () => {

  Object.assign(
    form,
    snapshot
  )

  editMode.value = false
}


// ============================================================
// SAVE PROFILE
// ============================================================

const saveProfile = async () => {

  saving.value = true

  try {

    await new Promise(resolve =>
      setTimeout(resolve, 600)
    )


    if (authUser.value) {

      Object.assign(
        authUser.value,
        {
          name: form.name,
          email: form.email,
          role: form.role
        }
      )


      localStorage.setItem(
        'user',
        JSON.stringify(authUser.value)
      )

    }


    editMode.value = false

  } finally {

    saving.value = false

  }

}


// ============================================================
// WATCH AUTH USER
// ============================================================

watch(
  authUser,

  newUser => {

    if (newUser) {

      form.name =
        newUser.name || ''

      form.email =
        newUser.email || ''

      form.role =
        newUser.role || ''

    }

  },

  {
    immediate: true
  }
)

</script>


<style scoped>

/* ============================================================
   PAGE
   ============================================================ */

.profile-page {
  width: 100%;

  min-height: 100%;

  background: rgb(var(--v-theme-background));
}


/* ============================================================
   PROFILE HEADER
   ============================================================ */

.profile-header {
  border: 1px solid
    rgba(var(--v-theme-on-surface), 0.08);
}


.profile-header-content {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 24px;

  padding: 28px 32px;
}


.profile-avatar {
  box-shadow:
    0 6px 18px
    rgba(var(--v-theme-primary), 0.20);
}


.profile-user-info {
  min-width: 220px;
}


.profile-actions {
  margin-left: auto;
}


/* ============================================================
   STATUS CHIP
   ============================================================ */

.status-chip {
  font-size: 11px;
}


/* ============================================================
   SUMMARY CARDS
   ============================================================ */

.summary-card {
  border: 1px solid
    rgba(var(--v-theme-on-surface), 0.08);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.summary-card:hover {
  transform: translateY(-2px);

  box-shadow:
    0 6px 20px
    rgba(0, 0, 0, 0.08);
}


.summary-content {
  display: flex;

  align-items: center;

  gap: 16px;

  padding: 20px;
}


.summary-icon {
  width: 44px;

  height: 44px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  flex-shrink: 0;
}


.primary-icon {
  background:
    rgba(var(--v-theme-primary), 0.12);

  color:
    rgb(var(--v-theme-primary));
}


.blue-icon {
  background:
    rgba(33, 150, 243, 0.12);

  color: #2196f3;
}


.purple-icon {
  background:
    rgba(156, 39, 176, 0.12);

  color: #9c27b0;
}


/* ============================================================
   PROFILE CONTENT
   ============================================================ */

.profile-content {
  border: 1px solid
    rgba(var(--v-theme-on-surface), 0.08);
}


.profile-tabs {
  padding-inline: 8px;
}


/* ============================================================
   SECTION HEADING
   ============================================================ */

.section-heading {
  display: flex;

  align-items: center;

  justify-content: space-between;
}


/* ============================================================
   INFORMATION CARD
   ============================================================ */

.information-card {
  overflow: hidden;
}


.information-row {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 24px;

  min-height: 70px;

  padding: 10px 20px;
}


.information-label {
  display: flex;

  align-items: center;

  gap: 12px;

  min-width: 160px;

  color:
    rgba(var(--v-theme-on-surface), 0.65);

  font-size: 13px;
}


.information-icon {
  color:
    rgb(var(--v-theme-primary));
}


.information-value {
  flex: 1;

  text-align: right;
}


/* ============================================================
   ACCOUNT CARD
   ============================================================ */

.account-card {
  overflow: hidden;
}


.account-item {
  display: flex;

  align-items: center;

  gap: 14px;

  padding: 18px 20px;
}


.account-item-icon {
  width: 38px;

  height: 38px;

  border-radius: 9px;

  display: flex;

  align-items: center;

  justify-content: center;

  color:
    rgb(var(--v-theme-primary));

  background:
    rgba(var(--v-theme-primary), 0.10);

  flex-shrink: 0;
}


/* ============================================================
   SECURITY
   ============================================================ */

.security-row {
  display: flex;

  align-items: center;

  gap: 16px;

  padding: 20px;
}


.security-icon {
  width: 42px;

  height: 42px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  background:
    rgba(var(--v-theme-primary), 0.10);

  color:
    rgb(var(--v-theme-primary));

  flex-shrink: 0;
}


.security-content {
  flex: 1;

  min-width: 0;
}


.security-action {
  flex-shrink: 0;
}


.security-tip {
  height: 100%;

  padding: 22px;
}


/* ============================================================
   ACTIVITY
   ============================================================ */

.activity-item {
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

  width: 100%;
}


/* ============================================================
   RESPONSIVE
   ============================================================ */

@media (max-width: 700px) {

  .profile-header-content {
    align-items: flex-start;

    flex-direction: column;

    padding: 22px;
  }


  .profile-actions {
    margin-left: 0;

    width: 100%;
  }


  .profile-actions .v-btn {
    width: 100%;
  }


  .information-row {
    align-items: flex-start;

    flex-direction: column;

    gap: 8px;

    padding: 16px;
  }


  .information-label {
    min-width: 0;
  }


  .information-value {
    width: 100%;

    text-align: left;
  }


  .security-row {
    align-items: flex-start;
  }


  .activity-item {
    align-items: flex-start;

    flex-direction: column;
  }

}

</style>