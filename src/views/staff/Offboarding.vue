<template>

  <v-container
    fluid
    class="pa-6"
  >

    <!-- ============================================================
         BREADCRUMB
         ============================================================ -->

    <div class="d-flex align-center mb-6">

      <v-icon
        size="20"
        class="mr-2"
      >
        mdi-account-group-outline
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Staff
      </span>

      <v-icon
        size="18"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Offboarding
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
          Employee Offboarding
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage and monitor staff offboarding process
        </p>

      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-account-minus-outline"
        rounded="lg"
        @click="tab = 'offboarding'"
      >
        Start Offboarding
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
          title="Pending"
          :value="pendingCount"
          icon="mdi-clock-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="In Progress"
          :value="inProgressCount"
          icon="mdi-progress-clock"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Completed"
          :value="completedCount"
          icon="mdi-check-circle-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="This Month"
          :value="thisMonthCount"
          icon="mdi-calendar-month-outline"
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

        <!-- Employee List -->

        <v-tab value="list">

          <v-icon start>
            mdi-format-list-bulleted
          </v-icon>

          Employee List

        </v-tab>


        <!-- Offboarding -->

        <v-tab value="offboarding">

          <v-icon start>
            mdi-account-minus-outline
          </v-icon>

          Offboarding

        </v-tab>


        <!-- Checklist -->

        <v-tab value="checklist">

          <v-icon start>
            mdi-format-list-checks
          </v-icon>

          Checklist

        </v-tab>


        <!-- Completed -->

        <v-tab value="completed">

          <v-icon start>
            mdi-check-circle-outline
          </v-icon>

          Completed

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
           EMPLOYEE LIST
           ========================================================== -->

      <v-window-item value="list">

        <v-card
          rounded="xl"
          elevation="0"
          border
        >

          <!-- Header -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Employee List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage employee offboarding
              </p>

            </div>


            <!-- ==================================================
                 FILTER BUTTON
                 ================================================== -->

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

                  <v-badge
                    v-if="activeFilterCount > 0"
                    :content="activeFilterCount"
                    color="primary"
                    inline
                    class="ml-2"
                  />

                </v-btn>

              </template>


              <!-- Filter Menu -->

              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Employees
                </v-card-title>

                <v-divider />

                <v-card-text>

                  <!-- Department -->

                  <v-select
                    v-model="departmentFilter"
                    label="Department"
                    :items="departmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-office-building-outline"
                    class="mb-3"
                  />


                  <!-- Position -->

                  <v-select
                    v-model="positionFilter"
                    label="Position"
                    :items="positionOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-badge-account-outline"
                    class="mb-3"
                  />


                  <!-- Status -->

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


          <!-- ======================================================
               EMPLOYEE TABLE
               ====================================================== -->

          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Employee ID</th>

                  <th>Name</th>

                  <th>Department</th>

                  <th>Position</th>

                  <th>Last Working Day</th>

                  <th>Reason</th>

                  <th>Status</th>

                  <th>Progress</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="employee in paginatedEmployees"
                  :key="employee.employeeId"
                >

                  <!-- Employee ID -->

                  <td>

                    <span class="font-weight-medium">
                      {{ employee.employeeId }}
                    </span>

                  </td>


                  <!-- Name -->

                  <td>

                    <div class="d-flex align-center">

                      <v-avatar
                        size="36"
                        color="primary"
                        variant="tonal"
                        class="mr-3"
                      >

                        <span class="text-caption font-weight-bold">
                          {{ getInitials(employee.name) }}
                        </span>

                      </v-avatar>

                      <span class="font-weight-medium">
                        {{ employee.name }}
                      </span>

                    </div>

                  </td>


                  <!-- Department -->

                  <td>
                    {{ employee.department }}
                  </td>


                  <!-- Position -->

                  <td>
                    {{ employee.position }}
                  </td>


                  <!-- Last Working Day -->

                  <td>
                    {{ employee.lastWorkingDay }}
                  </td>


                  <!-- Reason -->

                  <td>
                    {{ employee.reason }}
                  </td>


                  <!-- Status -->

                  <td>

                    <AppStatusChip
                      :status="employee.status"
                      :color="getStatusColor(employee.status)"
                    />

                  </td>


                  <!-- Progress -->

                  <td style="min-width: 150px;">

                    <div class="d-flex align-center ga-2">

                      <v-progress-linear
                        :model-value="employee.progress"
                        color="primary"
                        height="6"
                        rounded
                      />

                      <span class="text-caption">
                        {{ employee.progress }}%
                      </span>

                    </div>

                  </td>


                  <!-- Actions -->

                  <td class="text-center">

                    <v-tooltip text="Open Offboarding">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-arrow-right"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="selectEmployee(employee.employeeId)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <!-- EMPTY STATE -->

                <tr
                  v-if="paginatedEmployees.length === 0"
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
                      mdi-account-search-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No employees found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Try changing your filter.
                    </div>

                  </td>

                </tr>

              </tbody>

            </v-table>

          </div>


          <!-- ======================================================
               PAGINATION
               ====================================================== -->

          <v-divider />

          <div class="pagination-wrapper">

            <!-- Rows per page -->

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


            <!-- Showing -->

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
                {{ filteredEmployees.length }}
              </span>

            </div>


            <!-- Pagination -->

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
           OFFBOARDING
           ========================================================== -->

      <v-window-item value="offboarding">

        <v-row>

          <!-- ======================================================
               OFFBOARDING FORM
               ====================================================== -->

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
                    Start Offboarding
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter employee information to start offboarding
                  </div>

                </div>

              </v-card-title>

              <v-divider />

              <v-card-text class="pa-5">

                <v-row>

                  <!-- Employee -->

                  <v-col cols="12">

                    <v-select
                      v-model="selectedEmployee"
                      label="Employee"
                      :items="employeeOptions"
                      item-title="title"
                      item-value="value"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-outline"
                      clearable
                    />

                  </v-col>


                  <!-- Employee ID -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="employeeIdInput"
                      label="Employee ID"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-card-account-details-outline"
                      readonly
                    />

                  </v-col>


                  <!-- Full Name -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="fullName"
                      label="Full Name"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-outline"
                      readonly
                    />

                  </v-col>


                  <!-- Department -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="employeeDepartment"
                      label="Department"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-office-building-outline"
                      readonly
                    />

                  </v-col>


                  <!-- Position -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="employeePosition"
                      label="Position"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-badge-account-outline"
                      readonly
                    />

                  </v-col>


                  <!-- Last Working Day -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="lastWorkingDay"
                      label="Last Working Day"
                      type="date"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-outline"
                    />

                  </v-col>


                  <!-- Reason -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="reason"
                      label="Reason"
                      :items="reasonOptions"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-file-document-outline"
                    />

                  </v-col>

                </v-row>

              </v-card-text>

              <v-divider />

              <v-card-actions class="pa-5">

                <v-btn
                  variant="text"
                  @click="clearOffboardingForm"
                >
                  Clear
                </v-btn>

                <v-spacer />

                <v-btn
                  color="primary"
                  rounded="lg"
                  prepend-icon="mdi-account-minus-outline"
                  :disabled="!canStartOffboarding"
                  @click="startOffboarding"
                >
                  Start Offboarding
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>


          <!-- ======================================================
               PREVIEW
               ====================================================== -->

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

                  <!-- Employee ID -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Employee ID
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ employeeIdInput || "-" }}
                    </div>

                  </div>


                  <!-- Full Name -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Full Name
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ fullName || "-" }}
                    </div>

                  </div>


                  <!-- Department -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Department
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ employeeDepartment || "-" }}
                    </div>

                  </div>


                  <!-- Position -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Position
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ employeePosition || "-" }}
                    </div>

                  </div>


                  <!-- Last Working Day -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Last Working Day
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ lastWorkingDay || "-" }}
                    </div>

                  </div>


                  <!-- Reason -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Reason
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ reason || "-" }}
                    </div>

                  </div>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>


      <!-- ==========================================================
           CHECKLIST
           ========================================================== -->

      <v-window-item value="checklist">

        <v-row>

          <!-- ======================================================
               CHECKLIST
               ====================================================== -->

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
                    Offboarding Checklist
                  </div>

                  <div
                    v-if="selectedEmployeeInfo"
                    class="text-body-2 text-medium-emphasis mt-1"
                  >

                    {{ selectedEmployeeInfo.name }}
                    ·
                    {{ selectedEmployeeInfo.employeeId }}

                  </div>

                  <div
                    v-else
                    class="text-body-2 text-medium-emphasis mt-1"
                  >
                    Select an employee from the employee list
                  </div>

                </div>

              </v-card-title>

              <v-divider />

              <v-card-text class="pa-5">

                <div
                  v-for="category in checklistCategories"
                  :key="category"
                  class="mb-6"
                >

                  <!-- Category title -->

                  <div class="text-subtitle-1 font-weight-bold mb-3">
                    {{ category }}
                  </div>

                  <v-card
                    variant="outlined"
                    rounded="lg"
                  >

                    <v-list lines="two">

                      <v-list-item
                        v-for="item in checklistItemsByCategory(category)"
                        :key="item.id"
                      >

                        <template #prepend>

                          <v-checkbox
                            v-model="item.completed"
                            hide-details
                            color="primary"
                          />

                        </template>

                        <v-list-item-title>
                          {{ item.label }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          {{ category }}
                        </v-list-item-subtitle>

                      </v-list-item>

                    </v-list>

                  </v-card>

                </div>

              </v-card-text>

              <v-divider />

              <v-card-actions class="pa-5">

                <v-btn
                  variant="text"
                  @click="saveProgress"
                >
                  Save Progress
                </v-btn>

                <v-spacer />

                <v-btn
                  color="primary"
                  rounded="lg"
                  :disabled="checklistProgress < 100"
                  @click="completeOffboarding"
                >
                  Complete Offboarding
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>


          <!-- ======================================================
               PROGRESS
               ====================================================== -->

          <v-col
            cols="12"
            md="4"
          >

            <v-card
              rounded="xl"
              elevation="0"
              border
            >

              <v-card-title class="pa-5">

                <div class="text-h6 font-weight-bold">
                  Progress
                </div>

              </v-card-title>

              <v-divider />

              <v-card-text class="pa-5">

                <div class="text-center mb-5">

                  <div class="text-h3 font-weight-bold text-primary">
                    {{ checklistProgress }}%
                  </div>

                  <div class="text-body-2 text-medium-emphasis">
                    Offboarding Progress
                  </div>

                </div>

                <v-progress-linear
                  :model-value="checklistProgress"
                  color="primary"
                  height="10"
                  rounded
                  class="mb-5"
                />

                <div class="d-flex justify-space-between">

                  <span class="text-body-2 text-medium-emphasis">
                    Completed
                  </span>

                  <span class="text-body-2 font-weight-medium">

                    {{ completedChecklistItems }}
                    /
                    {{ totalChecklistItems }}

                  </span>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

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

          <!-- Completed Header -->

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Completed Offboarding
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Employees who have completed the offboarding process
              </p>

            </div>


            <!-- Completed Filter -->

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

                  <v-badge
                    v-if="completedActiveFilterCount > 0"
                    :content="completedActiveFilterCount"
                    color="primary"
                    inline
                    class="ml-2"
                  />

                </v-btn>

              </template>


              <!-- Completed Filter Menu -->

              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Completed
                </v-card-title>

                <v-divider />

                <v-card-text>

                  <!-- Search -->

                  <v-text-field
                    v-model="completedSearch"
                    label="Search Employee"
                    placeholder="ID or name"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-magnify"
                    class="mb-3"
                  />


                  <!-- Department -->

                  <v-select
                    v-model="completedDepartmentFilter"
                    label="Department"
                    :items="completedDepartmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-office-building-outline"
                    class="mb-3"
                  />


                  <!-- Position -->

                  <v-select
                    v-model="completedPositionFilter"
                    label="Position"
                    :items="completedPositionOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-badge-account-outline"
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


          <!-- Completed List -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="employee in paginatedCompletedEmployees"
                :key="employee.employeeId"
                cols="12"
                md="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  border
                  class="pa-4 h-100"
                >

                  <!-- Employee Header -->

                  <div class="d-flex align-center">

                    <v-avatar
                      size="44"
                      color="success"
                      variant="tonal"
                      class="mr-3"
                    >

                      <span class="font-weight-bold">
                        {{ getInitials(employee.name) }}
                      </span>

                    </v-avatar>

                    <div>

                      <div class="font-weight-bold">
                        {{ employee.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ employee.employeeId }}
                      </div>

                    </div>

                    <v-spacer />

                    <v-icon color="success">
                      mdi-check-circle
                    </v-icon>

                  </div>


                  <v-divider class="my-4" />


                  <!-- Details -->

                  <div class="text-body-2">

                    <!-- Department -->

                    <div class="mb-2">

                      <span class="text-medium-emphasis">
                        Department:
                      </span>

                      <span class="font-weight-medium ml-1">
                        {{ employee.department }}
                      </span>

                    </div>


                    <!-- Position -->

                    <div class="mb-2">

                      <span class="text-medium-emphasis">
                        Position:
                      </span>

                      <span class="font-weight-medium ml-1">
                        {{ employee.position }}
                      </span>

                    </div>


                    <!-- Last Working Day -->

                    <div class="mb-2">

                      <span class="text-medium-emphasis">
                        Last Working Day:
                      </span>

                      <span class="font-weight-medium ml-1">
                        {{ employee.lastWorkingDay }}
                      </span>

                    </div>


                    <!-- Reason -->

                    <div>

                      <span class="text-medium-emphasis">
                        Reason:
                      </span>

                      <span class="font-weight-medium ml-1">
                        {{ employee.reason }}
                      </span>

                    </div>

                  </div>


                  <!-- Status -->

                  <div class="mt-4">

                    <AppStatusChip
                      status="Completed"
                      color="success"
                    />

                  </div>


                  <!-- View Button -->

                  <div class="d-flex justify-end mt-4">

                    <v-tooltip text="View">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          variant="outlined"
                          color="primary"
                          rounded="lg"
                          size="small"
                          prepend-icon="mdi-eye-outline"
                          @click="viewCompletedEmployee(employee.employeeId)"
                        >
                          View
                        </v-btn>

                      </template>

                    </v-tooltip>

                  </div>

                </v-card>

              </v-col>


              <!-- Empty State -->

              <v-col
                v-if="paginatedCompletedEmployees.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="52"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-check-circle-outline
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No completed offboarding
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Completed employees will appear here.
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <!-- Completed Pagination -->

          <v-divider />

          <div class="pagination-wrapper">

            <!-- Rows per page -->

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


            <!-- Showing -->

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
                {{ filteredCompletedEmployees.length }}
              </span>

            </div>


            <!-- Pagination -->

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

    </v-window>


    <!-- ============================================================
         VIEW COMPLETED DIALOG
         ============================================================ -->

    <v-dialog
      v-model="viewCompletedDialog"
      max-width="700"
      scrollable
    >

      <v-card
        v-if="viewedCompletedEmployee"
        rounded="xl"
      >

        <!-- Dialog Header -->

        <v-card-title
          class="d-flex align-center pa-5"
        >

          <div>

            <div class="text-h6 font-weight-bold">
              Employee Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Completed offboarding information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeViewCompleted"
          />

        </v-card-title>

        <v-divider />


        <!-- Employee Information -->

        <v-card-text class="pa-5">

          <div class="d-flex align-center mb-5">

            <v-avatar
              size="56"
              color="success"
              variant="tonal"
              class="mr-4"
            >

              <span class="text-subtitle-1 font-weight-bold">
                {{ getInitials(viewedCompletedEmployee.name) }}
              </span>

            </v-avatar>

            <div>

              <div class="text-h6 font-weight-bold">
                {{ viewedCompletedEmployee.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ viewedCompletedEmployee.employeeId }}
              </div>

            </div>

            <v-spacer />

            <AppStatusChip
              status="Completed"
              color="success"
            />

          </div>


          <!-- Details -->

          <v-row>

            <!-- Employee ID -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Employee ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.employeeId }}
              </div>

            </v-col>


            <!-- Full Name -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Full Name
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.name }}
              </div>

            </v-col>


            <!-- Department -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Department
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.department }}
              </div>

            </v-col>


            <!-- Position -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Position
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.position }}
              </div>

            </v-col>


            <!-- Last Working Day -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Last Working Day
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.lastWorkingDay }}
              </div>

            </v-col>


            <!-- Reason -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Reason
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.reason }}
              </div>

            </v-col>

          </v-row>


          <v-divider class="my-5" />


          <!-- Offboarding Checklist -->

          <div class="text-subtitle-1 font-weight-bold mb-4">
            Offboarding Checklist
          </div>


          <v-card
            v-for="category in completedChecklistCategories"
            :key="category"
            variant="outlined"
            rounded="lg"
            class="mb-4"
          >

            <div class="pa-4">

              <div class="font-weight-bold mb-3">
                {{ category }}
              </div>


              <div
                v-for="item in completedChecklistItemsByCategory(
                  viewedCompletedEmployee.checklist,
                  category
                )"
                :key="item.id"
                class="d-flex align-center py-2"
              >

                <v-icon
                  size="20"
                  color="success"
                  class="mr-3"
                >
                  mdi-check-circle
                </v-icon>

                <div>

                  <div class="text-body-2 font-weight-medium">
                    {{ item.label }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.category }}
                  </div>

                </div>

              </div>

            </div>

          </v-card>

        </v-card-text>


        <v-divider />


        <!-- Dialog Actions -->

        <v-card-actions class="pa-4">

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeViewCompleted"
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

