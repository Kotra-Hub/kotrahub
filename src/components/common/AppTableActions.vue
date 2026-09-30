<script setup lang="ts">
const emit = defineEmits<{
  view: []
  edit: []
  remove: []
}>()
</script>

<template>
  <div>
    <v-btn icon="mdi-eye" variant="text" @click="emit('view')" />
    <v-btn icon="mdi-pencil" variant="text" @click="emit('edit')" />
    <v-btn icon="mdi-delete" variant="text" @click="emit('remove')" />
  </div>
</template>
