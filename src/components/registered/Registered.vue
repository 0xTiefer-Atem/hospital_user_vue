<template>
  <div>
    <el-card>
      <div slot="header" class="head-text">
        <span>用户注册</span>
      </div>
      <h3 class="title">医路有你-用户注册</h3>
      <el-form :rules="registerRules" :inline="true" label-width="100px" label-position="right" class="register-container" :model="registerUserInfo">
        <el-row>
          <el-col>
          <el-form-item label="姓名: " prop="userName">
            <el-input v-model="registerUserInfo.userName" type="text" auto-complete="off"></el-input>
          </el-form-item>
          </el-col>
          <el-col>
            <el-form-item prop="userSex" class="sex-label" label="性别: " >
              <el-radio-group v-model="registerUserInfo.userSex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="userEmail" label="邮箱: ">
              <el-input v-model="registerUserInfo.userEmail" type="text" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="userTel" label="电话: ">
              <el-input v-model="registerUserInfo.userTel" type="text" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="userPwd" class="pwd-input" label="密码: ">
              <el-input v-model="registerUserInfo.userPwd" type="password" auto-complete="off" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item prop="userRePwd" class="pwd-input" label="确认密码: " >
              <el-input v-model="registerUserInfo.userRePwd" type="password" auto-complete="off" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :offset="8" :span="6">
              <el-button @click="registerUser" type="primary">注册</el-button>
          </el-col>
          <el-col :span="1">
              <el-button type="info">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {request} from "@/network/request";

  export default {
    name: "Registered",
    data() {
      let checkPhone = (rule, value, callback) => {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error('电话号码不能为空'))
        }
        setTimeout(() => {
          // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
          // 所以我就在前面加了一个+实现隐式转换

          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (phoneReg.test(value)) {
              callback()
            } else {
              callback(new Error('电话号码格式不正确'))
            }
          }
        }, 100)
      };
      let checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'))
          }
        }, 100)
      };
      let checkPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('确认密码不能为空'))
        }
        setTimeout(() => {
          if (value === this.registerUserInfo.userPwd) {
            callback()
          } else {
            callback(new Error('两次输密码不一致'));
          }
        }, 100)
      };
      return {
        registerUserInfo: {
          userName: '',
          userSex: '',
          userTel: '',
          userEmail: '',
          userPwd: '',
          userRePwd: ''
        },
        registerRules: {
          userName: [
            { required: true, message: '请输用户名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          userSex: [
            { required: true, message: '请选择性别', trigger: 'blur' },
          ],
          userPwd: [
            { required: true, message: '请输密码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          userTel: [
            {required: true, validator: checkPhone, trigger: 'blur' }
          ],
          userEmail: [
            {required: true, validator: checkEmail, trigger: 'blur' }
          ],
          userRePwd: [
            { required: true, validator: checkPwd, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      registerUser() {
        let jsonData = this.registerUserInfo;
        console.log(this.registerUserInfo);
        request({
          url: '/register/user',
          method:'post',
          data: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( res => {
          let data = res.data;
          if(data.status === 200){
            this.$message({
              message: '注册成功,请前去登陆',
              type: 'success'
            });
            this.$router.replace('/personal/login')
          }else {
            this.$message.error('注册失败，请稍候再试')
          }
        }).catch( err => {
          console.log(err);
          this.$message.error('网络错误!')
        });
      }
    }
  }
</script>

<style scoped>
  .sex-label {
    margin-right: 100px;
  }

  .pwd-input {
    margin-left: 1.2%;
  }

  .register-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 10px auto;
    padding: 35px 35px 15px 35px;
    background: #fff;
    box-shadow: 0 0 2px #cac6c6;
  }
</style>
