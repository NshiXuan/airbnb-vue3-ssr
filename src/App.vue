<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <!-- 头部 -->
      <headerCommon @changeLang="changeLang" />

      <!-- 主体 -->
      <div class="container">
        <RouterView />
      </div>

      <!-- 底部 -->
      <footerCommon />
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { useI18n } from 'vue-i18n'

import headerCommon from './components/layout/commonHeader.vue'
import footerCommon from './components/layout/commonFooter.vue'

const { locale: localeLang } = useI18n()

const locale = ref(zhCn)
const changeLang = (language: any) => {
  locale.value = language
  localeLang.value = language.name
  console.log('lang', language)
}

</script>

<style lang="scss" scoped>
/* .app {
  .el-config-provider {
    display: flex;
    flex-direction: column;
  }
} */
</style>
