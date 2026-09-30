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
        mdi-clipboard-text-outline
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Requisitions
      </span>

      <v-icon
        size="18"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        General Requisitions
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
          General Requisition
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage general requisition requests and procurement records
        </p>

      </div>


      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="tab = 'new'"
      >
        New Requisition
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
          title="New Requisitions"
          :value="newRequisitionCount"
          icon="mdi-file-plus-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Pending Approval"
          :value="approvalRequisitionCount"
          icon="mdi-file-clock-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Rejected"
          :value="rejectedRequisitionCount"
          icon="mdi-file-remove-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Completed"
          :value="completedRequisitionCount"
          icon="mdi-file-check-outline"
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
            mdi-clipboard-text-outline
          </v-icon>

          Requisitions

        </v-tab>


        <v-tab value="new">

          <v-icon start>
            mdi-file-plus-outline
          </v-icon>

          New Requisition

        </v-tab>


        <v-tab value="approval">

          <v-icon start>
            mdi-file-clock-outline
          </v-icon>

          Approval

        </v-tab>


        <v-tab value="rejected">

          <v-icon start>
            mdi-file-remove-outline
          </v-icon>

          Rejected

        </v-tab>


        <v-tab value="completed">

          <v-icon start>
            mdi-file-check-outline
          </v-icon>

          Completed

        </v-tab>


        <v-tab value="history">

          <v-icon start>
            mdi-history
          </v-icon>

          History

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
           REQUISITIONS
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
                Requisition List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage general requisition requests
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
                  Filter Requisitions
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="departmentFilter"
                    label="Department"
                    :items="departmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-domain"
                    class="mb-3"
                  />


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
                    v-model="priorityFilter"
                    label="Priority"
                    :items="priorityOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-flag-outline"
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
              label="Search Requisition"
              placeholder="Search request no, requester, department or item"
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

                  <th>Request No</th>

                  <th>Requester</th>

                  <th>Department</th>

                  <th>Category</th>

                  <th>Item</th>

                  <th>Quantity</th>

                  <th>Priority</th>

                  <th>Required Date</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="requisition in paginatedRequisitions"
                  :key="requisition.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ requisition.requestNo }}
                    </span>

                  </td>


                  <td>
                    {{ requisition.requester }}
                  </td>


                  <td>
                    {{ requisition.department }}
                  </td>


                  <td>
                    {{ requisition.category }}
                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ requisition.item }}
                    </span>

                  </td>


                  <td>
                    {{ requisition.quantity }}
                    {{ requisition.unit }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="requisition.priority"
                      :color="getPriorityColor(requisition.priority)"
                    />

                  </td>


                  <td>
                    {{ requisition.requiredDate }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="requisition.status"
                      :color="getStatusColor(requisition.status)"
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
                          @click="viewRequisition(requisition)"
                        />

                      </template>

                    </v-tooltip>


                    <v-tooltip
                      v-if="
                        requisition.status === 'New' ||
                        requisition.status === 'Approval'
                      "
                      text="Reject"
                    >

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-file-remove-outline"
                          variant="text"
                          size="small"
                          color="error"
                          @click="rejectRequisition(requisition)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr
                  v-if="paginatedRequisitions.length === 0"
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
                      mdi-clipboard-text-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No requisitions found
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


          <!-- PAGINATION -->

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
                {{ filteredRequisitions.length }}
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
           NEW REQUISITION
           ========================================================== -->

      <v-window-item value="new">

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
                    New Requisition
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter requisition information to create a new request
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
                      v-model="requestNoInput"
                      label="Request No"
                      placeholder="e.g. GR-2026-001"
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
                      v-model="requesterInput"
                      label="Requester"
                      placeholder="e.g. Aiman Asri"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="selectedDepartment"
                      label="Department"
                      :items="departmentOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-domain"
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
                  >

                    <v-text-field
                      v-model="itemInput"
                      label="Item / Service"
                      placeholder="e.g. Laptop Docking Station"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-package-variant-closed"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-text-field
                      v-model.number="quantityInput"
                      label="Quantity"
                      type="number"
                      min="1"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-counter"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-select
                      v-model="selectedUnit"
                      label="Unit"
                      :items="unitOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-ruler"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="4"
                  >

                    <v-select
                      v-model="selectedPriority"
                      label="Priority"
                      :items="priorityOptions"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-flag-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="requiredDateInput"
                      label="Required Date"
                      type="date"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                  >

                    <v-textarea
                      v-model="descriptionInput"
                      label="Description / Justification"
                      placeholder="Enter the reason or justification for this requisition"
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
                  color="primary"
                  rounded="lg"
                  :disabled="!canRegisterRequisition"
                  @click="registerRequisition"
                >
                  Submit Requisition
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
                      Request No
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ requestNoInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Requester
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ requesterInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Department
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedDepartment || "-" }}
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
                      Item / Service
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ itemInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Quantity
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ quantityInput }}
                      {{ selectedUnit || "" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Priority
                    </div>

                    <div class="mt-1">

                      <AppStatusChip
                        :status="selectedPriority"
                        :color="getPriorityColor(selectedPriority)"
                      />

                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Required Date
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ requiredDateInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Status
                    </div>

                    <div class="mt-1">

                      <AppStatusChip
                        status="New"
                        color="primary"
                      />

                    </div>

                  </div>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>


      <!-- ==========================================================
           APPROVAL
           ========================================================== -->

      <v-window-item value="approval">

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
                Requisition Approval
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Review and process requisitions awaiting approval
              </p>

            </div>


            <v-menu
              v-model="approvalFilterMenu"
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
                  Filter Approval
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="approvalDepartmentFilter"
                    label="Department"
                    :items="departmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-domain"
                    class="mb-3"
                  />


                  <v-select
                    v-model="approvalCategoryFilter"
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
                    @click="clearApprovalFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="approvalFilterMenu = false"
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
              v-model="approvalSearch"
              label="Search Approval"
              placeholder="Search request no, requester or item"
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

                  <th>Request No</th>

                  <th>Requester</th>

                  <th>Department</th>

                  <th>Category</th>

                  <th>Item</th>

                  <th>Priority</th>

                  <th>Required Date</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="requisition in paginatedApprovalRequisitions"
                  :key="requisition.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ requisition.requestNo }}
                    </span>

                  </td>


                  <td>
                    {{ requisition.requester }}
                  </td>


                  <td>
                    {{ requisition.department }}
                  </td>


                  <td>
                    {{ requisition.category }}
                  </td>


                  <td>
                    {{ requisition.item }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="requisition.priority"
                      :color="getPriorityColor(requisition.priority)"
                    />

                  </td>


                  <td>
                    {{ requisition.requiredDate }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="requisition.status"
                      :color="getStatusColor(requisition.status)"
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
                          @click="viewRequisition(requisition)"
                        />

                      </template>

                    </v-tooltip>


                    <v-tooltip text="Approve">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-check-circle-outline"
                          variant="text"
                          size="small"
                          color="success"
                          @click="approveRequisition(requisition)"
                        />

                      </template>

                    </v-tooltip>


                    <v-tooltip text="Reject">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-close-circle-outline"
                          variant="text"
                          size="small"
                          color="error"
                          @click="rejectRequisition(requisition)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr
                  v-if="paginatedApprovalRequisitions.length === 0"
                >

                  <td
                    colspan="9"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-file-clock-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No requisitions awaiting approval
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Requisitions awaiting approval will appear here.
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
                v-model="approvalItemsPerPage"
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
                {{ approvalDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ approvalDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredApprovalRequisitions.length }}
              </span>

            </div>


            <v-pagination
              v-model="approvalPage"
              :length="approvalTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           REJECTED
           ========================================================== -->

      <v-window-item value="rejected">

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
                Rejected Requisitions
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View requisitions that have been rejected
              </p>

            </div>


            <v-menu
              v-model="rejectedFilterMenu"
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
                  Filter Rejected Requisitions
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="rejectedDepartmentFilter"
                    label="Department"
                    :items="departmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-domain"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearRejectedFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="rejectedFilterMenu = false"
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
              v-model="rejectedSearch"
              label="Search Requisition"
              placeholder="Search request no, requester or item"
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
                v-for="requisition in paginatedRejectedRequisitions"
                :key="requisition.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="requisition-card h-100"
                >

                  <!-- CARD HEADER -->

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="error"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-file-remove-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ requisition.requestNo }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ requisition.requester }}
                      </div>

                    </div>


                    <AppStatusChip
                      :status="requisition.status"
                      :color="getStatusColor(requisition.status)"
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
                        mdi-domain
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Department
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.department }}
                        </div>

                      </div>

                    </div>


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
                          {{ requisition.category }}
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
                          Item / Service
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.item }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-counter
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Quantity
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.quantity }}
                          {{ requisition.unit }}
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
                          Rejected Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.rejectedDate || "-" }}
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
                      @click="viewRequisition(requisition)"
                    >
                      View
                    </v-btn>

                    <v-spacer />

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-restore"
                      color="primary"
                      @click="returnToApproval(requisition)"
                    >
                      Return

                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <v-col
                v-if="paginatedRejectedRequisitions.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-file-remove-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No rejected requisitions found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Rejected requisitions will appear here.
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
                v-model="rejectedItemsPerPage"
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
                {{ rejectedDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ rejectedDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredRejectedRequisitions.length }}
              </span>

            </div>


            <v-pagination
              v-model="rejectedPage"
              :length="rejectedTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           COMPLETED
           ========================================================== -->

      <v-window-item value="completed">

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
                Completed Requisitions
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View requisitions that have been completed
              </p>

            </div>


            <v-menu
              v-model="completedFilterMenu"
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
                  Filter Completed Requisitions
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="completedDepartmentFilter"
                    label="Department"
                    :items="departmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-domain"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearCompletedFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="completedFilterMenu = false"
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
              v-model="completedSearch"
              label="Search Requisition"
              placeholder="Search request no, requester or item"
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
                v-for="requisition in paginatedCompletedRequisitions"
                :key="requisition.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="requisition-card h-100"
                >

                  <!-- CARD HEADER -->

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="success"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-file-check-outline
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ requisition.requestNo }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ requisition.requester }}
                      </div>

                    </div>


                    <AppStatusChip
                      :status="requisition.status"
                      :color="getStatusColor(requisition.status)"
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
                        mdi-domain
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Department
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.department }}
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
                          Item / Service
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.item }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-counter
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Quantity
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.quantity }}
                          {{ requisition.unit }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-check-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Completed Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ requisition.completedDate || "-" }}
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
                      @click="viewRequisition(requisition)"
                    >
                      View
                    </v-btn>

                    <v-spacer />

                    <AppStatusChip
                      status="Completed"
                      color="success"
                    />

                  </v-card-actions>

                </v-card>

              </v-col>


              <v-col
                v-if="paginatedCompletedRequisitions.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-file-check-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No completed requisitions found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Completed requisitions will appear here.
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
                v-model="completedItemsPerPage"
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
                {{ completedDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ completedDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredCompletedRequisitions.length }}
              </span>

            </div>


            <v-pagination
              v-model="completedPage"
              :length="completedTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

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

          <!-- HEADER -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Requisition History
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Track changes and activities for general requisitions
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
              label="Search Requisition History"
              placeholder="Search request no, requester or action"
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

                    <!-- TOP -->

                    <div
                      class="d-flex flex-wrap align-start justify-space-between"
                    >

                      <div>

                        <div class="d-flex align-center ga-2">

                          <span class="text-subtitle-1 font-weight-bold">
                            {{ history.requestNo }}
                          </span>

                          <AppStatusChip
                            :status="history.status"
                            :color="getStatusColor(history.status)"
                          />

                        </div>


                        <div
                          class="text-body-2 text-medium-emphasis mt-1"
                        >
                          {{ history.requester }}
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
                      Requisition activities will appear here.
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

    </v-window>


    <!-- ============================================================
         REQUISITION DETAILS
         ============================================================ -->

    <v-dialog
      v-model="requisitionDetailsDialog"
      max-width="700"
    >

      <v-card
        v-if="selectedRequisition"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Requisition Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              General requisition information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeRequisitionDetails"
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
                mdi-clipboard-text-outline
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedRequisition.requestNo }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedRequisition.requester }}
              </div>

            </div>


            <v-spacer />


            <AppStatusChip
              :status="selectedRequisition.status"
              :color="getStatusColor(selectedRequisition.status)"
            />

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Request No
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.requestNo }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Requester
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.requester }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Department
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.department }}
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
                {{ selectedRequisition.category }}
              </div>

            </v-col>


            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Item / Service
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.item }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="4"
            >

              <div class="text-caption text-medium-emphasis">
                Quantity
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.quantity }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="4"
            >

              <div class="text-caption text-medium-emphasis">
                Unit
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.unit }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="4"
            >

              <div class="text-caption text-medium-emphasis">
                Priority
              </div>

              <div class="mt-1">

                <AppStatusChip
                  :status="selectedRequisition.priority"
                  :color="getPriorityColor(selectedRequisition.priority)"
                />

              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Required Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.requiredDate }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Created Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.createdDate }}
              </div>

            </v-col>


            <v-col
              v-if="selectedRequisition.rejectedDate"
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Rejected Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.rejectedDate }}
              </div>

            </v-col>


            <v-col
              v-if="selectedRequisition.completedDate"
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Completed Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.completedDate }}
              </div>

            </v-col>


            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Description / Justification
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedRequisition.description || "-" }}
              </div>

            </v-col>

          </v-row>

        </v-card-text>


        <v-divider />


        <v-card-actions class="pa-4">

          <v-btn
            v-if="selectedRequisition.status === 'Approval'"
            color="success"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-check-circle-outline"
            @click="approveRequisition(selectedRequisition)"
          >
            Approve
          </v-btn>


          <v-btn
            v-if="
              selectedRequisition.status === 'New' ||
              selectedRequisition.status === 'Approval'
            "
            color="error"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-close-circle-outline"
            @click="rejectRequisition(selectedRequisition)"
          >
            Reject
          </v-btn>


          <v-btn
            v-if="selectedRequisition.status === 'Rejected'"
            color="primary"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-restore"
            @click="returnToApproval(selectedRequisition)"
          >
            Return to Approval
          </v-btn>


          <v-spacer />


          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeRequisitionDetails"
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
              Requisition activity details
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
                {{ selectedHistory.requestNo }}
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
                Request No
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.requestNo }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Requester
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.requester }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Department
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.department }}
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


            <v-col cols="12">

              <div class="text-caption text-medium-emphasis">
                Remarks
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.remarks || "-" }}
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


