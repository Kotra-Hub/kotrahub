<script setup lang="ts">

import {
  computed,
  ref,
  watch,
} from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"
import AppStatusChip from "@/components/common/AppStatusChip.vue"


/* */

type PositionStatus =
  | "Active"
  | "Inactive"

type PositionAction =
  | "Created"
  | "Updated"
  | "Activated"
  | "Deactivated"


interface PositionItem {

  id: string

  name: string

  department: string

  employmentType: string

  headcount: number

  filled: number

  vacant: number

  status: PositionStatus

  effectiveDate: string

  inactiveDate?: string

  description: string

}


interface PositionHistory {

  id: string

  position: string

  department: string

  action: PositionAction

  effectiveDate: string

  changedBy: string

  status: PositionStatus

}


/* */

const tab = ref("position")


/* */

const positions = ref<PositionItem[]>([

  {
    id: "POS-001",
    name: "IT Executive",
    department: "Information Technology",
    employmentType: "Permanent",
    headcount: 5,
    filled: 4,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-01-01",
    description:
      "Responsible for application support, system development, troubleshooting and IT operations.",
  },

  {
    id: "POS-002",
    name: "Software Developer",
    department: "Information Technology",
    employmentType: "Permanent",
    headcount: 8,
    filled: 6,
    vacant: 2,
    status: "Active",
    effectiveDate: "2026-01-01",
    description:
      "Responsible for software development, system enhancement, testing and application maintenance.",
  },

  {
    id: "POS-003",
    name: "IT Support",
    department: "Information Technology",
    employmentType: "Permanent",
    headcount: 6,
    filled: 6,
    vacant: 0,
    status: "Active",
    effectiveDate: "2026-02-01",
    description:
      "Provides technical support to users and maintains IT hardware and software.",
  },

  {
    id: "POS-004",
    name: "QA Tester",
    department: "Information Technology",
    employmentType: "Permanent",
    headcount: 4,
    filled: 3,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-03-01",
    description:
      "Responsible for application testing, test cases, defect reporting and quality assurance.",
  },

  {
    id: "POS-005",
    name: "System Analyst",
    department: "Information Technology",
    employmentType: "Permanent",
    headcount: 3,
    filled: 2,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-03-01",
    description:
      "Analyses business requirements and supports system design and implementation.",
  },

  {
    id: "POS-006",
    name: "HR Executive",
    department: "Human Resources",
    employmentType: "Permanent",
    headcount: 5,
    filled: 5,
    vacant: 0,
    status: "Active",
    effectiveDate: "2026-01-01",
    description:
      "Manages employee administration and human resource activities.",
  },

  {
    id: "POS-007",
    name: "Finance Executive",
    department: "Finance",
    employmentType: "Permanent",
    headcount: 5,
    filled: 4,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-01-01",
    description:
      "Supports financial operations, reporting and accounting activities.",
  },

  {
    id: "POS-008",
    name: "Procurement Executive",
    department: "Procurement",
    employmentType: "Permanent",
    headcount: 4,
    filled: 3,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-02-01",
    description:
      "Manages procurement activities, requisitions and supplier coordination.",
  },

  {
    id: "POS-009",
    name: "Network Administrator",
    department: "Information Technology",
    employmentType: "Contract",
    headcount: 2,
    filled: 1,
    vacant: 1,
    status: "Active",
    effectiveDate: "2026-04-01",
    description:
      "Maintains network infrastructure, connectivity and network services.",
  },

  {
    id: "POS-010",
    name: "Application Support",
    department: "Information Technology",
    employmentType: "Permanent",
    headcount: 4,
    filled: 4,
    vacant: 0,
    status: "Active",
    effectiveDate: "2026-04-01",
    description:
      "Provides application support, incident troubleshooting and user assistance.",
  },

  {
    id: "POS-011",
    name: "Marketing Executive",
    department: "Marketing",
    employmentType: "Permanent",
    headcount: 4,
    filled: 2,
    vacant: 2,
    status: "Active",
    effectiveDate: "2026-01-01",
    description:
      "Supports marketing campaigns, communications and promotional activities.",
  },

  {
    id: "POS-012",
    name: "Administrative Executive",
    department: "Administration",
    employmentType: "Permanent",
    headcount: 3,
    filled: 3,
    vacant: 0,
    status: "Active",
    effectiveDate: "2026-01-01",
    description:
      "Supports administrative activities and office operations.",
  },

  {
    id: "POS-013",
    name: "Legacy System Executive",
    department: "Information Technology",
    employmentType: "Permanent",
    headcount: 2,
    filled: 1,
    vacant: 1,
    status: "Inactive",
    effectiveDate: "2024-01-01",
    inactiveDate: "2026-05-31",
    description:
      "Legacy position retained for historical reference.",
  },

])


