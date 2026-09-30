import { computed, ref } from "vue"

export type RequestStatus =
  | "Draft"
  | "Pending"
  | "Approved"
  | "Issued"
  | "Rejected"
  | "Cancelled"

export type RequestPriority = "Low" | "Medium" | "High" | "Urgent"

export interface InventoryRequest {
  id: string
  requestNo: string
  requester: string
  department: string
  item: string
  category: string
  quantity: number
  unit: string
  requiredDate: string
  priority: RequestPriority
  status: RequestStatus
  requestDate: string
  remarks: string
}

export interface RequestForm {
  requester: string
  department: string
  item: string
  category: string
  quantity: number | null
  unit: string
  requiredDate: string
  priority: RequestPriority
  status: RequestStatus
  remarks: string
}

const initialRequests: InventoryRequest[] = [
  {
    id: "IR-001",
    requestNo: "IR-2026-0001",
    requester: "Aiman Asri",
    department: "Information Technology",
    item: "Wireless Keyboard",
    category: "IT Accessories",
    quantity: 5,
    unit: "Unit",
    requiredDate: "2026-09-15",
    priority: "Medium",
    status: "Pending",
    requestDate: "2026-09-01",
    remarks: "For new IT workstations.",
  },
  {
    id: "IR-002",
    requestNo: "IR-2026-0002",
    requester: "Nur Amirah",
    department: "Corporate Affairs",
    item: "A4 Paper",
    category: "Stationery",
    quantity: 20,
    unit: "Ream",
    requiredDate: "2026-09-12",
    priority: "Low",
    status: "Approved",
    requestDate: "2026-09-02",
    remarks: "Monthly office usage.",
  },
  {
    id: "IR-003",
    requestNo: "IR-2026-0003",
    requester: "Muhammad Iqbal",
    department: "Human Resources",
    item: "Laptop",
    category: "IT Equipment",
    quantity: 2,
    unit: "Unit",
    requiredDate: "2026-09-20",
    priority: "High",
    status: "Pending",
    requestDate: "2026-09-03",
    remarks: "For new joiners.",
  },
  {
    id: "IR-004",
    requestNo: "IR-2026-0004",
    requester: "Siti Aisyah",
    department: "Finance",
    item: "Printer Toner",
    category: "Printer Supplies",
    quantity: 4,
    unit: "Unit",
    requiredDate: "2026-09-18",
    priority: "Medium",
    status: "Issued",
    requestDate: "2026-09-04",
    remarks: "Replacement toner.",
  },
  {
    id: "IR-005",
    requestNo: "IR-2026-0005",
    requester: "Daniel Tan",
    department: "Production",
    item: "Safety Gloves",
    category: "Safety Equipment",
    quantity: 50,
    unit: "Pair",
    requiredDate: "2026-09-25",
    priority: "High",
    status: "Draft",
    requestDate: "2026-09-05",
    remarks: "For production floor.",
  },
  {
    id: "IR-006",
    requestNo: "IR-2026-0006",
    requester: "Farah Nadia",
    department: "Quality Assurance",
    item: "Laboratory Gloves",
    category: "Laboratory Supplies",
    quantity: 10,
    unit: "Box",
    requiredDate: "2026-09-22",
    priority: "Medium",
    status: "Rejected",
    requestDate: "2026-09-06",
    remarks: "Stock level is currently sufficient.",
  },
  {
    id: "IR-007",
    requestNo: "IR-2026-0007",
    requester: "Amirul Hakim",
    department: "Engineering",
    item: "Hand Tools Set",
    category: "Tools",
    quantity: 3,
    unit: "Set",
    requiredDate: "2026-09-28",
    priority: "High",
    status: "Pending",
    requestDate: "2026-09-07",
    remarks: "Required for maintenance work.",
  },
  {
    id: "IR-008",
    requestNo: "IR-2026-0008",
    requester: "Jessica Lim",
    department: "Sales & Marketing",
    item: "Notebook",
    category: "Stationery",
    quantity: 15,
    unit: "Unit",
    requiredDate: "2026-09-30",
    priority: "Low",
    status: "Cancelled",
    requestDate: "2026-09-08",
    remarks: "Request no longer required.",
  },
]

