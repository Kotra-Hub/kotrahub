import { computed, ref } from "vue"

export type GeneralRequisitionStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Rejected"
  | "Completed"

export type GeneralRequisitionPriority =
  | "Low"
  | "Medium"
  | "High"
  | "Urgent"

export interface GeneralRequisition {
  id: string
  requestNo: string
  requester: string
  department: string
  category: string
  title: string
  description: string
  amount: number
  requestDate: string
  requiredDate: string
  priority: GeneralRequisitionPriority
  status: GeneralRequisitionStatus
  approver?: string
  rejectionReason?: string
  completedDate?: string
}

/* */

const generalRequisitions = ref<GeneralRequisition[]>([
  {
    id: "gr-001",
    requestNo: "GR-2026-001",
    requester: "Aiman",
    department: "Information Technology",
    category: "IT Equipment",
    title: "Laptop Accessories",
    description:
      "Request for laptop docking station, keyboard and mouse.",
    amount: 2500,
    requestDate: "2026-09-01",
    requiredDate: "2026-10-05",
    priority: "High",
    status: "Pending Approval",
  },

  {
    id: "gr-002",
    requestNo: "GR-2026-002",
    requester: "Nur Amirah",
    department: "Human Resources",
    category: "Office Supplies",
    title: "Training Materials",
    description:
      "Training materials required for the upcoming internal training session.",
    amount: 850,
    requestDate: "2026-09-02",
    requiredDate: "2026-09-30",
    priority: "Medium",
    status: "Approved",
    approver: "Department Manager",
  },

  {
    id: "gr-003",
    requestNo: "GR-2026-003",
    requester: "Farhan",
    department: "Finance",
    category: "Software",
    title: "Software Subscription",
    description:
      "Annual software subscription required for finance operations.",
    amount: 1800,
    requestDate: "2026-08-20",
    requiredDate: "2026-09-01",
    priority: "High",
    status: "Completed",
    approver: "Department Manager",
    completedDate: "2026-09-05",
  },

  {
    id: "gr-004",
    requestNo: "GR-2026-004",
    requester: "Siti",
    department: "Administration",
    category: "Office Supplies",
    title: "Office Stationery",
    description:
      "Request for monthly office stationery supplies.",
    amount: 420,
    requestDate: "2026-09-03",
    requiredDate: "2026-09-28",
    priority: "Low",
    status: "Rejected",
    rejectionReason:
      "Existing stock is sufficient for the current requirement.",
  },

  {
    id: "gr-005",
    requestNo: "GR-2026-005",
    requester: "Daniel",
    department: "Marketing",
    category: "Marketing",
    title: "Marketing Materials",
    description:
      "Printing and promotional materials for upcoming campaign.",
    amount: 3200,
    requestDate: "2026-09-05",
    requiredDate: "2026-10-10",
    priority: "High",
    status: "Pending Approval",
  },

  {
    id: "gr-006",
    requestNo: "GR-2026-006",
    requester: "Hakim",
    department: "Procurement",
    category: "Equipment",
    title: "Meeting Room Equipment",
    description:
      "Request for additional meeting room equipment.",
    amount: 1450,
    requestDate: "2026-08-28",
    requiredDate: "2026-09-25",
    priority: "Medium",
    status: "Approved",
    approver: "Department Manager",
  },

  {
    id: "gr-007",
    requestNo: "GR-2026-007",
    requester: "Aina",
    department: "Administration",
    category: "Pantry",
    title: "Pantry Supplies",
    description:
      "Monthly pantry supplies for staff usage.",
    amount: 650,
    requestDate: "2026-08-15",
    requiredDate: "2026-08-30",
    priority: "Low",
    status: "Completed",
    approver: "Department Manager",
    completedDate: "2026-08-29",
  },

  {
    id: "gr-008",
    requestNo: "GR-2026-008",
    requester: "Aiman",
    department: "Information Technology",
    category: "IT Equipment",
    title: "External Monitor",
    description:
      "Request for an additional monitor for development work.",
    amount: 780,
    requestDate: "2026-09-10",
    requiredDate: "2026-10-15",
    priority: "Medium",
    status: "Draft",
  },

  {
    id: "gr-009",
    requestNo: "GR-2026-009",
    requester: "Melissa",
    department: "Human Resources",
    category: "Training",
    title: "External Training",
    description:
      "Request to attend external professional training.",
    amount: 2800,
    requestDate: "2026-09-07",
    requiredDate: "2026-10-20",
    priority: "Medium",
    status: "Rejected",
    rejectionReason:
      "Training budget for the current period has been fully allocated.",
  },

  {
    id: "gr-010",
    requestNo: "GR-2026-010",
    requester: "Rizal",
    department: "Information Technology",
    category: "Maintenance",
    title: "Server Maintenance Supplies",
    description:
      "Replacement supplies required for server room maintenance.",
    amount: 1100,
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
      generalRequisitions.value.map(item => item.department),
    ),
  ]
})

const categories = computed(() => {
  return [
    ...new Set(
      generalRequisitions.value.map(item => item.category),
    ),
  ]
})

const priorities: GeneralRequisitionPriority[] = [
  "Low",
  "Medium",
  "High",
  "Urgent",
]

/* */

function addRequisition(
  payload: Omit<
    GeneralRequisition,
    "id" | "requestNo" | "status"
  >,
) {
  const year = new Date().getFullYear()

  const numbers = generalRequisitions.value
    .map(item => {
      const match = item.requestNo.match(/(\d+)$/)
      return match ? Number(match[1]) : 0
    })
    .filter(number => !Number.isNaN(number))

  const nextNumber =
    numbers.length > 0 ? Math.max(...numbers) + 1 : 1

  const requestNo = `GR-${year}-${String(nextNumber).padStart(
    3,
    "0",
  )}`

  const newRequisition: GeneralRequisition = {
    id: `gr-${Date.now()}`,
    requestNo,
    ...payload,
    status: "Pending Approval",
  }

  generalRequisitions.value.unshift(newRequisition)

  return newRequisition
}

/* */

function updateRequisitionStatus(
  id: string,
  status: GeneralRequisitionStatus,
  options?: {
    rejectionReason?: string
    completedDate?: string
  },
) {
  const item = generalRequisitions.value.find(
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
      options?.rejectionReason || "No reason provided."
  }

  if (status === "Completed") {
    item.completedDate =
      options?.completedDate ||
      new Date().toISOString().slice(0, 10)
  }
}

/* */

function getRequisition(id: string) {
  return generalRequisitions.value.find(
    item => item.id === id,
  )
}

/* */

export function useGeneralRequisitions() {
  return {
    generalRequisitions,
    departments,
    categories,
    priorities,
    addRequisition,
    updateRequisitionStatus,
    getRequisition,
  }
}