// 统一管理用户相关接口
import request from '@/server/request'
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from './type'

enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL)