import { computed, ref } from "vue"

export type SystemRequisitionStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Rejected"
  | "Completed"

export type SystemRequisitionPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent"

export type SystemAccessType =
  | "New Access"
  | "Modify Access"
  | "Remove Access"
  | "Role Change"

export type SystemEnvironment =
  | "Production"
  | "UAT"
  | "Development"

export interface SystemRequisition {
  id: string
  requestNo: string
  requester: string
  department: string
  system: string
  module: string
  accessType: SystemAccessType
  environment: SystemEnvironment
  title: string
  description: string
  businessJustification: string
  requestDate: string
  requiredDate: string
  priority: SystemRequisitionPriority
  status: SystemRequisitionStatus
  approver?: string
  rejectionReason?: string
  completedDate?: string
}

/* */

const systemRequisitions = ref<SystemRequisition[]>([
  {
    id: "sr-001",
    requestNo: "SR-2026-001",
    requester: "Aiman",
    department: "Information Technology",
    system: "ERP",
    module: "User Management",
    accessType: "New Access",
    environment: "Production",
    title: "ERP User Access",
    description:
      "Request production ERP access for application support activities.",
    businessJustification:
      "Required to support users and perform application-related tasks.",
    requestDate: "2026-09-01",
    requiredDate: "2026-10-01",
    priority: "High",
    status: "Pending Approval",
  },

  {
    id: "sr-002",
    requestNo: "SR-2026-002",
    requester: "Nur Amirah",
    department: "Human Resources",
    system: "HR System",
    module: "Employee Management",
    accessType: "New Access",
    environment: "Production",
    title: "HR System Access",
    description:
      "Request access to employee management module.",
    businessJustification:
      "Required to perform daily HR administrative activities.",
    requestDate: "2026-09-02",
    requiredDate: "2026-09-30",
    priority: "Medium",
    status: "Approved",
    approver: "HR Manager",
  },

  {
    id: "sr-003",
    requestNo: "SR-2026-003",
    requester: "Farhan",
    department: "Finance",
    system: "ERP",
    module: "Finance",
    accessType: "Role Change",
    environment: "Production",
    title: "Finance Role Update",
    description:
      "Request to update ERP finance role permissions.",
    businessJustification:
      "Required following changes to finance responsibilities.",
    requestDate: "2026-08-20",
    requiredDate: "2026-09-05",
    priority: "High",
    status: "Completed",
    approver: "Finance Manager",
    completedDate: "2026-09-06",
  },

  {
    id: "sr-004",
    requestNo: "SR-2026-004",
    requester: "Siti",
    department: "Administration",
    system: "Document Management",
    module: "Document Library",
    accessType: "New Access",
    environment: "Production",
    title: "Document System Access",
    description:
      "Request access to the document management system.",
    businessJustification:
      "Required to manage departmental documents.",
    requestDate: "2026-09-03",
    requiredDate: "2026-09-25",
    priority: "Low",
    status: "Rejected",
    rejectionReason:
      "Access is not required for the current job responsibility.",
  },

  {
    id: "sr-005",
    requestNo: "SR-2026-005",
    requester: "Daniel",
    department: "Marketing",
    system: "CRM",
    module: "Customer Management",
    accessType: "New Access",
    environment: "Production",
    title: "CRM User Access",
    description:
      "Request CRM access for customer management activities.",
    businessJustification:
      "Required for marketing campaign and customer activities.",
    requestDate: "2026-09-05",
    requiredDate: "2026-10-05",
    priority: "Medium",
    status: "Pending Approval",
  },

  {
    id: "sr-006",
    requestNo: "SR-2026-006",
    requester: "Hakim",
    department: "Procurement",
    system: "Procurement System",
    module: "Purchase Request",
    accessType: "Modify Access",
    environment: "Production",
    title: "Procurement Permission Update",
    description:
      "Request modification of purchase request permissions.",
    businessJustification:
      "Required to support the user's updated procurement role.",
    requestDate: "2026-08-28",
    requiredDate: "2026-09-20",
    priority: "Medium",
    status: "Approved",
    approver: "Procurement Manager",
  },

  {
    id: "sr-007",
    requestNo: "SR-2026-007",
    requester: "Aina",
    department: "Administration",
    system: "E-Services",
    module: "Request Management",
    accessType: "New Access",
    environment: "Production",
    title: "E-Services Access",
    description:
      "Request access to the E-Services request management module.",
    businessJustification:
      "Required to submit and monitor internal service requests.",
    requestDate: "2026-08-15",
    requiredDate: "2026-08-30",
    priority: "Low",
    status: "Completed",
    approver: "Department Manager",
    completedDate: "2026-08-29",
  },

  {
    id: "sr-008",
    requestNo: "SR-2026-008",
    requester: "Aiman",
    department: "Information Technology",
    system: "Integration Platform",
    module: "API Management",
    accessType: "New Access",
    environment: "UAT",
    title: "UAT API Access",
    description:
      "Request UAT access for API integration testing.",
    businessJustification:
      "Required for application integration development and testing.",
    requestDate: "2026-09-08",
    requiredDate: "2026-10-10",
    priority: "High",
    status: "Draft",
  },

  {
    id: "sr-009",
    requestNo: "SR-2026-009",
    requester: "Melissa",
    department: "Human Resources",
    system: "HR System",
    module: "Reports",
    accessType: "New Access",
    environment: "Production",
    title: "HR Reporting Access",
    description:
      "Request access to HR reporting functions.",
    businessJustification:
      "Required to prepare departmental reports.",
    requestDate: "2026-09-07",
    requiredDate: "2026-10-15",
    priority: "Medium",
    status: "Rejected",
    rejectionReason:
      "Reporting access is restricted to the designated HR reporting role.",
  },

  {
    id: "sr-010",
    requestNo: "SR-2026-010",
    requester: "Rizal",
    department: "Information Technology",
    system: "IT Helpdesk",
    module: "Ticket Management",
    accessType: "Role Change",
    environment: "Production",
    title: "Helpdesk Role Update",
    description:
      "Request to update helpdesk role permissions.",
    businessJustification:
      "Required to support additional helpdesk responsibilities.",
    requestDate: "2026-08-12",
    requiredDate: "2026-08-25",
    priority: "High",
    status: "Completed",
    approver: "IT Manager",
    completedDate: "2026-08-26",
  },
])

