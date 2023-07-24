// 路由鉴权
import router from "./router";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from "./store/module/user";
import pinia from "./store";
import setting from '@/setting/index'

// 在组件外使用小仓库必须要引入大仓库
const userStore = useUserStore(pinia)
//#region 
//  to：要去往的路由
//  from：要去往哪个路由
//  next：放行函数
//#endregion

// 前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start()
  let token = userStore.token
  let userName = userStore.userName
  // 登录成功
  if (token) {
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      if (userName) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next()
        } catch (error) {
          userStore.userLoginOut()
          next({ path: '/login', query: { redirect: to.path } })
        }

      }

    }
  } else {// 登录不成功
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 后置守卫
router.afterEach((to: any, from: any, next: any) => {
  document.title = `${setting.title}-` + `${to.meta.title}`
  nprogress.done()
})