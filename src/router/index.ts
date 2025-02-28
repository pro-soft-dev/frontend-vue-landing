import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Diagram from '../views/Diagram.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/create',
    name: 'create',
    // Lazy loading for about page
    component: Create
  },
  {
    path: '/diagram',
    name: 'diagram',
    component: Diagram
  },
  // Add a catch-all route for unmatched paths
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 