/* ================================================================
   TYPES
   ================================================================ */

type RequisitionStatus =
  | "New"
  | "Approval"
  | "Rejected"
  | "Completed"


type RequisitionPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent"


type RequisitionAction =
  | "Created"
  | "Submitted"
  | "Approved"
  | "Rejected"
  | "Completed"
  | "Updated"


interface GeneralRequisition {

  id: string

  requestNo: string

  requester: string

  department: string

  category: string

  item: string

  quantity: number

  unit: string

  priority: RequisitionPriority

  requiredDate: string

  status: RequisitionStatus

  description?: string

  createdDate: string

  rejectedDate?: string

  completedDate?: string

}


interface RequisitionHistory {

  id: string

  requestNo: string

  requester: string

  department: string

  action: RequisitionAction

  effectiveDate: string

  changedBy: string

  status: RequisitionStatus

  remarks?: string

}


/* ================================================================
   TAB
   ================================================================ */

const tab =
  ref("list")


/* ================================================================
   SAMPLE DATA
   ================================================================ */

const requisitions =
  ref<GeneralRequisition[]>([

    {
      id: "GR-001",
      requestNo: "GR-2026-001",
      requester: "Aiman Asri",
      department: "Information Technology",
      category: "IT Equipment",
      item: "Laptop Docking Station",
      quantity: 2,
      unit: "Unit",
      priority: "High",
      requiredDate: "2026-10-05",
      status: "New",
      createdDate: "2026-09-20",
      description: "Docking stations for IT team workstations.",
    },

    {
      id: "GR-002",
      requestNo: "GR-2026-002",
      requester: "Nur Amirah",
      department: "Corporate Affairs",
      category: "Office Supplies",
      item: "A4 Copier Paper",
      quantity: 20,
      unit: "Ream",
      priority: "Medium",
      requiredDate: "2026-10-10",
      status: "Approval",
      createdDate: "2026-09-21",
      description: "Monthly office paper replenishment.",
    },

    {
      id: "GR-003",
      requestNo: "GR-2026-003",
      requester: "Vivian",
      department: "Human Resources",
      category: "Office Supplies",
      item: "Printer Toner",
      quantity: 4,
      unit: "Unit",
      priority: "Medium",
      requiredDate: "2026-10-03",
      status: "Approval",
      createdDate: "2026-09-22",
      description: "Replacement toner for HR printers.",
    },

    {
      id: "GR-004",
      requestNo: "GR-2026-004",
      requester: "Teo",
      department: "Finance",
      category: "Services",
      item: "Document Shredding Service",
      quantity: 1,
      unit: "Service",
      priority: "Low",
      requiredDate: "2026-09-15",
      status: "Completed",
      createdDate: "2026-09-10",
      completedDate: "2026-09-15",
      description: "Scheduled document disposal service.",
    },

    {
      id: "GR-005",
      requestNo: "GR-2026-005",
      requester: "Iqbal",
      department: "Information Technology",
      category: "Software",
      item: "Software License Renewal",
      quantity: 10,
      unit: "License",
      priority: "Urgent",
      requiredDate: "2026-10-01",
      status: "Approval",
      createdDate: "2026-09-24",
      description: "Renewal of required software licenses.",
    },

    {
      id: "GR-006",
      requestNo: "GR-2026-006",
      requester: "Nisha",
      department: "Corporate Affairs",
      category: "Printing",
      item: "Corporate Brochure Printing",
      quantity: 500,
      unit: "Copies",
      priority: "Low",
      requiredDate: "2026-09-20",
      status: "Rejected",
      createdDate: "2026-09-12",
      rejectedDate: "2026-09-18",
      description: "Printing request for corporate materials.",
    },

    {
      id: "GR-007",
      requestNo: "GR-2026-007",
      requester: "Admin",
      department: "Administration",
      category: "Office Equipment",
      item: "Visitor Chairs",
      quantity: 12,
      unit: "Unit",
      priority: "Medium",
      requiredDate: "2026-09-30",
      status: "Rejected",
      createdDate: "2026-08-30",
      rejectedDate: "2026-09-05",
      description: "Additional visitor chairs.",
    },

    {
      id: "GR-008",
      requestNo: "GR-2026-008",
      requester: "Farah",
      department: "Finance",
      category: "Office Supplies",
      item: "Calculator",
      quantity: 5,
      unit: "Unit",
      priority: "Low",
      requiredDate: "2026-09-12",
      status: "Completed",
      createdDate: "2026-09-01",
      completedDate: "2026-09-12",
      description: "Calculators for finance team.",
    },

  ])


