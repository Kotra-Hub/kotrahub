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
        mdi-package-variant-closed
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Inventory
      </span>

      <v-icon
        size="18"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Consumables
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
          Consumable
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage consumable inventory and stock records
        </p>

      </div>


      <v-btn
        color="primary"
        prepend-icon="mdi-plus-box-outline"
        rounded="lg"
        @click="tab = 'register'"
      >
        Register Consumable
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
          title="Active Consumables"
          :value="activeConsumableCount"
          icon="mdi-check-circle-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="In Stock"
          :value="inStockConsumableCount"
          icon="mdi-package-check"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Low Stock"
          :value="lowStockConsumableCount"
          icon="mdi-alert-circle-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Inactive"
          :value="inactiveConsumableCount"
          icon="mdi-package-variant-remove"
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
            mdi-package-variant-closed
          </v-icon>

          Consumables

        </v-tab>


        <v-tab value="register">

          <v-icon start>
            mdi-plus-box-outline
          </v-icon>

          Register Consumable

        </v-tab>


        <v-tab value="history">

          <v-icon start>
            mdi-history
          </v-icon>

          Consumable History

        </v-tab>


        <v-tab value="inactive">

          <v-icon start>
            mdi-package-variant-remove
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
           LIST
           ========================================================== -->

      <v-window-item value="list">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Consumable List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage consumable inventory records
              </p>

            </div>


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

                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Filter Consumables
                </v-card-title>

                <v-divider />

                <v-card-text>

                  <v-select
                    v-model="categoryFilter"
                    label="Category"
                    :items="categoryOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
                    class="mb-3"
                  />

                  <v-select
                    v-model="unitFilter"
                    label="Unit"
                    :items="unitOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-ruler-square"
                    class="mb-3"
                  />

                  <v-select
                    v-model="locationFilter"
                    label="Location"
                    :items="locationOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-map-marker-outline"
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


          <div class="pa-5">

            <v-text-field
              v-model="search"
              label="Search Consumable"
              placeholder="Search consumable ID, name, supplier or location"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>

          <v-divider />


          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Consumable ID</th>
                  <th>Consumable</th>
                  <th>Category</th>
                  <th>Unit</th>
                  <th>Stock</th>
                  <th>Reorder Level</th>
                  <th>Location</th>
                  <th>Supplier</th>
                  <th>Effective Date</th>
                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="consumable in paginatedConsumables"
                  :key="consumable.id"
                >

                  <td>
                    <span class="font-weight-medium">
                      {{ consumable.id }}
                    </span>
                  </td>

                  <td>
                    <span class="font-weight-medium">
                      {{ consumable.name }}
                    </span>
                  </td>

                  <td>
                    {{ consumable.category }}
                  </td>

                  <td>
                    {{ consumable.unit }}
                  </td>

                  <td>

                    <v-chip
                      size="small"
                      variant="tonal"
                      :color="getStockColor(consumable)"
                    >

                      <v-icon
                        start
                        size="16"
                      >
                        mdi-package-variant-closed
                      </v-icon>

                      {{ consumable.stockQuantity }}

                    </v-chip>

                  </td>

                  <td>
                    {{ consumable.reorderLevel }}
                  </td>

                  <td>
                    {{ consumable.location }}
                  </td>

                  <td>
                    {{ consumable.supplier }}
                  </td>

                  <td>
                    {{ formatDate(consumable.effectiveDate) }}
                  </td>

                  <td>

                    <AppStatusChip
                      :status="consumable.status"
                      :color="getStatusColor(consumable.status)"
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
                          @click="viewConsumable(consumable)"
                        />

                      </template>

                    </v-tooltip>


                    <v-tooltip
                      :text="
                        consumable.status === 'Active'
                          ? 'Deactivate'
                          : 'Activate'
                      "
                    >

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          :icon="
                            consumable.status === 'Active'
                              ? 'mdi-archive-outline'
                              : 'mdi-archive-arrow-up-outline'
                          "
                          variant="text"
                          size="small"
                          :color="
                            consumable.status === 'Active'
                              ? 'error'
                              : 'success'
                          "
                          @click="
                            consumable.status === 'Active'
                              ? deactivateConsumable(consumable)
                              : activateConsumable(consumable)
                          "
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr v-if="paginatedConsumables.length === 0">

                  <td
                    colspan="11"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-package-variant-closed
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No consumables found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Try changing your search or filter.
                    </div>

                  </td>

                </tr>

              </tbody>

            </v-table>

          </div>


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
                {{ filteredConsumables.length }}
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
           REGISTER
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
                    Register Consumable
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter consumable information to create a new inventory record
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
                      v-model="consumableIdInput"
                      label="Consumable ID"
                      placeholder="e.g. CON-001"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-identifier"
                      :error="consumableIdExists"
                      :error-messages="
                        consumableIdExists
                          ? 'Consumable ID already exists.'
                          : ''
                      "
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="consumableNameInput"
                      label="Consumable"
                      placeholder="e.g. A4 Copy Paper"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-package-variant-closed"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="selectedCategory"
                      label="Category"
                      :items="categoryOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-shape-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="selectedUnit"
                      label="Unit"
                      :items="unitOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-ruler-square"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model.number="stockQuantityInput"
                      label="Stock Quantity"
                      type="number"
                      min="0"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-package-check"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model.number="reorderLevelInput"
                      label="Reorder Level"
                      type="number"
                      min="0"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-alert-circle-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="selectedLocation"
                      label="Location"
                      :items="locationOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-map-marker-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="supplierInput"
                      label="Supplier"
                      placeholder="e.g. ABC Supplies Sdn. Bhd."
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-truck-outline"
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


                  <v-col cols="12">

                    <v-textarea
                      v-model="descriptionInput"
                      label="Description"
                      placeholder="Enter consumable description"
                      variant="outlined"
                      rounded="lg"
                      rows="4"
                      prepend-inner-icon="mdi-text-box-outline"
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
                  variant="outlined"
                  rounded="lg"
                  @click="tab = 'list'"
                >
                  Cancel
                </v-btn>

                <v-btn
                  color="primary"
                  rounded="lg"
                  :disabled="!canRegisterConsumable"
                  @click="submitRegistration"
                >
                  Register Consumable
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>


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

                <div class="d-flex align-center">

                  <v-icon
                    size="22"
                    class="mr-2"
                  >
                    mdi-eye-outline
                  </v-icon>

                  <div class="text-h6 font-weight-bold">
                    Preview
                  </div>

                </div>

              </v-card-title>

              <v-divider />

              <v-card-text class="pa-5">

                <div class="d-flex flex-column ga-4">

                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Consumable ID
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ consumableIdInput || "-" }}
                    </div>
                  </div>


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Consumable
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ consumableNameInput || "-" }}
                    </div>
                  </div>


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Category
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedCategory || "-" }}
                    </div>
                  </div>


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Unit
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedUnit || "-" }}
                    </div>
                  </div>


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Stock Quantity
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ stockQuantityInput }}
                    </div>
                  </div>


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Reorder Level
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ reorderLevelInput }}
                    </div>
                  </div>


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Location
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedLocation || "-" }}
                    </div>
                  </div>


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Supplier
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ supplierInput || "-" }}
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


                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Description
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ descriptionInput || "-" }}
                    </div>
                  </div>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>


      <!-- ==========================================================
           HISTORY
           ========================================================== -->

      <v-window-item value="history">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Consumable History
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Track changes and stock activities for consumables
              </p>

            </div>


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

                <v-card-title class="text-subtitle-1 font-weight-bold">
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


          <div class="pa-5">

            <v-text-field
              v-model="historySearch"
              label="Search Consumable History"
              placeholder="Search consumable, ID or action"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>

          <v-divider />


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


                <v-card
                  rounded="xl"
                  elevation="0"
                  class="history-card"
                >

                  <div class="pa-5">

                    <div
                      class="d-flex flex-wrap align-start justify-space-between"
                    >

                      <div>

                        <div class="d-flex align-center ga-2">

                          <span class="text-subtitle-1 font-weight-bold">
                            {{ history.consumable }}
                          </span>

                          <AppStatusChip
                            :status="history.status"
                            :color="getStatusColor(history.status)"
                          />

                        </div>

                        <div class="text-body-2 text-medium-emphasis mt-1">
                          {{ history.category }}
                        </div>

                      </div>


                      <div class="text-right">

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(history.effectiveDate) }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                          {{ history.id }}
                        </div>

                      </div>

                    </div>


                    <v-divider class="my-4" />


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

                        <div class="text-body-2 text-medium-emphasis mt-1">
                          {{ getHistoryDescription(history.action) }}
                        </div>

                        <div
                          v-if="history.quantity !== undefined"
                          class="text-body-2 mt-2"
                        >
                          Quantity:
                          <span class="font-weight-medium">
                            {{ history.quantity }}
                          </span>
                        </div>

                      </div>

                    </div>


                    <v-divider class="my-4" />


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
                      Consumable activities will appear here.
                    </div>

                  </div>

                </v-card>

              </v-timeline-item>

            </v-timeline>

          </div>


          <v-divider />

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
           INACTIVE
           ========================================================== -->

      <v-window-item value="inactive">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Inactive Consumables
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage inactive consumable records
              </p>

            </div>


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

                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Filter Inactive Consumables
                </v-card-title>

                <v-divider />

                <v-card-text>

                  <v-select
                    v-model="inactiveCategoryFilter"
                    label="Category"
                    :items="categoryOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
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


          <div class="pa-5">

            <v-text-field
              v-model="inactiveSearch"
              label="Search Consumable"
              placeholder="Search consumable, supplier or location"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>

          <v-divider />


          <div class="pa-5">

            <v-row>

              <v-col
                v-for="consumable in paginatedInactiveConsumables"
                :key="consumable.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="consumable-card h-100"
                >

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="grey"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-package-variant-remove
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ consumable.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ consumable.id }}
                      </div>

                    </div>


                    <AppStatusChip
                      :status="consumable.status"
                      :color="getStatusColor(consumable.status)"
                    />

                  </div>

                  <v-divider />


                  <v-card-text class="pa-5">

                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-shape-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Category
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ consumable.category }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-package-variant-closed
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Stock
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ consumable.stockQuantity }}
                          {{ consumable.unit }}
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
                          Location
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ consumable.location }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-truck-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Supplier
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ consumable.supplier }}
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
                          {{ formatDate(consumable.inactiveDate) }}
                        </div>

                      </div>

                    </div>

                  </v-card-text>

                  <v-divider />


                  <v-card-actions class="pa-4">

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-eye-outline"
                      color="primary"
                      @click="viewConsumable(consumable)"
                    >
                      View
                    </v-btn>

                    <v-spacer />

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-archive-arrow-up-outline"
                      color="success"
                      @click="activateConsumable(consumable)"
                    >
                      Activate
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <v-col
                v-if="paginatedInactiveConsumables.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-package-variant-remove
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No inactive consumables found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Inactive consumables will appear here.
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <v-divider />

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
                {{ filteredInactiveConsumables.length }}
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
         CONSUMABLE DETAILS
         ============================================================ -->

    <v-dialog
      v-model="consumableDetailsDialog"
      max-width="700"
    >

      <v-card
        v-if="selectedConsumable"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Consumable Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Consumable inventory information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeConsumableDetails"
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
                mdi-package-variant-closed
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedConsumable.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedConsumable.id }}
              </div>

            </div>

            <v-spacer />

            <AppStatusChip
              :status="selectedConsumable.status"
              :color="getStatusColor(selectedConsumable.status)"
            />

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Consumable ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.id }}
              </div>
            </v-col>


            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Consumable
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.name }}
              </div>
            </v-col>


            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Category
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.category }}
              </div>
            </v-col>


            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Unit
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.unit }}
              </div>
            </v-col>


            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Stock Quantity
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.stockQuantity }}
              </div>
            </v-col>


            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Reorder Level
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.reorderLevel }}
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
                {{ selectedConsumable.location }}
              </div>
            </v-col>


            <v-col
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Supplier
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.supplier }}
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
                {{ formatDate(selectedConsumable.effectiveDate) }}
              </div>
            </v-col>


            <v-col
              v-if="selectedConsumable.inactiveDate"
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Inactive Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ formatDate(selectedConsumable.inactiveDate) }}
              </div>
            </v-col>


            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Description
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedConsumable.description || "-" }}
              </div>

            </v-col>

          </v-row>

        </v-card-text>


        <v-divider />


        <v-card-actions class="pa-4">

          <v-btn
            v-if="selectedConsumable.status === 'Active'"
            color="error"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-outline"
            @click="deactivateConsumable(selectedConsumable)"
          >
            Deactivate
          </v-btn>


          <v-btn
            v-else
            color="success"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-arrow-up-outline"
            @click="activateConsumable(selectedConsumable)"
          >
            Activate
          </v-btn>


          <v-spacer />


          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeConsumableDetails"
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
              Consumable activity details
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

          <div class="d-flex align-center mb-5">

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
                {{ selectedHistory.consumable }}
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
                Consumable
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.consumable }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Category
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.category }}
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
              v-if="selectedHistory.quantity !== undefined"
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Quantity
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.quantity }}
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
                {{ formatDate(selectedHistory.effectiveDate) }}
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


            <v-col
              cols="12"
              sm="6"
            >

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


          <v-alert
            class="mt-5"
            variant="tonal"
            :color="getHistoryColor(selectedHistory.action)"
            border="start"
          >

            <div class="text-body-2">
              {{ getHistoryDescription(selectedHistory.action) }}
            </div>

          </v-alert>

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
  ref,
  watch,
} from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"
import AppStatusChip from "@/components/common/AppStatusChip.vue"

