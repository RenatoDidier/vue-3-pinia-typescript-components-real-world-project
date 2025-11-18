import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/home-view.vue'

const modules = import.meta.glob('./modules/*.ts', { eager: true }) as Record<
  string,
  { default: RouteRecordRaw[] }
>
const moduleRoutes = Object.values(modules).flatMap((m) => m.default)

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  ...moduleRoutes,
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/not-found.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
