import {createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import JobsView from '@/views/JobsView.vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: JobsView,
  },
  {
    path:'/jobs/:id',
    name: 'JobDetail',
    component: () => import('@/views/JobView.vue') // Import the JobDetail component in a different way
  },
  {
    path:'/jobs/add',
    name: 'AddJob',
    component: () => import('@/views/AddJobView.vue') // Import the JobNewView component in a different way
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue') // Import the NotFoundView component in a different way
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router;
