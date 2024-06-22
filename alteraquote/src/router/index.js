import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quote',
      component: () => import ('../views/QuoteView.vue')
    }
  ]
})

export default router
