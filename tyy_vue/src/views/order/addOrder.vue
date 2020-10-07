<template>
  <div class="app-container">
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

    <div v-if="orderInfo.serType===1">
      <div class="o-title">选择分销商</div>
      <div style="min-height: 15vh;">
        <select-dis :plandisTypeList="orderInfo.disList" @selectingDis="selectingDis"></select-dis>
      </div>
    </div>

    <div v-if="planChargeList.length>0">
      <div>
        <div class="o-title">结算类型</div>
        <div>
          <div class="tmepdiv"
               style="display: flex;align-items: center;margin-left: 35px;margin-top: 15px;"
               v-for="item in planChargeList">
            <label style="margin-right: 15px;">类型</label>

            <el-input disabled style="width: 100px;margin-right: 25px;" v-model="item.name"></el-input>

            <label style="min-width: 130px;">结算价         <span class="tip">(同行价):</span></label>
            <price-show :price="item.retPrice" style="width: 50px;margin-right: 10px;"></price-show>

<!--            <el-input disabled style="width: 150px;margin-right: 25px;" v-model="item.retPrice">-->
<!--              <template slot="append">元</template>-->
<!--            </el-input>-->
              <label style="min-width: 130px;">参考价 <span class="tip">(外报价):</span></label>
            <price-show :price="item.setPrice" style="width: 50px;margin-right: 10px;"></price-show>


            <!--            <el-input disabled style="width: 150px;margin-right: 25px;" v-model="item.setPrice">-->
<!--              <template slot="append">元</template>-->
<!--            </el-input>-->
            <label style="margin-right: 15px;">人数</label>
            <el-input @input="refreshPriceAndTouNum" style="width: 150px;margin-right: 25px;" type="number"
                      v-model.number="item.touNum">
              <template slot="append">人</template>
            </el-input>
            <label style="margin-right: 15px;">实际结算价格</label>
            <price-input @input="refreshPriceAndTouNum" style="width: 150px;margin-right: 25px;"  v-model="item.realPrice"></price-input>
<!--            <el-input @input="refreshPriceAndTouNum" style="width: 150px;margin-right: 25px;" type="number" v-model.number="item.realPrice">-->
<!--              <template slot="append">元</template>-->
<!--            </el-input>-->
          </div>
        </div>
      </div>


      <div class="o-title">订单信息</div>
      <div style="margin-left: 35px;">
        <el-row :gutter="20">
          <el-col :span="8">
            <label>人数合计</label>
            <span>{{orderForm.touNum}}人</span>
          </el-col>
          <el-col :span="8">
            <label>应收分销商:</label>
            <price-show :price="orderForm.price" style="color: black"></price-show>
          </el-col>
        </el-row>
        <div>
        <label>定金:</label>
        <price-input style="width: 150px;" v-model="orderForm.colPrice"></price-input>
<!--        <el-input style="width: 150px;" type="number" v-model.number="orderForm.colPrice">-->
<!--          <span slot="append">元</span>-->
<!--        </el-input>-->
        </div>
      </div>

      <div class="o-title">集合地点</div>

      <location-select :locationid.sync="orderForm.locationId"
                       :locationtime.sync="orderForm.collectTime"></location-select>


      <div class="o-title">订单备注</div>
      <div style="margin-left: 35px;">
        <el-input placeholder="请在此处填上游客集合时间地点、联系人及联系方式等资料" style="max-width: 80%;" type="textarea"
                  v-model="orderForm.remark"></el-input>
      </div>


      <div style="margin:35px;display: flex;align-items: center;justify-content: center;">
        <el-button @click="saveOrder" style="width: 500px;height: 50px;" type="success">保存订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {addOrder, getOrderDetail} from "@/api/order"
  import {getCerTypes} from "@/api/tourist"

  import selectDis from "@/views/order/selectDis"
  import LocationSelect from "@/views/com/locationSelect"
  import priceShow from '@/views/com/priceShow'
  import priceInput from '@/views/com/priceInput'
  export default {
    name: "addOrder",
    data() {
      return {
        //两边通用的
        planChargeList: [],

        orderForm: {
          collectTime: '',
          planId: '',
          disId: '',
          locationId: '',
          remark: '',
          price: 0,
          colPrice: 0,
          chargeInfo: [],
          touNum: 0
        },
        //不变的 用于展示的消息
        orderInfo: {},


      }
    },

    components: {LocationSelect, selectDis,priceShow,priceInput},
    created() {
      this.orderForm.planId = this.$route.query.planId
      this.initList()
    },

    methods: {
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
        this.orderForm.collectTime=this.orderForm.collectTime.substr(0,5);
        console.log(this.orderForm.collectTime);
        console.log("时间：")

        if (!this.orderForm.collectTime || this.orderForm.collectTime.length !== 5) {
          result = false
          message += "未选择集合时间；"
        }

        this.orderForm.chargeInfo = JSON.stringify(this.planChargeList)

        if (result)
          addOrder(this.orderForm).then(res => {
            console.log(res)
            this.$message({
              type: "success",
              message: '保存成功'
            })
            this.$router.push({name: 'orderList', params: {orderNum: res.toString(),action:'openTouList'}})
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
          this.orderInfo = res
          if (this.orderInfo.serType === 2) {
            let tempArr = JSON.parse(this.orderInfo.proPlanCharge)
            tempArr.forEach(item => {

              item.touNum = 0
              item.realPrice = item.retPrice
            })
            this.planChargeList = tempArr
            this.orderForm.disId = res.disId
          }


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
