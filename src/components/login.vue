<template>
  <div id="login">
    <br/>
    <van-divider>
      <span style="font-size: 30px;">登录</span>
    </van-divider>
    <img src="@/assets/images/login.jpg" style="width: 250px;height: 250px"/>
    <div id="loginbox" style="margin-top: 40px">
      <van-form @submit="login">
        <van-field
          v-model="ruleForm.username"
          size="large"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          autocomplete="off"
          :rules="[{ required: true, message:'请输入用户名'}]"
        />
        <van-field
          v-model="ruleForm.password"
          size="large"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message:'请输入密码'}]"
        />
        <br><br>
        <van-row>
          <van-col span="8" offset="3">
            <van-button type="primary" size="normal" block round>
              登录
            </van-button>
          </van-col>
          <van-col span="8" offset="2">
            <van-button type="info" size="normal" block round to="register">
              注册
            </van-button>
          </van-col>
        </van-row>
      </van-form>
    </div>
  </div>
</template>

<script>
  import Toast from "vant/lib/Toast";
  import jwt from 'jwt-decode'
  import Socket from "../assets/js/websocket";
  import store from "../store";

  export default {
    data() {
      return {
        ruleForm: {
          username: '',
          password: ''
        },
        flag: false
      }
    },
    methods: {
      login() {
        this.axios({
          method: "post",
          url: '/account/login',
          data: this.$qs.stringify(this.ruleForm)
        }).then(response => {
          if (response.data.rpb.status === "success") {
            //this.$store.commit("setCurrentUser", response.data.userInfo);
            const token = response.data.token;
            //localStorage.setItem('eleToken',token);
            this.$store.commit("changeLogin", token);
            this.$store.commit("setUser", this.ruleForm.username);
            this.$store.commit("setUid",response.data.uid);
            Socket.init(store.state.uid);
            Socket.onMessage((response) => {
              store.commit("addMessage", response);
            })
            store.state.socket = Socket;
            Toast.success('登陆成功,正在进入主页面')
            setTimeout(() => {
              this.$router.push({path: "/"});
            }, 1000)
          } else if (response.data.rpb.staus === "failed") {

          }
        })
      },
    },
    beforeMount() {
      this.$store.commit("setTitle","登录");
    }
  }
</script>

<style scoped>
  #login {
    background: url("../assets/images/background2.jpg");
    width: 100%;
    position: absolute;
    top: 47px;
    bottom: 0;
    left: 0;
  }
  #loginbox {
    margin-top: 20px;
  }
  .van-field {
    background-color: rgba(255, 255, 255, 0.3)
  }
</style>
