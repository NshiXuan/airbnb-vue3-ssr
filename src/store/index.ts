import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";

import { saveLanguageApi } from "@/api/layout";

// 为store state声明类型
export interface AllStateTypes {
  locale: any,
  userStatus: Number
}

// 定义 injection key
export const key: InjectionKey<Store<AllStateTypes>> = Symbol('storeKey')

export function useStore() {
  return baseUseStore(key)
}

const store = createStore<AllStateTypes>({
  state: {
    locale: null, // 登录态
    userStatus: 0 // 语言包
  },
  mutations: {
    setLanguage(state, payload) {
      state.locale = payload
      return state.locale
    },
    setUserState(state, payload) {
      state.userStatus = payload
      return state.userStatus
    }
  },
  actions: {
    saveLanguage({ commit, state }, language: any) {
      saveLanguageApi(language.name).then(res => {
        const { success } = res
        if (success) {
          commit('setLanguage', language)
          console.log('保存当前语言包成功')
        }
      })
    }
  }
})

export default store