import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

Vue.use(VueRouter)

function loadView(view) {
    return () => import(`@/views/${view}.vue`)
}

function loadComponentAuth(compo) {
    return () => import(`@/components/auth/${compo}.vue`)
}

function loadComponent(comp) {
  return () => import(`@/components/resources/${comp}.vue`)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: loadView('Home'),
            meta: { requiresAuth: true }
        },
        {
          path: '/login',
          name: 'Login',
          component: loadComponentAuth('Login'),
        },
        {
          path: '/register',
          name: 'Register',
          component: loadComponentAuth('Register'),
        },
        {
          path: '/organizations',
          name: 'Organizations',
          component: loadComponent('Organizations'),
          meta: { requiresAuth: true }
        },
        {
          path: '/users',
          name: 'Users',
          component: loadComponent('Users'),
          meta: { requiresAuth: true }
        },
        {
          path: '/reportsview',
          name: 'ReportsView',
          component: loadComponent('ReportsView'),
          meta: { requiresAuth: true }
        },
        {
          path: '/projects',
          name: 'Projects',
          component: loadComponent('Projects'),
          meta: { requiresAuth: true }
        },
        {
          path: '/reports',
          name: 'Reports',
          component: loadComponent('Reports'),
          meta: { requiresAuth: true }
        },
        {
          path: '/reports/:p/:i',
          name: 'Reports_sort',
          component: loadComponent('Reports_sort'),
          meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  }
  else {
    next() 
  }
})

export default router