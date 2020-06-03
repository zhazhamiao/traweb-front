<template>
  <div id="messages">
    <el-card style="text-align: left;font-weight: bold;font-size: 15px">消息列表</el-card>
    <el-card
      v-for="contact in contacts"
      :key="contact.contact.id" shadow="hover"
      @click.native="$router.push({path:'/chat/'+contact.contact.id})">
      <van-row>
        <van-col span="4">
          <el-avatar
            :src="axios.defaults.baseURL+contact.contact.img"
            :key="axios.defaults.baseURL+contact.contact.img"
            shape="circle"
            :size="60"/>
        </van-col>
        <van-col offset="1" span="19">
          <div class="div-username">
            {{contact.contact.username}}
          </div>
          <div class="div-latestMessage">
            {{contact.latestMessage}}
          </div>
        </van-col>
      </van-row>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: "messages.vue",
    data() {
      return {
        contacts: []
      }
    },
    methods: {},
    mounted() {
      this.$store.commit("setTitle", "我的消息");
      //遍历contactMap 取出所有联系人
      this.$store.state.contactMap.forEach((value, key) => {
        this.axios({
          method: "GET",
          params: {
            uid: key
          },
          url: '/account/byUid'
        }).then(response => {
          this.contacts.push({
            contact: response.data,
            latestMessage: value[value.length - 1].msg
          })

        })
      })
    }
  }
</script>

<style scoped>
  .div-username {
    height: 40%;
    font-weight: bold;
    text-align: left;
    padding-top: 6px;
    font-size: 18px;
  }

  .div-latestMessage {
    height: 60%;;
    font-weight: lighter;
    text-align: left;
    line-height: 30px;
    font-size: 14px;
    color: #5f5f5f;
  }

  .van-col{
    height: 60px;
  }
</style>