export function useRequests() {
  const requests = ref<InventoryRequest[]>([...initialRequests])

  const departments = [
    "Information Technology",
    "Corporate Affairs",
    "Human Resources",
    "Finance",
    "Production",
    "Quality Assurance",
    "Engineering",
    "Sales & Marketing",
  ]

  const categories = [
    "IT Equipment",
    "IT Accessories",
    "Stationery",
    "Printer Supplies",
    "Safety Equipment",
    "Laboratory Supplies",
    "Tools",
  ]

  const units = [
    "Unit",
    "Box",
    "Pack",
    "Ream",
    "Pair",
    "Set",
    "Bottle",
    "Roll",
  ]

  const priorities: RequestPriority[] = [
    "Low",
    "Medium",
    "High",
    "Urgent",
  ]

  const statuses: RequestStatus[] = [
    "Draft",
    "Pending",
    "Approved",
    "Issued",
    "Rejected",
    "Cancelled",
  ]

  const totalRequests = computed(() => requests.value.length)

  const pendingRequests = computed(
    () => requests.value.filter((item) => item.status === "Pending").length,
  )

  const approvedRequests = computed(
    () => requests.value.filter((item) => item.status === "Approved").length,
  )

  const issuedRequests = computed(
    () => requests.value.filter((item) => item.status === "Issued").length,
  )

  const rejectedRequests = computed(
    () => requests.value.filter((item) => item.status === "Rejected").length,
  )

  const draftRequests = computed(
    () => requests.value.filter((item) => item.status === "Draft").length,
  )

  const createEmptyForm = (): RequestForm => ({
    requester: "",
    department: "",
    item: "",
    category: "",
    quantity: null,
    unit: "Unit",
    requiredDate: "",
    priority: "Medium",
    status: "Draft",
    remarks: "",
  })

  const generateRequestNo = () => {
    const year = new Date().getFullYear()

    const numbers = requests.value
      .map((request) => {
        const match = request.requestNo.match(/(\d+)$/)

        return match ? Number(match[1]) : 0
      })
      .filter((number) => !Number.isNaN(number))

    const nextNumber =
      numbers.length > 0
        ? Math.max(...numbers) + 1
        : 1

    return `IR-${year}-${String(nextNumber).padStart(4, "0")}`
  }

  const addRequest = (form: RequestForm) => {
    const request: InventoryRequest = {
      id: `IR-${Date.now()}`,
      requestNo: generateRequestNo(),
      requester: form.requester.trim(),
      department: form.department,
      item: form.item.trim(),
      category: form.category,
      quantity: Number(form.quantity ?? 0),
      unit: form.unit,
      requiredDate: form.requiredDate,
      priority: form.priority,
      status: form.status,
      requestDate: new Date().toISOString().slice(0, 10),
      remarks: form.remarks.trim(),
    }

    requests.value.unshift(request)

    return request
  }

  const updateRequest = (
    id: string,
    form: RequestForm,
  ) => {
    const index = requests.value.findIndex(
      (request) => request.id === id,
    )

    if (index === -1) {
      return null
    }

    requests.value[index] = {
      ...requests.value[index],
      requester: form.requester.trim(),
      department: form.department,
      item: form.item.trim(),
      category: form.category,
      quantity: Number(form.quantity ?? 0),
      unit: form.unit,
      requiredDate: form.requiredDate,
      priority: form.priority,
      status: form.status,
      remarks: form.remarks.trim(),
    }

    return requests.value[index]
  }

  const deleteRequest = (id: string) => {
    requests.value = requests.value.filter(
      (request) => request.id !== id,
    )
  }

  return {
    requests,

    departments,
    categories,
    units,
    priorities,
    statuses,

    totalRequests,
    pendingRequests,
    approvedRequests,
    issuedRequests,
    rejectedRequests,
    draftRequests,

    createEmptyForm,
    addRequest,
    updateRequest,
    deleteRequest,
  }
}