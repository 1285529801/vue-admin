import request from "@/server/request";
import type {
  SpuListResponseData,
  SpuTradeMarkResponse,
  SpuImageList,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SpuData
} from './types'

enum API {
  GET_SPU_URL = '/admin/product/',
  ALL_TRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList/',
  SALE_ATTR_URL = '/admin/product/spuSaleAttrList/',
  ALL_SALE_ATTR_URL = '/admin/product/baseSaleAttrList',
  ADD_NEW_SPU_URL = '/admin/product/saveSpuInfo',
  UPDATE_SPU_URL = '/admin/product/updateSpuInfo',
  DELETE_SPU_URL = '/admin/product/deleteSpu/'
}
// 获取spu
export const reqSpuList = (page: number, limit: number, category3Id: string | number) => {
  return request.get<any, SpuListResponseData>(API.GET_SPU_URL + `${page}/${limit}?category3Id=${category3Id}`)
}
// 获取spu品牌列表
export const reqAllTradeMark = () => {
  return request.get<any, SpuTradeMarkResponse>(API.ALL_TRADEMARK_URL)
}
// 获取spu下的照片数据
export const reqSpuImageList = (spuId: number | undefined) => {
  return request.get<any, SpuImageList>(API.IMAGE_URL + spuId)
}
// 获取已有销售属性
export const reqSaleAttrList = (spuId: number | undefined) => {
  return request.get<any, SaleAttrResponseData>(API.SALE_ATTR_URL + spuId)
}
// 获取全部销售属性
export const reqAllSaleAttr = () => {
  return request.get<any, HasSaleAttrResponseData>(API.ALL_SALE_ATTR_URL)
}
// 新增spu 或 修改spu
export const reqAddOrUpdateSpu = (data: SpuData) => {
  // 有id修改
  if (data.id) {
    return request.post<any, any>(API.UPDATE_SPU_URL, data)
  } else {
    // 没id新增
    return request.post(API.ADD_NEW_SPU_URL, data)
  }
}
// 删除spu
export const reqDeleteSpu = (params: any) => {
  return request.delete<any, any>(API.DELETE_SPU_URL + params)
}

