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
        mdi-domain
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Organization
      </span>

      <v-icon
        size="18"
        class="mx-2"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Departments
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
          Department Management
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage organization departments and department records
        </p>

      </div>


      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="tab = 'new'"
      >
        New Department
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
          title="Active Departments"
          :value="activeDepartmentCount"
          icon="mdi-domain"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Employees"
          :value="assignedEmployeeCount"
          icon="mdi-account-group-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Department Heads"
          :value="departmentHeadCount"
          icon="mdi-account-tie-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Inactive"
          :value="inactiveDepartmentCount"
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
            mdi-domain
          </v-icon>

          Department

        </v-tab>


        <v-tab value="new">

          <v-icon start>
            mdi-plus-box-outline
          </v-icon>

          New Department

        </v-tab>


        <v-tab value="active">

          <v-icon start>
            mdi-check-circle-outline
          </v-icon>

          Active

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
           DEPARTMENT
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
                Department List
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage organization departments
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
                  Filter Departments
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="departmentTypeFilter"
                    label="Department Type"
                    :items="departmentTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="departmentHeadFilter"
                    label="Department Head"
                    :items="departmentHeadOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-account-tie-outline"
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
              label="Search Department"
              placeholder="Search department code, name or location"
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

                  <th>Department ID</th>

                  <th>Department</th>

                  <th>Type</th>

                  <th>Department Head</th>

                  <th>Employee</th>

                  <th>Location</th>

                  <th>Effective Date</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="department in paginatedDepartments"
                  :key="department.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ department.id }}
                    </span>

                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ department.name }}
                    </span>

                  </td>


                  <td>
                    {{ department.type }}
                  </td>


                  <td>
                    {{ department.head }}
                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ department.employeeCount }}
                    </span>

                  </td>


                  <td>
                    {{ department.location }}
                  </td>


                  <td>
                    {{ department.effectiveDate }}
                  </td>


                  <td>

                    <AppStatusChip
                      :status="department.status"
                      :color="getStatusColor(department.status)"
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
                          @click="viewDepartment(department)"
                        />

                      </template>

                    </v-tooltip>


                    <v-tooltip
                      :text="
                        department.status === 'Active'
                          ? 'Deactivate'
                          : 'Activate'
                      "
                    >

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          :icon="
                            department.status === 'Active'
                              ? 'mdi-archive-outline'
                              : 'mdi-archive-arrow-up-outline'
                          "
                          variant="text"
                          size="small"
                          :color="
                            department.status === 'Active'
                              ? 'error'
                              : 'success'
                          "
                          @click="
                            department.status === 'Active'
                              ? deactivateDepartment(department)
                              : activateDepartment(department)
                          "
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <!-- EMPTY -->

                <tr
                  v-if="paginatedDepartments.length === 0"
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
                      mdi-domain-off
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No departments found
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
                {{ filteredDepartments.length }}
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
           NEW DEPARTMENT
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
                    New Department
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter department information to create a new department
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
                      v-model="departmentIdInput"
                      label="Department ID"
                      placeholder="e.g. DEPT-001"
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
                      v-model="departmentNameInput"
                      label="Department"
                      placeholder="e.g. Information Technology"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-domain"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="selectedDepartmentType"
                      label="Department Type"
                      :items="departmentTypeOptions"
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

                    <v-text-field
                      v-model="departmentHeadInput"
                      label="Department Head"
                      placeholder="e.g. Jonathan Lim"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-tie-outline"
                    />

                  </v-col>


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
                  :disabled="!canRegisterDepartment"
                  @click="registerDepartment"
                >
                  Create Department
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
                      Department ID
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ departmentIdInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Department
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ departmentNameInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Department Type
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedDepartmentType || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Department Head
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ departmentHeadInput || "-" }}
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
                      Location
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedLocation || "-" }}
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
           ACTIVE DEPARTMENTS
           ========================================================== -->

      <v-window-item value="active">

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
                Active Departments
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage active organization departments
              </p>

            </div>


            <!-- FILTER -->

            <v-menu
              v-model="activeFilterMenu"
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
                  Filter Active Departments
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="activeTypeFilter"
                    label="Department Type"
                    :items="departmentTypeOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-shape-outline"
                    class="mb-3"
                  />


                  <v-select
                    v-model="activeLocationFilter"
                    label="Location"
                    :items="locationOptions"
                    variant="outlined"
                    density="comfortable"
                    clearable
                    rounded="lg"
                    prepend-inner-icon="mdi-map-marker-outline"
                  />

                </v-card-text>


                <v-divider />


                <v-card-actions class="pa-4">

                  <v-btn
                    variant="text"
                    @click="clearActiveFilters"
                  >
                    Clear
                  </v-btn>

                  <v-spacer />

                  <v-btn
                    color="primary"
                    rounded="lg"
                    @click="activeFilterMenu = false"
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
              v-model="activeSearch"
              label="Search Department"
              placeholder="Search department, head or location"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <!-- ACTIVE CARDS -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="department in paginatedActiveDepartments"
                :key="department.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="department-card h-100"
                >

                  <!-- CARD HEADER -->

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="primary"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-domain
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ department.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ department.id }}
                      </div>

                    </div>


                    <AppStatusChip
                      :status="department.status"
                      :color="getStatusColor(department.status)"
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
                        mdi-shape-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Department Type
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ department.type }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-tie-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Department Head
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ department.head }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-group-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Employee
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ department.employeeCount }}
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
                          {{ department.location }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-calendar-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Effective Date
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ department.effectiveDate }}
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
                      @click="viewDepartment(department)"
                    >
                      View
                    </v-btn>

                    <v-spacer />

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-archive-outline"
                      color="error"
                      @click="deactivateDepartment(department)"
                    >
                      Deactivate
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <!-- EMPTY -->

              <v-col
                v-if="paginatedActiveDepartments.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-domain-off
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No active departments found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Active departments will appear here.
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
                v-model="activeItemsPerPage"
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
                {{ activeDisplayedStart }}
              </span>

              –

              <span class="font-weight-medium">
                {{ activeDisplayedEnd }}
              </span>

              of

              <span class="font-weight-medium">
                {{ filteredActiveDepartments.length }}
              </span>

            </div>


            <v-pagination
              v-model="activePage"
              :length="activeTotalPages"
              :total-visible="5"
              density="comfortable"
              rounded="circle"
            />

          </div>

        </v-card>

      </v-window-item>


      <!-- ==========================================================
           INACTIVE DEPARTMENTS
           ========================================================== -->

      <v-window-item value="inactive">

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
                Inactive Departments
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage inactive organization departments
              </p>

            </div>


            <!-- FILTER -->

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

                <v-card-title
                  class="text-subtitle-1 font-weight-bold"
                >
                  Filter Inactive Departments
                </v-card-title>


                <v-divider />


                <v-card-text>

                  <v-select
                    v-model="inactiveTypeFilter"
                    label="Department Type"
                    :items="departmentTypeOptions"
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
              label="Search Department"
              placeholder="Search department, head or location"
              variant="outlined"
              density="comfortable"
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              hide-details
            />

          </div>


          <v-divider />


          <!-- INACTIVE CARDS -->

          <div class="pa-5">

            <v-row>

              <v-col
                v-for="department in paginatedInactiveDepartments"
                :key="department.id"
                cols="12"
                sm="6"
                lg="4"
              >

                <v-card
                  rounded="xl"
                  elevation="0"
                  class="department-card h-100"
                >

                  <!-- CARD HEADER -->

                  <div class="d-flex align-start pa-5">

                    <v-avatar
                      size="48"
                      color="grey"
                      variant="tonal"
                      class="mr-4"
                    >

                      <v-icon size="24">
                        mdi-domain-off
                      </v-icon>

                    </v-avatar>


                    <div class="flex-grow-1">

                      <div class="text-subtitle-1 font-weight-bold">
                        {{ department.name }}
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        {{ department.id }}
                      </div>

                    </div>


                    <AppStatusChip
                      :status="department.status"
                      :color="getStatusColor(department.status)"
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
                        mdi-shape-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Department Type
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ department.type }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-tie-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Department Head
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ department.head }}
                        </div>

                      </div>

                    </div>


                    <div class="d-flex align-start mb-4">

                      <v-icon
                        size="20"
                        color="grey"
                        class="mr-3 mt-1"
                      >
                        mdi-account-group-outline
                      </v-icon>

                      <div>

                        <div class="text-caption text-medium-emphasis">
                          Employee
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ department.employeeCount }}
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
                          {{ department.location }}
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
                          {{ department.inactiveDate || "-" }}
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
                      @click="viewDepartment(department)"
                    >
                      View
                    </v-btn>

                    <v-spacer />

                    <v-btn
                      variant="outlined"
                      rounded="lg"
                      prepend-icon="mdi-archive-arrow-up-outline"
                      color="success"
                      @click="activateDepartment(department)"
                    >
                      Activate
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-col>


              <!-- EMPTY -->

              <v-col
                v-if="paginatedInactiveDepartments.length === 0"
                cols="12"
              >

                <div class="text-center py-10">

                  <v-icon
                    size="48"
                    color="grey"
                    class="mb-3"
                  >
                    mdi-domain-off
                  </v-icon>

                  <div class="text-body-1 font-weight-medium">
                    No inactive departments found
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Inactive departments will appear here.
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
                {{ filteredInactiveDepartments.length }}
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
         DEPARTMENT DETAILS
         ============================================================ -->

    <v-dialog
      v-model="departmentDetailsDialog"
      max-width="700"
    >

      <v-card
        v-if="selectedDepartment"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Department Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Department information
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closeDepartmentDetails"
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
                mdi-domain
              </v-icon>

            </v-avatar>


            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedDepartment.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedDepartment.id }}
              </div>

            </div>


            <v-spacer />


            <AppStatusChip
              :status="selectedDepartment.status"
              :color="getStatusColor(selectedDepartment.status)"
            />

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Department ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedDepartment.id }}
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
                {{ selectedDepartment.name }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Department Type
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedDepartment.type }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Department Head
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedDepartment.head }}
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
                {{ selectedDepartment.employeeCount }}
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
                {{ selectedDepartment.location }}
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
                {{ selectedDepartment.effectiveDate }}
              </div>

            </v-col>


            <v-col
              v-if="selectedDepartment.inactiveDate"
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Inactive Date
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedDepartment.inactiveDate }}
              </div>

            </v-col>

          </v-row>

        </v-card-text>


        <v-divider />


        <v-card-actions class="pa-4">

          <v-btn
            v-if="selectedDepartment.status === 'Active'"
            color="error"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-outline"
            @click="deactivateDepartment(selectedDepartment)"
          >
            Deactivate
          </v-btn>


          <v-btn
            v-else
            color="success"
            variant="outlined"
            rounded="lg"
            prepend-icon="mdi-archive-arrow-up-outline"
            @click="activateDepartment(selectedDepartment)"
          >
            Activate
          </v-btn>


          <v-spacer />


          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeDepartmentDetails"
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

