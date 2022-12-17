import { createSSRApp } from 'vue'
import ElementPlus, { ElMessage, ID_INJECTION_KEY } from 'element-plus'
import 'element-plus/dist/index.css'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import "./assets/scss/main.css"
import { createSSRStore, key } from './store'
import { createSSRRouter } from './router'
import { createSSRI18n } from './language/i18n'


// import { } from 'element-plus'


// const app = createApp(App)
// app.use(ElementPlus).use(i18n).use(router).use(store, key).mount('#app')

export function createApp() {
  const app = createSSRApp(App)
  const store = createSSRStore()
  const router = createSSRRouter()
  const i18n = createSSRI18n()

  // 将router中的信息同步到vuex中
  sync(store, router)

  // 全局引入 element-plus 组件
  app.config.globalProperties.$message = ElMessage
  app.provide(ID_INJECTION_KEY, {
    prefix: 100,
    current: 0,
  })
  // 使用vuex4
  app.use(store, key)
  // 挂载路由
  app.use(router)
  // 将 element-plus 挂载到根实例
  app.use(ElementPlus)
  // 引入国际化语言包
  app.use(i18n)

  return { app, router, store }
}
