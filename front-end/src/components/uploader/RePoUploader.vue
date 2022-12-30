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
          <el-form-item label="分类：">
            <el-cascader
            class="my-el-cascader"
            v-model="form.region" placeholder="请选择分类" :options="options" :disabled="disabled"/>
          </el-form-item>
          <el-form-item label="上传文件：">
            <el-upload
              v-model:file-list="fileList"
              class="upload-demo"
              multiple
              accept=".md"
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
                  支持扩展名：.md...
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
  bool: any,
  region: any,
  options: Array<any>,
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
      value: '前端',
      label: '前端'
    },{
      value: '后端',
      label: '后端'
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

const data = ref<any>('') // 存放解析的数据

const form = reactive({
  region: ''
})
watchEffect(()=>{
  centerDialogVisible.value = bool.value
  form.region = region
})

const cancel = () => {
  emit('cancel')
}

const upload = () => {
  if(fileNameBool.value)
    emit('upload', data)
  else ElMessage.error('请上传 .md 的文件')
}

const handleClose = () => {
  emit('handleClose')
}

const fileList = ref<UploadUserFile[]>([])

// 解析上传的md文件
const handleUpload = (uploadFiles: any) => {
  const fileReader = new FileReader()
  fileReader.readAsText(uploadFiles.file)
  if(uploadFiles.file.name.split('.').pop() === 'md') {
    fileNameBool.value = true
    fileReader.onload = function() {
      data.value = this.result
    }
  }
}
function download() {
  // str可以从后端获取数据
  let str = '# 这是一个md文件'
  // encodeURIComponent解决中文乱码
  let url = `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(str)}`
  // 通过创建a标签实现
  let link = document.createElement('a')
  link.href = url
  // 对下载的文件命名
  link.download = 'template.md'
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