<template>
  <div>
    <h1>我是app</h1>
    <el-button type="warning">123</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <SvgIcon name="house" width="39px" height="39px"></SvgIcon>
  </div>
</template>

<script setup lang='ts'>
import {onMounted} from 'vue'
import {reqLogin,reqUserInfo} from '@/api/user/index.ts'

onMounted(()=>{
  reqLogin({
    username:'admin',
    password:'111111'
  }).then(res => {
    console.log(res);
  })
  reqUserInfo().then(res =>{console.log(res);})
})
</script>

<style scoped lang="scss">
h1{
  color:$red;
}
</style>