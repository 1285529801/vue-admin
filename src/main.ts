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

const app = createApp(App)
app.mount('#app')
app.use(ElementPlus, {
  // Element-Plus 中文化
  locale: zhCn
})
app.use(globalComponents)
