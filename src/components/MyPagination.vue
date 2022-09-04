<template>
   <div style="text-align:center ;margin:20px">
    <el-pagination background layout="total,prev, pager, next,jumper" 
    :total='total' :page-size='pageSize' @current-change="changePage" :current-page='currentPage'>
</el-pagination>
<!--注意这个current-change是element分页组件的自定义事件，它含有一个回调参数，参数为当前页   -->
   </div>
</template>

<script>
export default {
  name: 'MyPagination',
  components: {},
  props:{
    total:{
        typeof:Number,
        default:100
    },
    pageSize:{
        typeof:Number,
        default:10
    },
    currentPage:{
      type:Number,
      default: 1
    }

  },
  data () {
    return {}
  },
  methods:{
    changePage(page){
        this.$emit('changePage',page)
    }
  }
}
</script>

<style>
</style>
