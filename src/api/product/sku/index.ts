import request from "@/server/request";
import type { SkuInfoData } from './types'

enum API {
  ADD_SKU_URL = '/admin/product/saveSkuInfo',
  QUERY_SKU_INFO_URL = '/admin/product/findBySpuId/'
}

export const reqAddSku = (params: any) => {
  return request.post<any, any>(API.ADD_SKU_URL, params)
}

export const reqQuerySku = (params: any) => {
  return request.get<any, SkuInfoData>(API.QUERY_SKU_INFO_URL + params)
}