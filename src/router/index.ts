import { destinations } from '@/data/data.json'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // scrollBehavior(to, from, savedPosition) {
  //   return (
  //     savedPosition ||
  //     new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve({ top: 0, behavior: 'smooth' })
  //       }, 500)
  //     })
  //   )
  // },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/protected',
      name: 'protected',
      component: () => import('@/views/ProtectedView.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/invoices',
      name: 'invoices',
      component: () => import('@/views/InvoicesView.vue'),
      meta: {
        requireAuth: true
      }
    },
    {
      // + oznacza ze parametr moze sie powtarzac i jest required czyli :id+ => /:id/:id
      // * oznacza ze parametr moze sie powtarzac ale jest optional czyli /dest/:id* oznacza ze :id jest optional
      path: '/destination/:id(\\d+)/:slug',
      name: 'destination',
      component: () => import('@/views/DestinationView.vue'),
      // nav guard per route
      beforeEnter: (to, from) => {
        const exists = destinations.find((dest) => dest.id === parseInt(to.params.id as string))

        if (!exists) {
          return {
            name: 'NotFound',
            // allow keeping the URL while rendering a different page
            params: {
              pathMatch: to.path.split('/').slice(1)
            },
            query: to.query,
            hash: to.hash
          }
        }
      },
      children: [
        {
          path: ':experienceSlug',
          name: 'experience',
          component: () => import('@/views/ExperienceView.vue'),
          props: (route) => ({
            ...route.params,
            id: parseInt(route.params.id as string)
          })
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
  // strict: true
})
// global nav guard
router.beforeEach((to, from) => {
  if (to.meta.requireAuth && !window.user) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
})

// fake auth
declare global {
  interface Window {
    user: any
  }
}

export default router
