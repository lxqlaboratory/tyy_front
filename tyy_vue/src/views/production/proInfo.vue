<template>
  <div class="app-container">
    <div class="head">
      <span style="font-weight: bold;font-size: 20px;">产品详情----{{productInfo.product.name}} </span>
      <div>

        <el-button type="primary" @click="$router.push({name: 'AddProduction', query: {id:productInfo.id}})">修改产品</el-button>
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
          <span class="info-item-value">{{productInfo.product.proNum}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">服务类型</span>
          <span class="info-item-value">{{productInfo.serType}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">产品类型</span>
          <span class="info-item-value">{{productInfo.proTypeName_1}}--{{productInfo.proTypeName_2}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">销售状态</span>
          <span class="info-item-value">
            <el-tag type="primary" v-if="productInfo.product.saleState">销售中</el-tag>
                <el-tag type="danger" v-else>暂停销售</el-tag>
          </span>
        </div>


        <div class="info-item">
          <span class="info-item-title">行程天数</span>
          <span class="info-item-value">{{productInfo.product.proDateNum}}天</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">创建时间</span>
          <span class="info-item-value">{{productInfo.createTime}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">累计收客</span>
          <span class="info-item-value">{{productInfo.tourNumOfPro}}人</span>
        </div>

        <!--<div class="info-item">-->
          <!--<span class="info-item-title">累计销售额</span>-->

          <!--<price-show class="info-item-value" :price="productInfo.product.earnNum"></price-show>-->


        <!--</div>-->

        <div class="info-item" style="width: 100%">
          <span class="info-item-title">主要景点</span>
          <span class="info-item-value">{{productInfo.product.proScene}}</span>
        </div>

        <div class="info-item">
          <span class="info-item-title">特色属性</span>
          <span class="info-item-value">
            <el-tag style="margin: 0 15px 0 0;" type="success" v-for="item in productInfo.proAtts">
              {{item}}
            </el-tag>
          </span>
        </div>


        <!--<div class="info-item" style="width: 100%">-->
          <!--<span class="info-item-title">销售端口</span>-->
          <!--<el-popover-->
            <!--placement="right" style="margin:0 5px 15px 0;display:inline-block;"-->
            <!--trigger="click"-->
            <!--v-for="item in productInfo.disList"-->
            <!--width="400">-->
            <!--<div>-->
              <!--<el-table :data="item.planCharge"-->
                        <!--highlight-current-row-->
                        <!--stripe-->
                       <!--&gt;-->
                <!--<el-table-column prop="name" label="类型"></el-table-column>-->
                <!--<el-table-column prop="setPrice" label="结算价"></el-table-column>-->
                <!--<el-table-column prop="retPrice" label="参考价"></el-table-column>-->
              <!--</el-table>-->

            <!--</div>-->
            <!--<el-button size="mini" slot="reference"> {{item.roleName}}</el-button>-->
          <!--</el-popover>-->
        <!--</div>-->


      </div>
    </div>


    <div class="o-title">
      产品计划
    </div>

    <el-table
      :data="productInfo.planList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top: 15px;"
    >
      <el-table-column align="center" label="计划编号" min-width="10" prop="plan.planNum"></el-table-column>

      <el-table-column align="center" label="计划日期" min-width="10" prop="plan.travelDate"></el-table-column>

      <el-table-column align="center" label="订单数" min-width="10">
        <template scope="scope">
          已支付：{{scope.row.surOrderNum}}
          <br>
          未支付：{{scope.row.notSurOrderNum}}
          <br>
          <el-button type="text" @click="$router.push({name:'wechatorderList',query:{planNum:scope.row.planNum}})">查看订单</el-button>
        </template>
      </el-table-column>


    <el-table-column align="center" label="收客信息" min-width="10" >
        <template scope="scope">
          计划收客：{{scope.row.plan.seatNum}}
          <br>
          已收客：{{scope.row.plan.touNum}}
          <br>

        <el-popover
          placement="right" style="display:inline-block;"
          trigger="click"
          width="400">
          <div>
            <el-table :data="scope.row.disInfoList"
                      highlight-current-row
                      stripe>
              <el-table-column prop="province"  label="省份"></el-table-column>
              <el-table-column prop="city"  label="城市"></el-table-column>
              <el-table-column prop="disName" label="分销商"></el-table-column>
              <el-table-column prop="touNum" label="游客数"></el-table-column>
            </el-table>

          </div>
          <!--<el-link type="primary" slot="reference">游客来源分布</el-link>-->
        </el-popover>
        <el-button type="text" @click="$router.push({name:'wechatorderList',query:{planNum:scope.row.plan.planNum}})">查看</el-button>
      </template>
    </el-table-column>

      <el-table-column align="center" label="销售状态" min-width="10" prop="">
        <template scope="scope">
          <el-tag v-if="scope.row.plan.state===1" type="success">销售中</el-tag>
          <el-tag v-else type="info">已过期</el-tag>
        </template>

      </el-table-column>

      <el-table-column align="center" label="各端口结算详情" min-width="10">
        <template scope="scope">
          分销端口数：{{scope.row.disInfoList.length}}
          <br>


            <div>
              <el-popover
                placement="right" style="display:inline-block;"
                trigger="click"
                width="400">
                <div>
                  <el-table :data="scope.row.disInfoList"
                            highlight-current-row
                            stripe>
                    <el-table-column prop="disCity"  label="城市"></el-table-column>
                    <el-table-column prop="portName"  label="区域"></el-table-column>
                  </el-table>

                </div>
                <el-link type="primary" slot="reference">结算接口</el-link>
              </el-popover>
            </div>

        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" min-width="15">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="$router.push({name:'planList',query:{planNum:scope.row.plan.planNum}})">查看详情</el-button>
          <el-button type="success"  size="mini" @click="$router.push({name:'AddWcOrder',query:{planId:scope.row.plan.id}})">录入订单</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 40,100]"
      :page-size="pageSize"
      :total="productInfo.planList.length"
      style="margin-top: 15px;"
      background
      layout="sizes, prev, pager, next"/>



    <div class="o-title">
      产品特色
    </div>

    <div class="pro-info-content">
      {{productInfo.product.proDes}}
    </div>


    <div class="o-title">
      行程安排
    </div>

    <pro-travel :jsonData="productInfo.product.proTraDetail"></pro-travel>

    <div class="o-title">
      服务项目
    </div>
    <div class="pro-info-content">
      {{productInfo.product.proServer}}
    </div>


    <div class="o-title">
      注意事项
    </div>
    <div class="pro-info-content">
       {{productInfo.product.proAution}}
    </div>


    <div class="o-title">
      友情提示
    </div>
    <div class="pro-info-content">
      {{productInfo.product.proNotice}}
    </div>

    <div class="o-title">
      自费与购物
    </div>

    <div class="pro-info-content">

      {{productInfo.product.proBuy}}
    </div>


    <div class="o-title">
      参考车型
    </div>

    <div class="pro-info-content">


      <el-tag v-for="item in productInfo.proCarTypes" type="primary" style="text-indent: 0 !important;margin-right: 5px">
        {{item.typeName}}
      </el-tag>
    </div>
    <div class="o-title">
      价格标准
    </div>
    <div class="pro-info-content" style="   text-indent: 0em !important;">

      <label>散客成本</label>
      {{productInfo.product.saCost}}
      <br>
      <label>最低收客人数</label>
      {{productInfo.product.minTouNum}}


    </div>
    <div class="o-title">
      参考地接
    </div>

    <div class="pro-info-content" style="   text-indent: 0em !important;">
      <label>地接社地址</label>
      {{productInfo.product.agency.address}}
      <br>
      <label>地接社名称</label>
      {{productInfo.product.agency.name}}
      <br>
      <label>地接社电话</label>
      {{productInfo.product.agency.phone}}
      <br>
      <label>地接社传真</label>
      {{productInfo.product.agency.fax}}
      <br>
      <label>地接社QQ</label>
      {{productInfo.product.agency.QQ}}
      <br>
      <label>地接社联系人</label>
      {{productInfo.product.agency.contactor}}


    </div>

    <span style="color: gray">
     ps:参考菜单和参考宾馆 为富文本信息，请跳转至编辑页面查看。
    </span>


  </div>


</template>

<script>
  import {getProDetail} from "@/api/production"
  import proTravel from "@/views/production/proTravel"

  export default {
    name: "productionInfo",
    data() {
      return {
        // 当前页
        currentPage: 1,
        // 每页多少条
        pageSize: 5,
        // queryForm: {
        //   pageNum: 0,
        //   pageSize: 10,
        //   currentPage:1
        // },
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
          planList: {
            disInfoList:[],
            plan:{},
            notSurOrderNum:'',
            surOrderNum:''
          },
          //产品属性
          proAtts: [],
          //产品参考车型
          proCarTypes: [],
          //产品集结点
          proLocation: [],

          proState: 0,

          proTypeName_1: '',
          proTypeName_2: '',

          proAution: "",

          proBuy: "无",
          //行程数目
          proDateNum: '',
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

          serType: 1,

          touNum: '',
            minTouNum:0,
            saCost:'',


        },
        //产品计划列表
        productPlan: []

      }
    },
    components:{proTravel},
    created() {
      let proId = this.$route.query.id
      getProDetail(proId).then(res => {
        // res.agency = JSON.parse(res.data.product.agency)
        // console.log("111"+res.data.product.agency)
        // res.disList = JSON.parse(res.disList);
        // res.disList.forEach(data=>{
        //     data.planCharge.forEach(tData=>{
        //         if (tData.retPrice){
        //             tData.retPrice/=100;
        //         }
        //         if (tData.setPrice){
        //             tData.setPrice/=100;
        //         }
        //     })
        // });
        this.productInfo = res.data
        this.productInfo.product.proNum = res.data.product.proNum
        this.proNum = res.data.product.proNum
          console.log("this.productInfo.product.proNum:"+this.productInfo.product.proNum)
        console.log("proNum"+this.proNum)

      }).catch(error => {
      })

    },
    methods:{
      // 每页多少条
      handleSizeChange(val) {
        this.pageSize = val;
      },
      // 当前页
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      exportTravel(id){
        window.open(process.env.VUE_APP_PRINT_URL + 'export?id=' + id)
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
          min-width: 500px;
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
