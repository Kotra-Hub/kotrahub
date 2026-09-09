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
  },
  // Recent Activities
  {
    name: 'Recent Activities',
    path: 'recent-activities',
    component: () => import('@/views/RecentActivities.vue'),
    meta: {
      title: 'Recent Activities'
    }
  },
  // Pending Action
  {
    name: 'Pending Action',
    path: 'pending',
    component: () => import('@/views/PendingAction.vue'),
    meta: {
      title: 'Pending Action'
    }
  },
  // Quick Access
  {
    name: 'Quick Access',
    path: 'quickaccess',
    component: () => import('@/views/QuickAccess.vue'),
    meta: {
      title: 'Quick Access'
    }
  },
  // Quick Access
  {
    name: 'Quick Access',
    path: 'quickaccess',
    component: () => import('@/views/QuickAccess.vue'),
    meta: {
      title: 'Quick Access'
    }
  },
  // Calendar
  {
    name: 'Calendar Agenda',
    path: 'calendar',
    component: () => import('@/views/Calendar.vue'),
    meta: {
      title: 'Calendar Agenda'
    }
  },
  // Announcement
  {
    name: 'Announcement',
    path: 'announcements',
    component: () => import('@/views/Announcement.vue'),
    meta: {
      title: 'Announcement'
    }
  },
  // Phone Directory
  {
    name: 'Phone Directory',
    path: 'phonedirectory',
    component: () => import('@/views/PhoneDirectory.vue'),
    meta: {
      title: 'Phone Directory'
    }
  },
];

export default viewRoutes;
