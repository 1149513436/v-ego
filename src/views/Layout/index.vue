<template>

  <el-container class="contain">

    <el-aside :width="isCollapse ? '64px' : '200px'">
      <NavMenuVue :isCollapse='isCollapse' id="menuClass" />
    </el-aside>

    <el-container>
      <el-header :class="{ isActive: isCollapse }">
        <i class="el-icon-s-fold" @click="changeStatus">收起/展开</i>
        <span style="padding-left: 295px; font-weight: bolder; font-size:large">rosy的电商平台</span>
        <div class="header-right">
          <el-dropdown @command="clickLang">
            <span class="el-dropdown-link">
              多语言<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
              
            </el-dropdown-menu>
          </el-dropdown>
          <div class="user">
            欢迎:{{userinfo.user}}
            <i class="el-icon-switch-button" @click="loginout"></i>
          </div>
        </div>
      </el-header>
      <el-main :class="{ isActive: isCollapse }">
        <router-view />
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
import NavMenuVue from './NavMenu.vue'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'InDex',
  computed:{
    ...mapState('loginModule',['userinfo'])
  },
  methods: {
    changeStatus() {
      this.isCollapse = !this.isCollapse
    },
    clickLang(command){
      console.log(command)
      this.$i18n.locale=command
    },
    ...mapMutations('loginModule',['clearUser']),
    loginout(){
      //退出登录，清空vuex数据
        this.clearUser()
      //清空本地数据
      localStorage.removeItem('user')
        //返回登录界面
        this.$router.push('/login')
    }
  },
  data() {
    return {
      isCollapse: false
    }
  },
  components: { NavMenuVue }

}
</script> 

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.el-icon-switch-button{
  //icon图标退出
  padding-left: 10px;
  font-size: 20px;
  color: red;
}
.el-header,
.el-footer {
  margin-left: 200px;
  background-color: #99ffff;
  color: #333;
  line-height: 60px;
}

.el-aside {
  text-align: center;

  position: fixed;
  top: 0px;

  bottom: 0px;
}

.el-main {
  background-color: #eee;
  color: #333;
  height: 600px;
  margin-left: 200px;
}

body>.el-container {
  margin-bottom: 20px;
}


.contain {
  margin-top: 0px;
  height: 800px;
  background-color: #233, 238, 243;
}

.isActive {
  margin-left: 64px;
}

.header-right {
  float: right;
  padding-right: 20px;
  display: flex;

  .user {
    padding-left: 20px;
  }
}
</style>
