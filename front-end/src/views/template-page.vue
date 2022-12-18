<template>
  <div class="oe-perf-section">
    <v-md-editor :model-value="markdown" mode="preview"></v-md-editor>
  </div>
  <div class="oe-perf-section">
    <v-md-editor :model-value="markdown"></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const markdown = ref('```你好 ```')
onMounted(() => {
  console.log(router)
})
</script>

<style>
</style>
