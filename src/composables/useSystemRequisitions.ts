import {
  computed,
  ref,
} from "vue"


/* =============================================================
   TYPES
============================================================= */

export type RequisitionStatus =
  | "Draft"
  | "Submitted"
  | "In Review"
  | "Approved"
  | "Rejected"
  | "Completed"


export type RequisitionPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent"


export type RequisitionAction =
  | "Created"
  | "Updated"
  | "Submitted"
  | "Approved"
  | "Rejected"
  | "Completed"


export interface SystemRequisition {

  id: string

  requestNo: string

  requester: string

  department: string

  module: string

  accessType: string

  priority: RequisitionPriority

  requiredDate: string

  status: RequisitionStatus

  description: string

  createdDate: string

  completedDate?: string

}


export interface RequisitionHistory {

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


/* =============================================================
   COMPOSABLE
============================================================= */

export function useSystemRequisitions() {


  /* ===========================================================
     MASTER OPTIONS
  =========================================================== */

  const departments = ref<string[]>([
    "Administration",
    "Corporate Affairs",
    "Finance",
    "Human Resources",
    "Information Technology",
    "Production",
    "Quality Assurance",
    "Regulatory Affairs",
    "Sales & Marketing",
  ])


  const modules = ref<string[]>([
    "Dashboard",
    "Employee Onboarding",
    "Requisitions",
    "Staff Management",
    "Announcements",
    "Reports",
    "IT Account",
    "Access Management",
  ])


  const accessTypes = ref<string[]>([
    "New Access",
    "Modify Access",
    "Remove Access",
    "Temporary Access",
    "Additional Access",
  ])


  const priorities = ref<RequisitionPriority[]>([
    "Low",
    "Medium",
    "High",
    "Urgent",
  ])


  const statuses = ref<RequisitionStatus[]>([
    "Draft",
    "Submitted",
    "In Review",
    "Approved",
    "Rejected",
    "Completed",
  ])


  const historyActions = ref<RequisitionAction[]>([
    "Created",
    "Updated",
    "Submitted",
    "Approved",
    "Rejected",
    "Completed",
  ])


  /* ===========================================================
     SAMPLE REQUISITIONS
  =========================================================== */

  const requisitions = ref<SystemRequisition[]>([

    {
      id: "SR-001",
      requestNo: "SR-2026-001",
      requester: "Aiman Asri",
      department: "Information Technology",
      module: "Employee Onboarding",
      accessType: "New Access",
      priority: "High",
      requiredDate: "2026-10-05",
      status: "Submitted",
      description:
        "Request system access for employee onboarding activities.",
      createdDate: "2026-09-20",
    },

    {
      id: "SR-002",
      requestNo: "SR-2026-002",
      requester: "Nur Amirah",
      department: "Human Resources",
      module: "Employee Onboarding",
      accessType: "Modify Access",
      priority: "Medium",
      requiredDate: "2026-10-03",
      status: "In Review",
      description:
        "Additional access required to process new joiner records.",
      createdDate: "2026-09-21",
    },

    {
      id: "SR-003",
      requestNo: "SR-2026-003",
      requester: "Vivian",
      department: "Finance",
      module: "Reports",
      accessType: "New Access",
      priority: "Medium",
      requiredDate: "2026-10-08",
      status: "Approved",
      description:
        "Access required for finance reporting and monitoring.",
      createdDate: "2026-09-22",
    },

    {
      id: "SR-004",
      requestNo: "SR-2026-004",
      requester: "Teo",
      department: "Human Resources",
      module: "Staff Management",
      accessType: "Modify Access",
      priority: "Low",
      requiredDate: "2026-09-15",
      status: "Completed",
      description:
        "Modify existing staff management access.",
      createdDate: "2026-09-10",
      completedDate: "2026-09-18",
    },

    {
      id: "SR-005",
      requestNo: "SR-2026-005",
      requester: "Iqbal",
      department: "Information Technology",
      module: "Access Management",
      accessType: "Additional Access",
      priority: "Urgent",
      requiredDate: "2026-10-01",
      status: "Submitted",
      description:
        "Additional access required for system administration tasks.",
      createdDate: "2026-09-24",
    },

    {
      id: "SR-006",
      requestNo: "SR-2026-006",
      requester: "Nisha",
      department: "Corporate Affairs",
      module: "Announcements",
      accessType: "New Access",
      priority: "Low",
      requiredDate: "2026-09-20",
      status: "Rejected",
      description:
        "Request access to manage corporate announcements.",
      createdDate: "2026-09-12",
    },

    {
      id: "SR-007",
      requestNo: "SR-2026-007",
      requester: "Admin",
      department: "Administration",
      module: "Dashboard",
      accessType: "New Access",
      priority: "Medium",
      requiredDate: "2026-09-18",
      status: "Completed",
      description:
        "Dashboard access for administration monitoring.",
      createdDate: "2026-08-30",
      completedDate: "2026-09-17",
    },

    {
      id: "SR-008",
      requestNo: "SR-2026-008",
      requester: "Farah",
      department: "Quality Assurance",
      module: "Reports",
      accessType: "New Access",
      priority: "High",
      requiredDate: "2026-10-12",
      status: "Draft",
      description:
        "Request reporting access for quality monitoring.",
      createdDate: "2026-09-26",
    },

  ])


  /* ===========================================================
     SAMPLE HISTORY
  =========================================================== */

  const requisitionHistory = ref<RequisitionHistory[]>([

    {
      id: "RH-001",
      requestNo: "SR-2026-001",
      requester: "Aiman Asri",
      department: "Information Technology",
      action: "Created",
      effectiveDate: "2026-09-20T09:15:00",
      changedBy: "Aiman Asri",
      status: "Draft",
      remarks:
        "System requisition created.",
    },

    {
      id: "RH-002",
      requestNo: "SR-2026-001",
      requester: "Aiman Asri",
      department: "Information Technology",
      action: "Submitted",
      effectiveDate: "2026-09-20T09:30:00",
      changedBy: "Aiman Asri",
      status: "Submitted",
      remarks:
        "Request submitted for approval.",
    },

    {
      id: "RH-003",
      requestNo: "SR-2026-002",
      requester: "Nur Amirah",
      department: "Human Resources",
      action: "Created",
      effectiveDate: "2026-09-21T10:00:00",
      changedBy: "Nur Amirah",
      status: "Draft",
      remarks:
        "System access request created.",
    },

    {
      id: "RH-004",
      requestNo: "SR-2026-002",
      requester: "Nur Amirah",
      department: "Human Resources",
      action: "Submitted",
      effectiveDate: "2026-09-21T10:15:00",
      changedBy: "Nur Amirah",
      status: "Submitted",
      remarks:
        "Request submitted for review.",
    },

    {
      id: "RH-005",
      requestNo: "SR-2026-003",
      requester: "Vivian",
      department: "Finance",
      action: "Approved",
      effectiveDate: "2026-09-23T14:20:00",
      changedBy: "IT Manager",
      status: "Approved",
      remarks:
        "Access request approved.",
    },

    {
      id: "RH-006",
      requestNo: "SR-2026-004",
      requester: "Teo",
      department: "Human Resources",
      action: "Completed",
      effectiveDate: "2026-09-18T16:00:00",
      changedBy: "IT Support",
      status: "Completed",
      remarks:
        "Requested access has been configured.",
    },

    {
      id: "RH-007",
      requestNo: "SR-2026-006",
      requester: "Nisha",
      department: "Corporate Affairs",
      action: "Rejected",
      effectiveDate: "2026-09-13T11:30:00",
      changedBy: "IT Manager",
      status: "Rejected",
      remarks:
        "Requested access was not required for the current role.",
    },

    {
      id: "RH-008",
      requestNo: "SR-2026-007",
      requester: "Admin",
      department: "Administration",
      action: "Completed",
      effectiveDate: "2026-09-17T15:30:00",
      changedBy: "IT Support",
      status: "Completed",
      remarks:
        "Dashboard access successfully configured.",
    },

  ])


  /* ===========================================================
     DATE HELPER
  =========================================================== */

  function getToday() {

    const date = new Date()

    const year = date.getFullYear()

    const month = String(
      date.getMonth() + 1,
    ).padStart(2, "0")

    const day = String(
      date.getDate(),
    ).padStart(2, "0")

    return `${year}-${month}-${day}`

  }


  /* ===========================================================
     DATETIME HELPER
  =========================================================== */

  function getNow() {

    return new Date().toISOString()

  }


  /* ===========================================================
     NEXT REQUEST NUMBER
  =========================================================== */

  function getNextRequestNo() {

    const year = new Date().getFullYear()

    const numbers = requisitions.value
      .map(item => {

        const number =
          item.requestNo.split("-").pop()

        return Number(number)

      })
      .filter(Number.isFinite)

    const next =
      Math.max(0, ...numbers) + 1

    return `SR-${year}-${String(next).padStart(3, "0")}`

  }


  /* ===========================================================
     NEXT HISTORY ID
  =========================================================== */

  function getNextHistoryId() {

    const numbers = requisitionHistory.value
      .map(item => {

        const number =
          item.id.split("-").pop()

        return Number(number)

      })
      .filter(Number.isFinite)

    const next =
      Math.max(0, ...numbers) + 1

    return `RH-${String(next).padStart(3, "0")}`

  }


  /* ===========================================================
     ADD HISTORY
  =========================================================== */

  function addHistory(
    requisition: SystemRequisition,
    action: RequisitionAction,
    changedBy = "Current User",
    remarks = "",
  ) {

    requisitionHistory.value.unshift({

      id: getNextHistoryId(),

      requestNo:
        requisition.requestNo,

      requester:
        requisition.requester,

      department:
        requisition.department,

      action,

      effectiveDate:
        getNow(),

      changedBy,

      status:
        requisition.status,

      remarks,

    })

  }


  /* ===========================================================
     CREATE
  =========================================================== */

  function createRequisition(data: {

    requestNo: string

    requester: string

    department: string

    module: string

    accessType: string

    priority: string

    requiredDate: string

    description: string

  }) {

    const requisition: SystemRequisition = {

      id: data.requestNo,

      requestNo: data.requestNo,

      requester: data.requester,

      department: data.department,

      module: data.module,

      accessType: data.accessType,

      priority:
        data.priority as RequisitionPriority,

      requiredDate: data.requiredDate,

      status: "Draft",

      description: data.description,

      createdDate: getToday(),

    }


    requisitions.value.unshift(
      requisition,
    )


    addHistory(
      requisition,
      "Created",
      data.requester,
      "System requisition created.",
    )


    return requisition

  }


  /* ===========================================================
     SUBMIT
  =========================================================== */

  function submitRequisition(
    requisition: SystemRequisition,
  ) {

    requisition.status = "Submitted"


    addHistory(
      requisition,
      "Submitted",
      requisition.requester,
      "Request submitted for approval.",
    )

  }


  /* ===========================================================
     APPROVE
  =========================================================== */

  function approveRequisition(
    requisition: SystemRequisition,
  ) {

    requisition.status = "Approved"


    addHistory(
      requisition,
      "Approved",
      "IT Manager",
      "System access requisition approved.",
    )

  }


  /* ===========================================================
     REJECT
  =========================================================== */

  function rejectRequisition(
    requisition: SystemRequisition,
  ) {

    requisition.status = "Rejected"


    addHistory(
      requisition,
      "Rejected",
      "IT Manager",
      "System access requisition rejected.",
    )

  }


  /* ===========================================================
     COMPLETE
  =========================================================== */

  function completeRequisition(
    requisition: SystemRequisition,
  ) {

    requisition.status = "Completed"

    requisition.completedDate = getToday()


    addHistory(
      requisition,
      "Completed",
      "IT Support",
      "System access has been configured and completed.",
    )

  }


  /* ===========================================================
     RESUBMIT
  =========================================================== */

  function resubmitRequisition(
    requisition: SystemRequisition,
  ) {

    requisition.status = "Submitted"

    requisition.completedDate = undefined


    addHistory(
      requisition,
      "Submitted",
      requisition.requester,
      "Rejected request resubmitted for approval.",
    )

  }


  /* ===========================================================
     UPDATE
  =========================================================== */

  function updateRequisition(
    requisition: SystemRequisition,
    data: Partial<SystemRequisition>,
    changedBy = "Current User",
  ) {

    Object.assign(
      requisition,
      data,
    )


    addHistory(
      requisition,
      "Updated",
      changedBy,
      "System requisition information was updated.",
    )

  }


  /* ===========================================================
     COMPUTED COUNTS
  =========================================================== */

  const pendingApprovalCount = computed(() => {

    return requisitions.value.filter(
      item =>
        item.status === "Submitted" ||
        item.status === "In Review",
    ).length

  })


  const approvedCount = computed(() => {

    return requisitions.value.filter(
      item =>
        item.status === "Approved",
    ).length

  })


  const completedCount = computed(() => {

    return requisitions.value.filter(
      item =>
        item.status === "Completed",
    ).length

  })


  const rejectedCount = computed(() => {

    return requisitions.value.filter(
      item =>
        item.status === "Rejected",
    ).length

  })


  /* ===========================================================
     RETURN
  =========================================================== */

  return {

    requisitions,

    requisitionHistory,

    departments,

    modules,

    accessTypes,

    priorities,

    statuses,

    historyActions,

    pendingApprovalCount,

    approvedCount,

    completedCount,

    rejectedCount,

    getToday,

    getNextRequestNo,

    createRequisition,

    submitRequisition,

    approveRequisition,

    rejectRequisition,

    completeRequisition,

    resubmitRequisition,

    updateRequisition,

  }

}