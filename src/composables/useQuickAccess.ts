// src/composables/useQuickAccess.ts
import { ref, computed, watch } from 'vue'

export interface QuickAccessItem {
  id: number
  label: string
  icon: string
  page: string
}

export interface QuickAccessCategory {
  name: string
  count: number
  items: string[]
}

const STORAGE_KEY = 'quickAccess'

const defaultQuickAccess: QuickAccessItem[] = [
  { id: 1, label: 'Staff Purchase', icon: 'mdi-cart', page: 'eservices' },
  { id: 2, label: 'Training Record', icon: 'mdi-school', page: 'eservices' },
  { id: 3, label: 'PO Management', icon: 'mdi-file-document-outline', page: 'eservices' },
  { id: 4, label: 'Material Management', icon: 'mdi-package-variant', page: 'eservices' },
  { id: 5, label: 'Sales Automation', icon: 'mdi-chart-bar', page: 'eservices' },
  { id: 6, label: 'AP Management', icon: 'mdi-account-group', page: 'eservices' },
  { id: 7, label: 'Work Order', icon: 'mdi-wrench', page: 'eservices' },
  { id: 8, label: 'TSR', icon: 'mdi-clipboard-list', page: 'eservices' },
  { id: 9, label: 'Easy Loader', icon: 'mdi-upload', page: 'eservices' }
]

const quickAccessItems = ref<QuickAccessItem[]>([...defaultQuickAccess])

const categories = ref<QuickAccessCategory[]>([
  {
    name: 'E-Services',
    count: 9,
    items: [
      'Staff Purchase',
      'Training Record',
      'PO Management',
      'Material Management',
      'Sales Automation',
      'AP Management',
      'Work Order',
      'TSR',
      'Easy Loader'
    ]
  },
  {
    name: 'HR Services',
    count: 5,
    items: [
      'Leave Application',
      'Attendance Record',
      'Payroll View',
      'Employee Profile',
      'Training Registration'
    ]
  },
  {
    name: 'Finance Services',
    count: 4,
    items: [
      'Invoice Processing',
      'Expense Claim',
      'Budget View',
      'Payment Approval'
    ]
  },
  {
    name: 'IT Services',
    count: 3,
    items: [
      'IT Support Ticket',
      'Software Request',
      'Hardware Request'
    ]
  }
])

const categoryOptions = computed(() => {
  const options = [{ title: 'All Categories', value: '' }]
  categories.value.forEach(cat => {
    options.push({ title: cat.name, value: cat.name })
  })
  return options
})

const filterCategories = (
  search: string,
  categoryFilter: string
): QuickAccessCategory[] => {
  const s = search.toLowerCase().trim()

  return categories.value
    .filter(cat => {
      if (categoryFilter && cat.name !== categoryFilter) return false

      if (s) {
        const matchingItems = cat.items.filter(item =>
          item.toLowerCase().includes(s)
        )
        if (matchingItems.length === 0) return false
        return {
          ...cat,
          items: matchingItems,
          count: matchingItems.length
        }
      }
      return true
    })
    .map(cat => ({
      ...cat,
      count: cat.items.length
    }))
}

const isInQuickAccess = (itemName: string) =>
  quickAccessItems.value.some(qa => qa.label === itemName)

const addToQuickAccess = (item: { name: string; icon?: string; page?: string }) => {
  if (isInQuickAccess(item.name)) return

  quickAccessItems.value.push({
    id: Date.now(),
    label: item.name,
    icon: item.icon || 'mdi-cube',
    page: item.page || 'eservices'
  })
}

const removeQuickAccess = (id: number) => {
  quickAccessItems.value = quickAccessItems.value.filter(qa => qa.id !== id)
}

const reorderQuickAccess = (fromIndex: number, toIndex: number) => {
  if (fromIndex === toIndex) return
  if (fromIndex < 0 || toIndex < 0) return
  if (fromIndex >= quickAccessItems.value.length) return
  if (toIndex >= quickAccessItems.value.length) return

  const items = [...quickAccessItems.value]
  const [dragged] = items.splice(fromIndex, 1)
  items.splice(toIndex, 0, dragged)
  quickAccessItems.value = items
}

const resetQuickAccess = () => {
  quickAccessItems.value = [...defaultQuickAccess]
  localStorage.removeItem(STORAGE_KEY)
}

const loadFromStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return

  try {
    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed) && parsed.length > 0) {
      quickAccessItems.value = parsed
    }
  } catch (e) {
    console.error('Failed to load quick access from localStorage')
  }
}

watch(quickAccessItems, (newItems) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
}, { deep: true })

loadFromStorage()

export const useQuickAccess = () => ({
  quickAccessItems,
  categories,
  categoryOptions,
  filterCategories,
  isInQuickAccess,
  addToQuickAccess,
  removeQuickAccess,
  reorderQuickAccess,
  resetQuickAccess
})
