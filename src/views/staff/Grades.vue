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
        Grade
      </span>

    </div>


    <!-- ============================================================
         PAGE HEADER
         ============================================================ -->

    <div class="d-flex flex-wrap align-center justify-space-between mb-6">

      <div>

        <h1 class="text-h5 font-weight-bold">
          Grade Management
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage employee grades and grade records
        </p>

      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="tab = 'register'"
      >
        Register Grade
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
          title="Active Grades"
          :value="activeGradeCount"
          icon="mdi-format-list-numbered"
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
          :value="vacantGradeCount"
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
          :value="inactiveGradeCount"
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

        <!-- Grade -->

        <v-tab value="list">

          <v-icon start>
            mdi-format-list-bulleted
          </v-icon>

          Grade

        </v-tab>


        <!-- Register Grade -->

        <v-tab value="register">

          <v-icon start>
            mdi-plus-box-outline
          </v-icon>

          Register Grade

        </v-tab>


        <!-- Grade History -->

        <v-tab value="history">

          <v-icon start>
            mdi-history
          </v-icon>

          Grade History

        </v-tab>


        <!-- Inactive -->

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
           GRADE LIST
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
                Grade List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage active employee grades
              </p>

            </div>


            <!-- ==================================================
                 FILTER
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
                </v-btn>

              </template>


              <v-card
                width="320"
                rounded="lg"
                elevation="8"
              >

                <v-card-title class="text-subtitle-1 font-weight-bold">
                  Filter Grades
                </v-card-title>

                <v-divider />


                <v-card-text>

                  <!-- Grade -->

                  <v-select
                    v-model="gradeFilter"
                    label="Grade"
                    :items="gradeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-format-list-numbered"
                    class="mb-3"
                  />


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
               SEARCH
               ====================================================== -->

          <div class="pa-5">

            <v-text-field
              v-model="search"
              label="Search Grade"
              placeholder="Search grade code or description"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>

          <v-divider />


          <!-- ======================================================
               GRADE TABLE
               ====================================================== -->

          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Grade ID</th>

                  <th>Grade</th>

                  <th>Description</th>

                  <th>Department</th>

                  <th>Employee</th>

                  <th>Vacant</th>

                  <th>Effective Date</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="grade in paginatedGrades"
                  :key="grade.id"
                >

                  <!-- Grade ID -->

                  <td>

                    <span class="font-weight-medium">
                      {{ grade.id }}
                    </span>

                  </td>


                  <!-- Grade -->

                  <td>

                    <span class="font-weight-medium">
                      {{ grade.grade }}
                    </span>

                  </td>


                  <!-- Description -->

                  <td>

                    <span class="text-body-2">
                      {{ grade.description }}
                    </span>

                  </td>


                  <!-- Department -->

                  <td>
                    {{ grade.department }}
                  </td>


                  <!-- Employee -->

                  <td>

                    <span class="font-weight-medium">
                      {{ grade.employeeCount }}
                    </span>

                  </td>


                  <!-- Vacant -->

                  <td>

                    <span
                      :class="
                        grade.vacant > 0
                          ? 'text-warning font-weight-medium'
                          : 'text-success font-weight-medium'
                      "
                    >
                      {{ grade.vacant }}
                    </span>

                  </td>


                  <!-- Effective Date -->

                  <td>
                    {{ grade.effectiveDate }}
                  </td>


                  <!-- Status -->

                  <td>

                    <AppStatusChip
                      :status="grade.status"
                      :color="getStatusColor(grade.status)"
                    />

                  </td>


                  <!-- Actions -->

                  <td class="text-center">

                    <v-tooltip text="View">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-eye-outline"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="viewGrade(grade)"
                        />

                      </template>

                    </v-tooltip>


                    <v-tooltip
                      :text="
                        grade.status === 'Active'
                          ? 'Deactivate'
                          : 'Activate'
                      "
                    >

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          :icon="
                            grade.status === 'Active'
                              ? 'mdi-archive-outline'
                              : 'mdi-archive-arrow-up-outline'
                          "
                          variant="text"
                          size="small"
                          :color="
                            grade.status === 'Active'
                              ? 'error'
                              : 'success'
                          "
                          @click="
                            grade.status === 'Active'
                              ? deactivateGrade(grade)
                              : activateGrade(grade)
                          "
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <!-- EMPTY STATE -->

                <tr v-if="paginatedGrades.length === 0">

                  <td
                    colspan="9"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-format-list-numbered
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No grades found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Try changing your search or filter.
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
                {{ filteredGrades.length }}
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
           REGISTER GRADE
           ========================================================== -->

      <v-window-item value="register">

        <v-row>

          <!-- Registration Form -->

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
                    Register Grade
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter grade information to create a new grade
                  </div>

                </div>

              </v-card-title>

              <v-divider />


              <v-card-text class="pa-5">

                <v-row>

                  <!-- Grade ID -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="gradeIdInput"
                      label="Grade ID"
                      placeholder="e.g. GRD-001"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-identifier"
                    />

                  </v-col>


                  <!-- Grade -->

                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="gradeInput"
                      label="Grade"
                      placeholder="e.g. G1"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-format-list-numbered"
                    />

                  </v-col>


                  <!-- Description -->

                  <v-col
                    cols="12"
                  >

                    <v-text-field
                      v-model="descriptionInput"
                      label="Description"
                      placeholder="e.g. Executive Level 1"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-text-box-outline"
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
                      clearable
                      prepend-inner-icon="mdi-office-building-outline"
                    />

                  </v-col>


                  <!-- Employee Count -->

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


                  <!-- Effective Date -->

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
                  :disabled="!canRegisterGrade"
                  @click="registerGrade"
                >
                  Register Grade
                </v-btn>

              </v-card-actions>

            </v-card>

          </v-col>


          <!-- Preview -->

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
                      Grade ID
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ gradeIdInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Grade
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ gradeInput || "-" }}
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
           GRADE HISTORY
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
                Grade History
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View grade creation and status history
              </p>

            </div>


            <v-text-field
              v-model="historySearch"
              label="Search"
              placeholder="Search grade or action"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
              style="max-width: 320px"
            />

          </div>

          <v-divider />


          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>History ID</th>

                  <th>Grade</th>

                  <th>Department</th>

                  <th>Action</th>

                  <th>Effective Date</th>

                  <th>Changed By</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="history in paginatedHistory"
                  :key="history.id"
                >

                  <td>
                    <span class="font-weight-medium">
                      {{ history.id }}
                    </span>
                  </td>


                  <td>
                    {{ history.grade }}
                  </td>


                  <td>
                    {{ history.department }}
                  </td>


                  <td>
                    {{ history.action }}
                  </td>


                  <td>
                    {{ history.effectiveDate }}
                  </td>


                  <td>
                    {{ history.changedBy }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="history.status"
                      :color="getStatusColor(history.status)"
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
                          @click="viewHistory(history)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr v-if="paginatedHistory.length === 0">

                  <td
                    colspan="8"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-history
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No grade history found
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
                Inactive Grades
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage inactive grades
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
                  Filter Inactive Grades
                </v-card-title>

                <v-divider />


                <v-card-text>

                  <v-text-field
                    v-model="inactiveSearch"
                    label="Search Grade"
                    placeholder="Grade ID or grade"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-magnify"
                    class="mb-3"
                  />


                  <v-select
                    v-model="inactiveDepartmentFilter"
                    label="Department"
                    :items="departmentOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-office-building-outline"
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


          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Grade ID</th>

                  <th>Grade</th>

                  <th>Description</th>

                  <th>Department</th>

                  <th>Employee</th>

                  <th>Inactive Date</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="grade in paginatedInactiveGrades"
                  :key="grade.id"
                >

                  <td>
                    <span class="font-weight-medium">
                      {{ grade.id }}
                    </span>
                  </td>


                  <td>
                    {{ grade.grade }}
                  </td>


                  <td>
                    {{ grade.description }}
                  </td>


                  <td>
                    {{ grade.department }}
                  </td>


                  <td>
                    {{ grade.employeeCount }}
                  </td>


                  <td>
                    {{ grade.inactiveDate || "-" }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="grade.status"
                      :color="getStatusColor(grade.status)"
                    />

                  </td>


                  <td class="text-center">

                    <v-tooltip text="Activate">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-archive-arrow-up-outline"
                          variant="text"
                          size="small"
                          color="success"
                          @click="activateGrade(grade)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr v-if="paginatedInactiveGrades.length === 0">

                  <td
                    colspan="8"
                    class="text-center py-10"
                  >

                    <v-icon
                      size="48"
                      color="grey"
                      class="mb-3"
                    >
                      mdi-archive-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No inactive grades found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Inactive grades will appear here.
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
                {{ filteredInactiveGrades.length }}
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
         GRADE DETAILS DIALOG
         ============================================================ -->

    <v-dialog
      v-model="gradeDetailsDialog"
      max-width="650"
    >

      <v-card
        v-if="selectedGrade"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Grade Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Grade information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeGradeDetails"
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
                mdi-format-list-numbered
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedGrade.grade }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedGrade.id }}
              </div>

            </div>


            <v-spacer />


            <AppStatusChip
              :status="selectedGrade.status"
              :color="getStatusColor(selectedGrade.status)"
            />

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Grade ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedGrade.id }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Grade
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedGrade.grade }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Description
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedGrade.description }}
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
                {{ selectedGrade.department }}
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
                {{ selectedGrade.employeeCount }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Vacant
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedGrade.vacant }}
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
                {{ selectedGrade.effectiveDate }}
              </div>

            </v-col>


            <v-col
              v-if="selectedGrade.inactiveDate"
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Inactive Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedGrade.inactiveDate }}
              </div>

            </v-col>

          </v-row>

        </v-card-text>


        <v-divider />


        <v-card-actions class="pa-4">

          <v-btn
            v-if="selectedGrade.status === 'Active'"
            color="error"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-outline"
            @click="deactivateGrade(selectedGrade)"
          >
            Deactivate
          </v-btn>


          <v-btn
            v-else
            color="success"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-arrow-up-outline"
            @click="activateGrade(selectedGrade)"
          >
            Activate
          </v-btn>


          <v-spacer />


          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeGradeDetails"
          >
            Close
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>


    <!-- ============================================================
         HISTORY DETAILS DIALOG
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
              Grade history record
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
                Grade
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.grade }}
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

