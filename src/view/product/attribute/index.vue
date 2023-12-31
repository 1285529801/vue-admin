<template>
  <div>
    <div class="attr_top">
      <Select :scene="scene"></Select>
    </div>
    <div class="attr_main">
      <div v-if="scene == 0">
        <div>
          <el-button type="primary" :icon="Plus" :disabled="attrStore.c3Id ? false : true"
            @click="changeEdit">添加平台属性</el-button>
        </div>
        <div>
          <el-table :data="attrStore.attrList" :border="true" style="width: 100%" stripe>
            <el-table-column label="序号" type="index" width="80" :align="align" />
            <el-table-column label="属性名称" prop="attrName" />
            <el-table-column label="属性值名称">
              <template #default="scope">
                <el-tag v-for="item in scope.row.attrValueList" :key="item.id" style="margin: 3px;">
                  {{ item.valueName }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button type="warning" :icon="Edit" @click="handleEdit(scope.row)"></el-button>
                <el-button type="danger" :icon="Delete" @click="handleDelete(scope.row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-else>
        <el-form>
          <el-form-item label="属性名称" style="width: 20%;">
            <el-input v-model="attrParams.attrName" placeholder="请输入属性名" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Plus" :disabled="attrParams.attrName ? false : true"
              @click="addAttr">添加属性值</el-button>
            <el-button @click="scene = 0">取消</el-button>
          </el-form-item>
          <el-form-item>
            <el-table :data="attrParams.attrValueList" :border="true" style="width: 100%" stripe>
              <el-table-column label="序号" type="index" width="80" :align="align" />
              <el-table-column label="属性值">
                <template #default="scope">
                  <el-input placeholder="请输入属性值" v-model="scope.row.valueName" @blur="toLook(scope.row, scope.$index)"
                    v-show="scope.row.flag" :ref="(vc: any) => inputRef[scope.$index] = vc" />
                  <div v-show="!scope.row.flag" @click="toEdit(scope.row, scope.$index)" class="attr_item">{{
                    scope.row.valueName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="属性值操作">
                <template #default="scope">
                  <el-button type="danger" :icon="Delete" @click="handleDeleteAttr(scope.row, scope.$index)"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isSave ? false : true" @click="save">保存</el-button>
            <el-button @click="scene = 0">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { ref, reactive, nextTick, watch, onMounted } from 'vue'
import useAttrStore from '@/store/module/attr'
import type { AttrObj } from '@/api/product/attr/types'
import { reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr/index'
import { ElMessage, ElMessageBox } from 'element-plus'

const scene = ref<number>(0)
const isSave = ref<boolean>(false)
const align = ref<string>('center')
const inputRef = ref<any>([])
const attrStore = useAttrStore()
const attrParams = reactive<AttrObj>({
  attrName: '',
  attrValueList: [],
  categoryId: '',
  categoryLevel: 3
})

onMounted(() => {
  attrStore.attrList = []
})

// 监听c3Id的变化，发请求
watch(() => attrStore.c3Id, () => {
  if (attrStore.c3Id) {
    attrStore.getAttrList()
  }
})
const handleEdit = (row: any) => {
  isSave.value = true
  scene.value = 1
  // 深拷贝
  // 利用JSON.stringify 将js对象序列化（JSON字符串），再使用JSON.parse来反序列化(还原)js对象
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
const handleDelete = (row: any) => {
  ElMessageBox.confirm(
    `确认删除“${row.attrName}”吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqDeleteAttr(row.id)
      if (result.code == 200) {
        attrStore.getAttrList()
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      } else {
        return Promise.reject(new Error(result.message))
      }
    })
    .catch((err: any) => {
      ElMessage({
        type: 'error',
        message: err,
      })
    })
}
const handleDeleteAttr = (row: any, $index: any) => {
  ElMessageBox.confirm(
    `确认删除“${row.valueName}”吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      attrParams.attrValueList?.splice($index, 1)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      console.log(attrParams.attrValueList);
    })
    .catch(() => {

    })
}

const changeEdit = () => {
  // 每次编辑前先清空数据
  Object.assign(attrParams, {
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3,
    id: ''
  })
  scene.value = 1
}
// 添加属性值
const addAttr = () => {
  isSave.value = true
  attrParams.attrValueList?.push({
    valueName: '',
    flag: true
  })
  nextTick(() => {
    inputRef.value[inputRef.value.length - 1].focus()
  })

}
// 切换输入框和div
const toLook = (row: any, $index: number) => {
  // 非法情况1
  if (row.valueName == '') {
    ElMessage.error('输入属性值不能为空')
    nextTick(() => {
      inputRef.value[$index].focus()
    })
    isSave.value = false
    return
  }
  // 非法情况2
  let repeat = attrParams.attrValueList?.find((item) => {
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  if (repeat) {
    ElMessage.error('输入属性值不能重复')
    nextTick(() => {
      inputRef.value[$index].focus()
    })
    isSave.value = false
    return
  }
  isSave.value = true
  row.flag = false
}
// 保存
const save = async () => {
  attrParams.categoryId = attrStore.c3Id
  let result = await reqAddOrUpdateAttr(attrParams)
  console.log(result);
  if (result.code == 200) {
    ElMessage.success(attrParams.id ? '修改成功' : '添加成功')
    // 成功后重新获取属性值列表
    attrStore.getAttrList()
  } else {
    ElMessage.error(result.message)
  }
  scene.value = 0
}

const toEdit = (row: any, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputRef.value[$index].focus()
  })
}
</script>

<style lang='scss' scoped>
.attr_top,
.attr_main {
  border: 1px solid $color-black-opacity-2;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 2px $color-black-opacity-1;
  background-color: $color-white;
  padding: 20px;
  margin-bottom: 15px;
}

.attr_main {
  >div:first-of-type {
    >div:first-of-type {
      margin-bottom: 15px;
    }
  }

  .attr_item {
    width: 100%;
    height: 32px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
}
</style>