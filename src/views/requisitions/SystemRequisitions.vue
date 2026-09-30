<script setup lang="ts">
import { computed, ref, watch } from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"
import AppStatusChip from "@/components/common/AppStatusChip.vue"

import {
  useSystemRequisitions,
} from "@/composables/useSystemRequisitions"

import type {
  SystemRequisition,
  SystemRequisitionPriority,
  SystemRequisitionStatus,
  SystemAccessType,
  SystemEnvironment,
} from "@/composables/useSystemRequisitions"

/* */

const {
  systemRequisitions,
  departments,
  systems,
  modules,
  accessTypes,
  environments,
  priorities,
  addRequisition,
  updateRequisitionStatus,
} = useSystemRequisitions()

/* */

const tab = ref("requisition")

/* */

const search = ref("")
const filterDepartment = ref("")
const filterSystem = ref("")
const filterModule = ref("")
const filterStatus = ref("")
const filterPriority = ref<SystemRequisitionPriority | null>(null)

/* */

const page = ref(1)
const itemsPerPage = ref(10)

/* */

const form = ref({
  requester: "Aiman",
  department: "",
  system: "",
  module: "",
  accessType: "New Access" as SystemAccessType,
  environment: "Production" as SystemEnvironment,
  title: "",
  description: "",
  businessJustification: "",
  requestDate: new Date()
    .toISOString()
    .slice(0, 10),
  requiredDate: "",
  priority: "Medium" as SystemRequisitionPriority,
})

/* */

const detailsDialog = ref(false)

const selectedRequisition =
  ref<SystemRequisition | null>(null)

/* */

const approvalDialog = ref(false)

const approvalAction = ref<
  "approve" | "reject" | "complete"
>("approve")

const approvalTarget =
  ref<SystemRequisition | null>(null)

const rejectionReason = ref("")

/* */

const pendingCount = computed(() => {
  return systemRequisitions.value.filter(
    item => item.status === "Pending Approval",
  ).length
})

const approvedCount = computed(() => {
  return systemRequisitions.value.filter(
    item => item.status === "Approved",
  ).length
})

const rejectedCount = computed(() => {
  return systemRequisitions.value.filter(
    item => item.status === "Rejected",
  ).length
})

const completedCount = computed(() => {
  return systemRequisitions.value.filter(
    item => item.status === "Completed",
  ).length
})

/* */

function formatDate(value?: string) {
  if (!value) return "-"

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date)
}

function getStatusColor(
  status: SystemRequisitionStatus,
) {
  switch (status) {
    case "Draft":
      return "grey"

    case "Pending Approval":
      return "warning"

    case "Approved":
      return "info"

    case "Rejected":
      return "error"

    case "Completed":
      return "success"

    default:
      return "grey"
  }
}

function getPriorityColor(
  priority: SystemRequisitionPriority,
) {
  switch (priority) {
    case "Urgent":
      return "error"

    case "High":
      return "orange"

    case "Medium":
      return "warning"

    case "Low":
      return "success"

    default:
      return "grey"
  }
}

/* */

const filteredRequisitions = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return systemRequisitions.value.filter(item => {
    const matchesSearch =
      !keyword ||
      item.requestNo
        .toLowerCase()
        .includes(keyword) ||
      item.requester
        .toLowerCase()
        .includes(keyword) ||
      item.title
        .toLowerCase()
        .includes(keyword) ||
      item.system
        .toLowerCase()
        .includes(keyword) ||
      item.module
        .toLowerCase()
        .includes(keyword)

    const matchesDepartment =
      !filterDepartment.value ||
      item.department === filterDepartment.value

    const matchesSystem =
      !filterSystem.value ||
      item.system === filterSystem.value

    const matchesModule =
      !filterModule.value ||
      item.module === filterModule.value

    const matchesStatus =
      !filterStatus.value ||
      item.status === filterStatus.value

    const matchesPriority =
      !filterPriority.value ||
      item.priority === filterPriority.value

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesSystem &&
      matchesModule &&
      matchesStatus &&
      matchesPriority
    )
  })
})

const paginatedRequisitions = computed(() => {
  const start =
    (page.value - 1) * itemsPerPage.value

  const end = start + itemsPerPage.value

  return filteredRequisitions.value.slice(
    start,
    end,
  )
})

/* */

const approvalRequisitions = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return systemRequisitions.value
    .filter(
      item =>
        item.status === "Pending Approval" ||
        item.status === "Approved",
    )
    .filter(item => {
      const matchesSearch =
        !keyword ||
        item.requestNo
          .toLowerCase()
          .includes(keyword) ||
        item.requester
          .toLowerCase()
          .includes(keyword) ||
        item.title
          .toLowerCase()
          .includes(keyword) ||
        item.system
          .toLowerCase()
          .includes(keyword) ||
        item.module
          .toLowerCase()
          .includes(keyword)

      const matchesDepartment =
        !filterDepartment.value ||
        item.department === filterDepartment.value

      const matchesSystem =
        !filterSystem.value ||
        item.system === filterSystem.value

      const matchesModule =
        !filterModule.value ||
        item.module === filterModule.value

      const matchesPriority =
        !filterPriority.value ||
        item.priority === filterPriority.value

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSystem &&
        matchesModule &&
        matchesPriority
      )
    })
})

/* */

