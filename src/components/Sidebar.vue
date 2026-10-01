<template>
  <!-- ============================================================
       MAIN SIDEBAR
       ============================================================ -->
  <aside class="main-sidebar" :style="{ backgroundColor: sidebarColor }">
    <v-btn
      v-for="item in mainMenu"
      :key="item.key"
      variant="text"
      stacked
      class="menu-btn"
      size="small"
      density="compact"
      :class="{ active: selected === item.key }"
      @mouseenter="showSecondMenu(item, $event)"
      @mouseleave="startHideFlyout"
      @click="selectMenu(item)"
    >
      <v-icon class="menu-icon">
        {{ item.icon }}
      </v-icon>

      <span class="menu-label">
        {{ item.label }}
      </span>
    </v-btn>
  </aside>

  <!-- ============================================================
       OLD SECOND SIDEBAR
       Kept for compatibility but hidden
       ============================================================ -->
  <aside
    v-if="false"
    class="second-sidebar flyout-overlay"
    :style="{ backgroundColor: sidebarColor }"
  >
    <v-list density="compact">
      <div
        v-for="sub in secondMenu"
        :key="sub.label"
        class="submenu-btn"
        :class="{ active: isSubActive(sub) }"
        @click="handleNavigate(sub.page || sub.label)"
      >
        <v-icon class="submenu-icon">
          {{ sub.icon }}
        </v-icon>

        <span class="submenu-text">
          {{ sub.label }}
        </span>
      </div>
    </v-list>
  </aside>

  <!-- ============================================================
       FLYOUT / SECOND MENU
       DIALOG / CHAT BUBBLE STYLE
       ============================================================ -->
  <div
    v-if="hoverMenu"
    class="sidebar-flyout-overlay"
    :style="{
      top: flyoutTop + 'px',
      left: flyoutLeft + 'px',
      '--arrow-top': arrowTop + 'px',
    }"
    @mouseenter="cancelHideFlyout"
    @mouseleave="startHideFlyout"
  >
    <div class="flyout-list">
      <div
        v-for="child in hoverMenu.children"
        :key="child.label"
        class="flyout-item"
        :class="{ active: isSubActive(child) }"
        @click="openSecondPage(child)"
      >
        <!-- Item Icon -->
        <div class="flyout-item-icon">
          <v-icon size="19">
            {{ child.icon || "mdi-circle-outline" }}
          </v-icon>
        </div>

        <!-- Item Text -->
        <span class="flyout-text">
          {{ child.label }}
        </span>

        <!-- Right Arrow -->
        <v-icon class="flyout-arrow-icon" size="16"> mdi-chevron-right </v-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTheme } from "vuetify";

// ============================================================
// TYPES
// ============================================================

type MenuItem = {
  label: string;
  key?: string;
  children?: MenuItem[];
  page?: string;
  icon?: string;
};

// ============================================================
// PROPS / EMITS
// ============================================================

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "navigate", page: string): void;
}>();

// ============================================================
// ROUTER / THEME
// ============================================================

const theme = useTheme();
const route = useRoute();
const router = useRouter();

// ============================================================
// SIDEBAR COLOR
// ============================================================

const sidebarColor = computed(() => {
  return theme.global.current.value.dark ? "rgb(22, 35, 56)" : "rgb(255, 255, 255)";
});

// ============================================================
// SELECTED MENU
// ============================================================

const selected = ref("home");

// ============================================================
// MAIN MENU
// ============================================================

const mainMenu: MenuItem[] = [
  {
    key: "home",
    label: "Home",
    icon: "mdi-home",
  },

  {
    key: "requisitions",
    label: "Requisitions",
    icon: "mdi-file-document",
  },

  {
    key: "staff",
    label: "Staff",
    icon: "mdi-account",
  },

  {
    key: "organization",
    label: "Organization",
    icon: "mdi-office-building",
  },

  {
    key: "procurement",
    label: "Procurement",
    icon: "mdi-cart",
  },

  {
    key: "inventory",
    label: "Inventory",
    icon: "mdi-package",
  },

  {
    key: "plant",
    label: "Plant",
    icon: "mdi-factory",
  },

  {
    key: "support",
    label: "Support",
    icon: "mdi-tools",
  },

  {
    key: "administration",
    label: "Administration",
    icon: "mdi-cog",
  },
];

