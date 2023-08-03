<template>
  <div>
    <div class="sku_center">
      <el-table :data="skuArr" style="margin-bottom: 15px;" :border="true">
        <el-table-column label="序号" type="index" width="80px" :align="'center'"></el-table-column>
        <el-table-column label="名称" prop="skuName" width="250px"></el-table-column>
        <el-table-column label="描述" prop="skuDesc" width="250px"></el-table-column>
        <el-table-column label="默认图片" width="250px">
          <template #default="scope">
            <img :src="scope.row.skuDefaultImg" :alt="scope.row.skuName" style="width: 200px; height: 200px;">
          </template>
        </el-table-column>
        <el-table-column label="重量(g)" prop="weight" width="250px"></el-table-column>
        <el-table-column label="价格(元)" prop="price" width="250px"></el-table-column>
        <el-table-column label="操作" width="300px" fixed="right">
          <template #default="scope">
            <el-button :icon="scope.row.isSale == 1 ? Bottom : Top" :type="scope.row.isSale == 1 ? 'info' : 'success'"
              @click="SkuOnOrUnSale(scope.row)"></el-button>
            <el-button :icon="Edit" type="warning" @click="updating"></el-button>
            <el-button :icon="InfoFilled" type="info" @click="getInfo(scope.row)"></el-button>
            <el-button :icon="Delete" type="danger" @click="remove(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
        :disabled="disabled" :background="background" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
        @current-change="getSkuList" @size-change="handleSize" />
    </div>
    <el-drawer v-model="drawer" title="查看商品详情">
      <template #default>
        <div v-if="skuInfo">
          <el-row style="margin-bottom: 15px;">
            <el-col :span="6">名称</el-col>
            <el-col :span="18">123</el-col>
          </el-row>
          <el-row style="margin-bottom: 15px;">
            <el-col :span="6">描述</el-col>
            <el-col :span="18">123</el-col>
          </el-row>
          <el-row style="margin-bottom: 15px;">
            <el-col :span="6">价格</el-col>
            <el-col :span="18">123</el-col>
          </el-row>
          <el-row style="margin-bottom: 15px;">
            <el-col :span="6">平台属性</el-col>
            <el-col :span="18">123</el-col>
          </el-row>
          <el-row style="margin-bottom: 15px;">
            <el-col :span="6">销售属性</el-col>
            <el-col :span="18">123</el-col>
          </el-row>
          <el-row style="margin-bottom: 15px;">
            <el-col :span="6">商品图片</el-col>
            <el-col :span="18">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                  <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <h1>数据无法请求，功能正在改善，敬请期待！</h1>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang='ts'>
import { Top, Bottom, Edit, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue';
import { reqGetSkuList, reqCancelSaleSku, reqSaleSku, reqSkuInfo, reqRemoveSku } from '@/api/product/sku/index'
import { SkuData } from '@/api/product/sku/types'
import { ElMessage, ElMessageBox } from 'element-plus';

const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(100)
const disabled = ref<boolean>(false)
const background = ref<boolean>(true)
const drawer = ref<boolean>(false)
const skuArr = ref<SkuData[]>([])
const skuInfo = ref()

onMounted(() => {
  getSkuList()
})

//  获取sku列表
const getSkuList = async (page: number = 1) => {
  currentPage.value = page
  let result = await reqGetSkuList(currentPage.value, pageSize.value)
  if (result.code == 200) {
    skuArr.value = result.data.records
    total.value = result.data.total

  } else {
    ElMessage.error(result.message)
  }
}

const handleSize = () => {
  getSkuList()
}
// 侧边栏查看sku
const getInfo = async (row: any) => {
  drawer.value = true
  let result = await reqSkuInfo(row.id as number)
  console.log(result);
  if (result.code == 200) {
    console.log(result.data);
    skuInfo.value = result.data
  } else {
    ElMessage.error(result.message)
  }

}
// 商品上架或下架
const SkuOnOrUnSale = async (row: SkuData) => {
  // 下架
  if (row.isSale == 1) {
    let result = await reqCancelSaleSku(row.id as number)
    if (result.code == 200) {
      ElMessage.success('下架成功')
      row.isSale = 0
    } else {
      ElMessage.error(result.message)
    }
  }
  // 上架
  else {
    let result = await reqSaleSku(row.id as number)
    if (result.code == 200) {
      ElMessage.success('上架成功')
      row.isSale = 1
    } else {
      ElMessage.error(result.message)
    }
  }
}
const updating = () => {
  ElMessage.warning('该模块正在开发中......')
}

const remove = async (row: any) => {
  ElMessageBox.confirm(
    `确认删除${row.skuName}吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqRemoveSku(row.id)
      if (result.code == 200) {
        ElMessage.success('删除成功')
        getSkuList(skuArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
      } else {
        ElMessage.error(result.message)
      }
    })
}
</script>

<style lang='scss' scoped>
.sku_center {
  border: 1px solid $color-black-opacity-2;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 2px $color-black-opacity-1;
  background-color: $color-white;
  padding: 20px;
  margin-bottom: 15px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>