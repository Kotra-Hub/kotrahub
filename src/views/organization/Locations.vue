<template>

  <v-container fluid class="pa-6">

    <!-- ============================================================
         BREADCRUMB
         ============================================================ -->

    <div class="d-flex align-center mb-6">

      <v-icon
        size="20"
        class="mr-2"
      >
        mdi-map-marker-outline
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Organization
      </span>

      <v-icon
        size="18"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Locations
      </span>

    </div>


    <!-- ============================================================
         PAGE HEADER
         ============================================================ -->

    <div
      class="d-flex flex-wrap align-center justify-space-between mb-6"
    >

      <div>

        <h1 class="text-h5 font-weight-bold">
          Location Management
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage organization locations and location records
        </p>

      </div>


      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="tab = 'register'"
      >
        Register Location
      </v-btn>

    </div>


    <!-- ============================================================
         SUMMARY CARDS
         ============================================================ -->

    <v-row class="mb-6">

      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Active Locations"
          :value="activeLocationCount"
          icon="mdi-map-marker-check-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Assigned"
          :value="assignedEmployeeCount"
          icon="mdi-account-check-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Vacant"
          :value="vacantLocationCount"
          icon="mdi-account-question-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Inactive"
          :value="inactiveLocationCount"
          icon="mdi-archive-outline"
        />

      </v-col>

    </v-row>


    <!-- ============================================================
         TABS
         ============================================================ -->

    <v-card
      rounded="xl"
      elevation="0"
      border
    >

      <v-tabs
        v-model="tab"
        color="primary"
        grow
      >

        <v-tab value="list">

          <v-icon start>
            mdi-map-marker-outline
          </v-icon>

          Location

        </v-tab>


        <v-tab value="register">

          <v-icon start>
            mdi-plus-box-outline
          </v-icon>

          Register Location

        </v-tab>


        <v-tab value="history">

          <v-icon start>
            mdi-history
          </v-icon>

          Location History

        </v-tab>


        <v-tab value="inactive">

          <v-icon start>
            mdi-archive-outline
          </v-icon>

          Inactive

        </v-tab>

      </v-tabs>

    </v-card>


    <!-- ============================================================
         TAB CONTENT
         ============================================================ -->

    <v-window
      v-model="tab"
      class="mt-6"
    >


      <!-- ==========================================================
           LOCATION
           ========================================================== -->

      <v-window-item value="list">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <!-- HEADER -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Location List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage organization locations
              </p>

            </div>


            <!-- FILTER -->

            <v-menu
              v-model="filterMenu"
              :close-on-content-click="false"
              location="bottom end"
            >

              <template #activator="{ props }">

                <v-btn
                  v-bind="props"
                  variant="outlined"
                  rounded="lg"
                  prepend-icon="mdi-filter-outline"
                >
                  Filter
                </v-btn>

              </template>


              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Locations
                </v-card-title>

                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="locationTypeFilter"
                    label="Location Type"
                    :items="locationTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-office-building-marker-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="cityFilter"
                    label="City"
                    :items="cityOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-city-variant-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="stateFilter"
                    label="State"
                    :items="stateOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-map-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="statusFilter"
                    label="Status"
                    :items="statusOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-list-status"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="filterMenu = false"
                  >
                    Apply
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-menu>

          </div>

          <v-divider />


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="search"
              label="Search Location"
              placeholder="Search location code, name or address"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>

          <v-divider />


          <!-- TABLE -->

          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Location ID</th>

                  <th>Location</th>

                  <th>Type</th>

                  <th>Address</th>

                  <th>City</th>

                  <th>State</th>

                  <th>Employee</th>

                  <th>Effective Date</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="location in paginatedLocations"
                  :key="location.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ location.id }}
                    </span>

                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ location.name }}
                    </span>

                  </td>


                  <td>
                    {{ location.type }}
                  </td>


                  <td>
                    {{ location.address }}
                  </td>


                  <td>
                    {{ location.city }}
                  </td>


                  <td>
                    {{ location.state }}
                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ location.employeeCount }}
                    </span>

                  </td>


                  <td>
                    {{ location.effectiveDate }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="location.status"
                      :color="getStatusColor(location.status)"
                    />

                  </td>


                  <td class="text-center">

                    <v-tooltip text="View">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-eye-outline"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="viewLocation(location)"
                        />

                      </template>

                    </v-tooltip>


                    <v-tooltip
                      :text="
                        location.status === 'Active'
                          ? 'Deactivate'
                          : 'Activate'
                      "
                    >

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          :icon="
                            location.status === 'Active'
                              ? 'mdi-archive-outline'
                              : 'mdi-archive-arrow-up-outline'
                          "
                          variant="text"
                          size="small"
                          :color="
                            location.status === 'Active'
                              ? 'error'
                              : 'success'
                          "
                          @click="
                            location.status === 'Active'
                              ? deactivateLocation(location)
                              : activateLocation(location)
                          "
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr
                  v-if="paginatedLocations.length === 0"
                >

                  <td
                    colspan="10"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-map-marker-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No locations found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Try changing your search or filter.
                    </div>

                  </td>

                </tr>

              </tbody>

            </v-table>

          </div>


          <!-- PAGINATION -->

          <v-divider />

          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="itemsPerPage"
                :items="itemsPerPageOptions"
                variant="outlined"
                density="compact"
                hide-details
                rounded="lg"
                style="width: 90px"
              />

            </div>


            <div class="text-body-2 text-medium-emphasis">

              Showing

              <span class="font-weight-medium">
                {{ displayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ displayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredLocations.length }}
              </span>

            </div>


            <v-pagination
              v-model="page"
              :length="totalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           REGISTER LOCATION
           ========================================================== -->

      <v-window-item value="register">

        <v-row>

          <v-col
            cols="12"
            md="8"
          >

            <v-card
              rounded="xl"
              elevation="0"
              border
            >

              <v-card-title class="pa-5">

                <div>

                  <div class="text-h6 font-weight-bold">
                    Register Location
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter location information to create a new location
                  </div>

                </div>

              </v-card-title>


              <v-divider />


              <v-card-text class="pa-5">

                <v-row>

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="locationIdInput"
                      label="Location ID"
                      placeholder="e.g. LOC-001"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-identifier"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="locationNameInput"
                      label="Location"
                      placeholder="e.g. Melaka Headquarters"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-map-marker-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="selectedLocationType"
                      label="Location Type"
                      :items="locationTypeOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-office-building-marker-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model.number="employeeCountInput"
                      label="Employee Count"
                      type="number"
                      min="0"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-group-outline"
                    />

                  </v-col>


                  <v-col cols="12">

                    <v-text-field
                      v-model="addressInput"
                      label="Address"
                      placeholder="e.g. Jalan Example"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-map-marker-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="cityInput"
                      label="City"
                      placeholder="e.g. Melaka"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-city-variant-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="stateInput"
                      label="State"
                      placeholder="e.g. Melaka"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-map-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model="countryInput"
                      label="Country"
                      placeholder="e.g. Malaysia"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-earth"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="effectiveDateInput"
                      label="Effective Date"
                      type="date"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-outline"
                    />

                  </v-col>

                </v-row>

              </v-card-text>


              <v-divider />


              <v-card-actions class="pa-5">

                <v-btn
                  variant="text"
                  @click="clearRegistrationForm"
                >
                  Clear
                </v-btn>

                <v-spacer />

                <v-btn
                  color="primary"
                  rounded="lg"
                  :disabled="!canRegisterLocation"
                  @click="registerLocation"
                >
                  Register Location
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>


          <!-- PREVIEW -->

          <v-col
            cols="12"
            md="4"
          >

            <v-card
              rounded="xl"
              elevation="0"
              border
              height="100%"
            >

              <v-card-title class="pa-5">

                <div class="text-h6 font-weight-bold">
                  Preview
                </div>

              </v-card-title>


              <v-divider />


              <v-card-text class="pa-5">

                <div class="d-flex flex-column ga-4">

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Location ID
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ locationIdInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Location
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ locationNameInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Location Type
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedLocationType || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Address
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ addressInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      City
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ cityInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      State
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ stateInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Country
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ countryInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Employee Count
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ employeeCountInput }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Effective Date
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ effectiveDateInput || "-" }}
                    </div>

                  </div>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>


      <!-- ==========================================================
           LOCATION HISTORY - TIMELINE
           ========================================================== -->

      <v-window-item value="history">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <!-- HEADER -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Location History
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Track changes and activities for organization locations
              </p>

            </div>


            <!-- FILTER -->

            <v-menu
              v-model="historyFilterMenu"
              :close-on-content-click="false"
              location="bottom end"
            >

              <template #activator="{ props }">

                <v-btn
                  v-bind="props"
                  variant="outlined"
                  rounded="lg"
                  prepend-icon="mdi-filter-outline"
                >
                  Filter
                </v-btn>

              </template>


              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter History
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="historyActionFilter"
                    label="Action"
                    :items="historyActionOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-history"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearHistoryFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="historyFilterMenu = false"
                  >
                    Apply
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-menu>

          </div>


          <v-divider />


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="historySearch"
              label="Search Location History"
              placeholder="Search location, ID or action"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <!-- TIMELINE -->

          <div class="pa-5">

            <v-timeline
              side="end"
              align="start"
              density="comfortable"
            >

              <v-timeline-item
                v-for="history in paginatedHistory"
                :key="history.id"
                :dot-color="getHistoryColor(history.action)"
                size="small"
              >

                <template #icon>

                  <v-icon
                    size="16"
                    color="white"
                  >
                    {{ getHistoryIcon(history.action) }}
                  </v-icon>

                </template>


                <!-- HISTORY CARD -->

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="history-card"
                >

                  <div class="pa-5">

                    <!-- TOP -->

                    <div
                      class="d-flex flex-wrap align-start justify-space-between"
                    >

                      <div>

                        <div class="d-flex align-center ga-2">

                          <span class="text-subtitle-1 font-weight-bold">
                            {{ history.location }}
                          </span>

                          <AppStatusChip
                            :status="history.status"
                            :color="getStatusColor(history.status)"
                          />

                        </div>


                        <div
                          class="text-body-2 text-medium-emphasis mt-1"
                        >
                          {{ history.type }}
                        </div>

                      </div>


                      <div class="text-right">

                        <div class="text-body-2 font-weight-medium">
                          {{ history.effectiveDate }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                          {{ history.id }}
                        </div>

                      </div>

                    </div>


                    <v-divider class="my-4" />


                    <!-- ACTION -->

                    <div class="d-flex align-start">

                      <v-avatar
                        size="40"
                        :color="getHistoryColor(history.action)"
                        variant="tonal"
                        class="mr-3"
                      >

                        <v-icon>
                          {{ getHistoryIcon(history.action) }}
                        </v-icon>

                      </v-avatar>


                      <div>

                        <div class="text-body-1 font-weight-bold">
                          {{ history.action }}
                        </div>

                        <div
                          class="text-body-2 text-medium-emphasis mt-1"
                        >
                          {{ getHistoryDescription(history.action) }}
                        </div>

                      </div>

                    </div>


                    <v-divider class="my-4" />


                    <!-- BOTTOM -->

                    <div
                      class="d-flex flex-wrap align-center justify-space-between ga-3"
                    >

                      <div class="d-flex align-center">

                        <v-avatar
                          size="32"
                          color="grey"
                          variant="tonal"
                          class="mr-2"
                        >

                          <v-icon size="18">
                            mdi-account-outline
                          </v-icon>

                        </v-avatar>


                        <div>

                          <div class="text-caption text-medium-emphasis">
                            Changed By
                          </div>

                          <div class="text-body-2 font-weight-medium">
                            {{ history.changedBy }}
                          </div>

                        </div>

                      </div>


                      <v-btn
                        variant="text"
                        color="primary"
                        rounded="lg"
                        prepend-icon="mdi-eye-outline"
                        @click="viewHistory(history)"
                      >
                        View Details
                      </v-btn>

                    </div>

                  </div>

                </v-card>

              </v-timeline-item>


              <!-- EMPTY -->

              <v-timeline-item
                v-if="paginatedHistory.length === 0"
                dot-color="grey"
                size="small"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="history-card"
                >

                  <div class="text-center py-8">

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-history
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No history found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Location activities will appear here.
                    </div>

                  </div>

                </v-card>

              </v-timeline-item>

            </v-timeline>

          </div>


          <v-divider />


          <!-- PAGINATION -->

          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="historyItemsPerPage"
                :items="itemsPerPageOptions"
                variant="outlined"
                density="compact"
                hide-details
                rounded="lg"
                style="width: 90px"
              />

            </div>


            <div class="text-body-2 text-medium-emphasis">

              Showing

              <span class="font-weight-medium">
                {{ historyDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ historyDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredHistory.length }}
              </span>

            </div>


            <v-pagination
              v-model="historyPage"
              :length="historyTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           INACTIVE LOCATIONS
           ========================================================== -->

      <v-window-item value="inactive">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <!-- HEADER -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Inactive Locations
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage inactive organization locations
              </p>

            </div>


            <!-- FILTER -->

            <v-menu
              v-model="inactiveFilterMenu"
              :close-on-content-click="false"
              location="bottom end"
            >

              <template #activator="{ props }">

                <v-btn
                  v-bind="props"
                  variant="outlined"
                  rounded="lg"
                  prepend-icon="mdi-filter-outline"
                >
                  Filter
                </v-btn>

              </template>


              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Inactive Locations
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="inactiveTypeFilter"
                    label="Location Type"
                    :items="locationTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-office-building-marker-outline"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearInactiveFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="inactiveFilterMenu = false"
                  >
                    Apply
                  </v-btn>

                </v-card-actions>

              </v-card>

            </v-menu>

          </div>


          <v-divider />


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="inactiveSearch"
              label="Search Location"
              placeholder="Search location, address or city"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <!-- LOCATION CARDS -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="location in paginatedInactiveLocations"
                :key="location.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="location-card h-100"
                >

                  <!-- CARD HEADER -->

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="grey"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-map-marker-off-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ location.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ location.id }}
                      </div>

                    </div>


                    <AppStatusChip
                      :status="location.status"
                      :color="getStatusColor(location.status)"
                    />

                  </div>


                  <v-divider />


                  <!-- CARD CONTENT -->

                  <v-card-text class="pa-5">

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-office-building-marker-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Location Type
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ location.type }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-map-marker-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Address
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ location.address }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-city-variant-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Location
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ location.city }}, {{ location.state }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                          {{ location.country }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-group-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Employee
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ location.employeeCount }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-remove-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Inactive Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ location.inactiveDate || "-" }}
                        </div>

                      </div>

                    </div>

                  </v-card-text>


                  <v-divider />


                  <!-- ACTIONS -->

                  <v-card-actions class="pa-4">

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-eye-outline"
                      color="primary"
                      @click="viewLocation(location)"
                    >
                      View
                    </v-btn>

                    <v-spacer />

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-archive-arrow-up-outline"
                      color="success"
                      @click="activateLocation(location)"
                    >
                      Activate
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <!-- EMPTY -->

              <v-col
                v-if="paginatedInactiveLocations.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-map-marker-off-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No inactive locations found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Inactive locations will appear here.
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <v-divider />


          <!-- PAGINATION -->

          <div class="pagination-wrapper">

            <div class="d-flex align-center ga-2">

              <span class="text-body-2 text-medium-emphasis">
                Rows per page
              </span>

              <v-select
                v-model="inactiveItemsPerPage"
                :items="itemsPerPageOptions"
                variant="outlined"
                density="compact"
                hide-details
                rounded="lg"
                style="width: 90px"
              />

            </div>


            <div class="text-body-2 text-medium-emphasis">

              Showing

              <span class="font-weight-medium">
                {{ inactiveDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ inactiveDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredInactiveLocations.length }}
              </span>

            </div>


            <v-pagination
              v-model="inactivePage"
              :length="inactiveTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>

    </v-window>


    <!-- ============================================================
         LOCATION DETAILS
         ============================================================ -->

    <v-dialog
      v-model="locationDetailsDialog"
      max-width="700"
    >

      <v-card
        v-if="selectedLocation"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Location Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Location information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeLocationDetails"
          />

        </v-card-title>


        <v-divider />


        <v-card-text class="pa-5">

          <div class="d-flex align-center mb-5">

            <v-avatar
              size="56"
              color="primary"
              variant="tonal"
              class="mr-4"
            >

              <v-icon size="28">
                mdi-map-marker-outline
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedLocation.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedLocation.id }}
              </div>

            </div>


            <v-spacer />


            <AppStatusChip
              :status="selectedLocation.status"
              :color="getStatusColor(selectedLocation.status)"
            />

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Location ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.id }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Location
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.name }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Location Type
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.type }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Employee Count
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.employeeCount }}
              </div>

            </v-col>


            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Address
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.address }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="4"
            >

              <div class="text-caption text-medium-emphasis">
                City
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.city }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="4"
            >

              <div class="text-caption text-medium-emphasis">
                State
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.state }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="4"
            >

              <div class="text-caption text-medium-emphasis">
                Country
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.country }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Effective Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.effectiveDate }}
              </div>

            </v-col>


            <v-col
              v-if="selectedLocation.inactiveDate"
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Inactive Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedLocation.inactiveDate }}
              </div>

            </v-col>

          </v-row>

        </v-card-text>


        <v-divider />


        <v-card-actions class="pa-4">

          <v-btn
            v-if="selectedLocation.status === 'Active'"
            color="error"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-outline"
            @click="deactivateLocation(selectedLocation)"
          >
            Deactivate
          </v-btn>


          <v-btn
            v-else
            color="success"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-arrow-up-outline"
            @click="activateLocation(selectedLocation)"
          >
            Activate
          </v-btn>


          <v-spacer />


          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeLocationDetails"
          >
            Close
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>


    <!-- ============================================================
         HISTORY DETAILS
         ============================================================ -->

    <v-dialog
      v-model="historyDetailsDialog"
      max-width="550"
    >

      <v-card
        v-if="selectedHistory"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              History Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Location activity details
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeHistoryDetails"
          />

        </v-card-title>


        <v-divider />


        <v-card-text class="pa-5">

          <div
            class="d-flex align-center mb-5"
          >

            <v-avatar
              size="52"
              :color="getHistoryColor(selectedHistory.action)"
              variant="tonal"
              class="mr-4"
            >

              <v-icon size="26">
                {{ getHistoryIcon(selectedHistory.action) }}
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedHistory.action }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedHistory.location }}
              </div>

            </div>

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                History ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.id }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Location
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.location }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Location Type
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.type }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Action
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.action }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Effective Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.effectiveDate }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Changed By
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.changedBy }}
              </div>

            </v-col>


            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Status
              </div>

              <div class="mt-1">

                <AppStatusChip
                  :status="selectedHistory.status"
                  :color="getStatusColor(selectedHistory.status)"
                />

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
            @click="closeHistoryDetails"
          >
            Close
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

  </v-container>

