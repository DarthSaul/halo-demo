import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // Tabbed layout routes (hero + tabs always visible)
  {
    path: '/',
    component: () => import('@/layouts/TabbedLayout.vue'),
    children: [
      {
        path: '',
        name: 'overview',
        component: () => import('@/views/OverviewView.vue'),
        meta: { tab: 'overview' },
      },
      {
        path: 'restaurants',
        name: 'restaurants',
        component: () => import('@/views/CategoryView.vue'),
        props: { slug: 'restaurants' },
        meta: { tab: 'restaurants' },
      },
      {
        path: 'coffee-shops',
        name: 'coffee-shops',
        component: () => import('@/views/CategoryView.vue'),
        props: { slug: 'coffee-shops' },
        meta: { tab: 'coffee-shops' },
      },
      {
        path: 'running-stores',
        name: 'running-stores',
        component: () => import('@/views/CategoryView.vue'),
        props: { slug: 'running-stores' },
        meta: { tab: 'running-stores' },
      },
      {
        path: 'running-routes',
        name: 'running-routes',
        component: () => import('@/views/CategoryView.vue'),
        props: { slug: 'running-routes' },
        meta: { tab: 'running-routes' },
      },
      {
        path: 'favorites',
        name: 'favorites',
        component: () => import('@/views/FavoritesView.vue'),
        meta: { tab: 'favorites' },
      },
    ],
  },

  // Full-page routes (no hero/tabs)
  {
    path: '/places/:id',
    name: 'place-detail',
    component: () => import('@/views/PlaceDetailView.vue'),
    props: true,
  },
  {
    path: '/routes/:id',
    name: 'route-detail',
    component: () => import('@/views/RouteDetailView.vue'),
    props: true,
  },

  // Redirect old /category/:slug URLs
  {
    path: '/category/:slug',
    redirect: (to) => `/${to.params.slug}`,
  },

  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Tab switches within tabbed layout: don't scroll
    if (to.meta.tab && from.meta.tab) return false
    // Full-page navigation: scroll to top
    return savedPosition || { top: 0 }
  },
})

export default router
