import Vue from 'vue'
import VueRouter from 'vue-router'
import AllProductsView from '../views/AllProductsView.vue'
import LoginView from '../views/LoginView.vue'
import AccountView from '../views/AccountView.vue'
import RegisterView from '../views/RegisterView.vue'
import store from '../store/index'
import ChangePasswordView from '../views/ChangePasswordView.vue'
import ProductView from '../views/ProductView.vue'
import AddProductView from '../views/AddProductView.vue'
import AllUserProductsView from '../views/AllUserProductsView.vue'
import UpdateProductView from '../views/UpdateProductView.vue'
import BasketView from '../views/BasketView.vue'
import OrdersView from '../views/OrdersView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AllProductsView',
    component: AllProductsView
  },
  {
    path: '/my-products',
    name: 'MyProducts',
    component: AllUserProductsView,
    meta: {
      requiresAuth: true,
      forSellerOnly : true
    }
  },
  {
    path: '/update-product/:id',
    name: 'UpdateProduct',
    component: UpdateProductView,
    meta: {
      requiresAuth: true,
      forSellerOnly : true
    }
  },
  {
    path: '/change-password',
    name: 'ChangePasswordView',
    component: ChangePasswordView,
    meta: {
      requiresAuth: true
    }
  }, 
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: {
      requiresLoggedOut: true
    }
  },{
    path: '/register',
    name: 'RegisterView',
    component: RegisterView,
    meta: {
      requiresLoggedOut: true
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: AccountView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/product/:id',
    name: 'ProductView',
    component: ProductView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProductView,
    meta: {
      requiresAuth: true,
      forSellerOnly : true
    }
  },
  {
    path: '/basket',
    name: 'Basket',
    component: BasketView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: OrdersView,
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
  if(to.matched.some(record => record.meta.forSellerOnly)) {
    if (store.getters['auth/getUserRole']=="PRODAVAC") {
      next()
      return
    }
    next('/')
  } else {
    next()
  }

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
