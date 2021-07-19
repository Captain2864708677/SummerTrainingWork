import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/components/menu'),
    children: [
      {
        path: '/homepage',
        name: 'HomePage',
        component: () => import('@/views/homepage')
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/cart')
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user')
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order')
      },
      {
        path: '/search',
        name: 'SearchIndex',
        component: () => import('@/views/search')
      }
    ]
  },
  {
    path: '/searchform',
    name: 'SearchForm',
    component: () => import('@/views/homepage/search')
  },
  {
    path: '/productdetail',
    name: 'ProductDetail',
    component: () => import('@/views/homepage/components/productdetail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
