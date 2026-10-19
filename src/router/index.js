import { createRouter, createWebHistory } from 'vue-router'
import Loading from '../views/Loading.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

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
    },

    {
      path: '/sobre',
      name: 'About',
      component: About
    }
  ],

  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        const findSection = () => {
          const element = document.querySelector(to.hash)

          if (element) {
            resolve({
              el: element,
              behavior: 'smooth',
              top: 0
            })
          } else {
            setTimeout(findSection, 50)
          }
        }

        findSection()
      })
    }

    return { top: 0 }
  }
})

export default router
