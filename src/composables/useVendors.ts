import { computed, ref } from "vue"

/* */

export type VendorStatus =
  | "Active"
  | "Inactive"
  | "Pending Review"
  | "Blacklisted"

export type VendorType =
  | "Local"
  | "International"

export interface Vendor {
  id: string
  vendorCode: string
  vendorName: string
  vendorType: VendorType
  category: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  registrationNo: string
  taxNo: string
  paymentTerms: string
  currency: string
  status: VendorStatus
  notes: string
  createdDate: string
}

export interface VendorFilters {
  category: string | null
  vendorType: VendorType | null
  status: VendorStatus | null
}

/* */

const categoryOptions = [
  "IT Equipment",
  "Office Supplies",
  "Furniture",
  "Network Services",
  "Software",
  "Professional Services",
  "Marketing Materials",
  "Production Supplies",
  "Quality Equipment",
  "Maintenance",
  "Medical Supplies",
  "Others",
]

const vendorTypeOptions: VendorType[] = [
  "Local",
  "International",
]

const statusOptions: VendorStatus[] = [
  "Active",
  "Inactive",
  "Pending Review",
  "Blacklisted",
]

const paymentTermsOptions = [
  "Cash Before Delivery",
  "30 Days",
  "45 Days",
  "60 Days",
  "90 Days",
]

const currencyOptions = [
  "MYR — Malaysian Ringgit",
  "USD — US Dollar",
  "SGD — Singapore Dollar",
  "EUR — Euro",
  "GBP — British Pound",
]

/* */

const vendors = ref<Vendor[]>([
  {
    id: "VEN-001",
    vendorCode: "VEN-2026-0001",
    vendorName: "Tech Solutions Sdn Bhd",
    vendorType: "Local",
    category: "IT Equipment",
    contactPerson: "Ahmad Faiz",
    email: "sales@techsolutions.com.my",
    phone: "03-8899 2211",
    address: "12, Jalan Teknologi 3",
    city: "Shah Alam",
    state: "Selangor",
    country: "Malaysia",
    registrationNo: "201801012345",
    taxNo: "C1234567890",
    paymentTerms: "30 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Active",
    notes: "Main supplier for IT hardware and computer equipment.",
    createdDate: "2026-01-10",
  },

  {
    id: "VEN-002",
    vendorCode: "VEN-2026-0002",
    vendorName: "ABC Office Supplies Sdn Bhd",
    vendorType: "Local",
    category: "Office Supplies",
    contactPerson: "Nur Aisyah",
    email: "sales@abcoffice.com.my",
    phone: "06-334 7788",
    address: "25, Jalan Perindustrian 2",
    city: "Melaka",
    state: "Melaka",
    country: "Malaysia",
    registrationNo: "201501023456",
    taxNo: "C2345678901",
    paymentTerms: "30 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Active",
    notes: "Office stationery and general office supplies.",
    createdDate: "2026-01-18",
  },

  {
    id: "VEN-003",
    vendorCode: "VEN-2026-0003",
    vendorName: "Secure Network Systems",
    vendorType: "Local",
    category: "Network Services",
    contactPerson: "Daniel Tan",
    email: "support@securenetwork.com",
    phone: "03-7788 4422",
    address: "18, Jalan Digital 5",
    city: "Petaling Jaya",
    state: "Selangor",
    country: "Malaysia",
    registrationNo: "201703034567",
    taxNo: "C3456789012",
    paymentTerms: "60 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Active",
    notes: "Network infrastructure, security and maintenance services.",
    createdDate: "2026-02-02",
  },

  {
    id: "VEN-004",
    vendorCode: "VEN-2026-0004",
    vendorName: "Office Furniture Enterprise",
    vendorType: "Local",
    category: "Furniture",
    contactPerson: "Jason Lim",
    email: "sales@officefurniture.com",
    phone: "06-282 5544",
    address: "8, Jalan Perabot Utama",
    city: "Ayer Keroh",
    state: "Melaka",
    country: "Malaysia",
    registrationNo: "201203045678",
    taxNo: "C4567890123",
    paymentTerms: "45 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Active",
    notes: "Office desks, chairs, cabinets and related furniture.",
    createdDate: "2026-02-15",
  },

  {
    id: "VEN-005",
    vendorCode: "VEN-2026-0005",
    vendorName: "Kotra Medical Supplies",
    vendorType: "Local",
    category: "Medical Supplies",
    contactPerson: "Hafiz Rahman",
    email: "sales@kotramedical.com",
    phone: "06-317 8899",
    address: "42, Jalan Industri Pharma",
    city: "Batu Berendam",
    state: "Melaka",
    country: "Malaysia",
    registrationNo: "201405056789",
    taxNo: "C5678901234",
    paymentTerms: "60 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Active",
    notes: "Medical and pharmaceutical related supplies.",
    createdDate: "2026-03-01",
  },

  {
    id: "VEN-006",
    vendorCode: "VEN-2026-0006",
    vendorName: "Mega Stationery Sdn Bhd",
    vendorType: "Local",
    category: "Office Supplies",
    contactPerson: "Aina Rahman",
    email: "sales@megastationery.com.my",
    phone: "03-5566 7711",
    address: "31, Jalan Industri 8",
    city: "Klang",
    state: "Selangor",
    country: "Malaysia",
    registrationNo: "201006067890",
    taxNo: "C6789012345",
    paymentTerms: "30 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Inactive",
    notes: "Vendor currently not used for active procurement.",
    createdDate: "2026-03-12",
  },

  {
    id: "VEN-007",
    vendorCode: "VEN-2026-0007",
    vendorName: "Global Software Technologies",
    vendorType: "International",
    category: "Software",
    contactPerson: "Michael Wong",
    email: "enterprise@globalsoftware.com",
    phone: "+65 6123 8899",
    address: "100 Technology Drive",
    city: "Singapore",
    state: "Singapore",
    country: "Singapore",
    registrationNo: "SG201234567",
    taxNo: "GST-SG1234567",
    paymentTerms: "90 Days",
    currency: "SGD — Singapore Dollar",
    status: "Active",
    notes: "Enterprise software licensing and support.",
    createdDate: "2026-04-05",
  },

  {
    id: "VEN-008",
    vendorCode: "VEN-2026-0008",
    vendorName: "Creative Marketing Solutions",
    vendorType: "Local",
    category: "Marketing Materials",
    contactPerson: "Michelle Wong",
    email: "hello@creativemarketing.com.my",
    phone: "03-8891 2233",
    address: "17, Jalan Kreatif 2",
    city: "Cyberjaya",
    state: "Selangor",
    country: "Malaysia",
    registrationNo: "201709078901",
    taxNo: "C7890123456",
    paymentTerms: "30 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Pending Review",
    notes: "New vendor awaiting procurement review.",
    createdDate: "2026-08-20",
  },

  {
    id: "VEN-009",
    vendorCode: "VEN-2026-0009",
    vendorName: "Industrial Maintenance Services",
    vendorType: "Local",
    category: "Maintenance",
    contactPerson: "Syafiq Ismail",
    email: "service@industrialmaintenance.com",
    phone: "06-556 4422",
    address: "9, Jalan Industri Utama",
    city: "Jasin",
    state: "Melaka",
    country: "Malaysia",
    registrationNo: "201109089012",
    taxNo: "C8901234567",
    paymentTerms: "45 Days",
    currency: "MYR — Malaysian Ringgit",
    status: "Active",
    notes: "Equipment maintenance and technical services.",
    createdDate: "2026-05-18",
  },

  {
    id: "VEN-010",
    vendorCode: "VEN-2026-0010",
    vendorName: "Quality Testing Equipment",
    vendorType: "International",
    category: "Quality Equipment",
    contactPerson: "Robert Lee",
    email: "sales@qualitytesting.com",
    phone: "+65 6777 3322",
    address: "55 Science Park Road",
    city: "Singapore",
    state: "Singapore",
    country: "Singapore",
    registrationNo: "SG201998877",
    taxNo: "GST-SG9988776",
    paymentTerms: "60 Days",
    currency: "USD — US Dollar",
    status: "Inactive",
    notes: "Vendor account retained for historical procurement records.",
    createdDate: "2026-06-10",
  },
])

