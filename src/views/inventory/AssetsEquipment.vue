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
        mdi-package-variant-closed
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Inventory
      </span>

      <v-icon
        size="18"
        color="grey"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Assets & Equipment
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
          Assets & Equipment
        </h1>

        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage company assets, equipment, assignments and asset status.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openCreateDialog"
      >
        Add Asset
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
          title="Total Assets"
          :value="totalAssets"
          icon="mdi-package-variant-closed"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Available"
          :value="availableAssets"
          icon="mdi-check-circle-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Assigned / In Use"
          :value="assignedAssets"
          icon="mdi-account-check-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Under Maintenance"
          :value="maintenanceAssets"
          icon="mdi-wrench-outline"
        />
      </v-col>
    </v-row>

    <!-- =========================================================
         MAIN CARD
         ========================================================= -->
    <v-card
      border
      rounded="xl"
      elevation="0"
    >
      <!-- =======================================================
           HEADER + FILTER
           ======================================================= -->
      <div class="pa-5">
        <div
          class="d-flex flex-wrap align-center justify-space-between ga-4"
        >
          <div>
            <h2 class="text-subtitle-1 font-weight-bold">
              Assets & Equipment
            </h2>

            <p class="text-body-2 text-medium-emphasis mb-0">
              Search and manage company assets and equipment.
            </p>
          </div>

          <!-- FILTER -->
          <v-menu
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
                  Filter Assets
                </span>
              </div>

              <v-select
                v-model="selectedCategory"
                label="Category"
                :items="assetCategories"
                variant="outlined"
                density="comfortable"
                clearable
                class="mb-3"
              />

              <v-select
                v-model="selectedDepartment"
                label="Department"
                :items="departments"
                variant="outlined"
                density="comfortable"
                clearable
                class="mb-3"
              />

              <v-select
                v-model="selectedStatus"
                label="Status"
                :items="assetStatuses"
                variant="outlined"
                density="comfortable"
                clearable
                class="mb-3"
              />

              <v-select
                v-model="selectedCondition"
                label="Condition"
                :items="assetConditions"
                variant="outlined"
                density="comfortable"
                clearable
              />

              <div class="d-flex justify-end mt-4">
                <v-btn
                  variant="text"
                  @click="resetFilters"
                >
                  Clear
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
          label="Search assets"
          placeholder="Search by asset no, asset name, serial no, department..."
          variant="outlined"
          density="comfortable"
          clearable
          hide-details
        />
      </div>

      <v-divider />

      <!-- =======================================================
           TABLE
           ======================================================= -->
      <div class="table-wrapper">
        <v-data-table
          :headers="headers"
          :items="paginatedAssets"
          :items-per-page="itemsPerPage"
          hide-default-footer
          hover
        >
          <!-- ASSET -->
          <template #item.asset="{ item }">
            <div>
              <div class="font-weight-medium">
                {{ item.assetName }}
              </div>

              <div class="text-caption text-medium-emphasis">
                {{ item.assetNo }}
              </div>
            </div>
          </template>

          <!-- CATEGORY -->
          <template #item.category="{ item }">
            <v-chip
              size="small"
              variant="tonal"
              color="primary"
            >
              {{ item.category }}
            </v-chip>
          </template>

          <!-- DEPARTMENT -->
          <template #item.department="{ item }">
            <div>
              {{ item.department }}
            </div>

            <div
              v-if="item.assignedTo"
              class="text-caption text-medium-emphasis"
            >
              {{ item.assignedTo }}
            </div>
          </template>

          <!-- LOCATION -->
          <template #item.location="{ item }">
            {{ item.location }}
          </template>

          <!-- PURCHASE DATE -->
          <template #item.purchaseDate="{ item }">
            {{ formatDate(item.purchaseDate) }}
          </template>

          <!-- COST -->
          <template #item.purchaseCost="{ item }">
            <span class="font-weight-medium">
              {{ formatCurrency(item.purchaseCost) }}
            </span>
          </template>

          <!-- CONDITION -->
          <template #item.condition="{ item }">
            <v-chip
              :color="getConditionColor(item.condition)"
              size="small"
              variant="tonal"
            >
              {{ item.condition }}
            </v-chip>
          </template>

          <!-- STATUS -->
          <template #item.status="{ item }">
            <v-chip
              :color="getStatusColor(item.status)"
              size="small"
              variant="tonal"
            >
              {{ item.status }}
            </v-chip>
          </template>

          <!-- ACTIONS -->
          <template #item.actions="{ item }">
            <div class="d-flex align-center ga-1">
              <v-btn
                icon="mdi-eye-outline"
                variant="text"
                size="small"
                @click="openDetailsDialog(item)"
              />

              <v-btn
                icon="mdi-pencil-outline"
                variant="text"
                size="small"
                @click="openEditDialog(item)"
              />

              <v-btn
                icon="mdi-delete-outline"
                variant="text"
                size="small"
                color="error"
                @click="deleteAsset(item)"
              />
            </div>
          </template>

          <!-- NO DATA -->
          <template #no-data>
            <div class="pa-8 text-center">
              <v-icon
                size="48"
                color="grey"
                class="mb-3"
              >
                mdi-package-variant-remove
              </v-icon>

              <div class="text-body-1 font-weight-medium">
                No assets found
              </div>

              <div class="text-body-2 text-medium-emphasis">
                Try changing your search or filter.
              </div>
            </div>
          </template>
        </v-data-table>
      </div>

      <v-divider />

      <!-- =======================================================
           PAGINATION
           ======================================================= -->
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
            {{ filteredAssets.length }}
          </strong>

          assets
        </div>

        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
          rounded="circle"
          density="comfortable"
        />
      </div>
    </v-card>

    <!-- =========================================================
         ADD / EDIT ASSET DIALOG
         ========================================================= -->
    <v-dialog
      v-model="showAssetDialog"
      max-width="900"
      scrollable
    >
      <v-card rounded="xl">
        <v-card-title class="pa-5 d-flex align-center">
          <div>
            <div class="text-subtitle-1 font-weight-bold">
              {{ editingAssetId ? "Edit Asset" : "Add Asset" }}
            </div>

            <div class="text-caption text-medium-emphasis mt-1">
              {{ editingAssetId
                ? "Update asset information."
                : "Add a new company asset or equipment." }}
            </div>
          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="showAssetDialog = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">
          <!-- ASSET INFORMATION -->
          <div class="section-title mb-4">
            Asset Information
          </div>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="assetForm.assetName"
                label="Asset Name *"
                placeholder="e.g. Dell Latitude 5440"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="assetForm.category"
                label="Category *"
                :items="assetCategories"
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
                v-model="assetForm.brand"
                label="Brand"
                placeholder="e.g. Dell"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="assetForm.model"
                label="Model"
                placeholder="e.g. Latitude 5440"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="assetForm.serialNo"
                label="Serial Number"
                placeholder="Enter serial number"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="assetForm.purchaseDate"
                label="Purchase Date *"
                type="date"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <!-- ASSIGNMENT -->
          <div class="section-title mt-3 mb-4">
            Assignment & Location
          </div>

          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="assetForm.department"
                label="Department *"
                :items="departments"
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
                v-model="assetForm.location"
                label="Location *"
                :items="locations"
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
                v-model="assetForm.assignedTo"
                label="Assigned To"
                :items="users"
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
                v-model="assetForm.status"
                label="Status"
                :items="assetStatuses"
                variant="outlined"
                density="comfortable"
              />
            </v-col>
          </v-row>

          <!-- FINANCIAL / CONDITION -->
          <div class="section-title mt-3 mb-4">
            Asset Details
          </div>

          <v-row>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model.number="assetForm.purchaseCost"
                label="Purchase Cost"
                type="number"
                min="0"
                prefix="RM"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="assetForm.condition"
                label="Condition"
                :items="assetConditions"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.warrantyExpiry"
                label="Warranty Expiry"
                type="date"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="assetForm.notes"
                label="Notes"
                rows="4"
                maxlength="1000"
                counter
                variant="outlined"
                density="comfortable"
                placeholder="Enter additional asset information..."
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
            @click="showAssetDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded="lg"
            prepend-icon="mdi-content-save-outline"
            @click="saveAsset"
          >
            {{ editingAssetId ? "Save Changes" : "Add Asset" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- =========================================================
         ASSET DETAILS DIALOG
         ========================================================= -->
    <v-dialog
      v-model="showDetailsDialog"
      max-width="800"
      scrollable
    >
      <v-card rounded="xl">
        <v-card-title class="pa-5 d-flex align-center">
          <span class="text-subtitle-1 font-weight-bold">
            Asset Details
          </span>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="showDetailsDialog = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text
          v-if="selectedAsset"
          class="pa-5"
        >
          <!-- HEADER -->
          <div
            class="d-flex flex-wrap align-center ga-3 mb-6"
          >
            <v-avatar
              size="52"
              color="primary"
              variant="tonal"
            >
              <v-icon>
                mdi-package-variant-closed
              </v-icon>
            </v-avatar>

            <div class="flex-grow-1">
              <div class="text-h6 font-weight-bold">
                {{ selectedAsset.assetName }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedAsset.assetNo }}
              </div>
            </div>

            <v-chip
              :color="getStatusColor(selectedAsset.status)"
              variant="tonal"
            >
              {{ selectedAsset.status }}
            </v-chip>
          </div>

          <!-- BASIC INFORMATION -->
          <div class="section-title mb-3">
            Basic Information
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
                  {{ selectedAsset.category }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Brand
                </div>

                <div class="detail-value">
                  {{ selectedAsset.brand || "-" }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Model
                </div>

                <div class="detail-value">
                  {{ selectedAsset.model || "-" }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Serial Number
                </div>

                <div class="detail-value">
                  {{ selectedAsset.serialNo || "-" }}
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- ASSIGNMENT -->
          <div class="section-title mt-6 mb-3">
            Assignment & Location
          </div>

          <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Department
                </div>

                <div class="detail-value">
                  {{ selectedAsset.department }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Location
                </div>

                <div class="detail-value">
                  {{ selectedAsset.location }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Assigned To
                </div>

                <div class="detail-value">
                  {{ selectedAsset.assignedTo || "-" }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Condition
                </div>

                <div>
                  <v-chip
                    :color="getConditionColor(selectedAsset.condition)"
                    size="small"
                    variant="tonal"
                  >
                    {{ selectedAsset.condition }}
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- PURCHASE -->
          <div class="section-title mt-6 mb-3">
            Purchase Information
          </div>

          <v-row>
            <v-col
              cols="12"
              sm="4"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Purchase Date
                </div>

                <div class="detail-value">
                  {{ formatDate(selectedAsset.purchaseDate) }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="4"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Purchase Cost
                </div>

                <div class="detail-value">
                  {{ formatCurrency(selectedAsset.purchaseCost) }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="4"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Warranty Expiry
                </div>

                <div class="detail-value">
                  {{ formatDate(selectedAsset.warrantyExpiry) }}
                </div>
              </div>
            </v-col>
          </v-row>

          <!-- NOTES -->
          <div class="section-title mt-6 mb-3">
            Notes
          </div>

          <div class="detail-box">
            <div class="detail-value text-body-2">
              {{ selectedAsset.notes || "-" }}
            </div>
          </div>
        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="showDetailsDialog = false"
          >
            Close
          </v-btn>

          <v-btn
            v-if="selectedAsset"
            color="primary"
            rounded="lg"
            prepend-icon="mdi-pencil-outline"
            @click="editSelectedAsset"
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
      {{ snackbarText }}

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
import { computed, watch } from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"

import {
  useAssetsEquipment,
  type AssetCategory,
  type AssetCondition,
  type AssetStatus,
} from "@/composables/useAssetsEquipment"

const {
  assets,
  departments,
  locations,
  users,

  search,
  selectedCategory,
  selectedDepartment,
  selectedStatus,
  selectedCondition,

  currentPage,
  itemsPerPage,

  filteredAssets,
  paginatedAssets,
  totalPages,

  totalAssets,
  availableAssets,
  assignedAssets,
  maintenanceAssets,

  activeFilterCount,

  showAssetDialog,
  showDetailsDialog,

  editingAssetId,
  selectedAsset,

  assetForm,

  snackbar,
  snackbarText,
  snackbarColor,

  openCreateDialog,
  openEditDialog,
  openDetailsDialog,

  saveAsset,
  deleteAsset,

  resetFilters,
  clearSelection,
} = useAssetsEquipment()

/* */

const assetCategories: AssetCategory[] = [
  "IT Equipment",
  "Office Equipment",
  "Furniture",
  "Electrical Equipment",
  "Production Equipment",
  "Other",
]

const assetStatuses: AssetStatus[] = [
  "Available",
  "Assigned",
  "In Use",
  "Under Maintenance",
  "Disposed",
  "Lost",
]

const assetConditions: AssetCondition[] = [
  "New",
  "Good",
  "Fair",
  "Poor",
]

/* */

const headers = [
  {
    title: "Asset",
    key: "asset",
    sortable: false,
    minWidth: 220,
  },
  {
    title: "Category",
    key: "category",
    sortable: false,
    minWidth: 170,
  },
  {
    title: "Department",
    key: "department",
    sortable: false,
    minWidth: 210,
  },
  {
    title: "Location",
    key: "location",
    sortable: false,
    minWidth: 160,
  },
  {
    title: "Purchase Date",
    key: "purchaseDate",
    sortable: false,
    minWidth: 140,
  },
  {
    title: "Purchase Cost",
    key: "purchaseCost",
    sortable: false,
    minWidth: 140,
  },
  {
    title: "Condition",
    key: "condition",
    sortable: false,
    minWidth: 120,
  },
  {
    title: "Status",
    key: "status",
    sortable: false,
    minWidth: 160,
  },
  {
    title: "Actions",
    key: "actions",
    sortable: false,
    align: "end" as const,
    minWidth: 130,
  },
]

/* */

const paginationStart = computed(() => {
  if (!filteredAssets.value.length) {
    return 0
  }

  return (
    (currentPage.value - 1) *
      itemsPerPage.value +
    1
  )
})

const paginationEnd = computed(() => {
  return Math.min(
    currentPage.value *
      itemsPerPage.value,
    filteredAssets.value.length,
  )
})

/* */

watch(
  [
    search,
    selectedCategory,
    selectedDepartment,
    selectedStatus,
    selectedCondition,
  ],
  () => {
    currentPage.value = 1
  },
)

watch(
  totalPages,
  () => {
    if (
      currentPage.value >
      totalPages.value
    ) {
      currentPage.value =
        totalPages.value
    }
  },
)

/* */

function formatCurrency(value: number) {
  return new Intl.NumberFormat(
    "en-MY",
    {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    },
  ).format(value)
}

function formatDate(value: string) {
  if (!value) {
    return "-"
  }

  const date = new Date(
    `${value}T00:00:00`,
  )

  if (Number.isNaN(date.getTime())) {
    return "-"
  }

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
  status: AssetStatus,
) {
  switch (status) {
    case "Available":
      return "success"

    case "Assigned":
      return "info"

    case "In Use":
      return "primary"

    case "Under Maintenance":
      return "warning"

    case "Disposed":
      return "grey"

    case "Lost":
      return "error"

    default:
      return "grey"
  }
}

function getConditionColor(
  condition: AssetCondition,
) {
  switch (condition) {
    case "New":
      return "success"

    case "Good":
      return "info"

    case "Fair":
      return "warning"

    case "Poor":
      return "error"

    default:
      return "grey"
  }
}

function editSelectedAsset() {
  if (!selectedAsset.value) {
    return
  }

  openEditDialog(
    selectedAsset.value,
  )

  showDetailsDialog.value = false
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

.pagination-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 20px;
  flex-wrap: wrap;
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