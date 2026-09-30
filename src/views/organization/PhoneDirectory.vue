<template>
  <v-container fluid class="pa-6">
    <!-- Breadcrumb -->
    <div class="d-flex align-center ga-2 mb-6">
      <v-icon size="20">mdi-phone-outline</v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Organization
      </span>

      <v-icon size="18" color="grey">
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Phone Directory
      </span>
    </div>

    <!-- Header -->
    <div
      class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6"
    >
      <div>
        <h1 class="text-h5 font-weight-bold mb-1">
          Phone Directory
        </h1>

        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage employee contact information and internal phone directory.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openNewContact"
      >
        New Contact
      </v-btn>
    </div>

    <!-- Summary Cards -->
    <v-row class="mb-2">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Total Contacts"
          :value="totalContacts"
          icon="mdi-account-group-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Departments"
          :value="totalDepartments"
          icon="mdi-domain"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Teams"
          :value="totalTeams"
          icon="mdi-account-multiple-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Favorites"
          :value="favoriteContacts"
          icon="mdi-star-outline"
        />
      </v-col>
    </v-row>

    <!-- Tabs -->
    <v-card
      border
      rounded="xl"
      elevation="0"
    >
      <v-tabs
        v-model="tab"
        color="primary"
        grow
      >
        <v-tab value="directory">
          <v-icon start>
            mdi-phone-outline
          </v-icon>
          Phone Directory
        </v-tab>

        <v-tab value="new">
          <v-icon start>
            mdi-account-plus-outline
          </v-icon>
          New Contact
        </v-tab>

        <v-tab value="departments">
          <v-icon start>
            mdi-domain
          </v-icon>
          Departments
        </v-tab>

        <v-tab value="teams">
          <v-icon start>
            mdi-account-multiple-outline
          </v-icon>
          Teams
        </v-tab>

        <v-tab value="favorites">
          <v-icon start>
            mdi-star-outline
          </v-icon>
          Favorites
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- Tab Content -->
    <v-window
      v-model="tab"
      class="mt-6"
    >
      <!-- ========================================================= -->
      <!-- PHONE DIRECTORY -->
      <!-- ========================================================= -->
      <v-window-item value="directory">
        <v-card
          border
          rounded="xl"
          elevation="0"
        >
          <!-- Header -->
          <div class="pa-5">
            <div
              class="d-flex flex-wrap align-center justify-space-between ga-4"
            >
              <div>
                <h2 class="text-subtitle-1 font-weight-bold">
                  Employee Phone Directory
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Search and manage employee contact information.
                </p>
              </div>

              <!-- Filter -->
              <v-menu
                v-model="filterMenu"
                :close-on-content-click="false"
                location="bottom end"
              >
                <template #activator="{ props }">
                  <v-btn
                    v-bind="props"
                    variant="outlined"
                    prepend-icon="mdi-filter-variant"
                    append-icon="mdi-chevron-down"
                    rounded="lg"
                  >
                    Filter
                    <v-badge
                      v-if="activeFilterCount > 0"
                      :content="activeFilterCount"
                      color="primary"
                      inline
                      class="ml-2"
                    />
                  </v-btn>
                </template>

                <v-card
                  width="340"
                  rounded="lg"
                  elevation="4"
                  class="pa-4"
                >
                  <div class="d-flex align-center justify-space-between mb-4">
                    <span class="text-subtitle-2 font-weight-bold">
                      Filter Contacts
                    </span>

                    <v-btn
                      icon="mdi-close"
                      variant="text"
                      size="small"
                      @click="filterMenu = false"
                    />
                  </div>

                  <v-select
                    v-model="filters.department"
                    label="Department"
                    :items="departmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.team"
                    label="Team"
                    :items="teamFilterOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.position"
                    label="Position"
                    :items="positionOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.officeLocation"
                    label="Office Location"
                    :items="locationOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.status"
                    label="Status"
                    :items="statusOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                  />

                  <div class="d-flex justify-end ga-2 mt-4">
                    <v-btn
                      variant="text"
                      @click="clearFilters"
                    >
                      Clear
                    </v-btn>

                    <v-btn
                      color="primary"
                      @click="filterMenu = false"
                    >
                      Apply
                    </v-btn>
                  </div>
                </v-card>
              </v-menu>
            </div>

            <!-- Search -->
            <v-text-field
              v-model="search"
              class="mt-5"
              prepend-inner-icon="mdi-magnify"
              label="Search contacts"
              placeholder="Search by name, employee ID, team, department, extension or email..."
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
            />
          </div>

          <v-divider />

          <!-- Table -->
          <div class="table-wrapper">
            <v-data-table
              :headers="headers"
              :items="filteredContacts"
              :items-per-page="itemsPerPage"
              :page="page"
              hide-default-footer
              hover
            >
              <!-- Employee -->
              <template #item.employee="{ item }">
                <div class="d-flex align-center py-2">
                  <v-avatar
                    size="38"
                    color="primary"
                    variant="tonal"
                    class="mr-3"
                  >
                    <span class="text-body-2 font-weight-bold">
                      {{ getInitials(item.name) }}
                    </span>
                  </v-avatar>

                  <div>
                    <div class="font-weight-medium">
                      {{ item.name }}
                    </div>

                    <div class="text-caption text-medium-emphasis">
                      {{ item.employeeId }}
                    </div>
                  </div>
                </div>
              </template>

              <!-- Position -->
              <template #item.position="{ item }">
                <div>
                  <div class="font-weight-medium">
                    {{ item.position }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.department }}
                  </div>
                </div>
              </template>

              <!-- Team -->
              <template #item.team="{ item }">
                <v-chip
                  size="small"
                  variant="tonal"
                >
                  {{ item.team }}
                </v-chip>
              </template>

              <!-- Extension -->
              <template #item.extension="{ item }">
                <div class="d-flex align-center ga-2">
                  <v-icon
                    size="17"
                    color="primary"
                  >
                    mdi-phone
                  </v-icon>

                  <span class="font-weight-medium">
                    {{ item.extension }}
                  </span>
                </div>
              </template>

              <!-- Mobile -->
              <template #item.mobile="{ item }">
                <span>
                  {{ item.mobile || "-" }}
                </span>
              </template>

              <!-- Email -->
              <template #item.email="{ item }">
                <span class="text-body-2">
                  {{ item.email }}
                </span>
              </template>

              <!-- Location -->
              <template #item.officeLocation="{ item }">
                {{ item.officeLocation }}
              </template>

              <!-- Status -->
              <template #item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                  variant="tonal"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <!-- Actions -->
              <template #item.actions="{ item }">
                <div class="d-flex align-center ga-1">
                  <v-btn
                    :icon="
                      item.favorite
                        ? 'mdi-star'
                        : 'mdi-star-outline'
                    "
                    :color="
                      item.favorite
                        ? 'warning'
                        : undefined
                    "
                    variant="text"
                    size="small"
                    @click="toggleFavorite(item)"
                  />

                  <v-btn
                    icon="mdi-eye-outline"
                    variant="text"
                    size="small"
                    @click="viewContact(item)"
                  />

                  <v-btn
                    icon="mdi-pencil-outline"
                    variant="text"
                    size="small"
                    @click="editContact(item)"
                  />
                </div>
              </template>

              <template #no-data>
                <div class="pa-8 text-center">
                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-account-search-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No contacts found
                  </div>

                  <div class="text-body-2 text-medium-emphasis">
                    Try changing your search or filter.
                  </div>
                </div>
              </template>
            </v-data-table>
          </div>

          <v-divider />

          <!-- Pagination -->
          <div class="pagination-wrapper">
            <div class="text-body-2 text-medium-emphasis">
              Showing
              <strong>
                {{ paginationStart }}
              </strong>
              -
              <strong>
                {{ paginationEnd }}
              </strong>
              of
              <strong>
                {{ filteredContacts.length }}
              </strong>
              contacts
            </div>

            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="5"
              rounded="circle"
              density="comfortable"
            />
          </div>
        </v-card>
      </v-window-item>

      <!-- ========================================================= -->
      <!-- NEW CONTACT -->
      <!-- ========================================================= -->
      <v-window-item value="new">
        <v-row>
          <!-- Form -->
          <v-col
            cols="12"
            lg="8"
          >
            <v-card
              border
              rounded="xl"
              elevation="0"
            >
              <div class="pa-5">
                <h2 class="text-subtitle-1 font-weight-bold">
                  New Contact
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-6">
                  Add a new employee contact to the phone directory.
                </p>

                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.employeeId"
                      label="Employee ID"
                      variant="outlined"
                      density="comfortable"
                      placeholder="EMP-009"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.name"
                      label="Employee Name"
                      variant="outlined"
                      density="comfortable"
                      placeholder="Employee name"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.position"
                      label="Position"
                      :items="positionOptions"
                      variant="outlined"
                      density="comfortable"
                      clearable
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.department"
                      label="Department"
                      :items="departmentOptions"
                      variant="outlined"
                      density="comfortable"
                      clearable
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.team"
                      label="Team"
                      :items="teamOptionsForForm"
                      variant="outlined"
                      density="comfortable"
                      clearable
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.extension"
                      label="Extension"
                      variant="outlined"
                      density="comfortable"
                      placeholder="1234"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.mobile"
                      label="Mobile"
                      variant="outlined"
                      density="comfortable"
                      placeholder="01X-XXXXXXX"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      placeholder="employee@company.com"
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.officeLocation"
                      label="Office Location"
                      :items="locationOptions"
                      variant="outlined"
                      density="comfortable"
                      clearable
                    />
                  </v-col>

                  <v-col
                    cols="12"
                    md="6"
                  >
                    <v-select
                      v-model="form.status"
                      label="Status"
                      :items="statusOptions"
                      variant="outlined"
                      density="comfortable"
                    />
                  </v-col>
                </v-row>

                <div class="d-flex justify-end ga-2 mt-3">
                  <v-btn
                    variant="outlined"
                    rounded="lg"
                    @click="clearForm"
                  >
                    Clear
                  </v-btn>

                  <v-btn
                    color="primary"
                    rounded="lg"
                    prepend-icon="mdi-content-save-outline"
                    @click="saveContact"
                  >
                    Save Contact
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-col>

          <!-- Preview -->
          <v-col
            cols="12"
            lg="4"
          >
            <v-card
              border
              rounded="xl"
              elevation="0"
              class="h-100"
            >
              <div class="pa-5">
                <h2 class="text-subtitle-1 font-weight-bold mb-4">
                  Contact Preview
                </h2>

                <div class="announcement-preview">
                  <div class="d-flex align-center mb-5">
                    <v-avatar
                      size="56"
                      color="primary"
                      variant="tonal"
                      class="mr-3"
                    >
                      <span class="text-h6 font-weight-bold">
                        {{ previewInitials }}
                      </span>
                    </v-avatar>

                    <div>
                      <div class="text-subtitle-1 font-weight-bold">
                        {{ form.name || "Employee Name" }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ form.position || "Position" }}
                      </div>
                    </div>
                  </div>

                  <v-divider class="mb-4" />

                  <div class="preview-row">
                    <span class="preview-label">
                      Employee ID
                    </span>

                    <span>
                      {{ form.employeeId || "-" }}
                    </span>
                  </div>

                  <div class="preview-row">
                    <span class="preview-label">
                      Department
                    </span>

                    <span>
                      {{ form.department || "-" }}
                    </span>
                  </div>

                  <div class="preview-row">
                    <span class="preview-label">
                      Team
                    </span>

                    <span>
                      {{ form.team || "-" }}
                    </span>
                  </div>

                  <div class="preview-row">
                    <span class="preview-label">
                      Extension
                    </span>

                    <span>
                      {{ form.extension || "-" }}
                    </span>
                  </div>

                  <div class="preview-row">
                    <span class="preview-label">
                      Mobile
                    </span>

                    <span>
                      {{ form.mobile || "-" }}
                    </span>
                  </div>

                  <div class="preview-row">
                    <span class="preview-label">
                      Email
                    </span>

                    <span class="text-break">
                      {{ form.email || "-" }}
                    </span>
                  </div>

                  <div class="preview-row">
                    <span class="preview-label">
                      Location
                    </span>

                    <span>
                      {{ form.officeLocation || "-" }}
                    </span>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- ========================================================= -->
      <!-- DEPARTMENTS -->
      <!-- ========================================================= -->
      <v-window-item value="departments">
        <v-row>
          <v-col
            v-for="department in departmentCards"
            :key="department.name"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              border
              rounded="xl"
              elevation="0"
              class="directory-card h-100"
            >
              <div class="pa-5">
                <div class="d-flex align-start justify-space-between mb-4">
                  <v-avatar
                    size="46"
                    color="primary"
                    variant="tonal"
                  >
                    <v-icon>
                      mdi-domain
                    </v-icon>
                  </v-avatar>

                  <v-chip
                    size="small"
                    variant="tonal"
                  >
                    {{ department.contactCount }} Contacts
                  </v-chip>
                </div>

                <div class="text-subtitle-1 font-weight-bold">
                  {{ department.name }}
                </div>

                <div class="text-body-2 text-medium-emphasis mt-1">
                  {{ department.teamCount }} Teams
                </div>

                <v-divider class="my-4" />

                <div class="text-body-2">
                  <v-icon
                    size="17"
                    class="mr-2"
                  >
                    mdi-phone-outline
                  </v-icon>

                  {{ department.extension }}
                </div>

                <v-btn
                  variant="text"
                  color="primary"
                  class="px-0 mt-3"
                  append-icon="mdi-arrow-right"
                  @click="filterByDepartment(department.name)"
                >
                  View Contacts
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- ========================================================= -->
      <!-- TEAMS -->
      <!-- ========================================================= -->
      <v-window-item value="teams">
        <v-row>
          <v-col
            v-for="team in teamCards"
            :key="team.name"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              border
              rounded="xl"
              elevation="0"
              class="directory-card h-100"
            >
              <div class="pa-5">
                <div class="d-flex align-start justify-space-between mb-4">
                  <v-avatar
                    size="46"
                    color="primary"
                    variant="tonal"
                  >
                    <v-icon>
                      mdi-account-multiple-outline
                    </v-icon>
                  </v-avatar>

                  <v-chip
                    size="small"
                    variant="tonal"
                  >
                    {{ team.contactCount }} Contacts
                  </v-chip>
                </div>

                <div class="text-subtitle-1 font-weight-bold">
                  {{ team.name }}
                </div>

                <div class="text-body-2 text-medium-emphasis mt-1">
                  {{ team.department }}
                </div>

                <v-divider class="my-4" />

                <div class="text-body-2">
                  <v-icon
                    size="17"
                    class="mr-2"
                  >
                    mdi-phone-outline
                  </v-icon>

                  {{ team.extension }}
                </div>

                <v-btn
                  variant="text"
                  color="primary"
                  class="px-0 mt-3"
                  append-icon="mdi-arrow-right"
                  @click="filterByTeam(team.name)"
                >
                  View Contacts
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- ========================================================= -->
      <!-- FAVORITES -->
      <!-- ========================================================= -->
      <v-window-item value="favorites">
        <v-card
          border
          rounded="xl"
          elevation="0"
        >
          <div class="pa-5">
            <div class="d-flex align-center justify-space-between mb-5">
              <div>
                <h2 class="text-subtitle-1 font-weight-bold">
                  Favorite Contacts
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Frequently used employee contacts.
                </p>
              </div>

              <v-icon
                color="warning"
                size="28"
              >
                mdi-star
              </v-icon>
            </div>

            <v-row v-if="favoriteItems.length">
              <v-col
                v-for="item in favoriteItems"
                :key="item.id"
                cols="12"
                sm="6"
                lg="4"
              >
                <v-card
                  border
                  rounded="xl"
                  elevation="0"
                  class="directory-card"
                >
                  <div class="pa-5">
                    <div class="d-flex align-center">
                      <v-avatar
                        size="48"
                        color="primary"
                        variant="tonal"
                        class="mr-3"
                      >
                        <span class="font-weight-bold">
                          {{ getInitials(item.name) }}
                        </span>
                      </v-avatar>

                      <div class="flex-grow-1">
                        <div class="font-weight-bold">
                          {{ item.name }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                          {{ item.position }}
                        </div>
                      </div>

                      <v-btn
                        icon="mdi-star"
                        color="warning"
                        variant="text"
                        size="small"
                        @click="toggleFavorite(item)"
                      />
                    </div>

                    <v-divider class="my-4" />

                    <div class="contact-detail">
                      <v-icon size="18">
                        mdi-domain
                      </v-icon>

                      <span>
                        {{ item.department }} · {{ item.team }}
                      </span>
                    </div>

                    <div class="contact-detail">
                      <v-icon
                        size="18"
                        color="primary"
                      >
                        mdi-phone
                      </v-icon>

                      <span class="font-weight-medium">
                        {{ item.extension }}
                      </span>
                    </div>

                    <div class="contact-detail">
                      <v-icon size="18">
                        mdi-email-outline
                      </v-icon>

                      <span class="text-break">
                        {{ item.email }}
                      </span>
                    </div>

                    <v-btn
                      block
                      variant="outlined"
                      rounded="lg"
                      class="mt-4"
                      @click="viewContact(item)"
                    >
                      View Contact
                    </v-btn>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <div
              v-else
              class="text-center pa-10"
            >
              <v-icon
                size="52"
                color="grey"
                class="mb-3"
              >
                mdi-star-outline
              </v-icon>

              <div class="text-body-1 font-weight-medium">
                No favorite contacts
              </div>

              <div class="text-body-2 text-medium-emphasis">
                Mark contacts as favorite to see them here.
              </div>
            </div>
          </div>
        </v-card>
      </v-window-item>
    </v-window>

    <!-- ========================================================= -->
    <!-- DETAILS DIALOG -->
    <!-- ========================================================= -->
    <v-dialog
      v-model="detailsDialog"
      max-width="650"
    >
      <v-card
        rounded="xl"
      >
        <v-card-title class="pa-5 d-flex align-center">
          <span class="text-subtitle-1 font-weight-bold">
            Contact Details
          </span>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="detailsDialog = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text
          v-if="selectedContact"
          class="pa-5"
        >
          <div class="d-flex align-center mb-6">
            <v-avatar
              size="64"
              color="primary"
              variant="tonal"
              class="mr-4"
            >
              <span class="text-h6 font-weight-bold">
                {{ getInitials(selectedContact.name) }}
              </span>
            </v-avatar>

            <div>
              <div class="text-h6 font-weight-bold">
                {{ selectedContact.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedContact.position }}
              </div>

              <div class="d-flex align-center ga-2 mt-2">
                <v-chip
                  size="small"
                  variant="tonal"
                >
                  {{ selectedContact.department }}
                </v-chip>

                <v-chip
                  size="small"
                  variant="tonal"
                >
                  {{ selectedContact.team }}
                </v-chip>
              </div>
            </div>
          </div>

          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Employee ID
                </div>

                <div class="detail-value">
                  {{ selectedContact.employeeId }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Extension
                </div>

                <div class="detail-value">
                  {{ selectedContact.extension }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Mobile
                </div>

                <div class="detail-value">
                  {{ selectedContact.mobile || "-" }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Office Location
                </div>

                <div class="detail-value">
                  {{ selectedContact.officeLocation }}
                </div>
              </div>
            </v-col>

            <v-col cols="12">
              <div class="detail-box">
                <div class="detail-label">
                  Email
                </div>

                <div class="detail-value text-break">
                  {{ selectedContact.email }}
                </div>
              </div>
            </v-col>

            <v-col cols="12">
              <div class="detail-box">
                <div class="detail-label">
                  Status
                </div>

                <v-chip
                  :color="getStatusColor(selectedContact.status)"
                  size="small"
                  variant="tonal"
                >
                  {{ selectedContact.status }}
                </v-chip>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="detailsDialog = false"
          >
            Close
          </v-btn>

          <v-btn
            v-if="selectedContact"
            color="primary"
            rounded="lg"
            prepend-icon="mdi-pencil-outline"
            @click="editSelectedContact"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      color="success"
    >
      {{ snackbarMessage }}

      <template #actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"

type ContactStatus = "Active" | "Inactive"

interface PhoneContact {
  id: string
  employeeId: string
  name: string
  position: string
  department: string
  team: string
  extension: string
  mobile: string
  email: string
  officeLocation: string
  status: ContactStatus
  favorite: boolean
}

interface ContactForm {
  employeeId: string
  name: string
  position: string
  department: string
  team: string
  extension: string
  mobile: string
  email: string
  officeLocation: string
  status: ContactStatus
}

/* */

const tab = ref("directory")

const search = ref("")
const page = ref(1)
const itemsPerPage = 10

const filterMenu = ref(false)

const detailsDialog = ref(false)
const selectedContact = ref<PhoneContact | null>(null)

const snackbar = ref(false)
const snackbarMessage = ref("")

const filters = ref({
  department: null as string | null,
  team: null as string | null,
  position: null as string | null,
  officeLocation: null as string | null,
  status: null as ContactStatus | null,
})

const form = ref<ContactForm>({
  employeeId: "",
  name: "",
  position: "",
  department: "",
  team: "",
  extension: "",
  mobile: "",
  email: "",
  officeLocation: "",
  status: "Active",
})

/* */

const headers = [
  {
    title: "Employee",
    key: "employee",
    sortable: false,
    minWidth: 230,
  },
  {
    title: "Position",
    key: "position",
    sortable: false,
    minWidth: 200,
  },
  {
    title: "Team",
    key: "team",
    sortable: false,
    minWidth: 160,
  },
  {
    title: "Extension",
    key: "extension",
    sortable: false,
    minWidth: 120,
  },
  {
    title: "Mobile",
    key: "mobile",
    sortable: false,
    minWidth: 140,
  },
  {
    title: "Email",
    key: "email",
    sortable: false,
    minWidth: 230,
  },
  {
    title: "Location",
    key: "officeLocation",
    sortable: false,
    minWidth: 150,
  },
  {
    title: "Status",
    key: "status",
    sortable: false,
    minWidth: 100,
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    align: "end" as const,
    minWidth: 140,
  },
]

/* */

const departmentOptions = [
  "Information Technology",
  "Human Resource",
  "Finance",
  "Procurement",
  "Sales & Marketing",
  "Quality Assurance",
  "Production",
  "Regulatory Affairs",
  "Corporate Affairs",
]

const teamOptions = [
  "Application Team",
  "Infrastructure Team",
  "IT Support Team",
  "HR Operations",
  "Payroll Team",
  "Finance Operations",
  "Procurement Team",
  "Sales Team",
  "Marketing Team",
  "QA Team",
  "Production Team",
  "Regulatory Team",
  "Corporate Affairs Team",
]

const positionOptions = [
  "IT Manager",
  "IT Executive",
  "Software Developer",
  "Application Support",
  "System Administrator",
  "Network Administrator",
  "HR Executive",
  "HR Officer",
  "Finance Executive",
  "Finance Officer",
  "Procurement Executive",
  "Sales Executive",
  "Marketing Executive",
  "QA Executive",
  "Production Executive",
]

const locationOptions = [
  "Head Office",
  "Production Plant",
  "Warehouse",
  "Melaka Office",
  "Kuala Lumpur Office",
]

const statusOptions: ContactStatus[] = [
  "Active",
  "Inactive",
]

/* */

const contacts = ref<PhoneContact[]>([
  {
    id: "CONT-001",
    employeeId: "EMP-001",
    name: "Ahmad Faiz",
    position: "IT Manager",
    department: "Information Technology",
    team: "Infrastructure Team",
    extension: "2101",
    mobile: "012-3456789",
    email: "ahmad.faiz@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: true,
  },
  {
    id: "CONT-002",
    employeeId: "EMP-002",
    name: "Nur Amirah",
    position: "IT Executive",
    department: "Information Technology",
    team: "Application Team",
    extension: "2102",
    mobile: "013-4567890",
    email: "nur.amirah@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: true,
  },
  {
    id: "CONT-003",
    employeeId: "EMP-003",
    name: "Muhammad Aiman",
    position: "IT Executive",
    department: "Information Technology",
    team: "Application Team",
    extension: "2103",
    mobile: "014-5678901",
    email: "aiman@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-004",
    employeeId: "EMP-004",
    name: "Daniel Tan",
    position: "System Administrator",
    department: "Information Technology",
    team: "Infrastructure Team",
    extension: "2104",
    mobile: "016-6789012",
    email: "daniel.tan@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-005",
    employeeId: "EMP-005",
    name: "Siti Nurul",
    position: "Application Support",
    department: "Information Technology",
    team: "IT Support Team",
    extension: "2105",
    mobile: "017-7890123",
    email: "siti.nurul@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: true,
  },
  {
    id: "CONT-006",
    employeeId: "EMP-006",
    name: "Farah Nadia",
    position: "HR Executive",
    department: "Human Resource",
    team: "HR Operations",
    extension: "2201",
    mobile: "018-8901234",
    email: "farah.nadia@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-007",
    employeeId: "EMP-007",
    name: "Jason Lim",
    position: "Finance Executive",
    department: "Finance",
    team: "Finance Operations",
    extension: "2301",
    mobile: "019-9012345",
    email: "jason.lim@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-008",
    employeeId: "EMP-008",
    name: "Aina Rahman",
    position: "Procurement Executive",
    department: "Procurement",
    team: "Procurement Team",
    extension: "2401",
    mobile: "011-12345678",
    email: "aina.rahman@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-009",
    employeeId: "EMP-009",
    name: "Syafiq Ismail",
    position: "QA Executive",
    department: "Quality Assurance",
    team: "QA Team",
    extension: "2501",
    mobile: "012-2345678",
    email: "syafiq.ismail@company.com",
    officeLocation: "Production Plant",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-010",
    employeeId: "EMP-010",
    name: "Michelle Wong",
    position: "Marketing Executive",
    department: "Sales & Marketing",
    team: "Marketing Team",
    extension: "2601",
    mobile: "013-3456789",
    email: "michelle.wong@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-011",
    employeeId: "EMP-011",
    name: "Hafiz Rahman",
    position: "Production Executive",
    department: "Production",
    team: "Production Team",
    extension: "2701",
    mobile: "014-4567890",
    email: "hafiz.rahman@company.com",
    officeLocation: "Production Plant",
    status: "Active",
    favorite: false,
  },
  {
    id: "CONT-012",
    employeeId: "EMP-012",
    name: "Liyana Aziz",
    position: "Regulatory Affairs Executive",
    department: "Regulatory Affairs",
    team: "Regulatory Team",
    extension: "2801",
    mobile: "016-5678901",
    email: "liyana.aziz@company.com",
    officeLocation: "Head Office",
    status: "Active",
    favorite: false,
  },
])

/* */

const totalContacts = computed(() => contacts.value.length)

const totalDepartments = computed(() => {
  return new Set(
    contacts.value.map((contact) => contact.department),
  ).size
})

const totalTeams = computed(() => {
  return new Set(
    contacts.value.map((contact) => contact.team),
  ).size
})

const favoriteContacts = computed(() => {
  return contacts.value.filter(
    (contact) => contact.favorite,
  ).length
})

const activeFilterCount = computed(() => {
  return Object.values(filters.value).filter(Boolean).length
})

const teamFilterOptions = computed(() => {
  if (!filters.value.department) {
    return teamOptions
  }

  return Array.from(
    new Set(
      contacts.value
        .filter(
          (contact) =>
            contact.department === filters.value.department,
        )
        .map((contact) => contact.team),
    ),
  )
})

const teamOptionsForForm = computed(() => {
  if (!form.value.department) {
    return teamOptions
  }

  return Array.from(
    new Set(
      contacts.value
        .filter(
          (contact) =>
            contact.department === form.value.department,
        )
        .map((contact) => contact.team),
    ),
  )
})

const filteredContacts = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return contacts.value.filter((contact) => {
    const matchesSearch =
      !keyword ||
      [
        contact.employeeId,
        contact.name,
        contact.position,
        contact.department,
        contact.team,
        contact.extension,
        contact.mobile,
        contact.email,
        contact.officeLocation,
      ].some((value) =>
        value.toLowerCase().includes(keyword),
      )

    const matchesDepartment =
      !filters.value.department ||
      contact.department === filters.value.department

    const matchesTeam =
      !filters.value.team ||
      contact.team === filters.value.team

    const matchesPosition =
      !filters.value.position ||
      contact.position === filters.value.position

    const matchesLocation =
      !filters.value.officeLocation ||
      contact.officeLocation === filters.value.officeLocation

    const matchesStatus =
      !filters.value.status ||
      contact.status === filters.value.status

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesTeam &&
      matchesPosition &&
      matchesLocation &&
      matchesStatus
    )
  })
})

const pageCount = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredContacts.value.length /
        itemsPerPage,
    ),
  )
})

