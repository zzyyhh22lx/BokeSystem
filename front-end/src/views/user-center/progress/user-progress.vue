<template>
  <el-card shadow="always">
    <h4>审批操作</h4>
    <p>申请单号：{{ data.data.a_id }}</p>
    <div class="time-line">
      <div
      class="item item-first"
      :class="{'item-index': indexNum === 1, 'item-accomplished': indexNum > 1}"
      >
        <el-row :gutter="20">
          <el-col :span="3">
            <span
            class="item-message"
            :class="{ 'item-bold-message': indexNum === 1}"
            >
              提交申请
            </span>
          </el-col>
          <el-col :span="3"><span class="item-message">{{ data.data.username }}</span></el-col>
          <el-col :span="6"><span class="item-message">{{ data.data.createAt }}</span></el-col>
          <el-col :span="12"><span class="item-message">文章标题：{{ data.data.title }}</span></el-col>
        </el-row>
      </div>
      <div
      class="item item-second"
      :class="{'item-index': indexNum === 2, 'item-accomplished': indexNum > 2}"
      >
        <el-row :gutter="20">
          <el-col :span="3">
            <span
            class="item-message item-margin"
            :class="{ 'item-bold-message': indexNum === 2 }"
            >
              审核中
            </span>
          </el-col>
          <el-col :span="3">
            <span class="item-message">lhy</span>
          </el-col>
          <el-col :span="6">
            <span class="item-message item-index-message">{{ data.data.status }}</span>
          </el-col>
          <el-col :span="12">
            <span class="item-message">审批意见：{{ data.data.status }}</span>
          </el-col>
        </el-row>
        <div v-if="indexNum === 2 && judgePath">
          <div class="item-hr">
            <el-icon size="16"><Document /></el-icon>
            <span class="item-txt">我的审核意见</span>
          </div>
            <el-form :model="form" label-width="120px">
              <el-form-item label="审核结果：">
                <el-radio-group v-model="form.opinion">
                  <el-radio label="yes" />
                  <el-radio label="no" />
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
        </div>
      </div>
      <div
      class="item item-third item-end"
      :class="{'item-accomplished': indexNum === 3}"
      >
        <el-row :gutter="20">
          <el-col :span="3">
            <span
            class="item-message"
            :class="{ 'item-bold-message': indexNum === 3 }"
            >
              审核完成
            </span>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { approve } from '@/api/center'
import { ElMessage } from 'element-plus'

const indexNum = ref(1)

const route = useRoute()
const router = useRouter()

const judgePath = ref(false)
const form = reactive({
  opinion: ''
})
const data = reactive({
  data:{
    a_id:1, // 属于哪个专栏
    username: '',
    title: '', // a_id确定则仅有唯一值
    content: '',
    status: '',
    createAt:''
  }
})
const onSubmit = async () => {
  try {
    const value = (await approve(data.data.a_id, data.data.title, form.opinion)).data
    if(value.code !== 200) return ElMessage.error(value.data.msg)
    ElMessage({
      message: value.data.msg,
      type: 'success',
    })
    router.push({
      path: '/userCenter/approval/approveList'
    })
  } catch (e) {
    return ElMessage.error('服务端出现致命的错误~')
  }
}

function judgeProgress(type: string) {
  let progress:any = {
    // '未提交': () => { return 1 },
    '待审批': () => { return 2 },
    'default': () => { return 3 }
  }
  return (progress[type] || progress['default'])()
}
onMounted(() => {
  if(route.meta.title === 'applicationProgress')
    judgePath.value = false
  else judgePath.value = true
  data.data = route.query
  indexNum.value = judgeProgress(data.data.status)
})
</script>

<style scoped lang="scss">
$margin-size: calc(var(--hy-boke-padding) + var(--hy-boke-approval-icon-size));
$margin-icon-line: 6px;
$pass-color: rgba(0,47,167,0.6);
$txt-color: #002FA7;
$bg-color: #002FA7;
$item-border-color: #C9C9C9;

h4 {
  font-size: var(--hy-boke-font-size-header);
  margin-bottom: 14px;
}
p {
  font-size: var(--hy-boke-font-size-body);
  margin-bottom: 25px;
}
.time-line {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.item {
  box-sizing: border-box;
  margin-left: $margin-size; /*用左边margin显示时间线*/
  width: calc(100% - $margin-size); /*因为左边部分用于显示时间线，所以右边部分减去30px*/
  height: auto; /*高度由内容决定*/
  position: relative;
  margin-bottom: var(--hy-boke-approval-icon-size);
}
.item::before {
  content: "";
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items:center;
  position: absolute;
  left: calc(0px - $margin-size);
  z-index: 1;
  overflow: hidden;

  width: var(--hy-boke-approval-icon-size);
  height: var(--hy-boke-approval-icon-size);
  font-size: 20px;
  color: $item-border-color;
  border: 2px solid $item-border-color;
  border-radius: 100%;
}
.item::after {
  content: "";
  position: absolute;
  top: calc(var(--hy-boke-approval-icon-size) + $margin-icon-line);
  left: calc(0px - var(--hy-boke-approval-icon-size) / 2 - var(--hy-boke-padding));
  z-index: 0;
  overflow: hidden;

  width: 2px;
  height: calc(100% - 2 * $margin-icon-line);
  border-radius: $margin-icon-line;
  background-color: $item-border-color;
}
.item-first::before {
  content: "1";
}
.item-second::before {
  content: "2";
}
.item-third::before {
  content: "3";
}
.item-accomplished::before {
  content: "";
  background: url("@/assets/svg/pass.svg") no-repeat center;
  border: 2px solid $pass-color;
  color: var(--hy-boke-color-secondary);
}
.item-accomplished::after {
  background-color: $pass-color;
}
.item-index::before {
  background-color: $bg-color;
  border: 0;
  color: var(--hy-boke-font-color);
}
.item-end::after {
  content: "";
  width: 0;
  height: 0;
}
.item-message {
  margin-top: 10px;
  color: var(--hy-boke-approval-normal-color);
  font-size: var(--hy-boke-font-size-body);
  float: left;
  text-align: left;
  margin-bottom: 14px;
}
.item-message::after {
  content: "";
  clear: both;
  height:0;
  line-height:0;
  display:block;
  visibility:hidden;
}
.item-bold-message {
  color: #333333;
  font-size: var(--hy-boke-font-size-body);
  font-weight: bold;
}
.item-margin {
  margin-bottom: 14px;
}
.item-index-message {
  color: $txt-color;
}
.item-hr {
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  padding: $margin-icon-line;
  border-left: 2px solid $item-border-color;
  color: $txt-color;
  font-size: var(--hy-boke-font-size-header);
}

</style>
<style lang="scss">
.item-hr .item-txt {
  font-size: var(--hy-boke-font-size-caption)!important;
}
</style>
