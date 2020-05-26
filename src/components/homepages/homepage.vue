<template>
  <div id="homepage">
    <transition mode="out-in">
      <router-view></router-view>
    </transition>

    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item name="types" icon="ascending">分类</van-tabbar-item>
      <van-tabbar-item name="add">
        <template #icon="props">
          <van-button icon="plus" round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="handlerAdd"/>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="chat" icon="chat" >消息</van-tabbar-item>
      <van-tabbar-item name="account" icon="manager">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  export default {
    data() {
      return {
        active: 'home'
      }
    },
    methods: {
      ...mapMutations(["setTitle"]),
      onChange(index) {
        if (index === "home") {
          this.$router.push({path: "/"});
        } else if (index === "account") {
          //如果尚未登录，点击账户时直接转到登录界面
          if (!localStorage.authorization) {
            this.$router.push({path: "/login"})
          } else {
            this.$router.push({path: "/account"})
          }
        } else if (index === "types") {
          this.$router.push({path: "/types"})
        } else if (index === "chat") {
          this.$router.push({path: "/chat"})
        }
      },
      handlerItemActive(val) {
        if (val === "/") {
          this.active = "home";
          this.setTitle('首页')
        } else if (val === "/account") {
          this.active = "account"
          this.setTitle('账户')
        } else if (val === "/types") {
          this.active = "types"
        }
      },
      handlerAdd() {
        this.$router.push("/addItem");
      }
    },
    watch: {
      "$route.path": function (newVal) {
        this.handlerItemActive(newVal);
      }
    },
    beforeMount() {
      this.handlerItemActive(this.$route.path);
    }
  }
</script>

<style scoped>
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.2s ease;
  }
</style>
