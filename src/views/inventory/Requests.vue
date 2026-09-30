<template>
  <v-container fluid class="pa-6">

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
        Requests
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
          Requests
        </h1>

        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage inventory requests, approvals and item fulfilment.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openNewRequest"
      >
        New Request
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
          title="Total Requests"
          :value="totalRequests"
          icon="mdi-clipboard-list-outline"
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
          title="Approved Requests"
          :value="approvedRequests"
          icon="mdi-check-circle-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Pending Fulfilment"
          :value="pendingFulfilment"
          icon="mdi-package-variant"
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
            mdi-clipboard-list-outline
          </v-icon>
          All Requests
        </v-tab>

        <v-tab value="departments">
          <v-icon start>
            mdi-domain
          </v-icon>
          Department Requests
        </v-tab>

        <v-tab value="my-requests">
          <v-icon start>
            mdi-account-outline
          </v-icon>
          My Requests
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
           ALL REQUESTS
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
                  Inventory Requests
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Search and manage inventory requests.
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
                      Filter Requests
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
                    v-model="filters.requestType"
                    label="Request Type"
                    :items="requestTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.priority"
                    label="Priority"
                    :items="priorityOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    class="mb-3"
                  />

                  <v-select
                    v-model="filters.status"
                    label="Request Status"
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
              label="Search requests"
              placeholder="Search by request number, item, requester, department..."
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
              :items="filteredRequests"
              :items-per-page="itemsPerPage"
              :page="page"
              hide-default-footer
              hover
            >

              <!-- Request Number -->
              <template #item.requestNo="{ item }">

                <div>
                  <div class="font-weight-medium">
                    {{ item.requestNo }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.requestType }}
                  </div>
                </div>

              </template>

              <!-- Requester / Department -->
              <template #item.requester="{ item }">

                <div class="font-weight-medium">
                  {{ item.requester }}
                </div>

                <div class="text-caption text-medium-emphasis">
                  {{ item.department }}
                </div>

              </template>

              <!-- Request Date -->
              <template #item.requestDate="{ item }">
                {{ formatDate(item.requestDate) }}
              </template>

              <!-- Required Date -->
              <template #item.requiredDate="{ item }">
                {{ formatDate(item.requiredDate) }}
              </template>

              <!-- Items -->
              <template #item.items="{ item }">

                <div>
                  <div class="font-weight-medium">
                    {{ item.items.length }} item{{ item.items.length > 1 ? "s" : "" }}
                  </div>

                  <div
                    class="text-caption text-medium-emphasis item-preview"
                  >
                    {{ getItemPreview(item) }}
                  </div>
                </div>

              </template>

              <!-- Priority -->
              <template #item.priority="{ item }">

                <v-chip
                  :color="getPriorityColor(item.priority)"
                  size="small"
                  variant="tonal"
                >
                  {{ item.priority }}
                </v-chip>

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
                    @click="viewRequest(item)"
                  />

                  <v-btn
                    icon="mdi-pencil-outline"
                    variant="text"
                    size="small"
                    :disabled="item.status !== 'Draft'"
                    @click="editRequest(item)"
                  />

                  <v-btn
                    icon="mdi-delete-outline"
                    variant="text"
                    size="small"
                    color="error"
                    :disabled="item.status !== 'Draft'"
                    @click="deleteRequest(item)"
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
                    mdi-clipboard-off-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No requests found
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
                {{ filteredRequests.length }}
              </strong>

              requests

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
           DEPARTMENT REQUESTS
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
              class="request-card h-100"
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
                    {{ department.requestCount }} Requests
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
                    Total Items
                  </span>

                  <span class="font-weight-medium">
                    {{ department.totalItems }}
                  </span>

                </div>

                <div class="department-row">

                  <span class="department-label">
                    Pending Approval
                  </span>

                  <v-chip
                    size="small"
                    :color="
                      department.pendingApproval > 0
                        ? 'warning'
                        : 'success'
                    "
                    variant="tonal"
                  >
                    {{ department.pendingApproval }}
                  </v-chip>

                </div>

                <div class="department-row">

                  <span class="department-label">
                    Pending Fulfilment
                  </span>

                  <v-chip
                    size="small"
                    :color="
                      department.pendingFulfilment > 0
                        ? 'info'
                        : 'success'
                    "
                    variant="tonal"
                  >
                    {{ department.pendingFulfilment }}
                  </v-chip>

                </div>

                <v-btn
                  variant="text"
                  color="primary"
                  class="px-0 mt-3"
                  append-icon="mdi-arrow-right"
                  @click="filterByDepartment(department.name)"
                >
                  View Requests
                </v-btn>

              </div>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>

      <!-- =======================================================
           MY REQUESTS
           ======================================================= -->
      <v-window-item value="my-requests">

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
                  My Requests
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Inventory requests submitted by {{ currentUser }}.
                </p>

              </div>

              <v-icon
                color="primary"
                size="28"
              >
                mdi-account-outline
              </v-icon>

            </div>

            <v-row v-if="myRequests.length">

              <v-col
                v-for="request in myRequests"
                :key="request.id"
                cols="12"
                md="6"
                lg="4"
              >

                <v-card
                  border
                  rounded="xl"
                  elevation="0"
                  class="request-card h-100"
                >

                  <div class="pa-5">

                    <div
                      class="d-flex align-start justify-space-between mb-4"
                    >

                      <div>

                        <div class="text-subtitle-1 font-weight-bold">
                          {{ request.requestNo }}
                        </div>

                        <div class="text-caption text-medium-emphasis">
                          {{ formatDate(request.requestDate) }}
                        </div>

                      </div>

                      <v-chip
                        :color="getStatusColor(request.status)"
                        size="small"
                        variant="tonal"
                      >
                        {{ request.status }}
                      </v-chip>

                    </div>

                    <div class="text-body-1 font-weight-medium mb-1">
                      {{ request.requestType }}
                    </div>

                    <div class="text-body-2 text-medium-emphasis">
                      {{ request.department }}
                    </div>

                    <v-divider class="my-4" />

                    <div class="department-row">

                      <span class="department-label">
                        Required Date
                      </span>

                      <span>
                        {{ formatDate(request.requiredDate) }}
                      </span>

                    </div>

                    <div class="department-row">

                      <span class="department-label">
                        Items
                      </span>

                      <span>
                        {{ getTotalQuantity(request) }}
                      </span>

                    </div>

                    <div class="department-row">

                      <span class="department-label">
                        Priority
                      </span>

                      <v-chip
                        :color="getPriorityColor(request.priority)"
                        size="small"
                        variant="tonal"
                      >
                        {{ request.priority }}
                      </v-chip>

                    </div>

                    <div class="mt-3">

                      <v-chip
                        :color="
                          getApprovalColor(
                            request.approvalStatus,
                          )
                        "
                        size="small"
                        variant="tonal"
                      >
                        Approval:
                        {{ request.approvalStatus }}
                      </v-chip>

                    </div>

                    <v-btn
                      block
                      variant="outlined"
                      rounded="lg"
                      class="mt-4"
                      prepend-icon="mdi-eye-outline"
                      @click="viewRequest(request)"
                    >
                      View Request
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
                mdi-clipboard-list-outline
              </v-icon>

              <div class="text-body-1 font-weight-medium">
                No requests found
              </div>

              <div class="text-body-2 text-medium-emphasis">
                Your inventory requests will appear here.
              </div>

            </div>

          </div>

        </v-card>

      </v-window-item>

    </v-window>

    <!-- =========================================================
         NEW / EDIT REQUEST DIALOG
         ========================================================= -->
    <v-dialog
      v-model="requestDialog"
      max-width="950"
      scrollable
    >

      <v-card rounded="xl">

        <v-card-title class="pa-5 d-flex align-center">

          <div>

            <div class="text-subtitle-1 font-weight-bold">
              {{ editingRequestId ? "Edit Request" : "New Inventory Request" }}
            </div>

            <div class="text-caption text-medium-emphasis mt-1">
              Submit a request for inventory items.
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="requestDialog = false"
          />

        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <!-- Request Information -->
          <div class="section-title mb-4">
            Request Information
          </div>

          <v-row>

            <v-col
              cols="12"
              md="6"
            >

              <v-select
                v-model="requestForm.requestType"
                label="Request Type *"
                :items="requestTypeOptions"
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
                v-model="requestForm.department"
                label="Department *"
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

              <v-text-field
                v-model="requestForm.requiredDate"
                label="Required Date *"
                type="date"
                variant="outlined"
                density="comfortable"
              />

            </v-col>

            <v-col
              cols="12"
              md="6"
            >

              <v-select
                v-model="requestForm.priority"
                label="Priority *"
                :items="priorityOptions"
                variant="outlined"
                density="comfortable"
              />

            </v-col>

            <v-col cols="12">

              <v-textarea
                v-model="requestForm.purpose"
                label="Purpose / Remarks *"
                variant="outlined"
                density="comfortable"
                rows="3"
                maxlength="1000"
                counter
                placeholder="Enter the purpose of this inventory request..."
              />

            </v-col>

          </v-row>

          <!-- Request Items -->
          <div
            class="d-flex align-center justify-space-between mb-4 mt-3"
          >

            <div class="section-title">
              Request Items
            </div>

            <v-btn
              variant="outlined"
              color="primary"
              rounded="lg"
              size="small"
              prepend-icon="mdi-plus"
              @click="addRequestItem"
            >
              Add Item
            </v-btn>

          </div>

          <div class="request-items-form">

            <div
              v-for="(item, index) in requestForm.items"
              :key="item.id"
              class="request-item-form"
            >

              <div
                class="d-flex align-center justify-space-between mb-3"
              >

                <div class="text-body-2 font-weight-bold">
                  Item {{ index + 1 }}
                </div>

                <v-btn
                  v-if="requestForm.items.length > 1"
                  icon="mdi-delete-outline"
                  color="error"
                  variant="text"
                  size="small"
                  @click="removeRequestItem(index)"
                />

              </div>

              <v-row>

                <v-col
                  cols="12"
                  md="5"
                >

                  <v-select
                    v-model="item.itemCode"
                    label="Inventory Item *"
                    :items="inventoryItemOptions"
                    item-title="label"
                    item-value="code"
                    variant="outlined"
                    density="comfortable"
                    
                    @update:model-value="
                      updateItemFromInventory(index)
                    "
                  />

                </v-col>

                <v-col
                  cols="12"
                  md="3"
                >

                  <v-select
                    v-model="item.category"
                    label="Category"
                    :items="inventoryCategoryOptions"
                    variant="outlined"
                    density="comfortable"
                    readonly
                  />

                </v-col>

                <v-col
                  cols="12"
                  md="2"
                >

                  <v-text-field
                    v-model.number="item.quantity"
                    label="Quantity *"
                    type="number"
                    min="1"
                    variant="outlined"
                    density="comfortable"
                  />

                </v-col>

                <v-col
                  cols="12"
                  md="2"
                >

                  <v-text-field
                    v-model="item.unit"
                    label="Unit"
                    variant="outlined"
                    density="comfortable"
                    readonly
                  />

                </v-col>

              </v-row>

              <div
                v-if="item.itemCode"
                class="stock-info"
              >

                <v-icon
                  size="18"
                  class="mr-2"
                >
                  mdi-warehouse
                </v-icon>

                <span>
                  Available Stock:
                  <strong>
                    {{ item.availableStock }}
                  </strong>
                  {{ item.unit }}
                </span>

              </div>

            </div>

          </div>

          <!-- Notes -->
          <div class="section-title mt-5 mb-3">
            Additional Notes
          </div>

          <v-textarea
            v-model="requestForm.notes"
            label="Notes"
            variant="outlined"
            density="comfortable"
            rows="3"
            maxlength="1000"
            counter
            placeholder="Enter any additional information..."
          />

          <!-- Supporting Documents -->
          <div class="section-title mt-5 mb-3">
            Supporting Documents
          </div>

          <div
            class="request-upload"
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
              Attach supporting documents if required
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

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="requestDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded="lg"
            prepend-icon="mdi-content-save-outline"
            @click="saveRequest"
          >
            {{ editingRequestId ? "Save Changes" : "Save Request" }}
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

    <!-- =========================================================
         REQUEST DETAILS DIALOG
         ========================================================= -->
    <v-dialog
      v-model="detailsDialog"
      max-width="850"
      scrollable
    >

      <v-card rounded="xl">

        <v-card-title class="pa-5 d-flex align-center">

          <span class="text-subtitle-1 font-weight-bold">
            Request Details
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
          v-if="selectedRequest"
          class="pa-5"
        >

          <!-- Request Header -->
          <div
            class="d-flex flex-wrap align-center ga-3 mb-6"
          >

            <div class="flex-grow-1">

              <div class="text-h6 font-weight-bold">
                {{ selectedRequest.requestNo }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedRequest.requestType }}
              </div>

            </div>

            <v-chip
              :color="
                getStatusColor(
                  selectedRequest.status,
                )
              "
              variant="tonal"
            >
              {{ selectedRequest.status }}
            </v-chip>

            <v-chip
              :color="
                getApprovalColor(
                  selectedRequest.approvalStatus,
                )
              "
              variant="tonal"
            >
              {{ selectedRequest.approvalStatus }}
            </v-chip>

          </div>

          <!-- Request Details -->
          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="detail-box">

                <div class="detail-label">
                  Requester
                </div>

                <div class="detail-value">
                  {{ selectedRequest.requester }}
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
                  {{ selectedRequest.department }}
                </div>

              </div>

            </v-col>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="detail-box">

                <div class="detail-label">
                  Request Date
                </div>

                <div class="detail-value">
                  {{ formatDate(selectedRequest.requestDate) }}
                </div>

              </div>

            </v-col>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="detail-box">

                <div class="detail-label">
                  Required Date
                </div>

                <div class="detail-value">
                  {{ formatDate(selectedRequest.requiredDate) }}
                </div>

              </div>

            </v-col>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="detail-box">

                <div class="detail-label">
                  Priority
                </div>

                <div class="detail-value">

                  <v-chip
                    :color="
                      getPriorityColor(
                        selectedRequest.priority,
                      )
                    "
                    size="small"
                    variant="tonal"
                  >
                    {{ selectedRequest.priority }}
                  </v-chip>

                </div>

              </div>

            </v-col>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="detail-box">

                <div class="detail-label">
                  Total Quantity
                </div>

                <div class="detail-value">
                  {{ getTotalQuantity(selectedRequest) }}
                </div>

              </div>

            </v-col>

          </v-row>

          <!-- Purpose -->
          <div class="section-title mt-6 mb-3">
            Purpose / Remarks
          </div>

          <div class="detail-box">
            <div class="detail-value text-body-2">
              {{ selectedRequest.purpose || "-" }}
            </div>
          </div>

          <!-- Items -->
          <div class="section-title mt-6 mb-3">
            Requested Items
          </div>

          <div class="request-items">

            <div
              v-for="(item, index) in selectedRequest.items"
              :key="`${item.itemCode}-${index}`"
              class="request-item"
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
                    {{ item.itemName }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.itemCode }} · {{ item.category }}
                  </div>

                </div>

                <div class="text-right">

                  <div class="font-weight-medium">
                    {{ item.quantity }}
                    {{ item.unit }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    Available:
                    {{ item.availableStock }}
                    {{ item.unit }}
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
              {{ selectedRequest.notes || "-" }}
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
            v-if="selectedRequest?.status === 'Draft'"
            color="primary"
            rounded="lg"
            prepend-icon="mdi-pencil-outline"
            @click="editSelectedRequest"
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

type RequestStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Processing"
  | "Partially Fulfilled"
  | "Fulfilled"
  | "Rejected"
  | "Cancelled"

type ApprovalStatus =
  | "Pending"
  | "Approved"
  | "Rejected"

type RequestType =
  | "Stock Issue"
  | "Stock Transfer"
  | "New Stock"
  | "Return"

type Priority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent"

interface InventoryRequestItem {
  id: string
  itemCode: string
  itemName: string
  category: string
  quantity: number
  unit: string
  availableStock: number
}

interface InventoryRequest {
  id: string
  requestNo: string
  requestType: RequestType
  requester: string
  department: string
  requestDate: string
  requiredDate: string
  priority: Priority
  status: RequestStatus
  approvalStatus: ApprovalStatus
  purpose: string
  notes: string
  items: InventoryRequestItem[]
}

interface RequestFormItem {
  id: string
  itemCode: string
  itemName: string
  category: string
  quantity: number
  unit: string
  availableStock: number
}

interface RequestForm {
  requestType: RequestType | null
  department: string
  requiredDate: string
  priority: Priority
  purpose: string
  notes: string
  items: RequestFormItem[]
}

/* */

const tab = ref("all")

const search = ref("")
const page = ref(1)
const itemsPerPage = 10

const filterMenu = ref(false)

const requestDialog = ref(false)
const detailsDialog = ref(false)

const selectedRequest =
  ref<InventoryRequest | null>(null)

const editingRequestId =
  ref<string | null>(null)

const snackbar = ref(false)
const snackbarMessage = ref("")
const snackbarColor = ref("success")

const currentUser =
  ref("Muhammad Aiman")

const fileInput =
  ref<HTMLInputElement | null>(null)

const isDragging = ref(false)

const uploadedFiles =
  ref<File[]>([])

const filters = ref({
  department: null as string | null,
  requestType: null as RequestType | null,
  priority: null as Priority | null,
  status: null as RequestStatus | null,
  approvalStatus:
    null as ApprovalStatus | null,
})

/* */

function createEmptyRequestItem(): RequestFormItem {
  return {
    id: `ITEM-${Date.now()}-${Math.random()}`,
    itemCode: "",
    itemName: "",
    category: "",
    quantity: 1,
    unit: "Unit",
    availableStock: 0,
  }
}

function createEmptyRequestForm(): RequestForm {
  return {
    requestType: null,
    department: "",
    requiredDate: "",
    priority: "Medium",
    purpose: "",
    notes: "",
    items: [
      createEmptyRequestItem(),
    ],
  }
}

const requestForm =
  ref<RequestForm>(
    createEmptyRequestForm(),
  )

/* */

const headers = [
  {
    title: "Request No.",
    key: "requestNo",
    sortable: false,
    minWidth: 180,
  },
  {
    title: "Requester",
    key: "requester",
    sortable: false,
    minWidth: 210,
  },
  {
    title: "Request Date",
    key: "requestDate",
    sortable: false,
    minWidth: 130,
  },
  {
    title: "Required Date",
    key: "requiredDate",
    sortable: false,
    minWidth: 130,
  },
  {
    title: "Items",
    key: "items",
    sortable: false,
    minWidth: 230,
  },
  {
    title: "Priority",
    key: "priority",
    sortable: false,
    minWidth: 110,
  },
  {
    title: "Status",
    key: "status",
    sortable: false,
    minWidth: 160,
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

const requestTypeOptions: RequestType[] = [
  "Stock Issue",
  "Stock Transfer",
  "New Stock",
  "Return",
]

const priorityOptions: Priority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent",
]

const statusOptions: RequestStatus[] = [
  "Draft",
  "Pending Approval",
  "Approved",
  "Processing",
  "Partially Fulfilled",
  "Fulfilled",
  "Rejected",
  "Cancelled",
]

const approvalStatusOptions:
  ApprovalStatus[] = [
    "Pending",
    "Approved",
    "Rejected",
  ]

const inventoryCategoryOptions = [
  "IT Equipment",
  "Office Supplies",
  "Stationery",
  "Cleaning Supplies",
  "Safety Equipment",
  "Production Supplies",
  "Packaging Materials",
  "Pantry Supplies",
  "Others",
]

const inventoryItemOptions = [
  {
    code: "INV-IT-001",
    label: "INV-IT-001 — Laptop Computer",
    itemName: "Laptop Computer",
    category: "IT Equipment",
    unit: "Unit",
    availableStock: 12,
  },
  {
    code: "INV-IT-002",
    label: "INV-IT-002 — Wireless Keyboard",
    itemName: "Wireless Keyboard",
    category: "IT Equipment",
    unit: "Unit",
    availableStock: 25,
  },
  {
    code: "INV-IT-003",
    label: "INV-IT-003 — Wireless Mouse",
    itemName: "Wireless Mouse",
    category: "IT Equipment",
    unit: "Unit",
    availableStock: 32,
  },
  {
    code: "INV-IT-004",
    label: "INV-IT-004 — HDMI Cable",
    itemName: "HDMI Cable",
    category: "IT Equipment",
    unit: "Unit",
    availableStock: 48,
  },
  {
    code: "INV-OFF-001",
    label: "INV-OFF-001 — A4 Paper",
    itemName: "A4 Paper",
    category: "Office Supplies",
    unit: "Ream",
    availableStock: 85,
  },
  {
    code: "INV-OFF-002",
    label: "INV-OFF-002 — File Folder",
    itemName: "File Folder",
    category: "Stationery",
    unit: "Pack",
    availableStock: 60,
  },
  {
    code: "INV-OFF-003",
    label: "INV-OFF-003 — Ballpoint Pen",
    itemName: "Ballpoint Pen",
    category: "Stationery",
    unit: "Box",
    availableStock: 42,
  },
  {
    code: "INV-CLN-001",
    label: "INV-CLN-001 — Cleaning Solution",
    itemName: "Cleaning Solution",
    category: "Cleaning Supplies",
    unit: "Bottle",
    availableStock: 30,
  },
  {
    code: "INV-SAF-001",
    label: "INV-SAF-001 — Safety Gloves",
    itemName: "Safety Gloves",
    category: "Safety Equipment",
    unit: "Box",
    availableStock: 18,
  },
  {
    code: "INV-PRD-001",
    label: "INV-PRD-001 — Production Material",
    itemName: "Production Material",
    category: "Production Supplies",
    unit: "Box",
    availableStock: 75,
  },
]

/* */

const requests =
  ref<InventoryRequest[]>([
    {
      id: "REQ-001",
      requestNo: "REQ-2026-0001",
      requestType: "Stock Issue",
      requester: "Muhammad Aiman",
      department: "Information Technology",
      requestDate: "2026-09-03",
      requiredDate: "2026-09-08",
      priority: "High",
      status: "Approved",
      approvalStatus: "Approved",
      purpose:
        "Required for new employee onboarding and workstation setup.",
      notes:
        "Please prepare the equipment before the employee start date.",
      items: [
        {
          id: "REQ-001-1",
          itemCode: "INV-IT-002",
          itemName: "Wireless Keyboard",
          category: "IT Equipment",
          quantity: 5,
          unit: "Unit",
          availableStock: 25,
        },
        {
          id: "REQ-001-2",
          itemCode: "INV-IT-003",
          itemName: "Wireless Mouse",
          category: "IT Equipment",
          quantity: 5,
          unit: "Unit",
          availableStock: 32,
        },
      ],
    },

    {
      id: "REQ-002",
      requestNo: "REQ-2026-0002",
      requestType: "Stock Issue",
      requester: "Farah Nadia",
      department: "Human Resource",
      requestDate: "2026-09-04",
      requiredDate: "2026-09-10",
      priority: "Medium",
      status: "Pending Approval",
      approvalStatus: "Pending",
      purpose:
        "Office supplies required for HR daily operations.",
      notes:
        "Monthly office supplies request.",
      items: [
        {
          id: "REQ-002-1",
          itemCode: "INV-OFF-001",
          itemName: "A4 Paper",
          category: "Office Supplies",
          quantity: 20,
          unit: "Ream",
          availableStock: 85,
        },
        {
          id: "REQ-002-2",
          itemCode: "INV-OFF-002",
          itemName: "File Folder",
          category: "Stationery",
          quantity: 10,
          unit: "Pack",
          availableStock: 60,
        },
      ],
    },

    {
      id: "REQ-003",
      requestNo: "REQ-2026-0003",
      requestType: "Stock Transfer",
      requester: "Daniel Tan",
      department: "Information Technology",
      requestDate: "2026-08-27",
      requiredDate: "2026-09-05",
      priority: "High",
      status: "Processing",
      approvalStatus: "Approved",
      purpose:
        "Transfer IT equipment from central inventory to IT support area.",
      notes:
        "Transfer to IT support storage location.",
      items: [
        {
          id: "REQ-003-1",
          itemCode: "INV-IT-004",
          itemName: "HDMI Cable",
          category: "IT Equipment",
          quantity: 10,
          unit: "Unit",
          availableStock: 48,
        },
      ],
    },

    {
      id: "REQ-004",
      requestNo: "REQ-2026-0004",
      requestType: "Stock Issue",
      requester: "Jason Lim",
      department: "Finance",
      requestDate: "2026-08-20",
      requiredDate: "2026-08-25",
      priority: "Low",
      status: "Fulfilled",
      approvalStatus: "Approved",
      purpose:
        "Stationery requirements for Finance department.",
      notes:
        "Request completed and issued by Inventory.",
      items: [
        {
          id: "REQ-004-1",
          itemCode: "INV-OFF-003",
          itemName: "Ballpoint Pen",
          category: "Stationery",
          quantity: 5,
          unit: "Box",
          availableStock: 42,
        },
      ],
    },

    {
      id: "REQ-005",
      requestNo: "REQ-2026-0005",
      requestType: "New Stock",
      requester: "Muhammad Aiman",
      department: "Information Technology",
      requestDate: "2026-09-08",
      requiredDate: "2026-09-20",
      priority: "Urgent",
      status: "Pending Approval",
      approvalStatus: "Pending",
      purpose:
        "Additional IT accessories required for upcoming onboarding.",
      notes:
        "Priority request due to upcoming employee onboarding.",
      items: [
        {
          id: "REQ-005-1",
          itemCode: "INV-IT-002",
          itemName: "Wireless Keyboard",
          category: "IT Equipment",
          quantity: 8,
          unit: "Unit",
          availableStock: 25,
        },
        {
          id: "REQ-005-2",
          itemCode: "INV-IT-003",
          itemName: "Wireless Mouse",
          category: "IT Equipment",
          quantity: 8,
          unit: "Unit",
          availableStock: 32,
        },
      ],
    },

    {
      id: "REQ-006",
      requestNo: "REQ-2026-0006",
      requestType: "Return",
      requester: "Aina Rahman",
      department: "Procurement",
      requestDate: "2026-08-15",
      requiredDate: "2026-08-18",
      priority: "Low",
      status: "Fulfilled",
      approvalStatus: "Approved",
      purpose:
        "Return of unused office supplies to inventory.",
      notes:
        "Items returned in good condition.",
      items: [
        {
          id: "REQ-006-1",
          itemCode: "INV-OFF-001",
          itemName: "A4 Paper",
          category: "Office Supplies",
          quantity: 5,
          unit: "Ream",
          availableStock: 85,
        },
      ],
    },

    {
      id: "REQ-007",
      requestNo: "REQ-2026-0007",
      requestType: "Stock Issue",
      requester: "Muhammad Aiman",
      department: "Information Technology",
      requestDate: "2026-09-10",
      requiredDate: "2026-09-15",
      priority: "Medium",
      status: "Draft",
      approvalStatus: "Pending",
      purpose:
        "IT accessories for application support activities.",
      notes:
        "Draft request pending final review.",
      items: [
        {
          id: "REQ-007-1",
          itemCode: "INV-IT-004",
          itemName: "HDMI Cable",
          category: "IT Equipment",
          quantity: 3,
          unit: "Unit",
          availableStock: 48,
        },
      ],
    },

    {
      id: "REQ-008",
      requestNo: "REQ-2026-0008",
      requestType: "Stock Issue",
      requester: "Michelle Wong",
      department: "Sales & Marketing",
      requestDate: "2026-08-28",
      requiredDate: "2026-09-05",
      priority: "Medium",
      status: "Partially Fulfilled",
      approvalStatus: "Approved",
      purpose:
        "Marketing campaign materials and office supplies.",
      notes:
        "Part of the requested items has been issued.",
      items: [
        {
          id: "REQ-008-1",
          itemCode: "INV-OFF-001",
          itemName: "A4 Paper",
          category: "Office Supplies",
          quantity: 10,
          unit: "Ream",
          availableStock: 85,
        },
        {
          id: "REQ-008-2",
          itemCode: "INV-OFF-003",
          itemName: "Ballpoint Pen",
          category: "Stationery",
          quantity: 3,
          unit: "Box",
          availableStock: 42,
        },
      ],
    },

    {
      id: "REQ-009",
      requestNo: "REQ-2026-0009",
      requestType: "Stock Issue",
      requester: "Hafiz Rahman",
      department: "Production",
      requestDate: "2026-09-01",
      requiredDate: "2026-09-12",
      priority: "High",
      status: "Approved",
      approvalStatus: "Approved",
      purpose:
        "Production material replenishment.",
      notes:
        "Inventory team to prepare requested material.",
      items: [
        {
          id: "REQ-009-1",
          itemCode: "INV-PRD-001",
          itemName: "Production Material",
          category: "Production Supplies",
          quantity: 15,
          unit: "Box",
          availableStock: 75,
        },
      ],
    },

    {
      id: "REQ-010",
      requestNo: "REQ-2026-0010",
      requestType: "Stock Issue",
      requester: "Syafiq Ismail",
      department: "Quality Assurance",
      requestDate: "2026-08-30",
      requiredDate: "2026-09-18",
      priority: "Medium",
      status: "Rejected",
      approvalStatus: "Rejected",
      purpose:
        "Request for additional safety equipment.",
      notes:
        "Request rejected following stock allocation review.",
      items: [
        {
          id: "REQ-010-1",
          itemCode: "INV-SAF-001",
          itemName: "Safety Gloves",
          category: "Safety Equipment",
          quantity: 20,
          unit: "Box",
          availableStock: 18,
        },
      ],
    },
  ])

/* */

const totalRequests = computed(() => {
  return requests.value.length
})

const pendingApproval = computed(() => {
  return requests.value.filter(
    (request) =>
      request.approvalStatus === "Pending",
  ).length
})

const approvedRequests = computed(() => {
  return requests.value.filter(
    (request) =>
      request.approvalStatus === "Approved",
  ).length
})

const pendingFulfilment = computed(() => {
  return requests.value.filter(
    (request) =>
      request.status === "Approved" ||
      request.status === "Processing" ||
      request.status === "Partially Fulfilled",
  ).length
})

const myRequests = computed(() => {
  return requests.value.filter(
    (request) =>
      request.requester ===
      currentUser.value,
  )
})

const activeFilterCount = computed(() => {
  return Object.values(
    filters.value,
  ).filter(Boolean).length
})

const filteredRequests = computed(() => {
  const keyword =
    search.value
      .trim()
      .toLowerCase()

  return requests.value.filter(
    (request) => {

      const itemSearchValues =
        request.items.flatMap(
          (item) => [
            item.itemCode,
            item.itemName,
            item.category,
          ],
        )

      const matchesSearch =
        !keyword ||
        [
          request.requestNo,
          request.requestType,
          request.requester,
          request.department,
          request.priority,
          request.status,
          request.approvalStatus,
          ...itemSearchValues,
        ].some((value) =>
          value
            .toLowerCase()
            .includes(keyword),
        )

      const matchesDepartment =
        !filters.value.department ||
        request.department ===
          filters.value.department

      const matchesRequestType =
        !filters.value.requestType ||
        request.requestType ===
          filters.value.requestType

      const matchesPriority =
        !filters.value.priority ||
        request.priority ===
          filters.value.priority

      const matchesStatus =
        !filters.value.status ||
        request.status ===
          filters.value.status

      const matchesApproval =
        !filters.value.approvalStatus ||
        request.approvalStatus ===
          filters.value.approvalStatus

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesRequestType &&
        matchesPriority &&
        matchesStatus &&
        matchesApproval
      )
    },
  )
})

const pageCount = computed(() => {
  return Math.max(
    1,
    Math.ceil(
      filteredRequests.value.length /
        itemsPerPage,
    ),
  )
})

const paginationStart = computed(() => {
  if (!filteredRequests.value.length) {
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
    page.value *
      itemsPerPage,
    filteredRequests.value.length,
  )
})

const departmentCards = computed(() => {
  return departmentOptions.map(
    (department) => {

      const departmentRequests =
        requests.value.filter(
          (request) =>
            request.department ===
            department,
        )

      const requesters =
        new Set(
          departmentRequests.map(
            (request) =>
              request.requester,
          ),
        )

      const totalItems =
        departmentRequests.reduce(
          (sum, request) =>
            sum +
            getTotalQuantity(request),
          0,
        )

      const pendingApproval =
        departmentRequests.filter(
          (request) =>
            request.approvalStatus ===
            "Pending",
        ).length

      const pendingFulfilment =
        departmentRequests.filter(
          (request) =>
            request.status ===
              "Approved" ||
            request.status ===
              "Processing" ||
            request.status ===
              "Partially Fulfilled",
        ).length

      return {
        name: department,
        requestCount:
          departmentRequests.length,
        requesterCount:
          requesters.size,
        totalItems,
        pendingApproval,
        pendingFulfilment,
      }
    },
  )
})

/* */

watch(
  [
    search,
    () => filters.value.department,
    () => filters.value.requestType,
    () => filters.value.priority,
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
    if (
      page.value >
      pageCount.value
    ) {
      page.value =
        pageCount.value
    }
  },
)

/* */

function formatDate(value: string) {
  if (!value) {
    return "-"
  }

  const date =
    new Date(`${value}T00:00:00`)

  return new Intl.DateTimeFormat(
    "en-MY",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  ).format(date)
}

function getTotalQuantity(
  request: InventoryRequest,
) {
  return request.items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0,
  )
}

