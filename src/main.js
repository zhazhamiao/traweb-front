// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import vueAxios from 'vue-axios'

import qs from 'qs'
import jwt from 'jwt-decode'

import app from './App.vue'
import router from './router'
import axios from './assets/js/axios.js'
import '@/assets/js/vant'
import Socket from "./assets/js/websocket";
import store from './store'

import '@/assets/css/divs.css'
import '@/assets/css/vant.css'
import Notify from "vant/lib/notify";


Vue.config.productionTip = false;
//Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(vueAxios, axios);
//将qs引入全局
Vue.prototype.$qs = qs;

/*var instance = axios.create({
  baseURL: 'http://192.168.43.142:8080/traweb',
  timeout: 1000,
  headers: {"Content-Type":"multipart/form-data"}
});

Vue.config.productionTip = false;
Vue.prototype.instance = instance;*/

//判断用户是否登录
/*router.beforeEach(((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    next();
  } else {
    let token = localStorage.getItem('authorization');
    if (token === null || token === '') {
      Notify({type: 'warning', message: '尚未登录,正在跳转至登录界面'})
      next('/login');
    } else {
      next();
    }
  }
}))*/

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store,
  async beforeMount() {
    if (localStorage.authorization) {
      let user = jwt(localStorage.authorization).aud;
      await axios({
        method: 'get',
        url: '/account/getInformation',
        params: {username: user}
      }).then(response => {
        //console.log(response.data)
        store.commit("setUser", user);
        store.commit("setUid",response.data.id);
      })

    } else {
      Notify({type: 'warning', message: '尚未登录,正在跳转至登录界面'});
      await router.push({path: '/login'})
    }

    //已登录 连接websocket
    Socket.init(store.state.uid);
    Socket.onMessage((response) => {
      store.commit("addMessage",response);
    })
    store.state.socket = Socket;
  }
});
