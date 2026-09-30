<template>
  <v-container fluid class="pa-6">

    <!-- ============================================================
         BREADCRUMB
         ============================================================ -->

    <div class="d-flex align-center mb-6">
      <v-icon size="20" class="mr-2">
        mdi-package-variant-closed
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Inventory
      </span>

      <v-icon size="18" class="mx-2">
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Raw Materials
      </span>
    </div>


    <!-- ============================================================
         PAGE HEADER
         ============================================================ -->

    <div class="d-flex flex-wrap align-center justify-space-between mb-6">
      <div>
        <h1 class="text-h5 font-weight-bold">
          Raw Material
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage raw material inventory and stock records
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="tab = 'register'"
      >
        Register Raw Material
      </v-btn>
    </div>


    <!-- ============================================================
         SUMMARY CARDS
         ============================================================ -->

    <v-row class="mb-6">

      <v-col cols="12" sm="6" md="3">
        <AppSummaryCard
          title="Active Raw Materials"
          :value="activeRawMaterialCount"
          icon="mdi-flask-outline"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <AppSummaryCard
          title="In Stock"
          :value="inStockRawMaterialCount"
          icon="mdi-package-check"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <AppSummaryCard
          title="Low Stock"
          :value="lowStockRawMaterialCount"
          icon="mdi-alert-box-outline"
        />
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <AppSummaryCard
          title="Inactive"
          :value="inactiveRawMaterialCount"
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
            mdi-flask-outline
          </v-icon>
          Raw Materials
        </v-tab>

        <v-tab value="register">
          <v-icon start>
            mdi-plus-box-outline
          </v-icon>
          Register Raw Material
        </v-tab>

        <v-tab value="history">
          <v-icon start>
            mdi-history
          </v-icon>
          Raw Material History
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
           RAW MATERIAL LIST
           ========================================================== -->

      <v-window-item value="list">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div class="d-flex flex-wrap align-center justify-space-between pa-5">

            <div>
              <h2 class="text-h6 font-weight-bold">
                Raw Material List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage raw material inventory records
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

                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Filter Raw Materials
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


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="search"
              label="Search Raw Material"
              placeholder="Search ID, name, supplier or location"
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
                  <th>Raw Material ID</th>
                  <th>Raw Material</th>
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
                  v-for="material in paginatedRawMaterials"
                  :key="material.id"
                >

                  <td>
                    <span class="font-weight-medium">
                      {{ material.id }}
                    </span>
                  </td>

                  <td>
                    <span class="font-weight-medium">
                      {{ material.name }}
                    </span>
                  </td>

                  <td>
                    {{ material.category }}
                  </td>

                  <td>
                    {{ material.unit }}
                  </td>

                  <td>
                    <v-chip
                      size="small"
                      variant="tonal"
                      :color="getStockColor(material)"
                    >
                      <v-icon
                        start
                        size="16"
                      >
                        mdi-package-variant-closed
                      </v-icon>

                      {{ material.stockQuantity }}
                    </v-chip>
                  </td>

                  <td>
                    {{ material.reorderLevel }}
                  </td>

                  <td>
                    {{ material.location }}
                  </td>

                  <td>
                    {{ material.supplier }}
                  </td>

                  <td>
                    {{ formatDate(material.effectiveDate) }}
                  </td>

                  <td>
                    <AppStatusChip
                      :status="material.status"
                      :color="getStatusColor(material.status)"
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
                          @click="viewRawMaterial(material)"
                        />
                      </template>

                    </v-tooltip>


                    <v-tooltip
                      :text="
                        material.status === 'Active'
                          ? 'Deactivate'
                          : 'Activate'
                      "
                    >

                      <template #activator="{ props }">
                        <v-btn
                          v-bind="props"
                          :icon="
                            material.status === 'Active'
                              ? 'mdi-archive-outline'
                              : 'mdi-archive-arrow-up-outline'
                          "
                          variant="text"
                          size="small"
                          :color="
                            material.status === 'Active'
                              ? 'error'
                              : 'success'
                          "
                          @click="
                            material.status === 'Active'
                              ? deactivateRawMaterial(material)
                              : activateRawMaterial(material)
                          "
                        />
                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr
                  v-if="paginatedRawMaterials.length === 0"
                >

                  <td
                    colspan="11"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-flask-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No raw materials found
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
                {{ filteredRawMaterials.length }}
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
                    Register Raw Material
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter raw material information to create a new inventory record
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
                      v-model="rawMaterialIdInput"
                      label="Raw Material ID"
                      placeholder="e.g. RM-001"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-identifier"
                      :error="rawMaterialIdExists"
                      :error-messages="
                        rawMaterialIdExists
                          ? 'Raw Material ID already exists.'
                          : ''
                      "
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="rawMaterialNameInput"
                      label="Raw Material"
                      placeholder="e.g. Paracetamol Powder"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-flask-outline"
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
                      prepend-inner-icon="mdi-package-check-outline"
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
                      prepend-inner-icon="mdi-alert-box-outline"
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
                      placeholder="e.g. ABC Chemicals Sdn. Bhd."
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
                      placeholder="Enter raw material description"
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
                  :disabled="!canRegisterRawMaterial"
                  @click="submitRegistration"
                >
                  Register Raw Material
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
                      Raw Material ID
                    </div>
                    <div class="text-body-1 font-weight-medium">
                      {{ rawMaterialIdInput || "-" }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Raw Material
                    </div>
                    <div class="text-body-1 font-weight-medium">
                      {{ rawMaterialNameInput || "-" }}
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

          <div class="d-flex flex-wrap align-center justify-space-between pa-5">

            <div>

              <h2 class="text-h6 font-weight-bold">
                Raw Material History
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Track changes and stock activities for raw materials
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


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="historySearch"
              label="Search Raw Material History"
              placeholder="Search raw material, ID or action"
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


                <v-card
                  rounded="xl"
                  elevation="0"
                  class="history-card"
                >

                  <div class="pa-5">

                    <div class="d-flex flex-wrap align-start justify-space-between">

                      <div>

                        <div class="d-flex align-center ga-2">

                          <span class="text-subtitle-1 font-weight-bold">
                            {{ history.rawMaterial }}
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


                    <div class="d-flex flex-wrap align-center justify-space-between ga-3">

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
                      Raw material activities will appear here.
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
           INACTIVE
           ========================================================== -->

      <v-window-item value="inactive">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <div class="d-flex flex-wrap align-center justify-space-between pa-5">

            <div>

              <h2 class="text-h6 font-weight-bold">
                Inactive Raw Materials
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage inactive raw material records
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
                  Filter Inactive Raw Materials
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


          <!-- SEARCH -->

          <div class="pa-5">

            <v-text-field
              v-model="inactiveSearch"
              label="Search Raw Material"
              placeholder="Search raw material, supplier or location"
              variant="outlined"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>

          <v-divider />


          <!-- CARDS -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="material in paginatedInactiveRawMaterials"
                :key="material.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="raw-material-card h-100"
                >

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="grey"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-flask-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ material.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ material.id }}
                      </div>

                    </div>


                    <AppStatusChip
                      :status="material.status"
                      :color="getStatusColor(material.status)"
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
                          {{ material.category }}
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
                          {{ material.stockQuantity }}
                          {{ material.unit }}
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
                          {{ material.location }}
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
                          {{ material.supplier }}
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
                          {{ material.inactiveDate || "-" }}
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
                      @click="viewRawMaterial(material)"
                    >
                      View
                    </v-btn>

                    <v-spacer />

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-archive-arrow-up-outline"
                      color="success"
                      @click="activateRawMaterial(material)"
                    >
                      Activate
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <v-col
                v-if="paginatedInactiveRawMaterials.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-flask-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No inactive raw materials found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Inactive raw materials will appear here.
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
                {{ filteredInactiveRawMaterials.length }}
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
         RAW MATERIAL DETAILS
         ============================================================ -->

    <v-dialog
      v-model="rawMaterialDetailsDialog"
      max-width="700"
    >

      <v-card
        v-if="selectedRawMaterial"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Raw Material Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Raw material inventory information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeRawMaterialDetails"
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
                mdi-flask-outline
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedRawMaterial.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedRawMaterial.id }}
              </div>

            </div>

            <v-spacer />

            <AppStatusChip
              :status="selectedRawMaterial.status"
              :color="getStatusColor(selectedRawMaterial.status)"
            />

          </div>


          <v-row>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Raw Material ID
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.id }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Raw Material
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.name }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Category
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.category }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Unit
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.unit }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Stock Quantity
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.stockQuantity }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Reorder Level
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.reorderLevel }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Location
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.location }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Supplier
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.supplier }}
              </div>
            </v-col>

            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis">
                Effective Date
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ formatDate(selectedRawMaterial.effectiveDate) }}
              </div>
            </v-col>

            <v-col
              v-if="selectedRawMaterial.inactiveDate"
              cols="12"
              sm="6"
            >
              <div class="text-caption text-medium-emphasis">
                Inactive Date
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ formatDate(selectedRawMaterial.inactiveDate) }}
              </div>
            </v-col>

            <v-col cols="12">
              <div class="text-caption text-medium-emphasis">
                Description
              </div>
              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRawMaterial.description || "-" }}
              </div>
            </v-col>

          </v-row>

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">

          <v-btn
            v-if="selectedRawMaterial.status === 'Active'"
            color="error"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-outline"
            @click="deactivateRawMaterial(selectedRawMaterial)"
          >
            Deactivate
          </v-btn>

          <v-btn
            v-else
            color="success"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-arrow-up-outline"
            @click="activateRawMaterial(selectedRawMaterial)"
          >
            Activate
          </v-btn>

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeRawMaterialDetails"
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
              Raw material activity details
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
                {{ selectedHistory.rawMaterial }}
              </div>

            </div>

          </div>


          <v-row>

            <v-col cols="12" sm="6">

              <div class="text-caption text-medium-emphasis">
                History ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.id }}
              </div>

            </v-col>


            <v-col cols="12" sm="6">

              <div class="text-caption text-medium-emphasis">
                Raw Material
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.rawMaterial }}
              </div>

            </v-col>


            <v-col cols="12" sm="6">

              <div class="text-caption text-medium-emphasis">
                Category
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.category }}
              </div>

            </v-col>


            <v-col cols="12" sm="6">

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


            <v-col cols="12" sm="6">

              <div class="text-caption text-medium-emphasis">
                Effective Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ formatDate(selectedHistory.effectiveDate) }}
              </div>

            </v-col>


            <v-col cols="12" sm="6">

              <div class="text-caption text-medium-emphasis">
                Changed By
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.changedBy }}
              </div>

            </v-col>


            <v-col cols="12" sm="6">

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
  useRawMaterial,
  type RawMaterialAction,
  type RawMaterialItem,
} from "@/composables/useRawMaterial"


