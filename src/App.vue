<script setup lang="ts">
import { watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";
import { AppTheme } from "@/interfaces/common.interface";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { useRouteLoading } from "@/composables/useRouteLoading";

const route = useRoute();
const theme = useTheme();
const { loading } = useRouteLoading();

watch(
  () => route.name,
  (routeName) => {
    if (routeName === "login") {
      theme.change(AppTheme.LIGHT);
      return;
    }

    const appearance = localStorage.getItem("kotra-appearance-mode") || "light";

    theme.change(
      appearance === "dark" ? AppTheme.DARK : AppTheme.LIGHT
    );
  },
  { immediate: true }
);

watch(
  () => route.fullPath,
  async () => {
    loading.value = true;
    await nextTick();

    setTimeout(() => {
      loading.value = false;
    }, 350);
  }
);
</script>

<template>
  <LoadingOverlay v-model="loading" title="Loading" message="Opening page..." />
  <router-view />
</template>
