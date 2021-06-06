<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="head-text">
        <span>用户预约</span>
      </div>
      <div class="appointment-item">
        <el-tabs type="border-card" class="tabs-card" @tab-click="appointmentHistoryTabClick">
          <el-tab-pane label="用户预约">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-select v-model="cliId" placeholder="请选择科室" @change="selectCliId">
                  <el-option
                      v-for="cli in cliList"
                      :key="cli.cliId"
                      :label="cli.cliName"
                      :value="cli.cliId">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="staffId" no-data-text="正在查询,请稍等" placeholder="请选择医生">
                  <el-option
                      v-for="staff in staffList"
                      :key="staff.staffId"
                      :label="staff.staffName"
                      :value="staff.staffId">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="getStaffWorkScheduleList">查询</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-table
                  :default-sort="{prop: 'appointmentTime'}"
                  :data="staffWorkScheduleList"
                  border
                  style="width: 100%">
                <el-table-column
                    prop="appointmentTime"
                    label="日期"
                    sortable
                    width="180">
                </el-table-column>
                <el-table-column
                    label="上午预约情况">
                  <template slot-scope="scope">
                    <span v-if="scope.row.morningNum < 3">上午已预约{{ scope.row.morningNum }}人</span>
                    <span v-else>上午预约已满</span>
                  </template>
                </el-table-column>

                <el-table-column
                    label="下午预约情况">
                  <template slot-scope="scope">
                    <span v-if="scope.row.afternoonNum < 3">下午已预约{{ scope.row.afternoonNum }}人</span>
                    <span v-else>下午预约已满</span>
                  </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="100%">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.morningNum !== 3"
                               @click="handleAppointmentClick(scope.row, scope.$index)" type="text" size="small">预约上午
                    </el-button>
                    <el-button v-else-if="scope.row.afternoonNum !== 3"
                               @click="handleAppointmentClick(scope.row, scope.$index)" type="text" size="small">预约下午
                    </el-button>
                    <el-button v-else :disabled="true" type="text" size="small">预约已满</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="就医记录">
            <el-table
                :default-sort="{prop: 'appointmentTime', order: 'descending'}"
                :data="appointmentHistoryList"
                border
                style="width: 100%">
              <el-table-column
                  sortable
                  prop="appointmentTime"
                  label="预约日期"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="appointmentId"
                  label="预约单号"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="cliName"
                  label="科室"
                  width="180">
              </el-table-column>
              <el-table-column
                  prop="staffName"
                  label="预约医生">
              </el-table-column>
              <el-table-column
                  label="处理状态">
                <template slot-scope="scope">
                  <el-tag effect="dark" v-if="scope.row.status === 'WAIT'" type="info">预约成功，等待挂号</el-tag>
                  <el-tag effect="dark" v-if="scope.row.status === 'SUCCESS'">挂号成功，等待就诊</el-tag>
                  <el-tag effect="dark" v-if="scope.row.status === 'FINISH'" type="success">就诊完成</el-tag>
                </template>
              </el-table-column>
              <el-table-column
                  label="操作">
                <template slot-scope="scope">
                  <el-popconfirm
                      @onConfirm="cancelAppointment(scope.$index, scope.row)"
                      v-if="scope.row.status === 'WAIT'"
                      confirmButtonText='是'
                      cancelButtonText='否'
                      icon="el-icon-info"
                      iconColor="red"
                      title="是否删除此条记录吗？">
                    <el-button slot="reference" type="danger">删除</el-button>
                  </el-popconfirm>
<!--                  <el-button v-if="scope.row.status === 'FINISH'"-->
<!--                             type="primary"-->
<!--                             slot="reference"-->
<!--                             @click="showFeedBackDialog(scope.row.appointmentId)">病情反馈-->
<!--                  </el-button>-->
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>


