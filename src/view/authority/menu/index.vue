<template>
  <div class="menu_center">
    <el-table :data="menuArr" style="width: 100%; margin-bottom: 20px" row-key="id" :border="true">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="addMenu(scope.row)" :disabled="scope.row.level == 4 ? true : false">
            {{ scope.row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button type="primary" @click="updateMenu(scope.row)"
            :disabled="scope.row.level == 1 ? true : false">编辑</el-button>
          <el-button type="primary" @click="deleteMenu(scope.row)"
            :disabled="scope.row.level == 1 ? true : false">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogVisible" :title="menuParams.id ? '更新菜单' : '添加菜单'" width="40%">
      <el-form :model="menuParams">
        <el-form-item label="名称" label-width="70px">
          <el-input v-model="menuParams.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="权限值" label-width="70px">
          <el-input v-model="menuParams.code" placeholder="请输入权限值" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang='ts'>
import { reqAllPermission, reqAddOrUpdateMenu, reqRemoveMenu } from '@/api/acl/menu/index'
import { MenuResponseData, Menu, MenuParams } from '@/api/acl/menu/types'
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue';

const menuArr = ref<Menu[]>([])
const dialogVisible = ref<boolean>(false)
const menuParams = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0
})

onMounted(() => {
  getMenuList()
})
const getMenuList = async () => {
  let result: MenuResponseData = await reqAllPermission()
  if (result.code == 200) {
    menuArr.value = result.data
  } else {
    ElMessage.error(result.data)
  }
}

// 添加
const addMenu = async (row: Menu) => {
  dialogVisible.value = true
  Object.assign(menuParams, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0
  })
  menuParams.level = row.level + 1
  menuParams.pid = row.id as number
}

// 编辑
const updateMenu = (row: any) => {
  dialogVisible.value = true
  Object.assign(menuParams, row)
}

// 确认提交
const confirm = async () => {
  let result = await reqAddOrUpdateMenu(menuParams)
  if (result.code == 200) {
    ElMessage.success(menuParams.id ? '更新成功' : '添加成功')
    getMenuList()
    dialogVisible.value = false

  } else {
    ElMessage.error(result.data)
  }
}

// 删除
const deleteMenu = (row: any) => {
  ElMessageBox.confirm(
    `确认删除“${row.name}”吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqRemoveMenu(row.id)
      if (result.code == 200) {
        ElMessage.success('删除成功')
        getMenuList()
      } else {
        ElMessage.error(result.data)
      }
    })
}
</script>

<style lang='scss' scoped>
.menu_center {
  border: 1px solid $color-black-opacity-2;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 2px $color-black-opacity-1;
  background-color: $color-white;
  padding: 20px;
  margin-bottom: 15px;
}
</style>