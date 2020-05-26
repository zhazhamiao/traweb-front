<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键字"
      shape="round"
      show-action
      @search="OnSearch">
      <template #action>
        <!--        <van-button type="primary" @click="OnSearch">搜索</van-button>-->
        <van-button
          size="small"
          color="#7232dd"
          round @click="OnSearch">搜索
        </van-button>
      </template>
    </van-search>
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(image,index) in images" :key="index">
        <img v-lazy="image"/>
      </van-swipe-item>
    </van-swipe>
    <van-grid :column-num="3">
      <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字"/>
    </van-grid>
    <van-button type="primary" @click="testToken">测试</van-button>
  </div>
</template>

<script>
  import Notify from "vant/lib/notify";

  export default {
    // name: "main"
    data() {
      return {
        value: '',
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
        ],
      }
    },
    methods: {
      testToken() {
        this.axios({
          method: "get",
          url: '/vocation/getMessage',
          params: {
            user: this.$store.state.user
          }
        }).then(response => {
          Notify({type: 'success', message: response.data})
        }).catch(err => {
          //console.log(err)
          Notify({type: 'danger', message: err.toString()})
        })
      },
      OnSearch() {
        console.log("search");
      }
    }
  }
</script>

<style>
  .my-swipe {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }

  img {
    height: 170px;
    width: 100%;
  }
</style>
