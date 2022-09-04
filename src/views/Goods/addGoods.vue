<template>
    <div class="addGoods">
        <div class="title">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{routerName}}</el-breadcrumb-item>
                
            </el-breadcrumb>
        </div>
     <div class="myform">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible=true ">类目选择</el-button>
          <span>{{goodsForm.category}}</span>
        </el-form-item>

        <el-form-item label="商品名称" prop="title">
          <el-input v-model="goodsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="goodsForm.num"></el-input>
        </el-form-item>
        <el-form-item label="发布时间" >
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="goodsForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="goodsForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="goodsForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="uploadImg=true">上传图片</el-button>
          <img :src=goodsForm.image alt="" width="200px">
        </el-form-item>
        <el-form-item label="商品描述" prop="descs">
          <WangEditor @sendEditor='sendEditor' ref="myEditor"/>
        </el-form-item>
        <el-form-item>
          <div class="footer">
            <el-button @click="cancle()">取消</el-button>
          <el-button type="primary" @click="submitForm()">确定</el-button>
          </div>
          
     
        </el-form-item>
      </el-form>
    </div>
    <!--类目选择弹框 -->
     <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      >
      <TreeGoods @sendTreeData="sendTreeData"/>

      <span slot="footer" class="dialog-footer">
          <el-button  @click="innerVisible=false">取消</el-button>
          <el-button type="primary" @click="showTreeData">确定</el-button>
      </span>
    </el-dialog>

    <!--上传图片-->
     <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="uploadImg"
      >
     
    <UploadImg @sendImg='sendImg'/>
    
      <span slot="footer" class="dialog-footer">
          <el-button  @click="uploadImg=false">取消</el-button>
          <el-button type="primary" @click="uploadImg=false">确定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import TreeGoods from './TreeGoods.vue'
import UploadImg from './uploadImg.vue'
import WangEditor from './wangEditor.vue'
export default {
    name: 'AddGoods',
     components: { TreeGoods, UploadImg, WangEditor },
    data() {
        return {
        innerVisible:false,
        uploadImg:false,
        treeData:{},
        routerName:'',//面包屑本业显示名称
        goodsForm: {
        //表单容器-对象
        id:'',
        title: "", //商品名称
        price: "",
        num: "",
        sellPoint: "",
        cid:'',
        image: "",
        descs: "",
        category: "", //商品类目
        date1: "", //商品时间
        date2: "", //商品时间
      },
      rules:{
        title: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8个字符', trigger: 'blur' }
          ],
          price: [ 
            { required: true, message: '请输入价格', trigger: 'blur' },
          ],
           num: [ 
            { required: true, message: '请输入数量', trigger: 'blur' },
              { min: 1, max: 10000, message: '数量在 1 到 10000', trigger: 'blur' }
          ],
      }
        }

    },
    created(){
        this.routerName=this.$route.query.routerName
        this.goodsForm=this.$route.query.goodsData||{}
        this.$nextTick(()=>{
         this.$refs.myEditor.editor.txt.html(this.goodsForm.descs)
        })
       
    },
   methods:{
      sendTreeData(val){
        console.log('@@@',val)
        this.treeData=val
      },
      showTreeData(){
        this.innerVisible=false
        //显示tree数据
        this.goodsForm.category=this.treeData.name
        this.goodsForm.cid=this.treeData.cid
      },
      sendImg(val){
        this.goodsForm.image=val
      },
      sendEditor(val){
          this.goodsForm.descs=val
      },
      //上传表单数据
       submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            let {title,cid,category,sellPoint,price,num,descs,image,id}=this.goodsForm
            if(this.routerName=='商品添加'){
               console.log('商品添加')
                this.$api.addGoods({
                title,cid,category,sellPoint,price,num,descs,image
            }).then(res=>{
              if(res.data.status==200){
              this.$message.success('添加成功')
              this.goodsForm={}
              this.$router.push('/goods')
              }else{
                this.$message.error('服务器错误')
              }                    
            })
            }else{
              //console.log('this.title')
              this.$api.updateGoods({
                id,
                title,cid,category,sellPoint,price,num,descs,image
              }).then(res=>{
                if(res.data.status==200){
                   this.$message.success('编辑成功')
                    this.goodsForm={}
                    this.$router.push('/goods')
                }else{
                  this.$message.error('编辑失败')
                }
                //console.log(res.data)
              })
            }
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(goodsForm) {
        this.$refs[goodsForm].resetFields();
      },
      cancle(){
         this.$router.push('/goods')
      }
    }
   }
    

</script>

<style lang="less" scoped>
.addGoods{
    margin:10px
    
}
.title{
    padding: 10px;
    background-color:  rgba(255, 255, 255, 0.601);
    border: 1px solid rgba(255, 255, 255, 0.601);
    margin-bottom: 20px;
}
.line{
    text-align: center;
}
.footer{
  // margin-left: 200px;
  float: right;
}
</style>
