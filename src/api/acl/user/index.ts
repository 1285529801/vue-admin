import request from "@/server/request";
import type { UserResponseData, User, RoleResponseData, SetRole } from './types'

enum API {
  ALL_USER_URL = '/admin/acl/user/',
  ADD_USER_URL = '/admin/acl/user/save',
  UPDATE_USER_URL = '/admin/acl/user/update',
  USER_ROLE_INFO_URL = '/admin/acl/user/toAssign/',
  UPDATE_USER_ROLE_URL = '/admin/acl/user/doAssignRole',
  USER_BATCH_DELETE = '/admin/acl/user/batchRemove',
  USER_DELETE = '/admin/acl/user/remove/'
}
// 获取用户信息
export const reqAllUserList = (page: number, limit: number, username: string) => {
  return request.get<any, UserResponseData>(API.ALL_USER_URL + `${page}/${limit}/?username=${username}`)
}
// 新增或修改用户
export const reqAddOrUpdateUser = (params: User) => {
  if (params.id) {
    return request.put<any, any>(API.UPDATE_USER_URL, params)
  } else {
    return request.post<any, any>(API.ADD_USER_URL, params)
  }
}
// 获取用户角色数据
export const reqUserRoleList = (params: number) => {
  return request.get<any, RoleResponseData>(API.USER_ROLE_INFO_URL + params)
}
// 分配用户角色
export const reqUpdateUserRole = (params: SetRole) => {
  return request.post<any, any>(API.UPDATE_USER_ROLE_URL, params)
}

// 删除某一个用户
export const reqRemoveUser = (params: number) => {
  return request.delete<any, any>(API.USER_DELETE + params)
}
// 批量删除用户
export const reqBatchRemoveUser = (params: number[]) => {
  return request.delete<any, any>(API.USER_BATCH_DELETE, { data: params })
}