/* */

const positionHistory = ref<PositionHistory[]>([

  {
    id: "HIS-001",
    position: "IT Executive",
    department: "Information Technology",
    action: "Created",
    effectiveDate: "2026-01-01",
    changedBy: "HR Admin",
    status: "Active",
  },

  {
    id: "HIS-002",
    position: "Software Developer",
    department: "Information Technology",
    action: "Created",
    effectiveDate: "2026-01-01",
    changedBy: "HR Admin",
    status: "Active",
  },

  {
    id: "HIS-003",
    position: "QA Tester",
    department: "Information Technology",
    action: "Created",
    effectiveDate: "2026-03-01",
    changedBy: "HR Admin",
    status: "Active",
  },

  {
    id: "HIS-004",
    position: "System Analyst",
    department: "Information Technology",
    action: "Updated",
    effectiveDate: "2026-04-15",
    changedBy: "HR Admin",
    status: "Active",
  },

  {
    id: "HIS-005",
    position: "Legacy System Executive",
    department: "Information Technology",
    action: "Deactivated",
    effectiveDate: "2026-05-31",
    changedBy: "HR Admin",
    status: "Inactive",
  },

])


/* */

const departmentOptions = computed(() => {

  return [
    ...new Set(
      positions.value.map(
        item => item.department
      )
    ),
  ]

})


const employmentTypeOptions = computed(() => {

  return [
    ...new Set(
      positions.value.map(
        item => item.employmentType
      )
    ),
  ]

})


const statusOptions = [
  "Active",
  "Inactive",
]


/* */

const search = ref("")

const filterMenu = ref(false)

const departmentFilter =
  ref<string | null>(null)

const employmentTypeFilter =
  ref<string | null>(null)

const statusFilter =
  ref<string | null>("Active")


/* */

const filteredPositions = computed(() => {

  const keyword =
    search.value
      .trim()
      .toLowerCase()

  return positions.value.filter(
    positionItem => {

      const searchMatch =
        !keyword ||

        positionItem.id
          .toLowerCase()
          .includes(keyword) ||

        positionItem.name
          .toLowerCase()
          .includes(keyword) ||

        positionItem.department
          .toLowerCase()
          .includes(keyword)

      const departmentMatch =
        !departmentFilter.value ||

        positionItem.department ===
          departmentFilter.value

      const employmentTypeMatch =
        !employmentTypeFilter.value ||

        positionItem.employmentType ===
          employmentTypeFilter.value

      const statusMatch =
        !statusFilter.value ||

        positionItem.status ===
          statusFilter.value

      return (
        searchMatch &&
        departmentMatch &&
        employmentTypeMatch &&
        statusMatch
      )

    }
  )

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
      filteredPositions.value.length /
        itemsPerPage.value
    )
  )

})


const paginatedPositions = computed(() => {

  const start =
    (page.value - 1) *
    itemsPerPage.value

  const end =
    start +
    itemsPerPage.value

  return filteredPositions.value.slice(
    start,
    end
  )

})


const displayedStart = computed(() => {

  if (
    filteredPositions.value.length === 0
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
    filteredPositions.value.length
  )

})