type DepartmentStatus =
  | "Active"
  | "Inactive"


interface DepartmentItem {

  id: string

  name: string

  type: string

  head: string

  employeeCount: number

  location: string

  status: DepartmentStatus

  effectiveDate: string

  inactiveDate?: string

}


/* */

const tab =
  ref("list")


/* */

const departments =
  ref<DepartmentItem[]>([

    {
      id: "DEPT-001",
      name: "Information Technology",
      type: "Corporate",
      head: "Jonathan Lim",
      employeeCount: 18,
      location: "Head Office",
      status: "Active",
      effectiveDate: "2026-01-01",
    },

    {
      id: "DEPT-002",
      name: "Human Resources",
      type: "Corporate",
      head: "Teo Mei Ling",
      employeeCount: 12,
      location: "Head Office",
      status: "Active",
      effectiveDate: "2026-01-01",
    },

    {
      id: "DEPT-003",
      name: "Finance",
      type: "Corporate",
      head: "Farah Ahmad",
      employeeCount: 15,
      location: "Head Office",
      status: "Active",
      effectiveDate: "2026-01-01",
    },

    {
      id: "DEPT-004",
      name: "Procurement",
      type: "Corporate",
      head: "Nisha Kumar",
      employeeCount: 10,
      location: "Head Office",
      status: "Active",
      effectiveDate: "2026-02-01",
    },

    {
      id: "DEPT-005",
      name: "Quality Assurance",
      type: "Operations",
      head: "Daniel Tan",
      employeeCount: 22,
      location: "Manufacturing Plant",
      status: "Active",
      effectiveDate: "2026-02-01",
    },

    {
      id: "DEPT-006",
      name: "Production",
      type: "Operations",
      head: "Azman Rahman",
      employeeCount: 85,
      location: "Manufacturing Plant",
      status: "Active",
      effectiveDate: "2026-02-01",
    },

    {
      id: "DEPT-007",
      name: "Warehouse Operations",
      type: "Operations",
      head: "Ravi Kumar",
      employeeCount: 35,
      location: "Warehouse",
      status: "Active",
      effectiveDate: "2026-02-15",
    },

    {
      id: "DEPT-008",
      name: "Marketing",
      type: "Corporate",
      head: "Sarah Lee",
      employeeCount: 14,
      location: "Head Office",
      status: "Active",
      effectiveDate: "2026-03-01",
    },

    {
      id: "DEPT-009",
      name: "Sales",
      type: "Commercial",
      head: "Amir Hakim",
      employeeCount: 28,
      location: "Kuala Lumpur Office",
      status: "Active",
      effectiveDate: "2026-03-01",
    },

    {
      id: "DEPT-010",
      name: "Old Administration",
      type: "Corporate",
      head: "Former Department",
      employeeCount: 0,
      location: "Old Office",
      status: "Inactive",
      effectiveDate: "2024-01-01",
      inactiveDate: "2026-05-31",
    },

  ])


