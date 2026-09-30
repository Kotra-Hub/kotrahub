import { computed, ref } from "vue"

export type LocationStatus = "Active" | "Inactive"

export interface Location {
  id: string
  code: string
  name: string
  city: string
  state: string
  country: string
  address: string
  description: string
  employeeCount: number
  createdDate: string
  status: LocationStatus
}

const locations = ref<Location[]>([
  {
    id: "LOC001",
    code: "HQ",
    name: "Headquarters",
    city: "Melaka",
    state: "Melaka",
    country: "Malaysia",
    address: "Kotra Pharma (M) Sdn. Bhd., Melaka",
    description: "Main headquarters and corporate office.",
    employeeCount: 185,
    createdDate: "2024-01-15",
    status: "Active",
  },
  {
    id: "LOC002",
    code: "KL",
    name: "Kuala Lumpur Office",
    city: "Kuala Lumpur",
    state: "Kuala Lumpur",
    country: "Malaysia",
    address: "Kuala Lumpur",
    description: "Corporate and business operations office.",
    employeeCount: 48,
    createdDate: "2024-02-20",
    status: "Active",
  },
  {
    id: "LOC003",
    code: "PG",
    name: "Penang Office",
    city: "George Town",
    state: "Penang",
    country: "Malaysia",
    address: "Penang",
    description: "Regional office supporting northern operations.",
    employeeCount: 32,
    createdDate: "2024-03-12",
    status: "Active",
  },
  {
    id: "LOC004",
    code: "JB",
    name: "Johor Office",
    city: "Johor Bahru",
    state: "Johor",
    country: "Malaysia",
    address: "Johor Bahru",
    description: "Regional office supporting southern operations.",
    employeeCount: 25,
    createdDate: "2024-04-08",
    status: "Active",
  },
  {
    id: "LOC005",
    code: "WHM",
    name: "Melaka Warehouse",
    city: "Melaka",
    state: "Melaka",
    country: "Malaysia",
    address: "Melaka",
    description: "Warehouse and logistics operation location.",
    employeeCount: 76,
    createdDate: "2024-05-18",
    status: "Active",
  },
  {
    id: "LOC006",
    code: "KLM",
    name: "Klang Warehouse",
    city: "Klang",
    state: "Selangor",
    country: "Malaysia",
    address: "Klang, Selangor",
    description: "Distribution and warehouse facility.",
    employeeCount: 54,
    createdDate: "2024-06-10",
    status: "Active",
  },
  {
    id: "LOC007",
    code: "OLD01",
    name: "Old Melaka Office",
    city: "Melaka",
    state: "Melaka",
    country: "Malaysia",
    address: "Melaka",
    description: "Previous office location.",
    employeeCount: 0,
    createdDate: "2022-01-10",
    status: "Inactive",
  },
  {
    id: "LOC008",
    code: "OLD02",
    name: "Old KL Office",
    city: "Kuala Lumpur",
    state: "Kuala Lumpur",
    country: "Malaysia",
    address: "Kuala Lumpur",
    description: "Previous Kuala Lumpur office.",
    employeeCount: 0,
    createdDate: "2022-04-22",
    status: "Inactive",
  },
])

export function useLocations() {
  const totalLocations = computed(() => locations.value.length)

  const activeLocations = computed(
    () => locations.value.filter((location) => location.status === "Active"),
  )

  const inactiveLocations = computed(
    () => locations.value.filter((location) => location.status === "Inactive"),
  )

  const totalEmployees = computed(() =>
    locations.value.reduce(
      (total, location) => total + location.employeeCount,
      0,
    ),
  )

  const cities = computed(() =>
    [...new Set(locations.value.map((location) => location.city))].sort(),
  )

  const states = computed(() =>
    [...new Set(locations.value.map((location) => location.state))].sort(),
  )

  const countries = computed(() =>
    [...new Set(locations.value.map((location) => location.country))].sort(),
  )

  const statuses: LocationStatus[] = ["Active", "Inactive"]

  function addLocation(
    data: Omit<Location, "id" | "createdDate" | "status">,
  ) {
    const newLocation: Location = {
      ...data,
      id: `LOC${String(locations.value.length + 1).padStart(3, "0")}`,
      createdDate: new Date().toISOString().split("T")[0],
      status: "Active",
    }

    locations.value.unshift(newLocation)

    return newLocation
  }

  function updateLocation(
    id: string,
    data: Partial<Omit<Location, "id">>,
  ) {
    const index = locations.value.findIndex(
      (location) => location.id === id,
    )

    if (index === -1) return null

    locations.value[index] = {
      ...locations.value[index],
      ...data,
    }

    return locations.value[index]
  }

  function updateLocationStatus(
    id: string,
    status: LocationStatus,
  ) {
    const location = locations.value.find(
      (item) => item.id === id,
    )

    if (!location) return null

    location.status = status

    return location
  }

  function getLocation(id: string) {
    return locations.value.find(
      (location) => location.id === id,
    )
  }

  return {
    locations,
    totalLocations,
    activeLocations,
    inactiveLocations,
    totalEmployees,
    cities,
    states,
    countries,
    statuses,
    addLocation,
    updateLocation,
    updateLocationStatus,
    getLocation,
  }
}