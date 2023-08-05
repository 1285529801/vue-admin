import request from "@/server/request";
import { RoleResponseData, Role, MenuResponseData } from './types'

enum API {
  ROLE_LIST_URL = '/admin/acl/role/',
  ADD_ROLE_URL = '/admin/acl/role/save',
  UPDATE_ROLE_URL = '/admin/acl/role/update',
  ALL_PERMISSION = '/admin/acl/permission/toAssign/',
  ADD_PERMISSION = '/admin/acl/permission/doAssign',
  DELETE_ROLE_URL = '/admin/acl/permission/remove/'
}
// 获取角色列表
export const reqRoleList = (page: number, limit: number, roleName: string) => {
  return request.get<any, RoleResponseData>(API.ROLE_LIST_URL + `${page}/${limit}/?roleName=${roleName}`)
}
// 更新或添加角色
export const reqAddOrUpdateRole = (params: Role) => {
  if (params.id) {
    return request.put<any, any>(API.UPDATE_ROLE_URL, params)
  } else {
    return request.post<any, any>(API.ADD_ROLE_URL, params)
  }
}
// 根据角色获取权限菜单
export const reqAllPermission = (params: number) => {
  return request.get<any, MenuResponseData>(API.ALL_PERMISSION + params)
}
// 给角色分配权限
export const reqSetPermission = (roleId: number, permissionId: number[]) => {
  return request.post<any, any>(API.ADD_PERMISSION + `/?roleId=${roleId}&permissionId=${permissionId}`)
}
// 删除角色
export const reqRemoveRole = (params:number)=>{
  return request.delete<any,any>(API.DELETE_ROLE_URL+params)
}