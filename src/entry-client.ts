import { createApp } from './main'
import airbnb from './db'; // 引入数据库和对象仓库

const { app, router, store } = createApp()

if ((window as any).__INITIAL_STATE__) {
  store.replaceState((window as any).__INITIAL_STATE__)
}

router.beforeEach((to, from, next) => {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
    ...airbnb.userObjectStore
  }).then((res: any) => {
    console.log('初始化所有仓库', res)
    next()
  })
})

router.isReady().then(() => {
  router.beforeResolve((to, from, next) => {
    // 获取to的组件
    let toComponents = router.resolve(to).matched.flatMap((record: any) =>
      Object.values(record.components)
    )
    // 获取from的组件
    let fromComponents = router.resolve(from).matched.flatMap((record: any) =>
      Object.values(record.components)
    )

    // c为组件 i为索引 
    let actived = toComponents.filter((c, i) => {
      return fromComponents[i] !== c
    })

    // 如果actived.length存在(to from不同)，说明要跳转，不存在为刷新
    if (!actived.length) { // 刷新直接放行（说明请求过数据） 不再发起异步请求（放在数据二次预取）
      return next()
    }
    // 放行又两种方式：如下
    // 如果在这里放行 会进入页面才发请求，页面会慢慢的渲染出来 
    // 如果在请求完（下面的Promise.all）后放行 会在登录页面等等请求完毕再跳转(此时可以使用loading组件)，页面会全部渲染
    // else { 
    //   next()
    // }

    console.log('开始loading...')

    // 跳转 发起请求获取数据在挂载
    Promise.all(actived.map((Component: any) => {
      if (Component.asyncData) {
        return Component.asyncData({
          store,
          route: router.currentRoute
        })
      }
    })).then(() => {
      console.log('结束loading...')
      next()
    })
  })

  app.mount('#app')
})