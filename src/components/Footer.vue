<!-- src/components/Footer.vue -->
<template>
  <div id="kotra-footer-final" class="w-full py-3 text-center" :style="{
    backgroundColor: themeColors.surface,
    borderTop: `1px solid ${themeColors.border}`,
    color: themeColors.textMuted,
    fontSize: '0.875rem',
    lineHeight: '1.5rem'
  }">
    © {{ new Date().getFullYear() }} Kotra Pharma (M) Sdn Bhd (90082-V). All Rights Reserved.
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const themeColors = computed(() => theme.current.value.colors)
</script>

<style scoped>
#kotra-footer-final {
  width: 100%;
  flex-shrink: 0;
}
</style>
