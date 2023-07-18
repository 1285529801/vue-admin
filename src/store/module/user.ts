import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user/index'
import type { LoginFormData } from '@/api/user/type'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'), // 用户唯一标识
    }
  },
  getters: {

  },
  actions: {
    // 用户登录方法
    async userLogin(data: LoginFormData) {
      let result = await reqLogin(data)
      if (result.code === 200) {
        // 存储token
        this.token = result.data.token
        // 利用浏览器localStorage token持久化
        localStorage.setItem('TOKEN',result.data.token)
        return 'ok'
      }
      else {
        return Promise.reject(new Error(result.data.message as string))
      }
    }
  }
})

export default useUserStore