const paginationStart = computed(() => {
  if (!filteredContacts.value.length) {
    return 0
  }

  return (
    (page.value - 1) * itemsPerPage + 1
  )
})

const paginationEnd = computed(() => {
  return Math.min(
    page.value * itemsPerPage,
    filteredContacts.value.length,
  )
})

const favoriteItems = computed(() => {
  return contacts.value.filter(
    (contact) => contact.favorite,
  )
})

const previewInitials = computed(() => {
  return getInitials(
    form.value.name || "Employee Name",
  )
})

const departmentCards = computed(() => {
  return departmentOptions.map((department) => {
    const departmentContacts =
      contacts.value.filter(
        (contact) =>
          contact.department === department,
      )

    const teams = new Set(
      departmentContacts.map(
        (contact) => contact.team,
      ),
    )

    const firstContact =
      departmentContacts[0]

    return {
      name: department,
      contactCount: departmentContacts.length,
      teamCount: teams.size,
      extension:
        firstContact?.extension || "-",
    }
  })
})

const teamCards = computed(() => {
  return teamOptions.map((team) => {
    const teamContacts =
      contacts.value.filter(
        (contact) => contact.team === team,
      )

    const firstContact =
      teamContacts[0]

    return {
      name: team,
      department:
        firstContact?.department || "-",
      contactCount: teamContacts.length,
      extension:
        firstContact?.extension || "-",
    }
  })
})

