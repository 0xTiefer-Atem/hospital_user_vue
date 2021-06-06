<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="head-text">
        <el-row :grunt="24">
          <el-col :span="6">
            <el-page-header @back="goBack" content="医生信息列表">
            </el-page-header>
          </el-col>
        </el-row>

      </div>

      <!--      医生信息列表-->
      <el-row :gutter="30" v-if="staffList.length !== 0">
        <el-col :span="6" v-for="(item, index) in staffList" :key="index" style="padding: 15px">
          <el-card :style='border_radius' shadow="never">
            <div slot="header" style="text-align: left">
              <span class="staff-attribute">姓名：{{ item.staffName }}</span>
              <span class="staff-attribute">性别：{{ item.staffSex }}</span>
              <div>
                <span class="staff-attribute">联系方式：{{ item.staffTel }}</span>
              </div>
            </div>
            <el-image :style='border_radius' :src="item.staffCover"
                      class="image">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <el-divider></el-divider>
            <el-card shadow="never" class="box-card">
              <div class="text-msg">
                介绍
                <el-divider direction="vertical"></el-divider>
                {{ item.describe }}
              </div>
            </el-card>
            <el-divider></el-divider>
            <el-tag class="commodity-price">职位：{{ item.staffPos }}</el-tag>
            <el-tag class="commodity-price">入职时间：{{ dateFormat(item.staffEntry) }}</el-tag>


          </el-card>
        </el-col>
      </el-row>
      <el-row v-else><span>暂无数据</span></el-row>
    </el-card>

  </div>
</template>

<script>
import {request} from "@/network/request";
import moment from 'moment';

export default {
  name: "StaffInfoList",
  data() {
    return {
      border_radius: 'border-radius: 4px',

      staffList: [],
    };
  },
  activated() {

    this.getCurrentDataList();
  },
  methods: {
    /*日期处理*/
    dateFormat(date) {
      return moment(date).format("YYYY-MM-DD HH:mm")
    },

    currentChange(pageIndex) {
      console.log(pageIndex);
      this.getCurrentDataList()
    },

    getCurrentDataList() {
      request({
        url: '/getStaffInfoList',
        method: 'get',
        header: {
          'Content-Type': 'application/json'  //如果写成contentType会报错
        },
      }).then(res => {
        let resData = res.data.result;
        console.log(resData);
        this.staffList = resData.data
      });
    },

    //返回上一级页面
    goBack() {
      this.$router.back();
    },
  }
}
</script>

<style scoped>

.button {
  margin-bottom: 10px;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.text-msg {
  text-align: left;
  margin: 0px;
  display: block;
  /*white-space: nowrap;*/
  /*overflow: hidden;*/
  /*text-overflow: ellipsis;*/
}

.commodity-price {
  float: left;
  margin-bottom: 10px;
  margin-left: 10px;
}

.box-card {
  margin: 0px;
}

.input-with-select {
  width: 500px;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.select {
  width: 150px;
}

.staff-attribute {
  margin-right: 10px;
}

</style>