import {
  useStaffOffboarding,
  type ChecklistItem,
  type StaffOffboardingRecord,
} from "@/composables/useStaffOffboarding"


/* */

const tab = ref("list")


/* */

const {
  staffOffboardingRecords: employees,
  updateProgress,
} = useStaffOffboarding()


/* */

const filterMenu = ref(false)

const departmentFilter =
  ref<string | null>(null)

const positionFilter =
  ref<string | null>(null)

const statusFilter =
  ref<StaffOffboardingRecord["status"] | null>(null)


/* */

const departmentOptions = computed(() => {

  return [

    ...new Set(

      employees.value.map(
        employee =>
          employee.department
      )

    ),

  ]

})


const positionOptions = computed(() => {

  return [

    ...new Set(

      employees.value.map(
        employee =>
          employee.position
      )

    ),

  ]

})


const statusOptions = [
  "Pending",
  "In Progress",
  "Completed",
] as const


/* */

const activeFilterCount = computed(() => {

  let count = 0

  if (departmentFilter.value) {
    count++
  }

  if (positionFilter.value) {
    count++
  }

  if (statusFilter.value) {
    count++
  }

  return count

})


/* */

const filteredEmployees = computed(() => {

  return employees.value.filter(employee => {

    /*
     * Completed employees are automatically
     * removed from Employee List.
     */

    if (
      employee.status === "Completed"
    ) {

      return false

    }


    const departmentMatch =
      !departmentFilter.value ||
      employee.department ===
        departmentFilter.value


    const positionMatch =
      !positionFilter.value ||
      employee.position ===
        positionFilter.value


    const statusMatch =
      !statusFilter.value ||
      employee.status ===
        statusFilter.value


    return (

      departmentMatch &&
      positionMatch &&
      statusMatch

    )

  })

})


