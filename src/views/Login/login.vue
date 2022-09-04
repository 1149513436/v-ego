<template>
  <div class="tt1">
    <div class="login-box">
      <div style="text-align:center ;margin-bottom:20px"><h2>登录</h2></div>
      <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="on"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import jwt from 'jwt-decode'
import {mapMutations} from 'vuex'
  export default {
   name:'LoGin',
    data() {
      var validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: '',
          
        },
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      ...mapMutations('loginModule',['setUser']),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           let {username,password}=this.loginForm
           this.$api.login({
            username,password
           }).then(res=>{
            //console.log(res.data.status)
            if(res.data.status==200){
             
            //console.log(jwt(res.data.data).username) 
              //登录成功：1存储登录信息，2跳转网页，3顶部显示用户信息，4持久化
              let obj={
                user:jwt(res.data.data).username,
                token:res.data.data
              }
              this.setUser(obj)
              //存储本地
              localStorage.setItem('user',JSON.stringify(obj))
              //跳转
              this.$router.push('/')
               console.log(jwt(res.data.data))
            }else{
              this.$message.error('账号错误')
            }
           
           })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
.login-box {
  width: 400px;
  height: 300px;
  padding: 20px;
  margin: 200px auto;
  border-radius: 10px;
  border: 1px solid #eee;
  background: #fff;
}
</style>
