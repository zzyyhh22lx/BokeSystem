<template>
  <el-container>
    <el-header class="basic-layout-header">
      <div class="header-left">
        <h5 class="logo">openEuler</h5>
        <div class="header-nav">
          <div class="nav-item active">性能基线</div>
          <div class="nav-item">性能测试</div>
          <div class="nav-item">提交测试</div>
        </div>
      </div>
      <div class="header-right">
        {{userInfoStore.userInfo.username}}
        <el-popconfirm title="登出系统？" @confirm="userLogout">
          <template #reference>
            <el-icon class="logout-btn"><SwitchButton /></el-icon>
          </template>
        </el-popconfirm>
      </div>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <el-menu router>
          <el-sub-menu index="1">
            <template #title>
              <span>解决方案性能基线</span>
            </template>
            <el-menu-item index="1-1">大数据</el-menu-item>
            <el-menu-item index="1-2">数据库</el-menu-item>
            <el-menu-item index="1-3">分布式存储</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <span>基础性能基线</span>
            </template>
            <el-menu-item index="2-1">CPU</el-menu-item>
            <el-menu-item index="2-2">内存</el-menu-item>
            <el-menu-item index="2-3">存储</el-menu-item>
            <el-menu-item index="2-4">网络</el-menu-item>
            <el-menu-item index="2-5">基础库</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>我的申请</span>
            </template>
            <el-menu-item index="/userCenter/application/applicationList">所有申请</el-menu-item>
            <el-menu-item index="3-2">新建申请</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <template #title>
              <span>我的审批</span>
            </template>
            <el-menu-item index="/userCenter/approval/approveList">所有审批</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="breadcrumb-nav">面包屑/导航</div>
        <div class="basic-layout-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserInfo } from '@/stores/userInfo'
import { ElMessage } from 'element-plus';

const router = useRouter()
const userInfoStore = useUserInfo()

const userLogout = () => {
  userInfoStore.userLogout().then(() => {
    router.push('/user/login')
  }).catch(err => {
    ElMessage.error(err.message)
  })
}

</script>
<style scoped lang="scss">
  $header-height: 56px;
  $breadcrumb-nav-height: 32px;
  .basic-layout-header {
    display: flex;
    height: $header-height;
    line-height: $header-height;
    background: var(--oe-perf-color-primary);
    color: var(--oe-perf-font-color);
    justify-content: space-between;
    .header-left {
      display: flex;
      .logo {
        width: 250px;
        font-size: 24px;
        padding-left: 50px;
      }
    }
    .header-nav {
      display: flex;
      align-items: center;
      padding-left: var(--oe-perf-padding);
      .nav-item {
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &.active {
          border-bottom: 2px solid var(--oe-perf-font-color);
        }
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      .logout-btn {
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
  .breadcrumb-nav {
    height: $breadcrumb-nav-height;
    line-height: $breadcrumb-nav-height;
    padding-left: var(--oe-perf-padding);
  }
  .el-main {
    padding: 0;
  }
  .basic-layout-content {
    height: calc(100vh - $header-height - $breadcrumb-nav-height);
    background: var(--oe-perf-bg-layout);
    padding: var(--oe-perf-padding);
  }
</style>
