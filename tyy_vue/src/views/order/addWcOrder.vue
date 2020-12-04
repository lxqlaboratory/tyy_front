<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="v_getPrice" style="width: 100%;" title="结算">
      <el-table
        :data="priceList"
        border
        fit
        highlight-current-row
        stripe
      >
        <el-table-column align="center" label="游客姓名" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.touName }}
          </template>
        </el-table-column>

        <!--<el-table-column align="center" label="游客身份" min-width="45">-->
          <!--<template slot-scope="scope">-->
            <!--{{ scope.row.ticketType }}-->
          <!--</template>-->
        <!--</el-table-column>-->

        <el-table-column align="center" label="应付价格" min-width="45">
          <template slot-scope="scope">
            {{ scope.row.setPrice }}
          </template>
        </el-table-column>
      </el-table>
      <br/>

      共计{{totalPrice}}元
      <el-button style="margin-left: 40%" type="primary" v-model="totalPrice">去支付</el-button>
    </el-dialog>

    <div class="o-title">旅游产品信息</div>
    <div style="padding-left:35px;width: 70%;min-height: 10vh;">
      <el-row :gutter="20">
        <el-col :span="8">
          <label>产品名:</label>
          <span>{{orderInfo.proName}}</span>
        </el-col>
        <el-col :span="8">
          <label>产品编号:</label>
          <span>{{orderInfo.proNum}}</span>
        </el-col>
        <el-col :span="8">
          <label>产品分类:</label>
          <span>{{orderInfo.proType}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <label>计划日期:</label>
          <span>{{orderInfo.travelDate}}</span>
        </el-col>
        <el-col :span="8">
          <label>行程天数:</label>
          <span>{{orderInfo.proDateNum}}天</span>
        </el-col>
        <el-col :span="8">
          <label>计划人数:</label>
          <span>{{orderInfo.plan.numLimit}}人</span>
        </el-col>
      </el-row>
    </div>

    <div>
      <div class="o-title">选择分销商</div>


      <div class="filter-container">
        <div class="filter-item">
          <label>分销商省份</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.province" maxlength="50"
                    placeholder="检索省份"></el-input>
        </div>
        <div class="filter-item">
          <label>分销商城市</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.city" maxlength="50"
                    placeholder="检索城市"></el-input>
        </div>
        <div class="filter-item">
          <label>分销商区(县)</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.region" maxlength="50"
                    placeholder="检索区域"></el-input>
        </div>
        <div class="filter-item">
          <label>分销商名称</label>
          <el-input style="margin-left: 15px; width: 300px" v-model="orderForm.unitName" maxlength="50"
                    placeholder="检索名称"></el-input>
        </div>
        <div class="filter-item">
          <el-button icon="el-icon-search" type="primary" style="width: 180px" @click="getList">查询</el-button>
        </div>
      </div>
      <el-divider></el-divider>
        <el-table
          :data="list.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
          stripe
          @row-click="clickRow"
          highlight-current-row>

          <el-table-column align="center" label="所属省" min-width="45">
            <template slot-scope="scope">
              {{ scope.row.province }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="所属市" min-width="45">
            <template slot-scope="scope">
              {{ scope.row.city }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="所属区" min-width="45">
            <template slot-scope="scope">
              {{ scope.row.region }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="分销商" min-width="45">
            <template slot-scope="scope">
              {{ scope.row.unitName }}
            </template>
          </el-table-column>


          <el-table-column align="center" label="操作" min-width="45" prop="disTel">
            <template slot-scope="scope">
              <el-button @click="selectDisBu(scope.row)" size="mini" type="primary">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="display: flex;align-items: center;justify-content: flex-start">
        <el-pagination
          :current-page.sync="query.currentPage"
          :page-size="query.pageSize"
          :total="list.length"
          background
          v-loading="onLoading"
          layout="prev, pager, next"
          style="margin-top: 15px;"/>

        <el-select style="margin-left:  5px;" v-model="query.pageSize">
          <el-option :value="10" label="10条/页"></el-option>
          <el-option :value="30" label="30条/页"></el-option>
          <el-option :value="50" label="50条/页"></el-option>
        </el-select>


        <el-button @click="export2Excel" icon="el-icon-document" style="margin-left: 15px" type="primary">导出游客列表
        </el-button>
      </div>
    </div>

    <div>
      <div class="o-title">订单信息</div>

      <!--<label>单个游客录入</label>-->
      <!--<div style="margin-left: 35px;">-->
        <!--<el-row :gutter="10" style="margin: 15px 0;">-->

          <!--<div-->
            <!--style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"-->
            <!--v-for="(item,index) in orderForm.touList">-->
            <!--<el-col :span="4">-->
              <!--<el-input placeholder="游客姓名" v-model="item.touName"></el-input>-->
            <!--</el-col>-->

            <!--<el-col :span="3">-->
              <!--<el-select placeholder="游客类型" :value="item.ticketType" clearable v-model="item.ticketType">-->
                <!--<el-option :key="item.id" :label="item.dataItemName" :value="item.id"-->
                           <!--v-for="item in ticketTypeList"></el-option>-->
              <!--</el-select>-->
            <!--</el-col>-->

            <!--<el-col :span="3">-->
              <!--<el-select :value="item.cerType" clearable v-model="item.cerType">-->
                <!--<el-option :key="cerItem.code" :label="cerItem.description" :value="cerItem.code"-->
                           <!--v-for="cerItem in cerTypeList"></el-option>-->
              <!--</el-select>-->
            <!--</el-col>-->

            <!--<el-col :span="5" prop="prop">-->
              <!--<el-input placeholder="证件号码" v-model="item.cerNum" maxlength=18-->
                        <!--onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></el-input>-->
            <!--</el-col>-->

            <!--<el-col :span="2">-->
              <!--<el-select :value="item.touSex" placeholder="选择性别" v-model="item.touSex">-->
                <!--<el-option :value="1" label="男"></el-option>-->
                <!--<el-option :value="0" label="女"></el-option>-->
              <!--</el-select>-->
            <!--</el-col>-->

            <!--<el-col :span="4">-->
              <!--<el-input placeholder="电话" v-model="item.phone"-->
                        <!--maxlength=11-->
                        <!--onkeyup="value=value.replace(/[^\d]/g,'')" ></el-input>-->
            <!--</el-col>-->

            <!--<div style="width: 85px;">-->
              <!--<el-button @click="orderForm.touList.splice(index,1)" type="danger" v-show="index!==0">删除-->
              <!--</el-button>-->
            <!--</div>-->

          <!--</div>-->
          <!--<el-button @click="orderForm.touList.push({-->
                        <!--touName: '',-->
                        <!--cerType: '',-->
                        <!--cerNum: '',-->
                        <!--touSex:'',-->
                        <!--phone:''-->
                    <!--})" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">单个录入游客-->
          <!--</el-button>-->

          <!--&lt;!&ndash;<el-col :span="2">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-button @click="saveEidt" type="primary">保存修改</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--</el-row>-->

      <!--</div>-->

      <label>批量游客录入</label>
      <div style="display: flex;align-items: center;justify-content: flex-start;width: 90%">
        <div style="display: flex;align-items: center">
          <el-input placeholder="请使用 空格 或者 ，或者 | 等符号分割数据类别，使用回车分割游客" style="width: 40vw" type="textarea"
                    v-model="textTourist"></el-input>
          <el-button @click="parserTourist" style="margin-left: 15px;" type="success">解析导入</el-button>
        </div>
      </div>

      <!--<order-new-tou :orderid="id_addTou" :tou-max="tou_max"></order-new-tou>-->

      <el-table :data="touristList.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)" border
                ref="mtable"
                stripe>
        <el-table-column type="selection"></el-table-column>

        <el-table-column align="center" label="游客姓名">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="游客性别">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.sex===1">男</el-tag>
            <el-tag type="warning" v-if="scope.row.sex===0">女</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="游客年龄">
          <template slot-scope="scope">{{scope.row.age}}</template>
        </el-table-column>
        <el-table-column align="center" label="证件类型">
          <template slot-scope="scope">{{scope.row.cerType}}</template>
        </el-table-column>
        <el-table-column align="center" label="证件号码">
          <template slot-scope="scope">{{scope.row.cerNum}}</template>
        </el-table-column>
        <el-table-column align="center" label="联系电话">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column align="center" label="备注">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <!--<el-table-column align="center" label="操作" width="350px">-->
        <!--<template slot-scope="scope">-->
        <!--<div>-->
        <!--<el-button @click="editTou(scope.row)" type="primary">编辑</el-button>-->
        <!--<el-button @click="delTou(scope.row.id)" type="danger">删除</el-button>-->
        <!--<el-button @click="editIsBlack(scope.row.id,1)" type="warning" v-if="scope.row.isBlack===0">拉黑</el-button>-->
        <!--<el-button @click="editIsBlack(scope.row.id,0)" type="success" v-if="scope.row.isBlack===1">恢复</el-button>-->
        <!--</div>-->

        <!--</template>-->
        <!--</el-table-column>-->

      </el-table>

      <el-row :gutter="10" style="margin: 15px;">
        <el-col :span="1">合计--:</el-col>
        <el-col :span="5">
        <span style="margin-right: 10px;" v-for="item in num_planChan">
          <label>{{item.name}}：</label>
          <span>{{item.num}}</span>人
        </span>
        </el-col>
        <el-col :span="6">
        <span style="margin-right: 10px;">
          <label>男：</label>
          <span>{{num_men}}</span>人
        </span>
          <span>
          <label>女：</label>
          <span>{{num_women}}</span>人
        </span>
        </el-col>
      </el-row>








      <div class="o-title">集合地点</div>
      <div style="margin-left: 35px;">
        <label>集合地点</label>
        <el-select :value="orderForm.locationId" v-model="orderForm.locationId" >
          <el-option :key="item.id" :label="item.locationName" :value="item.id"
                     v-for="item in locationList"></el-option>
        </el-select>
      </div>

      <!--<div class="o-title">订单备注</div>-->
      <!--<div style="margin-left: 35px;">-->
        <!--<el-input placeholder="请在此处填上游客集合时间地点、联系人及联系方式等资料" style="max-width: 80%;" type="textarea"-->
                  <!--v-model="orderForm.remark"></el-input>-->
      <!--</div>-->


      <div style="margin:35px;display: flex;align-items: center;justify-content: center;">
        <el-button @click="saveOrder" style="width: 500px;height: 50px;" type="success">保存订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {addWcOrder, getOrderDetail,getTourist} from "@/api/order"
  import {getCerTypes} from "@/api/tourist"
  import {getProTicList}from "@/api/production"
  import {showDisList,getDisCode} from "@/api/distribute"
  import selectCode from "@/views/order/selectCode"
  import LocationSelect from "@/views/com/locationSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  import OrderNewTou from '@/views/order/orderNewTou'
  export default {
    name: "addWcOrder",
    data() {
      return {
        textTourist: '',
        touristList:[],
        totalPrice:'',
        priceList:[],
        v_getPrice:false,
        ticketTypeList:[],
        options: [{
          value: '选项1',
          label: '成人'
        },{
          value: '选项2',
          label: '儿童'
        }],

        //编辑游客
        editForm: {},
        locationList:'',
        query: {
          disType: '',
          disName: '',
          disContactor: '',
          disTel: '',
          disProvince: '',
          disCity: '',
          disPhone:'',
          currentPage: 1,
          pageSize: 3
        },
        disList: [],
        //两边通用的
        planChargeList: [],

        orderForm: {
          touList:[
            {
              touName: '',
              cerType: '',
              cerNum: '',
              touSex: '',
              phone:''
            },
          ],
          unitId:'',
          province:'',
          city:'',
          region:'',
          proName:'',
          orderName:"",
          code:'',
          productId:'',
          date:'',
          secondDisId:'',
          disId:"",
          workerId:'',
          planId: '',
          positionCodeA:'',
          positionCodeB:'',
          positionCodeC:'',
          positionCodeD:'',
          locationId:'',
          chargeInfo: [],
          tourNum: 0
        },
        //不变的 用于展示的消息
        orderInfo: {},


      }
    },

    components: { OrderNewTou, LocationSelect, selectCode,priceShow,priceInput},
    created() {
      this.orderForm.planId = this.$route.query.planId
      this.initList()
      this.getList()
      // showDisList().then(res => {
      //   this.disList = res.WechatUnitList
      //   this.orderForm.positionCodeA = res.positionCodeA
      //   this.orderForm.workerId = res.workerId
      // }).catch(error => {
      // })
    },
    computed: {
      list: function() {
        return this.disList.filter(item => {
          let result = true
          if (this.query.disProvince)
            result &= (item.disProvince === this.query.disProvince)
          if (this.query.disCity)
            result &= (item.disCity === this.query.disCity)
          if (this.query.disName)
            result &= (item.disName.indexOf(this.query.disName) !== -1)
          if (this.query.disContactor)
            result &= (item.disContactor.indexOf(this.query.disContactor) !== -1)
          if (this.query.disTel)
            result &= (item.disTel.indexOf(this.query.disTel) === 0)
          if (this.query.disType)
            result &= (item.roleId === this.query.disType)
          if (this.query.disPhone)
            result &= (item.disPhone === this.query.disPhone)

          return result
        })
      }
    },

    methods: {
      //解析游客字符串  直接录入后台
      parserTourist() {
        this.onLoading = true
        getTourist(this.textTourist, this.orderid).then(res => {
          if(res.re===1){
            this.$message({
              type: "success",
              message: "解析成功",
              showClose: true,
            })
          }else{
            this.$message({type: 'error', message: res.data})
          }
          this.touristList = res.data
          this.orderForm.touListStr = JSON.stringify(this.touristList)
          console.log("aaa"+JSON.stringify(this.touristList))
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })

      },
      getList() {
        this.onLoading = true
        showDisList(this.orderForm).then(res => {
          this.disList = res.data.WechatUnitList
          this.orderForm.positionCodeA = res.data.positionCodeA
          this.orderForm.workerId = res.data.workerId
          this.onLoading = false
        }).catch(error => {
          this.onLoading = false
        })
      },
      changeLocation(){
        let locationItem=this.locationList.find(item=>(item.id===this.id))
        if(locationItem&&locationItem.locationTime){
          this.time=locationItem.locationTime
          this.changeTime()
        }
      },
      selectDisBu: function (item) {
        getDisCode(item.unitId).then(res =>{
          this.orderForm.positionCodeB = res.data.positionCodeB
          this.orderForm.positionCodeC = res.data.positionCodeC
          this.orderForm.secondDisId = res.data.disId
          this.orderForm.disId = res.data.disId
          this.orderForm.unitId = res.data.unitId
        }).then(() => {
        })

      },
      refreshPriceAndTouNum() {
        let touNum = 0
        let price = 0
        this.planChargeList.forEach(item => {
          if (item.touNum) {
            touNum += parseInt(item.touNum)
            if (item.realPrice)
              price += parseInt(item.realPrice) * parseInt(item.touNum)
          }

        })
        this.orderForm.touNum = touNum
        this.orderForm.price = price
      },

      selectingDis(item) {
        let tempArr
        this.orderForm.disId = item.id
        let tempDisItem = this.orderInfo.disList.find(disitem => (disitem.disTypeId === item.roleId))

        if (tempDisItem) {
          tempArr = this.orderInfo.disList.find(disitem => (disitem.disTypeId === item.roleId)).planCharge
        } else {
          tempArr = JSON.parse(this.orderInfo.defaultCharge)
        }


        tempArr.forEach(item => {
          item.touNum = 0
          item.realPrice = item.retPrice
        })
        this.planChargeList = tempArr
      },


      //保存订单
      saveOrder() {



        let result = true
        let message = ""
        //检查集合地点
        if (!this.orderForm.locationId || this.orderForm.locationId <= 0) {
          result = false
          message += "集合地点不能为空；"
        }
        //检查分销商是否选择
        if (!this.orderForm.disId || this.orderForm.disId <= 0) {
          result = false
          message += "分销商未选择；"
        }
        //检查游客是否解析
        if (!this.touristList|| this.touristList <= 0) {
          result = false
          message += "游客信息未解析；"
        }


        this.orderForm.code=this.orderForm.positionCodeA+this.orderForm.positionCodeB+this.orderForm.positionCodeC+""
        this.orderForm.orderName = this.orderForm.positionCodeD+this.orderForm.code

        // this.orderForm.collectTime=this.orderForm.collectTime.substr(0,5);
        // console.log(this.orderForm.collectTime);
        // console.log("时间：")

        // if (!this.orderForm.collectTime || this.orderForm.collectTime.length !== 5) {
        //   result = false
        //   message += "未选择集合时间；"
        // }

        // this.orderForm.chargeInfo = JSON.stringify(this.planChargeList)

        this.orderForm.touListStr = JSON.stringify(this.touristList)

        console.log(this.orderForm.touListStr.toString())


        if (result)
          addWcOrder(this.orderForm).then(res => {
            console.log(res)
            if(res.re===1){
              this.$message({
                type: "success",
                message: '保存成功'
              })
            }else{
              this.$message({type: 'error', message: res.data})
            }

            this.v_getPrice = true
            this.priceList = res.data.tourList
            this.totalPrice = res.data.totalPrice
          }).catch()
        else
          this.$message({
            type: 'error',
            message: message
          })
      },


      initList() {


        getCerTypes({type: 'CERTYPE'}).then(res => {
          this.cerTypeList = res
        }).catch(error => {
        })
        //初始化页面
        getOrderDetail(this.$route.query.planId).then(res => {
          this.orderInfo = res.data
          getProTicList(res.data.proId).then(res => {
            this.ticketTypeList = res.data
          }).catch(error => {
          })
          this.locationList = JSON.parse(res.data.locationList)
          this.orderForm.date = res.data.travelDate
          this.orderForm.positionCodeD = "D"+res.data.proId
          this.orderForm.productId = res.data.proId
          this.orderForm.proName = res.data.proName
            let tempArr = JSON.parse(this.orderInfo.proPlanCharge)
            tempArr.forEach(item => {

              item.touNum = 0
              item.realPrice = item.retPrice
            })
            this.planChargeList = tempArr
            // this.orderForm.disId = res.disId



        }).catch(error => {
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

  .el-table__body tr.current-row>td {
    color: #fff;
    background: rgba(66, 66, 66,0.66)!important;
  }
  label {
    white-space:nowrap;
  }

  .el-row {
    margin: 15px 25px 25px 25px;
    padding-bottom: 3px;
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

  .tmepdiv {
    label {
      font-size: 15px;
    }

    .tip {
      color: gray;
      font-size: 14px;
    }
  }


</style>
