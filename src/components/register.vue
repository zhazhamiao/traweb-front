<template>
  <div id="register">
    <br/><br>
    <van-divider>
      <span style="font-size: 30px;">注册</span>
    </van-divider>
    <br/>
    <van-form @submit="register">
      <br/>
      <van-field
        v-model="ruleForm.username"
        size="large"
        name="username"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[
          { required:true, message: '用户名不能为空'},
          { validator:usernameValidator, message:'已存在的用户名' }]"
      />
      <br/>
      <van-field
        v-model="ruleForm.password"
        size="large"
        type="password"
        name="password"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required:true, message: '密码不能为空'},
          { validator:passwordValidator ,message:'密码应混合字母数字，且不少于9位' }]"
      />
      <!--      <label class="passHint">注意:密码应混合字母数字，且不少于9位</label>-->
      <van-field
        v-model="ruleForm.checkpass"
        size="large"
        type="password"
        name="checkpass"
        label="确认密码"
        placeholder="请确认密码"
        :rules="[{ validator:checkpassValidator ,message:'两次输入的密码不一致'}]"/>
      <br/><br/>
      <van-row>
        <van-col span="20" offset="2">
          <van-button block round type="primary" native-type="提交" size="normal" @click="register">
            立即注册
          </van-button>
        </van-col>
      </van-row>
    </van-form>
  </div>
</template>
<script>
  import Notify from "vant/lib/notify";
  import Toast from "vant/lib/Toast";

  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          checkpass: ''
        }
      }

    },
    methods: {
      usernameValidator(val) {
        //该校验应该是异步的
        return new Promise((resolve) => {
          this.axios({
            method: "get",
            url: "/account/checkRepeat",
            params: {
              username: val
            }
          }).then(response => {
            if (response.data.status === "failed") {
              //Toast.fail(response.data.msg);
              resolve(false);
            }
          })
        })
      },
      //密码复杂度校验
      passwordValidator(val) {
        const regex = new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{9,30}");
        if (val === "") {
          return false;
        } else if (!regex.test(val)) {
          return false;
        }
        return true;
      },
      checkpassValidator(val) {
        if (val === "") {
          return false;
        } else if (val !== this.ruleForm.password) {
          return false;
        }
        return true;
      },
      register() {
        this.axios({
          method: "post",
          url: "/account/register",
          data: this.$qs.stringify(this.ruleForm)
        }).then(response => {
          if (response.data.status === "success") {
            Notify({type: 'success', message: response.data.msg});
            this.$router.push({path:'/login'})
          } else if (response.data.status === "failed") {
            Notify({type: 'warning', message: response.data.msg});
          }
        });
      }
    }
  }
</script>
<style scoped>
  .passHint {
    font-size: 10px;
    margin-left: -60px;
    color: #c49954;
  }
  #register {
    background: url("../assets/images/background2.jpg");
    width: 100%;
    position: absolute;
    top: 47px;
    bottom: 0;
    left: 0;
  }
  .van-field {
    background-color: rgba(255, 255, 255, 0.4)
  }
</style>