function getItemPreview(
  request: InventoryRequest,
) {
  return request.items
    .map(
      (item) =>
        `${item.itemName} (${item.quantity})`,
    )
    .join(", ")
}

function getStatusColor(
  status: RequestStatus,
) {
  switch (status) {
    case "Draft":
      return "grey"

    case "Pending Approval":
      return "warning"

    case "Approved":
      return "success"

    case "Processing":
      return "info"

    case "Partially Fulfilled":
      return "orange"

    case "Fulfilled":
      return "success"

    case "Rejected":
      return "error"

    case "Cancelled":
      return "error"

    default:
      return "grey"
  }
}

function getPriorityColor(
  priority: Priority,
) {
  switch (priority) {
    case "Low":
      return "grey"

    case "Medium":
      return "info"

    case "High":
      return "warning"

    case "Urgent":
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
  snackbarMessage.value =
    message

  snackbarColor.value =
    color

  snackbar.value = true
}

/* */

function clearFilters() {
  filters.value = {
    department: null,
    requestType: null,
    priority: null,
    status: null,
    approvalStatus: null,
  }
}

function filterByDepartment(
  department: string,
) {
  filters.value.department =
    department

  filters.value.requestType =
    null

  filters.value.priority =
    null

  filters.value.status =
    null

  filters.value.approvalStatus =
    null

  tab.value = "all"
}

/* */

function openNewRequest() {
  editingRequestId.value = null

  requestForm.value =
    createEmptyRequestForm()

  uploadedFiles.value = []

  isDragging.value = false

  requestDialog.value = true
}

function addRequestItem() {
  requestForm.value.items.push(
    createEmptyRequestItem(),
  )
}

function removeRequestItem(
  index: number,
) {
  if (
    requestForm.value.items.length <=
    1
  ) {
    return
  }

  requestForm.value.items.splice(
    index,
    1,
  )
}

function updateItemFromInventory(
  index: number,
) {
  const formItem =
    requestForm.value.items[index]

  if (!formItem) {
    return
  }

  const inventoryItem =
    inventoryItemOptions.find(
      (item) =>
        item.code ===
        formItem.itemCode,
    )

  if (!inventoryItem) {
    return
  }

  formItem.itemName =
    inventoryItem.itemName

  formItem.category =
    inventoryItem.category

  formItem.unit =
    inventoryItem.unit

  formItem.availableStock =
    inventoryItem.availableStock
}

function validateRequestForm() {
  if (!requestForm.value.requestType) {
    showSnackbar(
      "Please select a request type.",
      "error",
    )

    return false
  }

  if (!requestForm.value.department) {
    showSnackbar(
      "Please select a department.",
      "error",
    )

    return false
  }

  if (!requestForm.value.requiredDate) {
    showSnackbar(
      "Please select the required date.",
      "error",
    )

    return false
  }

  if (!requestForm.value.purpose.trim()) {
    showSnackbar(
      "Please enter the purpose / remarks.",
      "error",
    )

    return false
  }

  if (
    !requestForm.value.items.length
  ) {
    showSnackbar(
      "Please add at least one item.",
      "error",
    )

    return false
  }

  for (
    const item
    of requestForm.value.items
  ) {

    if (!item.itemCode) {
      showSnackbar(
        "Please select an inventory item for all item rows.",
        "error",
      )

      return false
    }

    if (
      !item.quantity ||
      item.quantity < 1
    ) {
      showSnackbar(
        "Item quantity must be at least 1.",
        "error",
      )

      return false
    }
  }

  return true
}

function saveRequest() {
  if (!validateRequestForm()) {
    return
  }

  if (editingRequestId.value) {
    const existing =
      requests.value.find(
        (request) =>
          request.id ===
          editingRequestId.value,
      )

    if (existing) {
      existing.requestType =
        requestForm.value.requestType as RequestType

      existing.department =
        requestForm.value.department

      existing.requiredDate =
        requestForm.value.requiredDate

      existing.priority =
        requestForm.value.priority

      existing.purpose =
        requestForm.value.purpose.trim()

      existing.notes =
        requestForm.value.notes.trim()

      existing.items =
        requestForm.value.items.map(
          (item) => ({
            id: item.id,
            itemCode: item.itemCode,
            itemName: item.itemName,
            category: item.category,
            quantity: item.quantity,
            unit: item.unit,
            availableStock:
              item.availableStock,
          }),
        )
    }

    requestDialog.value = false
    editingRequestId.value = null

    showSnackbar(
      "Inventory request updated successfully.",
    )

    return
  }

  const nextNumber =
    requests.value.length + 1

  const today =
    new Date()
      .toISOString()
      .split("T")[0]

  const newRequest: InventoryRequest = {
    id:
      `REQ-${String(nextNumber).padStart(3, "0")}`,

    requestNo:
      `REQ-${new Date().getFullYear()}-${String(
        nextNumber,
      ).padStart(4, "0")}`,

    requestType:
      requestForm.value.requestType as RequestType,

    requester:
      currentUser.value,

    department:
      requestForm.value.department,

    requestDate:
      today,

    requiredDate:
      requestForm.value.requiredDate,

    priority:
      requestForm.value.priority,

    status:
      "Draft",

    approvalStatus:
      "Pending",

    purpose:
      requestForm.value.purpose.trim(),

    notes:
      requestForm.value.notes.trim(),

    items:
      requestForm.value.items.map(
        (item) => ({
          id: item.id,
          itemCode: item.itemCode,
          itemName: item.itemName,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          availableStock:
            item.availableStock,
        }),
      ),
  }

  requests.value.push(
    newRequest,
  )

  requestDialog.value = false

  showSnackbar(
    `${newRequest.requestNo} created successfully.`,
  )
}

/* */

function editRequest(
  request: InventoryRequest,
) {
  if (request.status !== "Draft") {
    return
  }

  editingRequestId.value =
    request.id

  requestForm.value = {
    requestType:
      request.requestType,

    department:
      request.department,

    requiredDate:
      request.requiredDate,

    priority:
      request.priority,

    purpose:
      request.purpose,

    notes:
      request.notes,

    items:
      request.items.map(
        (item) => ({
          id: item.id,
          itemCode: item.itemCode,
          itemName: item.itemName,
          category: item.category,
          quantity: item.quantity,
          unit: item.unit,
          availableStock:
            item.availableStock,
        }),
      ),
  }

  uploadedFiles.value = []

  detailsDialog.value = false

  requestDialog.value = true
}

function editSelectedRequest() {
  if (!selectedRequest.value) {
    return
  }

  editRequest(
    selectedRequest.value,
  )
}

function deleteRequest(
  request: InventoryRequest,
) {
  if (request.status !== "Draft") {
    return
  }

  const index =
    requests.value.findIndex(
      (item) =>
        item.id === request.id,
    )

  if (index === -1) {
    return
  }

  requests.value.splice(
    index,
    1,
  )

  showSnackbar(
    `${request.requestNo} deleted successfully.`,
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
  uploadedFiles.value.push(
    ...files,
  )

  showSnackbar(
    `${files.length} file(s) attached.`,
  )
}

function removeFile(
  index: number,
) {
  uploadedFiles.value.splice(
    index,
    1,
  )
}

/* */

function viewRequest(
  request: InventoryRequest,
) {
  selectedRequest.value =
    request

  detailsDialog.value = true
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

.request-card {
  border: 1px solid #d9d9d9 !important;
  border-radius: 16px !important;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.request-card:hover {
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

.item-preview {
  max-width: 210px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.request-items-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.request-item-form {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  background: #fafafa;
}

.stock-info {
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 9px 12px;
  background: rgba(
    var(--v-theme-primary),
    0.05
  );
  color: rgb(var(--v-theme-primary));
  font-size: 13px;
}

.request-upload {
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

.request-upload:hover {
  border-color: #9e9e9e;
  background: #fafafa;
}

.request-upload.dragging {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(
    var(--v-theme-primary),
    0.04
  );
}

.request-items {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
}

.request-item {
  padding: 14px 16px;
  border-bottom: 1px solid #eeeeee;
}

.request-item:last-child {
  border-bottom: none;
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