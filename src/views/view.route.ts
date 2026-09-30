// src/views/view.routes.ts
import { RouteRecordRaw } from 'vue-router';

const viewRoutes: RouteRecordRaw[] = [

  {
    name: 'Consumables',
    path: 'inventory/consumables',
    component: () => import('@/views/inventory/Consumables.vue'),
    meta: { title: 'Consumables' }
  },


  {
    name: 'Inventory Requests',
    path: 'inventory/requests',
    component: () => import('@/views/inventory/Requests.vue'),
    meta: { title: 'Inventory Requests' }
  },


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


  {
    name: 'Vendors',
    path: 'procurement/vendor',
    component: () => import('@/views/procurement/Vendors.vue'),
    meta: { title: 'Vendors' }
  },

  {
    name: 'Terms & Conditions',
    path: 'procurement/terms-conditions',
    component: () => import('@/views/procurement/TermsConditions.vue'),
    meta: { title: 'Terms & Conditions' }
  },

  // General Requisitions
  {
    name: 'General Requisitions',
    path: 'requisitions/general',
    component: () => import('@/views/requisitions/GeneralRequisitions.vue'),
    meta: {
      title: 'General Requisitions'
    }
  },


  {
    name: 'System Requisitions',
    path: 'requisitions/system',
    component: () => import('@/views/requisitions/SystemRequisitions.vue'),
    meta: {
      title: 'System Requisitions'
    }
  },


  // Organization Departments
  {
    name: 'Departments',
    path: 'organization/departments',
    component: () => import('@/views/organization/Departments.vue'),
    meta: {
      title: 'Departments'
    }
  },


  {
    name: 'Locations',
    path: 'organization/locations',
    component: () => import('@/views/organization/Locations.vue'),
    meta: {
      title: 'Locations'
    }
  },


  {
    name: 'Events',
    path: 'organization/events',
    component: () => import('@/views/organization/Events.vue'),
    meta: { title: 'Events' }
  },


  {
    name: 'Organization Phone Directory',
    path: 'organization/phonedirectory',
    component: () => import('@/views/organization/PhoneDirectory.vue'),
    meta: { title: 'Phone Directory' }
  },


  {
    name: 'Staff Onboarding',
    path: 'staff/onboarding',
    component: () => import('@/views/staff/Onboarding.vue'),
    meta: { title: 'Staff Onboarding' }
  },

  {
    name: 'Staff Positions',
    path: 'staff/positions',
    component: () => import('@/views/staff/Positions.vue'),
    meta: { title: 'Staff Positions' }
  },

  {
    name: 'Staff Grades',
    path: 'staff/grades',
    component: () => import('@/views/staff/Grades.vue'),
    meta: { title: 'Staff Grades' }
  },

  {
    name: 'Staff Offboarding',
    path: 'staff/offboarding',
    component: () => import('@/views/staff/Offboarding.vue'),
    meta: { title: 'Staff Offboarding' }
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

  {
    name: 'Organization Announcements',
    path: 'organization/announcements',
    component: () => import('@/views/organization/Announcements.vue'),
    meta: {
      title: 'Organization Announcements'
    }
  },


  {
    name: 'Purchase Orders',
    path: 'procurement/purchase-orders',
    component: () => import('@/views/procurement/PurchaseOrders.vue'),
    meta: { title: 'Purchase Orders' }
  },

];

export default viewRoutes;
