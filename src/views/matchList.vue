<template>
  <div class="detail">
    <div class="back" @click="$router.back()">
      <van-icon name="arrow-left" />
    </div>
    <div @click="goToUrl(item)" class="show-item" v-for="item in listData" :key="item.projectId">
      <div class="item-title">{{item.projectName}}</div>
      <div class="amount-wrapper">
        <div class="average-amount">级别：{{item.regionLevel}}</div>
        <div class="high-amount">最高金额：{{item.subsidyAmount}}</div>
      </div>
    </div>
    <div class="no-content" v-if="!listData">根据你提交的条件，暂无符合的补贴政策。</div>
  </div>

</template>

<script>
  import {assessData} from "@/utils/api";
  import qs from 'qs'

  export default {
    name: 'detail',
    data() {
      return {
        listData: []
      }
    },
    mounted() {
      document.title = '可补贴政策'
      this.initData()
    },
    methods: {
      initData() {
        let prm = qs.parse(this.$route.query.info)
        console.log(prm)
        assessData(prm).then(res => {
          this.listData = res.data.result
        })
      },
      goToUrl(info){
        this.$router.push({
          path:'/projectDetail',
          query:{
            id: info.projectId
          }
        })
      }
    },
  }
</script>
<style lang="less">
  .detail {
    width: 100%;
    height: 100%;
    padding: 10px 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    .back{
      font-size: 20px;
      margin-bottom: 10px;
    }

    .show-item {
      padding: 15px;
      font-size: 14px;
      background: #d7efff;
      margin-bottom: 15px;
      border-radius: 10px;
      color: #333;

      .item-title {
        margin-bottom: 10px;
      }

      .amount-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .no-content {
      text-align: center;
    }
  }
</style>
