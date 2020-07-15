<template>
  <div id="chatRoom">
    <!-- 如果是从商品列表点进去的 显示商品链接 -->
    <el-card v-if="$route.params.item" shadow="always"
             body-style="padding:1px">
      <van-card
        :key="$route.params.item.id"
        :thumb="axios.defaults.baseURL+$route.params.item.img"
        style="padding: 0px 5px"
      >
        <template #title>
          <van-col offset="1" span="11">
            <br/>
            <span style="font-weight: bolder;font-size: 20px">
              ¥{{$route.params.item.price}}
            </span>
          </van-col>
        </template>
        <template #bottom>
          <van-row>
            <van-col offset="1" span="11">
              <van-button size="normal" color="crimson" style="width: 100%"
                          @click="$router.push({name:'settle',params:{item: $route.params.item}})">立即下单</van-button>
            </van-col>
            <van-col offset="1" span="11">
              <van-button size="normal" color="crimson" style="width: 100%"
                          @click="sendMessage('title: '+$route.params.item.name)">发送链接</van-button>
            </van-col>
          </van-row>
        </template>
      </van-card>
    </el-card>
    <van-row
      id="message" v-for="(item,index) in messages" :key="index"
      style="margin:15px 0">
      <div v-if="item.type === 'receive'">
        <van-col :span="4">
          <el-avatar
            :size="50"
            :src="otherSide?(axios.defaults.baseURL+otherSide.img):''"
            :key="axios.defaults.baseURL+otherSide.img"/>
        </van-col>
        <van-col :span="19">
            <span
              class="span__username"
              style="float: left;margin-left: 5px">
              {{ otherSide.username }}
            </span>
          <br/>
          <div class="div-message"
               style="float:left">{{item.msg}}</div>
        </van-col>
      </div>
      <div v-else>
        <van-col :span="19" :offset="1">
            <span
              class="span__username"
              style="float: right;margin-right: 5px">
              {{ self.username }}
            </span>
          <br/>
          <div class="div-message"
               style="background: #19b5fe;color: white;float:right">{{ item.msg }}</div>
        </van-col>
        <van-col :span="4">
          <el-avatar
            :size="50"
            :src="self?(axios.defaults.baseURL+self.img):''"
            :key="axios.defaults.baseURL+self.img"/>
        </van-col>
      </div>
    </van-row>
    <br/><br/>
    <van-row class="__input">
      <van-col span="22">
        <el-input
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 6}"
          placeholder="想说点什么呢?"
          style="font-size: 16px"
          v-model="message"/>
      </van-col>
      <van-col span="2">
        <i
          @click="sendMessage(message)"
          class="el-icon-d-arrow-right"
          style="font-size: 34px;margin-top: 0"/>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "chatRoom",
    data() {
      return {
        message: '',
        messages: [],
        self: '',
        otherSide: ''
      }
    },
    methods: {
      sendMessage(message) {
        if (message) {
          let data = {
            toUserId: this.otherSide.id,
            message: message
          };
          this.$store.state.socket.send(data);
          this.messages.push({type: 'send', msg: message});
          this.message = '';
        }
      }
    },
    beforeMount() {
      this.axios({
        method: "GET",
        params: {
          uid: this.$store.state.uid
        },
        url: '/account/byUid'
      }).then(response => {
        this.self = response.data;
      });
      this.axios({
        method: "GET",
        params: {
          uid: this.$route.params.otherSideId
        },
        url: '/account/byUid'
      }).then(response => {
        this.otherSide = response.data;
        this.$store.commit("setTitle", this.otherSide.username);
        //初始化一下
        this.$store.commit("initContact", this.otherSide.id);
        this.messages = this.$store.state.contactMap.get(this.otherSide.id);
      });
    },
    watch: {
      messages() {
        this.$nextTick(() => {
          let container = document.getElementById("chatRoom");
          document.documentElement.scrollTop = container.scrollHeight
        })
      },
    }
  }
</script>

<style scoped>
  .__input {
    background: #f7f8fa;
    display: block;
    height: auto;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
  }

  .div-message {
    font-size: 17px;
    border-radius: 15px;
    padding: 10px 15px;
    margin-bottom: 5px;
    width: auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    white-space: pre-wrap;
    text-align: left;
  }

  .span__username {
    font-size: 15px;
    font-weight: bold;
    color: gray;
  }

  .van-card {
    text-align: left;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
  }

</style>
