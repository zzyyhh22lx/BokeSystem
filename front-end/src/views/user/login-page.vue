<template>
  <div class="oe-perf-login">
    <div class="left-content">
      <h3 class="logo-title">openEuler</h3>
    </div>
    <div class="right-content">
      <div class="login-container">
        <el-tabs v-model="loginType" class="demo-tabs">
          <el-tab-pane label="帐号密码登录" name="username">
            <el-form :model="loginForm" class="username-login-form">
              <el-form-item label="帐号">
                <el-input v-model="loginForm.username" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="loginForm.password" show-password/>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" type="primary" @click="loginRequest">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="tel">
            <!--待确认是否支持-->
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

const userInfoStore = useUserInfo()
const router = useRouter()

const loginType = ref('username')

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRequest = () => {
  userInfoStore.userLogin(loginForm.username, loginForm.password)
    .then(() => {
      ElMessage.success('登陆成功')
      router.push('/index')
    }).catch((err) => {
      ElMessage.error(err.message)
    })
}
</script>
  
<style lang="scss" scoped>
  .oe-perf-login {
    width: 100%;
    height: 100%;
    display: flex;
    .left-content {
      width: 50%;
      height: 100%;
      background: url('@/assets/login-bg.png') no-repeat;
      background-size: 100% auto;
      background-position: center;
      background-color: #cbd8ed;
      .logo-title {
        position: absolute;
        left: 2%;
        top: 2%;
        font-size: 50px;
        font-weight: 900;
        color: var(--oe-perf-color-primary);
      }
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
      .username-login-form {
        margin-top:20px;
      }
      .login-btn {
        margin-top: 30px;
        width: 100%;
      }
    }
  }
</style>