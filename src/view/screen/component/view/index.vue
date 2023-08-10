<template>
  <div class="scenic">
    <div>热门景区排行</div>
    <div></div>
    <div ref="charts"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'

const charts = ref()

onMounted(() => {
  let my = echarts.init(charts.value)
  my.setOption({
    xAxis: {},
    yAxis: {
      type: 'category'
    },
    tooltip: {
      trigger: 'item'
    },
    grid: {
      top: 20,
      right: 20,
      left: 25,
      bottom: 20,
    },
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 50, 20, 25],
        label: {
          show: true
        },
        itemStyle: {
          color: 'pink'
        }
      }
    ]
  })
})
</script>

<style lang='scss' scoped>
.scenic {
  margin: 20px 0px;
  width: 82%;
  height: 380px;
  background: url('@/assets/images/screen/dataScreen-main-rt.png') no-repeat;
  background-size: cover;
  position: relative;

  >div:first-of-type {
    font-size: 18px;
  }

  >div:nth-child(2) {
    margin-top: 10px;
    width: 100px;
    height: 10px;
    background: url('@/assets/images/screen/dataScreen-title.png') no-repeat;
  }

  >div:nth-child(3) {
    width: 100%;
    height: 280px;
    margin-top: 10px;
  }
}
</style>