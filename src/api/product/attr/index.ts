import request from '@/server/request'
import type { SortResponseData, AttrListData, AttrObj, ResponseData } from './types'

enum API {
  FIRST_SORT_URL = '/admin/product/getCategory1',
  SECOND_SORT_URL = '/admin/product/getCategory2/',
  THREE_SORT_URL = '/admin/product/getCategory3/',
  ATTR_LIST_URL = '/admin/product/attrInfoList/',
  ADD_OR_UPDATE_ATTR_URL = '/admin/product/saveAttrInfo',
  DELETE_ATTR_URL = '/admin/product/deleteAttr/'
}

export const reqFirstSort = () => {
  return request.get<any, SortResponseData>(API.FIRST_SORT_URL)
}

export const reqSecondSort = (category1Id: number) => {
  return request.get<any, SortResponseData>(API.SECOND_SORT_URL + category1Id)
}

export const reqThreeSort = (category2Id: number) => {
  return request.get<any, SortResponseData>(API.THREE_SORT_URL + category2Id)
}

export const reqAttrList = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => {
  return request.get<any, AttrListData>(API.ATTR_LIST_URL + `${category1Id}/${category2Id}/${category3Id}`)
}

export const reqAddOrUpdateAttr = (data: AttrObj) => {
  return request.post<any, any>(API.ADD_OR_UPDATE_ATTR_URL, data)
}

export const reqDeleteAttr = (attrId: number) => {
  return request.delete<any, ResponseData>(API.DELETE_ATTR_URL + attrId)
}