import axios from 'axios';
// 创建axios实例
const $axios = axios.create({
  timeout: 80000,
  // 允许跨域带token
  withCredentials: true,
  baseURL: `${process.env.NODE_ENV === 'development' ? 'http://localhost:6180' : 'http://119.29.165.98'}/edu-platform-server/api`,
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
    if (response.data && response.data.code >= 40300) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default $axios;