/* */

const activePositionCount = computed(() => {

  return positions.value.filter(
    item =>
      item.status === "Active"
  ).length

})


const inactivePositionCount = computed(() => {

  return positions.value.filter(
    item =>
      item.status === "Inactive"
  ).length

})


const filledPositionCount = computed(() => {

  return positions.value
    .filter(
      item =>
        item.status === "Active"
    )
    .reduce(
      (total, item) =>
        total + item.filled,
      0
    )

})


const vacantPositionCount = computed(() => {

  return positions.value
    .filter(
      item =>
        item.status === "Active"
    )
    .reduce(
      (total, item) =>
        total + item.vacant,
      0
    )

})


/* */

watch(
  [
    search,
    departmentFilter,
    employmentTypeFilter,
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
      page.value >
      newTotalPages
    ) {

      page.value =
        newTotalPages

    }

  }
)


/* */

function clearFilters() {

  search.value = ""

  departmentFilter.value =
    null

  employmentTypeFilter.value =
    null

  statusFilter.value =
    "Active"

  page.value = 1

}


/* */

const positionIdInput = ref("")

const positionName = ref("")

const selectedDepartment =
  ref<string | null>(null)

const selectedEmploymentType =
  ref<string | null>(null)

const headcount =
  ref<number | null>(null)

const effectiveDate =
  ref("")

const positionDescription =
  ref("")


/* */

const canRegisterPosition = computed(() => {

  return (

    positionIdInput.value.trim() !== "" &&

    positionName.value.trim() !== "" &&

    selectedDepartment.value !== null &&

    selectedEmploymentType.value !== null &&

    Number(headcount.value) > 0 &&

    effectiveDate.value.trim() !== ""

  )

})


/* */

function openRegisterTab() {

  tab.value = "register"

}


/* */

function registerPosition() {

  if (
    !canRegisterPosition.value
  ) {
    return
  }

  const newPosition: PositionItem = {

    id:
      positionIdInput.value.trim(),

    name:
      positionName.value.trim(),

    department:
      selectedDepartment.value!,

    employmentType:
      selectedEmploymentType.value!,

    headcount:
      Number(headcount.value),

    filled:
      0,

    vacant:
      Number(headcount.value),

    status:
      "Active",

    effectiveDate:
      effectiveDate.value,

    description:
      positionDescription.value.trim(),

  }


  positions.value.unshift(
    newPosition
  )


  positionHistory.value.unshift({

    id:
      `HIS-${String(
        positionHistory.value.length + 1
      ).padStart(3, "0")}`,

    position:
      newPosition.name,

    department:
      newPosition.department,

    action:
      "Created",

    effectiveDate:
      newPosition.effectiveDate,

    changedBy:
      "Current User",

    status:
      "Active",

  })


  clearRegistrationForm()

  tab.value = "position"

}


/* */

function clearRegistrationForm() {

  positionIdInput.value = ""

  positionName.value = ""

  selectedDepartment.value =
    null

  selectedEmploymentType.value =
    null

  headcount.value =
    null

  effectiveDate.value =
    ""

  positionDescription.value =
    ""

}


/* */

const positionDialog =
  ref(false)

const selectedPosition =
  ref<PositionItem | null>(null)


function viewPosition(
  positionItem: PositionItem
) {

  selectedPosition.value =
    positionItem

  positionDialog.value =
    true

}


function closePositionDialog() {

  positionDialog.value =
    false

  selectedPosition.value =
    null

}


/* */

function deactivatePosition(
  positionId: string
) {

  const positionItem =
    positions.value.find(
      item =>
        item.id === positionId
    )

  if (!positionItem) {
    return
  }

  positionItem.status =
    "Inactive"

  positionItem.inactiveDate =
    new Date()
      .toISOString()
      .slice(0, 10)


  positionHistory.value.unshift({

    id:
      `HIS-${String(
        positionHistory.value.length + 1
      ).padStart(3, "0")}`,

    position:
      positionItem.name,

    department:
      positionItem.department,

    action:
      "Deactivated",

    effectiveDate:
      positionItem.inactiveDate,

    changedBy:
      "Current User",

    status:
      "Inactive",

  })


  closePositionDialog()

}


