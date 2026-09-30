<template>
  <v-container fluid class="pa-6">

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
        Purchase Orders
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
          Purchase Orders
        </h1>

        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage purchase orders, approvals, suppliers and procurement terms.
        </p>
      </div>

      <!-- NEW ORDER IS A BUTTON, NOT A TAB -->
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openNewOrder"
      >
        New Order
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
          title="Total Orders"
          :value="totalOrders"
          icon="mdi-cart-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Pending Approval"
          :value="pendingApproval"
          icon="mdi-clock-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Approved Orders"
          :value="approvedOrders"
          icon="mdi-check-circle-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Total Value"
          :value="formatCurrency(totalValue)"
          icon="mdi-cash-multiple"
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
            mdi-cart-outline
          </v-icon>
          All Orders
        </v-tab>

        <v-tab value="departments">
          <v-icon start>
            mdi-domain
          </v-icon>
          Department Orders
        </v-tab>

        <v-tab value="my-orders">
          <v-icon start>
            mdi-account-outline
          </v-icon>
          My Orders
        </v-tab>

        <v-tab value="terms">
          <v-icon start>
            mdi-file-document-outline
          </v-icon>
          Terms & Conditions
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
           ALL ORDERS
           ======================================================= -->
      <v-window-item value="all">
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
                  Purchase Orders
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Search and manage purchase orders.
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
                      Filter Purchase Orders
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
                    v-model="filters.supplier"
                    label="Supplier"
                    :items="supplierOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.status"
                    label="PO Status"
                    :items="statusOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.approvalStatus"
                    label="Approval Status"
                    :items="approvalStatusOptions"
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
              label="Search purchase orders"
              placeholder="Search by PO number, supplier, requester, department..."
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
              :items="filteredOrders"
              :items-per-page="itemsPerPage"
              :page="page"
              hide-default-footer
              hover
            >

              <!-- PO Number -->
              <template #item.poNumber="{ item }">
                <div>
                  <div class="font-weight-medium">
                    {{ item.poNumber }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.orderType }}
                  </div>
                </div>
              </template>

              <!-- Supplier -->
              <template #item.supplier="{ item }">
                <div class="font-weight-medium">
                  {{ item.supplier }}
                </div>
              </template>

              <!-- Department -->
              <template #item.department="{ item }">
                <div>
                  {{ item.department }}
                </div>

                <div class="text-caption text-medium-emphasis">
                  {{ item.requester }}
                </div>
              </template>

              <!-- PO Date -->
              <template #item.poDate="{ item }">
                {{ formatDate(item.poDate) }}
              </template>

              <!-- Total -->
              <template #item.totalAmount="{ item }">
                <span class="font-weight-medium">
                  {{ formatCurrency(item.totalAmount) }}
                </span>
              </template>

              <!-- PO Status -->
              <template #item.status="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  size="small"
                  variant="tonal"
                >
                  {{ item.status }}
                </v-chip>
              </template>

              <!-- Approval -->
              <template #item.approvalStatus="{ item }">
                <v-chip
                  :color="getApprovalColor(item.approvalStatus)"
                  size="small"
                  variant="tonal"
                >
                  {{ item.approvalStatus }}
                </v-chip>
              </template>

              <!-- Actions -->
              <template #item.actions="{ item }">
                <div class="d-flex align-center ga-1">
                  <v-btn
                    icon="mdi-eye-outline"
                    variant="text"
                    size="small"
                    @click="viewOrder(item)"
                  />

                  <v-btn
                    icon="mdi-pencil-outline"
                    variant="text"
                    size="small"
                    :disabled="item.status !== 'Draft'"
                    @click="editOrder(item)"
                  />

                  <v-btn
                    icon="mdi-delete-outline"
                    variant="text"
                    size="small"
                    color="error"
                    :disabled="item.status !== 'Draft'"
                    @click="deleteOrder(item)"
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
                    mdi-cart-off
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No purchase orders found
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
                {{ filteredOrders.length }}
              </strong>

              orders
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
           DEPARTMENT ORDERS
           ======================================================= -->
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
              class="purchase-card h-100"
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
                      mdi-domain
                    </v-icon>
                  </v-avatar>

                  <v-chip
                    size="small"
                    variant="tonal"
                  >
                    {{ department.orderCount }} Orders
                  </v-chip>
                </div>

                <div class="text-subtitle-1 font-weight-bold">
                  {{ department.name }}
                </div>

                <div class="text-body-2 text-medium-emphasis mt-1">
                  {{ department.requesterCount }} Requesters
                </div>

                <v-divider class="my-4" />

                <div class="department-row">
                  <span class="department-label">
                    Total Value
                  </span>

                  <span class="font-weight-medium">
                    {{ formatCurrency(department.totalValue) }}
                  </span>
                </div>

                <div class="department-row">
                  <span class="department-label">
                    Pending Approval
                  </span>

                  <v-chip
                    size="small"
                    :color="
                      department.pending > 0
                        ? 'warning'
                        : 'success'
                    "
                    variant="tonal"
                  >
                    {{ department.pending }}
                  </v-chip>
                </div>

                <v-btn
                  variant="text"
                  color="primary"
                  class="px-0 mt-3"
                  append-icon="mdi-arrow-right"
                  @click="filterByDepartment(department.name)"
                >
                  View Orders
                </v-btn>

              </div>
            </v-card>
          </v-col>

        </v-row>
      </v-window-item>

      <!-- =======================================================
           MY ORDERS
           ======================================================= -->
      <v-window-item value="my-orders">
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
                  My Orders
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Purchase orders submitted by {{ currentUser }}.
                </p>
              </div>

              <v-icon
                color="primary"
                size="28"
              >
                mdi-account-outline
              </v-icon>
            </div>

            <v-row v-if="myOrders.length">
              <v-col
                v-for="order in myOrders"
                :key="order.id"
                cols="12"
                md="6"
                lg="4"
              >
                <v-card
                  border
                  rounded="xl"
                  elevation="0"
                  class="purchase-card h-100"
                >
                  <div class="pa-5">

                    <div
                      class="d-flex align-start justify-space-between mb-4"
                    >
                      <div>
                        <div class="text-subtitle-1 font-weight-bold">
                          {{ order.poNumber }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                          {{ formatDate(order.poDate) }}
                        </div>
                      </div>

                      <v-chip
                        :color="getStatusColor(order.status)"
                        size="small"
                        variant="tonal"
                      >
                        {{ order.status }}
                      </v-chip>
                    </div>

                    <div class="text-body-1 font-weight-medium mb-1">
                      {{ order.supplier }}
                    </div>

                    <div class="text-body-2 text-medium-emphasis">
                      {{ order.department }}
                    </div>

                    <v-divider class="my-4" />

                    <div class="department-row">
                      <span class="department-label">
                        Order Type
                      </span>

                      <span>
                        {{ order.orderType }}
                      </span>
                    </div>

                    <div class="department-row">
                      <span class="department-label">
                        Delivery Date
                      </span>

                      <span>
                        {{ formatDate(order.deliveryDate) }}
                      </span>
                    </div>

                    <div class="department-row">
                      <span class="department-label">
                        Total
                      </span>

                      <span class="font-weight-bold">
                        {{ formatCurrency(order.totalAmount) }}
                      </span>
                    </div>

                    <div class="mt-3">
                      <v-chip
                        :color="
                          getApprovalColor(
                            order.approvalStatus,
                          )
                        "
                        size="small"
                        variant="tonal"
                      >
                        Approval:
                        {{ order.approvalStatus }}
                      </v-chip>
                    </div>

                    <v-btn
                      block
                      variant="outlined"
                      rounded="lg"
                      class="mt-4"
                      prepend-icon="mdi-eye-outline"
                      @click="viewOrder(order)"
                    >
                      View Order
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
                mdi-cart-outline
              </v-icon>

              <div class="text-body-1 font-weight-medium">
                No orders found
              </div>

              <div class="text-body-2 text-medium-emphasis">
                Your purchase orders will appear here.
              </div>
            </div>

          </div>
        </v-card>
      </v-window-item>

      <!-- =======================================================
           TERMS & CONDITIONS
           ======================================================= -->
      <v-window-item value="terms">
        <v-card
          border
          rounded="xl"
          elevation="0"
        >
          <div class="pa-5">

            <div
              class="d-flex flex-wrap align-center justify-space-between ga-4 mb-5"
            >
              <div>
                <h2 class="text-subtitle-1 font-weight-bold">
                  Terms & Conditions
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Manage procurement terms and conditions applied to purchase orders.
                </p>
              </div>

              <!-- NEW TERMS BUTTON -->
              <v-btn
                color="primary"
                prepend-icon="mdi-plus"
                rounded="lg"
                @click="openNewTerm"
              >
                New
              </v-btn>
            </div>

            <v-expansion-panels
              variant="accordion"
              multiple
            >
              <v-expansion-panel
                v-for="(term, index) in terms"
                :key="term.id"
                class="term-panel"
              >
                <v-expansion-panel-title>
                  <div class="d-flex align-center w-100 ga-3">

                    <v-avatar
                      size="34"
                      color="primary"
                      variant="tonal"
                    >
                      <span class="text-caption font-weight-bold">
                        {{ String(index + 1).padStart(2, "0") }}
                      </span>
                    </v-avatar>

                    <div class="flex-grow-1">
                      <div class="font-weight-medium">
                        {{ term.title }}
                      </div>

                      <div class="text-caption text-medium-emphasis">
                        Applicable for: {{ term.applicableFor }}
                      </div>
                    </div>

                    <v-chip
                      v-if="term.mandatory"
                      color="error"
                      size="small"
                      variant="tonal"
                      class="mr-3"
                    >
                      Mandatory
                    </v-chip>

                  </div>
                </v-expansion-panel-title>

                <v-expansion-panel-text>
                  <div class="term-content">

                    <div class="text-body-2 text-medium-emphasis mb-4">
                      {{ term.description }}
                    </div>

                    <div class="d-flex justify-end ga-2">
                      <v-btn
                        variant="text"
                        size="small"
                        prepend-icon="mdi-pencil-outline"
                        @click="editTerm(term)"
                      >
                        Edit
                      </v-btn>

                      <v-btn
                        variant="text"
                        size="small"
                        color="error"
                        prepend-icon="mdi-delete-outline"
                        @click="deleteTerm(term)"
                      >
                        Delete
                      </v-btn>
                    </div>

                  </div>
                </v-expansion-panel-text>

              </v-expansion-panel>
            </v-expansion-panels>

            <div
              v-if="!terms.length"
              class="text-center pa-10"
            >
              <v-icon
                size="52"
                color="grey"
                class="mb-3"
              >
                mdi-file-document-outline
              </v-icon>

              <div class="text-body-1 font-weight-medium">
                No Terms & Conditions
              </div>

              <div class="text-body-2 text-medium-emphasis">
                Click New to add a procurement term.
              </div>
            </div>

          </div>
        </v-card>
      </v-window-item>

    </v-window>

    <!-- =========================================================
         ADD ASSET / NEW ORDER DIALOG
         ========================================================= -->
    <v-dialog
      v-model="assetDialog"
      max-width="900"
      scrollable
    >
      <v-card rounded="xl">

        <v-card-title class="pa-5 d-flex align-center">
          <div>
            <div class="text-subtitle-1 font-weight-bold">
              Add Asset
            </div>

            <div class="text-caption text-medium-emphasis mt-1">
              Add an asset or item to create a new purchase order.
            </div>
          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="assetDialog = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <!-- Asset Information -->
          <div class="section-title mb-4">
            Asset Information
          </div>

          <v-row>

            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                v-model="assetForm.asset"
                label="Asset"
                variant="outlined"
                density="comfortable"
                placeholder="e.g. Laptop Computer"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="assetForm.category"
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
              <v-text-field
                v-model="assetForm.subcategory"
                label="Subcategory"
                variant="outlined"
                density="comfortable"
                placeholder="e.g. Notebook"
              />
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <v-select
                v-model="assetForm.vendorSupplier"
                label="Vendor / Supplier *"
                :items="supplierOptions"
                variant="outlined"
                density="comfortable"
                clearable
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="assetForm.description"
                label="Description / Specifications *"
                variant="outlined"
                density="comfortable"
                rows="5"
                maxlength="2000"
                counter
                placeholder="Enter item description or specifications..."
              />

              <div class="text-caption text-medium-emphasis mt-n3 mb-2">
                {{ descriptionWordCount }} words |
                {{ assetForm.description.length }} / 2000 characters
              </div>
            </v-col>

          </v-row>

          <!-- Product Details -->
          <div class="section-title mt-3 mb-4">
            Product Details
          </div>

          <v-row>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.brand"
                label="Brand"
                variant="outlined"
                density="comfortable"
                placeholder="e.g. Dell"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.manufacturer"
                label="Manufacturer"
                variant="outlined"
                density="comfortable"
                placeholder="e.g. Dell Technologies"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.model"
                label="Model"
                variant="outlined"
                density="comfortable"
                placeholder="e.g. Latitude 5440"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.hsCode"
                label="HS Code"
                variant="outlined"
                density="comfortable"
                placeholder="HS Code"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="assetForm.currency"
                label="Currency"
                :items="currencyOptions"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model.number="assetForm.pieces"
                label="Pieces"
                type="number"
                min="1"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model.number="assetForm.unitCost"
                label="MYR / Unit Cost"
                type="number"
                min="0"
                variant="outlined"
                density="comfortable"
                prefix="RM"
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                :model-value="formatCurrency(assetTotalCost)"
                label="Total Cost"
                variant="outlined"
                density="comfortable"
                readonly
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="assetForm.department"
                label="Department *"
                :items="departmentOptions"
                variant="outlined"
                density="comfortable"
                clearable
              />
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="assetForm.requiredDeliveryDate"
                label="Required Delivery Date"
                type="date"
                variant="outlined"
                density="comfortable"
              />
            </v-col>

          </v-row>

          <!-- Cost Split -->
          <div class="section-title mt-3 mb-3">
            Cost Split
          </div>

          <v-radio-group
            v-model="assetForm.costSplit"
            hide-details
          >
            <v-radio
              label="Do not split cost"
              value="none"
            />

            <v-radio
              label="Split cost by quantity"
              value="quantity"
            />

            <v-radio
              label="Split cost by percentage (%)"
              value="percentage"
            />
          </v-radio-group>

          <!-- Supporting Documents -->
          <div class="section-title mt-5 mb-3">
            Supporting Documents
          </div>

          <div
            class="asset-upload"
            :class="{ dragging: isDragging }"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
          >
            <input
              ref="fileInput"
              type="file"
              multiple
              hidden
              @change="handleFileChange"
            />

            <v-icon
              size="42"
              color="primary"
              class="mb-3"
            >
              mdi-cloud-upload-outline
            </v-icon>

            <div class="text-body-1 font-weight-medium">
              Drag & Drop files here or click to upload
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Attach supporting documents (e.g. quotation & comparison)
            </div>
          </div>

          <div
            v-if="uploadedFiles.length"
            class="d-flex flex-wrap ga-2 mt-3"
          >
            <v-chip
              v-for="(file, index) in uploadedFiles"
              :key="`${file.name}-${index}`"
              closable
              variant="tonal"
              prepend-icon="mdi-file-outline"
              @click:close="removeFile(index)"
            >
              {{ file.name }}
            </v-chip>
          </div>

          <!-- Add Another -->
          <v-checkbox
            v-model="assetForm.addAnotherItem"
            label="Add another item?"
            hide-details
            class="mt-4"
          />

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="assetDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded="lg"
            prepend-icon="mdi-content-save-outline"
            @click="saveAssetOrder"
          >
            Save Order
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- =========================================================
         ADD / EDIT TERMS & CONDITIONS DIALOG
         ========================================================= -->
    <v-dialog
      v-model="termDialog"
      max-width="650"
    >
      <v-card rounded="xl">

        <v-card-title class="pa-5 d-flex align-center">
          <div>
            <div class="text-subtitle-1 font-weight-bold">
              {{ editingTermId ? "Edit Terms & Conditions" : "Add Terms & Conditions" }}
            </div>

            <div class="text-caption text-medium-emphasis mt-1">
              Define a procurement term and its applicability.
            </div>
          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="termDialog = false"
          />
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <v-select
            v-model="termForm.applicableFor"
            label="Applicable for"
            :items="applicableForOptions"
            variant="outlined"
            density="comfortable"
            clearable
            class="mb-4"
          />

          <v-text-field
            v-model="termForm.title"
            label="Title *"
            placeholder="e.g.: ABC Policy"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <v-textarea
            v-model="termForm.description"
            label="Description *"
            variant="outlined"
            density="comfortable"
            rows="6"
            maxlength="2000"
            hide-details
            placeholder="Enter terms and conditions..."
          />

          <div class="text-caption text-medium-emphasis mt-2">
            {{ termDescriptionWordCount }} words |
            {{ termForm.description.length }} / 2000 characters
          </div>

          <v-checkbox
            v-model="termForm.mandatory"
            label="Is Mandatory?"
            hide-details
            class="mt-4"
          />

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">
          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="termDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded="lg"
            prepend-icon="mdi-content-save-outline"
            @click="saveTerm"
          >
            {{ editingTermId ? "Save Changes" : "Save" }}
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- =========================================================
         PURCHASE ORDER DETAILS DIALOG
         ========================================================= -->
    <v-dialog
      v-model="detailsDialog"
      max-width="800"
      scrollable
    >
      <v-card rounded="xl">

        <v-card-title class="pa-5 d-flex align-center">
          <span class="text-subtitle-1 font-weight-bold">
            Purchase Order Details
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
          v-if="selectedOrder"
          class="pa-5"
        >

          <!-- PO Header -->
          <div class="d-flex flex-wrap align-center ga-3 mb-6">

            <div class="flex-grow-1">
              <div class="text-h6 font-weight-bold">
                {{ selectedOrder.poNumber }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedOrder.orderType }}
              </div>
            </div>

            <v-chip
              :color="getStatusColor(selectedOrder.status)"
              variant="tonal"
            >
              {{ selectedOrder.status }}
            </v-chip>

            <v-chip
              :color="
                getApprovalColor(
                  selectedOrder.approvalStatus,
                )
              "
              variant="tonal"
            >
              {{ selectedOrder.approvalStatus }}
            </v-chip>

          </div>

          <!-- Details -->
          <v-row>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Supplier
                </div>

                <div class="detail-value">
                  {{ selectedOrder.supplier }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Requester
                </div>

                <div class="detail-value">
                  {{ selectedOrder.requester }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Department
                </div>

                <div class="detail-value">
                  {{ selectedOrder.department }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  PO Date
                </div>

                <div class="detail-value">
                  {{ formatDate(selectedOrder.poDate) }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Delivery Date
                </div>

                <div class="detail-value">
                  {{ formatDate(selectedOrder.deliveryDate) }}
                </div>
              </div>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <div class="detail-box">
                <div class="detail-label">
                  Total Amount
                </div>

                <div class="detail-value">
                  {{ formatCurrency(selectedOrder.totalAmount) }}
                </div>
              </div>
            </v-col>

          </v-row>

          <!-- Items -->
          <div class="section-title mt-6 mb-3">
            Order Items
          </div>

          <div class="order-items">

            <div
              v-for="(item, index) in selectedOrder.items"
              :key="`${item.item}-${index}`"
              class="order-item"
            >
              <div class="d-flex align-start ga-3">

                <v-avatar
                  size="36"
                  color="primary"
                  variant="tonal"
                >
                  <span class="text-caption font-weight-bold">
                    {{ index + 1 }}
                  </span>
                </v-avatar>

                <div class="flex-grow-1">
                  <div class="font-weight-medium">
                    {{ item.description }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.item }}
                  </div>
                </div>

                <div class="text-right">
                  <div class="font-weight-medium">
                    {{ item.quantity }} ×
                    {{ formatCurrency(item.unitPrice) }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ formatCurrency(item.quantity * item.unitPrice) }}
                  </div>
                </div>

              </div>
            </div>

          </div>

          <!-- Notes -->
          <div class="section-title mt-6 mb-3">
            Notes
          </div>

          <div class="detail-box">
            <div class="detail-value text-body-2">
              {{ selectedOrder.notes || "-" }}
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
            v-if="selectedOrder?.status === 'Draft'"
            color="primary"
            rounded="lg"
            prepend-icon="mdi-pencil-outline"
            @click="editSelectedOrder"
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
import { computed, ref, watch } from "vue"
import AppSummaryCard from "@/components/common/AppSummaryCard.vue"

/* */

type POStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Ordered"
  | "Partially Received"
  | "Completed"
  | "Cancelled"

type ApprovalStatus =
  | "Pending"
  | "Approved"
  | "Rejected"

type CostSplit =
  | "none"
  | "quantity"
  | "percentage"

interface PurchaseOrderItem {
  item: string
  description: string
  quantity: number
  unitPrice: number
}

interface PurchaseOrder {
  id: string
  poNumber: string
  orderType: string
  supplier: string
  requester: string
  department: string
  poDate: string
  deliveryDate: string
  totalAmount: number
  status: POStatus
  approvalStatus: ApprovalStatus
  items: PurchaseOrderItem[]
  notes: string
}

interface AssetForm {
  asset: string
  category: string
  subcategory: string
  vendorSupplier: string
  description: string
  brand: string
  manufacturer: string
  model: string
  hsCode: string
  currency: string
  department: string
  requiredDeliveryDate: string
  pieces: number
  unitCost: number
  costSplit: CostSplit
  addAnotherItem: boolean
}

interface TermItem {
  id: string
  applicableFor: string
  title: string
  description: string
  mandatory: boolean
}

interface TermForm {
  applicableFor: string
  title: string
  description: string
  mandatory: boolean
}

/* */

const tab = ref("all")

const search = ref("")
const page = ref(1)
const itemsPerPage = 10

const filterMenu = ref(false)

const detailsDialog = ref(false)
const selectedOrder = ref<PurchaseOrder | null>(null)

const assetDialog = ref(false)

const termDialog = ref(false)
const editingTermId = ref<string | null>(null)

const snackbar = ref(false)
const snackbarMessage = ref("")
const snackbarColor = ref("success")

const currentUser = ref("Muhammad Aiman")

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const uploadedFiles = ref<File[]>([])

const filters = ref({
  department: null as string | null,
  supplier: null as string | null,
  status: null as POStatus | null,
  approvalStatus: null as ApprovalStatus | null,
})

/* */

function createEmptyAssetForm(): AssetForm {
  return {
    asset: "",
    category: "",
    subcategory: "",
    vendorSupplier: "",
    description: "",
    brand: "",
    manufacturer: "",
    model: "",
    hsCode: "",
    currency: "MYR — Malaysian Ringgit",
    department: "",
    requiredDeliveryDate: "",
    pieces: 1,
    unitCost: 0,
    costSplit: "none",
    addAnotherItem: false,
  }
}

const assetForm = ref<AssetForm>(
  createEmptyAssetForm(),
)

/* */

function createEmptyTermForm(): TermForm {
  return {
    applicableFor: "All Purchase Orders",
    title: "",
    description: "",
    mandatory: false,
  }
}

const termForm = ref<TermForm>(
  createEmptyTermForm(),
)

/* */

const headers = [
  {
    title: "PO Number",
    key: "poNumber",
    sortable: false,
    minWidth: 180,
  },
  {
    title: "Supplier",
    key: "supplier",
    sortable: false,
    minWidth: 220,
  },
  {
    title: "Department",
    key: "department",
    sortable: false,
    minWidth: 210,
  },
  {
    title: "PO Date",
    key: "poDate",
    sortable: false,
    minWidth: 120,
  },
  {
    title: "Total Amount",
    key: "totalAmount",
    sortable: false,
    minWidth: 150,
  },
  {
    title: "PO Status",
    key: "status",
    sortable: false,
    minWidth: 150,
  },
  {
    title: "Approval",
    key: "approvalStatus",
    sortable: false,
    minWidth: 130,
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

const supplierOptions = [
  "ABC Office Supplies Sdn Bhd",
  "Tech Solutions Sdn Bhd",
  "Kotra Medical Supplies",
  "Mega Stationery Sdn Bhd",
  "Secure Network Systems",
  "Office Furniture Enterprise",
]

const categoryOptions = [
  "IT Equipment",
  "Office Supplies",
  "Furniture",
  "Network Services",
  "Marketing Materials",
  "Production Supplies",
  "Quality Equipment",
  "Software",
  "Professional Services",
  "Others",
]

const currencyOptions = [
  "MYR — Malaysian Ringgit",
  "USD — US Dollar",
  "SGD — Singapore Dollar",
  "EUR — Euro",
  "GBP — British Pound",
]

const statusOptions: POStatus[] = [
  "Draft",
  "Pending Approval",
  "Approved",
  "Ordered",
  "Partially Received",
  "Completed",
  "Cancelled",
]

const approvalStatusOptions: ApprovalStatus[] = [
  "Pending",
  "Approved",
  "Rejected",
]

const applicableForOptions = [
  "All Purchase Orders",
  "IT Equipment",
  "Office Supplies",
  "Furniture",
  "Network Services",
  "Marketing Materials",
  "Production Supplies",
  "Quality Equipment",
  "Software",
  "Professional Services",
]

/* */

const orders = ref<PurchaseOrder[]>([
  {
    id: "PO-001",
    poNumber: "PO-2026-0001",
    orderType: "General Purchase",
    supplier: "Tech Solutions Sdn Bhd",
    requester: "Muhammad Aiman",
    department: "Information Technology",
    poDate: "2026-09-02",
    deliveryDate: "2026-09-15",
    totalAmount: 12500,
    status: "Approved",
    approvalStatus: "Approved",
    items: [
      {
        item: "IT-001",
        description: "Desktop Computer",
        quantity: 5,
        unitPrice: 1800,
      },
      {
        item: "IT-002",
        description: "27-inch Monitor",
        quantity: 5,
        unitPrice: 700,
      },
    ],
    notes: "IT equipment purchase for new employee onboarding.",
  },

  {
    id: "PO-002",
    poNumber: "PO-2026-0002",
    orderType: "Office Supplies",
    supplier: "ABC Office Supplies Sdn Bhd",
    requester: "Farah Nadia",
    department: "Human Resource",
    poDate: "2026-09-04",
    deliveryDate: "2026-09-12",
    totalAmount: 4250,
    status: "Pending Approval",
    approvalStatus: "Pending",
    items: [
      {
        item: "HR-001",
        description: "Office Files",
        quantity: 100,
        unitPrice: 15,
      },
      {
        item: "HR-002",
        description: "Printer Paper",
        quantity: 50,
        unitPrice: 55,
      },
    ],
    notes: "Monthly office supplies for HR department.",
  },

  {
    id: "PO-003",
    poNumber: "PO-2026-0003",
    orderType: "IT Equipment",
    supplier: "Secure Network Systems",
    requester: "Daniel Tan",
    department: "Information Technology",
    poDate: "2026-08-25",
    deliveryDate: "2026-09-10",
    totalAmount: 18900,
    status: "Ordered",
    approvalStatus: "Approved",
    items: [
      {
        item: "NET-001",
        description: "Network Switch",
        quantity: 3,
        unitPrice: 3500,
      },
      {
        item: "NET-002",
        description: "Network Access Point",
        quantity: 6,
        unitPrice: 1300,
      },
    ],
    notes: "Network infrastructure upgrade.",
  },

  {
    id: "PO-004",
    poNumber: "PO-2026-0004",
    orderType: "Furniture",
    supplier: "Office Furniture Enterprise",
    requester: "Jason Lim",
    department: "Finance",
    poDate: "2026-08-20",
    deliveryDate: "2026-09-05",
    totalAmount: 8750,
    status: "Completed",
    approvalStatus: "Approved",
    items: [
      {
        item: "FIN-001",
        description: "Office Desk",
        quantity: 5,
        unitPrice: 950,
      },
      {
        item: "FIN-002",
        description: "Office Chair",
        quantity: 5,
        unitPrice: 800,
      },
    ],
    notes: "Replacement furniture for Finance department.",
  },

  {
    id: "PO-005",
    poNumber: "PO-2026-0005",
    orderType: "IT Equipment",
    supplier: "Kotra Medical Supplies",
    requester: "Muhammad Aiman",
    department: "Information Technology",
    poDate: "2026-09-08",
    deliveryDate: "2026-09-22",
    totalAmount: 6300,
    status: "Pending Approval",
    approvalStatus: "Pending",
    items: [
      {
        item: "IT-003",
        description: "Laptop Computer",
        quantity: 2,
        unitPrice: 3150,
      },
    ],
    notes: "Laptop replacement and new user setup.",
  },

  {
    id: "PO-006",
    poNumber: "PO-2026-0006",
    orderType: "Office Supplies",
    supplier: "Mega Stationery Sdn Bhd",
    requester: "Aina Rahman",
    department: "Procurement",
    poDate: "2026-08-15",
    deliveryDate: "2026-08-25",
    totalAmount: 2800,
    status: "Completed",
    approvalStatus: "Approved",
    items: [
      {
        item: "PRC-001",
        description: "Stationery Supplies",
        quantity: 1,
        unitPrice: 2800,
      },
    ],
    notes: "General stationery supplies.",
  },

  {
    id: "PO-007",
    poNumber: "PO-2026-0007",
    orderType: "Network Services",
    supplier: "Secure Network Systems",
    requester: "Muhammad Aiman",
    department: "Information Technology",
    poDate: "2026-09-10",
    deliveryDate: "2026-09-30",
    totalAmount: 15200,
    status: "Draft",
    approvalStatus: "Pending",
    items: [
      {
        item: "NET-003",
        description: "Network Security Service",
        quantity: 1,
        unitPrice: 15200,
      },
    ],
    notes: "Annual network security service renewal.",
  },

  {
    id: "PO-008",
    poNumber: "PO-2026-0008",
    orderType: "Marketing Materials",
    supplier: "ABC Office Supplies Sdn Bhd",
    requester: "Michelle Wong",
    department: "Sales & Marketing",
    poDate: "2026-08-28",
    deliveryDate: "2026-09-08",
    totalAmount: 5400,
    status: "Partially Received",
    approvalStatus: "Approved",
    items: [
      {
        item: "MKT-001",
        description: "Promotional Materials",
        quantity: 1,
        unitPrice: 5400,
      },
    ],
    notes: "Marketing materials for company campaign.",
  },

  {
    id: "PO-009",
    poNumber: "PO-2026-0009",
    orderType: "Production Supplies",
    supplier: "Kotra Medical Supplies",
    requester: "Hafiz Rahman",
    department: "Production",
    poDate: "2026-09-01",
    deliveryDate: "2026-09-18",
    totalAmount: 22100,
    status: "Approved",
    approvalStatus: "Approved",
    items: [
      {
        item: "PRD-001",
        description: "Production Materials",
        quantity: 1,
        unitPrice: 22100,
      },
    ],
    notes: "Production material replenishment.",
  },

  {
    id: "PO-010",
    poNumber: "PO-2026-0010",
    orderType: "Quality Equipment",
    supplier: "Tech Solutions Sdn Bhd",
    requester: "Syafiq Ismail",
    department: "Quality Assurance",
    poDate: "2026-08-30",
    deliveryDate: "2026-09-20",
    totalAmount: 9800,
    status: "Cancelled",
    approvalStatus: "Rejected",
    items: [
      {
        item: "QA-001",
        description: "Quality Testing Equipment",
        quantity: 1,
        unitPrice: 9800,
      },
    ],
    notes: "Order cancelled following budget review.",
  },
])

/* */

const terms = ref<TermItem[]>([
  {
    id: "01",
    applicableFor: "All Purchase Orders",
    title: "Purchase Order Acceptance",
    description:
      "The supplier is required to acknowledge and accept the purchase order before processing the requested goods or services.",
    mandatory: true,
  },

  {
    id: "02",
    applicableFor: "All Purchase Orders",
    title: "Pricing and Payment",
    description:
      "Prices stated in the purchase order shall remain valid according to the agreed quotation. Payment will be processed according to the approved company payment terms.",
    mandatory: true,
  },

  {
    id: "03",
    applicableFor: "All Purchase Orders",
    title: "Delivery Requirements",
    description:
      "Goods or services must be delivered according to the delivery date, location and requirements stated in the purchase order.",
    mandatory: true,
  },

  {
    id: "04",
    applicableFor: "All Purchase Orders",
    title: "Quality Requirements",
    description:
      "All supplied goods and services must meet the specifications, quality standards and requirements stated in the purchase order.",
    mandatory: true,
  },

  {
    id: "05",
    applicableFor: "All Purchase Orders",
    title: "Documentation",
    description:
      "The supplier shall provide the required delivery order, invoice and other supporting documents for verification and payment processing.",
    mandatory: false,
  },

  {
    id: "06",
    applicableFor: "All Purchase Orders",
    title: "Changes to Purchase Order",
    description:
      "Any changes to quantity, pricing, delivery date or specifications must receive prior approval before implementation.",
    mandatory: true,
  },

  {
    id: "07",
    applicableFor: "All Purchase Orders",
    title: "Cancellation",
    description:
      "The company may cancel a purchase order subject to the applicable procurement terms and conditions.",
    mandatory: false,
  },

  {
    id: "08",
    applicableFor: "All Purchase Orders",
    title: "Compliance",
    description:
      "Suppliers are required to comply with applicable company policies, procurement requirements and relevant laws and regulations.",
    mandatory: true,
  },
])

/* */

const totalOrders = computed(() => {
  return orders.value.length
})

const pendingApproval = computed(() => {
  return orders.value.filter(
    (order) => order.approvalStatus === "Pending",
  ).length
})

const approvedOrders = computed(() => {
  return orders.value.filter(
    (order) => order.approvalStatus === "Approved",
  ).length
})

const totalValue = computed(() => {
  return orders.value.reduce(
    (total, order) => total + order.totalAmount,
    0,
  )
})

const myOrders = computed(() => {
  return orders.value.filter(
    (order) => order.requester === currentUser.value,
  )
})

const activeFilterCount = computed(() => {
  return Object.values(filters.value).filter(Boolean).length
})

const filteredOrders = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return orders.value.filter((order) => {

    const matchesSearch =
      !keyword ||
      [
        order.poNumber,
        order.orderType,
        order.supplier,
        order.requester,
        order.department,
        order.status,
        order.approvalStatus,
      ].some((value) =>
        value.toLowerCase().includes(keyword),
      )

    const matchesDepartment =
      !filters.value.department ||
      order.department === filters.value.department

    const matchesSupplier =
      !filters.value.supplier ||
      order.supplier === filters.value.supplier

    const matchesStatus =
      !filters.value.status ||
      order.status === filters.value.status

    const matchesApproval =
      !filters.value.approvalStatus ||
      order.approvalStatus ===
        filters.value.approvalStatus

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesSupplier &&
      matchesStatus &&
      matchesApproval
    )
  })
})

const pageCount = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredOrders.value.length /
        itemsPerPage,
    ),
  )
})

