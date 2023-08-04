import request from "@/server/request";
import type { SkuInfoData, SkuResponseData, SkuInfoResponseData } from './types'

enum API {
  GET_SKU_LIST_URL = '/admin/product/list/',
  ADD_SKU_URL = '/admin/product/saveSkuInfo',
  QUERY_SKU_INFO_URL = '/admin/product/findBySpuId/',
  SKU_SALE_URL = '/admin/product/onSale/',
  SKU_CANCEL_SALE_URL = '/admin/product/cancelSale/',
  SKU_INFO_URL = '/admin/product/getSkuInfo/',
  DELETE_SKU_URL = '/admin/product/deleteSku/',
}
export const reqGetSkuList = (page: number, limit: number) => {
  return request.get<any, SkuResponseData>(API.GET_SKU_LIST_URL + `${page}/${limit}`)
}

export const reqAddSku = (params: any) => {
  return request.post<any, any>(API.ADD_SKU_URL, params)
}

export const reqQuerySku = (params: any) => {
  return request.get<any, SkuInfoData>(API.QUERY_SKU_INFO_URL + params)
}
// 商品上架
export const reqSaleSku = (params: number) => {
  return request.get<any, any>(API.SKU_SALE_URL + params)
}
// 商品下架
export const reqCancelSaleSku = (params: number) => {
  return request.get<any, any>(API.SKU_CANCEL_SALE_URL + params)
}

//sku详情
export const reqSkuInfo = (params: number) => {
  return request.get<any, SkuInfoResponseData>(API.SKU_INFO_URL + params)
}

//删除sku
export const reqRemoveSku = (params: number) => {
  return request.delete<any, any>(API.DELETE_SKU_URL + params)
}