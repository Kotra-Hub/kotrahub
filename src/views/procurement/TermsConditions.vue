<template>
  <v-container fluid class="pa-6">

    <!-- =========================================================
         BREADCRUMB
         ========================================================= -->
    <div class="d-flex align-center ga-2 mb-6">
      <v-icon size="20">
        mdi-cart-outline
      </v-icon>

      <span class="text-body-2 text-medium-emphasis">
        Procurement
      </span>

      <v-icon
        size="18"
        color="grey"
      >
        mdi-chevron-right
      </v-icon>

      <span class="text-body-2 font-weight-medium">
        Terms & Conditions
      </span>
    </div>

    <!-- =========================================================
         HEADER
         ========================================================= -->
    <div
      class="d-flex flex-wrap align-center justify-space-between ga-4 mb-6"
    >
      <div>
        <h1 class="text-h5 font-weight-bold mb-1">
          Terms & Conditions
        </h1>

        <p class="text-body-2 text-medium-emphasis mb-0">
          Manage procurement terms and conditions applied to purchase orders.
        </p>
      </div>

      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        rounded="lg"
        @click="openNewTerm"
      >
        New
      </v-btn>
    </div>

    <!-- =========================================================
         SUMMARY CARDS
         ========================================================= -->
    <v-row class="mb-2">

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Total Terms"
          :value="totalTerms"
          icon="mdi-file-document-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Mandatory"
          :value="mandatoryTerms"
          icon="mdi-alert-circle-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Optional"
          :value="optionalTerms"
          icon="mdi-information-outline"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <AppSummaryCard
          title="Categories"
          :value="applicableCategories"
          icon="mdi-shape-outline"
        />
      </v-col>

    </v-row>

    <!-- =========================================================
         MAIN CARD
         ========================================================= -->
    <v-card
      border
      rounded="xl"
      elevation="0"
    >

      <!-- Header -->
      <div class="pa-5">

        <div
          class="d-flex flex-wrap align-center justify-space-between ga-4"
        >
          <div>
            <h2 class="text-subtitle-1 font-weight-bold">
              Procurement Terms
            </h2>

            <p class="text-body-2 text-medium-emphasis mb-0">
              Search, view and manage procurement terms and conditions.
            </p>
          </div>

          <!-- FILTER -->
          <v-menu
            v-model="filterMenu"
            :close-on-content-click="false"
            location="bottom end"
          >
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                variant="outlined"
                prepend-icon="mdi-filter-variant"
                append-icon="mdi-chevron-down"
                rounded="lg"
              >
                Filter

                <v-badge
                  v-if="activeFilterCount > 0"
                  :content="activeFilterCount"
                  color="primary"
                  inline
                  class="ml-2"
                />
              </v-btn>
            </template>

            <v-card
              width="340"
              rounded="lg"
              elevation="4"
              class="pa-4"
            >

              <div
                class="d-flex align-center justify-space-between mb-4"
              >
                <span class="text-subtitle-2 font-weight-bold">
                  Filter Terms
                </span>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  size="small"
                  @click="filterMenu = false"
                />
              </div>

              <v-select
                v-model="filters.applicableFor"
                label="Applicable For"
                :items="applicableForOptions"
                variant="outlined"
                density="comfortable"
                clearable
                class="mb-3"
              />

              <v-select
                v-model="filters.mandatory"
                label="Requirement"
                :items="mandatoryOptions"
                item-title="title"
                item-value="value"
                variant="outlined"
                density="comfortable"
                clearable
              />

              <div class="d-flex justify-end ga-2 mt-4">

                <v-btn
                  variant="text"
                  @click="clearFilters"
                >
                  Clear
                </v-btn>

                <v-btn
                  color="primary"
                  @click="filterMenu = false"
                >
                  Apply
                </v-btn>

              </div>

            </v-card>
          </v-menu>
        </div>

        <!-- Search -->
        <v-text-field
          v-model="search"
          class="mt-5"
          prepend-inner-icon="mdi-magnify"
          label="Search terms and conditions"
          placeholder="Search by title, description, applicability..."
          variant="outlined"
          density="comfortable"
          clearable
          hide-details
        />

      </div>

      <v-divider />

      <!-- =======================================================
           TERMS LIST
           ======================================================= -->
      <div class="pa-5">

        <v-expansion-panels
          v-if="filteredTerms.length"
          variant="accordion"
          multiple
        >

          <v-expansion-panel
            v-for="(term, index) in filteredTerms"
            :key="term.id"
            class="term-panel"
          >

            <!-- TITLE -->
            <v-expansion-panel-title>

              <div class="d-flex align-center w-100 ga-3">

                <v-avatar
                  size="38"
                  color="primary"
                  variant="tonal"
                >
                  <span class="text-caption font-weight-bold">
                    {{ String(index + 1).padStart(2, "0") }}
                  </span>
                </v-avatar>

                <div class="flex-grow-1">

                  <div class="font-weight-medium">
                    {{ term.title }}
                  </div>

                  <div class="text-caption text-medium-emphasis">
                    Applicable for: {{ term.applicableFor }}
                  </div>

                </div>

                <div class="d-flex align-center ga-2 mr-3">

                  <v-chip
                    v-if="term.mandatory"
                    color="error"
                    size="small"
                    variant="tonal"
                  >
                    Mandatory
                  </v-chip>

                  <v-chip
                    v-else
                    color="grey"
                    size="small"
                    variant="tonal"
                  >
                    Optional
                  </v-chip>

                </div>

              </div>

            </v-expansion-panel-title>

            <!-- CONTENT -->
            <v-expansion-panel-text>

              <div class="term-content">

                <div class="text-body-2 text-medium-emphasis">
                  {{ term.description }}
                </div>

                <v-divider class="my-4" />

                <div
                  class="d-flex flex-wrap align-center justify-space-between ga-3"
                >

                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Applicability
                    </div>

                    <div class="text-body-2 font-weight-medium">
                      {{ term.applicableFor }}
                    </div>
                  </div>

                  <div>
                    <div class="text-caption text-medium-emphasis">
                      Requirement
                    </div>

                    <v-chip
                      :color="
                        term.mandatory
                          ? 'error'
                          : 'grey'
                      "
                      size="small"
                      variant="tonal"
                    >
                      {{
                        term.mandatory
                          ? "Mandatory"
                          : "Optional"
                      }}
                    </v-chip>
                  </div>

                  <div class="d-flex ga-2">

                    <v-btn
                      variant="text"
                      size="small"
                      prepend-icon="mdi-pencil-outline"
                      @click="editTerm(term)"
                    >
                      Edit
                    </v-btn>

                    <v-btn
                      variant="text"
                      size="small"
                      color="error"
                      prepend-icon="mdi-delete-outline"
                      @click="deleteTerm(term)"
                    >
                      Delete
                    </v-btn>

                  </div>

                </div>

              </div>

            </v-expansion-panel-text>

          </v-expansion-panel>

        </v-expansion-panels>

        <!-- NO DATA -->
        <div
          v-else
          class="text-center pa-10"
        >

          <v-icon
            size="52"
            color="grey"
            class="mb-3"
          >
            mdi-file-document-off-outline
          </v-icon>

          <div class="text-body-1 font-weight-medium">
            No Terms & Conditions found
          </div>

          <div class="text-body-2 text-medium-emphasis mt-1">
            Try changing your search or filter.
          </div>

        </div>

      </div>

    </v-card>

    <!-- =========================================================
         ADD / EDIT TERM DIALOG
         ========================================================= -->
    <v-dialog
      v-model="termDialog"
      max-width="650"
    >
      <v-card rounded="xl">

        <v-card-title class="pa-5 d-flex align-center">

          <div>
            <div class="text-subtitle-1 font-weight-bold">
              {{
                editingTermId
                  ? "Edit Terms & Conditions"
                  : "Add Terms & Conditions"
              }}
            </div>

            <div class="text-caption text-medium-emphasis mt-1">
              Define a procurement term and its applicability.
            </div>
          </div>

          <v-spacer />

          <v-btn
            icon="mdi-close"
            variant="text"
            size="small"
            @click="closeTermDialog"
          />

        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <!-- Applicability -->
          <v-select
            v-model="termForm.applicableFor"
            label="Applicable for *"
            :items="applicableForOptions"
            variant="outlined"
            density="comfortable"
            clearable
            class="mb-4"
          />

          <!-- Title -->
          <v-text-field
            v-model="termForm.title"
            label="Title *"
            placeholder="e.g. Purchase Order Acceptance"
            variant="outlined"
            density="comfortable"
            class="mb-4"
          />

          <!-- Description -->
          <v-textarea
            v-model="termForm.description"
            label="Description *"
            variant="outlined"
            density="comfortable"
            rows="6"
            maxlength="2000"
            hide-details
            placeholder="Enter terms and conditions..."
          />

          <div class="text-caption text-medium-emphasis mt-2">
            {{ termDescriptionWordCount }} words |
            {{ termForm.description.length }} / 2000 characters
          </div>

          <!-- Mandatory -->
          <v-checkbox
            v-model="termForm.mandatory"
            label="Is Mandatory?"
            hide-details
            class="mt-4"
          />

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="closeTermDialog"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            rounded="lg"
            prepend-icon="mdi-content-save-outline"
            @click="saveTerm"
          >
            {{
              editingTermId
                ? "Save Changes"
                : "Save"
            }}
          </v-btn>

        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- =========================================================
         DELETE CONFIRMATION DIALOG
         ========================================================= -->
    <v-dialog
      v-model="deleteDialog"
      max-width="450"
    >
      <v-card rounded="xl">

        <v-card-title class="pa-5">
          <div class="d-flex align-center ga-3">

            <v-avatar
              size="42"
              color="error"
              variant="tonal"
            >
              <v-icon>
                mdi-delete-outline
              </v-icon>
            </v-avatar>

            <div>
              <div class="text-subtitle-1 font-weight-bold">
                Delete Terms & Conditions
              </div>

              <div class="text-caption text-medium-emphasis">
                This action cannot be undone.
              </div>
            </div>

          </div>
        </v-card-title>

        <v-divider />

        <v-card-text class="pa-5">

          <div class="text-body-2">
            Are you sure you want to delete
            <strong>
              {{ selectedTerm?.title }}
            </strong>
            ?
          </div>

        </v-card-text>

        <v-divider />

        <v-card-actions class="pa-4">

          <v-spacer />

          <v-btn
            variant="outlined"
            rounded="lg"
            @click="deleteDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error"
            rounded="lg"
            prepend-icon="mdi-delete-outline"
            @click="confirmDeleteTerm"
          >
            Delete
          </v-btn>

        </v-card-actions>

      </v-card>
    </v-dialog>

    <!-- =========================================================
         SNACKBAR
         ========================================================= -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :color="snackbarColor"
    >

      {{ snackbarMessage }}

      <template #actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>

    </v-snackbar>

  </v-container>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
} from "vue"

