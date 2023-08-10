<template>
  <div class="tourist">
    <div>实时游客统计</div>
    <div></div>
    <div>可预约总量<span>99999</span> 人</div>
    <div>
      <div v-for="item in people">{{ item }}</div>
    </div>
    <div ref="charts"></div>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts';
import 'echarts-liquidfill'

const people = ref('216908人')
const charts = ref()

onMounted(() => {
  let my = echarts.init(charts.value)
  my.setOption({
    title: {
    },
    tooltip: {},
    xAxis: {},
    yAxis: {},
    series: [
      {
        type: 'liquidFill',
        data: [{ name: 'Green Home', value: 0.6 }],
        label: { formatter: 'Green\nHome', fontSize: 20 },
        waveAnimation: true,
        shape: 'circle',
        radius: '60%'
      }
    ],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  });
})
</script>

<style lang='scss' scoped>
.tourist {
  margin: 20px 0px;
  width: 82%;
  height: 380px;
  background: url('@/assets/images/screen/dataScreen-main-lt.png') no-repeat;
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
    position: absolute;
    right: 10px;
    top: 30px;

    >span {
      color: $color-orange;
      margin: 0px 3px 0px 10px;
    }
  }

  >div:nth-child(4) {
    position: absolute;
    top: 65px;
    left: 25px;
    display: flex;

    >div {
      width: 50px;
      height: 50px;
      background: url('@/assets/images/screen/total.png') no-repeat;
      background-size: cover;
      font-size: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  >div:last-of-type {
    width: 100%;
    height: 250px;
    position: absolute;
    top: 110px;
  }
}
</style>