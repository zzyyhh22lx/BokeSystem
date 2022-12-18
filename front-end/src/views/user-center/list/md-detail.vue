<template>
    <el-card shadow="always">
        <h1>{{ route.query.txt }}: </h1>
        <div class="file_layout">
            <div class="file_one" v-for="item in file_list.list" :key="item.name">
                <div><img src="@/assets/svg/markdown.svg" alt="md文件"></div>
                <el-popconfirm
                    title="你要永久删除该文件吗?"
                    @confirm="deleteFile(item.id)"
                >
                    <template #reference>
                    <el-icon class="file_icon_close"><CloseBold /></el-icon>
                    </template>
                </el-popconfirm>
                <div>
                    <el-popover
                        v-if="item.name.length > 5"
                        placement="bottom"
                        trigger="hover"
                        effect="dark"
                        :content="item.name"
                    >
                        <template #reference>
                            <span class="span_txt">{{ cropText(item.name, 5) }}</span>
                        </template>
                    </el-popover>
                    <span class="span_txt" v-else>{{ cropText(item.name, 5) }}</span>
                </div>
            </div>
            <div class="file_one" @click="dialogVisible = true">
                <div class="no_visibility">
                    <div><img src="@/assets/svg/markdown.svg" alt="文件"></div>
                    <div>
                        <span class="span_txt"></span>
                    </div>
                </div>
                <el-icon class="file_icon_add"><Plus /></el-icon>
            </div>
            <div class="file_one no_visibility" v-for="item in file_occupate_list" :key="item">
                <div><img src="@/assets/svg/markdown.svg" alt="文件"></div>
                <div>
                    <span class="span_txt">占位文件</span>
                </div>
            </div>
        </div>
    </el-card>
    <re-po-uploader
    title="新建申请"
    description="上传描述："
    btnText="新建"
    :bool="dialogVisible"
    @cancel="dialogVisible = false"
    @handleClose="dialogVisible = false"
    @upload="upload"
    ></re-po-uploader>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { TitleMes } from './interface'
import { cropText } from '@/utils/tools/index'
import RePoUploader from '@/components/uploader/RePoUploader.vue'

const route = useRoute()

const dialogVisible = ref<boolean>(false)

const list = ref<TitleMes[]>([])
const file_list = reactive({
  list
})
const file_occupate_list = [1,2,3,4,5,6,7] // 占位文件夹数量

const hashMap = new Map()

// 删除文件夹
function deleteFile(id:number):void {
  hashMap.delete(file_list.list[id].name)
  file_list.list.splice(id, 1)

  ElMessage({
    message: '删除成功',
    type: 'success',
  })

  for(let i = id; i <= file_list.list.length; i++) {
    file_list.list[i].id--
  }
}

function upload() {

}
</script>

<style scoped lang="scss">
.file_layout {
    display: flex;
    flex-direction: flex-start;
    justify-content: space-around;
    flex-wrap: wrap; // 换行
}
.file_one {
    box-sizing: border-box;
    position: relative;
    display: block;
    margin: var(--oe-perf-font-size-caption);
    padding: var(--oe-perf-font-size-caption);
    width: calc(100px + var(--oe-perf-font-size-caption) * 2);
    overflow: hidden;
    .file_icon_close {
        position: absolute;
        display: none;
        top: 0;
        right: 0;
        cursor: pointer;
    }
    .span_txt {
        display: block;
        text-align: center;
        word-break:break-all
    }
    .file_name_input {
        all: unset;
        width: 80%;
        margin-left: 10%;
    }
    .file_icon_add {
        position: absolute;
        font-size: 60px;
        left:0; right:0; top:0; bottom:0; // 让absolute内容居中
        margin:auto;
    }
}
.file_one:hover {
    background-color: #e3e2e2;
}
.file_one:hover .file_icon_close{
   display: block;
}
.no_visibility {
    visibility: hidden;
}
// 设置最后一项
// .file_one:last-child {
//     margin-right: auto;
// }
</style>
