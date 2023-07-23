<template>
  <svg :style="{ width: width, height: height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang='ts'>
defineProps({
  prefix: {
    type: String,
    default: "#icon-"
  },
  name: {
    type: String,
  },
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  },
  color: {
    type: String,
    default: ""
  }
})
</script>
