export interface ResponseData {
  code: number,
  message: string
  ok: boolean
}

export interface SpuData {
  id?: number,
  spuName: string,
  description: string,
  category3Id: number | string,
  tmId: number | string,
  spuSaleAttrList: null | SpuSaleAttrValueList,
  spuImageList: null | SpuImage[]
}

export type Records = SpuData[]

export interface SpuListResponseData extends ResponseData {
  data: {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean
    pages: number,
  }
}
export interface TradeMark {
  id?: number,
  tmName: string,
  logoUrl: string
}
export interface SpuTradeMarkResponse extends ResponseData {
  data: TradeMark[]
}

export interface SpuImage {
  id?: number,
  imgName?: string,
  imgUrl?: string,
  createTime?: string,
  updateTime?: string,
  spuId?: number,
  name?: string
  url?: string
}

export interface SpuImageList extends ResponseData {
  data: SpuImage[]
}

export interface SaleAttrValue {
  id?: number,
  createTime?: null,
  updateTime?: null,
  spuId?: number,
  baseSaleAttrId: number | string,
  saleAttrName: string,
  saleAttrValueName?: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: any
  inputValue?: any
}

export type SpuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttr {
  id?: number,
  createTime?: null,
  updateTime?: null,
  spuId?: number,
  baseSaleAttrId: number | string,
  saleAttrName: string,
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: any
  inputValue?: any
  saleIdAndValueId?:string
}
export interface SaleAttrResponseData extends ResponseData {
  data: SaleAttr[]
}

export interface HasSaleAttr {
  id: number
  name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
  data: HasSaleAttr[]
}