</template>


<script setup lang="ts">

import {
  computed,
  ref,
  watch,
} from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"

import AppStatusChip from "@/components/common/AppStatusChip.vue"


/* */

type LocationStatus =
  | "Active"
  | "Inactive"


type LocationAction =
  | "Created"
  | "Updated"
  | "Activated"
  | "Deactivated"


interface LocationItem {

  id: string

  name: string

  type: string

  address: string

  city: string

  state: string

  country: string

  employeeCount: number

  vacant: number

  status: LocationStatus

  effectiveDate: string

  inactiveDate?: string

}


interface LocationHistory {

  id: string

  location: string

  type: string

  action: LocationAction

  effectiveDate: string

  changedBy: string

  status: LocationStatus

}


/* */

const tab =
  ref("list")


/* */

const locations =
  ref<LocationItem[]>([

    {
      id: "LOC-001",
      name: "Head Office",
      type: "Head Office",
      address: "Jalan Bukit Baru",
      city: "Melaka",
      state: "Melaka",
      country: "Malaysia",
      employeeCount: 85,
      vacant: 5,
      status: "Active",
      effectiveDate: "2026-01-01",
    },

    {
      id: "LOC-002",
      name: "Manufacturing Plant",
      type: "Manufacturing",
      address: "Jalan Taman Merdeka",
      city: "Melaka",
      state: "Melaka",
      country: "Malaysia",
      employeeCount: 120,
      vacant: 10,
      status: "Active",
      effectiveDate: "2026-01-01",
    },

    {
      id: "LOC-003",
      name: "Warehouse",
      type: "Warehouse",
      address: "Kawasan Perindustrian",
      city: "Batu Berendam",
      state: "Melaka",
      country: "Malaysia",
      employeeCount: 35,
      vacant: 3,
      status: "Active",
      effectiveDate: "2026-02-01",
    },

    {
      id: "LOC-004",
      name: "Kuala Lumpur Office",
      type: "Branch Office",
      address: "Jalan Tun Razak",
      city: "Kuala Lumpur",
      state: "Kuala Lumpur",
      country: "Malaysia",
      employeeCount: 28,
      vacant: 2,
      status: "Active",
      effectiveDate: "2026-02-01",
    },

    {
      id: "LOC-005",
      name: "Penang Branch",
      type: "Branch Office",
      address: "Jalan Bayan Lepas",
      city: "Bayan Lepas",
      state: "Penang",
      country: "Malaysia",
      employeeCount: 18,
      vacant: 2,
      status: "Active",
      effectiveDate: "2026-03-01",
    },

    {
      id: "LOC-006",
      name: "Johor Branch",
      type: "Branch Office",
      address: "Jalan Tebrau",
      city: "Johor Bahru",
      state: "Johor",
      country: "Malaysia",
      employeeCount: 15,
      vacant: 1,
      status: "Active",
      effectiveDate: "2026-03-01",
    },

    {
      id: "LOC-007",
      name: "Old Office",
      type: "Branch Office",
      address: "Jalan Lama",
      city: "Melaka",
      state: "Melaka",
      country: "Malaysia",
      employeeCount: 0,
      vacant: 0,
      status: "Inactive",
      effectiveDate: "2024-01-01",
      inactiveDate: "2026-05-31",
    },

  ])


