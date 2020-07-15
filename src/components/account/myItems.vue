<template>
  <div id="myItem">
    <van-tabs v-model="active" sticky @click="onTabSelect" @change="onTabChange" offset-top="46">
      <van-tab v-for="index in 3" :key="index" :title="title[index-1]">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <van-card
            v-for="item in list"
            :key="item.id"
            :num="item.quantity"
            :desc="item.description"
            :price="item.price"
            :title="item.name"
            :thumb="axios.defaults.baseURL+item.img"
          />
        </van-list>
      </van-tab>
    </van-tabs>
    <el-backtop/>
  </div>
</template>

<script>
  export default {
    name: "myItem",
    data() {
      return {
        title:['审核中','进行中','已完成'],
        active: this.$route.query.active|0,
        list: [],
        loading: false,
        finished: false,
      }
    },
    methods: {
      onTabSelect(name) {
        this.finished= false;
        this.list = [];
        this.page = 1;
      },
      onTabChange(name) {
        this.finished = true;
      },
      onLoad() {
        this.finished = false;
        this.axios({
          method: "GET",
          params: {
            uid: this.$store.state.uid,
            status: this.active,
          },
          url: "/item/itemsStatus"
        }).then(response => {
          let items = response.data;
          items.forEach((value) => {
            this.list.push(value)
          })
          this.finished = true;
          this.loading = false;
        })
      }
    },
    beforeMount() {
      this.$store.commit("setTitle","我的需求");
    }
  }
</script>

<style scoped>
.van-card {
  text-align: left;
  background-color: #fff;
}
</style>
