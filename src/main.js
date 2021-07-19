import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import Router from 'vue-router'
import 'amfe-flexible'
import 'lib-flexible'


Vue.prototype.img = (path) =>{
  return 'http://192.168.182.10:9000/images/' + path
}

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