/* */

const filterMenu =
  ref(false)

const search =
  ref("")

const departmentTypeFilter =
  ref<string | null>(null)

const departmentHeadFilter =
  ref<string | null>(null)

const locationFilter =
  ref<string | null>(null)

const statusFilter =
  ref<string | null>("Active")


const departmentTypeOptions =
  computed(() => {

    return [
      ...new Set(
        departments.value.map(
          department => department.type
        )
      ),
    ]

  })


const departmentHeadOptions =
  computed(() => {

    return [
      ...new Set(
        departments.value.map(
          department => department.head
        )
      ),
    ]

  })


const locationOptions =
  computed(() => {

    return [
      ...new Set(
        departments.value.map(
          department => department.location
        )
      ),
    ]

  })


const statusOptions = [
  "Active",
  "Inactive",
]


/* */

const filteredDepartments =
  computed(() => {

    const keyword =
      search.value
        .trim()
        .toLowerCase()


    return departments.value.filter(
      department => {

        const searchMatch =
          !keyword ||
          department.id
            .toLowerCase()
            .includes(keyword) ||
          department.name
            .toLowerCase()
            .includes(keyword) ||
          department.type
            .toLowerCase()
            .includes(keyword) ||
          department.head
            .toLowerCase()
            .includes(keyword) ||
          department.location
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !departmentTypeFilter.value ||
          department.type ===
            departmentTypeFilter.value


        const headMatch =
          !departmentHeadFilter.value ||
          department.head ===
            departmentHeadFilter.value


        const locationMatch =
          !locationFilter.value ||
          department.location ===
            locationFilter.value


        const statusMatch =
          !statusFilter.value ||
          department.status ===
            statusFilter.value


        return (
          searchMatch &&
          typeMatch &&
          headMatch &&
          locationMatch &&
          statusMatch
        )

      }
    )

  })


