<!-- src\components\LoadingOverlay.vue -->
<template>
  <v-overlay
    v-model="visible"
    class="align-center justify-center"
    scrim="rgba(15, 23, 42, 0.28)"
    persistent
  >
    <v-card
      class="pa-6 pa-sm-8 text-center"
      width="320"
      max-width="320"
      rounded="xl"
      elevation="8"
      style="background: rgba(255,255,255,0.96); backdrop-filter: blur(10px);"
    >
      <div class="d-flex justify-center mb-4">
        <div class="loader-wrapper">
          <v-progress-circular
            :size="80"
            :width="5"
            color="#0f9d9a"
            indeterminate
          ></v-progress-circular>
          <div class="loader-logo">
            <img src="@/assets/images/kotra.png" alt="Kotra" class="logo-image" />
          </div>
        </div>
      </div>

      <!-- Title-->
      <div class="text-h5 font-weight-bold text-grey-darken-4">
        Loading
      </div>

      <!-- Message -->
      <transition name="text-fade" mode="out-in">
        <p :key="message" class="text-subtitle-1 text-grey mt-2">
          {{ message }}
        </p>
      </transition>

      <div class="text-body-2 text-grey-lighten-1 mt-3">
        Please wait a moment...
      </div>
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
  message: ''
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
  width: 54px;
  height: 54px;
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

.text-fade-enter-active,
.text-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.text-fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.text-fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}

.v-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 400px) {
  .loader-logo {
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }

  .v-card {
    width: 280px !important;
    max-width: 280px !important;
  }
}
</style>
