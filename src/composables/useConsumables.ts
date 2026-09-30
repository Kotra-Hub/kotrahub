import {
  computed,
  ref,
  watch,
} from "vue"


/* */

export type ConsumableStatus =
  | "Active"
  | "Inactive"


export type ConsumableAction =
  | "Created"
  | "Updated"
  | "Stock In"
  | "Stock Out"
  | "Activated"
  | "Deactivated"


export interface ConsumableItem {

  id: string

  name: string

  category: string

  unit: string

  stockQuantity: number

  reorderLevel: number

  location: string

  supplier: string

  effectiveDate: string

  status: ConsumableStatus

  inactiveDate?: string

  description?: string

}


export interface ConsumableHistory {

  id: string

  consumable: string

  category: string

  action: ConsumableAction

  quantity?: number

  effectiveDate: string

  changedBy: string

  status: ConsumableStatus

  description?: string

}


/* */

export function useConsumables() {

  /* */

  const consumables =
    ref<ConsumableItem[]>([

      {
        id: "CON-001",
        name: "A4 Copy Paper",
        category: "Office Supplies",
        unit: "Ream",
        stockQuantity: 45,
        reorderLevel: 20,
        location: "Head Office",
        supplier: "ABC Stationery Sdn Bhd",
        effectiveDate: "2026-01-05",
        status: "Active",
        description: "A4 size 80gsm copy paper for general office use.",
      },

      {
        id: "CON-002",
        name: "Black Toner Cartridge",
        category: "Printer Supplies",
        unit: "Piece",
        stockQuantity: 12,
        reorderLevel: 5,
        location: "Head Office",
        supplier: "PrintTech Supplies",
        effectiveDate: "2026-01-10",
        status: "Active",
        description: "Black toner cartridge for office laser printers.",
      },

      {
        id: "CON-003",
        name: "Blue Ball Pen",
        category: "Office Supplies",
        unit: "Box",
        stockQuantity: 8,
        reorderLevel: 10,
        location: "Head Office",
        supplier: "ABC Stationery Sdn Bhd",
        effectiveDate: "2026-01-15",
        status: "Active",
        description: "Blue ball pens for daily office use.",
      },

      {
        id: "CON-004",
        name: "Hand Sanitizer 500ml",
        category: "Cleaning Supplies",
        unit: "Bottle",
        stockQuantity: 30,
        reorderLevel: 10,
        location: "Head Office",
        supplier: "CleanCare Sdn Bhd",
        effectiveDate: "2026-02-01",
        status: "Active",
        description: "500ml hand sanitizer bottles.",
      },

      {
        id: "CON-005",
        name: "Disposable Gloves",
        category: "Safety Supplies",
        unit: "Box",
        stockQuantity: 18,
        reorderLevel: 10,
        location: "Manufacturing Plant",
        supplier: "Safety First Sdn Bhd",
        effectiveDate: "2026-02-10",
        status: "Active",
        description: "Disposable gloves for operational and safety use.",
      },

      {
        id: "CON-006",
        name: "Thermal Label Roll",
        category: "Packaging Supplies",
        unit: "Roll",
        stockQuantity: 25,
        reorderLevel: 8,
        location: "Warehouse",
        supplier: "LabelPro Sdn Bhd",
        effectiveDate: "2026-02-15",
        status: "Active",
        description: "Thermal label rolls for printing product labels.",
      },

      {
        id: "CON-007",
        name: "Printer Ribbon",
        category: "Printer Supplies",
        unit: "Piece",
        stockQuantity: 6,
        reorderLevel: 5,
        location: "Warehouse",
        supplier: "PrintTech Supplies",
        effectiveDate: "2026-03-01",
        status: "Active",
        description: "Printer ribbon for dot matrix printers.",
      },

      {
        id: "CON-008",
        name: "Cleaning Cloth",
        category: "Cleaning Supplies",
        unit: "Pack",
        stockQuantity: 15,
        reorderLevel: 5,
        location: "Manufacturing Plant",
        supplier: "CleanCare Sdn Bhd",
        effectiveDate: "2026-03-05",
        status: "Active",
        description: "Cleaning cloth for equipment and workplace cleaning.",
      },

      {
        id: "CON-009",
        name: "Packaging Tape",
        category: "Packaging Supplies",
        unit: "Roll",
        stockQuantity: 4,
        reorderLevel: 8,
        location: "Warehouse",
        supplier: "PackPro Sdn Bhd",
        effectiveDate: "2026-03-10",
        status: "Active",
        description: "Packaging tape for warehouse and shipment activities.",
      },

      {
        id: "CON-010",
        name: "Old Toner Cartridge",
        category: "Printer Supplies",
        unit: "Piece",
        stockQuantity: 0,
        reorderLevel: 3,
        location: "Old Office",
        supplier: "PrintTech Supplies",
        effectiveDate: "2024-01-01",
        inactiveDate: "2026-05-31",
        status: "Inactive",
        description: "Old toner cartridge record that is no longer in use.",
      },

    ])


  /* */

  const categoryOptions =
    computed(() => {

      return [
        ...new Set(
          consumables.value.map(
            consumable =>
              consumable.category
          )
        ),
      ]

    })


  const unitOptions =
    computed(() => {

      return [
        ...new Set(
          consumables.value.map(
            consumable =>
              consumable.unit
          )
        ),
      ]

    })


  const locationOptions =
    computed(() => {

      return [
        ...new Set(
          consumables.value.map(
            consumable =>
              consumable.location
          )
        ),
      ]

    })


  const statusOptions = [
    "Active",
    "Inactive",
  ]


  const historyActionOptions = [
    "Created",
    "Updated",
    "Stock In",
    "Stock Out",
    "Activated",
    "Deactivated",
  ]


  /* */

  const activeConsumableCount =
    computed(() => {

      return consumables.value.filter(
        consumable =>
          consumable.status === "Active"
      ).length

    })


  const inStockConsumableCount =
    computed(() => {

      return consumables.value.filter(
        consumable =>
          consumable.status === "Active" &&
          consumable.stockQuantity > 0
      ).length

    })


  const lowStockConsumableCount =
    computed(() => {

      return consumables.value.filter(
        consumable =>
          consumable.status === "Active" &&
          consumable.stockQuantity <=
            consumable.reorderLevel
      ).length

    })


  const inactiveConsumableCount =
    computed(() => {

      return consumables.value.filter(
        consumable =>
          consumable.status === "Inactive"
      ).length

    })


  /* */

  const filterMenu =
    ref(false)

  const search =
    ref("")

  const categoryFilter =
    ref<string | null>(null)

  const unitFilter =
    ref<string | null>(null)

  const locationFilter =
    ref<string | null>(null)

  const statusFilter =
    ref<string | null>("Active")


  const filteredConsumables =
    computed(() => {

      const keyword =
        search.value
          .trim()
          .toLowerCase()


      return consumables.value.filter(
        consumable => {

          const searchMatch =
            !keyword ||
            consumable.id
              .toLowerCase()
              .includes(keyword) ||
            consumable.name
              .toLowerCase()
              .includes(keyword) ||
            consumable.category
              .toLowerCase()
              .includes(keyword) ||
            consumable.unit
              .toLowerCase()
              .includes(keyword) ||
            consumable.location
              .toLowerCase()
              .includes(keyword) ||
            consumable.supplier
              .toLowerCase()
              .includes(keyword)


          const categoryMatch =
            !categoryFilter.value ||
            consumable.category ===
              categoryFilter.value


          const unitMatch =
            !unitFilter.value ||
            consumable.unit ===
              unitFilter.value


          const locationMatch =
            !locationFilter.value ||
            consumable.location ===
              locationFilter.value


          const statusMatch =
            !statusFilter.value ||
            consumable.status ===
              statusFilter.value


          return (
            searchMatch &&
            categoryMatch &&
            unitMatch &&
            locationMatch &&
            statusMatch
          )

        }
      )

    })


  function clearFilters() {

    search.value = ""

    categoryFilter.value = null

    unitFilter.value = null

    locationFilter.value = null

    statusFilter.value = "Active"

    page.value = 1

  }


  /* */

  const page =
    ref(1)

  const itemsPerPage =
    ref(5)

  const itemsPerPageOptions = [
    5,
    10,
    20,
    50,
  ]


  const totalPages =
    computed(() => {

      return Math.max(
        1,
        Math.ceil(
          filteredConsumables.value.length /
            itemsPerPage.value
        )
      )

    })


  const paginatedConsumables =
    computed(() => {

      const start =
        (page.value - 1) *
        itemsPerPage.value

      const end =
        start +
        itemsPerPage.value

      return filteredConsumables.value.slice(
        start,
        end
      )

    })


  const displayedStart =
    computed(() => {

      if (
        filteredConsumables.value.length === 0
      ) {

        return 0

      }

      return (
        (page.value - 1) *
        itemsPerPage.value
      ) + 1

    })


  const displayedEnd =
    computed(() => {

      return Math.min(
        page.value *
          itemsPerPage.value,
        filteredConsumables.value.length
      )

    })


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

    }
  )


  watch(
    totalPages,
    total => {

      if (page.value > total) {

        page.value = total

      }

    }
  )


  /* */

  const consumableIdInput =
    ref("")

  const consumableNameInput =
    ref("")

  const selectedCategory =
    ref<string | null>(null)

  const selectedUnit =
    ref<string | null>(null)

  const stockQuantityInput =
    ref(0)

  const reorderLevelInput =
    ref(0)

  const selectedLocation =
    ref<string | null>(null)

  const supplierInput =
    ref("")

  const effectiveDateInput =
    ref("")

  const descriptionInput =
    ref("")


  const consumableIdExists =
    computed(() => {

      const id =
        consumableIdInput.value
          .trim()
          .toLowerCase()


      if (!id) {

        return false

      }


      return consumables.value.some(
        consumable =>
          consumable.id
            .toLowerCase() === id
      )

    })


  const canRegisterConsumable =
    computed(() => {

      return (
        consumableIdInput.value.trim() !== "" &&
        consumableNameInput.value.trim() !== "" &&
        selectedCategory.value !== null &&
        selectedUnit.value !== null &&
        stockQuantityInput.value >= 0 &&
        reorderLevelInput.value >= 0 &&
        selectedLocation.value !== null &&
        supplierInput.value.trim() !== "" &&
        effectiveDateInput.value.trim() !== "" &&
        !consumableIdExists.value
      )

    })


  function registerConsumable() {

    if (
      !canRegisterConsumable.value
    ) {

      return

    }


    const newConsumable: ConsumableItem = {

      id:
        consumableIdInput.value.trim(),

      name:
        consumableNameInput.value.trim(),

      category:
        selectedCategory.value as string,

      unit:
        selectedUnit.value as string,

      stockQuantity:
        stockQuantityInput.value || 0,

      reorderLevel:
        reorderLevelInput.value || 0,

      location:
        selectedLocation.value as string,

      supplier:
        supplierInput.value.trim(),

      effectiveDate:
        effectiveDateInput.value,

      status:
        "Active",

      description:
        descriptionInput.value.trim() ||
        undefined,

    }


    consumables.value.push(
      newConsumable
    )


    consumableHistory.value.unshift({

      id:
        `CH-${String(
          consumableHistory.value.length + 1
        ).padStart(3, "0")}`,

      consumable:
        newConsumable.name,

      category:
        newConsumable.category,

      action:
        "Created",

      effectiveDate:
        newConsumable.effectiveDate,

      changedBy:
        "Admin",

      status:
        "Active",

      description:
        "Consumable was registered.",

    })


    clearRegistrationForm()

  }


  function clearRegistrationForm() {

    consumableIdInput.value = ""

    consumableNameInput.value = ""

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

  const consumableDetailsDialog =
    ref(false)

  const selectedConsumable =
    ref<ConsumableItem | null>(null)


  function viewConsumable(
    consumable: ConsumableItem
  ) {

    selectedConsumable.value =
      consumable

    consumableDetailsDialog.value =
      true

  }


  function closeConsumableDetails() {

    consumableDetailsDialog.value =
      false

    selectedConsumable.value =
      null

  }


  /* */

  function deactivateConsumable(
    consumable: ConsumableItem
  ) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0]


    consumable.status =
      "Inactive"

    consumable.inactiveDate =
      today


    consumableHistory.value.unshift({

      id:
        `CH-${String(
          consumableHistory.value.length + 1
        ).padStart(3, "0")}`,

      consumable:
        consumable.name,

      category:
        consumable.category,

      action:
        "Deactivated",

      effectiveDate:
        today,

      changedBy:
        "Admin",

      status:
        "Inactive",

      description:
        "Consumable was deactivated.",

    })


    closeConsumableDetails()

  }


  /* */

  function activateConsumable(
    consumable: ConsumableItem
  ) {

    const today =
      new Date()
        .toISOString()
        .split("T")[0]


    consumable.status =
      "Active"

    consumable.inactiveDate =
      undefined


    consumableHistory.value.unshift({

      id:
        `CH-${String(
          consumableHistory.value.length + 1
        ).padStart(3, "0")}`,

      consumable:
        consumable.name,

      category:
        consumable.category,

      action:
        "Activated",

      effectiveDate:
        today,

      changedBy:
        "Admin",

      status:
        "Active",

      description:
        "Consumable was activated.",

    })


    closeConsumableDetails()

  }


  /* */

  const consumableHistory =
    ref<ConsumableHistory[]>([

      {
        id: "CH-001",
        consumable: "A4 Copy Paper",
        category: "Office Supplies",
        action: "Created",
        effectiveDate: "2026-01-05",
        changedBy: "Admin",
        status: "Active",
        description: "Consumable was registered.",
      },

      {
        id: "CH-002",
        consumable: "Black Toner Cartridge",
        category: "Printer Supplies",
        action: "Created",
        effectiveDate: "2026-01-10",
        changedBy: "Admin",
        status: "Active",
        description: "Consumable was registered.",
      },

      {
        id: "CH-003",
        consumable: "Blue Ball Pen",
        category: "Office Supplies",
        action: "Stock In",
        quantity: 20,
        effectiveDate: "2026-01-20",
        changedBy: "Admin",
        status: "Active",
        description: "Stock quantity was added.",
      },

      {
        id: "CH-004",
        consumable: "Hand Sanitizer 500ml",
        category: "Cleaning Supplies",
        action: "Created",
        effectiveDate: "2026-02-01",
        changedBy: "Admin",
        status: "Active",
        description: "Consumable was registered.",
      },

      {
        id: "CH-005",
        consumable: "Disposable Gloves",
        category: "Safety Supplies",
        action: "Stock In",
        quantity: 30,
        effectiveDate: "2026-02-15",
        changedBy: "Admin",
        status: "Active",
        description: "Stock quantity was added.",
      },

      {
        id: "CH-006",
        consumable: "Thermal Label Roll",
        category: "Packaging Supplies",
        action: "Updated",
        effectiveDate: "2026-02-20",
        changedBy: "Admin",
        status: "Active",
        description: "Consumable information was updated.",
      },

      {
        id: "CH-007",
        consumable: "Old Toner Cartridge",
        category: "Printer Supplies",
        action: "Deactivated",
        effectiveDate: "2026-05-31",
        changedBy: "Admin",
        status: "Inactive",
        description: "Consumable was deactivated.",
      },

    ])


  const historyFilterMenu =
    ref(false)

  const historySearch =
    ref("")

  const historyActionFilter =
    ref<ConsumableAction | null>(null)


  const filteredHistory =
    computed(() => {

      const keyword =
        historySearch.value
          .trim()
          .toLowerCase()


      return consumableHistory.value.filter(
        history => {

          const searchMatch =
            !keyword ||
            history.id
              .toLowerCase()
              .includes(keyword) ||
            history.consumable
              .toLowerCase()
              .includes(keyword) ||
            history.category
              .toLowerCase()
              .includes(keyword) ||
            history.action
              .toLowerCase()
              .includes(keyword)


          const actionMatch =
            !historyActionFilter.value ||
            history.action ===
              historyActionFilter.value


          return (
            searchMatch &&
            actionMatch
          )

        }
      )

    })


  /* */

  const historyPage =
    ref(1)

  const historyItemsPerPage =
    ref(5)


  const historyTotalPages =
    computed(() => {

      return Math.max(
        1,
        Math.ceil(
          filteredHistory.value.length /
            historyItemsPerPage.value
        )
      )

    })


  const paginatedHistory =
    computed(() => {

      const start =
        (historyPage.value - 1) *
        historyItemsPerPage.value

      const end =
        start +
        historyItemsPerPage.value

      return filteredHistory.value.slice(
        start,
        end
      )

    })


  const historyDisplayedStart =
    computed(() => {

      if (
        filteredHistory.value.length === 0
      ) {

        return 0

      }

      return (
        (historyPage.value - 1) *
        historyItemsPerPage.value
      ) + 1

    })


  const historyDisplayedEnd =
    computed(() => {

      return Math.min(
        historyPage.value *
          historyItemsPerPage.value,
        filteredHistory.value.length
      )

    })


  watch(
    [
      historySearch,
      historyActionFilter,
      historyItemsPerPage,
    ],
    () => {

      historyPage.value = 1

    }
  )


  watch(
    historyTotalPages,
    total => {

      if (
        historyPage.value > total
      ) {

        historyPage.value =
          total

      }

    }
  )


  function clearHistoryFilters() {

    historySearch.value = ""

    historyActionFilter.value =
      null

    historyPage.value = 1

  }


  /* */

  const historyDetailsDialog =
    ref(false)

  const selectedHistory =
    ref<ConsumableHistory | null>(null)


  function viewHistory(
    history: ConsumableHistory
  ) {

    selectedHistory.value =
      history

    historyDetailsDialog.value =
      true

  }


  function closeHistoryDetails() {

    historyDetailsDialog.value =
      false

    selectedHistory.value =
      null

  }


  /* */

  const inactiveFilterMenu =
    ref(false)

  const inactiveSearch =
    ref("")

  const inactiveCategoryFilter =
    ref<string | null>(null)


  const filteredInactiveConsumables =
    computed(() => {

      const keyword =
        inactiveSearch.value
          .trim()
          .toLowerCase()


      return consumables.value.filter(
        consumable => {

          if (
            consumable.status !==
            "Inactive"
          ) {

            return false

          }


          const searchMatch =
            !keyword ||
            consumable.id
              .toLowerCase()
              .includes(keyword) ||
            consumable.name
              .toLowerCase()
              .includes(keyword) ||
            consumable.category
              .toLowerCase()
              .includes(keyword) ||
            consumable.location
              .toLowerCase()
              .includes(keyword) ||
            consumable.supplier
              .toLowerCase()
              .includes(keyword)


          const categoryMatch =
            !inactiveCategoryFilter.value ||
            consumable.category ===
              inactiveCategoryFilter.value


          return (
            searchMatch &&
            categoryMatch
          )

        }
      )

    })


  const inactivePage =
    ref(1)

  const inactiveItemsPerPage =
    ref(5)


  const inactiveTotalPages =
    computed(() => {

      return Math.max(
        1,
        Math.ceil(
          filteredInactiveConsumables.value.length /
            inactiveItemsPerPage.value
        )
      )

    })


  const paginatedInactiveConsumables =
    computed(() => {

      const start =
        (inactivePage.value - 1) *
        inactiveItemsPerPage.value

      const end =
        start +
        inactiveItemsPerPage.value

      return filteredInactiveConsumables.value.slice(
        start,
        end
      )

    })


  const inactiveDisplayedStart =
    computed(() => {

      if (
        filteredInactiveConsumables.value.length === 0
      ) {

        return 0

      }

      return (
        (inactivePage.value - 1) *
        inactiveItemsPerPage.value
      ) + 1

    })


  const inactiveDisplayedEnd =
    computed(() => {

      return Math.min(
        inactivePage.value *
          inactiveItemsPerPage.value,
        filteredInactiveConsumables.value.length
      )

    })


  watch(
    [
      inactiveSearch,
      inactiveCategoryFilter,
      inactiveItemsPerPage,
    ],
    () => {

      inactivePage.value = 1

    }
  )


  watch(
    inactiveTotalPages,
    total => {

      if (
        inactivePage.value > total
      ) {

        inactivePage.value =
          total

      }

    }
  )


  function clearInactiveFilters() {

    inactiveSearch.value = ""

    inactiveCategoryFilter.value =
      null

    inactivePage.value = 1

  }


  /* */

  return {

    consumables,

    categoryOptions,

    unitOptions,

    locationOptions,

    statusOptions,

    historyActionOptions,


    activeConsumableCount,

    inStockConsumableCount,

    lowStockConsumableCount,

    inactiveConsumableCount,


    filterMenu,

    search,

    categoryFilter,

    unitFilter,

    locationFilter,

    statusFilter,

    filteredConsumables,

    clearFilters,


    page,

    itemsPerPage,

    itemsPerPageOptions,

    totalPages,

    paginatedConsumables,

    displayedStart,

    displayedEnd,


    consumableIdInput,

    consumableNameInput,

    selectedCategory,

    selectedUnit,

    stockQuantityInput,

    reorderLevelInput,

    selectedLocation,

    supplierInput,

    effectiveDateInput,

    descriptionInput,

    consumableIdExists,

    canRegisterConsumable,

    registerConsumable,

    clearRegistrationForm,


    consumableDetailsDialog,

    selectedConsumable,

    viewConsumable,

    closeConsumableDetails,

    deactivateConsumable,

    activateConsumable,


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

    filteredInactiveConsumables,


    inactivePage,

    inactiveItemsPerPage,

    inactiveTotalPages,

    paginatedInactiveConsumables,

    inactiveDisplayedStart,

    inactiveDisplayedEnd,

    clearInactiveFilters,

  }

}