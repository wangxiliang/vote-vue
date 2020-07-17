import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import router from 'router/router'
import Store from "store/store";

// NProgress 配置
NProgress.configure({ showSpinner: false })
const store = Store()

// 全局导航守卫

router.beforeEach((to, from, next) => {
  NProgress.start()

  next()
})


router.afterEach((to, from) => {
  NProgress.done()
})