import {
  useConsumables,
  type ConsumableAction,
  type ConsumableItem,
} from "@/composables/useConsumables"


/* */

const {

  categoryOptions,
  unitOptions,
  locationOptions,
  statusOptions,
  historyActionOptions,

  activeConsumableCount,
  inStockConsumableCount,
  lowStockConsumableCount,
  inactiveConsumableCount,

  filterMenu,

  search,
  categoryFilter,
  unitFilter,
  locationFilter,
  statusFilter,

  filteredConsumables,

  clearFilters,

  page,
  itemsPerPage,
  itemsPerPageOptions,
  totalPages,
  paginatedConsumables,
  displayedStart,
  displayedEnd,

  consumableIdInput,
  consumableNameInput,
  selectedCategory,
  selectedUnit,
  stockQuantityInput,
  reorderLevelInput,
  selectedLocation,
  supplierInput,
  effectiveDateInput,
  descriptionInput,

  consumableIdExists,
  canRegisterConsumable,

  registerConsumable,
  clearRegistrationForm,

  consumableDetailsDialog,
  selectedConsumable,
  viewConsumable,
  closeConsumableDetails,
  deactivateConsumable,
  activateConsumable,

  historyFilterMenu,
  historySearch,
  historyActionFilter,
  filteredHistory,
  clearHistoryFilters,

  historyPage,
  historyItemsPerPage,
  historyTotalPages,
  paginatedHistory,
  historyDisplayedStart,
  historyDisplayedEnd,

  historyDetailsDialog,
  selectedHistory,
  viewHistory,
  closeHistoryDetails,

  inactiveFilterMenu,
  inactiveSearch,
  inactiveCategoryFilter,
  filteredInactiveConsumables,

  inactivePage,
  inactiveItemsPerPage,
  inactiveTotalPages,
  paginatedInactiveConsumables,
  inactiveDisplayedStart,
  inactiveDisplayedEnd,

  clearInactiveFilters,

} = useConsumables()


