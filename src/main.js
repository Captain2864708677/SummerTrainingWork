import './assets/rem'//rem适配

import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import {Dialog} from "vant";

import { Swipe, SwipeItem,Icon } from 'vant';//轮播图 icon

Vue.prototype.img = (path) => {
  return 'http://192.168.217.139:9000/images/' + path
}

Vue.use(Swipe).use(SwipeItem).use(Icon);

Vue.use(Dialog)
Vue.config.productionTip = false
Vue.prototype.img = (path) => {
  return 'http://192.168.56.2:9000/images/'+path
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