const rejectedRequisitions = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return systemRequisitions.value
    .filter(item => item.status === "Rejected")
    .filter(item => {
      const matchesSearch =
        !keyword ||
        item.requestNo
          .toLowerCase()
          .includes(keyword) ||
        item.requester
          .toLowerCase()
          .includes(keyword) ||
        item.title
          .toLowerCase()
          .includes(keyword) ||
        item.system
          .toLowerCase()
          .includes(keyword)

      const matchesDepartment =
        !filterDepartment.value ||
        item.department === filterDepartment.value

      const matchesSystem =
        !filterSystem.value ||
        item.system === filterSystem.value

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSystem
      )
    })
})

/* */

const completedRequisitions = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return systemRequisitions.value
    .filter(item => item.status === "Completed")
    .filter(item => {
      const matchesSearch =
        !keyword ||
        item.requestNo
          .toLowerCase()
          .includes(keyword) ||
        item.requester
          .toLowerCase()
          .includes(keyword) ||
        item.title
          .toLowerCase()
          .includes(keyword) ||
        item.system
          .toLowerCase()
          .includes(keyword)

      const matchesDepartment =
        !filterDepartment.value ||
        item.department === filterDepartment.value

      const matchesSystem =
        !filterSystem.value ||
        item.system === filterSystem.value

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesSystem
      )
    })
})

/* */

function clearFilters() {
  search.value = ""
  filterDepartment.value = ""
  filterSystem.value = ""
  filterModule.value = ""
  filterStatus.value = ""
  filterPriority.value = null

  page.value = 1
}

/* */

function viewDetails(
  item: SystemRequisition,
) {
  selectedRequisition.value = item
  detailsDialog.value = true
}

/* */

function resetForm() {
  form.value = {
    requester: "Aiman",
    department: "",
    system: "",
    module: "",
    accessType: "New Access" as SystemAccessType,
    environment: "Production" as SystemEnvironment,
    title: "",
    description: "",
    businessJustification: "",
    requestDate: new Date()
      .toISOString()
      .slice(0, 10),
    requiredDate: "",
    priority: "Medium",
  }
}

function submitRequisition() {
  if (
    !form.value.requester ||
    !form.value.department ||
    !form.value.system ||
    !form.value.module ||
    !form.value.accessType ||
    !form.value.environment ||
    !form.value.title ||
    !form.value.requiredDate ||
    !form.value.businessJustification
  ) {
    return
  }

  addRequisition({
    requester: form.value.requester,
    department: form.value.department,
    system: form.value.system,
    module: form.value.module,
    accessType: form.value.accessType as any,
    environment: form.value.environment as any,
    title: form.value.title,
    description: form.value.description,
    businessJustification:
      form.value.businessJustification,
    requestDate: form.value.requestDate,
    requiredDate: form.value.requiredDate,
    priority: form.value.priority,
  })

  resetForm()

  tab.value = "approval"
}

/* */

function openApprovalDialog(
  item: SystemRequisition,
  action: "approve" | "reject" | "complete",
) {
  approvalTarget.value = item
  approvalAction.value = action
  rejectionReason.value = ""
  approvalDialog.value = true
}

function closeApprovalDialog() {
  approvalDialog.value = false
  approvalTarget.value = null
  rejectionReason.value = ""
}

function confirmApprovalAction() {
  if (!approvalTarget.value) return

  const id = approvalTarget.value.id

  if (approvalAction.value === "approve") {
    updateRequisitionStatus(
      id,
      "Approved",
    )
  }

  if (approvalAction.value === "reject") {
    if (!rejectionReason.value.trim()) {
      return
    }

    updateRequisitionStatus(
      id,
      "Rejected",
      {
        rejectionReason:
          rejectionReason.value.trim(),
      },
    )
  }

  if (approvalAction.value === "complete") {
    updateRequisitionStatus(
      id,
      "Completed",
    )
  }

  closeApprovalDialog()
}

/* */

watch(
  [
    search,
    filterDepartment,
    filterSystem,
    filterModule,
    filterStatus,
    filterPriority,
    itemsPerPage,
  ],
  () => {
    page.value = 1
  },
)

watch(tab, () => {
  page.value = 1
})
</script>