<!--      &lt;!&ndash;    添加病情反馈对话框&ndash;&gt;-->
<!--      <el-dialog-->
<!--          title="添加病情反馈"-->
<!--          :visible.sync="addFeedBackVisible"-->
<!--          width="50%"-->
<!--          :label-position="'left'">-->
<!--        &lt;!&ndash;      内容主体区&ndash;&gt;-->
<!--        <el-form :model="addFeedBack"-->
<!--                 ref="addStaffInfoRef">-->
<!--          <el-form-item label="反馈信息" prop="feedBack">-->
<!--            <el-input type="textarea" v-model="addFeedBack.feedBack"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        &lt;!&ndash;      底部区域&ndash;&gt;-->
<!--        <span slot="footer">-->
<!--          <el-button @click="cancelAddFeedBack()">取 消</el-button>-->
<!--          <el-button type="primary" @click="addFeedBackHttp()">确 定</el-button>-->
<!--        </span>-->
<!--      </el-dialog>-->
    </el-card>
  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "Appointment",
  data() {
    return {
      isLoading: true,
      cliId: '',
      staffId: '',
      cliList: [],
      staffList: [],
      staffWorkScheduleList: [],
      appointmentHistoryList: [],


      // //添加反馈对话框显示变量
      // addFeedBackVisible: false,
      //
      // //添加数据的表单对象
      // addFeedBack: {
      //   appointmentId: '',
      //   feedBack: ''
      // },

    }
  },
  activated() {
    request({
      url: '/getCliInfo',
      method: 'get'
    }).then(res => {
      let data1 = res.data;
      console.log(data1);
      if (data1.status === 200) {
        this.cliList = data1.result.data;
        console.log("科室id查询成功");
      }
    })
  },
  methods: {
    selectCliId() {
      console.log(this.cliId);
      let id = this.cliId;
      let jsonData = {
        id
      }
      request({
        url: '/getStaffInfo',
        method: 'post',
        data: jsonData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        let data1 = res.data;
        console.log(res.data);
        if (data1.status === 200) {
          this.staffList = data1.result.data;
          console.log("科室id查询成功");
        }
      })
    },

    //获取该医生七天的排班表
    getStaffWorkScheduleList() {
      let staffId = this.staffId;
      let jsonData = {
        staffId
      }
      request({
        url: '/get/staffWorkScheduleList',
        method: 'post',
        data: jsonData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        let data = res.data;
        console.log(data);
        if (data.status === 200) {
          this.staffWorkScheduleList = data.result.data
        }
      })
    },

    //点击预约
    handleAppointmentClick(row, index) {
      console.log(row, index);
      if (row.morningNum < 3) {
        this.appointmentOpt("morning", row.morningNum + 1, row.appointmentTime)
            .then(res => {
              let resData = res.data;
              console.log(resData);
              if (resData.status === 200) {
                this.$message.success("预约成功!");
                row.morningNum = row.morningNum + 1;
              } else {
                this.$message.error(resData.msg);
              }
            })
      } else {
        this.appointmentOpt("afternoon", row.afternoonNum + 1, row.appointmentTime)
            .then(res => {
              let resData = res.data;
              console.log(resData);
              if (resData.status === 200) {
                this.$message.success("预约成功!");
                row.afternoonNum = row.afternoonNum + 1;
              } else {
                this.$message.error("预约失败请稍候重试!");
              }
            })
      }
    },

    //预约http请求
    appointmentOpt(type, num, date) {
      let userStr = window.localStorage.getItem("userStr");
      let userInfo = JSON.parse(userStr);
      let userId = userInfo.userId;
      let staffId = this.staffId;
      console.log(userInfo);
      let jsonData = {
        date,
        type,
        num,
        userId,
        staffId
      };
      return request({
        url: '/appointment/add',
        method: 'post',
        data: jsonData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },

    //删除记录
    cancelAppointment(index, row) {
      console.log(index);
      let appointmentId = row.appointmentId;
      console.log(appointmentId);
      let jsonData = {
        appointmentId
      }
      request({
        url: '/appointment/delete',
        method: 'post',
        data: jsonData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        let resData = res.data;
        if (resData.status === 200) {
          this.$message.success("删除成功")
          this.appointmentHistoryList.splice(index, 1)
        } else {
          this.$message.error("删除失败，请稍候再试")
        }
      })
    },

    //预约历史纪录tab被点击函数
    appointmentHistoryTabClick(tab) {
      console.log(tab);
      let index = tab.index;
      if (index === "1") {
        let userStr = window.localStorage.getItem("userStr");
        let userInfo = JSON.parse(userStr);
        let userId = userInfo.userId;
        let jsonData = {
          userId
        };
        request({
          url: '/appointment/history',
          method: 'post',
          data: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          let resData = res.data;
          console.log(resData);
          if (resData.status === 200) {
            this.appointmentHistoryList = resData.result.data;
            this.$message.success("预约记录查询成功");
          } else {
            this.$message.error("预约记录查询失败");
          }
        })
      }
    },

    //展示反馈对话框
    showFeedBackDialog(appointmentId) {
      this.addFeedBackVisible = true
      this.addFeedBack.appointmentId = appointmentId
    },

    //添加反馈请求
    addFeedBackHttp() {
      console.log(this.addFeedBack);
      let jsonData = {}
      jsonData.appointmentId = this.addFeedBack.appointmentId
      jsonData.feedBack = this.addFeedBack.feedBack
      request({
        url: '/add/feedback',
        method: 'post',
        data: jsonData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.status === 200) {
          this.$message.success("反馈添加成功");
        } else {
          this.$message.error("反馈添加失败");
        }
        this.cancelAddFeedBack()
      })
    },

    //取消添加反馈
    cancelAddFeedBack() {
      this.addFeedBackVisible = false
      this.addFeedBack.feedBack = ''
      this.addFeedBack.appointmentId = ''
    }

  }
}
</script>

<style scoped>

</style>
