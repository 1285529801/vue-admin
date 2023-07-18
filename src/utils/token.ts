// 封装存储TOKEN的方法

// 本地存储TOKEN
export const SET_TOKEN = (token:string) =>{
  localStorage.setItem('TOKEN',token)
}
// 本地获取TOKEN
export const GET_tOKEN = (key:string) =>{
  return localStorage.getItem(key)
}