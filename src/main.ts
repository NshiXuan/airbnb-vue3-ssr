import { createSSRApp } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import i18n from './language/i18n'
import "./assets/scss/main.css"

import store, { key } from './store'



// const app = createApp(App)
// app.use(ElementPlus).use(i18n).use(router).use(store, key).mount('#app')

export function createApp() {
  const app = createSSRApp(App)
  // 全局引入 element-plus 组件
  app.config.globalProperties.$message = ElMessage
  // 使用vuex4
  app.use(store, key)
  // 挂载路由
  app.use(router)
  // 将 element-plus 挂载到根实例
  app.use(ElementPlus)
  // 引入国际化语言包
  app.use(i18n)

  return { app, router }
}
