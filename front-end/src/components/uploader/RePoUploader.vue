<template>
    <el-drawer
    v-model="centerDialogVisible"
    direction="rtl"
    size="50%"
    :before-close="handleClose"
    >
      <template #header>
        <span class="el-drawer-header">{{ title }}</span>
      </template>
      <div class="el-drawer-form">
        <el-form :model="form">
          <el-form-item label="测试场景：">
            <el-cascader
            class="my-el-cascader"
            v-model="form.region" placeholder="请选择测试场景" :options="options" :disabled="disabled"/>
          </el-form-item>
          <el-form-item label="上传文件：">
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              multiple
              accept=".xlsx"
              :limit="1"
              :http-request="handleUpload"
            >
              <div class="upload-btn">
                <el-icon size="16"><Upload /></el-icon>
                <span class="upload-txt">上传文件</span>
              </div>
              <template #tip>
              <span class="btn-a-margin"><a @click.stop="download">下载模板</a></span>
                <div class="el-upload__tip">
                  支持扩展名：.xlsx...
                </div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item :label="description">
            <el-input
            v-model="form.description"
            type="textarea"
            maxlength="100"
            placeholder="（可选）请输入描述，不超过100个字符"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>   
        <span class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="upload(data)">
            {{ btnText }}
          </el-button>
        </span>
      </template>
    </el-drawer>
</template>
<script lang="ts" setup>
import { ref,reactive, defineEmits, toRefs, watchEffect } from 'vue'
import { UploadUserFile, ElMessage } from 'element-plus'

const emit = defineEmits<{
  (e:'cancel'):void,
  (e:'upload'):void,
  (e:'handleClose'):void
}>()
const props = withDefaults(defineProps<{
  bool,
  region,
  options: Array,
  title: string,
  description: string,
  btnText: string,
  disabled: boolean // 选择器是否可选
}>(),
{
  bool: ref(false),
  region: reactive([]),
  options: () => [
    {
      value: '大数据',
      label: '大数据',
      children: [
        {
          value: 'spark',
          label: 'spark'
        }
      ],
    }
  ],
  title: '新建申请',
  description: '申请描述：',
  btnText: '新建',
  disabled: false
})
const { bool, title, description, options, region, btnText, disabled } = toRefs(props)
const centerDialogVisible = ref(false)
const fileNameBool = ref(false)
const form = reactive({
  region: ''
})
watchEffect(()=>{
  centerDialogVisible.value = bool.value
  form.region = region
})

const cancel:void = () => {
  emit('cancel')
}

const upload:void = () => {
  if(fileNameBool.value)
    emit('upload', data)
  else ElMessage.error('请上传 .xlsx 的文件')
}

const handleClose:void = () => {
  emit('handleClose')
}

const fileList = ref<UploadUserFile[]>([])

const data = reactive({
  data: {}
})

const handleUpload = (uploadFiles) => {
  const fileReader = new FileReader()
  fileReader.readAsText(uploadFiles.file)
  if(uploadFiles.file.name.split('.').pop() === 'xlsx') {
    fileNameBool.value = true
    fileReader.onload = function() {
      data.data = {}
      let content = this.result.toString().split('\r\n').filter(item => item !== '').map(item => item.split('\t'));
      for(let i = 0; i < content[0].length; i++) {
        content[1] = content[1]?content[1]:[]
        try {
          let dt = content[1][i].replace(/""/g, '"')
          if(content[1][i][0] === '"') data.data[content[0][i]] = JSON.parse(dt.slice(1,-1))
          else data.data[content[0][i]] = JSON.parse(dt)
        } catch (e) {
          data.data[content[0][i]] = content[1][i]
        }
      }
    }
  }
}
function download() {
  // values可以从后端获取数据
  let values = ['aaa','bbb','ccc','ddd','eee']
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = ''
  // 增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < values.length; i++) {
    str += `${values[i]},`
  }
  // 一个回车（'\n'）表示一行数据
  str += '\n'
  // encodeURIComponent解决中文乱码
  let url = `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(str)}`
  // 通过创建a标签实现
  let link = document.createElement('a')
  link.href = url
  // 对下载的文件命名
  link.download = 'template.xlsx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>
<style scoped lang="scss">
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