// ============================================================
// SECOND MENU DATA
// ============================================================

const menus: Record<string, MenuItem[]> = {
  // ==========================================================
  // REQUISITIONS
  // ==========================================================

  requisitions: [
    {
      label: "General Requisitions",
      icon: "mdi-file-document-outline",
      page: "/main/requisitions/general",
    },

    {
      label: "System Requisitions",
      icon: "mdi-file-cog-outline",
      page: "/main/requisitions/system",
    },
  ],

  // ==========================================================
  // STAFF
  // ==========================================================

  staff: [
    {
      label: "Onboarding",
      icon: "mdi-account-plus",
      page: "/main/staff/onboarding",
    },

    {
      label: "Offboarding",
      icon: "mdi-account-minus",
      page: "/main/staff/offboarding",
    },

    {
      label: "Positions",
      icon: "mdi-account-tie",
      page: "/main/staff/positions",
    },

    {
      label: "Grades",
      icon: "mdi-star-outline",
      page: "/main/staff/grades",
    },
  ],

  // ==========================================================
  // ORGANIZATION
  // ==========================================================

  organization: [
    {
      label: "Departments",
      icon: "mdi-office-building",
      page: "/main/organization/departments",
    },

    {
      label: "Locations",
      icon: "mdi-map-marker",
      page: "/main/organization/locations",
    },

    {
      label: "Events",
      icon: "mdi-calendar",
      page: "/main/organization/events",
    },

    {
      label: "Announcements",
      icon: "mdi-bullhorn",
      page: "/main/organization/announcements",
    },

    {
      label: "Phone Directory",
      icon: "mdi-phone",
      page: "/main/organization/phonedirectory",
    },
  ],

  // ==========================================================
  // PROCUREMENT
  // ==========================================================

  procurement: [
    {
      label: "Purchase Orders (PO)",
      icon: "mdi-cart-outline",
      page: "/main/procurement/purchase-orders",
    },

    {
      label: "Vendor",
      icon: "mdi-account-group",
      page: "/main/procurement/vendor",
    },

    {
      label: "Terms & Conditions",
      icon: "mdi-file-check-outline",
    },
  ],

  // ==========================================================
  // INVENTORY
  // ==========================================================

  inventory: [
    {
      label: "Requests",
      icon: "mdi-clipboard-list",
      page: "/main/inventory/requests",
    },

    {
      label: "Assets & Equipment",
      icon: "mdi-package-variant",
      page: "/main/inventory/assets-equipment",
    },

    {
      label: "Consumables",
      icon: "mdi-package",
      page: "/main/inventory/consumables",
    },

    {
      label: "Raw Material",
      icon: "mdi-cube-outline",
      page: "/main/inventory/raw-material",
    },

    {
      label: "Lots",
      icon: "mdi-layers",
      page: "/main/inventory/lots",
    },
  ],

  // ==========================================================
  // PLANT
  // ==========================================================

  plant: [
    {
      label: "Production Planning",
      icon: "mdi-chart-timeline",
    },

    {
      label: "Batch Manufacturing",
      icon: "mdi-factory",
    },

    {
      label: "Formulas",
      icon: "mdi-flask-outline",
    },

    {
      label: "Dispensing",
      icon: "mdi-beaker-outline",
    },

    {
      label: "Setup Procedure",
      icon: "mdi-cog-outline",
    },

    {
      label: "Redress",
      icon: "mdi-refresh",
    },

    {
      label: "Nutritional",
      icon: "mdi-food-apple",
    },
  ],

  // ==========================================================
  // SUPPORT
  // ==========================================================

  support: [
    {
      label: "Inquiries & Tickets",
      icon: "mdi-ticket-outline",
    },

    {
      label: "System Feedback",
      icon: "mdi-message-text",
    },

    {
      label: "User Acceptance Testing (UAT)",
      icon: "mdi-test-tube",
    },
  ],

  // ==========================================================
  // ADMINISTRATION
  // ==========================================================

  administration: [
    {
      label: "Users",
      icon: "mdi-account-multiple",
    },

    {
      label: "Roles",
      icon: "mdi-shield-account",
    },

    {
      label: "Workflow & Approval",
      icon: "mdi-source-branch",
    },

    {
      label: "Modules",
      icon: "mdi-view-grid",
    },
  ],
};

