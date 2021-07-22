import Vue from 'vue'
import Vuex from 'vuex'
import store from '@/store'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export default new Vuex.Store({
  plugins:[
      createPersistedState({
        storage:sessionStorage
      })
  ],
  state: {
    productId:'',
    token:'',
    customerId:Number
  },
  mutations: {
    setProductId(state,value){
      state.productId = value
    },
    SET_TOKEN(state,token){
      state.token = token
    },
    SET_CUSTOMERID(state,customerId){
      state.customerId = customerId
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
  getProductId(state){return state.productId},
    GET_TOKEN(state){
      return  state.token
    },
    GET_CUSTOMERID(state){
      return  state.customerId
    }
}
})