/* ================================================================
   HISTORY DATA
   ================================================================ */

const requisitionHistory =
  ref<RequisitionHistory[]>([

    {
      id: "RH-001",
      requestNo: "GR-2026-001",
      requester: "Aiman Asri",
      department: "Information Technology",
      action: "Created",
      effectiveDate: "2026-09-20",
      changedBy: "Aiman Asri",
      status: "New",
      remarks: "New requisition created.",
    },

    {
      id: "RH-002",
      requestNo: "GR-2026-002",
      requester: "Nur Amirah",
      department: "Corporate Affairs",
      action: "Created",
      effectiveDate: "2026-09-21",
      changedBy: "Nur Amirah",
      status: "New",
      remarks: "New requisition created.",
    },

    {
      id: "RH-003",
      requestNo: "GR-2026-002",
      requester: "Nur Amirah",
      department: "Corporate Affairs",
      action: "Submitted",
      effectiveDate: "2026-09-21",
      changedBy: "Nur Amirah",
      status: "Approval",
      remarks: "Requisition submitted for approval.",
    },

    {
      id: "RH-004",
      requestNo: "GR-2026-003",
      requester: "Vivian",
      department: "Human Resources",
      action: "Submitted",
      effectiveDate: "2026-09-22",
      changedBy: "Vivian",
      status: "Approval",
      remarks: "Requisition submitted for approval.",
    },

    {
      id: "RH-005",
      requestNo: "GR-2026-004",
      requester: "Teo",
      department: "Finance",
      action: "Completed",
      effectiveDate: "2026-09-15",
      changedBy: "Admin",
      status: "Completed",
      remarks: "Requisition completed.",
    },

    {
      id: "RH-006",
      requestNo: "GR-2026-005",
      requester: "Iqbal",
      department: "Information Technology",
      action: "Submitted",
      effectiveDate: "2026-09-24",
      changedBy: "Iqbal",
      status: "Approval",
      remarks: "Requisition submitted for approval.",
    },

    {
      id: "RH-007",
      requestNo: "GR-2026-006",
      requester: "Nisha",
      department: "Corporate Affairs",
      action: "Rejected",
      effectiveDate: "2026-09-18",
      changedBy: "Admin",
      status: "Rejected",
      remarks: "Request does not meet current procurement requirement.",
    },

    {
      id: "RH-008",
      requestNo: "GR-2026-007",
      requester: "Admin",
      department: "Administration",
      action: "Rejected",
      effectiveDate: "2026-09-05",
      changedBy: "Admin",
      status: "Rejected",
      remarks: "Budget allocation is not available.",
    },

  ])