/* */

const {
  categoryOptions,
  unitOptions,
  locationOptions,
  statusOptions,
  historyActionOptions,

  activeRawMaterialCount,
  inStockRawMaterialCount,
  lowStockRawMaterialCount,
  inactiveRawMaterialCount,

  filterMenu,

  search,
  categoryFilter,
  unitFilter,
  locationFilter,
  statusFilter,

  filteredRawMaterials,
  clearFilters,

  page,
  itemsPerPage,
  itemsPerPageOptions,
  totalPages,
  paginatedRawMaterials,
  displayedStart,
  displayedEnd,

  rawMaterialIdInput,
  rawMaterialNameInput,
  selectedCategory,
  selectedUnit,
  stockQuantityInput,
  reorderLevelInput,
  selectedLocation,
  supplierInput,
  effectiveDateInput,
  descriptionInput,

  rawMaterialIdExists,
  canRegisterRawMaterial,

  registerRawMaterial,
  clearRegistrationForm,

  rawMaterialDetailsDialog,
  selectedRawMaterial,
  viewRawMaterial,
  closeRawMaterialDetails,
  deactivateRawMaterial,
  activateRawMaterial,

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
  filteredInactiveRawMaterials,

  inactivePage,
  inactiveItemsPerPage,
  inactiveTotalPages,
  paginatedInactiveRawMaterials,
  inactiveDisplayedStart,
  inactiveDisplayedEnd,

  clearInactiveFilters,
} = useRawMaterial()


