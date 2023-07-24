import request from "@/server/request";
import type { BrandResponseData, Brand } from './types'

enum API {
  BRAND_QUERY_URL = '/admin/product/baseTrademark/',
  BRAND_ADD_URL = '/admin/product/baseTrademark/save',
  BRAND_UPDATE_URL = '/admin/product/baseTrademark/update',
  BRAND_DELETE_URL = '/admin/product/baseTrademark/remove/'
}
// 查询品牌
export const reqBrandQuery = (page: number, limit: number) => {
  return request.get<any, BrandResponseData>(API.BRAND_QUERY_URL + `${page}/${limit}`)
}

// 修改品牌信息 或 添加品牌信息
export const reqBrandAddOrUpdate = (data: Brand) => {
  if (data.id) { //有ID是修改品牌
    return request.put<any, any>(API.BRAND_UPDATE_URL, data)
  } else { // 没有ID是添加品牌
    return request.post<any, any>(API.BRAND_ADD_URL, data)
  }
}

export const reqBrandDelete = (id:number) =>{
  return request.delete<any,any>(API.BRAND_DELETE_URL + id)
}