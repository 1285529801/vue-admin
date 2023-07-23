<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<script setup lang='ts'>
import useLayoutStore from '@/store/module/layout.ts'
import useUserStore from '@/store/module/user';
import { watch, ref, nextTick, onMounted } from 'vue'

const UserStore = useUserStore()
const layoutStore = useLayoutStore()
// 控制组件的渲染
const flag = ref(true)

// 监听仓库中refresh的变化，刷新组件

watch(() => layoutStore.refresh, () => {
  flag.value = false
  // 在dom每次更新完之后执行一次
  nextTick(() => {
    flag.value = true
  })
})

// 获取用户数据
onMounted(() => {
  UserStore.userInfo()
})

</script>

<style lang='scss' scoped>
// 过渡动画
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>