/* ================================================================
   OPTIONS
   ================================================================ */

const departmentOptions =
  computed(() => {

    return [
      ...new Set(
        requisitions.value.map(
          requisition =>
            requisition.department
        )
      ),
    ]

  })


const categoryOptions =
  computed(() => {

    return [
      ...new Set(
        requisitions.value.map(
          requisition =>
            requisition.category
        )
      ),
    ]

  })


const priorityOptions = [
  "Low",
  "Medium",
  "High",
  "Urgent",
]


const statusOptions = [
  "New",
  "Approval",
  "Rejected",
  "Completed",
]


const unitOptions = [
  "Unit",
  "Ream",
  "Box",
  "Service",
  "License",
  "Copies",
  "Set",
]


/* ================================================================
   MAIN FILTER
   ================================================================ */

const filterMenu =
  ref(false)

const search =
  ref("")

const departmentFilter =
  ref<string | null>(null)

const categoryFilter =
  ref<string | null>(null)

const priorityFilter =
  ref<string | null>(null)

const statusFilter =
  ref<string | null>(null)


const filteredRequisitions =
  computed(() => {

    const keyword =
      search.value
        .trim()
        .toLowerCase()


    return requisitions.value.filter(
      requisition => {

        const searchMatch =
          !keyword ||
          requisition.requestNo
            .toLowerCase()
            .includes(keyword) ||
          requisition.requester
            .toLowerCase()
            .includes(keyword) ||
          requisition.department
            .toLowerCase()
            .includes(keyword) ||
          requisition.category
            .toLowerCase()
            .includes(keyword) ||
          requisition.item
            .toLowerCase()
            .includes(keyword)


        const departmentMatch =
          !departmentFilter.value ||
          requisition.department ===
            departmentFilter.value


        const categoryMatch =
          !categoryFilter.value ||
          requisition.category ===
            categoryFilter.value


        const priorityMatch =
          !priorityFilter.value ||
          requisition.priority ===
            priorityFilter.value


        const statusMatch =
          !statusFilter.value ||
          requisition.status ===
            statusFilter.value


        return (
          searchMatch &&
          departmentMatch &&
          categoryMatch &&
          priorityMatch &&
          statusMatch
        )

      }
    )

  })