/* */

type Tab =
  | "list"
  | "register"
  | "history"
  | "inactive"

const tab = ref<Tab>("list")


/* */

function submitRegistration() {

  if (!canRegisterRawMaterial.value) {
    return
  }

  registerRawMaterial()

  tab.value = "list"
}


/* */

function getStatusColor(status: string) {

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
  material: RawMaterialItem,
) {

  if (material.stockQuantity <= 0) {
    return "error"
  }

  if (material.stockQuantity <= material.reorderLevel) {
    return "warning"
  }

  return "success"
}


/* */

function getHistoryIcon(
  action: RawMaterialAction,
) {

  switch (action) {

    case "Created":
      return "mdi-plus-circle-outline"

    case "Updated":
      return "mdi-pencil-outline"

    case "Stock In":
      return "mdi-package-down"

    case "Stock Out":
      return "mdi-package-up"

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
  action: RawMaterialAction,
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
  action: RawMaterialAction,
) {

  switch (action) {

    case "Created":
      return "Raw material was registered."

    case "Updated":
      return "Raw material information was updated."

    case "Stock In":
      return "Stock quantity was added to the raw material inventory."

    case "Stock Out":
      return "Stock quantity was removed from the raw material inventory."

    case "Activated":
      return "Raw material was activated."

    case "Deactivated":
      return "Raw material was deactivated."

    default:
      return "Raw material history activity."
  }
}


/* */

function formatDate(date?: string) {

  if (!date) {
    return "-"
  }

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return date
  }

  return parsedDate.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  )
}


/* */

watch(
  filteredRawMaterials,
  () => {

    if (page.value > totalPages.value) {
      page.value = totalPages.value
    }
  },
)


watch(
  filteredHistory,
  () => {

    if (historyPage.value > historyTotalPages.value) {
      historyPage.value = historyTotalPages.value
    }
  },
)


watch(
  filteredInactiveRawMaterials,
  () => {

    if (inactivePage.value > inactiveTotalPages.value) {
      inactivePage.value = inactiveTotalPages.value
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

.raw-material-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}


.raw-material-card:hover {

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