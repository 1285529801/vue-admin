<template>
  <el-form>
    <el-form-item label="SKU名称" label-width="100px">
      <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName" />
    </el-form-item>
    <el-form-item label="价格（元）" label-width="100px" type="number">
      <el-input placeholder="请输入价格" v-model="skuParams.price" />
    </el-form-item>
    <el-form-item label="重量（克）" label-width="100px" type="number">
      <el-input placeholder="请输入重量" v-model="skuParams.weight" />
    </el-form-item>
    <el-form-item label="SKU描述" label-width="100px">
      <el-input placeholder="请输入描述" type="textarea" v-model="skuParams.skuDesc" />
    </el-form-item>
    <el-form-item label="平台属性" label-width="100px">
      <el-form :inline="true">
        <el-form-item v-for="item in attrList" :label="item.attrName" :key="item.id" style="margin-bottom: 10px;"
          label-width="70px">
          <el-select v-model="item.attrIdAndValueId">
            <el-option v-for="i in item.attrValueList" :label="i.valueName" :key="i.attrId"
              :value="`${item.id}:${i.id}`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性" label-width="100px">
      <el-form :inline="true">
        <el-form-item v-for="item in saleArr" :label="item.saleAttrName" :key="item.id" label-width="70px">
          <el-select v-model="item.saleIdAndValueId">
            <el-option v-for="i in item.spuSaleAttrValueList" :label="i.saleAttrValueName" :key="i.id"
              :value="`${item.id}:${i.id}`"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

    </el-form-item>
    <el-form-item label="图片名称" label-width="100px">
      <el-table :data="imageList" :border="true" ref="multipleTableRef">
        <el-table-column type="selection" width="80px" :align="align"></el-table-column>
        <el-table-column label="图片">
          <template #default="scope">
            <div class="sku_image">
              <img :src="scope.row.imgUrl" :alt="scope.row.imgName">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="warning" @click="handlerDefault(scope.row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item label-width="100px">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { reqAttrList } from '@/api/product/attr'
import { AttrListData, AttrObj } from '@/api/product/attr/types'
import { reqSpuImageList, reqSaleAttrList } from '@/api/product/spu'
import type {
  SpuData,
  SpuImageList,
  SpuImage,
  SaleAttrResponseData,
  SaleAttr
} from '@/api/product/spu/types'
import type { SkuData } from '@/api/product/sku/types'
import { reqAddSku } from '@/api/product/sku/index'
import { ref } from 'vue';
import { ElMessage } from 'element-plus'


const align = ref<string>('center')
const $emit = defineEmits(['changeScene'])
const skuParams = ref<SkuData>({
  category3Id: '',
  spuId: '',
  tmId: '',
  skuName: '',
  price: '',
  weight: '',
  skuDesc: '',
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
  skuDefaultImg: ''
})
const multipleTableRef = ref<any>()
const imageList = ref<SpuImage[]>([])
const saleArr = ref<SaleAttr[]>([])
const attrList = ref<AttrObj[]>([])

const initSkuData = async (c1Id: number, c2Id: number, row: SpuData) => {
  // 先清空数据
  Object.assign(skuParams, {
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
  })
  let result: AttrListData = await reqAttrList(c1Id, c2Id, row.category3Id)
  let result1: SpuImageList = await reqSpuImageList(row.id)
  let result2: SaleAttrResponseData = await reqSaleAttrList(row.id)
  skuParams.value.category3Id = row.category3Id
  skuParams.value.spuId = row.id
  skuParams.value.tmId = row.tmId
  attrList.value = result.data
  imageList.value = result1.data
  saleArr.value = result2.data
}
defineExpose({ initSkuData })

const cancel = () => {
  $emit('changeScene', { flag: 0 })
}
// 设置默认
const handlerDefault = (row: any) => {
  // 让全部都不选中
  imageList.value.forEach((item: any) => {
    multipleTableRef.value.toggleRowSelection(item, false)
  })
  // 点击到的才选中
  multipleTableRef.value.toggleRowSelection(row, true)
  // 收集图片地址
  skuParams.value.skuDefaultImg = row.imgUrl

}
const save = async () => {
  skuParams.value.skuAttrValueList = attrList.value.reduce((prev: any, next: any) => {
    if (next.attrIdAndValueId) {
      let [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  skuParams.value.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
    if (next.saleIdAndValueId) {
      let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({ saleAttrId, saleAttrValueId })
    }
    return prev
  }, [])
  // 发请求
  let result = await reqAddSku(skuParams.value)
  if (result.code == 200) {
    ElMessage.success('添加成功')
    $emit('changeScene', { flag: 0 })
  } else {
    ElMessage.error(result.message)
  }
}
</script>

<style lang='scss' scoped>
.sku_image {
  width: 130px;
  height: 140px;
  border: 1px solid $color-black-opacity-1;

  >img:first-of-type {
    height: 100%;
    width: 100%;
  }
}
</style>