/* ================================================================
   MAIN PAGINATION
   ================================================================ */

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
        filteredRequisitions.value.length /
          itemsPerPage.value
      )
    )

  })


const paginatedRequisitions =
  computed(() => {

    const start =
      (page.value - 1) *
      itemsPerPage.value

    const end =
      start +
      itemsPerPage.value

    return filteredRequisitions.value.slice(
      start,
      end
    )

  })


const displayedStart =
  computed(() => {

    if (
      filteredRequisitions.value.length === 0
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
      filteredRequisitions.value.length
    )

  })


watch(
  [
    search,
    departmentFilter,
    categoryFilter,
    priorityFilter,
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

  departmentFilter.value = null

  categoryFilter.value = null

  priorityFilter.value = null

  statusFilter.value = null

  page.value = 1

}


/* ================================================================
   SUMMARY
   ================================================================ */

const newRequisitionCount =
  computed(() => {

    return requisitions.value.filter(
      requisition =>
        requisition.status === "New"
    ).length

  })


const approvalRequisitionCount =
  computed(() => {

    return requisitions.value.filter(
      requisition =>
        requisition.status === "Approval"
    ).length

  })


const rejectedRequisitionCount =
  computed(() => {

    return requisitions.value.filter(
      requisition =>
        requisition.status === "Rejected"
    ).length

  })


const completedRequisitionCount =
  computed(() => {

    return requisitions.value.filter(
      requisition =>
        requisition.status === "Completed"
    ).length

  })


/* ================================================================
   NEW REQUISITION FORM
   ================================================================ */

const requestNoInput =
  ref("")

const requesterInput =
  ref("")

const selectedDepartment =
  ref<string | null>(null)

const selectedCategory =
  ref<string | null>(null)

const itemInput =
  ref("")

const quantityInput =
  ref(1)

const selectedUnit =
  ref("Unit")

const selectedPriority =
  ref<RequisitionPriority>("Medium")

const requiredDateInput =
  ref("")

const descriptionInput =
  ref("")


const canRegisterRequisition =
  computed(() => {

    return (
      requestNoInput.value.trim() !== "" &&
      requesterInput.value.trim() !== "" &&
      selectedDepartment.value !== null &&
      selectedCategory.value !== null &&
      itemInput.value.trim() !== "" &&
      quantityInput.value > 0 &&
      selectedUnit.value !== "" &&
      selectedPriority.value !== null &&
      requiredDateInput.value.trim() !== ""
    )

  })


function registerRequisition() {

  if (
    !canRegisterRequisition.value
  ) {

    return

  }


  const newRequisition: GeneralRequisition = {

    id:
      requestNoInput.value.trim(),

    requestNo:
      requestNoInput.value.trim(),

    requester:
      requesterInput.value.trim(),

    department:
      selectedDepartment.value as string,

    category:
      selectedCategory.value as string,

    item:
      itemInput.value.trim(),

    quantity:
      quantityInput.value || 1,

    unit:
      selectedUnit.value,

    priority:
      selectedPriority.value,

    requiredDate:
      requiredDateInput.value,

    status:
      "New",

    createdDate:
      getToday(),

    description:
      descriptionInput.value.trim(),

  }


  requisitions.value.unshift(
    newRequisition
  )


  requisitionHistory.value.unshift({

    id:
      `RH-${String(
        requisitionHistory.value.length + 1
      ).padStart(3, "0")}`,

    requestNo:
      newRequisition.requestNo,

    requester:
      newRequisition.requester,

    department:
      newRequisition.department,

    action:
      "Created",

    effectiveDate:
      newRequisition.createdDate,

    changedBy:
      newRequisition.requester,

    status:
      "New",

    remarks:
      "New requisition created.",

  })


  clearRegistrationForm()

  tab.value = "list"

}


function clearRegistrationForm() {

  requestNoInput.value = ""

  requesterInput.value = ""

  selectedDepartment.value = null

  selectedCategory.value = null

  itemInput.value = ""

  quantityInput.value = 1

  selectedUnit.value = "Unit"

  selectedPriority.value = "Medium"

  requiredDateInput.value = ""

  descriptionInput.value = ""

}


/* ================================================================
   REQUISITION DETAILS
   ================================================================ */

const requisitionDetailsDialog =
  ref(false)

const selectedRequisition =
  ref<GeneralRequisition | null>(null)


function viewRequisition(
  requisition: GeneralRequisition
) {

  selectedRequisition.value =
    requisition

  requisitionDetailsDialog.value =
    true

}


function closeRequisitionDetails() {

  requisitionDetailsDialog.value =
    false

  selectedRequisition.value =
    null

}


/* ================================================================
   APPROVE
   ================================================================ */

function approveRequisition(
  requisition: GeneralRequisition
) {

  const today =
    getToday()


  requisition.status =
    "Completed"

  requisition.completedDate =
    today


  requisitionHistory.value.unshift({

    id:
      `RH-${String(
        requisitionHistory.value.length + 1
      ).padStart(3, "0")}`,

    requestNo:
      requisition.requestNo,

    requester:
      requisition.requester,

    department:
      requisition.department,

    action:
      "Approved",

    effectiveDate:
      today,

    changedBy:
      "Admin",

    status:
      "Completed",

    remarks:
      "Requisition approved and completed.",

  })


  requisitionHistory.value.unshift({

    id:
      `RH-${String(
        requisitionHistory.value.length + 1
      ).padStart(3, "0")}`,

    requestNo:
      requisition.requestNo,

    requester:
      requisition.requester,

    department:
      requisition.department,

    action:
      "Completed",

    effectiveDate:
      today,

    changedBy:
      "Admin",

    status:
      "Completed",

    remarks:
      "Requisition completed.",

  })


  closeRequisitionDetails()

}


/* ================================================================
   REJECT
   ================================================================ */

function rejectRequisition(
  requisition: GeneralRequisition
) {

  const today =
    getToday()


  requisition.status =
    "Rejected"

  requisition.rejectedDate =
    today


  requisitionHistory.value.unshift({

    id:
      `RH-${String(
        requisitionHistory.value.length + 1
      ).padStart(3, "0")}`,

    requestNo:
      requisition.requestNo,

    requester:
      requisition.requester,

    department:
      requisition.department,

    action:
      "Rejected",

    effectiveDate:
      today,

    changedBy:
      "Admin",

    status:
      "Rejected",

    remarks:
      "Requisition was rejected.",

  })


  closeRequisitionDetails()

}


/* ================================================================
   RETURN TO APPROVAL
   ================================================================ */

function returnToApproval(
  requisition: GeneralRequisition
) {

  const today =
    getToday()


  requisition.status =
    "Approval"

  requisition.rejectedDate =
    undefined


  requisitionHistory.value.unshift({

    id:
      `RH-${String(
        requisitionHistory.value.length + 1
      ).padStart(3, "0")}`,

    requestNo:
      requisition.requestNo,

    requester:
      requisition.requester,

    department:
      requisition.department,

    action:
      "Updated",

    effectiveDate:
      today,

    changedBy:
      "Admin",

    status:
      "Approval",

    remarks:
      "Requisition returned to approval process.",

  })


  closeRequisitionDetails()

}


/* ================================================================
   APPROVAL FILTER
   ================================================================ */

const approvalFilterMenu =
  ref(false)

const approvalSearch =
  ref("")

const approvalDepartmentFilter =
  ref<string | null>(null)

const approvalCategoryFilter =
  ref<string | null>(null)


const filteredApprovalRequisitions =
  computed(() => {

    const keyword =
      approvalSearch.value
        .trim()
        .toLowerCase()


    return requisitions.value.filter(
      requisition => {

        if (
          requisition.status !== "Approval"
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          requisition.requestNo
            .toLowerCase()
            .includes(keyword) ||
          requisition.requester
            .toLowerCase()
            .includes(keyword) ||
          requisition.department
            .toLowerCase()
            .includes(keyword) ||
          requisition.item
            .toLowerCase()
            .includes(keyword)


        const departmentMatch =
          !approvalDepartmentFilter.value ||
          requisition.department ===
            approvalDepartmentFilter.value


        const categoryMatch =
          !approvalCategoryFilter.value ||
          requisition.category ===
            approvalCategoryFilter.value


        return (
          searchMatch &&
          departmentMatch &&
          categoryMatch
        )

      }
    )

  })


const approvalPage =
  ref(1)

const approvalItemsPerPage =
  ref(5)


const approvalTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredApprovalRequisitions.value.length /
          approvalItemsPerPage.value
      )
    )

  })


