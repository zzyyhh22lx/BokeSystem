<template>
    <div class="oe-perf-section">
      <h1>文章标题：{{ route.query.title }}</h1>
      <v-md-editor :model-value="markdown" mode="preview"></v-md-editor>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
  
const router = useRouter()
const route = useRoute()

const markdown = ref(route.query.content)
onMounted(() => {
  console.log(router, route)
})
</script>
  
<style scoped>
h1 {
  margin-bottom: 20px;
}
</style>