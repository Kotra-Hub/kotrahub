<!-- src\components\Footer.vue -->
<template>
  <div id="kotra-footer-final" class="w-full text-center" :style="{
    backgroundColor: themeColors.surface,
    borderTop: `1px solid ${themeColors.border}`,
    color: themeColors.textMuted,
    fontSize: '0.75rem',
    lineHeight: '32px'
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
  height: 32px;
  flex-shrink: 0;
}
</style>
