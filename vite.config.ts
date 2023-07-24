import { UserConfigExport, ConfigEnv,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // 引入svg插件
import { viteMockServe } from 'vite-plugin-mock'
export default ({ command,mode }: ConfigEnv): UserConfigExport => {
  let env = loadEnv(mode,process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        mockPath: 'mock',
        enable: true,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // scss全局变量配置
          javascriptEnabled: true,
          additionalData: '@import "./src/assets/style/variable.scss";',
        },
      }
    },
    // 代理跨域
    server:{
      proxy:{
        // [env.VITE_APP_BASE_API]：代理请求所需要的关键字
        [env.VITE_APP_BASE_API]:{
          // 服务器地址：http://sph-api.atguigu.cn
          target:env.VITE_SERVER,
          // 是否跨域
          changeOrigin:true,
          // 重写路径
          rewrite:(path)=>path.replace(/^\/api/,'')
        }
      }
    }
  }
}