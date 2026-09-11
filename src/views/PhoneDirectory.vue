<!-- src/views/PhoneDirectory.vue -->
<template>
  <div class="phone-directory-page">
    <!-- HEADER SECTION -->
    <div class="page-header d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
      <div class="d-flex align-center ga-3">
        <v-avatar size="48" rounded="lg" color="primary" variant="tonal">
          <v-icon size="24" color="primary">mdi-phone</v-icon>
        </v-avatar>
        <div>
          <h1 class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            Phone Directory
          </h1>
          <p class="text-body-2 text-medium-emphasis mt-0 mb-0">
            Find colleagues by name, department, or team.
          </p>
        </div>
      </div>
      <v-btn
        variant="outlined"
        rounded="lg"
        color="primary"
        prepend-icon="mdi-arrow-left"
        @click="$emit('navigate', 'dashboard')"
      >
        Back
      </v-btn>
    </div>

    <!-- FILTERS SECTION -->
    <v-card class="rounded-xl mb-4" elevation="0" border>
      <v-card-text class="pa-4">
        <v-row dense align="center">
          <v-col cols="12" md="4" lg="3">
            <v-select
              v-model="selectedDepartment"
              :items="departmentOptions"
              density="compact"
              variant="outlined"
              label="Department"
              hide-details
              rounded="lg"
              class="filter-select"
            />
          </v-col>
          <v-col cols="12" md="4" lg="3">
            <v-select
              v-model="selectedTeam"
              :items="teamOptions"
              density="compact"
              variant="outlined"
              label="Team"
              hide-details
              rounded="lg"
              class="filter-select"
            />
          </v-col>
          <v-col cols="12" md="4" lg="6">
            <v-text-field
              v-model="contactSearch"
              density="compact"
              variant="outlined"
              placeholder="Search by name, job title, email..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
              rounded="lg"
              class="search-field"
            />
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-2">
          <v-btn
            variant="text"
            color="primary"
            rounded="lg"
            size="small"
            @click="resetFilters"
          >
            <v-icon left size="16">mdi-restore</v-icon>
            Reset Filters
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- RESULTS HEADER -->
    <div class="d-flex align-center justify-space-between mb-3 flex-wrap gap-2">
      <div>
        <span class="text-subtitle-2 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
          {{ filteredContacts.length }} contacts found
        </span>
      </div>
      <div class="d-flex align-center ga-2">
        <v-btn
          variant="text"
          size="small"
          color="primary"
          class="view-toggle-btn"
          rounded="lg"
          @click="directoryView = 'grid'"
          :style="directoryView === 'grid' ? 'background: rgba(var(--v-theme-primary), 0.1);' : ''"
        >
          <v-icon size="18" class="mr-1">mdi-view-grid</v-icon>
          Grid
        </v-btn>
        <v-btn
          variant="text"
          size="small"
          color="primary"
          class="view-toggle-btn"
          rounded="lg"
          @click="directoryView = 'list'"
          :style="directoryView === 'list' ? 'background: rgba(var(--v-theme-primary), 0.1);' : ''"
        >
          <v-icon size="18" class="mr-1">mdi-format-list-bulleted</v-icon>
          List
        </v-btn>
      </div>
    </div>

    <!-- CONTACTS GRID VIEW -->
    <div v-if="directoryView === 'grid'">
      <v-row dense>
        <v-col
          v-for="contact in filteredContacts"
          :key="contact.email"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="rounded-lg contact-grid-card"
            elevation="0"
            border
            @click="openContactDialog(contact)"
            style="cursor: pointer;"
          >
            <v-card-text class="pa-4">
              <div class="d-flex flex-column align-center text-center">
                <!-- Avatar -->
                <v-avatar
                  size="64"
                  color="primary"
                  variant="tonal"
                  class="mb-2"
                >
                  <span class="font-weight-bold text-primary" style="font-size: 22px;">
                    {{ getInitials(contact.name) }}
                  </span>
                </v-avatar>

                <!-- Name -->
                <div class="text-body-1 font-weight-bold text-truncate w-100" style="color: rgb(var(--v-theme-on-surface));">
                  {{ contact.name }}
                </div>

                <!-- Job Title -->
                <div class="text-caption text-medium-emphasis text-truncate w-100">
                  {{ contact.jobTitle || '-' }}
                </div>

                <!-- Department & Team -->
                <div class="text-caption text-medium-emphasis text-truncate w-100">
                  {{ contact.department || '-' }}
                  <span v-if="contact.team">• {{ contact.team }}</span>
                </div>

                <v-divider class="my-2" />

                <!-- Contact Details -->
                <div class="w-100 text-left">
                  <div class="d-flex align-center ga-2 py-1">
                    <v-icon size="14" color="primary">mdi-phone</v-icon>
                    <span class="text-caption" style="color: rgb(var(--v-theme-on-surface));">
                      Ext. {{ contact.ext || '-' }}
                    </span>
                  </div>
                  <div class="d-flex align-center ga-2 py-1">
                    <v-icon size="14" color="primary">mdi-email-outline</v-icon>
                    <span class="text-caption text-truncate" style="color: rgb(var(--v-theme-on-surface));">
                      {{ contact.email || '-' }}
                    </span>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- CONTACTS LIST VIEW -->
    <div v-else>
      <v-card class="rounded-xl" elevation="0" border>
        <v-list density="compact" class="bg-transparent">
          <v-list-item
            v-for="(contact, index) in filteredContacts"
            :key="contact.email"
            class="contact-list-item"
            :class="{ 'contact-list-last': index === filteredContacts.length - 1 }"
            @click="openContactDialog(contact)"
            style="cursor: pointer;"
          >
            <!-- Avatar -->
            <template #prepend>
              <v-avatar size="48" color="primary" variant="tonal">
                <span class="font-weight-bold text-primary" style="font-size: 18px;">
                  {{ getInitials(contact.name) }}
                </span>
              </v-avatar>
            </template>

            <!-- Contact Info -->
            <v-list-item-title class="font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
              {{ contact.name }}
            </v-list-item-title>

            <v-list-item-subtitle>
              <span class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                {{ contact.jobTitle || '-' }}
              </span>
              <span class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                • {{ contact.department || '-' }}
              </span>
              <span v-if="contact.team" class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                • {{ contact.team }}
              </span>
            </v-list-item-subtitle>

            <!-- Contact Details -->
            <template #append>
              <div class="d-none d-md-flex flex-column align-end text-caption text-right" style="min-width: 200px; color: rgb(var(--v-theme-on-surface));">
                <span class="d-flex align-center ga-1">
                  <v-icon size="14" color="primary">mdi-phone</v-icon>
                  Ext. {{ contact.ext || '-' }}
                </span>
                <span class="text-truncate" style="max-width: 200px;">
                  <v-icon size="14" color="primary">mdi-email-outline</v-icon>
                  {{ contact.email || '-' }}
                </span>
              </div>
            </template>
          </v-list-item>
        </v-list>

        <!-- Empty State -->
        <div v-if="filteredContacts.length === 0" class="d-flex flex-column align-center justify-center py-8" style="color: rgb(var(--v-theme-textMuted));">
          <v-icon size="64" class="mb-3 opacity-50">mdi-account-off-outline</v-icon>
          <div class="text-h6 font-weight-bold">No contacts found</div>
          <div class="text-body-2">Try adjusting your search or filters</div>
        </div>
      </v-card>
    </div>

    <!-- CONTACT DETAIL DIALOG -->
    <v-dialog v-model="contactDialog" max-width="500" persistent>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center gap-2 pa-4">
          <v-icon color="primary" size="24" class="mr-2">mdi-account</v-icon>
          <span class="text-h6 font-weight-bold">Contact Details</span>
          <v-spacer />
          <v-btn icon variant="text" @click="contactDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <div v-if="selectedContact">
            <div class="d-flex flex-column align-center text-center mb-4">
              <v-avatar
                size="80"
                color="primary"
                variant="tonal"
                class="mb-3"
              >
                <span class="font-weight-bold text-primary" style="font-size: 30px;">
                  {{ getInitials(selectedContact.name) }}
                </span>
              </v-avatar>
              <div class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
                {{ selectedContact.name }}
              </div>
              <div class="text-body-2 text-medium-emphasis">
                {{ selectedContact.jobTitle || '-' }}
              </div>
            </div>

            <v-divider class="mb-4" />

            <div class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
              <div class="d-flex align-center ga-3 mb-3">
                <v-icon size="20" color="primary">mdi-domain</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  <strong>Department:</strong> {{ selectedContact.department || '-' }}
                </span>
              </div>
              <div class="d-flex align-center ga-3 mb-3">
                <v-icon size="20" color="primary">mdi-account-group</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  <strong>Team:</strong> {{ selectedContact.team || '-' }}
                </span>
              </div>
              <div class="d-flex align-center ga-3 mb-3">
                <v-icon size="20" color="primary">mdi-phone</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  <strong>Extension:</strong> {{ selectedContact.ext || '-' }}
                </span>
              </div>
              <div class="d-flex align-center ga-3">
                <v-icon size="20" color="primary">mdi-email-outline</v-icon>
                <span class="text-body-2" style="color: rgb(var(--v-theme-on-surface));">
                  <strong>Email:</strong> {{ selectedContact.email || '-' }}
                </span>
              </div>
            </div>

            <v-divider class="my-4" />

            <div class="d-flex justify-center ga-2">
              <v-btn
                v-if="selectedContact.phone"
                variant="outlined"
                color="primary"
                rounded="lg"
                prepend-icon="mdi-phone"
                size="small"
                @click="makeCall(selectedContact.phone)"
              >
                Call
              </v-btn>
              <v-btn
                v-if="selectedContact.email"
                variant="outlined"
                color="primary"
                rounded="lg"
                prepend-icon="mdi-email-outline"
                size="small"
                @click="sendEmail(selectedContact.email)"
              >
                Email
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  usePhoneDirectory,
  type Contact,
} from '@/composables/usePhoneDirectory'

