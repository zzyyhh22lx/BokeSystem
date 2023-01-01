<template>
    <el-card shadow="always">
        <div class="title">
          <h1>我的专栏：</h1>
          <a @click="dialogVisible = true">解析文件夹</a>
        </div>
        <div class="file_layout">
            <div class="file_one" v-for="item in file_list.list" :key="item.txt" @dblclick="pushView(item)">
                <div><img src="@/assets/svg/file.svg" alt="文件夹"></div>
                <el-popconfirm
                    title="你要永久删除该文件夹吗?"
                    @confirm="deleteFile(item.id)"
                >
                    <template #reference>
                    <el-icon class="file_icon_close"><CloseBold /></el-icon>
                    </template>
                </el-popconfirm>
                <div>
                    <el-popover
                        v-if="item.txt.length > 5"
                        placement="bottom"
                        trigger="hover"
                        effect="dark"
                        :content="item.txt"
                    >
                        <template #reference>
                            <span class="span_txt" v-show="item.txt">{{ cropText(item.txt, 5) }}</span>
                        </template>
                    </el-popover>
                    <span class="span_txt" v-else v-show="item.txt">{{ cropText(item.txt, 5) }}</span>
                    <input
                        class="file_name_input"
                        ref="inputRef"
                        v-model="item.rename"
                        @blur="verify"
                        @keyup.enter="keyup_enter"
                        :id="item.id.toString()"
                        v-show="!item.txt"
                    />
                </div>
            </div>
            <div class="file_one" @click="addFile()">
                <div class="no_visibility">
                    <div><img src="@/assets/svg/file.svg" alt="文件夹"></div>
                    <div>
                        <span class="span_txt"></span>
                    </div>
                </div>
                <el-icon class="file_icon_add"><Plus /></el-icon>
            </div>
            <div class="file_one no_visibility" v-for="item in file_occupate_list" :key="item">
                <div><img src="@/assets/svg/file.svg" alt="文件夹"></div>
                <div>
                    <span class="span_txt">占位文件夹</span>
                </div>
            </div>
        </div>
        <re-po-uploader
        title="新建申请"
        description="上传描述："
        btnText="新建"
        :bool="dialogVisible"
        @cancel="dialogVisible = false"
        @handleClose="dialogVisible = false"
        @upload="upload"
        >
          <input type="file" @change="selectFolder($event)" webkitdirectory />
        </re-po-uploader>
    </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, getCurrentInstance, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Mes } from './interface'
import { newColumn, getallcolumn, deletecolumn } from '@/api/center'
import { cropText, validateFileName } from '@/utils/tools/index'
import RePoUploader from '@/components/uploader/RePoUploader.vue'

const router = useRouter()
const { ctx } = getCurrentInstance() as any // 获取 refs 实例对象 (只能在setup或者mounted中使用)

const input_bool = ref<boolean>(true)
const dialogVisible = ref<boolean>(false)

function upload() { // 文件上传

}

const list = ref<Mes[]>([])
const file_list = reactive({
  list
})
const file_occupate_list = [1,2,3,4,5,6,7] // 占位文件夹数量

const hashMap = new Map()

// 解析文件夹
function selectFolder(e:any) {
  // 文件夹里面所有文件
  let {files} = e.target;
  // 文件夹名称
  let relativePath = files[0].webkitRelativePath;      
  let folderName = relativePath.split('/')[0];
  // 文件信息转换成FormData结构遍历上传
  for (let i = 0; i < files.length; i++) {
    let formData = new FormData();      
    formData.append('file', files[i])
    for (let [a, b] of formData.entries()) {
      console.log(a, b, '--------------');
    }
  }
  folderName
}

// 按enter
function keyup_enter(e:any) {
  e.target.blur()
}

// 验证文件名是否已存在或者合法
async function verify(e:any):Promise<any> {
  const id = parseInt(e.target.getAttribute('id'))
  let { value } = e.target, nameId = id
  input_bool.value = false

  if(hashMap.has(value)) return reuse(e, '改文件名已存在，换个名试试')
  if(!validateFileName(value)) return reuse(e, '文件名不能包含【\\\\/:*?\"<>|】这些非法字符,请修改后重新上传!')
  if(!value.replace(' ', '')) {
    value = '新建文件夹'
    while(hashMap.has(value)) {
      value = `新建文件夹${nameId++}`
    }
  }

  //   文件名合法进行的操作
  try {
    const result = (await newColumn(value)).data
    if(result.code !== 200) return ElMessage.error(result.data.msg)
    file_list.list[id].txt = value // getAttribute('id')获取list的input在数组的位置
    hashMap.set(value, value)
    input_bool.value = true
    return ElMessage({
      message: result.data.msg,
      type: 'success'
    })
  } catch (e) {
    return ElMessage.error('服务端发生致命的错误~')
  }

  function reuse(e:any, message:string):void {
    e.target.focus()
    ElMessage({
      message,
      type: 'warning',
    })
  }
}

// 添加文件夹
function addFile():void {
  if(input_bool.value) { // 输入文件名时不允许添加文件夹
    file_list.list.push({txt: '', rename: '', id: file_list.list.length})
    nextTick(()=>{ // nextTick ==> 页面渲染完才执行
    // (因为前面push进去后，页面此时在渲染中，调用$refs不会拿到新增加的file)
      ctx.$refs.inputRef[ctx.$refs.inputRef.length - 1].focus()
    })
  } else ElMessage.error('请对上一个文件夹进行正确的操作')
}

// 删除文件夹
async function deleteFile(id:number) {
  try {
    const result = (await deletecolumn(file_list.list[id].txt)).data
    if(result.code !== 200) return ElMessage.error(result.data.msg)
    hashMap.delete(file_list.list[id].txt)
    file_list.list.splice(id, 1)

    ElMessage({
      message: '删除成功',
      type: 'success',
    })

    for(let i = id; i <= file_list.list.length; i++) {
      file_list.list[i].id--
    }
  } catch (e) {
    return ElMessage.error('服务端发生致命的错误~')
  }
}

// 双击跳转
function pushView(query: any):void {
  let path = '/userCenter/detail'
  router.push({
    path,
    query
  })
}

onMounted(async () => {
  try {
    const result = (await getallcolumn()).data
    if(result.code !== 200) return ElMessage.error(result.data.msg)
    result.data.result.forEach((item:any) => {
      let list:Mes = {
        txt: item.column_name,
        rename: item.column_name,
        id: item.id
      }
      file_list.list.push(list)
      hashMap.set(item.column_name, item.column_name)
    })
  } catch (e) {
    return ElMessage.error('服务端发生致命的错误~')
  }
})
</script>

<style scoped lang="scss">
.title {
  display: flex;
  justify-content: flex-end; // 靠右显示
  h1 {
    flex: 1; // 自动填充宽度，实现元素一个左一个右
  }
}
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
    margin: var(--hy-boke-font-size-caption);
    padding: var(--hy-boke-font-size-caption);
    width: calc(100px + var(--hy-boke-font-size-caption) * 2);
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
