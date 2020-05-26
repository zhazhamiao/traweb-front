<template>
  <div id="setting">
    <br/>
    <van-cell-group>
      <van-cell
        title="我的信息"
        title-style="text-align:left"
        icon="manager-o"
        is-link
        :value="$store.state.user"
        to="/setting/informationSet"/>
      <van-cell
        title="地址管理"
        title-style="text-align:left"
        icon="points-o"
        is-link
        to="/setting/addressSet"
        />
    </van-cell-group>
    <van-divider/>
    <van-button class="exit" @click="exit">退出当前账户</van-button>

  </div>
</template>

<script>
  import { Dialog } from 'vant';
  export default {
    methods: {
      exit() {
        Dialog.confirm({
          title:'确认要退出当前账户吗?'
        }).then(()=>{
          //on confirm
          localStorage.removeItem("authorization");
          this.$store.commit("exit");
          this.$router.push({path: '/login'});
        })
      }
    },
    components: {

    }
  }
</script>

<style scoped>
  .van-button {
    text-align: left;
  }

  .label-username {
    margin-left: 20px;
    text-decoration: underline;
    color: #5c5b5b;
    float: right;
  }

  .exit {
    width: 90%;
    text-align: center;
    color: crimson;
  }
</style>
