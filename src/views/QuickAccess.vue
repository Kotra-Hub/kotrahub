<!-- src/views/QuickAccess.vue -->
<template>
  <div class="quick-access-page">
    <!-- HEADER SECTION -->
    <div class="page-header d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
      <div class="d-flex align-center ga-3">
        <v-avatar size="48" rounded="lg" color="primary" variant="tonal">
          <v-icon size="24" color="primary">mdi-lightning-bolt</v-icon>
        </v-avatar>
        <div>
          <h1 class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            Quick Access
          </h1>
          <p class="text-body-2 text-medium-emphasis mt-0 mb-0">
            Manage your frequently used shortcuts
          </p>
        </div>
      </div>
      <v-btn
        variant="outlined"
        rounded="lg"
        color="primary"
        prepend-icon="mdi-arrow-left"
        @click="$emit('navigate', 'dashboard')"
      >
        Back
      </v-btn>
    </div>

    <!-- TABS -->
    <div class="tabs-container">
      <button
        @click="qaTab = 'my'"
        class="tab-btn"
        :class="qaTab === 'my' ? 'tab-active' : 'tab-inactive'"
      >
        <v-icon size="18" class="mr-1">mdi-star</v-icon>My Quick Access
      </button>
      <button
        @click="qaTab = 'all'"
        class="tab-btn"
        :class="qaTab === 'all' ? 'tab-active' : 'tab-inactive'"
      >
        <v-icon size="18" class="mr-1">mdi-view-grid</v-icon>View All Access
      </button>
    </div>

    <!-- MY QUICK ACCESS TAB -->
    <div v-show="qaTab === 'my'">
      <div class="d-flex align-center justify-space-between mb-3">
        <span class="my-qa-count">
          My Quick Access ({{ quickAccessItems.length }} items)
        </span>
      </div>

      <v-card class="qa-list-wrapper rounded-xl" elevation="0" border>
        <div
          v-for="(qa, index) in quickAccessItems"
          :key="qa.id"
          draggable="true"
          @dragstart="onDragStart($event, index)"
          @dragover="onDragOver($event)"
          @drop="onDrop($event, index)"
          @dragend="onDragEnd"
          class="qa-item d-flex align-center px-4 py-3"
          :class="{
            'border-bottom': index < quickAccessItems.length - 1,
            'dragging': dragIndex === index
          }"
          style="border-color: rgba(var(--v-theme-on-surface), 0.06); cursor: move; transition: background 0.15s ease; gap: 18px;"
        >
          <!-- Drag Handle -->
          <div class="drag-handle text-center">
            <v-icon size="20" color="text-secondary">mdi-drag-vertical</v-icon>
          </div>

          <!-- Index -->
          <div class="index-number text-center">
            {{ index + 1 }}
          </div>

          <!-- Icon -->
          <div class="qa-icon-wrapper">
            <v-icon size="22" color="primary">{{ qa.icon }}</v-icon>
          </div>

          <!-- Label -->
          <div class="flex-grow-1">
            <span class="qa-label">
              {{ qa.label }}
            </span>
          </div>

          <!-- Remove Button -->
          <button
            @click.stop="removeQuickAccess(qa.id)"
            class="remove-btn"
          >
            <v-icon size="18">mdi-delete</v-icon>
          </button>
        </div>
      </v-card>

      <!-- Info Message -->
      <div class="info-message">
        <v-icon size="18" color="primary" class="mr-1">mdi-information</v-icon>
        Drag and drop to reorder. The first 9 items will be displayed in the main quick access section.
      </div>
    </div>

    <!-- VIEW ALL ACCESS TAB -->
    <div v-show="qaTab === 'all'">
      <!-- Search & Filter -->
      <v-card class="rounded-xl mb-4" elevation="0" border>
        <v-card-text class="pa-4">
          <v-row dense align="center">
            <v-col cols="12" md="6" lg="7">
              <v-text-field
                v-model="viewAllSearch"
                density="comfortable"
                variant="outlined"
                placeholder="Search applications..."
                prepend-inner-icon="mdi-magnify"
                hide-details
                clearable
                rounded="lg"
                class="search-field"
              />
            </v-col>
            <v-col cols="12" md="6" lg="5">
              <div class="d-flex flex-wrap align-center ga-2">
                <v-select
                  v-model="viewAllCategory"
                  :items="categoryOptions"
                  density="comfortable"
                  variant="outlined"
                  placeholder="All Categories"
                  hide-details
                  rounded="lg"
                  class="filter-select"
                  style="min-width: 180px;"
                />
                <v-btn
                  variant="text"
                  color="primary"
                  rounded="lg"
                  size="default"
                  @click="resetCategoryFilter"
                >
                  <v-icon left size="18">mdi-restore</v-icon>
                  Reset
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Categories -->
      <div
        v-for="category in filteredCategories"
        :key="category.name"
        class="category-card mb-5 rounded-xl border overflow-hidden"
        style="border-color: rgba(var(--v-theme-on-surface), 0.06);"
      >
        <div class="category-header">
          <span class="category-name">{{ category.name }}</span>
          <span class="category-badge">
            Services Available: {{ category.count }}
          </span>
        </div>

        <div class="category-items">
          <div
            v-for="item in category.items"
            :key="item"
            class="all-access-item"
          >
            <div class="item-icon-wrapper">
              <v-icon size="20" color="primary">mdi-cube</v-icon>
            </div>
            <span class="item-label" :title="item">
              {{ item }}
            </span>

            <button
              v-if="!isInQuickAccess(item)"
              @click="addToQuickAccess({ name: item, icon: 'mdi-cube', page: 'eservices' })"
              class="add-btn"
            >
              + Add
            </button>
            <span
              v-else
              class="added-badge"
            >
              ✓ Added
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredCategories.length === 0" class="empty-state">
        <v-icon size="72" class="mb-3 opacity-50">mdi-magnify-off</v-icon>
        <div class="empty-title">No applications found</div>
        <div class="empty-subtitle">Try adjusting your search or filter</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// Emits
