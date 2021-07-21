import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import {Dialog} from "vant"

Vue.use(Dialog)
Vue.config.productionTip = false

Vue.prototype.img = (path) =>{
  return 'http://192.168.80.151:9000/images/' + path
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
