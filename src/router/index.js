import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Register from '../views/Register.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },{
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresLoggedOut: true
    }
  },{
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresLoggedOut: true
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: User,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }

  if(to.matched.some(record => record.meta.requiresLoggedOut)) {
    if (!store.getters['auth/isLoggedIn']) {
      next()
      return
    }
    next('/account')
  } else {
    next()
  }
})

export default router