const paginationStart = computed(() => {
  if (!filteredOrders.value.length) {
    return 0
  }

  return (
    (page.value - 1) * itemsPerPage + 1
  )
})

const paginationEnd = computed(() => {
  return Math.min(
    page.value * itemsPerPage,
    filteredOrders.value.length,
  )
})

const departmentCards = computed(() => {
  return departmentOptions.map(
    (department) => {
      const departmentOrders =
        orders.value.filter(
          (order) =>
            order.department ===
            department,
        )

      const requesters = new Set(
        departmentOrders.map(
          (order) => order.requester,
        ),
      )

      const totalValue =
        departmentOrders.reduce(
          (sum, order) =>
            sum + order.totalAmount,
          0,
        )

      const pending =
        departmentOrders.filter(
          (order) =>
            order.approvalStatus ===
            "Pending",
        ).length

      return {
        name: department,
        orderCount:
          departmentOrders.length,
        requesterCount:
          requesters.size,
        totalValue,
        pending,
      }
    },
  )
})

const descriptionWordCount = computed(() => {
  return countWords(
    assetForm.value.description,
  )
})

const assetTotalCost = computed(() => {
  const pieces =
    Number(assetForm.value.pieces) || 0

  const unitCost =
    Number(assetForm.value.unitCost) || 0

  return Math.max(0, pieces) *
    Math.max(0, unitCost)
})

