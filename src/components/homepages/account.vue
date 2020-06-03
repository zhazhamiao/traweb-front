<template>
  <div id="account" style="background: #f7f8fa">
    <br/>
    <van-row class="user-information">
      <van-col span="5">
        <van-image
          width="4rem"
          height="4rem"
          lazy-load=""
          style="padding-top: 4px"
          :src="imgSrc">
          <template v-slot:loading>
            <van-loading type="spinner" size="4rem"/>
          </template>
        </van-image>
      </van-col>
      <van-col offset="1" span="10" style="margin-top: 10px;text-align: left">
        <label class="label-username">{{ this.user.username }}</label><br/>
        <span class="span-uid">uid:{{this.user.id}}</span>
      </van-col>
      <van-col span="2" offset="5" style="margin-top: 10px">
        <van-icon name="setting-o" size="25px" @click="$router.push({path:'/setting'})"></van-icon>
      </van-col>
    </van-row>


    <el-card body-style="padding: 5px 0">
      <div class="title" style="">
        <van-icon name="manager" class="icon-manager"/>
        我的发布
      </div>
      <br/>
      <van-row class="operation-bar">
        <van-col span="6" @click="onMyItems(0)">
          <van-icon name="cart-o" class="icons"/>
          <br/>
          <label class="label-item">审核中</label>
        </van-col>
        <van-col span="6" @click="onMyItems(1)">
          <van-icon name="logistics" class="icons"/>
          <br/>
          <label class="label-item">进行中</label>
        </van-col>
        <van-col span="6" @click="onMyItems(2)">
          <van-icon name="flag-o" class="icons"/>
          <br/>
          <label class="label-item">已完成</label>
        </van-col>
      </van-row>
    </el-card>
    <el-card body-style="padding: 5px 0" style="margin-top: 4px">
      <div class="title" style="">
        <van-icon name="wap-nav" class="icon-manager"/>
        我的订单
      </div>
      <br/>
      <van-row class="operation-bar">
        <van-col span="6" @click="onMyOrders(0)">
          <van-icon name="play-circle" class="icons"/>
          <br/>
          <label class="label-item">处理中</label>
        </van-col>
        <van-col span="6" @click="onMyOrders(1)">
          <van-icon name="checked" class="icons"/>
          <br/>
          <label class="label-item">已完成</label>
        </van-col>
        <van-col span="6" @click="onMyOrders(2)">
          <van-icon name="clear" class="icons"/>
          <br/>
          <label class="label-item">已取消</label>
        </van-col>
      </van-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: '',
        imgSrc: ''
      }
    },
    methods: {
      setting() {
        console.log("setting")
      },
      onMyItems(active) {
        this.$router.push({
          path: '/account/myItems',
          query: {
            active: active
          }
        })
      },
      onMyOrders(active) {
        this.$router.push({
          path: '/account/myOrders',
          query: {
            active: active
          }
        })
      }
    },
    created() {
      this.axios({
        method: "GET",
        url: '/account/getInformation',
        params: {
          username: this.$store.state.user
        }
      }).then(response => {
        if (response.data) {
          this.user = response.data;
          this.imgSrc = this.axios.defaults.baseURL + this.user.img;
        }
      })
    }
  }
</script>

<style scoped>
  .user-information {
    border-radius: 25px;
    margin: 0 10px;
    padding: 20px 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .label-username {
    position: relative;
    margin: 0 auto;
    font-weight: bold;
    font-size: 24px;
    color: #5c5b5b;
  }

  .label-item {
    font-size: 13px;
    font-weight: bold;
    line-height: 20px;
    color: #999999;
    /*color: #e33e33;*/
  }

  .van-row {
    background: white;

  }
  .icons {
    font-size: 45px;
    margin-top: 8px;
    margin-bottom: 2px;
    color: crimson;
  }
  .van-button {
    margin-top: 8px;
    margin-bottom: 2px;
  }

  .operation-bar {
    border-radius: 20px;
    margin: 0px 15px;
  }

  .van-divider {
    margin: 10px;
  }

  .title {
    text-align: left;
    border-bottom: 1px solid #c0c4cc;
    padding-left: 20px;
    color: #999999;
    padding-bottom: 12px;
    font-size: 15px;
    font-weight: bold
  }

  .el-card {
    padding: 15px 0;
    border-radius: 15px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
  }
  .span-uid {
    text-align: left;
    padding: 5px 3px;
    font-weight: 500;
  }
</style>
