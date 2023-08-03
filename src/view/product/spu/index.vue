<template>
  <div>
    <div class="spu_top">
      <Select :scene="scene"></Select>
    </div>
    <div class="spu_main">
      <div v-show="scene == 0">
        <div>
          <el-button type="primary" :icon="Plus" :disabled="attrStore.c3Id ? false : true"
            @click="addSpu">添加SPU</el-button>
        </div>
        <div>
          <el-table :data="records" :border="true" style="width: 100%" stripe>
            <el-table-column label="序号" type="index" width="80" :align="align" />
            <el-table-column label="SPU名称" prop="spuName" />
            <el-table-column label="SPU描述" prop="description" show-overflow-tooltip />
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="primary" :icon="Plus" @click="addSku(scope.row)"></el-button>
                <el-button type="warning" :icon="Edit" @click="updateSpu(scope.row)"></el-button>
                <el-button type="info" :icon="InfoFilled" @click="showSku(scope.row)"></el-button>
                <el-button type="danger" :icon="Delete" @click="deleteSku(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
          :disabled="disabled" :background="background" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
          @current-change="getSpuList" @size-change="handleSize" />
      </div>
      <!--  添加或修改SPU -->
      <div v-show="scene == 1">
        <SpuAdd @changeScene="changeScene" ref="spuRef"></SpuAdd>
      </div>
      <!--  添加或修改SKU -->
      <div v-show="scene == 2">
        <SkuAdd @changeScene="changeScene" ref="skuRef"></SkuAdd>
      </div>
      <el-dialog v-model="dialogVisible" title="SKU列表">
        <el-table :data="skuArr" :border="true">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="scope">
              <img :src="scope.row.skuDefaultImg" style="width: 100px;height: 100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog>

      </el-dialog>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Plus, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import useAttrStore from '@/store/module/attr';
import { reqSpuList, reqDeleteSpu } from '@/api/product/spu/index'
import type { SpuListResponseData, Records, SpuData } from '@/api/product/spu/types'
import { reqQuerySku } from '@/api/product/sku/index'
import type { SkuData } from '@/api/product/sku/types'
import SpuAdd from './spuAdd.vue'
import SkuAdd from './skuAdd.vue'
import { ElMessage, ElMessageBox } from 'element-plus';


const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
const disabled = ref<boolean>(false)
const background = ref<boolean>(true)
const scene = ref<number>(0)
const align = ref<string>('center')
const attrStore = useAttrStore()
const records = ref<Records>([])
const spuRef = ref()
const skuRef = ref()
const skuArr = ref<SkuData[]>([])
const dialogVisible = ref<boolean>(false)


watch(() => attrStore.c3Id, () => {
  if (attrStore.c3Id) {
    getSpuList()
  } else {
    records.value = []
  }
})

const getSpuList = async (page: number = 1) => {
  currentPage.value = page
  let result: SpuListResponseData = await reqSpuList(currentPage.value, pageSize.value, attrStore.c3Id)
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
const handleSize = () => {
  getSpuList()
}

// 添加spu回调
const addSpu = () => {
  scene.value = 1
  spuRef.value.initAddSpu(attrStore.c3Id)
}
// 修改spu
const updateSpu = (row: SpuData) => {
  scene.value = 1
  spuRef.value.initSpuData(row)
}
// 子组件返回状态0回调
const changeScene = (obj: any) => {
  scene.value = obj.flag
  if (obj.operation == 'update') {
    getSpuList(currentPage.value)
  } else {
    getSpuList()
  }
}

// 添加sku
const addSku = (row: any) => {
  scene.value = 2
  skuRef.value.initSkuData(attrStore.c1Id, attrStore.c2Id, row)
}

// 展示sku
const showSku = async (row: SpuData) => {
  let result = await reqQuerySku(row.id)
  if (result.code == 200) {
    skuArr.value = result.data
    dialogVisible.value = true
  } else {
    ElMessage.error(result.message)
  }
}
// 删除sku
const deleteSku = async (row: any) => {
  ElMessageBox.confirm(
    `确认删除${row.spuName}`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqDeleteSpu(row.id)
      if (result.code == 200) {
        ElMessage.success('删除成功')
        getSpuList(records.value.length > 1 ? currentPage.value : currentPage.value - 1)
      } else {
        ElMessage(result.message)
      }
    })
}
</script>

<style lang='scss' scoped>
.spu_top,
.spu_main {
  border: 1px solid $color-black-opacity-2;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 2px $color-black-opacity-1;
  background-color: $color-white;
  padding: 20px;
  margin-bottom: 15px;
}

.spu_main {
  >div:first-of-type {
    margin-bottom: 15px;

    >div {
      margin-bottom: 15px;
    }
  }

  .spu_item {
    width: 100%;
    height: 32px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
}
</style>