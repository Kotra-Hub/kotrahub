import { computed, ref } from "vue"

/* ============================================================
   TYPES
============================================================ */

export type POStatus =
  | "Draft"
  | "Pending Approval"
  | "Approved"
  | "Ordered"
  | "Partially Received"
  | "Completed"
  | "Cancelled"

export type CostSplitType =
  | "Do not split cost"
  | "Split cost by quantity"
  | "Split cost by percentage (%)"

export interface PurchaseOrderItem {
  id: string
  asset: string
  category: string
  subcategory: string
  supplier: string
  description: string
  brand: string
  manufacturer: string
  model: string
  hsCode: string
  currency: string
  quantity: number
  unitPrice: number
  discount: number
  totalAmount: number
  department: string
  requiredDeliveryDate: string
  costSplit: CostSplitType
  supportingDocuments: string[]
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  orderType: string
  supplier: string
  requester: string
  department: string
  status: POStatus
  totalAmount: number
  poDate: string
  notes: string
  items: PurchaseOrderItem[]
}

export interface TermsCondition {
  id: string
  title: string
  applicableFor: string
  description: string
  lastUpdated: string
  mandatory: boolean
}

export interface AssetForm {
  asset: string
  category: string
  subcategory: string
  supplier: string
  description: string
  brand: string
  manufacturer: string
  model: string
  hsCode: string
  currency: string
  quantity: number
  unitPrice: number
  discount: number
  department: string
  requiredDeliveryDate: string
  costSplit: CostSplitType
  supportingDocuments: File[]
}

/* ============================================================
   OPTIONS
============================================================ */

export const departments = [
  "Information Technology",
  "Human Resource",
  "Finance",
  "Procurement",
  "Sales & Marketing",
  "Quality Assurance",
  "Production",
  "Regulatory Affairs",
  "Corporate Affairs",
]

export const suppliers = [
  "ABC Office Supplies Sdn Bhd",
  "Tech Solutions Sdn Bhd",
  "Kotra Medical Supplies",
  "Mega Stationery Sdn Bhd",
  "Secure Network Systems",
  "Office Furniture Enterprise",
]

