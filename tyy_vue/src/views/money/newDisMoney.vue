<template>
  <div class="app-container">
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
      :data="disList.slice((query.currentPage - 1) * query.pageSize, query.currentPage * query.pageSize)"
      stripe
      highlight-current-row>

      <!--<el-table-column align="center" label="所属省" min-width="45">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.province }}-->
        <!--</template>-->
      <!--</el-table-column>-->
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

      <el-table-column align="center" label="订单数" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.orderCount }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="游客数" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.tourCount }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="应收费" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.shoudPay }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="已收费" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.hashPay }}
        </template>
      </el-table-column>

      <el-table-column align="center" label="欠费" min-width="45">
        <template slot-scope="scope">
          {{ scope.row.arrPay }}
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="操作" min-width="45" prop="disTel">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button @click="selectDisBu(scope.row)" size="mini" type="primary">选择</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>

    <el-pagination
      :current-page.sync="query.currentPage"
      :page-size="query.pageSize"
      :total="disList.length"
      background
      layout="prev, pager, next"
      style="margin-top: 15px;"/>
  </div>
</template>

<script>
    import {getDisList, getDisType} from '@/api/distribute'
    import {getDisMoneyList} from "@/api/money";
    import {showNewDisMoneyList,getDisCode} from "@/api/distribute"
    import priceShow from '@/views/com/priceShow'


    export default {
        name: "newDisMoney",
        data() {
            return {
              query: {
                disType: '',
                disName: '',
                disContactor: '',
                disTel: '',
                disProvince: '',
                disCity: '',
                disPhone:'',
                currentPage: 1,
                pageSize: 10
              },

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
                //对disProvince和disCity进行set 得到省份和城市列表
                disList: [],
                disTypeList: [],

                onLoading: true,
                total: 0,


                queryForm: {
                    disName: '',
                    disType: '',

                    disProvince: '',
                    disCity: '',

                    pageNum: 1,
                    pageSorted: 'desc',
                    pageSize: 10
                }
            }
        },
        created() {

            this.getList()
        },
        components:{priceShow},
        methods: {
          getList() {
            this.onLoading = true
            showNewDisMoneyList(this.orderForm).then(res => {
              this.disList = res.WechatUnitList
              this.orderForm.positionCodeA = res.positionCodeA
              this.orderForm.workerId = res.workerId
              this.total = res.pagination.total
              this.onLoading = false
            }).catch(error => {
              this.onLoading = false
            })
          },

          selectDisBu: function (item) {
            getDisCode(item.unitId).then(res =>{
              this.orderForm.positionCodeB = res.positionCodeB
              this.orderForm.positionCodeC = res.positionCodeC
              this.orderForm.secondDisId = res.disId
              this.orderForm.disId = res.disId
              this.orderForm.unitId = res.unitId
            }).then(() => {
            })

          },
            //结算记录
            toJsList: function (disName) {
                this.$router.push({path: 'disMoneyList', query: {disName}})
            },
            toReF: function (id) {
                //跳转到分销商流水记录。

            },

            topL: function (id) {
                this.$router.push({path: 'disMoneyPlcz', query: {id}})
            },


            getTypeList: function () {
                getDisType().then(res => {
                    this.disTypeList = res
                }).catch(error => {
                })
            },
            getDisList() {
                getDisList().then(res => {
                    this.disList = res
                    console.log(res)
                }).catch(error => {
                })
            },
        }
    }
</script>

<style scoped>

</style>
