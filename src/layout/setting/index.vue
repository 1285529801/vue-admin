<template>
  <div class="setting">
    <el-popover placement="bottom" title="刷新" :width="200" trigger="hover" content="点击刷新">
      <template #reference>
        <div @click="handleRefresh">
          <el-button :icon="Refresh" circle />
        </div>
      </template>
    </el-popover>
    <el-popover placement="bottom" title="全屏" :width="200" trigger="hover" content="点击切换全屏">
      <template #reference>
        <div @click="handleFullScreen">
          <el-button :icon="FullScreen" circle />
        </div>
      </template>
    </el-popover>
    <el-popover placement="bottom" title="主题设置" :width="200" trigger="hover" content="点击设置主题样式">
      <template #reference>
        <div>
          <el-button :icon="Setting" circle @click="handleSetting" />
        </div>
      </template>
    </el-popover>
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
const loginOut = async () => {
  ElMessageBox.confirm(
    '确认注销并退出系统吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      await userStore.userLoginOut()
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