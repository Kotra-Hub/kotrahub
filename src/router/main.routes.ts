// src/router/main.routes.ts
import viewRoutes from '@/views/view.route';

const MainRoutes = {
  path: '/main',
  meta: {
    requiresAuth: true
  },
  redirect: '/main/dashboard',
  component: () => import('@/components/MainPage.vue'),
  children: [
    {
      name: 'Home',
      path: '',
      redirect: { name: 'Dashboard' }
    },
    {
      name: 'Dashboard',
      path: 'dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: 'Dashboard'
      }
    },
    ...viewRoutes,
  ]
};

export default MainRoutes;
