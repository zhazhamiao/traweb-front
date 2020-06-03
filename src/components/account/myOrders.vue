<template>
  <div id="myOrders">
    <van-tabs v-model="active" sticky @click="onTabSelect" @change="onTabChange" offset-top="46">
      <van-tab v-for="index in 3" :key="index" :title="title[index-1]">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <el-card v-for="data in orders" :key="data.order.orderId" body-style="padding: 5px 0">
            <div class="title" style="font-size: 15px;font-weight: 500">
              <van-icon name="bars" class="icon-manager" color="crimson"/>
              订单编号: {{ data.order.orderId}}
            </div>
            <van-card
              :key="data.item.id"
              :desc="data.item.description"
              :title="data.item.name"
              :thumb="axios.defaults.baseURL+data.item.img"
              @click="$router.push({name:'order',params:{data: data}})"
            />
            <van-row style="margin-top: 5px">
              <van-col span="11" style="text-align: left">
                <span class="span-date">下单时间: {{data.order.launchDate}}</span>
              </van-col>
              <van-col span="11" style="text-align: left" v-show="data.order.endDate">
                <span class="span-date">结束时间: {{data.order.endDate}}</span>
              </van-col>
            </van-row>
          </el-card>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: "myOrders",
    data() {
      return {
        active: this.$route.query.active | 0,
        title: ['处理中', '已完成', '已取消'],
        orders: [],
        loading: false,
        finished: false
      }
    },
    methods: {
      onTabSelect(name) {
        this.finished = false;
        this.orders = [];
        this.page = 1;
      },
      onTabChange(name) {
        this.finished = true;
      },
      onLoad() {
        this.axios({
          method: "GET",
          url: '/order/getRelatedOrders',
          params: {
            uid: this.$store.state.uid,
            status: this.active
          }
        }).then(response => {
          let orders = response.data;
          orders.forEach(async (val) => {
            await this.axios({
              method: "GET",
              url: '/item/getItemById',
              params: {
                itemId: val.itemId
              }
            }).then(response => {
              this.orders.push({
                order: val,
                item: response.data
              })
            })
          })
          this.finished = true;
          this.loading = false;
        })
      }
    },
    beforeMount() {
      this.$store.commit("setTitle","我的订单")
    }
  }
</script>

<style scoped>
  .title {
    text-align: left;
    border-bottom: 1px solid #c0c4cc;
    padding-left: 15px;
    line-height: 30px;
  }

  .van-card {
    background-color: #fff;
    text-align: left;
    padding: 8px 16px;
    border-bottom: 1px solid #c0c4cc;
  }

  .el-card {
    margin-bottom: 2px;
  }

  .span-date {
    padding: 0 5px 0 20px;
    color: #646566;
    font-size: 12px;
    line-height: 18px;
  }
</style>