/* */

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
        filteredDepartments.value.length /
          itemsPerPage.value
      )
    )

  })


const paginatedDepartments =
  computed(() => {

    const start =
      (page.value - 1) *
      itemsPerPage.value

    const end =
      start +
      itemsPerPage.value

    return filteredDepartments.value.slice(
      start,
      end
    )

  })


const displayedStart =
  computed(() => {

    if (
      filteredDepartments.value.length === 0
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
      filteredDepartments.value.length
    )

  })


watch(
  [
    search,
    departmentTypeFilter,
    departmentHeadFilter,
    locationFilter,
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

    if (
      page.value > total
    ) {

      page.value = total

    }

  }
)


function clearFilters() {

  search.value = ""

  departmentTypeFilter.value =
    null

  departmentHeadFilter.value =
    null

  locationFilter.value =
    null

  statusFilter.value =
    "Active"

  page.value = 1

}


/* */

const activeDepartmentCount =
  computed(() => {

    return departments.value.filter(
      department =>
        department.status === "Active"
    ).length

  })


const inactiveDepartmentCount =
  computed(() => {

    return departments.value.filter(
      department =>
        department.status === "Inactive"
    ).length

  })


const assignedEmployeeCount =
  computed(() => {

    return departments.value
      .filter(
        department =>
          department.status === "Active"
      )
      .reduce(
        (total, department) =>
          total +
          department.employeeCount,
        0
      )

  })