// Emits
defineEmits<{
  (e: 'navigate', page: string): void
}>()

const {
  departmentOptions,
  teamOptionsFor,
  filterContacts,
  getInitials,
  makeCall,
  sendEmail
} = usePhoneDirectory()

// State
const directoryView = ref<'grid' | 'list'>('grid')
const contactSearch = ref('')
const selectedDepartment = ref('All')
const selectedTeam = ref('All')
const contactDialog = ref(false)
const selectedContact = ref<Contact | null>(null)

// Team Options
const teamOptions = computed(() => teamOptionsFor(selectedDepartment.value))

// Filtered Contacts
const filteredContacts = computed(() =>
  filterContacts(
    contactSearch.value,
    selectedDepartment.value,
    selectedTeam.value
  )
)

// Watch department change to reset team
watch(selectedDepartment, () => {
  selectedTeam.value = 'All'
})

// Reset Filters
const resetFilters = () => {
  contactSearch.value = ''
  selectedDepartment.value = 'All'
  selectedTeam.value = 'All'
}

// Open Contact Dialog
const openContactDialog = (contact: Contact) => {
  selectedContact.value = contact
  contactDialog.value = true
}
</script>

<style scoped>
.phone-directory-page {
  width: 100%;
  padding: 16px 0;
}

.page-header {
  width: 100%;
}

