import {
  computed,
  ref,
  watch,
} from "vue"


/* */

export type LotStatus =
  | "Active"
  | "Expiring Soon"
  | "Expired"
  | "Inactive"


export type LotAction =
  | "Created"
  | "Updated"
  | "Stock In"
  | "Stock Out"
  | "Activated"
  | "Deactivated"


export interface LotItem {

  id: string

  lotNumber: string

  rawMaterial: string

  category: string

  quantity: number

  unit: string

  location: string

  supplier: string

  manufacturingDate: string

  expiryDate: string

  description: string

  status: LotStatus

  inactiveDate?: string
}


export interface LotHistory {

  id: string

  lotNumber: string

  rawMaterial: string

  category: string

  action: LotAction

  quantity?: number

  effectiveDate: string

  changedBy: string

  status: LotStatus
}


/* */

export function useLots() {


  /* */

  const lots = ref<LotItem[]>([

    {
      id: "LOT-001",
      lotNumber: "LOT2026-001",
      rawMaterial: "Paracetamol Powder",
      category: "Active Pharmaceutical Ingredient",
      quantity: 250,
      unit: "kg",
      location: "Raw Material Store",
      supplier: "ABC Pharmaceutical Sdn. Bhd.",
      manufacturingDate: "2026-01-05",
      expiryDate: "2028-01-05",
      description: "Production lot for Paracetamol Powder.",
      status: "Active",
    },

    {
      id: "LOT-002",
      lotNumber: "LOT2026-002",
      rawMaterial: "Microcrystalline Cellulose",
      category: "Excipient",
      quantity: 180,
      unit: "kg",
      location: "Raw Material Store",
      supplier: "Pharma Ingredients Sdn. Bhd.",
      manufacturingDate: "2026-01-10",
      expiryDate: "2028-01-10",
      description: "Production lot for Microcrystalline Cellulose.",
      status: "Active",
    },

    {
      id: "LOT-003",
      lotNumber: "LOT2026-003",
      rawMaterial: "Magnesium Stearate",
      category: "Excipient",
      quantity: 75,
      unit: "kg",
      location: "Raw Material Store",
      supplier: "Global Chemical Supplies",
      manufacturingDate: "2026-02-01",
      expiryDate: "2027-12-01",
      description: "Production lot for Magnesium Stearate.",
      status: "Active",
    },

    {
      id: "LOT-004",
      lotNumber: "LOT2026-004",
      rawMaterial: "Povidone K30",
      category: "Binder",
      quantity: 45,
      unit: "kg",
      location: "Raw Material Store",
      supplier: "Pharma Ingredients Sdn. Bhd.",
      manufacturingDate: "2026-03-01",
      expiryDate: "2027-02-01",
      description: "Production lot approaching expiry.",
      status: "Expiring Soon",
    },

    {
      id: "LOT-005",
      lotNumber: "LOT2026-005",
      rawMaterial: "Lactose Monohydrate",
      category: "Excipient",
      quantity: 320,
      unit: "kg",
      location: "Raw Material Store",
      supplier: "Global Pharmaceutical Materials",
      manufacturingDate: "2026-03-15",
      expiryDate: "2028-03-15",
      description: "Production lot for Lactose Monohydrate.",
      status: "Active",
    },

    {
      id: "LOT-006",
      lotNumber: "LOT2026-006",
      rawMaterial: "Colloidal Silicon Dioxide",
      category: "Excipient",
      quantity: 90,
      unit: "kg",
      location: "Raw Material Store",
      supplier: "Chemical Solutions Sdn. Bhd.",
      manufacturingDate: "2026-04-01",
      expiryDate: "2027-04-01",
      description: "Production lot for Colloidal Silicon Dioxide.",
      status: "Active",
    },

    {
      id: "LOT-007",
      lotNumber: "LOT2025-021",
      rawMaterial: "Old Active Ingredient",
      category: "Active Pharmaceutical Ingredient",
      quantity: 0,
      unit: "kg",
      location: "Quarantine Store",
      supplier: "Old Supplier Sdn. Bhd.",
      manufacturingDate: "2025-01-01",
      expiryDate: "2026-01-01",
      description: "Inactive lot retained for historical reference.",
      status: "Inactive",
      inactiveDate: "2026-05-31",
    },

  ])


  /* */

  const history = ref<LotHistory[]>([

    {
      id: "LOTH-001",
      lotNumber: "LOT2026-001",
      rawMaterial: "Paracetamol Powder",
      category: "Active Pharmaceutical Ingredient",
      action: "Created",
      effectiveDate: "2026-01-05",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LOTH-002",
      lotNumber: "LOT2026-002",
      rawMaterial: "Microcrystalline Cellulose",
      category: "Excipient",
      action: "Created",
      effectiveDate: "2026-01-10",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LOTH-003",
      lotNumber: "LOT2026-003",
      rawMaterial: "Magnesium Stearate",
      category: "Excipient",
      action: "Stock In",
      quantity: 75,
      effectiveDate: "2026-02-01",
      changedBy: "Store Admin",
      status: "Active",
    },

    {
      id: "LOTH-004",
      lotNumber: "LOT2026-003",
      rawMaterial: "Magnesium Stearate",
      category: "Excipient",
      action: "Stock Out",
      quantity: 25,
      effectiveDate: "2026-02-20",
      changedBy: "Production",
      status: "Active",
    },

    {
      id: "LOTH-005",
      lotNumber: "LOT2026-004",
      rawMaterial: "Povidone K30",
      category: "Binder",
      action: "Created",
      effectiveDate: "2026-03-01",
      changedBy: "Admin",
      status: "Expiring Soon",
    },

    {
      id: "LOTH-006",
      lotNumber: "LOT2026-005",
      rawMaterial: "Lactose Monohydrate",
      category: "Excipient",
      action: "Updated",
      effectiveDate: "2026-03-20",
      changedBy: "Admin",
      status: "Active",
    },

    {
      id: "LOTH-007",
      lotNumber: "LOT2025-021",
      rawMaterial: "Old Active Ingredient",
      category: "Active Pharmaceutical Ingredient",
      action: "Deactivated",
      effectiveDate: "2026-05-31",
      changedBy: "Admin",
      status: "Inactive",
    },

  ])


  /* */

  const rawMaterialOptions = computed(() =>
    Array.from(
      new Set(
        lots.value.map(
          lot => lot.rawMaterial,
        ),
      ),
    ),
  )


  const categoryOptions = computed(() =>
    Array.from(
      new Set(
        lots.value.map(
          lot => lot.category,
        ),
      ),
    ),
  )


  const unitOptions = computed(() =>
    Array.from(
      new Set(
        lots.value.map(
          lot => lot.unit,
        ),
      ),
    ),
  )


  const locationOptions = computed(() =>
    Array.from(
      new Set(
        lots.value.map(
          lot => lot.location,
        ),
      ),
    ),
  )


  const statusOptions: LotStatus[] = [
    "Active",
    "Expiring Soon",
    "Expired",
    "Inactive",
  ]


  const historyActionOptions: LotAction[] = [
    "Created",
    "Updated",
    "Stock In",
    "Stock Out",
    "Activated",
    "Deactivated",
  ]


  /* */

  const activeLotCount = computed(() =>
    lots.value.filter(
      lot =>
        lot.status === "Active" ||
        lot.status === "Expiring Soon",
    ).length,
  )


  const availableLotCount = computed(() =>
    lots.value.filter(
      lot =>
        lot.status !== "Inactive" &&
        lot.status !== "Expired" &&
        lot.quantity > 0,
    ).length,
  )


  const expiringSoonLotCount = computed(() =>
    lots.value.filter(
      lot =>
        lot.status === "Expiring Soon",
    ).length,
  )


  const inactiveLotCount = computed(() =>
    lots.value.filter(
      lot => lot.status === "Inactive",
    ).length,
  )


  /* */

  const filterMenu = ref(false)

  const search = ref("")

  const rawMaterialFilter =
    ref<string | null>(null)

  const categoryFilter =
    ref<string | null>(null)

  const locationFilter =
    ref<string | null>(null)

  const statusFilter =
    ref<LotStatus | null>("Active")


  const filteredLots = computed(() => {

    const keyword =
      search.value
        .trim()
        .toLowerCase()


    return lots.value.filter(
      lot => {

        const matchesSearch =
          !keyword ||
          lot.id.toLowerCase().includes(keyword) ||
          lot.lotNumber.toLowerCase().includes(keyword) ||
          lot.rawMaterial.toLowerCase().includes(keyword) ||
          lot.supplier.toLowerCase().includes(keyword) ||
          lot.location.toLowerCase().includes(keyword)


        const matchesRawMaterial =
          !rawMaterialFilter.value ||
          lot.rawMaterial ===
          rawMaterialFilter.value


        const matchesCategory =
          !categoryFilter.value ||
          lot.category ===
          categoryFilter.value


        const matchesLocation =
          !locationFilter.value ||
          lot.location ===
          locationFilter.value


        const matchesStatus =
          !statusFilter.value ||
          lot.status ===
          statusFilter.value


        return (
          matchesSearch &&
          matchesRawMaterial &&
          matchesCategory &&
          matchesLocation &&
          matchesStatus
        )
      },
    )
  })


  function clearFilters() {

    search.value = ""

    rawMaterialFilter.value = null

    categoryFilter.value = null

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
        filteredLots.value.length /
        itemsPerPage.value,
      ),
    ),
  )


  const paginatedLots = computed(() => {

    const start =
      (page.value - 1) *
      itemsPerPage.value

    const end =
      start +
      itemsPerPage.value

    return filteredLots.value.slice(
      start,
      end,
    )
  })


  const displayedStart = computed(() => {

    if (filteredLots.value.length === 0) {
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
      filteredLots.value.length,
    ),
  )


  watch(
    [
      search,
      rawMaterialFilter,
      categoryFilter,
      locationFilter,
      statusFilter,
      itemsPerPage,
    ],
    () => {
      page.value = 1
    },
  )


  /* */

  const lotIdInput = ref("")

  const lotNumberInput = ref("")

  const selectedRawMaterial =
    ref<string | null>(null)

  const selectedCategory =
    ref<string | null>(null)

  const quantityInput = ref(0)

  const selectedUnit =
    ref<string | null>(null)

  const selectedLocation =
    ref<string | null>(null)

  const supplierInput = ref("")

  const manufacturingDateInput = ref("")

  const expiryDateInput = ref("")

  const descriptionInput = ref("")


  const lotIdExists = computed(() => {

    const id =
      lotIdInput.value
        .trim()
        .toLowerCase()


    if (!id) {
      return false
    }


    return lots.value.some(
      lot =>
        lot.id.toLowerCase() === id,
    )
  })


  const canRegisterLot = computed(() => {

    return Boolean(

      lotIdInput.value.trim() !== "" &&

      lotNumberInput.value.trim() !== "" &&

      selectedRawMaterial.value !== null &&

      selectedCategory.value !== null &&

      selectedUnit.value !== null &&

      selectedLocation.value !== null &&

      supplierInput.value.trim() !== "" &&

      manufacturingDateInput.value !== "" &&

      expiryDateInput.value !== "" &&

      !lotIdExists.value &&

      quantityInput.value >= 0 &&

      new Date(expiryDateInput.value) >=
        new Date(manufacturingDateInput.value)

    )
  })


  function registerLot() {

    if (!canRegisterLot.value) {
      return
    }


    const newLot: LotItem = {

      id:
        lotIdInput.value.trim(),

      lotNumber:
        lotNumberInput.value.trim(),

      rawMaterial:
        selectedRawMaterial.value!,

      category:
        selectedCategory.value!,

      quantity:
        Number(quantityInput.value),

      unit:
        selectedUnit.value!,

      location:
        selectedLocation.value!,

      supplier:
        supplierInput.value.trim(),

      manufacturingDate:
        manufacturingDateInput.value,

      expiryDate:
        expiryDateInput.value,

      description:
        descriptionInput.value.trim(),

      status:
        calculateLotStatus(
          expiryDateInput.value,
        ),
    }


    lots.value.unshift(
      newLot,
    )


    history.value.unshift({

      id:
        `LOTH-${String(
          history.value.length + 1,
        ).padStart(3, "0")}`,

      lotNumber:
        newLot.lotNumber,

      rawMaterial:
        newLot.rawMaterial,

      category:
        newLot.category,

      action:
        "Created",

      quantity:
        newLot.quantity,

      effectiveDate:
        newLot.manufacturingDate,

      changedBy:
        "Admin",

      status:
        newLot.status,
    })


    clearRegistrationForm()
  }


  function clearRegistrationForm() {

    lotIdInput.value = ""

    lotNumberInput.value = ""

    selectedRawMaterial.value = null

    selectedCategory.value = null

    quantityInput.value = 0

    selectedUnit.value = null

    selectedLocation.value = null

    supplierInput.value = ""

    manufacturingDateInput.value = ""

    expiryDateInput.value = ""

    descriptionInput.value = ""
  }


  /* */

  function calculateLotStatus(
    expiryDate: string,
  ): LotStatus {

    const today = new Date()

    today.setHours(
      0,
      0,
      0,
      0,
    )


    const expiry = new Date(
      expiryDate,
    )

    expiry.setHours(
      0,
      0,
      0,
      0,
    )


    if (expiry < today) {
      return "Expired"
    }


    const thirtyDaysFromNow =
      new Date(today)

    thirtyDaysFromNow.setDate(
      today.getDate() + 30,
    )


    if (
      expiry <=
      thirtyDaysFromNow
    ) {
      return "Expiring Soon"
    }


    return "Active"
  }


  /* */

  const lotDetailsDialog = ref(false)

  const selectedLot =
    ref<LotItem | null>(null)


  function viewLot(
    lot: LotItem,
  ) {

    selectedLot.value = lot

    lotDetailsDialog.value = true
  }


  function closeLotDetails() {

    lotDetailsDialog.value = false

    selectedLot.value = null
  }


  /* */

  function deactivateLot(
    lot: LotItem,
  ) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0]


    lot.status = "Inactive"

    lot.inactiveDate = today


    history.value.unshift({

      id:
        `LOTH-${String(
          history.value.length + 1,
        ).padStart(3, "0")}`,

      lotNumber:
        lot.lotNumber,

      rawMaterial:
        lot.rawMaterial,

      category:
        lot.category,

      action:
        "Deactivated",

      effectiveDate:
        today,

      changedBy:
        "Admin",

      status:
        "Inactive",
    })


    closeLotDetails()
  }


  /* */

  function activateLot(
    lot: LotItem,
  ) {

    lot.status =
      calculateLotStatus(
        lot.expiryDate,
      )

    lot.inactiveDate =
      undefined


    const today =
      new Date()
        .toISOString()
        .split("T")[0]


    history.value.unshift({

      id:
        `LOTH-${String(
          history.value.length + 1,
        ).padStart(3, "0")}`,

      lotNumber:
        lot.lotNumber,

      rawMaterial:
        lot.rawMaterial,

      category:
        lot.category,

      action:
        "Activated",

      effectiveDate:
        today,

      changedBy:
        "Admin",

      status:
        lot.status,
    })


    closeLotDetails()
  }


  /* */

  const historyFilterMenu =
    ref(false)

  const historySearch =
    ref("")

  const historyActionFilter =
    ref<LotAction | null>(null)


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
          item.lotNumber.toLowerCase().includes(keyword) ||
          item.rawMaterial.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword) ||
          item.action.toLowerCase().includes(keyword)


        const matchesAction =
          !historyActionFilter.value ||
          item.action ===
          historyActionFilter.value


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

  const historyDetailsDialog =
    ref(false)

  const selectedHistory =
    ref<LotHistory | null>(null)


  function viewHistory(
    item: LotHistory,
  ) {

    selectedHistory.value = item

    historyDetailsDialog.value = true
  }


  function closeHistoryDetails() {

    historyDetailsDialog.value = false

    selectedHistory.value = null
  }


  /* */

  const inactiveFilterMenu =
    ref(false)

  const inactiveSearch =
    ref("")

  const inactiveCategoryFilter =
    ref<string | null>(null)


  const filteredInactiveLots =
    computed(() => {

      const keyword =
        inactiveSearch.value
          .trim()
          .toLowerCase()


      return lots.value.filter(
        lot => {

          if (
            lot.status !== "Inactive"
          ) {
            return false
          }


          const matchesSearch =
            !keyword ||
            lot.id.toLowerCase().includes(keyword) ||
            lot.lotNumber.toLowerCase().includes(keyword) ||
            lot.rawMaterial.toLowerCase().includes(keyword) ||
            lot.supplier.toLowerCase().includes(keyword) ||
            lot.location.toLowerCase().includes(keyword)


          const matchesCategory =
            !inactiveCategoryFilter.value ||
            lot.category ===
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

    inactiveCategoryFilter.value =
      null

    inactiveFilterMenu.value = false
  }


  /* */

  const inactivePage = ref(1)

  const inactiveItemsPerPage = ref(5)


  const inactiveTotalPages =
    computed(() =>
      Math.max(
        1,
        Math.ceil(
          filteredInactiveLots.value.length /
          inactiveItemsPerPage.value,
        ),
      ),
    )


  const paginatedInactiveLots =
    computed(() => {

      const start =
        (inactivePage.value - 1) *
        inactiveItemsPerPage.value

      const end =
        start +
        inactiveItemsPerPage.value

      return filteredInactiveLots.value.slice(
        start,
        end,
      )
    })


  const inactiveDisplayedStart =
    computed(() => {

      if (
        filteredInactiveLots.value.length === 0
      ) {
        return 0
      }


      return (
        (inactivePage.value - 1) *
        inactiveItemsPerPage.value
      ) + 1
    })


  const inactiveDisplayedEnd =
    computed(() =>
      Math.min(
        inactivePage.value *
        inactiveItemsPerPage.value,
        filteredInactiveLots.value.length,
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

    lots,

    rawMaterialOptions,
    categoryOptions,
    unitOptions,
    locationOptions,
    statusOptions,
    historyActionOptions,

    activeLotCount,
    availableLotCount,
    expiringSoonLotCount,
    inactiveLotCount,

    filterMenu,

    search,
    rawMaterialFilter,
    categoryFilter,
    locationFilter,
    statusFilter,

    filteredLots,
    clearFilters,

    page,
    itemsPerPage,
    itemsPerPageOptions,
    totalPages,
    paginatedLots,
    displayedStart,
    displayedEnd,

    lotIdInput,
    lotNumberInput,
    selectedRawMaterial,
    selectedCategory,
    quantityInput,
    selectedUnit,
    selectedLocation,
    supplierInput,
    manufacturingDateInput,
    expiryDateInput,
    descriptionInput,

    lotIdExists,
    canRegisterLot,

    registerLot,
    clearRegistrationForm,

    lotDetailsDialog,
    selectedLot,
    viewLot,
    closeLotDetails,
    deactivateLot,
    activateLot,

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
    filteredInactiveLots,

    inactivePage,
    inactiveItemsPerPage,
    inactiveTotalPages,
    paginatedInactiveLots,
    inactiveDisplayedStart,
    inactiveDisplayedEnd,

    clearInactiveFilters,
  }
}