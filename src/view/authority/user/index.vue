<template>
  <div>
    <div class="user_center">
      <el-form :inline="true">
        <el-form-item label="用户名称：">
          <el-input placeholder="请输入用户名称" v-model="keyWord" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" :disabled="keyWord ? false : true">搜索</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user_center">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="danger" @click="batchRemove" :disabled="selectionArr.length ? false : true">批量删除</el-button>
      <el-table :data="userArr" @selection-change="selection" :border="true" style="width:100%;margin: 15px 0px;">
        <el-table-column type="selection" width="50px" />
        <el-table-column type="index" label="#" :align="align" width="80px"></el-table-column>
        <el-table-column prop="id" label="Id" :align="align" width="80px"></el-table-column>
        <el-table-column prop="name" label="用户名字" :align="align"></el-table-column>
        <el-table-column prop="username" label="用户名称" :align="align"></el-table-column>
        <el-table-column label="用户角色" :align="align">
          <template #default="scope">
            <span v-for="item in (scope.row.roleName.split(','))" style="margin: 5px;">
              <el-tag v-if="item != ''">
                {{ item }}
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :align="align" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" :align="align" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="350px" :align="align">
          <template #default="scope">
            <el-button type="primary" :icon="User" @click="distribution(scope.row)">分配角色</el-button>
            <el-button type="primary" :icon="Edit" @click="updateUser(scope.row)">编辑</el-button>
            <el-button type="primary" :icon="Delete" @click="removeUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 7, 9]"
        :disabled="disabled" :background="background" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
        @current-change="getUserList" @size-change="handleSize" />

      <el-drawer :title="userParams.id ? '编辑用户' : '添加用户'" v-model="drawer1">
        <el-form :model="userParams" :rules="rules" ref="userForm">
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="userParams.name" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="username">
            <el-input v-model="userParams.username" placeholder="请输入用户昵称" />
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
            <el-input v-model="userParams.password" placeholder="请输入用户密码" />
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="drawer1 = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </template>
      </el-drawer>

      <el-drawer title="分配用户角色" v-model="drawer2">
        <el-form :model="userParams" :rules="rules" ref="userForm">
          <el-form-item label="用户姓名">
            <el-input v-model="userParams.name" :disabled="true" />
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange"
              style="width: 100%;">
              全选
            </el-checkbox>
            <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="item in allRole" :key="item" :label="item">
                {{ item.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <el-button @click="drawer2 = false">取消</el-button>
          <el-button type="primary" @click="updateRole">确认</el-button>
        </template>
      </el-drawer>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { User, Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted, reactive, nextTick } from 'vue';
import {
  reqAllUserList,
  reqAddOrUpdateUser,
  reqUserRoleList,
  reqUpdateUserRole,
  reqRemoveUser,
  reqBatchRemoveUser
} from '@/api/acl/user/index'
import { UserResponseData, Records } from '@/api/acl/user/types'
import { ElMessage, ElMessageBox } from 'element-plus';
import useLayoutStore from '@/store/module/layout'

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const disabled = ref<boolean>(false)
const background = ref<boolean>(true)
const align = ref<string>('center')
const userArr = ref<Records>([])
const drawer1 = ref<boolean>(false)
const drawer2 = ref<boolean>(false)
const userForm = ref<any>()
const isIndeterminate = ref(true)
const checkAll = ref(false)
const userRole = ref<any[]>(['前端', '后端'])
const allRole = ref<any[]>([])
const selectionArr = ref<any[]>([])
const keyWord = ref<string>('')
const userParams = reactive<any>({
  id: '',
  name: '',
  username: '',
  password: ''
})
const layoutStore = useLayoutStore()

// 自定义校验规则
const checkUserName = (_rule: any, value: any, callback: any) => {
  if (value.length < 5) {
    callback(new Error('用户昵称长度应大于或等于5位'))
  }
  else if (value === '') {
    callback(new Error('用户昵称不能为空'))
  }
  else {
    callback()
  }
}
const checkPassWord = (_rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error('密码长度应大于或等于6位'))
  }
  else if (value === '') {
    callback(new Error('密码不能为空'))
  }
  else {
    callback()
  }
}
const checkName = (_rule: any, value: any, callback: any) => {
  if (value.length < 2) {
    callback(new Error('用户姓名长度应大于或等于2位'))
  }
  else if (value === '') {
    callback(new Error('用户姓名不能为空'))
  }
  else {
    callback()
  }
}
const rules = reactive({
  username: [
    { required: 'true', validator: checkUserName, trigger: 'blur' }
  ],
  password: [
    { required: 'true', validator: checkPassWord, trigger: 'blur' }
  ],
  name: [
    { required: 'true', validator: checkName, trigger: 'blur' }
  ]
})

