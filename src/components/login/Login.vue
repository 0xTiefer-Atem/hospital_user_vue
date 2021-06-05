<template>
  <div>
    <el-card>
      <div slot="header" class="head-text">
        <span>用户登录</span>
      </div>
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginForm" label-position="left" class="demo-ruleForm login-container">
        <h3 class="title">云智就医用户登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button @click="login" type="primary" style="width:48%;" >登 录</el-button>
          <el-button type="primary" style="width:48%;">重 置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "Login",
    data() {
      return {
        //这是登录的数据绑定对象
        loginForm: {
          username: '',
          password: ''
        },

        loginFormRules: {
          //登录框验证
          username: [
            { required: true, message: '请输用户名', trigger: 'blur' },
            { min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'blur' }
          ],
          //密码框验证
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      login() {
        let userAccount = this.loginForm.username;
        let userPwd = this.loginForm.password;
        let loginForm = {
          userAccount,
          userPwd
        };
        request({
          url:'/login/identify',
          method:'post',
          data: loginForm,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          console.log(res.data);
          let code = res.data.status;
          if(code === 200){
            this.$message.success('登陆成功！')
            let userInfo = res.data.result.data.userInfo;
            console.log(userInfo);
            let userStr = JSON.stringify(userInfo);
            window.localStorage.setItem("userStr", userStr);
            this.$router.replace('/personal/index')
          }else {
            this.$message.error('账户或密码错误！')
          }
        }).catch( err => {
          console.log(err);
          this.$message.error('网络错误!')
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 10px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    box-shadow: 0 0 2px #cac6c6;
  }
  .login-container.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }


</style>