/* */

const locationHistory =
  ref<LocationHistory[]>([

    {
      id: "LH-001",
      location: "Head Office",
      type: "Head Office",
      action: "Created",
      effectiveDate: "2026-01-01",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LH-002",
      location: "Manufacturing Plant",
      type: "Manufacturing",
      action: "Created",
      effectiveDate: "2026-01-01",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LH-003",
      location: "Warehouse",
      type: "Warehouse",
      action: "Created",
      effectiveDate: "2026-02-01",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LH-004",
      location: "Kuala Lumpur Office",
      type: "Branch Office",
      action: "Created",
      effectiveDate: "2026-02-01",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LH-005",
      location: "Penang Branch",
      type: "Branch Office",
      action: "Created",
      effectiveDate: "2026-03-01",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LH-006",
      location: "Johor Branch",
      type: "Branch Office",
      action: "Created",
      effectiveDate: "2026-03-01",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LH-007",
      location: "Old Office",
      type: "Branch Office",
      action: "Deactivated",
      effectiveDate: "2026-05-31",
      changedBy: "Admin",
      status: "Inactive",
    },

  ])


/* */

const filterMenu =
  ref(false)

const search =
  ref("")

const locationTypeFilter =
  ref<string | null>(null)

const cityFilter =
  ref<string | null>(null)