onMounted(() => {
  getUserList()
})
// 获取用户列表
const getUserList = async (page: number = 1) => {
  currentPage.value = page
  let result: UserResponseData = await reqAllUserList(currentPage.value, pageSize.value, keyWord.value)
  if (result.code == 200) {
    userArr.value = result.data.records
    total.value = result.data.total
  }
}

const handleSize = () => {
  getUserList()
}

// 添加用户
const addUser = () => {
  // 清空
  Object.assign(userParams, {
    id: '',
    name: '',
    username: '',
    password: ''
  })
  drawer1.value = true
  // 清除上一次的表单校验信息
  nextTick(() => {
    userForm.value.clearValidate('username')
    userForm.value.clearValidate('name')
    userForm.value.clearValidate('password')
  })
}
// 编辑用户
const updateUser = (row: any) => {
  drawer1.value = true
  console.log(row);
  Object.assign(userParams, row)
  // 清除上一次的表单校验信息
  nextTick(() => {
    userForm.value.clearValidate('username')
    userForm.value.clearValidate('name')
  })
}
// 提交信息
const confirm = async () => {
  // 等待所有表单校验通过后，才能发送请求
  await userForm.value.validate()
  let result = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    ElMessage.success(userParams.id ? '更新成功' : '添加成功')
    drawer1.value = false
    // 让浏览器刷新，如果是修改了当前登录的账号信息，就会回退到登录页面
    window.location.reload()
  } else {
    ElMessage.error(result.data)
  }
}

// 分配角色
const distribution = async (row: any) => {
  drawer2.value = true
  Object.assign(userParams, row)
  let result = await reqUserRoleList(row.id)
  if (result.code == 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
  } else {
    ElMessage.error(result.data)
  }
}
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false

}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = userRole.value.length === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}
// 提交分配结果
const updateRole = async () => {
  let params = {
    userId: userParams.id,
    roleIdList: userRole.value.map((item: any) => item.id)
  }
  let result = await reqUpdateUserRole(params)
  if (result.code == 200) {
    ElMessage.success('分配成功')
    getUserList(currentPage.value)
    drawer2.value = false
  } else {
    ElMessage.error(result.data)
  }
}

// 删除一个用户
const removeUser = async (row: any) => {
  ElMessageBox.confirm(
    `确认删除“${row.username}”吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let result = await reqRemoveUser(row.id)
      if (result.code == 200) {
        ElMessage.success('删除成功')
        getUserList(userArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
      } else {
        ElMessage.error(result.data)
      }
    })
}

// 删除多个用户
const selection = (val: any) => {
  selectionArr.value = val
}
const batchRemove = async () => {
  ElMessageBox.confirm(
    `确认删除“${selectionArr.value.map(item => item.username).join('"、"').toString()}”吗?`,
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      let idList = selectionArr.value.map((item: any) => item.id)
      let result = await reqBatchRemoveUser(idList)
      if (result.code == 200) {
        ElMessage.success('删除成功')
        selectionArr.value = []
        getUserList(userArr.value.length > 1 ? currentPage.value : currentPage.value - 1)
      } else {
        ElMessage.error(result.data)
      }
    })
}

// 搜索用户
const search = async () => {
  getUserList()
  keyWord.value = ''
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