// ============================================================
// FLYOUT STATE
// ============================================================

const hoverMenu = ref<MenuItem | null>(null);

const flyoutTop = ref(0);
const flyoutLeft = ref(120);
const arrowTop = ref(35);

let flyoutTimer: ReturnType<typeof setTimeout> | null = null;

// ============================================================
// START HIDE FLYOUT
// ============================================================

function startHideFlyout() {
  if (flyoutTimer) {
    clearTimeout(flyoutTimer);
  }

  flyoutTimer = setTimeout(() => {
    hoverMenu.value = null;
    flyoutTimer = null;
  }, 250);
}

// ============================================================
// CANCEL HIDE FLYOUT
// ============================================================

function cancelHideFlyout() {
  if (flyoutTimer) {
    clearTimeout(flyoutTimer);
    flyoutTimer = null;
  }
}

// ============================================================
// SHOW SECOND MENU
// ============================================================

function showSecondMenu(item: MenuItem, event: MouseEvent) {
  cancelHideFlyout();

  const children = item.key ? menus[item.key] : undefined;

  // No submenu
  if (!children || children.length === 0) {
    hoverMenu.value = null;
    return;
  }

  const target = event.currentTarget as HTMLElement;

  if (!target) {
    return;
  }

  const rect = target.getBoundingClientRect();

  // ==========================================================
  // DEFAULT POSITION
  // ==========================================================

  flyoutTop.value = rect.top;

  flyoutLeft.value = rect.right + 15;

  arrowTop.value = rect.top + rect.height / 2 - flyoutTop.value - 10;

  // ==========================================================
  // KEEP BUBBLE INSIDE VIEWPORT
  // ==========================================================

  const estimatedHeight = Math.min(520, 16 + children.length * 48);

  const maxTop = window.innerHeight - estimatedHeight - 12;

  flyoutTop.value = Math.max(12, Math.min(rect.top, maxTop));

  // Recalculate arrow after flyout position adjustment
  arrowTop.value = rect.top + rect.height / 2 - flyoutTop.value - 10;

  // ==========================================================
  // SHOW MENU
  // ==========================================================

  hoverMenu.value = {
    ...item,
    children,
  };
}

// ============================================================
// HIDE SECOND MENU
// ============================================================

function hideSecondMenu() {
  cancelHideFlyout();

  hoverMenu.value = null;
}

// ============================================================
// OPEN SECOND PAGE
// ============================================================

function openSecondPage(child: MenuItem) {
  cancelHideFlyout();

  if (child.page) {
    router.push(child.page);
  }

  hoverMenu.value = null;
}

// ============================================================
// SECOND MENU
// Compatibility with old sidebar
// ============================================================

const secondMenu = computed<MenuItem[]>(() => {
  return menus[selected.value] || [];
});

// ============================================================
// SELECTED LABEL
// ============================================================

const selectedLabel = computed(() => {
  return mainMenu.find((item) => item.key === selected.value)?.label || "";
});

// ============================================================
// SELECT MAIN MENU
// ============================================================

function selectMenu(item: MenuItem) {
  selected.value = item.key || "home";

  cancelHideFlyout();

  // Menu with submenu
  if (secondMenu.value.length > 0) {
    return;
  }

  // Home
  if (item.key === "home") {
    router.push("/main/dashboard");
    return;
  }
}

// ============================================================
// CHECK SUBMENU ACTIVE
// ============================================================