const stateFilter =
  ref<string | null>(null)

const statusFilter =
  ref<string | null>("Active")


const locationTypeOptions =
  computed(() => {

    return [
      ...new Set(
        locations.value.map(
          location => location.type
        )
      ),
    ]

  })


const cityOptions =
  computed(() => {

    return [
      ...new Set(
        locations.value.map(
          location => location.city
        )
      ),
    ]

  })


const stateOptions =
  computed(() => {

    return [
      ...new Set(
        locations.value.map(
          location => location.state
        )
      ),
    ]

  })


const statusOptions = [
  "Active",
  "Inactive",
]


/* */

const filteredLocations =
  computed(() => {

    const keyword =
      search.value
        .trim()
        .toLowerCase()


    return locations.value.filter(
      location => {

        const searchMatch =
          !keyword ||
          location.id
            .toLowerCase()
            .includes(keyword) ||
          location.name
            .toLowerCase()
            .includes(keyword) ||
          location.address
            .toLowerCase()
            .includes(keyword) ||
          location.city
            .toLowerCase()
            .includes(keyword) ||
          location.state
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !locationTypeFilter.value ||
          location.type ===
            locationTypeFilter.value


        const cityMatch =
          !cityFilter.value ||
          location.city ===
            cityFilter.value


        const stateMatch =
          !stateFilter.value ||
          location.state ===
            stateFilter.value


        const statusMatch =
          !statusFilter.value ||
          location.status ===
            statusFilter.value


        return (
          searchMatch &&
          typeMatch &&
          cityMatch &&
          stateMatch &&
          statusMatch
        )

      }
    )

  })


