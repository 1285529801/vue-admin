<template>
  <div class="age">
    <div>年龄比例</div>
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
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '20%',
      right: '8%',
      orient: 'vertical',
      itemGap: 10,
      textStyle: {
        color: 'white',
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '军事' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '娱乐' },
          { value: 300, name: '财经' }
        ]
      }
    ]
  })
})

</script>

<style lang='scss' scoped>
.age {
  width: 82%;
  height: 350px;
  background: url('@/assets/images/screen/dataScreen-main-lb.png') no-repeat;
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