/* */

const page = ref(1)

const itemsPerPage = ref(5)

const itemsPerPageOptions = [
  5,
  10,
  20,
  50,
]


const totalPages = computed(() => {

  return Math.max(

    1,

    Math.ceil(

      filteredEmployees.value.length /
      itemsPerPage.value

    )

  )

})


const paginatedEmployees = computed(() => {

  const start =
    (page.value - 1) *
    itemsPerPage.value

  const end =
    start +
    itemsPerPage.value

  return filteredEmployees.value.slice(
    start,
    end
  )

})


const displayedStart = computed(() => {

  if (
    filteredEmployees.value.length === 0
  ) {

    return 0

  }

  return (

    (page.value - 1) *
    itemsPerPage.value

  ) + 1

})


const displayedEnd = computed(() => {

  return Math.min(

    page.value *
      itemsPerPage.value,

    filteredEmployees.value.length

  )

})


/* */

const completedEmployees = computed(() => {

  return employees.value.filter(

    employee =>
      employee.status === "Completed"

  )

})


/* */

const completedFilterMenu =
  ref(false)

const completedSearch =
  ref("")

const completedDepartmentFilter =
  ref<string | null>(null)

const completedPositionFilter =
  ref<string | null>(null)


/* */

const completedDepartmentOptions =
  computed(() => {

    return [

      ...new Set(

        completedEmployees.value.map(

          employee =>
            employee.department

        )

      ),

    ]

  })


