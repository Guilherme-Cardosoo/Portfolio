import { createRouter, createWebHistory } from 'vue-router'

import Loading from '../views/Loading.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Loading',
      component: Loading
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})

export default router