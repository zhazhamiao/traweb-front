<template>
  <transition appear mode="in-out">

    <div id="addItem">
      <van-divider/>
      <van-form @submit="onSubmit" id="itemForm" :validate-first="true">

        <van-uploader :after-read="afterRead">
          <van-image
            :src="itemImg.content"
            round
            icon="plus"
            width="12rem"
            height="12rem"
            fit="cover"
            class="item-img"
          >
            <template v-slot:loading>
              <van-icon name="plus" size="40px"/>
            </template>
          </van-image>
        </van-uploader>

        <van-divider/>
        <van-field
          name="name"
          label="商品名"
          placeholder="输入商品名"
          v-model="item.name"
          autocomplete="off"
          :rules="[{ required: true, message: '不能为空' }]"
        ></van-field>
        <van-field
          name="description"
          label="具体描述"
          v-model="item.description"
          placeholder="添加一个具体描述"
          rows="7"
          autosize
          type="textarea"
          autocomplete="off"
          :rules="[{ required: true, message: '不能为空'}]"
        ></van-field>
        <van-row>
          <van-col span="12">
            <van-field
              name="price"
              label="价格"
              v-model="item.price"
              type="number"
              autocomplete="off"
              :rules="[
              { required: true, message: '不能为空'},
              { validator:priceValidator, message: '输入的值不规范',trigger:'onChange'}]"
            />
          </van-col>
          <van-col span="12">
            <van-field
              name="quantity"
              label="数量"
              v-model="item.quantity"
              type="digit"
              autocomplete="off"
              :rules="[
              { required: true, message: '不能为空'},
              { validator:quantityValidator, message: '值应大于0'}]"
            />
          </van-col>
        </van-row>
        <van-divider/>
        <van-row>
          <van-col span="10" offset="2">
            <van-button
              block
              @click="typeSelectShow=true"
              native-type="button"
              size="normal"
              color="linear-gradient(to left, #88d3ce 0%, #6e45e2 100%)"
              class="typeSelect-text"
            >
              分类:&nbsp;{{ typeText }}
            </van-button>
          </van-col>
          <van-col span="8" offset="3">
            <van-button block round type="primary" size="normal"
                        color="linear-gradient(to right, #5ee7df 0%, #b490ca 100%)"
                        :disabled="enDisable">
              立即提交
            </van-button>
          </van-col>
        </van-row>
        <van-popup
          v-model="typeSelectShow"
          position="bottom">
          <van-tree-select
            :items="items"
            @click-nav="onClickNav"
            @click-item="onClickItem"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
          />
        </van-popup>
      </van-form>
    </div>
  </transition>
</template>

<script>
  import Notify from "vant/lib/notify";
  import { Dialog } from 'vant';

  export default {
    name: "addItem",
    data() {
      return {
        enDisable: false,
        item: {
          name: '',
          description: '',
          price: '',
          quantity: '',
          seller: this.$store.state.uid,
          categoryId: ''
        },
        itemImg: '',
        typeSelectShow: false,
        activeId: 0,
        activeIndex: 0,
        typeText: '',
        items: []
      }
    },
    methods: {
      afterRead(file) {
        this.itemImg = file;
        //console.log(file);
      },
      priceValidator(val) {
        let reg = new RegExp("^[0-9]{1,7}\\.[0-9]{1,2}$|^[0-9]{1,7}$");
        return reg.test(val);
      },
      quantityValidator(val) {
        return val > 0;
      },
      onSubmit(values) {
        if (this.itemImg === '' || this.item.categoryId === '') {
          Notify({type: 'warning', message: '有未填写的属性'});
          return;
        }
        this.enDisable = true;
        let data = new FormData();
        //踩坑,FormData添加图片对象应该是该对象下的file
        data.append("itemImg", this.itemImg.file);
        data.append("name", this.item.name);
        data.append("description", this.item.description);
        data.append("price", this.item.price);
        data.append("quantity", this.item.quantity);
        data.append("seller", this.item.seller);
        data.append("uid", this.$store.state.uid);
        data.append("categoryId", this.item.categoryId);
        this.axios({
          method: "POST",
          url: '/vocation/addItem',
          data: data,
          headers: {
            a: 'file'
          },
          processData: false,
          contentType: false
        }).then(response => {
          if (response.status === 200) {
            Dialog.alert({
                message: '提交成功,点确认返回主页'
            }).then(()=>{
              this.$router.push({path:"/"})
            })
          }
        }).catch(err => {
          Notify({type: 'danger', message: err.response.data.message})
        })
      },
      //点击分类列表左侧事件
      onClickNav(index) {
        /*
        * 根据index拿到一级分类的id，然后获取下属的二级分类
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
        this.typeText = data.text;
        this.item.categoryId = data.id;
        this.typeSelectShow = false;
      }

    },
    beforeMount() {
      this.axios({
        method: "GET",
        url: "/item/getTopCategories"
      }).then(response => {
        let categories = response.data;
        categories.forEach((data, index) => {
          this.items.push({
            text: data.name,
            id: data.id,
            children: []
          })
        })
        this.onClickNav(0);
      })
    }
  }
</script>

<style scoped>
  .van-image {
    border: 2px solid #19b5fe;
  }

  .typeSelect-text {
    font-family: "微软雅黑 Light",serif;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    padding-left: 5px;
    padding-right: 5px;
  }
  .v-enter {
    opacity: 0;
    transform: translateY(100%);
    position: absolute;
  }

  .v-leave-to {
    opacity: 0;
    transform: translateY(100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.3s ease;
  }

</style>
