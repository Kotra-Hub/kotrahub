<script setup lang="ts">
import { watch } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";
import { AppTheme } from "@/interfaces/common.interface";

const route = useRoute();
const theme = useTheme();

watch(
  () => route.name,
  (routeName) => {
    if (routeName === "login") {
      theme.change(AppTheme.LIGHT);
      return;
    }

    const savedTheme = localStorage.getItem("theme");

    theme.change(
      savedTheme === AppTheme.DARK
        ? AppTheme.DARK
        : AppTheme.LIGHT
    );
  },
  { immediate: true }
);
</script>

<template>
  <router-view />
</template>
