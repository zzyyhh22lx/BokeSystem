<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
</script>

<style>
/*初始化  reset*/
body,button,dd,dl,dt,h1,h2,h3,h4,h5,h6,input,li,ol,p,td,ul{margin:0;padding:0}
body,button,input{font:12px/1.5 tahoma,arial,'Hiragino Sans GB',\5b8b\4f53,sans-serif}
h1,h2,h3,h4,h5,h6,button,input{font-size:100%}
ol,ul{list-style:none}
a{text-decoration:none}
a:hover{text-decoration:underline}
fieldset,img{border:0;vertical-align:top;}
a,button{cursor:pointer;}
/*清除浮动*/
.clearfix:before,.clearfix:after {
    content:"";
    display:table;
}
.clearfix:after{clear:both;}
.clearfix{
    *zoom:1;/*IE/7/6*/
}
.pointer {
  cursor: pointer;
}
</style>
