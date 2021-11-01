<template>
  <div class="projectDetail">
    <div class="back" @click="$router.back()">
      <van-icon name="arrow-left" />
    </div>
    <div class="title">{{dataInfo.projectName}}</div>
    <div class="info-wrapper">
      <div class="info-title">申请对象</div>
      <div class="info-content">{{dataInfo.applicationObject}}</div>
    </div>
    <div class="info-wrapper">
      <div class="info-title">申请条件</div>
      <div class="info-content">{{dataInfo.applicationCondition}}</div>
    </div>
    <div class="info-wrapper">
      <div class="info-title">补贴标准及期限</div>
      <div class="info-content">{{dataInfo.subsidyDescription}}</div>
    </div>
    <div class="info-wrapper">
      <div class="info-title">注意事项</div>
      <div class="info-content">{{dataInfo.remark?dataInfo.remark:'无'}}</div>
    </div>
    <div class="info-wrapper">
      <div class="info-title">对应告知单</div>
      <div class="download-wrapper">
        <span>{{dataInfo.fileName}}</span>
        <a :href="dataInfo.fileUrl">点击下载</a>
      </div>
    </div>
  </div>

</template>

<script>
  import {getDetail} from "@/utils/api";

  export default {
    name: 'detail',
    data() {
      return {
        dataInfo: {}
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        let prm = {
          projectId:this.$route.query.id
        }
        getDetail(prm).then(res => {
          this.dataInfo = res.data.result
          document.title = this.dataInfo.projectName
        })
      }
    },
  }
</script>
<style lang="less">
  .projectDetail {
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    color: #333;
    font-size: 14px;

    .back{
      font-size: 20px;
      margin-bottom: 10px;
    }

    .title{
      padding: 0 0 20px 0;
      font-size: 20px;
      color: #000;
      font-weight: bold;
    }
    .info-wrapper{
      margin-bottom: 20px;
      padding: 20px 10px;
      border-radius: 10px;
      background: #d7efff;
      .info-title{
        font-weight: bold;
        font-size: 16px;
        color: #000;
        margin-bottom: 8px;
      }
      .info-content{
        font-size: 14px;
        line-height: 26px;
      }
      .download-wrapper{
        span{
          line-height: 26px;
          margin-right: 20px;
        }
      }
    }
  }
</style>