const departmentHeadCount =
  computed(() => {

    return departments.value.filter(
      department =>
        department.status === "Active" &&
        department.head.trim() !== ""
    ).length

  })


/* */

const departmentIdInput =
  ref("")

const departmentNameInput =
  ref("")

const selectedDepartmentType =
  ref<string | null>(null)

const departmentHeadInput =
  ref("")

const employeeCountInput =
  ref(0)

const selectedLocation =
  ref<string | null>(null)

const effectiveDateInput =
  ref("")


const canRegisterDepartment =
  computed(() => {

    return (
      departmentIdInput.value.trim() !== "" &&
      departmentNameInput.value.trim() !== "" &&
      selectedDepartmentType.value !== null &&
      departmentHeadInput.value.trim() !== "" &&
      selectedLocation.value !== null &&
      effectiveDateInput.value.trim() !== ""
    )

  })


function registerDepartment() {

  if (
    !canRegisterDepartment.value
  ) {

    return

  }


  const newDepartment: DepartmentItem = {

    id:
      departmentIdInput.value.trim(),

    name:
      departmentNameInput.value.trim(),

    type:
      selectedDepartmentType.value as string,

    head:
      departmentHeadInput.value.trim(),

    employeeCount:
      employeeCountInput.value || 0,

    location:
      selectedLocation.value as string,

    status:
      "Active",

    effectiveDate:
      effectiveDateInput.value,

  }


  departments.value.push(
    newDepartment
  )


  clearRegistrationForm()

  tab.value = "list"

}


function clearRegistrationForm() {

  departmentIdInput.value = ""

  departmentNameInput.value = ""

  selectedDepartmentType.value =
    null

  departmentHeadInput.value = ""

  employeeCountInput.value = 0

  selectedLocation.value = null

  effectiveDateInput.value = ""

}


/* */

const departmentDetailsDialog =
  ref(false)

const selectedDepartment =
  ref<DepartmentItem | null>(null)


function viewDepartment(
  department: DepartmentItem
) {

  selectedDepartment.value =
    department

  departmentDetailsDialog.value =
    true

}


function closeDepartmentDetails() {

  departmentDetailsDialog.value =
    false

  selectedDepartment.value =
    null

}


/* */

function deactivateDepartment(
  department: DepartmentItem
) {

  const today =
    new Date()
      .toISOString()
      .split("T")[0]


  department.status =
    "Inactive"

  department.inactiveDate =
    today


  closeDepartmentDetails()

}


/* */

function activateDepartment(
  department: DepartmentItem
) {

  department.status =
    "Active"

  department.inactiveDate =
    undefined


  closeDepartmentDetails()

}


/* */

const activeFilterMenu =
  ref(false)

const activeSearch =
  ref("")

const activeTypeFilter =
  ref<string | null>(null)

const activeLocationFilter =
  ref<string | null>(null)


const filteredActiveDepartments =
  computed(() => {

    const keyword =
      activeSearch.value
        .trim()
        .toLowerCase()


    return departments.value.filter(
      department => {

        if (
          department.status !== "Active"
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          department.id
            .toLowerCase()
            .includes(keyword) ||
          department.name
            .toLowerCase()
            .includes(keyword) ||
          department.head
            .toLowerCase()
            .includes(keyword) ||
          department.location
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !activeTypeFilter.value ||
          department.type ===
            activeTypeFilter.value


        const locationMatch =
          !activeLocationFilter.value ||
          department.location ===
            activeLocationFilter.value


        return (
          searchMatch &&
          typeMatch &&
          locationMatch
        )

      }
    )

  })


const activePage =
  ref(1)

const activeItemsPerPage =
  ref(5)


const activeTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredActiveDepartments.value.length /
          activeItemsPerPage.value
      )
    )

  })


