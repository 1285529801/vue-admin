<template>
  <el-form>
    <!-- SPU名称 -->
    <el-form-item label="SPU名称" label-width="100px">
      <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName" />
    </el-form-item>
    <!-- SPU品牌 -->
    <el-form-item label="SPU品牌" label-width="100px">
      <el-select placeholder="请选择品牌" v-model="spuParams.tmId">
        <el-option v-for="item in allTradeMark" :label="item.tmName" :key="item.id" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <!-- SPU描述 -->
    <el-form-item label="SPU描述" label-width="100px">
      <el-input type="textarea" placeholder="请输入描述" v-model="spuParams.description" />
    </el-form-item>
    <!-- SPU品牌 -->
    <el-form-item label="SPU品牌" label-width="100px">
      <el-upload v-model:file-list="imageList" list-type="picture-card" :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove" :before-upload="beforeAvatarUpload" action="/api/admin/product/fileUpload">
        <el-icon class="avatar">
          <SvgIcon name="plus" width="25px" height="25px" />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img :src="dialogImageUrl" w-full alt="Preview Image" style="width: 100%; height: 100%;" />
      </el-dialog>
    </el-form-item>
    <!-- SPU销售属性 -->
    <el-form-item label="SPU销售属性" label-width="100px">
      <el-select v-model="saleIdAndName" :placeholder="unSelectAttr.length ? `还有${unSelectAttr.length}个未选择` : `无`">
        <el-option v-for=" item  in  unSelectAttr " :label="item.name" :key="item.id"
          :value="`${item.name}:${item.id}`"></el-option>
      </el-select>
      <el-button :disabled="saleIdAndName ? false : true" @click="addSaleAttr" type="primary" :icon="Plus"
        style="margin-left: 15px;">添加销售属性</el-button>
      <el-table :data="saleArr" :border="true" style="width: 100%;margin: 10px 0px;" stripe>
        <el-table-column type="index" label="序号" :align="align" width="80"></el-table-column>
        <el-table-column label="属性名" width="80" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <template #default="scope">
            <el-tag v-for="( item, index ) in  scope.row.spuSaleAttrValueList " :key="item.id" class="mx-1" closable
              :disable-transitions="false" @close="handleClose(scope.row, index)" style="margin: 5px;">
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input v-if="scope.row.flag" :ref="(vc: any) => inputRef[scope.$index] = vc" v-model="scope.row.inputValue"
              style="width: 18%;" size="small" @blur="handleInputConfirm(scope.row, scope.index)" />
            <el-button v-else size="small" @click="showInput(scope.row, scope.$index)" :icon="Plus"
              type="success"></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" :align="align">
          <template #default="scope">
            <el-button type="danger" :icon="Delete" @click="AttrDelete(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button :disabled="saleArr.length > 0 ? false : true" @click="save" type="primary">
        保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { Plus, Delete } from '@element-plus/icons-vue'
import { ref, computed, nextTick } from 'vue';
import { ElMessage } from 'element-plus'
import type {
  SpuData,
  SpuTradeMarkResponse,
  SpuImageList,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  TradeMark,
  SpuImage,
  SaleAttr,
  HasSaleAttr,
  SpuSaleAttrValueList
} from '@/api/product/spu/types'
import {
  reqAllTradeMark,
  reqSpuImageList,
  reqSaleAttrList,
  reqAllSaleAttr,
  reqAddOrUpdateSpu,
} from '@/api/product/spu/index'


const dialogVisible = ref<boolean>(false)
const dialogImageUrl = ref('')
const align = ref<string>('center')
const $emit = defineEmits(['changeScene'])
const allTradeMark = ref<TradeMark[]>([])
const imageList = ref<SpuImage[]>([])
const saleArr = ref<SaleAttr[]>([])
const allSaleAttr = ref<HasSaleAttr[]>([])
const spuParams = ref<SpuData>({
  category3Id: '',
  description: '',
  tmId: '',
  spuName: '',
  spuImageList: [],
  spuSaleAttrList: [],
})
// 收集要添加的属性
const saleIdAndName = ref<string>('')
// 收集输入的属性值
const inputRef = ref<any>([])