defineEmits<{
  (e: 'navigate', page: string): void
}>()

// Types
interface QuickAccessItem {
  id: number
  label: string
  icon: string
  page: string
}

interface Category {
  name: string
  count: number
  items: string[]
}

// State
const qaTab = ref<'my' | 'all'>('my')
const viewAllSearch = ref('')
const viewAllCategory = ref('')
const dragIndex = ref<number | null>(null)

// Quick Access Items
const quickAccessItems = ref<QuickAccessItem[]>([
  { id: 1, label: 'Staff Purchase', icon: 'mdi-cart', page: 'eservices' },
  { id: 2, label: 'Training Record', icon: 'mdi-school', page: 'eservices' },
  { id: 3, label: 'PO Management', icon: 'mdi-file-document-outline', page: 'eservices' },
  { id: 4, label: 'Material Management', icon: 'mdi-package-variant', page: 'eservices' },
  { id: 5, label: 'Sales Automation', icon: 'mdi-chart-bar', page: 'eservices' },
  { id: 6, label: 'AP Management', icon: 'mdi-account-group', page: 'eservices' },
  { id: 7, label: 'Work Order', icon: 'mdi-wrench', page: 'eservices' },
  { id: 8, label: 'TSR', icon: 'mdi-clipboard-list', page: 'eservices' },
  { id: 9, label: 'Easy Loader', icon: 'mdi-upload', page: 'eservices' }
])