const completedPositionOptions =
  computed(() => {

    return [

      ...new Set(

        completedEmployees.value.map(

          employee =>
            employee.position

        )

      ),

    ]

  })


/* */

const completedActiveFilterCount =
  computed(() => {

    let count = 0

    if (
      completedSearch.value.trim() !== ""
    ) {

      count++

    }

    if (
      completedDepartmentFilter.value
    ) {

      count++

    }

    if (
      completedPositionFilter.value
    ) {

      count++

    }

    return count

  })


/* */

const filteredCompletedEmployees =
  computed(() => {

    const search =
      completedSearch.value
        .trim()
        .toLowerCase()

    return completedEmployees.value.filter(

      employee => {

        const searchMatch =
          !search ||

          employee.employeeId
            .toLowerCase()
            .includes(search) ||

          employee.name
            .toLowerCase()
            .includes(search)


        const departmentMatch =
          !completedDepartmentFilter.value ||

          employee.department ===
            completedDepartmentFilter.value


        const positionMatch =
          !completedPositionFilter.value ||

          employee.position ===
            completedPositionFilter.value


        return (

          searchMatch &&
          departmentMatch &&
          positionMatch

        )

      }

    )

  })


/* */

const completedPage = ref(1)

const completedItemsPerPage = ref(5)


