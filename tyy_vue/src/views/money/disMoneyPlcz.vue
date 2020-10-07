<template>
  <div class="app-container">
    <el-dialog v-dialog-drag  :visible.sync="vPljs" title="批量结算">
      <div>总共 {{plList.length}} 个订单，累计总人数： {{plTouNum}} 人， 累计应收款： {{plPayCharge}}元 ，累计已收款： {{plPaid}}元 ，累计未收款：
        {{plArrears}}元
      </div>

      <el-form :model="payForm" class="form-pay" label-width="80px" ref="payForm" style="margin-top: 15px;">
        <el-form-item label="收款日期" prop="payDate" required>
          <el-date-picker format="yyyy-MM-dd" placeholder="选择收款日期" style="width: 50%;"
                          v-model="payForm.payDate" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="收款人" prop="payee" required>
          <el-input placeholder="请输入收款人" v-model="payForm.payee"></el-input>
        </el-form-item>
        <el-form-item label="备注说明" prop="remark">
          <el-input placeholder="请输入收款备注" style="max-width: 75%;" type="textarea" v-model="payForm.remark"></el-input>
        </el-form-item>
      </el-form>


      <div style="margin-top:15px; ">Tips:批量结算是一次性结清您选中的所有订单（具体实现是对每个订单生成一个账单补齐欠款）</div>
      <div slot="footer">
        <el-button :loading="onPlJS" @click="subMitForm" type="primary">确认结算</el-button>
      </div>


    </el-dialog>

    <el-divider content-position="left">批量结算欠费订单</el-divider>


    <div style="display: flex;flex-direction: row;align-items: center;justify-content: space-between">
      <div style="display: flex;flex-direction: row;align-items: center;justify-content: flex-start;flex-wrap: wrap">
        <el-tag :key="item.id" @close="item.inpl=false" closable style="margin: 10px;" v-for="item in plList">
          【{{item.proName}}】{{item.orderNum}}
        </el-tag>
      </div>
      <el-button v-if="$_has('PAYUPDATE')" @click="pljs" type="success">批量结算</el-button>
    </div>
    <el-table
      :data="list"
      border
      highlight-current-row
      stripe
      style="margin-top: 15px;"
      v-loading="onLoading"
    >
      <el-table-column align="center" label="订单号" prop="orderNum"></el-table-column>

      <el-table-column align="center" label="产品名">
        <template slot-scope="scope">
          <el-button @click="toProduct()" type="text">{{scope.row.proName}}</el-button>
        </template>
      </el-table-column>


      <el-table-column align="center" label="出团日期">
        <template slot-scope="scope">
          {{ scope.row.travelDate.substr(0,10) }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="游客数">
        <template slot-scope="scope">
          {{ scope.row.touNum}}人
        </template>
      </el-table-column>

      <el-table-column align="center" label="分销商">
        <template slot-scope="scope">
          {{ scope.row.disName}}
        </template>
      </el-table-column>


      <el-table-column align="center" label="应收款">
        <template slot-scope="scope">
          <price-show :price="scope.row.payCharge"></price-show>
        </template>
      </el-table-column>


      <el-table-column align="center" label="实收款">
        <template slot-scope="scope">
          <price-show :price="scope.row.paid"></price-show>
        </template>
      </el-table-column>

      <el-table-column align="center" label="欠款">
        <template slot-scope="scope">
          <price-show :price="comArrPay(scope.row)"></price-show>

        </template>
      </el-table-column>


      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="changePlState(scope.row,false)" type="danger" v-if="scope.row.inpl===true">移除批量结算
          </el-button>
          <el-button @click="changePlState(scope.row,true)" type="primary" v-else>加入批量结算</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :current-page.sync="queryForm.pageNum"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="getList"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>


  </div>
</template>

<script>
    import {getOrders} from "@/api/order";

    import {addPaymentList} from "@/api/money"
    import priceShow from '@/views/com/priceShow'


    //批量结算界面。显示 已审核的 未结算的 属于特定分销商的 所有订单。复用 getOrders接口

    export default {
        data() {
            return {
                vPljs: false,

                //分销商账目页面传过来的disId 复用getOrders接口得到 页面
                disId: '',
                list: [],
                onLoading: true,
                total: 0,
                onPlJS: false,

                payForm: {
                    payee: '',
                    remark: '',
                    orderList: [],
                    payDate: ''
                },

                queryForm: {
                    proName: '',
                    proNum: '',
                    serType: '',
                    planNum: '',
                    //是否已经拼团
                    groupState: '',
                    groupNum: '',
                    travelDate: [],
                    orderNum: '',
                    orderState: 1,
                    disType: '',
                    disName: '',
                    disId: '',

                    proType_1: '',
                    proType_2: '',

                    orderPayState: false,
                    //下单日期，一个范围
                    orderDate: [],


                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        components:{priceShow},
        computed: {


            plList: function () {
                return this.list.filter(item => (item.inpl))
            },
            plTouNum: function () {
                let arr = this.list.filter(item => (item.inpl))
                let touNum = 0
                arr.forEach(item => {
                    touNum += item.touNum
                })
                return touNum
            },
            plPaid: function () {
                //计算订单已支付总和
                let arr = this.list.filter(item => (item.inpl))
                let Paid = 0
                arr.forEach(item => {
                    Paid += item.paid
                })
                return Paid
            },
            plArrears: function () {
                let arr = this.list.filter(item => (item.inpl))
                let arrears = 0
                arr.forEach(item => {
                    arrears += item.arrears
                })
                return arrears

            },
            plPayCharge: function () {
                let arr = this.list.filter(item => (item.inpl))
                let payCharg = 0
                arr.forEach(item => {
                    payCharg += item.payCharge
                })
                return payCharg
            }

        },
        created() {
            this.disId = this.$route.query.id;
            this.getList()
        },
        methods: {
            addPaymentList() {

                //
                this.plArrears()

                addPaymentList(this.payForm).then(res => {

                    console.log(res)
                }).catch(error => {
                })

                this.$refs[formName].resetFields();
            },

            subMitForm() {
                //遍历列表。遍历出所有ID。
                let idList = []
                this.plList.forEach(item => {
                    idList[idList.length] = item.id
                })

                this.payForm.orderList = idList

                this.onPlJS = true
                addPaymentList(this.payForm).then(res => {
                    this.$message({
                        type: 'success',
                        message: '批量结算成功'
                    })

                    this.getList()
                    this.onPlJS = false
                    this.vPljs = false

                }).catch(error => {
                    this.onPlJS = false
                })


            },
            pljs() {
                this.vPljs = true
            },
            changePlState(item, state) {
                item.inpl = state
            },
            comArrPay(order) {
                //计算当前欠款显示 先计算订单状态。 然后判断是否为0
                if (order.state === 1) {
                    return order.arrears === 0 ? '已结清' : order.arrears + '元'
                }
                return ''
            },
            toProduct(id) {
                this.$router.push({name: 'AddProduction', query: {id}})
            },
            getList() {
                this.onLoading = true;
                this.queryForm.disId = this.disId;

                getOrders(this.queryForm).then(res => {
                    console.log(res.list);
                    res.list.forEach(item => {
                        item.inpl = false
                    });
                    this.list = res.list;
                    this.total = res.pagination.total;
                    this.onLoading = false
                }).catch(error => {
                    this.onLoading = false
                })
            }
        }


    }
</script>

<style scoped>
  .form-pay .el-input {
    max-width: 50%;
  }

</style>
