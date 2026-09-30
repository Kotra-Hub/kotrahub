<!-- src\components\Footer.vue -->
<template>
  <div id="kotra-footer-final" class="w-full text-center" :style="{
    backgroundColor: themeColors.surface,
    borderTop: `1px solid ${themeColors.border}`,
    color: themeColors.textMuted,
    fontSize: '0.75rem',
    lineHeight: '32px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 4px;
}

@media (max-width: 360px) {
  #kotra-footer-final {
    font-size: 0.6rem !important;
    padding: 0 2px;
  }
}

@media (max-width: 300px) {
  #kotra-footer-final {
    font-size: 0.5rem !important;
    padding: 0 2px;
  }
}
</style>
