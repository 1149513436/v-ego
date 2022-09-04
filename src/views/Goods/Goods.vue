<template>
  <div class="goods">
    <!-- 搜索区域 -->
    <div class="header">
      <el-input  v-model="input" @change="searchInput" placeholder="请输入名称、买点、描述信息中任一"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">
              <router-link :to="{path:'/addGoods',query:{routerName:'商品添加'}}" style="color:#fff ">添加</router-link></el-button>
    </div>
    <!-- 表格区域展示视图 -->
    <div class="wrapper">
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column type="selection" width="55">
    </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100px">
      </el-table-column>
      <el-table-column prop="title" label="商品名称" width="100px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column width="100px" prop="price" label="商品价格">
      </el-table-column>
      <el-table-column width="100px"  prop="num"  label="商品数量">
      </el-table-column>
      <el-table-column
      width="120px"  prop="category"   label="规格类目">
      </el-table-column>
      <el-table-column  prop="image"  label="商品图片" show-overflow-tooltip>
      </el-table-column>
      <el-table-column  prop="sellPoint"  label="商品买点" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="descs"  label="商品描述" show-overflow-tooltip>
      </el-table-column>
     
       <el-table-column label="操作" show-overflow-tooltip width="150px">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">
          <router-link :to="{path:'/addGoods',query:{routerName:'商品编辑',goodsData:scope.row}}" style="color:#222222 ">编辑</router-link>
          </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
    <!-- 分页 -->
   
      <MyPagination :total="total" :pageSize="pageSize" @changePage='changePage' :currentPage='currentPage'/>
   
    
  </div>
</template>

<script>
// import axios from 'axios'
import MyPagination from '@/components/MyPagination.vue';

export default {
  name: 'GooDs',
  data() {
    return {
      input: '',
      tableData:[],
      total:10,
      pageSize:1,//
      type:1,
      list:[],
      currentPage:1
    }
  },
  components: { MyPagination },
  methods: {
      handleEdit() {
         
        //console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteGoods({
            id:row.id
          }).then(res=>{
            console.log(res.data)
            if(res.data.status==200){
               this.$message({
            type: 'success',
            message: '删除成功!'
          })
            }
            this.getInfo(1)

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //获取商品信息
     getInfo(page){

        this.$api.getGoodsList({
        page:page
      }).then(res=>{
        console.log(res.data)
        if(res.data.status===200){
            this.tableData=res.data.data        
            this.pageSize=res.data.pageSize
            this.total=res.data.total
        }
      })
      },
      // 页面改变
      changePage(num){
        this.currentPage=num
        if(this.type==1){
          this.getInfo(num)
        }else{
          console.log('搜索的分页处理----')
          this.tableData=this.list.slice((num-1)*3,num*3)
        }
        
      },
      //搜索功能
      searchInput(val){
        if(!val){
          this.getInfo(1)
           this.currentPage = 1;
          this.type = 1;
          return;
        }
          //console.log(this.$api)
          this.$api.getSearch({
            search:val
          }).then(res=>{
            if(res.data.status===200){
              this.currentPage=1
              this.list=res.data.result;  //获取数据总条数，要对齐分割
              //假设后台没有分页，需要我们自己分页
              this.total=res.data.result.length;
              this.pageSize=3
               this.type=2
              this.tableData=res.data.result.slice(0,3) //不能少这一行，这个是最初始第一页的页面
             
            }else{
              this.tableData=[]
              this.total=1,
              this.pageSize=1
              this.type=1
            }
           
          })
      }
    },
    created(){
      this.getInfo(1)
        // axios.get('http://localhost:3001/api/projectList?page=1').then(res => {
        //   console.log(res);
        // })
      
    }
}
</script>

<style lang="less" scoped >
.goods {
  margin: 20px;
  
}

.header {
  height: 60px;
 display: flex;

  button {
    height: 40px;
    margin-left: 20px;
  }
 margin: 20px,0;
}
.wrapper{
  display: block;
    margin:20px,0;
  }
</style>
