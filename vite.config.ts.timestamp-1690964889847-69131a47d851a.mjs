// vite.config.ts
import { loadEnv } from "file:///D:/Frontend/Vue3%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E5%AE%9E%E6%88%98/guigu-admin/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Frontend/Vue3%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E5%AE%9E%E6%88%98/guigu-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///D:/Frontend/Vue3%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E5%AE%9E%E6%88%98/guigu-admin/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///D:/Frontend/Vue3%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E5%AE%9E%E6%88%98/guigu-admin/node_modules/vite-plugin-mock/dist/index.js";
var __vite_injected_original_dirname = "D:\\Frontend\\Vue3\u7845\u8C37\u7504\u9009\u5B9E\u6218\\guigu-admin";
var vite_config_default = ({ command, mode }) => {
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        mockPath: "mock",
        enable: true
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
        // 相对路径别名配置，使用 @ 代替 src
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // scss全局变量配置
          javascriptEnabled: true,
          additionalData: '@import "./src/assets/style/variable.scss";'
        }
      }
    },
    // 代理跨域
    server: {
      proxy: {
        // [env.VITE_APP_BASE_API]：代理请求所需要的关键字
        [env.VITE_APP_BASE_API]: {
          // 服务器地址：http://sph-api.atguigu.cn
          target: env.VITE_SERVER,
          // 是否跨域
          changeOrigin: true,
          // 重写路径
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxGcm9udGVuZFxcXFxWdWUzXHU3ODQ1XHU4QzM3XHU3NTA0XHU5MDA5XHU1QjlFXHU2MjE4XFxcXGd1aWd1LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxGcm9udGVuZFxcXFxWdWUzXHU3ODQ1XHU4QzM3XHU3NTA0XHU5MDA5XHU1QjlFXHU2MjE4XFxcXGd1aWd1LWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Gcm9udGVuZC9WdWUzJUU3JUExJTg1JUU4JUIwJUI3JUU3JTk0JTg0JUU5JTgwJTg5JUU1JUFFJTlFJUU2JTg4JTk4L2d1aWd1LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVXNlckNvbmZpZ0V4cG9ydCwgQ29uZmlnRW52LGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnIC8vIFx1NUYxNVx1NTE2NXN2Z1x1NjNEMlx1NEVGNlxuaW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZ0V4cG9ydCA9PiB7XG4gIGxldCBlbnYgPSBsb2FkRW52KG1vZGUscHJvY2Vzcy5jd2QoKSlcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMnKV0sXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nLFxuICAgICAgfSksXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgICAgbW9ja1BhdGg6ICdtb2NrJyxcbiAgICAgICAgZW5hYmxlOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSAvLyBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdTUyMkJcdTU0MERcdTkxNERcdTdGNkVcdUZGMENcdTRGN0ZcdTc1MjggQCBcdTRFRTNcdTY2RkYgc3JjXG4gICAgICB9XG4gICAgfSxcbiAgICBjc3M6IHtcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgICAgc2Nzczoge1xuICAgICAgICAgIC8vIHNjc3NcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcdTkxNERcdTdGNkVcbiAgICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXCIuL3NyYy9hc3NldHMvc3R5bGUvdmFyaWFibGUuc2Nzc1wiOycsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBcdTRFRTNcdTc0MDZcdThERThcdTU3REZcbiAgICBzZXJ2ZXI6e1xuICAgICAgcHJveHk6e1xuICAgICAgICAvLyBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXVx1RkYxQVx1NEVFM1x1NzQwNlx1OEJGN1x1NkM0Mlx1NjI0MFx1OTcwMFx1ODk4MVx1NzY4NFx1NTE3M1x1OTUyRVx1NUI1N1xuICAgICAgICBbZW52LlZJVEVfQVBQX0JBU0VfQVBJXTp7XG4gICAgICAgICAgLy8gXHU2NzBEXHU1MkExXHU1NjY4XHU1NzMwXHU1NzQwXHVGRjFBaHR0cDovL3NwaC1hcGkuYXRndWlndS5jblxuICAgICAgICAgIHRhcmdldDplbnYuVklURV9TRVJWRVIsXG4gICAgICAgICAgLy8gXHU2NjJGXHU1NDI2XHU4REU4XHU1N0RGXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOnRydWUsXG4gICAgICAgICAgLy8gXHU5MUNEXHU1MTk5XHU4REVGXHU1Rjg0XG4gICAgICAgICAgcmV3cml0ZToocGF0aCk9PnBhdGgucmVwbGFjZSgvXlxcL2FwaS8sJycpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdWLFNBQXFDLGVBQWU7QUFDcFksT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUNqQixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLHFCQUFxQjtBQUo5QixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLENBQUMsRUFBRSxTQUFRLEtBQUssTUFBbUM7QUFDaEUsTUFBSSxNQUFNLFFBQVEsTUFBSyxRQUFRLElBQUksQ0FBQztBQUNwQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQTtBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBO0FBQUEsVUFFSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUE7QUFBQSxJQUVBLFFBQU87QUFBQSxNQUNMLE9BQU07QUFBQTtBQUFBLFFBRUosQ0FBQyxJQUFJLGlCQUFpQixHQUFFO0FBQUE7QUFBQSxVQUV0QixRQUFPLElBQUk7QUFBQTtBQUFBLFVBRVgsY0FBYTtBQUFBO0FBQUEsVUFFYixTQUFRLENBQUNBLFVBQU9BLE1BQUssUUFBUSxVQUFTLEVBQUU7QUFBQSxRQUMxQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