/* */

const totalVendors = computed(() => {
  return vendors.value.length
})

const activeVendors = computed(() => {
  return vendors.value.filter(
    vendor => vendor.status === "Active",
  ).length
})

const inactiveVendors = computed(() => {
  return vendors.value.filter(
    vendor => vendor.status === "Inactive",
  ).length
})

const pendingReview = computed(() => {
  return vendors.value.filter(
    vendor => vendor.status === "Pending Review",
  ).length
})

const categoryCards = computed(() => {
  return categoryOptions.map(category => {
    const categoryVendors = vendors.value.filter(
      vendor => vendor.category === category,
    )

    const active = categoryVendors.filter(
      vendor => vendor.status === "Active",
    ).length

    return {
      name: category,
      vendorCount: categoryVendors.length,
      active,
    }
  })
})

/* */

function getVendorById(id: string) {
  return vendors.value.find(
    vendor => vendor.id === id,
  )
}

function getVendorByCode(vendorCode: string) {
  return vendors.value.find(
    vendor => vendor.vendorCode === vendorCode,
  )
}

function getVendorsByCategory(category: string) {
  return vendors.value.filter(
    vendor => vendor.category === category,
  )
}

function getVendorsByStatus(status: VendorStatus) {
  return vendors.value.filter(
    vendor => vendor.status === status,
  )
}

/* */

function createVendor(
  vendor: Omit<Vendor, "id" | "vendorCode">,
) {
  const nextNumber = vendors.value.length + 1

  const newVendor: Vendor = {
    id: `VEN-${String(nextNumber).padStart(3, "0")}`,
    vendorCode:
      `VEN-${new Date().getFullYear()}-${String(
        nextNumber,
      ).padStart(4, "0")}`,
    ...vendor,
  }

  vendors.value.push(newVendor)

  return newVendor
}

function updateVendor(
  id: string,
  updates: Partial<Vendor>,
) {
  const vendor = getVendorById(id)

  if (!vendor) {
    return null
  }

  Object.assign(vendor, updates)

  return vendor
}

function deleteVendor(id: string) {
  const index = vendors.value.findIndex(
    vendor => vendor.id === id,
  )

  if (index === -1) {
    return false
  }

  vendors.value.splice(index, 1)

  return true
}

function setVendorStatus(
  id: string,
  status: VendorStatus,
) {
  return updateVendor(id, { status })
}

/* */

export function useVendors() {
  return {
    vendors,

    categoryOptions,
    vendorTypeOptions,
    statusOptions,
    paymentTermsOptions,
    currencyOptions,

    totalVendors,
    activeVendors,
    inactiveVendors,
    pendingReview,
    categoryCards,

    getVendorById,
    getVendorByCode,
    getVendorsByCategory,
    getVendorsByStatus,

    createVendor,
    updateVendor,
    deleteVendor,
    setVendorStatus,
  }
}