import da from "element-ui/src/locale/lang/da";

const baseUrl = 'ws://192.168.43.142:8080/traweb/websocket'

let Socket = {
  WS :'',
  init(uid) {
    this.WS = new WebSocket(baseUrl + '/' + uid);
    let data = {
      toUserId: 10,
      message: 'msg'
    };
    this.onError();
    this.onClose();
  },

  send(data) {
    this.WS.send(JSON.stringify(data));
  },

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
    this.WS.onclose = (res) => {
    };
  }
}

export default Socket;
