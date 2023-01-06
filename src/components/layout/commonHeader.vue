<template>
  <div class="header-common">
    <IconLogo class="logo" @click="() => { router.push({ name: 'home' }) }" />
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="orders" @mouseover="mouseoverHandler" @mouseleave="mouseleaveHandler">
        {{ t('header.orders') }}
        <template v-if="store.state.orderVisible">
          <Suspense>
            <template #default>
              <OrderPopover />
            </template>
            <template #fallback>
              loading...
            </template>
          </Suspense>
        </template>
      </el-menu-item>

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
import { getCurrentInstance, ref, defineAsyncComponent, onMounted } from 'vue'
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

// 异步组件
const OrderPopover = defineAsyncComponent(() => import('@/views/order/components/orderPopover.vue'))

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
  } else if (e === 'orders') {
    // store.commit('setOrderVisible', true)
  }
}

// Mock接口：获取当前语言包
function getLanguage() {
  fetchLanguageApi().then(res => {
    const { success, result } = res
    const { name } = result
    if (success) {
      if (name === 'zh') {
        store.dispatch('saveLanguage', zhCn)
        localeLang.value = name
      } else if (name === 'en') {
        store.dispatch('saveLanguage', en)
        localeLang.value = name
      }
      console.log('获取当前语言包成功')
    }
  })
}

// 可以区分客服端和服务端，因为服务端不会执行这个函数 客户端会
onMounted(() => {
  getLanguage()
})

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

function mouseoverHandler() {
  store.commit('setOrderVisible', true)
}

function mouseleaveHandler() {
  store.commit('setOrderVisible', false)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/layout/commonHeader.scss";
</style>
