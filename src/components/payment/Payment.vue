<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="head-text">
        <span>用户缴费</span>
      </div>
      <div class="appointment-item">
        <el-tabs @tab-click="handleClick" type="border-card" class="tabs-card">
          <el-tab-pane label="缴费记录">
            <el-table
                    :default-sort = "{prop: 'createTime'}"
                    :data="caseHistoryList"
                    border
                    style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-card>
                    <div slot="header" class="head-text">
                      <span>病例详情</span>
                    </div>
                    <el-form label-position="left" border class="demo-table-expand">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="科室: ">
                            <el-tag type="success">{{ props.row.cliName }}</el-tag>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="医生姓名: ">
                            <el-tag type="success">{{ props.row.staffName }}</el-tag>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="病症详情: ">
                            <el-input
                                    type="textarea"
                                    disabled
                                    :rows="3"
                                    style="width: 50%"
                                    v-model="props.row.userIllness">
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="10">
                          <el-form-item label="药品列表: " >
                            <el-table
                                    width="70%"
                                    :border="true"
                                    :data="props.row.medicListJson">
                              <el-table-column
                                      prop="medicName"
                                      label="药品名称"
                                      width="180">
                              </el-table-column>
                              <el-table-column
                                      prop="medicNum"
                                      label="药品数量(个)"
                                      width="180">
                              </el-table-column>
                              <el-table-column
                                      prop="medicPrice"
                                      label="药品价格(元)">
                              </el-table-column>
                            </el-table>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-card>
                </template>
              </el-table-column>
              <el-table-column
                      sortable
                      prop="createTime"
                      label="日期"
                      width="180">
              </el-table-column>
              <el-table-column
                        prop="caseId"
                        label="病例编号"
                        width="180">
                </el-table-column>
              <el-table-column
                      prop="staffName"
                      label="主治医生"
                      width="180">
              </el-table-column>
              <el-table-column
                      sortable
                      prop="totalPrice"
                      label="总价格(元)"
                      width="180">
              </el-table-column>
              <el-table-column
                      label="支付状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.payStatus === 'UNPAY'">未支付</span>
                  <span v-else>已支付</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                          size="small"
                          type="primary"
                          @click="prePayClick(scope.$index, scope.row)"
                          v-if="scope.row.payStatus === 'UNPAY'">缴费</el-button>
                  <el-tag v-else type="success">已缴费</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>


      <el-dialog
              :show-close="false"
              title="扫码缴费"
              :visible.sync="payDialogVisible"
              width="30%">
        <el-divider></el-divider>
        <div
             element-loading-text="支付中"
             v-loading = "loadingStatus">
          <el-row>
            <el-col>
              <el-image :src="url"></el-image>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
        <el-button @click="payDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="payClick">确 定</el-button>
      </span>
        </div>
      </el-dialog>

  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "Payment",
    data() {
      return {
        //从病例查询
        caseHistoryList: [],

        //加载状态
        loadingStatus: false,

        payDialogVisible: false,

        //要缴费的目标的下标
        payItemIndex: -1,

        //支付的模拟二维码
        url: 'data:image/png;base64,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'
      }
    },
    activated() {
      this.getCaseHistoryList()
    },
    methods: {
      handleClick() {
        this.getCaseHistoryList()
      },

      //准备缴费，打开二维码对话框
      prePayClick(index, row) {
        this.payDialogVisible = true;
        this.payItemIndex = index;
      },


      //已经支付完成
      payClick() {
        this.loadingStatus = true;
        console.log(this.payItemIndex);
        let index = this.payItemIndex;
        let caseId = this.caseHistoryList[index].caseId;
        let jsonData = {
          caseId
        }
        request({
          url:'/case/pay',
          method: 'post',
          data:jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( res => {
          let resData = res.data;
          if(resData.status === 200) {
            setTimeout(() => {
              this.$message.success("支付成功!")
              let index = this.payItemIndex;
              this.caseHistoryList[index].payStatus = 'PAY';
              this.payDialogVisible = false;
              this.loadingStatus = false;
            },3000)
          }else {
            this.$message.error("支付失败，请稍候再试")
            this.loadingStatus = false;
          }
        }).catch( err => {
          this.$message.error("网络错误，稍后再试")
          this.loadingStatus = false;
        })
      },

      //获取病例单缴费记录
      getCaseHistoryList() {
        let userStr = window.localStorage.getItem("userStr");
        let userInfo = JSON.parse(userStr);
        if(userInfo === null) {
          this.$message.info("请登陆")
          this.$router.replace("/personal/login")
          return;
        }
        let userId = userInfo.userId;

        let jsonData = {
          userId
        };
        request({
          url: '/case/history',
          method: 'post',
          data: jsonData,
          headers: {
            'Content-Type': 'application/json'
          }
        }).then( res => {
          let resData = res.data;
          console.log(resData);
          if(resData.status === 200) {
            this.caseHistoryList = resData.result.data;
          }
        })
      }
    }
  }
</script>

<style scoped>
  .medic-info {
    position: relative;
    left: 60px;
  }
</style>
