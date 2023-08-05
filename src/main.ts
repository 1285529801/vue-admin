import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg配置
import 'virtual:svg-icons-register'
// 引入配置好的全局组件
import globalComponents from '@/components/index'
import '@/assets/style/index.scss'
// 路由
import router from './router';
// 引入仓库
import pinia from './store';
// 引入路由鉴权文件
import './permission'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
app.use(ElementPlus, {
  // Element-Plus 中文化
  locale: zhCn
})
app.use(globalComponents)
app.use(router)
app.use(pinia)
// 要保证mount在所有use之后
app.mount('#app')

