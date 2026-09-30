
<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
  icon: string
  trend?: string
}>()
</script>

<template>
  <v-card rounded="lg" elevation="1" border>
    <v-card-item>
      <template #prepend>
        <v-avatar size="42" variant="tonal" color="primary">
          <v-icon>{{ icon }}</v-icon>
        </v-avatar>
      </template>

      <v-card-subtitle>{{ title }}</v-card-subtitle>
      <v-card-title class="text-h5 font-weight-bold">
        {{ value }}
      </v-card-title>

      <small v-if="trend">{{ trend }}</small>
    </v-card-item>
  </v-card>
</template>
