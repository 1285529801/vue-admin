<template>
  <div class="bottom-container">
    <div class="left">
      <Tourist />
      <Sex />
      <Age />
    </div>
    <div class="center">
      <Map />
      <Future />
    </div>
    <div class="right">
      <View />
      <Year />
      <Appointment />
    </div>
  </div>
</template>

<script setup lang='ts'>
import Tourist from './component/tourist/index.vue'
import Sex from './component/sex/index.vue'
import Age from './component/age/index.vue'
import View from './component/view/index.vue'
import Year from './component/year/index.vue'
import Appointment from './component/appointment/index.vue'
import Future from './component/future/index.vue'
import Map from './component/map/index.vue'

</script>

<style lang='scss' scoped>
.bottom-container {
  width: 100%;
  height: 1040px;
  display: flex;


  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .center {
    flex: 2;
    display: flex;
    flex-direction: column;

  }

  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>