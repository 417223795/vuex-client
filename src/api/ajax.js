/*
ajax请求函数模块
函数的返回值是一个promise函数
服务器传递给我们的是json字符串，除了原生ajax之外，其他工具都会自动处理把json转化为js传递给我们
 */
import axios from 'axios'

// 向外暴露时，如果只是一个功能，那么写成函数即可，如果是向外暴露多个功能，写成对象
// 接口文档有四个部分，其中三个部分是用来发送请求的
// 1.url  请求地址
// 2.data  请求数据
// 3.type  请求方式
// 4.响应数据模块
export default function ajax (url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求的代码
    let promise

    if (type === 'GET') {
      // 准备url query参数数据
      let dataStr = ''
      // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.length - 1)
        url = url + '?' + dataStr
      }
      // 发送get请求
      // get请求必须进行拼串，不用传递参数
      promise = axios.get(url)
    } else {
      // 发送post请求
      // post请求必须传递参数
      promise = axios.post(url, data)
    }
    // 成功了，调用resolve
    promise
      .then(response => {
        resolve(response.data)
      })
      // 失败了，调用reject
      .catch(error => {
        reject(error)
      })
  })
}
