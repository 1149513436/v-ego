<template>
  <div class="params">
    <!-- //面包屑区域 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
        <el-breadcrumb-item>规格包装</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- //搜索框 -->
    <div class="header">
      <el-input v-model="inp" @change="getChange"></el-input>
      <el-button type="primary">搜索</el-button>
      <el-button type="primary" @click="dialogable = true">添加</el-button>
    </div>
    <!-- 表格内容区域 -->
    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="规格参数ID" width="120">
        </el-table-column>
        <el-table-column prop="itemCatId" label="类目ID">
        </el-table-column>
        <el-table-column prop="specsName" label="规格名称">
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="paramData" label="规格参数">
        </el-table-column>
        <el-table-column label="操作" show-overflow-tooltip width="180px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
              <router-link :to="{ path: '/addGoods', query: { routerName: '商品编辑', goodsData: scope.row } }"
                style="color:#222222 ">编辑</router-link>
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <MyPagination :total="total" :pageSize="pageSize" @changePage='changePage' :currentPage="currentPage" />

    <!-- 对话框 -->
    <div class="myform">
    <AddParams :dialogable="dialogable" @closeDialog='closeDialog'/>
    </div>
  </div>
</template>

<script>
import MyPagination from '@/components/MyPagination.vue';
import AddParams from './addParams.vue';


export default {

  name: 'ParamsDialog',
  data() {
    return {
      inp: '',
      tableData: [],
      total: 10,//分页数据
      pageSize: 10,
      currentPage: 1,//当前页
      type: 1,//搜索类型
      list: [],
     dialogable:false
    }
  },
  components: { MyPagination, AddParams },
  created() {
    this.http(1)
  },
  methods: {
    http(page) {
      this.$api.getParams({ page })
        .then(res => {
          if (res.data.status === 200) {
            this.tableData = res.data.data;
            this.total = res.data.total
            this.pageSize = res.data.pageSize
          }
          //console.log(res.data)
        })
    },
    //改变页面
    changePage(val) {
      //console.log('####',val)
      this.currentPage = val;
      //console.log(this.type)
      if (this.type == 1) {
        this.http(val)
      } else {
        console.log('搜索的分页处理----')
        this.tableData = this.list.slice((val - 1) * 3, val * 3)//设置每页显示三条
      }
    },
    //搜索框搜索
    getChange(val) {
      //如果为空的情况
      if (!val) {
        this.http(1)
        this.currentPage = 1;
        this.type = 1;
        return;
      }
      //console.log(val)
      this.$api.searchParams({ search: val }).then((res) => {
        if (res.data.status == 200) {
          this.list = res.data.result
          this.total = res.data.result.length;
          this.pageSize = 3;//设置每页显示3条
          this.tableData = this.list.splice(0, 3);
          this.type = 2

        }
        else {
          this.tableData = [];
          this.total = 1;
          this.pageSize = 1;
          this.type = 1;
        }
        console.log(res.data)
      })
    },
    closeDialog(){
      this.dialogable=false
    }

  },

}
</script>

<style lang="less" scoped>
.params {
  margin: 10px
}

.nav {
  padding: 10px;
}

.header {
  display: flex;
  background-color: #fff;
  padding: 10px;
  border: 1px solid #fff;

  button {
    margin-left: 20px;
  }
}
</style>
