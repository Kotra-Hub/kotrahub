// src/views/view.routes.ts
import { RouteRecordRaw } from 'vue-router';

const viewRoutes: RouteRecordRaw[] = [
  {
    name: 'Announcements',
    path: 'announcements',
    component: () => import('@/views/Announcements.vue'),
    meta: {
      title: 'Announcements'
    }
  },


  {
    name: 'Quick Access',
    path: 'quick-access',
    component: () => import('@/views/QuickAccess.vue'),
    meta: {
      title: 'Quick Access'
    }
  },


  {
    name: 'Pending Actions',
    path: 'pending-actions',
    component: () => import('@/views/PendingActions.vue'),
    meta: {
      title: 'Pending Actions'
    }
  },


  {
    name: 'Recent Activities',
    path: 'recent-activities',
    component: () => import('@/views/RecentActivities.vue'),
    meta: {
      title: 'Recent Activities'
    }
  },


  {
    name: 'Calendar Agenda',
    path: 'calendar-agenda',
    component: () => import('@/views/CalendarAgenda.vue'),
    meta: {
      title: 'Calendar Agenda'
    }
  },

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
  // Phone Directory
  {
    name: 'Phone Directory',
    path: 'phonedirectory',
    component: () => import('@/views/PhoneDirectory.vue'),
    meta: {
      title: 'Phone Directory'
    }
  },
  // Search Page
  {
    name: 'Search Page',
    path: 'search',
    component: () => import('@/views/SearchPage.vue'),
    meta: {
      title: 'Search'
    }
  },
];

export default viewRoutes;
