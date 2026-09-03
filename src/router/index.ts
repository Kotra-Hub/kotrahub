import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/Login.vue"),
      meta: { requiresAuth: false, title: "Kotra Hub" }
    },
    {
      path: "/app",
      component: () => import("@/components/MainPage.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          redirect: "dashboard"
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("@/views/Dashboard.vue"),
          meta: { title: "Dashboard" }
        },
        {
          path: "profile",
          name: "profile",
          component: () => import("@/views/Profile.vue"),
          meta: { title: "Profile" }
        }
      ]
    },
    // Catch all route for 404
    {
      path: "/:pathMatch(.*)*",
      redirect: "/app/dashboard"
    }
  ],
});

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }

  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated.value) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
