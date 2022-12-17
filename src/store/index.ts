import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";

import { saveLanguageApi } from "@/api/layout";
import { fetchRoomList } from "@/api";

// 为store state声明类型
export interface AllStateTypes {
  locale: any,
  userStatus: Number,
  roomList: Array<any>
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
      roomList: []
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
      getRoomList({ commit }) { // 获取房屋列表
        return new Promise(resolve => {
          setTimeout(() => {
            fetchRoomList().then(res => {
              const { success, result } = res
              const orders = result.orders
              if (success) {
                console.log('保存房屋列表成功', orders)
                commit('setRoomList', orders.data)
                resolve(true)
              }
            })
          }, 3000)

        })
      }
    }
  })
}