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
    <el-dropdown trigger="click" class="userInfo">
      <div>
        <div>
          <el-avatar :size="32" :src="userStore.avatar" />
        </div>
        <div>
          <span>{{ userStore.userName }}</span>
        </div>
        <div>
          <el-icon>
            <SvgIcon name="arrowdown" fill="grey" width="15px" height="15px" />
          </el-icon>
        </div>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <div @click="loginOut">退出登录</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/store/module/user.ts'
import useLayoutStore from '@/store/module/layout.ts'
import { Refresh, FullScreen, Setting } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus'

const userStore = useUserStore()
const layoutStore = useLayoutStore()
const $router = useRouter()

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

// 退出登录
const loginOut = () => {
  ElMessageBox.confirm(
    '确认注销并退出系统吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      userStore.userLoginOut()
      $router.push('/login')
    })
}
</script>

<style lang='scss' scoped>
.setting {
  display: flex;

  >div {
    margin: 0px 10px;
  }

  .userInfo {
    cursor: pointer;

    >div:first-of-type {
      display: flex;
      align-items: center;

      >div:nth-child(2) {
        margin: 0px 10px;
      }

      >div:last-of-type {
        position: relative;
        top: 2px;
      }
    }

  }
}
</style>