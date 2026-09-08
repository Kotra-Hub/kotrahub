<!-- src\components\LoadingOverlay.vue -->
<template>
  <v-overlay v-model="visible" class="align-center justify-center" scrim="rgba(15, 23, 42, 0.28)">
    <v-card class="pa-6 pa-sm-8 text-center" max-width="320" rounded="xl"
      style="background: rgba(255,255,255,0.96); backdrop-filter: blur(10px);">
      <div class="d-flex justify-center mb-4">
        <div class="loader-wrapper">
          <v-progress-circular :size="72" :width="5" color="#0f9d9a" indeterminate></v-progress-circular>
          <div class="loader-logo">
            <img src="@/assets/images/kotra.png" alt="Kotra" class="logo-image" />
          </div>
        </div>
      </div>
      <div class="text-h6 font-weight-bold text-grey-darken-4">{{ title }}</div>
      <p class="text-body-2 text-grey mt-1">{{ message }}</p>
      <p class="text-caption text-grey-lighten-1 mt-1">Please wait a moment...</p>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue?: boolean
  title?: string
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: 'Loading',
  message: 'Preparing Kotra Hub...'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const visible = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
})

watch(visible, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<style scoped>
.loader-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.loader-logo {
  position: absolute;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.logo-image {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

@media (max-width: 400px) {
  .loader-logo {
    width: 40px;
    height: 40px;
    border-radius: 12px;
  }
}
</style>
