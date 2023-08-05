export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}

export interface Role {
  id: number | string,
  createTime?: string,
  updateTime?: string,
  roleName: string,
  remark?: null
}

export interface RoleResponseData extends ResponseData {
  data: {
    records: Role[],
    total: number,
    pages: number,
    size: number,
    current: number,
    orders: [],
    optimizeCountSql: boolean,
    hitCount: boolean,
    countId: null,
    maxLimit: null,
    searchCount: boolean,
  }
}

export interface MenuData {
  id: number,
  createTime: string,
  updateTime: string,
  pid: number,
  name: string,
  code: null,
  toCode: null,
  type: number,
  status: null,
  level: number,
  children?: MenuData[],
  select: boolean
}

export interface MenuResponseData extends ResponseData {
  data: MenuData[]
}