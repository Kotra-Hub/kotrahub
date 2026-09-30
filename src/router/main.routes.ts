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
  
{
  path: '/main/inventory/requests',
  name: 'InventoryRequests',
  component: () => import('@/views/inventory/Requests.vue')
},
{
  path: '/main/inventory/assets-equipment',
  name: 'AssetsEquipment',
  component: () => import('@/views/inventory/AssetsEquipment.vue')
},
{
  path: '/main/inventory/consumables',
  name: 'Consumables',
  component: () => import('@/views/inventory/Consumables.vue')
},
{
  path: '/main/inventory/raw-material',
  name: 'RawMaterial',
  component: () => import('@/views/inventory/RawMaterial.vue')
},
{
  path: '/main/inventory/lots',
  name: 'Lots',
  component: () => import('@/views/inventory/Lots.vue')
},
]
};

export default MainRoutes;