const termDescriptionWordCount = computed(() => {
  return countWords(
    termForm.value.description,
  )
})

/* */

watch(
  [
    search,
    () => filters.value.department,
    () => filters.value.supplier,
    () => filters.value.status,
    () => filters.value.approvalStatus,
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

function countWords(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 0
  }

  return trimmed.split(/\s+/).length
}

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

  const date = new Date(`${value}T00:00:00`)

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
  status: POStatus,
) {
  switch (status) {
    case "Draft":
      return "grey"

    case "Pending Approval":
      return "warning"

    case "Approved":
      return "success"

    case "Ordered":
      return "info"

    case "Partially Received":
      return "orange"

    case "Completed":
      return "success"

    case "Cancelled":
      return "error"

    default:
      return "grey"
  }
}

function getApprovalColor(
  status: ApprovalStatus,
) {
  switch (status) {
    case "Pending":
      return "warning"

    case "Approved":
      return "success"

    case "Rejected":
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
    department: null,
    supplier: null,
    status: null,
    approvalStatus: null,
  }
}

function filterByDepartment(
  department: string,
) {
  filters.value.department = department
  filters.value.supplier = null
  filters.value.status = null
  filters.value.approvalStatus = null

  tab.value = "all"
}

function filterByMyOrders() {
  tab.value = "my-orders"
}

