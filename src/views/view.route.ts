// src/views/view.routes.ts
import { RouteRecordRaw } from 'vue-router';

const viewRoutes: RouteRecordRaw[] = [
  // Profile
  {
    name: 'Profile Details',
    path: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      title: 'Profile'
    }
  },
  // Service
  {
    name: 'Service',
    path: 'service/:serviceId',
    component: () => import('@/views/Service.vue'),
    props: true,
    meta: {
      title: 'Service'
    }
  }
];

export default viewRoutes;
