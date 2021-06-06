<template>
  <div>
    <el-card class="box-card">
      <h3>“医”路有你——基于云平台的乡村医疗服务系统</h3>
      <!--      走马灯内容-->
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item, index) in imgList" :key="index + ''">
          <iframe style="width: 100%; height: 100%"  :src="item.url"></iframe>
        </el-carousel-item>
      </el-carousel>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>每日关注</span>
            </div>
            <div class="text-msg text-info">
              <p>
                急性呼吸道异物堵塞在生活中并不少见，由于气道堵塞后患者无法进行呼吸，故可能致人因缺氧而意外死亡。
              </p>
              <p>
                海姆里克腹部冲击法（Heimlich Maneuver）也称为海氏手技，是美国医生海姆里克先生发明的。
              </p>
              <p>
                救者首先以前腿弓，后腿登的姿势站稳，然后使患者坐在自己弓起的大腿上，并让其身体略前倾。
              </p>
              <p>
                然后将双臂分别从患者两腋下前伸并环抱患者。左手握拳，右手从前方握住左手手腕，使左拳虎口贴在患者胸部下方，
                肚脐上方的上腹部中央，形成“合围”之势，然后突然用力收紧双臂，用左拳虎口向患者上腹部内上方猛烈施压，迫使其上腹部下陷。
                这样由于腹部下陷，腹腔内容上移，迫使膈肌上升而挤压肺及支气管，这样每次冲击可以为气道提供一定的气量，
                从而将异物从气管内冲出。施压完毕后立即放松手臂，然后再重复操作，直到异物被排出。
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>医院介绍</span>
            </div>
            <div class="text-msg text-info">
              <p>
                xx医院是一所位于xx市xx区，集医疗、科研、教学为一体的大型综合医院。
              </p>
              <p>
                它隶属于xxx医科大学(20xx年改为xxx医学院/xxx医学部)，是其临床医学院，
                同时也是xxx科学院的临床医学研究所，xxx国卫生部指定的诊治疑难重症的技术 指导中心之一。
              </p>
              <p>
                xxx医院在中国乃至世界享有盛名。 医院成立于19xx年。现任院长赵玉沛。
                xx医院是中国最早承担外宾医疗任务的单位，医院专门设立外宾和高干门诊部，
                开设专门的 高干、外宾、特需病区。20xx年7月2x日被xxx奥委会定为“国家队运动员医疗服务指定医院”。
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
              <p>服务热线: 010-12345678</p>
              <p>客服电话: xx-xxxxxxxxx</p>
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
          url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4'
        },
        {
          url: 'http://47.107.64.157/blog/20210606/4b3f1622967770291.jpg'
        },
        {
          url: 'https://v-cdn.zjol.com.cn/277001.mp4'
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
  text-align: left;
}

.text-info {
  text-indent: 34px
}
</style>
