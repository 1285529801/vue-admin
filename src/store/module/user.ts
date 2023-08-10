import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo, reqLogOut } from '@/api/user/index'
import type { LoginFormData, LoginResponseData, userInfoResponseData } from '@/api/user/type'
import type { userState } from '@/store/module/types/types'
import { SET_TOKEN, GET_tOKEN, DELETE_tOKEN } from '@/utils/token'
import { constantRouters, asyncRouters, anyRouters } from '@/router/routers'
import router from '@/router'
import { cloneDeep } from 'lodash'


function filterAsyncRouters(asyncRouters: any[], routes: any[]) {
  return asyncRouters.filter((item: any) => {
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRouters(item.children, routes)
      }
      return true
    }
  })
}

const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_tOKEN('TOKEN'), // 用户唯一标识
      menuRoutes: [],
      userName: '',
      avatar: '',
      buttons:[]
    }
  },
  getters: {

  },
  actions: {
    // 用户登录方法
    async userLogin(data: LoginFormData) {
      let result: LoginResponseData = await reqLogin(data)
      if (result.code === 200) {
        // 存储token
        this.token = (result.data as string)
        // 利用浏览器localStorage token持久化
        SET_TOKEN((result.data as string))
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.data as string))
      }
    },
    // 获取用户信息
    async userInfo() {
      let result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        console.log(result);
        this.userName = result.data.name
        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        let uerAsyncRouters = filterAsyncRouters(cloneDeep(asyncRouters), result.data.routes);
        this.menuRoutes = [...constantRouters, ...uerAsyncRouters,...anyRouters];
        [...uerAsyncRouters,...anyRouters].forEach((item:any)=>{
          router.addRoute(item)
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message as string))
      }
    },
    // 用户退出登录
    async userLoginOut() {
      let result: any = await reqLogOut()
      if (result.code == 200) {
        this.token = ''
        this.userName = ''
        this.avatar = ''
        DELETE_tOKEN('TOKEN')
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    }
  }
})

export default useUserStore