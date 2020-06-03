import Vue from 'vue'
import Vuex from 'vuex'
import cart from "./modules/cart";
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
  },
  state: {
    user: '',
    authorization: localStorage.getItem('authorization') ? localStorage.getItem('authorization') : '',
    uid: '',
    title: '',
    socket: '',
    // 联系人表
    contactMap: new Map()
  },
  mutations: {
    changeLogin(state, token) {
      state.authorization = token;
      localStorage.setItem('authorization', token);
    },
    setUser(state, user) {
      state.user = user;
    },
    //退出
    exit(state) {
      state.user = '';
      state.authorization = '';
      state.uid = '';
      //清空联系人表
      state.contactMap.clear();
      state.socket.onClose();
    },
    setUid(state, uid) {
      state.uid = uid;
    },
    setTitle(state,title) {
      state.title = title;
    },
    addMessage(state, data) {
      //如果消息列表中没有该用户
      this.commit("initContact",data.fromUserId);
      let contact = state.contactMap.get(data.fromUserId);
      contact.push({
        type: 'receive',
        msg: data.message
      })
    },
    // 初建立连接还未发送消息时，初始化一下
    initContact(state, fromUserId) {
      if (!state.contactMap.has(fromUserId))
        state.contactMap.set(fromUserId, []);
    },
  },
  actions: {

  }
})