type GradeStatus =
  | "Active"
  | "Inactive"

type GradeAction =
  | "Created"
  | "Updated"
  | "Activated"
  | "Deactivated"


interface GradeItem {

  id: string

  grade: string

  description: string

  department: string

  employeeCount: number

  vacant: number

  status: GradeStatus

  effectiveDate: string

  inactiveDate?: string

}


interface GradeHistory {

  id: string

  grade: string

  department: string

  action: GradeAction

  effectiveDate: string

  changedBy: string

  status: GradeStatus

}


/* */

const tab = ref("list")


/* */

const grades = ref<GradeItem[]>([

  {
    id: "GRD-001",
    grade: "G1",
    description: "Executive Level 1",
    department: "Information Technology",
    employeeCount: 8,
    vacant: 2,
    status: "Active",
    effectiveDate: "2026-01-01",
  },

  {
    id: "GRD-002",
    grade: "G2",
    description: "Executive Level 2",
    department: "Information Technology",
    employeeCount: 6,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-01-01",
  },

  {
    id: "GRD-003",
    grade: "G3",
    description: "Senior Executive Level 1",
    department: "Information Technology",
    employeeCount: 5,
    vacant: 0,
    status: "Active",
    effectiveDate: "2026-01-01",
  },

  {
    id: "GRD-004",
    grade: "G4",
    description: "Senior Executive Level 2",
    department: "Human Resources",
    employeeCount: 4,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-01-01",
  },

  {
    id: "GRD-005",
    grade: "G5",
    description: "Assistant Manager",
    department: "Finance",
    employeeCount: 3,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-02-01",
  },

  {
    id: "GRD-006",
    grade: "G6",
    description: "Manager",
    department: "Information Technology",
    employeeCount: 2,
    vacant: 0,
    status: "Active",
    effectiveDate: "2026-02-01",
  },

  {
    id: "GRD-007",
    grade: "G7",
    description: "Senior Manager",
    department: "Human Resources",
    employeeCount: 2,
    vacant: 0,
    status: "Active",
    effectiveDate: "2026-03-01",
  },

  {
    id: "GRD-008",
    grade: "G8",
    description: "Head of Department",
    department: "Finance",
    employeeCount: 1,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-03-01",
  },

  {
    id: "GRD-009",
    grade: "G9",
    description: "Legacy Grade",
    department: "Administration",
    employeeCount: 0,
    vacant: 0,
    status: "Inactive",
    effectiveDate: "2024-01-01",
    inactiveDate: "2026-05-31",
  },

])


