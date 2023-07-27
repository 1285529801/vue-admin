export interface ResponseData {
  message: string
  code?: number
  data?: any
  ok: boolean
}

export interface SortObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface valueList {
  id?: number,
  valueName?: string,
  attrId?: number,
  flag?: boolean
}
export type AttrValueList = valueList[]

export interface AttrObj {
  id?: number,
  attrName?: string,
  categoryId?: string | number,
  categoryLevel?: number,
  attrValueList?: AttrValueList
}
export interface SortResponseData extends ResponseData {
  data: SortObj[]
}

export interface AttrListData extends ResponseData {
  data: AttrObj[]
}