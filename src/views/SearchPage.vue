<!-- src\views\SearchPage.vue -->
<template>
  <div class="search-page">
    <!-- HEADER SECTION -->
    <div class="page-header d-flex align-center justify-space-between flex-wrap ga-3 mb-4">
      <div class="d-flex align-center ga-3">
        <v-avatar size="48" rounded="lg" color="primary" variant="tonal">
          <v-icon size="24" color="primary">mdi-magnify</v-icon>
        </v-avatar>
        <div>
          <h1 class="text-h5 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            Search
          </h1>
          <p class="text-body-2 text-medium-emphasis mt-0 mb-0">
            Find apps, services, reports, and actions across KOTRAHUB.
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

    <!-- SEARCH + FILTERS CARD -->
    <v-card class="rounded-xl mb-4" elevation="0" border>
      <v-card-text class="pa-4">
        <v-row dense align="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model="searchQuery"
              density="compact"
              variant="outlined"
              placeholder="Search apps, services, actions..."
              prepend-inner-icon="mdi-magnify"
              hide-details
              clearable
              rounded="lg"
              autofocus
              class="search-field"
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="selectedCategory"
              :items="categoryOptions"
              density="compact"
              variant="outlined"
              label="Category"
              hide-details
              rounded="lg"
              class="filter-select"
            />
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="selectedSort"
              :items="sortOptions"
              density="compact"
              variant="outlined"
              label="Sort by"
              hide-details
              rounded="lg"
              class="filter-select"
            />
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-2">
          <v-btn variant="text" color="primary" rounded="lg" size="small" @click="resetFilters">
            <v-icon left size="16">mdi-restore</v-icon>
            Reset Filters
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- RESULTS HEADER -->
    <div class="d-flex align-center justify-space-between mb-3 flex-wrap gap-2">
      <div>
        <span class="text-subtitle-2 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
          {{ filteredResults.length }} result{{ filteredResults.length === 1 ? '' : 's' }} found
        </span>
        <span v-if="searchQuery" class="text-caption text-medium-emphasis ml-2">
          for "{{ searchQuery }}"
        </span>
      </div>
      <div class="d-flex align-center ga-2">
        <v-btn
          variant="text"
          size="small"
          color="primary"
          class="view-toggle-btn"
          rounded="lg"
          @click="viewMode = 'grid'"
          :style="viewMode === 'grid' ? 'background: rgba(var(--v-theme-primary), 0.1);' : ''"
        >
          <v-icon size="18" class="mr-1">mdi-view-grid</v-icon>
          Grid
        </v-btn>
        <v-btn
          variant="text"
          size="small"
          color="primary"
          class="view-toggle-btn"
          rounded="lg"
          @click="viewMode = 'list'"
          :style="viewMode === 'list' ? 'background: rgba(var(--v-theme-primary), 0.1);' : ''"
        >
          <v-icon size="18" class="mr-1">mdi-format-list-bulleted</v-icon>
          List
        </v-btn>
      </div>
    </div>

    <!-- EMPTY STATE -->
    <v-card v-if="filteredResults.length === 0" class="rounded-xl" elevation="0" border>
      <div class="d-flex flex-column align-center justify-center py-12" style="color: rgb(var(--v-theme-textMuted));">
        <v-icon size="64" class="mb-3 opacity-50">mdi-magnify-close</v-icon>
        <div class="text-h6 font-weight-bold">No results found</div>
        <div class="text-body-2 mb-4">Try a different keyword or reset your filters</div>
        <v-btn variant="tonal" color="primary" rounded="lg" @click="resetFilters">
          Reset Filters
        </v-btn>
      </div>
    </v-card>

    <!-- GRID VIEW (grouped by category) -->
    <div v-else-if="viewMode === 'grid'">
      <div v-for="(items, category) in groupedResults" :key="category" class="mb-6">
        <div class="d-flex align-center ga-2 mb-3">
          <v-icon size="18" color="primary">{{ categoryIcon(category) }}</v-icon>
          <span class="text-subtitle-1 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
            {{ category }}
          </span>
          <v-chip size="x-small" variant="tonal" color="primary" class="ml-1">
            {{ items.length }}
          </v-chip>
        </div>
        <v-row dense>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              class="rounded-lg result-grid-card"
              elevation="0"
              border
              @click="selectResult(item)"
              style="cursor: pointer;"
            >
              <v-card-text class="pa-4">
                <div class="d-flex align-center ga-3 mb-3">
                  <v-avatar size="44" rounded="lg" color="primary" variant="tonal">
                    <v-icon size="22" color="primary">{{ item.icon }}</v-icon>
                  </v-avatar>
                  <div class="flex-grow-1 overflow-hidden">
                    <div class="text-body-1 font-weight-bold text-truncate" style="color: rgb(var(--v-theme-on-surface));">
                      {{ item.label }}
                    </div>
                    <div class="text-caption text-medium-emphasis text-truncate">
                      {{ item.meta }}
                    </div>
                  </div>
                </div>
                <p v-if="item.description" class="text-caption text-medium-emphasis mb-0" style="line-height: 1.4;">
                  {{ item.description }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- LIST VIEW (grouped by category) -->
    <div v-else>
      <div v-for="(items, category) in groupedResults" :key="category" class="mb-4">
        <v-card class="rounded-xl" elevation="0" border>
          <div class="d-flex align-center ga-2 px-4 pt-4 pb-2">
            <v-icon size="18" color="primary">{{ categoryIcon(category) }}</v-icon>
            <span class="text-subtitle-2 font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
              {{ category }}
            </span>
            <v-chip size="x-small" variant="tonal" color="primary" class="ml-1">
              {{ items.length }}
            </v-chip>
          </div>
          <v-divider />
          <v-list density="compact" class="bg-transparent">
            <v-list-item
              v-for="item in items"
              :key="item.id"
              class="result-list-item"
              @click="selectResult(item)"
              style="cursor: pointer;"
            >
              <template #prepend>
                <v-avatar size="40" rounded="lg" color="primary" variant="tonal">
                  <v-icon size="20" color="primary">{{ item.icon }}</v-icon>
                </v-avatar>
              </template>
              <v-list-item-title class="font-weight-bold" style="color: rgb(var(--v-theme-on-surface));">
                {{ item.label }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <span class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                  {{ item.meta }}
                </span>
                <span v-if="item.description" class="text-caption" style="color: rgb(var(--v-theme-textMuted));">
                  • {{ item.description }}
                </span>
              </v-list-item-subtitle>
              <template #append>
                <v-icon size="18" color="primary" class="d-none d-md-flex">mdi-arrow-right</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getAllResults, type SearchItem } from '@/composables/useSearchData'

// Props — accept incoming query from Header
const props = defineProps<{
  initialQuery?: string
}>()

const emit = defineEmits<{
  (e: 'navigate', page: string): void
  (e: 'open-settings'): void
  (e: 'open-ai'): void
}>()

// State
const searchQuery = ref(props.initialQuery || '')
const selectedCategory = ref('All')
const selectedSort = ref('Relevance')
const viewMode = ref<'grid' | 'list'>('grid')

// Options
const categoryOptions = ['All', 'Navigation', 'Services', 'Reports', 'Actions']
const sortOptions = ['Relevance', 'A → Z', 'Z → A']

// Watch incoming prop
watch(() => props.initialQuery, (val) => {
  if (val !== undefined) searchQuery.value = val
})

const allResults = computed<SearchItem[]>(() => getAllResults(searchQuery.value))

// Filter + sort
const filteredResults = computed(() => {
  let results = allResults.value

  if (selectedCategory.value !== 'All') {
    results = results.filter(r => r.category === selectedCategory.value)
  }

  if (selectedSort.value === 'A → Z') {
    results = [...results].sort((a, b) => a.label.localeCompare(b.label))
  } else if (selectedSort.value === 'Z → A') {
    results = [...results].sort((a, b) => b.label.localeCompare(a.label))
  }

  return results
})

// Group by category
const groupedResults = computed(() => {
  const groups: Record<string, SearchItem[]> = {}
  filteredResults.value.forEach(item => {
    if (!groups[item.category]) groups[item.category] = []
    groups[item.category].push(item)
  })
  return groups
})

// Category icon
const categoryIcon = (category: string) => {
  switch (category) {
    case 'Navigation': return 'mdi-compass-outline'
    case 'Services': return 'mdi-apps'
    case 'Reports': return 'mdi-file-chart-outline'
    case 'Actions': return 'mdi-lightning-bolt-outline'
    default: return 'mdi-folder-outline'
  }
}

// Reset
const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'All'
  selectedSort.value = 'Relevance'
}