/* */

function openNewOrder() {
  assetForm.value = createEmptyAssetForm()
  uploadedFiles.value = []
  isDragging.value = false

  assetDialog.value = true
}

function validateAssetForm() {
  if (!assetForm.value.category) {
    showSnackbar(
      "Please select a category.",
      "error",
    )

    return false
  }

  if (!assetForm.value.vendorSupplier) {
    showSnackbar(
      "Please select a vendor / supplier.",
      "error",
    )

    return false
  }

  if (
    !assetForm.value.description.trim()
  ) {
    showSnackbar(
      "Please enter the description / specifications.",
      "error",
    )

    return false
  }

  if (
    assetForm.value.description.length >
    2000
  ) {
    showSnackbar(
      "Description cannot exceed 2000 characters.",
      "error",
    )

    return false
  }

  if (
    !assetForm.value.department
  ) {
    showSnackbar(
      "Please select a department.",
      "error",
    )

    return false
  }

  if (
    !assetForm.value.pieces ||
    assetForm.value.pieces < 1
  ) {
    showSnackbar(
      "Pieces must be at least 1.",
      "error",
    )

    return false
  }

  if (
    assetForm.value.unitCost < 0
  ) {
    showSnackbar(
      "Unit cost cannot be negative.",
      "error",
    )

    return false
  }

  return true
}

