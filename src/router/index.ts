// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './main.routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: {
        requiresAuth: false,
        title: 'Kotra Hub'
      }
    },
    MainRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: {
        setup() {
          window.location.href = '/custom_404.html';
          return () => null;
        }
      }
    }
  ]
});

router.beforeEach(async (to, _from, next) => {
  try {
    const { useAuth } = await import('@/composables/useAuth');
    const { isAuthenticated } = useAuth();

    if (to.meta.title) {
      document.title = to.meta.title as string;
    }

    if (to.meta.requiresAuth && !isAuthenticated.value) {
      next({ name: 'Login' });
      return;
    }

    if (to.name === 'Login' && isAuthenticated.value) {
      next({ name: 'Dashboard' });
      return;
    }

    next();
  } catch (error) {
    console.error('Auth check failed:', error);
    next({ name: 'Login' });
  }
});

export default router;
