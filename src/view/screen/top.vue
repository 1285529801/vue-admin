<template>
  <div class="top-container">
    <div>
      <div @click="back">首页</div>
    </div>
    <div>
      <div>智慧旅游可视化大数据展示平台</div>
    </div>
    <div>
      <div>统计报告</div>
      <div>当前时间：{{ formatted }}</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router';
import { formatted } from '@/utils/time'

const $router = useRouter()

// 回到首页
const back = () => {
  $router.push('/home')
}
</script>

<style lang='scss' scoped>
.top-container {
  width: 1920px;
  height: 40px;
  display: flex;

  >div:first-of-type {
    background: url('@/assets/images/screen/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    flex: 1;
    display: flex;
    position: relative;

    >div {
      width: 130px;
      height: 40px;
      background: url('@/assets/images/screen/dataScreen-header-btn-bg-l.png') no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      cursor: pointer;
    }
  }

  >div:nth-child(2) {
    height: 74px;
    background: url('@/assets/images/screen/dataScreen-header-center-bg.png') no-repeat;
    background-size: cover;
    flex: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }

  >div:last-of-type {
    background: url('@/assets/images/screen/dataScreen-header-left-bg.png') no-repeat;
    background-size: cover;
    flex: 1;
    display: flex;
    position: relative;
    align-items: center;

    >div:first-of-type {
      width: 130px;
      height: 40px;
      background: url('@/assets/images/screen/dataScreen-header-btn-bg-r.png') no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
    }

    >div:nth-child(2) {
      margin-left: 250px;
    }
  }
}
</style>