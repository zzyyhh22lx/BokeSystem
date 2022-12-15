<template>
  <div class="oe-perf-section">
    template1
  </div>
  <div class="oe-perf-section">
    <el-button @click="getDetailData">测试数据</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { getDetail } from '@/api/detail'

const router = useRouter()

onMounted(() => {
  console.log(router)
})

const getDetailData = () => {
  getDetail(10).then((res) => {
    console.log(res.data.results)
  })
}
</script>

<style>
</style>
