<template>
  <div class="sex-container">
    <div>男女比例</div>
    <div></div>
    <div>
      <div>
        <div>男士</div>
        <img src="@/assets/images/screen/man.png" alt="男士">
      </div>
      <div>
        <div>女士</div>
        <img src="@/assets/images/screen/woman.png" alt="女士">
      </div>
    </div>
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
    title: {
      text: '男女比例',
      textStyle: {
        color: 'white',
      },
      top: '0%',
      left: '40%',
    },
    xAxis: { show: false },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        type: 'bar',
        data: [68],
        barWidth: 20,
        z: 100,
        itemStyle: {
          borderRadius: 20
        }
      },
      {
        type: 'bar',
        data: [100],
        barWidth: 20,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20
        }
      }
    ],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  })
})
</script>

<style lang='scss' scoped>
.sex-container {
  width: 82%;
  height: 320px;
  background: url('@/assets/images/screen/dataScreen-main-lc.png') no-repeat;
  background-size: cover;
  margin: 20px 0px;
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
    display: flex;
    position: absolute;
    top: 25%;
    left: 2%;

    >div:first-of-type {
      width: 120px;
      height: 130px;
      background: url('@/assets/images/screen/man-bg.png') no-repeat;
      background-size: cover;
      margin: 0px 50px;
      display: flex;
      flex-direction: column;
      align-items: center;

      >img {
        width: 90px;
        height: 90px;
        margin-top: 20px;
      }
    }

    >div:nth-child(2) {
      width: 120px;
      height: 130px;
      background: url('@/assets/images/screen/woman-bg.png') no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      align-items: center;

      >img {
        width: 90px;
        height: 90px;
        margin-top: 20px;
      }
    }
  }

  >div:nth-child(4) {
    width: 80%;
    height: 80px;
    position: absolute;
    top: 210px;
    left:10%;
  }
}
</style>