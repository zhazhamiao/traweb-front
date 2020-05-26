<template>
  <div id="app" style="background: #f7f8fa">
    <van-sticky>
      <van-nav-bar
        @click-left="onclickLeft"
        @click-right="onclickRight"
        style="background: ghostwhite"
      >
        <template #title>
          <span class="title">{{ $store.state.title }}</span>
        </template>
        <template #left>
          <van-icon name="arrow-left" size="27"/>
        </template>
        <template #right>
          <van-icon name="wap-home-o" size="27"/>
        </template>
      </van-nav-bar>
    </van-sticky>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        title: '',

      }
    },
    methods: {
      onclickLeft() {
        this.$router.go(-1);
      },
      onclickRight() {
        this.$router.push({path: '/'})
      },
      onBackPressed() {
        this.$router.go(-1);
        return this.$route.path;
      }
    },
    watch: {
      "$route.path": function (newVal) {
      }
    },
    mounted() {
      window.onBackPressed = this.onBackPressed;
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    size: 30px;
    height: 100%;
    position: absolute;
    width: 100%;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    font-family: Arial, Helvetica, 'Microsoft YaHei', Tohoma, sans-serif;
    color: #6fa7fa;
  }

</style>
