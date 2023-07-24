export interface BrandResponseData extends ResponseData {
  data: {
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
    records: Records
  }

}

export interface ResponseData {
  message: string
  code?: number
  data?: any
  ok: boolean
}

export interface Brand {
  id?: number
  tmName: string
  logoUrl: string
}

export type Records = Brand[]