function isSubActive(sub: MenuItem) {
  if (!sub.page) {
    return false;
  }

  return route.path === sub.page || route.path.startsWith(`${sub.page}/`);
}

// ============================================================
// HANDLE NAVIGATION
// ============================================================

function handleNavigate(page: string) {
  if (page.startsWith("/")) {
    router.push(page);
  } else {
    emit("navigate", page);
  }
}

// ============================================================
// WATCH ROUTE
// ============================================================

watch(
  () => route.path,
  (path) => {
    const found = mainMenu.find((item) => {
      // ------------------------------------------------------
      // HOME
      // ------------------------------------------------------

      if (item.key === "home") {
        return path === "/main" || path === "/main/" || path === "/main/dashboard";
      }

      // ------------------------------------------------------
      // REQUISITIONS
      // ------------------------------------------------------

      if (item.key === "requisitions") {
        return path.includes("/requisitions");
      }

      // ------------------------------------------------------
      // OTHER MODULES
      // ------------------------------------------------------

      if (item.key) {
        return path.includes(`/${item.key}`);
      }

      return false;
    });

    if (found?.key) {
      selected.value = found.key;
    }
  },
  {
    immediate: true,
  },
);
</script>

<style scoped>
/* ============================================================
   MAIN SIDEBAR
============================================================ */

.main-sidebar {
  width: 120px;

  min-width: 120px;

  padding: 12px 8px;

  overflow: visible !important;

  position: relative;

  border-right: 1px solid rgba(0, 0, 0, 0.08);
}

/* ============================================================
   MAIN MENU BUTTON
============================================================ */

.menu-btn {
  min-width: 0 !important;

  width: 100%;

  min-width: 90px;

  padding: 8px 10px !important;

  margin: 0 0 10px 0 !important;

  overflow: visible !important;
}

.menu-icon {
  font-size: 18px;

  margin-bottom: 4px;
}

.menu-label {
  font-size: 11px;

  line-height: 14px;

  text-align: center;

  white-space: normal;
}

/* ============================================================
   FLYOUT CONTAINER
============================================================ */

.sidebar-flyout-overlay {
  position: fixed;

  width: 300px;

  max-width: 300px;

  max-height: calc(100vh - 24px);

  padding: 12px;

  background: #ffffff;

  border: 1px solid rgba(0, 0, 0, 0.12);

  border-radius: 12px;

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);

  z-index: 99999;

  overflow: visible;

  animation: flyoutBubble 0.15s ease;
}

/* ============================================================
   SHARP LEFT POINTER + ROUNDED BOX
============================================================ */

.sidebar-flyout-overlay::before {
  content: "";

  position: absolute;

  left: -12px;

  top: var(--arrow-top);

  width: 0;

  height: 0;

  border-top: 12px solid transparent;

  border-bottom: 12px solid transparent;

  border-right: 12px solid #ffffff;
}

.sidebar-flyout-overlay::after {
  content: "";

  position: absolute;

  left: -13px;

  top: calc(var(--arrow-top) - 1px);

  width: 0;

  height: 0;

  border-top: 13px solid transparent;

  border-bottom: 13px solid transparent;

  border-right: 13px solid rgba(0, 0, 0, 0.12);

  z-index: -1;
}

/* ============================================================
   LIST
============================================================ */

.flyout-list {
  display: flex;

  flex-direction: column;

  gap: 4px;
}

/* ============================================================
   ITEM
============================================================ */

.flyout-item {
  display: flex;

  align-items: center;

  gap: 12px;

  width: 100%;

  min-height: 45px;

  padding: 8px 12px;

  cursor: pointer;

  color: #333;

  font-size: 14px;

  border-radius: 3px;

  transition: 0.15s ease;
}

.flyout-item:hover {
  background: #eefafa;

  color: #009e9a;

  transform: translateX(2px);
}

.flyout-item.active {
  background: rgba(0, 158, 154, 0.12);

  color: #009e9a;

  font-weight: 600;
}

