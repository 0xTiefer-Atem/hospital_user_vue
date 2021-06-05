<template>
  <div>
    <el-card class="box-card">
      <h3>云智就医平台</h3>
<!--      走马灯内容-->
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item, index) in imgList" :key="index + ''">
          <img :src="item.url">
        </el-carousel-item>
      </el-carousel>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>位置介绍</span>
            </div>
            <div class="text-msg">
              <p>中文名称: xx医院</p>
              <p>地理位置: xxx市xxx区xxx园1号</p>
              <p>成立时间: 1921年</p>
              <p>医院: 等级三级甲等</p>
              <p>医院院训: 严谨求精 勤奋奉献</p>
              <p>分院地址: xxx市xxx区xxxx胡同xx号</p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>信息介绍</span>
            </div>
            <div class="text-msg text-info">
              <p>
                xx医院是一所位于北京市东城区，集医疗、科研、教学为一体的大型综合医院。
              </p>
              <p>
                它隶属于xxx医科大学(2006年改为xxx医学院/xxx医学部)，是其临床医学院，
                同时也是xxx科学院的临床医学研究所，xxx国卫生部指定的诊治疑难重症的技术
                指导中心之一。
              </p>
              <p>
                xxx医院在中国乃至世界享有盛名。
                医院成立于1921年。现任院长赵玉沛。
                xx医院是中国最早承担外宾医疗任务的单位，医院专门设立外宾和高干门诊部，开设专门的
                高干、外宾、特需病区。20xx年7月2x日被xxx奥委会定为“国家队运动员医疗服务指定医院”。
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>联系方式</span>
            </div>
            <div class="text-msg">
              <p>官网: https://www.xxxx.cn/</p>
              <p>服务热线: 010-12345678</p>
              <p>电话预约: xx-xxxxxxxxx</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        dialogVisible: true,
        imgList: [
          {
            url: 'https://img.redocn.com/sheying/20160810/weifangshizhongyiyuansheyingtu_6641311.jpg'
          },
          {
            url: 'https://img.redocn.com/sheying/20180502/yiyuandalouzhengmiangaoqingtupiansucai_9381745.jpg'
          },
          {
            url: 'https://img.redocn.com/sheying/20180629/caisedeyiyuanxiuxiyi_9513747.jpg'
          }
            ]
      }
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .text-msg {
    text-align:left;
  }
  .text-info {
    text-indent:34px
  }
</style>
