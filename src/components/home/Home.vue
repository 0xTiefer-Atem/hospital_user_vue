<template>
  <el-container class="home-container">
    <el-header>
      <el-menu router
               class="el-menu-demo"
               :default-active="baseUrl+''+activePath"
               mode="horizontal">
        <el-menu-item @click="saveNavState(baseUrl + '' + item.menuPath)"
                      :key="item.menuPath"
                      v-for="item in menu.menuList" :index="baseUrl + ''+ item.menuPath">
          {{item.menuName}}
        </el-menu-item>
        <el-submenu index="">
          <template slot="title">用户</template>
          <el-menu-item @click="saveNavState(baseUrl + '' + item.userOptPath)"
                        :key="item.userOptPath"
                        v-for="item in menu.userOptList" :index="baseUrl + '' +item.userOptPath">
            {{item.userOptName}}
          </el-menu-item>
          <el-menu-item index="" @click="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <br>
    <el-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        baseUrl: '/personal',
        activePath: '',
        menu: {
          menuList: [
            {
              menuName: '首页',
              menuPath: '/index'
            },
            {
              menuName: '预约',
              menuPath: '/appointment'
            },{
              menuName: '缴费',
              menuPath: '/payment'
            }
          ],
          userOptList: [
            {
              userOptName: '登录',
              userOptPath: '/login'
            },
            {
              userOptName: '注册',
              userOptPath: '/registered'
            }
          ]
        }
      }
    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath');
    },
    methods: {
      logout() {
        this.$router.replace('index')
        window.localStorage.clear();
      },
      //保存链接的激活状态
      saveNavState(activePath) {
        console.log(activePath);
        window.sessionStorage.setItem('activePath', activePath);
        this.activePath = activePath;
      }
    }
  }
</script>

<style scoped>
  .home-container {
    height: 100%;
  }

  .el-menu-demo {
    width: 100%;
  }

  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    color: #333;
    text-align: center;
  }

  .el-menu-demo {
    margin: 0;
  }
</style>
