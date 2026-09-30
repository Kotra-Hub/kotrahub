import { computed, ref } from "vue"

export type POStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Ordered"
  | "Partially Received"
  | "Completed"
  | "Cancelled"

export type ApprovalStatus =
  | "Pending"
  | "Approved"
  | "Rejected"

export type CostSplitType =
  | "Do not split cost"
  | "Split cost by quantity"
  | "Split cost by percentage (%)"

export interface PurchaseOrderItem {
  id: string
  asset: string
  category: string
  subcategory: string
  vendor: string
  description: string
  brand: string
  manufacturer: string
  model: string
  hsCode: string
  currency: string
  quantity: number
  unitPrice: number
  totalAmount: number
  costSplit: CostSplitType
  documents: string[]
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  orderType: string
  supplier: string
  requester: string
  department: string
  poDate: string
  deliveryDate: string
  totalAmount: number
  status: POStatus
  approvalStatus: ApprovalStatus
  items: PurchaseOrderItem[]
  notes: string
}

export interface PurchaseOrderFilters {
  department: string | null
  supplier: string | null
  status: POStatus | null
  approvalStatus: ApprovalStatus | null
}

export interface AssetForm {
  asset: string
  category: string
  subcategory: string
  vendor: string
  description: string
  brand: string
  manufacturer: string
  model: string
  hsCode: string
  currency: string
  quantity: number
  unitPrice: number
  costSplit: CostSplitType
  documents: string[]
}

