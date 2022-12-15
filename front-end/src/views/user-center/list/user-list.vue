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
              placeholder="申请单号"
              style="width: 115px" size="large"
              @change="changeSelect"  
            >
              <el-option
                v-for="item in tableData.data"
                :key="item.requestCode"
                :label="item.requestCode"
                :value="item.requestCode"
              />
            </el-select>
          </template>
        </el-input>
      </el-col>
      <span class="right-btn" v-if="route.meta.title === 'applicationList'">
        <el-button type="primary" size="large" @click="dialogVisible = true">新建申请</el-button>
      </span>
    </el-row>
    <re-po-uploader
    title="新建申请"
    description="上传描述："
    btnText="新建"
    :options="options"
    :bool="dialogVisible"
    @cancel="dialogVisible = false"
    @handleClose="dialogVisible = false"
    @upload="upload"
    ></re-po-uploader>
    <application-table
      :tableData="propsData.data"
      @pushView="intoView"
    ></application-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from 'vue'
import { getApplicationList } from '@/api/center/index.ts'
import { Search } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import  ApplicationTable  from '../components/application-table.vue'
import RePoUploader from '@/components/uploader/RePoUploader.vue'

const router = useRouter()
const route = useRoute()

const hashData = new Map()

const select = ref('')
const value = ref('')
const dialogVisible = ref(false)

const tableData = reactive({
  data: []
})
const propsData = reactive({
  data: []
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

function intoView(query) {
  let path = '/userCenter/application/applicationProgress'
  if(route.meta.title === 'approveList')
    path = '/userCenter/approval/approvalprogress'
  router.push({
    path,
    query
  })

}

function upload() {

}

onMounted(() => {
  getApplicationList()
    .then((data) => {
      tableData.data = data.data.data
      propsData.data = data.data.data
      tableData.data.forEach((item, index) => {
        hashData.set(item.requestCode, index)
      })
    })
})

const options = [
  {
    value: '解决方案',
    label: '解决方案',
    children: [
      {
        value: '解决方案',
        label: '解决方案'
      }
    ],
  },
  {
    value: '基础性能',
    label: '基础性能',
    children: [
      {
        value: 'CPU',
        label: 'CPU'
      },
      {
        value: '内存',
        label: '内存'
      },
      {
        value: '储存',
        label: '储存'
      },
      {
        value: '网络',
        label: '网路'
      }
    ],
  },
]
</script>

<style scoped lang="scss">
.input-with-select ::v-deep .el-input-group__prepend {
  background-color: var(--oe-perf-bg-section)!important;
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
  color: var(--oe-perf-color-secondary);
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
