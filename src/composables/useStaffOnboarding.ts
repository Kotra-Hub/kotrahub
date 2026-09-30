import { computed, ref } from "vue"

type OnboardingStatus = "Pending" | "In Progress" | "Completed"

export function useStaffOnboarding() {

  const employees = ref<{
    id: string
    name: string
    email: string
    department: string
    position: string
    joiningDate: string
    status: OnboardingStatus
  }[]>([
    {
      id: "EMP001",
      name: "Ahmad Rahman",
      email: "ahmad.rahman@kotrapharma.com",
      department: "IT",
      position: "Engineer",
      joiningDate: "01 Oct 2026",
      status: "In Progress",
    },

    {
      id: "EMP002",
      name: "Sarah Lee",
      email: "sarah.lee@kotrapharma.com",
      department: "HR",
      position: "Executive",
      joiningDate: "05 Oct 2026",
      status: "Pending",
    },

    {
      id: "EMP003",
      name: "John Tan",
      email: "john.tan@kotrapharma.com",
      department: "Plant",
      position: "Technician",
      joiningDate: "10 Oct 2026",
      status: "Completed",
    },

    {
      id: "EMP004",
      name: "Nur Aisyah",
      email: "nur.aisyah@kotrapharma.com",
      department: "Finance",
      position: "Account Executive",
      joiningDate: "12 Oct 2026",
      status: "Pending",
    },

    {
      id: "EMP005",
      name: "Daniel Wong",
      email: "daniel.wong@kotrapharma.com",
      department: "Sales",
      position: "Sales Executive",
      joiningDate: "15 Oct 2026",
      status: "In Progress",
    },

    {
      id: "EMP006",
      name: "Siti Nurhaliza",
      email: "siti.nurhaliza@kotrapharma.com",
      department: "Quality",
      position: "Quality Executive",
      joiningDate: "18 Oct 2026",
      status: "Pending",
    },

    {
      id: "EMP007",
      name: "Michael Lim",
      email: "michael.lim@kotrapharma.com",
      department: "IT",
      position: "Software Developer",
      joiningDate: "20 Oct 2026",
      status: "Completed",
    },

    {
      id: "EMP008",
      name: "Farah Nadia",
      email: "farah.nadia@kotrapharma.com",
      department: "Marketing",
      position: "Marketing Executive",
      joiningDate: "22 Oct 2026",
      status: "In Progress",
    },

    {
      id: "EMP009",
      name: "William Tan",
      email: "william.tan@kotrapharma.com",
      department: "Plant",
      position: "Production Executive",
      joiningDate: "25 Oct 2026",
      status: "Pending",
    },

    {
      id: "EMP010",
      name: "Nur Izzati",
      email: "nur.izzati@kotrapharma.com",
      department: "Procurement",
      position: "Procurement Executive",
      joiningDate: "27 Oct 2026",
      status: "Completed",
    },

    {
      id: "EMP011",
      name: "Kevin Chong",
      email: "kevin.chong@kotrapharma.com",
      department: "Warehouse",
      position: "Warehouse Executive",
      joiningDate: "29 Oct 2026",
      status: "In Progress",
    },

    {
      id: "EMP012",
      name: "Aina Sofea",
      email: "aina.sofea@kotrapharma.com",
      department: "Regulatory",
      position: "Regulatory Executive",
      joiningDate: "01 Nov 2026",
      status: "Pending",
    },

    {
      id: "EMP013",
      name: "Jason Lee",
      email: "jason.lee@kotrapharma.com",
      department: "IT",
      position: "System Administrator",
      joiningDate: "03 Nov 2026",
      status: "In Progress",
    },

    {
      id: "EMP014",
      name: "Hannah Wong",
      email: "hannah.wong@kotrapharma.com",
      department: "HR",
      position: "HR Executive",
      joiningDate: "05 Nov 2026",
      status: "Completed",
    },

    {
      id: "EMP015",
      name: "Mohamad Faiz",
      email: "mohamad.faiz@kotrapharma.com",
      department: "Engineering",
      position: "Maintenance Engineer",
      joiningDate: "08 Nov 2026",
      status: "Pending",
    },
  ])


  const cancelled = ref([
    {
      name: "David Lee",
      department: "IT",
      reason: "Offer Rejected",
      date: "20 Sep 2026",
    },

    {
      name: "Lisa Tan",
      department: "HR",
      reason: "Candidate Withdrawn",
      date: "22 Sep 2026",
    },

    {
      name: "Azman Hakim",
      department: "Plant",
      reason: "Offer Rejected",
      date: "25 Sep 2026",
    },
  ])


  const headers = [
    {
      title: "Employee ID",
      key: "id",
    },

    {
      title: "Name",
      key: "name",
    },

    {
      title: "Email",
      key: "email",
    },

    {
      title: "Department",
      key: "department",
    },

    {
      title: "Position",
      key: "position",
    },

    {
      title: "Joining Date",
      key: "joiningDate",
    },

    {
      title: "Status",
      key: "status",
    },

    {
      title: "Actions",
      key: "actions",
      sortable: false,
    },
  ]


  return {
    employees,
    cancelled,
    headers,
    filteredItems: computed(
      () => employees.value
    ),
  }

}