import { computed, ref } from "vue"

export type DepartmentStatus = "Active" | "Inactive"

export interface Department {
  id: string
  code: string
  name: string
  head: string
  location: string
  description: string
  employeeCount: number
  createdDate: string
  status: DepartmentStatus
}

const departments = ref<Department[]>([
  {
    id: "dept-001",
    code: "IT",
    name: "Information Technology",
    head: "IT Manager",
    location: "Melaka",
    description:
      "Responsible for IT infrastructure, applications, systems, network and technology support.",
    employeeCount: 18,
    createdDate: "2022-01-10",
    status: "Active",
  },

  {
    id: "dept-002",
    code: "HR",
    name: "Human Resources",
    head: "HR Manager",
    location: "Melaka",
    description:
      "Responsible for employee management, recruitment, training and human resource administration.",
    employeeCount: 12,
    createdDate: "2022-01-10",
    status: "Active",
  },

  {
    id: "dept-003",
    code: "FIN",
    name: "Finance",
    head: "Finance Manager",
    location: "Melaka",
    description:
      "Responsible for financial management, accounting, reporting and financial operations.",
    employeeCount: 15,
    createdDate: "2022-01-10",
    status: "Active",
  },

  {
    id: "dept-004",
    code: "QA",
    name: "Quality Assurance",
    head: "QA Manager",
    location: "Melaka",
    description:
      "Responsible for quality control, quality assurance and compliance activities.",
    employeeCount: 24,
    createdDate: "2022-02-15",
    status: "Active",
  },

  {
    id: "dept-005",
    code: "PRD",
    name: "Production",
    head: "Production Manager",
    location: "Melaka",
    description:
      "Responsible for production planning, manufacturing operations and production activities.",
    employeeCount: 86,
    createdDate: "2022-03-01",
    status: "Active",
  },

  {
    id: "dept-006",
    code: "SCM",
    name: "Supply Chain",
    head: "Supply Chain Manager",
    location: "Melaka",
    description:
      "Responsible for supply planning, logistics, inventory and supply chain operations.",
    employeeCount: 31,
    createdDate: "2022-03-10",
    status: "Active",
  },

  {
    id: "dept-007",
    code: "MKT",
    name: "Marketing",
    head: "Marketing Manager",
    location: "Melaka",
    description:
      "Responsible for marketing campaigns, brand activities and market development.",
    employeeCount: 9,
    createdDate: "2022-04-05",
    status: "Active",
  },

  {
    id: "dept-008",
    code: "ADM",
    name: "Administration",
    head: "Administration Manager",
    location: "Melaka",
    description:
      "Responsible for general administration and office management activities.",
    employeeCount: 11,
    createdDate: "2022-04-15",
    status: "Active",
  },

  {
    id: "dept-009",
    code: "REG",
    name: "Regulatory Affairs",
    head: "Regulatory Manager",
    location: "Melaka",
    description:
      "Responsible for regulatory submissions, documentation and regulatory compliance.",
    employeeCount: 8,
    createdDate: "2022-05-01",
    status: "Active",
  },

  {
    id: "dept-010",
    code: "RND",
    name: "Research & Development",
    head: "R&D Manager",
    location: "Melaka",
    description:
      "Responsible for research, product development and technical development activities.",
    employeeCount: 14,
    createdDate: "2022-06-01",
    status: "Active",
  },

  {
    id: "dept-011",
    code: "CS",
    name: "Customer Service",
    head: "Customer Service Manager",
    location: "Melaka",
    description:
      "Responsible for customer enquiries, support and customer relationship activities.",
    employeeCount: 10,
    createdDate: "2022-07-01",
    status: "Inactive",
  },

  {
    id: "dept-012",
    code: "OLD",
    name: "Legacy Operations",
    head: "Former Operations Manager",
    location: "Melaka",
    description:
      "Legacy department retained for historical records.",
    employeeCount: 0,
    createdDate: "2021-01-01",
    status: "Inactive",
  },
])

/* */

const locations = computed(() => {
  return [
    ...new Set(
      departments.value.map(
        department => department.location,
      ),
    ),
  ]
})

const departmentHeads = computed(() => {
  return [
    ...new Set(
      departments.value.map(
        department => department.head,
      ),
    ),
  ]
})

const statuses: DepartmentStatus[] = [
  "Active",
  "Inactive",
]

/* */

function addDepartment(
  payload: Omit<
    Department,
    "id" | "createdDate" | "status"
  >,
) {
  const newDepartment: Department = {
    id: `dept-${Date.now()}`,
    ...payload,
    createdDate: new Date()
      .toISOString()
      .slice(0, 10),
    status: "Active",
  }

  departments.value.unshift(newDepartment)

  return newDepartment
}

/* */

function updateDepartment(
  id: string,
  payload: Partial<Department>,
) {
  const department = departments.value.find(
    item => item.id === id,
  )

  if (!department) return

  Object.assign(department, payload)
}

/* */

function updateDepartmentStatus(
  id: string,
  status: DepartmentStatus,
) {
  const department = departments.value.find(
    item => item.id === id,
  )

  if (!department) return

  department.status = status
}

/* */

function getDepartment(id: string) {
  return departments.value.find(
    department => department.id === id,
  )
}

/* */

export function useDepartments() {
  return {
    departments,
    locations,
    departmentHeads,
    statuses,
    addDepartment,
    updateDepartment,
    updateDepartmentStatus,
    getDepartment,
  }
}