import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'dashboard', component: HomeView },
        {
          path: '/transactions',
          name: 'transactions',
          component: () => import('../views/transactions/TransactionsView.vue'),
        },
        {
          path: '/properties',
          name: 'properties',
          component: () => import('../views/properties/PropertiesView.vue'),
        },
      ],
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('../views/NotFoundView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
