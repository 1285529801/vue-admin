// 用于注册全局组件，不用再单一到main.ts里注册，减少入口文件代码量
import { App,Component } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

const component:{[name:string]:Component} = {SvgIcon}
export default{
  install(app:App){
    Object.keys(component).forEach((key:string)=>{
      app.component(key,component[key])
    })
  }
}