function saveAssetOrder() {
  if (!validateAssetForm()) {
    return
  }

  const nextNumber =
    orders.value.length + 1

  const today =
    new Date()
      .toISOString()
      .split("T")[0]

  const newOrder: PurchaseOrder = {
    id: `PO-${String(nextNumber).padStart(3, "0")}`,

    poNumber:
      `PO-${new Date().getFullYear()}-${String(
        nextNumber,
      ).padStart(4, "0")}`,

    orderType:
      assetForm.value.category,

    supplier:
      assetForm.value.vendorSupplier,

    requester:
      currentUser.value,

    department:
      assetForm.value.department,

    poDate: today,

    deliveryDate:
      assetForm.value.requiredDeliveryDate ||
      today,

    totalAmount:
      assetTotalCost.value,

    status: "Draft",

    approvalStatus: "Pending",

    items: [
      {
        item:
          assetForm.value.asset ||
          `ASSET-${nextNumber}`,

        description:
          assetForm.value.description,

        quantity:
          assetForm.value.pieces,

        unitPrice:
          assetForm.value.unitCost,
      },
    ],

    notes:
      [
        assetForm.value.brand,
        assetForm.value.manufacturer,
        assetForm.value.model,
      ]
        .filter(Boolean)
        .join(" · ") ||
      assetForm.value.description,
  }

  orders.value.push(newOrder)

  if (assetForm.value.addAnotherItem) {
    assetForm.value = {
      ...createEmptyAssetForm(),
      department:
        assetForm.value.department,
      vendorSupplier:
        assetForm.value.vendorSupplier,
    }

    uploadedFiles.value = []

    showSnackbar(
      "Order item added successfully. You can add another item.",
    )

    return
  }

  assetDialog.value = false

  showSnackbar(
    `${newOrder.poNumber} created successfully.`,
  )
}