.filter-select :deep(.v-field) {
  border-radius: 12px !important;
  min-height: 40px !important;
}

.search-field :deep(.v-field) {
  border-radius: 12px !important;
}

.view-toggle-btn {
  min-height: 36px !important;
  padding: 0 16px !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  transition: all 0.2s ease !important;
}

.view-toggle-btn:hover {
  background: rgba(var(--v-theme-primary), 0.05) !important;
}

/* Grid View */
.contact-grid-card {
  border: 1.5px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface)) !important;
  transition: all 0.2s ease !important;
  height: 100% !important;
}

.contact-grid-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.3) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

.contact-list-item {
  min-height: 80px !important;
  padding-top: 12px !important;
  padding-bottom: 12px !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06) !important;
  border-radius: 0 !important;
  transition: background 0.15s ease !important;
}

.contact-list-item:last-child {
  border-bottom: none !important;
}

.contact-list-item:hover {
  background: rgba(var(--v-theme-on-surface), 0.03) !important;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(15, 157, 154, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(15, 157, 154, 0.5);
}

/* Dark Mode Overrides */
:deep(.dark) .contact-grid-card {
  background: #1e293b !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}

:deep(.dark) .contact-grid-card:hover {
  border-color: rgba(15, 157, 154, 0.4) !important;
}

:deep(.dark) .contact-list-item {
  border-color: rgba(255, 255, 255, 0.06) !important;
}

:deep(.dark) .contact-list-item:hover {
  background: rgba(255, 255, 255, 0.03) !important;
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
  }

  .page-header .v-btn {
    align-self: flex-start;
  }

  .contact-grid-card {
    min-height: 180px !important;
  }

  .contact-grid-card .v-avatar {
    width: 48px !important;
    height: 48px !important;
  }

  .contact-grid-card .v-avatar span {
    font-size: 18px !important;
  }
}

@media (max-width: 480px) {
  .contact-grid-card {
    min-height: 160px !important;
  }

  .contact-grid-card .v-avatar {
    width: 40px !important;
    height: 40px !important;
  }

  .contact-grid-card .v-avatar span {
    font-size: 15px !important;
  }

  .text-h5 {
    font-size: 1.1rem !important;
  }

  .text-h6 {
    font-size: 0.95rem !important;
  }
}
</style>
