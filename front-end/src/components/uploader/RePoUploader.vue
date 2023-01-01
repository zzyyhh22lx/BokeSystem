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
          <el-form-item label="分类标准：">
            <el-cascader
            class="my-el-cascader"
            v-model="form.region" placeholder="请选择分类" :options="options" :disabled="disabled"/>
          </el-form-item>
          <el-form-item label="上传文件：">
            <slot></slot>
          </el-form-item>
          <el-form-item :label="t">
            <el-input
            v-model="form.title"
            maxlength="100"
            placeholder="请输入文章标题"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>   
        <span class="dialog-footer">
          <el-button @click="cancel()">取消</el-button>
          <el-button type="primary" @click="upload">
            {{ btnText }}
          </el-button>
        </span>
      </template>
    </el-drawer>
</template>
<script lang="ts" setup>
import { ref,reactive, defineEmits, toRefs, watchEffect } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits<{
  (e:'cancel'):void,
  (e:'upload', title:any):void,
  (e:'handleClose'):void
}>()
const props = withDefaults(defineProps<{
  bool: any,
  region: any,
  options: Array<any>,
  title: string,
  t: string,
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
  t: '申请描述：',
  btnText: '新建',
  disabled: false
})
const { bool, title, t, options, region, btnText, disabled } = toRefs(props)
const centerDialogVisible = ref(false)

const form = reactive({
  region: '',
  title: ''
})
watchEffect(()=>{
  centerDialogVisible.value = bool.value
  form.region = region
})

const cancel = () => {
  emit('cancel')
}

const handleClose = () => {
  emit('handleClose')
}
const upload = () => {
  if(!form.title) return ElMessage.error('请输入必要信息')
  emit('upload', form.title)
}
</script>
<style scoped lang="scss">
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
</style>
<style>
.my-el-cascader {
  width: 100%!important;
}
.el-drawer__header {
  margin-bottom: 0px;
}
</style>