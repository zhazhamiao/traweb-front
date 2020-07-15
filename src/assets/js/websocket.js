// websocket url
const baseUrl = 'ws://47.95.35.226:8080/websocket'

let Socket = {
  WS :'',
  // 初始化websocket
  init(uid) {
    this.WS = new WebSocket(baseUrl + '/' + uid);
    let data = {
      toUserId: 10,
      message: 'msg'
    };
    this.onError();
  },
  // 发送消息
  send(data) {
    this.WS.send(JSON.stringify(data));
  },
  // 接收消息
  onMessage(callback) {
    this.WS.onmessage = (res) => {
      try {
        let resData = JSON.parse(res.data);
        callback(resData)
      } catch (e) {
        console.log(e)
      }
    }
  },

  onError() {
    this.WS.onerror = (res) => {
      console.log('连接错误');
    };
  },

  onClose() {
    this.WS.close();
  }
}

export default Socket;