const completedTotalPages =
  computed(() => {

    return Math.max(

      1,

      Math.ceil(

        filteredCompletedEmployees.value.length /
        completedItemsPerPage.value

      )

    )

  })


const paginatedCompletedEmployees =
  computed(() => {

    const start =
      (completedPage.value - 1) *
      completedItemsPerPage.value

    const end =
      start +
      completedItemsPerPage.value

    return filteredCompletedEmployees.value.slice(
      start,
      end
    )

  })


const completedDisplayedStart =
  computed(() => {

    if (
      filteredCompletedEmployees.value.length ===
      0
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

      filteredCompletedEmployees.value.length

    )

  })


/* */

watch(

  [

    departmentFilter,
    positionFilter,
    statusFilter,
    itemsPerPage,

  ],

  () => {

    page.value = 1

  }

)


watch(

  totalPages,

  newTotalPages => {

    if (
      page.value > newTotalPages
    ) {

      page.value =
        newTotalPages

    }

  }

)


/* */

watch(

  [

    completedSearch,
    completedDepartmentFilter,
    completedPositionFilter,
    completedItemsPerPage,

  ],

  () => {

    completedPage.value = 1

  }

)


watch(

  completedTotalPages,

  newTotalPages => {

    if (
      completedPage.value >
      newTotalPages
    ) {

      completedPage.value =
        newTotalPages

    }

  }

)