<template>
  <div class="pa-6">
    <!-- ======================================================
         BREADCRUMB
         ====================================================== -->

    <div class="d-flex align-center mb-6">
      <VIcon
        icon="mdi-file-document-multiple-outline"
        size="22"
        class="mr-2"
      />

      <span class="text-body-2 text-medium-emphasis">
        Requisitions
      </span>

      <VIcon
        icon="mdi-chevron-right"
        size="20"
        class="mx-1 text-medium-emphasis"
      />

      <span class="text-body-2 font-weight-medium">
        System Requisitions
      </span>
    </div>

    <!-- ======================================================
         HEADER
         ====================================================== -->

    <div
      class="d-flex align-center justify-space-between mb-6"
    >
      <div>
        <h1 class="text-h5 font-weight-bold mb-1">
          System Requisitions
        </h1>

        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage and monitor system access and system-related requests
        </p>
      </div>

      <VBtn
        color="primary"
        prepend-icon="mdi-file-plus-outline"
        @click="tab = 'new'"
      >
        New Requisition
      </VBtn>
    </div>

    <!-- ======================================================
         SUMMARY
         ====================================================== -->

    <VRow class="mb-4">
      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Pending Approval"
          :value="pendingCount"
          icon="mdi-clock-outline"
        />
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Approved"
          :value="approvedCount"
          icon="mdi-check-decagram-outline"
        />
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Rejected"
          :value="rejectedCount"
          icon="mdi-close-circle-outline"
        />
      </VCol>

      <VCol
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Completed"
          :value="completedCount"
          icon="mdi-check-circle-outline"
        />
      </VCol>
    </VRow>

    <!-- ======================================================
         MAIN CARD
         ====================================================== -->

    <VCard>
      <!-- ====================================================
           TABS
           ==================================================== -->

      <VTabs
        v-model="tab"
        color="primary"
        class="px-4"
      >
        <VTab
          value="requisition"
          prepend-icon="mdi-file-document-outline"
        >
          Requisition
        </VTab>

        <VTab
          value="new"
          prepend-icon="mdi-file-plus-outline"
        >
          New
        </VTab>

        <VTab
          value="approval"
          prepend-icon="mdi-check-decagram-outline"
        >
          Approval
        </VTab>

        <VTab
          value="reject"
          prepend-icon="mdi-close-circle-outline"
        >
          Reject
        </VTab>

        <VTab
          value="completed"
          prepend-icon="mdi-check-circle-outline"
        >
          Completed
        </VTab>
      </VTabs>

      <VDivider />

      <VWindow v-model="tab">
        <!-- ==================================================
             REQUISITION
             ================================================== -->

        <VWindowItem value="requisition">
          <div class="pa-5">
            <div
              class="d-flex align-center justify-space-between flex-wrap ga-3 mb-5"
            >
              <div>
                <h2 class="text-h6 font-weight-semibold">
                  Requisition
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  View and monitor all system requisition requests
                </p>
              </div>

              <div class="d-flex align-center ga-3">
                <VTextField
                  v-model="search"
                  density="compact"
                  variant="outlined"
                  placeholder="Search requisition..."
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                  clearable
                  style="min-width: 280px"
                />

                <VMenu>
                  <template #activator="{ props }">
                    <VBtn
                      v-bind="props"
                      variant="outlined"
                      prepend-icon="mdi-filter-variant"
                    >
                      Filter
                    </VBtn>
                  </template>

                  <VCard width="340">
                    <VCardTitle class="text-subtitle-1">
                      Filter Requisitions
                    </VCardTitle>

                    <VCardText>
                      <VSelect
                        v-model="filterDepartment"
                        :items="departments"
                        label="Department"
                        density="compact"
                        variant="outlined"
                        clearable
                        class="mb-3"
                      />

                      <VSelect
                        v-model="filterSystem"
                        :items="systems"
                        label="System"
                        density="compact"
                        variant="outlined"
                        clearable
                        class="mb-3"
                      />

                      <VSelect
                        v-model="filterModule"
                        :items="modules"
                        label="Module"
                        density="compact"
                        variant="outlined"
                        clearable
                        class="mb-3"
                      />

                      <VSelect
                        v-model="filterStatus"
                        :items="[
                          'Draft',
                          'Pending Approval',
                          'Approved',
                          'Rejected',
                          'Completed',
                        ]"
                        label="Status"
                        density="compact"
                        variant="outlined"
                        clearable
                        class="mb-3"
                      />

                      <VSelect
                        v-model="filterPriority"
                        :items="priorities"
                        label="Priority"
                        density="compact"
                        variant="outlined"
                        clearable
                      />
                    </VCardText>

                    <VDivider />

                    <VCardActions class="pa-3">
                      <VSpacer />

                      <VBtn
                        variant="text"
                        @click="clearFilters"
                      >
                        Clear
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VMenu>
              </div>
            </div>

            <div class="table-wrapper">
              <VTable hover>
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Requester</th>
                    <th>Department</th>
                    <th>System</th>
                    <th>Module</th>
                    <th>Access Type</th>
                    <th>Environment</th>
                    <th>Required Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th class="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="item in paginatedRequisitions"
                    :key="item.id"
                  >
                    <td class="font-weight-medium">
                      {{ item.requestNo }}
                    </td>

                    <td>
                      {{ item.requester }}
                    </td>

                    <td>
                      {{ item.department }}
                    </td>

                    <td>
                      {{ item.system }}
                    </td>

                    <td>
                      {{ item.module }}
                    </td>

                    <td>
                      {{ item.accessType }}
                    </td>

                    <td>
                      <VChip
                        size="small"
                        variant="tonal"
                      >
                        {{ item.environment }}
                      </VChip>
                    </td>

                    <td>
                      {{ formatDate(item.requiredDate) }}
                    </td>

                    <td>
                      <VChip
                        size="small"
                        variant="tonal"
                        :color="
                          getPriorityColor(
                            item.priority,
                          )
                        "
                      >
                        {{ item.priority }}
                      </VChip>
                    </td>

                    <td>
                      <AppStatusChip
                        :status="item.status as any"
                        :color="
                          getStatusColor(
                            item.status,
                          )
                        "
                      />
                    </td>

                    <td class="text-center">
                      <VBtn
                        icon="mdi-eye-outline"
                        size="small"
                        variant="text"
                        @click="viewDetails(item)"
                      />
                    </td>
                  </tr>

                  <tr
                    v-if="
                      paginatedRequisitions.length === 0
                    "
                  >
                    <td
                      colspan="11"
                      class="text-center py-8 text-medium-emphasis"
                    >
                      No system requisitions found.
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </div>

            <div class="pagination-wrapper">
              <div class="text-body-2 text-medium-emphasis">
                Showing
                {{
                  filteredRequisitions.length === 0
                    ? 0
                    : (page - 1) *
                        itemsPerPage +
                      1
                }}
                -
                {{
                  Math.min(
                    page * itemsPerPage,
                    filteredRequisitions.length,
                  )
                }}
                of
                {{ filteredRequisitions.length }}
              </div>

              <div class="d-flex align-center ga-4">
                <VSelect
                  v-model="itemsPerPage"
                  :items="[5, 10, 20, 50]"
                  density="compact"
                  variant="outlined"
                  hide-details
                  style="width: 90px"
                />

                <VPagination
                  v-model="page"
                  :length="
                    Math.max(
                      1,
                      Math.ceil(
                        filteredRequisitions.length /
                          itemsPerPage,
                      ),
                    )
                  "
                  density="comfortable"
                  :total-visible="5"
                />
              </div>
            </div>
          </div>
        </VWindowItem>

        <!-- ==================================================
             NEW
             ================================================== -->

        <VWindowItem value="new">
          <div class="pa-5">
            <div class="mb-5">
              <h2 class="text-h6 font-weight-semibold">
                New Requisition
              </h2>

              <p class="text-body-2 text-medium-emphasis">
                Create a new system requisition request
              </p>
            </div>

            <VRow>
              <VCol
                cols="12"
                md="8"
              >
                <VCard
                  variant="outlined"
                  class="pa-5"
                >
                  <VRow>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="form.requester"
                        label="Requester"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-account-outline"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        v-model="form.department"
                        :items="departments"
                        label="Department"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-domain"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        v-model="form.system"
                        :items="systems"
                        label="System"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-application-outline"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        v-model="form.module"
                        :items="modules"
                        label="Module"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-view-module-outline"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        v-model="form.accessType"
                        :items="accessTypes"
                        label="Access Type"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-account-key-outline"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        v-model="form.environment"
                        :items="environments"
                        label="Environment"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-server-outline"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VSelect
                        v-model="form.priority"
                        :items="priorities"
                        label="Priority"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-flag-outline"
                      />
                    </VCol>

                    <VCol
                      cols="12"
                      md="6"
                    >
                      <VTextField
                        v-model="form.requiredDate"
                        label="Required Date"
                        type="date"
                        variant="outlined"
                        density="comfortable"
                      />
                    </VCol>

                    <VCol cols="12">
                      <VTextField
                        v-model="form.title"
                        label="Request Title"
                        variant="outlined"
                        density="comfortable"
                        prepend-inner-icon="mdi-text-box-outline"
                      />
                    </VCol>

                    <VCol cols="12">
                      <VTextarea
                        v-model="form.description"
                        label="Description"
                        variant="outlined"
                        rows="4"
                        auto-grow
                      />
                    </VCol>

                    <VCol cols="12">
                      <VTextarea
                        v-model="
                          form.businessJustification
                        "
                        label="Business Justification"
                        placeholder="Explain why this system access or change is required..."
                        variant="outlined"
                        rows="4"
                        auto-grow
                      />
                    </VCol>

                    <VCol cols="12">
                      <VTextField
                        v-model="form.requestDate"
                        label="Request Date"
                        type="date"
                        variant="outlined"
                        density="comfortable"
                      />
                    </VCol>
                  </VRow>

                  <VDivider class="my-4" />

                  <div class="d-flex justify-end ga-3">
                    <VBtn
                      variant="outlined"
                      @click="resetForm"
                    >
                      Clear
                    </VBtn>

                    <VBtn
                      color="primary"
                      prepend-icon="mdi-send-outline"
                      @click="submitRequisition"
                    >
                      Submit Requisition
                    </VBtn>
                  </div>
                </VCard>
              </VCol>

              <VCol
                cols="12"
                md="4"
              >
                <VCard
                  variant="tonal"
                  color="primary"
                  class="pa-5"
                >
                  <div class="d-flex align-center mb-4">
                    <VIcon
                      icon="mdi-information-outline"
                      class="mr-2"
                    />

                    <span class="text-subtitle-1 font-weight-semibold">
                      Submission Process
                    </span>
                  </div>

                  <div class="process-item">
                    <VAvatar
                      size="32"
                      color="primary"
                    >
                      1
                    </VAvatar>

                    <div>
                      <div class="font-weight-medium">
                        Submit Request
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        System request is submitted for approval.
                      </div>
                    </div>
                  </div>

                  <div class="process-line" />

                  <div class="process-item">
                    <VAvatar
                      size="32"
                      color="primary"
                    >
                      2
                    </VAvatar>

                    <div>
                      <div class="font-weight-medium">
                        Approval
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        Approver reviews the system request.
                      </div>
                    </div>
                  </div>

                  <div class="process-line" />

                  <div class="process-item">
                    <VAvatar
                      size="32"
                      color="primary"
                    >
                      3
                    </VAvatar>

                    <div>
                      <div class="font-weight-medium">
                        Completion
                      </div>

                      <div class="text-body-2 text-medium-emphasis">
                        Approved request is implemented and completed.
                      </div>
                    </div>
                  </div>
                </VCard>
              </VCol>
            </VRow>
          </div>
        </VWindowItem>

        <!-- ==================================================
             APPROVAL
             ================================================== -->

        <VWindowItem value="approval">
          <div class="pa-5">
            <div
              class="d-flex align-center justify-space-between flex-wrap ga-3 mb-5"
            >
              <div>
                <h2 class="text-h6 font-weight-semibold">
                  Approval
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  Review and process system requisition requests
                </p>
              </div>

              <div class="d-flex align-center ga-3">
                <VTextField
                  v-model="search"
                  density="compact"
                  variant="outlined"
                  placeholder="Search requisition..."
                  prepend-inner-icon="mdi-magnify"
                  hide-details
                  clearable
                  style="min-width: 280px"
                />

                <VMenu>
                  <template #activator="{ props }">
                    <VBtn
                      v-bind="props"
                      variant="outlined"
                      prepend-icon="mdi-filter-variant"
                    >
                      Filter
                    </VBtn>
                  </template>

                  <VCard width="340">
                    <VCardTitle class="text-subtitle-1">
                      Filter Approval
                    </VCardTitle>

                    <VCardText>
                      <VSelect
                        v-model="filterDepartment"
                        :items="departments"
                        label="Department"
                        density="compact"
                        variant="outlined"
                        clearable
                        class="mb-3"
                      />

                      <VSelect
                        v-model="filterSystem"
                        :items="systems"
                        label="System"
                        density="compact"
                        variant="outlined"
                        clearable
                        class="mb-3"
                      />

                      <VSelect
                        v-model="filterModule"
                        :items="modules"
                        label="Module"
                        density="compact"
                        variant="outlined"
                        clearable
                        class="mb-3"
                      />

                      <VSelect
                        v-model="filterPriority"
                        :items="priorities"
                        label="Priority"
                        density="compact"
                        variant="outlined"
                        clearable
                      />
                    </VCardText>

                    <VDivider />

                    <VCardActions class="pa-3">
                      <VSpacer />

                      <VBtn
                        variant="text"
                        @click="clearFilters"
                      >
                        Clear
                      </VBtn>
                    </VCardActions>
                  </VCard>
                </VMenu>
              </div>
            </div>

            <!-- APPROVAL CARDS -->

            <VRow>
              <VCol
                v-for="item in approvalRequisitions"
                :key="item.id"
                cols="12"
                md="6"
                lg="4"
              >
                <VCard
                  variant="outlined"
                  class="approval-card h-100"
                >
                  <VCardItem>
                    <template #prepend>
                      <VAvatar
                        color="primary"
                        variant="tonal"
                        size="42"
                      >
                        <VIcon
                          icon="mdi-application-cog-outline"
                        />
                      </VAvatar>
                    </template>

                    <VCardTitle
                      class="text-subtitle-1 font-weight-bold"
                    >
                      {{ item.requestNo }}
                    </VCardTitle>

                    <VCardSubtitle>
                      {{ item.title }}
                    </VCardSubtitle>

                    <template #append>
                      <AppStatusChip
                        :status="item.status as any"
                        :color="
                          getStatusColor(
                            item.status,
                          )
                        "
                      />
                    </template>
                  </VCardItem>

                  <VCardText>
                    <VDivider class="mb-4" />

                    <div class="request-info">
                      <div class="info-row">
                        <VIcon
                          icon="mdi-account-outline"
                          size="18"
                        />

                        <div>
                          <div class="info-label">
                            Requester
                          </div>

                          <div class="info-value">
                            {{ item.requester }}
                          </div>
                        </div>
                      </div>

                      <div class="info-row">
                        <VIcon
                          icon="mdi-domain"
                          size="18"
                        />

                        <div>
                          <div class="info-label">
                            Department
                          </div>

                          <div class="info-value">
                            {{ item.department }}
                          </div>
                        </div>
                      </div>

                      <div class="info-row">
                        <VIcon
                          icon="mdi-application-outline"
                          size="18"
                        />

                        <div>
                          <div class="info-label">
                            System
                          </div>

                          <div class="info-value">
                            {{ item.system }}
                          </div>
                        </div>
                      </div>

                      <div class="info-row">
                        <VIcon
                          icon="mdi-view-module-outline"
                          size="18"
                        />

                        <div>
                          <div class="info-label">
                            Module
                          </div>

                          <div class="info-value">
                            {{ item.module }}
                          </div>
                        </div>
                      </div>

                      <div class="info-row">
                        <VIcon
                          icon="mdi-account-key-outline"
                          size="18"
                        />

                        <div>
                          <div class="info-label">
                            Access Type
                          </div>

                          <div class="info-value">
                            {{ item.accessType }}
                          </div>
                        </div>
                      </div>
                    </div>

                    <VSheet
                      rounded="lg"
                      class="request-summary-box pa-4 mt-4"
                    >
                      <div
                        class="d-flex align-center justify-space-between mb-3"
                      >
                        <div>
                          <div class="text-caption text-medium-emphasis">
                            Environment
                          </div>

                          <div class="font-weight-semibold">
                            {{ item.environment }}
                          </div>
                        </div>

                        <VChip
                          size="small"
                          variant="tonal"
                          :color="
                            getPriorityColor(
                              item.priority,
                            )
                          "
                        >
                          {{ item.priority }}
                        </VChip>
                      </div>

                      <div>
                        <div class="text-caption text-medium-emphasis">
                          Required Date
                        </div>

                        <div class="font-weight-medium">
                          {{ formatDate(item.requiredDate) }}
                        </div>
                      </div>
                    </VSheet>
                  </VCardText>

                  <VDivider />

                  <VCardActions class="pa-4">
                    <VBtn
                      variant="text"
                      prepend-icon="mdi-eye-outline"
                      @click="viewDetails(item)"
                    >
                      View
                    </VBtn>

                    <VSpacer />

                    <template
                      v-if="
                        item.status ===
                        'Pending Approval'
                      "
                    >
                      <VBtn
                        color="error"
                        variant="tonal"
                        prepend-icon="mdi-close"
                        @click="
                          openApprovalDialog(
                            item,
                            'reject',
                          )
                        "
                      >
                        Reject
                      </VBtn>

                      <VBtn
                        color="primary"
                        prepend-icon="mdi-check"
                        @click="
                          openApprovalDialog(
                            item,
                            'approve',
                          )
                        "
                      >
                        Approve
                      </VBtn>
                    </template>

                    <template v-else>
                      <VBtn
                        color="success"
                        prepend-icon="mdi-check-circle-outline"
                        @click="
                          openApprovalDialog(
                            item,
                            'complete',
                          )
                        "
                      >
                        Mark Completed
                      </VBtn>
                    </template>
                  </VCardActions>
                </VCard>
              </VCol>
            </VRow>

            <VCard
              v-if="
                approvalRequisitions.length === 0
              "
              variant="outlined"
              class="pa-10 text-center"
            >
              <VIcon
                icon="mdi-check-all"
                size="52"
                class="mb-3 text-medium-emphasis"
              />

              <div class="text-h6 font-weight-medium mb-1">
                No Approval Requests
              </div>

              <div class="text-body-2 text-medium-emphasis">
                There are no system requisitions waiting for approval.
              </div>
            </VCard>
          </div>
        </VWindowItem>

        <!-- ==================================================
             REJECT
             ================================================== -->

        <VWindowItem value="reject">
          <div class="pa-5">
            <div
              class="d-flex align-center justify-space-between flex-wrap ga-3 mb-5"
            >
              <div>
                <h2 class="text-h6 font-weight-semibold">
                  Reject
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  View rejected system requisitions and reasons
                </p>
              </div>

              <VTextField
                v-model="search"
                density="compact"
                variant="outlined"
                placeholder="Search requisition..."
                prepend-inner-icon="mdi-magnify"
                hide-details
                clearable
                style="max-width: 280px"
              />
            </div>

            <div class="table-wrapper">
              <VTable hover>
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Requester</th>
                    <th>Department</th>
                    <th>System</th>
                    <th>Module</th>
                    <th>Access Type</th>
                    <th>Reason</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="item in rejectedRequisitions"
                    :key="item.id"
                  >
                    <td class="font-weight-medium">
                      {{ item.requestNo }}
                    </td>

                    <td>
                      {{ item.requester }}
                    </td>

                    <td>
                      {{ item.department }}
                    </td>

                    <td>
                      {{ item.system }}
                    </td>

                    <td>
                      {{ item.module }}
                    </td>

                    <td>
                      {{ item.accessType }}
                    </td>

                    <td class="reason-cell">
                      {{ item.rejectionReason || "-" }}
                    </td>

                    <td>
                      <VBtn
                        icon="mdi-eye-outline"
                        size="small"
                        variant="text"
                        @click="viewDetails(item)"
                      />
                    </td>
                  </tr>

                  <tr
                    v-if="
                      rejectedRequisitions.length === 0
                    "
                  >
                    <td
                      colspan="8"
                      class="text-center py-8 text-medium-emphasis"
                    >
                      No rejected system requisitions found.
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </div>
          </div>
        </VWindowItem>

        <!-- ==================================================
             COMPLETED
             ================================================== -->

        <VWindowItem value="completed">
          <div class="pa-5">
            <div
              class="d-flex align-center justify-space-between flex-wrap ga-3 mb-5"
            >
              <div>
                <h2 class="text-h6 font-weight-semibold">
                  Completed
                </h2>

                <p class="text-body-2 text-medium-emphasis mb-0">
                  View completed system requisition requests
                </p>
              </div>

              <VTextField
                v-model="search"
                density="compact"
                variant="outlined"
                placeholder="Search requisition..."
                prepend-inner-icon="mdi-magnify"
                hide-details
                clearable
                style="max-width: 280px"
              />
            </div>

            <VRow>
              <VCol
                v-for="item in completedRequisitions"
                :key="item.id"
                cols="12"
                md="6"
                lg="4"
              >
                <VCard
                  variant="outlined"
                  class="h-100"
                >
                  <VCardItem>
                    <template #prepend>
                      <VAvatar
                        color="success"
                        variant="tonal"
                      >
                        <VIcon
                          icon="mdi-check-circle-outline"
                        />
                      </VAvatar>
                    </template>

                    <VCardTitle
                      class="text-subtitle-1"
                    >
                      {{ item.requestNo }}
                    </VCardTitle>

                    <VCardSubtitle>
                      {{ item.title }}
                    </VCardSubtitle>

                    <template #append>
                      <AppStatusChip
                        :status="item.status as any"
                        :color="
                          getStatusColor(
                            item.status,
                          )
                        "
                      />
                    </template>
                  </VCardItem>

                  <VCardText>
                    <div class="text-body-2 mb-4">
                      {{
                        item.description ||
                          "No description provided."
                      }}
                    </div>

                    <VRow dense>
                      <VCol cols="6">
                        <div class="text-caption text-medium-emphasis">
                          System
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ item.system }}
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="text-caption text-medium-emphasis">
                          Module
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ item.module }}
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="text-caption text-medium-emphasis">
                          Access
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ item.accessType }}
                        </div>
                      </VCol>

                      <VCol cols="6">
                        <div class="text-caption text-medium-emphasis">
                          Completed
                        </div>

                        <div class="text-body-2 font-weight-medium">
                          {{ formatDate(item.completedDate) }}
                        </div>
                      </VCol>
                    </VRow>
                  </VCardText>

                  <VDivider />

                  <VCardActions class="pa-3">
                    <VBtn
                      variant="text"
                      prepend-icon="mdi-eye-outline"
                      @click="viewDetails(item)"
                    >
                      View Details
                    </VBtn>
                  </VCardActions>
                </VCard>
              </VCol>
            </VRow>

            <VCard
              v-if="
                completedRequisitions.length === 0
              "
              variant="outlined"
              class="pa-10 text-center"
            >
              <VIcon
                icon="mdi-check-circle-outline"
                size="52"
                class="mb-3 text-medium-emphasis"
              />

              <div class="text-h6 font-weight-medium mb-1">
                No Completed Requisitions
              </div>

              <div class="text-body-2 text-medium-emphasis">
                Completed system requisitions will appear here.
              </div>
            </VCard>
          </div>
        </VWindowItem>
      </VWindow>
    </VCard>

    <!-- ======================================================
         DETAILS DIALOG
         ====================================================== -->

    <VDialog
      v-model="detailsDialog"
      max-width="780"
    >
      <VCard v-if="selectedRequisition">
        <VCardTitle class="d-flex align-center">
          <div>
            <div class="text-h6">
              {{ selectedRequisition.requestNo }}
            </div>

            <div class="text-body-2 text-medium-emphasis">
              System Requisition Details
            </div>
          </div>

          <VSpacer />

          <AppStatusChip
            :status="
              selectedRequisition.status as any
            "
            :color="
              getStatusColor(
                selectedRequisition.status,
              )
            "
          />
        </VCardTitle>

        <VDivider />

        <VCardText class="pa-5">
          <div class="text-subtitle-1 font-weight-semibold mb-4">
            Request Information
          </div>

          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Requester
              </div>

              <div class="detail-value">
                {{ selectedRequisition.requester }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Department
              </div>

              <div class="detail-value">
                {{ selectedRequisition.department }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                System
              </div>

              <div class="detail-value">
                {{ selectedRequisition.system }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Module
              </div>

              <div class="detail-value">
                {{ selectedRequisition.module }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Access Type
              </div>

              <div class="detail-value">
                {{ selectedRequisition.accessType }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Environment
              </div>

              <div class="detail-value">
                {{ selectedRequisition.environment }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Priority
              </div>

              <VChip
                size="small"
                variant="tonal"
                :color="
                  getPriorityColor(
                    selectedRequisition.priority,
                  )
                "
              >
                {{ selectedRequisition.priority }}
              </VChip>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Required Date
              </div>

              <div class="detail-value">
                {{
                  formatDate(
                    selectedRequisition.requiredDate,
                  )
                }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="detail-label">
                Request Title
              </div>

              <div class="detail-value">
                {{ selectedRequisition.title }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="detail-label">
                Description
              </div>

              <div class="detail-value">
                {{
                  selectedRequisition.description ||
                    "No description provided."
                }}
              </div>
            </VCol>

            <VCol cols="12">
              <div class="detail-label">
                Business Justification
              </div>

              <div class="detail-value">
                {{
                  selectedRequisition.businessJustification ||
                    "No business justification provided."
                }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Request Date
              </div>

              <div class="detail-value">
                {{
                  formatDate(
                    selectedRequisition.requestDate,
                  )
                }}
              </div>
            </VCol>

            <VCol
              cols="12"
              sm="6"
            >
              <div class="detail-label">
                Approver
              </div>

              <div class="detail-value">
                {{
                  selectedRequisition.approver ||
                    "-"
                }}
              </div>
            </VCol>

            <VCol
              v-if="
                selectedRequisition.rejectionReason
              "
              cols="12"
            >
              <VAlert
                type="error"
                variant="tonal"
                title="Rejection Reason"
              >
                {{
                  selectedRequisition.rejectionReason
                }}
              </VAlert>
            </VCol>

            <VCol
              v-if="
                selectedRequisition.completedDate
              "
              cols="12"
            >
              <VAlert
                type="success"
                variant="tonal"
                title="Completed"
              >
                Completed on
                {{
                  formatDate(
                    selectedRequisition.completedDate,
                  )
                }}
              </VAlert>
            </VCol>
          </VRow>
        </VCardText>

        <VDivider />

        <VCardActions class="pa-4">
          <VSpacer />

          <VBtn
            variant="outlined"
            @click="detailsDialog = false"
          >
            Close
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <!-- ======================================================
         APPROVAL ACTION DIALOG
         ====================================================== -->

    <VDialog
      v-model="approvalDialog"
      max-width="520"
      persistent
    >
      <VCard v-if="approvalTarget">
        <VCardTitle class="d-flex align-center">
          <VAvatar
            :color="
              approvalAction === 'reject'
                ? 'error'
                : approvalAction === 'complete'
                  ? 'success'
                  : 'primary'
            "
            variant="tonal"
            class="mr-3"
          >
            <VIcon
              :icon="
                approvalAction === 'reject'
                  ? 'mdi-close'
                  : approvalAction === 'complete'
                    ? 'mdi-check-circle-outline'
                    : 'mdi-check'
              "
            />
          </VAvatar>

          <div>
            <div class="text-h6">
              {{
                approvalAction === "approve"
                  ? "Approve Requisition"
                  : approvalAction === "reject"
                    ? "Reject Requisition"
                    : "Mark as Completed"
              }}
            </div>

            <div class="text-body-2 text-medium-emphasis">
              {{ approvalTarget.requestNo }}
            </div>
          </div>
        </VCardTitle>

        <VDivider />

        <VCardText class="pa-5">
          <VAlert
            v-if="approvalAction === 'approve'"
            type="info"
            variant="tonal"
            class="mb-4"
          >
            Are you sure you want to approve this system requisition?
          </VAlert>

          <VAlert
            v-if="approvalAction === 'complete'"
            type="success"
            variant="tonal"
            class="mb-4"
          >
            This request has been approved. Mark it as completed
            after the system access or change has been implemented.
          </VAlert>

          <VAlert
            v-if="approvalAction === 'reject'"
            type="error"
            variant="tonal"
            class="mb-4"
          >
            Please provide a reason for rejecting this request.
          </VAlert>

          <VCard
            variant="outlined"
            class="pa-4 mb-4"
          >
            <div
              class="d-flex justify-space-between mb-2"
            >
              <span class="text-medium-emphasis">
                Request
              </span>

              <span class="font-weight-medium text-right">
                {{ approvalTarget.title }}
              </span>
            </div>

            <div
              class="d-flex justify-space-between mb-2"
            >
              <span class="text-medium-emphasis">
                System
              </span>

              <span>
                {{ approvalTarget.system }}
              </span>
            </div>

            <div
              class="d-flex justify-space-between mb-2"
            >
              <span class="text-medium-emphasis">
                Module
              </span>

              <span>
                {{ approvalTarget.module }}
              </span>
            </div>

            <div
              class="d-flex justify-space-between mb-2"
            >
              <span class="text-medium-emphasis">
                Access
              </span>

              <span>
                {{ approvalTarget.accessType }}
              </span>
            </div>

            <div
              class="d-flex justify-space-between"
            >
              <span class="text-medium-emphasis">
                Environment
              </span>

              <span class="font-weight-medium">
                {{ approvalTarget.environment }}
              </span>
            </div>
          </VCard>

          <VTextarea
            v-if="approvalAction === 'reject'"
            v-model="rejectionReason"
            label="Rejection Reason"
            placeholder="Enter reason for rejection..."
            variant="outlined"
            rows="4"
          />
        </VCardText>

        <VDivider />

        <VCardActions class="pa-4">
          <VSpacer />

          <VBtn
            variant="text"
            @click="closeApprovalDialog"
          >
            Cancel
          </VBtn>

          <VBtn
            v-if="approvalAction === 'approve'"
            color="primary"
            prepend-icon="mdi-check"
            @click="confirmApprovalAction"
          >
            Approve
          </VBtn>

          <VBtn
            v-if="approvalAction === 'reject'"
            color="error"
            prepend-icon="mdi-close"
            :disabled="
              !rejectionReason.trim()
            "
            @click="confirmApprovalAction"
          >
            Reject
          </VBtn>

          <VBtn
            v-if="approvalAction === 'complete'"
            color="success"
            prepend-icon="mdi-check-circle-outline"
            @click="confirmApprovalAction"
          >
            Mark Completed
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

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

.reason-cell {
  max-width: 300px;
  white-space: normal !important;
  line-height: 1.5;
}

.approval-card {
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.approval-card:hover {
  transform: translateY(-2px);
}

.request-info {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.info-row > .v-icon {
  margin-top: 2px;
  color: rgb(var(--v-theme-primary));
}

.info-label {
  font-size: 12px;
  color: rgba(
    var(--v-theme-on-surface),
    0.6
  );
  margin-bottom: 2px;
}

.info-value {
  font-size: 14px;
  font-weight: 500;
}

.request-summary-box {
  background: rgba(
    var(--v-theme-primary),
    0.06
  );
}

.process-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.process-line {
  height: 22px;
  width: 1px;
  margin-left: 16px;
  background: rgba(
    var(--v-theme-on-surface),
    0.12
  );
}

.detail-label {
  font-size: 12px;
  color: rgba(
    var(--v-theme-on-surface),
    0.6
  );
  margin-bottom: 4px;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
}

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