import request from '@/server/request'
import type { SortResponseData, AttrListData, AttrObj, ResponseData } from './types'

enum API {
  FIRST_SORT_API = '/admin/product/getCategory1',
  SECOND_SORT_API = '/admin/product/getCategory2/',
  THREE_SORT_API = '/admin/product/getCategory3/',
  ATTR_LIST_API = '/admin/product/attrInfoList/',
  ADD_OR_UPDATE_ATTR_API = '/admin/product/saveAttrInfo',
  DELETE_ATTR_API = '/admin/product/deleteAttr/'
}

export const reqFirstSort = () => {
  return request.get<any, SortResponseData>(API.FIRST_SORT_API)
}

export const reqSecondSort = (category1Id: number) => {
  return request.get<any, SortResponseData>(API.SECOND_SORT_API + category1Id)
}

export const reqThreeSort = (category2Id: number) => {
  return request.get<any, SortResponseData>(API.THREE_SORT_API + category2Id)
}

export const reqAttrList = (category1Id: number, category2Id: number, category3Id: number) => {
  return request.get<any, AttrListData>(API.ATTR_LIST_API + `${category1Id}/${category2Id}/${category3Id}`)
}

export const reqAddOrUpdateAttr = (data: AttrObj) => {
  return request.post<any, any>(API.ADD_OR_UPDATE_ATTR_API, data)
}

export const reqDeleteAttr = (attrId: number) => {
  return request.delete<any, ResponseData>(API.DELETE_ATTR_API + attrId)
}