const paginatedApprovalRequisitions =
  computed(() => {

    const start =
      (approvalPage.value - 1) *
      approvalItemsPerPage.value

    const end =
      start +
      approvalItemsPerPage.value

    return filteredApprovalRequisitions.value.slice(
      start,
      end
    )

  })


const approvalDisplayedStart =
  computed(() => {

    if (
      filteredApprovalRequisitions.value.length === 0
    ) {

      return 0

    }

    return (
      (approvalPage.value - 1) *
      approvalItemsPerPage.value
    ) + 1

  })


const approvalDisplayedEnd =
  computed(() => {

    return Math.min(
      approvalPage.value *
        approvalItemsPerPage.value,
      filteredApprovalRequisitions.value.length
    )

  })


watch(
  [
    approvalSearch,
    approvalDepartmentFilter,
    approvalCategoryFilter,
    approvalItemsPerPage,
  ],
  () => {

    approvalPage.value = 1

  }
)


watch(
  approvalTotalPages,
  total => {

    if (
      approvalPage.value > total
    ) {

      approvalPage.value = total

    }

  }
)


function clearApprovalFilters() {

  approvalSearch.value = ""

  approvalDepartmentFilter.value = null

  approvalCategoryFilter.value = null

  approvalPage.value = 1

}


/* ================================================================
   REJECTED
   ================================================================ */