/* */

watch(
  [
    search,
    () => filters.value.department,
    () => filters.value.team,
    () => filters.value.position,
    () => filters.value.officeLocation,
    () => filters.value.status,
  ],
  () => {
    page.value = 1
  },
)

watch(
  () => filters.value.department,
  () => {
    if (
      filters.value.team &&
      !teamFilterOptions.value.includes(
        filters.value.team,
      )
    ) {
      filters.value.team = null
    }
  },
)

watch(
  () => form.value.department,
  () => {
    if (
      form.value.team &&
      !teamOptionsForForm.value.includes(
        form.value.team,
      )
    ) {
      form.value.team = ""
    }
  },
)

/* */

function getInitials(name: string) {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (!words.length) {
    return "-"
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return (
    words[0][0] +
    words[words.length - 1][0]
  ).toUpperCase()
}

function getStatusColor(status: ContactStatus) {
  return status === "Active"
    ? "success"
    : "grey"
}

function toggleFavorite(contact: PhoneContact) {
  contact.favorite = !contact.favorite

  snackbarMessage.value = contact.favorite
    ? `${contact.name} added to favorites.`
    : `${contact.name} removed from favorites.`

  snackbar.value = true
}

function viewContact(contact: PhoneContact) {
  selectedContact.value = contact
  detailsDialog.value = true
}

function editContact(contact: PhoneContact) {
  form.value = {
    employeeId: contact.employeeId,
    name: contact.name,
    position: contact.position,
    department: contact.department,
    team: contact.team,
    extension: contact.extension,
    mobile: contact.mobile,
    email: contact.email,
    officeLocation: contact.officeLocation,
    status: contact.status,
  }

  selectedContact.value = contact
  detailsDialog.value = false
  tab.value = "new"
}

function editSelectedContact() {
  if (!selectedContact.value) {
    return
  }

  editContact(selectedContact.value)
}

function openNewContact() {
  clearForm()
  tab.value = "new"
}

function clearFilters() {
  filters.value = {
    department: null,
    team: null,
    position: null,
    officeLocation: null,
    status: null,
  }
}

function clearForm() {
  form.value = {
    employeeId: "",
    name: "",
    position: "",
    department: "",
    team: "",
    extension: "",
    mobile: "",
    email: "",
    officeLocation: "",
    status: "Active",
  }
}

function saveContact() {
  if (
    !form.value.employeeId ||
    !form.value.name ||
    !form.value.department ||
    !form.value.team ||
    !form.value.extension
  ) {
    snackbarMessage.value =
      "Please complete the required contact information."

    snackbar.value = true
    return
  }

  const existingContact =
    contacts.value.find(
      (contact) =>
        contact.employeeId ===
        form.value.employeeId,
    )

  if (existingContact) {
    Object.assign(existingContact, {
      ...form.value,
    })

    snackbarMessage.value =
      "Contact updated successfully."
  } else {
    contacts.value.push({
      id: `CONT-${String(
        contacts.value.length + 1,
      ).padStart(3, "0")}`,
      ...form.value,
      favorite: false,
    })

    snackbarMessage.value =
      "Contact added successfully."
  }

  snackbar.value = true
  clearForm()
  tab.value = "directory"
}

function filterByDepartment(
  department: string,
) {
  filters.value.department = department
  filters.value.team = null
  tab.value = "directory"
}

function filterByTeam(team: string) {
  filters.value.team = team

  const contact = contacts.value.find(
    (item) => item.team === team,
  )

  if (contact) {
    filters.value.department =
      contact.department
  }

  tab.value = "directory"
}
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-wrapper :deep(table) {
  min-width: 1450px;
}

.table-wrapper :deep(th) {
  white-space: nowrap;
  font-weight: 600;
  font-size: 13px;
}

.table-wrapper :deep(td) {
  white-space: nowrap;
  font-size: 14px;
}

.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  flex-wrap: wrap;
}

.directory-card {
  border: 1px solid #d9d9d9 !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.directory-card:hover {
  transform: translateY(-2px);
  border-color: #bdbdbd !important;
  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;
}

.announcement-preview {
  border: 1px solid #e0e0e0;
  border-radius: 14px;
  padding: 18px;
  background: #fafafa;
}

.preview-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid #eeeeee;
}

.preview-row:last-child {
  border-bottom: none;
}

.preview-label {
  color: #757575;
  font-weight: 500;
  min-width: 110px;
}

.contact-detail {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 14px;
}

.detail-box {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 14px 16px;
  height: 100%;
}

.detail-label {
  color: #757575;
  font-size: 12px;
  margin-bottom: 5px;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 960px) {
  .pagination-wrapper {
    justify-content: center;
  }
}

@media (max-width: 700px) {
  .pagination-wrapper {
    flex-direction: column;
    align-items: center;
  }
}
</style>