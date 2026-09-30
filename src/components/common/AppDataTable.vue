<script setup lang="ts">

import { computed } from "vue"
import { useTheme } from "vuetify"

const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)

interface Header {
  title: string;
  key: string;
  sortable?: boolean;
}

interface TableItem {
  status?: 'Pending' | 'Approved' | 'Rejected' | string;
  [key: string]: unknown;
}

defineProps<{
  title: string;
  headers: Header[];
  items: TableItem[];
}>();
</script>

<template>
  <v-card>
    <v-card-title>{{ title }}</v-card-title>

    <v-data-table
      hover
      class="enterprise-data-table"
      :class="isDark ? 'table-dark' : 'table-light'"
      density="compact"
      :headers="headers"
      :items="items"
    >
      <template #item.status="{ item }">
        <slot name="status" :item="item" />
      </template>

      <template #item.actions="{ item }">
        <slot name="actions" :item="item" />
      </template>
    </v-data-table>
  </v-card>
</template>

