<template>
  <div class="app">
    <el-config-provider :locale="store.state.locale">
      <!-- 头部 -->
      <headerCommon v-show="!(route.name === 'login')" />

      <!-- 主体 -->
      <div class="container">
        <RouterView />
      </div>

      <!-- 底部 -->
      <footerCommon v-show="!(route.name === 'login')" />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'
// import { ref } from 'vue'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import { useI18n } from 'vue-i18n'

import headerCommon from './components/layout/commonHeader.vue'
import footerCommon from './components/layout/commonFooter.vue'
import { useStore } from './store'

// const { locale: localeLang } = useI18n()

const route = useRoute()
const store = useStore()

// const locale = ref(zhCn)
// const changeLang = (language: any) => {
//   locale.value = language
//   localeLang.value = language.name
//   console.log('lang', language)
// }

</script>

<style lang="scss" scoped>
/* .app{ } */
</style>
