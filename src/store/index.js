import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productId:''
  },
  mutations: {
    setProductId(state,value){
      state.productId = value
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  getProductId(state){return state.productId}
}
})
