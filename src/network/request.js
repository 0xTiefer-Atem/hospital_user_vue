import axios from 'axios'

//网络请求

export function request(config) {
  //1. 创建axios实例
  const instance = axios.create({
    //写你的基本地址: 服务器ip和端口
    // baseURL: 'http://47.107.64.157:9090/api',
    baseURL: 'http://localhost:9090/api',
    timeout: 5000,
    //跨域
    crossDomain: true

  });

  //2. 发送网络请求,instance本身就是一个Promise类型可以直接返回
  return instance(config)
}
