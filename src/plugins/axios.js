import Vue from 'vue';
import axios from "axios";
import {Notify}  from 'vant'


let config = {
  baseURL: 'http://127.0.0.1:8090'
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;

const request = (url, method, params, callback) => {
  const zymconfig ={
    url: url,
    method: method
  }
  if(method==='get'){
    zymconfig.params = params
  }else{
    const formData = new FormData()
    for(let key in params){
      formData.append(key,params[key])
    }
    zymconfig.data = formData
  }

  _axios.request(zymconfig).then(response => {
    if (response.data.code === 200) {
      callback(response.data)
    } else {
      Notify({
        type:'success',
        message: response.data.message
      })
    }
  }).catch(error => {
    Notify({
      type:'danger',
      message: error
    })
  })
}
Vue.prototype.request = request
Vue.prototype.get = (url, params, callback)=>{
  request(url, 'get',params, response =>{
    callback(response.obj)
  })
}
Vue.prototype.post = (url, params, callback)=>{
  request(url, 'post',params, response =>{
    Notify({
      type:'success',
      message: response.message
    })
    callback(response.obj)
  })
}