/* */

const page =
  ref(1)

const itemsPerPage =
  ref(5)

const itemsPerPageOptions = [
  5,
  10,
  20,
  50,
]


const totalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredLocations.value.length /
          itemsPerPage.value
      )
    )

  })


const paginatedLocations =
  computed(() => {

    const start =
      (page.value - 1) *
      itemsPerPage.value

    const end =
      start +
      itemsPerPage.value

    return filteredLocations.value.slice(
      start,
      end
    )

  })


const displayedStart =
  computed(() => {

    if (
      filteredLocations.value.length === 0
    ) {

      return 0

    }

    return (
      (page.value - 1) *
      itemsPerPage.value
    ) + 1

  })


const displayedEnd =
  computed(() => {

    return Math.min(
      page.value *
        itemsPerPage.value,
      filteredLocations.value.length
    )

  })


watch(
  [
    search,
    locationTypeFilter,
    cityFilter,
    stateFilter,
    statusFilter,
    itemsPerPage,
  ],
  () => {

    page.value = 1

  }
)


watch(
  totalPages,
  total => {

    if (page.value > total) {

      page.value = total

    }

  }
)


function clearFilters() {

  search.value = ""

  locationTypeFilter.value = null

  cityFilter.value = null

  stateFilter.value = null

  statusFilter.value = "Active"

  page.value = 1

}


