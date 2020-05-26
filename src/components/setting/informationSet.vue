<template>
  <div id="informationSet">
    <van-cell-group>
      <van-cell title="头像" icon="user-o" title-style="text-align:left" size="large">
        <template #right-icon>
          <van-image round width="1.5rem" height="1.5rem" :src="imgSrc"/>
          &nbsp;&nbsp;
          <van-icon name="arrow" size="1.5rem"/>
        </template>
      </van-cell>
      <van-cell title="昵称" icon="notes-o" title-style="text-align:left" :value="this.user.username"/>
      <van-cell title="UID" icon="notes-o" title-style="text-align:left" :value="this.user.id"/>
    </van-cell-group>
    <br/>
    <van-cell-group>
      <van-cell title="性别" icon="friends-o" title-style="text-align:left" is-link @click="sexPopup = true">
        <template #default>
          {{ formatSex(user.sex) }}
        </template>
      </van-cell>
      <van-cell title="姓名" icon="notes-o" title-style="text-align:left" :value="this.user.name" is-link
                @click="namePopup = true"/>
      <van-cell title="电话" icon="notes-o" title-style="text-align:left" :value="this.user.phone" is-link
                @click="showKeyboard = true"/>
    </van-cell-group>
    <van-divider/>

    <van-popup
      v-model="sexPopup"
      position="bottom">
      <van-picker :columns="sexColumns" @change="onChange" :default-index="user.sex"/>
    </van-popup>

    <van-popup
      v-model="namePopup"
      round>
      <van-field v-model="user.name"/>
    </van-popup>

    <van-number-keyboard
      :maxlength="11"
      v-model="user.phone"
      :show="showKeyboard"
      theme="custom"
      close-button-text="完成"
      @blur="showKeyboard = false"
    />

    <van-button type="info" class="button-update" @click="updateInformation">更新用户信息</van-button>
  </div>

</template>

<script>
  import Notify from "vant/lib/notify";

  export default {
    data() {
      return {
        user: '',
        imgSrc: '',
        sexPopup: false,
        sexColumns: ['女', '男', '保密'],
        namePopup: false,
        showKeyboard: false
      }
    },
    methods: {
      formatSex(value) {
        if (value === 1) {
          return "男";
        } else if (value === 0) {
          return "女";
        } else {
          return "保密";
        }
      },
      updateInformation() {
        this.axios({
          method: "PUT",
          url: "/account/updateInfo",
          data: this.$qs.stringify(this.user)
        }).then(response => {
          if (response.data.status === "success") {
            Notify({type: "success", message: response.data.msg, duration: 1000})
          } else {
            Notify({type: "danger", message: response.data.msg, duration: 1000})
          }
        }).catch(response => {
          console.log(response.data);
        })
      },
      onChange(picker, value, index) {
        this.user.sex = index;
      }
    },
    beforeMount() {
      this.axios({
        method: "GET",
        url: '/account/getInformation',
        params: {
          username: this.$store.state.user
        }
      }).then(response => {
        if (response.data) {
          this.user = response.data;
          this.imgSrc = this.axios.defaults.baseURL + this.user.img;
        }
      })
    }
  }
</script>

<style scoped>
  .button-update {
    width: 90%;
    text-align: center;
  }
</style>
