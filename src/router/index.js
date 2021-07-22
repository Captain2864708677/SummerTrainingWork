import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store"

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
                path: '/userDetail',
                name: 'userDetail',
                component: () => import('@/views/user/userDetail')
            },
            {
                path: '/addressMs',
                name: 'addressMs',
                component: () => import('@/views/user/address/addressMs')
            },
            {
                path: '/addressSelect',
                name: 'addressSelect',
                component: () => import('@/views/user/address/addressSelect')
            },
            {
                path: '/addAddress',
                name: 'addAddress',
                component: () => import('@/views/user/address/addAddress')
            },
            {
                path: '/editAddress',
                name: 'editAddress',
                component: () => import('@/views/user/address/editAddress')
            },
            {
                path: '/productDetail',
                name: 'productDetail',
                component: () => import('@/views/product')
            },
            {
                path: '/order',
                name: 'order',
                component: () => import('@/views/order')
            },
            {
                path: '/beforePay',
                name: 'beforePay',
                component: () => import('@/views/order/beforePay')
            },
            {
                path: '/afterPay',
                name: 'afterPay',
                component: () => import('@/views/order/afterPay')

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
            },
            {
                path: '/state',
                name: 'state',
                component: () => import('@/views/order/state/index')
            },
            {
                path: '/orderDetail',
                name: 'orderDetail',
                component: () => import('@/views/order/orderDetail')
            },
            {
                path: '/SearchIndex',
                name: 'SearchIndex',
                component: () => import('@/views/search')
            }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login'|| to.path === '/homepage'|| to.path === '/SearchIndex'||to.path ==='/register') {
        next()
        return
    }
    if (store.getters.GET_TOKEN) {
        next()
        return
    }
    next('/login')
})
export default router
