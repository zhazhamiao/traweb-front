<template>
  <div id="search">
    <van-sticky :offset-top="46">
      <form action="/">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键字"
          shape="round"
          show-action
          @search="onSearch">
          <template #action>
            <!--        <van-button type="primary" @click="OnSearch">搜索</van-button>-->
            <van-button
              size="small"
              color="crimson"
              round
              @click="onSearch">搜索
            </van-button>
          </template>
        </van-search>
      </form>
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
    },
    methods: {
      onSearch() {
        this.$router.replace({
          path: '/search/all',
          query: {
            keyword: this.value
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
