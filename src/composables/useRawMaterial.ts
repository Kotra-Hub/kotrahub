import {
  computed,
  ref,
  watch,
} from "vue"


/* */

export type RawMaterialStatus =
  | "Active"
  | "Inactive"


export type RawMaterialAction =
  | "Created"
  | "Updated"
  | "Stock In"
  | "Stock Out"
  | "Activated"
  | "Deactivated"


export interface RawMaterialItem {

  id: string

  name: string

  category: string

  unit: string

  stockQuantity: number

  reorderLevel: number

  location: string

  supplier: string

  effectiveDate: string

  description: string

  status: RawMaterialStatus

  inactiveDate?: string
}


export interface RawMaterialHistory {

  id: string

  rawMaterial: string

  category: string

  action: RawMaterialAction

  quantity?: number

  effectiveDate: string

  changedBy: string

  status: RawMaterialStatus
}


/* */

export function useRawMaterial() {


  /* */

  const rawMaterials = ref<RawMaterialItem[]>([

    {
      id: "RM-001",
      name: "Paracetamol Powder",
      category: "Active Pharmaceutical Ingredient",
      unit: "kg",
      stockQuantity: 850,
      reorderLevel: 200,
      location: "Raw Material Store",
      supplier: "ABC Pharmaceutical Sdn. Bhd.",
      effectiveDate: "2026-01-05",
      description: "Paracetamol powder used in pharmaceutical manufacturing.",
      status: "Active",
    },

    {
      id: "RM-002",
      name: "Microcrystalline Cellulose",
      category: "Excipient",
      unit: "kg",
      stockQuantity: 420,
      reorderLevel: 150,
      location: "Raw Material Store",
      supplier: "Pharma Ingredients Sdn. Bhd.",
      effectiveDate: "2026-01-10",
      description: "Excipient used as a pharmaceutical binder and filler.",
      status: "Active",
    },

    {
      id: "RM-003",
      name: "Magnesium Stearate",
      category: "Excipient",
      unit: "kg",
      stockQuantity: 95,
      reorderLevel: 100,
      location: "Raw Material Store",
      supplier: "Global Chemical Supplies",
      effectiveDate: "2026-01-15",
      description: "Lubricant used during tablet manufacturing.",
      status: "Active",
    },

    {
      id: "RM-004",
      name: "Colloidal Silicon Dioxide",
      category: "Excipient",
      unit: "kg",
      stockQuantity: 180,
      reorderLevel: 80,
      location: "Raw Material Store",
      supplier: "Chemical Solutions Sdn. Bhd.",
      effectiveDate: "2026-02-01",
      description: "Flow aid used in pharmaceutical production.",
      status: "Active",
    },

    {
      id: "RM-005",
      name: "Povidone K30",
      category: "Binder",
      unit: "kg",
      stockQuantity: 65,
      reorderLevel: 80,
      location: "Raw Material Store",
      supplier: "Pharma Ingredients Sdn. Bhd.",
      effectiveDate: "2026-02-10",
      description: "Binder used in tablet and granulation processes.",
      status: "Active",
    },

    {
      id: "RM-006",
      name: "Lactose Monohydrate",
      category: "Excipient",
      unit: "kg",
      stockQuantity: 560,
      reorderLevel: 200,
      location: "Raw Material Store",
      supplier: "Global Pharmaceutical Materials",
      effectiveDate: "2026-02-15",
      description: "Pharmaceutical grade lactose used as an excipient.",
      status: "Active",
    },

    {
      id: "RM-007",
      name: "Old Active Ingredient",
      category: "Active Pharmaceutical Ingredient",
      unit: "kg",
      stockQuantity: 0,
      reorderLevel: 100,
      location: "Quarantine Store",
      supplier: "Old Supplier Sdn. Bhd.",
      effectiveDate: "2024-01-01",
      description: "Inactive raw material record retained for historical purposes.",
      status: "Inactive",
      inactiveDate: "2026-05-31",
    },

  ])


  /* */

  const history = ref<RawMaterialHistory[]>([

    {
      id: "RMH-001",
      rawMaterial: "Paracetamol Powder",
      category: "Active Pharmaceutical Ingredient",
      action: "Created",
      effectiveDate: "2026-01-05",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "RMH-002",
      rawMaterial: "Microcrystalline Cellulose",
      category: "Excipient",
      action: "Created",
      effectiveDate: "2026-01-10",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "RMH-003",
      rawMaterial: "Magnesium Stearate",
      category: "Excipient",
      action: "Created",
      effectiveDate: "2026-01-15",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "RMH-004",
      rawMaterial: "Magnesium Stearate",
      category: "Excipient",
      action: "Stock In",
      quantity: 100,
      effectiveDate: "2026-02-05",
      changedBy: "Store Admin",
      status: "Active",
    },

    {
      id: "RMH-005",
      rawMaterial: "Povidone K30",
      category: "Binder",
      action: "Stock Out",
      quantity: 35,
      effectiveDate: "2026-03-12",
      changedBy: "Production",
      status: "Active",
    },

    {
      id: "RMH-006",
      rawMaterial: "Colloidal Silicon Dioxide",
      category: "Excipient",
      action: "Updated",
      effectiveDate: "2026-03-20",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "RMH-007",
      rawMaterial: "Old Active Ingredient",
      category: "Active Pharmaceutical Ingredient",
      action: "Deactivated",
      effectiveDate: "2026-05-31",
      changedBy: "Admin",
      status: "Inactive",
    },

  ])


  /* */

  const categoryOptions = computed(() =>
    Array.from(
      new Set(
        rawMaterials.value.map(
          material => material.category,
        ),
      ),
    ),
  )


  const unitOptions = computed(() =>
    Array.from(
      new Set(
        rawMaterials.value.map(
          material => material.unit,
        ),
      ),
    ),
  )


  const locationOptions = computed(() =>
    Array.from(
      new Set(
        rawMaterials.value.map(
          material => material.location,
        ),
      ),
    ),
  )


  const statusOptions: RawMaterialStatus[] = [
    "Active",
    "Inactive",
  ]


  const historyActionOptions: RawMaterialAction[] = [
    "Created",
    "Updated",
    "Stock In",
    "Stock Out",
    "Activated",
    "Deactivated",
  ]


  /* */

  const activeRawMaterialCount = computed(() =>
    rawMaterials.value.filter(
      material => material.status === "Active",
    ).length,
  )


  const inStockRawMaterialCount = computed(() =>
    rawMaterials.value.filter(
      material =>
        material.status === "Active" &&
        material.stockQuantity > material.reorderLevel,
    ).length,
  )


  const lowStockRawMaterialCount = computed(() =>
    rawMaterials.value.filter(
      material =>
        material.status === "Active" &&
        material.stockQuantity <= material.reorderLevel,
    ).length,
  )


  const inactiveRawMaterialCount = computed(() =>
    rawMaterials.value.filter(
      material => material.status === "Inactive",
    ).length,
  )


  /* */

  const filterMenu = ref(false)

  const search = ref("")

  const categoryFilter = ref<string | null>(null)

  const unitFilter = ref<string | null>(null)

  const locationFilter = ref<string | null>(null)

  const statusFilter = ref<RawMaterialStatus | null>("Active")


  const filteredRawMaterials = computed(() => {

    const keyword = search.value
      .trim()
      .toLowerCase()

    return rawMaterials.value.filter(
      material => {

        const matchesSearch =
          !keyword ||
          material.id.toLowerCase().includes(keyword) ||
          material.name.toLowerCase().includes(keyword) ||
          material.supplier.toLowerCase().includes(keyword) ||
          material.location.toLowerCase().includes(keyword)

        const matchesCategory =
          !categoryFilter.value ||
          material.category === categoryFilter.value

        const matchesUnit =
          !unitFilter.value ||
          material.unit === unitFilter.value

        const matchesLocation =
          !locationFilter.value ||
          material.location === locationFilter.value

        const matchesStatus =
          !statusFilter.value ||
          material.status === statusFilter.value

        return (
          matchesSearch &&
          matchesCategory &&
          matchesUnit &&
          matchesLocation &&
          matchesStatus
        )
      },
    )
  })


  function clearFilters() {

    search.value = ""

    categoryFilter.value = null

    unitFilter.value = null

    locationFilter.value = null

    statusFilter.value = "Active"

    filterMenu.value = false
  }


  /* */

  const page = ref(1)

  const itemsPerPage = ref(5)

  const itemsPerPageOptions = [
    5,
    10,
    20,
    50,
  ]


  const totalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredRawMaterials.value.length /
        itemsPerPage.value,
      ),
    ),
  )


  const paginatedRawMaterials = computed(() => {

    const start =
      (page.value - 1) *
      itemsPerPage.value

    const end =
      start +
      itemsPerPage.value

    return filteredRawMaterials.value.slice(
      start,
      end,
    )
  })


  const displayedStart = computed(() => {

    if (filteredRawMaterials.value.length === 0) {
      return 0
    }

    return (
      (page.value - 1) *
      itemsPerPage.value
    ) + 1
  })


  const displayedEnd = computed(() =>
    Math.min(
      page.value *
      itemsPerPage.value,
      filteredRawMaterials.value.length,
    ),
  )


  watch(
    [
      search,
      categoryFilter,
      unitFilter,
      locationFilter,
      statusFilter,
      itemsPerPage,
    ],
    () => {
      page.value = 1
    },
  )


  /* */

  const rawMaterialIdInput = ref("")

  const rawMaterialNameInput = ref("")

  const selectedCategory = ref<string | null>(null)

  const selectedUnit = ref<string | null>(null)

  const stockQuantityInput = ref(0)

  const reorderLevelInput = ref(0)

  const selectedLocation = ref<string | null>(null)

  const supplierInput = ref("")

  const effectiveDateInput = ref("")

  const descriptionInput = ref("")


  const rawMaterialIdExists = computed(() => {

    const id =
      rawMaterialIdInput.value
        .trim()
        .toLowerCase()

    if (!id) {
      return false
    }

    return rawMaterials.value.some(
      material =>
        material.id.toLowerCase() === id,
    )
  })


  const canRegisterRawMaterial = computed(() => {

    return (
      rawMaterialIdInput.value.trim() !== "" &&
      rawMaterialNameInput.value.trim() !== "" &&
      selectedCategory.value !== null &&
      selectedUnit.value !== null &&
      selectedLocation.value !== null &&
      supplierInput.value.trim() !== "" &&
      effectiveDateInput.value !== "" &&
      !rawMaterialIdExists.value &&
      stockQuantityInput.value >= 0 &&
      reorderLevelInput.value >= 0
    )
  })


  function registerRawMaterial() {

    if (!canRegisterRawMaterial.value) {
      return
    }

    const newMaterial: RawMaterialItem = {

      id:
        rawMaterialIdInput.value.trim(),

      name:
        rawMaterialNameInput.value.trim(),

      category:
        selectedCategory.value!,

      unit:
        selectedUnit.value!,

      stockQuantity:
        Number(stockQuantityInput.value),

      reorderLevel:
        Number(reorderLevelInput.value),

      location:
        selectedLocation.value!,

      supplier:
        supplierInput.value.trim(),

      effectiveDate:
        effectiveDateInput.value,

      description:
        descriptionInput.value.trim(),

      status:
        "Active",
    }


    rawMaterials.value.unshift(
      newMaterial,
    )


    history.value.unshift({

      id:
        `RMH-${String(
          history.value.length + 1,
        ).padStart(3, "0")}`,

      rawMaterial:
        newMaterial.name,

      category:
        newMaterial.category,

      action:
        "Created",

      effectiveDate:
        newMaterial.effectiveDate,

      changedBy:
        "Admin",

      status:
        "Active",
    })


    clearRegistrationForm()
  }


  function clearRegistrationForm() {

    rawMaterialIdInput.value = ""

    rawMaterialNameInput.value = ""

    selectedCategory.value = null

    selectedUnit.value = null

    stockQuantityInput.value = 0

    reorderLevelInput.value = 0

    selectedLocation.value = null

    supplierInput.value = ""

    effectiveDateInput.value = ""

    descriptionInput.value = ""
  }


  /* */

  const rawMaterialDetailsDialog = ref(false)

  const selectedRawMaterial =
    ref<RawMaterialItem | null>(null)


  function viewRawMaterial(
    material: RawMaterialItem,
  ) {

    selectedRawMaterial.value = material

    rawMaterialDetailsDialog.value = true
  }


  function closeRawMaterialDetails() {

    rawMaterialDetailsDialog.value = false

    selectedRawMaterial.value = null
  }


  /* */

  function deactivateRawMaterial(
    material: RawMaterialItem,
  ) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0]


    material.status = "Inactive"

    material.inactiveDate = today


    history.value.unshift({

      id:
        `RMH-${String(
          history.value.length + 1,
        ).padStart(3, "0")}`,

      rawMaterial:
        material.name,

      category:
        material.category,

      action:
        "Deactivated",

      effectiveDate:
        today,

      changedBy:
        "Admin",

      status:
        "Inactive",
    })


    closeRawMaterialDetails()
  }


  /* */

  function activateRawMaterial(
    material: RawMaterialItem,
  ) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0]


    material.status = "Active"

    material.inactiveDate = undefined


    history.value.unshift({

      id:
        `RMH-${String(
          history.value.length + 1,
        ).padStart(3, "0")}`,

      rawMaterial:
        material.name,

      category:
        material.category,

      action:
        "Activated",

      effectiveDate:
        today,

      changedBy:
        "Admin",

      status:
        "Active",
    })


    closeRawMaterialDetails()
  }


  /* */

  const historyFilterMenu = ref(false)

  const historySearch = ref("")

  const historyActionFilter =
    ref<RawMaterialAction | null>(null)


  const filteredHistory = computed(() => {

    const keyword =
      historySearch.value
        .trim()
        .toLowerCase()

    return history.value.filter(
      item => {

        const matchesSearch =
          !keyword ||
          item.id.toLowerCase().includes(keyword) ||
          item.rawMaterial.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword) ||
          item.action.toLowerCase().includes(keyword)

        const matchesAction =
          !historyActionFilter.value ||
          item.action === historyActionFilter.value

        return (
          matchesSearch &&
          matchesAction
        )
      },
    )
  })


  function clearHistoryFilters() {

    historySearch.value = ""

    historyActionFilter.value = null

    historyFilterMenu.value = false
  }


  /* */

  const historyPage = ref(1)

  const historyItemsPerPage = ref(5)


  const historyTotalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredHistory.value.length /
        historyItemsPerPage.value,
      ),
    ),
  )


  const paginatedHistory = computed(() => {

    const start =
      (historyPage.value - 1) *
      historyItemsPerPage.value

    const end =
      start +
      historyItemsPerPage.value

    return filteredHistory.value.slice(
      start,
      end,
    )
  })


  const historyDisplayedStart = computed(() => {

    if (filteredHistory.value.length === 0) {
      return 0
    }

    return (
      (historyPage.value - 1) *
      historyItemsPerPage.value
    ) + 1
  })


  const historyDisplayedEnd = computed(() =>
    Math.min(
      historyPage.value *
      historyItemsPerPage.value,
      filteredHistory.value.length,
    ),
  )


  watch(
    [
      historySearch,
      historyActionFilter,
      historyItemsPerPage,
    ],
    () => {
      historyPage.value = 1
    },
  )


  /* */

  const historyDetailsDialog = ref(false)

  const selectedHistory =
    ref<RawMaterialHistory | null>(null)


  function viewHistory(
    item: RawMaterialHistory,
  ) {

    selectedHistory.value = item

    historyDetailsDialog.value = true
  }


  function closeHistoryDetails() {

    historyDetailsDialog.value = false

    selectedHistory.value = null
  }


  /* */

  const inactiveFilterMenu = ref(false)

  const inactiveSearch = ref("")

  const inactiveCategoryFilter =
    ref<string | null>(null)


  const filteredInactiveRawMaterials = computed(() => {

    const keyword =
      inactiveSearch.value
        .trim()
        .toLowerCase()

    return rawMaterials.value.filter(
      material => {

        if (material.status !== "Inactive") {
          return false
        }

        const matchesSearch =
          !keyword ||
          material.id.toLowerCase().includes(keyword) ||
          material.name.toLowerCase().includes(keyword) ||
          material.supplier.toLowerCase().includes(keyword) ||
          material.location.toLowerCase().includes(keyword)

        const matchesCategory =
          !inactiveCategoryFilter.value ||
          material.category ===
          inactiveCategoryFilter.value

        return (
          matchesSearch &&
          matchesCategory
        )
      },
    )
  })


  function clearInactiveFilters() {

    inactiveSearch.value = ""

    inactiveCategoryFilter.value = null

    inactiveFilterMenu.value = false
  }


  /* */

  const inactivePage = ref(1)

  const inactiveItemsPerPage = ref(5)


  const inactiveTotalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredInactiveRawMaterials.value.length /
        inactiveItemsPerPage.value,
      ),
    ),
  )


  const paginatedInactiveRawMaterials =
    computed(() => {

      const start =
        (inactivePage.value - 1) *
        inactiveItemsPerPage.value

      const end =
        start +
        inactiveItemsPerPage.value

      return filteredInactiveRawMaterials.value.slice(
        start,
        end,
      )
    })


  const inactiveDisplayedStart = computed(() => {

    if (
      filteredInactiveRawMaterials.value.length === 0
    ) {
      return 0
    }

    return (
      (inactivePage.value - 1) *
      inactiveItemsPerPage.value
    ) + 1
  })


  const inactiveDisplayedEnd = computed(() =>
    Math.min(
      inactivePage.value *
      inactiveItemsPerPage.value,
      filteredInactiveRawMaterials.value.length,
    ),
  )


  watch(
    [
      inactiveSearch,
      inactiveCategoryFilter,
      inactiveItemsPerPage,
    ],
    () => {
      inactivePage.value = 1
    },
  )


  /* */

  return {

    rawMaterials,

    categoryOptions,
    unitOptions,
    locationOptions,
    statusOptions,
    historyActionOptions,

    activeRawMaterialCount,
    inStockRawMaterialCount,
    lowStockRawMaterialCount,
    inactiveRawMaterialCount,

    filterMenu,

    search,
    categoryFilter,
    unitFilter,
    locationFilter,
    statusFilter,

    filteredRawMaterials,

    clearFilters,

    page,
    itemsPerPage,
    itemsPerPageOptions,
    totalPages,
    paginatedRawMaterials,
    displayedStart,
    displayedEnd,

    rawMaterialIdInput,
    rawMaterialNameInput,
    selectedCategory,
    selectedUnit,
    stockQuantityInput,
    reorderLevelInput,
    selectedLocation,
    supplierInput,
    effectiveDateInput,
    descriptionInput,

    rawMaterialIdExists,
    canRegisterRawMaterial,

    registerRawMaterial,
    clearRegistrationForm,

    rawMaterialDetailsDialog,
    selectedRawMaterial,
    viewRawMaterial,
    closeRawMaterialDetails,
    deactivateRawMaterial,
    activateRawMaterial,

    historyFilterMenu,
    historySearch,
    historyActionFilter,
    filteredHistory,
    clearHistoryFilters,

    historyPage,
    historyItemsPerPage,
    historyTotalPages,
    paginatedHistory,
    historyDisplayedStart,
    historyDisplayedEnd,

    historyDetailsDialog,
    selectedHistory,
    viewHistory,
    closeHistoryDetails,

    inactiveFilterMenu,
    inactiveSearch,
    inactiveCategoryFilter,
    filteredInactiveRawMaterials,

    inactivePage,
    inactiveItemsPerPage,
    inactiveTotalPages,
    paginatedInactiveRawMaterials,
    inactiveDisplayedStart,
    inactiveDisplayedEnd,

    clearInactiveFilters,
  }
}