const rejectedFilterMenu =
  ref(false)

const rejectedSearch =
  ref("")

const rejectedDepartmentFilter =
  ref<string | null>(null)


const filteredRejectedRequisitions =
  computed(() => {

    const keyword =
      rejectedSearch.value
        .trim()
        .toLowerCase()


    return requisitions.value.filter(
      requisition => {

        if (
          requisition.status !== "Rejected"
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          requisition.requestNo
            .toLowerCase()
            .includes(keyword) ||
          requisition.requester
            .toLowerCase()
            .includes(keyword) ||
          requisition.department
            .toLowerCase()
            .includes(keyword) ||
          requisition.item
            .toLowerCase()
            .includes(keyword)


        const departmentMatch =
          !rejectedDepartmentFilter.value ||
          requisition.department ===
            rejectedDepartmentFilter.value


        return (
          searchMatch &&
          departmentMatch
        )

      }
    )

  })


const rejectedPage =
  ref(1)

const rejectedItemsPerPage =
  ref(5)


const rejectedTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredRejectedRequisitions.value.length /
          rejectedItemsPerPage.value
      )
    )

  })


const paginatedRejectedRequisitions =
  computed(() => {

    const start =
      (rejectedPage.value - 1) *
      rejectedItemsPerPage.value

    const end =
      start +
      rejectedItemsPerPage.value

    return filteredRejectedRequisitions.value.slice(
      start,
      end
    )

  })


const rejectedDisplayedStart =
  computed(() => {

    if (
      filteredRejectedRequisitions.value.length === 0
    ) {

      return 0

    }

    return (
      (rejectedPage.value - 1) *
      rejectedItemsPerPage.value
    ) + 1

  })


const rejectedDisplayedEnd =
  computed(() => {

    return Math.min(
      rejectedPage.value *
        rejectedItemsPerPage.value,
      filteredRejectedRequisitions.value.length
    )

  })


watch(
  [
    rejectedSearch,
    rejectedDepartmentFilter,
    rejectedItemsPerPage,
  ],
  () => {

    rejectedPage.value = 1

  }
)


watch(
  rejectedTotalPages,
  total => {

    if (
      rejectedPage.value > total
    ) {

      rejectedPage.value = total

    }

  }
)


function clearRejectedFilters() {

  rejectedSearch.value = ""

  rejectedDepartmentFilter.value = null

  rejectedPage.value = 1

}


/* ================================================================
   COMPLETED
   ================================================================ */

const completedFilterMenu =
  ref(false)

const completedSearch =
  ref("")

const completedDepartmentFilter =
  ref<string | null>(null)