// Navigate
const selectResult = (item: SearchItem) => {
  if (item.id === 'settings') {
    emit('open-settings')
    return
  }
  if (item.id === 'ai-assistant') {
    emit('open-ai')
    return
  }
  emit('navigate', item.id)
}
</script>

<style scoped>
.search-page {
  width: 100%;
  padding: 16px 0;
}

.page-header {
  width: 100%;
}

.filter-select :deep(.v-field),
.search-field :deep(.v-field) {
  border-radius: 12px !important;
  min-height: 40px !important;
}

.view-toggle-btn {
  min-height: 36px !important;
  padding: 0 16px !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  transition: all 0.2s ease !important;
}

.view-toggle-btn:hover {
  background: rgba(var(--v-theme-primary), 0.05) !important;
}

/* Grid card */
.result-grid-card {
  border: 1.5px solid rgba(var(--v-theme-on-surface), 0.08) !important;
  background: rgb(var(--v-theme-surface)) !important;
  transition: all 0.2s ease !important;
  height: 100% !important;
}

.result-grid-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.3) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
}

/* List item */
.result-list-item {
  min-height: 64px !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.06) !important;
  border-radius: 0 !important;
  transition: background 0.15s ease !important;
}

.result-list-item:last-child {
  border-bottom: none !important;
}

.result-list-item:hover {
  background: rgba(var(--v-theme-on-surface), 0.03) !important;
}

::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(15, 157, 154, 0.3); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(15, 157, 154, 0.5); }

/* Dark Mode */
:deep(.dark) .result-grid-card {
  background: #1e293b !important;
  border-color: rgba(255, 255, 255, 0.08) !important;
}
:deep(.dark) .result-grid-card:hover {
  border-color: rgba(15, 157, 154, 0.4) !important;
}
:deep(.dark) .result-list-item {
  border-color: rgba(255, 255, 255, 0.06) !important;
}
:deep(.dark) .result-list-item:hover {
  background: rgba(255, 255, 255, 0.03) !important;
}

/* Mobile */
@media (max-width: 767px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 12px;
  }
  .page-header .v-btn { align-self: flex-start; }
}

@media (max-width: 480px) {
  .text-h5 { font-size: 1.1rem !important; }
  .text-h6 { font-size: 0.95rem !important; }
}
</style>