const orders = ref<PurchaseOrder[]>([
  {
    id: "PO-001",
    poNumber: "PO-2026-0001",
    orderType: "General Purchase",
    supplier: "Tech Solutions Sdn Bhd",
    requester: "Muhammad Aiman",
    department: "Information Technology",
    poDate: "2026-09-02",
    deliveryDate: "2026-09-15",
    totalAmount: 12500,
    status: "Approved",
    approvalStatus: "Approved",
    items: [
      {
        id: "ITEM-001",
        asset: "Desktop Computer",
        category: "IT Equipment",
        subcategory: "Desktop",
        vendor: "Tech Solutions Sdn Bhd",
        description:
          "Business desktop computer for employee onboarding.",
        brand: "Dell",
        manufacturer: "Dell Technologies",
        model: "OptiPlex 7020",
        hsCode: "",
        currency: "MYR",
        quantity: 5,
        unitPrice: 1800,
        totalAmount: 9000,
        costSplit: "Split cost by quantity",
        documents: [],
      },
      {
        id: "ITEM-002",
        asset: "27-inch Monitor",
        category: "IT Equipment",
        subcategory: "Monitor",
        vendor: "Tech Solutions Sdn Bhd",
        description:
          "27-inch monitor for new employee workstation.",
        brand: "Dell",
        manufacturer: "Dell Technologies",
        model: "P2725H",
        hsCode: "",
        currency: "MYR",
        quantity: 5,
        unitPrice: 700,
        totalAmount: 3500,
        costSplit: "Split cost by quantity",
        documents: [],
      },
    ],
    notes:
      "IT equipment purchase for new employee onboarding.",
  },

  {
    id: "PO-002",
    poNumber: "PO-2026-0002",
    orderType: "Office Supplies",
    supplier: "ABC Office Supplies Sdn Bhd",
    requester: "Farah Nadia",
    department: "Human Resource",
    poDate: "2026-09-04",
    deliveryDate: "2026-09-12",
    totalAmount: 4250,
    status: "Pending Approval",
    approvalStatus: "Pending",
    items: [
      {
        id: "ITEM-003",
        asset: "Office Files",
        category: "Office Supplies",
        subcategory: "Files",
        vendor: "ABC Office Supplies Sdn Bhd",
        description: "Office files for HR department.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 100,
        unitPrice: 15,
        totalAmount: 1500,
        costSplit: "Split cost by quantity",
        documents: [],
      },
      {
        id: "ITEM-004",
        asset: "Printer Paper",
        category: "Office Supplies",
        subcategory: "Paper",
        vendor: "ABC Office Supplies Sdn Bhd",
        description: "A4 printer paper.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 50,
        unitPrice: 55,
        totalAmount: 2750,
        costSplit: "Split cost by quantity",
        documents: [],
      },
    ],
    notes:
      "Monthly office supplies for HR department.",
  },

  {
    id: "PO-003",
    poNumber: "PO-2026-0003",
    orderType: "IT Equipment",
    supplier: "Secure Network Systems",
    requester: "Daniel Tan",
    department: "Information Technology",
    poDate: "2026-08-25",
    deliveryDate: "2026-09-10",
    totalAmount: 18900,
    status: "Ordered",
    approvalStatus: "Approved",
    items: [
      {
        id: "ITEM-005",
        asset: "Network Switch",
        category: "Network Equipment",
        subcategory: "Network Switch",
        vendor: "Secure Network Systems",
        description:
          "Managed network switch for infrastructure upgrade.",
        brand: "Cisco",
        manufacturer: "Cisco Systems",
        model: "CBS350",
        hsCode: "",
        currency: "MYR",
        quantity: 3,
        unitPrice: 3500,
        totalAmount: 10500,
        costSplit: "Split cost by quantity",
        documents: [],
      },
      {
        id: "ITEM-006",
        asset: "Network Access Point",
        category: "Network Equipment",
        subcategory: "Access Point",
        vendor: "Secure Network Systems",
        description:
          "Wireless access point for office network.",
        brand: "Cisco",
        manufacturer: "Cisco Systems",
        model: "CBW150AX",
        hsCode: "",
        currency: "MYR",
        quantity: 6,
        unitPrice: 1300,
        totalAmount: 7800,
        costSplit: "Split cost by quantity",
        documents: [],
      },
    ],
    notes: "Network infrastructure upgrade.",
  },

  {
    id: "PO-004",
    poNumber: "PO-2026-0004",
    orderType: "Furniture",
    supplier: "Office Furniture Enterprise",
    requester: "Jason Lim",
    department: "Finance",
    poDate: "2026-08-20",
    deliveryDate: "2026-09-05",
    totalAmount: 8750,
    status: "Completed",
    approvalStatus: "Approved",
    items: [
      {
        id: "ITEM-007",
        asset: "Office Desk",
        category: "Furniture",
        subcategory: "Desk",
        vendor: "Office Furniture Enterprise",
        description: "Office desk replacement.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 5,
        unitPrice: 950,
        totalAmount: 4750,
        costSplit: "Split cost by quantity",
        documents: [],
      },
      {
        id: "ITEM-008",
        asset: "Office Chair",
        category: "Furniture",
        subcategory: "Chair",
        vendor: "Office Furniture Enterprise",
        description: "Office chair replacement.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 5,
        unitPrice: 800,
        totalAmount: 4000,
        costSplit: "Split cost by quantity",
        documents: [],
      },
    ],
    notes: "Replacement furniture for Finance department.",
  },

  {
    id: "PO-005",
    poNumber: "PO-2026-0005",
    orderType: "IT Equipment",
    supplier: "Kotra Medical Supplies",
    requester: "Muhammad Aiman",
    department: "Information Technology",
    poDate: "2026-09-08",
    deliveryDate: "2026-09-22",
    totalAmount: 6300,
    status: "Pending Approval",
    approvalStatus: "Pending",
    items: [
      {
        id: "ITEM-009",
        asset: "Laptop Computer",
        category: "IT Equipment",
        subcategory: "Laptop",
        vendor: "Kotra Medical Supplies",
        description:
          "Laptop replacement and new user setup.",
        brand: "Dell",
        manufacturer: "Dell Technologies",
        model: "Latitude 5450",
        hsCode: "",
        currency: "MYR",
        quantity: 2,
        unitPrice: 3150,
        totalAmount: 6300,
        costSplit: "Split cost by quantity",
        documents: [],
      },
    ],
    notes: "Laptop replacement and new user setup.",
  },

  {
    id: "PO-006",
    poNumber: "PO-2026-0006",
    orderType: "Office Supplies",
    supplier: "Mega Stationery Sdn Bhd",
    requester: "Aina Rahman",
    department: "Procurement",
    poDate: "2026-08-15",
    deliveryDate: "2026-08-25",
    totalAmount: 2800,
    status: "Completed",
    approvalStatus: "Approved",
    items: [
      {
        id: "ITEM-010",
        asset: "Stationery Supplies",
        category: "Office Supplies",
        subcategory: "Stationery",
        vendor: "Mega Stationery Sdn Bhd",
        description: "General stationery supplies.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 1,
        unitPrice: 2800,
        totalAmount: 2800,
        costSplit: "Do not split cost",
        documents: [],
      },
    ],
    notes: "General stationery supplies.",
  },

  {
    id: "PO-007",
    poNumber: "PO-2026-0007",
    orderType: "Network Services",
    supplier: "Secure Network Systems",
    requester: "Muhammad Aiman",
    department: "Information Technology",
    poDate: "2026-09-10",
    deliveryDate: "2026-09-30",
    totalAmount: 15200,
    status: "Draft",
    approvalStatus: "Pending",
    items: [
      {
        id: "ITEM-011",
        asset: "Network Security Service",
        category: "Network Services",
        subcategory: "Security Service",
        vendor: "Secure Network Systems",
        description:
          "Annual network security service renewal.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 1,
        unitPrice: 15200,
        totalAmount: 15200,
        costSplit: "Do not split cost",
        documents: [],
      },
    ],
    notes: "Annual network security service renewal.",
  },

  {
    id: "PO-008",
    poNumber: "PO-2026-0008",
    orderType: "Marketing Materials",
    supplier: "ABC Office Supplies Sdn Bhd",
    requester: "Michelle Wong",
    department: "Sales & Marketing",
    poDate: "2026-08-28",
    deliveryDate: "2026-09-08",
    totalAmount: 5400,
    status: "Partially Received",
    approvalStatus: "Approved",
    items: [
      {
        id: "ITEM-012",
        asset: "Promotional Materials",
        category: "Marketing",
        subcategory: "Promotional Materials",
        vendor: "ABC Office Supplies Sdn Bhd",
        description: "Marketing materials for company campaign.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 1,
        unitPrice: 5400,
        totalAmount: 5400,
        costSplit: "Do not split cost",
        documents: [],
      },
    ],
    notes: "Marketing materials for company campaign.",
  },

  {
    id: "PO-009",
    poNumber: "PO-2026-0009",
    orderType: "Production Supplies",
    supplier: "Kotra Medical Supplies",
    requester: "Hafiz Rahman",
    department: "Production",
    poDate: "2026-09-01",
    deliveryDate: "2026-09-18",
    totalAmount: 22100,
    status: "Approved",
    approvalStatus: "Approved",
    items: [
      {
        id: "ITEM-013",
        asset: "Production Materials",
        category: "Production Supplies",
        subcategory: "Materials",
        vendor: "Kotra Medical Supplies",
        description: "Production material replenishment.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 1,
        unitPrice: 22100,
        totalAmount: 22100,
        costSplit: "Do not split cost",
        documents: [],
      },
    ],
    notes: "Production material replenishment.",
  },

  {
    id: "PO-010",
    poNumber: "PO-2026-0010",
    orderType: "Quality Equipment",
    supplier: "Tech Solutions Sdn Bhd",
    requester: "Syafiq Ismail",
    department: "Quality Assurance",
    poDate: "2026-08-30",
    deliveryDate: "2026-09-20",
    totalAmount: 9800,
    status: "Cancelled",
    approvalStatus: "Rejected",
    items: [
      {
        id: "ITEM-014",
        asset: "Quality Testing Equipment",
        category: "Quality Equipment",
        subcategory: "Testing Equipment",
        vendor: "Tech Solutions Sdn Bhd",
        description: "Quality testing equipment.",
        brand: "",
        manufacturer: "",
        model: "",
        hsCode: "",
        currency: "MYR",
        quantity: 1,
        unitPrice: 9800,
        totalAmount: 9800,
        costSplit: "Do not split cost",
        documents: [],
      },
    ],
    notes: "Order cancelled following budget review.",
  },
])

