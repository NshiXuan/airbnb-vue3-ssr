import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'

// import home from '@/views/home/index.vue'
// import mine from '@/views/mine/index.vue'
// import login from '@/views/login/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import("@/views/mine/index.vue"),
    meta: {
      title: '',
      keepAlive: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: '',
      keepAlive: false
    }
  }
]

export function createSSRRouter() {
  return createRouter({
    // history: createWebHistory(), 客户端渲染使用
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })
}

