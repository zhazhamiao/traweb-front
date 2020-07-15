<template>
  <div id="typeSelect">
    <van-tree-select
      :items="items"
      @click-nav="onClickNav"
      @click-item="onClickItem"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      height="600"
    >
    </van-tree-select>
  </div>
</template>

<script>
  export default {
    name: "typeSelect",
    data() {
      return {
        items: [
        ],
        activeId: 0,
        activeIndex: sessionStorage.getItem("activeIndex")|0,
      }
    },
    methods: {
      //点击分类列表左侧事件
      onClickNav(index) {
        /*
        * 根据index拿到一级分类的id，然后获取下属的二级分类
        * 添加一个判断是为了防止反复加载
        * */
        if (this.items[index].children.length === 0) {
          this.axios({
            method: "GET",
            url: "/item/getSecCategories",
            params: {
              topCategoryId: this.items[index].id
            }
          }).then(response => {
            let secCategories = response.data;
            /*secCategories.forEach((data, index) => {
              console.log(data)
              this.items[index].children.push(data)
            })*/
            for (let key in secCategories) {
              if (secCategories.hasOwnProperty(key)) {
                this.items[index].children.push({
                  text: secCategories[key].name,
                  id: secCategories[key].id
                })
              }
            }
          })
        }
      },
      /*
      * 点击右侧选项时
      * */
      onClickItem(data) {
        sessionStorage.setItem("activeIndex",this.activeIndex);
        this.$router.push({
          path:'/search/category',
          query:{
            id: data.id
          }
        })
      }
    },
    created() {
      this.$store.commit("setTitle","分类选择");
    },
    // 在vue组件挂载前从服务端请求所有一级分类项
    beforeMount() {
      this.axios({
        method: "GET",
        url: "/item/getTopCategories"
      }).then(response => {
        let categories = response.data;
        categories.forEach((data) => {
          /*
          * @param text 名称
          * @param id 数据库中对应的编号
          * @param children 属于该一级分类的二级分类
          * */
          this.items.push({
            text: data.name,
            id: data.id,
            children: []
          })
        })
        // 保证从其他页面返回后所选项与跳转前一致
        let index = sessionStorage.getItem("activeIndex")|0;
        this.onClickNav(index);
      })
    }
  }
</script>

<style scoped>

</style>