const currentUser = ref("Muhammad Aiman")

const departmentOptions = [
  "Information Technology",
  "Human Resource",
  "Finance",
  "Procurement",
  "Sales & Marketing",
  "Quality Assurance",
  "Production",
]

const supplierOptions = [
  "ABC Office Supplies Sdn Bhd",
  "Tech Solutions Sdn Bhd",
  "Kotra Medical Supplies",
  "Mega Stationery Sdn Bhd",
  "Secure Network Systems",
  "Office Furniture Enterprise",
]

const categoryOptions = [
  "IT Equipment",
  "Network Equipment",
  "Network Services",
  "Office Supplies",
  "Furniture",
  "Marketing",
  "Production Supplies",
  "Quality Equipment",
  "Services",
  "Other",
]

const subcategoryOptions = [
  "Desktop",
  "Laptop",
  "Monitor",
  "Printer",
  "Network Switch",
  "Access Point",
  "Security Service",
  "Files",
  "Paper",
  "Stationery",
  "Desk",
  "Chair",
  "Promotional Materials",
  "Materials",
  "Testing Equipment",
  "Other",
]

const statusOptions: POStatus[] = [
  "Draft",
  "Pending Approval",
  "Approved",
  "Ordered",
  "Partially Received",
  "Completed",
  "Cancelled",
]

const approvalStatusOptions: ApprovalStatus[] = [
  "Pending",
  "Approved",
  "Rejected",
]

const costSplitOptions: CostSplitType[] = [
  "Do not split cost",
  "Split cost by quantity",
  "Split cost by percentage (%)",
]

