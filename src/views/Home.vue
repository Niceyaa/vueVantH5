<template>
  <div class="home">
    <div class="condition-item">
      <div class="item-label item-input-label"><span>*</span>姓名</div>
      <div class="item-right input-item-right">
        <van-field
          v-model="userName"
          name="姓名"
          placeholder="请填写姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
      </div>
    </div>
    <div class="condition-item">
      <div class="item-label item-input-label">公司名称</div>
      <div class="item-right input-item-right">
        <van-field
          v-model="enterpriseName"
          name="公司名称"
          placeholder="请填写公司名称"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </div>
    </div>
    <div class="condition-item">
      <div class="item-label item-input-label"><span>*</span>电话</div>
      <div class="item-right input-item-right">
        <van-field
          v-model="tel"
          name="电话"
          placeholder="请填写电话号码"
          :rules="[{ required: true, message: '请填写电话号码' }]"
        />
      </div>
    </div>
    <div class="condition-item">
      <div class="item-label"><span>*</span>组织类型</div>
      <div class="item-right" @click="applyObjFlag = true">{{applyInfo.value?applyInfo.value:'请选择'}}</div>
    </div>
    <!--<div class="condition-item">
      <div class="item-label">补贴类型</div>
      <div class="item-right" @click="projectTypeFlag = true">{{projectTypeInfo.value?projectTypeInfo.value:'请选择'}}
      </div>
    </div>-->
    <div class="condition-item">
      <div class="item-label"><span>*</span>注册日期</div>
      <div class="item-right" @click="registerDateFlag = true">{{registerDate?lcgFormatDate(registerDate):'请选择'}}</div>
    </div>
    <div class="condition-item">
      <div class="item-label">公司注册地</div>
      <div class="item-right" @click="registerAreaFlag = true">{{registerAreaInfo.value?registerAreaInfo.value:'请选择'}}
      </div>
    </div>
    <div class="condition-item">
      <div class="item-label">公司经营地</div>
      <div class="item-right" @click="businessAreaFlag = true">{{businessAreaInfo.value?businessAreaInfo.value:'请选择'}}
      </div>
    </div>
    <div class="condition-item">
      <div class="item-label"><span>*</span>创始人户籍</div>
      <div class="item-right" @click="censusRegisterTypeFlag = true">
        {{censusRegisterTypeInfo.value?censusRegisterTypeInfo.value:'请选择'}}
      </div>
    </div>
    <div class="condition-item">
      <div class="item-label">本市户籍职工社保人数(月均)</div>
      <div class="item-right" @click="socialSecurityNumberListFlag = true">
        {{socialSecurityNumberListInfo.value?socialSecurityNumberListInfo.value:'请选择'}}
      </div>
    </div>
    <div class="assessment-btn" @click="goToUrl">立即评估</div>

    <!--组织类型-->
    <van-popup v-model="applyObjFlag" round position="bottom">
      <van-picker
        value-key="value"
        title="组织类型"
        show-toolbar
        :columns="applyData"
        @confirm="onApplyConfirm"
        @cancel="onApplyCancel"
      />
    </van-popup>

    <!--补贴类型-->
    <van-popup v-model="projectTypeFlag" round position="bottom">
      <van-picker
        title="补贴类型"
        value-key="value"
        show-toolbar
        :columns="projectType"
        @confirm="onProjectConfirm"
        @cancel="onProjectCancel"
      />
    </van-popup>

    <!--注册日期-->
    <van-popup v-model="registerDateFlag" round position="bottom">
      <van-datetime-picker
        v-model="registerDate"
        type="date"
        :min-date="minRegisterDate"
        :max-date="maxRegisterDate"
        title="选择注册日期"
        @confirm="dateConfirm"
        @cancel="dateCancel"
        @change="dateChange"
      />
    </van-popup>

    <!--公司注册地-->
    <van-popup v-model="registerAreaFlag" round position="bottom">
      <van-picker
        title="公司注册地"
        value-key="value"
        show-toolbar
        :columns="registerArea"
        @confirm="onRegisterAreaConfirm"
        @cancel="onRegisterAreaCancel"
      />
    </van-popup>

    <!--公司经营地-->
    <van-popup v-model="businessAreaFlag" round position="bottom">
      <van-picker
        title="公司经营地"
        value-key="value"
        show-toolbar
        :columns="registerArea"
        @confirm="onBusinessAreaConfirm"
        @cancel="onBusinessAreaCancel"
      />
    </van-popup>

    <!--创始人户籍-->
    <van-popup v-model="censusRegisterTypeFlag" round position="bottom">
      <van-picker
        title="创始人户籍"
        value-key="value"
        show-toolbar
        :columns="censusRegisterType"
        @confirm="onCensusRegisterTypeConfirm"
        @cancel="oCensusRegisterTypeCancel"
      />
    </van-popup>

    <!--社保人数-->
    <van-popup v-model="socialSecurityNumberListFlag" round position="bottom">
      <van-picker
        title="社保人数"
        value-key="value"
        show-toolbar
        :columns="socialSecurityNumberList"
        @confirm="onSocialSecurityNumberListConfirm"
        @cancel="onSocialSecurityNumberListCancel"
      />
    </van-popup>

  </div>

</template>

