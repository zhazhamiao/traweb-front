<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键字"
      shape="round"
      show-action
      @search="onSearch">
      <template #action>
        <van-button
          size="small"
          color="crimson"
          round @click="onSearch">搜索
        </van-button>
      </template>
    </van-search>
    <br/>
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(image,index) in images" :key="index">
        <img v-lazy="image"/>
      </van-swipe-item>
    </van-swipe>
    <br/>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad">
      <van-col span="12" v-for="(item,index) in list" :key="item.itemId" @click="$router.push({name:'item' ,query:{id:item.id}})">
        <el-card body-style=" padding: 2px">
          <img :src="axios.defaults.baseURL+item.img"
               class="image">
          <div style="padding: 8px;">
            <div class="item__name van-ellipsis">{{item.name}}</div>
            <div class="bottom clearfix">
              <div class="item__price">
                ¥{{item.price}}
              </div>
            </div>
          </div>
        </el-card>
      </van-col>
    </van-list>
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
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        page: 1
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
      onSearch(val) {
        this.$router.push({
          path: '/search/all',
          query: {
            keyword: this.value
          }
        })
      },
      onLoad() {
        this.axios({
          method: "GET",
          url: '/item/search',
          params: {
            keyword: '',
            page: this.page
          }
        }).then(response => {
          let items = response.data;
          items.forEach((value) => {
            this.list.push(value)
          })
          //加载结束
          if (items.length < 10) {
            this.finished = true;
          } else {
            this.page++;
          }
          this.loading = false;
        })
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
  .el-card {
    margin: 2px;
    border-radius: 10px;
  }

  .image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .bottom {
    text-align: left;
  }
  .item__name {
    font-size: 15px;
    font-weight: bold;
    width: 100%;
    padding: 2px 5px;
    text-align: left;
    border-top: 1px solid gainsboro;
  }
  .item__price {
    padding: 2px 5px;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    color: crimson;
  }

</style>
