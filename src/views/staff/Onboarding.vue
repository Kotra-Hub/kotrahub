<template>

  <v-container fluid class="pa-6">

    <!-- ============================================================
         BREADCRUMB
         ============================================================ -->

    <div class="d-flex align-center mb-6">

      <v-icon size="20" class="mr-2">
        mdi-account-group-outline
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Staff
      </span>

      <v-icon size="18" class="mx-2">
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Onboarding
      </span>

    </div>


    <!-- ============================================================
         PAGE HEADER
         ============================================================ -->

    <div class="d-flex flex-wrap align-center justify-space-between mb-6">

      <div>

        <h1 class="text-h5 font-weight-bold">
          Employee Onboarding
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage and monitor staff onboarding process
        </p>

      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-account-plus-outline"
        rounded="lg"
        @click="tab = 'register'"
      >
        Register EMployee
      </v-btn>

    </div>


    <!-- ============================================================
         SUMMARY CARDS
         ============================================================ -->

    <v-row class="mb-6">

      <v-col cols="12" sm="6" md="3">

        <AppSummaryCard
          title="Pending"
          :value="pendingCount"
          icon="mdi-clock-outline"
        />

      </v-col>

      <v-col cols="12" sm="6" md="3">

        <AppSummaryCard
          title="In Progress"
          :value="inProgressCount"
          icon="mdi-progress-clock"
        />

      </v-col>

      <v-col cols="12" sm="6" md="3">

        <AppSummaryCard
          title="Completed"
          :value="completedCount"
          icon="mdi-check-circle-outline"
        />

      </v-col>

      <v-col cols="12" sm="6" md="3">

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


        <!-- Register -->

        <v-tab value="register">

          <v-icon start>
            mdi-account-plus-outline
          </v-icon>

          Register

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

          <div class="d-flex flex-wrap align-center justify-space-between pa-5">

            <div>

              <h2 class="text-h6 font-weight-bold">
                Employee List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage onboarding employees
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

                <v-card-title class="text-subtitle-1 font-weight-bold">
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
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Joining Date</th>
                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="employee in paginatedEmployees"
                  :key="employee.id"
                >

                  <!-- Employee ID -->

                  <td>

                    <span class="font-weight-medium">
                      {{ employee.id }}
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


                  <!-- Email -->

                  <td>

                    <span class="text-body-2">
                      {{ employee.email }}
                    </span>

                  </td>


                  <!-- Department -->

                  <td>
                    {{ employee.department }}
                  </td>


                  <!-- Position -->

                  <td>
                    {{ employee.position }}
                  </td>


                  <!-- Joining Date -->

                  <td>
                    {{ employee.joiningDate }}
                  </td>


                  <!-- Status -->

                  <td>

                    <AppStatusChip
                      :status="employee.status"
                      :color="getStatusColor(employee.status)"
                    />

                  </td>


                  <!-- Actions -->

                  <td class="text-center">

                    <v-tooltip text="Open Onboarding">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-arrow-right"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="selectEmployee(employee.id)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <!-- EMPTY STATE -->

                <tr v-if="paginatedEmployees.length === 0">

                  <td
                    colspan="8"
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
               EMPLOYEE LIST PAGINATION
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
           REGISTER
           ========================================================== -->

      <v-window-item value="register">

        <v-row>

          <!-- ======================================================
               REGISTRATION FORM
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
                    Register Employee
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter employee information to start onboarding
                  </div>

                </div>

              </v-card-title>

              <v-divider />

              <v-card-text class="pa-5">

                <v-row>

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
                    />

                  </v-col>


                  <!-- Department -->

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
                      prepend-inner-icon="mdi-office-building-outline"
                    />

                  </v-col>


                  <!-- Position -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="position"
                      label="Position"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-badge-account-outline"
                    />

                  </v-col>


                  <!-- Joining Date -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="joinDate"
                      label="Joining Date"
                      type="date"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-calendar-outline"
                    />

                  </v-col>


                  <!-- Email -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-email-outline"
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
                  :disabled="!canRegisterEmployee"
                  @click="registerEmployee"
                >
                  Register Employee
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
                      {{ selectedDepartment || "-" }}
                    </div>

                  </div>


                  <!-- Position -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Position
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ position || "-" }}
                    </div>

                  </div>


                  <!-- Joining Date -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Joining Date
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ joinDate || "-" }}
                    </div>

                  </div>


                  <!-- Email -->

                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Email
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ email || "-" }}
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
                    Onboarding Checklist
                  </div>

                  <div
                    v-if="selectedEmployeeInfo"
                    class="text-body-2 text-medium-emphasis mt-1"
                  >

                    {{ selectedEmployeeInfo.name }}
                    ·
                    {{ selectedEmployeeInfo.id }}

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
                  v-for="section in checklistSections"
                  :key="section.title"
                  class="mb-6"
                >

                  <!-- Section title -->

                  <div class="text-subtitle-1 font-weight-bold mb-3">
                    {{ section.title }}
                  </div>

                  <v-card
                    variant="outlined"
                    rounded="lg"
                  >

                    <v-list lines="two">

                      <v-list-item
                        v-for="item in section.items"
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
                          {{ item.title }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          {{ item.description }}
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
                  @click="completeOnboarding"
                >
                  Complete Onboarding
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
                    Onboarding Progress
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

          <!-- ======================================================
               COMPLETED HEADER
               ====================================================== -->

          <div class="d-flex flex-wrap align-center justify-space-between pa-5">

            <div>

              <h2 class="text-h6 font-weight-bold">
                Completed Onboarding
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                Employees who have completed the onboarding process
              </p>

            </div>


            <!-- ==================================================
                 COMPLETED FILTER
                 ================================================== -->

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

                <v-card-title class="text-subtitle-1 font-weight-bold">
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


          <!-- ======================================================
               COMPLETED LIST
               ====================================================== -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="employee in paginatedCompletedEmployees"
                :key="employee.id"
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
                        {{ employee.id }}
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


                    <!-- Joining Date -->

                    <div class="mb-2">

                      <span class="text-medium-emphasis">
                        Joining Date:
                      </span>

                      <span class="font-weight-medium ml-1">
                        {{ employee.joiningDate }}
                      </span>

                    </div>


                    <!-- Email -->

                    <div>

                      <span class="text-medium-emphasis">
                        Email:
                      </span>

                      <span class="font-weight-medium ml-1">
                        {{ employee.email }}
                      </span>

                    </div>

                  </div>


                  <!-- Status -->

                  <div class="mt-4">

                    <AppStatusChip
                      :status="'Completed' as any"
                      color="success"
                    />

                  </div>


                  <!-- =================================================
                       VIEW BUTTON
                       ================================================= -->

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
                          @click="viewCompletedEmployee(employee.id)"
                        >
                          View
                        </v-btn>

                      </template>

                    </v-tooltip>

                  </div>

                </v-card>

              </v-col>


              <!-- =================================================
                   EMPTY STATE
                   ================================================= -->

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
                    No completed onboarding
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Completed employees will appear here.
                  </div>

                </div>

              </v-col>

            </v-row>

          </div>


          <!-- ======================================================
               COMPLETED PAGINATION
               ====================================================== -->

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

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Employee Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Completed onboarding information
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
                {{ viewedCompletedEmployee.id }}
              </div>

            </div>

            <v-spacer />

            <AppStatusChip
              :status="'Completed' as any"
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
                {{ viewedCompletedEmployee.id }}
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


            <!-- Email -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Email
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.email }}
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


            <!-- Joining Date -->

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Joining Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ viewedCompletedEmployee.joiningDate }}
              </div>

            </v-col>

          </v-row>


          <v-divider class="my-5" />


          <!-- Onboarding Checklist -->

          <div class="text-subtitle-1 font-weight-bold mb-4">
            Onboarding Checklist
          </div>


          <v-card
            v-for="section in checklistSections"
            :key="section.title"
            variant="outlined"
            rounded="lg"
            class="mb-4"
          >

            <div class="pa-4">

              <div class="font-weight-bold mb-3">
                {{ section.title }}
              </div>


              <div
                v-for="item in section.items"
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
                    {{ item.title }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    {{ item.description }}
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
  useStaffOnboarding,
} from "@/composables/useStaffOnboarding"