const filteredCompletedRequisitions =
  computed(() => {

    const keyword =
      completedSearch.value
        .trim()
        .toLowerCase()


    return requisitions.value.filter(
      requisition => {

        if (
          requisition.status !== "Completed"
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          requisition.requestNo
            .toLowerCase()
            .includes(keyword) ||
          requisition.requester
            .toLowerCase()
            .includes(keyword) ||
          requisition.department
            .toLowerCase()
            .includes(keyword) ||
          requisition.item
            .toLowerCase()
            .includes(keyword)


        const departmentMatch =
          !completedDepartmentFilter.value ||
          requisition.department ===
            completedDepartmentFilter.value


        return (
          searchMatch &&
          departmentMatch
        )

      }
    )

  })


const completedPage =
  ref(1)

const completedItemsPerPage =
  ref(5)


const completedTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredCompletedRequisitions.value.length /
          completedItemsPerPage.value
      )
    )

  })


const paginatedCompletedRequisitions =
  computed(() => {

    const start =
      (completedPage.value - 1) *
      completedItemsPerPage.value

    const end =
      start +
      completedItemsPerPage.value

    return filteredCompletedRequisitions.value.slice(
      start,
      end
    )

  })


const completedDisplayedStart =
  computed(() => {

    if (
      filteredCompletedRequisitions.value.length === 0
    ) {

      return 0

    }

    return (
      (completedPage.value - 1) *
      completedItemsPerPage.value
    ) + 1

  })


const completedDisplayedEnd =
  computed(() => {

    return Math.min(
      completedPage.value *
        completedItemsPerPage.value,
      filteredCompletedRequisitions.value.length
    )

  })


watch(
  [
    completedSearch,
    completedDepartmentFilter,
    completedItemsPerPage,
  ],
  () => {

    completedPage.value = 1

  }
)


watch(
  completedTotalPages,
  total => {

    if (
      completedPage.value > total
    ) {

      completedPage.value = total

    }

  }
)


function clearCompletedFilters() {

  completedSearch.value = ""

  completedDepartmentFilter.value = null

  completedPage.value = 1

}


/* ================================================================
   HISTORY FILTER
   ================================================================ */

const historyFilterMenu =
  ref(false)

const historySearch =
  ref("")

const historyActionFilter =
  ref<RequisitionAction | null>(null)


const historyActionOptions = [
  "Created",
  "Submitted",
  "Approved",
  "Rejected",
  "Completed",
  "Updated",
]


const filteredHistory =
  computed(() => {

    const keyword =
      historySearch.value
        .trim()
        .toLowerCase()


    return requisitionHistory.value.filter(
      history => {

        const searchMatch =
          !keyword ||
          history.id
            .toLowerCase()
            .includes(keyword) ||
          history.requestNo
            .toLowerCase()
            .includes(keyword) ||
          history.requester
            .toLowerCase()
            .includes(keyword) ||
          history.department
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


/* ================================================================
   HISTORY PAGINATION
   ================================================================ */

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

      historyPage.value = total

    }

  }
)


function clearHistoryFilters() {

  historySearch.value = ""

  historyActionFilter.value =
    null

  historyPage.value = 1

}


/* ================================================================
   HISTORY DETAILS
   ================================================================ */

const historyDetailsDialog =
  ref(false)

const selectedHistory =
  ref<RequisitionHistory | null>(null)


function viewHistory(
  history: RequisitionHistory
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


/* ================================================================
   HISTORY HELPERS
   ================================================================ */

function getHistoryIcon(
  action: RequisitionAction
) {

  switch (action) {

    case "Created":

      return "mdi-plus-circle-outline"

    case "Submitted":

      return "mdi-send-outline"

    case "Approved":

      return "mdi-check-circle-outline"

    case "Rejected":

      return "mdi-close-circle-outline"

    case "Completed":

      return "mdi-check-all"

    case "Updated":

      return "mdi-pencil-outline"

    default:

      return "mdi-history"

  }

}


function getHistoryColor(
  action: RequisitionAction
) {

  switch (action) {

    case "Created":

      return "primary"

    case "Submitted":

      return "info"

    case "Approved":

      return "success"

    case "Rejected":

      return "error"

    case "Completed":

      return "success"

    case "Updated":

      return "warning"

    default:

      return "grey"

  }

}


function getHistoryDescription(
  action: RequisitionAction
) {

  switch (action) {

    case "Created":

      return "Requisition was created."

    case "Submitted":

      return "Requisition was submitted for approval."

    case "Approved":

      return "Requisition was approved."

    case "Rejected":

      return "Requisition was rejected."

    case "Completed":

      return "Requisition was completed."

    case "Updated":

      return "Requisition information was updated."

    default:

      return "Requisition history activity."

  }

}


/* ================================================================
   STATUS / PRIORITY
   ================================================================ */

function getStatusColor(
  status: string
) {

  switch (status) {

    case "New":

      return "primary"

    case "Approval":

      return "warning"

    case "Rejected":

      return "error"

    case "Completed":

      return "success"

    default:

      return "grey"

  }

}


function getPriorityColor(
  priority: string
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


/* ================================================================
   DATE
   ================================================================ */

function getToday() {

  const date =
    new Date()

  const year =
    date.getFullYear()

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0")

  const day =
    String(
      date.getDate()
    ).padStart(2, "0")

  return `${year}-${month}-${day}`

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

.requisition-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.requisition-card:hover {

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