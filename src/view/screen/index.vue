<template>
  <div class="container">
    <div class="screen" ref="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <Bottom />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import Top from './top.vue'
import Bottom from './bottom.vue'

const screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()})translate(-50%,-50%)`
})
const getScale = (w = 1920, h = 1080) => {
  let ww = window.innerWidth / w
  let wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

window.onresize = () => {
  screen.value.style.transform = `scale(${getScale()})translate(-50%,-50%)`
}
</script>

<style lang='scss' scoped>
.container {
  width: 100vw;
  height: 100vh;
  // background-image: url('@/assets/images/screen/bg.png');
  background-color: rgba($color: #565262, $alpha: .7);

  .screen {
    width: 1920px;
    height: 1080px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform-origin: left top;
    color: white;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      width: 100%;
    }
  }

}
</style>