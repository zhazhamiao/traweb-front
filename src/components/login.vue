<template>
  <div id="login">
    <br/>
    <van-divider>
      <span style="font-size: 30px;">登录</span>
    </van-divider>
    <img src="@/assets/images/login.jpg" style="width: 250px;height: 250px"/>
    <div id="loginbox" style="margin-top: 40px">
      <!-- 登录表单 -->
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
            <!-- 跳转到注册界面 -->
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
      // 发送到服务端进行校验
      login() {
        this.axios({
          method: "post",
          url: '/account/login',
          data: this.$qs.stringify(this.ruleForm)
        }).then(response => {
          // 登录成功
          if (response.data.rpb.status === "success") {
            //this.$store.commit("setCurrentUser", response.data.userInfo);
            const token = response.data.token;
            // 通过vuex将登录状态保存到全局
            this.$store.commit("changeLogin", token);
            this.$store.commit("setUser", this.ruleForm.username);
            this.$store.commit("setUid",response.data.uid);
            // 连接websocket
            Socket.init(store.state.uid);
            // 接收消息时回调vuex中addMessage方法
            Socket.onMessage((response) => {
              store.commit("addMessage", response);
            })
            store.state.socket = Socket;
            Toast.success('登录成功,正在进入主页面')
            setTimeout(() => {
              this.$router.push({path: "/"});
            }, 1000)
          } else {
            // 登录失败
            Toast.fail('登录失败');
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