/* */

function activatePosition(
  positionId: string
) {

  const positionItem =
    positions.value.find(
      item =>
        item.id === positionId
    )

  if (!positionItem) {
    return
  }

  positionItem.status =
    "Active"

  positionItem.inactiveDate =
    undefined


  positionHistory.value.unshift({

    id:
      `HIS-${String(
        positionHistory.value.length + 1
      ).padStart(3, "0")}`,

    position:
      positionItem.name,

    department:
      positionItem.department,

    action:
      "Activated",

    effectiveDate:
      new Date()
        .toISOString()
        .slice(0, 10),

    changedBy:
      "Current User",

    status:
      "Active",

  })


  closePositionDialog()

}


/* */

const inactiveFilterMenu =
  ref(false)

const inactiveSearch =
  ref("")

const inactiveDepartmentFilter =
  ref<string | null>(null)


const inactivePositions =
  computed(() => {

    return positions.value.filter(
      item =>
        item.status === "Inactive"
    )

  })


const inactiveDepartmentOptions =
  computed(() => {

    return [
      ...new Set(
        inactivePositions.value.map(
          item =>
            item.department
        )
      ),
    ]

  })


/* */

const filteredInactivePositions =
  computed(() => {

    const keyword =
      inactiveSearch.value
        .trim()
        .toLowerCase()

    return inactivePositions.value.filter(
      positionItem => {

        const searchMatch =
          !keyword ||

          positionItem.id
            .toLowerCase()
            .includes(keyword) ||

          positionItem.name
            .toLowerCase()
            .includes(keyword)

        const departmentMatch =
          !inactiveDepartmentFilter.value ||

          positionItem.department ===
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
        filteredInactivePositions.value.length /
          inactiveItemsPerPage.value
      )
    )

  })


const paginatedInactivePositions =
  computed(() => {

    const start =
      (inactivePage.value - 1) *
      inactiveItemsPerPage.value

    const end =
      start +
      inactiveItemsPerPage.value

    return filteredInactivePositions.value.slice(
      start,
      end
    )

  })


