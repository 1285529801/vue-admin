<template>
  <div class="login_wrapper">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12">
        <el-form class="login_form" :model="loginData" :rules="rules" ref="loginForm">
          <el-form-item prop="title">
            <p class="login_title">欢迎来到硅谷甄选平台</p>
          </el-form-item>
          <el-form-item prop="username">
            <el-input class="login_input" :prefix-icon="User" v-model="loginData.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" class="login_input" :prefix-icon="Lock" show-password clearable
              v-model="loginData.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_button" @click="user_login" :loading="isLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang='ts'>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import useUserStore from '@/store/module/user'
import { getTime } from '@/utils/time'

//#region 表单校验
const loginForm = ref()
// 账号自定义校验
const checkUserName = (_rule: any, value: any, callback: any) => {
  if (value.length < 5 || value.length > 10) {
    callback(new Error('账号长度应为6~10位'))
  }
  else if (value === '') {
    callback(new Error('账号不能为空'))
  }
  else {
    callback()
  }
}
// 密码自定义校验
const checkPassWord = (_rule: any, value: string, callback: any) => {
  if (value.length < 6 || value.length > 15) {
    callback(new Error('密码长度应为6~15位'))
  }
  else if (value === '') {
    callback(new Error('密码不能为空'))
  }
  else {
    callback()
  }
}
const rules = reactive({
  username: [
    { validator: checkUserName, trigger: 'change' }
  ],
  password: [
    { validator: checkPassWord, trigger: 'change' }
  ]
})
//#endregion 

//#region 登录业务
const userStore = useUserStore();
const loginData = reactive({
  username: 'admin',
  password: 'atguigu123'
})
// 获取路由
const $router = useRouter()
// 登录按钮转圈
const isLogin = ref(false)

// 登录方法
const user_login = async () => {
  // 等待所有表单校验通过后，才能发送请求
  await loginForm.value.validate()
  isLogin.value = true
  try {
    // 等待成功之后
    await userStore.userLogin(loginData)
    // 跳转到首页
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '登录成功',
      title: `Hi! ${getTime()}好`
    })
    isLogin.value = false
  } catch (error) {
    isLogin.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}
//#endregion


</script>

<style lang='scss' scoped>
.login_wrapper {
  width: 100%;
  height: 100vh;
  background-size: cover;
  background: url('@/assets/images/background.jpg') no-repeat;
  position: fixed;

  .login_form {
    width: 450px;
    height: 350px;
    background-color: rgba($color: #62abff, $alpha: 0.1);
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 25vh;
    left: 60vw;

    .login_title {
      font-size: 35px;
      font-weight: 700;
      color: transparent;
      background: linear-gradient(to right, blue, rgb(35, 60, 70));
      background-clip: text;
      -webkit-background-clip: text;
    }

    .login_input {
      width: 350px;
      height: 40px;
    }

    .login_button {
      width: 350px;
      height: 35px;
      ;
    }
  }
}
</style>