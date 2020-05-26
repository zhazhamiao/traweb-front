<template>
  <div id="item">
    <transition mode="out-in" appear>
      <div>
        <el-card shadow="always" body-style="padding:1px;margin-bottom:12px">
          <el-avatar
            :src="imgSrc"
            :key="imgSrc"
            shape="square"
            style="float: left;margin-left: 10px"
            :size="50"/>
          <span class="seller_username">{{ this.seller.username }}</span>
        </el-card>
        <van-image
          width="20rem"
          height="20rem"
          fit="cover"
          style="padding-top: 10px"
          :src="item?(axios.defaults.baseURL+item.img):''"/>
        <br/>
        <van-cell-group>
          <van-cell class="item_name" :title="item.name" icon="description"/>
          <van-cell title-style="text-align:left">
            <template #title>
              <span class="item_price">¥{{ item.price }}</span>
            </template>
            <template #default>
              x{{ item.quantity }}&nbsp;&nbsp;&nbsp;&nbsp;
            </template>
          </van-cell>
        </van-cell-group>
        <van-panel :title="item.description" class="item_description"/>
      </div>
    </transition>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="交流" @click="onChat"/>
      <van-goods-action-icon icon="star-o" text="收藏" @click=""/>
      <van-goods-action-button
        type="warning"
        text="我想要"
        @click=""
        color="linear-gradient(to right, #30cfd0 0%, #330867 100%)"
      />
    </van-goods-action>
  </div>
</template>

<script>
  export default {
    name: "item",
    data() {
      return {
        item: '',
        seller: '',
        imgSrc:''
      }
    },
    methods: {
      getSeller() {
        this.axios({
          method: "GET",
          params: {
            uid : this.item.seller
          },
          url: '/account/byUid'
        }).then(response => {
          this.seller = response.data;
          this.imgSrc = this.axios.defaults.baseURL + this.seller.img;
        })
      },
      getItem() {
        this.axios({
          method:"GET",
          params: {
            itemId : this.$route.query.id
          },
          url: '/item/getItemById'
        }).then(response => {
          this.item = response.data;
          this.getSeller();
        })
      },
      onChat() {
        this.$router.push({
          name: 'chat',
          params: {
            item: this.item,
            otherSideId: this.item.seller
          }
        })
      }
    },
    created() {
      this.$store.commit("setTitle",'商品');
      this.getItem();
    },
    computed: {

    }
  }
</script>

<style scoped>
  .item_name {
    text-align: left;
    font-weight: bold;
    font-size: 17px;
    padding-left: 30px;

  }

  .item_price {
    color: crimson;
    font-size: 20px;
    text-align: left;
    font-weight: bolder;
    padding-left: 20px;
  }

  .item_description {
    font-size: 15px;
    text-align: left;
    display: block;
  }

  .seller_username {
    font-size: 22px;
    float: left;
    font-weight: bolder;
    margin-left: 10px;
  }

  .van-goods-action {
    position: absolute;
  }

  .el-card {
    padding-bottom: 12px;
  }
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
