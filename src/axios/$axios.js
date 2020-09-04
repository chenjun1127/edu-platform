import axios from 'axios';

const createHistory = require('history').createHashHistory;
// 创建axios实例
const $axios = axios.create({
  timeout: 30000,
  // 允许跨域带token
  withCredentials: true,
  baseURL: 'http://localhost:6180/edu-platform/api',
});
// 设置缓存时间 和缓存请求数组
$axios.defaults.withCredentials = true;
var requestUrl = [],
  saveTime = 1000;
// request拦截器
$axios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token') || '';
    let headers = { 'Content-Type': 'application/json;charset=UTF-8' };
    config.headers = token ? { ...headers, token } : headers;
    if (config.method === 'post' || config.method === 'delete') {
      config.data = Object.assign({}, config.data);
      let nowTime = new Date().getTime();
      requestUrl = requestUrl.filter((item) => {
        return item.setTime + saveTime > nowTime;
      });
      let sessionUrl = requestUrl.filter((item) => {
        return item.url === config.url;
      });
      if (sessionUrl.length > 0) {
        // console.log(config.url + '请求重复 中断请求!');
        return;
      }
      let item = { url: config.url, setTime: new Date().getTime() };
      requestUrl.push(item);
    } else if (config.method === 'get') {
      config.params = Object.assign({}, config.params);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response拦截器
$axios.interceptors.response.use(
  (response) => {
    // console.log(process.env.NODE_ENV);
    if (response.data && response.data.code === '302') {
      // 302, token失效，此处有坑，开发环境只能重定向到登录页（实际上微信关联了账号的，是要跳转到首页），生产环境要跳转到后台定义的重定向地址；
      if (process.env.NODE_ENV === 'development') {
        const history = createHistory();
        setTimeout(() => {
          history.replace('/login');
        }, 1000);
      } else {
        setTimeout(() => {
          // window.location.href = JSON.parse(sessionStorage.getItem('info')).url + '/yihao01-park-payment/newLogin/index';
        }, 1000);
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default $axios;
