<template>
  <transition mode="in-out" appear>
    <div>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <van-card
            v-for="item in list"
            :key="item.id"
            :num="item.quantity"
            :desc="item.description"
            :price="item.price"
            :title="item.name"
            :thumb="axios.defaults.baseURL+item.img"
            @click="$router.push({name:'item' ,query:{id:item.id}})"
          />
        </van-list>
      </van-pull-refresh>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "category",
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        page: 1
      }
    },
    methods: {
      onLoad() {
        this.axios({
          method: "GET",
          url: '/item/getItemsByCategory',
          params: {
            categoryId: this.$route.query.id,
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
      },
      onRefresh() {
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.list= [];
        this.loading = true;
        this.page = 1;
        this.onLoad();
        this.refreshing = false;
      }
    },
    beforeMount() {
    }
  }
</script>

<style scoped>
  .van-card {
    text-align: left;
  }

  .v-enter {
    opacity: 0;
    transform: translateX(-100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.2s ease;
  }
</style>