/* */

const activeLocationCount =
  computed(() => {

    return locations.value.filter(
      location =>
        location.status === "Active"
    ).length

  })


const inactiveLocationCount =
  computed(() => {

    return locations.value.filter(
      location =>
        location.status === "Inactive"
    ).length

  })


const assignedEmployeeCount =
  computed(() => {

    return locations.value
      .filter(
        location =>
          location.status === "Active"
      )
      .reduce(
        (total, location) =>
          total +
          location.employeeCount,
        0
      )

  })


const vacantLocationCount =
  computed(() => {

    return locations.value
      .filter(
        location =>
          location.status === "Active"
      )
      .reduce(
        (total, location) =>
          total +
          location.vacant,
        0
      )

  })


/* */

const locationIdInput =
  ref("")

const locationNameInput =
  ref("")

const selectedLocationType =
  ref<string | null>(null)

const addressInput =
  ref("")

const cityInput =
  ref("")

const stateInput =
  ref("")

const countryInput =
  ref("Malaysia")

const employeeCountInput =
  ref(0)

const effectiveDateInput =
  ref("")


const canRegisterLocation =
  computed(() => {

    return (
      locationIdInput.value.trim() !== "" &&
      locationNameInput.value.trim() !== "" &&
      selectedLocationType.value !== null &&
      addressInput.value.trim() !== "" &&
      cityInput.value.trim() !== "" &&
      stateInput.value.trim() !== "" &&
      countryInput.value.trim() !== "" &&
      effectiveDateInput.value.trim() !== ""
    )

  })


