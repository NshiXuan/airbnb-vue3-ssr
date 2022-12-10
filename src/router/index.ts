import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

import home from '@/views/home/index.vue'
import mine from '@/views/mine/index.vue'
import login from '@/views/login/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: mine,
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '',
      keepAlive: false
    }
  }
]

const router = createRouter({
  // history: createWebHistory(), 客户端渲染使用
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes
})

export default router