export const categories = [
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

export const subcategories = [
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

export const statuses: POStatus[] = [
  "Draft",
  "Pending Approval",
  "Approved",
  "Ordered",
  "Partially Received",
  "Completed",
  "Cancelled",
]

export const currencies = [
  "MYR",
  "USD",
  "EUR",
  "SGD",
]

export const costSplitOptions: CostSplitType[] = [
  "Do not split cost",
  "Split cost by quantity",
  "Split cost by percentage (%)",
]

export const applicableForOptions = [
  "All Suppliers",
  "Local Suppliers",
  "International Suppliers",
  "IT Suppliers",
  "Service Providers",
]

export const currentUser = ref("Muhammad Aiman")

/* ============================================================
   HELPERS
============================================================ */

const today = (): string => {
  return new Date()
    .toISOString()
    .split("T")[0]
}

const generateId = (
  prefix = "ID",
): string => {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}`
}

/* ============================================================
   EMPTY ASSET
============================================================ */

export const createEmptyAsset = (): AssetForm => ({
  asset: "",
  category: "",
  subcategory: "",
  supplier: "",
  description: "",
  brand: "",
  manufacturer: "",
  model: "",
  hsCode: "",
  currency: "MYR",
  quantity: 1,
  unitPrice: 0,
  discount: 0,
  department: "",
  requiredDeliveryDate: "",
  costSplit: "Do not split cost",
  supportingDocuments: [],
})

/* ============================================================
   ITEM CALCULATION
============================================================ */

export const calculateItemTotal = (
  quantity: number,
  unitPrice: number,
  discount: number,
): number => {
  const qty = Number(quantity || 0)
  const price = Number(unitPrice || 0)
  const discountAmount = Number(discount || 0)

  const subtotal = qty * price

  return Math.max(
    0,
    subtotal - discountAmount,
  )
}

/* ============================================================
   CREATE ITEM FROM FORM
============================================================ */

export const createItemFromForm = (
  form: AssetForm,
  id?: string,
): PurchaseOrderItem => {
  const quantity = Math.max(
    1,
    Number(form.quantity || 1),
  )

  const unitPrice = Math.max(
    0,
    Number(form.unitPrice || 0),
  )

  const discount = Math.max(
    0,
    Number(form.discount || 0),
  )

  return {
    id:
      id ??
      generateId("ITEM"),

    asset:
      form.asset,

    category:
      form.category,

    subcategory:
      form.subcategory,

    supplier:
      form.supplier,

    description:
      form.description,

    brand:
      form.brand,

    manufacturer:
      form.manufacturer,

    model:
      form.model,

    hsCode:
      form.hsCode,

    currency:
      form.currency,

    quantity,

    unitPrice,

    discount,

    totalAmount:
      calculateItemTotal(
        quantity,
        unitPrice,
        discount,
      ),

    department:
      form.department,

    requiredDeliveryDate:
      form.requiredDeliveryDate,

    costSplit:
      form.costSplit,

    supportingDocuments:
      form.supportingDocuments.map(
        (file) => file.name,
      ),
  }
}

/* ============================================================
   SAMPLE ITEM
============================================================ */

const sampleItem = (
  id: string,
  data: Partial<PurchaseOrderItem>,
): PurchaseOrderItem => {
  const quantity = Number(
    data.quantity ?? 1,
  )

  const unitPrice = Number(
    data.unitPrice ?? 0,
  )

  const discount = Number(
    data.discount ?? 0,
  )

  return {
    id,

    asset:
      data.asset ?? "",

    category:
      data.category ?? "",

    subcategory:
      data.subcategory ?? "",

    supplier:
      data.supplier ?? "",

    description:
      data.description ?? "",

    brand:
      data.brand ?? "",

    manufacturer:
      data.manufacturer ?? "",

    model:
      data.model ?? "",

    hsCode:
      data.hsCode ?? "",

    currency:
      data.currency ?? "MYR",

    quantity,

    unitPrice,

    discount,

    totalAmount:
      calculateItemTotal(
        quantity,
        unitPrice,
        discount,
      ),

    department:
      data.department ?? "",

    requiredDeliveryDate:
      data.requiredDeliveryDate ?? "",

    costSplit:
      data.costSplit ??
      "Do not split cost",

    supportingDocuments:
      data.supportingDocuments ?? [],
  }
}

/* ============================================================
   PURCHASE ORDERS
============================================================ */

const orders = ref<PurchaseOrder[]>([
  {
    id: "1",
    poNumber: "PO-001",
    orderType: "Purchase Order",
    supplier:
      "Tech Solutions Sdn Bhd",
    requester:
      "Muhammad Aiman",
    department:
      "Information Technology",
    status: "Approved",
    totalAmount: 8500,
    poDate: "2026-09-30",
    notes:
      "IT equipment replacement.",

    items: [
      sampleItem("1-1", {
        asset:
          "Dell Desktop",

        category:
          "IT Equipment",

        subcategory:
          "Desktop",

        supplier:
          "Tech Solutions Sdn Bhd",

        description:
          "Dell OptiPlex Desktop Computer",

        quantity: 2,

        unitPrice: 3500,

        discount: 100,

        department:
          "Information Technology",

        brand: "Dell",

        manufacturer:
          "Dell Technologies",

        model:
          "OptiPlex",
      }),

      sampleItem("1-2", {
        asset:
          "Dell Monitor",

        category:
          "IT Equipment",

        subcategory:
          "Monitor",

        supplier:
          "Tech Solutions Sdn Bhd",

        description:
          "24-inch Full HD Monitor",

        quantity: 2,

        unitPrice: 800,

        discount: 0,

        department:
          "Information Technology",

        brand: "Dell",

        manufacturer:
          "Dell Technologies",

        model:
          "P2422H",
      }),
    ],
  },

  {
    id: "2",
    poNumber: "PO-002",
    orderType: "Office Supplies",
    supplier:
      "ABC Office Supplies Sdn Bhd",
    requester: "Sarah",
    department: "Human Resource",
    status: "Pending Approval",
    totalAmount: 4250,
    poDate: "2026-09-29",
    notes:
      "Monthly office supplies.",

    items: [
      sampleItem("2-1", {
        asset:
          "Office Files",

        category:
          "Office Supplies",

        subcategory:
          "Files",

        supplier:
          "ABC Office Supplies Sdn Bhd",

        description:
          "A4 document files",

        quantity: 100,

        unitPrice: 20,

        discount: 100,

        department:
          "Human Resource",
      }),

      sampleItem("2-2", {
        asset:
          "Printer Paper",

        category:
          "Office Supplies",

        subcategory:
          "Paper",

        supplier:
          "ABC Office Supplies Sdn Bhd",

        description:
          "A4 80gsm printer paper",

        quantity: 25,

        unitPrice: 90,

        discount: 0,

        department:
          "Human Resource",
      }),
    ],
  },

  {
    id: "3",
    poNumber: "PO-003",
    orderType:
      "Network Equipment",
    supplier:
      "Secure Network Systems",
    requester:
      "Muhammad Aiman",
    department:
      "Information Technology",
    status: "Ordered",
    totalAmount: 18900,
    poDate: "2026-09-27",
    notes:
      "Network infrastructure upgrade.",

    items: [
      sampleItem("3-1", {
        asset:
          "Network Switch",

        category:
          "Network Equipment",

        subcategory:
          "Network Switch",

        supplier:
          "Secure Network Systems",

        description:
          "Managed network switch",

        quantity: 3,

        unitPrice: 4500,

        discount: 600,

        department:
          "Information Technology",
      }),

      sampleItem("3-2", {
        asset:
          "Access Point",

        category:
          "Network Equipment",

        subcategory:
          "Access Point",

        supplier:
          "Secure Network Systems",

        description:
          "Enterprise wireless access point",

        quantity: 3,

        unitPrice: 1200,

        discount: 0,

        department:
          "Information Technology",
      }),
    ],
  },

  {
    id: "4",
    poNumber: "PO-004",
    orderType: "Furniture",
    supplier:
      "Office Furniture Enterprise",
    requester:
      "Finance Team",
    department: "Finance",
    status: "Completed",
    totalAmount: 8750,
    poDate: "2026-09-25",
    notes:
      "Office furniture replacement.",

    items: [
      sampleItem("4-1", {
        asset:
          "Office Desk",

        category:
          "Furniture",

        subcategory:
          "Desk",

        supplier:
          "Office Furniture Enterprise",

        description:
          "Modern office desk",

        quantity: 5,

        unitPrice: 1200,

        discount: 250,

        department:
          "Finance",
      }),

      sampleItem("4-2", {
        asset:
          "Office Chair",

        category:
          "Furniture",

        subcategory:
          "Chair",

        supplier:
          "Office Furniture Enterprise",

        description:
          "Ergonomic office chair",

        quantity: 5,

        unitPrice: 700,

        discount: 0,

        department:
          "Finance",
      }),
    ],
  },

  {
    id: "5",
    poNumber: "PO-005",
    orderType:
      "IT Equipment",
    supplier:
      "Kotra Medical Supplies",
    requester:
      "Muhammad Aiman",
    department:
      "Information Technology",
    status:
      "Pending Approval",
    totalAmount: 6300,
    poDate: "2026-09-23",
    notes:
      "Laptop procurement.",

    items: [
      sampleItem("5-1", {
        asset:
          "Business Laptop",

        category:
          "IT Equipment",

        subcategory:
          "Laptop",

        supplier:
          "Kotra Medical Supplies",

        description:
          "Business laptop for employee",

        quantity: 2,

        unitPrice: 3300,

        discount: 300,

        department:
          "Information Technology",
      }),
    ],
  },

  {
    id: "6",
    poNumber: "PO-006",
    orderType: "Stationery",
    supplier:
      "Mega Stationery Sdn Bhd",
    requester:
      "Procurement Team",
    department: "Procurement",
    status: "Completed",
    totalAmount: 2800,
    poDate: "2026-09-20",
    notes:
      "General stationery.",

    items: [
      sampleItem("6-1", {
        asset:
          "Stationery Supplies",

        category:
          "Office Supplies",

        subcategory:
          "Stationery",

        supplier:
          "Mega Stationery Sdn Bhd",

        description:
          "Pens, files and office stationery",

        quantity: 1,

        unitPrice: 2800,

        discount: 0,

        department:
          "Procurement",
      }),
    ],
  },

  {
    id: "7",
    poNumber: "PO-007",
    orderType:
      "Network Services",
    supplier:
      "Secure Network Systems",
    requester:
      "Muhammad Aiman",
    department:
      "Information Technology",
    status: "Draft",
    totalAmount: 15200,
    poDate: "2026-09-18",
    notes:
      "Network security service.",

    items: [
      sampleItem("7-1", {
        asset:
          "Network Security Service",

        category:
          "Network Services",

        subcategory:
          "Security Service",

        supplier:
          "Secure Network Systems",

        description:
          "Network security monitoring service",

        quantity: 1,

        unitPrice: 15200,

        discount: 0,

        department:
          "Information Technology",
      }),
    ],
  },

  {
    id: "8",
    poNumber: "PO-008",
    orderType: "Marketing",
    supplier:
      "ABC Office Supplies Sdn Bhd",
    requester:
      "Marketing Team",
    department:
      "Sales & Marketing",
    status:
      "Partially Received",
    totalAmount: 5400,
    poDate: "2026-09-15",
    notes:
      "Promotional materials.",

    items: [
      sampleItem("8-1", {
        asset:
          "Promotional Materials",

        category:
          "Marketing",

        subcategory:
          "Promotional Materials",

        supplier:
          "ABC Office Supplies Sdn Bhd",

        description:
          "Company promotional materials",

        quantity: 100,

        unitPrice: 55,

        discount: 100,

        department:
          "Sales & Marketing",
      }),
    ],
  },

  {
    id: "9",
    poNumber: "PO-009",
    orderType:
      "Production Supplies",
    supplier:
      "Kotra Medical Supplies",
    requester:
      "Production Team",
    department:
      "Production",
    status: "Approved",
    totalAmount: 22100,
    poDate: "2026-09-12",
    notes:
      "Production materials.",

    items: [
      sampleItem("9-1", {
        asset:
          "Production Materials",

        category:
          "Production Supplies",

        subcategory:
          "Materials",

        supplier:
          "Kotra Medical Supplies",

        description:
          "Production materials",

        quantity: 10,

        unitPrice: 2250,

        discount: 400,

        department:
          "Production",
      }),
    ],
  },

  {
    id: "10",
    poNumber: "PO-010",
    orderType:
      "Quality Equipment",
    supplier:
      "Tech Solutions Sdn Bhd",
    requester:
      "QA Team",
    department:
      "Quality Assurance",
    status: "Cancelled",
    totalAmount: 9800,
    poDate: "2026-09-10",
    notes:
      "Cancelled due to budget review.",

    items: [
      sampleItem("10-1", {
        asset:
          "Quality Testing Equipment",

        category:
          "Quality Equipment",

        subcategory:
          "Testing Equipment",

        supplier:
          "Tech Solutions Sdn Bhd",

        description:
          "Quality testing equipment",

        quantity: 2,

        unitPrice: 5000,

        discount: 200,

        department:
          "Quality Assurance",
      }),
    ],
  },
])

/* ============================================================
   TERMS & CONDITIONS
============================================================ */

const terms = ref<TermsCondition[]>([
  {
    id: "TC-001",
    title:
      "Purchase Order Acceptance",
    applicableFor:
      "All Suppliers",
    description:
      "Supplier shall acknowledge and accept the purchase order before processing.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },

  {
    id: "TC-002",
    title:
      "Pricing and Payment",
    applicableFor:
      "All Suppliers",
    description:
      "All prices shall be clearly stated and payment shall follow agreed terms.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },

  {
    id: "TC-003",
    title:
      "Delivery Requirements",
    applicableFor:
      "All Suppliers",
    description:
      "Supplier shall comply with the required delivery date and location.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },

  {
    id: "TC-004",
    title:
      "Quality Requirements",
    applicableFor:
      "All Suppliers",
    description:
      "All supplied goods and services must meet the agreed quality requirements.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },

  {
    id: "TC-005",
    title:
      "Documentation",
    applicableFor:
      "All Suppliers",
    description:
      "Supplier shall provide invoices, delivery orders and relevant documents.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },

  {
    id: "TC-006",
    title:
      "Changes to Purchase Order",
    applicableFor:
      "All Suppliers",
    description:
      "Changes to an approved purchase order require proper authorization.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },

  {
    id: "TC-007",
    title:
      "Cancellation",
    applicableFor:
      "All Suppliers",
    description:
      "Purchase orders may be cancelled according to the agreed procurement terms.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },

  {
    id: "TC-008",
    title:
      "Compliance",
    applicableFor:
      "All Suppliers",
    description:
      "Supplier must comply with applicable company policies and regulations.",
    lastUpdated:
      "2026-09-01",
    mandatory: true,
  },
])

/* ============================================================
   PO NUMBER
============================================================ */

const getNextPONumber = (): string => {
  let max = 0

  for (const order of orders.value) {
    const match =
      order.poNumber.match(
        /^PO-(\d+)$/i,
      )

    if (match) {
      max = Math.max(
        max,
        Number(match[1]),
      )
    }
  }

  return `PO-${String(
    max + 1,
  ).padStart(3, "0")}`
}

/* ============================================================
   ORDER ID
============================================================ */

const getNextId = (): string => {
  const ids = orders.value
    .map((order) =>
      Number(order.id),
    )
    .filter(
      (id) =>
        !Number.isNaN(id),
    )

  return String(
    Math.max(0, ...ids) + 1,
  )
}

/* ============================================================
   ORDER TOTAL
============================================================ */

const calculateOrderTotal = (
  items: PurchaseOrderItem[],
): number => {
  return items.reduce(
    (sum, item) =>
      sum +
      calculateItemTotal(
        item.quantity,
        item.unitPrice,
        item.discount,
      ),
    0,
  )
}

/* ============================================================
   CREATE ORDER
============================================================ */

const createOrder = (
  payload: {
    orderType: string
    requester: string
    department: string
    notes: string
    items: PurchaseOrderItem[]
    status?: POStatus
  },
): PurchaseOrder => {
  const items =
    payload.items.map(
      (item) => ({
        ...item,

        totalAmount:
          calculateItemTotal(
            item.quantity,
            item.unitPrice,
            item.discount,
          ),
      }),
    )

  const order: PurchaseOrder = {
    id:
      getNextId(),

    poNumber:
      getNextPONumber(),

    orderType:
      payload.orderType ||
      "Purchase Order",

    supplier:
      items[0]?.supplier || "",

    requester:
      payload.requester,

    department:
      payload.department,

    status:
      payload.status ??
      "Draft",

    totalAmount:
      calculateOrderTotal(items),

    poDate:
      today(),

    notes:
      payload.notes || "",

    items,
  }

  orders.value.unshift(
    order,
  )

  return order
}

/* ============================================================
   UPDATE ORDER
============================================================ */

const updateOrder = (
  id: string,
  payload: Partial<PurchaseOrder>,
): PurchaseOrder | null => {
  const index =
    orders.value.findIndex(
      (order) =>
        order.id === id,
    )

  if (index === -1) {
    return null
  }

  const existing =
    orders.value[index]

  const items =
    payload.items
      ? payload.items.map(
          (item) => ({
            ...item,

            totalAmount:
              calculateItemTotal(
                item.quantity,
                item.unitPrice,
                item.discount,
              ),
          }),
        )
      : existing.items

  const updated: PurchaseOrder = {
    ...existing,
    ...payload,

    items,

    supplier:
      payload.supplier ??
      items[0]?.supplier ??
      existing.supplier,

    department:
      payload.department ??
      items[0]?.department ??
      existing.department,

    totalAmount:
      calculateOrderTotal(items),
  }

  orders.value[index] =
    updated

  return updated
}

/* ============================================================
   DELETE ORDER
============================================================ */

const deleteOrder = (
  id: string,
): boolean => {
  const index =
    orders.value.findIndex(
      (order) =>
        order.id === id,
    )

  if (index === -1) {
    return false
  }

  orders.value.splice(
    index,
    1,
  )

  return true
}

/* ============================================================
   CLONE ORDER
============================================================ */

const cloneOrder = (
  id: string,
): PurchaseOrder | null => {
  const source =
    orders.value.find(
      (order) =>
        order.id === id,
    )

  if (!source) {
    return null
  }

  const items =
    source.items.map(
      (item) => ({
        ...item,

        id:
          generateId(
            "CLONE-ITEM",
          ),

        supportingDocuments: [
          ...item.supportingDocuments,
        ],
      }),
    )

  return createOrder({
    orderType:
      source.orderType,

    requester:
      currentUser.value,

    department:
      source.department,

    notes:
      `Cloned from ${source.poNumber}. ${source.notes}`,

    items,

    status:
      "Draft",
  })
}

/* ============================================================
   GET ORDER
============================================================ */

const getOrderById = (
  id: string,
): PurchaseOrder | undefined => {
  return orders.value.find(
    (order) =>
      order.id === id,
  )
}

/* ============================================================
   SUMMARY
============================================================ */

const totalOrders =
  computed(
    () =>
      orders.value.length,
  )

/*
 * IMPORTANT:
 * Vue uses pendingOrders.
 */
const pendingOrders =
  computed(
    () =>
      orders.value.filter(
        (order) =>
          order.status ===
          "Pending Approval",
      ).length,
  )

const approvedOrders =
  computed(
    () =>
      orders.value.filter(
        (order) =>
          order.status ===
          "Approved",
      ).length,
  )

const totalValue =
  computed(
    () =>
      orders.value.reduce(
        (sum, order) =>
          sum +
          order.totalAmount,
        0,
      ),
  )

/* ============================================================
   MY ORDERS
============================================================ */

const myOrders =
  computed(() =>
    orders.value.filter(
      (order) =>
        order.requester ===
        currentUser.value,
    ),
  )

/* ============================================================
   DEPARTMENT CARDS
============================================================ */

const departmentCards =
  computed(() =>
    departments.map(
      (department) => {
        const departmentOrders =
          orders.value.filter(
            (order) =>
              order.department ===
              department,
          )

        return {
          department,

          orderCount:
            departmentOrders.length,

          totalValue:
            departmentOrders.reduce(
              (sum, order) =>
                sum +
                order.totalAmount,
              0,
            ),

          /*
           * IMPORTANT:
           * Vue uses department.pendingOrders
           */
          pendingOrders:
            departmentOrders.filter(
              (order) =>
                order.status ===
                "Pending Approval",
            ).length,
        }
      },
    ),
  )

/* ============================================================
   TERMS - ADD
============================================================ */

const addTerm = (
  payload: Omit<
    TermsCondition,
    "id"
  >,
): TermsCondition => {
  const nextNumber =
    terms.value.reduce(
      (max, term) => {
        const match =
          term.id.match(
            /^TC-(\d+)$/i,
          )

        return Math.max(
          max,
          match
            ? Number(match[1])
            : 0,
        )
      },
      0,
    ) + 1

  const newTerm:
    TermsCondition = {
    id: `TC-${String(
      nextNumber,
    ).padStart(3, "0")}`,

    ...payload,
  }

  terms.value.unshift(
    newTerm,
  )

  return newTerm
}

/* ============================================================
   TERMS - UPDATE
============================================================ */

const updateTerm = (
  id: string,
  payload: Partial<TermsCondition>,
): TermsCondition | null => {
  const index =
    terms.value.findIndex(
      (term) =>
        term.id === id,
    )

  if (index === -1) {
    return null
  }

  terms.value[index] = {
    ...terms.value[index],
    ...payload,
  }

  return terms.value[index]
}

/* ============================================================
   TERMS - DELETE
============================================================ */

const deleteTerm = (
  id: string,
): boolean => {
  const index =
    terms.value.findIndex(
      (term) =>
        term.id === id,
    )

  if (index === -1) {
    return false
  }

  terms.value.splice(
    index,
    1,
  )

  return true
}

/* ============================================================
   COMPOSABLE
============================================================ */

export function usePurchaseOrders() {
  return {
    /* Data */
    orders,
    terms,
    currentUser,

    /* Options */
    departments,
    suppliers,
    categories,
    subcategories,
    statuses,
    currencies,
    costSplitOptions,
    applicableForOptions,

    /* Summary */
    totalOrders,
    pendingOrders,
    approvedOrders,
    totalValue,

    /* Lists */
    myOrders,
    departmentCards,

    /* Item helpers */
    createEmptyAsset,
    calculateItemTotal,
    createItemFromForm,

    /* Order CRUD */
    createOrder,
    updateOrder,
    deleteOrder,
    cloneOrder,
    getOrderById,

    /* Terms CRUD */
    addTerm,
    updateTerm,
    deleteTerm,
  }
}
