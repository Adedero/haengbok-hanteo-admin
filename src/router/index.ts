import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginView from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LoginView,
    },
    {
      path: '/dashboard',
      component: MainLayout,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: HomeView,
          meta: { requiresAuth: true }
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/users/UsersView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('../views/transactions/TransactionsView.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'properties',
          name: 'properties',
          component: () => import('../views/properties/PropertiesView.vue'),
          meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