/* */

function clearFilters() {

  departmentFilter.value = null

  positionFilter.value = null

  statusFilter.value = null

  page.value = 1

}


/* */

function clearCompletedFilters() {

  completedSearch.value = ""

  completedDepartmentFilter.value =
    null

  completedPositionFilter.value =
    null

  completedPage.value = 1

}


/* */

const selectedEmployee =
  ref<string | null>(null)


const selectedEmployeeInfo =
  computed(() => {

    if (!selectedEmployee.value) {

      return null

    }

    return (

      employees.value.find(

        employee =>
          employee.employeeId ===
          selectedEmployee.value

      ) ?? null

    )

  })


/* */

const employeeOptions = computed(() => {

  return employees.value
    .filter(
      employee =>
        employee.status !== "Completed"
    )
    .map(employee => ({

      title:
        `${employee.employeeId} - ${employee.name}`,

      value:
        employee.employeeId,

    }))

})


/* */

const employeeIdInput =
  ref("")

const fullName =
  ref("")

const employeeDepartment =
  ref("")

const employeePosition =
  ref("")

const lastWorkingDay =
  ref("")

const reason =
  ref("")


const reasonOptions = [

  "Resignation",

  "Contract End",

  "Retirement",

  "Termination",

  "Transfer",

  "Other",

]


/* */

const canStartOffboarding =
  computed(() => {

    return (

      selectedEmployee.value !== null &&

      employeeIdInput.value.trim() !== "" &&

      fullName.value.trim() !== "" &&

      employeeDepartment.value.trim() !== "" &&

      employeePosition.value.trim() !== "" &&

      lastWorkingDay.value.trim() !== "" &&

      reason.value.trim() !== ""

    )

  })


