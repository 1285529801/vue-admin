// 统一管理用户相关接口
import request from '@/server/request'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from './type'

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: LoginFormData) => {
  return request.post<any, LoginResponseData>(API.LOGIN_URL, data)
}

export const reqUserInfo = () => {
  return request.get<any, userInfoResponseData>(API.USERINFO_URL)
}

export const reqLogOut = () => {
  return request.post<any, any>(API.LOGOUT_URL) 
}
