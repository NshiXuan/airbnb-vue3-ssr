import { createApp } from 'vue'
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import i18n from './language/i18n'
import "./assets/scss/main.css"

const app = createApp(App)
app.config.globalProperties.$message = ElMessage
app.use(ElementPlus).use(i18n).use(router).mount('#app')
