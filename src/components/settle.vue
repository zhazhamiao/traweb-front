<template>
  <div id="settle">
    <br/>
    <el-card body-style="padding: 15px 0">
      <div class="title">订单结算</div>
      <van-row style="margin-top: 15px;height: 30px">
        <van-col span="3" offset="1"><van-icon name="cart" class="icon-manager"/></van-col>
        <van-col span="3" class="name">{{buyer.name}}</van-col>
        <van-col span="6" class="phone">{{buyer.phone}}</van-col>
      </van-row>
    </el-card>
    <br/>
    <el-card body-style="padding: 15px 0">
      <div class="title" style="padding-bottom: 10px;font-size: 15px;font-weight: bold">
        <van-icon name="manager" class="icon-cart"/>
        {{ seller.username }}
      </div>
      <van-card
        :key="item.id"
        :num="1"
        :desc="item.description"
        :price="item.price"
        :title="item.name"
        :thumb="axios.defaults.baseURL+item.img"
      />
    </el-card>
    <van-submit-bar
      button-text="提交订单"
      button-type="info"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
  import {Toast} from 'vant';
  export default {
    name: "settle",
    data() {
      return {
        //结算的商品
        item: this.$route.params.item,
        //发起人
        seller: '',
        //下单用户
        buyer: ''
      }
    },
    methods: {
      getKeyInfomations() {
        this.axios({
          method: "GET",
          params: {
            uid: this.item.seller
          },
          url: '/account/byUid'
        }).then(response => {
          this.seller = response.data;
        });
        //对于自身 我们希望拿到全部的信息
        this.axios({
          method: "GET",
          params: {
            username: this.$store.state.user
          },
          url: '/account/getInformation'
        }).then(response => {
          this.buyer = response.data;
        })
      },
      onSubmit() {
        this.axios({
          method: "POST",
          url: '/vocation/uploadOrder',
          data: this.$qs.stringify({
            buyer: this.buyer.id,
            itemId: this.item.id,
            //用于做权限校验
            uid: this.buyer.id
          })
        }).then(response => {
          Toast.success('订单已提交');
          this.$router.replace('/');
        })
      }
    },
    created() {
      this.getKeyInfomations()
    }
  }
</script>

<style scoped>
  .title {
    text-align: left;
    border-bottom: 1px solid #c0c4cc;
    padding-left: 20px;
    padding-bottom: 10px;
    font-weight: 500;
  }

  .name {
    text-align: left;
    font-size: 17px;
    padding-left: 5px;
    font-weight: bold;
    line-height: 32px
  }

  .phone {
    color: #a0a3a8;
    text-align: left;
    font-size: 14px;
    padding-top: 3px;
    font-weight: normal;
    line-height: 30px
  }

  .div-bottm {
    position: fixed;
    bottom: 0;
  }
  .van-submit-bar .van-button--info {
    background-color: crimson;
  }
  .van-card {
    background-color: #fff;
    text-align: left;
    padding: 8px 16px;
  }
  .el-card {
    margin: 0 10px;
  }

  .icon-manager {
    font-size: 30px;
    color: #dd6161;
  }
  .icon-cart {
    color: crimson;
    font-size: 17px;
  }
</style>