function editOrder(
  order: PurchaseOrder,
) {
  if (order.status !== "Draft") {
    return
  }

  const item = order.items[0]

  assetForm.value = {
    asset: item?.item || "",
    category: order.orderType,
    subcategory: "",
    vendorSupplier: order.supplier,
    description:
      item?.description || "",
    brand: "",
    manufacturer: "",
    model: "",
    hsCode: "",
    currency: "MYR — Malaysian Ringgit",
    department: order.department,
    requiredDeliveryDate:
      order.deliveryDate,
    pieces: item?.quantity || 1,
    unitCost: item?.unitPrice || 0,
    costSplit: "none",
    addAnotherItem: false,
  }

  selectedOrder.value = order
  detailsDialog.value = false
  assetDialog.value = true
}

function editSelectedOrder() {
  if (!selectedOrder.value) {
    return
  }

  editOrder(selectedOrder.value)
}

function deleteOrder(
  order: PurchaseOrder,
) {
  if (order.status !== "Draft") {
    return
  }

  const index =
    orders.value.findIndex(
      (item) => item.id === order.id,
    )

  if (index === -1) {
    return
  }

  orders.value.splice(index, 1)

  showSnackbar(
    `${order.poNumber} deleted successfully.`,
  )
}

/* */

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileChange(
  event: Event,
) {
  const target =
    event.target as HTMLInputElement

  if (!target.files) {
    return
  }

  addFiles(
    Array.from(target.files),
  )

  target.value = ""
}

