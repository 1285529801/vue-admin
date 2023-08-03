<template>
  <el-form :inline="true">
    <el-form-item label="一级分类">
      <el-select placeholder="请选择" v-model="attrStore.c1Id" @change="getC2Arr"
        :disabled="props.scene == 0 ? false : true">
        <el-option v-for="item in attrStore.c1Arr" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select placeholder="请选择" v-model="attrStore.c2Id" @change="getC3Arr"
        :disabled="props.scene == 0 ? false : true">
        <el-option v-for="item in attrStore.c2Arr" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select placeholder="请选择" v-model="attrStore.c3Id" :disabled="props.scene == 0 ? false : true">
        <el-option v-for="item in attrStore.c3Arr" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import useAttrStore from '@/store/module/attr.ts'
import { onMounted } from 'vue';

const props = defineProps(['scene'])
const attrStore = useAttrStore()

onMounted(() => {
  attrStore.c1Arr = []
  attrStore.c1Id = ''
  attrStore.c2Arr = []
  attrStore.c2Id = ''
  attrStore.c3Arr = []
  attrStore.c3Id = ''
  attrStore.getC1()
})

// 获取二级分类
const getC2Arr = () => {
  attrStore.attrList = []
  attrStore.getC2()
}
// 获取三级分类
const getC3Arr = () => {
  attrStore.attrList = []
  attrStore.getC3()
}

</script>

<style lang='scss' scoped></style>