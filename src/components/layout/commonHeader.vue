<template>
  <div class="header-common">
    <IconLogo class="logo" />
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders">{{ t('header.orders') }}</el-menu-item>
      <el-menu-item index="records">{{ t('header.records') }}</el-menu-item>

      <el-sub-menu index="language">
        <template #title>{{ t('header.language') }}</template>
        <el-menu-item index="zh">中文</el-menu-item>
        <el-menu-item index="en">English</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="avator" v-if="(store.state.userStatus === 1)">
        <template #title>
          <img class="avatar" src="../../assets/img/layout/pinia.png" alt="个人中心">
        </template>
        <el-menu-item index="logout">退出</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="login" v-else>
        {{ t('login.loginTab') }}/{{ t('login.signTab') }}
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import { useI18n } from 'vue-i18n'

import IconLogo from '../../assets/svg/icon_logo.vue'
import { fetchLanguageApi } from '../../api/layout'
import { useRouter } from 'vue-router'
import { userLogoutApi } from '@/api/login'
import { IResultOr } from '@/api/interface'
import { useStore } from '@/store'

const { t, locale: localeLang } = useI18n()
const { proxy }: any = getCurrentInstance()
const activeIndex = ref('orders')
const router = useRouter()
const store = useStore()

const emit = defineEmits<{
  (e: 'changeLang', language: any): void
}>()

function handleSelect(e: any) {
  if (e === 'zh') {
    store.dispatch('saveLanguage', zhCn)
    localeLang.value = e
  } else if (e === 'en') {
    store.dispatch('saveLanguage', en)
    localeLang.value = e
  } else if (e === 'login') {
    router.push('/login')
  } else if (e === 'logout') {
    userLogout()
  }
}

// Mock接口：获取当前语言包
function getLanguage() {
  fetchLanguageApi().then(res => {
    const { success, result } = res
    const { name } = result
    if (success) {
      if (name === 'zh') {
        emit('changeLang', zhCn)
      } else if (name === 'en') {
        emit('changeLang', en)
      }
      console.log('获取当前语言包成功')
    }
  })
}
// getLanguage()

// 用户退出接口
function userLogout() {
  userLogoutApi().then((res: IResultOr) => {
    const { success, message } = res
    if (success) {
      store.commit('setUserState', 0)
      router.push('/login')
      proxy.$message.success(message)
    } else {
      proxy.$message.error(message)
    }
  })
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layout/commonHeader.scss";
</style>
