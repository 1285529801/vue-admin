// vite.config.ts
import vue from "file:///D:/Frontend/Vue3%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E5%AE%9E%E6%88%98/guigu-admin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
import { createSvgIconsPlugin } from "file:///D:/Frontend/Vue3%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E5%AE%9E%E6%88%98/guigu-admin/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { viteMockServe } from "file:///D:/Frontend/Vue3%E7%A1%85%E8%B0%B7%E7%94%84%E9%80%89%E5%AE%9E%E6%88%98/guigu-admin/node_modules/vite-plugin-mock/dist/index.js";
var vite_config_default = ({ command }) => {
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
        "@": path.resolve("./src")
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
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxGcm9udGVuZFxcXFxWdWUzXHU3ODQ1XHU4QzM3XHU3NTA0XHU5MDA5XHU1QjlFXHU2MjE4XFxcXGd1aWd1LWFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxGcm9udGVuZFxcXFxWdWUzXHU3ODQ1XHU4QzM3XHU3NTA0XHU5MDA5XHU1QjlFXHU2MjE4XFxcXGd1aWd1LWFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9Gcm9udGVuZC9WdWUzJUU3JUExJTg1JUU4JUIwJUI3JUU3JTk0JTg0JUU5JTgwJTg5JUU1JUFFJTlFJUU2JTg4JTk4L2d1aWd1LWFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVXNlckNvbmZpZ0V4cG9ydCwgQ29uZmlnRW52IH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJyAvLyBcdTVGMTVcdTUxNjVzdmdcdTYzRDJcdTRFRjZcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuZXhwb3J0IGRlZmF1bHQgKHtjb21tYW5kfTogQ29uZmlnRW52KTogVXNlckNvbmZpZ0V4cG9ydD0+e1xuICByZXR1cm4ge1xuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2Fzc2V0cy9pY29ucycpXSxcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgICB9KSxcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xuICAgICAgICBtb2NrUGF0aDogJ21vY2snLFxuICAgICAgICBlbmFibGU6IHRydWUsXG4gICAgICB9KSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoXCIuL3NyY1wiKSAvLyBcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcdTUyMkJcdTU0MERcdTkxNERcdTdGNkVcdUZGMENcdTRGN0ZcdTc1MjggQCBcdTRFRTNcdTY2RkYgc3JjXG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgLy8gc2Nzc1x1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlx1OTE0RFx1N0Y2RVxuICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiAnQGltcG9ydCBcIi4vc3JjL2Fzc2V0cy9zdHlsZS92YXJpYWJsZS5zY3NzXCI7JyxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG59XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sU0FBUztBQUNoQixPQUFPLFVBQVU7QUFDakIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxxQkFBcUI7QUFDOUIsSUFBTyxzQkFBUSxDQUFDLEVBQUMsUUFBTyxNQUFpQztBQUN2RCxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixxQkFBcUI7QUFBQSxRQUNuQixVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsUUFDMUQsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLE1BQ0QsY0FBYztBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNMLE9BQU87QUFBQSxRQUNILEtBQUssS0FBSyxRQUFRLE9BQU87QUFBQTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBO0FBQUEsVUFFSixtQkFBbUI7QUFBQSxVQUNuQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDSjtBQUNBOyIsCiAgIm5hbWVzIjogW10KfQo=
