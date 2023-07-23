import { RouteRecordRaw } from "vue-router"
// 小仓库state的数据类型
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  userName:string,
  avatar:string
}

export interface layoutState {
  isCollapse: boolean
  refresh: boolean
  drawer: boolean
}