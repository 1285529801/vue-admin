<template>
  <template v-for="(item) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path" @click="goRoute">
      <el-icon>
        <SvgIcon :name="item.meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有且仅有一个子路由 -->
    <el-menu-item v-if="item.children && item.children.length === 1 && !item.meta.hidden" :index="item.children[0].path"
      @click="goRoute">
      <el-icon>
        <SvgIcon :name="item.children[0].meta.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.children[0].meta.title }}</span>
      </template>
    </el-menu-item>
    <!-- 有多个子路由 -->
    <el-sub-menu v-if="item.children && item.children.length > 1 && !item.meta.hidden" :index="item.path">
      <template #title>
        <el-icon>
          <SvgIcon :name="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <el-menu-item v-for="i in item.children" @click="goRoute" :index="i.path">
        <el-icon>
          <SvgIcon :name="i.meta.icon" />
        </el-icon>
        <template #title>
          <span>{{ i.meta.title }}</span>
        </template>
      </el-menu-item>
    </el-sub-menu>
  </template>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
const { menuList } = defineProps(['menuList'])
const $router = useRouter()

const goRoute = (item: any) => {
  $router.push(item.index)
}
</script>

<style lang='scss' scoped></style>