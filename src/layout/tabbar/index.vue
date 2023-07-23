<template>
  <div class="tabbar_container">
    <div class="tabbar_left">
      <div @click="handleCollapse">
        <SvgIcon :name="!layoutStore.isCollapse ? `outdent` : `indent`" />
      </div>
      <div>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item v-for="(item, index) in $route.matched" v-show="item.meta.icon" :key="index"
            :to="item.path">
            <el-icon class="icon">
              <SvgIcon :name="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.title }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <!-- 控制模块 -->
    <Setting />
  </div>
</template>

<script setup lang='ts'>
import Setting from '@/layout/setting/index.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router';
import useLayoutStore from '@/store/module/layout.ts'

const $route = useRoute()
const layoutStore = useLayoutStore()

// 控制menu伸缩
const handleCollapse = () => {
  layoutStore.isCollapse = !layoutStore.isCollapse
}
</script>

<style lang='scss' scoped>
.tabbar_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .tabbar_left {
    display: flex;

    >div:first-of-type {
      margin: 0px 15px;
      cursor: pointer;
    }

    .icon {
      margin: 0px 5px;
      position: relative;
      top: 3px;
    }
  }
}
</style>