function registerLocation() {

  if (
    !canRegisterLocation.value
  ) {

    return

  }


  const newLocation: LocationItem = {

    id:
      locationIdInput.value.trim(),

    name:
      locationNameInput.value.trim(),

    type:
      selectedLocationType.value as string,

    address:
      addressInput.value.trim(),

    city:
      cityInput.value.trim(),

    state:
      stateInput.value.trim(),

    country:
      countryInput.value.trim(),

    employeeCount:
      employeeCountInput.value || 0,

    vacant:
      0,

    status:
      "Active",

    effectiveDate:
      effectiveDateInput.value,

  }


  locations.value.push(
    newLocation
  )


  locationHistory.value.unshift({

    id:
      `LH-${String(
        locationHistory.value.length + 1
      ).padStart(3, "0")}`,

    location:
      newLocation.name,

    type:
      newLocation.type,

    action:
      "Created",

    effectiveDate:
      newLocation.effectiveDate,

    changedBy:
      "Admin",

    status:
      "Active",

  })


  clearRegistrationForm()

  tab.value = "list"

}


function clearRegistrationForm() {

  locationIdInput.value = ""

  locationNameInput.value = ""

  selectedLocationType.value = null

  addressInput.value = ""

  cityInput.value = ""

  stateInput.value = ""

  countryInput.value = "Malaysia"

  employeeCountInput.value = 0

  effectiveDateInput.value = ""

}


/* */

const locationDetailsDialog =
  ref(false)

const selectedLocation =
  ref<LocationItem | null>(null)


function viewLocation(
  location: LocationItem
) {

  selectedLocation.value =
    location

  locationDetailsDialog.value =
    true

}


function closeLocationDetails() {

  locationDetailsDialog.value =
    false

  selectedLocation.value =
    null

}


/* */

function deactivateLocation(
  location: LocationItem
) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0]


  location.status =
    "Inactive"

  location.inactiveDate =
    today


  locationHistory.value.unshift({

    id:
      `LH-${String(
        locationHistory.value.length + 1
      ).padStart(3, "0")}`,

    location:
      location.name,

    type:
      location.type,

    action:
      "Deactivated",

    effectiveDate:
      today,

    changedBy:
      "Admin",

    status:
      "Inactive",

  })


  closeLocationDetails()

}


/* */

function activateLocation(
  location: LocationItem
) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0]


  location.status =
    "Active"

  location.inactiveDate =
    undefined


  locationHistory.value.unshift({

    id:
      `LH-${String(
        locationHistory.value.length + 1
      ).padStart(3, "0")}`,

    location:
      location.name,

    type:
      location.type,

    action:
      "Activated",

    effectiveDate:
      today,

    changedBy:
      "Admin",

    status:
      "Active",

  })


  closeLocationDetails()

}


/* */

const historyFilterMenu =
  ref(false)

const historySearch =
  ref("")

const historyActionFilter =
  ref<LocationAction | null>(null)


const historyActionOptions = [
  "Created",
  "Updated",
  "Activated",
  "Deactivated",
]


const filteredHistory =
  computed(() => {

    const keyword =
      historySearch.value
        .trim()
        .toLowerCase()


    return locationHistory.value.filter(
      history => {

        const searchMatch =
          !keyword ||
          history.id
            .toLowerCase()
            .includes(keyword) ||
          history.location
            .toLowerCase()
            .includes(keyword) ||
          history.type
            .toLowerCase()
            .includes(keyword) ||
          history.action
            .toLowerCase()
            .includes(keyword)


        const actionMatch =
          !historyActionFilter.value ||
          history.action ===
            historyActionFilter.value


        return (
          searchMatch &&
          actionMatch
        )

      }
    )

  })


/* */

const historyPage =
  ref(1)

const historyItemsPerPage =
  ref(5)


const historyTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredHistory.value.length /
          historyItemsPerPage.value
      )
    )

  })


const paginatedHistory =
  computed(() => {

    const start =
      (historyPage.value - 1) *
      historyItemsPerPage.value

    const end =
      start +
      historyItemsPerPage.value

    return filteredHistory.value.slice(
      start,
      end
    )

  })


const historyDisplayedStart =
  computed(() => {

    if (
      filteredHistory.value.length === 0
    ) {

      return 0

    }

    return (
      (historyPage.value - 1) *
      historyItemsPerPage.value
    ) + 1

  })


const historyDisplayedEnd =
  computed(() => {

    return Math.min(
      historyPage.value *
        historyItemsPerPage.value,
      filteredHistory.value.length
    )

  })


watch(
  [
    historySearch,
    historyActionFilter,
    historyItemsPerPage,
  ],
  () => {

    historyPage.value = 1

  }
)


