<template>
  <div class="year">
    <div>年度游客量对比</div>
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
    xAxis: {
      type: 'category',
      show: true,
      data: ['2018', '2019', '2020', '2021', '2022', '2023']
    },
    yAxis: {
      show: false
    },
    grid: {
      top: 20,
      right: 20,
      left: 25,
      bottom: 20,
    },
    tooltip: {
      trigger: 'item'
    },
    series: {
      type: 'scatter',
      data: [320,280, 250, 380, 350, 300],
      symbol: 'arrow',
      symbolSize: 12,
      label: {
        show: true,
        position: 'top',
        color: 'yellow',
        textStyle: {
          fontSize: 17
        }
      },
      itemStyle: {
        color: 'skyblue'
      }
    }
  })
})
</script>

<style lang='scss' scoped>
.year {
  width: 82%;
  height: 320px;
  background: url('@/assets/images/screen/dataScreen-main-rc.png') no-repeat;
  background-size: cover;
  margin: 20px 0px;

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
    height: 220px;
    margin-top: 20px;
  }
}
</style>