/* */

const departments = computed(() => {
  return [
    ...new Set(
      systemRequisitions.value.map(item => item.department),
    ),
  ]
})

const systems = computed(() => {
  return [
    ...new Set(
      systemRequisitions.value.map(item => item.system),
    ),
  ]
})

const modules = computed(() => {
  return [
    ...new Set(
      systemRequisitions.value.map(item => item.module),
    ),
  ]
})

const accessTypes: SystemAccessType[] = [
  "New Access",
  "Modify Access",
  "Remove Access",
  "Role Change",
]

const environments: SystemEnvironment[] = [
  "Production",
  "UAT",
  "Development",
]

const priorities: SystemRequisitionPriority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent",
]

/* */

function addRequisition(
  payload: Omit<
    SystemRequisition,
    "id" | "requestNo" | "status"
  >,
) {
  const year = new Date().getFullYear()

  const numbers = systemRequisitions.value
    .map(item => {
      const match = item.requestNo.match(/(\d+)$/)

      return match ? Number(match[1]) : 0
    })
    .filter(number => !Number.isNaN(number))

  const nextNumber =
    numbers.length > 0
      ? Math.max(...numbers) + 1
      : 1

  const requestNo = `SR-${year}-${String(nextNumber).padStart(
    3,
    "0",
  )}`

  const newRequisition: SystemRequisition = {
    id: `sr-${Date.now()}`,
    requestNo,
    ...payload,
    status: "Pending Approval",
  }

  systemRequisitions.value.unshift(newRequisition)

  return newRequisition
}

/* */

function updateRequisitionStatus(
  id: string,
  status: SystemRequisitionStatus,
  options?: {
    rejectionReason?: string
    completedDate?: string
  },
) {
  const item = systemRequisitions.value.find(
    requisition => requisition.id === id,
  )

  if (!item) return

  item.status = status

  if (status === "Approved") {
    item.approver = "Current Approver"
    item.rejectionReason = undefined
  }

  if (status === "Rejected") {
    item.rejectionReason =
      options?.rejectionReason ||
      "No reason provided."
  }

  if (status === "Completed") {
    item.completedDate =
      options?.completedDate ||
      new Date().toISOString().slice(0, 10)
  }
}

/* */

function getRequisition(id: string) {
  return systemRequisitions.value.find(
    item => item.id === id,
  )
}

/* */

export function useSystemRequisitions() {
  return {
    systemRequisitions,
    departments,
    systems,
    modules,
    accessTypes,
    environments,
    priorities,
    addRequisition,
    updateRequisitionStatus,
    getRequisition,
  }
}