import AppSummaryCard from "@/components/common/AppSummaryCard.vue"

import {
  useTermsConditions,
  type TermItem,
} from "@/composables/useTermsConditions"

/* */

const {
  terms,
  applicableForOptions,
  totalTerms,
  mandatoryTerms,
  optionalTerms,
  applicableCategories,
  addTerm,
  updateTerm,
  removeTerm,
} = useTermsConditions()

/* */

const search = ref("")

const filterMenu = ref(false)

const termDialog = ref(false)

const deleteDialog = ref(false)

const editingTermId = ref<string | null>(null)

const selectedTerm = ref<TermItem | null>(null)

const snackbar = ref(false)

const snackbarMessage = ref("")

const snackbarColor = ref("success")

/* */

const filters = ref({
  applicableFor: null as string | null,
  mandatory: null as boolean | null,
})

const mandatoryOptions = [
  {
    title: "Mandatory",
    value: true,
  },
  {
    title: "Optional",
    value: false,
  },
]

/* */

interface TermForm {
  applicableFor: string
  title: string
  description: string
  mandatory: boolean
}

function createEmptyTermForm(): TermForm {
  return {
    applicableFor: "All Purchase Orders",
    title: "",
    description: "",
    mandatory: false,
  }
}

const termForm = ref<TermForm>(
  createEmptyTermForm(),
)

