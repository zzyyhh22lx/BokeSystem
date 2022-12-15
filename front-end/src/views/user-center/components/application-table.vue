<template>
   <el-table
       ref="multipleTableRef"
       :data="state.data"
       :default-sort="{ prop: 'date', order: 'descending' }"
       style="width: 100%; margin-top: var(--oe-perf-padding);"
       @selection-change="handleSelectionChange"
     >
       <el-table-column prop="requestCode" label="申请单号">
         <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-button link type="primary">{{ scope.row.requestCode }}</el-button>
          </div>
        </template>
       </el-table-column>
       <el-table-column prop="type" label="申请类型" />
       <el-table-column prop="submitter" label="提交人" />
       <el-table-column prop="date" sortable label="提交日期" show-overflow-tooltip />
       <el-table-column prop="describe" label="描述" />
       <el-table-column prop="secretLevel" sortable label="密级" show-overflow-tooltip>
         <template #default="scope">
          <div style="display: flex; align-items: center">
            <span :style="{'color': judgeLevelColor(scope.row.secretLevel)}">{{ scope.row.secretLevel }}</span>
          </div>
        </template>
       </el-table-column>
       <el-table-column prop="approver" label="审批人" />
       <el-table-column prop="progress" label="审批状态" >
         <template #default="scope">
          <div style="display: flex; align-items: center">
            <span class="is-dot" :style="{'background': judgeProgressColor(scope.row.progress)}"></span>
            <span style="margin-left: 5px">{{ scope.row.progress }}</span>
          </div>
        </template>
       </el-table-column>
       <el-table-column prop="detail" label="操作" fixed="right">
         <template #default="scope">
           <el-button link type="primary" @click="pushView(scope.row)">查看</el-button>
           <el-button link type="primary">删除</el-button>
        </template>
       </el-table-column>
     </el-table>
</template>
<script lang="ts" setup>
import { ref, reactive, defineEmits, toRefs, watchEffect } from 'vue'
import { ElTable } from 'element-plus'
import { User } from './interface'
const emit = defineEmits<{
  (e:'pushView'):void // 设置自定义函数名称，参数类型与返回值类型
  // 可在此设置第二个自定义函数
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

function judgeLevelColor(type: string) {
  type = type.slice(2,-1)
  let levelColor = {
    '1': () => { return '#43BB57' },
    '2': () => { return '#FFD581' },
    '3': () => { return '#FFA634' },
    '4': () => { return '#F95858' },
    'default': () => { return '#333333'}
  }
  return (levelColor[type] || levelColor['default'])()
}

function judgeProgressColor(type: string) {
  let progressColor = {
    // '未提交': () => { return '#C9C9C9' },
    '待审批': () => { return '#002FA7' },
    '已发布': () => { return '#43BB57' },
    '已驳回': () => { return '#F95858' },
    'default': () => { return '#C9C9C9' }
  }
  return (progressColor[type] || progressColor['default'])()
}

function pushView(obj) {
  emit('pushView', obj)
}
</script>
<style lang="scss" scoped>
.is-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>