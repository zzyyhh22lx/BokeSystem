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
      <div class="header-right"></div>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <el-menu>
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
