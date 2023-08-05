export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

export interface Menu {
  id?: number | string,
  createTime?: string,
  updateTime?: string,
  pid: number,
  name: string,
  code: string,
  toCode?: null,
  type?: number,
  status?: null,
  level: number,
  children?: Menu[]
  select?: boolean
}

export interface MenuResponseData extends ResponseData {
  data: Menu[]
}

export interface MenuParams {
  id?: number | string,
  code: string,
  level: number,
  name: string,
  pid: number
}