const termsAndConditions = [
  {
    id: "01",
    title: "Purchase Order Acceptance",
    description:
      "The supplier is required to acknowledge and accept the purchase order before processing the requested goods or services.",
  },
  {
    id: "02",
    title: "Pricing and Payment",
    description:
      "Prices stated in the purchase order shall remain valid according to the agreed quotation. Payment will be processed according to the approved company payment terms.",
  },
  {
    id: "03",
    title: "Delivery Requirements",
    description:
      "Goods or services must be delivered according to the delivery date, location and requirements stated in the purchase order.",
  },
  {
    id: "04",
    title: "Quality Requirements",
    description:
      "All supplied goods and services must meet the specifications, quality standards and requirements stated in the purchase order.",
  },
  {
    id: "05",
    title: "Documentation",
    description:
      "The supplier shall provide the required delivery order, invoice and other supporting documents for verification and payment processing.",
  },
  {
    id: "06",
    title: "Changes to Purchase Order",
    description:
      "Any changes to quantity, pricing, delivery date or specifications must receive prior approval before implementation.",
  },
  {
    id: "07",
    title: "Cancellation",
    description:
      "The company may cancel a purchase order subject to the applicable procurement terms and conditions.",
  },
  {
    id: "08",
    title: "Compliance",
    description:
      "Suppliers are required to comply with applicable company policies, procurement requirements and relevant laws and regulations.",
  },
]

export function createEmptyAsset(): AssetForm {
  return {
    asset: "",
    category: "",
    subcategory: "",
    vendor: "",
    description: "",
    brand: "",
    manufacturer: "",
    model: "",
    hsCode: "",
    currency: "MYR",
    quantity: 1,
    unitPrice: 0,
    costSplit: "Do not split cost",
    documents: [],
  }
}

export function usePurchaseOrders() {
  const totalOrders = computed(() => orders.value.length)

  const pendingApproval = computed(() => {
    return orders.value.filter(
      (order) =>
        order.approvalStatus === "Pending",
    ).length
  })

  const approvedOrders = computed(() => {
    return orders.value.filter(
      (order) =>
        order.approvalStatus === "Approved",
    ).length
  })

  const totalValue = computed(() => {
    return orders.value.reduce(
      (total, order) =>
        total + order.totalAmount,
      0,
    )
  })

  const myOrders = computed(() => {
    return orders.value.filter(
      (order) =>
        order.requester === currentUser.value,
    )
  })

  const departmentCards = computed(() => {
    return departmentOptions.map(
      (department) => {
        const departmentOrders =
          orders.value.filter(
            (order) =>
              order.department === department,
          )

        const requesters = new Set(
          departmentOrders.map(
            (order) => order.requester,
          ),
        )

        const totalValue =
          departmentOrders.reduce(
            (sum, order) =>
              sum + order.totalAmount,
            0,
          )

        const pending =
          departmentOrders.filter(
            (order) =>
              order.approvalStatus === "Pending",
          ).length

        return {
          name: department,
          orderCount: departmentOrders.length,
          requesterCount: requesters.size,
          totalValue,
          pending,
        }
      },
    )
  })

  function getOrderById(id: string) {
    return orders.value.find(
      (order) => order.id === id,
    )
  }

  function getOrderByNumber(poNumber: string) {
    return orders.value.find(
      (order) => order.poNumber === poNumber,
    )
  }

  function getOrdersByDepartment(
    department: string,
  ) {
    return orders.value.filter(
      (order) =>
        order.department === department,
    )
  }

  function getOrdersByStatus(status: POStatus) {
    return orders.value.filter(
      (order) =>
        order.status === status,
    )
  }

  function getOrdersBySupplier(supplier: string) {
    return orders.value.filter(
      (order) =>
        order.supplier === supplier,
    )
  }

  function createOrder(
    order: Omit<PurchaseOrder, "id">,
  ) {
    const nextNumber =
      orders.value.length + 1

    const newOrder: PurchaseOrder = {
      id: `PO-${String(nextNumber).padStart(3, "0")}`,
      ...order,
    }

    orders.value.push(newOrder)

    return newOrder
  }

  function updateOrder(
    id: string,
    updates: Partial<PurchaseOrder>,
  ) {
    const order = getOrderById(id)

    if (!order) {
      return null
    }

    Object.assign(order, updates)

    return order
  }

  function deleteOrder(id: string) {
    const index = orders.value.findIndex(
      (order) => order.id === id,
    )

    if (index === -1) {
      return false
    }

    orders.value.splice(index, 1)

    return true
  }

  function createAsset(
    asset: AssetForm,
  ): PurchaseOrderItem {
    return {
      id: `ITEM-${Date.now()}`,
      ...asset,
      totalAmount:
        asset.quantity * asset.unitPrice,
    }
  }

  return {
    orders,
    currentUser,

    departmentOptions,
    supplierOptions,
    categoryOptions,
    subcategoryOptions,
    statusOptions,
    approvalStatusOptions,
    costSplitOptions,
    termsAndConditions,

    totalOrders,
    pendingApproval,
    approvedOrders,
    totalValue,
    myOrders,
    departmentCards,

    createEmptyAsset,
    createAsset,

    getOrderById,
    getOrderByNumber,
    getOrdersByDepartment,
    getOrdersByStatus,
    getOrdersBySupplier,

    createOrder,
    updateOrder,
    deleteOrder,
  }
}