import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'

Vue.config.productionTip = false
Vue.prototype.img = (path) => {
  return 'http://192.168.56.2:9000/images/'+path
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
