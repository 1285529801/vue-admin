<template>
  <div class="home_container">
    <div><el-avatar :size="50" :src="userStore.avatar" /></div>
    <div>
      <p>{{ getTime() }}好, {{ userStore.userName }}</p>
      <p>欢迎来到{{ setting.title }}</p>
    </div>

  </div>
</template>

<script setup lang='ts'>
import useUserStore from '@/store/module/user'
import { getTime } from '@/utils/time'
import setting from '@/setting/index'

const userStore = useUserStore()

</script>

<style lang='scss' scoped>
.home_container {
  width: 100%;
  height: 15vh;
  border-radius: 5px;
  background-color: $color-white-opacity-7;
  display: flex;
  align-items: center;
  padding: 20px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);

  >div {
    margin: 0px 10px;
  }

  >div:nth-child(2){
    >p{
      line-height: 25px;
    }
    >p:first-of-type{
      font-weight: bold;
    }
    >p:nth-child(2){
      color: $color-black-opacity-5;
    }
  }
}
</style>