<script>
  import {getEnumData} from "@/utils/api";
  import {lcgFormatDate} from "@/utils/commonFn";
  import qs from 'qs'

  export default {
    name: 'Home',
    data() {
      return {
        enterpriseName: null,
        userName: null,
        tel: null,

        applyData: [],
        applyObjFlag: false,
        applyInfo: {},

        projectType: [],
        projectTypeFlag: false,
        projectTypeInfo: {},

        censusRegisterType: [],
        censusRegisterTypeFlag: false,
        censusRegisterTypeInfo: {},

        registerArea: [],
        registerAreaFlag: false,
        registerAreaInfo: {},

        socialSecurityNumberList: [],
        socialSecurityNumberListFlag: false,
        socialSecurityNumberListInfo: {},

        businessAreaFlag: false,
        businessAreaInfo: {},

        registerDate: new Date(),
        registerDateFlag: false,
        minRegisterDate: new Date(1990, 0, 1),
        maxRegisterDate: new Date(),

      }
    },
    mounted() {
      document.title = '政策试算'
      this.initData()
    },
    methods: {
      initData() {
        getEnumData().then(res => {
          const {result} = res.data
          this.applyData = result.applicationObject
          this.projectType = result.subsidyType
          this.censusRegisterType = result.registeredResidenceList
          this.registerArea = result.regionList
          this.socialSecurityNumberList = result.socialSecurityNumberList
        })
      },
      //组织类型
      onApplyConfirm(value, index) {
        this.applyInfo = value
        this.applyObjFlag = false
      },
      onApplyCancel() {
        this.applyObjFlag = false
      },
      //补贴类型
      onProjectConfirm(value, index) {
        this.projectTypeInfo = value
        this.projectTypeFlag = false
      },
      onProjectCancel() {
        this.projectTypeFlag = false
      },
      //注册日期
      dateConfirm(value) {
        this.registerDate = lcgFormatDate(value)
        this.registerDateFlag = false
      },
      dateChange() {
        this.registerDate = lcgFormatDate(this.registerDate)
      },
      lcgFormatDate(value){
        return lcgFormatDate(value)
      },
      dateCancel() {
        this.registerDateFlag = false
      },
      //注册地
      onRegisterAreaConfirm(value) {
        this.registerAreaInfo = value
        console.log(value, this.registerAreaInfo)
        this.registerAreaFlag = false
      },
      onRegisterAreaCancel() {
        this.registerAreaFlag = false
      },
      //经营地
      onBusinessAreaConfirm(value) {
        this.businessAreaInfo = value
        console.log(value, this.businessAreaInfo)
        this.businessAreaFlag = false
      },
      onBusinessAreaCancel() {
        this.businessAreaFlag = false
      },
      //创始人户籍
      onCensusRegisterTypeConfirm(value) {
        this.censusRegisterTypeInfo = value
        this.censusRegisterTypeFlag = false
      },
      oCensusRegisterTypeCancel() {
        this.censusRegisterTypeFlag = false
      },
      //社保人数
      onSocialSecurityNumberListConfirm(value) {
        this.socialSecurityNumberListInfo = value
        this.socialSecurityNumberListFlag = false
      },
      onSocialSecurityNumberListCancel() {
        this.socialSecurityNumberListFlag = false
      },
      goToUrl() {
        if (!this.userName || this.userName.trim().length <= 0) {
          this.$toast('请填写姓名');
          return
        }
        if (!this.tel || this.tel.trim().length <= 0) {
          this.$toast('请填写电话号码');
          return
        }
        if (!this.applyInfo.value) {
          this.$toast('请选择组织类型');
          return
        }
        if (!this.registerDate) {
          this.$toast('请选择注册日期');
          return
        }
        if (!this.censusRegisterTypeInfo.value) {
          this.$toast('请选择创始人户籍');
          return
        }
        const prm = {
          "applicationObject": this.applyInfo.value ? this.applyInfo.id : null,
          "businessPlace": this.businessAreaInfo.value ? this.businessAreaInfo.id : null,
          "personnelSize": this.socialSecurityNumberListInfo.value ? this.socialSecurityNumberListInfo.id : null,
          "projectType": this.projectTypeInfo.value ? this.projectTypeInfo.id : null,
          "registerPlace": this.registerAreaInfo.value ? this.registerAreaInfo.id : null,
          "registerTime": this.registerDate ? this.registerDate : null,
          "registeredResidence": this.censusRegisterTypeInfo.value ? this.censusRegisterTypeInfo.id : null,
          "enterpriseName": this.enterpriseName,
          "telephone": this.tel,
          "name": this.userName,
        }
        this.$router.push({
          path: '/matchList',
          query: {
            info: qs.stringify(prm)
          }
        })
      }
    },
  }
</script>
<style lang="less">
  .home {
    width: 100%;
    height: 100%;

    .condition-item {
      border-bottom: 1px solid #eee;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 14px;
      font-family: "Microsoft YaHei UI";
      color: #333;

      .item-label {
        min-width: 100px;
        flex: 0 100px;
        span{
          color: red;
        }
        &.item-input-label{
          min-width: 70px;
          flex: 0 70px;
        }
      }

      .item-right {
        &.input-item-right{
          flex: 1;
        }
        .van-field {
          padding: 10px 0;
        }
      }
    }

    .assessment-btn {
      width: 68%;
      margin: 15px 0 0 16%;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 14px;
      background: #1989fa;
      color: #fff;
      border-radius: 4px;
    }
  }
</style>