/* */

const activeFilterCount = computed(() => {
  return Object.values(filters.value)
    .filter(
      (value) =>
        value !== null &&
        value !== "",
    )
    .length
})

const filteredTerms = computed(() => {
  const keyword = search.value
    .trim()
    .toLowerCase()

  return terms.value.filter((term) => {

    const matchesSearch =
      !keyword ||
      [
        term.title,
        term.description,
        term.applicableFor,
        term.mandatory
          ? "mandatory"
          : "optional",
      ].some((value) =>
        value
          .toLowerCase()
          .includes(keyword),
      )

    const matchesApplicableFor =
      !filters.value.applicableFor ||
      term.applicableFor ===
        filters.value.applicableFor

    const matchesMandatory =
      filters.value.mandatory === null ||
      term.mandatory ===
        filters.value.mandatory

    return (
      matchesSearch &&
      matchesApplicableFor &&
      matchesMandatory
    )
  })
})

const termDescriptionWordCount = computed(() => {
  return countWords(
    termForm.value.description,
  )
})

/* */

watch(
  [
    search,
    () => filters.value.applicableFor,
    () => filters.value.mandatory,
  ],
  () => {
    // Reserved for pagination / server-side filtering
    // if added later.
  },
)

/* */

function countWords(value: string) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 0
  }

  return trimmed.split(/\s+/).length
}

