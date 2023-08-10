<template>
  <div class="future">
    <div>未来30天游客数量趋势图</div>
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
    grid: {
      top: 20,
      bottom: 30,
      left: 35,
      right: 20
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      splitLine: {
        show: false
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
    },
    yAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      }
    },
    series: [
      {
        data: [0, 820, 932, 20, 934, 60, 1330, 1320],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: 'skyblue'
        }
      }
    ]
  })
})
</script>

<style lang='scss' scoped>
.future {
  background: url('@/assets/images/screen/dataScreen-main-cb.png') no-repeat;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  flex: 1;
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
    height: 240px;
    margin-top: 25px;
  }
}
</style>