import { getCurrentInstance } from "vue"
import { useStore } from 'vuex'

import { IResultOr } from "@/api/interface"
import { userSignApi, userLoginApi } from '@/api/login'
import { key } from "@/store"
import { useRoute } from "vue-router"

interface IRuleForm {
  mobile: string,
  password: string
}

export default function useFormOperaties(router: any, params: any) {
  const { proxy }: any = getCurrentInstance()
  const store = useStore(key)
  const route = useRoute()

  // 注册接口
  function userSign(params: IRuleForm) {
    userSignApi(params).then((res: IResultOr) => {
      const { success, message } = res
      if (success) {
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  // 登录接口
  function userLogin(params: IRuleForm) {
    userLoginApi(params).then((res: IResultOr) => {
      const { success, message, result } = res
      const { status } = result
      if (success) {
        store.commit('setUserState', status)
        const { redirect } = route.query
        router.push({ path: redirect || '/home' })
        proxy.$message.success(message)
      } else {
        proxy.$message.error(message)
      }
    })
  }

  return {
    userLogin,
    userSign
  }
}