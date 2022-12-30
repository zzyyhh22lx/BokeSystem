<template>
  <div class="oe-perf-login">
    <div class="left-content">
      <div class="logo-title typing">Boke System <br/>一个博客管理系统</div>
    </div>
    <div class="right-content">
      <div class="login-container">
        <el-tabs v-model="loginType" class="demo-tabs">
          <el-tab-pane label="邮箱密码登录" name="login">
            <el-form :model="loginForm" class="user-login-form">
              <el-form-item label="邮箱">
                <el-input v-model="loginForm.email" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="loginForm.password" show-password/>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" type="primary" @click="loginRequest">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="邮箱注册" name="register">
            <el-form :model="registerForm" class="user-login-form">
              <el-form-item label="邮箱">
                <el-input v-model="registerForm.email" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="registerForm.password" show-password/>
              </el-form-item>
              <el-form-item label="验证">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-input v-model="registerForm.captcha"/>
                  </el-col>
                  <el-col :span="12">
                    <el-button class="login-btn" type="info" @click="getCaptcha">获取验证码</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" type="primary" @click="registerRequest">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div> 
  </div>
</template>
  
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { useUserInfo } from '@/stores/userInfo'
import { throttle } from '@/utils/tools/index'
import { userRegister, userGetCapcha } from '@/api/user/index'

const userInfoStore = useUserInfo()
const router = useRouter()

const loginType = ref('login')

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  email: '',
  password: '',
  captcha: ''
})

const throttle_login = throttle(() => {
  userInfoStore.userLogin(loginForm.email, loginForm.password)
    .then(() => {
      ElMessage.success('登陆成功')
      router.push('/index')
    }).catch((err) => {
      ElMessage.error(err)
    })
}, 2000)

const loginRequest = () => {
  throttle_login()
}

const throttle_getCapcha = throttle(() => {
  userGetCapcha(registerForm.email)
    .then(() => {
      ElMessage.success('获取验证码成功')
    }).catch((err) => {
      ElMessage.error(err)
    })
}, 2000)
const getCaptcha = () => { // 获取验证码
  throttle_getCapcha()
}

const throttle_register = throttle(() => {
  userRegister(registerForm.email, registerForm.password, registerForm.captcha)
    .then((result) => {
      const { data } = result
      if(data.code !== 200) return ElMessage.error(data.data.msg)
      userInfoStore.userLogin(registerForm.email, registerForm.password)
        .then(() => {
          ElMessage.success('注册成功')
          router.push('/index')
        }).catch((err) => {
          ElMessage.error(err)
        })
    }).catch((err) => {
      ElMessage.error(err)
    })
}, 2000)
const registerRequest = () => { // 注册
  throttle_register()
}
</script>
  
<style lang="scss" scoped>
  .oe-perf-login {
    width: 100%;
    height: 100%;
    display: flex;
    .overall-header-left {
        align-self: center;
        justify-self: center;
        color: var(--hy-boke-font-color);
      }
      .logo-title {
        width: 100%;
        margin-top: 25%;
        text-align: center;
        font-size: 50px;
        font-weight: 900;
        color: var(--hy-boke-font-color);
      }
    .left-content {
      width: 50%;
      height: 100%;
      background: url('@/assets/login-bg2.png') no-repeat;
      background-size: cover;
      background-position: center;
      background-color: #cbd8ed;
    }
    .right-content {
      width: 50%;
      height: 100%;
      position: relative;
    }
    .login-container {
      position: absolute;
      width: 300px;
      top: 30vh;
      left: 50%;
      margin-left: -150px;
      :deep(.el-tabs__header) {
        padding-left: 40px;
      }
      :deep(.el-tabs__nav-wrap:after) {
        display: none;
      }
      .user-login-form {
        margin-top:20px;
      }
      .login-btn {
        margin-top: 30px;
        width: 100%;
      }
    }
  }
</style>