/* */

type Tab =
  | "list"
  | "register"
  | "history"
  | "inactive"

const tab = ref<Tab>("list")


/* */

function submitRegistration() {

  if (!canRegisterConsumable.value) {
    return
  }

  registerConsumable()

  tab.value = "list"

}


/* */

function getStatusColor(
  status: string,
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


/* */

function getStockColor(
  consumable: ConsumableItem,
) {

  if (consumable.stockQuantity <= 0) {
    return "error"
  }

  if (
    consumable.stockQuantity <=
    consumable.reorderLevel
  ) {
    return "warning"
  }

  return "success"

}


/* */

function getHistoryIcon(
  action: ConsumableAction,
) {

  switch (action) {

    case "Created":
      return "mdi-plus-circle-outline"

    case "Updated":
      return "mdi-pencil-outline"

    case "Stock In":
      return "mdi-arrow-down-bold-box-outline"

    case "Stock Out":
      return "mdi-arrow-up-bold-box-outline"

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
  action: ConsumableAction,
) {

  switch (action) {

    case "Created":
      return "primary"

    case "Updated":
      return "info"

    case "Stock In":
      return "success"

    case "Stock Out":
      return "warning"

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
  action: ConsumableAction,
) {

  switch (action) {

    case "Created":
      return "Consumable was registered."

    case "Updated":
      return "Consumable information was updated."

    case "Stock In":
      return "Stock quantity was added to the consumable inventory."

    case "Stock Out":
      return "Stock quantity was removed from the consumable inventory."

    case "Activated":
      return "Consumable was activated."

    case "Deactivated":
      return "Consumable was deactivated."

    default:
      return "Consumable history activity."

  }

}


/* */

function formatDate(
  date?: string,
) {

  if (!date) {
    return "-"
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(parsedDate)

}


/* */

watch(
  filteredConsumables,
  () => {

    if (
      page.value >
      totalPages.value
    ) {

      page.value =
        totalPages.value

    }

  },
)


watch(
  filteredHistory,
  () => {

    if (
      historyPage.value >
      historyTotalPages.value
    ) {

      historyPage.value =
        historyTotalPages.value

    }

  },
)


watch(
  filteredInactiveConsumables,
  () => {

    if (
      inactivePage.value >
      inactiveTotalPages.value
    ) {

      inactivePage.value =
        inactiveTotalPages.value

    }

  },
)

</script>


<style scoped>

.table-wrapper {

  width: 100%;

  overflow-x: auto;

}


.table-wrapper :deep(table) {

  min-width: 1500px;

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

.consumable-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.consumable-card:hover {

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


@media (max-width: 700px) {

  .history-card {

    width: 100%;

  }

}

</style>