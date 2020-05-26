<template>
  <div id="account" style="background: #f7f8fa">
    <van-row>
      <van-col span="5">
        <van-image
          round
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
      <van-col span="6" style="margin-top: 23px">
        <label class="label-username">{{ this.user.username }}</label>
      </van-col>
      <van-col span="2" offset="10" style="margin-top: 10px">
        <van-icon name="setting-o" size="25px" @click="$router.push({path:'/setting'})"></van-icon>
      </van-col>
    </van-row>
    <van-divider/>
    <van-row class="operation-bar">
      <van-col span="6">
        <van-button icon="shop" round color="#e33e33" to="/account/myItems" plain/>
        <br/>
        <label class="label-item">我的商品</label>
      </van-col>
      <van-col span="6">
        <van-button icon="paid" round color="#e33e33" plain/>
          <br/>
          <label class="label-item">待付款</label>
      </van-col>
      <van-col span="6">
        <van-button round icon="logistics" color="#e33e33" plain/>
        <br/>
        <label class="label-item">待收货</label>
      </van-col>
      <van-col span="6">
        <van-button round icon="records" color="#e33e33" plain/>
        <br/>
        <label class="label-item">全部订单</label>
      </van-col>
    </van-row>
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
        }
      },
      beforeCreate() {
          this.axios({
            method: "GET",
            url: '/account/getInformation',
            params: {
              username : this.$store.state.user
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
.label-username {
  position: relative;
  margin: 0 auto;
  font-weight: bold;
  font-size: 24px;
  color: #5c5b5b;
}
.label-item {
  font-size: 12px;
  font-weight: bold;
  /*color: #e33e33;*/
}
  .van-row {
    background: white;

  }
  .van-button {
    margin-top: 8px;
    margin-bottom: 2px;
  }
  .operation-bar {
    border-radius: 50px;
    margin: 0px 15px;
  }
  .van-divider {
    margin: 10px;
  }
</style>
