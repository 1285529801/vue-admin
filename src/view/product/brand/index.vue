<template>
  <div class="brand_container">
    <div>
      <el-button type="primary" :icon="Plus" @click="open">添加品牌</el-button>
    </div>
    <div>
      <el-table :border="true" :data="brandData" style="width: 100%" stripe v-loading="loading">
        <el-table-column label="序号" type="index" width="80" :align="align" />
        <el-table-column label="品牌名称" prop="tmName" />
        <el-table-column label="品牌LOGO">
          <template #default="scope">
            <div class="brand_image">
              <img :src="scope.row.logoUrl" :alt="scope.row.tmName">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="scope">
            <el-button type="warning" :icon="Edit" @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" :icon="Delete" @click="handleDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
        :disabled="disabled" :background="background" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
        @current-change="getBrandData" @size-change="getBrandData()" />
    </div>

    <el-dialog v-model="dialogVisible" :title="title" width="40%">
      <el-form :model="reqBrandData" style="width: 80%;" :rules="rules" ref="brandForm">
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input placeholder="请输入品牌名称" v-model="reqBrandData.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <el-upload :show-file-list="false" class="avatar-uploader" action="/api/admin/product/fileUpload"
            :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess">
            <img v-if="reqBrandData.logoUrl" :src="reqBrandData.logoUrl" class="avatar" />
            <el-icon class="avatar" v-else>
              <SvgIcon name="upload" width="30px" height="30px" />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="commit">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted, reactive } from 'vue'
import { reqBrandQuery, reqBrandAddOrUpdate, reqBrandDelete } from '@/api/product/brand/index'
import type { Records, BrandResponseData, Brand, ResponseData } from '@/api/product/brand/types'
import { ElMessage, ElMessageBox } from 'element-plus'

const currentPage = ref<number>(1)
const pageSize = ref<number>(3)
const total = ref<number>(0)
const disabled = ref<boolean>(false)
const background = ref<boolean>(true)
const align = ref<string>('center')
const loading = ref<boolean>(false)
const brandData = ref<Records>([])
const dialogVisible = ref<boolean>(false)
const title = ref<string>('')
const brandForm = ref()
const reqBrandData = reactive<Brand>({
  tmName: '',
  logoUrl: ''
})

onMounted(() => {
  getBrandData()
})
const handleEdit = (row: any) => {
  title.value = '修改品牌'
  // 展示已有的数据
  reqBrandData.id = row.id
  reqBrandData.logoUrl = row.logoUrl
  reqBrandData.tmName = row.tmName
  dialogVisible.value = true
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `确认删除${row.tmName}吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqBrandDelete(row.id)
      if (result.code == 200) {
        getBrandData(brandData.value.length > 1 ? currentPage.value : currentPage.value - 1)
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      } else {
        ElMessage({
          type: 'error',
          message: result.data,
        })
      }

    })
}

// 打开对话框
const open = () => {
  title.value = '添加品牌'
  // 每次打开对话框前清空数据
  reqBrandData.id = 0
  reqBrandData.logoUrl = ''
  reqBrandData.tmName = ''
  dialogVisible.value = true
}

const getBrandData = async (page: number = 1) => {
  currentPage.value = page
  loading.value = true
  let result: BrandResponseData = await reqBrandQuery(currentPage.value, pageSize.value)
  brandData.value = result.data.records
  total.value = result.data.total
  loading.value = false
}

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
// 将提交成功返回的logoUrl存储
const handleAvatarSuccess = (response: ResponseData) => {
  reqBrandData.logoUrl = response.data
}
// 提交新增的品牌
const commit = async () => {
  await brandForm.value.validate()
  // 有ID是修改品牌
  let result = await reqBrandAddOrUpdate(reqBrandData)
  if (result.code == 200) {
    dialogVisible.value = false
    ElMessage.success(reqBrandData.id ? '修改成功' : '添加成功')
    getBrandData(reqBrandData.id ? currentPage.value : 1)
  } else {
    dialogVisible.value = false
    ElMessage.error(result.data)
  }
}

// 表单校验
const rules = reactive({
  tmName: [{ required: true, message: '请输入品牌名', trigger: 'blur' }],
  logoUrl: [{ required: true, message: '请导入品牌LOGO', trigger: 'blur' }]
})

</script>

<style lang='scss' scoped>
.brand_container {
  border: 1px solid $color-black-opacity-2;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 2px $color-black-opacity-1;
  background-color: $color-white;
  padding: 20px;

  >div:nth-child(2) {
    margin: 10px 0px;
  }

  .brand_image {
    width: 130px;
    height: 140px;
    border: 1px solid $color-black-opacity-1;

    >img:first-of-type {
      height: 100%;
      width: 100%;
    }
  }

  .avatar-uploader,
  .avatar {
    width: 178px;
    height: 178px;
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
}
</style>