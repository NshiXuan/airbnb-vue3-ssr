import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";

import { saveLanguageApi } from "@/api/layout";
import { fetchRoomList } from "@/api/home";
import { fetchRoomDetail } from "@/api/detail";
import { IRoomDetailParams, IRoomListParams } from "@/api/interface";

// 为store state声明类型
export interface AllStateTypes {
  locale: any,
  userStatus: Number,
  roomList: Array<any>,
  pageNo: number,
  pageSize: number,
  total: number,
  cityCode: string,
  roomDetail: any,
  roomID: null,
  orderVisible: boolean
}

// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storeKey')

export function useStore() {
  return baseUseStore(key)
}

export function createSSRStore() {
  return createStore<AllStateTypes>({
    state: {
      locale: null, // 登录态
      userStatus: 0, // 语言包
      roomList: [],
      pageNo: 1,
      pageSize: 6,
      total: 0,
      cityCode: 'hz',
      roomDetail: {},
      roomID: null,
      orderVisible: false
    },
    mutations: {
      setLanguage(state, payload) { // 设置语言包
        state.locale = payload
        return state.locale
      },
      setUserState(state, payload) {  // 设置登录态
        state.userStatus = payload
        return state.userStatus
      },
      setRoomList(state, payload) { // 设置房屋列表数据
        state.roomList = payload
        return state.roomList
      },
      setRoomDetail(state, payload) {// 设置房屋详情
        state.roomDetail = payload
        return state.roomDetail
      },
      setRoomID(state, payload) {// 设置房屋ID
        state.roomID = payload
        return state.roomID
      },
      setOrderVisible(state, payload) {// 设置订单显示隐藏
        state.orderVisible = payload
        return state.orderVisible
      }
    },
    actions: {
      saveLanguage({ commit, state }, language: any) { // 保存语言包
        saveLanguageApi(language.name).then(res => {
          const { success } = res
          if (success) {
            commit('setLanguage', language)
            console.log('保存当前语言包成功')
          }
        })
      },

      // 房屋列表
      getRoomList({ commit }, payload: IRoomListParams) { // 获取房屋列表
        const { pageNo, cityCode = this.state.cityCode } = payload
        this.state.pageNo = pageNo
        const params = {
          pageNo,
          pageSize: this.state.pageSize,
          cityCode
        }

        return new Promise(resolve => {
          // setTimeout(() => {
          fetchRoomList(params).then(res => {
            const { success, result } = res
            const orders = result?.orders
            if (success) {
              console.log('保存房屋列表成功', orders)
              commit('setRoomList', orders.data)
              this.state.total = result.total
              resolve(true)
            }
          })
          // }, 3000)

        })
      },

      // 房屋详情
      getRoomDetail({ commit }, payload: IRoomDetailParams) { // 获取房屋列表
        return new Promise(resolve => {
          fetchRoomDetail(payload).then(res => {
            const { success, result } = res
            if (success) {
              console.log('保存房屋详情成功', result)
              commit('setRoomDetail', result)
              resolve(true)
            }
          })
        })
      }
    }
  })
}