watch(
  historyTotalPages,
  total => {

    if (
      historyPage.value > total
    ) {

      historyPage.value =
        total

    }

  }
)


function clearHistoryFilters() {

  historySearch.value = ""

  historyActionFilter.value =
    null

  historyPage.value = 1

}


/* */

const historyDetailsDialog =
  ref(false)

const selectedHistory =
  ref<LocationHistory | null>(null)


function viewHistory(
  history: LocationHistory
) {

  selectedHistory.value =
    history

  historyDetailsDialog.value =
    true

}


function closeHistoryDetails() {

  historyDetailsDialog.value =
    false

  selectedHistory.value =
    null

}


/* */

function getHistoryIcon(
  action: LocationAction
) {

  switch (action) {

    case "Created":

      return "mdi-plus-circle-outline"

    case "Updated":

      return "mdi-pencil-outline"

    case "Activated":

      return "mdi-archive-arrow-up-outline"

    case "Deactivated":

      return "mdi-archive-outline"

    default:

      return "mdi-history"

  }

}


/* */

function getHistoryColor(
  action: LocationAction
) {

  switch (action) {

    case "Created":

      return "primary"

    case "Updated":

      return "info"

    case "Activated":

      return "success"

    case "Deactivated":

      return "error"

    default:

      return "grey"

  }

}


/* */

function getHistoryDescription(
  action: LocationAction
) {

  switch (action) {

    case "Created":

      return "Location was registered."

    case "Updated":

      return "Location information was updated."

    case "Activated":

      return "Location was activated."

    case "Deactivated":

      return "Location was deactivated."

    default:

      return "Location history activity."

  }

}


/* */

const inactiveFilterMenu =
  ref(false)

const inactiveSearch =
  ref("")

const inactiveTypeFilter =
  ref<string | null>(null)


const filteredInactiveLocations =
  computed(() => {

    const keyword =
      inactiveSearch.value
        .trim()
        .toLowerCase()


    return locations.value.filter(
      location => {

        if (
          location.status !== "Inactive"
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          location.id
            .toLowerCase()
            .includes(keyword) ||
          location.name
            .toLowerCase()
            .includes(keyword) ||
          location.address
            .toLowerCase()
            .includes(keyword) ||
          location.city
            .toLowerCase()
            .includes(keyword) ||
          location.state
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !inactiveTypeFilter.value ||
          location.type ===
            inactiveTypeFilter.value


        return (
          searchMatch &&
          typeMatch
        )

      }
    )

  })


const inactivePage =
  ref(1)

const inactiveItemsPerPage =
  ref(5)


const inactiveTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredInactiveLocations.value.length /
          inactiveItemsPerPage.value
      )
    )

  })


const paginatedInactiveLocations =
  computed(() => {

    const start =
      (inactivePage.value - 1) *
      inactiveItemsPerPage.value

    const end =
      start +
      inactiveItemsPerPage.value

    return filteredInactiveLocations.value.slice(
      start,
      end
    )

  })


const inactiveDisplayedStart =
  computed(() => {

    if (
      filteredInactiveLocations.value.length === 0
    ) {

      return 0

    }

    return (
      (inactivePage.value - 1) *
      inactiveItemsPerPage.value
    ) + 1

  })


const inactiveDisplayedEnd =
  computed(() => {

    return Math.min(
      inactivePage.value *
        inactiveItemsPerPage.value,
      filteredInactiveLocations.value.length
    )

  })


watch(
  [
    inactiveSearch,
    inactiveTypeFilter,
    inactiveItemsPerPage,
  ],
  () => {

    inactivePage.value = 1

  }
)


watch(
  inactiveTotalPages,
  total => {

    if (
      inactivePage.value > total
    ) {

      inactivePage.value =
        total

    }

  }
)


function clearInactiveFilters() {

  inactiveSearch.value = ""

  inactiveTypeFilter.value =
    null

  inactivePage.value = 1

}


/* */

function getStatusColor(
  status: string
) {

  switch (status) {

    case "Active":

      return "success"

    case "Inactive":

      return "grey"

    default:

      return "grey"

  }

}

</script>


<style scoped>

.table-wrapper {

  width: 100%;

  overflow-x: auto;

}


.table-wrapper :deep(table) {

  min-width: 1350px;

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


/* */

.pagination-wrapper {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 16px;

  padding: 16px 20px;

  flex-wrap: wrap;

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


/* */

.location-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.location-card:hover {

  transform: translateY(-2px);

  border-color: #bdbdbd !important;

  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;

}


/* */

.history-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.history-card:hover {

  transform: translateY(-2px);

  border-color: #bdbdbd !important;

  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;

}


/* */

@media (max-width: 700px) {

  .history-card {

    width: 100%;

  }

}

</style>