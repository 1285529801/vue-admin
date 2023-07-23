<template>
  <div class="setting">
    <div @click="handleRefresh">
      <el-button :icon="Refresh" circle />
    </div>
    <div @click="handleFullScreen">
      <el-button :icon="FullScreen" circle />
    </div>
    <div>
      <el-button :icon="Setting" circle @click="handleSetting" />
    </div>
    <div>
      <div><el-avatar :size="32" :src="userStore.avatar" /></div>
      <div><span>{{ userStore.userName }}</span></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/store/module/user.ts'
import useLayoutStore from '@/store/module/layout.ts'
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue';

const userStore = useUserStore()
const layoutStore = useLayoutStore()
// 点击按钮刷新
const handleRefresh = () => {
  layoutStore.refresh = !layoutStore.refresh
}

// 点击按钮全屏
const handleFullScreen = () => {
  // DOM对象的一个属性，用来判断当前是不是全屏模式
  let full = document.fullscreenElement
  if (!full) {
    // 切换为全屏模式
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

// 点击设置按钮
const handleSetting = () => {
  layoutStore.drawer = !layoutStore.drawer
}
</script>

<style lang='scss' scoped>
.setting {
  display: flex;

  >div {
    margin: 0px 10px;
  }

  >div:last-of-type {
    display: flex;
    align-items: center;

    >div:last-of-type {
      margin: 0px 15px;
    }
  }
}
</style>