// Categories
const categories = ref<Category[]>([
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

// Category Options for Select
const categoryOptions = computed(() => {
  const options = [{ title: 'All Categories', value: '' }]
  categories.value.forEach(cat => {
    options.push({ title: cat.name, value: cat.name })
  })
  return options
})

// Computed
const filteredCategories = computed(() => {
  const search = viewAllSearch.value.toLowerCase().trim()
  const categoryFilter = viewAllCategory.value

  return categories.value
    .filter(cat => {
      if (categoryFilter && cat.name !== categoryFilter) return false

      if (search) {
        const matchingItems = cat.items.filter(item =>
          item.toLowerCase().includes(search)
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
})

// Check if item is in Quick Access
const isInQuickAccess = (itemName: string) => {
  return quickAccessItems.value.some(qa => qa.label === itemName)
}

// Add item to Quick Access
const addToQuickAccess = (item: { name: string; icon: string; page: string }) => {
  if (isInQuickAccess(item.name)) return

  quickAccessItems.value.push({
    id: Date.now(),
    label: item.name,
    icon: item.icon || 'mdi-cube',
    page: item.page || 'eservices'
  })
}

// Remove item from Quick Access
const removeQuickAccess = (id: number) => {
  quickAccessItems.value = quickAccessItems.value.filter(qa => qa.id !== id)
}

// Reset Category Filter
const resetCategoryFilter = () => {
  viewAllCategory.value = ''
  viewAllSearch.value = ''
}

// Drag and Drop Handlers
const onDragStart = (event: DragEvent, index: number) => {
  dragIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const onDrop = (event: DragEvent, dropIndex: number) => {
  event.preventDefault()

  if (dragIndex.value === null || dragIndex.value === dropIndex) {
    dragIndex.value = null
    return
  }

  const items = [...quickAccessItems.value]
  const [draggedItem] = items.splice(dragIndex.value, 1)
  items.splice(dropIndex, 0, draggedItem)
  quickAccessItems.value = items
  dragIndex.value = null
}

const onDragEnd = () => {
  dragIndex.value = null
}

// Save to localStorage
watch(quickAccessItems, (newItems) => {
  localStorage.setItem('quickAccess', JSON.stringify(newItems))
}, { deep: true })

onMounted(() => {
  const saved = localStorage.getItem('quickAccess')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed.length > 0) {
        quickAccessItems.value = parsed
      }
    } catch (e) {
      console.error('Failed to load quick access from localStorage')
    }
  }
})
</script>

<style scoped>
.quick-access-page {
  width: 100%;
  padding: 16px 0;
}

.page-header {
  width: 100%;
}

/* Tabs */
.tabs-container {
  display: flex;
  gap: 0;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  margin-bottom: 20px;
}

.tab-btn {
  padding: 12px 0 14px 0;
  margin-right: 28px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  color: #94a3b8;
}

.tab-btn::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  border-radius: 2px;
  background: transparent;
  transition: all 0.2s ease;
}

.tab-active {
  color: rgb(var(--v-theme-primary));
}

.tab-active::after {
  background: rgb(var(--v-theme-primary));
}

.tab-inactive:hover {
  color: rgb(var(--v-theme-on-surface));
}

/* My Quick Access */
.my-qa-count {
  font-size: 16px;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface));
}

.qa-list-wrapper {
  background: rgb(var(--v-theme-surface));
}

.qa-item {
  padding: 16px 20px !important;
  background: rgb(var(--v-theme-surface));
  min-height: 70px;
}

.qa-item:hover {
  background: rgba(0, 0, 0, 0.02);
}

.dark .qa-item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.qa-item.dragging {
  opacity: 0.5;
}

.qa-item .border-bottom {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06);
}

.drag-handle {
  width: 26px;
  color: #94a3b8;
  flex-shrink: 0;
}

.index-number {
  width: 34px;
  font-size: 16px;
  font-weight: 600;
  color: #94a3b8;
  flex-shrink: 0;
  text-align: center;
}

.qa-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--v-theme-primary), 0.08);
  flex-shrink: 0;
}

.qa-label {
  font-size: 16px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  padding-left: 4px;
}

.remove-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(244, 63, 94, 0.08);
  color: #f43f5e;
  cursor: pointer;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.remove-btn:hover {
  background: rgba(244, 63, 94, 0.18) !important;
}

/* Info Message */
.info-message {
  margin-top: 16px;
  padding: 14px 18px;
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  font-size: 14px;
  color: #64748b;
  background: rgba(var(--v-theme-on-surface), 0.02);
}

.dark .info-message {
  color: #94a3b8;
}

/* Search & Filter */
.search-field :deep(.v-field) {
  border-radius: 12px !important;
}

.search-field :deep(.v-field__input) {
  font-size: 15px !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
}

.filter-select :deep(.v-field) {
  border-radius: 12px !important;
  min-height: 44px !important;
}

.filter-select :deep(.v-field__input) {
  font-size: 14px !important;
  padding-top: 6px !important;
  padding-bottom: 6px !important;
}

/* Category Cards */
.category-card {
  background: rgb(var(--v-theme-surface));
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  background: rgba(var(--v-theme-on-surface), 0.02);
  flex-wrap: wrap;
  gap: 10px;
}

.category-name {
  font-weight: 700;
  font-size: 17px;
  color: rgba(var(--v-theme-on-surface));
}

.category-badge {
  padding: 6px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 700;
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
  white-space: nowrap;
}

.category-items {
  padding: 16px;
  display: grid;
  gap: 10px;
}