/* */

const gradeHistory = ref<GradeHistory[]>([

  {
    id: "GH-001",
    grade: "G1",
    department: "Information Technology",
    action: "Created",
    effectiveDate: "2026-01-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-002",
    grade: "G2",
    department: "Information Technology",
    action: "Created",
    effectiveDate: "2026-01-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-003",
    grade: "G3",
    department: "Information Technology",
    action: "Created",
    effectiveDate: "2026-01-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-004",
    grade: "G4",
    department: "Human Resources",
    action: "Created",
    effectiveDate: "2026-01-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-005",
    grade: "G5",
    department: "Finance",
    action: "Created",
    effectiveDate: "2026-02-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-006",
    grade: "G6",
    department: "Information Technology",
    action: "Created",
    effectiveDate: "2026-02-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-007",
    grade: "G7",
    department: "Human Resources",
    action: "Created",
    effectiveDate: "2026-03-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-008",
    grade: "G8",
    department: "Finance",
    action: "Created",
    effectiveDate: "2026-03-01",
    changedBy: "Admin",
    status: "Active",
  },

  {
    id: "GH-009",
    grade: "G9",
    department: "Administration",
    action: "Deactivated",
    effectiveDate: "2026-05-31",
    changedBy: "Admin",
    status: "Inactive",
  },

])


