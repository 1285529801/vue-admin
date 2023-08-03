export interface ResponseData {
  code: number,
  message: string
  ok: boolean
}

export interface Attr {
  attrId: number,
  valueId: number,
}
export interface saleAttr {
  saleAttrId: number,
  saleAttrValueId: number,
}
export interface SkuData {
  category3Id: string | number | undefined,
  spuId?: string | number,
  tmId: string | number,
  skuName: string,
  price: string | number,
  weight: string | number,
  skuDesc: string,
  skuAttrValueList?: Attr[],
  skuSaleAttrValueList?: saleAttr[],
  skuDefaultImg: string
}

export interface SkuInfoData extends ResponseData{
  data:SkuData[]
}