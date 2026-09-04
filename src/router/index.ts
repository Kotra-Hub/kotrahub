import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // Public Routes
    {
      path: "/",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: {
        requiresAuth: false,
        title: "Kotra Hub"
      }
    },

    // Authenticated App
    {
      path: "/app",
      component: () => import("@/components/MainPage.vue"),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: "",
          redirect: { name: "dashboard" }
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: {
            title: "Dashboard"
          }
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/views/Profile.vue"),
          meta: {
            title: "Profile"
          }
        }
      ]
    },

    // 404 Routes
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "dashboard" }
    }
  ]
});

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "login" });
    return;
  }

  if (to.name === "login" && isAuthenticated.value) {
    next({ name: "dashboard" });
    return;
  }

  next();
});

export default router;
