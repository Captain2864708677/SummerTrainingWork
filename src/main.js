import './assets/rem'//rem适配

import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import {Dialog} from "vant";

import { Swipe, SwipeItem,Icon } from 'vant';//轮播图 icon
import Router from 'vue-router'
import 'amfe-flexible'
import 'lib-flexible'


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.prototype.img = (path) => {
  return 'http://192.168.80.151:9000/images/' + path
}

Vue.use(Swipe).use(SwipeItem).use(Icon);

Vue.use(Dialog)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