const inactiveDisplayedStart =
  computed(() => {

    if (
      filteredInactivePositions.value.length ===
      0
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
      filteredInactivePositions.value.length
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


function clearInactiveFilters() {

  inactiveSearch.value = ""

  inactiveDepartmentFilter.value =
    null

  inactivePage.value = 1

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

    return positionHistory.value.filter(
      record => {

        return (

          !keyword ||

          record.id
            .toLowerCase()
            .includes(keyword) ||

          record.position
            .toLowerCase()
            .includes(keyword) ||

          record.department
            .toLowerCase()
            .includes(keyword) ||

          record.action
            .toLowerCase()
            .includes(keyword)

        )

      }
    )

  })


/* */

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
      filteredHistory.value.length ===
      0
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

const historyDialog =
  ref(false)

const selectedHistory =
  ref<PositionHistory | null>(null)


function viewHistoryRecord(
  record: PositionHistory
) {

  selectedHistory.value =
    record

  historyDialog.value =
    true

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
        Position
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
          Position Management
        </h1>

        <p class="text-body-2 text-medium-emphasis mt-1">
          Manage employee positions and position records
        </p>

      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openRegisterTab"
      >
        Register Position
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
          title="Active Positions"
          :value="activePositionCount"
          icon="mdi-badge-account-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Vacant Positions"
          :value="vacantPositionCount"
          icon="mdi-account-question-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Filled Positions"
          :value="filledPositionCount"
          icon="mdi-account-check-outline"
        />

      </v-col>


      <v-col
        cols="12"
        sm="6"
        md="3"
      >

        <AppSummaryCard
          title="Inactive"
          :value="inactivePositionCount"
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

        <v-tab value="position">

          <v-icon start>
            mdi-badge-account-outline
          </v-icon>

          Position

        </v-tab>


        <v-tab value="register">

          <v-icon start>
            mdi-plus-circle-outline
          </v-icon>

          Register Position

        </v-tab>


        <v-tab value="history">

          <v-icon start>
            mdi-history
          </v-icon>

          Position History

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
           POSITION
           ========================================================== -->

      <v-window-item value="position">

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
                Positions
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage active employee positions
              </p>

            </div>


            <!-- ==================================================
                 SEARCH + FILTER
                 ================================================== -->

            <div class="d-flex align-center ga-3">

              <v-text-field
                v-model="search"
                placeholder="Search position..."
                variant="outlined"
                density="comfortable"
                hide-details
                clearable
                rounded="lg"
                prepend-inner-icon="mdi-magnify"
                style="min-width: 260px"
              />


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
                    Filter Positions
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
                      prepend-inner-icon="mdi-office-building-outline"
                      class="mb-3"
                    />


                    <v-select
                      v-model="employmentTypeFilter"
                      label="Employment Type"
                      :items="employmentTypeOptions"
                      variant="outlined"
                      density="comfortable"
                      clearable
                      rounded="lg"
                      prepend-inner-icon="mdi-account-clock-outline"
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

          </div>

          <v-divider />


          <!-- ======================================================
               POSITION TABLE
               ====================================================== -->

          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Position ID</th>

                  <th>Position</th>

                  <th>Department</th>

                  <th>Employment Type</th>

                  <th>Headcount</th>

                  <th>Filled</th>

                  <th>Vacant</th>

                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                <tr
                  v-for="positionItem in paginatedPositions"
                  :key="positionItem.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ positionItem.id }}
                    </span>

                  </td>


                  <td>

                    <div class="d-flex align-center">

                      <v-avatar
                        size="36"
                        color="primary"
                        variant="tonal"
                        class="mr-3"
                      >

                        <v-icon size="19">
                          mdi-badge-account-outline
                        </v-icon>

                      </v-avatar>

                      <span class="font-weight-medium">
                        {{ positionItem.name }}
                      </span>

                    </div>

                  </td>


                  <td>
                    {{ positionItem.department }}
                  </td>


                  <td>
                    {{ positionItem.employmentType }}
                  </td>


                  <td>
                    {{ positionItem.headcount }}
                  </td>


                  <td>

                    <span class="font-weight-medium">
                      {{ positionItem.filled }}
                    </span>

                  </td>


                  <td>

                    <span
                      class="font-weight-medium"
                      :class="
                        positionItem.vacant > 0
                          ? 'text-warning'
                          : 'text-success'
                      "
                    >
                      {{ positionItem.vacant }}
                    </span>

                  </td>


                  <td>

                    <AppStatusChip
                      :status="positionItem.status"
                      :color="getStatusColor(positionItem.status)"
                    />

                  </td>


                  <td class="text-center">

                    <v-tooltip text="View Position">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-arrow-right"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="viewPosition(positionItem)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr
                  v-if="paginatedPositions.length === 0"
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
                      mdi-badge-account-outline
                    </v-icon>

                    <div class="text-body-1 font-weight-medium">
                      No positions found
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
                {{ filteredPositions.length }}
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
           REGISTER POSITION
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
                    Register Position
                  </div>

                  <div class="text-body-2 text-medium-emphasis mt-1">
                    Enter position information to create a new position
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
                      v-model="positionIdInput"
                      label="Position ID"
                      placeholder="e.g. POS-001"
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
                      v-model="positionName"
                      label="Position Name"
                      placeholder="e.g. IT Executive"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-badge-account-outline"
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
                      prepend-inner-icon="mdi-office-building-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-select
                      v-model="selectedEmploymentType"
                      label="Employment Type"
                      :items="employmentTypeOptions"
                      variant="outlined"
                      rounded="lg"
                      clearable
                      prepend-inner-icon="mdi-account-clock-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model.number="headcount"
                      label="Headcount"
                      type="number"
                      min="1"
                      variant="outlined"
                      rounded="lg"
                      prepend-inner-icon="mdi-account-multiple-outline"
                    />

                  </v-col>


                  <v-col
                    cols="12"
                    md="6"
                  >

                    <v-text-field
                      v-model="effectiveDate"
                      label="Effective Date"
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
                      v-model="positionDescription"
                      label="Description"
                      placeholder="Enter position description"
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
                  :disabled="!canRegisterPosition"
                  @click="registerPosition"
                >
                  Register Position
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
                      Position ID
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ positionIdInput || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Position
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ positionName || "-" }}
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
                      Employment Type
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ selectedEmploymentType || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Headcount
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ headcount || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Effective Date
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ effectiveDate || "-" }}
                    </div>

                  </div>


                  <div>

                    <div class="text-caption text-medium-emphasis">
                      Description
                    </div>

                    <div class="text-body-1 font-weight-medium">
                      {{ positionDescription || "-" }}
                    </div>

                  </div>

                </div>

              </v-card-text>

            </v-card>

          </v-col>

        </v-row>

      </v-window-item>


      <!-- ==========================================================
           POSITION HISTORY
           ========================================================== -->

      <v-window-item value="history">

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
                Position History
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View historical position records and changes
              </p>

            </div>


            <v-text-field
              v-model="historySearch"
              placeholder="Search history..."
              variant="outlined"
              density="comfortable"
              hide-details
              clearable
              rounded="lg"
              prepend-inner-icon="mdi-magnify"
              style="min-width: 260px"
            />

          </div>

          <v-divider />


          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Record ID</th>
                  <th>Position</th>
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
                  v-for="record in paginatedHistory"
                  :key="record.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ record.id }}
                    </span>

                  </td>

                  <td>
                    {{ record.position }}
                  </td>

                  <td>
                    {{ record.department }}
                  </td>

                  <td>
                    {{ record.action }}
                  </td>

                  <td>
                    {{ record.effectiveDate }}
                  </td>

                  <td>
                    {{ record.changedBy }}
                  </td>

                  <td>

                    <AppStatusChip
                      :status="record.status"
                      :color="getStatusColor(record.status)"
                    />

                  </td>

                  <td class="text-center">

                    <v-tooltip text="View Record">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-arrow-right"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="viewHistoryRecord(record)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr
                  v-if="paginatedHistory.length === 0"
                >

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
                      No position history found
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Position changes will appear here.
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

          <div
            class="d-flex flex-wrap align-center justify-space-between pa-5"
          >

            <div>

              <h2 class="text-h6 font-weight-bold">
                Inactive Positions
              </h2>

              <p class="text-body-2 text-medium-emphasis mt-1">
                View and manage inactive employee positions
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
                  Filter Inactive Positions
                </v-card-title>

                <v-divider />

                <v-card-text>

                  <v-text-field
                    v-model="inactiveSearch"
                    label="Search Position"
                    placeholder="Position or ID"
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
                    :items="inactiveDepartmentOptions"
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


          <!-- INACTIVE TABLE -->

          <div class="table-wrapper">

            <v-table>

              <thead>

                <tr>

                  <th>Position ID</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>Employment Type</th>
                  <th>Last Headcount</th>
                  <th>Inactive Date</th>
                  <th>Status</th>

                  <th class="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr
                  v-for="positionItem in paginatedInactivePositions"
                  :key="positionItem.id"
                >

                  <td>

                    <span class="font-weight-medium">
                      {{ positionItem.id }}
                    </span>

                  </td>

                  <td>
                    {{ positionItem.name }}
                  </td>

                  <td>
                    {{ positionItem.department }}
                  </td>

                  <td>
                    {{ positionItem.employmentType }}
                  </td>

                  <td>
                    {{ positionItem.headcount }}
                  </td>

                  <td>
                    {{ positionItem.inactiveDate || "-" }}
                  </td>

                  <td>

                    <AppStatusChip
                      status="Inactive"
                      color="grey"
                    />

                  </td>

                  <td class="text-center">

                    <v-tooltip text="View Position">

                      <template #activator="{ props }">

                        <v-btn
                          v-bind="props"
                          icon="mdi-arrow-right"
                          variant="text"
                          size="small"
                          color="primary"
                          @click="viewPosition(positionItem)"
                        />

                      </template>

                    </v-tooltip>

                  </td>

                </tr>


                <tr
                  v-if="paginatedInactivePositions.length === 0"
                >

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
                      No inactive positions
                    </div>

                    <div class="text-body-2 text-medium-emphasis mt-1">
                      Inactive positions will appear here.
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
                {{ filteredInactivePositions.length }}
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
         POSITION DETAILS DIALOG
         ============================================================ -->

    <v-dialog
      v-model="positionDialog"
      max-width="700"
    >

      <v-card
        v-if="selectedPosition"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Position Details
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Position information and current status
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="closePositionDialog"
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
                mdi-badge-account-outline
              </v-icon>

            </v-avatar>

            <div>

              <div class="text-h6 font-weight-bold">
                {{ selectedPosition.name }}
              </div>

              <div class="text-body-2 text-medium-emphasis">
                {{ selectedPosition.id }}
              </div>

            </div>

            <v-spacer />

            <AppStatusChip
              :status="selectedPosition.status"
              :color="getStatusColor(selectedPosition.status)"
            />

          </div>


          <v-row>

            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Position ID
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedPosition.id }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Position
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedPosition.name }}
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
                {{ selectedPosition.department }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Employment Type
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedPosition.employmentType }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Headcount
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedPosition.headcount }}
              </div>

            </v-col>


            <v-col
              cols="12"
              sm="6"
            >

              <div class="text-caption text-medium-emphasis">
                Filled
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedPosition.filled }}
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
                {{ selectedPosition.vacant }}
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
                {{ selectedPosition.effectiveDate }}
              </div>

            </v-col>

          </v-row>


          <v-divider class="my-5" />


          <div class="text-subtitle-1 font-weight-bold mb-2">
            Description
          </div>

          <div class="text-body-2 text-medium-emphasis">
            {{ selectedPosition.description || "No description available." }}
          </div>

        </v-card-text>


        <v-divider />


        <v-card-actions class="pa-4">

          <v-btn
            v-if="selectedPosition.status === 'Active'"
            variant="outlined"
            color="error"
            rounded="lg"
            prepend-icon="mdi-archive-outline"
            @click="deactivatePosition(selectedPosition.id)"
          >
            Deactivate
          </v-btn>

          <v-btn
            v-else
            variant="outlined"
            color="success"
            rounded="lg"
            prepend-icon="mdi-check-circle-outline"
            @click="activatePosition(selectedPosition.id)"
          >
            Activate
          </v-btn>

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closePositionDialog"
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
      v-model="historyDialog"
      max-width="600"
    >

      <v-card
        v-if="selectedHistory"
        rounded="xl"
      >

        <v-card-title class="d-flex align-center pa-5">

          <div>

            <div class="text-h6 font-weight-bold">
              Position History
            </div>

            <div class="text-body-2 text-medium-emphasis mt-1">
              Historical position record
            </div>

          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="historyDialog = false"
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
                Record ID
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
                Position
              </div>

              <div class="text-body-1 font-weight-medium mt-1">
                {{ selectedHistory.position }}
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

          </v-row>

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="historyDialog = false"
          >
            Close
          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>

  </v-container>

</template>


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

  .d-flex.align-center.ga-3 {

    width: 100%;

    flex-wrap: wrap;

  }

}

</style>