const paginatedActiveDepartments =
  computed(() => {

    const start =
      (activePage.value - 1) *
      activeItemsPerPage.value

    const end =
      start +
      activeItemsPerPage.value

    return filteredActiveDepartments.value.slice(
      start,
      end
    )

  })


const activeDisplayedStart =
  computed(() => {

    if (
      filteredActiveDepartments.value.length === 0
    ) {

      return 0

    }

    return (
      (activePage.value - 1) *
      activeItemsPerPage.value
    ) + 1

  })


const activeDisplayedEnd =
  computed(() => {

    return Math.min(
      activePage.value *
        activeItemsPerPage.value,
      filteredActiveDepartments.value.length
    )

  })


watch(
  [
    activeSearch,
    activeTypeFilter,
    activeLocationFilter,
    activeItemsPerPage,
  ],
  () => {

    activePage.value = 1

  }
)


watch(
  activeTotalPages,
  total => {

    if (
      activePage.value > total
    ) {

      activePage.value =
        total

    }

  }
)


function clearActiveFilters() {

  activeSearch.value = ""

  activeTypeFilter.value =
    null

  activeLocationFilter.value =
    null

  activePage.value = 1

}


/* */

const inactiveFilterMenu =
  ref(false)

const inactiveSearch =
  ref("")

const inactiveTypeFilter =
  ref<string | null>(null)


const filteredInactiveDepartments =
  computed(() => {

    const keyword =
      inactiveSearch.value
        .trim()
        .toLowerCase()


    return departments.value.filter(
      department => {

        if (
          department.status !== "Inactive"
        ) {

          return false

        }


        const searchMatch =
          !keyword ||
          department.id
            .toLowerCase()
            .includes(keyword) ||
          department.name
            .toLowerCase()
            .includes(keyword) ||
          department.head
            .toLowerCase()
            .includes(keyword) ||
          department.location
            .toLowerCase()
            .includes(keyword)


        const typeMatch =
          !inactiveTypeFilter.value ||
          department.type ===
            inactiveTypeFilter.value


        return (
          searchMatch &&
          typeMatch
        )

      }
    )

  })


const inactivePage =
  ref(1)

const inactiveItemsPerPage =
  ref(5)


const inactiveTotalPages =
  computed(() => {

    return Math.max(
      1,
      Math.ceil(
        filteredInactiveDepartments.value.length /
          inactiveItemsPerPage.value
      )
    )

  })


const paginatedInactiveDepartments =
  computed(() => {

    const start =
      (inactivePage.value - 1) *
      inactiveItemsPerPage.value

    const end =
      start +
      inactiveItemsPerPage.value

    return filteredInactiveDepartments.value.slice(
      start,
      end
    )

  })


const inactiveDisplayedStart =
  computed(() => {

    if (
      filteredInactiveDepartments.value.length === 0
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
      filteredInactiveDepartments.value.length
    )

  })


watch(
  [
    inactiveSearch,
    inactiveTypeFilter,
    inactiveItemsPerPage,
  ],
  () => {

    inactivePage.value = 1

  }
)


watch(
  inactiveTotalPages,
  total => {

    if (
      inactivePage.value > total
    ) {

      inactivePage.value =
        total

    }

  }
)


function clearInactiveFilters() {

  inactiveSearch.value = ""

  inactiveTypeFilter.value =
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


@media (max-width: 700px) {

  .pagination-wrapper {

    flex-direction: column;

    align-items: center;

  }

}


/* */

.department-card {

  border: 1px solid #d9d9d9 !important;

  border-radius: 16px !important;

  overflow: hidden;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

}


.department-card:hover {

  transform: translateY(-2px);

  border-color: #bdbdbd !important;

  box-shadow:
    0 4px 12px
    rgba(0, 0, 0, 0.08) !important;

}

</style>