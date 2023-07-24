import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user/index'
import type { LoginFormData, LoginResponseData } from '@/api/user/type'
import type { userState } from '@/store/module/types/types'
import { SET_TOKEN, GET_tOKEN, DELETE_tOKEN } from '@/utils/token'
import { constantRouters } from '@/router/routers'

const useUserStore = defineStore('user', {
  state: (): userState => {
    return {
      token: GET_tOKEN('TOKEN'), // 用户唯一标识
      menuRoutes: constantRouters,
      userName: '',
      avatar: ''
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
        this.token = (result.data.token as string)
        // 利用浏览器localStorage token持久化
        SET_TOKEN((result.data.token as string))
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.data.message as string))
      }
    },
    // 获取用户信息
    async userInfo() {
      let result = await reqUserInfo()
      if (result.code == 200) {
        this.userName = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message as string))
      }
    },
    // 用户退出登录
    userLoginOut() {
      this.token = '',
        this.userName = '',
        this.avatar = ''
      DELETE_tOKEN('TOKEN')
    }
  }
})

export default useUserStore