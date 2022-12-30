<template>
  <el-container>
    <el-header class="basic-layout-header">
      <div class="header-left">
        <h5 class="logo">Boke System</h5>
        <!-- <div class="header-nav">
          <div class="nav-item active">性能基线</div>
          <div class="nav-item">性能测试</div>
          <div class="nav-item">提交测试</div>
        </div> -->
      </div>
      <div class="header-right">
        <!-- 解码 -->
        {{ decodeURIComponent(getCookie('user_name')) }}
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
              <span>主页</span>
            </template>
            <el-menu-item index="1-1">大数据</el-menu-item>
            <el-menu-item index="1-2">数据库</el-menu-item>
            <el-menu-item index="1-3">分布式存储</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2" v-for="item in users" :key="item">
            <template #title>
              <span>成员</span>
            </template>
            <el-menu-item index="2-1">{{ item }}</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <span>我的</span>
            </template>
            <el-menu-item index="/userCenter/index">我的主页</el-menu-item>
            <el-menu-item index="/userCenter/application/applicationList">我的申请</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="4">
            <!-- 只有管理员才会显示 -->
            <template #title>
              <span>审批</span>
            </template>
            <el-menu-item index="/userCenter/approval/approveList">所有审批</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="5">
            <template #title>
              <span>面经</span>
            </template>
            <el-menu-item index="5-1">前端</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- <div class="breadcrumb-nav">面包屑/导航</div> -->
        <div class="basic-layout-content">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, reactive } from 'vue';
import { useUserInfo } from '@/stores/userInfo'
import { ElMessage } from 'element-plus';
import { getCookie } from '@/utils/tools/index'
import { getUsers } from '@/api/center/index'

const router = useRouter()
const userInfoStore = useUserInfo()

const userLogout = () => {
  userInfoStore.userLogout().then(() => {
    router.push('/user/login')
  }).catch(err => {
    ElMessage.error(err.message)
  })
}

const users = reactive([] as any[]); // 断言类型处理

onMounted(async () => {
  try {
    const result = await getUsers()
    console.log(result)
    const { data } = result.data
    data.result.forEach((user:string) => {
      if(getCookie('user_name') !== user) // 排除自己
        users.push(user)
    })
  } catch (e) {
    console.error(e)
  }
})
</script>
<style scoped lang="scss">
  $header-height: 56px;
  $breadcrumb-nav-height: 32px;
  .basic-layout-header {
    display: flex;
    height: $header-height;
    line-height: $header-height;
    background: var(--hy-boke-header-color);
    color: var(--hy-boke-font-color);
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
      padding-left: var(--hy-boke-padding);
      .nav-item {
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &.active {
          border-bottom: 2px solid var(--hy-boke-font-color);
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
    padding-left: var(--hy-boke-padding);
  }
  .el-main {
    padding: 0;
  }
  .basic-layout-content {
    height: calc(100vh - $header-height - $breadcrumb-nav-height);
    background: var(--hy-boke-bg-layout);
    padding: var(--hy-boke-padding);
  }
</style>