/* */

const tab = ref("list")


/* */

const { employees } = useStaffOnboarding()


/* */

const filterMenu = ref(false)

const departmentFilter =
  ref<string | null>(null)

const positionFilter =
  ref<string | null>(null)

const statusFilter =
  ref<string | null>(null)


/* */

const departmentOptions = computed(() => {

  return [

    ...new Set(

      employees.value.map(
        employee => employee.department
      )

    ),

  ]

})


const positionOptions = computed(() => {

  return [

    ...new Set(

      employees.value.map(
        employee => employee.position
      )

    ),

  ]

})


const statusOptions = [
  "Pending",
  "In Progress",
]


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

    if (employee.status === "Completed") {
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

          employee.id
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
          employee.id ===
          selectedEmployee.value

      ) ?? null

    )

  })


/* */

const employeeIdInput =
  ref("")

const fullName =
  ref("")

const selectedDepartment =
  ref<string | null>(null)

const position =
  ref("")

const joinDate =
  ref("")

const email =
  ref("")


/* */

const canRegisterEmployee =
  computed(() => {

    return (

      employeeIdInput.value.trim() !== "" &&

      fullName.value.trim() !== "" &&

      selectedDepartment.value !== null &&

      position.value.trim() !== "" &&

      joinDate.value.trim() !== "" &&

      email.value.trim() !== ""

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
        item.id === employeeId

    )

  if (!employee) {

    return

  }

  employeeIdInput.value =
    employee.id

  fullName.value =
    employee.name

  selectedDepartment.value =
    employee.department

  position.value =
    employee.position

  joinDate.value =
    employee.joiningDate

  /*
   * IMPORTANT:
   * Populate email when selecting
   * employee from Employee List.
   */

  email.value =
    employee.email

  tab.value =
    "checklist"

}


/* */

function registerEmployee() {

  if (
    !canRegisterEmployee.value
  ) {

    return

  }

  console.log(

    "Register employee:",

    {

      employeeId:
        employeeIdInput.value,

      fullName:
        fullName.value,

      department:
        selectedDepartment.value,

      position:
        position.value,

      joiningDate:
        joinDate.value,

      email:
        email.value,

    }

  )

  tab.value =
    "checklist"

}


/* */

function clearRegistrationForm() {

  employeeIdInput.value = ""

  fullName.value = ""

  selectedDepartment.value =
    null

  position.value = ""

  joinDate.value = ""

  email.value = ""

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
          new Date(
            employee.joiningDate
          )

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

interface ChecklistItem {

  id: number

  title: string

  description: string

  completed: boolean

}


interface ChecklistSection {

  title: string

  items: ChecklistItem[]

}


/* */

const checklistSections =
  ref<ChecklistSection[]>([

    /* */

    {

      title: "HR & Documentation",

      items: [

        {

          id: 1,

          title:
            "Submit personal information",

          description:
            "Employee personal details and required documents.",

          completed: false,

        },

        {

          id: 2,

          title:
            "Verify employment documents",

          description:
            "Review and verify employment-related documents.",

          completed: false,

        },

        {

          id: 3,

          title:
            "Complete HR registration",

          description:
            "Create employee record in HR system.",

          completed: false,

        },

      ],

    },


    /* */

    {

      title: "IT Setup",

      items: [

        {

          id: 4,

          title:
            "Create network account",

          description:
            "Create employee network and domain account.",

          completed: false,

        },

        {

          id: 5,

          title:
            "Create email account",

          description:
            "Configure company email account.",

          completed: false,

        },

        {

          id: 6,

          title:
            "Prepare workstation",

          description:
            "Prepare laptop, desktop and required peripherals.",

          completed: false,

        },

        {

          id: 7,

          title:
            "Configure application access",

          description:
            "Grant access to required applications and systems.",

          completed: false,

        },

      ],

    },


    /* */

    {

      title: "Orientation",

      items: [

        {

          id: 8,

          title:
            "Company orientation",

          description:
            "Complete company introduction and orientation.",

          completed: false,

        },

        {

          id: 9,

          title:
            "Department introduction",

          description:
            "Introduce employee to department and team members.",

          completed: false,

        },

        {

          id: 10,

          title:
            "Complete onboarding briefing",

          description:
            "Complete final onboarding briefing.",

          completed: false,

        },

      ],

    },

  ])


/* */

const totalChecklistItems =
  computed(() => {

    return checklistSections.value.reduce(

      (total, section) =>

        total +
        section.items.length,

      0

    )

  })


/* */

const completedChecklistItems =
  computed(() => {

    return checklistSections.value.reduce(

      (total, section) => {

        return (

          total +

          section.items.filter(

            item =>
              item.completed

          ).length

        )

      },

      0

    )

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

function saveProgress() {

  console.log(

    "Checklist progress:",

    checklistSections.value

  )

}


/* */

function completeOnboarding() {

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


  /*
   * Change selected employee
   * status to Completed.
   */

  if (
    selectedEmployeeInfo.value
  ) {

    selectedEmployeeInfo.value.status =
      "Completed"

  }


  console.log(
    "Onboarding completed"
  )


  /*
   * Go directly to Completed tab.
   */

  tab.value =
    "completed"

}


/* */

const viewCompletedDialog =
  ref(false)


const viewedCompletedEmployee =
  ref<any>(null)


function viewCompletedEmployee(
  employeeId: string
) {

  const employee =
    employees.value.find(

      item =>
        item.id === employeeId &&
        item.status === "Completed"

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

function getInitials(
  name: string
) {

  return name

    .split(" ")

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

    case "Cancelled":

      return "error"

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

  min-width: 1200px;

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