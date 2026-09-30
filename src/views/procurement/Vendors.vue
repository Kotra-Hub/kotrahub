<template>
  <v-container
    fluid
    class="pa-6"
  >
    <!-- =========================================================
         BREADCRUMB
         ========================================================= -->
    <div class="d-flex align-center ga-2 mb-6">
      <v-icon size="20">
        mdi-cart-outline
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Procurement
      </span>

      <v-icon
        size="18"
        color="grey"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Vendors
      </span>
    </div>

    <!-- =========================================================
         HEADER
         ========================================================= -->
    <div
      class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6"
    >
      <div>
        <h1 class="text-h5 font-weight-bold mb-1">
          Vendors
        </h1>

        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage vendors, supplier information and procurement relationships.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openNewVendor"
      >
        New Vendor
      </v-btn>
    </div>

    <!-- =========================================================
         SUMMARY CARDS
         ========================================================= -->
    <v-row class="mb-2">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Total Vendors"
          :value="totalVendors"
          icon="mdi-store-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Active Vendors"
          :value="activeVendors"
          icon="mdi-check-circle-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Inactive Vendors"
          :value="inactiveVendors"
          icon="mdi-store-off-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Pending Review"
          :value="pendingReview"
          icon="mdi-clock-outline"
        />
      </v-col>
    </v-row>

    <!-- =========================================================
         TABS
         ========================================================= -->
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
        <v-tab value="all">
          <v-icon start>
            mdi-store-outline
          </v-icon>
          All Vendors
        </v-tab>

        <v-tab value="active">
          <v-icon start>
            mdi-check-circle-outline
          </v-icon>
          Active Vendors
        </v-tab>

        <v-tab value="inactive">
          <v-icon start>
            mdi-store-off-outline
          </v-icon>
          Inactive Vendors
        </v-tab>

        <v-tab value="categories">
          <v-icon start>
            mdi-shape-outline
          </v-icon>
          Vendor Categories
        </v-tab>
      </v-tabs>
    </v-card>

    <!-- =========================================================
         TAB CONTENT
         ========================================================= -->
    <v-window
      v-model="tab"
      class="mt-6"
    >
      <!-- =======================================================
           ALL VENDORS
           ======================================================= -->
      <v-window-item value="all">
        <v-card
          border
          rounded="xl"
          elevation="0"
        >
          <div class="pa-5">
            <div
              class="d-flex flex-wrap align-center justify-space-between ga-4"
            >
              <div>
                <h2 class="text-subtitle-1 font-weight-bold">
                  Vendor Directory
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Search and manage registered vendors.
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
                  <div
                    class="d-flex align-center justify-space-between mb-4"
                  >
                    <span class="text-subtitle-2 font-weight-bold">
                      Filter Vendors
                    </span>

                    <v-btn
                      icon="mdi-close"
                      variant="text"
                      size="small"
                      @click="filterMenu = false"
                    />
                  </div>

                  <v-select
                    v-model="filters.category"
                    label="Category"
                    :items="categoryOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.vendorType"
                    label="Vendor Type"
                    :items="vendorTypeOptions"
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

            <!-- SEARCH -->
            <v-text-field
              v-model="search"
              class="mt-5"
              prepend-inner-icon="mdi-magnify"
              label="Search vendors"
              placeholder="Search by vendor name, code, contact person, email..."
              variant="outlined"
              density="comfortable"
              clearable
              hide-details
            />
          </div>

          <v-divider />

          <!-- TABLE -->
          <div class="table-wrapper">
            <v-data-table
              :headers="headers"
              :items="filteredVendors"
              :items-per-page="itemsPerPage"
              :page="page"
              hide-default-footer
              hover
            >
              <!-- Vendor -->
              <template #item.vendorName="{ item }">
                <div>
                  <div class="font-weight-medium">
                    {{ item.vendorName }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.vendorCode }}
                  </div>
                </div>
              </template>

              <!-- Type -->
              <template #item.vendorType="{ item }">
                <v-chip
                  size="small"
                  variant="tonal"
                >
                  {{ item.vendorType }}
                </v-chip>
              </template>

              <!-- Category -->
              <template #item.category="{ item }">
                <div class="font-weight-medium">
                  {{ item.category }}
                </div>
              </template>

              <!-- Contact -->
              <template #item.contactPerson="{ item }">
                <div>
                  <div class="font-weight-medium">
                    {{ item.contactPerson }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.email }}
                  </div>
                </div>
              </template>

              <!-- Phone -->
              <template #item.phone="{ item }">
                {{ item.phone }}
              </template>

              <!-- Payment -->
              <template #item.paymentTerms="{ item }">
                {{ item.paymentTerms }}
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
                    icon="mdi-eye-outline"
                    variant="text"
                    size="small"
                    @click="viewVendor(item)"
                  />

                  <v-btn
                    icon="mdi-pencil-outline"
                    variant="text"
                    size="small"
                    @click="editVendor(item)"
                  />

                  <v-btn
                    icon="mdi-delete-outline"
                    variant="text"
                    size="small"
                    color="error"
                    @click="deleteVendor(item)"
                  />
                </div>
              </template>

              <!-- No Data -->
              <template #no-data>
                <div class="pa-8 text-center">
                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-store-search-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No vendors found
                  </div>

                  <div class="text-body-2 text-medium-emphasis">
                    Try changing your search or filter.
                  </div>
                </div>
              </template>
            </v-data-table>
          </div>

          <v-divider />

          <!-- PAGINATION -->
          <div class="pagination-wrapper">
            <div class="text-body-2 text-medium-emphasis">
              Showing
              <strong>{{ paginationStart }}</strong>
              -
              <strong>{{ paginationEnd }}</strong>
              of
              <strong>{{ filteredVendors.length }}</strong>
              vendors
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

      <!-- =======================================================
           ACTIVE VENDORS
           ======================================================= -->
      <v-window-item value="active">
        <v-card
          border
          rounded="xl"
          elevation="0"
        >
          <div class="pa-5">
            <div
              class="d-flex align-center justify-space-between mb-5"
            >
              <div>
                <h2 class="text-subtitle-1 font-weight-bold">
                  Active Vendors
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Vendors currently available for procurement transactions.
                </p>
              </div>

              <v-icon
                color="success"
                size="28"
              >
                mdi-check-circle-outline
              </v-icon>
            </div>

            <v-row v-if="activeVendorItems.length">
              <v-col
                v-for="vendor in activeVendorItems"
                :key="vendor.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card
                  border
                  rounded="xl"
                  elevation="0"
                  class="vendor-card h-100"
                >
                  <div class="pa-5">
                    <div
                      class="d-flex align-start justify-space-between mb-4"
                    >
                      <v-avatar
                        size="46"
                        color="primary"
                        variant="tonal"
                      >
                        <v-icon>
                          mdi-store-outline
                        </v-icon>
                      </v-avatar>

                      <v-chip
                        color="success"
                        size="small"
                        variant="tonal"
                      >
                        Active
                      </v-chip>
                    </div>

                    <div class="text-subtitle-1 font-weight-bold">
                      {{ vendor.vendorName }}
                    </div>

                    <div class="text-caption text-medium-emphasis mt-1">
                      {{ vendor.vendorCode }}
                    </div>

                    <div class="text-body-2 mt-3">
                      {{ vendor.category }}
                    </div>

                    <v-divider class="my-4" />

                    <div class="vendor-row">
                      <span class="vendor-label">
                        Contact
                      </span>

                      <span>
                        {{ vendor.contactPerson }}
                      </span>
                    </div>

                    <div class="vendor-row">
                      <span class="vendor-label">
                        Phone
                      </span>

                      <span>
                        {{ vendor.phone }}
                      </span>
                    </div>

                    <div class="vendor-row">
                      <span class="vendor-label">
                        Payment
                      </span>

                      <span>
                        {{ vendor.paymentTerms }}
                      </span>
                    </div>

                    <v-btn
                      block
                      variant="outlined"
                      rounded="lg"
                      class="mt-4"
                      prepend-icon="mdi-eye-outline"
                      @click="viewVendor(vendor)"
                    >
                      View Vendor
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
                mdi-store-off-outline
              </v-icon>

              <div class="text-body-1 font-weight-medium">
                No active vendors
              </div>
            </div>
          </div>
        </v-card>
      </v-window-item>

      <!-- =======================================================
           INACTIVE VENDORS
           ======================================================= -->
      <v-window-item value="inactive">
        <v-card
          border
          rounded="xl"
          elevation="0"
        >
          <div class="pa-5">
            <div
              class="d-flex align-center justify-space-between mb-5"
            >
              <div>
                <h2 class="text-subtitle-1 font-weight-bold">
                  Inactive Vendors
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Vendors that are currently inactive or unavailable for new procurement.
                </p>
              </div>

              <v-icon
                color="grey"
                size="28"
              >
                mdi-store-off-outline
              </v-icon>
            </div>

            <v-row v-if="inactiveVendorItems.length">
              <v-col
                v-for="vendor in inactiveVendorItems"
                :key="vendor.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card
                  border
                  rounded="xl"
                  elevation="0"
                  class="vendor-card h-100"
                >
                  <div class="pa-5">
                    <div
                      class="d-flex align-start justify-space-between mb-4"
                    >
                      <v-avatar
                        size="46"
                        color="grey"
                        variant="tonal"
                      >
                        <v-icon>
                          mdi-store-off-outline
                        </v-icon>
                      </v-avatar>

                      <v-chip
                        color="grey"
                        size="small"
                        variant="tonal"
                      >
                        Inactive
                      </v-chip>
                    </div>

                    <div class="text-subtitle-1 font-weight-bold">
                      {{ vendor.vendorName }}
                    </div>

                    <div class="text-caption text-medium-emphasis mt-1">
                      {{ vendor.vendorCode }}
                    </div>

                    <div class="text-body-2 mt-3">
                      {{ vendor.category }}
                    </div>

                    <v-divider class="my-4" />

                    <div class="vendor-row">
                      <span class="vendor-label">
                        Contact
                      </span>

                      <span>
                        {{ vendor.contactPerson }}
                      </span>
                    </div>

                    <div class="vendor-row">
                      <span class="vendor-label">
                        Payment
                      </span>

                      <span>
                        {{ vendor.paymentTerms }}
                      </span>
                    </div>

                    <v-btn
                      block
                      variant="outlined"
                      rounded="lg"
                      class="mt-4"
                      prepend-icon="mdi-eye-outline"
                      @click="viewVendor(vendor)"
                    >
                      View Vendor
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
                mdi-store-check-outline
              </v-icon>

              <div class="text-body-1 font-weight-medium">
                No inactive vendors
              </div>
            </div>
          </div>
        </v-card>
      </v-window-item>

      <!-- =======================================================
           VENDOR CATEGORIES
           ======================================================= -->
      <v-window-item value="categories">
        <v-row>
          <v-col
            v-for="category in categoryCards"
            :key="category.name"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              border
              rounded="xl"
              elevation="0"
              class="vendor-card h-100"
            >
              <div class="pa-5">
                <div
                  class="d-flex align-start justify-space-between mb-4"
                >
                  <v-avatar
                    size="46"
                    color="primary"
                    variant="tonal"
                  >
                    <v-icon>
                      mdi-shape-outline
                    </v-icon>
                  </v-avatar>

                  <v-chip
                    size="small"
                    variant="tonal"
                  >
                    {{ category.vendorCount }} Vendors
                  </v-chip>
                </div>

                <div class="text-subtitle-1 font-weight-bold">
                  {{ category.name }}
                </div>

                <div class="text-body-2 text-medium-emphasis mt-1">
                  {{ category.active }} Active
                </div>

                <v-divider class="my-4" />

                <div class="vendor-row">
                  <span class="vendor-label">
                    Total Vendors
                  </span>

                  <span class="font-weight-medium">
                    {{ category.vendorCount }}
                  </span>
                </div>

                <div class="vendor-row">
                  <span class="vendor-label">
                    Active Vendors
                  </span>

                  <v-chip
                    size="small"
                    :color="
                      category.active > 0
                        ? 'success'
                        : 'grey'
                    "
                    variant="tonal"
                  >
                    {{ category.active }}
                  </v-chip>
                </div>

                <v-btn
                  variant="text"
                  color="primary"
                  class="px-0 mt-3"
                  append-icon="mdi-arrow-right"
                  @click="filterByCategory(category.name)"
                >
                  View Vendors
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>

    <!-- =========================================================
         ADD / EDIT VENDOR DIALOG
         ========================================================= -->
    <v-dialog
      v-model="vendorDialog"
      max-width="900"
      scrollable
    >
      <v-card rounded="xl">
        <v-card-title class="pa-5 d-flex align-center">
          <div>
            <div class="text-subtitle-1 font-weight-bold">
              {{ editingVendorId ? "Edit Vendor" : "Add Vendor" }}
            </div>

            <div class="text-caption text-medium-emphasis mt-1">
              {{ editingVendorId
                ? "Update vendor information."
                : "Register a new vendor for procurement."
              }}
            </div>
          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="closeVendorDialog"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">
          <!-- Vendor Information -->
          <div class="section-title mb-4">
            Vendor Information
          </div>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="vendorForm.vendorName"
                label="Vendor Name *"
                placeholder="e.g. ABC Technologies Sdn Bhd"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="vendorForm.vendorType"
                label="Vendor Type *"
                :items="vendorTypeOptions"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="vendorForm.category"
                label="Category *"
                :items="categoryOptions"
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
                v-model="vendorForm.status"
                label="Status"
                :items="statusOptions"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="vendorForm.registrationNo"
                label="Registration No."
                placeholder="Company registration number"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="vendorForm.taxNo"
                label="Tax / SST No."
                placeholder="Tax identification number"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <!-- Contact -->
          <div class="section-title mt-4 mb-4">
            Contact Information
          </div>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="vendorForm.contactPerson"
                label="Contact Person *"
                placeholder="e.g. John Tan"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="vendorForm.email"
                label="Email *"
                type="email"
                placeholder="e.g. sales@company.com"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="vendorForm.phone"
                label="Phone *"
                placeholder="e.g. 03-1234 5678"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="vendorForm.country"
                label="Country"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="vendorForm.address"
                label="Address"
                placeholder="Vendor registered address"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="vendorForm.city"
                label="City"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="vendorForm.state"
                label="State"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="vendorForm.country"
                label="Country"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <!-- Payment -->
          <div class="section-title mt-4 mb-4">
            Payment Information
          </div>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="vendorForm.paymentTerms"
                label="Payment Terms *"
                :items="paymentTermsOptions"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="vendorForm.currency"
                label="Currency *"
                :items="currencyOptions"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="vendorForm.notes"
                label="Notes"
                placeholder="Enter additional vendor information..."
                variant="outlined"
                density="comfortable"
                rows="4"
                maxlength="1000"
                counter
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeVendorDialog"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded="lg"
            prepend-icon="mdi-content-save-outline"
            @click="saveVendor"
          >
            {{ editingVendorId ? "Save Changes" : "Save Vendor" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- =========================================================
         VENDOR DETAILS DIALOG
         ========================================================= -->
    <v-dialog
      v-model="detailsDialog"
      max-width="800"
      scrollable
    >
      <v-card rounded="xl">
        <v-card-title class="pa-5 d-flex align-center">
          <span class="text-subtitle-1 font-weight-bold">
            Vendor Details
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
          v-if="selectedVendor"
          class="pa-5"
        >
          <!-- Header -->
          <div
            class="d-flex flex-wrap align-center ga-3 mb-6"
          >
            <v-avatar
              size="54"
              color="primary"
              variant="tonal"
            >
              <v-icon size="28">
                mdi-store-outline
              </v-icon>
            </v-avatar>

            <div class="flex-grow-1">
              <div class="text-h6 font-weight-bold">
                {{ selectedVendor.vendorName }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedVendor.vendorCode }}
              </div>
            </div>

            <v-chip
              :color="getStatusColor(selectedVendor.status)"
              variant="tonal"
            >
              {{ selectedVendor.status }}
            </v-chip>
          </div>

          <!-- Vendor Details -->
          <div class="section-title mb-3">
            Vendor Information
          </div>

          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Category
                </div>

                <div class="detail-value">
                  {{ selectedVendor.category }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Vendor Type
                </div>

                <div class="detail-value">
                  {{ selectedVendor.vendorType }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Registration No.
                </div>

                <div class="detail-value">
                  {{ selectedVendor.registrationNo || "-" }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Tax / SST No.
                </div>

                <div class="detail-value">
                  {{ selectedVendor.taxNo || "-" }}
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Contact -->
          <div class="section-title mt-6 mb-3">
            Contact Information
          </div>

          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Contact Person
                </div>

                <div class="detail-value">
                  {{ selectedVendor.contactPerson }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Email
                </div>

                <div class="detail-value">
                  {{ selectedVendor.email }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Phone
                </div>

                <div class="detail-value">
                  {{ selectedVendor.phone }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Country
                </div>

                <div class="detail-value">
                  {{ selectedVendor.country }}
                </div>
              </div>
            </v-col>

            <v-col cols="12">
              <div class="detail-box">
                <div class="detail-label">
                  Address
                </div>

                <div class="detail-value">
                  {{ selectedVendor.address }}
                  <span v-if="selectedVendor.city">
                    , {{ selectedVendor.city }}
                  </span>
                  <span v-if="selectedVendor.state">
                    , {{ selectedVendor.state }}
                  </span>
                  <span v-if="selectedVendor.country">
                    , {{ selectedVendor.country }}
                  </span>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Payment -->
          <div class="section-title mt-6 mb-3">
            Payment Information
          </div>

          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Payment Terms
                </div>

                <div class="detail-value">
                  {{ selectedVendor.paymentTerms }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Currency
                </div>

                <div class="detail-value">
                  {{ selectedVendor.currency }}
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- Notes -->
          <div class="section-title mt-6 mb-3">
            Notes
          </div>

          <div class="detail-box">
            <div class="detail-value text-body-2">
              {{ selectedVendor.notes || "-" }}
            </div>
          </div>
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
            v-if="selectedVendor"
            color="primary"
            rounded="lg"
            prepend-icon="mdi-pencil-outline"
            @click="editSelectedVendor"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- =========================================================
         SNACKBAR
         ========================================================= -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="snackbarColor"
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
import {
  computed,
  ref,
  watch,
} from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"

import {
  useVendors,
  type Vendor,
  type VendorStatus,
  type VendorType,
} from "@/composables/useVendors"

/* */

const {
  vendors,

  categoryOptions,
  vendorTypeOptions,
  statusOptions,
  paymentTermsOptions,
  currencyOptions,

  totalVendors,
  activeVendors,
  inactiveVendors,
  pendingReview,
  categoryCards,

  createVendor,
  updateVendor,
  deleteVendor: removeVendor,
} = useVendors()

/* */

const tab = ref("all")

const search = ref("")
const page = ref(1)
const itemsPerPage = 10

const filterMenu = ref(false)

const vendorDialog = ref(false)
const detailsDialog = ref(false)

const selectedVendor = ref<Vendor | null>(null)
const editingVendorId = ref<string | null>(null)

const snackbar = ref(false)
const snackbarMessage = ref("")
const snackbarColor = ref("success")

/* */

interface VendorForm {
  vendorName: string
  vendorType: VendorType
  category: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  registrationNo: string
  taxNo: string
  paymentTerms: string
  currency: string
  status: VendorStatus
  notes: string
}

function createEmptyVendorForm(): VendorForm {
  return {
    vendorName: "",
    vendorType: "Local",
    category: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "Malaysia",
    registrationNo: "",
    taxNo: "",
    paymentTerms: "30 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Active",
    notes: "",
  }
}

const vendorForm = ref<VendorForm>(
  createEmptyVendorForm(),
)

/* */

const filters = ref({
  category: null as string | null,
  vendorType: null as VendorType | null,
  status: null as VendorStatus | null,
})

/* */

const headers = [
  {
    title: "Vendor",
    key: "vendorName",
    sortable: false,
    minWidth: 230,
  },
  {
    title: "Type",
    key: "vendorType",
    sortable: false,
    minWidth: 110,
  },
  {
    title: "Category",
    key: "category",
    sortable: false,
    minWidth: 170,
  },
  {
    title: "Contact Person",
    key: "contactPerson",
    sortable: false,
    minWidth: 230,
  },
  {
    title: "Phone",
    key: "phone",
    sortable: false,
    minWidth: 140,
  },
  {
    title: "Payment Terms",
    key: "paymentTerms",
    sortable: false,
    minWidth: 140,
  },
  {
    title: "Status",
    key: "status",
    sortable: false,
    minWidth: 140,
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

const activeFilterCount = computed(() => {
  return Object.values(filters.value).filter(Boolean).length
})

const filteredVendors = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return vendors.value.filter(vendor => {
    const matchesSearch =
      !keyword ||
      [
        vendor.vendorCode,
        vendor.vendorName,
        vendor.vendorType,
        vendor.category,
        vendor.contactPerson,
        vendor.email,
        vendor.phone,
        vendor.address,
        vendor.city,
        vendor.state,
        vendor.country,
        vendor.registrationNo,
        vendor.status,
        vendor.paymentTerms,
      ].some(value =>
        value
          .toLowerCase()
          .includes(keyword),
      )

    const matchesCategory =
      !filters.value.category ||
      vendor.category === filters.value.category

    const matchesType =
      !filters.value.vendorType ||
      vendor.vendorType === filters.value.vendorType

    const matchesStatus =
      !filters.value.status ||
      vendor.status === filters.value.status

    return (
      matchesSearch &&
      matchesCategory &&
      matchesType &&
      matchesStatus
    )
  })
})

const activeVendorItems = computed(() => {
  return vendors.value.filter(
    vendor => vendor.status === "Active",
  )
})

const inactiveVendorItems = computed(() => {
  return vendors.value.filter(
    vendor => vendor.status === "Inactive",
  )
})

const pageCount = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredVendors.value.length /
        itemsPerPage,
    ),
  )
})

const paginationStart = computed(() => {
  if (!filteredVendors.value.length) {
    return 0
  }

  return (
    (page.value - 1) *
      itemsPerPage +
    1
  )
})

const paginationEnd = computed(() => {
  return Math.min(
    page.value * itemsPerPage,
    filteredVendors.value.length,
  )
})

/* */

watch(
  [
    search,
    () => filters.value.category,
    () => filters.value.vendorType,
    () => filters.value.status,
  ],
  () => {
    page.value = 1
  },
)

watch(
  pageCount,
  () => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value
    }
  },
)

/* */

function formatDate(value: string) {
  if (!value) {
    return "-"
  }

  const date = new Date(
    `${value}T00:00:00`,
  )

  return new Intl.DateTimeFormat(
    "en-MY",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date)
}

function getStatusColor(
  status: VendorStatus,
) {
  switch (status) {
    case "Active":
      return "success"

    case "Inactive":
      return "grey"

    case "Pending Review":
      return "warning"

    case "Blacklisted":
      return "error"

    default:
      return "grey"
  }
}

function showSnackbar(
  message: string,
  color = "success",
) {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}

/* */

function clearFilters() {
  filters.value = {
    category: null,
    vendorType: null,
    status: null,
  }
}

function filterByCategory(
  category: string,
) {
  filters.value.category = category
  filters.value.vendorType = null
  filters.value.status = null

  tab.value = "all"
}

/* */

function openNewVendor() {
  editingVendorId.value = null
  vendorForm.value =
    createEmptyVendorForm()

  vendorDialog.value = true
}

function closeVendorDialog() {
  vendorDialog.value = false
  editingVendorId.value = null
}

function editVendor(
  vendor: Vendor,
) {
  editingVendorId.value = vendor.id

  vendorForm.value = {
    vendorName: vendor.vendorName,
    vendorType: vendor.vendorType,
    category: vendor.category,
    contactPerson: vendor.contactPerson,
    email: vendor.email,
    phone: vendor.phone,
    address: vendor.address,
    city: vendor.city,
    state: vendor.state,
    country: vendor.country,
    registrationNo: vendor.registrationNo,
    taxNo: vendor.taxNo,
    paymentTerms: vendor.paymentTerms,
    currency: vendor.currency,
    status: vendor.status,
    notes: vendor.notes,
  }

  detailsDialog.value = false
  vendorDialog.value = true
}

/* */

function validateVendorForm() {
  if (!vendorForm.value.vendorName.trim()) {
    showSnackbar(
      "Please enter the vendor name.",
      "error",
    )

    return false
  }

  if (!vendorForm.value.category) {
    showSnackbar(
      "Please select a category.",
      "error",
    )

    return false
  }

  if (
    !vendorForm.value.contactPerson.trim()
  ) {
    showSnackbar(
      "Please enter the contact person.",
      "error",
    )

    return false
  }

  if (!vendorForm.value.email.trim()) {
    showSnackbar(
      "Please enter the vendor email.",
      "error",
    )

    return false
  }

  if (!vendorForm.value.phone.trim()) {
    showSnackbar(
      "Please enter the vendor phone number.",
      "error",
    )

    return false
  }

  if (!vendorForm.value.paymentTerms) {
    showSnackbar(
      "Please select payment terms.",
      "error",
    )

    return false
  }

  if (!vendorForm.value.currency) {
    showSnackbar(
      "Please select a currency.",
      "error",
    )

    return false
  }

  return true
}

/* */

function saveVendor() {
  if (!validateVendorForm()) {
    return
  }

  if (editingVendorId.value) {
    const updated = updateVendor(
      editingVendorId.value,
      {
        vendorName:
          vendorForm.value.vendorName.trim(),

        vendorType:
          vendorForm.value.vendorType,

        category:
          vendorForm.value.category,

        contactPerson:
          vendorForm.value.contactPerson.trim(),

        email:
          vendorForm.value.email.trim(),

        phone:
          vendorForm.value.phone.trim(),

        address:
          vendorForm.value.address.trim(),

        city:
          vendorForm.value.city.trim(),

        state:
          vendorForm.value.state.trim(),

        country:
          vendorForm.value.country.trim(),

        registrationNo:
          vendorForm.value.registrationNo.trim(),

        taxNo:
          vendorForm.value.taxNo.trim(),

        paymentTerms:
          vendorForm.value.paymentTerms,

        currency:
          vendorForm.value.currency,

        status:
          vendorForm.value.status,

        notes:
          vendorForm.value.notes.trim(),
      },
    )

    if (updated) {
      showSnackbar(
        "Vendor updated successfully.",
      )
    }
  } else {
    const today =
      new Date()
        .toISOString()
        .split("T")[0]

    createVendor({
      vendorName:
        vendorForm.value.vendorName.trim(),

      vendorType:
        vendorForm.value.vendorType,

      category:
        vendorForm.value.category,

      contactPerson:
        vendorForm.value.contactPerson.trim(),

      email:
        vendorForm.value.email.trim(),

      phone:
        vendorForm.value.phone.trim(),

      address:
        vendorForm.value.address.trim(),

      city:
        vendorForm.value.city.trim(),

      state:
        vendorForm.value.state.trim(),

      country:
        vendorForm.value.country.trim(),

      registrationNo:
        vendorForm.value.registrationNo.trim(),

      taxNo:
        vendorForm.value.taxNo.trim(),

      paymentTerms:
        vendorForm.value.paymentTerms,

      currency:
        vendorForm.value.currency,

      status:
        vendorForm.value.status,

      notes:
        vendorForm.value.notes.trim(),

      createdDate: today,
    })

    showSnackbar(
      "Vendor created successfully.",
    )
  }

  vendorDialog.value = false
  editingVendorId.value = null
}

/* */

function viewVendor(
  vendor: Vendor,
) {
  selectedVendor.value = vendor
  detailsDialog.value = true
}

function editSelectedVendor() {
  if (!selectedVendor.value) {
    return
  }

  editVendor(selectedVendor.value)
}

function deleteVendor(
  vendor: Vendor,
) {
  const success =
    removeVendor(vendor.id)

  if (!success) {
    showSnackbar(
      "Unable to delete vendor.",
      "error",
    )

    return
  }

  if (
    selectedVendor.value?.id ===
    vendor.id
  ) {
    selectedVendor.value = null
    detailsDialog.value = false
  }

  showSnackbar(
    `${vendor.vendorName} deleted successfully.`,
  )
}
</script>

<style scoped>
.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table-wrapper :deep(table) {
  min-width: 1250px;
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

.vendor-card {
  border: 1px solid #d9d9d9 !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.vendor-card:hover {
  transform: translateY(-2px);
  border-color: #bdbdbd !important;
  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;
}

.vendor-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 0;
  font-size: 14px;
}

.vendor-label {
  color: #757575;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
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