<template>
   <el-table
       ref="multipleTableRef"
       :data="state.data"
       style="width: 100%; margin-top: var(--hy-boke-padding);"
       @selection-change="handleSelectionChange"
     >
       <el-table-column prop="a_id" label="专栏id">
         <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button link type="primary">{{ scope.row.a_id }}</el-button>
          </div>
        </template>
       </el-table-column>
       <el-table-column prop="title" label="文章题目" />
       <el-table-column prop="username" label="提交人" />
       <el-table-column prop="createAt" sortable label="提交日期" show-overflow-tooltip />
       <el-table-column prop="content" label="文章内容">
       <template #default="scope">
          {{ cropText(scope.row.content, 6) }}
        </template>
       </el-table-column>
       <el-table-column prop="status" label="审批状态" >
         <template #default="scope">
          <div style="display: flex; align-items: center">
            <span class="is-dot" :style="{'background': judgeProgressColor(scope.row.status)}"></span>
            <span style="margin-left: 5px">{{ scope.row.status }}</span>
          </div>
        </template>
       </el-table-column>
       <el-table-column prop="detail" label="操作" fixed="right">
         <template #default="scope">
           <el-button link type="primary" @click="pushView(scope.row)">查看</el-button>
           <el-button link type="primary" @click="deleteApp(scope.row)">删除</el-button>
        </template>
       </el-table-column>
     </el-table>
</template>
<script lang="ts" setup>
import { ref, reactive, defineEmits, toRefs, watchEffect } from 'vue'
import { ElTable } from 'element-plus'
import { User } from './interface'
import { cropText } from '@/utils/tools'

const emit = defineEmits<{
  (e:'pushView', obj:any):void // 设置自定义函数名称，参数类型与返回值类型
  // 可在此设置第二个自定义函数
  (e:'deleteApp', obj:any):void
}>()
const props = withDefaults(defineProps<{
  tableData: Object
}>(),
{
  tableData: ()=>{}
})
const { tableData } = toRefs(props)
const state = reactive({
  data: {}
})
watchEffect(()=>{
  state.data = tableData
})
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

function judgeProgressColor(type: string) {
  let progressColor:any = {
    // '未提交': () => { return '#C9C9C9' },
    '待审批': () => { return '#002FA7' },
    '已发布': () => { return '#43BB57' },
    '已驳回': () => { return '#F95858' },
    'default': () => { return '#C9C9C9' }
  }
  return (progressColor[type] || progressColor['default'])()
}

function pushView(obj:any) {
  emit('pushView', obj)
}
function deleteApp(obj:any) {
  emit('deleteApp', obj)
}
</script>
<style lang="scss" scoped>
.is-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>