/* Responsive Grid - More columns with better width distribution */
@media (max-width: 575px) {
  .category-items {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .category-items {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .category-items {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .category-items {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1200px) and (max-width: 1399px) {
  .category-items {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (min-width: 1400px) {
  .category-items {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

/* All Access Item */
.all-access-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 14px;
  min-height: 58px;
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.06);
  background: rgb(var(--v-theme-surface));
  transition: all 0.2s ease;
  width: 100%;
}

.all-access-item:hover {
  border-color: rgba(var(--v-theme-primary), 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.dark .all-access-item:hover {
  border-color: rgba(15, 157, 154, 0.4);
}

.item-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(var(--v-theme-primary), 0.08);
}

.item-label {
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(var(--v-theme-on-surface));
}

.add-btn {
  padding: 5px 14px;
  border-radius: 8px;
  border: 1px solid rgba(var(--v-theme-primary), 0.3);
  font-size: 12px;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 56px;
}

.add-btn:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}

.added-badge {
  padding: 5px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  background: rgba(var(--v-theme-success), 0.1);
  color: rgb(var(--v-theme-success));
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 56px;
  text-align: center;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 0;
  color: #94a3b8;
}

.dark .empty-state {
  color: #64748b;
}

.empty-title {
  font-size: 22px;
  font-weight: 700;
}

.empty-subtitle {
  font-size: 16px;
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
  }

  .page-header .v-btn {
    align-self: flex-start;
  }

  .tab-btn {
    font-size: 14px;
    margin-right: 18px;
    padding: 10px 0 12px 0;
  }

  .qa-item {
    padding: 12px 16px !important;
    min-height: 60px;
    gap: 14px !important;
  }

  .qa-icon-wrapper {
    width: 38px;
    height: 38px;
  }

  .qa-icon-wrapper .v-icon {
    font-size: 18px !important;
  }

  .qa-label {
    font-size: 15px;
  }

  .drag-handle {
    width: 22px;
  }

  .index-number {
    width: 28px;
    font-size: 15px;
  }

  .all-access-item {
    min-height: 52px;
    padding: 0 12px;
    gap: 10px;
  }

  .item-icon-wrapper {
    width: 32px;
    height: 32px;
  }

  .item-icon-wrapper .v-icon {
    font-size: 16px !important;
  }

  .item-label {
    font-size: 13px;
  }

  .add-btn {
    padding: 4px 12px;
    font-size: 11px;
    min-width: 48px;
  }

  .added-badge {
    padding: 4px 12px;
    font-size: 11px;
    min-width: 48px;
  }

  .category-header {
    padding: 14px 18px;
  }

  .category-name {
    font-size: 16px;
  }

  .category-badge {
    font-size: 12px;
    padding: 4px 12px;
  }

  .category-items {
    padding: 12px;
    gap: 8px;
  }

  .filter-select {
    min-width: 130px !important;
    flex: 1 1 auto;
  }
}

@media (max-width: 480px) {
  .qa-item {
    padding: 10px 14px !important;
    min-height: 52px;
    gap: 12px !important;
  }

  .drag-handle .v-icon {
    font-size: 18px !important;
  }

  .index-number {
    font-size: 14px;
    width: 24px;
  }

  .qa-icon-wrapper {
    width: 32px;
    height: 32px;
  }

  .qa-icon-wrapper .v-icon {
    font-size: 16px !important;
  }

  .qa-label {
    font-size: 14px;
  }

  .remove-btn {
    width: 32px;
    height: 32px;
  }

  .remove-btn .v-icon {
    font-size: 16px !important;
  }

  .all-access-item {
    min-height: 46px;
    padding: 0 10px;
    gap: 8px;
  }

  .item-icon-wrapper {
    width: 28px;
    height: 28px;
  }

  .item-icon-wrapper .v-icon {
    font-size: 14px !important;
  }

  .item-label {
    font-size: 12px;
  }

  .add-btn {
    padding: 3px 10px;
    font-size: 10px;
    min-width: 42px;
  }

  .added-badge {
    padding: 3px 10px;
    font-size: 10px;
    min-width: 42px;
  }

  .info-message {
    font-size: 13px;
    padding: 12px 14px;
  }

  .tab-btn {
    font-size: 13px;
    margin-right: 14px;
    padding: 8px 0 10px 0;
  }

  .empty-title {
    font-size: 20px;
  }

  .empty-subtitle {
    font-size: 14px;
  }

  .category-header {
    padding: 12px 14px;
  }

  .category-name {
    font-size: 15px;
  }

  .category-badge {
    font-size: 11px;
    padding: 4px 10px;
  }

  .category-items {
    padding: 10px;
    gap: 6px;
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(15, 157, 154, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(15, 157, 154, 0.5);
}
</style>
