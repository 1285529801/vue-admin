<template>
  <div class="appointment">
    <div>预约渠道数据统计</div>
    <div></div>
    <div ref="charts"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import 'echarts-liquidfill'

const charts = ref();

onMounted(() => {
  let my = echarts.init(charts.value)
  my.setOption({
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '小程序', max: 6500 },
        { name: '官网', max: 16000 },
        { name: '线下', max: 30000 },
        { name: '黄牛', max: 38000 },
        { name: '携程', max: 52000 },
        { name: '去哪儿', max: 25000 }
      ]
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 7000, 20000, 35000, 50000, 18000],
            name: 'Allocated Budget',
            itemStyle:{
              color:'red'
            }
          },
        ],
        label:{
          color:'white'
        }
      }
    ]
  })
})
</script>

<style lang='scss' scoped>
.appointment {
  width: 82%;
  height: 350px;
  background: url('@/assets/images/screen/dataScreen-main-rb.png') no-repeat;
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
    height: 260px;
    margin-top: 20px;
  }
}
</style>