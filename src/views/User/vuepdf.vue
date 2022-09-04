<template>
  <el-dialog
  title="合同内容"
  :visible.sync="dialogVisible"
  width="70%"
  :before-close="handleClose">
  <!-- 
    pdf中的属性:
    src:表示PDF文件路径
    :page:显示的页码，默认显示第一页
   -->
   <el-button @click="num--" v-if="num>=1">上一页</el-button>
    <el-button @click="num++" v-if="num<=pageCount">下一页</el-button>
    <el-button @click="print">打印合同</el-button>
   {{currentPage}}/{{pageCount}}
    <pdf 
          :src=src :page="num"  
          @num-pages="pageCount = $event"
          @page-loaded="currentPage=$event"
          style="display:inline-block;width:500px"
          ref="mypdf"
    ></pdf>
     <iframe id="printIframe" :src="src" frameborder="0" style="display:none"></iframe>
  
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'VuePdf',
  components: {pdf},
  
  data () {
    return {  
        dialogVisible: false,
        currentPage:0,
        pageCount:0,
        num:1,
        src:'./test.pdf',
       
    }
  },
   methods:{
     print(){
        //打印合同的方法
     // this.$refs.mypdf.print()
    document.getElementById('printIframe').contentWindow.print();
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(()=> {
            done();
          })
          .catch(()=> {});
      }
   }
     
    }

</script>

<style>
</style>
