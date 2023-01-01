<template>
  <el-card shadow="always">
    <el-row :gutter="20">
      <span class="promit-font-style">查询条件:</span>
      <el-col :span="12">
        <el-input
          v-model="value"
          placeholder="搜索"
          class="input-with-select"
          :suffix-icon="Search"
          size="large"
          @input="inputValue"
        >
          <template #prepend>
            <el-select
              v-if="JSON.stringify(tableData.data) !== '{}'"
              v-model="select"
              placeholder="专栏id"
              style="width: 115px" size="large"
              @change="changeSelect"  
            >
              <el-option
                v-for="item in tableData.data"
                :key="item.a_id"
                :label="item.a_id"
                :value="item.a_id"
              />
            </el-select>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <application-table
      :tableData="propsData.data"
      @pushView="intoView"
      @deleteApp="deleteApp"
    ></application-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue'
import { getallapprovals, getmyapprovals, deleteapproval } from '@/api/center'
import { Search } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import  ApplicationTable  from '../components/application-table.vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const hashData = new Map()

const select = ref('')
const value = ref('')

const data:any = []
const tableData = reactive({
  data
})
const propsData = reactive({
  data
})

function inputValue() {
  let v = value.value
  select.value = ''
  if(v) {
    propsData.data = []
    for (let [key, val] of hashData) {
      if(key.indexOf(v) !== -1) {
        propsData.data.push(tableData.data[val])
      }
    }
  } else propsData.data = tableData.data
}
function changeSelect() {
  propsData.data = [tableData.data[hashData.get(select.value)]]
}

function intoView(query:any) {
  let path = '/userCenter/application/applicationProgress'
  if(route.meta.title === 'approveList')
    path = '/userCenter/approval/approvalprogress'
  router.push({
    path,
    query
  })
}

async function deleteApp(query:any) {
  try {
    const value = (await deleteapproval(query.a_id, query.title)).data
    if(value.code !== 200) return ElMessage.error(value.data.msg)
    ElMessage({
      message: value.data.msg,
      type: 'success',
    })
    window.location.reload()
  } catch (e) {
    return ElMessage.error('服务端出现致命的错误~')
  }
}

onMounted(() => {
  if(route.meta.title === 'approveList')
    getallapprovals()
      .then((data) => {
        const d = data.data
        if(d.code !== 200) {
          return ElMessage({
            message: d.data.msg,
            type: 'warning',
          })
        }
        tableData.data = d.data.data
        propsData.data = d.data.data
        tableData.data.forEach((item:any, index:any) => {
          hashData.set(item.a_id, index)
        })
      })
  else
    getmyapprovals()
      .then((data) => {
        const d = data.data
        if(d.code !== 200) {
          return ElMessage({
            message: d.data.msg,
            type: 'warning',
          })
        }
        tableData.data = d.data.data
        propsData.data = d.data.data
        tableData.data.forEach((item:any, index:any) => {
          hashData.set(item.a_id, index)
        })
      })
})
</script>

<style scoped lang="scss">
.input-with-select ::v-deep .el-input-group__prepend {
  background-color: var(--hy-boke-bg-section)!important;
}
.promit-font-style {
  display: flex;
  align-items: center;
}
.right-btn {
  display: block;
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
}
.btn-a-margin {
  margin-left: 16px;
}
a {
  color: #002FA7;
  cursor: pointer;
}
a:active {
  color: var(--hy-boke-color-secondary);
}
.el-drawer-header {
  display: block;
  padding: 12px 17px;
  color: #333333;
  font-size: 20px;
  width: 100%;
  border-bottom: 2px solid #E2E2E2;
}
.el-drawer-form {
  margin-top: 0;
  padding: calc(30px - var(--el-drawer-padding-primary)) 35px;
}
.upload-btn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  line-height: 22px;
  border-radius: 4px 4px 4px 4px;
  border: 1px solid rgba(0,0,0,0.15);
  font-size: 16px;
}
.upload-txt {
  font-size: 14px !important;
}
</style>
<style>
.my-el-cascader {
  width: 100%!important;
}
.el-drawer__header {
  margin-bottom: 0px;
}
</style>
