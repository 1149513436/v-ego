<template>
<el-scrollbar class="page-scroll">
<el-menu
       router
       :collapse=isCollapse
      default-active="/"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      unique-opened
      active-text-color="#ffd04b">
      <el-menu-item >
        <span slot="title" >rosy的电商平台</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title" >{{$t('menu.home')}}</span>
      </el-menu-item>
      <el-menu-item index="/goods" >
        <i class="el-icon-document"></i>
        <span slot="title">{{$t('menu.goods')}}</span>
      </el-menu-item>

      <el-submenu index="/params">
        <template slot="title">
          <i class="el-icon-document"></i>
        <span slot="title">{{$t('menu.params')}}</span>
        </template>
         <el-menu-item index="/params/paramsc">规格与包装</el-menu-item>
      </el-submenu>

       
       <el-menu-item index="/advert" >
        <i class="el-icon-document"></i>
        <span slot="title">广告分类</span>
      </el-menu-item>
        <el-submenu index="/order">
      <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order-list">订单列表</el-menu-item>
          <el-menu-item index="/order-back">退货列表</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
         <el-menu-item index="/user">
        <i class="el-icon-menu"></i>
        <span slot="title" >用户中心</span>
      </el-menu-item>
    </el-menu>
</el-scrollbar>

</template>

<script>

export default {
  props: ['isCollapse'],
  data () {
    return {

      // isCollapse: false
    }
  },
  components: {}
}
</script>

<style>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
     /* width: 200px; */
    min-height: 400px;
  }
.el-menu{
 /* transition: width 0.2ms, transform 0.2s; */
  transition:0.1ms ;
  transform: 0.5s;
box-shadow: 2px 2px 2px rgb(95 114 127 / 30%);
  height: 930px;
}
/* 隐藏横向滚动条 */
/* .page-scroll {
    height: 100%;
  }

  .page-scroll .el-scrollbar__wrap {
    overflow-x: hidden;
  } */

  /* 横向竖向都隐藏 */
  .el-aside::-webkit-scrollbar {
     display: none;
}
</style>