// 计算为添加的属性
const unSelectAttr = computed(() => {
  let result: HasSaleAttr[] = allSaleAttr.value.filter(item => {
    return saleArr.value.every(item1 => {
      // every方法：若有一个不满足条件，则返回false，后面的元素都不会再执行
      // 相比使用两层for循环效率更高
      // allSaleAttr：颜色、版本、尺码
      //     saleArr：颜色、版本
      return item1.saleAttrName != item.name
    })
  })
  return result
})
// 从父组件获取spu数据
const initSpuData = async (row: SpuData) => {
  spuParams.value = row
  let result: SpuTradeMarkResponse = await reqAllTradeMark()
  let result1: SpuImageList = await reqSpuImageList((row.id as number))
  let result2: SaleAttrResponseData = await reqSaleAttrList((row.id as number))
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTradeMark.value = result.data
  imageList.value = result1.data.map(item => {
    return {
      name: item.imgName,
      url: item.imgUrl
    }
  })
  saleArr.value = result2.data
  allSaleAttr.value = result3.data
}
// 从父组件获取所有品牌、属性列表
const initAddSpu = async (params: any) => {
  // 清空
  Object.assign(spuParams.value, {
    category3Id: '',
    description: '',
    tmId: '',
    spuName: '',
    spuImageList: [],
    spuSaleAttrList: [],
    id: ''
  })
  imageList.value = []
  saleArr.value = []
  let result: SpuTradeMarkResponse = await reqAllTradeMark()
  let result3: HasSaleAttrResponseData = await reqAllSaleAttr()
  allTradeMark.value = result.data
  allSaleAttr.value = result3.data
  spuParams.value.category3Id = params
}
// 暴露方法
defineExpose({ initSpuData, initAddSpu })

// 对上传的LOGO进行约束
const beforeAvatarUpload = (rawFile: any) => {
  if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
    if (rawFile.size / 1024 / 1024 > 4) {
      ElMessage.error('上传图片大小必须小于4MB!')
      return false
    }
    else return true
  } else {
    ElMessage.error('上传图片须为JPG|PNG|GIF')
    return false
  }
}

const handleRemove = (uploadFile: any, uploadFiles: any) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile: any) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
// 点击取消，返回
const cancel = () => {
  $emit('changeScene', { flag: 0 })
}

const handleClose = (row: any, index: number) => {
  row.spuSaleAttrValueList?.splice(index, 1)
}

const handleInputConfirm = (row: any, index: number) => {
  // 非法情况1
  if (!row.inputValue) {
    ElMessage.error('输入不能为空')
    nextTick(() => {
      inputRef.value[index].focus()
    })
    return
  }
  // 非法情况2
  let repeat = row.spuSaleAttrValueList?.some((item: any) => {
    return item.saleAttrValueName === row.inputValue
  })
  if (repeat) {
    ElMessage.error('输入属性值不能重复')
    nextTick(() => {
      inputRef.value[index].focus()
    })
    return
  }
  if (row.inputValue) {
    let { baseSaleAttrId, inputValue, saleAttrName } = row
    let obj = {
      baseSaleAttrId,
      saleAttrName,
      saleAttrValueName: inputValue
    }
    row.spuSaleAttrValueList.push(obj)
  }
  row.inputValue = ''
  row.flag = false
}
const showInput = async (row: any, index: number) => {
  await row.spuSaleAttrValueList.push()
  row.flag = true
  nextTick(() => {
    inputRef.value[index].focus()
  })
}

// 删除整行属性值
const AttrDelete = ($index: number) => {
  saleArr.value?.splice($index, 1)
}
// 添加销售属性
const addSaleAttr = () => {
  let [saleAttrName, baseSaleAttrId] = saleIdAndName.value.split(':')
  let spuSaleAttrValueList = <SpuSaleAttrValueList>[]
  let newSaleAttr: SaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrValueList }
  saleArr.value.push(newSaleAttr)
  saleIdAndName.value = ''
}

// 保存提交
const save = async () => {
  spuParams.value.spuImageList = imageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url
    }
  })
  spuParams.value.spuSaleAttrList = saleArr.value
  let result = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code == 200) {
    ElMessage.success(spuParams.value.id ? '更新成功' : '添加成功')
    $emit('changeScene', { flag: 0, operation: spuParams.value.id ? 'update' : 'add' })
  } else {
    ElMessage.error(result.message)
  }
}
</script>
<style lang='scss' scoped>
.avatar-uploader,
.avatar {
  width: 160px;
  height: 148px;
  display: block;
  border: 1px dashed $color-black-opacity-2;
  border-radius: 5px;

  &:hover {
    border: 1px dashed $color-blue;
  }
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>