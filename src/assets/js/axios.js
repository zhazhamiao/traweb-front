import axios from 'axios'
import Toast from "vant/lib/Toast";

axios.defaults.baseURL = 'http://192.168.43.142:8080/traweb';
//用于解决前后端session id 不一致
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//请求拦截
axios.interceptors.request.use(config => {
  if(config.headers.a != null){
    config.headers.common['token'] = localStorage.authorization;
  } else if(localStorage.authorization) {
    config.headers.common['token'] = localStorage.authorization;
  }
  return config;
},error => {
  return Promise.reject(error);
})

//响应拦截
axios.interceptors.response.use(Response => {
  return Response;
},error => {
  const { status } = error.response.data;
  if(status === 401) {
    Toast.fail("token失效，重新登录");
    localStorage.removeItem('authorization');
  }
  return Promise.reject(error);
})

export default axios;