/* ============================================================
   ICON
============================================================ */

.flyout-item-icon {
  width: 32px;

  height: 32px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #f5f7f7;

  border-radius: 6px;

  flex: none;
}

.flyout-item:hover .flyout-item-icon {
  background: rgba(0, 158, 154, 0.1);
}

/* ============================================================
   TEXT
============================================================ */

.flyout-text {
  flex: 1;

  font-size: 14px;

  font-weight: 500;

  line-height: 1.3;
}

/* ============================================================
   ANIMATION
============================================================ */

@keyframes flyoutBubble {
  from {
    opacity: 0;

    transform: translateX(-8px);
  }

  to {
    opacity: 1;

    transform: translateX(0);
  }
}

/* ============================================================
   DARK MODE - FLYOUT THEME SUPPORT
============================================================ */

.v-theme--DarkTheme .sidebar-flyout-overlay {
  background: rgb(22, 35, 56);

  border-color: rgba(255, 255, 255, 0.08);

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
}

.v-theme--DarkTheme .sidebar-flyout-overlay::before {
  border-right-color: rgb(22, 35, 56);
}

.v-theme--DarkTheme .sidebar-flyout-overlay::after {
  border-right-color: rgba(255, 255, 255, 0.08);
}

.v-theme--DarkTheme .flyout-item {
  color: #ffffff;
}

.v-theme--DarkTheme .flyout-item:hover {
  background: rgba(0, 158, 154, 0.15);

  color: #00b8b3;
}

.v-theme--DarkTheme .flyout-item.active {
  background: rgba(0, 158, 154, 0.18);

  color: #00b8b3;
}

.v-theme--DarkTheme .flyout-item-icon {
  background: rgba(255, 255, 255, 0.06);
}

.v-theme--DarkTheme .flyout-item:hover .flyout-item-icon {
  background: rgba(0, 158, 154, 0.15);
}

/* ============================================================
   VUETIFY THEME COLOR SUPPORT
   USES CURRENT THEME VARIABLES
============================================================ */

.main-sidebar {
  background-color: rgb(var(--v-theme-surface));

  color: rgb(var(--v-theme-on-surface));
}

.menu-btn {
  color: rgb(var(--v-theme-on-surface));
}

.menu-icon,
.menu-label {
  color: inherit;
}

.menu-btn:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}

.menu-btn.active {
  background: rgba(var(--v-theme-primary), 0.12);

  color: rgb(var(--v-theme-primary));
}

.sidebar-flyout-overlay {
  background-color: rgb(var(--v-theme-surface));

  color: rgb(var(--v-theme-on-surface));

  border-color: rgba(var(--v-theme-on-surface), 0.12);

  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.sidebar-flyout-overlay::before {
  border-right-color: rgb(var(--v-theme-surface));
}

.sidebar-flyout-overlay::after {
  border-right-color: rgba(var(--v-theme-on-surface), 0.12);
}

.flyout-item {
  color: rgb(var(--v-theme-on-surface));
}

.flyout-item:hover {
  background: rgba(var(--v-theme-primary), 0.08);

  color: rgb(var(--v-theme-primary));
}

.flyout-item.active {
  background: rgba(var(--v-theme-primary), 0.12);

  color: rgb(var(--v-theme-primary));
}

.flyout-item-icon {
  background: rgba(var(--v-theme-on-surface), 0.06);
}

/* ============================================================
   MAIN MENU - FOLLOW VUETIFY THEME
============================================================ */

.menu-btn {
  color: rgb(var(--v-theme-on-surface)) !important;

  background: transparent !important;
}

.menu-icon,
.menu-label {
  color: rgb(var(--v-theme-on-surface)) !important;
}

.menu-btn:hover {
  background: rgba(var(--v-theme-primary), 0.08) !important;
}

.menu-btn.active {
  background: rgba(var(--v-theme-primary), 0.12) !important;

  color: rgb(var(--v-theme-primary)) !important;
}

.menu-btn.active .menu-icon,
.menu-btn.active .menu-label {
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
