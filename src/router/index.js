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
        path: '/edit',
        name: 'CustomerEdit',
        component: () => import('@/views/user/edit')

      },
      {
        path: '/editPwd',
        name: 'CustomerEditPwd',
        component: () => import('@/views/user/editPwd')

      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/login/register')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
