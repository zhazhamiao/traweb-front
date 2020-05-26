<template>
  <div id="search">
    <van-sticky :offset-top="46">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键字"
        shape="round"
        show-action
        @search="">
        <template #action>
          <!--        <van-button type="primary" @click="OnSearch">搜索</van-button>-->
          <van-button
            size="small"
            color="#7232dd"
            round @click="">搜索
          </van-button>
        </template>
      </van-search>
    </van-sticky>
    <el-backtop/>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        value: ''
      }
    }
  }
</script>

<style scoped>

</style>
