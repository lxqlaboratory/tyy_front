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
          <span>{{orderInfo.proTypeName}}</span>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <label>计划日期:</label>
          <span>{{orderInfo.travelDate?orderInfo.travelDate.substr(0,10):''}}</span>
        </el-col>
        <el-col :span="8">
          <label>行程天数:</label>
          <span>{{orderInfo.proDateNum}}天</span>
        </el-col>
        <el-col :span="8">
          <label>计划人数:</label>
          <span>{{orderInfo.planTouNum}}人</span>
        </el-col>
      </el-row>
    </div>

    <div>
      <div class="o-title">选择分销商</div>

        <el-table
          :data="list.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
          stripe
          highlight-current-row>

          <el-table-column align="center" label="分销商员工编号" min-width="45">
            <template slot-scope="scope">
              {{ scope.row.positionCode }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="员工姓名" min-width="45">
            <template slot-scope="scope">
              {{ scope.row.perName }}
            </template>
          </el-table-column>

          <el-table-column align="center" label="员工手机号" min-width="45">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>

        <el-table-column align="center" label="操作" min-width="45" prop="disTel">
          <template slot-scope="scope">
            <el-button @click="selectDisBu(scope.row)" size="mini" type="primary">选择</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page.sync="query.currentPage"
        :page-size="query.pageSize"
        :total="list.length"
        background
        layout="prev, pager, next"
        style="margin-top: 15px;"/>
    </div>

    <div>
      <!--<div>-->
      <!--<div class="o-title">结算类型</div>-->
      <!--<div>-->
      <!--<div class="tmepdiv"-->
      <!--style="display: flex;align-items: center;margin-left: 35px;margin-top: 15px;"-->
      <!--v-for="item in planChargeList">-->
      <!--<label style="margin-right: 15px;">类型</label>-->

      <!--<el-input  style="width: 100px;margin-right: 25px;" v-model="item.name"></el-input>-->

      <!--<label style="min-width: 130px;">结算价<span class="tip">(同行价):</span></label>-->
      <!--<price-show :price="item.retPrice" style="width: 50px;margin-right: 10px;"></price-show>-->

      <!--<label style="min-width: 130px;">参考价<span class="tip">(外报价):</span></label>-->
      <!--<price-show :price="item.setPrice" style="width: 50px;margin-right: 10px;"></price-show>-->

      <!--<label style="margin-right: 15px;">人数</label>-->
      <!--<el-input @input="refreshPriceAndTouNum" style="width: 150px;margin-right: 25px;" type="number"-->
      <!--v-model.number="item.touNum">-->
      <!--<template slot="append">人</template>-->
      <!--</el-input>-->
      <!--<label style="margin-right: 15px;">实际结算价格</label>-->
      <!--<price-input @input="refreshPriceAndTouNum" style="width: 150px;margin-right: 25px;"  v-model="item.realPrice"></price-input>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->


      <div class="o-title">订单信息</div>
      <div style="margin-left: 35px;">
        <el-row :gutter="10" style="margin: 15px 0;">
          <el-button @click="orderForm.touList.push({
                        touName: '',
                        cerType: '',
                        cerNum: '',
                        touSex:'',
                        phone:''
                    })" icon="el-icon-circle-plus-outline" style="margin:0 0 15px 15px;" type="primary">添加游客
          </el-button>
          <div
            style="width:100%;display: flex;align-items: center;justify-content: space-between;margin-bottom: 10px;"
            v-for="(item,index) in orderForm.touList">
            <el-col :span="4">
              <el-input placeholder="游客姓名" v-model="item.touName"></el-input>
            </el-col>

            <el-col :span="3">
              <el-select placeholder="游客类型" :value="item.ticketType" clearable v-model="item.ticketType">
                <el-option :key="item.id" :label="item.dataItemName" :value="item.id"
                           v-for="item in ticketTypeList"></el-option>
              </el-select>
            </el-col>

            <el-col :span="3">
              <el-select :value="item.cerType" clearable v-model="item.cerType">
                <el-option :key="cerItem.code" :label="cerItem.description" :value="cerItem.code"
                           v-for="cerItem in cerTypeList"></el-option>
              </el-select>
            </el-col>

            <el-col :span="5" prop="prop">
              <el-input placeholder="证件号码" v-model="item.cerNum" maxlength=18
                        onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"></el-input>
            </el-col>

            <el-col :span="2">
              <el-select :value="item.touSex" placeholder="选择性别" v-model="item.touSex">
                <el-option :value="1" label="男"></el-option>
                <el-option :value="0" label="女"></el-option>
              </el-select>
            </el-col>

            <el-col :span="4">
              <el-input placeholder="电话" v-model="item.phone"
                        maxlength=11
                        onkeyup="value=value.replace(/[^\d]/g,'')" ></el-input>
            </el-col>

            <div style="width: 85px;">
              <el-button @click="orderForm.touList.splice(index,1)" type="danger" v-show="index!==0">删除
              </el-button>
            </div>

          </div>


          <!--<el-col :span="2">-->
          <!--<el-button @click="saveEidt" type="primary">保存修改</el-button>-->
          <!--</el-col>-->
        </el-row>

      </div>

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
  import {addWcOrderByDis, getOrderDetail} from "@/api/order"
  import {getCerTypes} from "@/api/tourist"
  import {getPlanTicList}from "@/api/production"
  import {showSecDisList,getDisCode} from "@/api/distribute"
  import selectCode from "@/views/order/selectCode"
  import LocationSelect from "@/views/com/locationSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  export default {
    name: "addDisOrder",
    data() {
      return {
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

    components: {LocationSelect, selectCode,priceShow,priceInput},
    created() {
      this.orderForm.planId = this.$route.query.planId
      this.initList()
      showSecDisList().then(res => {
        this.disList = res.yewuyuanList
        this.orderForm.workerId = res.workerId
        this.orderForm.positionCodeB = res.positionCodeB
        this.orderForm.disId = res.workerId
        this.orderForm.region = res.region
      }).catch(error => {
      })
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
      changeLocation(){
        let locationItem=this.locationList.find(item=>(item.id===this.id))
        if(locationItem&&locationItem.locationTime){
          this.time=locationItem.locationTime
          this.changeTime()
        }
      },
      selectDisBu: function (item) {
          this.orderForm.positionCodeC = item.positionCode
          this.orderForm.secondDisId = item.adminId
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

        this.orderForm.touListStr = JSON.stringify(this.orderForm.touList)

        console.log(this.orderForm.touListStr.toString())


        if (result)
          addWcOrderByDis(this.orderForm).then(res => {
            console.log(res)
            this.$message({
              type: "success",
              message: '保存成功'
            })
        this.v_getPrice = true
            this.priceList = res.tourList
            this.totalPrice = res.totalPrice
          }).catch()
        else
          this.$message({
            type: 'error',
            message: message
          })
      },


      initList() {

        this.orderForm.planId = this.$route.query.planId
        getCerTypes({type: 'CERTYPE'}).then(res => {
          this.cerTypeList = res
        }).catch(error => {
        })
        //初始化页面
        getOrderDetail(this.$route.query.planId).then(res => {
          this.orderInfo = res
          getPlanTicList(this.orderForm.planId).then(res => {
            this.ticketTypeList = res
          }).catch(error => {
          })
          this.locationList = JSON.parse(res.locationList)
          this.orderForm.date = res.travelDate
          this.orderForm.positionCodeD = "D"+res.disId
          this.orderForm.productId = res.disId
          this.orderForm.proName = res.proName
          let tempArr = JSON.parse(this.orderInfo.proPlanCharge)
          tempArr.forEach(item => {

            item.touNum = 0
            item.realPrice = item.retPrice
          })
          this.planChargeList = tempArr
          this.orderForm.disId = res.disId



        }).catch(error => {
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
