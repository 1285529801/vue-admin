<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ slider_collapse: LayoutStore.isCollapse ? true : false }">
      <Logo />
      <el-scrollbar class="slider_scrollbar">
        <el-menu default-active="/home" :collapse="LayoutStore.isCollapse" :background-color="setting.menuColor"
          :text-color="setting.menuTextColor">
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabbar" :class="{ tabbar_collapse: LayoutStore.isCollapse ? true : false }">
      <TabBar />
    </div>
    <!-- 内容展示 -->
    <div class="layout_main" :class="{ main_collapse: LayoutStore.isCollapse ? true : false }">
      <Main></Main>
    </div>

    <el-drawer v-model="LayoutStore.drawer" title="主题设置">
      <div class="layout_drawer">
        <div>
          <span>主题颜色</span>
          <el-color-picker v-model="settingColor" />
        </div>
        <div>
          <span>暗黑模式</span>
          <el-switch v-model="settingBlack" />
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang='ts'>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import TabBar from './tabbar/index.vue'
import setting from '@/setting/index.ts'
import useUserStore from '@/store/module/user'
import useLayoutStore from '@/store/module/layout.ts'
import { ref } from 'vue'

const settingColor = ref('#409EFF')
const settingBlack = ref(false)
const userStore = useUserStore()
const LayoutStore = useLayoutStore()

</script>

<style lang='scss' scoped>
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all .5s;

    &.slider_collapse {
      width: $base-menu-min-width;
    }

    .slider_scrollbar {
      height: calc(100vh - $base-tabbar-height);

      .el-menu {
        // 消除菜单的右边框
        border-right: 0px;
      }
    }
  }

  .layout_tabbar {
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    position: fixed;
    top: 0px;
    left: $base-menu-width;
    color: $color-black;
    transition: all .5s;

    &.tabbar_collapse {
      width: calc(100% - $base-menu-min-width);
      left: calc($base-menu-width - ($base-menu-width - $base-menu-min-width));
    }
  }

  .layout_main {
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabbar-height);
    background-color: $base-main-background;
    position: absolute;
    top: $base-tabbar-height ;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all .5s;

    &.main_collapse {
      width: calc(100% - $base-menu-min-width);
      left: calc($base-menu-width - ($base-menu-width - $base-menu-min-width));
    }
  }

  // 浏览器滚动条样式
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: $base-menu-background;
  }

  ::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #fff;
    border-radius: 10px;
  }

  .layout_drawer {
    >div {
      display: flex;
      justify-content: space-between;

      >span {
        position: relative;
        top: 5px;
      }
    }
  }
}
</style>