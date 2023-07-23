import { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // 引入svg插件
import { viteMockServe } from 'vite-plugin-mock'
export default ({ command }: ConfigEnv): UserConfigExport => {
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
    }
  }
}