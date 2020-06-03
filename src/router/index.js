import Vue from 'vue'
import Router from 'vue-router'

import register from '@/components/register.vue'
import login from '@/components/login.vue'
import homepage from "@/components/homepages/homepage";
import index from "@/components/homepages/index.vue"
import account from "@/components/homepages/account";
import setting from "@/components/setting/setting";
import informationSet from "@/components/setting/informationSet";
import addressSet from "@/components/setting/addressSet";
import addItem from "@/components/addItem";
import typeSelect from "@/components/homepages/typeSelect";
import search from "@/components/search/search";
import category from "@/components/search/category";
import item from "@/components/item";
import order from "@/components/order";
import myItems from "@/components/account/myItems";
import myOrders from "@/components/account/myOrders";
import chatRoom from "@/components/chatRoom";
import messages from "@/components/homepages/messages";
import settle from "@/components/settle";
import keyword from "@/components/search/keyword";

Vue.use(Router);

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      component: homepage,
      children: [
        {path: '', component: index},
        {path: '/account', component: account},
        {path: '/types', component: typeSelect},
        {path: '/messages', component: messages}
      ]
    },
    {
      path: '/setting',
      component: setting
    },
    {
      path: '/setting/informationSet',
      component: informationSet
    },
    {
      path: '/setting/addressSet',
      component: addressSet
    },
    {
      path: '/addItem',
      component: addItem
    },
    {
      path: '/search',
      component: search,
      children: [
        {path: 'category', component: category,},
        {path: 'all', component: keyword}
      ]
    },
    {path: '/item', name: 'item', component: item},
    {path: '/order', name: 'order', component: order},
    {path: '/account/myItems', component: myItems},
    {path: '/account/myOrders', component: myOrders},
    {
      path: '/chat/:otherSideId',
      name: 'chat',
      component: chatRoom
    },
    {path: '/settle', name: 'settle', component: settle}
  ],
})
