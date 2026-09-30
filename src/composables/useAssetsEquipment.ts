import { computed, ref } from "vue"

export type AssetStatus =
  | "Available"
  | "Assigned"
  | "In Use"
  | "Under Maintenance"
  | "Disposed"
  | "Lost"

export type AssetCondition =
  | "New"
  | "Good"
  | "Fair"
  | "Poor"

export type AssetCategory =
  | "IT Equipment"
  | "Office Equipment"
  | "Furniture"
  | "Electrical Equipment"
  | "Production Equipment"
  | "Other"

export interface AssetEquipment {
  id: string
  assetNo: string
  assetName: string
  category: AssetCategory
  brand: string
  model: string
  serialNo: string
  department: string
  location: string
  assignedTo: string
  purchaseDate: string
  purchaseCost: number
  condition: AssetCondition
  status: AssetStatus
  warrantyExpiry: string
  notes: string
}

export interface AssetForm {
  assetName: string
  category: AssetCategory | null
  brand: string
  model: string
  serialNo: string
  department: string
  location: string
  assignedTo: string
  purchaseDate: string
  purchaseCost: number | null
  condition: AssetCondition
  status: AssetStatus
  warrantyExpiry: string
  notes: string
}

const departments = [
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

const locations = [
  "Head Office",
  "IT Department",
  "Finance Department",
  "HR Department",
  "Warehouse",
  "Production Floor",
  "Meeting Room",
  "Training Room",
]

const users = [
  "Muhammad Aiman",
  "Nur Amirah",
  "Teo Wei Ling",
  "Jonathan Lim",
  "Muhammad Iqbal",
  "Nisha Devi",
  "Vivian Tan",
]

const initialAssets: AssetEquipment[] = [
  {
    id: "AST-001",
    assetNo: "AST-2026-0001",
    assetName: "Dell Latitude 5440",
    category: "IT Equipment",
    brand: "Dell",
    model: "Latitude 5440",
    serialNo: "DL5440-8F21K",
    department: "Information Technology",
    location: "IT Department",
    assignedTo: "Muhammad Aiman",
    purchaseDate: "2026-01-15",
    purchaseCost: 4250,
    condition: "New",
    status: "In Use",
    warrantyExpiry: "2029-01-14",
    notes: "Assigned for application development and support.",
  },
  {
    id: "AST-002",
    assetNo: "AST-2026-0002",
    assetName: "HP ProDesk 600 G6",
    category: "IT Equipment",
    brand: "HP",
    model: "ProDesk 600 G6",
    serialNo: "HP600G6-91K2A",
    department: "Finance",
    location: "Finance Department",
    assignedTo: "Nur Amirah",
    purchaseDate: "2025-08-20",
    purchaseCost: 3200,
    condition: "Good",
    status: "Assigned",
    warrantyExpiry: "2028-08-19",
    notes: "",
  },
  {
    id: "AST-003",
    assetNo: "AST-2026-0003",
    assetName: "Epson EB-X06 Projector",
    category: "Office Equipment",
    brand: "Epson",
    model: "EB-X06",
    serialNo: "EPX06-22A81",
    department: "Human Resource",
    location: "Training Room",
    assignedTo: "Teo Wei Ling",
    purchaseDate: "2024-04-12",
    purchaseCost: 2150,
    condition: "Good",
    status: "Available",
    warrantyExpiry: "2027-04-11",
    notes: "Shared equipment for training sessions.",
  },
  {
    id: "AST-004",
    assetNo: "AST-2026-0004",
    assetName: "Samsung 27-inch Monitor",
    category: "IT Equipment",
    brand: "Samsung",
    model: "S27A600",
    serialNo: "SAM27-71PQ2",
    department: "Information Technology",
    location: "IT Department",
    assignedTo: "Jonathan Lim",
    purchaseDate: "2025-11-03",
    purchaseCost: 1450,
    condition: "Good",
    status: "In Use",
    warrantyExpiry: "2028-11-02",
    notes: "",
  },
  {
    id: "AST-005",
    assetNo: "AST-2026-0005",
    assetName: "Brother HL-L6400DW Printer",
    category: "Office Equipment",
    brand: "Brother",
    model: "HL-L6400DW",
    serialNo: "BRL64-92K1P",
    department: "Procurement",
    location: "Head Office",
    assignedTo: "",
    purchaseDate: "2024-07-10",
    purchaseCost: 2800,
    condition: "Fair",
    status: "Under Maintenance",
    warrantyExpiry: "2027-07-09",
    notes: "Paper feed issue reported.",
  },
  {
    id: "AST-006",
    assetNo: "AST-2026-0006",
    assetName: "Office Workstation Desk",
    category: "Furniture",
    brand: "IKEA",
    model: "BEKANT",
    serialNo: "IKEA-BKT-006",
    department: "Corporate Affairs",
    location: "Head Office",
    assignedTo: "Nisha Devi",
    purchaseDate: "2023-02-18",
    purchaseCost: 850,
    condition: "Good",
    status: "Assigned",
    warrantyExpiry: "2026-02-17",
    notes: "",
  },
  {
    id: "AST-007",
    assetNo: "AST-2026-0007",
    assetName: "Lenovo ThinkPad E14",
    category: "IT Equipment",
    brand: "Lenovo",
    model: "ThinkPad E14 Gen 5",
    serialNo: "LNV-E14-8P31",
    department: "Sales & Marketing",
    location: "Head Office",
    assignedTo: "Muhammad Iqbal",
    purchaseDate: "2025-05-22",
    purchaseCost: 3650,
    condition: "Good",
    status: "In Use",
    warrantyExpiry: "2028-05-21",
    notes: "",
  },
  {
    id: "AST-008",
    assetNo: "AST-2026-0008",
    assetName: "Panasonic Air Conditioner",
    category: "Electrical Equipment",
    brand: "Panasonic",
    model: "CS-XPU13XKH",
    serialNo: "PAN-XPU-88Q1",
    department: "Production",
    location: "Production Floor",
    assignedTo: "",
    purchaseDate: "2022-10-08",
    purchaseCost: 2850,
    condition: "Poor",
    status: "Under Maintenance",
    warrantyExpiry: "2025-10-07",
    notes: "Requires servicing.",
  },
  {
    id: "AST-009",
    assetNo: "AST-2026-0009",
    assetName: "Dell OptiPlex 7090",
    category: "IT Equipment",
    brand: "Dell",
    model: "OptiPlex 7090",
    serialNo: "DOP7090-7K21",
    department: "Quality Assurance",
    location: "Head Office",
    assignedTo: "",
    purchaseDate: "2021-06-15",
    purchaseCost: 2900,
    condition: "Poor",
    status: "Disposed",
    warrantyExpiry: "2024-06-14",
    notes: "Disposed due to hardware failure.",
  },
  {
    id: "AST-010",
    assetNo: "AST-2026-0010",
    assetName: "HP LaserJet Pro M404dn",
    category: "Office Equipment",
    brand: "HP",
    model: "LaserJet Pro M404dn",
    serialNo: "HPM404-21LP",
    department: "Regulatory Affairs",
    location: "Head Office",
    assignedTo: "",
    purchaseDate: "2024-09-12",
    purchaseCost: 1750,
    condition: "Good",
    status: "Available",
    warrantyExpiry: "2027-09-11",
    notes: "",
  },
]

const createEmptyForm = (): AssetForm => ({
  assetName: "",
  category: null,
  brand: "",
  model: "",
  serialNo: "",
  department: "",
  location: "",
  assignedTo: "",
  purchaseDate: "",
  purchaseCost: null,
  condition: "New",
  status: "Available",
  warrantyExpiry: "",
  notes: "",
})

export function useAssetsEquipment() {
  const assets = ref<AssetEquipment[]>([...initialAssets])

  const search = ref("")
  const selectedCategory = ref<AssetCategory | null>(null)
  const selectedDepartment = ref("")
  const selectedStatus = ref<AssetStatus | null>(null)
  const selectedCondition = ref<AssetCondition | null>(null)

  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const showAssetDialog = ref(false)
  const showDetailsDialog = ref(false)

  const editingAssetId = ref<string | null>(null)
  const selectedAsset = ref<AssetEquipment | null>(null)

  const assetForm = ref<AssetForm>(
    createEmptyForm(),
  )

  const snackbar = ref(false)
  const snackbarText = ref("")
  const snackbarColor = ref("success")

  const filteredAssets = computed(() => {
    const keyword = search.value
      .trim()
      .toLowerCase()

    return assets.value.filter((asset) => {
      const searchableText = [
        asset.assetNo,
        asset.assetName,
        asset.category,
        asset.brand,
        asset.model,
        asset.serialNo,
        asset.department,
        asset.location,
        asset.assignedTo,
        asset.status,
        asset.condition,
      ]
        .join(" ")
        .toLowerCase()

      const matchesSearch =
        !keyword ||
        searchableText.includes(keyword)

      const matchesCategory =
        !selectedCategory.value ||
        asset.category ===
          selectedCategory.value

      const matchesDepartment =
        !selectedDepartment.value ||
        asset.department ===
          selectedDepartment.value

      const matchesStatus =
        !selectedStatus.value ||
        asset.status ===
          selectedStatus.value

      const matchesCondition =
        !selectedCondition.value ||
        asset.condition ===
          selectedCondition.value

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDepartment &&
        matchesStatus &&
        matchesCondition
      )
    })
  })

  const totalPages = computed(() =>
    Math.max(
      1,
      Math.ceil(
        filteredAssets.value.length /
          itemsPerPage.value,
      ),
    ),
  )

  const paginatedAssets = computed(() => {
    const start =
      (currentPage.value - 1) *
      itemsPerPage.value

    return filteredAssets.value.slice(
      start,
      start + itemsPerPage.value,
    )
  })

  const totalAssets = computed(
    () => assets.value.length,
  )

  const availableAssets = computed(
    () =>
      assets.value.filter(
        (asset) =>
          asset.status === "Available",
      ).length,
  )

  const assignedAssets = computed(
    () =>
      assets.value.filter(
        (asset) =>
          asset.status === "Assigned" ||
          asset.status === "In Use",
      ).length,
  )

  const maintenanceAssets = computed(
    () =>
      assets.value.filter(
        (asset) =>
          asset.status ===
          "Under Maintenance",
      ).length,
  )

  const disposedAssets = computed(
    () =>
      assets.value.filter(
        (asset) =>
          asset.status === "Disposed",
      ).length,
  )

  const lostAssets = computed(
    () =>
      assets.value.filter(
        (asset) =>
          asset.status === "Lost",
      ).length,
  )

  const totalAssetValue = computed(() =>
    assets.value.reduce(
      (total, asset) =>
        total + asset.purchaseCost,
      0,
    ),
  )

  const activeFilterCount = computed(
    () =>
      [
        selectedCategory.value,
        selectedDepartment.value,
        selectedStatus.value,
        selectedCondition.value,
      ].filter(Boolean).length,
  )

  function showMessage(
    message: string,
    color = "success",
  ) {
    snackbarText.value = message
    snackbarColor.value = color
    snackbar.value = true
  }

  function resetFilters() {
    search.value = ""
    selectedCategory.value = null
    selectedDepartment.value = ""
    selectedStatus.value = null
    selectedCondition.value = null
    currentPage.value = 1
  }

  function resetForm() {
    assetForm.value = createEmptyForm()
    editingAssetId.value = null
  }

  function openCreateDialog() {
    resetForm()
    showAssetDialog.value = true
  }

  function openEditDialog(
    asset: AssetEquipment,
  ) {
    editingAssetId.value = asset.id

    assetForm.value = {
      assetName: asset.assetName,
      category: asset.category,
      brand: asset.brand,
      model: asset.model,
      serialNo: asset.serialNo,
      department: asset.department,
      location: asset.location,
      assignedTo: asset.assignedTo,
      purchaseDate: asset.purchaseDate,
      purchaseCost: asset.purchaseCost,
      condition: asset.condition,
      status: asset.status,
      warrantyExpiry: asset.warrantyExpiry,
      notes: asset.notes,
    }

    showAssetDialog.value = true
  }

  function openDetailsDialog(
    asset: AssetEquipment,
  ) {
    selectedAsset.value = asset
    showDetailsDialog.value = true
  }

  function saveAsset() {
    const form = assetForm.value

    if (!form.assetName.trim()) {
      showMessage(
        "Please enter an asset name.",
        "error",
      )
      return
    }

    if (!form.category) {
      showMessage(
        "Please select a category.",
        "error",
      )
      return
    }

    if (!form.department) {
      showMessage(
        "Please select a department.",
        "error",
      )
      return
    }

    if (!form.location) {
      showMessage(
        "Please select a location.",
        "error",
      )
      return
    }

    if (!form.purchaseDate) {
      showMessage(
        "Please select a purchase date.",
        "error",
      )
      return
    }

    if (
      form.purchaseCost !== null &&
      form.purchaseCost < 0
    ) {
      showMessage(
        "Purchase cost cannot be negative.",
        "error",
      )
      return
    }

    if (editingAssetId.value) {
      const index =
        assets.value.findIndex(
          (asset) =>
            asset.id ===
            editingAssetId.value,
        )

      if (index !== -1) {
        assets.value[index] = {
          ...assets.value[index],
          assetName:
            form.assetName.trim(),
          category:
            form.category as AssetCategory,
          brand: form.brand.trim(),
          model: form.model.trim(),
          serialNo:
            form.serialNo.trim(),
          department:
            form.department,
          location:
            form.location,
          assignedTo:
            form.assignedTo,
          purchaseDate:
            form.purchaseDate,
          purchaseCost:
            form.purchaseCost ?? 0,
          condition:
            form.condition,
          status:
            form.status,
          warrantyExpiry:
            form.warrantyExpiry,
          notes:
            form.notes.trim(),
        }
      }

      showMessage(
        "Asset updated successfully.",
      )
    } else {
      const nextNumber =
        assets.value.length + 1

      const numberText =
        String(nextNumber).padStart(
          4,
          "0",
        )

      const newAsset: AssetEquipment = {
        id: `AST-${String(nextNumber).padStart(3, "0")}`,
        assetNo: `AST-${new Date().getFullYear()}-${numberText}`,
        assetName:
          form.assetName.trim(),
        category:
          form.category as AssetCategory,
        brand: form.brand.trim(),
        model: form.model.trim(),
        serialNo:
          form.serialNo.trim(),
        department:
          form.department,
        location:
          form.location,
        assignedTo:
          form.assignedTo,
        purchaseDate:
          form.purchaseDate,
        purchaseCost:
          form.purchaseCost ?? 0,
        condition:
          form.condition,
        status:
          form.status,
        warrantyExpiry:
          form.warrantyExpiry,
        notes:
          form.notes.trim(),
      }

      assets.value.unshift(
        newAsset,
      )

      showMessage(
        "Asset added successfully.",
      )
    }

    showAssetDialog.value = false
    resetForm()
    currentPage.value = 1
  }

  function deleteAsset(
    asset: AssetEquipment,
  ) {
    if (
      !window.confirm(
        `Are you sure you want to delete ${asset.assetNo}?`,
      )
    ) {
      return
    }

    assets.value =
      assets.value.filter(
        (item) =>
          item.id !== asset.id,
      )

    if (
      currentPage.value >
      totalPages.value
    ) {
      currentPage.value =
        totalPages.value
    }

    showMessage(
      "Asset deleted successfully.",
    )
  }

  function clearSelection() {
    selectedAsset.value = null
    editingAssetId.value = null
  }

  return {
    assets,

    departments,
    locations,
    users,

    search,
    selectedCategory,
    selectedDepartment,
    selectedStatus,
    selectedCondition,

    currentPage,
    itemsPerPage,

    filteredAssets,
    paginatedAssets,
    totalPages,

    totalAssets,
    availableAssets,
    assignedAssets,
    maintenanceAssets,
    disposedAssets,
    lostAssets,
    totalAssetValue,

    activeFilterCount,

    showAssetDialog,
    showDetailsDialog,

    editingAssetId,
    selectedAsset,

    assetForm,

    snackbar,
    snackbarText,
    snackbarColor,

    openCreateDialog,
    openEditDialog,
    openDetailsDialog,

    saveAsset,
    deleteAsset,

    resetFilters,
    resetForm,
    clearSelection,

    showMessage,
  }
}