/* */

const filterMenu = ref(false)

const search = ref("")

const gradeFilter =
  ref<string | null>(null)

const departmentFilter =
  ref<string | null>(null)

const statusFilter =
  ref<string | null>("Active")


/* */

const gradeOptions = computed(() => {

  return [
    ...new Set(
      grades.value.map(
        grade => grade.grade
      )
    ),
  ]

})


const departmentOptions = computed(() => {

  return [
    ...new Set(
      grades.value.map(
        grade => grade.department
      )
    ),
  ]

})


const statusOptions = [
  "Active",
  "Inactive",
]


/* */

const filteredGrades = computed(() => {

  const keyword =
    search.value
      .trim()
      .toLowerCase()

  return grades.value.filter(grade => {

    const searchMatch =
      !keyword ||
      grade.id
        .toLowerCase()
        .includes(keyword) ||
      grade.grade
        .toLowerCase()
        .includes(keyword) ||
      grade.description
        .toLowerCase()
        .includes(keyword)

    const gradeMatch =
      !gradeFilter.value ||
      grade.grade === gradeFilter.value

    const departmentMatch =
      !departmentFilter.value ||
      grade.department ===
        departmentFilter.value

    const statusMatch =
      !statusFilter.value ||
      grade.status === statusFilter.value

    return (
      searchMatch &&
      gradeMatch &&
      departmentMatch &&
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

      filteredGrades.value.length /
      itemsPerPage.value

    )

  )

})


const paginatedGrades = computed(() => {

  const start =
    (page.value - 1) *
    itemsPerPage.value

  const end =
    start +
    itemsPerPage.value

  return filteredGrades.value.slice(
    start,
    end
  )

})


const displayedStart = computed(() => {

  if (
    filteredGrades.value.length === 0
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

    filteredGrades.value.length

  )

})


/* */

const activeGradeCount = computed(() => {

  return grades.value.filter(
    grade =>
      grade.status === "Active"
  ).length

})


const inactiveGradeCount = computed(() => {

  return grades.value.filter(
    grade =>
      grade.status === "Inactive"
  ).length

})


const assignedEmployeeCount = computed(() => {

  return grades.value

    .filter(
      grade =>
        grade.status === "Active"
    )

    .reduce(

      (total, grade) =>
        total + grade.employeeCount,

      0

    )

})


const vacantGradeCount = computed(() => {

  return grades.value

    .filter(
      grade =>
        grade.status === "Active"
    )

    .reduce(

      (total, grade) =>
        total + grade.vacant,

      0

    )

})


/* */

watch(

  [
    search,
    gradeFilter,
    departmentFilter,
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

function clearFilters() {

  search.value = ""

  gradeFilter.value = null

  departmentFilter.value = null

  statusFilter.value = "Active"

  page.value = 1

}


/* */

const gradeIdInput =
  ref("")

const gradeInput =
  ref("")

const descriptionInput =
  ref("")

const selectedDepartment =
  ref<string | null>(null)

const employeeCountInput =
  ref(0)

const effectiveDateInput =
  ref("")


/* */

const canRegisterGrade = computed(() => {

  return (

    gradeIdInput.value.trim() !== "" &&

    gradeInput.value.trim() !== "" &&

    descriptionInput.value.trim() !== "" &&

    selectedDepartment.value !== null &&

    effectiveDateInput.value.trim() !== ""

  )

})


/* */

function registerGrade() {

  if (
    !canRegisterGrade.value
  ) {

    return

  }


  const newGrade: GradeItem = {

    id:
      gradeIdInput.value.trim(),

    grade:
      gradeInput.value.trim(),

    description:
      descriptionInput.value.trim(),

    department:
      selectedDepartment.value as string,

    employeeCount:
      employeeCountInput.value || 0,

    vacant: 0,

    status: "Active",

    effectiveDate:
      effectiveDateInput.value,

  }


  grades.value.push(newGrade)


  gradeHistory.value.unshift({

    id:
      `GH-${String(
        gradeHistory.value.length + 1
      ).padStart(3, "0")}`,

    grade:
      newGrade.grade,

    department:
      newGrade.department,

    action:
      "Created",

    effectiveDate:
      newGrade.effectiveDate,

    changedBy:
      "Admin",

    status:
      "Active",

  })


  clearRegistrationForm()

  tab.value = "list"

}


/* */

function clearRegistrationForm() {

  gradeIdInput.value = ""

  gradeInput.value = ""

  descriptionInput.value = ""

  selectedDepartment.value = null

  employeeCountInput.value = 0

  effectiveDateInput.value = ""

}


/* */

const gradeDetailsDialog =
  ref(false)

const selectedGrade =
  ref<GradeItem | null>(null)


function viewGrade(
  grade: GradeItem
) {

  selectedGrade.value =
    grade

  gradeDetailsDialog.value =
    true

}


function closeGradeDetails() {

  gradeDetailsDialog.value =
    false

  selectedGrade.value =
    null

}


/* */

function deactivateGrade(
  grade: GradeItem
) {

  grade.status = "Inactive"

  grade.inactiveDate =
    new Date()
      .toISOString()
      .split("T")[0]


  gradeHistory.value.unshift({

    id:
      `GH-${String(
        gradeHistory.value.length + 1
      ).padStart(3, "0")}`,

    grade:
      grade.grade,

    department:
      grade.department,

    action:
      "Deactivated",

    effectiveDate:
      grade.inactiveDate,

    changedBy:
      "Admin",

    status:
      "Inactive",

  })


  closeGradeDetails()

}


/* */

function activateGrade(
  grade: GradeItem
) {

  grade.status = "Active"

  grade.inactiveDate =
    undefined


  gradeHistory.value.unshift({

    id:
      `GH-${String(
        gradeHistory.value.length + 1
      ).padStart(3, "0")}`,

    grade:
      grade.grade,

    department:
      grade.department,

    action:
      "Activated",

    effectiveDate:
      new Date()
        .toISOString()
        .split("T")[0],

    changedBy:
      "Admin",

    status:
      "Active",

  })


  closeGradeDetails()

}


/* */

const historySearch =
  ref("")


const filteredHistory =
  computed(() => {

    const keyword =
      historySearch.value
        .trim()
        .toLowerCase()

    if (!keyword) {

      return gradeHistory.value

    }

    return gradeHistory.value.filter(
      history =>

        history.id
          .toLowerCase()
          .includes(keyword) ||

        history.grade
          .toLowerCase()
          .includes(keyword) ||

        history.department
          .toLowerCase()
          .includes(keyword) ||

        history.action
          .toLowerCase()
          .includes(keyword)

    )

  })


/* */

const historyPage = ref(1)

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
    historyItemsPerPage,
  ],

  () => {

    historyPage.value = 1

  }

)


watch(

  historyTotalPages,

  newTotalPages => {

    if (
      historyPage.value >
      newTotalPages
    ) {

      historyPage.value =
        newTotalPages

    }

  }

)


/* */

const historyDetailsDialog =
  ref(false)

const selectedHistory =
  ref<GradeHistory | null>(null)


function viewHistory(
  history: GradeHistory
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

const inactiveFilterMenu =
  ref(false)

const inactiveSearch =
  ref("")

const inactiveDepartmentFilter =
  ref<string | null>(null)


/* */

const filteredInactiveGrades =
  computed(() => {

    const keyword =
      inactiveSearch.value
        .trim()
        .toLowerCase()

    return grades.value.filter(
      grade => {

        if (
          grade.status !== "Inactive"
        ) {

          return false

        }


        const searchMatch =
          !keyword ||

          grade.id
            .toLowerCase()
            .includes(keyword) ||

          grade.grade
            .toLowerCase()
            .includes(keyword) ||

          grade.description
            .toLowerCase()
            .includes(keyword)


        const departmentMatch =
          !inactiveDepartmentFilter.value ||

          grade.department ===
            inactiveDepartmentFilter.value


        return (
          searchMatch &&
          departmentMatch
        )

      }

    )

  })


/* */

const inactivePage =
  ref(1)

const inactiveItemsPerPage =
  ref(5)


const inactiveTotalPages =
  computed(() => {

    return Math.max(

      1,

      Math.ceil(

        filteredInactiveGrades.value.length /
        inactiveItemsPerPage.value

      )

    )

  })


const paginatedInactiveGrades =
  computed(() => {

    const start =
      (inactivePage.value - 1) *
      inactiveItemsPerPage.value

    const end =
      start +
      inactiveItemsPerPage.value

    return filteredInactiveGrades.value.slice(
      start,
      end
    )

  })


const inactiveDisplayedStart =
  computed(() => {

    if (
      filteredInactiveGrades.value.length === 0
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

      filteredInactiveGrades.value.length

    )

  })


watch(

  [
    inactiveSearch,
    inactiveDepartmentFilter,
    inactiveItemsPerPage,
  ],

  () => {

    inactivePage.value = 1

  }

)


watch(

  inactiveTotalPages,

  newTotalPages => {

    if (
      inactivePage.value >
      newTotalPages
    ) {

      inactivePage.value =
        newTotalPages

    }

  }

)


/* */

function clearInactiveFilters() {

  inactiveSearch.value = ""

  inactiveDepartmentFilter.value =
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


@media (max-width: 700px) {

  .pagination-wrapper {

    flex-direction: column;

    align-items: center;

  }

}

</style>