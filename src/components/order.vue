<template>
  <div id="order">

    <el-card body-style="padding: 0 5px">
      <div class="div-title">
        发起人
      </div>
      <div class="title" style="padding-bottom: 10px;font-size: 15px;font-weight: bold">
        <van-row>
          <van-col span="12" style="line-height: 44px">
            <van-icon name="manager" class="icon-cart"/>
            {{ seller.username }}
          </van-col>
          <van-col offset="3" span="8" style="text-align: right">
            <van-button
              v-if="seller.id&&seller.id!==$store.state.uid"
              round
              @click="$router.replace({name: 'chat',params: {otherSideId: seller.id}})"
              color="linear-gradient(to right, #30cfd0 0%, #330867 100%)"
              type="default" size="normal"
              style="width: 100%;font-size: 16px">联系他
            </van-button>
          </van-col>
        </van-row>
      </div>
      <div class="div-information">
        <van-row style="line-height: 50px">
          <van-col span="8">
            姓名: {{seller.name}}
          </van-col>
          <van-col offset="2" span="12">
            电话: {{seller.phone}}
          </van-col>
        </van-row>
      </div>
    </el-card>
    <el-card body-style="padding: 5px 0">
      <div class="title" style="font-size: 15px;font-weight: 500">
        <van-icon name="bars" class="icon-manager" color="crimson"/>
        订单编号: {{ data.order.orderId}}
      </div>
      <van-card
        :key="data.item.id"
        :desc="data.item.description"
        :title="data.item.name"
        :thumb="axios.defaults.baseURL+data.item.img"
      />
      <van-row style="margin-top: 5px">
        <van-col span="11" style="text-align: left">
          <span class="span-date">下单日期: {{data.order.launchDate}}</span>
        </van-col>
        <van-col span="11" style="text-align: left" v-show="data.order.endDate">
          <span class="span-date">结束日期: {{data.order.endDate}}</span>
        </van-col>
      </van-row>
    </el-card>

    <el-card body-style="padding: 0 5px">
      <div class="div-title">
        承接人
      </div>
      <div class="title" style="padding-bottom: 10px;font-size: 15px;font-weight: bold">
        <van-row>
          <van-col span="12" style="line-height: 44px">
            <van-icon name="manager" class="icon-cart"/>
            {{ buyer.username }}
          </van-col>
          <van-col offset="3" span="8" style="text-align: right">
            <van-button
              v-if="buyer.id&&buyer.id!==$store.state.uid"
              round
              size="normal"
              @click="$router.replace({name: 'chat',params: {otherSideId: buyer.id}})"
              color="linear-gradient(to right, #30cfd0 0%, #330867 100%)"
              style="width: 100%;font-size: 16px">联系他
            </van-button>
          </van-col>
        </van-row>
      </div>
      <div class="div-information">
        <van-row style="line-height: 50px">
          <van-col span="8">
            姓名: {{buyer.name}}
          </van-col>
          <van-col offset="2" span="12">
            电话: {{buyer.phone}}
          </van-col>
        </van-row>
      </div>
    </el-card>
    <footer v-if="data.order.status === 0">
      <van-row>
        <van-col offset="10" span="6">
          <van-button round style="width: 100%" size="normal" color="crimson" @click="onCancel">取消订单</van-button>
        </van-col>
        <van-col offset="1" span="6" v-if="buyer.id&&buyer.id!==$store.state.uid">
          <van-button round style="width: 100%" size="normal" color="crimson" @click="onComplete">完成订单</van-button>
        </van-col>
      </van-row>
    </footer>
  </div>
</template>

<script>
  import {Dialog, Toast} from 'vant';

  export default {
    name: "order",
    data() {
      return {
        data: this.$route.params.data,
        seller: '',
        buyer: ''
      }
    },
    methods: {
      onCancel() {
        Dialog.confirm({
          message: '确认要取消订单吗?'
        }).then(() => {
          this.axios({
            method: "PUT",
            url: '/vocation/cancelOrder',
            params: {
              orderId: this.data.order.orderId,
              uid: this.$store.state.uid
            }
          }).then(response => {
            Toast.success("成功取消订单");
          }).catch(err => {
            Toast.fail("操作失败了");
          })
          this.$router.go(-1);
        }).catch(() => {
        })
      },
      onComplete() {
        Dialog.confirm({
          message: '确认订单已完成?'
        }).then(() => {
          this.axios({
            method: "PUT",
            url: '/vocation/completeOrder',
            params: {
              orderId: this.data.order.orderId,
              uid: this.$store.state.uid
            }
          }).then(response => {
            Toast.success("订单已完成");
          }).catch(err => {
            Toast.fail("操作失败了");
          })
          this.$router.go(-1);
        }).catch(() => {
        })
      }
    },
    beforeMount() {
      this.$store.commit("setTitle", "订单详情");
      this.axios({
        method: "GET",
        url: '/account/byUidDetailed',
        params: {
          uid: this.data.order.seller
        }
      }).then(response => {
        this.seller = response.data;
      })
      this.axios({
        method: "GET",
        url: '/account/byUidDetailed',
        params: {
          uid: this.data.order.buyer
        }
      }).then(response => {
        this.buyer = response.data
      })
    }
  }
</script>

<style scoped>
  .icon-cart {
    color: crimson;
    font-size: 17px;
  }

  .title {
    text-align: left;
    border-bottom: 1px solid #c0c4cc;
    padding: 5px 15px;
    font-weight: 500;
  }

  .el-card {
    margin: 5px 5px 0 5px;
  }

  .van-card {
    background-color: #fff;
    text-align: left;
    padding: 8px 16px;
    border-bottom: 1px solid #c0c4cc;
  }

  .div-title {
    color: #646566;
    font-size: 15px;
    border-bottom: 1px solid gainsboro;
    font-weight: 500;
    padding: 5px 15px;
    text-align: left;
    line-height: 25px;
  }

  .div-information {
    text-align: left;
    padding: 5px 15px;
    font-weight: 600;
    font-size: 17px;
  }

  .van-button__text {
    color: #fff;
  }

  .span-date {
    padding: 0 5px 0 20px;
    color: #646566;
    font-size: 12px;
    line-height: 18px;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fff;
  }

  footer .van-button {
    margin-top: 4px;
  }

  footer .van-button__text {
    color: #fff;
  }
</style>
