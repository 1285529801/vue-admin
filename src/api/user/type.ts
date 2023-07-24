// 登录接口需要携带参数ts类型
export interface LoginFormData {
  username?: string
  password?: string
}

export interface ResponseData {
  code?: number
  data?: string
  message?: string
  ok?: boolean
}

export interface LoginResponseData extends ResponseData {
  
}

export interface userInfoResponseData {
  code?: number
  data: {
    name: string
    avatar: string
    routes:string[]
    buttons:string[]
    roles:string[]
  }
  message?: string
  ok: boolean
}
