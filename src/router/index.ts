import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/home-view.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/not-found.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