/* */

function selectEmployee(
  employeeId: string
) {

  selectedEmployee.value =
    employeeId


  const employee =
    employees.value.find(

      item =>
        item.employeeId ===
        employeeId

    )


  if (!employee) {

    return

  }


  employeeIdInput.value =
    employee.employeeId

  fullName.value =
    employee.name

  employeeDepartment.value =
    employee.department

  employeePosition.value =
    employee.position

  lastWorkingDay.value =
    employee.lastWorkingDay

  reason.value =
    employee.reason


  loadChecklist(employee)


  /*
   * Open checklist directly,
   * same behaviour as onboarding.
   */

  tab.value =
    "checklist"

}


/* */

watch(

  selectedEmployee,

  employeeId => {

    if (!employeeId) {

      return

    }


    const employee =
      employees.value.find(

        item =>
          item.employeeId ===
          employeeId

      )


    if (!employee) {

      return

    }


    employeeIdInput.value =
      employee.employeeId

    fullName.value =
      employee.name

    employeeDepartment.value =
      employee.department

    employeePosition.value =
      employee.position

    lastWorkingDay.value =
      employee.lastWorkingDay

    reason.value =
      employee.reason


    loadChecklist(employee)

  }

)


/* */

function startOffboarding() {

  if (
    !canStartOffboarding.value
  ) {

    return

  }


  const employee =
    employees.value.find(

      item =>
        item.employeeId ===
        selectedEmployee.value

    )


  if (!employee) {

    return

  }


  employee.lastWorkingDay =
    lastWorkingDay.value

  employee.reason =
    reason.value


  /*
   * Keep Pending status until
   * checklist progress starts.
   */

  if (
    employee.progress === 0
  ) {

    employee.status =
      "Pending"

  }


  loadChecklist(employee)


  tab.value =
    "checklist"

}


/* */

function clearOffboardingForm() {

  selectedEmployee.value =
    null

  employeeIdInput.value =
    ""

  fullName.value =
    ""

  employeeDepartment.value =
    ""

  employeePosition.value =
    ""

  lastWorkingDay.value =
    ""

  reason.value =
    ""

  resetChecklist()

}


/* */

const checklistCategories = [

  "HR Clearance",

  "Asset Return",

  "System Access",

]


/* */

const defaultChecklistItems =
  ref<ChecklistItem[]>([

    {
      id: 1,
      category: "HR Clearance",
      label: "Resignation Letter Received",
      completed: false,
    },

    {
      id: 2,
      category: "HR Clearance",
      label: "Exit Interview Completed",
      completed: false,
    },

    {
      id: 3,
      category: "Asset Return",
      label: "Laptop Returned",
      completed: false,
    },

    {
      id: 4,
      category: "Asset Return",
      label: "Access Card Returned",
      completed: false,
    },

    {
      id: 5,
      category: "System Access",
      label: "Email Account Disabled",
      completed: false,
    },

  ])


const checklistItemsByCategory =
  (category: string) => {

    return defaultChecklistItems.value.filter(

      item =>
        item.category === category

    )

  }


/* */

function loadChecklist(
  employee: StaffOffboardingRecord
) {

  resetChecklist()


  for (
    const item of
    defaultChecklistItems.value
  ) {

    const savedItem =
      employee.checklist.find(

        saved =>
          saved.id === item.id

      )


    if (savedItem) {

      item.completed =
        savedItem.completed

    }

  }

}


/* */

function resetChecklist() {

  for (
    const item of
    defaultChecklistItems.value
  ) {

    item.completed =
      false

  }

}


/* */

const totalChecklistItems =
  computed(() => {

    return defaultChecklistItems.value.length

  })


/* */

const completedChecklistItems =
  computed(() => {

    return defaultChecklistItems.value.filter(

      item =>
        item.completed

    ).length

  })


/* */

const checklistProgress =
  computed(() => {

    if (
      totalChecklistItems.value ===
      0
    ) {

      return 0

    }


    return Math.round(

      (

        completedChecklistItems.value /

        totalChecklistItems.value

      ) * 100

    )

  })


/* */

