<template>
  <div class="app-container">
    <div class="head">
      <span style="font-weight: bold;font-size: 20px;">产品详情----{{productInfo.name}} </span>
      <div>
        <el-button type="primary" @click="$router.push({name: 'AddTeamProduction', query: {id:productInfo.id}})">修改产品</el-button>
        <el-button type="warning" @click="addOrder(productInfo.id,productInfo.planList[0].id)">录入订单</el-button>
        <el-button type="success" @click="exportTravel(productInfo.id)">导出行程</el-button>
      </div>
    </div>

    <el-divider></el-divider>

    <div class="o-title">
      产品基本信息
    </div>

    <div class="p-info">
      <el-carousel height="300" style="width: 38%;border-radius: 5px;">
        <el-carousel-item :key="item.id" style=" background-color: gray;color: white;text-align: center;"
                          v-for="item in productInfo.imageIndexList">
          <el-image :src="item.url" style="height: 300px" fit="contain"></el-image>
        </el-carousel-item>
      </el-carousel>

      <div class="info-content">
        <div class="info-item">
          <span class="info-item-title">产品编号</span>
          <span class="info-item-value">{{productInfo.proNum}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">服务类型</span>
          <span class="info-item-value">{{productInfo.serType}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">产品类型</span>
          <span class="info-item-value">{{productInfo.proType_1}}--{{productInfo.proType_2}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">销售状态</span>
          <span class="info-item-value">
            <el-tag type="primary" v-if="productInfo.saleState">销售中</el-tag>
                <el-tag type="danger" v-else>暂停销售</el-tag>
          </span>
        </div>

        <div class="info-item">
          <span class="info-item-title">行程天数</span>
          <span class="info-item-value">{{productInfo.proDateNum}}天</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">创建时间</span>
          <span class="info-item-value">{{productInfo.createTime}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">预计收客</span>
          <span class="info-item-value">{{productInfo.planTouNum}}人</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">出发日期</span>
          <span class="info-item-value">{{productInfo.travelDate}}</span>
        </div>

        <div class="info-item" style="width: 100%">
          <span class="info-item-title">主要景点</span>
          <span class="info-item-value">{{productInfo.proScene}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">特色属性</span>
          <span class="info-item-value">
            <el-tag style="margin: 0 15px 0 0;" type="success" v-for="item in productInfo.proAtts">
              {{item}}
            </el-tag>
          </span>
        </div>


        <div class="info-item" style="width: 100%;display: flex;align-items: flex-start;justify-content: flex-start;">
          <span class="info-item-title">销售端口</span>
          <pro-select-dis style="flex-grow: 1" v-model="productInfo.disId" :disselect="false"></pro-select-dis>
        </div>


      </div>
    </div>


    <div class="o-title">
      结算信息
    </div>

    <div style="margin-top: 15px;margin-left: 35px;">

      <div style="display: flex;align-items: center;justify-content: flex-start;margin: 10px 0"
           v-for="(item,index) in planCharge">
        <div  style="margin-right: 5px;">
          <label>结算类型</label>
          <el-input style="width: 75px;" disabled v-model="item.name"></el-input>
        </div>
        <div  style="margin-right: 5px;">
          <label>结算价格</label>
<!--          <el-input style="width: 150px;" disabled v-model.number="item.retPrice">-->
<!--            <template slot="append">元</template>-->
          <price-input style="width: 150px;" disabled v-model="item.retPrice"></price-input>
          </el-input>
        </div>

        <div  style="margin-right: 5px;">
          <label>参考价格</label>
<!--          <el-input style="width: 150px;" disabled v-model.number="item.setPrice">-->
<!--            <template slot="append">元</template>-->
<!--          </el-input>-->
          <price-input style="width: 150px;" disabled v-model="item.setPrice"></price-input>
        </div>
        <div  style="margin-right: 5px;">
          <label>年龄范围</label>
          <el-input style="width: 120px;" disabled v-model.number="item.minAge">
            <template slot="append">岁</template>
          </el-input>
          -
          <el-input style="width: 120px;" disabled v-model.number="item.maxAge">
            <template slot="append">岁</template>
          </el-input>
        </div>

      </div>

      <div>
        <label>项目备注</label>
        <el-input placeholder="此处可填写航班信息或价格说明等，不填请留空，最多20字" disabled v-model="productInfo.planChargeDes"></el-input>
      </div>



    </div>




    <div class="o-title">
      产品特色
    </div>

    <div class="pro-info-content">
      {{productInfo.proDes}}
    </div>


    <div class="o-title">
      行程安排
    </div>

    <pro-travel :jsonData="productInfo.proTraDetail"></pro-travel>

    <div class="o-title">
      服务项目
    </div>
    <div class="pro-info-content">
      {{productInfo.proServer}}
    </div>


    <div class="o-title">
      注意事项
    </div>
    <div class="pro-info-content">
      {{productInfo.proAution}}
    </div>


    <div class="o-title">
      友情提示
    </div>
    <div class="pro-info-content">
      {{productInfo.proNotice}}
    </div>

    <div class="o-title">
      自费与购物
    </div>

    <div class="pro-info-content">

      {{productInfo.proBuy}}
    </div>




    <div class="o-title">
      参考车型
    </div>

    <div class="pro-info-content">


      <el-tag v-for="item in productInfo.proCarTypes" type="primary" style="text-indent: 0 !important;margin-right: 5px">
        {{item.name}}
      </el-tag>
    </div>


    <div class="o-title">
      团队报价
    </div>
    <div class="pro-info-content" style="   text-indent: 0em !important;">
      <label>报价信息</label>
      {{productInfo.proPriStan}}
      <br>
      <label>对外报价</label>
      {{productInfo.proOutPrice}}
      <br>
      <label>预估毛利</label>
      {{productInfo.proFit}}元
    </div>




    <div class="o-title">
      参考地接
    </div>

    <div class="pro-info-content" style="   text-indent: 0em !important;">
      <label>地接社地址</label>
      {{productInfo.agency.address}}
      <br>
      <label>地接社名称</label>
      {{productInfo.agency.name}}
      <br>
      <label>地接社电话</label>
      {{productInfo.agency.phone}}
      <br>
      <label>地接社传真</label>
      {{productInfo.agency.fax}}
      <br>
      <label>地接社QQ</label>
      {{productInfo.agency.QQ}}
      <br>
      <label>地接社联系人</label>
      {{productInfo.agency.contactor}}


    </div>

    <span style="color: gray">
     ps:参考菜单和参考宾馆 为富文本信息，请跳转至编辑页面查看。
    </span>


  </div>


</template>

<script>
  import {getProDetail,getOrderNumByPro} from "@/api/production"
  import proTravel from "@/views/production/proTravel"
  import proSelectDis from "@/views/production/proSelectDis"
  import priceInput from '@/views/com/priceInput'
  export default {
    name: "proTeamInfo",
    data() {
      return {
        planCharge:[],
        queryForm: {
          pageNum: 0,
          pageSize: 10,
          currentPage:1
        },
        //产品基本信息
        productInfo: {
          //地接社
          agency: {
            name: "",
            phone: "",
            fax: "",
            QQ: "",
            contactor: "",
            address: ""
          },
          planTouNum:'',
          travelDate:'',
          //服务类型
          serType: '',
          //创建时间
          createTime: "",
          //销售端口
          disList: [],
          //累计销售额
          earnNum: 0,
          //附件列表
          fileList: [],
          //产品ID
          id: '',

          //首页展示图
          imageIndexList: [],
//产品编号
          proNum: "",
          //产品名
          name: "",
          //受解析的 计划列表
          planList: [],
          //产品属性
          proAtts: [],
          //产品参考车型
          proCarTypes: [],
          //产品集结点
          proLocation: [],

          proState: 0,

          proType_1: 19,
          proType_2: 26,

          proAution: "",

          proBuy: "无",
          //行程数目
          proDateNum: 4,
          proDes: "",
          proHotel: "",


          proMenu: "",
          proNotice: "无",
//价格标准
          proPriStan: "",
          //景点列表
          proScene: "",
          //服务类型
          proServer: "",

          proTraDetail: "{}",
          proTravel: "",


          saleState: true,


          touNum: '',


        },
        //产品计划列表
        productPlan: []

      }
    },
    components:{proTravel,proSelectDis,priceInput},
    created() {
      let proId = this.$route.query.id
      getProDetail(proId).then(res => {
        res.agency = JSON.parse(res.agency)
        this.planCharge = JSON.parse(res.disList)
        this.productInfo = res
        console.log(this.planCharge)

        console.log(res)
      }).catch(error => {
      })
    },
    methods:{
      exportTravel(id){
        window.open(process.env.VUE_APP_PRINT_URL + 'export?id=' + id)
      },
      addOrder(id,planId){
          getOrderNumByPro(id).then(res=>{
              if (res>0){
                  this.$message({
                      type:"error",
                      message:'该产品已存在订单，请勿重复增加！'
                  })
              }
              if(res==0){
                  this.$router.push({name:'AddOrder',query:{planId:planId}})
              }
          });

      }
    }
  }
</script>

<style lang="scss" scoped>
  .pro-info-content {
    margin: 15px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 15px;
    line-height: 200%;
    color: black;
    font-size: 14px;
    text-indent: 1em;
    label{
      margin-right: 5px;
    }
  }

  .head {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .o-title {
    font-weight: bold;
    font-size: 19px;
    background-color: whitesmoke;
    border-radius: 3px;
    color: #333;
    border-left: 7px solid #62bbc3;
    margin: 10px 0 25px 0;
    padding: 8px 15px;
  }

  .p-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;

    .info-content {
      width: 58%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      align-content: flex-start;
      justify-content: flex-start;

      .info-item {
        margin: 10px 0;
        width: 33%;
        text-align: left;
        line-height: 150%;

        .info-item-title {
          font-size: 15px;
          color: gray;
          font-weight: bold;
          margin-right: 15px;
        }

        .info-item-value {
          color: black;
          font-size: 15px;
        }
      }
    }


  }

</style>
