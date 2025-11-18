import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Searches/searches.vue'),
  },
  {
    path: '/search/admin',
    name: 'search-admin',
    component: () => import('@/views/Searches/Admin/create-edit.vue'),
  },
]

export default routes
