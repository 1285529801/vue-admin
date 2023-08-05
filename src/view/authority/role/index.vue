<template>
  <div>
    <div class="user_center">
      <el-form :inline="true">
        <el-form-item label="角色名称：">
          <el-input placeholder="请输入角色名称" v-model="keyWord" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyWord ? false : true">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user_center">
      <el-button type="primary" @click="addUser">添加职位</el-button>
      <el-table :data="roleArr" :border="true" style="width:100%;margin: 15px 0px;">
        <el-table-column type="index" label="#" :align="align" width="80px"></el-table-column>
        <el-table-column prop="id" label="Id" :align="align" width="80px"></el-table-column>
        <el-table-column prop="roleName" label="职位名称" :align="align"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" :align="align" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" :align="align" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="350px" :align="align">
          <template #default="scope">
            <el-button type="primary" :icon="User" @click="distribution(scope.row)">分配权限</el-button>
            <el-button type="primary" :icon="Edit" @click="updateUser(scope.row)">编辑</el-button>
            <el-button type="primary" :icon="Delete" @click="removeRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15]"
        :disabled="disabled" :background="background" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
        @current-change="getRoleList" @size-change="handleSize" />

      <el-dialog v-model="dialogVisible" :title="roleParams.id ? '更新角色' : '添加角色'" width="30%">
        <el-form :model="roleParams" :rules="rules" ref="roleRef">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleParams.roleName" placeholder="请输入角色名称" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </template>
      </el-dialog>

      <el-drawer title="分配用户角色" v-model="drawer">
        <el-tree ref="tree" :data="menuArr" show-checkbox node-key="id" default-expand-all
          :default-checked-keys="selectArr" :props="defaultProps" />
        <template #footer>
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="authority">确认</el-button>
        </template>
      </el-drawer>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { User, Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted, reactive, nextTick } from 'vue';
import {
  reqRoleList,
  reqAddOrUpdateRole,
  reqAllPermission,
  reqSetPermission,
  reqRemoveRole
} from '@/api/acl/role/index'
import { RoleResponseData, Role, MenuData, MenuResponseData } from '@/api/acl/role/types'
import { ElMessage, ElMessageBox } from 'element-plus';
import useLayoutStore from '@/store/module/layout'

const currentPage = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const disabled = ref<boolean>(false)
const background = ref<boolean>(true)
const align = ref<string>('center')
const roleArr = ref<Role[]>([])
const dialogVisible = ref<boolean>(false)
const drawer = ref<boolean>(false)
const keyWord = ref<string>('')
const roleRef = ref()
const menuArr = ref<MenuData[]>([])
const selectArr = ref<any>([])
const tree = ref()
const roleParams = reactive<Role>({
  id: '',
  roleName: '',
})
const layoutStore = useLayoutStore()
// 树形控件的配置
const defaultProps = {
  children: 'children',
  label: 'name',
}



// 校验规则
const checkRoleName = (_rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('角色名称不能为空'))

  }
  else if (value.length < 2) {
    callback(new Error('角色名称长度应大于或等于2位'))
  }
  else {
    callback()
  }
}
const rules = reactive({
  roleName: [
    { required: 'true', validator: checkRoleName, trigger: 'blur' }
  ],
})

onMounted(() => {
  getRoleList()
})
// 获取角色列表
const getRoleList = async (page: number = 1) => {
  currentPage.value = page
  let result: RoleResponseData = await reqRoleList(currentPage.value, pageSize.value, keyWord.value)
  if (result.code == 200) {
    roleArr.value = result.data.records
    total.value = result.data.total
  }
}

const handleSize = () => {
  getRoleList()
}

// 添加用户
const addUser = () => {
  // 清空
  Object.assign(roleParams, {
    id: '',
    roleName: ''
  })
  nextTick(() => {
    roleRef.value.clearValidate('roleNme')
  })
  dialogVisible.value = true

}
// 编辑用户
const updateUser = (row: any) => {
  dialogVisible.value = true
  Object.assign(roleParams, row)

}
// 提交信息
const confirm = async () => {
  let result = await reqAddOrUpdateRole(roleParams)
  if (result.code == 200) {
    ElMessage.success(roleParams.id ? '更新成功' : '添加成功')
    getRoleList(roleParams.id ? currentPage.value : 1)
    dialogVisible.value = false
  } else {
    ElMessage.error(result.data)
  }
}
// 统计被勾选的权限
const statistics = (arr: any, initArr: any) => {
  arr.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      statistics(item.children, initArr)
    }
  })
  return initArr
}

// 分配角色
const distribution = async (row: Role) => {
  roleParams.id = row.id
  let result: MenuResponseData = await reqAllPermission(roleParams.id as number)
  if (result.code == 200) {
    menuArr.value = result.data
    selectArr.value = statistics(menuArr.value, [])
  } else {
    ElMessage.error(result.data)
  }
  drawer.value = true
}

// 提交分配结果
const authority = async () => {
  let arr1 = tree.value.getCheckedKeys()
  let arr2 = tree.value.getHalfCheckedKeys()
  let permissionId = [...arr1, ...arr2]
  let result = await reqSetPermission(roleParams.id as number, permissionId)
  if (result.code == 200) {
    ElMessage.success('分配成功')
    drawer.value = false
    window.location.reload()
  } else {
    ElMessage.error(result.data)
  }
}

// 删除角色
const removeRole = async (row: any) => {
  console.log(row);
  ElMessageBox.confirm(
    `确认删除“${row.roleName}”吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqRemoveRole(row.id)
      if (result.code == 200) {
        ElMessage.success('删除成功')
        getRoleList(roleArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
      } else {
        ElMessage.error(result.data)
      }
    })
}

// 查询角色
const search = async () => {
  getRoleList()
}
// 重置
const reset = () => {
  layoutStore.refresh = !layoutStore.refresh
}
</script>

<style lang='scss' scoped>
.user_center {
  border: 1px solid $color-black-opacity-2;
  border-radius: 5px;
  box-shadow: 0px 0px 2px 2px $color-black-opacity-1;
  background-color: $color-white;
  padding: 20px;
  margin-bottom: 15px;
}
</style>