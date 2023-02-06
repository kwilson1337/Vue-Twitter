import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'
import Explore from '../views/Explore.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'explore',
      component: Explore
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },    
    {
      path: '/home',
      name: 'home',     
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',     
      component: () => import('../views/Settings.vue'),      
    },
    {
      path: '/profile',
      name: 'profile',     
      component: () => import('../views/Profile.vue'),      
      meta: {
        requiresAuth: true
      }
    },
  ]
})

// get current userr
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), (user) => {
      removeListener()
      resolve(user)
    }, reject)
  })
}

// check is route has login required
router.beforeEach(async (to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(await getCurrentUser()) {
      next()
    } else {
      next("/");       
    }
  } else {
    next()
  }
})

export default router
