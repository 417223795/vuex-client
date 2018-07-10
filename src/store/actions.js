/*
vuex的actions模块
 */
import {reqAddress, reqCategorys, reqShops, reqUser} from '../api'
import {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_USER_INFO} from './mutation-types'
console.log('reqAddress是什么', reqAddress)
export default {
  // 异步获取地址
  async getAddress ({commit, state}) {
    // const {latitude,longitude} = state
    // const geohash = `${latitude},${longitude}`
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    /* if (code === 0) {
      const categorys = result.data
      commit(RECEIVE_ADDRESS, {categorys})
    } */
    commit(RECEIVE_ADDRESS, {address: result.data})
  },

  // 异步获取分类列表的异步action
  async getCategorys ({commit}) {
    // 发送异步请求, 得到响应数据
    const result = await reqCategorys()// {code: 0, data: types}
    if (result.code === 0) {
      // 提交mutation
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 异步获取商家列表的异步action
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    // 发送异步请求, 得到响应数据
    const result = await reqShops({latitude, longitude})// {code: 0, data: shops}
    if (result.code === 0) {
      // 提交mutation
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 异步获取用户信息
  // 参照的是api接口文件
  async getUserInfo ({commit}) {
    // 发送异步请求, 得到响应数据
    const result = await reqUser()
    if (result.code === 0) {
      // commit(RECEIVE_USER_INFO, {userInfo: result.data})
      const userInfo = result.data
      commit(RECEIVE_USER_INFO, {userInfo})
    }
  }
}