function showSnackbar(
  message: string,
  color = "success",
) {
  snackbarMessage.value = message
  snackbarColor.value = color
  snackbar.value = true
}

/* */

function clearFilters() {
  filters.value = {
    applicableFor: null,
    mandatory: null,
  }
}

/* */

function openNewTerm() {
  editingTermId.value = null
  termForm.value = createEmptyTermForm()
  termDialog.value = true
}

function closeTermDialog() {
  termDialog.value = false
  editingTermId.value = null
  termForm.value = createEmptyTermForm()
}

function editTerm(term: TermItem) {
  editingTermId.value = term.id

  termForm.value = {
    applicableFor:
      term.applicableFor,

    title:
      term.title,

    description:
      term.description,

    mandatory:
      term.mandatory,
  }

  termDialog.value = true
}

/* */

function saveTerm() {
  if (
    !termForm.value.applicableFor
  ) {
    showSnackbar(
      "Please select the applicable category.",
      "error",
    )

    return
  }

  if (
    !termForm.value.title.trim()
  ) {
    showSnackbar(
      "Please enter a title.",
      "error",
    )

    return
  }

  if (
    !termForm.value.description.trim()
  ) {
    showSnackbar(
      "Please enter a description.",
      "error",
    )

    return
  }

  if (
    termForm.value.description.length >
    2000
  ) {
    showSnackbar(
      "Description cannot exceed 2000 characters.",
      "error",
    )

    return
  }

  const payload = {
    applicableFor:
      termForm.value.applicableFor,

    title:
      termForm.value.title.trim(),

    description:
      termForm.value.description.trim(),

    mandatory:
      termForm.value.mandatory,
  }

  /* */

  if (editingTermId.value) {
    const updated = updateTerm(
      editingTermId.value,
      payload,
    )

    if (!updated) {
      showSnackbar(
        "Unable to update the term.",
        "error",
      )

      return
    }

    showSnackbar(
      "Terms & Conditions updated successfully.",
    )

    closeTermDialog()

    return
  }

  /* */

  const newTerm = addTerm(payload)

  if (!newTerm) {
    showSnackbar(
      "Unable to add the term.",
      "error",
    )

    return
  }

  showSnackbar(
    "Terms & Conditions added successfully.",
  )

  closeTermDialog()
}

/* */

function deleteTerm(term: TermItem) {
  selectedTerm.value = term
  deleteDialog.value = true
}

function confirmDeleteTerm() {
  if (!selectedTerm.value) {
    return
  }

  const deleted = removeTerm(
    selectedTerm.value.id,
  )

  if (!deleted) {
    showSnackbar(
      "Unable to delete the term.",
      "error",
    )

    deleteDialog.value = false

    return
  }

  showSnackbar(
    "Terms & Conditions deleted successfully.",
  )

  selectedTerm.value = null
  deleteDialog.value = false
}
</script>

<style scoped>
.term-panel {
  border: 1px solid #e0e0e0 !important;
  margin-bottom: 10px;
  border-radius: 12px !important;
  overflow: hidden;
}

.term-panel:last-child {
  margin-bottom: 0;
}

.term-content {
  padding: 4px 0 8px;
}

@media (max-width: 700px) {
  .term-content .d-flex {
    align-items: flex-start !important;
  }
}
</style>