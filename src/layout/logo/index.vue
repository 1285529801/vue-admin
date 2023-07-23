<template>
  <a href="/" target="_self" style="text-decoration: none;">
    <div class="logo_container">
      <img :src="setting.logo" alt="logo">
      <p>{{ setting.title }}</p>
    </div>
  </a>
</template>

<script setup lang='ts'>
import setting from '@/setting/index.ts'
</script>

<style lang='scss' scoped>
.logo_container {
  width: 100%;
  height: $base-menu-logo-height;
  display: flex;
  transition: all .5s;

  img {
    width: 50px;
    height: 50x;
    object-fit: cover;
    margin: 0px 5px;
  }

  p {
    color: $color-white;
    line-height: $base-tabbar-height;
    font-size: $base-menu-logo-title;
    font-weight: bold;
    overflow: hidden;
  }
}
</style>