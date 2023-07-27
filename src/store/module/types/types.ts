import { RouteRecordRaw } from "vue-router"
import { SortObj, AttrObj } from '@/api/product/attr/types'
// 小仓库state的数据类型
export interface userState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  userName: string,
  avatar: string
}

export interface layoutState {
  isCollapse: boolean
  refresh: boolean
  drawer: boolean
}

export interface attrStore {
  c1Arr: SortObj[],
  c1Id: string | number,
  c2Arr: SortObj[],
  c2Id: string | number,
  c3Arr: SortObj[],
  c3Id: string | number,
  attrList: AttrObj[],
  newAttrName: string,
  newAttrValue: string
  newAttrList: string[]
}