function handleDrop(
  event: DragEvent,
) {
  isDragging.value = false

  if (!event.dataTransfer?.files) {
    return
  }

  addFiles(
    Array.from(
      event.dataTransfer.files,
    ),
  )
}

function addFiles(
  files: File[],
) {
  uploadedFiles.value.push(...files)

  showSnackbar(
    `${files.length} file(s) attached.`,
  )
}

function removeFile(
  index: number,
) {
  uploadedFiles.value.splice(index, 1)
}

/* */

function viewOrder(
  order: PurchaseOrder,
) {
  selectedOrder.value = order
  detailsDialog.value = true
}

/* */

function openNewTerm() {
  editingTermId.value = null
  termForm.value = createEmptyTermForm()
  termDialog.value = true
}

function editTerm(term: TermItem) {
  editingTermId.value = term.id

  termForm.value = {
    applicableFor:
      term.applicableFor,
    title: term.title,
    description:
      term.description,
    mandatory:
      term.mandatory,
  }

  termDialog.value = true
}

function saveTerm() {
  if (!termForm.value.title.trim()) {
    showSnackbar(
      "Please enter a title.",
      "error",
    )

    return
  }

  if (
    !termForm.value.description.trim()
  ) {
    showSnackbar(
      "Please enter a description.",
      "error",
    )

    return
  }

  if (
    termForm.value.description.length >
    2000
  ) {
    showSnackbar(
      "Description cannot exceed 2000 characters.",
      "error",
    )

    return
  }

  if (editingTermId.value) {
    const term =
      terms.value.find(
        (item) =>
          item.id ===
          editingTermId.value,
      )

    if (term) {
      Object.assign(term, {
        applicableFor:
          termForm.value
            .applicableFor,

        title:
          termForm.value.title.trim(),

        description:
          termForm.value.description.trim(),

        mandatory:
          termForm.value.mandatory,
      })
    }

    showSnackbar(
      "Terms & Conditions updated successfully.",
    )
  } else {
    const nextId =
      terms.value.length + 1

    terms.value.push({
      id: String(nextId).padStart(2, "0"),

      applicableFor:
        termForm.value.applicableFor,

      title:
        termForm.value.title.trim(),

      description:
        termForm.value.description.trim(),

      mandatory:
        termForm.value.mandatory,
    })

    showSnackbar(
      "Terms & Conditions added successfully.",
    )
  }

  termDialog.value = false
  editingTermId.value = null
}

function deleteTerm(
  term: TermItem,
) {
  const index =
    terms.value.findIndex(
      (item) => item.id === term.id,
    )

  if (index === -1) {
    return
  }

  terms.value.splice(index, 1)

  showSnackbar(
    "Terms & Conditions deleted successfully.",
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

.purchase-card {
  border: 1px solid #d9d9d9 !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.purchase-card:hover {
  transform: translateY(-2px);
  border-color: #bdbdbd !important;
  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;
}

.department-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 0;
  font-size: 14px;
}

.department-label {
  color: #757575;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
}

.asset-upload {
  min-height: 170px;
  border: 2px dashed #d0d0d0;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.asset-upload:hover {
  border-color: #9e9e9e;
  background: #fafafa;
}

.asset-upload.dragging {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(
    var(--v-theme-primary),
    0.04
  );
}

.term-panel {
  border: 1px solid #e0e0e0 !important;
  margin-bottom: 10px;
  border-radius: 12px !important;
  overflow: hidden;
}

.term-content {
  padding: 4px 0 8px;
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

.order-items {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

.order-item {
  padding: 14px 16px;
  border-bottom: 1px solid #eeeeee;
}

.order-item:last-child {
  border-bottom: none;
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