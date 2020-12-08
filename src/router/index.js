import Vue from 'vue'
import VueRouter from 'vue-router'
import AllProducts from '../views/AllProducts.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import ChangePassword from '../views/ChangePassword.vue'
import Product from '../views/Product.vue'
import AddProductView from '../views/AddProductView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AllProducts',
    component: AllProducts
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: {
      requiresAuth: true
    }
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
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProductView,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
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