function syncChecklistToEmployee(
  employee: StaffOffboardingRecord
) {

  employee.checklist =
    defaultChecklistItems.value.map(
      item => ({

        id:
          item.id,

        category:
          item.category,

        label:
          item.label,

        completed:
          item.completed,

      })
    )

}


/* */

function saveProgress() {

  const employee =
    selectedEmployeeInfo.value


  if (!employee) {

    return

  }


  syncChecklistToEmployee(
    employee
  )


  updateProgress(
    employee
  )

}


/* */

function completeOffboarding() {

  /*
   * Cannot complete until
   * all checklist items are checked.
   */

  if (
    checklistProgress.value <
    100
  ) {

    return

  }


  const employee =
    selectedEmployeeInfo.value


  if (!employee) {

    return

  }


  syncChecklistToEmployee(
    employee
  )


  employee.progress =
    100

  employee.status =
    "Completed"

  employee.completedDate =
    new Date().toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    )


  updateProgress(
    employee
  )


  console.log(
    "Offboarding completed"
  )


  /*
   * Go directly to Completed tab.
   */

  tab.value =
    "completed"

}


/* */

const completedChecklistCategories =
  computed(() => {

    if (
      !viewedCompletedEmployee.value
    ) {

      return []

    }


    return [

      ...new Set(

        viewedCompletedEmployee.value.checklist.map(

          item =>
            item.category

        )

      ),

    ]

  })


function completedChecklistItemsByCategory(

  checklist: ChecklistItem[],

  category: string

) {

  return checklist.filter(

    item =>
      item.category ===
      category

  )

}


/* */

const viewCompletedDialog =
  ref(false)


const viewedCompletedEmployee =
  ref<StaffOffboardingRecord | null>(
    null
  )


function viewCompletedEmployee(
  employeeId: string
) {

  const employee =
    employees.value.find(

      item =>
        item.employeeId ===
        employeeId &&

        item.status ===
          "Completed"

    )


  if (!employee) {

    return

  }


  viewedCompletedEmployee.value =
    employee


  viewCompletedDialog.value =
    true

}


function closeViewCompleted() {

  viewCompletedDialog.value =
    false

  viewedCompletedEmployee.value =
    null

}


/* */

const pendingCount =
  computed(() => {

    return employees.value.filter(

      employee =>
        employee.status ===
        "Pending"

    ).length

  })


const inProgressCount =
  computed(() => {

    return employees.value.filter(

      employee =>
        employee.status ===
        "In Progress"

    ).length

  })


const completedCount =
  computed(() => {

    return employees.value.filter(

      employee =>
        employee.status ===
        "Completed"

    ).length

  })


const thisMonthCount =
  computed(() => {

    const now =
      new Date()


    const currentMonth =
      now.getMonth()


    const currentYear =
      now.getFullYear()


    return employees.value.filter(

      employee => {

        const date =
          parseDate(
            employee.lastWorkingDay
          )


        if (!date) {

          return false

        }


        return (

          date.getMonth() ===
            currentMonth &&

          date.getFullYear() ===
            currentYear

        )

      }

    ).length

  })


/* */

function getInitials(
  name: string
) {

  return name

    .split(" ")

    .filter(Boolean)

    .map(
      word =>
        word.charAt(0)
    )

    .join("")

    .substring(0, 2)

    .toUpperCase()

}


function getStatusColor(
  status: string
) {

  switch (status) {

    case "Pending":

      return "warning"


    case "In Progress":

      return "info"


    case "Completed":

      return "success"


    default:

      return "grey"

  }

}


/* */

function parseDate(
  value: string | Date | undefined
) {

  if (!value) {

    return null

  }


  if (
    value instanceof Date
  ) {

    return value

  }


  /*
   * Supports:
   * 30 Sept 2026
   * 15 Oct 2026
   */

  const parsed =
    new Date(value)


  if (
    !Number.isNaN(
      parsed.getTime()
    )
  ) {

    return parsed

  }


  const match =
    value.match(
      /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/
    )


  if (!match) {

    return null

  }


  const day =
    Number(match[1])

  const month =
    match[2]

  const year =
    Number(match[3])


  const monthMap: Record<
    string,
    number
  > = {

    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,

  }


  if (
    monthMap[month] === undefined
  ) {

    return null

  }


  return new Date(
    year,
    monthMap[month],
    day
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

</style>
