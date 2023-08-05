import request from "@/server/request";
import type { MenuResponseData, MenuParams } from './types'

enum API {
  ALL_MENU_URL = '/admin/acl/permission',
  ADD_MENU_URL = '/admin/acl/permission/save',
  UPDATE_MENU_URL = '/admin/acl/permission/update',
  DELETE_MENU_URL = '/admin/acl/permission/remove/'
}
// 获取菜单列表
export const reqAllPermission = () => {
  return request.get<any, MenuResponseData>(API.ALL_MENU_URL)
}
// 添加或更新菜单
export const reqAddOrUpdateMenu = (params: MenuParams) => {
  if (params.id) {
    return request.put<any, any>(API.UPDATE_MENU_URL, params)
  } else {
    return request.post<any, any>(API.ADD_MENU_URL, params)
  }
}
// 删除菜单
export const reqRemoveMenu = (params: number) => {
  return request.delete<any, any>(API.DELETE_MENU_URL + params)
}